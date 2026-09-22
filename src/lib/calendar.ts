import type { InviteContent } from '../content/types'

function pad(n: number) { return String(n).padStart(2, '0') }

/** ISO with offset → UTC compact form used by .ics and Google Calendar */
function toUtcStamp(iso: string) {
  const d = new Date(iso)
  return (
    d.getUTCFullYear() + pad(d.getUTCMonth() + 1) + pad(d.getUTCDate()) +
    'T' + pad(d.getUTCHours()) + pad(d.getUTCMinutes()) + pad(d.getUTCSeconds()) + 'Z'
  )
}

function escapeIcs(s: string) {
  return s.replace(/\\/g, '\\\\').replace(/;/g, '\;').replace(/,/g, '\\,').replace(/\n/g, '\\n')
}

export function buildIcs(c: InviteContent) {
  const title = `${c.eventLabel} · ${c.couple.first} ${c.couple.joiner} ${c.couple.second}`
  const location = `${c.venue.name}, ${c.venue.address.replace(/\n/g, ', ')}`
  const description = `${c.date.timeLabel}${c.date.timeNote ? ' — ' + c.date.timeNote : ''}`
  const uid = `${c.event}-${toUtcStamp(c.date.startISO)}@invite`
  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Wedding Invitation//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${uid}`,
    `DTSTAMP:${toUtcStamp(new Date().toISOString())}`,
    `DTSTART:${toUtcStamp(c.date.startISO)}`,
    `DTEND:${toUtcStamp(c.date.endISO)}`,
    `SUMMARY:${escapeIcs(title)}`,
    `LOCATION:${escapeIcs(location)}`,
    `DESCRIPTION:${escapeIcs(description)}`,
    'BEGIN:VALARM',
    'TRIGGER:-P1D',
    'ACTION:DISPLAY',
    `DESCRIPTION:${escapeIcs(title)} tomorrow`,
    'END:VALARM',
    'END:VEVENT',
    'END:VCALENDAR',
  ]
  return lines.join('\r\n')
}

export function downloadIcs(c: InviteContent) {
  const blob = new Blob([buildIcs(c)], { type: 'text/calendar;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `${c.couple.first}-${c.couple.second}-${c.event}.ics`
  document.body.appendChild(a)
  a.click()
  setTimeout(() => { document.body.removeChild(a); URL.revokeObjectURL(url) }, 1500)
}

export function googleCalendarUrl(c: InviteContent) {
  const title = `${c.eventLabel} · ${c.couple.first} ${c.couple.joiner} ${c.couple.second}`
  const location = `${c.venue.name}, ${c.venue.address.replace(/\n/g, ', ')}`
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: title,
    dates: `${toUtcStamp(c.date.startISO)}/${toUtcStamp(c.date.endISO)}`,
    location,
    details: `${c.date.timeLabel}${c.date.timeNote ? ' — ' + c.date.timeNote : ''}`,
    ctz: c.date.timezone,
  })
  return `https://calendar.google.com/calendar/render?${params.toString()}`
}

export function mapsUrl(c: InviteContent) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(c.venue.mapsQuery)}`
}
