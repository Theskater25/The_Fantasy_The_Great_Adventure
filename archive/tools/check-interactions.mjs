/* Smoke-test language selection, new-game flow and a No answer in the real UI. */
export default async function run(page) {
  const errors = [];
  page.on("pageerror", (error) => errors.push(String(error)));
  const click = async (selector) => {
    const target = page.locator(selector).first();
    if (!(await target.count())) return false;
    await target.click();
    await page.waitForTimeout(180);
    return true;
  };
  await click('[data-action="settings"]');
  await page.locator("#setting-language").selectOption("es");
  await click('[data-action="apply-settings"]');
  const languageLabel = await page.locator("#setting-language").count();
  await page.locator("[data-close]").click().catch(() => { });
  await click('[data-action="back"]');
  await click('[data-action="play"]');
  await click('[data-chapter="1"]');
  await click('[data-class="sorcier"]');
  await click('[data-action="start"]');
  const hpBefore = await page.locator(".stat-line strong").first().innerText().catch(() => "");
  await click('[data-action="no"]');
  const hpAfter = await page.locator(".stat-line strong").first().innerText().catch(() => "");
  const scene = await page.locator("#current-scene").innerText().catch(() => "");
  return { languageSettingsPresent: languageLabel > 0, hpBefore, hpAfter, scene, errors };
}
