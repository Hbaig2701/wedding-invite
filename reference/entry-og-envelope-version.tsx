import { createRoot } from 'react-dom/client'
import './styles/global.css'
import './styles/sections.css'
import './components/envelope/Envelope.css'
import { shaadi } from './content/shaadi'
import { walima } from './content/walima'
import { shaadiTheme } from './theme/shaadi'
import { walimaTheme } from './theme/walima'
import { applyTheme } from './theme/types'
import { GoldDefs } from './components/Ornaments'
import { BackPanel, FlapFace, Pocket } from './components/envelope/EnvelopePaper'
import { WaxSeal } from './components/envelope/WaxSeal'

// Rendered only to produce /public/og/{event}.jpg — not part of the guest build.
const ev = new URLSearchParams(location.search).get('event') === 'walima' ? 'walima' : 'shaadi'
const content = ev === 'walima' ? walima : shaadi
const theme = ev === 'walima' ? walimaTheme : shaadiTheme
applyTheme(theme)
document.documentElement.style.setProperty('--vw', '4.3px')

function Og() {
  return (
    <div className="ground grain" style={{ width: 1200, height: 630, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 70, padding: '0 90px', boxSizing: 'border-box', position: 'relative' }}>
      <GoldDefs />
      <div className="scene" style={{ ['--ew' as string]: '440px', flex: 'none' }}>
        <div className="env-ground-shadow" />
        <div className="env" style={{ transform: 'rotateX(6deg) rotateY(-8deg)' }}>
          <div className="env-back"><BackPanel liner={theme.liner} /></div>
          <Pocket />
          <div className="env-flap" style={{ transform: 'translateZ(6px)' }}><FlapFace /></div>
          <div className="seal-shadow" />
          <div className="seal-wrap seal-on-pocket"><WaxSeal initials={content.couple.sealInitials} /></div>
        </div>
      </div>
      <div style={{ color: 'var(--on-dark)', position: 'relative', zIndex: 2, maxWidth: 520 }}>
        <p className="eyebrow" style={{ color: 'var(--on-dark-faint)' }}>{content.eventLabel} · {content.date.short}</p>
        <p className={`font-display ${theme.darkGround ? 'gold-text' : ''}`} style={{ fontSize: 96, lineHeight: 0.98, marginTop: 18, letterSpacing: '-0.02em' }}>{content.couple.first}<br /><span style={{ fontStyle: 'italic', fontSize: 40 }}>{content.couple.joiner}</span><br />{content.couple.second}</p>
        <p className="font-body" style={{ fontStyle: 'italic', fontSize: 26, marginTop: 26, color: 'var(--on-dark-soft)' }}>You are invited · {content.city}</p>
      </div>
    </div>
  )
}
const style = document.createElement('style')
style.textContent = !theme.darkGround ? '.ground{color:var(--ink)} .eyebrow{color:var(--ink-faint)!important} p{color:var(--ink)!important} .gold-text{-webkit-text-fill-color:transparent}' : ''
document.head.appendChild(style)
createRoot(document.getElementById('root')!).render(<Og />)
