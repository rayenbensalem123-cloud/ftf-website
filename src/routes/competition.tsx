import { Link, createFileRoute } from "@tanstack/react-router";
import { FIXTURES, RESULTS } from "@/data/ftf";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const Route = createFileRoute("/competition")({
  component: Competition,
});

function Competition() {
  return (
    <div className="min-h-screen font-sans text-foreground">
      <SiteHeader />
      <main className="mx-auto max-w-7xl px-4 py-10">
        <p className="text-sm font-bold uppercase tracking-widest text-brand-gold">Ligue 1 Professionnelle</p>
        <div className="mt-1 flex flex-wrap items-baseline justify-between gap-4">
          <h1 className="font-display text-5xl text-white">Compétition</h1>
          <Link to="/classement" className="font-bold text-white">
            Voir le classement →
          </Link>
        </div>
        <Tabs defaultValue="fixtures" className="mt-6">
          <TabsList>
            <TabsTrigger value="fixtures">Journée 6 · À venir</TabsTrigger>
            <TabsTrigger value="results">Journée 5 · Résultats</TabsTrigger>
          </TabsList>
          <TabsContent value="fixtures">
            <div className="grid gap-4 md:grid-cols-3">
              {FIXTURES.map((f) => (
                <article key={f.id} className="rounded-3xl border border-border bg-card p-5">
                  <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                    {f.date} · {f.time}
                  </p>
                  <div className="mt-3 grid grid-cols-[1fr_auto_1fr] items-center gap-2 font-bold">
                    <span className="flex items-center justify-end gap-2">
                      {f.home.short}
                      <img src={f.home.logo} alt={f.home.name} className="h-10 w-10 object-contain" />
                    </span>
                    <span className="font-display text-xl">VS</span>
                    <span className="flex items-center gap-2">
                      <img src={f.away.logo} alt={f.away.name} className="h-10 w-10 object-contain" />
                      {f.away.short}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">{f.venue}</p>
                  <Link
                    to="/billetterie"
                    className="mt-4 block rounded-full bg-brand-red py-2 text-center font-display text-lg tracking-wide text-primary-foreground hover:opacity-90"
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
                  className="flex items-center justify-between rounded-2xl border border-border bg-card px-5 py-3 font-bold"
                >
                  <span>
                    {r.home.short} {r.hs} — {r.as} {r.away.short}
                  </span>
                  <Link to="/classement" className="text-sm text-brand-red">
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
