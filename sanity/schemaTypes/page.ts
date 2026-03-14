import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'page',
  title: 'Website Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      validation: Rule => Rule.required(),
      description: 'Example: Home, About, Contact'
    }),
    defineField({
      name: 'slug',
      title: 'Page Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: Rule => Rule.required(),
      description: 'Used to map page (home, about, contact)'
    })
  ]
})
