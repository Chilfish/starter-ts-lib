# Build and release

## Build

Tool: **tsdown** (rolldown core). Configuration lives in `tsdown.config.ts`.

| Item | Value | Rationale |
|---|---|---|
| `entry` | `src/index.ts` | single entry; subpath entries are added explicitly |
| `format` | `esm` + `cjs` | supports both `import` and `require` |
| `dts` | `true` | generates `index.d.ts` / `index.d.cts` |
| `platform` | `neutral` | not bound to Node; browsers and Edge can consume it |
| `target` | `es2022` | modern syntax, avoids excessive downleveling |
| `neverBundle` | `/^node:/` | the neutral platform does not resolve Node built-ins |
| `exports` | `false` | `package.json#exports` is maintained by hand; the build must not rewrite it |

Artifact contract:

```
dist/index.js      ESM
dist/index.cjs     CJS
dist/index.d.ts    ESM types
dist/index.d.cts   CJS types
```

CI verifies these four files exist after the build and imports each under Node 20/22/24; `bun run verify:package` also checks the tarball file list to keep source, tests, and scripts out of the published package.

## package.json contract

- `exports["."]` must be a conditional object with `types` under each of `import` / `require`.
- `files` contains only `dist`, `LICENSE.md`, and `README.md`.
- `sideEffects: false` guarantees tree-shaking.
- `engines.node` matches the lower bound of the CI matrix.
- `publishConfig` declares only `access: public`: npm cannot generate provenance for a local manual `npm publish` and fails with `EUSAGE`; the publish workflow turns provenance on explicitly with `npm publish --provenance`.

`tests/exports.test.ts` locks the shape above; changing the export surface requires changing the test first.

## Release chain

1. Update `## Unreleased` in `CHANGELOG.md` and describe this version's changes.
2. `bun run release` -> `bumpp` bumps the version, commits, tags, and pushes.
3. The tag push triggers `.github/workflows/publish.yml`:
   - verify the tag matches `package.json#version`
   - verify `CHANGELOG.md` contains a `## <version>` section
   - typecheck / lint:check / test / build
   - `npm publish --provenance --access public`
4. After publishing, create the GitHub Release (the same CHANGELOG section can serve as the notes).

### First release (bootstrap)

A Trusted Publisher can only be configured after the npm package exists, so the first release is manual:

1. Push the tag; `publish.yml` runs, but its `publish` job is **skipped** because the repository variable `NPM_OIDC_READY` is unset.
2. From a clean checkout of the tag, run `npm publish --access public`. Do not pass `--provenance` locally; it is only available from a supported CI environment.
3. In the npm package settings, bind this repository and `publish.yml` as the Trusted Publisher.
4. Set the repository variable `NPM_OIDC_READY=true` (Settings -> Secrets and variables -> Actions -> Variables). From then on a tag push publishes through OIDC automatically.

## Authentication

Use **npm Trusted Publisher (OIDC)** and do not configure an `NPM_TOKEN`:

- The workflow needs `permissions.id-token: write`.
- `setup-node` deliberately **does not** set `registry-url`, to avoid writing an `.npmrc` with a placeholder token.
- Bind this repository and this workflow in the npm package settings before the first release.
- The `publish` job is gated by `if: vars.NPM_OIDC_READY == 'true'`: keep the variable unset until bootstrap is done so nothing publishes by accident.

## Forbidden

- Running `npm publish` directly locally (it bypasses the gates). The first bootstrap release is the only exception; see "First release (bootstrap)" above.
- Enabling `exports: true` in `tsdown.config.ts` (it rewrites the hand-maintained exports).
- Publishing without updating the CHANGELOG (CI fails immediately).
