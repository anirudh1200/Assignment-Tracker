console.log("CONNECTED SUCCESSFULLY SERVICE WORKER");

var cacheName = 'v1';

var cacheFiles = [
    './index.html',
    ''
]

self.addEventListener('install', (e) => {
    console.log("{SW} installed");
    e.waitUntil(
        caches.open(cacheName).then((cache) => {
            return cache.addAll(cacheFiles);
        })
    )
});

self.addEventListener('activate', (e) => {
    console.log("{SW} activate");
    e.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(cacheNames.map((thisCacheName) => {
                if(thisCacheName !== cacheName){
                    return caches.delete(thisCacheName);
                }
            }))
        })
    )
});

self.addEventListener('fetch', (e)  => {

})
