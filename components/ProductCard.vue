<template>
  <div :class="[
    'group',
    viewMode === 'list' ? 'flex gap-6' : ''
  ]">
    <div 
      :class="[
        'relative overflow-hidden rounded-xl cursor-pointer',
        viewMode === 'list' ? 'w-[100px] sm:w-[200px] flex-shrink-0' : 'aspect-square mb-4'
      ]" 
      @click="showCarousel = true"
    >
      <img 
        :src="parsedImages[0]" 
        :alt="product.title" 
        class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div class="absolute inset-0 bg-black/5 group-hover:bg-black/10 transition-colors duration-300">
        <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <svg class="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
        </div>
      </div>
    </div>
    <div :class="[viewMode === 'list' ? 'flex-1 min-w-0' : '']">
      <h3 class="text-xl font-medium text-primary mb-2">{{ product.title }}</h3>
      <div class="flex flex-wrap gap-2 mb-3">
        <span 
          v-for="category in parsedCategories" 
          :key="category"
          class="px-2 py-1 text-xs rounded-full bg-primary/10 text-primary font-medium"
        >
          {{ category }}
        </span>
      </div>
      <p class="text-neutral-600 text-sm mb-4 line-clamp-3">{{ product.description }}</p>
      <a :href="product.link" target="_blank" class="inline-block">
        <button class="bg-primary hover:bg-primary-dark text-white border-0 rounded-full h-9 px-4 text-sm transition-colors duration-300">
          Beli
        </button>
      </a>
    </div>

    <ImageCarouselModal
      :is-open="showCarousel"
      :images="parsedImages"
      :alt="product.title"
      @close="showCarousel = false"
    />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import ImageCarouselModal from './ImageCarouselModal.vue'

const props = defineProps({
  product: Object,
  viewMode: {
    type: String,
    default: 'list',
    validator: (value) => ['list', 'grid'].includes(value)
  }
})

const showCarousel = ref(false)

// Parse categories from JSON string if needed
const parsedCategories = computed(() => {
  if (Array.isArray(props.product.categories)) {
    return props.product.categories
  }
  try {
    return JSON.parse(props.product.categories || '[]')
  } catch {
    return []
  }
})

// Parse images from JSON string if needed
const parsedImages = computed(() => {
  if (Array.isArray(props.product.images)) {
    return props.product.images
  }
  try {
    return JSON.parse(props.product.images || '[]')
  } catch {
    return []
  }
})
</script>
