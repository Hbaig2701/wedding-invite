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
    startISO: '2026-12-21T18:00:00+05:00',
    endISO: '2026-12-21T23:30:00+05:00',
    timeLabel: '6:00 PM',
    timeNote: '',
    timezone: 'Asia/Karachi',
  },

  city: 'Lahore, Pakistan',

  venue: {
    name: 'Defence Raya Golf & Country Club',
    address: 'Sector M, DHA Phase 6\nLahore, Pakistan',
    mapsQuery: 'Defence Raya Golf Resort, Sector M, DHA Phase 6, Lahore, Pakistan',
    mapsLink: 'https://maps.app.goo.gl/RNXb5K6LJJUVND9X7',
    lat: 31.4689591,
    lng: 74.4716129,
  },

  timeline: [
    { time: '6:00 PM', title: 'Guests arrive', note: 'welcome & refreshments' },
    { time: '7:00 PM', title: 'Baraat arrives', note: 'the groom\u2019s procession is welcomed' },
    { time: '7:30 PM', title: 'Bridal entrance', note: 'Iman makes her entrance' },
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
    deadlineLabel: 'Kindly respond by November 1st',
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
    { name: 'Shahid Mahmood', role: 'Father of the bride', whatsapp: '966500466597' },
  ],

  musicUrl: '',   // «INSTRUMENTAL VIOLIN TRACK URL» — leave empty to hide the sound toggle

  footer: {
    verse: 'And among His signs is that He created for you mates from among yourselves, that you may dwell in tranquillity with them, and He has put love and mercy between your hearts.',
    verseAttribution: 'Ar-Rūm · 30:21',
    closing: 'With love, Iman & Hamza',
  },
}
