import type { InviteContent } from '../../content/types'
import { renderMarkup } from '../../lib/markup'
import type { Theme } from '../../theme/types'
import { CuspedArch, Divider } from '../Ornaments'
import { Swag } from '../Flora'
import { Reveal } from '../Reveal'

export function Invitation({ content, theme }: { content: InviteContent; theme: Theme }) {
  const c = content
  return (
    <section className="invitation paper paper-edge-top section-paper" aria-label="The invitation">
      <div className="col">
        <Reveal>
          <div className="invitation-card">
            {theme.hero === 'folio'
              ? <Swag position="top" className="invitation-swag-top" />
              : <CuspedArch className="invitation-arch" lobes={9} mirror double strokeWidth={1.3} />}
            <p className="eyebrow" style={{ color: 'var(--ink-faint)' }}>Bismillah</p>
            <p className="invitation-text letterpress" style={{ marginTop: '1.4rem' }}>{renderMarkup(c.invitationLine)}</p>
            {c.invitationClosing && <p className="invitation-closing">{c.invitationClosing}</p>}
            <Divider className="mt-8" width={200} />
            <p className="invitation-date letterpress-deep">{c.date.long}</p>
            <p className="invitation-closing" style={{ marginTop: '0.6rem' }}>{c.city}</p>
            {theme.hero === 'folio' && <Swag position="bottom" className="invitation-swag-bottom" />}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
