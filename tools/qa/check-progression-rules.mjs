import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import vm from "node:vm";
import project from "./project.cjs";

const readProjectFile = (path) => readFileSync(project.gameFile(path), "utf8");
const dataSandbox = { window: {} };
vm.runInNewContext(readProjectFile("story-data.js"), dataSandbox);
const achievements = new Map(dataSandbox.window.TF_CONTENT.achievements.map((entry) => [entry.id, entry]));
const expected = { "level-five": 5, "level-ten": 10, "level-twenty": 12, "level-fifty": 15, "level-one-hundred": 18 };
const unlocks = Object.fromEntries([...achievements.values()].filter((entry) => entry.goal.type === "level").map((entry) => [entry.id, entry.goal.target]));
assert.deepEqual(unlocks, expected, "historical IDs must keep the new realistic level thresholds");
const catalog = JSON.parse(readProjectFile("translations/catalog.json"));
for (const [id, level] of Object.entries(expected)) {
  assert.ok(achievements.has(id), `missing achievement definition: ${id}`);
  assert.ok(catalog.achievements[id].fr.description.includes(`niveau ${level}`), `${id} catalog description should match level ${level}`);
  assert.equal(catalog.achievements[id].en.description, `Reach level ${level} during a campaign.`, `${id} English description should match level ${level}`);
}

const patches = JSON.parse(readProjectFile("translations/ui-patches.json"));
for (const [language, copy] of Object.entries(patches)) {
  assert.ok(copy.restExhausted, `${language} missing exhausted-rest label`);
  assert.ok(copy.restExhaustedHint, `${language} missing exhausted-rest tooltip`);
  assert.ok(copy.restExhaustedConfirm, `${language} missing exhausted-rest confirmation`);
  assert.ok(copy.restHint, `${language} missing rest tooltip`);
  assert.ok(copy.restLog, `${language} missing rest log text`);
  for (const placeholder of ["{step}", "{healed}", "{count}", "{limit}"]) {
    if (copy.restLog) assert.ok(copy.restLog.includes(placeholder), `${language} restLog missing ${placeholder}`);
  }
}

console.log("Progression checks passed: historical IDs, actual unlock levels, and rest copy in all locales.");
