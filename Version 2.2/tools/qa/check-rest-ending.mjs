/* Probe render of the rest-ending state through user actions. */
export default async function run(page) {
  const errors=[];
  page.on("pageerror",e=>errors.push(String(e)));
  await page.evaluate(()=>localStorage.clear());
  await page.goto("http://localhost:8123/index.html",{waitUntil:"load"});
  await page.locator('[data-action="settings"]').click();
  await page.locator('#setting-language').selectOption('fr');
  await page.locator('[data-action="apply-settings"]').click();
  await page.locator('[data-close]').click().catch(()=>{});
  await page.locator('[data-action="back"]').click().catch(()=>{});
  await page.locator('[data-action="play"]').click();
  await page.locator('[data-chapter="1"]').click();
  await page.locator('[data-class="sorcier"]').click();
  await page.locator('[data-action="start"]').click();
  for(let i=0;i<3;i++) await page.locator('[data-action="rest"]').click();
  await page.locator('[data-action="rest"]').click();
  return {ending:await page.locator('#current-scene').innerText(),status:await page.locator('.game-status').innerText(),errors};
}
