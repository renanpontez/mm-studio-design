/**
 * Image migration helper.
 *
 *   List URLs + targets (default):
 *     npx tsx scripts/upload-images.ts
 *
 *   Actually download from Unsplash + upload to Sanity + patch docs:
 *     npx tsx scripts/upload-images.ts --upload
 *
 * Idempotent. Each project doc is checked first — if `image.asset` already
 * exists the upload is skipped (use --force to overwrite).
 *
 * Writes data/image-manifest.json with the full list of {target, slug, alt,
 * url} regardless of mode — that file is the deliverable for manual upload.
 *
 * Requires SANITY_WRITE_TOKEN (and NEXT_PUBLIC_SANITY_PROJECT_ID,
 * NEXT_PUBLIC_SANITY_DATASET) when --upload is passed.
 */
import { createClient } from "@sanity/client";
import { writeFile, readFile } from "node:fs/promises";
import { join } from "node:path";
import { existsSync } from "node:fs";
import { projects, foundersPortrait } from "../lib/content";

const ARGS = new Set(process.argv.slice(2));
const DO_UPLOAD = ARGS.has("--upload");
const FORCE = ARGS.has("--force");

type ManifestEntry = {
  target: string;
  docId: string;
  field: string;
  alt?: string;
  source: string;
};

const id = (prefix: string, slug: string) =>
  `${prefix}.${slug.replace(/[^a-z0-9-]/gi, "-")}`;

function buildManifest(): ManifestEntry[] {
  const entries: ManifestEntry[] = [];

  for (const p of projects) {
    entries.push({
      target: `project · ${p.slug} · cover`,
      docId: id("project", p.slug),
      field: "image",
      alt: p.imageAlt,
      source: p.image,
    });
    p.gallery?.forEach((g, i) => {
      entries.push({
        target: `project · ${p.slug} · gallery[${i}]`,
        docId: id("project", p.slug),
        field: `gallery[${i}]`,
        alt: g.alt,
        source: g.src,
      });
    });
  }

  if (foundersPortrait?.src) {
    entries.push({
      target: "page.home · founders section · portrait",
      docId: "page.home",
      field: 'sections[_key=="founders"].portrait',
      alt: foundersPortrait.alt,
      source: foundersPortrait.src.startsWith("http")
        ? foundersPortrait.src
        : join(process.cwd(), "public", foundersPortrait.src.replace(/^\//, "")),
    });
  }

  return entries;
}

async function writeManifest(entries: ManifestEntry[]) {
  const out = join(process.cwd(), "data", "image-manifest.json");
  await writeFile(out, JSON.stringify(entries, null, 2));
  console.log(`✓ wrote ${out}  (${entries.length} entries)`);
}

function printList(entries: ManifestEntry[]) {
  console.log("\nImage manifest:\n");
  for (const e of entries) {
    console.log(`  ${e.target}`);
    console.log(`    → ${e.source}`);
    if (e.alt) console.log(`    alt: ${e.alt}`);
  }
  console.log();
}

async function loadSource(source: string): Promise<{
  buffer: Buffer;
  filename: string;
  contentType: string;
}> {
  if (source.startsWith("http")) {
    const res = await fetch(source);
    if (!res.ok) throw new Error(`fetch ${source} → ${res.status}`);
    const buffer = Buffer.from(await res.arrayBuffer());
    const ct = res.headers.get("content-type") ?? "image/jpeg";
    const ext = ct.includes("png") ? "png" : "jpg";
    const filename = `${source.split("/").pop()?.split("?")[0] ?? "img"}.${ext}`;
    return { buffer, filename, contentType: ct };
  }
  if (!existsSync(source)) throw new Error(`local file missing: ${source}`);
  const buffer = await readFile(source);
  const isPng = source.toLowerCase().endsWith(".png");
  return {
    buffer,
    filename: source.split("/").pop() ?? "img",
    contentType: isPng ? "image/png" : "image/jpeg",
  };
}

async function main() {
  const entries = buildManifest();
  await writeManifest(entries);
  printList(entries);

  if (!DO_UPLOAD) {
    console.log("Tip: re-run with --upload to push these into Sanity.");
    return;
  }

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

  console.log(`\n→ Uploading to ${projectId}/${dataset}\n`);

  // 1. Project cover images
  for (const p of projects) {
    const docId = id("project", p.slug);
    const existing = await client.fetch<{ image?: { asset?: unknown } } | null>(
      `*[_id == $id][0]{ image }`,
      { id: docId }
    );
    if (!FORCE && existing?.image?.asset) {
      console.log(`  · ${p.slug} cover  (already uploaded, skip)`);
    } else {
      const { buffer, filename, contentType } = await loadSource(p.image);
      const asset = await client.assets.upload("image", buffer, {
        filename: `${p.slug}-cover-${filename}`,
        contentType,
      });
      await client
        .patch(docId)
        .set({
          image: {
            _type: "image",
            asset: { _type: "reference", _ref: asset._id },
          },
        })
        .commit();
      console.log(`  ✓ ${p.slug} cover → ${asset._id}`);
    }

    if (p.gallery && p.gallery.length > 0) {
      const existingGallery = await client.fetch<{ gallery?: unknown[] } | null>(
        `*[_id == $id][0]{ gallery }`,
        { id: docId }
      );
      if (!FORCE && existingGallery?.gallery && existingGallery.gallery.length > 0) {
        console.log(`  · ${p.slug} gallery (${p.gallery.length}) (already uploaded, skip)`);
        continue;
      }
      const items = [];
      for (let i = 0; i < p.gallery.length; i++) {
        const g = p.gallery[i];
        const { buffer, filename, contentType } = await loadSource(g.src);
        const asset = await client.assets.upload("image", buffer, {
          filename: `${p.slug}-gallery-${i}-${filename}`,
          contentType,
        });
        items.push({
          _key: `g-${i}`,
          _type: "image",
          asset: { _type: "reference", _ref: asset._id },
          alt: g.alt,
        });
      }
      await client.patch(docId).set({ gallery: items }).commit();
      console.log(`  ✓ ${p.slug} gallery (${items.length})`);
    }
  }

  // 2. Founders portrait → patch page.home foundersSection
  if (foundersPortrait?.src) {
    const localPath = foundersPortrait.src.startsWith("http")
      ? foundersPortrait.src
      : join(process.cwd(), "public", foundersPortrait.src.replace(/^\//, ""));

    if (!localPath.startsWith("http") && !existsSync(localPath)) {
      console.log(`  · founders portrait skipped — ${localPath} not found`);
    } else {
      const home = await client.fetch<{ sections?: { _key: string; portrait?: { asset?: unknown } }[] } | null>(
        `*[_id == "page.home"][0]{ sections }`
      );
      const founderSection = home?.sections?.find((s) => s._key === "founders");
      if (!FORCE && founderSection?.portrait?.asset) {
        console.log("  · founders portrait (already uploaded, skip)");
      } else {
        const { buffer, filename, contentType } = await loadSource(localPath);
        const asset = await client.assets.upload("image", buffer, {
          filename: `founders-portrait-${filename}`,
          contentType,
        });
        await client
          .patch("page.home")
          .set({
            'sections[_key=="founders"].portrait': {
              _type: "image",
              asset: { _type: "reference", _ref: asset._id },
            },
          })
          .commit();
        console.log(`  ✓ founders portrait → ${asset._id}`);
      }
    }
  }

  console.log("\n✓ Image migration complete.");
}

main().catch((err) => {
  console.error("✗ Image migration failed:", err);
  process.exit(1);
});
