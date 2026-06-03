import { defineField, defineType } from "sanity";

/**
 * Contact channels grid. Auto-reads whatsapp / phone / email / instagram from
 * `siteSettings` — editors don't curate channel-by-channel here, they edit
 * the source in Site Settings. This block just decides which channels appear
 * on this page and in what order.
 */
export const channelsSection = defineType({
  name: "channelsSection",
  title: "Canais de contato",
  type: "object",
  fields: [
    defineField({ name: "label", type: "string", initialValue: "Canais" }),
    defineField({
      name: "channels",
      title: "Canais visíveis",
      type: "array",
      of: [{ type: "string" }],
      options: {
        list: [
          { title: "WhatsApp", value: "whatsapp" },
          { title: "Telefone", value: "phone" },
          { title: "E-mail", value: "email" },
          { title: "Instagram", value: "instagram" },
        ],
      },
      initialValue: ["whatsapp", "phone", "email", "instagram"],
      description: "Ordem importa. Os valores vêm de Configurações do site.",
    }),
  ],
  preview: { prepare: () => ({ title: "Canais de contato" }) },
});
