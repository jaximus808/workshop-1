// Single source of truth for what a profile file must look like.
// Used by the site at build time and by `npm run validate:profiles` in CI.

export const HANDLE_RE = /^[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}$/i;

const LIMITS = {
  name: 60,
  role: 60,
  bio: 200,
  favorite: 40,
  building: 140,
  emoji: 8,
};

const KNOWN_KEYS = new Set([
  "name",
  "github",
  "role",
  "bio",
  "favorite",
  "building",
  "emoji",
  "links",
]);

const LINK_KEYS = new Set(["website", "linkedin", "twitter"]);

/**
 * @param {unknown} data parsed JSON
 * @param {string} fileName e.g. "octocat.json"
 * @returns {string[]} list of problems; empty means valid
 */
export function validateProfile(data, fileName) {
  const errors = [];
  if (typeof data !== "object" || data === null || Array.isArray(data)) {
    return ["must be a JSON object"];
  }
  const p = /** @type {Record<string, unknown>} */ (data);

  for (const key of Object.keys(p)) {
    if (!KNOWN_KEYS.has(key)) errors.push(`unknown field "${key}"`);
  }

  for (const key of ["name", "github", "bio"]) {
    if (typeof p[key] !== "string" || p[key].trim() === "") {
      errors.push(`"${key}" is required`);
    }
  }

  if (typeof p.github === "string") {
    if (!HANDLE_RE.test(p.github)) {
      errors.push(`"github" must be a valid GitHub username, got "${p.github}"`);
    }
    const expected = `${p.github.toLowerCase()}.json`;
    if (fileName !== expected) {
      errors.push(`file must be named ${expected} to match "github"`);
    }
  }

  for (const [key, max] of Object.entries(LIMITS)) {
    const v = p[key];
    if (v === undefined) continue;
    if (typeof v !== "string") errors.push(`"${key}" must be a string`);
    else if (v.length > max) errors.push(`"${key}" is over ${max} characters`);
  }

  if (p.links !== undefined) {
    if (typeof p.links !== "object" || p.links === null || Array.isArray(p.links)) {
      errors.push(`"links" must be an object`);
    } else {
      for (const [k, v] of Object.entries(p.links)) {
        if (!LINK_KEYS.has(k)) errors.push(`unknown link "${k}"`);
        else if (v !== "" && (typeof v !== "string" || !/^https:\/\//.test(v))) {
          errors.push(`links.${k} must start with https://`);
        }
      }
    }
  }

  return errors;
}
