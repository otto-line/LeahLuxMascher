import {defineType, defineField} from 'sanity'
import {ImagesIcon} from '@sanity/icons'

export default defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  icon: ImagesIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'year',
      title: 'Year',
      type: 'string',
      description: "e.g. '26, '25, '24, or leave blank",
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'Brief description of the project',
    }),
    defineField({
      name: 'fullDescription',
      title: 'Full Description',
      type: 'array',
      of: [{type: 'block'}],
      description: 'Detailed description with formatting',
    }),
    defineField({
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'source',
              title: 'Image Source',
              type: 'string',
              options: {
                list: [
                  {title: 'Sanity', value: 'sanity'},
                  {title: 'Local Folder', value: 'local'},
                ],
              },
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'sanityImage',
              title: 'Sanity Image',
              type: 'image',
              hidden: ({parent}) => parent?.source !== 'sanity',
            },
            {
              name: 'localPath',
              title: 'Local Image Path',
              type: 'string',
              description: 'e.g. Images/FOREVER-LOVE/FL1.jpg',
              hidden: ({parent}) => parent?.source !== 'local',
            },
            {
              name: 'alt',
              title: 'Alt Text',
              type: 'string',
            },
          ],
        },
      ],
      description: 'Add images from Sanity or local folders',
    }),
    defineField({
      name: 'hoverImage',
      title: 'Menu Hover Image',
      type: 'image',
      description: 'Image shown when hovering over this project in the menu',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'gridColumns',
      title: 'Image Grid Columns',
      type: 'number',
      description: 'Number of columns for image grid (2 or 3 recommended)',
      initialValue: 3,
    }),
    defineField({
      name: 'published',
      title: 'Published',
      type: 'boolean',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      year: 'year',
    },
    prepare(selection) {
      const {title, year} = selection
      return {
        title: title,
        subtitle: year ? `(${year})` : 'No year',
      }
    },
  },
})
