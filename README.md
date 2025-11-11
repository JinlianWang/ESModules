# My Math Demo

A minimal ES module library and browser demo built with Vite. The repo shows how to author a small math utility library, bundle it with Vite's library mode, and consume the result directly in the browser via import maps.

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
| `npm run dev` | Starts Vite's dev server for rapid iteration. Imports resolve automatically without building the library first. |
| `npm run build` | Produces the distributable ES module (`dist/my-math.js`) using the library entry in `lib/index.js`. |
| `npm run preview` | Serves the build output to verify the production bundle. |

## Project layout
```
index.html          # Demo page wiring the app + import map
src/index.js        # Browser entry that consumes the built library
lib/math.js         # Primitive math helpers (add, multiply)
lib/advancedMath.js # Higher-level helpers (e.g., sumThree)
lib/index.js        # Library public API (re-exports helpers)
vite.config.js      # Vite library-mode configuration
```

## How it works
1. `lib/index.js` is the build entry and re-exports everything that should ship in the library bundle.
2. `npm run build` runs Vite in library mode, emitting `dist/my-math.js` (named `my-math.es.js` when referenced via import map).
3. `index.html` defines an import map so the browser can resolve `import { sumThree } from 'my-math'` inside `src/index.js` without bundling.
4. The demo in `src/index.js` imports `sumThree`, computes `1 + 2 + 3`, logs it, and writes the result to the page, proving the library works end-to-end.

## Extending the library
- Add new helpers under `lib/`.
- Re-export them from `lib/index.js` to publish them.
- Update `src/index.js` (or create additional demos/tests) to exercise the new API.
- Re-run `npm run build` to produce an updated bundle.

## Troubleshooting
- If the browser cannot resolve `my-math`, ensure `npm run build` has been executed so `/dist/my-math.es.js` exists.
- For cache issues during development, prefer `npm run dev` to leverage Vite's module graph instead of loading from `dist/`.
