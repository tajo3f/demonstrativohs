import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const html=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');
const js=fs.readFileSync(new URL('../assets/js/app.js',import.meta.url),'utf8');
const css=fs.readFileSync(new URL('../assets/css/app.css',import.meta.url),'utf8');
const sw=fs.readFileSync(new URL('../sw.js',import.meta.url),'utf8');
const manifest=JSON.parse(fs.readFileSync(new URL('../manifest.webmanifest',import.meta.url),'utf8'));

test('estrutura principal do app existe',()=>{for(const id of ['view-home','view-products','view-cart','bottom-count','product-dialog','install-dialog'])assert.match(html,new RegExp(`id="${id}"`))});

test('novos produtos estão cadastrados com português revisado',()=>{
  for(const name of [
    'Vagem verde cortada em bastonetes 500 g',
    'Batata-doce rosada com casca em rodelas 500 g',
    'Batata-inglesa em canoas 500 g',
    'Beterraba em cubos pequenos 500 g',
    'Chuchu em corte paysanne (fatias finas e irregulares) 500 g',
    'Combinado de cenoura e vagem em cubos pequenos 500 g',
    'Goiaba fatiada 300 g',
    'Kit Primavera 01: couve-flor, brócolis, batata-inglesa e cenoura 500 g',
    'Melancia em cubos 250 g'
  ]) assert.match(js,new RegExp(name.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')));
});

test('preços dos novos itens foram cadastrados',()=>{for(const price of ['price: 10.99','price: 7.99','price: 8.49','price: 2.99','price: 8.99','price: 5.49'])assert.match(js,new RegExp(price.replace('.', '\\.')))});
test('salada de frutas continua personalizável',()=>{assert.match(js,/Salada de frutas/);assert.match(js,/FRUIT_OPTIONS/);assert.match(js,/fruit-customizer/)});
test('catálogo segue organizado por linhas comerciais',()=>{for(const label of ['Todos','Processados','Saladas','Kits'])assert.match(js,new RegExp(`label:'${label}'`));assert.match(html,/Nosso catálogo/)});
test('PWA está em modo standalone',()=>assert.equal(manifest.display,'standalone'));
test('carrinho preserva armazenamento local',()=>{assert.match(js,/hs-v10-cart/);assert.match(js,/hs-v10-customizations/)});
test('service worker usa cache V14',()=>assert.match(sw,/hs-v14-shell/));
test('não contém WhatsApp hardcoded',()=>assert.doesNotMatch(js,/wa\.me\//));
test('hero usa três produtos coloridos e não sobrepostos',()=>{assert.match(html,/beterraba-cubos-pequenos-500g\.webp/);assert.match(html,/abobora-japonesa-sem-casca-cubos-500g\.webp/);assert.match(html,/vagem-verde-bastonetes-500g\.webp/);assert.match(css,/V14 — vitrine colorida/);assert.match(css,/grid-template-columns:\.92fr 1\.08fr \.92fr/);assert.match(css,/position:relative!important/)});
test('destaques usam seleção variada',()=>{assert.match(js,/HOME_FEATURE_IDS/);assert.match(js,/melancia-cubos-250g/);assert.match(js,/beterraba-cubos-pequenos-500g/)});
test('imagens do catálogo preservam proporção',()=>assert.match(css,/\.catalog-image img\{object-fit:contain!important/));
test('catálogo oferece adição rápida',()=>{assert.match(js,/action-host/);assert.match(js,/b\.textContent = p\.customizable \? '✦' : '\+'/)});
test('carrinho desktop possui remoção rápida',()=>{assert.match(js,/desktop-remove/);assert.match(js,/setQty\(p\.id,0\)/)});
test('html não duplica o estado vazio do carrinho',()=>assert.equal((html.match(/id="cart-empty"/g)||[]).length,1));
