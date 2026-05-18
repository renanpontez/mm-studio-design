/**
 * Surgical patch for MM's existing page.home doc.
 * Sets manifesto.body + manifesto.label only if missing. Preserves the user's
 * Studio-defined section order and any other field they've edited.
 *
 * Run with: npx dotenv -e .env.local -- tsx scripts/fix-mm-home.ts
 */
import { createClient } from "@sanity/client";
import { randomUUID } from "node:crypto";

const c = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  apiVersion: "2024-01-01",
  useCdn: false,
  token: process.env.SANITY_WRITE_TOKEN,
});

if (!process.env.SANITY_WRITE_TOKEN) {
  throw new Error("Missing SANITY_WRITE_TOKEN (Editor role)");
}

type SectionRow = {
  _key: string;
  _type: string;
  label?: string | null;
  body?: unknown;
  heading?: unknown;
};

const span = (text: string, italic?: boolean) => ({
  _key: randomUUID().slice(0, 8),
  _type: "span",
  text,
  marks: italic ? ["italicAccent"] : [],
});

const block = (...children: ReturnType<typeof span>[]) => ({
  _key: randomUUID().slice(0, 8),
  _type: "block",
  style: "normal",
  markDefs: [],
  children,
});

(async () => {
  const home = await c.fetch<{ sections: SectionRow[] }>(
    `*[_id == "page.home"][0]{ "sections": sections[]{ _key, _type, label, body, heading } }`
  );

  console.log("Current sections:");
  home.sections.forEach((s, i) =>
    console.log(`  ${i + 1}. ${s._type} (key=${s._key}) label=${s.label ?? "—"}`)
  );

  const patches: { setIfMissing: Record<string, unknown> }[] = [];

  const manifesto = home.sections.find((s) => s._type === "manifestoSection");
  if (manifesto) {
    if (!manifesto.label) {
      patches.push({
        setIfMissing: { [`sections[_key=="${manifesto._key}"].label`]: "Manifesto" },
      });
    }
    if (!manifesto.body) {
      patches.push({
        setIfMissing: {
          [`sections[_key=="${manifesto._key}"].body`]: [
            block(
              span("Cada projeto é uma maneira de criar "),
              span("lugares vivos, conscientes", true),
              span(" e feitos para acolher quem os habita.")
            ),
          ],
        },
      });
    }
  }

  const process = home.sections.find((s) => s._type === "processSection");
  if (process && !process.heading) {
    patches.push({
      setIfMissing: {
        [`sections[_key=="${process._key}"].heading`]: [
          block(span("Como caminhamos juntas, do briefing às chaves.")),
        ],
      },
    });
  }

  if (patches.length === 0) {
    console.log("\n✓ Nothing to patch — all fields already set.");
    return;
  }

  console.log(`\nApplying ${patches.length} patch(es)...`);
  let tx = c.transaction();
  for (const p of patches) {
    tx = tx.patch("page.home", p);
  }
  const result = await tx.commit();
  console.log("✓ Patched.", result.transactionId);
})();
