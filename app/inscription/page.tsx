"use client";

import { useState } from "react";
import { supabase } from "../lib/supabase";
import Link from "next/link";
import Image from "next/image";

const PAYS = ["Tchad", "France", "Cameroun", "Gabon", "Côte d'Ivoire", "Sénégal", "Canada", "Belgique", "Autre"];
const FILIERES = ["Sciences", "Littéraire", "Économie", "Technique"];
const SECTEURS = ["Santé", "Éducation", "Informatique", "Finance", "Agronomie", "Droit", "Commerce", "Autre"];

export default function Inscription() {
  const [form, setForm] = useState({
    prenom: "", nom: "", promotion: "", filiere: "", secteur: "", ville: "", pays: "Tchad", email: "", telephone: "", motdepasse: "",
  });
  const [envoi, setEnvoi] = useState<"idle" | "chargement" | "succes" | "erreur">("idle");
  const [erreur, setErreur] = useState("");

  async function inscrire(e: React.FormEvent) {
    e.preventDefault();
    setEnvoi("chargement");
    setErreur("");

    // 1. Créer le compte Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: form.email,
      password: form.motdepasse,
    });

    if (authError) {
      setErreur(authError.message === "User already registered" ? "Cet email est déjà utilisé." : authError.message);
      setEnvoi("erreur");
      return;
    }

    // 2. Ajouter dans l'annuaire
    const { error: ancienError } = await supabase.from("anciens").insert([{
      prenom: form.prenom,
      nom: form.nom,
      promotion: form.promotion,
      filiere: form.filiere,
      secteur: form.secteur,
      ville: form.ville,
      pays: form.pays,
      email: form.email,
      telephone: form.telephone,
      statut: "validé",
      user_id: authData.user?.id,
    }]);

    if (ancienError) {
      setErreur("Compte créé mais erreur lors de l'ajout à l'annuaire.");
      setEnvoi("erreur");
      return;
    }

    setEnvoi("succes");
  }

  return (
    <div className="min-h-screen bg-[#FAFAF8] flex flex-col items-center justify-center px-5 py-16">
      <div className="w-full max-w-lg">
        <div className="flex justify-center mb-8">
          <Link href="/">
            <Image src="/logo.png" alt="CANEL-LCBK" width={72} height={72} className="h-18 w-auto" />
          </Link>
        </div>

        <div className="bg-white border border-[#D5C9B8] rounded p-8">
          <div className="font-mono text-[12px] tracking-wide uppercase text-[#B5966E] mb-2">Inscription</div>
          <h1 className="font-serif text-3xl text-[#1E5A8E] mb-8">Créer un compte</h1>

          {envoi === "succes" ? (
            <div className="text-center py-8">
              <div className="text-4xl mb-4">✓</div>
              <h3 className="font-serif text-2xl text-[#1E5A8E] mb-2">Bienvenue dans CANEL-LCBK !</h3>
              <p className="text-[#6B6B6B] mb-6">Votre compte est créé et votre profil apparaît dans l&apos;annuaire.</p>
              <Link href="/annuaire" className="bg-[#1E5A8E] text-white text-sm font-medium px-5 py-2.5 rounded-sm inline-block">
                Voir l&apos;annuaire
              </Link>
            </div>
          ) : (
            <form onSubmit={inscrire} className="flex flex-col gap-4">
              <div className="flex gap-3">
                <div className="flex-1">
                  <label className="block text-[11px] font-semibold text-[#1E5A8E] uppercase tracking-wide mb-1">Prénom *</label>
                  <input type="text" required value={form.prenom} onChange={(e) => setForm({ ...form, prenom: e.target.value })}
                    placeholder="Jean" className="w-full border border-[#D5C9B8] bg-[#FAFAF8] rounded-sm px-4 py-2.5 text-sm focus:outline-none focus:border-[#1E5A8E]" />
                </div>
                <div className="flex-1">
                  <label className="block text-[11px] font-semibold text-[#1E5A8E] uppercase tracking-wide mb-1">Nom *</label>
                  <input type="text" required value={form.nom} onChange={(e) => setForm({ ...form, nom: e.target.value })}
                    placeholder="Dupont" className="w-full border border-[#D5C9B8] bg-[#FAFAF8] rounded-sm px-4 py-2.5 text-sm focus:outline-none focus:border-[#1E5A8E]" />
                </div>
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-[#1E5A8E] uppercase tracking-wide mb-1">Promotion *</label>
                <input type="text" required value={form.promotion} onChange={(e) => setForm({ ...form, promotion: e.target.value })}
                  placeholder="ex : 2018" className="w-full border border-[#D5C9B8] bg-[#FAFAF8] rounded-sm px-4 py-2.5 text-sm focus:outline-none focus:border-[#1E5A8E]" />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-[#1E5A8E] uppercase tracking-wide mb-1">Filière</label>
                <select value={form.filiere} onChange={(e) => setForm({ ...form, filiere: e.target.value })}
                  className="w-full border border-[#D5C9B8] bg-[#FAFAF8] rounded-sm px-4 py-2.5 text-sm focus:outline-none focus:border-[#1E5A8E]">
                  <option value="">Choisir...</option>
                  {FILIERES.map((f) => <option key={f} value={f}>{f}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-[#1E5A8E] uppercase tracking-wide mb-1">Secteur d&apos;activité</label>
                <select value={form.secteur} onChange={(e) => setForm({ ...form, secteur: e.target.value })}
                  className="w-full border border-[#D5C9B8] bg-[#FAFAF8] rounded-sm px-4 py-2.5 text-sm focus:outline-none focus:border-[#1E5A8E]">
                  <option value="">Choisir...</option>
                  {SECTEURS.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div className="flex gap-3">
                <div className="flex-1">
                  <label className="block text-[11px] font-semibold text-[#1E5A8E] uppercase tracking-wide mb-1">Pays *</label>
                  <select required value={form.pays} onChange={(e) => setForm({ ...form, pays: e.target.value })}
                    className="w-full border border-[#D5C9B8] bg-[#FAFAF8] rounded-sm px-4 py-2.5 text-sm focus:outline-none focus:border-[#1E5A8E]">
                    {PAYS.map((p) => <option key={p} value={p}>{p}</option>)}
                  </select>
                </div>
                <div className="flex-1">
                  <label className="block text-[11px] font-semibold text-[#1E5A8E] uppercase tracking-wide mb-1">Ville</label>
                  <input type="text" value={form.ville} onChange={(e) => setForm({ ...form, ville: e.target.value })}
                    placeholder="N'Djamena" className="w-full border border-[#D5C9B8] bg-[#FAFAF8] rounded-sm px-4 py-2.5 text-sm focus:outline-none focus:border-[#1E5A8E]" />
                </div>
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-[#1E5A8E] uppercase tracking-wide mb-1">Téléphone</label>
                <input type="text" value={form.telephone} onChange={(e) => setForm({ ...form, telephone: e.target.value })}
                  placeholder="ex : +235 66 00 00 00" className="w-full border border-[#D5C9B8] bg-[#FAFAF8] rounded-sm px-4 py-2.5 text-sm focus:outline-none focus:border-[#1E5A8E]" />
              </div>
              <div className="border-t border-[#D5C9B8] pt-4 mt-1">
                <label className="block text-[11px] font-semibold text-[#1E5A8E] uppercase tracking-wide mb-1">Adresse email *</label>
                <input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="jean@exemple.com" className="w-full border border-[#D5C9B8] bg-[#FAFAF8] rounded-sm px-4 py-2.5 text-sm focus:outline-none focus:border-[#1E5A8E]" />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-[#1E5A8E] uppercase tracking-wide mb-1">Mot de passe *</label>
                <input type="password" required minLength={6} value={form.motdepasse} onChange={(e) => setForm({ ...form, motdepasse: e.target.value })}
                  placeholder="6 caractères minimum" className="w-full border border-[#D5C9B8] bg-[#FAFAF8] rounded-sm px-4 py-2.5 text-sm focus:outline-none focus:border-[#1E5A8E]" />
              </div>
              {(envoi === "erreur" || erreur) && <p className="text-red-600 text-sm">{erreur || "Une erreur s'est produite."}</p>}
              <button type="submit" disabled={envoi === "chargement"}
                className="bg-[#1E5A8E] text-white font-medium px-5 py-3 rounded-sm disabled:opacity-60 mt-2">
                {envoi === "chargement" ? "Création en cours..." : "Créer mon compte"}
              </button>
              <p className="text-center text-[13px] text-[#6B6B6B]">
                Déjà membre ?{" "}
                <Link href="/connexion" className="text-[#1E5A8E] font-medium underline underline-offset-2">Se connecter</Link>
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}