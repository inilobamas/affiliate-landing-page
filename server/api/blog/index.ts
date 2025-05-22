import prisma from '../../utils/prisma'
import type { BlogPost } from '@prisma/client'

interface FormData {
  name?: string
  type?: string
  filename?: string
  data: Buffer
}

interface BlogPostInput {
  title: string
  description?: string
  image?: string
  date: Date
  slug: string
  body: string
}

export default defineEventHandler(async (event) => {
  const readFormData = async (data: FormData[]) => {
    const result = {
      title: '',
      description: '',
      date: new Date(),
      slug: '',
      body: '',
      image: undefined as string | undefined
    }
    let imageFile: FormData | null = null

    for (const field of data) {
      if (field.name === 'image' && field.type?.startsWith('image/')) {
        imageFile = field
      } else if (field.name) {
        const value = field.data.toString()
        switch (field.name) {
          case 'title':
            result.title = value
            break
          case 'description':
            result.description = value
            break
          case 'date':
            result.date = new Date(value)
            break
          case 'slug':
            result.slug = value
            break
          case 'body':
            result.body = value
            break
        }
      }
    }

    return { result, imageFile }
  }

  // GET: List all blog posts
  if (event.method === 'GET') {
    try {
      const posts = await prisma.blogPost.findMany({
        orderBy: { date: 'desc' }
      })
      return posts
    } catch (error: any) {
      throw createError({
        statusCode: 500,
        message: 'Error reading blog posts'
      })
    }
  }

  // POST: Create new blog post
  if (event.method === 'POST') {
    try {
      const formData = await readMultipartFormData(event)
      if (!formData) {
        throw new Error('No form data received')
      }

      const { result: postData, imageFile } = await readFormData(formData)

      // Handle image data
      for (const field of formData) {
        if (field.name === 'imageData' && typeof field.data === 'string') {
          // If imageData is provided (base64 string), use it directly
          postData.image = field.data
        } else if (field.name === 'image' && field.type?.startsWith('image/')) {
          // If it's a file upload
          if (field.data.length > 1024 * 1024) {
            throw new Error('Image file must be less than 1MB')
          }
          postData.image = `data:${field.type};base64,${Buffer.from(field.data).toString('base64')}`
        }
      }

      // Required fields validation
      if (!postData.title || !postData.body || !postData.slug || !postData.date) {
        throw new Error('Missing required fields')
      }

      const post = await prisma.blogPost.create({
        data: postData
      })

      return post
    } catch (error: any) {
      console.error('Error creating blog post:', error)
      throw createError({
        statusCode: 500,
        message: `Error creating blog post: ${error.message}`
      })
    }
  }

  // PUT: Update existing blog post
  if (event.method === 'PUT') {
    try {
      const formData = await readMultipartFormData(event)
      if (!formData) {
        throw new Error('No form data received')
      }

      const { result: postData, imageFile } = await readFormData(formData)

      // Handle image data
      for (const field of formData) {
        if (field.name === 'imageData' && typeof field.data === 'string') {
          // If imageData is provided (base64 string), use it directly
          postData.image = field.data
        } else if (field.name === 'image' && field.type?.startsWith('image/')) {
          // If it's a file upload
          if (field.data.length > 1024 * 1024) {
            throw new Error('Image file must be less than 1MB')
          }
          postData.image = `data:${field.type};base64,${Buffer.from(field.data).toString('base64')}`
        }
      }

      if (!postData.slug) {
        throw new Error('Post slug is required')
      }

      const post = await prisma.blogPost.update({
        where: { slug: postData.slug },
        data: postData
      })

      return post
    } catch (error: any) {
      console.error('Error updating blog post:', error)
      throw createError({
        statusCode: 500,
        message: `Error updating blog post: ${error.message}`
      })
    }
  }

  throw createError({
    statusCode: 405,
    message: 'Method not allowed'
  })
})
