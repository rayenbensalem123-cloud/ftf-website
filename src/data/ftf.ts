import ftf from "@/assets/logos/Logo_federation_tunisienne_de_football.svg";
import est from "@/assets/logos/est.png";
import ca from "@/assets/logos/ca.svg";
import ess from "@/assets/logos/ess.svg";
import cab from "@/assets/logos/cab.png";
import st from "@/assets/logos/st.png";
import usm from "@/assets/logos/usm.png";
import stadium from "@/assets/stadium.jpg";
import trophy from "@/assets/trophy.jpg";

export type Club = { name: string; short: string; city: string; year: number; logo: string };

export const FTF_LOGO = ftf;
export const STADIUM_IMG = stadium;
export const TROPHY_IMG = trophy;

export const CLUBS: Club[] = [
  { name: "Espérance de Tunis", short: "EST", city: "Tunis", year: 1919, logo: est },
  { name: "Club Africain", short: "CA", city: "Tunis", year: 1920, logo: ca },
  { name: "Étoile du Sahel", short: "ESS", city: "Sousse", year: 1925, logo: ess },
  { name: "CA Bizertin", short: "CAB", city: "Bizerte", year: 1928, logo: cab },
  { name: "Stade Tunisien", short: "ST", city: "Le Bardo", year: 1948, logo: st },
  { name: "US Monastir", short: "USM", city: "Monastir", year: 1923, logo: usm },
];

export const clubByShort = (short: string): Club | undefined =>
  CLUBS.find((c) => c.short.toLowerCase() === short.toLowerCase());

/** Which selection a fixture/result belongs to (matches `Selection.id`); defaults to "a". */
export type NationalSquad = "a" | "u23" | "u20" | "u17" | "fem" | "futsal";

export type NationalFixture = {
  id: string;
  squad?: NationalSquad;
  team: string;
  opponent: string;
  competition: string;
  date: string;
  time: string;
  venue: string;
  ticketsOpen: boolean;
};

export type NationalResult = {
  id: string;
  squad?: NationalSquad;
  team: string;
  opponent: string;
  competition: string;
  date: string;
  score: string;
};

/**
 * National-team schedule (senior men, U23 and U20). Add fixtures and results here and the
 * Calendrier and Billetterie pages pick them up — nothing else to change. Set
 * `ticketsOpen: true` on a fixture to make it bookable on the Billetterie page.
 */
export const NATIONAL_FIXTURES: NationalFixture[] = [
  {
    id: "gab-tun-u23-2026-11-09",
    squad: "u23",
    team: "Gabon",
    opponent: "Tunisie U23",
    competition: "Éliminatoires CAN U23 2027 · 2e tour (aller)",
    date: "Lun 9 nov 2026",
    time: "Heure à confirmer",
    venue: "Stade à confirmer",
    ticketsOpen: false,
  },
  {
    id: "tun-lby-2026-11-13",
    team: "Tunisie",
    opponent: "Libye",
    competition: "Éliminatoires CAN 2027 · Groupe H",
    date: "Ven 13 nov 2026",
    time: "17:00",
    venue: "Stade Taïeb Mhiri, Sfax",
    ticketsOpen: false,
  },
  {
    id: "lby-tun-2026-11-17",
    team: "Libye",
    opponent: "Tunisie",
    competition: "Éliminatoires CAN 2027 · Groupe H",
    date: "Mar 17 nov 2026",
    time: "17:00",
    venue: "En Libye (stade à confirmer)",
    ticketsOpen: false,
  },
  {
    id: "tun-gab-u23-2026-11-17",
    squad: "u23",
    team: "Tunisie U23",
    opponent: "Gabon",
    competition: "Éliminatoires CAN U23 2027 · 2e tour (retour)",
    date: "Mar 17 nov 2026",
    time: "Heure à confirmer",
    venue: "Stade à confirmer",
    ticketsOpen: false,
  },
  {
    id: "uga-tun-2027-03",
    team: "Ouganda",
    opponent: "Tunisie",
    competition: "Éliminatoires CAN 2027 · Groupe H",
    date: "Mars 2027",
    time: "Date à confirmer",
    venue: "En Ouganda",
    ticketsOpen: false,
  },
  {
    id: "bwa-tun-2027-03",
    team: "Botswana",
    opponent: "Tunisie",
    competition: "Éliminatoires CAN 2027 · Groupe H",
    date: "Mars 2027",
    time: "Date à confirmer",
    venue: "Au Botswana",
    ticketsOpen: false,
  },
];

/** Scores are written with the Tunisian team first. Newest results at the top. */
export const NATIONAL_RESULTS: NationalResult[] = [
  {
    id: "ben-tun-u23-2026-10-05",
    squad: "u23",
    team: "Tunisie U23",
    opponent: "Bénin",
    competition: "Éliminatoires CAN U23 2027 · 1er tour (retour) · qualifiée (2–1 cumulé)",
    date: "5 oct 2026",
    score: "0–1",
  },
  {
    id: "tun-lby-u20-2026-10-03",
    squad: "u20",
    team: "Tunisie U20",
    opponent: "Libye",
    competition: "Éliminatoires CAN U20 2027 · tournoi UNAF",
    date: "3 oct 2026",
    score: "1–1",
  },
  {
    id: "tun-egy-u20-2026-09-30",
    squad: "u20",
    team: "Tunisie U20",
    opponent: "Égypte",
    competition: "Éliminatoires CAN U20 2027 · tournoi UNAF",
    date: "30 sept 2026",
    score: "1–2",
  },
  {
    id: "tun-ben-u23-2026-09-29",
    squad: "u23",
    team: "Tunisie U23",
    opponent: "Bénin",
    competition: "Éliminatoires CAN U23 2027 · 1er tour (aller)",
    date: "29 sept 2026",
    score: "2–0",
  },
  {
    id: "tun-bwa-2026-09-28",
    team: "Tunisie",
    opponent: "Botswana",
    competition: "Éliminatoires CAN 2027 · Groupe H",
    date: "28 sept 2026",
    score: "2–2",
  },
  {
    id: "tun-mar-u20-2026-09-27",
    squad: "u20",
    team: "Tunisie U20",
    opponent: "Maroc",
    competition: "Éliminatoires CAN U20 2027 · tournoi UNAF",
    date: "27 sept 2026",
    score: "0–0",
  },
  {
    id: "tun-uga-2026-09-24",
    team: "Tunisie",
    opponent: "Ouganda",
    competition: "Éliminatoires CAN 2027 · Groupe H",
    date: "24 sept 2026",
    score: "1–1",
  },
  {
    id: "tun-alg-u20-2026-09-24",
    squad: "u20",
    team: "Tunisie U20",
    opponent: "Algérie",
    competition: "Éliminatoires CAN U20 2027 · tournoi UNAF",
    date: "24 sept 2026",
    score: "1–1",
  },
  {
    id: "tun-ned-2026-06-25",
    team: "Tunisie",
    opponent: "Pays-Bas",
    competition: "Coupe du Monde 2026 · Groupe F",
    date: "25 juin 2026",
    score: "1–3",
  },
  {
    id: "tun-jpn-2026-06-21",
    team: "Tunisie",
    opponent: "Japon",
    competition: "Coupe du Monde 2026 · Groupe F",
    date: "21 juin 2026",
    score: "0–4",
  },
  {
    id: "tun-swe-2026-06-15",
    team: "Tunisie",
    opponent: "Suède",
    competition: "Coupe du Monde 2026 · Groupe F",
    date: "15 juin 2026",
    score: "1–5",
  },
];

export type Article = {
  id: string;
  category: string;
  title: string;
  excerpt: string;
  image?: string;
  body: string[];
};

export const ARTICLES: Article[] = [
  {
    id: "squad-can",
    category: "Équipe Nationale",
    title: "CAN : la liste finale des 27 Aigles dévoilée",
    excerpt: "Les Aigles de Carthage connaissent leurs 27 joueurs pour la CAN. Analyse complète.",
    image: stadium,
    body: [
      "La Fédération Tunisienne de Football a dévoilé la liste finale des 27 joueurs retenus pour la Coupe d'Afrique des Nations.",
      "Le stage de préparation débutera à Tunis avant le départ pour la compétition. Le calendrier complet et les stades seront confirmés par la CAF.",
    ],
  },
  {
    id: "can-2027-libye",
    category: "Équipe Nationale",
    title: "Éliminatoires CAN 2027 : la Tunisie reçoit la Libye à Sfax le 13 novembre",
    excerpt: "Double confrontation face à la Libye en novembre, d'abord à Sfax puis en Libye.",
    image: stadium,
    body: [
      "Les Aigles de Carthage disputent en novembre la double confrontation face à la Libye, comptant pour le groupe H des éliminatoires de la CAN 2027.",
      "Le match aller est programmé le vendredi 13 novembre à 17h00 au stade Taïeb Mhiri de Sfax. Le retour aura lieu en Libye le mardi 17 novembre.",
      "Les rencontres de mars 2027 face à l'Ouganda et au Botswana seront précisées dès confirmation du calendrier par la CAF.",
    ],
  },
  {
    id: "u23-gabon",
    category: "Sélections de jeunes",
    title: "U23 : le Gabon sur la route des Espoirs en novembre",
    excerpt: "Deuxième tour des éliminatoires de la CAN U23 2027, matchs aller et retour.",
    image: trophy,
    body: [
      "La sélection tunisienne des moins de 23 ans affronte le Gabon au deuxième tour des éliminatoires de la CAN U23 2027.",
      "Le match aller se joue au Gabon le lundi 9 novembre, le retour le mardi 17 novembre. Les horaires et les stades seront annoncés par la Fédération.",
    ],
  },
];

export const articleById = (id: string): Article | undefined => ARTICLES.find((a) => a.id === id);

export const SPONSORS = ["Ooredoo", "Tunisair", "Délice", "Kappa", "Biat", "Orange"];

export type SponsorTier = { label: string; names: string[] };

export const SPONSOR_TIERS: SponsorTier[] = [
  { label: "Équipementier officiel", names: ["Kappa"] },
  { label: "Partenaires titre", names: ["Ooredoo", "Tunisair"] },
  { label: "Partenaires officiels", names: ["Délice", "Biat", "Orange"] },
];

export type NationalTeam = { id: string; name: string; detail: string };

export const NATIONAL_TEAMS: NationalTeam[] = [
  { id: "a", name: "Équipe Nationale A", detail: "CAN 2026 · Qualifs Mondial 2030" },
  { id: "u23", name: "U23 — Espoirs", detail: "Tournoi UNAF · Stage Tunis" },
  { id: "u20", name: "U20 — Juniors", detail: "Éliminatoires CAN U20" },
  { id: "u17", name: "U17 — Cadets", detail: "Détection régionale" },
  { id: "fem", name: "Nationale Féminine A", detail: "Qualifs CAN Féminine" },
  { id: "futsal", name: "Futsal", detail: "Play-offs · Tunis" },
];

export type Doc = { id: string; cat: string; title: string; date: string };

export const DOCS: Doc[] = [
  {
    id: "ao-var",
    cat: "Appel d'offres",
    title: "Fourniture de la technologie VAR — AO 010/2026",
    date: "24 août 2026",
  },
  {
    id: "ao-info",
    cat: "Appel d'offres",
    title: "Acquisition de matériel informatique — AO 008/2026",
    date: "27 août 2026",
  },
  {
    id: "comm-arbitres",
    cat: "Communiqué",
    title: "Systèmes de communication pour les arbitres Élite",
    date: "12 oct 2026",
  },
  {
    id: "statuts",
    cat: "Règlements",
    title: "Statuts & règlements généraux — Saison 2026/27",
    date: "1 juil 2026",
  },
  {
    id: "dtn-u15",
    cat: "DTN",
    title: "Journées de détection U15/U17 — programme national",
    date: "5 oct 2026",
  },
];

export const REGIONS: Record<string, string> = {
  EST: "Tunis",
  CA: "Tunis",
  ST: "Tunis",
  ASM: "Tunis",
  CSHL: "Tunis",
  JSO: "Tunis",
  ESS: "Sahel",
  USM: "Sahel",
  ESHS: "Sahel",
  CAB: "Nord",
  OB: "Nord",
  USBG: "Sud",
  ESZ: "Sud",
  ESM: "Sud",
  ASG: "Sud",
};
