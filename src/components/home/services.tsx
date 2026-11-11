"use client";

import { useId, useState } from "react";
import Image from "next/image";
import { AiChat, type ChatCopy } from "./ai-chat";

type ServiceView = { id: string; title: string; body: string };

/**
 * Liste de services en grands titres : survol, focus ou toucher activent un service et
 * affichent son aperçu. Le premier est actif d'entrée : rien ne dépend du survol.
 */
export function Services({ services, chat }: { services: ServiceView[]; chat: ChatCopy }) {
  const [active, setActive] = useState(0);
  const showChat = services[active].id === "ai";
  const panelId = useId();

  return (
    <div className="flex flex-wrap items-center gap-16">
      <div className="min-w-0 flex-[1.25_1_520px] border-b border-line-2">
        {services.map((s, i) => {
          const on = active === i;
          return (
            <button
              key={s.id}
              type="button"
              aria-pressed={on}
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              onClick={() => setActive(i)}
              className="block w-full cursor-pointer border-0 border-t border-line-2 bg-transparent py-6 text-left text-inherit"
            >
              <span className="flex items-baseline gap-7">
                <span className={`min-w-7 text-[13px] transition-colors duration-300 ${on ? "text-accent" : "text-faint"}`}>0{i + 1}</span>
                <span
                  className={`flex-1 font-serif text-[clamp(34px,4vw,54px)] leading-[1.05] transition-[color,transform] duration-300 ${on ? "translate-x-2.5 text-text" : "text-faint"}`}
                >
                  {s.title}
                </span>
                <span className={`text-2xl text-accent transition-[opacity,transform] duration-300 ${on ? "opacity-100" : "-translate-x-3 opacity-0"}`} aria-hidden>
                  →
                </span>
              </span>
              {on && (
                <span className="block max-w-[520px] pl-14 pt-4 text-[15px] leading-[1.7] text-text-2">
                  {s.body}
                </span>
              )}
            </button>
          );
        })}
      </div>
      {/* Images dans public/images/services/<id>.webp ; pour l'IA, un exemple de conversation. */}
      <div
        id={panelId}
        aria-hidden
        className="relative aspect-[4/3] min-h-[340px] min-w-0 flex-[1_1_380px] overflow-hidden rounded-[20px] border border-line-1 bg-surface-2"
      >
        {services
          .filter((s) => s.id !== "ai")
          .map((s) => (
            <Image
              key={s.id}
              src={`/images/services/${s.id}.webp`}
              alt=""
              fill
              sizes="(min-width: 1024px) 42vw, 100vw"
              className={`object-cover motion-safe:transition-opacity motion-safe:duration-500 ${services[active].id === s.id ? "opacity-100" : "opacity-0"}`}
            />
          ))}
        {showChat ? (
          <AiChat copy={chat} />
        ) : (
          <>
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/75 via-ink/5 to-transparent" />
            <p className="absolute bottom-5 left-6 m-0 font-serif text-[22px] text-text">
              0{active + 1} · {services[active].title}
            </p>
          </>
        )}
      </div>
    </div>
  );
}
