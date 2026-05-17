/**
 * TypeScript shapes for documents returned by GROQ queries in sanity/queries.ts.
 * Keep these in sync when you edit the projections.
 */

import type { Image as SanityImage } from "sanity";

export type SanityRef = { _ref: string; _type: "reference" };

export type ProjectCategory = "residencial" | "comercial" | "corporativo";

export type ProjectCard = {
  _id: string;
  name: string;
  slug: string;
  category: ProjectCategory;
  city?: string;
  year?: number;
  area?: string;
  scope?: string[];
  summary?: string;
  image?: SanityImage;
  imageAlt?: string;
};

export type ProjectDetail = ProjectCard & {
  description?: string;
  gallery?: { image: SanityImage; alt?: string }[];
  seo?: { title?: string; description?: string; image?: SanityImage };
};

export type ServiceSummary = {
  _id: string;
  name: string;
  slug: string;
  ordinal?: string;
  tagline?: string;
  description?: string;
};

export type ServiceDetail = ServiceSummary & {
  forWho?: string[];
  includes?: string[];
  steps?: { name: string; description?: string }[];
  differentiators?: { title: string; description?: string }[];
  faq?: { q: string; a?: string }[];
  relatedProjects?: ProjectCard[];
};

export type Founder = {
  _id: string;
  name: string;
  role?: string;
  bio?: string;
  portrait?: SanityImage;
  order?: number;
};

export type Pillar = {
  _id: string;
  ordinal?: string;
  name: string;
  description?: string;
  order?: number;
};

export type CTA = {
  label: string;
  kind?: "internal" | "external" | "whatsapp" | "email" | "anchor";
  href?: string;
  variant?: "primary" | "ghost" | "underline";
};

export type RichHeadlineBlock = {
  _type: "block";
  children: { _type: "span"; text: string; marks?: string[] }[];
};

export type RichHeadline = RichHeadlineBlock[];

/* ---------- section blocks ---------- */

export type HeroSection = {
  _type: "heroSection";
  _key: string;
  eyebrow?: string;
  headline?: RichHeadline;
  body?: string;
  ctaPrimary?: CTA;
  ctaSecondary?: CTA;
  backgroundImage?: SanityImage;
  featuredProject?: ProjectCard;
};

export type ManifestoSection = {
  _type: "manifestoSection";
  _key: string;
  ordinal?: string;
  label?: string;
  segments?: { text: string; italic?: boolean }[];
};

export type FeaturedProjectsSection = {
  _type: "featuredProjectsSection";
  _key: string;
  ordinal?: string;
  label?: string;
  heading?: RichHeadline;
  viewAllLink?: CTA;
  projects?: ProjectCard[];
};

export type ServicesSection = {
  _type: "servicesSection";
  _key: string;
  ordinal?: string;
  label?: string;
  heading?: RichHeadline;
  intro?: string;
  sectionImage?: SanityImage;
  services?: ServiceSummary[];
};

export type FoundersSection = {
  _type: "foundersSection";
  _key: string;
  ordinal?: string;
  label?: string;
  heading?: RichHeadline;
  intro?: string;
  portrait?: SanityImage;
  founders?: Founder[];
};

export type ProcessSection = {
  _type: "processSection";
  _key: string;
  ordinal?: string;
  label?: string;
  heading?: RichHeadline;
  steps?: { ordinal?: string; name: string; description?: string }[];
};

export type PillarsSection = {
  _type: "pillarsSection";
  _key: string;
  ordinal?: string;
  label?: string;
  heading?: RichHeadline;
  pillars?: Pillar[];
};

export type ContactCtaSection = {
  _type: "contactCtaSection";
  _key: string;
  ordinal?: string;
  label?: string;
  heading?: RichHeadline;
  intro?: string;
  ctaPrimary?: CTA;
  ctaSecondary?: CTA;
};

export type Section =
  | HeroSection
  | ManifestoSection
  | FeaturedProjectsSection
  | ServicesSection
  | FoundersSection
  | ProcessSection
  | PillarsSection
  | ContactCtaSection;

/* ---------- documents ---------- */

export type SiteSettings = {
  _id: string;
  name?: string;
  shortName?: string;
  tagline?: string;
  manifesto?: string;
  cities?: string[];
  phone?: string;
  phoneHref?: string;
  email?: string;
  whatsapp?: string;
  instagram?: string;
  instagramHandle?: string;
};

export type Navigation = {
  primary?: { label: string; href: string }[];
  footer?: { label: string; href: string }[];
};

export type PageDoc = {
  _id: string;
  title: string;
  slug: string;
  sections?: Section[];
  seo?: { title?: string; description?: string; image?: SanityImage };
};
