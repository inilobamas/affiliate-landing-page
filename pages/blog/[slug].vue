<template>
  <div class="max-w-4xl mx-auto py-10 px-4">
    <!-- Loading state -->
    <div v-if="pending" class="text-center py-10">
      <p class="text-gray-600">Loading post...</p>
    </div>

    <!-- Error state -->
    <div v-else-if="error" class="text-center py-10">
      <p class="text-red-600">Failed to load blog post</p>
      <NuxtLink to="/blog" class="text-orange-500 hover:underline mt-4 inline-block">
        Back to Blog
      </NuxtLink>
    </div>

    <!-- Post content -->
    <article v-else class="prose lg:prose-xl mx-auto">
      <h1 class="text-4xl font-bold mb-4">{{ post?.post?.title }}</h1>
      <img 
        :src="post?.post?.image" 
        :alt="post?.post?.title"
        class="w-full h-64 object-cover rounded-lg mb-8"
      />
      <div class="text-gray-600 mb-8">
        {{ formatDate(post?.post?.date) }}
      </div>
      <div v-html="post?.content"></div>
    </article>
  </div>
</template>

<script setup>
const route = useRoute()

const { pending, data: post, error } = await useFetch(`/api/blog/${route.params.slug}`, {
  default: () => null
})

function formatDate(date) {
  if (!date) return ''
  return new Date(date).toLocaleDateString('id-ID', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

// Redirect to blog list if post not found
if (!post.value) {
  navigateTo('/blog')
}
</script>
