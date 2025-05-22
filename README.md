# Affiliate Landing Page

A modern affiliate landing page built with Nuxt 3, featuring product management, blog system, and admin interface. This application allows you to showcase affiliate products and manage blog content with ease.

## Features

- **Product Management**
  - Add, edit, and delete affiliate products
  - Upload and manage product images
  - Categorize products
  - Custom product descriptions and affiliate links

- **Blog System**
  - Write blog posts using Markdown
  - Add featured images to posts
  - SEO-friendly URLs with slugs
  - Rich text content support

- **Admin Interface**
  - Secure admin dashboard
  - Product management interface
  - Blog post editor
  - Image upload functionality

- **User Experience**
  - Responsive design
  - Fast product search
  - Image carousel for product galleries
  - SEO-optimized content

## Tech Stack

- **Framework:** Nuxt 3 with Vue 3
- **Database:** SQLite with Prisma ORM
- **Styling:** Tailwind CSS with Typography plugin
- **Content:** @nuxt/content for blog management
- **Image Handling:** Built-in image upload system
- **Authentication:** Custom auth middleware

## Prerequisites

- Node.js (Latest LTS version recommended)
- npm or another package manager (yarn, pnpm, bun)

## Setup

1. Clone the repository and install dependencies:

```bash
# Install dependencies
npm install
```

2. Set up the database:

```bash
# Generate Prisma client
npm run db:generate

# Run database migrations
npm run db:migrate

# (Optional) Seed initial data
npm run db:migrate-data
```

## Development

Start the development server:

```bash
npm run dev
```

The server will start at `http://localhost:3000`

### Database Management

```bash
# Open Prisma Studio (database GUI)
npm run db:studio

# Push schema changes without migrations
npm run db:push

# Create a new migration
npm run db:migrate
```

## Deployment

### Vercel Deployment

To deploy this application on Vercel, you need to configure the build settings to ensure Prisma Client is properly generated:

1. In your Vercel project settings, add the following Build Command:
```bash
npm run build && npx prisma generate
```

2. Add the following environment variables in your Vercel project settings:
- `DATABASE_URL`: Your database connection string
- Other environment variables if required by your application

3. If using SQLite, ensure your database is properly configured for production use, as Vercel's filesystem is read-only. Consider using a hosted database service instead.

### Local Production Build

To build and preview the application locally:

```bash
# Build
npm run build

# Generate Prisma Client (important for production)
npx prisma generate

# Preview production build
npm run preview
```

## Project Structure

```
├── assets/            # Static assets
│   ├── css/          # Global CSS
│   └── data/         # JSON data files
├── components/       # Vue components
├── content/         # Blog content (Markdown)
├── pages/           # Application pages
│   └── admin/       # Admin interface
├── prisma/          # Database schema and migrations
├── public/          # Public static files
│   └── img/         # Uploaded images
├── server/          # API routes and utilities
└── scripts/         # Utility scripts
```

## Features Details

### Product Management
- Create and manage affiliate products
- Upload multiple product images
- Set product categories and descriptions
- Manage affiliate links

### Blog System
- Markdown-based blog posts
- Featured images support
- Categories and tags
- SEO optimization

### Admin Interface
- Protected admin routes
- Product management dashboard
- Blog post editor
- Image upload interface

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## License

[MIT License](LICENSE)
