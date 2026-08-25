"use client";

import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";

const MOT_DE_PASSE = "canel2026@admin";

type Ancien = { id: string; prenom: string; nom: string; promotion: string; filiere: string; secteur: string; ville: string; statut: string; photo_url: string | null; };
type Actu = { id: string; titre: string; contenu: string; tag: string; auteur: string; statut: string; };
type Offre = { id: string; titre: string; type: string; lieu: string; auteur: string; description: string; statut: string; };
type MembreBureau = { id: string; nom: string; role: string; whatsapp: string; mail: string; ordre: number; };
type Conseiller = { id: string; nom: string; whatsapp: string; mail: string; ordre: number; };

export default function Admin() {
  const [connecte, setConnecte] = useState(false);
  const [mdp, setMdp] = useState("");
  const [voirMdp, setVoirMdp] = useState(false);
  const [erreurMdp, setErreurMdp] = useState(false);
  const [onglet, setOnglet] = useState<"annuaire" | "actualites" | "offres" | "orientation" | "bureau" | "conseillers">("annuaire");
  const [anciens, setAnciens] = useState<Ancien[]>([]);
  const [actus, setActus] = useState<Actu[]>([]);
  const [offres, setOffres] = useState<Offre[]>([]);
  const [orientations, setOrientations] = useState<{id:string;type:string;titre:string;texte:string;auteur:string;statut:string}[]>([]);
  const [chargement, setChargement] = useState(false);
  const [bureau, setBureau] = useState<MembreBureau[]>([]);
  const [modalBureau, setModalBureau] = useState<"" | "ajouter" | "modifier" | "supprimer">("");
  const [selectionBureau, setSelectionBureau] = useState<MembreBureau | null>(null);
  const [formBureau, setFormBureau] = useState({ nom: "", role: "", whatsapp: "", mail: "", ordre: 0 });
  const [envoiBureau, setEnvoiBureau] = useState<"idle" | "chargement" | "succes" | "erreur">("idle");
  const [conseillers, setConseillers] = useState<Conseiller[]>([]);
  const [modalConseiller, setModalConseiller] = useState<"" | "ajouter" | "modifier" | "supprimer">("");
  const [selectionConseiller, setSelectionConseiller] = useState<Conseiller | null>(null);
  const [formConseiller, setFormConseiller] = useState({ nom: "", whatsapp: "", mail: "", ordre: 0 });
  const [envoisConseiller, setEnvoisConseiller] = useState<"idle" | "chargement" | "succes" | "erreur">("idle");
  
  function connecter(e: React.FormEvent) {
    e.preventDefault();
    if (mdp === MOT_DE_PASSE) { setConnecte(true); setErreurMdp(false); }
    else { setErreurMdp(true); }
  }

  useEffect(() => { if (connecte) chargerTout(); }, [connecte]);

 async function chargerTout() {
  setChargement(true);
  const [a, ac, of, or, bu, co] = await Promise.all([
    supabase.from("anciens").select("*").order("created_at", { ascending: false }),
    supabase.from("actualites").select("*").order("created_at", { ascending: false }),
    supabase.from("offres").select("*").order("created_at", { ascending: false }),
    supabase.from("orientation").select("*").order("created_at", { ascending: false }),
    supabase.from("bureau").select("*").order("ordre"),
    supabase.from("conseillers").select("*").order("ordre"),
  ]);
  setAnciens(a.data || []);
  setActus(ac.data || []);
  setOffres(of.data || []);
  setOrientations(or.data || []);
  setBureau(bu.data || []);
  setConseillers(co.data || []);
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

  async function ajouterMembre(e: React.FormEvent) {
    e.preventDefault();
    setEnvoiBureau("chargement");
    const { error } = await supabase.from("bureau").insert([formBureau]);
    if (error) { setEnvoiBureau("erreur"); }
    else { setEnvoiBureau("succes"); chargerTout(); }
  }

  async function modifierMembre(e: React.FormEvent) {
    e.preventDefault();
    if (!selectionBureau) return;
    setEnvoiBureau("chargement");
    const { error } = await supabase.from("bureau").update(formBureau).eq("id", selectionBureau.id);
    if (error) { setEnvoiBureau("erreur"); }
    else { setEnvoiBureau("succes"); chargerTout(); }
  }

  async function supprimerMembre() {
    if (!selectionBureau) return;
    setEnvoiBureau("chargement");
    await supabase.from("bureau").delete().eq("id", selectionBureau.id);
    setModalBureau("");
    chargerTout();
  }

  async function ajouterConseiller(e: React.FormEvent) {
  e.preventDefault();
  setEnvoisConseiller("chargement");
  const { error } = await supabase.from("conseillers").insert([formConseiller]);
  if (error) { setEnvoisConseiller("erreur"); }
  else { setEnvoisConseiller("succes"); chargerTout(); }
}

async function modifierConseiller(e: React.FormEvent) {
  e.preventDefault();
  if (!selectionConseiller) return;
  setEnvoisConseiller("chargement");
  const { error } = await supabase.from("conseillers").update(formConseiller).eq("id", selectionConseiller.id);
  if (error) { setEnvoisConseiller("erreur"); }
  else { setEnvoisConseiller("succes"); chargerTout(); }
}

async function supprimerConseiller() {
  if (!selectionConseiller) return;
  setEnvoisConseiller("chargement");
  await supabase.from("conseillers").delete().eq("id", selectionConseiller.id);
  setModalConseiller("");
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
          {(["annuaire", "actualites", "offres", "orientation", "bureau", "conseillers"] as const).map((o) => (
  <button key={o} onClick={() => setOnglet(o)} className={"px-5 py-2 rounded-sm text-sm font-medium transition " + (onglet === o ? "bg-[#1E5A8E] text-white" : "bg-[#F0EAE0] text-[#6B6B6B]")}>
    {o === "annuaire" ? "Annuaire" : o === "actualites" ? "Actualités" : o === "offres" ? "Offres" : o === "orientation" ? "Orientation" : o === "bureau" ? "Bureau" : "Conseillers"}
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

            {onglet === "orientation" && (
              <div>
                <div className="flex justify-between items-baseline mb-4">
                  <h2 className="font-serif text-xl text-[#1E5A8E]">Témoignages et guides soumis</h2>
                  <span className="text-sm text-[#6B6B6B]">{orientations.filter(o => o.statut === "en_attente").length} en attente</span>
                </div>
                <div className="flex flex-col gap-px bg-[#D5C9B8] border border-[#D5C9B8]">
                  {orientations.length === 0 && <div className="bg-[#FAFAF8] p-6 text-[#6B6B6B]">Aucune soumission.</div>}
                  {orientations.map((o) => (
                    <div key={o.id} className="bg-[#FAFAF8] p-5">
                      <div className="flex justify-between items-start flex-wrap gap-2">
                        <div>
                          <span className="font-mono text-[11px] bg-[#5B9BD5] text-white px-2 py-0.5 rounded-sm mr-2">{o.type}</span>
                          <h4 className="text-[15px] font-semibold text-[#1E5A8E] mt-1">{o.titre}</h4>
                          <p className="text-[13px] text-[#6B6B6B] mt-1">{o.texte}</p>
                          <p className="text-[12px] text-[#9a9a9a] mt-1">Par : {o.auteur}</p>
                        </div>
                        <Badge statut={o.statut} />
                      </div>
                      <Actions table="orientation" item={o} />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {onglet === "bureau" && (
              <div>
                <div className="flex justify-between items-baseline mb-4">
                  <h2 className="font-serif text-xl text-[#1E5A8E]">Membres du bureau</h2>
                  <button
                    onClick={() => { setModalBureau("ajouter"); setFormBureau({ nom: "", role: "", whatsapp: "", mail: "", ordre: bureau.length + 1 }); setEnvoiBureau("idle"); }}
                    className="bg-[#1E5A8E] text-white text-sm font-medium px-4 py-2 rounded-sm"
                  >
                    + Ajouter
                  </button>
                </div>
                <div className="flex flex-col gap-px bg-[#D5C9B8] border border-[#D5C9B8]">
                  {bureau.length === 0 && <div className="bg-[#FAFAF8] p-6 text-[#6B6B6B]">Aucun responsable enregistré.</div>}
                  {bureau.map((m) => (
                    <div key={m.id} className="bg-[#FAFAF8] p-5 flex justify-between items-start flex-wrap gap-2">
                      <div>
                        <h4 className="text-[15px] font-semibold text-[#1E5A8E]">{m.nom}</h4>
                        <p className="text-[13px] text-[#6B6B6B]">{m.role} · Ordre : {m.ordre}</p>
                        {m.whatsapp && <p className="text-[12px] text-[#9a9a9a]">WhatsApp : {m.whatsapp}</p>}
                        {m.mail && <p className="text-[12px] text-[#9a9a9a]">Email : {m.mail}</p>}
                        <div className="flex gap-2 mt-3">
                          <button
                            onClick={() => { setSelectionBureau(m); setFormBureau({ nom: m.nom, role: m.role, whatsapp: m.whatsapp, mail: m.mail, ordre: m.ordre }); setModalBureau("modifier"); setEnvoiBureau("idle"); }}
                            className="bg-[#1E5A8E] text-white text-[12px] px-3 py-1.5 rounded-sm"
                          >
                            Modifier
                          </button>
                          <button
                            onClick={() => { setSelectionBureau(m); setModalBureau("supprimer"); setEnvoiBureau("idle"); }}
                            className="bg-red-600 text-white text-[12px] px-3 py-1.5 rounded-sm"
                          >
                            Supprimer
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {onglet === "conseillers" && (
  <div>
    <div className="flex justify-between items-baseline mb-4">
      <h2 className="font-serif text-xl text-[#1E5A8E]">Conseillers d&apos;orientation</h2>
      <button
        onClick={() => { setModalConseiller("ajouter"); setFormConseiller({ nom: "", whatsapp: "", mail: "", ordre: conseillers.length + 1 }); setEnvoisConseiller("idle"); }}
        className="bg-[#1E5A8E] text-white text-sm font-medium px-4 py-2 rounded-sm"
      >
        + Ajouter
      </button>
    </div>
    <div className="flex flex-col gap-px bg-[#D5C9B8] border border-[#D5C9B8]">
      {conseillers.length === 0 && <div className="bg-[#FAFAF8] p-6 text-[#6B6B6B]">Aucun conseiller enregistré.</div>}
      {conseillers.map((c) => (
        <div key={c.id} className="bg-[#FAFAF8] p-5 flex justify-between items-start flex-wrap gap-2">
          <div>
            <h4 className="text-[15px] font-semibold text-[#1E5A8E]">{c.nom}</h4>
            <p className="text-[13px] text-[#6B6B6B]">Conseiller d&apos;orientation · Ordre : {c.ordre}</p>
            {c.whatsapp && <p className="text-[12px] text-[#9a9a9a]">WhatsApp : {c.whatsapp}</p>}
            {c.mail && <p className="text-[12px] text-[#9a9a9a]">Email : {c.mail}</p>}
            <div className="flex gap-2 mt-3">
              <button
                onClick={() => { setSelectionConseiller(c); setFormConseiller({ nom: c.nom, whatsapp: c.whatsapp, mail: c.mail, ordre: c.ordre }); setModalConseiller("modifier"); setEnvoisConseiller("idle"); }}
                className="bg-[#1E5A8E] text-white text-[12px] px-3 py-1.5 rounded-sm"
              >
                Modifier
              </button>
              <button
                onClick={() => { setSelectionConseiller(c); setModalConseiller("supprimer"); setEnvoisConseiller("idle"); }}
                className="bg-red-600 text-white text-[12px] px-3 py-1.5 rounded-sm"
              >
                Supprimer
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
)}

{/* Modals conseillers */}
{(modalConseiller === "ajouter" || modalConseiller === "modifier") && (
  <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-30 p-6" onClick={() => setModalConseiller("")}>
    <div className="bg-[#FAFAF8] rounded max-w-lg w-full p-8 border border-[#D5C9B8] max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
      <h3 className="font-serif text-2xl text-[#1E5A8E] mb-6">
        {modalConseiller === "ajouter" ? "Ajouter un conseiller" : "Modifier le conseiller"}
      </h3>
      {envoisConseiller === "succes" ? (
        <div>
          <p className="text-green-600 font-medium mb-4">✓ Opération effectuée avec succès.</p>
          <button onClick={() => setModalConseiller("")} className="bg-[#1E5A8E] text-white text-sm font-medium px-5 py-2.5 rounded-sm">Fermer</button>
        </div>
      ) : (
        <form onSubmit={modalConseiller === "ajouter" ? ajouterConseiller : modifierConseiller} className="flex flex-col gap-4">
          <div className="flex gap-3">
            <div className="flex-1">
              <label className="block text-sm font-medium text-[#1E5A8E] mb-1">Nom complet</label>
              <input type="text" required value={formConseiller.nom} onChange={(e) => setFormConseiller({ ...formConseiller, nom: e.target.value })}
                className="w-full border border-[#D5C9B8] bg-white rounded-sm px-4 py-2.5 text-sm focus:outline-none focus:border-[#1E5A8E]" />
            </div>
            <div className="w-24">
              <label className="block text-sm font-medium text-[#1E5A8E] mb-1">Ordre</label>
              <input type="number" value={formConseiller.ordre} onChange={(e) => setFormConseiller({ ...formConseiller, ordre: parseInt(e.target.value) })}
                className="w-full border border-[#D5C9B8] bg-white rounded-sm px-4 py-2.5 text-sm focus:outline-none focus:border-[#1E5A8E]" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-[#1E5A8E] mb-1">Numéro WhatsApp</label>
            <input type="text" value={formConseiller.whatsapp} onChange={(e) => setFormConseiller({ ...formConseiller, whatsapp: e.target.value })}
              placeholder="ex : 23565627095" className="w-full border border-[#D5C9B8] bg-white rounded-sm px-4 py-2.5 text-sm focus:outline-none focus:border-[#1E5A8E]" />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#1E5A8E] mb-1">Email</label>
            <input type="email" value={formConseiller.mail} onChange={(e) => setFormConseiller({ ...formConseiller, mail: e.target.value })}
              className="w-full border border-[#D5C9B8] bg-white rounded-sm px-4 py-2.5 text-sm focus:outline-none focus:border-[#1E5A8E]" />
          </div>
          {envoisConseiller === "erreur" && <p className="text-red-600 text-sm">Une erreur s&apos;est produite. Réessayez.</p>}
          <div className="flex gap-3 mt-2">
            <button type="submit" disabled={envoisConseiller === "chargement"}
              className="bg-[#1E5A8E] text-white text-sm font-medium px-5 py-2.5 rounded-sm disabled:opacity-60">
              {envoisConseiller === "chargement" ? "Enregistrement..." : "Enregistrer"}
            </button>
            <button type="button" onClick={() => setModalConseiller("")} className="text-sm text-[#6B6B6B] px-4 py-2.5">Annuler</button>
          </div>
        </form>
      )}
    </div>
  </div>
)}

{modalConseiller === "supprimer" && selectionConseiller && (
  <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-30 p-6" onClick={() => setModalConseiller("")}>
    <div className="bg-[#FAFAF8] rounded max-w-sm w-full p-8 border border-[#D5C9B8]" onClick={(e) => e.stopPropagation()}>
      <h3 className="font-serif text-xl text-[#1E5A8E] mb-2">Supprimer ce conseiller ?</h3>
      <p className="text-[13.5px] text-[#6B6B6B] mb-6">
        <strong>{selectionConseiller.nom}</strong> sera retiré définitivement.
      </p>
      {envoisConseiller === "erreur" && <p className="text-red-600 text-sm mb-4">Une erreur s&apos;est produite.</p>}
      <div className="flex gap-3">
        <button onClick={supprimerConseiller} disabled={envoisConseiller === "chargement"}
          className="bg-red-600 text-white text-sm font-medium px-5 py-2.5 rounded-sm disabled:opacity-60">
          {envoisConseiller === "chargement" ? "Suppression..." : "Confirmer"}
        </button>
        <button onClick={() => setModalConseiller("")} className="text-sm text-[#6B6B6B] px-4 py-2.5">Annuler</button>
      </div>
    </div>
  </div>
)}
          </>
        )}
      </div>

      {/* Modals bureau */}
      {(modalBureau === "ajouter" || modalBureau === "modifier") && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-30 p-6" onClick={() => setModalBureau("")}>
          <div className="bg-[#FAFAF8] rounded max-w-lg w-full p-8 border border-[#D5C9B8] max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <h3 className="font-serif text-2xl text-[#1E5A8E] mb-6">
              {modalBureau === "ajouter" ? "Ajouter un responsable" : "Modifier le responsable"}
            </h3>
            {envoiBureau === "succes" ? (
              <div>
                <p className="text-green-600 font-medium mb-4">✓ Opération effectuée avec succès.</p>
                <button onClick={() => setModalBureau("")} className="bg-[#1E5A8E] text-white text-sm font-medium px-5 py-2.5 rounded-sm">Fermer</button>
              </div>
            ) : (
              <form onSubmit={modalBureau === "ajouter" ? ajouterMembre : modifierMembre} className="flex flex-col gap-4">
                <div className="flex gap-3">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-[#1E5A8E] mb-1">Nom complet</label>
                    <input type="text" required value={formBureau.nom} onChange={(e) => setFormBureau({ ...formBureau, nom: e.target.value })}
                      className="w-full border border-[#D5C9B8] bg-white rounded-sm px-4 py-2.5 text-sm focus:outline-none focus:border-[#1E5A8E]" />
                  </div>
                  <div className="w-24">
                    <label className="block text-sm font-medium text-[#1E5A8E] mb-1">Ordre</label>
                    <input type="number" value={formBureau.ordre} onChange={(e) => setFormBureau({ ...formBureau, ordre: parseInt(e.target.value) })}
                      className="w-full border border-[#D5C9B8] bg-white rounded-sm px-4 py-2.5 text-sm focus:outline-none focus:border-[#1E5A8E]" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#1E5A8E] mb-1">Rôle / Poste</label>
                  <input type="text" required value={formBureau.role} onChange={(e) => setFormBureau({ ...formBureau, role: e.target.value })}
                    placeholder="ex : Secrétaire général" className="w-full border border-[#D5C9B8] bg-white rounded-sm px-4 py-2.5 text-sm focus:outline-none focus:border-[#1E5A8E]" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#1E5A8E] mb-1">Numéro WhatsApp</label>
                  <input type="text" value={formBureau.whatsapp} onChange={(e) => setFormBureau({ ...formBureau, whatsapp: e.target.value })}
                    placeholder="ex : 23566308130" className="w-full border border-[#D5C9B8] bg-white rounded-sm px-4 py-2.5 text-sm focus:outline-none focus:border-[#1E5A8E]" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#1E5A8E] mb-1">Email</label>
                  <input type="email" value={formBureau.mail} onChange={(e) => setFormBureau({ ...formBureau, mail: e.target.value })}
                    className="w-full border border-[#D5C9B8] bg-white rounded-sm px-4 py-2.5 text-sm focus:outline-none focus:border-[#1E5A8E]" />
                </div>
                {envoiBureau === "erreur" && <p className="text-red-600 text-sm">Une erreur s&apos;est produite. Réessayez.</p>}
                <div className="flex gap-3 mt-2">
                  <button type="submit" disabled={envoiBureau === "chargement"}
                    className="bg-[#1E5A8E] text-white text-sm font-medium px-5 py-2.5 rounded-sm disabled:opacity-60">
                    {envoiBureau === "chargement" ? "Enregistrement..." : "Enregistrer"}
                  </button>
                  <button type="button" onClick={() => setModalBureau("")} className="text-sm text-[#6B6B6B] px-4 py-2.5">Annuler</button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {modalBureau === "supprimer" && selectionBureau && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-30 p-6" onClick={() => setModalBureau("")}>
          <div className="bg-[#FAFAF8] rounded max-w-sm w-full p-8 border border-[#D5C9B8]" onClick={(e) => e.stopPropagation()}>
            <h3 className="font-serif text-xl text-[#1E5A8E] mb-2">Supprimer ce responsable ?</h3>
            <p className="text-[13.5px] text-[#6B6B6B] mb-6">
              <strong>{selectionBureau.nom}</strong> ({selectionBureau.role}) sera retiré définitivement.
            </p>
            {envoiBureau === "erreur" && <p className="text-red-600 text-sm mb-4">Une erreur s&apos;est produite.</p>}
            <div className="flex gap-3">
              <button onClick={supprimerMembre} disabled={envoiBureau === "chargement"}
                className="bg-red-600 text-white text-sm font-medium px-5 py-2.5 rounded-sm disabled:opacity-60">
                {envoiBureau === "chargement" ? "Suppression..." : "Confirmer"}
              </button>
              <button onClick={() => setModalBureau("")} className="text-sm text-[#6B6B6B] px-4 py-2.5">Annuler</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}