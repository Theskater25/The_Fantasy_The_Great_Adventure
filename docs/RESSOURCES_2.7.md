# Ressources graphiques — 2.7

Les PNG sont copiés à l’identique. Le moteur affiche des portions des planches par CSS : aucune découpe destructive, aucun recoloriage ou rééchantillonnage enregistré dans les images.

## Personnages et objets du joueur

20 personnages créés par le joueur avec SpriteLab, et 5 planches de 9 éléments. Le fichier `a_fullbody_sprite (15).png` est un doublon strict du Rōnin `(14)` ; seul le premier est intégré.

Les coordonnées des 45 éléments sont conservées dans `game/assets/atlases/manifest.json`. Les armes suivent la classe ; les armures suivent le type de classe et la rareté ; la boussole de quête possède son illustration dédiée. Les objets d’aventure servent aussi aux icônes de lieux et de menus. Ces illustrations n’ajoutent pas de nouveaux effets de jeu.

## CraftPix

12 fonds sélectionnés dans les packs gratuits fournis. La licence incluse dans les archives renvoie à [CraftPix File Licenses](https://craftpix.net/file-licenses/), section « Freebie Products », consultée le 12 novembre 2026. Usage dans les jeux personnels et commerciaux autorisé ; les images ne sont pas proposées comme une banque d’images à télécharger. Les archives complètes, leurs documents promotionnels et les fichiers de travail ne sont pas ajoutés au jeu.

Les variantes non retenues restent dans les téléchargements d’origine. Les aperçus présentant un damier visible dans le ciel ont été écartés. Les images retenues sont listées avec leur archive, leur chemin interne et leur SHA256 dans [asset-manifest-v27.json](asset-manifest-v27.json).

## Legacy Collection — Luis Zuno / Ansimuz

Deux fonds Gothicvania : forêt brumeuse et lave. Licence CC0 mentionnée explicitement dans [le document fourni dans l’archive](ansimuz-license.pdf). Auteur : Luis Zuno, alias Ansimuz ; https://ansimuz.itch.io/.

## Vérification des copies

39 images ajoutées, chacune contrôlée par SHA256 après intégration. L’outil `game-dev` n’étant pas installé et ces fichiers n’étant pas des paquets canoniques Game Development Studio, la vérification a été réalisée avec un inventaire local des sources et une comparaison des octets. Il ne s’agit pas d’un reçu `game-dev vendor admit`.
