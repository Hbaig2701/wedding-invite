import { useState } from 'react'
import type { InviteContent } from '../../content/types'
import { downloadIcs, googleCalendarUrl, mapsUrl } from '../../lib/calendar'
import type { Theme } from '../../theme/types'
import { Divider } from '../Ornaments'
import { DateBlock } from '../Illumination'
import { Reveal } from '../Reveal'

const PinIcon = () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><path d="M12 22s7-6.2 7-12a7 7 0 1 0-14 0c0 5.8 7 12 7 12z"/><circle cx="12" cy="10" r="2.6"/></svg>)
const CalIcon = () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><rect x="3" y="5" width="18" height="16" rx="1.5"/><path d="M3 10h18M8 3v4M16 3v4"/></svg>)

const MONTHS = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC']

export function Details({ content, theme }: { content: InviteContent; theme: Theme }) {
  const c = content
  const start = new Date(c.date.startISO)
  const [calOpen, setCalOpen] = useState(false)
  return (
    <section className="details paper section-paper" aria-label="Details">
      <div className="col">
        <Reveal><div className="section-head"><p className="eyebrow">The particulars</p><h2 className="section-title letterpress">When &amp; where</h2></div></Reveal>

        {theme.hero === 'folio' ? (
          <Reveal index={1}>
            <div className="detail-row">
              <DateBlock month={MONTHS[start.getMonth()]} weekday={c.date.weekday} day={String(start.getDate())} time={c.date.timeLabel.toUpperCase()} year={String(start.getFullYear())} />
              {c.date.timeNote && <p className="detail-sub" style={{ marginTop: '1rem' }}>{c.date.timeNote}</p>}
            </div>
          </Reveal>
        ) : (
          <>
            <Reveal index={1}>
              <div className="detail-row">
                <p className="eyebrow detail-label">Date</p>
                <p className="detail-value letterpress">{c.date.weekday}, {c.date.short}</p>
              </div>
            </Reveal>
            <Reveal index={2}>
              <div className="detail-row">
                <p className="eyebrow detail-label">Time</p>
                <p className="detail-value letterpress">{c.date.timeLabel}</p>
                {c.date.timeNote && <p className="detail-sub">{c.date.timeNote}</p>}
              </div>
            </Reveal>
          </>
        )}
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
            <a className="btn btn-gold" href={mapsUrl(c)} target="_blank" rel="noopener noreferrer"><PinIcon /> Open in Maps</a>
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
