const path = require('node:path');
const repositoryRoot = path.resolve(__dirname, '../..');
const gameRoot = process.env.TF_GAME_ROOT ? path.resolve(process.env.TF_GAME_ROOT) : path.join(repositoryRoot, 'game');
const resultsRoot = path.join(repositoryRoot, 'tests/results/v2.6');
function gameFile(name) {
  const relative = !name.includes('/') && name.endsWith('.js') && name !== 'service-worker.js' ? `js/${name}` : name;
  return path.join(gameRoot, relative);
}
module.exports = { repositoryRoot, gameRoot, resultsRoot, gameFile };
