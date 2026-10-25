import { useState } from "react";
import { Link, createFileRoute } from "@tanstack/react-router";
import { DOCS } from "@/data/ftf";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { PageHead } from "@/components/page-head";

export const Route = createFileRoute("/documents")({
  head: () => ({ meta: [{ title: "Documents officiels — FTF" }] }),
  component: Documents,
});

function Documents() {
  const cats = ["Tout", ...Array.from(new Set(DOCS.map((d) => d.cat)))];
  const [cat, setCat] = useState("Tout");
  const list = cat === "Tout" ? DOCS : DOCS.filter((d) => d.cat === cat);
  return (
    <div className="min-h-screen font-sans text-foreground">
      <SiteHeader />
      <main className="mx-auto max-w-4xl px-4 py-10">
        <PageHead
          eyebrow="Transparence FTF"
          title="Documents officiels"
          lead="Communiqués, règlements, arbitrage et appels d'offres — publiés conformément aux standards des fédérations."
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

        <div className="mt-6 divide-y divide-border overflow-hidden rounded-3xl border border-border bg-card">
          {list.map((d) => (
            <div
              key={d.id}
              className="flex flex-wrap items-center justify-between gap-3 p-5 transition hover:bg-brand-paper"
            >
              <div className="min-w-0">
                <p className="eyebrow text-brand-red">{d.cat}</p>
                <h2 className="title-card mt-1.5">{d.title}</h2>
                <p className="mt-1 text-xs text-muted-foreground">Publié le {d.date}</p>
              </div>
              <span className="rounded-full bg-brand-paper px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-muted-foreground">
                PDF
              </span>
            </div>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            to="/contact"
            className="rounded-full bg-brand-red px-5 py-2.5 text-sm font-bold text-white transition hover:brightness-110"
          >
            Contacter la FTF →
          </Link>
          <Link
            to="/"
            className="rounded-full border border-border bg-card px-5 py-2.5 text-sm font-bold transition hover:border-brand-red hover:text-brand-red"
          >
            ← Accueil
          </Link>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
