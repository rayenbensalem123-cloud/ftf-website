import { useState } from "react";
import { Link, createFileRoute } from "@tanstack/react-router";
import { ARTICLES } from "@/data/ftf";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { PageHead } from "@/components/page-head";

export const Route = createFileRoute("/actualites/")({
  component: Actualites,
});

function Actualites() {
  const cats = ["Tout", ...Array.from(new Set(ARTICLES.map((a) => a.category)))];
  const [cat, setCat] = useState("Tout");
  const list = cat === "Tout" ? ARTICLES : ARTICLES.filter((a) => a.category === cat);

  return (
    <div className="min-h-screen font-sans text-foreground">
      <SiteHeader />
      <main className="mx-auto max-w-7xl px-4 py-10">
        <PageHead
          eyebrow="FTF Média"
          title="Actualités"
          lead="Communiqués officiels, sélections et vie des clubs — toute l'actualité du football tunisien."
        />

        <div className="mt-5 flex flex-wrap gap-2">
          {cats.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`shrink-0 rounded-full border px-4 py-1.5 text-xs font-bold uppercase tracking-wider transition ${
                cat === c
                  ? "border-brand-red bg-brand-red text-white"
                  : "border-border bg-card text-foreground/70 hover:border-brand-red hover:text-brand-red"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {list.length === 0 ? (
          <p className="mt-8 text-muted-foreground">Aucun article dans cette catégorie.</p>
        ) : (
          <div className="mt-6 grid gap-5 md:grid-cols-2">
            {list.map((a) => (
              <article
                key={a.id}
                className="group overflow-hidden rounded-3xl border border-border bg-card transition hover:border-brand-red hover:shadow-xl"
              >
                {a.image && (
                  <img
                    src={a.image}
                    alt=""
                    className="h-48 w-full object-cover transition duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                )}
                <div className="p-6">
                  <p className="eyebrow text-brand-red">{a.category}</p>
                  <h2 className="title-section mt-2">
                    <Link to="/actualites/$id" params={{ id: a.id }} className="hover:text-brand-red">
                      {a.title}
                    </Link>
                  </h2>
                  <p className="mt-2 text-sm text-muted-foreground">{a.excerpt}</p>
                  <Link
                    to="/actualites/$id"
                    params={{ id: a.id }}
                    className="mt-4 inline-block text-sm font-bold text-brand-red hover:underline"
                  >
                    Lire l'article →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>
      <SiteFooter />
    </div>
  );
}
