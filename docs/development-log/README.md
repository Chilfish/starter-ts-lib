# Development log

Records the work completed per day; the file name is `YYYY-MM-DD.md`.

## When to write

- Changes that do not fall under the "three required documents" (public contract / build and release / incident fix).
- Decisions, investigation paths, and rejected alternatives.
- The intermediate state of a large change, so the next session can pick it up.

## Format

```md
# 2026-11-18

## Done

- Migrated to tsdown + Bun
- Added the docs system and the check:docs gate

## Decisions

- Publish without NPM_TOKEN: switch to OIDC to avoid long-lived credentials

## Todo

- Add more usage examples
- Evaluate whether changesets is needed
```

## Conventions

- The log is not part of the gate and does not need to be complete.
- Content that touches public contracts or incidents also goes into the formal docs; the log only points to it.
- This directory is not registered per file in `docs/README.md` (`check-docs` exempts it).
