import type { ReactNode } from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PdfIcon } from "@/components/ui/pdf-icon";
import { localePath } from "@/i18n/config";
import { getDictionary, getLocale } from "@/i18n/get-dictionary";
import { certifications, education, experience, skills } from "@/content/profile";
import { t } from "@/content";
import { pageMetadata, profilePageJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/seo/json-ld";
import { site } from "@/lib/site";
import { btnPrimary, btnSecondary } from "@/lib/ui";
import { delay, Split } from "@/components/project/parts";
import { CtaBand } from "@/components/ui/cta-band";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const dict = await getDictionary(locale);
  return pageMetadata({ locale, path: "/parcours", title: dict.nav.journey, description: dict.journeyPage.intro1 });
}

function Row({ period, title, org, body, children }: { period: string; title: string; org: string; body: string; children?: ReactNode }) {
  return (
    <li className="grid grid-cols-1 gap-2 border-b border-line-1 py-7 md:grid-cols-[180px_minmax(0,1fr)] md:gap-8">
      <p className="m-0 text-[13px] text-muted">{period}</p>
      <div>
        <h3 className="m-0 font-serif text-[28px] font-normal leading-[1.15]">
          {title} · <span className="text-accent">{org}</span>
        </h3>
        <p className="mt-2 text-[15px] leading-[1.7] text-text-2">{body}</p>
        {children}
      </div>
    </li>
  );
}

export default async function JourneyPage() {
  const locale = await getLocale();
  const dict = await getDictionary(locale);
  const j = dict.journeyPage;

  return (
    <div className="container-page">
      <JsonLd data={profilePageJsonLd(locale, dict.meta.jobTitle, dict.meta.description)} />
      <header className="pb-28 pt-36 md:pt-40" data-reveal>
        <p className="mb-4.5 text-[13px] text-accent">{j.label}</p>
        <h1 className="m-0 max-w-[980px] font-serif text-[clamp(52px,6.4vw,96px)] font-normal leading-[0.98]">
          {j.title} <span className="italic text-accent">{j.titleEm}</span>
        </h1>

        <div className="mt-20 flex flex-wrap items-start gap-18">
          <figure className="m-0 min-w-[240px] flex-[0_1_340px]">
            {/* Photo retouchée (logo de l'école masqué) ; l'originale reste dans sources/. */}
            <div className="relative aspect-[4/5] overflow-hidden rounded-[20px] border border-line-1 bg-surface-2">
              <Image
                src="/images/portrait-haboudi.jpg"
                alt={j.photoAlt}
                fill
                priority
                sizes="(min-width: 768px) 340px, 100vw"
                className="object-cover object-top"
              />
            </div>
            <figcaption className="mt-3.5 text-[13px] text-muted">{j.photoCaption}</figcaption>
          </figure>

          <div className="min-w-0 flex-[1_1_480px]">
            <p className="m-0 text-[19px] leading-[1.75]">{j.intro1}</p>
            <p className="mt-5 text-base leading-[1.8] text-text-2">{j.intro2}</p>
            <p className="mt-5 text-base leading-[1.8] text-text-2">{j.intro3}</p>
            <dl className="mt-10 grid grid-cols-[repeat(auto-fit,minmax(min(100%,220px),1fr))] gap-x-10 border-t border-line-2">
              {j.facts.map((f) => (
                <div key={f.label} className="border-b border-line-1 py-4">
                  <dt className="text-xs text-muted">{f.label}</dt>
                  <dd className={`m-0 mt-1 text-[15px] ${f === j.facts[j.facts.length - 1] ? "text-accent" : ""}`}>{f.value}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-9 flex flex-wrap gap-3.5">
              <a href={site.cv} download className={btnPrimary}>
                <PdfIcon size={18} /> {j.cv}
              </a>
              <Link href={localePath(locale, "/contact")} className={btnSecondary}>
                {j.contact}
              </Link>
            </div>
          </div>
        </div>
      </header>

      <Split label={j.experience}>
        <ol className="m-0 list-none border-t border-line-1 p-0">
          {experience.map((e) => (
            <Row key={e.org + t(e.period, locale)} period={t(e.period, locale)} title={t(e.role, locale)} org={e.org} body={t(e.body, locale)} />
          ))}
        </ol>
      </Split>

      <Split label={j.education}>
        <ol className="m-0 list-none border-t border-line-1 p-0">
          {education.map((e) => (
            <Row key={e.school} period={t(e.period, locale)} title={t(e.title, locale)} org={e.school} body={t(e.body, locale)}>
              {e.courses && (
                <ul className="m-0 mt-4 flex list-none flex-wrap gap-2 p-0">
                  {t(e.courses, locale).map((c) => (
                    <li key={c} className="rounded-full border border-line-2 px-3 py-1.5 text-[13px] text-soft">
                      {c}
                    </li>
                  ))}
                </ul>
              )}
            </Row>
          ))}
        </ol>
      </Split>

      <Split label={j.skills}>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,280px),1fr))] gap-x-12 gap-y-10">
          {skills.map((s, i) => (
            <div key={s.items} data-reveal style={delay(0.15 + i * 0.08)}>
              <h3 className="m-0 mb-3.5 font-serif text-2xl font-normal">{t(s.title, locale)}</h3>
              <p className="m-0 text-[15px] leading-[1.9] text-text-2">{s.items}</p>
            </div>
          ))}
        </div>
      </Split>

      <Split label={j.certifications}>
        <ol className="m-0 list-none border-t border-line-1 p-0">
          {certifications.map((c) => (
            <Row key={c.title} period={t(c.date, locale)} title={c.title} org={c.issuer} body={t(c.body, locale)}>
              {c.file && (
                <a href={c.file} target="_blank" rel="noopener" className="mt-3 inline-flex items-center gap-2 text-sm text-text-2 transition-colors hover:text-accent">
                  {c.file.endsWith(".pdf") && <PdfIcon size={16} />}
                  {j.viewCertificate} ↗
                </a>
              )}
            </Row>
          ))}
        </ol>
      </Split>

      <Split label={j.vision}>
        <div className="max-w-[820px]">
          <p className="m-0 font-serif text-[clamp(30px,3.4vw,44px)] leading-[1.25]">
            {j.visionLead} <span className="italic text-accent">{j.visionLeadEm}</span>
          </p>
          <p className="mt-8 text-base leading-[1.8] text-text-2">{j.vision1}</p>
          <p className="mt-4.5 text-base leading-[1.8] text-text-2">{j.vision2}</p>
        </div>
      </Split>

      <section className="border-t border-line-1 pb-36 pt-36 text-center" data-reveal>
        <p className="m-0 font-serif text-[clamp(56px,8vw,120px)] italic leading-none tracking-[-0.01em]">
          {j.motto} <span className="text-accent">{j.mottoEm}</span>
        </p>
        <p className="mt-6 text-[15px] text-muted">{j.mottoTranslation}</p>
      </section>

      <CtaBand locale={locale} title={dict.contactTeaser.title} titleEm={dict.contactTeaser.titleEm} />
    </div>
  );
}
