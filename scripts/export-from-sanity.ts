/**
 * Export ALL documents from Sanity to JSON (one file per content type, plus a
 * single combined NDJSON ready for `npx sanity dataset import`).
 *
 * Usage:
 *   npx dotenv -e .env.local -- tsx scripts/export-from-sanity.ts
 *
 * Output (gitignored if you want — currently committed for backup):
 *   data/
 *   ├── content-backup.json        Human-readable single JSON array
 *   ├── content-backup.ndjson      Sanity import format (re-import with `sanity dataset import`)
 *   └── by-type/
 *       ├── siteSettings.json
 *       ├── navigation.json
 *       ├── page.json
 *       ├── project.json
 *       ├── service.json
 *       ├── founder.json
 *       └── pillar.json
 */
import { createClient } from "@sanity/client";
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
const token = process.env.SANITY_WRITE_TOKEN;

if (!projectId) throw new Error("Missing NEXT_PUBLIC_SANITY_PROJECT_ID");
if (!token) throw new Error("Missing SANITY_WRITE_TOKEN");

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2024-01-01",
  token,
  useCdn: false,
});

const TYPES = [
  "siteSettings",
  "navigation",
  "page",
  "project",
  "service",
  "founder",
  "pillar",
];

async function exportAll() {
  console.log(`→ Exporting from ${projectId}/${dataset}\n`);

  const outDir = join(process.cwd(), "data");
  const byTypeDir = join(outDir, "by-type");
  mkdirSync(byTypeDir, { recursive: true });

  const all: Array<Record<string, unknown>> = [];

  for (const type of TYPES) {
    const docs = await client.fetch<Array<Record<string, unknown>>>(
      `*[_type == $type] | order(_createdAt asc)`,
      { type }
    );
    console.log(`  ✓ ${type.padEnd(15)} ${docs.length} doc(s)`);
    writeFileSync(
      join(byTypeDir, `${type}.json`),
      JSON.stringify(docs, null, 2)
    );
    all.push(...docs);
  }

  // Combined human-readable JSON
  writeFileSync(
    join(outDir, "content-backup.json"),
    JSON.stringify(all, null, 2)
  );

  // Sanity-compatible NDJSON (one doc per line) for re-import via:
  //   npx sanity dataset import data/content-backup.ndjson production
  writeFileSync(
    join(outDir, "content-backup.ndjson"),
    all.map((d) => JSON.stringify(d)).join("\n")
  );

  console.log(`\n✓ Exported ${all.length} docs to data/`);
  console.log(`  - content-backup.json   (human-readable)`);
  console.log(`  - content-backup.ndjson (sanity import format)`);
  console.log(`  - by-type/*.json        (per type)`);
}

exportAll().catch((err) => {
  console.error("✗ Export failed:", err);
  process.exit(1);
});
