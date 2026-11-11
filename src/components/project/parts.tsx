import type { CSSProperties, ReactNode } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { PdfIcon } from "@/components/ui/pdf-icon";
import { localePath, type Locale } from "@/i18n/config";
import { t, type Fact, type Metric, type Project } from "@/content";
import { badgeClass } from "@/lib/status";
import { btnPrimary, btnSecondary } from "@/lib/ui";

export const delay = (s: number) => ({ "--reveal-delay": `${s}s` }) as CSSProperties;

/** En-tête commun des pages de détail. */
export function DetailHeader({ locale, backLabel, kicker, badge, title, tagline, taglineItalic, facts, actions }: {
  locale: Locale;
  backLabel: string;
  kicker: string;
  badge: { status: Project["status"]; label: string } | { text: string };
  title: string;
  tagline: string;
  taglineItalic?: boolean;
  facts: Fact[];
  actions?: ReactNode;
}) {
  return (
    <header className="pb-14 pt-36 md:pt-40" data-reveal>
      <Link href={localePath(locale, "/travaux")} className="mb-10 inline-flex items-center gap-2 text-[13px] text-muted transition-colors hover:text-text">
        <ArrowLeft size={14} aria-hidden /> {backLabel}
      </Link>
      <div className="mb-5 flex flex-wrap items-center gap-3.5">
        <span className="text-[13px] text-accent">{kicker}</span>
        {"status" in badge ? (
          <span className={badgeClass(badge.status)}>{badge.label}</span>
        ) : (
          <span className="rounded-full border border-line-3 px-2.5 py-1 text-xs text-text-2">{badge.text}</span>
        )}
      </div>
      <h1 className="m-0 max-w-[1100px] font-serif text-[clamp(52px,8vw,132px)] font-normal leading-[0.92] tracking-[-0.02em]">{title}</h1>
      <p className={`mt-7 max-w-[920px] font-serif text-[clamp(24px,2.7vw,38px)] leading-[1.27] ${taglineItalic ? "italic text-accent" : ""}`}>{tagline}</p>
      <dl className="mt-12 grid grid-cols-[repeat(auto-fit,minmax(min(100%,200px),1fr))] gap-x-8 border-t border-line-2">
        {facts.map((f) => (
          <div key={t(f.label, locale)} className="border-b border-line-1 py-4.5">
            <dt className="text-xs text-muted">{t(f.label, locale)}</dt>
            <dd className="m-0 mt-1 text-[15px] leading-normal">{t(f.value, locale)}</dd>
          </div>
        ))}
      </dl>
      {actions && <div className="mt-9 flex flex-wrap gap-3.5">{actions}</div>}
    </header>
  );
}

export function ExternalButton({ href, children, primary = true }: { href: string; children: ReactNode; primary?: boolean }) {
  return (
    <a href={href} target="_blank" rel="noopener" className={primary ? btnPrimary : btnSecondary}>
      {children} ↗
    </a>
  );
}

export function DownloadButton({ href, label, meta, primary }: { href: string; label: string; meta: string; primary: boolean }) {
  return (
    <a href={href} download className={primary ? btnPrimary : btnSecondary}>
      <PdfIcon size={18} />
      <span>{label}</span>
      <span className="text-xs opacity-65">{meta}</span>
    </a>
  );
}

/** Grand visuel révélé en rideau. */
export function HeroVisual({ children, note, ratio = "aspect-[16/9] md:aspect-[16/8]" }: { children: ReactNode; note?: string; ratio?: string }) {
  return (
    <>
      <div className="overflow-hidden rounded-3xl border border-line-1 bg-surface-2" data-curtain style={{ "--curtain-radius": "24px" } as CSSProperties}>
        <div data-curtain-inner className={`relative flex items-center justify-center gap-5 p-8 md:px-16 md:py-12 ${ratio}`}>
          {children}
        </div>
      </div>
      {note && <p className="mt-3.5 text-[13px] text-muted">{note}</p>}
    </>
  );
}

/** Section à étiquette (colonne de gauche) + contenu. */
export function Split({ label, children, className }: { label: string; children: ReactNode; className?: string }) {
  return (
    <section className={`split ${className ?? ""}`} data-reveal>
      <h2 className="m-0 text-[13px] font-medium text-accent">{label}</h2>
      <div className="min-w-0">{children}</div>
    </section>
  );
}

export function Numbers({ items, locale }: { items: Metric[]; locale: Locale }) {
  if (!items.length) return null;
  return (
    <section className="border-t border-line-1 py-24" data-reveal>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,200px),1fr))] gap-8">
        {items.map((n) => (
          <div key={t(n.label, locale)}>
            <p className="m-0 font-serif text-[64px] leading-none text-accent md:text-[72px]">{t(n.value, locale)}</p>
            <p className="mt-2.5 text-sm text-text-2">{t(n.label, locale)}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function Chips({ items }: { items: string[] }) {
  return (
    <ul className="m-0 flex list-none flex-wrap gap-2 p-0">
      {items.map((s) => (
        <li key={s} className="rounded-full border border-line-2 px-3.5 py-2 text-sm text-soft">
          {s}
        </li>
      ))}
    </ul>
  );
}

/** Liste « Autres projets » : de vrais liens vers chaque page. */
export function OtherProjects({ locale, title, items, categoryLabels }: { locale: Locale; title: string; items: Project[]; categoryLabels: Record<string, string> }) {
  return (
    <section className="border-t border-line-1 pb-24 pt-22">
      <h2 className="mb-7 mt-0 text-[13px] font-medium text-accent">{title}</h2>
      <ul className="m-0 list-none border-t border-line-2 p-0">
        {items.map((o) => (
          <li key={o.slug}>
            <Link
              href={localePath(locale, `/travaux/${o.slug}`)}
              className="group -mx-3 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-6 border-b border-line-2 px-3 py-5 transition-colors hover:bg-surface-1 md:grid-cols-[90px_minmax(0,1fr)_minmax(0,0.8fr)_auto]"
            >
              <span className="hidden text-[13px] text-muted md:block">{o.year}</span>
              <span className="font-serif text-[26px] leading-[1.15]">{t(o.title, locale)}</span>
              <span className="hidden text-[13px] text-text-2 md:block">{categoryLabels[o.category]}</span>
              <ArrowRight size={18} aria-hidden className="text-dim transition-[transform,color] group-hover:translate-x-1.5 group-hover:text-accent" />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function NextCase({ locale, label, project }: { locale: Locale; label: string; project: Project }) {
  return (
    <Link
      href={localePath(locale, `/travaux/${project.slug}`)}
      className="flex items-center justify-between gap-6 border-t border-line-1 py-14 transition-colors hover:text-accent"
    >
      <span>
        <span className="mb-2.5 block text-[13px] text-muted">{label}</span>
        <span className="font-serif text-[clamp(40px,5vw,72px)] leading-none">{t(project.title, locale)}</span>
      </span>
      <ArrowRight size={28} aria-hidden className="text-accent" />
    </Link>
  );
}
