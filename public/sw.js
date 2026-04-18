// RecoveryLine — Minimal service worker (no-op)
// PWA install prompt and aggressive caching removed for deployment.
// This file is kept as a placeholder so old cached versions get replaced.

const CACHE_NAME = 'recoveryline-v5';

self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.map((key) => caches.delete(key)))
    )
  );
  self.clients.claim();
});

// Pass-through: all requests go to the network directly, no caching.
self.addEventListener('fetch', () => {
  // Intentionally empty — let the browser handle all requests normally.
});
