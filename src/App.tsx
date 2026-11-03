import { useEffect } from 'react'
import { bookConfig } from './data/bookConfig'
import { applyBrandColors } from './lib/applyBrandColors'
import { AboutAuthor } from './components/AboutAuthor'
import { AboutBook } from './components/AboutBook'
import { Closing } from './components/Closing'
import { Hero } from './components/Hero'
import { ScrapStrip } from './components/ScrapStrip'
import { StickyCta } from './components/StickyCta'

export default function App() {
  // הפלטה מהקונפיג נכתבת כמשתני CSS על :root
  useEffect(() => {
    applyBrandColors(bookConfig.brand.colors)
  }, [])

  return (
    <div className="page">
      <a className="skipLink" href="#main">
        דילוג לתוכן הראשי
      </a>

      {/* עמוד אחד רציף, בלי תפריט: פתיחה → גזרי נייר → על הספר → על הסופר → סיום */}
      <main id="main">
        <Hero />
        <ScrapStrip />
        <AboutBook />
        <AboutAuthor />
        <Closing />
      </main>

      <StickyCta />
    </div>
  )
}
