"use client";

import { useState } from "react";
import { supabase } from "../lib/supabase";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Connexion() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", motdepasse: "" });
  const [voirMdp, setVoirMdp] = useState(false);
  const [envoi, setEnvoi] = useState<"idle" | "chargement" | "erreur">("idle");
  const [erreur, setErreur] = useState("");

  async function connecter(e: React.FormEvent) {
    e.preventDefault();
    setEnvoi("chargement");
    setErreur("");

    const { error } = await supabase.auth.signInWithPassword({
      email: form.email,
      password: form.motdepasse,
    });

    if (error) {
      setErreur("Email ou mot de passe incorrect.");
      setEnvoi("erreur");
      return;
    }

    router.push("/annuaire");
  }

  return (
    <div className="min-h-screen bg-[#FAFAF8] flex flex-col items-center justify-center px-5 py-16">
      <div className="w-full max-w-sm">
        <div className="flex justify-center mb-8">
          <Link href="/">
            <Image src="/logo.png" alt="CANEL-LCBK" width={72} height={72} className="h-18 w-auto" />
          </Link>
        </div>

        <div className="bg-white border border-[#D5C9B8] rounded p-8">
          <div className="font-mono text-[12px] tracking-wide uppercase text-[#B5966E] mb-2">Espace membre</div>
          <h1 className="font-serif text-3xl text-[#1E5A8E] mb-8">Se connecter</h1>

          <form onSubmit={connecter} className="flex flex-col gap-4">
            <div>
              <label className="block text-[11px] font-semibold text-[#1E5A8E] uppercase tracking-wide mb-1">Adresse email *</label>
              <input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="jean@exemple.com" className="w-full border border-[#D5C9B8] bg-[#FAFAF8] rounded-sm px-4 py-2.5 text-sm focus:outline-none focus:border-[#1E5A8E]" />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-[#1E5A8E] uppercase tracking-wide mb-1">Mot de passe *</label>
              <div className="relative">
                <input type={voirMdp ? "text" : "password"} required value={form.motdepasse}
                  onChange={(e) => setForm({ ...form, motdepasse: e.target.value })}
                  placeholder="Votre mot de passe"
                  className="w-full border border-[#D5C9B8] bg-[#FAFAF8] rounded-sm px-4 py-2.5 pr-16 text-sm focus:outline-none focus:border-[#1E5A8E]" />
                <button type="button" onClick={() => setVoirMdp(!voirMdp)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[12px] text-[#6B6B6B] hover:text-[#1E5A8E]">
                  {voirMdp ? "Cacher" : "Voir"}
                </button>
              </div>
            </div>
            {envoi === "erreur" && <p className="text-red-600 text-sm">{erreur}</p>}
            <button type="submit" disabled={envoi === "chargement"}
              className="bg-[#1E5A8E] text-white font-medium px-5 py-3 rounded-sm disabled:opacity-60 mt-2">
              {envoi === "chargement" ? "Connexion..." : "Se connecter"}
            </button>
            <p className="text-center text-[13px] text-[#6B6B6B]">
              Pas encore membre ?{" "}
              <Link href="/inscription" className="text-[#1E5A8E] font-medium underline underline-offset-2">S&apos;inscrire</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}