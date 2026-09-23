import type { InviteContent } from '../../content/types'
import type { Theme } from '../../theme/types'
import { Reveal } from '../Reveal'
import { longDate } from './Details'

export function Timeline({ content, theme }: { content: InviteContent; theme: Theme }) {
  return (
    <section className="timeline paper section-paper" aria-label="Order of the day">
      <div className="col">
        {theme.hero === 'folio' ? (
          <Reveal>
            <div className="schedule-head">
              <h2 className="schedule-title">Schedule</h2>
              <p className="schedule-date">{longDate(content)}</p>
              <div className="schedule-rule" aria-hidden="true" />
            </div>
          </Reveal>
        ) : (
          <Reveal><div className="section-head"><p className="eyebrow">Programme</p><h2 className="section-title letterpress">Order of the day</h2></div></Reveal>
        )}
        <ol className="timeline-list">
          {content.timeline.map((t, i) => (
            <Reveal key={i} as="li" index={i} className="timeline-item">
              <div className="timeline-axis"><div className="timeline-dot" /></div>
              <div className="timeline-body">
                <div className="timeline-time">{t.time}</div>
                <div className="timeline-title">{t.title}</div>
                {t.note && theme.hero !== 'folio' && <div className="timeline-note">{t.note}</div>}
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}
