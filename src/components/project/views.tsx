import Image from "next/image";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";
import { getProject, projects, t, type AcademicWork, type CaseStudy, type ProjectEntry } from "@/content";
import { projectImage } from "@/lib/project-image";
import { ProjectVisual } from "@/components/visual/project-visual";
import { CtaBand } from "@/components/ui/cta-band";
import { AgroSimulator, AudioPipeline, AudioPredictions, IziniaArchitecture } from "./case-extras";
import { Chips, delay, DetailHeader, DownloadButton, ExternalButton, HeroVisual, NextCase, Numbers, OtherProjects, Split } from "./parts";

type ViewProps<P> = { project: P; locale: Locale; dict: Dictionary };

function Visual({ project, locale, dict }: ViewProps<CaseStudy | ProjectEntry>) {
  const hasImage = projectImage(project.slug) !== null || Boolean(project.shots?.length);
  return (
    <HeroVisual note={hasImage ? undefined : dict.detail.screenshotsSoon}>
      {project.slug === "audio-cnn" ? (
        <AudioPredictions locale={locale} />
      ) : (
        <div className={`relative flex size-full items-center justify-center ${project.kind === "site" ? "max-w-[980px]" : ""}`}>
          <ProjectVisual project={project} locale={locale} note={dict.work.screenshotSoon} sizes="100vw" maxShots={4} />
        </div>
      )}
    </HeroVisual>
  );
}

function Items({ items, locale }: { items: { title: Record<Locale, string>; body: Record<Locale, string>; kind?: Record<Locale, string> }[]; locale: Locale }) {
  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] gap-x-10 border-t border-line-2">
      {items.map((x, i) => (
        <div key={i} className="border-b border-line-1 py-6" data-reveal style={delay(0.06 * i)}>
          {x.kind && <p className="m-0 mb-2.5 text-xs text-muted">{t(x.kind, locale)}</p>}
          <h3 className="m-0 mb-2 font-serif text-[25px] font-normal">{t(x.title, locale)}</h3>
          <p className="m-0 text-[15px] leading-[1.7] text-text-2">{t(x.body, locale)}</p>
        </div>
      ))}
    </div>
  );
}

function Decisions({ items, locale }: { items: CaseStudy["decisions"]; locale: Locale }) {
  return (
    <ol className="m-0 list-none border-t border-line-2 p-0">
      {items.map((d, i) => (
        <li key={i} className="grid grid-cols-[64px_minmax(0,1fr)] gap-4 border-b border-line-1 py-7" data-reveal style={delay(0.08 * i)}>
          <span className="font-serif text-[28px] text-line-3">0{i + 1}</span>
          <div>
            <h3 className="m-0 mb-2 font-serif text-[26px] font-normal">{t(d.title, locale)}</h3>
            <p className="m-0 max-w-[720px] text-[15px] leading-[1.75] text-text-2">{t(d.body, locale)}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

export function CaseStudyView({ project, locale, dict }: ViewProps<CaseStudy>) {
  const next = getProject(project.next)!;
  const special =
    project.slug === "izinia"
      ? { label: dict.detail.architecture, node: <IziniaArchitecture locale={locale} /> }
      : project.slug === "agro-hikari"
        ? { label: dict.detail.simulator, node: <AgroSimulator locale={locale} /> }
        : { label: dict.detail.pipeline, node: <AudioPipeline locale={locale} /> };
  return (
    <>
      <DetailHeader
        locale={locale}
        backLabel={dict.detail.back}
        kicker={dict.detail.caseStudy}
        badge={{ status: project.status, label: dict.status[project.status] }}
        title={t(project.title, locale)}
        tagline={t(project.tagline, locale)}
        facts={project.facts}
        actions={project.links.map((l, i) => (
          <ExternalButton key={l.href} href={l.href} primary={i === 0}>
            {t(l.label, locale)}
          </ExternalButton>
        ))}
      />
      <Visual project={project} locale={locale} dict={dict} />
      <Split label={dict.detail.need} className="mt-14">
        <p className="m-0 max-w-[820px] font-serif text-[clamp(28px,3vw,40px)] leading-[1.3]">{t(project.need.lead, locale)}</p>
        <p className="mt-7 max-w-[820px] text-base leading-[1.8] text-text-2">{t(project.need.body, locale)}</p>
      </Split>
      <Split label={dict.detail.built}>
        <Items items={project.built} locale={locale} />
      </Split>
      <Split label={special.label}>{special.node}</Split>
      <Split label={dict.detail.decisions}>
        <Decisions items={project.decisions} locale={locale} />
      </Split>
      <Split label={dict.detail.stack}>
        <Chips items={project.stack} />
      </Split>
      <Numbers items={project.numbers} locale={locale} />
      <Split label={dict.detail.state}>
        <p className="m-0 max-w-[820px] text-base leading-[1.8] text-text-2">{t(project.state, locale)}</p>
      </Split>
      <NextCase locale={locale} label={dict.detail.next} project={next} />
      <CtaBand locale={locale} title={dict.contactTeaser.title} titleEm={dict.contactTeaser.titleEm} />
    </>
  );
}

export function ProjectView({ project, locale, dict }: ViewProps<ProjectEntry>) {
  const others = projects.filter((p) => p.template === "project" && p.slug !== project.slug);
  return (
    <>
      <DetailHeader
        locale={locale}
        backLabel={dict.detail.back}
        kicker={dict.categorySingular[project.category]}
        badge={{ status: project.status, label: dict.status[project.status] }}
        title={t(project.title, locale)}
        tagline={t(project.tagline, locale)}
        facts={project.facts}
        actions={project.links.map((l, i) => (
          <ExternalButton key={l.href} href={l.href} primary={i === 0}>
            {t(l.label, locale)}
          </ExternalButton>
        ))}
      />
      <Visual project={project} locale={locale} dict={dict} />
      <Split label={dict.detail.context} className="mt-14">
        <p className="m-0 max-w-[820px] text-lg leading-[1.8]">{t(project.context, locale)}</p>
      </Split>
      <Split label={dict.detail.built}>
        <Items items={project.features} locale={locale} />
      </Split>
      <Split label={dict.detail.stack}>
        <Chips items={project.stack} />
      </Split>
      <Numbers items={project.numbers} locale={locale} />
      <Split label={dict.detail.state}>
        <p className="m-0 max-w-[820px] text-base leading-[1.8] text-text-2">{t(project.state, locale)}</p>
      </Split>
      <OtherProjects locale={locale} title={dict.detail.others} items={others} categoryLabels={dict.categories} />
      <CtaBand locale={locale} title={dict.contactTeaser.title} titleEm={dict.contactTeaser.titleEm} />
    </>
  );
}

export function AcademicView({ project, locale, dict }: ViewProps<AcademicWork>) {
  const others = projects.filter((p) => p.template === "academic" && p.slug !== project.slug);
  return (
    <>
      <DetailHeader
        locale={locale}
        backLabel={dict.detail.back}
        kicker={dict.detail.academic}
        badge={{ text: t(project.badge, locale) }}
        title={t(project.title, locale)}
        tagline={t(project.question, locale)}
        taglineItalic
        facts={project.facts}
        actions={
          project.files.length ? (
            project.files.map((f, i) => <DownloadButton key={f.href} href={f.href} label={t(f.label, locale)} meta={t(f.meta, locale)} primary={i === 0} />)
          ) : (
            <span className="text-sm text-muted">{dict.detail.codeSoon}</span>
          )
        }
      />
      <Split label={dict.detail.abstract}>
        <p className="m-0 max-w-[820px] text-lg leading-[1.8]">{t(project.abstract, locale)}</p>
      </Split>
      <Split label={dict.detail.approach}>
        <ol className="m-0 list-none border-t border-line-2 p-0">
          {project.steps.map((s, i) => (
            <li key={i} className="grid grid-cols-[64px_minmax(0,1fr)] gap-4 border-b border-line-1 py-5.5">
              <span className="font-serif text-[26px] text-line-3">0{i + 1}</span>
              <div>
                <h3 className="m-0 mb-1.5 font-serif text-2xl font-normal">{t(s.title, locale)}</h3>
                <p className="m-0 max-w-[720px] text-[15px] leading-[1.7] text-text-2">{t(s.body, locale)}</p>
              </div>
            </li>
          ))}
        </ol>
      </Split>
      <Split label={dict.detail.results}>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,220px),1fr))] gap-4">
          {project.results.map((r, i) => (
            <div key={i} className="rounded-2xl border border-line-2 bg-surface-1 p-6" data-reveal style={delay(0.06 * i)}>
              <p className="m-0 font-serif text-[44px] leading-none text-accent">{t(r.value, locale)}</p>
              <p className="mt-3 text-sm leading-[1.6] text-text-2">{t(r.label, locale)}</p>
            </div>
          ))}
        </div>
      </Split>
      {project.figures.length > 0 && (
        <Split label={dict.detail.figures}>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,340px),1fr))] gap-6">
            {project.figures.map((g) => (
              <figure key={g.src} className="m-0">
                <div className="relative aspect-[4/3] overflow-hidden rounded-[14px] bg-white">
                  <Image src={g.src} alt={t(g.alt, locale)} fill sizes="(min-width: 1024px) 33vw, 100vw" className="object-contain p-2.5" />
                </div>
                <figcaption className="mt-2.5 text-[13px] leading-[1.6] text-muted">{t(g.caption, locale)}</figcaption>
              </figure>
            ))}
          </div>
        </Split>
      )}
      <OtherProjects locale={locale} title={dict.detail.otherAcademic} items={others} categoryLabels={dict.categories} />
      <CtaBand locale={locale} title={dict.contactTeaser.title} titleEm={dict.contactTeaser.titleEm} />
    </>
  );
}
