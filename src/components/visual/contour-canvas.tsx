"use client";

import { useEffect, useRef } from "react";
import { createField, sampleField, traceLevel, type Bump } from "@/lib/contours";

type Variant = "hero" | "contact";

const ANCHORS: Record<Variant, { x: number; y: number; a: number; s: number }[]> = {
  hero: [
    { x: 0.78, y: 0.3, a: 0.9, s: 0.16 },
    { x: 0.9, y: 0.8, a: 0.7, s: 0.14 },
    { x: 0.6, y: 0.7, a: -0.5, s: 0.13 },
    { x: 0.2, y: 0.15, a: 0.4, s: 0.12 },
    { x: 0.4, y: 0.95, a: 0.45, s: 0.15 },
  ],
  contact: [
    { x: 0.12, y: 0.7, a: 0.8, s: 0.18 },
    { x: 0.88, y: 0.3, a: 0.75, s: 0.16 },
    { x: 0.5, y: 1.05, a: 0.5, s: 0.2 },
    { x: 0.3, y: 0.1, a: -0.4, s: 0.12 },
  ],
};

/**
 * Courbes de niveau animées, en fond décoratif. Ne touche jamais au défilement : aucun écouteur
 * de molette ou de toucher, pointer-events désactivés. S'arrête hors de l'écran ou onglet caché,
 * et se fige sur une seule image en mouvement réduit ou en mode économie de données.
 */
export function ContourCanvas({ variant = "hero", className }: { variant?: Variant; className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const hills = createField(variant === "hero" ? 7 : 19, ANCHORS[variant]);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData === true;
    const light = window.innerWidth < 768 || (navigator.hardwareConcurrency ?? 8) <= 4;
    const cell = light ? 16 : 12;
    const frameGap = light ? 50 : 33; // ~20 i/s sur mobile, ~30 i/s ailleurs
    const levelStep = variant === "hero" ? 0.085 : 0.09;
    const [minLevel, maxLevel] = variant === "hero" ? [-0.6, 1.3] : [-0.4, 1.1];
    const [faint, strong] = variant === "hero" ? [0.07, 0.16] : [0.055, 0.13];

    let width = 0;
    let height = 0;
    let cols = 0;
    let rows = 0;
    let values = new Float32Array(0);
    let raf = 0;
    let last = 0;
    let visible = false;
    let ready = false;
    const bump: Bump & { tx: number; ty: number; ta: number } = { x: 0.72, y: 0.45, a: 0, tx: 0.72, ty: 0.45, ta: 0 };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      width = Math.max(1, rect.width);
      height = Math.max(1, rect.height);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cols = Math.ceil(width / cell) + 1;
      rows = Math.ceil(height / cell) + 1;
      values = new Float32Array(cols * rows);
    };

    const draw = (t: number) => {
      bump.x += (bump.tx - bump.x) * 0.04;
      bump.y += (bump.ty - bump.y) * 0.04;
      bump.a += (bump.ta - bump.a) * 0.08;
      sampleField(hills, t, cols, rows, width, height, values, variant === "hero" ? bump : undefined);
      ctx.clearRect(0, 0, width, height);
      const cellW = width / (cols - 1);
      const cellH = height / (rows - 1);
      let index = 0;
      for (let level = minLevel; level < maxLevel; level += levelStep) {
        index++;
        const major = index % 5 === 0;
        ctx.beginPath();
        traceLevel(ctx, values, cols, rows, cellW, cellH, level);
        ctx.strokeStyle = `rgba(230,233,238,${major ? strong : faint})`;
        ctx.lineWidth = major ? 1 : 0.75;
        ctx.stroke();
      }
      if (!ready) {
        ready = true;
        canvas.setAttribute("data-ready", "");
      }
    };

    const loop = (now: number) => {
      raf = requestAnimationFrame(loop);
      if (now - last < frameGap) return;
      last = now;
      draw(now);
    };

    const start = () => {
      if (raf || reduced.matches || saveData) return;
      raf = requestAnimationFrame(loop);
    };
    const stop = () => {
      cancelAnimationFrame(raf);
      raf = 0;
    };
    const refresh = () => {
      if (visible && !document.hidden && !reduced.matches && !saveData) start();
      else stop();
    };

    resize();
    draw(4000); // première image, même figée

    const resizeObserver = new ResizeObserver(() => {
      resize();
      draw(performance.now());
    });
    resizeObserver.observe(canvas);

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      refresh();
    });
    io.observe(canvas);

    const onVisibility = () => refresh();
    document.addEventListener("visibilitychange", onVisibility);
    reduced.addEventListener("change", refresh);

    // La souris soulève doucement le relief (seulement avec une vraie souris).
    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      const inside = x >= 0 && x <= 1 && y >= 0 && y <= 1;
      bump.ta = inside ? 0.35 : 0;
      if (inside) {
        bump.tx = x;
        bump.ty = y;
      }
    };
    const onLeave = () => {
      bump.ta = 0;
    };
    if (finePointer && variant === "hero") {
      window.addEventListener("pointermove", onMove, { passive: true });
      window.addEventListener("blur", onLeave);
    }

    return () => {
      stop();
      resizeObserver.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      reduced.removeEventListener("change", refresh);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("blur", onLeave);
    };
  }, [variant]);

  return <canvas ref={ref} aria-hidden className={`contours pointer-events-none absolute inset-0 block size-full ${className ?? ""}`} />;
}
