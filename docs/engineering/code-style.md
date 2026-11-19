# Code style

ESLint (antfu config) owns all formatting and style checks; no Prettier. Git hooks are managed by lefthook (see `lefthook.yml`).

## Basics

- Single quotes, no semicolons, 2-space indent.
- Single-statement `if` has no braces.
- Import order: external dependencies -> internal modules -> relative paths.
- Type imports must use `import type` / `export type` (`verbatimModuleSyntax`).
- No `any`; when the shape is unknown, use `unknown` plus type guards, narrowed at boundaries.

## Naming

| Kind | Rule | Example |
|---|---|---|
| Variable / function | camelCase | `parseResponse` |
| Type / interface | PascalCase, no `I` prefix on interfaces | `RequestOptions` |
| Constant | UPPER_SNAKE only for true global constants | `DEFAULT_TIMEOUT` |
| File | kebab-case or domain name | `build-and-release.md`, `id-codec.ts` |
| Test | `*.test.ts`, the case name describes the behavior | `returns null for empty input` |

## Modules

- One main responsibility per file; a block comment at the top explains why the file exists and where its boundary is.
- Do not write comments that explain nothing (such as `// increment i`).
- Group with `/** Section */`, not `// ----` separators.
- Internal helpers are not exported unless they are worth testing on their own.

## Types

- Express polymorphism with a discriminated union, not a pile of optional fields.
- Optional fields use `?`; explicit nullability uses `| null`. Do not mix the two.
- Export public types together; do not leak implementation details.

## Error handling

- No bare `throw new Error()`; define an error type with a `code` or use a shared error factory.
- Error messages must locate themselves: include the object id, name, and path.
- Validate at boundaries (user input, external responses); trust the type system internally.
- In batch operations, log each failure and continue, then report a summary at the end.
