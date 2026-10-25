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

export type NationalFixture = {
  id: string;
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
  team: string;
  opponent: string;
  competition: string;
  date: string;
  score: string;
};

/**
 * National-team schedule (équipe nationale A, men). Add fixtures and results here and the
 * Calendrier and Billetterie pages pick them up — nothing else to change. Set
 * `ticketsOpen: true` on a fixture to make it bookable on the Billetterie page.
 */
export const NATIONAL_FIXTURES: NationalFixture[] = [
  {
    id: "tun-lby-2026-11-13",
    team: "Tunisie",
    opponent: "Libye",
    competition: "Éliminatoires CAN 2027 · Groupe H",
    date: "Ven 13 nov 2026",
    time: "17:00",
    venue: "Radès (stade à confirmer)",
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

/** Scores are written Tunisie first. Add newest results at the top. */
export const NATIONAL_RESULTS: NationalResult[] = [
  {
    id: "tun-bwa-2026-09-28",
    team: "Tunisie",
    opponent: "Botswana",
    competition: "Éliminatoires CAN 2027 · Groupe H",
    date: "28 sept 2026",
    score: "2–2",
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
    id: "esperance-titre",
    category: "Ligue des Champions CAF",
    title: "L'Espérance sacrée à nouveau après une finale épique",
    excerpt: "Hier soir, le club tunisien a rappelé que le trophée ne quitterait pas Tunis.",
    image: trophy,
    body: [
      "Dans un stade Hammadi Agrebi en fusion, l'Espérance de Tunis a soulevé un nouveau titre continental au terme d'une finale épique.",
      "Retour sur les moments clés du match, les buteurs et les réactions dans notre dossier complet.",
    ],
  },
  {
    id: "derby-preview",
    category: "Ligue 1",
    title: "Avant-match : EST — CA, tout ce qu'il faut savoir avant le derby",
    excerpt: "Compos probables, arbitre, parcage et enjeux du derby de Tunis.",
    body: [
      "Dimanche 17h00, Radès accueille le derby de Tunis entre l'Espérance et le Club Africain pour la 6e journée de Ligue 1.",
      "Guichets fermés annoncés. Ouverture des portes trois heures avant le coup d'envoi, carte d'identité obligatoire.",
    ],
  },
  {
    id: "chaouat-interview",
    category: "Interview",
    title: "« Je reviendrai plus fort » — entretien avec le capitaine",
    excerpt: "Entretien exclusif sur la saison, la CAN et les supporters.",
    body: [
      "« Je reviendrai plus fort » — entretien exclusif avec le capitaine sur sa blessure, sa rééducation et les objectifs du club.",
      "L'intégralité de l'interview est disponible sur FTF TV et nos plateformes.",
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
    id: "des-j6",
    cat: "Arbitrage",
    title: "Désignations arbitrales — Journée 6",
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
