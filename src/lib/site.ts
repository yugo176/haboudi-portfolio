/**
 * Identité et adresse publique du site : une seule source pour les métadonnées, le JSON-LD et les liens.
 */

function filled(value: string | undefined): string | undefined {
  const clean = value?.trim();
  return clean ? clean : undefined;
}

/** Les variables Vercel arrivent sans protocole : « haboudi-portfolio.vercel.app ». */
function withProtocol(host: string): string {
  return /^https?:\/\//.test(host) ? host : `https://${host}`;
}

const FALLBACK = process.env.NODE_ENV === "development" ? "http://localhost:3000" : "https://haboudi.com";

const raw =
  filled(process.env.NEXT_PUBLIC_SITE_URL) ??
  filled(process.env.VERCEL_PROJECT_PRODUCTION_URL) ??
  filled(process.env.VERCEL_URL) ??
  FALLBACK;

/** Sans barre oblique finale : les chemins sont toujours ajoutés derrière. */
export const SITE_URL = withProtocol(raw).replace(/\/+$/, "");

export function absoluteUrl(path: string): string {
  return /^https?:\/\//.test(path) ? path : new URL(path, SITE_URL).toString();
}

export const site = {
  name: "Haboudi BOUKARI",
  fullName: "Haboudi BOUKARI",
  givenName: "Haboudi",
  familyName: "BOUKARI",
  /** Autres façons d'écrire le nom, pour les moteurs de recherche (ordre des documents officiels compris). */
  alternateNames: ["BOUKARI Haboudi", "Haboudi Boukari", "Boukari Haboudi"],
  initials: "HB",
  email: "haboudboukari15@gmail.com",
  whatsapp: "2290194893522",
  whatsappDisplay: "+229 01 94 89 35 22",
  github: "https://github.com/yugo176",
  githubHandle: "yugo176",
  /** Vide = lien masqué. */
  linkedin: "https://www.linkedin.com/in/haboudi-boukari-91a490343/",
  /** Profils personnels : seulement dans les données structurées (sameAs), pas de lien visible. */
  facebook: "https://web.facebook.com/BoukariHaboudi",
  instagram: "https://www.instagram.com/its_haboud/",
  city: "Parakou",
  country: "Bénin",
  countryCode: "BJ",
  cv: "/cv/haboudi-boukari-cv.pdf",
  clients: ["Agro Hikari", "L'éclore", "Arinov", "NADJAL NEGOCE", "APIFOP"],
} as const;

export function whatsappLink(message?: string): string {
  return `https://wa.me/${site.whatsapp}${message ? `?text=${encodeURIComponent(message)}` : ""}`;
}
