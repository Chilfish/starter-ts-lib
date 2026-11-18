# starter-ts-lib

> 现代 TypeScript 库脚手架：tsdown 构建、Vitest 测试、ESLint 统一风格、Bun 安装、OIDC 一键发布。

## 特性

- **双格式产物** — 同时产出 ESM（`dist/index.js`）与 CJS（`dist/index.cjs`），各自带独立类型声明。
- **零运行时依赖** — `dependencies` 为空，工具链全部留在 `devDependencies`。
- **严格类型** — `strict` + `verbatimModuleSyntax`，强制 `import type` / `export type`。
- **格式化即 lint** — antfu ESLint 配置接管格式化，不需要 Prettier。
- **提交即校验** — `lefthook` 在 pre-commit 对暂存文件执行 `eslint --fix`，pre-push 跑构建。
- **发布即门禁** — tag 触发 CI，校验版本与 CHANGELOG 后通过 OIDC 发布并附带 provenance。

## 快速开始

### 安装

```bash
bun install
```

### 开发命令

```bash
bun run dev          # tsdown watch 构建
bun run typecheck    # tsc --noEmit
bun run lint         # eslint . --fix
bun run lint:check   # eslint .（CI 用）
bun run test         # vitest run
bun run test:coverage
bun run build        # 产出 dist/
```

### 使用

```ts
import { one, two } from 'starter-ts-lib'

console.log(one + two)
```

## 目录结构

```
src/                 # 库源码，唯一公开入口 src/index.ts
tests/               # 测试，目录镜像 src/，*.test.ts
docs/                # 内部文档（工程规范、决策、事故复盘）
.github/workflows/   # ci.yml / publish.yml
tsdown.config.ts     # 构建配置
vitest.config.ts     # 测试与覆盖率配置
eslint.config.js     # 代码风格与格式化
```

## 发布流程

1. 在 `CHANGELOG.md` 的 `## Unreleased` 写清本次变化。
2. 运行 `bun run release`，`bumpp` 会升级版本、提交、打 tag 并推送。
3. 推送的 `v*` tag 触发 `publish.yml`：校验 tag 与 `package.json`、CHANGELOG 版本节、全量门禁，然后 `npm publish --provenance`。

首次发布前需要在 npm 包设置里配置 Trusted Publisher（GitHub Actions）。

## 文档

- [docs/README.md](./docs/README.md) — 文档索引与「何时阅读」
- [docs/engineering/architecture.md](./docs/engineering/architecture.md) — 架构与分层
- [docs/engineering/code-style.md](./docs/engineering/code-style.md) — 代码风格
- [docs/engineering/testing.md](./docs/engineering/testing.md) — 测试规范
- [docs/engineering/build-and-release.md](./docs/engineering/build-and-release.md) — 构建与发布
- [LICENSE.md](./LICENSE.md) — MIT
