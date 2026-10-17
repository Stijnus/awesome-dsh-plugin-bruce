/** Verify the installable tarball before publishing its identity and display fields. */
import { npmTarball } from './vendor/fetchers.ts'
import { isBundle } from './vendor/packages.ts'
import { readDisplayMetadata } from './vendor/metadata.ts'
export async function verifyNpmPlugin(
  plugin,
  packument,
  limits = { timeoutMs: 60000, maxTarballBytes: 64 * 1024 * 1024 },
) {
  const diagnostics = [],
    evidence = []
  let highest
  for (const version of plugin.versions) {
    const registryManifest = packument.versions[version.version]
    const { files, manifest } = await npmTarball(
      plugin.name,
      version.version,
      registryManifest.dist,
      limits,
    )
    if (!isBundle(manifest) || manifest.engines?.dsh !== version.engines.dsh)
      throw Error(
        `${plugin.name}@${version.version}: tarball bundle/engines differ from registry metadata`,
      )
    if (!highest) highest = { files, manifest }
    evidence.push({
      name: plugin.name,
      version: version.version,
      tarball: registryManifest.dist.tarball,
      integrity: registryManifest.dist.integrity,
    })
  }
  const { display, iconFile } = await readDisplayMetadata(
    highest.files,
    highest.manifest,
    {
      inlineBytes: 32768,
      warn: (reason) =>
        diagnostics.push({
          name: plugin.name,
          code: 'metadata_warning',
          status: 'warning',
          reason,
        }),
    },
  )
  if (iconFile) {
    delete display.icon
    diagnostics.push({
      name: plugin.name,
      code: 'metadata_warning',
      status: 'warning',
      reason: '图标超过 32 KiB 内联上限，已省略',
    })
  }
  return {
    plugin: { name: plugin.name, ...display, versions: plugin.versions },
    diagnostics,
    evidence,
  }
}
