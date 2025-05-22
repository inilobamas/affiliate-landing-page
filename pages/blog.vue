<template>
  <div class="max-w-5xl mx-auto py-10 px-4 space-y-8">
    <h1 class="text-3xl font-bold mb-4">📚 Blog</h1>

    <!-- Loading state -->
    <div v-if="pending" class="text-center py-10">
      <p class="text-gray-600">Loading posts...</p>
    </div>

    <!-- Error state -->
    <div v-else-if="error" class="text-center py-10">
      <p class="text-red-600">Failed to load blog posts</p>
    </div>

    <!-- No posts state -->
    <div v-else-if="!posts.length" class="text-center py-10">
      <p class="text-gray-600">No blog posts found.</p>
    </div>

    <!-- Posts grid -->
    <div v-else class="grid md:grid-cols-3 gap-6">
      <NuxtLink 
        v-for="post in posts" 
        :key="post._path" 
        :to="post._path"
        class="border rounded-lg overflow-hidden shadow hover:shadow-md transition"
      >
        <img :src="post.image" :alt="post.title" class="w-full h-40 object-cover" />
        <div class="p-4">
          <h3 class="font-bold text-lg mb-1">{{ post.title }}</h3>
          <p class="text-sm text-gray-600 line-clamp-2">{{ post.description }}</p>
          <p class="text-orange-600 mt-2">Baca selengkapnya</p>
        </div>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
const { pending, data: posts, error } = await useFetch('/api/blog', {
  default: () => []
})
</script>
