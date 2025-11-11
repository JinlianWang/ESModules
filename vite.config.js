import { defineConfig } from 'vite';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { copyFileSync, mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';

const rootDir = dirname(fileURLToPath(import.meta.url));
const libEntry = resolve(rootDir, 'lib/index.js');
const demoHtml = resolve(rootDir, 'index.html');
const demoSrcDir = resolve(rootDir, 'src');
const distDir = resolve(rootDir, 'dist');

function copyDir(src, dest) {
  mkdirSync(dest, { recursive: true });
  for (const entry of readdirSync(src, { withFileTypes: true })) {
    const srcPath = resolve(src, entry.name);
    const destPath = resolve(dest, entry.name);
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else if (entry.isFile()) {
      copyFileSync(srcPath, destPath);
    }
  }
}

function demoAssetsPlugin() {
  return {
    name: 'demo-assets-plugin',
    writeBundle() {
      const htmlForDist = readFileSync(demoHtml, 'utf8').replaceAll('/dist/my-math.es.js', './my-math.es.js');
      writeFileSync(resolve(distDir, 'index.html'), htmlForDist);
      copyDir(demoSrcDir, resolve(distDir, 'src'));
    },
  };
}

function cleanDistPlugin() {
  return {
    name: 'clean-dist-plugin',
    buildStart() {
      rmSync(distDir, { recursive: true, force: true });
    },
  };
}

export default defineConfig({
  plugins: [cleanDistPlugin(), demoAssetsPlugin()],
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
