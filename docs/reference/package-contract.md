# package.json contract

`package.json` is the single source of truth for the published artifact; the build must not rewrite the publishing fields.

## Required fields

| Field | Current value | Constraint |
|---|---|---|
| `name` | `starter-ts-lib` | must match the npm package name |
| `type` | `module` | source and the ESM artifact are both parsed as ESM |
| `packageManager` | `bun@1.4.4` | must match the CI Bun version |
| `sideEffects` | `false` | guarantees tree-shaking |
| `files` | `dist` / `LICENSE.md` / `README.md` | publishes only artifacts and docs |
| `engines.node` | `>=20` | matches the lower bound of the CI runtime matrix |
| `publishConfig` | `access: public` | provenance is turned on explicitly by the workflow's `npm publish --provenance`; it is not set in `publishConfig`, where a local manual publish would fail with `EUSAGE` |

## exports

```json
{
  ".": {
    "import": { "types": "./dist/index.d.ts", "default": "./dist/index.js" },
    "require": { "types": "./dist/index.d.cts", "default": "./dist/index.cjs" }
  },
  "./package.json": "./package.json"
}
```

Rules:

- `types` must sit inside each condition, before `default`.
- Bare string exports are not allowed (for example `".": "./dist/index.js"`).
- Every target file must exist; `bun run verify:package` checks it.
- Sync `tests/exports.test.ts` when adding a subpath.

## Legacy top-level fields

`main` / `module` / `types` are kept only for older tools:

| Field | Value |
|---|---|
| `main` | `./dist/index.cjs` |
| `module` | `./dist/index.js` |
| `types` | `./dist/index.d.ts` |

New code should rely on `exports`, not these three fields.

## Dependencies

- `dependencies` must stay empty (zero runtime dependencies).
- The toolchain lives entirely in `devDependencies` with caret versions.
- After changing a dependency, commit the updated `bun.lock`.
- Policy is in [dependencies](../engineering/dependencies.md).

## Scripts

| Script | Convention |
|---|---|
| `build` | Calls only `tsdown`; no extra copying |
| `check` | Aggregates the full gate, shared by CI and local runs |
| `check:docs` / `verify:package` / `verify:tag` | Gate scripts written in TypeScript and run directly by `bun` (no build step) |
| `prepublishOnly` | Builds only, to prevent an accidental publish |
| `release` | Bumps the version and creates a tag; does not publish locally |
