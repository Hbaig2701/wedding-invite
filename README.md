# Iman & Hamza — digital wedding invitations

Two invitations, two links, one codebase.

| Link | Event | Content file | Theme file |
|---|---|---|---|
| `/shaadi/` | Shaadi · 21 Dec 2026 | `src/content/shaadi.ts` | `src/theme/shaadi.ts` |
| `/walima/` | Walima · 27 Dec 2026 | `src/content/walima.ts` | `src/theme/walima.ts` |

The root `/` redirects to `/shaadi/`.

## Run it

```bash
npm install
npm run dev        # http://localhost:5173/shaadi/  and  /walima/
npm run build      # → dist/  (deploy the folder to Vercel / Netlify as a static site)
```

## Editing words, dates, names

Everything a parent might want to change is in `src/content/shaadi.ts` and
`src/content/walima.ts`. Anything wrapped in `«…»` is a placeholder that still
needs a real value (venue, exact time, timeline, dress-code wording, WhatsApp
numbers, music track, couple photo). Nothing in `src/components` needs touching.

The invitation line supports `**name**` for the large display names, `*text*`
for italics, and `\n` for line breaks.

Colours live in the theme files as CSS variables. Both events share every
component; only the variables differ.

## RSVP → Google Sheet

1. Create a Google Sheet, open Extensions → Apps Script, paste
   `reference/rsvp-google-sheet-setup.gs`, run `setup` once.
2. Deploy as a Web app (execute as *Me*, access *Anyone*).
3. Paste the web-app URL into `rsvp.endpoint` in both content files.

Until an endpoint is set, the form runs in demo mode and pretends to succeed so
the confirmation state can be reviewed.

The **Responses** tab keeps every submission. The **Latest** tab shows the most
recent row per WhatsApp number per event, with a live headcount at the top.
Re-submitting from the same number replaces the earlier row there.

## WhatsApp link preview (Open Graph)

Each HTML entry (`shaadi/index.html`, `walima/index.html`) carries its own OG
tags. Replace `https://SITE_URL` with the real domain once it exists. The
preview images are `public/og/shaadi.jpg` and `public/og/walima.jpg`. To
regenerate them after a design change, run the dev server and:

```bash
npm run og
```

## Couple photo (Walima)

Drop the image in `public/photos/` and set `photoUrl: '/photos/your-file.jpg'`
in `src/content/walima.ts`. Keep it under ~300 KB (WebP or a well-compressed
JPEG); most guests are on mobile data.

## Music (optional)

Set `musicUrl` in the content file to a hosted MP3/AAC. The sound toggle only
appears when a URL is set, and playback starts after the envelope is opened
(the tap counts as the user gesture browsers require).

## Notes for whoever maintains this

- Stack: Vite + React + TypeScript, Tailwind (layout utilities only), Motion
  for the open sequence and reveals. No component library, no analytics, no
  third-party scripts. Fonts are self-hosted (Bodoni Moda, EB Garamond, Amiri).
- Every texture (grain, paper fibre, marbled liner, embossed lattice) is
  procedural SVG — nothing is shipped as a bitmap except the OG previews.
- The open sequence is silent by design (no sound effects). Music is optional via `musicUrl`.
- `prefers-reduced-motion` swaps the open sequence for a cross-fade.
- The gate uses `100dvh` with a `100vh` fallback for iOS Safari.
- Older WebViews (WhatsApp / Instagram in-app browsers) are the target floor:
  no `backdrop-filter`, no `:has()`, no `color-mix()` / `oklch`.
