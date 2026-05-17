import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Configurações do site",
  type: "document",
  groups: [
    { name: "studio", title: "Estúdio" },
    { name: "contact", title: "Contato" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({ name: "name", type: "string", group: "studio", validation: (r) => r.required() }),
    defineField({ name: "shortName", type: "string", group: "studio" }),
    defineField({ name: "tagline", type: "string", group: "studio" }),
    defineField({ name: "manifesto", type: "text", rows: 3, group: "studio" }),
    defineField({ name: "cities", type: "array", of: [{ type: "string" }], group: "studio" }),
    defineField({ name: "phone", type: "string", group: "contact" }),
    defineField({ name: "phoneHref", type: "string", group: "contact" }),
    defineField({ name: "email", type: "string", group: "contact" }),
    defineField({ name: "whatsapp", type: "url", group: "contact" }),
    defineField({ name: "instagram", type: "url", group: "contact" }),
    defineField({ name: "instagramHandle", type: "string", group: "contact" }),
    defineField({ name: "defaultSeo", type: "seo", group: "seo" }),
  ],
  preview: { select: { title: "name" }, prepare: (s) => ({ title: s.title ?? "Configurações do site" }) },
});
