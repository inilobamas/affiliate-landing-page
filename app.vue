<template>
  <div class="min-h-screen flex flex-col">
    <Navigation />
    <main class="flex-1">
      <NuxtPage />
    </main>
    <Footer />
  </div>
</template>

<script setup>
import Navigation from '~/components/Navigation.vue'
import Footer from '~/components/Footer.vue'
</script>

<style>
/* Custom font import */
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600&family=Montserrat:wght@300;400;500;600&display=swap');

/* Apply custom fonts */
h1, h2, h3, h4, h5, h6 {
  font-family: 'Montserrat', sans-serif;
}

body, p, a, button, input {
  font-family: 'Montserrat', sans-serif;
}
</style>
