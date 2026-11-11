import type { CSSProperties } from "react";
import type { Locale } from "@/i18n/config";
import { delay } from "./parts";

const L = (locale: Locale, fr: string, en: string) => (locale === "fr" ? fr : en);

/* ——— IZINIA : architecture en trois niveaux ——— */

function Node({ kicker, label, accent, d }: { kicker: string; label: string; accent?: boolean; d: number }) {
  return (
    <div data-reveal style={delay(d)} className={`rounded-[14px] border bg-surface-1 px-4.5 py-4 ${accent ? "border-accent" : "border-line-2"}`}>
      <p className={`m-0 text-xs ${accent ? "text-accent" : "text-muted"}`}>{kicker}</p>
      <p className="m-0 mt-1 text-[15px]">{label}</p>
    </div>
  );
}

export function IziniaArchitecture({ locale }: { locale: Locale }) {
  const service = L(locale, "Service", "Service");
  return (
    <div>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,150px),1fr))] gap-3">
        <Node kicker="Mobile" label={L(locale, "Client · Livreur", "Customer · Courier")} d={0.1} />
        <Node kicker="Mobile" label={L(locale, "Colis · Expéditeur", "Parcels · Sender")} d={0.18} />
        <Node kicker="Web" label={L(locale, "Partenaires", "Partners")} d={0.26} />
        <Node kicker="Web" label="Back-office" d={0.34} />
      </div>
      <p aria-hidden className="m-0 py-3.5 text-center text-[13px] text-dim">↓ {L(locale, "API REST et temps réel (Socket.IO)", "REST API and real time (Socket.IO)")} ↓</p>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,200px),1fr))] gap-3">
        <Node kicker={service} label={L(locale, "Authentification et comptes", "Authentication and accounts")} accent d={0.42} />
        <Node kicker={service} label={L(locale, "Restaurants et commandes", "Restaurants and orders")} accent d={0.5} />
        <Node kicker={service} label={L(locale, "Colis et courses", "Parcels and errands")} accent d={0.58} />
      </div>
      <p aria-hidden className="m-0 py-3.5 text-center text-[13px] text-dim">↓ {L(locale, "schéma partagé (Prisma)", "shared schema (Prisma)")} ↓</p>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,200px),1fr))] gap-3">
        <Node kicker={L(locale, "Données", "Data")} label={L(locale, "PostgreSQL · stockage S3", "PostgreSQL · S3 storage")} d={0.66} />
        <Node kicker={L(locale, "Services externes", "External services")} label="Gemini · Mobile Money · OSRM" d={0.74} />
        <Node kicker={L(locale, "Hébergement", "Hosting")} label={L(locale, "Mon serveur (VPS)", "My own server (VPS)")} d={0.82} />
      </div>
      <p className="mt-10 max-w-[760px] text-base leading-[1.8] text-text-2">
        {L(
          locale,
          "Avant toute mise en ligne, j'ai rédigé un cahier de 35 scénarios de bout en bout : parcours de commande, annulations et remboursements, fenêtre d'arbitrage de 20 minutes, actions simultanées, incidents de livraison, commissions et retraits, rôles et accès.",
          "Before any launch, I wrote a book of 35 end-to-end scenarios: ordering, cancellations and refunds, a 20-minute arbitration window, simultaneous actions, delivery incidents, commissions and withdrawals, roles and access.",
        )}
      </p>
    </div>
  );
}

/* ——— Agro Hikari : le simulateur de devis ——— */

export function AgroSimulator({ locale }: { locale: Locale }) {
  return (
    <div className="flex flex-wrap items-center gap-12">
      <div className="min-w-0 flex-[1_1_360px]">
        <p className="m-0 text-[17px] leading-[1.75]">
          {L(
            locale,
            "Le visiteur indique la surface de son exploitation et le nombre de passages souhaités : il obtient une estimation en francs CFA, ligne par ligne.",
            "Visitors enter the size of their farm and the number of passes they want: they get an estimate in CFA francs, line by line.",
          )}
        </p>
        <p className="mt-4.5 text-[15px] leading-[1.75] text-text-2">
          {L(
            locale,
            "Les tarifs ne sont pas écrits dans le code : ils viennent des formules que l'équipe gère dans le back-office. Le même calcul sert au simulateur et au formulaire de contact, pour que le chiffre affiché et le chiffre envoyé soient toujours identiques.",
            "Prices aren't written in the code: they come from the plans the team manages in the back office. The same calculation powers the simulator and the contact form, so the figure shown and the figure sent are always identical.",
          )}
        </p>
      </div>
      <div aria-hidden className="min-w-0 flex-[1_1_380px] rounded-[18px] border border-line-2 bg-surface-1 p-7" data-reveal style={delay(0.25)}>
        <p className="m-0 mb-2 text-xs text-muted">{L(locale, "Surface (hectares)", "Surface (hectares)")}</p>
        <div className="relative h-1 rounded bg-line-2">
          <span className="absolute inset-y-0 left-0 w-[38%] rounded bg-accent" />
          <span className="absolute -top-1.5 left-[38%] -ml-2 size-4 rounded-full bg-text" />
        </div>
        <p className="m-0 mb-2 mt-6 text-xs text-muted">{L(locale, "Passages", "Passes")}</p>
        <div className="flex gap-2">
          {[1, 2, 3].map((n) => (
            <span key={n} className={`rounded-full px-3 py-1.5 text-[13px] ${n === 2 ? "bg-accent text-ink" : "border border-line-3 text-text-2"}`}>
              {n}
            </span>
          ))}
        </div>
        <div className="mt-6 flex flex-col gap-2.5 border-t border-line-2 pt-4.5">
          <span className="h-1.5 rounded bg-line-2" />
          <span className="h-1.5 w-4/5 rounded bg-line-2" />
          <span className="text-right font-serif text-[26px]">{L(locale, "Estimation détaillée", "Detailed estimate")}</span>
        </div>
      </div>
    </div>
  );
}

/* ——— audio-cnn : chaîne de traitement et vraies prédictions ——— */

export const AUDIO_TOP5 = [
  { fr: "Chien", en: "Dog", p: 0.8256 },
  { fr: "Coups à une porte", en: "Door knock", p: 0.016 },
  { fr: "Poule", en: "Hen", p: 0.0159 },
  { fr: "Klaxon", en: "Car horn", p: 0.0074 },
  { fr: "Moteur", en: "Engine", p: 0.0052 },
];

const WAVE = [5, 12, 30, 62, 88, 100, 92, 70, 48, 30, 22, 18, 26, 44, 66, 80, 72, 56, 38, 24, 14, 10, 8, 6];

export function AudioPredictions({ locale }: { locale: Locale }) {
  const pct = (p: number) => `${(p * 100).toFixed(1).replace(".", locale === "fr" ? "," : ".")}${locale === "fr" ? " %" : "%"}`;
  return (
    <div className="flex w-full flex-wrap items-center gap-12">
      <div className="min-w-0 flex-[1.3_1_380px]">
        <p className="m-0 mb-3.5 text-xs text-muted">dog.wav · 5 s</p>
        <div className="flex h-28 items-center gap-[3px]">
          {WAVE.map((h, i) => (
            <span key={i} className={`flex-1 rounded-[2px] ${h > 70 ? "bg-accent" : "bg-line-3"}`} style={{ height: `${h}%` }} />
          ))}
        </div>
        <div className="mt-4 grid grid-cols-24 gap-[2px]">
          {Array.from({ length: 96 }, (_, i) => {
            const col = i % 24;
            const row = Math.floor(i / 24);
            const v = (WAVE[col] / 100) * [0.25, 0.45, 0.65, 0.9][row];
            return <span key={i} className="block aspect-square rounded-[1px]" style={{ background: `rgba(156,195,230,${(0.08 + v * 0.85).toFixed(2)})` } as CSSProperties} />;
          })}
        </div>
        <p className="mt-3 text-xs text-muted">{L(locale, "Spectrogramme Mel · ce que le réseau « voit »", "Mel spectrogram · what the network “sees”")}</p>
      </div>
      <div className="min-w-0 flex-[1_1_300px]">
        <p className="m-0 mb-4 text-[13px] text-text-2">{L(locale, "Prédictions du modèle", "Model predictions")}</p>
        <ol className="m-0 list-none p-0">
          {AUDIO_TOP5.map((r, i) => (
            <li key={r.en} className="grid grid-cols-[minmax(0,1fr)_60px] items-center gap-3 py-2">
              <div>
                <span className={`mb-1.5 block text-sm ${i === 0 ? "text-accent" : "text-text-2"}`}>{locale === "fr" ? r.fr : r.en}</span>
                <span className="block h-1.5 rounded bg-line-2">
                  <span className={`block h-full rounded ${i === 0 ? "bg-accent" : "bg-muted"}`} style={{ width: `${Math.max(1, r.p * 100)}%` }} />
                </span>
              </div>
              <span className={`text-right text-sm ${i === 0 ? "text-accent" : "text-text-2"}`}>{pct(r.p)}</span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

export function AudioPipeline({ locale }: { locale: Locale }) {
  const steps = [
    [L(locale, "1 · Entrée", "1 · Input"), L(locale, "Un son", "A sound"), L(locale, "fichier ou micro", "file or microphone")],
    [L(locale, "2 · Image", "2 · Image"), L(locale, "Spectrogramme", "Spectrogram"), L(locale, "128 bandes de fréquence", "128 frequency bands")],
    [L(locale, "3 · Réseau", "3 · Network"), "ResNet-34", L(locale, "blocs résiduels", "residual blocks")],
    [L(locale, "4 · Sortie", "4 · Output"), "Top 5", L(locale, "parmi 50 sons", "out of 50 sounds")],
  ];
  return (
    <ol className="m-0 flex list-none flex-col gap-3.5 p-0 md:flex-row md:items-stretch">
      {steps.map(([k, title, body], i) => (
        <li key={i} data-reveal style={delay(0.1 + i * 0.12)} className={`flex-1 rounded-[14px] border bg-surface-1 p-4.5 ${i === 2 ? "border-accent" : "border-line-2"}`}>
          <p className={`m-0 text-xs ${i === 2 ? "text-accent" : "text-muted"}`}>{k}</p>
          <p className="m-0 mt-1.5 font-serif text-[22px]">{title}</p>
          <p className="m-0 mt-1.5 text-[13px] text-text-2">{body}</p>
        </li>
      ))}
    </ol>
  );
}
