import { defineField, defineType } from "sanity";

export const foundersSection = defineType({
  name: "foundersSection",
  title: "Sócias",
  type: "object",
  fields: [
    defineField({ name: "ordinal", type: "string", initialValue: "04" }),
    defineField({ name: "label", type: "string", initialValue: "Sócias" }),
    defineField({ name: "heading", type: "richHeadline" }),
    defineField({ name: "intro", type: "text", rows: 3 }),
    defineField({ name: "founders", type: "array", of: [{ type: "reference", to: [{ type: "founder" }] }], validation: (r) => r.min(1).max(4) }),
    defineField({ name: "portrait", title: "Retrato compartilhado", type: "image", options: { hotspot: true } }),
  ],
  preview: { prepare: () => ({ title: "Sócias" }) },
});
