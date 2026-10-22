/* Audit completeness of event translations without mutating locale catalogues. */
import { readFileSync } from "node:fs";
import vm from "node:vm";

const sandbox = { window: {} };
vm.createContext(sandbox);
for (const file of ["story-data.js", "translations/catalog.js", "translations.js"]) {
  vm.runInContext(readFileSync(file, "utf8"), sandbox, { filename: file });
}
const { TF_CONTENT: content, TF_TRANSLATIONS: locales } = sandbox.window;
const chapters = [content.storyEvents, content.treasureEvents, content.nordicEvents];
for (const language of ["en", "de", "es", "pl", "zh-CN"]) {
  let missing = 0;
  let total = 0;
  const perChapter = [];
  for (let chapter = 0; chapter < chapters.length; chapter += 1) {
    let chapterMissing = 0;
    chapters[chapter].forEach((event, index) => {
      [event.text, event.yes, event.no].forEach((source, field) => {
        const translated = locales[language]?.events?.[chapter + 1]?.[index]?.[field];
        total += 1;
        if (!translated || translated === source) { missing += 1; chapterMissing += 1; }
      });
    });
    perChapter.push(chapterMissing);
  }
  console.log(`${language}: ${missing}/${total} event fields empty or still French (I/II/III ${perChapter.join("/")})`);
}
