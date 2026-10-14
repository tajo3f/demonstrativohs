import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const html=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');
const js=fs.readFileSync(new URL('../assets/js/app.js',import.meta.url),'utf8');
const css=fs.readFileSync(new URL('../assets/css/app.css',import.meta.url),'utf8');
const sw=fs.readFileSync(new URL('../sw.js',import.meta.url),'utf8');
const manifest=JSON.parse(fs.readFileSync(new URL('../manifest.webmanifest',import.meta.url),'utf8'));

test('estrutura principal do app existe',()=>{for(const id of ['view-home','view-products','view-cart','bottom-count','product-dialog','install-dialog'])assert.match(html,new RegExp(`id="${id}"`))});

test('produtos do catálogo seguem com português revisado',()=>{
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

test('preços principais continuam cadastrados',()=>{for(const price of ['price: 10.99','price: 7.99','price: 8.49','price: 2.99','price: 8.99','price: 5.49'])assert.match(js,new RegExp(price.replace('.', '\\.')))});
test('salada de frutas continua personalizável',()=>{assert.match(js,/Salada de frutas/);assert.match(js,/FRUIT_OPTIONS/);assert.match(js,/fruit-customizer/)});
test('catálogo segue organizado por linhas comerciais',()=>{for(const label of ['Todos','Processados','Saladas','Kits'])assert.match(js,new RegExp(`label:'${label}'`));assert.match(html,/Nosso catálogo/)});
test('PWA está em modo standalone',()=>assert.equal(manifest.display,'standalone'));
test('carrinho usa chave estável e migra armazenamento anterior',()=>{assert.match(js,/hs-cart-v1/);assert.match(js,/hs-customizations-v1/);assert.match(js,/LEGACY_CART_KEYS/)});
test('service worker usa cache V20',()=>assert.match(sw,/hs-v20-shell/));
test('hero V20 usa uma única arte responsiva',()=>{assert.match(html,/promo-banner-v20/);assert.match(html,/hero-hs-v20-720\.webp/);assert.match(html,/hero-hs-v20-1200\.webp/);assert.match(html,/hero-hs-v20-1664\.webp/);assert.doesNotMatch(html,/class="hero-product/)});
test('hero preserva proporção sem distorção',()=>{assert.match(css,/\.promo-banner-picture img\{/);assert.match(css,/aspect-ratio:16\/9/);assert.match(css,/object-fit:contain/)});
test('somente botão Ver produtos atua no hero',()=>{assert.match(html,/class="promo-banner-cta" data-route="products"/);assert.match(html,/Ver produtos/)});
test('cards da home reutilizam o card do catálogo',()=>{assert.match(html,/home-products catalog-grid shared-product-grid/);assert.match(js,/featured\.map\(catalogCard\)/)});
test('catálogo oferece adição rápida',()=>{assert.match(js,/action-host/);assert.match(js,/b\.textContent = p\.customizable \? '✦' : '\+'/)});
test('carrinho desktop possui remoção rápida',()=>{assert.match(js,/desktop-remove/);assert.match(js,/setQty\(p\.id,0\)/)});
test('pedido WhatsApp segue ordem solicitada',()=>{for(const label of ['*NOME*','*TELEFONE*','*ENDEREÇO*','*FORMA DE PAGAMENTO*','*OBS*','*PEDIDO*'])assert.match(js,new RegExp(label.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')))});
test('finalização abre WhatsApp com mensagem pronta',()=>{assert.match(js,/https:\/\/wa\.me\//);assert.match(js,/window\.open\(url/);assert.match(html,/Enviar pelo WhatsApp/)});
test('html não duplica o estado vazio do carrinho',()=>assert.equal((html.match(/id="cart-empty"/g)||[]).length,1));
