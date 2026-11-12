"use client";

import { useEffect, useRef, useState } from "react";
import { Download, LoaderCircle } from "lucide-react";
import { TTS_API } from "@/lib/demos";
import { btnPrimary } from "@/lib/ui";

type Lang = "fr" | "en";
export type TtsCopy = {
  intro: string;
  text: string;
  placeholder: string;
  language: string;
  languages: Record<Lang, string>;
  examples: string;
  exampleTexts: { language: Lang; text: string }[];
  generate: string;
  generating: string;
  waking: string;
  result: string;
  download: string;
  privacy: string;
  fallback: string;
  errors: { rate: string; network: string; invalid: string; empty: string };
};

const MAX = 500;

/** Erreur dont le message est prévu pour le visiteur. */
class ShownError extends Error {}
const pill =
  "inline-flex min-h-11 cursor-pointer items-center rounded-full border border-line-3 px-4.5 py-2.5 text-sm text-soft transition-colors peer-checked:border-accent peer-checked:bg-accent peer-checked:text-ink peer-focus-visible:outline-2 peer-focus-visible:outline-offset-3 peer-focus-visible:outline-accent hover:border-soft";

type State =
  | { kind: "idle" }
  | { kind: "loading"; slow: boolean }
  | { kind: "done"; url: string; audio: string; compute: string; language: Lang }
  | { kind: "error"; message: string };

/** Démo de la synthèse vocale : appelle l'API en ligne et lit l'audio renvoyé. */
export function TtsDemo({ copy, locale }: { copy: TtsCopy; locale: Lang }) {
  const [text, setText] = useState(copy.exampleTexts.find((e) => e.language === locale)?.text ?? "");
  const [language, setLanguage] = useState<Lang>(locale);
  const [state, setState] = useState<State>({ kind: "idle" });
  const audioRef = useRef<HTMLAudioElement>(null);
  const urlRef = useRef<string | null>(null);

  // Libère l'audio précédent quand le composant disparaît.
  useEffect(() => () => void (urlRef.current && URL.revokeObjectURL(urlRef.current)), []);

  async function generate() {
    const value = text.trim();
    if (!value) return setState({ kind: "error", message: copy.errors.empty });
    setState({ kind: "loading", slow: false });
    // Après 5 s sans réponse, le serveur est sans doute en train de démarrer : on le dit.
    const slow = window.setTimeout(() => setState((s) => (s.kind === "loading" ? { kind: "loading", slow: true } : s)), 5000);
    const abort = new AbortController();
    const timeout = window.setTimeout(() => abort.abort(), 100_000);
    try {
      const res = await fetch(`${TTS_API}/tts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: value, language, speed: 1, format: "mp3" }),
        signal: abort.signal,
      });
      if (res.status === 429) throw new ShownError(copy.errors.rate);
      if (res.status === 422) {
        const detail = await res.json().catch(() => null);
        throw new ShownError(copy.errors.invalid + (typeof detail?.detail === "string" ? ` ${detail.detail}` : ""));
      }
      if (!res.ok) throw new ShownError(copy.errors.network);
      const blob = await res.blob();
      if (urlRef.current) URL.revokeObjectURL(urlRef.current);
      const url = URL.createObjectURL(blob);
      urlRef.current = url;
      const fmt = (h: string | null) => (h ? Number(h).toLocaleString(locale, { maximumFractionDigits: 1 }) : "?");
      setState({ kind: "done", url, audio: fmt(res.headers.get("X-Audio-Seconds")), compute: fmt(res.headers.get("X-Compute-Seconds")), language });
      requestAnimationFrame(() => audioRef.current?.play().catch(() => {}));
    } catch (err) {
      setState({ kind: "error", message: err instanceof ShownError ? err.message : copy.errors.network });
    } finally {
      clearTimeout(slow);
      clearTimeout(timeout);
    }
  }

  const loading = state.kind === "loading";

  return (
    <div className="max-w-[820px]">
      <p className="m-0 mb-8 text-base leading-[1.8] text-text-2">{copy.intro}</p>

      <div className="rounded-[20px] border border-line-1 bg-surface-1 p-5 md:p-7">
        <div className="mb-3 flex items-baseline justify-between gap-4">
          <label htmlFor="tts-text" className="text-sm text-text">
            {copy.text}
          </label>
          <span className={`text-xs ${text.length > MAX ? "text-[#f2a7a0]" : "text-muted"}`}>
            {text.length} / {MAX}
          </span>
        </div>
        <textarea
          id="tts-text"
          rows={4}
          maxLength={MAX}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={copy.placeholder}
          className="w-full resize-y rounded-xl border border-line-2 bg-ink px-4 py-3.5 text-[15px] leading-[1.6] text-text outline-none transition-[border-color,box-shadow] placeholder:text-dim focus:border-accent focus:shadow-[0_0_0_3px_rgba(156,195,230,0.15)]"
        />

        <fieldset className="m-0 mt-6 border-0 p-0">
          <legend className="mb-3 p-0 text-sm text-text">{copy.language}</legend>
          <div className="flex flex-wrap gap-2.5">
            {(["fr", "en"] as const).map((l) => (
              <label key={l}>
                <input type="radio" name="tts-language" value={l} checked={language === l} onChange={() => setLanguage(l)} className="peer sr-only" />
                <span className={pill}>{copy.languages[l]}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <div className="mt-6">
          <p className="m-0 mb-3 text-sm text-text">{copy.examples}</p>
          <div className="flex flex-col gap-2">
            {copy.exampleTexts.map((e) => (
              <button
                key={e.text}
                type="button"
                onClick={() => {
                  setText(e.text);
                  setLanguage(e.language);
                }}
                className="cursor-pointer rounded-xl border border-line-2 bg-transparent px-4 py-3 text-left text-sm leading-normal text-text-2 transition-colors hover:border-soft hover:text-text"
              >
                <span className="mr-2 text-xs text-accent">{e.language.toUpperCase()}</span>
                {e.text}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-7 flex flex-wrap items-center gap-4">
          <button type="button" onClick={generate} disabled={loading} className={`${btnPrimary} cursor-pointer disabled:cursor-wait disabled:opacity-70`}>
            {loading && <LoaderCircle size={16} aria-hidden className="motion-safe:animate-spin" />}
            {loading ? copy.generating : copy.generate}
          </button>
          <p className="m-0 text-xs text-muted">{copy.privacy}</p>
        </div>

        <div aria-live="polite" className="mt-6 empty:hidden">
          {state.kind === "loading" && state.slow && <p className="m-0 text-sm text-text-2">{copy.waking}</p>}
          {state.kind === "error" && (
            <p className="m-0 text-sm text-[#f2a7a0]">
              {state.message}{" "}
              <a href={TTS_API} target="_blank" rel="noopener" className="border-b border-current text-text">
                {copy.fallback} ↗
              </a>
            </p>
          )}
          {state.kind === "done" && (
            <div className="rounded-xl border border-line-2 bg-ink p-4">
              <audio ref={audioRef} controls src={state.url} className="w-full" />
              <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
                <p className="m-0 text-sm text-text-2">{copy.result.replace("{audio}", state.audio).replace("{compute}", state.compute)}</p>
                <a href={state.url} download={`voix-${state.language}.mp3`} className="inline-flex items-center gap-2 text-sm text-accent">
                  <Download size={15} aria-hidden /> {copy.download}
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
