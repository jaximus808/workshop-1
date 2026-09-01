import type { Project } from "@/data/profile";
import { Repo, RepoForked, Star } from "./icons";

const statusStyles: Record<Project["status"], string> = {
  shipped: "border-success/40 text-success",
  "in-progress": "border-attention/40 text-attention",
  planned: "border-border text-muted",
};

const statusLabel: Record<Project["status"], string> = {
  shipped: "Public",
  "in-progress": "In progress",
  planned: "Planned",
};

export function ProjectCard({ project }: { project: Project }) {
  const isLink = project.url !== "#";
  return (
    <article className="flex h-full flex-col rounded-md border border-border bg-background p-4">
      <div className="flex items-center gap-2">
        <Repo className="text-muted" />
        {isLink ? (
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="truncate text-sm font-semibold text-accent hover:underline"
          >
            {project.name}
          </a>
        ) : (
          <span className="truncate text-sm font-semibold">{project.name}</span>
        )}
        <span
          className={`ml-auto rounded-full border px-2 py-px text-xs font-medium ${statusStyles[project.status]}`}
        >
          {statusLabel[project.status]}
        </span>
      </div>
      <p className="mt-2 flex-1 text-sm text-muted">{project.description}</p>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {project.topics.map((t) => (
          <span
            key={t}
            className="rounded-full bg-accent/10 px-2 py-px text-xs font-medium text-accent"
          >
            {t}
          </span>
        ))}
      </div>
      <div className="mt-3 flex items-center gap-4 text-xs text-muted">
        <span className="flex items-center gap-1">
          <span
            className="inline-block size-3 rounded-full"
            style={{ backgroundColor: project.languageColor }}
          />
          {project.language}
        </span>
        <span className="flex items-center gap-1">
          <Star /> {project.stars}
        </span>
        <span className="flex items-center gap-1">
          <RepoForked /> {project.forks}
        </span>
      </div>
    </article>
  );
}
