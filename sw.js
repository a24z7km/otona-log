const CACHE = "otona-log-v8";
const APP_SHELL = "./index.html";
const ASSETS = [
  "./",
  APP_SHELL,
  "./manifest.webmanifest",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js"
];

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE).then((cache) =>
      Promise.all(ASSETS.map((asset) => cache.add(asset).catch(() => null)))
    )
  );
  self.skipWaiting();
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((key) => key !== CACHE).map((key) => caches.delete(key)))
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (e) => {
  if (e.request.method !== "GET") return;

  const url = new URL(e.request.url);
  if (
    url.hostname === "accounts.google.com" ||
    url.hostname === "www.googleapis.com" ||
    url.hostname.endsWith(".googleapis.com")
  ) return;

  if (e.request.mode === "navigate") {
    e.respondWith(networkFirst(e.request, APP_SHELL));
    return;
  }

  e.respondWith(cacheFirst(e.request));
});

async function networkFirst(request, fallbackUrl) {
  const cache = await caches.open(CACHE);
  try {
    const res = await fetch(request);
    if (res && res.ok) cache.put(request, res.clone());
    return res;
  } catch (e) {
    return (await cache.match(request)) || (await cache.match(fallbackUrl));
  }
}

async function cacheFirst(request) {
  const cache = await caches.open(CACHE);
  const cached = await cache.match(request);
  if (cached) {
    refreshCache(cache, request);
    return cached;
  }

  try {
    const res = await fetch(request);
    if (res && (res.ok || res.type === "opaque")) cache.put(request, res.clone());
    return res;
  } catch (e) {
    return new Response("", { status: 504, statusText: "Offline" });
  }
}

async function refreshCache(cache, request) {
  try {
    const res = await fetch(request);
    if (res && (res.ok || res.type === "opaque")) await cache.put(request, res.clone());
  } catch (e) {
    // Offline is fine; keep serving the cached asset.
  }
}
