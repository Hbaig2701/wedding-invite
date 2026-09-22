import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './App'
import { shaadi } from './content/shaadi'
import { shaadiTheme } from './theme/shaadi'

createRoot(document.getElementById('root')!).render(
  <StrictMode><App content={shaadi} theme={shaadiTheme} /></StrictMode>,
)
