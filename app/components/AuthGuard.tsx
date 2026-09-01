"use client";

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import Link from "next/link";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const [statut, setStatut] = useState<"chargement" | "connecte" | "deconnecte">("chargement");

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setStatut(session ? "connecte" : "deconnecte");
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, session) => {
      setStatut(session ? "connecte" : "deconnecte");
    });
    return () => subscription.unsubscribe();
  }, []);

  if (statut === "chargement") {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-[#6B6B6B] text-sm">Vérification...</div>
      </div>
    );
  }

  if (statut === "deconnecte") {
    return (
      <div className="min-h-[70vh] bg-[#F5F0E8] flex items-center justify-center p-6">
        <div className="text-center max-w-sm">
          <div className="w-16 h-16 rounded-full bg-[#E8E0D0] flex items-center justify-center mx-auto mb-6">
            <svg width="28" height="28" fill="none" stroke="#B5966E" strokeWidth="1.5" viewBox="0 0 24 24">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
            </svg>
          </div>
          <div className="flex items-center justify-center gap-3 mb-2">
            <div className="w-6 h-px bg-[#B5966E]" />
            <span className="text-[#B5966E] text-[11px] font-semibold tracking-[0.12em] uppercase">Accès réservé</span>
            <div className="w-6 h-px bg-[#B5966E]" />
          </div>
          <h2 className="font-serif text-[28px] text-[#1E5A8E] mb-3">Connecte-toi pour accéder</h2>
          <p className="text-[14px] text-[#6B6B6B] mb-8 leading-relaxed">
            Cette section est réservée aux membres de CANEL-LCBK. Connecte-toi ou crée ton compte pour y accéder.
          </p>
          <div className="flex flex-col gap-3">
            <Link href="/connexion" className="bg-[#B5966E] text-white font-semibold text-[15px] py-4 text-center block">
              Se connecter
            </Link>
            <Link href="/connexion" className="border border-[#1E5A8E] text-[#1E5A8E] font-medium text-[15px] py-4 text-center block">
              Créer un compte
            </Link>
          </div>
          <Link href="/" className="inline-block mt-6 text-[13px] text-[#6B6B6B] underline">
            Retour à l&apos;accueil
          </Link>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}