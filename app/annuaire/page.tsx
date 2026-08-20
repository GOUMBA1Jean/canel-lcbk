"use client";

import { useState, useMemo } from "react";

const anciens = [
  { nom: "A. M.", promo: "2012", filiere: "Sciences", secteur: "Santé", ville: "N'Djamena" },
  { nom: "D. K.", promo: "2015", filiere: "Littéraire", secteur: "Éducation", ville: "Sarh" },
  { nom: "R. T.", promo: "2018", filiere: "Sciences", secteur: "Informatique", ville: "Kyabé" },
  { nom: "S. N.", promo: "2019", filiere: "Économie", secteur: "Finance", ville: "N'Djamena" },
  { nom: "B. O.", promo: "2021", filiere: "Sciences", secteur: "Agronomie", ville: "Moundou" },
  { nom: "L. H.", promo: "2022", filiere: "Littéraire", secteur: "Droit", ville: "N'Djamena" },
];

const promotions = ["Toutes", ...Array.from(new Set(anciens.map((a) => a.promo)))];
const secteurs = ["Tous", ...Array.from(new Set(anciens.map((a) => a.secteur)))];

export default function Annuaire() {
  const [recherche, setRecherche] = useState("");
  const [promo, setPromo] = useState("Toutes");
  const [secteur, setSecteur] = useState("Tous");
  const [selection, setSelection] = useState<(typeof anciens)[number] | null>(null);

  const resultats = useMemo(() => {
    return anciens.filter((a) => {
      const matchNom = a.nom.toLowerCase().includes(recherche.toLowerCase());
      const matchPromo = promo === "Toutes" || a.promo === promo;
      const matchSecteur = secteur === "Tous" || a.secteur === secteur;
      return matchNom && matchPromo && matchSecteur;
    });
  }, [recherche, promo, secteur]);

  return (
    <>
      <section className="bg-indigo text-white py-16">
        <div className="max-w-[1120px] mx-auto px-8">
          <div className="font-mono text-[13px] tracking-wide uppercase text-gold-2 mb-4">
            CANEL-LCBK
          </div>
          <h1 className="font-serif text-4xl md:text-5xl mb-4">L&apos;annuaire des anciens</h1>
          <p className="text-[#D9D4C4] max-w-[560px] leading-relaxed">
            Retrouvez un ancien par promotion, filière ou secteur d&apos;activité. Les profils ci-dessous sont des exemples pour la démonstration.
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-[1120px] mx-auto px-8">
          <div className="flex flex-wrap gap-3 mb-4">
            <input
              type="text"
              placeholder="Rechercher un nom..."
              value={recherche}
              onChange={(e) => setRecherche(e.target.value)}
              className="border border-[#E3D9BC] bg-white rounded-sm px-4 py-2.5 text-sm flex-1 min-w-[200px] focus:outline-none focus:border-indigo"
            />
            <select
              value={promo}
              onChange={(e) => setPromo(e.target.value)}
              className="border border-[#E3D9BC] bg-white rounded-sm px-4 py-2.5 text-sm"
            >
              {promotions.map((p) => (
                <option key={p} value={p}>{p === "Toutes" ? "Promotion" : p}</option>
              ))}
            </select>
            <select
              value={secteur}
              onChange={(e) => setSecteur(e.target.value)}
              className="border border-[#E3D9BC] bg-white rounded-sm px-4 py-2.5 text-sm"
            >
              {secteurs.map((s) => (
                <option key={s} value={s}>{s === "Tous" ? "Secteur d'activité" : s}</option>
              ))}
            </select>
          </div>
          <div className="text-[12.5px] text-[#9a9585] italic mb-8">
            {resultats.length} résultat{resultats.length > 1 ? "s" : ""} — données d&apos;exemple pour la démonstration.
          </div>

          {resultats.length === 0 ? (
            <div className="text-center py-16 text-[#6b6a63]">Aucun ancien ne correspond à cette recherche.</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-px bg-[#E3D9BC] border border-[#E3D9BC]">
              {resultats.map((a) => (
                <button
                  key={a.nom}
                  onClick={() => setSelection(a)}
                  className="bg-sand p-6 text-left hover:bg-sand-2 transition cursor-pointer"
                >
                  <div className="w-11 h-11 rounded-full bg-indigo text-gold-2 flex items-center justify-center font-serif text-lg mb-4">
                    {a.nom.charAt(0)}
                  </div>
                  <h4 className="text-[16px] text-indigo mb-1">{a.nom}</h4>
                  <p className="text-[13px] text-[#6b6a63] mb-3">Promotion {a.promo} · {a.ville}</p>
                  <div className="flex gap-2 flex-wrap">
                    <span className="font-mono text-[11px] bg-sand-2 text-[#54534c] px-2 py-1 rounded-sm">{a.filiere}</span>
                    <span className="font-mono text-[11px] bg-sand-2 text-[#54534c] px-2 py-1 rounded-sm">{a.secteur}</span>
                  </div>
                </button>
              ))}
            </div>
          )}
          <div className="text-[12.5px] text-[#9a9585] italic mt-6">
            Exemples illustratifs — les vrais profils apparaîtront une fois les membres inscrits.
          </div>
        </div>
      </section>

      {/* Fiche détaillée au clic */}
      {selection && (
        <div
          className="fixed inset-0 bg-black/40 flex items-center justify-center z-30 p-6"
          onClick={() => setSelection(null)}
        >
          <div
            className="bg-sand rounded max-w-md w-full p-8 border border-[#E3D9BC]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-14 h-14 rounded-full bg-indigo text-gold-2 flex items-center justify-center font-serif text-2xl mb-5">
              {selection.nom.charAt(0)}
            </div>
            <h3 className="font-serif text-2xl text-indigo mb-1">{selection.nom}</h3>
            <p className="text-sm text-[#6b6a63] mb-5">Promotion {selection.promo} · {selection.ville}</p>
            <div className="flex gap-2 flex-wrap mb-6">
              <span className="font-mono text-[11px] bg-sand-2 text-[#54534c] px-2 py-1 rounded-sm">{selection.filiere}</span>
              <span className="font-mono text-[11px] bg-sand-2 text-[#54534c] px-2 py-1 rounded-sm">{selection.secteur}</span>
            </div>
            <button
              onClick={() => setSelection(null)}
              className="bg-indigo text-white text-sm font-medium px-5 py-2.5 rounded-sm"
            >
              Fermer
            </button>
          </div>
        </div>
      )}
    </>
  );
}