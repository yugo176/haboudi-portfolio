import type { CSSProperties } from "react";
import { Bell, Database, MessageCircle, Sparkles } from "lucide-react";

const ICONS = [MessageCircle, Sparkles, Database, Bell];

/**
 * Schéma en quatre étapes : un point voyage de l'une à l'autre et chaque étape s'allume à son
 * passage (CSS). L'animation ne tourne que quand le schéma est visible, et tout reste lisible
 * sans elle.
 */
export function AiFlow({ steps, label }: { steps: { title: string; body: string }[]; label: string }) {
  return (
    <div data-flow role="group" aria-label={label} className="mb-18 flex flex-col items-stretch md:flex-row md:items-center">
      {steps.map((s, k) => {
        const Icon = ICONS[k] ?? Sparkles;
        return (
          <div key={k} className="contents">
            <div className="flow-node min-w-0 flex-1 rounded-2xl border border-line-2 bg-surface-1 p-5.5 text-muted" style={{ "--k": k } as CSSProperties}>
              <Icon size={26} strokeWidth={1.5} aria-hidden />
              <p className="mb-1 mt-4 font-serif text-2xl text-text">{s.title}</p>
              <p className="m-0 text-[13px] leading-[1.6] text-muted">{s.body}</p>
            </div>
            {k < steps.length - 1 && (
              <div aria-hidden className="relative ml-9 h-7 w-px shrink-0 bg-line-2 md:ml-0 md:h-px md:w-14">
                <span
                  className="flow-dot absolute -left-[3px] -top-[3px] size-[7px] rounded-full bg-accent opacity-0 md:left-0"
                  style={{ "--k": k } as CSSProperties}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
