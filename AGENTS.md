# Repository Guidelines

## Project Structure & Module Organization
- `lib/` holds the publishable ES modules. `lib/math.js` defines primitives, `lib/advancedMath.js` composes helpers, and `lib/index.js` re-exports the public API consumed during builds.
- `src/` contains the browser demo entry (`src/index.js`) that exercises the library via the import map in `index.html`. Update this demo whenever you add new exports to keep end-to-end coverage.
- `index.html` wires the import map and attaches the script; keep it minimal so the copy step in `vite.config.js` remains simple.
- `dist/` is generated; never edit by hand. After `npm run build`, expect `dist/my-math.es.js`, the demo HTML, and a mirrored `src/` directory.

## Build, Test, and Development Commands
- `npm install` installs the single dependency (Vite 5).
- `npm run dev` starts the Vite dev server with the alias that maps `my-math` directly to `lib/index.js`; use it for iterative development.
- `npm run build` runs Vite in library mode and triggers the post-build copy defined in `vite.config.js` so the demo can import the built bundle.
- `npm run preview` serves `dist/` to validate the production artifacts; always run `npm run build` first.

## Coding Style & Naming Conventions
- Use ES modules with named exports; keep the public surface curated through `lib/index.js`.
- Follow 4-space indentation and single quotes as shown in the existing files; prefer small pure functions with explicit parameter lists.
- Name new helpers with descriptive verbs (`sumArray`, `multiplyMany`) and mirror file names to the main export (`lib/sumArray.js` exporting `sumArray`).

## Testing Guidelines
- There is no formal test harness yet; rely on the browser demo as a smoke test by running `npm run dev` (development) or `npm run preview` (production bundle).
- When adding new behavior, update `src/index.js` with a minimal showcase and log assertions to the console. If you add automated tests, place them under `src/` or a new `tests/` folder and document the command.

## Commit & Pull Request Guidelines
- Follow the existing concise, imperative commit style (`Fix Vite config and ignore dist outputs`). Keep subject lines under 72 characters and explain rationale in the body when necessary.
- Each PR should describe the change, steps to reproduce/verify, and reference any related issues. Include before/after screenshots if the demo output changes.
- Make sure the branch builds (`npm run build`) and the preview works before requesting review.
