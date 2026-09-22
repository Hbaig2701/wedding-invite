import type { InviteContent } from '../../content/types'
import { Reveal } from '../Reveal'

export function Timeline({ content }: { content: InviteContent }) {
  return (
    <section className="timeline paper section-paper" aria-label="Order of the day">
      <div className="col">
        <Reveal><div className="section-head"><p className="eyebrow">Programme</p><h2 className="section-title letterpress">Order of the day</h2></div></Reveal>
        <ol className="timeline-list">
          {content.timeline.map((t, i) => (
            <Reveal key={i} as="li" index={i} className="timeline-item">
              <div className="timeline-time">{t.time}</div>
              <div className="timeline-axis"><div className="timeline-dot" /></div>
              <div>
                <div className="timeline-title letterpress">{t.title}</div>
                {t.note && <div className="timeline-note">{t.note}</div>}
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}
