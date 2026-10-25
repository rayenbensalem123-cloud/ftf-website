import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { NATIONAL_FIXTURES } from "@/data/ftf";
import { parseKickoff } from "@/lib/kickoff";

/** Countdown to the next dated senior-team match, then the next dated match of any selection. */
export function NextMatch() {
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => {
    setNow(Date.now());
    const i = setInterval(() => setNow(Date.now()), 30000);
    return () => clearInterval(i);
  }, []);

  const upcoming = NATIONAL_FIXTURES.map((f) => ({ f, at: parseKickoff(f.date, f.time) }))
    .filter((x) => x.at && (now === null || x.at.getTime() > now))
    .sort((a, b) => a.at!.getTime() - b.at!.getTime());
  const next = upcoming.find((x) => (x.f.squad ?? "a") === "a") ?? upcoming[0];
  if (!next) return null;

  const diff = now === null ? 0 : Math.max(0, next.at!.getTime() - now);
  const parts: [number, string][] = [
    [Math.floor(diff / 86400000), "jours"],
    [Math.floor(diff / 3600000) % 24, "heures"],
    [Math.floor(diff / 60000) % 60, "min"],
  ];

  return (
    <Link
      to="/match/$id"
      params={{ id: next.f.id }}
      className="mt-10 block max-w-xl rounded-2xl border border-white/15 bg-white/5 p-5 backdrop-blur transition hover:bg-white/10"
    >
      <p className="eyebrow text-brand-gold">Prochain match</p>
      <p className="mt-2 text-lg font-bold text-white">
        {next.f.team} <span className="text-white/50">vs</span> {next.f.opponent}
      </p>
      <p className="mt-1 text-sm text-white/65">
        {next.f.date} · {next.f.time} · {next.f.venue}
      </p>
      <div className="mt-4 flex gap-5" aria-label="Compte à rebours">
        {parts.map(([n, l]) => (
          <div key={l}>
            <div className="score text-4xl leading-none text-white">
              {now === null ? "–" : String(n).padStart(2, "0")}
            </div>
            <div className="mt-1 text-[11px] uppercase tracking-widest text-white/55">{l}</div>
          </div>
        ))}
      </div>
    </Link>
  );
}
