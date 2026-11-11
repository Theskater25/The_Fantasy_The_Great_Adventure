# Rangement et publication de la version 2.6

Le dépôt distingue maintenant le jeu (`game/`), la documentation (`docs/`), les outils (`tools/`), les résultats de vérification (`tests/results/`) et les anciens éléments (`archive/`). Les sous-dossiers séparent notamment JavaScript, CSS, images, sons, guides, rapports et captures par version.

## Déploiement

Le premier workflow avait envoyé une archive complète du dépôt. L'étape de publication n'a ensuite trouvé aucune archive ; après relance, elle en a trouvé deux avec le même nom. Ces erreurs sont visibles dans [le workflow initial](https://github.com/Theskater25/The_Fantasy_The_Great_Adventure/actions/runs/43100257480). Elles ne démontrent pas un problème dû au nombre de fichiers du jeu.

Le workflow actuel assemble seulement les ressources de `game/` dans `dist/` : **55 fichiers, 23 638 351 octets** lors du contrôle. Les rapports, captures, anciens portraits, outils et sources JSON des traductions sont exclus. Les URL du jeu restent à la racine du site GitHub Pages.

La préparation et le déploiement s'exécutent dans deux jobs. Une archive reçoit un nom propre au workflow et à la tentative ; le job de déploiement reprend ce nom depuis les sorties du job précédent. Un contrôle attend sa disponibilité dans l'API avant publication. Cette organisation suit les paramètres et le découpage documentés par [deploy-pages](https://github.com/actions/deploy-pages) et [upload-pages-artifact](https://github.com/actions/upload-pages-artifact).

## Vérifications avant envoi

- Références HTML, CSS, icônes et cache PWA contrôlées lors de la construction.
- Règles des trophées, progression et récompense de quête : réussite.
- Traductions : aucun champ narratif manquant dans les cinq langues traduites.
- Test du dossier `dist/` : 60 rendus de personnages, 21 compositions de décor et 100 correspondances de noms traduits.
- Parcours bureau/mobile : 22 contrôles réussis, dont combat, phase II, potion, talents et inventaire.
- Transitions de campagne, reprise de sauvegarde, affichage hors ligne et ouverture par fichier local : réussite.
- Aucun fichier PNG ou MP3 modifié par le rangement ; les changements de code portent sur les chemins et le cache.

Les résultats navigateur sont dans [tests/results/v2.6](../../tests/results/v2.6/). Les tailles mobiles sont simulées dans Chrome ; ces contrôles ne remplacent pas une vérification sur téléphone physique.
