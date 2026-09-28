/**
 * Background music. One shared <audio> element, created up front so that the
 * envelope tap can start it synchronously (iOS only allows audio that begins
 * inside the tap itself). Fades in, loops, and can be toggled.
 */
let el: HTMLAudioElement | null = null
const TARGET = 0.55

export function initMusic(url: string) {
  if (el || !url || typeof Audio === 'undefined') return el
  const src = /^(https?:)?\//.test(url) ? url : `${import.meta.env.BASE_URL}${url}`
  el = new Audio(src)
  el.loop = true
  el.preload = 'auto'
  el.volume = 0
  watchVisibility()
  return el
}

/**
 * Stop when the guest leaves the page (switches app, locks the phone, closes
 * the tab) and pick up again if they come back to it.
 */
let resumeOnReturn = false
function watchVisibility() {
  const leave = () => {
    if (el && !el.paused) { resumeOnReturn = true; el.pause() }
  }
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) leave()
    else if (resumeOnReturn && el) { resumeOnReturn = false; playMusic() }
  })
  window.addEventListener('pagehide', leave)
}

export function getMusic() { return el }

function fadeTo(target: number, ms: number) {
  if (!el) return
  const a = el, start = a.volume, t0 = performance.now()
  const step = (t: number) => {
    const k = Math.min(1, (t - t0) / ms)
    a.volume = start + (target - start) * k
    if (k < 1) requestAnimationFrame(step)
  }
  requestAnimationFrame(step)
}

/** Call from inside a tap handler. */
export function playMusic() {
  if (!el) return
  el.volume = 0
  const p = el.play()
  if (p && typeof p.then === 'function') p.then(() => fadeTo(TARGET, 2500)).catch(() => {})
  else fadeTo(TARGET, 2500)
}

export function pauseMusic() { resumeOnReturn = false; el?.pause() }
