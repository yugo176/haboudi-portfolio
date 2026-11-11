import type { ProjectStatus } from "@/content";

/** Couleur du badge d'état : bleu = en ligne ou livré, clair = en cours, gris = le reste. */
export function statusTone(status: ProjectStatus): "live" | "wip" | "neutral" {
  if (status === "live" || status === "delivered") return "live";
  if (status === "in-progress") return "wip";
  return "neutral";
}

export function badgeClass(status: ProjectStatus) {
  const tone = statusTone(status);
  return `inline-block whitespace-nowrap rounded-full border px-2.5 py-1 text-xs ${
    tone === "live" ? "border-accent text-accent" : tone === "wip" ? "border-soft text-text" : "border-line-3 text-text-2"
  }`;
}
