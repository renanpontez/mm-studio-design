import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SiteAnimations } from "@/components/SiteAnimations";

export const metadata: Metadata = {
  title: "MM Studio Design · Espaços que respiram sua história",
  description:
    "Estúdio de design de interiores em Fortaleza, fundado por Marly Martins e Emilly Lorrany. Projetos residenciais e corporativos com olhar sustentável.",
  openGraph: {
    title: "MM Studio Design · Espaços que respiram sua história",
    description:
      "Estúdio de design de interiores em Fortaleza com olhar sustentável.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className="h-full">
      <body className="min-h-full flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <SiteAnimations />
      </body>
    </html>
  );
}
