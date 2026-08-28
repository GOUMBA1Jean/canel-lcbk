import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Le bureau",
  description: "Les responsables qui coordonnent CANEL-LCBK, en ligne et en présentiel à Kyabé.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}