import type { CSSProperties } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { localePath } from "@/i18n/config";
import { getDictionary, getLocale } from "@/i18n/get-dictionary";
import { services, timeline } from "@/content/profile";
import { t } from "@/content";
import { pageMetadata, personJsonLd } from "@/lib/seo";
import { linkUnderline } from "@/lib/ui";
import { JsonLd } from "@/components/seo/json-ld";
import { SectionHeader } from "@/components/ui/section-header";
import { Hero } from "@/components/home/hero";
import { Services } from "@/components/home/services";
import { FeaturedWork } from "@/components/home/featured-work";
import { Journey } from "@/components/home/journey";
import { AiFlow } from "@/components/home/ai-flow";
import { ContactTeaser } from "@/components/home/contact-teaser";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const dict = await getDictionary(locale);
  return pageMetadata({ locale, path: "", title: { absolute: dict.meta.title }, description: dict.meta.description });
}

export default async function HomePage() {
  const locale = await getLocale();
  const dict = await getDictionary(locale);

  return (
    <>
      <JsonLd data={personJsonLd(locale, dict.meta.jobTitle, dict.meta.description)} />
      <Hero locale={locale} dict={dict} />

      <div className="container-page">
        <section className="border-t border-line-1 pb-28 pt-32 md:pt-36" aria-labelledby="services-title">
          <SectionHeader id="services-title" label={dict.services.label} title={dict.services.title} intro={dict.services.intro} />
          <Services services={services.map((s) => ({ id: s.id, title: t(s.title, locale), body: t(s.body, locale) }))} chat={dict.services.chat} />
        </section>

        <FeaturedWork locale={locale} dict={dict} />

        <section className="border-t border-line-1 py-28 md:py-32" aria-labelledby="journey-title">
          <SectionHeader
            id="journey-title"
            label={dict.journey.label}
            title={dict.journey.title}
            intro={
              <>
                <p className="mb-5 mt-0">{dict.journey.intro}</p>
                <Link href={localePath(locale, "/parcours")} className={linkUnderline}>
                  {dict.journey.cta} →
                </Link>
              </>
            }
          />
          <Journey steps={timeline.map((s) => ({ period: t(s.period, locale), title: t(s.title, locale), place: t(s.place, locale) }))} />
        </section>

        <section className="border-t border-line-1 py-28 md:py-32" aria-labelledby="ai-title">
          <SectionHeader
            id="ai-title"
            label={dict.ai.label}
            title={
              <>
                {dict.ai.title} <span className="italic">{dict.ai.titleEm}</span>
              </>
            }
            intro={dict.ai.intro}
          />
          <AiFlow steps={dict.ai.flow} label={dict.ai.flowLabel} />
          <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] border-t border-line-2">
            {dict.ai.cards.map((c, i) => (
              <div key={c.title} data-reveal className="py-7 md:pr-7 [&:not(:first-child)]:md:pl-7" style={{ "--reveal-delay": `${i * 0.08}s` } as CSSProperties}>
                <p className="mb-3 text-[13px] text-muted">{c.kicker}</p>
                <h3 className="mb-2.5 mt-0 font-serif text-[28px] font-normal">{c.title}</h3>
                <p className="m-0 text-[15px] leading-[1.7] text-text-2">{c.body}</p>
              </div>
            ))}
          </div>
          <Link href={localePath(locale, "/agriculture")} className="mt-14 inline-block text-sm text-text-2 transition-colors hover:text-text">
            {dict.ai.curious} <span className="text-accent">→</span>
          </Link>
        </section>
      </div>

      <div className="container-page">
        <ContactTeaser locale={locale} dict={dict} />
      </div>
    </>
  );
}
