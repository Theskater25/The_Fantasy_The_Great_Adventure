/* Browser integration: unique art for all enemies, localized names, responsive
   sprite bounds, and an actual combat action. Uses an isolated browser profile. */
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const http = require('node:http');
const { chromium } = require(process.env.TF_PLAYWRIGHT_MODULE || 'playwright');
const { gameRoot: root, resultsRoot } = require('./project.cjs');
const manifest = JSON.parse(fs.readFileSync(path.join(root, 'assets/enemies/sprites/manifest.json'), 'utf8')).sprites;
const mime = { '.html': 'text/html', '.js': 'application/javascript', '.css': 'text/css', '.png': 'image/png', '.svg': 'image/svg+xml', '.json': 'application/json', '.mp3': 'audio/mpeg' };
const server = http.createServer((req, res) => {
  const relative = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
  const file = path.resolve(root, '.' + (relative === '/' ? '/index.html' : relative));
  if (!file.startsWith(root + path.sep) || !fs.existsSync(file) || !fs.statSync(file).isFile()) { res.writeHead(404); res.end(); return; }
  res.setHeader('Content-Type', mime[path.extname(file)] || 'application/octet-stream');
  fs.createReadStream(file).pipe(res);
});

(async () => {
  let browser;
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  try {
    browser = await chromium.launch({ channel: 'chrome', headless: true });
    const page = await browser.newPage({ viewport: { width: 1280, height: 720 }, deviceScaleFactor: 1 });
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.addInitScript(() => localStorage.setItem('the-fantasy-version-2-7-settings', JSON.stringify({ language: 'fr', display: 'standard', music: false, motion: false, volume: 0 })));
    await page.goto(`http://127.0.0.1:${server.address().port}/`);
    await page.locator('[data-action="play"]').click();
    await page.locator('[data-chapter="1"]').click();
    await page.locator('[data-class="sorcier"]').click();
    await page.locator('#hero-name').fill('Avel');
    await page.locator('[data-action="start"]').click();

    await page.locator("[data-tutorial-close]").last().click();

    const mapping = await page.evaluate(manifest => {
      const content = window.TF_DEBUG.getContent();
      const all = [...content.basicEnemies, ...content.bosses, ...content.treasureBosses, ...content.nordicBosses];
      const failures = [];
      let localizedChecks = 0;
      for (const enemy of all) {
        const sprite = manifest.find(item => item.name === enemy.name);
        const expected = `assets/enemies/sprites/${sprite?.file}`;
        if (window.TF_DEBUG.getEnemyAsset(enemy) !== expected) failures.push(enemy.name);
        for (const translation of Object.values(window.TF_DEBUG.getTranslations())) {
          const i = content.basicEnemies.findIndex(item => item.name === enemy.name);
          const translated = i >= 0
            ? translation.content?.basicEnemies?.[i]?.target || translation.content?.enemies?.[i] || enemy.name
            : translation.content?.bossNames?.find(item => item.source === enemy.name)?.target || enemy.name;
          if (window.TF_DEBUG.getEnemyAsset({ ...enemy, name: translated, sourceName: enemy.name }) !== expected) failures.push(translated);
          localizedChecks++;
        }
      }
      return { count: all.length, unique: new Set(all.map(window.TF_DEBUG.getEnemyAsset)).size, localizedChecks, failures };
    }, manifest);
    assert.equal(mapping.count, 20);
    assert.equal(mapping.unique, 20, 'Every boss and enemy needs its own asset');
    assert.deepEqual(mapping.failures, []);

    const show = async (name, decor = null) => {
      await page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))));
      await page.evaluate(({ name, decor }) => {
        const content = window.TF_DEBUG.getContent();
        const groups = [content.basicEnemies, content.bosses, content.treasureBosses, content.nordicBosses];
        const groupIndex = groups.findIndex(group => group.some(enemy => enemy.name === name));
        const template = groups[groupIndex].find(enemy => enemy.name === name);
        state.chapter = Math.max(1, groupIndex);
        state.scenes = createScenes(getChapter(state.chapter));
        state.scene = template.type === 'boss' ? [0, 10, 15, 20][groupIndex] * (groups[groupIndex].indexOf(template) + 1) : 0;
        if (decor) state.scenes[template.type === 'boss' ? state.scene - 1 : state.scene].decor = decor;
        state.enemy = { ...template, hp: template.hp, maxHp: template.hp };
        state.battle = { kind: template.type === 'boss' ? 'boss' : 'event', turn: 1, phase: template.type === 'boss' ? 1 : 0, phaseStartedTurn: 0, adaptation: null, mirrorGuard: false, potionWeakened: false, skillUsed: false, enemyFrozen: 0, enemyStun: 0, playerInvincible: 0, playerAtkMult: 1, playerBuffAtk: 0, playerDefReducePct: 0, playerDefReduceTurns: 0 };
        state.hero.hp = state.hero.maxHp;
        state.completed = false; state.gameOver = false; state.log = [];
        window.renderGame();
      }, { name, decor });
      await page.locator('.enemy-portrait img').evaluate(img => img.decode());
    };
    const screenshotDir = resultsRoot;
    fs.mkdirSync(screenshotDir, { recursive: true });
    const screenshots = [];
    const sceneryManifest = JSON.parse(fs.readFileSync(path.join(root, 'assets/scenery/manifest.json'), 'utf8').replace(/^\uFEFF/, ''));
    await page.evaluate(async atlases => {
      await Promise.all(Object.values(atlases).map(atlas => {
        const image = new Image(); image.src = `assets/scenery/${atlas.file}`;
        return image.decode().then(() => {
          if (image.naturalWidth !== atlas.width || image.naturalHeight !== atlas.height) throw new Error('Wrong atlas size');
        });
      }));
    }, sceneryManifest.atlases);
    let rendered = 0;
    for (const viewport of [{ width: 1280, height: 720 }, { width: 375, height: 812 }, { width: 844, height: 390 }]) {
      await page.setViewportSize(viewport);
      for (const sprite of manifest) {
        await show(sprite.name);
        const bounds = await page.locator('.enemy-portrait img').evaluate(img => {
          const image = img.getBoundingClientRect(), box = img.parentElement.getBoundingClientRect();
          return { naturalWidth: img.naturalWidth, naturalHeight: img.naturalHeight, rendering: getComputedStyle(img).imageRendering,
            inside: image.left >= box.left - 1 && image.right <= box.right + 1 && image.top >= box.top - 1 && image.bottom <= box.bottom + 1,
            noPageOverflow: document.documentElement.scrollWidth <= innerWidth };
        });
        assert.equal(bounds.naturalWidth, sprite.width, sprite.id);
        assert.equal(bounds.naturalHeight, sprite.height, sprite.id);
        assert.equal(bounds.rendering, 'pixelated');
        assert.ok(bounds.inside && bounds.noPageOverflow, `${sprite.id} overflows at ${viewport.width}x${viewport.height}`);
        rendered++;
        if ((viewport.width === 1280 && ['raiders', 'jack-chistophe', 'azharkan', 'fenrir'].includes(sprite.id)) || (viewport.width !== 1280 && sprite.id === 'jack-chistophe')) {
          const file = `sprites-2.7-${sprite.id}-${viewport.width}.png`;
          await page.screenshot({ path: path.join(screenshotDir, file), fullPage: true });
          screenshots.push(file);
        }
      }
    }
    const environments = [
      ['village', 'zombie', 'Village'], ['forest', 'goblin', 'Forêt'], ['graveyard', 'jack-chistophe', 'Cimetière'],
      ['ruins', 'prince-des-abysses', 'Donjon'], ['forge', 'forgeron-infernal', 'Forge'],
      ['fjord', 'fenrir', 'Fjord'], ['shrine', 'eivor', 'Autel'],
    ];
    const usedProps = new Set();
    let sceneryRenders = 0;
    for (const viewport of [{ width: 1280, height: 720 }, { width: 375, height: 812 }, { width: 844, height: 390 }]) {
      await page.setViewportSize(viewport);
      for (const [theme, spriteId, decor] of environments) {
        await show(manifest.find(item => item.id === spriteId).name, decor);
        const result = await page.locator('.enemy-stage').evaluate(stage => ({
          theme: stage.dataset.environment,
          hidden: stage.querySelector('.arena-scenery').getAttribute('aria-hidden'),
          pointer: getComputedStyle(stage.querySelector('.arena-scenery')).pointerEvents,
          props: [...stage.querySelectorAll('.scene-prop')].map(prop => ({ id: prop.dataset.prop, image: getComputedStyle(prop).backgroundImage, rendering: getComputedStyle(prop).imageRendering })),
          noOverflow: document.documentElement.scrollWidth <= innerWidth,
        }));
        assert.equal(result.theme, theme);
        assert.equal(result.hidden, 'true');
        assert.equal(result.pointer, 'none');
        assert.ok(result.noOverflow);
        for (const prop of result.props) {
          assert.ok(sceneryManifest.props.some(item => item.id === prop.id));
          assert.ok(prop.image.includes('assets/scenery/'));
          assert.equal(prop.rendering, 'pixelated');
          usedProps.add(prop.id);
        }
        sceneryRenders++;
        if (viewport.width === 1280 || theme === 'graveyard') {
          const file = `scenery-2.7-${theme}-${viewport.width}.png`;
          await page.screenshot({ path: path.join(screenshotDir, file), fullPage: true });
          screenshots.push(file);
        }
      }
    }
    assert.equal(usedProps.size, 18, 'All supplied scenery props should be used');
    await page.setViewportSize({ width: 1280, height: 720 });
    await show(manifest.find(item => item.id === 'yhorm').name);
    const before = await page.evaluate(() => state.enemy.hp);
    await page.locator('[data-action="attack"]').click();
    await page.locator('.enemy-portrait img').evaluate(img => img.decode());
    assert.ok(await page.evaluate(before => state.enemy.hp < before && state.battle.turn === 2, before), 'Attack must still update combat');
    assert.deepEqual(errors, []);
    const report = { mapping, responsiveRenders: rendered, sceneryRenders, sceneryProps: usedProps.size, combatAction: 'passed', errors, screenshots };
    fs.writeFileSync(path.join(screenshotDir, 'sprites-2.7-report.json'), JSON.stringify(report, null, 2) + '\n');
    console.log(JSON.stringify(report, null, 2));
  } finally {
    if (browser) await browser.close();
    server.close();
  }
})().catch(error => { console.error(error); process.exitCode = 1; });
