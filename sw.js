const CACHE_NAME = 'ptmeasures-cache-v1';
const urlsToCache = [
    'index.html',
    'manifest.json',
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css',
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js',
    'https://fonts.googleapis.com/css2?family=Lato:wght@400;700&display=swap',
    'https://fonts.gstatic.com',
    'forms/BergScale.html',
    'forms/Tinetti.html',
    'forms/DGI.html',
    'forms/FGA.html',
    'forms/FSS-ICU.html',
    'forms/Barthel Index.html',
    'forms/FIM.html',
    'forms/MiniBEST.html',
    'scales/RASS.html',
    'scales/Pulses and edema.html',
    'OnePagers/Dizzy1pg.pdf'
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                if (response) {
                    return response;
                }
                return fetch(event.request);
            })
    );
});

self.addEventListener('activate', event => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});
