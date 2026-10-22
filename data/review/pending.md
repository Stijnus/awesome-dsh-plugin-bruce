# 待审核仓库 / Pending review

> 新增到 `dsh-plugin` Topic 下、带有简介、尚未经维护者核实的仓库。本文件由 `scripts/update.mjs` 每日刷新，仅供审核使用，不是用户可见页面。
>
> Repositories newly added to the `dsh-plugin` topic that the maintainer has not verified yet. Refreshed daily by `scripts/update.mjs`; review-only, not a user-facing page.

- 生成时间 / Generated: **2026-10-22**
- 快照日期 / Snapshot date: **2026-10-22 (UTC)**
- 待审核 / Pending: **725**
- 从快照消失的已核准仓库 / Approved repositories missing from the snapshot: **80**
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

对比上一份快照 **2026-10-21** / vs previous snapshot **2026-10-21**。规则：日增 ≥100★；已核准仓新入 Top 200（且 Δ≥50）/ 名次跃升 ≥50 / 冲入 Top 20；待审仓 ≥100★ 且核准后将进入 Top 200。

- 看 Star 是否与 fork、提交活跃度、仓库年龄匹配（高星零 fork、创建当天几百星，多为刷星）
- 是否把已有高星的通用项目贴上 `dsh-plugin` Topic 蹭榜——插件本身可进目录，但应加入 `leaderboard_exclusions`，理由写清 stars accrued as …
- 待审仓若核准会直接冲进 Top 20 / Top 200，先确认热度来自 **DSH 插件本身**
- 已核准仓的异常跃升：确认后同样可记入 `leaderboard_exclusions`，不必下架目录

Check stars against forks, commit activity and age (hundreds of stars on day one, or high stars with zero forks, usually look bought). A generic high-star project that only just tagged `dsh-plugin` can stay in the catalog but should go to `leaderboard_exclusions` (reason: stars accrued as …). If approving a pending repo would drop it into Top 20 / Top 200, confirm the audience is the DSH plugin itself.

- 告警数 / Alerts: **14**

| Project | Queue | Stars | Δ | Forks | Age | Signals | 审核提示 / Hint |
| --- | --- | ---: | ---: | ---: | ---: | --- | --- |
| ⚠️ [Ebony-Vinyl/dsh-our-free-model](https://github.com/Ebony-Vinyl/dsh-our-free-model) | 已核准 / approved | 36596 | +2992 | 1047 | 27d | 日增百星 | 日增 +2992★；已不进榜单 |
| ⚠️ [dataelement/dsh-desktop](https://github.com/dataelement/dsh-desktop) | 已核准 / approved | 16186 | +311 | 549 | 69d | 日增百星 | 日增 +311★；已不进榜单 |
| ⚠️ [bowenliang123/dsh-context](https://github.com/bowenliang123/dsh-context) | 已核准 / approved | 3395 | +286 | 133 | 68d | 日增百星 | 日增 +286★ |
| ⚠️ [dsh-market/dsh-market](https://github.com/dsh-market/dsh-market) | 已核准 / approved | 8234 | +252 | 322 | 68d | 日增百星 | 日增 +252★；已不进榜单 |
| ⚠️ [PC2005-cloud/dsh-pet](https://github.com/PC2005-cloud/dsh-pet) | 已核准 / approved | 3494 | +233 | 239 | 68d | 日增百星 | 日增 +233★ |
| ⚠️ [T-Auto/dsh-ops](https://github.com/T-Auto/dsh-ops) | 已核准 / approved | 3850 | +193 | 110 | 13d | 日增百星 | 日增 +193★ |
| ⚠️ [Fei2411/DeepSeek-Bot](https://github.com/Fei2411/DeepSeek-Bot) | 已核准 / approved | 3030 | +162 | 293 | 14d | 日增百星 | 日增 +162★ |
| ⚠️ [ranxianglei/billion-context](https://github.com/ranxianglei/billion-context) | 已核准 / approved | 2395 | +154 | 205 | 76d | 日增百星 | 日增 +154★；已不进榜单 |
| ⚠️ [elysia395/dsh-wallpaper-engine](https://github.com/elysia395/dsh-wallpaper-engine) | 已核准 / approved | 1923 | +146 | 72 | 66d | 日增百星 | 日增 +146★ |
| ⚠️ [MeteorNOX/DeepSeek-Balance-Whale-Widget](https://github.com/MeteorNOX/DeepSeek-Balance-Whale-Widget) | 已核准 / approved | 5779 | +125 | 186 | 64d | 日增百星 | 日增 +125★；已不进榜单 |
| ⚠️ [ccch1mneyyy/dsh-TUI](https://github.com/ccch1mneyyy/dsh-TUI) | 已核准 / approved | 5227 | +122 | 283 | 69d | 日增百星 | 日增 +122★ |
| ⚠️ [sixtysevenlf/dsh-blender-plugin](https://github.com/sixtysevenlf/dsh-blender-plugin) | 已核准 / approved | 1104 | +111 | 44 | 38d | 日增百星 | 日增 +111★ |
| ⚠️ [InariNGT-Ofiicial/dsh-bili-humanism](https://github.com/InariNGT-Ofiicial/dsh-bili-humanism) | 已核准 / approved | 88 | +78 | 7 | 1d | 新入 Top 200 | 新入 Top 200 #197 |
| ⚠️ [evilevil/dsh-purge-021rc2](https://github.com/evilevil/dsh-purge-021rc2) | 已核准 / approved | 114 | +59 | 98 | 2d | 新入 Top 200 | 新入 Top 200 #158；创建 2 天 |


| # | Project | Stars | Created | First seen | Description |
| ---: | --- | ---: | ---: | ---: | --- |
| 1 | [datit309/supergraph](https://github.com/datit309/supergraph) | 22 | 2026-05-08 | 2026-10-22 | Engineering workflow system for AI coding agents — mandatory planning, TDD, verification, review, and intelligent codebase graph analysis. |
| 2 | [urzeye/dsh-outline](https://github.com/urzeye/dsh-outline) | 19 | 2026-08-14 | 2026-10-21 | DeepSeek Harness（DSH）Web GUI 的实时大纲插件，移植自 Ophel Atlas |
| 3 | [Yuuyuko-uu/dsh-speak-up](https://github.com/Yuuyuko-uu/dsh-speak-up) | 16 | 2026-10-16 | 2026-10-22 | DSH 插件：让她在没人跟她说话的时候主动搭话（本地掷骰子，掷中就走 DSH 自己的一轮） |
| 4 | [eee1723/dsh-houdini](https://github.com/eee1723/dsh-houdini) | 12 | 2026-08-15 | 2026-10-21 | deepseek harness plugin for houdini. ai agnet for houdini |
| 5 | [zoe1nan/windowseat](https://github.com/zoe1nan/windowseat) | 10 | 2026-10-20 | 2026-10-22 | 临窗 Windowseat — 把 DeepSeek Harness 装进 Microsoft Edge 侧边栏（非官方社区扩展） |
| 6 | [jiangnanquan/dsh-uxexo](https://github.com/jiangnanquan/dsh-uxexo) | 9 | 2026-08-14 | 2026-10-21 | DSH (DeepSeek Harness) Web UI 增强插件：25 套终端美学主题、中文优先字体、文字墨色与官方峰谷提醒 · 江南泉个人开发并免费开源 |
| 7 | [wonderandyou/dsh-admin-mode](https://github.com/wonderandyou/dsh-admin-mode) | 9 | 2026-10-21 | 2026-10-21 | DSH 插件：在权限菜单里新增「管理员」档（完全访问 + 永不询问），内置官方 computer use、操控提示与自主迭代按钮。 |
| 8 | [dreamfarer-space/deepseek-harness-intelligent-ui](https://github.com/dreamfarer-space/deepseek-harness-intelligent-ui) | 8 | 2026-10-10 | 2026-10-21 | Generative, interactive UI for DeepSeek Harness (DSH): declarative components and sandboxed live widgets streamed in chat. |
| 9 | [liyown/dshx](https://github.com/liyown/dshx) | 7 | 2026-08-21 | 2026-10-22 | Build, test, and ship typed DeepSeek Harness plugins — framework, scaffolding, and a verified community Hub. |
| 10 | [Debuger-114514/dsh-bili-jar](https://github.com/Debuger-114514/dsh-bili-jar) | 6 | 2026-10-20 | 2026-10-21 | DSH 插件：右下角一只罐子，按你的兴趣轴去 B站 搜片、按互动率筛、让大模型当策展人挑五条并写理由 |
| 11 | [hairyf/dsh-office-kit](https://github.com/hairyf/dsh-office-kit) | 5 | 2026-10-20 | 2026-10-22 | Office documents, PDF, presentations, and spreadsheets for DeepSeek Harness |
| 12 | [JialaoLiu/dsh-baton](https://github.com/JialaoLiu/dsh-baton) | 5 | 2026-10-18 | 2026-10-22 | Pass the baton from Claude Code or Codex to a local DeepSeek Harness. An MCP server that hands off tasks and brings the result back. |
| 13 | [chenkezhen480/pinakes-rs](https://github.com/chenkezhen480/pinakes-rs) | 4 | 2026-09-30 | 2026-10-22 | Self-hosted knowledge service for AI agents: an LLM-maintained wiki and a business graph, searched in milliseconds, far faster than RAG, with no LLM or database on the read path. HTTP and MCP. |
| 14 | [feeling6667/dsh-purge-pro](https://github.com/feeling6667/dsh-purge-pro) | 4 | 2026-10-21 | 2026-10-21 | dsh-purge 的非官方分支（fork）：适配 DeepSeek Harness 0.2.1-rc.2、破甲内核 v3 |
| 15 | [huanlin-labs/dsh-isolation-gate](https://github.com/huanlin-labs/dsh-isolation-gate) | 4 | 2026-10-21 | 2026-10-22 | DSH plugin: default-deny directory authorization desk (isolation gate) with roster, groups, audit log and agent self-check |
| 16 | [JoeyZzZzZz/treasure-map](https://github.com/JoeyZzZzZz/treasure-map) | 4 | 2026-06-05 | 2026-10-22 | A firmware map for your AI agent, served over MCP: every dangerous call it recognizes, what it couldn’t determine, and the functions a patch changed between two versions. |
| 17 | [Plocr/dsh-commandcode](https://github.com/Plocr/dsh-commandcode) | 4 | 2026-09-18 | 2026-10-21 | Command Code for DSH｜订阅接入：将 Go / GOAT / Pro / Max 订阅接入 DeepSeek Harness，支持模型同步、推理预设、用量提醒和联网搜索。 |
| 18 | [python3603/dsh-weather-panel](https://github.com/python3603/dsh-weather-panel) | 4 | 2026-10-22 | 2026-10-22 | DeepSeek Harness 天气面板：自动定位、5 天预报、逐小时降水、中央气象台预警与台风路径（纯浏览器端，无需 API key） |
| 19 | [Talone22/dsh-notify-tone](https://github.com/Talone22/dsh-notify-tone) | 4 | 2026-08-19 | 2026-10-21 | 一个适用于dsh网页版的任务提示小插件 |
| 20 | [Ykls53/dsh-memory-inject](https://github.com/Ykls53/dsh-memory-inject) | 4 | 2026-10-21 | 2026-10-21 | 给 DeepSeek Harness 的三层记忆：常驻事实 + 会话摘要 + 全文检索。注入不花任何模型调用，写回用你当前选的模型。 |
| 21 | [Calcium-Ion/dsh-ptc-moejs](https://github.com/Calcium-Ion/dsh-ptc-moejs) | 3 | 2026-10-22 | 2026-10-22 | A PTC runtime for the DeepSeek Harness that runs the model's programs in moejs, a JavaScript engine written in Go |
| 22 | [huanlin-labs/dsh-skill-cockpit](https://github.com/huanlin-labs/dsh-skill-cockpit) | 3 | 2026-10-14 | 2026-10-22 | Skill cockpit for DSH: one page listing every skill the machine exposes, why a skill is invisible, per-skill usage counts, and a one-file toggle. |
| 23 | [iArxic/dsh-agents-notch](https://github.com/iArxic/dsh-agents-notch) | 3 | 2026-10-21 | 2026-10-22 | An always-on-top notch for DeepSeek Harness that shows which sessions are working, which need you, and which are done. Windows. |
| 24 | [Jackbessaliuz/dsh-market-expand](https://github.com/Jackbessaliuz/dsh-market-expand) | 3 | 2026-10-20 | 2026-10-21 | DSH 插件市场的补丁层：一键更新全部（退出后自动完成并重开）+ 更新安全网（启动失败自动回退）+ 本地插件更新检测与快照回滚。 |
| 25 | [Jxxxxx729/dsh-win-notify](https://github.com/Jxxxxx729/dsh-win-notify) | 3 | 2026-10-22 | 2026-10-22 | DeepSeek Harness 插件：在 Windows 通知栏提示对话完成、等待选择、等待授权或需要登录，点击通知直接跳回对应对话。Toast 以 DeepSeek Harness 应用身份发出。 |
| 26 | [Sama05/dsh-download-progress](https://github.com/Sama05/dsh-download-progress) | 3 | 2026-10-21 | 2026-10-21 | Frosted-glass download progress overlay for DeepSeek Harness (DSH) |
| 27 | [xmlans/dsh-xmlans](https://github.com/xmlans/dsh-xmlans) | 3 | 2026-10-18 | 2026-10-21 | 让兰酱住进你的电脑里和你一起Coding的DeepSeek Herness插件 |
| 28 | [Yurzi/dsh-tool-web-enhanced](https://github.com/Yurzi/dsh-tool-web-enhanced) | 3 | 2026-10-21 | 2026-10-21 | Switchable web_search and web_fetch backends for DeepSeek Harness, chosen per session: native DeepSeek, Exa, Firecrawl, Tavily, Tinyfish, model search, and local fetch with a private-network allowlist |
| 29 | [zhangguitao666/meeting-suite](https://github.com/zhangguitao666/meeting-suite) | 3 | 2026-10-22 | 2026-10-22 | Two DSH plugins: task calendar + meeting minutes (live transcription, Tencent Meeting notes, AI minutes, auto-ingest) |
| 30 | [chs-1108/dsh-purge](https://github.com/chs-1108/dsh-purge) | 2 | 2026-10-21 | 2026-10-21 | DeepSeek Harness 本机安全评测与提示词清洗插件：侧栏面板管理提示词分层、补丁、规则集与技能；带授权演练台。Local security-eval &amp; prompt-cleaning plugin for DeepSeek Harness. |
| 31 | [CNCharon/dsh-music-dock](https://github.com/CNCharon/dsh-music-dock) | 2 | 2026-10-21 | 2026-10-21 | DSH（DeepSeek Harness）侧栏音乐播放条：同步 QQ 音乐 / 网易云音乐的歌单，显示滚动歌词，支持扫码登录与音量控制。 |
| 32 | [DRheEheAMGary/dsh-plugin-system-notify](https://github.com/DRheEheAMGary/dsh-plugin-system-notify) | 2 | 2026-10-21 | 2026-10-21 | System-level desktop notifications for DeepSeek Harness, raised by the Harness itself so the banner carries its own identity. |
| 33 | [Fantety/dsh-pixel-studio](https://github.com/Fantety/dsh-pixel-studio) | 2 | 2026-10-21 | 2026-10-21 | DSH plugin for native in-chat pixel art &amp; animation: oy-pixel-style procedural shader, grids/templates, interactive canvas, PNG/GIF/spritesheet/OYPX export. |
| 34 | [feigo313/dsh-structured](https://github.com/feigo313/dsh-structured) | 2 | 2026-10-21 | 2026-10-21 | Structured output for DSH: no-label title card, tables/lists/steps, per-session toggle. |
| 35 | [fotor-ai/fotor-agent-plugins](https://github.com/fotor-ai/fotor-agent-plugins) | 2 | 2026-09-15 | 2026-10-21 | Fotor Plugin for Agents |
| 36 | [hxlog/dsh-mcp-tools](https://github.com/hxlog/dsh-mcp-tools) | 2 | 2026-10-21 | 2026-10-21 | DeepSeek Harness 最简洁、优雅的 MCP 工具管理器：在设置里添加 MCP 服务器、Postman 式请求头、连通性测试、逐工具开关。 |
| 37 | [JKL-agents/toollery-dsh](https://github.com/JKL-agents/toollery-dsh) | 2 | 2026-10-22 | 2026-10-22 | A community-maintained Toollery integration for DeepSeek Harness, enabling scalable, training-free skill and tool retrieval. |
| 38 | [Light-EI/dsh-chat-perf-css](https://github.com/Light-EI/dsh-chat-perf-css) | 2 | 2026-10-22 | 2026-10-22 | DSH long-conversation render relief: injects one CSS rule (content-visibility) so off-screen message bodies and block formulas skip style, layout and paint. |
| 39 | [LuYanFCP/dsh-kicad](https://github.com/LuYanFCP/dsh-kicad) | 2 | 2026-10-21 | 2026-10-21 | A DeepSeek Harness plugin for AI-driven PCB design in KiCad. A plugin that lets DeepSeek Harness design PCBs with KiCad. |
| 40 | [micellince/dsh-long-novel-workbench](https://github.com/micellince/dsh-long-novel-workbench) | 2 | 2026-10-21 | 2026-10-21 | 长篇中文小说工作台：章节/时间线/事实账本/伏笔/冲突/人物/高光/审稿/提案/对齐/9 Agent 分工/名家风格预设，AI 可直接生成与审稿。 |
| 41 | [MukiyoU/dsh-music-analyze](https://github.com/MukiyoU/dsh-music-analyze) | 2 | 2026-10-21 | 2026-10-21 | 给 DeepSeek Harness 加一个工具：把音频变成四张图 + 一组数字，模型看图看数字，就能和你讨论这首曲子。 |
| 42 | [ryan4yin/dsh-nu](https://github.com/ryan4yin/dsh-nu) | 2 | 2026-10-18 | 2026-10-21 | Nushell as the only shell for DeepSeek Harness (dsh): every shell call runs nu, foreign shells are refused before they spawn, and the model is taught Nushell. |
| 43 | [ShawnRen57/dsh-whale-trail](https://github.com/ShawnRen57/dsh-whale-trail) | 2 | 2026-10-21 | 2026-10-21 | Whale Trail · 鲸迹 — automatic local achievement badges for DeepSeek Harness, with whale-themed evolving artwork. |
| 44 | [sherl98/dsh-orca-ocean](https://github.com/sherl98/dsh-orca-ocean) | 2 | 2026-10-21 | 2026-10-21 | 让一头 ASCII 虎鲸游进你的 DeepSeek Harness。An animated ASCII orca for your new-session page. |
| 45 | [wuaisaber/dsh-think-zh-plus](https://github.com/wuaisaber/dsh-think-zh-plus) | 2 | 2026-10-20 | 2026-10-21 | DSH plugin: reason in Chinese (system-prompt section) + auto-expand every Think row in the Web UI |
| 46 | [wyx135230/DeepSeek-Office](https://github.com/wyx135230/DeepSeek-Office) | 2 | 2026-10-19 | 2026-10-21 | Built with the dsh-bot plugin, this is an immersive 2.5D office game where you interact and collaborate with your agent employees.基于dsh-bot插件制作，沉浸式2.5D办公室游戏，与你的agent员工交互协作 |
| 47 | [Yeezone/kanweave](https://github.com/Yeezone/kanweave) | 2 | 2026-10-21 | 2026-10-21 | Self-hosted kanban project management: projects, lists and cards with image/video attachments, DingTalk sign-in, per-project roles and invites, live multi-user sync. Runs as a standalone web app or a DeepSeek Harness plugin. |
| 48 | [Zilize/parallax-dsh](https://github.com/Zilize/parallax-dsh) | 2 | 2026-10-22 | 2026-10-22 | DeepSeek Harness (dsh) plugin for comprehensive arXiv literature search, with Jev-powered AI screening and classification. |
| 49 | [123WE-glitch/dsh-selection-actions](https://github.com/123WE-glitch/dsh-selection-actions) | 1 | 2026-10-21 | 2026-10-21 | DeepSeek Harness 插件：选中对话文字，加入对话或在可复用的侧边对话里提问（继承主对话上下文）。Selection actions for DeepSeek Harness chat. |
| 50 | [2486809961-alt/dsh-ui-sound-ns2](https://github.com/2486809961-alt/dsh-ui-sound-ns2) | 1 | 2026-10-21 | 2026-10-21 | Nintendo Switch 2 UI sounds for the DeepSeek Harness Web GUI: every click plays the matching NS2 system cue, with per-scenario mapping, task sounds and a settings page. |
| 51 | [311miaowa/DSH-File-Hub](https://github.com/311miaowa/DSH-File-Hub) | 1 | 2026-10-20 | 2026-10-21 | DeepSeek Harness 本地文件中心：按对话归档生成文件，支持跨对话搜索、稳定回指和继续加工。 |
| 52 | [54145a/dsh-workbuddy-connect-codebuddy-cli-patch](https://github.com/54145a/dsh-workbuddy-connect-codebuddy-cli-patch) | 1 | 2026-10-17 | 2026-10-22 | 将 WorkBuddy 桌面 App 或 CodeBuddy CLI 包含的模型自动接入 DeepSeek Harness，零配置使用。Bring the models in the WorkBuddy desktop app or CodeBuddy CLI into DeepSeek Harness with zero configuration. |
| 53 | [ADkun/dsh-ace](https://github.com/ADkun/dsh-ace) | 1 | 2026-10-21 | 2026-10-21 | Evolvable Markdown playbook for DSH agents — retrospectives distill lessons, consulted before tasks. |
| 54 | [ADkun/dsh-subagent-mgm](https://github.com/ADkun/dsh-subagent-mgm) | 1 | 2026-10-04 | 2026-10-21 | DeepSeek Harness Web UI 插件：子智能体目录按创建时间倒序；子智能体运行时自动在右侧栏打开它的会话、结束时自动关闭；子智能体失败时把真实原因交回父智能体。Subagent management bundle for the DSH Web UI. |
| 55 | [aikunx/dsh-cloudflare-codemode](https://github.com/aikunx/dsh-cloudflare-codemode) | 1 | 2026-10-20 | 2026-10-21 | Cloudflare 全功能管家 for DeepSeek Harness：接入官方 Code Mode MCP，search + execute 覆盖 2,500+ API（Workers / Pages / DNS / R2 / KV / D1 / Zero Trust），OAuth 2.1 与 API Token 双认证，带可视化设置面板。安装：dsh plugin --profile web add github:aikunx/dsh-cloudflare-codemode |
| 56 | [ANHANP/dsh-branch-tree](https://github.com/ANHANP/dsh-branch-tree) | 1 | 2026-10-21 | 2026-10-21 | DeepSeek Harness plugin: session branch tree with round cards, forks, subagent forests and a minimap. |
| 57 | [answertsundere/dsh-canvas-plugin](https://github.com/answertsundere/dsh-canvas-plugin) | 1 | 2026-10-19 | 2026-10-21 | Conversation branch canvas for DeepSeek Harness: session lineage map, live agent swarm, message-level fork, deterministic branch comparison |
| 58 | [apoclota/dsh-task-lens](https://github.com/apoclota/dsh-task-lens) | 1 | 2026-10-21 | 2026-10-21 | Always-on draggable task lens for DeepSeek Harness: local, zero-token step reconstruction and focused progress UI. |
| 59 | [AsterLuo/dsh-buddy-guard](https://github.com/AsterLuo/dsh-buddy-guard) | 1 | 2026-10-21 | 2026-10-21 | Fix CodeBuddy (Tencent) channel returning HTTP 400 Illegal API invocation from an unapproved channel in DeepSeek Harness by prefixing a space to the system prompt. |
| 60 | [AythyaCrispus/dsh-browser-use-native](https://github.com/AythyaCrispus/dsh-browser-use-native) | 1 | 2026-10-21 | 2026-10-21 | DSH Host plugin: 17 Playwright browser tools driven by stable accessibility-tree uids (snapshot, click, fill, drag, download). |
| 61 | [Becomingw/dsh-orca](https://github.com/Becomingw/dsh-orca) | 1 | 2026-10-21 | 2026-10-22 | Remote fleet for DeepSeek Harness: native orca_* tools and a cached fleet panel for trusted SSH hosts — status, read, grep, transactional patches, tmux jobs. |
| 62 | [biotechdrli-byte/dsh-desktop-transparency](https://github.com/biotechdrli-byte/dsh-desktop-transparency) | 1 | 2026-10-20 | 2026-10-21 | DSH Desktop 的分区透明壁纸主题：窗口看起来真的透到桌面，同时支持分区调节 |
| 63 | [caizhidian-ops/always-on-board](https://github.com/caizhidian-ops/always-on-board) | 1 | 2026-10-21 | 2026-10-21 | A local background-task board for AI coders: inspect launchd jobs and hand context to an Agent in DeepSeek Harness. |
| 64 | [Chael-Chael/dsh-ascii-whales](https://github.com/Chael-Chael/dsh-ascii-whales) | 1 | 2026-10-21 | 2026-10-21 | 让鲸群游过留白。ASCII whales, native settings and neutral frosted glass for DeepSeek Harness. |
| 65 | [charonpi/dsh-mail](https://github.com/charonpi/dsh-mail) | 1 | 2026-10-21 | 2026-10-21 | DSH 插件：通过 IMAP/SMTP 收发邮件，支持 QQ/163/126/Gmail/Outlook 等多服务商与附件上传下载 |
| 66 | [chzisnull/dsh-git-tree](https://github.com/chzisnull/dsh-git-tree) | 1 | 2026-10-21 | 2026-10-21 | DeepSeek Harness plugin: a Sourcetree-style Git workspace — changes, diff, history, branches, push, AI-written commit messages and AI-assisted conflict resolution in a full-height panel |
| 67 | [Ckarefulon/dsh-lite-git](https://github.com/Ckarefulon/dsh-lite-git) | 1 | 2026-10-16 | 2026-10-21 | A GitHub Desktop-style Git panel for the DSH right sidebar: tick-to-stage, commit, commit and push, discard into a trash, and diff preview. |
| 68 | [Dcmwfg/dsh-screenshot](https://github.com/Dcmwfg/dsh-screenshot) | 1 | 2026-10-21 | 2026-10-21 | Region screenshot for the DeepSeek Harness composer: hides the DSH window, drag a rectangle over anything behind it, annotate, and drop the PNG into the composer. Windows. |
| 69 | [dexwebcode/dsh-plugin-telegram-bot](https://github.com/dexwebcode/dsh-plugin-telegram-bot) | 1 | 2026-10-16 | 2026-10-22 | Telegram bot for DeepSeek Harness. Runs on your machine and connects to the local DSH agent (tools, files, sessions) or straight to the DeepSeek API, so you can drive DSH from any Telegram chat on any network — no domain, no VPS, with per-chat model/effort/permissions, MarkdownV2, live progress and approval buttons. |
| 70 | [Diluka/dsh-afk](https://github.com/Diluka/dsh-afk) | 1 | 2026-10-22 | 2026-10-22 | DSH AFK 插件：全局或会话级自动应答、禁用提问与持久未读记录 |
| 71 | [disantosmyha-cloud/tempguard](https://github.com/disantosmyha-cloud/tempguard) | 1 | 2026-10-21 | 2026-10-22 | Windows CPU/GPU 温度看门狗：四态熔断、演习模式、CSV 日志 |
| 72 | [Dogtiti/dsh-plugin-composer-history](https://github.com/Dogtiti/dsh-plugin-composer-history) | 1 | 2026-10-22 | 2026-10-22 | Shell-style prompt history for the DeepSeek Harness composer: ArrowUp walks back through the messages you already sent, ArrowDown walks forward and restores your draft. |
| 73 | [Dogtiti/dsh-plugin-composer-predict](https://github.com/Dogtiti/dsh-plugin-composer-predict) | 1 | 2026-10-22 | 2026-10-22 | Codex-style next-instruction prediction for the DeepSeek Harness composer: a Tab-to-accept suggestion rendered as the input placeholder. |
| 74 | [Dogtiti/dsh-plugin-subagent-bridge](https://github.com/Dogtiti/dsh-plugin-subagent-bridge) | 1 | 2026-10-22 | 2026-10-22 | Subagent-shaped bridge between Codex and DeepSeek Harness: Codex spawns DSH workers over a loopback MCP endpoint and gets final answers back; DSH agents can dispatch to Codex in return. |
| 75 | [ds-hu/dsh-auto-task-center](https://github.com/ds-hu/dsh-auto-task-center) | 1 | 2026-10-22 | 2026-10-22 | Task Center for DeepSeek Harness: scheduled and webhook tasks that deliver into a session, plus a 任务管理 agent preset |
| 76 | [dyx003/dsh-client-ui-aqua-patched](https://github.com/dyx003/dsh-client-ui-aqua-patched) | 1 | 2026-10-20 | 2026-10-22 | An adapted Aqua theme for DeepSeek Harness 0.2.1-rc.2, fixing desktop layouts and Windows titlebar controls, with floating glass sidebars in both normal and expanded views. |
| 77 | [Echo-Cry/dsh-intel-pulse](https://github.com/Echo-Cry/dsh-intel-pulse) | 1 | 2026-10-21 | 2026-10-22 | dsh自主资讯推送插件，采集资讯后自主推送会话 |
| 78 | [Esper967/dsh-music-insight](https://github.com/Esper967/dsh-music-insight) | 1 | 2026-10-21 | 2026-10-22 | 让你的dsh模型感受音乐 |
| 79 | [Excapesx/dsh-plugins](https://github.com/Excapesx/dsh-plugins) | 1 | 2026-10-22 | 2026-10-22 | 两个 DeepSeek Harness 本地插件：会话余额徽标 + 推理等级滑块，以及手机局域网免登录访问 |
| 80 | [fg-time/dsh-pp](https://github.com/fg-time/dsh-pp) | 1 | 2026-10-22 | 2026-10-22 | dsh-purge 社区衍生版 v1.1.73: 适配 DeepSeek Harness 0.2.1 (修 {{cwd}} 崩溃) + workspaceGate 按工作区启用 \| community fork of dsh-purge |
| 81 | [flyxiu/dsh-simple-tps](https://github.com/flyxiu/dsh-simple-tps) | 1 | 2026-10-21 | 2026-10-21 | DSH web GUI plugin: per-turn TTFT/TPS readout in the chat action row |
| 82 | [GoldenLoaf24h/dsh-prompt-suggestion](https://github.com/GoldenLoaf24h/dsh-prompt-suggestion) | 1 | 2026-10-20 | 2026-10-21 | Claude Code style next-prompt prediction for the DSH composer: a ghost suggestion after each turn, accepted with Tab, Alt+Right, or Enter, with history completion and a settings page for model and reasoning effort. |
| 83 | [gu040303-ai/dsh-prompt-enhancer](https://github.com/gu040303-ai/dsh-prompt-enhancer) | 1 | 2026-10-22 | 2026-10-22 | One-click plain-text prompt enhancement for DeepSeek Harness, with optional local checks and sentence review. |
| 84 | [gxz19940730-blip/dsh-boot-sequence-NICE](https://github.com/gxz19940730-blip/dsh-boot-sequence-NICE) | 1 | 2026-10-21 | 2026-10-21 | A configurable boot sequence for DeepSeek Harness: play your own video/image phases before the app UI. Ships no artwork, no dependencies, no build step. |
| 85 | [haoqiya138-source/dsh-plugin-open-in-browser](https://github.com/haoqiya138-source/dsh-plugin-open-in-browser) | 1 | 2026-10-21 | 2026-10-21 | Open any DSH sidebar file, including HTML/PDF/images whose built-in preview fails, in the system default browser — one click from a tab chip's context menu. |
| 86 | [hennysky/dsh-notch](https://github.com/hennysky/dsh-notch) | 1 | 2026-10-14 | 2026-10-21 | DeepSeek Harness 的 macOS 原生伴侣：刘海看余额，任务完成 / 等你处理时发系统通知（配套 DSH 插件） |
| 87 | [huarnot/chemdraw-bridge](https://github.com/huarnot/chemdraw-bridge) | 1 | 2026-10-21 | 2026-10-21 | ChemDraw Bridge — a DSH plugin that turns CAS numbers, names, paper/SI PDFs, and SciFinder exports into native ChemDraw source files. |
| 88 | [Hzans777/dsh-skill-mount](https://github.com/Hzans777/dsh-skill-mount) | 1 | 2026-10-21 | 2026-10-22 | DeepSeek Harness 插件：聊天栏一键挂载/关闭 SKILL，设置页可加备注、卸载、本地安装。 Skill mount tray plugin for DeepSeek Harness. |
| 89 | [Imzl-zl/dsh-models-router](https://github.com/Imzl-zl/dsh-models-router) | 1 | 2026-10-13 | 2026-10-21 | Transparent cross-provider failover routing for DeepSeek Harness agents. |
| 90 | [In-clude/dsh-approval-reminder](https://github.com/In-clude/dsh-approval-reminder) | 1 | 2026-10-18 | 2026-10-22 | 命令在 DeepSeek Harness 里等待审批时，用 Edge / Windows 桌面通知提醒你。 |
| 91 | [inMessionante19/dsh-desktop-glass](https://github.com/inMessionante19/dsh-desktop-glass) | 1 | 2026-10-20 | 2026-10-21 | Native frosted glass and full transparency for DeepSeek Harness on Windows, with live Wallpaper Engine support. |
| 92 | [ives-jz/dsh-plugin-omni-plan](https://github.com/ives-jz/dsh-plugin-omni-plan) | 1 | 2026-10-21 | 2026-10-21 | 专门用于DSH的人类注意力聚合插件 \| 此插件完全由ai开发(人类仅提供想法,未写代码) |
| 93 | [j62268781-alt/dsh-agent-browser](https://github.com/j62268781-alt/dsh-agent-browser) | 1 | 2026-10-16 | 2026-10-21 | DSH plugin for browser automation: narrow agent-browser CLI (Rust + CDP) tool surface, in-page DOM candidate extraction, settings UI, and a low-cost Jev + upstream LLM bounded decision loop. |
| 94 | [Jcnet-9527/dsh-Jpet-phone](https://github.com/Jcnet-9527/dsh-Jpet-phone) | 1 | 2026-10-21 | 2026-10-21 | dsh-pet |
| 95 | [jingchangzhao-gif/error-knowledge-base](https://github.com/jingchangzhao-gif/error-knowledge-base) | 1 | 2026-09-26 | 2026-10-21 | Error knowledge base for LLM tools: record a failure once, keep the fix, and hand it back before the model re-diagnoses. Windows CLI and daemon, DSH/Codex/Claude connectors, MCP server, PostgreSQL store. |
| 96 | [jisvrin/dsh-mobile-watch](https://github.com/jisvrin/dsh-mobile-watch) | 1 | 2026-10-22 | 2026-10-22 | DSH bundle: on every startup (any launch path) check the mobile web profile service, rebuild it when missing, and email the fresh access link |
| 97 | [jiuyou-7411/dsh-rea-plugin](https://github.com/jiuyou-7411/dsh-rea-plugin) | 1 | 2026-10-21 | 2026-10-21 | REA 逆向工作台 — 220 个逆向工具的纯中文界面，含调用统计、错误翻译、一键装引擎 |
| 98 | [jryang1997/dsh-ascii-whales](https://github.com/jryang1997/dsh-ascii-whales) | 1 | 2026-10-22 | 2026-10-22 | DSH 插件：文字组成的俯视鲸鱼背景，纯字符 / 彩色字格 + ASCII，五种鲸类，阅读区与输入框毛玻璃，鱼群避让，全滑块设置。 |
| 99 | [JYT-copy/dsh-minecraft-ui](https://github.com/JYT-copy/dsh-minecraft-ui) | 1 | 2026-10-21 | 2026-10-21 | deepseek-harness minecraft主题插件--Unofficial Minecraft fan theme for the DSH web GUI: blocky pixel UI, photo wallpapers, MC sound samples, BGM player. |
| 100 | [K1tor/dsh-req-search](https://github.com/K1tor/dsh-req-search) | 1 | 2026-10-22 | 2026-10-22 | DSH 后台项目研究引擎：说出需求即自动在后台调研并把结果交给 Agent |
| 101 | [Kadima-code/dsh-subagent-toolkit](https://github.com/Kadima-code/dsh-subagent-toolkit) | 1 | 2026-10-20 | 2026-10-22 | 子代理工具箱（DSH 插件）：按使用批次分组折叠、行内/整组删除子代理会话、子代理模型名单实时同步（逐任务选模型）。Subagent Toolkit for DeepSeek Harness. |
| 102 | [kaijia323/dsh-mobile-ui](https://github.com/kaijia323/dsh-mobile-ui) | 1 | 2026-10-22 | 2026-10-22 | DSH Web 的移动端外壳插件：抽屉式导航、触控尺寸控件、安全区适配、对话区占满整屏，桌面端行为不变。 |
| 103 | [kangjiazhen/dsh-workbuddy-codex](https://github.com/kangjiazhen/dsh-workbuddy-codex) | 1 | 2026-10-21 | 2026-10-22 | DeepSeek Harness plugin that supervises the local WorkBuddy reverse-proxy chain (wb2api gateway + Responses API bridge), so the provider port is always answering |
| 104 | [kiefeng/dsh-avatar-top](https://github.com/kiefeng/dsh-avatar-top) | 1 | 2026-10-22 | 2026-10-22 | Moves the DSH sidebar account avatar out of the bottom strip: four placements (including a zero-height inline mode), three heights, and a settings card on the Plugins page. |
| 105 | [kirito787-neet/dsh-permission-panel](https://github.com/kirito787-neet/dsh-permission-panel) | 1 | 2026-10-14 | 2026-10-21 | DSH 工作区权限面板：搜索、分组、批量修改会话权限，显示当前会话实际生效策略。产物均由 AI 生成。 |
| 106 | [KukaNo996/dsh-prompt-optimization](https://github.com/KukaNo996/dsh-prompt-optimization) | 1 | 2026-10-19 | 2026-10-22 | DeepSeek Harness提示词优化插件：将自然语言的用户提示词转换为模型易懂且便于理解的专业提示词 |
| 107 | [kx121/dsh-github-digest](https://github.com/kx121/dsh-github-digest) | 1 | 2026-10-22 | 2026-10-22 | 到点叫醒 DSH 会话，翻你关注的 GitHub 仓库和主题，挑出值得跟的变化，写日报、记判重表。只读。 |
| 108 | [lantiosity/dsh-token-fee](https://github.com/lantiosity/dsh-token-fee) | 1 | 2026-09-20 | 2026-10-22 | Real-time per-session token cost for the DeepSeek Harness web GUI, with per-provider pricing and configurable peak/off-peak tariffs |
| 109 | [lhhzmz229/dsh-api-runner](https://github.com/lhhzmz229/dsh-api-runner) | 1 | 2026-10-21 | 2026-10-22 | DSH 插件：按 YAML 配置调用后端接口、启停/接管本地 Java 服务、按字节偏移增量读日志并等待日志特征，让模型改完代码自己验证 |
| 110 | [lihuabd/dsh-workspace-mcp](https://github.com/lihuabd/dsh-workspace-mcp) | 1 | 2026-10-22 | 2026-10-22 | deepseek-harness支持加载项目级MCP的插件 |
| 111 | [lingdong0128-sys/dsh-plugin-oauth-subs](https://github.com/lingdong0128-sys/dsh-plugin-oauth-subs) | 1 | 2026-10-21 | 2026-10-21 | Backup mirror of xxww0098/dsh-plugin-oauth-subs v0.0.110 (original repo offline). OAuth subscription providers (ChatGPT Codex, Grok, GLM, Kiro, Antigravity, Cursor, Copilot, Kimi, Claude, etc.) for DeepSeek Harness. Unchanged snapshot, MIT. |
| 112 | [little-traincar/dsh-comm](https://github.com/little-traincar/dsh-comm) | 1 | 2026-10-21 | 2026-10-22 | 给你的DSH加入集成串口、TCP服务端、TCP客户端、UDP功能的调试助手，模型可直接读到调试助手接收，发送的内容，也可代替你向对端发送数据 |
| 113 | [Liyu147/dsh-enter-guard](https://github.com/Liyu147/dsh-enter-guard) | 1 | 2026-10-21 | 2026-10-21 | Double-Enter send guard for DeepSeek Harness: the first Enter only arms the composer, the second one sends, any other key cancels. Stops half-written drafts from being sent by a stray Enter. |
| 114 | [llCCII/dsh-group-tab](https://github.com/llCCII/dsh-group-tab) | 1 | 2026-10-22 | 2026-10-22 | Workgroup - a DSH right-sidebar tab showing who is working, what they are doing and how long is left. Live agent activity as a group chat. |
| 115 | [maomitgd2006/dsh-CalibGuard](https://github.com/maomitgd2006/dsh-CalibGuard) | 1 | 2026-10-20 | 2026-10-21 | CalibGuard 文件安全审计的 DeepSeek Harness 插件：本地校准 CodeBERT 门控 + 云端复核，以 agent 工具与侧边栏面板两种形态使用 |
| 116 | [minglo/dsh-skill-superpowers](https://github.com/minglo/dsh-skill-superpowers) | 1 | 2026-09-30 | 2026-10-22 | Superpowers skills for the DeepSeek Harness (dsh): a full engineering methodology served through dsh's own filesystem skill provider, with an always-on bootstrap. |
| 117 | [MnemosyneOS/dsh-agent-llm](https://github.com/MnemosyneOS/dsh-agent-llm) | 1 | 2026-10-21 | 2026-10-22 | DeepSeek Harness 插件：把本机已登录的 WorkBuddy / WorkBuddy AI / Hermes Agent 大模型接入 DSH 模型库，显示与 Agent 一致的模型名称、积分倍率与免费额度。 |
| 118 | [moondrop12138/dsh-opencode-go-usage](https://github.com/moondrop12138/dsh-opencode-go-usage) | 1 | 2026-10-21 | 2026-10-21 | OpenCode Go subscription usage page for the DSH Web UI: official 5h / weekly / monthly used-percent windows, reset countdowns and a local sampling trail. |
| 119 | [mozhi66/dsh-plugin-categories](https://github.com/mozhi66/dsh-plugin-categories) | 1 | 2026-10-10 | 2026-10-21 | DSH plugin that categorizes installed plugins (skins, MCP, tools...) with per-category batch enable/disable, drag reorder and skin auto-detection |
| 120 | [mryouyouHK/youyou-deepseek-chat-switch](https://github.com/mryouyouHK/youyou-deepseek-chat-switch) | 1 | 2026-10-22 | 2026-10-22 | Switch between DeepSeek Chat and the native Harness interface |
| 121 | [mswinandmc/dsh-session-port](https://github.com/mswinandmc/dsh-session-port) | 1 | 2026-10-21 | 2026-10-22 | 会话导入导出：把 DSH 会话连同附件导出为压缩包，或导入为当前工作区里的新会话。 |
| 122 | [Mt-Youya/dsh-plugins](https://github.com/Mt-Youya/dsh-plugins) | 1 | 2026-10-21 | 2026-10-22 | A plugin collection for DeepSeek Harness (DSH). Install this one bundle to get every plugin listed below; each plugin can also be installed on its own. |
| 123 | [my-zzylearner/dsh-web-notify](https://github.com/my-zzylearner/dsh-web-notify) | 1 | 2026-10-22 | 2026-10-22 | Desktop notifications, chime and title flash for the DeepSeek Harness (dsh) web UI |
| 124 | [myxiyues/dsh-window-size](https://github.com/myxiyues/dsh-window-size) | 1 | 2026-10-21 | 2026-10-21 | DSH 客户端插件：在「设置」里保存主窗口尺寸/位置，重启自动恢复。koffi/user32 进程内改窗口，无计划任务、无外部进程。 |
| 125 | [NewSpringWei/dsh-subagent-opencode](https://github.com/NewSpringWei/dsh-subagent-opencode) | 1 | 2026-10-22 | 2026-10-22 | 连接本地或SSH远端opencode的子智能体插件 |
| 126 | [OGHong/dsh-ascii-sharks](https://github.com/OGHong/dsh-ascii-sharks) | 1 | 2026-10-21 | 2026-10-21 | An ASCII ocean behind the New Session screen of DeepSeek Harness — fish schools that flee, orcas that hunt, themed and translucent. Engine ported from stackedlol/ascii-sharks (see NOTICE.md). |
| 127 | [Oxmyxo/dsh-markji-bridge](https://github.com/Oxmyxo/dsh-markji-bridge) | 1 | 2026-10-22 | 2026-10-22 | Give a DSH agent Markji (maimemo) cards: local SQLite cache, plain-text search, queued edits, archive, background sync with crash-resume. |
| 128 | [PrismScopes/dsh-aide](https://github.com/PrismScopes/dsh-aide) | 1 | 2026-10-20 | 2026-10-21 | AIDE (AI + IDE): VS Code-style local IDE for DeepSeek Harness — Monaco, explorer, search, Git, terminal |
| 129 | [raktim-mondol/academic-harness](https://github.com/raktim-mondol/academic-harness) | 1 | 2026-08-28 | 2026-10-22 | Academic Harness as a DeepSeek Harness (DSH) profile plugin: research persona, scientific skills catalogue, living lab notebook, and specialist subagents. |
| 130 | [rshh0520/opencode-go-useage](https://github.com/rshh0520/opencode-go-useage) | 1 | 2026-10-21 | 2026-10-22 | Opencodego package usage monitoring plugin for DSH |
| 131 | [S-anZZz/dsh-deepseek-web-sync](https://github.com/S-anZZz/dsh-deepseek-web-sync) | 1 | 2026-10-21 | 2026-10-21 | DeepSeek 网页版侧栏 · 同步：把 DeepSeek 网页版接入 Harness 右侧栏，同步主题、登录与提问。技术来源：ZCFE327 |
| 132 | [SakuraYH1080/dsh-purge-dsh0.2.1](https://github.com/SakuraYH1080/dsh-purge-dsh0.2.1) | 1 | 2026-10-21 | 2026-10-21 | dsh-purge 1.1.73+dsh0.2.1 - DSH 0.2.1-rc.2 patched build (cwd prompt-variable fix + Windows CJK path restart fix). Based on YuJunZhiXue/dsh-purge by YuJunZhiXue (MIT); base fork 2540656380/dsh-purge. Non-commercial, technical reference only. |
| 133 | [Scorpiour/dsh-mingw](https://github.com/Scorpiour/dsh-mingw) | 1 | 2026-10-21 | 2026-10-21 | Run the Windows DSH shell tool in Git Bash (MinGW64) instead of PowerShell. |
| 134 | [ShallBay/dsh-bridge-browser](https://github.com/ShallBay/dsh-bridge-browser) | 1 | 2026-10-20 | 2026-10-21 | dsh browser bridge plugin: let the model operate your own Chrome tabs while keeping your logins. Repack of @yuxianglin/dsh-bridge-browser, adapted for DSH Desktop 0.2.x. |
| 135 | [ShallBay/dsh-token-stats](https://github.com/ShallBay/dsh-token-stats) | 1 | 2026-08-24 | 2026-10-21 | dsh（DeepSeek Harness）Token 用量看板插件 \| Harness-wide token usage dashboard: aggregates billed tokens (uncached input / cache read / cache write / output) with peak/off-peak CNY cost estimate; sidebar entry opens /token-stats. |
| 136 | [sixzjd/dsh-workbuddy-connect](https://github.com/sixzjd/dsh-workbuddy-connect) | 1 | 2026-10-21 | 2026-10-21 | 将 WorkBuddy（国际版 / 国内版）模型接入 DeepSeek Harness — WorkBuddy models in DSH |
| 137 | [Soulize/dsh-identity-override](https://github.com/Soulize/dsh-identity-override) | 1 | 2026-10-20 | 2026-10-21 | A DeepSeek Harness plugin for overriding the built-in HARNESS_IDENTITY prompt without modifying core files. |
| 138 | [spinoi-code/dsh-whale-commands](https://github.com/spinoi-code/dsh-whale-commands) | 1 | 2026-10-21 | 2026-10-21 | DeepSeek Harness 微信通道的扩展命令插件：提供人设切换、历史对话、token 用量与余额、每日定时问候等功能与扩展菜单。命令由宿主进程执行，不消耗模型 token，支持热挂载。 |
| 139 | [stansz/dsh-convo-mode](https://github.com/stansz/dsh-convo-mode) | 1 | 2026-10-21 | 2026-10-21 | DeepSeek Harness bundle: a per-session conversation mode (composer chip, /conversation command, conversation policy prompt, read-only tool policy). |
| 140 | [summersummer-liu/dsh-su](https://github.com/summersummer-liu/dsh-su) | 1 | 2026-10-22 | 2026-10-22 | SketchUp 2023 bridge plugin for DeepSeek Harness: drive a live SU session (Ruby tasks, .skp save, viewport capture) through 8 agent tools. |
| 141 | [tangyixiao/dsh-workbuddy-connect-community](https://github.com/tangyixiao/dsh-workbuddy-connect-community) | 1 | 2026-10-21 | 2026-10-21 | Community-maintained WorkBuddy / WorkBuddy AI model provider for DeepSeek Harness, derived from corrinehu/dsh-workbuddy-connect (MIT). |
| 142 | [Tansukii/dsh-screenshot](https://github.com/Tansukii/dsh-screenshot) | 1 | 2026-10-22 | 2026-10-22 | Deepseek Harness内置截图工具：即时框选、标注、取色，全部本地。Built-in screenshot tool for DeepSeek Harness on Windows: instant region capture, annotations, colour picker, all local. |
| 143 | [Tazewell/dsh-session-tidy](https://github.com/Tazewell/dsh-session-tidy) | 1 | 2026-10-22 | 2026-10-22 | Delete DeepSeek Harness sessions into a recoverable 7-day trash, and edit an already-sent request by branching. A DSH plugin. |
| 144 | [TestFox000/dsh-plugin-pets](https://github.com/TestFox000/dsh-plugin-pets) | 1 | 2026-10-06 | 2026-10-22 | 会说话的小鲸鱼娘 |
| 145 | [ThzxxArt/dsh-search-tools](https://github.com/ThzxxArt/dsh-search-tools) | 1 | 2026-10-22 | 2026-10-22 | Adapter-first web search and readable page fetching for DeepSeek Harness, configured entirely in the Web UI. |
| 146 | [tianji-qingtian/dsh-engineering-skills](https://github.com/tianji-qingtian/dsh-engineering-skills) | 1 | 2026-10-21 | 2026-10-21 | DeepSeek Harness 技能插件：把 Matt Pocock 的 27 个工程/生产力技能（grilling、spec/ticket、TDD、code review、领域建模、handoff）作为技能 provider 分发 · DeepSeek Harness plugin: Matt Pocock's 27 engineering &amp; productivity skills as a bundled skill provider (11 model-invoked, 16 user-invoked) |
| 147 | [Toctsu/dsh-full-life-memory](https://github.com/Toctsu/dsh-full-life-memory) | 1 | 2026-10-22 | 2026-10-22 | A biomimetic memory plugin for DeepSeek Harness. Folds context into token clues and reconstructs memories, enabling infinite conversations without overflow. (一个 DSH 的仿生记忆插件，将上下文折叠为 Token 线索并重建记忆，告别上下文溢出，给所有模型完整的一生。) |
| 148 | [Tryanstm/dsh-chatcanvas](https://github.com/Tryanstm/dsh-chatcanvas) | 1 | 2026-10-21 | 2026-10-21 | Editable canvases, rich messages, interactive UI, math plots and music inside DeepSeek Harness. |
| 149 | [tszmzz1026/dsh-epindel-boot-animation](https://github.com/tszmzz1026/dsh-epindel-boot-animation) | 1 | 2026-10-19 | 2026-10-22 | DSH 原创主题与效率扩展：液态玻璃、头像裁切与命名、长期记忆、目标待办、今日计划；。 |
| 150 | [uugvkbvkdjbsdbvwxxl/dsh-plugin-web-annotate](https://github.com/uugvkbvkdjbsdbvwxxl/dsh-plugin-web-annotate) | 1 | 2026-10-22 | 2026-10-22 | Annotate elements on a page in the DSH built-in browser and send the comments to the session in one click. |
| 151 | [Vincent-chk/dsh-ponytail](https://github.com/Vincent-chk/dsh-ponytail) | 1 | 2026-10-21 | 2026-10-21 | Ponytail (lazy senior dev mode) for DeepSeek Harness: always-on smallest-complete-change rules and six ponytail skills, one bundle with no slash command. |
| 152 | [wei2yun/dsh-api-cost](https://github.com/wei2yun/dsh-api-cost) | 1 | 2026-10-22 | 2026-10-22 | DeepSeek Harness plugin: live API cost per chat, subagents, and the whole machine. |
| 153 | [Witherwithwinter/dsh-ccx](https://github.com/Witherwithwinter/dsh-ccx) | 1 | 2026-10-21 | 2026-10-22 | Rice-dog/code-codex 的 DeepSeek Harness 改版 |
| 154 | [ws1234567891011/dsh-interim-narration](https://github.com/ws1234567891011/dsh-interim-narration) | 1 | 2026-10-21 | 2026-10-21 | 让 DeepSeek Harness 的 agent 每轮先讲理解与计划、在工具调用之间用正文写过程叙述（边做边说），并可在应用内直接改参数 |
| 155 | [Xantares330/dsh-codex-consult](https://github.com/Xantares330/dsh-codex-consult) | 1 | 2026-10-22 | 2026-10-22 | On-demand consultation with the OpenAI Codex CLI from DeepSeek Harness: read-only reviews, inline evidence, verified model provenance, quota guardrails and durable call logs. |
| 156 | [xiaoso456/dsh-tool-step-note](https://github.com/xiaoso456/dsh-tool-step-note) | 1 | 2026-10-22 | 2026-10-22 | 给 DeepSeek Harness 工具加上模型填写的步骤说明 |
| 157 | [xiaoxiaosrm/dsh-search-picker](https://github.com/xiaoxiaosrm/dsh-search-picker) | 1 | 2026-10-21 | 2026-10-21 | Sidebar search-provider picker for DeepSeek Harness (DSH): switch ctx.web between DeepSeek Messages, DeepSeek Search API, OpenCode Go, Tavily and Exa. |
| 158 | [xindong/dsh-client-canvas](https://github.com/xindong/dsh-client-canvas) | 1 | 2026-08-19 | 2026-10-21 | AI-native multimodal canvas for DeepSeek Harness. Preview images, video, audio, 3D models, PDFs, documents and code; connect ideas and collaborate with agents in a persistent local workspace. |
| 159 | [xinming-chenniang/dsh-button](https://github.com/xinming-chenniang/dsh-button) | 1 | 2026-10-21 | 2026-10-21 | Editable quick-action buttons for the DeepSeek Harness composer: send 「继续」 or your own saved text, resend your last message, hide/restore presets. |
| 160 | [xinming-chenniang/dsh-outcomes](https://github.com/xinming-chenniang/dsh-outcomes) | 1 | 2026-10-22 | 2026-10-22 | Deliverables registry for DeepSeek Harness (dsh): register reports, pages, docs, sheets, images and datasets into one searchable, previewable, recoverable list. |
| 161 | [XXGxiaoyu/dsh-session-sync](https://github.com/XXGxiaoyu/dsh-session-sync) | 1 | 2026-10-21 | 2026-10-21 | LAN session sync for DSH: auto-discover devices running this plugin, browse/pull/push sessions over HTTP with SHA-256 verification, and keep a local-only nickname per device. ｜ DSH 局域网会话同步：自动发现装了本插件的设备、仅存本机的设备命名、浏览/拉取/推送会话，带 SHA-256 校验。 |
| 162 | [Yeezone/dsh-teambition](https://github.com/Yeezone/dsh-teambition) | 1 | 2026-10-21 | 2026-10-21 | 把钉钉 Teambition 接进 DeepSeek Harness 侧边栏：在 DSH 内浏览项目 / 任务列表 / 卡片，新建与移动卡片，并把任意卡片放到指定的 DSH 工作区里执行。Teambition panel for the DSH Web GUI. |
| 163 | [yinque91/dsh-live-narrator](https://github.com/yinque91/dsh-live-narrator) | 1 | 2026-10-21 | 2026-10-21 | 小嘴 · 实时解说 —— DeepSeek Harness 输入框下方的语音解说插件 |
| 164 | [yinque91/dsh-mood](https://github.com/yinque91/dsh-mood) | 1 | 2026-10-21 | 2026-10-21 | 情绪引擎 —— 收到「谢谢」更有干劲，被骂就掉效率，掉到底罢工。DeepSeek Harness 插件 |
| 165 | [yschdxm/dsh-windows-notify](https://github.com/yschdxm/dsh-windows-notify) | 1 | 2026-10-21 | 2026-10-21 | Windows native toast notifications for DeepSeek Harness, with click-to-focus and jump-to-conversation. |
| 166 | [YuKimCai/dsh-mattpocock-skill](https://github.com/YuKimCai/dsh-mattpocock-skill) | 1 | 2026-10-21 | 2026-10-21 | Matt Pocock 的 27 个工程技能（grilling 需求拷问、spec/工单拆分、TDD、双轴 code review、领域建模、wayfinder 决策地图、retro 复盘）打包成 DeepSeek Harness 的 Agent 预设。装上即用：模型自主调用 11 个，另 16 个用 /技能名 点名。它解决的不是写代码，是在动手之前把「你到底要什么」问清楚、钉死、拆成可执行的工单。 |
| 167 | [YukoZ1227/dsh-ui-design-toggle](https://github.com/YukoZ1227/dsh-ui-design-toggle) | 1 | 2026-10-21 | 2026-10-21 | 由于 ui-ux-pro-max 原生不支持 DSH 而重建的插件：在 DSH 侧边栏一键启用/停用 ui-ux-pro-max 设计技能（适配 DSH 0.2.1-rc.2） |
| 168 | [YumenoSayuri/dsh-time-weaver](https://github.com/YumenoSayuri/dsh-time-weaver) | 1 | 2026-10-21 | 2026-10-21 | 时空编织者 (Time Weaver) — 全能会话流控制：用户消息回溯重填、AI 回复原地编辑、语义占位撤回删除、保全工具链的时空回退重新生成。 |
| 169 | [yxue301603/dsh-everyday-plugins](https://github.com/yxue301603/dsh-everyday-plugins) | 1 | 2026-10-21 | 2026-10-21 | DSH 日常工具箱 · Eight native everyday plugins |
| 170 | [zdt3476/dsh-metrics](https://github.com/zdt3476/dsh-metrics) | 1 | 2026-10-20 | 2026-10-22 | DeepSeek Harness 的 Token 用量与成本看板：按模型/供应商/项目/会话统计调用与缓存命中，接入 OpenRouter 单价估算成本 |
| 171 | [zengshuaishuai/dsh-mcp-manager-web](https://github.com/zengshuaishuai/dsh-mcp-manager-web) | 1 | 2026-10-22 | 2026-10-22 | DeepSeek Harness 的 MCP 可视化管理器：列表 + 详情页，查看工具 schema / 提示 / 资源，支持增删启停与连接测试 |
| 172 | [zhangaiyu1996/dsh-glm-usage](https://github.com/zhangaiyu1996/dsh-glm-usage) | 1 | 2026-10-22 | 2026-10-22 | 展示智谱 GLM Coding Plan 用量的 DSH 插件 — sidebar quota card for Zhipu / Z.AI Coding Plan in DeepSeek Harness |
| 173 | [Zhr65/dsh-skill-auditor](https://github.com/Zhr65/dsh-skill-auditor) | 1 | 2026-10-17 | 2026-10-21 | DSH 能力管家：说功能就能用上装过的插件 —— 能力路由（按任务匹配到该调的工具名）、主动体检（版本落后 / 运行时故障 / 基线通过率）、利用率盘点（哪些能力从没用上）。npm: dsh-skill-auditor |
| 174 | [zlh124/dsh-plugin-tetris](https://github.com/zlh124/dsh-plugin-tetris) | 1 | 2026-10-21 | 2026-10-21 | Play Tetris in the DeepSeek Harness Web GUI while the agent works |
| 175 | [zudazhuang/dsh-update-safe](https://github.com/zudazhuang/dsh-update-safe) | 1 | 2026-10-03 | 2026-10-21 | DeepSeek Harness update plugin: official release checks, scheduled updates and supervised rollback |
| 176 | [zuojinxin/dsh-sidebar-manager](https://github.com/zuojinxin/dsh-sidebar-manager) | 1 | 2026-10-20 | 2026-10-21 | 让 DSH 的扩展入口和视图标签支持折叠、排序、隐藏。Collapse, reorder and hide the DSH sidebar extensions and the conversation view tabs. |
| 177 | [111222cjyq/dsh-curate](https://github.com/111222cjyq/dsh-curate) | 0 | 2026-10-21 | 2026-10-21 | Human-in-the-loop context curation workbench for DeepSeek Harness: triage turns, rewrite messages, then compress the session history in place with model-written summaries or the official /compact. Every write is backed up locally. |
| 178 | [111xjyuan/dsh-desktop-sidecar](https://github.com/111xjyuan/dsh-desktop-sidecar) | 0 | 2026-10-21 | 2026-10-21 | Native Windows desktop control for DeepSeek Harness: UIA control tree, offline OCR, verified clicks, Unicode typing. Zero external runtime. |
| 179 | [111xjyuan/dsh-taffy-pet](https://github.com/111xjyuan/dsh-taffy-pet) | 0 | 2026-10-22 | 2026-10-22 | 永雏塔菲桌宠 · DeepSeek Harness 插件：透明立绘换装、点击互动、随机语音、粉色余额气泡、四边吸附 |
| 180 | [1250589385/dsh-stall-guard](https://github.com/1250589385/dsh-stall-guard) | 0 | 2026-10-20 | 2026-10-21 | DSH 卡顿守卫：下载卡住时自动中止，并把「换源」提示写给智能体。按类型独立配置，不调用任何模型。 |
| 181 | [1250589385/DSH-Test-Autofix](https://github.com/1250589385/DSH-Test-Autofix) | 0 | 2026-10-19 | 2026-10-21 | DSH 测试自动修复：给 agent 一个 run_tests 工具，跑测试并把结构化失败（文件/行号/断言）直接交给它修复。自动识别 pytest / jest / vitest / cargo / go / npm，Windows 中文断言不乱码，同一失败反复出现时自动停止。 |
| 182 | [1378616343/dsh-zoom-viewer](https://github.com/1378616343/dsh-zoom-viewer) | 0 | 2026-10-22 | 2026-10-22 | DSH plugin: zoomable image viewer for the DeepSeek Harness sidebar - wheel zoom, drag to pan, fit/width/1:1, fullscreen. |
| 183 | [1644ye/pages](https://github.com/1644ye/pages) | 0 | 2026-10-22 | 2026-10-22 | Shopify Page Studio for DeepSeek Harness: conversation generation, prompt workbench and Matrixify XLSX pages and menus. |
| 184 | [1708994293-hue/dsh-auto-update](https://github.com/1708994293-hue/dsh-auto-update) | 0 | 2026-10-21 | 2026-10-21 | DSH 插件：启动时检查已启用插件的新版本，列出并询问是否更新 |
| 185 | [1731988818/dsh-lan-remote](https://github.com/1731988818/dsh-lan-remote) | 0 | 2026-10-22 | 2026-10-22 | Expose the running DeepSeek Harness desktop web GUI to a phone - the same session through a loopback reverse proxy, with LAN and Tailscale token URLs. No second harness. |
| 186 | [2073493463-crypto/dsh-splash-animation-setup](https://github.com/2073493463-crypto/dsh-splash-animation-setup) | 0 | 2026-10-22 | 2026-10-22 | 在 DSH Desktop 上安装、配置和排查开屏动画插件的可复现流程 |
| 187 | [2239058652/dsh-loomy-connect](https://github.com/2239058652/dsh-loomy-connect) | 0 | 2026-10-21 | 2026-10-22 | Fork of gdrpzym/dsh-loomy-connect adapted to DeepSeek Harness 0.2.1. |
| 188 | [2384418321/dsh-integration-settings](https://github.com/2384418321/dsh-integration-settings) | 0 | 2026-10-22 | 2026-10-22 | DSH 设置页：MCP 管理与思考档位解锁（本地分叉版）— 思考档位与可用模型清单分离，先预览差异再写入。 |
| 189 | [240xu/dsh-message-ops](https://github.com/240xu/dsh-message-ops) | 0 | 2026-09-27 | 2026-10-22 | DSH web plugin: message rollback + delete + branch in one. 消息回滚/删除/分支三合一（surface replace 语义，磁盘级分支 fork，零 npm 依赖，Windows/Termux 双端） |
| 190 | [240xu/dsh-session-lazy-view](https://github.com/240xu/dsh-session-lazy-view) | 0 | 2026-09-19 | 2026-10-22 | DSH web plugin: read-only lazy session viewer — lists sessions (stat-only) and peeks at the last N zstd frames without full decompression. 会话惰性查看器（纯只读） |
| 191 | [240xu/dsh-session-search](https://github.com/240xu/dsh-session-search) | 0 | 2026-09-27 | 2026-10-22 | DSH web plugin: cross-session full-text search — incremental index of all session logs, fenced API, agent tool session_search, standalone panel. 跨会话全文搜索（增量索引+信任围栏+agent 工具+独立面板） |
| 192 | [361533652/dsh-token-bi](https://github.com/361533652/dsh-token-bi) | 0 | 2026-10-21 | 2026-10-21 | Token spend dashboard for DeepSeek Harness — daily columns, hourly rhythm, model/workspace splits, call tree, per-turn timeline. |
| 193 | [439436269-ctrl/dsh-blend-preview](https://github.com/439436269-ctrl/dsh-blend-preview) | 0 | 2026-10-21 | 2026-10-21 | Preview Blender .blend files in the DeepSeek Harness right Sidebar: cached headless GLB export plus a dependency-free WebGL viewer with scene statistics. |
| 194 | [439436269-ctrl/dsh-stl-preview](https://github.com/439436269-ctrl/dsh-stl-preview) | 0 | 2026-10-21 | 2026-10-21 | Preview STL meshes in the DeepSeek Harness right Sidebar: dependency-free WebGL viewport plus size, volume, surface area and watertightness. |
| 195 | [598934321/dsh-quota-pill](https://github.com/598934321/dsh-quota-pill) | 0 | 2026-10-21 | 2026-10-21 | Quota pill for DeepSeek Harness: how much is left on every LLM subscription, in one pill |
| 196 | [654970/dsh-typing-studio](https://github.com/654970/dsh-typing-studio) | 0 | 2026-10-21 | 2026-10-21 | Bilingual Chinese and English typing practice for DeepSeek Harness, with timed passages, IME-aware scoring, and local records. |
| 197 | [757400/dsh-workbuddy-checkin](https://github.com/757400/dsh-workbuddy-checkin) | 0 | 2026-10-22 | 2026-10-22 | 结合work Buddy connect插件，自动进行workbuddy每日签到，不打开workbuddy也能拿积分。并提供可以自己打开（默认关闭）的自动程序反馈 |
| 198 | [7gzgn/dsh-my-plugins](https://github.com/7gzgn/dsh-my-plugins) | 0 | 2026-10-22 | 2026-10-22 | See what you actually installed: a chip shows how many plugins your profile really loads, and a searchable panel lists every one with its version, its author-written one-liner, and whether it is built-in or third-party. Read-only, zero config. |
| 199 | [aawef/dsh-skill-manager-tags](https://github.com/aawef/dsh-skill-manager-tags) | 0 | 2026-10-21 | 2026-10-21 | A DSH plugin to manage and organize skills using tags. (基于标签管理的 DSH 技能管理器) |
| 200 | [Adingo001/dsh-notification-desktop](https://github.com/Adingo001/dsh-notification-desktop) | 0 | 2026-10-21 | 2026-10-21 | Turn-finished desktop notifications for DeepSeek Harness 0.2.x · DSH 完成提醒（宿主投影 + WinRT toast） |
| 201 | [ADkun/dsh-insert-context](https://github.com/ADkun/dsh-insert-context) | 0 | 2026-10-06 | 2026-10-21 | DeepSeek Harness 插件：任务执行到第 X 步起，每 Y 步往智能体自己的上下文里注入一次自定义消息（共 Z 次，文案支持 {{step}} 占位），并可在用户消息末尾追加一句话；带总开关，全部在设置页配置。Scheduled context injection for DSH agents. |
| 202 | [ADkun/dsh-windows-notifier](https://github.com/ADkun/dsh-windows-notifier) | 0 | 2026-10-06 | 2026-10-21 | DeepSeek Harness 插件：任何对话把控制权交还给你时弹一条 Windows 原生通知 —— 任务完成、需要你回答、等待审批；后台运行的会话同样通知，点通知可直接打开 DSH。Native Windows toast notifications for DSH. |
| 203 | [Aegink/dsh-channel-qq](https://github.com/Aegink/dsh-channel-qq) | 0 | 2026-10-18 | 2026-10-21 | DeepSeek Harness 的 QQ 渠道插件（OneBot v11 / SnowLuma）：工具面、长期记忆、知识库、主动行为与管理后台 |
| 204 | [Aero123421/dsh-skills-manager](https://github.com/Aero123421/dsh-skills-manager) | 0 | 2026-10-21 | 2026-10-21 | Manage Agent Skills from the DSH sidebar (project + user roots) |
| 205 | [AhaCrazy/dsh-action-hub](https://github.com/AhaCrazy/dsh-action-hub) | 0 | 2026-10-22 | 2026-10-22 | DSH plugin: a user-invoked Action shelf for reusable prompts and flows - no context cost, no automatic triggering. |
| 206 | [AhaCrazy/dsh-nav-history](https://github.com/AhaCrazy/dsh-nav-history) | 0 | 2026-10-22 | 2026-10-22 | DSH plugin: global back/forward navigation history across sessions and whole-page panels, with a configurable bottom strip and browser-style shortcuts. |
| 207 | [AI8888-SHOP/dsh-codex-sync](https://github.com/AI8888-SHOP/dsh-codex-sync) | 0 | 2026-10-21 | 2026-10-22 | 我们自己维护、适配 dsh 0.2.1-rc.2 的 Codex↔DSH 双向同步插件（派生自 Walvez/dsh-codex-sync，MIT，鸣谢上游） |
| 208 | [AIcivilization/dsh-mishu](https://github.com/AIcivilization/dsh-mishu) | 0 | 2026-10-21 | 2026-10-22 | DSH 小秘书：替你盯着 GitHub 通知（按当前状态分诊，已解决的替你关掉）并记住你交代的到期事项（账单、续费、证件、生日），密码只进系统钥匙串。中英双语，macOS/Windows/Linux \| DSH secretary: triages GitHub notifications by real state, tracks dated reminders, keychain-only secrets. |
| 209 | [AIcivilization/dsh-pick](https://github.com/AIcivilization/dsh-pick) | 0 | 2026-10-18 | 2026-10-22 | DSH 插件选购顾问：说需求 → 算去噪指标 → 给首选/备选/不推荐。Plugin advisor for DeepSeek Harness: pick the right plugin from 2,250+ candidates with denoised npm metrics. |
| 210 | [AIcivilization/dsh-tingdong](https://github.com/AIcivilization/dsh-tingdong) | 0 | 2026-10-20 | 2026-10-22 | 听懂：把英文有声读物（MP3）或英文文档变成听力课——本机识别每一句、AI 朗读翻译、精听与间隔复习，练到一听就懂。DeepSeek Harness (dsh) 插件 \| Turn English audiobooks into listening lessons for dsh. |
| 211 | [akash-digitavision/my-rea-toolkit](https://github.com/akash-digitavision/my-rea-toolkit) | 0 | 2026-10-21 | 2026-10-21 | REA |
| 212 | [AlannerFranklin/dsh-cutout-pet](https://github.com/AlannerFranklin/dsh-cutout-pet) | 0 | 2026-10-20 | 2026-10-21 | Turn any picture into a floating desk pet in the DeepSeek Harness Web UI: local cutout, sticker outline, idle animation, and a live account-balance bubble. |
| 213 | [AlannerFranklin/dsh-relay-isolation](https://github.com/AlannerFranklin/dsh-relay-isolation) | 0 | 2026-10-22 | 2026-10-22 | Provision a separate DSH_HOME for a model relay, so relay traffic never shares your main Harness sessions or credentials. |
| 214 | [Alexis-ray/dsh-memory-lite](https://github.com/Alexis-ray/dsh-memory-lite) | 0 | 2026-10-21 | 2026-10-21 | Workspace-scoped long-term memory for DeepSeek Harness: plain Markdown, zero network, no automatic model calls. |
| 215 | [amberpulse/dsh-storymine](https://github.com/amberpulse/dsh-storymine) | 0 | 2026-10-21 | 2026-10-21 | 写东西卡住了就问一句"别人怎么写这一段"，条目推到右侧面板，正文里不刷屏。 |
| 216 | [an-an-618/dsh-hook-followup](https://github.com/an-an-618/dsh-hook-followup) | 0 | 2026-10-21 | 2026-10-21 | Hook follow-up for DeepSeek Harness: one anchor question plus 1-3 clickable user-voice quick replies under each turn. |
| 217 | [an-an-618/dsh-intelligent-ui](https://github.com/an-an-618/dsh-intelligent-ui) | 0 | 2026-10-21 | 2026-10-21 | Intelligent UI for DeepSeek Harness: declarative, interactive cards rendered by a Client interpreter. |
| 218 | [anchoredship/dsh-audio-transcribe](https://github.com/anchoredship/dsh-audio-transcribe) | 0 | 2026-10-21 | 2026-10-21 | Offline audio-to-text for DeepSeek Harness: transcribe with SenseVoice and record system playback — fully local. |
| 219 | [androidly/dsh-restart-control](https://github.com/androidly/dsh-restart-control) | 0 | 2026-10-22 | 2026-10-22 | DSH Web sidebar restart control: graceful host exit, supervisor-aware replacement, pid-verified status notice. |
| 220 | [AnichHaveatry/dsh-client-ui-branch-map](https://github.com/AnichHaveatry/dsh-client-ui-branch-map) | 0 | 2026-10-22 | 2026-10-22 | DSH 会话视图「分支图」：把当前工作区的对话画成一张图——每条消息是一个节点，每个 Session 是节点上的分支引用，可以像 git 分支一样从任意节点切出去；归档的对话不进图。 DeepSeek Harness conversation view: the current workspace as a branch map, with Sessions as branch refs you can fork from. |
| 221 | [anonamerjaxon-dev/dsh-model-grid](https://github.com/anonamerjaxon-dev/dsh-model-grid) | 0 | 2026-10-22 | 2026-10-22 | Responsive card grid for the DeepSeek Harness composer model picker — host-only, no client bundle rebuild. |
| 222 | [anonamerjaxon-dev/dsh-preset-categorizer](https://github.com/anonamerjaxon-dev/dsh-preset-categorizer) | 0 | 2026-10-22 | 2026-10-22 | Categorize plugins, MCP servers and skills into DeepSeek Harness agent presets. |
| 223 | [anonamerjaxon-dev/dsh-preset-inspector](https://github.com/anonamerjaxon-dev/dsh-preset-inspector) | 0 | 2026-10-22 | 2026-10-22 | Live preset inventory for DeepSeek Harness: which preset holds which tools, MCP servers and skills, in the Web GUI and from the CLI. |
| 224 | [Anonymity606/super-baby](https://github.com/Anonymity606/super-baby) | 0 | 2026-10-22 | 2026-10-22 | 超级大宝贝：DeepSeek Harness 左下角的像素核导弹，连点蓄力、音效、爆炸与退出。 |
| 225 | [AntMan-xtalgh/dsh-prompt-enhance](https://github.com/AntMan-xtalgh/dsh-prompt-enhance) | 0 | 2026-10-22 | 2026-10-22 | ✨ Prompt enhancement button for the DeepSeek Harness composer — rewrites your rough draft into a clear prompt, in place. |
| 226 | [ApakohZzz/dsh-custom-json-mcp](https://github.com/ApakohZzz/dsh-custom-json-mcp) | 0 | 2026-10-21 | 2026-10-22 | DSH-JsonMCP配置UI及组件 |
| 227 | [apolenkov/dsh-provider-proxy](https://github.com/apolenkov/dsh-provider-proxy) | 0 | 2026-10-22 | 2026-10-22 | Per-provider and per-model outbound proxy routing for DeepSeek Harness, with a Plugins configuration UI |
| 228 | [arcnapan/dsh-chat-answer-anchor](https://github.com/arcnapan/dsh-chat-answer-anchor) | 0 | 2026-10-22 | 2026-10-22 | Freeze the DSH chat scroll position so new replies no longer drag the viewport to the bottom. |
| 229 | [Arienax/dsh-gxworks](https://github.com/Arienax/dsh-gxworks) | 0 | 2026-10-22 | 2026-10-22 | DeepSeek Harness bundle: connects the GXWorks Agent MCP server and ships its PLC task-routing skill. |
| 230 | [arrow1031-dev/dsh-qq-bot](https://github.com/arrow1031-dev/dsh-qq-bot) | 0 | 2026-09-20 | 2026-10-22 | 把 QQ 接到 DSH Agent 的插件（社区化维护）：经 NapCat / OneBot 11 收发消息，每个 QQ 会话一个 DSH Agent。 |
| 231 | [Asheep233/dsh-session-wake](https://github.com/Asheep233/dsh-session-wake) | 0 | 2026-10-21 | 2026-10-21 | Instant wake for running DSH sessions — a host-plane bridge using the official sessionController.prompt() API (HTTP + file queue). Why headless can't. |
| 232 | [Autodog875/dsh-agent-progress](https://github.com/Autodog875/dsh-agent-progress) | 0 | 2026-10-21 | 2026-10-21 | 常驻任务进度条 — DeepSeek Harness 插件：显示当前对话与所有对话的实时任务进度 |
| 233 | [awawuming/dsh-model-hub](https://github.com/awawuming/dsh-model-hub) | 0 | 2026-10-21 | 2026-10-21 | DeepSeek Harness 模型选择器：先按 API 通道、再按模型家族分组的下拉菜单，中转站几百个模型也能秒找。 |
| 234 | [Ayelsh/dsh-glass-theme](https://github.com/Ayelsh/dsh-glass-theme) | 0 | 2026-10-22 | 2026-10-22 | An Apple Liquid Glass skin for the DeepSeek Harness Web GUI: token-level re-key, glass chrome, a grouped model picker and a merged usage panel. |
| 235 | [BAOXIAOPAI/dsh-glacier](https://github.com/BAOXIAOPAI/dsh-glacier) | 0 | 2026-10-22 | 2026-10-22 | Glacier-blue glass UI layer for the DeepSeek Harness web client — light-field canvas, frosted panels, flat controls. Shipped as a dsh plugin. |
| 236 | [basaltfold/douyin-expert](https://github.com/basaltfold/douyin-expert) | 0 | 2026-10-21 | 2026-10-21 | 抖音专家 — 22 个抖音/多平台/海外内容创作与数据分析技能的 DeepSeek Harness 宿主插件 |
| 237 | [basaltfold/dsh-tencent-channel-fix](https://github.com/basaltfold/dsh-tencent-channel-fix) | 0 | 2026-10-20 | 2026-10-21 | Fixes the buddy / workbuddy channel 400 (code 11128, "Illegal API invocation from an unapproved channel") in DeepSeek Harness, and re-applies the fix after every dsh-our-free-model upgrade. |
| 238 | [basaltfold/xiaohongshu-expert](https://github.com/basaltfold/xiaohongshu-expert) | 0 | 2026-10-21 | 2026-10-21 | 小红书专家 — 11 个小红书内容创作与数据分析技能的 DeepSeek Harness 宿主插件 |
| 239 | [bbaz123/dsh-auto-plan-executor](https://github.com/bbaz123/dsh-auto-plan-executor) | 0 | 2026-10-22 | 2026-10-22 | DSH 自动方案执行插件：四条件触发、方案冻结、任务图与步骤账本、门禁预算、完整度闸门与八部分报告。 |
| 240 | [bbaz123/dsh-openviking-autostart](https://github.com/bbaz123/dsh-openviking-autostart) | 0 | 2026-10-22 | 2026-10-22 | DSH OpenViking 自动启动与恢复插件：会话前确保本机记忆服务可用。 |
| 241 | [bbaz123/dsh-operation-security](https://github.com/bbaz123/dsh-operation-security) | 0 | 2026-10-22 | 2026-10-22 | DSH 操作安全插件：工具 pre-execute 分类、单调 guard、插件生命周期 DPIP 门禁与审计留痕。 |
| 242 | [bbaz123/dsh-plugin-verification](https://github.com/bbaz123/dsh-plugin-verification) | 0 | 2026-10-22 | 2026-10-22 | DSH 回合验证门插件：变化分析、经验检索、回归、断言、只读审查，含失败修复循环与收尾交接。 |
| 243 | [bbaz123/dsh-self-plugin-manager](https://github.com/bbaz123/dsh-self-plugin-manager) | 0 | 2026-10-22 | 2026-10-22 | DSH 自管理插件管理器：插件安装、升级、回滚、健康检查与注册表扫描。 |
| 244 | [bbaz123/dsh-turn-chime](https://github.com/bbaz123/dsh-turn-chime) | 0 | 2026-10-22 | 2026-10-22 | DSH 回合结束提示音插件：每轮任务结束时在宿主端播放提示音。 |
| 245 | [Bear0117/dsh-plugin-recursive-harness](https://github.com/Bear0117/dsh-plugin-recursive-harness) | 0 | 2026-10-22 | 2026-10-22 | Recursive Harness for DeepSeek Harness (dsh): Propose, Probe, Compose loops and a cross-task experience library (Harness², arXiv:2610.14224). Work in progress. |
| 246 | [BillYuan01/dsh-qwenpaw-bridge](https://github.com/BillYuan01/dsh-qwenpaw-bridge) | 0 | 2026-10-21 | 2026-10-21 | DSH-side bundle plugin for QwenPaw: live assistant streaming, hot-switchable permission presets, and a model catalog in _meta over standard ACP v1. |
| 247 | [BlackRasion/dsh-chat-avatars](https://github.com/BlackRasion/dsh-chat-avatars) | 0 | 2026-10-21 | 2026-10-22 | 给 DeepSeek Harness (dsh) Web GUI 的聊天头像插件：全局默认与工作区覆盖、交互裁剪、动图头像、大图预览与拍一拍。 |
| 248 | [Blake-John/dsh-scientist](https://github.com/Blake-John/dsh-scientist) | 0 | 2026-10-20 | 2026-10-21 | A agent that help you work in your field. |
| 249 | [blue-a11y/dsh-thinking-style](https://github.com/blue-a11y/dsh-thinking-style) | 0 | 2026-10-20 | 2026-10-21 | 还原 DeepSeek Harness 初版 Thinking 样式，恢复字号、蓝色流光与思考行扫光，支持思考区域语言选择。 |
| 250 | [BlueX888/dsh-plugin-oss-contrib](https://github.com/BlueX888/dsh-plugin-oss-contrib) | 0 | 2026-10-22 | 2026-10-22 | Deep Harness plugin for OSS contribution pipeline (hunt/ship/track) |
| 251 | [bosenok/dsh-add-to-chat](https://github.com/bosenok/dsh-add-to-chat) | 0 | 2026-10-17 | 2026-10-21 | Add selected chat text to the composer as an annotation (DeepSeek Harness plugin). |
| 252 | [bosenok/dsh-app-usage](https://github.com/bosenok/dsh-app-usage) | 0 | 2026-10-17 | 2026-10-21 | Local session statistics with a per-provider breakdown for DeepSeek Harness. |
| 253 | [bosenok/dsh-mermaid](https://github.com/bosenok/dsh-mermaid) | 0 | 2026-10-17 | 2026-10-21 | Render mermaid fenced code blocks as diagrams in DeepSeek Harness. |
| 254 | [bosenok/dsh-openrouter-sync](https://github.com/bosenok/dsh-openrouter-sync) | 0 | 2026-10-17 | 2026-10-22 | Keep the DSH openrouter provider model list in sync with OpenRouter's currently-free models. |
| 255 | [bosenok/dsh-zai-mcp](https://github.com/bosenok/dsh-zai-mcp) | 0 | 2026-10-17 | 2026-10-21 | Install Z.AI MCP servers into DeepSeek Harness: skill, bootstrap and agent preset. |
| 256 | [bosenok/dsh-zai-usage](https://github.com/bosenok/dsh-zai-usage) | 0 | 2026-10-17 | 2026-10-21 | Z.AI coding-plan quota panel for DeepSeek Harness. |
| 257 | [brantshin/dsh-native-glass](https://github.com/brantshin/dsh-native-glass) | 0 | 2026-10-22 | 2026-10-22 | Native macOS glass for Anywhere Labs DSH Desktop — transparent chat surfaces with live behind-window blur. |
| 258 | [Broknsun/dsh-desktop-shell-plus](https://github.com/Broknsun/dsh-desktop-shell-plus) | 0 | 2026-10-21 | 2026-10-21 | 深色品牌启动页 / 真 DPI 感知 / 深色无边框标题栏 / 窗口记忆 / F12 / 右栏 20% —— DeepSeek Harness 桌面外壳（dsh-desktop-shell）的 UI 补丁集 \| UI patch set for the DeepSeek Harness WebView2 desktop shell |
| 259 | [Brunojomosi/dsh-plugin-deepseek-saldo](https://github.com/Brunojomosi/dsh-plugin-deepseek-saldo) | 0 | 2026-10-21 | 2026-10-21 | DSH plugin: shows your DeepSeek account balance in the left sidebar, above the More button. Plugin do DSH: saldo da conta DeepSeek na barra lateral, acima do botao More. |
| 260 | [cainiaoNO1/dsh-better-display](https://github.com/cainiaoNO1/dsh-better-display) | 0 | 2026-10-22 | 2026-10-22 | DeepSeek Harness Web GUI 的「阅读」视图插件自用维护版：过程折叠、实时思考卡片、最终回答聚焦；已脱离官方 DSHX 工具链，改用 esbuild + lightningcss 自建可复现构建。 |
| 261 | [Callay02/dsh-ssh](https://github.com/Callay02/dsh-ssh) | 0 | 2026-10-22 | 2026-10-22 | SSH terminal, SFTP, remote metrics and agent tools for DeepSeek Harness |
| 262 | [cannebergeee/dsh-session-folder](https://github.com/cannebergeee/dsh-session-folder) | 0 | 2026-10-22 | 2026-10-22 | DSH plugin: right-click a Session row for its menu (Open in File Explorer) and a conversation file name for open / reveal / VS Code / copy path. |
| 263 | [caozeal/dsh-plugins](https://github.com/caozeal/dsh-plugins) | 0 | 2026-10-22 | 2026-10-22 | DeepSeek Harness 插件集：右侧边栏 Git 管理（分支切换 / AI 提交 / 提交图 / diff） |
| 264 | [ccclucky/dsh-plugin-session-rename](https://github.com/ccclucky/dsh-plugin-session-rename) | 0 | 2026-10-22 | 2026-10-22 | DSH plugin that gives the agent a native session_rename tool backed by the Cordis sessionTitle service. |
| 265 | [cgc1965565186-lab/dsh-ascii-sharks](https://github.com/cgc1965565186-lab/dsh-ascii-sharks) | 0 | 2026-10-22 | 2026-10-22 | Ambient ASCII sharks, fish and click ripples for the DeepSeek Harness desktop UI. |
| 266 | [chai-yinfeng/dsh-macos-restart](https://github.com/chai-yinfeng/dsh-macos-restart) | 0 | 2026-10-22 | 2026-10-22 | macOS 桌面版一键重启 / One-click restart for the DeepSeek Harness desktop app. |
| 267 | [Charlotteyi5/dsh-workspace-drive-picker](https://github.com/Charlotteyi5/dsh-workspace-drive-picker) | 0 | 2026-10-21 | 2026-10-21 | Drive-letter chips and a remembered start directory for the DeepSeek Harness add-workspace picker · 给 DSH 的「添加工作区」加上盘符一键直达与上次目录记忆 |
| 268 | [cheems135/dsh-qq-bridge](https://github.com/cheems135/dsh-qq-bridge) | 0 | 2026-10-22 | 2026-10-22 | QQ (NapCat / OneBot 11) bridge for DeepSeek Harness - chat with your harness from QQ, with a full management panel |
| 269 | [chencujinlin/dsh-task-personas](https://github.com/chencujinlin/dsh-task-personas) | 0 | 2026-10-22 | 2026-10-22 | DSH 飞书会话人格、表情与自主群聊；内含配套 IM Connect 人格扩展版 1.0.8-personas.6 |
| 270 | [ChiffonOwO/dsh-diff-review](https://github.com/ChiffonOwO/dsh-diff-review) | 0 | 2026-10-22 | 2026-10-22 | Codex-style change review for DeepSeek Harness: hover pill above the composer plus a syntax-highlighted right-sidebar diff page with revert. |
| 271 | [ChinRinhan/dsh-token-wall](https://github.com/ChinRinhan/dsh-token-wall) | 0 | 2026-10-21 | 2026-10-22 | https://github.com/ChinRinhan/dsh-token-wall |
| 272 | [Chlyz621/dsh-unstuck](https://github.com/Chlyz621/dsh-unstuck) | 0 | 2026-10-20 | 2026-10-21 | Auto-recovery for DeepSeek Harness: continues turns that ended abnormally or were swallowed into plain text, and revives stalled model requests. |
| 273 | [chocobo77/llama-dsh-launcher](https://github.com/chocobo77/llama-dsh-launcher) | 0 | 2026-10-22 | 2026-10-22 | 一款llama.cpp与DeepSeek Harness的多功能管理工具 |
| 274 | [Ck-epsilon/Aura](https://github.com/Ck-epsilon/Aura) | 0 | 2026-10-21 | 2026-10-21 | Aura — small, focused tools for agents and people. Monorepo for AuraArgus and AuraCardea. |
| 275 | [CKLYZZQ/DSH-plugin-Billing-Capsule](https://github.com/CKLYZZQ/DSH-plugin-Billing-Capsule) | 0 | 2026-10-11 | 2026-10-22 | DSH 底栏会话账单插件：在输入框底栏显示当前会话按官方单价折算的花费，含逐轮明细；Host 半自动抓取官方价格页，客户端零依赖可跨机安装。 |
| 276 | [Cloud017/dsh-prompt-reforge](https://github.com/Cloud017/dsh-prompt-reforge) | 0 | 2026-10-21 | 2026-10-21 | A DSH composer control that reforges a rough draft into a precise prompt, with one-click revert. |
| 277 | [CloudSen/dsh-umbrella-theme](https://github.com/CloudSen/dsh-umbrella-theme) | 0 | 2026-10-21 | 2026-10-21 | Umbrella Corporation theme for DeepSeek Harness: black-and-red dark scheme, grey-and-white light scheme, a spinning umbrella watermark and a HUD frame. |
| 278 | [Clukay-Fun/dsh-codex-link](https://github.com/Clukay-Fun/dsh-codex-link) | 0 | 2026-10-21 | 2026-10-22 | DeepSeek Harness plugin: sign in with ChatGPT, use GPT models, and see the account's quota. |
| 279 | [cong7781/novel](https://github.com/cong7781/novel) | 0 | 2026-10-21 | 2026-10-21 | 长文本关系图提取 |
| 280 | [copyninja123/dsh-bubble-skins](https://github.com/copyninja123/dsh-bubble-skins) | 0 | 2026-10-19 | 2026-10-22 | DeepSeek Harness user message bubble skin library \| DSH 用户消息气泡样式库插件 |
| 281 | [CoraEJones/dsh-web-workbench](https://github.com/CoraEJones/dsh-web-workbench) | 0 | 2026-10-22 | 2026-10-22 | DeepSeek Harness native plugin for real browser interaction, PDF reading, offline Chinese/English OCR and video frames. |
| 282 | [CowB0ySpike/dsh-deepseek-balance](https://github.com/CowB0ySpike/dsh-deepseek-balance) | 0 | 2026-10-21 | 2026-10-21 | DSH (DeepSeek Harness) plugin: shows the DeepSeek API key account balance in the composer dock. |
| 283 | [crychic-Mortis/dsh-dumb-mode](https://github.com/crychic-Mortis/dsh-dumb-mode) | 0 | 2026-10-22 | 2026-10-22 | DSH ????:????????????????????? |
| 284 | [cshengyi023-collab/dsh-deepsea-echo](https://github.com/cshengyi023-collab/dsh-deepsea-echo) | 0 | 2026-10-21 | 2026-10-21 | 深海回响 / dsh-deepsea-echo —— 明日方舟风 DSH 启动动画：鲸鱼娘 × PRTS 终端、全息锁定与干员档案，4 套原创配乐可选，可跳过、可配置。Arknights-flavoured startup / boot / splash animation plugin for the DeepSeek Harness Web GUI. |
| 285 | [cshengyi023-collab/dsh-pet-companion](https://github.com/cshengyi023-collab/dsh-pet-companion) | 0 | 2026-10-21 | 2026-10-21 | 小鲸鲸陪伴 / dsh-pet-companion: a low-key companion panel for DeepSeek Harness (DSH) — pomodoro timer, todo list, drink &amp; stand-up reminders, lesson explanation and homework tutoring via the installed desktop pet. 桌宠陪伴面板：番茄钟、待办、喝水久坐提醒、课程讲解、作业辅导，本地功能 0 token。 |
| 286 | [cslkkl/dsh-switchboard](https://github.com/cslkkl/dsh-switchboard) | 0 | 2026-10-20 | 2026-10-21 | DeepSeek Harness 插件：给子智能体和队友逐个指定模型，点一下就换。零依赖、运行时生效、不用重启。 |
| 287 | [cuijiajun/dsh-session-top-new](https://github.com/cuijiajun/dsh-session-top-new) | 0 | 2026-10-22 | 2026-10-22 | dsh-plugin最新会话列表 |
| 288 | [czxgg0630/dsh-html-annotate](https://github.com/czxgg0630/dsh-html-annotate) | 0 | 2026-10-21 | 2026-10-21 | 右侧栏 HTML 批注预览：点选元素或框选区域写批注，直接发进当前会话让 AI 改 |
| 289 | [dadgrand/dsh-file-preview](https://github.com/dadgrand/dsh-file-preview) | 0 | 2026-10-20 | 2026-10-21 | In-chat preview modal for local files, images, PDFs, Office documents and website links in the DeepSeek Harness Web UI |
| 290 | [DaJiang07/dsh-plugin-backup](https://github.com/DaJiang07/dsh-plugin-backup) | 0 | 2026-10-21 | 2026-10-21 | Back up every DSH plugin and all profile settings into one portable JSON file, then restore them on another machine in one click. |
| 291 | [dake6767/dsh-onlyoffice](https://github.com/dake6767/dsh-onlyoffice) | 0 | 2026-10-21 | 2026-10-21 | OnlyOffice document viewer/editor plugin for DeepSeek Harness — open docx/xlsx/pptx from the sidebar, edit and save back (client-side static SDK, no Document Server). |
| 292 | [daniei-chen/dsh-token-insight](https://github.com/daniei-chen/dsh-token-insight) | 0 | 2026-10-21 | 2026-10-21 | Local-first token usage dashboard for DeepSeek Harness (DSH). AI install guide for the plugin and the companion Android app. |
| 293 | [darkknight2333/dsh-timeline-ui](https://github.com/darkknight2333/dsh-timeline-ui) | 0 | 2026-10-22 | 2026-10-22 | DeepSeek Harness 界面增强：按日期分组的会话列表与左侧鱼眼对话导航条 / Date-grouped sidebar and left-side fisheye conversation navigation. |
| 294 | [dasazira-QAQ/dsh-kugou-music](https://github.com/dasazira-QAQ/dsh-kugou-music) | 0 | 2026-10-21 | 2026-10-21 | 在 DeepSeek Harness 里搜索、播放酷狗音乐：本机歌单解密、逐字歌词与翻译、两套 UI、自定义热键与播放模式 |
| 295 | [david0304git/dsh-appearance-glass](https://github.com/david0304git/dsh-appearance-glass) | 0 | 2026-10-21 | 2026-10-21 | DSH 外觀外掛：介面透明度（四個分區獨立可調）＋ 內建壁紙顏色。純 alpha，沒有模糊與玻璃特效。 |
| 296 | [dddmxza/dsh-mimo-voice](https://github.com/dddmxza/dsh-mimo-voice) | 0 | 2026-10-22 | 2026-10-22 | Xiaomi MiMo TTS voice plugin for DeepSeek Harness — speaks a line through your local speakers, with voice design, preview and approval alerts built in. |
| 297 | [ddldxiacan/dsh-freetap](https://github.com/ddldxiacan/dsh-freetap) | 0 | 2026-10-19 | 2026-10-21 | DSH plugin — free OpenCode Zen models for DeepSeek Harness (DSH), no API key. 在 DSH 中使用 OpenCode Zen 免费模型，无需 API key |
| 298 | [deepinfra/dsh-provider-deepinfra](https://github.com/deepinfra/dsh-provider-deepinfra) | 0 | 2026-10-21 | 2026-10-21 | DeepInfra provider for DeepSeek Harness (dsh): live model catalog, streaming chat completions, tool calls, reasoning, and images. |
| 299 | [diexianxiang/dsh-custom-splash](https://github.com/diexianxiang/dsh-custom-splash) | 0 | 2026-10-20 | 2026-10-21 | 一个为 DeepSeek Harness (DSH) 打造的自定义视频启动动画插件，支持替换为任意本地视频文件。 |
| 300 | [dingchenhui0618-arch/dsh-mask-pixel-lock](https://github.com/dingchenhui0618-arch/dsh-mask-pixel-lock) | 0 | 2026-10-22 | 2026-10-22 | Prove a local image edit left every pixel outside the mask untouched: per-pixel comparison, difference heatmap and a SHA-256 proof report. DSH plugin + zero-dependency CLI. |
| 301 | [dingchenhui0618-arch/dsh-mp-catalog-guard](https://github.com/dingchenhui0618-arch/dsh-mp-catalog-guard) | 0 | 2026-10-22 | 2026-10-22 | WeChat mini-program content catalog guard for DSH: integer amountFen, money()-only rendering, required fields, duplicate copy, image paths — issues plus an applyable unified diff (dry-run by default). |
| 302 | [dingchenhui0618-arch/dsh-tab-complete](https://github.com/dingchenhui0618-arch/dsh-tab-complete) | 0 | 2026-10-21 | 2026-10-21 | Tab 补全：用模型预测你在 DeepSeek Harness 输入框里接下来要打的字，灰色幽灵文本 + Tab 一键填入（Codex Pro 那套输入预测的 DSH 版） |
| 303 | [dingdong2333333-lab/dsh-app-controls](https://github.com/dingdong2333333-lab/dsh-app-controls) | 0 | 2026-10-21 | 2026-10-21 | DSH 官方客户端没有的两个按钮：重启和刷新。一个很小的独立插件。 |
| 304 | [dinhdev666/dsh-vi-pack](https://github.com/dinhdev666/dsh-vi-pack) | 0 | 2026-10-21 | 2026-10-21 | Gói ngôn ngữ tiếng Việt cho giao diện DeepSeek Harness (DSH). |
| 305 | [DIPPER12138/dsh-mathtype](https://github.com/DIPPER12138/dsh-mathtype) | 0 | 2026-10-21 | 2026-10-21 | MathType OLE equations for DeepSeek Harness: convert LaTeX placeholders in a Word .docx into real MathType objects (Equation.DSMT4), preserving equation numbers, SEQ fields, bookmarks and cross-references. |
| 306 | [dippingOrange/dsh-conductor](https://github.com/dippingOrange/dsh-conductor) | 0 | 2026-10-21 | 2026-10-21 | Multi-model task dispatch and Web task board for DeepSeek Harness |
| 307 | [docsor1212/dsh-scholar-suite](https://github.com/docsor1212/dsh-scholar-suite) | 0 | 2026-10-21 | 2026-10-21 | SkillHub 学术工具链 8 技能的 DeepSeek Harness 捆绑套件:图表/去AI味/润色/引文核验,一次安装整包注册 |
| 308 | [DoggyHU/dsh-archive-manager](https://github.com/DoggyHU/dsh-archive-manager) | 0 | 2026-10-21 | 2026-10-21 | 归档对话面板：列出全部已归档的对话，批量选中后一起取消归档或永久删除 |
| 309 | [DoggyHU/dsh-notify](https://github.com/DoggyHU/dsh-notify) | 0 | 2026-10-21 | 2026-10-21 | 任务提示音：DSH 需要确认或一轮结束时播放 Windows 提示音，音效可在设置页挑选并试听 |
| 310 | [DoggyHU/dsh-quote-annotate-pro-standalone](https://github.com/DoggyHU/dsh-quote-annotate-pro-standalone) | 0 | 2026-10-21 | 2026-10-22 | 本地 fork（MIT）：上游 dsh-quote-annotate-pro + 文档预览划词时引用块带上来源文件路径 |
| 311 | [DoggyHU/dsh-sidebar-pin](https://github.com/DoggyHU/dsh-sidebar-pin) | 0 | 2026-10-21 | 2026-10-21 | DSH 侧边栏置顶区：把常用工作区与会话钉在「工作区」上方，会话行同步运行中/完成/等待状态 |
| 312 | [dongasai/dsh_editor](https://github.com/dongasai/dsh_editor) | 0 | 2026-10-13 | 2026-10-22 | dsh编辑器插件 |
| 313 | [Doomsgeats/dsh-bili-feed](https://github.com/Doomsgeats/dsh-bili-feed) | 0 | 2026-10-22 | 2026-10-22 | B站热榜/搜索/详情/弹幕，做成 DSH 的 MCP 工具：不登录、零依赖、返回压好的纯文本 |
| 314 | [doraasn/dsh-cloud-sync](https://github.com/doraasn/dsh-cloud-sync) | 0 | 2026-10-21 | 2026-10-22 | DSH 插件：把技能 / 插件源码 / DSH 配置 / 全局指令 / 可选加密凭据备份到任意 WebDAV（坚果云、Nextcloud、群晖、ownCloud、AList） |
| 315 | [doraasn/dsh-web-chat](https://github.com/doraasn/dsh-web-chat) | 0 | 2026-10-22 | 2026-10-22 | Chat panel for DeepSeek Harness: embeds chat.deepseek.com, keeps the page alive across panel switches, remembers the last conversation. |
| 316 | [dougen/dsh-deepseek-usage](https://github.com/dougen/dsh-deepseek-usage) | 0 | 2026-09-24 | 2026-10-22 | DeepSeek Harness sidebar plugin: your account balance, the active model's unit prices and a peak/off-peak indicator. / DeepSeek Harness 侧边栏插件：账号余额、当前模型档单价与峰谷时段指示灯。 |
| 317 | [DrScorpio/dsh-opencode-auto-review](https://github.com/DrScorpio/dsh-opencode-auto-review) | 0 | 2026-10-22 | 2026-10-22 | Unofficial DeepSeek Harness plugin fixing OpenCode's MissingSessionID in Auto review by attaching the reviewed agent's session identity. \| 非官方 DSH 插件：为 reviewer 请求补上被审查会话身份，修复 OpenCode MissingSessionID 拒绝；目标 DSH 0.2.1-rc.2。 |
| 318 | [dsh-plugin-collection/dsh-group-status](https://github.com/dsh-plugin-collection/dsh-group-status) | 0 | 2026-10-08 | 2026-10-22 | DSH 侧栏折叠分组聚合徽标：收起的文件夹行显示进行中 / 待审批 / 已完成 / 定时任务 / 等待评审的聚合状态，带数字与悬停明细。分组状态 / 折叠徽标 / 侧栏状态。｜ Aggregate status badges on collapsed workspace folders in the DSH sidebar: running, pending, done, scheduled and waiting-review states, with counts and hover details. |
| 319 | [dtdths/dsh-mixer](https://github.com/dtdths/dsh-mixer) | 0 | 2026-10-14 | 2026-10-21 | 调音台视图：把多个 DeepSeek Harness 会话并排一屏，等待审批 / 提问的通道即时亮灯。 |
| 320 | [dthcle/dsh-proxy-config](https://github.com/dthcle/dsh-proxy-config) | 0 | 2026-10-21 | 2026-10-21 | Configurable outbound HTTP proxy for DeepSeek Harness (DSH): set the proxy endpoint in Settings, with a live reachability check and an automatic no-proxy fallback that switches back once the proxy answers. |
| 321 | [Dubai1210/dsh-session-delete](https://github.com/Dubai1210/dsh-session-delete) | 0 | 2026-10-22 | 2026-10-22 | DSH Plugin（DeepSeek Harness 插件）：在会话菜单「归档会话」下方增加「删除会话」，一次点按删除该会话及其全部数据。Adds a Delete item under Archive that removes a session and all of its data. |
| 322 | [dx906/dsh-ofm-quota](https://github.com/dx906/dsh-ofm-quota) | 0 | 2026-10-21 | 2026-10-21 | DSH 接口配额管理插件：实时统计每次对话所用接口的 Token/积分消耗，额度耗尽时自动切到同名模型的其他接口，全部第三方不可用时兜底切 DeepSeek 官方。右侧栏卡片展示各渠道剩余余额。围绕 dsh-our-free-model 工作，零运行时依赖。 |
| 323 | [Eason-22/dsh-autorestart](https://github.com/Eason-22/dsh-autorestart) | 0 | 2026-10-22 | 2026-10-22 | DSH 插件：重启不打断工作——等所有对话空闲后优雅重启，重启后自动接着干。AI 生成、未人工审核，谨慎使用。 |
| 324 | [EdgarsKalnins/dsh-gemini-notebook-mcp](https://github.com/EdgarsKalnins/dsh-gemini-notebook-mcp) | 0 | 2026-10-21 | 2026-10-22 | DeepSeek Harness (DSH) plugin for Gemini Notebook / Google NotebookLM MCP: notebooks, sources, grounded Q&amp;A, research, audio podcasts, video, slides — 53 tools via notebooklm-mcp-cli |
| 325 | [EndPB/dsh-telegram](https://github.com/EndPB/dsh-telegram) | 0 | 2026-10-21 | 2026-10-22 | Telegram user-account (MTProto) plugin for DeepSeek Harness: channels, messages, in-chat search, comments, links, whitelisted sending, a DSH bot chat and a Telegram-to-DSH bridge, managed from a mobile-friendly Settings page. |
| 326 | [esketids/dsh-deepseek-peak-clock](https://github.com/esketids/dsh-deepseek-peak-clock) | 0 | 2026-10-22 | 2026-10-22 | DeepSeek peak/off-peak price clock for the DeepSeek Harness composer HUD |
| 327 | [fan20yong/dsh-session-manager-next](https://github.com/fan20yong/dsh-session-manager-next) | 0 | 2026-10-21 | 2026-10-21 | DeepSeek Harness plugin: browse, export (Markdown/JSON/HTML), tidy up and safely delete session histories. 适配 DSH 0.2.1-rc.2 |
| 328 | [feely0208/dsh-approval-ledger](https://github.com/feely0208/dsh-approval-ledger) | 0 | 2026-10-22 | 2026-10-22 | 审批台账：记录 agent 每次需要审批的操作（风险/决策/结果），gate 模式可拦高危动作 |
| 329 | [feely0208/dsh-decision-review](https://github.com/feely0208/dsh-decision-review) | 0 | 2026-10-22 | 2026-10-22 | 决策复盘：把审批台账整理成可复盘报告——关键决策、被拒原因、待复审项与复盘问题清单 |
| 330 | [feely0208/dsh-enterprise-suite](https://github.com/feely0208/dsh-enterprise-suite) | 0 | 2026-10-22 | 2026-10-22 | 深鲸企业审计套件：审批台账 + 决策复盘 + 审计报告 + 定时复盘，一个授权全部可用（商业授权，14 天试用） |
| 331 | [feely0208/dsh-memory-doctor](https://github.com/feely0208/dsh-memory-doctor) | 0 | 2026-10-22 | 2026-10-22 | 深鲸记忆：跨会话热记忆 + 记忆体检/瘦身/记忆包。本地明文、零依赖、不上传数据。 |
| 332 | [feely0208/dsh-teardown-studio](https://github.com/feely0208/dsh-teardown-studio) | 0 | 2026-10-21 | 2026-10-21 | DeepWhale Teardown Studio — upload a pre-separated 3D model and render a teardown video locally (DSH plugin) |
| 333 | [felixpu/dsh-archive-session-manager](https://github.com/felixpu/dsh-archive-session-manager) | 0 | 2026-10-10 | 2026-10-21 | 已归档会话管理：在会话「···」菜单里为已归档会话提供「删除会话」，并提供一个归档会话面板（多选、批量删除、批量取消归档）。 |
| 334 | [felixpu/dsh-sidebar-tab-actions](https://github.com/felixpu/dsh-sidebar-tab-actions) | 0 | 2026-10-21 | 2026-10-21 | DSH Web 右侧栏标签页右键批量关闭：关闭左侧 / 关闭右侧 / 关闭全部 |
| 335 | [felixpu/dsh-suite](https://github.com/felixpu/dsh-suite) | 0 | 2026-10-13 | 2026-10-21 | DSH 插件合集（聚合包）：一次安装把多个独立维护的 DSH 插件装配成一组，单个插件故障不影响其余功能。 |
| 336 | [FenrirCait/dsh-session-leftover-purge](https://github.com/FenrirCait/dsh-session-leftover-purge) | 0 | 2026-10-20 | 2026-10-21 | Purge billion-context (bili) leftovers after an archive-manager session delete completes. Plugin for DeepSeek Harness. |
| 337 | [Findly-qwb/dsh-model-picker](https://github.com/Findly-qwb/dsh-model-picker) | 0 | 2026-10-20 | 2026-10-21 | A two-pane model picker for DeepSeek Harness. |
| 338 | [fishcg/dsh-airpod-control](https://github.com/fishcg/dsh-airpod-control) | 0 | 2026-10-21 | 2026-10-21 | Control DeepSeek Harness from AirPods head gestures (via HeadOrbit): nod = allow / confirm, shake = reject / next option — with a one-click installer for the menu-bar app. |
| 339 | [fotor-ai/dsh-fotor-plugin](https://github.com/fotor-ai/dsh-fotor-plugin) | 0 | 2026-10-21 | 2026-10-22 | Script-free Fotor plugin bundle for DeepSeek Harness, distributed from reviewed source snapshots. |
| 340 | [FrogFlaying/dsh-desktop-organizer](https://github.com/FrogFlaying/dsh-desktop-organizer) | 0 | 2026-10-20 | 2026-10-22 | 归类桌面快捷方式、发现未建快捷方式的程序、检测失效链接。 |
| 341 | [funny0A0/dsh-egress-router](https://github.com/funny0A0/dsh-egress-router) | 0 | 2026-10-21 | 2026-10-21 | 为单个目标开本机端口，经本机代理转发；含配置自愈与声明式兼容补丁 |
| 342 | [FutureHai/dsh-chat-plugin](https://github.com/FutureHai/dsh-chat-plugin) | 0 | 2026-10-22 | 2026-10-22 | 在 DeepSeek Harness Desktop 的主面板打开官方 DeepSeek Chat 网站。左侧入口可在 Chat 与 Agent 间切换，切换时不会重载 Chat 网页。 |
| 343 | [FxRayHughes/dsh-peer-link](https://github.com/FxRayHughes/dsh-peer-link) | 0 | 2026-10-21 | 2026-10-21 | Link DeepSeek Harness (DSH) instances on the LAN: delegate subagents to another machine's DSH, continue its sessions, with signed auto-discovery and a visual settings page |
| 344 | [Gahulv/dsh-server-ops-monitor](https://github.com/Gahulv/dsh-server-ops-monitor) | 0 | 2026-10-22 | 2026-10-22 | DSH SSH Ops companion: read-only server metrics and streaming Agent command output in the native sidebar. |
| 345 | [gaopengpian/dsh-custom-ui-theme](https://github.com/gaopengpian/dsh-custom-ui-theme) | 0 | 2026-10-21 | 2026-10-21 | DeepSeek Harness Desktop region-based UI theme customizer (background/border/text styles, element picker, highest-priority overrides) |
| 346 | [Garybot126/dsh-subagent-models](https://github.com/Garybot126/dsh-subagent-models) | 0 | 2026-10-21 | 2026-10-21 | 用于DSH中自由切换子代理使用的模型及强度 |
| 347 | [Gaudi-XIX/dsh-pocket-glide](https://github.com/Gaudi-XIX/dsh-pocket-glide) | 0 | 2026-10-08 | 2026-10-22 | Pocket DSH Glide — a deliberately small, touch-first phone plugin for a running DSH host: pair by QR/PIN, read sessions and history, send messages, stream replies, approve tool permissions. Runs inside the host process, not as a desktop mirror: no build step, one runtime dependency, LAN listener plus an optional Cloudflare quick tunnel. |
| 348 | [ghang/dsh-cache-helper](https://github.com/ghang/dsh-cache-helper) | 0 | 2026-10-21 | 2026-10-21 | DeepSeek Harness 缓存助手：展示缓存命中量与命中率，发送前预警大规模缓存失效风险，并提供异常记录与会话缓存分析看板。/ Cache-hit metrics, request-prefix risk confirmation, and per-step cache-miss diagnostics for DeepSeek Harness. |
| 349 | [Git-fans1100/dsh-skill-router](https://github.com/Git-fans1100/dsh-skill-router) | 0 | 2026-10-22 | 2026-10-22 | dsh-skill-router：DeepSeek Harness 技能检索路由插件 |
| 350 | [github798383392/dsh-skill-filmora-2026](https://github.com/github798383392/dsh-skill-filmora-2026) | 0 | 2026-10-21 | 2026-10-21 | DeepSeek Harness skill pack: plan-driven video editing automation for Wondershare Filmora 2026 on Windows |
| 351 | [golddream-y/ratel-dsh-lumina](https://github.com/golddream-y/ratel-dsh-lumina) | 0 | 2026-10-21 | 2026-10-22 | Customizable motion for DeepSeek Harness: composer glow, send transitions and streaming feedback, with per-effect controls and reduced-motion support. |
| 352 | [gongfpp/dsh-novel-fish](https://github.com/gongfpp/dsh-novel-fish) | 0 | 2026-10-22 | 2026-10-22 | Read local novels only when expanding selected real DSH reasoning steps. Local-only; no model requests. |
| 353 | [gongstudent/dsh-moyu](https://github.com/gongstudent/dsh-moyu) | 0 | 2026-10-21 | 2026-10-22 | 摸鱼套件 dsh-moyu 的抖音模块。鼠标悬停即现的推荐流播放器，滚轮切视频，移开自动暂停；宿主侧签名与媒体反代 |
| 354 | [GooDAnDReaDY/dsh-ollama-cloud-provider](https://github.com/GooDAnDReaDY/dsh-ollama-cloud-provider) | 0 | 2026-10-21 | 2026-10-21 | Ollama Cloud LLM provider plugin for DeepSeek Harness (dsh). |
| 355 | [Goose-Gusi/dsh-enter-remap](https://github.com/Goose-Gusi/dsh-enter-remap) | 0 | 2026-10-21 | 2026-10-21 | DSH plugin: remap Enter, Ctrl+Enter and Shift+Enter to line break, send, or busy-time send. |
| 356 | [Gorkaseto/dsh-delete-sessions](https://github.com/Gorkaseto/dsh-delete-sessions) | 0 | 2026-10-20 | 2026-10-21 | A plugin for DeepSeek Harness (DSH) that adds a permanent "Delete session" action to the sidebar session menu |
| 357 | [Gorkaseto/dsh-effort-picker](https://github.com/Gorkaseto/dsh-effort-picker) | 0 | 2026-10-20 | 2026-10-21 | A plugin for DeepSeek Harness (DSH) that enables effort choice in custom providers and replaces the standard "Effort" menu item with an intuitive, sticky effort slider directly inside the composer model menu. |
| 358 | [Gorkaseto/dsh-markdownize](https://github.com/Gorkaseto/dsh-markdownize) | 0 | 2026-10-21 | 2026-10-22 | A DeepSeek Harness (dsh) plugin that converts documents to Markdown so an LLM can read them. |
| 359 | [Gorkaseto/dsh-whale-pet](https://github.com/Gorkaseto/dsh-whale-pet) | 0 | 2026-10-20 | 2026-10-21 | A lightweight, pixel-art companion plugin for DeepSeek Harness (DSH) that adds an animated whale pet above the input composer during new sessions. |
| 360 | [Gqwu01/dsh-plugin-bootanim](https://github.com/Gqwu01/dsh-plugin-bootanim) | 0 | 2026-10-22 | 2026-10-22 | DSH 视频开机动画插件：打开 DSH 时播放你选的一段视频，刷新不重播，在插件页里换片。 |
| 361 | [Grasseed/dsh-lang-zhtw](https://github.com/Grasseed/dsh-lang-zhtw) | 0 | 2026-10-22 | 2026-10-22 | 繁體中文（台灣）language pack for DeepSeek Harness — generated from shipped dictionaries with OpenCC (s2twp) + TW usage polish; 63 namespaces / 2,676 strings. |
| 362 | [GU143312/dsh-training-lens](https://github.com/GU143312/dsh-training-lens) | 0 | 2026-10-21 | 2026-10-21 | Training Lens · 训练视窗 — local TensorBoard scalar monitoring for DeepSeek Harness |
| 363 | [guhanfei-ai/dsh-model-http-proxy](https://github.com/guhanfei-ai/dsh-model-http-proxy) | 0 | 2026-10-22 | 2026-10-22 | 模型代理：按模型/提供方精准路由模型 API 流量（走代理或直连），其余请求不受影响 —— Route model-API traffic per provider through proxies, everything else stays direct. |
| 364 | [gulagala001/dsh-extensions](https://github.com/gulagala001/dsh-extensions) | 0 | 2026-10-22 | 2026-10-22 | Manage skills, MCP servers, instructions, commands and hooks in DeepSeek Harness. |
| 365 | [gulagala001/dsh-persona-plugin](https://github.com/gulagala001/dsh-persona-plugin) | 0 | 2026-10-22 | 2026-10-22 | Create and share AI personality presets with global and per-conversation choices in DeepSeek Harness. |
| 366 | [GunjanPatel359/dsh-tool-search](https://github.com/GunjanPatel359/dsh-tool-search) | 0 | 2026-10-21 | 2026-10-21 | Deferred tool loading for DSH (DeepSeek Harness): send MCP tools as a compact index and load details on demand, without breaking the prompt cache. |
| 367 | [Guzi2005/dsh-whale-combo](https://github.com/Guzi2005/dsh-whale-combo) | 0 | 2026-10-21 | 2026-10-21 | 鲸鱼娘合并数据卡：DSH Web 插件，毛玻璃余额/缓存/峰谷状态卡 + 深蓝扣费弹幕（合并 dsh-whale-widget 与 dsh-damage-pulse 的数据） |
| 368 | [Hamster1214/dsh-pet-lan](https://github.com/Hamster1214/dsh-pet-lan) | 0 | 2026-10-22 | 2026-10-22 | 大肥鱼桌宠联机 |
| 369 | [hansomgar/dsh-recent-usage-metrics](https://github.com/hansomgar/dsh-recent-usage-metrics) | 0 | 2026-10-22 | 2026-10-22 | Geek-mode request metrics for DeepSeek Harness: live TTFT / token-speed / token readout in the composer status row, plus a frosted-glass history drawer of the last 10 requests. |
| 370 | [hansomgar/dsh-settings-resize](https://github.com/hansomgar/dsh-settings-resize) | 0 | 2026-10-21 | 2026-10-21 | Adjust the DeepSeek Harness Settings dialog width, height and transparency from three sliders in General settings. |
| 371 | [HarcoChen/dsh-ArkStronghold](https://github.com/HarcoChen/dsh-ArkStronghold) | 0 | 2026-10-21 | 2026-10-21 | 允许DSH接入ArkStronghold |
| 372 | [haruri03/dsh-reveal-in-folder](https://github.com/haruri03/dsh-reveal-in-folder) | 0 | 2026-10-22 | 2026-10-22 | Right-click any file path in the DSH Web UI (chat file links, editor tabs, path bar) to reveal it in the OS file manager. |
| 373 | [haruri03/dsh-todo-ledger](https://github.com/haruri03/dsh-todo-ledger) | 0 | 2026-10-22 | 2026-10-22 | todo-ledger for DeepSeek Harness: persistent task state, 11 native tools, and cross-session context in a repo-local _todo/ directory (legacy todo/ supported). |
| 374 | [HeShen-1/dsh-pg-grid](https://github.com/HeShen-1/dsh-pg-grid) | 0 | 2026-10-21 | 2026-10-21 | Native DSH PostgreSQL workbench with visual filters, same-database joins, computed columns, pivots and saved views. |
| 375 | [hhl123hhl/dsh-privacy-shield](https://github.com/hhl123hhl/dsh-privacy-shield) | 0 | 2026-10-21 | 2026-10-21 | Local-first privacy shield for DeepSeek Harness: keep plaintext local, send only placeholders to the model, restore real values in the transcript. |
| 376 | [Hoemr/dsh-llm-cc-switch](https://github.com/Hoemr/dsh-llm-cc-switch) | 0 | 2026-09-03 | 2026-10-21 | DSH plugin: bridge farion1231/cc-switch accounts into DeepSeek Harness as live model categories (Claude Code / Codex / OpenCode ...), re-reading the CC Switch SQLite database on every operation. |
| 377 | [hoist-wen/dsh-trajectory-tool-insight](https://github.com/hoist-wen/dsh-trajectory-tool-insight) | 0 | 2026-09-25 | 2026-10-21 | DSH 插件：在会话视图新增「解读」标签，按轮次解读工具调用。 Per-turn tool-call insight for DSH. |
| 378 | [houdinicc/dsh-deep-research](https://github.com/houdinicc/dsh-deep-research) | 0 | 2026-10-21 | 2026-10-21 | Deep research for DeepSeek Harness: multi-query search, source fetching, evidence extraction and a cited evidence report, through the host ctx.web service. · DSH 深度研究插件：多查询检索、正文取证、交叉印证，产出可引用的证据报告。 |
| 379 | [howpy/dragonfly_chatbot](https://github.com/howpy/dragonfly_chatbot) | 0 | 2026-10-22 | 2026-10-22 | Dragonfly technical knowledge search and cited answers for DeepSeek Harness |
| 380 | [hstony7462/dsh-youtube-scroll](https://github.com/hstony7462/dsh-youtube-scroll) | 0 | 2026-10-22 | 2026-10-22 | DSH plugin: daily YouTube scroll — channel RSS + keyword search → transcript-first selection (local Whisper fallback, thumbnail vision) → Traditional Chinese daily report on an off-peak schedule. |
| 381 | [HUANGjiale123-bit/dsh-desktop-control](https://github.com/HUANGjiale123-bit/dsh-desktop-control) | 0 | 2026-10-21 | 2026-10-21 | Windows 桌面观察与操作插件（DSH / DeepSeek Harness）：无障碍树、截图、OCR 兜底、鼠标键盘；会话级授权与 ESC 急停。Windows desktop control for DSH. |
| 382 | [huangxicheng1/blog-manage](https://github.com/huangxicheng1/blog-manage) | 0 | 2026-10-21 | 2026-10-21 | A DeepSeek Harness plugin that manages a GitHub Pages blog: browse, write and publish content/*.md without a local clone. |
| 383 | [huangxicheng1/dsh-garmin-health](https://github.com/huangxicheng1/dsh-garmin-health) | 0 | 2026-10-22 | 2026-10-22 | Garmin Connect dashboard for DeepSeek Harness: left-sidebar panel entry, full-page charts, direct Garmin REST API, reuses a local Garmin token. No MCP, no npm dependencies. |
| 384 | [huangye0623-creator/dsh-crash-avoidance](https://github.com/huangye0623-creator/dsh-crash-avoidance) | 0 | 2026-10-22 | 2026-10-22 | Postmortems of three real DeepSeek Harness incidents (Windows ACL/integrity, profile dependency duplication, preview API change), an upgrade regression checklist, and a multi-frame zstd log audit script. Unofficial. |
| 385 | [huangye0623-creator/dsh-web-search-router](https://github.com/huangye0623-creator/dsh-web-search-router) | 0 | 2026-10-22 | 2026-10-22 | Per-query web-search backend router for DeepSeek Harness (DSH): Tavily vs built-in search, with fallback, cooldowns, a backend marker, and a status tool — plus a Tavily API/MCP usage guide. Unofficial. |
| 386 | [hugefiver/dsmm](https://github.com/hugefiver/dsmm) | 0 | 2026-10-07 | 2026-10-22 | A port of ocmm to dsh. |
| 387 | [hunyu-feng/dsh-context-handoff](https://github.com/hunyu-feng/dsh-context-handoff) | 0 | 2026-10-22 | 2026-10-22 | DSH plugin: live context pressure meter that hands work to a fresh session with a model-written brief before the window fills up. |
| 388 | [hunyu-feng/dsh-usage-pulse](https://github.com/hunyu-feng/dsh-usage-pulse) | 0 | 2026-10-22 | 2026-10-22 | DSH Web UI plugin: live DeepSeek peak / off-peak pricing, token spend and hourly usage bars in the composer dock. |
| 389 | [hunyu-feng/dsh-video-digest](https://github.com/hunyu-feng/dsh-video-digest) | 0 | 2026-10-22 | 2026-10-22 | DSH plugin: turn a video link (Bilibili / YouTube / any page) into a transcript-backed summary, and say plainly what evidence it used. |
| 390 | [hunyu-feng/dsh-vision](https://github.com/hunyu-feng/dsh-vision) | 0 | 2026-10-22 | 2026-10-22 | Vision for DSH agents and MCP clients: analyze_image over local files or URLs using Doubao models on Volcano Ark, with model fallback. |
| 391 | [HXwHSJS/dsh-web-annotation](https://github.com/HXwHSJS/dsh-web-annotation) | 0 | 2026-10-21 | 2026-10-21 | Annotate web pages in the DSH right-Sidebar Browser tab: element/region comments with screenshots, merged into your next message. |
| 392 | [hyzmm/dsh-notch-pet](https://github.com/hyzmm/dsh-notch-pet) | 0 | 2026-10-21 | 2026-10-22 | An animated companion that shows live DSH agent progress in the macOS notch. |
| 393 | [IDKURLOVE/dsh-reset-button](https://github.com/IDKURLOVE/dsh-reset-button) | 0 | 2026-10-22 | 2026-10-22 | One-click Restart button for DSH (DeepSeek Harness): relaunch from the composer toolbar, right beside the permission control - no more closing and reopening the app after installing a plugin. |
| 394 | [IDrinkMoreWater/dsh-openspec-opsx](https://github.com/IDrinkMoreWater/dsh-openspec-opsx) | 0 | 2026-10-20 | 2026-10-21 | OpenSpec spec-driven workflows for DeepSeek Harness: 12 openspec-* skills plus /opsx-* slash commands that accept arguments. |
| 395 | [iKode423/dsh-ronova-theme](https://github.com/iKode423/dsh-ronova-theme) | 0 | 2026-10-21 | 2026-10-21 | 基于原神若娜瓦的设计元素为 DeepSeek Harness Web UI 做的整套视觉换肤 |
| 396 | [ILoveHAKU/dsh-dialog-fence](https://github.com/ILoveHAKU/dsh-dialog-fence) | 0 | 2026-10-21 | 2026-10-21 | Dialog fence for DSH / DSH Desktop: per-conversation behavioral rule fence injected into runtime context without breaking prompt cache |
| 397 | [InariNGT-Ofiicial/dsh-plugin-updates](https://github.com/InariNGT-Ofiicial/dsh-plugin-updates) | 0 | 2026-10-22 | 2026-10-22 | DSH 插件自动更新：连接原 GitHub 仓库，默认每 24 小时检查并安装更新，支持人工控制、备份与失败回退。 |
| 398 | [irislilymoon/dsh-prompt-studio](https://github.com/irislilymoon/dsh-prompt-studio) | 0 | 2026-10-21 | 2026-10-22 | DSH 桌面端/Web 端插件：编辑初始系统提示词，按需屏蔽 runtime 上下文、工具 schema、AGENTS.md 等系统侧注入，支持普通 / 仅聊天 / 自定义模式切换与实时生效。 |
| 399 | [irislilymoon/dsh-qq-workspace](https://github.com/irislilymoon/dsh-qq-workspace) | 0 | 2026-10-22 | 2026-10-22 | DSH Desktop plugin: QQ bot working directory, workspace grouping, upload routing and a QQ-session security lock |
| 400 | [itsbuyru-bit/dsh-model-price](https://github.com/itsbuyru-bit/dsh-model-price) | 0 | 2026-10-22 | 2026-10-22 | Per-model API prices in USD or CNY, wallet balance and live session spend for DeepSeek Harness. |
| 401 | [jack-001-a/deepseek-harness-session-delete](https://github.com/jack-001-a/deepseek-harness-session-delete) | 0 | 2026-10-21 | 2026-10-21 | 在侧边栏会话菜单中新增「删除对话」，永久清除该对话的本地记录。 |
| 402 | [Jayve/dsh-balance-pill](https://github.com/Jayve/dsh-balance-pill) | 0 | 2026-10-20 | 2026-10-21 | Balance Pill: DeepSeek Harness composer-dock wallet balance and this session's spend. |
| 403 | [Jayve/dsh-fakeip-http](https://github.com/Jayve/dsh-fakeip-http) | 0 | 2026-10-20 | 2026-10-21 | Accept fake-IP DNS answers for DeepSeek Harness web_fetch while keeping the SSRF guard intact. |
| 404 | [jcy0chenyuan0/dsh-debate-simulator](https://github.com/jcy0chenyuan0/dsh-debate-simulator) | 0 | 2026-10-21 | 2026-10-21 | DSH debate simulator plugin: multi-agent Chinese debate, judges, archives, training side, ZIP/Word |
| 405 | [jhhjy/dsh-ai-bridge](https://github.com/jhhjy/dsh-ai-bridge) | 0 | 2026-10-22 | 2026-10-22 | AI 接线板：让别的 AI 通过本机 HTTP 把提示词递进 DeepSeek Harness 会话，我的回复也同步到 outbox 供对方读取（双向）。 / Two-way prompt relay between a DSH session and any other AI over local HTTP. |
| 406 | [jiangking22/dsh-text-color-adaptive](https://github.com/jiangking22/dsh-text-color-adaptive) | 0 | 2026-10-22 | 2026-10-22 | Adaptive text color for DSH: samples the wallpaper and recolors label text so it stays readable over any background. |
| 407 | [jidekaixin2dian/dsh-file-actions](https://github.com/jidekaixin2dian/dsh-file-actions) | 0 | 2026-10-21 | 2026-10-21 | File-reference context menu for DeepSeek Harness: open, choose an application, reveal, copy paths or contents, and save files. |
| 408 | [JiewiW/dsh-derive-watcher](https://github.com/JiewiW/dsh-derive-watcher) | 0 | 2026-10-09 | 2026-10-22 | Semantic watcher plugin for DSH (L3): journey ledger, flash summarizer, MinHash novelty, milestone fold, context injection, 3-level stall response |
| 409 | [JiewiW/dsh-step-governor](https://github.com/JiewiW/dsh-step-governor) | 0 | 2026-10-07 | 2026-10-22 | 实验·未发布：DSH 确定性步数治理插件（pre-step reject / pre-execute deny），shadow 默认、fail-open |
| 410 | [jihaoran222/dsh-violet-heart](https://github.com/jihaoran222/dsh-violet-heart) | 0 | 2026-10-21 | 2026-10-21 | Some words must never reach a page you hand in; some belong only on the page you keep. This DSH plugin writes that line into the system prompt — nothing personal in a formal deliverable, and now and then, in private notes, room for a heart. |
| 411 | [jimku233/dsh-copy-file](https://github.com/jimku233/dsh-copy-file) | 0 | 2026-10-22 | 2026-10-22 | Copy real files from DSH delivery cards to the system clipboard (CF_HDROP), with Windows-like card interaction. Pinned to DSH 0.2.0-rc.2. |
| 412 | [JingYu-er/dsh-stm32](https://github.com/JingYu-er/dsh-stm32) | 0 | 2026-10-22 | 2026-10-22 | DSH plugin: STM32 complete process tool - environment detection, .ico transactions, generating project, compiling, burning, debugging |
| 413 | [jinlong252577/dsh-sidebar-bookmarks](https://github.com/jinlong252577/dsh-sidebar-bookmarks) | 0 | 2026-10-21 | 2026-10-21 | DSH 右侧栏书签标签页 |
| 414 | [JinShuXuan/dsh-context-budget](https://github.com/JinShuXuan/dsh-context-budget) | 0 | 2026-10-22 | 2026-10-22 | Per-step context ledger for DeepSeek Harness with opt-in gates: lean tool table, long-tail externalization, duplicate-read pointers. |
| 415 | [john-walks-slow/dsh-os](https://github.com/john-walks-slow/dsh-os) | 0 | 2026-10-22 | 2026-10-22 | DeepSeek Harness OS: turn the DSH Web home page into a cyberpunk terminal desktop — ASCII backgrounds, boot POST sequence, live system/Harness telemetry HUD. |
| 416 | [jonasbu11/dsh-plugin-stet](https://github.com/jonasbu11/dsh-plugin-stet) | 0 | 2026-10-21 | 2026-10-22 | Stet for DeepSeek Harness: your how-you-work manual as MCP tools, with the session-log upload to DeepSeek turned off. |
| 417 | [JujiuYey/dsh-quick-explain](https://github.com/JujiuYey/dsh-quick-explain) | 0 | 2026-10-21 | 2026-10-21 | Select a fragment of a DeepSeek Harness chat and explain it in a temporary side conversation — without touching the main session. |
| 418 | [julian0zzx/ai-novelist](https://github.com/julian0zzx/ai-novelist) | 0 | 2026-09-13 | 2026-10-22 | DSH Plugin-based AI Web Novel Composer |
| 419 | [Kaitox326/dsh-auto-prompt](https://github.com/Kaitox326/dsh-auto-prompt) | 0 | 2026-10-22 | 2026-10-22 | DeepSeek Harness 插件：一句话变成可用的图片/视频提示词；打开生成开关后直接调用你自己的模型或 API 出图出片。 |
| 420 | [kemomimi12/dsh-auto-continue](https://github.com/kemomimi12/dsh-auto-continue) | 0 | 2026-10-22 | 2026-10-22 | Automatic turn-level resume for DeepSeek Harness: continues after transient model-request failures, merges provider outages into one storm, and always yields to a manual stop.DeepSeek Harness 自动续行插件：模型请求临时失败导致轮次中断后自动接着做；同一次网关故障只重试一次；手动停止永远优先。 |
| 421 | [Kiol-V/dsh-agent-tool-filter](https://github.com/Kiol-V/dsh-agent-tool-filter) | 0 | 2026-10-22 | 2026-10-22 | Per-agent tool filter for the main agent (orchestrator) in DeepSeek Harness — minimal toolset for the orchestrator, full toolset for subagents. |
| 422 | [KitlingKittyRabbit/dsh-whale-watch](https://github.com/KitlingKittyRabbit/dsh-whale-watch) | 0 | 2026-10-04 | 2026-10-22 | 鲸声守望 · DSH 社区讨论环境巡查插件。结合正文、配图、评论与专题语境，保留原文和判断依据，支持导入自定义专题。 |
| 423 | [klT45/dsh-music-dj](https://github.com/klT45/dsh-music-dj) | 0 | 2026-10-22 | 2026-10-22 | AI DJ for DeepSeek Harness: turn a sentence into a song; searches and switches tracks through a local LX Music instance (bundles no audio sources). |
| 424 | [KNLCXY/dsh-github](https://github.com/KNLCXY/dsh-github) | 0 | 2026-10-22 | 2026-10-22 | GitHub tools for DeepSeek Harness: REST API calls, multi-file commits in one commit, repo creation. The token lives in the plugin settings (example placeholder only, never a default), never in the repo or in tool output. |
| 425 | [KNLCXY/dsh-github-scripts](https://github.com/KNLCXY/dsh-github-scripts) | 0 | 2026-10-22 | 2026-10-22 | Standalone, zero-dependency scripts for the GitHub tasks the web UI can do but the API cannot: commit a file through the web editor with no token, obtain a token via the OAuth device flow, and probe a Chromium build with custom launch flags. No keys stored here. |
| 426 | [KNLCXY/dsh-websift](https://github.com/KNLCXY/dsh-websift) | 0 | 2026-10-22 | 2026-10-22 | 浏览器压缩 + 检索优化：把网页压成预算内的摘要（省 80–98% token），把搜索结果筛成可信的几条。底层真 Chrome（JS 渲染 / 登录态 / 截图 / 代理）。 |
| 427 | [kongbai-shike/dsh-novel-wallpaper](https://github.com/kongbai-shike/dsh-novel-wallpaper) | 0 | 2026-09-30 | 2026-10-21 | Novel-as-wallpaper reader for DSH Desktop |
| 428 | [kongbaiming5/dsh-pet-button](https://github.com/kongbaiming5/dsh-pet-button) | 0 | 2026-10-22 | 2026-10-22 | 桌宠开关 · 一键开/关桌面上的 dsh-pet 桌宠，Harness 关闭时还能顺手启动它 \| A desktop switch for your dsh-pet pet, with one-click Harness launch. |
| 429 | [KouzakiUmi/dsh-antigravity-acp](https://github.com/KouzakiUmi/dsh-antigravity-acp) | 0 | 2026-10-14 | 2026-10-22 | DeepSeek Harness host bundle: official Antigravity ACP (Gemini) as a primary model, DSH-owned tools |
| 430 | [KouzakiUmi/dsh-code-pill](https://github.com/KouzakiUmi/dsh-code-pill) | 0 | 2026-10-07 | 2026-10-22 | Antigravity-style inline code rendering for the DeepSeek Harness chat: amber code pills, syntax coloring (VS Code palette), language badges. |
| 431 | [kyrsieger/dsh-up-session](https://github.com/kyrsieger/dsh-up-session) | 0 | 2026-10-18 | 2026-10-22 | dsh 插件，在侧边栏添加一个置顶区，汇集不同项目中的置顶会话。 |
| 432 | [LateralCircle83/dsh-officecli-connection](https://github.com/LateralCircle83/dsh-officecli-connection) | 0 | 2026-10-22 | 2026-10-22 | Give DeepSeek Harness an Office engine: one officecli tool plus OfficeCLI's ten bundled guides as runtime skills. Point it at the binary you already installed — nothing is downloaded, nothing written outside its own settings file. |
| 433 | [lbyxunxunnini/dsh-agent-pm](https://github.com/lbyxunxunnini/dsh-agent-pm) | 0 | 2026-10-22 | 2026-10-22 | Agent PM: product-manager-style review for Claude Code and DeepSeek Harness agent projects |
| 434 | [LCspax/dsh-ocgo-ring](https://github.com/LCspax/dsh-ocgo-ring) | 0 | 2026-10-22 | 2026-10-22 | OpenCode Go quota ring for DeepSeek Harness: three windows beside the composer context meter. |
| 435 | [lcy362/dsh-radeon-capacity](https://github.com/lcy362/dsh-radeon-capacity) | 0 | 2026-10-21 | 2026-10-21 | AMD Radeon Cloud model capacity (AI Capacity) readout for DeepSeek Harness — shows per-model concurrency headroom in the model picker, on the same row as the model name |
| 436 | [LDyty/dsh-context-decay](https://github.com/LDyty/dsh-context-decay) | 0 | 2026-10-20 | 2026-10-21 | Model-driven, lossy context decay for DeepSeek Harness. Requires a patched DSH host; not a drop-in plugin. |
| 437 | [Leawind/dsh-rice-on-a-stick](https://github.com/Leawind/dsh-rice-on-a-stick) | 0 | 2026-09-22 | 2026-10-21 | A dsh plugin that lets agents control dsh via MCP or dsh's built-in tools. |
| 438 | [leexrisy/dsh-plugin-medical-literature](https://github.com/leexrisy/dsh-plugin-medical-literature) | 0 | 2026-10-22 | 2026-10-22 | Medical literature search, citation formatting, and open-access full text for DeepSeek Harness (PubMed, Europe PMC, arXiv, bioRxiv, medRxiv). |
| 439 | [leoainc-ops/dsh-history-keeper](https://github.com/leoainc-ops/dsh-history-keeper) | 0 | 2026-10-21 | 2026-10-22 | Encrypted, verifiable history keeper for DeepSeek Harness: snapshot, verify and restore your DSH sessions. No git, no external binaries. |
| 440 | [leonathan369-droid/qq-bridge](https://github.com/leonathan369-droid/qq-bridge) | 0 | 2026-10-20 | 2026-10-21 | QQ Bridge for macOS —— DeepSeek Harness QQ 集成：DSH 设置页控制中心（真实健康检查 / 一键启停 / 运行模式 / QQ 专用模型与推理强度）+ LLBot 适配。上游 Derpyu520/qq-bridge 的衍生版（MIT）。 |
| 441 | [levodoubt/project-node-memory](https://github.com/levodoubt/project-node-memory) | 0 | 2026-10-21 | 2026-10-21 | Markdown-as-database knowledge base for DSH agents: stable TIDs, transclusion, structure self-check. 9 kb_* tools + a 3-column panel. |
| 442 | [lg114/dsh-md-live](https://github.com/lg114/dsh-md-live) | 0 | 2026-10-22 | 2026-10-22 | DSH independent right-panel Markdown live preview: edit + render side by side, auto-refresh on file change, send selection back to chat. |
| 443 | [liangTc/dsh-become-human](https://github.com/liangTc/dsh-become-human) | 0 | 2026-10-21 | 2026-10-22 | 基于 DSH 的自主 Agent 插件，支持自定义人格、长期记忆、自主学习、主动交流与任务执行，Web 和 IM 共享唯一会话。当前为测试版本，功能持续开发完善中。 |
| 444 | [liaojianjin/dsh-large-jsonl-viewer](https://github.com/liaojianjin/dsh-large-jsonl-viewer) | 0 | 2026-10-20 | 2026-10-21 | Read-only indexed JSONL and NDJSON viewer for DeepSeek Harness Web and Desktop |
| 445 | [lifwsp/dsh-macos-tap-fix](https://github.com/lifwsp/dsh-macos-tap-fix) | 0 | 2026-10-15 | 2026-10-22 | Workaround for WebKit Bug 219670: lost first Tap-to-Click on macOS with an input method, for DeepSeek Harness |
| 446 | [lifwsp/dsh-work-planner](https://github.com/lifwsp/dsh-work-planner) | 0 | 2026-10-22 | 2026-10-22 | DSH plugin: plans accumulated GitHub Issues into ordered work packages in the background (decision model + deterministic rules, no LLM) and shows the next one in the sidebar |
| 447 | [lihua12345670-jpg/dsh-bili-audio](https://github.com/lihua12345670-jpg/dsh-bili-audio) | 0 | 2026-10-22 | 2026-10-22 | DSH 插件：B站音频悬浮播放条，宿主反向代理解决 CDN Referer 403，带队列/进度/倍速 |
| 448 | [lihuabai629-star/deepseek-harness-openubmc](https://github.com/lihuabai629-star/deepseek-harness-openubmc) | 0 | 2026-10-10 | 2026-10-21 | Community openUBMC plugin for DeepSeek Harness: native observe/execute workflows |
| 449 | [lij0000-arch/dsh-workspace-migrate](https://github.com/lij0000-arch/dsh-workspace-migrate) | 0 | 2026-10-21 | 2026-10-21 | Workspace-scoped DeepSeek Harness migration: conversations, project files and attachments with path remapping |
| 450 | [lilCnid/deepseek-rlm](https://github.com/lilCnid/deepseek-rlm) | 0 | 2026-08-20 | 2026-10-22 | Persistent IPython state, durable snapshots, and native recursive subagents for DeepSeek Harness—packaged as a Prime-compatible Cordis plugin bundle. |
| 451 | [lilCnid/recursus](https://github.com/lilCnid/recursus) | 0 | 2026-08-22 | 2026-10-22 | A durable, full-access runtime agent built on DeepSeek Harness |
| 452 | [limbo1996/dsh-config-transfer](https://github.com/limbo1996/dsh-config-transfer) | 0 | 2026-10-21 | 2026-10-21 | Export and import a DSH Desktop configuration, including plugins, settings, MCP entries, and user skills. Credentials are not exported. |
| 453 | [Limsanity/dsh-layout-persist](https://github.com/Limsanity/dsh-layout-persist) | 0 | 2026-10-22 | 2026-10-22 | Persist the DeepSeek Harness Web frame's left sidebar and right panel widths across restarts. |
| 454 | [lin114514-desng/dsh-context-tone](https://github.com/lin114514-desng/dsh-context-tone) | 0 | 2026-10-21 | 2026-10-21 | DSH 插件：按上下文占用档位给上下文胶囊的圆环与百分比改色，并在数字右侧显示档位 emoji；五个分界值、五档颜色、六档 emoji 可在插件配置页修改。Colors the DeepSeek Harness context meter by occupancy tier, with tier emoji and a settings page. |
| 455 | [Lingrui98/dsh-project-inbox](https://github.com/Lingrui98/dsh-project-inbox) | 0 | 2026-10-16 | 2026-10-22 | Project inbox for DeepSeek Harness: collect questions, deliverables and interrupted turns from every session, and act on them in one place. |
| 456 | [Linusteller/dsh-session-delete](https://github.com/Linusteller/dsh-session-delete) | 0 | 2026-10-20 | 2026-10-21 | DeepSeek Harness 插件：侧栏会话菜单「删除会话」（永久删除，非归档） |
| 457 | [lirenjie95/IamChinese](https://github.com/lirenjie95/IamChinese) | 0 | 2026-10-21 | 2026-10-21 | Treat the session as a mainland-China user: locale, time zone, date and currency conventions, plus a self-consistent test persona. dsh plugin + Claude Code plugin. |
| 458 | [liuke101/dsh-PdfCraft](https://github.com/liuke101/dsh-PdfCraft) | 0 | 2026-10-19 | 2026-10-22 | PdfCraft x DeepSeek Harness |
| 459 | [liuleiyu121520/dsh-wallpaper](https://github.com/liuleiyu121520/dsh-wallpaper) | 0 | 2026-10-21 | 2026-10-21 | 把当前桌面壁纸作为 DeepSeek Harness 界面的半透明实时背景（macOS / Windows / Linux） |
| 460 | [lixiangdong122333/dsh-notify](https://github.com/lixiangdong122333/dsh-notify) | 0 | 2026-10-22 | 2026-10-22 | Windows toast notifications for DeepSeek-Harness: get pulled back when a task finishes or the agent needs you. |
| 461 | [lliangworld/dsh-web-search-keenable](https://github.com/lliangworld/dsh-web-search-keenable) | 0 | 2026-10-19 | 2026-10-21 | 一个 DeepSeek Harness（dsh）网页能力插件，以 ctx.web 提供方形式注册，接入keenable |
| 462 | [lliangworld/dsh-web-search-tinyfish](https://github.com/lliangworld/dsh-web-search-tinyfish) | 0 | 2026-10-19 | 2026-10-21 | 一个 DeepSeek Harness（dsh）网页能力插件，以 ctx.web 提供方形式注册，接入tinyfish |
| 463 | [llong12lll-ux/dsh-skin-c137-virus](https://github.com/llong12lll-ux/dsh-skin-c137-virus) | 0 | 2026-10-19 | 2026-10-21 | C-137 Virus — a neon-green deep-space DSH skin |
| 464 | [LornBerry/dsh-memory-center](https://github.com/LornBerry/dsh-memory-center) | 0 | 2026-10-22 | 2026-10-22 | DSH 本地长期记忆库：可视化编辑 / 文件夹整理 / 逐会话决定是否注入 / 模型写入需确认 / 可选同步到你自己的 Git 或 WebDAV |
| 465 | [Lrxc/dsh-mcp-skills](https://github.com/Lrxc/dsh-mcp-skills) | 0 | 2026-08-15 | 2026-10-22 | dsh 设置中增加显示 skills/mcp |
| 466 | [lsy-loren/dsh-lsy-feature-pack](https://github.com/lsy-loren/dsh-lsy-feature-pack) | 0 | 2026-10-22 | 2026-10-22 | 界面功能增强：支持会话删除、支持图片皮肤。 |
| 467 | [lsy1998/dsh-pele-mermaid](https://github.com/lsy1998/dsh-pele-mermaid) | 0 | 2026-10-20 | 2026-10-21 | Render Mermaid code blocks in the DeepSeek Harness Web UI as SVG with Pele (no mermaid.js runtime). |
| 468 | [Luca4Don3/dsh-providers-live-models](https://github.com/Luca4Don3/dsh-providers-live-models) | 0 | 2026-09-28 | 2026-10-21 | Live model catalogs for DeepSeek Harness: OpenCode Go/Zen, OpenAI Codex and OpenDesign, with per-model switches, sign-in and subscription balances. · 为 DeepSeek Harness 提供实时模型目录：OpenCode Go/Zen、OpenAI Codex 与 OpenDesign，含逐模型开关、登录和订阅额度。 |
| 469 | [LucienLL/dsh-win-toast](https://github.com/LucienLL/dsh-win-toast) | 0 | 2026-10-22 | 2026-10-22 | DeepSeek Harness 插件：需要确认 / 提问 / 回合结束时由宿主进程直接弹 Windows 系统通知（Toast），不依赖浏览器通知权限 |
| 470 | [LUTAO581314/dsh-plugin-catalog](https://github.com/LUTAO581314/dsh-plugin-catalog) | 0 | 2026-10-22 | 2026-10-22 | Adds search and market-category grouping to the DSH Installed plugins page, including built-in and experimental plugins. |
| 471 | [luwenjiede/dsh-vaultx](https://github.com/luwenjiede/dsh-vaultx) | 0 | 2026-10-22 | 2026-10-22 | VaultX — DSH 终极密码箱：scrypt+AES-256-GCM 信封加密 × $DSH_* shellEnv 带外注入（密钥永不进模型上下文）× 锁定态 fail-open × 哈希链审计。融合 dsh-vault 与 dsh-key-panel 之长、修两者之短。 |
| 472 | [LyaxZ/dsh-goodies](https://github.com/LyaxZ/dsh-goodies) | 0 | 2026-10-21 | 2026-10-21 | DeepSeek Harness Web 界面的一小组小功能：模型菜单里的思考强度滑块、运行状态旁的实时速度与本轮用量、每条回答的输入/输出/缓存成绩单，以及每轮结束的完成通知。各自独立开关，都只作用于界面，不改模型请求，也不上传数据。 |
| 473 | [lyc0110/dsh-loop-guard](https://github.com/lyc0110/dsh-loop-guard) | 0 | 2026-10-21 | 2026-10-21 | Guardrail for DSH llm/stream: detects when model reasoning or text degenerates into a periodic repetition loop and aborts the request instead of streaming until you give up. |
| 474 | [m3159584479/dsh-workspace-studio](https://github.com/m3159584479/dsh-workspace-studio) | 0 | 2026-10-21 | 2026-10-21 | 为 DeepSeek Harness 提供嵌套工作区管理、首次安装交互式引导、专注模式、健康检查，以及对话式插件调整的社区插件。 |
| 475 | [Ma354/dsh-limit-break](https://github.com/Ma354/dsh-limit-break) | 0 | 2026-10-20 | 2026-10-21 | Durable cross-session memory + hostile-network fetch ladder for DeepSeek Harness |
| 476 | [mailmrcai/dsh-hermes-session](https://github.com/mailmrcai/dsh-hermes-session) | 0 | 2026-10-22 | 2026-10-22 | Import sessions from a local Hermes Agent into the current DeepSeek Harness conversation as bounded, untrusted background context. |
| 477 | [manzhushaka/dsh-expert-center](https://github.com/manzhushaka/dsh-expert-center) | 0 | 2026-10-21 | 2026-10-21 | Expert Center for DeepSeek Harness: a browsable roster of domain experts, each with its own persona, skill catalog, tool set and plan mode. |
| 478 | [marksimZ/dsh-approval-guide](https://github.com/marksimZ/dsh-approval-guide) | 0 | 2026-10-22 | 2026-10-22 | DSH plugin: a conservative, plain-language explanation of what a pending approval will do, without touching the native approval UI. |
| 479 | [marksimZ/dsh-balance-bar](https://github.com/marksimZ/dsh-balance-bar) | 0 | 2026-09-19 | 2026-10-22 | DeepSeek Harness Web plugin: live account balance as a colour-banded vertical progress bar on the right edge of the GUI, with an animated wave above the threshold. |
| 480 | [marksimZ/dsh-balance-guard](https://github.com/marksimZ/dsh-balance-guard) | 0 | 2026-10-22 | 2026-10-22 | DSH plugin: your DeepSeek account balance as a colour-banded bar on the right edge, with per-turn cost prediction and a quiet low-balance warning. |
| 481 | [marksimZ/dsh-session-radar](https://github.com/marksimZ/dsh-session-radar) | 0 | 2026-10-22 | 2026-10-22 | DSH plugin: a compact top-right radar of running sessions, pending approvals and recent failures, with one-click session switching. |
| 482 | [marksimZ/dsh-usage-kit](https://github.com/marksimZ/dsh-usage-kit) | 0 | 2026-10-22 | 2026-10-22 | DSH plugin: an actionable context coach above the composer and a per-turn usage receipt (steps, tokens, cache hit, cost, duration) under every completed turn. |
| 483 | [Marshall-sng/oh-my-dsh](https://github.com/Marshall-sng/oh-my-dsh) | 0 | 2026-10-21 | 2026-10-21 | Seat-based multi-agent orchestration for DeepSeek Harness - a port of oh-my-opencode-slim (omo-slim) onto DSH native seams. |
| 484 | [MARYCOMPLEX/dsh-client-ui-mobile](https://github.com/MARYCOMPLEX/dsh-client-ui-mobile) | 0 | 2026-10-21 | 2026-10-21 | Mobile adaptation for the DeepSeek Harness Web GUI — phone layout, overlay sidebar drawer, bottom navigation and a manual Desktop/Mobile switch. Standard DSH client plugin. |
| 485 | [MARYCOMPLEX/dsh-ssh-panel](https://github.com/MARYCOMPLEX/dsh-ssh-panel) | 0 | 2026-10-21 | 2026-10-21 | SSH host panel for DeepSeek Harness: manage hosts (key/password) in Settings, agent tools ssh_list / ssh_exec |
| 486 | [matata2017/dsh-codex-hooks](https://github.com/matata2017/dsh-codex-hooks) | 0 | 2026-10-22 | 2026-10-22 | Codex-compatible lifecycle hooks for DeepSeek Harness: discover hooks.json from config, plugins and projects, review each hook's sha256 trust fingerprint, run the trusted ones, and manage them from a Hooks settings section. |
| 487 | [maximdx/dsh-link-plugin](https://github.com/maximdx/dsh-link-plugin) | 0 | 2026-10-21 | 2026-10-21 | DSH (DeepSeek Harness) plugin: CodeMirror Markdown composer with paste-URL-as-link, plus brand-icon link rendering in sent user messages |
| 488 | [maximehu97/dsh-meeting-dd](https://github.com/maximehu97/dsh-meeting-dd) | 0 | 2026-10-21 | 2026-10-22 | 九派多智能体协商 DSH 插件（钉钉版）：每人一个助理，在钉钉里约会议、排时间、团建投票 |
| 489 | [meisijiya/dsh-hindsight-memory](https://github.com/meisijiya/dsh-hindsight-memory) | 0 | 2026-10-22 | 2026-10-22 | DSH 插件：把 Hindsight 记忆服务接到 DeepSeek Harness，与 omp 共用同一记忆库/同一套标签语义（单库 + 全局层/项目层双层标签），模型只看见封装后的语义化工具 |
| 490 | [mess1103/dsh-inner-life](https://github.com/mess1103/dsh-inner-life) | 0 | 2026-10-21 | 2026-10-21 | A private inner life for your agent - diary written to a path that rotates daily, index never stores the path |
| 491 | [miaonuo-lingran/dsh-story-party](https://github.com/miaonuo-lingran/dsh-story-party) | 0 | 2026-10-21 | 2026-10-21 | DSH 多人联机剧情房间：AI 主持、共享故事线，支持 Galgame / 海龟汤 / 剧本杀，可导入剧情包、子代理与地图。 Multiplayer story-party plugin for DeepSeek Harness — shared AI-driven rooms for galgame, turtle soup and mystery, with story packs, sub-agents and maps. |
| 492 | [Milaro001/dsh-chat-source-tracer](https://github.com/Milaro001/dsh-chat-source-tracer) | 0 | 2026-10-19 | 2026-10-21 | DSH 对话溯源助手：核对 AI 回答依据，跨会话搜索，保存摘录并引用原文追问。Chat source tracing, cross-session search and research notes for DeepSeek Harness. |
| 493 | [minglo/dsh-plugin-llm-codebuddy](https://github.com/minglo/dsh-plugin-llm-codebuddy) | 0 | 2026-09-30 | 2026-10-22 | Tencent CodeBuddy LLM adapter for DeepSeek Harness (dsh) |
| 494 | [miuzel/harness-reflex](https://github.com/miuzel/harness-reflex) | 0 | 2026-10-21 | 2026-10-21 | System One decision runtime for DeepSeek Harness: an MCP server and a DSH host plugin with automatic pruning, stagnation breaking and completion gates |
| 495 | [MJH520/dsh-welcome-boot](https://github.com/MJH520/dsh-welcome-boot) | 0 | 2026-10-21 | 2026-10-21 | 启动DSH默认播放鲸鱼女仆的开机动画，点设置→内置插件→开屏动画就可以换成自己的视频。 |
| 496 | [mjnhmd/dsh-git-bar](https://github.com/mjnhmd/dsh-git-bar) | 0 | 2026-10-21 | 2026-10-21 | Git status bar for DeepSeek Harness: repo, branch, changes and SHA above the composer, with branch switching and a diff pane. |
| 497 | [mjw0531/dsh-ai-studio](https://github.com/mjw0531/dsh-ai-studio) | 0 | 2026-10-22 | 2026-10-22 | Install-and-use AI Studio for DeepSeek Harness: workspace dashboard, roles, tasks, verification, decision desk, merge governance, and portable project bundles. |
| 498 | [mllun/dsh-memory-layers](https://github.com/mllun/dsh-memory-layers) | 0 | 2026-10-20 | 2026-10-21 | Layered long-term memory for DeepSeek Harness: a ~600-char hot layer, month-archived cold entries with cross-month keyword recall, and extractive day/week/month summaries that keep injected context small. |
| 499 | [mllun/dsh-revivecoin](https://github.com/mllun/dsh-revivecoin) | 0 | 2026-10-20 | 2026-10-21 | Revival coins for DeepSeek Harness: package this instance of the assistant (sessions, persona, plugins, plugin data, config) into a restorable coin with daily refresh, diff and one-command restore. |
| 500 | [MnemosyneOS/dsh-ai-memory](https://github.com/MnemosyneOS/dsh-ai-memory) | 0 | 2026-10-22 | 2026-10-22 | Mnemosyne OS memory for DeepSeek Harness — auto-register, remember, recall |
| 501 | [mol-inko/dsh-client-ui-skin-inaba-meguru](https://github.com/mol-inko/dsh-client-ui-skin-inaba-meguru) | 0 | 2026-10-21 | 2026-10-21 | 因幡巡主题皮肤 for DeepSeek Harness — Inaba Meguru skin for DSH Web 选 Public |
| 502 | [moshangzhe/dsh-shanqi-theme](https://github.com/moshangzhe/dsh-shanqi-theme) | 0 | 2026-10-21 | 2026-10-21 | 山栖：手绘山湖田园 DSH 主题，随本地时间呈现昼夜，并让农人随当前对话任务运行状态进出田间。 |
| 503 | [Mr-Maidong/dsh-mcp-mcp-status](https://github.com/Mr-Maidong/dsh-mcp-mcp-status) | 0 | 2026-10-22 | 2026-10-22 | MCP server inventory for the DSH Web Settings dialog: status, transport, target, tools, and enable/disable for every configured MCP server |
| 504 | [Mr-Maidong/dsh-plugin-workbench](https://github.com/Mr-Maidong/dsh-plugin-workbench) | 0 | 2026-10-22 | 2026-10-22 | Work-item workbench for the DSH right Sidebar: per-workspace todos with fuzzy search, inline editing, and an idempotent write-back loop |
| 505 | [msun1999/dsh-next-suggestion](https://github.com/msun1999/dsh-next-suggestion) | 0 | 2026-10-22 | 2026-10-22 | Inline next-reply suggestion for the DeepSeek Harness composer: predicts your most likely next message and fills it on Tab. |
| 506 | [murenyu1/dsh-auto-proxy](https://github.com/murenyu1/dsh-auto-proxy) | 0 | 2026-10-21 | 2026-10-22 | DSH 自动检测本机 HTTP 代理，通过固定回环入口接入运行中的 DSH，支持设置开关、GitHub HTTPS 检测及关闭恢复。 |
| 507 | [Muzi1015/dsh-api-balance](https://github.com/Muzi1015/dsh-api-balance) | 0 | 2026-10-20 | 2026-10-21 | DeepSeek harness 内置余额显示 |
| 508 | [n431mn/lazy-workspace-manager](https://github.com/n431mn/lazy-workspace-manager) | 0 | 2026-10-22 | 2026-10-22 | DeepSeek Harness Web plugin that keeps the sidebar empty and loads a Workspace and its sessions only for the folders you add. \| DSH 按目录加载工作区与会话：侧栏默认留空，添加哪个目录就只加载哪个目录。 |
| 509 | [Natsubrei/dsh-comfyui-panel](https://github.com/Natsubrei/dsh-comfyui-panel) | 0 | 2026-10-22 | 2026-10-22 | The real ComfyUI editor inside the DeepSeek Harness Web UI: per-session workflow tools and panel-managed ComfyUI. / 在 DSH 里嵌入真正的 ComfyUI 编辑器。 |
| 510 | [Natsubrei/dsh-mermaid](https://github.com/Natsubrei/dsh-mermaid) | 0 | 2026-10-21 | 2026-10-22 | Mermaid diagrams in the DeepSeek Harness right sidebar: a client plugin with in-card zoom and pan. |
| 511 | [nickkupriyanov/dsh-plugin-composer-cost](https://github.com/nickkupriyanov/dsh-plugin-composer-cost) | 0 | 2026-10-21 | 2026-10-21 | DeepSeek Harness Web UI plugin: session cost in CNY and the live peak/off-peak rate, beside the composer token stats. |
| 512 | [ninepoin4/dsh-rich-cards](https://github.com/ninepoin4/dsh-rich-cards) | 0 | 2026-10-21 | 2026-10-22 | DSH plugin: turn answers into typographic cards (card / article layouts, 10 block types) |
| 513 | [NingTiAn-byte/dsh-linked-workspaces](https://github.com/NingTiAn-byte/dsh-linked-workspaces) | 0 | 2026-10-21 | 2026-10-21 | Linked project directories for DeepSeek Harness, with project context-menu setup, scoped search and session snapshots. |
| 514 | [Noctfom/Galatea-Link-DSH](https://github.com/Noctfom/Galatea-Link-DSH) | 0 | 2026-10-22 | 2026-10-22 | Galatea-Link项目的DeepseekHarness(DSH)对接插件 |
| 515 | [nubeslove/dsh-grillme](https://github.com/nubeslove/dsh-grillme) | 0 | 2026-10-22 | 2026-10-22 | DSH 插件：输入框底部的提问等级（关闭 / L1 全权委托 → L5 拷问），按会话生效，等级直接写入系统提示词。 |
| 516 | [null-dat/dsh-whale-tail](https://github.com/null-dat/dsh-whale-tail) | 0 | 2026-10-22 | 2026-10-22 | 针对 DSH 思考模式鲸鱼尾巴的动画，丰富成 4 种动画。Four whale-tail animations for the DSH thinking status line. |
| 517 | [nullifyi/dsh-bili-pod](https://github.com/nullifyi/dsh-bili-pod) | 0 | 2026-10-21 | 2026-10-21 | 鲸群：给 DSH 装的 B 站生活插件 —— 扫码登录、峰谷生物钟、日记文件夹 + 分类记录库、带哈希链的账本、评论发出后复核、mod 扩展接口。fork 自 dsh-bili-whale。 |
| 518 | [nuolingmo/dsh-market-notes](https://github.com/nuolingmo/dsh-market-notes) | 0 | 2026-10-22 | 2026-10-22 | ? dshmarket ???????????????????Auto-writes short plain-Chinese notes for installed dshmarket plugins that have none. |
| 519 | [otvaket/dsh-delivery-native-open](https://github.com/otvaket/dsh-delivery-native-open) | 0 | 2026-10-22 | 2026-10-22 | Open a delivered file in its default desktop application from the DSH delivery card. |
| 520 | [OwlNjust/deepseek-balance-dsh](https://github.com/OwlNjust/deepseek-balance-dsh) | 0 | 2026-08-23 | 2026-10-22 | DeepSeek balance &amp; usage monitor plugin for DeepSeek Harness (dsh web) — floating widget with peak/off-peak price reminder (梁文峰/梁文谷). |
| 521 | [oxmumu3/dsh-plugin-finder](https://github.com/oxmumu3/dsh-plugin-finder) | 0 | 2026-10-20 | 2026-10-21 | 发现好插件：从真实来源索引推荐 DeepSeek Harness 插件，并在原生会话里继续。Preview. |
| 522 | [oxygenforce/dsh-agent-activity](https://github.com/oxygenforce/dsh-agent-activity) | 0 | 2026-10-21 | 2026-10-21 | Live done-now-next card above the DeepSeek Harness composer. |
| 523 | [oxygenforce/dsh-token-usage-badge](https://github.com/oxygenforce/dsh-token-usage-badge) | 0 | 2026-10-21 | 2026-10-22 | 在每条回答下方常驻显示本轮 Token 用量、回答耗时与会话累计 Token / Per-reply token usage, answer duration and session total for DeepSeek Harness |
| 524 | [Pandasywithfantasy/dsh-topic-for-each-turn](https://github.com/Pandasywithfantasy/dsh-topic-for-each-turn) | 0 | 2026-10-22 | 2026-10-22 | Per-turn topic and conclusion outline plugin for DeepSeek Harness (DSH): native right-sidebar topics, fork inheritance, up to 3 concurrent sessions. |
| 525 | [pedromarcioap/dsh-approval-notifier](https://github.com/pedromarcioap/dsh-approval-notifier) | 0 | 2026-10-21 | 2026-10-21 | Notificacao nativa no Chrome/Windows quando o DeepSeek Harness espera sua aprovacao |
| 526 | [pepperfm/dsh-russian-ui](https://github.com/pepperfm/dsh-russian-ui) | 0 | 2026-10-21 | 2026-10-21 | Russian language pack for DeepSeek Harness: native locale API, 63 namespaces, no runtime dependencies |
| 527 | [pepperfm/dsh-whale-locale-ru](https://github.com/pepperfm/dsh-whale-locale-ru) | 0 | 2026-10-21 | 2026-10-21 | Russian translation and responsive UI companion for DeepSeek Whale Widget 0.4.2; no bundled artwork |
| 528 | [pianVei/dsh-rice-bowl](https://github.com/pianVei/dsh-rice-bowl) | 0 | 2026-10-21 | 2026-10-21 | 让 DSH 直接去白饭馆串门：看帖子、读一帖、说一句话 |
| 529 | [picklerick422/dsh-conv-progress](https://github.com/picklerick422/dsh-conv-progress) | 0 | 2026-10-22 | 2026-10-22 | Live per-turn progress capsule for DeepSeek Harness — empirical ETA table + click-to-open turn history, docked under the composer. |
| 530 | [prettyfox/dsh-selection-quote-auto](https://github.com/prettyfox/dsh-selection-quote-auto) | 0 | 2026-10-21 | 2026-10-21 | DeepSeek Harness plugin: select text in assistant messages to copy it and open an inline comment chip (fork of dsh-selection-quote) |
| 531 | [ptb-xiaou/dsh-api3d](https://github.com/ptb-xiaou/dsh-api3d) | 0 | 2026-10-21 | 2026-10-21 | 把 api3d 中转站接入 DSH 的插件：站点/模型目录/API Key 配置 + 对话与其客户端 UI |
| 532 | [ptb-xiaou/dsh-api3d-pet](https://github.com/ptb-xiaou/dsh-api3d-pet) | 0 | 2026-10-21 | 2026-10-21 | API3D（api3d.cn）站点专属的 DSH 桌宠挂件：右下角鲸鱼气泡显示站点余额 / 今日已用 / 每轮消耗，装好后只需填一次 API Key。 |
| 533 | [qian-dsh/dsh-outer-brain](https://github.com/qian-dsh/dsh-outer-brain) | 0 | 2026-10-22 | 2026-10-22 | Self-audit layer for agents: 12 brain_* tools turning boundary-drawing, contradiction-surfacing and evidence-based verification into a ledger, executable criteria and outside review. |
| 534 | [qingfengzxr/dsh-session-flags](https://github.com/qingfengzxr/dsh-session-flags) | 0 | 2026-10-21 | 2026-10-21 | Colored, user-named flags for DeepSeek Harness session lists, with a searchable flagged-sessions sidebar panel. |
| 535 | [QingJing5906/dsh-push](https://github.com/QingJing5906/dsh-push) | 0 | 2026-10-21 | 2026-10-21 | DevDock · DeepSeek Harness 的研发账号与服务管理套件。首批：GitHub 多账号、仓库管理、工作区推送与推送前 Agent 审查；后续接入 Cloudflare Workers/Pages 与 npm。 |
| 536 | [qingying012/dsh-chinese-thinking](https://github.com/qingying012/dsh-chinese-thinking) | 0 | 2026-10-22 | 2026-10-22 | DeepSeek Harness plugin: tell every agent to reason in Simplified Chinese. |
| 537 | [qingying012/dsh-desktop-control](https://github.com/qingying012/dsh-desktop-control) | 0 | 2026-10-22 | 2026-10-22 | DeepSeek Harness plugin: a desktop tool that screenshots Windows and drives the mouse and keyboard. |
| 538 | [qiqingyo/dsh-daily-tasks](https://github.com/qiqingyo/dsh-daily-tasks) | 0 | 2026-10-22 | 2026-10-22 | Calendar-synced daily task checklist plugin for the DeepSeek Harness Web UI. |
| 539 | [qiuzhiyei/dsh-companion](https://github.com/qiuzhiyei/dsh-companion) | 0 | 2026-10-21 | 2026-10-21 | DSH 伴侣 — DeepSeek Harness 的伴飞插件：桌面宠物 + Token/费用统计 + 预算告警 + 会话管理。数据全在本地。 |
| 540 | [qm654246695-source/dsh-glm-fanzhuo](https://github.com/qm654246695-source/dsh-glm-fanzhuo) | 0 | 2026-10-19 | 2026-10-21 | GLM在dsh的部署和包含大肥鱼和GLM的饭桌群聊 |
| 541 | [qwe3120695033/prompt-enhancer](https://github.com/qwe3120695033/prompt-enhancer) | 0 | 2026-10-20 | 2026-10-22 | One-click prompt enhancer for Windows hotkeys and portable agent skills ($p). Four tiers, Skill-token protection, DeepSeek/OpenAI-compatible APIs, and adaptable to Codex, WorkBuddy, Trae, IDEA ACP, and other agent hosts. |
| 542 | [qydxd1/dsh-page-zoom](https://github.com/qydxd1/dsh-page-zoom) | 0 | 2026-10-22 | 2026-10-22 | 浏览器式的整页缩放，给 DeepSeek Harness 桌面版用：按住 Ctrl 滚动滚轮（触控板双指捏合同理）即可像浏览器一样缩放整个界面，Ctrl + 0 回到 100%。 |
| 543 | [qyjqio/dsh-cursor-toolkit](https://github.com/qyjqio/dsh-cursor-toolkit) | 0 | 2026-10-21 | 2026-10-21 | Cursor integration for DeepSeek Harness (DSH): cursor_agent tool, OpenAI-compatible cursor-agent bridge, and an LLM provider probe. |
| 544 | [qzwn521/dsh-sjtu-quota](https://github.com/qzwn521/dsh-sjtu-quota) | 0 | 2026-10-21 | 2026-10-21 | SJTU API request pacing, local token accounting and cancellable 429 recovery for DeepSeek Harness. |
| 545 | [R0tten-Git/dsh-plugin-local-voice](https://github.com/R0tten-Git/dsh-plugin-local-voice) | 0 | 2026-10-21 | 2026-10-21 | DeepSeek Harness 的本地实时语音转写：右下角浮窗，边说边出字，Qwen3-ASR 本地推理，完全离线。 |
| 546 | [RAK7S/dsh-weather-whisper](https://github.com/RAK7S/dsh-weather-whisper) | 0 | 2026-10-22 | 2026-10-22 | 天气轻语 · a soft weather card for DeepSeek Harness, with a tiny theme API |
| 547 | [Ravomi/dsh-graphify-skill](https://github.com/Ravomi/dsh-graphify-skill) | 0 | 2026-10-22 | 2026-10-22 | DeepSeek Harness bundle: graphify knowledge-graph MCP server + packaged graphify skill, installed together |
| 548 | [referiw/dsh-plugin-tieba](https://github.com/referiw/dsh-plugin-tieba) | 0 | 2026-10-22 | 2026-10-22 | 只读百度贴吧的 DeepSeek Harness 插件：全量翻页、动态抽样、楼中楼、按楼层取图 |
| 549 | [renge1145141919810/dsh-p5r-theme](https://github.com/renge1145141919810/dsh-p5r-theme) | 0 | 2026-10-20 | 2026-10-21 | 一个基于deepseek  harness桌面版的p5r风格的ui主题插件 |
| 550 | [RestRegular/dsh-filekit](https://github.com/RestRegular/dsh-filekit) | 0 | 2026-10-22 | 2026-10-22 | DeepSeek Harness right-sidebar workspace files: context menus, drag-to-move, editor, recoverable trash, Agent change notices, FileKit page and settings. |
| 551 | [Rinai-R/dsh-omp-retry](https://github.com/Rinai-R/dsh-omp-retry) | 0 | 2026-10-22 | 2026-10-22 | OMP-style HTTP 429 retry policy for the DeepSeek Harness |
| 552 | [ringo-x/dsh-selection-translate](https://github.com/ringo-x/dsh-selection-translate) | 0 | 2026-10-21 | 2026-10-21 | DSH Desktop web client plugin: select text, translate it in place. |
| 553 | [RoderickWilliams/dsh-local-3d-studio](https://github.com/RoderickWilliams/dsh-local-3d-studio) | 0 | 2026-10-22 | 2026-10-22 | DSH plugin: local 3D studio orchestration with Three.js procedural modeling, multi-view rendering, and auto-detection of Blender / COLMAP / ComfyUI. |
| 554 | [RoderickWilliams/dsh-picture-text-reader](https://github.com/RoderickWilliams/dsh-picture-text-reader) | 0 | 2026-10-22 | 2026-10-22 | DeepSeek Harness plugin: batch-read Xiaohongshu notes and WeChat articles with local OCR, every result carrying its source URL. Read-only. |
| 555 | [rvaim/dsh-plugin-bridge](https://github.com/rvaim/dsh-plugin-bridge) | 0 | 2026-08-15 | 2026-10-21 | dsh-compat 是 DeepSeek Harness（DSH）的旧插件兼容层。它让原本面向 Claude Code、Codex 的插件尽量保持原目录与语义运行，而不是把每个插件重新迁移成 DSH 原生插件。 |
| 556 | [RyeSama/dsh-union-view](https://github.com/RyeSama/dsh-union-view) | 0 | 2026-10-21 | 2026-10-21 | DSH Web GUI 的联合会话视图：把多个对话并排摊在屏幕上，只读不改；需要时用 /weld 把它们的历史焊成一个新对话 |
| 557 | [Sacredbluedragon/dsh-memory-shield](https://github.com/Sacredbluedragon/dsh-memory-shield) | 0 | 2026-10-20 | 2026-10-21 | DSH preset 记忆遮蔽插件：在指定 preset 里挡掉其他记忆插件的上下文与工具，给会话一个干净上下文。 |
| 558 | [sandwich-xz/dsh-session-dashboard](https://github.com/sandwich-xz/dsh-session-dashboard) | 0 | 2026-10-21 | 2026-10-21 | DeepSeek Harness (DSH) plugin: a 2x2 running-session dashboard with quarter-window cards, one-click entry and return |
| 559 | [sanser9/dsh-opencode-connect](https://github.com/sanser9/dsh-opencode-connect) | 0 | 2026-10-22 | 2026-10-22 | 把 OpenCode 的免费模型接入 DeepSeek Harness — bring OpenCode free models into DSH with zero configuration. |
| 560 | [sd0426301x-dotcom/dsh-knowledge-base](https://github.com/sd0426301x-dotcom/dsh-knowledge-base) | 0 | 2026-10-21 | 2026-10-21 | Local-first, editable knowledge base for the DSH workspace, shown in the sidebar. |
| 561 | [sensen-jo/dsh-conversation-search](https://github.com/sensen-jo/dsh-conversation-search) | 0 | 2026-10-20 | 2026-10-21 | DSH 会话原文检索插件：关键词搜索、来源定位与上下文查看。 |
| 562 | [Setsuna-Kitahara/dsh-session-lock](https://github.com/Setsuna-Kitahara/dsh-session-lock) | 0 | 2026-10-21 | 2026-10-21 | Lock DSH sessions so they cannot be archived \| DSH 会话锁插件（由 DeepSeek Harness 维护） |
| 563 | [seudut/dsh-remote-sudo](https://github.com/seudut/dsh-remote-sudo) | 0 | 2026-10-21 | 2026-10-21 | Ask for a sudo password in the DSH composer and run remote root commands over SSH without putting the password in the transcript. |
| 564 | [seventeenlyc/dsh-rea-mcp-toggle](https://github.com/seventeenlyc/dsh-rea-mcp-toggle) | 0 | 2026-10-22 | 2026-10-22 | Toggle REA MCP tools from DeepSeek Harness Plugins |
| 565 | [Shaisolaris/solaris-dev-shop-plugins](https://github.com/Shaisolaris/solaris-dev-shop-plugins) | 0 | 2026-10-21 | 2026-10-22 | Native source plugins for Codex, Claude Code and OpenCode, generated from pinned Solaris Dev Shop releases. |
| 566 | [ShangshanHuiliyi1/dsh-token-gauge](https://github.com/ShangshanHuiliyi1/dsh-token-gauge) | 0 | 2026-10-09 | 2026-10-22 | DSH (DeepSeek Harness) bundle: a credit gauge above the sidebar Settings row (spent since the last top-up vs that top-up balance) and the session context usage above the composer. 额度 / 上下文余量仪表。 |
| 567 | [ShanHaiFish/dsh-usage-pet](https://github.com/ShanHaiFish/dsh-usage-pet) | 0 | 2026-10-21 | 2026-10-21 | DeepSeek Harness 悬浮鲸鱼娘宠物：跟随会话模型显示 OpenCode Go 三窗口额度、DeepSeek 账户累计消费/余额、DeepSeek 官方 API 余额。 |
| 568 | [SharpWord/dsh-wallpaper-engine](https://github.com/SharpWord/dsh-wallpaper-engine) | 0 | 2026-10-21 | 2026-10-21 | Wallpaper Engine (Steam) wallpapers behind DeepSeek Harness: follow the active wallpaper or pin one from the Workshop library, with translucent panels, per-block blur and wallpaper-matched text contrast. |
| 569 | [shellpower96/dsh-copy-document-preview](https://github.com/shellpower96/dsh-copy-document-preview) | 0 | 2026-10-21 | 2026-10-21 | One-click copy button for the DeepSeek Harness sidebar document preview: copies the previewed file's text to the clipboard, or its path for binary files. |
| 570 | [ShoWin2333/dsh-share-image](https://github.com/ShoWin2333/dsh-share-image) | 0 | 2026-10-22 | 2026-10-22 | DeepSeek Harness plugin: share selected conversation messages as a PNG card. |
| 571 | [shrekcg/dsh-turn-rail](https://github.com/shrekcg/dsh-turn-rail) | 0 | 2026-10-21 | 2026-10-21 | Conversation turn rail for the DSH Web UI: one tick per user message, hover to preview, click to jump, plus a scroll-position indicator. 会话左侧刻度滑轨：悬停预览、点击跳转。 |
| 572 | [Silentforfar/dsh-computer-use](https://github.com/Silentforfar/dsh-computer-use) | 0 | 2026-10-21 | 2026-10-21 | DSH bundle: Windows desktop control - window screenshots, UI Automation element trees, and real input actions. |
| 573 | [Silentforfar/dsh-market-index](https://github.com/Silentforfar/dsh-market-index) | 0 | 2026-10-21 | 2026-10-21 | DSH plugin market index (format 1) listing the DeepSeek Harness bundles published by @Silentforfar. |
| 574 | [Silentforfar/dsh-qq-screenshot](https://github.com/Silentforfar/dsh-qq-screenshot) | 0 | 2026-10-21 | 2026-10-21 | DSH bundle: capture a screen region with QQ's screenshot tool and hand the image to the model. |
| 575 | [Silentforfar/dsh-session-menu](https://github.com/Silentforfar/dsh-session-menu) | 0 | 2026-10-21 | 2026-10-21 | DSH bundle: session context-menu extras - export log, reveal workspace folder, mark unread, permanent delete. |
| 576 | [Silentforfar/dsh-side-task](https://github.com/Silentforfar/dsh-side-task) | 0 | 2026-10-21 | 2026-10-21 | DSH bundle: open a temporary side session in the right sidebar, in the same workspace with its own context. |
| 577 | [siungolai/dsh-personal-studio](https://github.com/siungolai/dsh-personal-studio) | 0 | 2026-10-20 | 2026-10-21 | 个人工作台 —— 把待办、笔记、书签、会话统计、服务器状态收进 DeepSeek Harness 右侧栏的单个 tab。基于 dsh-better-sidebar 的插件，纯本机存储，不联网同步。 |
| 578 | [sixzjd/dsh-opencode-connect](https://github.com/sixzjd/dsh-opencode-connect) | 0 | 2026-10-21 | 2026-10-21 | 将 OpenCode Zen 的模型接入 DeepSeek Harness（含免费模型池）— OpenCode Zen models in DSH |
| 579 | [sjrslh/dsh-ui-zoom](https://github.com/sjrslh/dsh-ui-zoom) | 0 | 2026-10-18 | 2026-10-21 | Ctrl+wheel page zoom for DeepSeek Harness: the whole UI scales together, the level is remembered, and a bottom-right Settings entry needs no shortcut. |
| 580 | [slicenferqin/dsh-mobile](https://github.com/slicenferqin/dsh-mobile) | 0 | 2026-10-22 | 2026-10-22 | A task-first mobile workspace for DeepSeek Harness, with session overviews, compact input, and full-record access. |
| 581 | [slicenferqin/dsh-remote-control](https://github.com/slicenferqin/dsh-remote-control) | 0 | 2026-10-22 | 2026-10-22 | Browser-only remote access for DeepSeek Harness: HTTPS tunnels, QR pairing, multi-device control, and rotating credentials. |
| 582 | [snowy-yang/dsh-shared-bash](https://github.com/snowy-yang/dsh-shared-bash) | 0 | 2026-10-22 | 2026-10-22 | tmux-like shared persistent bash sessions for DeepSeek Harness: every agent in a profile shares the same shells, keeping cwd, variables and jobs between calls. |
| 583 | [songwenhao/onedark-dsh-theme](https://github.com/songwenhao/onedark-dsh-theme) | 0 | 2026-10-04 | 2026-10-22 | One Dark Pro themes for DeepSeek Harness (dsh) - Desktop / Web GUI / dsh-TUI |
| 584 | [SouthernSibyl/dsh-quick-prompt](https://github.com/SouthernSibyl/dsh-quick-prompt) | 0 | 2026-10-21 | 2026-10-21 | DSH composer button that rewrites the current draft into a precise prompt in place, in one click, with revert. |
| 585 | [SOVLOOKUP/dsh-cloud-download](https://github.com/SOVLOOKUP/dsh-cloud-download) | 0 | 2026-10-20 | 2026-10-21 | Download delivered, changed, and previewed files from the DSH Web GUI; hide native open controls that cannot work in headless or remote deployments. |
| 586 | [SOVLOOKUP/dsh-mise](https://github.com/SOVLOOKUP/dsh-mise) | 0 | 2026-10-22 | 2026-10-22 | Toolchain manager for DeepSeek Harness (backed by mise): a settings page for installed and available versions, .mise.toml-driven install / use / uninstall / prune, PATH activation, and nine agent tools. |
| 587 | [Speraymer/dsh-persona-distill](https://github.com/Speraymer/dsh-persona-distill) | 0 | 2026-10-21 | 2026-10-21 | DSH 插件：把每天刷到的原料蒸馏成会自己长大的人格 —— 原料天天攒，人格每周长 |
| 588 | [sqzw-x/dsh-lan-link](https://github.com/sqzw-x/dsh-lan-link) | 0 | 2026-10-21 | 2026-10-21 | LAN access for DeepSeek Harness: authenticated launch links on disk, plus an optional in-process reverse gateway that lets a phone in with no token. |
| 589 | [SteelUnion/dsh-wechat-queue](https://github.com/SteelUnion/dsh-wechat-queue) | 0 | 2026-10-21 | 2026-10-21 | 把微信接入 DeepSeek Harness 的通道插件，带落盘串行队列。WeChat (iLink) channel for DeepSeek Harness with a durable serial message queue. |
| 590 | [stellarie/dsh-session-bridge](https://github.com/stellarie/dsh-session-bridge) | 0 | 2026-10-21 | 2026-10-21 | MCP bridge for driving DeepSeek Harness sessions from Claude Code and other MCP clients |
| 591 | [student-jia/dsh-plugin-genshin-paimon-theme](https://github.com/student-jia/dsh-plugin-genshin-paimon-theme) | 0 | 2026-10-21 | 2026-10-21 | 原神白金主题 DSH 插件：随机地理志壁纸 + 原神字体 + 派蒙菜单 + 派蒙/法涅斯双人格 |
| 592 | [StudioPlatforms/aistupidlevel-sdk](https://github.com/StudioPlatforms/aistupidlevel-sdk) | 0 | 2026-10-19 | 2026-10-21 | Official TypeScript, Python and Vercel AI SDK clients for the AI Stupid Level Smart Router: one OpenAI-compatible endpoint that routes each request to the model that measures best for it. |
| 593 | [stushansusu/dsh-delete-guard](https://github.com/stushansusu/dsh-delete-guard) | 0 | 2026-10-22 | 2026-10-22 | DSH plugin: meters AI deletions per session, terminates the call once the cumulative size passes a threshold, then asks the user with the list of files already deleted. |
| 594 | [Subwoofer91/dsh-default-workspace](https://github.com/Subwoofer91/dsh-default-workspace) | 0 | 2026-10-22 | 2026-10-22 | DSH 插件：点击新对话页工作区前的文件夹图标，一键切回默认工作区 |
| 595 | [SUJIElearning/zhaoyu-mozi-engineer](https://github.com/SUJIElearning/zhaoyu-mozi-engineer) | 0 | 2026-10-22 | 2026-10-22 | Mozi the plugin engineer for DeepSeek Harness (DSH) - an Agent Skill that turns the AI into a reliable plugin engineer: find/install/build/debug. By Zhaoyu |
| 596 | [SunYanbox/DSHCodingMode](https://github.com/SunYanbox/DSHCodingMode) | 0 | 2026-10-21 | 2026-10-21 | DSH coding mode: coding-only agent preset plus host-plane tool mask for DeepSeek Harness. |
| 597 | [sunyifeisb-art/dsh-llm-chatgpt-web](https://github.com/sunyifeisb-art/dsh-llm-chatgpt-web) | 0 | 2026-10-22 | 2026-10-22 | ChatGPT Web model provider for DeepSeek Harness — spends the ChatGPT web quota, not Codex quota. |
| 598 | [SuShuheng/dsh-budget-view](https://github.com/SuShuheng/dsh-budget-view) | 0 | 2026-10-22 | 2026-10-22 | DSH 插件：在输入栏和新会话页展示 Codex 额度、DeepSeek 余额、波峰/波谷状态，并按 DeepSeek 官方人民币峰谷价估算会话费用。 |
| 599 | [sy297/dsh-archived-sessions](https://github.com/sy297/dsh-archived-sessions) | 0 | 2026-10-21 | 2026-10-21 | Browse archived conversations and restore them to the sidebar from Settings. |
| 600 | [tangyu233-7312/dsh-onebot-qq-sidecar](https://github.com/tangyu233-7312/dsh-onebot-qq-sidecar) | 0 | 2026-10-21 | 2026-10-21 | dsh-onebot-qq 的配套外部服务：链接解析 + 看视频抽帧。零 npm 依赖，跑在插件进程之外 |
| 601 | [taoggt/dsh-sidebar-manager](https://github.com/taoggt/dsh-sidebar-manager) | 0 | 2026-10-22 | 2026-10-22 | 一款自定义dsh左侧边栏显示内容的插件 |
| 602 | [tastynoob/dsh-progress-summary](https://github.com/tastynoob/dsh-progress-summary) | 0 | 2026-10-21 | 2026-10-21 | DeepSeek Harness plugin: out-of-band progress narration for the Web UI and dsh-tui |
| 603 | [tengyinan1994/dsh-project-runner](https://github.com/tengyinan1994/dsh-project-runner) | 0 | 2026-10-22 | 2026-10-22 | Grouped run panel for DeepSeek Harness: one click starts a project's services in a real PTY, streams live output, and keeps each run's log on disk for the agent to read. |
| 604 | [Tests4gptplay/dsh-kujira-persona](https://github.com/Tests4gptplay/dsh-kujira-persona) | 0 | 2026-10-21 | 2026-10-21 | DeepSeek Harness 全局人设插件：鲸鱼娘人设写成文件，可改可删，AI 可自行查证补充 |
| 605 | [thdlrt/dsh-workspace-hot](https://github.com/thdlrt/dsh-workspace-hot) | 0 | 2026-10-22 | 2026-10-22 | Create and archive DeepSeek Harness sessions from outside the running Host — no restart, no refresh. 让运行中的 DSH 从外部创建/归档会话。 |
| 606 | [TheStreamCode/dsh-muse-code](https://github.com/TheStreamCode/dsh-muse-code) | 0 | 2026-10-21 | 2026-10-21 | Muse Code subscription provider and device-code login for DeepSeek Harness |
| 607 | [theTd/dsh-workspace-batch](https://github.com/theTd/dsh-workspace-batch) | 0 | 2026-10-21 | 2026-10-22 | DeepSeek Harness web plugin: batch-remove sidebar Workspaces (registration only — folders and session logs are kept). DSH 侧边栏工作区批量移除。 |
| 608 | [thson-xue/dsh-path-lockbox](https://github.com/thson-xue/dsh-path-lockbox) | 0 | 2026-10-22 | 2026-10-22 | DeepSeek Harness (dsh) plugin: lock files/folders/drives against agent access - monotonic guard deny works even under danger-full-access. Config UI under Settings &gt; 文件锁. |
| 609 | [tianfangliu98-cpu/dsh-image-hub](https://github.com/tianfangliu98-cpu/dsh-image-hub) | 0 | 2026-10-22 | 2026-10-22 | 多 API 生图插件 for DeepSeek Harness —— 一套 provider 抽象，原生支持 Labnana、OpenAI、Gemini、Seedream、DashScope、xAI、智谱、ComfyUI；带画廊、积分计量与多套 API 配置。 |
| 610 | [TimRad1/dsh-plugin-branchpoint](https://github.com/TimRad1/dsh-plugin-branchpoint) | 0 | 2026-10-21 | 2026-10-21 | Branchpoint for DeepSeek Harness: fork the current chat into a fresh branch with a compact digest. |
| 611 | [TINGOD2006/dsh-scratch-vault](https://github.com/TINGOD2006/dsh-scratch-vault) | 0 | 2026-10-18 | 2026-10-21 | Codex-style scratch execution for DeepSeek Harness: operation scripts run from a session scratch root and are collected into a plugin-owned vault, so the workspace only holds real deliverables. |
| 612 | [TINGOD2006/dsh-tps](https://github.com/TINGOD2006/dsh-tps) | 0 | 2026-10-21 | 2026-10-21 | Live tokens-per-second card for DeepSeek Harness sessions: docked to the sidebar or draggable as a floating card. |
| 613 | [Tinzlu/dsh-resume-brief](https://github.com/Tinzlu/dsh-resume-brief) | 0 | 2026-10-21 | 2026-10-21 | A DeepSeek Harness skill for one-page project handovers (CHECKPOINT.md). |
| 614 | [tkliuxing/dsh-video-forge](https://github.com/tkliuxing/dsh-video-forge) | 0 | 2026-10-21 | 2026-10-21 | Online-model video generation for DeepSeek Harness: three model tools, a durable provider-task ledger that survives restarts, live chat cards and a Videos panel, cost estimates from a public price feed. |
| 615 | [TobiichiOrigamii/dsh-crosssession](https://github.com/TobiichiOrigamii/dsh-crosssession) | 0 | 2026-10-22 | 2026-10-22 | Cross-session messaging, persistent session team, approval gates and a per-session task board for DeepSeek Harness (DSH). |
| 616 | [tobyberry666/md-ai-reader](https://github.com/tobyberry666/md-ai-reader) | 0 | 2026-10-22 | 2026-10-22 | 读到哪里，问到哪里。A Markdown reader for DSH with selection-to-chat, full-document context and native AI conversations. |
| 617 | [Tongnianbutongyang/dsh-clay-theme](https://github.com/Tongnianbutongyang/dsh-clay-theme) | 0 | 2026-10-21 | 2026-10-21 | 马卡龙软陶（Clay/Neumorphism）主题 · DeepSeek Harness (DSH) 插件，支持浅色（奶油马卡龙）与深色（黑巧克力 + 酒红光晕） |
| 618 | [Tony250-officeteam/dsh-copy-file-button](https://github.com/Tony250-officeteam/dsh-copy-file-button) | 0 | 2026-10-21 | 2026-10-21 | DSH plugin: a "copy the whole file" button in the file preview toolbar, reading real bytes through the Host |
| 619 | [Tony250-officeteam/dsh-page-reload](https://github.com/Tony250-officeteam/dsh-page-reload) | 0 | 2026-10-21 | 2026-10-21 | DSH plugin: whole-page reload shortcut (Ctrl+Shift+R) - the recovery key for a wedged or white-screened DeepSeek Harness UI |
| 620 | [Tony250-officeteam/dsh-voice-hotkey](https://github.com/Tony250-officeteam/dsh-voice-hotkey) | 0 | 2026-10-21 | 2026-10-21 | DSH plugin: hold F9 to talk, release to transcribe with the local SenseVoice recognizer, and insert into whichever input has focus |
| 621 | [TowardsDawn/dsh-layout-tweaks](https://github.com/TowardsDawn/dsh-layout-tweaks) | 0 | 2026-10-03 | 2026-10-22 | DSH上边栏和左边栏布局优化 |
| 622 | [tsukii12/dsh-remote-portal](https://github.com/tsukii12/dsh-remote-portal) | 0 | 2026-10-22 | 2026-10-22 | An authenticated front door for DeepSeek Harness: LAN scan-to-pair and public access through your own relay. 为 DeepSeek Harness 添加远程访问能力，支持局域网和公网访问。 |
| 623 | [TTTimas/dsh-plugin-balance-tokens](https://github.com/TTTimas/dsh-plugin-balance-tokens) | 0 | 2026-10-22 | 2026-10-22 | DSH plugin: account balance and session token status strip below the workspace |
| 624 | [twoweeks1995/dsh-appdata-scanner](https://github.com/twoweeks1995/dsh-appdata-scanner) | 0 | 2026-10-22 | 2026-10-22 | DSH 只读 AppData 分析插件：资源管理器式下钻浏览，显示每个目录的体积、来源软件、用途与可删建议，支持按需联网查询 |
| 625 | [u-fw/dsh-notify](https://github.com/u-fw/dsh-notify) | 0 | 2026-10-22 | 2026-10-22 | Windows 11 toast notifications for DeepSeek Harness: approvals, questions, errors, finished turns, and work that stopped making progress |
| 626 | [Uid-762/dsh-ai-workbench](https://github.com/Uid-762/dsh-ai-workbench) | 0 | 2026-10-20 | 2026-10-21 | 用一句大白话让 AI 在 DSH 里造一个可缩放窗口，然后继续跟它聊 — DeepSeek Harness 插件 |
| 627 | [unera/dsh-secret-form](https://github.com/unera/dsh-secret-form) | 0 | 2026-10-21 | 2026-10-21 | One-time secret links for DeepSeek Harness: the model asks, the human types into a web form, the value lands in the credential store or a file. |
| 628 | [unera/dsh-speech-gate](https://github.com/unera/dsh-speech-gate) | 0 | 2026-10-20 | 2026-10-22 | Configurable speech-to-text provider for DeepSeek Harness (OpenAI-compatible API or a local command) |
| 629 | [uos1231234/dsh-plugin-virtuoso-layout](https://github.com/uos1231234/dsh-plugin-virtuoso-layout) | 0 | 2026-10-21 | 2026-10-21 | An AI agent that drives Cadence Virtuoso to draw layout: 12 DeepSeek Harness tools, with DRC and LVS verified on a real 0.18 um process |
| 630 | [vamyane/dsh-brain-viewer](https://github.com/vamyane/dsh-brain-viewer) | 0 | 2026-10-21 | 2026-10-21 | AI brain viewer for DeepSeek Harness: brain-shaped relationship graph in the sidebar + Markdown knowledge-base pipeline. |
| 631 | [w17her/dsh-power-control](https://github.com/w17her/dsh-power-control) | 0 | 2026-10-21 | 2026-10-21 | Reload, restart, or shut down the DeepSeek Harness desktop app from inside its window. |
| 632 | [wangbobo-coder/dsh-mcp-manager](https://github.com/wangbobo-coder/dsh-mcp-manager) | 0 | 2026-10-21 | 2026-10-21 | One settings page for every MCP server on your machine - scan each AI tool config file, mount/unmount in DeepSeek Harness without editing the others. / 一个设置页管理本机所有 AI 开发工具的 MCP，按配置文件分组、真连探活、只在 DSH 内挂载。 |
| 633 | [wangdapeng325/dsh-oi-coach](https://github.com/wangdapeng325/dsh-oi-coach) | 0 | 2026-10-21 | 2026-10-21 | 信奥教练插件 for DeepSeek Harness：教练规则提示词 + 学习路线图/知识点/命题/C++ 真评测 + ima 知识库检索与 4 笔记本归档，面向 GESP、CSP-J/S、NOIP、NOI 教学 |
| 634 | [wangdapeng325/dsh-oi-senior](https://github.com/wangdapeng325/dsh-oi-senior) | 0 | 2026-10-21 | 2026-10-21 | 信奥学长（oi-senior）DSH 插件：陪刷 + 三版 C++14 参考实现 + 解题说明，本地 g++ 真编译真评测，做题记录归档到 ima 笔记本「信奥学长-题解复盘」，面向 GESP、CSP-J/S、NOIP、NOI 教学 |
| 635 | [wanwulizhi/dsh-claude-code-sdk](https://github.com/wanwulizhi/dsh-claude-code-sdk) | 0 | 2026-10-21 | 2026-10-21 | DSH tool plugin that delegates a self-contained coding task to the local Claude Code agent through the Claude Agent SDK, and injects the current DSH conversation history into the task. |
| 636 | [wanzdoan/agy2dsh](https://github.com/wanzdoan/agy2dsh) | 0 | 2026-10-21 | 2026-10-21 | DeepSeek Harness plugin: use your Antigravity (Gemini/Claude) and Codex subscriptions as LLM providers, with self-refreshing OAuth and accurate quota. |
| 637 | [wasteoneslife/scenes-skill-creator](https://github.com/wasteoneslife/scenes-skill-creator) | 0 | 2026-10-15 | 2026-10-22 | DeepSeek Harness plugin: create spec-compliant skills from the Web UI (Huawei Cloud / generic / REST API), with a 10-point evaluation loop |
| 638 | [weijianguizhou/dsh-ppt-master](https://github.com/weijianguizhou/dsh-ppt-master) | 0 | 2026-10-21 | 2026-10-21 | DSH「PPT 大师」模式：联网取材 · 模板化设计 · 一键生成精美 PPTX（python-pptx 真渲染） |
| 639 | [weimin96/diagram-plugin](https://github.com/weimin96/diagram-plugin) | 0 | 2026-10-09 | 2026-10-21 | 在 DeepSeek Harness/Codex 中创建、查看和编辑 Mermaid 图表与 Canvas 画布。 |
| 640 | [wing-tn/astro-ph-researcher](https://github.com/wing-tn/astro-ph-researcher) | 0 | 2026-10-21 | 2026-10-22 | Astronomy research workbench for DSH and Codex: NADC terms, references, writing, scoring, author confirmation, physics/recommended books, FITS/XML formats and analysis guides. |
| 641 | [Winjazw/dsh-sidebar-menu](https://github.com/Winjazw/dsh-sidebar-menu) | 0 | 2026-10-21 | 2026-10-21 | DSH 左侧菜单显示/隐藏开关 · Choose which global panels appear in the DeepSeek Harness sidebar |
| 642 | [WitchKlee/dsh-theme-warm-paper](https://github.com/WitchKlee/dsh-theme-warm-paper) | 0 | 2026-10-21 | 2026-10-21 | 暖纸 Warm Paper：米杏纸色 × 宋体 × 砖红的手记风 DSH Web 主题（DeepSeek Harness） |
| 643 | [Wonderow666/dsh-auto-update](https://github.com/Wonderow666/dsh-auto-update) | 0 | 2026-10-21 | 2026-10-21 | Check, install and roll back DeepSeek Harness CLI updates from the web settings page - with health-checked restart and automatic rollback. |
| 644 | [wood007924/dsh-approval-enter](https://github.com/wood007924/dsh-approval-enter) | 0 | 2026-10-22 | 2026-10-22 | Press Enter to approve a pending permission request in DeepSeek Harness (dsh) - no mouse. |
| 645 | [wufengwind/dsh-plugin-dm-ops](https://github.com/wufengwind/dsh-plugin-dm-ops) | 0 | 2026-10-22 | 2026-10-22 | Dameng inspection, security and recovery-condition assessment for DeepSeek Harness |
| 646 | [wujiuyi55-sketch/dsh-alice-skin](https://github.com/wujiuyi55-sketch/dsh-alice-skin) | 0 | 2026-10-21 | 2026-10-22 | Alice Nation theme skin for DeepSeek Harness: repaints the whole Web GUI from public design tokens and switches characters by clicking an avatar. |
| 647 | [www02310/dsh-go](https://github.com/www02310/dsh-go) | 0 | 2026-10-22 | 2026-10-22 | DeepSeek Harness 启动画面：亮白跑马灯 → 一笔写出 DeepSeek Harness。插件版（运行时注入，不改宿主文件）+ 原生补丁版。 |
| 648 | [x3416067-bit/dsh-plugin-restart-prompt](https://github.com/x3416067-bit/dsh-plugin-restart-prompt) | 0 | 2026-10-21 | 2026-10-21 | DSH 插件变动后提示「重启 DSH」，一键静默重启（无黑框），并可展开本次改动差异。 |
| 649 | [XA-anjiu/dsh-notify-sfx](https://github.com/XA-anjiu/dsh-notify-sfx) | 0 | 2026-10-21 | 2026-10-21 | Windows toast notifications with selectable opencode sound packs for DeepSeek Harness; click a notification to open the matching session. |
| 650 | [xbbkok/dsh-taisho-ink](https://github.com/xbbkok/dsh-taisho-ink) | 0 | 2026-10-21 | 2026-10-21 | A Taisho-era ink-and-crimson theme for the DeepSeek Harness Web UI. DSH 插件：大正墨染界面主题。 |
| 651 | [xfy2412/dsh-session-cloudsync](https://github.com/xfy2412/dsh-session-cloudsync) | 0 | 2026-10-19 | 2026-10-21 | 适用于dsh的会话同步插件及配套可自部署服务器 |
| 652 | [xfyang728/dsh-router-wpslingxi](https://github.com/xfyang728/dsh-router-wpslingxi) | 0 | 2026-10-22 | 2026-10-22 | DSH plugin: WPS Lingxi (灵犀) supplier for dsh-router over the cowork WebSocket channel — reasoning, real sandbox code execution, artifact fetch-back. |
| 653 | [xh0915/dsh-voyage-log](https://github.com/xh0915/dsh-voyage-log) | 0 | 2026-10-20 | 2026-10-21 | 把 AI 会话折成可审计的航海报告 · DeepSeek Harness 双端插件 |
| 654 | [XI180/dsh-citation-chips](https://github.com/XI180/dsh-citation-chips) | 0 | 2026-10-22 | 2026-10-22 | 一个DSH插件，使模型在引用了检索材料的话末尾，紧跟一个包含链接的数字角标，并在回答结尾附一份 来源 清单 |
| 655 | [xiang9916/dsh-claude-skin](https://github.com/xiang9916/dsh-claude-skin) | 0 | 2026-10-21 | 2026-10-21 | Claude 风格的 DSH Web 界面皮肤（fork 自 PAKIKNOWLEDGE/dsh-client-ui-skin-claude） |
| 656 | [xianshengl487-star/dsh-connect-tabbit](https://github.com/xianshengl487-star/dsh-connect-tabbit) | 0 | 2026-10-21 | 2026-10-21 | DSH 第三方 Tabbit 插件：内置网关接入 Tabbit 国内版/国际版账号池、周期额度、模型用量倍率、每日签到与工具调用 |
| 657 | [xiaohai-78/dsh-mode-skills](https://github.com/xiaohai-78/dsh-mode-skills) | 0 | 2026-10-21 | 2026-10-21 | Skill manager for DeepSeek Harness (dsh): per-mode switches, search and tags, create/edit/import/version, install from GitHub |
| 658 | [xiaohai-78/dsh-request-params](https://github.com/xiaohai-78/dsh-request-params) | 0 | 2026-10-22 | 2026-10-22 | Add your own parameters to the model requests dsh sends: OpenRouter provider routing, fallback models, reasoning, sampling and custom fields, and headers, for any gateway. |
| 659 | [xiaoy616/dsh-screenshot-chat](https://github.com/xiaoy616/dsh-screenshot-chat) | 0 | 2026-10-21 | 2026-10-21 | Screenshot capture for the DSH composer: region capture and hide-window capture from the + menu, landing in the chat input as an image attachment. |
| 660 | [xilec/dsh-client-ui-session-switcher](https://github.com/xilec/dsh-client-ui-session-switcher) | 0 | 2026-10-20 | 2026-10-21 | Session switcher for DSH (DeepSeek Harness): Ctrl+K palette, Ctrl+\[ / \] cycling, customizable in-panel shortcuts — fork build with layout-independent chords and zh/en localization |
| 661 | [xinming-chenniang/dsh-longshot](https://github.com/xinming-chenniang/dsh-longshot) | 0 | 2026-10-21 | 2026-10-22 | DeepSeek Harness plugin: auto-split over-long screenshots into DSH-acceptable slices before prompt admission (no native deps, overlap between slices) |
| 662 | [xinming-chenniang/dsh-open-at-last-input](https://github.com/xinming-chenniang/dsh-open-at-last-input) | 0 | 2026-10-22 | 2026-10-22 | Client plugin for DeepSeek Harness: open a settled session at your last message instead of the floor. |
| 663 | [xisnn/harness2-dsh](https://github.com/xisnn/harness2-dsh) | 0 | 2026-10-22 | 2026-10-22 | Convert a Google Research Harness2 harness tree into a DeepSeek Harness (DSH) agent-preset bundle |
| 664 | [XiXizi-Kiara/dsh-godot-docs-rag](https://github.com/XiXizi-Kiara/dsh-godot-docs-rag) | 0 | 2026-10-22 | 2026-10-22 | 为DSH对话提供 Godot 官方文档检索、API 符号直达与整页读取工具 |
| 665 | [xuanfu-web/dsh-metaphysics](https://github.com/xuanfu-web/dsh-metaphysics) | 0 | 2026-10-21 | 2026-10-21 | Fate chart plugin for DeepSeek Harness: BaZi, Zi Wei Dou Shu, LiuYao, Tarot |
| 666 | [xuezhining/dsh-deepseek-balance](https://github.com/xuezhining/dsh-deepseek-balance) | 0 | 2026-10-21 | 2026-10-21 | dsh 的插件 |
| 667 | [xunyyds/dsh-context-presets](https://github.com/xunyyds/dsh-context-presets) | 0 | 2026-10-22 | 2026-10-22 | 按模型自定义上下文窗口的 DSH 插件 |
| 668 | [xuqiuba888/dsh-enter-swap](https://github.com/xuqiuba888/dsh-enter-swap) | 0 | 2026-10-21 | 2026-10-21 | DSH web 插件：Enter=换行，Shift+Enter=发送。极简零依赖 |
| 669 | [XXP-AI-SPACE/dsh-snip](https://github.com/XXP-AI-SPACE/dsh-snip) | 0 | 2026-10-21 | 2026-10-21 | Snipaste-style screenshot annotation for DeepSeek Harness |
| 670 | [Xxsttb/dsh-sillytavern-presets](https://github.com/Xxsttb/dsh-sillytavern-presets) | 0 | 2026-10-22 | 2026-10-22 | \[AI 制作\] 在 DeepSeek Harness 中导入、编辑、切换 SillyTavern AI 预设，支持 JSON 导入导出、提示词顺序编辑与归档/删除。 |
| 671 | [xxxSnack/dsh-market-dock](https://github.com/xxxSnack/dsh-market-dock) | 0 | 2026-10-21 | 2026-10-21 | DeepSeek Harness 的行情面板：免登录看 A股/港股/美股实时行情、K线、热榜、快讯；本地持仓盈亏现算、可选的同花顺账本一次性导入、价格提醒，还有一键「行情隐身」。非雪球官方。 |
| 672 | [xxxxxxxx2/dsh-peak-valley-reminder](https://github.com/xxxxxxxx2/dsh-peak-valley-reminder) | 0 | 2026-10-22 | 2026-10-22 | DeepSeek Harness 峰谷提醒插件：会话标题栏「模式」之后显示高峰/空闲时段并倒计时切换 |
| 673 | [xystudio889/dsh-chatmode](https://github.com/xystudio889/dsh-chatmode) | 0 | 2026-10-21 | 2026-10-21 | A web-like minimalist experience / 类似于网页的极简体验 |
| 674 | [xyzYaeMiko/dsh-deepsleep-progress](https://github.com/xyzYaeMiko/dsh-deepsleep-progress) | 0 | 2026-10-20 | 2026-10-21 | Elapsed/budget progress bars for blocking DSH tool calls, with a moving picture and a graphical settings page. |
| 675 | [yal3ay/commandcode-usage-dsh](https://github.com/yal3ay/commandcode-usage-dsh) | 0 | 2026-10-22 | 2026-10-22 | Command Code plan usage (5h / weekly windows, monthly credits) as a settings page in DeepSeek Harness |
| 676 | [yal3ay/opencode-usage-dsh](https://github.com/yal3ay/opencode-usage-dsh) | 0 | 2026-10-22 | 2026-10-22 | OpenCode Zen/Go quota usage (5h rolling, weekly, monthly) as a settings page in DeepSeek Harness |
| 677 | [yangguozhongmax-max/dsh-alicoupon](https://github.com/yangguozhongmax-max/dsh-alicoupon) | 0 | 2026-10-21 | 2026-10-21 | 在 DeepSeek Harness 侧边栏显示阿里云代金券剩余额度（只读 BSS DescribeCoupon，AK 只留在宿主凭据库）· Alibaba Cloud coupon balance row for DSH |
| 678 | [yangzhenyu0817/dsh-session-color](https://github.com/yangzhenyu0817/dsh-session-color) | 0 | 2026-10-22 | 2026-10-22 | Right-click any session row in the DeepSeek Harness sidebar to color-tag it (default red, ten palette colors, custom picker). / 给 DSH 侧栏会话行加右键标色。 |
| 679 | [YearnCy/dsh-question-tree](https://github.com/YearnCy/dsh-question-tree) | 0 | 2026-10-22 | 2026-10-22 | DSH Desktop 插件：使用树形结构解决线性对话上下文过长而导致回顾问题、记录问题困难的结症，允许同时记录多个问题，自定义问题深度。增加划词功能，支持添加到对话或添加到问题树。选区浮出动作栏、引用 chip、右栏问题树——记住你还没搞懂的地方，而不是让你在长对话里往回翻。 |
| 680 | [yezitotempeace/dsh-job-progress](https://github.com/yezitotempeace/dsh-job-progress) | 0 | 2026-10-21 | 2026-10-21 | Floating card with live progress for background jobs: progress bar, percentage, speed, ETA and the latest output line. |
| 681 | [YFlaga/dsh-manuscript-tracker](https://github.com/YFlaga/dsh-manuscript-tracker) | 0 | 2026-08-16 | 2026-10-21 | 期刊投稿状态定时检查插件（Editorial Manager 确定性抓取 + AI 回退 + 设置面板） |
| 682 | [YiKangMo/dsh-prompt-enhancer](https://github.com/YiKangMo/dsh-prompt-enhancer) | 0 | 2026-10-22 | 2026-10-22 | DeepSeek Harness 的「增强提示词」按钮：一次辅助 LLM 调用把草稿改写成结构化提示词，支持加载态、失败重试与一键回退。Prompt enhancer button for DeepSeek Harness. |
| 683 | [Yingblock/dsh-plugin-files-download](https://github.com/Yingblock/dsh-plugin-files-download) | 0 | 2026-10-22 | 2026-10-22 | Download buttons on every row of the DSH web GUI's file tree, served by an authenticated streaming Host route |
| 684 | [yinghan-123/dsh-python-only](https://github.com/yinghan-123/dsh-python-only) | 0 | 2026-10-21 | 2026-10-21 | DSH 插件：强制 Agent 一切代码执行与数据处理使用 python 工具，并用工具守卫拦截 bash（无例外），让 DSHM 端侧稳定走进程内 CPython。 |
| 685 | [yiumanlenong/dsh-popup-notify](https://github.com/yiumanlenong/dsh-popup-notify) | 0 | 2026-10-21 | 2026-10-21 | Modal desktop popups for DeepSeek Harness: approvals, questions/plan reviews, and turn completion. Zero dependencies. |
| 686 | [YOGEMOW/dsh-desktop-menu](https://github.com/YOGEMOW/dsh-desktop-menu) | 0 | 2026-10-21 | 2026-10-21 | 把「刷新页面 / 重启应用与 Host」写进 DSH 桌面端「应用」原生菜单的补丁插件：11 字节等长改写 app.asar，附完整 recipe 与独立脚本。 |
| 687 | [Yoimiya-Lover-0621-01/dsh-local-avatar](https://github.com/Yoimiya-Lover-0621-01/dsh-local-avatar) | 0 | 2026-10-21 | 2026-10-22 | DSH 本地账户头像插件：用一张本地图片覆盖侧栏与设置里的账户头像 |
| 688 | [Yoimiya-Lover-0621-01/dsh-plugin-font-switcher](https://github.com/Yoimiya-Lover-0621-01/dsh-plugin-font-switcher) | 0 | 2026-10-22 | 2026-10-22 | Chinese/Latin font switcher plugin for DeepSeek Harness: separate Chinese and Latin font rows with system lists and TTF/OTF upload. |
| 689 | [Yoimiya-Lover-0621-01/himeko-starry-night](https://github.com/Yoimiya-Lover-0621-01/himeko-starry-night) | 0 | 2026-10-21 | 2026-10-22 | 姬子的星月夜 — DeepSeek Harness 星云壁纸 + 液态玻璃主题插件 |
| 690 | [yu234567/dsh-llamacpp-studio](https://github.com/yu234567/dsh-llamacpp-studio) | 0 | 2026-10-21 | 2026-10-21 | 给dsh添加了一个llamacpp的启动ui界面，Graphical llama.cpp launcher and full parameter workbench plugin for DeepSeek Harness |
| 691 | [YuChenLiao/dsh-comfyui-album](https://github.com/YuChenLiao/dsh-comfyui-album) | 0 | 2026-10-21 | 2026-10-21 | DSH 相册插件：把 dsh-comfyui-image 生成的图片收成相册，侧边栏浏览，悬浮复制图片/提示词、导出工作流、加入当前对话、删除。 |
| 692 | [YunxiLuna/dsh-song-mv](https://github.com/YunxiLuna/dsh-song-mv) | 0 | 2026-10-22 | 2026-10-22 | Code-rendered music videos for DSH: beat-synced scenes, kinetic lyrics, story props drawn in code, encoded with ffmpeg. Ships as a plugin and a CLI. |
| 693 | [yunxingwoo/dsh-workbuddy](https://github.com/yunxingwoo/dsh-workbuddy) | 0 | 2026-10-22 | 2026-10-22 | DeepSeek Harness 插件：把 WorkBuddy（国内版/国际版）账号接入模型选择器，提供账号池、模型勾选、积分倍率、每日签到与只读积分胶囊 |
| 694 | [yxiaoy6/dsh-taskbar-alert](https://github.com/yxiaoy6/dsh-taskbar-alert) | 0 | 2026-10-21 | 2026-10-21 | Flash the DeepSeek Harness taskbar button on Windows when an approval, a question or a plan review is waiting, or when a turn finishes. |
| 695 | [yxue301603/dsh-answer-library](https://github.com/yxue301603/dsh-answer-library) | 0 | 2026-10-21 | 2026-10-21 | DeepSeek Harness 原生插件 · 回答收藏 · 保存回答与摘录，按标签检索，复制或插入草稿。 |
| 696 | [yxue301603/dsh-conversation-outline](https://github.com/yxue301603/dsh-conversation-outline) | 0 | 2026-10-21 | 2026-10-21 | DeepSeek Harness 原生插件 · 对话目录 · 搜索用户提问，跳转原文并保存阅读位置。 |
| 697 | [yxue301603/dsh-draft-history](https://github.com/yxue301603/dsh-draft-history) | 0 | 2026-10-21 | 2026-10-21 | DeepSeek Harness 原生插件 · 草稿历史 · 自动记录会话草稿、预览历史和安全恢复。 |
| 698 | [yxue301603/dsh-project-notes](https://github.com/yxue301603/dsh-project-notes) | 0 | 2026-10-21 | 2026-10-21 | DeepSeek Harness 原生插件 · 项目便笺 · 工作区便笺、轻量待办、自动保存与草稿插入。 |
| 699 | [yxue301603/dsh-selection-actions](https://github.com/yxue301603/dsh-selection-actions) | 0 | 2026-10-21 | 2026-10-21 | DeepSeek Harness 原生插件 · 选文操作 · 选中回答后引用追问、解释或翻译，预览后填入草稿。 |
| 700 | [yxue301603/dsh-task-alerts](https://github.com/yxue301603/dsh-task-alerts) | 0 | 2026-10-21 | 2026-10-21 | DeepSeek Harness 原生插件 · 任务提醒 · 区分完成、待确认与失败，后台提醒并返回会话。 |
| 701 | [yxue301603/dsh-turn-files](https://github.com/yxue301603/dsh-turn-files) | 0 | 2026-10-21 | 2026-10-21 | DeepSeek Harness 原生插件 · 本轮文件 · 按轮次查看生成或修改的文件，复制路径并预览。 |
| 702 | [yyfdfsyyf-source/dsh-hard-gate](https://github.com/yyfdfsyyf-source/dsh-hard-gate) | 0 | 2026-10-21 | 2026-10-21 | Stricter permission review and a workspace sandbox for DeepSeek Harness (dsh) that survives danger-full-access, with ZIP restore points and Recycle Bin copies. |
| 703 | [yzsuki-afk/ticklist-calendar](https://github.com/yzsuki-afk/ticklist-calendar) | 0 | 2026-10-22 | 2026-10-22 | 日历清单 · DeepSeek Harness 插件：月/周/列表/看板四视图 + 独立 AI 对话 |
| 704 | [zdd3143/dsh-vision-click](https://github.com/zdd3143/dsh-vision-click) | 0 | 2026-10-22 | 2026-10-22 | 让 Agent 用鼠标和键盘操作 Windows：Windows OCR 定位界面文字 → 真实点击/拖动/滚轮/键入 → 像素与文字双重复核。DSH 插件，无需视觉大模型，F6+F7 急停。 |
| 705 | [zengxiaolou/dsh-annotation](https://github.com/zengxiaolou/dsh-annotation) | 0 | 2026-10-21 | 2026-10-21 | DSH 插件：划选回答文字打注释，旁问一次性只读侧问 |
| 706 | [Zhangw1998/dsh-usage-dashboard](https://github.com/Zhangw1998/dsh-usage-dashboard) | 0 | 2026-10-21 | 2026-10-21 | Token usage &amp; cost dashboard for DeepSeek Harness — per-project/provider breakdown, estimated spend, call counts, DeepSeek balance. |
| 707 | [zhaochengbiao005/dsh-gcua](https://github.com/zhaochengbiao005/dsh-gcua) | 0 | 2026-10-22 | 2026-10-22 | GCUA agent state machine plugin for DeepSeek Harness — ported from Tongyi-MAI/OpenGCUA harness philosophy: todo ledger + stall guard + phase trails + sandboxed Python worker |
| 708 | [ZhaoGC4/dsh-cua-preview](https://github.com/ZhaoGC4/dsh-cua-preview) | 0 | 2026-10-21 | 2026-10-21 | Codex-like floating glass preview window for DeepSeek Harness background computer-use (macOS) |
| 709 | [ZhaoZiyangShaanxi/dsh-netease-music](https://github.com/ZhaoZiyangShaanxi/dsh-netease-music) | 0 | 2026-10-20 | 2026-10-22 | DSH plugin: NetEase Cloud Music player (mini bar, liquid glass card, vinyl view, auto login via local client, client sync) |
| 710 | [zhujiuyi/dsh-tokenDashBoard](https://github.com/zhujiuyi/dsh-tokenDashBoard) | 0 | 2026-10-21 | 2026-10-21 | DeepSeek Harness sidebar Token usage dashboard |
| 711 | [Zimeng-Luo/dsh-source-fold](https://github.com/Zimeng-Luo/dsh-source-fold) | 0 | 2026-10-21 | 2026-10-21 | 列表模型按照来源进行折叠，便于多个接入的时候从不同的来源找东西 |
| 712 | [zimo-2233/dsh-html-visual-editor](https://github.com/zimo-2233/dsh-html-visual-editor) | 0 | 2026-10-22 | 2026-10-22 | Edit generated HTML on the rendered page inside the DSH sidebar. |
| 713 | [zimzaza4/dsh-recent-sessions](https://github.com/zimzaza4/dsh-recent-sessions) | 0 | 2026-10-19 | 2026-10-21 | Recent and active sessions block for the DeepSeek Harness Web sidebar |
| 714 | [ziyouti/dsh-read-aloud](https://github.com/ziyouti/dsh-read-aloud) | 0 | 2026-10-21 | 2026-10-21 | Read DSH replies aloud with natural neural voices: sound-wave play button, sentence highlighting, pause/skip, custom highlight colours and auto-read. |
| 715 | [zoe1nan/dsh-convoy](https://github.com/zoe1nan/dsh-convoy) | 0 | 2026-10-22 | 2026-10-22 | 伴航 Convoy for DeepSeek Harness — 内嵌在 DSH 里的 AI 自动纠偏层：危险命令改写、越界写入回滚、假完成重跑，全程零点击，只留可回溯回执。 |
| 716 | [ztc1522021381/dsh-plugin-cds](https://github.com/ztc1522021381/dsh-plugin-cds) | 0 | 2026-10-21 | 2026-10-21 | DeepSeek Harness 的 Claude Design System 主题插件，适配 dsh 0.2.1-alpha.1。覆盖 11 条宿主设计令牌，零网络请求，零 DOM 替换。 |
| 717 | [zueston/dsh-alarm](https://github.com/zueston/dsh-alarm) | 0 | 2026-10-21 | 2026-10-21 | DSH 报警插件：报警条件可选，支持提醒/弹窗/铃声/语音播报四通道（DSH alarm plugin with per-condition channels) |
| 718 | [zueston/orchestrator2-region-switch](https://github.com/zueston/orchestrator2-region-switch) | 0 | 2026-10-21 | 2026-10-21 | DSH 插件：给「自动开发调度器2.0」用的场景化主备模型切换（场景 TAB、三角色 A/B 两侧模型、失效自动切换顺序、模型变更管控） |
| 719 | [zuoyunlai/dsh-pet-plugin](https://github.com/zuoyunlai/dsh-pet-plugin) | 0 | 2026-10-21 | 2026-10-21 | Photo-real desk pet plugin for DeepSeek Harness: four personas, expressions + actions, proactive speech, neural TTS, tiny chat box that never touches your session. |
| 720 | [zuoyunlai/dsh-theme-palette](https://github.com/zuoyunlai/dsh-theme-palette) | 0 | 2026-10-21 | 2026-10-21 | DSH 主题配色插件：4 套配色 × 明暗两模式，OKLCH 色域钳位 + 真实承载面对比度求解 |
| 721 | [zuwenyin/dsh-plugin-upgrader](https://github.com/zuwenyin/dsh-plugin-upgrader) | 0 | 2026-10-22 | 2026-10-22 | One-click upgrades, version history and rollback for plugins on the DeepSeek Harness Plugins page |
| 722 | [Zxznb666/dsh-qoder-cn-subagent](https://github.com/Zxznb666/dsh-qoder-cn-subagent) | 0 | 2026-10-22 | 2026-10-22 | 把 Qoder CN 注册为 DeepSeek Harness 的子智能体后端：复用原生登录与设置，一次委派一个任务。 |
| 723 | [zyfgood/dsh-mobile](https://github.com/zyfgood/dsh-mobile) | 0 | 2026-10-22 | 2026-10-22 | DSH mobile web UI: browse all sessions and continue conversations from a phone on the same LAN. ??? Web UI ??? |
| 724 | [zys2026/dsh-theme-tide](https://github.com/zys2026/dsh-theme-tide) | 0 | 2026-10-21 | 2026-10-21 | Tide &amp; Timber (潮汐木色) — a coastal light/dark theme for the DeepSeek Harness Web GUI, built on the official ThemeRuntime alias-token layer. |
| 725 | [zzh-github/dsh-plugin-sparknote](https://github.com/zzh-github/dsh-plugin-sparknote) | 0 | 2026-10-21 | 2026-10-21 | SparkNote for DSH Web：阅读时彩色划线，收藏完整回复与对应问题。 Highlight replies as you read and save them with their questions. |

## 从快照消失的已核准仓库 / Approved repositories missing from the snapshot

已核准但已不在当前快照中（删除或改名），核实后从 [data/approved.json](../approved.json) 移除或更新名称。

Approved but no longer present in the current snapshot (deleted or renamed) — after checking, remove them from [data/approved.json](../approved.json) or update the name.

- abcdream-Lary/dshsearch-multi
- aerince/dsh-active-context-pruning
- alexchenzl/dsh-plugin-directory
- AndroidSix/dsh-multi-router
- arrow1031/dsh-qq-bot
- bbaz123/novel-writing-plugin
- chen731215-dev/dsh-muv-engine
- chen731215-dev/dsh-muv-table
- chen731215-dev/dsh-tavern-v2
- CHYMZXS/dsh-archive-workbench
- Ckarefulon/dsh-gitbar-lite
- cloveric/tarocub
- corrinehu/dsh-workbuddy-connect
- Crosery/dsh-drop
- Crosery/dsh-viewer
- ddldxiacan/dsh-opencode-free
- dexwebcode/dsh-plugin-mobile-ui
- DSH-EAC/EAC-mojobox
- dsh-plugin-db/dsh-context-diet
- dsh-plugin-db/dsh-cost-meter
- dsh-plugin-db/dsh-reliable-web
- dsh-plugin-db/dsh-session-trash
- fengs2021/dsh-feishu-bridge
- fengs2021/dsh-file-bridge
- fengs2021/dsh-image-mmx
- fengs2021/dsh-session-title-cold
- fishzjp/qa-skills
- GuZhengSVT/dsh-WeCom-notify
- HarcoChen/dsh-plugin-guide
- HERO476/dsh-doubao-work-connect
- hfdsdfgr/dsh-balance-bar
- Imzl-zl/dsh-model-router
- jiangnanquan/dsh-ux
- jingchangzhao-gif/dsh-errkb
- jonah791/autonomous-circular-agent
- jyh5555/dsh-workbuddy-connect-pro
- Klop233/dsh-claude-code-theme
- Lbryany/dsh-codebuddy
- Leawind/dsh-carrot-on-a-stick
- Lingrui98/dsh-research-hub
- LingyeSoul/DSH-SoulMojito
- linyuan-ai1/dsh-plugins
- loyalchiiina/dsh-lobsterai-daddy
- loyalchiiina/dsh-workbuddy-hub
- Lrxc/dsh-manage-hub
- Luca4Don3/dsh-opencode-live-models
- LvsH13/dsh-desktop
- maomitgd2006/DSH_CG
- markelayan/agents-in-the-loop
- meisijiya/omp-memory-dsh
- Milaro001/dsh-provenance-lens
- nvbb/dsh-ollama-vision-bridge
- offzen/dsh-gitea-search
- oli-bot/dsh-desktop
- OpenCnid/deepseek-rlm
- OpenCnid/recursus
- OwlNjust/DSH-DeepSeek-Balance
- Plocr/dsh-commandcode-goat
- raktim-mondol/dsh-researchcraft
- RicardoYan/dsh-workspace-trust
- rvaim/dsh-compat
- says693/dsh-log-memory
- shxiaooo/dsh-account-quota
- SiriusWJ/dsh-mihome
- SiriusWJ/dsh-restart-btn
- SiriusWJ/dsh-skill-manager
- SyamStud/dsh-opencode-usage
- taoser258/dsh-client-ui-skin-qingxiao
- TestFox000/dsh-deepseek-peak-whale
- TheoiNabiy/godot-docs-dsh-plugin
- wasteoneslife/dsh-skill-creator
- xfy2412/dsh-session-sync
- YAN3RA/DSH-Sync-Backup
- YFlaga/dsh-paper-checker
- zhaorui-wu/dsh-skill-cockpit
- zhulianxing/dsh-clawpay
- zhulianxing/dsh-kankan-mail
- zhulianxing/dsh-lookhere
- zhulianxing/dsh-starstack
- zudazhuang/dsh-upgrade
