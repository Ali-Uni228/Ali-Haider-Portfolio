# Ali Haider — Portfolio

A Next.js 16 portfolio built on top of a GitHub template, restyled and re-populated
with Ali Haider's own content: the 3D lanyard hero, a Supabase-backed admin CMS,
and full case-study sections for JARVIS and DeathLeade Network.

## What's in here

- **Hero** — 3D floating ID-card (react-three-fiber + Rapier), rebranded copy
  pulled directly from your own hero statement and status line.
- **About** — full bio (all 3 paragraphs, unshortened), your quote, your portrait,
  and a working "Download CV" button pointing at your real resume.
- **Featured Projects** (new) — JARVIS and DeathLeade Network as full case
  studies: screenshot switcher, clickable inspect-pins, inline SVG architecture
  diagrams, and the "Why I Built It / The Problem / What It Taught Me" narrative
  grid — all content taken verbatim from your original site.
- **Portfolio Showcase** — the template's existing Supabase-backed
  projects/certificates/tech-stack tabs, with admin CRUD kept intact.
- **Tech Stack** (new) — a static section grouped exactly like your original
  site (Languages / AI & Automation / Backend / Frontend & Graphics).
- **Education** (new) — your degree, institution, coursework focus areas, and
  your "Current Focus" bullet list.
- **Contact** — the template's contact form, plus your real LinkedIn, GitHub,
  Resume, and a working click-to-copy email row (matching your original site's
  email interaction).
- **Admin panel** (`/admin`) — unchanged from the template: login, projects
  CRUD, certificates, tech stack, comments moderation, all gated by Supabase
  auth via `middleware.ts`.

## Setup

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Create a Supabase project** (free tier is fine) at
   [supabase.com](https://supabase.com).

3. **Run the schema, then the seed data**, in the Supabase SQL editor, in this
   order:
   - `backup.sql` — creates the `projects`, `certificates`, `tech_stack`, and
     `comments` tables (this is from the original template).
   - `seed-ali-portfolio.sql` — inserts your 4 "Other Projects" (NOVA, Solar
     System Explorer, Tetrius, Smart Parking) and your tech stack list, using
     the exact text from your original site. Image paths point at files
     already bundled in `public/assets/ali/projects`, so no Supabase Storage
     upload is required for these to display right away.

4. **Set up Supabase Auth** so you can log into `/admin`: in your Supabase
   project, go to Authentication -> Users, and manually create a user with the
   email/password you want to log in with (the template doesn't expose a
   public sign-up flow, which is intentional).

5. **Copy `.env.example` to `.env.local`** and fill in your Supabase project
   URL and anon key (Settings -> API in your Supabase dashboard):

   ```bash
   cp .env.example .env.local
   ```

6. **Run it**

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000).

## Notes

- The "Other Projects" grid and Tech Stack admin tab are database-driven, so
  you can add/edit/delete them any time from `/admin` without touching code.
  The Featured Projects (JARVIS, DeathLeade) and the public Tech Stack
  section are hand-built React components (not database-driven) since they
  needed a richer layout than the generic card format — edit
  `src/components/sections/FeaturedProjects.tsx` and
  `src/components/sections/TechStack.tsx` directly to change them.
- Fixed a bug from the original template where the project detail page and
  admin edit page assumed `technologies`/`key_features` were comma-separated
  strings, but the database column type is a Postgres array — this crashed
  on real array data. Both pages now handle either shape.
- Before deploying: double check the DeathLeade "Visit Website" link and the
  JARVIS/DeathLeade status lines are still accurate, since those describe
  live project status.
