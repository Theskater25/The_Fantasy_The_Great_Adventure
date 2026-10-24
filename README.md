# The Fantasy — Version 2.2 expérimentale

Cette copie indépendante explore une boucle RPG plus poussée. Le dossier de la version de base reste inchangé; les sauvegardes, paramètres et trophées de cette version utilisent des clés séparées.

## Lancer le jeu

Ouvre `index.html` dans un navigateur. Pour le lancer depuis un serveur local, exécute cette commande à la racine du projet :

```powershell
python -m http.server 8765
```

Puis visite <http://127.0.0.1:8765/>.

Dans VS Code, ouvre ce dossier puis choisis « Open Version 2.2 » dans Run and Debug. Si tu as gardé ouvert le dossier de base `Version 2 test`, sa configuration propose maintenant « Open Version 2.2 (experimental copy) » pour lancer directement cette copie.

Le menu d’accueil affiche aussi « VERSION 2.2 · RPG EDITION » pour distinguer la copie du jeu de base. En combat, les changements visibles sont l’intention de l’ennemi, les commandes Défendre et Potion, puis les récompenses d’équipement après les boss.

## Jouer sur téléphone

La mise en page s’adapte aux petits écrans en portrait et en paysage. Les boutons de combat restent faciles à toucher, la barre de commandes se range en deux colonnes et les zones sûres des écrans avec encoche sont respectées. Les fichiers de l’application et les portraits sont mis en cache après la première visite pour permettre de relancer le jeu hors ligne; les pistes audio ne sont pas téléchargées par le cache.

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
- Au chapitre II, le cartographe spectral confie une quête de cinq chemins. Les chemins explorés influencent les boss rencontrés; terminer la quête donne une boussole runique (+2 ATQ).
- Compétence de l’Artificier recalibrée : triple attaque, plafonnée à 45 % des PV maximum d’un boss.
- Une interface et un récit disponibles en français, anglais, allemand, espagnol, polonais et chinois simplifié.
- Des portraits d’ennemis en SVG illustrés en 2D.

Les choix déterminent la route affichée dans le journal, la quête du cartographe et l’ordre des rencontres de boss. Après chaque dizaine de scènes, le choix précédent ouvre un passage narratif différent; le dernier choix détermine l’épilogue du chapitre. Ces nouveaux textes sont disponibles dans les six langues.

Les traductions du récit ont été complétées par traduction automatique. Elles couvrent les 675 champs narratifs par langue; une relecture par des locuteurs natifs reste utile pour améliorer le style et les noms propres.

## Fichiers principaux

- `story-data.js` : scènes, classes, ennemis, boss, chapitres et trophées en français.
- `app.js` et `style.css` : moteur, interface et réglages.
- `translations/catalog.json` : catalogue éditable des traductions et leur couverture.
- `translations/catalog.js` : version chargée par le navigateur, générée depuis le JSON.
- `translations.js` : textes d’interface historiques et raccordement des catalogues au moteur.
- `assets/enemies/` et `audio/` : ressources visuelles et sonores.
- `GUIDE_DEVELOPPEUR.md` : guide pour faire évoluer le jeu.
- `JOURNAL_MODIFICATIONS.md` : historique des changements.
- `tools/qa/build-enemy-portraits.mjs` : génère les portraits de monstres SVG utilisés par cette copie.
- `audio/ROADMAP.md` : idées musicales prévues, distinctes des pistes déjà incluses.

## Sauvegardes isolées

Cette version est une copie de démonstration. Elle ne lit ni ne modifie les sauvegardes, trophées ou réglages de la version de base.

Les trophées de progression utilisent les paliers 5, 10, 12, 15 et 20. Les paliers 15 et 20 sont pensés pour une campagne complète. Les anciens identifiants internes `level-fifty` et `level-one-hundred` sont conservés afin de préserver les trophées déjà enregistrés localement.

## Traductions

`translations/catalog.json` est la source des traductions narratives. Après l’avoir modifié, régénère le fichier navigateur puis contrôle la couverture :

```powershell
node tools/qa/build-translation-catalog.mjs
node tools/qa/check-translations.mjs
```

Le catalogue contient 225 scènes et trois champs par scène : question, réponse Oui et réponse Non. Le contrôle signale une traduction manquante ou identique au texte français.

## Audio et crédits

Dix fichiers MP3 sont actuellement référencés dans le jeu. Les noms de fichiers indiquent certains artistes, mais le dossier ne conserve pas encore les URL de source ni les conditions de licence. Il faut compléter ces crédits avant toute redistribution publique. Les idées de pistes supplémentaires figurent dans `audio/ROADMAP.md`.
