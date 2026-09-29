import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

// הסגנונות הגלובליים נטענים לפני הרכיבים, כדי שסגנונות ה-CSS Modules
// של כל רכיב יוכלו לגבור עליהם בסדר המפל (cascade).
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
