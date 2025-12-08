<script setup>
import SearchBar from './components/SearchBar.vue'
import CurrentWeather from './components/CurrentWeather.vue'
</script>

<template>
  <div class="min-h-screen bg-gray-100 py-8 px-4">
    <h1 class="text-4xl font-bold text-center mb-8 text-gray-800">☀️ Weather App</h1>
    <SearchBar />
    <CurrentWeather />
  </div>
</template>
