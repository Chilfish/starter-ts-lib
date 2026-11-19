# Changelog

This project follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) and [SemVer](https://semver.org/).

## Unreleased

### Changed

- All project text is now English only: documentation, code comments, script output, CI messages, and the changelog. The rules live in [docs/engineering/writing-style.md](./docs/engineering/writing-style.md).
- Gate scripts moved from `.mjs` to TypeScript (`scripts/*.ts`), run directly by `bun`, and covered by `tsc --noEmit`.
- Build tooling migrated from unbuild to tsdown, producing ESM + CJS dual format with standalone type declarations.
- Package manager switched from pnpm to Bun, with `bun.lock` as the lockfile.
- CI and release pipelines use action versions that exist; publishing goes through OIDC with provenance.
- lefthook owns Git hooks: pre-commit runs `eslint --fix` on staged files, pre-push builds.
- Fixed `exports` conditional types, `engines`, `publishConfig`, and other metadata.
- Tests moved to `tests/`, with export-surface contract tests and coverage configuration added.
- Added the `docs/` documentation system, `AGENTS.md`, and `CHANGELOG.md`.
- Added out-of-the-box infrastructure: `examples/`, `scripts/verify-package.ts`, `scripts/verify-release-tag.ts`, and `scripts/check-docs.ts`.
- Added community files: `CONTRIBUTING.md`, `SECURITY.md`, `CODE_OF_CONDUCT.md`, issue and PR templates, `.editorconfig`, `.nvmrc`, and Dependabot.
- CI now verifies artifacts, documentation, and the example run, and uploads coverage; publishing now polls the registry.

### Fixed

- `publishConfig.provenance` was removed and the `publish` job is gated behind `NPM_OIDC_READY`. npm cannot generate provenance for a local manual publish, so the first bootstrap release failed with `EUSAGE`; the gate also stops a tag push from publishing before the Trusted Publisher is bound.
- The CI Node 20 job no longer runs the build (tsdown requires Node >=22); it consumes the `dist` artifact to verify the runtime instead.
- Dependabot ignores `typescript >=7`, which `typescript-eslint` does not support yet.
