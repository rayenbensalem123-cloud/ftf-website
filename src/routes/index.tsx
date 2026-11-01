import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Trophy } from "lucide-react";
import { NextMatch } from "@/components/next-match";
import { ARTICLES, NATIONAL_TEAMS, STADIUM_IMG, TROPHY_IMG } from "@/data/ftf";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "FTF — Fédération Tunisienne de Football" },
      {
        name: "description",
        content:
          "La Fédération Tunisienne de Football : les Aigles de Carthage, les équipes nationales, les actualités et les documents officiels.",
      },
      { property: "og:title", content: "FTF — Fédération Tunisienne de Football" },
      {
        property: "og:description",
        content: "Les Aigles de Carthage, les équipes nationales et les actualités officielles.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

/** The site covers the federation and the national teams; club coverage lives on the league's own site. */
const CLUB_CATEGORIES = ["Ligue 1", "Ligue des Champions CAF"];

function Index() {
  const news = ARTICLES.filter((a) => !CLUB_CATEGORIES.includes(a.category));
  const featured = news[0] ?? ARTICLES[0]!;
  const rest = news.filter((a) => a.id !== featured.id);

  return (
    <div className="min-h-screen font-sans text-foreground">
      <SiteHeader />
      <main>
        {/* ── Hero ─────────────────────────────────────────────────────── */}
        <section className="relative isolate overflow-hidden bg-brand-ink text-white">
          <img
            src={STADIUM_IMG}
            alt=""
            aria-hidden
            className="absolute inset-0 h-full w-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-ink via-brand-ink/90 to-brand-ink/40" />
          <div className="relative mx-auto max-w-7xl px-4 pb-32 pt-14 md:pt-20">
            <p className="eyebrow text-brand-gold">
              Fédération Tunisienne de Football · Saison 2026
            </p>
            <h1 className="title-page mt-4 max-w-4xl text-4xl text-white md:text-6xl">
              Le football tunisien vit ici
            </h1>
            <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-white/70">
              Les Aigles de Carthage, toutes les sélections nationales et les actualités officielles
              de la Fédération.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-6">
              <Link
                to="/equipe-nationale"
                className="group inline-flex items-center gap-2 border-b-2 border-brand-red pb-1 text-sm font-bold text-white transition hover:gap-3"
              >
                Les équipes nationales
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
              <Link
                to="/fantasy-coach"
                className="inline-flex h-11 items-center gap-2 rounded-full bg-brand-red px-6 text-sm font-bold text-white shadow-lg shadow-brand-red/30 transition hover:brightness-110"
              >
                <Trophy className="h-4 w-4" aria-hidden />
                Jouer au Fantasy Coach
              </Link>
              <Link
                to="/billetterie"
                className="group inline-flex items-center gap-2 text-sm font-semibold text-white/80 transition hover:gap-3 hover:text-white"
              >
                Billetterie
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </div>
            <NextMatch />
          </div>
        </section>

        {/* ── Sélections nationales (overlaps hero) ────────────────────── */}
        <section className="relative z-10 mx-auto -mt-20 max-w-7xl px-4">
          <div className="overflow-hidden rounded-3xl border border-border bg-card p-6 shadow-2xl md:p-8">
            <div className="flex items-center justify-between gap-4">
              <h2 className="eyebrow text-brand-red">Les sélections</h2>
              <Link
                to="/equipe-nationale"
                className="text-xs font-bold text-muted-foreground hover:text-brand-red"
              >
                Toutes les sélections →
              </Link>
            </div>
            <div className="mt-5 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
              {NATIONAL_TEAMS.map((t) => (
                <Link
                  key={t.id}
                  to="/equipe-nationale/$id"
                  params={{ id: t.id }}
                  className="group flex flex-col gap-1.5 bg-card px-5 py-5 transition hover:bg-brand-paper"
                >
                  <h3 className="title-card group-hover:text-brand-red">{t.name}</h3>
                  <p className="text-sm text-muted-foreground">{t.detail}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── Actualités ───────────────────────────────────────────────── */}
        <section className="mx-auto max-w-7xl px-4 py-14">
          <div className="flex items-end justify-between gap-4 border-b border-border pb-4">
            <div>
              <p className="eyebrow text-brand-red">Actualités</p>
              <h2 className="title-section mt-1.5">Dernières nouvelles</h2>
            </div>
            <Link
              to="/actualites"
              className="whitespace-nowrap text-sm font-bold text-brand-red hover:underline"
            >
              Toutes les actualités →
            </Link>
          </div>

          <div className="mt-6 grid gap-6 lg:grid-cols-[1.6fr_1fr]">
            <article className="group relative min-h-[22rem] overflow-hidden rounded-3xl">
              <img
                src={TROPHY_IMG}
                alt=""
                className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-ink via-brand-ink/55 to-brand-ink/20" />
              <div className="relative flex h-full min-h-[22rem] flex-col justify-end p-6 md:p-10">
                <span className="eyebrow w-fit rounded-full bg-brand-red px-3 py-1 text-white">
                  {featured.category}
                </span>
                <h3 className="title-page mt-4 max-w-2xl text-white">
                  <Link
                    to="/actualites/$id"
                    params={{ id: featured.id }}
                    className="hover:underline"
                  >
                    {featured.title}
                  </Link>
                </h3>
                <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-white/75">
                  {featured.excerpt}
                </p>
                <div className="mt-5 flex items-center gap-3 text-xs text-white/60">
                  <span>À la une</span>
                  <span className="h-px flex-1 bg-white/20" />
                  <span>FTF</span>
                </div>
              </div>
            </article>

            <div className="flex flex-col divide-y divide-border">
              {rest.slice(0, 3).map((a, i) => (
                <article key={a.id} className="group flex gap-5 py-5 first:pt-0 last:pb-0">
                  <span className="score flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-border bg-brand-paper text-2xl text-brand-red">
                    {i + 1}
                  </span>
                  <div className="min-w-0">
                    <p className="eyebrow text-brand-red">{a.category}</p>
                    <h3 className="title-card mt-1.5">
                      <Link
                        to="/actualites/$id"
                        params={{ id: a.id }}
                        className="hover:text-brand-red"
                      >
                        {a.title}
                      </Link>
                    </h3>
                    <p className="mt-1.5 line-clamp-2 text-sm text-muted-foreground">{a.excerpt}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ── Fantasy Coach ───────────────────────────────────────────── */}
        <section className="mx-auto max-w-7xl px-4 pb-14">
          <div className="relative isolate grid items-center gap-8 overflow-hidden rounded-3xl bg-brand-ink p-6 text-white md:grid-cols-2 md:p-12">
            <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_85%_30%,oklch(0.51_0.215_27/0.6),transparent_55%)]" />
            <div>
              <p className="eyebrow text-brand-gold">Jeu officiel</p>
              <h2 className="title-page mt-2 text-4xl text-white md:text-5xl">
                Devenez le coach de votre XI
              </h2>
              <p className="mt-4 max-w-md text-[15px] leading-relaxed text-white/70">
                100 M de budget, 11 joueurs de Ligue 1, un capitaine qui compte double. Composez,
                partagez, défiez vos amis.
              </p>
              <Link
                to="/fantasy-coach"
                className="mt-7 inline-flex h-12 items-center gap-2 rounded-full bg-white px-7 text-sm font-bold text-brand-ink transition hover:gap-3 hover:bg-brand-gold"
              >
                Composer mon équipe
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </div>
            <Link to="/fantasy-coach" aria-label="Ouvrir Fantasy Coach" className="group block">
              <div className="pitch relative mx-auto aspect-[4/3] max-w-md overflow-hidden rounded-2xl border-4 border-white/90 shadow-2xl transition duration-500 group-hover:-rotate-1 group-hover:scale-[1.03]">
                <div className="absolute inset-x-4 top-1/2 h-px bg-white/30" />
                {[
                  [50, 14],
                  [22, 32],
                  [50, 34],
                  [78, 32],
                  [14, 54],
                  [38, 56],
                  [62, 56],
                  [86, 54],
                  [20, 78],
                  [50, 80],
                  [80, 78],
                ].map(([x, y], i) => (
                  <span
                    key={i}
                    className="absolute h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white bg-white/25 md:h-7 md:w-7"
                    style={{ left: `${x}%`, top: `${y}%` }}
                  />
                ))}
              </div>
            </Link>
          </div>
        </section>

        {/* ── Dossier CAN ──────────────────────────────────────────────── */}
        <section className="mx-auto max-w-7xl px-4 pb-14">
          <div className="grid items-center gap-8 overflow-hidden rounded-3xl bg-brand-deep px-6 py-10 text-white md:grid-cols-[auto_1fr] md:px-10">
            <div className="text-center md:border-r md:border-white/15 md:pr-10">
              <div className="score text-7xl leading-none text-brand-gold">27</div>
              <p className="mt-2 text-sm uppercase tracking-[0.14em] text-white/70">
                Aigles retenus
              </p>
            </div>
            <div className="text-center md:text-left">
              <p className="eyebrow text-brand-gold">Dossier CAN</p>
              <h2 className="title-section mt-1.5 text-white">
                La liste finale des Aigles de Carthage est dévoilée
              </h2>
              <div className="mt-5 flex flex-wrap justify-center gap-6 md:justify-start">
                <Link
                  to="/actualites/$id"
                  params={{ id: "squad-can" }}
                  className="group inline-flex items-center gap-2 border-b-2 border-brand-gold pb-1 text-sm font-bold text-white transition hover:gap-3"
                >
                  Lire le dossier
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
                <Link
                  to="/billetterie"
                  className="group inline-flex items-center gap-2 text-sm font-semibold text-white/80 transition hover:gap-3 hover:text-white"
                >
                  Billetterie
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ── Documents officiels ──────────────────────────────────────── */}
        <section className="border-y border-border bg-brand-paper">
          <div className="mx-auto max-w-7xl px-4 py-14">
            <div className="flex items-end justify-between gap-4 border-b border-border pb-4">
              <div>
                <p className="eyebrow text-brand-red">Transparence</p>
                <h2 className="title-section mt-1.5">Documents officiels</h2>
              </div>
              <Link
                to="/documents"
                className="whitespace-nowrap text-sm font-bold text-brand-red hover:underline"
              >
                Tous les documents →
              </Link>
            </div>
            <div className="mt-6 grid divide-y divide-border border-y border-border sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4">
              {[
                { cat: "Communiqués", desc: "Décisions et annonces de la FTF" },
                { cat: "Règlements", desc: "Statuts & règlements généraux" },
                { cat: "Arbitrage", desc: "Désignations & VAR" },
                { cat: "Appels d'offres", desc: "Marchés & consultations" },
              ].map((d, i) => (
                <Link
                  key={d.cat}
                  to="/documents"
                  className="group flex flex-col gap-2 px-0 py-5 transition sm:px-6 sm:py-6 lg:px-5"
                >
                  <div className="flex items-center justify-between">
                    <span className="score text-3xl leading-none text-brand-red">0{i + 1}</span>
                    <span className="text-xs font-bold text-muted-foreground transition group-hover:text-brand-red">
                      Consulter →
                    </span>
                  </div>
                  <h3 className="title-card mt-1 group-hover:text-brand-red">{d.cat}</h3>
                  <p className="text-sm text-muted-foreground">{d.desc}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── Bande Équipe Nationale ───────────────────────────────────── */}
        <section className="relative overflow-hidden bg-brand-ink text-white">
          <img
            src={TROPHY_IMG}
            alt=""
            aria-hidden
            className="absolute inset-0 h-full w-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-ink via-brand-ink/90 to-brand-ink/60" />
          <div className="relative mx-auto max-w-7xl px-4 py-16">
            <p className="eyebrow text-brand-gold">Aigles de Carthage</p>
            <div className="mt-8 grid gap-8 md:grid-cols-3">
              {[
                ["7", "Participations en Coupe du Monde"],
                ["2004", "Champions d'Afrique"],
                ["1957", "Fondation de la Fédération"],
              ].map(([n, l]) => (
                <div key={l} className="border-l-4 border-brand-red pl-6">
                  <div className="score text-6xl leading-none text-brand-gold">{n}</div>
                  <p className="mt-2 text-sm uppercase tracking-[0.14em] text-white/70">{l}</p>
                </div>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-6">
              <Link
                to="/equipe-nationale"
                className="group inline-flex items-center gap-2 border-b-2 border-brand-red pb-1 text-sm font-bold text-white transition hover:gap-3"
              >
                Suivre les Aigles
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
