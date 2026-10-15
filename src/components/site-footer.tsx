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
  { to: "/documents", label: "Documents officiels" },
  { to: "/contact", label: "Contact" },
];

export function SiteFooter() {
  return (
    <>
      <div className="border-y border-border bg-card py-9">
        <p className="eyebrow mb-6 text-center text-muted-foreground">Partenaires officiels</p>
        <div className="mx-auto grid max-w-7xl gap-7 px-4 text-center md:grid-cols-3">
          {SPONSOR_TIERS.map((tier) => (
            <div key={tier.label}>
              <p className="eyebrow text-brand-red">{tier.label}</p>
              <p className="mt-2.5 font-display text-xl font-bold tracking-tight text-foreground/70">
                {tier.names.join(" · ")}
              </p>
            </div>
          ))}
        </div>
      </div>

      <footer className="bg-brand-ink text-white/70">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 md:grid-cols-[1.5fr_1fr_1fr_1.2fr]">
          <div>
            <div className="flex items-center gap-3">
              <img src={FTF_LOGO} alt="" className="h-12 w-12 rounded-full bg-white/95 p-0.5" />
              <p className="font-display text-lg font-extrabold leading-tight tracking-tight text-white">
                FÉDÉRATION TUNISIENNE
                <br />
                DE FOOTBALL
              </p>
            </div>
            <p className="mt-3 text-[13px] font-semibold text-white/60" lang="ar" dir="rtl">
              الجامعة التونسية لكرة القدم
            </p>
            <p className="mt-4 max-w-xs text-sm leading-relaxed">
              Cité Olympique, Radès · Tunis. La maison du football tunisien depuis 1957 — clubs,
              compétitions et Aigles de Carthage.
            </p>
          </div>

          <nav aria-label="Compétitions">
            <p className="eyebrow text-brand-gold">Compétitions</p>
            <ul className="mt-4 space-y-2.5 text-sm font-medium">
              {COMPETITIONS.map((l) => (
                <li key={l.label}>
                  <Link to={l.to} className="transition hover:text-white">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Fédération">
            <p className="eyebrow text-brand-gold">Fédération</p>
            <ul className="mt-4 space-y-2.5 text-sm font-medium">
              {FEDERATION.map((l) => (
                <li key={l.label}>
                  <Link to={l.to} className="transition hover:text-white">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="eyebrow text-brand-gold">Billetterie</p>
            <p className="mt-4 text-sm leading-relaxed">
              Derby EST — CA · Dimanche 17:00 · Stade Hammadi Agrebi. Guichets fermés annoncés.
            </p>
            <Link
              to="/billetterie"
              className="mt-4 inline-flex rounded-full bg-brand-red px-5 py-2.5 text-[13px] font-bold text-white transition hover:brightness-110"
            >
              Réserver mes places
            </Link>
          </div>
        </div>

        <div className="border-t border-white/10">
          <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-4 text-xs">
            <p>© 2026 Fédération Tunisienne de Football. Tous droits réservés.</p>
            <p className="flex gap-5">
              <Link to="/documents" className="hover:text-white">
                Transparence
              </Link>
              <Link to="/actualites" className="hover:text-white">
                Presse
              </Link>
              <Link to="/contact" className="hover:text-white">
                Contact
              </Link>
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
