import { Link, createFileRoute } from "@tanstack/react-router";
import { NATIONAL_TEAMS, STADIUM_IMG, TROPHY_IMG } from "@/data/ftf";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { PageHead } from "@/components/page-head";

export const Route = createFileRoute("/equipe-nationale")({
  head: () => ({ meta: [{ title: "Équipes Nationales — FTF" }] }),
  component: EquipeNationale,
});

function EquipeNationale() {
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
        <div className="relative mx-auto max-w-7xl px-4 py-14 md:py-20">
          <p className="eyebrow text-brand-gold">Les Aigles de Carthage</p>
          <h1 className="title-page mt-3 max-w-3xl text-4xl text-white md:text-5xl">
            Équipes Nationales
          </h1>
          <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-white/70">
            Objectif CAN — un groupe, un pays, une ambition. Suivez les sélections tunisiennes, des
            A aux jeunes catégories.
          </p>
        </div>
      </section>

      <main className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid gap-4 md:grid-cols-3">
          {[
            ["7", "Participations Coupe du Monde"],
            ["2004", "Champions d'Afrique"],
            ["27", "Joueurs convoqués"],
          ].map(([n, l]) => (
            <div key={l} className="rounded-3xl border border-border bg-card p-6">
              <div className="score text-6xl leading-none text-brand-red">{n}</div>
              <p className="mt-2 text-sm uppercase tracking-[0.14em] text-muted-foreground">{l}</p>
            </div>
          ))}
        </div>

        <div className="mt-12">
          <PageHead eyebrow="Sélections" title="Toutes les sélections" />
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {NATIONAL_TEAMS.map((t) => (
              <article
                key={t.id}
                className="rounded-3xl border border-border bg-card p-5 transition hover:border-brand-red hover:shadow-lg"
              >
                <p className="eyebrow text-brand-red">Sélection</p>
                <h3 className="title-section mt-1.5">{t.name}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{t.detail}</p>
                <div className="mt-4 flex flex-wrap gap-4 text-sm font-bold">
                  <Link to="/actualites" className="text-brand-red hover:underline">
                    Actualités →
                  </Link>
                  <Link to="/competition" className="text-brand-red hover:underline">
                    Résultats →
                  </Link>
                  <Link
                    to="/actualites/$id"
                    params={{ id: "squad-can" }}
                    className="text-brand-red hover:underline"
                  >
                    Effectif →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>

        <section className="relative mt-12 overflow-hidden rounded-3xl bg-brand-ink px-6 py-10 text-white md:px-10">
          <img
            src={TROPHY_IMG}
            alt=""
            aria-hidden
            className="absolute inset-0 h-full w-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-ink via-brand-ink/90 to-brand-ink/60" />
          <div className="relative">
            <p className="eyebrow text-brand-gold">Dossier spécial</p>
            <h2 className="title-section mt-2 max-w-2xl text-white md:text-3xl">
              Cap sur la prochaine Coupe d'Afrique des Nations
            </h2>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link
                to="/actualites/$id"
                params={{ id: "squad-can" }}
                className="rounded-full bg-brand-red px-5 py-2.5 text-sm font-bold text-white transition hover:brightness-110"
              >
                Lire le dossier →
              </Link>
              <Link
                to="/billetterie"
                className="rounded-full border border-white/35 px-5 py-2.5 text-sm font-bold transition hover:border-white hover:bg-white/5"
              >
                Billetterie →
              </Link>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
