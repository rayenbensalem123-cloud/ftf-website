import { useEffect, useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Check, Crown, Plus, RotateCcw, Share2, Shuffle, Trophy, X } from "lucide-react";
import { toast } from "sonner";
import { CLUBS, clubByShort } from "@/data/ftf";
import {
  BUDGET,
  FORMATIONS,
  MAX_PER_CLUB,
  PLAYERS,
  POS_LABEL,
  SQUAD_SIZE,
  playerById,
  type FantasyPlayer,
  type FormationKey,
  type Pos,
} from "@/data/fantasy";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { Toaster } from "@/components/ui/sonner";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

export const Route = createFileRoute("/fantasy-coach")({
  head: () => ({
    meta: [
      { title: "Fantasy Coach — FTF" },
      {
        name: "description",
        content:
          "Composez votre XI de Ligue 1 avec 100 M de budget, choisissez votre capitaine et défiez la communauté.",
      },
    ],
  }),
  component: FantasyCoach,
});

const STORAGE_KEY = "ftf-fantasy-v1";
type Slot = { pos: Pos; key: string };
type SavedState = {
  formation: FormationKey;
  picks: Record<string, string>;
  captain: string | null;
};

function buildSlots(f: FormationKey): Slot[] {
  const shape = FORMATIONS[f];
  const order: [Pos, number][] = [
    ["FWD", shape.FWD],
    ["MID", shape.MID],
    ["DEF", shape.DEF],
    ["GK", 1],
  ];
  return order.flatMap(([pos, n]) =>
    Array.from({ length: n }, (_, i) => ({ pos, key: `${pos}-${i}` })),
  );
}

function FantasyCoach() {
  const [formation, setFormation] = useState<FormationKey>("4-3-3");
  const [picks, setPicks] = useState<Record<string, string>>({});
  const [captain, setCaptain] = useState<string | null>(null);
  const [active, setActive] = useState<Slot | null>(null);
  const [ready, setReady] = useState(false);

  // Restore after hydration (keeps SSR markup stable).
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const s = JSON.parse(raw) as SavedState;
        if (s.formation in FORMATIONS) {
          setFormation(s.formation);
          setPicks(s.picks ?? {});
          setCaptain(s.captain ?? null);
        }
      }
    } catch {
      /* ignore corrupted storage */
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ formation, picks, captain }));
    } catch {
      /* storage unavailable */
    }
  }, [ready, formation, picks, captain]);

  const slots = useMemo(() => buildSlots(formation), [formation]);
  const squad = useMemo(
    () =>
      slots.map((s) => {
        const id = picks[s.key];
        return { slot: s, player: id ? playerById(id) : undefined };
      }),
    [slots, picks],
  );
  const chosen = squad.flatMap((s) => (s.player ? [s.player] : []));
  const spent = chosen.reduce((a, c) => a + c.price, 0);
  const left = BUDGET - spent;
  const formPts = chosen.reduce((a, c) => a + c.form * (c.id === captain ? 2 : 1), 0);
  const clubCount = (club: string, ignoreId?: string) =>
    chosen.filter((c) => c.club === club && c.id !== ignoreId).length;
  const complete = chosen.length === SQUAD_SIZE;

  const changeFormation = (f: FormationKey) => {
    // Keep players whose slot still exists in the new shape.
    const valid = new Set(buildSlots(f).map((s) => s.key));
    setPicks((prev) => Object.fromEntries(Object.entries(prev).filter(([k]) => valid.has(k))));
    setFormation(f);
  };

  const select = (pl: FantasyPlayer) => {
    if (!active) return;
    const current = picks[active.key] ? playerById(picks[active.key]!) : undefined;
    if (spent - (current?.price ?? 0) + pl.price > BUDGET + 1e-9) {
      toast.error("Budget insuffisant", { description: "Choisissez un joueur moins cher." });
      return;
    }
    if (clubCount(pl.club, current?.id) >= MAX_PER_CLUB) {
      toast.error(`Maximum ${MAX_PER_CLUB} joueurs par club`);
      return;
    }
    setPicks((p) => ({ ...p, [active.key]: pl.id }));
    if (current && current.id === captain) setCaptain(null);
    setActive(null);
  };

  const remove = (key: string) => {
    const id = picks[key];
    setPicks((p) => {
      const n = { ...p };
      delete n[key];
      return n;
    });
    if (id === captain) setCaptain(null);
  };

  const autoPick = () => {
    const next: Record<string, string> = {};
    const used = new Set<string>();
    const counts: Record<string, number> = {};
    let total = 0;
    const need = [...slots].sort((a, b) => (a.pos === "GK" ? 1 : 0) - (b.pos === "GK" ? 1 : 0));
    // Fill cheapest-sensible: iterate slots, take best form that fits budget for remaining slots.
    need.forEach((s, i) => {
      const remainingSlots = need.length - i - 1;
      const pool = PLAYERS.filter(
        (x) => x.pos === s.pos && !used.has(x.id) && (counts[x.club] ?? 0) < MAX_PER_CLUB,
      ).sort((a, b) => b.form - a.form + (Math.random() - 0.5));
      const pick =
        pool.find((x) => total + x.price + remainingSlots * 4.5 <= BUDGET) ?? pool.at(-1);
      if (pick) {
        next[s.key] = pick.id;
        used.add(pick.id);
        counts[pick.club] = (counts[pick.club] ?? 0) + 1;
        total += pick.price;
      }
    });
    setPicks(next);
    setCaptain(null);
    toast.success("Équipe générée", { description: "Ajustez-la à votre goût." });
  };

  const reset = () => {
    setPicks({});
    setCaptain(null);
  };

  const share = async () => {
    const text = `Mon XI Fantasy Coach FTF (${formation}) :\n${chosen
      .map((c) => `${c.id === captain ? "© " : ""}${c.name}`)
      .join(", ")}`;
    try {
      if (navigator.share) await navigator.share({ title: "Fantasy Coach FTF", text });
      else {
        await navigator.clipboard.writeText(text);
        toast.success("Équipe copiée dans le presse-papiers");
      }
    } catch {
      /* user cancelled */
    }
  };

  const rows: Pos[] = ["FWD", "MID", "DEF", "GK"];

  return (
    <div className="min-h-screen font-sans text-foreground">
      <SiteHeader />
      <Toaster position="top-center" />

      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-brand-ink text-white">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_80%_20%,oklch(0.51_0.215_27/0.55),transparent_55%),radial-gradient(circle_at_10%_90%,oklch(0.75_0.13_88/0.18),transparent_45%)]" />
        <div className="mx-auto max-w-7xl px-4 py-12 md:py-16">
          <p className="eyebrow text-brand-gold">Jeu officiel FTF · Saison 2026</p>
          <h1 className="title-page mt-3 max-w-3xl text-4xl text-white md:text-6xl">
            Fantasy Coach
          </h1>
          <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-white/70">
            {BUDGET} M de budget, 11 joueurs, 3 maximum par club. Choisissez un capitaine : ses
            points comptent double.
          </p>
          <div className="mt-8 grid max-w-2xl grid-cols-3 gap-3">
            <Stat label="Budget restant" value={`${left.toFixed(1)} M`} warn={left < 0} />
            <Stat label="Joueurs" value={`${chosen.length}/${SQUAD_SIZE}`} />
            <Stat label="Forme estimée" value={formPts.toFixed(1)} />
          </div>
          <div className="mt-4 h-2 max-w-2xl overflow-hidden rounded-full bg-white/10" aria-hidden>
            <div
              className="h-full rounded-full bg-brand-red transition-all duration-500"
              style={{ width: `${Math.min(100, (spent / BUDGET) * 100)}%` }}
            />
          </div>
        </div>
      </section>

      <main className="mx-auto grid max-w-7xl gap-8 px-4 py-10 lg:grid-cols-[1fr_340px]">
        {/* Pitch */}
        <div>
          <div className="mb-4 flex flex-wrap items-center gap-2">
            {(Object.keys(FORMATIONS) as FormationKey[]).map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => changeFormation(f)}
                data-on={f === formation || undefined}
                className="rounded-full border border-border bg-card px-4 py-2 text-sm font-bold transition hover:border-brand-red data-[on=true]:border-brand-red data-[on=true]:bg-brand-red data-[on=true]:text-white"
              >
                {f}
              </button>
            ))}
            <div className="ml-auto flex gap-2">
              <IconBtn label="Équipe aléatoire" onClick={autoPick}>
                <Shuffle className="h-4 w-4" />
              </IconBtn>
              <IconBtn label="Réinitialiser" onClick={reset}>
                <RotateCcw className="h-4 w-4" />
              </IconBtn>
            </div>
          </div>

          <div className="pitch relative overflow-hidden rounded-3xl border-4 border-card p-3 shadow-2xl sm:p-6">
            <div className="pointer-events-none absolute inset-x-6 top-1/2 h-px bg-white/30" />
            <div className="pointer-events-none absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/30" />
            <div className="relative flex min-h-[34rem] flex-col justify-between gap-3 sm:min-h-[40rem]">
              {rows.map((pos) => (
                <div key={pos} className="flex items-start justify-around gap-1">
                  {squad
                    .filter((s) => s.slot.pos === pos)
                    .map(({ slot, player }) => (
                      <PitchSlot
                        key={slot.key}
                        slot={slot}
                        player={player}
                        isCaptain={player?.id === captain}
                        onPick={() => setActive(slot)}
                        onRemove={() => remove(slot.key)}
                        onCaptain={() =>
                          player && setCaptain(player.id === captain ? null : player.id)
                        }
                      />
                    ))}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Side panel */}
        <aside className="space-y-5">
          <div className="rounded-3xl border border-border bg-card p-5 shadow-sm">
            <h2 className="eyebrow text-brand-red">Mon équipe</h2>
            {complete ? (
              <p className="mt-3 flex items-center gap-2 text-sm font-semibold">
                <Check className="h-4 w-4 text-green-600" /> XI complet. Prêt pour la journée !
              </p>
            ) : (
              <p className="mt-3 text-sm text-muted-foreground">
                Touchez un emplacement sur le terrain pour ajouter un joueur.
              </p>
            )}
            <ul className="mt-4 divide-y divide-border text-sm">
              {squad.map(({ slot, player }) => (
                <li key={slot.key} className="flex items-center justify-between gap-3 py-2">
                  <span className="min-w-0 truncate">
                    <span className="mr-2 inline-block w-9 text-xs font-bold text-muted-foreground">
                      {slot.pos}
                    </span>
                    {player ? player.name : <span className="text-muted-foreground">—</span>}
                  </span>
                  {player && <span className="shrink-0 font-bold">{player.price.toFixed(1)}</span>}
                </li>
              ))}
            </ul>
            <button
              type="button"
              onClick={share}
              disabled={!chosen.length}
              className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-brand-red py-3 text-sm font-bold text-white transition hover:brightness-110 disabled:opacity-40"
            >
              <Share2 className="h-4 w-4" /> Partager mon équipe
            </button>
          </div>

          <div className="rounded-3xl border border-border bg-card p-5">
            <h2 className="eyebrow flex items-center gap-2 text-brand-red">
              <Trophy className="h-4 w-4" /> Règles
            </h2>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li>• Budget de {BUDGET} M pour 11 joueurs.</li>
              <li>• {MAX_PER_CLUB} joueurs maximum du même club.</li>
              <li>• Le capitaine (©) marque des points doubles.</li>
              <li>• Votre équipe est enregistrée sur cet appareil.</li>
            </ul>
            <div className="mt-4 flex flex-wrap gap-3">
              {CLUBS.map((c) => (
                <img
                  key={c.short}
                  src={c.logo}
                  alt={c.name}
                  title={c.name}
                  className="h-8 w-8 object-contain"
                />
              ))}
            </div>
          </div>
        </aside>
      </main>

      <PlayerSheet
        slot={active}
        onClose={() => setActive(null)}
        onSelect={select}
        takenIds={new Set(chosen.map((c) => c.id))}
        currentId={active ? picks[active.key] : undefined}
      />
      <SiteFooter />
    </div>
  );
}

function Stat({ label, value, warn }: { label: string; value: string; warn?: boolean }) {
  return (
    <div className="rounded-2xl border border-white/15 bg-white/5 p-4 backdrop-blur">
      <div
        className={`score text-3xl leading-none md:text-4xl ${warn ? "text-red-400" : "text-white"}`}
      >
        {value}
      </div>
      <div className="mt-1 text-[11px] uppercase tracking-widest text-white/55">{label}</div>
    </div>
  );
}

function IconBtn({
  label,
  onClick,
  children,
}: {
  label: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={label}
      aria-label={label}
      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card transition hover:border-brand-red hover:text-brand-red"
    >
      {children}
    </button>
  );
}

function PitchSlot({
  slot,
  player,
  isCaptain,
  onPick,
  onRemove,
  onCaptain,
}: {
  slot: Slot;
  player: FantasyPlayer | undefined;
  isCaptain: boolean;
  onPick: () => void;
  onRemove: () => void;
  onCaptain: () => void;
}) {
  const club = player ? clubByShort(player.club) : undefined;
  return (
    <div className="group relative flex w-[4.5rem] flex-col items-center text-center sm:w-24">
      <button
        type="button"
        onClick={onPick}
        aria-label={player ? `Changer ${player.name}` : `Ajouter un ${POS_LABEL[slot.pos]}`}
        className="relative grid h-14 w-14 place-items-center rounded-full border-2 border-white/80 bg-white/15 shadow-lg transition hover:scale-110 hover:bg-white/25 sm:h-16 sm:w-16"
      >
        {player && club ? (
          <img src={club.logo} alt="" className="h-9 w-9 object-contain sm:h-10 sm:w-10" />
        ) : (
          <Plus className="h-6 w-6 text-white" />
        )}
        {isCaptain && (
          <span className="absolute -right-1 -top-1 grid h-5 w-5 place-items-center rounded-full bg-brand-gold text-[10px] font-black text-brand-ink">
            C
          </span>
        )}
      </button>
      {player ? (
        <>
          <div className="mt-1 w-full truncate rounded bg-brand-ink/85 px-1 py-0.5 text-[11px] font-bold text-white sm:text-xs">
            {player.name.split(" ").at(-1)}
          </div>
          <div className="text-[10px] font-semibold text-white/90">{player.price.toFixed(1)} M</div>
          <div className="mt-0.5 flex gap-1 opacity-100 sm:opacity-0 sm:transition sm:group-hover:opacity-100 sm:group-focus-within:opacity-100">
            <button
              type="button"
              onClick={onCaptain}
              aria-label="Capitaine"
              className="grid h-6 w-6 place-items-center rounded-full bg-brand-gold text-brand-ink"
            >
              <Crown className="h-3 w-3" />
            </button>
            <button
              type="button"
              onClick={onRemove}
              aria-label="Retirer"
              className="grid h-6 w-6 place-items-center rounded-full bg-white text-brand-ink"
            >
              <X className="h-3 w-3" />
            </button>
          </div>
        </>
      ) : (
        <div className="mt-1 text-[11px] font-bold uppercase tracking-wider text-white/80">
          {slot.pos}
        </div>
      )}
    </div>
  );
}

function PlayerSheet({
  slot,
  onClose,
  onSelect,
  takenIds,
  currentId,
}: {
  slot: Slot | null;
  onClose: () => void;
  onSelect: (p: FantasyPlayer) => void;
  takenIds: Set<string>;
  currentId: string | undefined;
}) {
  const [sort, setSort] = useState<"form" | "price">("form");
  const list = useMemo(() => {
    if (!slot) return [];
    return PLAYERS.filter((p) => p.pos === slot.pos).sort((a, b) =>
      sort === "form" ? b.form - a.form : a.price - b.price,
    );
  }, [slot, sort]);

  return (
    <Sheet open={slot !== null} onOpenChange={(o) => !o && onClose()}>
      <SheetContent side="right" className="w-full overflow-y-auto sm:max-w-md">
        <SheetHeader>
          <SheetTitle className="font-display">{slot ? POS_LABEL[slot.pos] : ""}</SheetTitle>
          <SheetDescription>Touchez un joueur pour l'ajouter à votre XI.</SheetDescription>
        </SheetHeader>
        <div className="mt-4 flex gap-2">
          {(["form", "price"] as const).map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setSort(s)}
              data-on={sort === s || undefined}
              className="rounded-full border border-border px-3 py-1.5 text-xs font-bold data-[on=true]:border-brand-red data-[on=true]:bg-brand-red data-[on=true]:text-white"
            >
              {s === "form" ? "Meilleure forme" : "Prix croissant"}
            </button>
          ))}
        </div>
        <ul className="mt-4 space-y-2">
          {list.map((p) => {
            const club = clubByShort(p.club);
            const taken = takenIds.has(p.id) && p.id !== currentId;
            return (
              <li key={p.id}>
                <button
                  type="button"
                  disabled={taken}
                  onClick={() => onSelect(p)}
                  className="flex w-full items-center gap-3 rounded-2xl border border-border bg-card p-3 text-left transition hover:border-brand-red disabled:cursor-not-allowed disabled:opacity-40"
                >
                  {club && <img src={club.logo} alt="" className="h-9 w-9 object-contain" />}
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-bold">{p.name}</span>
                    <span className="text-xs text-muted-foreground">
                      {club?.name} · forme {p.form.toFixed(1)}
                    </span>
                  </span>
                  <span className="score text-2xl">{p.price.toFixed(1)}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </SheetContent>
    </Sheet>
  );
}
