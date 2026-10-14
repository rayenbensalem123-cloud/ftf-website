import { Link, createFileRoute } from "@tanstack/react-router";
import { NATIONAL_TEAMS, STADIUM_IMG } from "@/data/ftf";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const Route = createFileRoute("/equipe-nationale")({
  component: EquipeNationale,
});

function EquipeNationale() {
  return (
    <div className="min-h-screen font-sans text-foreground">
      <SiteHeader />
      <main className="mx-auto max-w-7xl px-4 py-10">
        <p className="text-sm font-bold uppercase tracking-widest text-brand-gold">Les Aigles de Carthage</p>
        <h1 className="font-display text-5xl text-white">Équipes Nationales</h1>
        <div className="relative mt-6 overflow-hidden rounded-3xl">
          <img src={STADIUM_IMG} alt="Stade plein" className="h-80 w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 to-transparent" />
          <div className="absolute bottom-0 p-6 text-primary-foreground">
            <h2 className="max-w-2xl font-display text-4xl leading-none">
              Objectif CAN — un groupe, un pays, une ambition
            </h2>
          </div>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {[
            ["6", "Participations Coupe du Monde"],
            ["2004", "Champions d'Afrique"],
            ["27", "Joueurs convoqués"],
          ].map(([n, l]) => (
            <div key={l} className="rounded-3xl border border-border bg-card p-6">
              <div className="font-display text-6xl text-brand-red">{n}</div>
              <p className="uppercase tracking-widest text-muted-foreground">{l}</p>
            </div>
          ))}
        </div>
        <h2 className="mt-10 font-display text-4xl text-white">Toutes les sélections</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {NATIONAL_TEAMS.map((t) => (
            <article key={t.id} className="rounded-3xl border border-border bg-card p-5">
              <p className="text-xs font-black uppercase tracking-widest text-brand-red">Sélection</p>
              <h3 className="mt-1 font-display text-3xl leading-none">{t.name}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{t.detail}</p>
              <div className="mt-3 flex flex-wrap gap-3 text-sm font-bold">
                <Link to="/actualites" className="text-brand-red">
                  Actualités →
                </Link>
                <Link to="/competition" className="text-brand-red">
                  Résultats →
                </Link>
                <Link to="/actualites/$id" params={{ id: "squad-can" }} className="text-brand-red">
                  Effectif →
                </Link>
              </div>
            </article>
          ))}
        </div>
        <div className="mt-6 flex gap-3">
          <Link
            to="/billetterie"
            className="rounded-full bg-brand-red px-5 py-2 font-display text-lg tracking-wide text-primary-foreground"
          >
            Billetterie →
          </Link>
          <Link to="/" className="rounded-full border border-border px-5 py-2 font-display text-lg">
            ← Accueil
          </Link>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
