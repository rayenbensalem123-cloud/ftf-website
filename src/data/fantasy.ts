/**
 * Fantasy Coach player pool.
 * NOTE: prices and form are placeholder values for the demo — replace with the official
 * FTF feed when available. Add a player here and the game picks it up automatically.
 */
export type Pos = "GK" | "DEF" | "MID" | "FWD";

export type FantasyPlayer = {
  id: string;
  name: string;
  club: string; // CLUBS short code
  pos: Pos;
  price: number; // in millions
  form: number; // average points, 0-10
};

export const BUDGET = 100;
export const SQUAD_SIZE = 11;
export const MAX_PER_CLUB = 3;

export const FORMATIONS = {
  "4-3-3": { DEF: 4, MID: 3, FWD: 3 },
  "4-4-2": { DEF: 4, MID: 4, FWD: 2 },
  "3-5-2": { DEF: 3, MID: 5, FWD: 2 },
  "5-3-2": { DEF: 5, MID: 3, FWD: 2 },
} as const;

export type FormationKey = keyof typeof FORMATIONS;

export const POS_LABEL: Record<Pos, string> = {
  GK: "Gardiens",
  DEF: "Défenseurs",
  MID: "Milieux",
  FWD: "Attaquants",
};

const p = (id: string, name: string, club: string, pos: Pos, price: number, form: number) => ({
  id,
  name,
  club,
  pos,
  price,
  form,
});

export const PLAYERS: FantasyPlayer[] = [
  // Gardiens
  p("gk1", "Aymen Dahmen", "CAB", "GK", 6.5, 6.1),
  p("gk2", "Bechir Ben Saïd", "EST", "GK", 7.0, 6.6),
  p("gk3", "Mouez Hassen", "ESS", "GK", 5.5, 5.4),
  p("gk4", "Sabri Ben Hassen", "CA", "GK", 5.0, 5.0),
  p("gk5", "Ali Jemal", "USM", "GK", 4.5, 4.6),
  // Défenseurs
  p("d1", "Montassar Talbi", "EST", "DEF", 8.0, 6.9),
  p("d2", "Yassine Meriah", "EST", "DEF", 6.5, 6.0),
  p("d3", "Ali Abdi", "CA", "DEF", 7.5, 6.5),
  p("d4", "Mohamed Dräger", "ESS", "DEF", 7.0, 6.3),
  p("d5", "Ali Maâloul", "EST", "DEF", 7.5, 6.7),
  p("d6", "Dylan Bronn", "ESS", "DEF", 7.0, 6.2),
  p("d7", "Hamza Mathlouthi", "CA", "DEF", 6.0, 5.8),
  p("d8", "Oussama Haddadi", "ST", "DEF", 5.5, 5.3),
  p("d9", "Bilel Ifa", "USM", "DEF", 5.0, 5.1),
  p("d10", "Nader Ghandri", "CAB", "DEF", 5.5, 5.5),
  p("d11", "Wajdi Kechrida", "ST", "DEF", 4.5, 4.7),
  // Milieux
  p("m1", "Ellyes Skhiri", "ESS", "MID", 9.5, 7.4),
  p("m2", "Aïssa Laïdouni", "EST", "MID", 9.0, 7.2),
  p("m3", "Hannibal Mejbri", "CA", "MID", 9.5, 7.0),
  p("m4", "Anis Ben Slimane", "ESS", "MID", 8.0, 6.8),
  p("m5", "Mohamed Ali Ben Romdhane", "EST", "MID", 8.5, 7.1),
  p("m6", "Ferjani Sassi", "CA", "MID", 7.5, 6.6),
  p("m7", "Elias Saad", "USM", "MID", 7.0, 6.4),
  p("m8", "Ghailene Chaalali", "ST", "MID", 6.0, 5.7),
  p("m9", "Yan Valery", "CAB", "MID", 6.5, 6.0),
  p("m10", "Hamza Rafia", "USM", "MID", 6.0, 5.8),
  p("m11", "Amine Ben Amor", "CAB", "MID", 5.0, 5.0),
  // Attaquants
  p("f1", "Youssef Msakni", "EST", "FWD", 11.0, 7.8),
  p("f2", "Wahbi Khazri", "ESS", "FWD", 10.0, 7.3),
  p("f3", "Elias Achouri", "CA", "FWD", 9.5, 7.0),
  p("f4", "Seifeddine Jaziri", "EST", "FWD", 8.5, 6.8),
  p("f5", "Taha Yassine Khenissi", "EST", "FWD", 8.0, 6.5),
  p("f6", "Hazem Mastouri", "ESS", "FWD", 8.0, 6.6),
  p("f7", "Firas Chaouat", "CA", "FWD", 7.0, 6.2),
  p("f8", "Naïm Sliti", "ST", "FWD", 6.5, 5.9),
  p("f9", "Ali Youssef", "USM", "FWD", 5.5, 5.4),
  p("f10", "Karim Aribi", "CAB", "FWD", 5.0, 5.0),
];

export const playerById = (id: string) => PLAYERS.find((x) => x.id === id);
