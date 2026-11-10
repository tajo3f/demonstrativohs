import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const js = readFileSync(new URL('../assets/js/app.js', import.meta.url), 'utf8');
function between(start,end){
  const a=js.indexOf(start), b=js.indexOf(end,a+1);
  assert.ok(a>=0 && b>a, `Trecho ausente: ${start}`);
  return js.slice(a,b);
}
// Executa a implementação REAL das fórmulas extraídas do app (sem duplicar cálculos no teste).
function makePricing(){
  const fields = {
    '#customer-type': { value:'pf' },
    '#customer-cnpj': { value:'' }
  };
  const source = `
    const PRODUCTS=[];
    const $ = query => fields[query];
    ${between('  const money =', '  const normalizeText =')}
    const selectedPackage = product => product.pack || null;
    const selectedOption = () => null;
    const addonCost = () => 0;
    const isIndustrialPackage = product => Boolean(product.pack?.industrial);
    ${between('  const unitPrice =', '  const priceLabel =')}
    ${between('  const qualifiesWholesale =', '  const checkoutItemsSubtotal =')}
    return { hasEligibleCNPJ, packagePublicPrice, packageFinalPrice, lineBaseTotal, lineDiscount, unitPrice, qualifiesWholesale };
  `;
  return { fields, price:new Function('fields',source)(fields) };
}
function selected5kg(amount){
  return { id:'test', price:5.99, pack:{ id:'industrial', price:amount, weight:'5 kg', industrial:true } };
}
test('5 kg: preço da HS sem CNPJ, inclusive PJ sem número completo',()=>{
  const {fields,price}=makePricing();
  for(const amount of [109.2,53.3,37.5,98.82,16.79]){
    const product=selected5kg(amount);
    assert.equal(price.unitPrice(product),amount);
    assert.equal(price.packagePublicPrice(product.pack),amount);
    assert.equal(price.lineDiscount(product,1),0);
    fields['#customer-type'].value='pj';
    assert.equal(price.lineDiscount(product,1),0);
    fields['#customer-cnpj'].value='1234567800019';
    assert.equal(price.lineDiscount(product,1),0);
    fields['#customer-type'].value='pf';fields['#customer-cnpj'].value='';
  }
});
test('5 kg: somente PJ com CNPJ preenchido recebe 15%, com total coerente para múltiplas unidades',()=>{
  const {fields,price}=makePricing();
  fields['#customer-type'].value='pj';
  fields['#customer-cnpj'].value='12.345.678/0001-99';
  const p1=selected5kg(109.2);
  assert.equal(price.packageFinalPrice(p1.pack),92.82);
  assert.equal(price.lineDiscount(p1,1),16.38);
  assert.equal(Math.round((price.lineBaseTotal(p1,1)-price.lineDiscount(p1,1))*100)/100,92.82);
  assert.equal(Math.round((price.lineBaseTotal(p1,2)-price.lineDiscount(p1,2))*100)/100,185.64);
  for(const amount of [37.5,53.3,98.82,16.79]){
    const p=selected5kg(amount);
    const net=price.packageFinalPrice(p.pack);
    for(const qty of [1,2,3]){
      assert.equal(Math.round((price.lineBaseTotal(p,qty)-price.lineDiscount(p,qty))*100)/100,
        Math.round(net*qty*100)/100, `${amount} × ${qty}`);
    }
  }
  fields['#customer-type'].value='pf';
  assert.equal(price.lineDiscount(p1,1),0);
});
test('3 kg não recebe automaticamente desconto industrial; 10 itens comuns idênticos continuam com desconto para PJ',()=>{
  const {fields,price}=makePricing();
  fields['#customer-type'].value='pj';
  fields['#customer-cnpj'].value='12345678000199';
  const pack3={id:'test',price:5.75,pack:{price:40.25,weight:'3 kg',industrial:true}};
  assert.equal(price.lineDiscount(pack3,1),0);
  const common={id:'batata',price:6.49,pack:null};
  assert.equal(price.lineDiscount(common,9),0);
  assert.equal(price.lineDiscount(common,10),9.74);
  fields['#customer-cnpj'].value='';
  assert.equal(price.lineDiscount(common,10),0);
});
