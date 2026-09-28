import { useState, type FormEvent } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import type { InviteContent } from '../../content/types'
import { normalisePhone, submitRsvp, whatsappUrl, type RsvpPayload } from '../../lib/rsvp'
import { WaxSeal } from '../envelope/WaxSeal'
import { Reveal } from '../Reveal'
import { Locket } from '../Locket'

type Status = 'idle' | 'sending' | 'done' | 'failed'

const WaIcon = () => (<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5.1-1.3A10 10 0 1 0 12 2zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1-.2.2-.6.8-.8 1-.1.2-.3.2-.5.1-.7-.3-1.4-.6-2-1.2-.5-.5-.9-1-1.2-1.6-.1-.2 0-.4.1-.5l.4-.5.2-.4c.1-.2 0-.3 0-.5l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.6.6-.9 1.3-.9 2.1.1.9.4 1.8 1 2.6 1.1 1.6 2.5 2.9 4.2 3.7.5.2 1 .4 1.5.5.5.2 1 .1 1.5 0 .6-.2 1.1-.6 1.4-1.1.1-.3.2-.6.1-.9l-.4-.3z"/></svg>)

export function Rsvp({ content }: { content: InviteContent }) {
  const c = content
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [attending, setAttending] = useState<'yes' | 'no' | ''>('')
  const [count, setCount] = useState(1)   // number of guests, including the respondent
  const [message] = useState('')
  const [status, setStatus] = useState<Status>('idle')
  const [errors, setErrors] = useState<{ name?: string; phone?: string; attending?: string }>({})
  const [last, setLast] = useState<RsvpPayload | null>(null)

  function validate() {
    const e: typeof errors = {}
    if (name.trim().length < 2) e.name = 'Please tell us your name.'
    const p = normalisePhone(phone)
    if (p.length < 9) e.phone = 'Please enter a WhatsApp number we can reach you on.'
    if (!attending) e.attending = 'Please let us know whether you can join us.'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  async function onSubmit(ev: FormEvent) {
    ev.preventDefault()
    if (status === 'sending') return
    if (!validate()) return
    const payload: RsvpPayload = {
      event: c.event,
      name: name.trim(),
      phone: normalisePhone(phone),
      attending: attending as 'yes' | 'no',
      adults: attending === 'yes' ? count : 0,
      children: 0,
      guests: [],
      message: message.trim(),
      submittedAt: new Date().toISOString(),
    }
    setStatus('sending')
    const res = await submitRsvp(c.rsvp.endpoint, payload)
    setLast(payload)
    setStatus(res.ok ? 'done' : 'failed')
  }

  const host = c.contacts[0]
  const waText = last
    ? `Assalamu alaikum, this is ${last.name}. For the ${c.eventLabel} on ${c.date.short}: ${last.attending === 'yes' ? `we joyfully accept — ${last.adults} guest(s).` : 'we regretfully cannot attend.'}${last.message ? ` ${last.message}` : ''}`
    : `Assalamu alaikum, I would like to RSVP for the ${c.eventLabel} on ${c.date.short}.`

  return (
    <section className="rsvp paper paper-edge-top section-paper" id="rsvp" aria-label="RSVP">
      <div className="col">
        <Reveal><div className="section-head"><p className="eyebrow">RSVP</p><h2 className="section-title letterpress">Will you join us?</h2></div></Reveal>
        <Reveal index={1}><p className="rsvp-deadline">{c.rsvp.deadlineLabel}</p></Reveal>

        <AnimatePresence mode="wait" initial={false}>
          {status === 'done' && last ? (
            <motion.div key="done" className="rsvp-done" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.22, 0.61, 0.36, 1] }}>
              <motion.div className="rsvp-done-seal" initial={{ scale: 1.35, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: 'spring', stiffness: 260, damping: 16, delay: 0.15 }}>
                <WaxSeal initials={c.couple.sealInitials} size={112} />
              </motion.div>
              <h3 className="rsvp-done-title letterpress">{last.attending === 'yes' ? c.rsvp.thankYouAccept.title : c.rsvp.thankYouDecline.title}</h3>
              <p className="rsvp-done-body">{last.attending === 'yes' ? c.rsvp.thankYouAccept.body : c.rsvp.thankYouDecline.body}</p>
              <p className="rsvp-done-summary">
                {last.attending === 'yes' ? `${last.name} · ${last.adults} guest${last.adults === 1 ? '' : 's'}` : `${last.name} · Regretfully declined`}
              </p>
              <button type="button" className="rsvp-done-again" onClick={() => setStatus('idle')}>Need to change your response? Submit again.</button>
            </motion.div>
          ) : (
            <motion.form key="form" onSubmit={onSubmit} noValidate initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
              <Reveal index={2}>
                <label className="field">
                  <span className="field-label">Your name</span>
                  <input className="field-input" name="name" autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Full name" />
                  {errors.name && <p className="field-error">{errors.name}</p>}
                </label>
                <label className="field">
                  <span className="field-label">WhatsApp number</span>
                  <input className="field-input" name="phone" type="tel" inputMode="tel" autoComplete="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+92 300 0000000" />
                  {errors.phone && <p className="field-error">{errors.phone}</p>}
                </label>
              </Reveal>

              <Reveal index={3}>
                <fieldset className="field" style={{ border: 0, padding: 0, margin: '0 0 1.6rem' }}>
                  <legend className="field-label">Will you be attending?</legend>
                  <div className="choice-row" role="radiogroup">
                    <label className={`choice ${attending === 'yes' ? 'is-selected' : ''}`}>
                      <input type="radio" name="attending" value="yes" checked={attending === 'yes'} onChange={() => setAttending('yes')} />
                      Joyfully accept
                    </label>
                    <label className={`choice ${attending === 'no' ? 'is-selected' : ''}`}>
                      <input type="radio" name="attending" value="no" checked={attending === 'no'} onChange={() => setAttending('no')} />
                      Regretfully decline
                    </label>
                  </div>
                  {errors.attending && <p className="field-error">{errors.attending}</p>}
                </fieldset>
              </Reveal>

              <AnimatePresence initial={false}>
                {attending === 'no' && (
                  <motion.p key="missed" className="decline-note" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 6 }} transition={{ duration: 0.4 }}>
                    You will be missed!
                  </motion.p>
                )}
                {attending === 'yes' && (
                  <motion.div key="guests" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.45, ease: [0.22, 0.61, 0.36, 1] }} style={{ overflow: 'hidden' }}>
                    <div className="field guests">
                      <label className="field-label" htmlFor="rsvp-count">Number of guests</label>
                      <div className="count-stepper">
                        <button type="button" className="count-btn" onClick={() => setCount((n) => Math.max(1, n - 1))} disabled={count <= 1} aria-label="Fewer guests">−</button>
                        <input
                          id="rsvp-count"
                          className="count-input"
                          type="number"
                          inputMode="numeric"
                          min={1}
                          max={30}
                          value={count}
                          onChange={(e) => { const n = parseInt(e.target.value, 10); setCount(Number.isFinite(n) ? Math.min(30, Math.max(1, n)) : 1) }}
                        />
                        <button type="button" className="count-btn" onClick={() => setCount((n) => Math.min(30, n + 1))} aria-label="More guests">+</button>
                      </div>
                      <p className="count-hint">Including yourself</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <Reveal index={5}>
                <div className="rsvp-submit">
                  <button type="submit" className="btn btn-gold" disabled={status === 'sending'} aria-busy={status === 'sending'}>
                    {status === 'sending' ? 'Sealing your response…' : 'Send response'}
                  </button>
                  {status === 'sending' && <p className="rsvp-status" role="status">One moment — this can take a few seconds on a slow connection.</p>}
                </div>
                {status === 'failed' && host && (
                  <div className="rsvp-failure" role="alert">
                    <p>{c.rsvp.failureCopy}</p>
                    <a className="btn btn-wa" href={whatsappUrl(host.whatsapp, waText)} target="_blank" rel="noopener noreferrer"><WaIcon /> WhatsApp {host.name}</a>
                    <p style={{ marginTop: 12 }}><button type="button" className="rsvp-done-again" style={{ marginTop: 0 }} onClick={() => setStatus('idle')}>Or try again</button></p>
                  </div>
                )}
              </Reveal>
            </motion.form>
          )}
        </AnimatePresence>
        <Locket className="rsvp-locket" left={c.couple.second[0]} right={c.couple.first[0]} />
      </div>
    </section>
  )
}
