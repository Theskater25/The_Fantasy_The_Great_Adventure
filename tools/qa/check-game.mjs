/* Minimal smoke test: load all data and ensure the browser app mounts. */
export default async function run(page) {
  const errors = [];
  const failures = [];
  page.on("pageerror", (error) => errors.push(String(error)));
  const response = await page.goto("http://localhost:8123/index.html", { waitUntil: "load" });
  const status = response?.status();
  const title = await page.title();
  const root = await page.locator("#app").count();
  const scripts = await page.locator("script[src]").evaluateAll((nodes) => nodes.map((node) => node.getAttribute("src")));
  for (const script of scripts) {
    const result = await page.request.get(new URL(script, page.url()).toString());
    if (!result.ok()) failures.push({ script, status: result.status() });
  }
  return { status, title, root, scripts: scripts.length, failedScripts: failures, errors };
}
