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
 * Single main bar: the logo links home ("Accueil" lives in the mobile drawer
 * only). Fantasy Coach is held back until xl so the one-row header fits at 1024.
 */
const DESKTOP_NAV = NAV.filter((item) => item.to !== "/");
const NAV_LG = DESKTOP_NAV.filter((item) => item.to !== "/fantasy-coach");

function TickerItems() {
  return (
    <>
      {RESULTS.map((r) => (
        <span key={r.id} className="mx-4 inline-flex items-center gap-1.5 align-middle">
          <img src={r.home.logo} alt="" className="h-3.5 w-3.5 object-contain" />
          <span className="font-semibold">{r.home.short}</span>
          <span className="score rounded-sm bg-white/10 px-1.5 text-[12px] leading-[1.35] text-brand-gold">
            {r.hs}–{r.as}
          </span>
          <span className="font-semibold">{r.away.short}</span>
          <img src={r.away.logo} alt="" className="h-3.5 w-3.5 object-contain" />
          <span className="text-white/40">Terminé</span>
        </span>
      ))}
      {FIXTURES.map((f) => (
        <span key={f.id} className="mx-4 inline-flex items-center gap-1.5 align-middle">
          <img src={f.home.logo} alt="" className="h-3.5 w-3.5 object-contain" />
          <span className="font-semibold">{f.home.short}</span>
          <span className="text-white/45">vs</span>
          <span className="font-semibold">{f.away.short}</span>
          <img src={f.away.logo} alt="" className="h-3.5 w-3.5 object-contain" />
          <span className="text-brand-gold/90">
            {f.date} · {f.time}
          </span>
        </span>
      ))}
    </>
  );
}

function NavDrop({ item, active }: { item: NavItem; active: boolean }) {
  return (
    <div className="group/nav relative flex h-full items-center">
      <Link
        to={item.to}
        className="nav-item"
        data-active={active || undefined}
        aria-haspopup={item.children ? "true" : undefined}
      >
        {item.label}
        {item.children && (
          <ChevronDown className="h-3 w-3 transition group-hover/nav:rotate-180" aria-hidden />
        )}
      </Link>
      {item.children && (
        <div className="invisible absolute left-0 top-full z-[60] opacity-0 transition duration-150 group-hover/nav:visible group-hover/nav:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
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
      {/* Bar 1 — live scores + utility */}
      <div className="bg-brand-ink text-white">
        <div className="mx-auto flex h-10 max-w-7xl items-center gap-6 px-4">
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

      {/* Bar 2 — main bar: logo + menu + billetterie */}
      <div className="sticky top-0 z-50 border-b border-border bg-card/95 backdrop-blur">
        <div className="mx-auto flex h-[68px] max-w-7xl items-stretch gap-8 px-4">
          <Link
            to="/"
            className="flex shrink-0 items-center gap-3"
            aria-label="FTF · TUNISIE — Fédération Tunisienne de Football"
          >
            <img src={FTF_LOGO} alt="" className="h-10 w-10 object-contain" />
            <span className="leading-none">
              <span className="block font-display text-lg font-extrabold tracking-tight text-brand-ink">
                FTF <span className="text-brand-red">·</span> TUNISIE
              </span>
              <span className="mt-1 hidden text-[10px] font-semibold uppercase tracking-[0.13em] text-muted-foreground xl:block">
                Fédération Tunisienne de Football
              </span>
            </span>
          </Link>

          <nav className="hidden flex-1 items-stretch lg:flex" aria-label="Navigation principale">
            <div className="hidden items-stretch xl:flex">
              {DESKTOP_NAV.map((item) => (
                <NavDrop key={item.label} item={item} active={isActive(item.match)} />
              ))}
            </div>
            <div className="flex items-stretch xl:hidden">
              {NAV_LG.map((item) => (
                <NavDrop key={item.label} item={item} active={isActive(item.match)} />
              ))}
            </div>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              to="/billetterie"
              className="hidden h-10 items-center gap-2 rounded-lg bg-brand-red px-4 text-[11.5px] font-bold uppercase tracking-[0.08em] text-white transition hover:brightness-110 lg:inline-flex"
            >
              Billetterie
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border text-brand-ink lg:hidden"
              aria-expanded={open}
              aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

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
