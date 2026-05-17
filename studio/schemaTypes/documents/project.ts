import { defineField, defineType } from "sanity";

export const project = defineType({
  name: "project",
  title: "Projeto",
  type: "document",
  groups: [
    { name: "meta", title: "Identidade" },
    { name: "content", title: "Conteúdo" },
    { name: "media", title: "Mídia" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({ name: "name", type: "string", group: "meta", validation: (r) => r.required() }),
    defineField({ name: "slug", type: "slug", group: "meta", options: { source: "name", maxLength: 96 }, validation: (r) => r.required() }),
    defineField({
      name: "category",
      type: "string",
      group: "meta",
      options: {
        list: [
          { title: "Residencial", value: "residencial" },
          { title: "Corporativo", value: "corporativo" },
        ],
        layout: "radio",
      },
      validation: (r) => r.required(),
    }),
    defineField({ name: "city", type: "string", group: "meta" }),
    defineField({ name: "year", type: "number", group: "meta" }),
    defineField({ name: "area", type: "string", group: "meta", description: "ex.: 180m²" }),
    defineField({ name: "scope", title: "Escopo", type: "array", of: [{ type: "string" }], group: "meta" }),
    defineField({ name: "summary", type: "text", rows: 2, group: "content" }),
    defineField({ name: "description", type: "text", rows: 6, group: "content" }),
    defineField({ name: "image", title: "Imagem de capa", type: "image", group: "media", options: { hotspot: true } }),
    defineField({ name: "imageAlt", title: "Texto alternativo da capa", type: "string", group: "media" }),
    defineField({
      name: "gallery",
      type: "array",
      group: "media",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [{ name: "alt", type: "string", title: "Texto alternativo" }],
        },
      ],
    }),
    defineField({ name: "seo", type: "seo", group: "seo" }),
  ],
  orderings: [
    { title: "Ano (mais recente)", name: "yearDesc", by: [{ field: "year", direction: "desc" }] },
    { title: "Nome A→Z", name: "nameAsc", by: [{ field: "name", direction: "asc" }] },
  ],
  preview: {
    select: { title: "name", subtitle: "category", media: "image" },
    prepare: ({ title, subtitle, media }) => ({ title, subtitle, media }),
  },
});
