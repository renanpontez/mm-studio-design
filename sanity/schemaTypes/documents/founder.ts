import { defineField, defineType } from "sanity";

export const founder = defineType({
  name: "founder",
  title: "Sócia/Sócio",
  type: "document",
  fields: [
    defineField({ name: "name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "role", type: "string" }),
    defineField({ name: "bio", type: "text", rows: 4 }),
    defineField({ name: "portrait", type: "image", options: { hotspot: true } }),
    defineField({ name: "order", type: "number", description: "Para ordenar a dupla" }),
  ],
  orderings: [{ title: "Ordem", name: "order", by: [{ field: "order", direction: "asc" }] }],
  preview: { select: { title: "name", subtitle: "role", media: "portrait" } },
});
