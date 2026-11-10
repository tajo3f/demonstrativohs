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
  assert.match(sw, /hs-final-2026-11-10-v39/);
  for (const file of ['hs-logo-oficial-v31.png','hs-app-icon-v31.png','hs-icon-circular-v31.png','icon-v31-32.png','icon-v31-64.png','icon-v31-180.png','icon-v31-192.png','icon-v31-512.png','favicon-v31.ico']) {
    assert.ok(fs.existsSync(new URL(`../assets/images/${file}`, import.meta.url)), file);
  }
  assert.ok(html.includes('Sistema em período de teste'));
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
  assert.ok(js.includes('packagePublicPrice'));
  assert.ok(!js.includes('PJ/CNPJ • desconto de 15% já aplicado'));
});

test('salada de frutas continua personalizável com até 3 frutas e opcionais', () => {
  assert.match(js, /Salada de frutas 200 g/);
  assert.match(sliceProduct('salada-de-frutas-250g'), /"price": 9\.99/);
  assert.match(js, /maxFruits/);
  for (const fruta of ['Uva preta sem semente','Uva verde sem semente','Manga','Kiwi','Morango','Mamão','Melão','Maçã','Banana prata']) assert.ok(js.includes(fruta), fruta);
  for (const opcional of ['Mel','Granola','Leite em pó','Leite condensado']) assert.ok(js.includes(opcional), opcional);
});

test('regras de entrega, retirada e PJ/CNPJ estão visíveis', () => {
  for (const text of ['Entrega • R$ 10,00','Centro, São Luís','Vila Jetibá','segundas e sextas-feiras','sexta-feira, às 9h','quarta-feira, às 9h','48 horas de antecedência','Retirada no HS Hortigranjeiro Schulz','10 unidades do mesmo produto','desconto de 15%']) assert.ok(html.includes(text) || js.includes(text), text);
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


test('V31 mantém o bloqueio da finalização fora do horário de funcionamento', () => {
  assert.ok(js.includes("const BUSINESS_TIME_ZONE = 'America/Sao_Paulo'"));
  assert.ok(js.includes('const BUSINESS_HOURS'));
  assert.ok(js.includes('function orderingAvailability'));
  assert.ok(js.includes('function updateOrderingAvailability'));
  assert.ok(js.includes('function ensureOrderingOpen'));
  assert.match(html, /id="ordering-status-card"/);
  assert.match(html, /id="cart-ordering-status"/);
  assert.match(html, /id="checkout-ordering-status"/);
  assert.ok(css.includes('.checkout-button:disabled'));
  assert.ok(css.includes('[data-ordering-state="closed"]'));
  assert.ok(js.includes("button.disabled = !status.open"));
});


test('V31 mantém a mesma experiência visual e funcional no celular e no computador', () => {
  assert.ok(css.includes('V29 — PARIDADE CELULAR + DESKTOP E MILHO REPOSICIONADO'));
  assert.ok(css.includes('.desktop-sidebar,.desktop-cart{display:none!important}'));
  assert.ok(css.includes('.bottom-nav{'));
  assert.ok(css.includes('display:grid!important'));
  assert.ok(css.includes('grid-template-columns:repeat(2,minmax(0,1fr))!important'));
  assert.ok(css.includes('img[src$="milho-verde-3-espigas.webp"]'));
  assert.ok(html.includes('app.css?v=36'));
  assert.ok(html.includes('app.js?v=39'));
});


test('V31 atualiza preços e pesos das frutas solicitadas e mantém observações no checkout', () => {
  const expected = {
    'mamao-picado-250g': ['"price": 5.99', '"weight": "250 g"'],
    'melao-picado-250g': ['"price": 7.99', '"weight": "250 g"'],
    'manga-palmer-cubos-250g': ['"price": 5.99', '"weight": "250 g"'],
    'kiwi-fatiado-300g': ['"price": 17.35', '"weight": "250 g"', '"name": "Kiwi fatiado 250 g"'],
    'goiaba-fatiada-300g': ['"price": 7.99', '"weight": "250 g"', '"name": "Goiaba fatiada 250 g"'],
    'salada-de-frutas-250g': ['"price": 9.99', '"weight": "200 g"', '"name": "Salada de frutas 200 g"']
  };
  for (const [id, snippets] of Object.entries(expected)) {
    const block = sliceProduct(id);
    for (const snippet of snippets) assert.ok(block.includes(snippet), `${id}: ${snippet}`);
  }
  assert.match(html, /id="customer-notes"/);
  assert.ok(html.includes('Observações do pedido'));
  assert.ok(js.includes("const notes = $('#customer-notes').value.trim() || 'Sem observações.';"));
  assert.ok(js.includes("'*OBS*'"));
});


test('V32: preço industrial, abacaxi natural e mínimo de entrega', () => {
  assert.match(js, /"id": "abacaxi-sem-tempero-250g"/);
  assert.match(js, /"price": 98\.82/);
  assert.match(js, /"price": 53\.3/);
  assert.match(js, /const DELIVERY_MINIMUM = 89\.90/);
  assert.match(js, /if \(!deliveryEligible\(\)\)/);
  assert.match(js, /hasIndustrialItems/);
});


test('V33: novo banner preservado e CTA acessível abaixo dos benefícios', () => {
  assert.ok(html.includes('hero-hs-v33-1672.webp'));
  assert.ok(html.includes('hero-hs-v33-1200.webp'));
  assert.ok(html.includes('hero-hs-v33-720.webp'));
  assert.ok(html.includes('SISTEMA EM PERÍODO DE TESTE'));
  assert.ok(html.includes('Nova operação digital HS em fase de implantação e ajustes finais.'));
  assert.ok(css.includes('.promo-banner-v33 .promo-banner-cta'));
  assert.ok(css.includes('position:absolute!important'));
  assert.ok(css.includes('bottom:.8%!important'));
  assert.ok(html.includes('bottom-nav-icon'));
  assert.ok(css.includes('.catalog-quick-add-symbol::before'));
  for (const file of ['hero-hs-v33-720.webp','hero-hs-v33-1200.webp','hero-hs-v33-1672.webp']) {
    assert.ok(fs.existsSync(new URL(`../assets/images/${file}`, import.meta.url)), file);
  }
});


test('V35: CNPJ libera desconto em 10 unidades iguais e embalagens de 5 kg', () => {
  assert.ok(js.includes('const hasEligibleCNPJ'));
  assert.ok(js.includes('Number(quantity) >= 10'));
  assert.ok(js.includes("choice.weight === '5 kg'"));
  assert.match(js, /if \(!hasEligibleCNPJ\(\)\) return 0;/);
  assert.match(js, /return qualifiesWholesale\(product, quantity, id\) \?/);
  assert.match(html, /Comprar sem CNPJ • preço normal/);
  assert.ok(!html.includes('desconto de 15% já aplicado'));
  assert.ok(js.includes('renderAll(); refreshCheckoutPreview();'));
  assert.ok(!js.includes('As embalagens industriais são destinadas a pessoa jurídica com CNPJ.'));
});

test('V35: compartilhamento no mobile, desktop e fallback por cópia', () => {
  for (const id of ['share-header', 'share-more', 'share-side', 'share-dialog', 'share-copy', 'share-whatsapp', 'share-message']) assert.ok(html.includes(`id="${id}"`));
  assert.ok(js.includes('navigator.share'));
  assert.ok(js.includes('navigator.clipboard?.writeText'));
  assert.ok(js.includes('document.execCommand'));
  assert.ok(js.includes('Conheça o aplicativo de pedidos da HS Hortigranjeiro Schulz!'));
});

test('V36: os quatro ícones da seção de benefícios são imagens locais otimizadas', () => {
  const assets=['beneficio-praticidade.webp','beneficio-produtos.webp','beneficio-pedido.webp','beneficio-agilidade.webp'];
  for(const file of assets){
    assert.ok(html.includes(`assets/images/${file}`),`imagem ausente na tela inicial: ${file}`);
    assert.ok(fs.existsSync(new URL(`../assets/images/${file}`,import.meta.url)),`imagem ausente no pacote: ${file}`);
    assert.ok(sw.includes(file),`imagem ausente no cache PWA: ${file}`);
  }
  assert.match(css,/V36 — ícones oficiais da seção de benefícios HS/);
  assert.ok(html.includes('class="benefit-mark"'));
});


test('V37: apenas as células laranja da tabela de 03/11/2026 são usadas para os novos preços', () => {
  // SUGESTÃO (laranja): preço de venda exibido ao público.
  for (const id of [
    'abobrinha-laminas-lasanha-500g', 'abobrinha-fatiada-rodelas-500g',
    'abobrinha-meia-lua-500g', 'abobrinha-picada-500g', 'abobrinha-rodelas-500g'
  ]) {
    assert.match(sliceProduct(id), /"price": 5\.75/);
    assert.match(sliceProduct(id), /"weight": "5 kg",\s*"summary": [^\n]+/);
  }
  for (const [id, price] of [
    ['aipim-cortado-congelado-500g', 3.99],
    ['batata-doce-rosada-rodelas-500g', 6.49],
    ['laranja-pera-2-frutas-500g', 3.99]
  ]) assert.match(sliceProduct(id), new RegExp(`"price": ${price.toString().replace('.', '\\.')}[,\\n]`));

  // 5 KG 15% (laranja): valores base para pessoa jurídica.
  for (const [id, industrialPrice] of [
    ['abobrinha-laminas-lasanha-500g', 53.30],
    ['abobrinha-fatiada-rodelas-500g', 53.30],
    ['abobrinha-meia-lua-500g', 53.30],
    ['abobrinha-picada-500g', 53.30],
    ['abobrinha-rodelas-500g', 53.30],
    ['aipim-cortado-congelado-500g', 34.62],
    ['batata-doce-rosada-rodelas-500g', 60.49],
    ['batata-inglesa-canoa-500g', 48.99],
    ['beterraba-cubos-pequenos-500g', 23.69],
    ['chuchu-paysanne-500g', 16.79],
    ['inhame-cara-500g', 83.49],
    ['inhame-chines-cubos-500g', 83.49],
    ['quiabo-fatiado-500g', 98.82]
  ]) {
    const obj = sliceProduct(id);
    const industrialSection = obj.split('"id": "industrial"')[1];
    assert.ok(industrialSection, `Embalagem industrial não encontrada em ${id}`);
    assert.match(industrialSection, new RegExp(`"price": ${industrialPrice.toString().replace('.', '\\.')}[,\\n]`));
  }
  assert.match(sw, /hs-final-2026-11-10-v39/);
});

test('V38: existe apenas abacaxi natural sem tempero, 250 g, por R$ 5,99', () => {
  const product = sliceProduct('abacaxi-sem-tempero-250g');
  assert.match(product, /"price": 5\.99/);
  assert.match(product, /"weight": "250 g"/);
  assert.match(product, /"image": "\.\/assets\/images\/abacaxi-em-cubos-250g\.webp"/);
  assert.doesNotMatch(js, /abacaxi-limao-sal-rosa-300g/);
  assert.doesNotMatch(sw, /abacaxi-limao-sal-rosa-300g/);
});


test('V39: valor nominal de 5 kg permanece integral até existir CNPJ', () => {
  assert.match(js, /const packagePublicPrice = choice => choice\?\.price;/);
  assert.match(js, /const packageFinalPrice = choice => choice\?\.industrial && choice\.weight === '5 kg' && hasEligibleCNPJ\(\)/);
  assert.match(js, /roundMoney\(packagePublicPrice\(choice\) \* \(1 - DISCOUNT_RATE\)\)/);
  assert.doesNotMatch(js, /choice\.price \/ \(1 - DISCOUNT_RATE\)/);
  assert.match(js, /pack\.weight === '5 kg' \? roundMoney\(\(packagePublicPrice\(pack\) - packageFinalPrice\(pack\)\) \* quantity\)/);
  assert.match(html, /app\.js\?v=39/);
  assert.match(sw, /hs-final-2026-11-10-v39/);
  // Os dados HS são preços nominais: não devem ser alterados na atualização da regra PJ.
  assert.match(sliceProduct('abobrinha-laminas-lasanha-500g'), /"price": 53\.3/);
  assert.match(sliceProduct('mix-de-forno-700g'), /"price": 109\.2/);
});
