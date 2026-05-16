/**
 * PageBuilder: maps Sanity section blocks to React components.
 *
 * Pattern:
 *   const page = await sanityFetch<PageDoc>({ query: PAGE_QUERY, ... });
 *   return <PageBuilder sections={page.sections} />;
 *
 * Each section block in Sanity has a `_type` (heroSection, manifestoSection, etc.).
 * This component delegates rendering to a specific renderer per type.
 *
 * Renderers wrap the existing components in `components/sections/*` and translate
 * Sanity data shapes into their props. New section types are added here.
 */
import { Hero } from "@/components/sections/Hero";
import { Manifesto } from "@/components/sections/Manifesto";
import { FeaturedProjects } from "@/components/sections/FeaturedProjects";
import { Services } from "@/components/sections/Services";
import { Founders } from "@/components/sections/Founders";
import { Process } from "@/components/sections/Process";
import { ContactCTA } from "@/components/sections/ContactCTA";
import { urlFor } from "@/sanity/lib/image";

type SanitySection = {
  _type: string;
  _key?: string;
  [k: string]: unknown;
};

export function PageBuilder({ sections }: { sections?: SanitySection[] | null }) {
  if (!sections || sections.length === 0) return null;

  return (
    <>
      {sections.map((section, i) => {
        const key = section._key ?? `${section._type}-${i}`;
        switch (section._type) {
          case "heroSection": {
            const s = section as any;
            const fp = s.featuredProject;
            return (
              <Hero
                key={key}
                feature={
                  fp
                    ? {
                        image: s.backgroundImage?.asset
                          ? urlFor(s.backgroundImage).width(2000).url()
                          : fp.image?.asset
                            ? urlFor(fp.image).width(2000).url()
                            : "",
                        imageAlt: fp.imageAlt ?? "",
                        projectName: fp.name ?? "",
                        projectCity: fp.city ?? "",
                        projectCategory: fp.category ?? "",
                        projectYear: fp.year ?? new Date().getFullYear(),
                      }
                    : undefined
                }
              />
            );
          }
          case "manifestoSection":
            return <Manifesto key={key} />;
          case "featuredProjectsSection":
            return <FeaturedProjects key={key} />;
          case "servicesSection":
            return <Services key={key} />;
          case "foundersSection":
            return <Founders key={key} />;
          case "processSection":
            return <Process key={key} />;
          case "contactCtaSection":
            return <ContactCTA key={key} />;
          default:
            console.warn(`[PageBuilder] Unknown section type: ${section._type}`);
            return null;
        }
      })}
    </>
  );
}
