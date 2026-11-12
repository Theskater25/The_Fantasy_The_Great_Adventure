# The Fantasy — Version 2.7

Version locale indépendante de la 2.6, avec les nouvelles ressources fournies le 12 novembre 2026.

Ouvrir [Jouer.html](Jouer.html) pour jouer directement, ou lancer `node tools/qa/serve.cjs` puis ouvrir http://localhost:8123.

- 20 classes illustrées dans la sélection, la fiche du héros et le bandeau mobile.
- 15 boss et 5 ennemis conservés.
- 5 nouvelles planches de 9 éléments : armes, équipements, objets d’aventure, forge et village.
- 14 fonds sélectionnés pour l’accueil, les chapitres, l’exploration et les combats.
- Sauvegardes, paramètres et trophées propres à la 2.7 ; aucune écriture dans les clés de la 2.6.

## Organisation

- `game/` : fichiers du jeu, avec `js/`, `css/`, `assets/` et `audio/`.
- `docs/` : provenance, licences et rapport d’intégration.
- `tools/qa/` : serveur et contrôles.
- `tools/deploy/` : préparation du site avec `node tools/deploy/build-site.mjs`.
- `tests/results/v2.7/` : rapports et captures.
- `dist/` : copie autonome du site préparée pour une future publication.

Cette version est préparée localement. Le dépôt GitHub et le site public restent sur la 2.6.

## Ressources

Voir [les crédits et la provenance](docs/RESSOURCES_2.7.md) et [le rapport](docs/RAPPORT_2.7.md).
