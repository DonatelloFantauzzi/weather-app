<script setup>
import { ref } from 'vue'
import { useWeather } from '../composables/useWeather'

//destrutturo il composable useWeather
const { fetchCurrentWeather } = useWeather()

//ref pe l'input
const searchInput = ref('')

//funzione per cercare
const handleSearch = () => {
  if (!searchInput.value.trim()) return
  fetchCurrentWeather(searchInput.value)
  searchInput.value = ''
}
</script>

<template>
  <div class="w-full max-w-md mx-auto">
    <div class="flex gap-2">
      <input
        @keyup.enter="handleSearch"
        type="text"
        v-model="searchInput"
        placeholder="Cerca città... (es: Rome, Milan)"
        class="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        @click="handleSearch"
        class="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
      >
        Cerca
      </button>
    </div>
  </div>
</template>
