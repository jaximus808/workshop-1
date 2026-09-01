"use client";

import Image from "next/image";
import { useState } from "react";
import { avatarUrl } from "@/lib/avatar";

function initials(name: string) {
  return name
    .split(/\s+/)
    .map((n) => n[0] ?? "")
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export function Avatar({
  handle,
  name,
  size,
  className = "",
}: {
  handle: string;
  name: string;
  size: number;
  className?: string;
}) {
  const [failed, setFailed] = useState(false);
  const shared = `rounded-full border border-border ${className}`;

  if (failed) {
    return (
      <div
        aria-hidden
        style={{ width: size, height: size, fontSize: size / 2.5 }}
        className={`flex shrink-0 items-center justify-center bg-gradient-to-br from-accent to-success font-bold text-white ${shared}`}
      >
        {initials(name)}
      </div>
    );
  }

  return (
    <Image
      src={avatarUrl(handle)}
      alt=""
      width={size}
      height={size}
      onError={() => setFailed(true)}
      className={`shrink-0 bg-canvas-subtle ${shared}`}
    />
  );
}
