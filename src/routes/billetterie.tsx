import { useState } from "react";
import { Link, createFileRoute } from "@tanstack/react-router";
import { NATIONAL_FIXTURES } from "@/data/ftf";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { PageHead } from "@/components/page-head";

export const Route = createFileRoute("/billetterie")({
  head: () => ({ meta: [{ title: "Billetterie — FTF" }] }),
  component: Billetterie,
});

const BOOKABLE = NATIONAL_FIXTURES.filter((f) => f.ticketsOpen);

function Billetterie() {
  const [matchId, setMatchId] = useState(BOOKABLE[0]?.id ?? "");
  const [qty, setQty] = useState(2);
  const [done, setDone] = useState(false);
  const match = BOOKABLE.find((f) => f.id === matchId) ?? BOOKABLE[0];

  return (
    <div className="min-h-screen font-sans text-foreground">
      <SiteHeader />
      <main className="mx-auto max-w-3xl px-4 py-10">
        <PageHead
          eyebrow="Équipes nationales"
          title="Billetterie"
          lead="Réservez vos places pour les matchs des Aigles de Carthage et des sélections nationales."
        />

        {!match ? (
          <div className="mt-6 rounded-3xl border border-dashed border-border bg-card px-6 py-12 text-center">
            <p className="mx-auto max-w-md text-[15px] text-muted-foreground">
              Aucune vente n'est ouverte pour le moment. Les billets seront disponibles ici dès
              l'ouverture de la billetterie d'un prochain match.
            </p>
            <Link
              to="/actualites"
              className="mt-4 inline-block text-sm font-bold text-brand-red hover:underline"
            >
              Suivre les actualités →
            </Link>
          </div>
        ) : (
          <div className="mt-6 rounded-3xl border border-border bg-card p-6">
            <label className="block text-sm font-bold">
              Match
              <select
                value={matchId}
                onChange={(e) => {
                  setMatchId(e.target.value);
                  setDone(false);
                }}
                className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 font-medium"
              >
                {BOOKABLE.map((f) => (
                  <option key={f.id} value={f.id}>
                    {f.team} vs {f.opponent} — {f.date} {f.time}
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
                className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 font-medium"
              />
            </label>

            <button
              onClick={() => setDone(true)}
              className="mt-6 w-full rounded-full bg-brand-red py-3 text-sm font-bold text-white transition hover:brightness-110"
            >
              Réserver →
            </button>

            {done && (
              <p className="mt-4 rounded-2xl bg-brand-paper p-4 text-sm font-bold">
                Réservation enregistrée : {qty} billet(s) — {match.team} vs {match.opponent}.
                Présentez ce code au guichet : FTF-{match.id.toUpperCase()}-{qty}.
              </p>
            )}
          </div>
        )}

        <Link
          to="/competition"
          className="mt-6 inline-block text-sm font-bold text-brand-red hover:underline"
        >
          ← Calendrier & résultats
        </Link>
      </main>
      <SiteFooter />
    </div>
  );
}
