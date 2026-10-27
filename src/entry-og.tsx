import { createRoot } from 'react-dom/client'
import './styles/global.css'
import './styles/sections.css'
import { shaadi } from './content/shaadi'
import { walima } from './content/walima'
import { shaadiTheme } from './theme/shaadi'
import { walimaTheme } from './theme/walima'
import { applyTheme } from './theme/types'
import { ReferenceFrame } from './components/Illumination'
import { ArchFrame } from './components/sections/Hero'
import shaadiPattern from './assets/og/shaadi-pattern.jpg'   // the mockup's pattern, single copy (no join)
import receptionPattern from './assets/walima/verse-wildflowers.jpg'

// Rendered only to produce /public/og/{event}.jpg (the link-preview picture),
// photographed at 1200 x 630. Not part of the guest build.
const ev = new URLSearchParams(location.search).get('event') === 'walima' ? 'walima' : 'shaadi'
const content = ev === 'walima' ? walima : shaadi
const theme = ev === 'walima' ? walimaTheme : shaadiTheme
applyTheme(theme)

const caps = { fontFamily: 'var(--font-body)', fontWeight: 500, textTransform: 'uppercase' as const, letterSpacing: '0.28em', color: 'var(--ink)' }

function ShaadiCard() {
  return (
    <div style={{ position: 'relative', width: 640, height: 560, background: '#faf1d2', boxShadow: '0 18px 40px -16px rgba(60,20,10,0.55)' }}>
      <ReferenceFrame className="folio-frame" bandRatio={0.1} />
      <div style={{ position: 'absolute', inset: 0, zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '0 90px' }}>
        <div className="hero-calligraphy" style={{ width: 118, margin: '0 auto' }} />
        <p style={{ ...caps, fontSize: 13, marginTop: 12, color: 'var(--ink-soft)' }}>The Shaadi of</p>
        {/* stacked as on the invitation: ایمان / with / حمزہ */}
        <p style={{ fontFamily: "'Nafees Names'", fontSize: 58, lineHeight: 1.25, color: 'var(--ink)', marginTop: 6 }} lang="ur" dir="rtl">{content.couple.firstArabic}</p>
        <p style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 24, color: 'var(--ink-soft)', margin: '-2px 0 0' }}>with</p>
        <p style={{ fontFamily: "'Nafees Names'", fontSize: 58, lineHeight: 1.25, color: 'var(--ink)' }} lang="ur" dir="rtl">{content.couple.secondArabic}</p>
        <span style={{ display: 'block', width: 110, height: 1, background: 'var(--gold)', margin: '10px auto 14px' }} />
        <p style={{ ...caps, fontSize: 16 }}>Monday · 21 December 2026</p>
        <p style={{ ...caps, fontSize: 12, marginTop: 8, color: 'var(--ink-soft)' }}>Lahore, Pakistan</p>
      </div>
    </div>
  )
}

function ReceptionCard() {
  // the Reception's floral arch, sized to 600px tall
  return (
    <div className="hero-folio hero-arch" style={{ ['--vw' as string]: `${(600 * 1016 / 1466) / 100}px`, position: 'relative', width: 600 * 1016 / 1466, height: 600, minHeight: 0, padding: 0, display: 'block', boxShadow: '0 18px 40px -16px rgba(60,20,10,0.45)' }}>
      <ArchFrame />
      <div style={{ position: 'absolute', inset: 0, zIndex: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', paddingTop: 72 }}>
        <div className="hero-calligraphy" style={{ width: 112, margin: '0 auto' }} />
        <p style={{ ...caps, fontSize: 11, letterSpacing: '0.24em', marginTop: 40, color: 'var(--ink-soft)' }}>The Reception of</p>
        <p style={{ fontFamily: "'Pinyon Script'", fontSize: 60, lineHeight: 1.12, color: 'var(--ink)', marginTop: 6 }}>{content.couple.first}</p>
        <p style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 22, color: 'var(--ink-soft)', margin: '0 0 2px' }}>and</p>
        <p style={{ fontFamily: "'Pinyon Script'", fontSize: 60, lineHeight: 1.12, color: 'var(--ink)' }}>{content.couple.second}</p>
        <p style={{ ...caps, fontSize: 12, letterSpacing: '0.16em', marginTop: 16 }}>Sunday · 27 December 2026</p>
        <p style={{ ...caps, fontSize: 10, letterSpacing: '0.22em', marginTop: 6, color: 'var(--ink-soft)' }}>Karachi, Pakistan</p>
      </div>
    </div>
  )
}

function Og() {
  const pattern = ev === 'walima' ? receptionPattern : shaadiPattern
  return (
    <div style={{ width: 1200, height: 630, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f6ead2', backgroundImage: `url(${pattern})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      {ev === 'walima' ? <ReceptionCard /> : <ShaadiCard />}
    </div>
  )
}
createRoot(document.getElementById('root')!).render(<Og />)
