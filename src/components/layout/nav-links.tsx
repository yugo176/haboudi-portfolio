"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { localePath, type Locale } from "@/i18n/config";
import { NAV_ITEMS, type NavDict } from "./nav-items";

/** Liens principaux, avec la page courante en bleu. */
export function NavLinks({ locale, nav, onNavigate, className }: { locale: Locale; nav: NavDict; onNavigate?: () => void; className?: string }) {
  const pathname = usePathname();
  return (
    <>
      {NAV_ITEMS.map((item) => {
        const href = localePath(locale, item.path);
        const active = pathname === href || pathname.startsWith(`${href}/`);
        return (
          <Link
            key={item.key}
            href={href}
            onClick={onNavigate}
            aria-current={active ? "page" : undefined}
            className={`${className ?? ""} transition-colors hover:text-accent ${active ? "text-accent" : ""}`}
          >
            {nav[item.key]}
          </Link>
        );
      })}
    </>
  );
}
