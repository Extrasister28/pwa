// キャッシュファイルの指定
var CACHE_NAME = 'extra v0.2.1';
var urlsToCache = [
    './',
];

// インストール処理
self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(CACHE_NAME).then(function(cache) {
            return cache.addAll(urlsToCache);
        })
    );
});

// リソースフェッチ時のキャッシュロード処理
self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request).then(function(response) {
            return response || fetch(event.request);
        })
    );
});

// Service Worker が更新された時の処理
self.addEventListener('activate', function(event) {
    var cacheWhitelist = [CACHE_NAME]; // 有効なキャッシュ名のリスト
    
    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames.map(function(cacheName) {
                    // キャッシュ名がホワイトリストにない場合、削除する
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
    
    // 更新時にメッセージを出す
    console.log('Service Workerが更新されました');
});
