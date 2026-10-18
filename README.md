# Mithil Rajapakse: portfolio

Personal portfolio. Next.js (static export), TypeScript, Tailwind, Three.js. Live at https://mithilyr.github.io

## Edit the content

All text, projects, skills and links live in `src/content/site.ts`.

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # static site in out/
```

## Deploy

Every push to `main` builds and publishes to GitHub Pages (`.github/workflows/deploy.yml`). It also rebuilds every Monday so the GitHub numbers stay fresh.

The globe uses public-domain Natural Earth land data via `world-atlas`, and the logos come from `simple-icons`.
