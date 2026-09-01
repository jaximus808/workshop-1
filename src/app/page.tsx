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
      <header className="border-b border-border bg-header">
        <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-3">
          <MarkGithub className="size-7" />
          <span className="text-sm font-semibold">
            {event.chapter} · {event.title}
          </span>
          <nav className="ml-auto flex items-center gap-4 text-sm">
            <a href="#add" className="hidden text-muted hover:text-foreground sm:inline">
              Add yourself
            </a>
            <a href="#wall" className="hidden text-muted hover:text-foreground sm:inline">
              Wall
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

      <main className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-4 py-10">
        {/* Hero */}
        <section className="grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <p className="font-mono text-sm text-accent">&lt;/&gt; {event.chapter}</p>
            <h1 className="mt-2 text-4xl font-semibold tracking-tight sm:text-5xl">
              {event.title}
            </h1>
            <p className="mt-3 max-w-2xl text-lg text-muted">{event.tagline}</p>
            <p className="mt-5 max-w-2xl text-base">
              This site is the hands-on part. Add your profile in a branch, open
              a pull request, watch CI go green, get it merged, and you show up
              on the wall below. Every card here came in through a PR.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="#add"
                className="rounded-md bg-success px-4 py-2 text-sm font-semibold text-white hover:opacity-90"
              >
                Add yourself
              </a>
              <a
                href={event.slides}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md border border-border px-4 py-2 text-sm font-medium hover:bg-border/40"
              >
                Slides
              </a>
            </div>
          </div>
          <dl className="grid grid-cols-2 gap-4 md:grid-cols-1">
            <div className="rounded-md border border-border p-4">
              <dt className="text-xs uppercase tracking-wide text-muted">On the wall</dt>
              <dd className="mt-1 text-3xl font-semibold">{profiles.length}</dd>
            </div>
            <div className="rounded-md border border-border p-4">
              <dt className="text-xs uppercase tracking-wide text-muted">Ways in</dt>
              <dd className="mt-1 flex items-center gap-2 text-lg font-semibold">
                <RepoForked className="text-muted" /> Pull request
              </dd>
            </div>
          </dl>
        </section>

        {/* Lifecycle */}
        <section className="rounded-md border border-border p-5">
          <h2 className="text-base font-semibold">The pull request lifecycle</h2>
          <p className="mb-4 mt-1 text-sm text-muted">
            A PR is a conversation, not a formality. The diff is the first message.
          </p>
          <Lifecycle />
        </section>

        {/* Steps */}
        <section id="add" className="scroll-mt-20">
          <h2 className="text-2xl font-semibold">Add yourself</h2>
          <p className="mt-1 text-muted">
            Six steps. Replace <code className="font-mono text-sm">&lt;your-username&gt;</code>{" "}
            with your GitHub username.
          </p>
          <ol className="mt-6 grid gap-4 lg:grid-cols-2">
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
        </section>

        {/* Wall */}
        <section id="wall" className="scroll-mt-20">
          <div className="flex items-end justify-between">
            <div>
              <h2 className="text-2xl font-semibold">The wall</h2>
              <p className="mt-1 text-muted">
                Everyone whose PR has been merged to main.
              </p>
            </div>
            <a
              href={`${event.repo}/pulls`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-accent hover:underline"
            >
              Open PRs →
            </a>
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {profiles.map((p) => (
              <ProfileCard key={p.github} profile={p} />
            ))}
            <a
              href="#add"
              className="flex min-h-40 flex-col items-center justify-center rounded-md border border-dashed border-border p-4 text-center text-muted hover:border-accent hover:text-accent"
            >
              <span className="text-3xl">+</span>
              <span className="mt-1 text-sm font-medium">This spot is yours</span>
              <span className="text-xs">Open a PR to claim it</span>
            </a>
          </div>
        </section>

        {/* Rules */}
        <section className="rounded-md border border-border">
          <div className="border-b border-border bg-canvas-subtle px-5 py-3">
            <h2 className="text-base font-semibold">The rules that matter</h2>
          </div>
          <ul className="divide-y divide-border">
            {rules.map((r) => (
              <li key={r} className="flex items-start gap-3 px-5 py-3 text-sm">
                <CheckCircleFill className="mt-0.5 shrink-0 text-success" />
                {r}
              </li>
            ))}
          </ul>
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
