import { Link, createFileRoute } from "@tanstack/react-router";
import { ARTICLES, articleById } from "@/data/ftf";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const Route = createFileRoute("/actualites/$id")({
  head: ({ params }) => {
    const a = articleById(params.id);
    return { meta: [{ title: a ? `${a.title} — FTF` : "Article — FTF" }] };
  },
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
          <h1 className="title-page">Article introuvable</h1>
          <Link
            to="/actualites"
            className="mt-6 inline-block font-bold text-brand-red hover:underline"
          >
            ← Toutes les actualités
          </Link>
        </main>
        <SiteFooter />
      </div>
    );
  }

  const others = ARTICLES.filter((a) => a.id !== article.id).slice(0, 3);

  return (
    <div className="min-h-screen font-sans text-foreground">
      <SiteHeader />
      <main className="mx-auto max-w-6xl px-4 py-10">
        <Link to="/actualites" className="text-sm font-bold text-brand-red hover:underline">
          ← Toutes les actualités
        </Link>

        <div className="mt-5 grid gap-10 lg:grid-cols-[minmax(0,1fr)_20rem]">
          <article className="min-w-0">
            <p className="eyebrow text-brand-red">{article.category}</p>
            <h1 className="title-page mt-3">{article.title}</h1>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{article.excerpt}</p>

            {article.image && (
              <img
                src={article.image}
                alt=""
                className="mt-6 h-80 w-full rounded-3xl object-cover"
              />
            )}

            <div className="mt-7 space-y-4 text-[17px] leading-relaxed">
              {article.body.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-3 border-t border-border pt-6">
              <Link
                to="/competition"
                className="rounded-full bg-brand-red px-5 py-2.5 text-sm font-bold text-white transition hover:brightness-110"
              >
                Voir les matchs →
              </Link>
              <Link
                to="/billetterie"
                className="rounded-full border border-border bg-card px-5 py-2.5 text-sm font-bold transition hover:border-brand-red hover:text-brand-red"
              >
                Billetterie →
              </Link>
            </div>
          </article>

          <aside className="lg:border-l lg:border-border lg:pl-8">
            <p className="eyebrow text-muted-foreground">À lire aussi</p>
            <div className="mt-4 space-y-5">
              {others.map((a) => (
                <div key={a.id} className="border-b border-border pb-5 last:border-0 last:pb-0">
                  <p className="eyebrow text-brand-red">{a.category}</p>
                  <h2 className="title-card mt-1.5">
                    <Link
                      to="/actualites/$id"
                      params={{ id: a.id }}
                      className="hover:text-brand-red"
                    >
                      {a.title}
                    </Link>
                  </h2>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
