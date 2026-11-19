# Contributing

Read [docs/README.md](./docs/README.md) and [AGENTS.md](./AGENTS.md) before opening a pull request.

## Development flow

```bash
bun install
bun run check        # typecheck + lint + test:coverage + build + verify:package
bun run check:docs   # documentation links and index
```

## Branches and commits

- Branch off `main` with a short name: `feat/<scope>`, `fix/<scope>`, `docs/<scope>`.
- Conventional Commits: `type(scope): short English summary`.
- `pre-commit` runs `eslint --fix`; `pre-push` runs `build`.

## Code requirements

- Named exports only; `export default` is forbidden.
- Type imports use `import type`.
- No `any`.
- New logic needs tests; a bug fix starts with a reproduction case.
- Do not touch unrelated code and do not refactor along the way.

## Documentation requirements

Update the documentation first for:

- Public contract changes (export surface, types, behavior)
- Build or release process changes
- Incident fixes (recorded under `docs/postmortem/`)

Other changes get an entry in `docs/development-log/`.

## Pull requests

- The title follows the commit format.
- The description covers the motivation, the behavior change, and how it was verified.
- Public contract changes update `## Unreleased` in `CHANGELOG.md`.
- Wait for a green CI run before requesting review.

## Reporting issues

Use the [issue templates](https://github.com/Chilfish/starter-ts-lib/issues/new/choose). Do not report security issues in public; see [SECURITY.md](./SECURITY.md).
