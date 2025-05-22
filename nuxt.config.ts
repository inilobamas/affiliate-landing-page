// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  runtimeConfig: {
    public: {
      adminPassword: "auliaikam"
    }
  },
  devtools: { enabled: true },
  modules: [
    [
      '@nuxt/content',
      {
        documentDriven: true
      }
    ],
    '@nuxtjs/tailwindcss'
  ],
  ssr: true,
  nitro: {
    preset: 'vercel'
  },
  vite: {
    assetsInclude: ['**/*.md']
  }
})
