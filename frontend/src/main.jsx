import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './root.css'
import './tailwind.css'
import './i18n' // Importation de la configuration i18n
import AppRouter from './AppRouter.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppRouter />
  </StrictMode>
)