/** Must load before vendor/fetchers.ts so Windows temp locks cannot discard Git reads. */
import fs from 'node:fs'

const nativeRmSync = fs.rmSync
if (!nativeRmSync.__dshIgnoreTempLock) {
  const patched = (path, options) => {
    try {
      return nativeRmSync(path, options)
    } catch (error) {
      if (
        (error.code === 'EPERM' ||
          error.code === 'EBUSY' ||
          error.code === 'ENOTEMPTY') &&
        String(path).includes('plugin-market-git-')
      )
        return
      throw error
    }
  }
  patched.__dshIgnoreTempLock = true
  fs.rmSync = patched
}
