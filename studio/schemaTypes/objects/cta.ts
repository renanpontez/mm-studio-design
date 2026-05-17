import { defineField, defineType } from "sanity";

export const cta = defineType({
  name: "cta",
  title: "CTA",
  type: "object",
  fields: [
    defineField({ name: "label", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "kind",
      type: "string",
      options: {
        list: [
          { title: "Internal link", value: "internal" },
          { title: "External URL", value: "external" },
          { title: "WhatsApp", value: "whatsapp" },
          { title: "Email", value: "email" },
          { title: "Anchor (#id)", value: "anchor" },
        ],
        layout: "radio",
      },
      initialValue: "internal",
    }),
    defineField({ name: "href", type: "string", description: "/route, https://..., #anchor, or empty for whatsapp/email (auto)" }),
    defineField({
      name: "variant",
      type: "string",
      options: { list: ["primary", "ghost", "underline"] },
      initialValue: "primary",
    }),
  ],
});
