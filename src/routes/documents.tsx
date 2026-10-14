import { Link, createFileRoute } from "@tanstack/react-router";
import { DOCS } from "@/data/ftf";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const Route = createFileRoute("/documents")({
  component: Documents,
});

function Documents() {
  return (
    <div className="min-h-screen font-sans text-foreground">
      <SiteHeader />
      <main className="mx-auto max-w-4xl px-4 py-10">
        <p className="text-sm font-bold uppercase tracking-widest text-brand-gold">Transparence FTF</p>
        <h1 className="font-display text-5xl text-white">Documents officiels</h1>
        <p className="mt-2 text-white/75">
          Communiqués, règlements, arbitrage et appels d'offres — comme l'exigent les standards des
          fédérations.
        </p>
        <div className="mt-6 divide-y divide-border rounded-3xl border border-border bg-card">
          {DOCS.map((d) => (
            <div key={d.id} className="flex flex-wrap items-center justify-between gap-2 p-5">
              <div>
                <p className="text-xs font-black uppercase tracking-widest text-brand-red">{d.cat}</p>
                <h2 className="mt-1 font-display text-2xl leading-none">{d.title}</h2>
                <p className="mt-1 text-xs text-muted-foreground">Publié le {d.date}</p>
              </div>
              <span className="rounded-full bg-muted px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-muted-foreground">
                PDF
              </span>
            </div>
          ))}
        </div>
        <div className="mt-6 flex gap-3">
          <Link
            to="/contact"
            className="rounded-full bg-brand-red px-5 py-2 font-display text-lg tracking-wide text-primary-foreground"
          >
            Contacter la FTF →
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
