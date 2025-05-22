<template>
  <div class="min-h-screen flex items-center justify-center px-4">
    <form @submit.prevent="handleLogin" class="max-w-md w-full bg-white shadow p-6 rounded space-y-4">
      <h1 class="text-xl font-bold">🔐 Admin Login</h1>
      <input v-model="password" type="password" placeholder="Enter admin password" class="input" />
      <button class="btn w-full">Login</button>
      <p v-if="error" class="text-red-500 text-sm">Password salah</p>
    </form>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
const password = ref('')
const error = ref(false)

function handleLogin() {
  const runtimeConfig = useRuntimeConfig()
  if (password.value === runtimeConfig.public.adminPassword) {
    localStorage.setItem('admin-auth', 'true')
    router.push('/admin/products')
  } else {
    error.value = true
  }
}
</script>

<style scoped>
.input {
  @apply w-full border p-2 rounded text-sm;
}
.btn {
  @apply bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition;
}
</style>
