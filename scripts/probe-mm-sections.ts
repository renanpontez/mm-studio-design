import { createClient } from "@sanity/client";

const c = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  apiVersion: "2024-01-01",
  useCdn: false,
  token: process.env.SANITY_WRITE_TOKEN || process.env.SANITY_READ_TOKEN,
});

(async () => {
  const home = await c.fetch(
    `*[_id == "page.home"][0]{
      _id,
      "sections": sections[]{
        _key, _type,
        "hasLabel": defined(label), "label": label,
        "hasBody": defined(body), "bodyType": body[0]._type,
        "hasSegments": defined(segments),
        "hasSteps": defined(steps), "stepCount": count(steps),
        "hasHeading": defined(heading)
      }
    }`
  );
  console.log(JSON.stringify(home, null, 2));
})();
