import { motion } from 'motion/react'
import type { InviteContent } from '../../content/types'
import type { Theme } from '../../theme/types'
import { CuspedArch, Divider } from '../Ornaments'
import { DateBlock, ReferenceFrame } from '../Illumination'

const MONTHS = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC']

export function Hero({ content, theme, opened }: { content: InviteContent; theme: Theme; opened: boolean }) {
  const c = content
  const item = (i: number) => ({
    initial: { opacity: 0, y: 14 },
    animate: opened ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 },
    transition: { duration: 1.1, delay: 0.25 + i * 0.16, ease: [0.22, 0.61, 0.36, 1] as const },
  })
  const start = new Date(c.date.startISO)
  const gold = theme.darkGround

  if (theme.hero === 'folio') {
    return (
      <section className="hero hero-folio paper" aria-label="Invitation">
        <ReferenceFrame className="folio-frame" />
        <div className="hero-inner col">
          <motion.p {...item(0)} className="hero-bismillah gold-text gold-text-paper" lang="ar">{c.bismillah.arabic}</motion.p>
          <motion.p {...item(1)} className="hero-bismillah-en">{c.bismillah.english}</motion.p>

          <motion.p {...item(2)} className="hero-event eyebrow">{c.eventLabel}{c.eventLabelUrdu ? <span className="font-arabic" style={{ letterSpacing: 0, marginLeft: '0.9em', fontSize: '1.25em' }} lang="ur">{c.eventLabelUrdu}</span> : null}</motion.p>

          <motion.h1 {...item(3)} className="hero-names hero-names-caps">
            <span>{c.couple.first}</span>
            <span className="joiner">{c.couple.joiner}</span>
            <span>{c.couple.second}</span>
          </motion.h1>
          {(c.couple.firstArabic && c.couple.secondArabic) && (
            <motion.p {...item(4)} className="hero-names-arabic" lang="ar">{c.couple.firstArabic} <span className="amp">&amp;</span> {c.couple.secondArabic}</motion.p>
          )}

          <motion.div {...item(5)}>
            <DateBlock className="hero-dateblock" month={MONTHS[start.getMonth()]} weekday={c.date.weekday} day={String(start.getDate())} time={c.date.timeLabel.toUpperCase()} year={String(start.getFullYear())} />
          </motion.div>
          <motion.p {...item(6)} className="hero-city hero-city-caps">{c.city}</motion.p>
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
