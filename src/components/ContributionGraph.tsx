const WEEKS = 52;
const DAYS = 7;

// Deterministic pseudo-random so the server and client render identical output.
function seeded(i: number) {
  const x = Math.sin(i * 9301 + 49297) * 233280;
  return x - Math.floor(x);
}

function level(week: number, day: number) {
  // Ramp up activity toward "now" so the graph tells the building-in-public story.
  const recency = week / WEEKS;
  const r = seeded(week * DAYS + day);
  const weekend = day === 0 || day === 6;
  const chance = (weekend ? 0.25 : 0.55) * (0.3 + recency);
  if (r > chance + 0.35) return 0;
  if (r > chance + 0.2) return 1;
  if (r > chance + 0.08) return 2;
  if (r > chance) return 3;
  return 4;
}

const colors = [
  "bg-graph-0",
  "bg-graph-1",
  "bg-graph-2",
  "bg-graph-3",
  "bg-graph-4",
];

export function ContributionGraph() {
  const weeks = Array.from({ length: WEEKS }, (_, w) =>
    Array.from({ length: DAYS }, (_, d) => level(w, d)),
  );
  const total = weeks.flat().filter((l) => l > 0).length;

  return (
    <div className="rounded-md border border-border p-4">
      <p className="mb-3 text-sm font-medium">
        {total} contributions in the last year
      </p>
      <div className="overflow-x-auto">
        <div className="flex gap-[3px]" aria-hidden>
          {weeks.map((week, w) => (
            <div key={w} className="flex flex-col gap-[3px]">
              {week.map((l, d) => (
                <span
                  key={d}
                  className={`block size-[10px] rounded-[2px] ${colors[l]}`}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="mt-2 flex items-center justify-end gap-1 text-xs text-muted">
        <span>Less</span>
        {colors.map((c) => (
          <span key={c} className={`block size-[10px] rounded-[2px] ${c}`} />
        ))}
        <span>More</span>
      </div>
    </div>
  );
}
