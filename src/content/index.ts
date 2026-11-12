import { academicWorks } from "./projects-academic";
import { caseStudies } from "./projects-case";
import { otherProjects } from "./projects-other";
import type { Project, ProjectCategory } from "./types";

/** Ordre d'affichage de la page Travaux : du plus récent au plus ancien, projets forts d'abord. */
const ORDER = [
  "izinia",
  "agro-hikari",
  "leclore",
  "arinov",
  "nadjal-negoce",
  "maladies-feuilles",
  "synthese-vocale",
  "audio-cnn",
  "data-academy",
  "small-land-stock",
  "betail-benin",
  "marketpulse",
  "fricadev",
  "apifop",
  "controle-optimal",
  "couts-assurance-maladie",
  "methode-householder",
  "examcorrector",
  "datatour-2025",
  "generateur-markov",
  "reconnaissance-vocale-chiffres",
  "couliflex",
];

const all: Project[] = [...caseStudies, ...otherProjects, ...academicWorks];

export const projects: Project[] = ORDER.map((slug) => {
  const p = all.find((x) => x.slug === slug);
  if (!p) throw new Error(`Projet introuvable : ${slug}`);
  return p;
});

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function featuredProjects(): Project[] {
  return projects.filter((p) => p.featured).sort((a, b) => (a.featured ?? 0) - (b.featured ?? 0));
}

export const CATEGORIES: ProjectCategory[] = ["clients", "platforms", "ai", "academic"];

export * from "./types";
export { t } from "./localize";
