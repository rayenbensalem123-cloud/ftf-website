import { useState } from "react";
import { Link, createFileRoute } from "@tanstack/react-router";
import { CLUBS, REGIONS } from "@/data/ftf";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { PageHead } from "@/components/page-head";

export const Route = createFileRoute("/clubs/")({
  head: () => ({ meta: [{ title: "Clubs de Ligue 1 — FTF" }] }),
  component: Clubs,
});

const FILTERS = ["Tout", "Tunis", "Sahel", "Nord", "Sud"];

function Clubs() {
  const [region, setRegion] = useState("Tout");
  const list = region === "Tout" ? CLUBS : CLUBS.filter((c) => REGIONS[c.short] === region);

  return (
    <div className="min-h-screen font-sans text-foreground">
      <SiteHeader />
      <main className="mx-auto max-w-7xl px-4 py-10">
        <PageHead
          eyebrow="Saison 2026"
          title="Les Clubs de Ligue 1"
          lead="Fiches, effectifs et calendriers des clubs de l'élite tunisienne."
        />

        <div className="mt-5 flex flex-wrap gap-2">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setRegion(f)}
              className={`shrink-0 rounded-full border px-4 py-1.5 text-xs font-bold uppercase tracking-wider transition ${
                region === f
                  ? "border-brand-red bg-brand-red text-white"
                  : "border-border bg-card text-foreground/70 hover:border-brand-red hover:text-brand-red"
              }`}
            >
              {f === "Tout" ? "Toutes régions" : `Région ${f}`}
            </button>
          ))}
        </div>

        {list.length === 0 ? (
          <p className="mt-8 text-muted-foreground">Aucun club dans cette région pour le moment.</p>
        ) : (
          <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
            {list.map((club) => (
              <Link
                key={club.short}
                to="/clubs/$short"
                params={{ short: club.short.toLowerCase() }}
                className="group rounded-3xl border border-border bg-card p-5 text-center transition hover:-translate-y-1 hover:border-brand-red hover:shadow-xl"
              >
                <img
                  src={club.logo}
                  alt={club.name}
                  className="mx-auto h-20 w-20 object-contain transition group-hover:scale-110"
                />
                <h2 className="title-card mt-3">{club.name}</h2>
                <p className="mt-1 text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                  {club.city} · {club.year}
                </p>
              </Link>
            ))}
          </div>
        )}
      </main>
      <SiteFooter />
    </div>
  );
}
