import { createRoot } from 'react-dom/client'
import type { CSSProperties, ReactNode } from 'react'
import './styles/global.css'
import './styles/sections.css'
import { shaadiTheme } from './theme/shaadi'
import { walimaTheme } from './theme/walima'
import { applyTheme } from './theme/types'
import { shaadi } from './content/shaadi'
import { walima } from './content/walima'
import { ReferenceFrame } from './components/Illumination'
import { ArchFrame } from './components/sections/Hero'
import { GoldDefs } from './components/Ornaments'

// Rendered only to produce the one-page printed invitations (A4, PDF + JPG)
// for guests who won't open the link: /print/?event=shaadi|walima.
// Everything comes from the invitation's own content and artwork.
const ev = new URLSearchParams(location.search).get('event') === 'walima' ? 'walima' : 'shaadi'
applyTheme(ev === 'walima' ? walimaTheme : shaadiTheme)
const c = ev === 'walima' ? walima : shaadi

const PAGE_W = 794, PAGE_H = 1123
// phone numbers as people would dial them
const PHONES: Record<string, string> = {
  '966500466597': '+966 50 046 6597',
  '966532702343': '+966 53 270 2343',
}
const phone = (k: { whatsapp: string; display?: string }) => k.display || PHONES[k.whatsapp] || `+${k.whatsapp}`

const italic: CSSProperties = { fontFamily: 'var(--font-body)', fontStyle: 'italic', color: 'var(--ink)', margin: 0 }
const caps: CSSProperties = { fontFamily: 'var(--font-body)', fontWeight: 500, textTransform: 'uppercase', color: 'var(--ink)', margin: 0 }
function Rule({ k, gap }: { k: number; gap: number }) {
  const line: CSSProperties = { display: 'block', width: 92 * k, height: 1, background: 'var(--gold)' }
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12 * k, margin: `${gap}px 0` }}>
      <i style={line} /><i style={{ display: 'block', width: 7 * k, height: 7 * k, background: 'var(--gold)', transform: 'rotate(45deg)' }} /><i style={line} />
    </div>
  )
}
const lines = (s: string) => s.split('\n').map((l, i) => <span key={i}>{i > 0 && <br />}{l}</span>)

function Details({ k, gap }: { k: number; gap: number }) {
  // k scales the type for each frame's inner width
  const v = c.venue
  const when = `${c.date.weekday}, ${c.date.short}`
  return (
    <>
      <Rule k={k} gap={gap} />
      <p style={{ ...caps, fontSize: 19 * k, letterSpacing: '0.16em' }}>{when}</p>
      <p style={{ ...italic, fontSize: 21 * k, marginTop: 4 * k }}>{c.date.timeLabel}</p>

      <p style={{ ...caps, fontSize: 17 * k, letterSpacing: '0.16em', marginTop: 20 * k }}>{v.hall}</p>
      <p style={{ ...italic, fontSize: 21 * k, marginTop: 4 * k }}>{v.name}</p>
      <p style={{ ...italic, fontSize: 18 * k, color: 'var(--ink-soft)', marginTop: 2 * k, lineHeight: 1.35 }}>{v.address.replace('\n', ', ').replace(', Pakistan', '')}</p>

      <Rule k={k} gap={gap} />
      <p style={{ ...italic, fontSize: 20 * k }}>{c.rsvp.deadlineLabel}</p>
      <p style={{ ...italic, fontSize: 17 * k, color: 'var(--ink-soft)', marginTop: 2 * k }}>by call or WhatsApp to</p>
      {c.contacts.map((p) => (
        <p key={p.whatsapp} style={{ ...caps, fontSize: 15.5 * k, letterSpacing: '0.12em', marginTop: 8 * k }}>
          {p.name}<span style={{ fontFamily: 'var(--font-body)', fontWeight: 400, letterSpacing: '0.04em', textTransform: 'none', fontSize: 19 * k, marginLeft: 12 * k }}>{phone(p)}</span>
        </p>
      ))}
    </>
  )
}

function Names({ size }: { size: number }) {
  const cp = c.couple
  const name = (latin: string, urdu?: string) => urdu
    ? <span className="hero-name hero-name-nastaliq" lang="ur" dir="rtl" style={{ display: 'block', fontSize: size }}>{urdu}</span>
    : <span className="hero-name hero-name-script" style={{ display: 'block', fontSize: size, lineHeight: 1.15 }}>{latin}</span>
  return (
    <h1 className="hero-names hero-names-title" style={{ margin: 0 }}>
      {name(cp.first, cp.firstArabic)}
      <span className="hero-joiner"><i /><em>{cp.joiner === '&' ? 'with' : cp.joiner}</em><i /></span>
      {name(cp.second, cp.secondArabic)}
    </h1>
  )
}

function Opening({ k, enWidth }: { k: number; enWidth?: number }) {
  return (
    <>
      <div className="hero-calligraphy" style={{ width: 210 * k, margin: '0 auto' }} />
      <p style={{ ...italic, fontSize: 15 * k, lineHeight: 1.35, color: 'var(--ink-soft)', marginTop: 6 * k, maxWidth: enWidth, marginLeft: 'auto', marginRight: 'auto' }}>{enWidth ? lines(c.bismillah.english.replace(', ', ',\n')) : c.bismillah.english}</p>
      <p style={{ ...caps, fontSize: 16 * k, letterSpacing: '0.16em', marginTop: 22 * k }}>{c.hero.hosts}</p>
      <p style={{ ...italic, fontSize: 20 * k, lineHeight: 1.4, marginTop: 6 * k }}>{lines(c.hero.line)}</p>
    </>
  )
}

function Shaadi() {
  return (
    <div className="hero-folio" style={{ position: 'relative', width: PAGE_W, height: PAGE_H, padding: 0, display: 'block', minHeight: 0 }}>
      <ReferenceFrame className="folio-frame" bandRatio={0.105} />
      <div style={{ position: 'absolute', inset: 0, zIndex: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '0 120px' }}>
        <Opening k={1.03} />
        <div style={{ marginTop: 12 }}><Names size={62} /></div>
        <p style={{ ...caps, fontSize: 16.5, letterSpacing: '0.16em', marginTop: 14 }}>{c.hero.afterNames}</p>
        <div style={{ marginTop: 4 }}><Details k={1.03} gap={21} /></div>
      </div>
    </div>
  )
}

function Reception() {
  // the arch artwork is 1016 x 1466; the page is a touch squarer, so the
  // frame is set a little narrower and its straight sides grow to fill A4
  const W = 762, k = 0.92
  return (
    <div style={{ position: 'relative', width: PAGE_W, height: PAGE_H, background: 'var(--paper)' }}>
      <div className="hero-folio hero-arch paper" style={{ ['--vw' as string]: `${W / 100}px`, position: 'absolute', left: (PAGE_W - W) / 2, top: 0, width: W, height: PAGE_H, minHeight: 0, padding: 0, display: 'block' }}>
        <ArchFrame />
        <div style={{ position: 'absolute', inset: 0, zIndex: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '120px 110px 0' }}>
          <Opening k={k} enWidth={250} />
          <div style={{ marginTop: 2 }}><Names size={50} /></div>
          <p style={{ ...caps, fontSize: 15 * k, letterSpacing: '0.16em', lineHeight: 1.6, marginTop: 6 }}>{lines(c.hero.afterNames || '')}</p>
          <div><Details k={k} gap={13} /></div>
        </div>
      </div>
    </div>
  )
}

function Page({ children }: { children: ReactNode }) {
  return <><GoldDefs />{children}</>
}
createRoot(document.getElementById('root')!).render(<Page>{ev === 'walima' ? <Reception /> : <Shaadi />}</Page>)
