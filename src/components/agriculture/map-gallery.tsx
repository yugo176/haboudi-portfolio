"use client";

import type { CSSProperties } from "react";
import Image from "next/image";
import { useState } from "react";

type MapItem = { src: string; title: string; meta: string; alt: string; width: number; height: number };

/** Une carte en grand, et des miniatures pour passer de l'une à l'autre (clic, toucher ou clavier). */
export function MapGallery({ maps, label, madeBy, openFull }: { maps: MapItem[]; label: string; madeBy: string; openFull: string }) {
  const [index, setIndex] = useState(0);
  const current = maps[index];
  return (
    <div>
      <figure className="m-0">
        <div className="overflow-hidden rounded-[20px] bg-[#f4f2ec] p-3 md:p-4.5" data-curtain style={{ "--curtain-radius": "20px" } as CSSProperties}>
          <div data-curtain-inner>
            <Image
              key={current.src}
              src={current.src}
              alt={current.alt}
              width={current.width}
              height={current.height}
              sizes="(min-width: 1440px) 1312px, 100vw"
              className="block h-auto w-full"
              priority={index === 0}
            />
          </div>
        </div>
        <figcaption className="mt-4.5 flex flex-wrap justify-between gap-4 text-sm">
          <span>{current.title}</span>
          <span className="flex flex-wrap gap-4 text-muted">
            <span>
              {madeBy} · {current.meta}
            </span>
            <a href={current.src} target="_blank" rel="noopener" className="text-text-2 transition-colors hover:text-accent">
              {openFull} ↗
            </a>
          </span>
        </figcaption>
      </figure>
      <div role="group" aria-label={label} className="mt-7 grid grid-cols-[repeat(auto-fit,minmax(min(100%,220px),1fr))] gap-4">
        {maps.map((m, i) => (
          <button
            key={m.src}
            type="button"
            aria-pressed={i === index}
            onClick={() => setIndex(i)}
            className={`block w-full cursor-pointer rounded-[14px] border bg-transparent p-2.5 text-left text-text transition-colors ${i === index ? "border-accent" : "border-line-2 hover:border-line-3"}`}
          >
            <span className="relative block aspect-[16/11] overflow-hidden rounded-[10px] bg-[#f4f2ec]">
              <Image src={m.src} alt="" fill sizes="(min-width: 1024px) 400px, 100vw" className="object-cover" />
            </span>
            <span className="mt-3 block text-sm">{m.title}</span>
            <span className="mt-1 block text-xs text-muted">{m.meta}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
