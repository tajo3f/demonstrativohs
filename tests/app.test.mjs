import test from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';
const html=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');const js=fs.readFileSync(new URL('../assets/js/app.js',import.meta.url),'utf8');const manifest=JSON.parse(fs.readFileSync(new URL('../manifest.webmanifest',import.meta.url),'utf8'));
test('estrutura principal do app existe',()=>{for(const id of ['view-home','view-products','view-cart','bottom-count','product-dialog','install-dialog'])assert.match(html,new RegExp(`id="${id}"`))});
test('catálogo demo contém cinco produtos',()=>{for(const name of ['Cenoura Picada','Abóbora Picada','Couve-flor','Vinagrete','Kit Sopão'])assert.match(js,new RegExp(name))});
test('PWA está em modo standalone',()=>assert.equal(manifest.display,'standalone'));
test('carrinho usa localStorage',()=>assert.match(js,/localStorage/));
test('modo demonstrativo bloqueia WhatsApp direto',()=>{assert.match(js,/DEMO=true/);assert.doesNotMatch(js,/wa\.me\//)});
