/* Validate the structured catalogue and emit its browser-ready script. */
import { readFileSync, writeFileSync } from "node:fs";
import vm from "node:vm";

const catalogPath = "translations/catalog.json";
const catalog = JSON.parse(readFileSync(catalogPath, "utf8"));
const appSource = readFileSync("app.js", "utf8");
const sandbox = { window: {} };
vm.createContext(sandbox);
for (const file of ["story-data.js", "translations.js"]) {
  vm.runInContext(readFileSync(file, "utf8"), sandbox, { filename: file });
}
const { TF_CONTENT: content, TF_TRANSLATIONS: locales } = sandbox.window;
const sources = { 1: content.storyEvents, 2: content.treasureEvents, 3: content.nordicEvents };
const languages = ["fr", "en", "de", "es", "pl", "zh-CN"];
const sourceFields = ["text", "yes", "no"];
const catalogFields = ["question", "yes", "no"];

const uiMatch = appSource.match(/const UI_TEXT = (\{[\s\S]*?\n\});/);
if (!uiMatch) throw new Error("UI_TEXT was not found in app.js.");
const ui = vm.runInNewContext(`(${uiMatch[1]})`);
for (const language of ["fr", "en", "de", "es", "pl"]) {
  catalog.ui[language] = ui[language];
}

const sourcePaths = {};
for (const [chapter, name] of [[1, "VILLAGE_PATHS"], [2, "TREASURE_PATHS"], [3, "NORDIC_PATHS"]]) {
  const match = appSource.match(new RegExp(`const ${name} = (\\{[\\s\\S]*?\\n\\});`));
  if (!match) throw new Error(`${name} was not found in app.js.`);
  sourcePaths[chapter] = vm.runInNewContext(`(${match[1]})`);
}
const englishPathAliases = { 1: { brume: "mist", "forêt": "forest", "rivière": "river", montagne: "mountain", relique: "relic" } };
for (const language of languages) {
  catalog.paths[language] ||= {};
  for (const [chapter, values] of Object.entries(sourcePaths)) {
    const normalized = {};
    for (const [key, source] of Object.entries(values)) {
      const alias = englishPathAliases[chapter]?.[key];
      const runtimePaths = locales[language]?.paths?.[chapter] || {};
      const savedPaths = catalog.paths[language]?.[chapter] || {};
      normalized[key] = language === "fr"
        ? source
        : runtimePaths[key] || (alias && runtimePaths[alias]) || savedPaths[key] || (alias && savedPaths[alias]) || source;
    }
    catalog.paths[language][chapter] = normalized;
  }
}

const coverage = {};
for (const language of languages) {
  const missingUi = Object.keys(ui.fr).filter((key) => typeof catalog.ui?.[language]?.[key] !== "string" || !catalog.ui[language][key].trim());
  if (missingUi.length) throw new Error(`${language} UI is missing ${missingUi.length} strings (for example: ${missingUi[0]}).`);
  for (const item of content.classes) {
    const row = catalog.classes?.[item.id]?.[language];
    for (const key of ["name", "skill", "skillText"]) if (typeof row?.[key] !== "string" || !row[key].trim()) throw new Error(`${language} class ${item.id} is missing ${key}.`);
  }
  for (const item of content.achievements) {
    const row = catalog.achievements?.[item.id]?.[language];
    for (const key of ["title", "description"]) if (typeof row?.[key] !== "string" || !row[key].trim()) throw new Error(`${language} achievement ${item.id} is missing ${key}.`);
  }
  const enemies = [...content.basicEnemies, ...content.bosses, ...content.treasureBosses, ...content.nordicBosses];
  for (let index = 0; index < enemies.length; index++) {
    const id = `enemy.${String(index + 1).padStart(3, "0")}`;
    const name = catalog.enemies?.[id]?.[language]?.name;
    if (typeof name !== "string" || !name.trim()) throw new Error(`${language} enemy ${id} is missing its name.`);
  }
  let translated = 0;
  let total = 0;
  for (const [chapter, events] of Object.entries(sources)) {
    const rows = catalog.events?.[chapter]?.[language];
    if (!Array.isArray(rows) || rows.length !== events.length) {
      throw new Error(`${language} chapter ${chapter} has ${rows?.length || 0} rows; expected ${events.length}.`);
    }
    for (let index = 0; index < events.length; index++) {
      for (let field = 0; field < 3; field++) {
        const value = rows[index]?.[catalogFields[field]];
        const source = events[index][sourceFields[field]];
        total++;
        if (typeof value !== "string" || !value.trim()) throw new Error(`${language} chapter ${chapter} event ${index + 1}, field ${field + 1} is empty.`);
        if (language !== "fr" && value === source) throw new Error(`${language} chapter ${chapter} event ${index + 1}, field ${field + 1} is still French.`);
        translated++;
      }
    }
  }
  coverage[language] = { narrativeFieldsTranslated: translated, narrativeFieldsTotal: total, complete: translated === total };
}
catalog.coverage = coverage;

writeFileSync(catalogPath, JSON.stringify(catalog, null, 2) + "\n", "utf8");
writeFileSync("translations/catalog.js", `window.TF_TRANSLATION_CATALOG = ${JSON.stringify(catalog)};\n`, "utf8");
for (const [language, result] of Object.entries(coverage)) {
  console.log(`${language}: ${result.narrativeFieldsTranslated}/${result.narrativeFieldsTotal} narrative fields`);
}
console.log("Wrote translations/catalog.js from the validated structured catalogue.");
