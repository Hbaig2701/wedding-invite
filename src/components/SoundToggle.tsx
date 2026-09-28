import { useEffect, useState } from 'react'
import { getMusic, pauseMusic, playMusic } from '../lib/music'

/** A small button to pause or resume the background music. */
export function SoundToggle() {
  const [on, setOn] = useState(false)
  useEffect(() => {
    const a = getMusic(); if (!a) return
    const sync = () => setOn(!a.paused)
    a.addEventListener('play', sync); a.addEventListener('pause', sync)
    sync()
    return () => { a.removeEventListener('play', sync); a.removeEventListener('pause', sync) }
  }, [])
  if (!getMusic()) return null
  return (
    <button type="button" className="sound-toggle" onClick={() => (on ? pauseMusic() : playMusic())} aria-pressed={on} aria-label={on ? 'Pause music' : 'Play music'}>
      {on ? (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="M4 9v6h4l5 4V5L8 9H4z" fill="currentColor"/><path d="M16 8.5a5 5 0 0 1 0 7M18.5 6a8.5 8.5 0 0 1 0 12"/></svg>
      ) : (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="M4 9v6h4l5 4V5L8 9H4z" fill="currentColor"/><path d="M17 9l4 6M21 9l-4 6"/></svg>
      )}
    </button>
  )
}
