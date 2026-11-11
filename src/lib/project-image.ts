import "server-only";
import { existsSync } from "node:fs";
import { join } from "node:path";

/**
 * Capture d'écran d'un projet, si elle a été déposée dans public/images/projects/<slug>.webp
 * (ou .png / .jpg). Sinon le site affiche le visuel dessiné. Ajouter une capture = déposer le
 * fichier et relancer la construction.
 */
export function projectImage(slug: string): string | null {
  for (const ext of ["webp", "png", "jpg"]) {
    const rel = `/images/projects/${slug}.${ext}`;
    if (existsSync(join(process.cwd(), "public", rel))) return rel;
  }
  return null;
}
