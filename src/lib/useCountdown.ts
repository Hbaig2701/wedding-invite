import { useEffect, useState } from 'react'

export interface Remaining { days: number; hours: number; minutes: number; seconds: number; past: boolean }

function compute(targetMs: number): Remaining {
  const diff = targetMs - Date.now()
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, past: true }
  const s = Math.floor(diff / 1000)
  return {
    days: Math.floor(s / 86400),
    hours: Math.floor((s % 86400) / 3600),
    minutes: Math.floor((s % 3600) / 60),
    seconds: s % 60,
    past: false,
  }
}

export function useCountdown(iso: string): Remaining {
  const target = new Date(iso).getTime()
  const [r, setR] = useState(() => compute(target))
  useEffect(() => {
    const id = setInterval(() => setR(compute(target)), 1000)
    return () => clearInterval(id)
  }, [target])
  return r
}
