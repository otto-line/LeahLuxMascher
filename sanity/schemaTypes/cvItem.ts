import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'cvItem',
  title: 'CV Item',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'year',
      title: 'Year',
      type: 'number',
      validation: (Rule) => Rule.required().min(2000).max(2100),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'dates',
      title: 'Dates',
      type: 'string',
      description: 'e.g. "20 - 22 February 2026"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
      validation: (Rule) => Rule.required(),
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
        subtitle: `${year}`,
      }
    },
  },
})
