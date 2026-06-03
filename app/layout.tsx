import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SiteAnimations } from "@/components/SiteAnimations";
import { sanityFetch } from "@/sanity/client";
import { NAVIGATION_QUERY, SITE_SETTINGS_QUERY } from "@/sanity/queries";
import type { Navigation, SiteSettings } from "@/sanity/types";

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

async function fetchChrome() {
  const [navigation, settings] = await Promise.all([
    sanityFetch<Navigation | null>({
      query: NAVIGATION_QUERY,
      tags: ["navigation"],
    }),
    sanityFetch<SiteSettings | null>({
      query: SITE_SETTINGS_QUERY,
      tags: ["settings"],
    }),
  ]);
  return { navigation, settings };
}

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const { navigation, settings } = await fetchChrome();
  return (
    <html lang="pt-BR" className="h-full">
      <body className="min-h-full flex flex-col">
        <Header navigation={navigation} settings={settings} />
        <main className="flex-1">{children}</main>
        <Footer navigation={navigation} settings={settings} />
        <SiteAnimations />
      </body>
    </html>
  );
}
