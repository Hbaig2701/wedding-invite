import type { InviteContent } from '../../content/types'
import { renderMarkup } from '../../lib/markup'
import type { Theme } from '../../theme/types'
import { CuspedArch, Divider } from '../Ornaments'
import { GarlandArch } from '../Illumination'
import { Reveal } from '../Reveal'

export function Invitation({ content, theme }: { content: InviteContent; theme: Theme }) {
  const c = content
  return (
    <section className="invitation paper paper-edge-top section-paper" aria-label="The invitation">
      <div className="col">
        <Reveal>
          <div className="invitation-card">
            {theme.hero === 'folio'
              ? <GarlandArch className="invitation-garland" archWidth={0.8} lobes={9} density={0.85} seed={11} pad={10} />
              : <CuspedArch className="invitation-arch" lobes={9} mirror double strokeWidth={1.3} />}
            <p className="eyebrow" style={{ color: 'var(--ink-faint)' }}>Bismillah</p>
            <p className="invitation-text letterpress" style={{ marginTop: '1.4rem' }}>{renderMarkup(c.invitationLine)}</p>
            {c.invitationClosing && <p className="invitation-closing">{c.invitationClosing}</p>}
            <Divider className="mt-8" width={200} />
            <p className="invitation-date letterpress-deep">{c.date.long}</p>
            <p className="invitation-closing" style={{ marginTop: '0.6rem' }}>{c.city}</p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
