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

## Démos IA en direct

Les pages « Synthèse vocale » et « Maladies des feuilles » appellent depuis le navigateur les API
des deux projets, hébergées sur Modal. Les adresses sont dans `src/lib/demos.ts` (une adresse vide
masque la démo) et sont ajoutées automatiquement à la politique de sécurité (`next.config.ts`).
Chaque API n'accepte que les sites autorisés (CORS) : localhost:3000, haboudi.com et
`haboudi-portfolio*.vercel.app`. Si l'adresse du site change, il faut l'ajouter côté API puis redéployer.

## Référencement (Google)

Dans le site : titres et descriptions qui commencent par « Haboudi BOUKARI », données structurées
`Person` (nom, autres écritures dont « BOUKARI Haboudi », profils `sameAs`) et `WebSite` sur l'accueil,
`ProfilePage` sur Parcours, canoniques et hreflang fr/en, sitemap, préversions Vercel en `noindex`.
Les profils et les autres écritures du nom sont dans `src/lib/site.ts`.

À faire hors du site :

1. **Vercel** : importer le dépôt sous le nom `haboudi-portfolio`.
2. **Google Search Console** (search.google.com/search-console) : ajouter une propriété
   « Préfixe d'URL » avec l'adresse Vercel, méthode « Balise HTML ». Copier la valeur de `content="…"`
   dans la variable `GOOGLE_SITE_VERIFICATION` sur Vercel, redéployer, puis cliquer sur « Valider ».
   Envoyer ensuite `sitemap.xml` (menu Sitemaps) et demander l'indexation de `/fr` et `/en`
   (Inspection de l'URL).
3. **Profils** : mettre l'adresse du portfolio dans le champ « site web » de GitHub, LinkedIn,
   Facebook, Instagram et FricaDev. Créer le README de profil GitHub (dépôt `yugo176/yugo176`)
   avec le nom complet et le lien.
4. **Plus tard** : acheter haboudi.com, l'ajouter sur Vercel, définir
   `NEXT_PUBLIC_SITE_URL=https://haboudi.com`, ajouter une propriété « Domaine » dans Search Console
   (vérification DNS) ; ajouter un crédit « Site réalisé par Haboudi BOUKARI » sur les sites clients,
   avec leur accord.
