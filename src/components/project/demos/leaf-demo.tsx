"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { LoaderCircle, Upload } from "lucide-react";
import { LEAF_API } from "@/lib/demos";
import { btnPrimary, btnSecondary } from "@/lib/ui";

type Lang = "fr" | "en";
type Crop = "maize" | "cassava" | "tomato" | "cashew";
export type LeafCopy = {
  intro: string;
  samples: string;
  upload: string;
  crop: string;
  crops: Record<"auto" | Crop, string>;
  analyze: string;
  analyzing: string;
  waking: string;
  pick: string;
  top: string;
  advice: string;
  lowConfidence: string;
  expected: string;
  privacy: string;
  credit: string;
  fallback: string;
  errors: { rate: string; network: string; file: string };
};

/** Photos du jeu de test CCMT (jamais vues à l'entraînement), avec leur vraie étiquette. */
const SAMPLES: { file: string; crop: Crop; label: Record<Lang, string> }[] = [
  { file: "maize-streak-virus", crop: "maize", label: { fr: "Virus de la striure du maïs", en: "Maize streak virus" } },
  { file: "maize-fall-armyworm", crop: "maize", label: { fr: "Chenille légionnaire d'automne", en: "Fall armyworm" } },
  { file: "cassava-mosaic", crop: "cassava", label: { fr: "Mosaïque du manioc", en: "Cassava mosaic disease" } },
  { file: "cassava-green-mite", crop: "cassava", label: { fr: "Acarien vert", en: "Green mite" } },
  { file: "tomato-leaf-curl", crop: "tomato", label: { fr: "Enroulement des feuilles (virus)", en: "Leaf curl" } },
  { file: "tomato-septoria-leaf-spot", crop: "tomato", label: { fr: "Septoriose", en: "Septoria leaf spot" } },
  { file: "cashew-anthracnose", crop: "cashew", label: { fr: "Anthracnose", en: "Anthracnose" } },
  { file: "cashew-healthy", crop: "cashew", label: { fr: "Sain", en: "Healthy" } },
];

type Prediction = { id: string; label_fr: string; label_en: string; probability: number };
type Result = { predictions: Prediction[]; advice: string[]; warning: string; low_confidence: boolean };
type Picked = { preview: string; blob: Blob; sample?: (typeof SAMPLES)[number] };
type State = { kind: "idle" } | { kind: "loading"; slow: boolean } | { kind: "done"; result: Result } | { kind: "error"; message: string };

const pill =
  "inline-flex min-h-11 cursor-pointer items-center rounded-full border border-line-3 px-4.5 py-2.5 text-sm text-soft transition-colors peer-checked:border-accent peer-checked:bg-accent peer-checked:text-ink peer-focus-visible:outline-2 peer-focus-visible:outline-offset-3 peer-focus-visible:outline-accent hover:border-soft";

/** Erreur dont le message est prévu pour le visiteur. */
class ShownError extends Error {}

/** Réduit la photo à 1024 px au plus avant l'envoi : plus rapide sur une connexion mobile. */
async function shrink(file: Blob): Promise<Blob> {
  const bitmap = await createImageBitmap(file);
  const scale = Math.min(1, 1024 / Math.max(bitmap.width, bitmap.height));
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(bitmap.width * scale);
  canvas.height = Math.round(bitmap.height * scale);
  canvas.getContext("2d")!.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  bitmap.close();
  return new Promise((resolve, reject) => canvas.toBlob((b) => (b ? resolve(b) : reject(new Error("toBlob"))), "image/jpeg", 0.9));
}

/** Démo du détecteur : une photo d'exemple ou du visiteur, envoyée à l'API en ligne. */
export function LeafDemo({ copy, locale }: { copy: LeafCopy; locale: Lang }) {
  const [picked, setPicked] = useState<Picked | null>(null);
  const [crop, setCrop] = useState<"auto" | Crop>("auto");
  const [state, setState] = useState<State>({ kind: "idle" });
  const input = useRef<HTMLInputElement>(null);
  const ownUrl = useRef<string | null>(null);

  useEffect(() => () => void (ownUrl.current && URL.revokeObjectURL(ownUrl.current)), []);

  async function pickSample(s: (typeof SAMPLES)[number]) {
    const src = `/images/demos/feuilles/${s.file}.jpg`;
    const blob = await fetch(src).then((r) => r.blob());
    setPicked({ preview: src, blob, sample: s });
    setCrop("auto");
    setState({ kind: "idle" });
  }

  async function pickFile(file: File | undefined) {
    if (!file) return;
    try {
      const blob = await shrink(file);
      if (ownUrl.current) URL.revokeObjectURL(ownUrl.current);
      ownUrl.current = URL.createObjectURL(blob);
      setPicked({ preview: ownUrl.current, blob });
      setState({ kind: "idle" });
    } catch {
      setState({ kind: "error", message: copy.errors.file });
    }
  }

  async function analyze() {
    if (!picked) return;
    setState({ kind: "loading", slow: false });
    const slow = window.setTimeout(() => setState((s) => (s.kind === "loading" ? { kind: "loading", slow: true } : s)), 5000);
    const abort = new AbortController();
    const timeout = window.setTimeout(() => abort.abort(), 100_000);
    try {
      const body = new FormData();
      body.append("file", picked.blob, "feuille.jpg");
      const params = new URLSearchParams({ lang: locale });
      if (crop !== "auto") params.set("crop", crop);
      const res = await fetch(`${LEAF_API}/predict?${params}`, { method: "POST", body, signal: abort.signal });
      if (res.status === 429) throw new ShownError(copy.errors.rate);
      if (res.status === 413 || res.status === 422) throw new ShownError(copy.errors.file);
      if (!res.ok) throw new ShownError(copy.errors.network);
      setState({ kind: "done", result: (await res.json()) as Result });
    } catch (err) {
      setState({ kind: "error", message: err instanceof ShownError ? err.message : copy.errors.network });
    } finally {
      clearTimeout(slow);
      clearTimeout(timeout);
    }
  }

  const loading = state.kind === "loading";
  const cropName = (id: string) => copy.crops[id.split("/")[0] as Crop] ?? "";
  // Typographie : espace avant les deux-points en français, pas en anglais.
  const sep = locale === "fr" ? " : " : ": ";
  const pct = (p: number) => `${Math.round(p * 100)}${locale === "fr" ? " %" : "%"}`;

  return (
    <div className="max-w-[880px]">
      <p className="m-0 mb-8 text-base leading-[1.8] text-text-2">{copy.intro}</p>

      <div className="rounded-[20px] border border-line-1 bg-surface-1 p-5 md:p-7">
        <p className="m-0 mb-3 text-sm text-text">{copy.samples}</p>
        <div className="grid grid-cols-4 gap-2.5 sm:grid-cols-8">
          {SAMPLES.map((s) => {
            const on = picked?.sample?.file === s.file;
            return (
              <button
                key={s.file}
                type="button"
                onClick={() => pickSample(s)}
                aria-pressed={on}
                aria-label={`${copy.crops[s.crop]}${sep}${s.label[locale]}`}
                className={`relative aspect-square cursor-pointer overflow-hidden rounded-xl border-2 bg-transparent p-0 transition-colors ${on ? "border-accent" : "border-line-2 hover:border-soft"}`}
              >
                <Image src={`/images/demos/feuilles/${s.file}.jpg`} alt="" fill sizes="(min-width: 640px) 100px, 22vw" className="object-cover" />
              </button>
            );
          })}
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-3">
          <button type="button" onClick={() => input.current?.click()} className={`${btnSecondary} cursor-pointer`}>
            <Upload size={16} aria-hidden /> {copy.upload}
          </button>
          <input ref={input} type="file" accept="image/*" className="sr-only" tabIndex={-1} onChange={(e) => pickFile(e.target.files?.[0])} />
          <p className="m-0 text-xs text-muted">{copy.privacy}</p>
        </div>

        <fieldset className="m-0 mt-6 border-0 p-0">
          <legend className="mb-3 p-0 text-sm text-text">{copy.crop}</legend>
          <div className="flex flex-wrap gap-2.5">
            {(["auto", "maize", "cassava", "tomato", "cashew"] as const).map((c) => (
              <label key={c}>
                <input type="radio" name="leaf-crop" value={c} checked={crop === c} onChange={() => setCrop(c)} className="peer sr-only" />
                <span className={pill}>{copy.crops[c]}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <div className="mt-7 grid gap-6 md:grid-cols-[200px_minmax(0,1fr)]">
          <div className="relative aspect-square overflow-hidden rounded-xl border border-line-2 bg-ink">
            {picked ? (
              // Aperçu local (exemple ou photo du visiteur) : pas besoin d'optimisation.
              // eslint-disable-next-line @next/next/no-img-element
              <img src={picked.preview} alt="" className="size-full object-cover" />
            ) : (
              <p className="m-0 flex size-full items-center justify-center p-4 text-center text-sm text-dim">{copy.pick}</p>
            )}
          </div>

          <div className="min-w-0">
            <button type="button" onClick={analyze} disabled={!picked || loading} className={`${btnPrimary} cursor-pointer disabled:cursor-not-allowed disabled:opacity-60`}>
              {loading && <LoaderCircle size={16} aria-hidden className="motion-safe:animate-spin" />}
              {loading ? copy.analyzing : copy.analyze}
            </button>

            <div aria-live="polite" className="mt-5">
              {state.kind === "loading" && state.slow && <p className="m-0 text-sm text-text-2">{copy.waking}</p>}
              {state.kind === "error" && (
                <p className="m-0 text-sm text-[#f2a7a0]">
                  {state.message}{" "}
                  <a href={LEAF_API} target="_blank" rel="noopener" className="border-b border-current text-text">
                    {copy.fallback} ↗
                  </a>
                </p>
              )}
              {state.kind === "done" && (
                <div>
                  <p className="m-0 mb-3 text-sm text-text">{copy.top}</p>
                  <ol className="m-0 list-none space-y-3 p-0">
                    {state.result.predictions.map((p, i) => (
                      <li key={p.id}>
                        <div className="flex items-baseline justify-between gap-4 text-sm">
                          <span className={i === 0 ? "text-text" : "text-text-2"}>
                            {cropName(p.id)}{sep}{locale === "fr" ? p.label_fr : p.label_en}
                          </span>
                          <span className="shrink-0 tabular-nums text-muted">{pct(p.probability)}</span>
                        </div>
                        <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-line-2">
                          <div className={`h-full rounded-full ${i === 0 ? "bg-accent" : "bg-soft/50"}`} style={{ width: `${Math.max(1, p.probability * 100)}%` }} />
                        </div>
                      </li>
                    ))}
                  </ol>
                  {picked?.sample && (
                    <p className="m-0 mt-4 text-sm text-text-2">
                      {copy.expected}{sep}<span className="text-text">{copy.crops[picked.sample.crop]}{sep}{picked.sample.label[locale]}</span>
                    </p>
                  )}
                  {state.result.low_confidence && <p className="m-0 mt-3 text-sm text-[#e8c77a]">{copy.lowConfidence}</p>}
                  {state.result.advice.length > 0 && (
                    <>
                      <p className="m-0 mb-2 mt-5 text-sm text-text">{copy.advice}</p>
                      <ul className="m-0 list-disc space-y-1.5 pl-5 text-sm leading-[1.6] text-text-2">
                        {state.result.advice.map((a) => (
                          <li key={a}>{a}</li>
                        ))}
                      </ul>
                    </>
                  )}
                  <p className="m-0 mt-4 text-xs leading-[1.6] text-muted">{state.result.warning}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <p className="m-0 mt-3 text-xs text-muted">{copy.credit}</p>
    </div>
  );
}
