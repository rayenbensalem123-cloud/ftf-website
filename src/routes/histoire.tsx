import { Link, createFileRoute } from "@tanstack/react-router";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { PageHead } from "@/components/page-head";

export const Route = createFileRoute("/histoire")({
  head: () => ({ meta: [{ title: "Histoire — FTF" }] }),
  component: Histoire,
});

const MILESTONES = [
  { year: "1957", text: "Création de la Fédération Tunisienne de Football." },
  {
    year: "1978",
    text: "Première Coupe du Monde. La Tunisie bat le Mexique 3–1 : première victoire d'une équipe africaine en phase finale.",
  },
  { year: "1998", text: "Retour en Coupe du Monde, en France." },
  { year: "2004", text: "Champions d'Afrique, à domicile : premier titre continental des Aigles." },
  { year: "2022", text: "Coupe du Monde au Qatar : victoire 1–0 face à la France." },
  { year: "2026", text: "Septième participation à la Coupe du Monde." },
];

function Histoire() {
  return (
    <div className="min-h-screen font-sans text-foreground">
      <SiteHeader />
      <main className="mx-auto max-w-4xl px-4 py-10">
        <PageHead
          eyebrow="Fédération"
          title="Histoire du football tunisien"
          lead="Les grandes dates des Aigles de Carthage."
        />
        <ol className="mt-6 divide-y divide-border border-y border-border">
          {MILESTONES.map((m) => (
            <li key={m.year} className="flex gap-5 py-4">
              <span className="score w-16 shrink-0 text-xl text-brand-red">{m.year}</span>
              <span className="text-sm leading-relaxed text-foreground/85">{m.text}</span>
            </li>
          ))}
        </ol>
        <Link
          to="/equipe-nationale"
          className="mt-8 inline-block text-sm font-bold text-brand-red hover:underline"
        >
          Les équipes nationales →
        </Link>
      </main>
      <SiteFooter />
    </div>
  );
}
