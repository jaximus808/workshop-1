import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-3 px-4 py-20 text-center">
      <p className="font-mono text-sm text-muted">404</p>
      <h1 className="text-2xl font-semibold">No profile here yet</h1>
      <p className="max-w-md text-muted">
        If this is your username, your PR probably hasn&apos;t been merged yet.
        Check the preview deployment on your pull request instead.
      </p>
      <Link href="/#add" className="mt-2 text-sm text-accent hover:underline">
        How to add yourself →
      </Link>
    </main>
  );
}
