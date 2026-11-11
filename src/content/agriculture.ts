import type { Item, L } from "./types";

export const maps: { src: string; width: number; height: number; title: L; meta: L; alt: L }[] = [
  {
    src: "/images/maps/parakou.png",
    width: 3507,
    height: 2480,
    title: { fr: "Carte de situation de Parakou", en: "Location map of Parakou" },
    meta: { fr: "QGIS · WGS84 / UTM 31N", en: "QGIS · WGS84 / UTM 31N" },
    alt: { fr: "Carte de situation de Parakou : routes, cours d'eau, forêt classée de Nano et périmètre de reboisement", en: "Location map of Parakou: roads, rivers, the Nano classified forest and the reforestation area" },
  },
  {
    src: "/images/maps/bobo-dioulasso-1.png",
    width: 4092,
    height: 2893,
    title: { fr: "Maisons étudiées et sites de vente, Bobo-Dioulasso", en: "Studied houses and sales sites, Bobo-Dioulasso" },
    meta: { fr: "QGIS · novembre 2026", en: "QGIS · November 2026" },
    alt: { fr: "Localisation des maisons étudiées et des sites de vente à Bobo-Dioulasso", en: "Location of the studied houses and sales sites in Bobo-Dioulasso" },
  },
  {
    src: "/images/maps/bobo-dioulasso-2.png",
    width: 4092,
    height: 2893,
    title: { fr: "Sites étudiés, Bobo-Dioulasso", en: "Studied sites, Bobo-Dioulasso" },
    meta: { fr: "QGIS · novembre 2026", en: "QGIS · November 2026" },
    alt: { fr: "Localisation des sites étudiés à Bobo-Dioulasso", en: "Location of the studied sites in Bobo-Dioulasso" },
  },
];

export const agriSkills: Item[] = [
  { title: { fr: "Cartographie par drone", en: "Drone mapping" }, body: { fr: "Préparer la zone à survoler, la contrôler sur Google Earth, programmer un plan de vol automatique et réaliser un levé avec un drone multispectral.", en: "Preparing the survey area, checking it on Google Earth, programming an automatic flight plan and flying a survey with a multispectral drone." } },
  { title: { fr: "Systèmes d'information géographique", en: "Geographic information systems" }, body: { fr: "QGIS et ArcGIS : couches vectorielles et raster, systèmes de coordonnées adaptés au Bénin, cartes thématiques de situation et de localisation.", en: "QGIS and ArcGIS: vector and raster layers, coordinate systems suited to Benin, thematic location maps." } },
  { title: { fr: "Télédétection", en: "Remote sensing" }, body: { fr: "Orthomosaïques issues des vols, calcul d'indices de végétation comme le NDVI, lecture de l'état des parcelles.", en: "Orthomosaics from flights, vegetation indices such as NDVI, reading the state of plots." } },
];

export const agriIdeas: Item[] = [
  { title: { fr: "Détecter les ravageurs plus tôt", en: "Detecting pests earlier" }, body: { fr: "Repérer les dégâts de la chenille légionnaire d'automne sur le maïs à partir d'images multispectrales, avant qu'ils ne soient visibles.", en: "Spotting fall armyworm damage on maize from multispectral images, before it becomes visible." } },
  { title: { fr: "Suivre la santé des cultures", en: "Monitoring crop health" }, body: { fr: "Comparer les indices de végétation d'un vol à l'autre pour signaler les zones qui décrochent.", en: "Comparing vegetation indices between flights to flag areas that fall behind." } },
  { title: { fr: "Estimer les propriétés des sols", en: "Estimating soil properties" }, body: { fr: "Relier la signature spectrale d'un sol nu à son humidité et à sa teneur en matière organique.", en: "Linking the spectral signature of bare soil to its moisture and organic matter content." } },
  { title: { fr: "Aider à décider", en: "Supporting decisions" }, body: { fr: "Traduire ces mesures en recommandations simples pour les producteurs : où traiter, où irriguer, où semer.", en: "Turning these measurements into simple advice for farmers: where to treat, irrigate or sow." } },
];

/** Petite parcelle en fausses couleurs : 6 rangées × 12 colonnes, valeurs fixes. */
export const ndviField: number[] = (() => {
  const base = [0.82, 0.55, 0.9, 0.3, 0.7, 0.12];
  const jitter = [0.05, -0.08, 0.02, 0.09, -0.04, 0.06, -0.1, 0.03, 0.07, -0.02, -0.06, 0.04];
  const out: number[] = [];
  for (let r = 0; r < 6; r++) for (let c = 0; c < 12; c++) {
    const parcel = Math.floor(c / 4) + Math.floor(r / 3) * 3;
    out.push(Math.max(0, Math.min(1, base[parcel % 6] + jitter[(c + r * 5) % 12])));
  }
  return out;
})();
