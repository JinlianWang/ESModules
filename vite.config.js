import { defineConfig } from 'vite';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { copyFileSync, mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { transformSync } from 'esbuild';

const rootDir = dirname(fileURLToPath(import.meta.url));
const libEntry = resolve(rootDir, 'lib/index.js');
const demoHtml = resolve(rootDir, 'index.html');
const demoSrcDir = resolve(rootDir, 'src');
const distDir = resolve(rootDir, 'dist');

function copyDir(src, dest, { minifyJs = false } = {}) {
  mkdirSync(dest, { recursive: true });
  for (const entry of readdirSync(src, { withFileTypes: true })) {
    const srcPath = resolve(src, entry.name);
    const destPath = resolve(dest, entry.name);
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath, { minifyJs });
    } else if (entry.isFile()) {
      if (minifyJs && entry.name.endsWith('.js')) {
        const source = readFileSync(srcPath, 'utf8');
        const { code } = transformSync(source, { minify: true, format: 'esm' });
        writeFileSync(destPath, code, 'utf8');
      } else {
        copyFileSync(srcPath, destPath);
      }
    }
  }
}

function demoAssetsPlugin() {
  let shouldMinify = true;
  return {
    name: 'demo-assets-plugin',
    configResolved(config) {
      const minifySetting = config.build.minify;
      shouldMinify = minifySetting !== false && minifySetting !== 'false';
    },
    writeBundle() {
      const htmlForDist = readFileSync(demoHtml, 'utf8').replaceAll('/dist/lib/my-math.es.js', './lib/my-math.es.js');
      writeFileSync(resolve(distDir, 'index.html'), htmlForDist);
      copyDir(demoSrcDir, resolve(distDir, 'src'), { minifyJs: shouldMinify });
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
      fileName: () => 'lib/my-math.es.js',
    },
  },
});
