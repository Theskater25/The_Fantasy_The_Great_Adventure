/* The Fantasy V2 — moteur navigateur et interface */
const CONTENT = window.TF_CONTENT;
const TRANSLATIONS = window.TF_TRANSLATIONS || {};
const SAVE_KEY = "the-fantasy-version-2-save";
const STORY_VERSION = CONTENT.storyVersion;
const CLASSES = CONTENT.classes;
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
  "Zombie": "assets/enemies/zombie.svg",
  "Squelette": "assets/enemies/skeleton.svg",
  "Groupe de pillard": "assets/enemies/raider.svg",
  "Goblin": "assets/enemies/goblin.svg",
  "Rat": "assets/enemies/rat.svg",
  "Jack Chistophe, Prêtre de l'Evangile de l'Eglise Ulmer Münster": "assets/enemies/jack-chistophe.svg",
  "Yhorm le Géant": "assets/enemies/yhorm.svg",
  "Lothric, Prince cadet et Lorian, Prince aîné": "assets/enemies/lothric.svg",
  "Ilyan, L'indompteur sanguinaire de la Tricky Tower de Dieuv": "assets/enemies/ilyan.svg",
  "Le Roi sans Nom": "assets/enemies/roi-sans-nom.svg",
};
const TROPHY_TIERS = {
  bronze: { label: "Bronze", icon: "🥉" },
  silver: { label: "Argent", icon: "🥈" },
  gold: { label: "Or", icon: "🥇" },
  platinum: { label: "Platine", icon: "◆" },
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
const SETTINGS_KEY = "the-fantasy-version-2-settings";
const PROFILE_KEY = "the-fantasy-version-2-achievements";
const DEFAULT_SETTINGS = { language: "fr", display: "standard", music: true, motion: true, volume: 70 };
const UI_TEXT = {
  fr: {
    play: "Jouer", achievements: "Trophées", credits: "Crédits", settings: "Réglages", leave: "Quitter", back: "Retour",
    chooseChapter: "Choisissez votre chapitre", developer: "Développeur", titleSubtitle: "Une légende en trois chapitres",
    display: "Affichage", language: "Langue de l'interface", music: "Musique de fond", motion: "Animations de l'interface",
    volume: "Volume", standard: "Standard · 1280 × 720", compact: "Compact · petits écrans", large: "Large · 1600 × 900",
    fullscreen: "Plein écran", apply: "Appliquer", availableSoon: "Français disponible · traduction anglaise, Allemande, Polonaise, Espagnole à venir",
    audioNote: "Les fichiers audio seront ajoutés dans le dossier audio/ quand ils seront choisis.",
    classesChapter: "Classes disponibles pour ce chapitre", chapterLock: "Vous devez terminer le chapitre I en entier sans mourir avant de débloquer les chapitres suivants.", yes: "Oui", no: "Non", attack: "Attaquer", wait: "Attendre", decision: "Votre décision", action: "Votre action", finished: "Chapitre terminé", sealed: "Destin scellé",
  },
  de: {
    play: "Spielen", achievements: "Errungenschaften", credits: "Mitwirkende", settings: "Einstellungen", leave: "Verlassen", back: "Zurück",
    chooseChapter: "Wählen Sie Ihren Kapitel", developer: "Entwickler", titleSubtitle: "Eine Legende über drei Kapitel",
    display: "Anzeige", language: "Oberflächensprache", music: "Hintergrundmusik", motion: "Oberflächenanimationen",
    volume: "Lautstärke", standard: "Standard · 1280 × 720", compact: "Kompakt · Kleine Bildschirme", large: "Groß · 1600 × 900",
    fullscreen: "Vollbild", apply: "Anwenden", availableSoon: "French verfügbar · Englische, Deutsche, Polnische, Spanische Story-Übersetzung kommt bald",
    audioNote: "Audio files will be added to the audio/ folder when selected.",
    classesChapter: "Classes available for this chapter", chapterLock: "You must complete Chapter I without dying before the next chapters are unlocked.", yes: "Yes", no: "No", attack: "Attack", wait: "Wait", decision: "Your decision", action: "Your action", finished: "Chapter completed", sealed: "Fate sealed",
  },
  es: {
    play: "Jugar", achievements: "Logros", credits: "Créditos", settings: "Configuración", leave: "Salir", back: "Volver",
    chooseChapter: "Elige tu capítulo", developer: "Desarrollador", titleSubtitle: "Una leyenda en tres capítulos",
    display: "Pantalla", language: "Idioma de la interfaz", music: "Música de fondo", motion: "Animaciones de la interfaz",
    volume: "Volumen", standard: "Estándar · 1280 × 720", compact: "Compacto · pantallas pequeñas", large: "Grande · 1600 × 900",
    fullscreen: "Pantalla completa", apply: "Aplicar", availableSoon: "Frances disponible · Traducción al inglés, alemán, polaco y español próximamente",
    audioNote: "Audio files will be added to the audio/ folder when selected.",
    classesChapter: "Classes available for this chapter",
  },
  pl: {
    play: "Graj", achievements: "Osiągnięcia", credits: "Podziękowania", settings: "Ustawienia", leave: "Opuść", back: "Wstecz",
    chooseChapter: "Wybierz swój rozdział", developer: "Programista", titleSubtitle: "Jedna legenda w trzech rozdziałach",
    display: "Ekran", language: "Język interfejsu", music: "Muzyka tła", motion: "Animacje interfejsu",
    volume: "Głośność", standard: "Standardowy · 1280 × 720", compact: "Kompaktowy · małe ekrany", large: "Duży · 1600 × 900",
    fullscreen: "Pełny ekran", apply: "Zastosuj", availableSoon: "Francuski dostępny · Tłumaczenie na angielski, niemiecki, polski i hiszpański wkrótce",
    audioNote: "Audio files will be added to the audio/ folder when selected.",
    classesChapter: "Classes available for this chapter",
  },
  en: {
    play: "Play", achievements: "Achievements", credits: "Credits", settings: "Settings", leave: "Leave", back: "Back",
    chooseChapter: "Choose your chapter", developer: "Developer", titleSubtitle: "One legend across three chapters",
    display: "Display", language: "Interface language", music: "Background music", motion: "Interface animations",
    volume: "Volume", standard: "Standard · 1280 × 720", compact: "Compact · small screens", large: "Large · 1600 × 900",
    fullscreen: "Fullscreen", apply: "Apply", availableSoon: "French available · English, German, Polish and Spanish story translations coming soon",
    audioNote: "Audio files will be added to the audio/ folder when selected.",
    classesChapter: "Classes available for this chapter",
  },
};
function loadSettings() {
  try { return { ...DEFAULT_SETTINGS, ...JSON.parse(localStorage.getItem(SETTINGS_KEY) || "{}")} ; }
  catch { return { ...DEFAULT_SETTINGS }; }
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
      chapter2Routes: Array.isArray(saved.chapter2Routes) ? saved.chapter2Routes : [],
      highestLevel: Number(saved.highestLevel) || 1,
      totalDeaths: Number(saved.totalDeaths) || 0,
    };
  } catch { return { unlocked: [], completedChapters: [], noDeathChapters: [], defeatedBosses: [], uniqueEnemies: [], chapterClasses: {}, chapter2Routes: [], highestLevel: 1, totalDeaths: 0 }; }
}
let profile = loadProfile();
function t(key) { return UI_TEXT[settings.language]?.[key] || UI_TEXT.fr[key] || key; }
function localizedChapter(chapter) { return { ...chapter, ...(TRANSLATIONS[settings.language]?.chapters?.[chapter.id] || {}) }; }
function localizedEventField(scene, field) {
  const fieldIndex = { text: 0, yes: 1, no: 2 }[field];
  const translated = TRANSLATIONS[settings.language]?.events?.[state.chapter]?.[Number(scene?.number) - 1]?.[fieldIndex];
  return translated || scene?.[field] || "";
}
function localizedPath(pathMap, pathKey) { return TRANSLATIONS[settings.language]?.paths?.[state.chapter]?.[pathKey] || pathMap[pathKey] || ""; }
function saveSettings() { localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings)); applySettings(); syncAudio(); }
function saveProfile() { localStorage.setItem(PROFILE_KEY, JSON.stringify(profile)); }
function unlockedTrophyCount() {
  const knownIds = new Set(CONTENT.achievements.map((achievement) => achievement.id));
  return profile.unlocked.filter((id) => knownIds.has(id)).length;
}
function applySettings() {
  document.documentElement.lang = settings.language;
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
function classesForChapter(chapter) { return CLASSES.filter((heroClass) => !heroClass.minChapter || chapter.id >= heroClass.minChapter); }
function unlockAchievement(id) {
  if (profile.unlocked.includes(id)) return false;
  const achievement = CONTENT.achievements.find((item) => item.id === id);
  if (!achievement) return false;
  profile.unlocked.push(id);
  saveProfile();
  if (state.screen === "game" && state.log) addLog(`🏆 Trophée débloqué : ${achievement.title}`, "achievement");
  return true;
}
function evaluateAchievements() {
  const completed = new Set(profile.completedChapters);
  const chapterClasses = (chapter) => new Set(profile.chapterClasses[String(chapter)] || []);
  if (profile.defeatedBosses.length >= 1) unlockAchievement("first-boss");
  if (profile.defeatedBosses.length >= 5) unlockAchievement("five-bosses");
  if (profile.defeatedBosses.includes("Azharkan, le Roi démon")) unlockAchievement("demon-king");
  if (completed.has(1)) unlockAchievement("village-hero");
  if (completed.has(2)) unlockAchievement("treasure-hunter");
  if (completed.has(3)) unlockAchievement("eivor-legend");
  if ([1, 2, 3].every((chapter) => completed.has(chapter))) unlockAchievement("trilogy-complete");
  if ([1, 2, 3].every((chapter) => profile.noDeathChapters.includes(chapter))) unlockAchievement("trilogy-no-death");
  if (chapterClasses(1).size >= 10) unlockAchievement("village-classes");
  if (chapterClasses(2).size >= 15) unlockAchievement("japan-classes");
  if (profile.chapter2Routes.length >= 5) unlockAchievement("pathfinder");
  if (profile.highestLevel >= 5) unlockAchievement("level-five");
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
  if (!profile.completedChapters.includes(chapterId)) profile.completedChapters.push(chapterId);
  const classKey = String(chapterId);
  profile.chapterClasses[classKey] = Array.isArray(profile.chapterClasses[classKey]) ? profile.chapterClasses[classKey] : [];
  if (!profile.chapterClasses[classKey].includes(state.hero.classId)) profile.chapterClasses[classKey].push(state.hero.classId);
  if (state.runDeaths === 0 && !profile.noDeathChapters.includes(chapterId)) profile.noDeathChapters.push(chapterId);
  if (chapterId === 2 && state.chapterPath && !profile.chapter2Routes.includes(state.chapterPath)) profile.chapter2Routes.push(state.chapterPath);
  unlockAchievement(`class-${state.hero.classId}`);
  addLog(chapterId === 1 ? "Vous atteignez la fin du Village oublié et la relique ancestrale vous reconnaît." : chapterId === 2 ? "Azharkan est vaincu. Le trésor du Roi démon est libéré et les royaumes retrouvent leur avenir." : "Le chapitre s'achève et votre nom rejoint la légende du Nord.", "system");
  evaluateAchievements();
  saveProfile();
}
function recordEnemyDefeat(enemy) {
  if (!profile.uniqueEnemies.includes(enemy.name)) profile.uniqueEnemies.push(enemy.name);
  if (enemy.type === "boss" && !profile.defeatedBosses.includes(enemy.name)) profile.defeatedBosses.push(enemy.name);
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
  runDeaths: 0,
  log: [],
  completed: false,
  gameOver: false,
};

const app = document.querySelector("#app");

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" }[char]));
}
function getClass(id) { return CLASSES.find((item) => item.id === id) || CLASSES[0]; }
function getChapter(id) { const chapter = CHAPTERS.find((item) => item.id === Number(id)) || CHAPTERS[0]; return localizedChapter(chapter); }
function getCurrentScene() { return state.scenes[state.scene] || null; }
function translatedType(type) { return type === "boss" ? "Boss" : "Basique"; }
function getEnemyAsset(enemy) { return enemy.asset || ENEMY_ASSETS[enemy.name] || "assets/enemies/zombie.svg"; }
function getSceneText(scene) {
  const pathMap = state.chapter === 1 ? VILLAGE_PATHS : state.chapter === 2 ? TREASURE_PATHS : NORDIC_PATHS;
  const text = localizedEventField(scene, "text");
  if (scene?.number > 1 && pathMap[state.chapterPath]) return localizedPath(pathMap, state.chapterPath) + ". " + text;
  return text;
}

function isChapterUnlocked(id) { return Number(id) === 1 || (profile.completedChapters.includes(1) && profile.noDeathChapters.includes(1)); }
function chooseChapter(id) { if (!isChapterUnlocked(id)) { alertInline(t("chapterLock")); return; } state.chapter = Number(id); state.selectedClass = null; state.screen = "select"; render(); }

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
  app.innerHTML = `<main class="screen screen--title"><section class="title-screen"><div class="title-rune">✦</div><div class="eyebrow">${t("titleSubtitle")}</div><h1>THE FANTASY</h1><h2>THE GREAT ADVENTURE</h2><div class="title-line"></div><nav class="title-menu"><button class="title-button title-button--primary" data-action="play">${t("play")}</button><button class="title-button" data-action="achievements">${t("achievements")}</button><button class="title-button" data-action="credits">${t("credits")}</button><button class="title-button" data-action="settings">${t("settings")}</button><button class="title-button title-button--danger" data-action="leave">${t("leave")}</button></nav></section></main>`;
  app.querySelector("[data-action=play]").addEventListener("click", () => { state.screen = "menu"; render(); });
  app.querySelector("[data-action=achievements]").addEventListener("click", () => { state.screen = "achievements"; render(); });
  app.querySelector("[data-action=credits]").addEventListener("click", () => { state.screen = "credits"; render(); });
  app.querySelector("[data-action=settings]").addEventListener("click", () => { state.screen = "settings"; render(); });
  app.querySelector("[data-action=leave]").addEventListener("click", () => window.close());
}
function renderCredits() {
  app.innerHTML = `<main class="screen screen--subscreen"><section class="subscreen-card"><div class="eyebrow">THE FANTASY</div><h1>${t("credits")}</h1><div class="credit-block"><span>${t("developer")}</span><strong>Theskater25</strong><small>The Fantasy · The Great Adventure</small></div><div class="credit-block"><span>Version</span><strong>2.0.1 · The Great Adventure</strong><small>${t("titleSubtitle")}</small></div><button class="btn btn--cyan" data-action="back">${t("back")}</button></section></main>`;
  app.querySelector("[data-action=back]").addEventListener("click", () => { state.screen = "title"; render(); });
}

function renderAchievements() {
  const unlocked = new Set(profile.unlocked);
  const rows = CONTENT.achievements.map((achievement) => {
    const tier = TROPHY_TIERS[achievement.tier] || TROPHY_TIERS.bronze;
    return `<article class="achievement-row achievement-row--${achievement.tier} ${unlocked.has(achievement.id) ? "is-unlocked" : "is-locked"}"><div class="achievement-icon">${unlocked.has(achievement.id) ? achievement.icon : "?"}</div><div><div class="achievement-title-line"><h3>${achievement.title}</h3><span class="trophy-badge trophy-badge--${achievement.tier}">${tier.icon} ${tier.label}</span></div><p>${achievement.description}</p></div><span class="achievement-state">${unlocked.has(achievement.id) ? "✓" : "—"}</span></article>`;
  }).join("");
  const tierSummary = Object.entries(TROPHY_TIERS).map(([tierKey, tier]) => { const total = CONTENT.achievements.filter((achievement) => achievement.tier === tierKey).length; const got = CONTENT.achievements.filter((achievement) => achievement.tier === tierKey && unlocked.has(achievement.id)).length; return `${tier.icon} ${got}/${total}`; }).join(" · ");
  app.innerHTML = `<main class="screen screen--subscreen"><section class="subscreen-card achievements-card"><div class="eyebrow">THE FANTASY</div><h1>${t("achievements")}</h1><p class="achievement-count">${unlockedTrophyCount()} / ${CONTENT.achievements.length} ${settings.language === "fr" ? "trophées débloqués" : "trophies unlocked"}<br><span class="achievement-tier-summary">${tierSummary}</span></p><div class="achievement-list">${rows}</div><button class="btn btn--cyan" data-action="back">${t("back")}</button></section></main>`;
  app.querySelector("[data-action=back]").addEventListener("click", () => { state.screen = "title"; render(); });
}

function renderSettings() {
  app.innerHTML = `<main class="screen screen--subscreen"><section class="subscreen-card settings-card"><div class="eyebrow">THE FANTASY</div><h1>${t("settings")}</h1><label>${t("display")}<select id="setting-display"><option value="standard">${t("standard")}</option><option value="compact">${t("compact")}</option><option value="large">${t("large")}</option><option value="fullscreen">${t("fullscreen")}</option></select></label><label>${t("language")}<select id="setting-language"><option value="fr">Français</option><option value="en">English · interface</option></select></label><label class="setting-check"><input type="checkbox" id="setting-music"> <span>${t("music")}</span></label><label class="setting-check"><input type="checkbox" id="setting-motion"> <span>${t("motion")}</span></label><label>${t("volume")}<input id="setting-volume" type="range" min="0" max="100" step="10"></label><p class="settings-note">${t("availableSoon")}<br>${t("audioNote")}</p><div class="subscreen-actions"><button class="btn" data-action="back">${t("back")}</button><button class="btn btn--cyan" data-action="apply-settings">${t("apply")}</button></div></section></main>`;
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
    state.screen = "title"; render();
  });
}

function renderMenu() {
  const menuChapters = CHAPTERS.map((chapter) => getChapter(chapter.id));
  app.innerHTML = `<main class="screen screen--menu"><section class="menu-wrap">
    <div class="brand"><div class="brand-mark">✦</div><div><div class="eyebrow">Une trilogie fantasy</div><h1>THE FANTASY</h1><p>${t("chooseChapter")}</p></div><button class="btn btn--small" data-action="title">${t("back")}</button></div>
    <div class="menu-grid">${menuChapters.map((chapter) => `<button class="chapter-card" data-number="${chapter.id}" data-chapter="${chapter.id}">
      <span class="chapter-number">${chapter.kicker}</span><h2>${chapter.title}</h2><p>${chapter.text}</p><small>${chapter.tone}</small><span class="card-cta">${chapter.id === 1 ? "Reprendre la trame originale →" : "Commencer l'aventure →"}</span>
    </button>`).join("")}</div>
    <div class="menu-footer"><span></span><div class="menu-actions"><button class="btn btn--cyan" data-action="continue">Continuer</button><button class="btn btn--danger" data-action="quit">Quitter</button></div></div>
  </section></main>`;
  app.querySelectorAll("[data-chapter]").forEach((button) => {
    const locked = !isChapterUnlocked(button.dataset.chapter);
    if (locked) { button.disabled = true; button.classList.add("chapter-card--locked"); const cta = button.querySelector(".card-cta"); if (cta) cta.textContent = "🔒 " + t("chapterLock"); }
    button.addEventListener("click", () => chooseChapter(button.dataset.chapter));
  });
  app.querySelector("[data-action=title]").addEventListener("click", () => { state.screen = "title"; render(); });
  app.querySelector("[data-action=continue]").addEventListener("click", continueSave);
  app.querySelector("[data-action=quit]").addEventListener("click", () => window.close());
}

function renderSelect() {
  const chapter = getChapter(state.chapter);
  const availableClasses = classesForChapter(chapter);
  app.innerHTML = `<main class="screen screen--select">
    <header class="select-header"><div><div class="eyebrow">${chapter.kicker}</div><h1>${chapter.title}</h1><p class="select-subtitle">${chapter.tone}</p></div><button class="btn" data-action="back">Retour au menu</button></header>
    <section class="class-section"><div class="eyebrow class-section-label">${t("classesChapter")}</div><div class="select-grid">${availableClasses.map((heroClass) => `<button class="class-card ${state.selectedClass === heroClass.id ? "is-selected" : ""}" data-class="${heroClass.id}">
      <div class="class-portrait" style="--accent:${heroClass.accent}">${heroClass.icon}</div><div class="class-name">${heroClass.name}</div><div class="class-stats"><span>PV ${heroClass.hp}</span><span>ATQ ${heroClass.attack}</span></div><div class="class-skill">${heroClass.skill}</div><small class="class-effect">${heroClass.skillText}</small>${heroClass.origin ? `<small class="class-origin">${heroClass.origin}</small>` : ""}
      </button>`).join("")}</div></section>
    <footer class="select-footer"><input class="name-input" id="hero-name" maxlength="24" placeholder="Nom de votre héros" value="${escapeHtml(localStorage.getItem("fantasy-v2-name") || "")}" /><button class="btn btn--cyan" data-action="start">Lancer le chapitre →</button></footer>
  </main>`;
  app.querySelectorAll("[data-class]").forEach((card) => card.addEventListener("click", () => { state.selectedClass = card.dataset.class; renderSelect(); }));
  app.querySelector("[data-action=back]").addEventListener("click", () => { state.screen = "menu"; render(); });
  app.querySelector("[data-action=start]").addEventListener("click", startNewGame);
}

function createScenes(chapter) {
  if (chapter.id === 1) return CONTENT.storyEvents.map((event, index) => ({ ...event, number: index + 1, kind: "choice" }));
  if (chapter.id === 2) return CONTENT.treasureEvents.map((event, index) => ({ ...event, number: index + 1, kind: "choice" }));
  if (chapter.id === 3) return CONTENT.nordicEvents.map((event, index) => ({ ...event, number: index + 1, kind: "choice" }));
  const followUp = chapter.id === 2 ? [
    ["Cendre", "La route du trésor traverse une plaine noire. Une marque du Roi démon est gravée dans la pierre. (Voulez-vous la suivre ?)"],
    ["Forteresse", "Les portes de la forteresse sont ouvertes, mais aucune torche ne brûle. (Voulez-vous entrer ?)"],
    ["Crypte", "Sous les ruines, un coffre porte le sceau d'un ancien roi. (Voulez-vous l'ouvrir ?)"],
    ["Couronne", "Le trésor repose derrière un serment brisé. (Voulez-vous réclamer la couronne ?)"],
  ] : [
    ["Fjord", "Les fjords se ferment sous la neige. Une bannière appelle le dernier roi. (Voulez-vous avancer ?)"],
    ["Village", "Les habitants d'Eivor vous demandent de rallumer le feu royal. (Voulez-vous les aider ?)"],
    ["Montagne", "Un ancien chemin de pierre mène au trône oublié. (Voulez-vous l'escalader ?)"],
    ["Trône", "Le dernier roi vous attend au bout du col. (Voulez-vous entrer dans la salle du trône ?)"],
  ];
  return followUp.map(([decor, text], index) => ({ number: index + 1, decor, text, kind: "choice" }));
}

function startNewGame() {
  const name = document.querySelector("#hero-name").value.trim() || "Héros sans nom";
  if (!state.selectedClass) { alertInline("Choisissez une classe avant de commencer."); return; }
  const heroClass = getClass(state.selectedClass);
  state.hero = { name, classId: heroClass.id, level: 1, xp: 0, hp: heroClass.hp, maxHp: heroClass.hp, attack: heroClass.attack, defeated: [] };
  state.battle = null; state.enemy = null; state.scene = 0; state.chapter = Number(state.chapter); state.chapterPath = state.chapter === 1 ? "village" : state.chapter === 2 ? "frontiere" : state.chapter === 3 ? "fjord" : null; state.runDeaths = 0; state.scenes = createScenes(getChapter(state.chapter)); state.log = []; state.completed = false; state.gameOver = false;
  localStorage.setItem("fantasy-v2-name", name); addLog(`Vous êtes ${name}, ${heroClass.name}. L'aventure commence.`, "system"); state.screen = "game"; saveGame(); renderGame();
}

function renderGame() {
  const chapter = getChapter(state.chapter); const heroClass = getClass(state.hero.classId); const current = getCurrentScene(); const displayScene = state.battle?.kind === "boss" && state.scene > 0 ? state.scenes[state.scene - 1] : current; const enemy = state.enemy;
  const hpPct = Math.max(0, Math.min(100, (state.hero.hp / state.hero.maxHp) * 100)); const enemyPct = enemy ? Math.max(0, Math.min(100, enemy.hp / enemy.maxHp * 100)) : 0; const progress = state.scenes.length ? Math.min(state.scene, state.scenes.length) : 0;
  const currentSceneMarkup = state.completed || state.gameOver ? `<div class="scene-card scene-card--ending" id="current-scene"><div class="scene-meta"><span>${state.gameOver ? "FIN DE L'AVENTURE" : "LIVRE DES HÉROS"}</span></div><p>${state.gameOver ? "Votre destinée s'arrête ici. Le monde se souviendra de votre passage." : "La quête est achevée. Votre nom rejoint le Livre des héros."}</p></div>` : displayScene ? `<div class="scene-card" id="current-scene"><div class="scene-meta"><span>${state.battle?.kind === "boss" ? "Boss après l'étape " : "Étape "}${displayScene.number} / ${state.scenes.length}</span><span>${DECOR_ICONS[displayScene.decor] || "✦"} ${escapeHtml(displayScene.decor)}</span></div><p>${escapeHtml(getSceneText(displayScene))}</p></div>` : "";
  app.innerHTML = `<main class="screen screen--game"><header class="game-header"><div><div class="eyebrow">${chapter.kicker}</div><h1>${chapter.title}</h1></div><div class="header-actions"><span class="eyebrow">Niveau ${state.hero.level}</span><button class="btn btn--small" data-action="fullscreen">⛶ Plein écran</button><button class="btn btn--small btn--danger" data-action="menu">Quitter la partie</button></div></header>
    <section class="game-layout"><article class="panel story-panel"><div class="panel-heading"><h2>Journal de l'aventure</h2><span class="eyebrow">${progress} / ${state.scenes.length}</span></div><div class="story-log" id="story-log">${state.log.join("")}${currentSceneMarkup}${enemy ? `<div class="enemy-stage"><div class="enemy-portrait"><img src="${getEnemyAsset(enemy)}" alt="Portrait de ${escapeHtml(enemy.name)}" loading="eager"></div><div class="enemy-readout"><div class="eyebrow">${enemy.type === "boss" ? "Rencontre majeure" : "Rencontre"}</div><h3>${escapeHtml(enemy.name)}</h3><p>${translatedType(enemy.type)} · PV ${enemy.hp}/${enemy.maxHp} · ATQ ${enemy.attack}</p><div class="meter"><span style="width:${enemyPct}%"></span></div></div></div>` : ""}</div><div class="combat-footer"><div class="prompt" id="prompt">${getPrompt()}</div><div class="action-list" id="actions">${getActions()}</div></div></article>
      <aside class="panel side-panel"><div class="panel-heading"><h2>Fiche du héros</h2><span class="eyebrow">${heroClass.name}</span></div><div class="hero-card"><div class="hero-top"><div class="hero-avatar" style="--hero-accent:${heroClass.accent}">${heroClass.icon}</div><div><h2>${escapeHtml(state.hero.name)}</h2><div class="hero-class">${heroClass.name} · Niveau ${state.hero.level}</div></div></div><div class="stat-block"><div class="stat-line"><span>PV</span><strong>${state.hero.hp} / ${state.hero.maxHp}</strong></div><div class="meter"><span class="bar-health" style="width:${hpPct}%"></span></div><div class="stat-line"><span>Attaque</span><strong>${state.hero.attack}</strong></div><div class="stat-line"><span>Expérience</span><strong>${state.hero.xp} XP</strong></div></div><div class="ability"><b>${heroClass.skill}</b><small>${heroClass.skillText}</small></div></div><div class="defeated-panel"><h3>Ennemis vaincus</h3><div class="defeated-list">${state.hero.defeated.length ? state.hero.defeated.slice().reverse().map((item) => `<div class="defeated-item"><span>${escapeHtml(item.name)}</span><span>${translatedType(item.type)}</span></div>`).join("") : `<div class="defeated-item"><span>Aucun pour l'instant</span><span>—</span></div>`}</div></div></aside></section><footer class="game-status"><span>${state.gameOver ? "Votre héros est tombé." : state.completed ? "Chapitre terminé — votre légende est inscrite." : state.battle ? `Combat en cours — tour ${state.battle.turn}.` : state.chapter === 2 ? "Vos choix ouvrent des chemins différents, mais chaque route vous rapproche du trésor du Roi démon." : state.chapter === 3 ? "Vos choix vous conduisent vers le dernier trône de Norvège." : "Le texte original du Village oublié guide désormais votre prochaine décision."}</span></footer></main>`;
  const log = document.querySelector("#story-log"); if (log) { log.scrollTop = log.scrollHeight; document.querySelector("#current-scene")?.scrollIntoView({ block: "end" }); } bindGameActions(); syncAudio();
}

function getPrompt() { if (state.gameOver) return t("sealed"); if (state.completed) return t("finished"); if (state.battle) return t("action"); return t("decision"); }
function getActionsLegacy() {
  if (state.gameOver || state.completed) return `<button class="btn btn--cyan" data-action="finish" onclick="window.__tfAction('finish')">Retour à l'accueil</button>`;
  if (state.battle) return `<button class="btn btn--cyan" data-action="attack" onclick="window.__tfAction('attack')">Attaquer</button><button class="btn" data-action="wait" onclick="window.__tfAction('wait')">Attendre</button><button class="btn" data-action="skill" onclick="window.__tfAction('skill')">${getClass(state.hero.classId).skill}</button>`;
  return `<button class="btn btn--cyan" data-action="yes" onclick="window.__tfAction('yes')">Oui</button><button class="btn" data-action="no" onclick="window.__tfAction('no')">Non</button>`;
}
function getActions() {
  if (state.gameOver || state.completed) return "<button class='btn btn--cyan' data-action='finish' onclick='window.__tfAction(\"finish\")'>" + t("back") + "</button>";
  if (state.battle) return "<button class='btn btn--cyan' data-action='attack' onclick='window.__tfAction(\"attack\")'>" + t("attack") + "</button><button class='btn' data-action='wait' onclick='window.__tfAction(\"wait\")'>" + t("wait") + "</button><button class='btn' data-action='skill' onclick='window.__tfAction(\"skill\")'>" + getClass(state.hero.classId).skill + "</button>";
  return "<button class='btn btn--cyan' data-action='yes' onclick='window.__tfAction(\"yes\")'>" + t("yes") + "</button><button class='btn' data-action='no' onclick='window.__tfAction(\"no\")'>" + t("no") + "</button>";
}
function bindGameActions() {
  document.querySelector("[data-action=fullscreen]")?.addEventListener("click", () => document.documentElement.requestFullscreen?.());
  document.querySelector("[data-action=menu]")?.addEventListener("click", () => confirmInline("Quitter cette partie ? La sauvegarde actuelle sera conservée.", () => { saveGame(); state.screen = "menu"; render(); }));
}
function addLog(text, kind = "") { state.log.push(`<p class="story-entry ${kind ? `story-entry--${kind}` : ""}">${escapeHtml(text)}</p>`); }
function archiveCurrentScene(action) {
  const scene = getCurrentScene();
  if (!scene) return;
  addLog(`Étape ${scene.number} · ${getSceneText(scene)}`, "narrative");
  if ([1, 2, 3].includes(state.chapter) && action) {
    const accepted = action === "yes";
    addLog(localizedEventField(scene, accepted ? "yes" : "no"), "choice");
    state.chapterPath = accepted ? scene.yesPath : scene.noPath;
  }
}

function advance(action) {
  const scene = getCurrentScene(); if (!scene || state.battle || state.completed || state.gameOver) return;
  archiveCurrentScene(action);
  if (action === "yes") {
    state.hero.xp += 7; addLog("Vous choisissez d'agir. +7 EXP.", "system");
    if ([1, 2, 3].includes(state.chapter) && Math.random() < (state.chapter === 1 ? 0.30 : 0.22)) { startBattle("event"); saveGame(); renderGame(); return; }
    addLog("Vous avancez sans rencontrer d'ennemis pour l'instant.");
  } else {
    const loss = Math.floor(Math.random() * 3); state.hero.hp = Math.max(0, state.hero.hp - loss); addLog(`Vous choisissez de ne pas agir : vous perdez ${loss} PV. PV restants : ${state.hero.hp}.`, "system");
    if (state.hero.hp <= 0) { registerDeath(); state.gameOver = true; addLog("Vous êtes mort·e à cause d'une mauvaise décision...", "battle"); saveGame(); renderGame(); return; }
  }
  state.scene += 1; finishStep(); saveGame(); renderGame();
}

function startBattle(kind) {
  const completedSteps = state.scene; let template; let scale;
  if (kind === "boss") {
    const bossList = state.chapter === 2 ? CONTENT.treasureBosses : state.chapter === 3 ? CONTENT.nordicBosses : CONTENT.bosses;
    const interval = state.chapter === 2 ? 15 : state.chapter === 3 ? 20 : 10;
    const bossIndex = Math.max(0, Math.floor(completedSteps / interval) - 1) % bossList.length;
    template = bossList[bossIndex]; scale = 1 + (completedSteps / state.scenes.length) * 1.2;
  }
  else { template = CONTENT.basicEnemies[Math.floor(Math.random() * CONTENT.basicEnemies.length)]; scale = 1 + (completedSteps / state.scenes.length) * 0.5; }
  state.enemy = { ...template, hp: Math.ceil(template.hp * scale), maxHp: Math.ceil(template.hp * scale), attack: Math.max(1, Math.ceil(template.attack * scale)) };
  state.battle = { kind, turn: 1, skillUsed: false, enemyFrozen: 0, enemyStun: 0, playerInvincible: 0, playerAtkMult: 1, playerBuffAtk: 0, playerDefReducePct: 0, playerDefReduceTurns: 0 };
  addLog(`${kind === "boss" ? "Rencontre majeure" : "Rencontre"} : ${state.enemy.name} (PV ${state.enemy.hp}, ATQ ${state.enemy.attack}).`, "battle");
}
function finishStep() {
  levelUp();
  const bossInterval = state.chapter === 1 ? 10 : state.chapter === 2 ? 15 : state.chapter === 3 ? 20 : 0;
  if (bossInterval && state.scene > 0 && state.scene % bossInterval === 0 && state.scene <= state.scenes.length) { startBattle("boss"); return; }
  if (state.scene >= state.scenes.length) recordChapterCompletion();
}

function combatAction(action) {
  const heroClass = getClass(state.hero.classId); const battle = state.battle; const enemy = state.enemy;
  if (!battle || !enemy || state.gameOver) return;
  let damage = 0;
  if (action === "attack") { damage = Math.ceil(state.hero.attack * battle.playerAtkMult); battle.playerAtkMult = 1; addLog(`Vous attaquez et infligez ${damage} dégâts.`); }
  else if (action === "wait") addLog("Vous attendez : l'ennemi aura l'occasion de vous frapper.");
  else if (action === "skill") {
    if (battle.skillUsed) addLog("Compétence déjà utilisée ce combat : votre action est perdue.", "system");
    else {
      battle.skillUsed = true; addLog(`Vous utilisez ${heroClass.skill} : ${heroClass.skillText}`, "system");
      if (heroClass.id === "sorcier") battle.enemyFrozen = 1;
      if (heroClass.id === "archer") battle.playerAtkMult = 1.5;
      if (heroClass.id === "chevalier") { battle.playerDefReducePct = 0.7; battle.playerDefReduceTurns = 2; }
      if (heroClass.id === "barbare") { battle.playerAtkMult = 1.5; battle.playerBuffAtk = 2; }
      if (heroClass.id === "assassin") battle.playerInvincible = 1;
      if (heroClass.id === "artificier") { damage = 250; addLog("BOOM ! Vous infligez 250 dégâts.", "battle"); }
      if (heroClass.id === "bard") battle.enemyStun = 3;
      if (heroClass.id === "moine") { for (let hit = 0; hit < 3; hit += 1) { let strike = Math.ceil(state.hero.attack * 0.35); if (hit === 1 && Math.random() < 0.30) { strike *= 2; addLog("Coup critique du deuxième coup !", "battle"); } damage += strike; if (hit === 2 && Math.random() < 0.20) { battle.enemyStun = 1; addLog("Le troisième coup étourdit l'ennemi !", "battle"); } } addLog(`Votre enchaînement inflige ${damage} dégâts.`); }
      if (heroClass.id === "necromancien") { damage = Math.ceil(state.hero.attack); const heal = Math.floor(damage * 0.5); state.hero.hp = Math.min(state.hero.maxHp, state.hero.hp + heal); addLog(`Vous drainez ${damage} PV et récupérez ${heal} PV.`); }
      if (heroClass.id === "bouffon") { const roll = Math.random(); if (roll < 0.4) { damage = Math.ceil(state.hero.attack * 2); addLog(`Coup critique du chaos : ${damage} dégâts !`, "battle"); } else if (roll < 0.7) addLog("Vous ratez complètement votre attaque...", "system"); else if (roll < 0.9) { state.hero.hp = Math.max(0, state.hero.hp - Math.ceil(state.hero.attack)); addLog("Oups ! Le chaos vous blesse.", "battle"); } else { battle.enemyStun = 1; addLog("L'ennemi est mort de rire et ne peut pas attaquer !", "battle"); } }
      if (heroClass.id === "samurai") { damage = Math.ceil(state.hero.attack * 2); addLog(`Iaijutsu tranche l'air : ${damage} dégâts !`, "battle"); }
      if (heroClass.id === "shinobi") { battle.playerInvincible = 1; battle.playerAtkMult = 1.25; addLog("Vous disparaissez dans l'ombre et préparez votre prochaine frappe.", "system"); }
      if (heroClass.id === "onmyoji") { damage = Math.ceil(state.hero.attack * 0.8); battle.enemyFrozen = 2; addLog(`Votre shikigami inflige ${damage} dégâts et fige l'ennemi.`, "battle"); }
      if (heroClass.id === "miko") { damage = Math.ceil(state.hero.attack * 0.7); const heal = Math.ceil(state.hero.maxHp * 0.25); state.hero.hp = Math.min(state.hero.maxHp, state.hero.hp + heal); addLog(`La purification inflige ${damage} dégâts et restaure ${heal} PV.`, "system"); }
      if (heroClass.id === "ronin") { battle.playerDefReducePct = 1; battle.playerDefReduceTurns = 1; battle.playerAtkMult = 1.5; addLog("Vous adoptez la posture du contre parfait.", "system"); }
      if (heroClass.id === "berserker") { damage = Math.ceil(state.hero.attack * 2); addLog(`La Rage de l'ours inflige ${damage} dégâts !`, "battle"); }
      if (heroClass.id === "huskarl") { battle.playerDefReducePct = 0.8; battle.playerDefReduceTurns = 2; addLog("Votre mur de boucliers absorbe la prochaine attaque.", "system"); }
      if (heroClass.id === "valkyrie") { damage = Math.ceil(state.hero.attack * 1.2); const heal = Math.ceil(state.hero.maxHp * 0.25); state.hero.hp = Math.min(state.hero.maxHp, state.hero.hp + heal); addLog(`Les ailes de Freyja infligent ${damage} dégâts et restaurent ${heal} PV.`, "system"); }
      if (heroClass.id === "seidr") { damage = Math.ceil(state.hero.attack * 0.9); battle.enemyFrozen = 2; addLog(`La prophétie des runes inflige ${damage} dégâts et gèle l'ennemi.`, "battle"); }
      if (heroClass.id === "skald") { battle.enemyStun = 3; battle.playerAtkMult = 1.5; addLog("Votre saga de guerre étourdit l'ennemi et inspire votre prochaine frappe.", "system"); }
    }
  }
  if (damage) { enemy.hp -= damage; playSfx("hit"); }
  if (enemy.hp <= 0) { winBattle(); return; }
  if (battle.enemyFrozen > 0) { addLog("L'ennemi est gelé et ne peut pas attaquer.", "system"); battle.enemyFrozen -= 1; }
  else if (battle.enemyStun > 0) { addLog("L'ennemi est étourdi et ne peut pas attaquer.", "system"); battle.enemyStun -= 1; }
  else {
    let received = enemy.attack; if (battle.playerDefReducePct) received = Math.ceil(received * (1 - battle.playerDefReducePct)); if (battle.playerInvincible > 0) { received = 0; addLog("Vous êtes invincible ce tour : aucun dégât subi.", "system"); }
    state.hero.hp = Math.max(0, state.hero.hp - received); addLog(`${enemy.name} vous inflige ${received} dégâts.`);
    if (battle.playerBuffAtk > 0) { battle.playerBuffAtk -= 1; if (battle.playerBuffAtk === 0) battle.playerAtkMult = 1; }
    if (battle.playerDefReduceTurns > 0) { battle.playerDefReduceTurns -= 1; if (battle.playerDefReduceTurns === 0) battle.playerDefReducePct = 0; }
    if (battle.playerInvincible > 0) battle.playerInvincible -= 1;
  }
  if (state.hero.hp <= 0) { registerDeath(); state.gameOver = true; state.battle = null; state.enemy = null; addLog(`Votre aventure s'arrête ici, vaincu·e par ${enemy.name}.`, "battle"); }
  else battle.turn += 1;
  saveGame(); renderGame();
}

function winBattle() {
  const defeated = { name: state.enemy.name, type: state.enemy.type }; const battleKind = state.battle.kind; state.hero.defeated.push(defeated);
  recordEnemyDefeat(state.enemy);
  const combatXp = state.enemy.type === "boss" ? 70 : 14; state.hero.xp += combatXp; addLog(`${state.enemy.name} est vaincu ! +${combatXp} EXP.`, "system");
  if (state.enemy.type === "boss") { const bossReward = 50 + state.scene * 2; state.hero.xp += bossReward; addLog(`Récompense de rencontre majeure : +${bossReward} EXP.`, "system"); }
  state.battle = null; state.enemy = null;
  if (battleKind === "event") { state.scene += 1; finishStep(); }
  else if (state.scene >= state.scenes.length) recordChapterCompletion();
  levelUp(); saveGame(); renderGame();
}

function levelUp() { while (state.hero.xp >= state.hero.level * 20) { state.hero.level += 1; state.hero.maxHp += 5; state.hero.hp = Math.min(state.hero.maxHp, state.hero.hp + 5); state.hero.attack += 1; addLog(`✨ Niveau supérieur ! Vous atteignez le niveau ${state.hero.level}. PV max +5, attaque +1.`, "system"); } if (state.hero.level > profile.highestLevel) { profile.highestLevel = state.hero.level; saveProfile(); evaluateAchievements(); } }
function saveGame() { state.storyVersion = STORY_VERSION; localStorage.setItem(SAVE_KEY, JSON.stringify(state)); }
function continueSave() {
  const raw = localStorage.getItem(SAVE_KEY); if (!raw) { alertInline("Aucune sauvegarde locale n'a encore été créée."); return; }
  try {
    const saved = JSON.parse(raw);
    const compatibleVersion = saved.storyVersion === STORY_VERSION || saved.storyVersion === "village-oublie-python-1";
    if (!compatibleVersion || !Array.isArray(saved.scenes) || !saved.scenes.length) { alertInline("Cette sauvegarde appartient à l'ancien prototype. Lancez une nouvelle partie pour découvrir la trame complète."); return; }
    Object.assign(state, saved);
    state.storyVersion = STORY_VERSION;
    state.runDeaths = Number(state.runDeaths) || 0;
    state.chapterPath ||= state.chapter === 1 ? "village" : state.chapter === 2 ? "frontiere" : state.chapter === 3 ? "fjord" : null;
    if (state.chapter === 1 && (state.scenes.length !== CONTENT.storyEvents.length || !state.scenes[0]?.yes)) state.scenes = createScenes(getChapter(1));
    if (state.chapter === 2 && state.scenes.length !== CONTENT.treasureEvents.length) state.scenes = createScenes(getChapter(2));
    if (state.chapter === 3 && state.scenes.length !== CONTENT.nordicEvents.length) state.scenes = createScenes(getChapter(3));
    state.screen = "game"; renderGame();
  }
  catch { alertInline("La sauvegarde est illisible."); }
}
function alertInline(message) { document.querySelector(".modal-backdrop")?.remove(); document.body.insertAdjacentHTML("beforeend", `<div class="modal-backdrop"><section class="modal"><h2>Information</h2><p>${escapeHtml(message)}</p><div class="modal-actions"><button class="btn btn--cyan" data-close>Compris</button></div></section></div>`); document.querySelector("[data-close]").addEventListener("click", () => document.querySelector(".modal-backdrop")?.remove()); }
function confirmInline(message, onConfirm) { document.body.insertAdjacentHTML("beforeend", `<div class="modal-backdrop"><section class="modal"><h2>Confirmer</h2><p>${escapeHtml(message)}</p><div class="modal-actions"><button class="btn" data-cancel>Annuler</button><button class="btn btn--danger" data-confirm>Quitter</button></div></section></div>`); document.querySelector("[data-cancel]").addEventListener("click", () => document.querySelector(".modal-backdrop")?.remove()); document.querySelector("[data-confirm]").addEventListener("click", () => { document.querySelector(".modal-backdrop")?.remove(); onConfirm(); }); }

window.__tfAction = (action) => { if (["yes", "no"].includes(action)) advance(action); if (["attack", "wait", "skill"].includes(action)) combatAction(action); if (action === "finish") { state.screen = "menu"; render(); } };
state.screen = "title";
render();
