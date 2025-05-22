<template>
  <div class="max-w-3xl mx-auto py-10 px-4 space-y-8">
    <div class="flex justify-between items-center">
      <h1 class="text-2xl font-bold">✍️ Blog Post Manager</h1>
      <button @click="logout" class="text-sm text-red-500 underline">Logout</button>
    </div>

    <!-- Blog Post Form -->
    <div class="border p-4 rounded-md space-y-4 bg-gray-50">
      <h2 class="font-semibold">{{ editingPost ? 'Edit Post' : 'Create New Post' }}</h2>
      <form @submit.prevent="savePost" class="space-y-4">
        <!-- Title -->
        <div>
          <label class="block text-sm font-medium mb-1">Title*</label>
          <input v-model="form.title" placeholder="Post Title" class="input" required />
        </div>

        <!-- Description -->
        <div>
          <label class="block text-sm font-medium mb-1">Description</label>
          <textarea 
            v-model="form.description" 
            placeholder="Brief description for previews" 
            class="input"
            rows="2"
          ></textarea>
        </div>

        <!-- Image -->
        <div>
          <label class="block text-sm font-medium mb-1">Cover Image</label>
          <div v-if="form.image" class="mb-2">
            <img :src="form.image" class="w-32 h-32 object-cover rounded" />
          </div>
          <input
            ref="fileInput"
            type="file"
            accept="image/*"
            class="hidden"
            @change="handleImageUpload"
          />
          <button 
            type="button"
            @click="$refs.fileInput.click()"
            class="btn-secondary w-full"
          >
            {{ form.image ? 'Change Image' : 'Upload Image' }}
          </button>
        </div>

        <!-- Date -->
        <div>
          <label class="block text-sm font-medium mb-1">Publish Date*</label>
          <input 
            v-model="form.date" 
            type="date" 
            class="input"
            required 
          />
        </div>

        <!-- Slug -->
        <div>
          <label class="block text-sm font-medium mb-1">URL Slug*</label>
          <div class="flex gap-2">
            <input 
              v-model="form.slug" 
              placeholder="my-blog-post" 
              class="input flex-1"
              required
            />
            <button 
              type="button"
              @click="generateSlug"
              class="btn-secondary whitespace-nowrap"
            >
              Generate from Title
            </button>
          </div>
        </div>

        <!-- Content -->
        <div>
          <label class="block text-sm font-medium mb-1">Content*</label>
          <textarea 
            v-model="form.body"
            placeholder="Write your blog post here (Markdown supported)"
            class="input font-mono"
            rows="15"
            required
          ></textarea>
        </div>

        <!-- Form Actions -->
        <div class="flex gap-2">
          <button type="submit" class="btn flex-1">
            {{ editingPost ? 'Save Changes' : 'Create Post' }}
          </button>
          <button 
            v-if="editingPost"
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

    <!-- Blog Posts List -->
    <div>
      <h2 class="font-semibold mb-4">Published Posts</h2>
      <div v-if="posts.length === 0" class="text-gray-500 text-sm">
        No blog posts yet
      </div>
      <ul v-else class="space-y-4">
        <li
          v-for="post in posts"
          :key="post.slug"
          class="border p-4 rounded-lg"
        >
          <div class="flex gap-4">
            <!-- Post Image -->
            <img 
              :src="post.image || '/img/placeholder.jpg'" 
              class="w-24 h-24 object-cover rounded"
              alt="Blog post cover"
            />
            
            <!-- Post Info -->
            <div class="flex-1">
              <h3 class="font-medium">{{ post.title }}</h3>
              <p class="text-sm text-gray-600 line-clamp-2">{{ post.description }}</p>
              <p class="text-xs text-gray-400 mt-1">Published: {{ formatDate(post.date) }}</p>
            </div>

            <!-- Actions -->
            <div class="flex gap-2">
              <button 
                @click="editPost(post)"
                class="text-blue-500 hover:underline"
              >Edit</button>
              <button 
                @click="confirmDelete(post)"
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
          Are you sure you want to delete this blog post? This action cannot be undone.
        </p>
        <div class="flex gap-2 justify-end">
          <button @click="showDeleteModal = false" class="btn-secondary">
            Cancel
          </button>
          <button @click="deletePost" class="btn-danger">
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
const posts = ref([])
const editingPost = ref(null)
const showDeleteModal = ref(false)
const deleteTarget = ref(null)
const message = ref({ text: '', error: false })
const fileInput = ref(null)

// Form model with default date
const form = ref({
  title: '',
  description: '',
  image: '',
  date: new Date().toISOString().slice(0, 10),
  slug: '',
  body: ''
})

// Load posts
async function loadPosts() {
  try {
    const { data } = await useFetch('/api/blog')
    posts.value = data.value || []
  } catch (error) {
    showMessage('Error loading blog posts', true)
  }
}

onMounted(loadPosts)

// Show message
function showMessage(text, error = false) {
  message.value = { text, error }
  setTimeout(() => {
    message.value.text = ''
  }, 3000)
}

// Generate slug from title
function generateSlug() {
  if (!form.value.title) {
    showMessage('Please enter a title first', true)
    return
  }
  form.value.slug = form.value.title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

// Format date for display
function formatDate(date) {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

// Handle image upload
async function handleImageUpload(event) {
  const file = event.target.files[0]
  if (!file) return

  const formData = new FormData()
  formData.append('image', file)
  formData.append('title', form.value.title)
  formData.append('description', form.value.description)
  formData.append('date', form.value.date)
  formData.append('slug', form.value.slug)
  formData.append('body', form.value.body)

  if (editingPost.value) {
    formData.append('id', editingPost.value.id.toString())
  }

  try {
    const response = await fetch('/api/blog', {
      method: editingPost.value ? 'PUT' : 'POST',
      body: formData
    })

    const result = await response.json()
    if (result.image) {
      form.value.image = result.image
    }
    
    showMessage('Image uploaded successfully')
  } catch (error) {
    showMessage('Error uploading image', true)
  }

  // Clear the file input
  event.target.value = ''
}

// Save post
async function savePost() {
  if (!form.value.title || !form.value.body || !form.value.date || !form.value.slug) {
    showMessage('Please fill in all required fields', true)
    return
  }

  try {
    const formData = new FormData()
    formData.append('title', form.value.title)
    formData.append('description', form.value.description || '')
    formData.append('date', form.value.date)
    formData.append('slug', form.value.slug)
    formData.append('body', form.value.body)
    
    if (form.value.image) {
      formData.append('image', form.value.image)
    }

    const response = await fetch('/api/blog', {
      method: editingPost.value ? 'PUT' : 'POST',
      body: formData
    })

    if (!response.ok) {
      throw new Error('Server error')
    }

    await loadPosts()
    showMessage(editingPost.value ? 'Post updated successfully' : 'Post created successfully')
    resetForm()
  } catch (error) {
    showMessage('Error saving post', true)
  }
}

// Edit post
function editPost(post) {
  editingPost.value = post
  form.value = {
    title: post.title,
    description: post.description || '',
    image: post.image || '',
    date: new Date(post.date).toISOString().slice(0, 10),
    slug: post.slug,
    body: post.body
  }
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

// Cancel edit
function cancelEdit() {
  editingPost.value = null
  resetForm()
}

// Reset form
function resetForm() {
  editingPost.value = null
  form.value = {
    title: '',
    description: '',
    image: '',
    date: new Date().toISOString().slice(0, 10),
    slug: '',
    body: ''
  }
}

// Confirm delete
function confirmDelete(post) {
  deleteTarget.value = post
  showDeleteModal.value = true
}

// Delete post
async function deletePost() {
  if (!deleteTarget.value) return

  try {
    await $fetch(`/api/blog/${deleteTarget.value.slug}`, {
      method: 'DELETE'
    })

    await loadPosts()
    showDeleteModal.value = false
    deleteTarget.value = null
    showMessage('Blog post deleted successfully')
  } catch (error) {
    showMessage('Error deleting blog post', true)
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
