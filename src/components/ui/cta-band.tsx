import Link from "next/link";
import { localePath, type Locale } from "@/i18n/config";

/** Grande ligne « Un projet en tête ? Parlons-en. → » en bas des pages. */
export function CtaBand({ locale, title, titleEm }: { locale: Locale; title: string; titleEm: string }) {
  return (
    <Link
      href={localePath(locale, "/contact")}
      className="flex items-center justify-between gap-6 border-t border-line-1 py-12 transition-colors hover:text-accent"
    >
      <span className="font-serif text-[clamp(36px,5vw,64px)] leading-none">
        {title} <span className="italic text-accent">{titleEm}</span>
      </span>
      <span aria-hidden className="text-2xl text-accent">
        →
      </span>
    </Link>
  );
}
