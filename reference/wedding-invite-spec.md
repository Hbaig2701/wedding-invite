# Digital Wedding Invitation — Build Spec

## 0. Context for whoever picks this up

Two separate invitations, two separate links, one codebase.

| | Shaadi | Walima |
|---|---|---|
| Date | 21 December 2026 | 27 December 2026 |
| City | Lahore, Pakistan | Lahore, Pakistan |
| Hosted by | The bride's parents, Sania and Shahid | The groom's parents |
| Contact | Shahid, WhatsApp | Groom's father, WhatsApp |
| Couple photo | No — private, this goes to everyone | Yes |
| Palette | See §3 | Its own palette, same construction |

~200 guests per event. Delivered as a link over WhatsApp. No login, no per-guest
personalisation — one link goes to everyone, guests type their own names.

There is a working prototype at `reference/shaadi-invite.html`. Treat it as a
**content and structure reference only**. The layout order, the section list, the
config-block approach and the RSVP payload shape are all correct and worth keeping.
The visual execution is not. See §1.

---

## 1. The quality bar — read this before writing any code

The prototype fails in a specific, diagnosable way: **it looks like flat vector
artwork rather than a photograph of a real object.** Everything is a solid hex fill,
a 1px stroke, and a CSS rotate. That reads as a 2D cartoon.

The target is the opposite: the guest should feel they are holding a real envelope
made of real paper, photographed under real light. Closer to a luxury stationer's
product shot than to a web illustration.

Three named problems to solve:

**1.1 — Flat colour.**
No surface in the final build should be a single flat fill. Every large surface
needs at least three layers stacked: a base colour, a broad soft gradient
establishing a light direction, and a fine grain/noise overlay at low opacity.
Add a subtle vignette at the edges of full-bleed areas. Vary colour temperature
across a surface — the lit side warmer, the shadowed side cooler — rather than
just changing lightness. Deep greens in particular go dead when they're one hex;
they need a near-black cool green in the shadow and a warmer, slightly yellow
green where the light lands.

**1.2 — Gold that isn't gold.**
`#C9A227` is mustard. Real foil is a *gradient with specular bands* — it goes
dark brown, bright near-white, back to amber across a few degrees of surface
angle. Any gold element (rules, borders, ornament, text) needs a multi-stop
linear gradient with a hot highlight, plus a faint blur behind it to suggest
light bouncing off. On the envelope, gold should shift subtly as the flap moves.

**1.3 — Cartoon motion.**
The current open is a `rotateX` on a flat triangle. It looks like a paper cutout
because the flap has no thickness, casts no shadow, and moves at a constant
mechanical rate. See §4 for what it should be instead.

**The test:** screenshot the hero, put it next to the reference screenshots in
`/inspo`, and ask whether it looks like the same category of product. If ours
looks like a web page and theirs looks like an object, it isn't done.

---

## 2. Stack

- Vite + React + TypeScript
- Tailwind for layout, plain CSS/CSS modules for anything material (gradients,
  textures, filters) — Tailwind's utility palette will push you back toward flat
- Motion (framer-motion) for the open sequence and scroll reveals
- No UI component library. Nothing here looks like a component library.
- Deploy: Vercel or Netlify. Two routes or two builds, `/shaadi` and `/walima`,
  from one theme-able component tree.

Total weight under 2.5 MB on first load, under 1.2 MB for the above-the-fold
envelope. Most guests are on Pakistani mobile data. Textures must be compressed
(WebP/AVIF, and consider generating grain procedurally rather than shipping a PNG).

---

## 3. Visual direction

**Material reference:** Mughal illuminated manuscript. Hand-marbled endpapers,
gold-leaf borders that have slightly cracked with age, deep dyed paper, a cusped
(multifoil) arch as the recurring frame shape. Not "Indian wedding clipart" —
look at Persian and Mughal folio pages, the Padshahnama, illuminated Quran
margins.

**Shaadi palette** — a starting point, refine against the inspo:
- Ground: a deep pine-emerald that shifts toward near-black in shadow
- Secondary: a warmer moss for lit surfaces
- Metal: antique gold, warm, slightly rosy in the highlights, not yellow
- Accent: lac red for the wax seal only
- Paper: an off-white with a warm cast and visible fibre, never pure white
- Ink: a warm near-black brown, never `#000`

**Walima palette:** its own direction, to be decided. Same construction rules.
Likely a lighter, ivory-and-champagne register to contrast with the Shaadi's
deep green, since the two invitations will be seen days apart by the same people.

**Typography.** Two faces maximum. A high-contrast display serif with real
optical sizing for the names and section headings, and a readable book serif for
body. Avoid Cormorant and Great Vibes — both are the default wedding-template
choice and instantly cheapen the result. Names should be set large, tight, and
centred; the layout is bilaterally symmetric on purpose, because the manuscript
tradition is.

**Paper texture.** Every parchment-coloured section needs visible fibre and a
very slight warp — not a flat cream rectangle. Headings on paper sections should
look letterpressed: a 1px light shadow above and a darker one below, so the type
sits *in* the paper rather than on it.

---

## 4. The open sequence

This is the moment the whole thing is judged on. Budget real time here.

The guest lands on a closed envelope, centred, filling most of the viewport.
It is lit from the upper left. It sits on a surface and casts a soft contact
shadow beneath it, darker and tighter where the envelope meets the surface,
diffusing outward.

**Before the tap.** The envelope is not static. It breathes almost
imperceptibly — a very slow drift, 1–2 degrees of rotation over several
seconds, with the specular highlight on the gold and the wax shifting as it
moves. A device-tilt parallax on mobile (`deviceorientation`) selling the
object as physical is a strong addition if permissions allow; fall back to
pointer-position parallax on desktop. A single quiet "tap to open" cue,
delayed a couple of seconds so the object is seen first.

**The tap.** Sequence, roughly 2.5–3 seconds total, overlapping not sequential:

1. The seal reacts first — a micro-compress, then it cracks. Two halves separate
   slightly along an irregular line. Do not fade it out; wax breaks, it doesn't
   dissolve. A few small chips fall and leave frame.
2. The flap begins to lift as the seal releases. It must have **thickness** —
   render the paper edge as a visible lighter band on the fold, so it is not a
   plane. Use real `perspective` on the parent and `transform-style: preserve-3d`.
3. As the flap rotates past vertical, the shadow it casts on the envelope face
   sweeps across and shortens. This shadow is what sells the depth more than the
   rotation does. Animate it.
4. The lighting on the flap's face changes through the arc — brighter as it turns
   toward the light source, dimming as it passes over. A gradient overlay whose
   opacity is driven by the same progress value as the rotation.
5. The card slides up out of the envelope, behind the front panel, with its own
   shadow falling on the envelope beneath it.
6. The card settles with a slight overshoot, and only then does content fade in.

**Easing.** Nothing in this sequence is linear or a symmetric ease. The flap has
mass — it starts slowly, accelerates as gravity takes it, and settles with a tiny
bounce. Use spring physics, not bezier curves, for the flap and the card. The
seal crack is the exception: fast, sharp, over in 200ms.

**Sound.** A paper rustle on the flap and a soft crack on the seal, both very
quiet, both only if the user has already interacted (browsers block autoplay).
Optional, but it is a large part of why the reference feels expensive.

**Reduced motion.** Honour `prefers-reduced-motion`: cross-fade from closed
envelope to content, no rotation, no parallax.

---

## 5. Sections, in order

Content and copy live in the config (§6). The prototype has all of these already
and the order is correct.

1. **Envelope gate** — §4
2. **Hero** — Bismillah in Arabic with an English line beneath, both names, date,
   city. Full-bleed, deepest colour, most ornament.
3. **Countdown** — to the ceremony start time. Days/hours/minutes/seconds.
4. **Invitation** — the hosting parents' line and the couple's names. Set on
   paper, letterpressed. This is the formal heart of it; give it air.
5. **Details** — date, time, venue, address. Then two actions: open in Maps,
   add to calendar (generate an `.ics` client-side, plus a Google Calendar link).
6. **Order of the day** — vertical timeline, times on the left.
7. **Dress code** — short line plus colour swatches.
8. **RSVP** — §7
9. **Contact** — WhatsApp button(s) for the hosting side only.
10. **Footer** — names and a closing verse.

Walima adds a couple photo section; Shaadi does not.

Scroll reveals should be restrained — a short rise and fade, staggered by a few
tens of milliseconds within a section. After the envelope, the page should feel
calm. One spectacular moment, then quiet.

---

## 6. Content model

All editable text lives in one typed config object per event, `src/content/shaadi.ts`
and `src/content/walima.ts`. The couple's parents will revise wording repeatedly;
nobody should need to touch a component to change a name, a time, or a venue.

Fields: couple names, seal initials, invitation line (allows inline markup),
long and short date, city, time label and note, ISO start/end for countdown and
calendar, venue name, address, maps query, timeline array, dress code object with
swatches, RSVP deadline, thank-you copy for accept and decline, RSVP endpoint,
contacts array, music URL, footer verse.

Theme (palette, type scale, texture choices) lives in a parallel theme object so
the two events differ without forking components.

---

## 7. RSVP

Posts JSON to a Google Apps Script web app, which appends to a Sheet. The script
is written and working — see `reference/rsvp-google-sheet-setup.gs`.

Payload: `event, name, phone, attending, adults, children, message, submittedAt`.

Rules:
- WhatsApp number is the identity key, not email. Many guests won't use email.
- Adults and children counted separately. Guest states their own numbers; no cap,
  we trust them.
- No dietary question.
- Changing a response means submitting the form again. The Sheet keeps every row;
  a second tab shows the latest row per number with a live headcount. No edit links.
- Adult/child counts hide when "regretfully decline" is selected.
- Submitting must work on a flaky connection: disable the button, show state, and
  on failure tell the guest to WhatsApp instead rather than silently swallowing it.

The confirmation state deserves as much care as the rest — it is the last thing
the guest sees. Not a grey "submitted" bar.

---

## 8. Constraints

- Mobile-first. Design at 390px. Desktop is a centred column, not a redesign.
- Must survive being opened inside the WhatsApp in-app browser and Instagram's,
  which are older WebViews. Test there specifically. `backdrop-filter`,
  `:has()`, and newer colour functions are the usual casualties.
- iOS Safari: the envelope must fill the viewport correctly with the URL bar
  both shown and hidden. Use `dvh`, not `vh`.
- Open Graph tags so the WhatsApp link preview shows the envelope, not a blank
  card. This matters — it is the first thing 200 people will see.
- Accessible: the envelope is keyboard-openable, form fields are labelled,
  contrast holds on the paper sections.
- No analytics, no third-party scripts, no cookie banner. Nothing to consent to.

---

## 9. Done means

- [ ] Side by side with `/inspo`, ours reads as the same class of product
- [ ] No flat fills anywhere; every surface has gradient plus grain
- [ ] Gold has specular highlights that move
- [ ] The flap has visible thickness and casts a moving shadow
- [ ] The open sequence uses spring physics and overlapping timing
- [ ] Opens correctly in the WhatsApp in-app browser on an older Android
- [ ] Envelope is under 1.2 MB
- [ ] An RSVP lands in the Sheet and appears on the Latest tab
- [ ] Resubmitting from the same number replaces the earlier row on that tab
- [ ] Every string is editable from the content file
- [ ] `prefers-reduced-motion` path works

---

## 10. Still unknown — leave as placeholders

Venue name and address. Exact ceremony start time. Real timeline entries. Dress
code wording. Shahid's WhatsApp number. Whether a surname appears on the
invitation line. The instrumental violin track. The Walima palette and photo.
Domain.

Build with the placeholders in and make them obvious in the content file.
