# GDG Git & GitHub Workshop

**Branches, PRs, rebasing, and CI/CD — the way real teams work.**

This repo is the hands-on half of the workshop. Everyone adds their own profile in a branch, opens a pull request, watches CI and the Vercel preview, gets a review, and merges. Merged profiles show up on the wall at the deployed site.

## Attendees: add yourself

Replace `<your-username>` with your GitHub username.

```bash
# 1. Start from fresh main. One task, one branch.
git switch main
git pull
git switch -c feat/add-<your-username>

# 2. Add your profile. The file name must be your username in lowercase.
cp src/profiles/_template.json src/profiles/<your-username>.json
#    edit it, then check it
npm install
npm run validate:profiles
npm run dev          # http://localhost:3000

# 3. Commit like a human wrote it.
git add src/profiles/<your-username>.json
git commit -m "feat(profiles): add <your-username>"

# 4. Push and open a pull request on GitHub.
git push -u origin feat/add-<your-username>
```

Then:

5. **Watch CI and the preview.** GitHub Actions validates your file, lints, and builds. Vercel comments a preview URL on the PR. Open it and find your card on the wall and at `/p/<your-username>`.
6. **Get a review, then squash & merge.** One approval plus green checks unlocks the merge button. Delete the branch afterward.

Profile fields are documented in [`src/profiles/README.md`](src/profiles/README.md). Only touch your own file.

## Organizers: setup

1. Edit `src/data/event.ts`: chapter name, repo URL, slides link, and the list of organizer usernames (they get a badge).
2. Add attendees as collaborators on the repo so they can push branches. Forks work too, but Vercel does not build previews for PRs from forks by default.
3. Import the repo on [Vercel](https://vercel.com/new) with the GitHub integration so every PR gets a preview deployment.
4. In GitHub branch protection for `main`: require the **CI / check** status check and at least one approval. Set squash merge as the only allowed strategy.

## How it works

- `src/profiles/*.json` — one file per person. Each attendee only adds a file, so PRs never conflict with each other.
- `src/lib/validate-profile.mjs` — the single set of rules for a profile, used at build time and by CI.
- `scripts/validate-profiles.mjs` — `npm run validate:profiles`. Fails the build on a bad file, a duplicate, or a misnamed file.
- `src/app/page.tsx` — the landing page with the steps and the wall.
- `src/app/p/[handle]/page.tsx` — a statically generated page per profile.
- `.github/workflows/ci.yml` — validate, lint, build on every PR.

Built with Next.js 16 and Tailwind CSS 4.
