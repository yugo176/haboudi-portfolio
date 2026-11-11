import "server-only";
import type { ContactInput } from "@/lib/validations/contact";

const TYPE_LABELS: Record<string, string> = {
  site: "Site ou boutique",
  platform: "Plateforme métier",
  mobile: "Application mobile",
  ai: "Intégration d'IA",
  other: "Autre",
};
const TIMELINE_LABELS: Record<string, string> = { asap: "Dès que possible", soon: "Dans 1 à 3 mois", unknown: "Pas encore défini" };

/** Échappe tout texte saisi par le visiteur avant de l'insérer dans le HTML de l'email. */
function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
}

export function contactEmail(input: ContactInput, locale: string) {
  const types = input.types.map((t) => TYPE_LABELS[t] ?? t).join(", ");
  const timeline = input.timeline ? TIMELINE_LABELS[input.timeline] : "—";
  const rows: [string, string][] = [
    ["Nom", input.name],
    ["Email", input.email],
    ["Entreprise", input.company || "—"],
    ["Projet", types],
    ["Échéance", timeline],
    ["Langue du site", locale.toUpperCase()],
  ];

  const subject = `Portfolio · ${input.name} · ${types}`.slice(0, 150);
  const text = `${rows.map(([k, v]) => `${k} : ${v}`).join("\n")}\n\n${input.message}`;
  const html = `<div style="font-family:Arial,sans-serif;font-size:15px;line-height:1.6;color:#111">
  <h2 style="margin:0 0 16px;font-size:18px">Nouveau message depuis le portfolio</h2>
  <table style="border-collapse:collapse;margin-bottom:20px">${rows
    .map(([k, v]) => `<tr><td style="padding:4px 16px 4px 0;color:#666">${escapeHtml(k)}</td><td style="padding:4px 0">${escapeHtml(v)}</td></tr>`)
    .join("")}</table>
  <div style="white-space:pre-wrap;border-left:3px solid #9cc3e6;padding-left:14px">${escapeHtml(input.message)}</div>
</div>`;

  return { subject, text, html };
}
