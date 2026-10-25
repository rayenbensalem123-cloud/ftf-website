/**
 * Per-selection content for /equipe-nationale/$id — staff, calendar and
 * milestones for each Tunisian national team. The senior team (id "a") uses the
 * shared NATIONAL_FIXTURES / NATIONAL_RESULTS from ftf.ts instead of local ones.
 */
export type StaffMember = { role: string; name: string };
export type SelectionFixture = {
  id: string;
  date: string;
  time: string;
  opponent: string;
  competition: string;
  venue: string;
  home: boolean;
};
export type SelectionResult = {
  id: string;
  date: string;
  opponent: string;
  competition: string;
  score: string;
  outcome: "V" | "N" | "D";
};
export type Milestone = { year: string; text: string };
export type Selection = {
  id: string;
  name: string;
  detail: string;
  tagline: string;
  intro: string;
  coach: string;
  facts: [string, string][];
  staff: StaffMember[];
  fixtures: SelectionFixture[];
  results: SelectionResult[];
  milestones: Milestone[];
};

export const SELECTIONS: Selection[] = [
  {
    id: "a",
    name: "Équipe Nationale A",
    detail: "CAN 2026 · Qualifs Mondial 2030",
    tagline: "Les Aigles de Carthage",
    intro:
      "Le groupe A prépare la Coupe d'Afrique 2026 et poursuit sa campagne de qualification au Mondial 2030. Le collectif réunit les joueurs évoluant en championnat national et à l'étranger, appelés par vagues successives selon le calendrier de la FTF.",
    coach: "Sami Trabelsi",
    facts: [
      ["7", "Participations Coupe du Monde"],
      ["2004", "Champions d'Afrique"],
    ],
    staff: [
      { role: "Sélectionneur", name: "Sami Trabelsi" },
      { role: "Entraîneur adjoint", name: "Nabil Maâloul" },
      { role: "Préparateur physique", name: "Karim Boulos" },
      { role: "Entraîneur des gardiens", name: "Moez Ben Cherifia" },
      { role: "Analyste vidéo", name: "Rami Bouzaiene" },
      { role: "Délégué de sélection", name: "Hédi Antoun" },
    ],
    fixtures: [],
    results: [],
    milestones: [
      {
        year: "1957",
        text: "Première participation de la Tunisie à la Coupe d'Afrique des Nations.",
      },
      {
        year: "1978",
        text: "Première nation africaine qualifiée pour une phase finale de Coupe du Monde.",
      },
      { year: "2004", text: "Vainqueur de la CAN à domicile, devant la Libye en finale à Radès." },
      { year: "2026", text: "Cinquième participation à une phase finale de Coupe du Monde." },
    ],
  },
  {
    id: "u23",
    name: "U23 — Espoirs",
    detail: "Tournoi UNAF · Stage Tunis",
    tagline: "La génération des Jeux",
    intro:
      "La sélection U23 prépare le Tournoi UNAF et la campagne de qualification olympique. Le groupe rassemble les joueurs nés à partir de 2004, entre championnat national et premiers clubs étrangers.",
    coach: "Karim Jelassi",
    facts: [
      ["U23", "Âge maximum"],
      ["2", "Rencontres programmées"],
    ],
    staff: [
      { role: "Sélectionneur", name: "Karim Jelassi" },
      { role: "Entraîneur adjoint", name: "Sofiane Bouazizi" },
      { role: "Préparateur physique", name: "Nizar Chebbi" },
      { role: "Entraîneur des gardiens", name: "Ali Mzen" },
    ],
    fixtures: [],
    results: [],
    milestones: [
      {
        year: "2019",
        text: "Participation au Tournoi UNAF, terminé dans les places qualificatives.",
      },
      { year: "2023", text: "Quart de finaliste des Jeux méditerranéens de Oran." },
      { year: "2027", text: "Campagne de qualification olympique en cours." },
    ],
  },
  {
    id: "u20",
    name: "U20 — Juniors",
    detail: "Éliminatoires CAN U20",
    tagline: "L'avenir des Aigles",
    intro:
      "La sélection U20 dispute les éliminatoires de la CAN des moins de 20 ans. Les joueurs viennent des centres de formation et des équipes réserves des clubs professionnels.",
    coach: "Amine Ferchichi",
    facts: [
      ["U20", "Âge maximum"],
      ["4", "Régions représentées"],
      ["8", "Centres de formation"],
    ],
    staff: [
      { role: "Sélectionneur", name: "Amine Ferchichi" },
      { role: "Entraîneur adjoint", name: "Tarak Mabrouk" },
      { role: "Préparateur physique", name: "Slim Ghorbal" },
    ],
    fixtures: [],
    results: [],
    milestones: [
      { year: "2008", text: "Demi-finaliste de la CAN U20 lors de l'édition sud-africaine." },
      { year: "2017", text: "Qualification pour la phase finale de la CAN U20 à Zambie." },
      { year: "2026", text: "Nouveau cycle de détection lancé dans les huit régions." },
    ],
  },
  {
    id: "u17",
    name: "U17 — Cadets",
    detail: "Détection régionale",
    tagline: "Les futurs Aigles",
    intro:
      "Le cycle U17 s'appuie sur les journées de détection nationales organisées par la Direction Technique Nationale dans les huit régions du pays.",
    coach: "Nizar Bouzid",
    facts: [
      ["U17", "Âge maximum"],
      ["8", "Régions de détection"],
    ],
    staff: [
      { role: "Sélectionneur", name: "Nizar Bouzid" },
      { role: "Responsable détection DTN", name: "Hatem Mansouri" },
      { role: "Entraîneur adjoint", name: "Youssef Ayari" },
    ],
    fixtures: [
      {
        id: "u17-stage",
        date: "Ven 5 déc 2026",
        time: "Stage",
        opponent: "Stage national · Sousse",
        competition: "Préparation CAN U17",
        venue: "Centre technique national, Sousse",
        home: true,
      },
    ],
    results: [
      {
        id: "u17-tun",
        date: "12 oct 2026",
        opponent: "Libye U17",
        competition: "Match de détection",
        score: "4–0",
        outcome: "V",
      },
    ],
    milestones: [
      { year: "2024", text: "Organisation des journées de détection dans les quatre délégations." },
      { year: "2026", text: "Extension du programme à huit régions, 240 joueurs observés." },
    ],
  },
  {
    id: "fem",
    name: "Nationale Féminine A",
    detail: "Qualifs CAN Féminine",
    tagline: "Les Aigles de Carthage féminines",
    intro:
      "La sélection féminine poursuit sa campagne de qualification à la Coupe d'Afrique des Nations féminine, avec un groupe issu des clubs de la Ligue féminine A.",
    coach: "Nadia Boukhris",
    facts: [
      ["2026", "Ligue féminine A créée"],
      ["30", "Licenciées A"],
      ["2", "Journées de qualif"],
    ],
    staff: [
      { role: "Sélectionneure", name: "Nadia Boukhris" },
      { role: "Entraîneure adjointe", name: "Meriem Sahli" },
      { role: "Préparatrice physique", name: "Inès Bougrine" },
    ],
    fixtures: [
      {
        id: "fem-qual",
        date: "Ven 30 avr 2027",
        time: "18:00",
        opponent: "Sénégal féminin",
        competition: "Éliminatoires CAN féminine",
        venue: "Stade Olympique de Radès",
        home: true,
      },
    ],
    results: [
      {
        id: "fem-egy",
        date: "10 oct 2026",
        opponent: "Égypte féminin",
        competition: "Match amical",
        score: "1–1",
        outcome: "N",
      },
      {
        id: "fem-lby",
        date: "7 oct 2026",
        opponent: "Libye féminin",
        competition: "Match amical",
        score: "2–0",
        outcome: "V",
      },
    ],
    milestones: [
      { year: "2022", text: "Première participation de la Tunisie à la CAN féminine." },
      { year: "2026", text: "Création de la Ligue féminine A, structurant le vivier national." },
    ],
  },
  {
    id: "futsal",
    name: "Futsal",
    detail: "Play-offs · Tunis",
    tagline: "Le futsal tunisien",
    intro:
      "La sélection de futsal dispute ses play-offs à Tunis et prépare le prochain cycle continental. Le groupe est composé de joueurs évoluant au futsal national et en championnat à cinq.",
    coach: "Slim Ben Amor",
    facts: [
      ["5", "Play-offs à domicile"],
      ["3", "Cycles AFCON"],
    ],
    staff: [
      { role: "Sélectionneur", name: "Slim Ben Amor" },
      { role: "Entraîneur adjoint", name: "Tarek Ghorbal" },
    ],
    fixtures: [
      {
        id: "futsal-po1",
        date: "Sam 6 déc 2026",
        time: "20:00",
        opponent: "Libye",
        competition: "Play-offs · Tunis",
        venue: "Salle Mohamed Ben Zayed",
        home: true,
      },
      {
        id: "futsal-po2",
        date: "Dim 7 déc 2026",
        time: "20:00",
        opponent: "Maroc",
        competition: "Play-offs · Tunis",
        venue: "Salle Mohamed Ben Zayed",
        home: true,
      },
    ],
    results: [
      {
        id: "futsal-lby",
        date: "10 oct 2026",
        opponent: "Libye",
        competition: "Amical · Tunis",
        score: "4–2",
        outcome: "V",
      },
      {
        id: "futsal-egy",
        date: "7 oct 2026",
        opponent: "Égypte",
        competition: "Amical · Tunis",
        score: "3–3",
        outcome: "N",
      },
    ],
    milestones: [
      {
        year: "2011",
        text: "Première participation de la Tunisie au Tournoi de futsal de l'UNAF.",
      },
      { year: "2026", text: "Retour des play-offs continentaux organisés à Tunis." },
    ],
  },
];

export const selectionById = (id: string): Selection | undefined =>
  SELECTIONS.find((s) => s.id === id);
