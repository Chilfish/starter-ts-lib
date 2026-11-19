# 发版检查表

按顺序逐项确认，任何一项失败都停下修复，不要跳步。

## 发版前

- [ ] `main` 上工作区干净，与 `origin/main` 一致
- [ ] `CHANGELOG.md` 的 `## Unreleased` 已写全本版变化
- [ ] 破坏性变更已在 CHANGELOG 与文档中标注
- [ ] 公开导出面变化已更新 `tests/exports.test.ts`

## 本地门禁

```bash
bun install --frozen-lockfile
bun run check
bun run check:docs
```

- [ ] 全部通过
- [ ] `dist/` 下存在 `index.js` / `index.cjs` / `index.d.ts` / `index.d.cts`
- [ ] `bun run verify:package` 通过
- [ ] 本地 `node -e "require('./dist/index.cjs')"` 与 ESM 导入均成功

## 发版

```bash
bun run release
```

- [ ] `bumpp` 完成版本升级、提交与 tag
- [ ] tag 已推送（`git push --follow-tags`）
- [ ] GitHub Actions `Publish` 通过（或在 `NPM_OIDC_READY` 未设置时跳过）
- [ ] npm 上可以 `npm view <pkg>@<version>` 查到
- [ ] 创建 GitHub Release，notes 取自 CHANGELOG 对应版本节

### 仅首次发布

- [ ] 从 tag 手动发布（`npm publish --access public`）；在 `NPM_OIDC_READY` 变量存在前，workflow 的 `publish` job 会被跳过
- [ ] 为「本仓库 + `publish.yml`」配置 npm Trusted Publisher
- [ ] 创建仓库变量 `NPM_OIDC_READY=true`

## 回滚

- 已发布版本不可撤下时，发布新的 patch 版本修复，不覆盖已有版本。
- 需要废弃版本时使用 `npm deprecate`，并说明替代版本。
