import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Orientation des bacheliers",
  description: "Guides, témoignages et conseillers pour aider les nouveaux bacheliers du LCBK à choisir leur voie.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}