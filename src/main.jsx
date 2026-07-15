import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import TydeRX from './TydeRX.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <TydeRX />
  </StrictMode>,
)