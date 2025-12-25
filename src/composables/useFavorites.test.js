import { describe, it, expect, beforeEach } from 'vitest'
import { useFavorites } from './useFavorites'

// Mock localStorage
const localStorageMock = (() => {
  let store = {}
  return {
    getItem: (key) => store[key] || null,
    setItem: (key, value) => {
      store[key] = value
    },
    clear: () => {
      store = {}
    },
  }
})()

global.localStorage = localStorageMock

describe('useFavorites', () => {
  beforeEach(() => {
    localStorage.clear()
    const { favorites } = useFavorites()
    favorites.value = [] // Reset state
  })

  it('should return true when city is in favorites', () => {
    // ARRANGE - Prepara
    // TODO: destruttura useFavorites
    const { addFavorite, isFavorite } = useFavorites()
    // TODO: aggiungi 'Rome' ai favorites
    addFavorite('Roma')
    // ACT - Agisci
    // TODO: chiama isFavorite('Rome')
    const result = isFavorite('Roma')
    // ASSERT - Verifica
    // TODO: expect(result).toBe(???)
    expect(result).toBe(true)
  })

  it('should return false when city is not in favorites and favorites is empty', () => {
    const { isFavorite } = useFavorites()

    const result = isFavorite('Milano')
    expect(result).toBe(false)
  })

  it('should return false when city is not in favorites and favorites is not empty', () => {
    // TODO: Opzione B (altre città presenti)
    const { isFavorite, addFavorite } = useFavorites()
    addFavorite('Bologna')
    const result = isFavorite('Milano')
    expect(result).toBe(false)
  })

  it('should add a city to favorites successfully', () => {
    const { isFavorite, addFavorite, favorites } = useFavorites()
    addFavorite('Roma')
    const result = isFavorite('Roma')
    expect(result).toBe(true)
    expect(favorites.value.length).toBe(1)
    expect(favorites.value.includes('Roma')).toBe(true)
    expect(favorites.value[0]).toBe('Roma')
  })
  it('should return false when adding duplicate city', () => {
    const { addFavorite, favorites, isFavorite } = useFavorites()
    // ARRANGE
    addFavorite('Roma')
    const result = addFavorite('Roma')

    expect(result).toBe(false)
    expect(favorites.value.length).toBe(1)
  })

  it('should return false when max limit (5) is reached', () => {
    // ARRANGE
    const { addFavorite, favorites } = useFavorites()
    // TODO: aggiungi 5 città (scegli tu: manuale, loop, o diretta)
    addFavorite('Rome')
    addFavorite('Milan')
    addFavorite('Paris')
    addFavorite('Berlin')
    addFavorite('Madrid')

    const result = addFavorite('Avezzano')

    expect(result).toBe(false)
    expect(favorites.value.length).toBe(5)
  })
})
