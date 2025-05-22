import { PrismaClient } from '@prisma/client'
import { readFile, readdir } from 'fs/promises'
import { resolve } from 'path'
import matter from 'gray-matter'

const prisma = new PrismaClient()

async function migrateProducts() {
  try {
    // Read existing products from JSON
    const productsFile = resolve('./assets/data/products.json')
    const content = await readFile(productsFile, 'utf-8')
    const products = JSON.parse(content)

    // Migrate each product
    for (const product of products) {
      await prisma.product.create({
        data: {
          title: product.title,
          categories: JSON.stringify(product.categories || []),
          description: product.description || '',
          images: JSON.stringify(product.images || []),
          link: product.link
        }
      })
    }

    console.log(`Migrated ${products.length} products`)
  } catch (error) {
    console.error('Error migrating products:', error)
  }
}

async function migrateBlogs() {
  try {
    // Read markdown files
    const blogDir = resolve('./content/blog')
    const files = await readdir(blogDir)
    
    // Migrate each blog post
    for (const file of files) {
      if (!file.endsWith('.md')) continue

      const content = await readFile(resolve(blogDir, file), 'utf-8')
      const { data, content: body } = matter(content)
      const slug = file.replace('.md', '')

      await prisma.blogPost.create({
        data: {
          title: data.title,
          description: data.description || '',
          image: data.image || '',
          date: new Date(data.date),
          slug,
          body
        }
      })
    }

    console.log(`Migrated ${files.length} blog posts`)
  } catch (error) {
    console.error('Error migrating blog posts:', error)
  }
}

// Run migrations
async function migrate() {
  try {
    await migrateProducts()
    await migrateBlogs()
    console.log('Migration completed successfully')
  } catch (error) {
    console.error('Migration failed:', error)
  } finally {
    await prisma.$disconnect()
  }
}

migrate()
