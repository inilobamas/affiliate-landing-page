<template>
  <div class="space-y-16 px-6 max-w-5xl mx-auto py-12">
    <!-- Hero Section -->
    <section class="flex flex-col md:flex-row items-center gap-6">
      <img src="/img/profile.png" class="w-40 h-40 rounded-full" alt="profile" />
      <div>
        <h1 class="text-3xl font-bold">Halo, saya <span class="text-orange-500">[Nama]</span></h1>
        <p class="mt-2 text-gray-700">Saya suka berbagi pengalaman, insight, dan rekomendasi produk yang saya cintai.</p>
        <button class="mt-4 bg-orange-500 text-white px-4 py-2 rounded">Lihat lebih lanjut</button>
      </div>
    </section>

    <!-- Blog Preview -->
    <section>
      <h2 class="text-2xl font-bold mb-4">Blog Terbaru</h2>
      <div class="grid md:grid-cols-3 gap-6">
        <BlogCard v-for="post in blogs.slice(0, 3)" :key="post._path" :post="post" />
      </div>
    </section>

    <!-- Produk Favorit -->
    <section>
      <h2 class="text-2xl font-bold mb-4">Produk Favorit</h2>
      <div class="grid md:grid-cols-4 gap-6">
        <ProductCard v-for="p in products" :key="p.id" :product="p" />
      </div>
    </section>
  </div>
</template>

<script setup>
import { useAsyncData } from '#app'
import ProductCard from '~/components/ProductCard.vue'
import BlogCard from '~/components/BlogCard.vue'

// Fetch blog posts from content
const { data: blogs } = await useAsyncData('blog-posts', () => queryContent('/blog').sort({ date: -1 }).find())

// Fetch products from local JSON
const { data: products } = await useFetch('/assets/data/products.json')
</script>
