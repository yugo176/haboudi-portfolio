"use server";

import { Resend } from "resend";
import { env } from "@/lib/env";
import { contactEmail } from "@/lib/email/contact-email";
import { contactSchema, type ContactErrorCode, type ContactState, type ContactValues } from "@/lib/validations/contact";

function readValues(formData: FormData): ContactValues {
  const str = (k: string) => {
    const v = formData.get(k);
    return typeof v === "string" ? v : "";
  };
  return {
    types: formData.getAll("types").filter((v): v is string => typeof v === "string"),
    timeline: str("timeline"),
    name: str("name"),
    email: str("email"),
    company: str("company"),
    message: str("message"),
  };
}

/** Action du formulaire de contact : validation, champ piège anti-robot, puis envoi par Resend. */
export async function sendContact(_prev: ContactState, formData: FormData): Promise<ContactState> {
  const values = readValues(formData);
  const locale = formData.get("locale") === "en" ? "en" : "fr";

  // Champ invisible : un humain le laisse vide. Un robot qui le remplit reçoit un faux succès.
  if (typeof formData.get("site") === "string" && formData.get("site") !== "") {
    return { status: "sent", name: values.name };
  }

  const parsed = contactSchema.safeParse({
    ...values,
    timeline: values.timeline || undefined,
    company: values.company || undefined,
    email: values.email.trim(),
  });

  if (!parsed.success) {
    const errors: Partial<Record<keyof ContactValues, ContactErrorCode>> = {};
    for (const issue of parsed.error.issues) {
      const field = issue.path[0] as keyof ContactValues;
      if (!errors[field]) errors[field] = issue.message as ContactErrorCode;
    }
    return { status: "invalid", errors, values };
  }

  if (!env.RESEND_API_KEY) return { status: "unavailable", values };

  const { subject, text, html } = contactEmail(parsed.data, locale);
  try {
    const { error } = await new Resend(env.RESEND_API_KEY).emails.send({
      from: env.CONTACT_FROM_EMAIL,
      to: env.CONTACT_TO_EMAIL,
      replyTo: parsed.data.email,
      subject,
      text,
      html,
    });
    if (error) {
      console.error("Resend :", error.name, error.message);
      return { status: "failed", values };
    }
  } catch (e) {
    console.error("Resend :", e instanceof Error ? e.message : e);
    return { status: "failed", values };
  }

  return { status: "sent", name: parsed.data.name.split(" ")[0] };
}
