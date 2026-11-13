import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
const read = path => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8');

test('JS, HTML, SW e configuração Vercel iguais na raiz e em dist', () => {
  for (const path of ['index.html', 'sw.js', 'assets/js/app.js', 'assets/css/app.css']) {
    assert.equal(read(path), read(`dist/${path}`), `${path} deve ser idêntico`);
  }
});
test('release V44.2 serve arquivos novos e não bloqueia instalação por imagem ausente', () => {
  const html = read('index.html');
  const sw = read('sw.js');
  const app = read('assets/js/app.js');
  assert.match(html, /name="hs-build" content="44\.2\.0"/);
  assert.match(html, /app\.js\?v=44\.2\.0/);
  assert.match(html, /app\.css\?v=44\.2\.0/);
  assert.match(sw, /hs-catalog-v44-2-2026-11-13/);
  assert.match(sw, /Promise\.allSettled/);
  assert.match(sw, /request\.mode === 'navigate'/);
  assert.match(app, /updateViaCache: 'none'/);
  assert.match(app, /registration\.update\(\)/);
  assert.doesNotMatch(sw, /cache\.addAll\(/);
});
test('Vercel usa versão explícita de Node.js e não o intervalo aberto', () => {
  const pkg = JSON.parse(read('package.json'));
  const vercel = JSON.parse(read('vercel.json'));
  assert.equal(pkg.engines.node, '24.x');
  assert.ok(vercel.headers.some(h => h.source === '/sw.js'));
  assert.ok(vercel.headers.some(h => h.source === '/assets/js/app.js'));
});
