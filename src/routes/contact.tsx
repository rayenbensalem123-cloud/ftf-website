import { Link, createFileRoute } from "@tanstack/react-router";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { PageHead } from "@/components/page-head";

export const Route = createFileRoute("/contact")({
  head: () => ({ meta: [{ title: "Contact & plan du site — FTF" }] }),
  component: Contact,
});

const PLAN = [
  { to: "/", label: "Accueil" },
  { to: "/equipe-nationale", label: "Équipes nationales" },
  { to: "/competition", label: "Calendrier & résultats" },
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
        <PageHead
          eyebrow="Fédération Tunisienne de Football"
          title="Contact & plan du site"
          lead="Coordonnées officielles et accès rapide à l'ensemble des rubriques du site."
        />

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div className="rounded-3xl border border-border bg-card p-6">
            <p className="eyebrow text-brand-red">Coordonnées</p>
            <h2 className="title-section mt-1.5">Siège de la FTF</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Cité Olympique, Radès · Tunis
            </p>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground" lang="ar" dir="rtl">
              الجامعة التونسية لكرة القدم — المدينة الأولمبية برادس
            </p>
          </div>

          <nav className="rounded-3xl border border-border bg-card p-6" aria-label="Plan du site">
            <p className="eyebrow text-brand-red">Navigation</p>
            <h2 className="title-section mt-1.5">Plan du site</h2>
            <ul className="mt-3 grid grid-cols-1 gap-2 text-sm font-bold sm:grid-cols-2">
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
