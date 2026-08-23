"use client";

import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";

type Offre = { id: string; titre: string; type: string; lieu: string; auteur: string; description: string; created_at: string; };

const TYPES = ["Emploi", "Stage", "Bourse", "Autre"];

export default function Offres() {
  const [offres, setOffres] = useState<Offre[]>([]);
  const [chargement, setChargement] = useState(true);
  const [formulaire, setFormulaire] = useState(false);
  const [envoi, setEnvoi] = useState<"idle" | "chargement" | "succes" | "erreur">("idle");
  const [nouveau, setNouveau] = useState({ titre: "", type: "Emploi", lieu: "", auteur: "", description: "" });

  useEffect(() => { charger(); }, []);

  async function charger() {
    setChargement(true);
    const { data } = await supabase.from("offres").select("*").eq("statut", "validé").order("created_at", { ascending: false });
    setOffres(data || []);
    setChargement(false);
  }

  async function soumettre(e: React.FormEvent) {
    e.preventDefault();
    setEnvoi("chargement");
    const { error } = await supabase.from("offres").insert([{ ...nouveau, statut: "en_attente" }]);
    if (error) { setEnvoi("erreur"); }
    else { setEnvoi("succes"); setNouveau({ titre: "", type: "Emploi", lieu: "", auteur: "", description: "" }); }
  }

  return (
    <>
      <section className="bg-[#1E5A8E] text-white py-16">
        <div className="max-w-[1120px] mx-auto px-5 md:px-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="font-mono text-[13px] tracking-wide uppercase text-[#A8CBE8] mb-4">Insertion professionnelle</div>
            <h1 className="font-serif text-4xl md:text-5xl mb-4">Offres partagées par le réseau</h1>
            <p className="text-[#D0E4F2] max-w-[560px] leading-relaxed">
              Emplois, stages et bourses partagés par les membres de CANEL-LCBK.
            </p>
          </div>
          <button onClick={() => { setFormulaire(true); setEnvoi("idle"); }} className="bg-[#B5966E] text-white font-semibold text-sm px-6 py-3 rounded-sm whitespace-nowrap shrink-0">
            + Partager une offre
          </button>
        </div>
      </section>

      <section className="py-14 bg-[#FAFAF8]">
        <div className="max-w-[1120px] mx-auto px-5 md:px-8">
          {chargement ? (
            <div className="text-center py-20 text-[#6B6B6B]">Chargement...</div>
          ) : offres.length === 0 ? (
            <div className="text-center py-20 text-[#6B6B6B]">Aucune offre publiée pour le moment.</div>
          ) : (
            <div className="flex flex-col gap-px bg-[#D5C9B8] border border-[#D5C9B8] mb-4">
              {offres.map((o) => (
                <div key={o.id} className="bg-[#FAFAF8] p-6 px-7 flex justify-between items-start flex-wrap gap-3">
                  <div>
                    <h4 className="text-[16px] text-[#1E5A8E] mb-1">{o.titre}</h4>
                    <p className="text-[13px] text-[#6B6B6B]">{o.auteur} · {o.lieu}</p>
                    {o.description && <p className="text-[13px] text-[#6B6B6B] mt-1">{o.description}</p>}
                  </div>
                  <span className="font-mono text-[11px] bg-[#B5966E] text-white px-2.5 py-1.5 rounded-sm shrink-0">{o.type}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {formulaire && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-30 p-6" onClick={() => setFormulaire(false)}>
          <div className="bg-[#FAFAF8] rounded max-w-lg w-full p-8 border border-[#D5C9B8] max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <h3 className="font-serif text-2xl text-[#1E5A8E] mb-2">Partager une offre</h3>
            <p className="text-[13.5px] text-[#6B6B6B] mb-6">Votre offre sera examinée par le bureau avant publication.</p>
            {envoi === "succes" ? (
              <div>
                <p className="text-green-600 font-medium mb-4">Offre soumise avec succès ! Le bureau la validera prochainement.</p>
                <button onClick={() => setFormulaire(false)} className="bg-[#1E5A8E] text-white text-sm font-medium px-5 py-2.5 rounded-sm">Fermer</button>
              </div>
            ) : (
              <form onSubmit={soumettre} className="flex flex-col gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#1E5A8E] mb-1">Titre de l&apos;offre</label>
                  <input type="text" required value={nouveau.titre} onChange={(e) => setNouveau({ ...nouveau, titre: e.target.value })} placeholder="ex : Stage développement web" className="w-full border border-[#D5C9B8] bg-white rounded-sm px-4 py-2.5 text-sm focus:outline-none focus:border-[#1E5A8E]" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#1E5A8E] mb-1">Type</label>
                  <select value={nouveau.type} onChange={(e) => setNouveau({ ...nouveau, type: e.target.value })} className="w-full border border-[#D5C9B8] bg-white rounded-sm px-4 py-2.5 text-sm focus:outline-none focus:border-[#1E5A8E]">
                    {TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#1E5A8E] mb-1">Lieu</label>
                  <input type="text" required value={nouveau.lieu} onChange={(e) => setNouveau({ ...nouveau, lieu: e.target.value })} placeholder="ex : N'Djamena, Sarh, Kyabé" className="w-full border border-[#D5C9B8] bg-white rounded-sm px-4 py-2.5 text-sm focus:outline-none focus:border-[#1E5A8E]" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#1E5A8E] mb-1">Description (optionnelle)</label>
                  <textarea value={nouveau.description} onChange={(e) => setNouveau({ ...nouveau, description: e.target.value })} rows={3} placeholder="Détails sur l'offre..." className="w-full border border-[#D5C9B8] bg-white rounded-sm px-4 py-2.5 text-sm focus:outline-none focus:border-[#1E5A8E]" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#1E5A8E] mb-1">Votre nom</label>
                  <input type="text" required value={nouveau.auteur} onChange={(e) => setNouveau({ ...nouveau, auteur: e.target.value })} placeholder="Votre nom complet" className="w-full border border-[#D5C9B8] bg-white rounded-sm px-4 py-2.5 text-sm focus:outline-none focus:border-[#1E5A8E]" />
                </div>
                {envoi === "erreur" && <p className="text-red-600 text-sm">Une erreur s&apos;est produite. Réessayez.</p>}
                <div className="flex gap-3 mt-2">
                  <button type="submit" disabled={envoi === "chargement"} className="bg-[#1E5A8E] text-white text-sm font-medium px-5 py-2.5 rounded-sm disabled:opacity-60">
                    {envoi === "chargement" ? "Envoi..." : "Soumettre"}
                  </button>
                  <button type="button" onClick={() => setFormulaire(false)} className="text-sm text-[#6B6B6B] px-4 py-2.5">Annuler</button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}