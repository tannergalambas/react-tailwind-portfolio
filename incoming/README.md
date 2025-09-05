Incoming merge workspace

- Project A: current repository root (react-tailwind-portfolio)
- Project B: place the other project under `incoming/project-b/`

What to copy into `incoming/project-b/`:
- package.json and lockfile
- src/ and public/ directories
- Build tooling: e.g., vite.config.js/next.config.js, tailwind.config.js, postcss.config.js, tsconfig/jsconfig.json
- Any `components/`, `lib/`, `hooks/`, or `styles/` folders
- Do NOT include secrets. If needed, add `.env.example` only.

Once added, I will:
- Compare dependencies and configs
- Propose a merge plan for routes, components, styles
- Port selected features, unify design tokens, and wire routing

