import type { EventKey } from '../content/types'

export interface RsvpPayload {
  event: EventKey
  name: string
  phone: string
  attending: 'yes' | 'no'
  adults: number
  children: number
  /** Names of everyone attending, the respondent first. */
  guests: string[]
  message: string
  submittedAt: string
}

export type RsvpResult = { ok: true } | { ok: false; reason: string }

/**
 * Posts to the Google Apps Script web app. We send text/plain so the browser
 * makes a "simple" request (no CORS preflight, which Apps Script can't answer).
 * Apps Script replies through a redirect that fetch follows automatically.
 *
 * An empty endpoint means demo mode: we pretend it worked after a short wait
 * so the confirmation state can be seen before the Sheet is wired up.
 */
export async function submitRsvp(endpoint: string, payload: RsvpPayload, timeoutMs = 15000): Promise<RsvpResult> {
  if (!endpoint) {
    await new Promise((r) => setTimeout(r, 1400))
    return { ok: true }
  }
  const controller = typeof AbortController !== 'undefined' ? new AbortController() : null
  const timer = controller ? setTimeout(() => controller.abort(), timeoutMs) : null
  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify(payload),
      signal: controller?.signal,
      redirect: 'follow',
    })
    if (!res.ok) return { ok: false, reason: `HTTP ${res.status}` }
    // The script returns {"ok":true}. If the body can't be read (opaque
    // redirect on some WebViews) we still treat a 2xx as success.
    try {
      const data = await res.json()
      if (data && data.ok === false) return { ok: false, reason: String(data.error || 'rejected') }
    } catch { /* ignore */ }
    return { ok: true }
  } catch (e) {
    return { ok: false, reason: e instanceof Error ? e.message : 'network' }
  } finally {
    if (timer) clearTimeout(timer)
  }
}

/** Keep only digits; guests type numbers in every imaginable format. */
export function normalisePhone(raw: string) {
  let digits = raw.replace(/[^\d]/g, '')
  if (digits.startsWith('00')) digits = digits.slice(2)
  // Pakistani local format 03xx… → 923xx…
  if (digits.length === 11 && digits.startsWith('03')) digits = '92' + digits.slice(1)
  return digits
}

export function whatsappUrl(number: string, text: string) {
  return `https://wa.me/${number}?text=${encodeURIComponent(text)}`
}
