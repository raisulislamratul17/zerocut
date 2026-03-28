'use client'

import { createContext, useContext, useState, useCallback, useMemo, useSyncExternalStore } from 'react'

type Theme = 'light' | 'dark'

interface ThemeContextType {
  theme: Theme
  toggleTheme: () => void
  mounted: boolean
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

// Subscribe to theme changes
let themeListeners: Array<() => void> = []
let currentTheme: Theme = 'dark'

function subscribe(listener: () => void) {
  themeListeners.push(listener)
  return () => {
    themeListeners = themeListeners.filter(l => l !== listener)
  }
}

function getSnapshot(): Theme {
  return currentTheme
}

function getServerSnapshot(): Theme {
  return 'dark'
}

function setThemeValue(newTheme: Theme): void {
  currentTheme = newTheme
  localStorage.setItem('zerocut-theme', newTheme)
  
  // Apply to DOM
  document.documentElement.setAttribute('data-theme', newTheme)
  document.documentElement.classList.remove('light', 'dark')
  document.documentElement.classList.add(newTheme)
  
  // Notify listeners
  themeListeners.forEach(listener => listener())
}

// Initialize theme
if (typeof window !== 'undefined') {
  const savedTheme = localStorage.getItem('zerocut-theme') as Theme | null
  currentTheme = savedTheme || 'dark'
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
  
  const toggleTheme = useCallback(() => {
    setThemeValue(theme === 'light' ? 'dark' : 'light')
  }, [theme])

  const value = useMemo(() => ({ 
    theme, 
    toggleTheme, 
    mounted: true // Always mounted on client
  }), [theme, toggleTheme])

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}
