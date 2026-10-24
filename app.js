/* The Fantasy V2 — moteur navigateur et interface */
const CONTENT = window.TF_CONTENT;
const TRANSLATIONS = window.TF_TRANSLATIONS || {};
const SAVE_KEY = "the-fantasy-version-2-2-save";
const STORY_VERSION = CONTENT.storyVersion;
const CHAPTERS = CONTENT.chapters;
const DECOR_ICONS = {
  Village: "⌂", Bibliotheque: "▤", Rue: "⌁", Foret: "♧", Pont: "═", Riviere: "≈", Cimetiere: "✝",
  Potion: "⚗", Pas: "⋮", Dragon: "◈", Autel: "✧", Enfant: "◇", Arbre: "♣", Coffre: "▣", Assassin: "◉",
  Sentier: "➶", Ferme: "⌂", Quake: "≋", Pierre: "◆", Golem: "⬟", Chemin: "╱", Tour: "♜", Cascade: "≋",
  Croix: "✚", Nuage: "☁", Raven: "♠", Ossements: "☠", Armure: "♢", Carte: "▧", Nuit: "☾", Porte: "▯",
  Donjon: "▥", Peur: "!", Grotte: "⌂", livre: "▤", Fantome: "◌", Feu: "♨", Rune: "✦", Secret: "?",
  Portail: "◎", Artefact: "✧",
};
const ENEMY_ASSETS = {
  "Zombie": "assets/enemies/zombie-v3.svg",
  "Squelette": "assets/enemies/skeleton-v3.svg",
  "Groupe de pillard": "assets/enemies/raider-v3.svg",
  "Goblin": "assets/enemies/goblin-v3.svg",
  "Rat": "assets/enemies/rat-v3.svg",
  "Jack Chistophe, Prêtre de l'Evangile de l'Eglise Ulmer Münster": "assets/enemies/jack-chistophe-v3.svg",
  "Yhorm le Géant": "assets/enemies/yhorm-v3.svg",
  "Lothric, Prince cadet et Lorian, Prince aîné": "assets/enemies/lothric-v3.svg",
  "Ilyan, L'indompteur sanguinaire de la Tricky Tower de Dieuv": "assets/enemies/ilyan-v3.svg",
  "Le Roi sans Nom": "assets/enemies/roi-sans-nom-v3.svg",
};
const ENEMY_ART = {
  zombie: ENEMY_ASSETS.Zombie,
  skeleton: ENEMY_ASSETS.Squelette,
  raider: ENEMY_ASSETS["Groupe de pillard"],
  goblin: ENEMY_ASSETS.Goblin,
  rat: ENEMY_ASSETS.Rat,
  priest: ENEMY_ASSETS["Jack Chistophe, Prêtre de l'Evangile de l'Eglise Ulmer Münster"],
  giant: ENEMY_ASSETS["Yhorm le Géant"],
  princes: ENEMY_ASSETS["Lothric, Prince cadet et Lorian, Prince aîné"],
  hunter: ENEMY_ASSETS["Ilyan, L'indompteur sanguinaire de la Tricky Tower de Dieuv"],
  king: ENEMY_ASSETS["Le Roi sans Nom"],
  ash: ENEMY_ASSETS["Ilyan, L'indompteur sanguinaire de la Tricky Tower de Dieuv"],
  mirage: ENEMY_ASSETS["Lothric, Prince cadet et Lorian, Prince aîné"],
  infernalSmith: ENEMY_ASSETS["Yhorm le Géant"],
  abyssPrince: ENEMY_ASSETS["Jack Chistophe, Prêtre de l'Evangile de l'Eglise Ulmer Münster"],
  demonKing: ENEMY_ASSETS["Le Roi sans Nom"],
  frostArcher: ENEMY_ASSETS.Squelette,
  clanChampion: ENEMY_ASSETS["Groupe de pillard"],
  rootWyrm: ENEMY_ASSETS["Yhorm le Géant"],
  stormSerpent: ENEMY_ASSETS["Ilyan, L'indompteur sanguinaire de la Tricky Tower de Dieuv"],
  eivor: ENEMY_ASSETS["Le Roi sans Nom"],
};

const BOSS_ART = [
  { test: /Jack Chistophe/, art: ENEMY_ART.priest },
  { test: /Yhorm|Forgeron infernal|Gardien des Cendres|Níðhöggr/i, art: ENEMY_ART.giant },
  { test: /Lothric|Lorian|Reine des Mirages|Prince des Abysses|Skadi/i, art: ENEMY_ART.princes },
  { test: /Ilyan|Eivor|Jarl Hrafn|Fenrir/i, art: ENEMY_ART.hunter },
  { test: /Roi sans Nom|Azharkan|roi du Nord/i, art: ENEMY_ART.king },
];
const TROPHY_TIERS = {
  bronze: { labelKey: "bronze", icon: "🥉" },
  silver: { labelKey: "silver", icon: "🥈" },
  gold: { labelKey: "gold", icon: "🥇" },
  platinum: { labelKey: "platinum", icon: "◆" },
};
const CAMPAIGN_TEXT = {
  fr: { continueCampaign: "Continuer la campagne →", campaignTransition: "La route vers le chapitre {chapter} s’ouvre. Ton héros, son niveau, ses compétences et son équipement te suivent. Le camp restaure la moitié de tes PV et une potion.", chapterName1: "I", chapterName2: "II", chapterName3: "III", bossCounterMirror: "Le boss observe votre style : il pare votre prochaine attaque critique.", bossCounterBreaker: "Le boss a adapté son armure : sa prochaine frappe lourde perce la défense.", bossCounterHex: "Le boss a corrompu vos fioles : la prochaine potion soigne moins.", bossSupply: "Vous récupérez {heal} PV; le butin restaure une potion si votre sac a de la place." },
  en: { continueCampaign: "Continue campaign →", campaignTransition: "The road to Chapter {chapter} opens. Your hero, level, skills, and equipment carry over. Camp restores half your HP and one potion.", chapterName1: "I", chapterName2: "II", chapterName3: "III", bossCounterMirror: "The boss studies your style: it guards against your next critical attack.", bossCounterBreaker: "The boss adapts its armor: its next heavy strike pierces your defense.", bossCounterHex: "The boss corrupts your flasks: your next potion heals less.", bossSupply: "You recover {heal} HP; the spoils restore one potion if your satchel has room." },
  de: { continueCampaign: "Kampagne fortsetzen →", campaignTransition: "Der Weg zu Kapitel {chapter} öffnet sich. Held, Stufe, Fähigkeiten und Ausrüstung bleiben erhalten. Das Lager heilt die Hälfte deiner LP und gibt einen Trank.", chapterName1: "I", chapterName2: "II", chapterName3: "III", bossCounterMirror: "Der Boss studiert deinen Stil und schützt sich vor deinem nächsten kritischen Treffer.", bossCounterBreaker: "Der Boss passt seine Rüstung an: Sein nächster schwerer Schlag durchdringt deine Verteidigung.", bossCounterHex: "Der Boss verdirbt deine Fläschchen: Dein nächster Trank heilt weniger.", bossSupply:"Du erhältst {heal} LP zurück; die Beute füllt einen Trank auf, wenn dein Beutel Platz hat." },
  es: { continueCampaign: "Continuar campaña →", campaignTransition: "Se abre el camino al capítulo {chapter}. Conservas héroe, nivel, habilidades y equipo. El campamento restaura la mitad de tus PV y una poción.", chapterName1: "I", chapterName2: "II", chapterName3: "III", bossCounterMirror: "El jefe estudia tu estilo y se protege de tu próximo golpe crítico.", bossCounterBreaker: "El jefe adapta su armadura: su próximo golpe pesado atraviesa tu defensa.", bossCounterHex: "El jefe corrompe tus frascos: tu próxima poción cura menos.", bossSupply:"Recuperas {heal} PV; el botín repone una poción si tu bolsa tiene espacio." },
  pl: { continueCampaign: "Kontynuuj kampanię →", campaignTransition: "Droga do rozdziału {chapter} stoi otworem. Zachowujesz bohatera, poziom, umiejętności i ekwipunek. Obóz przywraca połowę PŻ i jedną miksturę.", chapterName1: "I", chapterName2: "II", chapterName3: "III", bossCounterMirror: "Boss poznaje twój styl i osłania się przed następnym trafieniem krytycznym.", bossCounterBreaker: "Boss dostosowuje zbroję: jego następny ciężki cios przebije obronę.", bossCounterHex: "Boss zatruwa fiolki: następna mikstura leczy mniej.", bossSupply:"Odzyskujesz {heal} PŻ; łup uzupełnia miksturę, jeśli w sakwie jest miejsce." },
  "zh-CN": { continueCampaign: "继续战役 →", campaignTransition: "通往第 {chapter} 章的道路开启。英雄、等级、技能和装备都会保留。营地恢复一半生命并补充一瓶药水。", chapterName1: "一", chapterName2: "二", chapterName3: "三", bossCounterMirror: "首领研究了你的战斗方式：它会防御你的下一次暴击。", bossCounterBreaker: "首领调整了护甲：下一次重击将穿透防御。", bossCounterHex: "首领污染了药剂：下一瓶药水的治疗效果降低。", bossSupply:"恢复{heal}点生命；背包有空间时，战利品会补充一瓶药水。" },
};
const BOSS_COMBAT_TEXT = {
  fr: { bossGuardIntent:"Garde levée · dégâts réduits", bossPiercingIntent:"Frappe perforante", bossCorruptIntent:"Frappe corruptrice · prochaine potion affaiblie", bossAdaptGuard:"Le boss bloque une partie de votre frappe.", bossPotionWeakened:"La fiole corrompue soigne moins." },
  en: { bossGuardIntent:"Guard raised · reduced damage", bossPiercingIntent:"Piercing strike", bossCorruptIntent:"Corrupting strike · next potion weakened", bossAdaptGuard:"The boss blocks part of your strike.", bossPotionWeakened:"The corrupted flask restores less." },
  de: { bossGuardIntent:"Deckung · weniger Schaden", bossPiercingIntent:"Durchdringender Schlag", bossCorruptIntent:"Verderbender Schlag · nächster Trank geschwächt", bossAdaptGuard:"Der Boss blockt einen Teil deines Schlages.", bossPotionWeakened:"Der verdorbene Trank heilt weniger." },
  es: { bossGuardIntent:"Guardia alzada · daño reducido", bossPiercingIntent:"Golpe perforante", bossCorruptIntent:"Golpe corruptor · próxima poción debilitada", bossAdaptGuard:"El jefe bloquea parte de tu golpe.", bossPotionWeakened:"La poción corrompida restaura menos." },
  pl: { bossGuardIntent:"Uniesiona garda · mniejsze obrażenia", bossPiercingIntent:"Przebijający cios", bossCorruptIntent:"Korumpujący cios · następna mikstura osłabiona", bossAdaptGuard:"Boss blokuje część twojego ciosu.", bossPotionWeakened:"Skażona mikstura leczy słabiej." },
  "zh-CN": { bossGuardIntent:"首领防御中 · 伤害降低", bossPiercingIntent:"穿透重击", bossCorruptIntent:"腐化攻击 · 下一瓶药水效果减弱", bossAdaptGuard:"首领挡下了部分攻击。", bossPotionWeakened:"被污染的药水恢复效果降低。" },
};
const TREASURE_PATHS = {
  frontiere: "Vous arrivez aux portes des terres brûlées",
  cendres: "Vous suivez la voie des cendres",
  oubli: "Vous progressez par le sentier de l'oubli",
  forge: "Vous rejoignez la route des forges infernales",
  marais: "Vous vous enfoncez dans les marais noirs",
  forteresse: "Vous remontez vers les anciennes forteresses",
  catacombes: "Vous descendez vers les catacombes royales",
  couronne: "Vous marchez sous le signe de la couronne noire",
  abime: "Vous frôlez le bord des Abysses",
  treasure: "Vous approchez du trésor du Roi démon",
  sacrifice: "Vous avancez sur la voie du sacrifice",
};
const NORDIC_PATHS = {
  fjord: "Vous longez les fjords du dernier royaume",
  hiver: "Vous avancez dans le royaume de glace",
  runes: "Vous suivez la piste des runes anciennes",
  clans: "Vous marchez sous les bannières des clans",
  jarl: "Vous infiltrez la cour du jarl",
  mer: "Vous traversez la mer du Nord",
  tempete: "Vous affrontez la route de la tempête",
  valkyrie: "Vous suivez les signes des valkyries",
  "trône": "Vous approchez du trône du dernier roi",
};
const VILLAGE_PATHS = {
  village: "Vous progressez au cœur du Village oublié",
  brume: "Vous suivez la route noyée dans la brume",
  forêt: "Vous vous enfoncez dans la forêt des murmures",
  rivière: "Vous longez la rivière noire",
  montagne: "Vous grimpez vers la montagne ancestrale",
  secret: "Vous empruntez les passages secrets des anciens gardiens",
  relique: "Vous approchez de la relique ancestrale",
};
const AUDIO_TRACKS = {
  menu: "audio/dziiten-adventures-loop-music-226836.mp3",
  chapter1: "audio/studiokolomna-sunrise-114326.mp3",
  chapter2: "audio/enlia-the-way-of-the-samurai-background-music-loop-593020.mp3",
  chapter3: "audio/rlxmusic24-relaxing-music-original-viking-attacking-battle-horn-116623.mp3",
  battle: "audio/magiaz-swords-423819.mp3",
};
const AUDIO_AMBIENTS = {
  birds: "audio/zehendrew-birds-chirping-calm-173695.mp3",
  forest: "audio/soundreality-forest-sound-576537.mp3",
  sakura: "audio/ethnicsoundscapes-sakura-japanese-folk-song-313495.mp3",
  sea: "audio/freesound_community-rowrow-105489.mp3",
};
const AUDIO_SFX = {
  hit: "audio/u_xjrmmgxfru-hit-flesh-02-266309.mp3",
};
const SETTINGS_KEY = "the-fantasy-version-2-2-settings";
const PROFILE_KEY = "the-fantasy-version-2-2-achievements";
const MAX_RESTS_PER_CHAPTER = 3;
const DEFAULT_SETTINGS = { language: "en", display: "standard", music: true, motion: true, volume: 70 };
const UI_TEXT = {
  fr: {
    chooseNotAct: "Vous choisissez de ne pas agir.", chooseToAct: "Vous choisissez d'agir. +7 EXP.", noEnemiesYet: "Vous avancez sans rencontrer d'ennemis pour l'instant.",
    usesSkill: "Vous utilisez {skill} : {description}", monkCritical: "Coup critique du deuxième coup !", monkStuns: "Le troisième coup étourdit l'ennemi !", comboDamage: "Votre enchaînement inflige", necromancerDrain: "Vous drainez {damage} PV et récupérez {heal} PV.", jesterCritical: "Coup critique du chaos : {damage} dégâts !", missedAttack: "Vous ratez complètement votre attaque...", chaosHurt: "Oups ! Le chaos vous blesse.", enemyLaughs: "L'ennemi est mort de rire et ne peut pas attaquer !", iaijutsuDamage: "Iaijutsu tranche l'air : {damage} dégâts !", shikigamiDamage: "Votre shikigami inflige {damage} dégâts et fige l'ennemi.", purification: "La purification inflige {damage} dégâts et restaure {heal} PV.", bearRage: "La Rage de l'ours inflige {damage} dégâts !", valkyrieHeal: "Les ailes de Freyja infligent {damage} dégâts et restaurent {heal} PV.", runeProphecy: "La prophétie des runes inflige {damage} dégâts et gèle l'ennemi.", skaldInspires: "Votre saga de guerre étourdit l'ennemi et inspire votre prochaine frappe.", oldSave: "Cette sauvegarde appartient à l'ancien prototype. Lancez une nouvelle partie pour découvrir la trame complète.", steps: "étapes", playerAttacks: "Vous attaquez et infligez", playerWaits: "Vous attendez : l'ennemi aura l'occasion de vous frapper.", skillAlreadyUsed: "Compétence déjà utilisée ce combat : votre action est perdue.", explosionDamage: "BOOM ! Vous infligez 250 dégâts.", enemyFrozen: "L'ennemi est gelé et ne peut pas attaquer.", enemyStunned: "L'ennemi est étourdi et ne peut pas attaquer.", invincible: "Vous êtes invincible ce tour : aucun dégât subi.", shinobiShadow: "Vous disparaissez dans l'ombre et préparez votre prochaine frappe.", roninStance: "Vous adoptez la posture du contre parfait.", shieldWall: "Votre mur de boucliers absorbe la prochaine attaque.", youAre: "Vous êtes", adventureBegins: "L'aventure commence.", greatAdventure: "LA GRANDE AVENTURE", steps: "étapes", invalidSave: "La sauvegarde est illisible.", continueStory: "Continuer", chooseToAct: "Vous choisissez d'agir. +7 EXP.", noEnemiesYet: "Vous avancez sans rencontrer d'ennemis pour l'instant.", chooseNotAct: "Vous choisissez de ne pas agir.", deathBadDecision: "Vous êtes mort·e à cause d'une mauvaise décision...", adventureEndsBy: "Votre aventure s'arrête ici, vaincu·e par", trophyUnlocked: "Trophée débloqué", experience: "Expérience", heroFallen: "Votre héros est tombé.", chapterFinishedStatus: "Chapitre terminé — votre légende est inscrite.", battleInProgress: "Combat en cours", turn: "tour", treasureStatus: "Vos décisions marquent votre itinéraire, et chaque étape vous rapproche du trésor du Roi démon.", nordicStatus: "Vos choix vous conduisent vers le dernier trône de Norvège.", villageStatus: "L’histoire du Village oublié guide désormais votre prochaine décision.", unnamedHero: "Héros sans nom", dealsYou: "vous inflige", damageShort: "dégâts", isDefeated: "est vaincu !", majorEncounterReward: "Récompense de rencontre majeure :", information: "Information", understood: "Compris", cancel: "Annuler", confirm: "Confirmer", leave: "Quitter", continue: "Continuer", version: "Version", noSave: "Aucune sauvegarde locale n'a encore été créée.", chooseClass: "Choisissez une classe avant de commencer.", backToMenu: "Retour au menu", step: "Étape", hp: "PV", atk: "ATQ", level: "Niveau", heroSheet: "Fiche du héros", adventureJournal: "Journal de l'aventure", enemiesDefeated: "Ennemis vaincus", noneYet: "Aucun pour l'instant", gameOverTitle: "FIN DE L'AVENTURE", heroesBook: "LIVRE DES HÉROS", gameOverText: "Votre destinée s'arrête ici. Le monde se souviendra de votre passage.", completedText: "La quête est achevée. Votre nom rejoint le Livre des héros.", trophyUnlocked: "Trophée débloqué", majorEncounter: "Rencontre majeure", encounter: "Rencontre", exitConfirm: "Quitter cette partie ? La sauvegarde actuelle sera conservée.", trophiesUnlocked: "trophées débloqués", greatAdventure: "LA GRANDE AVENTURE",
    experience: "Expérience", heroFallen: "Votre héros est tombé.", chapterFinishedStatus: "Chapitre terminé — votre légende est inscrite.", battleInProgress: "Combat en cours", turn: "tour", treasureStatus: "Vos décisions marquent votre itinéraire, et chaque étape vous rapproche du trésor du Roi démon.", nordicStatus: "Vos choix vous conduisent vers le dernier trône de Norvège.", villageStatus: "L’histoire du Village oublié guide désormais votre prochaine décision.", unnamedHero: "Héros sans nom", trophyUnlocked: "Trophée débloqué", dealsYou: "vous inflige", damageShort: "dégâts", isDefeated: "est vaincu !", majorEncounterReward: "Récompense de rencontre majeure :", information: "Information", understood: "Compris", cancel: "Annuler", confirm: "Confirmer", leave: "Quitter",
    play: "Jouer", achievements: "Trophées", credits: "Crédits", settings: "Paramètres", leave: "Quitter", back: "Retour",
    chooseChapter: "Choisissez un chapitre", developer: "Développeur", titleSubtitle: "Une légende en trois chapitres",
    display: "Affichage", language: "Langue de l'interface", music: "Musique de fond", motion: "Animations de l'interface",
    volume: "Volume", standard: "Standard · 1280 × 720", compact: "Compact · petits écrans", large: "Large · 1600 × 900",
    fullscreen: "Plein écran", apply: "Appliquer", availableSoon: "L’interface et les contenus du jeu sont disponibles en français.",
    audioNote: "Les pistes audio sont incluses dans le projet. Réglez la musique avec cette option.",
    classesChapter: "Classes disponibles dans ce chapitre", chapterLock: "Terminez le chapitre I sans mourir pour débloquer le chapitre II.", chapter2Lock: "Terminez le chapitre I sans mourir pour débloquer le chapitre II.", chapter3Lock: "Terminez les chapitres I et II sans mourir pour débloquer le chapitre III.", yes: "Oui", no: "Non", attack: "Attaquer", wait: "Attendre", decision: "Votre décision", action: "Votre action", finished: "Chapitre terminé", sealed: "Destin scellé", trophiesUnlocked: "trophées débloqués", bronze: "Bronze", silver: "Argent", gold: "Or", platinum: "Platine", trilogy: "Une trilogie fantastique", resumeStory: "Reprendre la trame originale →", beginAdventure: "Commencer l'aventure →", continue: "Continuer", backToMenu: "Retour au menu", hp: "PV", atk: "ATQ", heroNamePlaceholder: "Nom de votre héros", startChapter: "Lancer le chapitre", enemyType: "Ennemi", bossType: "Boss", heroSheet: "Fiche du héros", adventureJournal: "Journal de l'aventure", level: "Niveau", leaveGame: "Quitter la partie", majorEncounter: "Rencontre majeure", encounter: "Rencontre", enemiesDefeated: "Ennemis vaincus", noneYet: "Aucun pour l'instant", gameOverTitle: "FIN DE L'AVENTURE", heroesBook: "LIVRE DES HÉROS", gameOverText: "Votre destinée s'arrête ici. Le monde se souviendra de votre passage.", completedText: "La quête est achevée. Votre nom rejoint le Livre des héros.", step: "Étape", version: "Version", exitConfirm: "Quitter cette partie ? La sauvegarde actuelle sera conservée.", chooseClass: "Choisissez une classe avant de commencer.", noSave: "Aucune sauvegarde locale n'a encore été créée.", experience: "Expérience", heroFallen: "Votre héros est tombé.", chapterFinishedStatus: "Chapitre terminé — votre légende est inscrite.", battleInProgress: "Combat en cours", turn: "tour", treasureStatus: "Vos décisions marquent votre itinéraire, et chaque étape vous rapproche du trésor du Roi démon.", nordicStatus: "Vos choix vous conduisent vers le dernier trône de Norvège.", villageStatus: "L’histoire du Village oublié guide désormais votre prochaine décision.", unnamedHero: "Héros sans nom", trophyUnlocked: "Trophée débloqué", dealsYou: "vous inflige", damageShort: "dégâts", isDefeated: "est vaincu !", majorEncounterReward: "Récompense de rencontre majeure :", information: "Information", understood: "Compris", cancel: "Annuler", confirm: "Confirmer", leave: "Quitter", attack: "Attaquer",
    trophiesUnlocked: "trophées débloqués", bronze: "Bronze", silver: "Argent", gold: "Or", platinum: "Platine", trilogy: "Une trilogie fantastique", resumeStory: "Reprendre la trame originale →", beginAdventure: "Commencer l'aventure →", continue: "Continuer", backToMenu: "Retour au menu", hp: "PV", atk: "ATQ", heroNamePlaceholder: "Nom de votre héros", startChapter: "Lancer le chapitre", enemyType: "Ennemi", bossType: "Boss", heroSheet: "Fiche du héros", adventureJournal: "Journal de l'aventure", level: "Niveau", fullscreen: "Plein écran", leaveGame: "Quitter la partie", majorEncounter: "Rencontre majeure", encounter: "Rencontre", enemiesDefeated: "Ennemis vaincus", noneYet: "Aucun pour l'instant", gameOverTitle: "FIN DE L'AVENTURE", heroesBook: "LIVRE DES HÉROS", gameOverText: "Votre destinée s'arrête ici. Le monde se souviendra de votre passage.", completedText: "La quête est achevée. Votre nom rejoint le Livre des héros.", step: "Étape", levelUp: "Niveau supérieur ! Vous atteignez le niveau {level}. PV max +5, attaque +1.", version: "Version", exitConfirm: "Quitter cette partie ? La sauvegarde actuelle sera conservée.", chooseClass: "Choisissez une classe avant de commencer.", noSave: "Aucune sauvegarde locale n'a encore été créée.",

  },
  de: {
    chooseNotAct: "Du entscheidest dich, nicht zu handeln.", chooseToAct: "Du entscheidest dich zu handeln. +7 EP.", noEnemiesYet: "Du gehst weiter, ohne vorerst auf Gegner zu treffen.",
    usesSkill: "Du setzt {skill} ein: {description}", monkCritical: "Kritischer Treffer beim zweiten Schlag!", monkStuns: "Der dritte Schlag betäubt den Gegner!", comboDamage: "Deine Kombo verursacht", necromancerDrain: "Du entziehst {damage} LP und stellst {heal} LP wieder her.", jesterCritical: "Kritischer Chaos-Treffer: {damage} Schaden!", missedAttack: "Du verfehlst deinen Angriff völlig …", chaosHurt: "Hoppla! Das Chaos verletzt dich.", enemyLaughs: "Der Gegner lacht so sehr, dass er nicht angreifen kann!", iaijutsuDamage: "Iaijutsu durchschneidet die Luft: {damage} Schaden!", shikigamiDamage: "Dein Shikigami verursacht {damage} Schaden und friert den Gegner ein.", purification: "Die Reinigung verursacht {damage} Schaden und stellt {heal} LP wieder her.", bearRage: "Der Bärenzorn verursacht {damage} Schaden!", valkyrieHeal: "Freyjas Flügel verursachen {damage} Schaden und stellen {heal} LP wieder her.", runeProphecy: "Die Runenprophezeiung verursacht {damage} Schaden und friert den Gegner ein.", skaldInspires: "Deine Kriegssaga betäubt den Gegner und inspiriert deinen nächsten Schlag.", oldSave: "Dieser Spielstand gehört zum alten Prototyp. Starte ein neues Spiel, um die vollständige Geschichte zu erleben.", steps: "Schritte", playerAttacks: "Du greifst an und verursachst", playerWaits: "Du wartest: Der Gegner bekommt eine Gelegenheit, dich anzugreifen.", skillAlreadyUsed: "Fähigkeit in diesem Kampf bereits eingesetzt: Deine Aktion verfällt.", explosionDamage: "BOOM! Du verursachst 250 Schaden.", enemyFrozen: "Der Gegner ist eingefroren und kann nicht angreifen.", enemyStunned: "Der Gegner ist betäubt und kann nicht angreifen.", invincible: "Du bist diese Runde unverwundbar und erleidest keinen Schaden.", shinobiShadow: "Du verschwindest im Schatten und bereitest deinen nächsten Schlag vor.", roninStance: "Du nimmst die Haltung des perfekten Konters ein.", shieldWall: "Deine Schildmauer fängt den nächsten Angriff ab.", youAre: "Du bist", adventureBegins: "Dein Abenteuer beginnt.", greatAdventure: "DAS GROSSE ABENTEUER", steps: "Schritte", invalidSave: "Der Spielstand ist unlesbar.", continueStory: "Fortsetzen", chooseToAct: "Du entscheidest dich zu handeln. +7 EP.", noEnemiesYet: "Du gehst weiter, ohne vorerst auf Gegner zu treffen.", chooseNotAct: "Du entscheidest dich, nicht zu handeln.", deathBadDecision: "Wegen einer schlechten Entscheidung bist du gestorben …", adventureEndsBy: "Dein Abenteuer endet hier, besiegt von", trophyUnlocked: "Trophäe freigeschaltet", experience: "Erfahrung", heroFallen: "Dein Held ist gefallen.", chapterFinishedStatus: "Kapitel abgeschlossen — deine Legende ist geschrieben.", battleInProgress: "Kampf läuft", turn: "Runde", treasureStatus: "Deine Entscheidungen prägen deinen Weg; jede Etappe bringt dich dem Schatz des Dämonenkönigs näher.", nordicStatus: "Deine Entscheidungen führen dich zum letzten Thron Norwegens.", villageStatus: "Die Originalgeschichte des vergessenen Dorfes leitet deine nächste Entscheidung.", unnamedHero: "Namenloser Held", dealsYou: "fügt dir", damageShort: "Schaden zu", isDefeated: "wurde besiegt!", majorEncounterReward: "Belohnung für die Hauptbegegnung:", information: "Information", understood: "Verstanden", cancel: "Abbrechen", confirm: "Bestätigen", leave: "Verlassen", continue: "Fortsetzen", version: "Version", noSave: "Es wurde noch kein lokaler Spielstand erstellt.", chooseClass: "Wähle eine Klasse, bevor du beginnst.", backToMenu: "Zurück zum Menü", step: "Schritt", hp: "LP", atk: "ANG", level: "Stufe", heroSheet: "Heldenprofil", adventureJournal: "Abenteuerjournal", enemiesDefeated: "Besiegte Gegner", noneYet: "Noch keine", gameOverTitle: "ABENTEUER BEENDET", heroesBook: "HELDENBUCH", gameOverText: "Dein Schicksal endet hier. Die Welt wird sich an dich erinnern.", completedText: "Die Quest ist abgeschlossen. Dein Name steht nun im Heldenbuch.", majorEncounter: "Hauptbegegnung", encounter: "Begegnung", exitConfirm: "Dieses Spiel verlassen? Der aktuelle Spielstand bleibt erhalten.", trophiesUnlocked: "Trophäen freigeschaltet", greatAdventure: "DAS GROSSE ABENTEUER", experience: "Erfahrung", heroFallen: "Dein Held ist gefallen.", chapterFinishedStatus: "Kapitel abgeschlossen — deine Legende ist geschrieben.", battleInProgress: "Kampf läuft", turn: "Runde", treasureStatus: "Deine Entscheidungen prägen deinen Weg; jede Etappe bringt dich dem Schatz des Dämonenkönigs näher.", nordicStatus: "Deine Entscheidungen führen dich zum letzten Thron Norwegens.", villageStatus: "Die Originalgeschichte des vergessenen Dorfes leitet deine nächste Entscheidung.", unnamedHero: "Namenloser Held", trophyUnlocked: "Trophäe freigeschaltet", dealsYou: "fügt dir", damageShort: "Schaden zu", isDefeated: "wurde besiegt!", majorEncounterReward: "Belohnung für die Hauptbegegnung:", information: "Information", understood: "Verstanden", cancel: "Abbrechen", confirm: "Bestätigen", leave: "Verlassen",
    play: "Spielen", achievements: "Errungenschaften", credits: "Mitwirkende", settings: "Einstellungen", leave: "Verlassen", back: "Zurück",
    chooseChapter: "Wählen Sie Ihren Kapitel", developer: "Entwickler", titleSubtitle: "Eine Legende über drei Kapitel",
    display: "Anzeige", language: "Oberflächensprache", music: "Hintergrundmusik", motion: "Oberflächenanimationen",
    volume: "Lautstärke", standard: "Standard · 1280 × 720", compact: "Kompakt · Kleine Bildschirme", large: "Groß · 1600 × 900",
    fullscreen: "Vollbild", apply: "Anwenden", availableSoon: "Die Spieloberfläche ist auf Deutsch verfügbar.",
    audioNote: "Die Audiotitel sind im Projekt enthalten. Die Musik lässt sich mit dieser Option steuern.",
    classesChapter: "Verfügbare Klassen für dieses Kapitel", chapterLock: "Schließe Kapitel I ohne zu sterben ab, um Kapitel II freizuschalten.", chapter2Lock: "Schließe Kapitel I ohne zu sterben ab, um Kapitel II freizuschalten.", chapter3Lock: "Schließe Kapitel I und II ohne zu sterben ab, um Kapitel III freizuschalten.", yes: "Ja", no: "Nein", attack: "Angreifen", wait: "Warten", decision: "Deine Entscheidung", action: "Deine Aktion", finished: "Kapitel abgeschlossen", sealed: "Schicksal besiegelt", trophiesUnlocked: "Trophäen freigeschaltet", bronze: "Bronze", silver: "Silber", gold: "Gold", platinum: "Platin", trilogy: "Eine Fantasy-Trilogie", resumeStory: "Originalgeschichte fortsetzen →", beginAdventure: "Abenteuer beginnen →", continue: "Fortsetzen", backToMenu: "Zurück zum Menü", hp: "LP", atk: "ANG", heroNamePlaceholder: "Name deines Helden", startChapter: "Kapitel starten", enemyType: "Gegner", bossType: "Boss", heroSheet: "Heldenprofil", adventureJournal: "Abenteuerjournal", level: "Stufe", leaveGame: "Spiel verlassen", majorEncounter: "Hauptbegegnung", encounter: "Begegnung", enemiesDefeated: "Besiegte Gegner", noneYet: "Noch keine", gameOverTitle: "ABENTEUER BEENDET", heroesBook: "HELDENBUCH", gameOverText: "Dein Schicksal endet hier. Die Welt wird sich an dich erinnern.", completedText: "Die Quest ist abgeschlossen. Dein Name steht nun im Heldenbuch.", step: "Schritt", version: "Version", exitConfirm: "Dieses Spiel verlassen? Der aktuelle Spielstand bleibt erhalten.", chooseClass: "Wähle eine Klasse, bevor du beginnst.", noSave: "Es wurde noch kein lokaler Spielstand erstellt.", experience: "Erfahrung", heroFallen: "Dein Held ist gefallen.", chapterFinishedStatus: "Kapitel abgeschlossen — deine Legende ist geschrieben.", battleInProgress: "Kampf läuft", turn: "Runde", treasureStatus: "Deine Entscheidungen prägen deinen Weg; jede Etappe bringt dich dem Schatz des Dämonenkönigs näher.", nordicStatus: "Deine Entscheidungen führen dich zum letzten Thron Norwegens.", villageStatus: "Die Originalgeschichte des vergessenen Dorfes leitet deine nächste Entscheidung.", unnamedHero: "Namenloser Held", trophyUnlocked: "Trophäe freigeschaltet", dealsYou: "fügt dir", damageShort: "Schaden zu", isDefeated: "wurde besiegt!", majorEncounterReward: "Belohnung für die Hauptbegegnung:", information: "Information", understood: "Verstanden", cancel: "Abbrechen", confirm: "Bestätigen", leave: "Verlassen",
    trophiesUnlocked: "Trophäen freigeschaltet", bronze: "Bronze", silver: "Silber", gold: "Gold", platinum: "Platin", trilogy: "Eine Fantasy-Trilogie", resumeStory: "Originalgeschichte fortsetzen →", beginAdventure: "Abenteuer beginnen →", continue: "Fortsetzen", backToMenu: "Zurück zum Menü", hp: "LP", atk: "ANG", heroNamePlaceholder: "Name deines Helden", startChapter: "Kapitel starten", enemyType: "Gegner", bossType: "Boss", heroSheet: "Heldenprofil", adventureJournal: "Abenteuerjournal", level: "Stufe", fullscreen: "Vollbild", leaveGame: "Spiel verlassen", majorEncounter: "Hauptbegegnung", encounter: "Begegnung", enemiesDefeated: "Besiegte Gegner", noneYet: "Noch keine", gameOverTitle: "ABENTEUER BEENDET", heroesBook: "HELDENBUCH", gameOverText: "Dein Schicksal endet hier. Die Welt wird sich an dich erinnern.", completedText: "Die Quest ist abgeschlossen. Dein Name steht nun im Heldenbuch.", step: "Schritt", levelUp: "Stufenaufstieg! Du erreichst Stufe {level}. Max. LP +5, Angriff +1.", version: "Version", exitConfirm: "Dieses Spiel verlassen? Der aktuelle Spielstand bleibt erhalten.", chooseClass: "Wähle eine Klasse, bevor du beginnst.", noSave: "Es wurde noch kein lokaler Spielstand erstellt.",
    trophiesUnlocked: "Trophäen freigeschaltet", bronze: "Bronze", silver: "Silber", gold: "Gold", platinum: "Platin", trilogy: "Eine Fantasy-Trilogie", resumeStory: "Originalgeschichte fortsetzen →", beginAdventure: "Abenteuer beginnen →", continue: "Fortsetzen", backToMenu: "Zurück zum Menü", hp: "LP", atk: "ANG", heroNamePlaceholder: "Name deines Helden", startChapter: "Kapitel starten", enemyType: "Gegner", bossType: "Boss", heroSheet: "Heldenprofil", adventureJournal: "Abenteuerjournal", level: "Stufe", fullscreen: "Vollbild", leaveGame: "Spiel verlassen", majorEncounter: "Hauptbegegnung", encounter: "Begegnung", enemiesDefeated: "Besiegte Gegner", noneYet: "Noch keine", gameOverTitle: "ABENTEUER BEENDET", heroesBook: "HELDENBUCH", gameOverText: "Dein Schicksal endet hier. Die Welt wird sich an dich erinnern.", completedText: "Die Quest ist abgeschlossen. Dein Name steht nun im Heldenbuch.", step: "Schritt", levelUp: "Stufenaufstieg! Du erreichst Stufe {level}. Max. LP +5, Angriff +1.", version: "Version", exitConfirm: "Dieses Spiel verlassen? Der aktuelle Spielstand bleibt erhalten.", chooseClass: "Wähle eine Klasse, bevor du beginnst.", noSave: "Es wurde noch kein lokaler Spielstand erstellt.",

  },
  es: {
    chooseNotAct: "Decides no actuar.", chooseToAct: "Decides actuar. +7 EXP.", noEnemiesYet: "Sigues adelante sin encontrar enemigos por ahora.",
    usesSkill: "Usas {skill}: {description}", monkCritical: "¡Golpe crítico en el segundo impacto!", monkStuns: "¡El tercer golpe aturde al enemigo!", comboDamage: "Tu combo inflige", necromancerDrain: "Drenas {damage} PV y recuperas {heal} PV.", jesterCritical: "Golpe crítico del caos: ¡{damage} de daño!", missedAttack: "Fallaste por completo el ataque…", chaosHurt: "¡Vaya! El caos te hiere.", enemyLaughs: "¡El enemigo se ríe tanto que no puede atacar!", iaijutsuDamage: "Iaijutsu corta el aire: ¡{damage} de daño!", shikigamiDamage: "Tu shikigami inflige {damage} de daño y congela al enemigo.", purification: "La purificación inflige {damage} de daño y restaura {heal} PV.", bearRage: "¡La Furia del oso inflige {damage} de daño!", valkyrieHeal: "Las alas de Freyja infligen {damage} de daño y restauran {heal} PV.", runeProphecy: "La profecía de las runas inflige {damage} de daño y congela al enemigo.", skaldInspires: "Tu saga de guerra aturde al enemigo e inspira tu siguiente golpe.", oldSave: "Esta partida guardada pertenece al prototipo anterior. Inicia una partida nueva para descubrir la historia completa.", steps: "etapas", playerAttacks: "Atacas e infliges", playerWaits: "Esperas: el enemigo tendrá la oportunidad de golpearte.", skillAlreadyUsed: "Ya usaste la habilidad en este combate: pierdes la acción.", explosionDamage: "¡BUM! Infliges 250 de daño.", enemyFrozen: "El enemigo está congelado y no puede atacar.", enemyStunned: "El enemigo está aturdido y no puede atacar.", invincible: "Este turno eres invencible: no recibes daño.", shinobiShadow: "Desapareces en las sombras y preparas tu siguiente golpe.", roninStance: "Adoptas la postura del contraataque perfecto.", shieldWall: "Tu muro de escudos absorbe el siguiente ataque.", youAre: "Eres", adventureBegins: "La aventura comienza.", greatAdventure: "LA GRAN AVENTURA", steps: "etapas", invalidSave: "El archivo guardado no se puede leer.", continueStory: "Continuar", chooseToAct: "Decides actuar. +7 EXP.", noEnemiesYet: "Sigues adelante sin encontrar enemigos por ahora.", chooseNotAct: "Decides no actuar.", deathBadDecision: "Has muerto por una mala decisión…", adventureEndsBy: "Tu aventura termina aquí, derrotado por", trophyUnlocked: "Logro desbloqueado", experience: "Experiencia", heroFallen: "Tu héroe ha caído.", chapterFinishedStatus: "Capítulo terminado: tu leyenda queda escrita.", battleInProgress: "Combate en curso", turn: "turno", treasureStatus: "Tus decisiones marcan tu recorrido y cada etapa te acerca al tesoro del Rey Demonio.", nordicStatus: "Tus decisiones te conducen al último trono de Noruega.", villageStatus: "La historia original del Pueblo Olvidado guía tu próxima decisión.", unnamedHero: "Héroe sin nombre", dealsYou: "te inflige", damageShort: "de daño", isDefeated: "ha sido derrotado!", majorEncounterReward: "Recompensa del encuentro importante:", information: "Información", understood: "Entendido", cancel: "Cancelar", confirm: "Confirmar", leave: "Salir", continue: "Continuar", version: "Versión", noSave: "Todavía no se ha creado ninguna partida guardada local.", chooseClass: "Elige una clase antes de empezar.", backToMenu: "Volver al menú", step: "Etapa", hp: "PV", atk: "ATQ", level: "Nivel", heroSheet: "Ficha del héroe", adventureJournal: "Diario de aventura", enemiesDefeated: "Enemigos derrotados", noneYet: "Ninguno todavía", gameOverTitle: "FIN DE LA AVENTURA", heroesBook: "LIBRO DE LOS HÉROES", gameOverText: "Tu destino termina aquí. El mundo recordará tu paso.", completedText: "La misión ha concluido. Tu nombre queda inscrito en el Libro de los Héroes.", majorEncounter: "Encuentro importante", encounter: "Encuentro", exitConfirm: "¿Salir de esta partida? Se conservará la partida guardada.", trophiesUnlocked: "logros desbloqueados", greatAdventure: "LA GRAN AVENTURA", experience: "Experiencia", heroFallen: "Tu héroe ha caído.", chapterFinishedStatus: "Capítulo terminado: tu leyenda queda escrita.", battleInProgress: "Combate en curso", turn: "turno", treasureStatus: "Tus decisiones marcan tu recorrido y cada etapa te acerca al tesoro del Rey Demonio.", nordicStatus: "Tus decisiones te conducen al último trono de Noruega.", villageStatus: "La historia original del Pueblo Olvidado guía tu próxima decisión.", unnamedHero: "Héroe sin nombre", trophyUnlocked: "Logro desbloqueado", dealsYou: "te inflige", damageShort: "de daño", isDefeated: "ha sido derrotado!", majorEncounterReward: "Recompensa del encuentro importante:", information: "Información", understood: "Entendido", cancel: "Cancelar", confirm: "Confirmar", leave: "Salir",
    play: "Jugar", achievements: "Logros", credits: "Créditos", settings: "Configuración", leave: "Salir", back: "Volver",
    chooseChapter: "Elige tu capítulo", developer: "Desarrollador", titleSubtitle: "Una leyenda en tres capítulos",
    display: "Pantalla", language: "Idioma de la interfaz", music: "Música de fondo", motion: "Animaciones de la interfaz",
    volume: "Volumen", standard: "Estándar · 1280 × 720", compact: "Compacto · pantallas pequeñas", large: "Grande · 1600 × 900",
    fullscreen: "Pantalla completa", apply: "Aplicar", availableSoon: "La interfaz del juego está disponible en español.",
    audioNote: "Las pistas de audio están incluidas en el proyecto. Controla la música con esta opción.",
    classesChapter: "Clases disponibles para este capítulo", chapterLock: "Completa el capítulo I sin morir para desbloquear el capítulo II.", chapter2Lock: "Completa el capítulo I sin morir para desbloquear el capítulo II.", chapter3Lock: "Completa los capítulos I y II sin morir para desbloquear el capítulo III.", yes: "Sí", no: "No", attack: "Atacar", wait: "Esperar", decision: "Tu decisión", action: "Tu acción", finished: "Capítulo terminado", sealed: "Destino sellado", trophiesUnlocked: "logros desbloqueados", bronze: "Bronce", silver: "Plata", gold: "Oro", platinum: "Platino", trilogy: "Una trilogía fantástica", resumeStory: "Continuar la historia original →", beginAdventure: "Comenzar la aventura →", continue: "Continuar", backToMenu: "Volver al menú", hp: "PV", atk: "ATQ", heroNamePlaceholder: "Nombre de tu héroe", startChapter: "Iniciar capítulo", enemyType: "Enemigo", bossType: "Jefe", heroSheet: "Ficha del héroe", adventureJournal: "Diario de aventura", level: "Nivel", leaveGame: "Salir de la partida", majorEncounter: "Encuentro importante", encounter: "Encuentro", enemiesDefeated: "Enemigos derrotados", noneYet: "Ninguno todavía", gameOverTitle: "FIN DE LA AVENTURA", heroesBook: "LIBRO DE LOS HÉROES", gameOverText: "Tu destino termina aquí. El mundo recordará tu paso.", completedText: "La misión ha concluido. Tu nombre queda inscrito en el Libro de los Héroes.", step: "Etapa", version: "Versión", exitConfirm: "¿Salir de esta partida? Se conservará la partida guardada.", chooseClass: "Elige una clase antes de empezar.", noSave: "Todavía no se ha creado ninguna partida guardada local.", experience: "Experiencia", heroFallen: "Tu héroe ha caído.", chapterFinishedStatus: "Capítulo terminado: tu leyenda queda escrita.", battleInProgress: "Combate en curso", turn: "turno", treasureStatus: "Tus decisiones marcan tu recorrido y cada etapa te acerca al tesoro del Rey Demonio.", nordicStatus: "Tus decisiones te conducen al último trono de Noruega.", villageStatus: "La historia original del Pueblo Olvidado guía tu próxima decisión.", unnamedHero: "Héroe sin nombre", trophyUnlocked: "Logro desbloqueado", dealsYou: "te inflige", damageShort: "de daño", isDefeated: "ha sido derrotado!", majorEncounterReward: "Recompensa del encuentro importante:", information: "Información", understood: "Entendido", cancel: "Cancelar", confirm: "Confirmar", leave: "Salir",
    trophiesUnlocked: "logros desbloqueados", bronze: "Bronce", silver: "Plata", gold: "Oro", platinum: "Platino", trilogy: "Una trilogía fantástica", resumeStory: "Continuar la historia original →", beginAdventure: "Comenzar la aventura →", continue: "Continuar", backToMenu: "Volver al menú", hp: "PV", atk: "ATQ", heroNamePlaceholder: "Nombre de tu héroe", startChapter: "Iniciar capítulo", enemyType: "Enemigo", bossType: "Jefe", heroSheet: "Ficha del héroe", adventureJournal: "Diario de aventura", level: "Nivel", fullscreen: "Pantalla completa", leaveGame: "Salir de la partida", majorEncounter: "Encuentro importante", encounter: "Encuentro", enemiesDefeated: "Enemigos derrotados", noneYet: "Ninguno todavía", gameOverTitle: "FIN DE LA AVENTURA", heroesBook: "LIBRO DE LOS HÉROES", gameOverText: "Tu destino termina aquí. El mundo recordará tu paso.", completedText: "La misión ha concluido. Tu nombre queda inscrito en el Libro de los Héroes.", step: "Etapa", levelUp: "¡Subes de nivel! Alcanzas el nivel {level}. PV máx. +5, ataque +1.", version: "Versión", exitConfirm: "¿Salir de esta partida? Se conservará la partida guardada.", chooseClass: "Elige una clase antes de empezar.", noSave: "Todavía no se ha creado ninguna partida guardada local.",
    trophiesUnlocked: "logros desbloqueados", bronze: "Bronce", silver: "Plata", gold: "Oro", platinum: "Platino", trilogy: "Una trilogía fantástica", resumeStory: "Continuar la historia original →", beginAdventure: "Comenzar la aventura →", continue: "Continuar", backToMenu: "Volver al menú", hp: "PV", atk: "ATQ", heroNamePlaceholder: "Nombre de tu héroe", startChapter: "Iniciar capítulo", enemyType: "Enemigo", bossType: "Jefe", heroSheet: "Ficha del héroe", adventureJournal: "Diario de aventura", level: "Nivel", fullscreen: "Pantalla completa", leaveGame: "Salir de la partida", majorEncounter: "Encuentro importante", encounter: "Encuentro", enemiesDefeated: "Enemigos derrotados", noneYet: "Ninguno todavía", gameOverTitle: "FIN DE LA AVENTURA", heroesBook: "LIBRO DE LOS HÉROES", gameOverText: "Tu destino termina aquí. El mundo recordará tu paso.", completedText: "La misión ha concluido. Tu nombre queda inscrito en el Libro de los Héroes.", step: "Etapa", levelUp: "¡Subes de nivel! Alcanzas el nivel {level}. PV máx. +5, ataque +1.", version: "Versión", exitConfirm: "¿Salir de esta partida? Se conservará la partida guardada.", chooseClass: "Elige una clase antes de empezar.", noSave: "Todavía no se ha creado ninguna partida guardada local.",

  },
  pl: {
    chooseNotAct: "Decydujesz się nie działać.", chooseToAct: "Decydujesz się działać. +7 PD.", noEnemiesYet: "Idziesz dalej, nie napotykając na razie wrogów.",
    usesSkill: "Używasz umiejętności {skill}: {description}", monkCritical: "Krytyczny cios przy drugim uderzeniu!", monkStuns: "Trzecie uderzenie ogłusza wroga!", comboDamage: "Twoja kombinacja zadaje", necromancerDrain: "Wysasz {damage} PŻ i odzyskujesz {heal} PŻ.", jesterCritical: "Krytyczny cios chaosu: {damage} obrażeń!", missedAttack: "Całkowicie pudłujesz…", chaosHurt: "Ups! Chaos cię rani.", enemyLaughs: "Wróg śmieje się tak bardzo, że nie może zaatakować!", iaijutsuDamage: "Iaijutsu przecina powietrze: {damage} obrażeń!", shikigamiDamage: "Twoje shikigami zadaje {damage} obrażeń i zamraża wroga.", purification: "Oczyszczenie zadaje {damage} obrażeń i przywraca {heal} PŻ.", bearRage: "Furia niedźwiedzia zadaje {damage} obrażeń!", valkyrieHeal: "Skrzydła Freji zadają {damage} obrażeń i przywracają {heal} PŻ.", runeProphecy: "Przepowiednia run zadaje {damage} obrażeń i zamraża wroga.", skaldInspires: "Saga wojenna ogłusza wroga i dodaje ci sił przed kolejnym ciosem.", oldSave: "Ten zapis pochodzi ze starego prototypu. Rozpocznij nową grę, aby poznać pełną historię.", steps: "etapy", playerAttacks: "Atakujesz i zadajesz", playerWaits: "Czekasz: wróg będzie miał okazję cię zaatakować.", skillAlreadyUsed: "Umiejętność została już użyta w tej walce: tracisz akcję.", explosionDamage: "BUM! Zadajesz 250 obrażeń.", enemyFrozen: "Wróg jest zamrożony i nie może atakować.", enemyStunned: "Wróg jest ogłuszony i nie może atakować.", invincible: "W tej turze jesteś nieśmiertelny — nie otrzymujesz obrażeń.", shinobiShadow: "Znikasz w cieniu i przygotowujesz następny cios.", roninStance: "Przyjmujesz postawę doskonałej kontry.", shieldWall: "Twój mur tarcz pochłania następny atak.", youAre: "Jesteś", adventureBegins: "Przygoda się rozpoczyna.", greatAdventure: "WIELKA PRZYGODA", steps: "etapy", invalidSave: "Nie można odczytać zapisu gry.", continueStory: "Kontynuuj", chooseToAct: "Decydujesz się działać. +7 PD.", noEnemiesYet: "Idziesz dalej, nie napotykając na razie wrogów.", chooseNotAct: "Decydujesz się nie działać.", deathBadDecision: "Giniesz z powodu złej decyzji…", adventureEndsBy: "Twoja przygoda kończy się tutaj, pokonana przez", trophyUnlocked: "Odblokowano trofeum", experience: "Doświadczenie", heroFallen: "Twój bohater poległ.", chapterFinishedStatus: "Rozdział ukończony — twoja legenda została zapisana.", battleInProgress: "Walka trwa", turn: "tura", treasureStatus: "Twoje wybory otwierają różne drogi, ale każda przybliża cię do skarbu Króla Demonów.", nordicStatus: "Twoje wybory prowadzą cię ku ostatniemu tronowi Norwegii.", villageStatus: "Oryginalna historia Zapomnianej Wioski prowadzi do kolejnej decyzji.", unnamedHero: "Bohater bez imienia", dealsYou: "zadaje ci", damageShort: "obrażeń", isDefeated: "pokonany!", majorEncounterReward: "Nagroda za ważne spotkanie:", information: "Informacja", understood: "Rozumiem", cancel: "Anuluj", confirm: "Potwierdź", leave: "Opuść", continue: "Kontynuuj", version: "Wersja", noSave: "Nie utworzono jeszcze lokalnego zapisu gry.", chooseClass: "Wybierz klasę, zanim rozpoczniesz.", backToMenu: "Powrót do menu", step: "Etap", hp: "PŻ", atk: "ATK", level: "Poziom", heroSheet: "Karta bohatera", adventureJournal: "Dziennik przygody", enemiesDefeated: "Pokonani wrogowie", noneYet: "Jeszcze brak", gameOverTitle: "KONIEC PRZYGODY", heroesBook: "KSIĘGA BOHATERÓW", gameOverText: "Tu kończy się twoje przeznaczenie. Świat zapamięta twój ślad.", completedText: "Zadanie ukończone. Twoje imię trafia do Księgi Bohaterów.", majorEncounter: "Ważne spotkanie", encounter: "Spotkanie", exitConfirm: "Opuścić grę? Bieżący zapis zostanie zachowany.", trophiesUnlocked: "odblokowane trofea", greatAdventure: "WIELKA PRZYGODA", experience: "Doświadczenie", heroFallen: "Twój bohater poległ.", chapterFinishedStatus: "Rozdział ukończony — twoja legenda została zapisana.", battleInProgress: "Walka trwa", turn: "tura", treasureStatus: "Twoje wybory otwierają różne drogi, ale każda przybliża cię do skarbu Króla Demonów.", nordicStatus: "Twoje wybory prowadzą cię ku ostatniemu tronowi Norwegii.", villageStatus: "Oryginalna historia Zapomnianej Wioski prowadzi do kolejnej decyzji.", unnamedHero: "Bohater bez imienia", trophyUnlocked: "Odblokowano trofeum", dealsYou: "zadaje ci", damageShort: "obrażeń", isDefeated: "pokonany!", majorEncounterReward: "Nagroda za ważne spotkanie:", information: "Informacja", understood: "Rozumiem", cancel: "Anuluj", confirm: "Potwierdź", leave: "Opuść",
    play: "Graj", achievements: "Osiągnięcia", credits: "Podziękowania", settings: "Ustawienia", leave: "Opuść", back: "Wstecz",
    chooseChapter: "Wybierz swój rozdział", developer: "Programista", titleSubtitle: "Jedna legenda w trzech rozdziałach",
    display: "Ekran", language: "Język interfejsu", music: "Muzyka tła", motion: "Animacje interfejsu",
    volume: "Głośność", standard: "Standardowy · 1280 × 720", compact: "Kompaktowy · małe ekrany", large: "Duży · 1600 × 900",
    fullscreen: "Pełny ekran", apply: "Zastosuj", availableSoon: "Interfejs gry jest dostępny w języku polskim.",
    audioNote: "Utwory audio są dołączone do projektu. Muzykę można kontrolować tą opcją.",
    classesChapter: "Dostępne klasy w tym rozdziale", chapterLock: "Ukończ rozdział I bez śmierci, aby odblokować rozdział II.", chapter2Lock: "Ukończ rozdział I bez śmierci, aby odblokować rozdział II.", chapter3Lock: "Ukończ rozdziały I i II bez śmierci, aby odblokować rozdział III.", yes: "Tak", no: "Nie", attack: "Atakuj", wait: "Czekaj", decision: "Twoja decyzja", action: "Twoja akcja", finished: "Rozdział ukończony", sealed: "Los przypieczętowany", trophiesUnlocked: "odblokowane trofea", bronze: "Brąz", silver: "Srebro", gold: "Złoto", platinum: "Platyna", trilogy: "Fantastyczna trylogia", resumeStory: "Wznów oryginalną historię →", beginAdventure: "Rozpocznij przygodę →", continue: "Kontynuuj", backToMenu: "Powrót do menu", hp: "PŻ", atk: "ATK", heroNamePlaceholder: "Imię bohatera", startChapter: "Rozpocznij rozdział", enemyType: "Wróg", bossType: "Boss", heroSheet: "Karta bohatera", adventureJournal: "Dziennik przygody", level: "Poziom", leaveGame: "Opuść grę", majorEncounter: "Ważne spotkanie", encounter: "Spotkanie", enemiesDefeated: "Pokonani wrogowie", noneYet: "Jeszcze brak", gameOverTitle: "KONIEC PRZYGODY", heroesBook: "KSIĘGA BOHATERÓW", gameOverText: "Tu kończy się twoje przeznaczenie. Świat zapamięta twój ślad.", completedText: "Zadanie ukończone. Twoje imię trafia do Księgi Bohaterów.", step: "Etap", version: "Wersja", exitConfirm: "Opuścić grę? Bieżący zapis zostanie zachowany.", chooseClass: "Wybierz klasę, zanim rozpoczniesz.", noSave: "Nie utworzono jeszcze lokalnego zapisu gry.", experience: "Doświadczenie", heroFallen: "Twój bohater poległ.", chapterFinishedStatus: "Rozdział ukończony — twoja legenda została zapisana.", battleInProgress: "Walka trwa", turn: "tura", treasureStatus: "Twoje wybory otwierają różne drogi, ale każda przybliża cię do skarbu Króla Demonów.", nordicStatus: "Twoje wybory prowadzą cię ku ostatniemu tronowi Norwegii.", villageStatus: "Oryginalna historia Zapomnianej Wioski prowadzi do kolejnej decyzji.", unnamedHero: "Bohater bez imienia", trophyUnlocked: "Odblokowano trofeum", dealsYou: "zadaje ci", damageShort: "obrażeń", isDefeated: "pokonany!", majorEncounterReward: "Nagroda za ważne spotkanie:", information: "Informacja", understood: "Rozumiem", cancel: "Anuluj", confirm: "Potwierdź", leave: "Opuść",
    trophiesUnlocked: "odblokowane trofea", bronze: "Brąz", silver: "Srebro", gold: "Złoto", platinum: "Platyna", trilogy: "Fantastyczna trylogia", resumeStory: "Wznów oryginalną historię →", beginAdventure: "Rozpocznij przygodę →", continue: "Kontynuuj", backToMenu: "Powrót do menu", hp: "PŻ", atk: "ATK", heroNamePlaceholder: "Imię bohatera", startChapter: "Rozpocznij rozdział", enemyType: "Wróg", bossType: "Boss", heroSheet: "Karta bohatera", adventureJournal: "Dziennik przygody", level: "Poziom", fullscreen: "Pełny ekran", leaveGame: "Opuść grę", majorEncounter: "Ważne spotkanie", encounter: "Spotkanie", enemiesDefeated: "Pokonani wrogowie", noneYet: "Jeszcze brak", gameOverTitle: "KONIEC PRZYGODY", heroesBook: "KSIĘGA BOHATERÓW", gameOverText: "Tu kończy się twoje przeznaczenie. Świat zapamięta twój ślad.", completedText: "Zadanie ukończone. Twoje imię trafia do Księgi Bohaterów.", step: "Etap", levelUp: "Awans! Osiągasz poziom {level}. Maks. PŻ +5, atak +1.", version: "Wersja", exitConfirm: "Opuścić grę? Bieżący zapis zostanie zachowany.", chooseClass: "Wybierz klasę, zanim rozpoczniesz.", noSave: "Nie utworzono jeszcze lokalnego zapisu gry.",
    trophiesUnlocked: "odblokowane trofea", bronze: "Brąz", silver: "Srebro", gold: "Złoto", platinum: "Platyna", trilogy: "Fantastyczna trylogia", resumeStory: "Wznów oryginalną historię →", beginAdventure: "Rozpocznij przygodę →", continue: "Kontynuuj", backToMenu: "Powrót do menu", hp: "PŻ", atk: "ATK", heroNamePlaceholder: "Imię bohatera", startChapter: "Rozpocznij rozdział", enemyType: "Wróg", bossType: "Boss", heroSheet: "Karta bohatera", adventureJournal: "Dziennik przygody", level: "Poziom", fullscreen: "Pełny ekran", leaveGame: "Opuść grę", majorEncounter: "Ważne spotkanie", encounter: "Spotkanie", enemiesDefeated: "Pokonani wrogowie", noneYet: "Jeszcze brak", gameOverTitle: "KONIEC PRZYGODY", heroesBook: "KSIĘGA BOHATERÓW", gameOverText: "Tu kończy się twoje przeznaczenie. Świat zapamięta twój ślad.", completedText: "Zadanie ukończone. Twoje imię trafia do Księgi Bohaterów.", step: "Etap", levelUp: "Awans! Osiągasz poziom {level}. Maks. PŻ +5, atak +1.", version: "Wersja", exitConfirm: "Opuścić grę? Bieżący zapis zostanie zachowany.", chooseClass: "Wybierz klasę, zanim rozpoczniesz.", noSave: "Nie utworzono jeszcze lokalnego zapisu gry.",

  },
  en: {
    chooseNotAct: "You choose not to act.", chooseToAct: "You choose to act. +7 XP.", noEnemiesYet: "You move on without encountering any enemies for now.",

    usesSkill: "You use {skill}: {description}", monkCritical: "Critical hit on the second strike!", monkStuns: "The third strike stuns the enemy!", comboDamage: "Your combo deals", necromancerDrain: "You drain {damage} HP and restore {heal} HP.", jesterCritical: "Chaos critical hit: {damage} damage!", missedAttack: "You completely miss your attack…", chaosHurt: "Oops! Chaos hurts you.", enemyLaughs: "The enemy is laughing too hard to attack!", iaijutsuDamage: "Iaijutsu cuts through the air: {damage} damage!", shikigamiDamage: "Your shikigami deals {damage} damage and freezes the enemy.", purification: "Purification deals {damage} damage and restores {heal} HP.", bearRage: "Bear Rage deals {damage} damage!", valkyrieHeal: "Freyja's wings deal {damage} damage and restore {heal} HP.", runeProphecy: "The rune prophecy deals {damage} damage and freezes the enemy.", skaldInspires: "Your war saga stuns the enemy and inspires your next strike.", oldSave: "This save belongs to the old prototype. Start a new game to experience the complete story.", steps: "stages", playerAttacks: "You attack and deal", playerWaits: "You wait: the enemy gets a chance to strike.", skillAlreadyUsed: "Skill already used this battle: your action is wasted.", explosionDamage: "BOOM! You deal 250 damage.", enemyFrozen: "The enemy is frozen and cannot attack.", enemyStunned: "The enemy is stunned and cannot attack.", invincible: "You are invincible this turn: no damage taken.", shinobiShadow: "You disappear into the shadows and prepare your next strike.", roninStance: "You adopt the perfect-counter stance.", shieldWall: "Your shield wall absorbs the next attack.", youAre: "You are", adventureBegins: "Your adventure begins.", greatAdventure: "THE GREAT ADVENTURE", steps: "stages", invalidSave: "The save file is unreadable.", continueStory: "Continue", chooseToAct: "You choose to act. +7 XP.", noEnemiesYet: "You move on without encountering any enemies for now.", chooseNotAct: "You choose not to act.", deathBadDecision: "You died because of a bad decision…", adventureEndsBy: "Your adventure ends here, defeated by", trophyUnlocked: "Trophy unlocked", experience: "Experience", heroFallen: "Your hero has fallen.", chapterFinishedStatus: "Chapter complete — your legend is recorded.", battleInProgress: "Battle in progress", turn: "turn", treasureStatus: "Your choices shape your route, and every stage brings you closer to the Demon King's treasure.", nordicStatus: "Your choices lead you toward Norway's final throne.", villageStatus: "The original story of the Forgotten Village now guides your next decision.", unnamedHero: "Nameless Hero", dealsYou: "deals you", damageShort: "damage", isDefeated: "is defeated!", majorEncounterReward: "Major encounter reward:", information: "Information", understood: "Understood", cancel: "Cancel", confirm: "Confirm", leave: "Leave", continue: "Continue", version: "Version", noSave: "No local save has been created yet.", chooseClass: "Choose a class before starting.", backToMenu: "Back to menu", step: "Stage", hp: "HP", atk: "ATK", level: "Level", heroSheet: "Hero profile", adventureJournal: "Adventure journal", enemiesDefeated: "Enemies defeated", noneYet: "None yet", gameOverTitle: "ADVENTURE OVER", heroesBook: "HEROES' BOOK", gameOverText: "Your destiny ends here. The world will remember you.", completedText: "The quest is complete. Your name is entered in the Heroes' Book.", majorEncounter: "Major encounter", encounter: "Encounter", exitConfirm: "Leave this game? Your current save will be kept.", trophiesUnlocked: "trophies unlocked", greatAdventure: "THE GREAT ADVENTURE", experience: "Experience", heroFallen: "Your hero has fallen.", chapterFinishedStatus: "Chapter complete — your legend is recorded.", battleInProgress: "Battle in progress", turn: "turn", treasureStatus: "Your choices shape your route, and every stage brings you closer to the Demon King's treasure.", nordicStatus: "Your choices lead you toward Norway's final throne.", villageStatus: "The original story of the Forgotten Village now guides your next decision.", unnamedHero: "Nameless Hero", trophyUnlocked: "Trophy unlocked", dealsYou: "deals you", damageShort: "damage", isDefeated: "is defeated!", majorEncounterReward: "Major encounter reward:", information: "Information", understood: "Understood", cancel: "Cancel", confirm: "Confirm", leave: "Leave",
    play: "Play", achievements: "Achievements", credits: "Credits", settings: "Settings", leave: "Leave", back: "Back",
    chooseChapter: "Choose your chapter", developer: "Developer", titleSubtitle: "One legend across three chapters",
    display: "Display", language: "Interface language", music: "Background music", motion: "Interface animations",
    volume: "Volume", standard: "Standard · 1280 × 720", compact: "Compact · small screens", large: "Large · 1600 × 900",
    fullscreen: "Fullscreen", apply: "Apply", availableSoon: "The game interface is available in English.",
    audioNote: "Audio tracks are included with the project. Control music with this setting.",
    classesChapter: "Classes available for this chapter", chapterLock: "Complete Chapter I without dying to unlock Chapter II.", chapter2Lock: "Complete Chapter I without dying to unlock Chapter II.", chapter3Lock: "Complete Chapters I and II without dying to unlock Chapter III.", yes: "Yes", no: "No", attack: "Attack", wait: "Wait", decision: "Your decision", action: "Your action", finished: "Chapter completed", sealed: "Fate sealed", trophiesUnlocked: "trophies unlocked", bronze: "Bronze", silver: "Silver", gold: "Gold", platinum: "Platinum", trilogy: "A fantasy trilogy", resumeStory: "Resume the original story →", beginAdventure: "Begin the adventure →", continue: "Continue", backToMenu: "Back to menu", hp: "HP", atk: "ATK", heroNamePlaceholder: "Your hero's name", startChapter: "Start chapter", enemyType: "Enemy", bossType: "Boss", heroSheet: "Hero profile", adventureJournal: "Adventure journal", level: "Level", leaveGame: "Leave game", majorEncounter: "Major encounter", encounter: "Encounter", enemiesDefeated: "Enemies defeated", noneYet: "None yet", gameOverTitle: "ADVENTURE OVER", heroesBook: "HEROES' BOOK", gameOverText: "Your destiny ends here. The world will remember you.", completedText: "The quest is complete. Your name is entered in the Heroes' Book.", step: "Stage", version: "Version", exitConfirm: "Leave this game? Your current save will be kept.", chooseClass: "Choose a class before starting.", noSave: "No local save has been created yet.", experience: "Experience", heroFallen: "Your hero has fallen.", chapterFinishedStatus: "Chapter complete — your legend is recorded.", battleInProgress: "Battle in progress", turn: "turn", treasureStatus: "Your choices shape your route, and every stage brings you closer to the Demon King's treasure.", nordicStatus: "Your choices lead you toward Norway's final throne.", villageStatus: "The original story of the Forgotten Village now guides your next decision.", unnamedHero: "Nameless Hero", trophyUnlocked: "Trophy unlocked", dealsYou: "deals you", damageShort: "damage", isDefeated: "is defeated!", majorEncounterReward: "Major encounter reward:", information: "Information", understood: "Understood", cancel: "Cancel", confirm: "Confirm", youAre: "You are", adventureBegins: "Your adventure begins.", invalidSave: "The save file is unreadable.", continueStory: "Continue", experience: "Experience", heroFallen: "Your hero has fallen.", chapterFinishedStatus: "Chapter complete — your legend is recorded.", battleInProgress: "Battle in progress", turn: "turn", treasureStatus: "Your choices shape your route, and every stage brings you closer to the Demon King's treasure.", nordicStatus: "Your choices lead you toward Norway's final throne.", villageStatus: "The original story of the Forgotten Village now guides your next decision.", unnamedHero: "Nameless Hero", trophyUnlocked: "Trophy unlocked", dealsYou: "deals you", damageShort: "damage", isDefeated: "is defeated!", majorEncounterReward: "Major encounter reward:", information: "Information", understood: "Understood", cancel: "Cancel", confirm: "Confirm", leave: "Leave",
    trophiesUnlocked: "trophies unlocked", bronze: "Bronze", silver: "Silver", gold: "Gold", platinum: "Platinum", trilogy: "A fantasy trilogy", resumeStory: "Resume the original story →", beginAdventure: "Begin the adventure →", continue: "Continue", backToMenu: "Back to menu", hp: "HP", atk: "ATK", heroNamePlaceholder: "Your hero's name", startChapter: "Start chapter", enemyType: "Enemy", bossType: "Boss", heroSheet: "Hero profile", adventureJournal: "Adventure journal", level: "Level", fullscreen: "Fullscreen", leaveGame: "Leave game", majorEncounter: "Major encounter", encounter: "Encounter", enemiesDefeated: "Enemies defeated", noneYet: "None yet", gameOverTitle: "ADVENTURE OVER", heroesBook: "HEROES' BOOK", gameOverText: "Your destiny ends here. The world will remember you.", completedText: "The quest is complete. Your name is entered in the Heroes' Book.", step: "Stage", levelUp: "Level up! You reach level {level}. Max HP +5, attack +1.", version: "Version", exitConfirm: "Leave this game? Your current save will be kept.", chooseClass: "Choose a class before starting.", noSave: "No local save has been created yet.",
    trophiesUnlocked: "trophies unlocked", bronze: "Bronze", silver: "Silver", gold: "Gold", platinum: "Platinum", trilogy: "A fantasy trilogy", resumeStory: "Resume the original story →", beginAdventure: "Begin the adventure →", continue: "Continue", backToMenu: "Back to menu", hp: "HP", atk: "ATK", heroNamePlaceholder: "Your hero's name", startChapter: "Start chapter", enemyType: "Enemy", bossType: "Boss", heroSheet: "Hero profile", adventureJournal: "Adventure journal", level: "Level", fullscreen: "Fullscreen", leaveGame: "Leave game", majorEncounter: "Major encounter", encounter: "Encounter", enemiesDefeated: "Enemies defeated", noneYet: "None yet", gameOverTitle: "ADVENTURE OVER", heroesBook: "HEROES' BOOK", gameOverText: "Your destiny ends here. The world will remember you.", completedText: "The quest is complete. Your name is entered in the Heroes' Book.", step: "Stage", levelUp: "Level up! You reach level {level}. Max HP +5, attack +1.", version: "Version", exitConfirm: "Leave this game? Your current save will be kept.", chooseClass: "Choose a class before starting.", noSave: "No local save has been created yet.",
  },
  "zh-CN": {
    play: "玩", achievements: "奖杯", credits: "制作人员名单", settings: "设置", leave: "离开", back: "返回",
    chooseChapter: "选择你的章节", developer: "开发者", titleSubtitle: "一个传奇横跨三个章节",
    display: "显示", language: "界面语言", music: "背景音乐", motion: "界面动画",
    volume: "音量", standard: "标准 · 1280 × 720", compact: "紧凑 · 小屏幕", large: "大 · 1600 × 900",
    fullscreen: "全屏", apply: "应用", availableSoon: "游戏故事已翻译为简体中文。",
    audioNote: "项目已包含音轨。你可以使用此选项控制音乐。",
    classesChapter: "Classes available for this chapter",
  },
};
for (const language of Object.keys(UI_TEXT)) {
  Object.assign(UI_TEXT[language], window.TF_TRANSLATION_CATALOG?.ui?.[language] || {});
}
const RPG_TEXT = {
  fr: { defend:"Défendre", enemyIntent:"Intention ennemie", intentAttack:"Attaque simple", intentHeavy:"Frappe puissante", intentFrozen:"Ennemi gelé", intentStunned:"Ennemi étourdi", enemyHeavyAttack:"L'ennemi lance une frappe puissante !", playerDefends:"Vous vous protégez : la prochaine attaque est réduite de 60 %.", potion:"Potion", potionUses:"Potion · {count}", potionHeal:"Vous buvez une potion et récupérez {healed} PV.", potionEmpty:"Vous n'avez plus de potion.", equipment:"Équipement", weapon:"Arme", armor:"Armure", lootWeapon:"Arme runique · +{bonus} ATQ", lootArmor:"Armure renforcée · +{bonus} PV max", bossLoot:"Butin du boss : {item}.", artificerBlast:"Vos explosifs infligent {damage} dégâts !" },
  en: { defend:"Defend", enemyIntent:"Enemy intent", intentAttack:"Basic attack", intentHeavy:"Heavy strike", intentFrozen:"Enemy frozen", intentStunned:"Enemy stunned", enemyHeavyAttack:"The enemy unleashes a heavy strike!", playerDefends:"You brace yourself: the next hit deals 60% less damage.", potion:"Potion", potionUses:"Potion · {count}", potionHeal:"You drink a potion and recover {healed} HP.", potionEmpty:"You have no potions left.", equipment:"Equipment", weapon:"Weapon", armor:"Armor", lootWeapon:"Runic weapon · +{bonus} ATK", lootArmor:"Reinforced armor · +{bonus} max HP", bossLoot:"Boss loot: {item}.", artificerBlast:"Your explosives deal {damage} damage!" },
  de: { defend:"Verteidigen", enemyIntent:"Absicht des Gegners", intentAttack:"Einfacher Angriff", intentHeavy:"Wuchtiger Schlag", intentFrozen:"Gegner eingefroren", intentStunned:"Gegner betäubt", enemyHeavyAttack:"Der Gegner entfesselt einen wuchtigen Schlag!", playerDefends:"Du gehst in Deckung: Der nächste Treffer verursacht 60 % weniger Schaden.", potion:"Trank", potionUses:"Trank · {count}", potionHeal:"Du trinkst einen Trank und stellst {healed} LP wieder her.", potionEmpty:"Du hast keine Tränke mehr.", equipment:"Ausrüstung", weapon:"Waffe", armor:"Rüstung", lootWeapon:"Runenwaffe · +{bonus} ANG", lootArmor:"Verstärkte Rüstung · +{bonus} max. LP", bossLoot:"Bossbeute: {item}.", artificerBlast:"Deine Sprengstoffe verursachen {damage} Schaden!" },
  es: { defend:"Defenderse", enemyIntent:"Intención enemiga", intentAttack:"Ataque básico", intentHeavy:"Golpe poderoso", intentFrozen:"Enemigo congelado", intentStunned:"Enemigo aturdido", enemyHeavyAttack:"¡El enemigo lanza un golpe poderoso!", playerDefends:"Te proteges: el siguiente golpe inflige un 60 % menos de daño.", potion:"Poción", potionUses:"Poción · {count}", potionHeal:"Bebes una poción y recuperas {healed} PV.", potionEmpty:"No te quedan pociones.", equipment:"Equipo", weapon:"Arma", armor:"Armadura", lootWeapon:"Arma rúnica · +{bonus} ATQ", lootArmor:"Armadura reforzada · +{bonus} PV máx.", bossLoot:"Botín del jefe: {item}.", artificerBlast:"¡Tus explosivos infligen {damage} de daño!" },
  pl: { defend:"Broń się", enemyIntent:"Zamiar wroga", intentAttack:"Zwykły atak", intentHeavy:"Potężne uderzenie", intentFrozen:"Wróg zamrożony", intentStunned:"Wróg ogłuszony", enemyHeavyAttack:"Wróg wyprowadza potężne uderzenie!", playerDefends:"Osłaniasz się: następny cios zada o 60% mniej obrażeń.", potion:"Mikstura", potionUses:"Mikstura · {count}", potionHeal:"Wypijasz miksturę i odzyskujesz {healed} PŻ.", potionEmpty:"Nie masz już mikstur.", equipment:"Ekwipunek", weapon:"Broń", armor:"Pancerz", lootWeapon:"Runiczna broń · +{bonus} ATK", lootArmor:"Wzmocniony pancerz · +{bonus} maks. PŻ", bossLoot:"Łup bossa: {item}.", artificerBlast:"Materiały wybuchowe zadają {damage} obrażeń!" },
  "zh-CN": { defend:"防御", enemyIntent:"敌人意图", intentAttack:"普通攻击", intentHeavy:"重击", intentFrozen:"敌人被冻结", intentStunned:"敌人被眩晕", enemyHeavyAttack:"敌人发动重击！", playerDefends:"你做好防御：下一次受到的伤害降低60%。", potion:"药水", potionUses:"药水 · {count}", potionHeal:"你喝下药水，恢复了{healed}点生命值。", potionEmpty:"你没有药水了。", equipment:"装备", weapon:"武器", armor:"护甲", lootWeapon:"符文武器 · 攻击 +{bonus}", lootArmor:"强化护甲 · 最大生命 +{bonus}", bossLoot:"首领战利品：{item}。", artificerBlast:"爆炸物造成{damage}点伤害！" },
};
const INVENTORY_TEXT = {
  fr: { inventory:"Inventaire", inventoryHint:"Les bonus équipés se cumulent. Chaque objet peut être activé ou retiré à tout moment.", inventoryEmpty:"Ton sac est vide. Les récompenses de boss et les reliques apparaîtront ici.", equipped:"Équipé", inBackpack:"Dans le sac", equip:"Équiper", unequip:"Déséquiper", closeInventory:"Fermer le sac", inventoryAria:"Sac à dos du héros" },
  en: { inventory:"Inventory", inventoryHint:"Equipped bonuses stack. Equip or remove each item at any time.", inventoryEmpty:"Your backpack is empty. Boss rewards and relics will appear here.", equipped:"Equipped", inBackpack:"In backpack", equip:"Equip", unequip:"Unequip", closeInventory:"Close backpack", inventoryAria:"Hero backpack" },
  de: { inventory:"Inventar", inventoryHint:"Ausgerüstete Boni addieren sich. Du kannst Gegenstände jederzeit an- und ablegen.", inventoryEmpty:"Dein Rucksack ist leer. Bossbelohnungen und Relikte erscheinen hier.", equipped:"Ausgerüstet", inBackpack:"Im Rucksack", equip:"Anlegen", unequip:"Ablegen", closeInventory:"Rucksack schließen", inventoryAria:"Rucksack des Helden" },
  es: { inventory:"Inventario", inventoryHint:"Las bonificaciones equipadas se acumulan. Puedes equipar o quitar cada objeto cuando quieras.", inventoryEmpty:"Tu mochila está vacía. Aquí aparecerán las recompensas de los jefes y las reliquias.", equipped:"Equipado", inBackpack:"En la mochila", equip:"Equipar", unequip:"Desequipar", closeInventory:"Cerrar mochila", inventoryAria:"Mochila del héroe" },
  pl: { inventory:"Ekwipunek", inventoryHint:"Premie z wyposażonych przedmiotów sumują się. Możesz je zakładać i zdejmować w dowolnej chwili.", inventoryEmpty:"Twój plecak jest pusty. Pojawią się tu nagrody bossów i relikty.", equipped:"Założono", inBackpack:"W plecaku", equip:"Załóż", unequip:"Zdejmij", closeInventory:"Zamknij plecak", inventoryAria:"Plecak bohatera" },
  "zh-CN": { inventory:"背包", inventoryHint:"已装备的加成会累积。你可以随时装备或卸下每件物品。", inventoryEmpty:"背包是空的。首领奖励和遗物会显示在这里。", equipped:"已装备", inBackpack:"在背包中", equip:"装备", unequip:"卸下", closeInventory:"关闭背包", inventoryAria:"英雄背包" },
};
for (const [language, copy] of Object.entries(INVENTORY_TEXT)) Object.assign(RPG_TEXT[language], copy);
const PROGRESSION_TEXT = {
  fr: { rarity_common:"Commun", rarity_rare:"Rare", rarity_epic:"Épique", rarity_legendary:"Légendaire", effect_crit:"Coup critique : +{value}% de chances", effect_ward:"Réduction des dégâts : −{value} par coup", effect_mending:"Potions : +{value} PV", effect_none:"Aucun effet spécial", critical:"Coup critique !", skillTree:"Compétences", skillPoints:"Points à dépenser : {count}", skillBlade:"Lame affûtée", skillBladeEffect:"+2 ATQ par rang", skillGuardian:"Gardien", skillGuardianEffect:"+5 PV max et −1 dégât reçu par rang", skillAlchemy:"Alchimie", skillAlchemyEffect:"+5 PV rendus par potion et par rang", skillUpgrade:"Améliorer", skillMax:"Rang maximum", storyEnding1Yes:"La relique reconnaît ton courage. Le village rallume ses lanternes et t’accueille comme son protecteur.", storyEnding1No:"Tu refuses le pacte de la relique. Le village survit, mais garde ses secrets et ne te doit aucune allégeance.", storyEnding2Yes:"Tu partages le trésor avec les royaumes. Une alliance durable se forme autour de ton choix.", storyEnding2No:"Tu scelles le trésor loin des convoitises. La paix revient, mais chaque royaume repart de son côté.", storyEnding3Yes:"Tu unis les clans du Nord. Le printemps revient sous une bannière commune.", storyEnding3No:"Tu laisses les clans libres. Ils survivent séparément et chantent une légende sans roi.", branch1Yes:"La relique répond à ton geste. Une lueur s’échappe de ses runes et dessine un chemin sûr jusqu’au cœur du village.", branch1No:"Tu refuses le pacte silencieux de la relique. La lueur s’éteint; derrière toi, les villageois barricadent la porte du sanctuaire.", branch2Yes:"Tu ouvres le coffre devant les émissaires. Des cartes oubliées montrent comment partager les terres sans nouvelle guerre.", branch2No:"Tu verrouilles le coffre et gardes la clé. Les émissaires se retirent; des traces fraîches contournent déjà le sanctuaire.", branch3Yes:"Tu tends la main aux clans rivaux. Leurs chefs déposent leurs armes autour du feu et proposent un conseil commun.", branch3No:"Tu refuses de choisir un chef pour le Nord. Chaque clan reprend sa route, emportant une part de la menace avec lui." },
  en: { rarity_common:"Common", rarity_rare:"Rare", rarity_epic:"Epic", rarity_legendary:"Legendary", effect_crit:"Critical hit: +{value}% chance", effect_ward:"Damage reduction: −{value} per hit", effect_mending:"Potions: +{value} HP", effect_none:"No special effect", critical:"Critical hit!", skillTree:"Skills", skillPoints:"Points to spend: {count}", skillBlade:"Keen Blade", skillBladeEffect:"+2 ATK per rank", skillGuardian:"Guardian", skillGuardianEffect:"+5 max HP and −1 damage taken per rank", skillAlchemy:"Alchemy", skillAlchemyEffect:"+5 HP restored per potion per rank", skillUpgrade:"Upgrade", skillMax:"Maximum rank", storyEnding1Yes:"The relic recognizes your courage. The village relights its lanterns and welcomes you as its protector.", storyEnding1No:"You refuse the relic’s pact. The village survives, but keeps its secrets and owes you no allegiance.", storyEnding2Yes:"You share the treasure with the realms. A lasting alliance grows from your choice.", storyEnding2No:"You seal the treasure away from greedy hands. Peace returns, but each realm goes its own way.", storyEnding3Yes:"You unite the northern clans. Spring returns beneath a shared banner.", storyEnding3No:"You leave the clans independent. They survive apart and sing a legend with no king.", branch1Yes:"The relic answers your touch. Light spills from its runes and reveals a safe path to the heart of the village.", branch1No:"You refuse the relic’s silent pact. Its glow fades; behind you, villagers bar the sanctuary doors.", branch2Yes:"You open the coffer before the envoys. Forgotten maps show how the lands can be shared without another war.", branch2No:"You lock the coffer and keep the key. The envoys withdraw; fresh tracks already circle the sanctuary.", branch3Yes:"You reach out to the rival clans. Their leaders lay down their weapons and propose a common council.", branch3No:"You refuse to choose one ruler for the North. Each clan takes its own road, carrying part of the threat away." },
  de: { rarity_common:"Gewöhnlich", rarity_rare:"Selten", rarity_epic:"Episch", rarity_legendary:"Legendär", effect_crit:"Kritischer Treffer: +{value}% Chance", effect_ward:"Schadensminderung: −{value} pro Treffer", effect_mending:"Tränke: +{value} LP", effect_none:"Kein besonderer Effekt", critical:"Kritischer Treffer!", skillTree:"Fertigkeiten", skillPoints:"Punkte verfügbar: {count}", skillBlade:"Scharfe Klinge", skillBladeEffect:"+2 ANG pro Rang", skillGuardian:"Wächter", skillGuardianEffect:"+5 max. LP und −1 erlittener Schaden pro Rang", skillAlchemy:"Alchemie", skillAlchemyEffect:"+5 LP pro Trank und Rang", skillUpgrade:"Verbessern", skillMax:"Maximaler Rang", storyEnding1Yes:"Das Relikt erkennt deinen Mut. Das Dorf entzündet seine Laternen neu und begrüßt dich als Beschützer.", storyEnding1No:"Du lehnst den Bund des Relikts ab. Das Dorf überlebt, bewahrt aber seine Geheimnisse.", storyEnding2Yes:"Du teilst den Schatz mit den Reichen. Deine Entscheidung stiftet ein dauerhaftes Bündnis.", storyEnding2No:"Du versiegelst den Schatz vor gierigen Händen. Frieden kehrt ein, doch die Reiche gehen getrennte Wege.", storyEnding3Yes:"Du vereinst die Nordstämme. Unter einem gemeinsamen Banner kehrt der Frühling zurück.", storyEnding3No:"Du lässt die Stämme unabhängig. Getrennt überleben sie und besingen eine Legende ohne König.", branch1Yes:"Das Relikt antwortet auf deine Berührung. Licht fließt aus den Runen und zeigt einen sicheren Weg ins Dorf.", branch1No:"Du lehnst den stillen Pakt ab. Das Leuchten erlischt; hinter dir verbarrikadieren die Dorfbewohner das Heiligtum.", branch2Yes:"Du öffnest die Truhe vor den Gesandten. Vergessene Karten zeigen, wie die Länder ohne neuen Krieg geteilt werden können.", branch2No:"Du verschließt die Truhe und behältst den Schlüssel. Die Gesandten ziehen ab; frische Spuren führen um das Heiligtum.", branch3Yes:"Du gehst auf die rivalisierenden Stämme zu. Ihre Anführer legen die Waffen nieder und schlagen einen gemeinsamen Rat vor.", branch3No:"Du bestimmst keinen Herrscher für den Norden. Jeder Stamm zieht allein weiter und nimmt einen Teil der Gefahr mit." },
  es: { rarity_common:"Común", rarity_rare:"Raro", rarity_epic:"Épico", rarity_legendary:"Legendario", effect_crit:"Golpe crítico: +{value}% de probabilidad", effect_ward:"Reducción de daño: −{value} por golpe", effect_mending:"Pociones: +{value} PV", effect_none:"Sin efecto especial", critical:"¡Golpe crítico!", skillTree:"Habilidades", skillPoints:"Puntos disponibles: {count}", skillBlade:"Hoja afilada", skillBladeEffect:"+2 ATQ por rango", skillGuardian:"Guardián", skillGuardianEffect:"+5 PV máx. y −1 daño recibido por rango", skillAlchemy:"Alquimia", skillAlchemyEffect:"+5 PV por poción y rango", skillUpgrade:"Mejorar", skillMax:"Rango máximo", storyEnding1Yes:"La reliquia reconoce tu valor. El pueblo enciende sus faroles y te recibe como protector.", storyEnding1No:"Rechazas el pacto de la reliquia. El pueblo sobrevive, pero guarda sus secretos.", storyEnding2Yes:"Compartes el tesoro con los reinos. Tu decisión crea una alianza duradera.", storyEnding2No:"Sellas el tesoro lejos de la codicia. Vuelve la paz, pero cada reino sigue su camino.", storyEnding3Yes:"Unes a los clanes del Norte. La primavera vuelve bajo una bandera común.", storyEnding3No:"Dejas libres a los clanes. Sobreviven por separado y cantan una leyenda sin rey.", branch1Yes:"La reliquia responde a tu tacto. La luz de sus runas revela un camino seguro al corazón del pueblo.", branch1No:"Rechazas el pacto silencioso. La luz se apaga; tras de ti, los aldeanos cierran el santuario.", branch2Yes:"Abres el cofre ante los emisarios. Mapas olvidados muestran cómo compartir las tierras sin otra guerra.", branch2No:"Cierras el cofre y guardas la llave. Los emisarios se retiran; nuevas huellas rodean el santuario.", branch3Yes:"Tiendes la mano a los clanes rivales. Sus líderes dejan las armas y proponen un consejo común.", branch3No:"No eliges un jefe para el Norte. Cada clan toma su camino y se lleva parte de la amenaza." },
  pl: { rarity_common:"Zwykły", rarity_rare:"Rzadki", rarity_epic:"Epicki", rarity_legendary:"Legendarny", effect_crit:"Trafienie krytyczne: +{value}% szans", effect_ward:"Redukcja obrażeń: −{value} za cios", effect_mending:"Mikstury: +{value} PŻ", effect_none:"Brak efektu specjalnego", critical:"Trafienie krytyczne!", skillTree:"Umiejętności", skillPoints:"Punkty do wydania: {count}", skillBlade:"Ostrze", skillBladeEffect:"+2 ATK za rangę", skillGuardian:"Strażnik", skillGuardianEffect:"+5 maks. PŻ i −1 otrzymanych obrażeń za rangę", skillAlchemy:"Alchemia", skillAlchemyEffect:"+5 PŻ z każdej mikstury za rangę", skillUpgrade:"Ulepsz", skillMax:"Maksymalna ranga", storyEnding1Yes:"Relikt uznaje twoją odwagę. Wieś zapala latarnie i wita cię jako obrońcę.", storyEnding1No:"Odrzucasz pakt reliktu. Wieś przetrwa, lecz zachowa swoje sekrety.", storyEnding2Yes:"Dzielisz się skarbem z królestwami. Twój wybór tworzy trwały sojusz.", storyEnding2No:"Pieczętujesz skarb przed chciwcami. Wraca pokój, lecz królestwa idą własnymi drogami.", storyEnding3Yes:"Jednoczysz klany Północy. Wspólna chorągiew sprowadza wiosnę.", storyEnding3No:"Pozostawiasz klany niezależne. Przetrwają osobno i zaśpiewają legendę bez króla.", branch1Yes:"Relikt odpowiada na twój dotyk. Światło run wskazuje bezpieczną drogę do serca wioski.", branch1No:"Odrzucasz niemy pakt. Blask gaśnie; za tobą wieśniacy barykadują wejście do świątyni.", branch2Yes:"Otwierasz skrzynię przed posłami. Dawne mapy pokazują, jak podzielić ziemie bez kolejnej wojny.", branch2No:"Zamykasz skrzynię i zatrzymujesz klucz. Posłowie odchodzą; świeże ślady okrążają świątynię.", branch3Yes:"Wyciągasz rękę do rywalizujących klanów. Przywódcy odkładają broń i proponują wspólną radę.", branch3No:"Nie wybierasz władcy Północy. Każdy klan rusza własną drogą, zabierając część zagrożenia." },
  "zh-CN": { rarity_common:"普通", rarity_rare:"稀有", rarity_epic:"史诗", rarity_legendary:"传说", effect_crit:"暴击：几率 +{value}%", effect_ward:"伤害减免：每次 −{value}", effect_mending:"药水：恢复 +{value}生命", effect_none:"无特殊效果", critical:"暴击！", skillTree:"技能", skillPoints:"可用点数：{count}", skillBlade:"锋刃", skillBladeEffect:"每级攻击 +2", skillGuardian:"守护者", skillGuardianEffect:"每级最大生命 +5，受伤 −1", skillAlchemy:"炼金术", skillAlchemyEffect:"每级每瓶药水额外恢复5点生命", skillUpgrade:"升级", skillMax:"已达最高级", storyEnding1Yes:"圣物认可了你的勇气。村庄重新点亮灯火，欢迎你成为守护者。", storyEnding1No:"你拒绝了圣物的契约。村庄得以幸存，却保留了自己的秘密。", storyEnding2Yes:"你与各王国分享宝藏，你的选择促成了长久的联盟。", storyEnding2No:"你将宝藏封存，远离贪欲。和平归来，但各王国各自前行。", storyEnding3Yes:"你团结了北方部族。共同的旗帜迎来了春天。", storyEnding3No:"你让部族保持独立。他们各自生存，传唱着没有国王的传说。", branch1Yes:"圣物回应了你的触碰。符文流出光芒，照出通往村庄中心的安全道路。", branch1No:"你拒绝了圣物的无声契约。光芒熄灭，身后的村民封锁了圣殿入口。", branch2Yes:"你在使者面前打开宝箱。古老地图显示如何分配土地，避免新的战争。", branch2No:"你锁上宝箱并留下钥匙。使者离开了，圣殿周围却出现了新的脚印。", branch3Yes:"你向敌对部族伸出手。首领们放下武器，提议建立共同议会。", branch3No:"你不为北方选出统治者。各部族踏上自己的道路，并带走一部分威胁。" },
};
for (const [language, copy] of Object.entries(PROGRESSION_TEXT)) Object.assign(RPG_TEXT[language], copy);
const SKILL_TREE_TEXT = {
  fr: { skillRoot:"Chemin du héros", skillLearned:"Acquise", skillAvailable:"Disponible", skillLocked:"Prérequis manquant", skillLearn:"Débloquer · 1 point", skillBranchBlade:"Voie de la lame", skillBranchGuardian:"Voie du gardien", skillBranchAlchemy:"Voie de l’alchimie", skillBlade1Name:"Frappe affûtée", skillBlade1Desc:"Attaque +2. Chaque coup devient plus puissant.", skillBlade2Name:"Œil du duelliste", skillBlade2Desc:"+10 % de chances de coup critique sur les attaques normales.", skillBlade3Name:"Siphon vital", skillBlade3Desc:"Une attaque normale rend 10 % des dégâts infligés en PV.", skillGuardian1Name:"Cotte runique", skillGuardian1Desc:"+5 PV max et réduit chaque coup reçu de 1 dégât.", skillGuardian2Name:"Posture réparatrice", skillGuardian2Desc:"Défendre restaure aussi 10 % des PV max.", skillGuardian3Name:"Dernier rempart", skillGuardian3Desc:"Une fois par combat, un coup fatal te laisse à 1 PV.", skillAlchemy1Name:"Infusion forte", skillAlchemy1Desc:"Chaque potion rend 5 PV supplémentaires.", skillAlchemy2Name:"Sacoche profonde", skillAlchemy2Desc:"La capacité de potions augmente de 1.", skillAlchemy3Name:"Élixir de combat", skillAlchemy3Desc:"Boire une potion renforce ta prochaine attaque de 25 %.", skillTreeHint:"Débloque trois capacités de base au fil des chapitres, puis choisis une spécialisation et son ultime.", skillBladeHeal:"Siphon vital : tu récupères {heal} PV.", skillGuardianHeal:"Posture réparatrice : tu récupères {heal} PV.", skillGuardianSave:"Dernier rempart : tu refuses de tomber !", skillAlchemyBuff:"Élixir de combat : ta prochaine attaque est renforcée." },
  en: { skillRoot:"Hero’s path", skillLearned:"Learned", skillAvailable:"Available", skillLocked:"Prerequisite missing", skillLearn:"Unlock · 1 point", skillBranchBlade:"Blade path", skillBranchGuardian:"Guardian path", skillBranchAlchemy:"Alchemy path", skillBlade1Name:"Keen Strike", skillBlade1Desc:"Attack +2. Every blow hits harder.", skillBlade2Name:"Duelist’s Eye", skillBlade2Desc:"+10% critical chance on normal attacks.", skillBlade3Name:"Vital Siphon", skillBlade3Desc:"Normal attacks restore 10% of damage dealt as HP.", skillGuardian1Name:"Runic Mail", skillGuardian1Desc:"+5 max HP and reduce each hit by 1 damage.", skillGuardian2Name:"Mending Stance", skillGuardian2Desc:"Defending also restores 10% of max HP.", skillGuardian3Name:"Last Stand", skillGuardian3Desc:"Once per battle, a fatal hit leaves you at 1 HP.", skillAlchemy1Name:"Strong Infusion", skillAlchemy1Desc:"Each potion restores 5 additional HP.", skillAlchemy2Name:"Deep Satchel", skillAlchemy2Desc:"Increase potion capacity by 1.", skillAlchemy3Name:"Battle Elixir", skillAlchemy3Desc:"Drinking a potion empowers your next attack by 25%.", skillTreeHint:"Unlock nodes from top to bottom. Each path grows through three chapter-gated abilities, a specialization, and an ultimate.", skillBladeHeal:"Vital Siphon: you recover {heal} HP.", skillGuardianHeal:"Mending Stance: you recover {heal} HP.", skillGuardianSave:"Last Stand: you refuse to fall!", skillAlchemyBuff:"Battle Elixir: your next attack is empowered." },
  de: { skillRoot:"Weg des Helden", skillLearned:"Erlernt", skillAvailable:"Verfügbar", skillLocked:"Voraussetzung fehlt", skillLearn:"Freischalten · 1 Punkt", skillBranchBlade:"Klingenpfad", skillBranchGuardian:"Wächterpfad", skillBranchAlchemy:"Alchemiepfad", skillBlade1Name:"Scharfer Hieb", skillBlade1Desc:"Angriff +2. Jeder Schlag trifft stärker.", skillBlade2Name:"Auge des Duellanten", skillBlade2Desc:"+10 % kritische Trefferchance bei normalen Angriffen.", skillBlade3Name:"Lebensraub", skillBlade3Desc:"Normale Angriffe stellen 10 % des Schadens als LP wieder her.", skillGuardian1Name:"Runenrüstung", skillGuardian1Desc:"+5 max. LP und jeder Treffer verursacht 1 Schaden weniger.", skillGuardian2Name:"Heilende Haltung", skillGuardian2Desc:"Verteidigen stellt zusätzlich 10 % der max. LP wieder her.", skillGuardian3Name:"Letzter Widerstand", skillGuardian3Desc:"Einmal pro Kampf lässt dich ein tödlicher Treffer mit 1 LP zurück.", skillAlchemy1Name:"Starker Aufguss", skillAlchemy1Desc:"Jeder Trank stellt 5 zusätzliche LP wieder her.", skillAlchemy2Name:"Tiefe Tasche", skillAlchemy2Desc:"Die Trankkapazität steigt um 1.", skillAlchemy3Name:"Kampf-Elixier", skillAlchemy3Desc:"Ein Trank verstärkt deinen nächsten Angriff um 25 %.", skillTreeHint:"Schalte Knoten von oben nach unten frei. Jeder Pfad wächst mit drei kapitelgebundenen Fähigkeiten, einer Spezialisierung und einem Ultimativtalent.", skillBladeHeal:"Lebensraub: Du stellst {heal} LP wieder her.", skillGuardianHeal:"Heilende Haltung: Du stellst {heal} LP wieder her.", skillGuardianSave:"Letzter Widerstand: Du gibst nicht auf!", skillAlchemyBuff:"Kampf-Elixier: Dein nächster Angriff ist verstärkt." },
  es: { skillRoot:"Camino del héroe", skillLearned:"Aprendida", skillAvailable:"Disponible", skillLocked:"Falta un requisito", skillLearn:"Desbloquear · 1 punto", skillBranchBlade:"Senda de la espada", skillBranchGuardian:"Senda del guardián", skillBranchAlchemy:"Senda de la alquimia", skillBlade1Name:"Golpe afilado", skillBlade1Desc:"Ataque +2. Cada golpe hace más daño.", skillBlade2Name:"Ojo del duelista", skillBlade2Desc:"+10 % de probabilidad crítica en ataques normales.", skillBlade3Name:"Sifón vital", skillBlade3Desc:"Los ataques normales restauran como PV el 10 % del daño infligido.", skillGuardian1Name:"Malla rúnica", skillGuardian1Desc:"+5 PV máx. y cada golpe recibido inflige 1 menos.", skillGuardian2Name:"Postura reparadora", skillGuardian2Desc:"Defender también restaura un 10 % de los PV máximos.", skillGuardian3Name:"Última defensa", skillGuardian3Desc:"Una vez por combate, un golpe mortal te deja con 1 PV.", skillAlchemy1Name:"Infusión fuerte", skillAlchemy1Desc:"Cada poción restaura 5 PV adicionales.", skillAlchemy2Name:"Bolsa profunda", skillAlchemy2Desc:"Aumenta en 1 la capacidad de pociones.", skillAlchemy3Name:"Elixir de combate", skillAlchemy3Desc:"Beber una poción potencia tu próximo ataque un 25 %.", skillTreeHint:"Desbloquea los nodos de arriba abajo. Cada senda crece con tres habilidades ligadas a los capítulos, una especialización y una definitiva.", skillBladeHeal:"Sifón vital: recuperas {heal} PV.", skillGuardianHeal:"Postura reparadora: recuperas {heal} PV.", skillGuardianSave:"Última defensa: ¡te niegas a caer!", skillAlchemyBuff:"Elixir de combate: tu próximo ataque se potencia." },
  pl: { skillRoot:"Ścieżka bohatera", skillLearned:"Odblokowano", skillAvailable:"Dostępna", skillLocked:"Brak wymaganego węzła", skillLearn:"Odblokuj · 1 punkt", skillBranchBlade:"Ścieżka ostrza", skillBranchGuardian:"Ścieżka strażnika", skillBranchAlchemy:"Ścieżka alchemii", skillBlade1Name:"Ostry cios", skillBlade1Desc:"Atak +2. Każdy cios zadaje więcej obrażeń.", skillBlade2Name:"Oko pojedynkowicza", skillBlade2Desc:"+10% szansy na trafienie krytyczne zwykłym atakiem.", skillBlade3Name:"Wysysanie życia", skillBlade3Desc:"Zwykłe ataki przywracają 10% zadanych obrażeń jako PŻ.", skillGuardian1Name:"Runiczna kolczuga", skillGuardian1Desc:"+5 maks. PŻ i każdy cios zadaje o 1 obrażenie mniej.", skillGuardian2Name:"Postawa lecznicza", skillGuardian2Desc:"Obrona przywraca też 10% maksymalnych PŻ.", skillGuardian3Name:"Ostatni bastion", skillGuardian3Desc:"Raz na walkę śmiertelny cios pozostawia cię z 1 PŻ.", skillAlchemy1Name:"Mocny napar", skillAlchemy1Desc:"Każda mikstura przywraca dodatkowe 5 PŻ.", skillAlchemy2Name:"Głęboka sakwa", skillAlchemy2Desc:"Pojemność mikstur zwiększa się o 1.", skillAlchemy3Name:"Eliksir walki", skillAlchemy3Desc:"Mikstura wzmacnia twój następny atak o 25%.", skillTreeHint:"Odblokowuj węzły od góry do dołu. Każda ścieżka rozwija się przez trzy zdolności odblokowywane w rozdziałach, specjalizację i umiejętność ostateczną.", skillBladeHeal:"Wysysanie życia: odzyskujesz {heal} PŻ.", skillGuardianHeal:"Postawa lecznicza: odzyskujesz {heal} PŻ.", skillGuardianSave:"Ostatni bastion: nie poddajesz się!", skillAlchemyBuff:"Eliksir walki: twój następny atak jest wzmocniony." },
  "zh-CN": { skillRoot:"英雄之路", skillLearned:"已学习", skillAvailable:"可学习", skillLocked:"缺少前置技能", skillLearn:"解锁 · 1点", skillBranchBlade:"利刃路线", skillBranchGuardian:"守护路线", skillBranchAlchemy:"炼金路线", skillBlade1Name:"锐利打击", skillBlade1Desc:"攻击 +2，每次攻击造成更多伤害。", skillBlade2Name:"决斗者之眼", skillBlade2Desc:"普通攻击暴击率 +10%。", skillBlade3Name:"生命汲取", skillBlade3Desc:"普通攻击将造成伤害的10%转化为生命。", skillGuardian1Name:"符文甲胄", skillGuardian1Desc:"最大生命 +5，每次受击伤害 −1。", skillGuardian2Name:"疗愈姿态", skillGuardian2Desc:"防御时额外恢复最大生命的10%。", skillGuardian3Name:"最后壁垒", skillGuardian3Desc:"每场战斗一次，受到致命伤害后保留1点生命。", skillAlchemy1Name:"强效药剂", skillAlchemy1Desc:"每瓶药水额外恢复5点生命。", skillAlchemy2Name:"深口袋", skillAlchemy2Desc:"药水携带上限 +1。", skillAlchemy3Name:"战斗灵药", skillAlchemy3Desc:"饮用药水后，下一次攻击伤害提高25%。", skillTreeHint:"从上到下解锁节点。每条路线会随章节成长，包含三种基础能力、一项专精和终极技能。", skillBladeHeal:"生命汲取：恢复{heal}点生命。", skillGuardianHeal:"疗愈姿态：恢复{heal}点生命。", skillGuardianSave:"最后壁垒：你拒绝倒下！", skillAlchemyBuff:"战斗灵药：下一次攻击已强化。" },
};
for (const [language, copy] of Object.entries(SKILL_TREE_TEXT)) Object.assign(RPG_TEXT[language], copy);
const SKILL_STAGE_TEXT = {
  fr: { skillNeedPoint:"Gagne un point de compétence pour débloquer ce nœud.", skillUnlockChapter:"Se débloque au {chapter}", skillCurrentChapter:"Chapitre actuel : {chapter}", skillChapter1:"Chapitre I", skillChapter2:"Chapitre II", skillChapter3:"Chapitre III" },
  en: { skillNeedPoint:"Earn a skill point to unlock this node.", skillUnlockChapter:"Unlocks in {chapter}", skillCurrentChapter:"Current chapter: {chapter}", skillChapter1:"Chapter I", skillChapter2:"Chapter II", skillChapter3:"Chapter III" },
  de: { skillNeedPoint:"Sammle einen Fertigkeitspunkt, um diesen Knoten freizuschalten.", skillUnlockChapter:"Wird in {chapter} freigeschaltet", skillCurrentChapter:"Aktuelles Kapitel: {chapter}", skillChapter1:"Kapitel I", skillChapter2:"Kapitel II", skillChapter3:"Kapitel III" },
  es: { skillNeedPoint:"Consigue un punto de habilidad para desbloquear este nodo.", skillUnlockChapter:"Se desbloquea en {chapter}", skillCurrentChapter:"Capítulo actual: {chapter}", skillChapter1:"Capítulo I", skillChapter2:"Capítulo II", skillChapter3:"Capítulo III" },
  pl: { skillNeedPoint:"Zdobądź punkt umiejętności, aby odblokować ten węzeł.", skillUnlockChapter:"Odblokuje się w rozdziale {chapter}", skillCurrentChapter:"Bieżący rozdział: {chapter}", skillChapter1:"Rozdział I", skillChapter2:"Rozdział II", skillChapter3:"Rozdział III" },
  "zh-CN": { skillNeedPoint:"获得技能点以解锁此节点。", skillUnlockChapter:"将在{chapter}解锁", skillCurrentChapter:"当前章节：{chapter}", skillChapter1:"第一章", skillChapter2:"第二章", skillChapter3:"第三章" },
};
const SKILL_ADVANCED_TEXT = {
  fr:{ skillClose:"Fermer l’arbre", skillAdvancedHint:"Au chapitre III, atteins le niveau 8 pour choisir une spécialisation, puis le niveau 12 pour son ultime.", skillRank4:"Spécialisation", skillRank5:"Ultime", skillChoiceBladeA:"Duelliste", skillChoiceBladeADesc:"+15 % de chances de critique; l’ultime porte les critiques à ×2.", skillChoiceBladeB:"Fauche-vie", skillChoiceBladeBDesc:"Le vol de vie passe à 20 % au rang ultime.", skillChoiceGuardianA:"Rempart", skillChoiceGuardianADesc:"Réduit encore les dégâts subis; l’ultime renforce ce rempart.", skillChoiceGuardianB:"Gardien vengeur", skillChoiceGuardianBDesc:"Défendre renvoie une part des dégâts au rang ultime.", skillChoiceAlchemyA:"Distillateur", skillChoiceAlchemyADesc:"Les potions soignent davantage et la capacité augmente au rang ultime.", skillChoiceAlchemyB:"Alchimiste de guerre", skillChoiceAlchemyBDesc:"Les potions renforcent fortement la prochaine attaque.", skillNoPoint:"Point requis", skillNeedLevel8:"Niveau 8 requis", skillNeedLevel12:"Niveau 12 requis" },
  en:{ skillClose:"Close skill tree", skillAdvancedHint:"In Chapter III, reach level 8 to specialize, then level 12 to unlock your ultimate.", skillRank4:"Specialization", skillRank5:"Ultimate", skillChoiceBladeA:"Duelist", skillChoiceBladeADesc:"+15% critical chance; the ultimate raises critical damage to ×2.", skillChoiceBladeB:"Lifetaker", skillChoiceBladeBDesc:"Life steal rises to 20% with the ultimate.", skillChoiceGuardianA:"Bulwark", skillChoiceGuardianADesc:"Further reduces incoming damage; the ultimate strengthens the bulwark.", skillChoiceGuardianB:"Vengeful Warden", skillChoiceGuardianBDesc:"Defending reflects damage, improved by the ultimate.", skillChoiceAlchemyA:"Distiller", skillChoiceAlchemyADesc:"Potions heal more and capacity increases with the ultimate.", skillChoiceAlchemyB:"War Alchemist", skillChoiceAlchemyBDesc:"Potions greatly empower your next attack.", skillNoPoint:"Skill point required", skillNeedLevel8:"Level 8 required", skillNeedLevel12:"Level 12 required" },
  de:{ skillClose:"Fertigkeitsbaum schließen", skillAdvancedHint:"Erreiche in Kapitel III Stufe 8 für eine Spezialisierung und Stufe 12 für dein Ultimativtalent.", skillRank4:"Spezialisierung", skillRank5:"Ultimativ", skillChoiceBladeA:"Duellant", skillChoiceBladeADesc:"+15 % kritische Trefferchance; das Ultimativ erhöht kritischen Schaden auf ×2.", skillChoiceBladeB:"Lebensfänger", skillChoiceBladeBDesc:"Lebensraub steigt mit dem Ultimativ auf 20 %.", skillChoiceGuardianA:"Bollwerk", skillChoiceGuardianADesc:"Verringert erlittenen Schaden weiter; das Ultimativ verstärkt den Schutz.", skillChoiceGuardianB:"Rachewächter", skillChoiceGuardianBDesc:"Verteidigen reflektiert Schaden, mit Ultimativ stärker.", skillChoiceAlchemyA:"Destillateur", skillChoiceAlchemyADesc:"Tränke heilen mehr und die Kapazität steigt mit dem Ultimativ.", skillChoiceAlchemyB:"Kriegsalchemist", skillChoiceAlchemyBDesc:"Tränke stärken deinen nächsten Angriff deutlich.", skillNoPoint:"Fertigkeitspunkt erforderlich", skillNeedLevel8:"Stufe 8 erforderlich", skillNeedLevel12:"Stufe 12 erforderlich" },
  es:{ skillClose:"Cerrar árbol de habilidades", skillAdvancedHint:"En el capítulo III, alcanza el nivel 8 para especializarte y el nivel 12 para desbloquear tu definitiva.", skillRank4:"Especialización", skillRank5:"Definitiva", skillChoiceBladeA:"Duelista", skillChoiceBladeADesc:"+15 % de probabilidad crítica; la definitiva aumenta el daño crítico a ×2.", skillChoiceBladeB:"Segavidas", skillChoiceBladeBDesc:"El robo de vida llega al 20 % con la definitiva.", skillChoiceGuardianA:"Baluarte", skillChoiceGuardianADesc:"Reduce aún más el daño recibido; la definitiva refuerza la protección.", skillChoiceGuardianB:"Guardián vengativo", skillChoiceGuardianBDesc:"Defender devuelve daño, con más fuerza en la definitiva.", skillChoiceAlchemyA:"Destilador", skillChoiceAlchemyADesc:"Las pociones curan más y su capacidad aumenta con la definitiva.", skillChoiceAlchemyB:"Alquimista de guerra", skillChoiceAlchemyBDesc:"Las pociones potencian mucho tu próximo ataque.", skillNoPoint:"Se requiere un punto", skillNeedLevel8:"Se requiere nivel 8", skillNeedLevel12:"Se requiere nivel 12" },
  pl:{ skillClose:"Zamknij drzewko", skillAdvancedHint:"W rozdziale III osiągnij poziom 8, aby wybrać specjalizację, i poziom 12, aby odblokować umiejętność ostateczną.", skillRank4:"Specjalizacja", skillRank5:"Umiejętność ostateczna", skillChoiceBladeA:"Pojedynkowicz", skillChoiceBladeADesc:"+15% szansy na trafienie krytyczne; umiejętność ostateczna zwiększa obrażenia krytyczne do ×2.", skillChoiceBladeB:"Życiodawca", skillChoiceBladeBDesc:"Kradzież życia wzrasta do 20% po zdobyciu umiejętności ostatecznej.", skillChoiceGuardianA:"Bastion", skillChoiceGuardianADesc:"Dodatkowo zmniejsza obrażenia; umiejętność ostateczna wzmacnia ochronę.", skillChoiceGuardianB:"Mściwy strażnik", skillChoiceGuardianBDesc:"Obrona odbija część obrażeń, a umiejętność ostateczna zwiększa ten efekt.", skillChoiceAlchemyA:"Destylator", skillChoiceAlchemyADesc:"Mikstury leczą więcej, a ich limit rośnie po zdobyciu umiejętności ostatecznej.", skillChoiceAlchemyB:"Alchemik wojenny", skillChoiceAlchemyBDesc:"Mikstury mocno wzmacniają następny atak.", skillNoPoint:"Wymagany punkt umiejętności", skillNeedLevel8:"Wymagany poziom 8", skillNeedLevel12:"Wymagany poziom 12" },
  "zh-CN":{ skillClose:"关闭技能树", skillAdvancedHint:"第三章达到8级可选择专精，达到12级可解锁终极技能。", skillRank4:"专精", skillRank5:"终极", skillChoiceBladeA:"决斗者", skillChoiceBladeADesc:"暴击率+15%；终极技能使暴击伤害提升至×2。", skillChoiceBladeB:"夺命者", skillChoiceBladeBDesc:"解锁终极技能后，生命偷取提高至20%。", skillChoiceGuardianA:"壁垒", skillChoiceGuardianADesc:"进一步降低受到的伤害；终极技能强化防护。", skillChoiceGuardianB:"复仇守卫", skillChoiceGuardianBDesc:"防御时反弹伤害，终极技能进一步增强。", skillChoiceAlchemyA:"调剂师", skillChoiceAlchemyADesc:"药水恢复更多生命，终极技能增加携带上限。", skillChoiceAlchemyB:"战争炼金术士", skillChoiceAlchemyBDesc:"药水大幅强化下一次攻击。", skillNoPoint:"需要技能点", skillNeedLevel8:"需要8级", skillNeedLevel12:"需要12级" },
};
for (const [language, copy] of Object.entries(SKILL_ADVANCED_TEXT)) Object.assign(RPG_TEXT[language], copy);
for (const [language, copy] of Object.entries(SKILL_STAGE_TEXT)) Object.assign(RPG_TEXT[language], copy);
Object.assign(RPG_TEXT.fr, { campPotion:"Le camp vous permet de refaire une potion.", routeQuest:"Quête · La carte des cinq chemins", routeQuestProgress:"Chemins explorés : {count}/5", routeQuestStart:"Un cartographe spectral vous confie une quête : explorer cinq chemins distincts.", routeQuestComplete:"Quête achevée ! Sa boussole runique vous donne +2 ATQ.", routeRelic:"Boussole runique · +2 ATQ" });
Object.assign(RPG_TEXT.en, { campPotion:"Resting at camp restores one potion.", routeQuest:"Quest · Map Five Paths", routeQuestProgress:"Paths explored: {count}/5", routeQuestStart:"A spectral cartographer asks you to explore five distinct paths.", routeQuestComplete:"Quest complete! The runic compass grants +2 ATK.", routeRelic:"Runic compass · +2 ATK" });
Object.assign(RPG_TEXT.de, { campPotion:"Bei einer Rast erhältst du einen Trank zurück.", routeQuest:"Quest · Karte der fünf Wege", routeQuestProgress:"Erkundete Wege: {count}/5", routeQuestStart:"Ein geisterhafter Kartograf bittet dich, fünf verschiedene Wege zu erkunden.", routeQuestComplete:"Quest abgeschlossen! Der Runenkompass gewährt +2 ANG.", routeRelic:"Runenkompass · +2 ANG" });
Object.assign(RPG_TEXT.es, { campPotion:"Al descansar en el campamento recuperas una poción.", routeQuest:"Misión · Mapa de cinco rutas", routeQuestProgress:"Rutas exploradas: {count}/5", routeQuestStart:"Un cartógrafo espectral te pide explorar cinco rutas distintas.", routeQuestComplete:"¡Misión cumplida! La brújula rúnica otorga +2 ATQ.", routeRelic:"Brújula rúnica · +2 ATQ" });
Object.assign(RPG_TEXT.pl, { campPotion:"Odpoczynek w obozie odnawia jedną miksturę.", routeQuest:"Zadanie · Mapa pięciu szlaków", routeQuestProgress:"Zbadane szlaki: {count}/5", routeQuestStart:"Widmowy kartograf prosi cię o zbadanie pięciu różnych szlaków.", routeQuestComplete:"Zadanie ukończone! Runiczny kompas zapewnia +2 ATK.", routeRelic:"Runiczny kompas · +2 ATK" });
Object.assign(RPG_TEXT["zh-CN"], { campPotion:"在营地休息可补充一瓶药水。", routeQuest:"任务 · 五条道路地图", routeQuestProgress:"已探索道路：{count}/5", routeQuestStart:"一位幽灵制图师请你探索五条不同的道路。", routeQuestComplete:"任务完成！符文罗盘使攻击力提高2点。", routeRelic:"符文罗盘 · 攻击 +2" });
function loadSettings() {
  try {
    const saved = { ...DEFAULT_SETTINGS, ...JSON.parse(localStorage.getItem(SETTINGS_KEY) || "{}") };
    if (!UI_TEXT[saved.language]) saved.language = DEFAULT_SETTINGS.language;
    if (!Number.isFinite(Number(saved.volume))) saved.volume = DEFAULT_SETTINGS.volume;
    saved.volume = Math.max(0, Math.min(100, Number(saved.volume)));
    saved.music = Boolean(saved.music);
    saved.motion = Boolean(saved.motion);
    return saved;
  } catch { return { ...DEFAULT_SETTINGS }; }
}
let settings = loadSettings();
let musicElement = null;
let ambientElement = null;
let currentMusicKey = null;
let currentAmbientKey = null;
function loadProfile() {
  try {
    const saved = JSON.parse(localStorage.getItem(PROFILE_KEY) || "{}");
    return {
      unlocked: Array.isArray(saved.unlocked) ? saved.unlocked : [],
      completedChapters: Array.isArray(saved.completedChapters) ? saved.completedChapters : [],
      noDeathChapters: Array.isArray(saved.noDeathChapters) ? saved.noDeathChapters : [],
      defeatedBosses: Array.isArray(saved.defeatedBosses) ? saved.defeatedBosses : [],
      uniqueEnemies: Array.isArray(saved.uniqueEnemies) ? saved.uniqueEnemies : [],
      chapterClasses: saved.chapterClasses && typeof saved.chapterClasses === "object" ? saved.chapterClasses : {},
      legacyChapterClasses: saved.chapterClasses && typeof saved.chapterClasses === "object" ? saved.chapterClasses : {},
      rawChapterClasses: saved.chapterClassesByChapter && typeof saved.chapterClassesByChapter === "object" ? saved.chapterClassesByChapter : {},
      chapterClassesByChapter: saved.chapterClassesByChapter && typeof saved.chapterClassesByChapter === "object" ? saved.chapterClassesByChapter : {},
      chapterCompletions: saved.chapterCompletions && typeof saved.chapterCompletions === "object" ? saved.chapterCompletions : {},
      cleanChapterCompletions: saved.cleanChapterCompletions && typeof saved.cleanChapterCompletions === "object" ? saved.cleanChapterCompletions : {},
      allChapterCompletions: saved.allChapterCompletions && typeof saved.allChapterCompletions === "object" ? saved.allChapterCompletions : {},
      chapter2Routes: Array.isArray(saved.chapter2Routes) ? saved.chapter2Routes : [],
      skillMastery: saved.skillMastery && typeof saved.skillMastery === "object" ? saved.skillMastery : {},
      highestLevel: Number(saved.highestLevel) || 1,
      totalDeaths: Number(saved.totalDeaths) || 0,
    };
  } catch {
    return { unlocked: [], completedChapters: [], noDeathChapters: [], defeatedBosses: [], uniqueEnemies: [], chapterClasses: {}, legacyChapterClasses: {}, rawChapterClasses: {}, chapterClassesByChapter: {}, chapterCompletions: {}, cleanChapterCompletions: {}, allChapterCompletions: {}, chapter2Routes: [], skillMastery: {}, highestLevel: 1, totalDeaths: 0 };
  }
}
let profile = loadProfile();
function t(key) { return RPG_TEXT[settings.language]?.[key] || UI_TEXT[settings.language]?.[key] || RPG_TEXT.fr[key] || UI_TEXT.fr[key] || key; }
function campaignText(key) { return CAMPAIGN_TEXT[settings.language]?.[key] || CAMPAIGN_TEXT.fr[key] || key; }
function bossText(key) { return BOSS_COMBAT_TEXT[settings.language]?.[key] || BOSS_COMBAT_TEXT.fr[key] || key; }
function localizedClass(heroClass) {
  const index = CONTENT.classes.findIndex((item) => item.id === heroClass.id);
  const translated = TRANSLATIONS[settings.language]?.content?.classes?.[index];
  return translated ? { ...heroClass, ...translated } : heroClass;
}
function localizedEnemyName(name) {
  const translation = TRANSLATIONS[settings.language];
  const bossTranslation = translation?.content?.bossNames?.find((boss) => boss.source === name)?.target;
  if (bossTranslation && bossTranslation !== name) return bossTranslation;
  const sourceEnemies = CONTENT.basicEnemies;
  const index = sourceEnemies.findIndex((enemy) => enemy.name === name);
  return index >= 0 ? translation?.content?.basicEnemies?.[index]?.target || translation?.content?.enemies?.[index] || name : name;
}
function localizedAchievement(achievement) {
  const index = CONTENT.achievements.findIndex((item) => item.id === achievement.id);
  const translated = TRANSLATIONS[settings.language]?.content?.achievements?.[index];
  return translated ? { ...achievement, ...translated } : achievement;
}
function localizedChapter(chapter) { return { ...chapter, ...(TRANSLATIONS[settings.language]?.chapters?.[chapter.id] || {}) }; }
function localizedEnemyTemplate(enemy) {
  const localizedName = localizedEnemyName(enemy.name);
  return localizedName !== enemy.name ? { ...enemy, name: localizedName, sourceName: enemy.name } : enemy;
}
function localizedEventField(scene, field) {
  const fieldIndex = { text: 0, yes: 1, no: 2 }[field];
  const translated = TRANSLATIONS[settings.language]?.events?.[state.chapter]?.[Number(scene?.number) - 1]?.[fieldIndex];
  const source = (state.chapter === 1 ? CONTENT.storyEvents : state.chapter === 2 ? CONTENT.treasureEvents : CONTENT.nordicEvents)?.[Number(scene?.number) - 1]?.[field];
  return translated || source || scene?.[field] || "";
}
function localizedPath(pathMap, pathKey) { return TRANSLATIONS[settings.language]?.paths?.[state.chapter]?.[pathKey] || pathMap[pathKey] || ""; }
function localizedEnemyDecor(decor) {
  const key = {
    "Salle finale": "Final chamber", "Dernier sceau": "Final seal", "Palais final": "Final palace", "Roi": "King",
    "Clairière": "Clearing", "Runes": "Runes", "Enfant": "Child", "Village": "Village", "Ombre": "Shadow",
    "Coffre": "Chest", "Couronne": "Crown", "Fjord": "Fjord", "Arbre": "Tree", "Route": "Road",
  }[decor];
  if (!key) return translatedDecor(decor);
  const labels = {
    en: {"Final chamber":"Final chamber","Final seal":"Final seal","Final palace":"Final palace","King":"King","Clearing":"Clearing","Runes":"Runes","Child":"Child","Village":"Village","Shadow":"Shadow","Chest":"Chest","Crown":"Crown","Fjord":"Fjord","Tree":"Tree","Road":"Road"},
    de: {"Final chamber":"Letzte Kammer","Final seal":"Letztes Siegel","Final palace":"Letzter Palast","King":"König","Clearing":"Lichtung","Runes":"Runen","Child":"Kind","Village":"Dorf","Shadow":"Schatten","Chest":"Truhe","Crown":"Krone","Fjord":"Fjord","Tree":"Baum","Road":"Weg"},
    es: {"Final chamber":"Cámara final","Final seal":"Sello final","Final palace":"Palacio final","King":"Rey","Clearing":"Claro","Runes":"Runas","Child":"Niño","Village":"Pueblo","Shadow":"Sombra","Chest":"Cofre","Crown":"Corona","Fjord":"Fiordo","Tree":"Árbol","Road":"Camino"},
    pl: {"Final chamber":"Ostatnia komnata","Final seal":"Ostatnia pieczęć","Final palace":"Ostatni pałac","King":"Król","Clearing":"Polana","Runes":"Runy","Child":"Dziecko","Village":"Wioska","Shadow":"Cień","Chest":"Skrzynia","Crown":"Korona","Fjord":"Fiord","Tree":"Drzewo","Road":"Droga"},
    "zh-CN": {"Final chamber":"最终大厅","Final seal":"最终封印","Final palace":"最终宫殿","King":"国王","Clearing":"林间空地","Runes":"符文","Child":"孩子","Village":"村庄","Shadow":"阴影","Chest":"宝箱","Crown":"王冠","Fjord":"峡湾","Tree":"树","Road":"道路"},
  };
  return labels[settings.language]?.[key] || labels.en[key] || decor;
}
function saveSettings() { localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings)); applySettings(); syncAudio(); }
function saveProfile() { localStorage.setItem(PROFILE_KEY, JSON.stringify(profile)); }
function rememberSkillMastery(hero = state.hero) {
  if (!hero?.classId || !hero.skills) return;
  profile.skillMastery = profile.skillMastery && typeof profile.skillMastery === "object" ? profile.skillMastery : {};
  const classMastery = profile.skillMastery[hero.classId] && typeof profile.skillMastery[hero.classId] === "object" ? profile.skillMastery[hero.classId] : {};
  for (const branch of ["blade", "guardian", "alchemy"]) {
    classMastery[branch] = Math.max(Number(classMastery[branch]) || 0, Number(hero.skills[branch]) || 0);
    if (hero.specializations?.[branch]) classMastery[`${branch}Specialization`] ||= hero.specializations[branch];
  }
  profile.skillMastery[hero.classId] = classMastery;
  saveProfile();
}
function unlockedTrophyCount() {
  const knownIds = new Set(CONTENT.achievements.map((achievement) => achievement.id));
  return profile.unlocked.filter((id) => knownIds.has(id)).length;
}
function applySettings() {
    document.documentElement.lang = settings.language === "zh-CN" ? "zh-CN" : settings.language;
  document.body.dataset.display = settings.display;
  document.body.dataset.motion = settings.motion ? "on" : "off";
  document.body.dataset.music = settings.music ? "on" : "off";
}
function desiredMusicKey() {
  if (state.screen === "game" && state.battle) return "battle";
  if (state.screen === "game" && state.chapter === 1) return "chapter1";
  if (state.screen === "game" && state.chapter === 2) return "chapter2";
  if (state.screen === "game" && state.chapter === 3) return "chapter3";
  if (["title", "menu", "select", "credits", "settings", "achievements"].includes(state.screen)) return "menu";
  return null;
}
function desiredAmbientKey() {
  if (state.screen !== "game" || state.battle) return null;
  if (state.chapter === 1) return state.chapterPath === "forêt" ? "forest" : "birds";
  if (state.chapter === 2) return "sakura";
  if (state.chapter === 3 && state.chapterPath === "mer") return "sea";
  return null;
}
function stopAudio(element, currentKeyName) {
  if (!element) return;
  element.pause();
  element.currentTime = 0;
  if (currentKeyName === "music") currentMusicKey = null;
  if (currentKeyName === "ambient") currentAmbientKey = null;
}
function playAudioTrack(kind, key, sources, volume) {
  const isMusic = kind === "music";
  const element = isMusic ? musicElement : ambientElement;
  const currentKey = isMusic ? currentMusicKey : currentAmbientKey;
  if (!key || !settings.music) {
    stopAudio(element, kind);
    return;
  }
  if (element && currentKey === key) {
    element.volume = volume;
    if (element.paused) element.play().catch(() => {});
    return;
  }
  stopAudio(element, kind);
  const next = new Audio(sources[key]);
  next.loop = true;
  next.volume = volume;
  next.preload = "auto";
  next.addEventListener("error", () => console.warn("Audio introuvable : " + sources[key]), { once: true });
  next.play().catch(() => {});
  if (isMusic) { musicElement = next; currentMusicKey = key; }
  else { ambientElement = next; currentAmbientKey = key; }
}
function syncAudio() {
  const volume = Math.max(0, Math.min(1, Number(settings.volume) / 100));
  playAudioTrack("music", desiredMusicKey(), AUDIO_TRACKS, volume * 0.45);
  playAudioTrack("ambient", desiredAmbientKey(), AUDIO_AMBIENTS, volume * 0.18);
}
function playSfx(key) {
  if (!settings.music || !AUDIO_SFX[key]) return;
  const effect = new Audio(AUDIO_SFX[key]);
  effect.volume = Math.max(0, Math.min(1, Number(settings.volume) / 100)) * 0.55;
  effect.play().catch(() => {});
}
function classesForChapter(chapter) { return CONTENT.classes.filter((heroClass) => !heroClass.minChapter || chapter.id >= heroClass.minChapter); }
function unlockAchievement(id) {
  if (profile.unlocked.includes(id)) return false;
  const achievement = CONTENT.achievements.find((item) => item.id === id);
  if (!achievement) return false;
  profile.unlocked.push(id);
  saveProfile();
  if (state.screen === "game" && state.log) addLog(`🏆 ${t("trophyUnlocked")}: ${localizedAchievement(achievement).title}`, "achievement");
  return true;
}
function evaluateAchievements() {
  const completed = new Set(profile.completedChapters);
  const rawChapterClasses = profile.rawChapterClasses || {};
  const chapterClasses = (chapter) => new Set([
    ...(profile.chapterClasses[String(chapter)] || []),
    ...(rawChapterClasses[String(chapter)] || []),
  ]);
  const defeatedBossNames = new Set(profile.defeatedBosses.map((name) => {
    const match = Object.values(TRANSLATIONS).flatMap((translation) => translation.content?.bossNames || []).find((boss) => boss.target === name);
    return match?.source || name;
  }));
  if ([...defeatedBossNames].some((name) => name.includes("Azharkan"))) unlockAchievement("demon-king");
  if ([...defeatedBossNames].some((name) => name.includes("Eivor"))) unlockAchievement("nordic-king");
  const namelessKing = CONTENT.bosses.find((boss) => boss.name.includes("Roi sans Nom"))?.name;
  if (namelessKing && defeatedBossNames.has(namelessKing)) unlockAchievement("medieval-king");
  if ([...defeatedBossNames].length >= 1) unlockAchievement("first-boss");
  if ([...defeatedBossNames].length >= 5) unlockAchievement("five-bosses");
  if ([...defeatedBossNames].length >= 10) unlockAchievement("ten-bosses");
  if ([...defeatedBossNames].length >= 15) unlockAchievement("fifteen-bosses");
  const chapterClassesByChapter = profile.chapterClassesByChapter || {};
  const legacyChapterClasses = profile.legacyChapterClasses || {};
  CONTENT.classes.forEach((heroClass) => {
    const usedInCompletedChapter = profile.completedChapters.some((chapter) =>
      (!heroClass.minChapter || chapter >= heroClass.minChapter)
      && (chapterClassesByChapter[String(chapter)]?.includes(heroClass.id)
        || rawChapterClasses[String(chapter)]?.includes(heroClass.id)
        || legacyChapterClasses[String(chapter)]?.includes(heroClass.id)));
    if (usedInCompletedChapter) unlockAchievement(`class-${heroClass.id}`);
  });
  const completedClassIds = (chapter) => new Set([
    ...(rawChapterClasses[String(chapter)] || []),
    ...(chapterClassesByChapter[String(chapter)] || []),
    ...(completed.has(Number(chapter)) ? legacyChapterClasses[String(chapter)] || [] : []),
  ]);
  if (completedClassIds(1).size >= 10) unlockAchievement("village-classes");
  if (completedClassIds(2).size >= 15) unlockAchievement("japan-classes");
  if (completedClassIds(3).size >= 20) unlockAchievement("nordic-classes");

  if (completed.has(1)) unlockAchievement("village-hero");
  if (completed.has(2)) unlockAchievement("treasure-hunter");
  if (completed.has(3)) unlockAchievement("eivor-legend");
  if ([1, 2, 3].every((chapter) => completed.has(chapter))) unlockAchievement("trilogy-complete");
  if ([1, 2, 3].every((chapter) => profile.noDeathChapters.includes(chapter))) unlockAchievement("trilogy-no-death");
  if (profile.chapter2Routes.length >= 5) unlockAchievement("pathfinder");
  if (profile.highestLevel >= 5) unlockAchievement("level-five");
  if (profile.highestLevel >= 10) unlockAchievement("level-ten");
  if (profile.highestLevel >= 12) unlockAchievement("level-twenty");
  if (profile.highestLevel >= 15) unlockAchievement("level-fifty");
  if (profile.highestLevel >= 20) unlockAchievement("level-one-hundred");
  const regularTrophies = CONTENT.achievements.filter((achievement) => achievement.tier !== "platinum");
  if (regularTrophies.length && regularTrophies.every((achievement) => profile.unlocked.includes(achievement.id))) unlockAchievement("platinum");
}
function registerDeath() {
  if (state.gameOver) return;
  state.runDeaths += 1;
  profile.totalDeaths += 1;
  saveProfile();
}
function recordChapterCompletion() {
  if (state.completed) return;
  state.completed = true;
  const chapterId = Number(state.chapter);
  profile.completedChapters = [...new Set([...profile.completedChapters, chapterId])];
  profile.chapterCompletions = profile.chapterCompletions && typeof profile.chapterCompletions === "object" ? profile.chapterCompletions : {};
  profile.allChapterCompletions = profile.allChapterCompletions && typeof profile.allChapterCompletions === "object" ? profile.allChapterCompletions : {};
  const classKey = String(chapterId);
  profile.chapterClasses[classKey] = Array.isArray(profile.chapterClasses[classKey]) ? profile.chapterClasses[classKey] : [];
  if (!profile.chapterClasses[classKey].includes(state.hero.classId)) profile.chapterClasses[classKey].push(state.hero.classId);
  profile.chapterClassesByChapter = profile.chapterClassesByChapter && typeof profile.chapterClassesByChapter === "object" ? profile.chapterClassesByChapter : {};
  profile.chapterClassesByChapter[classKey] = Array.isArray(profile.chapterClassesByChapter[classKey]) ? profile.chapterClassesByChapter[classKey] : [];
  if (!profile.chapterClassesByChapter[classKey].includes(state.hero.classId)) profile.chapterClassesByChapter[classKey].push(state.hero.classId);
  const clearDeaths = Number(state.runDeaths) || 0;
  profile.allChapterCompletions = profile.allChapterCompletions && typeof profile.allChapterCompletions === "object" ? profile.allChapterCompletions : {};
  const allCompletions = Array.isArray(profile.allChapterCompletions[String(chapterId)]) ? profile.allChapterCompletions[String(chapterId)] : [];
  allCompletions.push(clearDeaths);
  profile.allChapterCompletions[String(chapterId)] = allCompletions;
  profile.chapterCompletions[String(chapterId)] = { deaths: clearDeaths };
  profile.cleanChapterCompletions = profile.cleanChapterCompletions && typeof profile.cleanChapterCompletions === "object" ? profile.cleanChapterCompletions : {};
  if (clearDeaths === 0) profile.cleanChapterCompletions[String(chapterId)] = true;
  profile.completedChapters = [...new Set(profile.completedChapters)];
  if (clearDeaths === 0 && !profile.noDeathChapters.includes(chapterId)) profile.noDeathChapters.push(chapterId);

  if (chapterId === 2) {
    const exploredRoutes = Array.isArray(state.chapterRoutes) && state.chapterRoutes.length ? state.chapterRoutes : [state.chapterPath];
    exploredRoutes.filter(Boolean).forEach((route) => {
      if (!profile.chapter2Routes.includes(route)) profile.chapter2Routes.push(route);
    });
  }
  unlockAchievement(`class-${state.hero.classId}`);
  addLog(getStoryEndingText(), "system");
  evaluateAchievements();
  saveProfile();
  saveGame();
}
function recordEnemyDefeat(enemy) {
  const originalName = enemy.sourceName || enemy.name;
  if (!profile.uniqueEnemies.includes(originalName)) profile.uniqueEnemies.push(originalName);
  if (enemy.type === "boss" && !profile.defeatedBosses.includes(originalName)) profile.defeatedBosses.push(originalName);
  evaluateAchievements();
  saveProfile();
}

const state = {
  storyVersion: STORY_VERSION,
  screen: "title",
  chapter: null,
  selectedClass: null,
  hero: null,
  enemy: null,
  battle: null,
  scene: 0,
  scenes: [],
  chapterPath: "frontiere",
  chapterRoutes: [],
  routeQuestStarted: false,
  routeQuestComplete: false,
  runDeaths: 0,
  log: [],
  completed: false,
  gameOver: false,
  restCount: 0,
  endingReason: null,
  storyBranches: {},
  finalChoice: null,
};

const app = document.querySelector("#app");
let inventoryOpen = false;
let skillTreeOpen = false;

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" }[char]));
}
function getClass(id) { return CONTENT.classes.find((item) => item.id === id) || CONTENT.classes[0]; }
function inventoryItems() { return Array.isArray(state.hero?.inventory) ? state.hero.inventory : []; }
function potionCapacity() { const hero=state.hero; return 3 + ((Number(hero?.skills?.alchemy) || 0) >= 2 ? 1 : 0) + (hero?.specializations?.alchemy === "distiller" && (Number(hero.skills?.alchemy) || 0) >= 5 ? 1 : 0); }
function recalculateHeroStats() {
  const hero = state.hero;
  if (!hero) return;
  const equipped = inventoryItems().filter((item) => item.equipped);
  const weaponBonus = equipped.filter((item) => item.kind === "weapon").reduce((sum, item) => sum + Math.max(0, Number(item.bonus) || 0), 0);
  const armorBonus = equipped.filter((item) => item.kind === "armor").reduce((sum, item) => sum + Math.max(0, Number(item.bonus) || 0), 0);
  const relicBonus = equipped.filter((item) => item.kind === "relic").reduce((sum, item) => sum + Math.max(0, Number(item.bonus) || 0), 0);
  const skills = hero.skills || (hero.skills = { blade: 0, guardian: 0, alchemy: 0 });
  const bladeRank = Math.max(0, Math.min(5, Number(skills.blade) || 0));
  const guardianRank = Math.max(0, Math.min(5, Number(skills.guardian) || 0));
  hero.equipment = { weapon: weaponBonus, armor: armorBonus, relic: equipped.filter((item) => item.kind === "relic").length };
  hero.attack = Math.max(1, Number(hero.baseAttack) || 1) + weaponBonus + relicBonus + (bladeRank >= 1 ? 2 : 0);
  hero.maxHp = Math.max(1, Number(hero.baseMaxHp) || 1) + armorBonus + (guardianRank >= 1 ? 5 : 0);
  hero.hp = Math.min(Math.max(0, Number(hero.hp) || 0), hero.maxHp);
}
function normalizeInventory(hero) {
  if (!hero) return;
  const legacy = hero.equipment && typeof hero.equipment === "object" ? hero.equipment : { weapon: 0, armor: 0, relic: 0 };
  if (!Array.isArray(hero.inventory)) {
    hero.inventory = [];
    const weapon = Math.max(0, Number(legacy.weapon) || 0);
    const armor = Math.max(0, Number(legacy.armor) || 0);
    if (weapon) hero.inventory.push({ id: "legacy-weapon", kind: "weapon", bonus: weapon, equipped: true });
    if (armor) hero.inventory.push({ id: "legacy-armor", kind: "armor", bonus: armor, equipped: true });
    if (Number(legacy.relic)) hero.inventory.push({ id: "legacy-relic", kind: "relic", bonus: 2, equipped: true });
  }
  hero.inventory = hero.inventory.filter((item) => item && ["weapon", "armor", "relic"].includes(item.kind)).map((item, index) => ({
    id: String(item.id || `item-${index + 1}`), kind: item.kind, bonus: Math.max(0, Number(item.bonus) || 0), equipped: Boolean(item.equipped), rarity: ["common", "rare", "epic", "legendary"].includes(item.rarity) ? item.rarity : "common", effect: ["crit", "ward", "mending"].includes(item.effect) ? item.effect : "none", effectValue: Math.max(0, Number(item.effectValue) || 0),
  }));
  hero.skillPoints = Math.max(0, Number(hero.skillPoints) || 0);
  hero.skills = hero.skills && typeof hero.skills === "object" ? hero.skills : { blade: 0, guardian: 0, alchemy: 0 };
  hero.specializations = hero.specializations && typeof hero.specializations === "object" ? hero.specializations : {};
  for (const [branch, allowed] of Object.entries({ blade:["duelist","lifetaker"], guardian:["bulwark","warden"], alchemy:["distiller","warchemist"] })) if (!allowed.includes(hero.specializations[branch])) delete hero.specializations[branch];
  const chapterCap = Math.max(1, Math.min(3, Number(state.chapter) || 1));
  const level = Number(hero.level) || 1;
  const skillCap = Math.min(5, chapterCap + (chapterCap === 3 && level >= 8 ? 1 : 0) + (chapterCap === 3 && level >= 12 ? 1 : 0));
  for (const branch of ["blade", "guardian", "alchemy"]) { hero.skills[branch] = Math.floor(Math.max(0, Math.min(skillCap, Number(hero.skills[branch]) || 0))); if (hero.skills[branch] < 4) delete hero.specializations[branch]; }
  if (!Number.isFinite(Number(hero.baseAttack))) hero.baseAttack = Math.max(1, (Number(hero.attack) || 1) - (Number(legacy.weapon) || 0) - (Number(legacy.relic) ? 2 : 0));
  if (!Number.isFinite(Number(hero.baseMaxHp))) hero.baseMaxHp = Math.max(1, (Number(hero.maxHp) || 1) - (Number(legacy.armor) || 0));
  recalculateHeroStats();
}
function inventoryItemName(item) {
  if (item.kind === "weapon") return t("lootWeapon").replace("{bonus}", item.bonus);
  if (item.kind === "armor") return t("lootArmor").replace("{bonus}", item.bonus);
  return t("routeRelic").replace("+2", `+${item.bonus}`);
}
function itemEffectLabel(item) {
  if (item.effect === "crit") return t("effect_crit").replace("{value}", item.effectValue);
  if (item.effect === "ward") return t("effect_ward").replace("{value}", item.effectValue);
  if (item.effect === "mending") return t("effect_mending").replace("{value}", item.effectValue);
  return t("effect_none");
}
function renderInventoryOverlay() {
  const items = inventoryItems();
  const cards = items.map((item) => `<article class="inventory-item rarity--${item.rarity} ${item.equipped ? "is-equipped" : ""}"><div class="inventory-item-icon">${item.kind === "weapon" ? "⚔" : item.kind === "armor" ? "🛡" : "✧"}</div><div class="inventory-item-copy"><h3>${escapeHtml(inventoryItemName(item))}</h3><span>${t(`rarity_${item.rarity}`)} · ${item.equipped ? t("equipped") : t("inBackpack")}</span><small>${escapeHtml(itemEffectLabel(item))}</small></div><button class="btn ${item.equipped ? "" : "btn--cyan"}" data-inventory-toggle="${escapeHtml(item.id)}">${item.equipped ? t("unequip") : t("equip")}</button></article>`).join("");
  return `<div class="modal-backdrop inventory-backdrop"><section class="modal inventory-modal" role="dialog" aria-modal="true" aria-label="${t("inventoryAria")}"><header class="inventory-heading"><div><div class="eyebrow">${t("equipment")}</div><h2>🎒 ${t("inventory")}</h2></div><button class="btn btn--small" data-inventory-close aria-label="${t("closeInventory")}">✕</button></header><p class="inventory-hint">${t("inventoryHint")}</p><div class="inventory-items">${cards || `<p class="inventory-empty">${t("inventoryEmpty")}</p>`}</div><div class="modal-actions"><button class="btn btn--cyan" data-inventory-close>${t("closeInventory")}</button></div></section></div>`;
}
function renderSkillTreeOverlay() {
  const hero = state.hero;
  const branches = [
    { id:"blade", title:"skillBranchBlade", icon:"⚔" },
    { id:"guardian", title:"skillBranchGuardian", icon:"🛡" },
    { id:"alchemy", title:"skillBranchAlchemy", icon:"⚗" },
  ];
  const cards = branches.map((branch) => {
    const rank = hero.skills?.[branch.id] || 0;
    const titleCase = branch.id[0].toUpperCase() + branch.id.slice(1);
    const nodes = [1, 2, 3].map((level) => {
      const learned = rank >= level;
      const prerequisiteMet = rank === level - 1;
      const chapterReady = state.chapter >= level;
      const available = prerequisiteMet && chapterReady && hero.skillPoints > 0;
      const status = learned ? "learned" : available ? "available" : prerequisiteMet && chapterReady ? "needpoint" : "locked";
      const statusLabel = learned ? t("skillLearned") : available ? t("skillAvailable") : !chapterReady ? t("skillUnlockChapter").replace("{chapter}", t(`skillChapter${level}`)) : prerequisiteMet ? t("skillNeedPoint") : t("skillLocked");
      return `<button class="skill-node skill-node--${status}" data-skill-upgrade="${branch.id}" data-skill-rank="${level}" ${available ? "" : "disabled"} aria-label="${t(`skill${titleCase}${level}Name`)} · ${statusLabel}"><span class="skill-node-rank">${level}</span><span class="skill-node-copy"><strong>${t(`skill${titleCase}${level}Name`)}</strong><small>${t(`skill${titleCase}${level}Desc`)}</small><em>${statusLabel}</em></span><span class="skill-node-action">${learned ? "✓" : available ? t("skillLearn") : !chapterReady ? "🔒" : status === "needpoint" ? "◇" : "🔒"}</span></button>`;
    }).join("");
    const options = branch.id === "blade" ? ["duelist","lifetaker"] : branch.id === "guardian" ? ["bulwark","warden"] : ["distiller","warchemist"];
    const optionLabels = branch.id === "blade" ? ["A","B"] : branch.id === "guardian" ? ["A","B"] : ["A","B"];
    const specialization = hero.specializations?.[branch.id];
    const advancedNode = (level) => {
      const levelRequired = level === 4 ? 8 : 12;
      const requirement = rank >= level ? null : rank < level - 1 ? t("skillLocked") : state.chapter < 3 ? t("skillChapter3") : hero.level < levelRequired ? t(level === 4 ? "skillNeedLevel8" : "skillNeedLevel12") : hero.skillPoints <= 0 ? t("skillNoPoint") : null;
      const available = rank === level - 1 && state.chapter === 3 && hero.level >= levelRequired && hero.skillPoints > 0 && (level !== 4 || Boolean(specialization));
      const learned = rank >= level;
      const status = learned ? "learned" : available ? "available" : "locked";
      const key = level === 4 ? options.findIndex((choice) => choice === specialization) >= 0 ? `skillChoice${titleCase}${optionLabels[options.indexOf(specialization)]}` : "skillRank4" : "skillRank5";
      const name = level === 4 ? specialization ? t(key) : t("skillRank4") : t("skillRank5");
      const descKey = level === 4 ? `${key}Desc` : specialization ? `skillChoice${titleCase}${optionLabels[options.indexOf(specialization)]}Desc` : "skillAdvancedHint";
      const desc = level === 4 && !specialization ? t("skillAdvancedHint") : t(descKey);
      const label = learned ? t("skillLearned") : available ? t("skillAvailable") : requirement || (level === 4 && !specialization && rank === 3 ? t("skillNeedPoint") : t("skillLocked"));
      return `<button class="skill-node skill-node--${status}" data-skill-upgrade="${branch.id}" data-skill-rank="${level}" ${available ? "" : "disabled"}><span class="skill-node-rank">${level}</span><span class="skill-node-copy"><strong>${name}</strong><small>${desc}</small><em>${label}</em></span><span class="skill-node-action">${learned ? "✓" : available ? t("skillLearn") : "🔒"}</span></button>`;
    };
    const choiceNodes = state.chapter === 3 && rank === 3 && !specialization ? options.map((choice, index) => {
      const key = `skillChoice${titleCase}${optionLabels[index]}`;
      const available = rank === 3 && state.chapter === 3 && hero.level >= 8 && hero.skillPoints > 0;
      const label = available ? t("skillAvailable") : rank < 3 ? t("skillLocked") : state.chapter < 3 ? t("skillChapter3") : hero.level < 8 ? t("skillNeedLevel8") : t("skillNoPoint");
      return `<button class="skill-node skill-node--${available ? "available" : "locked"}" data-skill-specialize="${branch.id}" data-skill-choice="${options[index]}" ${available ? "" : "disabled"}><span class="skill-node-rank">4</span><span class="skill-node-copy"><strong>${t("skillRank4")} · ${t(key)}</strong><small>${t(`${key}Desc`)}</small><em>${label}</em></span><span class="skill-node-action">${available ? t("skillLearn") : "🔒"}</span></button>`;
    }).join("") : "";
    const advancedNodes = state.chapter === 3 && specialization && rank >= 4 ? `${advancedNode(4)}${advancedNode(5)}` : "";
    return `<section class="skill-branch skill-branch--${branch.id}"><h3><span>${branch.icon}</span>${t(branch.title)} <small>${rank}/5</small></h3><div class="skill-branch-nodes">${nodes}${choiceNodes}${advancedNodes}</div></section>`;
  }).join("");
  return `<div class="modal-backdrop skill-backdrop"><section class="modal skill-modal" role="dialog" aria-modal="true" aria-label="${t("skillTree")}"><header class="inventory-heading"><div><div class="eyebrow">${t("level")} ${hero.level}</div><h2>🌿 ${t("skillTree")}</h2></div><button class="btn btn--small" data-skill-close aria-label="${t("skillClose")}">✕</button></header><div class="skill-tree-summary"><strong>${t("skillRoot")}</strong><span>${t("skillCurrentChapter").replace("{chapter}", t(`skillChapter${state.chapter}`))}</span><span>${t("skillPoints").replace("{count}", hero.skillPoints)}</span></div><p class="inventory-hint">${t("skillTreeHint")} ${t("skillAdvancedHint")}</p><div class="skill-tree-branches">${cards}</div><div class="modal-actions"><button class="btn btn--cyan" data-skill-close>${t("skillClose")}</button></div></section></div>`;
}
function getChapter(id) { const chapter = CHAPTERS.find((item) => item.id === Number(id)) || CHAPTERS[0]; return localizedChapter(chapter); }
function getCurrentScene() { return state.scenes[state.scene] || null; }
function translatedType(type) { return type === "boss" ? t("bossType") : t("enemyType"); }
function enemyPortraitAsset(enemy) {
  const originalName = enemy.sourceName || enemy.name;
  const art = ENEMY_ASSETS[originalName] || ENEMY_ASSETS[enemy.name] || BOSS_ART.find((entry) => entry.test(originalName))?.art;
  if (art) return art;
  if (enemy.asset) return ENEMY_ASSETS[enemy.asset.split("/").pop()?.replace(".svg", "")] || enemy.asset;
  return ENEMY_ART.king;
}
function translatedDecor(decor) { return t(`decor_${decor}`) === `decor_${decor}` ? decor : t(`decor_${decor}`); }
function getEnemyAsset(enemy) {
  return enemyPortraitAsset(enemy);
}
function getSceneText(scene) {
  const pathMap = state.chapter === 1 ? VILLAGE_PATHS : state.chapter === 2 ? TREASURE_PATHS : NORDIC_PATHS;
  let text = localizedEventField(scene, "text");
  if (scene?.number > 1 && (scene.number - 1) % 10 === 0) {
    const choice = state.storyBranches?.[String(scene.number - 1)];
    if (choice) text = t(`branch${state.chapter}${choice === "yes" ? "Yes" : "No"}`);
  }
  const pathKey = scene?.number > 1 ? state.chapterPath : scene?.yesPath;
  if (pathKey && pathMap[pathKey]) return localizedPath(pathMap, pathKey) + ". " + text;
  return text;
}
function getStoryEndingText() {
  if (![1, 2, 3].includes(Number(state.chapter))) return t("completedText");
  const choice = state.finalChoice === "yes" ? "Yes" : "No";
  const key = `storyEnding${state.chapter}${choice}`;
  return t(key) === key ? t("completedText") : t(key);
}

function isChapterUnlocked(id) {
  const chapter = Number(id);
  if (chapter === 1) return true;
  const isClearedWithoutDeath = (chapterId) => {
    const completionHistory = profile.allChapterCompletions?.[String(chapterId)];
    if (Array.isArray(completionHistory) && completionHistory.length > 0) return completionHistory.includes(0);
    if (profile.cleanChapterCompletions?.[String(chapterId)] === true) return true;
    const clearRecord = profile.chapterCompletions?.[String(chapterId)];
    if (clearRecord) return clearRecord.deaths === 0;
    if (profile.allChapterCompletions) return false;
    return profile.completedChapters.includes(chapterId) && profile.noDeathChapters.includes(chapterId);
  };
  if (chapter === 2) return isClearedWithoutDeath(1);
  if (chapter === 3) return isClearedWithoutDeath(1) && isClearedWithoutDeath(2);
  return false;
}
function chooseChapter(id) {
  if (!isChapterUnlocked(id)) {
    const message = Number(id) === 3 ? t("chapter3Lock") : t("chapter2Lock");
    alertInline(message);
    return;
  }
  state.chapter = Number(id);
  state.selectedClass = null;
  state.screen = "select";
  render();
}

function render() {
  applySettings();
  if (state.screen === "title") renderTitle();
  if (state.screen === "menu") renderMenu();
  if (state.screen === "select") renderSelect();
  if (state.screen === "credits") renderCredits();
  if (state.screen === "settings") renderSettings();
  if (state.screen === "achievements") renderAchievements();
  if (state.screen === "game") renderGame();
  syncAudio();
}

function renderTitle() {
  app.innerHTML = `<main class="screen screen--title"><section class="title-screen"><div class="title-rune">✦</div><div class="eyebrow">${t("titleSubtitle")}</div><h1>THE FANTASY</h1><h2>${t("greatAdventure")}</h2><div class="title-line"></div><nav class="title-menu"><button class="title-button title-button--primary" data-action="play">${t("play")}</button><button class="title-button" data-action="achievements">${t("achievements")}</button><button class="title-button" data-action="credits">${t("credits")}</button><button class="title-button" data-action="settings">${t("settings")}</button><button class="title-button title-button--danger" data-action="leave">${t("leave")}</button></nav><p class="title-version">VERSION 2.2 · RPG EDITION</p></section></main>`;
  app.querySelector("[data-action=play]").addEventListener("click", () => { state.screen = "menu"; render(); });
  app.querySelector("[data-action=achievements]").addEventListener("click", () => { state.screen = "achievements"; render(); });
  app.querySelector("[data-action=credits]").addEventListener("click", () => { state.screen = "credits"; render(); });
  app.querySelector("[data-action=settings]").addEventListener("click", () => { state.screen = "settings"; render(); });
  app.querySelector("[data-action=leave]").addEventListener("click", () => window.close());
}
function renderCredits() {
  app.innerHTML = `<main class="screen screen--subscreen"><section class="subscreen-card"><div class="eyebrow">THE FANTASY</div><h1>${t("credits")}</h1><div class="credit-block"><span>${t("developer")}</span><strong>Theskater25</strong><small>The Fantasy · The Great Adventure</small></div><div class="credit-block"><span>${t("version")}</span><strong>2.2 · Démo RPG</strong><small>${t("titleSubtitle")}</small></div><button class="btn btn--cyan" data-action="back">${t("back")}</button></section></main>`;
  app.querySelector("[data-action=back]").addEventListener("click", () => { state.screen = "title"; render(); });
}

function renderAchievements() {
  const unlocked = new Set(profile.unlocked);
  const rows = CONTENT.achievements.map((sourceAchievement) => {
    const achievement = localizedAchievement(sourceAchievement);
    const tier = TROPHY_TIERS[achievement.tier] || TROPHY_TIERS.bronze;
    return `<article class="achievement-row achievement-row--${achievement.tier} ${unlocked.has(achievement.id) ? "is-unlocked" : "is-locked"}"><div class="achievement-icon">${unlocked.has(achievement.id) ? achievement.icon : "?"}</div><div><div class="achievement-title-line"><h3>${achievement.title}</h3><span class="trophy-badge trophy-badge--${achievement.tier}">${tier.icon} ${t(tier.labelKey)}</span></div><p>${achievement.description}</p></div><span class="achievement-state">${unlocked.has(achievement.id) ? "✓" : "—"}</span></article>`;
  }).join("");
  const tierSummary = Object.entries(TROPHY_TIERS).map(([tierKey, tier]) => { const total = CONTENT.achievements.filter((achievement) => achievement.tier === tierKey).length; const got = CONTENT.achievements.filter((achievement) => achievement.tier === tierKey && unlocked.has(achievement.id)).length; return `${tier.icon} ${got}/${total} ${t(tier.labelKey)}`; }).join(" · ");
  app.innerHTML = `<main class="screen screen--subscreen"><section class="subscreen-card achievements-card"><div class="eyebrow">THE FANTASY</div><h1>${t("achievements")}</h1><p class="achievement-count">${unlockedTrophyCount()} / ${CONTENT.achievements.length} ${t("trophiesUnlocked")}<br><span class="achievement-tier-summary">${tierSummary}</span></p><div class="achievement-list">${rows}</div><button class="btn btn--cyan" data-action="back">${t("back")}</button></section></main>`;
  app.querySelector("[data-action=back]").addEventListener("click", () => { state.screen = "title"; render(); });
}

function renderSettings() {
  app.innerHTML = `<main class="screen screen--subscreen"><section class="subscreen-card settings-card"><div class="eyebrow">THE FANTASY</div><h1>${t("settings")}</h1><label>${t("display")}<select id="setting-display"><option value="standard">${t("standard")}</option><option value="compact">${t("compact")}</option><option value="large">${t("large")}</option><option value="fullscreen">${t("fullscreen")}</option></select></label><label>${t("language")}<select id="setting-language"><option value="fr">Français</option><option value="en">English</option><option value="de">Deutsch</option><option value="es">Español</option><option value="pl">Polski</option><option value="zh-CN">简体中文</option></select></label><label class="setting-check"><input type="checkbox" id="setting-music"> <span>${t("music")}</span></label><label class="setting-check"><input type="checkbox" id="setting-motion"> <span>${t("motion")}</span></label><label>${t("volume")}<input id="setting-volume" type="range" min="0" max="100" step="10"></label><p class="settings-note">${t("availableSoon")}<br>${t("audioNote")}</p><div class="subscreen-actions"><button class="btn" data-action="back">${t("back")}</button><button class="btn btn--cyan" data-action="apply-settings">${t("apply")}</button></div></section></main>`;
  document.querySelector("#setting-display").value = settings.display;
  document.querySelector("#setting-language").value = settings.language;
  document.querySelector("#setting-music").checked = settings.music;
  document.querySelector("#setting-motion").checked = settings.motion;
  document.querySelector("#setting-volume").value = settings.volume;
  app.querySelector("[data-action=back]").addEventListener("click", () => { state.screen = "title"; render(); });
  app.querySelector("[data-action=apply-settings]").addEventListener("click", () => {
    settings.display = document.querySelector("#setting-display").value;
    settings.language = document.querySelector("#setting-language").value;
    settings.music = document.querySelector("#setting-music").checked;
    settings.motion = document.querySelector("#setting-motion").checked;
    settings.volume = Number(document.querySelector("#setting-volume").value);
    saveSettings();
    if (settings.display === "fullscreen") document.documentElement.requestFullscreen?.();
    else if (document.fullscreenElement) document.exitFullscreen?.();
    alertInline(t("settingsSaved"));
    state.screen = "settings"; render();
  });
}

function renderMenu() {
  const menuChapters = CHAPTERS.map((chapter) => getChapter(chapter.id));
  app.innerHTML = `<main class="screen screen--menu"><section class="menu-wrap">
    <div class="brand"><div class="brand-mark">✦</div><div><div class="eyebrow">${t("trilogy")}</div><h1>THE FANTASY</h1><p>${t("chooseChapter")}</p></div><button class="btn btn--small" data-action="title">${t("back")}</button></div>
    <div class="menu-grid">${menuChapters.map((chapter) => `<button class="chapter-card" data-number="${chapter.id}" data-chapter="${chapter.id}">
      <span class="chapter-number">${chapter.kicker}</span><h2>${chapter.title}</h2><p>${chapter.text}</p><small>${chapter.tone}</small><span class="card-cta">${chapter.id === 1 ? t("resumeStory") : t("beginAdventure")}</span>
    </button>`).join("")}</div>
    <div class="menu-footer"><span></span><div class="menu-actions"><button class="btn btn--cyan" data-action="continue">${t("continue")}</button><button class="btn btn--danger" data-action="quit">${t("leave")}</button></div></div>
  </section></main>`;
  app.querySelectorAll("[data-chapter]").forEach((button) => {
    const locked = !isChapterUnlocked(button.dataset.chapter);
    if (locked) { button.disabled = true; button.classList.add("chapter-card--locked"); const cta = button.querySelector(".card-cta"); if (cta) cta.textContent = "🔒 " + t(Number(button.dataset.chapter) === 3 ? "chapter3Lock" : "chapter2Lock"); }
    button.addEventListener("click", () => chooseChapter(button.dataset.chapter));
  });
  app.querySelector("[data-action=title]").addEventListener("click", () => { state.screen = "title"; render(); });
  app.querySelector("[data-action=continue]").addEventListener("click", continueSave);
  app.querySelector("[data-action=quit]").addEventListener("click", () => window.close());
}

function renderSelect() {
  const chapter = getChapter(state.chapter);
  const availableClasses = classesForChapter(chapter).map(localizedClass);
  app.innerHTML = `<main class="screen screen--select">
    <header class="select-header"><div><div class="eyebrow">${chapter.kicker}</div><h1>${chapter.title}</h1><p class="select-subtitle">${chapter.tone}</p></div><button class="btn" data-action="back">${t("backToMenu")}</button></header>
    <section class="class-section"><div class="eyebrow class-section-label">${t("classesChapter")}</div><div class="select-grid">${availableClasses.map((heroClass) => `<button class="class-card ${state.selectedClass === heroClass.id ? "is-selected" : ""}" data-class="${heroClass.id}">
      <div class="class-portrait" style="--accent:${heroClass.accent}">${heroClass.icon}</div><div class="class-name">${heroClass.name}</div><div class="class-stats"><span>${t("hp")} ${heroClass.hp}</span><span>${t("atk")} ${heroClass.attack}</span></div><div class="class-skill">${heroClass.skill}</div><small class="class-effect">${heroClass.skillText}</small>${heroClass.origin ? `<small class="class-origin">${heroClass.origin}</small>` : ""}
      </button>`).join("")}</div></section>
    <footer class="select-footer"><input class="name-input" id="hero-name" maxlength="24" placeholder="${t("heroNamePlaceholder")}" value="${escapeHtml(localStorage.getItem("fantasy-v22-name") || "")}" /><button class="btn btn--cyan" data-action="start">${t("startChapter")} →</button></footer>
  </main>`;
  app.querySelectorAll("[data-class]").forEach((card) => card.addEventListener("click", () => { state.selectedClass = card.dataset.class; renderSelect(); }));
  app.querySelector("[data-action=back]").addEventListener("click", () => { state.screen = "menu"; render(); });
  app.querySelector("[data-action=start]").addEventListener("click", startNewGame);
}

function createScenes(chapter) {
  const chapterEvents = chapter.id === 1 ? CONTENT.storyEvents : chapter.id === 2 ? CONTENT.treasureEvents : chapter.id === 3 ? CONTENT.nordicEvents : [];
  const eventTranslations = TRANSLATIONS[settings.language]?.events?.[chapter.id] || [];
  return chapterEvents.map((event, index) => {
    const translated = eventTranslations[index];
    return {
      ...event,
      ...(translated ? { text: translated[0] || event.text, yes: translated[1] || event.yes, no: translated[2] || event.no } : {}),
      number: index + 1,
      kind: "choice",
    };
  });
}

function startNewGame() {
  const name = document.querySelector("#hero-name")?.value.trim() || t("unnamedHero");
  if (!state.selectedClass) { alertInline(t("chooseClass")); return; }
  const heroClass = getClass(state.selectedClass);
  const localizedHeroClass = localizedClass(heroClass);
  const chapterId = Number(state.chapter);
  const masteredSkills = profile.skillMastery?.[heroClass.id] || {};
  const startingSkills = Object.fromEntries(["blade", "guardian", "alchemy"].map((branch) => [branch, Math.min(chapterId, 3, Math.max(0, Number(masteredSkills[branch]) || 0))]));
  state.hero = { name, classId: heroClass.id, level: 1, xp: 0, hp: heroClass.hp, maxHp: heroClass.hp, baseMaxHp: heroClass.hp, attack: heroClass.attack, baseAttack: heroClass.attack, defeated: [], potions: 2, inventory: [], equipment: { weapon: 0, armor: 0, relic: 0 }, skillPoints: 0, skills: startingSkills, specializations: {} };
  state.battle = null; state.enemy = null; state.scene = 0; state.chapter = chapterId; state.chapterPath = state.chapter === 1 ? "village" : state.chapter === 2 ? "frontiere" : state.chapter === 3 ? "fjord" : null; state.chapterRoutes = []; state.routeQuestStarted = false; state.routeQuestComplete = false; state.storyBranches = {}; state.finalChoice = null; state.runDeaths = 0; state.restCount = 0; state.endingReason = null; state.scenes = createScenes(getChapter(state.chapter)); state.log = []; state.completed = false; state.gameOver = false;
  recalculateHeroStats();
  inventoryOpen = false; skillTreeOpen = false; localStorage.setItem("fantasy-v22-name", name); addLog(`${t("youAre")} ${name}, ${localizedHeroClass.name}. ${t("adventureBegins")}`, "system"); state.screen = "game"; saveGame(); renderGame();
}

function renderGame() {
  const chapter = getChapter(state.chapter); const heroClass = localizedClass(getClass(state.hero.classId)); const current = getCurrentScene(); const displayScene = state.battle?.kind === "boss" && state.scene > 0 ? state.scenes[state.scene - 1] : current; const enemy = state.enemy;
  const hpPct = Math.max(0, Math.min(100, (state.hero.hp / state.hero.maxHp) * 100)); const enemyPct = enemy ? Math.max(0, Math.min(100, enemy.hp / enemy.maxHp * 100)) : 0; const progress = state.scenes.length ? Math.min(state.scene, state.scenes.length) : 0;
  const intent = state.battle ? getEnemyIntent() : null;
  const equipment = state.hero.equipment || { weapon: 0, armor: 0, relic: 0 };
  const weaponLabel = equipment.weapon ? t("lootWeapon").replace("{bonus}", equipment.weapon) : t("noneYet");
  const armorLabel = equipment.armor ? t("lootArmor").replace("{bonus}", equipment.armor) : t("noneYet");
  const relicLabel = equipment.relic ? t("routeRelic") : t("noneYet");
  const routeQuestMarkup = state.chapter === 2 && state.routeQuestStarted ? `<div class="route-quest"><b>${t("routeQuest")}</b><span>${state.routeQuestComplete ? t("routeQuestComplete") : t("routeQuestProgress").replace("{count}", Math.min(5, state.chapterRoutes.length))}</span></div>` : "";
  const storyEnding = state.gameOver && state.endingReason === "rest" ? t("restEndingText") : state.gameOver ? t("gameOverText") : getStoryEndingText();
  const currentSceneMarkup = state.completed || state.gameOver ? `<div class="scene-card scene-card--ending" id="current-scene"><div class="scene-meta"><span>${state.gameOver ? (state.endingReason === "rest" ? t("restEndingTitle") : t("gameOverTitle")) : t("heroesBook")}</span></div><p>${escapeHtml(storyEnding)}</p></div>` : displayScene ? `<div class="scene-card" id="current-scene"><div class="scene-meta"><span>${state.battle?.kind === "boss" ? `${t("bossType")} · ${t("step")} ` : `${t("step")} `}${displayScene.number} / ${state.scenes.length}</span><span>${DECOR_ICONS[displayScene.decor] || "✦"} ${escapeHtml(state.battle ? localizedEnemyDecor(displayScene.decor) : translatedDecor(displayScene.decor))}</span></div><p>${escapeHtml(getSceneText(displayScene))}</p></div>` : "";
  app.innerHTML = `<main class="screen screen--game"><header class="game-header"><div><div class="eyebrow">${chapter.kicker}</div><h1>${chapter.title}</h1></div><div class="header-actions"><span class="eyebrow">${t("level")} ${state.hero.level}</span><button class="btn btn--small btn--cyan" data-inventory-open aria-expanded="${inventoryOpen}">🎒 ${t("inventory")} · ${inventoryItems().length}</button><button class="btn btn--small" data-skill-open aria-expanded="${skillTreeOpen}">🌿 ${t("skillTree")} · ${state.hero.skillPoints}</button><button class="btn btn--small" data-action="fullscreen">⛶ ${t("fullscreen")}</button><button class="btn btn--small btn--danger" data-action="menu">${t("leaveGame")}</button></div></header>
    <section class="game-layout"><article class="panel story-panel"><div class="panel-heading"><h2>${t("adventureJournal")}</h2><span class="eyebrow">${progress} / ${state.scenes.length} ${t("steps")}</span></div><div class="story-log" id="story-log">${state.log.join("")}${currentSceneMarkup}${enemy ? `<div class="enemy-stage"><div class="enemy-portrait"><img src="${escapeHtml(getEnemyAsset(enemy))}" alt="Portrait de ${escapeHtml(enemy.name)}" loading="eager"></div><div class="enemy-readout"><div class="eyebrow">${enemy.type === "boss" ? t("majorEncounter") : t("encounter")}</div><h3>${escapeHtml(localizedEnemyName(enemy.name))}</h3><p>${translatedType(enemy.type)} · ${t("hp")} ${enemy.hp}/${enemy.maxHp} · ${t("atk")} ${enemy.attack}</p><div class="enemy-intent"><span>${t("enemyIntent")}</span><strong>${intent.label}${intent.damage ? ` · ${intent.damage} ${t("damageShort")}` : ""}</strong></div><div class="meter"><span style="width:${enemyPct}%"></span></div></div></div>` : ""}</div><div class="combat-footer"><div class="prompt" id="prompt">${getPrompt()}</div><div class="action-list" id="actions">${getActions()}</div></div></article>
      <aside class="panel side-panel"><div class="panel-heading"><h2>${t("heroSheet")}</h2><span class="eyebrow">${heroClass.name}</span></div><div class="hero-card"><div class="hero-top"><div class="hero-avatar" style="--hero-accent:${heroClass.accent}">${heroClass.icon}</div><div><h2>${escapeHtml(state.hero.name)}</h2><div class="hero-class">${heroClass.name} · ${t("level")} ${state.hero.level}</div></div></div><div class="stat-block"><div class="stat-line"><span>${t("hp")}</span><strong>${state.hero.hp} / ${state.hero.maxHp}</strong></div><div class="meter"><span class="bar-health" style="width:${hpPct}%"></span></div><div class="stat-line"><span>${t("atk")}</span><strong>${state.hero.attack}</strong></div><div class="stat-line"><span>${t("experience")}</span><strong>${state.hero.xp} XP</strong></div></div><div class="equipment-list"><b>${t("equipment")}</b><span>${t("weapon")}: ${weaponLabel}</span><span>${t("armor")}: ${armorLabel}</span><span>✧ ${relicLabel}</span><span>🧪 ${t("potion")}: ${state.hero.potions ?? 0}</span></div>${routeQuestMarkup}<div class="ability"><b>${heroClass.skill}</b><small>${heroClass.skillText}</small></div></div><div class="defeated-panel"><h3>${t("enemiesDefeated")}</h3><div class="defeated-list">${state.hero.defeated.length ? state.hero.defeated.slice().reverse().map((item) => `<div class="defeated-item"><span>${escapeHtml(localizedEnemyName(item.name))}</span><span>${translatedType(item.type)}</span></div>`).join("") : `<div class="defeated-item"><span>${t("noneYet")}</span><span>—</span></div>`}</div></div></aside></section><footer class="game-status"><span>${state.gameOver ? (state.endingReason === "rest" ? t("restEndingTitle") : t("heroFallen")) : state.completed ? t("chapterFinishedStatus") : state.battle ? `${t("battleInProgress")} · ${t("turn")} ${state.battle.turn}.` : state.chapter === 2 ? t("treasureStatus") : state.chapter === 3 ? t("nordicStatus") : t("villageStatus")}</span></footer>${inventoryOpen ? renderInventoryOverlay() : ""}${skillTreeOpen ? renderSkillTreeOverlay() : ""}</main>`;
  const log = document.querySelector("#story-log"); if (log) { log.scrollTop = log.scrollHeight; document.querySelector("#current-scene")?.scrollIntoView({ block: "end" }); } bindGameActions(); syncAudio();
}

function getPrompt() { if (state.gameOver) return t("sealed"); if (state.completed) return t("finished"); if (state.battle) return t("action"); return t("decision"); }

function getEnemyIntent() {
  const battle = state.battle;
  if (!battle || !state.enemy) return null;
  if (battle.enemyFrozen > 0) return { label: t("intentFrozen"), damage: 0 };
  if (battle.enemyStun > 0) return { label: t("intentStunned"), damage: 0 };
  const heavy = battle.turn % 3 === 0;
  if (battle.kind === "boss" && battle.adaptation === "mirror" && battle.mirrorGuard) return { label: bossText("bossGuardIntent"), damage: 0 };
  if (battle.kind === "boss" && battle.adaptation === "hex" && heavy) return { label: bossText("bossCorruptIntent"), damage: predictedIncomingDamage(Math.ceil(state.enemy.attack * 1.75), battle), heavy: true };
  const incoming = Math.ceil(state.enemy.attack * (heavy ? 1.75 : 1));
  const piercing = battle.kind === "boss" && battle.adaptation === "breaker" && heavy;
  const damage = predictedIncomingDamage(incoming, battle, piercing);
  return { label: piercing ? bossText("bossPiercingIntent") : t(heavy ? "intentHeavy" : "intentAttack"), damage, heavy };
}
function equippedEffectTotal(effect) { return inventoryItems().filter((item) => item.equipped && item.effect === effect).reduce((sum, item) => sum + (Number(item.effectValue) || 0), 0); }
function predictedIncomingDamage(incoming, battle, piercing = false) {
  if (battle.playerInvincible > 0) return 0;
  const reduction = battle.playerDefReduceTurns > 0 ? battle.playerDefReducePct : 0;
  const reduced = Math.ceil(incoming * (1 - (piercing ? reduction * 0.5 : reduction)));
  const ward = piercing ? Math.floor(equippedEffectTotal("ward") * 0.5) : equippedEffectTotal("ward");
  const guardianRank = Number(state.hero.skills?.guardian) || 0;
  const guardian = piercing ? 0 : (guardianRank >= 1 ? 1 : 0) + (state.hero.specializations?.guardian === "bulwark" && guardianRank >= 4 ? (guardianRank >= 5 ? 4 : 2) : 0);
  return Math.max(0, reduced - ward - guardian);
}

function getActions() {
  if (state.gameOver || state.completed) {
    const nextChapter = Number(state.chapter) + 1;
    if (state.completed && nextChapter <= 3 && isChapterUnlocked(nextChapter)) return `<button class='btn btn--cyan' data-action='campaign' onclick='window.__tfAction("campaign")'>${campaignText("continueCampaign")}</button><button class='btn' data-action='finish' onclick='window.__tfAction("finish")'>${t("backToMenu")}</button>`;
    return "<button class='btn btn--cyan' data-action='finish' onclick='window.__tfAction(\"finish\")'>" + t("backToMenu") + "</button>";
  }
  if (!state.battle) {
    const restAtLimit = state.restCount >= MAX_RESTS_PER_CHAPTER;
    const restLabel = restAtLimit ? t("restExhausted") : `${t("rest")} · ${state.restCount}/${MAX_RESTS_PER_CHAPTER}`;
    const restHint = restAtLimit ? t("restExhaustedHint") : t("restHint");
    const restDisabled = restAtLimit ? 'aria-disabled="true"' : "";
    return `<button class="btn btn--cyan" data-action="yes" onclick="window.__tfAction('yes')">${t("yes")}</button><button class="btn" data-action="no" onclick="window.__tfAction('no')">${t("no")}</button><button class="btn btn--rest" data-action="rest" ${restDisabled} title="${escapeHtml(restHint)}" aria-label="${escapeHtml(restHint)}" onclick="window.__tfAction('rest')">⛺ ${escapeHtml(restLabel)}</button>`;
  }
  if (state.battle) return "<button class='btn btn--cyan' data-action='attack' onclick='window.__tfAction(\"attack\")'>" + t("attack") + "</button><button class='btn' data-action='defend' onclick='window.__tfAction(\"defend\")'>" + t("defend") + "</button><button class='btn' data-action='skill' onclick='window.__tfAction(\"skill\")'>" + localizedClass(getClass(state.hero.classId)).skill + "</button><button class='btn btn--potion' data-action='potion' " + ((state.hero.potions <= 0 || state.hero.hp >= state.hero.maxHp) ? "disabled" : "") + " onclick='window.__tfAction(\"potion\")'>🧪 " + t("potionUses").replace("{count}", state.hero.potions || 0) + "</button>";
  return "<button class='btn btn--cyan' data-action='yes' onclick='window.__tfAction(\"yes\")'>" + t("yes") + "</button><button class='btn' data-action='no' onclick='window.__tfAction(\"no\")'>" + t("no") + "</button>";
}
function bindGameActions() {
  document.querySelector("[data-action=fullscreen]")?.addEventListener("click", () => document.documentElement.requestFullscreen?.());
  document.querySelectorAll("[data-action=yes], [data-action=no], [data-action=attack], [data-action=defend], [data-action=skill], [data-action=potion]").forEach((button) => {
    button.addEventListener("click", () => window.__tfAction(button.dataset.action));
  });
  document.querySelector("[data-action=rest]")?.addEventListener("click", (event) => {
    event.preventDefault();
    if (state.restCount >= MAX_RESTS_PER_CHAPTER) {
      confirmInline(t("restExhaustedConfirm"), () => restAtCurrentStep(true), { confirmLabel: t("yes") });
      return;
    }
    advance("rest");
  });
  document.querySelectorAll("[data-action=campaign], [data-action=finish]").forEach((button) => {
    button.addEventListener("click", () => window.__tfAction(button.dataset.action));
  });
  document.querySelector("[data-action=menu]")?.addEventListener("click", () => confirmInline(t("exitConfirm"), () => { saveGame(); state.screen = "menu"; render(); }));
  document.querySelector("[data-inventory-open]")?.addEventListener("click", () => { inventoryOpen = !inventoryOpen; renderGame(); });
  document.querySelector("[data-skill-open]")?.addEventListener("click", () => { skillTreeOpen = !skillTreeOpen; renderGame(); });
  document.querySelectorAll("[data-skill-close]").forEach((button) => button.addEventListener("click", () => { skillTreeOpen = false; renderGame(); }));
  document.querySelectorAll("[data-skill-upgrade]").forEach((button) => button.addEventListener("click", () => {
    const branch = button.dataset.skillUpgrade;
    const rank = Number(button.dataset.skillRank);
    if (!state.hero.skillPoints || !["blade", "guardian", "alchemy"].includes(branch) || rank !== state.hero.skills[branch] + 1) return;
    const ready = rank <= 3 ? rank <= state.chapter : state.chapter === 3 && state.hero.level >= (rank === 4 ? 8 : 12) && Boolean(state.hero.specializations?.[branch]);
    if (!ready || rank > 5) return;
    state.hero.skillPoints -= 1; state.hero.skills[branch] = rank;
    recalculateHeroStats(); rememberSkillMastery(); saveGame(); renderGame();
  }));
  document.querySelectorAll("[data-skill-specialize]").forEach((button) => button.addEventListener("click", () => {
    const branch = button.dataset.skillSpecialize;
    const choice = button.dataset.skillChoice;
    const allowed = { blade:["duelist","lifetaker"], guardian:["bulwark","warden"], alchemy:["distiller","warchemist"] };
    if (!state.hero.skillPoints || !allowed[branch]?.includes(choice) || state.hero.skills[branch] !== 3 || state.chapter !== 3 || state.hero.level < 8 || state.hero.specializations?.[branch]) return;
    state.hero.skillPoints -= 1;
    state.hero.specializations[branch] = choice;
    state.hero.skills[branch] = 4;
    recalculateHeroStats(); rememberSkillMastery(); saveGame(); renderGame();
  }));
  document.querySelector(".skill-backdrop")?.addEventListener("click", (event) => { if (event.target === event.currentTarget) { skillTreeOpen = false; renderGame(); } });
  document.querySelectorAll("[data-inventory-close]").forEach((button) => button.addEventListener("click", () => { inventoryOpen = false; renderGame(); }));
  document.querySelectorAll("[data-inventory-toggle]").forEach((button) => button.addEventListener("click", () => {
    const item = inventoryItems().find((entry) => entry.id === button.dataset.inventoryToggle);
    if (!item) return;
    item.equipped = !item.equipped;
    recalculateHeroStats();
    saveGame();
    renderGame();
  }));
  document.querySelector(".inventory-backdrop")?.addEventListener("click", (event) => {
    if (event.target === event.currentTarget) { inventoryOpen = false; renderGame(); }
  });
}
function addLog(text, kind = "") { state.log.push(`<p class="story-entry ${kind ? `story-entry--${kind}` : ""}">${escapeHtml(text)}</p>`); }
function archiveCurrentScene(action) {
  const scene = getCurrentScene();
  if (!scene) return;
  addLog(`${t("step")} ${scene.number} · ${getSceneText(scene)}`, "narrative");
  if ([1, 2, 3].includes(state.chapter) && action) {
    const accepted = action === "yes";
    addLog(localizedEventField(scene, accepted ? "yes" : "no"), "choice");
    const selectedPath = accepted ? scene.yesPath : scene.noPath;
    if (selectedPath) {
      state.chapterPath = selectedPath;
      state.chapterRoutes = Array.isArray(state.chapterRoutes) ? state.chapterRoutes : [];
      if (!state.chapterRoutes.includes(selectedPath)) {
        state.chapterRoutes.push(selectedPath);
        if (state.chapter === 2) {
          if (!state.routeQuestStarted) { state.routeQuestStarted = true; addLog(t("routeQuestStart"), "narrative"); }
          if (state.chapterRoutes.length >= 5 && !state.routeQuestComplete) {
            state.routeQuestComplete = true;
            if (!inventoryItems().some((item) => item.kind === "relic")) {
              state.hero.inventory.push({ id: "runic-compass-" + state.chapter, kind: "relic", bonus: 2, equipped: true, rarity: "rare", effect: "mending", effectValue: 4 });
              recalculateHeroStats();
            }
            addLog(t("routeQuestComplete"), "achievement");
          }
        }
      }
    }
  }
}

function advance(action) {
  const scene = getCurrentScene(); if (!scene || state.battle || state.completed || state.gameOver) return;
  if (action === "rest") {
    if (state.restCount >= MAX_RESTS_PER_CHAPTER) {
      confirmInline(t("restExhaustedConfirm"), () => restAtCurrentStep(true), { confirmLabel: t("yes") });
      return;
    }
    restAtCurrentStep();
    return;
  }
  if ([1, 2, 3].includes(state.chapter) && (action === "yes" || action === "no")) {
    state.storyBranches = state.storyBranches && typeof state.storyBranches === "object" ? state.storyBranches : {};
    state.storyBranches[String(scene.number)] = action;
    if (scene.number === state.scenes.length) state.finalChoice = action;
  }
  if (action === "yes") state.hero.xp += 7;
  archiveCurrentScene(action);
  if (action === "yes") {
    addLog(t("chooseToAct"), "system");
    if ([1, 2, 3].includes(state.chapter) && Math.random() < (state.chapter === 1 ? 0.30 : 0.22)) { startBattle("event"); saveGame(); renderGame(); return; }
    addLog(t("noEnemiesYet"));
  } else {
    addLog(t("chooseNotAct"), "system");
  }
  state.scene += 1; finishStep(); saveGame(); renderGame();
}

function restAtCurrentStep(confirmOveruse = false) {
  if (!state.hero || state.battle || state.completed || state.gameOver) return;
  if (state.restCount >= MAX_RESTS_PER_CHAPTER) {
    if (!confirmOveruse) return;
    state.gameOver = true;
    state.endingReason = "rest";
    state.log.push(`<p class="story-entry story-entry--battle">${escapeHtml(t("restEndingText"))}</p>`);
    saveGame();
    renderGame();
    return;
  }
  state.restCount += 1;
  const recovered = Math.min(state.hero.maxHp - state.hero.hp, Math.max(4, Math.ceil(state.hero.maxHp * 0.35)));
  state.hero.hp += recovered;
  addLog(t("restLog").replace("{step}", Math.min(state.scene + 1, state.scenes.length)).replace("{healed}", recovered).replace("{count}", state.restCount).replace("{limit}", MAX_RESTS_PER_CHAPTER), "system");
  const potionsRecovered = Math.min(1, potionCapacity() - (Number(state.hero.potions) || 0));
  if (potionsRecovered > 0) { state.hero.potions = (Number(state.hero.potions) || 0) + potionsRecovered; addLog(t("campPotion"), "system"); }
  saveGame();
  renderGame();
}

function startBattle(kind) {
  const completedSteps = state.scene; let template; let scale;
  if (kind === "boss") {
    const bossList = state.chapter === 2 ? CONTENT.treasureBosses : state.chapter === 3 ? CONTENT.nordicBosses : CONTENT.bosses;
    const interval = state.chapter === 2 ? 15 : state.chapter === 3 ? 20 : 10;
    const baseBossIndex = Math.max(0, Math.floor(completedSteps / interval) - 1);
    // Bosses stay in their intended difficulty order; route choices should not
    // accidentally pull the final boss into the first encounter.
    const bossIndex = Math.min(bossList.length - 1, baseBossIndex);
    template = localizedEnemyTemplate(bossList[bossIndex]); scale = 1 + (completedSteps / state.scenes.length) * 0.5;
  }
  else { template = localizedEnemyTemplate(CONTENT.basicEnemies[Math.floor(Math.random() * CONTENT.basicEnemies.length)]); scale = 1 + (completedSteps / state.scenes.length) * 0.35; }
  state.enemy = { ...template, hp: Math.ceil(template.hp * scale), maxHp: Math.ceil(template.hp * scale), attack: Math.max(1, Math.ceil(template.attack * scale)) };
  const skills = state.hero.skills || {};
  const buildScores = {
    mirror: (Number(skills.blade) || 0) * 2 + equippedEffectTotal("crit") / 12 + Math.max(0, state.hero.attack - state.hero.baseAttack) / 7,
    breaker: (Number(skills.guardian) || 0) * 2 + equippedEffectTotal("ward") + (Number(state.hero.equipment?.armor) || 0) / 12,
    hex: (Number(skills.alchemy) || 0) * 2 + (potionCapacity() - 3) * 2 + equippedEffectTotal("mending") / 10,
  };
  const adaptation = kind === "boss" ? Object.entries(buildScores).sort((a, b) => b[1] - a[1])[0][0] : null;
  state.battle = { kind, turn: 1, skillUsed: false, enemyFrozen: 0, enemyStun: 0, playerInvincible: 0, playerAtkMult: 1, playerBuffAtk: 0, playerDefReducePct: 0, playerDefReduceTurns: 0, adaptation, mirrorGuard: adaptation === "mirror", potionWeakened: false };
  addLog(`${kind === "boss" ? t("majorEncounter") : t("encounter")} : ${localizedEnemyName(state.enemy.name)} (${t("hp")} ${state.enemy.hp}, ${t("atk")} ${state.enemy.attack}).`, "battle");
  if (kind === "boss") addLog(campaignText(adaptation === "mirror" ? "bossCounterMirror" : adaptation === "breaker" ? "bossCounterBreaker" : "bossCounterHex"), "achievement");
}

function continueCampaign() {
  if (!state.completed || !state.hero) return;
  const nextChapter = Number(state.chapter) + 1;
  if (nextChapter > 3 || !isChapterUnlocked(nextChapter)) return;
  state.chapter = nextChapter;
  state.selectedClass = state.hero.classId;
  state.scene = 0;
  state.scenes = createScenes(getChapter(nextChapter));
  state.chapterPath = nextChapter === 1 ? "village" : nextChapter === 2 ? "frontiere" : "fjord";
  state.chapterRoutes = [];
  state.routeQuestStarted = false;
  state.routeQuestComplete = false;
  state.storyBranches = {};
  state.finalChoice = null;
  state.runDeaths = 0;
  state.restCount = 0;
  state.endingReason = null;
  state.battle = null;
  state.enemy = null;
  state.completed = false;
  state.gameOver = false;
  const recovered = Math.min(state.hero.maxHp - state.hero.hp, Math.ceil(state.hero.maxHp * 0.5));
  state.hero.hp += recovered;
  state.hero.potions = Math.min(potionCapacity(), (Number(state.hero.potions) || 0) + 1);
  addLog(campaignText("campaignTransition").replace("{chapter}", campaignText(`chapterName${nextChapter}`)), "achievement");
  state.screen = "game";
  saveGame();
  renderGame();
}
function finishStep() {
  levelUp();
  const bossInterval = state.chapter === 1 ? 10 : state.chapter === 2 ? 15 : state.chapter === 3 ? 20 : 0;
  if (bossInterval && state.scene > 0 && state.scene % bossInterval === 0 && state.scene <= state.scenes.length) { startBattle("boss"); return; }
  if (state.scene >= state.scenes.length) recordChapterCompletion();
}

function combatAction(action) {
  const heroClass = localizedClass(getClass(state.hero.classId)); const battle = state.battle; const enemy = state.enemy;
  if (!battle || !enemy || state.gameOver) return;
  let damage = 0;
  let criticalHit = false;
  if (action === "attack") { damage = Math.ceil(state.hero.attack * battle.playerAtkMult); const bladeRank = Number(state.hero.skills?.blade) || 0; const critChance = Math.min(75, equippedEffectTotal("crit") + (bladeRank >= 2 ? 10 : 0) + (state.hero.specializations?.blade === "duelist" && bladeRank >= 4 ? 15 : 0)); if (critChance && Math.random() * 100 < critChance) { criticalHit = true; damage = Math.ceil(damage * (state.hero.specializations?.blade === "duelist" && bladeRank >= 5 ? 2 : 1.75)); addLog(t("critical"), "achievement"); } if (battle.playerBuffAtk > 0) battle.playerBuffAtk -= 1; if (battle.playerBuffAtk === 0) battle.playerAtkMult = 1; addLog(`${t("playerAttacks")} ${damage} ${t("damageShort")}.`); }
  else if (action === "defend") {
    battle.playerDefReducePct = Math.max(battle.playerDefReducePct, 0.6);
    battle.playerDefReduceTurns = Math.max(battle.playerDefReduceTurns, 1);
    addLog(t("playerDefends"), "system");
    const guardianRank = Number(state.hero.skills?.guardian) || 0;
    if (state.hero.specializations?.guardian === "warden" && guardianRank >= 4) { const reflected = Math.ceil(enemy.attack * (guardianRank >= 5 ? 0.5 : 0.25)); enemy.hp = Math.max(0, enemy.hp - reflected); addLog(`${t("playerAttacks")} ${reflected} ${t("damageShort")}.`, "battle"); }
    if (enemy.hp <= 0) { winBattle(); return; }
    if ((Number(state.hero.skills?.guardian) || 0) >= 2) {
      const healed = Math.min(state.hero.maxHp - state.hero.hp, Math.ceil(state.hero.maxHp * 0.1));
      state.hero.hp += healed;
      if (healed) addLog(t("skillGuardianHeal").replace("{heal}", healed), "system");
    }
  }
  else if (action === "potion") {
    state.hero.potions = Math.max(0, Number(state.hero.potions) || 0);
    if (!state.hero.potions) { addLog(t("potionEmpty"), "system"); saveGame(); renderGame(); return; }
    const alchemyRank = Number(state.hero.skills?.alchemy) || 0;
    const potionBonus = equippedEffectTotal("mending") + (alchemyRank >= 1 ? 5 : 0) + (state.hero.specializations?.alchemy === "distiller" && alchemyRank >= 4 ? 10 : 0);
    const rawHealing = Math.max(4, Math.ceil(state.hero.maxHp * 0.35) + potionBonus);
    const healed = Math.min(state.hero.maxHp - state.hero.hp, battle.potionWeakened ? Math.ceil(rawHealing * 0.5) : rawHealing);
    if (battle.potionWeakened) { battle.potionWeakened = false; addLog(bossText("bossPotionWeakened"), "battle"); }
    state.hero.hp += healed;
    state.hero.potions -= 1;
    addLog(t("potionHeal").replace("{healed}", healed), "system");
    if (alchemyRank >= 3) { const potionAttackBoost = state.hero.specializations?.alchemy === "warchemist" && alchemyRank >= 5 ? 1.75 : state.hero.specializations?.alchemy === "warchemist" && alchemyRank >= 4 ? 1.5 : 1.25; battle.playerAtkMult = Math.max(battle.playerAtkMult, potionAttackBoost); battle.playerBuffAtk = Math.max(battle.playerBuffAtk, 1); addLog(t("skillAlchemyBuff"), "achievement"); }
  }
  else if (action === "skill") {
    if (battle.skillUsed) addLog(t("skillAlreadyUsed"), "system");
    else {
      battle.skillUsed = true; addLog(t("usesSkill").replace("{skill}", heroClass.skill).replace("{description}", heroClass.skillText), "system");
      if (heroClass.id === "sorcier") battle.enemyFrozen = 1;
      if (heroClass.id === "archer") battle.playerAtkMult = 1.5;
      if (heroClass.id === "chevalier") { battle.playerDefReducePct = 0.7; battle.playerDefReduceTurns = 2; }
      if (heroClass.id === "barbare") { battle.playerAtkMult = 1.5; battle.playerBuffAtk = 2; }
      if (heroClass.id === "assassin") battle.playerInvincible = 1;
      if (heroClass.id === "artificier") { const blast = Math.ceil(state.hero.attack * 3); damage = enemy.type === "boss" ? Math.min(blast, Math.ceil(enemy.maxHp * 0.45)) : blast; addLog(t("artificerBlast").replace("{damage}", damage), "battle"); }
      if (heroClass.id === "bard") battle.enemyStun = 3;
      if (heroClass.id === "moine") { for (let hit = 0; hit < 3; hit += 1) { let strike = Math.ceil(state.hero.attack * 0.35); if (hit === 1 && Math.random() < 0.30) { strike *= 2; addLog(t("monkCritical"), "battle"); } damage += strike; if (hit === 2 && Math.random() < 0.20) { battle.enemyStun = 1; addLog(t("monkStuns"), "battle"); } } addLog(`${t("comboDamage")} ${damage} ${t("damageShort")}.`); }
      if (heroClass.id === "necromancien") { damage = Math.ceil(state.hero.attack); const heal = Math.floor(damage * 0.5); state.hero.hp = Math.min(state.hero.maxHp, state.hero.hp + heal); addLog(t("necromancerDrain").replace("{damage}", damage).replace("{heal}", heal)); }
      if (heroClass.id === "bouffon") { const roll = Math.random(); if (roll < 0.4) { damage = Math.ceil(state.hero.attack * 2); addLog(t("jesterCritical").replace("{damage}", damage), "battle"); } else if (roll < 0.7) addLog(t("missedAttack"), "system"); else if (roll < 0.9) { state.hero.hp = Math.max(0, state.hero.hp - Math.ceil(state.hero.attack)); addLog(t("chaosHurt"), "battle"); } else { battle.enemyStun = 1; addLog(t("enemyLaughs"), "battle"); } }
      if (heroClass.id === "samurai") { damage = Math.ceil(state.hero.attack * 2); addLog(t("iaijutsuDamage").replace("{damage}", damage), "battle"); }
      if (heroClass.id === "shinobi") { battle.playerInvincible = 1; battle.playerAtkMult = 1.25; addLog(t("shinobiShadow"), "system"); }
      if (heroClass.id === "onmyoji") { damage = Math.ceil(state.hero.attack * 0.8); battle.enemyFrozen = 2; addLog(t("shikigamiDamage").replace("{damage}", damage), "battle"); }
      if (heroClass.id === "miko") { damage = Math.ceil(state.hero.attack * 0.7); const heal = Math.ceil(state.hero.maxHp * 0.25); state.hero.hp = Math.min(state.hero.maxHp, state.hero.hp + heal); addLog(t("purification").replace("{damage}", damage).replace("{heal}", heal), "system"); }
      if (heroClass.id === "ronin") { battle.playerDefReducePct = 1; battle.playerDefReduceTurns = 1; battle.playerAtkMult = 1.5; addLog(t("roninStance"), "system"); }
      if (heroClass.id === "berserker") { damage = Math.ceil(state.hero.attack * 2); addLog(t("bearRage").replace("{damage}", damage), "battle"); }
      if (heroClass.id === "huskarl") { battle.playerDefReducePct = 0.8; battle.playerDefReduceTurns = 2; addLog(t("shieldWall"), "system"); }
      if (heroClass.id === "valkyrie") { damage = Math.ceil(state.hero.attack * 1.2); const heal = Math.ceil(state.hero.maxHp * 0.25); state.hero.hp = Math.min(state.hero.maxHp, state.hero.hp + heal); addLog(t("valkyrieHeal").replace("{damage}", damage).replace("{heal}", heal), "system"); }
      if (heroClass.id === "seidr") { damage = Math.ceil(state.hero.attack * 0.9); battle.enemyFrozen = 2; addLog(t("runeProphecy").replace("{damage}", damage), "battle"); }
      if (heroClass.id === "skald") { battle.enemyStun = 3; battle.playerAtkMult = 1.5; addLog(t("skaldInspires"), "system"); }
    }
  }
  if (damage > 0 && criticalHit && battle.kind === "boss" && battle.mirrorGuard) { damage = Math.ceil(damage * 0.65); battle.mirrorGuard = false; addLog(bossText("bossAdaptGuard"), "system"); }
  const effectiveDamage = damage > 0 ? Math.min(enemy.hp, damage) : 0;
  if (damage) { enemy.hp -= damage; playSfx("hit"); }
  if (action === "attack" && (Number(state.hero.skills?.blade) || 0) >= 3 && damage > 0) {
    const bladeRank = Number(state.hero.skills?.blade) || 0;
    const lifeSteal = state.hero.specializations?.blade === "lifetaker" && bladeRank >= 5 ? 0.2 : state.hero.specializations?.blade === "lifetaker" && bladeRank >= 4 ? 0.15 : 0.1;
    const healed = Math.min(state.hero.maxHp - state.hero.hp, Math.ceil(effectiveDamage * lifeSteal));
    state.hero.hp += healed;
    if (healed) addLog(t("skillBladeHeal").replace("{heal}", healed), "system");
  }
  if (enemy.hp <= 0) { winBattle(); return; }
  if (state.hero.hp <= 0) { registerDeath(); state.gameOver = true; state.battle = null; state.enemy = null; addLog(t("heroFallen"), "battle"); saveGame(); renderGame(); return; }
  if (battle.enemyFrozen > 0) { addLog(t("enemyFrozen"), "system"); battle.enemyFrozen -= 1; }
  else if (battle.enemyStun > 0) { addLog(t("enemyStunned"), "system"); battle.enemyStun -= 1; }
  else {
    const heavyAttack = battle.turn % 3 === 0;
    let received = heavyAttack ? Math.ceil(enemy.attack * 1.75) : enemy.attack;
    if (heavyAttack) addLog(t("enemyHeavyAttack"), "battle");
    if (battle.playerInvincible > 0) addLog(t("invincible"), "system");
    const piercing = battle.kind === "boss" && battle.adaptation === "breaker" && heavyAttack;
    received = predictedIncomingDamage(received, battle, piercing);
    if (battle.kind === "boss" && battle.adaptation === "hex" && heavyAttack) battle.potionWeakened = true;
    state.hero.hp = Math.max(0, state.hero.hp - received); addLog(`${localizedEnemyName(enemy.name)} ${t("dealsYou")} ${received} ${t("damageShort")}.`);
    if (state.hero.hp <= 0 && (Number(state.hero.skills?.guardian) || 0) >= 3 && !battle.guardianRescueUsed) { state.hero.hp = 1; battle.guardianRescueUsed = true; addLog(t("skillGuardianSave"), "achievement"); }
  }
  if (battle.playerDefReduceTurns > 0) { battle.playerDefReduceTurns -= 1; if (battle.playerDefReduceTurns === 0) battle.playerDefReducePct = 0; }
  if (battle.playerInvincible > 0) battle.playerInvincible -= 1;
  if (state.hero.hp <= 0) { registerDeath(); state.gameOver = true; state.battle = null; state.enemy = null; addLog(`${t("adventureEndsBy")} ${localizedEnemyName(enemy.name)}.`, "battle"); }
  else { if (battle.kind === "boss" && battle.adaptation === "mirror" && criticalHit) battle.mirrorGuard = true; battle.turn += 1; }
  saveGame(); renderGame();
}

function winBattle() {
  const originalName = state.enemy.sourceName || state.enemy.name;
  const defeated = { name: originalName, type: state.enemy.type }; const battleKind = state.battle.kind; state.hero.defeated.push(defeated);
  recordEnemyDefeat(state.enemy);
  const combatXp = state.enemy.type === "boss" ? 70 : 14; state.hero.xp += combatXp; addLog(`${localizedEnemyName(state.enemy.name)} ${t("isDefeated")} +${combatXp} XP.`, "system");
  if (state.enemy.type === "boss") { const bossReward = 50 + state.scene * 2; state.hero.xp += bossReward; addLog(`${t("majorEncounterReward")} +${bossReward} XP.`, "system"); grantBossLoot(); }
  if (state.enemy.type === "boss") {
    const recovered = Math.min(state.hero.maxHp - state.hero.hp, Math.ceil(state.hero.maxHp * 0.2));
    state.hero.hp += recovered;
    state.hero.potions = Math.min(potionCapacity(), (Number(state.hero.potions) || 0) + 1);
    addLog(campaignText("bossSupply").replace("{heal}", recovered), "system");
  }
  state.battle = null; state.enemy = null;
  if (battleKind === "event") { state.scene += 1; finishStep(); }
  else if (state.scene >= state.scenes.length) recordChapterCompletion();
  levelUp(); saveGame(); renderGame();
}

function grantBossLoot() {
  const hero = state.hero;
  const bossesDefeated = hero.defeated.filter((item) => item.type === "boss").length;
  const kindRoll = Math.random();
  const kind = kindRoll < 0.4 ? "weapon" : kindRoll < 0.8 ? "armor" : "relic";
  const rarityRoll = Math.random();
  const rarity = rarityRoll < 0.4 ? "common" : rarityRoll < 0.72 ? "rare" : rarityRoll < 0.92 ? "epic" : "legendary";
  const multiplier = { common: 1, rare: 1.35, epic: 1.8, legendary: 2.4 }[rarity];
  const rawBonus = kind === "weapon" ? state.chapter + Math.floor((bossesDefeated - 1) / 2) : kind === "armor" ? state.chapter * 5 + Math.floor((bossesDefeated - 1) / 2) * 3 : 2 + Math.floor((bossesDefeated - 1) / 2);
  const bonus = Math.max(1, Math.round(rawBonus * multiplier));
  const effectValue = kind === "weapon" ? ({ common: 0, rare: 8, epic: 15, legendary: 25 }[rarity]) : kind === "armor" ? ({ common: 0, rare: 1, epic: 2, legendary: 3 }[rarity]) : ({ common: 0, rare: 4, epic: 8, legendary: 12 }[rarity]);
  const effect = kind === "weapon" ? "crit" : kind === "armor" ? "ward" : "mending";
  hero.inventory.push({ id: "boss-" + state.chapter + "-" + bossesDefeated + "-" + Date.now(), kind, bonus, equipped: true, rarity, effect: effectValue ? effect : "none", effectValue });
  const previousMaxHp = hero.maxHp;
  recalculateHeroStats();
  if (kind === "armor") hero.hp = Math.min(hero.maxHp, hero.hp + (hero.maxHp - previousMaxHp));
  const item = `${t(`rarity_${rarity}`)} ${inventoryItemName({ kind, bonus })} · ${itemEffectLabel({ effect: effectValue ? effect : "none", effectValue })}`;
  addLog(t("bossLoot").replace("{item}", item), "achievement");
}

function totalXpForLevel(level) { const target = Math.max(1, Math.floor(Number(level) || 1)); return 10 * target * (target - 1); }
function normalizeHeroProgress(hero) {
  if (!hero) return;
  const earnedLevel = Math.max(1, Math.floor(Number(hero.level) || 1));
  let correctLevel = 1;
  while (Number(hero.xp) >= totalXpForLevel(correctLevel + 1)) correctLevel += 1;
  if (earnedLevel <= correctLevel) return;
  const excessLevels = earnedLevel - correctLevel;
  hero.level = correctLevel;
  hero.baseMaxHp = Math.max(getClass(hero.classId).hp, (Number(hero.baseMaxHp) || getClass(hero.classId).hp) - excessLevels * 5);
  hero.baseAttack = Math.max(getClass(hero.classId).attack, (Number(hero.baseAttack) || getClass(hero.classId).attack) - excessLevels);
  hero.skillPoints = Math.max(0, (Number(hero.skillPoints) || 0) - excessLevels);
  recalculateHeroStats();
  hero.hp = Math.min(hero.hp, hero.maxHp);
}
function levelUp() { while (state.hero.xp >= totalXpForLevel(state.hero.level + 1)) { state.hero.level += 1; state.hero.baseMaxHp += 5; state.hero.baseAttack += 1; state.hero.skillPoints = (Number(state.hero.skillPoints) || 0) + 1; recalculateHeroStats(); state.hero.hp = Math.min(state.hero.maxHp, state.hero.hp + 5); addLog("✨ " + t("levelUp").replace("{level}", state.hero.level) + ` · ${t("skillPoints").replace("{count}", state.hero.skillPoints)}`, "system"); } if (state.hero.level > profile.highestLevel) { profile.highestLevel = state.hero.level; saveProfile(); evaluateAchievements(); } }
function saveGame() { state.storyVersion = STORY_VERSION; localStorage.setItem(SAVE_KEY, JSON.stringify(state)); }
function continueSave() {
  const raw = localStorage.getItem(SAVE_KEY); if (!raw) { alertInline(t("noSave")); return; }
  try {
    const saved = JSON.parse(raw);
    const compatibleVersion = saved.storyVersion === STORY_VERSION || saved.storyVersion === "village-oublie-python-1";
    if (!compatibleVersion || !Array.isArray(saved.scenes) || !saved.scenes.length) { alertInline(t("oldSave")); return; }
    Object.assign(state, saved);
    normalizeInventory(state.hero);
    normalizeHeroProgress(state.hero);
    rememberSkillMastery();
    state.hero.potions = Math.max(0, Math.min(potionCapacity(), Number(state.hero.potions) || 0));
    state.storyBranches = state.storyBranches && typeof state.storyBranches === "object" ? state.storyBranches : {};
    state.finalChoice = ["yes", "no"].includes(state.finalChoice) ? state.finalChoice : null;
    state.restCount = Math.max(0, Number(state.restCount) || 0);
    state.endingReason ||= null;
    state.storyVersion = STORY_VERSION;
    state.runDeaths = Number(state.runDeaths) || 0;
    state.chapterPath ||= state.chapter === 1 ? "village" : state.chapter === 2 ? "frontiere" : state.chapter === 3 ? "fjord" : null;
    state.chapterRoutes = Array.isArray(state.chapterRoutes) ? [...new Set(state.chapterRoutes.filter((route) => typeof route === "string"))] : [];
    state.routeQuestStarted = Boolean(state.routeQuestStarted);
    state.routeQuestComplete = Boolean(state.routeQuestComplete);
    if (state.chapter === 2 && !state.chapterRoutes.length && state.chapterPath) state.chapterRoutes.push(state.chapterPath);
    if (state.chapter === 1 && (state.scenes.length !== CONTENT.storyEvents.length || !state.scenes[0]?.yes)) state.scenes = createScenes(getChapter(1));
    if (state.chapter === 2 && state.scenes.length !== CONTENT.treasureEvents.length) state.scenes = createScenes(getChapter(2));
    if (state.chapter === 3 && state.scenes.length !== CONTENT.nordicEvents.length) state.scenes = createScenes(getChapter(3));
    inventoryOpen = false; state.screen = "game"; renderGame();
  }
  catch { alertInline(t("invalidSave")); }
}
function alertInline(message) { document.querySelector(".modal-backdrop")?.remove(); document.body.insertAdjacentHTML("beforeend", `<div class="modal-backdrop"><section class="modal"><h2>${t("information")}</h2><p>${escapeHtml(message)}</p><div class="modal-actions"><button class="btn btn--cyan" data-close>${t("understood")}</button></div></section></div>`); document.querySelector("[data-close]").addEventListener("click", () => document.querySelector(".modal-backdrop")?.remove()); }
function confirmInline(message, onConfirm, { confirmLabel = t("leave"), title = t("confirm") } = {}) {
  document.querySelector(".modal-backdrop")?.remove();
  document.body.insertAdjacentHTML("beforeend", `<div class="modal-backdrop"><section class="modal" role="dialog" aria-modal="true"><h2>${escapeHtml(title)}</h2><p>${escapeHtml(message)}</p><div class="modal-actions"><button class="btn" data-cancel>${t("cancel")}</button><button class="btn btn--danger" data-confirm>${escapeHtml(confirmLabel)}</button></div></section></div>`);
  document.querySelector("[data-cancel]").addEventListener("click", () => document.querySelector(".modal-backdrop")?.remove());
  document.querySelector("[data-confirm]").addEventListener("click", () => { document.querySelector(".modal-backdrop")?.remove(); onConfirm(); });
}

window.__tfAction = (action) => { if (["yes", "no", "rest"].includes(action)) advance(action); if (["attack", "defend", "potion", "skill"].includes(action)) combatAction(action); if (action === "campaign") continueCampaign(); if (action === "finish") { state.screen = "menu"; render(); } };
// API lecture seule minimale pour les vérifications navigateur et la QA.
window.TF_DEBUG = Object.freeze({
  getState: () => state,
  getContent: () => CONTENT,
  getTranslations: () => TRANSLATIONS,
  getEnemyAsset: enemyPortraitAsset,
});
window.state = state;
window.TF_CONTENT = CONTENT;
window.TF_TRANSLATIONS = TRANSLATIONS;
window.renderGame = renderGame;
state.screen = "title";
render();











