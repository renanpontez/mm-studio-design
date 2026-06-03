import { defineField, defineType } from "sanity";

export const projectCategory = defineType({
  name: "projectCategory",
  title: "Categoria de Projeto",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Nome",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "name" },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "order",
      title: "Ordem",
      type: "number",
      description: "Menor primeiro. Define a ordem na listagem do portfolio.",
    }),
    defineField({
      name: "description",
      title: "Descrição (opcional)",
      type: "text",
      rows: 2,
    }),
  ],
  orderings: [
    { name: "order", title: "Ordem manual", by: [{ field: "order", direction: "asc" }] },
  ],
  preview: {
    select: { title: "name", subtitle: "slug.current" },
  },
});
