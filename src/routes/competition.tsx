import { Link, createFileRoute } from "@tanstack/react-router";
import { NATIONAL_FIXTURES, NATIONAL_RESULTS } from "@/data/ftf";
import { downloadIcs, fixtureIcs } from "@/lib/kickoff";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { PageHead } from "@/components/page-head";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const Route = createFileRoute("/competition")({
  head: () => ({ meta: [{ title: "Calendrier & résultats — FTF" }] }),
  component: Calendrier,
});

function EmptyState({ children }: { children: string }) {
  return (
    <div className="rounded-3xl border border-dashed border-border bg-card px-6 py-12 text-center">
      <p className="mx-auto max-w-md text-[15px] text-muted-foreground">{children}</p>
      <Link
        to="/actualites"
        className="mt-4 inline-block text-sm font-bold text-brand-red hover:underline"
      >
        Suivre les actualités →
      </Link>
    </div>
  );
}

function Calendrier() {
  return (
    <div className="min-h-screen font-sans text-foreground">
      <SiteHeader />
      <main className="mx-auto max-w-7xl px-4 py-10">
        <PageHead
          eyebrow="Équipes nationales"
          title="Calendrier & résultats"
          lead="Les prochains matchs et les derniers résultats des Aigles de Carthage et des sélections de jeunes. Les programmes de la sélection féminine et du futsal seront ajoutés dès leur publication."
        />

        <Tabs defaultValue="fixtures" className="mt-6">
          <TabsList>
            <TabsTrigger value="fixtures">À venir</TabsTrigger>
            <TabsTrigger value="results">Résultats</TabsTrigger>
          </TabsList>

          <TabsContent value="fixtures">
            {NATIONAL_FIXTURES.length === 0 ? (
              <EmptyState>Le calendrier des prochains matchs sera publié prochainement.</EmptyState>
            ) : (
              <div className="grid gap-4 md:grid-cols-3">
                {NATIONAL_FIXTURES.map((f) => (
                  <article
                    key={f.id}
                    className="rounded-3xl border border-border bg-card p-5 transition hover:border-brand-red hover:shadow-lg"
                  >
                    <p className="eyebrow text-muted-foreground">
                      {f.date} · {f.time}
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">{f.competition}</p>
                    <p className="title-card mt-4 text-center">
                      {f.team} <span className="text-muted-foreground">vs</span> {f.opponent}
                    </p>
                    <p className="mt-3 text-center text-sm text-muted-foreground">{f.venue}</p>
                    <div className="mt-4 flex flex-wrap justify-center gap-3 text-[13px] font-bold">
                      <Link
                        to="/match/$id"
                        params={{ id: f.id }}
                        className="text-brand-red hover:underline"
                      >
                        Détails
                      </Link>
                      {fixtureIcs(f) && (
                        <button
                          onClick={() => downloadIcs(f)}
                          className="text-muted-foreground hover:text-brand-red"
                        >
                          + Calendrier
                        </button>
                      )}
                    </div>
                    {f.ticketsOpen && (
                      <Link
                        to="/billetterie"
                        className="mt-4 block rounded-full bg-brand-red py-2.5 text-center text-[13px] font-bold text-white transition hover:brightness-110"
                      >
                        Billetterie →
                      </Link>
                    )}
                  </article>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="results">
            {NATIONAL_RESULTS.length === 0 ? (
              <EmptyState>Les résultats seront publiés ici après chaque match.</EmptyState>
            ) : (
              <div className="grid gap-3">
                {NATIONAL_RESULTS.map((r) => (
                  <div
                    key={r.id}
                    className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-border bg-card px-5 py-3.5"
                  >
                    <Link
                      to="/match/$id"
                      params={{ id: r.id }}
                      className="flex items-center gap-3 font-bold hover:text-brand-red"
                    >
                      {r.team}
                      <span className="score rounded bg-brand-ink px-2 py-0.5 text-lg leading-none text-white">
                        {r.score}
                      </span>
                      {r.opponent}
                    </Link>
                    <span className="text-sm text-muted-foreground">
                      {r.competition} · {r.date}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>
      <SiteFooter />
    </div>
  );
}
