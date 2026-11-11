import Link from "next/link";
import { localePath, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";
import { site } from "@/lib/site";
import { btnPrimary, btnSecondary } from "@/lib/ui";
import { ContourCanvas } from "@/components/visual/contour-canvas";

export function Hero({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  return (
    <section className="relative flex min-h-[760px] flex-col overflow-hidden md:h-[100svh] md:max-h-[980px] md:min-h-[720px]">
      <ContourCanvas variant="hero" />
      <div className="container-page relative flex flex-1 flex-col justify-center pb-10 pt-36">
        <div className="max-w-[820px]">
          <h1 className="m-0 font-serif text-[clamp(56px,8.4vw,128px)] font-normal leading-[0.95] tracking-[-0.02em]">{site.name}</h1>
          <p className="mt-6 text-[19px] leading-normal">
            {dict.hero.title} <span className="text-accent">·</span> {dict.hero.titleRest}
          </p>
          <p className="mb-10 mt-3.5 max-w-[540px] text-base leading-[1.7] text-text-2">{dict.hero.pitch}</p>
          <div className="flex flex-wrap gap-3.5">
            <Link href={localePath(locale, "/travaux")} className={btnPrimary}>
              {dict.hero.ctaWork}
            </Link>
            <Link href={localePath(locale, "/contact")} className={btnSecondary}>
              {dict.hero.ctaContact}
            </Link>
          </div>
        </div>
      </div>
      <div className="container-page relative pb-11">
        <div className="flex flex-wrap items-end justify-between gap-6 text-[13px] text-muted">
          <div>
            <p className="mb-2.5">{dict.hero.trusted}</p>
            <ul className="m-0 flex list-none flex-wrap gap-x-7 gap-y-2 p-0 font-serif text-xl text-soft">
              {site.clients.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          </div>
          <span>
            {site.city}, {locale === "fr" ? "Bénin" : "Benin"}
          </span>
        </div>
      </div>
    </section>
  );
}
