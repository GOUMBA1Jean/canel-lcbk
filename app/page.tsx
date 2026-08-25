"use client";

import { useState, useEffect } from "react";
import { supabase } from "./lib/supabase";

const piliers = [
  { num: "01", titre: "Annuaire", texte: "Retrouvez un ancien par promotion, filière ou secteur d'activité." },
  { num: "02", titre: "Orientation", texte: "Des guides et des témoignages pour aider les nouveaux bacheliers à choisir leur voie." },
  { num: "03", titre: "Emploi", texte: "Les offres et stages partagés par les membres, au même endroit." },
  { num: "04", titre: "Actualités", texte: "Ce qui avance à l'établissement, sans se perdre dans un fil de discussion." },
  { num: "05", titre: "Échange", texte: "Un espace de discussion structuré, en complément de CANEL-LCBK." },
];

const promotions = ["2009–2010","2010–2011","2011–2012","2012–2013","2013–2014","2014–2015","2015–2016","2016–2017","2017–2018","2018–2019","2019–2020","2020–2021","2021–2022","2022–2023","2023–2024","2024–2025","2025–2026"];

const presentiel = [
  { num: "01", titre: "Formations et conférences", texte: "Les membres de CANEL-LCBK organisent des sessions de partage de connaissances au sein de l'établissement." },
  { num: "02", titre: "Rencontres avec l'administration", texte: "Des réunions régulières avec la direction pour faire avancer les projets d'amélioration de l'établissement." },
  { num: "03", titre: "Brassage entre générations", texte: "Anciens et nouveaux élèves se retrouvent en présentiel, dans le prolongement des échanges du canal." },
];

type Offre = { id: string; titre: string; type: string; lieu: string; auteur: string; };

function SectionOffres() {
  const [offres, setOffres] = useState<Offre[]>([]);
  const [chargement, setChargement] = useState(true);

  useEffect(() => {
    supabase.from("offres").select("id, titre, type, lieu, auteur").eq("statut", "validé").order("created_at", { ascending: false }).limit(4)
      .then(({ data }) => { setOffres(data || []); setChargement(false); });
  }, []);

  return (
    <section className="py-20 bg-[#FAFAF8]">
      <div className="max-w-[1120px] mx-auto px-5 md:px-8">
        <div className="max-w-[560px] mb-12">
          <div className="font-mono text-xs uppercase tracking-wide text-[#8B7355] mb-3">Insertion professionnelle</div>
          <h2 className="font-serif text-[34px] text-[#1E5A8E]">Offres partagées par le réseau</h2>
        </div>
        {chargement ? (
          <div className="text-[#6B6B6B] text-sm">Chargement des offres...</div>
        ) : offres.length === 0 ? (
          <div className="bg-[#F0EAE0] border border-[#D5C9B8] rounded p-6 text-[#6B6B6B] text-[14px]">
            Aucune offre disponible pour le moment.{" "}
            <a href="/offres" className="text-[#1E5A8E] underline">Soyez le premier à en partager une.</a>
          </div>
        ) : (
          <div className="flex flex-col gap-px bg-[#D5C9B8] border border-[#D5C9B8] mb-4">
            {offres.map((o) => (
              <div key={o.id} className="bg-[#FAFAF8] p-5 px-6 flex justify-between items-center flex-wrap gap-3">
                <div>
                  <h4 className="text-[15px] text-[#1E5A8E] mb-1">{o.titre}</h4>
                  <p className="text-[13px] text-[#6B6B6B]">{o.auteur} · {o.lieu}</p>
                </div>
                <span className="font-mono text-[11px] bg-[#B5966E] text-white px-2.5 py-1.5 rounded-sm">{o.type}</span>
              </div>
            ))}
          </div>
        )}
        <a href="/offres" className="inline-block mt-2 text-[#1E5A8E] text-sm font-medium underline">
          Voir toutes les offres →
        </a>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section className="bg-[#1E5A8E] text-white py-16 md:py-24">
        <div className="max-w-[1120px] mx-auto px-5 md:px-8">
          <div className="font-mono text-[11px] md:text-[13px] tracking-wide uppercase text-[#A8CBE8] mb-4">
            CANEL-LCBK · Lycée Collège la Bénédiction de Kyabé · Depuis 2009
          </div>
          <h1 className="font-serif text-[38px] md:text-6xl leading-tight max-w-[680px] mb-5">
            Une chaîne qui <em className="text-[#B5966E] not-italic italic">continue</em>.
          </h1>
          <p className="text-[15px] md:text-lg leading-relaxed max-w-[520px] text-[#D0E4F2] mb-8">
            Chaque promotion est un maillon. CANEL-LCBK relie les anciens élèves d&apos;hier à ceux d&apos;aujourd&apos;hui : pour le partage intellectuel, le brassage et la connaissance entre tous les ressortissants de notre établissement.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <a href="/annuaire" className="bg-[#B5966E] text-white font-semibold text-[15px] px-6 py-3.5 rounded-sm text-center hover:bg-[#8B7355] transition">
              Rejoindre l&apos;annuaire
            </a>
            <a href="#piliers" className="border border-white/30 text-white font-medium text-[15px] px-6 py-3.5 rounded-sm text-center hover:bg-white/10 transition">
              Découvrir le projet
            </a>
          </div>
        </div>
      </section>

      {/* STATS */}
      <div className="bg-[#F0EAE0] border-b border-[#D5C9B8] py-7">
        <div className="max-w-[1120px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 px-5 md:px-8">
          {[
            ["2009", "Première rentrée scolaire"],
            ["—", "Anciens inscrits"],
            ["—", "Promotions représentées"],
            ["—", "Offres partagées"],
          ].map(([num, label]) => (
            <div key={label}>
              <div className="font-serif text-3xl text-[#1E5A8E]">{num}</div>
              <div className="text-[13px] text-[#6B6B6B] mt-1">{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* PILIERS */}
      <section className="py-20 bg-[#FAFAF8]" id="piliers">
        <div className="max-w-[1120px] mx-auto px-5 md:px-8">
          <div className="max-w-[560px] mb-12">
            <div className="font-mono text-xs uppercase tracking-wide text-[#8B7355] mb-3">Ce que fait la plateforme</div>
            <h2 className="font-serif text-[34px] text-[#1E5A8E]">Cinq piliers, un seul réseau</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-px bg-[#D5C9B8] border border-[#D5C9B8]">
            {piliers.map((p) => (
              <div key={p.num} className="bg-[#FAFAF8] p-6">
                <div className="font-mono text-[13px] text-[#B5966E] mb-4">{p.num}</div>
                <h3 className="font-serif text-lg text-[#1E5A8E] mb-2">{p.titre}</h3>
                <p className="text-[13.5px] leading-relaxed text-[#6B6B6B]">{p.texte}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CHAÎNE DES PROMOTIONS */}
      <section className="bg-[#1E5A8E] text-white py-20">
        <div className="max-w-[1120px] mx-auto px-5 md:px-8">
          <div className="max-w-[560px] mb-12">
            <div className="font-mono text-xs uppercase tracking-wide text-[#A8CBE8] mb-3">La chaîne des promotions</div>
            <h2 className="font-serif text-[34px] text-white">D&apos;une génération à l&apos;autre</h2>
            <p className="text-[15px] text-[#D0E4F2] mt-3 leading-relaxed">
              Depuis la première rentrée en 2009, chaque promotion est un maillon de la chaîne CANEL-LCBK.
            </p>
          </div>
          <div className="ribbon flex overflow-x-auto pb-5 gap-0">
            {promotions.map((yr, i) => (
              <div key={yr} className="flex items-center flex-none">
                <div className={"w-[130px] rounded border p-4 bg-white/5 " + (i === promotions.length - 1 ? "border-[#B5966E]" : "border-white/15")}>
                  <div className="font-mono text-[12px] text-[#A8CBE8]">{yr}</div>
                  <div className="text-[12px] text-[#D0E4F2] mt-1">{i === promotions.length - 1 ? "Actuelle" : "Promotion"}</div>
                </div>
                {i < promotions.length - 1 && (
                  <div className="w-6 h-px bg-white/20 relative after:content-[''] after:absolute after:-right-[3px] after:-top-[3px] after:w-[6px] after:h-[6px] after:rounded-full after:bg-[#B5966E]" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRÉSENTIEL */}
      <section className="py-20 bg-[#FAFAF8]">
        <div className="max-w-[1120px] mx-auto px-5 md:px-8">
          <div className="max-w-[560px] mb-12">
            <div className="font-mono text-xs uppercase tracking-wide text-[#8B7355] mb-3">Au-delà de l&apos;écran</div>
            <h2 className="font-serif text-[34px] text-[#1E5A8E]">Une communauté qui se retrouve aussi à Kyabé</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[#D5C9B8] border border-[#D5C9B8]">
            {presentiel.map((p) => (
              <div key={p.num} className="bg-[#FAFAF8] p-7">
                <div className="w-9 h-9 rounded-full bg-[#1E5A8E] text-[#A8CBE8] flex items-center justify-center font-mono text-[13px] mb-4">
                  {p.num}
                </div>
                <h4 className="text-[16px] text-[#1E5A8E] mb-2">{p.titre}</h4>
                <p className="text-[13.5px] leading-relaxed text-[#6B6B6B]">{p.texte}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ORIENTATION */}
      <section className="bg-[#F0EAE0] py-20">
        <div className="max-w-[1120px] mx-auto px-5 md:px-8 grid grid-cols-1 md:grid-cols-[1.1fr_0.9fr] gap-14 items-center">
          <div>
            <div className="font-mono text-xs uppercase tracking-wide text-[#8B7355] mb-3">Pour les nouveaux bacheliers</div>
            <h2 className="font-serif text-[32px] text-[#1E5A8E] mb-4">Choisir sa voie, avec l&apos;appui des anciens</h2>
            <p className="text-[15.5px] leading-relaxed text-[#6B6B6B] mb-6">
              Avant de s&apos;engager dans une filière, un bachelier peut lire le parcours d&apos;un ancien qui est passé par là.
            </p>
            <a href="/orientation" className="inline-block border border-[#1E5A8E] text-[#1E5A8E] font-medium text-[15px] px-6 py-3.5 rounded-sm hover:bg-[#1E5A8E] hover:text-white transition">
              Voir les ressources d&apos;orientation
            </a>
          </div>
          <div>
            {[
              { tag: "Témoignage", titre: "De la Bénédiction à la Faculté de médecine", desc: "Parcours d'un ancien de la promotion 2018." },
              { tag: "Guide", titre: "Choisir entre filière scientifique et littéraire", desc: "Les questions à se poser avant le choix de série." },
            ].map((c) => (
              <div key={c.titre} className="bg-white border border-[#D5C9B8] border-l-4 border-l-[#5B9BD5] rounded p-5 mb-3">
                <div className="font-mono text-[11px] text-[#5B9BD5] uppercase tracking-wide">{c.tag}</div>
                <h4 className="text-[15px] text-[#1E5A8E] mt-1 mb-1">{c.titre}</h4>
                <p className="text-[13px] text-[#6B6B6B]">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTRIBUTION */}
      <section className="bg-[#8B7355] text-white py-14">
        <div className="max-w-[1120px] mx-auto px-5 md:px-8 flex justify-between items-center gap-10 flex-wrap">
          <div className="max-w-[560px]">
            <div className="font-mono text-xs uppercase tracking-wide text-[#D5C9B8] mb-3">Opération en cours</div>
            <h2 className="font-serif text-[30px] text-white mb-3">Chaque élève s&apos;acquitte de sa contribution</h2>
            <p className="text-[15px] leading-relaxed text-[#EAE0D0]">
              Un geste pour soutenir l&apos;éducation de nos successeurs et celle de la nation.
            </p>
          </div>
          <a href="/contribution" className="bg-white text-[#8B7355] font-semibold text-[15px] px-7 py-3.5 rounded-sm whitespace-nowrap hover:bg-[#F0EAE0] transition">
            Voir l&apos;opération
          </a>
        </div>
      </section>

      {/* OFFRES DYNAMIQUES */}
      <SectionOffres />
    </>
  );
}