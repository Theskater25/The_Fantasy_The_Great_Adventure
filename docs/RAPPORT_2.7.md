# Intégration graphique 2.7 — 12 novembre 2026

Base : copie de la version 2.6 organisée, commit GitHub `972cb1636f194a0258f3a602b68061a6a09fb1cf`.

## Résultat

Les 20 classes disposent maintenant d’un personnage complet. Les icônes d’inventaire utilisent les planches du joueur et les combats utilisent des décors adaptés au lieu courant. Les petites scènes d’exploration montrent aussi le paysage traversé. Les nouveaux éléments de forge et de village varient avec les lieux. Les 20 illustrations d’ennemis existantes sont conservées.

Les PNG restent identiques à leurs sources. La campagne, les statistiques, l’équilibrage, les traductions et les règles de progression sont conservés.

## Validation

- 20 classes et 120 portraits localisés (6 langues).
- 14 fonds et 45 régions d’atlas contrôlés, avec revue visuelle des captures.
- 22 vérifications d’interface et de parcours mobile : cinq formats, combat, potion, compétences, inventaire, journal, langue et retour bureau.
- Transitions vers les chapitres II et III, continuité du héros et de son équipement.
- Sauvegarde et reprise ; isolation des données 2.6 et des anciennes versions.
- Hors ligne : 40 personnages, 7 planches et 14 nouveaux fonds chargés.
- Ouverture directe de `game/index.html` vérifiée.
- Règles de trophées, progression, récompense de quête et traductions validées.
- Aucune erreur JavaScript ou ressource HTTP manquante dans les parcours contrôlés.

Les rapports détaillés et les captures se trouvent dans `tests/results/v2.7/`. Le jeu préparé dans `dist/` contient uniquement les fichiers nécessaires à l’exécution.

## Conservation de la 2.6

Le dossier 2.6 et le dépôt GitHub sont conservés. La nouvelle version est locale, avec les clés `the-fantasy-version-2-7-*`, `the-fantasy-v27-guide-seen` et `fantasy-v27-name`. Aucun transfert automatique ne modifie une sauvegarde 2.6.
