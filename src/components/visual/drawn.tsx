import type { ReactNode } from "react";
import Image from "next/image";
import { PdfIcon } from "@/components/ui/pdf-icon";

/** Visuels dessinés en CSS, en attendant les captures d'écran. Tous décoratifs. */

/** Fenêtre de navigateur : contient la capture d'écran (children) ou, à défaut, une mention. */
export function BrowserFrame({ domain, note, tall = false, children }: { domain?: string; note: string; tall?: boolean; children?: ReactNode }) {
  return (
    <div aria-hidden={children ? undefined : true} className="w-full overflow-hidden rounded-xl border border-line-3 bg-ink">
      <div className="flex items-center gap-1.5 border-b border-line-2 px-3.5 py-2.5">
        <span className="size-2 rounded-full bg-line-3" />
        <span className="size-2 rounded-full bg-line-3" />
        <span className="size-2 rounded-full bg-line-3" />
        {domain && <span className="ml-2.5 truncate text-[11px] text-muted">{domain}</span>}
      </div>
      <div className={`relative flex items-center justify-center bg-surface-3 text-[13px] text-dim ${tall ? "aspect-[3/4]" : "aspect-[16/10]"}`}>
        {children ?? note}
      </div>
    </div>
  );
}

export function Phones({ labels }: { labels: string[] }) {
  return (
    <div aria-hidden className="flex h-full w-full items-center justify-center gap-3.5">
      {labels.slice(0, 3).map((label, i) => (
        <div
          key={i}
          className={`flex aspect-[9/19] w-[28%] max-w-[150px] items-end justify-center rounded-[22px] border bg-ink pb-3 text-[11px] ${
            i === 1 ? "border-accent text-accent" : "translate-y-5 border-line-3 text-dim"
          }`}
        >
          {label}
        </div>
      ))}
    </div>
  );
}

/** Vraies captures d'écran de téléphone ; celle du milieu est mise en avant. */
export function PhoneShots({ shots, max = 3 }: { shots: { src: string; alt: string }[]; max?: number }) {
  const list = shots.slice(0, max);
  const mid = Math.floor((list.length - 1) / 2);
  return (
    <div className="flex h-full w-full items-center justify-center gap-3.5">
      {list.map((s, i) => (
        <div
          key={s.src}
          className={`relative aspect-[1/2] overflow-hidden rounded-[18px] border-[3px] bg-ink ${max > 3 ? "w-[21%] max-w-[190px]" : "w-[28%] max-w-[160px]"} ${
            i === mid ? "border-accent" : "translate-y-5 border-line-3"
          }`}
        >
          <Image src={s.src} alt={s.alt} fill sizes="(min-width: 1024px) 190px, 30vw" className="object-cover object-top" />
        </div>
      ))}
    </div>
  );
}

export function Board() {
  return (
    <div aria-hidden className="flex aspect-[16/10] w-full overflow-hidden rounded-xl border border-line-3 bg-ink">
      <div className="flex w-[20%] flex-col gap-2.5 border-r border-line-2 px-3 py-4">
        <span className="h-1.5 rounded bg-accent" />
        <span className="h-1.5 rounded bg-line-3" />
        <span className="h-1.5 rounded bg-line-3" />
        <span className="h-1.5 rounded bg-line-3" />
      </div>
      <div className="flex min-w-0 flex-1 flex-col gap-3 p-4">
        <div className="grid grid-cols-3 gap-2">
          <span className="h-8 rounded-md border border-line-2" />
          <span className="h-8 rounded-md border border-line-2" />
          <span className="h-8 rounded-md border border-line-2" />
        </div>
        <div className="flex flex-1 items-end gap-2 rounded-md border border-line-2 p-3">
          {[40, 62, 48, 75, 58, 90].map((h, i) => (
            <span key={i} className={`flex-1 rounded-t-sm ${i === 5 ? "bg-accent" : "bg-line-2"}`} style={{ height: `${h}%` }} />
          ))}
        </div>
      </div>
    </div>
  );
}

const BARS = [22, 48, 80, 100, 66, 35, 58, 90, 62, 30, 72, 44, 26, 68, 85, 45, 20, 52];

export function AiBars() {
  return (
    <div aria-hidden className="flex h-[54%] w-full items-end gap-[3px]">
      {BARS.map((h, i) => (
        <span key={i} className={`flex-1 rounded-[2px] ${h > 84 ? "bg-accent" : i % 3 === 0 ? "bg-line-3" : "bg-line-2"}`} style={{ height: `${h}%` }} />
      ))}
    </div>
  );
}

export function DocPage({ title }: { title: string }) {
  return (
    <div aria-hidden className="flex aspect-[3/4] w-[58%] max-w-[260px] flex-col gap-2 rounded-lg border border-line-3 bg-ink p-4">
      <PdfIcon size={22} />
      <span className="font-serif text-[15px] leading-tight text-text">{title}</span>
      <span className="mt-auto h-1 rounded bg-line-2" />
      <span className="h-1 w-4/5 rounded bg-line-2" />
      <span className="h-1 w-3/5 rounded bg-line-2" />
    </div>
  );
}
