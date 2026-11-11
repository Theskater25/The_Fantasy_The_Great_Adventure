# Fusion 2.3 + 2.4 → 2.6

La version 2.6 est une copie autonome. La 2.3 fournit le moteur RPG et la 2.4 fournit les personnages, les décors et le thème pixel art. Les deux dossiers sources restent inchangés. La fusion a d'abord été vérifiée localement ; cette copie est préparée pour la publication dans le dépôt GitHub du jeu.

Contrôle final par empreintes SHA-256 : aucun fichier modifié, ajouté ou retiré parmi les 83 fichiers de la 2.3 et les 118 fichiers de la 2.4.

## Contenu conservé

- **2.3** : trois chapitres, campagne continue, inventaire et effets des objets, arbre de talents et spécialisations, quêtes, journal, bestiaire, guide, combats tactiques, intentions ennemies, phases de boss et 48 trophées.
- **2.4** : cinq ennemis et quinze boss PNG distincts, dix-huit objets de décor, sept compositions d'arène et habillage pixel art. Les PNG et leurs manifestes sont identiques aux sources.
- Les données du récit, des classes, des statistiques et des trophées sont identiques à la 2.3, à l'exception des références d'images des boss. Les traductions et les règles de trophées restent identiques.

## Raccords réalisés

`app.js` conserve le moteur 2.3 et utilise le registre de sprites et le générateur de décors 2.4. Le rendu garde l'intention ennemie, les phases, les potions, les fenêtres d'inventaire et de talents, ainsi que le mode compact.

Les feuilles sont chargées dans cet ordre : `style.css`, `mobile.css`, `pixel.css`, `scenery.css`, `fusion.css`. La dernière adapte les arènes et les boutons à la mise en page mobile sans recouvrir les adversaires. Les textes `expansion-v23.js` gardent leur nom historique ; ils sont toujours utilisés.

Les sauvegardes, trophées et paramètres utilisent le préfixe `the-fantasy-version-2-6-`. Le nom de héros et le guide utilisent respectivement `fantasy-v26-name` et `the-fantasy-v26-guide-seen`. La 2.6 démarre avec son propre profil et ne migre pas automatiquement les anciennes parties. Le cache `the-fantasy-v26-*` contient les nouveaux styles, scripts et images ; les MP3 restent réseau uniquement.

## Vérifications réalisées

| Contrôle | Résultat |
| --- | --- |
| Trophées, progression et récompense du cartographe | Trois scripts réussis |
| Personnages | 20 images distinctes, 100 correspondances de noms traduits, 60 rendus |
| Décors | 7 ambiances × 3 formats, 18 objets utilisés |
| Parcours UI | 22 contrôles : nouvelle partie, choix, boss, phase II, potion, talent, inventaire, journal, trophées, reprise en allemand |
| Formats UI | 320 × 568, 390 × 844, 430 × 932, 667 × 375, 844 × 390, 1280 × 800 |
| Campagne | Transitions I → II → III ; héros, niveau, XP, inventaire, équipement et talents conservés |
| Sauvegarde | Rechargement en combat au chapitre III, reprise du héros et du bon sprite |
| Isolation | Anciennes clés de sauvegarde/réglages/profil laissées intactes |
| Hors ligne | Rechargement et reprise ; décodage des 20 sprites et des deux planches préchargées |
| Lancement direct | `index.html` ouvert par fichier local, nouvelle partie et sprite de boss visibles |
| Erreurs JavaScript | Aucune lors des contrôles |

Les transitions de chapitre utilisent des états de fin de chapitre préparés pour vérifier le transfert des données ; ce contrôle n'est pas une nouvelle partie complète d'équilibrage. Les tailles mobiles sont simulées dans Chrome, sans validation sur iPhone/Android physique. Les rapports de parcours et les anciennes captures de la 2.3 restent présents comme historique.

Les résultats actuels se trouvent dans `qa-screenshots/sprites-2.6-report.json`, `mobile-v26-checks.json` et `merge-2.6-report.json`. Les captures correspondantes portent les préfixes `sprites-2.6-`, `scenery-2.6-`, `mobile-v26-` et `merge-2.6-`.

## Rejouer les vérifications

Depuis le dossier 2.6, avec Node, Playwright et Chrome disponibles :

```powershell
node tools/qa/check-trophies.mjs
node tools/qa/check-progression-rules.mjs
node tools/qa/check-route-reward.mjs
node tools/qa/check-sprite-integration.cjs
```

Le contrôle des sprites démarre et ferme son propre serveur. Pour les deux autres contrôles navigateur, démarrer `node tools/qa/serve.cjs` dans un terminal, puis dans un autre :

```powershell
$env:MOBILE_QA_URL = 'http://127.0.0.1:8123/index.html'
node tools/qa/check-mobile-ui.cjs
node tools/qa/check-merge.cjs
```

Si Playwright n'est pas résolu automatiquement, définir `TF_PLAYWRIGHT_MODULE` pour les contrôles de sprites/fusion et `PLAYWRIGHT_MODULE` pour le contrôle mobile avec le chemin du module installé. `PLAYWRIGHT_CHROMIUM_PATH` permet au contrôle mobile d'utiliser Chrome installé. Les tests utilisent des profils de navigateur isolés.
