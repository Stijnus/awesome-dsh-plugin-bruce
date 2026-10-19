/** Market-owned discovery fields; package identity and install evidence stay untouched. */
export function applyDiscovery(plugins, ranks) {
  const categories = {}
  const labels = {
    npm: { title: { zh: 'npm 包', en: 'npm package' } },
    git: { title: { zh: 'Git 源码包', en: 'Git bundle' } },
  }
  const capabilities = {
    theme: { title: { zh: '主题外观', en: 'Themes' } },
    memory: { title: { zh: '记忆管理', en: 'Memory' } },
    search: { title: { zh: '联网搜索', en: 'Web search' } },
    vision: { title: { zh: '图像理解', en: 'Vision' } },
    teams: { title: { zh: '多 Agent', en: 'Agent teams' } },
    remote: { title: { zh: '远程访问', en: 'Remote access' } },
    provider: { title: { zh: '模型接入', en: 'Model providers' } },
    research: { title: { zh: '研究工具', en: 'Research' } },
    terminal: { title: { zh: '终端界面', en: 'Terminal UI' } },
    skills: { title: { zh: '技能管理', en: 'Skills' } },
  }
  const categoryNames = {
    'multi-agents': '多 Agent 协作',
    'agents-workflows': 'Agent 工作流',
    'media-vision': '设计与视觉',
    'utilities': '实用工具',
  }
  const categoryKeywords = {
    'developer-tools': ['开发工具', '编程', 'developer tools'],
    'ui-experience': ['界面体验', '界面增强', 'user interface'],
    'multi-agents': ['多智能体', '多 Agent', 'multi agent'],
    'integrations-sharing': ['集成', '分享', 'integration'],
    'web-browser': ['网页', '浏览器', 'web', 'browser'],
    'media-vision': ['设计', '视觉', 'media', 'vision'],
    'knowledge-research': ['知识', '研究', 'research'],
    'agents-workflows': ['智能体', '自动化', '工作流', 'workflow'],
    'ecosystem-resources': ['生态资源', 'ecosystem'],
    'utilities': ['实用工具', 'utilities'],
  }
  const sortKeys = {
    stars: { title: { zh: 'GitHub Star 数', en: 'GitHub stars' }, order: 'desc' },
    repositoryUpdated: { title: { zh: '仓库更新时间', en: 'Repository updated' }, order: 'desc' },
  }
  for (const plugin of plugins) {
    const rank = ranks.get(plugin.name), row = rank.row ?? {}
    if (row.category) categories[row.category] = {
      title: { zh: categoryNames[row.category] || row.category_zh || row.category, en: row.category_en || row.category },
    }
    const tags = (plugin.metadata?.labels ?? []).filter(id => Object.hasOwn(capabilities, id))
    for (const id of tags) labels[id] = capabilities[id]
    const updated = Math.floor(Date.parse(row.pushed_at) / 1000)
    plugin.metadata = {
      ...(row.category ? { category: row.category } : {}),
      keywords: [...new Set([...(plugin.metadata?.keywords ?? []), ...(row.packages?.tasks ?? []), ...(categoryKeywords[row.category] ?? [])])],
      labels: [...new Set([...plugin.versions.map(version => version.source.type), ...tags])],
      sortKeys: {
        ...(rank.stars >= 0 ? { stars: rank.stars } : {}),
        ...(Number.isFinite(updated) && updated >= 0 ? { repositoryUpdated: updated } : {}),
      },
    }
  }
  return { categories, labels, sortKeys }
}
