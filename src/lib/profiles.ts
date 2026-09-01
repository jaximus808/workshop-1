import { readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import { event } from "@/data/event";
import { validateProfile } from "./validate-profile.mjs";

export type Profile = {
  name: string;
  github: string;
  role?: string;
  bio: string;
  favorite?: string;
  building?: string;
  emoji?: string;
  links?: { website?: string; linkedin?: string; twitter?: string };
  organizer: boolean;
};

export const PROFILES_DIR = path.join(process.cwd(), "src", "profiles");


export function getProfiles(): Profile[] {
  const files = readdirSync(PROFILES_DIR).filter(
    (f) => f.endsWith(".json") && !f.startsWith("_"),
  );

  const profiles = files.map((file) => {
    const raw = readFileSync(path.join(PROFILES_DIR, file), "utf8");
    const data: unknown = JSON.parse(raw);
    const errors = validateProfile(data, file);
    if (errors.length) {
      throw new Error(
        `Invalid profile src/profiles/${file}:\n  - ${errors.join("\n  - ")}`,
      );
    }
    const p = data as Omit<Profile, "organizer">;
    return {
      ...p,
      organizer: event.organizers.some(
        (o) => o.toLowerCase() === p.github.toLowerCase(),
      ),
    };
  });

  return profiles.sort((a, b) => {
    if (a.organizer !== b.organizer) return a.organizer ? -1 : 1;
    return a.name.localeCompare(b.name);
  });
}

export function getProfile(handle: string): Profile | undefined {
  return getProfiles().find(
    (p) => p.github.toLowerCase() === handle.toLowerCase(),
  );
}
