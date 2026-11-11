import type { Locale } from "@/i18n/config";
import type { L } from "./types";

/** Texte dans la langue demandée. */
export function t<T>(value: L<T>, locale: Locale): T {
  return value[locale];
}
