import AuthGuard from "../components/AuthGuard";
"use client";
export const dynamic = "force-dynamic";

import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { supabase } from "../lib/supabase";
import { SkeletonCard } from "../components/Skeleton";

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

export default function Annuaire() {
  const [session, setSession] = useState<boolean | null>(null);
  const [anciens, setAnciens] = useState<Ancien[]>([]);
  const [chargement, setChargement] = useState(true);
  const [recherche, setRecherche] = useState("");
  const [promo, setPromo] = useState("Toutes");
  const [secteur, setSecteur] = useState("Tous");
  const [selection, setSelection] = useState<Ancien | null>(null);
  const [formulaire, setFormulaire] = useState(false);
  const [nouveau, setNouveau] = useState({ nom: "", prenom: "", promotion: "", filiere: "", secteur: "", ville: "" });
  const [photo, setPhoto] = useState<File | null>(null);
  const [apercu, setApercu] = useState<string | null>(null);
  const [envoi, setEnvoi] = useState<"idle" | "chargement" | "succes" | "erreur">("idle");

  // Vérification session
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(!!session);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(!!session);
    });
    return () => subscription.unsubscribe();
  }, []);

  // Chargement annuaire
  useEffect(() => { chargerAnciens(); }, []);

  async function chargerAnciens() {
    setChargement(true);
    const { data } = await supabase.from("anciens").select("*").eq("statut", "validé").order("promotion", { ascending: false });
    setAnciens(data || []);
    setChargement(false);
  }

  function choisirPhoto(e: React.ChangeEvent<HTMLInputElement>) {
    const fichier = e.target.files?.[0];
    if (!fichier) return;
    setPhoto(fichier);
    setApercu(URL.createObjectURL(fichier));
  }

  async function inscrire(e: React.FormEvent) {
    e.preventDefault();
    setEnvoi("chargement");
    let photo_url: string | null = null;
    if (photo) {
      const ext = photo.name.split(".").pop();
      const nomFichier = `${Date.now()}.${ext}`;
      const { error: uploadError } = await supabase.storage.from("photos").upload(nomFichier, photo, { contentType: photo.type });
      if (!uploadError) {
        const { data: urlData } = supabase.storage.from("photos").getPublicUrl(nomFichier);
        photo_url = urlData.publicUrl;
      }
    }
    const { error } = await supabase.from("anciens").insert([{ ...nouveau, photo_url }]);
    if (error) { setEnvoi("erreur"); }
    else {
      setEnvoi("succes");
      setNouveau({ nom: "", prenom: "", promotion: "", filiere: "", secteur: "", ville: "" });
      setPhoto(null);
      setApercu(null);
      chargerAnciens();
    }
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

  // Chargement session
  if (session === null) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-[#6B6B6B]">Chargement...</div>
      </div>
    );
  }

  // Accès bloqué pour les visiteurs
  if (!session) {
    return (
      <>
        <section className="bg-[#1E5A8E] text-white py-16">
          <div className="max-w-[1120px] mx-auto px-5 md:px-8">
            <div className="font-mono text-[13px] tracking-wide uppercase text-[#A8CBE8] mb-4">CANEL-LCBK</div>
            <h1 className="font-serif text-4xl md:text-5xl mb-4">L&apos;annuaire des anciens</h1>
            <p className="text-[#D0E4F2] max-w-[560px] leading-relaxed">
              Retrouvez un ancien par promotion, filière ou secteur d&apos;activité.
            </p>
          </div>
        </section>

        <section className="py-24 bg-[#FAFAF8]">
          <div className="max-w-[480px] mx-auto px-5 text-center">
            <div className="w-20 h-20 rounded-full bg-[#F0EAE0] border border-[#D5C9B8] flex items-center justify-center mx-auto mb-6">
              <svg width="32" height="32" fill="none" stroke="#B5966E" strokeWidth="1.5" viewBox="0 0 24 24">
                <rect x="3" y="11" width="18" height="11" rx="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
            </div>
            <h2 className="font-serif text-2xl text-[#1E5A8E] mb-3">Accès réservé aux membres</h2>
            <p className="text-[#6B6B6B] text-[14px] leading-relaxed mb-8">
              L&apos;annuaire est réservé aux membres connectés de CANEL-LCBK.
              Créez un compte pour accéder aux profils des anciens élèves.
            </p>
            <div className="flex flex-col gap-3">
              <Link href="/connexion"
                className="bg-[#1E5A8E] text-white font-medium px-6 py-3.5 rounded-sm text-sm text-center hover:bg-[#2970AA] transition">
                Se connecter
              </Link>
              <Link href="/inscription"
                className="border border-[#1E5A8E] text-[#1E5A8E] font-medium px-6 py-3.5 rounded-sm text-sm text-center hover:bg-[#F0EAE0] transition">
                Créer un compte
              </Link>
            </div>
          </div>
        </section>
      </>
    );
  }

  // Annuaire complet pour les membres connectés
  return (
    <>
      <section className="bg-[#1E5A8E] text-white py-16">
        <div className="max-w-[1120px] mx-auto px-5 md:px-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="font-mono text-[13px] tracking-wide uppercase text-[#A8CBE8] mb-4">CANEL-LCBK</div>
            <h1 className="font-serif text-4xl md:text-5xl mb-4">L&apos;annuaire des anciens</h1>
            <p className="text-[#D0E4F2] max-w-[560px] leading-relaxed">Retrouvez un ancien par promotion, filière ou secteur d&apos;activité.</p>
          </div>
          <button onClick={() => { setFormulaire(true); setEnvoi("idle"); }}
            className="bg-[#B5966E] text-white font-semibold text-sm px-6 py-3 rounded-sm whitespace-nowrap shrink-0 hover:bg-[#8B7355] transition">
            + M&apos;inscrire dans l&apos;annuaire
          </button>
        </div>
      </section>

      <section className="py-12 bg-[#FAFAF8]">
        <div className="max-w-[1120px] mx-auto px-5 md:px-8">
          <div className="flex flex-col sm:flex-row flex-wrap gap-3 mb-4">
            <input type="text" placeholder="Rechercher un nom..." value={recherche}
              onChange={(e) => setRecherche(e.target.value)}
              className="border border-[#D5C9B8] bg-white rounded-sm px-4 py-2.5 text-sm w-full sm:flex-1 sm:min-w-[200px] focus:outline-none focus:border-[#1E5A8E]" />
            <select value={promo} onChange={(e) => setPromo(e.target.value)}
              className="border border-[#D5C9B8] bg-white rounded-sm px-4 py-2.5 text-sm w-full sm:w-auto">
              {promotions.map((p) => <option key={p} value={p}>{p === "Toutes" ? "Promotion" : p}</option>)}
            </select>
            <select value={secteur} onChange={(e) => setSecteur(e.target.value)}
              className="border border-[#D5C9B8] bg-white rounded-sm px-4 py-2.5 text-sm w-full sm:w-auto">
              {secteurs.map((s) => <option key={s} value={s}>{s === "Tous" ? "Secteur d'activité" : s}</option>)}
            </select>
          </div>

          {chargement ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-px bg-[#D5C9B8] border border-[#D5C9B8]">
              {[...Array(6)].map((_, i) => <SkeletonCard key={i} />)}
            </div>
          ) : anciens.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-[#6B6B6B] mb-4">L&apos;annuaire est vide pour l&apos;instant.</p>
              <button onClick={() => { setFormulaire(true); setEnvoi("idle"); }}
                className="bg-[#1E5A8E] text-white text-sm font-medium px-5 py-2.5 rounded-sm">
                Être le premier à s&apos;inscrire
              </button>
            </div>
          ) : (
            <>
              <div className="text-[12.5px] text-[#9a9a9a] italic mb-6">
                {resultats.length} membre{resultats.length > 1 ? "s" : ""} trouvé{resultats.length > 1 ? "s" : ""}
              </div>
              {resultats.length === 0 ? (
                <div className="text-center py-16 text-[#6B6B6B]">Aucun ancien ne correspond à cette recherche.</div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-px bg-[#D5C9B8] border border-[#D5C9B8]">
                  {resultats.map((a) => (
                    <button key={a.id} onClick={() => setSelection(a)}
                      className="bg-[#FAFAF8] p-6 text-left hover:bg-[#F0EAE0] transition cursor-pointer">
                      <div className="mb-4"><Avatar ancien={a} taille={44} /></div>
                      <h4 className="text-[16px] text-[#1E5A8E] mb-1">{a.prenom} {a.nom}</h4>
                      <p className="text-[13px] text-[#6B6B6B] mb-3">Promotion {a.promotion} · {a.ville}</p>
                      <div className="flex gap-2 flex-wrap">
                        <span className="font-mono text-[11px] bg-[#F0EAE0] text-[#6B6B6B] px-2 py-1 rounded-sm">{a.filiere}</span>
                        <span className="font-mono text-[11px] bg-[#F0EAE0] text-[#6B6B6B] px-2 py-1 rounded-sm">{a.secteur}</span>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {selection && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-30 p-6" onClick={() => setSelection(null)}>
          <div className="bg-[#FAFAF8] rounded max-w-md w-full p-8 border border-[#D5C9B8]" onClick={(e) => e.stopPropagation()}>
            <div className="mb-5"><Avatar ancien={selection} taille={80} /></div>
            <h3 className="font-serif text-2xl text-[#1E5A8E] mb-1">{selection.prenom} {selection.nom}</h3>
            <p className="text-sm text-[#6B6B6B] mb-5">Promotion {selection.promotion} · {selection.ville}</p>
            <div className="flex gap-2 flex-wrap mb-6">
              <span className="font-mono text-[11px] bg-[#F0EAE0] text-[#6B6B6B] px-2 py-1 rounded-sm">{selection.filiere}</span>
              <span className="font-mono text-[11px] bg-[#F0EAE0] text-[#6B6B6B] px-2 py-1 rounded-sm">{selection.secteur}</span>
            </div>
            <button onClick={() => setSelection(null)} className="bg-[#1E5A8E] text-white text-sm font-medium px-5 py-2.5 rounded-sm">Fermer</button>
          </div>
        </div>
      )}

      {formulaire && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-30 p-6" onClick={() => setFormulaire(false)}>
          <div className="bg-[#FAFAF8] rounded max-w-lg w-full p-8 border border-[#D5C9B8] max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <h3 className="font-serif text-2xl text-[#1E5A8E] mb-2">M&apos;inscrire dans l&apos;annuaire</h3>
            <p className="text-[13.5px] text-[#6B6B6B] mb-6">Vos informations seront visibles par les membres de CANEL-LCBK.</p>
            {envoi === "succes" ? (
              <div>
                <p className="text-green-600 font-medium mb-4">Inscription réussie ! Vous apparaissez maintenant dans l&apos;annuaire.</p>
                <button onClick={() => setFormulaire(false)} className="bg-[#1E5A8E] text-white text-sm font-medium px-5 py-2.5 rounded-sm">Fermer</button>
              </div>
            ) : (
              <form onSubmit={inscrire} className="flex flex-col gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#1E5A8E] mb-1">Photo d&apos;identité (optionnelle)</label>
                  <div className="flex items-center gap-4">
                    {apercu ? (
                      <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-[#B5966E]">
                        <Image src={apercu} alt="Aperçu" width={64} height={64} className="object-cover w-full h-full" />
                      </div>
                    ) : (
                      <div className="w-16 h-16 rounded-full bg-[#F0EAE0] border-2 border-dashed border-[#D5C9B8] flex items-center justify-center text-[#9a9a9a] text-xs text-center">Photo</div>
                    )}
                    <label className="cursor-pointer bg-[#F0EAE0] border border-[#D5C9B8] text-sm px-4 py-2 rounded-sm hover:bg-white transition">
                      Choisir une photo
                      <input type="file" accept="image/*" className="hidden" onChange={choisirPhoto} />
                    </label>
                  </div>
                </div>
                {[
                  { label: "Prénom", key: "prenom", placeholder: "Votre prénom" },
                  { label: "Nom", key: "nom", placeholder: "Votre nom de famille" },
                  { label: "Promotion (année)", key: "promotion", placeholder: "ex : 2018" },
                  { label: "Filière suivie", key: "filiere", placeholder: "ex : Sciences, Littéraire, Économie" },
                  { label: "Secteur d'activité actuel", key: "secteur", placeholder: "ex : Santé, Informatique, Éducation" },
                  { label: "Ville actuelle", key: "ville", placeholder: "ex : N'Djamena, Sarh, Kyabé" },
                ].map((f) => (
                  <div key={f.key}>
                    <label className="block text-sm font-medium text-[#1E5A8E] mb-1">{f.label}</label>
                    <input type="text" placeholder={f.placeholder} required
                      value={nouveau[f.key as keyof typeof nouveau]}
                      onChange={(e) => setNouveau({ ...nouveau, [f.key]: e.target.value })}
                      className="w-full border border-[#D5C9B8] bg-white rounded-sm px-4 py-2.5 text-sm focus:outline-none focus:border-[#1E5A8E]" />
                  </div>
                ))}
                {envoi === "erreur" && <p className="text-red-600 text-sm">Une erreur s&apos;est produite. Vérifiez votre connexion et réessayez.</p>}
                <div className="flex gap-3 mt-2">
                  <button type="submit" disabled={envoi === "chargement"}
                    className="bg-[#1E5A8E] text-white text-sm font-medium px-5 py-2.5 rounded-sm disabled:opacity-60">
                    {envoi === "chargement" ? "Enregistrement..." : "S'inscrire"}
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