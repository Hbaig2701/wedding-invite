import { motion } from 'motion/react'
import type { InviteContent } from '../../content/types'
import type { Theme } from '../../theme/types'
import { CuspedArch, Divider } from '../Ornaments'
import { ReferenceFrame } from '../Illumination'

export function Hero({ content, theme, opened, instant = false }: { content: InviteContent; theme: Theme; opened: boolean; instant?: boolean }) {
  const c = content
  const item = (i: number) => ({
    initial: instant ? false as const : { opacity: 0, y: 14 },
    animate: opened ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 },
    transition: { duration: 1.1, delay: 0.25 + i * 0.16, ease: [0.22, 0.61, 0.36, 1] as const },
  })
  const gold = theme.darkGround

  if (theme.hero === 'folio') {
    const arch = theme.frame === 'floral-arch'
    return (
      <section className={arch ? 'hero hero-folio hero-arch paper' : 'hero hero-folio paper'} aria-label="Invitation">
        {arch
          ? <ArchFrame />
          : <ReferenceFrame className="folio-frame" bandRatio={0.125} />}
        <div className="hero-inner col hero-inner-folio">
          <div className="hero-opener">
            <motion.div {...item(0)} className="hero-calligraphy" role="img" aria-label={c.bismillah.arabic} />
            <motion.p {...item(1)} className="hero-bismillah-en">{c.bismillah.english}</motion.p>
          </div>

          <div className="hero-centre">
            <motion.p {...item(2)} className="hero-parents">{c.hero.hosts}</motion.p>
            <motion.p {...item(3)} className="hero-intro">{c.hero.line.split('\n').map((l, i) => <span key={i}>{l}<br /></span>)}</motion.p>

            <motion.h1 {...item(4)} className="hero-names hero-names-title">
              {c.couple.firstArabic
                ? <span className="hero-name hero-name-nastaliq" lang="ur" dir="rtl">{c.couple.firstArabic}</span>
                : <span className="hero-name hero-name-script">{c.couple.first}</span>}
              <span className="hero-joiner"><i /><em>{c.couple.joiner === '&' ? 'with' : c.couple.joiner}</em><i /></span>
              {c.couple.secondArabic
                ? <span className="hero-name hero-name-nastaliq" lang="ur" dir="rtl">{c.couple.secondArabic}</span>
                : <span className="hero-name hero-name-script">{c.couple.second}</span>}
            </motion.h1>
            {c.hero.afterNames && <motion.p {...item(5)} className="hero-parents hero-after">{c.hero.afterNames}</motion.p>}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="hero hero-band ground grain" aria-label="Invitation">
      <div className="hero-frame">
        <CuspedArch lobes={11} mirror double strokeWidth={1.2} opacity={0.75} />
      </div>
      <div className="hero-inner col">
        <motion.p {...item(0)} className={`hero-bismillah ${gold ? 'gold-text' : 'gold-text gold-text-paper'}`} lang="ar">{c.bismillah.arabic}</motion.p>
        <motion.p {...item(1)} className="hero-bismillah-en">{c.bismillah.english}</motion.p>

        <motion.p {...item(2)} className="hero-event eyebrow">{c.eventLabel}{c.eventLabelUrdu ? <span className="font-arabic" style={{ letterSpacing: 0, marginLeft: '0.9em', fontSize: '1.25em' }} lang="ur">{c.eventLabelUrdu}</span> : null}</motion.p>

        <motion.h1 {...item(3)} className="hero-names">
          <span className="gold-text">{c.couple.first}</span>
          <span className="joiner">{c.couple.joiner}</span>
          <span className="gold-text">{c.couple.second}</span>
        </motion.h1>

        <motion.div {...item(4)} className="hero-ornament"><Divider width={240} /></motion.div>
        <motion.p {...item(5)} className="hero-date">{c.date.weekday} · {c.date.short}</motion.p>
        <motion.p {...item(6)} className="hero-city">{c.city}</motion.p>
      </div>
    </section>
  )
}

/* The Walima arch, drawn exactly symmetrical (artwork pixels, 1016 wide):
   a top piece and a bottom piece, joined by straight sides that grow with the
   page. The watercolour flowers from the Save the Date sit on top. */
const ARCH_TOP = 'M 105 420 L 105 410 L 214 285 L 295 285 A 213 213 0 0 1 721 285 L 802 285 L 911 410 L 911 420'
const ARCH_BOTTOM = 'M 105 1080 L 105 1090 L 228 1205 L 292 1205 C 292 1280 330 1330 386 1340 Q 402 1344 404 1368 C 410 1394 460 1410 508 1410 C 556 1410 606 1394 612 1368 Q 614 1344 630 1340 C 686 1330 724 1280 724 1205 L 788 1205 L 911 1090 L 911 1080'

function ArchFrame() {
  return (
    <div className="arch-frame" aria-hidden="true">
      <svg className="arch-line arch-line-top" viewBox="0 0 1016 420" preserveAspectRatio="none"><path d={ARCH_TOP} /></svg>
      <i className="arch-sides" />
      <svg className="arch-line arch-line-bottom" viewBox="0 1080 1016 386" preserveAspectRatio="none"><path d={ARCH_BOTTOM} /></svg>
      <i className="arch-flora arch-flora-l" />
      <i className="arch-flora arch-flora-r" />
    </div>
  )
}
