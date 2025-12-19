<script setup>
import { computed } from 'vue'
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

//Computed
const dailyForecast = computed(() => {
  if (!forecastData.value) return []

  const list = forecastData.value.list
  const grouped = {}

  list.forEach((item) => {
    const date = item.dt_txt.split(' ')[0]
    if (!grouped[date]) grouped[date] = []
    grouped[date].push(item)
  })

  const daily = Object.keys(grouped).map((date) => {
    const dayData = grouped[date]

    const temps = dayData.map((item) => item.main.temp)
    const tempMin = Math.min(...temps)
    const tempMax = Math.max(...temps)
    const dateObj = new Date(date)
    const formattedDate = dateObj.toLocaleDateString('it-IT', {
      weekday: 'short', // "Mer"
      day: 'numeric', // "11"
    })
    const noonDay = dayData.find((item) => item.dt_txt.includes('12:00:00')) || dayData[0]
    const icon = noonDay.weather[0].icon
    const description = noonDay.weather[0].description

    return {
      date: formattedDate,
      icon,
      tempMax,
      tempMin,
      description,
    }
  })

  return daily.slice(0, 5) // Placeholder
})
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
    <div v-if="showForecast && forecastData" class="mt-4 space-y-3">
      <!-- Loading forecast -->
      <div v-if="forecastLoading" class="bg-white rounded-lg shadow p-4 text-center text-gray-500">
        Caricamento previsioni...
      </div>

      <!-- Error forecast -->
      <div v-else-if="forecastError" class="bg-red-50 border border-red-200 rounded-lg p-4">
        <p class="text-red-600">{{ forecastError }}</p>
      </div>

      <!-- Forecast cards (TU COMPLETI) -->
      <div v-else>
        <!-- TODO: v-for su dailyForecast -->
        <!-- Ogni card mostra: date, icon, description, tempMin-tempMax -->
        <div
          v-for="day in dailyForecast"
          :key="day.date"
          class="bg-white rounded-lg shadow p-4 flex items-center justify-between"
        >
          <!-- Sinistra: Data + Descrizione -->
          <div>
            <p class="font-semibold text-gray-800">{{ day.date }}</p>
            <p class="text-sm text-gray-600 capitalize">{{ day.description }}</p>
          </div>

          <!-- Centro: Icona (per ora emoji placeholder) -->
          <div class="text-3xl">
            ☁️
            <!-- TODO: icona dinamica dopo -->
          </div>

          <!-- Destra: Temperature -->
          <div class="text-right">
            <p class="text-lg font-semibold text-gray-800">{{ Math.round(day.tempMax) }}°C</p>
            <p class="text-sm text-gray-500">Min: {{ Math.round(day.tempMin) }}°C</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
