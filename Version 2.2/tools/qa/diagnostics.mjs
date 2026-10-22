/* Diagnostic : capture les erreurs de chargement et l'état des globals. */
export default async function run(page) {
  const errors = [];
  const gone = [];
  page.on("pageerror", (e) => errors.push(String(e)));
  await page.reload({ waitUntil: "load" });
  await page.waitForTimeout(1200);
  const state = await page.evaluate(() => ({
    action: typeof window.__tfAction,
    contenu: typeof window.TF_CONTENT,
    etat: typeof window.state,
    appHtml: document.querySelector("#app")?.innerHTML.length,
    scripts: Array.from(document.scripts).map((s) => s.getAttribute("src")),
  }));
  return { state, errors };
}
