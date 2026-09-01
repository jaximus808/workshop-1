# GitHub profile site

A GitHub-style profile page for showcasing projects, built with Next.js 16, Tailwind CSS 4, and deployed on Vercel.

It mirrors the layout of a GitHub profile: avatar and bio sidebar, a profile-README card, pinned projects, a contribution graph, and a **Profile optimization** checklist that tracks the steps for setting up a professional GitHub profile to showcase future projects.

## Make it yours

All content lives in one file: `src/data/profile.ts`.

- `profile` — name, handle, bio, location, email, links, and skills.
- `projects` — the pinned project cards. Set `status` to `shipped`, `in-progress`, or `planned`.
- `checklist` — the profile-optimization steps. Flip `done` as you complete them.

To show your real GitHub avatar, set `avatarUrl` to `https://github.com/<your-handle>.png`.

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deploy

Push to GitHub and import the repo on [Vercel](https://vercel.com/new). No extra configuration is needed.
