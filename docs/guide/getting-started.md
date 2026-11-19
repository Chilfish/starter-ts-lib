# Getting started

## Requirements

| Tool | Version | Purpose |
|---|---|---|
| Bun | 1.4.4+ | Install dependencies, run scripts, local development |
| Node.js | 20+ | Runtime (`engines.node`) |
| Git | 2.4+ | lefthook hooks |

The Bun version is pinned in `package.json#packageManager`; CI uses the same version.

## Initialize

```bash
git clone git@github.com:Chilfish/starter-ts-lib.git my-lib
cd my-lib
bun install
```

`bun install` runs `prepare: lefthook install` and sets up the Git hooks.

## Make it your project

1. Update `package.json`: `name`, `description`, `repository`, `homepage`, `bugs`, `keywords`.
2. Update the `README.md` title and install command.
3. Replace the placeholder exports in `src/index.ts` and mirror them in `tests/index.test.ts`.
4. Update the copyright in `LICENSE.md`.
5. Update `CHANGELOG.md` and clear the template content.
6. Create the package on npm and configure the Trusted Publisher (see [build-and-release](../engineering/build-and-release.md)).

## First command

```bash
bun run check
```

It runs typecheck, lint, test coverage, build, and artifact verification in order. A green run means the scaffold works.

## Next steps

- Daily commands and releasing: [usage.md](./usage.md)
- Architecture and directory conventions: [architecture.md](../engineering/architecture.md)
- Code style: [code-style.md](../engineering/code-style.md)
