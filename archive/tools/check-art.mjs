/* Click through the game until combat begins; verify the actual portrait load. */
export default async function run(page) {
  const errors = [];
  page.on("pageerror", (error) => errors.push(String(error)));
  const click = async (selector) => {
    const target = page.locator(selector).first();
    if ((await target.count()) === 0) return false;
    await target.click();
    await page.waitForTimeout(280);
    return true;
  };
  if (await page.locator("#setting-language").count()) {
    await page.locator("#setting-language").selectOption("fr");
    await click("[data-action=apply-settings]");
    await page.waitForTimeout(300);
    await page.locator("[data-close]").click().catch(() => {});
    await page.locator("[data-action=back]").click().catch(() => {});
  }
  if (await page.locator("[data-action=play]").count()) await click("[data-action=play]");
  await click('[data-chapter="1"]');
  await click('[data-class="sorcier"]');
  await click('[data-action="start"]');
  for (let i = 0; i < 24 && !(await page.locator(".enemy-portrait img").count()); i += 1) {
    if (!(await click('[data-action="yes"]'))) break;
  }
  const img = page.locator(".enemy-portrait img").first();
  const portrait = (await img.count()) ? await img.evaluate((node) => ({src:node.getAttribute("src"),complete:node.complete,width:node.naturalWidth,height:node.naturalHeight})) : null;
  if (portrait?.src) await page.locator(".enemy-portrait").scrollIntoViewIfNeeded();
  return {portrait,errors,scene:await page.locator("#current-scene").innerText().catch(()=>"")};
}
