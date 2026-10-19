import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import sharp from 'sharp'
import { parseMarketIndex } from '@deepseek-ai/dsh-plugin-market-index'
import { inlineIcon } from './icons.mjs'
import { applyPresentation, displayFingerprint } from './presentation.mjs'
import { applyDiscovery } from './discovery.mjs'

test('large package artwork stays visible as a valid inline icon with a recorded input digest', async () => {
  const input = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="256" height="256"><!--${'artwork '.repeat(5000)}--><rect width="256" height="256" fill="#357aff"/></svg>`)
  const display = { icon: 'icons/large.svg' }, diagnostics = []
  await inlineIcon(display, { bytes: input, path: 'icons/large.svg' }, detail => diagnostics.push(detail))
  assert.match(display.icon, /^data:image\/webp;base64,/)
  const bytes = Buffer.from(display.icon.split(',')[1], 'base64')
  assert.ok(bytes.length <= 32768)
  const image = await sharp(bytes).metadata()
  assert.equal(image.width, 96)
  assert.equal(image.height, 96)
  assert.equal(diagnostics[0].inputBytes, input.length)
  assert.match(diagnostics[0].inputSha256, /^[a-f0-9]{64}$/)
  parseMarketIndex({ format: 1, title: 'Test', plugins: [{ name: 'demo', icon: display.icon,
    versions: [{ version: '1.0.0', publishTimestamp: 0, source: { type: 'npm' } }] }] }, 'https://example.com/index.json')
  await inlineIcon(display, { bytes: Buffer.from('not an image') }, detail => diagnostics.push(detail))
  assert.equal(display.icon, undefined)
  assert.equal(diagnostics.at(-1).code, 'metadata_warning')
})

test('reviewed translations improve discovery without changing install fields and yield to changed upstream metadata', () => {
  const plugin = { name: 'demo', title: 'demo', description: 'A theme',
    versions: [{ version: '1.0.0', publishTimestamp: 1, engines: { dsh: '0.2.1-rc.2' }, source: { type: 'npm' } }] }
  const record = { displaySha256: displayFingerprint(plugin), title: { en: 'Demo', zh: '示例主题' },
    description: { en: 'A theme', zh: '示例外观主题' }, labels: ['theme'], keywords: ['主题'], evidence: ['fixture'], reviewedVersion: '1.0.0' }
  const before = structuredClone(plugin.versions)
  const changed = structuredClone(plugin)
  changed.description = 'A different tool'
  assert.equal(applyPresentation([changed], { demo: record })[0].code, 'presentation_review_needed')
  assert.equal(changed.title, 'demo')
  assert.equal(applyPresentation([plugin], { demo: record })[0].code, 'presentation_reviewed')
  assert.deepEqual(plugin.versions, before)
  const metadata = applyDiscovery([plugin], new Map([['demo', { stars: 1, row: { category: 'ui-experience', category_zh: '界面与体验' } }]]))
  const index = parseMarketIndex({ format: 1, title: 'Test', metadata, plugins: [plugin] }, 'https://example.com/index.json')
  assert.deepEqual(index.plugins[0].metadata.labels, ['npm', 'theme'])
  assert.ok(index.plugins[0].metadata.keywords.includes('主题'))
  assert.equal(index.metadata.labels.theme.title.zh, '主题外观')
})

test('all reviewed presentation records declare traceable evidence and preserve format-1 text requirements', () => {
  const records = JSON.parse(readFileSync(new URL('./presentation.json', import.meta.url))).plugins
  for (const [name, record] of Object.entries(records)) {
    assert.match(record.displaySha256, /^[a-f0-9]{64}$/)
    assert.ok(record.evidence.length > 0, name)
    for (const field of ['title', 'description']) {
      if (record[field]) {
        assert.ok(record[field].en?.trim(), `${name}: ${field}.en`)
        assert.ok(record[field].zh?.trim(), `${name}: ${field}.zh`)
      }
    }
  }
})
