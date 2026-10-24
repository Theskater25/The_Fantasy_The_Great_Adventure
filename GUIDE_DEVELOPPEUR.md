# The Fantasy — Guide du développeur

Ce document explique comment modifier et agrandir la version web de The Fantasy sans devoir réécrire tout le jeu.

La version 2.2 est une copie expérimentale en HTML/CSS/JavaScript. Elle ne dépend pas de VS Code pour être jouée : le navigateur charge index.html, les données de story-data.js, le moteur app.js et l'interface style.css. Elle utilise des clés de sauvegarde distinctes de la version de base.

## 1. Les fichiers importants

Version 2.2/

- index.html : page de départ. Il charge les autres fichiers dans le bon ordre.
- story-data.js : contenu du jeu : classes, ennemis, boss, chapitres, questions et trophées.
- `translations/catalog.json` : source éditable des traductions, avec le suivi de couverture.
- `translations/catalog.js` : catalogue navigateur généré depuis le JSON.
- `translations.js` : textes d’interface existants et raccordement des traductions au moteur.
- `app.js` : moteur des écrans, combats, progression, sauvegardes et trophées.
- `style.css` : styles et mise en page responsive.
- `assets/enemies/` : portraits SVG des ennemis et des boss.
- `audio/` : musiques et effets sonores.
- `JOURNAL_MODIFICATIONS.md` : historique chronologique des changements.
- `tools/qa/` : scripts de contrôle QA non chargés par le jeu.
- `qa-screenshots/` : captures de vérification, hors des scripts du jeu.

L'ordre de chargement des scripts dans `index.html` est important :

1. `story-data.js` crée `window.TF_CONTENT` ;
2. `translations/catalog.js` charge le catalogue traduit ;
3. `translations.js` raccorde le catalogue au moteur ;
4. `app.js` démarre le moteur et construit l'interface dans `#app`.

Ne charge pas app.js avant story-data.js.

## 2. Comment lancer le jeu

La méthode la plus simple est de double-cliquer sur :

    Version 2 test/index.html

Pour tester avec un petit serveur local, ouvre PowerShell dans le dossier Version 2 test puis utilise :

~~~powershell
python -m http.server 8765
~~~

Ensuite ouvre :

    http://127.0.0.1:8765/index.html

Le serveur local est pratique quand tu ajoutes des images, des fichiers audio ou d'autres ressources.

## 3. Les trois types de données importantes

Le jeu possède trois sauvegardes dans le navigateur.

- La partie en cours utilise la clé `the-fantasy-version-2-2-save`.
- Le profil permanent et les trophées utilisent la clé `the-fantasy-version-2-2-achievements`.
- Les réglages utilisent une clé Version 2.2 dédiée, définie par `SETTINGS_KEY` dans `app.js`.

La partie en cours est stockée dans l'objet state :

~~~js
state.chapter       // chapitre actuel
state.hero          // nom, classe, PV, attaque, niveau et ennemis vaincus
state.scene         // numéro de la question actuelle
state.scenes        // questions transformées pour le moteur
state.battle        // combat éventuel
state.completed     // chapitre terminé ou non
state.gameOver      // héros mort ou non
~~~

Le profil permanent est stocké dans profile :

~~~js
profile.unlocked          // identifiants des trophées obtenus
profile.completedChapters // chapitres terminés
profile.defeatedBosses    // boss vaincus
profile.chapterClasses    // classes utilisées pour terminer chaque chapitre
profile.highestLevel      // niveau maximum atteint
~~~

Important : state est la partie actuelle. profile reste enregistré entre plusieurs parties.

## 4. Campagne sur trois chapitres et arbres de compétences

Le mode campagne continue la même partie après la fin d'un chapitre. `continueCampaign()` change de chapitre sans recréer `state.hero`; il conserve donc le nom, la classe, le niveau, l'expérience, les statistiques, l'équipement, l'inventaire, les potions, les rangs et les spécialisations. Il réinitialise les champs propres au chapitre (scène, route, quête du cartographe, choix narratifs, ennemis et combats), puis applique les soins du camp. `recordChapterCompletion()` met à jour le profil et la sauvegarde; le bouton « Continuer la campagne » n'est proposé que si le chapitre suivant est débloqué.

Chaque rang est représenté dans `renderSkillTreeOverlay()` et chaque achat est contrôlé dans les gestionnaires `data-skill-upgrade` et `data-skill-specialize`. Les trois voies sont `blade`, `guardian` et `alchemy` :

| Progression | Accès | Fonction |
| --- | --- | --- |
| Rangs I–III | Rangs I, II et III respectivement aux chapitres I, II et III | Capacités de base propres à chaque voie |
| Rang IV | Chapitre III, niveau 8, rang III acquis et un point | Choix exclusif entre deux spécialisations |
| Rang V | Chapitre III, niveau 12, spécialisation et un point | Amélioration ultime de la spécialisation choisie |

Les prérequis d'affichage ne suffisent pas : `normalizeInventory()` plafonne aussi les rangs selon le chapitre et le niveau, et les gestionnaires refusent un achat invalide. Les capacités se calculent dans `recalculateHeroStats()` et `combatAction()`. Les maîtrises par classe sont conservées dans `profile.skillMastery`; la progression du héros de campagne, elle, reste dans `state.hero`.

Les boss lisent les scores des trois voies dans `startBattle()` puis choisissent une adaptation (`mirror`, `breaker` ou `hex`). L'intention doit être annoncée dans le journal et rester cohérente avec son effet dans `combatAction()` / `getEnemyIntent()`. Si tu changes une capacité, contrôle aussi le chemin du boss et les textes de `CAMPAIGN_TEXT`/`BOSS_COMBAT_TEXT` dans les six langues.

Les seuils d'expérience sont calculés par `totalXpForLevel(level)`. La normalisation de sauvegarde `normalizeHeroProgress()` corrige les anciens niveaux gonflés. Les trophées `level-fifty` et `level-one-hundred` gardent leurs identifiants historiques, mais correspondent désormais aux seuils 15 et 20 de campagne; maintiens la description dans `story-data.js` et `translations/catalog.json` cohérente avec `evaluateAchievements()`.

Pour ajouter une capacité : ajoute un nœud et ses textes localisés, vérifie le rang maximal et les limites de sauvegarde, code son effet dans le calcul de combat ou de stats, puis vérifie qu'une sauvegarde après achat et un changement de chapitre conservent le résultat.


## 5. Ajouter une classe

### Étape A — Ajouter la classe dans story-data.js

Les classes se trouvent dans CONTENT.classes. Chaque classe possède au minimum :

~~~js
{
  id: "nouvelle-classe",
  name: "Nouvelle classe",
  icon: "⚔",
  accent: "#d6ae62",
  hp: 16,
  attack: 12,
  skill: "Nom de la compétence",
  skillText: "Description visible dans la sélection.",
  minChapter: 3,
  origin: "Origine de la classe"
}
~~~

Règles importantes :

- id doit être unique, sans espace et sans accent ;
- name est le nom visible ;
- icon peut être un caractère Unicode ou un emoji ;
- accent est la couleur de la carte ;
- hp est le nombre de PV de départ ;
- attack est l'attaque de départ ;
- skill est le texte du bouton de compétence en combat ;
- skillText est la description affichée dans l'écran de sélection ;
- minChapter indique à partir de quel chapitre la classe est disponible.

Valeurs de minChapter :

- aucune valeur : disponible dès le chapitre I ;
- minChapter: 2 : disponible aux chapitres II et III ;
- minChapter: 3 : disponible uniquement au chapitre III.

Exemple de classe viking :

~~~js
{
  id: "jarl",
  name: "Jarl",
  icon: "ᛃ",
  accent: "#a77c52",
  hp: 21,
  attack: 13,
  skill: "Ordre du clan",
  skillText: "Renforce votre attaque et étourdit brièvement l'ennemi.",
  minChapter: 3,
  origin: "Noblesse nordique"
}
~~~

La sélection des classes est automatique. app.js utilise :

~~~js
classesForChapter(chapter)
~~~

Tu n'as donc pas besoin d'ajouter manuellement une carte HTML pour chaque classe.

### Étape B — Donner une compétence réelle à la classe

Ajouter la classe dans story-data.js crée sa carte, mais sa compétence doit aussi être codée dans combatAction(), dans app.js.

Exemple :

~~~js
if (heroClass.id === "jarl") {
  damage = Math.ceil(state.hero.attack * 1.3);
  battle.enemyStun = 1;
  battle.playerAtkMult = 1.5;
  addLog("Votre ordre du clan inspire les guerriers.", "system");
}
~~~

Les variables de combat principales sont :

- damage : dégâts infligés maintenant ;
- battle.enemyFrozen : nombre de tours pendant lesquels l'ennemi est gelé ;
- battle.enemyStun : nombre de tours pendant lesquels l'ennemi est étourdi ;
- battle.playerAtkMult : multiplicateur de la prochaine attaque ;
- battle.playerDefReducePct : réduction des dégâts reçus ;
- battle.playerDefReduceTurns : durée de la protection ;
- battle.playerInvincible : protection totale pendant un tour ;
- state.hero.hp : PV actuels du héros ;
- state.hero.maxHp : PV maximum ;

Une compétence qui inflige des dégâts doit définir damage. Une compétence défensive peut modifier battle sans infliger de dégâts.

### Étape C — Ajouter le trophée de la classe

Dans CONTENT.achievements, ajoute un trophée dont l'identifiant suit la règle class-idDeLaClasse :

~~~js
{
  id: "class-jarl",
  icon: "ᛃ",
  title: "Voie du Jarl",
  description: "Terminer une aventure avec la classe Jarl.",
  tier: "gold"
}
~~~

Le moteur appelle automatiquement unlockAchievement("class-" + state.hero.classId) à la fin d'un chapitre.

Les rangs acceptés sont :

- bronze ;
- silver ;
- gold ;
- platinum.

## 6. Ajouter une question

### Chapitre I

Le chapitre I utilise des tableaux simples :

~~~js
["Village", "Une maison abandonnée vous appelle. (Voulez-vous entrer ?)"]
~~~

Le premier élément est le décor. Le deuxième est le texte.

### Chapitres II et III

Les chapitres II et III utilisent des objets plus complets :

~~~js
{
  decor: "Port",
  text: "Un navire apparaît dans la brume. (Voulez-vous monter à bord ?)",
  yes: "Vous montez à bord.",
  no: "Vous restez sur le quai.",
  yesPath: "mer",
  noPath: "fjord"
}
~~~

Signification des champs :

- decor : nom de la zone affichée ;
- text : question posée au joueur ;
- yes : texte ajouté au journal si le joueur répond Oui ;
- no : texte ajouté au journal si le joueur répond Non ;
- yesPath : route narrative après Oui ;
- noPath : route narrative après Non.

Le joueur ne voit pas toutes les questions en même temps. createScenes() numérote automatiquement les questions avec number: index + 1.

Bonnes pratiques :

- termine la question par ? ;
- garde toujours une réponse yes et une réponse no ;
- garde toujours yesPath et noPath pour les chapitres avec embranchements ;
- évite de supprimer une question au milieu d'une sauvegarde existante ;
- vérifie la longueur du tableau après une modification.

Pour ajouter un nouvel icône de décor, ajoute son nom dans DECOR_ICONS dans app.js :

~~~js
Montagne: "▲",
~~~

Si un décor n'a pas d'icône, le moteur affiche automatiquement ✦.

## 7. Ajouter une route narrative

Les routes ne changent pas l'ordre ni le nombre des scènes. Chaque choix met à jour `state.chapterPath`, puis le jeu ajoute une phrase de route avant la question suivante. Les combats aléatoires et les trophées peuvent aussi dépendre des actions. Il n’existe pas encore de branches qui remplacent ou sautent des scènes.

Pour le chapitre II, les routes sont dans TREASURE_PATHS.

Pour le chapitre III, elles sont dans NORDIC_PATHS.

Exemple :

~~~js
valhalla: "Vous suivez les signes du Valhalla"
~~~

Puis une question peut utiliser :

~~~js
yesPath: "valhalla",
noPath: "fjord"
~~~

Si tu ajoutes une route, ajoute-la dans le bon objet PATHS et utilise exactement la même orthographe dans yesPath et noPath.

## 8. Ajouter un chapitre

Ajouter un chapitre demande plusieurs petites modifications.

### Étape A — Ajouter la carte du chapitre

Dans CONTENT.chapters :

~~~js
{
  id: 4,
  title: "Le Royaume des cendres",
  kicker: "Chapitre IV",
  text: "Une nouvelle menace se lève.",
  tone: "80 questions, cinq boss et une nouvelle légende."
}
~~~

### Étape B — Ajouter les questions

Crée CONTENT.ashEvents, ou un nom équivalent, avec les objets de questions.

### Étape C — Raccorder createScenes()

Dans app.js :

~~~js
if (chapter.id === 4) {
  return CONTENT.ashEvents.map((event, index) => ({
    ...event,
    number: index + 1,
    kind: "choice"
  }));
}
~~~

### Étape D — Raccorder le chemin initial

Dans startNewGame() et continueSave(), donne une route initiale au chapitre :

~~~js
state.chapterPath = state.chapter === 4 ? "cendres" : null;
~~~

### Étape E — Raccorder les combats et les boss

Dans startBattle(), ajoute la liste de boss et l'intervalle du nouveau chapitre.

Dans finishStep(), ajoute la fréquence des boss :

~~~js
const bossInterval =
  state.chapter === 1 ? 10 :
  state.chapter === 2 ? 15 :
  state.chapter === 3 ? 20 :
  state.chapter === 4 ? 20 :
  0;
~~~

Dans advance(), ajoute le chapitre aux rencontres aléatoires si tu veux qu'il puisse déclencher des ennemis.

### Étape F — Raccorder les sauvegardes

Dans continueSave(), si le nombre de scènes ne correspond pas au nouveau tableau, reconstruis les scènes avec createScenes().

Si tu changes profondément la structure de state, modifie storyVersion dans story-data.js et ajoute l'ancienne version dans compatibleVersion avant de distribuer la nouvelle version. Sinon les anciennes sauvegardes peuvent être refusées.

## 9. Ajouter un ennemi ou un boss

### Ennemi normal

Dans basicEnemies :

~~~js
{
  name: "Draugr",
  type: "basique",
  hp: 18,
  attack: 6,
  asset: "assets/enemies/draugr.svg"
}
~~~

### Boss

Dans nordicBosses, treasureBosses ou bosses :

~~~js
{
  name: "Le Géant des brumes",
  type: "boss",
  hp: 180,
  attack: 18,
  asset: "assets/enemies/geant-brumes.svg"
}
~~~

Les boss d'un chapitre sont choisis dans startBattle(). Le moteur calcule automatiquement leur puissance selon la progression.

### Ajouter une image

1. Place le fichier dans assets/enemies/.
2. Utilise un nom simple, par exemple draugr.svg.
3. Référence le chemin avec des slashs :

    assets/enemies/draugr.svg

4. Ajoute asset à l'ennemi ou au boss.

Les SVG locaux sont préférables aux liens Internet : le jeu reste utilisable hors connexion.

## 10. Ajouter un trophée

Chaque trophée possède :

~~~js
{
  id: "id-unique",
  icon: "★",
  title: "Nom affiché",
  description: "Condition visible par le joueur.",
  tier: "silver"
}
~~~

Pour une condition simple, ajoute la règle dans evaluateAchievements().

Exemple : trophée si le joueur atteint le niveau 10 :

~~~js
if (profile.highestLevel >= 10) {
  unlockAchievement("level-ten");
}
~~~

Puis ajoute la donnée correspondante dans story-data.js.

Le trophée platinum est spécial : il se débloque automatiquement quand tous les trophées qui ne sont pas platinum sont déjà dans profile.unlocked.

Pour un trophée de boss, utilise profile.defeatedBosses.

Pour un trophée de chapitre, utilise profile.completedChapters.

Pour un trophée de classe, utilise profile.chapterClasses ou la règle automatique class-identifiant.

## 11. Ajouter un bouton

### Bouton dans un écran

Les écrans sont construits dans app.js par des fonctions render :

- renderTitle() : écran-titre ;
- renderMenu() : choix du chapitre ;
- renderSelect() : choix de la classe ;
- renderGame() : partie ;
- renderAchievements() : trophées ;
- renderSettings() : réglages ;
- renderCredits() : crédits.

Pour ajouter un bouton à l'écran-titre :

~~~js
<button class="title-button" data-action="codex">Codex</button>
~~~

Puis ajoute son action après la création de l'interface :

~~~js
app.querySelector("[data-action=codex]").addEventListener("click", () => {
  state.screen = "codex";
  render();
});
~~~

Enfin ajoute le nouvel écran dans render() :

~~~js
if (state.screen === "codex") renderCodex();
~~~

Et crée la fonction renderCodex().

### Bouton Oui/Non

Les boutons de décision sont créés par getActions(). Ils appellent :

~~~js
window.__tfAction("yes")
window.__tfAction("no")
~~~

window.__tfAction() redirige ensuite vers advance() ou combatAction().

### Bouton de combat

Les actions Attaquer, Attendre et Compétence sont créées dans getActions(). Si tu ajoutes une action, il faut :

1. créer le bouton dans getActions() ;
2. accepter son nom dans window.__tfAction() ;
3. traiter son effet dans combatAction().

Ne crée pas un bouton visuel sans lui donner une action JavaScript.

## 12. Modifier le texte ou la langue

Les textes du menu se trouvent dans UI_TEXT :

~~~js
fr: {
  play: "Jouer",
  achievements: "Trophées",
  credits: "Crédits"
}
~~~

Pour afficher un texte traduit, utilise :

~~~js
t("play")
~~~

Les textes de l'interface sont dans `UI_TEXT`. Les textes des scènes, chapitres, classes, ennemis, routes et trophées sont dans `translations/catalog.json`. Le navigateur charge la version générée `translations/catalog.js`.

## 13. Modifier l'apparence

Les classes CSS principales sont :

- .screen : écran général ;
- .screen--title : écran-titre ;
- .screen--menu : menu des chapitres ;
- .screen--select : sélection des classes ;
- .screen--game : écran de jeu ;
- .panel : panneau principal ou fiche du héros ;
- .btn : bouton standard ;
- .btn--cyan : bouton principal ;
- .btn--danger : bouton de sortie ou danger ;
- .achievement-row : ligne d'un trophée ;
- .class-card : carte d'une classe ;
- .enemy-stage : zone d'affichage d'un ennemi.

Pour changer les couleurs principales, commence par les variables CSS au début de style.css. Cela évite de modifier chaque élément séparément.

Après une modification CSS ou JavaScript, augmente le numéro après ? dans index.html :

~~~html
<link rel="stylesheet" href="style.css?v=ma-version">
<script src="story-data.js?v=ma-version"></script>
<script src="app.js?v=ma-version"></script>
~~~

Cela force le navigateur à charger la nouvelle version au lieu d'utiliser son cache.

## 14. Vérifier le code

Avant de jouer, vérifie la syntaxe avec Node.js depuis le dossier du projet :

~~~powershell
node --check ".\Version 2 test\app.js"
node --check ".\Version 2 test\story-data.js"
~~~

Pour vérifier le nombre de questions du chapitre III :

~~~powershell
node -e "global.window={}; require('./Version 2 test/story-data.js'); console.log(window.TF_CONTENT.nordicEvents.length)"
~~~

Le résultat attendu est 100.

Pour vérifier les trophées :

~~~powershell
node -e "global.window={}; require('./Version 2 test/story-data.js'); console.log(window.TF_CONTENT.achievements.length)"
~~~

Le résultat actuel attendu est 33.

Après chaque modification, teste au minimum :

1. l'écran-titre ;
2. l'écran de sélection du chapitre ;
3. la sélection de classe ;
4. la première question ;
5. un combat ;
6. une sauvegarde avec Continuer ;
7. l'écran Trophées ;
8. le redimensionnement ou le plein écran.

## 15. Réinitialiser les données de test

Les sauvegardes sont dans le stockage local du navigateur. Pour recommencer entièrement une partie de test, ouvre la console du navigateur et exécute :

~~~js
localStorage.removeItem("the-fantasy-version-2-save");
localStorage.removeItem("the-fantasy-version-2-achievements");
localStorage.removeItem("the-fantasy-version-2-settings");
~~~

Attention : cela efface la partie, les trophées et les réglages enregistrés pour ce jeu dans ce navigateur.

## 16. Méthode de travail recommandée

Avant une grosse modification :

1. copie le dossier Version 2 test ;
2. note ce que tu veux changer ;
3. modifie d'abord les données dans story-data.js ;
4. modifie app.js seulement si le nouveau contenu a un comportement particulier ;
5. modifie style.css pour l'apparence ;
6. lance les vérifications Node.js ;
7. teste dans le navigateur ;
8. conserve une version qui fonctionne avant de continuer.

La règle la plus importante est de garder les identifiants cohérents. Une classe, une route, un trophée ou un ennemi doit toujours avoir le même id ou le même nom partout où il est utilisé.

## 17. Résumé rapide

Pour une nouvelle classe :

1. ajouter l'objet dans CONTENT.classes ;
2. ajouter son effet dans combatAction() ;
3. ajouter son trophée class-identifiant ;
4. tester le chapitre autorisé.

Pour une nouvelle question :

1. ajouter l'objet dans le tableau d'événements ;
2. renseigner decor, text, yes, no, yesPath et noPath ;
3. vérifier le nombre d'événements ;
4. tester Oui et Non.

Pour un nouveau bouton :

1. écrire le bouton HTML dans la fonction render concernée ;
2. lui donner data-action ;
3. connecter addEventListener ;
4. créer ou appeler la fonction d'action ;
5. vérifier l'écran après le clic.

Pour un nouveau trophée :

1. ajouter l'objet dans CONTENT.achievements ;
2. choisir bronze, silver, gold ou platinum ;
3. ajouter sa condition dans evaluateAchievements(), sauf pour les trophées de classe ;
4. vérifier qu'il apparaît dans l'écran Trophées.

## 18. Ajouter ou modifier une musique

Le moteur audio se trouve dans app.js. Les noms des fichiers sont regroupés dans trois objets :

~~~js
const AUDIO_TRACKS = {
  menu: "audio/ma-musique-menu.mp3",
  chapter1: "audio/ma-musique-chapitre-1.mp3",
  chapter2: "audio/ma-musique-chapitre-2.mp3",
  chapter3: "audio/ma-musique-chapitre-3.mp3",
  battle: "audio/ma-musique-combat.mp3"
};

const AUDIO_AMBIENTS = {
  forest: "audio/mon-ambiance-foret.mp3"
};

const AUDIO_SFX = {
  hit: "audio/mon-effet-impact.mp3"
};
~~~

Le fichier doit exister exactement au chemin indiqué. Les majuscules, espaces et accents dans les noms de fichiers peuvent provoquer des erreurs selon le serveur ou l'hébergement ; utilise de préférence des noms en minuscules, sans espaces et sans accents.

Le choix de la musique dépend de desiredMusicKey() :

- menu : écran-titre, menus et réglages ;
- chapter1, chapter2 ou chapter3 : exploration ;
- battle : combat.

Les ambiances sont choisies par desiredAmbientKey(). Elles sont moins fortes que la musique principale pour ne pas couvrir les dialogues.

Pour utiliser une nouvelle musique dans une scène particulière :

1. ajoute le fichier dans audio/ ;
2. ajoute son chemin dans AUDIO_TRACKS ou AUDIO_AMBIENTS ;
3. retourne sa clé dans desiredMusicKey() ou desiredAmbientKey() ;
4. teste le bouton Réglages > Musique ;
5. vérifie que la musique change bien quand un combat commence puis se termine.

Le navigateur peut refuser une lecture automatique. C'est normal. Le jeu lance la musique après le premier clic et utilise play().catch() pour ne pas afficher d'erreur bloquante.

Le `README.md` de la racine recense les pistes incluses. `audio/ROADMAP.md` contient les idées de pistes futures. Avant publication, ajoute les sources et les licences des fichiers audio existants.

## 19. Traduire les trois chapitres

`translations/catalog.json` est la source unique pour les langues et les scènes. Chaque événement porte un identifiant stable (`ch1.event.001`, par exemple) et trois champs nommés : `question`, `yes` et `no`. Les chapitres contiennent respectivement 50, 75 et 100 événements.

Après toute modification du JSON, régénère le fichier chargé par le navigateur et contrôle les champs :

~~~powershell
node tools/qa/build-translation-catalog.mjs
node tools/qa/check-translations.mjs
~~~

Le constructeur arrête la génération si une ligne manque ou si une traduction narrative reprend exactement le français. `translations/catalog.js` est généré : modifie le JSON plutôt que ce fichier.

Les textes de l’interface sont dans `UI_TEXT` dans `app.js`. Le sélecteur de langue et l’attribut de langue HTML doivent utiliser le même identifiant, par exemple `zh-CN`.

Le français reste la langue source et le dernier recours pour des éléments que le catalogue ne couvre pas. N’ajoute une langue au sélecteur que lorsque son interface et ses métadonnées sont prêtes.
## 20. Verrouillage des chapitres

Le jeu utilise isChapterUnlocked() :

~~~js
function isChapterUnlocked(id) {
  return Number(id) === 1 ||
    (profile.completedChapters.includes(1) &&
     profile.noDeathChapters.includes(1));
}
~~~

Actuellement, les chapitres II et III deviennent accessibles seulement si :

- le chapitre I a été terminé ;
- le héros n'est pas mort pendant cette partie du chapitre I.

Si tu veux un déblocage strictement séquentiel, où le chapitre III demande aussi une victoire sans mort au chapitre II, remplace la condition par :

~~~js
if (Number(id) === 1) return true;
if (Number(id) === 2) {
  return profile.completedChapters.includes(1) &&
    profile.noDeathChapters.includes(1);
}
if (Number(id) === 3) {
  return profile.completedChapters.includes(2) &&
    profile.noDeathChapters.includes(2);
}
return false;
~~~

Le texte affiché au joueur se trouve dans la clé chapterLock de UI_TEXT. Il doit être traduit si tu ajoutes une autre langue.

## 21. Compatibilité téléphone

L'interface possède déjà trois niveaux principaux :

- au-dessus de 980 px : jeu en deux colonnes ;
- entre 680 px et 980 px : journal puis fiche du héros ;
- sous 680 px : une seule colonne, boutons larges et fiche empilée.

Les règles correspondantes sont les media queries de style.css :

~~~css
@media (max-width: 980px) { ... }
@media (max-width: 680px) { ... }
~~~

Pour ajouter une interface mobile :

1. évite les largeurs fixes trop grandes ;
2. utilise width: 100% avec max-width ;
3. conserve une zone de clic d'environ 44 px pour les boutons tactiles ;
4. laisse le journal défiler dans sa propre zone ;
5. évite que la page entière défile pendant une question ;
6. teste en portrait et en paysage ;
7. teste avec un nom de héros long ;
8. vérifie le bouton plein écran et le clavier virtuel.

Dans le navigateur, utilise un viewport de test d'environ 390 × 844 pour simuler un téléphone moderne. Vérifie que le titre, les boutons Oui/Non, la fiche du héros et les portraits ne se chevauchent pas.

Les animations respectent déjà body[data-motion="off"] et prefers-reduced-motion. Toute nouvelle animation importante doit respecter ces deux réglages.

## 22. Partager le jeu sur Discord

Discord n'exécute généralement pas un fichier HTML envoyé comme une application. Il affiche le fichier ou propose son téléchargement selon le type de pièce jointe.

Pour partager le jeu :

### Méthode ZIP

1. compresse tout le dossier Version 2 test ;
2. conserve la structure interne complète ;
3. vérifie que index.html est directement dans le dossier ouvert ;
4. envoie le ZIP sur Discord ;
5. demande au joueur d'extraire le dossier puis d'ouvrir index.html.

Ne partage pas uniquement index.html : les fichiers story-data.js, translations.js, app.js, style.css, assets et audio sont nécessaires.

### Méthode lien web

Pour que les joueurs cliquent simplement sur un lien, héberge le dossier sur un service de pages statiques comme GitHub Pages ou un hébergement équivalent. Le fichier à ouvrir doit être :

    https://ton-site.example/index.html

Avant de publier :

- vérifie les licences des musiques et images ;
- vérifie que tous les chemins utilisent des slashs ;
- teste avec une fenêtre privée ;
- teste sur téléphone ;
- teste après avoir vidé le cache ;
- ne publie jamais de clé secrète ou de mot de passe dans le JavaScript.

## 23. Pistes d'amélioration restantes

Les fondations RPG ci-dessous sont déjà présentes dans la Version 2.2 : campagne trois chapitres, arbre de compétences, équipement, inventaire et combats de boss adaptés. Ne pas les recopier comme fonctionnalités nouvelles; il faut les étendre ou les équilibrer.

Priorités proposées pour la suite :

1. Parcourir une campagne complète avec plusieurs classes et spécialités, puis réviser les courbes de dégâts, soins, récompenses et durée des combats.
2. Ajouter des sauvegardes multiples et un export/import JSON, puis tester les migrations de version.
3. Développer des quêtes optionnelles et des embranchements avec conséquences visibles sur les chapitres suivants.
4. Ajouter des retours visuels/sonores aux spécialisations et aux attaques de boss, avec prise en charge du réglage « mouvements réduits ».
5. Faire relire les traductions par des locuteurs natifs et vérifier les licences audio avant publication.
6. Ajouter manifeste et service worker pour installer le jeu comme PWA, puis valider son fonctionnement hors ligne sur iPhone et Android.

Les sections suivantes gardent des exemples d'architecture utiles. Les rubriques Inventaire et Équipement décrivent désormais le système livré; elles servent de référence si on le refactorise.

La structure actuelle peut accueillir beaucoup d'améliorations.

### Inventaire

Ajoute un tableau dans state.hero :

~~~js
inventory: []
~~~

Puis crée des objets avec id, name, icon, description et effect. L'inventaire doit être sauvegardé dans state, jamais dans une variable uniquement visuelle.

### Équipement

Sépare les objets équipés de l'inventaire :

~~~js
equipment: {
  weapon: null,
  armor: null,
  relic: null
}
~~~

Calcule ensuite l'attaque et les PV à partir de la classe et de l'équipement. Ne modifie pas définitivement les statistiques de base à chaque rendu, sinon elles pourraient augmenter plusieurs fois.

### Niveau de difficulté

Ajoute une difficulté dans settings :

~~~js
difficulty: "normal"
~~~

Puis applique un multiplicateur unique dans startBattle(). Garde les valeurs de base dans story-data.js pour pouvoir rééquilibrer le jeu plus facilement.

### Journal et choix précédents

state.log contient déjà l'historique affiché. Pour un vrai journal consultable, crée un nouvel écran qui filtre les entrées par chapitre, route ou type : narration, combat, trophée.

### Sauvegardes multiples

Au lieu d'une seule clé SAVE_KEY, utilise une liste de profils :

~~~js
the-fantasy-save-1
the-fantasy-save-2
the-fantasy-save-3
~~~

Affiche ensuite trois emplacements dans un écran de sauvegarde. Ne stocke que des objets JSON sérialisables.

### Sauvegarde exportable

Tu peux ajouter un bouton qui transforme la sauvegarde en JSON téléchargeable. Ajoute toujours un avertissement indiquant que le fichier peut contenir le nom du héros et sa progression.

### Contrôles clavier

Ajoute un seul écouteur clavier central :

~~~js
document.addEventListener("keydown", (event) => {
  if (event.key === "1") window.__tfAction("yes");
  if (event.key === "2") window.__tfAction("no");
});
~~~

Bloque ces raccourcis pendant un champ texte ou une fenêtre de confirmation.

### Système de quêtes

Ajoute un tableau quests dans state :

~~~js
quests: [
  { id: "find-relic", status: "active", progress: 3, target: 10 }
]
~~~

Mets à jour les quêtes dans advance(), winBattle() et recordChapterCompletion(), puis affiche-les dans un panneau secondaire repliable.

### Animations et transitions

Réserve les animations fortes aux moments importants : apparition d'un boss, mort, victoire, niveau supérieur ou trophée. N'anime pas chaque ligne du journal en permanence, surtout sur téléphone.

### Mode hors ligne

Le jeu est déjà principalement local. Pour aller plus loin, ajoute un service worker et un manifeste web. Cela permettra une installation comme application sur téléphone, mais il faudra tester soigneusement le cache des fichiers audio et les mises à jour.

### Statistiques de partie

Tu peux enregistrer le nombre de décisions Oui, Non, de combats, de dégâts et de routes visitées dans state. Évite d'envoyer ces données sur Internet sans informer le joueur.

## 24. Conseils d'architecture

Quand le jeu deviendra plus grand, sépare progressivement app.js en modules :

- data.js : données de jeu ;
- localization.js : traductions ;
- audio.js : musiques et effets ;
- save.js : localStorage et export ;
- achievements.js : trophées ;
- combat.js : règles de combat ;
- screens.js : rendu des écrans ;
- input.js : clavier et contrôles tactiles.

La version actuelle reste dans quelques fichiers pour être facile à comprendre. La séparation ci-dessus deviendra utile quand plusieurs développeurs ou beaucoup de contenu travailleront en même temps.

La règle fondamentale reste la même :

- les données décrivent le contenu ;
- state contient la progression ;
- les fonctions de jeu modifient state ;
- les fonctions render affichent state ;
- CSS décide de l'apparence ;
- localStorage conserve les données entre deux ouvertures.

Évite de mettre une règle de gameplay uniquement dans le HTML. Un bouton peut afficher une action, mais c'est app.js qui doit décider si cette action est autorisée et modifier la sauvegarde.
