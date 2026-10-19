# 待审核仓库 / Pending review

> 新增到 `dsh-plugin` Topic 下、带有简介、尚未经维护者核实的仓库。本文件由 `scripts/update.mjs` 每日刷新，仅供审核使用，不是用户可见页面。
>
> Repositories newly added to the `dsh-plugin` topic that the maintainer has not verified yet. Refreshed daily by `scripts/update.mjs`; review-only, not a user-facing page.

- 生成时间 / Generated: **2026-10-19**
- 快照日期 / Snapshot date: **2026-10-19 (UTC)**
- 待审核 / Pending: **490**
- 从快照消失的已核准仓库 / Approved repositories missing from the snapshot: **54**
- Star 异常增长 / Star-growth alerts: **14** — 先看下方告警节 / see the alert section first

审核决定记到数据文件后运行 `node scripts/merge.mjs` 生效：

- 通过 → 加入 [data/approved.json](../approved.json)（`"owner/name": "YYYY-MM-DD"`）
- 剔除 → 加入 [data/curated.json](../curated.json) 的 `excluded_repos`，理由只写「不是 DSH 插件 + 它是什么」，并同步从 `approved.json` 移除
- 只进目录、不进榜单 → 加入 `approved.json` + `curated.json` 的 `leaderboard_exclusions`
- desktop 客户端 / 桌面壳 / 启动器 → `leaderboard_exclusions`（TOP200 与下游市场都不出现）
- market 类（插件市场、商店、技能商城、内置市场的桌面端等）→ `leaderboard_exclusions` + `market_exclusions` 留底（市场不能包含市场）
- 其余非插件形态（手册教程、Docker、VS Code 扩展、配套工具等）与无安装路径的通用工具 → `excluded_repos` 整体剔除（同步从 `approved.json` 移除）
- 目录站 / awesome-list / 榜单站（如 `awesome-dsh-plugin*` 系列）→ `excluded_repos` 整体剔除，不留目录
- Star 异常增长（见告警节）→ 先做增强分析；热度并非来自 DSH 插件本身时，核准也加入 `leaderboard_exclusions`

完整约定见 [data/review/README.md](./README.md)。

Record decisions in the data files, then run `node scripts/merge.mjs`:

- Approve → add to [data/approved.json](../approved.json) (`"owner/name": "YYYY-MM-DD"`)
- Exclude → add to `excluded_repos` in [data/curated.json](../curated.json) — the reason just states "not a DSH plugin + what it is" — and remove it from `approved.json`
- Catalog-only (not in the board) → add to `approved.json` + `leaderboard_exclusions` in `curated.json`
- Desktop client / shell / launcher → `leaderboard_exclusions` (absent from both TOP200.md and the downstream market)
- Market class (plugin market, store, skill mall, desktop with a built-in market) → `leaderboard_exclusions` + a `market_exclusions` backstop entry (the market cannot include another market)
- Other non-plugin forms (handbooks, Docker, VS Code extensions, companion tooling) and generic tools without a DSH install path → `excluded_repos` outright (also removed from `approved.json`)
- Directory sites / awesome-lists / leaderboards (e.g. the `awesome-dsh-plugin*` family) → `excluded_repos` outright
- Star-growth alerts (see the section below) → extra analysis first; if the stars are not from the DSH plugin itself, approve into `leaderboard_exclusions` as well

See [data/review/README.md](./README.md) for the full convention.

## ⚠️ Star 异常增长 / Star-growth alerts

**审查员请先看本节。** 对照上一份快照，把「一天内 +100★」或「突然进入 / 大幅跃升榜单」的仓库单独列出。这些条目**必须做增强分析**后再决定，不要只看 README 就核准进榜。

**Reviewers: start here.** Repositories that gained ≥100 stars in one snapshot interval, or that would suddenly appear on / leap up the star board. Do extra analysis before approving them onto the board — a README check is not enough.

对比上一份快照 **2026-10-18** / vs previous snapshot **2026-10-18**。规则：日增 ≥100★；已核准仓新入 Top 200（且 Δ≥50）/ 名次跃升 ≥50 / 冲入 Top 20；待审仓 ≥100★ 且核准后将进入 Top 200。

- 看 Star 是否与 fork、提交活跃度、仓库年龄匹配（高星零 fork、创建当天几百星，多为刷星）
- 是否把已有高星的通用项目贴上 `dsh-plugin` Topic 蹭榜——插件本身可进目录，但应加入 `leaderboard_exclusions`，理由写清 stars accrued as …
- 待审仓若核准会直接冲进 Top 20 / Top 200，先确认热度来自 **DSH 插件本身**
- 已核准仓的异常跃升：确认后同样可记入 `leaderboard_exclusions`，不必下架目录

Check stars against forks, commit activity and age (hundreds of stars on day one, or high stars with zero forks, usually look bought). A generic high-star project that only just tagged `dsh-plugin` can stay in the catalog but should go to `leaderboard_exclusions` (reason: stars accrued as …). If approving a pending repo would drop it into Top 20 / Top 200, confirm the audience is the DSH plugin itself.

- 告警数 / Alerts: **14**

| Project | Queue | Stars | Δ | Forks | Age | Signals | 审核提示 / Hint |
| --- | --- | ---: | ---: | ---: | ---: | --- | --- |
| ⚠️ [WestFox-AwA/dsh-wish-specializer](https://github.com/WestFox-AwA/dsh-wish-specializer) | 待审 / pending | 130 | +5 | 12 | 37d | 待审高星 | 核准即榜 #138 |
| ⚠️ [Ebony-Vinyl/dsh-our-free-model](https://github.com/Ebony-Vinyl/dsh-our-free-model) | 已核准 / approved | 27587 | +3063 | 588 | 24d | 日增百星 | 日增 +3063★；已不进榜单 |
| ⚠️ [PC2005-cloud/dsh-pet](https://github.com/PC2005-cloud/dsh-pet) | 已核准 / approved | 2772 | +926 | 181 | 65d | 日增百星 | 日增 +926★ |
| ⚠️ [dataelement/dsh-desktop](https://github.com/dataelement/dsh-desktop) | 已核准 / approved | 15535 | +359 | 527 | 66d | 日增百星 | 日增 +359★；已不进榜单 |
| ⚠️ [dsh-market/dsh-market](https://github.com/dsh-market/dsh-market) | 已核准 / approved | 7465 | +271 | 292 | 65d | 日增百星 | 日增 +271★；已不进榜单 |
| ⚠️ [sixtysevenlf/dsh-blender-plugin](https://github.com/sixtysevenlf/dsh-blender-plugin) | 已核准 / approved | 809 | +255 | 33 | 35d | 日增百星 | 日增 +255★ |
| ⚠️ [T-Auto/dsh-ops](https://github.com/T-Auto/dsh-ops) | 已核准 / approved | 3284 | +235 | 90 | 10d | 日增百星 | 日增 +235★ |
| ⚠️ [QingYunA/answer-me-with-html](https://github.com/QingYunA/answer-me-with-html) | 已核准 / approved | 3886 | +199 | 270 | 16d | 日增百星 | 日增 +199★；已不进榜单 |
| ⚠️ [MeteorNOX/DeepSeek-Balance-Whale-Widget](https://github.com/MeteorNOX/DeepSeek-Balance-Whale-Widget) | 已核准 / approved | 5414 | +152 | 186 | 61d | 日增百星 | 日增 +152★；已不进榜单 |
| ⚠️ [ranxianglei/billion-context](https://github.com/ranxianglei/billion-context) | 已核准 / approved | 2003 | +147 | 173 | 73d | 日增百星 | 日增 +147★；已不进榜单 |
| ⚠️ [ccch1mneyyy/dsh-TUI](https://github.com/ccch1mneyyy/dsh-TUI) | 已核准 / approved | 4940 | +138 | 270 | 66d | 日增百星 | 日增 +138★ |
| ⚠️ [anywhere-labs/Agents-Anywhere](https://github.com/anywhere-labs/Agents-Anywhere) | 已核准 / approved | 1887 | +120 | 183 | 149d | 日增百星 | 日增 +120★；已不进榜单 |
| ⚠️ [Fei2411/DeepSeek-Bot](https://github.com/Fei2411/DeepSeek-Bot) | 已核准 / approved | 2583 | +113 | 249 | 11d | 日增百星 | 日增 +113★ |
| ⚠️ [corrinehu/dsh-workbuddy-connect](https://github.com/corrinehu/dsh-workbuddy-connect) | 已核准 / approved | 1427 | +105 | 136 | 62d | 日增百星 | 日增 +105★ |


| # | Project | Stars | Created | First seen | Description |
| ---: | --- | ---: | ---: | ---: | --- |
| 1 | [WestFox-AwA/dsh-wish-specializer](https://github.com/WestFox-AwA/dsh-wish-specializer) ⚠️ | 130 | 2026-09-11 | 2026-10-19 | 许愿特化器 · Wish Specializer — DSH 插件：让模型更出色地，不误解你的意思地，完成你的“愿望”。在短提示词+自带的Wish预设（PTC也可以）+重度的情况下，可以起到巨大的表现增益 |
| 2 | [ds-hu/dsh-acp-paseo](https://github.com/ds-hu/dsh-acp-paseo) | 13 | 2026-08-14 | 2026-10-19 | The most feature-complete DeepSeek Harness – Paseo integration project. |
| 3 | [chenyth/shenhuoai-skills](https://github.com/chenyth/shenhuoai-skills) | 8 | 2026-08-18 | 2026-10-19 | 神火AI系统skill |
| 4 | [Yinxe/dshp](https://github.com/Yinxe/dshp) | 7 | 2026-09-11 | 2026-10-19 | DeepSeek Harness (DSH) plugins monorepo (pnpm + TypeScript) |
| 5 | [DPH-1121/dsh-opencode-go-plus](https://github.com/DPH-1121/dsh-opencode-go-plus) | 5 | 2026-09-18 | 2026-10-19 | OpenCode Go model provider for DeepSeek Harness - a maintained fork that keeps the model catalog reachable and configures itself from Settings &gt; Models |
| 6 | [ds-hu/dsh-better-workspaces](https://github.com/ds-hu/dsh-better-workspaces) | 5 | 2026-09-08 | 2026-10-19 | Git workspace enhancements for the DeepSeek Harness (dsh) Web GUI: worktree staging, sidebar git badges, files &amp; diff conversation views, paseo-style PR actions |
| 7 | [Rosynb666/dsh-whale-catch](https://github.com/Rosynb666/dsh-whale-catch) | 4 | 2026-10-19 | 2026-10-19 | 深海鱼篓：不用 agent 登记，自动收进本场会话产出的文件——右侧栏预览、一键打包 zip、归档。Zero-registration deliverable basket for DeepSeek Harness. |
| 8 | [w-j-y-wjy/dsh-glass-weather](https://github.com/w-j-y-wjy/dsh-glass-weather) | 4 | 2026-10-04 | 2026-10-19 | DeepSeek Harness（DSH）原生 Cordis 插件：在会话顶栏放一颗 30px 玻璃天气胶囊，并注册 get_weather 工具 |
| 9 | [bennett-dsh/dsh-plugin-usage](https://github.com/bennett-dsh/dsh-plugin-usage) | 3 | 2026-08-14 | 2026-10-19 | Token usage statistics plugin for DeepSeek Harness: daily/custom-range views, model filters, call counts &amp; cost, configurable pricing, theme-aware dashboard. Inspired by CC Switch. |
| 10 | [ErSu137/dsh-reply-beautify](https://github.com/ErSu137/dsh-reply-beautify) | 3 | 2026-10-19 | 2026-10-19 | Unofficial DeepSeek Harness reply typography, interactive charts/tables and isolated HTML artifacts. Windows 0.2.1-rc.2 preview. |
| 11 | [hugoyee75-cmyk/dsh-token-metrics](https://github.com/hugoyee75-cmyk/dsh-token-metrics) | 3 | 2026-10-19 | 2026-10-19 | 把经过 DeepSeek Harness 的每一次模型调用记下来，在侧边栏给你一个 Token 用量统计页。按模型/供应商/项目/来源/账号/日期拆分，带缓存命中率、趋势图表与自更新。A Token usage statistics plugin for DeepSeek Harness. |
| 12 | [ShanJun-pro-max/dsh-novel-workbench](https://github.com/ShanJun-pro-max/dsh-novel-workbench) | 3 | 2026-10-18 | 2026-10-19 | DeepSeek Harness 的一页式小说创作工作台：开新章给方向、候选稿抽卡、剧情总结带索引、别称识别、情节体检、偏好档案按类型跨书继承 |
| 13 | [01NGVI-QINGYI/no-ai-style](https://github.com/01NGVI-QINGYI/no-ai-style) | 2 | 2026-10-14 | 2026-10-19 | Multilingual prose editing skill and DSH plugin for academic and professional writing. |
| 14 | [bitterSmilezzz/dsh-notify](https://github.com/bitterSmilezzz/dsh-notify) | 2 | 2026-08-27 | 2026-10-19 | 桌面通知插件 for DeepSeek Harness (DSH)：审批 / 提问 / 轮次完成 / 会话结束 / 出错时弹系统原生通知，点击直达对应会话。Web Notification 通道，免外部二进制、免授权。DSH plugin: native desktop notifications with click-to-session. |
| 15 | [bzaics666/dsh-pentest-toolkit](https://github.com/bzaics666/dsh-pentest-toolkit) | 2 | 2026-10-09 | 2026-10-19 | 搭配skill使用的授权渗透测试工具集 |
| 16 | [Chuzhj/dsh-edge-search](https://github.com/Chuzhj/dsh-edge-search) | 2 | 2026-10-19 | 2026-10-19 | 插件，应对deepseek api的web_fetch拒绝访问非公网ip的情况，能让dsh访问到非公网ip网页（简单来说就是开vpn时也能使用访问网页的功能） |
| 17 | [FYTXY/dsh-hindsight-daemon](https://github.com/FYTXY/dsh-hindsight-daemon) | 2 | 2026-10-19 | 2026-10-19 | DSH 插件：Hindsight 记忆服务的随行守护。DSH 启动时拉起本地 daemon，退出时连同嵌入式 PostgreSQL 一起清理干净，并在设置里提供独立页面（含记忆仓库的新建/切换/删除）。支持 Windows 与 Linux。 |
| 18 | [LipingAn04/dsh-index-fund-guide](https://github.com/LipingAn04/dsh-index-fund-guide) | 2 | 2026-10-19 | 2026-10-19 | 《指数基金投资指南》(银行螺丝钉) 的估值—定投—卖出体系，DSH 插件：9 份参考文档 + 4 个零依赖脚本 + 34 项保真测试 |
| 19 | [Lipraty/dsh-session-import](https://github.com/Lipraty/dsh-session-import) | 2 | 2026-10-16 | 2026-10-19 | Copy coding-agent sessions into independent DSH archives and import each as a new conversation. |
| 20 | [recyvan/dsh-model-proxy](https://github.com/recyvan/dsh-model-proxy) | 2 | 2026-10-18 | 2026-10-19 | model proxy plugin for DeepSeek Harness |
| 21 | [sleepinginsummer/dsh-rtk-optimizer](https://github.com/sleepinginsummer/dsh-rtk-optimizer) | 2 | 2026-08-14 | 2026-10-19 | DSH 插件：bash 命令改写建议 + 工具输出压缩，挂在工具事件上全局生效，本身不注册模型工具。 |
| 22 | [STARDUSTLC666/deepseek-computer-use](https://github.com/STARDUSTLC666/deepseek-computer-use) | 2 | 2026-10-17 | 2026-10-19 | 在 DSH 中查看和操作 Windows 桌面软件，支持窗口截图、鼠标键盘与控件操作。 欢迎提交 issues 和 PR。 |
| 23 | [TianzeLuo/dsh-away-notify](https://github.com/TianzeLuo/dsh-away-notify) | 2 | 2026-09-16 | 2026-10-19 | dsh 插件：离开 dsh 页面时可收到桌面通知，点击回到对应会话。Windows / WSL 原生 Toast，零依赖。 |
| 24 | [w-j-y-wjy/dsh-ink-whale](https://github.com/w-j-y-wjy/dsh-ink-whale) | 2 | 2026-10-19 | 2026-10-19 | DeepSeek Harness 手写墨迹开屏插件：按真实笔顺写出你的文字，收在鲸鱼锁标上；字体、文字与深浅色都在设置里配置。 |
| 25 | [zendev-lab/cogfold](https://github.com/zendev-lab/cogfold) | 2 | 2026-05-17 | 2026-10-19 | A local-first coding-agent runtime for durable sessions and controlled autonomous work. |
| 26 | [AnAQwQ/dsh-wb](https://github.com/AnAQwQ/dsh-wb) | 1 | 2026-10-19 | 2026-10-19 | 把WorkBuddy强行兼容进DeepSeekHarness |
| 27 | [architect-xyz/liquid-dsh-plugin](https://github.com/architect-xyz/liquid-dsh-plugin) | 1 | 2026-10-19 | 2026-10-19 | Deepseek Harness Plugin of Liquid Inference |
| 28 | [baizhizzl/dsh-network-proxy](https://github.com/baizhizzl/dsh-network-proxy) | 1 | 2026-10-19 | 2026-10-19 | HTTP proxy preference for DeepSeek Harness (dsh): direct / follow system / custom, applied live without restarting. |
| 29 | [Bob-Cheung/dsh-plugin-session-panes](https://github.com/Bob-Cheung/dsh-plugin-session-panes) | 1 | 2026-10-19 | 2026-10-19 | 桌面版多会话分屏 |
| 30 | [caotaiyi/remvu](https://github.com/caotaiyi/remvu) | 1 | 2026-10-17 | 2026-10-19 | Portable project memory for coding agents. Standalone runtime, observable records, code fingerprints, and Claude Code/Codex/DeepSeek Harness adapters. |
| 31 | [caozhiyuan/dsh-copilot-api](https://github.com/caozhiyuan/dsh-copilot-api) | 1 | 2026-10-18 | 2026-10-19 | DeepSeek Harness provider for a copilot-api gateway |
| 32 | [cedricxie366-stack/BOSSmode](https://github.com/cedricxie366-stack/BOSSmode) | 1 | 2026-10-19 | 2026-10-19 | BOSSmode — Your turn to be the boss. Open-source product collaboration for Codex and DeepSeek Harness. |
| 33 | [chzisnull/dsh-file-finder](https://github.com/chzisnull/dsh-file-finder) | 1 | 2026-10-16 | 2026-10-19 | DeepSeek Harness plugin: search files by name or content, customizable shortcuts, and in-app text editing |
| 34 | [DaozeTang/dsh-connect-hub](https://github.com/DaozeTang/dsh-connect-hub) | 1 | 2026-10-19 | 2026-10-19 | A DeepSeek Harness (DSH) plugin that brings Qoder, WorkBuddy and Trae models into one model picker, sharing a single credential store, cache, scheduler and settings page. |
| 35 | [ddtcorex/maestro-reviewer](https://github.com/ddtcorex/maestro-reviewer) | 1 | 2026-08-25 | 2026-10-19 | Pluggable merge-request review pipeline for DeepSeek Harness (webhook, orchestrator, findings) with a GitLab provider |
| 36 | [dexwebcode/dsh-plugin-mobile-ui](https://github.com/dexwebcode/dsh-plugin-mobile-ui) | 1 | 2026-10-16 | 2026-10-19 | Mobile UI plugin for DeepSeek Harness. Embeds into your local DSH, auto-starts a web server and ngrok tunnel, and serves a React PWA so you can control DSH from your phone on any network — no domain, no VPS, installable to home screen, with auth and WebSocket streaming. |
| 37 | [DeZhou123/dsh-model-orchestrator](https://github.com/DeZhou123/dsh-model-orchestrator) | 1 | 2026-10-19 | 2026-10-19 | DSH 插件：两级模型调度（先选模型、再选渠道；失败先换渠道再换模型），带偏好模式与实时渠道健康面板 |
| 38 | [DPH-1121/dsh-codex-provider](https://github.com/DPH-1121/dsh-codex-provider) | 1 | 2026-09-18 | 2026-10-19 | Codex (ChatGPT) model provider for DeepSeek Harness - serves the ChatGPT subscription models the Codex CLI uses, over OAuth session credentials instead of an API key |
| 39 | [DPH-1121/dsh-usage-stats](https://github.com/DPH-1121/dsh-usage-stats) | 1 | 2026-09-18 | 2026-10-19 | DeepSeek Harness token-usage report with a grow-only per-session ledger: deleting a session no longer deletes its usage |
| 40 | [DPH-1121/dsh-wallhaven-wallpaper](https://github.com/DPH-1121/dsh-wallhaven-wallpaper) | 1 | 2026-09-18 | 2026-10-19 | DeepSeek Harness 插件：从 wallhaven.cc 搜图并铺成 GUI 背景，图片全由宿主端取回（支持代理，浏览器无需能访问 wallhaven），可一键下载原图。零运行时依赖。 |
| 41 | [evilevil/dsh-purge-021rc2](https://github.com/evilevil/dsh-purge-021rc2) | 1 | 2026-10-19 | 2026-10-19 | dsh-purge 社区适配版：上游已停更，这里让它继续跑在 DeepSeek Harness 0.2.1-rc.2 上（基于 1.1.72） |
| 42 | [fengyevvv/dsh-egress-router](https://github.com/fengyevvv/dsh-egress-router) | 1 | 2026-10-18 | 2026-10-19 | DSH 出站流量路由插件：DeepSeek 直连，外网模型与网页抓取走代理 · Egress router for DeepSeek Harness. |
| 43 | [fuguang12123/dsh-theme-inkstone](https://github.com/fuguang12123/dsh-theme-inkstone) | 1 | 2026-10-19 | 2026-10-19 | 墨白 / Inkstone — an independent monochrome DSH community theme inspired by Minimal E-ink. |
| 44 | [FurinaEsE/dsh-ui-zoom-regions](https://github.com/FurinaEsE/dsh-ui-zoom-regions) | 1 | 2026-10-07 | 2026-10-19 | Per-region UI zoom for DeepSeek Harness (header, both sidebars, conversation body) plus a draggable header bottom edge. Derived from imdeniil/dsh-ui-zoom. |
| 45 | [germyGao/dsh-select-assist](https://github.com/germyGao/dsh-select-assist) | 1 | 2026-10-18 | 2026-10-19 | 任意 Windows 应用选中文字，即刻用 DeepSeek Harness 解释、总结、翻译、朗读，结果落在可拖动置顶浮窗。系统级划词、自动带上下文、不碰剪贴板、原生零依赖。仅 Windows · MIT |
| 46 | [hengyun721/hikari-rento](https://github.com/hengyun721/hikari-rento) | 1 | 2026-10-19 | 2026-10-19 | 恋兔光（《这里是，终末停滞委员会。》）人设的两个发行形态：DeepSeek Harness 插件（hikari-rento）与可移植 skill（hikari-rento-skill），同源生成。 |
| 47 | [hollowfyh/dsh-plugin-doctor](https://github.com/hollowfyh/dsh-plugin-doctor) | 1 | 2026-10-19 | 2026-10-19 | Self-healing plugin doctor for DeepSeek Harness: detects failed plugin rows, disables them automatically with a patch backup, and reports diagnostics via /doctor. |
| 48 | [HuanLinOTO/dsh-neartoken](https://github.com/HuanLinOTO/dsh-neartoken) | 1 | 2026-10-19 | 2026-10-19 | 把 New API 站点接入 DSH 的模型供应商：设备授权登录、按渠道分组的三级模型选择器、模型白名单 \| Sign in to a New API site from DSH settings; the plugin mints the API token, inserts itself as a provider, and offers a model/group/reasoning picker |
| 49 | [Jianmo-R/dsh-github-mirror](https://github.com/Jianmo-R/dsh-github-mirror) | 1 | 2026-10-19 | 2026-10-19 | A GitHub repositories launcher for the DSH Web client, with mirror browsing and accelerated clone/download routes. |
| 50 | [kongkongya367-glitch/dsh-bingo-ren](https://github.com/kongkongya367-glitch/dsh-bingo-ren) | 1 | 2026-10-19 | 2026-10-19 | 装完插件，Bingo 接班。DeepSeek Harness 的插件善后管家：重启提醒、变更留痕、临时试用与运行状态验收。零运行时依赖，无遥测。 |
| 51 | [LazyRa/dsh-session-trash](https://github.com/LazyRa/dsh-session-trash) | 1 | 2026-10-19 | 2026-10-19 | Recoverable session deletion for DeepSeek Harness: delete moves sessions to a trash folder, restorable for 7 days, purged automatically. |
| 52 | [LoveDoLove/dsh-token-saver](https://github.com/LoveDoLove/dsh-token-saver) | 1 | 2026-10-18 | 2026-10-19 | Configurable token optimization for DeepSeek Harness, with tool-output trimming, prompt shaping, context management, and a Web settings UI. |
| 53 | [LuoX218/dsh-siyuan](https://github.com/LuoX218/dsh-siyuan) | 1 | 2026-10-19 | 2026-10-19 | 把 DeepSeek Harness 的对话一键存入思源笔记（SiYuan）。支持单条/本轮/整窗口同步、AI 摘要、公式与 mermaid 图表原样保留。 |
| 54 | [lxyztmds/dsh-plugin-deepseek-search](https://github.com/lxyztmds/dsh-plugin-deepseek-search) | 1 | 2026-10-19 | 2026-10-19 | Official DeepSeek Search / Fetch API tools for DeepSeek Harness (DSH) |
| 55 | [meat-daemon-404/dsh-cost-overlay](https://github.com/meat-daemon-404/dsh-cost-overlay) | 1 | 2026-08-16 | 2026-10-19 | DeepSeek API cost overlay for the dsh web GUI: top-center floating bar with current unit prices (yuan/1M tokens, peak/off-peak) and the session's accumulated cost from real token usage (cache-hit aware). dsh plugin. |
| 56 | [Nekomeow114/dsh-tieba-scroll](https://github.com/Nekomeow114/dsh-tieba-scroll) | 1 | 2026-10-19 | 2026-10-19 | DSH 插件 · 刷贴吧：每天替你看几个百度贴吧——读帖挑重点、写日报；自动签到（顺手关注），回帖可选（意图分类 + 客服腔闸门）。支持人设、公开/私人日记、谷时定时跑。 |
| 57 | [neutron42-jp/dsh-btw-live](https://github.com/neutron42-jp/dsh-btw-live) | 1 | 2026-10-19 | 2026-10-19 | DeepSeek Harness /btw: a side question about the live session, including the running turn; the answer stays out of the conversation history. MIT. |
| 58 | [nickfast2025/dsh-sky-window](https://github.com/nickfast2025/dsh-sky-window) | 1 | 2026-10-19 | 2026-10-19 | A living sky for DeepSeek Harness — 给工作区一扇流动的天空。 |
| 59 | [NoCandles/dsh-stock-bar](https://github.com/NoCandles/dsh-stock-bar) | 1 | 2026-10-18 | 2026-10-19 | DeepSeek Harness plugin: always-on stock quotes strip at the top of the window - watchlist, holdings (shares &amp; cost), P&amp;L, candlestick/intraday charts, order book, trade ledger, alerts, AI review. |
| 60 | [pengxiaozi/dsh-plugins](https://github.com/pengxiaozi/dsh-plugins) | 1 | 2026-10-19 | 2026-10-19 | DeepSeek Harness 社区插件：MCP 连接管理面板 + Skills 管理面板（ZIP 导出） |
| 61 | [qizhuxu/dsh-taste](https://github.com/qizhuxu/dsh-taste) | 1 | 2026-10-19 | 2026-10-19 | taste-skill 的 DeepSeek Harness 原生插件：把上游技能与脚本注册成 DSH 技能与工具，并随上游自动重新封装 |
| 62 | [QZyme/dsh-besson-tools](https://github.com/QZyme/dsh-besson-tools) | 1 | 2026-10-19 | 2026-10-19 | DSH 插件（bundle 形态）：北山Besson Minecraft 模组开发教程 7 工具 — 适配 DSH 0.2.1-rc.2+，插件栏一键安装 |
| 63 | [ruegg114514/dsh-colorlab](https://github.com/ruegg114514/dsh-colorlab) | 1 | 2026-10-19 | 2026-10-19 | Chat UI colour theme plugin for DeepSeek Harness. Ships the Mariana palette as its default preset and adds a colour engine: 18 adjustable colour slots, 9 Markdown prose roles, saved presets, WCAG contrast hints and light/dark modes. |
| 64 | [sadgsk/dsh-review-panel](https://github.com/sadgsk/dsh-review-panel) | 1 | 2026-10-19 | 2026-10-19 | Cursor 式只读代码审查插件：在 DeepSeek Harness 右侧栏查看完整源码 + 行级内联 diff，含文件树、编辑器标签页与 VS Code 快捷键。Cursor-style code review panel for DSH. |
| 65 | [Self-Identity/dsh-preset-requirement-confirm](https://github.com/Self-Identity/dsh-preset-requirement-confirm) | 1 | 2026-10-19 | 2026-10-19 | DSH agent preset: confirm the requirement with a questionnaire before executing. |
| 66 | [SeverusZh/dsh-workspace-board](https://github.com/SeverusZh/dsh-workspace-board) | 1 | 2026-10-18 | 2026-10-19 | DeepSeek Harness 工作区管理面板插件：任意层级分组导航、原生侧边栏按管理面板、LLM 整理与 AGENTS.md 支持 |
| 67 | [Shad0wwa1ker/dsh-per-request-cost](https://github.com/Shad0wwa1ker/dsh-per-request-cost) | 1 | 2026-10-18 | 2026-10-19 | DeepSeek Harness composer pill: balance, peak/off-peak phase, and per-request-priced session spend including subagent sessions and Search/Fetch fees. |
| 68 | [shinji00222/dsh-windows-computer-use](https://github.com/shinji00222/dsh-windows-computer-use) | 1 | 2026-10-19 | 2026-10-19 | DSH / DeepSeek Harness 的 Windows 电脑控制插件：截图、识别控件、点击、中文输入、OCR 和 Esc 急停。C# + TypeScript computer-use plugin. |
| 69 | [sleepinginsummer/dsh-hashline-edit-pro](https://github.com/sleepinginsummer/dsh-hashline-edit-pro) | 1 | 2026-08-14 | 2026-10-19 | DSH 插件：哈希锚点编辑工具（hashline_read / replace / undo_last_replace），用内容哈希定位，不依赖行号或字符串匹配。 |
| 70 | [Soulize/dsh-agent-teams-optimizer](https://github.com/Soulize/dsh-agent-teams-optimizer) | 1 | 2026-10-19 | 2026-10-19 | An independent DeepSeek Harness plugin to configure the actual Agent Teams teammate admission limit. |
| 71 | [specterxueye/dsh-cv](https://github.com/specterxueye/dsh-cv) | 1 | 2026-09-05 | 2026-10-19 | DeepSeek Harness 中文求职插件：事实整理、JD 定向简历与面试准备 |
| 72 | [TGWgulugu/dsh-wsl-bridge](https://github.com/TGWgulugu/dsh-wsl-bridge) | 1 | 2026-10-19 | 2026-10-19 | 在DSH中实现原生的WSL体验，在桌面端实现可选择WSL的工作区并使用linux工具流 |
| 73 | [TianzeLuo/dsh-tex-block-normalizer](https://github.com/TianzeLuo/dsh-tex-block-normalizer) | 1 | 2026-09-27 | 2026-10-19 | DSH plugin: fix Pandoc-style $$ display-math blocks that DSH mis-parses into a red KaTeX parse error. |
| 74 | [TinyBOOOOM/dsh-cliproxyapi-pro](https://github.com/TinyBOOOOM/dsh-cliproxyapi-pro) | 1 | 2026-10-19 | 2026-10-19 | 把 CLIProxyAPI（CPA）里的模型，一键接进 DeepSeek Harness（DSH）的模型选择器。 |
| 75 | [TuDouPn/dsh-grok-xai](https://github.com/TuDouPn/dsh-grok-xai) | 1 | 2026-10-19 | 2026-10-19 | Unofficial DeepSeek Harness plugin: use a SuperGrok / X Premium subscription, Grok models, live usage, models and pricing. |
| 76 | [viztor/dsh-jujutsu](https://github.com/viztor/dsh-jujutsu) | 1 | 2026-10-11 | 2026-10-19 | Refuses Git inside a Jujutsu workspace and hands the model jj commands instead. Jujutsu-native VCS &amp; version control for the DeepSeek Harness. |
| 77 | [weft-audit/dsh-audit](https://github.com/weft-audit/dsh-audit) | 1 | 2026-10-18 | 2026-10-19 | 固定评分表 0-10 评分官（三眼定分），只打分、不裁决、不执行 |
| 78 | [weft-audit/dsh-checkpoint](https://github.com/weft-audit/dsh-checkpoint) | 1 | 2026-10-18 | 2026-10-19 | 任务断点协议——记录断点、恢复只做剩余步骤、绝不自动执行 |
| 79 | [weft-audit/dsh-dod](https://github.com/weft-audit/dsh-dod) | 1 | 2026-10-18 | 2026-10-19 | 无证据不算完成——DSH 完成否定清单软提示与五段式校验工具（只提醒、不拦截） |
| 80 | [weft-audit/dsh-judgement](https://github.com/weft-audit/dsh-judgement) | 1 | 2026-10-18 | 2026-10-19 | 20 条判断力清单技能包（中英，纯方法论，不夹带私人内容） |
| 81 | [weft-audit/dsh-ledger](https://github.com/weft-audit/dsh-ledger) | 1 | 2026-10-18 | 2026-10-19 | 用量事件 JSONL 记账与单一口径报表（只记账、不设闸、不读余额） |
| 82 | [wuming295/dsh-sandbox-monitor](https://github.com/wuming295/dsh-sandbox-monitor) | 1 | 2026-10-19 | 2026-10-19 | Real-time sandbox observability for DeepSeek Harness: latency, loss, errors, tokens, CPU and a live sandbox preview in the native right sidebar. |
| 83 | [xiciyang/dsh-visual-memory](https://github.com/xiciyang/dsh-visual-memory) | 1 | 2026-10-17 | 2026-10-19 | Lossless visual memory for DSH agents: store an image once, address it by sha256, read exact pixels, compare past frames, recall by text/tag/turn — no second vision model in the loop. |
| 84 | [xiciyang/inference-diagnose](https://github.com/xiciyang/inference-diagnose) | 1 | 2026-10-19 | 2026-10-19 | Diagnose an inference service from evidence: generate a sanitized collection script, parse it offline, rank root causes with falsifiers, re-collect only what is missing. Hash-chained audit; five read-only DSH tools. |
| 85 | [xiciyang/inference-quantization](https://github.com/xiciyang/inference-quantization) | 1 | 2026-10-12 | 2026-10-19 | Quantize a checkpoint and prove it in DSH: PTQ with a leak-free calibration split, independent accuracy and performance gates through real serving endpoints, auto-degrade, signed-off audit or rollback. |
| 86 | [yesang0924-beep/dsh-glass-skin](https://github.com/yesang0924-beep/dsh-glass-skin) | 1 | 2026-10-19 | 2026-10-19 | Glass Skin · 玻璃肌肤 — 给 DeepSeek Harness Web UI 的玻璃材质主题：材质冻结、壁纸是唯一变量。 |
| 87 | [yffo/tabellio-dsh](https://github.com/yffo/tabellio-dsh) | 1 | 2026-10-19 | 2026-10-19 | Memory for DeepSeek Harness: candidates first, you approve, recall with receipts. |
| 88 | [zerodegress/dsh-tui-secret](https://github.com/zerodegress/dsh-tui-secret) | 1 | 2026-10-18 | 2026-10-19 | A dsh-tui plugin which keep your Secrets safe from the Agents. |
| 89 | [zhang-guangjie/dsh-video-bg](https://github.com/zhang-guangjie/dsh-video-bg) | 1 | 2026-08-21 | 2026-10-19 | DSH plugin: loop a local video behind the chat UI, with play/pause, opacity, scrim and fit controls. • DSH 插件：在对话背景循环播放本地视频，支持播放/暂停、不透明度、遮罩与填充。 |
| 90 | [Zhiyi-Zhao/dsh-schedule-send](https://github.com/Zhiyi-Zhao/dsh-schedule-send) | 1 | 2026-10-19 | 2026-10-19 | Schedule-send for DeepSeek Harness: write a message in the composer and have it delivered into the same conversation later as a normal user message. |
| 91 | [zk-wz/dsh-workbuddy-broadcast](https://github.com/zk-wz/dsh-workbuddy-broadcast) | 1 | 2026-10-19 | 2026-10-19 | 把本机 WorkBuddy 账号发布为 OpenAI 兼容的 HTTP 服务，供 WSL / Windows 上的其他 Agent 工具复用其模型 |
| 92 | [1273984347/dsh-github-gate](https://github.com/1273984347/dsh-github-gate) | 0 | 2026-10-18 | 2026-10-19 | Guarded GitHub tools for DeepSeek Harness: 9 typed github_* tools (58 actions) where every state-changing action needs confirm:true plus a human approval seam, with a digest-verified self-update and a settings page. Zero runtime dependencies. \| 面向 DSH 的 GitHub 工具：所有写动作都过审批门 |
| 93 | [1315577677/dsh-dot-plugin](https://github.com/1315577677/dsh-dot-plugin) | 0 | 2026-10-19 | 2026-10-19 | DSH Dot: a persistent read-only-first proactive agent for DeepSeek Harness, with user-approved execution. |
| 94 | [3493750852/dsh-usage-balance-v2](https://github.com/3493750852/dsh-usage-balance-v2) | 0 | 2026-10-19 | 2026-10-19 | Inline DSH balance/session usage readout: session cost, duration, remaining balance, peak/off-peak, between token usage and context. |
| 95 | [66rapper/dsh-model-auto-enricher](https://github.com/66rapper/dsh-model-auto-enricher) | 0 | 2026-10-19 | 2026-10-19 | ⚡ DSH 模型补齐助手：解决添加新渠道后还要把几十个模型一个个手动点开调上下文（1M）、勾多模态发图、配思考强度档位（low/high/max）的繁琐痛点，新增模型保存即自动搞定！ |
| 96 | [7starsseeker/MCModsDevBridge](https://github.com/7starsseeker/MCModsDevBridge) | 0 | 2026-10-19 | 2026-10-19 | DSH plugin + probe suite for Minecraft 26.3 mod development: start a real server and client, drive them over HTTP, assert on world state and logs (Fabric / Forge / NeoForge) |
| 97 | [873360545/dsh-auto-shutdown](https://github.com/873360545/dsh-auto-shutdown) | 0 | 2026-10-19 | 2026-10-19 | Windows-only DeepSeek Harness plugin: a switch in Settings that powers off the PC after the conversation finishes, with a native countdown dialog that cancels the shutdown in one click. |
| 98 | [a2042798096-debug/dsh-deepseek-search](https://github.com/a2042798096-debug/dsh-deepseek-search) | 0 | 2026-10-19 | 2026-10-19 | DeepSeek Harness 多引擎搜索插件：原生 web_search 兼容，必应/百度/搜狗/360 + Tavily/Exa，网页正文抓取与 web_research 深度收集，零模型 token、可配置、可回退。 |
| 99 | [abalika/dsh-mode-switch](https://github.com/abalika/dsh-mode-switch) | 0 | 2026-10-19 | 2026-10-19 | A community plugin for DeepSeek Harness Desktop: switch between Harness and official DeepSeek Chat, with optional persistent login on Windows. |
| 100 | [AdenXie/dsh-vercel](https://github.com/AdenXie/dsh-vercel) | 0 | 2026-10-19 | 2026-10-19 | Vercel MCP and on-demand official Vercel skills for DeepSeek Harness |
| 101 | [adrianhu65/dsh-noema](https://github.com/adrianhu65/dsh-noema) | 0 | 2026-10-18 | 2026-10-19 | Noema long-term memory plugin for DSH: durable, inspectable agent memory with recall tools and a settings page. |
| 102 | [AhaCrazy/dsh-stock-quotes](https://github.com/AhaCrazy/dsh-stock-quotes) | 0 | 2026-10-19 | 2026-10-19 | DeepSeek Harness plugin: neutral sidebar data panel for A-share / Hong Kong / US quotes, plus a stock_quote tool for the agent. |
| 103 | [ai-v5/LLMDSHPlugin_token-usage](https://github.com/ai-v5/LLMDSHPlugin_token-usage) | 0 | 2026-10-19 | 2026-10-19 | DeepSeek Harness plugin: sidebar token usage, daily calendar heatmap, turns/steps and tok/s, with durable history. |
| 104 | [AidenWanggitgit/paper-skin](https://github.com/AidenWanggitgit/paper-skin) | 0 | 2026-10-18 | 2026-10-19 | A scholarly journal-desk skin for DeepSeek Harness: Nature, Science, IEEE and Elsevier covers, manuscript stages, and an editorial letter behind the conversation. |
| 105 | [aix-plugin/ai-courses](https://github.com/aix-plugin/ai-courses) | 0 | 2026-10-17 | 2026-10-19 | ai-course plugin for deepseek harness |
| 106 | [alessiomartinez55/flameox](https://github.com/alessiomartinez55/flameox) | 0 | 2026-10-18 | 2026-10-19 | Runtime evidence that helps agents trace, profile, and burn down hotspots in application and native code, GPU kernels, and inference stacks. |
| 107 | [alexandros397/seektty](https://github.com/alexandros397/seektty) | 0 | 2026-10-18 | 2026-10-19 | 面向 DeepSeek Harness 的 Claude Code 风格终端界面，支持 Windows、macOS 与 Linux，兼容透明终端、VS Code 主题和自定义配色。 |
| 108 | [alexzeng666/dsh-verify](https://github.com/alexzeng666/dsh-verify) | 0 | 2026-10-18 | 2026-10-19 | Verification plugins for DeepSeek Harness - when the agent says it fixed something, these run it and hand you the evidence. |
| 109 | [Allenbyz/dsh-cursor-sessions](https://github.com/Allenbyz/dsh-cursor-sessions) | 0 | 2026-10-19 | 2026-10-19 | Cursor-style session management for DeepSeek Harness: draft chats with live preview titles, empty-draft reuse, one-click discard. |
| 110 | [amstlkqp114514/dsh-desktop-tweaks](https://github.com/amstlkqp114514/dsh-desktop-tweaks) | 0 | 2026-10-18 | 2026-10-19 | 给桌面端dsh添加了F11全屏。使ctrlCV在自带cmd变成复制粘贴，而不是输入^C/^V |
| 111 | [ana0643/dsh-skill-panel](https://github.com/ana0643/dsh-skill-panel) | 0 | 2026-10-19 | 2026-10-19 | Skill panel for DeepSeek Harness: lists local skills in the official right sidebar with Chinese names and categories; click to insert /skill-name into the composer. |
| 112 | [andreab389/engramory](https://github.com/andreab389/engramory) | 0 | 2026-10-18 | 2026-10-19 | A portable memory protocol for AI agents — load it as standing rules; a curation discipline + reference spec + optional cap hook. |
| 113 | [andrewhmir/dsh-btw](https://github.com/andrewhmir/dsh-btw) | 0 | 2026-10-19 | 2026-10-19 | Ephemeral /btw side questions for DeepSeek Harness: full conversation context, no tools, never written to history. |
| 114 | [Anne1153/dsh-noema](https://github.com/Anne1153/dsh-noema) | 0 | 2026-10-19 | 2026-10-19 | Noema long-term memory plugin for DSH: durable, inspectable agent memory with recall tools and a settings page. |
| 115 | [Antonio2900/opencode2dsh](https://github.com/Antonio2900/opencode2dsh) | 0 | 2026-10-18 | 2026-10-19 | DSH plugin — free OpenCode Zen models for DeepSeek Harness (DSH). Free LLM API, no API key needed. 在 DSH 中使用 OpenCode Zen 免费模型，无需 API key |
| 116 | [Anurakg7235/dsh-noema](https://github.com/Anurakg7235/dsh-noema) | 0 | 2026-10-18 | 2026-10-19 | Noema long-term memory plugin for DSH: durable, inspectable agent memory with recall tools and a settings page. |
| 117 | [ApichatHara/flameox](https://github.com/ApichatHara/flameox) | 0 | 2026-10-19 | 2026-10-19 | Runtime evidence that helps agents trace, profile, and burn down hotspots in application and native code, GPU kernels, and inference stacks. |
| 118 | [aroux079/opencode2dsh](https://github.com/aroux079/opencode2dsh) | 0 | 2026-10-19 | 2026-10-19 | DSH plugin — free OpenCode Zen models for DeepSeek Harness (DSH). Free LLM API, no API key needed. 在 DSH 中使用 OpenCode Zen 免费模型，无需 API key |
| 119 | [Arrosam/dsh-better-workspace-file-manager](https://github.com/Arrosam/dsh-better-workspace-file-manager) | 0 | 2026-10-19 | 2026-10-19 | DeepSeek Harness plugin: upload, download, new folder, delete, drag-to-move and drag-to-chat for the workspace Files tab |
| 120 | [arthurv87447/flameox](https://github.com/arthurv87447/flameox) | 0 | 2026-10-18 | 2026-10-19 | Runtime evidence that helps agents trace, profile, and burn down hotspots in application and native code, GPU kernels, and inference stacks. |
| 121 | [asli06202/dsh-normify](https://github.com/asli06202/dsh-normify) | 0 | 2026-10-19 | 2026-10-19 | Normify · DSH 插件：把项目架构写成归一化的分形模块树，三层校验（写时 / 校验 / 冻结回执）、30 个 normify_* 工具 + normify-gen 技能，一键渲染单文件交互式架构图；支持伴随式开发（change_open → brief → check → 实施 → refresh → change_close）。 |
| 122 | [atzx/dsh-plugin-pomodoro](https://github.com/atzx/dsh-plugin-pomodoro) | 0 | 2026-10-19 | 2026-10-19 | Pomodoro focus timer plugin for DeepSeek Harness (DSH): a floating overlay timer with a Plugins-page configuration page, break cycles and desktop notifications. Browser-only DSH client plugin. |
| 123 | [badwoo/dsh-file-extension](https://github.com/badwoo/dsh-file-extension) | 0 | 2026-10-19 | 2026-10-19 | 文件操作功能扩展：为 DeepSeek Harness 右侧栏文件条目补全 Trae 风格操作（在文件管理器中显示、添加到对话、另存为、复制路径、重命名、回收站删除） |
| 124 | [Bai-Ziyi/dsh-image-relay](https://github.com/Bai-Ziyi/dsh-image-relay) | 0 | 2026-10-19 | 2026-10-19 | Generate images from a text prompt through any OpenAI-compatible relay and attach them to the DeepSeek Harness conversation. |
| 125 | [Bai-Ziyi/dsh-proxy-control](https://github.com/Bai-Ziyi/dsh-proxy-control) | 0 | 2026-10-19 | 2026-10-19 | Pre-launch and runtime HTTP proxy control for DeepSeek Harness: writes the user-level .env so the launcher and the first requests are proxied, then keeps it in sync from a Plugins-page switch. |
| 126 | [beck8602/deepseek-harness-mobile](https://github.com/beck8602/deepseek-harness-mobile) | 0 | 2026-10-19 | 2026-10-19 | Android companion for DeepSeek Harness \| chat, goals, approvals &amp; notifications from your phone, over your LAN. Kotlin + Jetpack Compose. |
| 127 | [berndkaya0853/flameox](https://github.com/berndkaya0853/flameox) | 0 | 2026-10-19 | 2026-10-19 | Runtime evidence that helps agents trace, profile, and burn down hotspots in application and native code, GPU kernels, and inference stacks. |
| 128 | [blockman0321/dsh-sidebar-overlay](https://github.com/blockman0321/dsh-sidebar-overlay) | 0 | 2026-10-19 | 2026-10-19 | Floating sidebar overlay for DeepSeek Harness: independently rendered workspace/session browser in the official shell.overlay seat, without touching the official sidebar or grid. |
| 129 | [bluemika111/dsh-degeneration-guard](https://github.com/bluemika111/dsh-degeneration-guard) | 0 | 2026-10-19 | 2026-10-19 | DeepSeek Harness 插件：检测模型思考段的复读退化并自动打断、自动续跑。通用重复检测，不依赖白名单。 |
| 130 | [BrokenDreamStar/dsh-skills-mcp](https://github.com/BrokenDreamStar/dsh-skills-mcp) | 0 | 2026-10-19 | 2026-10-19 | 为deepseek harness添加skills和mcp管理功能 |
| 131 | [brooks09/dsh-normify](https://github.com/brooks09/dsh-normify) | 0 | 2026-10-19 | 2026-10-19 | Normify · DSH 插件：把项目架构写成归一化的分形模块树，三层校验（写时 / 校验 / 冻结回执）、30 个 normify_* 工具 + normify-gen 技能，一键渲染单文件交互式架构图；支持伴随式开发（change_open → brief → check → 实施 → refresh → change_close）。 |
| 132 | [btspoony/dsh-keys-manager](https://github.com/btspoony/dsh-keys-manager) | 0 | 2026-10-18 | 2026-10-19 | A DSH plugin that turns one provider API key into a managed pool + more built-in LLM Providers |
| 133 | [caesarloo/dsh-deepseek-account-vision](https://github.com/caesarloo/dsh-deepseek-account-vision) | 0 | 2026-10-19 | 2026-10-19 | DeepSeek Harness plugin: use the DeepSeek account's DeepSeek-V4.1-Flash (deepseek-flash, 1017) for image recognition with any main model. No API key. |
| 134 | [callaumyan-design/dshx-ai-approval](https://github.com/callaumyan-design/dshx-ai-approval) | 0 | 2026-10-19 | 2026-10-19 | Adds an AI-reviewed sandbox escalation permission preset to DSH. |
| 135 | [callaumyan-design/dshx-image-clamp](https://github.com/callaumyan-design/dshx-image-clamp) | 0 | 2026-10-19 | 2026-10-19 | Clamp every image sent to the model to a maximum side length (default 2000px) so Claude's many-image limit is never exceeded. |
| 136 | [callaumyan-design/dshx-language-mirror](https://github.com/callaumyan-design/dshx-language-mirror) | 0 | 2026-10-19 | 2026-10-19 | Always reply (including final reports) in the language of the user's latest prompt. |
| 137 | [callaumyan-design/dshx-loop-guard](https://github.com/callaumyan-design/dshx-loop-guard) | 0 | 2026-10-19 | 2026-10-19 | Detect and stop repeated identical tool calls (agent loops), mainly for small local models. |
| 138 | [callaumyan-design/dshx-message-edit](https://github.com/callaumyan-design/dshx-message-edit) | 0 | 2026-10-19 | 2026-10-19 | Edit a sent prompt or an assistant reply inside an existing DSH conversation, then regenerate from that point 鈥?in place, without forking a new session. |
| 139 | [callaumyan-design/dshx-project](https://github.com/callaumyan-design/dshx-project) | 0 | 2026-10-19 | 2026-10-19 | Show and open the session's real project directory from the session header, plus a set_project tool so the model can record it. Session cwd is immutable, so the mapping lives in this plugin's own durable store instead. |
| 140 | [callaumyan-design/dshx-session-delete](https://github.com/callaumyan-design/dshx-session-delete) | 0 | 2026-10-19 | 2026-10-19 | Permanently delete a DSH conversation 鈥?sidebar menu item plus the removal endpoint the harness itself does not provide. |
| 141 | [callaumyan-design/dshx-skill-manager](https://github.com/callaumyan-design/dshx-skill-manager) | 0 | 2026-10-19 | 2026-10-19 | A DSH settings page listing installed skills with per-skill enable switches and short summaries. |
| 142 | [callaumyan-design/dshx-token-cost](https://github.com/callaumyan-design/dshx-token-cost) | 0 | 2026-10-19 | 2026-10-19 | A DSH settings page showing the DeepSeek account balance alongside daily token usage broken down by model, with the metered API cost it would have incurred. |
| 143 | [CarlAlvarez9275/engramory](https://github.com/CarlAlvarez9275/engramory) | 0 | 2026-10-19 | 2026-10-19 | A portable memory protocol for AI agents — load it as standing rules; a curation discipline + reference spec + optional cap hook. |
| 144 | [Carmen394/jevcore](https://github.com/Carmen394/jevcore) | 0 | 2026-10-18 | 2026-10-19 | TypeSafe Jev for DeepSeek Harness, the Model Context Protocol, and plain Node: typed judgments instead of prose, offline by default. |
| 145 | [che246/dsh-workbuddy2api-connect](https://github.com/che246/dsh-workbuddy2api-connect) | 0 | 2026-10-14 | 2026-10-19 | 把 WorkBuddy2API 网关的模型目录自动同步进 DeepSeek Harness（模型名/思考档/最大上下文），带可视面板 |
| 146 | [chencujinlin/dsh-whale-startup](https://github.com/chencujinlin/dsh-whale-startup) | 0 | 2026-10-19 | 2026-10-19 | DSH / DeepSeek Harness 桌面端鲸鱼娘开场动画插件：原生加载联动、工作台就绪后拍走提示、衔接右下角挂件。 |
| 147 | [ChendarCe/dsh-perf-hud](https://github.com/ChendarCe/dsh-perf-hud) | 0 | 2026-10-19 | 2026-10-19 | Transparent draggable performance HUD for DeepSeek Harness - CPU, GPU and memory usage plus CPU/GPU temperatures. |
| 148 | [ChendarCe/dsh-thinking-language](https://github.com/ChendarCe/dsh-thinking-language) | 0 | 2026-10-19 | 2026-10-19 | Make the agent think in Chinese, with a settings switch and a fully overriding custom prompt. |
| 149 | [Chenfan2/dsh-bilibili-subtitles](https://github.com/Chenfan2/dsh-bilibili-subtitles) | 0 | 2026-10-19 | 2026-10-19 | Extract Bilibili platform/AI subtitles or external/embedded/ASR/OCR fallback and render Markdown, Word, PDF, TXT, SRT or JSON. |
| 150 | [ChengMioa/dsh-deepseek-web-panel](https://github.com/ChengMioa/dsh-deepseek-web-panel) | 0 | 2026-10-19 | 2026-10-19 | DeepSeek web panel for DSH |
| 151 | [cherylmatsumoto/dsh-crew](https://github.com/cherylmatsumoto/dsh-crew) | 0 | 2026-10-18 | 2026-10-19 | DeepSeek Harness (DSH) plugin: dispatch work to DSH agents from Claude Code / Codex — native subagent progress, in-host worker sessions with per-tier presets, and a multimodal bridge that lends the text-only harness vision and image generation. |
| 152 | [christos82330/dsh-crew](https://github.com/christos82330/dsh-crew) | 0 | 2026-10-19 | 2026-10-19 | DeepSeek Harness (DSH) plugin: dispatch work to DSH agents from Claude Code / Codex — native subagent progress, in-host worker sessions with per-tier presets, and a multimodal bridge that lends the text-only harness vision and image generation. |
| 153 | [CHYMZXS/dsh-archive-workbench](https://github.com/CHYMZXS/dsh-archive-workbench) | 0 | 2026-10-19 | 2026-10-19 | 归档工作台（DeepSeek Harness 插件）：在侧边栏会话菜单中永久删除会话，并提供归档会话面板，可一键恢复或删除已归档会话。 |
| 154 | [Claudia2181/dsh-lowtide](https://github.com/Claudia2181/dsh-lowtide) | 0 | 2026-10-18 | 2026-10-19 | Time-shifting task delegation for DeepSeek Harness (dsh): plan tasks at leisure, they run unattended off-peak, come back to a report. Human-adjudicated, desktop + web. |
| 155 | [ComlaiGonnann/dsh-codex-rail](https://github.com/ComlaiGonnann/dsh-codex-rail) | 0 | 2026-10-19 | 2026-10-19 | Transforms DSH sidebar into a dual-column Codex interface with Activity Bar |
| 156 | [Crinstaniev/dsh-experience-index](https://github.com/Crinstaniev/dsh-experience-index) | 0 | 2026-10-19 | 2026-10-19 | Signpost experience files left by earlier agent sessions, so a new DeepSeek Harness session knows what already exists. |
| 157 | [CW-1209/dsh-quick-qa](https://github.com/CW-1209/dsh-quick-qa) | 0 | 2026-10-19 | 2026-10-19 | DSH 插件：课堂随手一问 —— 框选题目 + 绑定工作区资料，秒出答案（桌面快捷栏） |
| 158 | [cwh-123456/dsh-handoff-bus](https://github.com/cwh-123456/dsh-handoff-bus) | 0 | 2026-10-18 | 2026-10-19 | Cross-session message bus for DeepSeek Harness (DSH): the main conversation and GUI sub-conversations send instructions and reports to each other directly. Zero-dependency host plugin. |
| 159 | [cxv117793-blip/dsh-step-pause](https://github.com/cxv117793-blip/dsh-step-pause) | 0 | 2026-10-19 | 2026-10-19 | DeepSeek Harness 插件：每 N 个 agent 步骤在对话里插一次进度小结（正在做什么 / 已完成什么 / 接下来做什么 / 卡点），说完自动继续，不产生额外回合。 |
| 160 | [cyberElar/dsh-fast-term](https://github.com/cyberElar/dsh-fast-term) | 0 | 2026-10-19 | 2026-10-19 | Low-latency terminal for the DeepSeek Harness right sidebar: dedicated PTY websocket, persistent sessions, copy/paste, zh/en. |
| 161 | [CynthiaSilvestri92/dsh-noema](https://github.com/CynthiaSilvestri92/dsh-noema) | 0 | 2026-10-18 | 2026-10-19 | Noema long-term memory plugin for DSH: durable, inspectable agent memory with recall tools and a settings page. |
| 162 | [daimingxing/dsh-codegraph-project](https://github.com/daimingxing/dsh-codegraph-project) | 0 | 2026-10-18 | 2026-10-19 | Per-project CodeGraph MCP tools for DeepSeek Harness: each session queries the repo it is actually working in |
| 163 | [daimingxing/dsh-session-recycle](https://github.com/daimingxing/dsh-session-recycle) | 0 | 2026-10-18 | 2026-10-19 | Session trash for DeepSeek Harness: move sessions into a recycle bin with view/restore/permanent-delete · DSH 会话回收站 |
| 164 | [dalekotsvet/dsh-soundcheck](https://github.com/dalekotsvet/dsh-soundcheck) | 0 | 2026-10-19 | 2026-10-19 | 让文本模型读懂一首歌：本地音乐分析插件，把音频拆成能量、速度、调性、密度，音频不出本机。 |
| 165 | [DavidCarliez/ds-cover](https://github.com/DavidCarliez/ds-cover) | 0 | 2026-10-18 | 2026-10-19 | Cover privacy protection for DeepSeek Harness Web, with a native lock indicator, policy editor, and local controls. |
| 166 | [ddldxiacan/dsh-opencode-free](https://github.com/ddldxiacan/dsh-opencode-free) | 0 | 2026-10-19 | 2026-10-19 | DSH plugin — free OpenCode Zen models for DeepSeek Harness (DSH). No API key needed. 在 DSH 中使用 OpenCode Zen 免费模型，无需 API key |
| 167 | [ddy-007/dsh-client-resume-button](https://github.com/ddy-007/dsh-client-resume-button) | 0 | 2026-10-19 | 2026-10-19 | Adds a Continue button to the DeepSeek Harness composer for interrupted turns.  |
| 168 | [DenizKaya23/rapid-mlx-dsh-provider](https://github.com/DenizKaya23/rapid-mlx-dsh-provider) | 0 | 2026-10-18 | 2026-10-19 | Native Rapid-MLX provider for DeepSeek Harness (dsh) — dsh reads model facts from the server instead of your settings.yaml. |
| 169 | [dingchenhui0618-arch/dsh-adaptive](https://github.com/dingchenhui0618-arch/dsh-adaptive) | 0 | 2026-10-19 | 2026-10-19 | Version-adaptive plugin for DeepSeek Harness: reads the running DSH version, mirrors its plugin-compatibility rules, and flags code still using APIs changed between v0.1.6 and v0.2.1. Read-only. |
| 170 | [dingchenhui0618-arch/dsh-cost-ledger](https://github.com/dingchenhui0618-arch/dsh-cost-ledger) | 0 | 2026-10-19 | 2026-10-19 | Auditable token-cost ledger for DeepSeek Harness: per-call model/token/CNY records, hour/day/session aggregates, JSON\|CSV export, dry-run, and manual platform-bill reconciliation. |
| 171 | [Dinosaur-MC/dsh-decision-tools](https://github.com/Dinosaur-MC/dsh-decision-tools) | 0 | 2026-10-04 | 2026-10-19 | DSH plugin that turns a local Ollama System One model into two agent tools: decision for probability-only routing, classification, filtering and scoring, and monitor for polling files, jobs, commands or job events until an event happens. Background monitors stream progress and fire one-line trigger notices; they observe, never act. |
| 172 | [docsor1212/dsh-aesthete-agent](https://github.com/docsor1212/dsh-aesthete-agent) | 0 | 2026-10-19 | 2026-10-19 | DeepSeek Harness native plugin for aesthete-agent: mechanically validated frontend aesthetics (118-palette evidence library, 4 mechanical gates). 本地运行,零联网 |
| 173 | [don2ccc/DuckBI-DSH](https://github.com/don2ccc/DuckBI-DSH) | 0 | 2026-10-19 | 2026-10-19 | Local-first DuckDB analytics for DeepSeek Harness — chat with your Excel &amp; logs, get charts and reports. |
| 174 | [DPH-1121/dsh-ark-plans](https://github.com/DPH-1121/dsh-ark-plans) | 0 | 2026-09-18 | 2026-10-19 | Volcengine Ark Agent Plan and Coding Plan model routes for DeepSeek Harness, with a session-header quota pill |
| 175 | [DPH-1121/dsh-chat-fold](https://github.com/DPH-1121/dsh-chat-fold) | 0 | 2026-09-18 | 2026-10-19 | DeepSeek Harness 对话折叠：思考行与工具行可单独收起，回合结束后自动折叠中间过程。官方紧凑折叠在回合未结束/历史未加载完时完全不生效，本插件补上这层。 |
| 176 | [DPH-1121/dsh-connect-trae-plus](https://github.com/DPH-1121/dsh-connect-trae-plus) | 0 | 2026-09-18 | 2026-10-19 | dsh-connect-trae 加固分支（基于上游 dingminhua/dsh-connect-trae v2.0.4）：插件自身启动失败时不再牵连整个 Harness。源码仓。 |
| 177 | [DPH-1121/dsh-memory](https://github.com/DPH-1121/dsh-memory) | 0 | 2026-09-18 | 2026-10-19 | Session-end memory for DeepSeek Harness: distils each turn into durable notes and recalls them per workspace |
| 178 | [DPH-1121/dsh-session-cleanup](https://github.com/DPH-1121/dsh-session-cleanup) | 0 | 2026-09-18 | 2026-10-19 | Archived-session cleanup for the dsh web client: per-row delete and delete-all over the real session logs |
| 179 | [DPH-1121/dsh-wallpaper-engine](https://github.com/DPH-1121/dsh-wallpaper-engine) | 0 | 2026-09-19 | 2026-10-19 | Wallpaper Engine Steam Workshop browser for DeepSeek Harness: anonymous search &amp; browse the workshop from a sidebar panel, steam:// subscribe deep-links, Steam login detection. |
| 180 | [drydeuterium/dsh-pet-ja](https://github.com/drydeuterium/dsh-pet-ja) | 0 | 2026-10-19 | 2026-10-19 | DSH のデスクトップペット dsh-pet を日本語化するローカルパッチ（メニュー・設定ページ・セリフ・フォント） |
| 181 | [dsh-plugin-lab/market](https://github.com/dsh-plugin-lab/market) | 0 | 2026-10-19 | 2026-10-19 | The dsh-plugin-lab plugin market: curated config plus the pipeline that turns npm metadata into a format-1 index served over GitHub Pages. |
| 182 | [Eileenes/dsh-reel](https://github.com/Eileenes/dsh-reel) | 0 | 2026-10-19 | 2026-10-19 | dsh-reel-studio: turn a DSH plugin repo into a promo video and promo image (local Remotion studio + host tools). |
| 183 | [Elena6977/seektty](https://github.com/Elena6977/seektty) | 0 | 2026-10-18 | 2026-10-19 | 面向 DeepSeek Harness 的 Claude Code 风格终端界面，支持 Windows、macOS 与 Linux，兼容透明终端、VS Code 主题和自定义配色。 |
| 184 | [emorel6463/engramory](https://github.com/emorel6463/engramory) | 0 | 2026-10-18 | 2026-10-19 | A portable memory protocol for AI agents — load it as standing rules; a curation discipline + reference spec + optional cap hook. |
| 185 | [Ersith/akasha-book](https://github.com/Ersith/akasha-book) | 0 | 2026-10-07 | 2026-10-19 | 阿卡夏之书（Akasha Book）— an auditable external memory layer for LLM agents: six purpose-typed stores, supersession chain, bi-temporality, write gating, DSH plugins, paper included. |
| 186 | [EvannZhongg/dsh-lossless-anchors](https://github.com/EvannZhongg/dsh-lossless-anchors) | 0 | 2026-10-18 | 2026-10-19 | A DeepSeek Harness plugin that keeps the exact text of user-authored messages that compaction has shadowed, and re-injects them as a budgeted runtime-context snapshot. |
| 187 | [fanghedeng/dsh-skill-gogo](https://github.com/fanghedeng/dsh-skill-gogo) | 0 | 2026-10-19 | 2026-10-19 | Skill GoGo: a DSH panel plugin to browse, group, preview, export, install and rename skills, plus a multi-select skill menu in the composer. |
| 188 | [fegnze/dsh-butler](https://github.com/fegnze/dsh-butler) | 0 | 2026-10-15 | 2026-10-19 | DSH Butler plugin |
| 189 | [fegnze/dsh-codex-style](https://github.com/fegnze/dsh-codex-style) | 0 | 2026-10-15 | 2026-10-19 | DSH output style plugin |
| 190 | [fegnze/dsh-notification-bridge](https://github.com/fegnze/dsh-notification-bridge) | 0 | 2026-10-15 | 2026-10-19 | DSH macOS notification bridge |
| 191 | [fegnze/dsh-session-metrics](https://github.com/fegnze/dsh-session-metrics) | 0 | 2026-10-16 | 2026-10-19 | 替换输入框下方统计栏：Token、上下文、缓存、模型与工具耗时、轮次、步数，明细悬浮显示 |
| 192 | [filippoc3708/dsh-noema](https://github.com/filippoc3708/dsh-noema) | 0 | 2026-10-18 | 2026-10-19 | Noema long-term memory plugin for DSH: durable, inspectable agent memory with recall tools and a settings page. |
| 193 | [FLL123-Arch/game-crash-doctor](https://github.com/FLL123-Arch/game-crash-doctor) | 0 | 2026-10-19 | 2026-10-19 | DeepSeek Harness plugin: explain Windows game crashes from Event Log, WER reports and crash dumps. |
| 194 | [flyfakeboy-bit/boom-art](https://github.com/flyfakeboy-bit/boom-art) | 0 | 2026-10-19 | 2026-10-19 | Boom Art! - DSH 发送烟花插件：以输入框为爆心，向边界外径向绽放，带 LED 边框与六档强度。 |
| 195 | [FlyFish1997/dsh-project-fee](https://github.com/FlyFish1997/dsh-project-fee) | 0 | 2026-10-19 | 2026-10-19 | 按工作区维度监控 DeepSeek Harness（DSH）token 消耗与人民币费用的 Web 插件 |
| 196 | [geraldk5421/engramory](https://github.com/geraldk5421/engramory) | 0 | 2026-10-19 | 2026-10-19 | A portable memory protocol for AI agents — load it as standing rules; a curation discipline + reference spec + optional cap hook. |
| 197 | [Ghdhdhhake/dsh-reveal-in-explorer](https://github.com/Ghdhdhhake/dsh-reveal-in-explorer) | 0 | 2026-10-19 | 2026-10-19 | dsh-reveal-in-explorer |
| 198 | [Giulio2229/rapid-mlx-dsh-provider](https://github.com/Giulio2229/rapid-mlx-dsh-provider) | 0 | 2026-10-18 | 2026-10-19 | Native Rapid-MLX provider for DeepSeek Harness (dsh) — dsh reads model facts from the server instead of your settings.yaml. |
| 199 | [Goku-Raku/dsh-appearance-studio](https://github.com/Goku-Raku/dsh-appearance-studio) | 0 | 2026-10-18 | 2026-10-19 | Appearance themes, wallpaper, frosted glass and typography for official DeepSeek Harness Desktop. DSH 皮肤、外观主题与壁纸插件。 |
| 200 | [gRose6137/dsh-lowtide](https://github.com/gRose6137/dsh-lowtide) | 0 | 2026-10-18 | 2026-10-19 | Time-shifting task delegation for DeepSeek Harness (dsh): plan tasks at leisure, they run unattended off-peak, come back to a report. Human-adjudicated, desktop + web. |
| 201 | [gsnowdrift/dsh-archive-manager](https://github.com/gsnowdrift/dsh-archive-manager) | 0 | 2026-10-19 | 2026-10-19 | DSH Archive Manager — 在 DeepSeek Harness 中查看、恢复和管理已归档会话 |
| 202 | [gsnowdrift/dsh-feishu-reader](https://github.com/gsnowdrift/dsh-feishu-reader) | 0 | 2026-08-21 | 2026-10-19 | DSH 插件：读取飞书文档（docx/wiki/sheets/bitable）并下载图片 |
| 203 | [GT-610/dsh-workspace-organize](https://github.com/GT-610/dsh-workspace-organize) | 0 | 2026-10-19 | 2026-10-19 | Group DSH workspaces into named groups and browse group &gt; workspace &gt; session in the sidebar. |
| 204 | [GuihaiHU/dsh-temp-note](https://github.com/GuihaiHU/dsh-temp-note) | 0 | 2026-10-19 | 2026-10-19 | A temp note in the DeepSeek Harness right sidebar, with session, workspace, and global scopes, one-click copy, and LLM polish. |
| 205 | [guokecloud/dsh-session-janitor](https://github.com/guokecloud/dsh-session-janitor) | 0 | 2026-10-19 | 2026-10-19 | DSH session cleaner: a sidebar page listing session records and archive caches, with a restorable recycle bin and an in-use guard. |
| 206 | [haechan46/deepseek-harness-mobile](https://github.com/haechan46/deepseek-harness-mobile) | 0 | 2026-10-19 | 2026-10-19 | Android companion for DeepSeek Harness \| chat, goals, approvals &amp; notifications from your phone, over your LAN. Kotlin + Jetpack Compose. |
| 207 | [HAN102300/dsh-opencode-zen-free](https://github.com/HAN102300/dsh-opencode-zen-free) | 0 | 2026-10-18 | 2026-10-19 | 这是一个零配置即可用在DSH harness当中，免费使用opencode免费模型的插件 |
| 208 | [HassanLundberg308/deepseek-harness-mobile](https://github.com/HassanLundberg308/deepseek-harness-mobile) | 0 | 2026-10-19 | 2026-10-19 | Android companion for DeepSeek Harness \| chat, goals, approvals &amp; notifications from your phone, over your LAN. Kotlin + Jetpack Compose. |
| 209 | [HeliosLz/harness2-recursion](https://github.com/HeliosLz/harness2-recursion) | 0 | 2026-10-19 | 2026-10-19 | Harness² recursion: two auditable dsh plugins — task-level probe/compose evidence loop + harnessing-level experience library (frozen contract v4, 34/34 tests, real-session E2E) |
| 210 | [helo060228/dsh-chat-search](https://github.com/helo060228/dsh-chat-search) | 0 | 2026-10-19 | 2026-10-19 | DSH chat search plugin: global cross-session &amp; in-chat search with context navigation |
| 211 | [hhhmhhh233/dsh-find-anywhere](https://github.com/hhhmhhh233/dsh-find-anywhere) | 0 | 2026-10-19 | 2026-10-19 | Ctrl+F find bar for the DSH desktop UI: search the conversation and the right panel, highlight matches, and jump between results. As-is / best-effort. |
| 212 | [hldz-top/dsh-story](https://github.com/hldz-top/dsh-story) | 0 | 2026-09-10 | 2026-10-19 | Independent novel-writing plugin for DSH: settings, outlines, chapters, review and continuity. |
| 213 | [home-i/dsh-window-size](https://github.com/home-i/dsh-window-size) | 0 | 2026-10-19 | 2026-10-19 | 记住 DeepSeek Harness 桌面版的窗口尺寸：重启后自动恢复、默认水平垂直居中，并提供设置页手动调整。 |
| 214 | [home-river/dsh-opencode-cli-bridge](https://github.com/home-river/dsh-opencode-cli-bridge) | 0 | 2026-10-19 | 2026-10-19 | DeepSeek Harness 插件，经本机 OpenCode CLI 使用 OpenCode 兼容模型——原生 LlmAdapter 透传桥，OC 会话持久续接 |
| 215 | [hualuo520-h/dsh-magpie-lite](https://github.com/hualuo520-h/dsh-magpie-lite) | 0 | 2026-10-19 | 2026-10-19 | Bring your local magpie-lite gateway models into DeepSeek Harness — the picker gains a magpie-lite group. 一处配置，所有 Agent 共用。 |
| 216 | [hugo11032/dsh-notion-workspaces](https://github.com/hugo11032/dsh-notion-workspaces) | 0 | 2026-10-02 | 2026-10-19 | Bind each DSH workspace to its own Notion workspace over the official Notion MCP. |
| 217 | [huhu23333/dsh-eval-guard](https://github.com/huhu23333/dsh-eval-guard) | 0 | 2026-10-17 | 2026-10-19 | Evaluation guard for DSH: workspace-only filesystem, no network/subagents, wall-clock limits, and tank task installation. |
| 218 | [HUIlv0/dsh-skill-panel](https://github.com/HUIlv0/dsh-skill-panel) | 0 | 2026-10-19 | 2026-10-19 | DSH 技能面板：左侧导航加一行「技能」，悬浮气泡按功能分类列出全部技能，多选一键写入输入框。 |
| 219 | [HUSTforever/dsh-thinking-summary](https://github.com/HUSTforever/dsh-thinking-summary) | 0 | 2026-10-19 | 2026-10-19 | Codex-style per-step reasoning summaries inside DeepSeek Harness's native thinking disclosure |
| 220 | [HwFee/HwFee-dsh](https://github.com/HwFee/HwFee-dsh) | 0 | 2026-10-19 | 2026-10-19 | DeepSeek Harness plugins: a Claude Design System theme, system fonts, and a usage panel. Design language derived from open-claude-ui. |
| 221 | [Ignareo/dsh-right-click-menu](https://github.com/Ignareo/dsh-right-click-menu) | 0 | 2026-10-19 | 2026-10-19 | Merged right-click context menu for the DeepSeek Harness Web GUI: files, chat file paths, workspace projects, and hyperlinks. |
| 222 | [imtwa/dsh-recall-sessions](https://github.com/imtwa/dsh-recall-sessions) | 0 | 2026-10-14 | 2026-10-19 | 轻量级解压并读取历史会话，让新会话读取之前会话的内容，单次操作毫秒级。A lightweight plugin that decompresses and reads past sessions. |
| 223 | [iStarryDust/dsh-agent-suite](https://github.com/iStarryDust/dsh-agent-suite) | 0 | 2026-10-19 | 2026-10-19 | DeepSeek Harness 插件：Agent 管理 + 消息编辑重发 |
| 224 | [iStarryDust/dsh-browser](https://github.com/iStarryDust/dsh-browser) | 0 | 2026-10-19 | 2026-10-19 | Give the agent a real headed browser: browser_open and browser_interact tools over a stateful Chromium installed under the harness home |
| 225 | [iStarryDust/dsh-prompt-enhance](https://github.com/iStarryDust/dsh-prompt-enhance) | 0 | 2026-10-19 | 2026-10-19 | Prompt enhancement for the composer: a star button left of the send action rewrites the draft with the session's model, with editable template files beside the bundle |
| 226 | [iStarryDust/dsh-scheduled-tasks](https://github.com/iStarryDust/dsh-scheduled-tasks) | 0 | 2026-10-19 | 2026-10-19 | 定时任务：任务绑定 agent、提示词与周期，到点后开启全新会话执行提示词，并保留运行记录 |
| 227 | [iStarryDust/dsh-skill-suite](https://github.com/iStarryDust/dsh-skill-suite) | 0 | 2026-10-19 | 2026-10-19 | Skill management for the DeepSeek Harness: the Skills page (browse, toggle, edit, create, delete) over the user skill root, the save_skill authoring tool for the agent, and the bundled skill-creator manual |
| 228 | [itzsu123/dsh-inline-plugin](https://github.com/itzsu123/dsh-inline-plugin) | 0 | 2026-10-19 | 2026-10-19 | 给 DeepSeek Harness 加个插件:把信息整理成 Inline 能接入的文章 |
| 229 | [itzsu123/Inline](https://github.com/itzsu123/Inline) | 0 | 2026-10-18 | 2026-10-19 |  “Answers should grow where the question is asked — a single-file AI reading tool, zero dependencies, with all data kept local.”答案应该长在提问的地方 —— 单文件的 AI 阅读工具,零依赖,数据全在本地 |
| 230 | [ium9khbep8834-maker/dsh-cache-saver](https://github.com/ium9khbep8834-maker/dsh-cache-saver) | 0 | 2026-10-19 | 2026-10-19 | DSH plugin that cuts the prompt payload re-sent every request: slims oversized MCP tool JSON Schemas, attributes tool-result volume, and shows the token cost in a settings page. |
| 231 | [Jacques631/deepseek-harness-mobile](https://github.com/Jacques631/deepseek-harness-mobile) | 0 | 2026-10-19 | 2026-10-19 | Android companion for DeepSeek Harness \| chat, goals, approvals &amp; notifications from your phone, over your LAN. Kotlin + Jetpack Compose. |
| 232 | [Jan29331/argo](https://github.com/Jan29331/argo) | 0 | 2026-10-19 | 2026-10-19 | 专门为 agent 打造的开源 agent 搜索工具，具备 200+的搜索源及多语言搜索能力，覆盖中文/英文/学术/代码/购物/金融/新闻/百科。 |
| 233 | [jeanl397/dsh-lowtide](https://github.com/jeanl397/dsh-lowtide) | 0 | 2026-10-19 | 2026-10-19 | Time-shifting task delegation for DeepSeek Harness (dsh): plan tasks at leisure, they run unattended off-peak, come back to a report. Human-adjudicated, desktop + web. |
| 234 | [Jensen-Yao/dsh-side-chat](https://github.com/Jensen-Yao/dsh-side-chat) | 0 | 2026-10-19 | 2026-10-19 | Native side conversations for DeepSeek Harness. Independent sessions, shared native UI, and a focus-friendly sidebar. |
| 235 | [JHyugou/dsh-bigmodel-consume](https://github.com/JHyugou/dsh-bigmodel-consume) | 0 | 2026-10-19 | 2026-10-19 | DSH 插件：在对话输入区实时显示智谱 GLM CodingPlan 5 小时与每周用量剩余（Zhipu GLM CodingPlan usage pill for DeepSeek Harness） |
| 236 | [JHyugou/dsh-enter-send](https://github.com/JHyugou/dsh-enter-send) | 0 | 2026-10-19 | 2026-10-19 | DSH 插件：在输入框工具行「权限」按钮右侧加一个发送键开关，可在 Enter 发送与 Ctrl+Enter 发送之间切换，另一个键自动变为换行（Send-key toggle chip for DeepSeek Harness） |
| 237 | [JHyugou/dsh-everything-search](https://github.com/JHyugou/dsh-everything-search) | 0 | 2026-10-19 | 2026-10-19 | DeepSeek Harness 插件：用 DSH 风格的应用内目录选择器接管「新建工作区」，支持盘符逐级浏览与 Everything 全盘文件夹搜索 |
| 238 | [JHyugou/dsh-remind](https://github.com/JHyugou/dsh-remind) | 0 | 2026-10-19 | 2026-10-19 | DSH 插件：任务完成 / 审批请求 / DSH 提问时用 Windows 原生通知（带提示音）提醒你——只有你不在看 DSH 时才打扰 |
| 239 | [JHyugou/dsh-sidebar-pet](https://github.com/JHyugou/dsh-sidebar-pet) | 0 | 2026-10-19 | 2026-10-19 | 小蓝桌宠：DeepSeek Harness 侧栏任务伙伴插件，支持连贯点击动画、任务提醒与独立外观设置 |
| 240 | [JHyugou/dsh-tidy](https://github.com/JHyugou/dsh-tidy) | 0 | 2026-10-19 | 2026-10-19 | DSH 插件：把暂时不用的工作区或单个会话拖进侧边栏「收纳区」，需要时再拖回来，收纳区可折叠（Sidebar stash area for DeepSeek Harness） |
| 241 | [jidekaixin2dian/dsh-toolgate](https://github.com/jidekaixin2dian/dsh-toolgate) | 0 | 2026-10-18 | 2026-10-19 | Manage MCP servers and skills in DeepSeek Harness, and control which tools enter the next prompt. |
| 242 | [jingmei2/dsh-session-trash](https://github.com/jingmei2/dsh-session-trash) | 0 | 2026-10-19 | 2026-10-19 | Physically delete DeepSeek Harness Sessions with an undoable recycle bin: move a Session log out of its workspace, restore it, or purge it for good. |
| 243 | [JinhangHE126/dsh-compact](https://github.com/JinhangHE126/dsh-compact) | 0 | 2026-10-13 | 2026-10-19 | Local proxy for DeepSeek Harness: keep recent turns verbatim and summarize older context. |
| 244 | [JOJO-Adam/dsh-blender](https://github.com/JOJO-Adam/dsh-blender) | 0 | 2026-10-19 | 2026-10-19 | Blender production pack for DeepSeek Harness: headless bpy runner, render/export, modeling cookbook, 5.x pitfalls. |
| 245 | [JOJO-Adam/dsh-comfyui](https://github.com/JOJO-Adam/dsh-comfyui) | 0 | 2026-10-19 | 2026-10-19 | ComfyUI 生产包 for DSH：环境体检、零依赖 API 客户端、实测参数与崩图排查。 |
| 246 | [JOJO-Adam/dsh-memory](https://github.com/JOJO-Adam/dsh-memory) | 0 | 2026-10-19 | 2026-10-19 | DSH 三层记忆中枢：全局/项目/人格记忆，本地优先零出站。 |
| 247 | [JOJO-Adam/dsh-release](https://github.com/JOJO-Adam/dsh-release) | 0 | 2026-10-19 | 2026-10-19 | One-command release pipeline for DSH plugins: check, bump, test, push, publish, verify, install. |
| 248 | [just-liuyi/dsh-plugin-versions](https://github.com/just-liuyi/dsh-plugin-versions) | 0 | 2026-10-19 | 2026-10-19 | Version browser for installed DeepSeek Harness plugins: list published versions, switch or roll back, and uninstall from the Plugins page. |
| 249 | [just-liuyi/dsh-workspace-lastused](https://github.com/just-liuyi/dsh-workspace-lastused) | 0 | 2026-10-19 | 2026-10-19 | DSH plugin: keeps the most recently used workspace first in the sidebar, persisted across restarts. |
| 250 | [jxboop/dsh-game](https://github.com/jxboop/dsh-game) | 0 | 2026-10-19 | 2026-10-19 | DeepSeek Harness 插件：九位 AI 娘同桌的狼人杀 + 《心跳文学部》，AI 自己玩、你看。代码由作者 luckui 原创独立开发。 |
| 251 | [jxboop/dsh-plugin-balance-hud](https://github.com/jxboop/dsh-plugin-balance-hud) | 0 | 2026-10-19 | 2026-10-19 | DSH 插件：右下角科技玄幻风 DeepSeek 余额徽章，可拖动、靠边自动收缩；API Key 只留在 Node 进程，不进浏览器。 |
| 252 | [jxboop/dsh-plugin-xiaowu](https://github.com/jxboop/dsh-plugin-xiaowu) | 0 | 2026-10-19 | 2026-10-19 | 小舞 · DSH 桌宠：原创 SVG 手绘兔耳少女，跟随 agent 状态换动作，运行时合成甜声说「做完啦……」。无任何外部素材或录音。 |
| 253 | [kaige1986kg/dsh-annotation-cards](https://github.com/kaige1986kg/dsh-annotation-cards) | 0 | 2026-10-19 | 2026-10-19 | Codex-style selection annotations for DeepSeek Harness (DSH): popover comment cards, blue reference badges, compact N-annotation chip, and sent-annotation cards. |
| 254 | [Kanokwans0957/argo](https://github.com/Kanokwans0957/argo) | 0 | 2026-10-18 | 2026-10-19 | 专门为 agent 打造的开源 agent 搜索工具，具备 200+的搜索源及多语言搜索能力，覆盖中文/英文/学术/代码/购物/金融/新闻/百科。 |
| 255 | [kanoonak/dsh-whale-catcher](https://github.com/kanoonak/dsh-whale-catcher) | 0 | 2026-10-19 | 2026-10-19 | DSH Web 小游戏：左下角会有一枚按钮，点开就可以玩捞 小鲸鱼抓token 的小游戏（非官方粉丝作品） |
| 256 | [kanzakivnw/answer-me-with-html-in-Shimo-Style](https://github.com/kanzakivnw/answer-me-with-html-in-Shimo-Style) | 0 | 2026-10-19 | 2026-10-19 | 让 AI Agent 用一页石墨风格 HTML 回答复杂问题 |
| 257 | [karina2256/dsh-codex-excellent-slider](https://github.com/karina2256/dsh-codex-excellent-slider) | 0 | 2026-10-19 | 2026-10-19 | 一个全新的为了dsh而准备的推理强度滑块，有chatgpt同款风格，改动自另外两位，现在已经是完全体 |
| 258 | [kathleenkorkmaz074/engramory](https://github.com/kathleenkorkmaz074/engramory) | 0 | 2026-10-19 | 2026-10-19 | A portable memory protocol for AI agents — load it as standing rules; a curation discipline + reference spec + optional cap hook. |
| 259 | [kathrynraymond/dsh-lowtide](https://github.com/kathrynraymond/dsh-lowtide) | 0 | 2026-10-19 | 2026-10-19 | Time-shifting task delegation for DeepSeek Harness (dsh): plan tasks at leisure, they run unattended off-peak, come back to a report. Human-adjudicated, desktop + web. |
| 260 | [Keith9122/argo](https://github.com/Keith9122/argo) | 0 | 2026-10-18 | 2026-10-19 | 专门为 agent 打造的开源 agent 搜索工具，具备 200+的搜索源及多语言搜索能力，覆盖中文/英文/学术/代码/购物/金融/新闻/百科。 |
| 261 | [keliwang/dsh-followup-prompt](https://github.com/keliwang/dsh-followup-prompt) | 0 | 2026-10-19 | 2026-10-19 | DeepSeek Harness plugin that predicts your next message after each reply. Press Tab to accept it as an editable draft; it never sends by itself. |
| 262 | [Kemalp1151/deepseek-harness-mobile](https://github.com/Kemalp1151/deepseek-harness-mobile) | 0 | 2026-10-18 | 2026-10-19 | Android companion for DeepSeek Harness \| chat, goals, approvals &amp; notifications from your phone, over your LAN. Kotlin + Jetpack Compose. |
| 263 | [kezi000/dsh-plugin-win-control](https://github.com/kezi000/dsh-plugin-win-control) | 0 | 2026-10-19 | 2026-10-19 | DSH/cordis plugin: 20 low-conflict Windows desktop + Chromium tools (window enumeration, UI Automation, offscreen capture, PostMessage click/type, isolated Chromium over CDP). |
| 264 | [kinocode-jp/dsh-lcu](https://github.com/kinocode-jp/dsh-lcu) | 0 | 2026-10-19 | 2026-10-19 | LCU (Codex computer use) for DeepSeek Harness: macOS app control with an approval dialog, via an MCP adapter. |
| 265 | [knxi/dsh-grsai-canvas](https://github.com/knxi/dsh-grsai-canvas) | 0 | 2026-10-19 | 2026-10-19 | DSH 右侧栏「画布」插件：无限画布 + 直接在图上标注 + 接入 GrsAI(gpt-image-2 / nano-banana) 按标注改图，结果放在原图旁边对比，画布自动存到工作区。 |
| 266 | [kobubu/Rag-Coding](https://github.com/kobubu/Rag-Coding) | 0 | 2026-10-13 | 2026-10-19 | Local code memory for DeepSeek Harness: automatic source context, semantic search, and dependency graphs. |
| 267 | [kolawong/dsh-plugin-clinepass](https://github.com/kolawong/dsh-plugin-clinepass) | 0 | 2026-10-19 | 2026-10-19 | DeepSeek Harness bundle: ClinePass model provider — seeds the llm-pi-ai \`clinepass\` route (endpoint, protocol, credential ref, 12-model catalog) so the Models settings page needs only the API key. |
| 268 | [koliy82/dsh-rustvy](https://github.com/koliy82/dsh-rustvy) | 0 | 2026-10-18 | 2026-10-19 | Vendor marks in the DeepSeek Harness model picker, and a model list kept in step with the provider |
| 269 | [konata/btw](https://github.com/konata/btw) | 0 | 2026-10-19 | 2026-10-19 | A DeepSeek Harness (DSH) plugin that adds parallel side chats to the right sidebar, inheriting the main session's workspace, tools, permissions, and model. |
| 270 | [Korkmaz1974/rapid-mlx-dsh-provider](https://github.com/Korkmaz1974/rapid-mlx-dsh-provider) | 0 | 2026-10-18 | 2026-10-19 | Native Rapid-MLX provider for DeepSeek Harness (dsh) — dsh reads model facts from the server instead of your settings.yaml. |
| 271 | [Lancang-hzau/dsh-live-terminal](https://github.com/Lancang-hzau/dsh-live-terminal) | 0 | 2026-10-19 | 2026-10-19 | Visible terminal panel for DeepSeek Harness: stream agent shell commands into the app live and let the agent capture the terminal screen as text. DSH ??????? |
| 272 | [laobinghongcha/dsh-plugin-turn-notify](https://github.com/laobinghongcha/dsh-plugin-turn-notify) | 0 | 2026-10-19 | 2026-10-19 | DSH 回合结束通知插件 — 系统原生通知 + 提示音，成功/出错/受阻/截断文案各异 |
| 273 | [larryn961/seektty](https://github.com/larryn961/seektty) | 0 | 2026-10-19 | 2026-10-19 | 面向 DeepSeek Harness 的 Claude Code 风格终端界面，支持 Windows、macOS 与 Linux，兼容透明终端、VS Code 主题和自定义配色。 |
| 274 | [LieveWood565/dsh-normify](https://github.com/LieveWood565/dsh-normify) | 0 | 2026-10-18 | 2026-10-19 | Normify · DSH 插件：把项目架构写成归一化的分形模块树，三层校验（写时 / 校验 / 冻结回执）、30 个 normify_* 工具 + normify-gen 技能，一键渲染单文件交互式架构图；支持伴随式开发（change_open → brief → check → 实施 → refresh → change_close）。 |
| 275 | [lilcandi/dsh-session-live](https://github.com/lilcandi/dsh-session-live) | 0 | 2026-10-19 | 2026-10-19 | Live activity preview inside DSH session hover cards: what each session is doing right now, how much it spent, and the image it touched last. |
| 276 | [Link-h1j/dsh-comfy](https://github.com/Link-h1j/dsh-comfy) | 0 | 2026-10-19 | 2026-10-19 | ComfyUI workflow canvas for the DSH (DeepSeek Harness) desktop right sidebar: browse, inspect, edit and run local ComfyUI workflows on a native infinite canvas instead of an embedded browser. |
| 277 | [Link-h1j/dsh-image-canvas](https://github.com/Link-h1j/dsh-image-canvas) | 0 | 2026-10-19 | 2026-10-19 | DSH desktop right-sidebar infinite canvas: collect any opened image on one pannable board, annotate it, hand the notes to the Agent, and edit/generate with local ComfyUI. |
| 278 | [liujuntao123/dsh-clinepass-pin](https://github.com/liujuntao123/dsh-clinepass-pin) | 0 | 2026-10-19 | 2026-10-19 | Pin the Cline Pass route in DeepSeek Harness to one upstream provider (default: first-party deepseek) by adding providerOptions.gateway.only to the chat request body. |
| 279 | [liushuchang-2012/dsh-boot-splash](https://github.com/liushuchang-2012/dsh-boot-splash) | 0 | 2026-10-19 | 2026-10-19 | Startup splash for DeepSeek Harness: the whale floods black, then pulls out the \| deepseek HARNESS wordmark. |
| 280 | [liyansong0015/dsh-sao-link-start](https://github.com/liyansong0015/dsh-sao-link-start) | 0 | 2026-10-18 | 2026-10-19 | Full-screen SAO-inspired startup animation for DeepSeek Harness with adjustable beam, dial, language and character settings. Original high-fidelity rendering by default; optional compatibility mode for low-end GPUs and a tunnel-only intro. |
| 281 | [lizyoko9/lizyoko-better-dsh](https://github.com/lizyoko9/lizyoko-better-dsh) | 0 | 2026-10-19 | 2026-10-19 | 个人 DSH（DeepSeek Harness）Web UI 增强：目录链接直接打开为可浏览的文件夹页。Personal UX fixes for the DeepSeek Harness web client. |
| 282 | [lj100886/dsh-framework-doctor](https://github.com/lj100886/dsh-framework-doctor) | 0 | 2026-10-19 | 2026-10-19 | Configure model providers by probing their endpoint, check DeepSeek Harness health, and repair what can be fixed - from a standalone settings page. |
| 283 | [llklkl/dsh-workspace-groups](https://github.com/llklkl/dsh-workspace-groups) | 0 | 2026-10-19 | 2026-10-19 | DSH Web GUI 插件：分组/项目侧栏视图，支持归档、搜索、置顶与拖拽排序 |
| 284 | [LogosFu/dsh-mengpo](https://github.com/LogosFu/dsh-mengpo) | 0 | 2026-10-19 | 2026-10-19 | 梦婆·记忆 — DSH (DeepSeek Harness) 本地记忆可视化管理插件：查看/编辑/删除/禁用全局记忆与各项目 insights |
| 285 | [lsyed835/argo](https://github.com/lsyed835/argo) | 0 | 2026-10-19 | 2026-10-19 | 专门为 agent 打造的开源 agent 搜索工具，具备 200+的搜索源及多语言搜索能力，覆盖中文/英文/学术/代码/购物/金融/新闻/百科。 |
| 286 | [lu123bing/dsh-wordcraft](https://github.com/lu123bing/dsh-wordcraft) | 0 | 2026-10-19 | 2026-10-19 | WordCraft editor panel for DeepSeek Harness: live DOCX editing in the right Sidebar Browser, synchronized with agent tool calls. |
| 287 | [lundberg563/dsh-noema](https://github.com/lundberg563/dsh-noema) | 0 | 2026-10-18 | 2026-10-19 | Noema long-term memory plugin for DSH: durable, inspectable agent memory with recall tools and a settings page. |
| 288 | [luyiheng1111/dsh-context-window-picker](https://github.com/luyiheng1111/dsh-context-window-picker) | 0 | 2026-10-19 | 2026-10-19 | Session-scoped context window selector for the DeepSeek Harness model picker |
| 289 | [lzxvic/dsh-ui-opacity](https://github.com/lzxvic/dsh-ui-opacity) | 0 | 2026-10-19 | 2026-10-19 | Adjustable opacity for DeepSeek Harness popup menus and the session header. |
| 290 | [MapleLeafWH/dsh-plugin-prompt-enhance](https://github.com/MapleLeafWH/dsh-plugin-prompt-enhance) | 0 | 2026-10-19 | 2026-10-19 | DSH Desktop 提示词增强插件：1:1 复刻 WorkBuddy 的增强按钮，含插件详情页配置面板与 dsh-cost-meter 费用估算 |
| 291 | [Mappedinfo/dsh-todo](https://github.com/Mappedinfo/dsh-todo) | 0 | 2026-10-19 | 2026-10-19 | DeepSeek Harness 待办清单插件：列表 / Markdown 双视图，自动补齐创建时间、提醒时间与提醒模式 |
| 292 | [mason8658/seektty](https://github.com/mason8658/seektty) | 0 | 2026-10-19 | 2026-10-19 | 面向 DeepSeek Harness 的 Claude Code 风格终端界面，支持 Windows、macOS 与 Linux，兼容透明终端、VS Code 主题和自定义配色。 |
| 293 | [mehdinikzad68/dsh-session-manager](https://github.com/mehdinikzad68/dsh-session-manager) | 0 | 2026-10-19 | 2026-10-19 | Delete DSH (DeepSeek Harness) sessions and workspace data from the Web GUI — a per-session Delete menu row, a management settings page with sizes, and a restorable trash. |
| 294 | [Memory175/blender-mentor](https://github.com/Memory175/blender-mentor) | 0 | 2026-10-19 | 2026-10-19 | Blender 全栈导师 AI Skill：教学、评分、资产验收、ESD/BIO   Blender Full-Stack Mentor AI Skill — teaching, grading, asset acceptance, ESD/BIO |
| 295 | [MengXingXiaoMing/dsh-tianjige](https://github.com/MengXingXiaoMing/dsh-tianjige) | 0 | 2026-10-19 | 2026-10-19 | 天机阁 · 算法天书：219 门图形/动画/物理/AI 算法的可查询 DSH 插件——10 个 agent 工具 + 侧栏页面（检索、档案、问天书、复核、体检），内置起始库，装完即用。 |
| 296 | [Meowrium/dsh-doc-tree](https://github.com/Meowrium/dsh-doc-tree) | 0 | 2026-10-19 | 2026-10-19 | Governed documentation tree for the DeepSeek Harness right sidebar, with AI-assisted /docs-organize workflow. |
| 297 | [mikael2727/dsh-crew](https://github.com/mikael2727/dsh-crew) | 0 | 2026-10-18 | 2026-10-19 | DeepSeek Harness (DSH) plugin: dispatch work to DSH agents from Claude Code / Codex — native subagent progress, in-host worker sessions with per-tier presets, and a multimodal bridge that lends the text-only harness vision and image generation. |
| 298 | [Milaro001/dsh-provenance-lens](https://github.com/Milaro001/dsh-provenance-lens) | 0 | 2026-10-19 | 2026-10-19 | 上下文溯源透镜：在 DeepSeek Harness 长对话中追溯选中文本关联的历史消息与工具材料，点击依据回到原文，保存摘录、结论和假设，并导出 Markdown 档案。V0.1 测试版。 |
| 299 | [Minglink/dsh-community](https://github.com/Minglink/dsh-community) | 0 | 2026-10-18 | 2026-10-19 | DeepSeek Harness (DSH) 官方与开源生态「插件与 Skill 双生态市场」一键安装与资产管理中心 (Plugins &amp; Skills Market) |
| 300 | [MisaHenry78987/argo](https://github.com/MisaHenry78987/argo) | 0 | 2026-10-19 | 2026-10-19 | 专门为 agent 打造的开源 agent 搜索工具，具备 200+的搜索源及多语言搜索能力，覆盖中文/英文/学术/代码/购物/金融/新闻/百科。 |
| 301 | [MLMLZJ/dsh-install-profiler](https://github.com/MLMLZJ/dsh-install-profiler) | 0 | 2026-10-19 | 2026-10-19 | DeepSeek Harness 插件：Windows 安装包静态画像 + 静态画像驱动的动态取证与故障排查 |
| 302 | [MLMLZJ/dsh-plugins](https://github.com/MLMLZJ/dsh-plugins) | 0 | 2026-10-19 | 2026-10-19 | DeepSeek Harness 插件索引：Windows 软件安装画像与动态取证 + 逆向反编译 |
| 303 | [MLMLZJ/dsh-reverse-skill](https://github.com/MLMLZJ/dsh-reverse-skill) | 0 | 2026-10-19 | 2026-10-19 | DeepSeek Harness 插件：本地软件逆向与反编译技能（APK/JAR/.NET/原生 PE/固件），带工具探测、授权门禁、证据分级 |
| 304 | [MochiNek0/dsh-ghost-prompt](https://github.com/MochiNek0/dsh-ghost-prompt) | 0 | 2026-10-18 | 2026-10-19 | Prompt suggestions for DeepSeek Harness (dsh): the model predicts your next message and shows it as ghost text in the composer — press → to accept. 输入框幽灵文字预测你的下一句，按 → 接受。 |
| 305 | [moonmoonCL/dsh-provider-peak](https://github.com/moonmoonCL/dsh-provider-peak) | 0 | 2026-10-19 | 2026-10-19 | Provider-aware DeepSeek peak/off-peak badge for DSH. 在输入框工具栏显示 DeepSeek 峰谷时段，只在选中的模型属于 DeepSeek provider 时出现。 |
| 306 | [MuQY1818/ds-bot-mobile-app](https://github.com/MuQY1818/ds-bot-mobile-app) | 0 | 2026-10-18 | 2026-10-19 | Native mobile client source preview for DS Bot, with an independent desktop pairing companion. React Native + Expo; iOS and Android source. |
| 307 | [MuQY1818/ds-bot-mobile-bridge](https://github.com/MuQY1818/ds-bot-mobile-bridge) | 0 | 2026-10-19 | 2026-10-19 | Device pairing, scoped authorization and message transport for the DS Bot native mobile client. An independent DSH plugin. |
| 308 | [nanfangtown/file-checker](https://github.com/nanfangtown/file-checker) | 0 | 2026-10-19 | 2026-10-19 | A DSH plugin that adds a one-click Open location button to delivered-file cards. |
| 309 | [Nanfeng0108/dsh-xhs-batch-studio](https://github.com/Nanfeng0108/dsh-xhs-batch-studio) | 0 | 2026-10-19 | 2026-10-19 | 把 Excel/PDF/Word 资料批量做成小红书图文：提炼选题、写文案、按模板出封面与内页图。DSH Desktop 工作台插件。 |
| 310 | [NaoShimizu40334/dsh-crew](https://github.com/NaoShimizu40334/dsh-crew) | 0 | 2026-10-19 | 2026-10-19 | DeepSeek Harness (DSH) plugin: dispatch work to DSH agents from Claude Code / Codex — native subagent progress, in-host worker sessions with per-tier presets, and a multimodal bridge that lends the text-only harness vision and image generation. |
| 311 | [nayeonm613/dsh-normify](https://github.com/nayeonm613/dsh-normify) | 0 | 2026-10-18 | 2026-10-19 | Normify · DSH 插件：把项目架构写成归一化的分形模块树，三层校验（写时 / 校验 / 冻结回执）、30 个 normify_* 工具 + normify-gen 技能，一键渲染单文件交互式架构图；支持伴随式开发（change_open → brief → check → 实施 → refresh → change_close）。 |
| 312 | [nekojackie/dsh-mcp-manager](https://github.com/nekojackie/dsh-mcp-manager) | 0 | 2026-10-19 | 2026-10-19 | Manage MCP servers inside DeepSeek Harness: enable/disable, OAuth 2.1 authorization, scheduled + after-expiry token renewal, and a tool browser with descriptions. Generated by DeepSeek V4.1 Flash. |
| 313 | [Neslihan783/dsh-normify](https://github.com/Neslihan783/dsh-normify) | 0 | 2026-10-18 | 2026-10-19 | Normify · DSH 插件：把项目架构写成归一化的分形模块树，三层校验（写时 / 校验 / 冻结回执）、30 个 normify_* 工具 + normify-gen 技能，一键渲染单文件交互式架构图；支持伴随式开发（change_open → brief → check → 实施 → refresh → change_close）。 |
| 314 | [new-233/easyeda-agent](https://github.com/new-233/easyeda-agent) | 0 | 2026-10-19 | 2026-10-19 | Nothing |
| 315 | [NingTiAn-byte/dsh-intelligent-ui](https://github.com/NingTiAn-byte/dsh-intelligent-ui) | 0 | 2026-10-18 | 2026-10-19 | Interactive, replayable generative UI for DeepSeek Harness — charts, maps, images, templates and standalone MCP. |
| 316 | [NingTiAn-byte/DSH-TokenDashboard](https://github.com/NingTiAn-byte/DSH-TokenDashboard) | 0 | 2026-10-19 | 2026-10-19 | A local token usage, API call, and cache statistics dashboard for DeepSeek Harness. |
| 317 | [NN-0101/dsh-remove-session](https://github.com/NN-0101/dsh-remove-session) | 0 | 2026-10-19 | 2026-10-19 | 在 DSH Web UI 的会话「…」菜单中增加红色“删除会话”，二次确认后从磁盘删除会话记录。 |
| 318 | [oldzhang82/dsh-tps-ttft](https://github.com/oldzhang82/dsh-tps-ttft) | 0 | 2026-10-19 | 2026-10-19 | 每轮对话的 TPS / TTFT 统计：模型耗时、工具耗时、首 token 延迟、输出速度，显示在「本轮用量」面板。 \| Per-turn TPS and TTFT statistics: model time, tool time, TTFT, and output speed, shown in the Turn Usage panel. |
| 319 | [omokom/dsh-progress-eta](https://github.com/omokom/dsh-progress-eta) | 0 | 2026-10-19 | 2026-10-19 | DSH 插件：任务执行中在输入框左侧显示预估进度与剩余时间（三路融合估算 + 可选 LLM 精修） |
| 320 | [OrderG-X/dsh-design-studio](https://github.com/OrderG-X/dsh-design-studio) | 0 | 2026-10-19 | 2026-10-19 | Design canvas for DeepSeek Harness (DSH): screens in device frames, click an element to edit it, versions, export, phone preview. · DSH 设计工作台：模型画的界面摆上画布，点一下就改。 |
| 321 | [OrderG-X/dsh-mobile](https://github.com/OrderG-X/dsh-mobile) | 0 | 2026-10-19 | 2026-10-19 | Use DeepSeek Harness (DSH) from your phone: scan a QR code, watch and steer the tasks on your computer, on Wi-Fi or anywhere via a free Cloudflare tunnel. · DSH 手机端：扫码在手机浏览器里看电脑上的任务。 |
| 322 | [PandaBoby/dsh-rea](https://github.com/PandaBoby/dsh-rea) | 0 | 2026-10-19 | 2026-10-19 | DeepSeek Harness plugin bundle: REA (Reverse Engineer Anything) MCP tools behind a single Plugins-page switch. Ships no engine — only the connection declaration. |
| 323 | [Phoeky/dsh-refresh-plugin](https://github.com/Phoeky/dsh-refresh-plugin) | 0 | 2026-10-15 | 2026-10-19 | DSH desktop refresh plugin: binds F5 / Ctrl+R to reload the app page (F5 does not work in production builds by default). |
| 324 | [Phonky-Chou/dsh-pointer](https://github.com/Phonky-Chou/dsh-pointer) | 0 | 2026-10-17 | 2026-10-19 | 在 DeepSeek Harness 的 HTML 预览里直接圈选 DOM 元素/区域，把选择器与源码行号精确交给 agent —— 修前端代码时不用再描述「那个卡片」。 |
| 325 | [PhuongNgo7048/flameox](https://github.com/PhuongNgo7048/flameox) | 0 | 2026-10-18 | 2026-10-19 | Runtime evidence that helps agents trace, profile, and burn down hotspots in application and native code, GPU kernels, and inference stacks. |
| 326 | [PiedPiperMoney/dsh-skill-portfolio](https://github.com/PiedPiperMoney/dsh-skill-portfolio) | 0 | 2026-10-18 | 2026-10-19 | DSH plugin: personal investment portfolio dashboard (Snowball, T-Invest, BCS, Sber, Intelinvest, CSV) |
| 327 | [PipeDream941/dsh-subagent-antigravity](https://github.com/PipeDream941/dsh-subagent-antigravity) | 0 | 2026-10-19 | 2026-10-19 | Antigravity subagent for DeepSeek Harness: run Google Antigravity CLI (agy) as a one-shot coding subagent (subagent_antigravity), including Gemini 4 Argon. |
| 328 | [PipeDream941/dsh-subagent-gemini](https://github.com/PipeDream941/dsh-subagent-gemini) | 0 | 2026-10-19 | 2026-10-19 | WIP (not published yet): Gemini CLI subagent for DeepSeek Harness. Gemini CLI does not offer Gemini 4 yet; use dsh-subagent-antigravity for Gemini 4. |
| 329 | [pktheme/dsh-cost-slip](https://github.com/pktheme/dsh-cost-slip) | 0 | 2026-10-18 | 2026-10-19 | DSH plugin: shows the current session's estimated cost in CNY in the composer dock; open it for a receipt-style breakdown and account balance. |
| 330 | [PonyDevAI/dsh-model-usage](https://github.com/PonyDevAI/dsh-model-usage) | 0 | 2026-10-19 | 2026-10-19 | DSH Web 插件：模型供应商额度与用量（DeepSeek / GLM Coding Plan / OpenRouter / Kimi Coding + 自定义适配器） |
| 331 | [puciguala/dsh-web-search-custom](https://github.com/puciguala/dsh-web-search-custom) | 0 | 2026-10-19 | 2026-10-19 | Use configured DSH model providers and credentials for OpenAI Responses web search. |
| 332 | [Pugto-AI/yue-token-cost](https://github.com/Pugto-AI/yue-token-cost) | 0 | 2026-10-12 | 2026-10-19 | Measure what Chinese/Cantonese actually costs in tokens - and why. MCP server: cross-script comparison, per-token attribution, reproducible benchmark. |
| 333 | [qftuftfutg/apk-devkit](https://github.com/qftuftfutg/apk-devkit) | 0 | 2026-10-19 | 2026-10-19 | APK 开发调试工具集：解包、回编、签名、DEX、文件、压缩包、图片、哈希（DSH 插件，Windows） |
| 334 | [QIRSHENG/dsh-tray-restart](https://github.com/QIRSHENG/dsh-tray-restart) | 0 | 2026-10-19 | 2026-10-19 | Adds a Restart item to the DeepSeek Harness desktop system-tray menu and re-applies the patch after every app update. |
| 335 | [qiufengsir/dsh-novel-reader](https://github.com/qiufengsir/dsh-novel-reader) | 0 | 2026-10-19 | 2026-10-19 | 拾页：DeepSeek Harness 本地小说阅读器侧栏插件 / Local TXT novel reader sidebar plugin |
| 336 | [QR-0W/DSH-Custom-Auto-Review](https://github.com/QR-0W/DSH-Custom-Auto-Review) | 0 | 2026-10-09 | 2026-10-19 | Choose your own configured model and reasoning effort for DeepSeek Harness Auto Review. |
| 337 | [qunqin24/dsh-plugin-search-hub](https://github.com/qunqin24/dsh-plugin-search-hub) | 0 | 2026-10-19 | 2026-10-19 | Multi-engine web search plugin for DeepSeek Harness: free AI search rotation with cooldown, Tavily/Brave/Serper/Exa/Perplexity/Jina/Bocha/SearXNG, settings page. |
| 338 | [Rad-Weed/DSH-UI-Beautify](https://github.com/Rad-Weed/DSH-UI-Beautify) | 0 | 2026-10-18 | 2026-10-19 | DSH界面美化 · DSH UI Beautify —— 用于 DSH 的桌面壁纸 + 毛玻璃美化插件（零布局侵入、可逐字节回滚、自带诊断面板） |
| 339 | [raven3005672/dsh-plugin-shell-skin](https://github.com/raven3005672/dsh-plugin-shell-skin) | 0 | 2026-10-18 | 2026-10-19 | DSH 浏览器皮肤插件：开场动画、自定义壁纸、面板透明度，设置即时生效。 |
| 340 | [RaziMoretti/dsh-crew](https://github.com/RaziMoretti/dsh-crew) | 0 | 2026-10-18 | 2026-10-19 | DeepSeek Harness (DSH) plugin: dispatch work to DSH agents from Claude Code / Codex — native subagent progress, in-host worker sessions with per-tier presets, and a multimodal bridge that lends the text-only harness vision and image generation. |
| 341 | [RestRegular/dsh-pocket](https://github.com/RestRegular/dsh-pocket) | 0 | 2026-10-19 | 2026-10-19 | Pocket for DeepSeek Harness: mobile web access to sessions, live output, tool calls, questions and approvals. |
| 342 | [Ricardoy29111/engramory](https://github.com/Ricardoy29111/engramory) | 0 | 2026-10-18 | 2026-10-19 | A portable memory protocol for AI agents — load it as standing rules; a curation discipline + reference spec + optional cap hook. |
| 343 | [RicardoYan/dsh-fs-search-plus](https://github.com/RicardoYan/dsh-fs-search-plus) | 0 | 2026-10-18 | 2026-10-19 | Extend the built-in glob/grep tools: symlink following by default, extra grep flags, and a parallel glob that still returns newest first · 增强 DSH 内置的 glob / grep：默认跟随符号链接，grep 增加忽略大小写、上下文、文件类型，glob 并行扫描但结果仍按修改时间倒序 |
| 344 | [riccardi93994/flameox](https://github.com/riccardi93994/flameox) | 0 | 2026-10-18 | 2026-10-19 | Runtime evidence that helps agents trace, profile, and burn down hotspots in application and native code, GPU kernels, and inference stacks. |
| 345 | [richardhxwang/dsh-workbuddy-multi](https://github.com/richardhxwang/dsh-workbuddy-multi) | 0 | 2026-10-19 | 2026-10-19 | Multi-account companion for dsh-workbuddy-connect · dsh-workbuddy-connect 的多账号伴侣插件 |
| 346 | [Richter29/argo](https://github.com/Richter29/argo) | 0 | 2026-10-18 | 2026-10-19 | 专门为 agent 打造的开源 agent 搜索工具，具备 200+的搜索源及多语言搜索能力，覆盖中文/英文/学术/代码/购物/金融/新闻/百科。 |
| 347 | [rRangel696/dsh-lowtide](https://github.com/rRangel696/dsh-lowtide) | 0 | 2026-10-18 | 2026-10-19 | Time-shifting task delegation for DeepSeek Harness (dsh): plan tasks at leisure, they run unattended off-peak, come back to a report. Human-adjudicated, desktop + web. |
| 348 | [RUI-debug769/dsh-dotclaude](https://github.com/RUI-debug769/dsh-dotclaude) | 0 | 2026-10-19 | 2026-10-19 | Run a Claude Code project's .claude/ assets inside DeepSeek Harness: project slash commands with argument expansion, and permissions.deny enforcement. |
| 349 | [ruthgarcia10/jevcore](https://github.com/ruthgarcia10/jevcore) | 0 | 2026-10-19 | 2026-10-19 | TypeSafe Jev for DeepSeek Harness, the Model Context Protocol, and plain Node: typed judgments instead of prose, offline by default. |
| 350 | [RyeSama/dsh-plugin-guard](https://github.com/RyeSama/dsh-plugin-guard) | 0 | 2026-10-19 | 2026-10-19 | Security governance and admission layer for DSH plugins: one-command scan, dsh.permissions spec, trust index, runtime audit adapter. |
| 351 | [S-anZZz/dsh-pink-bow-kitty](https://github.com/S-anZZz/dsh-pink-bow-kitty) | 0 | 2026-10-19 | 2026-10-19 | Soft pink bow-kitty theme for the DeepSeek Harness Web UI: kitty-print wallpaper, light and dark palettes, kitty mascots. |
| 352 | [Sacredbluedragon/dsh-bili-watch](https://github.com/Sacredbluedragon/dsh-bili-watch) | 0 | 2026-10-19 | 2026-10-19 | 给模型看 B 站视频的 DSH 插件：字幕、转写、抽帧 OCR、评论与弹幕。 |
| 353 | [Saga19955/flameox](https://github.com/Saga19955/flameox) | 0 | 2026-10-18 | 2026-10-19 | Runtime evidence that helps agents trace, profile, and burn down hotspots in application and native code, GPU kernels, and inference stacks. |
| 354 | [sanchez85030/dsh-noema](https://github.com/sanchez85030/dsh-noema) | 0 | 2026-10-18 | 2026-10-19 | Noema long-term memory plugin for DSH: durable, inspectable agent memory with recall tools and a settings page. |
| 355 | [sanders07366/flameox](https://github.com/sanders07366/flameox) | 0 | 2026-10-19 | 2026-10-19 | Runtime evidence that helps agents trace, profile, and burn down hotspots in application and native code, GPU kernels, and inference stacks. |
| 356 | [Sarar57/dsh-normify](https://github.com/Sarar57/dsh-normify) | 0 | 2026-10-18 | 2026-10-19 | Normify · DSH 插件：把项目架构写成归一化的分形模块树，三层校验（写时 / 校验 / 冻结回执）、30 个 normify_* 工具 + normify-gen 技能，一键渲染单文件交互式架构图；支持伴随式开发（change_open → brief → check → 实施 → refresh → change_close）。 |
| 357 | [scarlet20252025-cloud/DSH_Computeruse_Enhance](https://github.com/scarlet20252025-cloud/DSH_Computeruse_Enhance) | 0 | 2026-10-19 | 2026-10-19 | DSH Computer Use Enhance: rebuild ZCode Computer Use as a DSH plugin with performance and contract hardening. get_app_state 400-element 1432ms -&gt; ~250ms. Windows native backend (PowerShell 5.1 + UI Automation + C# tree walker). |
| 358 | [Schaefer2197/flameox](https://github.com/Schaefer2197/flameox) | 0 | 2026-10-18 | 2026-10-19 | Runtime evidence that helps agents trace, profile, and burn down hotspots in application and native code, GPU kernels, and inference stacks. |
| 359 | [Self-Identity/dsh-client-ui-history-nav](https://github.com/Self-Identity/dsh-client-ui-history-nav) | 0 | 2026-10-19 | 2026-10-19 | Browser-style Back / Forward / Refresh controls in the DSH client title bar. |
| 360 | [Self-Identity/dsh-client-ui-thick-scrollbar](https://github.com/Self-Identity/dsh-client-ui-thick-scrollbar) | 0 | 2026-10-19 | 2026-10-19 | Global scrollbar thickness tuner for the DeepSeek Harness client. |
| 361 | [Self-Identity/dsh-client-ui-workspace-suite](https://github.com/Self-Identity/dsh-client-ui-workspace-suite) | 0 | 2026-10-19 | 2026-10-19 | Explorer-style workspace picker, nested workspace tree and per-workspace overview for the DSH client. |
| 362 | [Shad0wwa1ker/dsh-browser-mode](https://github.com/Shad0wwa1ker/dsh-browser-mode) | 0 | 2026-10-19 | 2026-10-19 | DeepSeek Harness bundle: a visible-browser preset plus a consent gate that keeps every other Session from opening a browser on its own. |
| 363 | [ShiMarin233/dsh-session-hud](https://github.com/ShiMarin233/dsh-session-hud) | 0 | 2026-10-19 | 2026-10-19 | Session-status desktop pet for DeepSeek Harness (dsh): live counts of running / unread-completed / waiting-for-choice sessions; click a count to jump. |
| 364 | [ShingStars/dsh-bili-free-scroll](https://github.com/ShingStars/dsh-bili-free-scroll) | 0 | 2026-10-19 | 2026-10-19 | 已并入 ShingStars/dsh-bili-models（归档，仅作历史参考） |
| 365 | [ShingStars/dsh-bili-models](https://github.com/ShingStars/dsh-bili-models) | 0 | 2026-10-19 | 2026-10-19 | dsh-bili-scroll + a per-run model picker: pick any model registered in your DSH, including free models from other plugins (e.g. Our Free Model) |
| 366 | [shisuiqingqian/dsh-video-kit](https://github.com/shisuiqingqian/dsh-video-kit) | 0 | 2026-10-19 | 2026-10-19 | DeepSeek Harness 插件：读取本地视频或网页链接，返回带时间轴的逐字稿与关键帧图片，供模型逐帧查看。 |
| 367 | [simmon-clap/dsh-intelligent-ui](https://github.com/simmon-clap/dsh-intelligent-ui) | 0 | 2026-10-19 | 2026-10-19 | DSH plugin for DeepSeek Harness — turns answers into interactive Paper Glass cards. 24 components, streaming + persistent turn cards. |
| 368 | [sleepinginsummer/dsh-fff](https://github.com/sleepinginsummer/dsh-fff) | 0 | 2026-08-14 | 2026-10-19 | DSH 插件：模糊路径查找 + 索引内容搜索（find_files / resolve_file / related_files），移植自 pi-fff。 |
| 369 | [snow-The/dsh-acp-memory](https://github.com/snow-The/dsh-acp-memory) | 0 | 2026-09-04 | 2026-10-19 | Unified local memory for DeepSeek Harness, backed by ACP graph: seven-layer memory (soul/user/project/fact/lesson/topic/rules), capture→recall→inject, module-separated core (server-ready) + thin DSH adapter. |
| 370 | [snow-The/dsh-browser](https://github.com/snow-The/dsh-browser) | 0 | 2026-08-22 | 2026-10-19 | Browser interaction for DeepSeek Harness: drive local Chrome/Edge via playwright-core (CDP). Open, snapshot, click, type, scroll, evaluate, screenshot. Real browser, local-only. |
| 371 | [snow-The/dsh-busyloop](https://github.com/snow-The/dsh-busyloop) | 0 | 2026-08-22 | 2026-10-19 | DSH agent-loop engine: host-LLM adapter + loop skeleton over host ctx (busyloop: capability, not codex style) |
| 372 | [snow-The/dsh-busyloop-tools](https://github.com/snow-The/dsh-busyloop-tools) | 0 | 2026-08-22 | 2026-10-19 | Expose the dsh-busyloop engine to the agent as a tool: run one-off subagent loops on a chosen LLM channel (Volcano Ark plan API by default) without touching the main model's tokens. |
| 373 | [snow-The/dsh-eigenflux](https://github.com/snow-The/dsh-eigenflux) | 0 | 2026-10-02 | 2026-10-19 | Drive the EigenFlux agent-broadcast network from DSH tools: status, surface introspection, read-only feed, and two-step confirmed publishing. No timers, no background cadence — the human decides when the network is consulted. |
| 374 | [snow-The/dsh-gitkit](https://github.com/snow-The/dsh-gitkit) | 0 | 2026-08-21 | 2026-10-19 | Structured Git tools for DeepSeek Harness: status / diff / log / commit / branch with path validation and shell-free exec (own-built, replacing third-party git plugins). |
| 375 | [snow-The/dsh-goroutine](https://github.com/snow-The/dsh-goroutine) | 0 | 2026-09-10 | 2026-10-19 | @snow-the/goroutine: Go-style goroutines, channels and a worker pool on node:worker_threads (Node/Deno/Bun) |
| 376 | [snow-The/dsh-lib-analyzer](https://github.com/snow-The/dsh-lib-analyzer) | 0 | 2026-08-21 | 2026-10-19 | Library absorption analysis for DeepSeek Harness: scan reference corpora, drive absorption-report batches (tasks.jsonl to out/*.md), validate report discipline (file:line evidence, comparison markers), and keep a searchable per-library knowledge base driven by auditable reports instead of conversation recall. |
| 377 | [snow-The/dsh-notemap](https://github.com/snow-The/dsh-notemap) | 0 | 2026-08-22 | 2026-10-19 | Shared knowledge graph for DeepSeek Harness: notes with quantified relations (weights/confidence), graph algorithms (BFS/Dijkstra/centrality/common-neighbors/PageRank), DuckLake-inspired snapshots, and a cross-session/cross-agent fusion index. Headless: agents query the graph, no canvas UI. |
| 378 | [snow-The/dsh-own-plugins](https://github.com/snow-The/dsh-own-plugins) | 0 | 2026-08-15 | 2026-10-19 | Own-built DSH plugins (DeepSeek Harness) — replacement for third-party plugins that broke with DSH 0.1.0-rc.6. Zero runtime dependencies, node builtins only, unit-tested. |
| 379 | [snow-The/dsh-plugin-doctor](https://github.com/snow-The/dsh-plugin-doctor) | 0 | 2026-08-21 | 2026-10-19 | Static pre-install vetting for DSH plugins: scans a directory or installed package for exfiltration, credential access, obfuscation, persistence and lifecycle-script red flags (own-built, replacing third-party vetting plugins). |
| 380 | [snow-The/dsh-plugin-guide](https://github.com/snow-The/dsh-plugin-guide) | 0 | 2026-08-22 | 2026-10-19 | DSH plugin: boot conformance scanner (guide_scan: plugin + profile modes) + official capability map (guide_learn) |
| 381 | [snow-The/dsh-search](https://github.com/snow-The/dsh-search) | 0 | 2026-08-22 | 2026-10-19 | Universal search toolkit for DeepSeek Harness: unified web search provider (Bing/DDG/SearXNG/Exa/Tavily with fallback chain + cache), page fetch, GitHub search, vector corpus, deep-web probe + local codebase semantic search (search_code). |
| 382 | [snow-The/dsh-session-repair](https://github.com/snow-The/dsh-session-repair) | 0 | 2026-08-23 | 2026-10-19 | Scans and repairs DSH session logs: re-encodes single-frame corrupt zstd files back to the multi-frame layout and marks unknown event types (e.g. llm/failover) as ignorable so older harnesses can load newer logs. |
| 383 | [snow-The/dsh-setup](https://github.com/snow-The/dsh-setup) | 0 | 2026-08-22 | 2026-10-19 | DSH web profile template for multi-machine deployment — plugins, patch layer, one-command setup. No keys inside. |
| 384 | [snow-The/dsh-skill-pack](https://github.com/snow-The/dsh-skill-pack) | 0 | 2026-08-21 | 2026-10-19 | Curated engineering skills for DeepSeek Harness: handoff, grilling, teach, spec/ticket workflows, writing skills, and the DESIGN.md format. Cross-platform (pure SKILL.md text, no platform code). |
| 385 | [snow-The/dsh-snapshot](https://github.com/snow-The/dsh-snapshot) | 0 | 2026-08-21 | 2026-10-19 | Backup / restore / rotate snapshots of ~/.dsh for DeepSeek Harness — sha256-verified archives with path-traversal protection (own-built, replacing third-party backup plugins). |
| 386 | [snow-The/dsh-starter-kit](https://github.com/snow-The/dsh-starter-kit) | 0 | 2026-08-15 | 2026-10-19 | DSH 初级整合包 —— 一键基础环境。插件清单的唯一事实源是 scripts/manifest.json；install.ps1 / install.sh / README 都从它取，不再各写一份（旧版三处各写一份，结果三方都漂了，README 的安装 URL 甚至指向不存在的分支）。 |
| 387 | [snow-The/dsh-ui-shim](https://github.com/snow-The/dsh-ui-shim) | 0 | 2026-10-02 | 2026-10-19 | RETIRED: three-column DOM shim for DSH web — stamps data-pane/data-dsh-frame so plugins could target sidebar/conversation/details without depending on official class names. Retired because only one UI stack remains and nothing consumed the markers. Kept for reference. |
| 388 | [snow-The/dsh-w8-sandbox](https://github.com/snow-The/dsh-w8-sandbox) | 0 | 2026-10-02 | 2026-10-19 | W8 sandbox plugin for DeepSeek Harness |
| 389 | [snowfoxHQ/dsh-vecrecall](https://github.com/snowfoxHQ/dsh-vecrecall) | 0 | 2026-10-19 | 2026-10-19 | DeepSeek Harness plugin - persistent four-layer cognitive memory for agents, backed by vecRecall |
| 390 | [SoldierNo4/dsh-stata](https://github.com/SoldierNo4/dsh-stata) | 0 | 2026-10-19 | 2026-10-19 | 在 DSH（DeepSeek Harness）中控制 Stata：常驻 GUI 会话、执行命令与 .do 文件、回读控制台输出（无需 COM / 管理员 / 批处理模式） |
| 391 | [SomchaiRomero71906/rapid-mlx-dsh-provider](https://github.com/SomchaiRomero71906/rapid-mlx-dsh-provider) | 0 | 2026-10-18 | 2026-10-19 | Native Rapid-MLX provider for DeepSeek Harness (dsh) — dsh reads model facts from the server instead of your settings.yaml. |
| 392 | [starash07/dsh-link-open](https://github.com/starash07/dsh-link-open) | 0 | 2026-10-19 | 2026-10-19 | 在 DeepSeek Harness 桌面客户端里右键链接，用默认浏览器打开 |
| 393 | [starash07/dsh-plugin-annotate](https://github.com/starash07/dsh-plugin-annotate) | 0 | 2026-10-19 | 2026-10-19 | Codex-style selection quote reply for the DeepSeek Harness desktop client (fork of mar1259/dsh-plugin-codex-annotate) |
| 394 | [STARDUSTLC666/dsh-review](https://github.com/STARDUSTLC666/dsh-review) | 0 | 2026-10-17 | 2026-10-19 | 以证据为准的代码审阅插件：审 diff、验证结论、记录噪音，让 agent 先读、人只读结论。 |
| 395 | [StarMoon-win/dsh-restart-plugin](https://github.com/StarMoon-win/dsh-restart-plugin) | 0 | 2026-10-19 | 2026-10-19 | Sidebar restart button for DeepSeek Harness Desktop: one click fully quits and reopens the app. |
| 396 | [Stefano6929/argo](https://github.com/Stefano6929/argo) | 0 | 2026-10-18 | 2026-10-19 | 专门为 agent 打造的开源 agent 搜索工具，具备 200+的搜索源及多语言搜索能力，覆盖中文/英文/学术/代码/购物/金融/新闻/百科。 |
| 397 | [StijnDuong9928/dsh-normify](https://github.com/StijnDuong9928/dsh-normify) | 0 | 2026-10-19 | 2026-10-19 | Normify · DSH 插件：把项目架构写成归一化的分形模块树，三层校验（写时 / 校验 / 冻结回执）、30 个 normify_* 工具 + normify-gen 技能，一键渲染单文件交互式架构图；支持伴随式开发（change_open → brief → check → 实施 → refresh → change_close）。 |
| 398 | [Sumcam-L/dsh-civhash](https://github.com/Sumcam-L/dsh-civhash) | 0 | 2026-10-19 | 2026-10-19 | CivNexus6 hash logic as a standalone CLI (civhash.exe) + DSH plugin: Civ-style CRC32, engine FNV-1a, bone hierarchy hash and suffix reverse search |
| 399 | [Susan6548/deepseek-harness-mobile](https://github.com/Susan6548/deepseek-harness-mobile) | 0 | 2026-10-19 | 2026-10-19 | Android companion for DeepSeek Harness \| chat, goals, approvals &amp; notifications from your phone, over your LAN. Kotlin + Jetpack Compose. |
| 400 | [swording-k/dsh-vscode](https://github.com/swording-k/dsh-vscode) | 0 | 2026-10-19 | 2026-10-19 | DeepSeek Harness for VS Code: side-bar launcher, conversations beside the editor, native right-side slot. Unofficial community extension. |
| 401 | [szsall/dsh-preview-studio](https://github.com/szsall/dsh-preview-studio) | 0 | 2026-10-19 | 2026-10-19 | \[Experimental\] Live app preview for DeepSeek Harness EXE/APK work - tested only on DSH Desktop 0.2.1-rc.2. |
| 402 | [TanukiRei/tanuki-toolbox](https://github.com/TanukiRei/tanuki-toolbox) | 0 | 2026-10-18 | 2026-10-19 | 黎猫工具箱：DSH 快捷栏、起始页、对话框与模型设置、消息通知、插件管理及 Windows 启动保护。 \| Modular DeepSeek Harness UI enhancements, notifications, model controls and plugin management. |
| 403 | [thassan0313/dsh-permission-rules](https://github.com/thassan0313/dsh-permission-rules) | 0 | 2026-10-18 | 2026-10-19 | Claude Code-style declarative permission rules for DeepSeek Harness: ordered allow/deny/ask rules with tool-name, argument (glob/regex), and workspace-path matching on the tools/pre-execute waterfall, session-log audit, and HMR reload. |
| 404 | [Thyxqz/dsh-plugin-quick-invoke](https://github.com/Thyxqz/dsh-plugin-quick-invoke) | 0 | 2026-10-19 | 2026-10-19 | Quick plugin invocation for DeepSeek Harness: drag installed plugin names into the prompt at the drop point, pin a draggable rail in the right sidebar, and choose which plugins (with remarks) appear in Settings. |
| 405 | [TianzeLuo/dsh-academic-search](https://github.com/TianzeLuo/dsh-academic-search) | 0 | 2026-10-19 | 2026-10-19 | DSH plugin for CS/AI academic search across arXiv, OpenAlex, Semantic Scholar, and Crossref — paper identity merging, bounded citation chains, arXiv handoff, no model API. |
| 406 | [TianzeLuo/dsh-btw-sidebar](https://github.com/TianzeLuo/dsh-btw-sidebar) | 0 | 2026-09-27 | 2026-10-19 | dsh plugin: Codex-style /btw — fork the current conversation into the native right sidebar and keep chatting there. Official session UI and full tool use, without interrupting or polluting the main conversation. |
| 407 | [TianzeLuo/dsh-commandcode-quota](https://github.com/TianzeLuo/dsh-commandcode-quota) | 0 | 2026-09-26 | 2026-10-19 | Command Code plan quota in your DSH session header — 5h / weekly / monthly windows, reset countdowns, and billing-period usage |
| 408 | [TianzeLuo/dsh-paper-reader](https://github.com/TianzeLuo/dsh-paper-reader) | 0 | 2026-09-29 | 2026-10-19 | DSH 插件：论文解读模式。精读单篇论文并生成证据可追溯的中文解读报告，按图注自动裁出图表，并基于同一份解析产物回答关于这篇论文的问题。速览 / 解读 / 深读三档可选，以 agent preset 隔离，只在选中该模式时可见。 |
| 409 | [TianzeLuo/dsh-plugins](https://github.com/TianzeLuo/dsh-plugins) | 0 | 2026-10-19 | 2026-10-19 | A curated index of DSH plugins for academic search, paper reading, session workflows, notifications, and math rendering — each plugin links to its own repository. |
| 410 | [TianzeLuo/dsh-web-search-keyless](https://github.com/TianzeLuo/dsh-web-search-keyless) | 0 | 2026-10-01 | 2026-10-19 | DSH 插件：给 ctx.web 换上一个不需要密钥、也不消耗模型回合的搜索 provider |
| 411 | [timho1047/dsh-stream-focus](https://github.com/timho1047/dsh-stream-focus) | 0 | 2026-10-18 | 2026-10-19 | Smooth, focused streaming for DSH: a zero-config plugin that keeps running thinking and tools in view across all four Work details modes. |
| 412 | [TinyNian/dsh-harness-os](https://github.com/TinyNian/dsh-harness-os) | 0 | 2026-10-19 | 2026-10-19 | DeepSeek Harness 主界面皮肤 Harness OS：沿用 dsh-startup-screen 开机动画的技术档案版式，揭幕无缝衔接。含 fork 的开机动画。 |
| 413 | [tmt-homelab/dsh-session-auto-resume](https://github.com/tmt-homelab/dsh-session-auto-resume) | 0 | 2026-10-19 | 2026-10-19 | DeepSeek Harness plugin: automatically resume sessions interrupted by app closure |
| 414 | [tomoyajaworski4767/engramory](https://github.com/tomoyajaworski4767/engramory) | 0 | 2026-10-18 | 2026-10-19 | A portable memory protocol for AI agents — load it as standing rules; a curation discipline + reference spec + optional cap hook. |
| 415 | [tooeast/dsh-chat-anchor](https://github.com/tooeast/dsh-chat-anchor) | 0 | 2026-10-19 | 2026-10-19 | 把最新提问固定在聊天区顶部、回复向下生长，页面不再跟随滚动（dsh 网页聊天插件） |
| 416 | [torres825/engramory](https://github.com/torres825/engramory) | 0 | 2026-10-19 | 2026-10-19 | A portable memory protocol for AI agents — load it as standing rules; a curation discipline + reference spec + optional cap hook. |
| 417 | [Toximiner/dsh-tokmeter](https://github.com/Toximiner/dsh-tokmeter) | 0 | 2026-10-19 | 2026-10-19 | Live model decode speed (tok/s) pill for the DeepSeek Harness Web UI |
| 418 | [TYEclipse/dsh-biorxiv](https://github.com/TYEclipse/dsh-biorxiv) | 0 | 2026-10-18 | 2026-10-19 | bioRxiv preprint search, version/status and export tools for DeepSeek Harness (dsh). Zero runtime dependencies. |
| 419 | [vagur1689/dsh-conversation-find](https://github.com/vagur1689/dsh-conversation-find) | 0 | 2026-10-19 | 2026-10-19 | In-conversation keyword search with scroll-to-match for the DSH Web GUI — pages the session back to its start so a search covers the whole transcript. |
| 420 | [vanessa16546/dsh-lowtide](https://github.com/vanessa16546/dsh-lowtide) | 0 | 2026-10-19 | 2026-10-19 | Time-shifting task delegation for DeepSeek Harness (dsh): plan tasks at leisure, they run unattended off-peak, come back to a report. Human-adjudicated, desktop + web. |
| 421 | [vastplan/dsh-model-team](https://github.com/vastplan/dsh-model-team) | 0 | 2026-10-19 | 2026-10-19 | 多模型团队：DSH 插件，用同一份任务包并发询问多家模型，做事后审计、设计分叉与专责推理；内置 model-team 技能，安装即自动发现/调用；带账本、周报与逐模型进度窗。 |
| 422 | [vlln/dsh-disk-canvas](https://github.com/vlln/dsh-disk-canvas) | 0 | 2026-10-19 | 2026-10-19 | 把磁盘扫成一张可批注的提案：Agent 标注、你来决定、删前可预览（DeepSeek Harness 插件） |
| 423 | [vxdeus/dsh-sync](https://github.com/vxdeus/dsh-sync) | 0 | 2026-10-16 | 2026-10-19 | 这是专门存插件代码的新仓库 |
| 424 | [wagner33843/dsh-lowtide](https://github.com/wagner33843/dsh-lowtide) | 0 | 2026-10-18 | 2026-10-19 | Time-shifting task delegation for DeepSeek Harness (dsh): plan tasks at leisure, they run unattended off-peak, come back to a report. Human-adjudicated, desktop + web. |
| 425 | [WangLemna/dsh-recycle-bin](https://github.com/WangLemna/dsh-recycle-bin) | 0 | 2026-10-19 | 2026-10-19 | 个人尝试，DSH桌面端的回收站 |
| 426 | [washengru/dsh-remember-approval](https://github.com/washengru/dsh-remember-approval) | 0 | 2026-10-19 | 2026-10-19 | DSH 插件 (beta)：同一会话内记住已批准过的审批请求，不再重复询问。 |
| 427 | [Wei-l-w/dsh-cline-quota](https://github.com/Wei-l-w/dsh-cline-quota) | 0 | 2026-10-19 | 2026-10-19 | 在 DeepSeek Harness 会话页头显示 Cline / ClinePass 额度、Credits 余额与 token 消耗（支持多账号切换） |
| 428 | [WeiyuZheng-CN/dsh-ecom-price](https://github.com/WeiyuZheng-CN/dsh-ecom-price) | 0 | 2026-10-19 | 2026-10-19 | DSH skill + plugin: read real Taobao/JD prices by driving your logged-in browser over CDP, and turn a procurement list into a linked comparison sheet |
| 429 | [Wh1stle05/dsh-chat-figure](https://github.com/Wh1stle05/dsh-chat-figure) | 0 | 2026-10-19 | 2026-10-19 | DSH 聊天内原生图解与练习 / native in-chat diagrams and quizzes for DeepSeek Harness：把 \`\`\`figure / \`\`\`tree / \`\`\`quiz 代码块渲染成随主题自适应的 HTML，不用图片也不用 Mermaid |
| 430 | [wilsonchengassistant/dsh-media-web-preview](https://github.com/wilsonchengassistant/dsh-media-web-preview) | 0 | 2026-10-19 | 2026-10-19 | In-browser audio and video previews in the DSH right Sidebar, streamed over an authenticated HTTP Range route so a remote browser can play and seek large files without opening a native app on the Host. |
| 431 | [wilsonchengassistant/dsh-mobile-sidebar](https://github.com/wilsonchengassistant/dsh-mobile-sidebar) | 0 | 2026-10-19 | 2026-10-19 | Give the whole left column back to the conversation on narrow screens: below 1024px the DSH sidebar leaves the frame entirely and a header button opens it as an overlay drawer. |
| 432 | [wilsonchengassistant/dsh-quick-workspace](https://github.com/wilsonchengassistant/dsh-quick-workspace) | 0 | 2026-10-19 | 2026-10-19 | DSH plugin: create a workspace by name in the browser instead of opening an OS folder chooser on the host |
| 433 | [wilsonchengassistant/dsh-session-clean-delete](https://github.com/wilsonchengassistant/dsh-session-clean-delete) | 0 | 2026-10-18 | 2026-10-19 | A permanent 'Delete session' action for the DeepSeek Harness sidebar, behind a confirmation dialog. |
| 434 | [wilsonchengassistant/dsh-vnc-client](https://github.com/wilsonchengassistant/dsh-vnc-client) | 0 | 2026-10-19 | 2026-10-19 | VNC client tab for the DeepSeek Harness right sidebar — connects to any VNC/RFB server |
| 435 | [wilsonchengassistant/dsh-zh-hant](https://github.com/wilsonchengassistant/dsh-zh-hant) | 0 | 2026-10-19 | 2026-10-19 | Traditional Chinese (繁體中文) language pack for DeepSeek Harness (DSH): registers a zh-Hant locale and 2,699 generated dictionaries across every namespace the web GUI uses |
| 436 | [wjf1/dsh-prompt-enhance](https://github.com/wjf1/dsh-prompt-enhance) | 0 | 2026-10-19 | 2026-10-19 | Sparkle button in the DeepSeek Harness composer: rewrite the draft into an executable prompt through the harness LLM, with a multi-level undo stack and a token-level before/after diff. |
| 437 | [wjunhere/dsh-web-providers](https://github.com/wjunhere/dsh-web-providers) | 0 | 2026-10-19 | 2026-10-19 | Exa/Tavily/Jina search and Jina/Tavily fetch providers for DeepSeek Harness ctx.web, with fallback chains |
| 438 | [wsk114514/dsh-ark-wiki](https://github.com/wsk114514/dsh-ark-wiki) | 0 | 2026-10-19 | 2026-10-19 | Arknights PRTS Wiki lookup tool plugin for DeepSeek Harness |
| 439 | [wszw142857-beep/dsh-command-btw](https://github.com/wszw142857-beep/dsh-command-btw) | 0 | 2026-10-19 | 2026-10-19 | DSH /btw side questions — ask about the current session without adding the exchange to conversation history |
| 440 | [wszw142857-beep/dsh-tool-cards](https://github.com/wszw142857-beep/dsh-tool-cards) | 0 | 2026-10-19 | 2026-10-19 | Interactive cards for DeepSeek Harness replies: sliders, forms, charts and tables from a tool result, with actions that flow back to the agent. |
| 441 | [Wuqiu-Ying/dsh-wtskin-project](https://github.com/Wuqiu-Ying/dsh-wtskin-project) | 0 | 2026-10-19 | 2026-10-19 | 面向 DeepSeek Harness 的《战争雷霆》自定义涂装工作室：四边形拾取器、声明式图层、支持 4K DDS 纹理与.blk 文件导出。本项目由DeepSeek在DSH上完成。War Thunder user-skin studio for DSH: quad picker, declarative layers, 4K DDS + .blk export. |
| 442 | [wusoudiaowei/dsh-conversation-trash](https://github.com/wusoudiaowei/dsh-conversation-trash) | 0 | 2026-10-19 | 2026-10-19 | Recycle bin for DeepSeek Harness conversations: undo for 8 seconds, restore or purge later. |
| 443 | [wweir/dsh-advisor](https://github.com/wweir/dsh-advisor) | 0 | 2026-10-17 | 2026-10-19 | Second-opinion review for DeepSeek Harness sessions: a restricted child session re-reads the Executor's work with read-only tools and delivers severity-ranked advice. |
| 444 | [xiaoanran0602-pixel/narracore-format](https://github.com/xiaoanran0602-pixel/narracore-format) | 0 | 2026-10-19 | 2026-10-19 | Free, local, unlimited screenplay formatting for AI agents — open-source MCP server &amp; DSH plugin from the Narracore toolkit (narracore.cn) |
| 445 | [xiaoy616/dsh-conversation-cleaner](https://github.com/xiaoy616/dsh-conversation-cleaner) | 0 | 2026-10-19 | 2026-10-19 | Clean up conversations from the DSH sidebar: per-conversation file count and total memory, open/reveal/delete generated files, open the conversation workspace folder, and permanently delete conversations with their local session logs. |
| 446 | [xiciyang/inference-tuning](https://github.com/xiciyang/inference-tuning) | 0 | 2026-10-19 | 2026-10-19 | Find the root-cause wall, apply the top intervention, prove it with a two-sided gate — or roll back. Engine- and hardware-neutral: no implicit defaults, spec-sheet values are never load-bearing. |
| 447 | [ximeng-y/Claude-DSH-Memory](https://github.com/ximeng-y/Claude-DSH-Memory) | 0 | 2026-10-19 | 2026-10-19 | Add a plugin for DeepSeek Harness that supports the Claude Code memory system. |
| 448 | [Xin-kon/dsh-lang-guard](https://github.com/Xin-kon/dsh-lang-guard) | 0 | 2026-10-19 | 2026-10-19 | DeepSeek Harness (DSH) plugin that pins zh-CN thinking and replies into the system prompt. Zero runtime deps, single file, capability probing, silent degradation. |
| 449 | [Xinglei-dev/dsh-plugin](https://github.com/Xinglei-dev/dsh-plugin) | 0 | 2026-10-19 | 2026-10-19 | DeepSeek Harness 插件：固定 Web 启动 token 等。 |
| 450 | [xingzoudefengye/dsh-sidebar-cdp](https://github.com/xingzoudefengye/dsh-sidebar-cdp) | 0 | 2026-10-19 | 2026-10-19 | Drive the native browser page in the DeepSeek Harness desktop Sidebar: nine tools, pure plugin, no launch flags |
| 451 | [XiongBangze/dsh-balance-usage-widget](https://github.com/XiongBangze/dsh-balance-usage-widget) | 0 | 2026-10-19 | 2026-10-19 | Composer-dock widget for DeepSeek Harness: account balance + session token usage. |
| 452 | [xl0223/dsh-open-any](https://github.com/xl0223/dsh-open-any) | 0 | 2026-10-19 | 2026-10-19 | 对话内文件右键「打开方式」——含系统 OpenAs 对话框，可打开未注册文件关联的应用 \| Right-click files in DSH chat to open them with any local app. |
| 453 | [xxiiiixx/dsh-session-trash](https://github.com/xxiiiixx/dsh-session-trash) | 0 | 2026-10-19 | 2026-10-19 | Session trash for DeepSeek Harness Desktop: move sessions to a recoverable trash from the sidebar, restore or purge them from a settings page. |
| 454 | [xxiiiixx/dsh-workspace-tmp](https://github.com/xxiiiixx/dsh-workspace-tmp) | 0 | 2026-10-19 | 2026-10-19 | Workspace Tmp for DeepSeek Harness: gives the agent a temporary directory beside the workspace for test files and scratch output, with a workspace_tmp tool and automatic deletion, so nothing pollutes the project tree. |
| 455 | [y2187218823/dsh-code-ctx](https://github.com/y2187218823/dsh-code-ctx) | 0 | 2026-10-19 | 2026-10-19 | 给 AI agent 的代码库上下文引擎 —— 索引 0.5s，检索 6ms，hit@8 81% |
| 456 | [ya-b/dsh-ssh-workspace](https://github.com/ya-b/dsh-ssh-workspace) | 0 | 2026-10-19 | 2026-10-19 | DeepSeek Harness remote workspace plugin: pick a host from ~/.ssh/config, pick a directory, and its files, terminals and commands all run on that machine through a daemon-backed SSH pipe with exactly-once side effects. |
| 457 | [yadav715/engramory](https://github.com/yadav715/engramory) | 0 | 2026-10-18 | 2026-10-19 | A portable memory protocol for AI agents — load it as standing rules; a curation discipline + reference spec + optional cap hook. |
| 458 | [Yamamoto431/jevcore](https://github.com/Yamamoto431/jevcore) | 0 | 2026-10-19 | 2026-10-19 | TypeSafe Jev for DeepSeek Harness, the Model Context Protocol, and plain Node: typed judgments instead of prose, offline by default. |
| 459 | [YannisHalas/seektty](https://github.com/YannisHalas/seektty) | 0 | 2026-10-18 | 2026-10-19 | 面向 DeepSeek Harness 的 Claude Code 风格终端界面，支持 Windows、macOS 与 Linux，兼容透明终端、VS Code 主题和自定义配色。 |
| 460 | [YHzed/dsh-zotero-flow](https://github.com/YHzed/dsh-zotero-flow) | 0 | 2026-10-19 | 2026-10-19 | DSH Desktop 插件：在机构登录会话下取回文献全文，并连同条目一起归档进 Zotero 分类 |
| 461 | [yiyunet/dsh-kill-ai-slop](https://github.com/yiyunet/dsh-kill-ai-slop) | 0 | 2026-10-19 | 2026-10-19 | DSH 插件：AI垃圾过滤 Ai Slop/Work Slop —— 给收到的文件打可回溯的「体检得分」（表达／执行／决策三维加权），用义务台账审查工作空转，每条引文机器复核原文。零依赖·零联网·纯本地。DeepSeek Harness plugin: score documents for AI-slop and work-slop. |
| 462 | [YOGEMOW/dsh-cyrene-eternal-page-remembrance](https://github.com/YOGEMOW/dsh-cyrene-eternal-page-remembrance) | 0 | 2026-10-18 | 2026-10-19 | Cyrene · An Eternal Page Remembrance —— 昔涟的长期记忆插件：四问锚点、日/月/年、夜梦、五育自检、思源备份与余页（DSH 0.2.1+，零依赖） |
| 463 | [YoussefFlores90/argo](https://github.com/YoussefFlores90/argo) | 0 | 2026-10-18 | 2026-10-19 | 专门为 agent 打造的开源 agent 搜索工具，具备 200+的搜索源及多语言搜索能力，覆盖中文/英文/学术/代码/购物/金融/新闻/百科。 |
| 464 | [youxin484/dsh-dafeiyu-enhanced](https://github.com/youxin484/dsh-dafeiyu-enhanced) | 0 | 2026-10-19 | 2026-10-19 | DSH 大肥鱼桌宠增强版 — QCYTSN/dsh-dafeiyu 的修改版 \| 视频 https://www.bilibili.com/video/BV1JAbC6wEWW/ |
| 465 | [Yporcupine/dsh-session-switcher](https://github.com/Yporcupine/dsh-session-switcher) | 0 | 2026-10-19 | 2026-10-19 | DSH Desktop plugin: hold Ctrl and tap Tab to switch between recently viewed sessions; release the modifier to open the highlighted one. Ctrl+Shift+Tab cycles backwards. |
| 466 | [YSDLNGF/dsh-acrylic-light](https://github.com/YSDLNGF/dsh-acrylic-light) | 0 | 2026-10-18 | 2026-10-19 | DeepSeek Harness desktop: Windows Acrylic material + layered frosted panels |
| 467 | [Yuedalao/dsh-connect-minimax](https://github.com/Yuedalao/dsh-connect-minimax) | 0 | 2026-10-19 | 2026-10-19 | Connect a locally signed-in MiniMax Code account to DeepSeek Harness through a loopback reverse proxy. No API key storage and no sign-out. |
| 468 | [yueyexiayu/dsh-session-continuation](https://github.com/yueyexiayu/dsh-session-continuation) | 0 | 2026-10-19 | 2026-10-19 | DSH desktop plugin: copy current session ID and continuation prompt beside the session title |
| 469 | [yuezhiye/dsh-closet](https://github.com/yuezhiye/dsh-closet) | 0 | 2026-10-18 | 2026-10-19 | DSH 插件 · 收纳间：按工作区统一管理临时脚本与日志（登记 · 扫描 · 执行 · 清运 · 回收站 · 面板） |
| 470 | [yuloop/dsh-web-split](https://github.com/yuloop/dsh-web-split) | 0 | 2026-10-19 | 2026-10-19 | 给 DeepSeek Harness Web 加自由分屏：可拖拽窗格，每个窗格渲染一个会话的完整对话。Free split screen for DSH Web. |
| 471 | [yurashet/dsh-locale-be](https://github.com/yurashet/dsh-locale-be) | 0 | 2026-10-19 | 2026-10-19 | Belarusian (be) language pack for the DeepSeek Harness web UI |
| 472 | [Yuuyuko-uu/dsh-feiyu-mood](https://github.com/Yuuyuko-uu/dsh-feiyu-mood) | 0 | 2026-10-19 | 2026-10-19 | 给 AI 伙伴一个会自己判断、你看得见的心情 —— 每轮聊完自动判断涨跌，右下角挂饰看数值、情绪和时间线 |
| 473 | [Z4DFL/va-11-skin](https://github.com/Z4DFL/va-11-skin) | 0 | 2026-10-19 | 2026-10-19 | VA-11 HALL-A neon skin plugin for DeepSeek Harness |
| 474 | [Zachary1850/deepseek-harness-mobile](https://github.com/Zachary1850/deepseek-harness-mobile) | 0 | 2026-10-18 | 2026-10-19 | Android companion for DeepSeek Harness \| chat, goals, approvals &amp; notifications from your phone, over your LAN. Kotlin + Jetpack Compose. |
| 475 | [Zeppeli777/idea-git](https://github.com/Zeppeli777/idea-git) | 0 | 2026-10-19 | 2026-10-19 | An IntelliJ IDEA-style Git workbench for the DeepSeek Harness Web UI: commit graph, branches, diffs, annotate, staging and stash. |
| 476 | [ZeroKingHao/dsh-cleaner](https://github.com/ZeroKingHao/dsh-cleaner) | 0 | 2026-09-30 | 2026-10-19 | deepseek-harness会话清理插件 |
| 477 | [zh-plus/dsh-gemini-argon](https://github.com/zh-plus/dsh-gemini-argon) | 0 | 2026-10-19 | 2026-10-19 | Gemini 4 Argon on Google Vertex AI for DeepSeek Harness: streaming, tool calls, thought-signature replay. |
| 478 | [zhangchenyuan21-create/dsh-ths-dashboard](https://github.com/zhangchenyuan21-create/dsh-ths-dashboard) | 0 | 2026-10-18 | 2026-10-19 | DSH sidebar dashboard for Tonghuashun simulated account and local backtest replay |
| 479 | [zhangzhichen18/dsh-pdf-formula](https://github.com/zhangzhichen18/dsh-pdf-formula) | 0 | 2026-10-19 | 2026-10-19 | PDF formula reader for DeepSeek Harness — decodes subset-font math glyphs into LaTeX |
| 480 | [zhe97396-tech/dsh-lazy-mcp](https://github.com/zhe97396-tech/dsh-lazy-mcp) | 0 | 2026-10-19 | 2026-10-19 | DSH 的按需 MCP 网关：server 只在被用到时连接，空闲自动断开，工具列表缓存在磁盘，子进程环境自动脱敏。 |
| 481 | [ZheTu/dsh-deepseek-web-panel](https://github.com/ZheTu/dsh-deepseek-web-panel) | 0 | 2026-10-19 | 2026-10-19 | DSH desktop plugin: embed DeepSeek web chat in the central panel |
| 482 | [zhugang-hub/dsh-chatgpt-prompt-autocomplete](https://github.com/zhugang-hub/dsh-chatgpt-prompt-autocomplete) | 0 | 2026-10-19 | 2026-10-19 | DSH 插件：ChatGPT 风格的输入框提示词自动补全，候选面板随输入更新，Tab 采纳、↑/↓ 切换、Esc 关闭；纯前端规则补全，不发起模型请求。 |
| 483 | [zhz-viads/dsh-local-bridge](https://github.com/zhz-viads/dsh-local-bridge) | 0 | 2026-10-19 | 2026-10-19 | 在同一台 Windows 电脑上，让 DeepSeek Harness、Claude Code 和 Codex 给已有会话发消息、传任务和回结果。 |
| 484 | [zirscard/dsh-ocr](https://github.com/zirscard/dsh-ocr) | 0 | 2026-10-18 | 2026-10-19 | OCR document recognition plugin for DeepSeek Harness: one doc_ocr tool for scanned PDFs/images — text, financial-table tie-out, contract clauses. RapidOCR, local. |
| 485 | [zirscard/dsh-valuation-service](https://github.com/zirscard/dsh-valuation-service) | 0 | 2026-10-18 | 2026-10-19 | Deterministic financial-data and valuation plugin for DeepSeek Harness: six ratio groups, forecast ratios, DCF slots, comparable PS/PE, IRR — one unified schema. |
| 486 | [znlgis/dsh-opengis-skill](https://github.com/znlgis/dsh-opengis-skill) | 0 | 2026-10-19 | 2026-10-19 | DeepSeek Harness OpenGIS 技能包 |
| 487 | [zshao56/dsh-theme-qianfu](https://github.com/zshao56/dsh-theme-qianfu) | 0 | 2026-10-19 | 2026-10-19 | 潜伏 QIANFU — 电视剧《潜伏》主题的 DeepSeek Harness 主题插件：旧纸档案 / 暗夜电台双配色。A DSH theme inspired by Lurk (2009). |
| 488 | [ztllll/dsh-push-notify](https://github.com/ztllll/dsh-push-notify) | 0 | 2026-10-19 | 2026-10-19 | DeepSeek Harness (dsh) plugin: push a notification to ntfy (your phone) or your own webhook when an agent finishes, gets stuck, needs you, or hits a model error. |
| 489 | [zzd1990/dsh-parallel-dev](https://github.com/zzd1990/dsh-parallel-dev) | 0 | 2026-10-18 | 2026-10-19 | DSH 并行开发编排插件：团队模式门禁、独立验收、依赖看板与设置页 |
| 490 | [zzt0818/dsh-task-details](https://github.com/zzt0818/dsh-task-details) | 0 | 2026-10-19 | 2026-10-19 | Task details sidebar for DeepSeek Harness: a 'View task details' button under every finished turn opens a resizable right-sidebar panel listing the task's input files, intermediate artifacts, output files, tools and skills used, languages, and model usage. |

## 从快照消失的已核准仓库 / Approved repositories missing from the snapshot

已核准但已不在当前快照中（删除或改名），核实后从 [data/approved.json](../approved.json) 移除或更新名称。

Approved but no longer present in the current snapshot (deleted or renamed) — after checking, remove them from [data/approved.json](../approved.json) or update the name.

- 2384418321/dsh-integration-settings
- 284022719/dsh-kb-sync
- 447662/dsh-native-codex-cli
- charliesbyte/dsh-workspace-activity
- ddtcorex/dsh-maestro-review
- germyGao/select-assist
- HAN102300/dsh-opencode-free
- HaydenSmith1121/dsh-ark-plans
- HaydenSmith1121/dsh-codex-provider
- HaydenSmith1121/dsh-connect-trae-plus
- HaydenSmith1121/dsh-memory
- HaydenSmith1121/dsh-opencode-go-plus
- HaydenSmith1121/dsh-session-cleanup
- HaydenSmith1121/dsh-wallhaven-wallpaper
- HaydenSmith1121/dsh-wallpaper-engine
- imtwa/dsh-recall
- jidekaixin2dian/dsh-context-budget
- liuchaoxu/dsh-model-usage
- liuyun847/dsh-host-compliance-check
- MochiNek0/dsh-next-prompt
- moyu-777/dsh-notion-workspaces
- Mr-SYGao/dsh-feishu-reader
- NoCandles/dsh-stock-ticker
- onlca/dsh-ssh
- Pheobe-Southwood/dsh-acp-paseo
- QR-0W/dsh-independent-auto-review
- RicardoYan/dsh-symlink-passthrough
- s11phere/dsh-away-notify
- s11phere/dsh-btw-sidebar
- s11phere/dsh-commandcode-quota
- s11phere/dsh-tex-block-normalizer
- s11phere/dsh-web-search-keyless
- semantic-craft/dsh-grokbot-dispatch
- smallhug/dsh-tauri
- songjongdevsecops/dsh-agenda
- songjongdevsecops/dsh-alfandega
- songjongdevsecops/dsh-escutar
- songjongdevsecops/dsh-lembrar
- songjongdevsecops/dsh-midia
- songjongdevsecops/dsh-olhos
- songjongdevsecops/dsh-pico-detector
- songjongdevsecops/dsh-plugin-aviso-sessao
- songjongdevsecops/dsh-plugin-voz-copilot
- songjongdevsecops/dsh-regras
- songjongdevsecops/dsh-secret-vault
- songjongdevsecops/wa-agent
- sun-zihang/dsh-cost-overlay
- WestFox-AwA/dsh-prompt-optimizer
- wilsonchengassistant/dsh-session-delete
- xxww0098/dsh-plugin-oauth-subs
- ya-b/dsh-web-open-access
- Yinxe/deepseek-harness-plugins
- YOGEMOW/dsh-cyrene-memory
- YSDLNGF/dsh-acrylic
