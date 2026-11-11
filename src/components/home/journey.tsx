"use client";

import { useEffect, useRef } from "react";

type Step = { period: string; title: string; place: string };

/**
 * Frise : une ligne centrale qui se remplit au fil du défilement, et des étapes qui s'allument
 * quand la ligne les atteint. Un seul écouteur passif, une seule écriture par image : le
 * défilement reste libre. En mouvement réduit, la ligne est pleine et tout est allumé.
 */
export function Journey({ steps }: { steps: Step[] }) {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const fill = el.querySelector<HTMLElement>("[data-line-fill]");
    const rows = Array.from(el.querySelectorAll<HTMLElement>("[data-step]"));
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let raf = 0;
    let trailing: number | undefined;

    const update = () => {
      raf = 0;
      const rect = el.getBoundingClientRect();
      const progress = reduced.matches ? 1 : Math.min(1, Math.max(0, (window.innerHeight * 0.62 - rect.top) / rect.height));
      fill?.style.setProperty("transform", `scaleY(${progress})`);
      for (const row of rows) {
        const r = row.getBoundingClientRect();
        const mark = (r.top - rect.top + r.height / 2) / rect.height;
        row.toggleAttribute("data-lit", progress >= mark - 0.01);
      }
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
      // Mise à jour finale garantie, même si les images sont ralenties (onglet en arrière-plan).
      clearTimeout(trailing);
      trailing = window.setTimeout(update, 160);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    reduced.addEventListener("change", update);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(trailing);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      reduced.removeEventListener("change", update);
    };
  }, []);

  return (
    <div ref={root} className="relative">
      <div aria-hidden className="absolute bottom-0 left-[15px] top-0 w-px bg-line-1 md:left-1/2 md:-translate-x-1/2">
        <div
          data-line-fill
          className="h-full w-px origin-top bg-gradient-to-b from-accent/15 to-accent"
          style={{ transform: "scaleY(0)", transition: "transform .25s linear" }}
        />
      </div>
      <ol className="m-0 list-none p-0">
        {steps.map((s, i) => {
          const left = i % 2 === 0;
          return (
            <li key={i} data-step className="group grid grid-cols-[32px_minmax(0,1fr)] items-center py-5 md:grid-cols-[minmax(0,1fr)_72px_minmax(0,1fr)] md:py-7">
              <div className={`col-start-2 row-start-1 pl-3 md:pl-0 ${left ? "md:col-start-1 md:text-right" : "md:col-start-3"}`} data-reveal={left ? "left" : "right"}>
                <p className="mb-2 text-[13px] text-accent">{s.period}</p>
                <h3 className="m-0 font-serif text-[30px] font-normal leading-[1.15]">{s.title}</h3>
                <p className="mt-1.5 text-sm text-text-2">{s.place}</p>
              </div>
              <div className="col-start-1 row-start-1 flex justify-start md:col-start-2 md:justify-center">
                <span className="block size-[11px] rounded-full border border-line-3 bg-ink transition-[background,border-color,box-shadow] duration-500 group-data-[lit]:border-accent group-data-[lit]:bg-accent group-data-[lit]:shadow-[0_0_0_6px_rgba(156,195,230,0.12)]" />
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
