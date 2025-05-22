import prisma from '../../utils/prisma'
import { writeFile } from 'fs/promises'
import { join } from 'path'

interface UploadedFile {
  type?: string
  filename?: string
  data: Buffer
}

interface FormField {
  name?: string
  type?: string
  filename?: string
  data: Buffer
}

export default defineEventHandler(async (event) => {
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

      const postData: any = {}
      let imageFile: UploadedFile | null = null

      // Process form data
      formData.forEach((field: FormField) => {
        if (field.type?.startsWith('image/')) {
          imageFile = field
        } else if (field.name) {
          if (field.name === 'date') {
            postData[field.name] = new Date(field.data.toString())
          } else {
            postData[field.name] = field.data.toString()
          }
        }
      })

      // Handle image upload if present
      if (imageFile) {
        const ext = imageFile.filename?.split('.').pop() || 'jpg'
        const fileName = `blog-${Date.now()}-${Math.random().toString(36).substr(2, 9)}.${ext}`
        const filePath = join('public/img', fileName)
        await writeFile(filePath, imageFile.data)
        postData.image = `/img/${fileName}`
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

      const postData: any = {}
      let imageFile: UploadedFile | null = null

      // Process form data
      formData.forEach((field: FormField) => {
        if (field.type?.startsWith('image/')) {
          imageFile = field
        } else if (field.name) {
          if (field.name === 'date') {
            postData[field.name] = new Date(field.data.toString())
          } else {
            postData[field.name] = field.data.toString()
          }
        }
      })

      // Handle image upload if present
      if (imageFile) {
        const ext = imageFile.filename?.split('.').pop() || 'jpg'
        const fileName = `blog-${Date.now()}-${Math.random().toString(36).substr(2, 9)}.${ext}`
        const filePath = join('public/img', fileName)
        await writeFile(filePath, imageFile.data)
        postData.image = `/img/${fileName}`
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
