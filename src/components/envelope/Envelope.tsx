import { useEffect, useRef, useState } from 'react'
import { animate, motion, useMotionTemplate, useMotionValue, useTransform } from 'motion/react'
import type { InviteContent } from '../../content/types'
import type { Theme } from '../../theme/types'
import { WaxSeal } from './WaxSeal'
import { BackPanel, FlapBack, FlapFace, Pocket } from './EnvelopePaper'
import { useTilt } from '../../lib/useTilt'
import { prefersReducedMotion } from '../../lib/motionPrefs'
import './Envelope.css'

type Phase = 'closed' | 'opening' | 'leaving'

const CHIPS = [
  { dx: -22, dy: 70, r: 140, s: 1 },
  { dx: 14, dy: 88, r: -90, s: 0.8 },
  { dx: -6, dy: 96, r: 200, s: 1.1 },
  { dx: 30, dy: 64, r: -160, s: 0.7 },
  { dx: -34, dy: 82, r: 80, s: 0.9 },
]

export function EnvelopeGate({ content, theme, onOpened }: { content: InviteContent; theme: Theme; onOpened: () => void }) {
  const [phase, setPhase] = useState<Phase>('closed')
  const [cracked, setCracked] = useState(false)
  const [pressed, setPressed] = useState(false)
  const [cue, setCue] = useState(false)
  const reduced = useRef(prefersReducedMotion())

  // ── sequence progress ──────────────────────────────────────────────────
  const flap = useMotionValue(0)   // 0 closed → 1 open (spring may overshoot)
  const card = useMotionValue(0)   // 0 inside → 1 out

  // ── lighting / parallax ────────────────────────────────────────────────
  const tilt = useTilt(phase === 'closed')
  const breatheX = useMotionValue(0)
  const breatheY = useMotionValue(0)
  useEffect(() => {
    if (reduced.current) return
    const a = animate(breatheX, [0, 0.9, 0, -0.7, 0], { duration: 14, repeat: Infinity, ease: 'easeInOut' })
    const b = animate(breatheY, [0, -0.6, 0.5, 0], { duration: 11, repeat: Infinity, ease: 'easeInOut' })
    return () => { a.stop(); b.stop() }
  }, [breatheX, breatheY])

  const rotY = useTransform([tilt.x, breatheX], ([tx, bx]) => (tx as number) * 7 + (bx as number))
  const rotX = useTransform([tilt.y, breatheY], ([ty, by]) => -(ty as number) * 6 + (by as number))
  const lx = useTransform(tilt.x, (v) => 30 + v * 22)
  const ly = useTransform(tilt.y, (v) => 20 + v * 18)
  const lxPct = useMotionTemplate`${lx}%`
  const lyPct = useMotionTemplate`${ly}%`
  const goldAngle = useTransform([tilt.x, tilt.y], ([x, y]) => 108 + (x as number) * 40 - (y as number) * 25)
  const goldAngleDeg = useMotionTemplate`${goldAngle}deg`
  const goldPos = useTransform(tilt.x, (v) => 50 + v * 45)
  const goldPosPct = useMotionTemplate`${goldPos}%`
  const groundY = useTransform(card, (p) => Math.max(0, Math.min(p, 1)) * 155)
  const shadowShift = useTransform(tilt.x, (v) => -v * 12)
  const shadowShiftY = useTransform(tilt.y, (v) => -v * 6)
  const groundShadow = useMotionTemplate`translate(calc(-50% + ${shadowShift}px), calc(-55% + ${shadowShiftY}px + ${groundY}%))`

  // ── the open sequence ──────────────────────────────────────────────────

  // The body reacts: it tips back a little as the flap swings over the top,
  // and eases down as the card is drawn out — the way an envelope moves in
  // a hand rather than a rig.
  const rockX = useTransform(flap, (p) => -7 * Math.sin(Math.PI * Math.max(0, Math.min(p, 1))))
  // As the card is drawn out the envelope sinks, so the card ends up in the
  // middle of the screen (its centre lands ~0.2 envelope-heights above the
  // envelope's top; the scene is centred, so we drop it by that much + half).
  const settleY = useTransform(card, (p) => Math.max(0, Math.min(p, 1)) * 62)
  const envTransform = useMotionTemplate`translateY(${settleY}%) rotateX(calc(${rotX}deg + ${rockX}deg)) rotateY(${rotY}deg)`

  // Rotate to exactly 180° so the flap lies flat; any spring overshoot tilts
  // it further back (away from the viewer), never forward into the card.
  const flapRotate = useTransform(flap, (p) => Math.max(0, Math.min(p, 1.08)) * 180)
  // Hinge depth: on the front (+6px) while the flap is still over the pocket,
  // then, once past vertical, well behind the back panel and the card (-16px)
  // so a bounce of a few degrees can never bring the tip in front again.
  const flapZ = useTransform(flap, (p) => {
    const t = Math.max(0, Math.min(1, (p - 0.5) / 0.35))
    const e = t * t * (3 - 2 * t)
    return 6 - 22 * e
  })
  const flapTransform = useMotionTemplate`translateZ(${flapZ}px) rotateX(${flapRotate}deg)`
  const theta = useTransform(flap, (p) => Math.max(0, Math.min(p, 1)) * Math.PI)
  const shadowScale = useTransform(theta, (t) => Math.max(0.02, Math.cos(t)))
  const shadowOpacity = useTransform(theta, (t) => {
    if (t >= Math.PI / 2) return 0
    const s = Math.sin(t)
    return Math.min(0.75, s * 1.6) * (Math.cos(t) > 0.15 ? 1 : Math.cos(t) / 0.15)
  })
  const shadowY = useTransform(theta, (t) => Math.sin(t) * 18)
  const shadowTransform = useMotionTemplate`translateZ(5px) translateY(${shadowY}px) scaleY(${shadowScale})`
  const faceLight = useTransform(theta, (t) => (t < Math.PI / 2 ? Math.pow(Math.sin(t), 1.4) * 0.9 : 0))
  const backShade = useTransform(theta, (t) => (t > Math.PI / 2 ? Math.max(0, 1 - (t - Math.PI / 2) / (Math.PI / 2)) * 0.9 : 1))

  const cardY = useTransform(card, (p) => `${-p * 76}%`)
  const cardScale = useTransform(card, (p) => 1 + p * 0.03)
  const cardTransform = useMotionTemplate`translateZ(2px) translateY(${cardY}) scale(${cardScale})`
  const cardShadow = useTransform(card, (p) => `0 1px 0 rgba(255,255,255,0.7) inset, 0 -1px 0 rgba(0,0,0,0.06) inset, 0 ${10 + p * 26}px ${24 + p * 30}px -${10 - p * 4}px rgba(0,0,0,${0.6 + p * 0.15}), 0 2px 4px rgba(0,0,0,0.25)`)

  useEffect(() => {
    const t = setTimeout(() => setCue(true), 2200)
    return () => clearTimeout(t)
  }, [])

  // lock scroll while the gate is up
  useEffect(() => {
    document.documentElement.classList.add('no-scroll')
    document.body.classList.add('no-scroll')
    return () => { document.documentElement.classList.remove('no-scroll'); document.body.classList.remove('no-scroll') }
  }, [])

  const chipsRef = useRef<HTMLDivElement[]>([])

  function open() {
    if (phase !== 'closed') return
    setPhase('opening')

    if (reduced.current) {
      // cross-fade only
      setTimeout(() => { setPhase('leaving'); onOpened() }, 250)
      return
    }

    // 1. the seal reacts first: micro-compress, then a sharp crack
    setPressed(true)
    setTimeout(() => {
      setPressed(false)
      setCracked(true)
      chipsRef.current.forEach((el, i) => {
        if (!el) return
        const c = CHIPS[i]
        animate(el, { x: [0, c.dx * 0.4, c.dx], y: [0, c.dy * 0.35, c.dy], rotate: [0, c.r], opacity: [1, 1, 0], scale: [c.s, c.s, c.s * 0.8] }, { duration: 0.75, ease: [0.3, 0, 0.9, 0.6], delay: i * 0.02 })
      })
    }, 95)

    // 2–4. the flap lifts as the seal releases; it has mass
    setTimeout(() => {
      animate(flap, 1, { type: 'spring', stiffness: 30, damping: 11.5, mass: 1.8, restDelta: 0.001 })
    }, 240)

    // 5. the card slides up behind the front panel
    setTimeout(() => {
      animate(card, 1, { type: 'spring', stiffness: 58, damping: 13.5, mass: 1.1, restDelta: 0.001 })
    }, 1050)

    // 6. only once the card settles does content fade in — the card is held
    //    for a few seconds so the guest can read it
    setTimeout(() => { setPhase('leaving'); onOpened() }, 5400)
  }

  const names = `${content.couple.first} ${content.couple.joiner} ${content.couple.second}`

  return (
    <motion.div
      className="gate"
      style={{ ['--lx' as string]: lxPct, ['--ly' as string]: lyPct, ['--gold-angle' as string]: goldAngleDeg, ['--gold-pos' as string]: goldPosPct }}
      initial={{ opacity: 1 }}
      animate={phase === 'leaving' ? { opacity: 0 } : { opacity: 1 }}
      transition={{ duration: reduced.current ? 0.9 : 1.1, ease: [0.4, 0, 0.2, 1] }}
      onAnimationComplete={() => { /* unmounted by parent */ }}
    >
      <div className="gate-title">{content.eventLabel} · {content.date.short}</div>

      <div className="gate-inner ground grain">
        <motion.div
          className="scene"
          animate={phase === 'leaving' ? { scale: 1.08, y: -40 } : { scale: 1, y: 0 }}
          transition={{ duration: 1.1, ease: [0.4, 0, 0.2, 1] }}
        >
          <motion.div className="env-ground-shadow" style={{ transform: groundShadow }} />
          <div className="env-ground-shadow-tight" />

          <button
            type="button"
            className="env-button"
            onClick={open}
            aria-label={`Open the invitation from ${names}`}
            disabled={phase !== 'closed'}
          >
            <motion.div className="env" style={{ transform: envTransform }}>
              <div className="env-back"><BackPanel liner={theme.liner} /></div>

              <motion.div className="env-card paper" style={{ transform: cardTransform, boxShadow: cardShadow }}>
                <div className="env-card-inner">
                  <div className="env-card-frame" />
                  <div className="env-card-title letterpress">You are invited</div>
                </div>
              </motion.div>

              <Pocket />

              <motion.div className="env-flap-shadow" style={{ transform: shadowTransform, opacity: shadowOpacity }} />

              <div className="seal-shadow" style={{ opacity: cracked ? 0.9 : 1 }} />

              <motion.div className="env-flap" style={{ transform: flapTransform }}>
                <FlapFace />
                <motion.div className="flap-light" style={{ opacity: faceLight }} />
                <FlapBack liner={theme.liner} />
                <motion.div className="flap-back-shade" style={{ opacity: backShade }} />
                {/* once cracked, the upper half of the seal travels with the flap */}
                {cracked && (
                  <div className="seal-wrap seal-on-flap">
                    <motion.div className="seal-half seal-half-top" initial={{ y: 0, rotate: 0 }} animate={{ y: -1.5, rotate: -1.2 }} transition={{ duration: 0.16, ease: [0.2, 0.9, 0.3, 1] }}>
                      <WaxSeal initials={content.couple.sealInitials} />
                    </motion.div>
                  </div>
                )}
              </motion.div>

              {/* whole seal while intact; after the crack only the lower half stays on the pocket */}
              <div className="seal-wrap seal-on-pocket">
                <motion.div
                  className={cracked ? 'seal-half seal-half-bottom' : 'seal-half'}
                  animate={pressed ? { scale: 0.94, y: 1 } : cracked ? { scale: 1, y: 3, rotate: 1.6, x: 1 } : { scale: 1, y: 0 }}
                  transition={pressed ? { duration: 0.09 } : { duration: 0.18, ease: [0.2, 0.9, 0.3, 1] }}
                >
                  <WaxSeal initials={content.couple.sealInitials} />
                </motion.div>
              </div>

              {cracked && CHIPS.map((_, i) => (
                <div key={i} className="seal-chip" ref={(el) => { if (el) chipsRef.current[i] = el }} />
              ))}
            </motion.div>
          </button>
        </motion.div>
      </div>

      <motion.div className="gate-cue" initial={{ opacity: 0, y: 6 }} animate={cue && phase === 'closed' ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }} transition={{ duration: 1.2, ease: 'easeOut' }}>
        <div className="gate-cue-line" />
        Tap to open
      </motion.div>
    </motion.div>
  )
}
