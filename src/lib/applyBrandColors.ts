import type { BrandColors } from '../types/book'

/**
 * מיפוי בין שדות הפלטה בקונפיג לבין משתני ה-CSS.
 * כך אפשר לשנות את כל צבעי האתר ממקום אחד: brand.colors ב-bookConfig.ts
 * (הערכים ב-src/styles/tokens.css משמשים כ-fallback).
 */
const CSS_VAR_BY_KEY: Record<keyof BrandColors, string> = {
  primary: '--color-primary',
  primarySoft: '--color-primary-soft',
  secondary: '--color-secondary',
  background: '--color-bg',
  backgroundAlt: '--color-bg-alt',
  surface: '--color-surface',
  text: '--color-text',
  textMuted: '--color-text-muted',
  accent: '--color-accent',
  accentStrong: '--color-accent-strong',
}

export function applyBrandColors(colors: BrandColors): void {
  const root = document.documentElement

  for (const [key, cssVar] of Object.entries(CSS_VAR_BY_KEY)) {
    const value = colors[key as keyof BrandColors]
    if (value) root.style.setProperty(cssVar, value)
  }

  // שמירת התאמה בין צבע ה-theme של הדפדפן לצבע הראשי
  document
    .querySelector('meta[name="theme-color"]')
    ?.setAttribute('content', colors.primary)
}
