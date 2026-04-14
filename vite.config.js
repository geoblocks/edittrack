import {resolve, dirname} from 'path';
import {fileURLToPath} from 'url';
import {defineConfig} from 'vite';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  root: resolve(__dirname, 'demos'),
  base: './',
  build: {
    outDir: resolve(__dirname, 'dist'),
    emptyOutDir: false,
    rollupOptions: {
      input: {
        simple: resolve(__dirname, 'demos/simple/simple.html'),
        schm: resolve(__dirname, 'demos/schm/schm.html'),
      },
    },
  },
});
