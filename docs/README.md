# Documentation index

This directory is the single entry point for project documentation. **A new document must be registered in the table below**; `bun run check:docs` enforces it.

## Three required documents

Only the following changes require documentation first; other changes get an entry in the [development log](./development-log/README.md) the same day:

1. Public contract changes (export surface, types, behavior)
2. New or changed build/release process
3. Incidents and reliability fixes (recorded under [postmortem](./postmortem/README.md))

## Guides

| Document | What it covers | When to read |
|---|---|---|
| [guide/getting-started.md](./guide/getting-started.md) | Install, initialize, first command | First time in this project |
| [guide/usage.md](./guide/usage.md) | Daily development, releasing, common operations | Day to day |

## Engineering rules

| Document | What it covers | When to read |
|---|---|---|
| [engineering/architecture.md](./engineering/architecture.md) | Layering, dependency direction, public surface boundary | Before adding a module or restructuring directories |
| [engineering/code-style.md](./engineering/code-style.md) | Naming, import order, types, error handling | Every time you write code |
| [engineering/writing-style.md](./engineering/writing-style.md) | Tone, word choice, terminology, documentation truth | Whenever you write docs, comments, or interface copy |
| [engineering/testing.md](./engineering/testing.md) | Test layering, naming, coverage | Adding a feature or fixing a bug |
| [engineering/build-and-release.md](./engineering/build-and-release.md) | Dual-format build, artifact contract, release chain | Changing build configuration or releasing |
| [engineering/ci.md](./engineering/ci.md) | Pipeline structure, caching, gates, troubleshooting | Changing a workflow or debugging CI |
| [engineering/dependencies.md](./engineering/dependencies.md) | Dependency policy, lockfile, upgrade flow | Adding, removing, or upgrading dependencies |
| [engineering/security.md](./engineering/security.md) | Supply chain, secrets, OIDC, vulnerability response | Changes involving secrets, publishing, or security |
| [engineering/git-workflow.md](./engineering/git-workflow.md) | Branches, commit messages, hooks, pull request rules | Before committing |
| [engineering/release-checklist.md](./engineering/release-checklist.md) | Item-by-item release checklist | Every release |

## Reference

| Document | What it covers |
|---|---|
| [reference/api.md](./reference/api.md) | Public API and export surface |
| [reference/package-contract.md](./reference/package-contract.md) | `package.json` field contract |

## Postmortems

| Document | What it covers |
|---|---|
| [postmortem/README.md](./postmortem/README.md) | Postmortem index and recurring pitfall checklist |
| [postmortem/TEMPLATE.md](./postmortem/TEMPLATE.md) | New postmortem template |

## Development log and archive

| Document | What it covers |
|---|---|
| [development-log/README.md](./development-log/README.md) | Rules for the dated development log |
| [archive/README.md](./archive/README.md) | Archive for documents that no longer apply |

## Conventions

- **Documentation is the truth**: paths, commands, and fields must match the current code; fix stale content in place.
- **Documentation first**: applies only to the three required document types above; everything else has no process gate.
- **Archive, do not delete**: retired documents move to `archive/` instead of lingering in the main directory.
- `bun run check:docs` fails when a document is missing from the index or a link is broken.
