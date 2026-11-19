# Public API

The scaffold currently exposes a placeholder API. Update this document when you replace `src/index.ts`.

## Export surface

```ts
export const one = 1
export const two = 2
```

| Export | Type | Description |
|---|---|---|
| `one` | `1` | Placeholder constant |
| `two` | `2` | Placeholder constant |

## Entries

| Entry | Artifact | Use |
|---|---|---|
| `import { one } from 'starter-ts-lib'` | `dist/index.js` | ESM |
| `const { one } = require('starter-ts-lib')` | `dist/index.cjs` | CJS |

Both entries expose the same public API; the type declarations are `index.d.ts` and `index.d.cts` respectively.

## Contract

- Named exports only; there is no default export.
- Zero runtime dependencies; the library does not touch the network, the filesystem, or global state.
- A change to the export surface is a public contract change and must:
  1. Update this document and `README.md`
  2. Update `tests/exports.test.ts`
  3. Be noted in `CHANGELOG.md`, with a migration path for breaking changes

## Adding a subpath

When adding an entry such as `./node`:

1. Add `src/node.ts`
2. Add it to `entry` in `tsdown.config.ts`
3. Declare it in `package.json#exports` with `types` under both `import` and `require`
4. Add an assertion in `tests/exports.test.ts`
5. Register it here and in [package-contract](./package-contract.md)
