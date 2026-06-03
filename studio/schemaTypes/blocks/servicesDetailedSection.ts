import { defineField, defineType } from "sanity";

/**
 * Detailed services list (image-less, larger type). Different layout from the
 * homepage `servicesSection` accordion. Used on /servicos.
 */
export const servicesDetailedSection = defineType({
  name: "servicesDetailedSection",
  title: "Serviços em detalhe (página interna)",
  type: "object",
  fields: [
    defineField({ name: "label", type: "string", initialValue: "Em detalhe" }),
    defineField({
      name: "services",
      title: "Serviços",
      type: "array",
      of: [{ type: "reference", to: [{ type: "service" }] }],
      description: "Deixe vazio para mostrar todos em ordem.",
    }),
  ],
  preview: { prepare: () => ({ title: "Serviços em detalhe" }) },
});
