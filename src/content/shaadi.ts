import type { InviteContent } from './types'

// ─────────────────────────────────────────────────────────────────────────────
//  SHAADI · 21 December 2026 · Lahore
//  Hosted by the bride's parents, Sania and Shahid.
//  Anything wrapped in «…» is a PLACEHOLDER still to be confirmed (spec §10).
// ─────────────────────────────────────────────────────────────────────────────

export const shaadi: InviteContent = {
  event: 'shaadi',
  eventLabel: 'Shaadi',
  eventLabelUrdu: 'شادی',
  siteTitle: 'Iman & Hamza · Shaadi',

  bismillah: {
    arabic: 'بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ',
    english: 'In the name of God, the Most Gracious, the Most Merciful',
  },

  couple: {
    first: 'Iman',
    second: 'Hamza',
    joiner: '&',
    sealInitials: 'IH',
    firstArabic: 'إيمان',
    secondArabic: 'حمزة',
  },

  invitationLine:
    'Sania & Shahid «SURNAME?»\nrequest the honour of your presence\nat the marriage of their daughter\n**Iman**\nto\n**Hamza**\nson of «GROOM’S PARENTS»',
  invitationClosing: 'and afterwards at the reception',

  date: {
    long: 'Monday, the twenty-first of December, two thousand and twenty-six',
    short: '21 December 2026',
    numeric: '21 · 12 · 2026',
    weekday: 'Monday',
    startISO: '2026-12-21T18:30:00+05:00',   // from the Save the Date
    endISO: '2026-12-21T23:30:00+05:00',
    timeLabel: '6:30 pm',
    timeNote: 'Guests are kindly requested to be seated by seven',
    timezone: 'Asia/Karachi',
  },

  city: 'Lahore, Pakistan',

  venue: {
    name: '«VENUE NAME»',
    address: '«Venue address line»\nLahore, Pakistan',
    mapsQuery: '«VENUE NAME», Lahore, Pakistan',
  },

  timeline: [
    { time: '6:30 pm', title: 'Arrival of guests', note: 'Welcome & refreshments' },
    { time: '7:30 pm', title: 'Baraat arrives', note: '«placeholder»' },
    { time: '8:15 pm', title: 'Nikkah', note: '«placeholder»' },
    { time: '9:30 pm', title: 'Dinner is served' },
    { time: '11:00 pm', title: 'Rukhsati' },
  ],

  dressCode: {
    title: 'Dress code',
    line: 'Formal · traditional attire',            // «WORDING?»
    note: 'Rich, warm tones are encouraged. Please avoid white and ivory.',
    swatches: [
      { name: 'Burgundy', hex: '#6f1a2c' },
      { name: 'Dusty rose', hex: '#d9a3ad' },
      { name: 'Sage', hex: '#6f8a5a' },
      { name: 'Antique gold', hex: '#b48a3e' },
      { name: 'Ivory', hex: '#f3ead8' },
    ],
  },

  rsvp: {
    deadlineLabel: 'Kindly respond by the first of December',
    endpoint: '',   // «PASTE GOOGLE APPS SCRIPT WEB APP URL» — see reference/rsvp-google-sheet-setup.gs
    thankYouAccept: {
      title: 'We can’t wait to see you',
      body: 'Your response has been recorded. Thank you for celebrating with us — it means the world to both families.',
    },
    thankYouDecline: {
      title: 'You will be missed',
      body: 'Thank you for letting us know. You will be in our thoughts and prayers on the day.',
    },
    failureCopy:
      'We couldn’t reach our guest book just now. Please send your response to us on WhatsApp instead — it takes a moment.',
  },

  contacts: [
    { name: 'Shahid', role: 'Father of the bride', whatsapp: '923000000000' }, // «SHAHID'S NUMBER»
  ],

  musicUrl: '',   // «INSTRUMENTAL VIOLIN TRACK URL» — leave empty to hide the sound toggle

  footer: {
    verse: 'And among His signs is that He created for you mates from among yourselves, that you may dwell in tranquillity with them, and He has put love and mercy between your hearts.',
    verseAttribution: 'Ar-Rūm · 30:21',
    closing: 'With love, Iman & Hamza',
  },
}
