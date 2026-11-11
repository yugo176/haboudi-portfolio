import type { CaseStudy } from "./types";

export const caseStudies: CaseStudy[] = [
  {
    template: "case",
    slug: "izinia",
    title: { fr: "IZINIA", en: "IZINIA" },
    year: "2026",
    kind: "app",
    category: "platforms",
    status: "in-progress",
    featured: 3,
    screens: { fr: ["Client", "Livreur", "Colis"], en: ["Customer", "Courier", "Parcels"] },
    shots: [
      { src: "/images/projects/izinia-client.jpg", alt: { fr: "Accueil de l'application client IZINIA", en: "Home screen of the IZINIA customer app" } },
      { src: "/images/projects/izinia-livreur.jpg", alt: { fr: "Courses disponibles dans l'application livreur", en: "Available jobs in the courier app" } },
      { src: "/images/projects/izinia-envoi.jpg", alt: { fr: "Envoi d'un colis dans l'application expéditeur", en: "Sending a parcel in the sender app" } },
      { src: "/images/projects/izinia-livreur-carte.jpg", alt: { fr: "Livreur en ligne, en attente de courses sur la carte", en: "Courier online, waiting for jobs on the map" } },
    ],
    summary: {
      fr: "Plateforme de livraison : quatre applications mobiles, deux tableaux de bord, un backend sur mon propre serveur, suivi en temps réel et Mobile Money.",
      en: "A delivery platform: four mobile apps, two dashboards, a backend on my own server, live tracking and Mobile Money.",
    },
    stack: ["React Native", "Expo", "Node.js", "Express", "PostgreSQL", "Prisma", "Socket.IO", "Gemini"],
    tagline: {
      fr: "Une plateforme de livraison complète pour le Bénin : repas, colis et courses, commandés par texte ou par voix.",
      en: "A complete delivery platform for Benin: meals, parcels and errands, ordered by text or by voice.",
    },
    facts: [
      { label: { fr: "Rôle", en: "Role" }, value: { fr: "Conception et développement", en: "Design and development" } },
      { label: { fr: "Période", en: "Period" }, value: { fr: "Depuis mai 2026", en: "Since May 2026" } },
      { label: { fr: "Plateformes", en: "Platforms" }, value: { fr: "Android, iOS et web", en: "Android, iOS and web" } },
      { label: { fr: "Technologies", en: "Stack" }, value: { fr: "React Native · Node.js · PostgreSQL", en: "React Native · Node.js · PostgreSQL" } },
    ],
    links: [],
    need: {
      lead: {
        fr: "Commander un repas, un médicament ou faire livrer un colis, depuis une seule application, payer en Mobile Money et suivre le livreur en direct.",
        en: "Order a meal, a medicine or send a parcel from a single app, pay with Mobile Money and follow the courier live.",
      },
      body: {
        fr: "Derrière cette promesse, il y a plusieurs métiers à faire travailler ensemble : le client qui commande, le restaurant qui prépare, le livreur qui récupère et livre, et l'équipe qui arbitre les litiges et suit l'argent. Chacun a besoin de son propre outil, mais tous doivent voir la même commande au même moment.",
        en: "Behind that promise, several roles have to work together: the customer who orders, the restaurant that cooks, the courier who picks up and delivers, and the team that settles disputes and follows the money. Each needs its own tool, but all must see the same order at the same time.",
      },
    },
    built: [
      { kind: { fr: "Application mobile", en: "Mobile app" }, title: { fr: "Client", en: "Customer" }, body: { fr: "Commande par texte ou par voix, paiement Mobile Money, suivi du livreur sur la carte.", en: "Ordering by text or voice, Mobile Money payment, courier tracking on the map." } },
      { kind: { fr: "Application mobile", en: "Mobile app" }, title: { fr: "Livreur", en: "Courier" }, body: { fr: "Une seule file de courses, récupération, remise avec un code à quatre chiffres, solde et retraits.", en: "A single job queue, pickup, hand-over with a four-digit code, balance and withdrawals." } },
      { kind: { fr: "Application mobile", en: "Mobile app" }, title: { fr: "Colis", en: "Parcels" }, body: { fr: "Envoi de colis : devis selon la distance, création, paiement et annulation.", en: "Parcel delivery: distance-based quote, creation, payment and cancellation." } },
      { kind: { fr: "Application mobile", en: "Mobile app" }, title: { fr: "Expéditeur", en: "Sender" }, body: { fr: "Suivi de ses envois et de leur historique, pour les clients réguliers.", en: "Tracking of shipments and their history, for regular senders." } },
      { kind: { fr: "Interface web", en: "Web app" }, title: { fr: "Partenaires", en: "Partners" }, body: { fr: "Les restaurants reçoivent les commandes en direct, les acceptent et les marquent prêtes.", en: "Restaurants receive orders live, accept them and mark them ready." } },
      { kind: { fr: "Interface web", en: "Web app" }, title: { fr: "Back-office", en: "Back office" }, body: { fr: "Litiges, commissions, comptes, paramètres et journal complet de chaque commande.", en: "Disputes, commissions, accounts, settings and a full log of every order." } },
    ],
    decisions: [
      { title: { fr: "Des services séparés, un seul schéma de données", en: "Separate services, one data schema" }, body: { fr: "Chaque service se déploie seul, mais tous partagent le même schéma Prisma : une commande a la même forme partout, sans duplication.", en: "Each service deploys on its own, but all share the same Prisma schema: an order has the same shape everywhere, with no duplication." } },
      { title: { fr: "Le temps réel avec Socket.IO", en: "Real time with Socket.IO" }, body: { fr: "Le restaurant voit la nouvelle commande sans recharger, le client voit le livreur avancer. Le restaurant n'est prévenu qu'une fois le paiement confirmé.", en: "The restaurant sees a new order without reloading, the customer sees the courier moving. The restaurant is only notified once payment is confirmed." } },
      { title: { fr: "Un tarif calculé sur la vraie route", en: "Pricing based on the real route" }, body: { fr: "Le prix d'un colis dépend de la distance routière (OSRM) et d'un barème, pas d'une distance à vol d'oiseau.", en: "A parcel's price depends on the road distance (OSRM) and a rate table, not on a straight-line distance." } },
      { title: { fr: "Pas de remise sans code", en: "No hand-over without a code" }, body: { fr: "Le livreur ne peut clore une course qu'avec le code à quatre chiffres du client. Chaque mouvement d'argent laisse une trace dans le journal.", en: "The courier can only close a job with the customer's four-digit code. Every money movement leaves a trace in the log." } },
    ],
    numbers: [
      { value: { fr: "4", en: "4" }, label: { fr: "applications mobiles", en: "mobile apps" } },
      { value: { fr: "2", en: "2" }, label: { fr: "interfaces web", en: "web apps" } },
      { value: { fr: "3", en: "3" }, label: { fr: "services backend", en: "backend services" } },
      { value: { fr: "35", en: "35" }, label: { fr: "scénarios de test", en: "test scenarios" } },
    ],
    state: {
      fr: "Le backend tourne sur mon serveur, les applications sont en finalisation avant la mise en ligne publique.",
      en: "The backend runs on my server; the apps are being finalised before the public launch.",
    },
    next: "agro-hikari",
  },
  {
    template: "case",
    slug: "agro-hikari",
    title: { fr: "Agro Hikari", en: "Agro Hikari" },
    year: "2026",
    kind: "site",
    category: "clients",
    status: "live",
    featured: 1,
    domain: "agrohikari.bj",
    summary: {
      fr: "Site et back-office d'une entreprise d'agriculture numérique : services, formations, événements, blog et simulateur de devis.",
      en: "Website and back office for a digital agriculture company: services, training, events, blog and a quote simulator.",
    },
    stack: ["Next.js", "PostgreSQL", "TypeScript", "Tailwind CSS"],
    tagline: {
      fr: "Le site et le back-office d'une entreprise d'agriculture numérique, que son équipe peut mettre à jour sans développeur.",
      en: "The website and back office of a digital agriculture company, which its team can update without a developer.",
    },
    facts: [
      { label: { fr: "Client", en: "Client" }, value: { fr: "Agro Hikari SARL, Parakou", en: "Agro Hikari SARL, Parakou" } },
      { label: { fr: "Rôle", en: "Role" }, value: { fr: "Design, développement, mise en ligne", en: "Design, development, launch" } },
      { label: { fr: "Période", en: "Period" }, value: { fr: "Sept. — nov. 2026", en: "Sept. — Nov. 2026" } },
      { label: { fr: "Technologies", en: "Stack" }, value: { fr: "Next.js · PostgreSQL", en: "Next.js · PostgreSQL" } },
    ],
    links: [{ label: { fr: "Visiter agrohikari.bj", en: "Visit agrohikari.bj" }, href: "https://agrohikari.bj" }],
    need: {
      lead: {
        fr: "Présenter des services très concrets — cartographie par drone, pulvérisation, formations, reportages — et pouvoir tout modifier soi-même.",
        en: "Present very concrete services — drone mapping, spraying, training, reporting — and be able to change everything yourself.",
      },
      body: {
        fr: "Agro Hikari voulait refondre son site : un site clair pour les producteurs et les partenaires, un moyen d'estimer un tarif avant de demander un devis, et un outil simple pour publier ses actualités, ses événements et ses formations sans dépendre d'un développeur.",
        en: "Agro Hikari wanted to rebuild its website: a clear site for farmers and partners, a way to estimate a price before asking for a quote, and a simple tool to publish news, events and training without depending on a developer.",
      },
    },
    built: [
      { kind: { fr: "Site public", en: "Public site" }, title: { fr: "Huit pages", en: "Eight pages" }, body: { fr: "Accueil, services, formations, événements, blog, galerie, à propos et contact, pensés pour les producteurs et les partenaires.", en: "Home, services, training, events, blog, gallery, about and contact, designed for farmers and partners." } },
      { kind: { fr: "Outil", en: "Tool" }, title: { fr: "Simulateur de devis", en: "Quote simulator" }, body: { fr: "Une estimation immédiate selon la surface et le nombre de passages, reprise dans la demande de contact.", en: "An instant estimate based on surface and number of passes, carried into the contact request." } },
      { kind: { fr: "Back-office", en: "Back office" }, title: { fr: "Contenus", en: "Content" }, body: { fr: "Services, formules et tarifs, réalisations, équipe, partenaires, chiffres clés et pages légales.", en: "Services, plans and prices, projects, team, partners, key figures and legal pages." } },
      { kind: { fr: "Back-office", en: "Back office" }, title: { fr: "Publications", en: "Publishing" }, body: { fr: "Blog avec éditeur de texte, actualités, événements et galerie photo.", en: "Blog with a text editor, news, events and a photo gallery." } },
      { kind: { fr: "Back-office", en: "Back office" }, title: { fr: "Demandes", en: "Requests" }, body: { fr: "Messages reçus et inscriptions aux formations, au même endroit.", en: "Incoming messages and training registrations, in one place." } },
      { kind: { fr: "Back-office", en: "Back office" }, title: { fr: "Comptes", en: "Accounts" }, body: { fr: "Plusieurs comptes pour l'équipe, chacun avec son mot de passe.", en: "Several team accounts, each with its own password." } },
    ],
    decisions: [
      { title: { fr: "Un seul calcul de devis", en: "One quote calculation" }, body: { fr: "Le simulateur et le formulaire de contact utilisent la même fonction : impossible que le montant affiché et le montant envoyé divergent.", en: "The simulator and the contact form use the same function: the amount shown and the amount sent can never diverge." } },
      { title: { fr: "Une seule porte vers les données", en: "A single gateway to the data" }, body: { fr: "Tout ce que le site lit en base passe par un même module. Les pages publiques sont régénérées au plus cinq minutes après une modification : rapides, et toujours à jour.", en: "Everything the site reads from the database goes through one module. Public pages are regenerated at most five minutes after a change: fast, and always up to date." } },
      { title: { fr: "Des images légères", en: "Lightweight images" }, body: { fr: "Les photos sont converties en WebP avec un aperçu flou pendant le chargement, réduites avant l'envoi depuis le back-office, et filigranées dans la galerie.", en: "Photos are converted to WebP with a blurred preview while loading, resized before upload from the back office, and watermarked in the gallery." } },
      { title: { fr: "Un back-office sûr et guidé", en: "A safe, guided back office" }, body: { fr: "Mots de passe chiffrés et sessions, champs de saisie guidés, erreurs d'envoi expliquées clairement à l'équipe.", en: "Hashed passwords and sessions, guided input fields, upload errors explained clearly to the team." } },
    ],
    numbers: [
      { value: { fr: "8", en: "8" }, label: { fr: "pages publiques", en: "public pages" } },
      { value: { fr: "18", en: "18" }, label: { fr: "rubriques administrables", en: "editable sections" } },
      { value: { fr: "5 min", en: "5 min" }, label: { fr: "au plus pour qu'une modification soit en ligne", en: "at most for a change to go live" } },
    ],
    state: {
      fr: "Le site est en ligne sur agrohikari.bj, et son code a été transféré sur le compte GitHub de l'entreprise.",
      en: "The site is live at agrohikari.bj, and its code has been transferred to the company's GitHub account.",
    },
    next: "audio-cnn",
  },
  {
    template: "case",
    slug: "audio-cnn",
    title: { fr: "audio-cnn", en: "audio-cnn" },
    year: "2026",
    kind: "ai",
    category: "ai",
    status: "ai-project",
    featured: 4,
    summary: {
      fr: "Un réseau de neurones qui reconnaît 50 sons du quotidien, déployé en API, avec une interface qui montre ce que voit chaque couche.",
      en: "A neural network that recognises 50 everyday sounds, deployed as an API, with an interface that shows what each layer sees.",
    },
    stack: ["PyTorch", "torchaudio", "FastAPI", "Modal", "Next.js", "Remotion"],
    tagline: {
      fr: "Un réseau de neurones qui reconnaît les sons du quotidien, et une interface qui montre ce qu'il voit.",
      en: "A neural network that recognises everyday sounds, and an interface that shows what it sees.",
    },
    facts: [
      { label: { fr: "Type", en: "Type" }, value: { fr: "Projet personnel", en: "Personal project" } },
      { label: { fr: "Origine", en: "Origin" }, value: { fr: "Adapté d'un cours, puis enrichi", en: "Adapted from a course, then extended" } },
      { label: { fr: "Modèle", en: "Model" }, value: { fr: "ResNet-34 · 50 classes", en: "ResNet-34 · 50 classes" } },
      { label: { fr: "Technologies", en: "Stack" }, value: { fr: "PyTorch · FastAPI · Next.js", en: "PyTorch · FastAPI · Next.js" } },
    ],
    links: [],
    need: {
      lead: {
        fr: "Le son est transformé en image, un spectrogramme Mel, qu'un réseau convolutif analyse pour donner les cinq sons les plus probables.",
        en: "The sound is turned into an image, a Mel spectrogram, which a convolutional network analyses to give the five most likely sounds.",
      },
      body: {
        fr: "Entraîné sur ESC-50 (2 000 enregistrements de cinq secondes, 50 catégories), avec mélange d'exemples (Mixup), masquage aléatoire du temps et des fréquences (SpecAugment), optimiseur AdamW et taux d'apprentissage OneCycle, pour éviter que le modèle apprenne par cœur un jeu de données aussi petit.",
        en: "Trained on ESC-50 (2,000 five-second recordings, 50 categories), with example mixing (Mixup), random time and frequency masking (SpecAugment), the AdamW optimiser and a OneCycle learning rate, so the model doesn't memorise such a small dataset.",
      },
    },
    built: [
      { kind: { fr: "Interface", en: "Interface" }, title: { fr: "Une interface en français", en: "A French interface" }, body: { fr: "Thème sombre, glisser-déposer de fichiers (WAV, MP3, M4A, OGG…), lecteur synchronisé avec la forme d'onde.", en: "Dark theme, drag-and-drop files (WAV, MP3, M4A, OGG…), a player synchronised with the waveform." } },
      { kind: { fr: "Interface", en: "Interface" }, title: { fr: "L'enregistrement au micro", en: "Microphone recording" }, body: { fr: "Avec un indicateur de niveau en direct et la conversion automatique en WAV.", en: "With a live level meter and automatic WAV conversion." } },
      { kind: { fr: "Visualisation", en: "Visualisation" }, title: { fr: "Ce que voit le réseau", en: "What the network sees" }, body: { fr: "Les activations de toutes les couches, dessinées en direct, et le top 5 des prédictions.", en: "Activations of every layer, drawn live, and the top 5 predictions." } },
      { kind: { fr: "API", en: "API" }, title: { fr: "Prêt pour le public", en: "Ready for the public" }, body: { fr: "Limite de requêtes par adresse IP, sons de 10 secondes et 6 Mo au maximum, aucun enregistrement conservé.", en: "Rate limiting per IP address, sounds of 10 seconds and 6 MB at most, no recording kept." } },
      { kind: { fr: "Coût", en: "Cost" }, title: { fr: "Moins cher à faire tourner", en: "Cheaper to run" }, body: { fr: "Inférence déployée sur CPU, et un entraînement possible gratuitement sur Google Colab.", en: "Inference deployed on CPU, and training possible for free on Google Colab." } },
      { kind: { fr: "Vidéo", en: "Video" }, title: { fr: "Une vidéo explicative", en: "An explainer video" }, body: { fr: "Deux formats réalisés en motion design, à partir des vraies données du modèle.", en: "Two motion-design formats, built from the model's real data." } },
    ],
    decisions: [
      { title: { fr: "Le son comme une image", en: "Sound as an image" }, body: { fr: "Un spectrogramme Mel de 128 bandes permet d'utiliser un réseau convolutif éprouvé sur les images.", en: "A 128-band Mel spectrogram makes it possible to use a convolutional network proven on images." } },
      { title: { fr: "Régulariser un petit jeu de données", en: "Regularising a small dataset" }, body: { fr: "Mixup et SpecAugment multiplient les variations vues pendant l'entraînement.", en: "Mixup and SpecAugment multiply the variations seen during training." } },
      { title: { fr: "Inférence sans serveur", en: "Serverless inference" }, body: { fr: "Le modèle est servi par une API FastAPI sur Modal, qui ne tourne que quand on l'appelle.", en: "The model is served by a FastAPI API on Modal, which only runs when called." } },
      { title: { fr: "Honnête sur l'origine", en: "Honest about the origin" }, body: { fr: "Le modèle et son entraînement viennent d'un cours en ligne ; l'interface, les protections et la vidéo sont mes ajouts.", en: "The model and its training come from an online course; the interface, safeguards and video are my additions." } },
    ],
    numbers: [
      { value: { fr: "50", en: "50" }, label: { fr: "catégories de sons", en: "sound categories" } },
      { value: { fr: "2 000", en: "2,000" }, label: { fr: "enregistrements d'entraînement", en: "training recordings" } },
      { value: { fr: "84,75 %", en: "84.75%" }, label: { fr: "de précision en validation", en: "validation accuracy" } },
      { value: { fr: "2", en: "2" }, label: { fr: "formats vidéo", en: "video formats" } },
    ],
    state: {
      fr: "Projet terminé : modèle entraîné, API déployée, interface et vidéo explicative réalisées.",
      en: "Completed: model trained, API deployed, interface and explainer video produced.",
    },
    next: "izinia",
  },
];
