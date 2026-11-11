import type { Metadata } from "next";
import { localePath } from "@/i18n/config";
import { getDictionary, getLocale } from "@/i18n/get-dictionary";
import { CATEGORIES, projects, t } from "@/content";
import { pageMetadata } from "@/lib/seo";
import { statusTone } from "@/lib/status";
import { ProjectVisual } from "@/components/visual/project-visual";
import { WorkExplorer } from "@/components/work/work-explorer";
import { CtaBand } from "@/components/ui/cta-band";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const dict = await getDictionary(locale);
  return pageMetadata({ locale, path: "/travaux", title: dict.nav.work, description: dict.work.intro });
}

export default async function WorkPage() {
  const locale = await getLocale();
  const dict = await getDictionary(locale);

  const items = projects.map((p) => ({
    slug: p.slug,
    href: localePath(locale, `/travaux/${p.slug}`),
    title: t(p.title, locale),
    summary: t(p.summary, locale),
    year: p.year,
    category: p.category,
    categoryLabel: dict.categories[p.category],
    status: p.status,
    statusLabel: dict.status[p.status],
    tone: statusTone(p.status),
    stack: p.stack.slice(0, 3).join(" · "),
    caseStudy: p.template === "case",
    visual: <ProjectVisual project={p} locale={locale} note={dict.work.screenshotSoon} sizes="(min-width: 1024px) 33vw, 100vw" />,
  }));

  return (
    <div className="container-page">
      <header className="flex flex-wrap items-end justify-between gap-8 pb-14 pt-40 md:pt-44" data-reveal>
        <div>
          <p className="mb-4.5 text-[13px] text-accent">{dict.work.label}</p>
          <h1 className="m-0 font-serif text-[clamp(56px,7vw,104px)] font-normal leading-[0.95]">
            {dict.work.title} <span className="italic text-accent">{dict.work.titleEm}</span>
          </h1>
        </div>
        <p className="m-0 max-w-[380px] text-[15px] leading-[1.7] text-text-2">{dict.work.intro}</p>
      </header>
      <WorkExplorer
        items={items}
        filters={["all", ...CATEGORIES]}
        labels={{
          filterLabel: dict.work.filterLabel,
          viewLabel: dict.work.viewLabel,
          grid: dict.work.grid,
          list: dict.work.list,
          caseStudy: dict.work.caseStudy,
          categories: dict.categories,
        }}
      />
      <CtaBand locale={locale} title={dict.contactTeaser.title} titleEm={dict.contactTeaser.titleEm} />
    </div>
  );
}
