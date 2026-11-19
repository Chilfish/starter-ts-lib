# 事故复盘

每次线上/发布事故后写一篇复盘，编号递增：`NNN-short-slug.md`。

## 索引

| 编号 | 主题 | 根因归类 | 一句话教训 |
|---|---|---|---|
| — | 暂无 | — | — |

## 高频雷区自查清单

写代码或改配置前先过一遍：

### 构建与产物

- `tsdown.config.ts` 是否误开 `exports: true`，覆盖了手工维护的 `exports`？
- 新增子路径入口时，`entry` 与 `package.json#exports` 是否同步？
- `platform: 'neutral'` 下是否引入了运行时 `node:*` 导入？

### 依赖与锁文件

- 是否只改了 `package.json` 而忘记更新 `bun.lock`？
- CI 使用 `--frozen-lockfile`，锁文件与 manifest 不一致会直接失败。

### CI / 发布

- action 版本是否真实存在？（`checkout@v4`、`setup-bun@v2`、`setup-node@v4`）
- 发布是否走 OIDC，是否误加了 `NPM_TOKEN` 或 `registry-url`？
- `publishConfig` 是否误写了 `provenance: true`？本地手动 `npm publish` 会因此报 `EUSAGE`；provenance 只由 workflow 的 `--provenance` 开启。
- 首次发布是否走完引导流程（手动发布 → 绑定 Trusted Publisher → 设置 `NPM_OIDC_READY=true`）？未设置变量时 `publish` job 会被跳过。
- CI 里执行 `bun install --production` 时，`prepare`（`lefthook install`）会因 devDependency 缺失而 127；这类 job 要加 `--ignore-scripts`。
- `CHANGELOG.md` 是否有对应版本节？`package.json#version` 与 tag 是否一致？

### 测试

- 新增逻辑是否带测试？
- 是否出现依赖真实网络或真实时间的测试？

### 文档

- 公开契约、构建流程、事故修复是否同步了文档？
- 文档中的命令、路径、字段是否仍与代码一致？

## 写作要求

- 事实优先：时间线、证据、影响范围。
- 根因写到可执行的层面，不写「粗心」。
- 每条教训必须能落到「雷区清单」或 `AGENTS.md` 中。
- 使用 [TEMPLATE.md](./TEMPLATE.md)。
