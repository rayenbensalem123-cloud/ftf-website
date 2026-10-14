import { Link, createFileRoute } from "@tanstack/react-router";
import { STANDINGS } from "@/data/ftf";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const Route = createFileRoute("/classement")({
  component: Classement,
});

function Classement() {
  return (
    <div className="min-h-screen font-sans text-foreground">
      <SiteHeader />
      <main className="mx-auto max-w-4xl px-4 py-10">
        <p className="text-sm font-bold uppercase tracking-widest text-brand-gold">Saison 2026 · J6</p>
        <h1 className="font-display text-5xl text-white">Classement Ligue 1</h1>
        <div className="mt-6 rounded-3xl border border-border bg-card p-6">
          <table className="w-full text-sm">
            <thead className="text-left text-muted-foreground">
              <tr>
                <th className="py-2">#</th>
                <th>Club</th>
                <th>J</th>
                <th className="text-right">Pts</th>
              </tr>
            </thead>
            <tbody>
              {STANDINGS.map((r, i) => (
                <tr key={r.club.short} className="border-t border-border">
                  <td className="py-3 font-bold text-brand-red">{i + 1}</td>
                  <td>
                    <Link
                      to="/clubs/$short"
                      params={{ short: r.club.short.toLowerCase() }}
                      className="flex items-center gap-3 font-medium hover:text-brand-red"
                    >
                      <img src={r.club.logo} alt={r.club.name} className="h-8 w-8 object-contain" />
                      {r.club.name}
                    </Link>
                  </td>
                  <td>{r.played}</td>
                  <td className="text-right font-display text-xl">{r.pts}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-6 flex gap-3">
          <Link
            to="/competition"
            className="rounded-full bg-brand-red px-5 py-2 font-display text-lg tracking-wide text-primary-foreground"
          >
            Matchs →
          </Link>
          <Link to="/clubs" className="rounded-full border border-border px-5 py-2 font-display text-lg">
            Clubs →
          </Link>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
