import { defineField, defineType } from "sanity";

export const contactCtaSection = defineType({
  name: "contactCtaSection",
  title: "Contato CTA",
  type: "object",
  fields: [
    defineField({ name: "ordinal", type: "string", initialValue: "06" }),
    defineField({ name: "label", type: "string", initialValue: "Contato" }),
    defineField({ name: "heading", type: "richHeadline" }),
    defineField({ name: "intro", type: "text", rows: 3 }),
    defineField({ name: "ctaPrimary", type: "cta" }),
    defineField({ name: "ctaSecondary", type: "cta" }),
  ],
  preview: { prepare: () => ({ title: "Contato CTA" }) },
});
