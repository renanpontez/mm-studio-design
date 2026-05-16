import { Hero } from "@/components/sections/Hero";
import { Manifesto } from "@/components/sections/Manifesto";
import { FeaturedProjects } from "@/components/sections/FeaturedProjects";
import { Services } from "@/components/sections/Services";
import { Founders } from "@/components/sections/Founders";
import { Process } from "@/components/sections/Process";
import { ContactCTA } from "@/components/sections/ContactCTA";
import { PageBuilder } from "@/components/page-builder";
import { sanityFetch } from "@/sanity/client";
import { PAGE_QUERY } from "@/sanity/queries";

type PageDoc = {
  _id: string;
  title: string;
  slug: string;
  sections?: { _type: string; _key: string; [k: string]: unknown }[];
} | null;

async function fetchHomePage(): Promise<PageDoc> {
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) return null;
  try {
    return await sanityFetch<PageDoc>({
      query: PAGE_QUERY,
      params: { slug: "home" },
      tags: ["page:home", "settings"],
    });
  } catch {
    return null;
  }
}

export default async function Home() {
  const home = await fetchHomePage();
  if (home?.sections && home.sections.length > 0) {
    return <PageBuilder sections={home.sections} />;
  }
  return (
    <>
      <Hero />
      <Manifesto />
      <FeaturedProjects />
      <Services />
      <Founders />
      <Process />
      <ContactCTA />
    </>
  );
}
