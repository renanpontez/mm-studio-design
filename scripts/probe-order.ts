import { createClient } from "@sanity/client";

const c = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  apiVersion: "2024-01-01",
  useCdn: false,
  token: process.env.SANITY_WRITE_TOKEN || process.env.SANITY_READ_TOKEN,
});

(async () => {
  console.log("--- PUBLISHED (what the live site reads) ---");
  const pub = await c.fetch(
    `*[_id == "page.home"][0]{ _id, _updatedAt, "types": sections[]._type }`
  );
  console.log(JSON.stringify(pub, null, 2));
  console.log("\n--- DRAFT (what Studio shows when there are unpublished edits) ---");
  const draft = await c.fetch(
    `*[_id == "drafts.page.home"][0]{ _id, _updatedAt, "types": sections[]._type }`
  );
  console.log(JSON.stringify(draft, null, 2));
})();
