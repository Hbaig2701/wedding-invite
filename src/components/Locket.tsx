/**
 * An open heart locket, drawn in fine ink: a bow, a ring, and two hearts
 * joined at a single hinge, with the couple's initials. Everything hangs on
 * one centre line, so the ribbon holds the lockets by their hinge.
 */
const HEART = 'M0 26 C -30 8, -38 -18, -20 -28 C -9 -34, 0 -24, 0 -16 C 0 -24, 9 -34, 20 -28 C 38 -18, 30 8, 0 26 Z'

function Heart({ x, y, r, letter }: { x: number; y: number; r: number; letter: string }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${r})`}>
      <path d={HEART} />
      <path d={HEART} transform="scale(0.82) translate(0 -1)" strokeWidth="1.2" />
      <text x="0" y="9" textAnchor="middle" transform={`rotate(${-r})`} className="locket-letter">{letter}</text>
    </g>
  )
}

export function Locket({ left, right, className = '' }: { left: string; right: string; className?: string }) {
  const cx = 120
  return (
    <svg className={`locket ${className}`} viewBox="0 0 240 142" role="img" aria-label={`Locket with the initials ${left} and ${right}`}>
      <g fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
        {/* bow */}
        <path d={`M${cx} 22 C ${cx - 18} 6, ${cx - 42} 4, ${cx - 46} 14 C ${cx - 50} 24, ${cx - 28} 28, ${cx} 22`} />
        <path d={`M${cx - 4} 21 C ${cx - 20} 14, ${cx - 34} 13, ${cx - 39} 17`} strokeWidth="1" />
        <path d={`M${cx} 22 C ${cx + 18} 4, ${cx + 44} 2, ${cx + 48} 12 C ${cx + 52} 22, ${cx + 28} 28, ${cx} 22`} />
        <path d={`M${cx + 4} 21 C ${cx + 20} 14, ${cx + 34} 12, ${cx + 40} 15`} strokeWidth="1" />
        <ellipse cx={cx} cy={23} rx="5" ry="4" />
        <path d={`M${cx - 3} 26 C ${cx - 10} 36, ${cx - 22} 40, ${cx - 32} 42 C ${cx - 38} 44, ${cx - 42} 48, ${cx - 44} 52`} />
        <path d={`M${cx + 3} 26 C ${cx + 10} 36, ${cx + 22} 38, ${cx + 32} 40 C ${cx + 38} 42, ${cx + 42} 46, ${cx + 44} 50`} />
        {/* the cord straight down to the ring */}
        <path d={`M${cx} 27 L ${cx} 52`} strokeWidth="1.3" />
        <ellipse cx={cx} cy={60} rx="5" ry="7.5" />
        {/* ring to hinge */}
        <path d={`M${cx} 67.5 L ${cx} 82`} strokeWidth="1.3" />
        {/* hearts, meeting at the hinge */}
        <Heart x={cx - 33} y={112} r={-16} letter={left} />
        <Heart x={cx + 33} y={112} r={16} letter={right} />
        {/* the shared hinge, drawn over both edges */}
        <rect x={cx - 4} y={84} width={8} height={22} rx={4} fill="var(--paper, #faf1d2)" />
        <path d={`M${cx - 4} 91 L ${cx + 4} 91 M${cx - 4} 99 L ${cx + 4} 99`} strokeWidth="1" />
      </g>
    </svg>
  )
}
