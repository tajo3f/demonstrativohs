import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const html = fs.readFileSync(new URL('../index.html', import.meta.url), 'utf8');
const js = fs.readFileSync(new URL('../assets/js/app.js', import.meta.url), 'utf8');
const css = fs.readFileSync(new URL('../assets/css/app.css', import.meta.url), 'utf8');
const sw = fs.readFileSync(new URL('../sw.js', import.meta.url), 'utf8');
const manifest = JSON.parse(fs.readFileSync(new URL('../manifest.webmanifest', import.meta.url), 'utf8'));
const productImages = [...js.matchAll(/"image":\s*"\.\/assets\/images\/([^"]+)"/g)].map(m => m[1]);

const sliceProduct = id => {
  const i = js.indexOf(`"id": "${id}"`);
  assert.ok(i >= 0, `produto não encontrado: ${id}`);
  const next = js.indexOf('\n    {\n        "id":', i + 10);
  return js.slice(i, next > i ? next : i + 3500);
};

test('estrutura, PWA e nova identidade visual estão válidas', () => {
  for (const id of ['view-home','view-products','view-cart','product-dialog','checkout-dialog','install-dialog']) assert.match(html, new RegExp(`id="${id}"`));
  assert.equal(manifest.display, 'standalone');
  assert.match(sw, /hs-final-2026-10-26-v27/);
  for (const file of ['hs-logo-oficial.png','hs-app-icon.png','hs-icon-circular.png','icon-32.png','icon-64.png','icon-180.png','icon-192.png','icon-512.png','favicon.ico']) {
    assert.ok(fs.existsSync(new URL(`../assets/images/${file}`, import.meta.url)), file);
  }
  assert.ok(html.includes('Sistema em fase de implantação'));
});

test('catálogo mantém 40 produtos únicos com imagens locais', () => {
  assert.equal(productImages.length, 40);
  assert.equal(new Set(productImages).size, 40);
  for (const filename of productImages) assert.ok(fs.existsSync(new URL(`../assets/images/${filename}`, import.meta.url)), `imagem ausente: ${filename}`);
});

test('preços destacados da planilha foram atualizados nos produtos correspondentes', () => {
  const expected = {
    'quiabo-fatiado-500g': '9.99',
    'kit-sopa-500g': '8.1',
    'batata-inglesa-canoa-500g': '6.9',
    'beterraba-cubos-pequenos-500g': '5.99',
    'vagem-verde-bastonetes-500g': '12.99',
    'kit-buque-couve-brocolis-500g': '9.99',
    'kit-yakisoba-500g': '12.99',
    'inhame-cara-500g': '8.99',
    'casadinho-repolhos-300g': '5.75',
    'seleta-de-legumes-500g': '8.9',
    'mix-de-forno-700g': '15.99',
    'espaguete-abobrinha-cenoura-500g': '7.99'
  };
  for (const [id, price] of Object.entries(expected)) assert.match(sliceProduct(id), new RegExp(`"price": ${price.replace('.', '\\.')}`));
});

test('embalagens industriais aparecem apenas nos produtos configurados pela planilha', () => {
  assert.ok((js.match(/"industrial": true/g) || []).length >= 20);
  assert.match(sliceProduct('mix-de-forno-700g'), /"weight": "5 kg"/);
  assert.match(sliceProduct('mix-de-forno-700g'), /"price": 109\.2/);
  assert.match(sliceProduct('casadinho-repolhos-300g'), /"weight": "3 kg"/);
  assert.match(sliceProduct('mix-folhas-1-300g'), /"weight": "3 kg"/);
  assert.doesNotMatch(sliceProduct('salada-de-frutas-250g'), /packageChoices/);
  assert.ok(js.includes('PJ/CNPJ • desconto de 15% já aplicado'));
});

test('salada de frutas continua personalizável com até 3 frutas e opcionais', () => {
  assert.match(js, /Salada de frutas 250 g/);
  assert.match(sliceProduct('salada-de-frutas-250g'), /"price": 12\.49/);
  assert.match(js, /maxFruits/);
  for (const fruta of ['Uva preta sem semente','Uva verde sem semente','Manga','Kiwi','Morango','Mamão','Melão','Maçã','Banana prata']) assert.ok(js.includes(fruta), fruta);
  for (const opcional of ['Mel','Granola','Leite em pó','Leite condensado']) assert.ok(js.includes(opcional), opcional);
});

test('regras de entrega, retirada e PJ/CNPJ estão visíveis', () => {
  for (const text of ['Entrega • R$ 10,00','Centro, São Luís','Vila Jetibá','segundas e sextas-feiras','sexta-feira, às 9h','quarta-feira, às 9h','48 horas de antecedência','Retirada no HS Hortigranjeiro Schulz','10 unidades de cada item','15% de desconto']) assert.ok(html.includes(text) || js.includes(text), text);
  assert.match(html, /id="customer-type"/);
  assert.match(html, /id="customer-cnpj"/);
  assert.ok(js.includes('const deliveryFee'));
  assert.ok(js.includes('qualifiesWholesale'));
});

test('WhatsApp oficial e formatação do pedido permanecem corretos', () => {
  assert.match(js, /const HS_WHATSAPP_NUMBER = '5527999087648';/);
  assert.ok(js.includes('🚨 *NOVO PEDIDO • HS HORTIGRANJEIRO*'));
  for (const label of ['*NOME*','*TELEFONE*','*ENDEREÇO*','*FORMA DE PAGAMENTO*','*OBS*','*PEDIDO*','*TOTAL:*']) assert.ok(js.includes(label));
  assert.ok(js.includes("'Retirada no HS Hortigranjeiro Schulz'"));
  for (const forbidden of ['👤','📱','📍','💳','📝','🟢']) assert.equal(js.includes(forbidden), false, `emoji indevido no pedido: ${forbidden}`);
});

test('segurança estática e experiência do checkout', () => {
  assert.match(html, /Content-Security-Policy/);
  assert.match(html, /id="checkout-form" novalidate/);
  assert.doesNotMatch(html, /id="customer-name"[^>]*required/);
  assert.ok(js.includes('Informe o endereço para entrega antes de enviar o pedido.'));
  assert.ok(js.includes('Troco calculado:'));
  assert.ok(css.includes('.package-option'));
  assert.ok(css.includes('.service-rules-grid'));
  assert.ok(css.includes('.implementation-card'));
});
