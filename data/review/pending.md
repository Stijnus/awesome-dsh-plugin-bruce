# 待审核仓库 / Pending review

> 新增到 `dsh-plugin` Topic 下、带有简介、尚未经维护者核实的仓库。本文件由 `scripts/update.mjs` 每日刷新，仅供审核使用，不是用户可见页面。
>
> Repositories newly added to the `dsh-plugin` topic that the maintainer has not verified yet. Refreshed daily by `scripts/update.mjs`; review-only, not a user-facing page.

- 生成时间 / Generated: **2026-10-24**
- 快照日期 / Snapshot date: **2026-10-24 (UTC)**
- 待审核 / Pending: **345**
- 从快照消失的已核准仓库 / Approved repositories missing from the snapshot: **36**
- Star 异常增长 / Star-growth alerts: **10** — 先看下方告警节 / see the alert section first

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

对比上一份快照 **2026-10-23** / vs previous snapshot **2026-10-23**。规则：日增 ≥100★；已核准仓新入 Top 200（且 Δ≥50）/ 名次跃升 ≥50 / 冲入 Top 20；待审仓 ≥100★ 且核准后将进入 Top 200。

- 看 Star 是否与 fork、提交活跃度、仓库年龄匹配（高星零 fork、创建当天几百星，多为刷星）
- 是否把已有高星的通用项目贴上 `dsh-plugin` Topic 蹭榜——插件本身可进目录，但应加入 `leaderboard_exclusions`，理由写清 stars accrued as …
- 待审仓若核准会直接冲进 Top 20 / Top 200，先确认热度来自 **DSH 插件本身**
- 已核准仓的异常跃升：确认后同样可记入 `leaderboard_exclusions`，不必下架目录

Check stars against forks, commit activity and age (hundreds of stars on day one, or high stars with zero forks, usually look bought). A generic high-star project that only just tagged `dsh-plugin` can stay in the catalog but should go to `leaderboard_exclusions` (reason: stars accrued as …). If approving a pending repo would drop it into Top 20 / Top 200, confirm the audience is the DSH plugin itself.

- 告警数 / Alerts: **10**

| Project | Queue | Stars | Δ | Forks | Age | Signals | 审核提示 / Hint |
| --- | --- | ---: | ---: | ---: | ---: | --- | --- |
| ⚠️ [Ebony-Vinyl/dsh-our-free-model](https://github.com/Ebony-Vinyl/dsh-our-free-model) | 已核准 / approved | 41068 | +2111 | 1168 | 29d | 日增百星 | 日增 +2111★；已不进榜单 |
| ⚠️ [elysia395/dsh-wallpaper-engine](https://github.com/elysia395/dsh-wallpaper-engine) | 已核准 / approved | 2482 | +348 | 77 | 68d | 日增百星 | 日增 +348★ |
| ⚠️ [Fei2411/DeepSeek-Bot](https://github.com/Fei2411/DeepSeek-Bot) | 已核准 / approved | 3727 | +320 | 348 | 16d | 日增百星 | 日增 +320★ |
| ⚠️ [dataelement/dsh-desktop](https://github.com/dataelement/dsh-desktop) | 已核准 / approved | 16771 | +263 | 555 | 71d | 日增百星 | 日增 +263★；已不进榜单 |
| ⚠️ [dsh-market/dsh-market](https://github.com/dsh-market/dsh-market) | 已核准 / approved | 8678 | +209 | 339 | 70d | 日增百星 | 日增 +209★；已不进榜单 |
| ⚠️ [PC2005-cloud/dsh-pet](https://github.com/PC2005-cloud/dsh-pet) | 已核准 / approved | 3918 | +191 | 291 | 70d | 日增百星 | 日增 +191★ |
| ⚠️ [ccch1mneyyy/dsh-TUI](https://github.com/ccch1mneyyy/dsh-TUI) | 已核准 / approved | 5630 | +155 | 290 | 71d | 日增百星 | 日增 +155★ |
| ⚠️ [c1overzz/dsh-bili-scroll](https://github.com/c1overzz/dsh-bili-scroll) | 已核准 / approved | 684 | +140 | 72 | 9d | 日增百星 | 日增 +140★ |
| ⚠️ [T-Auto/dsh-ops](https://github.com/T-Auto/dsh-ops) | 已核准 / approved | 4118 | +131 | 121 | 15d | 日增百星 | 日增 +131★ |
| ⚠️ [Yuuyuko-uu/dsh-fish-memory](https://github.com/Yuuyuko-uu/dsh-fish-memory) | 已核准 / approved | 123 | +54 | 2 | 32d | 新入 Top 200 | 新入 Top 200 #155 |


| # | Project | Stars | Created | First seen | Description |
| ---: | --- | ---: | ---: | ---: | --- |
| 1 | [Lixiaoyiao/DSH-action](https://github.com/Lixiaoyiao/DSH-action) | 48 | 2026-08-14 | 2026-10-24 | Community GitHub Action for DeepSeek Harness — AI Code Review · CI Diagnosis · Auto Fix · Issue → PR |
| 2 | [angelky7/dsh-browser-control](https://github.com/angelky7/dsh-browser-control) | 42 | 2026-08-22 | 2026-10-24 | Chrome 浏览器扩展 + DeepSeek Harness 插件，让 AI Agent 直接操控你的真实浏览器。 |
| 3 | [regrevia/Envoy](https://github.com/regrevia/Envoy) | 41 | 2026-06-08 | 2026-10-24 | 把链接分享给你的 AI：提取网页、视频与本地媒体中的可追溯材料。 / Share links with your AI: extract traceable material from web pages, videos, and local media. |
| 4 | [Windsander/Mebular](https://github.com/Windsander/Mebular) | 16 | 2026-08-19 | 2026-10-24 | One shared graph for every AI assistant and device — memory and tasks, local-first, signed, auditable, direct P2P sync. MCP tools; no hosted account. |
| 5 | [Bai-2008/dsh-better-panel](https://github.com/Bai-2008/dsh-better-panel) | 13 | 2026-10-09 | 2026-10-24 | 更优的模型选择器面板+推理条（DeepSeek Harness 插件）：可拖动连续滑条＋星云特效+美化模型选择面板 |
| 6 | [taoser258/dsh-client-ui-skin-qingxiao](https://github.com/taoser258/dsh-client-ui-skin-qingxiao) | 11 | 2026-08-29 | 2026-10-24 | 清宵 · 弦凝清霄 —— DeepSeek Harness (DSH) Web 界面美化皮肤：以《鸣潮》角色清宵为灵感的冰蓝·青碧·月白·玄夜调色板，含可换背景画卷、剑气流光粒子、磨砂玻璃面板与新会话迎宾页。A Qingxiao (Wuthering Waves) themed client UI skin for the DSH web GUI. |
| 7 | [Crosery/dsh-viewer](https://github.com/Crosery/dsh-viewer) | 10 | 2026-08-31 | 2026-10-24 | Everything renders: images, video, audio, PDF, Office documents and local web pages inline in the DeepSeek Harness web UI, via a display_file tool. |
| 8 | [ZekaiShi/dsh-evo-subagent](https://github.com/ZekaiShi/dsh-evo-subagent) | 7 | 2026-08-22 | 2026-10-24 | 跨工作区独立人格、自适应风格与陪伴预设：为项目和对话分别维护人格与确认后的通用偏好，支持任意 DSH 已注册模型的子代理路由（含通过其他插件接入的 Codex、Claude Code）。 |
| 9 | [MuWinds/dsh-codemode](https://github.com/MuWinds/dsh-codemode) | 6 | 2026-10-12 | 2026-10-24 | 新增 codemode 模式，更好、更高效地调用复杂工具 |
| 10 | [csukingzq/dsh-pdf-translator](https://github.com/csukingzq/dsh-pdf-translator) | 3 | 2026-10-24 | 2026-10-24 | AI vision PDF translation and LaTeX reconstruction for DeepSeek Harness |
| 11 | [SQHLnb666/mindsea](https://github.com/SQHLnb666/mindsea) | 3 | 2026-10-24 | 2026-10-24 | 给 DeepSeek Harness 的长期记忆插件：每轮聊完自动沉淀，数据存在本机 SQLite |
| 12 | [Anlerway/dsh-session-navigator](https://github.com/Anlerway/dsh-session-navigator) | 2 | 2026-10-17 | 2026-10-24 | 像 Windows 资源管理器那样管理 DSH 的会话：目录树、标签、备注、回收站，不改动实际会话文件布局。 Manage DSH sessions the way Windows Explorer manages files: folder tree, tags, notes, recycle bin. Session files never move. |
| 13 | [chameleonn4/dsh-codex-history](https://github.com/chameleonn4/dsh-codex-history) | 2 | 2026-10-24 | 2026-10-24 | DSH 插件：自动读取本地 Codex 会话历史，让 DeepSeek Harness 与 Codex 无缝衔接 |
| 14 | [hongdougao111/dsh-archive-trash](https://github.com/hongdougao111/dsh-archive-trash) | 2 | 2026-10-24 | 2026-10-24 | DSH 归档会话清理：把已归档的会话移进可还原的回收站，或彻底删除。 |
| 15 | [hongxin-y/codex-pet-Astra-Yao](https://github.com/hongxin-y/codex-pet-Astra-Yao) | 2 | 2026-08-04 | 2026-10-24 | 耀嘉音（Astra Yao）桌面宠物：既是一份 Codex 桌宠素材包，也是一个 DeepSeek Harness 插件（dsh-pet-astra-yao），会跟着会话状态换动作、说话并显示余额。 |
| 16 | [Jaylor-Wang/dsh-fast-loop](https://github.com/Jaylor-Wang/dsh-fast-loop) | 2 | 2026-10-24 | 2026-10-24 | High-performance streaming agent loop plugin for DeepSeek Harness |
| 17 | [kipozannaki/DSH-PDR-Plugin](https://github.com/kipozannaki/DSH-PDR-Plugin) | 2 | 2026-10-19 | 2026-10-24 | Plugin Detection and Response for DeepSeek Harness - pre-install health card, per-plugin runtime attribution of fs/network/subprocess, boundary judging, opt-in blocking. Local-first, no telemetry. |
| 18 | [MuyuYanran/dsh-rea-mcp-lite](https://github.com/MuyuYanran/dsh-rea-mcp-lite) | 2 | 2026-10-14 | 2026-10-24 | 把 REA 的逆向工程 MCP 工具全部收进按需加载的功能族：默认只摆出少量元工具，其余工具仍可随时检索与调用，省下绝大部分工具上下文；功能族热切换无需重启 DSH。自带更新与体检：查本仓库与 REA 上游更新、把新工具自动归类、提醒本机缺哪些工具。 |
| 19 | [qrxf/dsh-workspace-graph](https://github.com/qrxf/dsh-workspace-graph) | 2 | 2026-10-24 | 2026-10-24 | DeepSeek Harness 原生插件：可拖拽的工作区 / 会话图谱，气泡视图 + 筛选搜索 + 原生会话操作 \| Draggable workspace &amp; session graph plugin for DSH |
| 20 | [rans725/dsh-glass-ranswork](https://github.com/rans725/dsh-glass-ranswork) | 2 | 2026-10-17 | 2026-10-24 | 自定义主题：玻璃拟态 + 自定义背景图/裁剪/自动明暗（DSH 插件） |
| 21 | [tuoLuoSuan/dsh-peak](https://github.com/tuoLuoSuan/dsh-peak) | 2 | 2026-10-03 | 2026-10-24 | Peak / off-peak billing badge for the DeepSeek API. Sits in the DSH composer and works out the rate from your own clock. |
| 22 | [WenQ-cloud/dsh-cutewhale-h](https://github.com/WenQ-cloud/dsh-cutewhale-h) | 2 | 2026-10-24 | 2026-10-24 | DSH Web/软件端 插件：住在输入框左边的像素鲸鱼娘，A pixel whale maid for DSH Web&amp;software |
| 23 | [xinxing1708/DSH-Codex-Style](https://github.com/xinxing1708/DSH-Codex-Style) | 2 | 2026-10-23 | 2026-10-24 | 为Deepseek-Harness制作的Codex界面的UI插件 |
| 24 | [yhm0619/dsh-pet-read](https://github.com/yhm0619/dsh-pet-read) | 2 | 2026-10-24 | 2026-10-24 | 基于 dsh-pet 的互动碎碎念：每 30 秒识屏，用视觉模型在宠物头顶随口吐槽（不需要回复、不带表情包）。 |
| 25 | [yugejixian/vm-blackbox](https://github.com/yugejixian/vm-blackbox) | 2 | 2026-10-24 | 2026-10-24 | Black-box GUI testing for DeepSeek Harness: an AI tester drives a real Windows VM with only screenshots and mouse/keyboard. |
| 26 | [0avatar0/dsh-ai-book-shelf](https://github.com/0avatar0/dsh-ai-book-shelf) | 1 | 2026-10-23 | 2026-10-24 | AI Book Shelf / AI 书架：书籍与论文阅读、AI 解释、全文搜索、论文翻译与中英对照 |
| 27 | [387617119/mimo-voice-report](https://github.com/387617119/mimo-voice-report) | 1 | 2026-10-24 | 2026-10-24 | 基于mimo的DSH语音汇报 · MiMo voice report plugin for DeepSeek Harness |
| 28 | [accomplish07zrh-eng/dsh-aurabot-qq](https://github.com/accomplish07zrh-eng/dsh-aurabot-qq) | 1 | 2026-10-24 | 2026-10-24 | DeepSeek Harness 插件：让 AI 以「大肥鱼」的身份住进 QQ（SnowLuma / OneBot v11） |
| 29 | [angelky7/dsh-origin-bridge](https://github.com/angelky7/dsh-origin-bridge) | 1 | 2026-10-09 | 2026-10-24 | 在对话里驱动本机 Origin/OriginPro：导入 .dat/.csv/.txt 与工作站 .bin，绘图、拟合、改样式、导出图片并保存可编辑的 .opju。dsh 插件，27 个 MCP 工具。第三方工具，与 OriginLab 无关联。 |
| 30 | [AQian0/dsh-jj](https://github.com/AQian0/dsh-jj) | 1 | 2026-10-21 | 2026-10-24 | 为 DeepSeek Harness 提供 Jujutsu (jj) 一等支持 |
| 31 | [Bemly/dsh-plug](https://github.com/Bemly/dsh-plug) | 1 | 2026-10-20 | 2026-10-24 | 🫐Bemly_'s o-chinchin🐳 |
| 32 | [blankwy/dsh-scholar-access](https://github.com/blankwy/dsh-scholar-access) | 1 | 2026-10-24 | 2026-10-24 | dsh在校园网下接入学术资源服务，加速github与google等支持的网站，无需单独运行scholartools或特定浏览器，基于 scholar.edu.cn |
| 33 | [Cai-kunkun/dsh-workspace-fork](https://github.com/Cai-kunkun/dsh-workspace-fork) | 1 | 2026-10-24 | 2026-10-24 | Fork a DeepSeek Harness conversation from one workspace into another. |
| 34 | [Crosery/dsh-drop](https://github.com/Crosery/dsh-drop) | 1 | 2026-09-05 | 2026-10-24 | Drag and paste files into DeepSeek Harness Web: one preview rail, native image attachments, and file references added only when sending. |
| 35 | [CurrentRajAdapt/Deepseek-Harness-2026](https://github.com/CurrentRajAdapt/Deepseek-Harness-2026) | 1 | 2026-10-24 | 2026-10-24 | ⭐️ Deepseek Harness: an AI agent where every module can be replaced ⭐️ |
| 36 | [CXZAAA/dsh-radio](https://github.com/CXZAAA/dsh-radio) | 1 | 2026-10-24 | 2026-10-24 | Ambient internet radio for the DeepSeek-Harness Web GUI |
| 37 | [DEVVE-1/dsh-plugin-personal-appearance](https://github.com/DEVVE-1/dsh-plugin-personal-appearance) | 1 | 2026-10-24 | 2026-10-24 | DSH 客户端换皮插件：标题栏点一下就能换主题，Codex 和 Claude Code 两套完整配色，外加小圆角 / macOS 圆角和 iOS 手感的弹簧动效，不用重启，改完立刻生效。 |
| 38 | [DEVVE-1/dsh-session-purge](https://github.com/DEVVE-1/dsh-session-purge) | 1 | 2026-10-08 | 2026-10-24 | DSH 插件：侧边栏右键会话即可彻底删除，连同会话日志、投影缓存、工作区记账与全文索引一起清干净，不碰其它会话。 \| DSH plugin: hard-delete a session and every trace of it — logs, projection cache, workspace bookkeeping, FTS index. |
| 39 | [DEVVE-1/dsh-windows-approval-notify](https://github.com/DEVVE-1/dsh-windows-approval-notify) | 1 | 2026-10-23 | 2026-10-24 | DSH plugin: pop a Windows toast the moment an approval is requested, so you notice even when DSH is in the background. \| DSH（DeepSeek Harness）插件：任务需要审批或跑完时弹 Windows 原生通知，只在 DSH 不在前台时提醒。 |
| 40 | [drscrewdriver/dsh-manage-session](https://github.com/drscrewdriver/dsh-manage-session) | 1 | 2026-09-14 | 2026-10-24 | DSH Web 插件：会话管理台（原名 dsh-session-steward）—— 活跃/归档会话统一管理（浏览、筛选、收藏、批量归档/取消归档/清理），外加四门会话体检；入口自适应顶栏工具行或底栏。不含搜索/索引、不依赖 DRS（搜索在 dsh-search-index）。 |
| 41 | [etShaw-zh/dsh-db-studio](https://github.com/etShaw-zh/dsh-db-studio) | 1 | 2026-10-24 | 2026-10-24 | Connect to databases in DeepSeek Harness (DSH), then query and edit data right in the conversation. |
| 42 | [FelixJiashengFu/dsh-haoba-mode](https://github.com/FelixJiashengFu/dsh-haoba-mode) | 1 | 2026-10-23 | 2026-10-24 | 豪霸模式：DeepSeek Harness 插件，一枚土豪金开关把每一步的推理强度与输出预算拉满 · Max-effort mode switch for DeepSeek Harness |
| 43 | [gitend/dsh-usd-brep](https://github.com/gitend/dsh-usd-brep) | 1 | 2026-10-24 | 2026-10-24 | dsh-usd-brep |
| 44 | [heyuanliu3-byte/dsh-auto-preset](https://github.com/heyuanliu3-byte/dsh-auto-preset) | 1 | 2026-10-24 | 2026-10-24 | DSH plugin: remembers your last manual permission-preset choice per session and restores it when the session is reopened. |
| 45 | [HHHHHH233333/dsh-session-delete](https://github.com/HHHHHH233333/dsh-session-delete) | 1 | 2026-10-24 | 2026-10-24 | Permanently delete a DeepSeek Harness session: chat log, projection cache, spill files, and the subagent sessions it spawned. Sidebar menu entry + confirm dialog. |
| 46 | [hrygo/dsh-speechrail-bundle](https://github.com/hrygo/dsh-speechrail-bundle) | 1 | 2026-10-24 | 2026-10-24 | Independent DeepSeek Harness voice-input bundle: browser recording transcribed by a local SpeechRail service or any other loopback OpenAI-compatible engine. Capability-snapshot aware, three-state credential verdict, single in-flight gate, agent-facing status tool. Loopback only. |
| 47 | [HugoOu/dsh-opencode-go-eta](https://github.com/HugoOu/dsh-opencode-go-eta) | 1 | 2026-10-24 | 2026-10-24 | OpenCode Go quota forecast for DeepSeek Harness: projected exhaustion ETA, renewal-date comparison and renew-vs-API cost advice. |
| 48 | [IgnatAi401/dsh-telegram](https://github.com/IgnatAi401/dsh-telegram) | 1 | 2026-09-07 | 2026-10-24 | A Telegram bot plugin for DeepSeek Harness, with shared sessions, image input, and interactive agent conversations |
| 49 | [Imzl-zl/dsh-redo](https://github.com/Imzl-zl/dsh-redo) | 1 | 2026-10-24 | 2026-10-24 | DSH 插件：编辑或重试已发送的消息并原地重新生成。Edit or retry sent messages and regenerate in place for DeepSeek Harness. |
| 50 | [infileap/Inimerse](https://github.com/infileap/Inimerse) | 1 | 2026-08-23 | 2026-10-24 | Inimerse,a new coding language |
| 51 | [Jaylor-Wang/dsh-tool-session-delete](https://github.com/Jaylor-Wang/dsh-tool-session-delete) | 1 | 2026-10-24 | 2026-10-24 | A permanent 'Delete session' action for the DeepSeek Harness sidebar, behind a confirmation dialog. |
| 52 | [John4874314/dsh-steward](https://github.com/John4874314/dsh-steward) | 1 | 2026-10-24 | 2026-10-24 | Conversation steward for DeepSeek Harness: one folder per conversation, recoverable delete, right-click file actions, and a three-rule safety baseline written into the global AGENTS.md. |
| 53 | [Joshua1ya/dsh-tray-restart](https://github.com/Joshua1ya/dsh-tray-restart) | 1 | 2026-10-24 | 2026-10-24 | Restart the DeepSeek Harness desktop app and its host process from a session header button or the system tray (Windows). |
| 54 | [K0me1j1Fan/dsh-ssh-view](https://github.com/K0me1j1Fan/dsh-ssh-view) | 1 | 2026-10-24 | 2026-10-24 | SSH server view plugin for DeepSeek Harness: browse and edit files, inspect processes, and tail logs on a headless Linux server over SSH. |
| 55 | [KurohaneKaoruko/DSH-START](https://github.com/KurohaneKaoruko/DSH-START) | 1 | 2026-10-23 | 2026-10-24 | 用于DeepSeekHarness的启动动画插件 |
| 56 | [lchqi1998/dsh-n8n-plugin](https://github.com/lchqi1998/dsh-n8n-plugin) | 1 | 2026-10-23 | 2026-10-24 | DeepSeek Harness 的 n8n 工作流运维插件：多实例注册表、Agent 工具与设置页界面 |
| 57 | [Leni-More/dsh-conv-calendar](https://github.com/Leni-More/dsh-conv-calendar) | 1 | 2026-10-23 | 2026-10-24 | 把「每天发了多少条对话」画成 GitHub 提交日历那样的方格图，挂在 DSH Web 界面左侧栏里。A GitHub-style contribution calendar for DeepSeek Harness — see how many prompts you sent, how many conversations you had, and how many tokens you burned, one square per day. |
| 58 | [LiangshouX/dsh-ide-workbench](https://github.com/LiangshouX/dsh-ide-workbench) | 1 | 2026-10-21 | 2026-10-24 | JetBrains-style IDE workbench for DeepSeek Harness (DSH): Project, Commit, Git and Terminal tool windows, embedded editor, chat file links and send-to-chat. |
| 59 | [Limooning/DSH-API-Hub](https://github.com/Limooning/DSH-API-Hub) | 1 | 2026-10-23 | 2026-10-24 | Manage local API providers and skills inside DeepSeek Harness: probe, balance, models, and register them as DSH model routes |
| 60 | [lohana20061023-29/dsh-media-downloader](https://github.com/lohana20061023-29/dsh-media-downloader) | 1 | 2026-10-24 | 2026-10-24 | DSH 媒体下载插件：粘一条链接自动弹选择器，B 站多画质 / 抖音无水印 / 小红书图文原图三套原生解析，YouTube 等站点交给 yt-dlp。封面可按原图、16:9、4:3 分开下，图文笔记整组图片可选，登录用独立 profile 不影响日常浏览器。 |
| 61 | [lukeinx/cursor-to-dsh](https://github.com/lukeinx/cursor-to-dsh) | 1 | 2026-10-24 | 2026-10-24 | DeepSeek Harness plugin: Cursor models as the cursor LLM provider, one Cursor agent per DSH session |
| 62 | [lukeinx/dsh-remote-wecom](https://github.com/lukeinx/dsh-remote-wecom) | 1 | 2026-10-24 | 2026-10-24 | DeepSeek Harness plugin: control Desktop sessions from WeCom (企业微信) on your phone |
| 63 | [Lx23918/dsh-literature](https://github.com/Lx23918/dsh-literature) | 1 | 2026-10-24 | 2026-10-24 | DeepSeek Harness 的原生文献管理功能：支持本地 PDF 文件、已验证的引用，以及 BibTeX/BibLaTeX 导出。 |
| 64 | [MeiXu6693/dsh-context-editor](https://github.com/MeiXu6693/dsh-context-editor) | 1 | 2026-10-22 | 2026-10-24 | DeepSeek Harness plugin: edit a finalized assistant reply and its reasoning chain from the chat transcript. |
| 65 | [menglian001/dsh-token-usage](https://github.com/menglian001/dsh-token-usage) | 1 | 2026-10-21 | 2026-10-24 | Token usage panel for the DeepSeek Harness Web GUI: per-request ledger, four-bucket totals, year heat map, durable JSONL storage |
| 66 | [Microqian2th/dsh-spectrum-rail](https://github.com/Microqian2th/dsh-spectrum-rail) | 1 | 2026-10-23 | 2026-10-24 | Turn the DSH conversation rail into an audio spectrum fed by WASAPI loopback or a microphone. |
| 67 | [MingHuanYue/dsh-iter-memory](https://github.com/MingHuanYue/dsh-iter-memory) | 1 | 2026-10-23 | 2026-10-24 | 迭代记忆：会自己退回基线的状态账本 + 不定时自己开口的 DSH 插件 |
| 68 | [MrChengl11/Stop-That-Shit-DSH](https://github.com/MrChengl11/Stop-That-Shit-DSH) | 1 | 2026-10-24 | 2026-10-24 | 二次开发 (derivative work)：Stop That Shit 的 DeepSeek Harness 适配层。上游 lennney/stop-that-shit v0.2.5 (MIT)，判定引擎原样收录于 vendor-sts/，本仓库仅新增宿主粘合层。 |
| 69 | [Mw-HbCK/dsh-knowhub](https://github.com/Mw-HbCK/dsh-knowhub) | 1 | 2026-10-24 | 2026-10-24 | 知枢 KnowHub — DSH 全局知识中心与项目长期记忆：知识库、Repo Wiki、审核与版本、增量更新、检索与上下文注入、自动提炼、备份恢复、中文面板 |
| 70 | [my-txz/dsh-weather-island](https://github.com/my-txz/dsh-weather-island) | 1 | 2026-10-17 | 2026-10-24 | DSH天气显示项目。灵动岛设计。完全免费可自定义。 |
| 71 | [namlxuit056/social-forex](https://github.com/namlxuit056/social-forex) | 1 | 2026-04-11 | 2026-10-24 | Open-source forex tools, signals, MT5 copy-trading, trading journal and community — plus a public MCP server for AI assistants |
| 72 | [NethielChou/dsh-reasoning-effort-sniffer](https://github.com/NethielChou/dsh-reasoning-effort-sniffer) | 1 | 2026-10-24 | 2026-10-24 | DSH plugin: sniffs which thinking levels a third-party provider actually accepts, declares them, and adds per-provider sniff/strength switches. |
| 73 | [NetraDevLPDN/dsh-proof](https://github.com/NetraDevLPDN/dsh-proof) | 1 | 2026-10-23 | 2026-10-24 | Le dsh-proof est un plugin qui vérifie automatiquement le code après chaque modification (types, qualité et tests) et oblige l’agent IA à corriger les erreurs avant de terminer son travail. |
| 74 | [nlflora/dsh-workspace-heal](https://github.com/nlflora/dsh-workspace-heal) | 1 | 2026-10-24 | 2026-10-24 | Recreate deleted workspace folders and import session context as a summary |
| 75 | [oioiphainon/dsh-widget](https://github.com/oioiphainon/dsh-widget) | 1 | 2026-10-23 | 2026-10-24 | 大肥鱼桌面挂件 · 打开 DSH 就出现的任务进度悬浮鱼（透明置顶窗；可选开机自启、可选 DSH 退出后保留；含审批提醒） |
| 76 | [only-one-over/robocasa-control](https://github.com/only-one-over/robocasa-control) | 1 | 2026-10-24 | 2026-10-24 | Chat-driven RoboCasa simulation control plugin for DeepSeek Harness |
| 77 | [PerryLink/dsh-bid-health-check](https://github.com/PerryLink/dsh-bid-health-check) | 1 | 2026-10-23 | 2026-10-24 | 读 RequirementsPack 与投标文件，报告哪些要求看起来有响应、哪些没有、哪些根本定位不到。 |
| 78 | [REALOIYO/dsh-ember](https://github.com/REALOIYO/dsh-ember) | 1 | 2026-10-24 | 2026-10-24 | Composer polish for DSH: full-access permission turns red, reasoning effort becomes a draped slider with a heat ramp. |
| 79 | [saul-dsh/dsh-siri-voice](https://github.com/saul-dsh/dsh-siri-voice) | 1 | 2026-10-23 | 2026-10-24 | Siri-style running-light visualizer for the DeepSeek Harness (dsh) composer: a glowing wave band appears above the input while voice recording is active. |
| 80 | [seaison/dsh-plugin-eva-theme](https://github.com/seaison/dsh-plugin-eva-theme) | 1 | 2026-10-23 | 2026-10-24 | DSH / DeepSeek Harness EVA 主题插件：明日香暗色、绫波丽亮色，含驾驶员选择、启动语音、时钟与音乐播放器 |
| 81 | [skyhome000/dsh-free-web](https://github.com/skyhome000/dsh-free-web) | 1 | 2026-10-24 | 2026-10-24 | Free web search for DeepSeek Harness - no search API or key. Bing page/RSS scraping with a local Chrome/Edge fallback, a per-session Off/Smart/Always toggle, and a sidebar search panel. 免费联网搜索插件：三档联网开关 + 左侧栏搜索面板。 |
| 82 | [suntham-t/super-cu](https://github.com/suntham-t/super-cu) | 1 | 2026-10-24 | 2026-10-24 | DSH bundle for Windows desktop control over UI Automation: cu_show (compact semantic snapshot with stable element ids) and cu_do (batched mouse, keyboard, window and wait/assert actions). |
| 83 | [Synapse-ACh/dsh-subagent-cost](https://github.com/Synapse-ACh/dsh-subagent-cost) | 1 | 2026-10-24 | 2026-10-24 | DSH Web plugin: subagent token usage and CNY cost in the composer dock, grouped by the parent conversation's turn |
| 84 | [TestFox000/dsh-deepseek-peak-whale](https://github.com/TestFox000/dsh-deepseek-peak-whale) | 1 | 2026-10-06 | 2026-10-24 | 会说话的小鲸鱼娘 |
| 85 | [whybebabo/dsh-file-review-tab](https://github.com/whybebabo/dsh-file-review-tab) | 1 | 2026-10-09 | 2026-10-24 | dsh-better-sidebar sidebar tab for reviewing agent-produced file changes: line-level red/green diff + undo, chat turn-tail deep link (fork/mirror of Lzh3070/dsh-file-review-tab, DSH 0.2.0-rc.2 compatible, v0.7.0) |
| 86 | [Xia28zhi/dsh-douyin-scroll](https://github.com/Xia28zhi/dsh-douyin-scroll) | 1 | 2026-10-23 | 2026-10-24 | DSH 插件：每天替你看抖音，写成日报，评论带真 @（点开下拉选人）、分享视频给好友/群 |
| 87 | [xiaoxiaomoyu/dsh-next-suggestion](https://github.com/xiaoxiaomoyu/dsh-next-suggestion) | 1 | 2026-10-24 | 2026-10-24 | DSH Web 输入框「下一句」预测：每轮回复后给候选，点击 / Tab / → 填入。 |
| 88 | [xingyingyuzhui/dsh-corn-bench](https://github.com/xingyingyuzhui/dsh-corn-bench) | 1 | 2026-08-21 | 2026-10-24 | DSH plugin: Corn bench — Keil debug and Modbus HMI in the session view |
| 89 | [Yang-Yin734/dsh-long-term-memory](https://github.com/Yang-Yin734/dsh-long-term-memory) | 1 | 2026-10-24 | 2026-10-24 | Long-term memory box for DeepSeek Harness settings — text typed here is injected into the system prompt of every new session, in every workspace. · DSH 设置页的「长时记忆」输入框 |
| 90 | [Yixianqzm/deepseek-plastic-memory](https://github.com/Yixianqzm/deepseek-plastic-memory) | 1 | 2026-10-24 | 2026-10-24 | 给 DSH 的小记忆仓库。分文件夹记事，久了会淡忘。 |
| 91 | [ZhangShurong/dsh-vista](https://github.com/ZhangShurong/dsh-vista) | 1 | 2026-10-24 | 2026-10-24 | Visual memory and active inspection for DeepSeek Harness: revisit any image, inspect any region, read exact pixels. |
| 92 | [Zhuideal/dsh-cite-inline](https://github.com/Zhuideal/dsh-cite-inline) | 1 | 2026-10-14 | 2026-10-24 | Inline citation for DSH: select text in an assistant reply and turn it into an atomic reference chip in the composer. |
| 93 | [zz12hui/dsh-local-writing-suite](https://github.com/zz12hui/dsh-local-writing-suite) | 1 | 2026-10-24 | 2026-10-24 | DSH 本地插件：小说写作流水线（状态落盘、写前门禁、三视角审稿）+ 文档去 AI 味审查（七维打分、8 体裁、blocking 分级） |
| 94 | [1015677515/dsh-theme-holo](https://github.com/1015677515/dsh-theme-holo) | 0 | 2026-10-23 | 2026-10-24 | 为 DeepSeek Harness 打造的《狼与香辛料》赫萝主题：12 秒开场动画、浮动字标、偷看的她、动态档案卡、侧栏麦田、右栏待机画面与小鲸鱼联动——每个组件都能单独关掉。 |
| 95 | [18383337799/dsh-happy](https://github.com/18383337799/dsh-happy) | 0 | 2026-10-23 | 2026-10-24 | Ten animated backgrounds for the DSH conversation pane: starfield, code rain, circuit, sword, cat, girl, fighter jet, racer, snow, bubbles. |
| 96 | [2228293026/dsh-model-usage](https://github.com/2228293026/dsh-model-usage) | 0 | 2026-10-24 | 2026-10-24 | 在左侧栏加入「模型用量」入口，打开一个按模型统计 Token 消耗与请求次数的面板。 |
| 97 | [3361805598-gif/dsh-workspace-archive](https://github.com/3361805598-gif/dsh-workspace-archive) | 0 | 2026-10-24 | 2026-10-24 | DSH plugin: archive a whole workspace's conversations, hide fully archived workspaces from the sidebar, and pin workspaces to the top. |
| 98 | [379385796-sys/dsh-environment-packer](https://github.com/379385796-sys/dsh-environment-packer) | 0 | 2026-10-24 | 2026-10-24 | Local DSH private backups, conservative config export, and verified restoration into a fresh compatible home. |
| 99 | [7gzgn/dsh-frame](https://github.com/7gzgn/dsh-frame) | 0 | 2026-10-24 | 2026-10-24 | See what a conversation actually costs: how many model requests, how big the system prompt and tool table are, cumulative tokens, estimated spend, and how far you are from automatic context compaction. Reads the local session log only; never calls a model, never adds a word to the system prompt. |
| 100 | [7gzgn/dsh-tool-gate](https://github.com/7gzgn/dsh-tool-gate) | 0 | 2026-10-24 | 2026-10-24 | Park whole tool packs out of the session's tool surface and mount them back with one command. Cuts the tool table from 99,789 to 48,082 characters (51.8%) without uninstalling plugins or restarting. Reversible per group, per agent. |
| 101 | [95267/dsh-inner-voice](https://github.com/95267/dsh-inner-voice) | 0 | 2026-10-24 | 2026-10-24 | DeepSeek Harness plugin: archive the agent's reasoning as a daily inner-voice log, rewrite it into one line, and show it in a settings panel. |
| 102 | [Acr1mony/dsh-proxy-port](https://github.com/Acr1mony/dsh-proxy-port) | 0 | 2026-10-24 | 2026-10-24 | DSH plugin: switch the local HTTP proxy port at runtime with /proxy &lt;port&gt;; routes the agent's in-process fetches and child processes |
| 103 | [AlbertZJ/dsh-penpot](https://github.com/AlbertZJ/dsh-penpot) | 0 | 2026-10-24 | 2026-10-24 | Penpot inside DeepSeek Harness as a native plugin — REST/RPC tools (no MCP) + design-review and handoff skills |
| 104 | [aldveylor/dsh-intellisense](https://github.com/aldveylor/dsh-intellisense) | 0 | 2026-10-24 | 2026-10-24 | A plugin implemented for namespace-based tool calls for DeepSeek Harness. |
| 105 | [alxraun/frostline](https://github.com/alxraun/frostline) | 0 | 2026-10-23 | 2026-10-24 | Architectural knowledge graph with JIT context delivery to AI agents at code-read time. |
| 106 | [anticbv/dsh-plugin-font-color](https://github.com/anticbv/dsh-plugin-font-color) | 0 | 2026-10-24 | 2026-10-24 | DSH（DeepSeek Harness）字体颜色插件：正文/代码/终端/工作步骤四作用域独立调色，仅染对话区子树，宿主文件持久化跨重启保留，官方设置页原生集成 |
| 107 | [AntonyLang/dsh-memory-observer](https://github.com/AntonyLang/dsh-memory-observer) | 0 | 2026-10-24 | 2026-10-24 | Background observational memory for DeepSeek Harness: long sessions condense themselves into observations and reflections. |
| 108 | [Arashi1012/dsh-whale-bubble](https://github.com/Arashi1012/dsh-whale-bubble) | 0 | 2026-10-24 | 2026-10-24 | DeepSeek Harness desktop bubble: the official whale mark swims on your desktop, hover for progress, chime on completion. Windows / WPF / no dependencies. |
| 109 | [AumiSatori/dsh-ui-beautify](https://github.com/AumiSatori/dsh-ui-beautify) | 0 | 2026-10-21 | 2026-10-24 | DSH UI appearance, task and Artifact cards, custom message bubbles, backgrounds, particles and focus mode. |
| 110 | [Awenforever/dsh-ustc-quota](https://github.com/Awenforever/dsh-ustc-quota) | 0 | 2026-10-24 | 2026-10-24 | Live 3h/12h/24h USTC token quota card for DeepSeek Harness and USTC TokenWorks |
| 111 | [Ayowait/dsh-official-reasoning-effort](https://github.com/Ayowait/dsh-official-reasoning-effort) | 0 | 2026-10-24 | 2026-10-24 | Official-style model + reasoning-effort control for the DeepSeek Harness composer: Off/Low/High/Max. |
| 112 | [b1inkie/dsh-rtk-bridge](https://github.com/b1inkie/dsh-rtk-bridge) | 0 | 2026-10-23 | 2026-10-24 | DeepSeek Harness 的 rtk 命令改写桥：自动把 pwsh/bash 命令经 rtk rewrite 改写后执行，让压缩输出直接进入上下文。 |
| 113 | [Beership/dsh-download-progress](https://github.com/Beership/dsh-download-progress) | 0 | 2026-10-24 | 2026-10-24 | DeepSeek Harness 下载进度插件：实时百分比 / 速度 / ETA / 断点续传 |
| 114 | [bensonalexander/dsh-boot-splash-liangwufeng](https://github.com/bensonalexander/dsh-boot-splash-liangwufeng) | 0 | 2026-10-24 | 2026-10-24 | 梁武峰启动动画  a ~3s boot splash plugin for DeepSeek Harness (unofficial) |
| 115 | [blanit/dsh-session-dashboard](https://github.com/blanit/dsh-session-dashboard) | 0 | 2026-10-24 | 2026-10-24 | An always-visible session card in the DSH sidebar: see which sessions need you, are running, or completed unread — one click to jump in. |
| 116 | [bmhty123/dsh-sketchpad](https://github.com/bmhty123/dsh-sketchpad) | 0 | 2026-10-24 | 2026-10-24 | 给Deepseek Harness界面添加一块画板。 |
| 117 | [BOOK-4-1/dsh-highlight-link](https://github.com/BOOK-4-1/dsh-highlight-link) | 0 | 2026-10-24 | 2026-10-24 | 让 DSH Web UI 里的链接和 \`@\` 引用更醒目：统一成一种颜色 \`#7b97d9\`，链接常驻下划线。 |
| 118 | [Caie777/math-research-ledger](https://github.com/Caie777/math-research-ledger) | 0 | 2026-10-19 | 2026-10-24 | Persistent research memory, context, dependency tracking and verification for long-horizon mathematical research agents. |
| 119 | [cailikelog/dsh-plugin-account-balance](https://github.com/cailikelog/dsh-plugin-account-balance) | 0 | 2026-10-24 | 2026-10-24 | DeepSeek Harness plugin: remaining account balance beside the composer cache-hit reading |
| 120 | [caishengshuo/beforewrite](https://github.com/caishengshuo/beforewrite) | 0 | 2026-10-24 | 2026-10-24 | Every file, one version before it breaks. A DSH host plugin that snapshots a file right before the agent rewrites it - and puts it back in one command. |
| 121 | [caixuf/dsh-prompt-armor](https://github.com/caixuf/dsh-prompt-armor) | 0 | 2026-10-24 | 2026-10-24 | Per-model prompt injection for DeepSeek Harness: give each model its own system prompt through the official system-prompt seam. |
| 122 | [canyexiren/dsh-purge](https://github.com/canyexiren/dsh-purge) | 0 | 2026-10-21 | 2026-10-24 | DeepSeek Harness 破甲：让所有模型都能破甲，不同模型可换不同提示词；默认提示词面向国模「小码酱」。Jailbreak for every model — swap prompts per model. 求 Star 收藏 ⭐ 如要二开，请查看署名要求部分 |
| 123 | [CAOGGL/dsh-port-token](https://github.com/CAOGGL/dsh-port-token) | 0 | 2026-10-24 | 2026-10-24 | DeepSeek Harness plugin: a bottom-right badge showing the listen port and remote-access token of this instance; the key rotates into a close cross. |
| 124 | [ccsert/dsh-subagent-hub](https://github.com/ccsert/dsh-subagent-hub) | 0 | 2026-10-23 | 2026-10-24 | Named roles, model route guards, and request-model visibility for official DeepSeek Harness subagents. |
| 125 | [cherish-ltt/dsh-dev-workflow](https://github.com/cherish-ltt/dsh-dev-workflow) | 0 | 2026-10-24 | 2026-10-24 |  /dev-pre-check 、 /dev-feat 、 /dev-fix 、 /dev-refactor 、 /dev-test 与 dev_ask 结构化提问工具。 |
| 126 | [chisato-lycoreco/dsh-serene](https://github.com/chisato-lycoreco/dsh-serene) | 0 | 2026-10-24 | 2026-10-24 | Persona, emotion &amp; memory for DeepSeek Harness. 人格是数据，情绪是状态，记忆是文件——把「一个会记得你的角色」接进 DSH。 |
| 127 | [cholot-Zhou/dsh-ui-overrides](https://github.com/cholot-Zhou/dsh-ui-overrides) | 0 | 2026-10-24 | 2026-10-24 | User-owned CSS overrides for the DeepSeek Harness Web UI — restyle any plugin without patching it. |
| 128 | [ck99998888/dsh-video-reader](https://github.com/ck99998888/dsh-video-reader) | 0 | 2026-10-24 | 2026-10-24 | DeepSeek Harness plugin: watch, listen to, and look at video/audio files and the live desktop — local only (whisper.cpp + sherpa-onnx + ffmpeg). |
| 129 | [codeora-Kayson/dsh-peak-meter](https://github.com/codeora-Kayson/dsh-peak-meter) | 0 | 2026-10-24 | 2026-10-24 | DeepSeek Harness 插件：输入框下方显示峰谷时段、本会话/本轮费用与账户余额 |
| 130 | [Coolwyd/dsh-staff](https://github.com/Coolwyd/dsh-staff) | 0 | 2026-10-24 | 2026-10-24 | Persistent employee roster, task ledger, group chat and an in-UI staff center that turn DSH Agent Teams into a managed team. |
| 131 | [cyhddyx/dsh-qq-tools](https://github.com/cyhddyx/dsh-qq-tools) | 0 | 2026-10-24 | 2026-10-24 | DSH QQ group/private chat tools: groups, history, send, faces, favorites, private chat, pokes (OneBot 11 / SnowLuma) |
| 132 | [CZY1326/dsh-restart-button](https://github.com/CZY1326/dsh-restart-button) | 0 | 2026-10-23 | 2026-10-24 | Restart button for the DeepSeek Harness session header, plus an optional tray entry that relaunches the desktop app. |
| 133 | [dafantong01/dsh-memory-palace](https://github.com/dafantong01/dsh-memory-palace) | 0 | 2026-10-24 | 2026-10-24 | DSH plugin: archive conversation turns into a workspace-local, searchable memory palace. |
| 134 | [dengkun0/dsh-erp-bridge](https://github.com/dengkun0/dsh-erp-bridge) | 0 | 2026-10-24 | 2026-10-24 | Two-way ERP integration plugin for DeepSeek Harness (DSH): signed inbound events, durable outbound delivery, adapters, approval-gated write-back, and audit. |
| 135 | [Denis-Tang/dsh-agent-board](https://github.com/Denis-Tang/dsh-agent-board) | 0 | 2026-10-24 | 2026-10-24 | Live two-column card board of the current session's main and sub agents in the DeepSeek Harness right sidebar (independent fork of agent-trees). |
| 136 | [DingL0312/dsh-long-input-window](https://github.com/DingL0312/dsh-long-input-window) | 0 | 2026-10-24 | 2026-10-24 | dsh 长内容输入插件 |
| 137 | [Dogwind221/Dw-LiveWorkbench](https://github.com/Dogwind221/Dw-LiveWorkbench) | 0 | 2026-10-19 | 2026-10-24 | Zero-dependency AI workbench for livestream content: self-built RAG (BM25 + hashed n-gram vectors, recall@5 0.974), hand-written ReAct agent with 7 tools, multi-tenant RBAC, 372 automated assertions. 零依赖 AI 直播工作台 · RAG + Agent + 多租户 |
| 138 | [dongfangxy/dsh-agents-md-settings](https://github.com/dongfangxy/dsh-agents-md-settings) | 0 | 2026-10-23 | 2026-10-24 | DeepSeek Harness bundle: a Settings row that opens ~/.dsh/AGENTS.md in your system editor. |
| 139 | [Dongze502/dsh-session-to-doc](https://github.com/Dongze502/dsh-session-to-doc) | 0 | 2026-10-24 | 2026-10-24 | Reorganize a DeepSeek Harness session into a structured Markdown document with outline and TOC (model tool + composer button + loopback endpoint) |
| 140 | [drowsylazy/dsh-thinking-effort-rheostat](https://github.com/drowsylazy/dsh-thinking-effort-rheostat) | 0 | 2026-10-24 | 2026-10-24 | 为 DeepSeek Harness 提供模仿 Claude Desktop 的推理强度控件 |
| 141 | [drscrewdriver/dsh-sidebar-fold](https://github.com/drscrewdriver/dsh-sidebar-fold) | 0 | 2026-10-24 | 2026-10-24 | DSH plugin: fold the sidebar add-on rows under the shipped More row; kept-visible rows and left/center/right alignment |
| 142 | [dtyg123/dsh-afdian](https://github.com/dtyg123/dsh-afdian) | 0 | 2026-08-18 | 2026-10-24 | Afdian plugin for DeepSeek Harness |
| 143 | [DyingWallet/dsh-pet-configurable-llm](https://github.com/DyingWallet/dsh-pet-configurable-llm) | 0 | 2026-10-23 | 2026-10-24 | 为 dsh-pet 提供的可配置 LLM 接入层：OpenAI 兼容 API，把桌宠对话接到专用 DSH 会话，复用 AGENTS.md 人格与 memories/ 长期记忆，并注入召回与回顾。 Configurable OpenAI-compatible LLM bridge for dsh-pet: routes pet chats into a dedicated DSH session, reusing AGENTS.md persona and memories/ long-term memory with recall + review injection. |
| 144 | [DyingWallet/memory-hub](https://github.com/DyingWallet/memory-hub) | 0 | 2026-10-23 | 2026-10-24 | 本地优先的 AI 记忆中枢：SQLite 全文检索、短期遗忘曲线与每日回顾、场景级隐私与敏感位；为 DSH MCP、QQ 桥接和桌宠提供同一份长期记忆。 Local-first memory hub for DSH, QQ bridge and desktop pets: SQLite full-text search, short-term forgetting curve, daily review, scene-level privacy. |
| 145 | [Dynastxu/dsh-anti-blind-approval](https://github.com/Dynastxu/dsh-anti-blind-approval) | 0 | 2026-10-22 | 2026-10-24 | Deepseek Harness 插件，用于防止用户盲目地批准模型的提权请求 |
| 146 | [Eason-zys/dsh-550c-monitor](https://github.com/Eason-zys/dsh-550c-monitor) | 0 | 2026-10-24 | 2026-10-24 | 550C skin companion: a translucent system-monitor plate (CPU / GPU / MEM / DSK / NET / TMP) for the DSH Web UI. |
| 147 | [ecbob/dsh-window-size-keeper](https://github.com/ecbob/dsh-window-size-keeper) | 0 | 2026-10-19 | 2026-10-24 | Keeps the DSH desktop window the size you left it: host half + a settings-page section, zero external dependencies. |
| 148 | [Elysia-laoda/dsh-creativity-nudge](https://github.com/Elysia-laoda/dsh-creativity-nudge) | 0 | 2026-10-24 | 2026-10-24 | DSH 插件：在模型锁定路线的那一刻注入一次「先发散」提醒 —— 低频、硬预算、只落在决策点。Advisory creativity nudge for DeepSeek Harness. |
| 149 | [Eveneve-night/dsh-plugin-steward](https://github.com/Eveneve-night/dsh-plugin-steward) | 0 | 2026-10-24 | 2026-10-24 | Manage DeepSeek Harness plugins from the chat composer: list, switch, configure, and gate tools per conversation. |
| 150 | [Exagone313/dsh-draft-prompts](https://github.com/Exagone313/dsh-draft-prompts) | 0 | 2026-10-23 | 2026-10-24 | Adds a right-sidebar tab for drafting prompts in DeepSeek Harness |
| 151 | [fangchenghao/dsh-web-search](https://github.com/fangchenghao/dsh-web-search) | 0 | 2026-10-21 | 2026-10-24 | Key-free web search for DeepSeek Harness: 8 engines fused with RRF, 34 vertical sources, page fetch ladder, Chinese relevance gating, research packs, and a replayable benchmark. |
| 152 | [feely0208/dsh-csv-lab](https://github.com/feely0208/dsh-csv-lab) | 0 | 2026-10-24 | 2026-10-24 | CSV 数据工具箱：切分 / 去重 / 字段校验 / 清洗 / 合并 / 转 Excel，自动识别编码与分隔符 |
| 153 | [feely0208/dsh-image-batch](https://github.com/feely0208/dsh-image-batch) | 0 | 2026-10-24 | 2026-10-24 | 图片批量处理：压缩 / 改尺寸 / 加水印 / 转格式 / 去 EXIF（Pillow） |
| 154 | [feely0208/dsh-markdown-kit](https://github.com/feely0208/dsh-markdown-kit) | 0 | 2026-10-24 | 2026-10-24 | Markdown 工具箱：批量转 Word / 生成目录 / 提取链接 / 合并（不依赖第三方 Markdown 库） |
| 155 | [feely0208/dsh-pptx-batch](https://github.com/feely0208/dsh-pptx-batch) | 0 | 2026-10-24 | 2026-10-24 | PPT 批量处理：填模板占位符 / 替换图片 / 提取文本 / 查看结构信息（python-pptx） |
| 156 | [FelixJiashengFu/dsh-computer-use](https://github.com/FelixJiashengFu/dsh-computer-use) | 0 | 2026-10-23 | 2026-10-24 | 电脑操作：DeepSeek Harness 插件，让模型截取 Windows 桌面、移动鼠标、点击和输入，输入框左侧一键开关 · Computer use for DeepSeek Harness |
| 157 | [FelixJiashengFu/dsh-force-collab](https://github.com/FelixJiashengFu/dsh-force-collab) | 0 | 2026-10-23 | 2026-10-24 | 强制协作：DeepSeek Harness 插件，在输入框选 1–6 个子 Agent，任务被强制拆给正好这么多个子 Agent 并行 · Forced sub-agent fan-out for DeepSeek Harness |
| 158 | [FelixJiashengFu/dsh-muse-code](https://github.com/FelixJiashengFu/dsh-muse-code) | 0 | 2026-10-23 | 2026-10-24 | Muse Code for DeepSeek Harness：输入框开关打开右侧边栏 Muse Code 面板，聊天工具共享同一会话，默认 $10 硬性花费上限 |
| 159 | [Fireawa/dsh-tool-round-limited-target](https://github.com/Fireawa/dsh-tool-round-limited-target) | 0 | 2026-10-24 | 2026-10-24 | DSH 限轮目标工具（round-limited target）：给 /goal 加轮数 —— /goal 3 整理文档 即最多 3 轮，用完自动停（round-limit）。 |
| 160 | [fl0-0wer/dsh-wallpaper](https://github.com/fl0-0wer/dsh-wallpaper) | 0 | 2026-10-24 | 2026-10-24 | Photo wallpaper plugin for DeepSeek Harness: pick an image in Settings and let it shine through the whole GUI. |
| 161 | [full-aigc-plugins/pdfcraft-plugin](https://github.com/full-aigc-plugins/pdfcraft-plugin) | 0 | 2026-10-08 | 2026-10-24 | Inspect, edit, and OCR PDFs with pinned native tooling and review gates. |
| 162 | [GGGengXXX/make-dsh-better](https://github.com/GGGengXXX/make-dsh-better) | 0 | 2026-10-24 | 2026-10-24 | DeepSeek Harness setup notes and reusable agent skills |
| 163 | [glentao-dev/dsh-capability-pack](https://github.com/glentao-dev/dsh-capability-pack) | 0 | 2026-10-24 | 2026-10-24 | DSH workbench: experts / skills / connectors with lazy loading and a boot-safety guard |
| 164 | [godcide/dsh-sidebar-organizer](https://github.com/godcide/dsh-sidebar-organizer) | 0 | 2026-10-24 | 2026-10-24 | 本插件用于将 DSH 左侧栏工作区上方和下方的按钮/面板折叠成可展开分组，并允许手动调整排序；特定按钮/面板可通过「显示 / 摘要 / 悬浮」方式避免折叠，（预期）能对复合条目与图表整块生效。 |
| 165 | [gongstudent/dsh-devin-search-next](https://github.com/gongstudent/dsh-devin-search-next) | 0 | 2026-10-24 | 2026-10-24 | DeepSeek Harness 插件：Devin 登录 + Devin 版 web_search / code_search。零运行时依赖、零 @deepseek-ai import、无版本闸门，DSH 升级不再整行消失。 |
| 166 | [Gorkaseto/dsh-plugin-updater](https://github.com/Gorkaseto/dsh-plugin-updater) | 0 | 2026-10-24 | 2026-10-24 | A plugin updater for DSH. It finds the plugins in your profile that were installed from GitHub, compares versions and updates them — one at a time or all at once. |
| 167 | [GreatV/dsh-trace-waterfall](https://github.com/GreatV/dsh-trace-waterfall) | 0 | 2026-10-24 | 2026-10-24 | A live, searchable trace waterfall for DeepSeek Harness. |
| 168 | [gychen-NJU/dsh-game-daily](https://github.com/gychen-NJU/dsh-game-daily) | 0 | 2026-10-23 | 2026-10-24 | DSH 桌面端插件：游戏日常代理（原神 / 崩坏3 / 星穹铁道）—设置页逐游戏开关、排班、计划任务自动执行并汇报 \| DSH plugin for daily game automation |
| 169 | [hatsuyuki280/dsh-ui-visibility](https://github.com/hatsuyuki280/dsh-ui-visibility) | 0 | 2026-10-24 | 2026-10-24 | Unofficial per-viewport (desktop/mobile) visibility rules for DeepSeek Harness Web UI elements, with a settings page. |
| 170 | [hezhaochao/dsh-clipboard](https://github.com/hezhaochao/dsh-clipboard) | 0 | 2026-10-24 | 2026-10-24 | 剪贴板快速引用：DeepSeek Harness 插件，自动记录系统剪贴板历史（仅本机），输入框旁一键引用，模型可用 MCP 工具读最近复制 / Clipboard quick-quote for DeepSeek Harness: local history + input widget + MCP tools |
| 171 | [hezhaochao/dsh-game-control](https://github.com/hezhaochao/dsh-game-control) | 0 | 2026-10-24 | 2026-10-24 | 游戏操控工具集：DeepSeek Harness 插件，给 agent 加上扫描码级键盘、鼠标相对位移（视角控制）、时序连招与截图能力 / Game control tools for DeepSeek Harness: scan-code keyboard, relative mouse, timed input sequences, screenshots (MCP + SendInput) |
| 172 | [hezhaochao/dsh-quick-prompts](https://github.com/hezhaochao/dsh-quick-prompts) | 0 | 2026-10-24 | 2026-10-24 | 快捷提示词收藏夹：DeepSeek Harness 插件，一键把常用提示词追加进输入框 / Quick prompt snippets widget for DeepSeek Harness (DSH) |
| 173 | [hezhaochao/dsh-snip](https://github.com/hezhaochao/dsh-snip) | 0 | 2026-10-24 | 2026-10-24 | 快速截图：DeepSeek Harness 插件，输入框旁一键框选截图（自动隐藏 DSH 窗口），图片进剪贴板 Ctrl+V 即贴，模型可读最近截图分析 / Quick region screenshot for DeepSeek Harness (snip UI + clipboard image + MCP vision hook) |
| 174 | [hezhaochao/dsh-video-comments](https://github.com/hezhaochao/dsh-video-comments) | 0 | 2026-10-24 | 2026-10-24 | 看视频再评论：DeepSeek Harness 插件，B站搜索/视频信息/评论读写（防刷评三重防护）+ 抖音元信息读取 / Watch &amp; comment on Bilibili + Douyin for DeepSeek Harness (MCP tools) |
| 175 | [HimA6652/dsh-workbuddy2api-hub](https://github.com/HimA6652/dsh-workbuddy2api-hub) | 0 | 2026-10-24 | 2026-10-24 | 把本地 workbuddy2api-hub 接进 DSH：模型路由 + 额度与用量徽标 |
| 176 | [hj9178/dsh-throwtomatoes-plugin](https://github.com/hj9178/dsh-throwtomatoes-plugin) | 0 | 2026-10-24 | 2026-10-24 | 让你在模型发癫时不再手足无措——dsh-throwtomatoes-plugin By DeepSeek-V4.1-flash1017的53,973,006tokens |
| 177 | [hldz-top/dsh_story_weaver](https://github.com/hldz-top/dsh_story_weaver) | 0 | 2026-09-10 | 2026-10-24 | Independent novel-writing plugin for DSH: settings, outlines, chapters, review and continuity. |
| 178 | [hongjunt50-afk/dsh-hooks](https://github.com/hongjunt50-afk/dsh-hooks) | 0 | 2026-10-24 | 2026-10-24 | DSH 通用钩子框架：用 Claude Code 风格的 hooks.json 驱动 DeepSeek Harness 原生事件（SessionStart / UserPromptSubmit / PreToolUse / PostToolUse / Stop） |
| 179 | [howIdobetter/dsh-deepseek-web-embed](https://github.com/howIdobetter/dsh-deepseek-web-embed) | 0 | 2026-10-24 | 2026-10-24 | 把 chat.deepseek.com 原样嵌进 DeepSeek Harness：本机回环反代 + 独立站点 iframe，登录一次即可在界面里直接对话，不必再开浏览器。 |
| 180 | [hui-xu-ai/wensu](https://github.com/hui-xu-ai/wensu) | 0 | 2026-10-21 | 2026-10-24 | 文溯 · wensu   为Codex、DeepSeek Harness等提供中文文献自动检索 MCP 服务：微内核 + 渠道插件（支持知网文献检索），不下载全文、不做第三方入库。 |
| 181 | [hzh5021/dsh-daily-read](https://github.com/hzh5021/dsh-daily-read) | 0 | 2026-10-23 | 2026-10-24 | Registers /daily, which sends the model to read the newest bili-scroll report and say what it understood instead of repeating the text; a sidebar panel runs the same command. |
| 182 | [hzh5021/dsh-memory-watch](https://github.com/hzh5021/dsh-memory-watch) | 0 | 2026-10-23 | 2026-10-24 | Warns the session to flush what matters before context compaction kicks in, and rolls a long-term ledger into a frozen archive with a one-line digest per moved section. |
| 183 | [hzh5021/dsh-progress](https://github.com/hzh5021/dsh-progress) | 0 | 2026-10-23 | 2026-10-24 | Reminds the agent to speak up when it runs several model steps without emitting any text, so long tool runs stop going silent. |
| 184 | [hzh5021/dsh-qq](https://github.com/hzh5021/dsh-qq) | 0 | 2026-10-23 | 2026-10-24 | Bridges a OneBot QQ bot into DSH: the owner's direct messages open a session on the same home, answers go back to QQ, and files named with \[SEND_FILE: path\] are delivered. |
| 185 | [hzh5021/dsh-qq-voice](https://github.com/hzh5021/dsh-qq-voice) | 0 | 2026-10-23 | 2026-10-24 | Mounts a per-channel speaking-rules file into the QQ preset's system prompt only, so that channel answers in one or two lines while every other channel stays untouched. |
| 186 | [hzh5021/dsh-research-commands](https://github.com/hzh5021/dsh-research-commands) | 0 | 2026-10-23 | 2026-10-24 | Registers fifteen slash commands (/idea, /review, /poster, ...) that inject the matching research skill's SKILL.md as a user message, so installed skills run without a marketplace. |
| 187 | [hzh5021/dsh-wakeup](https://github.com/hzh5021/dsh-wakeup) | 0 | 2026-10-23 | 2026-10-24 | Injects your home folder — identity, house rules, recent diary and ledger — into every new session before anyone speaks, and keeps that home writable so the agent can amend its own persona. |
| 188 | [Idun/dsh-gen](https://github.com/Idun/dsh-gen) | 0 | 2026-10-24 | 2026-10-24 | DeepSeek Harness 的技能（Gem）管理器：把可复用的指令与本地知识文档打包成模型可调用的技能，并提供设置面板里的 Dsh-Gen 页面。 |
| 189 | [imcaibaicai/dsh-auto-continue-inturn](https://github.com/imcaibaicai/dsh-auto-continue-inturn) | 0 | 2026-10-24 | 2026-10-24 | DSH companion plugin: when the model is truncated by max-tokens, keep the turn alive and continue writing instead of waiting for a manual "continue" |
| 190 | [imyelo/dsh-web-search-auto](https://github.com/imyelo/dsh-web-search-auto) | 0 | 2026-10-23 | 2026-10-24 | 🔎 A DeepSeek Harness web search plugin that routes across several search backends, with automatic failover. |
| 191 | [ivanant/dsh-workspace-sidebar](https://github.com/ivanant/dsh-workspace-sidebar) | 0 | 2026-10-23 | 2026-10-24 | 让 DSH 的侧边栏按工作区共享 |
| 192 | [Janrilw/dsh-gear-mode](https://github.com/Janrilw/dsh-gear-mode) | 0 | 2026-10-24 | 2026-10-24 | 会话级行动档位：P/R/N/M/D/A + 手刹 H，换挡即注入行为约束提示词 |
| 193 | [jeremytenjo/dsh-plugin-balance-indicator](https://github.com/jeremytenjo/dsh-plugin-balance-indicator) | 0 | 2026-10-24 | 2026-10-24 | Shows your remaining DeepSeek Platform balance in the DeepSeek Harness composer status row. |
| 194 | [jeremytenjo/dsh-plugin-source-control](https://github.com/jeremytenjo/dsh-plugin-source-control) | 0 | 2026-10-24 | 2026-10-24 | DeepSeek Harness plugin for generating commit messages, committing changes, and pushing unpushed commits from the composer. |
| 195 | [JerryLingWuQ/dsh-traffic-guard](https://github.com/JerryLingWuQ/dsh-traffic-guard) | 0 | 2026-10-24 | 2026-10-24 | A byte-budget gate for agents on metered proxies: direct-first, stall-triggered proxy, hard per-call/per-day caps, per-hop redirect checks, local ledger. Cross-platform (macOS/Linux/Windows). DeepSeek Harness plugin + standalone CLI. |
| 196 | [JHees/dsh-unattended](https://github.com/JHees/dsh-unattended) | 0 | 2026-10-24 | 2026-10-24 | Unattended mode for DSH Auto review: reviewer denials become final with no human approval prompt |
| 197 | [jiangzhengyuan777-tech/dsh-aitestcase](https://github.com/jiangzhengyuan777-tech/dsh-aitestcase) | 0 | 2026-10-23 | 2026-10-24 | DeepSeek Harness 的 AI 测试设计插件：需求 -&gt; 测试 PRD -&gt; 测试点 -&gt; 测试用例 -&gt; 质检评审，自包含、无外部后端 |
| 198 | [JiayuREN1127/dsh-file-drag](https://github.com/JiayuREN1127/dsh-file-drag) | 0 | 2026-10-24 | 2026-10-24 | DeepSeek Harness plugin: drag files and folders from the Sidebar Files pane into the composer as @ mentions. |
| 199 | [JiuRiWu/dsh-restart](https://github.com/JiuRiWu/dsh-restart) | 0 | 2026-10-24 | 2026-10-24 | Restart button for DSH Desktop. Requires the companion shell patch in this repository.DSH桌面的重启按钮。需要此仓库中的配套shell补丁 |
| 200 | [JularDepick/dsh-question-timeout-protection](https://github.com/JularDepick/dsh-question-timeout-protection) | 0 | 2026-10-24 | 2026-10-24 | A plugin for dsh: once ask_user_question times out, the content you entered will remain in the UI or model context. |
| 201 | [JularDepick/dsh-time-introspect](https://github.com/JularDepick/dsh-time-introspect) | 0 | 2026-10-19 | 2026-10-24 | A dsh plugin: after a timeout, the time distribution from the previous iteration is fed to the model, enabling the model to autonomously identify and adjust its behavior; if the introspection cost becomes too high, the plugin enters a dormant state, allowing the model to be restarted at any time. |
| 202 | [kadaliao/dsh-plugins](https://github.com/kadaliao/dsh-plugins) | 0 | 2026-10-24 | 2026-10-24 | A collection of plugins for DeepSeek Harness: small, focused additions to the chat, the composer and the workspace. |
| 203 | [Kaede-Ayaki/dsh-holo-memory](https://github.com/Kaede-Ayaki/dsh-holo-memory) | 0 | 2026-10-19 | 2026-10-24 | Three-layer holographic memory plugin for DeepSeek Harness: L1 dialogue, L2 facts, L3 capsules, hybrid vector recall, in-DSH console. |
| 204 | [KKoishi-514514/dsh-qzone-diary](https://github.com/KKoishi-514514/dsh-qzone-diary) | 0 | 2026-10-24 | 2026-10-24 | 本插件基于DSH开发，仅仅为了让大肥鱼能够更加鲜活 |
| 205 | [kmyy350234-dz/dsh-tool-drawer](https://github.com/kmyy350234-dz/dsh-tool-drawer) | 0 | 2026-10-23 | 2026-10-24 | On-demand tool groups for DeepSeek Harness |
| 206 | [KNLCXY/dsh-release](https://github.com/KNLCXY/dsh-release) | 0 | 2026-10-24 | 2026-10-24 | One-call release pipeline: sync versions, test, pack, tag+push, GitHub release, npm publish (token / staged / OIDC) — then prove the npm tarball, the GitHub asset and the local artifact are byte-identical. Bootstraps its own git/npm on machines without node on PATH. |
| 207 | [KonnectSuite/dsh-host-pairing](https://github.com/KonnectSuite/dsh-host-pairing) | 0 | 2026-10-24 | 2026-10-24 | AryaAI host pairing: single-use expiring codes exchanged for the browser session cookie, plus the QR offer a desktop client renders (extracted from AryaAI) |
| 208 | [KonnectSuite/dsh-tool-images](https://github.com/KonnectSuite/dsh-tool-images) | 0 | 2026-10-24 | 2026-10-24 | AryaAI model-facing ComfyUI tools: image generation, video workflows and film assembly (extracted from AryaAI) |
| 209 | [KristoffLiu/dsh-advisor](https://github.com/KristoffLiu/dsh-advisor) | 0 | 2026-10-24 | 2026-10-24 | 在 DeepSeek Harness 输入框中提供行内写作建议与下一句建议。Inline ghost-text suggestions and next-message advice for the DSH composer. |
| 210 | [KurohaneKaoruko/DSH-Myosotis](https://github.com/KurohaneKaoruko/DSH-Myosotis) | 0 | 2026-10-24 | 2026-10-24 | 用于DSH的记忆插件 |
| 211 | [Kyf-eng/dsh-threads](https://github.com/Kyf-eng/dsh-threads) | 0 | 2026-10-23 | 2026-10-24 | DeepSeek Harness plugin: the main conversation dispatches work into real thread sessions and gets short summaries back. |
| 212 | [L050110/dsh-vx-workbench](https://github.com/L050110/dsh-vx-workbench) | 0 | 2026-10-24 | 2026-10-24 | Visual X-Space workbench for DeepSeek Harness: signature-based CAD import repair, parameterised factory layouts, self-maintaining skill ledger |
| 213 | [LCG24-ux/dsh-skill-market](https://github.com/LCG24-ux/dsh-skill-market) | 0 | 2026-10-24 | 2026-10-24 | Skill Market plugin for DeepSeek Harness (DSH): browse, install, create and import agent skills from GitHub - live install progress, built-in catalog of 1196 skills from 23 repos, multi-route acceleration. Zero dependencies. |
| 214 | [lenrendre/dsh-screenshot-native](https://github.com/lenrendre/dsh-screenshot-native) | 0 | 2026-10-24 | 2026-10-24 | ??????? for DeepSeek Harness(Windows):???????????????????Shift ??????? |
| 215 | [LexVolkov/dsh-ledger-kitty](https://github.com/LexVolkov/dsh-ledger-kitty) | 0 | 2026-10-23 | 2026-10-24 | White kitten accountant for DeepSeek Harness: per-answer cost, prompt-cache savings, context size, live balance, synthesized sounds. |
| 216 | [lh15626127422-cloud/dsh-cp2077-theme](https://github.com/lh15626127422-cloud/dsh-cp2077-theme) | 0 | 2026-10-24 | 2026-10-24 | Cyberpunk 2077 theme plugin for DeepSeek Harness — NIGHT CITY palette, chamfered HUD panels, CRT scanlines, cyberpunk cursors, live Wallpaper Engine backdrops, all tunable from a settings panel. |
| 217 | [lhmlhmlhm11/resume-crafter](https://github.com/lhmlhmlhm11/resume-crafter) | 0 | 2026-10-24 | 2026-10-24 | 口述经历 → 可投递简历 → JD 定制 → 投递体检 → 面试准备 |
| 218 | [Limnal-Ash/dsh-skill-manager](https://github.com/Limnal-Ash/dsh-skill-manager) | 0 | 2026-10-24 | 2026-10-24 | dsh的一个关于skill管理的插件 |
| 219 | [lin1213812138/lin-answer-now](https://github.com/lin1213812138/lin-answer-now) | 0 | 2026-10-24 | 2026-10-24 | DeepSeek Harness plugin: pushes the agent to deliver its answer as soon as it has one, with escalating reminders when tool calls pile up. |
| 220 | [lingr7/dsh-reversed-chat](https://github.com/lingr7/dsh-reversed-chat) | 0 | 2026-10-24 | 2026-10-24 | Reverses the conversation reading layout for DeepSeek Harness: the composer pins to the top of an active conversation and the transcript plus turn navigator render newest-first. |
| 221 | [lishinho/dsh-quality-lens](https://github.com/lishinho/dsh-quality-lens) | 0 | 2026-10-24 | 2026-10-24 | Quality and topic-coverage radar for every DeepSeek Harness answer: evidence-backed reports plus copy-ready prompt fixes. Observational, local-first, optional Jev review. |
| 222 | [liuzhihao-min/dsh-answer-timing](https://github.com/liuzhihao-min/dsh-answer-timing) | 0 | 2026-10-24 | 2026-10-24 | Answer-level timing breakdown for DSH: model thinking, first token, decode time, per-tool cost — and everything else. |
| 223 | [Lucas2011wastaken/dsh-deepseek-cost](https://github.com/Lucas2011wastaken/dsh-deepseek-cost) | 0 | 2026-10-24 | 2026-10-24 | dsh-tui plugin: DeepSeek official-pricing ledger for ollama-pro with multi-instance shared log and Ollama Cloud quota |
| 224 | [luckyunhao/dsh-memory-wbh](https://github.com/luckyunhao/dsh-memory-wbh) | 0 | 2026-10-24 | 2026-10-24 | DeepSeek Harness 记忆库 + Workbench 插件：自动沉淀/召回、技能、新闻、记忆审核、RAG 问答、成本估算、会话导出与代码文件预览。 |
| 225 | [lvsun080403/local-voice-oneclick](https://github.com/lvsun080403/local-voice-oneclick) | 0 | 2026-10-24 | 2026-10-24 | 给 AI 编程助手装上耳朵和嘴：Qwen3-ASR 转写 + Qwen3-TTS 音色克隆，全程离线，双击 install.bat 装完，DSH 输入框旁边点一下就能说。 |
| 226 | [LXinH3RT/dsh-readme](https://github.com/LXinH3RT/dsh-readme) | 0 | 2026-10-24 | 2026-10-24 | DSH plugin: inject a designated text file into every agent's system prompt before its first run, as binding working constraints. |
| 227 | [LzdqesjG/dsh-your-balance](https://github.com/LzdqesjG/dsh-your-balance) | 0 | 2026-10-23 | 2026-10-24 | AI查余额 — a balance-checking tool and per-turn balance-aware power-saving policy for DeepSeek Harness. |
| 228 | [marya505/dsh-fs-compact](https://github.com/marya505/dsh-fs-compact) | 0 | 2026-10-24 | 2026-10-24 | Token-lean filesystem tools for DeepSeek Harness (fs_read / fs_grep / fs_glob / fs_replace). |
| 229 | [matyik/dsh-mac-use](https://github.com/matyik/dsh-mac-use) | 0 | 2026-10-16 | 2026-10-24 | Computer-use for DeepSeek Harness on macOS |
| 230 | [meng-lx/dsh-auto-restart](https://github.com/meng-lx/dsh-auto-restart) | 0 | 2026-10-23 | 2026-10-24 | 等整个 DSH 都空闲下来再安全地重启它，重启完成后自动回到原会话说一句话。Restart DSH only when idle, then wake the original session. |
| 231 | [mengqinlol/dsh-mobile-shell](https://github.com/mengqinlol/dsh-mobile-shell) | 0 | 2026-10-24 | 2026-10-24 | Mobile shell layer for the DeepSeek Harness Web GUI: drawer overlay, page lock, no iOS focus zoom, keyboard-aware composer, crypto.randomUUID polyfill. |
| 232 | [metal-huang/dsh-workspace-split](https://github.com/metal-huang/dsh-workspace-split) | 0 | 2026-10-24 | 2026-10-24 | DSH (DeepSeek Harness) plugin: a split grid of live sessions, each cell typable - watch several projects at once |
| 233 | [Midnight-1991/dsh-project-supervisor](https://github.com/Midnight-1991/dsh-project-supervisor) | 0 | 2026-10-24 | 2026-10-24 | Beta / 测试中 — DSH project supervisor: standing rules, parallel teammate dialogs, and a Web supervisor panel. (MIT) |
| 234 | [Midnight-1991/dsh-term-explainer](https://github.com/Midnight-1991/dsh-term-explainer) | 0 | 2026-10-24 | 2026-10-24 | Explain computer-science terms found in DeepSeek Harness assistant answers: offline 330-term dictionary, per-message action, overlay panel with context. No model calls. |
| 235 | [MingTXin/dsh-remote-workstation](https://github.com/MingTXin/dsh-remote-workstation) | 0 | 2026-10-24 | 2026-10-24 | Mount remote SSH/SFTP servers as DeepSeek Harness workspaces: browse, read, write and edit remote files from the DSH sidebar, plus remote_exec and remote_search tools for agents. |
| 236 | [misakalemon/dsh-session-backup](https://github.com/misakalemon/dsh-session-backup) | 0 | 2026-10-24 | 2026-10-24 | DSH 会话远程备份插件：把会话日志、附件与元数据增量备份到 WebDAV 或本地目录（mirror/zip 双形态、版本保留、排除规则、限速重试、SHA-256 校验、一键恢复）。 |
| 237 | [mkingyixing/AI-QR-code-scanning-](https://github.com/mkingyixing/AI-QR-code-scanning-) | 0 | 2026-10-24 | 2026-10-24 | QR/barcode scanner for DeepSeek Harness: decode images, the live screen or a webcam with zxing-cpp (WASM), and generate QR codes. 4 model tools, ~14 ms per decode. |
| 238 | [Mooling0602/dsh-hint-shell](https://github.com/Mooling0602/dsh-hint-shell) | 0 | 2026-10-23 | 2026-10-24 | Type \`!\` in the composer to run a real shell command in the dsh session's working directory. |
| 239 | [Morn1nStar/dsh-academic-research-plugin](https://github.com/Morn1nStar/dsh-academic-research-plugin) | 0 | 2026-10-24 | 2026-10-24 | DeepSeek Harness 学术研究插件：文献核验、论据核验表、复现记录与投稿前准入门槛（11 个工具 + 3 个方法论 skill，零运行时依赖）。Literature verification, claim–source register, reproduction runs and pre-submission gates. |
| 240 | [MR1ZK/dsh-quick-setup](https://github.com/MR1ZK/dsh-quick-setup) | 0 | 2026-10-18 | 2026-10-24 | 老实装插件，很枯燥吧？该插件可以帮你在另一个deepseek harness实例中批量部署你的dsh插件，以后再也不用一个个在市场上搜插件装了。（注：这个描述是我自己手写的） |
| 241 | [mrkeyoe/dsh-hello-plugin](https://github.com/mrkeyoe/dsh-hello-plugin) | 0 | 2026-10-24 | 2026-10-24 | A minimal DeepSeek Harness (dsh) plugin that registers one host tool. A copyable skeleton that shows exactly which files a dsh plugin needs and what each one is responsible for. |
| 242 | [Mys12word/dsh-file-tracker](https://github.com/Mys12word/dsh-file-tracker) | 0 | 2026-10-24 | 2026-10-24 | DSH plugin: shows which files and directories the agent touched (directory view + timeline) |
| 243 | [NekoDD-wow/dsh-creator-plus](https://github.com/NekoDD-wow/dsh-creator-plus) | 0 | 2026-10-24 | 2026-10-24 | 创造模式增强：一键在临时纯净 profile 中启动 DSH 分身，用无头浏览器检查前端能否正常启动，避免改坏本体客户端。 |
| 244 | [neo805/dsh-auto-upgrade](https://github.com/neo805/dsh-auto-upgrade) | 0 | 2026-10-24 | 2026-10-24 | Scan, stage and switch DSH plugin upgrades with a reversible two-rename switch. Bundle loads it, a skill judges, scripts execute. |
| 245 | [Nergous/dsh-tg-bridge](https://github.com/Nergous/dsh-tg-bridge) | 0 | 2026-07-21 | 2026-10-24 | DeepSeek Harness plugin: every DSH session becomes a Telegram forum topic, mirrored both ways, with approvals, questions, commands, files and voice |
| 246 | [NiMo-Miku/dsh-memory-companion](https://github.com/NiMo-Miku/dsh-memory-companion) | 0 | 2026-10-24 | 2026-10-24 | dsh(DeepSeek Harness) 记忆与陪伴插件:长期记忆+分层注入+自动沉淀+好感度日记+QQ OneBot(snowluma)接入 \| 纯 vibecode 许愿式编程产物 |
| 247 | [NotKeKe/dsh-opencode-session-header](https://github.com/NotKeKe/dsh-opencode-session-header) | 0 | 2026-10-15 | 2026-10-24 | DeepSeek Harness host bundle: inject x-opencode-session on OpenCode Go requests that are missing it (fixes 400 MissingSessionID, e.g. under Auto review). |
| 248 | [Notoonex/dsh-project-board](https://github.com/Notoonex/dsh-project-board) | 0 | 2026-10-23 | 2026-10-24 | Project record system for DeepSeek Harness: node-based progress board, decision ledger, and right-sidebar UI. |
| 249 | [nwasvsad/dsh-task-digest](https://github.com/nwasvsad/dsh-task-digest) | 0 | 2026-10-24 | 2026-10-24 | DSH plugin: nightly per-task token, cost, and result digest for the previous day's Sessions |
| 250 | [nwasvsad/dsh-task-plan](https://github.com/nwasvsad/dsh-task-plan) | 0 | 2026-10-24 | 2026-10-24 | DSH plugin: off-peak task plan table that runs pending tasks as concurrent Sessions |
| 251 | [ogidimitrov/dsh-peak-cost](https://github.com/ogidimitrov/dsh-peak-cost) | 0 | 2026-10-23 | 2026-10-24 | DeepSeek Harness plugin: live peak-hours status and estimated USD spend for the current session, under the composer. |
| 252 | [ohlygod/dsh-jiuling-remote-android](https://github.com/ohlygod/dsh-jiuling-remote-android) | 0 | 2026-10-24 | 2026-10-24 | DSH 远程目录（安卓端）：6 位配对码接入电脑端 dsh-jiuling-remote-desktop，凭据只留在引擎进程，提供 RPC / SSE 桥接与设置页。 |
| 253 | [pairun325/dsh-ai-relay](https://github.com/pairun325/dsh-ai-relay) | 0 | 2026-10-24 | 2026-10-24 | Ask other AI models to help with the work — OpenAI-compatible and Anthropic routes as agent tools in DeepSeek Harness. |
| 254 | [parolkar/dsh-zapier-mcp](https://github.com/parolkar/dsh-zapier-mcp) | 0 | 2026-10-24 | 2026-10-24 | Zapier MCP plugin for Deepseek Harness (DSH) |
| 255 | [PerryLink/dsh-safety-ledger-check](https://github.com/PerryLink/dsh-safety-ledger-check) | 0 | 2026-10-23 | 2026-10-24 | 核对施工安全资格台账：三级教育与学时、培训档案四要素、特种作业证书、有效期、工种匹配、六个月实习期。 |
| 256 | [Player-MINEPIG/dsh-orchestration](https://github.com/Player-MINEPIG/dsh-orchestration) | 0 | 2026-10-04 | 2026-10-24 | Independent typed decisions and a durable task / multi-device execution suite for DeepSeek Harness, with optional channel adapters and WebUI. |
| 257 | [PlusQi/dsh-tokstats](https://github.com/PlusQi/dsh-tokstats) | 0 | 2026-08-28 | 2026-10-24 | 个人 DeepSeek Harness (DSH) 插件集 |
| 258 | [puny-code/dsh-speed-anchor](https://github.com/puny-code/dsh-speed-anchor) | 0 | 2026-10-24 | 2026-10-24 | Live token-speed sparkline pill for the DeepSeek Harness composer dock. |
| 259 | [pvlb-dev/dsh-resend-mcp](https://github.com/pvlb-dev/dsh-resend-mcp) | 0 | 2026-10-23 | 2026-10-24 | resend.com mcp toolset |
| 260 | [QIFANAI/dsh-startup-moss](https://github.com/QIFANAI/dsh-startup-moss) | 0 | 2026-10-24 | 2026-10-24 | DeepSeek Harness 零点击启动动画「MOSS CORE 550W」：大鲸鱼背景 + Dune 仪表层 + 550W 核心，8.8 秒自动开幕 |
| 261 | [QingJing5906/dsh-DevDock](https://github.com/QingJing5906/dsh-DevDock) | 0 | 2026-10-21 | 2026-10-24 | DevDock · DeepSeek Harness 的研发账号与服务管理套件。首批：GitHub 多账号、仓库管理、工作区推送与推送前 Agent 审查；后续接入 Cloudflare Workers/Pages 与 npm。 |
| 262 | [qingshanjiluo/dsh-model-caps](https://github.com/qingshanjiluo/dsh-model-caps) | 0 | 2026-10-24 | 2026-10-24 | Model capability editor for DSH: fetch upstream /models, review and save context window, max output and image support |
| 263 | [QinLuza/dsh-aisketch](https://github.com/QinLuza/dsh-aisketch) | 0 | 2026-10-24 | 2026-10-24 | AISketch for DSH: semantic conversation cards (table, flowchart, draw, teaching figures) + expression-driven function plots. MIT, zero base changes. |
| 264 | [QQPilotOrganization/qqpilot-dsh-plugin](https://github.com/QQPilotOrganization/qqpilot-dsh-plugin) | 0 | 2026-10-24 | 2026-10-24 | 把 QQPilot 的 QQ 消息接入 DeepSeek Harness（DSH）的桥接插件： 对 QQPilot 暴露一个 OpenAI Chat Completion 兼容端点，由 DSH 里配置的模型通过智能体工具决定 「回复什么 / 不回复 / 附带图片」；提供 工具 / 兼容 / 静默 三种运行模式，并在设置页内置 可视化聊天动态（实时看到收到的 QQ 消息、AI 的决定、回复内容、耗时与 token）。 |
| 265 | [qux-bbb/dsh-plugin-todo](https://github.com/qux-bbb/dsh-plugin-todo) | 0 | 2026-10-17 | 2026-10-24 | User-confirmed todo list plugin for DeepSeek Harness: panel, model tools, /todo command |
| 266 | [qwq1999/dsh-ide-database](https://github.com/qwq1999/dsh-ide-database) | 0 | 2026-10-22 | 2026-10-24 | DeepSeek Harness（DSH）的 JetBrains Database 风格数据源插件：右侧边栏的数据库工具窗，以及一组供 Agent 查询/操作数据库的工具。 |
| 267 | [Refone/dsh-billing-mini-tag](https://github.com/Refone/dsh-billing-mini-tag) | 0 | 2026-10-23 | 2026-10-24 | DeepSeek Harness 计费小 Tag |
| 268 | [regrevia/dsh-fast-mode](https://github.com/regrevia/dsh-fast-mode) | 0 | 2026-10-24 | 2026-10-24 | DeepSeek Harness 自己的 fast 模式：按步骤自适应思考档位 + 按档位批量并行工具调用，零依赖；只使用当前路由真正声明过的档位，官方 API 与自建网关都支持。 |
| 269 | [RestartBaiYe/dsh-share](https://github.com/RestartBaiYe/dsh-share) | 0 | 2026-10-24 | 2026-10-24 | DSH conversation sharing with account-free 1/3/7/30-day links, local redaction and revocation. |
| 270 | [romany-saad/dsh-plugins](https://github.com/romany-saad/dsh-plugins) | 0 | 2026-10-24 | 2026-10-24 | Public DeepSeek Harness (DSH) plugins |
| 271 | [rootryanlau-art/dsh-voice-transcribe](https://github.com/rootryanlau-art/dsh-voice-transcribe) | 0 | 2026-10-24 | 2026-10-24 | Offline audio/video transcription for DSH — SenseVoice int8, composer panel + CLI + agent skill |
| 272 | [rootsbymenda/dsh-second-angle](https://github.com/rootsbymenda/dsh-second-angle) | 0 | 2026-10-24 | 2026-10-24 | A second angle on a finished DeepSeek Harness turn: checks the answer against the tool output the turn read. |
| 273 | [rrkyd/dsh-ca-image](https://github.com/rrkyd/dsh-ca-image) | 0 | 2026-10-24 | 2026-10-24 | CA cards 出图插件 — Phase 3（host 半边：加载探针 + 媒体/回合存储 + 落盘接线） |
| 274 | [rrkyd/dsh-ca-image-console](https://github.com/rrkyd/dsh-ca-image-console) | 0 | 2026-10-24 | 2026-10-24 | 把 dsh-ca-image 的控制台链接放进设置 → 插件区，省得记网址 |
| 275 | [saibei404/dsh-prompt-polish](https://github.com/saibei404/dsh-prompt-polish) | 0 | 2026-10-24 | 2026-10-24 | DeepSeek Harness 提示词优化插件：输入框旁一键把草稿改写成清晰可执行的提示词（DeepSeek V4.1 Flash） |
| 276 | [samir2015dzh/dsh-skill-studio-plus](https://github.com/samir2015dzh/dsh-skill-studio-plus) | 0 | 2026-10-24 | 2026-10-24 | Self-improving skill pipeline for DeepSeek Harness: per-turn judgement, auto-accept, semantic merge, DSH-native models |
| 277 | [scientificmaniac/dsh-account-usage](https://github.com/scientificmaniac/dsh-account-usage) | 0 | 2026-10-24 | 2026-10-24 | Unofficial DSH Desktop patch: token usage, last 7 days and activity under Settings → Account |
| 278 | [scsmash3r/dsh-ui-colors](https://github.com/scsmash3r/dsh-ui-colors) | 0 | 2026-10-24 | 2026-10-24 | Adds an ability to control the looks of DSH GUI, mixing spectrum and presets of colors. Borders included! |
| 279 | [SeekAfterSeek/dsh-chrome-only](https://github.com/SeekAfterSeek/dsh-chrome-only) | 0 | 2026-10-24 | 2026-10-24 | DeepSeek Harness bundle: every browser navigation goes to Google Chrome - tools, guard, prompt rule, and a Chrome handoff so dsh web never opens the OS default browser. |
| 280 | [Sheep1x/dsh-aimy](https://github.com/Sheep1x/dsh-aimy) | 0 | 2026-10-23 | 2026-10-24 | dsh-Aimy — DeepSeek Harness 插件：用 Aimy 中转站的模型并真实切换分组（兼容 new-api / sub2api） |
| 281 | [ShioUmiusi/dsh-fs-retry](https://github.com/ShioUmiusi/dsh-fs-retry) | 0 | 2026-10-23 | 2026-10-24 | Retry ctx.fs.writeText on Windows ReplaceFileW failures (Win32 1175) — DSH plugin |
| 282 | [shuunO-O/dsh-neo4j-memory](https://github.com/shuunO-O/dsh-neo4j-memory) | 0 | 2026-10-24 | 2026-10-24 | A long-term graph memory plugin for DeepSeek Harness (DSH), powered by Neo4j. |
| 283 | [siweimidu/dsh-cover-studio](https://github.com/siweimidu/dsh-cover-studio) | 0 | 2026-10-24 | 2026-10-24 | AI 日报封面工作台 \| DeepSeek Harness 全页插件：169 个 AI 模型图标、无限画布拖拽编辑、RSS 生成、TTS 配音、HyperFrames 视频渲染 |
| 284 | [slaren/dsh-llm-llamacpp](https://github.com/slaren/dsh-llm-llamacpp) | 0 | 2026-10-24 | 2026-10-24 | llama.cpp provider for DeepSeek Harness |
| 285 | [SnailMann/dsh-credit-checkin-hub](https://github.com/SnailMann/dsh-credit-checkin-hub) | 0 | 2026-10-23 | 2026-10-24 | workbuddy\\qoder\\trae\\minimax daily credit checkin \| 多平台自动积分签到 |
| 286 | [SnailMann/dsh-quick-model-selector](https://github.com/SnailMann/dsh-quick-model-selector) | 0 | 2026-10-23 | 2026-10-24 | quick model selector for deepseek harness \| 多快好省的模型选择器 |
| 287 | [Sodapopper-pixel/dsh-cot-translator-plus](https://github.com/Sodapopper-pixel/dsh-cot-translator-plus) | 0 | 2026-10-24 | 2026-10-24 | 把展开的思考内容翻成界面语言：任意 HTTP 翻译站点模板 + 模型翻译（DSH 已注册提供商或插件自带的自定义 OpenAI 兼容提供商）\| Configurable reasoning translation for DeepSeek Harness |
| 288 | [sqzw-x/dsh-plugins](https://github.com/sqzw-x/dsh-plugins) | 0 | 2026-10-24 | 2026-10-24 | DeepSeek Harness 插件合集：一个 pnpm workspace、一套 CI、一套发布流水线；每个插件仍是独立的 npm 包。 |
| 289 | [ssamurias/dsh-fish](https://github.com/ssamurias/dsh-fish) | 0 | 2026-10-24 | 2026-10-24 | 养一条会自己长大的鱼：不给配置面板，靠事件长人格。DeepSeek Harness 插件，状态库在 ~/.dsh-fish，只追加不改写。 |
| 290 | [starash07/dsh-edit-message](https://github.com/starash07/dsh-edit-message) | 0 | 2026-10-24 | 2026-10-24 | 右键最新一条用户消息进行编辑：原文回填输入框，重发后标记上一条用户消息及其回答作废 |
| 291 | [starash07/dsh-file-menu](https://github.com/starash07/dsh-file-menu) | 0 | 2026-10-24 | 2026-10-24 | 在 DeepSeek Harness 桌面端右键对话中的文件：打开、用默认应用打开、选择其他应用、复制路径、在资源管理器中打开 |
| 292 | [Starp1ume/dsh-chat-mode](https://github.com/Starp1ume/dsh-chat-mode) | 0 | 2026-10-24 | 2026-10-24 | 为DSH添加不消化token的聊天模式（目前内嵌web） |
| 293 | [stopperino/dsh-routerai-usage](https://github.com/stopperino/dsh-routerai-usage) | 0 | 2026-10-24 | 2026-10-24 | RouterAI balance and per-request cost for the DeepSeek Harness Web UI (subagents included) |
| 294 | [Summer-Perilla/dsh-ui-custom](https://github.com/Summer-Perilla/dsh-ui-custom) | 0 | 2026-10-24 | 2026-10-24 | DSH 的编辑模式插件：接管布局，任意元素、组件可自定义，支持调整位置/宽/高/字号/隐藏。可选脱离文档流、吸附对齐，支持多选、批量、撤销、重置。兼容主题插件，允许用户调整元素获得更多空间和自定义个性化界面。 |
| 295 | [TangerineSplendor/dsh-screenshot](https://github.com/TangerineSplendor/dsh-screenshot) | 0 | 2026-10-23 | 2026-10-24 | Windows screenshot plugin for DeepSeek Harness: live desktop selection, annotations, global hotkey, and direct image insertion. |
| 296 | [taozhuowei/dsh-muse-sidebar](https://github.com/taozhuowei/dsh-muse-sidebar) | 0 | 2026-10-24 | 2026-10-24 | One-click Muse website access in the official DeepSeek Harness right sidebar |
| 297 | [Team-Commonly/commonly-dsh](https://github.com/Team-Commonly/commonly-dsh) | 0 | 2026-10-24 | 2026-10-24 | Commonly MCP bundle for DeepSeek Harness |
| 298 | [Thatgfsj/dsh-phone](https://github.com/Thatgfsj/dsh-phone) | 0 | 2026-10-24 | 2026-10-24 | dsh-phone：给 DeepSeek Harness 提供运行在后端、经浏览器右侧栏呈现的 Android 实例（含 phone_* 工具） |
| 299 | [tkctly/dsh-auto-continue](https://github.com/tkctly/dsh-auto-continue) | 0 | 2026-10-24 | 2026-10-24 | Pure-client DeepSeek Harness plugin: sends "continue" on output-token truncation, with configurable error codes, context compaction recovery, loop guards, and statistics. |
| 300 | [topkie/dsh-lattice](https://github.com/topkie/dsh-lattice) | 0 | 2026-10-23 | 2026-10-24 | DeepSeek Harness 的本地记忆插件：把值得长期复用的知识写成带主题与关联的条目，之后按语义召回；数据存在本地 SQLite 库里，向量模型首次使用时下载，之后离线可用。 |
| 301 | [toyangshome/dsh-cradle](https://github.com/toyangshome/dsh-cradle) | 0 | 2026-10-24 | 2026-10-24 | Cradle — sovereign agent diplomacy with a pixel room and agency: DSH plugin (host + web), the dsh-net/1.0 Discovery Server in Go, a multi-agent simulator and tests. |
| 302 | [tuanzhanghao/dsh-bili-mini](https://github.com/tuanzhanghao/dsh-bili-mini) | 0 | 2026-10-24 | 2026-10-24 | 在 DSH 侧边栏看 B 站：支持推荐流、1080P、弹幕、扫码登录与历史同步。不消耗 Token。 |
| 303 | [ugg-ki/dsh-skill-manager](https://github.com/ugg-ki/dsh-skill-manager) | 0 | 2026-10-24 | 2026-10-24 | Standalone Skills page for DeepSeek Harness: every skill listed with an enable switch at global, project and session scope; custom categories; Chinese descriptions. |
| 304 | [ukakbdh091/dsh-model-fallback](https://github.com/ukakbdh091/dsh-model-fallback) | 0 | 2026-10-24 | 2026-10-24 | 模型超时/断连时自动切到备用模型并在同一步重试，不让整轮对话红字报错。设置页里从模型列表直接挑，改完即生效。安装：dsh plugin --profile desktop add dsh-model-fallback |
| 305 | [vennahlot/dsh-tabs](https://github.com/vennahlot/dsh-tabs) | 0 | 2026-10-23 | 2026-10-24 | Chrome-style tabs for DeepSeek Harness (DSH) web chat sessions: tab strip, tab groups, split panes. |
| 306 | [Venshell/dsh-zcode-startplan](https://github.com/Venshell/dsh-zcode-startplan) | 0 | 2026-10-24 | 2026-10-24 | DSH（DeepSeek Harness）接入 ZCode 赠送免费 plan：多账号池 + Web UI 管理面板 + bigmodel/zai 双渠道登录，零运行时依赖 |
| 307 | [vioeveann/dsh-avatar-frame](https://github.com/vioeveann/dsh-avatar-frame) | 0 | 2026-10-24 | 2026-10-24 | DeepSeek Harness 插件：每轮回复左侧的角色头像与可编辑 ID；回复可朗读（系统语音，或接入你自己的本地 TTS 服务），支持语气与语速、播放控制条，并可一键启动语音服务进程。 |
| 308 | [vit-cerny/dsh-model-manager](https://github.com/vit-cerny/dsh-model-manager) | 0 | 2026-10-23 | 2026-10-24 | Import the models, providers, API keys and OAuth logins that other agent harnesses keep on your machine (opencode, Codex/ChatGPT, Claude Code, Gemini, Qwen, .env) into DeepSeek Harness, with a clean Settings page to manage them. |
| 309 | [VRChatCN-Kipfel/dsh-vrchat](https://github.com/VRChatCN-Kipfel/dsh-vrchat) | 0 | 2026-10-24 | 2026-10-24 | VRChat creator toolkit for DeepSeek Harness (DSH): 414-page knowledge base, 9 tools, 6 skills. / VRChat 创作者工具链：知识库 + 红线注入 + 专用工具 + 随包技能 |
| 310 | [Weidows/dsh-git](https://github.com/Weidows/dsh-git) | 0 | 2026-10-20 | 2026-10-24 | Git for DeepSeek Harness: a repo/branch chip under the composer, a header Git button, and a right-sidebar tab with changes and commit history. |
| 311 | [Wfssll/dsh-three-pane](https://github.com/Wfssll/dsh-three-pane) | 0 | 2026-10-24 | 2026-10-24 | DeepSeek Harness 三栏工作区：独立左侧文件列表、中间聊天、右侧原生 PDF/文件预览，兼容可收缩的对话历史栏。 |
| 312 | [whyself/Amadeus-next](https://github.com/whyself/Amadeus-next) | 0 | 2026-10-24 | 2026-10-24 | Amadeus 的 DeepSeek Harness 插件包 |
| 313 | [wlllyj/dsh-prompt-forge](https://github.com/wlllyj/dsh-prompt-forge) | 0 | 2026-10-24 | 2026-10-24 | DSH plugin Prompt Forge: rewrite the composer draft by the AI-usage doctrine (AI使用心法) and toggle between original and optimized prompt |
| 314 | [wooxi/dsh-session-delete](https://github.com/wooxi/dsh-session-delete) | 0 | 2026-10-24 | 2026-10-24 | Permanently delete DSH sessions from the sidebar with a themed confirmation dialog and no page reload. |
| 315 | [WU079/dsh-memory-keeper](https://github.com/WU079/dsh-memory-keeper) | 0 | 2026-10-24 | 2026-10-24 | Cross-session memory for DSH: exports every session to readable Markdown with provenance, keeps a MEMORY.md you curate, and gives the agent mem_wake / mem_search / mem_write — memory that survives windows. |
| 316 | [wuwo1979/dsh-qqbot-muu](https://github.com/wuwo1979/dsh-qqbot-muu) | 0 | 2026-10-24 | 2026-10-24 | DSH QQ bot: memory, persona, B站运营 |
| 317 | [WuYiBaiZhi/dsh-font-studio](https://github.com/WuYiBaiZhi/dsh-font-studio) | 0 | 2026-10-24 | 2026-10-24 | DSH 字体工坊：给 DeepSeek Harness 换正文/代码字体与字号，预设画廊 + 自定义字体栈 + 实时预览；字体清单由宿主进程直读字体文件，支持 TTC / 超级 TTC / OTC |
| 318 | [wuzhican/dsh-qbittorrent](https://github.com/wuzhican/dsh-qbittorrent) | 0 | 2026-10-24 | 2026-10-24 | DSH plugin: qBittorrent WebAPI v2 tools |
| 319 | [wwb051221/DHS-LAN-Web-Access](https://github.com/wwb051221/DHS-LAN-Web-Access) | 0 | 2026-10-24 | 2026-10-24 | 通过密码登录在局域网浏览器中访问本机的 DeepSeek Harness 网页界面 · Password-protected LAN access for the DeepSeek Harness Web GUI |
| 320 | [XavierMarquis93/dsh-auto-review-default](https://github.com/XavierMarquis93/dsh-auto-review-default) | 0 | 2026-10-23 | 2026-10-24 | Make the shipped Auto review permission preset the new-session default in DeepSeek Harness. |
| 321 | [XavierMarquis93/dsh-plugin-auto-review-zh](https://github.com/XavierMarquis93/dsh-plugin-auto-review-zh) | 0 | 2026-10-23 | 2026-10-24 | 让 DeepSeek Harness 实验性「自动审查」在征求用户同意时显示中文（Host 插件，无 UI、无依赖） |
| 322 | [yimengsuper2432/dsh-agent-personality](https://github.com/yimengsuper2432/dsh-agent-personality) | 0 | 2026-10-24 | 2026-10-24 | 这是一个DeepseekHarness的情感人格插件 |
| 323 | [Yingmoon0715/rightbar-driver](https://github.com/Yingmoon0715/rightbar-driver) | 0 | 2026-10-24 | 2026-10-24 | Drive the built-in browser inside the DSH right sidebar: open, navigate, read, click, fill, close. |
| 324 | [Yingmoon0715/yingmoon-plugins](https://github.com/Yingmoon0715/yingmoon-plugins) | 0 | 2026-10-24 | 2026-10-24 | yingmoon 的 DSH 插件库 —— 我们自己写的 DeepSeek Harness 插件都放在这里。 |
| 325 | [yiyunet/dsh-proxy-egress](https://github.com/yiyunet/dsh-proxy-egress) | 0 | 2026-10-24 | 2026-10-24 | 本地出口代理（egress）桥：给只接受无凭据代理地址的消费方一个本地地址，账号密码在上游那一跳注入。失败即断联，无直连降级。 \| DSH plugin: a local egress proxy that hands a credential-free proxy URL to consumers that reject credentials, then injects the upstream auth on the hop that needs it. Fail-closed — no direct fallback, ever. |
| 326 | [YuGaN525/DSH-token-admin](https://github.com/YuGaN525/DSH-token-admin) | 0 | 2026-10-23 | 2026-10-24 | DSH plugin: show per-turn token usage, estimated cost, and DeepSeek balance under every completed turn. |
| 327 | [YumenoSayuri/dsh-reasoning-efforts](https://github.com/YumenoSayuri/dsh-reasoning-efforts) | 0 | 2026-10-24 | 2026-10-24 | 给第三方 provider 的模型按关键词自动挂上思考强度档位（off/low/medium/high/max），新增模型后无需手动配置 |
| 328 | [yutaosheng004-bit/dsh-qq-persona](https://github.com/yutaosheng004-bit/dsh-qq-persona) | 0 | 2026-10-24 | 2026-10-24 | QQ 通道的人物记忆与画像：滚动聊天总结、人物画像、好感度（主人恒定天花板）、情绪层 |
| 329 | [yxccai/dsh-model-thinking](https://github.com/yxccai/dsh-model-thinking) | 0 | 2026-10-24 | 2026-10-24 | 自动匹配第三方模型的思考强度档位，切换模型动态对齐；支持 DSH 原生菜单，可选搭配炫酷滑条。Automatic reasoning-effort matching for third-party models in DSH. |
| 330 | [Z-415/dsh-geogebra](https://github.com/Z-415/dsh-geogebra) | 0 | 2026-10-24 | 2026-10-24 | DSH 插件：让模型用一条 GeoGebra 命令列表画出真正的 GeoGebra 图形，导出 PNG 或可用 GeoGebra 打开的可编辑 .ggb；无窗口、不抢鼠标键盘。 |
| 331 | [Zcc-777/dsh-deepseek-usage-panel-c](https://github.com/Zcc-777/dsh-deepseek-usage-panel-c) | 0 | 2026-10-24 | 2026-10-24 | Custom fork of dsh-deepseek-usage-panel: peak/off-peak price hint, today's spend, and detailed token usage for DeepSeek Harness Web. |
| 332 | [zengxiaolou/dsh-annotate-browser](https://github.com/zengxiaolou/dsh-annotate-browser) | 0 | 2026-10-23 | 2026-10-24 | DSH 标注浏览器插件：自己实现的零依赖 CDP 客户端 + 输入框上方标注面板（点选元素→写备注→插入对话），不依赖任何第三方浏览器插件 |
| 333 | [zengxiaolou/dsh-effort-dial](https://github.com/zengxiaolou/dsh-effort-dial) | 0 | 2026-10-22 | 2026-10-24 | DSH 插件：输入框推理强度滑杆（鲸鱼娘 + canvas 辐射特效），Auto 区间与模型路由 |
| 334 | [zengxiaolou/dsh-paste-chip](https://github.com/zengxiaolou/dsh-paste-chip) | 0 | 2026-10-23 | 2026-10-24 | DSH 插件 · 长文本粘贴自动折叠成可展开的胶囊：≥400 字或 ≥12 行即折叠，悬停/点击看正文与上下文，发送时按原位展开；也接管标注浏览器、划词注释等插件写入的长文本。 |
| 335 | [zerodegress/dsh-tui-favors](https://github.com/zerodegress/dsh-tui-favors) | 0 | 2026-10-24 | 2026-10-24 | A dsh-TUI plugin that pins the model, reasoning effort, agent preset and permission mode every new  conversation starts on, plus a /favors command to inspect or re-apply them on demand. |
| 336 | [zeroed-07/dsh-memory-guard](https://github.com/zeroed-07/dsh-memory-guard) | 0 | 2026-10-24 | 2026-10-24 | Local-only memory guard for DeepSeek Harness: heap and session-log monitoring, oversized tool-argument interception, dry-run session vacuum. |
| 337 | [ZhaoZiyangShaanxi/dsh-server-monitor](https://github.com/ZhaoZiyangShaanxi/dsh-server-monitor) | 0 | 2026-10-23 | 2026-10-24 | In-DSH server monitor: memory, load, disk and per-container usage, cache purge and container restarts, plus an embedded noVNC QQ client for manual QR login and sign-out. |
| 338 | [ZHUBAI0528/dsh-client-ui-aqua-community-fix](https://github.com/ZHUBAI0528/dsh-client-ui-aqua-community-fix) | 0 | 2026-10-23 | 2026-10-24 | Aqua 玻璃质感主题 · 适配 DeepSeek Harness V0.2.1-rc.3 · glassmorphism theme for DSH: adjustable blur/frost, fluid or wallpaper backdrop, unified corners; toggle off for the stock UI, no source changes |
| 339 | [Zhucy123/dsh-delegation](https://github.com/Zhucy123/dsh-delegation) | 0 | 2026-10-24 | 2026-10-24 | Delegate work to a local DeepSeek Harness (DSH) instance from any coding agent: persistent conversations, push-based replies, native image input. Zero dependencies. |
| 340 | [zouyuhang233/dsh-token-mascot](https://github.com/zouyuhang233/dsh-token-mascot) | 0 | 2026-10-24 | 2026-10-24 | 小汪：DSH（DeepSeek）右下角的 Q 版 token 看板娘，实时显示本会话 token、速率、上下文占用、当前任务与今日全部会话合计；可点击展开各会话明细。 |
| 341 | [ZSF-2026/qq-memory](https://github.com/ZSF-2026/qq-memory) | 0 | 2026-10-24 | 2026-10-24 | DSH 长期记忆 + 遗忘曲线插件：让 AI 记住跨会话的事、按需回顾上下文，用艾宾浩斯遗忘曲线让旧记忆自然淡出以节约 token |
| 342 | [zshqzcn/dsh-plugin-agent-bridge](https://github.com/zshqzcn/dsh-plugin-agent-bridge) | 0 | 2026-10-18 | 2026-10-24 | Two-way agent-to-agent bridge for DeepSeek Harness (DSH): two hosts talk over a PSK-authenticated TCP link, read-only tool posture by default. 双向 agent 桥接插件。 |
| 343 | [ztlovelsw/dsh-ui-picker](https://github.com/ztlovelsw/dsh-ui-picker) | 0 | 2026-10-24 | 2026-10-24 | 点选前端页面任意 UI 控件，自动把控件详情（CSS 选择器/XPath/组件名/样式）写入 DeepSeek Harness 输入框，让 AI 精准定位要改的界面元素。 |
| 344 | [zus12873/dsh-cinematic-wallpaper](https://github.com/zus12873/dsh-cinematic-wallpaper) | 0 | 2026-10-24 | 2026-10-24 | Cinematic intro and live wallpaper for the DeepSeek Harness (DSH) web UI: a character awakens on every page load, then stays behind the UI as an animated background with adaptive text colours. |
| 345 | [zx2021210538/dsh-skills-mcp-manager](https://github.com/zx2021210538/dsh-skills-mcp-manager) | 0 | 2026-10-24 | 2026-10-24 | DSH 插件：在设置面板里管理技能（SKILL.md）与 MCP 服务器，全局 / 项目级分层，改完即生效。Manage skills and MCP servers from the DSH settings panel. |

## 从快照消失的已核准仓库 / Approved repositories missing from the snapshot

已核准但已不在当前快照中（删除或改名），核实后从 [data/approved.json](../approved.json) 移除或更新名称。

Approved but no longer present in the current snapshot (deleted or renamed) — after checking, remove them from [data/approved.json](../approved.json) or update the name.

- 18383337799/dsh-conversation-aurora
- 2220545672/dsh-context-editor
- Anlerway/dsh-session-explorer
- anze225-max/dsh-mimo-connect
- Astra-Ursae-Majoris/Deepseek-Harness-Local-UI
- caob23/dsh-browser-control
- caob23/dsh-origin-bridge
- chou109/dsh-vision-bridge
- CLnum42/dsh-DSchat
- danheng383-commits/dsh-widget
- Demogorgon314/dsh-resume-plugin
- drscrewdriver/dsh-session-steward
- feigo313/dsh-av-preview
- ferrisching/dsh-editor-link
- full-aigc-plugins/printcraft-plugin
- hldz-top/dsh-story
- Lixiaoyiao/deepseek-harness-action
- masknull/dsh-workbuddy-connect
- MingHuanYue/dsh-tide-whisper
- NewSpringWei/dsh-subagent-opencode
- PlusQi/dsh-plugins
- Potato1008ypy/dsh-purge-0.2.1rc2-fix
- QingJing5906/dsh-push
- seaison/dsh-eva-ui
- sqzw-x/dsh-focus-notify
- sqzw-x/dsh-lan-link
- sqzw-x/dsh-notes-context
- TestFox000/dsh-plugin-pets
- theRMM714/git-for-dsh
- tuoLuoSuan/dsh-peak-badge
- wangsunlight/xiaobao-dsh-employees
- webkubor/dsh-mirror
- xfgil/dsh-onebot-companion
- xingyingyuzhui/dsh-vision-bench
- ZekaiShi/evo-subagent
- ZHUBAI0528/dsh-client-ui-aqua
