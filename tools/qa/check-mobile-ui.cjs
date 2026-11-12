/* Responsive UI regression: a fresh profile, real choices and combat actions.
   Run: node tools/qa/check-mobile-ui.cjs
   Optional: PLAYWRIGHT_MODULE, PLAYWRIGHT_CHROMIUM_PATH, MOBILE_QA_URL. */
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const playwrightPath = process.env.PLAYWRIGHT_MODULE || path.resolve(path.dirname(process.execPath), "../node_modules/playwright");
const { chromium } = require(playwrightPath);
const { gameRoot: root, resultsRoot } = require('./project.cjs');
const screenshots = resultsRoot;
fs.mkdirSync(screenshots, { recursive: true });
(async () => {
  const browser = await chromium.launch({ headless: true, executablePath: process.env.PLAYWRIGHT_CHROMIUM_PATH || undefined });
  const context = await browser.newContext({ viewport: { width: 390, height: 844 }, reducedMotion: "reduce", serviceWorkers: "block" });
  const page = await context.newPage();
  const errors = [];
  const checks = [];
  page.on("pageerror", e => errors.push(String(e)));
  const click = async selector => {
    const dialog = page.locator('[role="dialog"]');
    const scope = await dialog.count() ? dialog : page;
    await scope.locator(selector).first().click();
  };
  const snap = async name => page.screenshot({ path: path.join(screenshots, "mobile-v27-" + name + ".png") });
  async function layout(name, game = true) {
    await page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))));
    const result = await page.evaluate(() => {
      const box = el => { const b = el.getBoundingClientRect(); return { x:b.x, y:b.y, width:b.width, height:b.height, right:b.right, bottom:b.bottom }; };
      const width = innerWidth, height = innerHeight;
      const actions = [...document.querySelectorAll("#actions .btn")].map(box);
      const intent = document.querySelector(".combat-footer .enemy-intent");
      const overflowing = [...document.querySelectorAll("main button, main h1, main h2, main h3, main p, main summary, .mobile-health")].filter(el => el.getClientRects().length && el.clientWidth > 0 && el.scrollWidth > el.clientWidth + 2).map(el => el.textContent.slice(0,90));
      return { width, height, compact:!!document.querySelector('.is-compact'), pageWidth:document.documentElement.scrollWidth, pageHeight:document.documentElement.scrollHeight, actions, intent:intent ? box(intent) : null, overflowing };
    });
    assert.equal(result.pageWidth, result.width, name + ": horizontal overflow");
    assert.deepEqual(result.overflowing, [], name + ": overflowing text");
    if (game) {
      assert.ok(result.pageHeight <= result.height + 1, name + ": game should fit the viewport");
      for (const r of result.actions) {
        if (result.compact) assert.ok(r.height >= 44, name + ": touch target too short");
        assert.ok(r.y >= 0 && r.bottom <= result.height && r.x >= 0 && r.right <= result.width, name + ": action clipped");
      }
      if (result.intent) assert.ok(result.intent.y >= 0 && result.intent.bottom <= result.height, name + ": intent clipped");
    }
    checks.push({ name, viewport:result.width+"x"+result.height, actions:result.actions.length, intentVisible:!!result.intent });
  }
  try {
    await page.goto(process.env.MOBILE_QA_URL || "http://127.0.0.1:8125/index.html");
    await layout("title", false);
    await click('[data-action="settings"]');
    await page.locator("#setting-language").selectOption("fr");
    await page.locator("#setting-music").uncheck();
    await click('[data-action="apply-settings"]');
    await click("[data-close]");
    await layout("settings", false);
    await snap("settings");
    await click('[data-action="back"]');
    await click('[data-action="play"]');
    await layout("chapters", false);
    await click('[data-chapter="1"]');
    await click('[data-class="chevalier"]');
    await page.locator("#hero-name").fill("Alexandre des Terres Nord");
    await layout("hero-selection", false);
    await click('[data-action="start"]');
    await page.locator("[data-tutorial-close]").last().click();
    await layout("scene-390");
    await snap("scene");
    await page.locator(".choice-disclosure summary").click();
    assert.equal(await page.locator(".choice-outcomes:visible").count(), 1);
    await click('[data-action="no"]');
    assert.match(await page.locator(".scene-meta").innerText(), /2 \/ 50/);
    await click("[data-game-menu-open]");
    await layout("menu-390");
    await snap("menu");
    await click("[data-inventory-open]");
    assert.equal(await page.locator('[role="dialog"]').count(), 1, "panels must not stack");
    assert.equal(await page.locator(".inventory-empty").count(), 1);
    await click("[data-inventory-close]");
    await click("[data-hero-open]");
    await layout("hero-details");
    await click("[data-panel-close]");
    await click("[data-skill-open]");
    await click('[data-skill-branch="guardian"]');
    assert.equal(await page.locator(".skill-branch:visible").count(), 1);
    await layout("skills-390");
    await snap("skills");
    await click("[data-skill-close]");
    await click("[data-game-menu-open]");
    await click("[data-journal-open]");
    await click('[data-journal-tab="history"]');
    assert.match(await page.locator(".journal-history").innerText(), /Étape 1/);
    await layout("history-390");
    await click("[data-journal-close]");
    await page.setViewportSize({width:320,height:568});
    await layout("scene-320");
    for (let i = 0; i < 9; i++) await click('[data-action="no"]');
    assert.match(await page.locator(".enemy-readout h3").innerText(), /Jack Chistophe/);
    for (const [width,height] of [[320,568],[390,844],[430,932],[844,390],[667,375]]) {
      await page.setViewportSize({width,height});
      await layout("boss-"+width);
      await snap("boss-"+width);
    }
    await page.setViewportSize({width:390,height:844});
    await click('[data-action="skill"]');
    assert.equal(await page.locator('[data-action="skill"]').isDisabled(), true);
    await click('[data-action="attack"]');
    await click('[data-action="attack"]');
    assert.match(await page.locator(".boss-phase-tag").innerText(), /Phase II/i);
    await layout("boss-phase-2");
    await click('[data-action="potion"]');
    await click("[data-skill-open]");
    await click('[data-skill-branch="guardian"]');
    await click('[data-skill-upgrade="guardian"][data-skill-rank="1"]');
    assert.equal(await page.locator('[data-skill-upgrade="guardian"][data-skill-rank="1"]').isDisabled(), true);
    assert.match(await page.locator(".skill-tree-summary").innerText(), /Points à dépenser : 0/);
    await click("[data-skill-close]");
    await click('[data-action="attack"]');
    if (await page.locator(".enemy-stage").count()) await click('[data-action="attack"]');
    assert.equal(await page.locator(".enemy-stage").count(), 0, "first boss won");
    await click("[data-game-menu-open]");
    await click("[data-inventory-open]");
    assert.ok(await page.locator(".inventory-item").count() > 0, "boss loot available");
    await layout("inventory-390");
    const equippedBefore = await page.locator(".inventory-item.is-equipped").count();
    await click("[data-inventory-toggle]");
    assert.equal(await page.locator(".inventory-item.is-equipped").count(), equippedBefore - 1);
    await click("[data-inventory-toggle]");
    assert.equal(await page.locator(".inventory-item.is-equipped").count(), equippedBefore);
    await snap("inventory");
    await click("[data-inventory-close]");
    await page.setViewportSize({width:1280,height:800});
    assert.equal(await page.locator(".screen--game.is-compact").count(), 0);
    assert.equal(await page.locator(".side-panel:visible").count(), 1);
    await layout("desktop-return");
    await snap("desktop");
    await page.setViewportSize({width:320,height:568});
    await click("[data-game-menu-open]");
    await click("[data-skill-open]");
    await layout("skills-320");
    await page.locator("[data-skill-close]").first().press("Escape");
    assert.equal(await page.locator('[role="dialog"]').count(), 0);
    assert.equal(await page.locator("[data-game-menu-open]").evaluate(el=>el===document.activeElement), true);
    await click("[data-game-menu-open]");
    await click('[data-action="menu"]');
    await click("[data-confirm]");
    await click('[data-action="title"]');
    await click('[data-action="achievements"]');
    await layout("trophies-320", false);
    await snap("trophies");
    await click('[data-action="back"]');
    await click('[data-action="settings"]');
    await page.locator("#setting-language").selectOption("de");
    await click('[data-action="apply-settings"]');
    await click("[data-close]");
    await click('[data-action="back"]');
    await click('[data-action="play"]');
    await click('[data-action="continue"]');
    await layout("german-scene-320");
    await click("[data-skill-open]");
    await layout("german-skills-320");
    await snap("german-skills");
    assert.deepEqual(errors, [], "browser JavaScript errors");
    fs.writeFileSync(path.join(screenshots,"mobile-v27-checks.json"), JSON.stringify({checks,errors}, null, 2));
    console.log(JSON.stringify({passed:checks.length,checks,errors}, null, 2));
  } catch (e) {
    await snap("failure");
    console.error(e);
    console.error(await page.locator("body").innerText());
    process.exitCode = 1;
  } finally { await browser.close(); }
})();
