/**
 * A wildflower border in the manner of a watercolour meadow: lavender spikes,
 * cosmos, golden daisies, little white blossoms, poppies, wheat and grasses on
 * thin green stems. Soft fills, muted colours, nothing heavy.
 */
const C = {
  stem: '#7d8b5c', leaf: '#8fa17a', leafDeep: '#6a7d55',
  lavender: '#9b86ad', lavenderDeep: '#7a668f',
  pink: '#e2a7b1', pinkDeep: '#c77f8f', burgundy: '#8a2f43',
  gold: '#d9a24a', goldDeep: '#b8802e',
  white: '#fbf7ec', whiteEdge: '#d9cdb4',
  center: '#5a2431',
}

function Stem({ x, top, lean = 0, leaves = 2 }: { x: number; top: number; lean?: number; leaves?: number }) {
  const cx = x + lean
  return (
    <g>
      <path d={`M${x} 118 C ${x} ${118 - (118 - top) * 0.45}, ${cx} ${118 - (118 - top) * 0.7}, ${cx} ${top}`} fill="none" stroke={C.stem} strokeWidth="1" strokeLinecap="round" />
      {Array.from({ length: leaves }).map((_, i) => {
        const t = 0.35 + i * 0.22
        const y = 118 - (118 - top) * t
        const lx = x + lean * t
        const dir = i % 2 ? 1 : -1
        return <path key={i} d={`M${lx} ${y} q ${9 * dir} -7 ${14 * dir} -2 q -6 5 -14 2z`} fill={C.leaf} stroke={C.leafDeep} strokeWidth="0.4" opacity="0.9" />
      })}
    </g>
  )
}

function Cosmos({ x, y, s = 1, tone = 'pink' }: { x: number; y: number; s?: number; tone?: 'pink' | 'burgundy' }) {
  const fill = tone === 'pink' ? C.pink : C.burgundy
  const edge = tone === 'pink' ? C.pinkDeep : C.center
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => (
        <path key={a} d="M0 0 C -3.5 -4, -3.5 -10, 0 -12 C 3.5 -10, 3.5 -4, 0 0z" transform={`rotate(${a})`} fill={fill} stroke={edge} strokeWidth="0.45" opacity="0.92" />
      ))}
      <circle r="2.4" fill={C.gold} />
      <circle r="1.2" fill={C.center} opacity="0.7" />
    </g>
  )
}

function Daisy({ x, y, s = 1, tone = 'gold' }: { x: number; y: number; s?: number; tone?: 'gold' | 'white' }) {
  const fill = tone === 'gold' ? C.gold : C.white
  const edge = tone === 'gold' ? C.goldDeep : C.whiteEdge
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      {Array.from({ length: 12 }).map((_, i) => (
        <ellipse key={i} cx="0" cy="-6.5" rx="1.7" ry="5" transform={`rotate(${i * 30})`} fill={fill} stroke={edge} strokeWidth="0.4" />
      ))}
      <circle r="2.6" fill={tone === 'gold' ? C.center : C.gold} />
    </g>
  )
}

function Lavender({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      {Array.from({ length: 9 }).map((_, i) => (
        <ellipse key={i} cx={i % 2 ? 2.6 : -2.6} cy={i * 3.6} rx="2.4" ry="3" fill={i % 3 ? C.lavender : C.lavenderDeep} opacity="0.9" />
      ))}
      <ellipse cx="0" cy="-2" rx="1.6" ry="2.4" fill={C.lavenderDeep} />
    </g>
  )
}

function Poppy({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M-9 -2 C -11 -12, -4 -16, 0 -12 C 4 -16, 11 -12, 9 -2 C 6 4, -6 4, -9 -2z" fill={C.burgundy} opacity="0.9" />
      <path d="M-6 -3 C -6 -10, -2 -12, 0 -9 C 2 -12, 6 -10, 6 -3 C 4 1, -4 1, -6 -3z" fill={C.pinkDeep} opacity="0.7" />
      <circle cy="-4" r="1.6" fill={C.center} />
    </g>
  )
}

function Wheat({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      {Array.from({ length: 7 }).map((_, i) => (
        <g key={i}>
          <ellipse cx={-2.2} cy={i * 3.2} rx="1.4" ry="2.6" transform={`rotate(-20 -2.2 ${i * 3.2})`} fill={C.gold} opacity="0.85" />
          <ellipse cx={2.2} cy={i * 3.2} rx="1.4" ry="2.6" transform={`rotate(20 2.2 ${i * 3.2})`} fill={C.goldDeep} opacity="0.8" />
        </g>
      ))}
    </g>
  )
}

function Bud({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M0 -8 q 4 3 3 9 q -3 3 -6 0 q -1 -6 3 -9z" fill={C.pinkDeep} stroke={C.burgundy} strokeWidth="0.4" />
      <path d="M-3.5 1 q 3.5 -2 7 0 q -3.5 4 -7 0z" fill={C.leaf} />
    </g>
  )
}

export function Wildflowers({ className = '', flip = false }: { className?: string; flip?: boolean }) {
  return (
    <svg className={className} viewBox="0 0 416 122" aria-hidden="true" focusable="false" style={{ transform: flip ? 'scaleY(-1)' : undefined }}>
      {/* stems first, blooms on top, so heads overlap naturally */}
      <Stem x={22} top={64} lean={-4} />
      <Stem x={44} top={34} lean={3} leaves={3} />
      <Stem x={66} top={78} lean={-3} />
      <Stem x={90} top={52} lean={5} />
      <Stem x={114} top={30} lean={-4} leaves={3} />
      <Stem x={138} top={70} lean={4} />
      <Stem x={160} top={44} lean={-5} />
      <Stem x={184} top={82} lean={3} leaves={1} />
      <Stem x={208} top={26} lean={0} leaves={3} />
      <Stem x={232} top={60} lean={-4} />
      <Stem x={256} top={40} lean={5} />
      <Stem x={280} top={76} lean={-3} leaves={1} />
      <Stem x={304} top={32} lean={4} leaves={3} />
      <Stem x={328} top={58} lean={-5} />
      <Stem x={352} top={46} lean={3} />
      <Stem x={374} top={80} lean={-4} leaves={1} />
      <Stem x={396} top={38} lean={4} leaves={3} />
      {/* grasses */}
      {[34, 126, 196, 268, 340, 386].map((gx) => (
        <g key={gx} stroke={C.stem} strokeWidth="0.8" strokeLinecap="round" fill="none" opacity="0.8">
          <path d={`M${gx} 118 q -6 -22 -10 -34`} /><path d={`M${gx} 118 q 5 -20 9 -30`} /><path d={`M${gx} 118 q -1 -24 3 -38`} />
        </g>
      ))}
      {/* blooms */}
      <Daisy x={18} y={64} s={0.9} tone="white" />
      <Lavender x={47} y={34} />
      <Cosmos x={63} y={78} s={0.95} />
      <Poppy x={95} y={52} />
      <Wheat x={110} y={30} />
      <Daisy x={142} y={70} s={1} />
      <Cosmos x={155} y={44} s={1.1} tone="burgundy" />
      <Bud x={187} y={82} s={1.1} />
      <Lavender x={208} y={26} s={1.1} />
      <Cosmos x={228} y={60} s={1} />
      <Daisy x={261} y={40} s={0.85} tone="white" />
      <Bud x={277} y={76} />
      <Wheat x={308} y={32} />
      <Poppy x={323} y={58} s={0.9} />
      <Daisy x={355} y={46} s={0.95} />
      <Cosmos x={370} y={80} s={0.85} tone="burgundy" />
      <Lavender x={400} y={38} s={0.9} />
    </svg>
  )
}
