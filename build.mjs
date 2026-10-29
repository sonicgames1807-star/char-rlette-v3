import { build } from 'esbuild';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
await mkdir('dist', { recursive: true });
await build({
  entryPoints: ['src/main.jsx'],
  bundle: true,
  minify: true,
  sourcemap: true,
  platform: 'browser',
  target: ['es2020'],
  format: 'iife',
  outfile: 'dist/app.js',
  loader: { '.css': 'css' },
});
const rootHtml = await readFile('index.html', 'utf8');
const distHtml = rootHtml
  .replace('./dist/app.css', './app.css')
  .replace('./dist/app.js', './app.js');
await writeFile('dist/index.html', distHtml);
console.log('Built dist assets and a server-ready dist/index.html');
