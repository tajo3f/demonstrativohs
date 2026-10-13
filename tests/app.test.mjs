import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const html=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');
const js=fs.readFileSync(new URL('../assets/js/app.js',import.meta.url),'utf8');
const sw=fs.readFileSync(new URL('../sw.js',import.meta.url),'utf8');
const manifest=JSON.parse(fs.readFileSync(new URL('../manifest.webmanifest',import.meta.url),'utf8'));

test('estrutura principal do app existe',()=>{for(const id of ['view-home','view-products','view-cart','bottom-count','product-dialog','install-dialog'])assert.match(html,new RegExp(`id="${id}"`))});

test('catálogo contém os dez produtos recebidos nesta atualização',()=>{
  for(const name of [
    'abobora jacare em fatias pra assar 500g',
    'abobora japonesa sem casca em cubos 500g',
    'Abobrinha em lâminas para lasanha 500g',
    'abobrinha em rodelas 500g',
    'Abobrinha fatiada em rodelas 500g',
    'Abobrinha meia lua 500g',
    'Abobrinha picada 500 g',
    'aipim cortado congelado 500g',
    'kit sopa, inhame chines, chuchu, batata inglesa, cenoura 500g',
    'Quiabo fatiado 500g'
  ]) assert.match(js,new RegExp(name.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')));
});

test('preços enviados foram cadastrados',()=>{
  for(const price of ['price: 3.99','price: 4.99','price: 6.49','price: 12.49']) assert.match(js,new RegExp(price.replace('.', '\\.')));
});

test('salada de frutas continua personalizável',()=>{assert.match(js,/Salada de Frutas/);assert.match(js,/FRUIT_OPTIONS/);assert.match(js,/fruit-customizer/)});

test('catálogo segue organizado por linhas comerciais',()=>{
  for(const label of ['Todos','Processados','Saladas','Kits']) assert.match(js,new RegExp(`label:'${label}'`));
  assert.match(html,/Nosso Catálogo/);
  assert.match(html,/data-home-category="processados"/);
  assert.match(html,/data-home-category="saladas"/);
  assert.match(html,/data-home-category="kits"/);
});

test('kit sopa está classificado em Kits',()=>{assert.match(js,/id: 'kit-sopa-500g'[\s\S]*category: 'kits'/)});
test('PWA está em modo standalone',()=>assert.equal(manifest.display,'standalone'));
test('carrinho e personalizações usam localStorage V9',()=>{assert.match(js,/hs-v9-cart/);assert.match(js,/hs-v9-customizations/)});
test('service worker usa cache V9 e inclui novas imagens',()=>{assert.match(sw,/hs-v9-shell/);assert.match(sw,/abobora-jacare-fatias-assar-500g\.webp/);assert.match(sw,/kit-sopa-inhame-chines-chuchu-batata-cenoura-500g\.webp/)});
test('não contém WhatsApp hardcoded',()=>assert.doesNotMatch(js,/wa\.me\//));
