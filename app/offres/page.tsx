const offres = [
  { titre: "Stage — Développement web", type: "Stage", lieu: "N'Djamena", auteur: "Partagé par un ancien" },
  { titre: "Poste — Agent de santé communautaire", type: "Emploi", lieu: "Sarh", auteur: "Partagé par un ancien" },
  { titre: "Bourse d'études — Licence en sciences", type: "Bourse", lieu: "N'Djamena", auteur: "Partagé par le bureau" },
  { titre: "Stage — Comptabilité", type: "Stage", lieu: "Kyabé", auteur: "Partagé par un ancien" },
];

export default function Offres() {
  return (
    <>
      <section className="bg-[#1E5A8E] text-white py-16">
        <div className="max-w-[1120px] mx-auto px-5 md:px-8">
          <div className="font-mono text-[13px] tracking-wide uppercase text-[#A8CBE8] mb-4">Insertion professionnelle</div>
          <h1 className="font-serif text-4xl md:text-5xl mb-4">Offres partagées par le réseau</h1>
          <p className="text-[#D0E4F2] max-w-[560px] leading-relaxed">
            Emplois, stages et bourses partagés par les membres de CANEL-LCBK.
          </p>
        </div>
      </section>
      <section className="py-14 bg-[#FAFAF8]">
        <div className="max-w-[1120px] mx-auto px-5 md:px-8">
          <div className="flex flex-col gap-px bg-[#D5C9B8] border border-[#D5C9B8] mb-4">
            {offres.map((o) => (
              <div key={o.titre} className="bg-[#FAFAF8] p-6 px-7 flex justify-between items-center flex-wrap gap-3">
                <div>
                  <h4 className="text-[16px] text-[#1E5A8E] mb-1">{o.titre}</h4>
                  <p className="text-[13px] text-[#6B6B6B]">{o.auteur} · {o.lieu}</p>
                </div>
                <span className="font-mono text-[11px] bg-[#B5966E] text-white px-2.5 py-1.5 rounded-sm">{o.type}</span>
              </div>
            ))}
          </div>
          <p className="text-[12.5px] text-[#9a9a9a] italic">Exemples illustratifs pour la démonstration.</p>
        </div>
      </section>
    </>
  );
}