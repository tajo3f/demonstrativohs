(() => {
  'use strict';

  const PRODUCTS = [
    {
      id: 'abobora-jacare-fatias-assar-500g',
      name: 'Abóbora jacaré em fatias para assar 500 g',
      category: 'processados',
      categoryLabel: 'Processados',
      price: 3.99,
      weight: '500 g',
      image: './assets/images/abobora-jacare-fatias-assar-500g.webp',
      badge: 'Fatias',
      description: 'Abóbora jacaré em fatias, pronta para assar e facilitar o preparo.'
    },
    {
      id: 'abobora-japonesa-sem-casca-cubos-500g',
      name: 'Abóbora japonesa sem casca em cubos 500 g',
      category: 'processados',
      categoryLabel: 'Processados',
      price: 3.99,
      weight: '500 g',
      image: './assets/images/abobora-japonesa-sem-casca-cubos-500g.webp',
      badge: 'Cubos',
      description: 'Abóbora japonesa sem casca, cortada em cubos e pronta para o preparo.'
    },
    {
      id: 'abobrinha-laminas-lasanha-500g',
      name: 'Abobrinha em lâminas para lasanha 500 g',
      category: 'processados',
      categoryLabel: 'Processados',
      price: 3.99,
      weight: '500 g',
      image: './assets/images/abobrinha-laminas-lasanha-500g.webp',
      badge: 'Lâminas',
      description: 'Abobrinha preparada em lâminas para lasanha e outros preparos.'
    },
    {
      id: 'abobrinha-em-rodelas-500g',
      name: 'Abobrinha em rodelas 500 g',
      category: 'processados',
      categoryLabel: 'Processados',
      price: 3.99,
      weight: '500 g',
      image: './assets/images/abobrinha-em-rodelas-500g.webp',
      badge: 'Rodelas',
      description: 'Abobrinha em rodelas, pronta para facilitar o preparo das refeições.'
    },
    {
      id: 'abobrinha-rodelas-500g',
      name: 'Abobrinha fatiada em rodelas 500 g',
      category: 'processados',
      categoryLabel: 'Processados',
      price: 3.99,
      weight: '500 g',
      image: './assets/images/abobrinha-rodelas-500g.webp',
      badge: 'Fatiada',
      description: 'Abobrinha fatiada em rodelas para diferentes receitas e acompanhamentos.'
    },
    {
      id: 'abobrinha-meia-lua-500g',
      name: 'Abobrinha meia-lua 500 g',
      category: 'processados',
      categoryLabel: 'Processados',
      price: 3.99,
      weight: '500 g',
      image: './assets/images/abobrinha-meia-lua-500g.webp',
      badge: 'Meia-lua',
      description: 'Abobrinha cortada em meia-lua, pronta para refogados e acompanhamentos.'
    },
    {
      id: 'abobrinha-picada-500g',
      name: 'Abobrinha picada 500 g',
      category: 'processados',
      categoryLabel: 'Processados',
      price: 3.99,
      weight: '500 g',
      image: './assets/images/abobrinha-picada-500g.webp',
      badge: 'Picada',
      description: 'Abobrinha picada em cubos, pronta para o uso no dia a dia.'
    },
    {
      id: 'aipim-cortado-congelado-500g',
      name: 'Aipim cortado e congelado 500 g',
      category: 'processados',
      categoryLabel: 'Processados',
      price: 4.99,
      weight: '500 g',
      image: './assets/images/aipim-cortado-congelado-500g.webp',
      badge: 'Congelado',
      description: 'Aipim cortado e congelado, em porção de 500 g.'
    },
    {
      id: 'kit-sopa-500g',
      name: 'Kit para sopa: inhame-chinês, chuchu, batata-inglesa e cenoura 500 g',
      category: 'kits',
      categoryLabel: 'Kits',
      price: 6.49,
      weight: '500 g',
      image: './assets/images/kit-sopa-inhame-chines-chuchu-batata-cenoura-500g.webp',
      badge: 'Kit para sopa',
      description: 'Kit para sopa com inhame-chinês, chuchu, batata-inglesa e cenoura.'
    },
    {
      id: 'quiabo-fatiado-500g',
      name: 'Quiabo fatiado 500 g',
      category: 'processados',
      categoryLabel: 'Processados',
      price: 12.49,
      weight: '500 g',
      image: './assets/images/quiabo-fatiado-500g.webp',
      badge: 'Fatiado',
      description: 'Quiabo fatiado em porção de 500 g, pronto para o preparo.'
    },
    {
      id: 'salada-de-frutas',
      name: 'Salada de frutas',
      category: 'saladas',
      categoryLabel: 'Saladas',
      price: null,
      weight: 'Monte do seu jeito',
      image: './assets/images/salada-de-frutas.svg',
      badge: 'Personalize',
      customizable: true,
      description: 'Monte sua salada escolhendo as frutas que deseja. A seleção fica registrada junto ao pedido.'
    }
  ];

  // Lista inicial e facilmente editável. A HS pode ajustar conforme disponibilidade.
  const FRUIT_OPTIONS = ['Abacaxi', 'Banana', 'Maçã', 'Mamão', 'Manga', 'Melão', 'Morango', 'Uva', 'Laranja', 'Kiwi'];
  const CATEGORIES = [
    {id:'all', label:'Todos'},
    {id:'processados', label:'Processados'},
    {id:'saladas', label:'Saladas'},
    {id:'kits', label:'Kits'}
  ];

  const CART_KEY = 'hs-v10-cart';
  const CUSTOM_KEY = 'hs-v10-customizations';
  let cart = {};
  let customizations = {};
  let category = 'all';
  let query = '';
  let deferredPrompt = null;
  let lastRoute = 'home';

  const $ = (q, root=document) => root.querySelector(q);
  const $$ = (q, root=document) => [...root.querySelectorAll(q)];
  const money = v => new Intl.NumberFormat('pt-BR',{style:'currency',currency:'BRL'}).format(v);
  const byId = id => PRODUCTS.find(p => p.id === id);
  const priceLabel = p => Number.isFinite(p.price) ? money(p.price) : 'Preço a confirmar';
  const itemPriceLabel = (p, qty=1) => Number.isFinite(p.price) ? money(p.price * qty) : 'A confirmar';

  try { cart = JSON.parse(localStorage.getItem(CART_KEY) || '{}') || {}; } catch { cart = {}; }
  try { customizations = JSON.parse(localStorage.getItem(CUSTOM_KEY) || '{}') || {}; } catch { customizations = {}; }
  for (const id of Object.keys(cart)) {
    if (!byId(id) || !Number.isFinite(Number(cart[id])) || cart[id] <= 0) delete cart[id];
  }

  const save = () => {
    try {
      localStorage.setItem(CART_KEY, JSON.stringify(cart));
      localStorage.setItem(CUSTOM_KEY, JSON.stringify(customizations));
    } catch {}
  };
  const count = () => Object.values(cart).reduce((a,b) => a + Number(b || 0), 0);
  const hasPendingPrices = () => PRODUCTS.some(p => cart[p.id] && !Number.isFinite(p.price));
  const total = () => Object.entries(cart).reduce((sum,[id,qty]) => {
    const p = byId(id);
    return sum + (Number.isFinite(p?.price) ? p.price * qty : 0);
  }, 0);
  const toast = msg => {
    const t = $('#toast');
    t.textContent = msg;
    t.hidden = false;
    clearTimeout(toast.t);
    toast.t = setTimeout(() => t.hidden = true, 2200);
  };
  const vibrate = () => { if (navigator.vibrate) navigator.vibrate(7); };
  const selectedFruits = id => Array.isArray(customizations[id]?.fruits) ? customizations[id].fruits : [];
  const customSummary = id => {
    const fruits = selectedFruits(id);
    return fruits.length ? `Frutas: ${fruits.join(', ')}` : '';
  };

  function setQty(id, qty) {
    if (qty <= 0) {
      delete cart[id];
      if (byId(id)?.customizable) delete customizations[id];
    } else {
      cart[id] = Math.min(99, qty);
    }
    save();
    renderAll();
    vibrate();
  }

  function add(id) {
    const p = byId(id);
    if (p?.customizable && !selectedFruits(id).length) {
      openDetail(id);
      toast('Escolha as frutas para montar sua salada.');
      return;
    }
    setQty(id, (cart[id] || 0) + 1);
    toast(`Produto adicionado ao carrinho: ${p.name}.`);
  }

  function remove(id) { setQty(id, (cart[id] || 0) - 1); }

  function route(name) {
    const current = $('.view.active')?.dataset.view || 'home';
    if (current !== name) lastRoute = current;
    $$('.view').forEach(v => {
      const on = v.dataset.view === name;
      v.hidden = !on;
      v.classList.toggle('active', on);
    });
    $$('.bottom-link,.side-link').forEach(b => b.classList.toggle('active', b.dataset.route === name));
    $('#header-back').hidden = name === 'home';
    if (name === 'products') renderCatalog();
    if (name === 'cart') renderCart();
    window.scrollTo({top:0, behavior:matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'});
  }

  $$('[data-route]').forEach(el => el.addEventListener('click', e => {
    e.preventDefault();
    route(el.dataset.route);
  }));
  $('#header-back').addEventListener('click', () => route(lastRoute || 'home'));

  function productMini(p) {
    const art = document.createElement('article');
    art.className = 'mini-product';
    art.innerHTML = `<img src="${p.image}" alt="${p.name}"><div class="mini-product-info"><strong>${p.name}</strong><small>${p.weight} • ${p.categoryLabel}</small><b>${priceLabel(p)}</b></div><button type="button" aria-label="Adicionar ${p.name}">+</button>`;
    art.querySelector('img').addEventListener('click', () => openDetail(p.id));
    art.querySelector('button').addEventListener('click', () => add(p.id));
    return art;
  }

  function renderHome() {
    const host = $('#home-products');
    host.replaceChildren(...PRODUCTS.slice(0,3).map(productMini));
  }

  function filterProducts() {
    const q = query.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
    return PRODUCTS.filter(p => (category === 'all' || p.category === category) && `${p.name} ${p.categoryLabel}`.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().includes(q));
  }

  function renderFilters() {
    const row = $('#filter-row');
    row.innerHTML = '';
    CATEGORIES.forEach(c => {
      const b = document.createElement('button');
      b.className = `filter-chip${category === c.id ? ' active' : ''}`;
      b.type = 'button';
      b.textContent = c.label;
      b.onclick = () => { category = c.id; renderFilters(); renderCatalog(); };
      row.append(b);
    });
  }

  function catalogCard(p) {
    const q = cart[p.id] || 0;
    const art = document.createElement('article');
    art.className = 'catalog-card';
    art.innerHTML = `<div class="catalog-image"><img src="${p.image}" alt="${p.name}" loading="lazy"><span>${p.badge}</span></div><div class="catalog-body"><h3>${p.name}</h3><small>${p.weight} • ${p.categoryLabel}</small><div class="catalog-price"><strong>${priceLabel(p)}</strong><div class="action-host"></div></div></div>`;
    art.querySelector('.catalog-image').addEventListener('click', () => openDetail(p.id));
    const h = art.querySelector('.action-host');
    if (!q) {
      const b = document.createElement('button');
      b.type = 'button';
      b.textContent = p.customizable ? '✦' : '+';
      b.setAttribute('aria-label', p.customizable ? `Personalizar ${p.name}` : `Adicionar ${p.name}`);
      b.onclick = () => p.customizable ? openDetail(p.id) : add(p.id);
      h.append(b);
    } else {
      h.className = 'catalog-qty';
      const m = document.createElement('button');
      m.textContent = '−';
      m.onclick = () => remove(p.id);
      const s = document.createElement('span');
      s.textContent = q;
      const a = document.createElement('button');
      a.textContent = '+';
      a.onclick = () => add(p.id);
      h.append(m,s,a);
    }
    return art;
  }

  function renderCatalog() {
    const list = filterProducts();
    $('#product-count').textContent = list.length;
    $('#catalog-grid').replaceChildren(...list.map(catalogCard));
    $('#empty-state').hidden = !!list.length;
    renderFilters();
  }

  function cartLine(p, qty) {
    const art = document.createElement('article');
    art.className = 'cart-line';
    const details = customSummary(p.id);
    art.innerHTML = `<img src="${p.image}" alt="${p.name}"><div class="cart-line-info"><strong>${p.name}</strong><small>${p.weight}${details ? ` • ${details}` : ''}</small><b>${itemPriceLabel(p,qty)}</b></div><div class="cart-line-side"><button class="remove-line" aria-label="Remover ${p.name}">×</button><div class="line-stepper"><button aria-label="Diminuir">−</button><span>${qty}</span><button aria-label="Aumentar">+</button></div>${p.customizable ? '<button class="edit-custom" type="button">Editar frutas</button>' : ''}</div>`;
    const buttons = art.querySelectorAll('button');
    buttons[0].onclick = () => setQty(p.id,0);
    buttons[1].onclick = () => remove(p.id);
    buttons[2].onclick = () => add(p.id);
    const edit = art.querySelector('.edit-custom');
    if (edit) edit.onclick = () => openDetail(p.id);
    return art;
  }

  function renderCart() {
    const entries = PRODUCTS.filter(p => cart[p.id]).map(p => [p,cart[p.id]]);
    $('#cart-items').replaceChildren(...entries.map(([p,q]) => cartLine(p,q)));
    const empty = !entries.length;
    $('#cart-empty').hidden = !empty;
    $('#cart-summary').hidden = empty;
    $('#clear-cart').hidden = empty;
    const n = count();
    $('#cart-count-label').textContent = `${n} ${n === 1 ? 'item' : 'itens'}`;
    $('#summary-items').textContent = n;
    const pending = hasPendingPrices();
    $('#summary-subtotal').textContent = pending ? 'A confirmar' : money(total());
    $('#summary-total').textContent = pending ? 'A confirmar' : money(total());
  }

  function renderDesktopCart() {
    const entries = PRODUCTS.filter(p => cart[p.id]).map(p => [p,cart[p.id]]);
    const host = $('#desktop-cart-items');
    host.innerHTML = '';
    entries.forEach(([p,q]) => {
      const d = document.createElement('div');
      d.className = 'desktop-cart-line';
      const custom = customSummary(p.id);
      d.innerHTML = `<img src="${p.image}" alt=""><div><strong>${p.name}</strong><small>${q}x • ${p.weight}${custom ? ` • ${custom}` : ''}</small></div><b>${itemPriceLabel(p,q)}</b>`;
      host.append(d);
    });
    $('#desktop-cart-empty').hidden = !!entries.length;
    $('#desktop-cart-summary').hidden = !entries.length;
    $('#desktop-subtotal').textContent = hasPendingPrices() ? 'A confirmar' : money(total());
  }

  function renderCounts() {
    const n = count();
    ['#header-count','#bottom-count','#side-count','#desktop-cart-count'].forEach(id => $(id).textContent = n);
  }

  function renderAll() {
    renderHome();
    renderCatalog();
    renderCart();
    renderDesktopCart();
    renderCounts();
  }

  function fruitPickerHtml(selected) {
    return `<div class="fruit-customizer"><div class="fruit-customizer-title"><strong>Monte sua salada</strong><small>Escolha as frutas que deseja incluir</small></div><div class="fruit-options">${FRUIT_OPTIONS.map(f => `<label class="fruit-option"><input type="checkbox" value="${f}" ${selected.includes(f) ? 'checked' : ''}><span>${f}</span></label>`).join('')}</div><small class="fruit-note">A disponibilidade das frutas pode variar conforme o estoque da HS.</small></div>`;
  }

  function openDetail(id) {
    const p = byId(id);
    const q = cart[id] || 1;
    const currentFruits = selectedFruits(id);
    const root = $('#product-detail');
    root.innerHTML = `<button type="button" class="detail-close" aria-label="Fechar">×</button><div class="detail-image"><img src="${p.image}" alt="${p.name}"></div><div class="detail-body"><span>${p.categoryLabel.toUpperCase()}</span><h2>${p.name}</h2><small>${p.weight}</small><div class="detail-price">${priceLabel(p)}</div><p class="detail-description">${p.description}</p>${p.customizable ? fruitPickerHtml(currentFruits) : ''}<div class="detail-benefits"><div><span>◒</span><b>Seleção HS</b></div><div><span>✓</span><b>Praticidade</b></div><div><span>◷</span><b>Pronto para o dia a dia</b></div></div><div class="detail-actions"><div class="detail-stepper"><button type="button" data-minus>−</button><span data-detail-qty>${q}</span><button type="button" data-plus>+</button></div><button type="button" class="detail-add">${p.customizable ? 'Salvar e adicionar' : 'Adicionar ao carrinho'}</button></div><div class="tip-card"><strong>Informação</strong><br>${p.customizable ? 'Sua seleção de frutas será enviada junto com o pedido.' : 'Produto higienizado e preparado para facilitar sua rotina.'}</div></div>`;

    let temp = q;
    const val = $('[data-detail-qty]',root);
    $('[data-minus]',root).onclick = () => { temp = Math.max(1,temp-1); val.textContent = temp; };
    $('[data-plus]',root).onclick = () => { temp++; val.textContent = temp; };
    $('.detail-add',root).onclick = () => {
      if (p.customizable) {
        const fruits = $$('input[type="checkbox"]:checked',root).map(i => i.value);
        if (!fruits.length) {
          toast('Escolha pelo menos uma fruta.');
          return;
        }
        customizations[id] = {fruits};
      }
      setQty(id,temp);
      toast(`Carrinho atualizado: ${p.name}.`);
      $('#product-dialog').close();
    };
    $('.detail-close',root).onclick = () => $('#product-dialog').close();
    $('#product-dialog').showModal();
  }

  function checkoutText() {
    const lines = ['PEDIDO HS HORTIGRANJEIRO SCHULZ',''];
    PRODUCTS.filter(p => cart[p.id]).forEach(p => {
      const custom = customSummary(p.id);
      lines.push(`${cart[p.id]}x ${p.name} — ${itemPriceLabel(p,cart[p.id])}`);
      if (custom) lines.push(`   ${custom}`);
    });
    lines.push('');
    lines.push(hasPendingPrices() ? 'Valores: a confirmar pela HS.' : `Subtotal: ${money(total())}`);
    return lines.join('\n');
  }

  $('#open-checkout').addEventListener('click', () => {
    $('#checkout-preview').textContent = checkoutText();
    $('#checkout-dialog').showModal();
  });

  $('#finalize-order').addEventListener('click', async () => {
    const name = $('#customer-name').value.trim();
    const phone = $('#customer-phone').value.trim();
    if (!name || phone.replace(/\D/g,'').length < 10) {
      toast('Informe nome e WhatsApp para continuar.');
      return;
    }
    const text = `${checkoutText()}\n\nCliente: ${name}\nWhatsApp: ${phone}\nForma de recebimento: ${$('#customer-delivery').value}\nEndereço: ${$('#customer-address').value || 'Não informado'}\nForma de pagamento: ${$('#customer-payment').value}\nObservações: ${$('#customer-notes').value || 'Nenhuma'}\n\nPedido gerado pelo catálogo HS.`;
    try {
      await navigator.clipboard.writeText(text);
      toast('Pedido copiado com sucesso.');
      $('#checkout-dialog').close();
    } catch {
      toast('Não foi possível copiar automaticamente.');
    }
  });

  $('#clear-cart').addEventListener('click', () => {
    cart = {};
    customizations = {};
    save();
    renderAll();
    toast('Carrinho limpo.');
  });
  $('#delivery-action').addEventListener('click', () => toast('A entrega será combinada com a HS.'));

  $('#home-search').addEventListener('input', e => {
    query = e.target.value;
    $('#catalog-search').value = query;
    route('products');
  });
  $('#catalog-search').addEventListener('input', e => { query = e.target.value; renderCatalog(); });
  $$('[data-home-category]').forEach(b => b.addEventListener('click', () => {
    category = b.dataset.homeCategory;
    query = '';
    $('#catalog-search').value = '';
    route('products');
  }));
  $('#about-demo').addEventListener('click', () => toast('Catálogo da nova linha de produtos HS.'));

  window.addEventListener('beforeinstallprompt', e => { e.preventDefault(); deferredPrompt = e; });
  function isIOS() { return /iphone|ipad|ipod/i.test(navigator.userAgent); }
  function isStandalone() { return matchMedia('(display-mode: standalone)').matches || navigator.standalone === true; }
  function openInstall() {
    if (isStandalone()) { toast('O app já está instalado neste dispositivo.'); return; }
    const copy = $('#install-copy');
    copy.textContent = isIOS() ? 'No iPhone: toque em Compartilhar e depois em “Adicionar à Tela de Início”.' : 'Tenha acesso rápido ao catálogo e aos seus pedidos diretamente pela tela inicial.';
    $('#install-confirm').hidden = isIOS();
    $('#install-dialog').showModal();
  }
  ['#install-side','#install-header','#install-more'].forEach(id => $(id).addEventListener('click',openInstall));
  $$('.install-close').forEach(b => b.addEventListener('click', () => $('#install-dialog').close()));
  $('#install-confirm').addEventListener('click', async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      await deferredPrompt.userChoice;
      deferredPrompt = null;
      $('#install-dialog').close();
    } else {
      toast('Use o menu do navegador e escolha “Instalar app”.');
    }
  });

  if ('serviceWorker' in navigator && location.protocol !== 'file:') {
    window.addEventListener('load', () => navigator.serviceWorker.register('./sw.js').catch(() => {}));
  }
  renderAll();
})();
