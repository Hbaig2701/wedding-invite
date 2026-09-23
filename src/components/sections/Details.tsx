import { useState } from 'react'
import type { InviteContent } from '../../content/types'
import type { Theme } from '../../theme/types'
import { downloadIcs, googleCalendarUrl, mapsUrl } from '../../lib/calendar'
import { Divider } from '../Ornaments'
import { DateBlock } from '../Illumination'
import { Reveal } from '../Reveal'

const PinIcon = () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><path d="M12 22s7-6.2 7-12a7 7 0 1 0-14 0c0 5.8 7 12 7 12z"/><circle cx="12" cy="10" r="2.6"/></svg>)
const CalIcon = () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><rect x="3" y="5" width="18" height="16" rx="1.5"/><path d="M3 10h18M8 3v4M16 3v4"/></svg>)
const HeartIcon = () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="M12 20s-7-4.6-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.4-7 10-7 10z"/></svg>)

const MONTHS = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC']
const MONTHS_LONG = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

function ordinalSuffix(n: number) {
  const v = n % 100
  if (v >= 11 && v <= 13) return 'th'
  return ['th', 'st', 'nd', 'rd'][n % 10] || 'th'
}

export function longDate(c: InviteContent) {
  const d = new Date(c.date.startISO)
  return `${c.date.weekday}, ${MONTHS_LONG[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`
}

export function Details({ content, theme }: { content: InviteContent; theme: Theme }) {
  const c = content
  const [calOpen, setCalOpen] = useState(false)
  const start = new Date(c.date.startISO)
  const link = c.venue.mapsLink || mapsUrl(c)

  if (theme.hero === 'folio') {
    const embed = c.venue.lat != null && c.venue.lng != null
      ? `https://www.google.com/maps?q=${c.venue.lat},${c.venue.lng}&z=13&hl=en&output=embed`
      : `https://www.google.com/maps?q=${encodeURIComponent(c.venue.mapsQuery)}&z=13&hl=en&output=embed`
    return (
      <section className="details details-folio paper section-paper" aria-label="Date and venue">
        <div className="col">
          <Reveal>
            <p className="eyebrow details-eyebrow">When &amp; where</p>
            <div className="rule-diamond" aria-hidden="true"><span /><i /><span /></div>
          </Reveal>
          <Reveal index={1}>
            <p className="details-weekday">{c.date.weekday}</p>
            <p className="details-date-big">{MONTHS_LONG[start.getMonth()]} {start.getDate()}<sup>{ordinalSuffix(start.getDate())}</sup>, {start.getFullYear()}</p>
            <p className="details-time-small">{c.date.timeLabel}</p>
            <p className="details-city">{c.city}</p>
          </Reveal>
          <Reveal index={2}>
            <div className="venue-box">
              <h2 className="venue-name">{c.venue.name}</h2>
              <p className="venue-address">{c.venue.address}</p>
            </div>
          </Reveal>
          <Reveal index={3}>
            <a className="map-card" href={link} target="_blank" rel="noopener noreferrer" aria-label={`Open ${c.venue.name} in Google Maps`}>
              <iframe className="map-frame" src={embed} title={`Map of ${c.venue.name}`} loading="lazy" referrerPolicy="no-referrer-when-downgrade" tabIndex={-1} aria-hidden="true" />
              <span className="map-pill"><HeartIcon /> {c.venue.name}</span>
            </a>
          </Reveal>
          <Reveal index={4}>
            <div className="detail-actions">
              <a className="btn btn-pill" href={link} target="_blank" rel="noopener noreferrer"><PinIcon /> Open in Google Maps</a>
              <button type="button" className="btn btn-ink" onClick={() => setCalOpen((v) => !v)} aria-expanded={calOpen}><CalIcon /> Add to calendar</button>
            </div>
            {calOpen && (
              <div className="calendar-menu">
                <a className="btn btn-ink" href={googleCalendarUrl(c)} target="_blank" rel="noopener noreferrer">Google Calendar</a>
                <button type="button" className="btn btn-ink" onClick={() => downloadIcs(c)}>Apple / Outlook (.ics)</button>
              </div>
            )}
          </Reveal>
        </div>
      </section>
    )
  }

  return (
    <section className="details paper section-paper" aria-label="Details">
      <div className="col">
        <Reveal><div className="section-head"><p className="eyebrow">The particulars</p><h2 className="section-title letterpress">When &amp; where</h2></div></Reveal>
        <Reveal index={1}>
          <div className="detail-row">
            <DateBlock month={MONTHS[start.getMonth()]} weekday={c.date.weekday} day={String(start.getDate())} time={c.date.timeLabel.toUpperCase()} year={String(start.getFullYear())} />
            {c.date.timeNote && <p className="detail-sub" style={{ marginTop: '1rem' }}>{c.date.timeNote}</p>}
          </div>
        </Reveal>
        <Reveal index={3}>
          <div className="detail-row">
            <p className="eyebrow detail-label">Venue</p>
            <p className="detail-value letterpress">{c.venue.name}</p>
            <p className="detail-sub">{c.venue.address}</p>
          </div>
        </Reveal>
        <Reveal index={4}>
          <Divider className="mt-10" width={180} />
          <div className="detail-actions">
            <a className="btn btn-gold" href={link} target="_blank" rel="noopener noreferrer"><PinIcon /> Open in Maps</a>
            <button type="button" className="btn btn-ink" onClick={() => setCalOpen((v) => !v)} aria-expanded={calOpen}><CalIcon /> Add to calendar</button>
          </div>
          {calOpen && (
            <div className="calendar-menu">
              <a className="btn btn-ink" href={googleCalendarUrl(c)} target="_blank" rel="noopener noreferrer">Google Calendar</a>
              <button type="button" className="btn btn-ink" onClick={() => downloadIcs(c)}>Apple / Outlook (.ics)</button>
            </div>
          )}
        </Reveal>
      </div>
    </section>
  )
}
