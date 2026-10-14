import { Link, createFileRoute } from "@tanstack/react-router";
import { FIXTURES, clubByShort } from "@/data/ftf";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const Route = createFileRoute("/clubs/$short")({
  component: ClubDetail,
});

function ClubDetail() {
  const { short } = Route.useParams();
  const club = clubByShort(short);

  if (!club) {
    return (
      <div className="min-h-screen font-sans text-foreground">
        <SiteHeader />
        <main className="mx-auto max-w-3xl px-4 py-20 text-center">
          <h1 className="font-display text-5xl">Club introuvable</h1>
          <Link to="/clubs" className="mt-6 inline-block font-bold text-brand-red">
            ← Tous les clubs
          </Link>
        </main>
        <SiteFooter />
      </div>
    );
  }

  const matches = FIXTURES.filter((f) => f.home.short === club.short || f.away.short === club.short);

  return (
    <div className="min-h-screen font-sans text-foreground">
      <SiteHeader />
      <main className="mx-auto max-w-4xl px-4 py-10">
        <Link to="/clubs" className="text-sm font-bold text-brand-red">
          ← Tous les clubs
        </Link>
        <div className="mt-4 flex items-center gap-6 rounded-3xl border border-border bg-card p-6">
          <img src={club.logo} alt={club.name} className="h-28 w-28 object-contain" />
          <div>
            <h1 className="font-display text-5xl leading-none">{club.name}</h1>
            <p className="mt-2 text-sm uppercase tracking-widest text-muted-foreground">
              {club.city} · Fondé en {club.year}
            </p>
          </div>
        </div>
        <h2 className="mt-8 font-display text-3xl">Prochains matchs</h2>
        <div className="mt-3 space-y-3">
          {matches.length === 0 && <p className="text-muted-foreground">Aucun match programmé cette semaine.</p>}
          {matches.map((f) => (
            <div
              key={f.id}
              className="flex flex-wrap items-center justify-between gap-2 rounded-2xl border border-border bg-card px-5 py-3 font-bold"
            >
              <span>
                {f.home.short} vs {f.away.short} · {f.date} {f.time}
              </span>
              <Link to="/billetterie" className="text-sm text-brand-red">
                Billetterie →
              </Link>
            </div>
          ))}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
