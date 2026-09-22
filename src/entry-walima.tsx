import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './App'
import { walima } from './content/walima'
import { walimaTheme } from './theme/walima'

createRoot(document.getElementById('root')!).render(
  <StrictMode><App content={walima} theme={walimaTheme} /></StrictMode>,
)
