<script setup>
import { useFavorites } from '@/composables/useFavorites'
import { useWeather } from '@/composables/useWeather'

const { favorites, removeFavorite } = useFavorites()
const { fetchCurrentWeather } = useWeather()

// TODO: funzione handleCityClick(city)
const handleCityClick = (city) => {
  fetchCurrentWeather(city)
}

// TODO: funzione handleRemove(city)
const handleRemove = (city) => {
  removeFavorite(city)
}
</script>

<template>
  <div class="w-full max-w-md mx-auto mt-4">
    <!-- Header -->
    <h3 class="text-sm font-semibold text-gray-700 dark:text-gray-400 mb-2">⭐ Città Preferite</h3>

    <!-- Empty state -->
    <div
      v-if="favorites.length === 0"
      class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 text-center"
    >
      <p class="text-gray-500 dark:text-gray-400 text-sm">Nessuna città salvata</p>
    </div>

    <!-- Lista favorites -->
    <div v-else class="space-y-2">
      <!-- bisogna fare un for per i nomi delle città presenti nell'array -->
      <div
        v-for="city in favorites"
        :key="city"
        class="bg-white dark:bg-gray-700 rounded-lg shadow p-3 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
      >
        <!-- Nome città (cliccabile) -->
        <!-- la città deve essere cliccabile -->
        <button
          @click="handleCityClick(city)"
          class="flex-1 text-left font-medium text-gray-800 dark:text-white hover:text-blue-600 dark:hover:text-blue-400"
        >
          {{ city }}
        </button>

        <!-- Bottone rimuovi -->
        <button
          @click="handleRemove(city)"
          class="text-red-500 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 p-2"
          title="Rimuovi dai preferiti"
        >
          🗑️
        </button>
      </div>
    </div>
  </div>
</template>
