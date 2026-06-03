import { defineField, defineType } from "sanity";

/**
 * Internal-page header. Different shape from the homepage Hero — narrower
 * editorial intro with two dimension labels (top-left + top-right), a
 * section label, a rich headline, and a body paragraph.
 *
 * Used by /sobre, /servicos, /portfolio, /contato.
 */
export const pageIntroSection = defineType({
  name: "pageIntroSection",
  title: "Intro de página interna",
  type: "object",
  fields: [
    defineField({
      name: "dimensionLeft",
      title: "Etiqueta (esquerda)",
      type: "string",
      description: "Ex.: Est. 2020 · Fortaleza · 04 projetos",
    }),
    defineField({
      name: "dimensionRight",
      title: "Etiqueta (direita)",
      type: "string",
      description: "Ex.: Design de interiores · Fortaleza · CE",
    }),
    defineField({ name: "label", title: "Rótulo da seção", type: "string" }),
    defineField({
      name: "headline",
      title: "Título",
      type: "richHeadline",
      validation: (r) => r.required(),
    }),
    defineField({ name: "body", title: "Texto", type: "text", rows: 3 }),
  ],
  preview: {
    select: { title: "label", subtitle: "dimensionLeft" },
    prepare: ({ title, subtitle }) => ({
      title: title ? `Intro · ${title}` : "Intro de página",
      subtitle,
    }),
  },
});
