<script setup>
import { ref, computed } from 'vue'
import { useWeather } from '../composables/useWeather'
import { useFavorites } from '@/composables/useFavorites'
import LoadingSpinner from './LoadingSpinner.vue'
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
const { favorites, addFavorite, removeFavorite, isFavorite } = useFavorites()

//Ref
const showMaxError = ref(false)

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

let favoriteTimeout = null
const handleToggleFavorite = () => {
  if (favoriteTimeout) clearTimeout(favoriteTimeout)

  const cityName = weatherData.value.name

  if (isFavorite(cityName)) {
    removeFavorite(cityName)
    showMaxError.value = false
  } else {
    const success = addFavorite(cityName)
    if (success) {
      showMaxError.value = false
    } else {
      showMaxError.value = true
      favoriteTimeout = setTimeout(() => {
        showMaxError.value = false
      }, 5000)
    }
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

  return daily.slice(1, 6) // Placeholder
})
</script>

<template>
  <div class="w-full max-w-md mx-auto mt-8">
    <!-- LOADING STATE -->
    <div v-if="loading" class="bg-white dark:bg-gray-700 rounded-lg shadow-lg p-6">
      <div class="flex flex-col items-center justify-center space-y-4">
        <LoadingSpinner size="lg" />
        <p class="text-gray-500 dark:text-gray-400">Caricamento meteo...</p>
      </div>
    </div>

    <!-- ERROR STATE -->
    <div
      v-else-if="error"
      class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6"
    >
      <p class="text-red-600 dark:text-red-400 text-center">{{ error }}</p>
    </div>

    <!-- EMPTY STATE -->
    <div v-else-if="!weatherData" class="bg-gray-50 dark:bg-gray-700 rounded-lg p-8 text-center">
      <p class="text-gray-500 dark:text-gray-400">🔍 Cerca una città per vedere il meteo</p>
    </div>

    <Transition>
      <div
        v-if="weatherData"
        class="bg-linear-to-br from-blue-400 to-blue-600 dark:from-blue-600 dark:to-blue-800 rounded-lg shadow-lg p-6 text-white"
      >
        <!-- Città -->
        <h2 class="text-3xl font-bold mb-2">
          <!-- TODO: mostra weatherData.name -->
          {{ weatherData.name }}
        </h2>

        <img
          :src="`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`"
          :alt="weatherData.weather[0].description"
          class="w-24 h-24 mx-auto drop-shadow-lg"
        />

        <!-- Temperatura -->
        <div class="text-6xl font-bold my-4">{{ Math.round(weatherData.main.temp) }} °C</div>

        <!-- Descrizione -->
        <p class="text-xl mb-6 capitalize">
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

        <!-- Bottone previsione per 5 giorni -->
        <button
          @click="toggleForecast"
          :disabled="forecastLoading"
          class="active:scale-95 transform transition-transform w-full mt-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span v-if="forecastLoading">Caricamento...</span>
          <span v-else> {{ showForecast ? '🔼 Nascondi' : '📅 Mostra' }} Previsioni 5 Giorni </span>
        </button>

        <!-- Bottone salva/rimuovi preferiti -->
        <button
          @click="handleToggleFavorite"
          class="active:scale-95 transform transition-transform w-full mt-2 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
        >
          {{ isFavorite(weatherData.name) ? '⭐ Rimuovi dai' : '☆ Aggiungi ai' }} preferiti
        </button>

        <!-- Messaggio errore max -->
        <p
          v-if="showMaxError"
          class="text-sm text-yellow-200 dark:text-yellow-300 mt-2 text-center"
        >
          ⚠️ Massimo 5 città raggiunte. Rimuovi una città per aggiungerne altre.
        </p>
      </div>
    </Transition>
    <TransitionGroup>
      <div v-if="showForecast && forecastData" class="mt-4 space-y-3">
        <!-- Loading forecast -->
        <div
          v-if="forecastLoading"
          class="bg-white dark:bg-gray-700 rounded-lg shadow p-4 text-center"
        >
          <div class="flex items-center justify-center space-x-3">
            <LoadingSpinner size="sm" />
            <p class="text-gray-500 dark:text-gray-400">Caricamento previsioni...</p>
          </div>
        </div>

        <!-- Error forecast -->
        <div
          v-else-if="forecastError"
          class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4"
        >
          <p class="text-red-600 dark:text-red-400">{{ forecastError }}</p>
        </div>

        <!-- Forecast cards (TU COMPLETI) -->
        <div v-else>
          <!-- TODO: v-for su dailyForecast -->
          <!-- Ogni card mostra: date, icon, description, tempMin-tempMax -->
          <div
            v-for="(day, index) in dailyForecast"
            :key="day.date"
            :style="{ transitionDelay: `${index * 50}ms` }"
            class="bg-white dark:bg-gray-700 rounded-lg hover:shadow-md transition-shadow shadow p-4 flex items-center justify-between mb-4"
          >
            <!-- Sinistra: Data + Descrizione -->
            <div>
              <p class="font-semibold text-gray-700 dark:text-white">{{ day.date }}</p>
              <p class="text-sm text-gray-600 dark:text-gray-400 capitalize">
                {{ day.description }}
              </p>
            </div>

            <!-- Centro: Icona (per ora emoji placeholder) -->
            <div class="text-3xl">
              <img
                :src="`https://openweathermap.org/img/wn/${day.icon}@2x.png`"
                :alt="day.description"
                class="w-12 h-12"
              />
              <!-- TODO: icona dinamica dopo -->
            </div>

            <!-- Destra: Temperature -->
            <div class="text-right">
              <p class="text-lg font-semibold text-gray-700 dark:text-white">
                {{ Math.round(day.tempMax) }}°C
              </p>
              <p class="text-sm text-gray-500 dark:text-gray-400">
                Min: {{ Math.round(day.tempMin) }}°C
              </p>
            </div>
          </div>
        </div>
      </div>
    </TransitionGroup>
  </div>
</template>
