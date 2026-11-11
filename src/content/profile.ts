import type { Certification, Education, Experience, Service, SkillGroup, Testimonial, TimelineStep } from "./types";

export const services: Service[] = [
  {
    id: "sites",
    title: { fr: "Sites et boutiques", en: "Websites and shops" },
    body: { fr: "Sites vitrines et boutiques en ligne, bilingues, rapides et faciles à administrer.", en: "Showcase sites and online shops, bilingual, fast and easy to manage." },
  },
  {
    id: "platforms",
    title: { fr: "Plateformes métier", en: "Business platforms" },
    body: { fr: "Back-offices, gestion de stock et outils internes, pensés pour la façon dont vous travaillez.", en: "Back offices, stock management and internal tools, designed around the way you work." },
  },
  {
    id: "mobile",
    title: { fr: "Applications mobiles", en: "Mobile apps" },
    body: { fr: "Applications Android et iOS : suivi en temps réel, cartes, paiement Mobile Money.", en: "Android and iOS apps: live tracking, maps, Mobile Money payments." },
  },
  {
    id: "ai",
    title: { fr: "Intégration d'IA", en: "AI integration" },
    body: { fr: "Assistants qui répondent à vos clients, automatisation et modèles adaptés à vos données.", en: "Assistants that answer your customers, automation and models tailored to your data." },
  },
];

/** Frise de l'accueil. */
export const timeline: TimelineStep[] = [
  { period: { fr: "2021", en: "2021" }, title: { fr: "Premières missions freelance", en: "First freelance projects" }, place: { fr: "En autodidacte, à Parakou", en: "Self-taught, in Parakou" } },
  { period: { fr: "2022", en: "2022" }, title: { fr: "Baccalauréat, série C", en: "Baccalaureate, maths & physics" }, place: { fr: "CEG Zongo, Parakou", en: "CEG Zongo, Parakou" } },
  { period: { fr: "2024", en: "2024" }, title: { fr: "Classes préparatoires", en: "Preparatory classes" }, place: { fr: "INSPEI, Abomey · diplôme obtenu", en: "INSPEI, Abomey · diploma" } },
  { period: { fr: "2024 – 2025", en: "2024 – 2025" }, title: { fr: "Développeur full stack", en: "Full-stack developer" }, place: { fr: "Couliflex · base de données, API et application mobile", en: "Couliflex · database, API and mobile app" } },
  { period: { fr: "Depuis 2025", en: "Since 2025" }, title: { fr: "Développeur backend", en: "Backend developer" }, place: { fr: "Data Afrique Hub · plateforme Data Academy", en: "Data Afrique Hub · Data Academy platform" } },
  { period: { fr: "2026", en: "2026" }, title: { fr: "Missions pour des clients", en: "Client projects" }, place: { fr: "APIFOP (France) · Solution NOW · Small Land", en: "APIFOP (France) · Solution NOW · Small Land" } },
  { period: { fr: "Aujourd'hui", en: "Today" }, title: { fr: "Cycle ingénieur, 3ᵉ année", en: "Engineering degree, final year" }, place: { fr: "ENSGMM · UNSTIM, Abomey · puis un master en IA", en: "ENSGMM · UNSTIM, Abomey · then a master's in AI" } },
];

export const experience: Experience[] = [
  { period: { fr: "Nov. 2025 — aujourd'hui", en: "Nov. 2025 — present" }, role: { fr: "Développeur backend", en: "Backend developer" }, org: "Data Afrique Hub", body: { fr: "Bases de données et backend des plateformes. Sur la Data Academy (Django REST) : mise en place du projet, programmes et mentorat, permissions par rôle.", en: "Databases and platform backends. On the Data Academy (Django REST): project setup, programmes and mentoring, role-based permissions." } },
  { period: { fr: "Août — sept. 2026", en: "Aug. — Sept. 2026" }, role: { fr: "Stage en agriculture numérique", en: "Digital agriculture internship" }, org: "Agro Hikari", body: { fr: "Cartographie de parcelles par drone multispectral et cartes sous QGIS, à Parakou.", en: "Plot mapping with a multispectral drone and maps in QGIS, in Parakou." } },
  { period: { fr: "Juin — juil. 2026", en: "June — July 2026" }, role: { fr: "Développeur full stack", en: "Full-stack developer" }, org: "Small Land", body: { fr: "Application de gestion du stock et des ventes : rôles, tableaux de bord, exports PDF et Excel, sauvegardes.", en: "Stock and sales management app: roles, dashboards, PDF and Excel exports, backups." } },
  { period: { fr: "Fév. — mai 2026", en: "Feb. — May 2026" }, role: { fr: "Ingénieur logiciel", en: "Software engineer" }, org: "Solution NOW", body: { fr: "Optimisation de SNOW VIEW, une plateforme sociale pour créateurs de contenu.", en: "Optimisation of SNOW VIEW, a social platform for content creators." } },
  { period: { fr: "Déc. 2025 — fév. 2026", en: "Dec. 2025 — Feb. 2026" }, role: { fr: "Développeur WordPress", en: "WordPress developer" }, org: "APIFOP", body: { fr: "Refonte du site d'un centre de formation professionnelle certifié Qualiopi, au Bourget (France).", en: "Redesign of a Qualiopi-certified vocational training centre's website, in Le Bourget (France)." } },
  { period: { fr: "Juil. 2024 — août 2025", en: "July 2024 — Aug. 2025" }, role: { fr: "Développeur full stack", en: "Full-stack developer" }, org: "Couliflex", body: { fr: "Base de données, API REST et interfaces de l'application mobile de livraison entre particuliers.", en: "Database, REST API and interfaces of the peer-to-peer delivery mobile app." } },
  { period: { fr: "2021 — 2024", en: "2021 — 2024" }, role: { fr: "Développeur freelance", en: "Freelance developer" }, org: "Activité indépendante", body: { fr: "Premiers sites et applications pour des particuliers et de petites structures, en me formant en autodidacte.", en: "First websites and apps for individuals and small organisations, while teaching myself." } },
];

export const education: Education[] = [
  {
    period: { fr: "2024 — aujourd'hui", en: "2024 — present" },
    title: { fr: "Cycle ingénieur", en: "Engineering degree" },
    school: "ENSGMM, UNSTIM",
    body: { fr: "Informatique, Logistique et Recherche Opérationnelle · 3ᵉ année · Abomey", en: "Computer Science, Logistics and Operations Research · final year · Abomey" },
    courses: {
      fr: ["Optimisation mathématique", "Recherche opérationnelle", "Modélisation statistique", "Simulation et analyse de données", "Programmation scientifique", "Systèmes d'information", "Génie logiciel"],
      en: ["Mathematical optimisation", "Operations research", "Statistical modelling", "Simulation and data analysis", "Scientific programming", "Information systems", "Software engineering"],
    },
  },
  { period: { fr: "2022 — 2024", en: "2022 — 2024" }, title: { fr: "Classes préparatoires", en: "Preparatory classes" }, school: "INSPEI", body: { fr: "Diplôme des classes préparatoires aux études d'ingénieur · Abomey", en: "Diploma of preparatory classes for engineering studies · Abomey" } },
  { period: { fr: "2022", en: "2022" }, title: { fr: "Baccalauréat série C", en: "Baccalaureate (maths & physics)" }, school: "CEG Zongo", body: { fr: "Mathématiques et sciences physiques · Parakou", en: "Mathematics and physical sciences · Parakou" } },
];

export const skills: SkillGroup[] = [
  { title: { fr: "Web", en: "Web" }, items: "React · Next.js · TypeScript · Tailwind CSS · WordPress" },
  { title: { fr: "Mobile", en: "Mobile" }, items: "React Native · Expo · Socket.IO · Mobile Money" },
  { title: { fr: "Backend et données", en: "Backend and data" }, items: "Node.js · Express · Django · FastAPI · PostgreSQL · MySQL · MongoDB · Prisma" },
  { title: { fr: "IA et science des données", en: "AI and data science" }, items: "Python · PyTorch · Hugging Face · Gemini API · CatBoost · XGBoost" },
  { title: { fr: "Mathématiques et RO", en: "Maths and OR" }, items: "MATLAB · R · optimisation · modélisation statistique · simulation" },
  { title: { fr: "SIG et télédétection", en: "GIS and remote sensing" }, items: "QGIS · ArcGIS · drone · NDVI" },
  { title: { fr: "Outils et déploiement", en: "Tools and deployment" }, items: "Git · GitHub · Docker · Vercel · VPS · Figma" },
];

export const certifications: Certification[] = [
  { date: { fr: "Juin 2026", en: "June 2026" }, title: "The ArcGIS Imagery MOOC", issuer: "Esri", body: { fr: "Imagerie et télédétection avec ArcGIS : fondamentaux et applications.", en: "Imagery and remote sensing with ArcGIS: foundations and applications." }, file: "/certificates/arcgis-imagery-mooc.pdf" },
  { date: { fr: "Oct. — nov. 2025", en: "Oct. — Nov. 2025" }, title: "DataTour 2025", issuer: "Data Afrique Hub", body: { fr: "Phase nationale de la Coupe d'Afrique des Nations en Science des Données, avec l'équipe APEX (Bénin).", en: "National round of the African Nations Cup of Data Science, with team APEX (Benin)." }, file: "/certificates/datatour-2025.png" },
];

/** Vide tant qu'aucun client n'a envoyé de témoignage : la section reste masquée. */
export const testimonials: Testimonial[] = [];
