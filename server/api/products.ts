import prisma from '../utils/prisma'
import { writeFile } from 'fs/promises'
import { join } from 'path'

export default defineEventHandler(async (event) => {
  // Handle GET request to fetch products
  if (event.method === 'GET') {
    try {
      const products = await prisma.product.findMany({
        orderBy: { createdAt: 'desc' }
      })
      
      // Parse JSON strings back to arrays
      return products.map(product => ({
        ...product,
        categories: JSON.parse(product.categories),
        images: JSON.parse(product.images)
      }))
    } catch (error: any) {
      throw createError({
        statusCode: 500,
        message: 'Error fetching products'
      })
    }
  }

  // Handle POST request to create/update products
  if (event.method === 'POST') {
    try {
      const formData = await readMultipartFormData(event)
      if (!formData) {
        throw new Error('No form data received')
      }

      const productData: any = {}

      // Process form data
      formData.forEach(field => {
        if (field.name && field.data) {
          const value = field.data.toString()
          if (field.name === 'id') {
            productData.id = parseInt(value)
          } else if (field.name === 'categories' || field.name === 'images') {
            try {
              productData[field.name] = value // Store JSON string directly
            } catch (e) {
              productData[field.name] = '[]' // Fallback to empty array if parsing fails
            }
          } else {
            productData[field.name] = value
          }
        }
      })

      // Required fields validation
      if (!productData.title || !productData.link) {
        throw new Error('Title and link are required')
      }

      let product
      if (productData.id) {
        // Update existing product
        product = await prisma.product.update({
          where: { id: productData.id },
          data: {
            title: productData.title,
            categories: productData.categories || '[]',
            description: productData.description,
            images: productData.images || '[]',
            link: productData.link
          }
        })
      } else {
        // Create new product
        product = await prisma.product.create({
          data: {
            title: productData.title,
            categories: productData.categories || '[]',
            description: productData.description || '',
            images: productData.images || '[]',
            link: productData.link
          }
        })
      }

      // Parse JSON strings back to arrays for response
      return {
        ...product,
        categories: JSON.parse(product.categories),
        images: JSON.parse(product.images)
      }
    } catch (error: any) {
      console.error('Error saving product:', error)
      throw createError({
        statusCode: 500,
        message: `Error saving product: ${error.message}`
      })
    }
  }

  // Handle DELETE request
  if (event.method === 'DELETE') {
    try {
      const body = await readBody(event)
      const productId = parseInt(body.id)

      await prisma.product.delete({
        where: { id: productId }
      })

      return { success: true }
    } catch (error: any) {
      throw createError({
        statusCode: 500,
        message: 'Error deleting product'
      })
    }
  }

  // Handle other methods
  throw createError({
    statusCode: 405,
    message: 'Method not allowed'
  })
})
