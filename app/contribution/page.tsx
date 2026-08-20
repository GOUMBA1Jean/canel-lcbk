export default function Contribution() {
  const objectif = 500;
  const atteint = 187; // exemple pour la démonstration
  const pourcentage = Math.round((atteint / objectif) * 100);

  return (
    <>
      <section className="bg-brick text-white py-16">
        <div className="max-w-[1120px] mx-auto px-8">
          <div className="font-mono text-[13px] tracking-wide uppercase text-[#F2D2C6] mb-4">
            Opération en cours
          </div>
          <h1 className="font-serif text-4xl md:text-5xl mb-4">Chaque élève s&apos;acquitte de sa contribution</h1>
          <p className="text-[#F2D2C6] max-w-[600px] leading-relaxed">
            Un geste pour soutenir l&apos;éducation de nos successeurs et celle de la nation. Cette opération est portée collectivement par les membres de CANEL-LCBK.
          </p>
        </div>
      </section>

      <section className="py-14">
        <div className="max-w-[1120px] mx-auto px-8">
          <div className="bg-sand-2 border border-[#E3D9BC] rounded p-8 max-w-xl mb-10">
            <div className="flex justify-between items-baseline mb-3">
              <span className="text-sm text-[#54534c]">Avancement de l&apos;opération</span>
              <span className="font-mono text-sm text-brick">{pourcentage}%</span>
            </div>
            <div className="h-3 bg-white rounded-full overflow-hidden border border-[#E3D9BC]">
              <div className="h-full bg-brick rounded-full" style={{ width: `${pourcentage}%` }} />
            </div>
            <p className="text-[12.5px] text-[#9a9585] italic mt-3">
              {atteint} contributions sur un objectif de {objectif} — chiffres d&apos;exemple pour la démonstration.
            </p>
          </div>

          <h2 className="font-serif text-2xl text-indigo mb-4">Pourquoi contribuer</h2>
          <p className="text-[14.5px] text-[#54534c] leading-relaxed max-w-2xl mb-8">
            La contribution de chaque élève permet de soutenir l&apos;éducation de ses successeurs au Lycée Collège la Bénédiction de Kyabé, et plus largement de participer à l&apos;effort collectif pour l&apos;éducation de la nation.
          </p>

          <a href="#" className="inline-block bg-brick text-white font-semibold text-[15px] px-7 py-3.5 rounded-sm">
            Participer depuis CANEL-LCBK
          </a>
        </div>
      </section>
    </>
  );
}