import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const html = fs.readFileSync(new URL('../index.html', import.meta.url), 'utf8');
const js = fs.readFileSync(new URL('../assets/js/app.js', import.meta.url), 'utf8');
const css = fs.readFileSync(new URL('../assets/css/app.css', import.meta.url), 'utf8');
const sw = fs.readFileSync(new URL('../sw.js', import.meta.url), 'utf8');
const manifest = JSON.parse(fs.readFileSync(new URL('../manifest.webmanifest', import.meta.url), 'utf8'));

test('estrutura principal do app existe', () => {
  for (const id of ['view-home', 'view-products', 'view-cart', 'bottom-count', 'product-dialog', 'install-dialog']) {
    assert.match(html, new RegExp(`id="${id}"`));
  }
});

test('home inclui botão hero, categorias e área de destaques', () => {
  assert.match(html, /promo-banner-v20/);
  assert.match(html, /class="promo-banner-cta" data-route="products"/);
  for (const label of ['Todos', 'Processados', 'Frutas', 'Saladas', 'Kits']) {
    assert.match(html, new RegExp(`>${label}<`));
  }
  assert.match(html, /id="home-products"/);
});

test('produtos novos e textos revisados estão cadastrados', () => {
  for (const snippet of [
    'Mix de forno 700 g',
    'Seleta de legumes 500 g',
    'Kiwi em cubos 250 g',
    'Laranja descascada 500 g',
    'Espaguete de abobrinha e cenoura 300 g',
    'Mix de repolho verde e roxo fatiados 300 g',
    'Inhame-chinês em pedaços 500 g',
    'Kit Refogado: abobrinha em meia-lua, cenoura em rodelas e vagem em bastonetes 500 g'
  ]) {
    assert.match(js, new RegExp(snippet.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
  }
});

test('catálogo possui categoria Frutas e opção configurável para seleta', () => {
  assert.match(js, /label: 'Frutas'|label:'Frutas'/);
  assert.match(js, /seleta-de-legumes-500g/);
  assert.match(js, /Com milho verde em conserva/);
  assert.match(js, /80 g/);
});

test('salada de frutas continua personalizável', () => {
  assert.match(js, /Salada de frutas personalizada/);
  assert.match(js, /FRUIT_OPTIONS/);
  assert.match(js, /fruit-customizer/);
});

test('pedido WhatsApp segue a ordem solicitada', () => {
  for (const label of ['*NOME*', '*TELEFONE*', '*ENDEREÇO*', '*FORMA DE PAGAMENTO*', '*OBS*', '*PEDIDO*']) {
    assert.match(js, new RegExp(label.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
  }
  assert.match(js, /HS HORTIGRANJEIRO/);
});

test('css inclui acabamento profissional V23 para hero e cards', () => {
  assert.match(css, /V23 — ACABAMENTO PROFISSIONAL/);
  assert.match(css, /catalog-card::before/);
  assert.match(css, /promo-banner-cta\{/);
  assert.match(css, /bottom:24\.2%/);
  assert.match(css, /catalog-quick-add-symbol/);
  assert.match(css, /grid-template-columns:minmax\(0,1fr\) auto/);
});

test('service worker usa cache V23 e adiciona imagens novas', () => {
  assert.match(sw, /hs-v23-shell/);
  assert.match(sw, /mix-de-forno-700g\.webp/);
  assert.match(sw, /kiwi-em-cubos-250g\.webp/);
  assert.match(sw, /seleta-de-legumes-500g\.webp/);
  assert.match(sw, /kit-refogado-abobrinha-cenoura-vagem-500g\.webp/);
});



test('ação rápida do catálogo usa símbolo centralizado e classe dedicada', () => {
  assert.match(js, /catalog-quick-add/);
  assert.match(js, /catalog-quick-add-symbol/);
  assert.match(js, /catalog-stepper-button/);
});

test('PWA permanece em modo standalone', () => {
  assert.equal(manifest.display, 'standalone');
});
