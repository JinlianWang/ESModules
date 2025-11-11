# Repository Guidelines

## Project Structure & Module Organization
- `lib/` holds the publishable ES modules. `lib/math.js` defines primitives, `lib/advancedMath.js` composes helpers, and `lib/index.js` re-exports the public API consumed during builds.
- `src/` now represents a micro-frontend host: `src/index.js` boots the header and catalog shells immediately, while the footer shell is lazy loaded via the catalog. Each shell mounts into its own root, calls `sumThree` with different arguments, and shows the shared `getLoadCount()` output. `src/happy-face-widget.js` defines a dependency-free Web Component that renders ASCII art when the catalog shell lazy-loads it.
- `index.html` wires the import map and declares the shell root elements; keep it minimal so the copy step in `vite.config.js` remains simple.
- `dist/` is generated; never edit by hand. After `npm run build`, expect `dist/my-math.es.js`, the demo HTML, and a mirrored `src/` directory.

## Build, Test, and Development Commands
- `npm install` installs the single dependency (Vite 5).
- `npm run dev` starts the Vite dev server with the alias that maps `my-math` directly to `lib/index.js`; use it for iterative development.
- `npm run build` runs Vite in library mode, cleans `dist/` via a pre-build plugin, emits a minified bundle by default, and triggers the post-build copy defined in `vite.config.js`. During that copy step, every `.js` file in `src/` is minified with esbuild so header/catalog/footer demos match production behavior even if the library bundle is built with `--minify false`.
- `npm run preview` serves `dist/` to validate the production artifacts; always run `npm run build` first.

## Coding Style & Naming Conventions
- Use ES modules with named exports; keep the public surface curated through `lib/index.js`.
- Follow 4-space indentation and single quotes as shown in the existing files; prefer small pure functions with explicit parameter lists.
- Name new helpers with descriptive verbs (`sumArray`, `multiplyMany`) and mirror file names to the main export (`lib/sumArray.js` exporting `sumArray`).

## Testing Guidelines
- There is no formal test harness yet; rely on the browser demo as a smoke test by running `npm run dev` (development) or `npm run preview` (production bundle).
- Verify that each shell renders independently: header should show `sumThree(2,3,4)`, catalog `sumThree(5,10,15)`, and (once loaded) footer `sumThree(7,8,9)`. Adjust inputs if you add more shells but keep a unique message for each.
- Confirm the shared load indicator stays at `1`. The `lib/index.js` entry bumps `__MY_MATH_LOAD_COUNT__` once and `getLoadCount()` should report the same value in every shell.
- Click the catalog shell's "Load Happy Face Widget" button to ensure the dynamic import resolves, registers the custom element, and displays the ASCII art. If you add more widgets, load them lazily to keep the baseline bundle lean.
- Use the catalog's "Load Footer Section" button to confirm the footer micro frontend is fetched via dynamic import and mounted into `#footer-root` only when requested.
- When adding new behavior, update or add a shell module that demonstrates it and, optionally, log assertions to the console. If you add automated tests, place them under `src/` or a new `tests/` folder and document the command.

## Commit & Pull Request Guidelines
- Follow the existing concise, imperative commit style (`Fix Vite config and ignore dist outputs`). Keep subject lines under 72 characters and explain rationale in the body when necessary.
- Each PR should describe the change, steps to reproduce/verify, and reference any related issues. Include before/after screenshots if the demo output changes.
- Make sure the branch builds (`npm run build`) and the preview works before requesting review.
