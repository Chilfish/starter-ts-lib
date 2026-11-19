# Git workflow

## Branches

- `main` is the only long-lived branch and is always releasable.
- Features and fixes use short-lived branches: `feat/<scope>`, `fix/<scope>`.
- Rebase onto the latest `main` before merging to keep history linear.

## Commit messages

Conventional Commits, formatted as:

```
type(scope): short English summary
```

Common types:

| type | Purpose |
|---|---|
| `feat` | new feature |
| `fix` | bug fix |
| `refactor` | refactor with no behavior change |
| `test` | tests |
| `docs` | documentation |
| `build` | build / dependencies |
| `ci` | pipeline |
| `chore` | chores |

- One commit per logical unit; do not batch everything at the end.
- Split large changes into 3-4 commits by module or file.
- Do not write an unlocatable summary like "fix bug"; name the object and the behavior.

## Git hooks (lefthook)

Configuration lives in `lefthook.yml` and is installed by `prepare: lefthook install` during `bun install`.

| Hook | Behavior |
|---|---|
| pre-commit | Runs `eslint --fix` on staged files and writes the fixes back to the index |
| pre-push | Runs `bun run build` |

- `--no-verify` is discouraged; explain why in the pull request when it is needed.
- The full gate (typecheck / test / coverage) runs in CI; hooks only give fast feedback.

## Pull requests

- The title follows the commit message format.
- The description covers the motivation, the behavior change, and how it was verified.
- Public contract changes update both `CHANGELOG.md` and the related docs.
- When a diff exceeds 10 files or 200 lines, explain why or split the commits.
