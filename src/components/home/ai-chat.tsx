"use client";

import { useEffect, useRef, useState } from "react";
import { Bot, SendHorizontal } from "lucide-react";

/** `from` : "client" ou "ai". */
export type ChatMessage = { from: string; text: string };
export type ChatCopy = { name: string; status: string; note: string; placeholder: string; messages: ChatMessage[] };

const reducedMotion = () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Exemple de conversation entre un client et un assistant IA. Les messages arrivent un à un ;
 * avant chaque réponse, trois points montrent que l'assistant écrit. La boucle ne tourne que
 * si le panneau est visible. Mouvement réduit : toute la conversation, sans animation.
 */
export function AiChat({ copy }: { copy: ChatCopy }) {
  const total = copy.messages.length;
  const [reduced] = useState(reducedMotion);
  const [shown, setShown] = useState(() => (reducedMotion() ? total : 0));
  const [typing, setTyping] = useState(false);
  // Monté quand on choisit le service, donc à l'écran : visible d'entrée, mis en pause hors écran.
  const [visible, setVisible] = useState(true);
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el || reduced) return;
    const io = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting));
    io.observe(el);
    return () => io.disconnect();
  }, [reduced]);

  useEffect(() => {
    if (reduced || !visible) return;
    let id: number;
    if (shown >= total) {
      id = window.setTimeout(() => setShown(0), 4500);
    } else if (copy.messages[shown].from === "client") {
      id = window.setTimeout(() => setShown(shown + 1), shown === 0 ? 600 : 1300);
    } else if (!typing) {
      id = window.setTimeout(() => setTyping(true), 450);
    } else {
      id = window.setTimeout(() => {
        setTyping(false);
        setShown(shown + 1);
      }, 1700);
    }
    return () => window.clearTimeout(id);
  }, [shown, typing, visible, reduced, total, copy.messages]);

  return (
    <div ref={root} className="absolute inset-0 flex flex-col bg-surface-2">
      <div className="flex items-center gap-3 border-b border-line-2 px-5 py-4">
        <span className="flex size-9 items-center justify-center rounded-full bg-accent/15 text-accent">
          <Bot size={18} aria-hidden />
        </span>
        <span className="min-w-0">
          <span className="block text-sm text-text">{copy.name}</span>
          <span className="flex items-center gap-1.5 text-xs text-muted">
            <span className="size-1.5 rounded-full bg-accent" />
            {copy.status}
          </span>
        </span>
        <span className="ml-auto rounded-full border border-line-3 px-2.5 py-1 text-[11px] text-text-2">{copy.note}</span>
      </div>

      <div className="flex min-h-0 flex-1 flex-col justify-end gap-2.5 overflow-hidden px-5 py-5">
        {copy.messages.slice(0, shown).map((m, i) => (
          <p
            key={i}
            data-chat-msg
            className={`m-0 max-w-[82%] rounded-2xl px-4 py-2.5 text-[14px] leading-normal ${
              m.from === "client" ? "self-end rounded-br-md bg-accent text-ink" : "self-start rounded-bl-md bg-line-2 text-text"
            }`}
          >
            {m.text}
          </p>
        ))}
        {typing && (
          <span data-chat-msg className="flex gap-1.5 self-start rounded-2xl rounded-bl-md bg-line-2 px-4 py-3.5">
            <span data-typing-dot className="size-2 rounded-full bg-soft" />
            <span data-typing-dot className="size-2 rounded-full bg-soft" />
            <span data-typing-dot className="size-2 rounded-full bg-soft" />
          </span>
        )}
      </div>

      <div className="mx-5 mb-5 flex items-center gap-3 rounded-full border border-line-2 bg-ink px-4 py-2.5 text-[13px] text-dim">
        {copy.placeholder}
        <SendHorizontal size={16} aria-hidden className="ml-auto text-accent" />
      </div>
    </div>
  );
}
