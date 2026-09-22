import { useId, useMemo } from 'react'

/**
 * A wax seal that is actually lit, not painted.
 *
 * The SVG draws a grey-scale HEIGHT MAP — a pale blob (the wax body), a
 * brighter ring (the raised rim where the wax pooled), a darker monogram
 * (pressed in by the stamp) — and the filter turns that into a surface:
 * blurred for a rounded bevel, roughened with a little turbulence, then lit
 * with diffuse + specular lighting from the upper left and coloured with the
 * theme's wax colour. Every highlight and shadow comes from the geometry.
 */
export function WaxSeal({ initials, size = 120, className, style }: { initials: string; size?: number; className?: string; style?: React.CSSProperties }) {
  const uid = useId().replace(/:/g, '')
  const blob = useMemo(() => blobPath(50, 50, 41, 16, 0.9), [])
  const rim = useMemo(() => blobPath(50, 50, 34, 16, 0.9), [])
  const letters = initials.replace(/\s+/g, '').slice(0, 2).split('')
  return (
    <svg className={className} style={style} width={size} height={size} viewBox="0 0 100 100" aria-hidden="true" focusable="false">
      <defs>
        <filter id={`wax${uid}`} x="-25%" y="-25%" width="150%" height="150%" colorInterpolationFilters="sRGB">
          {/* 1. height map from luminance, rounded, with a fine wax grain */}
          <feColorMatrix in="SourceGraphic" type="luminanceToAlpha" result="lum" />
          <feGaussianBlur in="lum" stdDeviation="1.7" result="bevel" />
          <feTurbulence type="fractalNoise" baseFrequency="0.55" numOctaves="2" seed="3" result="noise" />
          <feColorMatrix in="noise" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.06 0" result="grain" />
          <feComposite in="bevel" in2="grain" operator="arithmetic" k2="1" k3="1" result="hmap" />
          {/* 2. a broad dome so the whole seal reads as a mound */}
          <feGaussianBlur in="lum" stdDeviation="9" result="dome" />
          <feComposite in="hmap" in2="dome" operator="arithmetic" k2="0.7" k3="0.45" result="height" />
          {/* 3. lighting */}
          <feDiffuseLighting in="height" surfaceScale="7" diffuseConstant="1" result="diff" style={{ lightingColor: '#ffffff' }}>
            <feDistantLight azimuth="230" elevation="42" />
          </feDiffuseLighting>
          <feComponentTransfer in="diff" result="diffLift">
            <feFuncR type="linear" slope="0.72" intercept="0.28" />
            <feFuncG type="linear" slope="0.72" intercept="0.28" />
            <feFuncB type="linear" slope="0.72" intercept="0.28" />
          </feComponentTransfer>
          <feSpecularLighting in="height" surfaceScale="7" specularConstant="0.75" specularExponent="26" result="spec" style={{ lightingColor: 'var(--wax-hot)' }}>
            <feDistantLight azimuth="230" elevation="46" />
          </feSpecularLighting>
          {/* 4. colour and compose */}
          <feFlood result="colour" style={{ floodColor: 'var(--wax)' }} />
          <feComposite in="colour" in2="SourceAlpha" operator="in" result="body" />
          <feComposite in="body" in2="diffLift" operator="arithmetic" k1="1" result="shaded" />
          <feComposite in="spec" in2="SourceAlpha" operator="in" result="specIn" />
          <feComposite in="shaded" in2="specIn" operator="arithmetic" k2="1" k3="0.9" result="lit" />
          <feComposite in="lit" in2="SourceAlpha" operator="in" />
        </filter>
      </defs>

      <g filter={`url(#wax${uid})`}>
        {/* body */}
        <path d={blob} fill="#c9c9c9" />
        {/* the pooled rim, slightly raised */}
        <path d={rim} fill="none" stroke="#eeeeee" strokeWidth="3.2" />
        {/* stamped field, a touch lower than the rim */}
        <path d={rim} fill="#bdbdbd" />
        {/* monogram, pressed in — the book face survives the relief; a Didone's hairlines don't */}
        <g style={{ fontFamily: 'var(--font-body)', fontWeight: 500, fontSize: 36, letterSpacing: '0.02em' }} textAnchor="middle">
          <text x="50" y="63" fill="#5c5c5c">
            {letters[0]}<tspan style={{ fontStyle: 'italic', fontSize: 22 }} dy="-2">&amp;</tspan><tspan dy="2">{letters[1] || ''}</tspan>
          </text>
        </g>
        {/* ring of stamped dots */}
        <circle cx="50" cy="51" r="25.5" fill="none" stroke="#8a8a8a" strokeWidth="0.9" strokeDasharray="0.7 2.3" />
      </g>
    </svg>
  )
}

/** Deterministic wobbly circle made of smooth quadratic segments. */
function blobPath(cx: number, cy: number, r: number, n: number, seed: number) {
  const pts: [number, number][] = []
  let s = seed
  const rand = () => { s = (s * 9301 + 49297) % 233280; return s / 233280 }
  for (let i = 0; i < n; i++) {
    const a = (i / n) * Math.PI * 2
    const rr = r * (1 + (rand() - 0.5) * 0.14)
    pts.push([cx + rr * Math.cos(a), cy + rr * Math.sin(a)])
  }
  let d = ''
  for (let i = 0; i < n; i++) {
    const p0 = pts[i], p1 = pts[(i + 1) % n]
    const mx = (p0[0] + p1[0]) / 2, my = (p0[1] + p1[1]) / 2
    if (i === 0) d += `M ${mx.toFixed(2)} ${my.toFixed(2)} `
    const p2 = pts[(i + 2) % n]
    const nx = (p1[0] + p2[0]) / 2, ny = (p1[1] + p2[1]) / 2
    d += `Q ${p1[0].toFixed(2)} ${p1[1].toFixed(2)} ${nx.toFixed(2)} ${ny.toFixed(2)} `
  }
  return d + 'Z'
}
