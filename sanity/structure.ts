import type { StructureResolver } from "sanity/structure";

/**
 * Studio sidebar layout.
 * - Singletons: siteSettings, navigation (one doc each).
 * - Pages: list of all `page` docs (home, sobre, servicos, projetos index, contato).
 * - Collections: projects, services, founders, pillars.
 */
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Conteúdo")
    .items([
      // singletons
      S.listItem()
        .title("Configurações do site")
        .id("siteSettings")
        .child(
          S.document()
            .schemaType("siteSettings")
            .documentId("siteSettings")
        ),
      S.listItem()
        .title("Navegação")
        .id("navigation")
        .child(S.document().schemaType("navigation").documentId("navigation")),
      S.divider(),
      // pages (page builder)
      S.documentTypeListItem("page").title("Páginas"),
      S.divider(),
      // collections
      S.documentTypeListItem("project").title("Projetos"),
      S.documentTypeListItem("service").title("Serviços"),
      S.documentTypeListItem("founder").title("Sócias"),
      S.documentTypeListItem("pillar").title("Pilares"),
    ]);
