import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'sectionPost',
  title: 'Section Post',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Post Title',
      type: 'string',
      validation: Rule => Rule.required()
    }),

    defineField({
      name: 'section',
      title: 'Belongs to Section',
      type: 'reference',
      to: [{ type: 'websiteSection' }],
      validation: Rule => Rule.required()
    }),

    defineField({
      name: 'order',
      title: 'Post Order',
      type: 'number',
      description: 'Controls post order inside the section'
    }),

    defineField({
      name: 'image',
      title: 'Post Image',
      type: 'image',
      options: { hotspot: true }
    }),

    defineField({
      name: 'content',
      title: 'Post Content',
      type: 'text'
    })
  ]
})
