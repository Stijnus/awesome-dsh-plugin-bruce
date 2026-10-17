# 官方 DSH 发现索引

数据源仓库拥有生成、校验和更新流程。`bruc3van-web` 只提供固定地址，不重新生成目录：

- 订阅地址：`https://bruc3van.com/markets/dsh/index.json`
- 审计报告：`https://bruc3van.com/markets/dsh/audit.json`
- 仓库产物：`data/dsh-market-index.json`、`data/dsh-market-index.report.json`

## 本地生成

```sh
npm ci --ignore-scripts --prefix scripts/host-market
npm test --prefix scripts/host-market
node scripts/host-market/refresh.mjs
```

使用宿主 `0.2.1-alpha.5` 的官方 `parseMarketIndex` 校验 format-1 输出；依赖独立锁在本目录，不影响原有零安装目录脚本。输入是 `data/market-v2.json`，包括精选条目。原 v1/v2 和 npm feed 发布流程继续独立工作。

生成器只读取 npm 元数据，不下载或执行包。包名、版本、bundle patch、发布时间必须可核实；`engines.dsh` 必须由 manifest 显式声明，不从 peer 推断，也不把未知范围替换为 `*`。裸包名按当次 registry 的 latest 固定版本，显式 tag 按当次 tag 固定版本；重复目标合并，只列 feed 指定的版本或标签目标，不宣称包含完整版本历史。

Git/分支/tarball 目标暂不发布：它们需额外核实固定 commit、该 commit 的 manifest 与提交时间。手动安装目标不转换。缺少元数据、未声明 bundle 或兼容范围的版本写入排除报告。展示描述取最高已收录版本的 manifest；没有核实的 locale、图标和作者简写省略。

## 自动更新与失败处理

`refresh-host-market.yml` 在 v2 更新工作流成功结束后运行（包括每日刷新），支持手动触发及生成器变更触发。仅在 main 上发布数据。先生成 `.output/host-market/` 候选，再复制到 data；网络读取失败、空索引或条目少于上次的 80% 会让任务失败，保留已发布数据。骤减需要维护者审查候选诊断后明确更新基线，不自动放宽规则。

工作流在单个 Git 提交内更新索引和报告，推送冲突时从新 main 重新生成，不 rebase 旧产物。失败诊断作为 Actions artifact 保留 7 天。报告记录源 feed SHA-256、registry 响应 SHA-256/获取时间、排除原因和最终索引的 `indexSha256`；索引与报告可通过该摘要核对。

## HTTPS 分发

站点的 Pages Function 从本仓库 main 的固定 raw URL 读取两份产物，返回 JSON 本体，不重定向。成功响应缓存 5 分钟（上游和客户端各有缓存窗口）；未知路径拒绝，失败返回不缓存的 503。站点只需首次发布路由，之后数据提交即可供该地址读取，无需跨仓库 token 或每次重建个人站点。

用户需先启用宿主第三方市场功能，再在「插件 → 发现 → 管理索引源」中添加订阅地址。收录及满足声明的版本范围不等于安全审查或实机兼容验收。
