import { Link, createFileRoute } from "@tanstack/react-router";
import { NATIONAL_FIXTURES, NATIONAL_RESULTS } from "@/data/ftf";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { downloadIcs, fixtureIcs } from "@/lib/kickoff";

export const Route = createFileRoute("/match/$id")({
  head: ({ params }) => {
    const m =
      NATIONAL_FIXTURES.find((f) => f.id === params.id) ??
      NATIONAL_RESULTS.find((r) => r.id === params.id);
    return { meta: [{ title: m ? `${m.team} – ${m.opponent} — FTF` : "Match — FTF" }] };
  },
  component: MatchPage,
});

function MatchPage() {
  const { id } = Route.useParams();
  const fixture = NATIONAL_FIXTURES.find((f) => f.id === id);
  const result = NATIONAL_RESULTS.find((r) => r.id === id);
  const m = fixture ?? result;

  return (
    <div className="min-h-screen font-sans text-foreground">
      <SiteHeader />
      <main className="mx-auto max-w-3xl px-4 py-12">
        {!m ? (
          <div className="text-center">
            <p className="eyebrow text-brand-red">Erreur 404</p>
            <h1 className="title-page mt-3">Ce match n'existe pas</h1>
          </div>
        ) : (
          <>
            <p className="eyebrow text-brand-red">{m.competition}</p>
            <h1 className="title-page mt-3 text-4xl md:text-5xl">
              {m.team} <span className="text-muted-foreground">vs</span> {m.opponent}
            </h1>
            {result && (
              <p className="score mt-5 inline-block rounded bg-brand-ink px-4 py-1.5 text-4xl text-white">
                {result.score}
              </p>
            )}
            <dl className="mt-8 divide-y divide-border overflow-hidden rounded-3xl border border-border bg-card">
              <div className="flex justify-between gap-4 px-6 py-4">
                <dt className="text-sm text-muted-foreground">Date</dt>
                <dd className="text-sm font-bold">{m.date}</dd>
              </div>
              {fixture && (
                <>
                  <div className="flex justify-between gap-4 px-6 py-4">
                    <dt className="text-sm text-muted-foreground">Heure</dt>
                    <dd className="text-sm font-bold">{fixture.time}</dd>
                  </div>
                  <div className="flex justify-between gap-4 px-6 py-4">
                    <dt className="text-sm text-muted-foreground">Lieu</dt>
                    <dd className="text-sm font-bold">{fixture.venue}</dd>
                  </div>
                </>
              )}
            </dl>
            <div className="mt-6 flex flex-wrap gap-3">
              {fixture && fixtureIcs(fixture) && (
                <button
                  onClick={() => downloadIcs(fixture)}
                  className="rounded-full bg-brand-red px-5 py-2.5 text-sm font-bold text-white transition hover:brightness-110"
                >
                  Ajouter à mon calendrier
                </button>
              )}
              {fixture?.ticketsOpen && (
                <Link
                  to="/billetterie"
                  className="rounded-full border border-border px-5 py-2.5 text-sm font-bold hover:border-brand-red hover:text-brand-red"
                >
                  Billetterie →
                </Link>
              )}
              <Link
                to="/competition"
                className="rounded-full border border-border px-5 py-2.5 text-sm font-bold hover:border-brand-red hover:text-brand-red"
              >
                ← Calendrier & résultats
              </Link>
            </div>
          </>
        )}
      </main>
      <SiteFooter />
    </div>
  );
}
