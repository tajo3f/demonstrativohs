export const money=value=>new Intl.NumberFormat('pt-BR',{style:'currency',currency:'BRL'}).format(value);
export function sanitizeCart(value,ids){
 if(!value||typeof value!=='object'||Array.isArray(value))return {};
 const allowed=new Set(ids);
 return Object.fromEntries(Object.entries(value).filter(([id,q])=>allowed.has(id)&&Number.isInteger(q)&&q>0&&q<=99));
}
export function changeQuantity(cart,id,delta,ids){
 if(!ids.includes(id)||!Number.isInteger(delta))return {...cart};
 const next={...sanitizeCart(cart,ids)};
 const qty=Math.max(0,Math.min(99,(next[id]||0)+delta));
 if(qty===0)delete next[id];else next[id]=qty;return next;
}
export const countItems=cart=>Object.values(cart).reduce((a,b)=>a+b,0);
export const cartTotal=(cart,products)=>products.reduce((sum,p)=>sum+(cart[p.id]||0)*p.price,0);
export function formatPhone(value){const d=String(value).replace(/\D/g,'').replace(/^55(?=\d{10,11}$)/,'').slice(0,11);if(d.length<=2)return d.length?'('+d:'';if(d.length<=6)return `(${d.slice(0,2)}) ${d.slice(2)}`;return `(${d.slice(0,2)}) ${d.slice(2,d.length===11?7:6)}-${d.slice(d.length===11?7:6)}`;}
export const isValidPhone=(value)=>{const d=String(value).replace(/\D/g,'').replace(/^55(?=\d{10,11}$)/,'');return /^\d{10,11}$/.test(d);};
export const validWhatsapp=value=>/^55\d{10,11}$/.test(value);
export function canCheckout(site){return validWhatsapp(site.whatsapp)&&site.catalogApproved&&site.visualIdentityApproved&&site.policyApprovedByLegal&&site.priceStatus==='official';}
export function buildMessage({cart,products,name,phone='',fulfillment='A combinar com o HS',address='',payment='A combinar',notes='',isDemo=true}){
 if(!name||!name.trim())throw Error('Informe seu nome.');
 if(name.length>90||notes.length>350||address.length>220)throw Error('Algum campo está maior do que o permitido.');
 if(!isValidPhone(phone))throw Error('Informe um WhatsApp válido com DDD.');
 const items=products.filter(p=>cart[p.id]).map(p=>`• ${cart[p.id]}x ${p.name} — ${money(cart[p.id]*p.price)}${isDemo?' (demonstrativo)':''}`);
 if(!items.length)throw Error('Escolha ao menos um produto.');
 return [isDemo?'PRÉVIA DEMONSTRATIVA — NÃO É UM PEDIDO REAL':'OLÁ, HS! GOSTARIA DE FAZER UM PEDIDO','',`Nome: ${name.trim()}`,`Telefone: ${formatPhone(phone)}`,`Recebimento: ${fulfillment}`,`Endereço/referência: ${address.trim()||'Não informado'}`,`Pagamento: ${payment}`,`Observações: ${notes.trim()||'Nenhuma'}`,'','PRODUTOS:',...items,'',`${isDemo?'Subtotal demonstrativo':'Subtotal'}: ${money(cartTotal(cart,products))}`,'','Confirmar disponibilidade, pesos, valores finais e condições de entrega/retirada.'].join('\n');
}
