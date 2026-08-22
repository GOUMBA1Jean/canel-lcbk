export default function Contribution() {
  const objectif = 500;
  const atteint = 187;
  const pourcentage = Math.round((atteint / objectif) * 100);

  return (
    <>
      <section className="bg-[#8B7355] text-white py-16">
        <div className="max-w-[1120px] mx-auto px-5 md:px-8">
          <div className="font-mono text-[13px] tracking-wide uppercase text-[#D5C9B8] mb-4">Opération en cours</div>
          <h1 className="font-serif text-4xl md:text-5xl mb-4">Chaque élève s&apos;acquitte de sa contribution</h1>
          <p className="text-[#EAE0D0] max-w-[600px] leading-relaxed">
            Un geste pour soutenir l&apos;éducation de nos successeurs et celle de la nation.
          </p>
        </div>
      </section>
      <section className="py-14 bg-[#FAFAF8]">
        <div className="max-w-[1120px] mx-auto px-5 md:px-8">
          <div className="bg-[#F0EAE0] border border-[#D5C9B8] rounded p-8 max-w-xl mb-10">
            <div className="flex justify-between items-baseline mb-3">
              <span className="text-sm text-[#6B6B6B]">Avancement de l&apos;opération</span>
              <span className="font-mono text-sm text-[#8B7355]">{pourcentage}%</span>
            </div>
            <div className="h-3 bg-white rounded-full overflow-hidden border border-[#D5C9B8]">
              <div className="h-full bg-[#8B7355] rounded-full" style={{ width: `${pourcentage}%` }} />
            </div>
            <p className="text-[12.5px] text-[#9a9a9a] italic mt-3">
              {atteint} contributions sur un objectif de {objectif} — chiffres d&apos;exemple.
            </p>
          </div>
          <h2 className="font-serif text-2xl text-[#1E5A8E] mb-4">Pourquoi contribuer</h2>
          <p className="text-[14.5px] text-[#6B6B6B] leading-relaxed max-w-2xl mb-8">
            La contribution de chaque élève permet de soutenir l&apos;éducation de ses successeurs au Lycée Collège la Bénédiction de Kyabé.
          </p>
          <a href="https://chat.whatsapp.com/JuQvIvpnfdcH06e62u1zsc?s=cl&p=a&ilr=1" target="_blank" rel="noopener noreferrer" className="inline-block bg-[#8B7355] text-white font-semibold text-[15px] px-7 py-3.5 rounded-sm">
            Participer depuis CANEL-LCBK
          </a>
        </div>
      </section>
    </>
  );
}