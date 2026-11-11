# Portfolio — Haboudi BOUKARI

Site personnel bilingue (français par défaut, anglais), construit avec Next.js 16, React 19 et Tailwind CSS 4.

## Lancer le site

```bash
npm install
npm run dev        # http://localhost:3000 → redirige vers /fr ou /en
npm run build      # compilation de production
npm run start      # sert la version compilée
npm run lint
npm run typecheck
```

Copier `.env.example` en `.env.local` et renseigner `RESEND_API_KEY` pour que le formulaire de contact envoie les messages. Sans clé, le formulaire propose l'email et WhatsApp à la place.

## Modifier le contenu

Tout le contenu est dans le code, en français et en anglais :

| Quoi | Où |
|---|---|
| Projets (19) | `src/content/projects-case.ts` (études de cas), `projects-other.ts`, `projects-academic.ts` |
| Ordre des projets | `src/content/index.ts` |
| Services, frise, expérience, formation, compétences, certifications | `src/content/profile.ts` |
| Page Agriculture (cartes, idées) | `src/content/agriculture.ts` |
| Coordonnées, clients, lien LinkedIn | `src/lib/site.ts` |
| Textes d'interface (menus, boutons, formulaire) | `src/i18n/dictionaries/fr.json` et `en.json` |
| Témoignages (section masquée tant que la liste est vide) | `testimonials` dans `src/content/profile.ts` |

## Ajouter une capture d'écran de projet

Déposer l'image dans `public/images/projects/<slug>.webp` (ou `.png`, `.jpg`), par exemple `public/images/projects/agro-hikari.webp`, puis relancer la compilation. Le visuel dessiné est remplacé automatiquement.

Pour une application mobile (comme IZINIA), déposer les captures de téléphone dans `public/images/projects/` et les lister dans le champ `shots` du projet (chemin et texte alternatif FR/EN) : trois s'affichent sur les cartes, quatre sur la page du projet.

### Images de « Ce que je fais »

`public/images/services/<id>.webp` pour `sites`, `platforms` et `mobile` (format 4:3 conseillé). Pour `ai`, le panneau affiche un exemple de conversation animée (`src/components/home/ai-chat.tsx`) ; ses messages se modifient dans `services.chat` des dictionnaires `fr.json` et `en.json`.

Pour remplacer une image en local sous le même nom, vider `.next/cache/images` : sinon l'ancienne version reste servie quelques heures.

## Fichiers d'origine

Les fichiers sources (CV Word, archives, rapport de stage…) sont dans `sources/`, ignoré par git : ils ne sont jamais publiés.

## Règles

Voir `AGENTS.md` : aucune animation ne bloque le défilement, rien n'est visible seulement au survol, contenu honnête.
