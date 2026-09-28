import './styles/global.css'
import './styles/sections.css'
import { useEffect, useState } from 'react'
import { AnimatePresence } from 'motion/react'
import type { InviteContent } from './content/types'
import { applyTheme, type Theme } from './theme/types'
import { EnvelopeGate } from './components/envelope/Envelope'
import { GoldDefs } from './components/Ornaments'
import { Hero } from './components/sections/Hero'
import { Countdown } from './components/sections/Countdown'
import { Invitation } from './components/sections/Invitation'
import { Details } from './components/sections/Details'
import { Timeline } from './components/sections/Timeline'
import { DressCode } from './components/sections/DressCode'
import { Rsvp } from './components/sections/Rsvp'
import { Contact } from './components/sections/Contact'
import { Photo } from './components/sections/Photo'
import { Footer } from './components/sections/Footer'
import { SoundToggle } from './components/SoundToggle'

export function App({ content, theme }: { content: InviteContent; theme: Theme }) {
  const [opened, setOpened] = useState(false)   // content may start its entrance
  const [gate, setGate] = useState(true)        // gate still mounted

  useEffect(() => { applyTheme(theme); document.title = content.siteTitle }, [theme, content.siteTitle])

  function onOpened() {
    setOpened(true)
    window.scrollTo(0, 0)
    setTimeout(() => setGate(false), 1200)
  }

  return (
    <>
      <GoldDefs />
      <main className="page" aria-hidden={gate ? true : undefined}>
        <Hero content={content} theme={theme} opened={opened || theme.hero === 'folio'} />
        {theme.hero !== 'folio' && <Countdown content={content} theme={theme} />}
        {theme.hero !== 'folio' && <Invitation content={content} theme={theme} />}
        {content.event === 'walima' && <Photo content={content} />}
        <Details content={content} theme={theme} />
        <Timeline content={content} theme={theme} />
        {theme.hero === 'folio' && <Countdown content={content} theme={theme} />}
        {theme.hero !== 'folio' && <DressCode content={content} />}
        <Rsvp content={content} />
        <Contact content={content} />
        <Footer content={content} theme={theme} />
      </main>
      {content.musicUrl && <SoundToggle url={content.musicUrl} start={opened} />}
      <AnimatePresence>
        {gate && <EnvelopeGate key="gate" content={content} theme={theme} onOpened={onOpened} />}
      </AnimatePresence>
    </>
  )
}
