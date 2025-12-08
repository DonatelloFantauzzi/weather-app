<script setup>
import { useWeather } from './composables/useWeather'
const { weatherData, loading, error, fetchCurrentWeather } = useWeather()

fetchCurrentWeather('non esiste')
</script>

<template>
  <div>
    <h1>Weather App - Test Console</h1>
    <p v-if="loading">Loading...</p>
    <p v-if="error">Error: {{ error }}</p>
    <pre v-if="weatherData">{{ weatherData }}</pre>
  </div>
</template>
