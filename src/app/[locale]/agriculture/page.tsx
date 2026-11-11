import type { CSSProperties } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { localePath } from "@/i18n/config";
import { getDictionary, getLocale } from "@/i18n/get-dictionary";
import { agriIdeas, agriSkills, maps, ndviField } from "@/content/agriculture";
import { t } from "@/content";
import { pageMetadata } from "@/lib/seo";
import { delay, Split } from "@/components/project/parts";
import { MapGallery } from "@/components/agriculture/map-gallery";
import { CtaBand } from "@/components/ui/cta-band";
import { PdfIcon } from "@/components/ui/pdf-icon";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const dict = await getDictionary(locale);
  return pageMetadata({ locale, path: "/agriculture", title: dict.agri.label, description: dict.agri.intro });
}

/** Rampe sol nu → végétation dense. */
function ndviColor(v: number) {
  const stops: [number, number[]][] = [
    [0, [140, 90, 60]],
    [0.35, [201, 169, 78]],
    [0.65, [127, 166, 90]],
    [1, [47, 122, 74]],
  ];
  for (let k = 1; k < stops.length; k++) {
    if (v <= stops[k][0]) {
      const [p0, c0] = stops[k - 1];
      const [p1, c1] = stops[k];
      const u = (v - p0) / (p1 - p0);
      return `rgb(${c0.map((c, j) => Math.round(c + (c1[j] - c) * u)).join(",")})`;
    }
  }
  return "rgb(47,122,74)";
}

export default async function AgriculturePage() {
  const locale = await getLocale();
  const dict = await getDictionary(locale);
  const a = dict.agri;

  return (
    <div className="container-page">
      <header className="flex flex-wrap items-end justify-between gap-10 pb-20 pt-36 md:pt-40" data-reveal>
        <div className="max-w-[880px]">
          <div className="mb-5 flex items-center gap-3.5">
            <span className="text-[13px] text-accent">{a.label}</span>
            <span className="rounded-full border border-line-3 px-2.5 py-1 text-xs text-text-2">{a.badge}</span>
          </div>
          <h1 className="m-0 font-serif text-[clamp(52px,7vw,104px)] font-normal leading-[0.95]">
            {a.title} <span className="italic text-accent">{a.titleEm}</span>
          </h1>
        </div>
        <p className="m-0 max-w-[380px] text-[15px] leading-[1.75] text-text-2">{a.intro}</p>
      </header>

      <section aria-label={a.galleryLabel} className="pb-24">
        <MapGallery
          label={a.galleryLabel}
          madeBy={a.madeBy}
          openFull={a.openFull}
          maps={maps.map((m) => ({ src: m.src, width: m.width, height: m.height, title: t(m.title, locale), meta: t(m.meta, locale), alt: t(m.alt, locale) }))}
        />
      </section>

      <Split label={a.skills}>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,280px),1fr))] gap-x-10 border-t border-line-2">
          {agriSkills.map((s, i) => (
            <div key={i} className="pb-2 pr-7 pt-7" data-reveal style={delay(0.1 + i * 0.1)}>
              <p className="m-0 mb-4.5 font-serif text-[28px] text-line-3">0{i + 1}</p>
              <h3 className="m-0 mb-2.5 font-serif text-[28px] font-normal">{t(s.title, locale)}</h3>
              <p className="m-0 text-[15px] leading-[1.75] text-text-2">{t(s.body, locale)}</p>
            </div>
          ))}
        </div>
      </Split>

      <Split label={a.ndvi}>
        <div className="flex flex-wrap items-center gap-12">
          <div className="min-w-0 flex-[1_1_380px]">
            <p className="m-0 text-[17px] leading-[1.75]">{a.ndviBody}</p>
            <p className="mt-7 font-serif text-[30px] leading-[1.2] text-accent md:text-[34px]">{a.ndviFormula}</p>
          </div>
          <div aria-hidden className="min-w-0 flex-[1_1_360px]">
            <div className="grid grid-cols-12 gap-[3px] overflow-hidden rounded-[14px]">
              {ndviField.map((v, i) => (
                <span key={i} className="block aspect-square" style={{ background: ndviColor(v) } as CSSProperties} />
              ))}
            </div>
            <div className="mt-3.5 flex items-center gap-3 text-xs text-muted">
              <span>{a.bareSoil}</span>
              <span className="h-1.5 flex-1 rounded bg-gradient-to-r from-[#8c5a3c] via-[#c9a94e] to-[#2f7a4a]" />
              <span>{a.denseVegetation}</span>
            </div>
          </div>
        </div>
      </Split>

      <Split label={a.next}>
        <p className="m-0 mb-7 max-w-[760px] text-base leading-[1.8] text-text-2">{a.nextIntro}</p>
        <ul className="m-0 list-none border-t border-line-2 p-0">
          {agriIdeas.map((d, i) => (
            <li key={i} className="grid grid-cols-1 items-baseline gap-3 border-b border-line-1 py-6 md:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] md:gap-6" data-reveal style={delay(0.08 * i)}>
              <h3 className="m-0 font-serif text-[26px] font-normal">{t(d.title, locale)}</h3>
              <p className="m-0 text-[15px] leading-[1.7] text-text-2">{t(d.body, locale)}</p>
            </li>
          ))}
        </ul>
      </Split>

      <Split label={a.more}>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,260px),1fr))] gap-4">
          <a href="/certificates/arcgis-imagery-mooc.pdf" target="_blank" rel="noopener" className="block rounded-2xl border border-line-2 bg-surface-1 p-6 transition-colors hover:border-line-3">
            <p className="m-0 mb-2.5 flex items-center gap-2 text-xs text-accent">
              <PdfIcon size={16} /> {a.certificate}
            </p>
            <h3 className="m-0 mb-2 font-serif text-2xl font-normal">The ArcGIS Imagery MOOC ↗</h3>
            <p className="m-0 text-sm leading-[1.7] text-text-2">Esri</p>
          </a>
          {(["marketpulse", "betail-benin"] as const).map((slug) => (
            <Link key={slug} href={localePath(locale, `/travaux/${slug}`)} className="block rounded-2xl border border-line-2 bg-surface-1 p-6 transition-colors hover:border-line-3">
              <p className="m-0 mb-2.5 text-xs text-muted">{a.related}</p>
              <h3 className="m-0 mb-2 font-serif text-2xl font-normal">{slug === "marketpulse" ? "MarketPulse" : "BétailBénin"} →</h3>
              <p className="m-0 text-sm leading-[1.7] text-text-2">
                {slug === "marketpulse"
                  ? locale === "fr"
                    ? "Collecte et suivi des prix agricoles sur les marchés du Bénin."
                    : "Collecting and tracking agricultural prices on Benin's markets."
                  : locale === "fr"
                    ? "Un marché en ligne de bétail avec paiement sécurisé."
                    : "An online livestock market with secure payment."}
              </p>
            </Link>
          ))}
        </div>
      </Split>

      <CtaBand locale={locale} title={a.cta} titleEm={dict.contactTeaser.titleEm} />
    </div>
  );
}
