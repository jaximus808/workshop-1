const stages = [
  "Branch",
  "Commit",
  "Push",
  "Open PR",
  "CI runs",
  "Review",
  "Approve",
  "Merge",
];

export function Lifecycle() {
  return (
    <ol className="flex flex-wrap items-center gap-2 text-sm">
      {stages.map((s, i) => (
        <li key={s} className="flex items-center gap-2">
          <span
            className={`rounded-md border px-3 py-1 font-medium ${
              i === stages.length - 1
                ? "border-success/50 bg-success/10 text-success"
                : "border-border bg-canvas-subtle"
            }`}
          >
            {s}
          </span>
          {i < stages.length - 1 && (
            <span className="text-muted" aria-hidden>
              →
            </span>
          )}
        </li>
      ))}
    </ol>
  );
}
