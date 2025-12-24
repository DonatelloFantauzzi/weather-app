import { ref, watch } from 'vue'

const STORAGE_KEY = 'weather-favorites'
const MAX_FAVORITES = 5

const favorites = ref([])

const loadFavorites = () => {
  const stored = localStorage.getItem(STORAGE_KEY)
  favorites.value = stored ? JSON.parse(stored) : []
}

const addFavorite = (city) => {
  if (favorites.value.length >= MAX_FAVORITES) return false
  if (favorites.value.includes(city)) return false

  favorites.value.push(city)
  return true
}

const removeFavorite = (city) => {
  favorites.value = favorites.value.filter((item) => item !== city)
}

const isFavorite = (city) => {
  return favorites.value.includes(city)
}

watch(
  favorites,
  (newValue) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newValue))
  },
  { deep: true },
)

// Load all'avvio
loadFavorites()

export function useFavorites() {
  return {
    favorites,
    addFavorite,
    removeFavorite,
    isFavorite,
  }
}
