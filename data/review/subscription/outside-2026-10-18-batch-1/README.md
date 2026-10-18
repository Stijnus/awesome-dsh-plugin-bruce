# 主目录外订阅候选：第 1 批 200 个仓库

600 条主目录之外、已批准、尚未映射的高 Star 仓库按 Star 降序取第 1 批 200 个；检查默认分支、README 安装目标、仓库 manifest 与已有映射。不穷举历史版本，不安装或执行插件，不作安全认证。

固定输入：`data/repositories.json` SHA-256 `ec0f4ddd67026b80d3a1efc79a52b4d61d9f7a74406c0c4636e90c671e443167`，`data/approved.json` SHA-256 `0a50beb824dee020fbfd19d4d7d5a9cd0983a7374de59d70dca7dab8e1eed761`；审计记录时间从 2026-10-17T18:14Z 起（UTC）。

## 结果

| 结论 | 仓库数 |
| --- | ---: |
| 显式声明包含 0.2.1-alpha.5 | 68 |
| 未声明 engines.dsh（官方规则不受限） | 78 |
| 声明范围不含 0.2.1-alpha.5 | 43 |
| 未找到合格 bundle | 11 |

- 合格元数据候选共 **393 条**：npm 140 条、根目录 Git 187 条、Git 子目录 66 条。
- 本批补映射 **68 个仓库**：54 个固定 npm 版本、14 个固定 Git 提交；订阅索引由 478 增至 **546** 个插件包，`fetchFailures: 0`。
- **78 个仓库**只有未声明 `engines.dsh` 的来源，按官方 `dshRange` 规则属于不受限；保留在 `unconstrained-pending.json`，下一轮按包名冲突、来源身份和安装范围继续复核。
- **43 个仓库**的已检查候选声明范围不包含 `0.2.1-alpha.5`；不代填范围，等待上游发布兼容版本后复核。
- **11 个仓库**在当前检查范围内未找到合格 bundle；不等于不兼容，保留待查。

## 证据

- [审计计划](plan.json)
- [逐仓库证据](repos/)
- [原始汇总](summary.json)
- [本批已应用的 68 条映射](mappings.json)
- [未声明范围的 78 个仓库](unconstrained-pending.json)
- [兼容性分类明细](compatibility.json)

来源取证、元数据合格、实际运行兼容和安全审查是不同阶段；本报告只完成第一项。
