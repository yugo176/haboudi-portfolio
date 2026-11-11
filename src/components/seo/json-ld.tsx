/**
 * Données structurées schema.org, avec « < » échappé pour qu'un texte ne puisse jamais fermer la balise.
 */
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
