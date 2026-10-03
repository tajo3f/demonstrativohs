(() => {
  'use strict';
  const PRODUCTS = [
    {id:'cenoura',name:'Cenoura Picada',category:'individuais',categoryLabel:'Legumes',price:6.90,weight:'500 g',image:'./assets/images/cenoura.webp',badge:'Nova linha',description:'Produto demonstrativo da nova linha HS. Informações finais serão publicadas somente após aprovação da empresa.'},
    {id:'abobora',name:'Abóbora Picada',category:'individuais',categoryLabel:'Legumes',price:6.50,weight:'500 g',image:'./assets/images/abobora.webp',badge:'Nova linha',description:'Produto demonstrativo da nova linha HS. Peso, descrição e valor precisam de validação oficial.'},
    {id:'couve-flor',name:'Couve-flor',category:'individuais',categoryLabel:'Legumes',price:7.90,weight:'500 g',image:'./assets/images/couve-flor.webp',badge:'Nova linha',description:'Produto demonstrativo da nova linha HS, apresentado para validar a experiência do aplicativo.'},
    {id:'vinagrete',name:'Vinagrete',category:'saladas',categoryLabel:'Saladas',price:6.90,weight:'500 g',image:'./assets/images/vinagrete.webp',badge:'Salada',description:'Produto demonstrativo. Composição, peso e preço finais dependem de aprovação da HS.'},
    {id:'kit-sopao',name:'Kit Sopão',category:'kits',categoryLabel:'Kits',price:14.90,weight:'1 kg',image:'./assets/images/kit-sopao.webp',badge:'Kit',description:'Kit demonstrativo com seleção de vegetais. Composição e peso oficiais serão confirmados pela HS.'}
  ];
  const CATEGORIES = [{id:'all',label:'Todos'},{id:'individuais',label:'Processados'},{id:'saladas',label:'Saladas'},{id:'kits',label:'Kits'}];
  const CART_KEY='hs-v6-cart';
  const DEMO=true;
  let cart={}; let category='all'; let query=''; let deferredPrompt=null; let lastRoute='home';
  const $=(q,root=document)=>root.querySelector(q); const $$=(q,root=document)=>[...root.querySelectorAll(q)];
  const money=v=>new Intl.NumberFormat('pt-BR',{style:'currency',currency:'BRL'}).format(v);
  const byId=id=>PRODUCTS.find(p=>p.id===id);
  try{cart=JSON.parse(localStorage.getItem(CART_KEY)||'{}')||{}}catch{cart={}}
  for(const id of Object.keys(cart)) if(!byId(id)||!Number.isFinite(Number(cart[id]))||cart[id]<=0) delete cart[id];
  const save=()=>{try{localStorage.setItem(CART_KEY,JSON.stringify(cart))}catch{}};
  const count=()=>Object.values(cart).reduce((a,b)=>a+Number(b||0),0);
  const total=()=>Object.entries(cart).reduce((sum,[id,qty])=>sum+(byId(id)?.price||0)*qty,0);
  const toast=msg=>{const t=$('#toast');t.textContent=msg;t.hidden=false;clearTimeout(toast.t);toast.t=setTimeout(()=>t.hidden=true,2200)};
  const vibrate=()=>{if(navigator.vibrate)navigator.vibrate(7)};

  function setQty(id,qty){ if(qty<=0) delete cart[id]; else cart[id]=Math.min(99,qty); save(); renderAll(); vibrate(); }
  function add(id){setQty(id,(cart[id]||0)+1);toast(`${byId(id).name} adicionado ao carrinho`)}
  function remove(id){setQty(id,(cart[id]||0)-1)}

  function route(name){
    const current=$('.view.active')?.dataset.view||'home'; if(current!==name) lastRoute=current;
    $$('.view').forEach(v=>{const on=v.dataset.view===name;v.hidden=!on;v.classList.toggle('active',on)});
    $$('.bottom-link,.side-link').forEach(b=>b.classList.toggle('active',b.dataset.route===name));
    $('#header-back').hidden=name==='home';
    if(name==='products') renderCatalog(); if(name==='cart') renderCart();
    window.scrollTo({top:0,behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'});
  }
  $$('[data-route]').forEach(el=>el.addEventListener('click',e=>{e.preventDefault();route(el.dataset.route)}));
  $('#header-back').addEventListener('click',()=>route(lastRoute||'home'));

  function productMini(p){
    const art=document.createElement('article');art.className='mini-product';
    art.innerHTML=`<img src="${p.image}" alt="${p.name}"><div class="mini-product-info"><strong>${p.name}</strong><small>${p.weight} • valor demonstrativo</small><b>${money(p.price)}</b></div><button type="button" aria-label="Adicionar ${p.name}">+</button>`;
    art.querySelector('img').addEventListener('click',()=>openDetail(p.id));art.querySelector('button').addEventListener('click',()=>add(p.id)); return art;
  }
  function renderHome(){const host=$('#home-products');host.replaceChildren(...PRODUCTS.slice(0,3).map(productMini));}

  function filterProducts(){const q=query.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();return PRODUCTS.filter(p=>(category==='all'||p.category===category)&&`${p.name} ${p.categoryLabel}`.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().includes(q));}
  function renderFilters(){const row=$('#filter-row');row.innerHTML='';CATEGORIES.forEach(c=>{const b=document.createElement('button');b.className=`filter-chip${category===c.id?' active':''}`;b.type='button';b.textContent=c.label;b.onclick=()=>{category=c.id;renderFilters();renderCatalog()};row.append(b)})}
  function catalogCard(p){const q=cart[p.id]||0;const art=document.createElement('article');art.className='catalog-card';art.innerHTML=`<div class="catalog-image"><img src="${p.image}" alt="${p.name}" loading="lazy"><span>${p.badge}</span></div><div class="catalog-body"><h3>${p.name}</h3><small>${p.weight} • ${p.categoryLabel}</small><div class="catalog-price"><strong>${money(p.price)}</strong><div class="action-host"></div></div></div>`;art.querySelector('.catalog-image').addEventListener('click',()=>openDetail(p.id));const h=art.querySelector('.action-host');if(!q){const b=document.createElement('button');b.type='button';b.textContent='+';b.setAttribute('aria-label',`Adicionar ${p.name}`);b.onclick=()=>add(p.id);h.append(b)}else{h.className='catalog-qty';const m=document.createElement('button');m.textContent='−';m.onclick=()=>remove(p.id);const s=document.createElement('span');s.textContent=q;const a=document.createElement('button');a.textContent='+';a.onclick=()=>add(p.id);h.append(m,s,a)}return art}
  function renderCatalog(){const list=filterProducts();$('#product-count').textContent=list.length;const host=$('#catalog-grid');host.replaceChildren(...list.map(catalogCard));$('#empty-state').hidden=!!list.length;renderFilters()}

  function cartLine(p,qty){const art=document.createElement('article');art.className='cart-line';art.innerHTML=`<img src="${p.image}" alt="${p.name}"><div class="cart-line-info"><strong>${p.name}</strong><small>${p.weight} • valor demonstrativo</small><b>${money(p.price*qty)}</b></div><div class="cart-line-side"><button class="remove-line" aria-label="Remover ${p.name}">×</button><div class="line-stepper"><button aria-label="Diminuir">−</button><span>${qty}</span><button aria-label="Aumentar">+</button></div></div>`;const buttons=art.querySelectorAll('button');buttons[0].onclick=()=>setQty(p.id,0);buttons[1].onclick=()=>remove(p.id);buttons[2].onclick=()=>add(p.id);return art}
  function renderCart(){const entries=PRODUCTS.filter(p=>cart[p.id]).map(p=>[p,cart[p.id]]);const host=$('#cart-items');host.replaceChildren(...entries.map(([p,q])=>cartLine(p,q)));const empty=!entries.length;$('#cart-empty').hidden=!empty;$('#cart-summary').hidden=empty;$('#clear-cart').hidden=empty;const n=count();$('#cart-count-label').textContent=`${n} ${n===1?'item':'itens'}`;$('#summary-items').textContent=n;$('#summary-subtotal').textContent=money(total());$('#summary-total').textContent=money(total());}
  function renderDesktopCart(){const entries=PRODUCTS.filter(p=>cart[p.id]).map(p=>[p,cart[p.id]]);const host=$('#desktop-cart-items');host.innerHTML='';entries.forEach(([p,q])=>{const d=document.createElement('div');d.className='desktop-cart-line';d.innerHTML=`<img src="${p.image}" alt=""><div><strong>${p.name}</strong><small>${q}x • ${p.weight}</small></div><b>${money(p.price*q)}</b>`;host.append(d)});$('#desktop-cart-empty').hidden=!!entries.length;$('#desktop-cart-summary').hidden=!entries.length;$('#desktop-subtotal').textContent=money(total());}
  function renderCounts(){const n=count();['#header-count','#bottom-count','#side-count','#desktop-cart-count'].forEach(id=>$(id).textContent=n)}
  function renderAll(){renderHome();renderCatalog();renderCart();renderDesktopCart();renderCounts()}

  function openDetail(id){const p=byId(id);const q=cart[id]||1;const root=$('#product-detail');root.innerHTML=`<button type="button" class="detail-close" aria-label="Fechar">×</button><div class="detail-image"><img src="${p.image}" alt="${p.name}"></div><div class="detail-body"><span>${p.categoryLabel.toUpperCase()}</span><h2>${p.name}</h2><small>${p.weight} • valor demonstrativo</small><div class="detail-price">${money(p.price)}</div><p class="detail-description">${p.description}</p><div class="detail-benefits"><div><span>◒</span><b>Seleção HS</b></div><div><span>✓</span><b>Praticidade</b></div><div><span>◷</span><b>Pronto para rotina</b></div></div><div class="detail-actions"><div class="detail-stepper"><button type="button" data-minus>−</button><span data-detail-qty>${q}</span><button type="button" data-plus>+</button></div><button type="button" class="detail-add">Adicionar ao carrinho</button></div><div class="tip-card"><strong>Dica de uso</strong><br>Informações de preparo e conservação serão publicadas após validação da HS.</div></div>`;let temp=q;const val=$('[data-detail-qty]',root);$('[data-minus]',root).onclick=()=>{temp=Math.max(1,temp-1);val.textContent=temp};$('[data-plus]',root).onclick=()=>{temp++;val.textContent=temp};$('.detail-add',root).onclick=()=>{setQty(id,temp);toast(`${p.name} atualizado no carrinho`);$('#product-dialog').close()};$('.detail-close',root).onclick=()=>$('#product-dialog').close();$('#product-dialog').showModal()}

  function checkoutText(){const lines=['PEDIDO HS HORTIGRANJEIRO SCHULZ',''];PRODUCTS.filter(p=>cart[p.id]).forEach(p=>lines.push(`${cart[p.id]}x ${p.name} — ${money(p.price*cart[p.id])}`));lines.push('',`Subtotal demonstrativo: ${money(total())}`);return lines.join('\n')}
  $('#open-checkout').addEventListener('click',()=>{$('#checkout-preview').textContent=checkoutText();$('#checkout-dialog').showModal()});
  $('#finalize-order').addEventListener('click',async()=>{const name=$('#customer-name').value.trim();const phone=$('#customer-phone').value.trim();if(!name||phone.replace(/\D/g,'').length<10){toast('Informe nome e WhatsApp para continuar.');return}const text=`${checkoutText()}\n\nCliente: ${name}\nWhatsApp: ${phone}\nRecebimento: ${$('#customer-delivery').value}\nEndereço: ${$('#customer-address').value||'Não informado'}\nPagamento: ${$('#customer-payment').value}\nObservações: ${$('#customer-notes').value||'Nenhuma'}\n\nPRÉVIA DEMONSTRATIVA — dados sujeitos à aprovação.`;try{await navigator.clipboard.writeText(text);toast('Pedido demonstrativo copiado.');$('#checkout-dialog').close()}catch{toast('Não foi possível copiar automaticamente.')}});
  $('#clear-cart').addEventListener('click',()=>{cart={};save();renderAll();toast('Carrinho limpo')});
  $('#delivery-action').addEventListener('click',()=>toast('Entrega será definida pela HS.'));

  $('#home-search').addEventListener('input',e=>{query=e.target.value;$('#catalog-search').value=query;route('products')});
  $('#catalog-search').addEventListener('input',e=>{query=e.target.value;renderCatalog()});
  $$('.category-orb').forEach(b=>b.addEventListener('click',()=>{category=b.dataset.category;route('products')}));
  $('#about-demo').addEventListener('click',()=>toast('Esta versão usa dados demonstrativos até a aprovação oficial.'));

  window.addEventListener('beforeinstallprompt',e=>{e.preventDefault();deferredPrompt=e});
  function isIOS(){return /iphone|ipad|ipod/i.test(navigator.userAgent)}
  function isStandalone(){return matchMedia('(display-mode: standalone)').matches||navigator.standalone===true}
  function openInstall(){if(isStandalone()){toast('O app já está instalado neste dispositivo.');return}const copy=$('#install-copy');copy.textContent=isIOS()?'No iPhone: toque em Compartilhar e depois em “Adicionar à Tela de Início”.':'Tenha acesso rápido ao catálogo e aos seus pedidos direto pela tela inicial.';$('#install-confirm').hidden=isIOS();$('#install-dialog').showModal()}
  ['#install-side','#install-header','#install-more'].forEach(id=>$(id).addEventListener('click',openInstall));
  $$('.install-close').forEach(b=>b.addEventListener('click',()=>$('#install-dialog').close()));
  $('#install-confirm').addEventListener('click',async()=>{if(deferredPrompt){deferredPrompt.prompt();await deferredPrompt.userChoice;deferredPrompt=null;$('#install-dialog').close()}else{toast('Use o menu do navegador e escolha “Instalar app”.')}});

  if('serviceWorker' in navigator && location.protocol!=='file:') window.addEventListener('load',()=>navigator.serviceWorker.register('./sw.js').catch(()=>{}));
  renderAll();
})();
