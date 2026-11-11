import type { MetadataRoute } from "next";
import { localePath, locales } from "@/i18n/config";
import { projects } from "@/content";
import { languagePaths } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site";

/** Chaque page dans chaque langue, avec ses équivalents (hreflang). */
export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["", "/travaux", "/parcours", "/agriculture", "/contact", ...projects.map((p) => `/travaux/${p.slug}`)];
  return paths.flatMap((path) => {
    const languages = Object.fromEntries(Object.entries(languagePaths(path)).map(([lang, href]) => [lang, absoluteUrl(href)]));
    return locales.map((locale) => ({ url: absoluteUrl(localePath(locale, path || "/")), alternates: { languages } }));
  });
}
