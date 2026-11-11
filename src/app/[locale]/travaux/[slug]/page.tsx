import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { localePath } from "@/i18n/config";
import { getDictionary, getLocale } from "@/i18n/get-dictionary";
import { getProject, projects, t } from "@/content";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/seo/json-ld";
import { AcademicView, CaseStudyView, ProjectView } from "@/components/project/views";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/[locale]/travaux/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  const locale = await getLocale();
  return pageMetadata({ locale, path: `/travaux/${slug}`, title: t(project.title, locale), description: t(project.summary, locale) });
}

export default async function ProjectPage({ params }: PageProps<"/[locale]/travaux/[slug]">) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();
  const locale = await getLocale();
  const dict = await getDictionary(locale);

  const crumbs = breadcrumbJsonLd([
    { name: dict.nav.home, path: localePath(locale) },
    { name: dict.nav.work, path: localePath(locale, "/travaux") },
    { name: t(project.title, locale), path: localePath(locale, `/travaux/${slug}`) },
  ]);

  return (
    <div className="container-page">
      <JsonLd data={crumbs} />
      {project.template === "case" && <CaseStudyView project={project} locale={locale} dict={dict} />}
      {project.template === "project" && <ProjectView project={project} locale={locale} dict={dict} />}
      {project.template === "academic" && <AcademicView project={project} locale={locale} dict={dict} />}
    </div>
  );
}
