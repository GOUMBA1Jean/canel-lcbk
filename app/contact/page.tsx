"use client";

import { useState } from "react";
import { supabase } from "../lib/supabase";

export default function Contact() {
  const [form, setForm] = useState({ nom: "", email: "", sujet: "", message: "" });
  const [envoi, setEnvoi] = useState<"idle" | "chargement" | "succes" | "erreur">("idle");

  async function envoyer(e: React.FormEvent) {
    e.preventDefault();
    setEnvoi("chargement");
    const { error } = await supabase.from("messages").insert([{ ...form }]);
    if (error) { setEnvoi("erreur"); }
    else {
      setEnvoi("succes");
      setForm({ nom: "", email: "", sujet: "", message: "" });
    }
  }

  return (
    <>
      <section className="bg-[#1E5A8E] text-white py-16">
        <div className="max-w-[680px] mx-auto px-5">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-6 h-px bg-[#B5966E]" />
            <span className="text-[#B5966E] text-[11px] font-semibold tracking-[0.12em] uppercase">Nous écrire</span>
          </div>
          <h1 className="font-serif text-4xl md:text-5xl mb-4">Contactez CANEL-LCBK</h1>
          <p className="text-[#D0E4F2] max-w-[480px] leading-relaxed">
            Une question, un projet, une candidature ? Écrivez-nous — nous vous répondons sous 24 à 48 heures.
          </p>
        </div>
      </section>

      <section className="py-16 bg-[#F5F0E8]">
        <div className="max-w-[680px] mx-auto px-5">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-12">

            {/* Coordonnées */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-6 h-px bg-[#B5966E]" />
                <span className="text-[#B5966E] text-[11px] font-semibold tracking-[0.12em] uppercase">Coordonnées</span>
              </div>
              <div className="flex flex-col gap-5">
                {[
                  {
                    label: "EMAIL",
                    valeur: "contact@canel-lcbk.td",
                    href: "mailto:contact@canel-lcbk.td",
                    icone: (
                      <svg width="20" height="20" fill="none" stroke="#B5966E" strokeWidth="1.5" viewBox="0 0 24 24">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                        <polyline points="22,6 12,13 2,6"/>
                      </svg>
                    ),
                  },
                  {
                    label: "WHATSAPP",
                    valeur: "Groupe CANEL-LCBK",
                    href: "https://chat.whatsapp.com/JuQvIvpnfdcH06e62u1zsc?s=cl&p=a&ilr=1",
                    icone: (
                      <svg width="20" height="20" fill="#B5966E" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                      </svg>
                    ),
                  },
                  {
                    label: "SIÈGE",
                    valeur: "Kyabé, Tchad",
                    href: null,
                    icone: (
                      <svg width="20" height="20" fill="none" stroke="#B5966E" strokeWidth="1.5" viewBox="0 0 24 24">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                        <circle cx="12" cy="10" r="3"/>
                      </svg>
                    ),
                  },
                ].map((c, i) => (
                  <div key={i} className="flex gap-4 items-start">
                    <div className="w-10 h-10 bg-white border border-[#D5C9B8] flex items-center justify-center shrink-0">
                      {c.icone}
                    </div>
                    <div>
                      <p className="text-[10px] font-semibold tracking-[0.1em] text-[#9a9a9a] mb-0.5">{c.label}</p>
                      {c.href ? (
                        <a href={c.href} target="_blank" rel="noopener noreferrer"
                          className="text-[14px] text-[#1E5A8E] hover:underline">{c.valeur}</a>
                      ) : (
                        <p className="text-[14px] text-[#54534c]">{c.valeur}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 bg-[#1E5A8E] p-5">
                <p className="text-[10px] font-semibold tracking-[0.1em] text-[#A8CBE8] mb-1 uppercase">Délai de réponse</p>
                <p className="font-serif text-3xl text-white mb-1">24 — 48h</p>
                <p className="text-[12px] text-[#D0E4F2]">Du lundi au vendredi, jours ouvrés.</p>
              </div>
            </div>

            {/* Formulaire */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-6 h-px bg-[#B5966E]" />
                <span className="text-[#B5966E] text-[11px] font-semibold tracking-[0.12em] uppercase">Formulaire</span>
              </div>

              {envoi === "succes" ? (
                <div className="bg-white border-t-4 border-[#B5966E] p-8 text-center">
                  <div className="text-3xl mb-3">✓</div>
                  <h3 className="font-serif text-xl text-[#1E5A8E] mb-2">Message envoyé !</h3>
                  <p className="text-[14px] text-[#6B6B6B]">Nous vous répondrons dans les 24 à 48 heures.</p>
                </div>
              ) : (
                <form onSubmit={envoyer} className="flex flex-col gap-4">
                  {[
                    { label: "Votre nom *", key: "nom", placeholder: "Jean Dupont", type: "text", required: true },
                    { label: "Adresse email *", key: "email", placeholder: "jean@exemple.com", type: "email", required: true },
                    { label: "Sujet *", key: "sujet", placeholder: "Objet de votre message", type: "text", required: true },
                  ].map((f) => (
                    <div key={f.key}>
                      <label className="block text-[11px] font-semibold text-[#6B6B6B] tracking-[0.08em] uppercase mb-2">{f.label}</label>
                      <input type={f.type} required={f.required} placeholder={f.placeholder}
                        value={form[f.key as keyof typeof form]}
                        onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                        className="w-full bg-white border border-[#D5C9B8] px-4 py-3 text-[15px] focus:outline-none focus:border-[#1E5A8E]" />
                    </div>
                  ))}
                  <div>
                    <label className="block text-[11px] font-semibold text-[#6B6B6B] tracking-[0.08em] uppercase mb-2">Message *</label>
                    <textarea required rows={5} placeholder="Votre message..."
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="w-full bg-white border border-[#D5C9B8] px-4 py-3 text-[15px] focus:outline-none focus:border-[#1E5A8E] resize-none" />
                  </div>
                  {envoi === "erreur" && <p className="text-red-600 text-sm">Une erreur s&apos;est produite. Réessayez.</p>}
                  <button type="submit" disabled={envoi === "chargement"}
                    className="bg-[#1E5A8E] text-white font-medium px-6 py-3.5 text-sm disabled:opacity-60 w-full">
                    {envoi === "chargement" ? "Envoi en cours..." : "Envoyer le message →"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}