# Vérification mobile — Version 2.3 — 11 novembre 2026

La copie locale est maintenant organisée autour de la scène et des actions. La fiche du héros et les systèmes secondaires s'ouvrent à la demande. Le style bleu nuit et or est conservé.

## Parcours contrôlé

Le test utilise un profil neuf séparé, un nom de héros long et les commandes réelles du jeu. La sauvegarde de campagne déjà présente dans le navigateur utilisateur n'est pas remplacée.

- Écran titre, réglages, chapitres et création d'un Chevalier.
- Lecture d'une scène longue, dépliage des conséquences, choix Non : une seule étape avancée.
- Menu, fiche du héros, inventaire vide, trois voies de compétences et historique.
- Premier boss au nom très long; actions et intention visibles dans les cinq formats téléphone.
- Utilisation du Bouclier divin, attaque, passage en phase II, potion et victoire.
- Achat de Cotte runique, décompte du point et désactivation du nœud appris.
- Butin équipable : déséquiper puis rééquiper.
- Retour à la présentation de bureau, puis retour mobile.
- Fermeture par Échap et retour du focus au Menu.
- Trophées en 320 px; scène et arbre en allemand, y compris mots longs.

Les **22 contrôles automatiques ont réussi**, sans erreur JavaScript. Les captures de scène, boss, arbre, sac, réglages, trophées et bureau ont été inspectées visuellement. Les formats 320 × 568, 390 × 844, 430 × 932, 667 × 375, 844 × 390 et 1280 × 800 ont été contrôlés. Sur les petits écrans, les contenus longs défilent; les actions de jeu restent dans leur propre zone.

## Captures

- [Scène en portrait](../../tests/results/v2.3/mobile-v23-scene.png)
- [Boss en 390 px](../../tests/results/v2.3/mobile-v23-boss-390.png)
- [Boss en 320 px](../../tests/results/v2.3/mobile-v23-boss-320.png)
- [Combat en paysage](../../tests/results/v2.3/mobile-v23-boss-844.png)
- [Arbre mobile](../../tests/results/v2.3/mobile-v23-skills.png)
- [Inventaire](../../tests/results/v2.3/mobile-v23-inventory.png)
- [Réglages](../../tests/results/v2.3/mobile-v23-settings.png)
- [Retour bureau](../../tests/results/v2.3/mobile-v23-desktop.png)
- [Résultats structurés](../../tests/results/v2.3/mobile-v23-checks.json)

## Portée

Contrôles exécutés dans Chromium, complétés par une inspection initiale dans le navigateur intégré. Aucun test sur un iPhone ou Android physique : Safari, le clavier virtuel, les barres du navigateur, l'installation depuis l'écran d'accueil et les encoches réelles doivent encore être vérifiés. Cette passe n'est pas un nouveau parcours complet des trois chapitres et ne modifie pas leur équilibrage.

Les tests de trophées, progression et récompense de quête passent également. Aucun envoi sur GitHub.

Le cache PWA a aussi été vérifié dans un contexte séparé avec les service workers actifs : `mobile.css` est présent dans le cache `the-fantasy-v23-shell-20261111-mobile-r3`. Après coupure réseau simulée, le jeu a été rechargé, un héros créé et une scène avancée avec la nouvelle mise en page. La musique était désactivée pour ce contrôle. Les nouveaux libellés sont présents dans les six langues. Résultat dans `qa-screenshots/mobile-v23-cache-check.json`.
