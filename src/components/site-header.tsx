import { useEffect, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { ArrowRight, ChevronDown, Menu, X } from "lucide-react";
import { FIXTURES, FTF_LOGO, RESULTS } from "@/data/ftf";

type NavChild = { to: string; label: string; desc?: string };
type NavItem = { label: string; to: string; match: string[]; children?: NavChild[] };

const NAV: NavItem[] = [
  { label: "Accueil", to: "/", match: ["/"] },
  {
    label: "Compétitions",
    to: "/competition",
    match: ["/competition", "/classement"],
    children: [
      { to: "/competition", label: "Ligue 1 Professionnelle", desc: "Calendrier & résultats" },
      { to: "/classement", label: "Classement", desc: "Saison 2026 · Journée 6" },
      { to: "/competition", label: "Coupe de Tunisie", desc: "Tableau & tirages" },
    ],
  },
  { label: "Clubs", to: "/clubs", match: ["/clubs"] },
  {
    label: "Équipes Nationales",
    to: "/equipe-nationale",
    match: ["/equipe-nationale"],
    children: [
      { to: "/equipe-nationale", label: "Équipe Nationale A", desc: "Les Aigles de Carthage" },
      { to: "/equipe-nationale", label: "U23 · U20 · U17", desc: "Sélections de jeunes" },
      { to: "/equipe-nationale", label: "Féminine & Futsal", desc: "Sélections nationales" },
    ],
  },
  { label: "Actualités", to: "/actualites", match: ["/actualites"] },
  {
    label: "Fédération",
    to: "/documents",
    match: ["/documents", "/contact"],
    children: [
      { to: "/documents", label: "Documents officiels", desc: "Communiqués, règlements, appels d'offres" },
      { to: "/contact", label: "Contact", desc: "Coordonnées & plan du site" },
    ],
  },
  { label: "Fantasy Coach", to: "/fantasy-coach", match: ["/fantasy-coach"] },
];

const UTILITY = [
  { to: "/actualites", label: "Presse" },
  { to: "/documents", label: "Transparence" },
  { to: "/billetterie", label: "Billetterie" },
  { to: "/contact", label: "Contact" },
];

/**
 * Desktop nav drops "Accueil" — the masthead logo already links home, and this
 * keeps the single-row header from overflowing at the lg breakpoint.
 * The mobile drawer still shows the full NAV (where the logo is less discoverable).
 */
const DESKTOP_NAV = NAV.filter((item) => item.to !== "/");

function TickerItems() {
  return (
    <>
      {FIXTURES.map((f) => (
        <span key={f.id} className="mx-5 inline-flex items-center gap-1.5">
          <img src={f.home.logo} alt="" className="h-3.5 w-3.5 object-contain" />
          <span className="font-semibold">{f.home.short}</span>
          <span className="text-white/45">vs</span>
          <span className="font-semibold">{f.away.short}</span>
          <img src={f.away.logo} alt="" className="h-3.5 w-3.5 object-contain" />
          <span className="text-white/45">
            {f.date} · {f.time}
          </span>
        </span>
      ))}
      {RESULTS.map((r) => (
        <span key={r.id} className="mx-5 inline-flex items-center gap-1.5">
          <span className="font-semibold">{r.home.short}</span>
          <span className="score text-[13px] text-brand-gold">
            {r.hs}–{r.as}
          </span>
          <span className="font-semibold">{r.away.short}</span>
          <span className="text-white/45">Terminé</span>
        </span>
      ))}
    </>
  );
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const isActive = (match: string[]) =>
    match.some((m) => (m === "/" ? pathname === "/" : pathname === m || pathname.startsWith(`${m}/`)));

  return (
    <header>
      {/* Bar 1 — utility + live scores */}
      <div className="bg-brand-ink text-white">
        <div className="mx-auto flex h-9 max-w-7xl items-center gap-6 px-4">
          <div className="hidden min-w-0 flex-1 overflow-hidden lg:block">
            <div className="flex w-max animate-[ticker_45s_linear_infinite] whitespace-nowrap text-[11px]">
              <div className="flex">
                <TickerItems />
              </div>
              <div className="flex" aria-hidden>
                <TickerItems />
              </div>
            </div>
          </div>

          <nav className="ml-auto flex items-center gap-4" aria-label="Liens utiles">
            {UTILITY.map((u) => (
              <Link key={u.label} to={u.to} className="utility-link">
                {u.label}
              </Link>
            ))}
            <span className="flex items-center gap-1.5 border-l border-white/20 pl-4 text-[11px] font-bold">
              <span className="text-white">FR</span>
              <span
                className="cursor-not-allowed text-white/60"
                title="Version arabe bientôt disponible"
                aria-disabled="true"
                lang="ar"
              >
                AR
              </span>
            </span>
          </nav>
        </div>
      </div>

      {/* Bar 2 — masthead + primary nav */}
      <div className="sticky top-0 z-50 border-b border-border bg-card/95 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4">
          <Link
            to="/"
            className="flex shrink-0 items-center gap-3"
            aria-label="FTF · TUNISIE — Fédération Tunisienne de Football"
          >
            <img src={FTF_LOGO} alt="" className="h-11 w-11 object-contain" />
            <span className="leading-none">
              <span className="block font-display text-xl font-extrabold tracking-tight text-brand-ink">
                FTF <span className="text-brand-red">·</span> TUNISIE
              </span>
              <span className="mt-1 hidden text-[10.5px] font-semibold uppercase tracking-[0.13em] text-muted-foreground xl:block">
                Fédération Tunisienne de Football
              </span>
            </span>
          </Link>

          <nav className="ml-auto hidden items-center lg:flex" aria-label="Navigation principale">
            {DESKTOP_NAV.map((item) => {
              const active = isActive(item.match);
              return (
                <div key={item.label} className="group relative">
                  <Link
                    to={item.to}
                    className="nav-link"
                    data-active={active || undefined}
                    aria-haspopup={item.children ? "true" : undefined}
                  >
                    {item.label}
                    {item.children && (
                      <ChevronDown className="h-3.5 w-3.5 transition group-hover:rotate-180" aria-hidden />
                    )}
                  </Link>
                  {item.children && (
                    <div className="invisible absolute left-0 top-full z-[60] pt-2 opacity-0 transition duration-150 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                      <div className="mega-panel">
                        {item.children.map((c) => (
                          <Link key={c.label} to={c.to} className="mega-item">
                            {c.label}
                            {c.desc && <small>{c.desc}</small>}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="ml-auto inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border text-brand-ink lg:hidden"
            aria-expanded={open}
            aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <Link
        to="/billetterie"
        className="hidden lg:block bg-brand-red text-white"
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-1.5">
          <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em]">
            <span>Billetterie officielle</span>
            <span className="h-px w-10 bg-white/40" />
          </div>
          <span className="flex items-center gap-1.5 text-xs font-bold">
            Acheter vos billets
            <ArrowRight className="h-3.5 w-3.5" aria-hidden />
          </span>
        </div>
      </Link>

      {/* Mobile drawer */}
      {open && (
        <div className="border-b border-border bg-card shadow-xl lg:hidden">
          <nav className="mx-auto max-w-7xl px-4 py-3" aria-label="Navigation mobile">
            {NAV.map((item) => (
              <div key={item.label} className="border-b border-border/70 last:border-0">
                {item.children ? (
                  <details className="group/d">
                    <summary className="flex cursor-pointer list-none items-center justify-between py-3 text-sm font-bold text-brand-ink">
                      {item.label}
                      <ChevronDown className="h-4 w-4 transition group-open/d:rotate-180" aria-hidden />
                    </summary>
                    <div className="pb-2 pl-3">
                      <Link to={item.to} className="block py-2 text-sm font-semibold text-brand-red">
                        {item.label} — vue d'ensemble
                      </Link>
                      {item.children.map((c) => (
                        <Link key={c.label} to={c.to} className="block py-2 text-sm text-foreground/80">
                          {c.label}
                        </Link>
                      ))}
                    </div>
                  </details>
                ) : (
                  <Link
                    to={item.to}
                    className="block py-3 text-sm font-bold text-brand-ink"
                    data-active={isActive(item.match) || undefined}
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
            <Link
              to="/billetterie"
              className="mt-4 block rounded-full bg-brand-red py-3 text-center text-sm font-bold text-white"
            >
              Billetterie
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
