import { defineField, defineType } from "sanity";

export const pillar = defineType({
  name: "pillar",
  title: "Pilar de valor",
  type: "document",
  fields: [
    defineField({ name: "ordinal", type: "string" }),
    defineField({ name: "name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "description", type: "text", rows: 3 }),
    defineField({ name: "order", type: "number" }),
  ],
  orderings: [{ title: "Ordem", name: "order", by: [{ field: "order", direction: "asc" }] }],
  preview: { select: { title: "name", subtitle: "ordinal" } },
});
