import { test } from 'node:test'
import assert from 'node:assert/strict'
import {
  parseMarketIndex,
  marketInstallTarget,
} from '@deepseek-ai/dsh-plugin-market-index'
import { generateIndex, npmTarget, projectPackage } from './generate.mjs'

const metadata = (name = 'demo') => ({
  'dist-tags': { latest: '1.2.3' },
  time: { '1.2.3': '2026-10-01T00:00:00Z' },
  versions: {
    '1.2.3': {
      name,
      version: '1.2.3',
      description: 'Demo bundle',
      dsh: { bundle: { patch: './cordis.patch.yml' } },
      engines: { dsh: '>=0.2.1-alpha.5 <0.3.0' },
    },
  },
})

test('official index pins registry tags to manifest versions and preserves host requirements', () => {
  const { plugin, diagnostics } = projectPackage(
    'demo',
    ['latest', '1.2.3'],
    metadata(),
  )
  assert.deepEqual(diagnostics, [])
  const index = parseMarketIndex(
    { format: 1, title: 'Test', plugins: [plugin] },
    'https://example.com/index.json',
  )
  assert.equal(index.plugins[0].versions.length, 1)
  const version = index.plugins[0].versions[0]
  assert.equal(version.publishTimestamp, 1790812800)
  assert.equal(version.engines.dsh, '>=0.2.1-alpha.5 <0.3.0')
  assert.deepEqual(marketInstallTarget('demo', version), {
    spec: 'demo@1.2.3',
    registry: 'https://registry.npmjs.org/',
  })
})

test('missing evidence is excluded rather than assigned fabricated compatibility or dates', () => {
  for (const alter of [
    (p) => {
      delete p.versions['1.2.3'].engines
    },
    (p) => {
      p.versions['1.2.3'].engines.dsh = 'workspace:*'
    },
    (p) => {
      delete p.versions['1.2.3'].dsh
    },
    (p) => {
      delete p.time['1.2.3']
    },
    (p) => {
      p.versions['1.2.3'].name = 'other'
    },
  ]) {
    const p = metadata()
    alter(p)
    const result = projectPackage('demo', ['latest'], p)
    assert.equal(result.plugin, undefined)
    assert.equal(result.diagnostics.length, 1)
  }
})

test('generation deduplicates npm targets, processes Git and skips manual instructions, and reports registry failures', async () => {
  const calls = []
  const result = await generateIndex(
    {
      schema_version: 2,
      entries: [
        {
          packages: {
            mode: 'command',
            targets: [
              { install: 'demo' },
              { install: 'demo@1.2.3' },
              { install: 'https://github.com/owner/demo#main' },
              { install: 'missing' },
            ],
          },
        },
        {
          packages: {
            mode: 'manual',
            targets: [{ install: 'do-not-install' }],
          },
        },
      ],
    },
    async (name) => {
      calls.push(name)
      if (name === 'missing') throw new Error('Registry HTTP 404')
      return metadata(name)
    },
    async () => ({
      plugins: [],
      evidence: [],
      diagnostics: [
        { code: 'invalid_host_range', status: 'excluded', reason: 'fixture' },
      ],
    }),
  )
  assert.deepEqual(calls.sort(), ['demo', 'missing'])
  assert.equal(result.index.plugins.length, 1)
  assert.equal(result.diagnostics.length, 2)
  for (const spec of [
    'npm install demo',
    'demo;id',
    'file:./demo',
    'git+https://github.com/a/b',
    'demo@^1.0.0',
  ])
    assert.equal(npmTarget(spec), null)
})

test('publication preserves existing data on network failure, empty output or a collapsed candidate', async () => {
  const { assertPublishable } = await import('./policy.mjs')
  const index = (n) => ({ plugins: Array.from({ length: n }, () => ({})) })
  assert.throws(
    () => assertPublishable({ index: index(10), fetchFailures: 1 }),
    /Source lookup failed/,
  )
  assert.throws(() => assertPublishable({ index: index(0) }), /No eligible/)
  assert.throws(
    () => assertPublishable({ index: index(7) }, index(10)),
    /collapsed/,
  )
  assert.doesNotThrow(() => assertPublishable({ index: index(8) }, index(10)))
})

test('pinned upstream file readers match their recorded SHA-256', async () => {
  const { readFile } = await import('node:fs/promises')
  const { createHash } = await import('node:crypto')
  const record = JSON.parse(
    await readFile(new URL('./vendor/upstream.json', import.meta.url), 'utf8'),
  )
  for (const [name, hash] of Object.entries(record.files))
    assert.equal(
      createHash('sha256')
        .update(await readFile(new URL(`./vendor/${name}`, import.meta.url)))
        .digest('hex'),
      hash,
    )
})

test('npm tarball verification checks integrity, identity and declared compatibility', async () => {
  const { createServer } = await import('node:http')
  const { mkdtemp, mkdir, writeFile, readFile, rm } = await import(
    'node:fs/promises'
  )
  const { tmpdir } = await import('node:os')
  const { join } = await import('node:path')
  const { execFileSync } = await import('node:child_process')
  const { createHash } = await import('node:crypto')
  const { verifyNpmPlugin } = await import('./npm.mjs')
  const dir = await mkdtemp(join(tmpdir(), 'market-npm-test-'))
  let server
  try {
    const p = metadata(),
      manifest = p.versions['1.2.3']
    await mkdir(join(dir, 'package'))
    await writeFile(join(dir, 'package/package.json'), JSON.stringify(manifest))
    execFileSync('tar', ['-czf', join(dir, 'test.tgz'), '-C', dir, 'package'])
    const bytes = await readFile(join(dir, 'test.tgz'))
    server = createServer((req, res) => {
      res.end(bytes)
    })
    await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve))
    manifest.dist = {
      tarball: `http://127.0.0.1:${server.address().port}/test.tgz`,
      integrity:
        'sha512-' + createHash('sha512').update(bytes).digest('base64'),
    }
    const { plugin } = projectPackage('demo', ['latest'], p)
    assert.equal((await verifyNpmPlugin(plugin, p)).plugin.name, 'demo')
    const bad = structuredClone(plugin)
    bad.versions[0].engines.dsh = '*'
    await assert.rejects(verifyNpmPlugin(bad, p), /differ/)
    manifest.dist.integrity = 'sha512-' + Buffer.alloc(64).toString('base64')
    await assert.rejects(verifyNpmPlugin(plugin, p), /integrity/)
  } finally {
    if (server) await new Promise((resolve) => server.close(resolve))
    await rm(dir, { recursive: true, force: true })
  }
})


test('size policy excludes an oversized package but keeps integrity and network errors fatal', async () => {
  for (const [message, excluded] of [
    ['demo@1.2.3: tarball exceeds 67108864 bytes', true],
    ['unpacked tarball exceeds 67108864 bytes', true],
    ['demo@1.2.3: integrity mismatch', false],
    ['fetch failed', false],
  ]) {
    const result = await generateIndex(
      { schema_version: 2, entries: [{ packages: {
        mode: 'command', targets: [{ install: 'demo' }],
      } }] },
      async () => metadata(),
      undefined,
      async () => { throw new Error(message) },
    )
    assert.equal(result.index.plugins.length, 0)
    assert.equal(result.fetchFailures, excluded ? 0 : 1)
    assert.equal(result.diagnostics[0].code, excluded ? 'package_size_limit' : 'npm_fetch_failed')
    assert.equal(result.diagnostics[0].status, excluded ? 'excluded' : 'error')
  }
})


test('default order mixes npm and Git by repository stars with stable repository and package ties', async () => {
  const row = (repo, stars, install) => ({ full_name: repo, stargazers_count: stars,
    packages: { mode: 'command', targets: [{ install }] } })
  const result = await generateIndex({ schema_version: 2, entries: [
    row('z/low', 1, 'low'), row('b/tie', 10, 'tie-b'),
    row('a/tie', 10, 'tie-z'), row('a/tie', 10, 'tie-a'),
    row('g/high', 100, 'https://github.com/g/high#main'),
    row('u/unknown', undefined, 'unknown'),
  ], featured: { entries: [row('z/low', 999, 'low')] } },
  async name => metadata(name),
  async () => ({ plugins: [projectPackage('git-high', ['latest'], metadata('git-high')).plugin],
    evidence: [], diagnostics: [] }))
  assert.deepEqual(result.index.plugins.map(p => p.name),
    ['git-high', 'tie-a', 'tie-z', 'tie-b', 'low', 'unknown'])
})
