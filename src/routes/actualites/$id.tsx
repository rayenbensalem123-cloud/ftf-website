import { Link, createFileRoute } from "@tanstack/react-router";
import { articleById } from "@/data/ftf";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const Route = createFileRoute("/actualites/$id")({
  component: Article,
});

function Article() {
  const { id } = Route.useParams();
  const article = articleById(id);

  if (!article) {
    return (
      <div className="min-h-screen font-sans text-foreground">
        <SiteHeader />
        <main className="mx-auto max-w-3xl px-4 py-20 text-center">
          <h1 className="font-display text-5xl">Article introuvable</h1>
          <Link to="/actualites" className="mt-6 inline-block font-bold text-brand-red">
            ← Toutes les actualités
          </Link>
        </main>
        <SiteFooter />
      </div>
    );
  }

  return (
    <div className="min-h-screen font-sans text-foreground">
      <SiteHeader />
      <main className="mx-auto max-w-3xl px-4 py-10">
        <Link to="/actualites" className="text-sm font-bold text-brand-red">
          ← Toutes les actualités
        </Link>
        <p className="mt-4 text-sm font-bold uppercase tracking-widest text-brand-red">{article.category}</p>
        <h1 className="mt-2 font-display text-5xl leading-none">{article.title}</h1>
        <p className="mt-3 text-muted-foreground">{article.excerpt}</p>
        {article.image && (
          <img src={article.image} alt="" className="mt-6 h-80 w-full rounded-3xl object-cover" />
        )}
        <div className="mt-6 space-y-4 text-lg leading-relaxed">
          {article.body.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
        <div className="mt-8 flex gap-3">
          <Link
            to="/competition"
            className="rounded-full bg-brand-red px-5 py-2 font-display text-lg tracking-wide text-primary-foreground"
          >
            Voir les matchs →
          </Link>
          <Link to="/billetterie" className="rounded-full border border-border px-5 py-2 font-display text-lg">
            Billetterie →
          </Link>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
