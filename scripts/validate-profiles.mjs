#!/usr/bin/env node
// Checks every file in src/profiles/. Runs in CI on every PR and via `npm run validate:profiles`.
import { readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import { validateProfile } from "../src/lib/validate-profile.mjs";

const dir = path.join(process.cwd(), "src", "profiles");
const files = readdirSync(dir).filter((f) => !f.startsWith("_") && f !== "README.md");

let failed = 0;
const seen = new Map();

for (const file of files) {
  const problems = [];
  if (!file.endsWith(".json")) {
    problems.push("only .json files belong in src/profiles/");
  } else if (file !== file.toLowerCase()) {
    problems.push("file name must be lowercase");
  } else {
    let data;
    try {
      data = JSON.parse(readFileSync(path.join(dir, file), "utf8"));
    } catch (e) {
      problems.push(`not valid JSON: ${e.message}`);
    }
    if (data !== undefined) {
      problems.push(...validateProfile(data, file));
      const handle = String(data.github ?? "").toLowerCase();
      if (seen.has(handle)) {
        problems.push(`duplicate of ${seen.get(handle)}`);
      } else if (handle) {
        seen.set(handle, file);
      }
    }
  }

  if (problems.length) {
    failed++;
    console.error(`✗ src/profiles/${file}`);
    for (const p of problems) console.error(`    ${p}`);
  } else {
    console.log(`✓ src/profiles/${file}`);
  }
}

console.log(`\n${files.length - failed}/${files.length} profiles valid`);
if (failed) process.exit(1);
