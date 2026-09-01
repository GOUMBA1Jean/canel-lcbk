"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

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

  useEffect(() => {
    function handleEsc(e: KeyboardEvent) {
      if (e.key === "Escape") setOuvert(false);
    }
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  useEffect(() => {
    if (ouvert) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [ouvert]);

  return (
    <header className="sticky top-0 z-20 bg-white/95 backdrop-blur border-b border-[#D5C9B8]">
      <div className="max-w-[1120px] mx-auto flex items-center justify-between px-5 py-3">

<Link href="/" onClick={() => setOuvert(false)}>
  <Image
    src="/logo.png"
    alt="CANEL-LCBK"
    width={48}
    height={48}
    className="h-12 w-auto object-contain"
    priority
  />
</Link>
        <nav className="hidden md:flex gap-6 text-sm font-medium">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="text-[#1a1a1a]/70 hover:text-[#1E5A8E] transition py-2">
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="hidden md:block">
          <Link href="/annuaire" className="bg-[#1E5A8E] text-white text-sm font-medium px-5 py-2.5 rounded-sm hover:bg-[#2970AA] transition">
            Rejoindre
          </Link>
        </div>
        <button
          onClick={() => setOuvert(!ouvert)}
          className="md:hidden flex flex-col gap-1.5 p-2 min-h-[44px] min-w-[44px] items-center justify-center"
          aria-label={ouvert ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={ouvert}
        >
          <span className={`block w-6 h-0.5 bg-[#1E5A8E] transition-all duration-300 ${ouvert ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block w-6 h-0.5 bg-[#1E5A8E] transition-all duration-300 ${ouvert ? "opacity-0" : ""}`} />
          <span className={`block w-6 h-0.5 bg-[#1E5A8E] transition-all duration-300 ${ouvert ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </div>

      {/* Overlay */}
      {ouvert && (
        <div className="fixed inset-0 bg-black/30 z-10 md:hidden" onClick={() => setOuvert(false)} />
      )}

      {/* Menu mobile */}
      <div className={`md:hidden fixed top-[57px] left-0 right-0 bg-white border-t border-[#D5C9B8] z-20 transition-all duration-300 ${ouvert ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2 pointer-events-none"}`}>
        <div className="px-5 py-4 flex flex-col">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOuvert(false)}
              className="text-[#1a1a1a]/80 font-medium text-[15px] py-3.5 border-b border-[#F0EAE0] last:border-0 min-h-[44px] flex items-center"
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/annuaire"
            onClick={() => setOuvert(false)}
            className="mt-4 bg-[#1E5A8E] text-white text-sm font-medium px-5 py-3.5 rounded-sm text-center min-h-[44px] flex items-center justify-center"
          >
            Rejoindre l&apos;annuaire
          </Link>
        </div>
      </div>
    </header>
  );
}