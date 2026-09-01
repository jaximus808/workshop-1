import Link from "next/link";
import type { Profile } from "@/lib/profiles";
import { Avatar } from "./Avatar";
import { LinkIcon, MarkGithub } from "./icons";

export function ProfileCard({ profile }: { profile: Profile }) {
  const site = profile.links?.website || profile.links?.linkedin;
  return (
    <article className="flex h-full flex-col rounded-lg border border-border bg-background p-6 transition-colors hover:border-accent">
      <div className="flex items-center gap-4">
        <Avatar handle={profile.github} name={profile.name} size={64} />
        <div className="min-w-0">
          <Link
            href={`/p/${profile.github.toLowerCase()}`}
            className="block truncate text-lg font-semibold hover:text-accent hover:underline"
          >
            {profile.emoji ? `${profile.emoji} ` : ""}
            {profile.name}
          </Link>
          <p className="truncate text-sm text-muted">@{profile.github}</p>
        </div>
        {profile.organizer && (
          <span className="ml-auto shrink-0 rounded-full border border-success/40 px-2 py-px text-xs font-medium text-success">
            Organizer
          </span>
        )}
      </div>
      {profile.role && <p className="mt-4 text-xs font-medium uppercase tracking-wide text-muted">{profile.role}</p>}
      <p className="mt-2 flex-1 text-base leading-relaxed">{profile.bio}</p>
      {profile.building && (
        <p className="mt-3 text-sm text-muted">
          <span className="font-medium text-foreground">Building next:</span>{" "}
          {profile.building}
        </p>
      )}
      <div className="mt-4 flex items-center gap-3 text-sm text-muted">
        {profile.favorite && (
          <span className="rounded-full bg-accent/10 px-2 py-px font-medium text-accent">
            {profile.favorite}
          </span>
        )}
        <a
          href={`https://github.com/${profile.github}`}
          target="_blank"
          rel="noopener noreferrer"
          className="ml-auto flex items-center gap-1 hover:text-accent"
        >
          <MarkGithub /> GitHub
        </a>
        {site && (
          <a
            href={site}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 hover:text-accent"
          >
            <LinkIcon /> Site
          </a>
        )}
      </div>
    </article>
  );
}
