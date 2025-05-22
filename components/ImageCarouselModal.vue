<template>
  <Teleport to="body">
    <div v-if="isOpen" class="fixed inset-0 z-50 overflow-y-auto">
      <!-- Backdrop -->
      <div class="fixed inset-0 bg-black/75 transition-opacity" @click="close"></div>

      <!-- Modal -->
      <div class="relative flex min-h-screen items-center justify-center p-4">
        <div class="relative w-full max-w-4xl">
          <!-- Close button -->
          <button 
            @click="close" 
            class="absolute -top-10 right-0 text-white hover:text-gray-300 z-10"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <!-- Carousel -->
          <div class="relative bg-black rounded-lg">
            <div class="relative aspect-[4/3] overflow-hidden">
              <img 
                :src="currentImage" 
                :alt="alt"
                class="w-full h-full object-contain"
              />
            </div>

            <!-- Navigation buttons -->
            <button 
              v-if="images.length > 1"
              @click="prevImage" 
              class="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/75 text-white rounded-full p-2 transition-colors"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button 
              v-if="images.length > 1"
              @click="nextImage" 
              class="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/75 text-white rounded-full p-2 transition-colors"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>

            <!-- Indicators -->
            <div v-if="images.length > 1" class="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
              <button
                v-for="(_, index) in images"
                :key="index"
                @click="currentIndex = index"
                class="w-2 h-2 rounded-full transition-colors"
                :class="index === currentIndex ? 'bg-white' : 'bg-white/50 hover:bg-white/75'"
              ></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  isOpen: Boolean,
  images: {
    type: Array,
    required: true
  },
  alt: {
    type: String,
    default: 'Product image'
  }
})

const emit = defineEmits(['close'])

const currentIndex = ref(0)
const currentImage = computed(() => props.images[currentIndex.value])

const nextImage = () => {
  currentIndex.value = (currentIndex.value + 1) % props.images.length
}

const prevImage = () => {
  currentIndex.value = (currentIndex.value - 1 + props.images.length) % props.images.length
}

const close = () => {
  emit('close')
}

// Reset index when modal opens
watch(() => props.isOpen, (newValue) => {
  if (newValue) {
    currentIndex.value = 0
  }
})

// Keyboard navigation
const handleKeydown = (e) => {
  if (!props.isOpen) return
  
  switch (e.key) {
    case 'ArrowLeft':
      prevImage()
      break
    case 'ArrowRight':
      nextImage()
      break
    case 'Escape':
      close()
      break
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
})
</script>
