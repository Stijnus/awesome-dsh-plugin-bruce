# DSH 发现页订阅索引

数据源仓库生成和验证索引，个人站点只分发固定 JSON：

- 订阅：`https://bruc3van.com/markets/dsh/index.json`
- 索引生成与排除报告：`https://bruc3van.com/markets/dsh/audit.json`
- 产物：`data/dsh-market-index.json`、`data/dsh-market-index.report.json`

`audit.json` 是保留兼容的旧地址。报告不是 DSH 官方审计认证，不代表安全审查或实机兼容验收。DSH 订阅读取 `index.json`，不消费此报告。

## 生成与来源

```sh
npm ci --ignore-scripts --prefix scripts/host-market
npm test --prefix scripts/host-market
node scripts/host-market/refresh.mjs
```

输入以社区 `data/market-v2.json`（含精选条目）为基础，追加完整已批准目录中具备安装映射的仓库，不受社区 600 条上限限制。补充候选沿用归档、禁用、黑名单及市场排除规则，不以低 Star 排除。所有候选重新核实来源后才收录，同名包去重前按 Star 排序。缺映射及手动安装不自动转换，报告 `candidateSelection` 记录补充仓库、待核实数量及前 200 条预览，输入文件 SHA-256 用于追溯。社区 v1/v2 文件不受影响。

输出使用固定 `@deepseek-ai/dsh-plugin-market-index@0.2.1-alpha.5` 校验。兼容范围复用官方 `dshRange`：优先使用显式 `engines.dsh`，否则求 DSH peerDependencies 范围交集；无约束时省略 engines，不填造 `*`。无效范围或空交集仍排除。

- **npm**：合并重复包名，按 feed 指定的版本或标签解析精确版本；核实 registry 名称、版本、发布时间和 bundle，下载对应 tarball 并校验完整性及实际 manifest，核实 bundle/宿主范围一致。展示信息来自最高收录版本的包文件。不是完整历史版本列表。
- **Git**：只处理 HTTPS 仓库，支持默认分支、明确分支/标签、完整 40 位 commit，以及 `&path:/目录`。引用解析到完整提交后，只从临时裸仓库读取对象；没有检出、安装、生命周期脚本、Git hooks、子模块或 LFS 下载。记录该提交的包 manifest SHA-256 和提交者时间。未指定子目录时按宿主规则发现根包、workspace 或有限深度的组合包。只收录所选提交中的版本，不把仓库历史自动扩展为安装目标。
- **冲突**：同名包优先 npm，其次按目录来源顺序取首个；不混合不同来源的同名包版本。报告标注被排除的重复来源。
- **不支持**：直接 tarball 安装地址、短 commit、无效 URL/目录分别给出明确原因。短 commit 不猜测补全。手动安装说明不转换。

图标最多内联 32 KiB，更大的图标省略并给出警告，现有站点无需新增文件路由。底层文件读取组件来自固定宿主提交，许可证和文件摘要见 [vendor](vendor/README.md)。npm、Git 和核验工具均调用同一官方兼容范围解析器；无范围限制不代表已通过实机兼容验证。

## 报告含义

`reportVersion: 2` 包含报告用途、宿主版本、feed/index SHA-256、npm registry 响应摘要、tarball 完整性证据、Git 提交及 manifest 摘要，以及分类型汇总。

每条诊断都有稳定的 `code`、`status`、`reason` 及可用的 target/name/version/path。`excluded` 是不符合本次收录条件；`unsupported` 是不支持该安装目标；`warning` 是展示字段等非致命问题；`error` 是来源读取失败。缺少兼容声明并不表示插件恶意，读取失败也不表示插件不兼容。

候选统计分别按去重 npm 包和 Git 目标计算；诊断可按版本或路径产生多条，不能把诊断条数当成独立插件数。使用 `indexSha256` 核对报告和索引是否属于同一代。

## 自动更新与失败处理

每日目录更新成功后，经 v2 工作流自动触发；映射、审批、排除规则及生成器变更也触发。每日重新选取完整已批准且已映射候选，不自动修改安装映射，不为凑数降低核验标准。先生成 `.output/host-market/` 候选，校验后才更新 data。来源读取失败、空索引或条目数低于旧索引的 80% 时不覆盖线上数据；失败候选保留为 Actions artifact 7 天。明确不存在或有歧义的引用作为排除记录，不伪装成网络错误。

索引和报告在同一 Git 提交中更新。推送冲突时基于最新 main 重新生成，不复用过期候选。原 v1/v2 和 npm feed 流程独立运行。

Cloudflare Pages Function 只读取 main 上两个固定产物，成功缓存 5 分钟、不重定向；未知路径拒绝，失败为不缓存的 503。源数据提交后即可发布，无需重建个人站点。用户在启用宿主第三方市场后，通过「插件 → 发现 → 管理索引源」添加订阅地址。

## 仓库级分批核验

对 600 条主目录逐仓库检查（包括没有安装映射的条目），每批 200，结果可断点续跑。流程、覆盖边界与结果状态见 [分批核验说明](AUDIT.md)。这是映射修正前的取证步骤，不自动改写安装来源。

## 浏览、检索与筛选

使用 format-1 官方 `metadata.categories / labels / sortKeys` 声明和插件级对应字段：分类沿用目录的 category 与中英文名称；标签为实际发行来源 npm/Git；包 keywords 保留并补充映射的 tasks 关键词。官方搜索也会索引分类、标签的各语言名称。

默认仍按 Star 降序，用户还可以选择「GitHub Star 数」「仓库更新时间」并切换升降序。仓库更新时间来自 snapshot 的 pushed_at，不冒充插件发布时间；发布时间与搜索最佳匹配由宿主原生提供。元数据只使用实际来源所属仓库，缺失时间不填假值。旧宿主是否展示取决于其发现页功能；已用固定 alpha.5 官方 schema 验证。
