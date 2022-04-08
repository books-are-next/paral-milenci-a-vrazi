/* eslint-disable no-restricted-globals */

/* global self, caches, fetch */

const CACHE = 'cache-77d7265';

self.addEventListener('install', e => {
  e.waitUntil(precache()).then(() => self.skipWaiting());
});

self.addEventListener('activate', event => {
  self.clients
    .matchAll({
      includeUncontrolled: true,
    })
    .then(clientList => {
      const urls = clientList.map(client => client.url);
      console.log('[ServiceWorker] Matching clients:', urls.join(', '));
    });

  event.waitUntil(
    caches
      .keys()
      .then(cacheNames =>
        Promise.all(
          cacheNames.map(cacheName => {
            if (cacheName !== CACHE) {
              console.log('[ServiceWorker] Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
            return null;
          })
        )
      )
      .then(() => {
        console.log('[ServiceWorker] Claiming clients for version', CACHE);
        return self.clients.claim();
      })
  );
});

function precache() {
  return caches.open(CACHE).then(cache => cache.addAll(["./","./colophon.html","./favicon.png","./index.html","./manifest.json","./milenci_a_vrazi_002.html","./milenci_a_vrazi_005.html","./milenci_a_vrazi_006.html","./milenci_a_vrazi_007.html","./milenci_a_vrazi_008.html","./milenci_a_vrazi_009.html","./milenci_a_vrazi_010.html","./milenci_a_vrazi_011.html","./milenci_a_vrazi_012.html","./milenci_a_vrazi_013.html","./milenci_a_vrazi_014.html","./milenci_a_vrazi_015.html","./milenci_a_vrazi_016.html","./milenci_a_vrazi_017.html","./milenci_a_vrazi_018.html","./milenci_a_vrazi_019.html","./milenci_a_vrazi_020.html","./milenci_a_vrazi_021.html","./milenci_a_vrazi_022.html","./milenci_a_vrazi_023.html","./milenci_a_vrazi_024.html","./milenci_a_vrazi_025.html","./milenci_a_vrazi_026.html","./milenci_a_vrazi_027.html","./milenci_a_vrazi_028.html","./milenci_a_vrazi_029.html","./milenci_a_vrazi_030.html","./milenci_a_vrazi_031.html","./milenci_a_vrazi_032.html","./milenci_a_vrazi_033.html","./milenci_a_vrazi_034.html","./milenci_a_vrazi_035.html","./milenci_a_vrazi_036.html","./milenci_a_vrazi_037.html","./milenci_a_vrazi_038.html","./milenci_a_vrazi_039.html","./milenci_a_vrazi_040.html","./fonts/Literata-Italic-var.woff2","./fonts/Literata-var.woff2","./fonts/LiterataTT-TextItalic.woff2","./fonts/LiterataTT-TextRegular.woff2","./fonts/LiterataTT_LICENSE.txt","./fonts/LiterataTT-TextSemibold.woff2","./fonts/SpaceGroteskVF.woff2","./fonts/SpaceGroteskVF_LICENSE.txt","./resources/image001_fmt.png","./resources/image002_fmt.png","./resources/obalka_milenci_a_vrazi_fmt.png","./resources/upoutavka_eknihy_fmt.png","./scripts/bundle.js","./style/style.min.css","./template-images/circles.png"]));
}

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.open(CACHE).then(cache => {
      return cache.match(e.request).then(matching => {
        if (matching) {
          console.log('[ServiceWorker] Serving file from cache.');
          console.log(e.request);
          return matching;
        }

        return fetch(e.request);
      });
    })
  );
});
