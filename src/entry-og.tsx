import { createRoot } from 'react-dom/client'
import './styles/global.css'
import './styles/sections.css'
import { shaadiTheme } from './theme/shaadi'
import { walimaTheme } from './theme/walima'
import { applyTheme } from './theme/types'
import { ReferenceFrame } from './components/Illumination'
import { ArchFrame } from './components/sections/Hero'
import shaadiPattern from './assets/og/shaadi-pattern.jpg'
import receptionPattern from './assets/walima/verse-wildflowers.jpg'

// Rendered only to produce /public/og/{event}.jpg (the link-preview picture),
// photographed at 1200 x 630: the invitation card standing in front of an
// opened envelope lined with the invitation's own pattern.
const ev = new URLSearchParams(location.search).get('event') === 'walima' ? 'walima' : 'shaadi'
applyTheme(ev === 'walima' ? walimaTheme : shaadiTheme)

const look = ev === 'walima'
  ? { bg: '#efe9de', env: '#c9a6ad', envEdge: '#b58f97', liner: receptionPattern, linerSize: '520px auto' }
  : { bg: '#efe8dc', env: '#5b1422', envEdge: '#7a2133', liner: shaadiPattern, linerSize: '420px auto' }

const caps = { fontFamily: 'var(--font-body)', fontWeight: 500, textTransform: 'uppercase' as const, color: 'var(--ink)' }

function Envelope() {
  // opened envelope seen from the front: flap folded up, liner showing
  const W = 440, FLAP = 230, BODY = 300
  return (
    <div style={{ position: 'absolute', left: 600, top: 630 - FLAP - BODY - 40, width: W, height: FLAP + BODY }}>
      <div style={{ position: 'absolute', left: 6, right: -6, top: FLAP + 12, height: BODY, background: 'rgba(40,20,10,0.18)', filter: 'blur(14px)' }} />
      {/* the envelope's back and open flap, then its liner as one piece */}
      <div style={{ position: 'absolute', left: 0, top: 0, width: W, height: FLAP + BODY, background: look.env, clipPath: `polygon(50% 0, 100% ${FLAP}px, 100% 100%, 0 100%, 0 ${FLAP}px)` }} />
      <div style={{ position: 'absolute', left: 14, top: 18, width: W - 28, height: FLAP - 18 + BODY * 0.62, backgroundColor: '#f5ecd6', backgroundImage: `url(${look.liner})`, backgroundSize: look.linerSize, backgroundPosition: 'center top', clipPath: `polygon(50% 0, 100% ${FLAP - 18 - 7}px, 100% 100%, 0 100%, 0 ${FLAP - 18 - 7}px)` }} />
      {/* front pocket with its V */}
      <div style={{ position: 'absolute', left: 0, top: FLAP, width: W, height: BODY, background: look.env, clipPath: 'polygon(0 0, 50% 52%, 100% 0, 100% 100%, 0 100%)', boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.05)' }} />
      <div style={{ position: 'absolute', left: 0, top: FLAP, width: W, height: BODY, background: `linear-gradient(${look.envEdge}, ${look.envEdge})`, clipPath: 'polygon(0 0, 50% 52%, 100% 0, 100% 1.2%, 50% 53.5%, 0 1.2%)', opacity: 0.9 }} />
    </div>
  )
}

function ShaadiCard() {
  return (
    <div style={{ position: 'absolute', left: 250, top: 45, width: 420, height: 540, background: '#faf1d2', boxShadow: '0 22px 40px -18px rgba(40,15,8,0.55), 0 2px 6px rgba(40,15,8,0.18)' }}>
      <ReferenceFrame className="folio-frame" bandRatio={0.115} />
      <div style={{ position: 'absolute', inset: 0, zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '0 70px' }}>
        <div className="hero-calligraphy" style={{ width: 150, margin: '0 auto' }} />
        <p style={{ fontFamily: 'var(--font-body)', fontStyle: 'italic', fontSize: 22, color: 'var(--ink-soft)', marginTop: 22 }}>You are invited</p>
        {/* names in the Reception's script (preview only) */}
        <p style={{ fontFamily: "'Pinyon Script'", fontSize: 52, lineHeight: 1.1, color: 'var(--ink)', marginTop: 8 }}>Iman</p>
        <p style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 22, color: 'var(--ink-soft)', margin: '0 0 2px' }}>&amp;</p>
        <p style={{ fontFamily: "'Pinyon Script'", fontSize: 52, lineHeight: 1.1, color: 'var(--ink)' }}>Hamza</p>
        <span style={{ display: 'block', width: 200, height: 1, background: 'var(--gold)', margin: '22px auto 0' }} />
        <p style={{ ...caps, fontSize: 14, letterSpacing: '0.22em', margin: '11px 0' }}>21 December 2026</p>
        <span style={{ display: 'block', width: 200, height: 1, background: 'var(--gold)', margin: '0 auto' }} />
        <p style={{ fontFamily: 'var(--font-body)', fontStyle: 'italic', fontSize: 22, color: 'var(--ink)', marginTop: 18 }}>Lahore</p>
      </div>
    </div>
  )
}

function ReceptionCard() {
  const H = 540, Wd = H * 1016 / 1466
  return (
    <div className="hero-folio hero-arch" style={{ ['--vw' as string]: `${Wd / 100}px`, position: 'absolute', left: 290, top: 45, width: Wd, height: H, minHeight: 0, padding: 0, display: 'block', boxShadow: '0 22px 40px -18px rgba(40,25,10,0.45), 0 2px 6px rgba(40,25,10,0.15)' }}>
      <ArchFrame />
      <div style={{ position: 'absolute', inset: 0, zIndex: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', paddingTop: 70 }}>
        <div className="hero-calligraphy" style={{ width: 112, margin: '0 auto' }} />
        <p style={{ fontFamily: 'var(--font-body)', fontStyle: 'italic', fontSize: 18, color: 'var(--ink-soft)', marginTop: 40 }}>You are invited</p>
        <p style={{ fontFamily: "'Pinyon Script'", fontSize: 48, lineHeight: 1.1, color: 'var(--ink)', marginTop: 6 }}>Hamza</p>
        <p style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 20, color: 'var(--ink-soft)', margin: '0 0 2px' }}>&amp;</p>
        <p style={{ fontFamily: "'Pinyon Script'", fontSize: 48, lineHeight: 1.1, color: 'var(--ink)' }}>Iman</p>
        <span style={{ display: 'block', width: 170, height: 1, background: 'var(--gold)', margin: '14px auto 0' }} />
        <p style={{ ...caps, fontSize: 11, letterSpacing: '0.13em', margin: '9px 0' }}>27 December 2026</p>
        <span style={{ display: 'block', width: 170, height: 1, background: 'var(--gold)', margin: '0 auto' }} />
        <p style={{ fontFamily: 'var(--font-body)', fontStyle: 'italic', fontSize: 19, color: 'var(--ink)', marginTop: 12 }}>Karachi</p>
      </div>
    </div>
  )
}

function Og() {
  return (
    <div style={{ position: 'relative', width: 1200, height: 630, background: look.bg, overflow: 'hidden' }}>
      <Envelope />
      {ev === 'walima' ? <ReceptionCard /> : <ShaadiCard />}
    </div>
  )
}
createRoot(document.getElementById('root')!).render(<Og />)
