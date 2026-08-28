import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Offres d'emploi et stages",
  description: "Offres d'emploi, stages et bourses partagés par les membres du réseau CANEL-LCBK.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}