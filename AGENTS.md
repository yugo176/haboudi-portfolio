<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

<!-- END:nextjs-agent-rules -->

## Règles du portfolio

- Aucune animation ne bloque ni ne retient le défilement : pas de sections collantes empilées, pas de défilement détourné, pas de défilement horizontal.
- Aucun contenu visible seulement au survol. `prefers-reduced-motion` affiche tout, sans mouvement.
- Contenu honnête : pas de faux témoignages, statuts réels (en ligne, livré, prototype…).
- Le contenu (projets, parcours) vit dans `src/content/`, en français et en anglais. Les textes d'interface vivent dans `src/i18n/dictionaries/`.
- Jamais de clé ni de `sources/` dans le dépôt.
