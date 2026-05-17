import { defineField, defineType } from "sanity";

export const heroSection = defineType({
  name: "heroSection",
  title: "Hero",
  type: "object",
  fields: [
    defineField({ name: "eyebrow", type: "string" }),
    defineField({ name: "headline", type: "richHeadline" }),
    defineField({ name: "body", type: "text", rows: 3 }),
    defineField({ name: "ctaPrimary", type: "cta" }),
    defineField({ name: "ctaSecondary", type: "cta" }),
    defineField({ name: "backgroundImage", type: "image", options: { hotspot: true } }),
    defineField({
      name: "featuredProject",
      type: "reference",
      to: [{ type: "project" }],
      description: "Projeto exibido na pill 'Projeto em destaque'",
    }),
  ],
  preview: {
    select: { body: "body" },
    prepare: ({ body }) => ({ title: "Hero", subtitle: body }),
  },
});
