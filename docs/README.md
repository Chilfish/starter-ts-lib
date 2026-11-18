# 文档索引

本目录是项目的唯一文档入口。新增文档必须在下表登记一行。

## 三类必写文档

只有以下改动强制先写文档，其余改动当天补 `development-log/`：

1. 公开契约变化（导出面、类型、行为语义）
2. 新增或修改构建/发布流程
3. 事故与可靠性修复（写入 `postmortem/`）

## 工程规范

| 文档 | 说明 | 何时阅读 |
|---|---|---|
| [engineering/architecture.md](./engineering/architecture.md) | 分层、依赖方向、公开面边界 | 新增模块或调整目录前 |
| [engineering/code-style.md](./engineering/code-style.md) | 命名、导入顺序、类型与错误处理 | 每次写代码 |
| [engineering/testing.md](./engineering/testing.md) | 测试分层、命名、覆盖率 | 新增功能或修 bug 时 |
| [engineering/build-and-release.md](./engineering/build-and-release.md) | 双格式构建、产物契约、发布链路 | 改构建配置或发布时 |
| [engineering/git-workflow.md](./engineering/git-workflow.md) | 分支、提交信息、PR 规范 | 提交前 |
| [engineering/release-checklist.md](./engineering/release-checklist.md) | 发版逐项检查表 | 每次发版 |

## 事故复盘

| 文档 | 说明 |
|---|---|
| [postmortem/README.md](./postmortem/README.md) | 复盘索引与高频雷区自查清单 |
| [postmortem/TEMPLATE.md](./postmortem/TEMPLATE.md) | 新复盘模板 |

## 约定

- **文档即事实**：路径、命令、字段必须与当前代码一致；发现过时就地修正。
- **归档制**：失效文档移入 `archive/`，不留在主目录误导读者。
- 新增文档必须同时更新本索引，否则视为未完成。
