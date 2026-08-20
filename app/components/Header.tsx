import Link from "next/link";

const links = [
  { href: "/", label: "Accueil" },
  { href: "/annuaire", label: "Annuaire" },
  { href: "/orientation", label: "Orientation" },
  { href: "/actualites", label: "Actualités" },
  { href: "/offres", label: "Offres" },
  { href: "/contribution", label: "Contribution" },
  { href: "/bureau", label: "Bureau" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-20 bg-sand/90 backdrop-blur border-b border-sand-2">
      <div className="max-w-[1120px] mx-auto flex items-center justify-between px-8 py-4">
        <Link href="/" className="font-serif font-semibold text-lg text-indigo">
          CANEL<span className="text-gold">-LCBK</span>
        </Link>
        <nav className="hidden md:flex gap-7 text-sm font-medium">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="text-ink/75 hover:text-ink transition">
              {l.label}
            </Link>
          ))}
        </nav>
        <Link href="/annuaire" className="bg-indigo text-white text-sm font-medium px-5 py-2.5 rounded-sm hover:bg-indigo-2 transition">
          Rejoindre
        </Link>
      </div>
    </header>
  );
}