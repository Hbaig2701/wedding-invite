import Lenis from 'lenis'

/**
 * The page's scroll "weight".
 *  • Mouse wheel and trackpad glide with inertia (Lenis). Touch scrolling is
 *    left native, which is what feels right on phones.
 *  • Patterned sections drift slower than the page (parallax), via a CSS
 *    variable each one reads for its background position.
 * Skipped entirely when the guest prefers reduced motion.
 */
export function startScrollFeel(): () => void {
  if (typeof window === 'undefined') return () => {}
  if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return () => {}

  const lenis = new Lenis({ duration: 1.35, easing: (t) => 1 - Math.pow(1 - t, 4), smoothWheel: true, wheelMultiplier: 0.9 })

  const layers = Array.from(document.querySelectorAll<HTMLElement>('[data-parallax]'))
  const update = () => {
    const vh = window.innerHeight
    for (const el of layers) {
      const r = el.getBoundingClientRect()
      if (r.bottom < -200 || r.top > vh + 200) continue
      const k = parseFloat(el.dataset.parallax || '0.25')
      // the pattern drifts against the scroll, so it appears to move slower
      const offset = -(r.top + r.height / 2 - vh / 2) * k
      el.style.setProperty('--py', `${offset.toFixed(1)}px`)
    }
  }
  let raf = 0
  const frame = (time: number) => {
    lenis.raf(time)
    update()
    raf = requestAnimationFrame(frame)
  }
  raf = requestAnimationFrame(frame)
  window.addEventListener('scroll', update, { passive: true })
  update()
  return () => { cancelAnimationFrame(raf); window.removeEventListener('scroll', update); lenis.destroy() }
}
