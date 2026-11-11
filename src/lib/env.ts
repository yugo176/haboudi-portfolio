import "server-only";
import { z } from "zod";

const empty = (v: unknown) => (typeof v === "string" && v.trim() === "" ? undefined : v);

const schema = z.object({
  RESEND_API_KEY: z.preprocess(empty, z.string().startsWith("re_").optional()),
  CONTACT_TO_EMAIL: z.preprocess(empty, z.email().default("haboudboukari15@gmail.com")),
  CONTACT_FROM_EMAIL: z.preprocess(empty, z.string().default("Portfolio <onboarding@resend.dev>")),
});

/** Variables d'environnement serveur, validées une seule fois. */
export const env = schema.parse({
  RESEND_API_KEY: process.env.RESEND_API_KEY,
  CONTACT_TO_EMAIL: process.env.CONTACT_TO_EMAIL,
  CONTACT_FROM_EMAIL: process.env.CONTACT_FROM_EMAIL,
});
