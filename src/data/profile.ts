// Edit this file to update the profile. Everything on the page is driven from here.

export type Project = {
  name: string;
  description: string;
  language: string;
  languageColor: string;
  stars: number;
  forks: number;
  url: string;
  status: "shipped" | "in-progress" | "planned";
  topics: string[];
};

export type ChecklistItem = {
  label: string;
  detail: string;
  done: boolean;
};

export const profile = {
  name: "Jaxon Poentis",
  handle: "jaxonpoentis", // GitHub username
  // Set to a URL like `https://github.com/<handle>.png` to show a real avatar.
  // Leave empty to show initials.
  avatarUrl: "",
  tagline: "Building in public. Shipping projects, one repo at a time.",
  bio: "Software developer focused on web apps, tooling, and clean, well-documented code. This profile is where future projects will live.",
  location: "Honolulu, HI",
  email: "jaxonp808@gmail.com",
  website: "",
  links: {
    github: "https://github.com/jaxonpoentis",
    linkedin: "",
    twitter: "",
  },
  stats: {
    followers: 0,
    following: 0,
    repos: 1,
  },
  skills: {
    languages: ["TypeScript", "JavaScript", "Python", "SQL"],
    frameworks: ["React", "Next.js", "Node.js", "Tailwind CSS"],
    tools: ["Git", "Vercel", "PostgreSQL", "Docker"],
  },
  currentFocus: [
    "Setting up a professional GitHub profile to showcase future projects",
    "Learning the Next.js App Router and deploying to Vercel",
    "Writing clear READMEs and documentation for every repo",
  ],
};

export const projects: Project[] = [
  {
    name: "workshop1",
    description:
      "This site. A GitHub-style profile page built with Next.js and Tailwind, deployed on Vercel.",
    language: "TypeScript",
    languageColor: "#3178c6",
    stars: 0,
    forks: 0,
    url: "https://github.com/jaxonpoentis/workshop1",
    status: "shipped",
    topics: ["nextjs", "tailwind", "vercel"],
  },
  {
    name: "portfolio-api",
    description:
      "Small REST API that serves project metadata so the profile can stay in sync with real repos.",
    language: "TypeScript",
    languageColor: "#3178c6",
    stars: 0,
    forks: 0,
    url: "#",
    status: "in-progress",
    topics: ["api", "node"],
  },
  {
    name: "cli-toolkit",
    description:
      "Collection of command-line utilities for everyday dev tasks: scaffolding, linting, and release notes.",
    language: "Python",
    languageColor: "#3572A5",
    stars: 0,
    forks: 0,
    url: "#",
    status: "planned",
    topics: ["cli", "python"],
  },
  {
    name: "data-dashboard",
    description:
      "Interactive dashboard for exploring a public dataset with charts, filters, and shareable views.",
    language: "TypeScript",
    languageColor: "#3178c6",
    stars: 0,
    forks: 0,
    url: "#",
    status: "planned",
    topics: ["react", "dataviz"],
  },
];

export const checklist: ChecklistItem[] = [
  {
    label: "Professional profile photo and display name",
    detail: "Clear headshot or avatar, full name, and a short headline.",
    done: true,
  },
  {
    label: "Write a bio that says what you build",
    detail: "One or two lines: who you are, what you work on, what you're learning.",
    done: true,
  },
  {
    label: "Add location, email, and links",
    detail: "Make it easy for recruiters and collaborators to reach you.",
    done: true,
  },
  {
    label: "Create a profile README",
    detail: "A repo named after your username with a README.md that appears on your profile.",
    done: false,
  },
  {
    label: "Pin your best 6 repositories",
    detail: "Each pinned repo should have a description, topics, and a README with screenshots.",
    done: false,
  },
  {
    label: "Write a README template for future projects",
    detail: "Overview, screenshots, setup steps, tech stack, and what you learned.",
    done: false,
  },
  {
    label: "Commit consistently",
    detail: "Small, frequent commits with clear messages keep the contribution graph green.",
    done: false,
  },
];
