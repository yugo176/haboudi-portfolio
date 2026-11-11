import { clsx, type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

/** Bouton pilule plein (action principale). */
export const btnPrimary =
  "inline-flex min-h-12 items-center justify-center gap-2.5 rounded-full bg-text px-6 py-3.5 text-sm font-medium text-ink transition-colors hover:bg-accent";

/** Bouton pilule souligné d'un trait (action secondaire). */
export const btnSecondary =
  "inline-flex min-h-12 items-center justify-center gap-2.5 rounded-full border border-text/35 px-6 py-3.5 text-sm text-text transition-colors hover:border-accent hover:text-accent";

/** Lien texte souligné en bleu. */
export const linkUnderline = "border-b border-accent pb-1 text-sm transition-colors hover:text-accent";

/** Grand titre de section en serif. */
export const h2Serif = "font-serif text-[44px] leading-none font-normal md:text-[56px]";
