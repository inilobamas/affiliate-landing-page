<template>
  <header class="sticky top-0 z-50 bg-white/80 backdrop-blur-sm border-b border-neutral-100">
    <div class="container mx-auto px-4">
      <nav class="flex justify-between items-center h-16 md:h-20">
        <NuxtLink to="/" class="text-lg font-medium text-primary">@auliaikam</NuxtLink>
        <ul class="hidden md:flex space-x-8">
          <li><NuxtLink to="/" class="text-neutral-800 hover:text-primary transition-colors">Home</NuxtLink></li>
          <li><NuxtLink to="/products" class="text-neutral-800 hover:text-primary transition-colors">Produk</NuxtLink></li>
          <li><NuxtLink to="/blog" class="text-neutral-800 hover:text-primary transition-colors">Blog</NuxtLink></li>
          <li><NuxtLink to="/about" class="text-neutral-800 hover:text-primary transition-colors">Tentang</NuxtLink></li>
        </ul>
        <button class="md:hidden text-neutral-800 hover:text-primary transition-colors">
          <span class="sr-only">Menu</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
        </button>
      </nav>
    </div>
  </header>
</template>
