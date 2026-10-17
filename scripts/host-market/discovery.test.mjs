import { test } from 'node:test'
import assert from 'node:assert/strict'
import { parseMarketIndex } from '@deepseek-ai/dsh-plugin-market-index'
import { applyDiscovery } from './discovery.mjs'
test('official schema preserves localized categories, keywords, labels and sortable facts', () => {
  const plugins = [{ name: 'demo', metadata: { keywords: ['search'] }, versions: [{ version: '1.0.0', publishTimestamp: 1, source: { type: 'npm' } }] }]
  const metadata = applyDiscovery(plugins, new Map([['demo', { stars: 8, row: { category: 'tools', category_zh: '工具', category_en: 'Tools', pushed_at: '2026-10-17T00:00:00Z', packages: { tasks: ['检索', 'search'] } } }]]))
  const index = parseMarketIndex({ format: 1, title: 'Test', metadata, plugins }, 'https://example.com/index.json')
  assert.equal(index.metadata.categories.tools.title.zh, '工具')
  assert.equal(index.metadata.sortKeys.stars.order, 'desc')
  assert.deepEqual(index.plugins[0].metadata.keywords, ['search', '检索'])
  assert.deepEqual(index.plugins[0].metadata.labels, ['npm'])
  assert.equal(index.plugins[0].metadata.sortKeys.stars, 8)
  assert.equal(index.plugins[0].metadata.sortKeys.repositoryUpdated, 1792195200)
  applyDiscovery(plugins, new Map([['demo', { stars: -1, row: {} }]]))
  assert.deepEqual(plugins[0].metadata.sortKeys, {})
  assert.equal(plugins[0].metadata.category, undefined)
})
