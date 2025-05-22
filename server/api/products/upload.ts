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
    // Check file size (1MB = 1024 * 1024 bytes)
    if (file.data.length > 1024 * 1024) {
      throw createError({
        statusCode: 400,
        message: 'File size must be less than 1MB'
      })
    }

    // Convert to base64
    const base64String = `data:${file.type};base64,${Buffer.from(file.data).toString('base64')}`

    return {
      url: base64String
    }
  } catch (error: any) {
    throw createError({
      statusCode: 500,
      message: `Error uploading file: ${error.message}`
    })
  }
})
