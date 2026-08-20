const responsables = [
  { nom: "Président du bureau", role: "Coordination générale de CANEL-LCBK" },
  { nom: "Secrétaire", role: "Suivi des échanges et des décisions du bureau" },
  { nom: "Chargé de l'orientation", role: "Coordination des guides et du mentorat" },
  { nom: "Chargé de la contribution", role: "Suivi de l'opération de contribution en cours" },
];

export default function Bureau() {
  return (
    <>
      <section className="bg-indigo text-white py-16">
        <div className="max-w-[1120px] mx-auto px-8">
          <div className="font-mono text-[13px] tracking-wide uppercase text-gold-2 mb-4">CANEL-LCBK</div>
          <h1 className="font-serif text-4xl md:text-5xl mb-4">Le bureau</h1>
          <p className="text-[#D9D4C4] max-w-[560px] leading-relaxed">
            Les responsables qui coordonnent CANEL-LCBK, en ligne et en présentiel à Kyabé.
          </p>
        </div>
      </section>

      <section className="py-14">
        <div className="max-w-[1120px] mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[#E3D9BC] border border-[#E3D9BC] mb-14">
            {responsables.map((r) => (
              <div key={r.nom} className="bg-sand p-6 flex items-start gap-4">
                <div className="w-11 h-11 rounded-full bg-indigo text-gold-2 flex items-center justify-center font-serif text-lg shrink-0">
                  {r.nom.charAt(0)}
                </div>
                <div>
                  <h4 className="text-[16px] text-indigo mb-1">{r.nom}</h4>
                  <p className="text-[13.5px] text-[#6b6a63]">{r.role}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-sand-2 border border-[#E3D9BC] rounded p-8 max-w-xl">
            <h3 className="font-serif text-xl text-indigo mb-4">Nous contacter</h3>
            <div className="flex flex-col gap-3">
              <a href="https://chat.whatsapp.com/JuQvIvpnfdcH06e62u1zsc?s=cl&p=a&ilr=1" target="_blank" rel="noopener noreferrer" className="text-indigo font-medium text-sm underline">Groupe WhatsApp CANEL-LCBK</a>
              <a href="https://www.facebook.com/profile.php?id=100090022194547" target="_blank" rel="noopener noreferrer" className="text-indigo font-medium text-sm underline">Page Facebook</a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}