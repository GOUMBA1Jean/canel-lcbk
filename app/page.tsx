const piliers = [
  { num: "01", titre: "Annuaire", texte: "Retrouvez un ancien par promotion, filière ou secteur d'activité." },
  { num: "02", titre: "Orientation", texte: "Des guides et des témoignages pour aider les nouveaux bacheliers à choisir leur voie." },
  { num: "03", titre: "Emploi", texte: "Les offres et stages partagés par les membres, au même endroit." },
  { num: "04", titre: "Actualités", texte: "Ce qui avance à l'établissement, sans se perdre dans un fil de discussion." },
  { num: "05", titre: "Échange", texte: "Un espace de discussion structuré, en complément de CANEL-LCBK." },
];

const promotions = [
  "2015 – 2016",
  "2017 – 2018",
  "2019 – 2020",
  "2021 – 2022",
  "2023 – 2024",
  "2025 – 2026",
];

const presentiel = [
  { num: "01", titre: "Formations et conférences", texte: "Les membres de CANEL-LCBK organisent des sessions de partage de connaissances au sein de l'établissement." },
  { num: "02", titre: "Rencontres avec l'administration", texte: "Des réunions régulières avec la direction pour faire avancer les projets d'amélioration de l'établissement." },
  { num: "03", titre: "Brassage entre générations", texte: "Anciens et nouveaux élèves se retrouvent en présentiel, dans le prolongement des échanges du canal." },
];

const offres = [
  { titre: "Stage — Développement web", lieu: "Partagé par un ancien, N'Djamena" },
  { titre: "Poste — Agent de santé communautaire", lieu: "Partagé par un ancien, Sarh" },
  { titre: "Bourse d'études — Licence en sciences", lieu: "Partagé par le bureau" },
];

export default function Home() {
  return (
    <>

      {{/* HERO */}
<section className="bg-indigo text-white py-16 md:py-24">
  <div className="max-w-[1120px] mx-auto px-5 md:px-8">
    <div className="font-mono text-[11px] md:text-[13px] tracking-wide uppercase text-gold-2 mb-4">
      CANEL-LCBK · Lycée Collège la Bénédiction de Kyabé · Depuis 2009
    </div>
    <h1 className="font-serif text-[38px] md:text-6xl leading-tight max-w-[680px] mb-5">
      Une chaîne qui <em className="text-gold-2 not-italic italic">continue</em>.
    </h1>
    <p className="text-[15px] md:text-lg leading-relaxed max-w-[520px] text-[#D9D4C4] mb-8">
      Chaque promotion est un maillon. CANEL-LCBK relie les anciens élèves d&apos;hier à ceux d&apos;aujourd&apos;hui — pour le partage intellectuel, le brassage et la connaissance entre tous les ressortissants de notre établissement.
    </p>
    <div className="flex flex-col sm:flex-row gap-3">
      <a href="/annuaire" className="bg-gold-2 text-indigo font-semibold text-[15px] px-6 py-3.5 rounded-sm text-center">
        Rejoindre l&apos;annuaire
      </a>
      <a href="#piliers" className="border border-white/30 text-white font-medium text-[15px] px-6 py-3.5 rounded-sm text-center">
        Découvrir le projet
      </a>
    </div>
  </div>
</section>

      {/* STATS */}
      <div className="bg-sand-2 border-b border-[#E3D9BC] py-7">
        <div className="max-w-[1120px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 px-8">
          {[
            ["2009", "Première rentrée scolaire"],
            ["—", "Anciens inscrits"],
            ["—", "Promotions représentées"],
            ["—", "Offres partagées"],
          ].map(([num, label]) => (
            <div key={label}>
              <div className="font-serif text-3xl text-indigo font-mono">{num}</div>
              <div className="text-[13px] text-[#6b6a63] mt-1">{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* PILIERS */}
      <section className="py-22" id="piliers">
        <div className="max-w-[1120px] mx-auto px-8">
          <div className="max-w-[560px] mb-13">
            <div className="font-mono text-xs uppercase tracking-wide text-brick mb-3.5">Ce que fait la plateforme</div>
            <h2 className="font-serif text-[34px] text-indigo">Cinq piliers, un seul réseau</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[#E3D9BC] border border-[#E3D9BC]">
            {piliers.map((p) => (
              <div key={p.num} className="bg-sand p-8">
                <div className="font-mono text-[13px] text-gold mb-4">{p.num}</div>
                <h3 className="font-serif text-lg text-indigo mb-2.5">{p.titre}</h3>
                <p className="text-[14.5px] leading-relaxed text-[#54534c]">{p.texte}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CHAÎNE DES PROMOTIONS */}
      <section className="bg-indigo text-white py-22">
        <div className="max-w-[1120px] mx-auto px-8">
          <div className="max-w-[560px] mb-13">
            <div className="font-mono text-xs uppercase tracking-wide text-gold-2 mb-3.5">La chaîne des promotions</div>
            <h2 className="font-serif text-[34px] text-white">D&apos;une génération à l&apos;autre</h2>
            <p className="text-[15px] text-[#c9c4b3] mt-3 leading-relaxed">
              Chaque promotion garde sa place. Cliquez sur un maillon pour voir les anciens de cette année-là (fonctionnalité à activer avec l&apos;annuaire réel).
            </p>
          </div>
          <div className="ribbon flex overflow-x-auto pb-5">
            {promotions.map((yr, i) => (
              <div key={yr} className="flex items-center flex-none">
                <div
                  className={`w-[150px] rounded border p-4.5 bg-white/5 ${
                    i === promotions.length - 1 ? "border-gold-2" : "border-white/15"
                  }`}
                >
                  <div className="font-mono text-[13px] text-gold-2">{yr}</div>
                  <div className="text-[13px] text-[#D9D4C4] mt-1.5">
                    {i === promotions.length - 1 ? "Promotion actuelle" : "Promotion"}
                  </div>
                </div>
                {i < promotions.length - 1 && (
                  <div className="w-8.5 h-px bg-white/25 relative after:content-[''] after:absolute after:-right-[3px] after:-top-[3px] after:w-[7px] after:h-[7px] after:rounded-full after:bg-gold-2" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRÉSENTIEL */}
      <section className="py-22">
        <div className="max-w-[1120px] mx-auto px-8">
          <div className="max-w-[560px] mb-13">
            <div className="font-mono text-xs uppercase tracking-wide text-brick mb-3.5">Au-delà de l&apos;écran</div>
            <h2 className="font-serif text-[34px] text-indigo">Une communauté qui se retrouve aussi à Kyabé</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[#E3D9BC] border border-[#E3D9BC]">
            {presentiel.map((p) => (
              <div key={p.num} className="bg-sand p-7.5">
                <div className="w-8.5 h-8.5 rounded-full bg-indigo text-gold-2 flex items-center justify-center font-mono text-[13px] mb-4">
                  {p.num}
                </div>
                <h4 className="text-[16.5px] text-indigo mb-2">{p.titre}</h4>
                <p className="text-[13.5px] leading-relaxed text-[#54534c]">{p.texte}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ORIENTATION */}
      <section className="bg-sand-2 py-22">
        <div className="max-w-[1120px] mx-auto px-8 grid grid-cols-1 md:grid-cols-[1.1fr_0.9fr] gap-14 items-center">
          <div>
            <div className="font-mono text-xs uppercase tracking-wide text-brick mb-3.5">Pour les nouveaux bacheliers</div>
            <h2 className="font-serif text-[32px] text-indigo mb-4.5">Choisir sa voie, avec l&apos;appui des anciens</h2>
            <p className="text-[15.5px] leading-relaxed text-[#54534c] mb-6.5">
              Avant de s&apos;engager dans une filière, un bachelier peut lire le parcours d&apos;un ancien qui est passé par là — et lui poser directement une question.
            </p>
            <a href=" /orientation" className="inline-block border border-indigo text-indigo font-medium text-[15px] px-6.5 py-3.5 rounded-sm">
              Voir les ressources d&apos;orientation
            </a>
          </div>
          <div>
            <div className="bg-white border border-[#E3D9BC] border-l-[3px] border-l-green rounded p-5.5 mb-3.5">
              <div className="font-mono text-[11.5px] text-green uppercase tracking-wide">Témoignage</div>
              <h4 className="text-base text-indigo mt-1.5 mb-1">De la Bénédiction à la Faculté de médecine</h4>
              <p className="text-[13.5px] text-[#6b6a63]">Parcours d&apos;un ancien de la promotion 2018, aujourd&apos;hui interne en santé publique.</p>
            </div>
            <div className="bg-white border border-[#E3D9BC] border-l-[3px] border-l-green rounded p-5.5">
              <div className="font-mono text-[11.5px] text-green uppercase tracking-wide">Guide</div>
              <h4 className="text-base text-indigo mt-1.5 mb-1">Choisir entre filière scientifique et littéraire</h4>
              <p className="text-[13.5px] text-[#6b6a63]">Les questions à se poser avant le choix de série.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CONTRIBUTION */}
      <section className="bg-brick text-white py-14">
        <div className="max-w-[1120px] mx-auto px-8 flex justify-between items-center gap-10 flex-wrap">
          <div className="max-w-[560px]">
            <div className="font-mono text-xs uppercase tracking-wide text-[#F2D2C6] mb-3.5">Opération en cours</div>
            <h2 className="font-serif text-[30px] text-white mb-3.5">Chaque élève s&apos;acquitte de sa contribution</h2>
            <p className="text-[15px] leading-relaxed text-[#F2D2C6]">
              Un geste pour soutenir l&apos;éducation de nos successeurs et celle de la nation. Suivez l&apos;avancement de l&apos;opération et participez directement depuis CANEL-LCBK.
            </p>
          </div>
          <a href=" /contribution" className="bg-white text-brick font-semibold text-[15px] px-7 py-3.5 rounded-sm whitespace-nowrap">
            Voir l&apos;opération
          </a>
        </div>
      </section>

      {/* OFFRES */}
      <section className="py-22">
        <div className="max-w-[1120px] mx-auto px-8">
          <div className="max-w-[560px] mb-13">
            <div className="font-mono text-xs uppercase tracking-wide text-brick mb-3.5">Insertion professionnelle</div>
            <h2 className="font-serif text-[34px] text-indigo">Offres partagées par le réseau</h2>
          </div>
          <div className="flex flex-col gap-px bg-[#E3D9BC] border border-[#E3D9BC]">
            {offres.map((o) => (
              <div key={o.titre} className="bg-sand p-5.5 px-6.5 flex justify-between items-center">
                <div>
                  <h4 className="text-base text-indigo mb-1">{o.titre}</h4>
                  <p className="text-[13px] text-[#6b6a63]">{o.lieu}</p>
                </div>
                <span className="font-mono text-[11px] bg-gold text-white px-2.5 py-1.5 rounded-sm whitespace-nowrap">
                  Exemple
                </span>
              </div>
            ))}
          </div>
          <div className="text-[12.5px] text-[#9a9585] mt-4 italic">
            Ces offres sont des exemples illustratifs pour la démonstration — elles seront remplacées par les vraies annonces des membres.
          </div>
        </div>
      </section>
    </>
  );
}