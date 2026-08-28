import type { Metadata } from "next";
import { Fraunces, Inter, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-fraunces",
  display: "swap",
});
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});
const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["500"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "CANEL-LCBK — Cercle des Anciens et Nouveaux Élèves",
    template: "%s | CANEL-LCBK",
  },
  description: "Plateforme officielle du Cercle des Anciens et Nouveaux Élèves du Lycée Collège la Bénédiction de Kyabé (CANEL-LCBK). Annuaire, orientation, offres d'emploi et actualités.",
  keywords: ["CANEL-LCBK", "Lycée Bénédiction Kyabé", "anciens élèves Kyabé", "LCBK Tchad", "orientation baccalauréat Tchad", "ressortissants Bénédiction"],
  authors: [{ name: "CANEL-LCBK" }],
  creator: "CANEL-LCBK",
  metadataBase: new URL("https://canel-lcbk.vercel.app"),
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://canel-lcbk.vercel.app",
    siteName: "CANEL-LCBK",
    title: "CANEL-LCBK — Cercle des Anciens et Nouveaux Élèves",
    description: "Plateforme officielle du Cercle des Anciens et Nouveaux Élèves du Lycée Collège la Bénédiction de Kyabé. Annuaire, orientation, offres et actualités.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "CANEL-LCBK — Lycée Collège la Bénédiction de Kyabé" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "CANEL-LCBK — Cercle des Anciens et Nouveaux Élèves",
    description: "Plateforme officielle du Cercle des Anciens et Nouveaux Élèves du Lycée Collège la Bénédiction de Kyabé.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className="scroll-smooth">
      <body className={`${fraunces.variable} ${inter.variable} ${plexMono.variable} font-sans bg-[#FAFAF8] text-[#1a1a1a] antialiased`}>
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-[#1E5A8E] text-white px-4 py-2 rounded-sm z-50">
          Aller au contenu principal
        </a>
        <Header />
        <main id="main-content">
          {children}
        </main>
        <Footer />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}