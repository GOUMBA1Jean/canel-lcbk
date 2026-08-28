import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Opération de contribution",
  description: "Participez à l'opération de contribution des élèves du Lycée Collège la Bénédiction de Kyabé.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}