const bureau = [
  { nom: "DOURO SAMUEL GOUMEH", role: "Président du bureau CANEL-LCBK", whatsapp: "23566308130", mail: "dourousamuel@gmail.com" },
  { nom: "NGAGUE OLIVIER", role: "Vice-Président", whatsapp: "23565027470", mail: "olivierngague@gmail.com" },
  { nom: "DANAI NDJAHA GERARD", role: "Secrétaire", whatsapp: "23566521369", mail: "danaindjaha@mail.com" },
];

const WIcon = () => (
  <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

const MIcon = () => (
  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
    <polyline points="22,6 12,13 2,6"/>
  </svg>
);

export default function Bureau() {
  return (
    <>
      <section className="bg-indigo text-white py-16">
        <div className="max-w-[1120px] mx-auto px-5 md:px-8">
          <div className="font-mono text-[13px] tracking-wide uppercase text-gold-2 mb-4">CANEL-LCBK</div>
          <h1 className="font-serif text-4xl md:text-5xl mb-4">Le bureau</h1>
          <p className="text-[#D9D4C4] max-w-[560px] leading-relaxed">
            Les responsables qui coordonnent CANEL-LCBK, en ligne et en présentiel à Kyabé.
          </p>
        </div>
      </section>

      <section className="py-14">
        <div className="max-w-[1120px] mx-auto px-5 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[#E3D9BC] border border-[#E3D9BC] mb-14">
            {bureau.map((m) => (
              <div key={m.nom} className="bg-sand p-6 flex flex-col gap-4">
                <div className="w-12 h-12 rounded-full bg-indigo text-gold-2 flex items-center justify-center font-serif text-xl">
                  {m.nom.charAt(0)}
                </div>
                <div>
                  <h4 className="text-[16px] font-semibold text-indigo mb-1">{m.nom}</h4>
                  <p className="text-[13px] text-[#6b6a63] mb-4">{m.role}</p>
                  <div className="flex flex-col gap-2">
                    <a href={"https://wa.me/" + m.whatsapp} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-[#25D366] text-white text-[13px] font-medium px-4 py-2 rounded-sm w-fit">
                      <WIcon /> WhatsApp
                    </a>
                    <a href={"mailto:" + m.mail} className="inline-flex items-center gap-2 border border-indigo text-indigo text-[13px] font-medium px-4 py-2 rounded-sm w-fit">
                      <MIcon /> Email
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-sand-2 border border-[#E3D9BC] rounded p-8 max-w-xl">
            <h3 className="font-serif text-xl text-indigo mb-3">Rejoindre CANEL-LCBK</h3>
            <p className="text-[13.5px] text-[#54534c] mb-5">
              Rejoignez le groupe WhatsApp pour suivre les actualités, participer aux échanges et contribuer à la vie de CANEL-LCBK.
            </p>
            <a href="https://chat.whatsapp.com/JuQvIvpnfdcH06e62u1zsc?s=cl&amp;p=a&amp;ilr=1" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-[#25D366] text-white font-semibold text-[15px] px-6 py-3.5 rounded-sm">
              <WIcon /> Rejoindre le groupe CANEL-LCBK
            </a>
          </div>
        </div>
      </section>
    </>
  );
}