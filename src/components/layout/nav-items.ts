import type { Dictionary } from "@/i18n/get-dictionary";

export type NavKey = "work" | "journey" | "agriculture" | "contact";

export const NAV_ITEMS: { key: NavKey; path: string }[] = [
  { key: "work", path: "/travaux" },
  { key: "journey", path: "/parcours" },
  { key: "agriculture", path: "/agriculture" },
  { key: "contact", path: "/contact" },
];

export type NavDict = Dictionary["nav"];
