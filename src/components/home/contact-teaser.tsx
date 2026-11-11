import type { CSSProperties } from "react";
import Link from "next/link";
import { localePath, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";
import { site, whatsappLink } from "@/lib/site";
import { btnPrimary, btnSecondary } from "@/lib/ui";
import { ContourCanvas } from "@/components/visual/contour-canvas";
import { CopyButton } from "@/components/ui/copy-button";

/** Titre découpé en mots, révélés l'un après l'autre. */
function Words({ text, start = 0, className }: { text: string; start?: number; className?: string }) {
  return (
    <>
      {text.split(" ").map((w, i) => (
        <span key={i} className={`word ${className ?? ""}`} style={{ "--w": start + i } as CSSProperties}>
          {w}
          {" "}
        </span>
      ))}
    </>
  );
}

export function ContactTeaser({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const c = dict.contactTeaser;
  const firstCount = c.title.split(" ").length;
  return (
    <section id="contact" className="relative overflow-hidden border-t border-line-1">
      <ContourCanvas variant="contact" />
      <div className="container-page relative py-36 text-center md:py-44">
        <p className="mb-5 text-[13px] text-accent">{c.label}</p>
        <h2 data-words className="mx-auto mb-6 max-w-[1000px] font-serif text-[clamp(52px,7vw,104px)] font-normal leading-none">
          <Words text={c.title} />
          <br />
          <Words text={c.titleEm} start={firstCount} className="italic text-accent" />
        </h2>
        <p data-reveal className="mx-auto mb-11 max-w-[500px] text-base leading-[1.7] text-text-2" style={{ "--reveal-delay": "0.7s" } as CSSProperties}>
          {c.body}
        </p>
        <div data-reveal className="flex flex-wrap items-center justify-center gap-3.5" style={{ "--reveal-delay": "0.9s" } as CSSProperties}>
          <Link href={localePath(locale, "/contact")} className={btnPrimary}>
            {c.cta} →
          </Link>
          <CopyButton value={site.email} label={site.email} copiedLabel={c.copied} ariaLabel={c.copyEmail} className={btnSecondary} />
        </div>
        <div data-reveal className="mt-8 flex justify-center gap-7 text-[13px] text-text-2" style={{ "--reveal-delay": "1s" } as CSSProperties}>
          <a href={whatsappLink()} target="_blank" rel="noopener" className="transition-colors hover:text-text">
            WhatsApp ↗
          </a>
          {site.linkedin && (
            <a href={site.linkedin} target="_blank" rel="noopener me" className="transition-colors hover:text-text">
              LinkedIn ↗
            </a>
          )}
          <a href={site.github} target="_blank" rel="noopener me" className="transition-colors hover:text-text">
            GitHub ↗
          </a>
        </div>
      </div>
    </section>
  );
}
