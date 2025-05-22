<template>
  <div class="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
    <div class="aspect-video overflow-hidden">
      <img 
        :src="post.image" 
        :alt="post.title" 
        class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
    </div>
    <div class="p-6">
      <h3 class="text-l font-medium text-primary mb-2 group-hover:text-primary transition-colors">
        {{ post.title }}
      </h3>
      <p class="text-neutral-600 mb-4 line-clamp-2">{{ post.description }}</p>
      <NuxtLink :to="post._path" class="text-primary hover:underline font-medium inline-flex items-center">
        Baca selengkapnya 
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="ml-1"><path d="m9 18 6-6-6-6"/></svg>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
defineProps({
  post: Object
})
</script>
