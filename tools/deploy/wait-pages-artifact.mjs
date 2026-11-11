// Wait until GitHub exposes the uploaded archive through the artifact API.
const { GITHUB_API_URL = 'https://api.github.com', GITHUB_REPOSITORY, GITHUB_RUN_ID, GITHUB_TOKEN, PAGES_ARTIFACT_NAME } = process.env;
if (![GITHUB_REPOSITORY, GITHUB_RUN_ID, GITHUB_TOKEN, PAGES_ARTIFACT_NAME].every(Boolean)) throw new Error('Missing deployment environment');
const url = `${GITHUB_API_URL}/repos/${GITHUB_REPOSITORY}/actions/runs/${GITHUB_RUN_ID}/artifacts?name=${encodeURIComponent(PAGES_ARTIFACT_NAME)}`;
for (let attempt = 0; attempt < 12; attempt++) {
  const response = await fetch(url, {
    headers: { Authorization: `Bearer ${GITHUB_TOKEN}`, Accept: 'application/vnd.github+json' },
    signal: AbortSignal.timeout(15000),
  });
  if (!response.ok) throw new Error(`Artifact lookup failed: HTTP ${response.status}`);
  const { artifacts = [] } = await response.json();
  const matches = artifacts.filter(item => item.name === PAGES_ARTIFACT_NAME && !item.expired);
  if (matches.length > 1) throw new Error('Multiple deployment artifacts have the expected name');
  if (matches.length === 1) { console.log(`Deployment artifact ready: ${matches[0].id}`); process.exit(0); }
  console.log(`Waiting for deployment artifact (${attempt + 1}/12)`);
  await new Promise(resolve => setTimeout(resolve, 5000));
}
throw new Error('Deployment artifact is still unavailable after one minute');
