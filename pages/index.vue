<template>
  <div class="min-h-screen bg-background">
    
    <!-- Hero Section -->
    <section class="py-16 md:py-24 bg-gradient-to-b from-[#FDF8F5] to-background">
      <div class="container mx-auto px-4">
        <div class="flex flex-col md:flex-row items-center gap-12 md:gap-16">
          <div class="relative">
            <div class="w-64 h-64 md:w-72 md:h-72 rounded-full overflow-hidden border-4 border-white shadow-xl">
              <img 
                src="/img/profile.png" 
                alt="Aulia Ika Meilinda" 
                class="w-full h-full object-cover"
              />
            </div>
            <div class="absolute -bottom-4 -right-4 bg-white p-3 rounded-full shadow-md">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-primary"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
            </div>
          </div>
          <div class="text-center md:text-left max-w-xl">
<h1 class="text-3xl md:text-4xl lg:text-5xl font-light text-neutral-800 mb-3 font-sans">
              Halo, saya <span class="font-medium text-primary">Aulia Ika Meilinda</span>
            </h1>
            <p class="text-lg text-neutral-600 mb-8 leading-relaxed">
              Saya suka berbagi cerita, produk favorit, dan hal-hal yang saya rasa bermanfaat.
            </p>
            <NuxtLink to="/about">
              <button class="bg-primary hover:bg-primary-dark text-white border-0 rounded-full px-6 py-2 transition-colors duration-300">
                Tentang Saya
              </button>
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>

    <!-- Featured Products Section -->
    <section class="py-20 bg-white">
      <div class="container mx-auto px-4">
        <div class="flex items-center justify-between mb-8">
          <h2 class="text-2xl md:text-3xl font-light text-neutral-800 font-sans">
            <span class="font-medium text-primary">Produk</span> Favorit
          </h2>
          <NuxtLink to="/products" class="text-primary hover:underline flex items-center gap-1 text-sm">
            Lihat semua 
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
          </NuxtLink>
        </div>

        <SearchProducts 
          @search="handleSearch" 
          @filter="handleCategoryFilter"
          @changeView="viewMode = $event"
          :viewMode="viewMode"
          class="mb-8"
        />
        
        <div :class="[
          viewMode === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8' : 'space-y-6'
        ]">
          <ProductCard 
            v-for="p in filteredProducts.slice(0, 9)" 
            :key="p.id"
            :product="p"
            :view-mode="viewMode"
          />
        </div>
      </div>
    </section>

    <!-- Blog Section -->
    <section class="py-20 bg-background">
      <div class="container mx-auto px-4">
        <div class="flex items-center justify-between mb-8">
          <h2 class="text-2xl md:text-3xl font-light text-neutral-800 font-sans">
            <span class="font-medium text-primary">Blog</span> Terbaru
          </h2>
          <NuxtLink to="/blog" class="text-primary hover:underline flex items-center gap-1 text-sm">
            Lihat semua
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
          </NuxtLink>
        </div>
        
        <div class="grid md:grid-cols-3 gap-6">
          <BlogCard v-for="post in (posts ?? []).slice(0, 3)" :key="post._path" :post="post" />
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
const viewMode = ref('list')
import Navigation from '~/components/Navigation.vue'
import SearchProducts from '~/components/SearchProducts.vue'
import BlogCard from '~/components/BlogCard.vue'
import ProductCard from '~/components/ProductCard.vue'

// Blog dari API
const { data: posts } = await useFetch('/api/blog', {
  default: () => []
})

// Produk dari API
const { data: products } = await useFetch('/api/products', {
  default: () => []
})

const searchQuery = ref('')
const activeCategories = ref([])

const handleSearch = (query) => {
  searchQuery.value = query
}

const handleCategoryFilter = (categories) => {
  activeCategories.value = categories
}

const filteredProducts = computed(() => {
  if (!products.value) return []
  
  let filtered = products.value

  // Apply search filter
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase().trim()
    filtered = filtered.filter(p => 
      p.title.toLowerCase().includes(query) || 
      p.description?.toLowerCase().includes(query)
    )
  }

  // Apply category filter
  if (activeCategories.value.length > 0) {
    filtered = filtered.filter(product => 
      product.categories.some(category => 
        activeCategories.value.includes(category)
      )
    )
  }

  return filtered
})
</script>
