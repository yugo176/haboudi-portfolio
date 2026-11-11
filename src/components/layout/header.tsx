import Link from "next/link";
import { localePath, type Locale } from "@/i18n/config";
import { site } from "@/lib/site";
import { LocaleSwitcher } from "./locale-switcher";
import { MobileNav } from "./mobile-nav";
import { NavLinks } from "./nav-links";
import type { NavDict } from "./nav-items";

/** En-tête posé sur le haut de chaque page (pas collant : il défile avec la page). */
export function Header({ locale, nav }: { locale: Locale; nav: NavDict }) {
  return (
    <header className="absolute inset-x-0 top-0 z-30">
      <div className="container-page flex items-center justify-between gap-6 pt-8 md:pt-10">
        <Link href={localePath(locale)} className="font-serif text-[22px] leading-none transition-colors hover:text-accent">
          {site.name}
        </Link>
        <nav aria-label={nav.menu} className="hidden items-center gap-8 text-sm md:flex">
          <NavLinks locale={locale} nav={nav} />
          <LocaleSwitcher locale={locale} label={nav.language} />
        </nav>
        <MobileNav locale={locale} nav={nav} />
      </div>
    </header>
  );
}
