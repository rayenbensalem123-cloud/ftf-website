import { Link } from "@tanstack/react-router";
import { FTF_LOGO, SPONSOR_TIERS } from "@/data/ftf";

const COMPETITIONS = [
  { to: "/competition", label: "Ligue 1 Pro" },
  { to: "/competition", label: "Coupe de Tunisie" },
  { to: "/classement", label: "Classement" },
  { to: "/fantasy-coach", label: "Fantasy Coach" },
];

const FEDERATION = [
  { to: "/equipe-nationale", label: "Équipe Nationale" },
  { to: "/clubs", label: "Clubs" },
  { to: "/actualites", label: "Actualités" },
  { to: "/contact", label: "Contact" },
];

export function SiteFooter() {
  return (
    <>
      <div className="border-y border-border bg-card py-8">
        <p className="mb-5 text-center text-xs font-bold uppercase tracking-[0.22em] text-muted-foreground">
          Partenaires officiels
        </p>
        <div className="mx-auto grid max-w-7xl gap-6 px-4 text-center md:grid-cols-3">
          {SPONSOR_TIERS.map((tier) => (
            <div key={tier.label}>
              <p className="text-[11px] font-black uppercase tracking-[0.2em] text-brand-red">{tier.label}</p>
              <p className="mt-2 font-display text-3xl tracking-wider text-muted-foreground">
                {tier.names.join(" · ")}
              </p>
            </div>
          ))}
        </div>
      </div>
      <footer className="bg-brand-deep text-primary-foreground/70">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <img src={FTF_LOGO} alt="FTF" className="h-14 w-14 rounded-full bg-card p-0.5" />
              <p className="font-display text-2xl leading-none text-primary-foreground">
                FÉDÉRATION TUNISIENNE
                <br />
                DE FOOTBALL
              </p>
            </div>
            <p className="mt-4 max-w-xs text-sm">
              Cité Olympique, Radès · Tunis. La maison du football tunisien depuis 1957 — clubs,
              compétitions et Aigles de Carthage.
            </p>
          </div>
          <nav aria-label="Compétitions">
            <p className="font-display text-xl tracking-wide text-brand-gold">COMPÉTITIONS</p>
            <ul className="mt-3 space-y-2 text-sm font-medium">
              {COMPETITIONS.map((l) => (
                <li key={l.label}>
                  <Link to={l.to} className="transition hover:text-primary-foreground">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <nav aria-label="Fédération">
            <p className="font-display text-xl tracking-wide text-brand-gold">FÉDÉRATION</p>
            <ul className="mt-3 space-y-2 text-sm font-medium">
              {FEDERATION.map((l) => (
                <li key={l.label}>
                  <Link to={l.to} className="transition hover:text-primary-foreground">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div>
            <p className="font-display text-xl tracking-wide text-brand-gold">BILLETTERIE</p>
            <p className="mt-3 text-sm">Derby EST — CA · Dim 17:00 · Radès. Guichets fermés annoncés.</p>
            <Link
              to="/billetterie"
              className="mt-4 inline-block rounded-full bg-brand-red px-5 py-2 font-display text-lg tracking-wide text-primary-foreground hover:opacity-90"
            >
              Réserver →
            </Link>
          </div>
        </div>
        <div className="border-t border-primary-foreground/10">
          <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-2 px-4 py-4 text-xs">
            <p>© 2026 Fédération Tunisienne de Football — Concept redesign.</p>
            <p className="flex gap-5">
              <Link to="/contact" className="hover:text-primary-foreground">Contact</Link>
              <Link to="/actualites" className="hover:text-primary-foreground">Presse</Link>
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
