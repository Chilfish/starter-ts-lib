# Pull Request

## Motivation

<!-- Why is this change needed? Linked issue: Closes # -->

## Behavior change

<!-- What users can observe; write "None" if there is none -->

## Verification

<!-- List the commands you ran and their results -->

- [ ] `bun run check`
- [ ] `bun run check:docs` (when documentation is involved)

## Checklist

- [ ] Contains only this change, no opportunistic refactoring
- [ ] New logic has tests; a bug fix starts with a reproduction case
- [ ] Public contract changes update `## Unreleased` in `CHANGELOG.md`
- [ ] Paths, commands, and fields in the docs match the code
- [ ] No `--no-verify` was used
