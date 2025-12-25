# ☀️ Weather App

A modern, feature-rich weather application built with Vue 3, featuring real-time weather data, 5-day forecasts, and a beautiful dark mode interface.

![Weather App Banner](./docs/banner.png)

<!-- Screenshot placeholder - aggiungi screenshot reale -->

## ✨ Features

### Core Functionality

- 🔍 **City Search** - Search weather for any city worldwide
- 🌤️ **Current Weather** - Real-time temperature, humidity, wind speed, and conditions
- 📅 **5-Day Forecast** - Daily weather predictions with min/max temperatures
- 🌍 **OpenWeather API Integration** - Accurate, up-to-date weather data

### User Experience

- ⭐ **Favorites System** - Save up to 5 favorite cities for quick access
- 🌙 **Dark Mode** - Fully themed dark/light mode with persistence
- 💾 **localStorage Persistence** - Favorites and theme preferences saved locally
- ✨ **Smooth Animations** - Polished transitions and loading states
- 📱 **Responsive Design** - Works seamlessly on desktop and mobile

### Technical Highlights

- 🔄 **Loading States** - Professional spinner and skeleton screens
- ⚠️ **Error Handling** - Comprehensive error management (404, network errors, rate limits)
- 🎨 **Weather Icons** - Real weather condition icons from OpenWeather
- 🚀 **Performance** - Lazy loading forecasts, debounced search
- ♿ **Accessibility** - Semantic HTML, ARIA labels, keyboard navigation

## 🛠️ Tech Stack

### Frontend Framework

- **Vue 3** (Composition API)
- **Vite** - Fast build tool and dev server

### Styling

- **Tailwind CSS v4** - Utility-first CSS framework
- **Custom animations** - Smooth transitions and micro-interactions

### State Management & Logic

- **Composables Pattern** - Reusable logic with Vue Composition API
- **Singleton Pattern** - Centralized state management

### HTTP Client

- **Axios** - Promise-based HTTP client for API calls

### External APIs

- **OpenWeather API** - Weather data provider (free tier)

### Testing

- **Vitest** - Fast unit testing framework
- **Testing coverage** for composables and utilities

### Tools & Libraries

- **ESLint** - Code linting
- **Prettier** - Code formatting

## 📦 Project Structure

```
weather-app/
├── src/
│   ├── components/
│   │   ├── SearchBar.vue           # City search input
│   │   ├── CurrentWeather.vue      # Current weather display
│   │   ├── FavoritesList.vue       # Saved cities list
│   │   └── LoadingSpinner.vue      # Reusable spinner
│   ├── composables/
│   │   ├── useWeather.js           # Weather API logic
│   │   ├── useFavorites.js         # Favorites management
│   │   ├── useDarkMode.js          # Theme switching
│   │   └── *.test.js               # Unit tests
│   ├── assets/
│   │   └── main.css                # Global styles + Tailwind
│   ├── App.vue                     # Root component
│   └── main.js                     # App entry point
├── public/                         # Static assets
├── .env                            # Environment variables (not in repo)
├── .gitignore
├── package.json
├── vite.config.js
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 18.x
- **npm** ≥ 9.x
- **OpenWeather API Key** (free at [openweathermap.org](https://openweathermap.org/api))

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/DonatelloFantauzzi/weather-app.git
cd weather-app
```

2. **Install dependencies**

```bash
npm install
```

3. **Set up environment variables**

Create a `.env` file in the root directory:

```env
VITE_OPENWEATHER_API_KEY=your_api_key_here
```

> **Note:** Get your free API key at [OpenWeather](https://openweathermap.org/api). It takes ~10-15 minutes to activate.

4. **Run development server**

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
```

The optimized build will be in the `dist/` folder.

### Run Tests

```bash
npm run test
```

## 🎨 Features Showcase

### Search & Current Weather

![Current Weather](./docs/current-weather.png)

<!-- Screenshot placeholder -->

### 5-Day Forecast

![Forecast](./docs/forecast.png)

<!-- Screenshot placeholder -->

### Favorites Management

![Favorites](./docs/favorites.png)

<!-- Screenshot placeholder -->

### Dark Mode

![Dark Mode](./docs/dark-mode.png)

<!-- Screenshot placeholder -->

## 🧪 Testing

The project includes unit tests for composables:

- ✅ `useFavorites` - Add/remove favorites, max limit, duplicates
- ✅ `useWeather` - API calls, error handling (coming soon)
- ✅ Utility functions (if any)

Run tests with:

```bash
npm run test          # Run once
npm run test:watch    # Watch mode
npm run test:ui       # UI mode (if installed)
```

## 📝 Environment Variables

| Variable                   | Description              | Required |
| -------------------------- | ------------------------ | -------- |
| `VITE_OPENWEATHER_API_KEY` | Your OpenWeather API key | Yes      |

## 🐛 Known Issues / Limitations

- Free tier OpenWeather API: 60 calls/minute limit
- Forecast limited to 5 days (API restriction)
- Some cities require country code (e.g., "Paris,FR")

## 🚀 Future Enhancements

- [ ] Geolocation auto-detect
- [ ] Temperature unit toggle (°C / °F)
- [ ] Extended 7-day forecast (paid tier)
- [ ] Air quality index
- [ ] Weather alerts/warnings
- [ ] Multiple language support
- [ ] PWA support (offline mode)

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Weather data provided by [OpenWeather API](https://openweathermap.org/)
- Icons from [OpenWeather](https://openweathermap.org/weather-conditions)
- Built with [Vue.js](https://vuejs.org/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)

## 👤 Author

**Your Name**

- GitHub: [@DonatelloFantauzzi](https://github.com/DonatelloFantauzzi)
- Portfolio: [your-portfolio.com](https://your-portfolio.com)

---

⭐ If you found this project helpful, please give it a star!
