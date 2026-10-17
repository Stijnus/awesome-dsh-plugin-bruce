import { test } from 'node:test'
import assert from 'node:assert/strict'
import { parseMarketIndex, marketInstallTarget } from '@deepseek-ai/dsh-plugin-market-index'
import { generateIndex, npmTarget, projectPackage } from './generate.mjs'

const metadata = (name = 'demo') => ({
  'dist-tags': { latest: '1.2.3' }, time: { '1.2.3': '2026-10-01T00:00:00Z' },
  versions: { '1.2.3': { name, version: '1.2.3', description: 'Demo bundle',
    dsh: { bundle: { patch: './cordis.patch.yml' } }, engines: { dsh: '>=0.2.1-alpha.5 <0.3.0' } } },
})

test('official index pins registry tags to manifest versions and preserves host requirements', () => {
  const { plugin, diagnostics } = projectPackage('demo', ['latest', '1.2.3'], metadata())
  assert.deepEqual(diagnostics, [])
  const index = parseMarketIndex({ format: 1, title: 'Test', plugins: [plugin] }, 'https://example.com/index.json')
  assert.equal(index.plugins[0].versions.length, 1)
  const version = index.plugins[0].versions[0]
  assert.equal(version.publishTimestamp, 1790812800)
  assert.equal(version.engines.dsh, '>=0.2.1-alpha.5 <0.3.0')
  assert.deepEqual(marketInstallTarget('demo', version), { spec: 'demo@1.2.3', registry: 'https://registry.npmjs.org/' })
})

test('missing evidence is excluded rather than assigned fabricated compatibility or dates', () => {
  for (const alter of [
    p => { delete p.versions['1.2.3'].engines },
    p => { p.versions['1.2.3'].engines.dsh = 'workspace:*' },
    p => { delete p.versions['1.2.3'].dsh },
    p => { delete p.time['1.2.3'] },
    p => { p.versions['1.2.3'].name = 'other' },
  ]) {
    const p = metadata(); alter(p)
    const result = projectPackage('demo', ['latest'], p)
    assert.equal(result.plugin, undefined)
    assert.equal(result.diagnostics.length, 1)
  }
})

test('generation deduplicates npm targets, skips Git and manual instructions, and reports registry failures', async () => {
  const calls = []
  const result = await generateIndex({ schema_version: 2, entries: [
    { packages: { mode: 'command', targets: [{ install: 'demo' }, { install: 'demo@1.2.3' }, { install: 'https://github.com/owner/demo#main' }, { install: 'missing' }] } },
    { packages: { mode: 'manual', targets: [{ install: 'do-not-install' }] } },
  ] }, async name => { calls.push(name); if (name === 'missing') throw new Error('Registry HTTP 404'); return metadata(name) })
  assert.deepEqual(calls.sort(), ['demo', 'missing'])
  assert.equal(result.index.plugins.length, 1)
  assert.equal(result.diagnostics.length, 2)
  for (const spec of ['npm install demo', 'demo;id', 'file:./demo', 'git+https://github.com/a/b', 'demo@^1.0.0']) assert.equal(npmTarget(spec), null)
})


test('publication preserves existing data on network failure, empty output or a collapsed candidate', async () => {
  const { assertPublishable } = await import('./policy.mjs')
  const index = n => ({ plugins: Array.from({ length: n }, () => ({})) })
  assert.throws(() => assertPublishable({ index: index(10), fetchFailures: 1 }), /Registry lookup failed/)
  assert.throws(() => assertPublishable({ index: index(0) }), /No eligible/)
  assert.throws(() => assertPublishable({ index: index(7) }, index(10)), /collapsed/)
  assert.doesNotThrow(() => assertPublishable({ index: index(8) }, index(10)))
})
