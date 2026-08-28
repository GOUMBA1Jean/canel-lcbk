import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Actualités",
  description: "Suivez les dernières nouvelles du Lycée Collège la Bénédiction de Kyabé et de CANEL-LCBK.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}