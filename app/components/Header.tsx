"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { supabase } from "../lib/supabase";
import { useRouter, usePathname } from "next/navigation";

const reseau = [
  { href: "/orientation", label: "Orientation" },
  { href: "/offres", label: "Offres" },
  { href: "/contribution", label: "Contribution" },
];

const links = [
  { href: "/", label: "Accueil" },
  { href: "/annuaire", label: "Annuaire" },
  { href: "/actualites", label: "Actualités" },
  { href: "/bureau", label: "Bureau" },
  { href: "/a-propos", label: "À propos" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const [ouvert, setOuvert] = useState(false);
  const [reseauOuvert, setReseauOuvert] = useState(false);
  const [reseauMobileOuvert, setReseauMobileOuvert] = useState(false);
  const [connecte, setConnecte] = useState(false);
  const [nomMembre, setNomMembre] = useState("");
  const reseauRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setConnecte(!!session);
      if (session?.user?.email) {
        supabase.from("anciens").select("prenom").eq("email", session.user.email).single()
          .then(({ data }) => { if (data) setNomMembre(data.prenom); });
      }
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setConnecte(!!session);
    });
    return () => subscription.unsubscribe();
  }, []);

  // Fermer le sous-menu si clic en dehors
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (reseauRef.current && !reseauRef.current.contains(e.target as Node)) {
        setReseauOuvert(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Fermer menu mobile sur changement de route
  useEffect(() => {
    setOuvert(false);
    setReseauMobileOuvert(false);
  }, [pathname]);

  useEffect(() => {
    function handleEsc(e: KeyboardEvent) { if (e.key === "Escape") { setOuvert(false); setReseauOuvert(false); } }
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  useEffect(() => {
    document.body.style.overflow = ouvert ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [ouvert]);

  async function deconnecter() {
    await supabase.auth.signOut();
    setConnecte(false);
    setNomMembre("");
    router.push("/");
  }

  const isReseauActif = reseau.some(l => pathname === l.href);

  return (
    <header className="sticky top-0 z-20 bg-white/95 backdrop-blur border-b border-[#D5C9B8]">
      <div className="max-w-[1120px] mx-auto flex items-center justify-between px-5 py-2">

        {/* Logo */}
        <Link href="/" onClick={() => setOuvert(false)}>
          <Image src="/logo.png" alt="CANEL-LCBK" width={48} height={48} className="h-12 w-auto object-contain" priority />
        </Link>

        {/* Navigation desktop */}
        <nav className="hidden md:flex items-center gap-1 text-sm font-medium">
          {links.slice(0, 2).map((l) => (
            <Link key={l.href} href={l.href}
              className={`px-3 py-2 transition rounded-sm ${pathname === l.href ? "text-[#1E5A8E]" : "text-[#1a1a1a]/70 hover:text-[#1E5A8E]"}`}>
              {l.label}
            </Link>
          ))}

          {/* Sous-menu Réseau */}
          <div ref={reseauRef} className="relative">
            <button
              onClick={() => setReseauOuvert(!reseauOuvert)}
              className={`flex items-center gap-1 px-3 py-2 transition rounded-sm ${isReseauActif ? "text-[#1E5A8E]" : "text-[#1a1a1a]/70 hover:text-[#1E5A8E]"}`}
            >
              Réseau
              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"
                className={`transition-transform duration-200 ${reseauOuvert ? "rotate-180" : ""}`}>
                <path d="M6 9l6 6 6-6"/>
              </svg>
            </button>

            {reseauOuvert && (
              <div className="absolute top-full left-0 mt-1 bg-white border border-[#D5C9B8] shadow-md min-w-[160px] z-30">
                {reseau.map((l) => (
                  <Link key={l.href} href={l.href}
                    onClick={() => setReseauOuvert(false)}
                    className={`block px-4 py-3 text-sm border-b border-[#F0EAE0] last:border-0 transition ${pathname === l.href ? "text-[#1E5A8E] bg-[#F5F0E8]" : "text-[#1a1a1a]/70 hover:bg-[#F5F0E8] hover:text-[#1E5A8E]"}`}>
                    {l.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {links.slice(2).map((l) => (
            <Link key={l.href} href={l.href}
              className={`px-3 py-2 transition rounded-sm ${pathname === l.href ? "text-[#1E5A8E]" : "text-[#1a1a1a]/70 hover:text-[#1E5A8E]"}`}>
              {l.label}
            </Link>
          ))}
        </nav>

        {/* Auth desktop */}
        <div className="hidden md:flex items-center gap-3">
          {connecte ? (
            <>
              <span className="text-sm text-[#6B6B6B]">Bonjour, {nomMembre || "membre"}</span>
              <button onClick={deconnecter}
                className="border border-[#D5C9B8] text-[#6B6B6B] text-sm font-medium px-4 py-2 rounded-sm hover:border-[#1E5A8E] hover:text-[#1E5A8E] transition">
                Déconnexion
              </button>
            </>
          ) : (
            <>
              <Link href="/connexion" className="text-sm font-medium text-[#1E5A8E] hover:underline">
                Se connecter
              </Link>
              <Link href="/inscription"
                className="bg-[#1E5A8E] text-white text-sm font-medium px-5 py-2.5 rounded-sm hover:bg-[#2970AA] transition">
                Rejoindre
              </Link>
            </>
          )}
        </div>

        {/* Bouton hamburger mobile */}
        <button onClick={() => setOuvert(!ouvert)}
          className="md:hidden flex flex-col gap-1.5 p-2 min-h-[44px] min-w-[44px] items-center justify-center"
          aria-label={ouvert ? "Fermer le menu" : "Ouvrir le menu"} aria-expanded={ouvert}>
          <span className={`block w-6 h-0.5 bg-[#1E5A8E] transition-all duration-300 ${ouvert ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block w-6 h-0.5 bg-[#1E5A8E] transition-all duration-300 ${ouvert ? "opacity-0" : ""}`} />
          <span className={`block w-6 h-0.5 bg-[#1E5A8E] transition-all duration-300 ${ouvert ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </div>

      {/* Overlay mobile */}
      {ouvert && <div className="fixed inset-0 bg-black/30 z-10 md:hidden" onClick={() => setOuvert(false)} />}

      {/* Menu mobile */}
      <div className={`md:hidden fixed top-[57px] left-0 right-0 bg-white border-t border-[#D5C9B8] z-20 transition-all duration-300 ${ouvert ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2 pointer-events-none"}`}>
        <div className="px-5 py-4 flex flex-col">

          {/* Liens simples */}
          {links.slice(0, 2).map((l) => (
            <Link key={l.href} href={l.href} onClick={() => setOuvert(false)}
              className={`font-medium text-[15px] py-3.5 border-b border-[#F0EAE0] min-h-[44px] flex items-center ${pathname === l.href ? "text-[#1E5A8E]" : "text-[#1a1a1a]/80"}`}>
              {l.label}
            </Link>
          ))}

          {/* Réseau avec sous-menu mobile */}
          <div className="border-b border-[#F0EAE0]">
            <button
              onClick={() => setReseauMobileOuvert(!reseauMobileOuvert)}
              className="w-full flex items-center justify-between font-medium text-[15px] py-3.5 min-h-[44px] text-[#1a1a1a]/80">
              Réseau
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"
                className={`transition-transform duration-200 ${reseauMobileOuvert ? "rotate-180" : ""}`}>
                <path d="M6 9l6 6 6-6"/>
              </svg>
            </button>
            {reseauMobileOuvert && (
              <div className="bg-[#F5F0E8] mb-1 rounded-sm">
                {reseau.map((l) => (
                  <Link key={l.href} href={l.href} onClick={() => setOuvert(false)}
                    className={`block px-4 py-3 text-[14px] border-b border-[#E8E0D0] last:border-0 ${pathname === l.href ? "text-[#1E5A8E] font-medium" : "text-[#1a1a1a]/70"}`}>
                    {l.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Reste des liens */}
          {links.slice(2).map((l) => (
            <Link key={l.href} href={l.href} onClick={() => setOuvert(false)}
              className={`font-medium text-[15px] py-3.5 border-b border-[#F0EAE0] last:border-0 min-h-[44px] flex items-center ${pathname === l.href ? "text-[#1E5A8E]" : "text-[#1a1a1a]/80"}`}>
              {l.label}
            </Link>
          ))}

          {/* Auth mobile */}
          <div className="mt-4 flex flex-col gap-2">
            {connecte ? (
              <button onClick={deconnecter}
                className="border border-[#D5C9B8] text-[#6B6B6B] text-sm font-medium px-5 py-3.5 rounded-sm text-center">
                Déconnexion
              </button>
            ) : (
              <>
                <Link href="/connexion" onClick={() => setOuvert(false)}
                  className="border border-[#1E5A8E] text-[#1E5A8E] text-sm font-medium px-5 py-3.5 rounded-sm text-center min-h-[44px] flex items-center justify-center">
                  Se connecter
                </Link>
                <Link href="/inscription" onClick={() => setOuvert(false)}
                  className="bg-[#1E5A8E] text-white text-sm font-medium px-5 py-3.5 rounded-sm text-center min-h-[44px] flex items-center justify-center">
                  Rejoindre l&apos;annuaire
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}