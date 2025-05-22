<template>
  <button 
    class="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background"
    :class="[
      variant === 'default' && 'bg-primary text-primary-foreground hover:bg-primary/90',
      variant === 'ghost' && 'hover:bg-accent hover:text-accent-foreground',
      size === 'default' && 'h-10 py-2 px-4',
      size === 'icon' && 'h-10 w-10'
    ]"
  >
    <slot />
  </button>
</template>

<script setup>
defineProps({
  variant: {
    type: String,
    default: 'default'
  },
  size: {
    type: String,
    default: 'default'
  }
})
</script>
