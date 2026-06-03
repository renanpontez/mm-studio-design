/**
 * MM Studio Design — one-time content migration into Sanity.
 *
 * Usage (run BOTH, in order, on a fresh dataset):
 *   1. From site/: npx tsx scripts/migrate-to-sanity.ts   (this script — seeds docs)
 *   2. From site/: npx tsx scripts/migrate-pages.ts        (seeds categories + page-builder docs and patches project.category → reference)
 *
 * On an existing dataset, you only need migrate-pages.ts (it's idempotent).
 *
 * This script writes `project.category` as a reference to category.${slug};
 * migrate-pages.ts seeds those category docs.
 */
import { createClient } from "@sanity/client";
import {
  studio,
  navigation,
  projects,
  services,
  founders,
  pillars,
  processSteps,
} from "../lib/content";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
const token = process.env.SANITY_WRITE_TOKEN;

if (!projectId) throw new Error("Missing NEXT_PUBLIC_SANITY_PROJECT_ID");
if (!token) throw new Error("Missing SANITY_WRITE_TOKEN (Editor role)");

const client = createClient({ projectId, dataset, apiVersion: "2024-01-01", token, useCdn: false });

const id = (prefix: string, slug: string) => `${prefix}.${slug.replace(/[^a-z0-9-]/gi, "-")}`;

async function upsert(doc: { _id: string; _type: string; [k: string]: unknown }) {
  const res = await client.createOrReplace(doc);
  console.log(`  ✓ ${doc._type} · ${doc._id}`);
  return res;
}

async function migrate() {
  console.log(`→ Migrating to ${projectId}/${dataset}\n`);

  console.log("Site settings:");
  await upsert({
    _id: "siteSettings",
    _type: "siteSettings",
    name: studio.name,
    shortName: studio.shortName,
    tagline: studio.tagline,
    manifesto: studio.manifesto,
    cities: studio.cities,
    phone: studio.phone,
    phoneHref: studio.phoneHref,
    email: studio.email,
    whatsapp: studio.whatsapp,
    instagram: studio.instagram,
    instagramHandle: studio.instagramHandle,
  });

  console.log("\nNavigation:");
  await upsert({
    _id: "navigation",
    _type: "navigation",
    primary: navigation.map((n) => ({ _type: "navLink", _key: n.href, label: n.label, href: n.href })),
    footer: navigation.map((n) => ({ _type: "navLink", _key: `f-${n.href}`, label: n.label, href: n.href })),
  });

  console.log("\nProjects:");
  const projectRefs: Record<string, string> = {};
  for (const p of projects) {
    const _id = id("project", p.slug);
    projectRefs[p.slug] = _id;
    await upsert({
      _id,
      _type: "project",
      name: p.name,
      slug: { _type: "slug", current: p.slug },
      // Reference to projectCategory doc (seeded by migrate-pages.ts).
      category: { _type: "reference", _ref: id("category", p.category) },
      city: p.city,
      year: p.year,
      area: p.area,
      scope: p.scope,
      summary: p.summary,
      description: p.description,
      imageAlt: p.imageAlt,
    });
  }

  console.log("\nServices:");
  const serviceRefs: Record<string, string> = {};
  for (const s of services) {
    const _id = id("service", s.slug);
    serviceRefs[s.slug] = _id;
    await upsert({
      _id,
      _type: "service",
      name: s.name,
      slug: { _type: "slug", current: s.slug },
      order: Number(s.ordinal) || undefined,
      tagline: s.tagline,
      description: s.description,
      forWho: s.forWho,
      includes: s.includes,
      steps: s.steps?.map((step, i) => ({
        _key: `step-${i}`,
        _type: "step",
        name: step.name,
        description: step.description,
      })),
      differentiators: s.differentiators?.map((d, i) => ({ _key: `d-${i}`, _type: "differentiator", ...d })),
      faq: s.faq?.map((f, i) => ({ _key: `faq-${i}`, _type: "faq", ...f })),
      relatedProjects: s.relatedProjectSlugs?.map((sl) =>
        projectRefs[sl] ? { _type: "reference", _ref: projectRefs[sl], _key: `ref-${sl}` } : null
      ).filter(Boolean),
    });
  }

  console.log("\nFounders:");
  const founderRefs: string[] = [];
  for (let i = 0; i < founders.length; i++) {
    const f = founders[i];
    const _id = id("founder", f.name.toLowerCase().replace(/\s+/g, "-"));
    founderRefs.push(_id);
    await upsert({ _id, _type: "founder", name: f.name, role: f.role, bio: f.bio, order: i });
  }

  console.log("\nPillars:");
  for (let i = 0; i < pillars.length; i++) {
    const p = pillars[i];
    const _id = id("pillar", p.name.toLowerCase().replace(/\s+/g, "-"));
    await upsert({ _id, _type: "pillar", name: p.name, description: p.description, order: i });
  }

  console.log("\nHome page:");
  await upsert({
    _id: "page.home",
    _type: "page",
    title: "Início",
    slug: { _type: "slug", current: "home" },
    sections: [
      {
        _key: "hero",
        _type: "heroSection",
        eyebrow: "Estúdio de design de interiores",
        body: "Design de interiores residencial e corporativo em Fortaleza, com olhar sustentável e a sensibilidade de duas amigas que projetam juntas.",
        featuredProject: projectRefs["casa-jv"]
          ? { _type: "reference", _ref: projectRefs["casa-jv"] }
          : undefined,
      },
      { _key: "manifesto", _type: "manifestoSection", label: "Manifesto" },
      {
        _key: "projects",
        _type: "featuredProjectsSection",
        label: "Portfolio em destaque",
        projects: projects.slice(0, 4).map((p, i) => ({ _type: "reference", _key: `p-${i}`, _ref: projectRefs[p.slug] })),
      },
      {
        _key: "services",
        _type: "servicesSection",
        label: "Serviços",
        services: services.map((s, i) => ({ _type: "reference", _key: `s-${i}`, _ref: serviceRefs[s.slug] })),
      },
      {
        _key: "founders",
        _type: "foundersSection",
        label: "Sobre Nós",
        founders: founderRefs.map((ref, i) => ({ _type: "reference", _key: `f-${i}`, _ref: ref })),
      },
      {
        _key: "process",
        _type: "processSection",
        label: "Processo",
        steps: processSteps.map((s, i) => ({
          _key: `st-${i}`,
          _type: "step",
          name: s.name,
          description: s.description,
        })),
      },
      { _key: "contact", _type: "contactCtaSection", label: "Contato" },
    ],
  });

  console.log("\n✓ Migration complete.");
}

migrate().catch((err) => { console.error("✗ Migration failed:", err); process.exit(1); });
