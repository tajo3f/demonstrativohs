const CACHE='hs-v6-shell';
const ASSETS=['./','./index.html','./assets/css/app.css','./assets/js/app.js','./manifest.webmanifest','./assets/images/hs-logo-oficial.png','./assets/images/hs-icon-circular.png','./assets/images/cenoura.webp','./assets/images/abobora.webp','./assets/images/couve-flor.webp','./assets/images/vinagrete.webp','./assets/images/kit-sopao.webp'];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;e.respondWith(fetch(e.request).then(r=>{const copy=r.clone();caches.open(CACHE).then(c=>c.put(e.request,copy));return r}).catch(()=>caches.match(e.request).then(r=>r||caches.match('./index.html'))))});
