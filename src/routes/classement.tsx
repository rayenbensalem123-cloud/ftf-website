import { Link, createFileRoute } from "@tanstack/react-router";
import { STANDINGS } from "@/data/ftf";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { PageHead } from "@/components/page-head";

export const Route = createFileRoute("/classement")({
  head: () => ({ meta: [{ title: "Classement Ligue 1 — FTF" }] }),
  component: Classement,
});

function Classement() {
  return (
    <div className="min-h-screen font-sans text-foreground">
      <SiteHeader />
      <main className="mx-auto max-w-4xl px-4 py-10">
        <PageHead
          eyebrow="Saison 2026 · Journée 6"
          title="Classement Ligue 1"
          lead="Le classement officiel mis à jour après chaque journée."
        />

        <div className="mt-6 overflow-hidden rounded-3xl border border-border bg-card">
          <table className="w-full text-sm">
            <thead className="border-b border-border text-left text-muted-foreground">
              <tr>
                <th className="px-5 py-3 font-semibold">#</th>
                <th className="py-3 font-semibold">Club</th>
                <th className="py-3 font-semibold">J</th>
                <th className="px-5 py-3 text-right font-semibold">Pts</th>
              </tr>
            </thead>
            <tbody>
              {STANDINGS.map((r, i) => (
                <tr key={r.club.short} className="border-t border-border/70">
                  <td className="px-5 py-3 font-bold text-brand-red">{i + 1}</td>
                  <td className="py-3">
                    <Link
                      to="/clubs/$short"
                      params={{ short: r.club.short.toLowerCase() }}
                      className="flex items-center gap-3 font-semibold hover:text-brand-red"
                    >
                      <img src={r.club.logo} alt={r.club.name} className="h-8 w-8 object-contain" />
                      {r.club.name}
                    </Link>
                  </td>
                  <td className="py-3 text-muted-foreground">{r.played}</td>
                  <td className="px-5 py-3 text-right">
                    <span className="score text-xl">{r.pts}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            to="/competition"
            className="rounded-full bg-brand-red px-5 py-2.5 text-sm font-bold text-white transition hover:brightness-110"
          >
            Matchs →
          </Link>
          <Link
            to="/clubs"
            className="rounded-full border border-border bg-card px-5 py-2.5 text-sm font-bold transition hover:border-brand-red hover:text-brand-red"
          >
            Clubs →
          </Link>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
