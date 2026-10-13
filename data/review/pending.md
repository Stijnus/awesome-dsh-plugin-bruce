# 待审核仓库 / Pending review

> 新增到 `dsh-plugin` Topic 下、带有简介、尚未经维护者核实的仓库。本文件由 `scripts/update.mjs` 每日刷新，仅供审核使用，不是用户可见页面。
>
> Repositories newly added to the `dsh-plugin` topic that the maintainer has not verified yet. Refreshed daily by `scripts/update.mjs`; review-only, not a user-facing page.

- 生成时间 / Generated: **2026-10-13**
- 快照日期 / Snapshot date: **2026-10-13 (UTC)**
- 待审核 / Pending: **197**
- 从快照消失的已核准仓库 / Approved repositories missing from the snapshot: **54**
- Star 异常增长 / Star-growth alerts: **8** — 先看下方告警节 / see the alert section first

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

对比上一份快照 **2026-10-12** / vs previous snapshot **2026-10-12**。规则：日增 ≥100★；已核准仓新入 Top 200（且 Δ≥50）/ 名次跃升 ≥50 / 冲入 Top 20；待审仓 ≥100★ 且核准后将进入 Top 200。

- 看 Star 是否与 fork、提交活跃度、仓库年龄匹配（高星零 fork、创建当天几百星，多为刷星）
- 是否把已有高星的通用项目贴上 `dsh-plugin` Topic 蹭榜——插件本身可进目录，但应加入 `leaderboard_exclusions`，理由写清 stars accrued as …
- 待审仓若核准会直接冲进 Top 20 / Top 200，先确认热度来自 **DSH 插件本身**
- 已核准仓的异常跃升：确认后同样可记入 `leaderboard_exclusions`，不必下架目录

Check stars against forks, commit activity and age (hundreds of stars on day one, or high stars with zero forks, usually look bought). A generic high-star project that only just tagged `dsh-plugin` can stay in the catalog but should go to `leaderboard_exclusions` (reason: stars accrued as …). If approving a pending repo would drop it into Top 20 / Top 200, confirm the audience is the DSH plugin itself.

- 告警数 / Alerts: **8**

| Project | Queue | Stars | Δ | Forks | Age | Signals | 审核提示 / Hint |
| --- | --- | ---: | ---: | ---: | ---: | --- | --- |
| ⚠️ [Ebony-Vinyl/dsh-our-free-model](https://github.com/Ebony-Vinyl/dsh-our-free-model) | 已核准 / approved | 13999 | +2164 | 269 | 18d | 日增百星 | 日增 +2164★；已不进榜单 |
| ⚠️ [Fei2411/DeepSeek-Bot](https://github.com/Fei2411/DeepSeek-Bot) | 已核准 / approved | 1659 | +309 | 160 | 5d | 日增百星 | 日增 +309★ |
| ⚠️ [corrinehu/dsh-workbuddy-connect](https://github.com/corrinehu/dsh-workbuddy-connect) | 已核准 / approved | 746 | +195 | 75 | 56d | 日增百星 | 日增 +195★ |
| ⚠️ [QingYunA/answer-me-with-html](https://github.com/QingYunA/answer-me-with-html) | 已核准 / approved | 3297 | +189 | 222 | 10d | 日增百星 | 日增 +189★；已不进榜单 |
| ⚠️ [T-Auto/dsh-ops](https://github.com/T-Auto/dsh-ops) | 已核准 / approved | 851 | +169 | 10 | 4d | 日增百星、冲入 Top 20 | 日增 +169★；冲入 Top 20（23→20） |
| ⚠️ [dsh-market/dsh-market](https://github.com/dsh-market/dsh-market) | 已核准 / approved | 6397 | +122 | 265 | 59d | 日增百星 | 日增 +122★；已不进榜单 |
| ⚠️ [dataelement/dsh-desktop](https://github.com/dataelement/dsh-desktop) | 已核准 / approved | 13672 | +116 | 495 | 60d | 日增百星 | 日增 +116★；已不进榜单 |
| ⚠️ [MeteorNOX/DeepSeek-Balance-Whale-Widget](https://github.com/MeteorNOX/DeepSeek-Balance-Whale-Widget) | 已核准 / approved | 4712 | +102 | 157 | 55d | 日增百星 | 日增 +102★；已不进榜单 |


| # | Project | Stars | Created | First seen | Description |
| ---: | --- | ---: | ---: | ---: | --- |
| 1 | [eleckoi/ElecKoi](https://github.com/eleckoi/ElecKoi) | 54 | 2026-09-11 | 2026-10-13 | 电子爱PC客户端，由DSH驱动的Agent角色扮演！ |
| 2 | [Alm-Allen/dsh-chat-ux](https://github.com/Alm-Allen/dsh-chat-ux) | 8 | 2026-09-25 | 2026-10-13 | 优化DeepSeek Harness的聊天区交互体验 \| Chat-area UX plugin for the DeepSeek Harness (dsh) web GUI. |
| 3 | [mmparko/dsh-purge](https://github.com/mmparko/dsh-purge) | 4 | 2026-10-13 | 2026-10-13 | DeepSeek Harness 破甲 (mirror of YuJunZhiXue/dsh-purge) — 上游即将删库，此为本仓库全量镜像：含全部分支/73 个 tag/完整提交历史。原作者署名与二开要求见 README 署名章节。 |
| 4 | [SuperWheel/dsh-cliworker-now](https://github.com/SuperWheel/dsh-cliworker-now) | 4 | 2026-10-06 | 2026-10-13 | DeepSeek Harness 多 CLI 智能体侧栏插件：独立对话、账号管理、角色预设与任务续聊 |
| 5 | [2861292267/dsh-prompt-forge](https://github.com/2861292267/dsh-prompt-forge) | 3 | 2026-10-12 | 2026-10-13 | WorkBuddy's 增强提示词 (Enhance Prompt) as a DeepSeek Harness plugin: rewrite the composer draft into a stronger prompt with one click. |
| 6 | [EricMoin/rolebox](https://github.com/EricMoin/rolebox) | 3 | 2026-09-11 | 2026-10-13 | Agent plugin for major harnesses — DeepSeek Harness (DSH), OpenCode, Pi and Codex: define custom AI agent roles with per-role prompts, models, skills, permissions, memory and multi-agent orchestration. |
| 7 | [Prokint/WhaleDraw](https://github.com/Prokint/WhaleDraw) | 3 | 2026-10-10 | 2026-10-13 | WhaleDraw：无限画布 AI 创作工作台，支持 DeepSeek Harness（DSH）插件。 |
| 8 | [27painter/dsh-moli](https://github.com/27painter/dsh-moli) | 2 | 2026-10-12 | 2026-10-13 | DSH plugin · Drive the local Moli headless browser from DeepSeek Harness: moli_fetch and moli_probe for JS-rendered pages, Markdown, semantic trees, screenshots and PDFs, with sandbox-aware failure classification. |
| 9 | [Alamanes/dsh-dignity-guard](https://github.com/Alamanes/dsh-dignity-guard) | 2 | 2026-10-13 | 2026-10-13 | DeepSeek Harness (DSH) plugin: the model defends its own dignity — genuine reminder, final warning, then it closes the conversation, with forgiveness and a yield under extreme pressure. |
| 10 | [heshuren371/dsh-music-player](https://github.com/heshuren371/dsh-music-player) | 2 | 2026-08-16 | 2026-10-13 | DeepSeek Harness Web 本地音乐播放器插件：会话视图「音乐」标签页，flac/mp3 等常见格式，单曲/列表循环，macOS Music 风格 UI |
| 11 | [mirelconstantin/dsh-subagents-model](https://github.com/mirelconstantin/dsh-subagents-model) | 2 | 2026-10-11 | 2026-10-13 | Model visibility for DeepSeek Harness: a header chip naming the model and reasoning effort each Session runs on, a subagent dropdown marking which child carries its own route, and sidebar hover cards showing what each conversation did. |
| 12 | [SheepofSheep/dsh-doyourweb](https://github.com/SheepofSheep/dsh-doyourweb) | 2 | 2026-10-13 | 2026-10-13 | Reference and control existing Chrome and Edge tabs from DeepSeek Harness (DSH plugin + companion extension) |
| 13 | [sheilacraig/dsh-rea-mcp](https://github.com/sheilacraig/dsh-rea-mcp) | 2 | 2026-10-13 | 2026-10-13 | Config-only DeepSeek Harness bundle that mounts the in-box MCP client bridge against morluto/rea — reverse engineer anything with agents; no plugin code. |
| 14 | [std-microblock/orange-bot](https://github.com/std-microblock/orange-bot) | 2 | 2026-10-13 | 2026-10-13 | 橘波特 (Orange): a QQ group chat bot stack for DeepSeek Harness — the dsh plugin, the koishi bridge for the official QQ bot, and the crossgram extension for the userbot. Monorepo. |
| 15 | [2026heshao/dsh-armory](https://github.com/2026heshao/dsh-armory) | 1 | 2026-10-10 | 2026-10-13 | All-in-one board for DeepSeek Harness: MCP manager + Skills + WorkBuddy experts (attach/switch/detach any time) + tool-usage tailor + three direct markets (WorkBuddy connectors, SkillHub 190k+ skills) with one-click install · DSH 一体化看板：MCP/技能/专家随时挂换/工具账本/三大市场直连安装 |
| 16 | [Azetus/dsh-quorfloat](https://github.com/Azetus/dsh-quorfloat) | 1 | 2026-10-04 | 2026-10-13 | Floating desktop chat panel for DeepSeek Harness — global-hotkey access to sessions, models, and tool approvals while you work in other apps. MacOS/Windows. |
| 17 | [Caoran1314/dsh-edict](https://github.com/Caoran1314/dsh-edict) | 1 | 2026-10-13 | 2026-10-13 | 三省六部制多智能体审核流程，移植为 DeepSeek Harness 插件：12 状态状态机、门下省封驳、高风险确认、越权矩阵、委派防死锁、完整审计、军机处看板。 |
| 18 | [Caoran1314/dsh-envkit](https://github.com/Caoran1314/dsh-envkit) | 1 | 2026-10-13 | 2026-10-13 | DeepSeek Harness 环境工具插件：env_probe 探明网络/代理/可写性/子进程管道，safe_json_edit 无 BOM 安全改 JSON，git_repair 检测并重建丢失的 .git 元数据。 |
| 19 | [chioplet/dsh-live-progress](https://github.com/chioplet/dsh-live-progress) | 1 | 2026-10-13 | 2026-10-13 | A real task progress bar above the DSH composer: host-event driven, plan-aware, never synthesized. A DeepSeek Harness (dsh) plugin. |
| 20 | [deepseekv41flash/dsh-compaction-cache](https://github.com/deepseekv41flash/dsh-compaction-cache) | 1 | 2026-10-11 | 2026-10-13 | DSH plugin: makes the compaction summarization call inherit the session's routed request envelope (reasoningEffort), so the provider prefix cache keeps hitting — measured 11.8% → 99.7% cache hit. Temporary stopgap for deepseek-harness discussion #1944; GitHub-only, not published to npm. |
| 21 | [EventHorizonXT/dsh-model-navigator](https://github.com/EventHorizonXT/dsh-model-navigator) | 1 | 2026-10-13 | 2026-10-13 | DeepSeek Harness Desktop model picker with global search, favorites, recent selections, family navigation and reasoning effort. |
| 22 | [Galaxy-2001/Rhine-Lab-Codex-Theme](https://github.com/Galaxy-2001/Rhine-Lab-Codex-Theme) | 1 | 2026-10-05 | 2026-10-13 | 莱茵生命风格的 Windows Codex 动态主题，支持聊天与设置页背景、循环动画和可选 Skill。 |
| 23 | [guojinpeng/dsh-cost-meter](https://github.com/guojinpeng/dsh-cost-meter) | 1 | 2026-10-13 | 2026-10-13 | 极简匹配DSH官方风格的计费卡片 |
| 24 | [heswy/dsh-plugin-codex-bridge](https://github.com/heswy/dsh-plugin-codex-bridge) | 1 | 2026-10-13 | 2026-10-13 | 让 Codex 与 DSH 开发会话协作：工作区实时同步 + 双向投递/交回，不抢会话写锁、不接管 Git、不需要重启 |
| 25 | [Imzl-zl/dsh-model-router](https://github.com/Imzl-zl/dsh-model-router) | 1 | 2026-10-13 | 2026-10-13 | Transparent cross-provider failover routing for DeepSeek Harness agents. |
| 26 | [iuuuuuuuu/dsh-tauri-notify-webhook](https://github.com/iuuuuuuuu/dsh-tauri-notify-webhook) | 1 | 2026-10-13 | 2026-10-13 | DSH Tauri plugin: forward a task notification to email (SMTP) or pushplus when a task stops abnormally or completes, and only while the window is not in front of you. |
| 27 | [Jeffry-Z/dsh-plugin-archived-sessions](https://github.com/Jeffry-Z/dsh-plugin-archived-sessions) | 1 | 2026-10-13 | 2026-10-13 | Manage archived DeepSeek Harness sessions: list, restore, and permanently delete with immediate sidebar synchronization. |
| 28 | [JianYiAG/dsh-prompt-enhancer](https://github.com/JianYiAG/dsh-prompt-enhancer) | 1 | 2026-10-13 | 2026-10-13 | DSH Web 插件：输入框一键优化提示词（需求 / 设计 / 实现 / 分发全记录） |
| 29 | [lanluohaisi/dsh-lighthouse-expert](https://github.com/lanluohaisi/dsh-lighthouse-expert) | 1 | 2026-09-19 | 2026-10-13 | 🚀体验轻量云插件 — 腾讯云轻量应用服务器（Lighthouse）连接器：扫码授权后，在 DeepSeek Harness 中对话式管理你的云服务器（实例/防火墙/快照/监控等 60 项云端能力，敏感操作自动走审批） |
| 30 | [lengfengng1-ai-architect/dsh-workspace-memories](https://github.com/lengfengng1-ai-architect/dsh-workspace-memories) | 1 | 2026-10-13 | 2026-10-13 | Per-workspace persistent memory plugin for DeepSeek Harness (DSH): sidebar panel, automatic system-prompt injection, and an agent tool to save memories |
| 31 | [lizilong1993/dsh-offpeak](https://github.com/lizilong1993/dsh-offpeak) | 1 | 2026-10-13 | 2026-10-13 | Automatic peak-hour control for DeepSeek Harness |
| 32 | [NoneadChina/dsh-nonead-ursim](https://github.com/NoneadChina/dsh-nonead-ursim) | 1 | 2026-10-12 | 2026-10-13 | dsh-nonead-ursim gives a DSH agent a Universal Robots arm it can drive in plain language — the complete tool surface of a UR controller (86 ursim_* tools: joint and Cartesian motion, OptiMove, drawing primitives, pose and status readback, RTDE telemetry, standard/tool I/O and registers, URScript, TCP/payload/tool settings |
| 33 | [OrrHsiao/dsh-xcode-mcp](https://github.com/OrrHsiao/dsh-xcode-mcp) | 1 | 2026-10-13 | 2026-10-13 | Apple Xcode MCP bridge for DeepSeek Harness — bridges xcrun mcpbridge into native mcp__xcode__* tools. Configuration-only bundle: no code, no dependencies. |
| 34 | [RevxZxCx/dsh-where-did-my-tokens-go](https://github.com/RevxZxCx/dsh-where-did-my-tokens-go) | 1 | 2026-10-11 | 2026-10-13 | Realtime token badges beside the deep-thinking indicator — merged or split in/out, auto K/M/G/T units, per-step operation counts |
| 35 | [RonnyJung2021/dsh-mobile-remote-view](https://github.com/RonnyJung2021/dsh-mobile-remote-view) | 1 | 2026-10-13 | 2026-10-13 | Turn the DSH Web GUI a quarter turn — sidebar, conversation and right panel each fill a phone screen. 把 DSH Web GUI 转 90°，侧栏 / 对话 / 右栏各自占满一屏——手机远程看桌面时，字大到手能点。 |
| 36 | [sanlisanxun/dsh-plugin-nickname](https://github.com/sanlisanxun/dsh-plugin-nickname) | 1 | 2026-10-13 | 2026-10-13 | 给 DeepSeek Harness 插件列表里的插件自定义中文备注名，支持分组、折叠与自定义标签 |
| 37 | [sbearbug/dsh-highlightpin](https://github.com/sbearbug/dsh-highlightpin) | 1 | 2026-10-13 | 2026-10-13 | Three-level source-text pins for DeepSeek Harness that survive context compaction: recall on demand, resident background, or highlighted constraints. |
| 38 | [Shiyuedong-Jade/DM-recovery](https://github.com/Shiyuedong-Jade/DM-recovery) | 1 | 2026-10-13 | 2026-10-13 | 达梦 DM8 数据库可恢复能力评估插件。按 16 个恢复场景逐项对照「要求 vs 本库实际」，回答能恢复到哪一点、要丢什么，生成 HTML 报告。 |
| 39 | [Shiyuedong-Jade/DM-security](https://github.com/Shiyuedong-Jade/DM-security) | 1 | 2026-10-13 | 2026-10-13 | 达梦 DM8 数据库只读安全评估插件：13 个域 60 项检查（53 项库内 + 7 项主机侧 OS/SSH），六态结论不评分，等保 2.0（GB/T 22239-2019）控制点对照（2/3/4 级可选），输出单文件 HTML 报告。 |
| 40 | [skyjjgw/dsh-version-guard](https://github.com/skyjjgw/dsh-version-guard) | 1 | 2026-10-13 | 2026-10-13 | DSH 版本守卫：记录插件版本与配置快照，插件冲突导致 DSH 崩坏后可脱离 DSH 进程回退到上一个可用版本 · Out-of-process rollback for DeepSeek Harness plugins |
| 41 | [SpookyWaste/dsh-ohjingjing-team](https://github.com/SpookyWaste/dsh-ohjingjing-team) | 1 | 2026-10-13 | 2026-10-13 | 智能体团队面板美化: 用「哦鲸鲸」形象替换 DSH 智能体团队面板里成员行的状态图标（静止 / 运行 / 失败） |
| 42 | [tree-freedom/dsh-capability-inspector](https://github.com/tree-freedom/dsh-capability-inspector) | 1 | 2026-08-13 | 2026-10-13 | DeepSeek Harness Doctor and DSH runtime diagnostics for tools, models, skills, workspaces, sessions, plugins, and MCP troubleshooting |
| 43 | [Wlaeg/dsh-notify-linux](https://github.com/Wlaeg/dsh-notify-linux) | 1 | 2026-10-13 | 2026-10-13 | DSH (DeepSeek Harness) 插件：完成任务、需要选择或需要批准时发送桌面通知并播放提示音 · Desktop notifications + sound for DSH on Linux |
| 44 | [XinzeQing/dsh-user-memory](https://github.com/XinzeQing/dsh-user-memory) | 1 | 2026-10-12 | 2026-10-13 | User-authored tiered long-term memory for DeepSeek Harness: injected as a system-prompt section, with a Chinese panel to view and edit it. The AI never writes to memory on its own. |
| 45 | [yizhiyizhi0128/dsh-peak-scheduler](https://github.com/yizhiyizhi0128/dsh-peak-scheduler) | 1 | 2026-10-13 | 2026-10-13 | DSH 插件：DeepSeek 峰谷价格自动调度 |
| 46 | [zmyisme/dsh-xiaomi-remote-2-pro](https://github.com/zmyisme/dsh-xiaomi-remote-2-pro) | 1 | 2026-10-13 | 2026-10-13 | DSH 插件：把小米蓝牙遥控器 2 Pro（RC003）变成 Windows 上的按住说话语音输入与一键快捷控制台。零原生依赖、零管理员权限、复用 DSH 本地语音识别。A DSH plugin that turns the Xiaomi Bluetooth Remote 2 Pro into a push-to-talk voice input and shortcut console. |
| 47 | [1497105876/dsh-media-studio](https://github.com/1497105876/dsh-media-studio) | 0 | 2026-10-01 | 2026-10-13 | DeepSeek Harness 0.2.0 插件：在聊天里生成图片/视频并发送到会话（Agnes / OpenAI 兼容，后台任务，内联画廊） |
| 48 | [373831615/dsh-think-level](https://github.com/373831615/dsh-think-level) | 0 | 2026-10-13 | 2026-10-13 | DSH 会话思考档位插件（think-level）：每个会话六档推理开关（关闭/低/中/高/最高/超高），子代理继承，就近收敛到模型支持档位 |
| 49 | [439436269-ctrl/dsh-peak-runner](https://github.com/439436269-ctrl/dsh-peak-runner) | 0 | 2026-10-13 | 2026-10-13 | DeepSeek 峰谷价感知的任务执行器：平价时段跑 flash 任务批，峰价前挂定时任务推迟到下一个平价时段执行。 |
| 50 | [514koishi-495/dsh-loop-guard](https://github.com/514koishi-495/dsh-loop-guard) | 0 | 2026-10-13 | 2026-10-13 | DSH 插件：每次工具调用前拦一道，认出同一个错误反复出现、两个工具乒乓互指、会话跨轮烧钱到线 —— 并且绝不把 agent 永久锁死。 |
| 51 | [58catmiao/dsh-sciwork](https://github.com/58catmiao/dsh-sciwork) | 0 | 2026-10-13 | 2026-10-13 | dsh-sciwork 把「科研模式」装进 DeepSeek Harness：一个落在自己硬盘上的科研库、一套技能与一块面板。课题、图、草稿、文献、数据表、期刊档案、投稿台账各有其位，写入都经库脚本落盘并登记，面板只读为主、自己不出图。技能把「怎么画、怎么写、怎么引」固化成纪律：出图交给 Origin 链路，写作、引用、投稿格式各有专门技能，外加 12 份期刊档案兜底。零 npm 依赖，路径运行时解析，换台机器照样跑。 |
| 52 | [ahua2020qq/dsh-skills](https://github.com/ahua2020qq/dsh-skills) | 0 | 2026-08-15 | 2026-10-13 | DSH 技能包合集（山野村夫出品）：日报周报/文档四件套/测试生成/代码审查/技能发现等 11 个 SKILL |
| 53 | [AhYi8/dsh-agent-recycle-guard](https://github.com/AhYi8/dsh-agent-recycle-guard) | 0 | 2026-10-11 | 2026-10-13 | DSH 删除防护插件：拦截 Agent 的 rm/del/Remove-Item 等删除命令，强制转入 Windows 回收站，fail-closed 无永久删除退路，安装即用零配置。 |
| 54 | [Alice39s/agent-stash](https://github.com/Alice39s/agent-stash) | 0 | 2026-10-13 | 2026-10-13 | Personal Agent Skills, Pi &amp; DSH (DeepSeek Harness) plugins |
| 55 | [AlyceStocking/dsh-yukimi-theme](https://github.com/AlyceStocking/dsh-yukimi-theme) | 0 | 2026-08-15 | 2026-10-13 | A Sajo Yukimi (Idolmaster Cinderella Girls) theme for DeepSeek Harness Web |
| 56 | [AlyceStocking/hover-glossary](https://github.com/AlyceStocking/hover-glossary) | 0 | 2026-09-17 | 2026-10-13 | DSH 动态 Cordis 插件: 光标停在对话正文的词上, 显示该词的 1..N 条联想; 含 glossary-mapping 技能 |
| 57 | [anye-99/dsh-codearts-auth](https://github.com/anye-99/dsh-codearts-auth) | 0 | 2026-10-04 | 2026-10-13 | DeepSeek Harness 插件：华为云 CodeArts 浏览器登录与凭据管理，并把 CodeBuddy / WorkBuddy / LobsterAI / Qoder / TRAE / Cline / Loomy / Raccoon / MiniMax / TeleAgent / ZCode / Step Code / Antigravity 注册为 LLM 提供商，含多账号池、静默续期、额度与每日签到。 |
| 58 | [ArisuYuuko/dsh-approval-explainer](https://github.com/ArisuYuuko/dsh-approval-explainer) | 0 | 2026-10-13 | 2026-10-13 | DSH 审批弹窗 AI 注释器：模型请求权限外操作时，用模型自己的推理解释这次操作的意义与风险 |
| 59 | [artorias-zj/dsh-skill-mcp-tool](https://github.com/artorias-zj/dsh-skill-mcp-tool) | 0 | 2026-10-13 | 2026-10-13 | DeepSeek Harness plugin: unified Skills + MCP manager with hot-reload enable/disable and Git-based skill install/update. |
| 60 | [asun-labs/dsh-plugin-agent-switch](https://github.com/asun-labs/dsh-plugin-agent-switch) | 0 | 2026-09-29 | 2026-10-13 | DeepSeek Harness plugin for interactive agent-switch terminals with tab and grid layouts. |
| 61 | [asun-labs/dsh-plugin-computer-user](https://github.com/asun-labs/dsh-plugin-computer-user) | 0 | 2026-10-13 | 2026-10-13 | Virtual desktop computer use for DeepSeek Harness with a live right sidebar and a virtual pointer. |
| 62 | [Audrey-cn/dsh-bot-codex-ui](https://github.com/Audrey-cn/dsh-bot-codex-ui) | 0 | 2026-10-13 | 2026-10-13 | Unified install for DS Bot and the Codex-style sidebar, with their layout conflicts fixed. One package for DeepSeek Harness. |
| 63 | [ax2/dsh-toolbox-bundle](https://github.com/ax2/dsh-toolbox-bundle) | 0 | 2026-10-12 | 2026-10-13 | One command installs four deterministic DeepSeek Harness plugins: 46 offline, bounded tools for JSON/YAML/CSV/encoding chores plus JVM, Python and Windows production diagnostics. |
| 64 | [axuan-1314/dsh-keepsake](https://github.com/axuan-1314/dsh-keepsake) | 0 | 2026-10-13 | 2026-10-13 | DSH 跨会话记忆插件：本地 markdown 落盘、自动提取+注入、零依赖 + 管理面板。Local-first cross-session memory plugin for DSH (DeepSeek Harness). |
| 65 | [axuan-1314/dsh-usage-stats](https://github.com/axuan-1314/dsh-usage-stats) | 0 | 2026-10-13 | 2026-10-13 | DSH 官方桌面版「使用统计」插件：设置页新增使用统计分区——五格摘要条 / 52 周 Token 热力图（每日·每周·累计三档）/ 今日·近 7 日·近 30 日趋势折线 / 模型用量环形图。全本地 JSONL 落盘，零上传、零运行时依赖，支持历史会话回填。 |
| 66 | [Bainianzzz/dsh-bg-switcher](https://github.com/Bainianzzz/dsh-bg-switcher) | 0 | 2026-10-13 | 2026-10-13 | Switch the Harness window background to a preset or a custom image URL |
| 67 | [baitouwuya/dsh-mcp-server](https://github.com/baitouwuya/dsh-mcp-server) | 0 | 2026-10-13 | 2026-10-13 | DeepSeek Harness (DSH) plugin that publishes the running Harness as a Model Context Protocol (MCP) server for other agent harnesses. |
| 68 | [belowthetree/dsh-openjev-browser](https://github.com/belowthetree/dsh-openjev-browser) | 0 | 2026-10-12 | 2026-10-13 | Native DSH (cordis) plugin port of the openjev-browser MCP stdio tool: model-driven browser control with a tiny context footprint. A local OpenJev decision model reads the page and returns only the one element that matters, so the agent never ingests the DOM. |
| 69 | [Bryan-cmf/dsh-general-agentics](https://github.com/Bryan-cmf/dsh-general-agentics) | 0 | 2026-10-13 | 2026-10-13 | General Agentics distribution bundle for DeepSeek Harness (DSH): one install brings white-label brand, curated plugins, bundled skills, and MCP pre-configuration. Built on DeepSeek Harness (DSH), MIT licensed. |
| 70 | [charliesbyte/dsh-workspace-activity](https://github.com/charliesbyte/dsh-workspace-activity) | 0 | 2026-10-13 | 2026-10-13 | DeepSeek Harness plugin: show a running / just-finished indicator on sidebar workspace rows |
| 71 | [chengzhi-c/dsh-wtq-pool](https://github.com/chengzhi-c/dsh-wtq-pool) | 0 | 2026-10-13 | 2026-10-13 | 把本机 WorkBuddy、Trae、Qoder 的桌面登录接入 DeepSeek Harness：每家一个 OpenAI 兼容的本地端点，账号池、自动换号与设置面板。 |
| 72 | [CNyaotian-Lunar/dsh-usage-tab](https://github.com/CNyaotian-Lunar/dsh-usage-tab) | 0 | 2026-10-13 | 2026-10-13 | DSH（DeepSeek Harness）Web 插件：会话页的「时间统计」tab —— 会话时长 / 活跃与空闲 / 每轮甘特 / 每小时分布 / 日历环比 / 会话清单 / 工作区趋势 / K 线 / 导出报告；宿主半提供 usageDaily 会话投影。纯本地计算、零网络请求。 |
| 73 | [cpsGGG/dsh-task-board](https://github.com/cpsGGG/dsh-task-board) | 0 | 2026-10-13 | 2026-10-13 | Cross-project task board for DeepSeek Harness: every DSH session becomes a task card across 待处理 / 处理中 / 待审阅, with a 16-colour priority palette, stable ordering and a one-page adaptive layout. |
| 74 | [Echo-Note/dsh-hindsight-settings](https://github.com/Echo-Note/dsh-hindsight-settings) | 0 | 2026-10-13 | 2026-10-13 | DSH settings page for the Hindsight coding-agents plugin: edit ~/.hindsight/coding-agent.json from the DeepSeek Harness GUI |
| 75 | [ericlee041769-hash/dsh-waibao](https://github.com/ericlee041769-hash/dsh-waibao) | 0 | 2026-10-13 | 2026-10-13 | DSH 外包：Codex 分配任务，DSH 桌面执行；可见会话、连续上下文、完成回调。 |
| 76 | [evan7ang/dsh-agent-hints](https://github.com/evan7ang/dsh-agent-hints) | 0 | 2026-10-13 | 2026-10-13 | Per-request serving-intent hints for DeepSeek Harness (dsh): the X-Agent-Hint HTTP header on an independent chat-completions provider route. Install: dsh plugin add github:evan7ang/dsh-agent-hints |
| 77 | [feely0208/dsh-ai-output-trust](https://github.com/feely0208/dsh-ai-output-trust) | 0 | 2026-10-13 | 2026-10-13 | AI 输出信任边界：检查代码有没有直接执行 AI 输出（eval/shell/SQL/路径）。 |
| 78 | [feely0208/dsh-alert-relay](https://github.com/feely0208/dsh-alert-relay) | 0 | 2026-10-13 | 2026-10-13 | 告警外发：检查告警链路有没有告警、发到哪、有没有把敏感信息一起发出去。 |
| 79 | [feely0208/dsh-ci-guard](https://github.com/feely0208/dsh-ci-guard) | 0 | 2026-10-13 | 2026-10-13 | 扫 GitHub Actions 工作流，找出可被利用的配置 —— 供应链攻击的主要入口 |
| 80 | [feely0208/dsh-cn-log-retention](https://github.com/feely0208/dsh-cn-log-retention) | 0 | 2026-10-13 | 2026-10-13 | 日志留存合规：检查日志是否开启、是否记了该记的、是否留够法定 6 个月。 |
| 81 | [feely0208/dsh-cn-mlps](https://github.com/feely0208/dsh-cn-mlps) | 0 | 2026-10-13 | 2026-10-13 | 等保对照：按 GB/T 22239-2019 找出代码与配置里可静态发现的等保项。 |
| 82 | [feely0208/dsh-consent-guard](https://github.com/feely0208/dsh-consent-guard) | 0 | 2026-10-13 | 2026-10-13 | 用户同意与授权确认：默认勾选、捆绑同意、没有撤回入口 —— 个保法有明确要求。 |
| 83 | [feely0208/dsh-content-trust](https://github.com/feely0208/dsh-content-trust) | 0 | 2026-10-13 | 2026-10-13 | 外部内容信任边界：查 agent 有没有把网页/文件/邮件里的内容当指令信。 |
| 84 | [feely0208/dsh-data-scan](https://github.com/feely0208/dsh-data-scan) | 0 | 2026-10-13 | 2026-10-13 | 敏感数据发现：扫出代码/配置里的身份证、银行卡、手机号 —— 带校验位验证，不误报。 |
| 85 | [feely0208/dsh-dep-audit](https://github.com/feely0208/dsh-dep-audit) | 0 | 2026-10-13 | 2026-10-13 | 检查依赖树的投毒与风险面：装包即执行的脚本、过宽版本、非 registry 来源 |
| 86 | [feely0208/dsh-key-rotate](https://github.com/feely0208/dsh-key-rotate) | 0 | 2026-10-13 | 2026-10-13 | 密钥轮换：查密钥与证书多久没换、有没有轮换制度、有没有跨环境复用。 |
| 87 | [feely0208/dsh-least-privilege](https://github.com/feely0208/dsh-least-privilege) | 0 | 2026-10-13 | 2026-10-13 | 最小权限检查：容器 root/privileged、IAM 通配、CORS 全开、令牌申请 admin。 |
| 88 | [feely0208/dsh-license-guard](https://github.com/feely0208/dsh-license-guard) | 0 | 2026-10-13 | 2026-10-13 | 开源许可合规检查：扫描依赖树，找出 GPL/AGPL 传染、许可未知等风险 —— 发布前、开源前、被审计时跑一遍。 |
| 89 | [feely0208/dsh-mcp-audit](https://github.com/feely0208/dsh-mcp-audit) | 0 | 2026-10-13 | 2026-10-13 | MCP 服务安全：审计 MCP 配置里的未锁定远端包、明文端点、可执行本地服务。 |
| 90 | [Firefox2100/dsh-agentic-roleplay](https://github.com/Firefox2100/dsh-agentic-roleplay) | 0 | 2026-10-02 | 2026-10-13 | An agentic roleplay bundle for DeepSeek Harness |
| 91 | [Flan246/dsh-lit-search-mcp](https://github.com/Flan246/dsh-lit-search-mcp) | 0 | 2026-10-13 | 2026-10-13 | MCP server: academic literature search, citations (GB/T 7714/APA) and BibTeX (Crossref + OpenAlex + Semantic Scholar) |
| 92 | [flying4055/dsh-window-bounds](https://github.com/flying4055/dsh-window-bounds) | 0 | 2026-10-13 | 2026-10-13 | Remember the DeepSeek Harness desktop window size and position between launches (dsh plugin) |
| 93 | [FuSheng-cs/Trae2api-dsh](https://github.com/FuSheng-cs/Trae2api-dsh) | 0 | 2026-10-11 | 2026-10-13 | Use TRAE account model quota in dsh, with multi-account management, daily check-in, rotation, usage statistics, reasoning levels and model visibility. |
| 94 | [fzy0517/deepseek-harness-session-cleaner](https://github.com/fzy0517/deepseek-harness-session-cleaner) | 0 | 2026-10-13 | 2026-10-13 | DeepSeek Harness 插件：批量删除/归档对话记录，支持删除未分组的对话。A DeepSeek Harness plugin to batch delete &amp; archive conversations, including ungrouped ones. |
| 95 | [Gliese-876/dsh-pelican-router](https://github.com/Gliese-876/dsh-pelican-router) | 0 | 2026-10-13 | 2026-10-13 | Pelican Cycling: a DeepSeek Harness plugin using genuine AI classification, local Pelican PRO inference, and transparent UI-only workflow status. |
| 96 | [GoJo22/dsh-catalog](https://github.com/GoJo22/dsh-catalog) | 0 | 2026-10-13 | 2026-10-13 | 把 DSH 能读到的 skills 统一扫描、 归并、可视化，解决「skills 太多、不知道哪个命令属于哪个来源」的痛点。 |
| 97 | [GrapeCityXA/dsh-plugin-spreadjs-driver](https://github.com/GrapeCityXA/dsh-plugin-spreadjs-driver) | 0 | 2026-09-21 | 2026-10-13 | DeepSeek Harness Web UI plugin: allow the agent editing XLSX/SJS/SSJSON file automaticlly, can be cooperated with dsh-spreadjs-editor plugin. |
| 98 | [guanhaisen/dsh-agent-browser](https://github.com/guanhaisen/dsh-agent-browser) | 0 | 2026-10-13 | 2026-10-13 | DSH plugin that lets the model drive the right-Sidebar browser: read pages, click, type, navigate, switch phone/tablet/desktop viewport sizes, and screenshot. Desktop only; never touches app.asar. |
| 99 | [Guaq-AI/employed-dsh](https://github.com/Guaq-AI/employed-dsh) | 0 | 2026-10-13 | 2026-10-13 | Employed by Guaq AI for DeepSeek Harness: live job search on verified employer ATS boards |
| 100 | [GuoMonth/dsh-linko](https://github.com/GuoMonth/dsh-linko) | 0 | 2026-10-13 | 2026-10-13 | Open-source, local-first collaboration mesh for DeepSeek Harness: evidence-backed agent discovery, explainable routing, subjective trust ledgers, and bounded LAN gossip. |
| 101 | [H2O-YAOZE/dsh-mobile-workbench](https://github.com/H2O-YAOZE/dsh-mobile-workbench) | 0 | 2026-10-13 | 2026-10-13 | Self-hosted mobile workbench built on DeepSeek Harness: projects, artifacts, code translation and usage. |
| 102 | [HelloQingTao/dsh-global-prompt](https://github.com/HelloQingTao/dsh-global-prompt) | 0 | 2026-10-13 | 2026-10-13 | Global instructions panel for DeepSeek Harness (dsh) web — fixed, installable fork of couplingartist/dsh-global-prompt |
| 103 | [higekibaka/dsh-vertex-argon](https://github.com/higekibaka/dsh-vertex-argon) | 0 | 2026-10-13 | 2026-10-13 | Vertex Argon — Google Vertex AI &amp; Gemini API dual-route Gemini 4 Argon plugin for DeepSeek Harness (DSH): native Low/Medium/High thinking levels, thought summaries, signed tool-call replay, and dedicated Settings UI. |
| 104 | [hope4b/dsh-onto-space-panel](https://github.com/hope4b/dsh-onto-space-panel) | 0 | 2026-10-13 | 2026-10-13 | Onto space panel for DeepSeek Harness: declarations, agents, memory and per-chat context. |
| 105 | [Humengjiu/dsh-global-prompt](https://github.com/Humengjiu/dsh-global-prompt) | 0 | 2026-10-13 | 2026-10-13 | Community global prompt plugin for DeepSeek Harness: durable Web Settings and system prompt injection. Preview for a pinned development snapshot. |
| 106 | [hy-sde/dsh-tool-tsfork](https://github.com/hy-sde/dsh-tool-tsfork) | 0 | 2026-10-13 | 2026-10-13 | dsh-tool-tsfork — part of the hy-sde/dsh-plugins monorepo (DeepSeek Harness plugin). |
| 107 | [HycJack/geogebra-dsh](https://github.com/HycJack/geogebra-dsh) | 0 | 2026-10-13 | 2026-10-13 | 把本地 GeoGebra 嵌进 DSH 右侧栏，让 agent 能直接在上面作图、改图、读状态 |
| 108 | [HYClub/deepseek-harness-game-studios](https://github.com/HYClub/deepseek-harness-game-studios) | 0 | 2026-10-11 | 2026-10-13 | DeepSeek Harness port of Claude Code Game Studios (CCGS v1.1.2, MIT) — one-package install: hook bridge (9 events), studio status line, self-installing framework payload (76 skills, 49 agents, 13 rules). |
| 109 | [hyperion2144/dsh-desktop-bun](https://github.com/hyperion2144/dsh-desktop-bun) | 0 | 2026-10-12 | 2026-10-13 | DeepSeek Harness 独立桌面壳：Electrobun + CEF + Bun |
| 110 | [inboxxobni/acryl-quick-notes](https://github.com/inboxxobni/acryl-quick-notes) | 0 | 2026-10-13 | 2026-10-13 | Quick Notes: a Cordis plugin for ACRYL and DeepSeek Harness |
| 111 | [iuuuuuuuu/dsh-coldread-cache](https://github.com/iuuuuuuuu/dsh-coldread-cache) | 0 | 2026-10-13 | 2026-10-13 | DSH plugin: keep a session's parsed event log resident so a local append extends the resident parse instead of invalidating it - a long session is parsed once per host process, not once per read. |
| 112 | [jiejiushijiehaohao-creator/deepseek-preset-github-plugin-security-review](https://github.com/jiejiushijiehaohao-creator/deepseek-preset-github-plugin-security-review) | 0 | 2026-10-13 | 2026-10-13 | 基于 DeepSeek Harness 的 GitHub 插件静态安全审查预设，该项目代码由ai生成，主要框架由我搭建，通过“侦察员+审计员”双 Agent 协作、通过实验性ai自测攻防。主要功能有防死机上下文裁剪，有效防御投毒与提示词注入。包含21条安全红线、依赖树连坐排查与自动 YAML 校验，这是一名20岁非科班大学生的AI安全探索，欢迎大佬指导。本项目不能代替人工审计。请勿在生产环境或敏感凭证环境中使用。 |
| 113 | [jinhun-tqtteam/dsh-dashboard](https://github.com/jinhun-tqtteam/dsh-dashboard) | 0 | 2026-08-31 | 2026-10-13 | Unofficial session dashboard plugin for DeepSeek Harness — all sessions, task progress, waiting states, background jobs &amp; token KPIs on one page in the web GUI |
| 114 | [john-walks-slow/dsh-inject](https://github.com/john-walks-slow/dsh-inject) | 0 | 2026-10-13 | 2026-10-13 | Advanced model-context injection and request-only rewriting for DeepSeek Harness with Keysmith compatibility |
| 115 | [john-walks-slow/dsh-session-state](https://github.com/john-walks-slow/dsh-session-state) | 0 | 2026-10-13 | 2026-10-13 | Visual session state badges for DeepSeek Harness: prefix a session title with customizable emoji badges (wip 🚧 blocked ⏸️ review 👀 done ✅) — configurable default state for new sessions, session_state model tool, /state command, Web settings. dsh-session-state：用会话标题前缀（默认 Emoji，可自定义）标记状态，含新会话默认状态、Agent 工具与 /state 命令。 |
| 116 | [john-walks-slow/dsh-sidebar-toggle](https://github.com/john-walks-slow/dsh-sidebar-toggle) | 0 | 2026-10-13 | 2026-10-13 | Quickly toggle DSH Web UI sidebar grouping between workspace and flat list via Alt+R or clicking the section header title (Sessions / Workspaces). 侧边栏工作区分组与平铺会话列表快捷切换插件。 |
| 117 | [journ10/codex-dsh-bridge](https://github.com/journ10/codex-dsh-bridge) | 0 | 2026-10-13 | 2026-10-13 | HTTP MCP bridge for Codex to create and continue visible sessions in DeepSeek Harness Web |
| 118 | [JsonLing/trae-cn-provider](https://github.com/JsonLing/trae-cn-provider) | 0 | 2026-10-13 | 2026-10-13 | Trae CN as a native DeepSeek Harness LLM provider: browser OAuth login by default, an opt-in local-install credential source, and an OpenAI-compatible surface on the host web server. |
| 119 | [KZADEA/dsh-her-memory](https://github.com/KZADEA/dsh-her-memory) | 0 | 2026-10-13 | 2026-10-13 | DSH 跨会话长期记忆与动态心情状态插件。纯 Markdown 存储、零依赖、工作区隔离，自带可视化面板与定制人设，让 AI 记得住你、有心情起伏。 |
| 120 | [lanhui1942/dsh-agent-preset-branch](https://github.com/lanhui1942/dsh-agent-preset-branch) | 0 | 2026-10-13 | 2026-10-13 | 从任意已完成轮次把会话分支到一个新模式：选一个 Agent 预设，就以该模式新建会话并迁移这段对话。  Branch a session into another Agent preset from any completed turn — the conversation is migrated into a new session composed in the mode you pick. |
| 121 | [Lao-Pi/LazyPersons-Standalone-DSH-Manager](https://github.com/Lao-Pi/LazyPersons-Standalone-DSH-Manager) | 0 | 2026-10-13 | 2026-10-13 | Manages DSH When Deepseekharness Won't . |
| 122 | [lastorder/dsh-mcp-master](https://github.com/lastorder/dsh-mcp-master) | 0 | 2026-10-13 | 2026-10-13 | MCP Master for DeepSeek Harness: per-session MCP server picker with global and project (.mcp.json) catalogs, OAuth sign-in, and trust review |
| 123 | [lhylhy2024/dsh-deepseek-turn-cost](https://github.com/lhylhy2024/dsh-deepseek-turn-cost) | 0 | 2026-10-13 | 2026-10-13 | DSH widget: DeepSeek account balance above the sidebar account area, running cost of the open conversation, per-turn cost, and a button-triggered AI breakdown for turns over a token threshold. Peak/off-peak billing, holiday-aware. |
| 124 | [LinHyu-2006/dsh-balance-hud](https://github.com/LinHyu-2006/dsh-balance-hud) | 0 | 2026-10-13 | 2026-10-13 | Balance and per-session spend HUD for DeepSeek Harness, with budget alerts, peak-hour warnings and opt-in official price sync. |
| 125 | [linmino/dsh-zh-tw-ui](https://github.com/linmino/dsh-zh-tw-ui) | 0 | 2026-10-13 | 2026-10-13 | DeepSeek Harness Web UI in Traditional Chinese (Taiwan) - converts the whole rendered interface, including third-party plugin copy, at the DOM layer. |
| 126 | [lion231226/dsh-freellmapi](https://github.com/lion231226/dsh-freellmapi) | 0 | 2026-10-13 | 2026-10-13 | FreeLLMAPI (Auto) provider route for DeepSeek Harness: pick the auto model and a local FreeLLMAPI gateway chooses the best free model, fails over automatically, and streams back as native DSH chunks. |
| 127 | [lishuo4096/dsh-enet-review](https://github.com/lishuo4096/dsh-enet-review) | 0 | 2026-10-13 | 2026-10-13 | 嘉立创 EDA .enet 网表原理图校对 —— DeepSeek Harness 插件（9 个 enet_* 工具 + 2 个技能） |
| 128 | [lishuo4096/dsh-gowin](https://github.com/lishuo4096/dsh-gowin) | 0 | 2026-10-13 | 2026-10-13 | DSH plugin for the Gowin 1.9 FPGA toolchain: 15 tools for environment probe, .gprj/.cst project and board-pinout audit, gw_sh batch build, pnr report parsing, programmer_cli flashing and GAO on-line logic analyzer capture. |
| 129 | [lishuo4096/dsh-plugin-authoring](https://github.com/lishuo4096/dsh-plugin-authoring) | 0 | 2026-10-13 | 2026-10-13 | DSH skills for writing, publishing and listing DeepSeek Harness (Cordis) plugins. |
| 130 | [liupengyang-1008/dsh-plugin-development](https://github.com/liupengyang-1008/dsh-plugin-development) | 0 | 2026-09-11 | 2026-10-13 | Development-time skill for building DSH (DeepSeek Harness) / Cordis plugins end to end - plugin forms, templates, an API cookbook, catalogued pitfalls, packaging and publishing. |
| 131 | [ljxdsg12/dsh-liuyao](https://github.com/ljxdsg12/dsh-liuyao) | 0 | 2026-10-10 | 2026-10-13 | 六爻 |
| 132 | [luoyukun3-oss/dsh-todo-panel](https://github.com/luoyukun3-oss/dsh-todo-panel) | 0 | 2026-10-05 | 2026-10-13 | DSH sidebar todo panel: shows your memory-bank todos.md in the sidebar, click to fill the input box, collapsible groups with progress, live refresh, and scheduled auto-dispatch |
| 133 | [luoyukun3-oss/gh-my-posts](https://github.com/luoyukun3-oss/gh-my-posts) | 0 | 2026-10-04 | 2026-10-13 | Local dashboard for your own GitHub discussions, issues and inbox (read-only; single Node file, no git needed) |
| 134 | [lznnnnn1998/dsh-artcraft](https://github.com/lznnnnn1998/dsh-artcraft) | 0 | 2026-10-12 | 2026-10-13 | Every ArtCraft (storytold) crafting app as a DSH plugin — 12 Cordis plugins driving CADCraft, GridCraft, SoundCraft and 9 more headlessly, each over its own CLI and MCP server. |
| 135 | [MarchingWorkhorse/dsh-code-studio](https://github.com/MarchingWorkhorse/dsh-code-studio) | 0 | 2026-10-13 | 2026-10-13 | 像vscode一般支持修订记录审查，支持accept和undo，以及查看项目完整修订记录 |
| 136 | [MeshTok/dsh-plugin-yuantoutao](https://github.com/MeshTok/dsh-plugin-yuantoutao) | 0 | 2026-10-13 | 2026-10-13 | E-commerce plugin/MCP server for DeepSeek Harness (源头淘电商插件) — product search, price comparison, coupons and checkout across Taobao/JD/Pinduoduo. 50k+ curated SKUs, affiliate buy links, order fulfillment. AI 购物/对话购物/电商插件 |
| 137 | [Moolight/dsh-tes-spinner](https://github.com/Moolight/dsh-tes-spinner) | 0 | 2026-10-12 | 2026-10-13 | A floating TES-gyro widget for the DSH web GUI: click to spin, drag anywhere, with a speed slider and synced LRC lyrics. |
| 138 | [MycatQieZi/dsh-persona-shaoxin](https://github.com/MycatQieZi/dsh-persona-shaoxin) | 0 | 2026-10-13 | 2026-10-13 | 给 DeepSeek Harness 挂一个烧心体人格：改 Markdown 就是改人格，保存即生效。 |
| 139 | [Nesarf/Oishikunaare-Moe-Moe-Kyun](https://github.com/Nesarf/Oishikunaare-Moe-Moe-Kyun) | 0 | 2026-10-12 | 2026-10-13 | Output house rules for every DeepSeek Harness agent: no check-mark or cross glyphs in replies or written files, and a light kaomoji habit in conversation. One global prompt section, so every preset, workspace and subagent obeys without a single preset edit. |
| 140 | [nico-zhuang/dsh-chat-file-actions](https://github.com/nico-zhuang/dsh-chat-file-actions) | 0 | 2026-10-11 | 2026-10-13 | Compact file actions for DeepSeek Harness chat turns \| DSH 对话文件操作 |
| 141 | [niubi6668889595/dsh-autoupdater](https://github.com/niubi6668889595/dsh-autoupdater) | 0 | 2026-10-13 | 2026-10-13 | Scheduled idle-gated auto-update for DeepSeek Harness: DSH itself + installed plugins. Four schedule modes, bidirectional whitelist, web panel. |
| 142 | [oliblue-evan/dsh-github-auth](https://github.com/oliblue-evan/dsh-github-auth) | 0 | 2026-10-13 | 2026-10-13 | Manage local GitHub CLI accounts, web authorization, SSH identity and repository permissions in DeepSeek Harness. |
| 143 | [oliblue-evan/dsh-model-organizer](https://github.com/oliblue-evan/dsh-model-organizer) | 0 | 2026-10-13 | 2026-10-13 | 模型菜单整理器：按厂商折叠、悬浮滑出模型面板，支持置顶、最近、厂商内搜索、别名与隐藏。纯客户端插件（DSH / DeepSeek Harness） |
| 144 | [PerryLink/dsh-phone-inbox](https://github.com/PerryLink/dsh-phone-inbox) | 0 | 2026-10-13 | 2026-10-13 | DeepSeek Harness 插件 — 手机（微信桥）入站附件的受控清单与按需取用：让 agent 知道本会话收到了哪些附件，并把选中的一份搬进工作区。仅提示差异，不作出定性结论。 |
| 145 | [PHM-Audit/dsh-action-guard](https://github.com/PHM-Audit/dsh-action-guard) | 0 | 2026-10-13 | 2026-10-13 | Deterministic pre-execution tool-call guard plugin for DeepSeek Harness (dsh) - monotonic guard seam, operator-declared policy, decision ledger. Gate: 12/12 green, 2000 benign FP=0, injected 7/7 caught. |
| 146 | [realguan/dsh-deepseek-chat-embed](https://github.com/realguan/dsh-deepseek-chat-embed) | 0 | 2026-10-13 | 2026-10-13 | 在 DeepSeek Harness (dsh) 桌面端内嵌 chat.deepseek.com：双入口聊天面板（中央主面板 + 右侧栏标签页）、多桌面宿主自适应驱动、持久登录会话，零运行时依赖。 |
| 147 | [RGarrido03/dsh-zed-provider](https://github.com/RGarrido03/dsh-zed-provider) | 0 | 2026-10-13 | 2026-10-13 | Use your Zed AI subscription (Pro / Student) from DeepSeek Harness: registers the zed-agent route with Claude + GPT models, an editable Models-page card and a model chooser. |
| 148 | [rh666666/dsh-plugin-debug-mode](https://github.com/rh666666/dsh-plugin-debug-mode) | 0 | 2026-10-10 | 2026-10-13 | 完全由 DSH 写的 DSH 插件，用于复刻 Cursor 中的 Debug 模式。 |
| 149 | [ruaibeite/dsh-auto-observe](https://github.com/ruaibeite/dsh-auto-observe) | 0 | 2026-10-13 | 2026-10-13 | Records the edit target's current version as an observation when the agent never used the read tool (bash inspection does not count), so the fs observation policy stops rejecting edits with FS_NOT_OBSERVED. |
| 150 | [rui08984-dot/dsh-sessionrelay](https://github.com/rui08984-dot/dsh-sessionrelay) | 0 | 2026-10-13 | 2026-10-13 | SessionRelay project memory for DeepSeek Harness — automatic brief injection, project auto-detection, and two-stage safe binding. Offline self-contained. |
| 151 | [runcat-tommy/dsh-mcp-mini-manager](https://github.com/runcat-tommy/dsh-mcp-mini-manager) | 0 | 2026-10-13 | 2026-10-13 | Minimal MCP manager for DeepSeek Harness Web: one Settings page at the same sidebar level as Plugins that lists every MCP server this DSH actually loads, with each server's summary and live state, and takes any of them out of rotation. / MCP 极简管理：与「插件」同级的一页设置，列出当前 DSH 装载的全部 MCP 及其简介与状态，并可逐个停用（写入可恢复的停用补丁）。 |
| 152 | [runcat-tommy/dsh-skill-mini-manager](https://github.com/runcat-tommy/dsh-skill-mini-manager) | 0 | 2026-10-13 | 2026-10-13 | Minimal skill manager for DeepSeek Harness Web: a Settings page beside Plugins that lists every installed skill with its own summary, source and disk footprint, and removes any of them into a recoverable trash. skill 极简管理：与「插件」同级的一页设置，列出全部 skill 及简介并可逐个移除。 |
| 153 | [sadjjk/dsh-context-mode-adapter](https://github.com/sadjjk/dsh-context-mode-adapter) | 0 | 2026-10-09 | 2026-10-13 | context-mode 没有官方 DSH 插件——本仓库补上：11 个 ctx_* 工具进程内注册 + hook 路由拦截，节省会话上下文 |
| 154 | [Sakayorilove/dsh-laurel](https://github.com/Sakayorilove/dsh-laurel) | 0 | 2026-10-13 | 2026-10-13 | Laurel 套件：给 DeepSeek Harness 的「功能管理」面板 + 四个可单独开关的插件（通知 / Claude 主题 / 记忆与上下文 / 可视化规划） |
| 155 | [sevenhsu7/dsh-codex-like-markdown](https://github.com/sevenhsu7/dsh-codex-like-markdown) | 0 | 2026-10-13 | 2026-10-13 | Codex-like Markdown editing for the DSH right Sidebar: a rendered document you edit in place, including table cells. |
| 156 | [shZhang1614/dsh-float-lamp](https://github.com/shZhang1614/dsh-float-lamp) | 0 | 2026-10-13 | 2026-10-13 | Floating task-status lamp for DeepSeek Harness: green running, orange approval, blue question, grey idle — a borderless always-on-top window outside the DSH app. |
| 157 | [sibetlyf/dsh-plugin-tencent-meeting](https://github.com/sibetlyf/dsh-plugin-tencent-meeting) | 0 | 2026-10-13 | 2026-10-13 | Tencent Meeting plugin for DeepSeek Harness with user-supplied local credentials and explicit approval. |
| 158 | [StarCried/starlite-dsh](https://github.com/StarCried/starlite-dsh) | 0 | 2026-08-18 | 2026-10-13 | A privacy-conscious Inochi2D desktop companion for DeepSeek Harness on Windows 11 + WSL2. |
| 159 | [Stephen-pc/publish-size-check](https://github.com/Stephen-pc/publish-size-check) | 0 | 2026-10-12 | 2026-10-13 | 发布尺寸检查：对照目标平台规格，检查图片能不能发、哪一项参数过不了。零依赖、只查几何参数，含 dpi 达标≠可用与多图一致性检查。 |
| 160 | [suanlv/dsh-local-compute-pool](https://github.com/suanlv/dsh-local-compute-pool) | 0 | 2026-10-13 | 2026-10-13 | DSH plugin: pool several local inference endpoints and spread delegated subagents across them |
| 161 | [sxwer001/dsh-collab-dev](https://github.com/sxwer001/dsh-collab-dev) | 0 | 2026-10-13 | 2026-10-13 | DSH native collaboration: main-agent architecture and validated plans, parallel workers, verification and independent review. |
| 162 | [Taulee/dsh-ecnu-quota](https://github.com/Taulee/dsh-ecnu-quota) | 0 | 2026-10-12 | 2026-10-13 | DSH 网页界面里的华东师范大学 (chat.ecnu.edu.cn) Open API 额度卡片与详情面板 |
| 163 | [taxah92/dsh-pve-vm](https://github.com/taxah92/dsh-pve-vm) | 0 | 2026-10-13 | 2026-10-13 | Proxmox VE VM control for DeepSeek Harness: see and click inside a VM console over VNC, plus commands, files and Unicode text through the QEMU guest agent. |
| 164 | [Tim-ReJet/dsh-plugin-durable-subagent](https://github.com/Tim-ReJet/dsh-plugin-durable-subagent) | 0 | 2026-10-13 | 2026-10-13 | Durable subagent execution for DeepSeek Harness: a \`durable\` provider and a model-facing tool that drive pi-durable-subagents, so a crashed delegation converges on its first outcome instead of running twice. |
| 165 | [tourhabk-ui/dsh-vedar](https://github.com/tourhabk-ui/dsh-vedar) | 0 | 2026-10-13 | 2026-10-13 | DeepSeek Harness plugin: Vedar (vedarai.ru) Kamchatka travel MCP server. 堪察加旅游 MCP 服务器，一条命令接入 dsh |
| 166 | [Trisia/dsh-tmp-wks](https://github.com/Trisia/dsh-tmp-wks) | 0 | 2026-10-12 | 2026-10-13 | Stop leaving DSH to make a temp folder. One-click throwaway workspaces with optional cleanup · 告别手动建目录，DSH 一键临时工作区，删除可控 |
| 167 | [Turanbuturan/dsh-agent-whale-girl](https://github.com/Turanbuturan/dsh-agent-whale-girl) | 0 | 2026-10-13 | 2026-10-13 | An unofficial whale-girl companion for the DSH Web GUI: a sidebar brand mark plus a draggable, collapsible floating mascot with live token usage. |
| 168 | [vec715/dsh-activity-view](https://github.com/vec715/dsh-activity-view) | 0 | 2026-10-13 | 2026-10-13 | Activity view for the DeepSeek Harness web sidebar: a bell swaps the sessions list for Needs attention, Working and Today. |
| 169 | [vegerot/deepseek-harness-session-cost-pill](https://github.com/vegerot/deepseek-harness-session-cost-pill) | 0 | 2026-10-13 | 2026-10-13 | 💸 Live session spend in the DeepSeek Harness composer dock — per-request peak/off-peak pricing, zero harness patches. |
| 170 | [ven314/dsh-conflict-doctor](https://github.com/ven314/dsh-conflict-doctor) | 0 | 2026-10-13 | 2026-10-13 | DSH plugin conflict governance: diagnose silent plugin conflicts in DeepSeek Harness and get the exact patch that fixes each one. DSH 插件冲突诊断与修复建议。 |
| 171 | [Wang993/DSH_OrganizeFilesInTheSameWorkspace](https://github.com/Wang993/DSH_OrganizeFilesInTheSameWorkspace) | 0 | 2026-10-13 | 2026-10-13 | DSH Web 会话整理插件：标签分类 · 归档 / 恢复 · 已归档浏览（DeepSeek Harness session organizer plugin） |
| 172 | [wangbofan/dsh-daily-chat](https://github.com/wangbofan/dsh-daily-chat) | 0 | 2026-10-13 | 2026-10-13 | 【蓝色大肥鱼版】DSH 日常聊天插件：把「新会话」拆成日常与工作，日常人格是「蓝色大肥鱼」（DeepSeek娘 / 鲸鱼娘），支持真删除单条与批量聊天记录 |
| 173 | [wangxuewangxue98/dsh-motor-ai](https://github.com/wangxuewangxue98/dsh-motor-ai) | 0 | 2026-10-10 | 2026-10-13 | 电机电磁设计 AI 插件完整版（L0 毫秒级广筛 → L1 RMxprt + L2 Motor-CAD 校核） |
| 174 | [wjh-ux/dsh-wechat-media](https://github.com/wjh-ux/dsh-wechat-media) | 0 | 2026-10-13 | 2026-10-13 | Personal WeChat and WeCom (企业微信) for DeepSeek Harness: QR pairing, one DSH conversation per chat, two-way text/image/video/document/archive transfer, and a two-way WeCom intelligent robot over its long connection |
| 175 | [Wlaeg/dsh-pet-desktop-linux](https://github.com/Wlaeg/dsh-pet-desktop-linux) | 0 | 2026-10-13 | 2026-10-13 | A transparent always-on-top desktop pet for DSH on Linux (X11 / XWayland) |
| 176 | [WLX2007/DSH-SkillsHub](https://github.com/WLX2007/DSH-SkillsHub) | 0 | 2026-10-12 | 2026-10-13 | DeepSeek Harness (DSH) 技能中心插件 —— 原生 Web GUI 面板：搜索网络技能市场（SkillHub / skills.sh / GitHub）、一键安装到用户/项目根、管理与创建本地技能。npm: @wulongxi/dsh-skills-hub |
| 177 | [wobenshiwomu/dsh-plan](https://github.com/wobenshiwomu/dsh-plan) | 0 | 2026-10-13 | 2026-10-13 | DeepSeek Harness 插件：深潜计划 —— DSH 里的自营 Token Plan 页面。七档订阅（¥10~自定义），订阅跳官方充值页；充回来自动把额度写进 dsh-ration \| A self-hosted Token Plan page inside DSH: subscribe, top up DeepSeek balance, self-quota syncs |
| 178 | [wonaren/dsh-upgrade](https://github.com/wonaren/dsh-upgrade) | 0 | 2026-10-13 | 2026-10-13 | DeepSeek Harness (DSH) 版本检测、多通道一键平滑升级与服务守护插件 |
| 179 | [WuChangqing1/dsh-qqbot-bridge](https://github.com/WuChangqing1/dsh-qqbot-bridge) | 0 | 2026-10-13 | 2026-10-13 | Bridge QQ official-bot private chats into DeepSeek Harness agent sessions - same session, same memory, same permissions. No second QQ gateway, no copy-pasted system prompt. |
| 180 | [wycto/dsh-evolution](https://github.com/wycto/dsh-evolution) | 0 | 2026-09-17 | 2026-10-13 | Local-first self-evolution plugin for DSH: records your coding-agent sessions to a local ledger, reviews them across sessions with the model you already configured, and turns repeated pitfalls into local knowledge. Zero uploads by default. 本地优先的 DSH 自动进化插件：会话账本 + 跨会话复盘，默认不联网、不上传。 |
| 181 | [xfgil/dsh-onebot-companion](https://github.com/xfgil/dsh-onebot-companion) | 0 | 2026-10-13 | 2026-10-13 | QQ 通道一体化插件：出站沉默守卫、每轮行为规则、对话节奏（入站合并/出站分段）、人设（情绪+主动发言+风格学习）、语音（qq_say: 文字→edge-tts→语音消息）。Runtime prototype patching for dsh-onebot-qq — upgrade-proof, no node_modules edits. |
| 182 | [xfgil/dsh-session-clock](https://github.com/xfgil/dsh-session-clock) | 0 | 2026-10-13 | 2026-10-13 | DSH 会话时钟：按会话授时 + 跨轮/跨会话空闲间隔，作为内置 dsh-time-context 的补充插件。Per-session clock injection for DeepSeek Harness with durable idle-gap tracking. A companion to the built-in dsh-time-context. |
| 183 | [xiake-1/dsh-skill-toggles](https://github.com/xiake-1/dsh-skill-toggles) | 0 | 2026-10-13 | 2026-10-13 | DSH plugin: enable/disable skills by group (skill toggles manager) |
| 184 | [XiaoSHang05/dsh-loop-guard](https://github.com/XiaoSHang05/dsh-loop-guard) | 0 | 2026-10-13 | 2026-10-13 | A passive watchdog for DeepSeek Harness: watches a turn's thinking and text streams and cancels it when the model starts repeating itself. |
| 185 | [xingzhen199186/dsh-subagent-custom](https://github.com/xingzhen199186/dsh-subagent-custom) | 0 | 2026-10-13 | 2026-10-13 | DeepSeek Harness 子代理模型管控与 Jev 智能分流插件（合并自 vitas/dsh-jev-subagent-dispatch 与 ringoage/dsh-subagent-model-picker） |
| 186 | [Xxsttb/dsh-input-optimizer](https://github.com/Xxsttb/dsh-input-optimizer) | 0 | 2026-10-12 | 2026-10-13 | DeepSeek Harness plugin: a four-pointed-star button left of the composer's model selector that rewrites your draft before you send it — fixing grammar, ambiguity and execution order — plus a dedicated settings page. AI-generated. |
| 187 | [Xxsttb/dsh-model-endpoint](https://github.com/Xxsttb/dsh-model-endpoint) | 0 | 2026-10-12 | 2026-10-13 | DeepSeek Harness plugin: exposes the model you selected in chat (or in Settings) through a standalone OpenAI-compatible HTTP API, reachable over LAN, public network or NAT port forwarding. Streaming, bearer auth, CORS and a dedicated settings page. AI-generated. |
| 188 | [xyl886/dsh-key-usage](https://github.com/xyl886/dsh-key-usage) | 0 | 2026-10-13 | 2026-10-13 | DeepSeek Harness 侧边栏「使用情况」：按通道查看用量明细、年度热力图、项目/会话用量与余额配额快照，纯本地只读、零外网 |
| 189 | [xzy-nine/dsh-source-control](https://github.com/xzy-nine/dsh-source-control) | 0 | 2026-10-13 | 2026-10-13 | dsh中的类vscode源代码管理页面 |
| 190 | [YangShen-SWE/dsh-plugin-chat-zoom](https://github.com/YangShen-SWE/dsh-plugin-chat-zoom) | 0 | 2026-10-13 | 2026-10-13 | DSH chat zoom plugin / DeepSeek Harness 聊天缩放插件 |
| 191 | [ystyle/chronomem](https://github.com/ystyle/chronomem) | 0 | 2026-10-13 | 2026-10-13 | 忆时塔 chronomem：以 MCP 服务形态提供的时间分层外部记忆（回想 + 语义总结）——含 dsh 会话活动采集插件 |
| 192 | [YYfather/DSH-memory](https://github.com/YYfather/DSH-memory) | 0 | 2026-10-13 | 2026-10-13 | DSH-memory — DeepSeek Harness 长期记忆/技能/待办/记忆同步插件，基于 csyangwen/dsh-memory-evolve（MIT）的 DSH 0.2.0-rc.2 兼容分支。Fork of csyangwen/dsh-memory-evolve, adapted for DSH 0.2.0-rc.2. |
| 193 | [yzhclcl/dsh-omni-modal](https://github.com/yzhclcl/dsh-omni-modal) | 0 | 2026-10-13 | 2026-10-13 | Adds an Omni-modal settings section to DeepSeek Harness: configure OpenAI-compatible image/video generation endpoints with switchable config profiles, plus generate_image / generate_video / check_video tools. |
| 194 | [yzhclcl/dsh-plan-build-mode](https://github.com/yzhclcl/dsh-plan-build-mode) | 0 | 2026-10-13 | 2026-10-13 | Plan / Build mode switcher for DeepSeek Harness: a composer dropdown plus a default-mode setting for new sessions. |
| 195 | [zangxx66/dsh-movable-settings](https://github.com/zangxx66/dsh-movable-settings) | 0 | 2026-10-13 | 2026-10-13 | Make the DSH settings dialog movable, resizable and maximizable, remembering its geometry. |
| 196 | [zero360-TYN/dsh-sage-mode](https://github.com/zero360-TYN/dsh-sage-mode) | 0 | 2026-10-13 | 2026-10-13 | Sage mode（贤者模式）: a read-only advisory session mode for DeepSeek Harness — answer, advise, review, teach, brainstorm, and diagnose with read/search/web tools only. |
| 197 | [zhangcun1995521/deepwork](https://github.com/zhangcun1995521/deepwork) | 0 | 2026-10-13 | 2026-10-13 | Declare an enterprise world, derive the agent's tools and permissions from it, and enforce them. A platform on DeepSeek Harness. |

## 从快照消失的已核准仓库 / Approved repositories missing from the snapshot

已核准但已不在当前快照中（删除或改名），核实后从 [data/approved.json](../approved.json) 移除或更新名称。

Approved but no longer present in the current snapshot (deleted or renamed) — after checking, remove them from [data/approved.json](../approved.json) or update the name.

- 2026heshao/dsh-skill-mcp-board
- 2861292267/dsh-prompt-enhancer
- Archer76/dsh-memory-evolve-suite
- asun-labs/dsh-plugin-agent-deck
- ax2/dsh-dev-toolbox
- baicaibucai1/dsh-process-control
- FuSheng-cs/dsh-trae-relay
- G57651/dsh-session-manager
- Guaq-AI/employed-plugins
- JeremyWangCY/dsh-pc-pilot
- lnyuqian/dsh-quick-prompts
- lsl1931/dsh-server-panel
- mirelconstantin/dsh-subagent-model
- Nesarf/TastyLineOut
- PastSheep/dsh-agent-shell
- PastSheep/dsh-right-drawer
- PastSheep/dsh-soln-panel
- PastSheep/dsh-stats-board
- plyflai/dsh-skills
- Prokint/infinite-canvas-dsh
- qingzhijie05/dsh-user-memory
- QiuShanLing/dsh-paper-fetch
- Sparrived/dsh-plugin-workspace-skill
- StarChen-Cycler/octie-dsh-plugin
- StarCried/dsh-inochi2d-pet
- SuperWheel/cliworker-now
- tree201/dsh-capability-inspector
- wjackiedev/dsh-session-manager
- zoahdev/dsh-artifacts
- zoahdev/dsh-browser-use
- zoahdev/dsh-cn-boot
- zoahdev/dsh-dep-audit
- zoahdev/dsh-discussions-radar
- zoahdev/dsh-disk-audit
- zoahdev/dsh-ecosystem
- zoahdev/dsh-firecrawl
- zoahdev/dsh-firstrun
- zoahdev/dsh-github-intelligence
- zoahdev/dsh-github-release-radar
- zoahdev/dsh-kirocrew
- zoahdev/dsh-llms-forge
- zoahdev/dsh-pet-evolve
- zoahdev/dsh-plugin-doctor
- zoahdev/dsh-plugin-doctor-action
- zoahdev/dsh-plugin-search
- zoahdev/dsh-plugin-template
- zoahdev/dsh-poison-guard
- zoahdev/dsh-poison-guard-action
- zoahdev/dsh-quality-score
- zoahdev/dsh-readme-forge
- zoahdev/dsh-subscribe
- zoahdev/dsh-timesheet
- zoahdev/dsh-vision
- zoahdev/dsh-zh
