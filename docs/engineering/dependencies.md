# Dependencies

## Principles

- **Zero runtime dependencies**: `dependencies` must stay empty. A new runtime dependency needs its necessity, size, and alternatives justified in the pull request.
- **Toolchain in devDependencies**: build, test, lint, and release scripts are all development dependencies.
- **Caret versions**: `^x.y.z`; the lockfile does the pinning.
- **Never hand-edit the lockfile.**

## Categories

| Category | Location | Example |
|---|---|---|
| Runtime | `dependencies` | none |
| Development tools | `devDependencies` | tsdown, vitest, eslint |
| Types | `devDependencies` | `@types/node`, `@types/bun` |

## Upgrade flow

```bash
bun outdated
bun update <pkg>
bun run check
git diff bun.lock
```

- After an upgrade, run `bun run check` and `bun run check:docs`.
- Major upgrades are recorded under "Changed" or "Upgrade notes" in `CHANGELOG.md`.
- When an upgrade fails, roll the dependency back. Do not bypass a peer conflict with `--force`.

## New dependency checklist

- [ ] Is it really needed? Can the standard library or an existing dependency do it?
- [ ] Is the license compatible with the project (MIT)?
- [ ] Does it support ESM? Is a CJS artifact needed?
- [ ] Does it pull in a Node built-in module? That breaks `platform: 'neutral'`.
- [ ] Does it noticeably increase the install size?
- [ ] Is it added to `devDependencies` with `bun.lock` updated?

## Automated upgrades

`.github/dependabot.yml` checks the Bun ecosystem dependencies weekly. A Dependabot pull request must pass the full CI before merging.

`typescript` currently ignores `>=7` because `typescript-eslint` does not support TS 7 yet. Remove the ignore once upstream support lands.
