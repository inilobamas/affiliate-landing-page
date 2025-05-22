export default defineNuxtRouteMiddleware((to) => {
  // Skip middleware if not an admin route or if it's the login page
  if (!to.path.startsWith('/admin') || to.path === '/admin-login') {
    return
  }

  // Handle non-browser environments
  if (process.server) {
    return
  }

  // Check authentication
  const isLoggedIn = localStorage.getItem('admin-auth') === 'true'
  if (!isLoggedIn) {
    return navigateTo('/admin-login')
  }
})
