import type { InviteContent } from '../../content/types'
import { whatsappUrl } from '../../lib/rsvp'
import { Reveal } from '../Reveal'

const B = import.meta.env.BASE_URL

const WaIcon = () => (<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5.1-1.3A10 10 0 1 0 12 2zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1-.2.2-.6.8-.8 1-.1.2-.3.2-.5.1-.7-.3-1.4-.6-2-1.2-.5-.5-.9-1-1.2-1.6-.1-.2 0-.4.1-.5l.4-.5.2-.4c.1-.2 0-.3 0-.5l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.6.6-.9 1.3-.9 2.1.1.9.4 1.8 1 2.6 1.1 1.6 2.5 2.9 4.2 3.7.5.2 1 .4 1.5.5.5.2 1 .1 1.5 0 .6-.2 1.1-.6 1.4-1.1.1-.3.2-.6.1-.9l-.4-.3z"/></svg>)

export function Contact({ content }: { content: InviteContent }) {
  const c = content
  return (
    <section className="contact paper paper-edge-bottom section-paper" aria-label="Contact">
      <div className="sched-deco contact-deco" aria-hidden="true">
        <span className="sched-line contact-line-tl" />
        <span className="sched-line contact-line-br" />
        <img className="sched-spray contact-spray-tr" src={`${B}flora/spray-tl.png`} alt="" loading="lazy" decoding="async" />
        <img className="sched-spray contact-spray-bl" src={`${B}flora/spray-br.png`} alt="" loading="lazy" decoding="async" />
      </div>
      <div className="col">
        <Reveal><div className="section-head" style={{ marginBottom: '0.6rem' }}><h2 className="section-title letterpress">For any questions,<br />please reach out</h2></div></Reveal>
        <span className="contact-rule" aria-hidden="true" />
        <div className="contact-list">
          {c.contacts.map((p, i) => (
            <Reveal key={i} index={i + 1}>
              <div className="contact-card">
                <div className="contact-name letterpress">{p.name}</div>
                <div className="contact-role">{p.role}</div>
                <a className="contact-link" href={whatsappUrl(p.whatsapp, `Assalamu alaikum ${p.name}, I have a question about the ${c.eventLabel} on ${c.date.short}.`)} target="_blank" rel="noopener noreferrer">
                  <span className="contact-link-main"><WaIcon /> Message on WhatsApp</span>
                  <span className="contact-number">+{p.whatsapp.replace(/^(\d{3})(\d+)$/, '$1 $2')}</span>
                </a>
              </div>
            </Reveal>
          ))}
        </div>
        <span className="contact-rule" aria-hidden="true" />
        <Reveal index={c.contacts.length + 1}>
          <p className="contact-closing">We look forward to celebrating with you!</p>
          <div className="contact-inshallah" role="img" aria-label="إن شاء الله" />
        </Reveal>
      </div>
    </section>
  )
}
