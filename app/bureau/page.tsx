"use client";

import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import Image from "next/image";

type Membre = {
  id: string;
  nom: string;
  role: string;
  whatsapp: string;
  mail: string;
  ordre: number;
  photo_url?: string;
};

const WIcon = () => (
  <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

const MIcon = () => (
  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
    <polyline points="22,6 12,13 2,6"/>
  </svg>
);

export default function Bureau() {
  const [membres, setMembres] = useState<Membre[]>([]);
  const [chargement, setChargement] = useState(true);

  useEffect(() => { charger(); }, []);

  async function charger() {
    setChargement(true);
    const { data } = await supabase.from("bureau").select("*").order("ordre");
    setMembres(data || []);
    setChargement(false);
  }

  return (
    <>
      <section className="bg-[#1E5A8E] text-white py-16">
        <div className="max-w-[1120px] mx-auto px-5 md:px-8">
          <div className="font-mono text-[13px] tracking-wide uppercase text-[#A8CBE8] mb-4">CANEL-LCBK</div>
          <h1 className="font-serif text-4xl md:text-5xl mb-4">Le bureau</h1>
          <p className="text-[#D0E4F2] max-w-[560px] leading-relaxed">
            Les responsables qui coordonnent CANEL-LCBK, en ligne et en présentiel à Kyabé.
          </p>
        </div>
      </section>

      <section className="py-14 bg-[#FAFAF8]">
        <div className="max-w-[1120px] mx-auto px-5 md:px-8">
          {chargement ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[#D5C9B8] border border-[#D5C9B8] mb-14">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-[#FAFAF8] p-6 animate-pulse">
                  <div className="w-20 h-20 rounded-full bg-[#D5C9B8] mb-4" />
                  <div className="h-4 bg-[#D5C9B8] rounded w-3/4 mb-2" />
                  <div className="h-3 bg-[#D5C9B8] rounded w-1/2" />
                </div>
              ))}
            </div>
          ) : membres.length === 0 ? (
            <div className="text-center py-16 text-[#6B6B6B] mb-14 italic">
              Aucun membre du bureau enregistré pour le moment.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[#D5C9B8] border border-[#D5C9B8] mb-14">
              {membres.map((m) => (
                <div key={m.id} className="bg-[#FAFAF8] p-6 flex flex-col gap-4">
                  {m.photo_url ? (
                    <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-[#D5C9B8]">
                      <Image
                        src={m.photo_url}
                        alt={m.nom}
                        width={80}
                        height={80}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-20 h-20 rounded-full bg-[#1E5A8E] text-[#A8CBE8] flex items-center justify-center font-serif text-2xl">
                      {m.nom.charAt(0)}
                    </div>
                  )}
                  <div>
                    <h4 className="text-[16px] font-semibold text-[#1E5A8E] mb-1">{m.nom}</h4>
                    <p className="text-[13px] text-[#6B6B6B] mb-4">{m.role}</p>
                    <div className="flex flex-col gap-2">
                      {m.whatsapp && (
                        <a href={"https://wa.me/" + m.whatsapp} target="_blank" rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 bg-[#25D366] text-white text-[13px] font-medium px-4 py-2 rounded-sm w-fit">
                          <WIcon /> WhatsApp
                        </a>
                      )}
                      {m.mail && (
                        <a href={"mailto:" + m.mail}
                          className="inline-flex items-center gap-2 border border-[#1E5A8E] text-[#1E5A8E] text-[13px] font-medium px-4 py-2 rounded-sm w-fit">
                          <MIcon /> Email
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="bg-[#F0EAE0] border border-[#D5C9B8] rounded p-8 max-w-xl">
            <h3 className="font-serif text-xl text-[#1E5A8E] mb-3">Rejoindre CANEL-LCBK</h3>
            <p className="text-[13.5px] text-[#6B6B6B] mb-5">
              Rejoignez le groupe WhatsApp pour suivre les actualités et contribuer à la vie de CANEL-LCBK.
            </p>
            <a href="https://chat.whatsapp.com/JuQvIvpnfdcH06e62u1zsc?s=cl&p=a&ilr=1" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#25D366] text-white font-semibold text-[15px] px-6 py-3.5 rounded-sm">
              <WIcon /> Rejoindre le groupe CANEL-LCBK
            </a>
          </div>
        </div>
      </section>
    </>
  );
}