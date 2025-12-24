<script setup>
import SearchBar from './components/SearchBar.vue'
import CurrentWeather from './components/CurrentWeather.vue'
import FavoritesList from './components/FavoritesList.vue'
import { useDarkMode } from './composables/useDarkMode'

const { isDark, toggleDark } = useDarkMode()
</script>

<template>
  <div class="min-h-screen bg-gray-100 dark:bg-gray-800 py-8 px-4 transition-colors duration-300">
    <div class="flex items-center justify-between max-w-4xl mx-auto mb-8">
      <h1 class="text-4xl font-bold text-gray-800 dark:text-white">☀️ Weather App</h1>

      <button
        @click="toggleDark"
        class="p-3 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
        :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
      >
        <span class="text-2xl">{{ isDark ? '☀️' : '🌙' }}</span>
      </button>
    </div>
    <SearchBar />
    <CurrentWeather />
    <FavoritesList />
  </div>
</template>
