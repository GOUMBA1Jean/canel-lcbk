export default function APropos() {
  return (
    <>
      <section className="bg-[#1E5A8E] text-white py-16">
        <div className="max-w-[680px] mx-auto px-5">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-6 h-px bg-[#B5966E]" />
            <span className="text-[#B5966E] text-[11px] font-semibold tracking-[0.12em] uppercase">CANEL-LCBK · Depuis 2009</span>
          </div>
          <h1 className="font-serif text-4xl md:text-5xl mb-4">
            Cercle des Anciens et Nouveaux Élèves
          </h1>
          <p className="text-[#D0E4F2] max-w-[520px] leading-relaxed">
            Un réseau, une famille, une histoire — au service des élèves du Lycée Collège la Bénédiction de Kyabé.
          </p>
        </div>
      </section>

      {/* Notre mission */}
      <section className="py-16 bg-[#F5F0E8]">
        <div className="max-w-[680px] mx-auto px-5">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-6 h-px bg-[#B5966E]" />
            <span className="text-[#B5966E] text-[11px] font-semibold tracking-[0.12em] uppercase">Notre mission</span>
          </div>
          <h2 className="font-serif text-3xl text-[#1E5A8E] mb-6">
            Rassembler. Soutenir. Transmettre.
          </h2>
          <p className="text-[15px] text-[#54534c] leading-relaxed mb-4">
            CANEL-LCBK rassemble les anciens et nouveaux élèves du Lycée Collège la Bénédiction de Kyabé autour d&apos;une vision commune : renforcer les liens entre générations, soutenir l&apos;établissement et valoriser les valeurs qui nous ont été transmises.
          </p>
          <p className="text-[15px] text-[#54534c] leading-relaxed">
            Présente au Tchad et dans la diaspora, l&apos;association constitue aujourd&apos;hui un réseau vivant, actif et engagé pour les générations présentes et futures.
          </p>

          <div className="mt-10 flex flex-col gap-4">
            {[
              "Maintenir le lien entre tous les ressortissants de la Bénédiction",
              "Soutenir concrètement l'établissement et ses élèves",
              "Créer des opportunités professionnelles et personnelles",
              "Honorer la mémoire et les valeurs de l'établissement",
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full border border-[#B5966E] flex items-center justify-center shrink-0 mt-0.5">
                  <svg width="10" height="10" fill="none" stroke="#B5966E" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path d="M20 6L9 17l-5-5"/>
                  </svg>
                </div>
                <p className="text-[15px] text-[#54534c] leading-relaxed">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Notre histoire */}
      <section className="py-16 bg-white border-t border-[#E8E0D0]">
        <div className="max-w-[680px] mx-auto px-5">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-6 h-px bg-[#B5966E]" />
            <span className="text-[#B5966E] text-[11px] font-semibold tracking-[0.12em] uppercase">Notre histoire</span>
          </div>
          <h2 className="font-serif text-3xl text-[#1E5A8E] mb-10">Une histoire commune</h2>

          <div className="flex flex-col gap-10">
            {[
              {
                annee: "2009",
                titre: "Fondation de CANEL-LCBK",
                texte: "L'association est fondée par d'anciens élèves soucieux de maintenir le lien entre les générations de ressortissants du Lycée Collège la Bénédiction de Kyabé.",
              },
              {
                annee: "2015",
                titre: "Expansion du réseau",
                texte: "Le réseau s'étend progressivement à travers le Tchad et dans la diaspora. Les membres se retrouvent autour de projets communs pour soutenir l'établissement.",
              },
              {
                annee: "2020",
                titre: "Structuration du bureau",
                texte: "Mise en place d'un bureau officiel avec des responsables dédiés à la coordination des activités, de l'orientation et des contributions.",
              },
              {
                annee: "2024",
                titre: "Plateforme numérique",
                texte: "Lancement de la plateforme CANEL-LCBK : annuaire des anciens, actualités, offres d'emploi et orientation — un outil au service du réseau.",
              },
            ].map((e, i) => (
              <div key={i} className="flex gap-6">
                <div className="shrink-0 text-right">
                  <span className="font-mono text-[13px] text-[#B5966E] font-semibold">{e.annee}</span>
                </div>
                <div className="border-l border-[#D5C9B8] pl-6 pb-2">
                  <h3 className="font-serif text-[18px] text-[#1E5A8E] mb-2">{e.titre}</h3>
                  <p className="text-[14px] text-[#6B6B6B] leading-relaxed">{e.texte}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Nos valeurs */}
      <section className="py-16 bg-[#F5F0E8] border-t border-[#E8E0D0]">
        <div className="max-w-[680px] mx-auto px-5">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-6 h-px bg-[#B5966E]" />
            <span className="text-[#B5966E] text-[11px] font-semibold tracking-[0.12em] uppercase">Nos valeurs</span>
          </div>
          <h2 className="font-serif text-3xl text-[#1E5A8E] mb-10">Les principes qui nous guident</h2>

          <div className="flex flex-col gap-px bg-[#D5C9B8] border border-[#D5C9B8]">
            {[
              {
                titre: "Solidarité",
                texte: "S'entraider à travers les générations, les métiers et les régions. Chaque membre du réseau est une ressource pour les autres.",
              },
              {
                titre: "Excellence",
                texte: "Perpétuer les standards du Lycée Collège la Bénédiction dans tout ce que nous faisons — dans nos carrières et dans notre engagement associatif.",
              },
              {
                titre: "Intégrité",
                texte: "Gouverner l'association avec transparence et honnêteté en toutes circonstances.",
              },
              {
                titre: "Engagement",
                texte: "Contribuer activement à la vie de l'association et au développement de l'établissement qui nous a formés.",
              },
            ].map((v, i) => (
              <div key={i} className="bg-white p-6 border-b border-[#E8E0D0] last:border-0">
                <h3 className="font-serif text-[17px] text-[#1E5A8E] mb-2">{v.titre}</h3>
                <p className="text-[14px] text-[#6B6B6B] leading-relaxed">{v.texte}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}