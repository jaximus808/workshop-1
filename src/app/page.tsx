import Link from "next/link";
import { event } from "@/data/event";
import { getProfiles } from "@/lib/profiles";
import { CodeBlock } from "@/components/CodeBlock";
import { Lifecycle } from "@/components/Lifecycle";
import { ProfileCard } from "@/components/ProfileCard";
import { CheckCircleFill, MarkGithub, RepoForked } from "@/components/icons";

const steps = [
  {
    title: "Start from fresh main",
    body: "Starting behind main means your first PR is already out of date. One task, one branch.",
    code: `git switch main
git pull
git switch -c feat/add-<your-username>`,
  },
  {
    title: "Add your profile file",
    body: "Copy the template. The file name must be your GitHub username in lowercase. You only touch your own file, so nobody conflicts with anybody.",
    code: `cp src/profiles/_template.json src/profiles/<your-username>.json
# edit it, then check it:
npm run validate:profiles
npm run dev   # http://localhost:3000`,
  },
  {
    title: "Commit like a human wrote it",
    body: "type(scope): imperative summary. One logical change per commit.",
    code: `git add src/profiles/<your-username>.json
git commit -m "feat(profiles): add <your-username>"`,
  },
  {
    title: "Push and open a pull request",
    body: "Pushed code is backed-up code. Fill in the PR template: what changed, why, how to test.",
    code: `git push -u origin feat/add-<your-username>
# then open the PR on GitHub`,
  },
  {
    title: "Watch CI and the preview deployment",
    body: "GitHub Actions validates your file, lints, and builds. Vercel comments a preview link on the PR. Open it and find your card.",
    code: null,
  },
  {
    title: "Get a review, then squash & merge",
    body: "One approval plus green checks unlocks the merge button. Squash keeps main linear: one PR, one commit. Delete the branch. It did its job.",
    code: null,
  },
];

const rules = [
  "Branch from fresh main. One task, one branch",
  "Commit messages: type(scope): summary",
  "PRs small, described, self-reviewed. Under ~400 lines",
  "Sync with main continuously. Conflicts are a distance problem",
  "Never rebase or force-push shared history",
  "Never push secrets. Never push straight to main",
  "Let CI be the mean reviewer, so humans can be the thoughtful one",
];

export default function Home() {
  const profiles = getProfiles();

  return (
    <div className="flex flex-1 flex-col">
      <header className="sticky top-0 z-10 border-b border-border bg-header">
        <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3">
          <MarkGithub className="size-7" />
          <span className="text-sm font-semibold">
            {event.chapter} · {event.title}
          </span>
          <nav className="ml-auto flex items-center gap-4 text-sm">
            <a href="#wall" className="hidden text-muted hover:text-foreground sm:inline">
              Wall
            </a>
            <a href="#add" className="hidden text-muted hover:text-foreground sm:inline">
              How to add yourself
            </a>
            <a
              href={event.slides}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden text-muted hover:text-foreground sm:inline"
            >
              Slides
            </a>
            <a
              href={event.repo}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md border border-border px-3 py-1 font-medium hover:bg-border/40"
            >
              Repo
            </a>
          </nav>
        </div>
      </header>

      <main className="flex flex-1 flex-col">
        {/* Wall — the main event */}
        <section id="wall" className="scroll-mt-16 border-b border-border bg-canvas-subtle">
          <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:py-14">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div>
                <p className="font-mono text-sm text-accent">
                  &lt;/&gt; {event.chapter} · {event.title}
                </p>
                <h1 className="mt-2 text-4xl font-semibold tracking-tight sm:text-6xl">
                  The wall
                </h1>
                <p className="mt-3 max-w-2xl text-lg text-muted">
                  Everyone here shipped a pull request today. Add your profile
                  in a branch, get it merged, and your card shows up.
                </p>
              </div>
              <div className="flex items-end gap-6">
                <div className="text-right">
                  <div className="text-5xl font-semibold leading-none tabular-nums sm:text-7xl">
                    {profiles.length}
                  </div>
                  <div className="mt-2 flex items-center justify-end gap-1.5 text-sm text-muted">
                    <RepoForked /> merged
                  </div>
                </div>
                <a
                  href="#add"
                  className="rounded-md bg-success px-5 py-3 text-base font-semibold text-white hover:opacity-90"
                >
                  Add yourself
                </a>
              </div>
            </div>

            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {profiles.map((p) => (
                <ProfileCard key={p.github} profile={p} />
              ))}
              <a
                href="#add"
                className="flex min-h-56 flex-col items-center justify-center rounded-md border-2 border-dashed border-border p-6 text-center text-muted transition-colors hover:border-accent hover:text-accent"
              >
                <span className="text-5xl leading-none">+</span>
                <span className="mt-3 text-lg font-semibold">This spot is yours</span>
                <span className="mt-1 text-sm">Open a PR to claim it</span>
              </a>
            </div>

            <div className="mt-6 text-right">
              <a
                href={`${event.repo}/pulls`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-accent hover:underline"
              >
                See who&apos;s in the queue: open PRs →
              </a>
            </div>
          </div>
        </section>

        {/* Instructions — everything you need to get on the wall */}
        <section id="add" className="scroll-mt-16">
          <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 py-12">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <h2 className="text-3xl font-semibold tracking-tight">How to add yourself</h2>
                <p className="mt-2 max-w-2xl text-muted">
                  Six steps from a fresh clone to a card on the wall. Replace{" "}
                  <code className="font-mono text-sm">&lt;your-username&gt;</code>{" "}
                  with your GitHub username. The slides cover the why; this
                  covers the how.
                </p>
              </div>
              <a
                href={event.slides}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md border border-border px-4 py-2 text-sm font-medium hover:bg-border/40"
              >
                Open the slides ↗
              </a>
            </div>

            <div className="rounded-md border border-border p-5">
              <h3 className="text-base font-semibold">The pull request lifecycle</h3>
              <p className="mb-4 mt-1 text-sm text-muted">
                A PR is a conversation, not a formality. The diff is the first message.
              </p>
              <Lifecycle />
            </div>

            <ol className="grid gap-4 lg:grid-cols-2">
              {steps.map((s, i) => (
                <li key={s.title} className="flex flex-col rounded-md border border-border p-5">
                  <div className="flex items-start gap-3">
                    <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-accent text-sm font-semibold text-white">
                      {i + 1}
                    </span>
                    <div>
                      <h3 className="text-base font-semibold">{s.title}</h3>
                      <p className="mt-1 text-sm text-muted">{s.body}</p>
                    </div>
                  </div>
                  {s.code && (
                    <div className="mt-4">
                      <CodeBlock>{s.code}</CodeBlock>
                    </div>
                  )}
                </li>
              ))}
            </ol>

            <div className="rounded-md border border-border">
              <div className="border-b border-border bg-canvas-subtle px-5 py-3">
                <h3 className="text-base font-semibold">The rules that matter</h3>
              </div>
              <ul className="divide-y divide-border">
                {rules.map((r) => (
                  <li key={r} className="flex items-start gap-3 px-5 py-3 text-sm">
                    <CheckCircleFill className="mt-0.5 shrink-0 text-success" />
                    {r}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-border py-6 text-center text-xs text-muted">
        Built during the {event.chapter} {event.title}. Every profile on this
        page is a merged pull request.{" "}
        <Link href="/p/jaxonpoentis" className="hover:text-accent hover:underline">
          Organizer
        </Link>
      </footer>
    </div>
  );
}
