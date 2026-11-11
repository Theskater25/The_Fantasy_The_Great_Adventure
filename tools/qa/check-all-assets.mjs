/* QA: load every known asset URL from the real project directory. */
export default async function run(page) {
  const errors = [];
  page.on("pageerror", (error) => errors.push(String(error)));
  const names = ["zombie", "skeleton", "raider", "goblin", "rat", "jack-chistophe", "yhorm", "lothric", "ilyan", "roi-sans-nom"];
  const results = await page.evaluate(async (names) => {
    const sources = names.flatMap((name) => [`assets/enemies/${name}.svg`, `assets/enemies/${name}-v2.svg`]);
    const load = (src) => new Promise((resolve) => {
      const image = new Image();
      image.onload = () => resolve({ src, ok: true, width: image.naturalWidth, height: image.naturalHeight });
      image.onerror = () => resolve({ src, ok: false });
      image.src = src;
    });
    return Promise.all(sources.map(load));
  }, names);
  return { total: results.length, loaded: results.filter((image) => image.ok).length, failed: results.filter((image) => !image.ok), errors };
}
