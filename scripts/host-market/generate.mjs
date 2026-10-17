/** Build an auditable DSH format-1 index from curated npm targets; never execute packages. */
import { readFile, writeFile, mkdir } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { pathToFileURL } from 'node:url'
import { createHash } from 'node:crypto'
import semver from 'semver'
import { assertPublishable } from './policy.mjs'
import { parseMarketIndex } from '@deepseek-ai/dsh-plugin-market-index'

const REGISTRY = 'https://registry.npmjs.org/'
const INDEX_URL = 'https://bruc3van.com/markets/dsh/index.json'

/** Only registry targets are resolved here. Git requires separate commit/manifest evidence. */
export function npmTarget(spec) {
  if (typeof spec !== 'string') return null
  const match = /^(@[a-z0-9._-]+\/[a-z0-9._-]+|[a-z0-9][a-z0-9._-]*)(?:@([^\s]+))?$/.exec(spec)
  if (!match) return null
  const selector = match[2] ?? 'latest'
  if (!semver.valid(selector) && !/^[a-zA-Z][a-zA-Z0-9._-]*$/.test(selector)) return null
  return { name: match[1], selector }
}

/** Project registry evidence, preserving the author's declared host range verbatim. */
export function projectPackage(name, selectors, packument) {
  const diagnostics = []
  const versions = []
  const wanted = [...new Set(selectors.map(selector => semver.valid(selector) ? selector : packument['dist-tags']?.[selector]))]
  for (const version of wanted) {
    const manifest = packument.versions?.[version]
    const reason = !semver.valid(version) || manifest?.name !== name || manifest.version !== version ? 'missing or mismatched manifest'
      : !manifest.dsh?.bundle?.patch || typeof manifest.dsh.bundle.patch !== 'string' ? 'not a declared DSH bundle'
      : typeof manifest.engines?.dsh !== 'string' || !manifest.engines.dsh.trim() || manifest.engines.dsh.startsWith('workspace:') || !semver.validRange(manifest.engines.dsh) ? 'missing or invalid engines.dsh'
      : !Number.isFinite(Date.parse(packument.time?.[version])) ? 'missing registry publish time' : null
    if (reason) { diagnostics.push({ name, version: version ?? null, reason }); continue }
    versions.push({ version, publishTimestamp: Math.floor(Date.parse(packument.time[version]) / 1000),
      source: { type: 'npm', registry: REGISTRY }, engines: { dsh: manifest.engines.dsh } })
  }
  versions.sort((a, b) => semver.rcompare(a.version, b.version))
  if (!versions.length) return { diagnostics }
  const manifest = packument.versions[versions[0].version]
  const plugin = { name, ...(typeof manifest.description === 'string' && manifest.description.trim() ? { description: manifest.description } : {}), versions }
  // Optional presentation fields are omitted unless their package form is unambiguous.
  if (typeof manifest.author?.name === 'string' && manifest.author.name.trim()) plugin.author = manifest.author.name
  if (typeof manifest.homepage === 'string') {
    try {
      const url = new URL(manifest.homepage)
      if (['http:', 'https:'].includes(url.protocol) && !url.username && !url.password) plugin.homepage = url.href
    } catch { /* Invalid optional presentation metadata is not an install target. */ }
  }
  // Use the actual host validator before accepting even one row.
  parseMarketIndex({ format: 1, title: 'Validation', plugins: [plugin] }, INDEX_URL)
  return { plugin, diagnostics }
}

export async function generateIndex(feed, fetchPackument) {
  if (feed?.schema_version !== 2 || !Array.isArray(feed.entries)) throw new Error('Expected a curated market-v2 feed')
  const targets = new Map()
  const diagnostics = []
  const rows = [...feed.entries, ...(feed.featured?.entries ?? [])]
  for (const row of rows) {
    if (row.packages?.mode !== 'command') continue
    for (const target of row.packages.targets ?? []) {
      const parsed = npmTarget(target.install)
      if (!parsed) { diagnostics.push({ target: target.install, reason: 'requires Git commit evidence or unsupported target' }); continue }
      if (!targets.has(parsed.name)) targets.set(parsed.name, new Set())
      targets.get(parsed.name).add(parsed.selector)
    }
  }
  const entries = [...targets]
  const results = new Array(entries.length)
  let cursor = 0
  await Promise.all(Array.from({ length: Math.min(6, entries.length) }, async () => {
    while (cursor < entries.length) {
      const i = cursor++
      const [name, selectors] = entries[i]
      try { results[i] = projectPackage(name, [...selectors], await fetchPackument(name)) }
      catch (error) { results[i] = { fetchFailed: true, diagnostics: [{ name, reason: error.message }] } }
    }
  }))
  const plugins = results.flatMap(result => result.plugin ? [result.plugin] : [])
  diagnostics.push(...results.flatMap(result => result.diagnostics))
  const index = { format: 1, title: { en: 'DSH Community Market', zh: 'DSH 社区市场' },
    description: { en: 'Verified npm metadata from the curated community catalog. Inclusion is not a security review.', zh: '从社区精选目录核实 npm 元数据；收录不代表安全审查。' }, plugins }
  parseMarketIndex(index, INDEX_URL)
  return { index, diagnostics, candidates: entries.length, fetchFailures: results.filter(result => result.fetchFailed).length }
}

async function main() {
  const [feedPath, outputPath] = process.argv.slice(2)
  if (!feedPath || !outputPath) throw new Error('Usage: node scripts/host-market/generate.mjs <market-v2.json> <output.json>')
  const raw = await readFile(feedPath)
  const evidence = []
  const result = await generateIndex(JSON.parse(raw), async name => {
    const url = `${REGISTRY}${encodeURIComponent(name)}`
    const response = await fetch(url, { redirect: 'error', signal: AbortSignal.timeout(20_000), headers: { accept: 'application/json' } })
    if (!response.ok) throw new Error(`Registry HTTP ${response.status}`)
    const body = await response.text()
    evidence.push({ name, url, sha256: createHash('sha256').update(body).digest('hex'), fetchedAt: new Date().toISOString() })
    return JSON.parse(body)
  })
  await mkdir(dirname(resolve(outputPath)), { recursive: true })
  const serialized = JSON.stringify(result.index, null, 2) + '\n'
  const report = { indexSha256: createHash('sha256').update(serialized).digest('hex'), fetchFailures: result.fetchFailures, generatedAt: new Date().toISOString(), feedSha256: createHash('sha256').update(raw).digest('hex'),
    candidates: result.candidates, included: result.index.plugins.length, diagnostics: result.diagnostics, evidence }
  await writeFile(`${outputPath}.report.json`, JSON.stringify(report, null, 2) + '\n')
  assertPublishable(result)
  await writeFile(outputPath, serialized)
  console.log(`Generated ${result.index.plugins.length}/${result.candidates} npm bundles; ${result.diagnostics.length} diagnostics. ${outputPath}`)
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  main().catch(error => { console.error(error.message); process.exitCode = 1 })
}
