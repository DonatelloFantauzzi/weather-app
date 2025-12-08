import { ref } from 'vue'
import axios from 'axios'

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY
const BASE_URL = 'https://api.openweathermap.org/data/2.5'

const api = axios.create({
  baseURL: BASE_URL,
  params: {
    appid: API_KEY,
    units: 'metric',
    lang: 'it',
  },
})

const weatherData = ref(null)
const loading = ref(false)
const error = ref(null)

const fetchCurrentWeather = async (city) => {
  //settiamo il loading a true
  loading.value = true
  //settiamo l'errore a null prima di ogni chiamata
  error.value = null
  //blocco try-catch
  try {
    const response = await api.get('/weather', { params: { q: city } })
    weatherData.value = response.data
  } catch (err) {
    if (err.response) {
      err.response.status === 404
        ? (error.value = 'Città non trovata')
        : (error.value = 'Errore imprevisto nella chiamata')
    } else if (err.request) {
      error.value = 'Errore di Network'
    } else {
      error.value = 'Errore imprevisto'
    }
  } finally {
    loading.value = false
  }
}

export function useWeather() {
  return {
    weatherData,
    loading,
    error,
    fetchCurrentWeather,
  }
}
