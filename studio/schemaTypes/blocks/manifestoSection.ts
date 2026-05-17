import { defineArrayMember, defineField, defineType } from "sanity";

const segment = defineArrayMember({
  type: "object",
  name: "segment",
  fields: [
    defineField({ name: "text", type: "string", validation: (r) => r.required() }),
    defineField({ name: "italic", type: "boolean", initialValue: false }),
  ],
  preview: { select: { title: "text", subtitle: "italic" }, prepare: ({ title, subtitle }) => ({ title, subtitle: subtitle ? "italic" : undefined }) },
});

export const manifestoSection = defineType({
  name: "manifestoSection",
  title: "Manifesto",
  type: "object",
  fields: [
    defineField({ name: "ordinal", type: "string", initialValue: "01" }),
    defineField({ name: "label", type: "string", initialValue: "Manifesto" }),
    defineField({ name: "segments", title: "Segmentos (text + italic flag)", type: "array", of: [segment] }),
  ],
  preview: { prepare: () => ({ title: "Manifesto" }) },
});
