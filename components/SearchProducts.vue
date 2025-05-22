<template>
  <div class="space-y-4">
    <div class="flex gap-4 items-center">
      <div class="relative flex-1">
      <input 
        type="text"
        class="w-full px-4 py-3 pr-10 border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent placeholder:text-neutral-400"
        placeholder="Cari produk..."
        v-model="searchQuery"
        @input="handleSearch"
      >
      <span class="absolute right-4 top-3.5 text-neutral-400">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
      </span>
      </div>
      
      <div class="flex items-center gap-2 border rounded-lg p-1">
        <button 
          @click="$emit('changeView', 'list')"
          :class="[
            'p-2 rounded-md transition-colors',
            viewMode === 'list' ? 'bg-primary text-white' : 'hover:bg-neutral-100'
          ]"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <button 
          @click="$emit('changeView', 'grid')"
          :class="[
            'p-2 rounded-md transition-colors',
            viewMode === 'grid' ? 'bg-primary text-white' : 'hover:bg-neutral-100'
          ]"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
          </svg>
        </button>
      </div>
    </div>

    <div class="flex flex-wrap gap-2">
      <button
        v-for="category in availableCategories"
        :key="category"
        @click="toggleCategory(category)"
        :class="[
          'px-3 py-1.5 rounded-full text-sm font-medium transition-colors duration-200',
          selectedCategories.includes(category)
            ? 'bg-primary text-white'
            : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
        ]"
      >
        {{ category }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const searchQuery = ref('')
const selectedCategories = ref([])
const products = ref([])
const emit = defineEmits(['search', 'filter', 'changeView'])
const props = defineProps({
  viewMode: {
    type: String,
    required: true
  }
})

// Fetch products to get categories
async function fetchProducts() {
  try {
    const { data } = await useFetch('/api/products')
    products.value = data.value || []
  } catch (error) {
    console.error('Error fetching products:', error)
  }
}

onMounted(fetchProducts)

// Get unique categories from products
const availableCategories = computed(() => {
  const categories = new Set()
  products.value?.forEach(product => {
    const productCategories = Array.isArray(product.categories) 
      ? product.categories 
      : JSON.parse(product.categories || '[]')
    productCategories.forEach(category => categories.add(category))
  })
  return Array.from(categories).sort()
})

const toggleCategory = (category) => {
  const index = selectedCategories.value.indexOf(category)
  if (index === -1) {
    selectedCategories.value.push(category)
  } else {
    selectedCategories.value.splice(index, 1)
  }
  emit('filter', selectedCategories.value)
}

// Handle search input
const handleSearch = () => {
  emit('search', searchQuery.value)
}
</script>
