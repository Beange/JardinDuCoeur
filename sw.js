const CACHE_PREFIX = 'jardin-du-coeur-v';
const CACHE = 'jardin-du-coeur-v268';
const CORE = ['./','./index.html','./manifest.webmanifest','./app.css','./app.js','./icons-ui.js','./icons/icon-192.png','./icons/icon-512.png','./icons/icon-maskable-512.png','./assets/daily/daily-01.jpg','./assets/daily/daily-02.jpg','./assets/daily/daily-03.jpg','./assets/daily/daily-04.jpg','./assets/daily/daily-05.jpg','./assets/daily/daily-06.jpg','./assets/daily/daily-07.jpg','./assets/daily/daily-08.jpg','./assets/daily/daily-09.jpg','./assets/daily/daily-10.jpg','./assets/daily/daily-11.jpg','./assets/daily/daily-12.jpg','./assets/daily/daily-13.jpg','./assets/daily/daily-14.jpg','./assets/daily/daily-15.jpg','./assets/daily/daily-16.jpg','./assets/daily/daily-17.jpg','./assets/daily/daily-18.jpg','./assets/daily/daily-19.jpg','./assets/daily/daily-20.jpg'];

self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(CORE)));
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(key => key.startsWith(CACHE_PREFIX) && key !== CACHE).map(key => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('message', event => {
  if(event.data && event.data.type === 'SKIP_WAITING') self.skipWaiting();
});

self.addEventListener('fetch', event => {
  const request = event.request;
  if(request.method !== 'GET') return;
  const url = new URL(request.url);
  if(url.origin !== self.location.origin) return;

  if(request.mode === 'navigate'){
    event.respondWith(
      fetch(request)
        .then(response => {
          if(response.ok){
            const copy = response.clone();
            caches.open(CACHE).then(cache => cache.put('./index.html', copy)).catch(() => {});
          }
          return response;
        })
        .catch(() => caches.match('./index.html').then(cached => cached || caches.match('./')))
    );
    return;
  }

  event.respondWith(
    caches.match(request).then(cached => {
      const network = fetch(request).then(response => {
        if(response.ok){
          const copy = response.clone();
          caches.open(CACHE).then(cache => cache.put(request, copy)).catch(() => {});
        }
        return response;
      }).catch(() => cached);
      return cached || network;
    })
  );
});
