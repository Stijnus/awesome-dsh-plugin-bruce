/** Subscription candidates are independent of the community directory's size cap. */
import { filterPool, buildEntry, categoryForRepo } from '../market.mjs'
import { packagesBlockFor } from '../market-v2.mjs'
const compare = (a, b) => b.stargazers_count - a.stargazers_count || (a.full_name < b.full_name ? -1 : a.full_name > b.full_name ? 1 : 0)
export function buildCandidates({ market, snapshot, curated, approved, packages }) {
  if (market.schema_version !== 2 || packages.schema_version !== 1)
    throw Error('Unsupported candidate input schema')
  const existing = [...market.entries, ...(market.featured?.entries ?? [])]
  const seen = new Set(existing.map(row => row.full_name.toLowerCase()))
  const mappings = new Map(Object.entries(packages.entries).map(([key, value]) => [key.toLowerCase(), value]))
  const { repos } = filterPool(snapshot, curated, approved)
  const extra = [], pending = []
  let manual = 0
  for (const { repo, category } of repos) {
    const key = repo.full_name.toLowerCase()
    if (seen.has(key)) continue
    seen.add(key)
    const record = mappings.get(key)
    const block = record ? packagesBlockFor(record) : undefined
    if (block?.mode === 'command') extra.push({ ...buildEntry(repo, category), packages: block })
    else if (block?.mode === 'manual') manual++
    else pending.push({ full_name: repo.full_name, stargazers_count: repo.stargazers_count })
  }
  extra.sort(compare)
  pending.sort(compare)
  // Sorting before target dedup ensures a shared package uses its highest-star repository.
  const unique = new Map()
  const snapshotByName = new Map(snapshot.repositories.map(repo => [repo.full_name.toLowerCase(), repo]))
  for (const row of existing) {
    const key = row.full_name.toLowerCase()
    const repo = snapshotByName.get(key)
    const record = mappings.get(key)
    if (!unique.has(key)) unique.set(key, {
      ...row,
      ...(repo ? buildEntry(repo, categoryForRepo(curated, repo)) : {}),
      ...(record ? { packages: packagesBlockFor(record) } : {}),
    })
  }
  return {
    ...market,
    entries: [...unique.values(), ...extra].sort(compare),
    featured: { ...market.featured, entries: [] },
    subscriptionCandidates: {
      policy: 'approved-mapped-pool-v1',
      communityRepositories: market.entries.length,
      eligiblePoolRepositories: repos.length,
      additionalMappedRepositories: extra.map(row => row.full_name),
      outsideDirectoryManual: manual,
      outsideDirectoryWithoutMapping: pending.length,
      pendingPreview: pending.slice(0, 200),
      pendingPreviewLimit: 200,
      note: 'Missing mappings are pending evidence, not incompatibility. Candidates still require source verification; repository and package counts differ.',
    },
  }
}
