import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
const root = fileURLToPath(new URL('../', import.meta.url));
const read = path => readFileSync(join(root, path), 'utf8');
const catalog = JSON.parse(read('assets/js/app.js').match(/const PRODUCTS = (\[[\s\S]*?\]);\s*const FRUIT_OPTIONS/)[1]);
const priceCsv = read('PRECOS_V44_CONFERENCIA.csv').trim().split(/\r?\n/);
test('todos os preços do CSV V44 batem exatamente com o catálogo publicado', () => {
  assert.equal(priceCsv.length-1,20);
  assert.equal(catalog.length,41);
  for(const line of priceCsv.slice(1)) {
    const [id,,normal,industrial] = line.split(';');
    const product = catalog.find(p=>p.id===id);
    assert.ok(product,`Produto não encontrado: ${id}`);
    assert.equal(product.price,Number(normal),`${id}: preço normal`);
    assert.equal(product.packageChoices?.find(p=>p.id==='industrial')?.price,Number(industrial),`${id}: preço 5kg`);
  }
});
test('dist contém os arquivos completos para Vercel e o HTML correto', () => {
  const cfg = JSON.parse(read('vercel.json'));
  assert.equal(cfg.buildCommand,'npm run build');
  assert.equal(cfg.outputDirectory,'dist');
  for(const n of ['index.html','sw.js','manifest.webmanifest','privacidade.html','termos.html',
    'assets/js/app.js','assets/css/app.css','assets/images/hero-hs-v33-720.webp',
    'assets/images/icon-v31-192.png','assets/images/quiabo-fatiado-500g.webp']){
    assert.ok(existsSync(join(root,'dist',n)),`Faltando em dist: ${n}`);
  }
  assert.equal(read('dist/assets/js/app.js'),read('assets/js/app.js'));
  assert.equal(read('dist/index.html'),read('index.html'));
  assert.match(read('dist/index.html'),/name="hs-build" content="44\.2\.0"/);
});
