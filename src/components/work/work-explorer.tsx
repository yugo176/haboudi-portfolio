"use client";

import type { CSSProperties, ReactNode } from "react";
import Link from "next/link";
import { LayoutGrid, List } from "lucide-react";
import { useState } from "react";

export type WorkItem = {
  slug: string;
  href: string;
  title: string;
  summary: string;
  year: string;
  category: string;
  categoryLabel: string;
  status: string;
  statusLabel: string;
  tone: "live" | "wip" | "neutral";
  stack: string;
  caseStudy: boolean;
  visual: ReactNode;
};

type Labels = {
  filterLabel: string;
  viewLabel: string;
  grid: string;
  list: string;
  caseStudy: string;
  categories: Record<string, string>;
};

const badge = (tone: WorkItem["tone"]) =>
  `shrink-0 whitespace-nowrap rounded-full border px-2.5 py-1 text-xs ${
    tone === "live" ? "border-accent text-accent" : tone === "wip" ? "border-soft text-text" : "border-line-3 text-text-2"
  }`;

const pill = (on: boolean) =>
  `min-h-11 cursor-pointer rounded-full border px-4 py-2.5 text-sm transition-colors ${
    on ? "border-accent bg-accent text-ink" : "border-line-3 bg-transparent text-soft hover:border-soft"
  }`;

/** Filtres + grille ou liste. Tout est visible tout de suite ; la cascade rejoue à chaque changement. */
export function WorkExplorer({ items, labels, filters }: { items: WorkItem[]; labels: Labels; filters: string[] }) {
  const [filter, setFilter] = useState("all");
  const [view, setView] = useState<"grid" | "list">("grid");
  const list = items.filter((p) => filter === "all" || p.category === filter);
  const count = (f: string) => (f === "all" ? items.length : items.filter((p) => p.category === f).length);

  return (
    <>
      <div className="mb-12 flex flex-wrap items-center justify-between gap-5 border-y border-line-1 py-5">
        <div role="group" aria-label={labels.filterLabel} className="flex flex-wrap gap-2.5">
          {filters.map((f) => (
            <button key={f} type="button" aria-pressed={filter === f} onClick={() => setFilter(f)} className={pill(filter === f)}>
              {labels.categories[f]} <span className={`ml-1 text-xs ${filter === f ? "text-line-3" : "text-muted"}`}>{count(f)}</span>
            </button>
          ))}
        </div>
        <div role="group" aria-label={labels.viewLabel} className="inline-flex gap-1 rounded-full border border-line-2 p-1">
          {(["grid", "list"] as const).map((v) => (
            <button
              key={v}
              type="button"
              aria-pressed={view === v}
              onClick={() => setView(v)}
              className={`inline-flex min-h-10 cursor-pointer items-center gap-2 rounded-full border-0 px-4 py-2 text-[13px] transition-colors ${
                view === v ? "bg-text text-ink" : "bg-transparent text-text-2 hover:text-text"
              }`}
            >
              {v === "grid" ? <LayoutGrid size={15} aria-hidden /> : <List size={15} aria-hidden />}
              {labels[v]}
            </button>
          ))}
        </div>
      </div>

      {view === "grid" ? (
        <ul key={`g-${filter}`} className="m-0 grid list-none grid-cols-[repeat(auto-fill,minmax(min(100%,340px),1fr))] gap-x-7 gap-y-12 p-0 pb-36">
          {list.map((p, i) => (
            <li key={p.slug} className="cascade-item min-w-0" style={{ "--i": i } as CSSProperties}>
              <Link href={p.href} className="group block">
                <div className="overflow-hidden rounded-2xl border border-line-1 bg-surface-2">
                  <div className="relative flex aspect-[4/3] items-center justify-center p-7 transition-transform duration-500 ease-[var(--ease-out-soft)] group-hover:scale-[1.03]">
                    {p.visual}
                  </div>
                </div>
                <div className="mt-4.5 flex items-start justify-between gap-3.5">
                  <h2 className="m-0 font-serif text-[28px] font-normal leading-[1.1] transition-colors group-hover:text-accent">{p.title}</h2>
                  <span className={badge(p.tone)}>{p.statusLabel}</span>
                </div>
                <p className="mt-2 text-sm leading-[1.6] text-text-2">{p.summary}</p>
                <p className="mt-3 text-xs text-muted">
                  {p.year} · {p.stack}
                  {p.caseStudy && <span className="text-accent"> · {labels.caseStudy} →</span>}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <ul key={`l-${filter}`} className="m-0 mb-36 list-none border-t border-line-2 p-0">
          {list.map((p, i) => (
            <li key={p.slug} className="cascade-item" style={{ "--i": i } as CSSProperties}>
              <Link
                href={p.href}
                className="group -mx-3 grid grid-cols-[64px_minmax(0,1fr)_auto] items-center gap-6 border-b border-line-2 px-3 py-6 transition-colors hover:bg-surface-1 md:grid-cols-[96px_minmax(0,2.4fr)_minmax(0,1.2fr)_minmax(0,0.9fr)_170px]"
              >
                <span className="text-[13px] text-muted">{p.year}</span>
                <span className="min-w-0">
                  <span className="block font-serif text-[28px] leading-[1.1]">{p.title}</span>
                  <span className="mt-1 block text-sm text-text-2">{p.summary}</span>
                </span>
                <span className="hidden text-[13px] text-muted md:block">{p.stack}</span>
                <span className="hidden text-[13px] text-text-2 md:block">{p.categoryLabel}</span>
                <span className="flex items-center justify-end gap-4">
                  <span className={badge(p.tone)}>{p.statusLabel}</span>
                  <span aria-hidden className="text-lg text-dim transition-[transform,color] group-hover:translate-x-1.5 group-hover:text-accent">
                    →
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
