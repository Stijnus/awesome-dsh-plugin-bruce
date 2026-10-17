# 每批 200 个仓库的订阅资格核验

这是数据源维护者的取证流程，不是插件安全审计，也不直接修改 `data/packages.json` 或订阅索引。未映射和手动安装仓库同样读取源代码；不能把未检查记为不合格。

## 固定批次与续跑

```sh
npm ci --ignore-scripts --prefix scripts/host-market
npm test --prefix scripts/host-market
node --import ./scripts/host-market/node_modules/tsx/dist/loader.mjs scripts/host-market/audit.mjs --batch 1 --size 200
node --import ./scripts/host-market/node_modules/tsx/dist/loader.mjs scripts/host-market/audit.mjs --batch 2 --size 200
node --import ./scripts/host-market/node_modules/tsx/dist/loader.mjs scripts/host-market/audit.mjs --batch 3 --size 200
node --import ./scripts/host-market/node_modules/tsx/dist/loader.mjs scripts/host-market/audit.mjs --summary
```

默认每批 200、并发 6、请求超时 60 秒；`--timeout-ms 120000` 可用于重试较大的仓库（范围 1–300 秒）。`--concurrency` 可设置 1–12。批次固定到完整 `market-v2.json` SHA-256，保存到 `data/review/subscription/<摘要前12位>/plan.json`。第一批优先无映射、手动安装及已知异常引用，之后保持原目录顺序。每个主目录仓库只占一个序号，精选目录不另计入这 600 个仓库。

每完成一个仓库就原子保存一份 `repos/NNN.json`。同一批再次运行时跳过完成记录，只补缺失项、重试失败项；`--refresh` 强制重查整批；`--retry-only` 只处理已保存的失败项，不开始尚未检查的仓库。输入快照变化时自动进入新的运行目录，不混用两次批次。当前完成记录是当次取证结果，不能当作未来持续有效的认证。

## 检查范围

1. 解析仓库当前默认分支为完整 commit，在临时裸仓库读取对象，不检出、安装或执行插件。
2. 按宿主规则检查根 bundle、声明的 workspace，以及不超过三层的备用包目录。记录 manifest 地址、摘要、包名、版本与显式 `engines.dsh`。不从 peers 推导范围。
3. 读取当前提交中存在的中英文 README，并补查根 README 显式链接的同仓库 README（最多 40 个路径，拒绝外链和父目录路径）。记录摘要，按已发现 manifest 包名补充安装目标，避免仓库名与 npm 包名不同造成遗漏；保留命令但不执行。
4. 对已有映射与提取到的 npm 目标核实版本、bundle、发布时间、宿主声明和 tarball 完整性；对明确的 Git 引用与子目录核实固定提交。
5. 比较 README 提取结果与现有映射。没提取到旧命令只产生复核建议，不能单凭提取器结果删除映射。

**不穷举全部历史 tag、分支或 npm 历史版本，不执行实际安装与启动，不证明仓库是无风险插件。** 手动步骤、依赖和构建需求仍需在改安装映射前复核。读取或验证错误必须保留为未完成，不能算作上游缺少兼容声明。

## 结果与下一步

| outcome | 意义 | 下一步 |
| --- | --- | --- |
| `mapping_can_be_added` | 原本无标准映射，但发现元数据合格来源 | 数据源维护者核对安装步骤后补映射 |
| `eligible_source_verified` | 至少一个来源通过元数据取证 | 查看映射差异，核对能否由当前订阅生成器覆盖 |
| `needs_upstream_declaration` | 找到 bundle，但显式宿主声明缺失或无效 | 查看具体 manifest；由对应包维护者确认并声明兼容范围 |
| `template_or_example_review` | 包名或路径显示模板/示例特征 | 人工确认其用途，不能仅凭元数据格式合格上架 |
| `manual_install_review` | 仅有手动步骤或本地安装形式 | 维护者区分可标准化 bundle 与额外配置/拷贝步骤 |
| `no_eligible_bundle_found` | 在明确检查范围内未找到合格 bundle | 核查根 manifest、README 和路径，不能推断整个历史都不存在 |
| `retry_required` | 来源读取或核验失败 | 按错误原因重试或人工排查，不计入完成 |

`eligible_source_verified` 不代表所有候选都通过；逐个候选的状态及 `mappingFindings` 仍需查看。一个仓库可以有多个包和安装目标，因此仓库数、候选数与订阅包数不能混算。`declaredCompatibleWithHost` 仅判断作者范围是否包含 alpha.5，不代表实机测试。

核验报告先进入仓库供复核。确认修正后才更新映射、重新生成 v2 与订阅索引，执行验证并发布。不会自动替第三方包添加 `engines.dsh`，也不会自动联系作者。

`triage.json` 汇总待修映射、模板/示例标记及可核实来源，供维护者逐项处理。`--summary` 根据已保存证据更新分类，不重新抓取网络内容。

对大仓库可使用 `--github-api`，通过 `gh api` 读取固定 commit、完整树和按需 blob，并校验 blob Git 摘要；拒绝截断的树，不下载整个仓库。此模式需可用的 GitHub CLI 身份认证，不更改认证配置。使用相同的 manifest/README 解析规则。

## 本轮已完成报告

[600 个仓库的三批结论](../../data/review/subscription/28cd5ad09527/README.md)。目录内保存原始 `feed.snapshot.json`，其字节摘要与 plan 一致。`summary.json` 的 manualReviewRequired 是自动规则触发数，包含版本差异等交叉标记；不是未读取仓库数。人工分发判断与处理结论以 `review-results.json` 为准。
