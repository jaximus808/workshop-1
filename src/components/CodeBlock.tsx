export function CodeBlock({ children }: { children: string }) {
  return (
    <pre className="overflow-x-auto rounded-md border border-border bg-canvas-subtle p-4 font-mono text-[13px] leading-6">
      <code>{children}</code>
    </pre>
  );
}
