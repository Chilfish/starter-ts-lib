# Testing

## Layers

| Layer | Location | Dependencies | Content |
|---|---|---|---|
| Unit | `tests/unit/` | no IO | pure functions, parsing, edge cases |
| Component | `tests/component/` | injected fakes | module collaboration with external dependencies replaced |
| Contract | `tests/exports.test.ts` | filesystem | `package.json` export surface, files, engines |

The directory mirrors `src/`: `tests/unit/utils/id-codec.test.ts` corresponds to `src/utils/id-codec.ts`.

## Naming

- Files are `*.test.ts`; integration tests may use `*.e2e.test.ts`.
- Case names describe the behavior and result: `returns null for empty input`, `throws when status is not ok`.
- Group related cases with `describe` inside a file.

## Tools

- Vitest with `globals: true`; explicit imports are also valid, but stay consistent within the repo.
- Shared doubles live in `tests/testkit/`; stronger fakes specific to a file are defined locally.
- Build the subject through a factory function instead of sharing mutable state in `beforeEach`.

## Coverage

`bun run test:coverage` uses v8 and reports `text-summary`, `json-summary`, and `lcov` into `coverage/`.

- The coverage threshold is a ratchet: it may only go up, never down to pass CI.
- New logic needs tests; a bug fix starts with a failing reproduction case.

## Forbidden

- Shared mutable state between tests.
- Unit tests that depend on the real network or the real clock.
- Empty assertions such as `expect(true).toBe(true)`.
