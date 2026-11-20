import { useEffect } from 'react'
import { bookConfig } from './data/bookConfig'
import { applyBrandColors } from './lib/applyBrandColors'
import { useScrollReveal } from './hooks/useScrollReveal'
import { AboutAuthor } from './components/AboutAuthor'
import { AboutBook } from './components/AboutBook'
import { Footer } from './components/Footer'
import { Hero } from './components/Hero'
import { Purchase } from './components/Purchase'
import { BookAroundWorld } from './components/BookAroundWorld'
import { Stats } from './components/Stats'
import { Statement } from './components/Statement'
import { StickyCta } from './components/StickyCta'
import { Summary } from './components/Summary'
import { Testimonials } from './components/Testimonials'

export default function App() {
  // הפלטה מהקונפיג נכתבת כמשתני CSS על :root
  useEffect(() => {
    applyBrandColors(bookConfig.brand.colors)
  }, [])

  // חשיפה בגלילה (data-reveal) — לא בפתיחה (שיש לה כניסה משלה), לא בדיוקן הסופר ולא בכפתור הצף
  useScrollReveal()

  return (
    <div className="page">
      <a className="skipLink" href="#main">
        דילוג לתוכן הראשי
      </a>

      {/* 13 המקטעים לפי docs/REFERENCE_MAP.md, באותו סדר */}
      <main id="main">
        {/* סדר הסיפור (נובמבר 2026): פתיחה → תקציר → הציטוט על רקע הסימנייה → על הספר
            ("אינו ספר של תשובות…") → על רועי → הספר בעולם → הספר המרחף (המקטע האחרון) */}
        <Hero />
        <Stats />
        <Summary />
        <Statement />
        <AboutBook />
        {/* על רועי — דיוקן מעל הביוגרפיה */}
        <AboutAuthor />
        <Testimonials />
        <BookAroundWorld />
        <Purchase />
      </main>
      {/* S13 */}
      <Footer />

      <StickyCta />
    </div>
  )
}
