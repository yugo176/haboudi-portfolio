"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LOCALE_COOKIE, locales, type Locale } from "@/i18n/config";

/** FR / EN : garde la même page et mémorise le choix dans un cookie. */
export function LocaleSwitcher({ locale, label, className }: { locale: Locale; label: string; className?: string }) {
  const pathname = usePathname();
  const rest = pathname.replace(/^\/(fr|en)(?=\/|$)/, "");
  return (
    <div role="group" aria-label={label} className={`flex items-center gap-1.5 text-sm ${className ?? ""}`}>
      {locales.map((l, i) => (
        <span key={l} className="flex items-center gap-1.5">
          {i > 0 && <span className="text-muted">/</span>}
          <Link
            href={`/${l}${rest}`}
            hrefLang={l}
            onClick={() => {
              document.cookie = `${LOCALE_COOKIE}=${l}; path=/; max-age=31536000; samesite=lax`;
            }}
            className={l === locale ? "text-text" : "text-muted transition-colors hover:text-text"}
            aria-current={l === locale ? "true" : undefined}
          >
            {l.toUpperCase()}
          </Link>
        </span>
      ))}
    </div>
  );
}
