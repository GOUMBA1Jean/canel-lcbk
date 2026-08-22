const liensSuivre = [
  { label: "Le bureau", href: "/bureau", externe: false },
  { label: "Page Facebook", href: "https://www.facebook.com/profile.php?id=100090022194547", externe: true },
  { label: "Groupe WhatsApp", href: "https://chat.whatsapp.com/JuQvIvpnfdcH06e62u1zsc?s=cl&p=a&ilr=1", externe: true },
];

export default function Footer() {
  return (
    <footer className="bg-[#1E5A8E] text-[#D0E4F2] pt-14 pb-9">
      <div className="max-w-[1120px] mx-auto px-5 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr] gap-10 mb-10">
          <div>
            <h5 className="font-serif text-white text-[17px] mb-3">CANEL-LCBK</h5>
            <p className="text-[13.5px] leading-relaxed max-w-[320px]">
              Le canal des ressortissants, anciens et nouveaux élèves du Lycée Collège la Bénédiction de Kyabé — partage intellectuel, brassage et connaissance, depuis 2009.
            </p>
          </div>
          <div>
            <h5 className="font-serif text-white text-[17px] mb-3">Plateforme</h5>
            {[
              { label: "Annuaire", href: "/annuaire" },
              { label: "Orientation", href: "/orientation" },
              { label: "Contribution", href: "/contribution" },
              { label: "Offres", href: "/offres" },
            ].map((l) => (
              <a key={l.label} href={l.href} className="block text-[13.5px] py-1 opacity-80 hover:opacity-100">{l.label}</a>
            ))}
          </div>
          <div>
            <h5 className="font-serif text-white text-[17px] mb-3">Nous suivre</h5>
            {liensSuivre.map((l) =>
              l.externe ? (
                <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer" className="block text-[13.5px] py-1 opacity-80 hover:opacity-100">{l.label}</a>
              ) : (
                <a key={l.label} href={l.href} className="block text-[13.5px] py-1 opacity-80 hover:opacity-100">{l.label}</a>
              )
            )}
          </div>
        </div>
        <div className="border-t border-white/15 pt-5 text-[12.5px] opacity-60">
          Lycée Collège la Bénédiction de Kyabé — CANEL-LCBK
        </div>
      </div>
    </footer>
  );
}