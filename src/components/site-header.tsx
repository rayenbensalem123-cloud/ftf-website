import { useEffect, useState } from "react";
import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { ArrowRight, ChevronDown, Menu, Search, X } from "lucide-react";
import { ARTICLES, DOCS, FTF_LOGO, articleById } from "@/data/ftf";
import { SELECTIONS } from "@/data/selections";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

type NavChild = { to: string; label: string; desc?: string; id?: string };
type NavItem = { label: string; to: string; match: string[]; children?: NavChild[] };

const NAV: NavItem[] = [
  { label: "Accueil", to: "/", match: ["/"] },
  {
    label: "Équipes nationales",
    to: "/equipe-nationale",
    match: ["/equipe-nationale"],
    children: SELECTIONS.map((t) => ({
      to: "/equipe-nationale",
      id: t.id,
      label: t.name,
      desc: t.detail,
    })),
  },
  { label: "Calendrier & résultats", to: "/competition", match: ["/competition"] },
  { label: "Actualités", to: "/actualites", match: ["/actualites"] },
  { label: "Fantasy Coach", to: "/fantasy-coach", match: ["/fantasy-coach"] },
];

const DESKTOP_NAV = NAV.filter((item) => item.to !== "/");

/** Top strip links — the federation's own pages (formerly under "Fédération"). */
const STRIP_LINKS = [
  { to: "/documents", label: "Documents officiels" },
  { to: "/contact", label: "Contact" },
];

const SEARCH_PAGES = [
  { to: "/equipe-nationale", label: "Équipes nationales" },
  { to: "/competition", label: "Calendrier & résultats" },
  { to: "/actualites", label: "Actualités" },
  { to: "/documents", label: "Documents officiels" },
  { to: "/billetterie", label: "Billetterie" },
  { to: "/fantasy-coach", label: "Fantasy Coach" },
  { to: "/contact", label: "Contact" },
];

const FEATURED = articleById("squad-can") ?? ARTICLES[0];

function NavDrop({ item, active }: { item: NavItem; active: boolean }) {
  const wide = (item.children?.length ?? 0) > 3;
  return (
    <div className="group/nav relative flex h-full items-center">
      <Link
        to={item.to}
        className="nav-item h-full"
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
          <div
            className={wide ? "mega-panel grid min-w-[34rem] grid-cols-2 gap-x-2" : "mega-panel"}
          >
            {item.children.map((c) => (
              <Link
                key={c.label}
                to={c.id ? "/equipe-nationale/$id" : c.to}
                {...(c.id ? { params: { id: c.id } } : {})}
                className="mega-item"
              >
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

function SearchDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  const navigate = useNavigate();
  const go = (to: string) => {
    onOpenChange(false);
    void navigate({ to });
  };

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <CommandInput placeholder="Rechercher une actualité, un document, une page…" />
      <CommandList>
        <CommandEmpty>Aucun résultat.</CommandEmpty>
        <CommandGroup heading="Actualités">
          {ARTICLES.map((a) => (
            <CommandItem
              key={a.id}
              value={`${a.title} ${a.category}`}
              onSelect={() => {
                onOpenChange(false);
                void navigate({ to: "/actualites/$id", params: { id: a.id } });
              }}
            >
              {a.title}
            </CommandItem>
          ))}
        </CommandGroup>
        <CommandGroup heading="Documents officiels">
          {DOCS.map((d) => (
            <CommandItem key={d.id} value={`${d.title} ${d.cat}`} onSelect={() => go("/documents")}>
              <span className="min-w-0 flex-1 truncate">{d.title}</span>
              <span className="ml-3 shrink-0 text-xs text-muted-foreground">{d.cat}</span>
            </CommandItem>
          ))}
        </CommandGroup>
        <CommandGroup heading="Pages">
          {SEARCH_PAGES.map((p) => (
            <CommandItem key={p.label} value={p.label} onSelect={() => go(p.to)}>
              {p.label}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearchOpen((v) => !v);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const isActive = (match: string[]) =>
    match.some((m) =>
      m === "/" ? pathname === "/" : pathname === m || pathname.startsWith(`${m}/`),
    );

  return (
    <header>
      {/* Strip — featured story + federation pages + search */}
      <div className="relative z-40 bg-brand-deep text-white">
        <div className="mx-auto flex h-11 max-w-7xl items-center justify-between gap-4 px-4 text-[13px]">
          {FEATURED && (
            <Link
              to="/actualites/$id"
              params={{ id: FEATURED.id }}
              className="flex min-w-0 items-center gap-3 transition hover:text-brand-gold"
            >
              <span className="eyebrow shrink-0 text-brand-gold">À la une</span>
              <span className="truncate">{FEATURED.title}</span>
              <ArrowRight className="hidden h-3.5 w-3.5 shrink-0 sm:block" aria-hidden />
            </Link>
          )}
          <div className="flex shrink-0 items-center gap-1">
            {STRIP_LINKS.map((l) => (
              <Link
                key={l.label}
                to={l.to}
                className="hidden px-3 py-2 font-medium text-white/85 transition hover:text-white md:block"
              >
                {l.label}
              </Link>
            ))}
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              className="inline-flex h-11 w-11 items-center justify-center text-white/90 transition hover:text-white"
              aria-label="Rechercher : actualités, documents, pages"
            >
              <Search className="h-5 w-5" aria-hidden />
            </button>
          </div>
        </div>
      </div>

      {/* Main bar — logo + navigation + billetterie */}
      <div className="sticky top-0 z-50 border-b border-border bg-card/95 backdrop-blur">
        <div className="mx-auto flex h-[72px] max-w-7xl items-stretch gap-4 px-4 lg:h-[88px] lg:gap-8">
          <Link
            to="/"
            className="flex shrink-0 items-center gap-3.5"
            aria-label="Fédération Tunisienne de Football — accueil"
          >
            <img src={FTF_LOGO} alt="" className="h-10 w-10 object-contain lg:h-14 lg:w-14" />
            <span className="font-display text-[13px] font-extrabold uppercase leading-[1.15] tracking-[0.04em] text-brand-ink lg:text-[15px]">
              <span className="block">Fédération Tunisienne</span>
              {' '}
              <span className="block">de Football</span>
            </span>
          </Link>

          <nav
            className="hidden flex-1 items-stretch gap-1 min-[900px]:flex"
            aria-label="Navigation principale"
          >
            {DESKTOP_NAV.map((item) => (
              <NavDrop key={item.label} item={item} active={isActive(item.match)} />
            ))}
          </nav>

          <div className="ml-auto flex items-center gap-3 min-[900px]:ml-0">
            <Link
              to="/billetterie"
              className="hidden h-11 items-center gap-2 rounded-full bg-brand-red px-4 text-[13px] font-semibold text-white transition hover:brightness-110 sm:inline-flex lg:px-6 lg:text-[15px]"
            >
              Billetterie
            </Link>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full text-brand-ink min-[900px]:hidden"
              aria-expanded={open}
              aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
            >
              {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="border-b border-border bg-card shadow-xl min-[900px]:hidden">
          <nav className="mx-auto max-w-7xl px-4 py-3" aria-label="Navigation mobile">
            {NAV.map((item) => (
              <div key={item.label} className="border-b border-border/70 last:border-0">
                {item.children ? (
                  <details className="group/d">
                    <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between font-display text-xl font-extrabold text-brand-ink">
                      {item.label}
                      <ChevronDown
                        className="h-4 w-4 transition group-open/d:rotate-180"
                        aria-hidden
                      />
                    </summary>
                    <div className="pb-2 pl-1">
                      <Link
                        to={item.to}
                        className="block py-2.5 text-sm font-semibold text-brand-red"
                      >
                        {item.label} — vue d'ensemble
                      </Link>
                      {item.children.map((c) => (
                        <Link
                          key={c.label}
                          to={c.id ? "/equipe-nationale/$id" : c.to}
                          {...(c.id ? { params: { id: c.id } } : {})}
                          className="block py-2.5 text-[15px] text-foreground/80"
                        >
                          {c.label}
                        </Link>
                      ))}
                    </div>
                  </details>
                ) : (
                  <Link
                    to={item.to}
                    className="flex min-h-14 items-center font-display text-xl font-extrabold text-brand-ink data-[active=true]:text-brand-red"
                    data-active={isActive(item.match) || undefined}
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
            <div className="flex gap-5 py-3 text-sm font-medium text-muted-foreground">
              {STRIP_LINKS.map((l) => (
                <Link key={l.label} to={l.to}>
                  {l.label}
                </Link>
              ))}
            </div>
            <Link
              to="/billetterie"
              className="mt-1 flex h-14 items-center justify-center rounded-full bg-brand-red text-base font-semibold text-white"
            >
              Billetterie
            </Link>
          </nav>
        </div>
      )}

      <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} />
    </header>
  );
}
