import { defineField, defineType } from "sanity";

export const servicesSection = defineType({
  name: "servicesSection",
  title: "Serviços",
  type: "object",
  fields: [
    defineField({ name: "label", type: "string", initialValue: "Serviços" }),
    defineField({ name: "heading", type: "richHeadline" }),
    defineField({ name: "intro", type: "text", rows: 3 }),
    defineField({
      name: "sectionImage",
      title: "Imagem da seção",
      type: "image",
      options: { hotspot: true },
      description:
        "Imagem grande à esquerda do acordeão de serviços. Use uma foto que represente o studio (ex. um projeto recente, detalhe de material).",
    }),
    defineField({ name: "services", type: "array", of: [{ type: "reference", to: [{ type: "service" }] }] }),
  ],
  preview: { prepare: () => ({ title: "Serviços" }) },
});
