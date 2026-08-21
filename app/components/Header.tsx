"use client";

import { useState } from "react";
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
  const [ouvert, setOuvert] = useState(false);

  return (
    <header className="sticky top-0 z-20 bg-sand/95 backdrop-blur border-b border-sand-2">
      <div className="max-w-[1120px] mx-auto flex items-center justify-between px-5 py-4">
        <Link href="/" className="font-serif font-semibold text-lg text-indigo">
          CANEL<span className="text-gold">-LCBK</span>
        </Link>

        {/* Menu desktop */}
        <nav className="hidden md:flex gap-6 text-sm font-medium">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="text-ink/75 hover:text-ink transition">
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          <Link href="/annuaire" className="bg-indigo text-white text-sm font-medium px-5 py-2.5 rounded-sm hover:bg-indigo-2 transition">
            Rejoindre
          </Link>
        </div>

        {/* Bouton hamburger mobile */}
        <button
          onClick={() => setOuvert(!ouvert)}
          className="md:hidden flex flex-col gap-1.5 p-2"
          aria-label="Menu"
        >
          <span className={`block w-6 h-0.5 bg-indigo transition-all duration-300 ${ouvert ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block w-6 h-0.5 bg-indigo transition-all duration-300 ${ouvert ? "opacity-0" : ""}`} />
          <span className={`block w-6 h-0.5 bg-indigo transition-all duration-300 ${ouvert ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </div>

      {/* Menu mobile déroulant */}
      {ouvert && (
        <div className="md:hidden bg-sand border-t border-sand-2 px-5 py-4 flex flex-col gap-1">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOuvert(false)}
              className="text-ink/80 font-medium text-[15px] py-2.5 border-b border-sand-2 last:border-0"
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/annuaire"
            onClick={() => setOuvert(false)}
            className="mt-3 bg-indigo text-white text-sm font-medium px-5 py-3 rounded-sm text-center"
          >
            Rejoindre l&apos;annuaire
          </Link>
        </div>
      )}
    </header>
  );
}