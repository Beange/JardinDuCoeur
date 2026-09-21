const CACHE_PREFIX = 'jardin-du-coeur-v';
const CACHE = 'jardin-du-coeur-v309';
const CURRENT_VERSION = Number(CACHE.slice(CACHE_PREFIX.length));

// Instantané du noyau V302 : les caches sans manifeste conservent leur propre liste.
const LEGACY_CORE_V302 = ['./','./index.html','./manifest.webmanifest','./app.css','./app.js','./dua-library.js','./cycle-listen.js','./icons-ui.js','./icons/icon-192.png','./icons/icon-512.png','./icons/icon-maskable-512.png','./assets/daily/daily-01.jpg','./assets/daily/daily-02.jpg','./assets/daily/daily-03.jpg','./assets/daily/daily-04.jpg','./assets/daily/daily-05.jpg','./assets/daily/daily-06.jpg','./assets/daily/daily-07.jpg','./assets/daily/daily-08.jpg','./assets/daily/daily-09.jpg','./assets/daily/daily-10.jpg','./assets/daily/daily-11.jpg','./assets/daily/daily-12.jpg','./assets/daily/daily-13.jpg','./assets/daily/daily-14.jpg','./assets/daily/daily-15.jpg','./assets/daily/daily-16.jpg','./assets/daily/daily-17.jpg','./assets/daily/daily-18.jpg','./assets/daily/daily-19.jpg','./assets/daily/daily-20.jpg'];
const READY_PATH = './__cache_ready__';
async function isCompleteCache(key) {
  const cache = await caches.open(key);
  const marker = await cache.match(new URL(READY_PATH, self.registration.scope).href);
  let required = LEGACY_CORE_V302;
  if (marker) {
    try {
      const manifest = await marker.json();
      if (manifest && Array.isArray(manifest.core) && manifest.core.length &&
          manifest.core.every(path => typeof path === 'string' && !path.startsWith('/') && !path.includes('..') && !path.includes('://'))) {
        required = manifest.core;
      } else if (Number(key.slice(CACHE_PREFIX.length)) >= 303) return false;
    } catch (error) {
      // Les caches V301/V302 ont un marqueur texte et le noyau V302.
      if (Number(key.slice(CACHE_PREFIX.length)) >= 303) return false;
    }
  } else if (Number(key.slice(CACHE_PREFIX.length)) >= 303) return false;
  for (const path of required) {
    if (!(await cache.match(new URL(path, self.registration.scope).href))) return false;
  }
  return true;
}
async function selectCompletePreviousCache() {
  const keys = await caches.keys();
  const eligible = keys.filter(key => key.startsWith(CACHE_PREFIX) && key !== CACHE)
    .filter(key => { const v = Number(key.slice(CACHE_PREFIX.length)); return Number.isSafeInteger(v) && v >= 0 && v < CURRENT_VERSION; })
    .sort((a,b) => Number(b.slice(CACHE_PREFIX.length)) - Number(a.slice(CACHE_PREFIX.length)));
  for (const key of eligible) if (await isCompleteCache(key)) return key;
  return undefined;
}
const CORE = ['./','./index.html','./manifest.webmanifest','./app.css','./app.js','./dua-library.js','./cycle-listen.js','./icons-ui.js','./icons/icon-192.png','./icons/icon-512.png','./icons/icon-maskable-512.png','./assets/daily/daily-01.jpg','./assets/daily/daily-02.jpg','./assets/daily/daily-03.jpg','./assets/daily/daily-04.jpg','./assets/daily/daily-05.jpg','./assets/daily/daily-06.jpg','./assets/daily/daily-07.jpg','./assets/daily/daily-08.jpg','./assets/daily/daily-09.jpg','./assets/daily/daily-10.jpg','./assets/daily/daily-11.jpg','./assets/daily/daily-12.jpg','./assets/daily/daily-13.jpg','./assets/daily/daily-14.jpg','./assets/daily/daily-15.jpg','./assets/daily/daily-16.jpg','./assets/daily/daily-17.jpg','./assets/daily/daily-18.jpg','./assets/daily/daily-19.jpg','./assets/daily/daily-20.jpg'];

self.addEventListener('install', event => {
  event.waitUntil((async () => {
    try {
      const cache = await caches.open(CACHE);
      await cache.addAll(CORE);
      // Marquer le cache complet seulement après réussite de toutes les ressources.
      await cache.put(new Request(new URL(READY_PATH, self.registration.scope)), new Response(JSON.stringify({ core: CORE }), { headers: { 'Content-Type': 'application/json' } }));
    } catch (error) {
      await caches.delete(CACHE);
      throw error;
    }
  })());
});

// Conserver le cache precedent pendant la transition : un onglet encore
// controle par l'ancien worker peut demander ses ressources apres activation.
self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const keys = (await caches.keys()).filter(key => key.startsWith(CACHE_PREFIX) && key !== CACHE);
    // Ne conserver que le cache immediatement precedent, si disponible.
    const previous = await selectCompletePreviousCache();
    await Promise.all(keys.filter(key => key !== previous).map(key => caches.delete(key)));
    await self.clients.claim();
  })());
});

self.addEventListener('message', event => {
  if(event.data && event.data.type === 'SKIP_WAITING') self.skipWaiting();
});

// Les ressources de l'application sont figées par version : aucune mise à jour
// en arrière-plan d'un fichier isolé dans un cache de version déjà installé.
self.addEventListener('fetch', event => {
  const request = event.request;
  if (request.method !== 'GET') return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;
  if (request.mode === 'navigate') {
    event.respondWith((async () => {
      // Toujours servir le shell de la version active : le HTML ne doit pas
      // charger des scripts d'une autre version pendant une mise a jour.
      const cached = await (await caches.open(CACHE)).match('./index.html');
      return cached || fetch(request);
    })());
    return;
  }
  event.respondWith((async () => {
    const cache = await caches.open(CACHE);
    const cached = await cache.match(request);
    if (cached) return cached;
    // Ne jamais melanger les fichiers du noyau de deux versions.
    const isCore = CORE.some(path => new URL(path, self.registration.scope).href === url.href);
    // Pendant la transition, une page ancienne peut encore demander une
    // ressource du cache precedent. N'utiliser ce secours qu'en cas d'echec
    // reseau, pour ne pas masquer une nouvelle ressource disponible en ligne.
    let response;
    let networkError;
    try { response = await fetch(request); }
    catch (error) { networkError = error; }
    // Ne tenter le secours que pour une erreur réseau ou une erreur serveur.
    // Ne jamais remplacer une réponse 4xx (dont 404) par un ancien fichier.
    if (response && response.status < 500) return response;
    if (isCore || !['image', 'font'].includes(request.destination)) {
      if (response) return response;
      throw networkError;
    }
    {
      const previousKey = await selectCompletePreviousCache();
      if (previousKey) {
        const previousResource = await (await caches.open(previousKey)).match(request);
        if (previousResource) return previousResource;
      }
      if (response) return response;
      throw networkError;
    }
  })());
});
