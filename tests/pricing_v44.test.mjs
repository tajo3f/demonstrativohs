import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const source = readFileSync(new URL('../assets/js/app.js', import.meta.url),'utf8');
const published = readFileSync(new URL('../dist/assets/js/app.js', import.meta.url),'utf8');
const catalog = JSON.parse(source.match(/const PRODUCTS = (\[[\s\S]*?\]);\s*const FRUIT_OPTIONS/)[1]);
const cases = {
  'abobora-japonesa-sem-casca-cubos-500g': [7.99,69.69],
  'aipim-cortado-congelado-500g': [3.99,34.62],
  'batata-inglesa-canoa-500g': [6.90,55.89],
  'chuchu-paysanne-500g': [3.99,20.24],
  'batata-doce-rosada-rodelas-500g': [6.49,60.49],
  'combinado-cenoura-vagem-cubos-500g': [9.35,86.25],
  'kit-primavera-01-500g': [13.60,128.80],
  'beterraba-cubos-pequenos-500g': [6.99,60.49],
  'vagem-verde-bastonetes-500g': [12.99,125.66],
  'kit-refogado-500g': [10.49,89.10],
  'kit-primavera-02-500g': [13.60,128.80],
  'kit-buque-couve-brocolis-500g': [9.99,92.00],
  'inhame-chines-cubos-500g': [8.99,83.49],
  'kit-maionese-1kg': [8.99,80.50],
  'kit-yakisoba-500g': [12.99,106.60],
  'inhame-cara-500g': [8.99,83.49],
  'seleta-de-legumes-500g': [8.90,82.25],
  'espaguete-abobrinha-cenoura-500g': [7.99,63.25],
  'quiabo-fatiado-500g': [10.49,98.82],
  'kit-sopa-500g': [8.10,74.17],
};

const money = v => Math.round((v + Number.EPSILON) * 100)/100;
test('todos os 20 produtos possuem preço padrão e preço de 5kg exatamente como nas fotos, sem acréscimos', () => {
  assert.equal(Object.keys(cases).length,20);
  assert.equal(catalog.length,41);
  assert.equal(new Set(catalog.map(p => p.id)).size,catalog.length);
  for(const [id,[standard,industrial]] of Object.entries(cases)){
    const p = catalog.find(x => x.id === id);
    assert.ok(p,`produto ausente: ${id}`);
    assert.equal(p.price,standard,`preço base do produto: ${id}`);
    assert.equal(p.packageChoices.find(x => x.id === 'varejo').price,standard,`preço varejo: ${id}`);
    assert.equal(p.packageChoices.find(x => x.id === 'industrial').weight,'5 kg',`peso industrial: ${id}`);
    assert.equal(p.packageChoices.find(x => x.id === 'industrial').price,industrial,`preço público 5 kg: ${id}`);
  }
});

test('preço industrial sem CNPJ permanece exatamente o preço fornecido; com CNPJ aplica desconto posterior', () => {
  const begin=source.indexOf('  const money =');
  const end=source.indexOf('  const normalizeText =',begin);
  const fields={'#customer-type':{value:'pf'},'#customer-cnpj':{value:''}};
  const fn = new Function('fields', `const $=s=>fields[s];const PRODUCTS=[];${source.slice(begin,end)};return {hasEligibleCNPJ,packagePublicPrice,packageFinalPrice};`);
  const {hasEligibleCNPJ,packagePublicPrice,packageFinalPrice}=fn(fields);
  for(const [id,[,industrial]] of Object.entries(cases)){
    const pack=catalog.find(p=>p.id===id).packageChoices.find(x=>x.id==='industrial');
    assert.equal(packagePublicPrice(pack),industrial,id);
    assert.equal(packageFinalPrice(pack),industrial,id);
  }
  fields['#customer-cnpj'].value='12345678000199';
  assert.equal(hasEligibleCNPJ(),false,'apenas CNPJ não basta sem tipo PJ');
  fields['#customer-type'].value='pj';
  assert.equal(hasEligibleCNPJ(),true);
  for(const [id,[,industrial]] of Object.entries(cases)){
    const pack=catalog.find(p=>p.id===id).packageChoices.find(x=>x.id==='industrial');
    assert.equal(packagePublicPrice(pack),industrial,id);
    assert.equal(packageFinalPrice(pack),money(industrial*.85),id);
  }
});

test('fonte, dist e referências PWA são sincronizados para v44',()=>{
  assert.equal(source,published);
  const html=readFileSync(new URL('../index.html',import.meta.url),'utf8');
  const distHtml=readFileSync(new URL('../dist/index.html',import.meta.url),'utf8');
  const sw=readFileSync(new URL('../sw.js',import.meta.url),'utf8');
  const distSW=readFileSync(new URL('../dist/sw.js',import.meta.url),'utf8');
  assert.equal(html,distHtml);
  assert.equal(sw,distSW);
  assert.match(sw,/hs-final-2026-11-12-v44/);
  assert.match(html,/app\.js\?v=44/);
  assert.match(html,/app\.css\?v=44/);
});

test('abacaxis e regras de finalização não foram retirados',()=>{
  assert.equal(catalog.find(p=>p.id==='abacaxi-sem-tempero-250g').price,5.99);
  assert.equal(catalog.find(p=>p.id==='abacaxi-temperado-limao-sal-rosa-300g').price,8.99);
  assert.match(source,/const DELIVERY_MINIMUM = 89\.90/);
  assert.match(source,/const HS_WHATSAPP_NUMBER = '5527999087648'/);
  assert.match(source,/qualifiesWholesale/);
  assert.match(source,/hasEligibleCNPJ/);
});
