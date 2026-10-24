import { Link, createFileRoute } from "@tanstack/react-router";
import {
  ARTICLES,
  CLUBS,
  FIXTURES,
  FTF_LOGO,
  RESULTS,
  STANDINGS,
  STADIUM_IMG,
  TROPHY_IMG,
} from "@/data/ftf";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "FTF — Fédération Tunisienne de Football" },
      { name: "description", content: "Le football tunisien : les Aigles de Carthage, la Ligue 1, les résultats et les actualités officielles." },
      { property: "og:title", content: "FTF — Fédération Tunisienne de Football" },
      { property: "og:description", content: "Les Aigles de Carthage, la Ligue 1 et les actualités officielles." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Crest({ src, alt, size = "h-7 w-7" }: { src: string; alt: string; size?: string }) {
  return <img src={src} alt={alt} className={`${size} object-contain`} />;
}

function Index() {
  const featured = ARTICLES[0]!;
  const rest = ARTICLES.slice(1);

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
        <div className="relative mx-auto max-w-7xl px-4 pb-28 pt-14 md:pt-20">
          <p className="eyebrow text-brand-gold">Fédération Tunisienne de Football · Saison 2026</p>
          <h1 className="title-page mt-4 max-w-4xl text-4xl text-white md:text-6xl">
            Le football tunisien vit ici
          </h1>
          <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-white/70">
            Compétitions nationales, Aigles de Carthage et actualités officielles — de Radès à Bizerte,
            toute la vie du football tunisien réunie en un seul endroit.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              to="/competition"
              className="rounded-full bg-brand-red px-6 py-3 text-sm font-bold text-white transition hover:brightness-110"
            >
              Compétitions &amp; résultats
            </Link>
            <Link
              to="/billetterie"
              className="rounded-full border border-white/35 px-6 py-3 text-sm font-bold text-white transition hover:border-white hover:bg-white/5"
            >
              Billetterie
            </Link>
          </div>
        </div>
      </section>

      {/* ── Scoreboard (overlaps hero) ───────────────────────────────── */}
      <section className="relative z-10 mx-auto -mt-16 max-w-7xl px-4">
        <div className="grid overflow-hidden rounded-3xl border border-border bg-card shadow-2xl md:grid-cols-2">
          <div className="p-6 md:border-r md:border-border">
            <div className="flex items-center justify-between">
              <p className="eyebrow text-brand-red">Prochaines rencontres</p>
              <Link to="/competition" className="text-xs font-bold text-muted-foreground hover:text-brand-red">
                Calendrier →
              </Link>
            </div>
            <div className="mt-4 divide-y divide-border">
              {FIXTURES.map((f) => (
                <div key={f.id} className="flex items-center justify-between gap-3 py-3">
                  <div className="flex min-w-0 items-center gap-2.5">
                    <Crest src={f.home.logo} alt={f.home.name} />
                    <span className="text-sm font-bold">{f.home.short}</span>
                    <span className="text-xs text-muted-foreground">vs</span>
                    <span className="text-sm font-bold">{f.away.short}</span>
                    <Crest src={f.away.logo} alt={f.away.name} />
                  </div>
                  <div className="shrink-0 text-right">
                    <p className="score text-base leading-none">{f.time}</p>
                    <p className="text-[11px] text-muted-foreground">{f.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t border-border p-6 md:border-t-0">
            <div className="flex items-center justify-between">
              <p className="eyebrow text-brand-red">Derniers résultats</p>
              <Link to="/competition" className="text-xs font-bold text-muted-foreground hover:text-brand-red">
                Tous les matchs →
              </Link>
            </div>
            <div className="mt-4 divide-y divide-border">
              {RESULTS.map((r) => (
                <div key={r.id} className="flex items-center justify-between gap-3 py-3">
                  <div className="flex min-w-0 items-center gap-2.5">
                    <Crest src={r.home.logo} alt={r.home.name} />
                    <span className="text-sm font-bold">{r.home.short}</span>
                  </div>
                  <div className="flex shrink-0 items-center gap-1.5">
                    <span className="score grid h-8 w-8 place-items-center rounded bg-brand-ink text-lg leading-none text-white">
                      {r.hs}
                    </span>
                    <span className="score grid h-8 w-8 place-items-center rounded bg-brand-ink text-lg leading-none text-white">
                      {r.as}
                    </span>
                  </div>
                  <div className="flex min-w-0 items-center gap-2.5">
                    <span className="text-sm font-bold">{r.away.short}</span>
                    <Crest src={r.away.logo} alt={r.away.name} />
                  </div>
                </div>
              ))}
            </div>
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
              alt={featured.title}
              className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-ink via-brand-ink/55 to-brand-ink/20" />
            <div className="relative flex h-full min-h-[22rem] flex-col justify-end p-6 md:p-10">
              <span className="eyebrow w-fit rounded-full bg-brand-red px-3 py-1 text-white">
                {featured.category}
              </span>
              <h3 className="title-page mt-4 max-w-2xl text-white">
                <Link to="/actualites/$id" params={{ id: featured.id }} className="hover:underline">
                  {featured.title}
                </Link>
              </h3>
              <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-white/75">{featured.excerpt}</p>
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
                    <Link to="/actualites/$id" params={{ id: a.id }} className="hover:text-brand-red">
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

      {/* ── Match centre ─────────────────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-4 pb-14">
        <div className="grid items-center gap-8 overflow-hidden rounded-3xl bg-brand-deep px-6 py-8 text-white md:grid-cols-[1fr_auto_1fr] md:px-10">
          <div className="flex items-center justify-center gap-5 md:justify-end">
            <div className="text-center">
              <Crest src={CLUBS[0]!.logo} alt={CLUBS[0]!.name} size="mx-auto h-20 w-20" />
              <p className="mt-2 font-display text-xl font-bold">EST</p>
            </div>
            <div className="text-center">
              <p className="eyebrow text-brand-gold">J6 · Derby</p>
              <p className="score mt-1 text-4xl leading-none">VS</p>
              <p className="mt-1 text-[11px] text-white/60">Dim · 17:00 · Radès</p>
            </div>
            <div className="text-center">
              <Crest src={CLUBS[1]!.logo} alt={CLUBS[1]!.name} size="mx-auto h-20 w-20" />
              <p className="mt-2 font-display text-xl font-bold">CA</p>
            </div>
          </div>

          <div className="hidden h-24 w-px bg-white/15 md:block" />

          <div className="text-center md:text-left">
            <p className="eyebrow text-brand-gold">Centre du match</p>
            <h2 className="title-section mt-1.5 text-white">Le derby de Tunis décide du titre</h2>
            <div className="mt-4 flex flex-wrap justify-center gap-3 md:justify-start">
              <Link
                to="/billetterie"
                className="rounded-full bg-brand-red px-5 py-2.5 text-sm font-bold text-white transition hover:brightness-110"
              >
                Billetterie →
              </Link>
              <Link
                to="/competition"
                className="rounded-full border border-white/35 px-5 py-2.5 text-sm font-bold transition hover:border-white hover:bg-white/5"
              >
                Centre du match →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Classement + clubs ───────────────────────────────────────── */}
      <section className="border-y border-border bg-brand-paper">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 lg:grid-cols-[1fr_1.4fr]">
          <div className="h-fit overflow-hidden rounded-3xl border border-border bg-card">
            <div className="flex items-baseline justify-between border-b border-border px-6 py-4">
              <h2 className="title-section">Classement</h2>
              <Link to="/classement" className="text-sm font-bold text-brand-red hover:underline">
                Complet →
              </Link>
            </div>
            <table className="w-full text-sm">
              <thead className="text-left text-muted-foreground">
                <tr>
                  <th className="px-6 py-2 font-semibold">#</th>
                  <th className="py-2 font-semibold">Club</th>
                  <th className="py-2 font-semibold">J</th>
                  <th className="px-6 py-2 text-right font-semibold">Pts</th>
                </tr>
              </thead>
              <tbody>
                {STANDINGS.map((r, i) => (
                  <tr key={r.club.short} className="border-t border-border/70">
                    <td className="px-6 py-3 font-bold text-brand-red">{i + 1}</td>
                    <td className="py-3">
                      <Link
                        to="/clubs/$short"
                        params={{ short: r.club.short.toLowerCase() }}
                        className="flex items-center gap-3 font-semibold hover:text-brand-red"
                      >
                        <Crest src={r.club.logo} alt={r.club.name} />
                        {r.club.name}
                      </Link>
                    </td>
                    <td className="py-3 text-muted-foreground">{r.played}</td>
                    <td className="px-6 py-3 text-right">
                      <span className="score text-xl">{r.pts}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div>
            <div className="flex items-baseline justify-between">
              <h2 className="title-section">Les Clubs</h2>
              <Link to="/clubs" className="text-sm font-bold text-brand-red hover:underline">
                Tous les clubs →
              </Link>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3">
              {CLUBS.map((club) => (
                <Link
                  key={club.short}
                  to="/clubs/$short"
                  params={{ short: club.short.toLowerCase() }}
                  className="group rounded-3xl border border-border bg-card p-5 text-center transition hover:-translate-y-1 hover:border-brand-red hover:shadow-xl"
                >
                  <Crest
                    src={club.logo}
                    alt={club.name}
                    size="mx-auto h-20 w-20 transition group-hover:scale-110"
                  />
                  <h3 className="title-card mt-3">{club.name}</h3>
                  <p className="mt-1 text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                    {club.city} · {club.year}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Documents officiels ──────────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-4 py-14">
        <div className="flex items-end justify-between gap-4 border-b border-border pb-4">
          <div>
            <p className="eyebrow text-brand-red">Transparence</p>
            <h2 className="title-section mt-1.5">Documents officiels</h2>
          </div>
          <Link to="/documents" className="whitespace-nowrap text-sm font-bold text-brand-red hover:underline">
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
      </section>

      {/* ── Bande Équipe Nationale ───────────────────────────────────── */}
      <section className="relative overflow-hidden bg-brand-ink text-white">
        <img src={TROPHY_IMG} alt="" aria-hidden className="absolute inset-0 h-full w-full object-cover opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-ink via-brand-ink/90 to-brand-ink/60" />
        <div className="relative mx-auto max-w-7xl px-4 py-16">
          <p className="eyebrow text-brand-gold">Aigles de Carthage</p>
          <div className="mt-8 grid gap-8 md:grid-cols-3">
            {[
              ["6", "Participations en Coupe du Monde"],
              ["2004", "Champions d'Afrique"],
              ["1957", "Fondation de la Fédération"],
            ].map(([n, l]) => (
              <div key={l} className="border-l-4 border-brand-red pl-6">
                <div className="score text-6xl leading-none text-brand-gold">{n}</div>
                <p className="mt-2 text-sm uppercase tracking-[0.14em] text-white/70">{l}</p>
              </div>
            ))}
          </div>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link
              to="/equipe-nationale"
              className="rounded-full bg-brand-red px-6 py-3 text-sm font-bold text-white transition hover:brightness-110"
            >
              Suivre les Aigles →
            </Link>
            <Link
              to="/actualites/$id"
              params={{ id: "squad-can" }}
              className="rounded-full border border-white/35 px-6 py-3 text-sm font-bold transition hover:border-white hover:bg-white/5"
            >
              Dossier CAN →
            </Link>
          </div>
        </div>
      </section>

      </main>
      <SiteFooter />
    </div>
  );
}
