/**
 * An open heart locket, drawn in fine ink: a bow, the bail, and two hinged
 * hearts with the couple's initials in script. After a line-drawn
 * stationery motif.
 */
const HEART = 'M0 26 C -30 8, -38 -18, -20 -28 C -9 -34, 0 -24, 0 -16 C 0 -24, 9 -34, 20 -28 C 38 -18, 30 8, 0 26 Z'

function Heart({ x, y, r, letter }: { x: number; y: number; r: number; letter: string }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${r})`}>
      <path d={HEART} />
      <path d={HEART} transform="scale(0.82) translate(0 -1)" strokeWidth="1.2" />
      <text x="0" y="9" textAnchor="middle" className="locket-letter">{letter}</text>
    </g>
  )
}

export function Locket({ left, right, className = '' }: { left: string; right: string; className?: string }) {
  return (
    <svg className={`locket ${className}`} viewBox="0 0 240 170" role="img" aria-label={`Locket with the initials ${left} and ${right}`}>
      <g fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
        {/* bow */}
        <path d="M160 32 C 142 16, 118 14, 114 24 C 110 34, 132 38, 160 32" />
        <path d="M156 31 C 140 24, 126 23, 121 27" strokeWidth="1" />
        <path d="M160 32 C 178 14, 204 12, 208 22 C 212 32, 188 38, 160 32" />
        <path d="M164 31 C 180 24, 194 22, 200 25" strokeWidth="1" />
        <ellipse cx="160" cy="33" rx="5" ry="4" />
        <path d="M157 36 C 150 46, 138 50, 128 52 C 122 54, 118 58, 116 62" />
        <path d="M163 36 C 170 46, 182 48, 192 50 C 198 52, 202 56, 204 60" />
        {/* bail */}
        <path d="M160 37 L 160 56" strokeWidth="1.2" />
        <ellipse cx="160" cy="63" rx="5" ry="7" />
        {/* hinge */}
        <ellipse cx="121" cy="116" rx="3.6" ry="7" transform="rotate(-8 121 116)" />
        <ellipse cx="121" cy="116" rx="1.6" ry="4.4" transform="rotate(-8 121 116)" strokeWidth="1" />
        {/* hearts */}
        <Heart x={82} y={120} r={-14} letter={left} />
        <Heart x={160} y={112} r={9} letter={right} />
      </g>
    </svg>
  )
}
