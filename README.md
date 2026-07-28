# Ali Haider — Portfolio

A personal portfolio site built with Next.js, showcasing my software engineering
and AI projects — with a 3D interactive hero, full case studies for my flagship
projects, and a lightweight admin panel for managing everything else without
touching code.

**Live site:** _add your deployed URL here once live_

---

## Features

- **3D interactive hero** — a floating ID-card on a physics-simulated lanyard
  (react-three-fiber + Rapier), draggable, with my own photo on the card face.
- **About** — bio, quote, portrait, and a working CV download.
- **Flagship projects** — JARVIS and DeathLeade Network get full case-study
  treatment: an auto-advancing screenshot switcher, clickable inspect-pins on
  screenshots, inline SVG architecture diagrams, and a structured
  Why-I-Built-It / The Problem / What It Taught Me breakdown.
- **Other projects** — a self-scrolling marquee (pauses on hover, manual
  play/pause control) for smaller projects, click any tile for full details in
  a modal. New projects added through the admin panel appear here
  automatically, no code changes needed.
- **Certificates** — pulled live from the database, click any certificate for
  a full-screen preview.
- **Tech stack** — grouped by category (Languages, AI & Automation, Backend,
  Frontend & Graphics).
- **Education** — degree, focus areas, and current learning goals.
- **Contact** — a working contact form (delivers straight to my inbox via
  Web3Forms), plus direct links to GitHub, LinkedIn, and résumé, and a
  click-to-copy email address.
- **Admin panel** (`/admin`) — password-protected via Supabase Auth. Add,
  edit, and delete projects, certificates, and tech stack entries — including
  image uploads — without ever touching code.

## Tech stack

- **Framework:** Next.js 16 (App Router), React 19, TypeScript
- **Styling / animation:** Tailwind CSS, Framer Motion
- **3D:** react-three-fiber, @react-three/drei, @react-three/rapier
- **Backend:** Supabase (Postgres database, Auth, Storage)
- **Forms:** Web3Forms (contact form email delivery)

## Getting started

### 1. Install dependencies

```bash
npm install
```

### 2. Set up Supabase

Create a free project at [supabase.com](https://supabase.com), then in the
**SQL Editor**, run these two files in order:

1. `backup.sql` — creates the `projects`, `certificates`, `tech_stack`, and
   `comments` tables, plus row-level security policies for public reads and
   authenticated writes.
2. `seed-ali-portfolio.sql` — seeds initial tech stack data.

Then, in **Storage**, create three **public** buckets, exactly named:
- `projects`
- `certificates`
- `tech-stack`

And add matching storage policies so authenticated uploads/reads work (ask
if you need the exact SQL for this — it's a short set of `CREATE POLICY`
statements on `storage.objects`).

Finally, in **Authentication → Users**, manually add a user (email +
password) — this is what you'll log into `/admin` with.

### 3. Configure environment variables

```bash
cp .env.example .env.local
```

Fill in your Supabase project URL and anon key (found under
**Settings → API** in your Supabase dashboard).

### 4. Set up the contact form

Get a free access key at [web3forms.com](https://web3forms.com) and drop it
into the `access_key` field in `src/components/sections/contact/ContactForm.tsx`.

### 5. Run it

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project structure notes

- **Flagship projects** (JARVIS, DeathLeade) live directly in
  `src/components/sections/PortfolioShowcase.tsx` as hand-built content —
  their rich layout (diagrams, pins, multi-section narrative) doesn't fit a
  generic database row, so they're edited in code rather than through admin.
- **Other/marquee projects** are a hybrid: a small fixed starter set in code,
  merged at runtime with anything added through `/admin` → Projects — see
  `ProjectMarquee.tsx` and the `dbProjects` fetch in `PortfolioShowcase.tsx`.
- **Tech Stack** section on the homepage is static (`TechStack.tsx`); the
  `/admin` → Tech Stack page manages a separate database table used
  internally, not yet wired to the homepage display.

## Deployment

Deployed on [Vercel](https://vercel.com). Push to `main`, connect the repo in
Vercel, add the same environment variables from `.env.local` in the Vercel
project settings, and it deploys automatically on every push.