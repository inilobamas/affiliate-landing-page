import { writeFile } from 'fs/promises'
import { join } from 'path'

export default defineEventHandler(async (event) => {
  try {
    const formData = await readMultipartFormData(event)
    if (!formData || !formData[0] || !formData[0].type?.startsWith('image/')) {
      throw createError({
        statusCode: 400,
        message: 'Invalid file upload'
      })
    }

    const file = formData[0]
    const ext = file.filename?.split('.').pop() || 'jpg'
    const fileName = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}.${ext}`
    const filePath = join('public/img', fileName)

    await writeFile(filePath, file.data)

    return {
      url: `/img/${fileName}`
    }
  } catch (error: any) {
    throw createError({
      statusCode: 500,
      message: `Error uploading file: ${error.message}`
    })
  }
})
