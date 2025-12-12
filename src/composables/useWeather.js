import { ref } from 'vue'
import axios from 'axios'

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY
const BASE_URL = 'https://api.openweathermap.org/data/2.5'

const showForecast = ref(false)

const api = axios.create({
  baseURL: BASE_URL,
  params: {
    appid: API_KEY,
    units: 'metric',
    lang: 'it',
  },
})
//dati della città in quel giorno
const weatherData = ref(null)
const loading = ref(false)
const error = ref(null)

//dati della città per i prossimi 5 giorni
const forecastData = ref(null)
const forecastLoading = ref(false)
const forecastError = ref(null)

//funzione che richiama i dati meteo per la città selzionata
const fetchCurrentWeather = async (city) => {
  //settiamo il loading a true
  loading.value = true
  //settiamo l'errore a null prima di ogni chiamata
  error.value = null

  //settiamo i valori di forecast nel valore di default
  forecastData.value = null
  showForecast.value = false
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

//funzione meteo che richiama i dati per i prossimi 5 giorni per la città selezionata
const fetchForecast = async (city) => {
  //settiamo il loading su true
  forecastLoading.value = true
  //settiamo l'errore su null prima della chiamata
  forecastError.value = null

  try {
    const response = await api.get('/forecast', { params: { q: city } })
    forecastData.value = response.data
  } catch (err) {
    if (err.response) {
      err.response.status === 404
        ? (forecastError.value = 'Città non trovata')
        : (forecastError.value = 'Errore imprevisto nella chiamata')
    } else if (err.request) {
      forecastError.value = 'Errore di Network'
    } else {
      forecastError.value = 'Errore imprevisto'
    }
  } finally {
    forecastLoading.value = false
  }
}

export function useWeather() {
  return {
    showForecast,
    weatherData,
    loading,
    error,
    fetchCurrentWeather,
    forecastData,
    forecastLoading,
    forecastError,
    fetchForecast,
  }
}
