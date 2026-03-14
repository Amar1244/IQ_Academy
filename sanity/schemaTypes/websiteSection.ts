import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'websiteSection',
  title: 'Website Section',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Section Title',
      type: 'string',
      validation: Rule => Rule.required(),
      description: 'Example: Advertisement, Batches, Events'
    }),

    defineField({
      name: 'page',
      title: 'Belongs to Page',
      type: 'reference',
      to: [{ type: 'page' }],
      validation: Rule => Rule.required()
    }),

    defineField({
      name: 'order',
      title: 'Section Order',
      type: 'number',
      description: 'Lower number appears first'
    })
  ]
})
