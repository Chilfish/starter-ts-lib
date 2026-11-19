# Postmortems

Write one postmortem after every production or release incident, numbered in increasing order: `NNN-short-slug.md`.

## Index

| Number | Topic | Root cause category | One-line lesson |
|---|---|---|---|
| — | None yet | — | — |

## Recurring pitfall checklist

Run through this before writing code or changing configuration:

### Build and artifacts

- Does `tsdown.config.ts` accidentally enable `exports: true` and overwrite the hand-maintained `exports`?
- When adding a subpath entry, are `entry` and `package.json#exports` in sync?
- Did anything under `platform: 'neutral'` introduce a runtime `node:*` import?

### Dependencies and lockfile

- Did you change only `package.json` and forget `bun.lock`?
- CI uses `--frozen-lockfile`; a lockfile that disagrees with the manifest fails immediately.

### CI and release

- Does the action version really exist? (`checkout@v4`, `setup-bun@v2`, `setup-node@v4`)
- Does publishing go through OIDC, and did you accidentally add `NPM_TOKEN` or `registry-url`?
- Did `publishConfig` accidentally set `provenance: true`? A local manual `npm publish` then fails with `EUSAGE`; provenance is only enabled by the workflow's `--provenance`.
- Did the first release complete the bootstrap flow (manual publish -> bind Trusted Publisher -> set `NPM_OIDC_READY=true`)? The `publish` job is skipped while the variable is unset.
- Does `bun install --production` in CI run `prepare` (`lefthook install`), which fails with 127 because devDependencies are missing? Such a job needs `--ignore-scripts`.
- Does `CHANGELOG.md` have a matching version section? Do `package.json#version` and the tag agree?

### Tests

- Does new logic have tests?
- Is any test depending on the real network or the real clock?

### Documentation

- Are public contracts, the build process, and incident fixes reflected in the docs?
- Do the commands, paths, and fields in the docs still match the code?

## Writing requirements

- Facts first: timeline, evidence, impact.
- Take the root cause down to an actionable level; do not write "carelessness".
- Every lesson must land in the pitfall checklist or in `AGENTS.md`.
- Use [TEMPLATE.md](./TEMPLATE.md).
