# Ali Haider — Portfolio

Static site. No build step, no framework — open `index.html` in a browser and
it works. To view it with the shared-storage-friendly `file://` restrictions
some browsers apply, you can also serve it locally:

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

## Structure

```
index.html
assets/
  css/
    tokens.css            design tokens (color, type, space, motion values)
    base.css              reset + shared components (reveal, readout, pins, tilt, magnetic)
    nav.css               fixed navigation bar + mobile hamburger menu
    hero.css              hero section with cursor-follow light effect
    case-study.css        JARVIS & DeathLeade featured project layouts + grid sections
    projects-gallery.css  other projects ledger with hover thumbnails
    tech-stack.css        skills grid with project-highlight on hover
    about.css             about me section with pull-quote
    education.css         education row + coursework + capstone note
    contact.css           contact links with magnetic interaction + copy email
    footer.css            minimal footer with status readout
    focus.css             (legacy file, not currently used in index.html)
  js/
    reveal.js             scroll-entrance animations
    interactions.js       scroll-progress, tilt, magnetic, inspect pins
    nav.js                mobile menu + smooth anchor scroll
    hero.js               Hero's cursor-light only
  images/
    README.md             exact filenames the placeholders expect
    favicon.svg / favicon-32.png / apple-touch-icon.png / favicon-512.png
    og-image.png          social preview image
  resume-ali-haider.pdf   placeholder — see below
```

## Sections (in order)

1. **Hero** — Name, degree, location, internship status, one authentic statement
2. **About Me** — Honest self-introduction as a student who builds hard projects
3. **Featured Projects** — JARVIS & DeathLeade with screenshots, architecture diagrams, and grids covering What I Built / Challenge / What I Learned / Architecture
4. **Other Projects** — SafeGuard AI, NOVA, Solar System, Tetrius, Parking System as a scannable ledger
5. **Technical Skills** — Languages, AI & Automation, Backend, Frontend & Tools grid
6. **Education** — BS AI at Air University, coursework, networking capstone
7. **Contact** — Email (click to copy), LinkedIn, GitHub, Resume download
8. **Footer** — Status readout + copyright

## Before you publish, do these three things

1. **Replace the resume.** The Resume button (nav + Contact) links to
   `assets/resume-ali-haider.pdf`. Export your real resume with that exact
   filename and drop it into `assets/` — no code changes needed. The current
   file is a one-page placeholder explaining this.

2. **Confirm your GitHub handle.** I pulled `github.com/alihaider` from your
   old site's markup, but verify this is your actual account. It's used
   in the Contact section and in the JSON-LD block in `<head>`. Search both
   for `alihaider` to update it.

3. **Drop in real screenshots.** See `assets/images/README.md` for exact
   filenames. Every placeholder Frame in `index.html` has a commented-out
   `<img>` tag directly above it showing exactly what to uncomment.

## How the motion works, briefly

- Respects `prefers-reduced-motion` throughout — every animated primitive
  (reveal, tilt, magnetic, scroll-progress) checks it and either disables
  itself or jumps straight to its end state.
- No scroll-hijacking: native wheel/trackpad/keyboard scrolling is never
  touched. Only in-page anchor clicks get a custom eased scroll.
- Inspect pins (pulsing dots on JARVIS and DeathLeade screenshots) are
  clickable buttons that reveal short engineering annotations.
- Tilt and magnetic effects are pointer-fine only — they don't attach at
  all on touch devices.

## Accessibility notes

- Every animated entrance is progressive enhancement: content is visible by
  default and only hidden-then-revealed once `html.js-ready` is present.
- Inspect pins are real `<button>` elements with full-sentence `aria-label`.
- Anchor-scroll targets have `tabindex="-1"` for correct keyboard focus.
- Copy email button supports keyboard activation (Enter/Space).
