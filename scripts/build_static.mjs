/**
 * HS Hortigranjeiro — build estático reprodutível para Vercel.
 * A única fonte dos preços é assets/js/app.js, na raiz do projeto.
 * Evita publicar uma pasta dist incompleta ou desatualizada.
 */
import { cp, mkdir, readFile, rm } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';
const root = dirname(dirname(fileURLToPath(import.meta.url)));
const dist = join(root, 'dist');
const files = [
  'index.html', 'sw.js', 'manifest.webmanifest', '404.html',
  'privacidade.html', 'politica-de-privacidade.html', 'termos.html', 'robots.txt'
];
await rm(dist, { recursive: true, force: true });
await mkdir(dist, { recursive: true });
for (const file of files) await cp(join(root, file), join(dist, file));
await cp(join(root, 'assets'), join(dist, 'assets'), { recursive: true });
// Assegura que a versão do catálogo publicada é a que está na raiz.
const source = await readFile(join(root, 'assets/js/app.js'), 'utf8');
const published = await readFile(join(dist, 'assets/js/app.js'), 'utf8');
if (source !== published) throw new Error('Falha ao sincronizar preços para dist');
const html = await readFile(join(dist, 'index.html'), 'utf8');
if (!html.includes('name="hs-build" content="44.2.0"')) {
  throw new Error('HTML com versão inesperada; publicação interrompida');
}
console.log('HS V44.2: diretório dist gerado com HTML, JS, CSS, manifest, páginas legais e imagens.');
console.log('Os preços da V44 foram preservados. Edite somente assets/js/app.js na raiz.');
