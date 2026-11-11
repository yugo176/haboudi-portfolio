/**
 * Courbes de niveau : un relief fait de bosses gaussiennes qui dérivent lentement, tracé par
 * « marching squares ». Module pur (pas de DOM), utilisé par ContourCanvas.
 */

export type Hill = { x: number; y: number; a: number; s: number; fx: number; fy: number; px: number; py: number };

/** Générateur pseudo-aléatoire déterministe (mulberry32) : le même relief à chaque visite. */
function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Relief de départ. `anchors` place les bosses principales (coordonnées 0–1). */
export function createField(seed: number, anchors: { x: number; y: number; a: number; s: number }[]): Hill[] {
  const rand = mulberry32(seed);
  return anchors.map((h) => ({
    ...h,
    fx: 0.00008 + rand() * 0.00008,
    fy: 0.00007 + rand() * 0.00008,
    px: rand() * Math.PI * 2,
    py: rand() * Math.PI * 2,
  }));
}

export type Bump = { x: number; y: number; a: number };

/** Remplit `out` avec la hauteur du relief sur une grille de cols × rows points. */
export function sampleField(hills: Hill[], t: number, cols: number, rows: number, width: number, height: number, out: Float32Array, bump?: Bump) {
  const aspect = height / width;
  for (let j = 0; j < rows; j++) {
    const y = j / (rows - 1);
    for (let i = 0; i < cols; i++) {
      const x = i / (cols - 1);
      let v = 0;
      for (let k = 0; k < hills.length; k++) {
        const h = hills[k];
        // t en millisecondes, fx/fy en radians par milliseconde : une dérive très lente.
        const hx = h.x + 0.02 * Math.sin(t * h.fx + h.px);
        const hy = h.y + 0.02 * Math.cos(t * h.fy + h.py);
        const dx = x - hx;
        const dy = (y - hy) * aspect;
        v += h.a * Math.exp(-(dx * dx + dy * dy) / (2 * h.s * h.s));
      }
      if (bump && bump.a > 0.001) {
        const dx = x - bump.x;
        const dy = (y - bump.y) * aspect;
        v += bump.a * Math.exp(-(dx * dx + dy * dy) / (2 * 0.07 * 0.07));
      }
      out[j * cols + i] = v;
    }
  }
}

/** Ajoute au tracé les segments de la courbe de niveau `level` (interpolation linéaire sur les arêtes). */
export function traceLevel(ctx: CanvasRenderingContext2D, values: Float32Array, cols: number, rows: number, cellW: number, cellH: number, level: number) {
  for (let j = 0; j < rows - 1; j++) {
    for (let i = 0; i < cols - 1; i++) {
      const a = values[j * cols + i];
      const b = values[j * cols + i + 1];
      const c = values[(j + 1) * cols + i + 1];
      const d = values[(j + 1) * cols + i];
      const code = (a > level ? 8 : 0) | (b > level ? 4 : 0) | (c > level ? 2 : 0) | (d > level ? 1 : 0);
      if (code === 0 || code === 15) continue;
      const x = i * cellW;
      const y = j * cellH;
      const top = () => [x + (cellW * (level - a)) / (b - a), y];
      const right = () => [x + cellW, y + (cellH * (level - b)) / (c - b)];
      const bottom = () => [x + (cellW * (level - d)) / (c - d), y + cellH];
      const left = () => [x, y + (cellH * (level - a)) / (d - a)];
      const seg = (p: number[], q: number[]) => {
        ctx.moveTo(p[0], p[1]);
        ctx.lineTo(q[0], q[1]);
      };
      switch (code) {
        case 1: case 14: seg(left(), bottom()); break;
        case 2: case 13: seg(bottom(), right()); break;
        case 3: case 12: seg(left(), right()); break;
        case 4: case 11: seg(top(), right()); break;
        case 5: seg(left(), top()); seg(bottom(), right()); break;
        case 6: case 9: seg(top(), bottom()); break;
        case 7: case 8: seg(left(), top()); break;
        case 10: seg(top(), right()); seg(left(), bottom()); break;
      }
    }
  }
}
