/* Start a new game through the real UI and advance to the step-10 boss. */
export default async function run(page) {
  const errors = [];
  page.on("pageerror", (error) => errors.push(String(error)));
  const click = async (selector) => {
    const target = page.locator(selector).first();
    if (!(await target.count())) return false;
    await target.click();
    await page.waitForTimeout(140);
    return true;
  };
  await click('[data-action="play"]');
  await click('[data-chapter="1"]');
  await click('[data-class="sorcier"]');
  await click('[data-action="start"]');
  await page.evaluate(() => { localStorage.setItem("the-fantasy-version-2-settings", JSON.stringify({ language: "fr", display: "standard", music: false, motion: false, volume: 0 })); });
  await page.reload({ waitUntil: "load" });
  await click("[data-action=play]").catch(() => {});
  if (await page.locator("[data-action=continue]").count()) {
    await page.locator("[data-action=continue]").click();
    await page.waitForTimeout(250);
  }
  for (let step = 0; step < 10; step += 1) {
    if (await page.locator(".enemy-portrait img").count()) break;
    await click('[data-action="no"]');
  }
  const image = page.locator(".enemy-portrait img").first();
  const portrait = (await image.count()) ? await image.evaluate((img) => ({src:img.getAttribute("src"),width:img.naturalWidth,height:img.naturalHeight})) : null;
  if (portrait) await page.locator(".enemy-portrait").scrollIntoViewIfNeeded();
  return {portrait,heading:await page.locator(".enemy-readout h3").innerText().catch(()=>""),type:await page.locator(".enemy-readout .eyebrow").innerText().catch(()=>""),errors};
}
