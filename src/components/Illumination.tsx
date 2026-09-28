const B = import.meta.env.BASE_URL
import { useEffect, useId, useMemo, useRef, useState } from 'react'
import { cuspedPath } from './Ornaments'

/* ═══════════════════════════════════════════════════════════════════════════
   Illumination — the ornament vocabulary of a Mughal folio page:
     • FloralTile / IlluminatedFrame — a dense repeating border band of
       rosettes, palmettes and vines in gold, rose, burgundy and sage.
     • Garland — a hand-placed floral vine (pink blossoms, burgundy buds,
       sage leaves on a gold stem) that follows any path, e.g. the cusped arch.
     • DateBlock — the “DEC · MONDAY 21 6:30 PM · 2026” lock-up.
   Everything is vector; colours come from theme variables.
   ═══════════════════════════════════════════════════════════════════════ */

/* ───────────────────────────── The border tile ─────────────────────────── */
function FloralTile({ id, size = 52 }: { id: string; size?: number }) {
  // Drawn in a 52×52 box: a central rosette flanked by palmette halves, a
  // vine running through, small stars at the corners.
  return (
    <pattern id={id} width={size} height={size} patternUnits="userSpaceOnUse" viewBox="0 0 52 52">
      <rect width="52" height="52" fill="var(--band)" />
      {/* vine */}
      <path d="M0 26 C 8 18, 14 18, 26 26 S 44 34, 52 26" fill="none" stroke="var(--gold-dark)" strokeWidth="0.9" opacity="0.9" />
      <path d="M0 26 C 8 34, 14 34, 26 26 S 44 18, 52 26" fill="none" stroke="var(--gold-dark)" strokeWidth="0.9" opacity="0.9" />
      {/* sage leaves on the vine */}
      <g fill="var(--leaf)" stroke="var(--leaf-deep)" strokeWidth="0.4">
        <path d="M9 20 q 4 -6 8 0 q -4 6 -8 0z" />
        <path d="M35 32 q 4 -6 8 0 q -4 6 -8 0z" />
        <path d="M9 32 q 4 6 8 0 q -4 -6 -8 0z" />
        <path d="M35 20 q 4 6 8 0 q -4 -6 -8 0z" />
      </g>
      {/* central rosette: 8 rose petals, gold outline, burgundy heart */}
      <g transform="translate(26 26)">
        {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => (
          <ellipse key={a} cx="0" cy="-7.2" rx="3.1" ry="5.6" transform={`rotate(${a})`} fill="var(--rose)" stroke="var(--gold-dark)" strokeWidth="0.55" />
        ))}
        <circle r="3.6" fill="var(--burgundy)" />
        <circle r="1.4" fill="var(--gold-light)" />
      </g>
      {/* palmette halves at left/right edges (join across tiles) */}
      <g fill="var(--rose-deep)" stroke="var(--gold-dark)" strokeWidth="0.5" opacity="0.95">
        <path d="M0 8 q 6 4 6 10 q -4 -1 -6 -3z" />
        <path d="M0 44 q 6 -4 6 -10 q -4 1 -6 3z" />
        <path d="M52 8 q -6 4 -6 10 q 4 -1 6 -3z" />
        <path d="M52 44 q -6 -4 -6 -10 q 4 1 6 3z" />
      </g>
      {/* corner stars */}
      <g fill="var(--gold)" stroke="var(--gold-deep)" strokeWidth="0.35">
        <path d="M0 0 l 3 0 l -3 3z" /><path d="M52 0 l -3 0 l 3 3z" /><path d="M0 52 l 3 0 l -3 -3z" /><path d="M52 52 l -3 0 l 3 -3z" />
        <path d="M26 2.5 l 2 3.5 l -2 3.5 l -2 -3.5z" /><path d="M26 42.5 l 2 3.5 l -2 3.5 l -2 -3.5z" />
      </g>
      <g fill="var(--burgundy)">
        <circle cx="26" cy="6" r="0.9" /><circle cx="26" cy="46" r="0.9" />
        <circle cx="4" cy="26" r="0.9" /><circle cx="48" cy="26" r="0.9" />
      </g>
    </pattern>
  )
}

/* ────────────────────────────── Corner rosette ──────────────────────────── */
function CornerRosette({ x, y, s }: { x: number; y: number; s: number }) {
  return (
    <g transform={`translate(${x + s / 2} ${y + s / 2}) scale(${s / 52})`}>
      <rect x="-26" y="-26" width="52" height="52" fill="var(--band)" />
      <rect x="-19" y="-19" width="38" height="38" fill="none" stroke="var(--gold-dark)" strokeWidth="0.8" transform="rotate(45)" />
      <rect x="-19" y="-19" width="38" height="38" fill="none" stroke="var(--gold-dark)" strokeWidth="0.8" />
      {[0, 60, 120, 180, 240, 300].map((a) => (
        <ellipse key={a} cx="0" cy="-10" rx="4.4" ry="8" transform={`rotate(${a})`} fill="var(--rose)" stroke="var(--gold-dark)" strokeWidth="0.6" />
      ))}
      {[30, 90, 150, 210, 270, 330].map((a) => (
        <path key={a} d="M0 -6 q 3 -8 0 -16 q -3 8 0 16z" transform={`rotate(${a})`} fill="var(--leaf)" stroke="var(--leaf-deep)" strokeWidth="0.4" />
      ))}
      <circle r="5" fill="var(--burgundy)" />
      <circle r="2" fill="var(--gold-light)" />
    </g>
  )
}

/* ─────────────────────────── Illuminated frame ─────────────────────────── */
/**
 * A full illuminated border: outer hairline, the patterned band, then a
 * gold-and-burgundy double rule on the inside. Sized in pixels from the
 * element so tiles never stretch.
 */
export function IlluminatedFrame({ className, band = 44, inset = 0 }: { className?: string; band?: number; inset?: number }) {
  const ref = useRef<SVGSVGElement>(null)
  const [size, setSize] = useState<[number, number]>([390, 800])
  useEffect(() => {
    const el = ref.current; if (!el) return
    const update = () => { const r = el.getBoundingClientRect(); if (r.width > 0 && r.height > 0) setSize([Math.round(r.width), Math.round(r.height)]) }
    update()
    if (typeof ResizeObserver === 'undefined') { window.addEventListener('resize', update); return () => window.removeEventListener('resize', update) }
    const ro = new ResizeObserver(update); ro.observe(el); return () => ro.disconnect()
  }, [])
  const [W, H] = size
  const id = useId().replace(/:/g, '')
  const o = inset            // outer edge of the band
  const i = inset + band     // inner edge of the band
  return (
    <svg ref={ref} className={className} viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" aria-hidden="true" focusable="false">
      <defs>
        <FloralTile id={`tile${id}`} size={band} />
      </defs>
      {/* band: top & bottom horizontal, left & right rotated */}
      <rect x={o} y={o} width={W - o * 2} height={band} fill={`url(#tile${id})`} />
      <rect x={o} y={H - i} width={W - o * 2} height={band} fill={`url(#tile${id})`} />
      <g transform={`translate(${o} ${o}) rotate(90) translate(0 ${-band})`}>
        <rect x="0" y="0" width={H - o * 2} height={band} fill={`url(#tile${id})`} />
      </g>
      <g transform={`translate(${W - i} ${o}) rotate(90) translate(0 ${-band})`}>
        <rect x="0" y="0" width={H - o * 2} height={band} fill={`url(#tile${id})`} />
      </g>
      {/* corners */}
      <CornerRosette x={o} y={o} s={band} />
      <CornerRosette x={W - i} y={o} s={band} />
      <CornerRosette x={o} y={H - i} s={band} />
      <CornerRosette x={W - i} y={H - i} s={band} />
      {/* rules: outer gold hairline, inner gold + burgundy */}
      <rect x={o + 0.5} y={o + 0.5} width={W - o * 2 - 1} height={H - o * 2 - 1} fill="none" stroke="var(--gold-dark)" strokeWidth="1" />
      <rect x={i - 0.5} y={i - 0.5} width={W - i * 2 + 1} height={H - i * 2 + 1} fill="none" stroke="var(--gold-dark)" strokeWidth="1" />
      <rect x={i + 3} y={i + 3} width={W - i * 2 - 6} height={H - i * 2 - 6} fill="none" stroke="var(--gold)" strokeWidth="2.2" />
      <rect x={i + 7.5} y={i + 7.5} width={W - i * 2 - 15} height={H - i * 2 - 15} fill="none" stroke="var(--burgundy)" strokeWidth="1" opacity="0.9" />
    </svg>
  )
}

/* ────────────────────────────────── Garland ─────────────────────────────── */
interface Item { x: number; y: number; a: number; kind: 'leaf' | 'flower' | 'small' | 'bud' | 'tendril'; side: number; s: number }

function samplePath(d: string, step: number): { x: number; y: number; a: number }[] {
  if (typeof document === 'undefined') return []
  const ns = 'http://www.w3.org/2000/svg'
  const svg = document.createElementNS(ns, 'svg')
  const path = document.createElementNS(ns, 'path')
  path.setAttribute('d', d)
  svg.appendChild(path)
  svg.style.position = 'absolute'; svg.style.width = '0'; svg.style.height = '0'; svg.style.overflow = 'hidden'
  document.body.appendChild(svg)
  const out: { x: number; y: number; a: number }[] = []
  try {
    const L = path.getTotalLength()
    for (let t = 0; t < L; t += step) {
      const p = path.getPointAtLength(t)
      const q = path.getPointAtLength(Math.min(L, t + 1.5))
      out.push({ x: p.x, y: p.y, a: (Math.atan2(q.y - p.y, q.x - p.x) * 180) / Math.PI })
    }
  } finally { document.body.removeChild(svg) }
  return out
}

function seeded(seed: number) {
  let s = seed
  return () => { s = (s * 9301 + 49297) % 233280; return s / 233280 }
}

/**
 * A floral vine along a path. `d` is in the SVG's own pixel space.
 * Density is tuned so a full hero wreath stays around 300 elements.
 */
export function Garland({ d, width, height, className, density = 1, seed = 3 }: { d: string; width: number; height: number; className?: string; density?: number; seed?: number }) {
  const items = useMemo<Item[]>(() => {
    const pts = samplePath(d, 9 / density)
    const rnd = seeded(seed)
    const out: Item[] = []
    let sinceFlower = 0
    pts.forEach((p, i) => {
      const side = i % 2 === 0 ? 1 : -1
      sinceFlower++
      const r = rnd()
      if (sinceFlower > 7 && r < 0.22) { out.push({ ...p, kind: r < 0.09 ? 'small' : 'flower', side, s: 0.85 + rnd() * 0.35 }); sinceFlower = 0 }
      else if (r < 0.32) out.push({ ...p, kind: 'bud', side, s: 0.8 + rnd() * 0.4 })
      else if (r < 0.42) out.push({ ...p, kind: 'tendril', side, s: 1 })
      else out.push({ ...p, kind: 'leaf', side, s: 0.75 + rnd() * 0.5 })
    })
    return out
  }, [d, density, seed])

  return (
    <svg className={className} viewBox={`0 0 ${width} ${height}`} width={width} height={height} aria-hidden="true" focusable="false" style={{ overflow: 'visible' }}>
      {/* stem */}
      <path d={d} fill="none" stroke="var(--gold-deep)" strokeWidth="2.4" opacity="0.35" />
      <path d={d} fill="none" stroke="var(--gold)" strokeWidth="1.5" />
      <path d={d} fill="none" stroke="var(--gold-light)" strokeWidth="0.5" opacity="0.8" />
      {items.map((it, i) => {
        const t = `translate(${it.x.toFixed(1)} ${it.y.toFixed(1)}) rotate(${it.a.toFixed(1)}) scale(${it.s.toFixed(2)})`
        switch (it.kind) {
          case 'leaf':
            return (
              <g key={i} transform={t}>
                <path d={`M0 0 q ${6 * it.side} ${-9 * it.side} ${1 * it.side} ${-17 * it.side} q ${-7 * it.side} ${8 * it.side} ${-1 * it.side} ${17 * it.side}z`} transform={`rotate(${-35 * it.side})`} fill="var(--leaf)" stroke="var(--leaf-deep)" strokeWidth="0.6" />
                <path d={`M0 0 q ${1 * it.side} ${-8 * it.side} ${0.5 * it.side} ${-15 * it.side}`} transform={`rotate(${-35 * it.side})`} fill="none" stroke="var(--leaf-deep)" strokeWidth="0.5" opacity="0.7" />
              </g>
            )
          case 'tendril':
            return <path key={i} transform={t} d={`M0 0 c ${4 * it.side} ${-4 * it.side}, ${8 * it.side} ${-2 * it.side}, ${6 * it.side} ${-8 * it.side} c ${-1 * it.side} ${-3 * it.side}, ${-4 * it.side} ${-2 * it.side}, ${-3 * it.side} ${0}`} fill="none" stroke="var(--gold)" strokeWidth="0.9" />
          case 'bud':
            return (
              <g key={i} transform={`${t} translate(0 ${-9 * it.side})`}>
                <path d={`M0 ${9 * it.side} L 0 0`} stroke="var(--gold)" strokeWidth="0.9" />
                <path d="M0 -6 q 4 3 3 9 q -3 3 -6 0 q -1 -6 3 -9z" fill="var(--burgundy)" stroke="var(--burgundy-deep)" strokeWidth="0.5" />
                <path d="M-3 3 q 3 -2 6 0 q -3 4 -6 0z" fill="var(--leaf)" stroke="var(--leaf-deep)" strokeWidth="0.4" />
              </g>
            )
          case 'small':
            return (
              <g key={i} transform={`${t} translate(0 ${-10 * it.side}) scale(0.6)`}>
                <path d={`M0 ${17 * it.side} L 0 0`} stroke="var(--gold)" strokeWidth="1.2" />
                {[0, 72, 144, 216, 288].map((a) => (
                  <ellipse key={a} cx="0" cy="-6" rx="3.4" ry="6" transform={`rotate(${a})`} fill="var(--rose-deep)" stroke="var(--burgundy)" strokeWidth="0.6" />
                ))}
                <circle r="2.6" fill="var(--burgundy)" />
              </g>
            )
          default:
            return (
              <g key={i} transform={`${t} translate(0 ${-13 * it.side})`}>
                <path d={`M0 ${13 * it.side} L 0 0`} stroke="var(--gold)" strokeWidth="1" />
                {[0, 72, 144, 216, 288].map((a) => (
                  <path key={a} d="M0 -2 c 4 -2 7 -7 4 -11 c -2 -2 -6 -1 -4 3 c -2 -4 -6 -5 -8 -3 c -3 4 4 9 8 11z" transform={`rotate(${a})`} fill="var(--rose)" stroke="var(--rose-deep)" strokeWidth="0.55" />
                ))}
                <circle r="3" fill="var(--burgundy)" />
                <circle r="1.1" fill="var(--gold-light)" />
              </g>
            )
        }
      })}
    </svg>
  )
}

/**
 * A garland that follows a cusped cartouche sized to its container.
 */
export function GarlandArch({ className, archWidth = 0.86, lobes = 9, density = 1, seed = 5, pad = 18 }: { className?: string; archWidth?: number; lobes?: number; density?: number; seed?: number; pad?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const [size, setSize] = useState<[number, number] | null>(null)
  useEffect(() => {
    const el = ref.current; if (!el) return
    const update = () => { const r = el.getBoundingClientRect(); if (r.width > 0 && r.height > 0) setSize([Math.round(r.width), Math.round(r.height)]) }
    update()
    if (typeof ResizeObserver === 'undefined') { window.addEventListener('resize', update); return () => window.removeEventListener('resize', update) }
    const ro = new ResizeObserver(update); ro.observe(el); return () => ro.disconnect()
  }, [])
  const d = size ? cuspedPath(size[0] - pad * 2, size[1] - pad * 2, { lobes, mirror: true, shoulder: 1, archWidth }) : null
  return (
    <div ref={ref} className={className} aria-hidden="true">
      {size && d && (
        <div style={{ position: 'absolute', left: pad, top: pad }}>
          <Garland d={d} width={size[0] - pad * 2} height={size[1] - pad * 2} density={density} seed={seed} />
        </div>
      )}
    </div>
  )
}

/* ─────────────────────────────── Date block ─────────────────────────────── */
export function DateBlock({ month, weekday, day, time, year, className }: { month: string; weekday: string; day: string; time: string; year: string; className?: string }) {
  return (
    <div className={`dateblock ${className ?? ''}`}>
      <div className="dateblock-month">{month}</div>
      <div className="dateblock-row">
        <span className="dateblock-rule" />
        <span className="dateblock-side">{weekday}</span>
        <span className="dateblock-day">{day}</span>
        <span className="dateblock-side">{time}</span>
        <span className="dateblock-rule" />
      </div>
      <div className="dateblock-year">{year}</div>
    </div>
  )
}

/* ───────────────────── The reference border, as cut from the artwork ─────── */
/**
 * The exact illuminated border from the printed Save the Date. Four corner
 * pieces and one repeating tile per edge were cut from the artwork at full
 * resolution (205px band, 317px horizontal repeat, 298px vertical repeat)
 * and are tiled here at a band width proportional to the column.
 */
// top/bottom bands are 168 tall, left/right bands 182 wide (source px)
const REF = { BH: 168, BW: 182, PH: 317, PV: 298 }

export function ReferenceFrame({ className, bandRatio = 0.155 }: { className?: string; bandRatio?: number }) {
  const ref = useRef<SVGSVGElement>(null)
  const [size, setSize] = useState<[number, number]>([430, 800])
  useEffect(() => {
    const el = ref.current; if (!el) return
    const update = () => { const r = el.getBoundingClientRect(); if (r.width > 0 && r.height > 0) setSize([Math.round(r.width), Math.round(r.height)]) }
    update()
    if (typeof ResizeObserver === 'undefined') { window.addEventListener('resize', update); return () => window.removeEventListener('resize', update) }
    const ro = new ResizeObserver(update); ro.observe(el); return () => ro.disconnect()
  }, [])
  const [W, H] = size
  const id = useId().replace(/:/g, '')
  const bh = Math.round(W * bandRatio)          // top & bottom thickness
  const s = bh / REF.BH
  const bw = Math.round(REF.BW * s)              // left & right thickness
  const tw = REF.PH * s, th = REF.PV * s
  return (
    <svg ref={ref} className={className} viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" aria-hidden="true" focusable="false">
      <defs>
        <pattern id={`bt${id}`} patternUnits="userSpaceOnUse" x={bw} y={0} width={tw} height={bh}><image href={`${B}border/e-top.jpg`} width={tw} height={bh} preserveAspectRatio="none" /></pattern>
        <pattern id={`bb${id}`} patternUnits="userSpaceOnUse" x={bw} y={H - bh} width={tw} height={bh}><image href={`${B}border/e-bottom.jpg`} width={tw} height={bh} preserveAspectRatio="none" /></pattern>
        <pattern id={`bl${id}`} patternUnits="userSpaceOnUse" x={0} y={bh} width={bw} height={th}><image href={`${B}border/e-left.jpg`} width={bw} height={th} preserveAspectRatio="none" /></pattern>
        <pattern id={`br${id}`} patternUnits="userSpaceOnUse" x={W - bw} y={bh} width={bw} height={th}><image href={`${B}border/e-right.jpg`} width={bw} height={th} preserveAspectRatio="none" /></pattern>
      </defs>
      <rect x={bw} y={0} width={W - bw * 2} height={bh} fill={`url(#bt${id})`} />
      <rect x={bw} y={H - bh} width={W - bw * 2} height={bh} fill={`url(#bb${id})`} />
      <rect x={0} y={bh} width={bw} height={H - bh * 2} fill={`url(#bl${id})`} />
      <rect x={W - bw} y={bh} width={bw} height={H - bh * 2} fill={`url(#br${id})`} />
      <image href={`${B}border/c-tl.jpg`} x={0} y={0} width={bw} height={bh} preserveAspectRatio="none" />
      <image href={`${B}border/c-tr.jpg`} x={W - bw} y={0} width={bw} height={bh} preserveAspectRatio="none" />
      <image href={`${B}border/c-bl.jpg`} x={0} y={H - bh} width={bw} height={bh} preserveAspectRatio="none" />
      <image href={`${B}border/c-br.jpg`} x={W - bw} y={H - bh} width={bw} height={bh} preserveAspectRatio="none" />
    </svg>
  )
}
