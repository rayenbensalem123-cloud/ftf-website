import { useState } from "react";
import { Link, createFileRoute } from "@tanstack/react-router";
import { ARTICLES } from "@/data/ftf";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

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
        <p className="text-sm font-bold uppercase tracking-widest text-brand-gold">FTF Media</p>
        <h1 className="font-display text-5xl text-white">Actualités</h1>
        <div className="mt-4 flex flex-wrap gap-2">
          {cats.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`shrink-0 rounded-full border px-4 py-1.5 text-xs font-black uppercase tracking-wider transition ${
                cat === c
                  ? "border-brand-red bg-brand-red text-primary-foreground"
                  : "border-white/30 bg-white/10 text-white backdrop-blur-sm hover:border-white"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
        <div className="mt-6 grid gap-5 md:grid-cols-2">
          {list.map((a) => (
            <article key={a.id} className="overflow-hidden rounded-3xl border border-border bg-card">
              {a.image && <img src={a.image} alt="" className="h-48 w-full object-cover" loading="lazy" />}
              <div className="p-6">
                <p className="text-sm font-bold uppercase tracking-widest text-brand-red">{a.category}</p>
                <h2 className="mt-2 font-display text-3xl leading-none">{a.title}</h2>
                <p className="mt-2 text-sm text-muted-foreground">{a.excerpt}</p>
                <Link to="/actualites/$id" params={{ id: a.id }} className="mt-3 inline-block font-bold text-brand-red">
                  Lire l'article →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
