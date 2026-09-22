/**
 * A theme is a flat set of CSS custom properties. Components never reference
 * a hex directly; they reference var(--x). Both events share one component
 * tree and differ only by which theme is applied to <html>.
 */
export interface Theme {
  name: 'shaadi' | 'walima'
  /** Whether the outer page ground is dark (affects text defaults + OG). */
  darkGround: boolean
  /** 'band' = a deep-coloured hero with gold type; 'folio' = an illuminated
   *  ivory page with burgundy type, a floral garland and a patterned border. */
  hero: 'band' | 'folio'
  /** Envelope liner: marbled endpaper or the illuminated floral tile. */
  liner: 'marble' | 'floral'
  vars: Record<`--${string}`, string>
}

export function applyTheme(theme: Theme) {
  const root = document.documentElement
  root.dataset.theme = theme.name
  for (const [k, v] of Object.entries(theme.vars)) root.style.setProperty(k, v)
}
