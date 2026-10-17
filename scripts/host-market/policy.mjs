/** Refuse publishing incomplete reads or a suspiciously collapsed catalog. */
export function assertPublishable({ index, fetchFailures = 0 }, previous) {
  if (fetchFailures)
    throw new Error(
      'Source lookup failed; see staging report. Published data was not replaced.',
    )
  if (!index.plugins.length)
    throw new Error(
      'No eligible bundles; see staging report. Published data was not replaced.',
    )
  if (previous && index.plugins.length < previous.plugins.length * 0.8) {
    throw new Error(
      `Index collapsed from ${previous.plugins.length} to ${index.plugins.length}; review staging diagnostics before replacing published data`,
    )
  }
}
