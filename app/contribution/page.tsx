"use client";

import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";

type StatPromo = {
  promotion: string;
  total: number;
  montant: number;
};

export default function Contribution() {
  const [totalMembres, setTotalMembres] = useState(0);
  const [totalMontant, setTotalMontant] = useState(0);
  const [stats, setStats] = useState<StatPromo[]>([]);
  const [chargement, setChargement] = useState(true);
  const [recherche, setRecherche] = useState("");
  const [resultat, setResultat] = useState<{ prenom: string; nom: string; promotion: string; montant: number } | null | "non_trouve">(null);
  const [contributions, setContributions] = useState<{ nom: string; prenom: string; promotion: string; montant: number }[]>([]);

  const OBJECTIF = 500;

  useEffect(() => { charger(); }, []);

  async function charger() {
    setChargement(true);
    const { data } = await supabase
      .from("contributions")
      .select("*")
      .order("created_at", { ascending: false });

    const liste = data || [];
    setContributions(liste);
    setTotalMembres(liste.length);
    setTotalMontant(liste.reduce((s, c) => s + c.montant, 0));

    // Stats par promotion
    const map: Record<string, { total: number; montant: number }> = {};
    for (const c of liste) {
      if (!map[c.promotion]) map[c.promotion] = { total: 0, montant: 0 };
      map[c.promotion].total += 1;
      map[c.promotion].montant += c.montant;
    }
    setStats(
      Object.entries(map)
        .map(([promotion, v]) => ({ promotion, ...v }))
        .sort((a, b) => b.promotion.localeCompare(a.promotion))
    );
    setChargement(false);
  }

  function chercherMembre() {
    if (!recherche.trim()) return;
    const terme = recherche.toLowerCase().trim();
    const trouve = contributions.find(
      (c) =>
        c.nom.toLowerCase().includes(terme) ||
        c.prenom.toLowerCase().includes(terme) ||
        `${c.prenom} ${c.nom}`.toLowerCase().includes(terme) ||
        `${c.nom} ${c.prenom}`.toLowerCase().includes(terme)
    );
    setResultat(trouve || "non_trouve");
  }

  const pourcentage = Math.min(Math.round((totalMembres / OBJECTIF) * 100), 100);

  return (
    <>
      <section className="bg-[#8B7355] text-white py-16">
        <div className="max-w-[1120px] mx-auto px-5 md:px-8">
          <div className="font-mono text-[13px] tracking-wide uppercase text-[#D5C9B8] mb-4">Opération en cours</div>
          <h1 className="font-serif text-4xl md:text-5xl mb-4">Chaque élève s&apos;acquitte de sa contribution</h1>
          <p className="text-[#EAE0D0] max-w-[600px] leading-relaxed">
            Un geste pour soutenir l&apos;éducation de nos successeurs et celle de la nation.
          </p>
        </div>
      </section>

      <section className="py-14 bg-[#FAFAF8]">
        <div className="max-w-[1120px] mx-auto px-5 md:px-8">

          {/* Barre de progression */}
          <div className="bg-[#F0EAE0] border border-[#D5C9B8] rounded p-8 max-w-xl mb-10">
            <div className="flex justify-between items-baseline mb-3">
              <span className="text-sm text-[#6B6B6B]">Avancement de l&apos;opération</span>
              <span className="font-mono text-sm text-[#8B7355]">{chargement ? "…" : `${pourcentage}%`}</span>
            </div>
            <div className="h-3 bg-white rounded-full overflow-hidden border border-[#D5C9B8]">
              <div className="h-full bg-[#8B7355] rounded-full transition-all duration-500" style={{ width: `${pourcentage}%` }} />
            </div>
            <p className="text-[12.5px] text-[#9a9a9a] italic mt-3">
              {chargement ? "Chargement..." : `${totalMembres} contribution${totalMembres > 1 ? "s" : ""} enregistrée${totalMembres > 1 ? "s" : ""} sur un objectif de ${OBJECTIF} membres — ${totalMontant.toLocaleString()} FCFA collectés`}
            </p>
          </div>

          {/* Vérification statut */}
          <div className="mb-12">
            <h2 className="font-serif text-2xl text-[#1E5A8E] mb-2">Vérifier mon statut</h2>
            <p className="text-[13.5px] text-[#6B6B6B] mb-5">Entrez votre nom pour savoir si votre contribution a été enregistrée.</p>
            <div className="flex gap-3 max-w-md">
              <input
                type="text"
                value={recherche}
                onChange={(e) => { setRecherche(e.target.value); setResultat(null); }}
                onKeyDown={(e) => e.key === "Enter" && chercherMembre()}
                placeholder="Votre nom ou prénom…"
                className="flex-1 border border-[#D5C9B8] bg-white rounded-sm px-4 py-2.5 text-sm focus:outline-none focus:border-[#8B7355]"
              />
              <button
                onClick={chercherMembre}
                className="bg-[#8B7355] text-white text-sm font-medium px-5 py-2.5 rounded-sm"
              >
                Vérifier
              </button>
            </div>

            {resultat === "non_trouve" && (
              <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-sm max-w-md">
                <p className="text-[14px] text-red-700 font-medium">❌ Contribution non enregistrée</p>
                <p className="text-[13px] text-red-600 mt-1">Votre nom n&apos;apparaît pas encore. Rapprochez-vous du bureau.</p>
              </div>
            )}
            {resultat && resultat !== "non_trouve" && (
              <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-sm max-w-md">
                <p className="text-[14px] text-green-700 font-medium">✓ Contribution enregistrée</p>
                <p className="text-[13px] text-green-600 mt-1">
                  {resultat.prenom} {resultat.nom} — Promotion {resultat.promotion} — {resultat.montant.toLocaleString()} FCFA
                </p>
              </div>
            )}
          </div>

          {/* Stats par promotion */}
          <div className="mb-12">
            <h2 className="font-serif text-2xl text-[#1E5A8E] mb-6">Suivi par promotion</h2>
            {chargement ? (
              <div className="text-center py-10 text-[#6B6B6B]">Chargement...</div>
            ) : stats.length === 0 ? (
              <div className="text-center py-10 text-[#6B6B6B]">Aucune contribution enregistrée pour le moment.</div>
            ) : (
              <div className="flex flex-col gap-px bg-[#D5C9B8] border border-[#D5C9B8] max-w-2xl">
                {stats.map((s) => (
                  <div key={s.promotion} className="bg-[#FAFAF8] px-6 py-4 flex justify-between items-center flex-wrap gap-3">
                    <div className="flex items-center gap-4">
                      <span className="font-serif text-[17px] text-[#1E5A8E]">Promotion {s.promotion}</span>
                      <span className="font-mono text-[11px] bg-[#D5C9B8] text-[#54534c] px-2 py-1 rounded-sm">
                        {s.total} membre{s.total > 1 ? "s" : ""}
                      </span>
                    </div>
                    <span className="font-mono text-[14px] text-[#8B7355] font-semibold">
                      {s.montant.toLocaleString()} FCFA
                    </span>
                  </div>
                ))}
                <div className="bg-[#F0EAE0] px-6 py-4 flex justify-between items-center">
                  <span className="font-semibold text-[#1E5A8E]">Total général</span>
                  <span className="font-mono text-[14px] text-[#8B7355] font-semibold">{totalMontant.toLocaleString()} FCFA</span>
                </div>
              </div>
            )}
          </div>

          {/* Pourquoi contribuer */}
          <h2 className="font-serif text-2xl text-[#1E5A8E] mb-4">Pourquoi contribuer</h2>
          <p className="text-[14.5px] text-[#6B6B6B] leading-relaxed max-w-2xl mb-8">
            La contribution de chaque élève permet de soutenir l&apos;éducation de ses successeurs au Lycée Collège la Bénédiction de Kyabé.
          </p>
          
            <a>href="https://chat.whatsapp.com/JuQvIvpnfdcH06e62u1zsc?s=cl&p=a&ilr=1"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-[#8B7355] text-white font-semibold text-[15px] px-7 py-3.5 rounded-sm"
            Participer depuis CANEL-LCBK
          </a>
        </div>
      </section>
    </>
  );
}