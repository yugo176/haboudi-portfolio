import type { CSSProperties } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { localePath, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";
import { featuredProjects, t } from "@/content";
import { SectionHeader } from "@/components/ui/section-header";
import { ProjectVisual } from "@/components/visual/project-visual";

/** Quatre projets en grille décalée : chaque image se dévoile en rideau à son arrivée. */
export function FeaturedWork({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const items = featuredProjects();
  return (
    <section id="travaux" className="border-t border-line-1 pb-20 pt-28 md:pt-32">
      <SectionHeader label={dict.featured.label} title={dict.featured.title} intro={dict.featured.intro} />
      <div className="mb-24 flex flex-wrap items-start gap-x-12 gap-y-18">
        {items.map((p, i) => {
          const wide = i === 0 || i === 3;
          const offset = i === 1 || i === 3;
          const href = localePath(locale, `/travaux/${p.slug}`);
          return (
            <article key={p.slug} className={`min-w-0 ${wide ? "flex-[7_1_520px]" : "flex-[5_1_380px]"} ${offset ? "md:pt-36" : ""}`}>
              <Link href={href} className="block overflow-hidden rounded-[18px] border border-line-1 bg-surface-2" data-curtain>
                <div
                  data-curtain-inner
                  className={`relative flex items-center justify-center ${wide ? "aspect-[16/11] p-10" : "aspect-[4/5] p-8"}`}
                >
                  <ProjectVisual project={p} locale={locale} note={dict.work.screenshotSoon} tall={!wide} />
                </div>
              </Link>
              <div data-reveal style={{ "--reveal-delay": "0.4s" } as CSSProperties}>
                <div className="mt-6 flex items-baseline justify-between gap-4">
                  <h3 className="m-0 font-serif text-[40px] font-normal leading-none">
                    <Link href={href} className="transition-colors hover:text-accent">
                      {t(p.title, locale)}
                    </Link>
                  </h3>
                  <span className={`text-[13px] ${p.status === "in-progress" ? "text-accent" : "text-muted"}`}>
                    0{i + 1} · {dict.status[p.status]}
                  </span>
                </div>
                <p className="mt-2.5 max-w-[560px] text-[15px] leading-[1.7] text-text-2">{t(p.summary, locale)}</p>
                <p className="mt-3.5 text-xs text-muted">{p.stack.slice(0, 3).join(" · ")}</p>
              </div>
            </article>
          );
        })}
      </div>
      <Link
        href={localePath(locale, "/travaux")}
        className="flex items-center justify-between gap-6 border-y border-line-2 py-9 transition-colors hover:text-accent"
      >
        <span className="font-serif text-[clamp(32px,4vw,48px)] leading-none">{dict.featured.all}</span>
        <span className="flex items-center gap-2 text-sm text-text-2">
          <span className="hidden sm:inline">{dict.featured.allHint}</span> <ArrowRight size={16} className="text-accent" aria-hidden />
        </span>
      </Link>
    </section>
  );
}
