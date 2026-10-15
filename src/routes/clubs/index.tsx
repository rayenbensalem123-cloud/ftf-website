import { useState } from "react";
import { Link, createFileRoute } from "@tanstack/react-router";
import { CLUBS, REGIONS } from "@/data/ftf";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const Route = createFileRoute("/clubs/")({
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
        <p className="text-sm font-bold uppercase tracking-widest text-brand-gold">Saison 2026</p>
        <h1 className="font-display text-5xl text-white">Les Clubs de Ligue 1</h1>
        <div className="mt-4 flex flex-wrap gap-2">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setRegion(f)}
              className={`shrink-0 rounded-full border px-4 py-1.5 text-xs font-black uppercase tracking-wider transition ${
                region === f
                  ? "border-brand-red bg-brand-red text-primary-foreground"
                  : "border-white/30 bg-white/10 text-white backdrop-blur-sm hover:border-white"
              }`}
            >
              {f === "Tout" ? "Toutes régions" : `Ligue ${f}`}
            </button>
          ))}
        </div>
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
              <h2 className="mt-3 font-display text-2xl leading-none">{club.name}</h2>
              <p className="text-xs uppercase tracking-widest text-muted-foreground">
                {club.city} · {club.year}
              </p>
            </Link>
          ))}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
