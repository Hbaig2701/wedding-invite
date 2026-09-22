import { useEffect, useRef, useState } from 'react'

/** Only rendered when a music URL is configured. Starts after the envelope
 *  opens (the tap counts as the user gesture browsers require). */
export function SoundToggle({ url, start }: { url: string; start: boolean }) {
  const ref = useRef<HTMLAudioElement | null>(null)
  const [on, setOn] = useState(false)
  useEffect(() => {
    if (!start || !ref.current) return
    ref.current.volume = 0.35
    ref.current.play().then(() => setOn(true)).catch(() => setOn(false))
  }, [start])
  function toggle() {
    const a = ref.current; if (!a) return
    if (on) { a.pause(); setOn(false) } else { a.play().then(() => setOn(true)).catch(() => {}) }
  }
  return (
    <>
      <audio ref={ref} src={url} loop preload="none" />
      <button type="button" className="sound-toggle " onClick={toggle} aria-pressed={on} aria-label={on ? 'Pause music' : 'Play music'}>
        {on ? (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="M4 9v6h4l5 4V5L8 9H4z" fill="currentColor"/><path d="M16 8.5a5 5 0 0 1 0 7M18.5 6a8.5 8.5 0 0 1 0 12"/></svg>
        ) : (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="M4 9v6h4l5 4V5L8 9H4z" fill="currentColor"/><path d="M17 9l4 6M21 9l-4 6"/></svg>
        )}
      </button>
    </>
  )
}
