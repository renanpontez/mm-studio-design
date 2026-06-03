import { defineField, defineType } from "sanity";

/**
 * Stacked founder bios (long form). Different layout from `foundersSection`
 * (which renders compact cards next to a portrait). Used on /sobre.
 *
 * Auto-pulls all founders from the dataset by default; editors can curate a
 * subset if they want.
 */
export const founderBiosSection = defineType({
  name: "founderBiosSection",
  title: "Bios (página interna)",
  type: "object",
  fields: [
    defineField({
      name: "founders",
      title: "Sobre Nós",
      type: "array",
      of: [{ type: "reference", to: [{ type: "founder" }] }],
      description: "Deixe vazio para mostrar todas em ordem.",
    }),
  ],
  preview: { prepare: () => ({ title: "Bios das sócias" }) },
});
