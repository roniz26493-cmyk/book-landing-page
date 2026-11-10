import { useEffect } from 'react'
import { bookConfig } from './data/bookConfig'
import { applyBrandColors } from './lib/applyBrandColors'
import { AboutAuthor } from './components/AboutAuthor'
import { AboutBook } from './components/AboutBook'
import { Faq } from './components/Faq'
import { Footer } from './components/Footer'
import { Hero } from './components/Hero'
import { Purchase } from './components/Purchase'
import { ScrapStrip } from './components/ScrapStrip'
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

  return (
    <div className="page">
      <a className="skipLink" href="#main">
        דילוג לתוכן הראשי
      </a>

      {/* 13 המקטעים לפי docs/REFERENCE_MAP.md, באותו סדר */}
      <main id="main">
        {/* S1 */}
        <Hero />
        {/* S2 */}
        <Stats />
        {/* S3 */}
        <ScrapStrip />
        {/* S4 */}
        <Statement />
        {/* S5 */}
        <AboutBook />
        {/* S8 */}
        <Summary />
        {/* S9 */}
        <AboutAuthor />
        {/* S10 */}
        <Testimonials />
        {/* S12 — שאלות נפוצות לפני ההזמנה: ההזמנה היא רגע ההמרה האחרון */}
        <Faq />
        {/* S11 */}
        <Purchase />
      </main>
      {/* S13 */}
      <Footer />

      <StickyCta />
    </div>
  )
}
