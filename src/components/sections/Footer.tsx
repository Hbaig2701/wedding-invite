import type { InviteContent } from '../../content/types'
import type { Theme } from '../../theme/types'
import { Divider } from '../Ornaments'
import { Reveal } from '../Reveal'

export function Footer({ content, theme }: { content: InviteContent; theme: Theme }) {
  const c = content
  const verse = (
    <>
      <Reveal index={1}><p className="footer-verse">“{c.footer.verse}”</p>{c.footer.verseAttribution && <p className="footer-attr">{c.footer.verseAttribution}</p>}</Reveal>
      {theme.hero !== 'folio' && (
        <Reveal index={2}>
          <p className={`footer-arabic ${theme.darkGround ? '' : 'gold-text gold-text-paper'}`} lang="ar">إن شاء الله</p>
        </Reveal>
      )}
    </>
  )

  if (theme.hero === 'folio') {
    // The pattern fills the section; the verse sits in a lined ivory box.
    return (
      <footer className="footer footer-folio section-dark">
        <div className="footer-box">{verse}</div>
      </footer>
    )
  }

  return (
    <footer className="footer hero-band ground grain section-dark">
      <div className="col">
        <Reveal><Divider width={200} /></Reveal>
        {verse}
      </div>
    </footer>
  )
}

/**
 * The verse as the cover page: the patterned ground with the verse in its
 * lined box. Also rendered, in miniature, as the card in the envelope, so it
 * uses no scroll reveals.
 */
export function Cover({ content }: { content: InviteContent }) {
  const c = content
  return (
    <section className="footer footer-folio cover section-dark" aria-label="Verse" data-parallax="0.18">
      <div className="footer-box">
        <p className="footer-verse">“{c.footer.verse}”</p>
        {c.footer.verseAttribution && <p className="footer-attr">{c.footer.verseAttribution}</p>}
      </div>
    </section>
  )
}
