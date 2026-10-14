import { useState } from "react";
import { Link, createFileRoute } from "@tanstack/react-router";
import { FIXTURES } from "@/data/ftf";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const Route = createFileRoute("/billetterie")({
  component: Billetterie,
});

function Billetterie() {
  const [matchId, setMatchId] = useState(FIXTURES[0]!.id);
  const [qty, setQty] = useState(2);
  const [done, setDone] = useState(false);
  const match = FIXTURES.find((f) => f.id === matchId) ?? FIXTURES[0]!;

  return (
    <div className="min-h-screen font-sans text-foreground">
      <SiteHeader />
      <main className="mx-auto max-w-3xl px-4 py-10">
        <p className="text-sm font-bold uppercase tracking-widest text-brand-gold">Stade Hammadi Agrebi</p>
        <h1 className="font-display text-5xl text-white">Billetterie</h1>
        <div className="mt-6 rounded-3xl border border-border bg-card p-6">
          <label className="block text-sm font-bold">
            Match
            <select
              value={matchId}
              onChange={(e) => {
                setMatchId(e.target.value);
                setDone(false);
              }}
              className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3"
            >
              {FIXTURES.map((f) => (
                <option key={f.id} value={f.id}>
                  {f.home.short} vs {f.away.short} — {f.date} {f.time}
                </option>
              ))}
            </select>
          </label>
          <p className="mt-2 text-sm text-muted-foreground">{match.venue}</p>
          <label className="mt-4 block text-sm font-bold">
            Billets (max 6)
            <input
              type="number"
              min={1}
              max={6}
              value={qty}
              onChange={(e) => {
                setQty(Number(e.target.value));
                setDone(false);
              }}
              className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3"
            />
          </label>
          <button
            onClick={() => setDone(true)}
            className="mt-6 w-full rounded-full bg-brand-red py-3 font-display text-xl tracking-wide text-primary-foreground hover:opacity-90"
          >
            Réserver →
          </button>
          {done && (
            <p className="mt-4 rounded-2xl bg-muted p-4 text-sm font-bold">
              Réservation enregistrée : {qty} billet(s) — {match.home.short} vs {match.away.short}. Présentez
              ce code au guichet : FTF-{match.id.toUpperCase()}-{qty}.
            </p>
          )}
        </div>
        <Link to="/competition" className="mt-6 inline-block font-bold text-brand-red">
          ← Retour compétition
        </Link>
      </main>
      <SiteFooter />
    </div>
  );
}
