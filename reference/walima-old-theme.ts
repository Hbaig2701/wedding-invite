import type { Theme } from './types'

/**
 * WALIMA — the same manuscript, seen by day.
 * Ivory and champagne, plum ink, a rose-plum wax. Lighter register so the two
 * invitations feel like a pair when seen days apart.
 */
export const walimaTheme: Theme = {
  name: 'walima',
  darkGround: false,
  hero: 'band',
  liner: 'marble',
  vars: {
    // Ground — a champagne-ivory desk
    '--ground-shadow': '#bfae94',
    '--ground': '#e3d6c0',
    '--ground-lit': '#f1e8d6',
    '--ground-warm': '#f6efe0',
    '--ground-glow': '#fbf6ea',

    // Envelope paper — deep plum, so the pale card glows when it slides out
    '--env-shadow': '#2e0f19',
    '--env': '#5b2233',
    '--env-lit': '#7a3446',
    '--env-edge': '#b57e8c',
    '--env-liner-a': '#d9c19c',
    '--env-liner-b': '#9c7f52',

    // Gold — champagne, cooler than the Shaadi's rosy gold
    '--gold-deep': '#5a4218',
    '--gold-dark': '#957435',
    '--gold': '#c2a25a',
    '--gold-light': '#ead9a7',
    '--gold-rose': '#e6cfa6',
    '--gold-hot': '#fffaea',

    // Wax — rose plum
    '--wax-dark': '#3b0f1c',
    '--wax': '#7a2b40',
    '--wax-light': '#a85a6c',
    '--wax-hot': '#e2aab4',

    // Paper
    '--paper-shadow': '#d4c5aa',
    '--paper': '#f4ede1',
    '--paper-lit': '#fbf7ee',
    '--paper-fibre': '#c5b697',

    // Ink — plum-brown
    '--ink': '#3c1a26',
    '--ink-soft': '#6a3d4b',
    '--ink-faint': '#85606f',

    // Text on "dark" (here the plum hero band)
    '--on-dark': '#f4ede1',
    '--on-dark-soft': 'rgba(244,237,225,0.84)',
    '--on-dark-faint': 'rgba(244,237,225,0.62)',

    // Illumination palette (used by ornaments)
    '--burgundy': '#5b2233',
    '--burgundy-deep': '#3a1220',
    '--rose': '#e6c3c8',
    '--rose-deep': '#cf9aa6',
    '--leaf': '#8fa08a',
    '--leaf-deep': '#5c6f58',
    '--band': '#f1e8d8',

    '--card': '#f7f1e6',
    '--card-shadow': '#d9cbb0',
  },
}
