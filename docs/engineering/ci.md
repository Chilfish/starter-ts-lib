# CI

The pipeline is defined in `.github/workflows/ci.yml`.

## Structure

| Job | Trigger | Content |
|---|---|---|
| `check` | push to main / PR | typecheck, lint:check, test:coverage, build, artifact and documentation checks, example run; uploads the `dist` and `coverage` artifacts |
| `runtime` | push to main / PR | depends on `check`, downloads the `dist` artifact, and imports it as ESM and CJS under Node 20/22/24 |

## Node versions

Build tooling (tsdown / the TypeScript toolchain) requires Node >=22 while the library supports Node >=20. Therefore:

- **The build runs once, in the `check` job (Node 24).**
- The `runtime` job does not install dependencies or build; it only consumes the `dist` artifact.
- This way Node 20 verifies "does the artifact run", not "can the toolchain build".

## Conventions

- **Least privilege**: `permissions: contents: read`.
- **Cancel superseded runs**: a new run on the same ref cancels the old one (`cancel-in-progress: true`).
- **Lockfile**: `bun install --frozen-lockfile` fails immediately when the manifest and `bun.lock` disagree.
- **Version consistency**: `packageManager`, the CI `bun-version`, and the README version must match.
- **Gates never skip**: any failing step is red; `continue-on-error` is not used.

## Caching

`oven-sh/setup-bun@v2` caches dependencies itself; no extra `actions/cache` is needed. Do not commit `node_modules` in CI.

## Troubleshooting

| Error | Cause | Action |
|---|---|---|
| `lockfile had changes` | `bun.lock` is out of date | Run `bun install` locally and commit the lockfile |
| `Cannot find module 'dist/index.js'` | the build did not run first | Check step order; the build must precede the import verification |
| `eslint` fails only in CI | `lint` already auto-fixed locally | Run `bun run lint:check` before committing |
| Coverage dropped | new code has no tests | Add tests; do not lower the threshold |

## When changing a workflow

1. Confirm the action version really exists (`checkout@v4`, `setup-bun@v2`, `setup-node@v4`).
2. Mirror release-related changes in [build-and-release](./build-and-release.md).
3. Mirror new gates in [release-checklist](./release-checklist.md).
