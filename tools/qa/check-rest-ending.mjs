/* Verify that ending the run after exhausting rests requires confirmation. */
export default async function run(page) {
  const errors = [];
  page.on("pageerror", (error) => errors.push(String(error)));
  await page.goto("http://localhost:8123/index.html", { waitUntil: "load" });
  await page.evaluate(() => localStorage.clear());
  await page.reload({ waitUntil: "load" });
  await page.locator('[data-action="play"]').click();
  await page.locator('[data-chapter="1"]').click();
  await page.locator('[data-class="sorcier"]').click();
  await page.locator('[data-action="start"]').click();
  for (let index = 0; index < 3; index += 1) await page.locator('[data-action="rest"]').click();
  const beforeOveruse = await page.evaluate(() => ({ count: window.state.restCount, gameOver: window.state.gameOver }));
  await page.locator('[data-action="rest"]').click();
  const confirmationVisible = await page.locator('[role="dialog"]').count() === 1;
  const beforeChoice = await page.evaluate(() => ({ count: window.state.restCount, gameOver: window.state.gameOver }));
  await page.locator('[data-confirm]').click();
  const afterConfirm = await page.evaluate(() => ({ count: window.state.restCount, gameOver: window.state.gameOver, endingReason: window.state.endingReason }));
  return { beforeOveruse, confirmationVisible, beforeChoice, afterConfirm, ending: await page.locator('#current-scene').innerText(), status: await page.locator('.game-status').innerText(), errors };
}
