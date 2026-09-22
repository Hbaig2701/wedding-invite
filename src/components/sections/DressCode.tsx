import type { InviteContent } from '../../content/types'
import { Reveal } from '../Reveal'

export function DressCode({ content }: { content: InviteContent }) {
  const d = content.dressCode
  return (
    <section className="dress paper section-paper" aria-label="Dress code">
      <div className="col">
        <Reveal><div className="section-head" style={{ marginBottom: '1.4rem' }}><p className="eyebrow">Attire</p><h2 className="section-title letterpress">{d.title}</h2></div></Reveal>
        <Reveal index={1}><p className="dress-line letterpress">{d.line}</p>{d.note && <p className="dress-note">{d.note}</p>}</Reveal>
        <Reveal index={2}>
          <div className="swatches" role="list" aria-label="Suggested colours">
            {d.swatches.map((s) => (
              <div key={s.name} className="swatch" role="listitem">
                <div className="swatch-chip" style={{ ['--sw' as string]: s.hex }} aria-hidden="true" />
                <div className="swatch-name">{s.name}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
