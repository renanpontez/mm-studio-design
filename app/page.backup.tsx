/**
 * BACKUP: original static homepage before Sanity took over.
 * Renders the 7 sections with their built-in defaults from lib/content.ts.
 * Next.js does NOT route this file because the filename isn't `page.tsx`.
 */
import { Hero } from "@/components/sections/Hero";
import { Manifesto } from "@/components/sections/Manifesto";
import { FeaturedProjects } from "@/components/sections/FeaturedProjects";
import { Services } from "@/components/sections/Services";
import { Founders } from "@/components/sections/Founders";
import { Process } from "@/components/sections/Process";
import { ContactCTA } from "@/components/sections/ContactCTA";

export default function StaticHomePage() {
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
