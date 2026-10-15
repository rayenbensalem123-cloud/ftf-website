import { Link, createFileRoute } from "@tanstack/react-router";
import { CLUBS, FIXTURES, clubByShort } from "@/data/ftf";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { PageHead } from "@/components/page-head";

export const Route = createFileRoute("/clubs/$short")({
  head: ({ params }) => {
    const club = clubByShort(params.short);
    return { meta: [{ title: club ? `${club.name} — FTF` : "Club — FTF" }] };
  },
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
          <h1 className="title-page">Club introuvable</h1>
          <Link to="/clubs" className="mt-6 inline-block font-bold text-brand-red hover:underline">
            ← Tous les clubs
          </Link>
        </main>
        <SiteFooter />
      </div>
    );
  }

  const matches = FIXTURES.filter((f) => f.home.short === club.short || f.away.short === club.short);
  const standing = CLUBS.findIndex((c) => c.short === club.short) + 1;

  return (
    <div className="min-h-screen font-sans text-foreground">
      <SiteHeader />
      <main className="mx-auto max-w-4xl px-4 py-10">
        <Link to="/clubs" className="text-sm font-bold text-brand-red hover:underline">
          ← Tous les clubs
        </Link>

        <div className="mt-5 flex flex-wrap items-center gap-6 rounded-3xl border border-border bg-card p-6 md:p-8">
          <img src={club.logo} alt={club.name} className="h-24 w-24 object-contain md:h-28 md:w-28" />
          <div className="min-w-0">
            <p className="eyebrow text-brand-red">{club.city} · Ligue 1</p>
            <h1 className="title-page mt-2">{club.name}</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Fondé en {club.year} · Bilan de la saison 2026
            </p>
          </div>
        </div>

        <PageHead eyebrow="Calendrier" title="Prochains matchs" />

        <div className="mt-4 space-y-3">
          {matches.length === 0 && (
            <p className="text-muted-foreground">Aucun match programmé cette semaine.</p>
          )}
          {matches.map((f) => (
            <div
              key={f.id}
              className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-border bg-card px-5 py-3.5"
            >
              <div className="flex items-center gap-3 font-bold">
                <img src={f.home.logo} alt={f.home.name} className="h-7 w-7 object-contain" />
                {f.home.short}
                <span className="score text-sm text-muted-foreground">vs</span>
                {f.away.short}
                <img src={f.away.logo} alt={f.away.name} className="h-7 w-7 object-contain" />
              </div>
              <span className="text-sm text-muted-foreground">
                {f.date} · {f.time}
              </span>
              <Link to="/billetterie" className="text-sm font-bold text-brand-red hover:underline">
                Billetterie →
              </Link>
            </div>
          ))}
        </div>

        <p className="mt-8 rounded-2xl bg-brand-paper p-5 text-sm text-muted-foreground">
          Les statistiques détaillées, l'effectif complet et l'historique du club seront publiés
          prochainement. {club.short} figure au {standing}
          <sup>e</sup> rang du classement provisoire.
        </p>
      </main>
      <SiteFooter />
    </div>
  );
}
