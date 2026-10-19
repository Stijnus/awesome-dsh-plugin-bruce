import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync, mkdtempSync, mkdirSync, writeFileSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { spawnSync } from 'node:child_process'
import { createHash } from 'node:crypto'
import YAML from 'yaml'
const workflow = YAML.parse(readFileSync(new URL('../../.github/workflows/refresh-host-market.yml', import.meta.url), 'utf8'))
const step = workflow.jobs.publish.steps.at(-1).run
const code = step.split("python3 - <<'PYCODE'\n")[1].split('\nPYCODE')[0]
test('publisher accepts matching data and rejects tampered or unexpected artifacts before writing', () => {
  for (const scenario of ['valid', 'hash', 'extra', 'overflow', 'failure']) {
    const dir = mkdtempSync(join(tmpdir(), 'market-publication-'))
    try {
      mkdirSync(join(dir, 'release-data')); mkdirSync(join(dir, 'data'))
      const index = JSON.stringify({ plugins: Array.from({ length: scenario === 'overflow' ? 601 : 1 }, () => ({ name: 'demo' })) })
      const report = { indexSha256: scenario === 'hash' ? '0'.repeat(64) : createHash('sha256').update(index).digest('hex'), included: JSON.parse(index).plugins.length, fetchFailures: scenario === 'failure' ? 1 : 0 }
      writeFileSync(join(dir, 'release-data/dsh-market-index.json'), index)
      writeFileSync(join(dir, 'release-data/dsh-market-index.report.json'), JSON.stringify(report))
      if (scenario === 'extra') writeFileSync(join(dir, 'release-data/run.sh'), 'untrusted')
      const result = spawnSync(process.platform === 'win32' ? 'python' : 'python3', ['-c', code], { cwd: dir, encoding: 'utf8', env: { ...process.env, SOURCE_SHA: 'a'.repeat(40), TRIGGER_SHA: 'b'.repeat(40), RUN_ID: '123' } })
      assert.ifError(result.error)
      assert.equal(result.status === 0, scenario === 'valid', result.stderr)
      if (scenario === 'valid') {
        const release = JSON.parse(readFileSync(join(dir, 'data/dsh-market-release.json')))
        assert.equal(release.indexSha256, report.indexSha256)
        assert.equal(release.runId, 123)
      }
    } finally { rmSync(dir, { recursive: true, force: true }) }
  }
})
