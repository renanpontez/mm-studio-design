import { defineField, defineType } from "sanity";

export const pillarsSection = defineType({
  name: "pillarsSection",
  title: "Pilares",
  type: "object",
  fields: [
    defineField({ name: "label", type: "string", initialValue: "Valores" }),
    defineField({ name: "heading", type: "richHeadline" }),
    defineField({ name: "pillars", type: "array", of: [{ type: "reference", to: [{ type: "pillar" }] }] }),
  ],
  preview: { prepare: () => ({ title: "Pilares" }) },
});
