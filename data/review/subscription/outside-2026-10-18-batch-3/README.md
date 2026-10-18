# 主目录外订阅候选：第 3 批 200 个仓库

600 条主目录之外、已批准、尚未映射的高 Star 仓库按 Star 降序取第 3 批 200 个；检查默认分支、README 安装目标、仓库 manifest 与已有映射。不穷举历史版本，不安装或执行插件，不作安全认证。

固定输入：`data/repositories.json` SHA-256 `ec0f4ddd67026b80d3a1efc79a52b4d61d9f7a74406c0c4636e90c671e443167`，`data/approved.json` SHA-256 `0a50beb824dee020fbfd19d4d7d5a9cd0983a7374de59d70dca7dab8e1eed761`，本批应用前 `data/packages.json` SHA-256 `d9db226034bb9470facffe4c0c60fc59112796f376b4612b6744af6601271e1e`；审计记录从 2026-10-18T01:56Z 起（UTC），人工身份复核与索引重生成完成于 2026-10-18。

## 审计结果

| 结论 | 仓库数 |
| --- | ---: |
| 显式声明包含 0.2.1-alpha.5 | 61 |
| 未声明 engines.dsh（官方规则不受限） | 87 |
| 声明范围不含 0.2.1-alpha.5 | 42 |
| 未找到合格 bundle | 9 |
| 模板/示例，需人工处理 | 1 |

- 合格元数据候选共 **386 条**：npm 132 条、根目录 Git 174 条、Git 子目录 52 条、独立 Git target 28 条。
- 61 个显式兼容仓库形成 **64 个映射候选**：48 个固定 npm 版本、16 个固定 Git 提交。仓库证据状态为 55 个 `readme-verified`、6 个 `repo-fallback`；64 条全部完成身份复核。
- 87 个只有未声明 `engines.dsh` 来源的仓库保留在 `unconstrained-pending.json`，未自动映射。
- 42 个仓库的候选声明范围不含 `0.2.1-alpha.5`；不代填范围，等待上游发布兼容版本后复核。
- 9 个仓库未找到合格 bundle；1 个模板仓库（`Horizon215/dsh-plugins`）的候选包名仍为 `@your-scope/...` 占位名，不能作为真实安装目标。

## 应用结果

- 已向 `data/packages.json` 写入 **61 个仓库、64 个包**；条目数由 674 增至 **735**，包数由 833 增至 **897**。写入后的 `data/packages.json` SHA-256 为 `deb4a1097a9bff67a7d35f366ada17a112c7262ec16e38bad0dc6d34e1964291`。
- 订阅索引由 **634 增至 697**，`fetchFailures: 0`，读取错误为 0；生成时间 `2026-10-18T02:19:10.177Z`。索引 SHA-256 `8c0dee4c27fc48980d271be2f92d0f49e77bda0e08ce062898a7850950e0c285`。
- 64 个映射中 63 个的精确版本已被索引核实；**62 个成为新的插件名**。索引净增 63 的另外 1 个是既有映射 `roarpeng/graphflow` 的上游新提交新增了 `@roarpeng/graphflow-dsh`，不属于本批 200 个仓库。
- 61 个本批仓库全部出现在报告的 `candidateSelection.additionalMappedRepositories` 中。`data/market-v2.json` 的 600 条社区目录未变。
- `dsh-file-upload` 的 Git 候选与既有 npm 来源同名；索引按“npm 优先”保留 npm，Git 来源记录为 `duplicate_package`，未新增条目。
- `dsh-relay@0.2.1` 与既有 `sorsama/deepseek-harness-mobile` 映射属于同名 npm 包；本批补充固定 selector，不新增同名插件。

## 身份复核

以下 5 个原标记 `identityReview` 的包已完成人工核验，均写入映射；判定只说明可追溯的包与仓库身份，不代表安全审查或安装验收：

- `xiaozhuyuqing/dsh-repeat-guard`：npm 无 repository/homepage；维护者 `xiao-zhu-yuqing` 与 GitHub 所有者对应，author `yuqing`、包名、最新版本、描述和 README 目标一致。
- `pbwheel/dsh-workbuddy-expert`：npm 无 repository/homepage；维护者、包名、最新版本、描述和 README 目标一致。
- `ly6170/dsh-messager`：npm 无 repository/homepage；维护者、包名、最新版本、描述和 README 目标一致。
- `Victor-770/dsh-commandcode-provider`：npm 记录的 `Kristin130/dsh-commandcode-provider` 已被 GitHub 重定向到当前 `Victor-770/dsh-commandcode-provider`；包名、版本和 README 目标一致。
- `dsh-plugin-lab/dsh-workbuddy-bridge`：npm 记录的 `zlZayn/dsh-workbuddy-bridge` 已被 GitHub 重定向到当前 `dsh-plugin-lab/dsh-workbuddy-bridge`；包名、版本和 README 目标一致。

## 重试与人工判读

原始审计有 3 个 `retry_required`，均为不可通过重试解决的安装目标问题；`unresolvedReadErrors` 为 0。已按证据重新归类：

- `x2802490130-prog/dsh-tool-writing`：npm `dsh-tool-writing@0.8.1` 的 tarball `package.json` 名称与包名不一致，且无其它合格来源 → 计入“未找到合格 bundle”。
- `omdsh-dev/dsh-tool-calculator`：README 的 `https://github.com/omdsh-dev/...` 是占位链接且不可访问；仓库候选声明 `>=0.0.1-rc.1 <0.2.0`，不含 `0.2.1-alpha.5` → 计入“声明范围不含”。
- `turtle1999/turtle-ui`：README 指向的 `deepseek-harness/turtle-ui` 不存在；仓库候选声明 `^0.0.1`，不含 `0.2.1-alpha.5` → 计入“声明范围不含”。

## 证据

- [审计计划](plan.json)
- [逐仓库证据](repos/)
- [原始汇总](summary.json)
- [兼容性分类明细](compatibility.json)
- [未声明范围的 87 个仓库](unconstrained-pending.json)
- [重试/模板人工判读](triage.json)
- [未修改的原始映射候选计划](mapping-candidates.json)（按设计保持 `applied: false`）
- [本批已应用的 64 条映射](mappings.json)
- [5 个身份复核决定](identity-review.json)

来源取证、元数据合格、实际运行兼容和安全审查是不同阶段；本报告只完成来源取证、身份归并与索引生成验收。
