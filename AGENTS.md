# AGENTS.md

Repository-level hard constraints. Details live in [docs/README.md](./docs/README.md); when the two conflict, the code and this file win, and the documentation is corrected along the way.

## Language

All project text is English: source comments, script output, CLI messages, Markdown documentation, CHANGELOG entries, and commit messages. Runtime data keeps its original language. The writing rules are in [docs/engineering/writing-style.md](./docs/engineering/writing-style.md).

## Tech stack

- Package manager: **Bun** (lockfile `bun.lock`, CI uses `--frozen-lockfile`)
- Build: **tsdown**, ESM + CJS dual format, `platform: 'neutral'`
- Tests: **Vitest**, v8 coverage
- Style: **@antfu/eslint-config** (with formatters), no Prettier
- Git hooks: **lefthook** (`lefthook.yml`)
- Release: a tag triggers GitHub Actions; npm publishing is gated by the repository variable `NPM_OIDC_READY` (OIDC + provenance)

## Mandatory for every task

1. Use named exports only; `export default` is forbidden.
2. Type imports must use `import type` / `export type`.
3. Avoid `any`; use `unknown` plus type guards, narrowed at boundaries.
4. Keep the source platform-neutral; no runtime `node:*` imports.
5. Changing `package.json#exports` must be mirrored in `tests/exports.test.ts`.
6. New logic must have tests; fixing a bug starts with a reproduction case.
7. Write documentation first when changing public contracts, the build/release process, or incident fixes.
8. `lint:check` and `typecheck` must pass; never commit with `--no-verify`.
9. Do not enable `exports: true` in `tsdown.config.ts`.
10. Update `bun.lock` after any dependency version change.

## Common commands

```bash
bun install
bun run typecheck
bun run lint:check
bun run test
bun run build
bun run check        # full gate
bun run check:docs   # documentation links and index
```

## Directories

| Path | Responsibility |
|---|---|
| `src/index.ts` | the only public entry |
| `tests/` | tests, mirroring `src/` |
| `examples/` | runnable examples |
| `scripts/` | gate and release scripts |
| `docs/` | internal documentation, indexed in `docs/README.md` |
| `.github/workflows/` | `ci.yml` / `publish.yml` |
| `.github/ISSUE_TEMPLATE/` | issue templates |
