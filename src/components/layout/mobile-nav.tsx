"use client";

import { Menu, X } from "lucide-react";
import { useEffect, useId, useState } from "react";
import type { Locale } from "@/i18n/config";
import { LocaleSwitcher } from "./locale-switcher";
import { NavLinks } from "./nav-links";
import type { NavDict } from "./nav-items";

/** Menu mobile : un panneau qui s'ouvre sous l'en-tête, sans jamais bloquer le défilement. */
export function MobileNav({ locale, nav }: { locale: Locale; nav: NavDict }) {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? nav.close : nav.menu}
        onClick={() => setOpen((v) => !v)}
        className="flex size-11 items-center justify-center rounded-full border border-line-3 text-text"
      >
        {open ? <X size={18} aria-hidden /> : <Menu size={18} aria-hidden />}
      </button>
      <div
        id={panelId}
        hidden={!open}
        className="absolute inset-x-5 top-[88px] rounded-2xl border border-line-2 bg-surface-1 p-6 shadow-2xl shadow-black/40"
      >
        <nav aria-label={nav.menu} className="flex flex-col gap-1">
          <NavLinks locale={locale} nav={nav} onNavigate={() => setOpen(false)} className="py-3 font-serif text-2xl" />
        </nav>
        <LocaleSwitcher locale={locale} label={nav.language} className="mt-4 border-t border-line-2 pt-4" />
      </div>
    </div>
  );
}
