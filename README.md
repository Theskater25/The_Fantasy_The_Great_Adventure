# The Fantasy — Version 2.6

Cette version fusionne le RPG de la **2.3** (campagne, inventaire, talents, quêtes, trophées et interface mobile) avec l'habillage pixel art de la **2.4** (20 personnages et 18 accessoires de décor). Les dossiers sources restent inchangés. Les sauvegardes, paramètres, trophées et le cache hors ligne de la 2.6 sont séparés.

La branche `main` contient la version 2.6. Le workflow existant publie le jeu sur GitHub Pages après chaque mise à jour de cette branche. Les réglages personnels de l'éditeur ne font pas partie du dépôt.

## Lancer le jeu

Ouvre `index.html` dans un navigateur. Pour le lancer depuis un serveur local, exécute cette commande à la racine du projet :

```powershell
python -m http.server 8765
```

Puis visite <http://127.0.0.1:8765/>.

Dans VS Code, ouvre le dossier `Version 2.6` puis lance `index.html` avec un serveur local.

Le menu d’accueil affiche « VERSION 2.6 · PIXEL RPG ». Le [rapport de fusion](RAPPORT_FUSION_2.6.md) décrit les apports des deux sources et les vérifications réalisées.

## Jouer sur téléphone

L'écran de jeu mobile affiche les PV, la scène ou le boss et les actions. Le bouton **Menu** ouvre le héros, l'inventaire, les talents et le journal. L'arbre présente une seule voie à la fois; les conséquences des choix se déplient à la demande. L'intention de l'adversaire reste à côté des commandes. En paysage court, les commandes passent à droite.

Les textes et panneaux sont adaptés aux petits écrans. Les contrôles de la 2.6 couvrent les fenêtres de 320 à 430 px en portrait, deux formats paysage et le bureau. La validation sur iPhone/Android physiques reste à faire. Les fichiers de l'application, ses cinq feuilles de style, les 20 personnages PNG et les deux planches de décor sont mis en cache après la première visite via un serveur local ou HTTPS ; les pistes audio restent réseau uniquement. Le [rapport mobile de la 2.3](RAPPORT_MOBILE_2026-11-11.md) reste conservé comme historique.

Le dossier peut être hébergé en HTTPS comme une PWA. Sur Android, utilise le menu de Chrome puis « Installer l’application » ou « Ajouter à l’écran d’accueil ». Sur iPhone/iPad, ouvre le jeu dans Safari, touche Partager puis « Sur l’écran d’accueil ». Cette installation garde le jeu dans Safari/Chrome : ce n’est pas un paquet natif publié sur l’App Store ou Google Play.

Pour l’ouvrir sur un téléphone connecté au même Wi-Fi que l’ordinateur, lance le serveur ainsi :

```powershell
python -m http.server 8765 --bind 0.0.0.0
```

Puis ouvre `http://ADRESSE-IP-DE-L-ORDINATEUR:8765/` dans le navigateur du téléphone. Pour le rendre accessible depuis Internet, il faudra héberger le dossier sur un site web, idéalement en HTTPS.

## Contenu

- Trois chapitres de 50, 75 et 100 scènes, avec cinq boss chacun.
- Classes et compétences, combats tactiques, sauvegardes locales, trophées et pistes audio.
- Prévisualisation de l’intention ennemie, avec une frappe puissante annoncée un tour à l’avance; défendre réduit le prochain coup de 60 %.
- Deux potions au départ, récupérables au camp, ainsi qu’un équipement amélioré par les butins de boss.
- Un sac à dos accessible pendant l’aventure permet d’équiper ou de déséquiper armes, armures et reliques. Chaque objet équipé ajoute son bonus aux autres; les anciennes sauvegardes gardent leur équipement.
- Les butins de boss ont quatre raretés. Les armes peuvent déclencher des coups critiques, les armures réduisent les dégâts reçus et les reliques améliorent les soins des potions; les effets sont visibles dans l’inventaire et s’activent réellement au combat.
- L’arbre de compétences est un graphe vertical à trois voies. Chaque rang a un nœud, un prérequis et une capacité distincte; un point est gagné à chaque niveau. Le rang I apparaît au chapitre I, le rang II au chapitre II et le rang III au chapitre III. Les maîtrises sont conservées par classe entre les aventures, alors que les points restent propres à la partie. Les effets couvrent attaque, critique, vol de vie, défense, soin, survie, capacité de potion et bonus de combat.
- Le mode campagne relie les trois chapitres : après avoir débloqué le suivant, le héros continue avec son niveau, son expérience, son équipement, son inventaire, ses potions et ses compétences. Le camp restaure une partie des PV et une potion. La campagne termine après le chapitre III.
- Au chapitre III, chaque voie peut être spécialisée au rang IV (Dueliste ou Fauche-vie; Bastion ou Gardien vengeur; Distillateur ou Alchimiste de guerre). Au niveau 12, le rang V améliore la spécialité choisie. Ces choix ont des effets différents en combat et sont conservés dans la sauvegarde de campagne.
- Les boss adaptent une contre-mesure à la voie la plus développée : ils annoncent une parade contre les coups critiques, une frappe qui perce une partie de la défense, ou une potion affaiblie. Les boss rendent aussi un peu de santé et une potion après le combat pour soutenir la traversée complète.
- Au chapitre II, le cartographe spectral confie une quête de cinq chemins. Terminer la quête donne une boussole runique (+2 ATQ), cumulable avec les autres reliques. Les boss restent dans leur ordre de difficulté prévu.
- Le journal de campagne rassemble les quêtes, les décisions récentes et un bestiaire qui se dévoile après les combats.
- Les chapitres I et III ont chacun une nouvelle quête secondaire. Chaque quête donne 20 EXP et une potion; si les potions sont pleines, le héros gagne 5 PV maximum à la place.
- Un guide de départ explique les choix, les combats et les menus; il reste accessible depuis la barre de jeu.
- Les boss passent en seconde phase sous 50 % de PV : leurs attaques gagnent en puissance et les coups lourds arrivent plus souvent.
- Compétence de l’Artificier recalibrée : triple attaque, plafonnée à 45 % des PV maximum d’un boss.
- Une interface et un récit disponibles en français, anglais, allemand, espagnol, polonais et chinois simplifié.
- Vingt personnages PNG transparents : cinq ennemis et quinze boss distincts, affichés sans lissage.
- Dix-huit accessoires provenant de deux planches originales, assemblés en sept décors selon le lieu : village, forêt, cimetière, ruines, forge, fjord et sanctuaire nordique.

Les conséquences de chaque choix Oui/Non sont visibles avant la réponse. Les décisions déterminent la route affichée dans le journal et la quête du cartographe ; les boss conservent leur ordre de difficulté prévu. Après chaque dizaine de scènes, le choix précédent ouvre un passage narratif différent; le dernier choix détermine l’épilogue du chapitre. Ces textes sont disponibles dans les six langues.

Les traductions du récit ont été complétées par traduction automatique. Elles couvrent les 675 champs narratifs par langue; une relecture par des locuteurs natifs reste utile pour améliorer le style et les noms propres.

## Fichiers principaux

- `story-data.js` : scènes, classes, ennemis, boss, chapitres et trophées en français.
- `app.js` et `style.css` : moteur, interface et réglages.
- `mobile.css` : menus mobiles, panneaux et actions accessibles en portrait et paysage, issus de la 2.3.
- `pixel.css`, `scenery.js` et `scenery.css` : thème et décors issus de la 2.4.
- `fusion.css` : raccords entre le thème pixel art et l'interface RPG, notamment les combats sur petits écrans.
- `translations/catalog.json` : catalogue éditable des traductions et leur couverture.
- `translations/catalog.js` : version chargée par le navigateur, générée depuis le JSON.
- `translations.js` : textes d’interface historiques et raccordement des catalogues au moteur.
- `expansion-v23.js` : textes traduits du journal, des quêtes, du guide et des boss de phase II.
- `assets/enemies/` et `audio/` : ressources visuelles et sonores.
- `assets/enemies/sprites/` et `assets/scenery/` : PNG originaux et manifestes copiés sans modification depuis la 2.4. Les anciens SVG restent archivés.
- `GUIDE_DEVELOPPEUR.md` : guide pour faire évoluer le jeu.
- `JOURNAL_MODIFICATIONS.md` : historique des changements.
- `tools/qa/check-sprite-integration.cjs`, `check-mobile-ui.cjs` et `check-merge.cjs` : vérifications du rendu, de l'interface et de la fusion ; procédure dans le rapport de fusion.
- `tools/qa/build-enemy-portraits.mjs` : ancien générateur SVG, conservé pour l'historique ; les personnages actuels utilisent les PNG fournis.
- `audio/ROADMAP.md` : idées musicales prévues, distinctes des pistes déjà incluses.

## Sauvegardes isolées

Les clés sont `the-fantasy-version-2-6-save`, `the-fantasy-version-2-6-settings` et `the-fantasy-version-2-6-achievements`. La 2.6 commence avec son propre profil et ne reprend pas automatiquement les parties des versions précédentes. Le nom du héros, le guide et le cache PWA sont également isolés.

Les trophées de progression utilisent les paliers **5, 10, 12, 15 et 18**, adaptés au parcours de campagne testé. Les anciens identifiants internes `level-fifty` et `level-one-hundred` sont conservés pour préserver les acquis; aucun objectif ne demande le niveau 100.

La collection compte **48 trophées : 24 objectifs principaux, leur platine et 23 bonus de classes facultatifs**. Le platine ne demande plus de finir le jeu avec toutes les classes. Les trois défis de diversité demandent chacun trois classes différentes, au lieu de 10/15/20. Six nouveaux objectifs récompensent cinq objets équipés simultanément, un premier talent, une spécialisation, un ultime, une quête secondaire et les quêtes des trois chapitres.

L'écran Trophées affiche les catégories, la progression et les filtres Principaux / Tous / À obtenir / Débloqués / Bonus de classes. Les acquis sont permanents; les nouveaux trophées récupèrent les faits disponibles dans la sauvegarde compatible et le profil, sans inventer une quête manquante.

## Traductions

`translations/catalog.json` est la source des traductions narratives. Après l’avoir modifié, régénère le fichier navigateur puis contrôle la couverture :

```powershell
node tools/qa/build-translation-catalog.mjs
node tools/qa/check-translations.mjs
```

Le catalogue contient 225 scènes et trois champs par scène : question, réponse Oui et réponse Non. Le contrôle signale une traduction manquante ou identique au texte français.

## Audio et crédits

Dix fichiers MP3 sont actuellement référencés dans le jeu. Les noms de fichiers indiquent certains artistes, mais le dossier ne conserve pas encore les URL de source ni les conditions de licence. Il faut compléter ces crédits avant toute redistribution publique. Les idées de pistes supplémentaires figurent dans `audio/ROADMAP.md`.
