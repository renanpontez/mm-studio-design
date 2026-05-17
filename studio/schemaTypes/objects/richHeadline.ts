import { defineType } from "sanity";

/**
 * Display headline with inline italic accent.
 * Use Portable Text with a custom inline mark "italicAccent" to render
 * the moss/sage italic span without bleeding HTML to editors.
 */
export const richHeadline = defineType({
  name: "richHeadline",
  title: "Display headline",
  type: "array",
  of: [
    {
      type: "block",
      styles: [{ title: "Display", value: "normal" }],
      lists: [],
      marks: {
        decorators: [
          { title: "Italic accent", value: "italicAccent" },
        ],
        annotations: [],
      },
    },
  ],
});
