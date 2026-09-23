import type { InviteContent } from '../../content/types'
import type { Theme } from '../../theme/types'
import { Divider } from '../Ornaments'
import { Wildflowers } from '../Wildflowers'
import { Reveal } from '../Reveal'

export function Footer({ content, theme }: { content: InviteContent; theme: Theme }) {
  const c = content
  return (
    <footer className="footer hero-band ground grain section-dark">
      <div className="col">
        <Reveal>{theme.hero === 'folio' ? <Wildflowers className="wildflowers wildflowers-top" flip /> : <Divider width={200} />}</Reveal>
        <Reveal index={1}><p className="footer-verse">“{c.footer.verse}”</p>{c.footer.verseAttribution && <p className="footer-attr">{c.footer.verseAttribution}</p>}</Reveal>
        <Reveal index={2}>
          <p className={`footer-arabic ${theme.darkGround ? '' : 'gold-text gold-text-paper'}`} lang="ar">إن شاء الله</p>
        </Reveal>
      </div>
      {theme.hero === 'folio' && <Wildflowers className="wildflowers wildflowers-bottom" />}
    </footer>
  )
}
