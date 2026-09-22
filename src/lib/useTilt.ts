import { useEffect } from 'react'
import { useMotionValue, useSpring, type MotionValue } from 'motion/react'
import { prefersReducedMotion } from './motionPrefs'

/**
 * A normalised "where is the light / where is the viewer" pair in [-1, 1].
 * Desktop: pointer position. Mobile: deviceorientation where it works without
 * a permission prompt (Android; iOS needs a gesture-gated request that would
 * interrupt the open, so iOS falls back to touch-move).
 */
export function useTilt(enabled = true): { x: MotionValue<number>; y: MotionValue<number> } {
  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)
  const x = useSpring(rawX, { stiffness: 60, damping: 18, mass: 0.6 })
  const y = useSpring(rawY, { stiffness: 60, damping: 18, mass: 0.6 })

  useEffect(() => {
    if (!enabled || prefersReducedMotion()) return
    const onPointer = (e: PointerEvent | MouseEvent) => {
      const w = window.innerWidth, h = window.innerHeight
      rawX.set(((e.clientX / w) - 0.5) * 2)
      rawY.set(((e.clientY / h) - 0.5) * 2)
    }
    const onTouch = (e: TouchEvent) => {
      const t = e.touches[0]; if (!t) return
      const w = window.innerWidth, h = window.innerHeight
      rawX.set(((t.clientX / w) - 0.5) * 2)
      rawY.set(((t.clientY / h) - 0.5) * 2)
    }
    let base: { beta: number; gamma: number } | null = null
    const onOrient = (e: DeviceOrientationEvent) => {
      if (e.beta == null || e.gamma == null) return
      if (!base) base = { beta: e.beta, gamma: e.gamma }
      const dx = Math.max(-1, Math.min(1, (e.gamma - base.gamma) / 22))
      const dy = Math.max(-1, Math.min(1, (e.beta - base.beta) / 22))
      rawX.set(dx); rawY.set(dy)
    }
    window.addEventListener('pointermove', onPointer, { passive: true })
    window.addEventListener('touchmove', onTouch, { passive: true })
    const DOE = window.DeviceOrientationEvent as unknown as { requestPermission?: () => Promise<string> } | undefined
    const needsPermission = !!(DOE && typeof DOE.requestPermission === 'function')
    if (!needsPermission && 'DeviceOrientationEvent' in window) {
      window.addEventListener('deviceorientation', onOrient, { passive: true })
    }
    return () => {
      window.removeEventListener('pointermove', onPointer)
      window.removeEventListener('touchmove', onTouch)
      window.removeEventListener('deviceorientation', onOrient)
    }
  }, [enabled, rawX, rawY])

  return { x, y }
}
