/**
 * Everything a parent might want to change lives here.
 * Nobody should need to open a component to change a name, a time or a venue.
 *
 * Strings marked with «PLACEHOLDER» in shaadi.ts / walima.ts are still unknown
 * (see spec §10) and should be replaced before the link goes out.
 */

export type EventKey = 'shaadi' | 'walima'

export interface TimelineEntry {
  time: string        // "4:00 pm" – displayed verbatim
  title: string
  note?: string
}

export interface Swatch {
  name: string
  /** CSS colour. Used as the base of a rendered fabric swatch. */
  hex: string
}

export interface Contact {
  name: string
  role: string        // "Father of the bride"
  /** International format, digits only, no plus. e.g. 923001234567 */
  whatsapp: string
}

export interface InviteContent {
  event: EventKey
  eventLabel: string                 // "Shaadi" | "Walima"
  eventLabelUrdu?: string            // optional Urdu word rendered in Amiri

  /** Page <title> and OG fallbacks live in the html files, but this is used in-app. */
  siteTitle: string

  bismillah: {
    arabic: string
    english: string
  }

  couple: {
    /** Order as it should appear left→right / top→bottom. */
    first: string
    second: string
    /** Word between the names: "&", "with", "and" */
    joiner: string
    /** Two letters for the wax seal, e.g. "H I" or "HI" */
    sealInitials: string
    /** Optional Arabic/Urdu spellings, shown beneath the Latin names. */
    firstArabic?: string
    secondArabic?: string
    /** Full names as set on the first page, e.g. "Iman Shahid". */
    firstFull?: string
    secondFull?: string
  }

  /** The first page (hero) copy. Lines break on \n. */
  hero: {
    hosts: string          // "Mr and Mrs Shahid"
    line: string           // "cordially invite you to the Shaadi\nof their beloved daughter"
    afterNames?: string    // "Son of Mirza Ali Baig & Rabia Baig"
  }

  /**
   * The formal invitation line. Supports a tiny inline markup:
   *   *text*  → italic
   *   **text** → display serif emphasis (used for names)
   *   \n → line break
   */
  invitationLine: string
  invitationClosing?: string

  date: {
    long: string            // "Monday, the twenty-first of December, two thousand and twenty-six"
    short: string           // "21 December 2026"
    numeric: string         // "21 · 12 · 2026"
    weekday: string         // "Monday"
    /** ISO 8601 with offset. Drives the countdown and calendar. */
    startISO: string
    endISO: string
    timeLabel: string       // "7:00 pm"
    timeNote?: string       // "Guests are requested to be seated by 7:30 pm"
    timezone: string        // "Asia/Karachi"
  }

  city: string

  venue: {
    name: string
    address: string
    /** Free-text query for Google Maps, e.g. the venue name + city */
    mapsQuery: string
    /** Share link from Google Maps (what the buttons open). */
    mapsLink?: string
    /** Pin for the embedded map. */
    lat?: number
    lng?: number
  }

  timeline: TimelineEntry[]

  dressCode: {
    title: string
    line: string
    note?: string
    swatches: Swatch[]
  }

  rsvp: {
    deadlineLabel: string     // "Kindly respond by the 1st of December"
    /** Google Apps Script web-app URL. Empty string = demo mode (no network). */
    endpoint: string
    thankYouAccept: { title: string; body: string }
    thankYouDecline: { title: string; body: string }
    /** Shown when the network fails. WhatsApp fallback uses contacts[0]. */
    failureCopy: string
  }

  contacts: Contact[]

  /** Optional instrumental. Empty string hides the sound toggle. */
  musicUrl: string

  footer: {
    verse: string
    verseAttribution?: string
    closing: string
  }

  /** Walima only. Empty string = no photo section. */
  photoUrl?: string
  photoCaption?: string
}
