import { defineField, defineType } from "sanity";

export const servicesSection = defineType({
  name: "servicesSection",
  title: "Serviços",
  type: "object",
  fields: [
    defineField({ name: "ordinal", type: "string", initialValue: "03" }),
    defineField({ name: "label", type: "string", initialValue: "Serviços" }),
    defineField({ name: "heading", type: "richHeadline" }),
    defineField({ name: "intro", type: "text", rows: 3 }),
    defineField({ name: "services", type: "array", of: [{ type: "reference", to: [{ type: "service" }] }] }),
  ],
  preview: { prepare: () => ({ title: "Serviços" }) },
});
