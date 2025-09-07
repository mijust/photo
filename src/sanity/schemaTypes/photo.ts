import { defineField, defineType } from "sanity";

export const photoType = defineType({
  name: "photo",
  title: "Photo",
  type: "document",
  fields: [
    defineField({
      name: "title",
      type: "string",
    }),
    defineField({
      name: "slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
    }),
    defineField({
      name: "image",
      type: "image",
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alternative Text",
        },
      ],
    }),
    defineField({
        name: 'description',
        type: 'text',
    }),
    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      description: 'Mark this photo to feature it on the homepage.',
      initialValue: false,
    }),
    defineField({
      name: "dateTaken",
      type: "datetime",
    }),
    defineField({
        name: 'camera',
        type: 'string',
    }),
    defineField({
        name: 'settings',
        type: 'object',
        fields: [
            {name: 'aperture', type: 'string'},
            {name: 'shutterSpeed', type: 'string'},
            {name: 'iso', type: 'number'},
        ]
    })
  ],
  preview: {
    select: {
      title: "title",
      media: "image",
    },
  },
});
