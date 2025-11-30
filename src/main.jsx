import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import Gith from './Components/Gith'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Gith />
  </StrictMode>,
)
