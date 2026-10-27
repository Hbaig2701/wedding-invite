import type { Theme } from './types'

/**
 * SHAADI — an illuminated Mughal folio.
 * Ivory paper, burgundy ink, a dense border of rosettes and palmettes in
 * gold, dusty rose and sage; a floral garland wreathing the words.
 * (Matches the Save the Date.)
 */
export const shaadiTheme: Theme = {
  name: 'shaadi',
  darkGround: false,
  hero: 'folio',
  liner: 'plain',
  vars: {
    // Ground — the desk the envelope sits on: warm parchment
    '--ground-shadow': '#c4ad8a',
    '--ground': '#e4d4b8',
    '--ground-lit': '#f0e4cf',
    '--ground-warm': '#f6ecda',
    '--ground-glow': '#fbf4e6',

    // Envelope — champagne-ivory laid paper
    '--env-shadow': '#c2ab82',
    '--env': '#e7dabd',
    '--env-lit': '#f9f1df',
    '--env-edge': '#fff9ea',
    '--env-liner-a': '#e7b9bf',
    '--env-liner-b': '#7a1c2e',

    // Gold — warm, slightly rosy
    '--gold-deep': '#5a3a12',
    '--gold-dark': '#9a7433',
    '--gold': '#c29a4a',
    '--gold-light': '#e9d29a',
    '--gold-rose': '#e2c08f',
    '--gold-hot': '#fff6de',

    // Wax — burgundy
    '--wax-dark': '#3d0a16',
    '--wax': '#7a1c2e',
    '--wax-light': '#a8404f',
    '--wax-hot': '#dc9aa3',

    // Paper
    '--paper-shadow': '#dccbaa',
    '--paper': '#faf1d2',
    '--paper-lit': '#fdf7e3',
    '--paper-fibre': '#cbb996',

    // Ink — burgundy
    '--ink': '#6b1727',
    '--ink-soft': '#8a3a49',
    '--ink-faint': '#a8697a',

    // The illumination palette
    '--burgundy': '#7a1c2e',
    '--burgundy-deep': '#4a0d1a',
    '--rose': '#e9b7bf',
    '--rose-deep': '#d78f9c',
    '--leaf': '#6f8a5a',
    '--leaf-deep': '#3f5a34',
    '--band': '#f1e6cf',

    // "On dark" tokens are reused on the champagne countdown/footer bands
    '--on-dark': '#6b1727',
    '--on-dark-soft': 'rgba(107,23,39,0.82)',
    '--on-dark-faint': 'rgba(107,23,39,0.6)',

    '--card': '#f8f1e2',
    '--card-shadow': '#dccbaa',
  },
}
