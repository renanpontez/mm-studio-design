import { defineField, defineType } from "sanity";

/**
 * Title + intro + side metadata for the contact-form section. The actual
 * form fields are interactive client logic and stay in code (ContactForm.tsx).
 */
export const briefingFormSection = defineType({
  name: "briefingFormSection",
  title: "Formulário de briefing",
  type: "object",
  fields: [
    defineField({ name: "label", type: "string", initialValue: "Briefing rápido" }),
    defineField({ name: "heading", title: "Título", type: "richHeadline" }),
    defineField({ name: "intro", title: "Texto introdutório", type: "text", rows: 3 }),
    defineField({
      name: "metadata",
      title: "Etiquetas laterais",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "label", type: "string", validation: (r) => r.required() }),
            defineField({ name: "value", type: "string", validation: (r) => r.required() }),
          ],
          preview: { select: { title: "label", subtitle: "value" } },
        },
      ],
      description: 'Ex.: "Atendimento: Seg a sex · 9h a 18h"',
    }),
  ],
  preview: { prepare: () => ({ title: "Formulário de briefing" }) },
});
