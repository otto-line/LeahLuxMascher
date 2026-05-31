import {defineType, defineField} from 'sanity'
import {ControlsIcon} from '@sanity/icons'

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  icon: ControlsIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Site Title',
      type: 'string',
      initialValue: 'Leah Lux Mascher',
    }),
    defineField({
      name: 'colors',
      title: 'Colors',
      type: 'object',
      fields: [
        {
          name: 'primaryRed',
          title: 'Primary Red',
          type: 'string',
          description: 'Main red color (e.g. #dc0202)',
        },
        {
          name: 'textColor',
          title: 'Text Color',
          type: 'string',
          description: 'Default text color (e.g. #da0000)',
        },
        {
          name: 'backgroundColor',
          title: 'Background Color',
          type: 'string',
          description: 'Page background (e.g. white or gradient)',
        },
        {
          name: 'accentColor',
          title: 'Accent Color',
          type: 'string',
          description: 'Secondary accent color (e.g. #eb80ff)',
        },
      ],
    }),
    defineField({
      name: 'fonts',
      title: 'Fonts',
      type: 'object',
      fields: [
        {
          name: 'bodyFontSize',
          title: 'Body Font Size (em)',
          type: 'number',
          initialValue: 1.2,
        },
        {
          name: 'headingFontSize',
          title: 'Heading Font Size (em)',
          type: 'number',
          initialValue: 2,
        },
        {
          name: 'menuFontSize',
          title: 'Menu Font Size (em)',
          type: 'number',
          initialValue: 1.4,
        },
      ],
    }),
    defineField({
      name: 'spacing',
      title: 'Spacing',
      type: 'object',
      fields: [
        {
          name: 'padding',
          title: 'Default Padding (px)',
          type: 'number',
          initialValue: 20,
        },
        {
          name: 'imageGap',
          title: 'Image Grid Gap (px)',
          type: 'number',
          initialValue: 10,
        },
        {
          name: 'marginTop',
          title: 'Content Margin Top (em)',
          type: 'number',
          initialValue: 3,
        },
      ],
    }),
    defineField({
      name: 'grid',
      title: 'Grid Defaults',
      type: 'object',
      fields: [
        {
          name: 'defaultColumns',
          title: 'Default Grid Columns',
          type: 'number',
          initialValue: 3,
        },
        {
          name: 'mobileColumns',
          title: 'Mobile Grid Columns',
          type: 'number',
          initialValue: 2,
        },
      ],
    }),
    defineField({
      name: 'aboutContent',
      title: 'About Page Content',
      type: 'array',
      of: [{type: 'block'}],
    }),
  ],
  initialValue: {
    title: 'Leah Lux Mascher',
    colors: {
      primaryRed: '#dc0202',
      textColor: '#da0000',
      backgroundColor: 'white',
      accentColor: '#eb80ff',
    },
    fonts: {
      bodyFontSize: 1.2,
      headingFontSize: 2,
      menuFontSize: 1.4,
    },
    spacing: {
      padding: 20,
      imageGap: 10,
      marginTop: 3,
    },
    grid: {
      defaultColumns: 3,
      mobileColumns: 2,
    },
  },
})
