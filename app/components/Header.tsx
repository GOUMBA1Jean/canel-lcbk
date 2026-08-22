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
    <header className="sticky top-0 z-20 bg-white/95 backdrop-blur border-b border-[#D5C9B8]">
      <div className="max-w-[1120px] mx-auto flex items-center justify-between px-5 py-4">
        <Link href="/" className="font-serif font-semibold text-lg text-[#1E5A8E]">
          CANEL<span className="text-[#8B7355]">-LCBK</span>
        </Link>
        <nav className="hidden md:flex gap-6 text-sm font-medium">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="text-[#1a1a1a]/70 hover:text-[#1E5A8E] transition">
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="hidden md:block">
          <Link href="/annuaire" className="bg-[#1E5A8E] text-white text-sm font-medium px-5 py-2.5 rounded-sm hover:bg-[#2970AA] transition">
            Rejoindre
          </Link>
        </div>
        <button onClick={() => setOuvert(!ouvert)} className="md:hidden flex flex-col gap-1.5 p-2" aria-label="Menu">
          <span className={`block w-6 h-0.5 bg-[#1E5A8E] transition-all duration-300 ${ouvert ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block w-6 h-0.5 bg-[#1E5A8E] transition-all duration-300 ${ouvert ? "opacity-0" : ""}`} />
          <span className={`block w-6 h-0.5 bg-[#1E5A8E] transition-all duration-300 ${ouvert ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </div>
      {ouvert && (
        <div className="md:hidden bg-white border-t border-[#D5C9B8] px-5 py-4 flex flex-col gap-1">
          {links.map((l) => (
            <Link key={l.href} href={l.href} onClick={() => setOuvert(false)} className="text-[#1a1a1a]/80 font-medium text-[15px] py-2.5 border-b border-[#F0EAE0] last:border-0">
              {l.label}
            </Link>
          ))}
          <Link href="/annuaire" onClick={() => setOuvert(false)} className="mt-3 bg-[#1E5A8E] text-white text-sm font-medium px-5 py-3 rounded-sm text-center">
            Rejoindre l&apos;annuaire
          </Link>
        </div>
      )}
    </header>
  );
}