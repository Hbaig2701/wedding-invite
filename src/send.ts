import './send.css'

/**
 * Private helper for the families (/send/shaadi/, /send/reception/): type who
 * it's for, tap the button, and WhatsApp opens with the message written and
 * the invitation link in it. Uses WhatsApp's own share link (wa.me/?text=);
 * nothing is stored or sent by this page. Not linked from the invitations.
 */
const SITE = 'https://imanandhamzaswedding.site'
const EVENTS = {
  shaadi: {
    title: 'Shaadi',
    button: 'Send Shaadi invite',
    line: 'We request the honour of your presence at the wedding of our beloved daughter, InshaAllah.',
    url: `${SITE}/shaadi/`,
  },
  reception: {
    title: 'Reception',
    button: 'Send Reception invite',
    line: 'We request the honour of your presence at the reception of our beloved son, InshaAllah.',
    url: `${SITE}/reception/`,
  },
} as const

const key = document.body.dataset.event === 'reception' ? 'reception' : 'shaadi'
const ev = EVENTS[key]

document.title = `Send the ${ev.title} invitation`
document.getElementById('app')!.innerHTML = `
  <main>
    <h1>Send the ${ev.title} invitation</h1>
    <p class="sub">Type who it's for, tap the button, then choose them in WhatsApp</p>

    <label for="name">Family name</label>
    <input id="name" autocomplete="off" autocapitalize="words" placeholder="e.g. Khan" />
    <p class="hint">Makes “Mr. and Mrs. Khan,”</p>

    <label for="greet">Or your own greeting (optional)</label>
    <input id="greet" autocomplete="off" autocapitalize="sentences" placeholder="e.g. Mr. and Mrs. Khan and family" />
    <p class="hint">If filled in, this is used instead</p>

    <section class="card ${key}">
      <h2>Message</h2>
      <div class="msg" id="msg"></div>
      <a class="btn" id="go" href="#" target="_blank" rel="noopener">${ev.button}</a>
    </section>

    <p class="note">WhatsApp opens with the message written. Pick the person or group, wait a second for the envelope preview to appear, then send. You can still change any words before sending.</p>
  </main>`

const name = document.getElementById('name') as HTMLInputElement
const greet = document.getElementById('greet') as HTMLInputElement
const msg = document.getElementById('msg')!
const go = document.getElementById('go') as HTMLAnchorElement

function greeting() {
  const g = greet.value.trim()
  if (g) return g.replace(/,\s*$/, '') + ','
  return `Mr. and Mrs. ${name.value.trim() || '________'},`
}
function update() {
  const text = `${greeting()}\n\n${ev.line}\n\nYour invitation: ${ev.url}`
  msg.textContent = text
  go.href = `https://wa.me/?text=${encodeURIComponent(text)}`
}
name.addEventListener('input', update)
greet.addEventListener('input', update)
update()
