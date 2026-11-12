const CACHE_NAME = "the-fantasy-v27-shell-20261112-art-r1";
const APP_SHELL = [
  "./css/art-v27.css",
  "./js/art-v27.js",
  "./assets/heroes/archer.png",
  "./assets/heroes/artificier.png",
  "./assets/heroes/assassin.png",
  "./assets/heroes/barbare.png",
  "./assets/heroes/bard.png",
  "./assets/heroes/berserker.png",
  "./assets/heroes/bouffon.png",
  "./assets/heroes/chevalier.png",
  "./assets/heroes/huskarl.png",
  "./assets/heroes/miko.png",
  "./assets/heroes/moine.png",
  "./assets/heroes/necromancien.png",
  "./assets/heroes/onmyoji.png",
  "./assets/heroes/ronin.png",
  "./assets/heroes/samurai.png",
  "./assets/heroes/seidr.png",
  "./assets/heroes/shinobi.png",
  "./assets/heroes/skald.png",
  "./assets/heroes/sorcier.png",
  "./assets/heroes/valkyrie.png",
  "./assets/atlases/adventure.png",
  "./assets/atlases/equipment.png",
  "./assets/atlases/forge.png",
  "./assets/atlases/village.png",
  "./assets/atlases/weapons.png",
  "./assets/backgrounds/v27/aurora.png",
  "./assets/backgrounds/v27/castle.png",
  "./assets/backgrounds/v27/cave.png",
  "./assets/backgrounds/v27/courtyard.png",
  "./assets/backgrounds/v27/forest.png",
  "./assets/backgrounds/v27/graveyard.png",
  "./assets/backgrounds/v27/ice-cave.png",
  "./assets/backgrounds/v27/lava.png",
  "./assets/backgrounds/v27/mist.png",
  "./assets/backgrounds/v27/moor.png",
  "./assets/backgrounds/v27/mountain.png",
  "./assets/backgrounds/v27/ruins.png",
  "./assets/backgrounds/v27/snow.png",
  "./assets/backgrounds/v27/valley.png",

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
  event.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter((key) => key.startsWith("the-fantasy-v27-") && key !== CACHE_NAME).map((key) => caches.delete(key)))).then(() => self.clients.claim()));
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
