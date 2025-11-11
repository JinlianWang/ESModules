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
| `npm run build` | Cleans `dist/`, produces the distributable (minified) ES module (`dist/my-math.es.js`), and copies the demo HTML + `src/` folder into `dist/` so it can be previewed statically. Override minification per run with `npm run build -- --minify false`. |
| `npm run preview` | Serves the contents of `dist/` to verify the production bundle. Run `npm run build` first. |

## Project layout
```
index.html            # Demo page wiring the app + import map + shell roots
src/index.js          # Micro-frontend host that mounts all section shells
src/header.js         # Header shell importing sumThree(2,3,4)
src/catalog.js        # Catalog shell importing sumThree(5,10,15) + lazy widget loader
src/footer.js         # Footer shell importing sumThree(7,8,9)
src/happy-face-widget.js # Dependency-free Web Component drawing ASCII art
lib/math.js           # Primitive math helpers (add, multiply)
lib/advancedMath.js   # Higher-level helpers (e.g., sumThree)
lib/index.js          # Library public API + load-count instrumentation
vite.config.js        # Vite library-mode configuration
```

## How it works
1. `lib/index.js` is the build entry and re-exports everything that should ship in the library bundle.
2. `npm run build` runs Vite in library mode. A pre-build plugin wipes `dist/` to avoid stale artifacts, then Vite emits a minified `dist/my-math.es.js` and copies `index.html` + `src/` into `dist/` via a post-build plugin. Pass `--minify false` if you need readable identifiers for debugging.
3. `index.html` defines an import map so the browser can resolve `import { sumThree } from 'my-math'` inside any shell without bundling; the dev server uses the alias instead of the built file.
4. `src/index.js` acts as the host that mounts `src/header.js` and `src/catalog.js`, leaving the footer root empty until it is explicitly requested. Each shell calls `sumThree` with unique inputs and writes the value into its own DOM root, showing how multiple independently-owned sections can depend on the same shared bundle.
5. The library increments a global `__MY_MATH_LOAD_COUNT__` the first time it is executed and exposes `getLoadCount()`, letting every shell surface the shared load count (it should stay at `1` no matter how many sections import it).
6. The catalog shell includes a "Load Happy Face Widget" button. Clicking it lazy-loads `src/happy-face-widget.js` via dynamic `import()`, registers a Web Component that renders ASCII art, and injects it into the catalog slot without pulling any additional dependencies.
7. The same shell also provides a "Load Footer Section" button. The handler dynamically imports `src/footer.js` and calls `mountFooter()` so the footer micro frontend only ships when requested, demonstrating cross-shell lazy loading.

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

## Building without minification
- By default `npm run build` emits a minified `dist/my-math.es.js` for production parity.
- For debugging, run `npm run build -- --minify false` to keep identifiers readable without touching `vite.config.js`.
- Alternatively, set `build.minify = false` locally if you want multiple consecutive non-minified builds; just reset it before committing.

## Troubleshooting
- If the browser cannot resolve `my-math`, ensure `npm run dev` is running (for dev) or that `npm run build` was executed (for preview/prod) so `dist/my-math.es.js` and the copied demo assets exist.
- `dist/` is git-ignored; if you need a fresh preview, re-run `npm run build`.
- The build step automatically removes `dist/` before emitting new files, so you rarely need to clean manually.
- For cache issues during development, prefer `npm run dev` to leverage Vite's module graph instead of loading from `dist/`.
