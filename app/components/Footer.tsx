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
          <div className="space-y-3">
  <h3 className="font-semibold">Nous suivre</h3>

  <a
    href="TON_LIEN_FACEBOOK"
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center gap-2 hover:opacity-80 transition"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className="w-5 h-5"
      fill="currentColor"
    >
      <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073c0 6.019 4.388 11.005 10.125 11.927v-8.437H7.078v-3.49h3.047V9.413c0-3.017 1.792-4.686 4.533-4.686 1.312 0 2.686.235 2.686.235v2.975h-1.514c-1.491 0-1.956.93-1.956 1.887v2.249h3.328l-.532 3.49h-2.796V24C19.612 23.078 24 18.092 24 12.073z" />
    </svg>

    <span>Page Facebook</span>
  </a>

  <a
    href="TON_LIEN_WHATSAPP"
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center gap-2 hover:opacity-80 transition"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className="w-5 h-5"
      fill="currentColor"
    >
      <path d="M20.52 3.48A11.86 11.86 0 0012.04 0C5.49 0 .16 5.33.16 11.89c0 2.09.55 4.13 1.59 5.93L.05 24l6.34-1.66a11.87 11.87 0 005.65 1.43h.01c6.55 0 11.88-5.33 11.88-11.89a11.84 11.84 0 00-3.41-8.4zM12.05 21.74a9.84 9.84 0 01-5.02-1.37l-.36-.21-3.76.98 1-3.66-.23-.38a9.86 9.86 0 01-1.52-5.21c0-5.43 4.42-9.85 9.86-9.85 2.63 0 5.1 1.03 6.96 2.89a9.81 9.81 0 012.89 6.96c-.01 5.43-4.43 9.85-9.82 9.85zm5.41-7.38c-.3-.15-1.77-.87-2.05-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.47-.89-.79-1.49-1.76-1.66-2.06-.17-.3-.02-.46.13-.61.14-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.61-.92-2.21-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.05 1.03-1.05 2.5s1.08 2.9 1.23 3.1c.15.2 2.12 3.24 5.14 4.54.72.31 1.28.49 1.72.63.72.23 1.37.2 1.89.12.58-.09 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35z" />
    </svg>

    <span>Groupe WhatsApp</span>
  </a>
</div>
        </div>
        <div className="border-t border-white/15 pt-5 text-[12.5px] opacity-60">
          Lycée Collège la Bénédiction de Kyabé — CANEL-LCBK
        </div>
      </div>
    </footer>
  );
}