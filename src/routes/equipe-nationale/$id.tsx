import { Link, createFileRoute } from "@tanstack/react-router";
import {
  NATIONAL_FIXTURES,
  NATIONAL_RESULTS,
  STADIUM_IMG,
  type NationalFixture,
  type NationalResult,
} from "@/data/ftf";
import { SELECTIONS, selectionById, type Selection } from "@/data/selections";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const Route = createFileRoute("/equipe-nationale/$id")({
  head: ({ params }) => ({
    meta: [{ title: `${selectionById(params.id)?.name ?? "Équipe nationale"} — FTF` }],
  }),
  component: SelectionPage,
});

/** Name of the side Tunisia faces; for away fixtures the listed "team" is the host. */
function opponentLabel(f: { team: string; opponent: string }): string {
  return f.team.startsWith("Tunisie") ? f.opponent : `${f.team} (extérieur)`;
}

/**
 * Selections with entries in the shared calendar (senior team, U23, U20) read from it;
 * the others fall back to the content carried by their own selection data.
 */
function fixturesFor(
  sel: Selection,
): { date: string; time: string; opponent: string; competition: string; venue: string }[] {
  const shared = NATIONAL_FIXTURES.filter((f: NationalFixture) => (f.squad ?? "a") === sel.id);
  if (sel.id === "a" || shared.length > 0) {
    return shared.map((f) => ({
      date: f.date,
      time: f.time,
      opponent: opponentLabel(f),
      competition: f.competition,
      venue: f.venue,
    }));
  }
  return sel.fixtures.map((f) => ({
    date: f.date,
    time: f.time,
    opponent: f.home ? f.opponent : `${f.opponent} (extérieur)`,
    competition: f.competition,
    venue: f.venue,
  }));
}

function resultsFor(
  sel: Selection,
): { date: string; opponent: string; competition: string; score: string }[] {
  const shared = NATIONAL_RESULTS.filter((r: NationalResult) => (r.squad ?? "a") === sel.id);
  if (sel.id === "a" || shared.length > 0) {
    return shared.map((r) => ({
      date: r.date,
      opponent: opponentLabel(r),
      competition: r.competition,
      score: r.score,
    }));
  }
  return sel.results.map((r) => ({
    date: r.date,
    opponent: r.opponent,
    competition: r.competition,
    score: r.score,
  }));
}

function SelectionPage() {
  const { id } = Route.useParams();
  const sel = selectionById(id);

  if (!sel) {
    return (
      <div className="min-h-screen font-sans text-foreground">
        <SiteHeader />
        <main className="mx-auto max-w-3xl px-4 py-24 text-center">
          <p className="eyebrow text-brand-red">Erreur 404</p>
          <h1 className="title-page mt-3">Cette sélection n'existe pas</h1>
          <Link
            to="/equipe-nationale"
            className="mt-6 inline-block rounded-full bg-brand-red px-6 py-3 text-sm font-bold text-white transition hover:brightness-110"
          >
            Toutes les sélections →
          </Link>
        </main>
        <SiteFooter />
      </div>
    );
  }

  const fixtures = fixturesFor(sel);
  const results = resultsFor(sel);
  const others = SELECTIONS.filter((s) => s.id !== sel.id);

  return (
    <div className="min-h-screen font-sans text-foreground">
      <SiteHeader />

      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-brand-ink text-white">
        <img
          src={STADIUM_IMG}
          alt=""
          aria-hidden
          className="absolute inset-0 h-full w-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-ink via-brand-ink/90 to-brand-ink/45" />
        <div className="relative mx-auto max-w-7xl px-4 py-12 md:py-16">
          <nav className="text-[13px] text-white/60" aria-label="Fil d'ariane">
            <Link to="/equipe-nationale" className="transition hover:text-brand-gold">
              Équipes nationales
            </Link>
            <span className="mx-2">/</span>
            <span className="text-white">{sel.name}</span>
          </nav>
          <p className="eyebrow mt-6 text-brand-gold">{sel.tagline}</p>
          <h1 className="title-page mt-3 max-w-3xl text-4xl text-white md:text-5xl">{sel.name}</h1>
          <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-white/70">{sel.detail}</p>
          <p className="mt-1 text-sm font-bold text-white/85">Sélectionneur : {sel.coach}</p>
        </div>
      </section>

      <main className="mx-auto max-w-7xl px-4 py-12">
        <p className="max-w-3xl text-[15px] leading-relaxed text-muted-foreground">{sel.intro}</p>

        {/* Facts */}
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {sel.facts.map(([n, l]) => (
            <div key={l} className="rounded-3xl border border-border bg-card p-6">
              <div className="score text-5xl leading-none text-brand-red">{n}</div>
              <p className="mt-2 text-sm uppercase tracking-[0.14em] text-muted-foreground">{l}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-2">
          {/* Staff + calendar */}
          <div className="contents">
            <section>
              <h2 className="title-section">Staff technique</h2>
              <ul className="mt-4 divide-y divide-border overflow-hidden rounded-2xl border border-border bg-card">
                {sel.staff.map((s) => (
                  <li key={s.role} className="px-4 py-3">
                    <p className="text-xs uppercase tracking-[0.12em] text-muted-foreground">
                      {s.role}
                    </p>
                    <p className="mt-0.5 text-sm font-bold">{s.name}</p>
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="title-section">Prochains matchs</h2>
              {fixtures.length === 0 ? (
                <p className="mt-4 text-sm text-muted-foreground">Calendrier à venir.</p>
              ) : (
                <ul className="mt-4 space-y-3">
                  {fixtures.map((f) => (
                    <li
                      key={f.date + f.opponent}
                      className="rounded-2xl border border-border bg-card p-4"
                    >
                      <p className="eyebrow text-muted-foreground">
                        {f.date} · {f.time}
                      </p>
                      <p className="mt-1.5 text-sm font-bold">{f.opponent}</p>
                      <p className="mt-1 text-xs text-muted-foreground">{f.venue}</p>
                    </li>
                  ))}
                </ul>
              )}
              {sel.id === "a" && (
                <Link
                  to="/competition"
                  className="mt-4 inline-block text-sm font-bold text-brand-red hover:underline"
                >
                  Calendrier & résultats complet →
                </Link>
              )}
            </section>
          </div>
        </div>

        {/* Results */}
        {results.length > 0 && (
          <section className="mt-12">
            <h2 className="title-section">Derniers résultats</h2>
            <div className="mt-5 grid gap-3 md:grid-cols-2">
              {results.map((r) => (
                <div
                  key={r.date + r.opponent}
                  className="flex items-center justify-between gap-3 rounded-2xl border border-border bg-card px-5 py-3.5"
                >
                  <div className="min-w-0">
                    <p className="truncate text-sm font-bold">
                      vs {r.opponent}{" "}
                      <span className="score ml-1 rounded bg-brand-ink px-2 py-0.5 text-base leading-none text-white">
                        {r.score}
                      </span>
                    </p>
                    <p className="mt-0.5 truncate text-xs text-muted-foreground">
                      {r.competition} · {r.date}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Milestones */}
        {sel.milestones.length > 0 && (
          <section className="mt-12">
            <h2 className="title-section">Repères</h2>
            <ol className="mt-5 divide-y divide-border border-y border-border">
              {sel.milestones.map((m) => (
                <li key={m.year} className="flex gap-5 py-4">
                  <span className="score w-16 shrink-0 text-xl text-brand-red">{m.year}</span>
                  <span className="text-sm leading-relaxed text-foreground/85">{m.text}</span>
                </li>
              ))}
            </ol>
          </section>
        )}

        {/* Other selections */}
        <section className="mt-12">
          <h2 className="title-section">Autres sélections</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {others.map((s) => (
              <Link
                key={s.id}
                to="/equipe-nationale/$id"
                params={{ id: s.id }}
                className="rounded-3xl border border-border bg-card p-5 transition hover:border-brand-red hover:shadow-lg"
              >
                <h3 className="title-card">{s.name}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground">{s.detail}</p>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
