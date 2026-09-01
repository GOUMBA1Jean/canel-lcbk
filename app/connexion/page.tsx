"use client";

import { useState } from "react";
import { supabase } from "../lib/supabase";
import Link from "next/link";

export default function Connexion() {
  const [onglet, setOnglet] = useState<"connexion" | "inscription">("connexion");

  // Connexion
  const [loginEmail, setLoginEmail] = useState("");
  const [loginMdp, setLoginMdp] = useState("");
  const [voirLoginMdp, setVoirLoginMdp] = useState(false);
  const [loginErreur, setLoginErreur] = useState("");
  const [loginChargement, setLoginChargement] = useState(false);

  // Inscription
  const [form, setForm] = useState({
    prenom: "", nom: "", promotion: "", filiere: "",
    secteur: "", pays: "Tchad", ville: "", email: "", mdp: "", mdp2: "",
  });
  const [voirMdp, setVoirMdp] = useState(false);
  const [inscErreur, setInscErreur] = useState("");
  const [inscChargement, setInscChargement] = useState(false);
  const [inscSucces, setInscSucces] = useState(false);

  async function connecter(e: React.FormEvent) {
    e.preventDefault();
    setLoginErreur("");
    setLoginChargement(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: loginEmail,
      password: loginMdp,
    });
    if (error) {
      setLoginErreur("Email ou mot de passe incorrect.");
      setLoginChargement(false);
    } else {
      window.location.href = "/annuaire";
    }
  }

  async function inscrire(e: React.FormEvent) {
    e.preventDefault();
    setInscErreur("");
    if (form.mdp !== form.mdp2) {
      setInscErreur("Les deux mots de passe ne correspondent pas.");
      return;
    }
    if (form.mdp.length < 6) {
      setInscErreur("Le mot de passe doit contenir au moins 6 caractères.");
      return;
    }
    setInscChargement(true);

    // 1. Créer le compte Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: form.email,
      password: form.mdp,
      options: {
        data: { prenom: form.prenom, nom: form.nom },
      },
    });

    if (authError) {
      setInscErreur("Erreur lors de la création du compte : " + authError.message);
      setInscChargement(false);
      return;
    }

    // 2. Créer l'entrée dans l'annuaire
    const { error: dbError } = await supabase.from("anciens").insert([{
      user_id: authData.user?.id,
      prenom: form.prenom,
      nom: form.nom,
      promotion: form.promotion,
      filiere: form.filiere,
      secteur: form.secteur,
      pays: form.pays,
      ville: form.ville,
      email: form.email,
      statut: "en_attente",
      photo_url: null,
    }]);

    if (dbError) {
      setInscErreur("Compte créé mais erreur dans l'annuaire. Contactez le bureau.");
      setInscChargement(false);
      return;
    }

    setInscSucces(true);
    setInscChargement(false);
  }

  return (
    <div className="min-h-screen bg-[#F5F0E8] flex flex-col">
      <div className="max-w-[480px] w-full mx-auto px-5 py-14 flex-1">

        <Link href="/" className="flex items-center gap-3 mb-10">
          <span className="font-serif font-bold text-xl text-[#1E5A8E]">CANEL<span className="text-[#B5966E]">-LCBK</span></span>
        </Link>

        {/* Onglets */}
        <div className="flex border-b border-[#D5C9B8] mb-8">
          <button
            onClick={() => setOnglet("connexion")}
            className={"pb-3 mr-8 text-[15px] font-medium border-b-2 transition " + (onglet === "connexion" ? "border-[#1E5A8E] text-[#1E5A8E]" : "border-transparent text-[#6B6B6B]")}
          >
            Se connecter
          </button>
          <button
            onClick={() => setOnglet("inscription")}
            className={"pb-3 text-[15px] font-medium border-b-2 transition " + (onglet === "inscription" ? "border-[#1E5A8E] text-[#1E5A8E]" : "border-transparent text-[#6B6B6B]")}
          >
            Créer un compte
          </button>
        </div>

        {/* CONNEXION */}
        {onglet === "connexion" && (
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-6 h-px bg-[#B5966E]" />
              <span className="text-[#B5966E] text-[11px] font-semibold tracking-[0.12em] uppercase">Connexion</span>
            </div>
            <h1 className="font-serif text-[32px] text-[#1E5A8E] mb-8">Bon retour parmi nous</h1>

            <form onSubmit={connecter} className="flex flex-col gap-5">
              <div>
                <label className="block text-[11px] font-semibold text-[#6B6B6B] tracking-[0.08em] uppercase mb-2">Adresse email</label>
                <input
                  type="email" required value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  placeholder="votre@email.com"
                  className="w-full bg-white border border-[#D5C9B8] px-4 py-3.5 text-[15px] focus:outline-none focus:border-[#1E5A8E]"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-[#6B6B6B] tracking-[0.08em] uppercase mb-2">Mot de passe</label>
                <div className="relative">
                  <input
                    type={voirLoginMdp ? "text" : "password"} required value={loginMdp}
                    onChange={(e) => setLoginMdp(e.target.value)}
                    placeholder="6 caractères minimum"
                    className="w-full bg-white border border-[#D5C9B8] px-4 py-3.5 pr-14 text-[15px] focus:outline-none focus:border-[#1E5A8E]"
                  />
                  <button type="button" onClick={() => setVoirLoginMdp(!voirLoginMdp)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[12px] text-[#6B6B6B]">
                    {voirLoginMdp ? "Cacher" : "Voir"}
                  </button>
                </div>
              </div>
              {loginErreur && <p className="text-red-600 text-sm">{loginErreur}</p>}
              <button type="submit" disabled={loginChargement}
                className="bg-[#1E5A8E] text-white font-semibold text-[15px] py-4 min-h-[54px] disabled:opacity-60">
                {loginChargement ? "Connexion..." : "Se connecter"}
              </button>
            </form>

            <p className="text-[14px] text-[#6B6B6B] mt-6 text-center">
              Pas encore membre ?{" "}
              <button onClick={() => setOnglet("inscription")} className="text-[#1E5A8E] font-semibold underline">
                Créer un compte
              </button>
            </p>
          </div>
        )}

        {/* INSCRIPTION */}
        {onglet === "inscription" && (
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-6 h-px bg-[#B5966E]" />
              <span className="text-[#B5966E] text-[11px] font-semibold tracking-[0.12em] uppercase">Inscription</span>
            </div>
            <h1 className="font-serif text-[32px] text-[#1E5A8E] mb-8">Créer un compte</h1>

            {inscSucces ? (
              <div className="bg-white border border-[#D5C9B8] p-8 text-center">
                <div className="text-[#B5966E] text-4xl mb-4">✓</div>
                <h3 className="font-serif text-[22px] text-[#1E5A8E] mb-3">Inscription réussie !</h3>
                <p className="text-[14px] text-[#6B6B6B] mb-6 leading-relaxed">
                  Votre compte a été créé. Le bureau de CANEL-LCBK validera votre profil dans l&apos;annuaire prochainement.
                </p>
                <button onClick={() => setOnglet("connexion")}
                  className="bg-[#1E5A8E] text-white font-semibold text-[14px] px-6 py-3">
                  Se connecter
                </button>
              </div>
            ) : (
              <form onSubmit={inscrire} className="flex flex-col gap-5">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-semibold text-[#6B6B6B] tracking-[0.08em] uppercase mb-2">Prénom *</label>
                    <input type="text" required value={form.prenom}
                      onChange={(e) => setForm({ ...form, prenom: e.target.value })}
                      placeholder="Jean"
                      className="w-full bg-white border border-[#D5C9B8] px-4 py-3 text-[15px] focus:outline-none focus:border-[#1E5A8E]" />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-[#6B6B6B] tracking-[0.08em] uppercase mb-2">Nom *</label>
                    <input type="text" required value={form.nom}
                      onChange={(e) => setForm({ ...form, nom: e.target.value })}
                      placeholder="Dupont"
                      className="w-full bg-white border border-[#D5C9B8] px-4 py-3 text-[15px] focus:outline-none focus:border-[#1E5A8E]" />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-[#6B6B6B] tracking-[0.08em] uppercase mb-2">Promotion / Année *</label>
                  <input type="text" required value={form.promotion}
                    onChange={(e) => setForm({ ...form, promotion: e.target.value })}
                    placeholder="ex : 2018"
                    inputMode="numeric"
                    className="w-full bg-white border border-[#D5C9B8] px-4 py-3 text-[15px] focus:outline-none focus:border-[#1E5A8E]" />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-[#6B6B6B] tracking-[0.08em] uppercase mb-2">Filière suivie *</label>
                  <input type="text" required value={form.filiere}
                    onChange={(e) => setForm({ ...form, filiere: e.target.value })}
                    placeholder="ex : Sciences, Littéraire, Économie"
                    className="w-full bg-white border border-[#D5C9B8] px-4 py-3 text-[15px] focus:outline-none focus:border-[#1E5A8E]" />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-[#6B6B6B] tracking-[0.08em] uppercase mb-2">Secteur d&apos;activité</label>
                  <input type="text" value={form.secteur}
                    onChange={(e) => setForm({ ...form, secteur: e.target.value })}
                    placeholder="ex : Santé, Informatique, Éducation"
                    className="w-full bg-white border border-[#D5C9B8] px-4 py-3 text-[15px] focus:outline-none focus:border-[#1E5A8E]" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-semibold text-[#6B6B6B] tracking-[0.08em] uppercase mb-2">Pays *</label>
                    <input type="text" required value={form.pays}
                      onChange={(e) => setForm({ ...form, pays: e.target.value })}
                      className="w-full bg-white border border-[#D5C9B8] px-4 py-3 text-[15px] focus:outline-none focus:border-[#1E5A8E]" />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-[#6B6B6B] tracking-[0.08em] uppercase mb-2">Ville</label>
                    <input type="text" value={form.ville}
                      onChange={(e) => setForm({ ...form, ville: e.target.value })}
                      placeholder="Kyabé"
                      className="w-full bg-white border border-[#D5C9B8] px-4 py-3 text-[15px] focus:outline-none focus:border-[#1E5A8E]" />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-[#6B6B6B] tracking-[0.08em] uppercase mb-2">Adresse email *</label>
                  <input type="email" required value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="votre@email.com"
                    className="w-full bg-white border border-[#D5C9B8] px-4 py-3 text-[15px] focus:outline-none focus:border-[#1E5A8E]" />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-[#6B6B6B] tracking-[0.08em] uppercase mb-2">Mot de passe *</label>
                  <div className="relative">
                    <input type={voirMdp ? "text" : "password"} required value={form.mdp}
                      onChange={(e) => setForm({ ...form, mdp: e.target.value })}
                      placeholder="6 caractères minimum"
                      className="w-full bg-white border border-[#D5C9B8] px-4 py-3 pr-14 text-[15px] focus:outline-none focus:border-[#1E5A8E]" />
                    <button type="button" onClick={() => setVoirMdp(!voirMdp)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-[12px] text-[#6B6B6B]">
                      {voirMdp ? "Cacher" : "Voir"}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-[#6B6B6B] tracking-[0.08em] uppercase mb-2">Confirmer le mot de passe *</label>
                  <input type={voirMdp ? "text" : "password"} required value={form.mdp2}
                    onChange={(e) => setForm({ ...form, mdp2: e.target.value })}
                    placeholder="Répétez le mot de passe"
                    className="w-full bg-white border border-[#D5C9B8] px-4 py-3 text-[15px] focus:outline-none focus:border-[#1E5A8E]" />
                </div>

                {inscErreur && <p className="text-red-600 text-sm">{inscErreur}</p>}

                <button type="submit" disabled={inscChargement}
                  className="bg-[#B5966E] text-white font-semibold text-[15px] py-4 min-h-[54px] disabled:opacity-60">
                  {inscChargement ? "Création du compte..." : "Créer mon compte"}
                </button>

                <p className="text-[13px] text-[#6B6B6B] text-center leading-relaxed">
                  Votre profil sera visible dans l&apos;annuaire après validation par le bureau de CANEL-LCBK.
                </p>
              </form>
            )}

            <p className="text-[14px] text-[#6B6B6B] mt-6 text-center">
              Déjà membre ?{" "}
              <button onClick={() => setOnglet("connexion")} className="text-[#1E5A8E] font-semibold underline">
                Se connecter
              </button>
            </p>
          </div>
        )}
      </div>

      {/* Mini footer */}
      <div className="border-t border-[#D5C9B8] py-5 text-center">
        <Link href="/" className="text-[13px] text-[#6B6B6B] hover:text-[#1E5A8E]">
          ← Retour à l&apos;accueil
        </Link>
      </div>
    </div>
  );
}