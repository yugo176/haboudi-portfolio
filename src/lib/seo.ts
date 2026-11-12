import "server-only";
import type { Metadata } from "next";
import { defaultLocale, localePath, locales, type Locale } from "@/i18n/config";
import { absoluteUrl, site, SITE_URL } from "@/lib/site";

const OG_LOCALE: Record<Locale, string> = { fr: "fr_FR", en: "en_GB" };

/**
 * Canonique et hreflang propres à la page. `path` est le chemin sans préfixe de langue
 * ("" pour l'accueil, "/travaux/izinia"…). Chaque page déclare les siens.
 */
export function alternatesFor(locale: Locale, path: string): Metadata["alternates"] {
  return { canonical: localePath(locale, path || "/"), languages: languagePaths(path) };
}

/** Chemin de la page dans chaque langue, plus x-default (le français). */
export function languagePaths(path: string): Record<string, string> {
  const languages: Record<string, string> = {};
  for (const l of locales) languages[l] = localePath(l, path || "/");
  languages["x-default"] = localePath(defaultLocale, path || "/");
  return languages;
}

type PageSeo = {
  locale: Locale;
  path: string;
  title: string | { absolute: string };
  description: string;
};

/** Métadonnées complètes d'une page : titre, description, canonique, hreflang, Open Graph, Twitter. */
export function pageMetadata({ locale, path, title, description }: PageSeo): Metadata {
  const shareTitle = typeof title === "string" ? `${title} — ${site.name}` : title.absolute;
  return {
    title,
    description,
    alternates: alternatesFor(locale, path),
    openGraph: {
      type: "website",
      siteName: site.name,
      locale: OG_LOCALE[locale],
      alternateLocale: locales.filter((l) => l !== locale).map((l) => OG_LOCALE[l]),
      url: localePath(locale, path || "/"),
      title: shareTitle,
      description,
    },
    twitter: { card: "summary_large_image", title: shareTitle, description },
  };
}

export { OG_LOCALE };

/** La personne, décrite une seule fois et reprise par l'accueil et la page Parcours. */
function personNode(locale: Locale, jobTitle: string, description: string) {
  return {
    "@type": "Person",
    "@id": `${SITE_URL}/#person`,
    name: site.fullName,
    givenName: site.givenName,
    familyName: site.familyName,
    alternateName: [...site.alternateNames],
    jobTitle,
    description,
    url: absoluteUrl(localePath(locale)),
    image: absoluteUrl("/images/portrait-haboudi.jpg"),
    email: `mailto:${site.email}`,
    nationality: { "@type": "Country", name: "Bénin" },
    homeLocation: { "@type": "Place", name: `${site.city}, ${site.country}` },
    address: { "@type": "PostalAddress", addressLocality: site.city, addressCountry: site.countryCode },
    alumniOf: { "@type": "CollegeOrUniversity", name: "École Nationale Supérieure de Génie Mathématique et Modélisation (ENSGMM), UNSTIM" },
    knowsAbout: ["Software engineering", "Full-stack development", "Next.js", "React Native", "Machine learning", "Operations research", "GIS"],
    sameAs: [site.github, site.linkedin, site.facebook, site.instagram].filter(Boolean),
  };
}

/** La personne et le site (page d'accueil). Le nom du site est celui que Google affiche dans les résultats. */
export function personJsonLd(locale: Locale, jobTitle: string, description: string) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      personNode(locale, jobTitle, description),
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: absoluteUrl(localePath(locale)),
        name: site.fullName,
        alternateName: [site.alternateNames[0], `${site.fullName} — portfolio`],
        inLanguage: locale,
        publisher: { "@id": `${SITE_URL}/#person` },
      },
    ],
  };
}

/** Page profil (Parcours) : la page parle d'une seule personne. */
export function profilePageJsonLd(locale: Locale, jobTitle: string, description: string) {
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    url: absoluteUrl(localePath(locale, "/parcours")),
    inLanguage: locale,
    mainEntity: personNode(locale, jobTitle, description),
  };
}

/** Fil d'Ariane. */
export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({ "@type": "ListItem", position: i + 1, name: item.name, item: absoluteUrl(item.path) })),
  };
}
