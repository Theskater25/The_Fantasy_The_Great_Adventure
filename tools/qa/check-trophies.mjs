import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import vm from "node:vm";

const root = new URL("../../", import.meta.url);
const read = (name) => readFileSync(new URL(name, root), "utf8");
const box = { window: {} };
vm.createContext(box);
for (const file of ["story-data.js", "translations/catalog.js", "translations.js", "trophies.js"]) vm.runInContext(read(file), box, { filename: file });
const { TF_CONTENT: content, TF_TROPHIES: rules, TF_TRANSLATIONS: translations } = box.window;
const catalog = JSON.parse(read("translations/catalog.json"));
const ids = new Set(content.achievements.map((item) => item.id));
assert.equal(catalog.achievements["village-hero"].fr.title, "Héros du Village oublié", "French accents must survive catalogue generation");
for (const row of content.achievements) assert.ok(!/Ã|Â|â€/.test(row.title + row.description), "Corrupted French text: " + row.id);
assert.equal(ids.size, 48);
assert.equal(rules.required(content).length, 24);
assert.equal(content.achievements.filter((item) => item.optional).length, 23);
const goalTypes = new Set(["bosses", "boss", "chapters", "clean-chapters", "chapter-classes", "class", "routes", "level", "milestone", "quests", "platinum"]);
for (const item of content.achievements) {
  assert.ok(goalTypes.has(item.goal.type), item.id);
  for (const language of ["fr", "en", "de", "es", "pl", "zh-CN"]) {
    assert.ok(catalog.achievements[item.id][language].title, item.id + language);
    assert.ok(catalog.achievements[item.id][language].description, item.id + language);
  }
}
for (const language of ["en", "de", "es", "pl", "zh-CN"]) assert.equal(translations[language].content.achievements.length, 48);
const fresh = () => ({ unlocked: [], completedChapters: [], noDeathChapters: [], defeatedBosses: [], chapter2Routes: [], highestLevel: 1, skillMastery: {} });
const progress = (id, profile) => rules.progress(content.achievements.find((item) => item.id === id), profile, content, translations);
let profile = fresh();
for (const item of content.achievements) assert.equal(progress(item.id, profile).reached, false, item.id + " must not unlock on an empty profile");

for (const item of content.achievements.filter((entry) => entry.goal.type === "level")) {
  profile.highestLevel = item.goal.target - 1;
  assert.equal(progress(item.id, profile).reached, false);
  profile.highestLevel++;
  assert.equal(progress(item.id, profile).reached, true);
}
profile = fresh();
profile.completedChapters = [1];
profile.chapterClasses = { 1: ["chevalier", "chevalier", "invalid", "valkyrie", "sorcier"] };
assert.equal(progress("village-classes", profile).current, 2, "Duplicate, unknown or chapter-locked classes must not count");
profile.chapterClasses[1].push("archer");
assert.equal(progress("village-classes", profile).reached, true);
profile.completedChapters = [];
assert.equal(progress("class-chevalier", profile).reached, false, "A selected class is not a completed chapter");

profile = fresh();
const hero = { inventory: Array.from({ length: 5 }, (_, i) => ({ id: "item-" + i, kind: "armor", equipped: true })), skills: { blade: 5 }, specializations: { blade: "lifetaker" } };
rules.collectMilestones(profile, { hero, sideQuestsCompleted: { 1: true, 2: true } });
for (const id of ["equipped-adventurer", "first-skill", "first-specialization", "first-ultimate", "first-side-quest"]) assert.equal(progress(id, profile).reached, true, id);
assert.equal(progress("all-side-quests", profile).current, 2);
rules.collectMilestones(profile, { hero: { inventory: [], skills: {} }, sideQuestsCompleted: {} });
assert.equal(progress("equipped-adventurer", profile).reached, true, "Unequipping or restarting must retain earned milestones");
assert.equal(progress("all-side-quests", profile).current, 2);
profile = JSON.parse(JSON.stringify(profile));
rules.collectMilestones(profile, { hero, sideQuestsCompleted: { 3: true } });
assert.equal(progress("all-side-quests", profile).reached, true, "Quest progress persists across saves and runs");
const blank = fresh();
blank.completedChapters = [1, 2, 3];
rules.collectMilestones(blank, { hero: { inventory: [], skills: {} } });
assert.equal(progress("all-side-quests", blank).current, 0, "Completing chapters does not prove side quests");
const invalidBuild = fresh();
rules.collectMilestones(invalidBuild, { hero: { skills: { blade: 5 }, specializations: { blade: "unknown" } } });
assert.equal(progress("first-ultimate", invalidBuild).reached, false);

// Exercise the real unlock loop, including legacy unlock preservation and platinum.
profile.completedChapters = [1, 2, 3];
profile.noDeathChapters = [1, 2, 3];
profile.defeatedBosses = [...content.bosses, ...content.treasureBosses, ...content.nordicBosses].map((boss) => boss.name);
profile.chapter2Routes = ["cendres", "oubli", "forge", "marais", "forteresse"];
profile.highestLevel = 18;
profile.unlocked = ["class-chevalier", "village-classes", "legacy-unknown"];
const originalUnlocks = [...profile.unlocked];
const app = read("app.js");
const evaluate = app.match(/function evaluateAchievements\(\) \{[\s\S]*?\n\}/)[0];
const runtime = { window: box.window, CONTENT: content, TRANSLATIONS: translations, profile, unlockAchievement: (id) => { if (!profile.unlocked.includes(id)) profile.unlocked.push(id); } };
vm.createContext(runtime);
vm.runInContext(evaluate + "\nevaluateAchievements();", runtime);
assert.equal(progress("platinum", profile).reached, true);
assert.ok(profile.unlocked.includes("platinum"), "Platinum unlocks without completing every class");
for (const id of originalUnlocks) assert.ok(profile.unlocked.includes(id), "Never revoke old unlocks");
const once = [...profile.unlocked];
vm.runInContext("evaluateAchievements();", runtime);
assert.deepEqual(profile.unlocked, once, "Evaluation is idempotent");
profile.unlocked = rules.required(content).filter((item) => item.id !== "all-side-quests").map((item) => item.id);
assert.equal(progress("platinum", profile).reached, false, "One missing main goal must block platinum");
console.log("Trophy checks passed: thresholds, 6 locales, milestones, migration, class evidence, idempotence and platinum.");
