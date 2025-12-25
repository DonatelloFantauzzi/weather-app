<script setup>
defineProps({
  size: {
    type: String,
    default: 'md', // 'sm', 'md', 'lg'
  },
})

const sizeClasses = {
  sm: 'w-4 h-4 border-2',
  md: 'w-8 h-8 border-3',
  lg: 'w-12 h-12 border-4',
}
</script>

<template>
  <div
    :class="[
      'animate-spin rounded-full',
      'border-blue-500 border-t-transparent',
      sizeClasses[size],
    ]"
    role="status"
    aria-label="Loading"
  />
</template>
