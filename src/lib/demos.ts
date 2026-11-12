/**
 * Adresses publiques des démos IA (hébergées sur Modal). Ces API acceptent les appels du
 * portfolio (CORS) ; si l'adresse du site change, il faut l'ajouter côté API puis redéployer.
 * Une adresse vide masque la démo.
 */
export const TTS_API = "https://haboudboukari15--tts-fr-en-web.us-east.modal.run";
export const LEAF_API = "https://haboudboukari15--leaf-disease-web-web.us-east.modal.run";

/** Origines à autoriser dans la politique de sécurité du site (connect-src). */
export const DEMO_ORIGINS = [TTS_API, LEAF_API].filter(Boolean);
