import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { event } from "@/data/event";
import { getProfile, getProfiles } from "@/lib/profiles";
import { Avatar } from "@/components/Avatar";
import { LinkIcon, MarkGithub } from "@/components/icons";

export function generateStaticParams() {
  return getProfiles().map((p) => ({ handle: p.github.toLowerCase() }));
}

export async function generateMetadata({
  params,
}: PageProps<"/p/[handle]">): Promise<Metadata> {
  const { handle } = await params;
  const profile = getProfile(handle);
  if (!profile) return { title: "Not found" };
  return {
    title: `${profile.name} · ${event.title}`,
    description: profile.bio,
  };
}

export default async function ProfilePage({ params }: PageProps<"/p/[handle]">) {
  const { handle } = await params;
  const profile = getProfile(handle);
  if (!profile) notFound();

  const links = Object.entries(profile.links ?? {}).filter(([, v]) => v);

  return (
    <div className="flex flex-1 flex-col">
      <header className="border-b border-border bg-header">
        <div className="mx-auto flex max-w-3xl items-center gap-3 px-4 py-3">
          <MarkGithub className="size-7" />
          <Link href="/" className="text-sm font-semibold hover:underline">
            {event.chapter} · {event.title}
          </Link>
          <Link href="/#wall" className="ml-auto text-sm text-muted hover:text-foreground">
            ← Back to the wall
          </Link>
        </div>
      </header>

      <main className="mx-auto w-full max-w-3xl px-4 py-10">
        <article className="rounded-md border border-border p-6 sm:p-8">
          <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-center">
            <Avatar handle={profile.github} name={profile.name} size={128} />
            <div className="min-w-0">
              <h1 className="text-3xl font-semibold">
                {profile.emoji ? `${profile.emoji} ` : ""}
                {profile.name}
              </h1>
              <p className="text-lg text-muted">@{profile.github}</p>
              {profile.role && <p className="mt-1 text-sm text-muted">{profile.role}</p>}
              {profile.organizer && (
                <span className="mt-2 inline-block rounded-full border border-success/40 px-2 py-px text-xs font-medium text-success">
                  Organizer
                </span>
              )}
            </div>
          </div>

          <p className="mt-6 text-base">{profile.bio}</p>

          <dl className="mt-6 grid gap-4 sm:grid-cols-2">
            {profile.favorite && (
              <div className="rounded-md bg-canvas-subtle p-4">
                <dt className="text-xs uppercase tracking-wide text-muted">Favorite tool</dt>
                <dd className="mt-1 font-medium">{profile.favorite}</dd>
              </div>
            )}
            {profile.building && (
              <div className="rounded-md bg-canvas-subtle p-4">
                <dt className="text-xs uppercase tracking-wide text-muted">Building next</dt>
                <dd className="mt-1 font-medium">{profile.building}</dd>
              </div>
            )}
          </dl>

          <div className="mt-6 flex flex-wrap gap-3 text-sm">
            <a
              href={`https://github.com/${profile.github}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-md border border-border px-3 py-1.5 font-medium hover:bg-border/40"
            >
              <MarkGithub /> github.com/{profile.github}
            </a>
            {links.map(([k, v]) => (
              <a
                key={k}
                href={v}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-md border border-border px-3 py-1.5 font-medium capitalize hover:bg-border/40"
              >
                <LinkIcon /> {k}
              </a>
            ))}
          </div>
        </article>

        <p className="mt-6 text-center text-sm text-muted">
          This page was generated from{" "}
          <code className="font-mono">src/profiles/{profile.github.toLowerCase()}.json</code>
          , merged in through a pull request.
        </p>
      </main>
    </div>
  );
}
