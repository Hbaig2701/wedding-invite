import type { InviteContent } from './types'

// ─────────────────────────────────────────────────────────────────────────────
//  WALIMA · 27 December 2026 · Karachi
//  A duplicate of the Shaadi invitation with the Walima wording.
//  Hosted by the groom's parents, Rabia and Mirza Ali Baig.
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
    joiner: 'and',
    sealInitials: 'HI',
    firstArabic: 'حمزہ',
    secondArabic: 'ایمان',
    firstFull: 'Hamza Baig',
    secondFull: 'Iman Shahid',
  },

  hero: {
    hosts: 'Rabia and Mirza Ali Baig',
    line: 'cordially invite you to the Walima\nof their son',
    afterNames: 'Daughter of Sania and Shahid Mahmood',
  },

  invitationLine:
    'Rabia and Mirza Ali Baig\nrequest the honour of your presence\nat the Walima of their son\n**Hamza**\nwith\n**Iman**\ndaughter of Sania and Shahid Mahmood',
  invitationClosing: 'and afterwards at the reception',

  date: {
    long: 'Sunday, the twenty-seventh of December, two thousand and twenty-six',
    short: '27 December 2026',
    numeric: '27 · 12 · 2026',
    weekday: 'Sunday',
    startISO: '2026-12-27T18:30:00+05:00',   // «TIME TO CONFIRM» — copied from the Shaadi
    endISO: '2026-12-27T23:30:00+05:00',
    timeLabel: '6:30 PM',                    // «TIME TO CONFIRM»
    timeNote: '',
    timezone: 'Asia/Karachi',
  },

  city: 'Karachi, Pakistan',

  venue: {
    name: 'Sind Club',
    address: 'Abdullah Haroon Road\nKarachi, Pakistan',
    mapsQuery: 'Sind Club, Karachi',
    mapsLink: 'https://maps.app.goo.gl/wx3MreRHoPXWsdaZ8',
    lat: 24.8492816,
    lng: 67.031972,
  },

  timeline: [
    // «TIMES TO CONFIRM»
    { time: '6:30 PM', title: 'Arrival of Guests', note: 'welcome & refreshments' },
    { time: '7:30 PM', title: 'Arrival of the Couple', note: '' },
    { time: '8:30 PM', title: 'Dinner', note: 'a feast with family & friends' },
    { time: '9:30 PM', title: 'Speeches', note: '' },
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
    // «WHATSAPP NUMBERS TO CONFIRM» — the message box shows once a number is added
    { name: 'Rabia Baig', role: '', whatsapp: '' },
    { name: 'Mirza Ali Baig', role: '', whatsapp: '' },
  ],

  musicUrl: 'music/tu-jaane-na.m4a',   // Tu Jaane Na, orchestral version

  locket: ['H', 'I'],

  footer: {
    verse: 'And among His signs is that He created for you spouses from among yourselves so that you may find tranquility in them, and He placed between you affection and mercy.',
    verseAttribution: 'Ar-Rūm · 30:21',
    closing: 'With love, Hamza & Iman',
  },
}
