"use client";

import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";

const MOT_DE_PASSE = "canel2026@admin";

type Ancien = { id: string; prenom: string; nom: string; promotion: string; filiere: string; secteur: string; ville: string; statut: string; photo_url: string | null; };
type Actu = { id: string; titre: string; contenu: string; tag: string; auteur: string; statut: string; };
type Offre = { id: string; titre: string; type: string; lieu: string; auteur: string; description: string; statut: string; };

export default function Admin() {
  const [connecte, setConnecte] = useState(false);
  const [mdp, setMdp] = useState("");
  const [voirMdp, setVoirMdp] = useState(false);
  const [erreurMdp, setErreurMdp] = useState(false);
  const [onglet, setOnglet] = useState<"annuaire" | "actualites" | "offres">("annuaire");
  const [anciens, setAnciens] = useState<Ancien[]>([]);
  const [actus, setActus] = useState<Actu[]>([]);
  const [offres, setOffres] = useState<Offre[]>([]);
  const [chargement, setChargement] = useState(false);

  function connecter(e: React.FormEvent) {
    e.preventDefault();
    if (mdp === MOT_DE_PASSE) { setConnecte(true); setErreurMdp(false); }
    else { setErreurMdp(true); }
  }

  useEffect(() => { if (connecte) chargerTout(); }, [connecte]);

  async function chargerTout() {
    setChargement(true);
    const [a, ac, of] = await Promise.all([
      supabase.from("anciens").select("*").order("created_at", { ascending: false }),
      supabase.from("actualites").select("*").order("created_at", { ascending: false }),
      supabase.from("offres").select("*").order("created_at", { ascending: false }),
    ]);
    setAnciens(a.data || []);
    setActus(ac.data || []);
    setOffres(of.data || []);
    setChargement(false);
  }

  async function valider(table: string, id: string) {
    await supabase.from(table).update({ statut: "validé" }).eq("id", id);
    chargerTout();
  }

  async function rejeter(table: string, id: string) {
    await supabase.from(table).update({ statut: "rejeté" }).eq("id", id);
    chargerTout();
  }

  async function supprimer(table: string, id: string) {
    if (!confirm("Confirmer la suppression définitive ?")) return;
    await supabase.from(table).delete().eq("id", id);
    chargerTout();
  }

  function Badge({ statut }: { statut: string }) {
    const s: Record<string, string> = { "en_attente": "bg-yellow-100 text-yellow-800", "validé": "bg-green-100 text-green-800", "rejeté": "bg-red-100 text-red-800" };
    return <span className={"font-mono text-[11px] px-2 py-1 rounded-sm " + (s[statut] || "bg-gray-100 text-gray-800")}>{statut}</span>;
  }

  function Actions({ table, item }: { table: string; item: { id: string; statut: string } }) {
    return (
      <div className="flex gap-2 flex-wrap mt-3">
        {item.statut !== "validé" && <button onClick={() => valider(table, item.id)} className="bg-green-600 text-white text-[12px] px-3 py-1.5 rounded-sm">Valider</button>}
        {item.statut !== "rejeté" && <button onClick={() => rejeter(table, item.id)} className="bg-yellow-500 text-white text-[12px] px-3 py-1.5 rounded-sm">Rejeter</button>}
        <button onClick={() => supprimer(table, item.id)} className="bg-red-600 text-white text-[12px] px-3 py-1.5 rounded-sm">Supprimer</button>
      </div>
    );
  }

  if (!connecte) {
    return (
      <div className="min-h-screen bg-[#1E5A8E] flex items-center justify-center p-6">
        <div className="bg-white rounded p-8 max-w-sm w-full">
          <h1 className="font-serif text-2xl text-[#1E5A8E] mb-2">Administration</h1>
          <p className="text-[13.5px] text-[#6B6B6B] mb-6">CANEL-LCBK — accès réservé au bureau</p>
          <form onSubmit={connecter} className="flex flex-col gap-4">
            <div>
              <label className="block text-sm font-medium text-[#1E5A8E] mb-1">Mot de passe</label>
              <div className="relative">
                <input
                  type={voirMdp ? "text" : "password"}
                  value={mdp}
                  onChange={(e) => setMdp(e.target.value)}
                  required
                  className="w-full border border-[#D5C9B8] rounded-sm px-4 py-2.5 pr-16 text-sm focus:outline-none focus:border-[#1E5A8E]"
                />
                <button type="button" onClick={() => setVoirMdp(!voirMdp)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[12px] text-[#6B6B6B] hover:text-[#1E5A8E]">
                  {voirMdp ? "Cacher" : "Voir"}
                </button>
              </div>
            </div>
            {erreurMdp && <p className="text-red-600 text-sm">Mot de passe incorrect.</p>}
            <button type="submit" className="bg-[#1E5A8E] text-white font-medium px-5 py-2.5 rounded-sm">Accéder</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFAF8]">
      <div className="bg-[#1E5A8E] text-white px-5 md:px-8 py-4 flex justify-between items-center">
        <span className="font-serif text-lg">Administration CANEL-LCBK</span>
        <button onClick={() => setConnecte(false)} className="text-sm text-[#A8CBE8] hover:text-white">Déconnexion</button>
      </div>

      <div className="max-w-[1120px] mx-auto px-5 md:px-8 py-8">
        <div className="flex gap-2 mb-8 border-b border-[#D5C9B8] pb-4 flex-wrap">
          {(["annuaire", "actualites", "offres"] as const).map((o) => (
            <button key={o} onClick={() => setOnglet(o)} className={"px-5 py-2 rounded-sm text-sm font-medium transition " + (onglet === o ? "bg-[#1E5A8E] text-white" : "bg-[#F0EAE0] text-[#6B6B6B]")}>
              {o === "annuaire" ? "Annuaire" : o === "actualites" ? "Actualités" : "Offres"}
            </button>
          ))}
          <button onClick={chargerTout} className="ml-auto px-4 py-2 text-sm text-[#6B6B6B] border border-[#D5C9B8] rounded-sm">Actualiser</button>
        </div>

        {chargement ? <div className="text-center py-20 text-[#6B6B6B]">Chargement...</div> : (
          <>
            {onglet === "annuaire" && (
              <div>
                <div className="flex justify-between items-baseline mb-4">
                  <h2 className="font-serif text-xl text-[#1E5A8E]">Membres inscrits</h2>
                  <span className="text-sm text-[#6B6B6B]">{anciens.filter(a => a.statut === "en_attente").length} en attente · {anciens.filter(a => a.statut === "validé").length} validés</span>
                </div>
                <div className="flex flex-col gap-px bg-[#D5C9B8] border border-[#D5C9B8]">
                  {anciens.length === 0 && <div className="bg-[#FAFAF8] p-6 text-[#6B6B6B]">Aucun membre inscrit.</div>}
                  {anciens.map((a) => (
                    <div key={a.id} className="bg-[#FAFAF8] p-5">
                      <div className="flex justify-between items-start flex-wrap gap-2">
                        <div>
                          <h4 className="text-[15px] font-semibold text-[#1E5A8E]">{a.prenom} {a.nom}</h4>
                          <p className="text-[13px] text-[#6B6B6B]">Promotion {a.promotion} · {a.ville} · {a.filiere} · {a.secteur}</p>
                        </div>
                        <Badge statut={a.statut} />
                      </div>
                      <Actions table="anciens" item={a} />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {onglet === "actualites" && (
              <div>
                <div className="flex justify-between items-baseline mb-4">
                  <h2 className="font-serif text-xl text-[#1E5A8E]">Actualités soumises</h2>
                  <span className="text-sm text-[#6B6B6B]">{actus.filter(a => a.statut === "en_attente").length} en attente</span>
                </div>
                <div className="flex flex-col gap-px bg-[#D5C9B8] border border-[#D5C9B8]">
                  {actus.length === 0 && <div className="bg-[#FAFAF8] p-6 text-[#6B6B6B]">Aucune actualité soumise.</div>}
                  {actus.map((a) => (
                    <div key={a.id} className="bg-[#FAFAF8] p-5">
                      <div className="flex justify-between items-start flex-wrap gap-2">
                        <div>
                          <span className="font-mono text-[11px] bg-[#B5966E] text-white px-2 py-0.5 rounded-sm mr-2">{a.tag}</span>
                          <h4 className="text-[15px] font-semibold text-[#1E5A8E] mt-1">{a.titre}</h4>
                          <p className="text-[13px] text-[#6B6B6B] mt-1">{a.contenu}</p>
                          <p className="text-[12px] text-[#9a9a9a] mt-1">Par : {a.auteur}</p>
                        </div>
                        <Badge statut={a.statut} />
                      </div>
                      <Actions table="actualites" item={a} />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {onglet === "offres" && (
              <div>
                <div className="flex justify-between items-baseline mb-4">
                  <h2 className="font-serif text-xl text-[#1E5A8E]">Offres soumises</h2>
                  <span className="text-sm text-[#6B6B6B]">{offres.filter(o => o.statut === "en_attente").length} en attente</span>
                </div>
                <div className="flex flex-col gap-px bg-[#D5C9B8] border border-[#D5C9B8]">
                  {offres.length === 0 && <div className="bg-[#FAFAF8] p-6 text-[#6B6B6B]">Aucune offre soumise.</div>}
                  {offres.map((o) => (
                    <div key={o.id} className="bg-[#FAFAF8] p-5">
                      <div className="flex justify-between items-start flex-wrap gap-2">
                        <div>
                          <span className="font-mono text-[11px] bg-[#1E5A8E] text-white px-2 py-0.5 rounded-sm mr-2">{o.type}</span>
                          <h4 className="text-[15px] font-semibold text-[#1E5A8E] mt-1">{o.titre}</h4>
                          <p className="text-[13px] text-[#6B6B6B]">{o.lieu} · Par : {o.auteur}</p>
                          {o.description && <p className="text-[13px] text-[#6B6B6B] mt-1">{o.description}</p>}
                        </div>
                        <Badge statut={o.statut} />
                      </div>
                      <Actions table="offres" item={o} />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}