const actus = [
  { date: "Août 2026", tag: "Établissement", titre: "Réunion du bureau avec l'administration de LCBK", texte: "Un point d'étape sur les projets d'amélioration en cours au sein de l'établissement." },
  { date: "Juillet 2026", tag: "Formation", titre: "Session de partage de connaissances à Kyabé", texte: "Des anciens sont revenus animer un atelier pour les élèves actuels." },
  { date: "Juin 2026", tag: "Contribution", titre: "Lancement de l'opération de contribution", texte: "Chaque élève est appelé à s'acquitter de sa contribution pour soutenir l'éducation de ses successeurs." },
  { date: "Mai 2026", tag: "Rencontre", titre: "Conférence sur l'orientation post-bac", texte: "Des anciens ont partagé leur parcours avec les élèves de terminale." },
];

export default function Actualites() {
  return (
    <>
      <section className="bg-indigo text-white py-16">
        <div className="max-w-[1120px] mx-auto px-8">
          <div className="font-mono text-[13px] tracking-wide uppercase text-gold-2 mb-4">CANEL-LCBK</div>
          <h1 className="font-serif text-4xl md:text-5xl mb-4">Actualités</h1>
          <p className="text-[#D9D4C4] max-w-[560px] leading-relaxed">
            Ce qui avance à l&apos;établissement, sans se perdre dans un fil de discussion.
          </p>
        </div>
      </section>

      <section className="py-14">
        <div className="max-w-[1120px] mx-auto px-8 flex flex-col gap-px bg-[#E3D9BC] border border-[#E3D9BC]">
          {actus.map((a) => (
            <div key={a.titre} className="bg-sand p-7 flex flex-col md:flex-row md:items-start gap-2 md:gap-8">
              <div className="font-mono text-[12px] text-[#9a9585] md:w-28 shrink-0">{a.date}</div>
              <div>
                <span className="font-mono text-[11px] bg-gold text-white px-2 py-1 rounded-sm">{a.tag}</span>
                <h4 className="text-[17px] text-indigo mt-2 mb-1.5">{a.titre}</h4>
                <p className="text-[14px] text-[#54534c] leading-relaxed">{a.texte}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="max-w-[1120px] mx-auto px-8 text-[12.5px] text-[#9a9585] italic mt-6">
          Exemples illustratifs — les vraies actualités seront publiées par le bureau.
        </div>
      </section>
    </>
  );
}