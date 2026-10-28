/**
 * RSVP → Google Sheet (one sheet per event)
 * ─────────────────────────────────────────
 * The same script runs for both RSVP sheets, Shaadi and Reception; only SHEET_ID differs.
 *   Shaadi:    1u5j1V97T_dXhmeURZHzyiHFUYl7j6j_OC30jMxpapBo
 *   Reception: 1gSGmcVtgqmaTACC_PzAdExAIiQfZq9Azh8H8WJugUUY
 * 1. Open the sheet. Extensions → Apps Script. Delete what's there, paste this file, save.
 * 2. Deploy → New deployment → gear icon → "Web app".
 *      Execute as: Me.   Who has access: Anyone.
 *    Authorise when asked (Advanced → Go to project → Allow).
 * 3. Copy the web-app URL into `rsvp.endpoint` in src/content/shaadi.ts or walima.ts.
 * 4. If you ever edit this script: Deploy → Manage deployments → edit → Version: New version.
 *
 * Writes to the first tab. Columns follow row 1: if F1 says "Guest names",
 * the names of everyone coming are written there (Reception only).
 */

const SHEET_ID = '1u5j1V97T_dXhmeURZHzyiHFUYl7j6j_OC30jMxpapBo'

function doPost(e) {
  try {
    const body = JSON.parse(e.postData.contents || '{}')
    const clean = (v, n) => String(v == null ? '' : v).slice(0, n)
    const name = clean(body.name, 120).trim()
    const phone = clean(body.phone, 30).replace(/[^\d]/g, '')
    if (!name || !phone) return json_({ ok: false, error: 'name and phone required' })

    const attending = body.attending === 'yes'
    const row = [
      Utilities.formatDate(new Date(), 'Asia/Karachi', 'd MMM yyyy, h:mm a'),
      name,
      "'+" + phone,                       // the apostrophe keeps it as text, not a number
      attending ? 'Yes' : 'No',
      attending ? Math.max(1, parseInt(body.adults, 10) || 1) : 0,
    ]

    const lock = LockService.getScriptLock()
    lock.waitLock(10000)
    try {
      const sheet = SpreadsheetApp.openById(SHEET_ID).getSheets()[0]
      if (String(sheet.getRange('F1').getValue()).trim() === 'Guest names') {
        const guests = Array.isArray(body.guests) ? body.guests : []
        row.push(clean(guests.join(', '), 1000))
      }
      // Next empty row in column A (the total in the next column over sits in row 2).
      const filled = sheet.getRange('A:A').getValues().filter((r) => r[0] !== '').length
      sheet.getRange(filled + 1, 1, 1, row.length).setValues([row])
    } finally { lock.releaseLock() }
    return json_({ ok: true })
  } catch (err) {
    return json_({ ok: false, error: String(err) })
  }
}

function doGet() { return json_({ ok: true, service: 'rsvp' }) }

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON)
}
