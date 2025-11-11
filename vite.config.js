import { defineConfig } from 'vite';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const rootDir = dirname(fileURLToPath(import.meta.url));
const libEntry = resolve(rootDir, 'lib/index.js');

export default defineConfig({
  resolve: {
    // Let the dev server resolve `my-math` straight to the source entry.
    alias: {
      'my-math': libEntry,
    },
  },
  build: {
    lib: {
      entry: libEntry,
      formats: ['es'],
      fileName: () => 'my-math.es.js',
    },
  },
});
