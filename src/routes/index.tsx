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
      { name: "description", content: "The home of Tunisian football: Les Aigles de Carthage, Ligue 1 clubs, fixtures and news." },
      { property: "og:title", content: "FTF — Fédération Tunisienne de Football" },
      { property: "og:description", content: "Les Aigles de Carthage, Ligue 1 clubs, fixtures and news." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Logo({ src, alt, size = "h-8 w-8" }: { src: string; alt: string; size?: string }) {
  return <img src={src} alt={alt} className={`${size} object-contain`} />;
}

function Index() {
  const [featured, second, ...cards] = ARTICLES as [typeof ARTICLES[number], typeof ARTICLES[number], ...typeof ARTICLES];

  return (
    <div className="min-h-screen font-sans text-foreground">
      <SiteHeader />

      {/* Section head */}
      <div className="mx-auto mt-8 flex max-w-7xl flex-wrap items-end justify-between gap-3 px-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-brand-gold">
            À la une · 6e journée
          </p>
          <h1 className="font-display text-5xl leading-none text-white md:text-6xl">Le football tunisien vit ici</h1>
        </div>
        <Link to="/actualites" className="font-bold text-white">
          Toutes les actualités →
        </Link>
      </div>

      {/* Red panel — fixtures + headlines */}
      <section className="mx-auto mt-4 max-w-7xl px-4">
        <div className="relative overflow-hidden rounded-3xl bg-brand-red p-4 shadow-xl ring-1 ring-white/25 md:p-6">
          <img
            src={FTF_LOGO}
            alt=""
            aria-hidden
            className="pointer-events-none absolute -bottom-44 left-1/3 w-[42rem] opacity-10"
          />
          <div className="relative grid gap-5 lg:grid-cols-[340px_1fr]">
            {/* Sidebar */}
            <aside className="space-y-5">
              <div className="rounded-3xl bg-card p-5 shadow-lg">
                <p className="text-center text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">
                  Match week 6
                </p>
                <div className="mt-1 flex items-center justify-center gap-3 font-bold text-brand-red">
                  <span>Professional</span>
                  <Logo src={FTF_LOGO} alt="FTF" />
                  <span>Ligue 1</span>
                </div>
                <p className="mt-1 text-center font-display text-2xl">18 octobre 2026</p>
                <div className="mt-3 divide-y divide-border">
                  {FIXTURES.map((f) => (
                    <div key={f.id} className="py-3" title={f.venue}>
                      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2 text-sm font-bold">
                        <div className="flex items-center justify-end gap-2">
                          {f.home.short}
                          <Logo src={f.home.logo} alt={f.home.name} />
                        </div>
                        <span className="rounded-md border border-border bg-muted px-2 py-1 font-mono text-xs text-muted-foreground">
                          {f.time}
                        </span>
                        <div className="flex items-center gap-2">
                          <Logo src={f.away.logo} alt={f.away.name} />
                          {f.away.short}
                        </div>
                      </div>
                      <p className="mt-1 text-center text-[11px] font-medium text-muted-foreground">{f.venue}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-3xl bg-card p-5 shadow-lg">
                <p className="text-center font-display text-2xl">Match week 5 results</p>
                <div className="mt-3 space-y-3">
                  {RESULTS.map((r) => (
                    <div key={r.id} className="grid grid-cols-[1fr_auto_1fr] items-center gap-2 text-sm font-bold">
                      <div className="flex items-center justify-end gap-2">
                        {r.home.short}
                        <Logo src={r.home.logo} alt={r.home.name} />
                      </div>
                      <div className="flex gap-1">
                        {[r.hs, r.as].map((n, j) => (
                          <span
                            key={j}
                            className="grid h-9 w-8 place-items-center rounded bg-brand-red font-display text-2xl text-primary-foreground"
                          >
                            {n}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center gap-2">
                        <Logo src={r.away.logo} alt={r.away.name} />
                        {r.away.short}
                      </div>
                    </div>
                  ))}
                </div>
                <Link
                  to="/competition"
                  className="mt-5 block rounded-full bg-brand-red py-2 text-center font-display text-xl tracking-wide text-primary-foreground transition hover:opacity-90"
                >
                  View all →
                </Link>
              </div>
            </aside>

            {/* Headlines */}
            <div className="space-y-5">
              <article className="relative overflow-hidden rounded-3xl border-4 border-card shadow-xl">
                <img
                  src={STADIUM_IMG}
                  alt="Stade Hammadi Agrebi plein pour la CAN"
                  width={1600}
                  height={912}
                  className="h-80 w-full object-cover md:h-[26rem]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/20 to-transparent" />
                <img src={FTF_LOGO} alt="" aria-hidden className="absolute right-8 top-6 h-24 w-24 opacity-90" />
                <div className="absolute bottom-0 max-w-2xl p-6 text-primary-foreground">
                  <span className="rounded-full bg-brand-red px-3 py-1 text-xs font-bold uppercase tracking-widest">
                    {featured.category}
                  </span>
                  <h2 className="mt-3 font-display text-4xl leading-none md:text-5xl">
                    <Link to="/actualites/$id" params={{ id: featured.id }} className="hover:underline">
                      {featured.title}
                    </Link>
                  </h2>
                  <p className="mt-2 max-w-xl text-sm text-primary-foreground/80">{featured.excerpt}</p>
                </div>
              </article>
              <article className="grid overflow-hidden rounded-3xl bg-card shadow-lg md:grid-cols-2">
                <img
                  src={TROPHY_IMG}
                  alt="Espérance soulève le trophée continental"
                  loading="lazy"
                  width={1200}
                  height={800}
                  className="h-64 w-full object-cover md:h-full"
                />
                <div className="p-6">
                  <p className="text-sm font-bold uppercase tracking-widest text-brand-red">{second.category}</p>
                  <h3 className="mt-2 font-display text-4xl leading-none">{second.title}</h3>
                  <p className="mt-3 text-muted-foreground">{second.excerpt}</p>
                  <Link
                    to="/actualites/$id"
                    params={{ id: second.id }}
                    className="mt-4 inline-block font-bold text-brand-red"
                  >
                    Read more →
                  </Link>
                </div>
              </article>
              <div className="grid gap-5 md:grid-cols-2">
                {cards.map((a) => (
                  <article key={a.id} className="rounded-3xl bg-card/95 p-6 shadow-lg">
                    <p className="text-sm font-bold uppercase tracking-widest text-brand-red">{a.category}</p>
                    <h3 className="mt-1 font-display text-3xl leading-none">
                      <Link to="/actualites/$id" params={{ id: a.id }} className="hover:text-brand-red">
                        {a.title}
                      </Link>
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground">{a.excerpt}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Match centre — prochain match */}
      <section className="mx-auto mt-6 max-w-7xl px-4">
        <div className="grid items-center gap-6 rounded-3xl bg-brand-deep px-6 py-6 text-primary-foreground md:grid-cols-[1fr_auto_1fr]">
          <div className="flex items-center justify-center gap-4 md:justify-end">
            <div className="text-center">
              <img src={CLUBS[0]!.logo} alt="Espérance de Tunis" className="mx-auto h-20 w-20 object-contain" />
              <p className="mt-2 font-display text-2xl tracking-wide">EST</p>
            </div>
            <div className="text-center">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-brand-gold">J6 · Derby</p>
              <p className="font-display text-4xl">VS</p>
              <p className="text-xs text-primary-foreground/70">Dim 17:00 · Radès</p>
            </div>
            <div className="text-center">
              <img src={CLUBS[1]!.logo} alt="Club Africain" className="mx-auto h-20 w-20 object-contain" />
              <p className="mt-2 font-display text-2xl tracking-wide">CA</p>
            </div>
          </div>
          <div className="hidden h-24 w-px bg-primary-foreground/15 md:block" />
          <div className="text-center md:text-left">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-brand-gold">Match centre</p>
            <h2 className="mt-1 font-display text-3xl leading-none">Le derby de Tunis décide du titre</h2>
            <div className="mt-3 flex flex-wrap justify-center gap-2 md:justify-start">
              <Link
                to="/billetterie"
                className="rounded-full bg-brand-red px-5 py-2 font-display text-lg tracking-wide text-primary-foreground hover:opacity-90"
              >
                Billetterie →
              </Link>
              <Link
                to="/competition"
                className="rounded-full border border-primary-foreground/30 px-5 py-2 font-display text-lg tracking-wide hover:border-primary-foreground"
              >
                Centre du match →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Table + clubs */}
      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-14 lg:grid-cols-[1fr_1.4fr]">
        <div className="h-fit rounded-3xl border border-border bg-card p-6">
          <div className="flex items-baseline justify-between">
            <h2 className="font-display text-4xl text-white">Classement</h2>
            <Link to="/classement" className="text-sm font-bold text-white">
              Complet →
            </Link>
          </div>
          <table className="mt-4 w-full text-sm">
            <thead className="text-left text-muted-foreground">
              <tr>
                <th className="py-2">#</th>
                <th>Club</th>
                <th>J</th>
                <th className="text-right">Pts</th>
              </tr>
            </thead>
            <tbody>
              {STANDINGS.map((r, i) => (
                <tr key={r.club.short} className="border-t border-border">
                  <td className="py-3 font-bold text-brand-red">{i + 1}</td>
                  <td>
                    <Link
                      to="/clubs/$short"
                      params={{ short: r.club.short.toLowerCase() }}
                      className="flex items-center gap-3 font-medium hover:text-brand-red"
                    >
                      <Logo src={r.club.logo} alt={r.club.name} />
                      {r.club.name}
                    </Link>
                  </td>
                  <td>{r.played}</td>
                  <td className="text-right font-display text-xl">{r.pts}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div>
          <div className="flex items-baseline justify-between">
            <h2 className="font-display text-4xl text-white">Les Clubs</h2>
            <Link to="/clubs" className="text-sm font-bold text-white">
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
                <Logo
                  src={club.logo}
                  alt={club.name}
                  size="mx-auto h-20 w-20 transition group-hover:scale-110"
                />
                <h3 className="mt-3 font-display text-2xl leading-none">{club.name}</h3>
                <p className="text-xs uppercase tracking-widest text-muted-foreground">
                  {club.city} · {club.year}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Documents officiels */}
      <section className="mx-auto max-w-7xl px-4">
        <div className="mb-3 flex items-baseline justify-between">
          <h2 className="font-display text-4xl text-white">Documents officiels</h2>
          <Link to="/documents" className="text-sm font-bold text-white">
            Tous les documents →
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { cat: "Communiqués", desc: "Décisions et annonces de la FTF", icon: "📢" },
            { cat: "Règlements", desc: "Statuts & règlements généraux", icon: "📜" },
            { cat: "Arbitrage", desc: "Désignations & VAR", icon: "🏁" },
            { cat: "Appels d'offres", desc: "Marchés & consultations", icon: "📋" },
          ].map((d) => (
            <Link
              key={d.cat}
              to="/documents"
              className="group rounded-3xl border border-border bg-card p-5 transition hover:-translate-y-1 hover:border-brand-red hover:shadow-xl"
            >
              <span className="text-3xl" aria-hidden>
                {d.icon}
              </span>
              <h3 className="mt-2 font-display text-2xl leading-none group-hover:text-brand-red">{d.cat}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{d.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* National team band */}
      <section className="bg-brand-deep py-16 text-primary-foreground">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 md:grid-cols-3">
          {[
            ["6", "World Cup appearances"],
            ["2004", "Africa Cup of Nations champions"],
            ["1957", "Federation founded"],
          ].map(([n, l]) => (
            <div key={l} className="border-l-4 border-brand-gold pl-6">
              <div className="font-display text-7xl text-brand-red">{n}</div>
              <p className="uppercase tracking-widest text-primary-foreground/70">{l}</p>
            </div>
          ))}
        </div>
        <div className="mx-auto mt-8 flex max-w-7xl flex-wrap gap-3 px-4">
          <Link
            to="/equipe-nationale"
            className="rounded-full bg-brand-red px-6 py-3 font-display text-xl tracking-wide text-primary-foreground hover:opacity-90"
          >
            Suivre les Aigles →
          </Link>
          <Link
            to="/actualites/$id"
            params={{ id: "squad-can" }}
            className="rounded-full border border-primary-foreground/30 px-6 py-3 font-display text-xl tracking-wide hover:border-primary-foreground"
          >
            Dossier CAN →
          </Link>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
