import Image from "next/image";
import { profile } from "@/data/profile";
import { LinkIcon, Location, Mail, People } from "./icons";

function initials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export function Sidebar() {
  const { stats, links } = profile;
  const website = profile.website || links.linkedin || links.twitter;

  return (
    <aside className="flex flex-col gap-4">
      <div className="flex items-center gap-4 md:flex-col md:items-start">
        {profile.avatarUrl ? (
          <Image
            src={profile.avatarUrl}
            alt={`${profile.name}'s avatar`}
            width={296}
            height={296}
            preload
            className="size-24 rounded-full border border-border md:h-auto md:w-full"
          />
        ) : (
          <div
            aria-label={`${profile.name}'s avatar`}
            className="flex size-24 shrink-0 items-center justify-center rounded-full border border-border bg-gradient-to-br from-accent to-success text-3xl font-bold text-white md:aspect-square md:h-auto md:w-full md:text-7xl"
          >
            {initials(profile.name)}
          </div>
        )}
        <div>
          <h1 className="text-2xl font-semibold leading-tight">{profile.name}</h1>
          <p className="text-xl font-light text-muted">{profile.handle}</p>
        </div>
      </div>

      <p className="text-base">{profile.bio}</p>

      <a
        href={links.github}
        target="_blank"
        rel="noopener noreferrer"
        className="flex h-8 items-center justify-center rounded-md border border-border bg-canvas-subtle text-sm font-medium hover:bg-border/40"
      >
        Follow on GitHub
      </a>

      <p className="flex items-center gap-1 text-sm text-muted">
        <People />
        <span className="font-semibold text-foreground">{stats.followers}</span>{" "}
        followers ·{" "}
        <span className="font-semibold text-foreground">{stats.following}</span>{" "}
        following
      </p>

      <ul className="flex flex-col gap-1.5 text-sm">
        {profile.location && (
          <li className="flex items-center gap-2">
            <Location className="text-muted" /> {profile.location}
          </li>
        )}
        {profile.email && (
          <li className="flex items-center gap-2">
            <Mail className="text-muted" />
            <a href={`mailto:${profile.email}`} className="hover:text-accent hover:underline">
              {profile.email}
            </a>
          </li>
        )}
        {website && (
          <li className="flex items-center gap-2">
            <LinkIcon className="text-muted" />
            <a
              href={website}
              target="_blank"
              rel="noopener noreferrer"
              className="truncate hover:text-accent hover:underline"
            >
              {website.replace(/^https?:\/\//, "")}
            </a>
          </li>
        )}
      </ul>

      <section className="border-t border-border pt-4">
        <h2 className="mb-2 text-base font-semibold">Skills</h2>
        {Object.entries(profile.skills).map(([group, items]) => (
          <div key={group} className="mb-2">
            <p className="mb-1 text-xs font-medium uppercase tracking-wide text-muted">
              {group}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {items.map((s) => (
                <span
                  key={s}
                  className="rounded-md border border-border bg-canvas-subtle px-2 py-0.5 text-xs"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        ))}
      </section>
    </aside>
  );
}
