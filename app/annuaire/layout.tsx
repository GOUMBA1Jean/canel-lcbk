import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Annuaire des anciens",
  description: "Retrouvez les anciens élèves du Lycée Collège la Bénédiction de Kyabé par promotion, filière ou secteur d'activité.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}