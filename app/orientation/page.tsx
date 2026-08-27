"use client";

import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";

type Item = { id: string; type: string; titre: string; texte: string; auteur: string; };

export default function Orientation() {
  const [items, setItems] = useState<Item[]>([]);
  const [chargement, setChargement] = useState(true);
  const [formulaire, setFormulaire] = useState(false);
  const [envoi, setEnvoi] = useState<"idle" | "chargement" | "succes" | "erreur">("idle");
  const [nouveau, setNouveau] = useState({ type: "Témoignage", titre: "", texte: "", auteur: "" });
  const [conseillers, setConseillers] = useState<
  { id: string; nom: string; whatsapp: string; mail: string; ordre: number }[]
>([]);

  useEffect(() => {
  charger();
  chargerConseillers();
}, []);

  async function charger() {
    setChargement(true);
    const { data } = await supabase.from("orientation").select("*").eq("statut", "validé").order("created_at", { ascending: false });
    setItems(data || []);
    setChargement(false);
  }

  async function chargerConseillers() {
  const { data, error } = await supabase
    .from("conseillers")
    .select("*")
    .order("ordre", { ascending: true });

  if (!error) {
    setConseillers(data || []);
  }
}

  async function soumettre(e: React.FormEvent) {
    e.preventDefault();
    setEnvoi("chargement");
    const { error } = await supabase.from("orientation").insert([{ ...nouveau, statut: "en_attente" }]);
    if (error) { setEnvoi("erreur"); }
    else { setEnvoi("succes"); setNouveau({ type: "Témoignage", titre: "", texte: "", auteur: "" }); }
  }

  const guides = items.filter(i => i.type === "Guide");
  const temoignages = items.filter(i => i.type === "Témoignage");

  return (
    <>
      <section className="bg-[#1E5A8E] text-white py-16">
        <div className="max-w-[1120px] mx-auto px-5 md:px-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="font-mono text-[13px] tracking-wide uppercase text-[#A8CBE8] mb-4">Pour les nouveaux bacheliers</div>
            <h1 className="font-serif text-4xl md:text-5xl mb-4">Choisir sa voie, avec l&apos;appui des anciens</h1>
            <p className="text-[#D0E4F2] max-w-[560px] leading-relaxed">
              Lisez le parcours d&apos;un ancien ou posez votre question directement aux conseillers.
            </p>
          </div>
          <button onClick={() => { setFormulaire(true); setEnvoi("idle"); }} className="bg-[#B5966E] text-white font-semibold text-sm px-6 py-3 rounded-sm whitespace-nowrap shrink-0">
            + Partager un témoignage
          </button>
        </div>
      </section>

      <section className="py-14 bg-[#FAFAF8]">
        <div className="max-w-[1120px] mx-auto px-5 md:px-8">

          <h2 className="font-serif text-2xl text-[#1E5A8E] mb-6">Guides d&apos;orientation</h2>
          {chargement ? <div className="text-[#6B6B6B] mb-10">Chargement...</div> : guides.length === 0 ? (
            <div className="text-[#6B6B6B] text-sm mb-10 italic">Aucun guide publié pour le moment.</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[#D5C9B8] border border-[#D5C9B8] mb-14">
              {guides.map((g) => (
                <div key={g.id} className="bg-[#FAFAF8] p-6">
                  <div className="font-mono text-[11px] text-[#5B9BD5] uppercase tracking-wide mb-3">Guide</div>
                  <h4 className="text-[16px] text-[#1E5A8E] mb-2">{g.titre}</h4>
                  <p className="text-[13.5px] text-[#6B6B6B] leading-relaxed">{g.texte}</p>
                  <p className="text-[12px] text-[#9a9a9a] mt-2">Par : {g.auteur}</p>
                </div>
              ))}
            </div>
          )}

          <h2 className="font-serif text-2xl text-[#1E5A8E] mb-6">Témoignages de parcours</h2>
          {!chargement && temoignages.length === 0 ? (
            <div className="text-[#6B6B6B] text-sm mb-14 italic">Aucun témoignage publié pour le moment.</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[#D5C9B8] border border-[#D5C9B8] mb-14">
              {temoignages.map((t) => (
                <div key={t.id} className="bg-[#FAFAF8] p-6">
                  <div className="font-mono text-[11px] text-[#B5966E] uppercase tracking-wide mb-3">Témoignage</div>
                  <h4 className="text-[16px] text-[#1E5A8E] mb-2">{t.titre}</h4>
                  <p className="text-[13.5px] text-[#6B6B6B] leading-relaxed">{t.texte}</p>
                  <p className="text-[12px] text-[#9a9a9a] mt-2">Par : {t.auteur}</p>
                </div>
              ))}
            </div>
          )}

          <div className="bg-[#F0EAE0] border border-[#D5C9B8] rounded p-8 max-w-xl">
            <h3 className="font-serif text-xl text-[#1E5A8E] mb-2">Poser une question à un conseiller</h3>
            <p className="text-[13.5px] text-[#6B6B6B] mb-6 leading-relaxed">
              Ces membres de CANEL-LCBK sont spécialement chargés de l&apos;orientation des nouveaux bacheliers.
            </p>
            <div className="flex flex-col gap-4">
              {conseillers.map((m) => (
                <div key={m.nom} className="bg-white border border-[#D5C9B8] rounded p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <div className="text-[14px] font-semibold text-[#1E5A8E]">{m.nom}</div>
                    <div className="text-[12px] text-[#6B6B6B]">Conseiller d&apos;orientation</div>
                  </div>
                  <div className="flex gap-2">
                    <a href={"https://wa.me/" + m.whatsapp} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 bg-[#25D366] text-white text-[12px] font-medium px-3 py-2 rounded-sm">WA</a>
                    <a href={"mailto:" + m.mail} className="inline-flex items-center gap-1.5 border border-[#1E5A8E] text-[#1E5A8E] text-[12px] font-medium px-3 py-2 rounded-sm">Email</a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {formulaire && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-30 p-6" onClick={() => setFormulaire(false)}>
          <div className="bg-[#FAFAF8] rounded max-w-lg w-full p-8 border border-[#D5C9B8] max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <h3 className="font-serif text-2xl text-[#1E5A8E] mb-2">Partager un témoignage ou un guide</h3>
            <p className="text-[13.5px] text-[#6B6B6B] mb-6">Votre contribution sera examinée par le bureau avant publication.</p>
            {envoi === "succes" ? (
              <div>
                <p className="text-green-600 font-medium mb-4">Soumis avec succès ! Le bureau validera prochainement.</p>
                <button onClick={() => setFormulaire(false)} className="bg-[#1E5A8E] text-white text-sm font-medium px-5 py-2.5 rounded-sm">Fermer</button>
              </div>
            ) : (
              <form onSubmit={soumettre} className="flex flex-col gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#1E5A8E] mb-1">Type de contribution</label>
                  <select value={nouveau.type} onChange={(e) => setNouveau({ ...nouveau, type: e.target.value })} className="w-full border border-[#D5C9B8] bg-white rounded-sm px-4 py-2.5 text-sm focus:outline-none focus:border-[#1E5A8E]">
                    <option value="Témoignage">Témoignage de parcours</option>
                    <option value="Guide">Guide d&apos;orientation</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#1E5A8E] mb-1">Titre</label>
                  <input type="text" required value={nouveau.titre} onChange={(e) => setNouveau({ ...nouveau, titre: e.target.value })} placeholder="ex : De la Bénédiction à l'université" className="w-full border border-[#D5C9B8] bg-white rounded-sm px-4 py-2.5 text-sm focus:outline-none focus:border-[#1E5A8E]" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#1E5A8E] mb-1">Contenu</label>
                  <textarea required value={nouveau.texte} onChange={(e) => setNouveau({ ...nouveau, texte: e.target.value })} rows={5} placeholder="Partagez votre parcours ou vos conseils..." className="w-full border border-[#D5C9B8] bg-white rounded-sm px-4 py-2.5 text-sm focus:outline-none focus:border-[#1E5A8E]" />
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