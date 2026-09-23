/**
 * RSVP → Google Sheet
 * ───────────────────
 * 1. Create a Google Sheet. Extensions → Apps Script. Paste this file.
 * 2. Run `setup` once (authorise when asked). It creates two tabs:
 *      "Responses" — every submission, one row each, never edited.
 *      "Latest"    — the most recent row per (event, phone) with a live headcount.
 * 3. Deploy → New deployment → type "Web app".
 *      Execute as: Me.   Who has access: Anyone.
 *    Copy the web-app URL into `rsvp.endpoint` in src/content/shaadi.ts and walima.ts.
 * 4. Any time you edit this script, create a NEW deployment version (Deploy → Manage).
 *
 * Payload (JSON, POST body):
 *   { event, name, phone, attending, adults, children, guests, message, submittedAt }
 *   (adults = number of guests attending including the respondent; guests = their names)
 */

const RESPONSES = 'Responses'
const LATEST = 'Latest'
const HEADERS = ['submittedAt', 'event', 'name', 'phone', 'attending', 'adults', 'children', 'guests', 'message', 'userAgent']

function setup() {
  const ss = SpreadsheetApp.getActiveSpreadsheet()
  let r = ss.getSheetByName(RESPONSES)
  if (!r) { r = ss.insertSheet(RESPONSES); r.appendRow(HEADERS); r.setFrozenRows(1) }
  let l = ss.getSheetByName(LATEST)
  if (!l) l = ss.insertSheet(LATEST)
  rebuildLatest_()
}

function doPost(e) {
  try {
    const body = JSON.parse(e.postData.contents || '{}')
    const clean = (v, n) => String(v == null ? '' : v).slice(0, n)
    const row = [
      clean(body.submittedAt || new Date().toISOString(), 40),
      clean(body.event, 20),
      clean(body.name, 120),
      clean(body.phone, 30).replace(/[^\d]/g, ''),
      body.attending === 'yes' ? 'yes' : 'no',
      Math.max(0, parseInt(body.adults, 10) || 0),
      Math.max(0, parseInt(body.children, 10) || 0),
      clean(Array.isArray(body.guests) ? body.guests.join(', ') : body.guests, 1000),
      clean(body.message, 1000),
      clean((e.parameter && e.parameter.ua) || '', 200),
    ]
    if (!row[2] || !row[3]) return json_({ ok: false, error: 'name and phone required' })

    const lock = LockService.getScriptLock()
    lock.waitLock(10000)
    try {
      const ss = SpreadsheetApp.getActiveSpreadsheet()
      let sheet = ss.getSheetByName(RESPONSES)
      if (!sheet) { sheet = ss.insertSheet(RESPONSES); sheet.appendRow(HEADERS) }
      sheet.appendRow(row)
      rebuildLatest_()
    } finally { lock.releaseLock() }
    return json_({ ok: true })
  } catch (err) {
    return json_({ ok: false, error: String(err) })
  }
}

function doGet() { return json_({ ok: true, service: 'rsvp' }) }

/** Latest row per (event, phone), plus a headcount block at the top. */
function rebuildLatest_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet()
  const src = ss.getSheetByName(RESPONSES)
  let dst = ss.getSheetByName(LATEST)
  if (!dst) dst = ss.insertSheet(LATEST)
  const data = src.getDataRange().getValues()
  const rows = data.slice(1)
  const latest = {}
  rows.forEach((r) => { latest[r[1] + '|' + r[3]] = r })   // later rows overwrite earlier
  const out = Object.keys(latest).map((k) => latest[k])
  out.sort((a, b) => (a[1] + a[2]).localeCompare(b[1] + b[2]))

  const totals = {}
  out.forEach((r) => {
    const t = totals[r[1]] || (totals[r[1]] = { yes: 0, no: 0, adults: 0, children: 0 })
    if (r[4] === 'yes') { t.yes++; t.adults += Number(r[5]) || 0; t.children += Number(r[6]) || 0 } else t.no++
  })

  dst.clearContents()
  const summary = [['Event', 'Accepted', 'Declined', 'Adults', 'Children', 'Total guests']]
  Object.keys(totals).sort().forEach((ev) => {
    const t = totals[ev]
    summary.push([ev, t.yes, t.no, t.adults, t.children, t.adults + t.children])
  })
  dst.getRange(1, 1, summary.length, 6).setValues(summary)
  const start = summary.length + 2
  dst.getRange(start, 1, 1, HEADERS.length).setValues([HEADERS])
  if (out.length) dst.getRange(start + 1, 1, out.length, HEADERS.length).setValues(out)
  dst.setFrozenRows(start)
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON)
}
