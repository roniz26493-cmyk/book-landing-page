import { useEffect } from 'react'
import { bookConfig } from './data/bookConfig'
import { applyBrandColors } from './lib/applyBrandColors'
import { AboutAuthor } from './components/AboutAuthor'
import { AboutBook } from './components/AboutBook'
import { BookInWorld } from './components/BookInWorld'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { Peek } from './components/Peek'
import { PrimaryCta } from './components/PrimaryCta'
import { Purchase } from './components/Purchase'
import { StickyBook } from './components/StickyBook'

export default function App() {
  // הפלטה מהקונפיג נכתבת כמשתני CSS על :root
  useEffect(() => {
    applyBrandColors(bookConfig.brand.colors)

    if (import.meta.env.DEV && bookConfig.brand.isPlaceholderPalette) {
      console.info(
        '[bookConfig] הפלטה הנוכחית זמנית. להחלפה: brand.colors בקובץ src/data/bookConfig.ts',
      )
    }
  }, [])

  return (
    <>
      <a className="skipLink" href="#main">
        דילוג לתוכן הראשי
      </a>

      <Header />

      <main id="main">
        {/* ספר → רכישה → הספר בעולם → תגובות → הסופר → הספר → רכישה.
            "מה מחכה לקוראים" ו"שאלות נפוצות" הוצאו מהעמוד (הרכיבים נשמרו).
            "הצצה" מוסתרת דרך peek.enabled בקונפיג. */}
        <Hero />
        <PrimaryCta />
        <BookInWorld />
        <AboutAuthor />
        <AboutBook />
        <Peek />
        <Purchase />
      </main>

      <Footer />
      <StickyBook />
    </>
  )
}
