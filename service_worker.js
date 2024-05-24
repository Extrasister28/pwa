self.addEventListener('install', (event) => {
  console.log('インストール');
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});
