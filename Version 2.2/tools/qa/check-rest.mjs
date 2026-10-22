/* Verify rests keep the player on the same step, heal, and end the run on overuse. */
export default async function run(page) {
  const errors = [];
  page.on("pageerror", (error) => errors.push(String(error)));
  const click = async (selector) => {
    const el = page.locator(selector).first();
    if (!(await el.count())) return false;
    await el.click();
    await page.waitForTimeout(180);
    return true;
  };
  await page.goto("http://localhost:8123/index.html", { waitUntil: "load" });
  if (await page.locator('#setting-language').count()) {
    await page.locator('#setting-language').selectOption('fr');
    await click('[data-action="apply-settings"]');
    await page.locator('[data-close]').click().catch(() => {});
  }
  await click('[data-action="play"]');
  await click('[data-chapter="1"]');
  await click('[data-class="sorcier"]');
  await click('[data-action="start"]');
  const stepBefore = await page.locator("#current-scene").innerText();
  const hpBefore = Number((await page.locator(".stat-line strong").first().innerText()).split("/")[0]);
  for (let n = 0; n < 3; n += 1) await click('[data-action="rest"]');
  const stepAfterRests = await page.locator("#current-scene").innerText();
  const hpAfterRests = Number((await page.locator(".stat-line strong").first().innerText()).split("/")[0]);
  const restCountLabel = await page.locator("[data-action=rest]").innerText();
  const restDisabled = await page.locator('[data-action="rest"]').isDisabled();
  return {
    sameStep: stepBefore === stepAfterRests,
    restsHealedOrCapped: hpAfterRests >= hpBefore,
    restCountLabel,
    restEnabledAfterLimit: await page.locator("[data-action=rest]").isEnabled(),
    errors,
  };
}
