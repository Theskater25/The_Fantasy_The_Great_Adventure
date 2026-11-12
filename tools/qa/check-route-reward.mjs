// Regression: owning boss relics must not suppress the cartographer's reward.
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import vm from "node:vm";
import project from "./project.cjs";

const source = readFileSync(project.gameFile("app.js"), "utf8");
function implementation(name) {
  const start = source.indexOf(`function ${name}(`);
  assert.ok(start >= 0, `Missing function: ${name}`);
  const end = source.indexOf("\nfunction ", start + 1);
  assert.ok(end > start, `Missing function boundary: ${name}`);
  return source.slice(start, end);
}
const logic = ["inventoryItems", "potionCapacity", "recalculateHeroStats", "completeSideQuest", "checkSideQuestPath", "archiveCurrentScene"].map(implementation).join("\n");

for (const alreadyHasCompass of [false, true]) {
  const inventory = [{ id: "boss-relic", kind: "relic", bonus: 7, equipped: true }];
  if (alreadyHasCompass) inventory.push({ id: "runic-compass-2", kind: "relic", bonus: 2, equipped: true });
  const sandbox = {
    state: {
      chapter: 2, chapterRoutes: ["cendres", "oubli", "forge", "marais"], routeQuestStarted: true, routeQuestComplete: false,
      sideQuestsCompleted: {},
      hero: { inventory, baseAttack: 10, baseMaxHp: 15, hp: 15, xp: 100, potions: 3, skills: {} },
    },
    getCurrentScene: () => ({ number: 31, yesPath: "forteresse", noPath: "catacombes" }),
    getSceneText: () => "Test de la cinquième route",
    localizedEventField: () => "Route parcourue",
    t: (key) => key, v23: (key) => key,
    addLog: () => {}, levelUp: () => {},
  };
  vm.createContext(sandbox);
  vm.runInContext(logic, sandbox);
  vm.runInContext('recalculateHeroStats(); archiveCurrentScene("yes");', sandbox);
  const { state } = sandbox;
  assert.equal(state.hero.inventory.filter((item) => item.id === "runic-compass-2").length, 1, "Exactly one quest compass, even with another relic equipped");
  assert.equal(state.hero.attack, 19, "Both equipped relic bonuses must apply");
  assert.equal(state.hero.xp, 120, "Quest EXP granted once");
  assert.equal(state.hero.maxHp, 20, "Full potion bag grants five maximum HP");
  assert.equal(state.routeQuestComplete, true);
  assert.equal(state.sideQuestsCompleted["2"], true);
  vm.runInContext('archiveCurrentScene("yes");', sandbox);
  assert.equal(state.hero.inventory.length, 2, "Repeating a route must not duplicate loot");
  assert.equal(state.hero.xp, 120, "Repeating a route must not duplicate EXP");
  assert.equal(state.hero.maxHp, 20, "Repeating a route must not duplicate maximum HP");
}
console.log("Route reward checks passed: existing relic, unique compass, cumulative stats, and no repeated rewards.");
