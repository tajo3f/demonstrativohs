import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const root = new URL('../', import.meta.url);
const html = fs.readFileSync(new URL('../index.html', import.meta.url), 'utf8');
const js = fs.readFileSync(new URL('../assets/js/app.js', import.meta.url), 'utf8');
const css = fs.readFileSync(new URL('../assets/css/app.css', import.meta.url), 'utf8');
const sw = fs.readFileSync(new URL('../sw.js', import.meta.url), 'utf8');
const manifest = JSON.parse(fs.readFileSync(new URL('../manifest.webmanifest', import.meta.url), 'utf8'));

const productImages = [...js.matchAll(/\bimage:\s*"\.\/assets\/images\/([^"]+)"/g)].map(m => m[1]);

test('estrutura principal e PWA continuam válidos', () => {
  for (const id of ['view-home','view-products','view-cart','product-dialog','checkout-dialog','install-dialog']) assert.match(html, new RegExp(`id="${id}"`));
  assert.equal(manifest.display, 'standalone');
  assert.match(sw, /hs-final-2026-10-22-v1/);
});

test('catálogo oficial contém 40 produtos únicos com imagens locais', () => {
  assert.equal(productImages.length, 40);
  assert.equal(new Set(productImages).size, 40);
  for (const filename of productImages) {
    assert.ok(fs.existsSync(new URL(`../assets/images/${filename}`, import.meta.url)), `imagem ausente: ${filename}`);
  }
});

test('valores corrigidos solicitados estão aplicados', () => {
  const abobora = js.slice(js.indexOf('abobora-japonesa-sem-casca-cubos-500g'), js.indexOf('abobora-japonesa-sem-casca-cubos-500g') + 850);
  assert.match(abobora, /price:\s*5\.99/);
  assert.match(abobora, /weight:\s*"500 g"/);
  const espaguete = js.slice(js.indexOf('espaguete-abobrinha-cenoura-500g'), js.indexOf('espaguete-abobrinha-cenoura-500g') + 850);
  assert.match(espaguete, /price:\s*7\.99/);
  assert.match(espaguete, /weight:\s*"500 g"/);
});

test('salada de frutas possui preço, limite de 3 frutas e opcionais', () => {
  assert.match(js, /Salada de frutas 250 g/);
  assert.match(js, /price:\s*12\.49/);
  assert.match(js, /maxFruits:\s*3/);
  for (const fruta of ['Uva preta sem semente','Uva verde sem semente','Manga','Kiwi','Morango','Mamão','Melão','Maçã','Banana prata']) assert.ok(js.includes(fruta), fruta);
  for (const opcional of ['Mel','Granola','Leite em pó','Leite condensado']) assert.ok(js.includes(opcional), opcional);
  assert.match(js, /priceDelta:\s*3\.49/g);
  assert.match(js, /Escolha no máximo \$\{max\} frutas/);
});

test('seleta possui preço base e opção de milho de 80 g', () => {
  const seleta = js.slice(js.indexOf('seleta-de-legumes-500g'), js.indexOf('seleta-de-legumes-500g') + 1800);
  assert.match(seleta, /price:\s*7\.99/);
  assert.match(seleta, /Com milho verde em conserva \(\+80 g\)/);
  assert.match(seleta, /priceDelta:\s*3\.49/);
  assert.match(seleta, /seleta-de-legumes-opcao-milho\.webp/);
});

test('WhatsApp oficial está configurado', () => {
  assert.match(js, /const HS_WHATSAPP_NUMBER = '5527999087648';/);
  assert.match(js, /https:\/\/wa\.me\/\$\{number\}/);
  for (const label of ['*NOME*','*TELEFONE*','*ENDEREÇO*','*FORMA DE PAGAMENTO*','*OBS*','*PEDIDO*']) assert.ok(js.includes(label));
});

test('finalização mantém endereço dinâmico e campos opcionais', () => {
  assert.match(html, /id="checkout-form" novalidate/);
  assert.doesNotMatch(html, /id="customer-name"[^>]*required/);
  assert.match(js, /deliveryMethod === 'Entrega'/);
  assert.match(js, /Informe o endereço para entrega antes de enviar o pedido/);
});

test('acabamento do questionário e cards existe', () => {
  for (const rule of ['.question-card','.question-option','.question-counter','.detail-gallery','.catalog-quick-add-symbol']) assert.ok(css.includes(rule), rule);
});
