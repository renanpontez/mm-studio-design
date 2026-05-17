import { groq } from "next-sanity";

/* ---------- shared fragments ---------- */

export const PROJECT_CARD_FRAGMENT = groq`{
  _id,
  name,
  "slug": slug.current,
  category,
  city,
  year,
  area,
  scope,
  summary,
  image,
  imageAlt
}`;

export const PROJECT_DETAIL_FRAGMENT = groq`{
  _id,
  name,
  "slug": slug.current,
  category,
  city,
  year,
  area,
  scope,
  summary,
  description,
  image,
  imageAlt,
  gallery[]{
    "src": asset->url,
    "image": @,
    alt
  },
  seo
}`;

export const SERVICE_DETAIL_FRAGMENT = groq`{
  _id,
  name,
  "slug": slug.current,
  ordinal,
  tagline,
  description,
  forWho,
  includes,
  steps,
  differentiators,
  faq,
  "relatedProjects": relatedProjects[]->${PROJECT_CARD_FRAGMENT}
}`;

export const SECTION_FRAGMENT = groq`
  _key,
  _type == "heroSection" => {
    _type, _key, eyebrow, headline, body, ctaPrimary, ctaSecondary, backgroundImage,
    "featuredProject": featuredProject->${PROJECT_CARD_FRAGMENT}
  },
  _type == "manifestoSection" => { _type, _key, ordinal, label, segments },
  _type == "featuredProjectsSection" => {
    _type, _key, ordinal, label, heading, viewAllLink,
    "projects": projects[]->${PROJECT_CARD_FRAGMENT}
  },
  _type == "servicesSection" => {
    _type, _key, ordinal, label, heading, intro, sectionImage,
    "services": services[]->{
      _id, name, "slug": slug.current, ordinal, tagline, description
    }
  },
  _type == "foundersSection" => {
    _type, _key, ordinal, label, heading, intro, portrait,
    "founders": founders[]->{ _id, name, role, bio, portrait, order }
  },
  _type == "processSection" => { _type, _key, ordinal, label, heading, steps },
  _type == "pillarsSection" => {
    _type, _key, ordinal, label, heading,
    "pillars": pillars[]->{ _id, ordinal, name, description, order }
  },
  _type == "contactCtaSection" => { _type, _key, ordinal, label, heading, intro, ctaPrimary, ctaSecondary }
`;

/* ---------- queries ---------- */

export const SITE_SETTINGS_QUERY = groq`*[_type == "siteSettings"][0]`;

export const NAVIGATION_QUERY = groq`*[_type == "navigation"][0]`;

export const PAGE_QUERY = groq`*[_type == "page" && slug.current == $slug][0]{
  _id,
  title,
  "slug": slug.current,
  seo,
  sections[]{${SECTION_FRAGMENT}}
}`;

export const PROJECTS_INDEX_QUERY = groq`*[_type == "project"] | order(year desc, name asc)${PROJECT_CARD_FRAGMENT}`;

export const PROJECT_DETAIL_QUERY = groq`*[_type == "project" && slug.current == $slug][0]${PROJECT_DETAIL_FRAGMENT}`;

export const PROJECT_SLUGS_QUERY = groq`*[_type == "project" && defined(slug.current)][].slug.current`;

export const SERVICES_INDEX_QUERY = groq`*[_type == "service"] | order(ordinal asc)${SERVICE_DETAIL_FRAGMENT}`;

export const SERVICE_DETAIL_QUERY = groq`*[_type == "service" && slug.current == $slug][0]${SERVICE_DETAIL_FRAGMENT}`;

export const SERVICE_SLUGS_QUERY = groq`*[_type == "service" && defined(slug.current)][].slug.current`;

export const FOUNDERS_QUERY = groq`*[_type == "founder"] | order(order asc)`;

export const PILLARS_QUERY = groq`*[_type == "pillar"] | order(order asc)`;
