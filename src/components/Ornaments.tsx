import { useEffect, useId, useRef, useState } from 'react'

/* ─────────────────────────────────────────────────────────────────────────
   Shared SVG defs: the gold-foil gradient (animated, so the specular band
   moves across ornaments) and a bounce-light blur. Render once per page.
   ───────────────────────────────────────────────────────────────────────── */
export function GoldDefs() {
  return (
    <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="goldFoil" x1="0" y1="0" x2="1" y2="1" gradientUnits="objectBoundingBox">
          <stop offset="0" stopColor="var(--gold-deep)" />
          <stop offset="0.16" stopColor="var(--gold-dark)" />
          <stop offset="0.30" stopColor="var(--gold)" />
          <stop offset="0.42" stopColor="var(--gold-light)" />
          <stop offset="0.48" stopColor="var(--gold-hot)" />
          <stop offset="0.55" stopColor="var(--gold-rose)" />
          <stop offset="0.68" stopColor="var(--gold)" />
          <stop offset="0.84" stopColor="var(--gold-dark)" />
          <stop offset="1" stopColor="var(--gold-deep)" />
          <animateTransform attributeName="gradientTransform" type="translate" values="-0.35 0; 0.35 0; -0.35 0" dur="11s" repeatCount="indefinite" calcMode="spline" keySplines="0.45 0 0.55 1; 0.45 0 0.55 1" />
        </linearGradient>
        <linearGradient id="goldFoilV" x1="0" y1="0" x2="0" y2="1" gradientUnits="objectBoundingBox">
          <stop offset="0" stopColor="var(--gold-deep)" />
          <stop offset="0.22" stopColor="var(--gold)" />
          <stop offset="0.45" stopColor="var(--gold-hot)" />
          <stop offset="0.6" stopColor="var(--gold-light)" />
          <stop offset="0.8" stopColor="var(--gold-dark)" />
          <stop offset="1" stopColor="var(--gold-deep)" />
          <animateTransform attributeName="gradientTransform" type="translate" values="0 -0.3; 0 0.3; 0 -0.3" dur="9s" repeatCount="indefinite" calcMode="spline" keySplines="0.45 0 0.55 1; 0.45 0 0.55 1" />
        </linearGradient>
        <filter id="goldGlow" x="-20%" y="-60%" width="140%" height="220%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="2.2" result="b" />
          <feColorMatrix in="b" type="matrix" values="1 0 0 0 0.05  0 1 0 0 0.02  0 0 1 0 -0.1  0 0 0 0.55 0" result="g" />
          <feMerge><feMergeNode in="g" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>
    </svg>
  )
}

/* ───────────────────────── Cusped (multifoil) arch ──────────────────────── */

export function cuspedPath(W: number, H: number, opts: { lobes: number; mirror: boolean; shoulder: number; archWidth: number }) {
  const { lobes, mirror, shoulder, archWidth } = opts
  const aw = W * archWidth            // width of the arch itself
  const ax0 = (W - aw) / 2            // arch left springing x
  const r = aw * 0.56                 // radius of the two arcs of the pointed arch
  const apexH = Math.sqrt(r * r - (aw / 2 - r) * (aw / 2 - r)) // rise of the apex above springing
  const springY = shoulder + apexH    // y of springing line (from the top)

  // sample points along the pointed arch, left springing → apex → right springing
  const pts: [number, number][] = []
  const half = Math.ceil(lobes / 2)
  // left arc: centre (ax0 + r, springY), from angle π to the apex angle
  const cL: [number, number] = [ax0 + r, springY]
  const apexAngle = Math.atan2(-apexH, (ax0 + aw / 2) - cL[0])
  for (let i = 0; i <= half; i++) {
    const t = i / half
    const a = Math.PI + (apexAngle + 2 * Math.PI - Math.PI) * t
    pts.push([cL[0] + r * Math.cos(a), cL[1] + r * Math.sin(a)])
  }
  // right arc: mirror of left
  const leftPts = pts.slice(0, -1)
  const rightPts = leftPts.slice().reverse().map(([x, y]) => [W - x, y] as [number, number])
  const all = [...pts, ...rightPts]

  const lobe = (from: [number, number], to: [number, number]) => {
    const dx = to[0] - from[0], dy = to[1] - from[1]
    const chord = Math.sqrt(dx * dx + dy * dy)
    const rr = (chord / 2) * 1.06
    return `A ${rr.toFixed(2)} ${rr.toFixed(2)} 0 0 1 ${to[0].toFixed(2)} ${to[1].toFixed(2)}`
  }

  const top: string[] = []
  top.push(`L ${ax0.toFixed(2)} ${springY.toFixed(2)}`)
  for (let i = 1; i < all.length; i++) top.push(lobe(all[i - 1], all[i]))
  top.push(`L ${(W).toFixed(2)} ${springY.toFixed(2)}`)

  if (!mirror) {
    return `M 0 ${H} L 0 ${springY.toFixed(2)} ${top.join(' ')} L ${W} ${H} Z`
  }
  // bottom arch = vertical mirror of the top
  const bottom: string[] = []
  const flip = (y: number) => H - y
  const allB = all.slice().reverse()
  bottom.push(`L ${(W - ax0).toFixed(2)} ${flip(springY).toFixed(2)}`)
  for (let i = 1; i < allB.length; i++) {
    const from = allB[i - 1], to = allB[i]
    const dx = to[0] - from[0], dy = flip(to[1]) - flip(from[1])
    const chord = Math.sqrt(dx * dx + dy * dy)
    const rr = (chord / 2) * 1.06
    bottom.push(`A ${rr.toFixed(2)} ${rr.toFixed(2)} 0 0 1 ${to[0].toFixed(2)} ${flip(to[1]).toFixed(2)}`)
  }
  bottom.push(`L 0 ${flip(springY).toFixed(2)}`)
  return `M 0 ${springY.toFixed(2)} ${top.join(' ')} L ${W} ${flip(springY).toFixed(2)} ${bottom.join(' ')} Z`
}

interface ArchProps {
  className?: string
  lobes?: number
  /** width of the arch as a fraction of the box width */
  archWidth?: number
  mirror?: boolean
  double?: boolean
  strokeWidth?: number
  /** 'gold' uses the foil gradient; 'ink' uses currentColor */
  tone?: 'gold' | 'ink'
  opacity?: number
  /** Optional photo, clipped to the cartouche. */
  imageHref?: string
  /** Optional flat interior fill (used behind a placeholder). */
  fill?: string
}

/** A Mughal cartouche: stepped shoulders and a multifoil pointed arch.
 *  The path is rebuilt from the element's real pixel size so lobes are round
 *  regardless of the box's aspect. */
export function CuspedArch({ className, lobes = 9, mirror = true, double = true, strokeWidth = 1.4, tone = 'gold', opacity = 1, archWidth = 0.72, imageHref, fill }: ArchProps) {
  const ref = useRef<SVGSVGElement>(null)
  const [size, setSize] = useState<[number, number]>([400, 600])
  useEffect(() => {
    const el = ref.current; if (!el) return
    const update = () => { const r = el.getBoundingClientRect(); if (r.width > 0 && r.height > 0) setSize([r.width, r.height]) }
    update()
    if (typeof ResizeObserver === 'undefined') { window.addEventListener('resize', update); return () => window.removeEventListener('resize', update) }
    const ro = new ResizeObserver(update); ro.observe(el); return () => ro.disconnect()
  }, [])
  const [W, H] = size
  const d = cuspedPath(W, H, { lobes, mirror, shoulder: 1, archWidth })
  const stroke = tone === 'gold' ? 'url(#goldFoil)' : 'currentColor'
  const id = useId()
  const inset = 7
  return (
    <svg ref={ref} className={className} viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" aria-hidden="true" focusable="false" style={{ opacity }}>
      <defs>
        <filter id={`sh${id}`} x="-5%" y="-5%" width="110%" height="110%">
          <feGaussianBlur stdDeviation="2.4" />
        </filter>
        <clipPath id={`clip${id}`}><path d={d} /></clipPath>
      </defs>
      {fill && <path d={d} fill={fill} />}
      {imageHref && <image href={imageHref} x="0" y="0" width={W} height={H} preserveAspectRatio="xMidYMid slice" clipPath={`url(#clip${id})`} />}
      {tone === 'gold' && (
        <path d={d} fill="none" stroke="var(--gold-light)" strokeWidth={strokeWidth * 2.2} opacity="0.35" filter={`url(#sh${id})`} />
      )}
      <path d={d} fill="none" stroke={stroke} strokeWidth={strokeWidth} />
      {double && (
        <g transform={`translate(${inset} ${inset}) scale(${(W - inset * 2) / W} ${(H - inset * 2) / H})`}>
          <path d={d} fill="none" stroke={stroke} strokeWidth={strokeWidth * 0.55} opacity="0.8" />
        </g>
      )}
    </svg>
  )
}

/* ───────────────────────── Eight-pointed rosette ────────────────────────── */
export function Rosette({ size = 26, className, tone = 'gold' }: { size?: number; className?: string; tone?: 'gold' | 'ink' }) {
  const stroke = tone === 'gold' ? 'url(#goldFoil)' : 'currentColor'
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 40 40" aria-hidden="true" focusable="false">
      <g fill="none" stroke={stroke} strokeWidth="1.1" filter={tone === 'gold' ? 'url(#goldGlow)' : undefined}>
        <rect x="9" y="9" width="22" height="22" />
        <rect x="9" y="9" width="22" height="22" transform="rotate(45 20 20)" />
        <circle cx="20" cy="20" r="4.2" />
      </g>
      <circle cx="20" cy="20" r="1.6" fill={stroke} />
    </svg>
  )
}

/* ───────── A gold rule with tapered ends and a rosette in the middle ────── */
export function Divider({ className = '', tone = 'gold', width = 220 }: { className?: string; tone?: 'gold' | 'ink'; width?: number }) {
  const stroke = tone === 'gold' ? 'url(#goldFoil)' : 'currentColor'
  return (
    <div className={`flex items-center justify-center gap-3 ${className}`} aria-hidden="true">
      <svg width={width / 2 - 20} height="6" viewBox="0 0 100 6" preserveAspectRatio="none">
        <path d="M0 3 L100 3" stroke={stroke} strokeWidth="1" />
        <path d="M0 3 L100 3" stroke={stroke} strokeWidth="2.5" opacity="0.35" filter="url(#goldGlow)" />
      </svg>
      <Rosette size={22} tone={tone} />
      <svg width={width / 2 - 20} height="6" viewBox="0 0 100 6" preserveAspectRatio="none">
        <path d="M0 3 L100 3" stroke={stroke} strokeWidth="1" />
        <path d="M0 3 L100 3" stroke={stroke} strokeWidth="2.5" opacity="0.35" filter="url(#goldGlow)" />
      </svg>
    </div>
  )
}

/* ─────────────── Corner ornament: a quarter-arabesque, four times ────────── */
export function Corner({ className, size = 56, flip = '' }: { className?: string; size?: number; flip?: string }) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 60 60" aria-hidden="true" focusable="false" style={{ transform: flip }}>
      <g fill="none" stroke="url(#goldFoil)" strokeWidth="1.1" strokeLinecap="round" filter="url(#goldGlow)">
        <path d="M2 2 L2 30 M2 2 L30 2" />
        <path d="M6 6 C 6 20, 20 6, 34 20 C 40 26, 30 36, 22 30 C 16 26, 22 18, 28 22" />
        <path d="M6 6 C 20 6, 6 20, 20 34 C 26 40, 36 30, 30 22 C 26 16, 18 22, 22 28" />
        <circle cx="10" cy="10" r="1.6" fill="url(#goldFoil)" stroke="none" />
        <circle cx="38" cy="24" r="1.3" fill="url(#goldFoil)" stroke="none" />
        <circle cx="24" cy="38" r="1.3" fill="url(#goldFoil)" stroke="none" />
      </g>
    </svg>
  )
}
