import { defineArrayMember, defineField, defineType } from "sanity";

const navLink = defineArrayMember({
  type: "object",
  name: "navLink",
  fields: [
    defineField({ name: "label", type: "string", validation: (r) => r.required() }),
    defineField({ name: "href", type: "string", validation: (r) => r.required() }),
  ],
});

export const navigation = defineType({
  name: "navigation",
  title: "Navegação",
  type: "document",
  fields: [
    defineField({ name: "primary", title: "Menu principal", type: "array", of: [navLink] }),
    defineField({ name: "footer", title: "Menu do rodapé", type: "array", of: [navLink] }),
  ],
  preview: { prepare: () => ({ title: "Navegação" }) },
});
