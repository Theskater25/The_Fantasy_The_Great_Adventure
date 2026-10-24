const CACHE_NAME = "the-fantasy-v22-shell-20261024";
const APP_SHELL = [
  "./",
  "./index.html",
  "./style.css",
  "./story-data.js",
  "./translations.js",
  "./translations/catalog.js",
  "./manifest.webmanifest",
  "./assets/app-icon.svg",
  "./assets/icons/icon-192.png",
  "./assets/icons/icon-512.png",
  "./assets/enemies/goblin.svg",
  "./assets/enemies/goblin-v2.svg",
  "./assets/enemies/goblin-v3.svg",
  "./assets/enemies/ilyan.svg",
  "./assets/enemies/ilyan-v2.svg",
  "./assets/enemies/ilyan-v3.svg",
  "./assets/enemies/jack-chistophe.svg",
  "./assets/enemies/jack-chistophe-v2.svg",
  "./assets/enemies/jack-chistophe-v3.svg",
  "./assets/enemies/lothric.svg",
  "./assets/enemies/lothric-v2.svg",
  "./assets/enemies/lothric-v3.svg",
  "./assets/enemies/raider.svg",
  "./assets/enemies/raider-v2.svg",
  "./assets/enemies/raider-v3.svg",
  "./assets/enemies/rat.svg",
  "./assets/enemies/rat-v2.svg",
  "./assets/enemies/rat-v3.svg",
  "./assets/enemies/roi-sans-nom.svg",
  "./assets/enemies/roi-sans-nom-v2.svg",
  "./assets/enemies/roi-sans-nom-v3.svg",
  "./assets/enemies/skeleton.svg",
  "./assets/enemies/skeleton-v2.svg",
  "./assets/enemies/skeleton-v3.svg",
  "./assets/enemies/yhorm.svg",
  "./assets/enemies/yhorm-v2.svg",
  "./assets/enemies/yhorm-v3.svg",
  "./assets/enemies/zombie.svg",
  "./assets/enemies/zombie-v2.svg",
  "./assets/enemies/zombie-v3.svg",
  "./app.js",
];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", (event) => {
  event.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter((key) => key.startsWith("the-fantasy-v22-") && key !== CACHE_NAME).map((key) => caches.delete(key)))).then(() => self.clients.claim()));
});

self.addEventListener("fetch", (event) => {
  const request = event.request;
  if (request.method !== "GET" || new URL(request.url).origin !== self.location.origin || /\.mp3(?:$|\?)/i.test(request.url)) return;

  if (request.mode === "navigate") {
    event.respondWith(fetch(request).then((response) => {
      if (response.ok) caches.open(CACHE_NAME).then((cache) => cache.put("./index.html", response.clone()));
      return response;
    }).catch(async () => (await caches.match(request)) || (await caches.match("./index.html"))));
    return;
  }

  const cacheKey = new URL(request.url);
  cacheKey.search = "";
  event.respondWith(caches.match(request).then((cached) => cached || caches.match(cacheKey.href)).then((cached) => cached || fetch(request).then((response) => {
    if (response.ok) caches.open(CACHE_NAME).then((cache) => cache.put(cacheKey.href, response.clone()));
    return response;
  })));
});
