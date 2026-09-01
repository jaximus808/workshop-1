import { checklist, profile, projects } from "@/data/profile";
import { ContributionGraph } from "@/components/ContributionGraph";
import { ProjectCard } from "@/components/ProjectCard";
import { Sidebar } from "@/components/Sidebar";
import { CheckCircleFill, Circle, MarkGithub, Pin, Repo } from "@/components/icons";

const tabs = [
  { label: "Overview", count: null, active: true },
  { label: "Repositories", count: profile.stats.repos, active: false },
  { label: "Projects", count: projects.length, active: false },
  { label: "Stars", count: 0, active: false },
];

export default function Home() {
  const done = checklist.filter((c) => c.done).length;
  const pct = Math.round((done / checklist.length) * 100);

  return (
    <div className="flex flex-1 flex-col">
      <header className="border-b border-border bg-header">
        <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-3">
          <MarkGithub className="size-8" />
          <span className="text-sm font-semibold">{profile.handle}</span>
          <a
            href={profile.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-auto rounded-md border border-border px-3 py-1 text-sm font-medium hover:bg-border/40"
          >
            View on GitHub
          </a>
        </div>
        <nav className="mx-auto flex max-w-6xl gap-1 overflow-x-auto px-4 text-sm">
          {tabs.map((t) => (
            <span
              key={t.label}
              className={`flex items-center gap-2 border-b-2 px-3 py-2 ${
                t.active
                  ? "border-[#fd8c73] font-semibold"
                  : "border-transparent text-muted"
              }`}
            >
              {t.label}
              {t.count !== null && (
                <span className="rounded-full bg-border/60 px-2 text-xs font-medium text-foreground">
                  {t.count}
                </span>
              )}
            </span>
          ))}
        </nav>
      </header>

      <main className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-8 md:grid-cols-[296px_1fr]">
        <Sidebar />

        <div className="flex min-w-0 flex-col gap-6">
          {/* Profile README */}
          <section className="rounded-md border border-border">
            <div className="flex items-center gap-2 border-b border-border bg-canvas-subtle px-4 py-2 text-xs text-muted">
              <Repo />
              <span className="font-mono">
                {profile.handle}/README.md
              </span>
            </div>
            <div className="px-6 py-5">
              <h2 className="text-2xl font-semibold">
                Hi, I&apos;m {profile.name.split(" ")[0]} 👋
              </h2>
              <p className="mt-2 text-base text-muted">{profile.tagline}</p>
              <h3 className="mt-6 border-b border-border pb-1 text-lg font-semibold">
                🔭 Currently
              </h3>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm">
                {profile.currentFocus.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
              <h3 className="mt-6 border-b border-border pb-1 text-lg font-semibold">
                📫 Reach me
              </h3>
              <p className="mt-2 text-sm">
                Email{" "}
                <a href={`mailto:${profile.email}`} className="text-accent hover:underline">
                  {profile.email}
                </a>{" "}
                or find me on{" "}
                <a
                  href={profile.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent hover:underline"
                >
                  GitHub
                </a>
                .
              </p>
            </div>
          </section>

          {/* Pinned */}
          <section>
            <h2 className="mb-3 flex items-center gap-2 text-base font-semibold">
              <Pin className="text-muted" /> Pinned
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {projects.map((p) => (
                <ProjectCard key={p.name} project={p} />
              ))}
            </div>
          </section>

          <ContributionGraph />

          {/* Profile optimization */}
          <section className="rounded-md border border-border">
            <div className="border-b border-border bg-canvas-subtle px-4 py-3">
              <div className="flex items-center justify-between">
                <h2 className="text-base font-semibold">Profile optimization</h2>
                <span className="text-sm text-muted">
                  {done}/{checklist.length} complete
                </span>
              </div>
              <p className="mt-1 text-sm text-muted">
                Setting up a professional GitHub profile to showcase future
                projects.
              </p>
              <div className="mt-3 h-2 overflow-hidden rounded-full bg-border/60">
                <div
                  className="h-full rounded-full bg-success"
                  style={{ width: `${pct}%` }}
                />
              </div>
            </div>
            <ul className="divide-y divide-border">
              {checklist.map((item) => (
                <li key={item.label} className="flex gap-3 px-4 py-3">
                  {item.done ? (
                    <CheckCircleFill className="mt-0.5 text-success" />
                  ) : (
                    <Circle className="mt-0.5 text-muted" />
                  )}
                  <div>
                    <p
                      className={`text-sm font-medium ${
                        item.done ? "text-muted line-through" : ""
                      }`}
                    >
                      {item.label}
                    </p>
                    <p className="text-sm text-muted">{item.detail}</p>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </main>

      <footer className="border-t border-border py-6 text-center text-xs text-muted">
        Built with Next.js and Tailwind. Edit{" "}
        <code className="font-mono">src/data/profile.ts</code> to make it yours.
      </footer>
    </div>
  );
}
