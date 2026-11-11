import { z } from "zod";

export const PROJECT_TYPES = ["site", "platform", "mobile", "ai", "other"] as const;
export const TIMELINES = ["asap", "soon", "unknown"] as const;

/** Codes d'erreur : traduits par le dictionnaire de chaque langue. */
export type ContactErrorCode = "types_required" | "name_required" | "email_invalid" | "message_short" | "message_long";

export const contactSchema = z.object({
  types: z.array(z.enum(PROJECT_TYPES)).min(1, "types_required"),
  timeline: z.enum(TIMELINES).optional(),
  name: z.string().trim().min(2, "name_required").max(120, "name_required"),
  email: z.email("email_invalid").max(200, "email_invalid"),
  company: z.string().trim().max(120).optional(),
  message: z.string().trim().min(20, "message_short").max(4000, "message_long"),
});

export type ContactInput = z.infer<typeof contactSchema>;

export type ContactValues = {
  types: string[];
  timeline: string;
  name: string;
  email: string;
  company: string;
  message: string;
};

export type ContactState =
  | { status: "idle" }
  | { status: "invalid"; errors: Partial<Record<keyof ContactValues, ContactErrorCode>>; values: ContactValues }
  | { status: "failed" | "unavailable"; values: ContactValues }
  | { status: "sent"; name: string };

export const initialContactState: ContactState = { status: "idle" };
