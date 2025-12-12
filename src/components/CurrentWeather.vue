<script setup>
import { useWeather } from '../composables/useWeather'
const {
  forecastData,
  forecastError,
  forecastLoading,
  fetchForecast,
  showForecast,
  weatherData,
  loading,
  error,
} = useWeather()

//funzione toggle
const toggleForecast = async () => {
  if (!showForecast.value) {
    if (!forecastData.value) {
      await fetchForecast(weatherData.value.name)
    }

    showForecast.value = true
  } else {
    showForecast.value = false
  }
}
</script>

<template>
  <div class="w-full max-w-md mx-auto mt-8">
    <!-- LOADING STATE -->
    <div v-if="loading" class="bg-white rounded-lg shadow-lg p-6">
      <div class="animate-pulse">
        <div class="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
        <div class="h-16 bg-gray-200 rounded mb-4"></div>
        <div class="h-4 bg-gray-200 rounded w-1/2"></div>
      </div>
    </div>

    <!-- ERROR STATE -->
    <div v-else-if="error" class="bg-red-50 border border-red-200 rounded-lg p-6">
      <p class="text-red-600 text-center">{{ error }}</p>
    </div>

    <!-- EMPTY STATE -->
    <div v-else-if="!weatherData" class="bg-gray-50 rounded-lg p-8 text-center">
      <p class="text-gray-500">🔍 Cerca una città per vedere il meteo</p>
    </div>

    <div
      v-else
      class="bg-linear-to-br from-blue-400 to-blue-600 rounded-lg shadow-lg p-6 text-white"
    >
      <!-- Città -->
      <h2 class="text-3xl font-bold mb-2">
        <!-- TODO: mostra weatherData.name -->
        {{ weatherData.name }}
      </h2>

      <!-- Temperatura -->
      <div class="text-6xl font-bold my-4">
        <!-- TODO: mostra weatherData.main.temp con Math.round() -->
        {{ Math.round(weatherData.main.temp) }} °C
        <!-- Aggiungi °C -->
      </div>

      <!-- Descrizione -->
      <p class="text-xl mb-6 capitalize">
        <!-- TODO: mostra weatherData.weather[0].description -->
        {{ weatherData.weather[0].description }}
      </p>

      <!-- Dettagli (Umidità + Vento) -->
      <div class="flex justify-between text-sm">
        <div>
          <p class="text-blue-100">Umidità</p>
          <p class="text-lg font-semibold">
            <!-- TODO: mostra weatherData.main.humidity + % -->
            {{ weatherData.main.humidity }} %
          </p>
        </div>
        <div>
          <p class="text-blue-100">Vento</p>
          <p class="text-lg font-semibold">
            <!-- TODO: mostra weatherData.wind.speed + km/h -->
            {{ weatherData.wind.speed }} km/h
          </p>
        </div>
      </div>

      <button
        @click="toggleForecast"
        :disabled="forecastLoading"
        class="w-full mt-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <span v-if="forecastLoading">Caricamento...</span>
        <span v-else> {{ showForecast ? '🔼 Nascondi' : '📅 Mostra' }} Previsioni 5 Giorni </span>
      </button>
    </div>
  </div>
</template>
