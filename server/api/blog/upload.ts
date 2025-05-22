export default defineEventHandler(async (event) => {
  try {
    const formData = await readMultipartFormData(event)
    if (!formData) {
      throw new Error('No form data received')
    }

    const imageFile = formData.find(field => field.name === 'image' && field.type?.startsWith('image/'))
    if (!imageFile) {
      throw new Error('No image file found')
    }

    // Check file size (1MB)
    if (imageFile.data.length > 1024 * 1024) {
      throw new Error('Image file must be less than 1MB')
    }

    // Convert to base64
    const base64Image = `data:${imageFile.type};base64,${Buffer.from(imageFile.data).toString('base64')}`

    return {
      image: base64Image
    }
  } catch (error: any) {
    console.error('Error uploading image:', error)
    throw createError({
      statusCode: 500,
      message: `Error uploading image: ${error.message}`
    })
  }
})
