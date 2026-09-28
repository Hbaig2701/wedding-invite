import type { InviteContent } from '../../content/types'
import type { Theme } from '../../theme/types'
import { useCountdown } from '../../lib/useCountdown'
import { Reveal } from '../Reveal'

function two(n: number) { return String(n).padStart(2, '0') }

export function Countdown({ content, theme }: { content: InviteContent; theme: Theme }) {
  const r = useCountdown(content.date.startISO)
  return (
    <section className="countdown ground grain section-dark" aria-label="Countdown">
      <div className="countdown-box">
        <Reveal>
          <p className="eyebrow" style={{ color: 'var(--on-dark-faint)' }}>{r.past ? 'The day has arrived' : 'Until the celebration'}</p>
        </Reveal>
        <Reveal index={1}>
          <div className="countdown-grid" role="timer" aria-live="off">
            <Cell n={r.days} label="Days" gold={theme.darkGround} />
            <span className="countdown-sep" aria-hidden="true">·</span>
            <Cell n={r.hours} label="Hours" gold={theme.darkGround} />
            <span className="countdown-sep" aria-hidden="true">·</span>
            <Cell n={r.minutes} label="Minutes" gold={theme.darkGround} />
            <span className="countdown-sep" aria-hidden="true">·</span>
            <Cell n={r.seconds} label="Seconds" gold={theme.darkGround} />
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function Cell({ n, label, gold }: { n: number; label: string; gold: boolean }) {
  return (
    <div className="countdown-cell">
      <div className={`countdown-num ${gold ? 'gold-text' : ''}`}>{two(n)}</div>
      <div className="countdown-label">{label}</div>
    </div>
  )
}
