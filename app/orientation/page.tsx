"use client";

import { useState } from "react";

const guides = [
  { titre: "Choisir entre filière scientifique et littéraire", texte: "Les questions à se poser avant le choix de série en seconde." },
  { titre: "Préparer son dossier post-bac", texte: "Les documents et délais à anticiper après l'obtention du baccalauréat." },
  { titre: "S'orienter vers les métiers de la santé", texte: "Parcours type, concours et filières possibles après le bac." },
];

const temoignages = [
  { nom: "Ancien de la promotion 2018", parcours: "De la Bénédiction à la Faculté de médecine", texte: "Aujourd'hui interne en santé publique, il revient sur son parcours et les choix qui l'ont mené là." },
  { nom: "Ancien de la promotion 2016", parcours: "De la filière littéraire au droit", texte: "Aujourd'hui avocat à N'Djamena, il partage son expérience pour guider les nouveaux bacheliers." },
  { nom: "Ancienne de la promotion 2020", parcours: "De la Bénédiction à l'informatique", texte: "Actuellement développeuse, elle explique comment elle a découvert cette voie." },
];

export default function Orientation() {
  const [question, setQuestion] = useState("");
  const [envoye, setEnvoye] = useState(false);

  return (
    <>
      <section className="bg-indigo text-white py-16">
        <div className="max-w-[1120px] mx-auto px-8">
          <div className="font-mono text-[13px] tracking-wide uppercase text-gold-2 mb-4">
            Pour les nouveaux bacheliers
          </div>
          <h1 className="font-serif text-4xl md:text-5xl mb-4">Choisir sa voie, avec l&apos;appui des anciens</h1>
          <p className="text-[#D9D4C4] max-w-[560px] leading-relaxed">
            Avant de s&apos;engager dans une filière, lisez le parcours d&apos;un ancien qui est passé par là — ou posez-lui directement une question.
          </p>
        </div>
      </section>

      <section className="py-14">
        <div className="max-w-[1120px] mx-auto px-8">
          <h2 className="font-serif text-2xl text-indigo mb-6">Guides d&apos;orientation</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[#E3D9BC] border border-[#E3D9BC] mb-14">
            {guides.map((g) => (
              <div key={g.titre} className="bg-sand p-6">
                <div className="font-mono text-[11px] text-green uppercase tracking-wide mb-3">Guide</div>
                <h4 className="text-[16px] text-indigo mb-2">{g.titre}</h4>
                <p className="text-[13.5px] text-[#54534c] leading-relaxed">{g.texte}</p>
              </div>
            ))}
          </div>

          <h2 className="font-serif text-2xl text-indigo mb-6">Témoignages de parcours</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[#E3D9BC] border border-[#E3D9BC] mb-14">
            {temoignages.map((t) => (
              <div key={t.parcours} className="bg-sand p-6">
                <div className="font-mono text-[11px] text-brick uppercase tracking-wide mb-3">Témoignage</div>
                <h4 className="text-[16px] text-indigo mb-1">{t.parcours}</h4>
                <p className="text-[13px] text-[#6b6a63] mb-3">{t.nom}</p>
                <p className="text-[13.5px] text-[#54534c] leading-relaxed">{t.texte}</p>
              </div>
            ))}
          </div>

          <div className="bg-sand-2 border border-[#E3D9BC] rounded p-8 max-w-xl">
            <h3 className="font-serif text-xl text-indigo mb-2">Poser une question à un ancien</h3>
            <p className="text-[13.5px] text-[#54534c] mb-5">Un membre du bureau vous orientera vers un ancien pertinent.</p>
            {envoye ? (
              <p className="text-green text-sm font-medium">Merci, votre question a été enregistrée (démonstration).</p>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setEnvoye(true);
                }}
                className="flex flex-col gap-3"
              >
                <textarea
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  placeholder="Votre question..."
                  required
                  rows={3}
                  className="border border-[#E3D9BC] bg-white rounded-sm px-4 py-3 text-sm focus:outline-none focus:border-indigo"
                />
                <button type="submit" className="bg-indigo text-white text-sm font-medium px-5 py-2.5 rounded-sm w-fit">
                  Envoyer
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  );
}