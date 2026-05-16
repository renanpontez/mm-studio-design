import type { SchemaTypeDefinition } from "sanity";

// objects
import { seo } from "./objects/seo";
import { cta } from "./objects/cta";
import { richHeadline } from "./objects/richHeadline";

// documents
import { siteSettings } from "./documents/siteSettings";
import { navigation } from "./documents/navigation";
import { page } from "./documents/page";
import { project } from "./documents/project";
import { service } from "./documents/service";
import { founder } from "./documents/founder";
import { pillar } from "./documents/pillar";

// blocks (page builder)
import { heroSection } from "./blocks/heroSection";
import { manifestoSection } from "./blocks/manifestoSection";
import { featuredProjectsSection } from "./blocks/featuredProjectsSection";
import { servicesSection } from "./blocks/servicesSection";
import { foundersSection } from "./blocks/foundersSection";
import { processSection } from "./blocks/processSection";
import { pillarsSection } from "./blocks/pillarsSection";
import { contactCtaSection } from "./blocks/contactCtaSection";

export const schemaTypes: SchemaTypeDefinition[] = [
  // objects
  seo,
  cta,
  richHeadline,
  // documents
  siteSettings,
  navigation,
  page,
  project,
  service,
  founder,
  pillar,
  // blocks
  heroSection,
  manifestoSection,
  featuredProjectsSection,
  servicesSection,
  foundersSection,
  processSection,
  pillarsSection,
  contactCtaSection,
];
