import { Link, createFileRoute } from "@tanstack/react-router";
import { CLUBS } from "@/data/ftf";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const Route = createFileRoute("/fantasy-coach")({
  head: () => ({ meta: [{ title: "Fantasy Coach — FTF" }] }),
  component: FantasyCoach,
});

function FantasyCoach() {
  return (
    <div className="min-h-screen font-sans text-foreground">
      <SiteHeader />
      <main className="mx-auto max-w-4xl px-4 py-14 text-center">
        <p className="eyebrow text-brand-red">Jeu officiel FTF</p>
        <h1 className="title-page mx-auto mt-3 max-w-2xl text-4xl md:text-5xl">Fantasy Coach</h1>
        <p className="mx-auto mt-4 max-w-xl text-[15px] leading-relaxed text-muted-foreground">
          Composez votre XI de Ligue 1, défiez la communauté à chaque journée et suivez vos points en
          temps réel.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-5 rounded-3xl border border-border bg-card px-6 py-7">
          {CLUBS.map((c) => (
            <img
              key={c.short}
              src={c.logo}
              alt={c.name}
              title={c.name}
              className="h-14 w-14 object-contain"
            />
          ))}
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            to="/clubs"
            className="rounded-full bg-brand-red px-6 py-3 text-sm font-bold text-white transition hover:brightness-110"
          >
            Choisir mes joueurs →
          </Link>
          <Link
            to="/competition"
            className="rounded-full border border-border bg-card px-6 py-3 text-sm font-bold transition hover:border-brand-red hover:text-brand-red"
          >
            Règles du jeu
          </Link>
        </div>

        <p className="mt-6 text-xs text-muted-foreground">
          Ouverture officielle des inscriptions à la reprise du championnat.
        </p>
      </main>
      <SiteFooter />
    </div>
  );
}
