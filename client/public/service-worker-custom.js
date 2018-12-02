/*
 Copyright 2015 Google Inc. All Rights Reserved.
 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at
 http://www.apache.org/licenses/LICENSE-2.0
 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/

'use strict';

// Incrementing CACHE_VERSION will kick off the install event and force previously cached
// resources to be cached again.
const CACHE_VERSION = 6;
let CURRENT_CACHES = {
  offline: 'offline-v' + CACHE_VERSION
};
const OFFLINE_URL = 'index.html';

var cacheFiles = [
    '/',
    'index.html',
    'static/css/main.683d63be.chunk.css',
    'static/js/1.7223fc95.chunk.js',
    'static/js/main.3dbadf2c.chunk.js',
    'service-worker-custom.js',
    'manifest.json',
    'icon.png',
    'js/materialize.js',
    'MaterialIcons-Regular.woff2',
    'MaterialIcons-Regular.woff',
    'MaterialIcons-Regular.ttf',
    'css/materialize.min.css',
    'fonts.css'
]

function createCacheBustedRequest(url) {
  let request = new Request(url, {cache: 'reload'});
  // See https://fetch.spec.whatwg.org/#concept-request-mode
  // This is not yet supported in Chrome as of M48, so we need to explicitly check to see
  // if the cache: 'reload' option had any effect.
  if ('cache' in request) {
    return request;
  }

  // If {cache: 'reload'} didn't have any effect, append a cache-busting URL parameter instead.
  let bustedUrl = new URL(url, self.location.href);
  bustedUrl.search += (bustedUrl.search ? '&' : '') + 'cachebust=' + Date.now();
  return new Request(bustedUrl);
}

self.addEventListener('install', event => {
  event.waitUntil(
    // We can't use cache.add() here, since we want OFFLINE_URL to be the cache key, but
    // the actual URL we end up requesting might include a cache-busting parameter.
    fetch(createCacheBustedRequest(OFFLINE_URL)).then(function(response) {
      return caches.open(CURRENT_CACHES.offline).then(function(cache) {
        return cache.addAll(cacheFiles);
      });
    })
  );
});

self.addEventListener('activate', event => {

});

self.addEventListener('fetch', function(event) {
 event.respondWith(
   caches.match(event.request).then(function(response) {
     return response || fetch(event.request);
   })
 );
});
