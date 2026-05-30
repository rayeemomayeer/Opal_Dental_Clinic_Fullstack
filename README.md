# Opal Dental Clinic & Implant Centre

A premium, highly-animated, fully-responsive website for a dental clinic. Built as a
monorepo: a **Next.js** front-end and a separate **Express** API, sharing one workspace.

> **Status:** scaffolding complete. The animated Hero + Services sections (scroll-scrubbed
> implant frame sequence) are the next milestone.

## Tech stack

| Layer     | Tech                                                                      |
| --------- | ------------------------------------------------------------------------- |
| Front-end | Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS, shadcn/ui    |
| Animation | GSAP + ScrollTrigger, canvas frame-sequence scrubbing                     |
| State/data| Redux Toolkit + RTK Query                                                 |
| Back-end  | Node.js, Express, TypeScript                                              |
| Database  | PostgreSQL via Prisma ORM                                                 |
| Media     | Cloudinary                                                                |
| Tooling   | pnpm workspaces + Turborepo, ESLint, Prettier                             |

## Repository layout

```
.
├── apps/
│   ├── web/                  # Next.js front-end (@opal/web)
│   │   ├── public/sequence/  # 192 WebP implant frames (frame_0001 … frame_0192)
│   │   └── src/
│   │       ├── app/          # App Router (layout, page, globals.css)
│   │       ├── components/    # ui/ (shadcn) + providers
│   │       ├── lib/          # utils, gsap, sequence metadata
│   │       └── store/        # RTK Query api + store + typed hooks
│   └── api/                  # Express API (@opal/api)
│       ├── prisma/           # schema.prisma
│       └── src/              # app, index, env, routes, lib/prisma
├── assests/                  # source media (logo, mockups, screw_tooth.mov, …)
├── scripts/encode-sequence.sh# regenerate the WebP frame sequence from the .mov
├── turbo.json
└── package.json              # workspace root
```

## Getting started

Requires **Node ≥ 20.11** and **pnpm 9** (`corepack enable` will provide pnpm).

```bash
# 1. install all workspace deps
pnpm install

# 2. set up env files
cp apps/web/.env.example apps/web/.env.local
cp apps/api/.env.example apps/api/.env

# 3. (API) point DATABASE_URL at a Postgres instance, then:
pnpm db:generate     # generate Prisma client
pnpm db:migrate      # create tables

# 4. run everything (web on :3000, api on :4000)
pnpm dev
```

Run a single app instead: `pnpm --filter @opal/web dev` or `pnpm --filter @opal/api dev`.

## The implant animation

`assests/screw_tooth.mov` is a transparent (alpha) 8s / 192-frame / 24fps clip. Browsers can't
play `qtrle/.mov`, so it's pre-rendered into a WebP frame sequence
(`apps/web/public/sequence/frame_0001.webp` … `frame_0192.webp`, 1600×900, alpha).

The planned Hero → Services scroll experience draws the frame matching scroll progress onto a
`<canvas>`, driven by GSAP ScrollTrigger — the screw rotates in the hero and "plants" into the
gum as the user scrolls into the services section. Frame metadata lives in
`apps/web/src/lib/sequence.ts`.

To regenerate frames (e.g. after re-exporting the clip):

```bash
bash scripts/encode-sequence.sh
```

## Adding shadcn/ui components

The project is pre-configured (`apps/web/components.json`). Add components from `apps/web`:


```bash
cd apps/web
pnpm dlx shadcn@latest add card input dialog
```
