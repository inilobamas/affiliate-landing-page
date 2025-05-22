<template>
  <div class="max-w-3xl mx-auto py-10 px-4 space-y-8">
    <div class="flex justify-between items-center">
      <h1 class="text-2xl font-bold">🛍️ Product Manager</h1>
      <button @click="logout" class="text-sm text-red-500 underline">Logout</button>
    </div>

    <!-- Add/Edit Form -->
    <div class="border p-4 rounded-md space-y-4 bg-gray-50">
      <h2 class="font-semibold">{{ editingProduct ? 'Edit Product' : 'Add New Product' }}</h2>
      
      <form @submit.prevent="saveProduct" class="space-y-4">
        <!-- Basic Info -->
        <div>
          <label class="block text-sm font-medium mb-1">Title*</label>
          <input v-model="form.title" placeholder="Product Title" class="input" required />
        </div>

        <!-- Description -->
        <div>
          <label class="block text-sm font-medium mb-1">Description</label>
          <textarea 
            v-model="form.description" 
            placeholder="Product Description" 
            class="input min-h-[100px]"
            rows="4"
          ></textarea>
        </div>

        <!-- Categories -->
        <div>
          <label class="block text-sm font-medium mb-1">Categories</label>
          <div class="flex flex-wrap gap-2 mb-2">
            <span 
              v-for="category in form.categories" 
              :key="category"
              class="bg-orange-100 text-orange-800 px-2 py-1 rounded-full text-sm flex items-center gap-1"
            >
              {{ category }}
              <button 
                type="button"
                @click="removeCategory(category)"
                class="text-orange-600 hover:text-orange-800"
              >×</button>
            </span>
          </div>
          <div class="flex gap-2">
            <input 
              v-model="newCategory"
              placeholder="Add category"
              class="input flex-1"
              @keyup.enter.prevent="addCategory"
            />
            <button 
              type="button"
              @click="addCategory"
              class="btn-secondary"
            >Add</button>
          </div>
        </div>

        <!-- Images -->
        <div>
          <label class="block text-sm font-medium mb-1">Images</label>
          <div class="grid grid-cols-3 gap-4 mb-4">
            <div 
              v-for="(image, index) in form.images" 
              :key="index"
              class="relative aspect-square"
            >
              <img 
                :src="image"
                class="w-full h-full object-cover rounded"
                alt="Product image"
              />
              <button 
                type="button"
                @click="removeImage(index)"
                class="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600"
              >×</button>
            </div>
          </div>
          <input
            type="file"
            ref="fileInput"
            @change="handleImageUpload"
            accept="image/*"
            multiple
            class="hidden"
          />
          <button 
            type="button"
            @click="$refs.fileInput.click()"
            class="btn-secondary w-full"
          >
            Upload Images
          </button>
        </div>

        <!-- Affiliate Link -->
        <div>
          <label class="block text-sm font-medium mb-1">Affiliate Link*</label>
          <input v-model="form.link" placeholder="https://..." class="input" required />
        </div>

        <!-- Form Actions -->
        <div class="flex gap-2">
          <button type="submit" class="btn flex-1">
            {{ editingProduct ? 'Save Changes' : 'Add Product' }}
          </button>
          <button 
            v-if="editingProduct" 
            type="button"
            @click="cancelEdit" 
            class="btn-secondary"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>

    <!-- Success/Error Message -->
    <div 
      v-if="message.text" 
      :class="`p-3 rounded text-sm ${message.error ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`"
    >
      {{ message.text }}
    </div>

    <!-- Product List -->
    <div>
      <h2 class="font-semibold mb-2">Saved Products</h2>
      <div v-if="products.length === 0" class="text-gray-500 text-sm">
        No products added yet
      </div>
      <ul v-else class="space-y-4">
        <li
          v-for="product in products"
          :key="product.id"
          class="border p-4 rounded-lg"
        >
          <div class="flex gap-4">
            <!-- Product Image -->
            <img 
              :src="getFirstImage(product)"
              class="w-24 h-24 object-cover rounded"
              alt="Product thumbnail"
            />
            
            <!-- Product Info -->
            <div class="flex-1">
              <h3 class="font-medium">{{ product.title }}</h3>
              <p class="text-sm text-gray-600 line-clamp-2 mb-2">{{ product.description }}</p>
              <div class="flex flex-wrap gap-2">
                <span 
                  v-for="category in getCategories(product)" 
                  :key="category"
                  class="bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full text-xs"
                >
                  {{ category }}
                </span>
              </div>
            </div>

            <!-- Actions -->
            <div class="flex gap-2">
              <button
                @click="editProduct(product)"
                class="text-blue-500 hover:underline"
              >Edit</button>
              <button
                @click="confirmDelete(product)"
                class="text-red-500 hover:underline"
              >Delete</button>
            </div>
          </div>
        </li>
      </ul>
    </div>

    <!-- Delete Confirmation Modal -->
    <div 
      v-if="showDeleteModal" 
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
    >
      <div class="bg-white rounded-lg p-6 max-w-sm w-full space-y-4">
        <h3 class="font-bold">Confirm Delete</h3>
        <p class="text-gray-600">
          Are you sure you want to delete this product? This action cannot be undone.
        </p>
        <div class="flex gap-2 justify-end">
          <button @click="showDeleteModal = false" class="btn-secondary">
            Cancel
          </button>
          <button @click="deleteProduct" class="btn-danger">
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const router = useRouter()
function logout() {
  localStorage.removeItem('admin-auth')
  router.push('/admin-login')
}

// State
const products = ref([])
const editingProduct = ref(null)
const showDeleteModal = ref(false)
const deleteTarget = ref(null)
const message = ref({ text: '', error: false })
const fileInput = ref(null)
const newCategory = ref('')

// Form model
const form = ref({
  title: '',
  description: '',
  categories: [],
  images: [],
  link: ''
})

// Load products
async function loadProducts() {
  try {
    const { data } = await useFetch('/api/products')
    products.value = data.value || []
  } catch (error) {
    showMessage('Error loading products', true)
  }
}

onMounted(loadProducts)

// Show message
function showMessage(text, error = false) {
  message.value = { text, error }
  setTimeout(() => {
    message.value.text = ''
  }, 3000)
}

// Category management
function addCategory() {
  if (newCategory.value && !form.value.categories.includes(newCategory.value)) {
    form.value.categories.push(newCategory.value)
    newCategory.value = ''
  }
}

function removeCategory(category) {
  form.value.categories = form.value.categories.filter(c => c !== category)
}

// Image management
async function handleImageUpload(event) {
  const files = event.target.files
  if (!files.length) return

  const maxSize = 1024 * 1024 // 1MB
  for (const file of Array.from(files)) {
    if (file.size > maxSize) {
      showMessage(`File ${file.name} is larger than 1MB`, true)
      continue
    }

    const formData = new FormData()
    formData.append('image', file)

    try {
      const response = await fetch('/api/products/upload', {
        method: 'POST',
        body: formData
      })
      
      if (!response.ok) {
        throw new Error('Upload failed')
      }

      const result = await response.json()
      if (result.url) {
        form.value.images.push(result.url)
      }
    } catch (error) {
      showMessage(`Error uploading image: ${file.name}`, true)
    }
  }

  // Clear the file input
  event.target.value = ''
}

function removeImage(index) {
  form.value.images.splice(index, 1)
}

function getFirstImage(product) {
  try {
    const images = Array.isArray(product.images) 
      ? product.images 
      : JSON.parse(product.images || '[]')
    return images[0] || '/img/placeholder.jpg'
  } catch {
    return '/img/placeholder.jpg'
  }
}

function getCategories(product) {
  try {
    return Array.isArray(product.categories) 
      ? product.categories 
      : JSON.parse(product.categories || '[]')
  } catch {
    return []
  }
}

// Save product
async function saveProduct() {
  if (!form.value.title || !form.value.link) {
    showMessage('Please fill in the required fields', true)
    return
  }

  try {
    const formData = new FormData()
    formData.append('title', form.value.title)
    formData.append('description', form.value.description)
    formData.append('categories', JSON.stringify(form.value.categories))
    formData.append('link', form.value.link)
    formData.append('images', JSON.stringify(form.value.images))
    
    if (editingProduct.value) {
      formData.append('id', editingProduct.value.id.toString())
    }

    const response = await fetch('/api/products', {
      method: 'POST',
      body: formData
    })

    if (!response.ok) {
      throw new Error('Server error')
    }

    await loadProducts()
    showMessage(editingProduct.value ? 'Product updated successfully' : 'Product added successfully')
    resetForm()
  } catch (error) {
    showMessage('Error saving product', true)
  }
}

// Edit product
function editProduct(product) {
  editingProduct.value = product
  form.value = {
    title: product.title,
    description: product.description || '',
    categories: getCategories(product),
    images: Array.isArray(product.images) ? product.images : JSON.parse(product.images || '[]'),
    link: product.link
  }
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

// Cancel edit
function cancelEdit() {
  editingProduct.value = null
  resetForm()
}

// Reset form
function resetForm() {
  editingProduct.value = null
  form.value = {
    title: '',
    description: '',
    categories: [],
    images: [],
    link: ''
  }
}

// Confirm delete
function confirmDelete(product) {
  deleteTarget.value = product
  showDeleteModal.value = true
}

// Delete product
async function deleteProduct() {
  if (!deleteTarget.value) return

  try {
    await $fetch('/api/products', {
      method: 'DELETE',
      body: { id: deleteTarget.value.id }
    })

    await loadProducts()
    showDeleteModal.value = false
    deleteTarget.value = null
    showMessage('Product deleted successfully')
  } catch (error) {
    showMessage('Error deleting product', true)
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
.btn-secondary {
  @apply bg-gray-100 text-gray-600 px-4 py-2 rounded hover:bg-gray-200 transition;
}
.btn-danger {
  @apply bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition;
}
</style>
