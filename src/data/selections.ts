/**
 * Per-selection content for /equipe-nationale/$id — squad, staff, calendar and
 * milestones for each Tunisian national team. The senior team (id "a") uses the
 * shared NATIONAL_FIXTURES / NATIONAL_RESULTS from ftf.ts instead of local ones.
 */
export type Player = { num: number; name: string; pos: string; club: string };
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
  squad: Player[];
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
      ["27", "Joueurs convoqués"],
    ],
    squad: [
      { num: 1, name: "Aymen Dahmen", pos: "Gardiens", club: "Espérance de Tunis" },
      { num: 16, name: "Bechir Ben Saïd", pos: "Gardiens", club: "Club Africain" },
      { num: 22, name: "Mouez Hassen", pos: "Gardiens", club: "Étoile du Sahel" },
      { num: 2, name: "Wajdi Kechrida", pos: "Défenseurs", club: "Atromitos (Grèce)" },
      { num: 3, name: "Ali Abdi", pos: "Défenseurs", club: "SM Caen (France)" },
      { num: 4, name: "Montassar Talbi", pos: "Défenseurs", club: "FC Lorient (France)" },
      { num: 5, name: "Dylan Bronn", pos: "Défenseurs", club: "FC Paços de Ferreira (Portugal)" },
      { num: 6, name: "Oussama Haddadi", pos: "Défenseurs", club: "AEL Limassol (Chypre)" },
      { num: 13, name: "Haythem Jouini", pos: "Défenseurs", club: "Espérance de Tunis" },
      { num: 15, name: "Marwane Kharoubi", pos: "Défenseurs", club: "US Monastir" },
      { num: 18, name: "Ilyes Chetti", pos: "Défenseurs", club: "Espérance de Tunis" },
      { num: 20, name: "Zied Berrima", pos: "Défenseurs", club: "CA Bizertin" },
      { num: 7, name: "Youssef Msakni", pos: "Milieux", club: "Espérance de Tunis" },
      { num: 8, name: "Ellyes Skhiri", pos: "Milieux", club: "1. FC Köln (Allemagne)" },
      { num: 10, name: "Aïssa Laïdouni", pos: "Milieux", club: "Union Berlin (Allemagne)" },
      { num: 11, name: "Mohamed Ali Ben Romdhane", pos: "Milieux", club: "Espérance de Tunis" },
      { num: 14, name: "Hamza Rafia", pos: "Milieux", club: "US Lecce (Italie)" },
      { num: 17, name: "Hannibal Mejbri", pos: "Milieux", club: "Burnley (Angleterre)" },
      { num: 21, name: "Anis Ben Slimane", pos: "Milieux", club: "Bristol City (Angleterre)" },
      { num: 23, name: "Ferjani Sassi", pos: "Milieux", club: "Étoile du Sahel" },
      { num: 24, name: "Iheb Ghandri", pos: "Milieux", club: "Espérance de Tunis" },
      { num: 25, name: "Sadio Sané", pos: "Milieux", club: "Étoile du Sahel" },
      { num: 9, name: "Seifeddine Jaziri", pos: "Attaquants", club: "Zamalek (Égypte)" },
      { num: 12, name: "Elias Achouri", pos: "Attaquants", club: "FC Copenhague (Danemark)" },
      { num: 19, name: "Sayfallah Ltaief", pos: "Attaquants", club: "Neuchâtel Xamax (Suisse)" },
      { num: 26, name: "Firas Chaouat", pos: "Attaquants", club: "Club Africain" },
      { num: 27, name: "Amor Layouni", pos: "Attaquants", club: "Étoile du Sahel" },
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
      { year: "1957", text: "Première participation de la Tunisie à la Coupe d'Afrique des Nations." },
      { year: "1978", text: "Première nation africaine qualifiée pour une phase finale de Coupe du Monde." },
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
      ["18", "Joueurs au stage"],
      ["2", "Rencontres programmées"],
    ],
    squad: [
      { num: 1, name: "Aziz Baccouche", pos: "Gardiens", club: "Espérance de Tunis" },
      { num: 16, name: "Nidhal Mabrouk", pos: "Gardiens", club: "US Monastir" },
      { num: 2, name: "Ayoub Zouaghi", pos: "Défenseurs", club: "Espérance de Tunis" },
      { num: 3, name: "Mehdi Nady", pos: "Défenseurs", club: "Club Africain" },
      { num: 4, name: "Oussema Ben Ayed", pos: "Défenseurs", club: "Étoile du Sahel" },
      { num: 5, name: "Iheb Amri", pos: "Défenseurs", club: "CA Bizertin" },
      { num: 12, name: "Rafik Chaabane", pos: "Défenseurs", club: "Stade Tunisien" },
      { num: 6, name: "Yanis Ben Hammouda", pos: "Milieux", club: "Espérance de Tunis" },
      { num: 8, name: "Ilyes Jelassi", pos: "Milieux", club: "Étoile du Sahel" },
      { num: 10, name: "Wassim Aouissi", pos: "Milieux", club: "Club Africain" },
      { num: 14, name: "Ghani Belhaj", pos: "Milieux", club: "US Monastir" },
      { num: 15, name: "Adam Sassi", pos: "Milieux", club: "CA Bizertin" },
      { num: 7, name: "Anis Bouzgar", pos: "Attaquants", club: "Espérance de Tunis" },
      { num: 9, name: "Houssem Kharoubi", pos: "Attaquants", club: "Stade Tunisien" },
      { num: 11, name: "Malek Bousseliou", pos: "Attaquants", club: "Étoile du Sahel" },
      { num: 17, name: "Fedi Bounnas", pos: "Attaquants", club: "Club Africain" },
    ],
    staff: [
      { role: "Sélectionneur", name: "Karim Jelassi" },
      { role: "Entraîneur adjoint", name: "Sofiane Bouazizi" },
      { role: "Préparateur physique", name: "Nizar Chebbi" },
      { role: "Entraîneur des gardiens", name: "Ali Mzen" },
    ],
    fixtures: [
      {
        id: "unaf-u23-tun",
        date: "Ven 20 fév 2027",
        time: "18:00",
        opponent: "Maroc U23",
        competition: "Tournoi UNAF · Tunis",
        venue: "Stade Olympique de Radès",
        home: true,
      },
      {
        id: "unaf-u23-alg",
        date: "Dim 22 fév 2027",
        time: "18:00",
        opponent: "Algérie U23",
        competition: "Tournoi UNAF · Tunis",
        venue: "Stade Olympique de Radès",
        home: true,
      },
    ],
    results: [
      {
        id: "u23-lby",
        date: "10 oct 2026",
        opponent: "Libye U23",
        competition: "Match amical · Tunis",
        score: "3–1",
        outcome: "V",
      },
      {
        id: "u23-alg",
        date: "7 oct 2026",
        opponent: "Algérie U23",
        competition: "Match amical · Tunis",
        score: "1–1",
        outcome: "N",
      },
    ],
    milestones: [
      { year: "2019", text: "Participation au Tournoi UNAF, terminé dans les places qualificatives." },
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
    squad: [
      { num: 1, name: "Yanis Lajmi", pos: "Gardiens", club: "Espérance de Tunis" },
      { num: 16, name: "Houssem Jelassi", pos: "Gardiens", club: "Sfaxien" },
      { num: 2, name: "Aymen Bousnina", pos: "Défenseurs", club: "Espérance de Tunis" },
      { num: 3, name: "Rayan Bouallegue", pos: "Défenseurs", club: "Club Africain" },
      { num: 4, name: "Nassim Chouchane", pos: "Défenseurs", club: "Étoile du Sahel" },
      { num: 5, name: "Chedly Gharbi", pos: "Défenseurs", club: "CA Bizertin" },
      { num: 13, name: "Azaiz Jlassi", pos: "Défenseurs", club: "US Monastir" },
      { num: 6, name: "Mouheb Baccouche", pos: "Milieux", club: "Espérance de Tunis" },
      { num: 8, name: "Sofian Kharboul", pos: "Milieux", club: "Stade Tunisien" },
      { num: 10, name: "Amine Lahmar", pos: "Milieux", club: "Étoile du Sahel" },
      { num: 14, name: "Ilyes Chaabane", pos: "Milieux", club: "AS Gobelins" },
      { num: 15, name: "Wassim Diry", pos: "Milieux", club: "Club Africain" },
      { num: 7, name: "Hatem Memmi", pos: "Attaquants", club: "Espérance de Tunis" },
      { num: 9, name: "Aziz Ayari", pos: "Attaquants", club: "Étoile du Sahel" },
      { num: 11, name: "Nizar Ben Yahia", pos: "Attaquants", club: "CA Bizertin" },
      { num: 17, name: "Fedi Srairi", pos: "Attaquants", club: "Étoile Sahel junior" },
    ],
    staff: [
      { role: "Sélectionneur", name: "Amine Ferchichi" },
      { role: "Entraîneur adjoint", name: "Tarak Mabrouk" },
      { role: "Préparateur physique", name: "Slim Ghorbal" },
    ],
    fixtures: [
      {
        id: "can-u20-r1",
        date: "Sam 14 mars 2027",
        time: "16:00",
        opponent: "Nigéria U20",
        competition: "Éliminatoires CAN U20 · 1er tour",
        venue: "Stade Chedly Zouiten, Tunis",
        home: true,
      },
      {
        id: "can-u20-r2",
        date: "Mar 17 mars 2027",
        time: "16:00",
        opponent: "Nigéria U20",
        competition: "Éliminatoires CAN U20 · 1er tour",
        venue: "À l'extérieur",
        home: false,
      },
    ],
    results: [
      {
        id: "u20-gha",
        date: "28 sept 2026",
        opponent: "Ghana U20",
        competition: "Tournoi amical",
        score: "2–1",
        outcome: "V",
      },
      {
        id: "u20-egy",
        date: "25 sept 2026",
        opponent: "Égypte U20",
        competition: "Tournoi amical",
        score: "0–2",
        outcome: "D",
      },
    ],
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
      ["240", "Joueurs observés"],
    ],
    squad: [
      { num: 1, name: "Ilyes Ben Rejeb", pos: "Gardiens", club: "Espérance de Tunis" },
      { num: 16, name: "Aziz Ghariani", pos: "Gardiens", club: "Jendouba Sports" },
      { num: 2, name: "Mehdi Saïdi", pos: "Défenseurs", club: "US Monastir" },
      { num: 3, name: "Rayan Hamdi", pos: "Défenseurs", club: "Espérance de Tunis" },
      { num: 4, name: "Chokri Belhaj", pos: "Défenseurs", club: "CS Sfax" },
      { num: 5, name: "Amine Rjaibi", pos: "Défenseurs", club: "CA Bizertin" },
      { num: 12, name: "Nassim Zouari", pos: "Défenseurs", club: "AS Gobelins" },
      { num: 6, name: "Sami Benslimane", pos: "Milieux", club: "Club Africain" },
      { num: 8, name: "Yanis Karray", pos: "Milieux", club: "Étoile du Sahel" },
      { num: 10, name: "Houssem Dhaouadi", pos: "Milieux", club: "Espérance de Tunis" },
      { num: 14, name: "Oussama Trabelsi", pos: "Milieux", club: "Stade Tunisien" },
      { num: 15, name: "Ilyes Bouzid", pos: "Milieux", club: "Étoile Sahel junior" },
      { num: 7, name: "Adam Memmi", pos: "Attaquants", club: "Océano Club de Kerkennah" },
      { num: 9, name: "Fedi Rahmouni", pos: "Attaquants", club: "Espérance de Tunis" },
      { num: 11, name: "Azaiz Ben Salah", pos: "Attaquants", club: "Ariana Sports" },
      { num: 17, name: "Wassim Jelassi", pos: "Attaquants", club: "Club Africain" },
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
    squad: [
      { num: 1, name: "Sarra Makni", pos: "Gardiens", club: "ASF Sousse" },
      { num: 16, name: "Ameni Ben Othman", pos: "Gardiens", club: "Club Africain" },
      { num: 2, name: "Rania Ayari", pos: "Défenseurs", club: "ASF Bousalem" },
      { num: 3, name: "Nesrine Ghariani", pos: "Défenseurs", club: "ASF Sousse" },
      { num: 4, name: "Meriem Sahli", pos: "Défenseurs", club: "Club Africain" },
      { num: 5, name: "Inès Bougrine", pos: "Défenseurs", club: "US Monastir" },
      { num: 12, name: "Oumeyma Jlassi", pos: "Défenseurs", club: "ASF Bousalem" },
      { num: 6, name: "Aya Ben Salah", pos: "Milieux", club: "Club Africain" },
      { num: 8, name: "Sana Karray", pos: "Milieux", club: "ASF Sousse" },
      { num: 10, name: "Nour Bouzgar", pos: "Milieux", club: "US Monastir" },
      { num: 14, name: "Feriel Bouzgar", pos: "Milieux", club: "ASF Bousalem" },
      { num: 7, name: "Rim Memmi", pos: "Attaquants", club: "ASF Sousse" },
      { num: 9, name: "Sarrah Mansour", pos: "Attaquants", club: "Club Africain" },
      { num: 11, name: "Hiba Srairi", pos: "Attaquants", club: "US Monastir" },
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
      ["14", "Joueurs retenus"],
      ["3", "Cycles AFCON"],
    ],
    squad: [
      { num: 1, name: "Moez Ben Salah", pos: "Gardiens", club: "AS Carthage" },
      { num: 12, name: "Aymen Sassi", pos: "Gardiens", club: "Futsal Club Tunis" },
      { num: 2, name: "Walid Karray", pos: "Joueurs", club: "AS Carthage" },
      { num: 3, name: "Ayoub Chaabane", pos: "Joueurs", club: "Futsal Club Tunis" },
      { num: 4, name: "Fedi Hamdi", pos: "Joueurs", club: "AS Carthage" },
      { num: 5, name: "Oussama Belhaj", pos: "Joueurs", club: "Futsal Club Tunis" },
      { num: 6, name: "Ilyes Jaziri", pos: "Joueurs", club: "AS Carthage" },
      { num: 7, name: "Houssem Ayari", pos: "Joueurs", club: "Futsal Club Tunis" },
      { num: 8, name: "Sami Nady", pos: "Joueurs", club: "AS Carthage" },
      { num: 9, name: "Malek Bouzid", pos: "Joueurs", club: "Futsal Club Tunis" },
      { num: 10, name: "Wassim Trabelsi", pos: "Joueurs", club: "AS Carthage" },
      { num: 11, name: "Amin Srairi", pos: "Joueurs", club: "Futsal Club Tunis" },
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
      { year: "2011", text: "Première participation de la Tunisie au Tournoi de futsal de l'UNAF." },
      { year: "2026", text: "Retour des play-offs continentaux organisés à Tunis." },
    ],
  },
];

export const selectionById = (id: string): Selection | undefined =>
  SELECTIONS.find((s) => s.id === id);
