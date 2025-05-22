import prisma from '../../utils/prisma'

export default defineEventHandler(async (event) => {
  const slug = event.context.params?.slug

  if (!slug) {
    throw createError({
      statusCode: 400,
      message: 'Slug is required'
    })
  }

  // GET: Fetch single blog post
  if (event.method === 'GET') {
    try {
      const post = await prisma.blogPost.findUnique({
        where: { slug }
      })

      if (!post) {
        throw createError({
          statusCode: 404,
          message: 'Blog post not found'
        })
      }

      return post
    } catch (error: any) {
      throw createError({
        statusCode: error.statusCode || 500,
        message: error.message || 'Error fetching blog post'
      })
    }
  }

  // DELETE: Delete a blog post
  if (event.method === 'DELETE') {
    try {
      await prisma.blogPost.delete({
        where: { slug }
      })

      return { success: true }
    } catch (error: any) {
      throw createError({
        statusCode: 500,
        message: 'Error deleting blog post'
      })
    }
  }

  throw createError({
    statusCode: 405,
    message: 'Method not allowed'
  })
})
