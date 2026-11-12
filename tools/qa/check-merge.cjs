/* Merge regression: campaign carry-over, independent saves, offline art and file launch.
   Uses an isolated Chrome profile. MERGE_QA_URL defaults to the local QA server. */
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { pathToFileURL } = require('node:url');
const { chromium } = require(process.env.TF_PLAYWRIGHT_MODULE || 'playwright');
const { gameRoot: root, resultsRoot } = require('./project.cjs');
fs.mkdirSync(resultsRoot, { recursive: true });
const url = process.env.MERGE_QA_URL || 'http://127.0.0.1:8123/index.html';
const oldKeys = ['the-fantasy-version-2-6-save', 'the-fantasy-version-2-6-settings', 'the-fantasy-version-2-6-achievements', 'the-fantasy-v26-guide-seen', 'fantasy-v26-name', 'the-fantasy-version-2-3-save', 'the-fantasy-version-2-3-settings',
  'the-fantasy-version-2-3-achievements', 'the-fantasy-version-2-4-save',
  'the-fantasy-version-2-settings', 'the-fantasy-version-2-achievements',
  'the-fantasy-v23-guide-seen', 'fantasy-v23-name'];
(async () => {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const errors = [];
  const report = { campaignTransitions: [], independentStorage: false, saveResume: false,
    offlineSprites: 0, offlineAtlases: 0, fileLaunch: false, errors };
  try {
    const context = await browser.newContext({ viewport: { width: 1280, height: 800 } });
    const page = await context.newPage();
    page.on('pageerror', e => errors.push(String(e)));
    await page.goto(url);
    await page.evaluate(async oldKeys => {
      for (const key of oldKeys) localStorage.setItem(key, 'legacy-sentinel');
      localStorage.setItem('the-fantasy-version-2-7-settings', JSON.stringify({ language: 'fr', music: false, motion: false, volume: 0 }));
      localStorage.setItem('the-fantasy-v27-guide-seen', 'true');
      await navigator.serviceWorker.ready;
    }, oldKeys);
    await page.reload();
    await page.waitForFunction(() => !!navigator.serviceWorker.controller);
    await page.locator('[data-action="play"]').click();
    await page.locator('[data-chapter="1"]').click();
    await page.locator('[data-class="chevalier"]').click();
    await page.locator('#hero-name').fill('Fusion');
    await page.locator('[data-action="start"]').click();
    await page.evaluate(() => {
      // Controlled end-of-chapter fixture exercises the real transition and persistence code.
      state.hero.level = 7; state.hero.xp = 440; state.hero.skillPoints = 2;
      state.hero.skills = { blade: 1, guardian: 1, alchemy: 1 };
      state.hero.inventory = [{ id: 'merge-sword', kind: 'weapon', bonus: 4, rarity: 'rare', equipped: true, effect: 'crit', effectValue: 5 }];
      recalculateHeroStats();
      state.hero.hp = Math.max(1, state.hero.maxHp - 12); state.hero.potions = 1;
      state.scene = state.scenes.length; state.finalChoice = 'no';
      recordChapterCompletion(); saveGame(); renderGame();
    });
    for (const chapter of [2, 3]) {
      const before = await page.evaluate(() => structuredClone(state.hero));
      await page.locator('[data-action="campaign"]').click();
      const after = await page.evaluate(() => ({ chapter: state.chapter, scene: state.scene, hero: structuredClone(state.hero) }));
      assert.equal(after.chapter, chapter); assert.equal(after.scene, 0);
      for (const key of ['name', 'classId', 'level', 'xp', 'skillPoints', 'skills', 'specializations', 'inventory', 'equipment'])
        assert.deepEqual(after.hero[key], before[key], 'Campaign must preserve ' + key);
      assert.ok(after.hero.hp > before.hp, 'Camp heals the hero');
      assert.equal(after.hero.potions, before.potions + 1, 'Camp restores a potion');
      report.campaignTransitions.push(chapter);
      if (chapter === 2) await page.evaluate(() => {
        state.hero.hp = Math.max(1, state.hero.maxHp - 12); state.hero.potions = 1;
        state.scene = state.scenes.length; state.finalChoice = 'yes';
        recordChapterCompletion(); saveGame(); renderGame();
      });
    }
    await page.evaluate(() => { state.scene = 80; startBattle('boss'); saveGame(); renderGame(); });
    await page.locator('.enemy-portrait img').evaluate(img => img.decode());
    assert.match(await page.locator('.enemy-portrait img').getAttribute('src'), /fenrir\.png$/);
    const beforeReload = await page.evaluate(() => structuredClone(state.hero));
    await page.reload();
    await page.locator('[data-action="play"]').click();
    await page.locator('[data-action="continue"]').click();
    assert.deepEqual(await page.evaluate(() => structuredClone(state.hero)), beforeReload);
    assert.equal(await page.evaluate(() => state.chapter), 3);
    assert.match(await page.locator('.enemy-portrait img').getAttribute('src'), /fenrir\.png$/);
    report.saveResume = true;
    assert.ok(await page.evaluate(keys => keys.every(key => localStorage.getItem(key) === 'legacy-sentinel'), oldKeys));
    report.independentStorage = true;
    // Never load the remaining art online in this context: this checks the install precache.
    await context.setOffline(true);
    await page.reload();
    await page.locator('[data-action="play"]').click();
    await page.locator('[data-action="continue"]').click();
    const files = JSON.parse(fs.readFileSync(path.join(root, 'assets/enemies/sprites/manifest.json'), 'utf8')).sprites.map(s => 'assets/enemies/sprites/' + s.file);
    files.push('assets/scenery/forest-village.png', 'assets/scenery/ruins-north.png');
    for (const directory of ['assets/heroes','assets/atlases','assets/backgrounds/v27']) files.push(...fs.readdirSync(path.join(root,directory)).filter(n=>n.endsWith('.png')).map(n=>directory+'/'+n));
    const images = await page.evaluate(async files => Promise.all(files.map(async src => {
      const img = new Image(); img.src = src; await img.decode();
      return { src, width: img.naturalWidth, height: img.naturalHeight };
    })), files);
    assert.ok(images.every(img => img.width > 0 && img.height > 0));
    report.offlineSprites = 40; report.offlineAtlases = 7; report.offlineBackgrounds = 14;
    await page.screenshot({ path: path.join(resultsRoot, 'merge-2.7-offline.png') });
    await context.close();
    const fileContext = await browser.newContext({ serviceWorkers: 'block' });
    const local = await fileContext.newPage(); local.on('pageerror', e => errors.push(String(e)));
    await local.goto(pathToFileURL(path.join(root, 'index.html')).href);
    assert.match(await local.title(), /Version 2\.7/);
    await local.locator('[data-action="play"]').click();
    await local.locator('[data-chapter="1"]').click();
    await local.locator('[data-class="sorcier"]').click();
    await local.locator('[data-action="start"]').click();
    await local.locator('[data-tutorial-close]').last().click();
    await local.evaluate(() => { state.scene = 10; startBattle('boss'); renderGame(); });
    await local.locator('.enemy-portrait img').evaluate(img => img.decode());
    assert.equal(await local.locator('.arena-scenery .scene-prop').count() > 0, true);
    report.fileLaunch = true;
    assert.deepEqual(errors, []);
    fs.writeFileSync(path.join(resultsRoot, 'merge-2.7-report.json'), JSON.stringify(report, null, 2) + '\n');
    console.log(JSON.stringify(report, null, 2));
  } finally { await browser.close(); }
})().catch(e => { console.error(e); process.exitCode = 1; });
