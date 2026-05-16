import { defineField, defineType } from "sanity";

export const featuredProjectsSection = defineType({
  name: "featuredProjectsSection",
  title: "Projetos em destaque",
  type: "object",
  fields: [
    defineField({ name: "ordinal", type: "string", initialValue: "02" }),
    defineField({ name: "label", type: "string", initialValue: "Projetos selecionados" }),
    defineField({ name: "heading", type: "richHeadline" }),
    defineField({
      name: "projects",
      type: "array",
      of: [{ type: "reference", to: [{ type: "project" }] }],
      validation: (r) => r.min(2).max(6),
    }),
    defineField({ name: "viewAllLink", type: "cta" }),
  ],
  preview: { prepare: () => ({ title: "Projetos em destaque" }) },
});
