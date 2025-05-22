<template>
  <div class="min-h-screen bg-background">

    <div class="container mx-auto py-12 px-4">
      <div class="max-w-5xl mx-auto space-y-8">
        <h1 class="text-3xl md:text-4xl font-light text-neutral-800 font-serif">
          🛍️ <span class="font-medium text-primary">Produk</span> Favorit
        </h1>
        
        <SearchProducts 
          @search="handleSearch" 
          @filter="handleCategoryFilter"
          @changeView="viewMode = $event"
          :viewMode="viewMode"
        />
        
        <div :class="[
          viewMode === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8' : 'space-y-6'
        ]">
          <ProductCard 
            v-for="p in filteredProducts" 
            :key="p.id"
            :product="p"
            :view-mode="viewMode"
          />
        </div>

        <div v-if="filteredProducts.length === 0" class="text-center py-8">
          <p class="text-neutral-600">Tidak ada produk yang ditemukan</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
const viewMode = ref('list')
import Navigation from '~/components/Navigation.vue'
import SearchProducts from '~/components/SearchProducts.vue'
import ProductCard from '~/components/ProductCard.vue'

const { data: products } = await useFetch('/api/products')
const searchQuery = ref('')
const selectedCategories = ref([])

const handleSearch = (query) => {
  searchQuery.value = query
}

const handleCategoryFilter = (categories) => {
  selectedCategories.value = categories
}

const filteredProducts = computed(() => {
  if (!products.value) return []
  
  let filtered = products.value

  // Apply category filter
  if (selectedCategories.value.length > 0) {
    filtered = filtered.filter(p => 
      p.categories.some(cat => selectedCategories.value.includes(cat))
    )
  }

  // Apply search query
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(p => 
      p.title.toLowerCase().includes(query) || 
      (p.description && p.description.toLowerCase().includes(query)) ||
      p.categories.some(cat => cat.toLowerCase().includes(query))
    )
  }

  return filtered
})
</script>
