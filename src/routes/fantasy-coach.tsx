import { Link, createFileRoute } from "@tanstack/react-router";
import { CLUBS } from "@/data/ftf";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const Route = createFileRoute("/fantasy-coach")({
  component: FantasyCoach,
});

function FantasyCoach() {
  return (
    <div className="min-h-screen font-sans text-foreground">
      <SiteHeader />
      <main className="mx-auto max-w-4xl px-4 py-10 text-center">
        <p className="text-sm font-bold uppercase tracking-widest text-brand-gold">Jeu FTF</p>
        <h1 className="font-display text-6xl text-white">Fantasy Coach</h1>
        <p className="mx-auto mt-3 max-w-xl text-white/75">
          Composez votre XI de Ligue 1 avec les 6 clubs partenaires et défiez la communauté chaque journée.
        </p>
        <div className="mt-6 flex justify-center gap-4">
          {CLUBS.slice(0, 5).map((c) => (
            <img key={c.short} src={c.logo} alt={c.name} title={c.name} className="h-14 w-14 object-contain" />
          ))}
        </div>
        <div className="mt-8 flex justify-center gap-3">
          <Link
            to="/clubs"
            className="rounded-full bg-brand-red px-6 py-3 font-display text-xl tracking-wide text-primary-foreground"
          >
            Choisir mes joueurs →
          </Link>
          <Link to="/competition" className="rounded-full border border-border px-6 py-3 font-display text-xl">
            Règles du jeu
          </Link>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
