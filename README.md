# starter-ts-lib

> TypeScript library scaffold: tsdown builds, Vitest tests, ESLint formatting, Bun installs, and OIDC publishing.

[![CI](https://github.com/Chilfish/starter-ts-lib/actions/workflows/ci.yml/badge.svg)](https://github.com/Chilfish/starter-ts-lib/actions/workflows/ci.yml)
[![npm](https://img.shields.io/npm/v/starter-ts-lib.svg)](https://www.npmjs.com/package/starter-ts-lib)
[![License](https://img.shields.io/github/license/Chilfish/starter-ts-lib.svg)](./LICENSE.md)

## Features

- **Dual format** — produces ESM (`dist/index.js`) and CJS (`dist/index.cjs`), each with its own type declarations.
- **No runtime dependencies** — `dependencies` stays empty; the whole toolchain lives in `devDependencies`.
- **Strict types** — `strict` plus `verbatimModuleSyntax`, so `import type` / `export type` are enforced.
- **Formatting through ESLint** — the antfu ESLint config owns formatting; no Prettier.
- **Checks on commit** — `lefthook` runs `eslint --fix` on staged files before commit and a build before push.
- **Gated publishing** — a tag triggers CI, which verifies the version and the CHANGELOG before publishing through OIDC with provenance.
- **Built-in gates** — artifact verification, tag verification, and documentation link and index checks.
- **Documentation set** — guides, engineering rules, API contract, postmortem template, and development log.

## Requirements

| Tool | Version |
|---|---|
| Bun | 1.4.4+ |
| Node.js | 20+ |

## Install

```bash
bun install
```

## Quick start

```ts
import { one, two } from 'starter-ts-lib'

console.log(one + two)
```

## Commands

| Command | Description |
|---|---|
| `bun run dev` | tsdown watch build |
| `bun run build` | Build ESM + CJS + type declarations |
| `bun run typecheck` | `tsc --noEmit` |
| `bun run lint` | ESLint with fixes |
| `bun run lint:check` | ESLint without fixes |
| `bun run test` | Run the test suite once |
| `bun run test:coverage` | Run tests with v8 coverage |
| `bun run check` | Full gate (types + lint + tests + build + artifact check) |
| `bun run check:docs` | Check documentation links and index registration |
| `bun run example` | Run the example |
| `bun run verify:package` | Verify the published artifacts |
| `bun run release` | Bump the version, commit, tag, and push |

## Layout

```
src/                 # library source, single public entry at src/index.ts
tests/               # tests, mirroring src/
examples/            # runnable examples
scripts/             # gate and release scripts
docs/                # internal documentation (guides, engineering rules, postmortems)
.github/             # CI, publishing, issue/PR templates, Dependabot
tsdown.config.ts     # build configuration
vitest.config.ts     # test and coverage configuration
eslint.config.js     # style and formatting
lefthook.yml         # Git hooks
```

## Release flow

1. Describe the change in `## Unreleased` of `CHANGELOG.md`.
2. Run `bun run release`; `bumpp` bumps the version, commits, tags, and pushes.
3. The pushed `v*` tag triggers `publish.yml`, which verifies the tag against `package.json`, the CHANGELOG section, and the full gate, then runs `npm publish --provenance`.
4. The first release is manual: the `publish` job is skipped until the repository variable `NPM_OIDC_READY` exists, so publish from the tag with `npm publish --access public`, bind the Trusted Publisher in the npm package settings, then set `NPM_OIDC_READY` to `true`.

See [build-and-release](./docs/engineering/build-and-release.md) and the [release checklist](./docs/engineering/release-checklist.md) for the full process.

## Documentation

- [docs/README.md](./docs/README.md) — documentation index and when to read each document
- [docs/guide/getting-started.md](./docs/guide/getting-started.md) — setup and customization
- [docs/engineering/architecture.md](./docs/engineering/architecture.md) — layering and dependency direction
- [docs/engineering/code-style.md](./docs/engineering/code-style.md) — naming, imports, errors
- [docs/engineering/testing.md](./docs/engineering/testing.md) — test layering and coverage
- [docs/reference/package-contract.md](./docs/reference/package-contract.md) — `package.json` contract

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) and [CODE_OF_CONDUCT.md](./CODE_OF_CONDUCT.md). Report security issues through [SECURITY.md](./SECURITY.md).

## License

[MIT](./LICENSE.md)
