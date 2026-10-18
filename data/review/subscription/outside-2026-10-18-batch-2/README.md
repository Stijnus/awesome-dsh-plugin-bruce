# 主目录外订阅候选：第 2 批 200 个仓库

600 条主目录之外、已批准、尚未映射的高 Star 仓库按 Star 降序取第 2 批 200 个；检查默认分支、README 安装目标、仓库 manifest 与已有映射。不穷举历史版本，不安装或执行插件，不作安全认证。

固定输入：`data/repositories.json` SHA-256 `ec0f4ddd67026b80d3a1efc79a52b4d61d9f7a74406c0c4636e90c671e443167`，`data/approved.json` SHA-256 `0a50beb824dee020fbfd19d4d7d5a9cd0983a7374de59d70dca7dab8e1eed761`，本批应用前 `data/packages.json` SHA-256 `217613807501289789c7143dbc55c7aa599b1a65a9f6a3d422db9d57fd11ad73`；审计记录时间从 2026-10-17T19:03Z 起（UTC）。

## 结果

| 结论 | 仓库数 |
| --- | ---: |
| 显式声明包含 0.2.1-alpha.5 | 73 |
| 未声明 engines.dsh（官方规则不受限） | 85 |
| 声明范围不含 0.2.1-alpha.5 | 31 |
| 未找到合格 bundle | 9 |
| 需手动安装复核 | 2 |

- 合格元数据候选共 **374 条**：npm 131 条、根目录 Git 170 条、Git 子目录 54 条、独立 Git target 19 条。
- 本批补映射 **73 个仓库、89 个插件包**：65 个固定 npm 版本、24 个固定 Git 提交。多包仓库 3 个：`klarkxy/dsh-plugins`（14）、`fyjgtddco/DSH-SW-and-CAD`（3）、`sgzeng/pbfuzz`（2）。
- 订阅索引由 546 增至 **634** 个插件包，`fetchFailures: 0`。89 个映射包均进入索引；其中 `@klarkxy/dsh-zhihu` 与第 1 批 `klarkxy/zhihu-search` 映射同包，按同名包去重后净增 88。
- **85 个仓库**只有未声明 `engines.dsh` 的来源，按官方 `dshRange` 规则属于不受限；保留在 `unconstrained-pending.json`，未自动映射。
- **31 个仓库**的已检查候选声明范围不包含 `0.2.1-alpha.5`；不代填范围，等待上游发布兼容版本后复核。
- **11 个仓库**未形成可直接收录的合格 bundle：9 个未找到，2 个需手动安装复核；不等于不兼容。

## 身份与来源说明

- `HuanLinOTO/dsh-plugin-yet-another-subagent`、`HuanLinOTO/dsh-plugin-ya-workspace-sidebar` 的 npm 元数据未提供 repository/homepage；已核对 README 安装目标与仓库 manifest 的包名一致，映射记录附注说明。
- `klarkxy/dsh-plugins` 的 14 个包中 13 个使用 npm，`@klarkxy/dsh-shortcuts` 使用固定 Git 子目录；`@klarkxy/dsh-zhihu@0.2.5` 与第 1 批 `klarkxy/zhihu-search` 映射同包，索引按包名去重。
- `RSLN-creator/dsh-web-bridge` 同时存在 npm `dsh-webcode-bridge@0.19.76` 和仓库子包 `0.19.92`；按“npm 优先、固定版本”策略使用 npm。
- `luweiyabo/dsh-whale-pet` 的 npm 源两次超时，改用已核验的固定 Git commit。
- `fyjgtddco/DSH-SW-and-CAD`、`sgzeng/pbfuzz` 的 README 未提供可直接使用的固定发行版本；`WLV-ZEDD/dsh-chatgpt-web` 的 README 指向另一个上游仓库，但本仓库 manifest 提供独立包 `@wlv-zedd/dsh-chatgpt-web`。三者均采用已核验 manifest 的固定提交，状态标为 `repo-fallback`。

## 证据

- [审计计划](plan.json)
- [逐仓库证据](repos/)
- [原始汇总](summary.json)
- [本批已应用的 89 条映射](mappings.json)
- [未声明范围的 85 个仓库](unconstrained-pending.json)
- [兼容性分类明细](compatibility.json)

来源取证、元数据合格、实际运行兼容和安全审查是不同阶段；本报告只完成第一项。
