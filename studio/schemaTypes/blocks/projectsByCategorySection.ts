import { defineField, defineType } from "sanity";

/**
 * Portfolio grouping. Projects auto-grouped by their referenced category.
 * Editors curate which categories appear (and in what order) via the
 * `categories` field — leave empty to show all categories that have projects.
 */
export const projectsByCategorySection = defineType({
  name: "projectsByCategorySection",
  title: "Projetos por categoria (página interna)",
  type: "object",
  fields: [
    defineField({
      name: "categories",
      title: "Categorias",
      type: "array",
      of: [{ type: "reference", to: [{ type: "projectCategory" }] }],
      description:
        "Ordem importa. Deixe vazio para mostrar todas as categorias com projetos.",
    }),
    defineField({
      name: "showAnchorNav",
      title: "Mostrar navegação por âncoras",
      type: "boolean",
      initialValue: true,
      description: 'Renderiza links "Residencial · Corporativo" no topo.',
    }),
  ],
  preview: { prepare: () => ({ title: "Projetos por categoria" }) },
});
