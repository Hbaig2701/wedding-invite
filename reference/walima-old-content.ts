import type { InviteContent } from './types'

// ─────────────────────────────────────────────────────────────────────────────
//  WALIMA · 27 December 2026 · Lahore
//  Hosted by the groom's parents.
//  Anything wrapped in «…» is a PLACEHOLDER still to be confirmed (spec §10).
// ─────────────────────────────────────────────────────────────────────────────

export const walima: InviteContent = {
  event: 'walima',
  eventLabel: 'Walima',
  eventLabelUrdu: 'ولیمہ',
  siteTitle: 'Hamza & Iman · Walima',

  bismillah: {
    arabic: 'بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ',
    english: 'In the name of Allah, the Most Gracious, the Most Merciful',
  },

  couple: {
    first: 'Hamza',
    second: 'Iman',
    joiner: 'with',
    sealInitials: 'HI',
    firstArabic: 'حمزہ',
    secondArabic: 'ایمان',
    firstFull: 'Hamza Baig',
    secondFull: 'Iman Shahid',
  },

  hero: {
    hosts: 'Rabia and Mirza Ali Baig',
    line: 'request the pleasure of your company\nat the Walima of their beloved son',
    afterNames: 'Daughter of Sania and Shahid Mahmood',
  },

  invitationLine:
    'Rabia and Mirza Ali Baig\nrequest the pleasure of your company\nat the Walima reception of their son\n**Hamza**\nwith\n**Iman**\ndaughter of Sania and Shahid Mahmood',
  invitationClosing: 'Dinner will follow',

  date: {
    long: 'Sunday, the twenty-seventh of December, two thousand and twenty-six',
    short: '27 December 2026',
    numeric: '27 · 12 · 2026',
    weekday: 'Sunday',
    startISO: '2026-12-27T19:30:00+05:00',   // «EXACT START TIME?»
    endISO: '2026-12-27T23:30:00+05:00',
    timeLabel: '7:30 pm',                    // «EXACT START TIME?»
    timeNote: 'Dinner will be served at nine',
    timezone: 'Asia/Karachi',
  },

  city: 'Lahore, Pakistan',

  venue: {
    name: '«VENUE NAME»',
    address: '«Venue address line»\nLahore, Pakistan',
    mapsQuery: '«VENUE NAME», Lahore, Pakistan',
  },

  timeline: [
    { time: '7:30 pm', title: 'Arrival of guests', note: 'Welcome & refreshments' },
    { time: '8:15 pm', title: 'The couple arrives', note: '«placeholder»' },
    { time: '9:00 pm', title: 'Dinner is served' },
    { time: '10:30 pm', title: 'Farewell' },
  ],

  dressCode: {
    title: 'Dress code',
    line: 'Formal · evening wear',                  // «WORDING?»
    note: 'Soft, pale tones are welcome. Kindly avoid red.',
    swatches: [
      { name: 'Ivory', hex: '#f1e9dc' },
      { name: 'Champagne', hex: '#d8c19a' },
      { name: 'Dusty rose', hex: '#c9a0a3' },
      { name: 'Sage', hex: '#8fa08a' },
      { name: 'Plum', hex: '#5b2233' },
    ],
  },

  rsvp: {
    deadlineLabel: 'Kindly respond by November 1st',
    endpoint: '',   // «PASTE GOOGLE APPS SCRIPT WEB APP URL» — see reference/rsvp-google-sheet-setup.gs
    thankYouAccept: {
      title: 'We look forward to hosting you',
      body: 'Your response has been recorded. Thank you — we are so glad you will be with us.',
    },
    thankYouDecline: {
      title: 'You will be missed',
      body: 'Thank you for letting us know. We hope to celebrate with you another time, insha’Allah.',
    },
    failureCopy:
      'We couldn’t reach our guest book just now. Please send your response to us on WhatsApp instead — it takes a moment.',
  },

  contacts: [
    { name: 'Mirza Ali Baig', role: 'Father of the groom', whatsapp: '923000000000' }, // «NUMBER»
  ],

  musicUrl: '',

  footer: {
    verse: 'And We created you in pairs.',
    verseAttribution: 'An-Naba · 78:8',
    closing: 'With love, Hamza & Iman',
  },

  photoUrl: '',            // «COUPLE PHOTO URL» e.g. '/photos/walima.jpg' (put the file in /public/photos)
  photoCaption: 'Hamza & Iman',
}
