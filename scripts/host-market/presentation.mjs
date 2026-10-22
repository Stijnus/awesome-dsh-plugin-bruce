/** Reviewed display translations are separate from package identity and install evidence. */
import { createHash } from 'node:crypto'
import { readFileSync } from 'node:fs'

const reviewed = JSON.parse(readFileSync(new URL('./presentation.json', import.meta.url), 'utf8'))

export function displayFingerprint(plugin) {
  return createHash('sha256').update(JSON.stringify({
    title: plugin.title ?? null, description: plugin.description ?? null,
    repository: plugin.repository ?? null,
  })).digest('hex')
}

export function applyPresentation(plugins, records = reviewed.plugins) {
  const diagnostics = []
  for (const plugin of plugins) {
    const record = records[plugin.name]
    if (!record) continue
    if (displayFingerprint(plugin) !== record.displaySha256) {
      diagnostics.push({ name: plugin.name, code: 'presentation_review_needed', status: 'warning',
        reason: '上游展示元数据发生变化，保留原始字段，等待重新审阅翻译' })
      continue
    }
    if (record.title) plugin.title = { ...(typeof plugin.title === 'object' ? plugin.title : {}), ...record.title }
    if (record.description) plugin.description = { ...(typeof plugin.description === 'object' ? plugin.description : {}), ...record.description }
    plugin.metadata ??= {}
    plugin.metadata.keywords = [...new Set([...(plugin.metadata.keywords ?? []), ...(record.keywords ?? [])])]
    plugin.metadata.labels = record.labels ?? []
    diagnostics.push({ name: plugin.name, code: 'presentation_reviewed', status: 'info',
      reason: '使用已审阅的展示信息、用途标签和检索词；安装来源、版本和兼容范围保持包内声明',
      evidence: record.evidence, reviewedVersion: record.reviewedVersion })
  }
  return diagnostics
}
