(() => {
  'use strict';

  const PRODUCTS = [
    {
      id: 'abobora-jacare-fatias-assar-500g',
      name: 'Abóbora jacaré em fatias para assar 500 g',
      shortName: 'Abóbora em fatias',
      category: 'processados',
      categoryLabel: 'Processados',
      price: 3.99,
      weight: '500 g',
      image: './assets/images/abobora-jacare-fatias-assar-500g.webp',
      badge: 'Fatias',
      description: 'Abóbora jacaré cortada em fatias, pronta para assar e facilitar o preparo das refeições.'
    },
    {
      id: 'abobora-japonesa-sem-casca-cubos-500g',
      name: 'Abóbora japonesa sem casca em cubos 500 g',
      shortName: 'Abóbora em cubos',
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
      shortName: 'Abobrinha para lasanha',
      category: 'processados',
      categoryLabel: 'Processados',
      price: 3.99,
      weight: '500 g',
      image: './assets/images/abobrinha-laminas-lasanha-500g.webp',
      badge: 'Lâminas',
      description: 'Abobrinha cortada em lâminas, ideal para lasanhas e outros preparos.'
    },
    {
      id: 'abobrinha-em-rodelas-500g',
      name: 'Abobrinha em rodelas 500 g',
      shortName: 'Abobrinha em rodelas',
      category: 'processados',
      categoryLabel: 'Processados',
      price: 3.99,
      weight: '500 g',
      image: './assets/images/abobrinha-em-rodelas-500g.webp',
      badge: 'Rodelas',
      description: 'Abobrinha cortada em rodelas, pronta para refogados, grelhados e acompanhamentos.'
    },
    {
      id: 'abobrinha-rodelas-500g',
      name: 'Abobrinha fatiada em rodelas 500 g',
      shortName: 'Abobrinha fatiada',
      category: 'processados',
      categoryLabel: 'Processados',
      price: 3.99,
      weight: '500 g',
      image: './assets/images/abobrinha-rodelas-500g.webp',
      badge: 'Fatiada',
      description: 'Abobrinha fatiada em rodelas, prática para diferentes receitas e acompanhamentos.'
    },
    {
      id: 'abobrinha-meia-lua-500g',
      name: 'Abobrinha em meia-lua 500 g',
      shortName: 'Abobrinha em meia-lua',
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
      shortName: 'Abobrinha picada',
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
      shortName: 'Aipim cortado',
      category: 'processados',
      categoryLabel: 'Processados',
      price: 4.99,
      weight: '500 g',
      image: './assets/images/aipim-cortado-congelado-500g.webp',
      badge: 'Congelado',
      description: 'Aipim cortado e congelado, em porção de 500 g, pronto para o preparo.'
    },
    {
      id: 'batata-doce-rosada-rodelas-500g',
      name: 'Batata-doce rosada com casca em rodelas 500 g',
      shortName: 'Batata-doce em rodelas',
      category: 'processados',
      categoryLabel: 'Processados',
      price: 7.99,
      weight: '500 g',
      image: './assets/images/batata-doce-rosada-rodelas-500g.webp',
      badge: 'Rodelas',
      description: 'Batata-doce rosada com casca, cortada em rodelas e pronta para assar ou cozinhar.'
    },
    {
      id: 'batata-inglesa-canoa-500g',
      name: 'Batata-inglesa em canoas 500 g',
      shortName: 'Batata-inglesa em canoas',
      category: 'processados',
      categoryLabel: 'Processados',
      price: 8.49,
      weight: '500 g',
      image: './assets/images/batata-inglesa-canoa-500g.webp',
      badge: 'Canoas',
      description: 'Batata-inglesa cortada em canoas, ideal para assar, fritar ou preparar na air fryer.'
    },
    {
      id: 'beterraba-cubos-pequenos-500g',
      name: 'Beterraba em cubos pequenos 500 g',
      shortName: 'Beterraba em cubos',
      category: 'processados',
      categoryLabel: 'Processados',
      price: 3.99,
      weight: '500 g',
      image: './assets/images/beterraba-cubos-pequenos-500g.webp',
      badge: 'Cubos',
      description: 'Beterraba cortada em cubos pequenos, prática para saladas, cozidos e acompanhamentos.'
    },
    {
      id: 'chuchu-paysanne-500g',
      name: 'Chuchu em corte paysanne (fatias finas e irregulares) 500 g',
      shortName: 'Chuchu corte paysanne',
      category: 'processados',
      categoryLabel: 'Processados',
      price: 2.99,
      weight: '500 g',
      image: './assets/images/chuchu-paysanne-500g.webp',
      badge: 'Paysanne',
      description: 'Chuchu em corte paysanne, com fatias finas e irregulares, pronto para o preparo.'
    },
    {
      id: 'inhame-em-cubos-500g',
      name: 'Inhame em cubos 500 g',
      shortName: 'Inhame em cubos',
      category: 'processados',
      categoryLabel: 'Processados',
      price: 8.99,
      weight: '500 g',
      image: './assets/images/inhame-em-cubos-500g.webp',
      badge: 'Cubos',
      description: 'Inhame higienizado e cortado em cubos, pronto para cozinhar com mais praticidade.'
    },
    {
      id: 'inhame-chines-em-pedacos-500g',
      name: 'Inhame-chinês em pedaços 500 g',
      shortName: 'Inhame-chinês',
      category: 'processados',
      categoryLabel: 'Processados',
      price: 7.99,
      weight: '500 g',
      image: './assets/images/inhame-chines-em-pedacos-500g.webp',
      badge: 'Pedaços',
      description: 'Inhame-chinês em pedaços, higienizado e pronto para o preparo.'
    },
    {
      id: 'milho-verde-3-espigas',
      name: 'Milho verde 3 espigas',
      shortName: 'Milho verde',
      category: 'processados',
      categoryLabel: 'Processados',
      price: 8.99,
      weight: '3 espigas',
      image: './assets/images/milho-verde-3-espigas.webp',
      badge: 'Espigas',
      description: 'Milho verde embalado com 3 espigas, pronto para cozinhar ou assar.'
    },
    {
      id: 'quiabo-fatiado-500g',
      name: 'Quiabo fatiado 500 g',
      shortName: 'Quiabo fatiado',
      category: 'processados',
      categoryLabel: 'Processados',
      price: 12.49,
      weight: '500 g',
      image: './assets/images/quiabo-fatiado-500g.webp',
      badge: 'Fatiado',
      description: 'Quiabo fatiado em porção de 500 g, higienizado e pronto para o preparo.'
    },
    {
      id: 'vagem-verde-bastonetes-500g',
      name: 'Vagem verde cortada em bastonetes 500 g',
      shortName: 'Vagem em bastonetes',
      category: 'processados',
      categoryLabel: 'Processados',
      price: 10.99,
      weight: '500 g',
      image: './assets/images/vagem-verde-bastonetes-500g.webp',
      badge: 'Bastonetes',
      description: 'Vagem verde cortada em bastonetes, pronta para saladas, refogados e acompanhamentos.'
    },
    {
      id: 'goiaba-fatiada-300g',
      name: 'Goiaba fatiada 300 g',
      shortName: 'Goiaba fatiada',
      category: 'frutas',
      categoryLabel: 'Frutas',
      price: 5.49,
      weight: '300 g',
      image: './assets/images/goiaba-fatiada-300g.webp',
      badge: 'Fatiada',
      description: 'Goiaba fresca fatiada, pronta para consumir.'
    },
    {
      id: 'melancia-cubos-250g',
      name: 'Melancia em cubos 250 g',
      shortName: 'Melancia em cubos',
      category: 'frutas',
      categoryLabel: 'Frutas',
      price: 3.99,
      weight: '250 g',
      image: './assets/images/melancia-cubos-250g.webp',
      badge: 'Cubos',
      description: 'Melancia fresca em cubos, em porção prática para o consumo.'
    },
    {
      id: 'kiwi-em-cubos-250g',
      name: 'Kiwi em cubos 250 g',
      shortName: 'Kiwi em cubos',
      category: 'frutas',
      categoryLabel: 'Frutas',
      price: 5.99,
      weight: '250 g',
      image: './assets/images/kiwi-em-cubos-250g.webp',
      badge: 'Copo',
      description: 'Kiwi fresco em cubos, pronto para consumir.'
    },
    {
      id: 'manga-em-cubos-250g',
      name: 'Manga em cubos 250 g',
      shortName: 'Manga em cubos',
      category: 'frutas',
      categoryLabel: 'Frutas',
      price: 5.49,
      weight: '250 g',
      image: './assets/images/manga-em-cubos-250g.webp',
      badge: 'Copo',
      description: 'Manga fresca em cubos, pronta para consumir.'
    },
    {
      id: 'melao-em-cubos-250g',
      name: 'Melão em cubos 250 g',
      shortName: 'Melão em cubos',
      category: 'frutas',
      categoryLabel: 'Frutas',
      price: 5.49,
      weight: '250 g',
      image: './assets/images/melao-em-cubos-250g.webp',
      badge: 'Copo',
      description: 'Melão fresco em cubos, em porção prática para o dia a dia.'
    },
    {
      id: 'mamao-em-cubos-250g',
      name: 'Mamão em cubos 250 g',
      shortName: 'Mamão em cubos',
      category: 'frutas',
      categoryLabel: 'Frutas',
      price: 5.49,
      weight: '250 g',
      image: './assets/images/mamao-em-cubos-250g.webp',
      badge: 'Copo',
      description: 'Mamão fresco em cubos, pronto para consumir.'
    },
    {
      id: 'abacaxi-em-cubos-250g',
      name: 'Abacaxi em cubos 250 g',
      shortName: 'Abacaxi em cubos',
      category: 'frutas',
      categoryLabel: 'Frutas',
      price: 5.49,
      weight: '250 g',
      image: './assets/images/abacaxi-em-cubos-250g.webp',
      badge: 'Copo',
      description: 'Abacaxi fresco em cubos, pronto para consumir.'
    },
    {
      id: 'laranja-descascada-500g',
      name: 'Laranja descascada 500 g',
      shortName: 'Laranja descascada',
      category: 'frutas',
      categoryLabel: 'Frutas',
      price: 5.99,
      weight: '500 g',
      image: './assets/images/laranja-descascada-500g.webp',
      badge: 'Descascada',
      description: 'Laranja descascada e pronta para consumo ou preparo de sucos.'
    },
    {
      id: 'salada-de-frutas',
      name: 'Salada de frutas personalizada',
      shortName: 'Salada de frutas',
      category: 'frutas',
      categoryLabel: 'Frutas',
      price: null,
      weight: 'Monte do seu jeito',
      image: './assets/images/salada-de-frutas.svg',
      badge: 'Personalize',
      customizable: true,
      description: 'Monte sua salada escolhendo as frutas que deseja. A seleção ficará registrada junto ao pedido.'
    },
    {
      id: 'mix-repolho-verde-roxo-fatiado-300g',
      name: 'Mix de repolho verde e roxo fatiados 300 g',
      shortName: 'Mix de repolho',
      category: 'saladas',
      categoryLabel: 'Saladas',
      price: 6.99,
      weight: '300 g',
      image: './assets/images/mix-repolho-verde-roxo-fatiado-300g.webp',
      badge: 'Fatiado',
      description: 'Mix de repolho verde e roxo, pronto para saladas, lanches e acompanhamentos.'
    },
    {
      id: 'espaguete-de-abobrinha-e-cenoura-300g',
      name: 'Espaguete de abobrinha e cenoura 300 g',
      shortName: 'Espaguete de legumes',
      category: 'saladas',
      categoryLabel: 'Saladas',
      price: 7.99,
      weight: '300 g',
      image: './assets/images/espaguete-de-abobrinha-e-cenoura-300g.webp',
      badge: 'Julienne',
      description: 'Abobrinha e cenoura em corte fino, ideais para saladas, refogados e pratos leves.'
    },
    {
      id: 'salada-mix-especial-300g',
      name: 'Salada mix especial 300 g',
      shortName: 'Salada mix',
      category: 'saladas',
      categoryLabel: 'Saladas',
      price: 8.99,
      weight: '300 g',
      image: './assets/images/salada-mix-especial-300g.webp',
      badge: 'Pronta',
      description: 'Mix especial de folhas e vegetais fatiados, pronto para servir.'
    },
    {
      id: 'combinado-cenoura-vagem-cubos-500g',
      name: 'Combinado de cenoura e vagem em cubos pequenos 500 g',
      shortName: 'Cenoura + vagem',
      category: 'kits',
      categoryLabel: 'Kits',
      price: 8.99,
      weight: '500 g',
      image: './assets/images/combinado-cenoura-vagem-cubos-500g.webp',
      badge: 'Combinado',
      description: 'Combinado de cenoura e vagem em cubos pequenos, pronto para facilitar suas receitas.'
    },
    {
      id: 'mix-legumes-brocolis-couveflor-cenoura-500g',
      name: 'Mix de legumes com brócolis, couve-flor e cenoura 500 g',
      shortName: 'Mix de legumes',
      category: 'kits',
      categoryLabel: 'Kits',
      price: 11.99,
      weight: '500 g',
      image: './assets/images/mix-legumes-brocolis-couveflor-cenoura-500g.webp',
      badge: 'Mix',
      description: 'Mix prático de legumes selecionados, higienizados e prontos para o preparo.'
    },
    {
      id: 'mix-brocolis-couveflor-500g',
      name: 'Mix de brócolis e couve-flor 500 g',
      shortName: 'Brócolis + couve-flor',
      category: 'kits',
      categoryLabel: 'Kits',
      price: 12.49,
      weight: '500 g',
      image: './assets/images/mix-brocolis-couveflor-500g.webp',
      badge: 'Mix',
      description: 'Brócolis e couve-flor higienizados, prontos para cozinhar, gratinar ou refogar.'
    },
    {
      id: 'jardineira-de-legumes-500g',
      name: 'Jardineira de legumes 500 g',
      shortName: 'Jardineira de legumes',
      category: 'kits',
      categoryLabel: 'Kits',
      price: 9.99,
      weight: '500 g',
      image: './assets/images/jardineira-de-legumes-500g.webp',
      badge: 'Jardineira',
      description: 'Mix colorido de legumes em cubos, ideal para sopas, cozidos e acompanhamentos.'
    },
    {
      id: 'mix-oriental-legumes-500g',
      name: 'Mix oriental de legumes 500 g',
      shortName: 'Mix oriental',
      category: 'kits',
      categoryLabel: 'Kits',
      price: 12.99,
      weight: '500 g',
      image: './assets/images/mix-oriental-legumes-500g.webp',
      badge: 'Especial',
      description: 'Mix colorido de legumes selecionados, ideal para refogados, salteados e preparos especiais.'
    },
    {
      id: 'kit-refogado-500g',
      name: 'Kit Refogado: abobrinha em meia-lua, cenoura em rodelas e vagem em bastonetes 500 g',
      shortName: 'Kit Refogado',
      category: 'kits',
      categoryLabel: 'Kits',
      price: 10.49,
      weight: '500 g',
      image: './assets/images/kit-refogado-abobrinha-cenoura-vagem-500g.webp',
      badge: 'Refogado',
      description: 'Kit Refogado com abobrinha em meia-lua, cenoura em rodelas e vagem em bastonetes, higienizado e pronto para facilitar o preparo.'
    },
    {
      id: 'kit-primavera-01-500g',
      name: 'Kit Primavera 01: couve-flor, brócolis, batata-inglesa e cenoura 500 g',
      shortName: 'Kit Primavera 01',
      category: 'kits',
      categoryLabel: 'Kits',
      price: 8.99,
      weight: '500 g',
      image: './assets/images/kit-primavera-01-500g.webp',
      badge: 'Primavera',
      description: 'Kit Primavera 01 com couve-flor, brócolis, batata-inglesa e cenoura, pronto para o preparo.'
    },
    {
      id: 'kit-sopa-500g',
      name: 'Kit para sopa: inhame-chinês, chuchu, batata-inglesa e cenoura 500 g',
      shortName: 'Kit para sopa',
      category: 'kits',
      categoryLabel: 'Kits',
      price: 6.49,
      weight: '500 g',
      image: './assets/images/kit-sopa-inhame-chines-chuchu-batata-cenoura-500g.webp',
      badge: 'Sopa',
      description: 'Kit para sopa com inhame-chinês, chuchu, batata-inglesa e cenoura.'
    },
    {
      id: 'seleta-de-legumes-500g',
      name: 'Seleta de legumes 500 g',
      shortName: 'Seleta de legumes',
      category: 'kits',
      categoryLabel: 'Kits',
      price: 9.99,
      weight: '500 g',
      image: './assets/images/seleta-de-legumes-500g.webp',
      badge: 'Seleta',
      optionChoices: [
        { id: 'sem-milho', label: 'Sem milho verde em conserva', priceDelta: 0, summary: 'Sem milho verde em conserva' },
        { id: 'com-milho', label: 'Com milho verde em conserva (+80 g)', priceDelta: 3.49, summary: 'Com milho verde em conserva • 80 g' }
      ],
      description: 'Seleta prática de legumes, pronta para o preparo. Você pode pedir a versão sem milho ou com 80 g de milho verde em conserva.'
    },
    {
      id: 'mix-de-forno-700g',
      name: 'Mix de forno 700 g',
      shortName: 'Mix de forno',
      category: 'kits',
      categoryLabel: 'Kits',
      price: 14.99,
      weight: '700 g',
      image: './assets/images/mix-de-forno-700g.webp',
      badge: 'Forno',
      tip: 'A embalagem pode ir ao forno sem a tampa.',
      description: 'Mix de forno com abóbora japonesa, batata-inglesa, batata-doce, cenoura, abobrinha, couve-flor, brócolis e cebola roxa.'
    }
  ];

  const FRUIT_OPTIONS = ['Abacaxi', 'Banana', 'Kiwi', 'Laranja', 'Maçã', 'Mamão', 'Manga', 'Melão', 'Morango', 'Uva'];
  const HOME_FEATURE_IDS = [
    'kit-refogado-500g',
    'mix-de-forno-700g',
    'seleta-de-legumes-500g',
    'mix-brocolis-couveflor-500g',
    'manga-em-cubos-250g',
    'salada-mix-especial-300g',
    'espaguete-de-abobrinha-e-cenoura-300g',
    'mix-legumes-brocolis-couveflor-cenoura-500g'
  ];
  const CATEGORIES = [
    { id: 'all', label: 'Todos' },
    { id: 'processados', label: 'Processados' },
    { id: 'frutas', label: 'Frutas' },
    { id: 'saladas', label: 'Saladas' },
    { id: 'kits', label: 'Kits' }
  ];

  const CART_KEY = 'hs-cart-v1';
  const CUSTOM_KEY = 'hs-customizations-v1';
  const LEGACY_CART_KEYS = ['hs-v10-cart'];
  const LEGACY_CUSTOM_KEYS = ['hs-v10-customizations'];
  // Preencha quando a HS confirmar o número oficial de pedidos, no formato 55DDDNUMERO.
  const HS_WHATSAPP_NUMBER = '';

  let cart = {};
  let customizations = {};
  let category = 'all';
  let query = '';
  let deferredPrompt = null;
  let lastRoute = 'home';

  const $ = (q, root = document) => root.querySelector(q);
  const $$ = (q, root = document) => [...root.querySelectorAll(q)];
  const money = value => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
  const byId = id => PRODUCTS.find(product => product.id === id);
  const normalizeText = value => (value || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  const cardName = product => product.shortName || product.name.replace(/\s+\d+\s*(g|kg)$/i, '');
  const needsDetail = product => Boolean(product?.customizable || product?.optionChoices?.length);
  const getCustomization = id => (customizations[id] && typeof customizations[id] === 'object' ? customizations[id] : {});
  const selectedFruits = id => Array.isArray(getCustomization(id).fruits) ? getCustomization(id).fruits : [];
  const selectedOption = (product, id) => {
    if (!product?.optionChoices?.length) return null;
    const saved = getCustomization(id).option || product.optionChoices[0].id;
    return product.optionChoices.find(option => option.id === saved) || product.optionChoices[0];
  };
  const unitPrice = (product, id = product?.id) => {
    if (!Number.isFinite(product?.price)) return null;
    return product.price + (selectedOption(product, id)?.priceDelta || 0);
  };
  const priceLabel = (product, id = product?.id) => {
    if (!Number.isFinite(product?.price)) return 'Preço a confirmar';
    if (product?.optionChoices?.some(choice => choice.priceDelta > 0)) return `A partir de ${money(product.price)}`;
    return money(unitPrice(product, id));
  };
  const itemPriceLabel = (product, quantity = 1, id = product?.id) => {
    const unit = unitPrice(product, id);
    return Number.isFinite(unit) ? money(unit * quantity) : 'A confirmar';
  };

  function customSummary(id) {
    const product = byId(id);
    const notes = [];
    const fruits = selectedFruits(id);
    if (fruits.length) notes.push(`Frutas: ${fruits.join(', ')}`);
    const option = selectedOption(product, id);
    if (option) notes.push(option.summary || option.label);
    return notes.join(' • ');
  }

  function loadStoredObject(primaryKey, legacyKeys = []) {
    try {
      const primary = localStorage.getItem(primaryKey);
      if (primary) return JSON.parse(primary) || {};
      for (const key of legacyKeys) {
        const legacy = localStorage.getItem(key);
        if (legacy) return JSON.parse(legacy) || {};
      }
    } catch {}
    return {};
  }

  cart = loadStoredObject(CART_KEY, LEGACY_CART_KEYS);
  customizations = loadStoredObject(CUSTOM_KEY, LEGACY_CUSTOM_KEYS);
  for (const id of Object.keys(cart)) {
    if (!byId(id) || !Number.isFinite(Number(cart[id])) || cart[id] <= 0) delete cart[id];
  }

  const save = () => {
    try {
      localStorage.setItem(CART_KEY, JSON.stringify(cart));
      localStorage.setItem(CUSTOM_KEY, JSON.stringify(customizations));
    } catch {}
  };

  const count = () => Object.values(cart).reduce((sum, quantity) => sum + Number(quantity || 0), 0);
  const hasPendingPrices = () => PRODUCTS.some(product => cart[product.id] && !Number.isFinite(product.price));
  const total = () => Object.entries(cart).reduce((sum, [id, quantity]) => {
    const product = byId(id);
    const unit = unitPrice(product, id);
    return sum + (Number.isFinite(unit) ? unit * quantity : 0);
  }, 0);
  const toast = message => {
    const target = $('#toast');
    target.textContent = message;
    target.hidden = false;
    clearTimeout(toast.timer);
    toast.timer = setTimeout(() => { target.hidden = true; }, 2400);
  };
  const vibrate = () => { if (navigator.vibrate) navigator.vibrate(7); };

  function setQty(id, quantity) {
    if (quantity <= 0) {
      delete cart[id];
      delete customizations[id];
    } else {
      cart[id] = Math.min(99, quantity);
    }
    save();
    renderAll();
    vibrate();
  }

  function add(id) {
    const product = byId(id);
    if (!product) return;
    const fruits = selectedFruits(id);
    const hasStoredOption = !product.optionChoices?.length || Boolean(getCustomization(id).option);
    if ((product.customizable && !fruits.length) || (product.optionChoices?.length && !hasStoredOption)) {
      openDetail(id);
      toast('Revise as opções do produto antes de adicionar.');
      return;
    }
    setQty(id, (cart[id] || 0) + 1);
    toast(`Produto adicionado ao carrinho: ${product.name}.`);
  }

  function remove(id) {
    setQty(id, (cart[id] || 0) - 1);
  }

  function syncHomeCategoryPills() {
    $$('[data-home-category]').forEach(button => {
      button.classList.toggle('is-featured', button.dataset.homeCategory === category);
    });
  }

  function route(name) {
    const current = $('.view.active')?.dataset.view || 'home';
    if (current !== name) lastRoute = current;

    $$('.view').forEach(view => {
      const isActive = view.dataset.view === name;
      view.hidden = !isActive;
      view.classList.toggle('active', isActive);
    });
    $$('.bottom-link,.side-link').forEach(button => button.classList.toggle('active', button.dataset.route === name));
    $('#header-back').hidden = name === 'home';

    if (name === 'products') renderCatalog();
    if (name === 'cart') renderCart();

    window.scrollTo({ top: 0, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
  }

  $$('[data-route]').forEach(element => element.addEventListener('click', event => {
    event.preventDefault();
    route(element.dataset.route);
  }));
  $('#header-back').addEventListener('click', () => route(lastRoute || 'home'));

  function productMini(product) {
    const article = document.createElement('article');
    article.className = 'mini-product';
    article.tabIndex = 0;
    article.setAttribute('role', 'button');
    article.setAttribute('aria-label', `Ver ${product.name}`);
    article.innerHTML = `<div class="mini-product-media"><img src="${product.image}" alt="${product.name}" loading="lazy"><span>${product.badge}</span></div><div class="mini-product-info"><strong>${cardName(product)}</strong><small>${product.weight}</small><b>${priceLabel(product, product.id)}</b></div><button class="mini-quick-add" type="button" aria-label="${needsDetail(product) ? `Ver opções de ${product.name}` : `Adicionar ${product.name} ao carrinho`}">+</button>`;
    const open = () => openDetail(product.id);
    article.addEventListener('click', open);
    article.addEventListener('keydown', event => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        open();
      }
    });
    const quick = article.querySelector('.mini-quick-add');
    quick.addEventListener('click', event => {
      event.stopPropagation();
      needsDetail(product) ? openDetail(product.id) : add(product.id);
    });
    return article;
  }

  function renderHome() {
    const host = $('#home-products');
    const featured = HOME_FEATURE_IDS.map(byId).filter(Boolean);
    host.replaceChildren(...featured.map(catalogCard));
    syncHomeCategoryPills();
  }

  function filterProducts() {
    const search = normalizeText(query);
    return PRODUCTS.filter(product => {
      const matchesCategory = category === 'all' || product.category === category;
      const haystack = normalizeText(`${product.name} ${product.categoryLabel} ${product.shortName || ''} ${product.description || ''}`);
      const matchesQuery = haystack.includes(search);
      return matchesCategory && matchesQuery;
    });
  }

  function renderFilters() {
    const row = $('#filter-row');
    row.innerHTML = '';
    CATEGORIES.forEach(item => {
      const button = document.createElement('button');
      button.className = `filter-chip${category === item.id ? ' active' : ''}`;
      button.type = 'button';
      button.textContent = item.label;
      button.onclick = () => {
        category = item.id;
        renderFilters();
        renderCatalog();
        syncHomeCategoryPills();
      };
      row.append(button);
    });
  }

  function catalogCard(product) {
    const quantity = cart[product.id] || 0;
    const article = document.createElement('article');
    article.className = 'catalog-card';
    article.innerHTML = `<div class="catalog-image"><img src="${product.image}" alt="${product.name}" loading="lazy"><span>${product.badge}</span></div><div class="catalog-body"><h3 title="${product.name}">${cardName(product)}</h3><small>${product.weight} • ${product.categoryLabel}</small><div class="catalog-price"><strong>${priceLabel(product, product.id)}</strong><div class="action-host"></div></div></div>`;
    article.querySelector('.catalog-image').addEventListener('click', () => openDetail(product.id));
    article.querySelector('.catalog-body h3').addEventListener('click', () => openDetail(product.id));
    const host = article.querySelector('.action-host');

    if (!quantity) {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'catalog-quick-add';
      const symbol = document.createElement('span');
      symbol.className = 'catalog-quick-add-symbol';
      symbol.setAttribute('aria-hidden', 'true');
      symbol.textContent = needsDetail(product) ? '✦' : '+';
      button.append(symbol);
      button.setAttribute('aria-label', needsDetail(product) ? `Ver opções de ${product.name}` : `Adicionar ${product.name}`);
      button.onclick = () => needsDetail(product) ? openDetail(product.id) : add(product.id);
      host.append(button);
    } else {
      host.className = 'catalog-qty';
      const minus = document.createElement('button');
      minus.type = 'button';
      minus.className = 'catalog-stepper-button';
      minus.innerHTML = '<span aria-hidden="true">−</span>';
      minus.onclick = () => remove(product.id);
      const current = document.createElement('span');
      current.textContent = quantity;
      const plus = document.createElement('button');
      plus.type = 'button';
      plus.className = 'catalog-stepper-button';
      plus.innerHTML = '<span aria-hidden="true">+</span>';
      plus.onclick = () => add(product.id);
      host.append(minus, current, plus);
    }
    return article;
  }

  function renderCatalog() {
    const products = filterProducts();
    $('#product-count').textContent = products.length;
    $('#catalog-grid').replaceChildren(...products.map(catalogCard));
    $('#empty-state').hidden = !!products.length;
    renderFilters();
  }

  function cartLine(product, quantity) {
    const article = document.createElement('article');
    article.className = 'cart-line';
    const details = customSummary(product.id);
    article.innerHTML = `<img src="${product.image}" alt="${product.name}"><div class="cart-line-info"><strong>${product.name}</strong><small>${product.weight}${details ? ` • ${details}` : ''}</small><b>${itemPriceLabel(product, quantity, product.id)}</b></div><div class="cart-line-side"><button class="remove-line" aria-label="Remover ${product.name}">×</button><div class="line-stepper"><button aria-label="Diminuir">−</button><span>${quantity}</span><button aria-label="Aumentar">+</button></div>${needsDetail(product) ? '<button class="edit-custom" type="button">Editar</button>' : ''}</div>`;
    const buttons = article.querySelectorAll('button');
    buttons[0].onclick = () => setQty(product.id, 0);
    buttons[1].onclick = () => remove(product.id);
    buttons[2].onclick = () => add(product.id);
    const edit = article.querySelector('.edit-custom');
    if (edit) edit.onclick = () => openDetail(product.id);
    return article;
  }

  function renderCart() {
    const entries = PRODUCTS.filter(product => cart[product.id]).map(product => [product, cart[product.id]]);
    $('#cart-items').replaceChildren(...entries.map(([product, quantity]) => cartLine(product, quantity)));

    const empty = !entries.length;
    $('#cart-empty').hidden = !empty;
    $('#cart-summary').hidden = empty;
    $('#clear-cart').hidden = empty;

    const itemsCount = count();
    $('#cart-count-label').textContent = `${itemsCount} ${itemsCount === 1 ? 'item' : 'itens'}`;
    $('#summary-items').textContent = itemsCount;

    const pending = hasPendingPrices();
    $('#summary-subtotal').textContent = pending ? 'A confirmar' : money(total());
    $('#summary-total').textContent = pending ? 'A confirmar' : money(total());
  }

  function renderDesktopCart() {
    const entries = PRODUCTS.filter(product => cart[product.id]).map(product => [product, cart[product.id]]);
    const host = $('#desktop-cart-items');
    host.innerHTML = '';

    entries.forEach(([product, quantity]) => {
      const element = document.createElement('div');
      element.className = 'desktop-cart-line';
      const details = customSummary(product.id);
      element.innerHTML = `<img src="${product.image}" alt="${product.name}"><div class="desktop-cart-line-info"><strong>${product.name}</strong><small>${quantity}x • ${product.weight}${details ? ` • ${details}` : ''}</small></div><div class="desktop-cart-actions"><b>${itemPriceLabel(product, quantity, product.id)}</b><button class="desktop-remove" type="button" aria-label="Remover ${product.name} do carrinho"><span aria-hidden="true">×</span> Remover</button></div>`;
      element.querySelector('.desktop-remove').addEventListener('click', () => setQty(product.id, 0));
      host.append(element);
    });

    $('#desktop-cart-empty').hidden = !!entries.length;
    $('#desktop-cart-summary').hidden = !entries.length;
    $('#desktop-subtotal').textContent = hasPendingPrices() ? 'A confirmar' : money(total());
  }

  function renderCounts() {
    const itemsCount = count();
    ['#header-count', '#bottom-count', '#side-count', '#desktop-cart-count'].forEach(selector => {
      $(selector).textContent = itemsCount;
    });
  }

  function renderAll() {
    renderHome();
    renderCatalog();
    renderCart();
    renderDesktopCart();
    renderCounts();
  }

  function fruitPickerHtml(selected) {
    return `<div class="fruit-customizer"><div class="fruit-customizer-title"><strong>Monte sua salada</strong><small>Escolha as frutas que deseja incluir</small></div><div class="fruit-options">${FRUIT_OPTIONS.map(fruit => `<label class="fruit-option"><input type="checkbox" value="${fruit}" ${selected.includes(fruit) ? 'checked' : ''}><span>${fruit}</span></label>`).join('')}</div><small class="fruit-note">A disponibilidade das frutas pode variar conforme o estoque da HS.</small></div>`;
  }

  function optionPickerHtml(product, id) {
    const current = selectedOption(product, id)?.id || product.optionChoices[0].id;
    return `<div class="fruit-customizer option-customizer"><div class="fruit-customizer-title"><strong>Escolha a opção</strong><small>Selecione como deseja receber este produto</small></div><div class="option-choices">${product.optionChoices.map(option => `<label class="fruit-option option-choice"><input type="radio" name="detail-option" value="${option.id}" ${option.id === current ? 'checked' : ''}><span>${option.label}</span><b>${option.priceDelta > 0 ? `+ ${money(option.priceDelta)}` : 'Incluso'}</b></label>`).join('')}</div></div>`;
  }

  function defaultDetailTip(product) {
    if (product.tip) return product.tip;
    if (product.customizable) return 'Sua seleção de frutas será enviada junto com o pedido.';
    if (product.optionChoices?.length) return 'Você pode escolher a versão sem milho ou adicionar 80 g de milho verde em conserva.';
    return 'Produto higienizado e preparado para facilitar sua rotina.';
  }

  function openDetail(id) {
    const product = byId(id);
    if (!product) return;

    const quantity = cart[id] || 1;
    const currentFruits = selectedFruits(id);
    const detail = $('#product-detail');
    detail.innerHTML = `<button type="button" class="detail-close" aria-label="Fechar">×</button><div class="detail-image"><img src="${product.image}" alt="${product.name}"></div><div class="detail-body"><span>${product.categoryLabel.toUpperCase()}</span><h2>${product.name}</h2><small>${product.weight}</small><div class="detail-price" data-detail-price>${priceLabel(product, id)}</div><p class="detail-description">${product.description}</p>${product.optionChoices?.length ? optionPickerHtml(product, id) : ''}${product.customizable ? fruitPickerHtml(currentFruits) : ''}<div class="detail-benefits"><div><span>◒</span><b>Seleção HS</b></div><div><span>✓</span><b>Higienizado</b></div><div><span>◷</span><b>Pronto para o dia a dia</b></div></div><div class="detail-actions"><div class="detail-stepper"><button type="button" data-minus>−</button><span data-detail-qty>${quantity}</span><button type="button" data-plus>+</button></div><button type="button" class="detail-add">${needsDetail(product) ? 'Salvar e adicionar' : 'Adicionar ao carrinho'}</button></div><div class="tip-card"><strong>Informação importante</strong><br>${defaultDetailTip(product)}</div></div>`;

    let tempQuantity = quantity;
    const quantityTarget = $('[data-detail-qty]', detail);
    $('[data-minus]', detail).onclick = () => {
      tempQuantity = Math.max(1, tempQuantity - 1);
      quantityTarget.textContent = tempQuantity;
    };
    $('[data-plus]', detail).onclick = () => {
      tempQuantity += 1;
      quantityTarget.textContent = tempQuantity;
    };

    const priceTarget = $('[data-detail-price]', detail);
    const radios = $$('input[name="detail-option"]', detail);
    radios.forEach(radio => radio.addEventListener('change', () => {
      const selected = product.optionChoices.find(option => option.id === radio.value);
      if (selected) {
        priceTarget.textContent = money((Number.isFinite(product.price) ? product.price : 0) + (selected.priceDelta || 0));
      }
    }));

    $('.detail-add', detail).onclick = () => {
      const data = {};
      if (product.optionChoices?.length) {
        const selected = $('input[name="detail-option"]:checked', detail)?.value || product.optionChoices[0].id;
        data.option = selected;
      }
      if (product.customizable) {
        const fruits = $$('input[type="checkbox"]:checked', detail).map(input => input.value);
        if (!fruits.length) {
          toast('Escolha pelo menos uma fruta para continuar.');
          return;
        }
        data.fruits = fruits;
      }
      if (Object.keys(data).length) customizations[id] = data;
      else delete customizations[id];
      setQty(id, tempQuantity);
      toast(`Carrinho atualizado: ${product.name}.`);
      $('#product-dialog').close();
    };

    $('.detail-close', detail).onclick = () => $('#product-dialog').close();
    $('#product-dialog').showModal();
  }

  function checkoutText() {
    const lines = [];
    PRODUCTS.filter(product => cart[product.id]).forEach(product => {
      const quantity = cart[product.id];
      const details = customSummary(product.id);
      lines.push(`• *${quantity}x ${product.name}*`);
      lines.push(`  ${product.weight} • ${itemPriceLabel(product, quantity, product.id)}`);
      if (details) lines.push(`  ${details}`);
      lines.push('');
    });
    if (lines[lines.length - 1] === '') lines.pop();
    lines.push('');
    lines.push(hasPendingPrices() ? '*TOTAL:* A confirmar pela HS' : `*TOTAL:* ${money(total())}`);
    return lines.join('\n');
  }

  function buildWhatsAppOrder() {
    const name = $('#customer-name').value.trim();
    const phone = $('#customer-phone').value.trim();
    const deliveryMethod = $('#customer-delivery').value;
    const addressTyped = $('#customer-address').value.trim();
    const address = deliveryMethod === 'Retirada' ? 'Retirada no estabelecimento' : (addressTyped || 'A combinar');
    const payment = $('#customer-payment').value || 'A combinar';
    const notes = $('#customer-notes').value.trim() || 'Sem observações.';

    return [
      '🟢 *NOVO PEDIDO • HS HORTIGRANJEIRO*',
      '',
      '━━━━━━━━━━━━━━━━━━',
      '👤 *NOME*',
      name,
      '',
      '📱 *TELEFONE*',
      phone,
      '',
      '📍 *ENDEREÇO*',
      address,
      '',
      '💳 *FORMA DE PAGAMENTO*',
      payment,
      '',
      '📝 *OBS*',
      notes,
      '',
      '━━━━━━━━━━━━━━━━━━',
      '🛒 *PEDIDO*',
      checkoutText(),
      '━━━━━━━━━━━━━━━━━━',
      '',
      '_Pedido gerado pelo catálogo digital HS._'
    ].join('\n');
  }

  function whatsappUrl(message) {
    const number = HS_WHATSAPP_NUMBER.replace(/\D/g, '');
    const base = number ? `https://wa.me/${number}` : 'https://wa.me/';
    return `${base}?text=${encodeURIComponent(message)}`;
  }

  $('#open-checkout').addEventListener('click', () => {
    $('#checkout-preview').textContent = checkoutText().replace(/\*/g, '');
    $('#checkout-dialog').showModal();
  });

  $('#customer-phone').addEventListener('input', event => {
    const digits = event.target.value.replace(/\D/g, '').slice(0, 11);
    let formatted = digits;
    if (digits.length > 2) formatted = `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
    if (digits.length > 7) formatted = `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
    event.target.value = formatted;
  });

  $('#finalize-order').addEventListener('click', () => {
    const name = $('#customer-name').value.trim();
    const phone = $('#customer-phone').value.trim();

    if (!name || phone.replace(/\D/g, '').length < 10) {
      toast('Informe seu nome e um telefone válido para continuar.');
      return;
    }
    if (!count()) {
      toast('Adicione pelo menos um produto ao carrinho.');
      return;
    }

    const message = buildWhatsAppOrder();
    const url = whatsappUrl(message);
    const opened = window.open(url, '_blank', 'noopener,noreferrer');
    if (!opened) window.location.href = url;

    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(message).catch(() => {});
    }
    toast('Pedido preparado para envio no WhatsApp.');
    $('#checkout-dialog').close();
  });

  $('#clear-cart').addEventListener('click', () => {
    cart = {};
    customizations = {};
    save();
    renderAll();
    toast('Carrinho limpo.');
  });

  $('#delivery-action').addEventListener('click', () => {
    toast('A forma de entrega será combinada diretamente com a HS.');
  });

  $('#home-search').addEventListener('input', event => {
    query = event.target.value;
    $('#catalog-search').value = query;
    route('products');
  });

  $('#catalog-search').addEventListener('input', event => {
    query = event.target.value;
    renderCatalog();
  });

  $$('[data-home-category]').forEach(button => button.addEventListener('click', () => {
    category = button.dataset.homeCategory;
    query = '';
    $('#home-search').value = '';
    $('#catalog-search').value = '';
    syncHomeCategoryPills();
    route('products');
  }));

  $('#about-demo').addEventListener('click', () => {
    toast('Catálogo oficial da linha de produtos processados, higienizados e prontos para o preparo.');
  });

  window.addEventListener('beforeinstallprompt', event => {
    event.preventDefault();
    deferredPrompt = event;
  });

  function isIOS() {
    return /iphone|ipad|ipod/i.test(navigator.userAgent);
  }

  function isStandalone() {
    return matchMedia('(display-mode: standalone)').matches || navigator.standalone === true;
  }

  function openInstall() {
    if (isStandalone()) {
      toast('O app já está instalado neste dispositivo.');
      return;
    }
    const copy = $('#install-copy');
    copy.textContent = isIOS()
      ? 'No iPhone, toque em Compartilhar e depois em “Adicionar à Tela de Início”.'
      : 'Tenha acesso rápido ao catálogo e aos seus pedidos diretamente pela tela inicial.';
    $('#install-confirm').hidden = isIOS();
    $('#install-dialog').showModal();
  }

  ['#install-side', '#install-header', '#install-more'].forEach(selector => {
    $(selector).addEventListener('click', openInstall);
  });
  $$('.install-close').forEach(button => button.addEventListener('click', () => $('#install-dialog').close()));
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
