import { ImageResponse } from "next/og";
import { isLocale, locales } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Haboudi BOUKARI";

/** Image de partage (réseaux sociaux, messageries). */
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function OpenGraphImage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  const locale = isLocale(raw) ? raw : "fr";
  const dict = await getDictionary(locale);
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0C1117",
          color: "#E6E9EE",
          padding: "72px 80px",
          fontFamily: "Georgia, serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 26, color: "#9CC3E6" }}>{locale === "fr" ? "Parakou, Bénin" : "Parakou, Benin"}</div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 112, lineHeight: 1 }}>Haboudi BOUKARI</div>
          <div style={{ fontSize: 36, marginTop: 28, color: "#A3ABB6", fontFamily: "Arial, sans-serif" }}>{dict.meta.jobTitle}</div>
        </div>
        <div style={{ display: "flex", height: 2, background: "#27303B" }} />
      </div>
    ),
    size,
  );
}
