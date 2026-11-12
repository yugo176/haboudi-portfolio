import type { Locale } from "@/i18n/config";

/** Un texte dans chaque langue. */
export type L<T = string> = Record<Locale, T>;

/** Visuel dessiné quand il n'y a pas encore de capture d'écran. */
export type ProjectKind = "site" | "app" | "board" | "ai" | "doc";
/** Filtres de la page Travaux. */
export type ProjectCategory = "clients" | "platforms" | "ai" | "academic";
export type ProjectStatus =
  | "live"
  | "delivered"
  | "in-progress"
  | "prototype"
  | "showcase"
  | "ai-project"
  | "competition"
  | "report"
  | "project";

export type Fact = { label: L; value: L };
export type Metric = { value: L; label: L };
export type Item = { title: L; body: L };
export type Link = { label: L; href: string };

type Base = {
  slug: string;
  title: L;
  year: string;
  kind: ProjectKind;
  category: ProjectCategory;
  status: ProjectStatus;
  /** Une ligne pour les cartes et l'index. */
  summary: L;
  stack: string[];
  domain?: string;
  /** Ordre sur l'accueil (« Travaux choisis »), de 1 à 4. */
  featured?: number;
  /** Libellés des écrans pour le visuel « app ». */
  screens?: L<string[]>;
  /** Captures d'écran de téléphone (public/images/projects/…), dans l'ordre d'affichage. */
  shots?: { src: string; alt: L<string> }[];
};

/** Étude de cas complète (IZINIA, Agro Hikari, audio-cnn). */
export type CaseStudy = Base & {
  template: "case";
  tagline: L;
  facts: Fact[];
  links: Link[];
  need: { lead: L; body: L };
  built: { kind: L; title: L; body: L }[];
  decisions: Item[];
  numbers: Metric[];
  state: L;
  next: string;
};

/** Page projet adaptable. */
export type ProjectEntry = Base & {
  template: "project";
  tagline: L;
  facts: Fact[];
  links: Link[];
  context: L;
  features: Item[];
  numbers: Metric[];
  state: L;
  /** Démo en direct sur la page (appelle l'API en ligne du projet). */
  demo?: "tts" | "leaf";
};

/** Travail académique : résumé, démarche, résultats, PDF. */
export type AcademicWork = Base & {
  template: "academic";
  badge: L;
  question: L;
  facts: Fact[];
  abstract: L;
  steps: Item[];
  results: Metric[];
  figures: { src: string; alt: L; caption: L }[];
  files: { label: L; meta: L; href: string }[];
};

export type Project = CaseStudy | ProjectEntry | AcademicWork;

export type Service = { id: "sites" | "platforms" | "mobile" | "ai"; title: L; body: L };
export type TimelineStep = { period: L; title: L; place: L };
export type Experience = { period: L; role: L; org: string; body: L };
export type Education = { period: L; title: L; school: string; body: L; courses?: L<string[]> };
export type SkillGroup = { title: L; items: string };
export type Certification = { date: L; title: string; issuer: string; body: L; file?: string };
export type Testimonial = { quote: L; author: string; role: L };
