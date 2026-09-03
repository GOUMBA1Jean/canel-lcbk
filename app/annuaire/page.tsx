"use client";
export const dynamic = "force-dynamic";

import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { supabase } from "../lib/supabase";
import { SkeletonCard } from "../components/Skeleton";
import AuthGuard from "../components/AuthGuard";

type Ancien = {
  id: string;
  nom: string;
  prenom: string;
  promotion: string;
  filiere: string;
  secteur: string;
  ville: string;
  photo_url: string | null;
};

function ContenuAnnuaire() {
  const [anciens, setAnciens] = useState<Ancien[]>([]);
  const [chargement, setChargement] = useState(true);
  const [recherche, setRecherche] = useState("");
  const [promo, setPromo] = useState("Toutes");
  const [secteur, setSecteur] = useState("Tous");
  const [selection, setSelection] = useState<Ancien | null>(null);

  useEffect(() => { chargerAnciens(); }, []);

  async function chargerAnciens() {
    setChargement(true);
    const { data } = await supabase.from("anciens").select("*").eq("statut", "validé").order("promotion", { ascending: false });
    setAnciens(data || []);
    setChargement(false);
  }

  const promotions = ["Toutes", ...Array.from(new Set(anciens.map((a) => a.promotion))).sort().reverse()];
  const secteurs = ["Tous", ...Array.from(new Set(anciens.map((a) => a.secteur)))];
  const resultats = useMemo(() => anciens.filter((a) => {
    const matchNom = `${a.prenom} ${a.nom}`.toLowerCase().includes(recherche.toLowerCase());
    const matchPromo = promo === "Toutes" || a.promotion === promo;
    const matchSecteur = secteur === "Tous" || a.secteur === secteur;
    return matchNom && matchPromo && matchSecteur;
  }), [anciens, recherche, promo, secteur]);

  function Avatar({ ancien, taille = 44 }: { ancien: Ancien; taille?: number }) {
    if (ancien.photo_url) {
      return (
        <div className="rounded-full overflow-hidden shrink-0" style={{ width: taille, height: taille }}>
          <Image src={ancien.photo_url} alt={ancien.prenom} width={taille} height={taille}
            sizes="(max-width: 768px) 44px, 80px" className="object-cover w-full h-full" />
        </div>
      );
    }
    return (
      <div className="rounded-full bg-[#1E5A8E] text-[#A8CBE8] flex items-center justify-center font-serif shrink-0"
        style={{ width: taille, height: taille, fontSize: taille * 0.4 }}>
        {ancien.prenom.charAt(0)}
      </div>
    );
  }

  return (
    <>
      <section className="bg-[#1E5A8E] text-white py-16">
        <div className="max-w-[680px] mx-auto px-5 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-6 h-px bg-[#B5966E]" />
              <span className="text-[#B5966E] text-[11px] font-semibold tracking-[0.12em] uppercase">CANEL-LCBK · Réseau</span>
            </div>
            <h1 className="font-serif text-4xl md:text-5xl mb-4">Annuaire des anciens</h1>
            <p className="text-[#D0E4F2] max-w-[480px] leading-relaxed">
              Retrouvez un ancien par promotion, filière ou secteur d&apos;activité.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 bg-[#F5F0E8]">
        <div className="max-w-[680px] mx-auto px-5">
          <div className="flex flex-col gap-3 mb-6">
            <input type="text" placeholder="Rechercher un nom..." value={recherche}
              onChange={(e) => setRecherche(e.target.value)}
              className="bg-white border border-[#D5C9B8] px-4 py-3 text-[15px] w-full focus:outline-none focus:border-[#1E5A8E]" />
            <div className="flex gap-3">
              <select value={promo} onChange={(e) => setPromo(e.target.value)}
                className="bg-white border border-[#D5C9B8] px-4 py-3 text-[14px] flex-1 focus:outline-none">
                {promotions.map((p) => <option key={p} value={p}>{p === "Toutes" ? "Toutes les promotions" : p}</option>)}
              </select>
              <select value={secteur} onChange={(e) => setSecteur(e.target.value)}
                className="bg-white border border-[#D5C9B8] px-4 py-3 text-[14px] flex-1 focus:outline-none">
                {secteurs.map((s) => <option key={s} value={s}>{s === "Tous" ? "Tous les secteurs" : s}</option>)}
              </select>
            </div>
          </div>

          {chargement ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-[#D5C9B8] border border-[#D5C9B8]">
              {[...Array(4)].map((_, i) => <SkeletonCard key={i} />)}
            </div>
          ) : anciens.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-[#6B6B6B] mb-4">L&apos;annuaire est vide pour l&apos;instant.</p>
              <Link href="/inscription"
                className="bg-[#1E5A8E] text-white text-sm font-medium px-5 py-3 inline-block">
                Créer un compte pour s&apos;inscrire
              </Link>
            </div>
          ) : (
            <>
              <p className="text-[12px] text-[#9a9a9a] italic mb-5">
                {resultats.length} membre{resultats.length > 1 ? "s" : ""} trouvé{resultats.length > 1 ? "s" : ""}
              </p>
              {resultats.length === 0 ? (
                <div className="text-center py-16 text-[#6B6B6B]">Aucun ancien ne correspond.</div>
              ) : (
                <div className="space-y-px">
                  {resultats.map((a) => (
                    <button key={a.id} onClick={() => setSelection(a)}
                      className="w-full bg-white p-6 text-left hover:bg-[#F5F0E8] transition flex items-start gap-4 border-b border-[#E8E0D0] last:border-0">
                      <Avatar ancien={a} taille={48} />
                      <div className="flex-1">
                        <h4 className="font-serif text-[17px] text-[#1E5A8E] mb-0.5">{a.prenom} {a.nom}</h4>
                        <p className="text-[13px] text-[#6B6B6B] mb-2">Promotion {a.promotion} · {a.ville}</p>
                        <div className="flex gap-2 flex-wrap">
                          <span className="text-[11px] text-[#B5966E] font-semibold uppercase tracking-wide">{a.filiere}</span>
                          {a.secteur && <span className="text-[11px] text-[#9a9a9a]">· {a.secteur}</span>}
                        </div>
                      </div>
                      <svg width="16" height="16" fill="none" stroke="#B5966E" strokeWidth="2" viewBox="0 0 24 24" className="shrink-0 mt-1">
                        <path d="M5 12h14M12 5l7 7-7 7"/>
                      </svg>
                    </button>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Fiche détaillée */}
      {selection && (
        <div className="fixed inset-0 bg-black/50 flex items-end sm:items-center justify-center z-30 p-4 sm:p-6"
          onClick={() => setSelection(null)}>
          <div className="bg-white w-full max-w-md p-8 border-t-4 border-[#B5966E]"
            onClick={(e) => e.stopPropagation()}>
            <div className="flex items-start gap-4 mb-6">
              <Avatar ancien={selection} taille={64} />
              <div>
                <h3 className="font-serif text-[22px] text-[#1E5A8E]">{selection.prenom} {selection.nom}</h3>
                <p className="text-[13px] text-[#6B6B6B]">Promotion {selection.promotion} · {selection.ville}</p>
              </div>
            </div>
            <div className="flex gap-2 flex-wrap mb-6">
              <span className="text-[11px] text-[#B5966E] font-semibold uppercase tracking-wide border border-[#B5966E] px-2.5 py-1">{selection.filiere}</span>
              {selection.secteur && <span className="text-[11px] text-[#6B6B6B] border border-[#D5C9B8] px-2.5 py-1">{selection.secteur}</span>}
            </div>
            <button onClick={() => setSelection(null)}
              className="w-full bg-[#1E5A8E] text-white font-medium py-3 text-[14px]">
              Fermer
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default function Annuaire() {
  return (
    <AuthGuard>
      <ContenuAnnuaire />
    </AuthGuard>
  );
}