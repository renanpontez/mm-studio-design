import { defineField, defineType } from "sanity";

export const page = defineType({
  name: "page",
  title: "Página",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "title" },
      validation: (r) => r.required(),
      description: "Use 'home' para a página inicial; 'sobre', 'servicos', 'projetos', 'contato' para as outras.",
    }),
    defineField({
      name: "sections",
      title: "Seções (page builder)",
      type: "array",
      of: [
        { type: "heroSection" },
        { type: "pageIntroSection" },
        { type: "manifestoSection" },
        { type: "featuredProjectsSection" },
        { type: "projectsByCategorySection" },
        { type: "servicesSection" },
        { type: "servicesDetailedSection" },
        { type: "foundersSection" },
        { type: "founderBiosSection" },
        { type: "processSection" },
        { type: "pillarsSection" },
        { type: "channelsSection" },
        { type: "briefingFormSection" },
        { type: "contactCtaSection" },
      ],
    }),
    defineField({ name: "seo", type: "seo" }),
  ],
  preview: { select: { title: "title", subtitle: "slug.current" } },
});
