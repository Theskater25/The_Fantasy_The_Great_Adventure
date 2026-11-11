# Développer et publier la version 2.6

Le dossier `game/` est autonome. Le JavaScript s'exécute sans compilation et sans bibliothèque externe. Les scripts Node de `tools/` sont exécutés depuis la racine du dépôt et résolvent les chemins du jeu indépendamment du terminal.

## Fichiers du jeu

- `game/js/app.js` : moteur et interface ; `ENEMY_SPRITES` définit les vingt personnages.
- `game/js/story-data.js` : récit, classes, statistiques et chapitres.
- `game/js/trophies.js` : progression des trophées.
- `game/js/translations.js` et `expansion-v23.js` : textes d'interface et raccordement du catalogue ; le suffixe `v23` est historique.
- `game/js/scenery.js` : sept compositions utilisant les deux planches de `game/assets/scenery/`.
- `game/css/` : styles chargés dans l'ordre `style`, `mobile`, `pixel`, `scenery`, `fusion`.
- `game/service-worker.js` : cache hors ligne. Les chemins des scripts commencent par `js/`, ceux des styles par `css/`.

Les chemins d'images dans les scripts sont relatifs à la page `game/index.html`. Les URL dans les CSS sont relatives à `game/css/` et commencent donc par `../assets/`. Après un changement de ressources, mettre à jour les références dans le HTML et le cache PWA, ainsi que leur identifiant de version.

Les détails des mécaniques sont dans la [référence du moteur](REFERENCE_MOTEUR.md). Ce document historique utilise parfois les anciens chemins à la racine ; appliquer l'arborescence ci-dessus.

## Traductions

Modifier `game/translations/catalog.json`, puis exécuter :

```powershell
node tools/qa/build-translation-catalog.mjs
node tools/qa/check-translations.mjs
```

Le fichier généré `game/translations/catalog.js` est chargé par le navigateur. Les sources JSON de traduction ne sont pas publiées sur Pages.

## Tests navigateur

Les scripts utilisent des profils Chrome temporaires. `TF_PLAYWRIGHT_MODULE` permet de définir le chemin du module Playwright pour `check-sprite-integration.cjs` et `check-merge.cjs`. Le contrôle mobile utilise `PLAYWRIGHT_MODULE` et, au besoin, `PLAYWRIGHT_CHROMIUM_PATH`.

```powershell
node tools/qa/check-sprite-integration.cjs
```

Ce contrôle gère son propre serveur. Pour les autres, démarrer `node tools/qa/serve.cjs` dans un terminal puis :

```powershell
$env:MOBILE_QA_URL = 'http://127.0.0.1:8123/index.html'
node tools/qa/check-mobile-ui.cjs
node tools/qa/check-merge.cjs
```

Pour vérifier exactement les fichiers destinés à Pages, exécuter d'abord `node tools/deploy/build-site.mjs`, puis définir `TF_GAME_ROOT` au chemin absolu de `dist/` dans les terminaux du serveur et des contrôles navigateur. Les résultats restent dans `tests/results/v2.6/`.

## Publication

Le workflow prépare une archive depuis `dist/`, puis la déploie dans un second job. Son nom contient l'identifiant du workflow et de la tentative. Le job de déploiement reprend le nom transmis par le job de préparation, y compris lors d'une relance du seul déploiement. Il attend que cette archive soit visible dans l'API GitHub.

Le générateur vérifie les liens HTML, les URL des CSS, les icônes et les fichiers préchargés par le service worker. Il refuse un ancien fichier inattendu dans `dist/` plutôt que de publier des ressources périmées. Ce dossier est jetable et ne doit pas être commité.
