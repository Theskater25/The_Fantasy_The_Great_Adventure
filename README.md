# The Fantasy — Version 2.6

RPG narratif en trois chapitres : campagne, inventaire, talents, quêtes et trophées, avec 20 personnages et 18 accessoires en pixel art.

[Jouer en ligne](https://theskater25.github.io/The_Fantasy_The_Great_Adventure/) · [Fonctionnalités](docs/guides/JEU_2.6.md) · [Guide de développement](docs/guides/DEVELOPPEMENT.md)

## Organisation

```text
game/                 Jeu autonome
  index.html          Page de départ
  js/                 Moteur, données, trophées et décors
  css/                Interface bureau, mobile et thème pixel art
  assets/             Personnages, décors et icônes
  audio/              Musiques et effets
  translations/       Catalogues et sources des traductions
docs/
  guides/             Instructions de jeu et de développement
  plans/              Pistes d'évolution
tools/
  qa/                 Contrôles et serveur local
  deploy/             Préparation du site et aide au déploiement
tests/results/        Rapports et captures, classés par version
archive/              Anciens portraits SVG et outils historiques
.github/workflows/    Vérification et publication automatiques
```

## Jouer en local

Ouvre `game/index.html` dans un navigateur, ou lance depuis la racine du dépôt :

```powershell
node tools/qa/serve.cjs
```

Puis ouvre [le jeu local](http://localhost:8123/). Le serveur ne publie que le contenu de `game/`.

## GitHub Pages

Chaque mise à jour de `main` vérifie les règles du jeu, assemble **uniquement les ressources du site** dans `dist/`, puis publie ce dossier. `docs/`, `tests/`, `tools/`, `archive/`, les réglages locaux et les sources JSON des traductions restent hors du site.

```powershell
node tools/deploy/build-site.mjs
```

`dist/` est généré et ignoré par Git. Le contenu de `game/` est publié à la racine du site : l'adresse du jeu ne change pas. Les sauvegardes 2.6 gardent leurs clés et leur origine ; le rangement ne les réinitialise pas.

## Vérifications

```powershell
node tools/qa/check-trophies.mjs
node tools/qa/check-progression-rules.mjs
node tools/qa/check-route-reward.mjs
node tools/qa/check-translations.mjs
```

Les contrôles navigateur nécessitent Playwright et Chrome. Leur lancement et les variables de configuration sont décrits dans le [guide de développement](docs/guides/DEVELOPPEMENT.md). Les résultats actuels sont dans [tests/results/v2.6](tests/results/v2.6/).

Les traductions automatiques méritent une relecture. Les informations de provenance audio conservées figurent dans [les notes audio](docs/plans/AUDIO.md) ; le dépôt ne contient pas encore toutes les URL et conditions de licence des pistes.
