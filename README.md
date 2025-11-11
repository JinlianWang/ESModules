# My Math Demo

A minimal ES module library and browser demo built with Vite. The repo shows how to author a small math utility library, bundle it with Vite's library mode, and consume the result directly in the browser via import maps. The latest example bootstraps three micro-frontend shells (header, catalog, footer) that each import the shared bundle and render their own calculations. For contribution policies, see [Repository Guidelines](AGENTS.md).

## Prerequisites
- Node.js 18+ (works with any version supported by Vite 5)
- npm (ships with Node.js)

## Install
```bash
npm install
```

## Available scripts
| Command | Description |
| --- | --- |
| `npm run dev` | Starts Vite's dev server for rapid iteration. The alias in `vite.config.js` resolves `my-math` directly to `lib/index.js`, so no build step is required. |
| `npm run build` | Produces the distributable ES module (`dist/my-math.es.js`) and copies the demo HTML + `src/` folder into `dist/` so it can be previewed statically. |
| `npm run preview` | Serves the contents of `dist/` to verify the production bundle. Run `npm run build` first. |

## Project layout
```
index.html          # Demo page wiring the app + import map + shell roots
src/index.js        # Micro-frontend host that mounts all section shells
src/header.js       # Header shell importing sumThree(2,3,4)
src/catalog.js      # Catalog shell importing sumThree(5,10,15)
src/footer.js       # Footer shell importing sumThree(7,8,9)
lib/math.js         # Primitive math helpers (add, multiply)
lib/advancedMath.js # Higher-level helpers (e.g., sumThree)
lib/index.js        # Library public API (re-exports helpers)
vite.config.js      # Vite library-mode configuration
```

## How it works
1. `lib/index.js` is the build entry and re-exports everything that should ship in the library bundle.
2. `npm run build` runs Vite in library mode, emitting `dist/my-math.es.js` and copying `index.html` + `src/` into `dist/` via a small post-build plugin.
3. `index.html` defines an import map so the browser can resolve `import { sumThree } from 'my-math'` inside any shell without bundling; the dev server uses the alias instead of the built file.
4. `src/index.js` acts as the host that mounts `src/header.js`, `src/catalog.js`, and `src/footer.js`. Each shell calls `sumThree` with unique inputs and writes the value into its own DOM root, showing how multiple independently-owned sections can depend on the same shared bundle.

## Distribution output
After `npm run build`, the `dist/` folder contains:

- `my-math.es.js` – the ES-module library bundle produced by Vite's library mode.
- `index.html` – the demo page with its import map rewritten to reference `./my-math.es.js`.
- `src/` – the browser entry code copied as-is so `npm run preview` (or any static host) can serve the demo without a separate bundling step.

## Extending the library
- Add new helpers under `lib/`.
- Re-export them from `lib/index.js` to publish them.
- Update `src/index.js` (or create additional demos/tests) to exercise the new API.
- Re-run `npm run build` to produce an updated bundle.

## Troubleshooting
- If the browser cannot resolve `my-math`, ensure `npm run dev` is running (for dev) or that `npm run build` was executed (for preview/prod) so `dist/my-math.es.js` and the copied demo assets exist.
- `dist/` is git-ignored; if you need a fresh preview, re-run `npm run build`.
- For cache issues during development, prefer `npm run dev` to leverage Vite's module graph instead of loading from `dist/`.
