import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

// הסגנונות הגלובליים נטענים לפני הרכיבים, כדי שסגנונות ה-CSS Modules
// של כל רכיב יוכלו לגבור עליהם בסדר המפל (cascade).
// גופנים מאוחסנים מקומית (ללא בקשות לשרתי צד שלישי), שניהם ברישיון SIL OFL 1.1:
// Heebo — הגופן הראשי; גברת לוין (AlefAlefAlef) — כתב היד, לגזרי הנייר בלבד.
import '@fontsource-variable/heebo'
import '@fontsource/gveret-levin/400.css'
import './styles/tokens.css'
import './styles/base.css'

import App from './App'

const rootElement = document.getElementById('root')

if (!rootElement) {
  throw new Error('לא נמצא אלמנט #root בקובץ index.html')
}

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
