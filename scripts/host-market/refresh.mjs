/** Refresh into a staging directory; failed or collapsed generations never replace published data. */
import { readFile, copyFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { spawnSync } from 'node:child_process'
import { assertPublishable } from './policy.mjs'

const root = fileURLToPath(new URL('../../', import.meta.url))
const candidate = resolve(root, '.output/host-market/index.json')
const target = resolve(root, 'data/dsh-market-index.json')
const run = spawnSync(process.execPath, [fileURLToPath(new URL('./generate.mjs', import.meta.url)),
  resolve(root, 'data/market-v2.json'), candidate], { stdio: 'inherit' })
if (run.status !== 0) process.exit(run.status ?? 1)
const next = JSON.parse(await readFile(candidate, 'utf8'))
let previous
try { previous = JSON.parse(await readFile(target, 'utf8')) }
catch (error) { if (error.code !== 'ENOENT') throw error }
assertPublishable({ index: next }, previous)
await copyFile(candidate, target)
await copyFile(`${candidate}.report.json`, resolve(root, 'data/dsh-market-index.report.json'))
