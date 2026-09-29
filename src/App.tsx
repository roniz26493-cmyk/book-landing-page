import { useEffect } from 'react'
import { bookConfig } from './data/bookConfig'
import { applyBrandColors } from './lib/applyBrandColors'
import { AboutAuthor } from './components/AboutAuthor'
import { AboutBook } from './components/AboutBook'
import { Faq } from './components/Faq'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { Peek } from './components/Peek'
import { Purchase } from './components/Purchase'
import { ReaderHighlights } from './components/ReaderHighlights'
import { StickyWhatsApp } from './components/StickyWhatsApp'

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
        <Hero />
        <AboutBook />
        <ReaderHighlights />
        <Peek />
        <AboutAuthor />
        <Purchase />
        <Faq />
      </main>

      <Footer />
      <StickyWhatsApp />
    </>
  )
}
