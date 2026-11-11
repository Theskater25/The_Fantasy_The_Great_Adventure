const CACHE_NAME = "the-fantasy-v26-shell-20261111-layout-r2";
const APP_SHELL = [
  "./",
  "./index.html",
  "./css/style.css",
  "./css/mobile.css",
  "./css/pixel.css",
  "./css/scenery.css",
  "./css/fusion.css",
  "./js/scenery.js",
  "./assets/backgrounds/arena-village.svg",
  "./assets/backgrounds/arena-dungeon.svg",
  "./assets/backgrounds/arena-fjord.svg",
  "./assets/scenery/forest-village.png",
  "./assets/scenery/ruins-north.png",
  "./assets/enemies/sprites/zombie.png",
  "./assets/enemies/sprites/skeleton.png",
  "./assets/enemies/sprites/raiders.png",
  "./assets/enemies/sprites/goblin.png",
  "./assets/enemies/sprites/rat.png",
  "./assets/enemies/sprites/jack-chistophe.png",
  "./assets/enemies/sprites/yhorm.png",
  "./assets/enemies/sprites/lothric-lorian.png",
  "./assets/enemies/sprites/ilyan.png",
  "./assets/enemies/sprites/roi-sans-nom.png",
  "./assets/enemies/sprites/gardien-des-cendres.png",
  "./assets/enemies/sprites/reine-des-mirages.png",
  "./assets/enemies/sprites/forgeron-infernal.png",
  "./assets/enemies/sprites/prince-des-abysses.png",
  "./assets/enemies/sprites/azharkan.png",
  "./assets/enemies/sprites/skadi.png",
  "./assets/enemies/sprites/jarl-hrafn.png",
  "./assets/enemies/sprites/nidhoggr.png",
  "./assets/enemies/sprites/fenrir.png",
  "./assets/enemies/sprites/eivor.png",
  "./js/story-data.js",
  "./js/translations.js",
  "./translations/catalog.js",
  "./js/expansion-v23.js",
  "./js/trophies.js",
  "./manifest.webmanifest",
  "./assets/app-icon.svg",
  "./assets/icons/icon-192.png",
  "./assets/icons/icon-512.png",
  "./js/app.js",
];

self.addEventListener("install", (event) => {
  // A new release must not reinstall stale scripts from the HTTP cache.
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL.map((url) => new Request(url, { cache: "reload" })))).then(() => self.skipWaiting()));
});

self.addEventListener("activate", (event) => {
  event.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter((key) => key.startsWith("the-fantasy-v26-") && key !== CACHE_NAME).map((key) => caches.delete(key)))).then(() => self.clients.claim()));
});

async function matchOwnCache(request) {
  const cache = await caches.open(CACHE_NAME);
  return cache.match(request);
}

self.addEventListener("fetch", (event) => {
  const request = event.request;
  if (request.method !== "GET" || new URL(request.url).origin !== self.location.origin || /\.mp3(?:$|\?)/i.test(request.url)) return;

  if (request.mode === "navigate") {
    event.respondWith(fetch(request).then((response) => {
      if (response.ok) caches.open(CACHE_NAME).then((cache) => cache.put("./index.html", response.clone()));
      return response;
    }).catch(async () => (await matchOwnCache(request)) || (await matchOwnCache("./index.html"))));
    return;
  }

  const cacheKey = new URL(request.url);
  cacheKey.search = "";
  event.respondWith(matchOwnCache(request).then((cached) => cached || matchOwnCache(cacheKey.href)).then((cached) => cached || fetch(request).then((response) => {
    if (response.ok) caches.open(CACHE_NAME).then((cache) => cache.put(cacheKey.href, response.clone()));
    return response;
  })));
});
