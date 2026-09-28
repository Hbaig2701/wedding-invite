/**
 * The envelope's paper surfaces, drawn as SVG so every facet can carry its own
 * gradient (lit side warmer, shadow side cooler), an embossed lattice, a
 * lighter cut edge, a cast shadow and grain — and still be a single "leaf"
 * element that the 3D transforms can move without flattening.
 */

/** Laid paper: fine chain lines, a soft fibre mottle, and grain. */
function Laid({ id }: { id: string }) {
  return (
    <>
      <pattern id={`${id}-lines`} width="6" height="6" patternUnits="userSpaceOnUse">
        <rect width="6" height="6" fill="none" />
        <path d="M0 3 H6" stroke="#000" strokeWidth="0.6" opacity="0.045" />
        <path d="M0 3.7 H6" stroke="#fff" strokeWidth="0.5" opacity="0.06" />
      </pattern>
      <filter id={`${id}-fibre`} x="0" y="0" width="100%" height="100%">
        <feTurbulence type="fractalNoise" baseFrequency="0.012 0.05" numOctaves="3" seed="6" stitchTiles="stitch" />
        <feColorMatrix values="0 0 0 0 0.35  0 0 0 0 0.28  0 0 0 0 0.15  0 0 0 0.10 0" />
        <feComposite in2="SourceGraphic" operator="in" />
      </filter>
    </>
  )
}

function Grain({ id }: { id: string }) {
  return (
    <filter id={id} x="0" y="0" width="100%" height="100%">
      <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="9" stitchTiles="stitch" />
      <feColorMatrix values="0 0 0 0 0.5  0 0 0 0 0.5  0 0 0 0 0.5  0 0 0 0.22 0" />
      <feComposite in2="SourceGraphic" operator="in" />
    </filter>
  )
}

function Marble({ id, a, b }: { id: string; a: string; b: string }) {
  return (
    <>
      <filter id={id} x="-10%" y="-10%" width="120%" height="120%">
        <feTurbulence type="turbulence" baseFrequency="0.011 0.028" numOctaves="3" seed="2" result="t" />
        <feDisplacementMap in="SourceGraphic" in2="t" scale="70" xChannelSelector="R" yChannelSelector="G" />
      </filter>
      <linearGradient id={`${id}-stripes`} x1="0" y1="0" x2="0" y2="1" spreadMethod="repeat">
        <stop offset="0" stopColor={a} />
        <stop offset="0.35" stopColor={b} />
        <stop offset="0.5" stopColor="var(--gold-light)" />
        <stop offset="0.56" stopColor={a} />
        <stop offset="0.8" stopColor={b} />
        <stop offset="1" stopColor={a} />
      </linearGradient>
    </>
  )
}

/** Illuminated endpaper: the same rosette tile as the page border, on rose. */
function FloralLiner({ id }: { id: string }) {
  return (
    <pattern id={id} width="60" height="60" patternUnits="userSpaceOnUse" viewBox="0 0 52 52">
      <rect width="52" height="52" fill="var(--env-liner-a)" />
      <path d="M0 26 C 8 18, 14 18, 26 26 S 44 34, 52 26 M0 26 C 8 34, 14 34, 26 26 S 44 18, 52 26" fill="none" stroke="var(--gold-dark)" strokeWidth="0.8" />
      <g fill="var(--leaf)" stroke="var(--leaf-deep)" strokeWidth="0.4">
        <path d="M9 20 q 4 -6 8 0 q -4 6 -8 0z" /><path d="M35 32 q 4 -6 8 0 q -4 6 -8 0z" /><path d="M9 32 q 4 6 8 0 q -4 -6 -8 0z" /><path d="M35 20 q 4 6 8 0 q -4 -6 -8 0z" />
      </g>
      <g transform="translate(26 26)">
        {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => (<ellipse key={a} cx="0" cy="-7.2" rx="3.1" ry="5.6" transform={`rotate(${a})`} fill="var(--paper)" stroke="var(--gold-dark)" strokeWidth="0.55" />))}
        <circle r="3.6" fill="var(--env-liner-b)" /><circle r="1.4" fill="var(--gold-light)" />
      </g>
      <g fill="var(--env-liner-b)"><circle cx="26" cy="6" r="1" /><circle cx="26" cy="46" r="1" /><circle cx="4" cy="26" r="1" /><circle cx="48" cy="26" r="1" /></g>
    </pattern>
  )
}

export function BackPanel({ liner = 'marble' }: { liner?: 'marble' | 'floral' | 'plain' }) {
  return (
    <svg viewBox="0 0 1000 720" preserveAspectRatio="none" aria-hidden="true" focusable="false">
      <defs>
        <Marble id="marbleBack" a="var(--env-liner-a)" b="var(--env-liner-b)" />
        <FloralLiner id="floralBack" />
        <Grain id="grainBack" />
      </defs>
      <rect width="1000" height="720" fill="var(--env-liner-b)" />
      {liner === 'plain' ? (
        <rect width="1000" height="720" fill="var(--env-shadow)" />
      ) : liner === 'floral' ? (
        <rect width="1000" height="720" fill="url(#floralBack)" />
      ) : (
        <g filter="url(#marbleBack)">
          <rect x="-100" y="-100" width="1200" height="920" fill="url(#marbleBack-stripes)" style={{ transform: 'scaleY(0.12)', transformOrigin: '0 0' }} />
        </g>
      )}
      <rect width="1000" height="720" fill="#fff" filter="url(#grainBack)" opacity="0.6" style={{ mixBlendMode: 'multiply' }} />
      <rect width="1000" height="720" fill="url(#backLight)" />
      <defs>
        <radialGradient id="backLight" cx="30%" cy="10%" r="90%">
          <stop offset="0" stopColor="#fff" stopOpacity="0.16" />
          <stop offset="0.5" stopColor="#000" stopOpacity="0.05" />
          <stop offset="1" stopColor="#000" stopOpacity="0.5" />
        </radialGradient>
      </defs>
    </svg>
  )
}

export function Pocket() {
  const L = '0,0 500,372 0,720'
  const R = '1000,0 1000,720 500,372'
  const B = '0,720 1000,720 500,330'
  return (
    <svg className="env-pocket" viewBox="0 0 1000 720" preserveAspectRatio="none" aria-hidden="true" focusable="false">
      <defs>
        <Laid id="laidP" />
        <Grain id="grainP" />
        <linearGradient id="pLeft" x1="0" y1="0" x2="1" y2="0.6">
          <stop offset="0" stopColor="var(--env-lit)" />
          <stop offset="0.6" stopColor="var(--env)" />
          <stop offset="1" stopColor="var(--env-shadow)" />
        </linearGradient>
        <linearGradient id="pRight" x1="1" y1="0" x2="0" y2="0.7">
          <stop offset="0" stopColor="var(--env)" />
          <stop offset="0.5" stopColor="var(--env)" />
          <stop offset="1" stopColor="var(--env-shadow)" />
        </linearGradient>
        <linearGradient id="pBottom" x1="0.15" y1="0" x2="0.85" y2="1">
          <stop offset="0" stopColor="var(--env)" />
          <stop offset="0.4" stopColor="var(--env-lit)" />
          <stop offset="1" stopColor="var(--env)" />
        </linearGradient>
        {/* the side flaps lie on the liner; the bottom flap lies on the side flaps */}
        <filter id="pShadowSide" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="2" stdDeviation="2.5" floodColor="#2a1a08" floodOpacity="0.35" />
        </filter>
        <filter id="pShadowBottom" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="-3" stdDeviation="5" floodColor="#2a1a08" floodOpacity="0.32" />
        </filter>
        <clipPath id="pClip">
          <polygon points={L} /><polygon points={R} /><polygon points={B} />
        </clipPath>
        <radialGradient id="pLight" cx="28%" cy="12%" r="95%">
          <stop offset="0" stopColor="#fff6dc" stopOpacity="0.28" />
          <stop offset="0.45" stopColor="#fff6dc" stopOpacity="0.05" />
          <stop offset="1" stopColor="#1a1008" stopOpacity="0.22" />
        </radialGradient>
        <radialGradient id="pBulge" cx="50%" cy="46%" r="55%">
          <stop offset="0" stopColor="#fff" stopOpacity="0.10" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
      </defs>
      {/* side flaps */}
      <g filter="url(#pShadowSide)">
        <polygon points={L} fill="url(#pLeft)" />
        <polygon points={R} fill="url(#pRight)" />
      </g>
      <polygon points={R} fill="#0a1a2a" opacity="0.06" />
      {/* bottom flap over the sides, casting up onto them */}
      <g filter="url(#pShadowBottom)">
        <polygon points={B} fill="url(#pBottom)" />
      </g>
      {/* crease shading along the seams: dark on the tucked side, light on the fold */}
      <g clipPath="url(#pClip)">
        <polyline points="0,0 500,372" fill="none" stroke="#000" strokeWidth="6" opacity="0.06" />
        <polyline points="1000,0 500,372" fill="none" stroke="#000" strokeWidth="6" opacity="0.08" />
        <polyline points="0,720 500,330 1000,720" fill="none" stroke="#fff" strokeWidth="2" opacity="0.5" />
        <polyline points="0,720 500,330 1000,720" fill="none" stroke="#000" strokeWidth="3" opacity="0.07" transform="translate(0 -3)" />
        <polyline points="0,0 500,372 0,720" fill="none" stroke="var(--env-edge)" strokeWidth="1.4" opacity="0.6" />
        <polyline points="1000,0 500,372 1000,720" fill="none" stroke="var(--env-edge)" strokeWidth="1.2" opacity="0.35" />
      </g>
      {/* the card inside pushes the paper out very slightly */}
      <rect width="1000" height="720" clipPath="url(#pClip)" fill="url(#pBulge)" />
      {/* laid texture */}
      <rect width="1000" height="720" clipPath="url(#pClip)" fill="url(#laidP-lines)" />
      <rect width="1000" height="720" clipPath="url(#pClip)" fill="#fff" filter="url(#laidP-fibre)" style={{ mixBlendMode: 'multiply' }} />
      {/* one light from the upper left across everything */}
      <rect width="1000" height="720" clipPath="url(#pClip)" fill="url(#pLight)" />
      <rect width="1000" height="720" clipPath="url(#pClip)" fill="#fff" filter="url(#grainP)" style={{ mixBlendMode: 'multiply' }} opacity="0.55" />
      {/* the cut outer edge of the envelope */}
      <path d="M0.75 719 V0.75 H999" fill="none" stroke="#fff" strokeWidth="1.5" opacity="0.7" />
      <path d="M999.25 1 V719.25 H1" fill="none" stroke="#3a2a10" strokeWidth="1.5" opacity="0.35" />
    </svg>
  )
}

export function FlapFace() {
  return (
    <svg className="flap-face" viewBox="0 0 1000 430" preserveAspectRatio="none" aria-hidden="true" focusable="false">
      <defs>
        <Laid id="laidF" />
        <Grain id="grainF" />
        <linearGradient id="fFace" x1="0.1" y1="0" x2="0.9" y2="1">
          <stop offset="0" stopColor="var(--env-lit)" />
          <stop offset="0.55" stopColor="var(--env)" />
          <stop offset="1" stopColor="var(--env-shadow)" />
        </linearGradient>
        <linearGradient id="fCrease" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0.5" />
          <stop offset="0.5" stopColor="#fff" stopOpacity="0.08" />
          <stop offset="1" stopColor="#000" stopOpacity="0.10" />
        </linearGradient>
        <filter id="fShadow" x="-10%" y="-10%" width="120%" height="130%">
          <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#2a1a08" floodOpacity="0.38" />
        </filter>
        <clipPath id="fClip"><polygon points="0,0 1000,0 500,430" /></clipPath>
      </defs>
      <g filter="url(#fShadow)">
        <polygon points="0,0 1000,0 500,430" fill="url(#fFace)" />
      </g>
      <g clipPath="url(#fClip)">
        <rect width="1000" height="430" fill="url(#laidF-lines)" />
        <rect width="1000" height="430" fill="#fff" filter="url(#laidF-fibre)" style={{ mixBlendMode: 'multiply' }} />
        {/* the fold: a lighter band where the paper bends */}
        <rect x="0" y="0" width="1000" height="26" fill="url(#fCrease)" />
      </g>
      {/* cut edge (paper thickness) */}
      <polyline points="0,0 500,430 1000,0" fill="none" stroke="var(--env-edge)" strokeWidth="2" opacity="0.7" />
      <polyline points="0,0 500,430 1000,0" fill="none" stroke="#000" strokeWidth="1.2" opacity="0.18" transform="translate(0 2)" />
      <rect width="1000" height="430" clipPath="url(#fClip)" fill="#fff" filter="url(#grainF)" style={{ mixBlendMode: 'multiply' }} opacity="0.55" />
    </svg>
  )
}

export function FlapBack({ liner = 'marble' }: { liner?: 'marble' | 'floral' | 'plain' }) {
  return (
    <svg className="flap-back" viewBox="0 0 1000 430" preserveAspectRatio="none" aria-hidden="true" focusable="false">
      <defs>
        <Marble id="marbleFlap" a="var(--env-liner-a)" b="var(--env-liner-b)" />
        <FloralLiner id="floralFlap" />
        <Grain id="grainFB" />
        <clipPath id="fbClip"><polygon points="0,430 1000,430 500,0" /></clipPath>
      </defs>
      <polygon points="0,430 1000,430 500,0" fill="var(--env-liner-b)" />
      <g clipPath="url(#fbClip)">
        {liner === 'plain' ? (
          <rect width="1000" height="430" fill="var(--env)" />
        ) : liner === 'floral' ? (
          <rect width="1000" height="430" fill="url(#floralFlap)" />
        ) : (
          <g filter="url(#marbleFlap)">
            <rect x="-100" y="-100" width="1200" height="640" fill="url(#marbleFlap-stripes)" style={{ transform: 'scaleY(0.1)', transformOrigin: '0 0' }} />
          </g>
        )}
      </g>
      {/* paper border of the flap around the liner */}
      <polygon points="0,430 1000,430 500,0" fill="none" stroke="var(--env)" strokeWidth="26" clipPath="url(#fbClip)" />
      <polygon points="0,430 1000,430 500,0" fill="none" stroke="var(--env-edge)" strokeWidth="2" opacity="0.5" />
      <polygon points="0,430 1000,430 500,0" fill="#fff" filter="url(#grainFB)" style={{ mixBlendMode: 'multiply' }} opacity="0.7" />
    </svg>
  )
}
