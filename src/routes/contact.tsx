import { Link, createFileRoute } from "@tanstack/react-router";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const Route = createFileRoute("/contact")({
  component: Contact,
});

const PLAN = [
  { to: "/", label: "Accueil" },
  { to: "/competition", label: "Compétition" },
  { to: "/classement", label: "Classement" },
  { to: "/clubs", label: "Clubs" },
  { to: "/equipe-nationale", label: "Équipe Nationale" },
  { to: "/actualites", label: "Actualités" },
  { to: "/fantasy-coach", label: "Fantasy Coach" },
  { to: "/documents", label: "Documents" },
  { to: "/billetterie", label: "Billetterie" },
] as const;

function Contact() {
  return (
    <div className="min-h-screen font-sans text-foreground">
      <SiteHeader />
      <main className="mx-auto max-w-4xl px-4 py-10">
        <p className="text-sm font-bold uppercase tracking-widest text-brand-gold">FTF</p>
        <h1 className="font-display text-5xl text-white">Contact & plan du site</h1>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div className="rounded-3xl border border-border bg-card p-6">
            <h2 className="font-display text-3xl">Fédération</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Cité Olympique, Radès · Tunis
              <br />
              contact@ftf.org.tn · +216 71 000 000
            </p>
          </div>
          <nav className="rounded-3xl border border-border bg-card p-6" aria-label="Plan du site">
            <h2 className="font-display text-3xl">Plan du site</h2>
            <ul className="mt-3 space-y-2 font-bold">
              {PLAN.map((p) => (
                <li key={p.label}>
                  <Link to={p.to} className="hover:text-brand-red">
                    {p.label} →
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
