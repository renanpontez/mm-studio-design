import { defineArrayMember, defineField, defineType } from "sanity";

const step = defineArrayMember({
  type: "object",
  name: "step",
  fields: [
    defineField({ name: "ordinal", type: "string" }),
    defineField({ name: "name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "description", type: "text", rows: 2 }),
  ],
  preview: { select: { title: "name", subtitle: "ordinal" } },
});

export const processSection = defineType({
  name: "processSection",
  title: "Processo",
  type: "object",
  fields: [
    defineField({ name: "ordinal", type: "string", initialValue: "05" }),
    defineField({ name: "label", type: "string", initialValue: "Processo" }),
    defineField({ name: "heading", type: "richHeadline" }),
    defineField({ name: "steps", type: "array", of: [step] }),
  ],
  preview: { prepare: () => ({ title: "Processo" }) },
});
