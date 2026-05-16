import { defineArrayMember, defineField, defineType } from "sanity";

const step = defineArrayMember({
  type: "object",
  name: "step",
  fields: [
    defineField({ name: "name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "description", type: "text", rows: 2 }),
  ],
});

const faq = defineArrayMember({
  type: "object",
  name: "faq",
  fields: [
    defineField({ name: "q", title: "Pergunta", type: "string", validation: (r) => r.required() }),
    defineField({ name: "a", title: "Resposta", type: "text", rows: 3 }),
  ],
});

const differentiator = defineArrayMember({
  type: "object",
  name: "differentiator",
  fields: [
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "description", type: "text", rows: 3 }),
  ],
});

export const service = defineType({
  name: "service",
  title: "Serviço",
  type: "document",
  fields: [
    defineField({ name: "name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "slug", type: "slug", options: { source: "name" }, validation: (r) => r.required() }),
    defineField({ name: "ordinal", type: "string", description: "ex.: 01, 02, 03" }),
    defineField({ name: "tagline", type: "string" }),
    defineField({ name: "description", type: "text", rows: 4 }),
    defineField({ name: "forWho", title: "Para quem é", type: "array", of: [{ type: "text", rows: 2 }] }),
    defineField({ name: "includes", title: "O que inclui", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "steps", title: "Etapas", type: "array", of: [step] }),
    defineField({ name: "differentiators", title: "Diferenciais", type: "array", of: [differentiator] }),
    defineField({ name: "faq", title: "FAQ", type: "array", of: [faq] }),
    defineField({
      name: "relatedProjects",
      title: "Projetos relacionados",
      type: "array",
      of: [{ type: "reference", to: [{ type: "project" }] }],
    }),
    defineField({ name: "seo", type: "seo" }),
  ],
  orderings: [{ title: "Ordinal", name: "ordinal", by: [{ field: "ordinal", direction: "asc" }] }],
  preview: { select: { title: "name", subtitle: "tagline" } },
});
