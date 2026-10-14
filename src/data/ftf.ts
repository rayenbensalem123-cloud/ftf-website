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

export type Fixture = { id: string; home: Club; away: Club; date: string; time: string; venue: string };

const c = (short: string): Club => {
  const found = clubByShort(short);
  if (!found) throw new Error(`Unknown club: ${short}`);
  return found;
};

export const FIXTURES: Fixture[] = [
  { id: "est-ca-j6", home: c("EST"), away: c("CA"), date: "Dim 18 oct", time: "17:00", venue: "Stade Hammadi Agrebi, Radès" },
  { id: "ess-usm-j6", home: c("ESS"), away: c("USM"), date: "Sam 17 oct", time: "15:30", venue: "Stade Olympique de Sousse" },
  { id: "cab-st-j6", home: c("CAB"), away: c("ST"), date: "Sam 17 oct", time: "14:00", venue: "Stade 15 Octobre, Bizerte" },
];

export type Result = { id: string; home: Club; away: Club; hs: number; as: number };

export const RESULTS: Result[] = [
  { id: "est-ess-j5", home: c("EST"), away: c("ESS"), hs: 3, as: 1 },
  { id: "usm-ca-j5", home: c("USM"), away: c("CA"), hs: 0, as: 2 },
  { id: "st-cab-j5", home: c("ST"), away: c("CAB"), hs: 0, as: 0 },
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
    title: "The final squad list announced for the Africa Cup of Nations",
    excerpt: "Les Aigles de Carthage connaissent leurs 27 joueurs pour la CAN. Analyse complète.",
    image: stadium,
    body: [
      "La Fédération Tunisienne de Football a dévoilé la liste finale des 27 joueurs retenus pour la Coupe d'Afrique des Nations.",
      "Le stage de préparation débutera à Tunis avant le départ pour la compétition. Le calendrier complet et les stades seront confirmés par la CAF.",
    ],
  },
  {
    id: "esperance-titre",
    category: "African Champions League",
    title: "Espérance did it again and won the title in an epic match",
    excerpt: "Last night the Tunisian side made it clear the trophy is not leaving Tunis.",
    image: trophy,
    body: [
      "Dans un stade Hammadi Agrebi en fusion, l'Espérance de Tunis a soulevé un nouveau titre continental au terme d'une finale épique.",
      "Retour sur les moments clés du match, les buteurs et les réactions dans notre dossier complet.",
    ],
  },
  {
    id: "derby-preview",
    category: "Ligue 1",
    title: "Clásico preview: EST vs CA — everything before Sunday's derby",
    excerpt: "Compos probables, arbitre, parcage et enjeux du derby de Tunis.",
    body: [
      "Dimanche 17h00, Radès accueille le derby de Tunis entre l'Espérance et le Club Africain pour la 6e journée de Ligue 1.",
      "Guichets fermés annoncés. Ouverture des portes trois heures avant le coup d'envoi, carte d'identité obligatoire.",
    ],
  },
  {
    id: "chaouat-interview",
    category: "Communities",
    title: "Will he be back? Full interview with our captain",
    excerpt: "Entretien exclusif sur la saison, la CAN et les supporters.",
    body: [
      "« Je reviendrai plus fort » — entretien exclusif avec le capitaine sur sa blessure, sa rééducation et les objectifs du club.",
      "L'intégralité de l'interview est disponible sur FTF TV et nos plateformes.",
    ],
  },
];

export const articleById = (id: string): Article | undefined =>
  ARTICLES.find((a) => a.id === id);

export const STANDINGS = [
  { club: c("EST"), played: 6, pts: 16 },
  { club: c("ESS"), played: 6, pts: 13 },
  { club: c("CA"), played: 6, pts: 12 },
  { club: c("USM"), played: 6, pts: 10 },
  { club: c("CAB"), played: 6, pts: 8 },
  { club: c("ST"), played: 6, pts: 6 },
];

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
  { id: "ao-var", cat: "Appel d'offres", title: "Fourniture de la technologie VAR — AO 010/2026", date: "24 août 2026" },
  { id: "ao-info", cat: "Appel d'offres", title: "Acquisition de matériel informatique — AO 008/2026", date: "27 août 2026" },
  { id: "comm-arbitres", cat: "Communiqué", title: "Systèmes de communication pour les arbitres Élite", date: "12 oct 2026" },
  { id: "des-j6", cat: "Arbitrage", title: "Désignations arbitrales — Journée 6", date: "12 oct 2026" },
  { id: "statuts", cat: "Règlements", title: "Statuts & règlements généraux — Saison 2026/27", date: "1 juil 2026" },
  { id: "dtn-u15", cat: "DTN", title: "Journées de détection U15/U17 — programme national", date: "5 oct 2026" },
];

export const REGIONS: Record<string, string> = {
  EST: "Tunis", CA: "Tunis", ST: "Tunis", ASM: "Tunis", CSHL: "Tunis", JSO: "Tunis",
  ESS: "Sahel", USM: "Sahel", ESHS: "Sahel",
  CAB: "Nord", OB: "Nord",
  USBG: "Sud", ESZ: "Sud", ESM: "Sud", ASG: "Sud",
};
