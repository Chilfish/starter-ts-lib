# Architecture

## Goal

This is a reusable TypeScript library scaffold. The default shape is **a single entry, zero runtime dependencies, and platform-neutral**, extended as needed.

## Layering

```
src/index.ts          public entry (barrel, re-export only)
src/<domain>/         domain implementations, split by responsibility
tests/                tests, mirroring src/
docs/                 internal documentation
```

The dependency direction is strictly one-way:

```
index.ts  ->  domain  ->  utils
                  \->  types
```

- `utils/` must not import from `domain/`.
- When `domain/` modules need each other, decouple through explicit injection or a registry to avoid ESM cycles.
- `src/index.ts` is the only promised entry; internal module paths are not public API.

## Public surface

- Named exports only; `export default` is forbidden.
- Export types and values separately: `export type { ... }` / `export { ... }`.
- `package.json#exports` defines the published surface; `tests/exports.test.ts` locks its shape.
- A new export counts as a public contract change and must update the CHANGELOG and docs.

## Platform neutrality

The build targets `platform: 'neutral'` and does not inline Node built-ins:

- Source may reference `node:*` types with `import type`.
- Runtime code avoids `node:` imports; when Node capabilities are needed, split them into a separate subpath entry (such as `./node`) with its own exports.
- Browser and Edge compatibility comes from "zero runtime dependencies plus a neutral build".

## Extending

| Need | Approach |
|---|---|
| Add a subpath entry | Add `src/<name>.ts`, declare it in the tsdown `entry` and in `package.json#exports` |
| Add a CLI | A separate build target, `platform: 'node'`, dependencies inlined through an `onlyBundle` allowlist |
| Add a runtime dependency | Evaluate ESM/CJS duality, tree-shaking, and `sideEffects` at the same time |
| Split into packages | Move to a workspace and centralize versions in a catalog |
