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
    english: 'In the name of Allah, the Most Gracious, the Most Merciful',
  },

  couple: {
    first: 'Iman',
    second: 'Hamza',
    joiner: '&',
    sealInitials: 'IH',
    firstArabic: 'ایمان',
    secondArabic: 'حمزہ',
    firstFull: 'Iman Shahid',
    secondFull: 'Hamza Baig',
  },

  hero: {
    hosts: 'Sania and Shahid Mahmood',
    line: 'cordially invite you to the Shaadi\nof their daughter',
    afterNames: 'Son of Rabia and Mirza Ali Baig',
  },

  invitationLine:
    'Sania and Shahid Mahmood\nrequest the honour of your presence\nat the Shaadi of their daughter\n**Iman**\nwith\n**Hamza**\nson of Rabia and Mirza Ali Baig',
  invitationClosing: 'and afterwards at the reception',

  date: {
    long: 'Monday, the twenty-first of December, two thousand and twenty-six',
    short: '21 December 2026',
    numeric: '21 · 12 · 2026',
    weekday: 'Monday',
    startISO: '2026-12-21T18:30:00+05:00',
    endISO: '2026-12-21T23:30:00+05:00',
    timeLabel: '6:30 PM',
    timeNote: '',
    timezone: 'Asia/Karachi',
  },

  city: 'Lahore, Pakistan',

  venue: {
    name: 'Defence Raya Golf & Country Club',
    hall: 'The Venue',
    mapLabel: 'The Venue · Defence Raya',
    address: 'Sector M, DHA Phase 6\nLahore, Pakistan',
    mapsQuery: 'The Venue - Defence Raya Golf and Country Club, Lahore, Pakistan',
    mapsLink: 'https://maps.app.goo.gl/t9fGKXWUd9qE2Xk47',
    lat: 31.4703929,
    lng: 74.4691344,
  },

  timeline: [
    { time: '6:30 PM', title: 'Arrival of Guests', note: 'welcome & refreshments' },
    { time: '7:00 PM', title: 'Arrival of Baraat', note: 'the groom\u2019s procession is welcomed' },
    { time: '8:00 PM', title: 'Dinner', note: 'a feast with family & friends' },
    { time: '9:45 PM', title: 'Rukhsati', note: 'the farewell & send-off' },
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
    deadlineLabel: 'Kindly respond by November 30th',
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
    { name: 'Shahid Mahmood', role: '', whatsapp: '966500466597' },
    { name: 'Sania Shahid', role: '', whatsapp: '966532702343' },
  ],

  musicUrl: 'music/tu-jaane-na.m4a',   // Tu Jaane Na, orchestral version

  footer: {
    verse: 'And among His signs is that He created for you spouses from among yourselves so that you may find tranquility in them, and He placed between you affection and mercy.',
    verseAttribution: 'Ar-Rūm · 30:21',
    closing: 'With love, Iman & Hamza',
  },
}
