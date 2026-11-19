# Usage

## Daily commands

| Command | Purpose |
|---|---|
| `bun run dev` | tsdown watch, incremental build into `dist/` |
| `bun run build` | One-shot build of ESM + CJS + type declarations |
| `bun run typecheck` | `tsc --noEmit` |
| `bun run lint` | `eslint . --fix` |
| `bun run lint:check` | Check only, no fixes (CI) |
| `bun run test` | Run all tests once |
| `bun run test:watch` | Watch mode |
| `bun run test:coverage` | With v8 coverage |
| `bun run example` | Run `examples/basic.ts` |
| `bun run check` | Full gate |
| `bun run check:docs` | Check documentation links and index registration |

## Writing code

```bash
# Add a module
src/utils/id-codec.ts
tests/unit/utils/id-codec.test.ts
```

- Internal modules live under `src/<domain>/`; `src/index.ts` only re-exports.
- Type imports use `import type`.
- New exports update `tests/exports.test.ts` and the CHANGELOG.

## Commit

`pre-commit` runs `eslint --fix` on staged files. The commit message format is in [git-workflow](../engineering/git-workflow.md):

```bash
git commit -m "feat(parser): support multi-value arguments"
```

`pre-push` runs `bun run build` and blocks the push when the build fails.

## Release

```bash
# 1. Write ## Unreleased in CHANGELOG.md
# 2. Release in one command
bun run release
```

The full process and authentication setup are in [build-and-release](../engineering/build-and-release.md); the item-by-item check is in [release-checklist](../engineering/release-checklist.md).

## Troubleshooting

| Symptom | Action |
|---|---|
| `bun install --frozen-lockfile` fails | Run `bun install` locally, then commit the updated `bun.lock` |
| `pre-commit` does not run | Run `bunx lefthook install` to reinstall the hooks |
| `check-docs` reports an unregistered document | Add a row to the index in `docs/README.md` |
| The publish job reports a version mismatch | The tag differs from `package.json#version`; re-create the tag |
| An artifact is missing | Run `bun run build`, then `bun run verify:package` |
