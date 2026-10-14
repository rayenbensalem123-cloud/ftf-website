import { Link } from "@tanstack/react-router";
import { CLUBS, FIXTURES, FTF_LOGO, RESULTS } from "@/data/ftf";

const BAR = [
  { to: "/", label: "Accueil" },
  { to: "/competition", label: "Compétition" },
  { to: "/classement", label: "Classement" },
  { to: "/clubs", label: "Clubs" },
  { to: "/equipe-nationale", label: "Équipe Nationale" },
  { to: "/actualites", label: "Actualités" },
  { to: "/fantasy-coach", label: "Fantasy Coach" },
  { to: "/documents", label: "Documents" },
  { to: "/contact", label: "Contact" },
];

function TickerItems() {
  return (
    <>
      {FIXTURES.map((f) => (
        <span key={f.id} className="mx-6 inline-flex items-center gap-2">
          <img src={f.home.logo} alt="" className="h-4 w-4 object-contain" />
          {f.home.short} vs {f.away.short}
          <img src={f.away.logo} alt="" className="h-4 w-4 object-contain" />
          <span className="text-primary-foreground/50">· {f.date} {f.time}</span>
        </span>
      ))}
      {RESULTS.map((r) => (
        <span key={r.id} className="mx-6 inline-flex items-center gap-2">
          {r.home.short} {r.hs}—{r.as} {r.away.short}
          <span className="rounded bg-brand-red px-1.5 text-[10px] font-black">FT</span>
        </span>
      ))}
    </>
  );
}

export function SiteHeader() {
  return (
    <>
      {/* Live ticker */}
      <div className="overflow-hidden bg-black py-1.5 text-[11px] font-bold tracking-wide text-primary-foreground">
        <div className="flex w-max animate-[ticker_30s_linear_infinite] whitespace-nowrap">
          <div>
            <TickerItems />
          </div>
          <div aria-hidden>
            <TickerItems />
          </div>
        </div>
      </div>

      {/* Sticky top block: masthead + button bar */}
      <div className="sticky top-0 z-50 border-b-2 border-brand-gold bg-card/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-2.5">
          <Link to="/" className="flex shrink-0 items-center gap-3" aria-label="FTF — Accueil">
            <img
              src={FTF_LOGO}
              alt="Fédération Tunisienne de Football"
              className="h-12 w-12 rounded-full object-contain ring-2 ring-brand-red"
            />
            <span className="leading-none">
              <span className="block font-display text-2xl tracking-wide md:text-3xl">
                FTF <span className="text-brand-red">·</span> TUNISIE
              </span>
              <span className="mt-0.5 hidden text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground sm:block">
                Fédération Tunisienne de Football
              </span>
              <span className="hidden text-[11px] font-bold text-muted-foreground md:block" lang="ar" dir="rtl">
                الجامعة التونسية لكرة القدم
              </span>
            </span>
          </Link>

          <div className="ml-auto flex items-center gap-2">
            <span className="hidden gap-2 text-xs font-black md:flex">
              <span className="text-foreground">FR</span>
              <span className="opacity-40">AR</span>
            </span>
            <Link
              to="/billetterie"
              className="rounded-full bg-brand-red px-4 py-1.5 font-display text-lg tracking-wide text-primary-foreground transition hover:brightness-110 md:px-5 md:py-2 md:text-xl"
            >
              Billetterie
            </Link>
          </div>
        </div>

        {/* Button bar — always visible */}
        <nav className="border-t border-border/70" aria-label="Navigation principale">
          <div className="mx-auto flex max-w-7xl items-center gap-2 overflow-x-auto px-4 py-2">
            {BAR.map((item) => (
              <Link
                key={item.label}
                to={item.to}
                activeOptions={{ exact: item.to === "/" }}
                activeProps={{ "data-active": true }}
                className="nav-pill shrink-0 rounded-full border border-border px-4 py-1.5 text-xs font-black uppercase tracking-wider text-foreground/75 transition hover:border-brand-red hover:text-brand-red md:text-[13px]"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </nav>
      </div>

      {/* Club strip */}
      <div className="border-b border-border bg-background">
        <div className="mx-auto flex max-w-7xl items-center justify-start gap-2 overflow-x-auto px-4 py-2 md:justify-center md:gap-3">
          {CLUBS.map((club) => (
            <Link
              key={club.short}
              to="/clubs/$short"
              params={{ short: club.short.toLowerCase() }}
              title={club.name}
              className="group flex shrink-0 items-center gap-2 rounded-full border border-transparent px-2 py-1 transition hover:border-border hover:bg-muted"
            >
              <img
                src={club.logo}
                alt={club.name}
                className="h-7 w-7 object-contain opacity-80 grayscale transition group-hover:scale-110 group-hover:opacity-100 group-hover:grayscale-0"
              />
              <span className="text-xs font-bold text-muted-foreground group-hover:text-foreground">
                {club.short}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
