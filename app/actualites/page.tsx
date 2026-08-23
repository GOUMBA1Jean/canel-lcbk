"use client";

import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";

type Actu = { id: string; titre: string; contenu: string; tag: string; auteur: string; created_at: string; };

const TAGS = ["Établissement", "Formation", "Contribution", "Rencontre", "Autre"];

export default function Actualites() {
  const [actus, setActus] = useState<Actu[]>([]);
  const [chargement, setChargement] = useState(true);
  const [formulaire, setFormulaire] = useState(false);
  const [envoi, setEnvoi] = useState<"idle" | "chargement" | "succes" | "erreur">("idle");
  const [nouveau, setNouveau] = useState({ titre: "", contenu: "", tag: "Établissement", auteur: "" });

  useEffect(() => { charger(); }, []);

  async function charger() {
    setChargement(true);
    const { data } = await supabase.from("actualites").select("*").eq("statut", "validé").order("created_at", { ascending: false });
    setActus(data || []);
    setChargement(false);
  }

  async function soumettre(e: React.FormEvent) {
    e.preventDefault();
    setEnvoi("chargement");
    const { error } = await supabase.from("actualites").insert([{ ...nouveau, statut: "en_attente" }]);
    if (error) { setEnvoi("erreur"); }
    else { setEnvoi("succes"); setNouveau({ titre: "", contenu: "", tag: "Établissement", auteur: "" }); }
  }

  function formatDate(d: string) {
    return new Date(d).toLocaleDateString("fr-FR", { year: "numeric", month: "long" });
  }

  return (
    <>
      <section className="bg-[#1E5A8E] text-white py-16">
        <div className="max-w-[1120px] mx-auto px-5 md:px-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="font-mono text-[13px] tracking-wide uppercase text-[#A8CBE8] mb-4">CANEL-LCBK</div>
            <h1 className="font-serif text-4xl md:text-5xl mb-4">Actualités</h1>
            <p className="text-[#D0E4F2] max-w-[560px] leading-relaxed">
              Ce qui avance à l&apos;établissement, sans se perdre dans un fil de discussion.
            </p>
          </div>
          <button onClick={() => { setFormulaire(true); setEnvoi("idle"); }} className="bg-[#B5966E] text-white font-semibold text-sm px-6 py-3 rounded-sm whitespace-nowrap shrink-0">
            + Partager une actualité
          </button>
        </div>
      </section>

      <section className="py-14 bg-[#FAFAF8]">
        <div className="max-w-[1120px] mx-auto px-5 md:px-8">
          {chargement ? (
            <div className="text-center py-20 text-[#6B6B6B]">Chargement...</div>
          ) : actus.length === 0 ? (
            <div className="text-center py-20 text-[#6B6B6B]">Aucune actualité publiée pour le moment.</div>
          ) : (
            <div className="flex flex-col gap-px bg-[#D5C9B8] border border-[#D5C9B8]">
              {actus.map((a) => (
                <div key={a.id} className="bg-[#FAFAF8] p-7 flex flex-col md:flex-row md:items-start gap-2 md:gap-8">
                  <div className="font-mono text-[12px] text-[#9a9a9a] md:w-32 shrink-0">{formatDate(a.created_at)}</div>
                  <div>
                    <span className="font-mono text-[11px] bg-[#B5966E] text-white px-2 py-1 rounded-sm">{a.tag}</span>
                    <h4 className="text-[17px] text-[#1E5A8E] mt-2 mb-1">{a.titre}</h4>
                    <p className="text-[14px] text-[#6B6B6B] leading-relaxed">{a.contenu}</p>
                    <p className="text-[12px] text-[#9a9a9a] mt-2">Par : {a.auteur}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {formulaire && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-30 p-6" onClick={() => setFormulaire(false)}>
          <div className="bg-[#FAFAF8] rounded max-w-lg w-full p-8 border border-[#D5C9B8] max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <h3 className="font-serif text-2xl text-[#1E5A8E] mb-2">Partager une actualité</h3>
            <p className="text-[13.5px] text-[#6B6B6B] mb-6">Votre actualité sera examinée par le bureau avant publication.</p>
            {envoi === "succes" ? (
              <div>
                <p className="text-green-600 font-medium mb-4">Actualité soumise avec succès ! Le bureau la validera prochainement.</p>
                <button onClick={() => setFormulaire(false)} className="bg-[#1E5A8E] text-white text-sm font-medium px-5 py-2.5 rounded-sm">Fermer</button>
              </div>
            ) : (
              <form onSubmit={soumettre} className="flex flex-col gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#1E5A8E] mb-1">Titre</label>
                  <input type="text" required value={nouveau.titre} onChange={(e) => setNouveau({ ...nouveau, titre: e.target.value })} placeholder="Titre de l'actualité" className="w-full border border-[#D5C9B8] bg-white rounded-sm px-4 py-2.5 text-sm focus:outline-none focus:border-[#1E5A8E]" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#1E5A8E] mb-1">Catégorie</label>
                  <select value={nouveau.tag} onChange={(e) => setNouveau({ ...nouveau, tag: e.target.value })} className="w-full border border-[#D5C9B8] bg-white rounded-sm px-4 py-2.5 text-sm focus:outline-none focus:border-[#1E5A8E]">
                    {TAGS.map((t) => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#1E5A8E] mb-1">Contenu</label>
                  <textarea required value={nouveau.contenu} onChange={(e) => setNouveau({ ...nouveau, contenu: e.target.value })} rows={4} placeholder="Décrivez l'actualité..." className="w-full border border-[#D5C9B8] bg-white rounded-sm px-4 py-2.5 text-sm focus:outline-none focus:border-[#1E5A8E]" />
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