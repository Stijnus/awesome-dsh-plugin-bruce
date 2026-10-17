/** Market-owned discovery fields; package identity and install evidence stay untouched. */
export function applyDiscovery(plugins, ranks) {
  const categories = {}
  const labels = {
    npm: { title: { zh: 'npm 包', en: 'npm package' } },
    git: { title: { zh: 'Git 源码包', en: 'Git bundle' } },
  }
  const sortKeys = {
    stars: { title: { zh: 'GitHub Star 数', en: 'GitHub stars' }, order: 'desc' },
    repositoryUpdated: { title: { zh: '仓库更新时间', en: 'Repository updated' }, order: 'desc' },
  }
  for (const plugin of plugins) {
    const rank = ranks.get(plugin.name), row = rank.row ?? {}
    if (row.category) categories[row.category] = {
      title: { zh: row.category_zh || row.category, en: row.category_en || row.category },
    }
    const updated = Math.floor(Date.parse(row.pushed_at) / 1000)
    plugin.metadata = {
      ...(row.category ? { category: row.category } : {}),
      keywords: [...new Set([...(plugin.metadata?.keywords ?? []), ...(row.packages?.tasks ?? [])])],
      labels: [...new Set(plugin.versions.map(version => version.source.type))],
      sortKeys: {
        ...(rank.stars >= 0 ? { stars: rank.stars } : {}),
        ...(Number.isFinite(updated) && updated >= 0 ? { repositoryUpdated: updated } : {}),
      },
    }
  }
  return { categories, labels, sortKeys }
}
