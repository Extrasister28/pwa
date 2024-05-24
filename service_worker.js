// キャッシュ名、どこまでキャッシュするか。
var CACHE_NAME = 'extra';
var urlsToCache = [
    'styles.css',
    'randcustom.css',
    'mk8dxrandcoursescript.js',
    'mk8dxrandcustomscript.js'
];

// インストール処理
self.addEventListener('install', function(event) {
    event.waitUntil(
        caches
            .open(CACHE_NAME)
            .then(function(cache) {
                return cache.addAll(urlsToCache);
            })
    );
});

// リソースフェッチ時のキャッシュロード処理
self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches
            .match(event.request)
            .then(function(response) {
                return response || fetch(event.request);
            })
    );
});
