import type { ReactNode } from "react";
import { h2Serif } from "@/lib/ui";

/** Petite étiquette bleue + grand titre serif, avec une introduction à droite. */
export function SectionHeader({ label, title, intro, id }: { label: string; title: ReactNode; intro?: ReactNode; id?: string }) {
  return (
    <div className="mb-14 flex flex-wrap items-end justify-between gap-6 md:mb-16" data-reveal>
      <div>
        <p className="mb-4 text-[13px] text-accent">{label}</p>
        <h2 id={id} className={`m-0 max-w-[720px] ${h2Serif}`}>
          {title}
        </h2>
      </div>
      {intro && <div className="max-w-[400px] text-[15px] leading-[1.7] text-text-2">{intro}</div>}
    </div>
  );
}
