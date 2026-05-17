/**
 * PageBuilder
 * ----------
 * Maps Sanity section blocks to fully-typed React components.
 *
 * Pure data flow:
 *   PAGE_QUERY → sections[] → <PageBuilder> → typed section components
 *
 * Each section component is "data-in, render-out" (no module-level imports of
 * lib/content.ts). Defaults exist on the components for the static `page.backup.tsx`
 * fallback but the live page passes Sanity-derived props for everything.
 */
import { Hero } from "@/components/sections/Hero";
import { Manifesto } from "@/components/sections/Manifesto";
import { FeaturedProjects } from "@/components/sections/FeaturedProjects";
import { Services } from "@/components/sections/Services";
import { Founders } from "@/components/sections/Founders";
import { Process } from "@/components/sections/Process";
import { ContactCTA } from "@/components/sections/ContactCTA";
import { urlFor } from "@/sanity/lib/image";
import type {
  Section,
  HeroSection,
  ManifestoSection,
  FeaturedProjectsSection,
  ServicesSection,
  FoundersSection,
  ProcessSection,
  ContactCtaSection,
  SiteSettings,
  RichHeadline,
} from "@/sanity/types";

/* ---------- helpers ---------- */

function richHeadlineToReact(
  rh: RichHeadline | undefined,
  italicClass = "italic text-caramel-dark"
): React.ReactNode {
  if (!rh) return null;
  return rh.flatMap((block, bi) =>
    block.children.map((c, ci) => {
      const key = `${bi}-${ci}`;
      const isItalic = c.marks?.includes("italicAccent");
      return isItalic ? (
        <span key={key} className={italicClass}>
          {c.text}
        </span>
      ) : (
        <span key={key}>{c.text}</span>
      );
    })
  );
}

/**
 * Same as richHeadlineToReact but each portable-text block (== editor pressed
 * Enter for a new line) renders on its own line and gets a .reveal-word wrap
 * for the per-line stagger animation used by Hero. Inline `italicAccent` marks
 * are preserved per-span so a single word can be italicized mid-line.
 */
function richHeadlineToHero(
  rh: RichHeadline | undefined,
  italicClass = "italic text-caramel-dark"
): React.ReactNode {
  if (!rh || rh.length === 0) return null;
  return rh.map((block, bi) => {
    const lineClass = bi === 0 ? "reveal-word" : "block reveal-word";
    return (
      <span key={bi} className={lineClass}>
        <span>
          {block.children.map((c, ci) => {
            const isItalic = c.marks?.includes("italicAccent");
            return isItalic ? (
              <span key={ci} className={italicClass}>
                {c.text}
              </span>
            ) : (
              <span key={ci}>{c.text}</span>
            );
          })}
        </span>
      </span>
    );
  });
}

function safeImageUrl(image: unknown, width = 1600): string {
  if (!image || typeof image !== "object") return "";
  const asAny = image as { asset?: unknown };
  if (!asAny.asset) return "";
  try {
    return urlFor(image as never).width(width).url();
  } catch {
    return "";
  }
}

/* ---------- block renderers (one per _type) ---------- */

function HeroBlock({ block }: { block: HeroSection }) {
  const fp = block.featuredProject;
  const heroImage =
    safeImageUrl(block.backgroundImage, 2000) ||
    safeImageUrl(fp?.image, 2000);

  const ctaToProp = (c: { label: string; href?: string } | undefined) =>
    c && c.label
      ? { label: c.label, href: c.href ?? "#", external: (c.href ?? "").startsWith("http") || (c.href ?? "").startsWith("mailto:") }
      : undefined;

  return (
    <Hero
      eyebrow={block.eyebrow}
      headline={richHeadlineToHero(block.headline)}
      body={block.body}
      ctaPrimary={ctaToProp(block.ctaPrimary)}
      ctaSecondary={ctaToProp(block.ctaSecondary)}
      feature={
        fp || heroImage
          ? {
              image: heroImage,
              imageAlt: fp?.imageAlt ?? block.eyebrow ?? "",
              projectName: fp?.name ?? "",
              projectCity: fp?.city ?? "",
              projectCategory: fp?.category ?? "",
              projectYear: fp?.year ?? new Date().getFullYear(),
            }
          : undefined
      }
    />
  );
}

function ManifestoBlock({ block }: { block: ManifestoSection }) {
  return <Manifesto label={block.label} body={block.body} />;
}

function FeaturedProjectsBlock({ block }: { block: FeaturedProjectsSection }) {
  const mapped = (block.projects ?? []).map((p) => ({
    slug: p.slug,
    name: p.name,
    category: p.category,
    city: p.city ?? "",
    year: p.year ?? new Date().getFullYear(),
    image: safeImageUrl(p.image, 1600),
    imageAlt: p.imageAlt ?? "",
  }));
  return (
    <FeaturedProjects
      label={block.label}
      heading={richHeadlineToReact(block.heading)}
      projects={mapped.length > 0 ? mapped : undefined}
      viewAllHref={block.viewAllLink?.href}
      viewAllLabel={block.viewAllLink?.label}
    />
  );
}

function ServicesBlock({ block }: { block: ServicesSection }) {
  const mapped = (block.services ?? []).map((s) => ({
    slug: s.slug,
    name: s.name,
    tagline: s.tagline,
    description: s.description,
  }));
  const image = safeImageUrl(block.sectionImage, 1600);
  return (
    <Services
      label={block.label}
      heading={richHeadlineToReact(block.heading)}
      intro={block.intro}
      image={image || undefined}
      services={mapped.length > 0 ? mapped : undefined}
    />
  );
}

function FoundersBlock({ block }: { block: FoundersSection }) {
  const portrait = block.portrait
    ? { src: safeImageUrl(block.portrait, 1200), alt: "Sócias" }
    : undefined;
  const mapped = (block.founders ?? [])
    .slice()
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
    .map((f) => ({ name: f.name, role: f.role, bio: f.bio }));
  return (
    <Founders
      label={block.label}
      heading={richHeadlineToReact(block.heading)}
      intro={block.intro}
      portrait={portrait}
      founders={mapped.length > 0 ? mapped : undefined}
    />
  );
}

function ProcessBlock({ block }: { block: ProcessSection }) {
  return (
    <Process
      label={block.label}
      heading={richHeadlineToReact(block.heading)}
      steps={block.steps}
    />
  );
}

function ContactCtaBlock({
  block,
  settings,
}: {
  block: ContactCtaSection;
  settings?: SiteSettings | null;
}) {
  return (
    <ContactCTA
      label={block.label}
      heading={richHeadlineToReact(block.heading)}
      intro={block.intro}
      ctaPrimaryLabel={block.ctaPrimary?.label}
      ctaSecondaryLabel={block.ctaSecondary?.label}
      contact={
        settings
          ? {
              whatsapp: settings.whatsapp,
              email: settings.email,
              phone: settings.phone,
              phoneHref: settings.phoneHref,
              instagram: settings.instagram,
              instagramHandle: settings.instagramHandle,
              cities: settings.cities,
            }
          : undefined
      }
    />
  );
}

/* ---------- entry ---------- */

export function PageBuilder({
  sections,
  settings,
}: {
  sections?: Section[] | null;
  settings?: SiteSettings | null;
}) {
  if (!sections || sections.length === 0) return null;

  return (
    <>
      {sections.map((section) => {
        const key = section._key;
        switch (section._type) {
          case "heroSection":
            return <HeroBlock key={key} block={section} />;
          case "manifestoSection":
            return <ManifestoBlock key={key} block={section} />;
          case "featuredProjectsSection":
            return <FeaturedProjectsBlock key={key} block={section} />;
          case "servicesSection":
            return <ServicesBlock key={key} block={section} />;
          case "foundersSection":
            return <FoundersBlock key={key} block={section} />;
          case "processSection":
            return <ProcessBlock key={key} block={section} />;
          case "contactCtaSection":
            return (
              <ContactCtaBlock key={key} block={section} settings={settings} />
            );
          default:
            console.warn(
              `[PageBuilder] unknown section type: ${(section as Section)._type}`
            );
            return null;
        }
      })}
    </>
  );
}
