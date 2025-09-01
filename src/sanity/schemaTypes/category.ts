// ./src/sanity/schemaTypes/category.ts
import { defineField, defineType } from "sanity";

export const categoryType = defineType({
  name: "category",
  type: "document",
  fields: [
    defineField({
      name: "title",
      type: "string",
    }),
    defineField({
      name: "description",
      type: "text",
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      description: 'A representative image for the category.',
      options: {
        hotspot: true,
      },
    }),
  ],
});