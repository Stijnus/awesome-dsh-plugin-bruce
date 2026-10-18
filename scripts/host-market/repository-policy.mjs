/** Normalize package and Git repository references for the curated exclusion policy. */
export function repositorySlug(value) {
  if (typeof value !== 'string') return null
  let raw = value.trim()
  if (raw.startsWith('github:')) raw = `https://github.com/${raw.slice(7)}`
  else if (/^git@github\.com:/i.test(raw))
    raw = `https://github.com/${raw.slice('git@github.com:'.length)}`
  raw = raw.replace(/^git\+/, '')
  let url
  try {
    url = new URL(raw)
  } catch {
    return null
  }
  if (!['github.com', 'www.github.com'].includes(url.hostname.toLowerCase()))
    return null
  const [owner, repo] = url.pathname.split('/').filter(Boolean)
  if (!owner || !repo) return null
  return `${owner}/${repo.replace(/\.git$/i, '')}`.toLowerCase()
}

export function blockedPluginRepository(plugin, blockedRepositories) {
  const references = [
    plugin.repository?.url,
    ...plugin.versions.map((version) =>
      version.source?.type === 'git' ? version.source.url : null,
    ),
  ]
  for (const reference of references) {
    const slug = repositorySlug(reference)
    if (slug && blockedRepositories.has(slug))
      return { slug, reference }
  }
  return null
}
