/** Optional metadata-only retry for public GitHub repositories too large to fetch promptly. */
import { execFile } from 'node:child_process'
import { promisify } from 'node:util'
import { createHash } from 'node:crypto'
import { PackageFiles } from './vendor/files.ts'
const run = promisify(execFile)
async function githubApi(path, timeoutMs) {
  const { stdout } = await run(
    'gh',
    ['api', '--hostname', 'github.com', path],
    {
      timeout: timeoutMs,
      maxBuffer: 32 * 1024 * 1024,
    },
  )
  return JSON.parse(stdout)
}
export async function withGitHubObjects(
  url,
  refs,
  _transports,
  limits,
  read,
  { api = githubApi } = {},
) {
  const parsed = new URL(url),
    slug = parsed.pathname.slice(1).replace(/\.git$/, '')
  if (
    parsed.hostname !== 'github.com' ||
    !/^[-\w.]+\/[-\w.]+$/.test(slug) ||
    !/^[0-9a-f]{40}$/.test(refs.head)
  )
    throw Error(
      'GitHub object reader requires a canonical repository and full commit',
    )
  const prefix = `repos/${slug}/git`,
    commit = await api(`${prefix}/commits/${refs.head}`, limits.timeoutMs)
  if (commit.sha !== refs.head) throw Error('GitHub commit identity mismatch')
  const tree = await api(
    `${prefix}/trees/${commit.tree.sha}?recursive=1`,
    limits.timeoutMs,
  )
  if (tree.truncated || tree.sha !== commit.tree.sha)
    throw Error(
      'GitHub tree is truncated or mismatched; incomplete trees cannot pass verification',
    )
  const time = Date.parse(commit.committer.date) / 1000
  if (!Number.isInteger(time)) throw Error('Missing commit timestamp')
  const cache = new Map(),
    files = new Map()
  for (const entry of tree.tree) {
    if (entry.type !== 'blob' || !['100644', '100755'].includes(entry.mode))
      continue
    files.set(entry.path, {
      size: entry.size,
      read: async () => {
        if (!cache.has(entry.sha))
          cache.set(
            entry.sha,
            (async () => {
              const blob = await api(
                `${prefix}/blobs/${entry.sha}`,
                limits.timeoutMs,
              )
              if (blob.sha !== entry.sha || blob.encoding !== 'base64')
                throw Error('GitHub blob identity/encoding mismatch')
              const bytes = Buffer.from(blob.content, 'base64')
              const actual = createHash('sha1')
                .update(`blob ${bytes.length}\0`)
                .update(bytes)
                .digest('hex')
              if (actual !== entry.sha || bytes.length !== entry.size)
                throw Error('GitHub blob content digest/size mismatch')
              return bytes
            })(),
          )
        return cache.get(entry.sha)
      },
    })
  }
  const all = new PackageFiles(files)
  return read({
    tree: async (sha, path) => {
      if (sha !== refs.head) throw Error('Unexpected commit')
      return all.within(path)
    },
    committed: async (sha) => {
      if (sha !== refs.head) throw Error('Unexpected commit')
      return time
    },
  })
}
