/**
 * Sanity dataset inspector for debugging.
 *
 * Usage:
 *   npx dotenv -e .env.local -- tsx scripts/inspect-sanity.ts
 *   npx dotenv -e .env.local -- tsx scripts/inspect-sanity.ts page home   # one doc
 *   npx dotenv -e .env.local -- tsx scripts/inspect-sanity.ts -- --raw    # full json dump
 */
import { createClient } from "@sanity/client";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
const token = process.env.SANITY_WRITE_TOKEN; // needed to see drafts

const c = createClient({
  projectId,
  dataset,
  apiVersion: "2024-01-01",
  useCdn: false,
  token,
});

const args = process.argv.slice(2).filter((a) => !a.startsWith("--"));
const raw = process.argv.includes("--raw");

async function summary() {
  console.log(`\n→ Dataset ${projectId}/${dataset}\n`);

  const types = [
    "siteSettings",
    "navigation",
    "page",
    "project",
    "service",
    "founder",
    "pillar",
  ];

  // Use perspective: "raw" via token to see both published + drafts
  console.log("Document counts (published only / total including drafts):");
  for (const t of types) {
    const published = await c.fetch(
      `count(*[_type == $t && !(_id in path("drafts.**"))])`,
      { t }
    );
    const total = await c.fetch(`count(*[_type == $t])`, { t });
    const draftsOnly = total - published;
    const flag =
      published === 0 && draftsOnly > 0 ? "  ⚠️ DRAFT-ONLY (publish in Studio!)" : "";
    console.log(
      `  ${t.padEnd(15)} published: ${String(published).padStart(2)}   drafts: ${String(draftsOnly).padStart(2)}${flag}`
    );
  }

  console.log(
    "\nQuery used by app/page.tsx (slug=home, published perspective):"
  );
  const home = await c.fetch(
    `*[_type == "page" && slug.current == "home" && !(_id in path("drafts.**"))][0]{ _id, title, "slug": slug.current, "sections": count(sections) }`
  );
  console.log("  →", home ?? "null");

  console.log("\nSame query but draft fallback:");
  const draft = await c.fetch(
    `*[_type == "page" && slug.current == "home"][0]{ _id, title, "slug": slug.current, "sections": count(sections) }`
  );
  console.log("  →", draft ?? "null");
}

async function inspectOne(type: string, slug: string) {
  const docs = await c.fetch(
    `*[_type == $type && slug.current == $slug]{
       _id, _type, _rev, _updatedAt, _createdAt,
       "draft": _id in path("drafts.**"),
       ...
     }`,
    { type, slug }
  );
  console.log(JSON.stringify(docs, null, 2));
}

async function main() {
  if (args.length === 2) {
    await inspectOne(args[0], args[1]);
  } else if (raw) {
    const all = await c.fetch(`*[_type in ["page","project","service","founder","pillar","siteSettings","navigation"]]`);
    console.log(JSON.stringify(all, null, 2));
  } else {
    await summary();
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
