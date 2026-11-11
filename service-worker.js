/* FOLCLORIA — service worker (offline)
   Al cambiar cualquier archivo, subir el número de VERSION para que
   los visitantes reciban la actualización. */
const VERSION = 'v1';
const CACHE = 'folcloria-' + VERSION;

const CORE = [
  './', './index.html', './style.css', './script.js', './manifest.webmanifest'
];

/* Imágenes de la marca: se guardan si existen (las que falten no rompen la instalación) */
const ASSETS = [
  'assets/logo.png', 'assets/mascota.png', 'assets/mapa.png',
  'assets/iara.png', 'assets/saci.png', 'assets/boto.png', 'assets/curupira.png',
  'assets/icon-180.png', 'assets/icon-192.png', 'assets/icon-512.png', 'assets/icon-512-maskable.png'
];

self.addEventListener('install', event => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE);
    await cache.addAll(CORE);
    await Promise.all(ASSETS.map(url => cache.add(url).catch(() => {})));
    await self.skipWaiting();
  })());
});

self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter(k => k.startsWith('folcloria-') && k !== CACHE).map(k => caches.delete(k)));
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== location.origin) return;

  /* Navegación: red primero, si falla usa la versión guardada */
  if (req.mode === 'navigate') {
    event.respondWith(
      fetch(req).then(res => {
        const copy = res.clone();
        caches.open(CACHE).then(c => c.put('./index.html', copy));
        return res;
      }).catch(() => caches.match('./index.html'))
    );
    return;
  }

  /* Resto: caché primero, y se actualiza en segundo plano */
  event.respondWith(
    caches.match(req).then(cached => {
      const net = fetch(req).then(res => {
        if (res && res.ok) { const copy = res.clone(); caches.open(CACHE).then(c => c.put(req, copy)); }
        return res;
      }).catch(() => cached);
      return cached || net;
    })
  );
});