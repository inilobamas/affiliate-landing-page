<template>
  <footer class="bg-white border-t border-neutral-100">
    <div class="container mx-auto px-4 py-8">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <!-- Brand Section -->
        <div>
          <h3 class="text-lg text-primary">Aulia Ika Meilinda</h3>
          <p class="mt-2 text-sm text-neutral-600">Discover quality products and lifestyle inspiration</p>
        </div>
        
        <!-- Quick Links -->
        <div>
          <h4 class="font-medium mb-4">Quick Links</h4>
          <ul class="space-y-2">
            <li><NuxtLink to="/" class="text-sm text-neutral-600 hover:text-primary transition-colors">Home</NuxtLink></li>
            <li><NuxtLink to="/products" class="text-sm text-neutral-600 hover:text-primary transition-colors">Produk</NuxtLink></li>
            <li><NuxtLink to="/blog" class="text-sm text-neutral-600 hover:text-primary transition-colors">Blog</NuxtLink></li>
            <li><NuxtLink to="/about" class="text-sm text-neutral-600 hover:text-primary transition-colors">Tentang</NuxtLink></li>
          </ul>
        </div>
        
        <!-- Contact/Social -->
        <div>
          <h4 class="font-medium mb-4">Connect With Us</h4>
          <div class="flex space-x-4">
            <a href="#" class="text-neutral-600 hover:text-primary transition-colors">
              <span class="sr-only">Instagram</span>
              <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fill-rule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clip-rule="evenodd" />
              </svg>
            </a>
            <a href="#" class="text-neutral-600 hover:text-primary transition-colors">
              <span class="sr-only">TikTok</span>
              <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.298-.002.595.042.88.13V9.4A6.33 6.33 0 0 0 5.11 19.6a6.34 6.34 0 0 0 10.77-4.5V8.62a8.16 8.16 0 0 0 3.71.88V6.05a5.07 5.07 0 0 1-3.71.88z"/>
              </svg>
            </a>
            <a href="#" class="text-neutral-600 hover:text-primary transition-colors">
              <span class="sr-only">WhatsApp</span>
              <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 2C6.48 2 2 6.48 2 12c0 2.11.65 4.07 1.76 5.69L2 22l4.31-1.76C7.93 21.35 9.89 22 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm5.46 14.96c-.25.71-1.23 1.29-2.01 1.46-.52.11-1.2.2-3.48-.74-2.92-1.21-4.8-4.17-4.94-4.36-.14-.19-1.16-1.54-1.16-2.94 0-1.4.73-2.09 1-2.37.22-.24.48-.36.68-.36.17 0 .34 0 .48.01.17.01.39-.06.61.47.22.53.76 1.84.83 1.97.07.13.12.29.02.47-.09.18-.14.28-.27.43-.13.15-.28.33-.4.44-.13.14-.27.29-.11.56.15.27.68 1.16 1.46 1.88 1.01.93 1.86 1.22 2.12 1.35.27.14.42.12.58-.07.15-.18.65-.76.82-.97.17-.21.34-.18.57-.11.23.07 1.47.69 1.72.82s.42.19.48.29c.06.1.06.61-.19 1.31z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
      
      <!-- Copyright -->
      <div class="mt-8 pt-8 border-t border-neutral-100 text-center">
        <p class="text-sm text-neutral-600">&copy; {{ new Date().getFullYear() }} Auliaikam. All rights reserved.</p>
      </div>
    </div>
  </footer>
</template>
