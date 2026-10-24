# Journal chronologique des modifications — The Fantasy V2.2
Ce document consigne les changements effectivement appliqués au projet, dans l'ordre de réalisation. Il sert de relais pour un prochain développeur ou une autre IA.

## État actuel — 2026-10-22

- Campagne continue : un héros garde sa classe, niveau/XP, compétences, spécialisations, équipement, sac et consommables entre les chapitres; la halte de transition rend une partie des PV et une potion.
- Trois arbres à cinq rangs effectifs : trois capacités de base déverrouillées au fil des chapitres, un choix de spécialisation au chapitre III, puis un ultime. Les spécialités sont Lame (Dueliste/Fauche-vie), Gardien (Bastion/Gardien vengeur) et Alchimie (Distillateur/Alchimiste de guerre).
- Les boss annoncent leur contre-mesure selon la voie dominante. Réduction de leur mise à l'échelle et ordre de difficulté fixe pour éviter un boss final prématuré; les boss rendent aussi des PV et une potion après victoire.
- Courbe d'XP cumulative corrigée et anciennes sauvegardes normalisées. Paliers de trophées rendus cohérents avec une trilogie (5/10/12/15/20); descriptions harmonisées dans les six langues, identifiants historiques conservés pour les sauvegardes.
- Dix portraits SVG originaux v3 produits par `tools/qa/build-enemy-portraits.mjs`; le jeu les référence. Ils sont des illustrations vectorielles 2D, pas des modèles 3D.
- Retouche des visages du bestiaire : regards lumineux, sourcils froncés et expression hostile au lieu du sourire, pour mieux convenir à des ennemis et boss.
- Correction du combat adaptatif « miroir » : le boss bloque désormais bien le premier coup critique annoncé dès le début du combat, puis continue de réarmer sa parade après chaque critique.
- README et guide développeur actualisés. Le guide décrit maintenant campagne, rangs, sauvegarde, spécialités et adaptations des boss; les prochaines étapes sont orientées vers l'équilibrage complet, les sauvegardes exportables, les quêtes à conséquences et le mode hors ligne.

### Vérifications de cette passe

- `node --check app.js`, `node --check story-data.js`, `node --check tools/qa/build-enemy-portraits.mjs` : réussis.
- `node tools/qa/check-translations.mjs` : 675/675 champs narratifs par langue; aucun champ vide ou resté en français dans EN/DE/ES/PL/zh-CN.
- `node tools/qa/validate-assets.mjs` : 16 références de portraits présentes; 30 SVG passent le contrôle racine/viewBox.
- Contrôle navigateur du parcours de chapitre I en cours de sauvegarde QA : le premier boss, ses annonces, le butin et les capacités sont visibles; sauvegarde migrée à niveau 8 pour 680 XP. Un parcours complet des trois chapitres sur une nouvelle sauvegarde reste à faire avant de considérer l'équilibrage comme final.
- Échec QA reproductible en ignorant les choix donnant de l'XP et en ne consommant aucune potion : le Chevalier niveau 1 meurt sur le boss 1. Le boss final du chapitre I (225 PV, 23 ATQ; lourde annoncée à 41) tue aussi un Artificier de test sans potions si celui-ci attaque au lieu de défendre. Le télégraphe est visible et Défendre réduit bien le coup; il faut tout de même vérifier que les soins/potions reçus après les boss suffisent sur un vrai parcours. Ne pas qualifier la trilogie d'équilibrée tant qu'un parcours complet sans mort n'a pas été validé.

## État actuel — 2026-10-21

- Copie expérimentale isolée de la version de base : sauvegardes, réglages, trophées et nom du héros utilisent leur propre espace local.
- Combat plus tactique : prévisualisation d’attaque, frappe puissante au troisième tour, action Défendre (-60 % de dégâts) et deux potions utilisables par partie.
- Repos au camp : soigne le héros et restaure une potion (maximum trois).
- Les boss lâchent des objets de quatre raretés. Armes, armures et reliques ont des bonus qui se cumulent; certains objets ajoutent des critiques, une réduction des dégâts ou des soins de potion. Le sac à dos permet de les équiper ou déséquiper.
- Un arbre graphique de trois voies (lame, gardien, alchimie) donne un point à chaque niveau, jusqu’à trois nœuds distincts par voie. Le rang I se débloque au chapitre I, le rang II au chapitre II, le rang III au chapitre III; les maîtrises persistent par classe entre les chapitres.
- Les choix ouvrent des scènes narratives alternatives après les étapes 10, 20, etc. Le dernier choix du chapitre détermine l’épilogue. Les textes de ces branches sont fournis dans les six langues.
- Au chapitre II, une quête confiée par un cartographe suit cinq routes; son achèvement donne une boussole runique (+2 ATQ). Les routes déterminent aussi la sélection des boss.
- L’Artificier inflige désormais trois fois son attaque, avec un plafond de 45 % des PV max d’un boss.
- L’interface mobile s’adapte au portrait et au paysage, utilise les zones sûres iPhone, maintient des commandes tactiles de 44 px minimum et améliore le focus clavier. Le README explique comment ouvrir le serveur local depuis un téléphone du même réseau; la version reste un jeu navigateur, pas une app native publiée.
- Le trophée « Marcheur des chemins » comptabilise les routes distinctes choisies pendant une partie du chapitre II. La liste est sauvegardée avec la partie et les anciennes sauvegardes sont normalisées à la reprise.
- Le catalogue narratif structuré est `translations/catalog.json`; `translations/catalog.js` est généré et chargé par `index.html`. Les six langues (FR, EN, DE, ES, PL et zh-CN) ont chacune 675/675 champs narratifs renseignés. Les traductions non françaises ont été produites automatiquement et méritent une relecture éditoriale.
- Le sélecteur expose maintenant le chinois simplifié; ses textes d’interface, métadonnées, classes, ennemis, routes et trophées sont raccordés au catalogue.
- Le README décrit désormais le projet et son lancement. Les idées musicales ont été déplacées dans `audio/ROADMAP.md`; les textes des réglages audio correspondent aux dix fichiers présents.
- Les scènes sont maintenant ramifiées après des choix clés; les anciennes sauvegardes sont complétées avec une branche vide et conservent leur progression.
- `tools/qa/build-translation-catalog.mjs` valide le catalogue et régénère le script navigateur; `tools/qa/check-translations.mjs` audite les six langues. Les entrées datées ci-dessous décrivent l’état historique à leur date et ne remplacent pas cette synthèse.

## 2026-10-21 — Version 2.2, démo RPG

1. Copie de travail créée dans `Version 2.2`; le projet source n’est pas modifié. Clés `localStorage` séparées pour éviter le partage accidentel de progression.
2. Ajout d’une intention ennemie lisible et d’une frappe puissante prévisible tous les trois tours. L’action « Attendre » est remplacée par une défense réduisant de 60 % les dégâts du coup reçu.
3. Ajout de deux potions par partie, d’une récupération au repos et d’une limite de trois potions.
4. Les boss récompensent le héros avec une arme ou une armure améliorée; l’équipement apparaît sur la fiche du héros.
5. Le chapitre II propose la quête du cartographe spectral : découvrir cinq routes distinctes pour obtenir une boussole (+2 ATQ). Les routes choisies modifient aussi les boss rencontrés.
6. Recalibrage de la compétence de l’Artificier : dégâts égaux à trois fois l’attaque, plafonnés à 45 % des PV maximum d’un boss. Textes des classes mis à jour dans le catalogue multilingue.
7. Cette démo n’ajoute pas encore de scènes narratives alternatives. Aucun test de jeu sur téléphone réel n’a été effectué dans cette passe.

## 2026-10-21 — Parcours mobile et trophée des routes

1. Amélioration des styles pour petits écrans : portrait et paysage, commandes accessibles au toucher, prise en compte des encoches, disposition compacte en paysage, titre ajusté aux téléphones étroits et indicateur de focus visible.
2. Actualisation de la référence CSS pour éviter le cache navigateur et ajout d’instructions de lancement sur téléphone dans le README.

## 2026-10-21 — Sac à dos et bonus cumulables

1. Ajout d’un bouton 🎒 Inventaire accessible pendant les scènes et les combats. Le panneau affiche les objets équipés et rangés, avec une commande pour équiper ou déséquiper chacun.
2. Les bonus de toutes les armes, armures et reliques équipées s’additionnent. Les récompenses de boss sont ajoutées au sac et équipées automatiquement; elles ne remplacent plus les bonus précédents. Déséquiper une pièce d’armure recalcule les PV max et ajuste les PV courants si nécessaire.
3. Le bonus de la boussole runique du chapitre II utilise le même inventaire. Les anciennes sauvegardes convertissent leur équipement actuel en objets équipés au chargement; les statistiques de base restent séparées des bonus d’équipement pour que les niveaux continuent de progresser correctement.
4. Textes du sac ajoutés en français, anglais, allemand, espagnol, polonais et chinois simplifié. Interface du sac adaptée aux petits écrans et commandes d’au moins 44 px sur mobile.
5. Vérification navigateur : butin du premier boss (+1 ATQ), puis du deuxième (+5 PV max); objets visibles ensemble dans le sac. Déséquiper l’armure passe de 146 à 141 PV max, la rééquiper revient à 146; équiper/déséquiper l’arme passe de 29 à 28 ATQ puis revient à 29. Rechargement et reprise de sauvegarde conservent l’objet équipé. `node --check app.js` passe.

## 2026-10-21 — Progression RPG et scènes à embranchements

1. Les butins de boss disposent de raretés Commun, Rare, Épique et Légendaire qui modifient leurs bonus. Les armes rares et supérieures peuvent infliger des coups critiques; les armures réduisent chaque frappe et les reliques améliorent les soins de potion. L’inventaire affiche rareté et effet, et sauvegarde les nouvelles propriétés; les anciens objets sont convertis en objets communs sans effet spécial.
2. Ajout d’un bouton Compétences et d’un arbre à trois voies : Lame affûtée (+2 ATQ/rang), Gardien (+5 PV max et −1 dégât reçu/rang) et Alchimie (+5 PV/potion/rang). Chaque passage de niveau attribue un point; chaque voie a trois rangs et l’arbre est traduit dans les six langues.
3. Les choix Oui/Non des étapes clés enregistrent leur branche. À l’étape suivante, les textes narratifs varient selon le chapitre et le choix; le dernier choix donne un épilogue propre à chaque chapitre. Le choix final et les branches précédentes persistent dans la sauvegarde.
4. `README.md` actualisé. La progression reste dans la copie expérimentale 2.2; aucun fichier du jeu de base n’a été modifié.

## 2026-10-21 — Arbre de compétences graphique

1. Remplacement des trois compteurs linéaires par un graphe vertical à trois voies. Chaque voie présente trois nœuds reliés, avec rangs appris, prochain nœud disponible, prérequis verrouillés et coût en points.
2. Les neuf nœuds ont chacun leur propre effet de jeu : dégâts, chance critique, vol de vie, statistiques défensives, soin en défense, survie à un coup fatal, potion améliorée, capacité de potion et renforcement de la prochaine attaque.
3. Les effets sont reliés aux calculs de combat et de repos. Les points sont gagnés à chaque niveau, les rangs sont persistés; les anciennes sauvegardes restent compatibles avec les rangs déjà acquis.
4. Graphe adapté aux petits écrans : trois colonnes sur ordinateur, voies empilées et défilables sur téléphone. Noms, descriptions, états et messages d’effet localisés en six langues.

## 2026-10-22 — Progression des compétences sur trois chapitres

1. Rang I accessible au chapitre I, rang II réservé au chapitre II et rang III au chapitre III. L’arbre indique le chapitre requis pour chaque nœud verrouillé.
2. Les rangs maîtrisés sont mémorisés dans le profil pour chaque classe. Au lancement d’une nouvelle aventure de cette classe, les maîtrises acquises sont récupérées jusqu’au rang autorisé par le chapitre; les points d’évolution restent liés à la partie.
3. Les achats de compétences sont immédiatement enregistrés dans le profil et la sauvegarde. Les anciennes parties sont reprises, leurs rangs plafonnés au chapitre courant et leurs maîtrises retenues pour la suite.
4. Textes de progression des chapitres localisés en six langues; README actualisé.

## 2026-10-21 — Identification de la copie 2.2

1. Le menu titre affiche désormais le badge « VERSION 2.2 · RPG EDITION », visible dès le lancement.
2. Le dossier de base `Version 2 test` propose une configuration VS Code « Open Version 2.2 (experimental copy) » qui ouvre directement l’index de la copie; le jeu de base n’a pas été modifié.
3. Le README précise où trouver la configuration et quels changements observer pendant un combat.
3. Correction du suivi des routes du chapitre II : la partie conserve désormais les chemins choisis dans `chapterRoutes`; à la fin du chapitre, ils sont ajoutés sans doublon au profil et alimentent le trophée « Marcheur des chemins ». Les sauvegardes antérieures sont reprises avec une route connue comme point de départ.
4. Vérification sur appareil iOS/Android réel non effectuée dans cette passe. Les traductions automatiques n’ont pas fait l’objet d’une relecture native.

## 2026-10-21 — Correction du lancement VS Code

1. Remplacement du chemin absolu obsolète `C:\Users\Dufour\...` dans `.vscode/launch.json` par `${workspaceFolder}/index.html`, afin que la configuration « Open index.html » fonctionne quel que soit le nom du compte Windows.
2. Ajout d’une note de lancement VS Code au README.

## 2026-10-08 — Reprise de la traduction, du bestiaire et de la maintenance
1. Inspection du projet : moteur navigateur dans `app.js`, données dans `story-data.js`, catalogues multilingues dans `translations.js`, portraits SVG dans `assets/enemies/`.
2. Vérification du correctif précédent : le choix narratif « Non » ne retire pas de PV.
3. Création du portrait `assets/enemies/zombie-v2.svg`, puis des illustrations v2 pour les autres ennemis et boss. Elles sont des illustrations SVG 2D, pas des modèles 3D photoréalistes.
4. Ajout d'`ENEMY_ART` et de `BOSS_ART` pour relier les boss des trois chapitres à leurs portraits; les champs `asset` des boss des chapitres II et III ont été basculés vers les versions v2.
5. Chargement des fichiers autonomes de traductions espagnole et polonaise du chapitre I depuis `index.html`, puis raccordement de leurs 50 lignes au catalogue `translations.js`.
6. Ajout d'un compteur des champs narratifs qui restent identiques au français dans `TF_TRANSLATION_GAPS`; il ne transforme pas le français en traduction.
7. Dernière passe de libellés génériques dans l'interface, ajoutée à la fin de `app.js` pour DE/ES/PL/EN.

## État connu — traductions
- 225 événements (question + deux réponses), soit 675 champs narratifs. Anglais : 0 champ source/manquant. Allemand : 585/675 champs encore français (I/II/III : 120/195/270). Espagnol et polonais : 465/675 chacun (I/II/III : 0/195/270).
- Le jeu est en français par défaut; les portraits SVG sont illustratifs 2D, pas 3D photoréalistes.

## QA exécutée pendant le rangement
- `node --check` passe pour le moteur, les données, les traductions et les scripts QA.
- Les 21 portraits SVG passent la validation racine/viewBox; tous les 16 chemins d'assets référencés existent.
- Le navigateur charge la page et les cinq scripts (aucun script en échec, aucune erreur console, aucune requête ratée).
- Le parcours interactif nouvelle partie/réponse « Non » confirme PV avant/après identiques (15/15) et aucune exception.
- Les URL de combat boss valident l'image (480×360) et le libellé de décor a été traduit au lieu d'afficher le titre anglais.

## Suite recommandée
1. Compléter les 585 champs DE, 465 ES et 465 PL qui restent français.
2. Envisager ultérieurement de vrais rendus 3D générés depuis des fichiers d'image externes; l'art local SVG demeure 2D.
3. Garder `tools/qa/` pour réexécuter les audits; `qa-screenshots/` contient les captures navigateur.


## Suite — ordre réellement appliqué le 2026-10-08
8. Création de portraits SVG supplémentaires sous `assets/enemies/*-v2.svg` pour gobelin, rat, squelette, pillard, Jack Chistophe, Yhorm, Lothric/Lorian, Ilyan et le Roi sans nom. Création d'un portrait zombie v3 et branchement des portraits dans `ENEMY_ASSETS` / `ENEMY_ART`.
9. Mise à jour des `asset` des boss du chapitre II et III dans `story-data.js` vers les portraits v2.
10. Les catalogues espagnol et polonais du chapitre I sont désormais chargés avant `translations.js` dans `index.html`; la fin de `translations.js` les sélectionne s'ils contiennent bien 50 événements chacun.
11. Le journal a été enrichi des étapes; les images sont des SVG illustratifs dessinés par gradients et chemins. Ce ne sont toujours pas des rendus 3D photoréalistes.

## Points bloquants constatés pendant le contrôle
- Certains SVG ont été écrits avec un `viewBox` erroné (`0 480 360`) et l'un d'eux avait initialement un commentaire hors de la balise SVG. Ils doivent être corrigés et tous les fichiers analysés comme XML avant de les déclarer utilisables.
- Des SVG définissent des identifiants `id` génériques (`b`, `h`, `blur`, etc.). Les `filter`/`url(#id)` d'un SVG externe sont locaux au document en usage normal; malgré tout, tester chaque illustration réellement rendue est requis.
- `translations.js` conserve une mesure des lacunes uniquement pour les langues DE/ES/PL; son bloc d'installation des traductions externes doit être après le chargement des deux scripts externes. Ne pas remplacer les textes manquants par le français en prétendant avoir une traduction complète.
- Il reste une partie importante des traductions de l'histoire et des catégories de l'interface à compléter; la « normalisation » de tableaux ne vaut pas traduction.
- Le serveur de test local a été lancé sur le port 8123. Les scripts temporaires `_serve.cjs`, `_diag.mjs`, `_check-art.mjs` et les captures PNG doivent être retirés une fois la QA finie.


## Entrée suivante — 2026-10-08
12. Audit automatisé du catalogue narratif : anglais 0/675 champs manquants; allemand 585/675 champs encore source; espagnol 465/675; polonais 585/675. En chapitre I, allemand et polonais ont chacun 120/150 champs source restés en français; l'espagnol a 0/150 champs source restés français. Chapitres II et III : aucun des catalogues DE/ES/PL n'est complet.
13. Correction de `viewBox` sur `assets/enemies/roi-sans-nom-v2.svg` et déplacement d'une note de texte hors du SVG zombie dans le document lui-même.
14. Résolution prudente du projet : les formes « non-anglais » étaient majoritairement encore françaises, elles ne sont donc pas annoncées comme traduites. Toute poursuite doit traduire les 585/465/585 champs listés avant l'achèvement.


## Réorganisation et vérification finale — 2026-10-08
- Racine réduite à 8 fichiers métier; traductions détachées dans `translations/`, illustrations dans `assets/enemies/`, outils QA dans `tools/qa/`, captures dans `qa-screenshots/`.
- `index.html`, guide développeur et scripts de QA mis à jour pour les nouveaux chemins.
- Le script d'assets valide les références vers les versions améliorées v2; les images originales sont conservées comme repli.
- Traduction de libellés de décor de rencontre et correction du cadrage portrait dans l'interface de combat.
- QA : navigateur sans erreurs de chargement; réponse Non laisse les PV à 15/15; SVG référencés disponibles. La route repos conserve l'étape, soigne et montre la fin alternative à la limite.
- Les traductions de l'histoire restent incomplètes : EN 0/675 champs restants, DE 585, ES 465 et PL 465.
- Les illustrations sont en SVG/2D; aucun véritable rendu 3D photoréaliste n'a été créé.


## Repos et parcours — 2026-10-08
1. Ajout d'un bouton « Se reposer » à une scène hors combat : restaure 35 % des PV max (minimum 4 PV), plafonné au maximum, sans faire avancer l'étape.
2. Le compteur de repos est conservé dans la sauvegarde. Trois repos sont acceptés; le repos suivant affiche une fin alternative expliquant que le boss a conquis le royaume.
3. Textes du repos prévus pour FR/EN/DE/ES/PL et style distinct pour le bouton.
4. QA navigateur : l'étape reste identique, les PV ne baissent pas et la fin alternative s'affiche sans erreur. Le sélecteur ES et le choix Non restent testés sans exception.

## Reprise — 2026-10-11
- Lecture du journal et vérification de l'état réel des traductions narratives avec `node tools/qa/check-translations.mjs` : EN 0/675 champs manquants; DE 585/675; ES 465/675; PL 465/675.
- Reprise du travail interrompu : `tools/qa/translate-missing-fields.mjs` contient le mécanisme de traduction automatique et de checkpoint, mais son exécution a échoué immédiatement sur une réponse HTTP 429 (limitation du service). Aucun fichier `translations/*-events.json` n'a été généré; le catalogue du jeu n'a donc pas été modifié.
- `node tools/qa/check-game.mjs` termine avec le code 0. Pour poursuivre les traductions, il faudra reprendre le script quand le service ne limite plus les requêtes, ou fournir/revoir des traductions autrement; ne pas annoncer de complétion avant une nouvelle vérification.

## Reprise interrompue — 2026-10-11 (à reprendre)
- Tentative de compléter les traductions du chapitre II et III à partir des catalogues présents dans `translations/chapter2-de-es-pl.js` et `translations/chapter3-de-es-pl.js`. Les fichiers ont été modifiés, mais les contrôles ont révélé qu'ils ne sont pas prêts à intégrer : les tableaux du chapitre II ont des doublons/blocs incohérents; le chapitre III ES/PL ne contient que 100 lignes chacun au lieu de 105, avec au moins une ligne polonaise malformée au milieu. Ne pas les charger/utiliser avant réparation.
- Tentative d'intégration prévue dans `index.html` / `translations.js`; elle n'a pas été terminée ni validée. Vérifier leur état avant tout nouvel edit. En particulier, inspecter et supprimer les changements partiels de chargement éventuels dans `index.html` et le code de raccordement ajouté à la fin de `translations.js`, puis ne garder que l'intégration une fois les catalogues réparés et audités.
- Compatibilité mobile commencée : `style.css` a reçu des ajustements viewport dynamique (`100dvh` avec repli), zone sûre iPhone, inertie de défilement et cibles tactiles d'au moins 44 px; `index.html` a reçu `viewport-fit=cover` et les métadonnées web-app mobiles. Ces changements ne sont pas encore testés dans un navigateur mobile réel.
- Vérifications syntaxiques isolées passées pour les deux fichiers de traduction, mais validation des données échouée/incomplète : chapitre II déclare 75 lignes pour DE/ES/PL dans le premier bloc, chapitre III ne compte que 100 lignes pour ES/PL. L'audit intégré `node tools/qa/check-translations.mjs` et le jeu ne sont pas encore exécutés après ces changements.
- À la reprise : d'abord remettre les catalogues de traduction en cohérence (105 lignes par langue au chapitre III, vérifier chaque ligne `[texte, oui, non]` et l'absence de répliques FR), intégrer proprement, mettre à jour l'audit des traductions, puis lancer `node tools/qa/check-translations.mjs`, `node tools/qa/check-game.mjs` et QA navigateur. Ensuite reprendre la vérification mobile responsive.


## 2026-10-24 — Améliorations progressives (passe 1 : repos et QA)

1. Clarification du comportement des repos : la limite de trois repos reste inchangée et le repos suivant ne doit plus provoquer une défaite instantanée. Après épuisement des repos, le bouton affiche une confirmation avant de déclencher la fin alternative; annuler ne consomme aucun repos. Le repos au maximum de PV reste une action consommant un repos, et doit être expliqué dans son texte d’aide.
2. Mise à jour du test `tools/qa/check-rest.mjs` pour contrôler la confirmation, l’annulation et l’absence de consommation/défaite avant confirmation.
3. Vérifications de cette étape à consigner après implémentation : tests navigateur `check-rest` et `check-rest-ending`, syntaxe, autres tests de régression.

## Plan de suivi — étapes suivantes
- Passe 2 : vérifier l’alignement entre les noms, descriptions et seuils réels des trophées de niveau dans les six langues; conserver les IDs historiques pour préserver les profils enregistrés.
- Passe 3 : renforcer la validation des clés d’interface dans le générateur du catalogue de traduction, y compris les compléments de `translations/ui-patches.json`.
- Passe 4 : découper prudemment le combat en helpers testables, puis ajouter des assertions QA sur les résultats de combat et les invariants de sauvegarde.
- Passe 5 : seulement après ces tests, faire une passe UI responsive/accessibilité et un équilibrage documenté par parcours réel; noter explicitement toute vérification non faite.
