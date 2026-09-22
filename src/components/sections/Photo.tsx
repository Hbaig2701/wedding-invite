import type { InviteContent } from '../../content/types'
import { CuspedArch } from '../Ornaments'
import { Reveal } from '../Reveal'

export function Photo({ content }: { content: InviteContent }) {
  const c = content
  return (
    <section className="photo paper section-paper" aria-label="The couple">
      <div className="col">
        <Reveal>
          <div className="photo-frame" role={c.photoUrl ? 'img' : undefined} aria-label={c.photoUrl ? (c.photoCaption || `${c.couple.first} and ${c.couple.second}`) : undefined}>
            <CuspedArch className="photo-frame-svg" lobes={9} mirror double strokeWidth={1.4} imageHref={c.photoUrl || undefined} fill={c.photoUrl ? undefined : 'var(--paper-shadow)'} />
            {!c.photoUrl && (
              <div className="photo-placeholder" aria-hidden="true">
                <span className="font-display" style={{ fontSize: '2.6rem', fontStyle: 'italic', color: 'var(--ink-soft)' }}>{c.couple.first[0]} &amp; {c.couple.second[0]}</span>
                <span style={{ fontSize: '0.8rem', letterSpacing: '0.2em', textTransform: 'uppercase' }}>Photo to follow</span>
              </div>
            )}
          </div>
          {c.photoCaption && <p className="photo-caption">{c.photoCaption}</p>}
        </Reveal>
      </div>
    </section>
  )
}
