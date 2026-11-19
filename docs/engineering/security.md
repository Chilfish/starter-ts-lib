# Security

## Supply chain

- Publishing goes through **npm Trusted Publisher (OIDC)**; no long-lived `NPM_TOKEN` is stored.
- `npm publish --provenance` produces a verifiable provenance attestation.
- Dependency upgrades come as Dependabot pull requests and must pass the full gate.
- Do not commit `.env`, tokens, or certificates; `.gitignore` covers the common sensitive files.

## Secrets

| Kind | Stored in | Note |
|---|---|---|
| npm publish credential | GitHub OIDC | no static secret |
| `GITHUB_TOKEN` | injected by Actions | least privilege |
| Local development secrets | `.env` (gitignored) | never enters the repository |

- Never `echo` a secret in a workflow; use `printf` when writing it to a file.
- A new secret must be reflected in this document and in [build-and-release](./build-and-release.md).

## Permissions

- CI: `contents: read`.
- Publishing: `contents: read` plus `id-token: write` (required for OIDC).
- Introducing `contents: write` requires a documented purpose.

## Code boundaries

- Zero runtime dependencies and no `node:*` imports reduce the attack surface.
- Validate external input at boundaries; trust the type system internally.
- Do not execute `eval` / `new Function` in library code.
- Do not use dynamic `require`.

## Vulnerability response

1. Do not disclose exploitation details in an issue; report privately through GitHub Security Advisories.
2. After reproducing, ship a patch release and describe the impact in `CHANGELOG.md`.
3. Use `npm deprecate` to flag affected versions when necessary.
4. Record the incident under [postmortem](../postmortem/README.md) after it ends, and add tests and rules.
