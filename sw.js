const CACHE='hs-v10-shell';
const ASSETS=[
  './','./index.html','./assets/css/app.css','./assets/js/app.js','./manifest.webmanifest',
  './assets/images/hs-logo-oficial.png','./assets/images/hs-icon-circular.png',
  './assets/images/abobora-jacare-fatias-assar-500g.webp',
  './assets/images/abobora-japonesa-sem-casca-cubos-500g.webp',
  './assets/images/abobrinha-laminas-lasanha-500g.webp',
  './assets/images/abobrinha-em-rodelas-500g.webp',
  './assets/images/abobrinha-rodelas-500g.webp',
  './assets/images/abobrinha-meia-lua-500g.webp',
  './assets/images/abobrinha-picada-500g.webp',
  './assets/images/aipim-cortado-congelado-500g.webp',
  './assets/images/kit-sopa-inhame-chines-chuchu-batata-cenoura-500g.webp',
  './assets/images/quiabo-fatiado-500g.webp',
  './assets/images/salada-de-frutas.svg'
];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;e.respondWith(fetch(e.request).then(r=>{const copy=r.clone();caches.open(CACHE).then(c=>c.put(e.request,copy));return r}).catch(()=>caches.match(e.request).then(r=>r||caches.match('./index.html'))))});
