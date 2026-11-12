import type { Metadata, Viewport } from "next";
import { Instrument_Serif, Inter } from "next/font/google";
import "../globals.css";
import { locales } from "@/i18n/config";
import { getDictionary, getLocale } from "@/i18n/get-dictionary";
import { OG_LOCALE } from "@/lib/seo";
import { site, SITE_URL } from "@/lib/site";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { RevealObserver } from "@/components/motion/reveal-observer";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const instrument = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument",
  display: "swap",
});

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const viewport: Viewport = {
  themeColor: "#0c1117",
  colorScheme: "dark",
};

const isPreview = Boolean(process.env.VERCEL_ENV) && process.env.VERCEL_ENV !== "production";
const googleVerification = process.env.GOOGLE_SITE_VERIFICATION?.trim();

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const dict = await getDictionary(locale);
  return {
    metadataBase: new URL(SITE_URL),
    title: { default: dict.meta.title, template: `%s — ${site.name}` },
    description: dict.meta.description,
    applicationName: site.name,
    authors: [{ name: site.fullName, url: SITE_URL }],
    creator: site.fullName,
    // Pas de canonique ici : chaque page déclare la sienne (pageMetadata).
    openGraph: { siteName: site.name, locale: OG_LOCALE[locale], type: "website" },
    // Préversions Vercel : jamais indexées, même si un lien y mène (robots.txt les bloque aussi).
    ...(isPreview ? { robots: { index: false, follow: false } } : {}),
    // Google Search Console : code de la balise HTML, mis dans une variable sur Vercel.
    ...(googleVerification ? { verification: { google: googleVerification } } : {}),
  };
}

export default async function LocaleLayout({ children }: LayoutProps<"/[locale]">) {
  const locale = await getLocale();
  const dict = await getDictionary(locale);

  return (
    <html lang={locale} className={`${inter.variable} ${instrument.variable}`} suppressHydrationWarning>
      <head>
        {/* Active les apparitions animées seulement si le JavaScript tourne : sinon tout reste visible. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body className="min-h-dvh bg-ink text-text">
        <a
          href="#contenu"
          className="sr-only z-50 rounded-full bg-text px-5 py-3 text-sm font-medium text-ink focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          {dict.nav.skip}
        </a>
        <Header locale={locale} nav={dict.nav} />
        <main id="contenu">{children}</main>
        <Footer locale={locale} dict={dict} />
        <RevealObserver />
      </body>
    </html>
  );
}
