/* HS Hortigranjeiro Schulz — atualização técnica V44.1, preços V44 inalterados.
   Documento, JS e CSS priorizam a versão da rede. Somente respostas válidas
   entram no cache; arquivos ausentes não impedem a ativação do Service Worker. */
const CACHE = 'hs-catalog-v44-1-2026-11-13';
const CORE = [
  './',
  './index.html',
  './assets/css/app.css?v=44.1.0',
  './assets/js/app.js?v=44.1.0'
];

self.addEventListener('install', event => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE);
    // O ZIP de atualização pode ser parcial; nunca falhar a instalação inteira
    // quando um recurso individual não existir no servidor.
    await Promise.allSettled(CORE.map(async path => {
      const response = await fetch(path, { cache: 'no-store' });
      if (response.ok) await cache.put(path, response);
    }));
    await self.skipWaiting();
  })());
});

self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const names = await caches.keys();
    await Promise.all(names
      .filter(name => (name.startsWith('hs-final-') || name.startsWith('hs-catalog-')) && name !== CACHE)
      .map(name => caches.delete(name)));
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', event => {
  const request = event.request;
  const url = new URL(request.url);
  if (request.method !== 'GET' || url.origin !== self.location.origin) return;
  event.respondWith((async () => {
    const cache = await caches.open(CACHE);
    try {
      // Não aceitar HTML / scripts / preços antigos do HTTP cache enquanto online.
      const response = await fetch(request, { cache: 'no-store' });
      if (response.ok && response.type !== 'opaque') {
        await cache.put(request, response.clone());
      }
      return response;
    } catch (error) {
      const cached = await cache.match(request);
      if (cached) return cached;
      // Só navegação pode receber a tela principal; nunca enviar HTML como JS ou CSS.
      if (request.mode === 'navigate') {
        return (await cache.match('./index.html')) || (await cache.match('./')) || Response.error();
      }
      return Response.error();
    }
  })());
});
