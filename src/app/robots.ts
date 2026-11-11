import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  // Les préversions Vercel ne doivent pas être indexées : seule la production l'est.
  const isPreview = process.env.VERCEL_ENV && process.env.VERCEL_ENV !== "production";
  return {
    rules: isPreview ? { userAgent: "*", disallow: "/" } : { userAgent: "*", allow: "/" },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
