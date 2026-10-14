import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const html=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');
const js=fs.readFileSync(new URL('../assets/js/app.js',import.meta.url),'utf8');
const css=fs.readFileSync(new URL('../assets/css/app.css',import.meta.url),'utf8');
const sw=fs.readFileSync(new URL('../sw.js',import.meta.url),'utf8');
const manifest=JSON.parse(fs.readFileSync(new URL('../manifest.webmanifest',import.meta.url),'utf8'));

test('estrutura principal do app existe',()=>{for(const id of ['view-home','view-products','view-cart','bottom-count','product-dialog','install-dialog'])assert.match(html,new RegExp(`id="${id}"`))});

test('catálogo contém os dez produtos recebidos nesta atualização',()=>{
  for(const name of [
    'Abóbora jacaré em fatias para assar 500 g',
    'Abóbora japonesa sem casca em cubos 500 g',
    'Abobrinha em lâminas para lasanha 500 g',
    'Abobrinha em rodelas 500 g',
    'Abobrinha fatiada em rodelas 500 g',
    'Abobrinha meia-lua 500 g',
    'Abobrinha picada 500 g',
    'Aipim cortado e congelado 500 g',
    'Kit para sopa: inhame-chinês, chuchu, batata-inglesa e cenoura 500 g',
    'Quiabo fatiado 500 g'
  ]) assert.match(js,new RegExp(name.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')));
});

test('preços enviados foram cadastrados',()=>{
  for(const price of ['price: 3.99','price: 4.99','price: 6.49','price: 12.49']) assert.match(js,new RegExp(price.replace('.', '\\.')));
});

test('salada de frutas continua personalizável',()=>{assert.match(js,/Salada de frutas/);assert.match(js,/FRUIT_OPTIONS/);assert.match(js,/fruit-customizer/)});
test('catálogo segue organizado por linhas comerciais',()=>{for(const label of ['Todos','Processados','Saladas','Kits'])assert.match(js,new RegExp(`label:'${label}'`));assert.match(html,/Nosso catálogo/)});
test('PWA está em modo standalone',()=>assert.equal(manifest.display,'standalone'));
test('carrinho e personalizações preservam localStorage existente',()=>{assert.match(js,/hs-v10-cart/);assert.match(js,/hs-v10-customizations/)});
test('service worker usa cache V13',()=>assert.match(sw,/hs-v13-shell/));
test('não contém WhatsApp hardcoded',()=>assert.doesNotMatch(js,/wa\.me\//));
test('imagens do catálogo são contidas sem corte',()=>{assert.match(css,/V12 — imagens proporcionais/);assert.match(css,/\.catalog-image img\{[\s\S]*?object-fit:contain/)});
test('modal de produto usa layout compacto e responsivo',()=>{assert.match(css,/grid-template-columns:minmax\(280px,40%\) minmax\(0,1fr\)/);assert.match(css,/\.detail-image\{[\s\S]*?min-height:410px/);assert.match(css,/@media\(max-width:680px\)/)});
test('destaques possuem botão rápido de adicionar',()=>{assert.match(js,/mini-quick-add/);assert.match(js,/Adicionar \$\{p\.name\} ao carrinho/)});
test('carrinho desktop possui remoção rápida',()=>{assert.match(js,/desktop-remove/);assert.match(js,/setQty\(p\.id,0\)/);assert.match(css,/\.desktop-remove\{/)});

test('hero mobile separa copy, vitrine e benefícios sem sobreposição',()=>{assert.match(css,/V13 — responsividade comercial definitiva/);assert.match(css,/@media \(max-width: 720px\)/);assert.match(css,/\.promo-card\{[\s\S]*?display:flex;[\s\S]*?flex-direction:column/);assert.match(css,/\.promo-copy\{[\s\S]*?order:1/);assert.match(css,/\.promo-visual\{[\s\S]*?order:2/);assert.match(css,/\.promo-benefits\{[\s\S]*?order:3/)});
test('html não duplica o estado vazio do carrinho',()=>assert.equal((html.match(/id="cart-empty"/g)||[]).length,1));
