import { ref, watch } from 'vue'

const THEME_KEY = 'weather-theme'
const isDark = ref(false)

const applyTheme = (dark) => {
  document.documentElement.classList.toggle('dark', dark)
}

const loadTheme = () => {
  const dark = localStorage.getItem(THEME_KEY)
  isDark.value = dark ? JSON.parse(dark) : false
  applyTheme(isDark.value)
}

const toggleDark = () => {
  isDark.value = !isDark.value
}

watch(isDark, (newValue) => {
  localStorage.setItem(THEME_KEY, JSON.stringify(newValue))
  applyTheme(newValue)
})

loadTheme()

export function useDarkMode() {
  return { isDark, toggleDark }
}
