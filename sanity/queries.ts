import { groq } from "next-sanity";

/* ---------- shared fragments ---------- */

export const PROJECT_CARD_FRAGMENT = groq`{
  _id,
  name,
  "slug": slug.current,
  "category": category->{ _id, name, "slug": slug.current, order },
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
  "category": category->{ _id, name, "slug": slug.current, order },
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
  order,
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
  _type == "manifestoSection" => { _type, _key, label, body },
  _type == "featuredProjectsSection" => {
    _type, _key, label, heading, viewAllLink,
    "projects": projects[]->${PROJECT_CARD_FRAGMENT}
  },
  _type == "servicesSection" => {
    _type, _key, label, heading, intro, sectionImage,
    "services": services[]->{
      _id, name, "slug": slug.current, tagline, description
    }
  },
  _type == "foundersSection" => {
    _type, _key, label, heading, intro, portrait,
    "founders": founders[]->{ _id, name, role, bio, portrait, order }
  },
  _type == "processSection" => { _type, _key, label, heading, steps },
  _type == "pillarsSection" => {
    _type, _key, label, heading,
    "pillars": pillars[]->{ _id, name, description, order }
  },
  _type == "contactCtaSection" => { _type, _key, label, heading, intro, ctaPrimary, ctaSecondary },
  _type == "pageIntroSection" => { _type, _key, dimensionLeft, dimensionRight, label, headline, body },
  _type == "founderBiosSection" => {
    _type, _key,
    "founders": coalesce(founders[]->{ _id, name, role, bio, portrait, order },
                         *[_type == "founder"] | order(order asc){ _id, name, role, bio, portrait, order })
  },
  _type == "servicesDetailedSection" => {
    _type, _key, label,
    "services": coalesce(services[]->{ _id, name, "slug": slug.current, tagline, description, includes },
                         *[_type == "service"] | order(order asc){ _id, name, "slug": slug.current, tagline, description, includes })
  },
  _type == "projectsByCategorySection" => {
    _type, _key, showAnchorNav,
    "categories": coalesce(
      categories[]->{
        _id, name, "slug": slug.current, order,
        "projects": *[_type == "project" && references(^._id)] | order(year desc, name asc)${PROJECT_CARD_FRAGMENT}
      },
      *[_type == "projectCategory" && count(*[_type == "project" && references(^._id)]) > 0] | order(order asc, name asc){
        _id, name, "slug": slug.current, order,
        "projects": *[_type == "project" && references(^._id)] | order(year desc, name asc)${PROJECT_CARD_FRAGMENT}
      }
    )
  },
  _type == "channelsSection" => { _type, _key, label, channels },
  _type == "briefingFormSection" => { _type, _key, label, heading, intro, metadata }
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

export const SERVICES_INDEX_QUERY = groq`*[_type == "service"] | order(order asc)${SERVICE_DETAIL_FRAGMENT}`;

export const SERVICE_DETAIL_QUERY = groq`*[_type == "service" && slug.current == $slug][0]${SERVICE_DETAIL_FRAGMENT}`;

export const SERVICE_SLUGS_QUERY = groq`*[_type == "service" && defined(slug.current)][].slug.current`;

export const FOUNDERS_QUERY = groq`*[_type == "founder"] | order(order asc)`;

export const PILLARS_QUERY = groq`*[_type == "pillar"] | order(order asc)`;

export const PROJECT_CATEGORIES_QUERY = groq`*[_type == "projectCategory"] | order(order asc, name asc){
  _id, name, "slug": slug.current, order, description
}`;
