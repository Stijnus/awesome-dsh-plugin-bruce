# Pinned DSH file readers

These four unmodified MIT-licensed files are copied from `deepseek-ai/deepseek-harness`, tag `dsh-v0.2.1-alpha.5`, commit `1517a4dbca0a2789ff1d41ba439600f8547d23fa`, directory `apps/plugin-market-generator/src/`. `upstream.json` records SHA-256 digests; `LICENSE` preserves the upstream license.

The adapter uses file reading, bundle discovery, Git bare-object access, tarball integrity checks and display metadata extraction. npm, Git and audit readers call the same `dshRange`: it preserves explicit `engines.dsh`, otherwise combines DSH peer ranges, and omits unrestricted requirements. The official pinned format validator remains the acceptance gate. This extraction baseline is separate from the user-facing DSH `0.2.1-rc.2` version.

To update, review the new host contract, replace files from an exact upstream commit, regenerate hashes, update the lockfile, and run fixture tests and a real candidate generation. Do not silently track an upstream branch.
