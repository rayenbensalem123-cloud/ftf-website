import { Link, createFileRoute } from "@tanstack/react-router";
import { FIXTURES, RESULTS } from "@/data/ftf";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { PageHead } from "@/components/page-head";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const Route = createFileRoute("/competition")({
  component: Competition,
});

function Competition() {
  return (
    <div className="min-h-screen font-sans text-foreground">
      <SiteHeader />
      <main className="mx-auto max-w-7xl px-4 py-10">
        <PageHead
          eyebrow="Ligue 1 Professionnelle"
          title="Compétition"
          lead="Calendrier, résultats et enjeux de la saison 2026 — Ligue 1 et Coupe de Tunisie."
          action={
            <Link to="/classement" className="text-sm font-bold text-brand-red hover:underline">
              Voir le classement →
            </Link>
          }
        />

        <Tabs defaultValue="fixtures" className="mt-6">
          <TabsList>
            <TabsTrigger value="fixtures">Journée 6 · À venir</TabsTrigger>
            <TabsTrigger value="results">Journée 5 · Résultats</TabsTrigger>
          </TabsList>

          <TabsContent value="fixtures">
            <div className="grid gap-4 md:grid-cols-3">
              {FIXTURES.map((f) => (
                <article
                  key={f.id}
                  className="rounded-3xl border border-border bg-card p-5 transition hover:border-brand-red hover:shadow-lg"
                >
                  <p className="eyebrow text-muted-foreground">
                    {f.date} · {f.time}
                  </p>
                  <div className="mt-4 grid grid-cols-[1fr_auto_1fr] items-center gap-2 font-bold">
                    <span className="flex items-center justify-end gap-2.5">
                      {f.home.short}
                      <img src={f.home.logo} alt={f.home.name} className="h-10 w-10 object-contain" />
                    </span>
                    <span className="score text-xl text-muted-foreground">VS</span>
                    <span className="flex items-center gap-2.5">
                      <img src={f.away.logo} alt={f.away.name} className="h-10 w-10 object-contain" />
                      {f.away.short}
                    </span>
                  </div>
                  <p className="mt-3 text-center text-sm text-muted-foreground">{f.venue}</p>
                  <Link
                    to="/billetterie"
                    className="mt-4 block rounded-full bg-brand-red py-2.5 text-center text-[13px] font-bold text-white transition hover:brightness-110"
                  >
                    Billetterie →
                  </Link>
                </article>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="results">
            <div className="grid gap-3">
              {RESULTS.map((r) => (
                <div
                  key={r.id}
                  className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-border bg-card px-5 py-3.5"
                >
                  <div className="flex items-center gap-3 font-bold">
                    <img src={r.home.logo} alt={r.home.name} className="h-7 w-7 object-contain" />
                    {r.home.short}
                    <span className="score rounded bg-brand-ink px-2 py-0.5 text-lg leading-none text-white">
                      {r.hs}–{r.as}
                    </span>
                    {r.away.short}
                    <img src={r.away.logo} alt={r.away.name} className="h-7 w-7 object-contain" />
                  </div>
                  <Link to="/classement" className="text-sm font-bold text-brand-red hover:underline">
                    Impact classement →
                  </Link>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>
      <SiteFooter />
    </div>
  );
}
