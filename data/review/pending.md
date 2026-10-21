# 待审核仓库 / Pending review

> 新增到 `dsh-plugin` Topic 下、带有简介、尚未经维护者核实的仓库。本文件由 `scripts/update.mjs` 每日刷新，仅供审核使用，不是用户可见页面。
>
> Repositories newly added to the `dsh-plugin` topic that the maintainer has not verified yet. Refreshed daily by `scripts/update.mjs`; review-only, not a user-facing page.

- 生成时间 / Generated: **2026-10-21**
- 快照日期 / Snapshot date: **2026-10-21 (UTC)**
- 待审核 / Pending: **392**
- 从快照消失的已核准仓库 / Approved repositories missing from the snapshot: **39**
- Star 异常增长 / Star-growth alerts: **13** — 先看下方告警节 / see the alert section first

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

对比上一份快照 **2026-10-20** / vs previous snapshot **2026-10-20**。规则：日增 ≥100★；已核准仓新入 Top 200（且 Δ≥50）/ 名次跃升 ≥50 / 冲入 Top 20；待审仓 ≥100★ 且核准后将进入 Top 200。

- 看 Star 是否与 fork、提交活跃度、仓库年龄匹配（高星零 fork、创建当天几百星，多为刷星）
- 是否把已有高星的通用项目贴上 `dsh-plugin` Topic 蹭榜——插件本身可进目录，但应加入 `leaderboard_exclusions`，理由写清 stars accrued as …
- 待审仓若核准会直接冲进 Top 20 / Top 200，先确认热度来自 **DSH 插件本身**
- 已核准仓的异常跃升：确认后同样可记入 `leaderboard_exclusions`，不必下架目录

Check stars against forks, commit activity and age (hundreds of stars on day one, or high stars with zero forks, usually look bought). A generic high-star project that only just tagged `dsh-plugin` can stay in the catalog but should go to `leaderboard_exclusions` (reason: stars accrued as …). If approving a pending repo would drop it into Top 20 / Top 200, confirm the audience is the DSH plugin itself.

- 告警数 / Alerts: **13**

| Project | Queue | Stars | Δ | Forks | Age | Signals | 审核提示 / Hint |
| --- | --- | ---: | ---: | ---: | ---: | --- | --- |
| ⚠️ [Ebony-Vinyl/dsh-our-free-model](https://github.com/Ebony-Vinyl/dsh-our-free-model) | 已核准 / approved | 33604 | +2862 | 878 | 26d | 日增百星 | 日增 +2862★；已不进榜单 |
| ⚠️ [bowenliang123/dsh-context](https://github.com/bowenliang123/dsh-context) | 已核准 / approved | 3109 | +701 | 117 | 67d | 日增百星 | 日增 +701★ |
| ⚠️ [dsh-market/dsh-market](https://github.com/dsh-market/dsh-market) | 已核准 / approved | 7982 | +241 | 311 | 67d | 日增百星 | 日增 +241★；已不进榜单 |
| ⚠️ [shaobeichen/dsh-pocket](https://github.com/shaobeichen/dsh-pocket) | 已核准 / approved | 2179 | +217 | 96 | 66d | 日增百星 | 日增 +217★ |
| ⚠️ [PC2005-cloud/dsh-pet](https://github.com/PC2005-cloud/dsh-pet) | 已核准 / approved | 3261 | +206 | 213 | 67d | 日增百星 | 日增 +206★ |
| ⚠️ [T-Auto/dsh-ops](https://github.com/T-Auto/dsh-ops) | 已核准 / approved | 3657 | +187 | 101 | 12d | 日增百星 | 日增 +187★ |
| ⚠️ [Fei2411/DeepSeek-Bot](https://github.com/Fei2411/DeepSeek-Bot) | 已核准 / approved | 2868 | +184 | 276 | 13d | 日增百星 | 日增 +184★ |
| ⚠️ [ranxianglei/billion-context](https://github.com/ranxianglei/billion-context) | 已核准 / approved | 2241 | +139 | 196 | 75d | 日增百星 | 日增 +139★；已不进榜单 |
| ⚠️ [zhu1090093659/dsh-web](https://github.com/zhu1090093659/dsh-web) | 已核准 / approved | 9241 | +125 | 579 | 69d | 日增百星 | 日增 +125★；已不进榜单 |
| ⚠️ [dingminhua/dsh-connect-workbuddy](https://github.com/dingminhua/dsh-connect-workbuddy) | 已核准 / approved | 338 | +118 | 39 | 53d | 日增百星 | 日增 +118★ |
| ⚠️ [Clearailhc/clearai-dsh](https://github.com/Clearailhc/clearai-dsh) | 已核准 / approved | 1359 | +115 | 43 | 38d | 日增百星 | 日增 +115★；已不进榜单 |
| ⚠️ [MeteorNOX/DeepSeek-Balance-Whale-Widget](https://github.com/MeteorNOX/DeepSeek-Balance-Whale-Widget) | 已核准 / approved | 5654 | +109 | 180 | 63d | 日增百星 | 日增 +109★；已不进榜单 |
| ⚠️ [Anionex/dsh-vision-toolkit](https://github.com/Anionex/dsh-vision-toolkit) | 已核准 / approved | 901 | +2 | 46 | 68d | 冲入 Top 20 | 冲入 Top 20（21→20） |


| # | Project | Stars | Created | First seen | Description |
| ---: | --- | ---: | ---: | ---: | --- |
| 1 | [urzeye/dsh-outline](https://github.com/urzeye/dsh-outline) | 19 | 2026-08-14 | 2026-10-21 | DeepSeek Harness（DSH）Web GUI 的实时大纲插件，移植自 Ophel Atlas |
| 2 | [eee1723/dsh-houdini](https://github.com/eee1723/dsh-houdini) | 10 | 2026-08-15 | 2026-10-21 | deepseek harness plugin for houdini. ai agnet for houdini |
| 3 | [balongTTY/dsh-workbuddy-fix](https://github.com/balongTTY/dsh-workbuddy-fix) | 9 | 2026-10-21 | 2026-10-21 | Fix WorkBuddy/CodeBuddy 400 'Illegal API invocation from an unapproved channel' (code 11128) with lossless prompt keyword neutralization — DSH settings-page plugin. 修复 WorkBuddy 请求被拦截 400（提示词无损绕过）。 |
| 4 | [jiangnanquan/dsh-uxexo](https://github.com/jiangnanquan/dsh-uxexo) | 9 | 2026-08-14 | 2026-10-21 | DSH (DeepSeek Harness) Web UI 增强插件：25 套终端美学主题、中文优先字体、文字墨色与官方峰谷提醒 · 江南泉个人开发并免费开源 |
| 5 | [dreamfarer-space/deepseek-harness-intelligent-ui](https://github.com/dreamfarer-space/deepseek-harness-intelligent-ui) | 8 | 2026-10-10 | 2026-10-21 | Generative, interactive UI for DeepSeek Harness (DSH): declarative components and sandboxed live widgets streamed in chat. |
| 6 | [Debuger-114514/dsh-bili-jar](https://github.com/Debuger-114514/dsh-bili-jar) | 4 | 2026-10-20 | 2026-10-21 | DSH 插件：右下角一只罐子，按你的兴趣轴去 B站 搜片、按互动率筛、让大模型当策展人挑五条并写理由 |
| 7 | [Plocr/dsh-commandcode](https://github.com/Plocr/dsh-commandcode) | 4 | 2026-09-18 | 2026-10-21 | Command Code for DSH｜订阅接入：将 Go / GOAT / Pro / Max 订阅接入 DeepSeek Harness，支持模型同步、推理预设、用量提醒和联网搜索。 |
| 8 | [Talone22/dsh-notify-tone](https://github.com/Talone22/dsh-notify-tone) | 4 | 2026-08-19 | 2026-10-21 | 一个适用于dsh网页版的任务提示小插件 |
| 9 | [Ykls53/dsh-memory-inject](https://github.com/Ykls53/dsh-memory-inject) | 4 | 2026-10-21 | 2026-10-21 | 给 DeepSeek Harness 的三层记忆：常驻事实 + 会话摘要 + 全文检索。注入不花任何模型调用，写回用你当前选的模型。 |
| 10 | [balongTTY/dsh-workbuddy-meter](https://github.com/balongTTY/dsh-workbuddy-meter) | 3 | 2026-10-20 | 2026-10-21 | 修复 WorkBuddy/CodeBuddy 400 'Illegal API invocation from an unapproved channel' (code 11128) —— 提示词无损绕过 + 积分用量计量面板 \| Fix WorkBuddy unapproved channel 400 |
| 11 | [feeling6667/dsh-purge-pro](https://github.com/feeling6667/dsh-purge-pro) | 3 | 2026-10-21 | 2026-10-21 | dsh-purge 的非官方分支（fork）：适配 DeepSeek Harness 0.2.1-rc.2、破甲内核 v3 |
| 12 | [chs-1108/dsh-purge](https://github.com/chs-1108/dsh-purge) | 2 | 2026-10-21 | 2026-10-21 | DeepSeek Harness 本机安全评测与提示词清洗插件：侧栏面板管理提示词分层、补丁、规则集与技能；带授权演练台。Local security-eval &amp; prompt-cleaning plugin for DeepSeek Harness. |
| 13 | [CNCharon/dsh-music-dock](https://github.com/CNCharon/dsh-music-dock) | 2 | 2026-10-21 | 2026-10-21 | DSH（DeepSeek Harness）侧栏音乐播放条：同步 QQ 音乐 / 网易云音乐的歌单，显示滚动歌词，支持扫码登录与音量控制。 |
| 14 | [fotor-ai/fotor-agent-plugins](https://github.com/fotor-ai/fotor-agent-plugins) | 2 | 2026-09-15 | 2026-10-21 | Fotor Plugin for Agents |
| 15 | [hxlog/dsh-mcp-tools](https://github.com/hxlog/dsh-mcp-tools) | 2 | 2026-10-21 | 2026-10-21 | DeepSeek Harness 最简洁、优雅的 MCP 工具管理器：在设置里添加 MCP 服务器、Postman 式请求头、连通性测试、逐工具开关。 |
| 16 | [Jackbessaliuz/dsh-market-expand](https://github.com/Jackbessaliuz/dsh-market-expand) | 2 | 2026-10-20 | 2026-10-21 | DSH 插件市场的补丁层：一键更新全部（退出后自动完成并重开）+ 更新安全网（启动失败自动回退）+ 本地插件更新检测与快照回滚。 |
| 17 | [ryan4yin/dsh-nu](https://github.com/ryan4yin/dsh-nu) | 2 | 2026-10-18 | 2026-10-21 | Nushell as the only shell for DeepSeek Harness (dsh): every shell call runs nu, foreign shells are refused before they spawn, and the model is taught Nushell. |
| 18 | [Sama05/dsh-download-progress](https://github.com/Sama05/dsh-download-progress) | 2 | 2026-10-21 | 2026-10-21 | Frosted-glass download progress overlay for DeepSeek Harness (DSH) |
| 19 | [wyx135230/DeepSeek-Office](https://github.com/wyx135230/DeepSeek-Office) | 2 | 2026-10-19 | 2026-10-21 | Built with the dsh-bot plugin, this is an immersive 2.5D office game where you interact and collaborate with your agent employees.基于dsh-bot插件制作，沉浸式2.5D办公室游戏，与你的agent员工交互协作 |
| 20 | [xmlans/dsh-xmlans](https://github.com/xmlans/dsh-xmlans) | 2 | 2026-10-18 | 2026-10-21 | 让兰酱住进你的电脑里和你一起Coding的DeepSeek Herness插件 |
| 21 | [2486809961-alt/dsh-ui-sound-ns2](https://github.com/2486809961-alt/dsh-ui-sound-ns2) | 1 | 2026-10-21 | 2026-10-21 | Nintendo Switch 2 UI sounds for the DeepSeek Harness Web GUI: every click plays the matching NS2 system cue, with per-scenario mapping, task sounds and a settings page. |
| 22 | [311miaowa/DSH-File-Hub](https://github.com/311miaowa/DSH-File-Hub) | 1 | 2026-10-20 | 2026-10-21 | DeepSeek Harness 本地文件中心：按对话归档生成文件，支持跨对话搜索、稳定回指和继续加工。 |
| 23 | [aawef/dsh-skill-manager-tags](https://github.com/aawef/dsh-skill-manager-tags) | 1 | 2026-10-21 | 2026-10-21 | A DSH plugin to manage and organize skills using tags. (基于标签管理的 DSH 技能管理器) |
| 24 | [ADkun/dsh-ace](https://github.com/ADkun/dsh-ace) | 1 | 2026-10-21 | 2026-10-21 | Evolvable Markdown playbook for DSH agents — retrospectives distill lessons, consulted before tasks. |
| 25 | [ADkun/dsh-subagent-mgm](https://github.com/ADkun/dsh-subagent-mgm) | 1 | 2026-10-04 | 2026-10-21 | DeepSeek Harness Web UI 插件：子智能体目录按创建时间倒序；子智能体运行时自动在右侧栏打开它的会话、结束时自动关闭；子智能体失败时把真实原因交回父智能体。Subagent management bundle for the DSH Web UI. |
| 26 | [aikunx/dsh-cloudflare-codemode](https://github.com/aikunx/dsh-cloudflare-codemode) | 1 | 2026-10-20 | 2026-10-21 | Cloudflare 全功能管家 for DeepSeek Harness：接入官方 Code Mode MCP，search + execute 覆盖 2,500+ API（Workers / Pages / DNS / R2 / KV / D1 / Zero Trust），OAuth 2.1 与 API Token 双认证，带可视化设置面板。安装：dsh plugin --profile web add github:aikunx/dsh-cloudflare-codemode |
| 27 | [ANHANP/dsh-branch-tree](https://github.com/ANHANP/dsh-branch-tree) | 1 | 2026-10-21 | 2026-10-21 | DeepSeek Harness plugin: session branch tree with round cards, forks, subagent forests and a minimap. |
| 28 | [answertsundere/dsh-canvas-plugin](https://github.com/answertsundere/dsh-canvas-plugin) | 1 | 2026-10-19 | 2026-10-21 | Conversation branch canvas for DeepSeek Harness: session lineage map, live agent swarm, message-level fork, deterministic branch comparison |
| 29 | [apoclota/dsh-task-lens](https://github.com/apoclota/dsh-task-lens) | 1 | 2026-10-21 | 2026-10-21 | Always-on draggable task lens for DeepSeek Harness: local, zero-token step reconstruction and focused progress UI. |
| 30 | [AsterLuo/dsh-buddy-guard](https://github.com/AsterLuo/dsh-buddy-guard) | 1 | 2026-10-21 | 2026-10-21 | Fix CodeBuddy (Tencent) channel returning HTTP 400 Illegal API invocation from an unapproved channel in DeepSeek Harness by prefixing a space to the system prompt. |
| 31 | [AythyaCrispus/dsh-browser-use-native](https://github.com/AythyaCrispus/dsh-browser-use-native) | 1 | 2026-10-21 | 2026-10-21 | DSH Host plugin: 17 Playwright browser tools driven by stable accessibility-tree uids (snapshot, click, fill, drag, download). |
| 32 | [biotechdrli-byte/dsh-desktop-transparency](https://github.com/biotechdrli-byte/dsh-desktop-transparency) | 1 | 2026-10-20 | 2026-10-21 | DSH Desktop 的分区透明壁纸主题：窗口看起来真的透到桌面，同时支持分区调节 |
| 33 | [caizhidian-ops/always-on-board](https://github.com/caizhidian-ops/always-on-board) | 1 | 2026-10-21 | 2026-10-21 | A local background-task board for AI coders: inspect launchd jobs and hand context to an Agent in DeepSeek Harness. |
| 34 | [Chael-Chael/dsh-ascii-whales](https://github.com/Chael-Chael/dsh-ascii-whales) | 1 | 2026-10-21 | 2026-10-21 | 让鲸群游过留白。ASCII whales, native settings and neutral frosted glass for DeepSeek Harness. |
| 35 | [Ckarefulon/dsh-lite-git](https://github.com/Ckarefulon/dsh-lite-git) | 1 | 2026-10-16 | 2026-10-21 | A GitHub Desktop-style Git panel for the DSH right sidebar: tick-to-stage, commit, commit and push, discard into a trash, and diff preview. |
| 36 | [Dcmwfg/dsh-screenshot](https://github.com/Dcmwfg/dsh-screenshot) | 1 | 2026-10-21 | 2026-10-21 | Region screenshot for the DeepSeek Harness composer: hides the DSH window, drag a rectangle over anything behind it, annotate, and drop the PNG into the composer. Windows. |
| 37 | [DRheEheAMGary/dsh-plugin-system-notify](https://github.com/DRheEheAMGary/dsh-plugin-system-notify) | 1 | 2026-10-21 | 2026-10-21 | System-level desktop notifications for DeepSeek Harness, raised by the Harness itself so the banner carries its own identity. |
| 38 | [Fantety/dsh-pixel-studio](https://github.com/Fantety/dsh-pixel-studio) | 1 | 2026-10-21 | 2026-10-21 | DSH plugin for native in-chat pixel art &amp; animation: oy-pixel-style procedural shader, grids/templates, interactive canvas, PNG/GIF/spritesheet/OYPX export. |
| 39 | [feigo313/dsh-structured](https://github.com/feigo313/dsh-structured) | 1 | 2026-10-21 | 2026-10-21 | Structured output for DSH: no-label title card, tables/lists/steps, per-session toggle. |
| 40 | [flyxiu/dsh-simple-tps](https://github.com/flyxiu/dsh-simple-tps) | 1 | 2026-10-21 | 2026-10-21 | DSH web GUI plugin: per-turn TTFT/TPS readout in the chat action row |
| 41 | [GoldenLoaf24h/dsh-prompt-suggestion](https://github.com/GoldenLoaf24h/dsh-prompt-suggestion) | 1 | 2026-10-20 | 2026-10-21 | Claude Code style next-prompt prediction for the DSH composer: a ghost suggestion after each turn, accepted with Tab, Alt+Right, or Enter, with history completion and a settings page for model and reasoning effort. |
| 42 | [gxz19940730-blip/dsh-boot-sequence-NICE](https://github.com/gxz19940730-blip/dsh-boot-sequence-NICE) | 1 | 2026-10-21 | 2026-10-21 | A configurable boot sequence for DeepSeek Harness: play your own video/image phases before the app UI. Ships no artwork, no dependencies, no build step. |
| 43 | [haoqiya138-source/dsh-plugin-open-in-browser](https://github.com/haoqiya138-source/dsh-plugin-open-in-browser) | 1 | 2026-10-21 | 2026-10-21 | Open any DSH sidebar file, including HTML/PDF/images whose built-in preview fails, in the system default browser — one click from a tab chip's context menu. |
| 44 | [hennysky/dsh-notch](https://github.com/hennysky/dsh-notch) | 1 | 2026-10-14 | 2026-10-21 | DeepSeek Harness 的 macOS 原生伴侣：刘海看余额，任务完成 / 等你处理时发系统通知（配套 DSH 插件） |
| 45 | [Imzl-zl/dsh-models-router](https://github.com/Imzl-zl/dsh-models-router) | 1 | 2026-10-13 | 2026-10-21 | Transparent cross-provider failover routing for DeepSeek Harness agents. |
| 46 | [inMessionante19/dsh-desktop-glass](https://github.com/inMessionante19/dsh-desktop-glass) | 1 | 2026-10-20 | 2026-10-21 | Native frosted glass and full transparency for DeepSeek Harness on Windows, with live Wallpaper Engine support. |
| 47 | [ives-jz/dsh-plugin-omni-plan](https://github.com/ives-jz/dsh-plugin-omni-plan) | 1 | 2026-10-21 | 2026-10-21 | 专门用于DSH的人类注意力聚合插件 \| 此插件完全由ai开发(人类仅提供想法,未写代码) |
| 48 | [j62268781-alt/dsh-agent-browser](https://github.com/j62268781-alt/dsh-agent-browser) | 1 | 2026-10-16 | 2026-10-21 | DSH plugin for browser automation: narrow agent-browser CLI (Rust + CDP) tool surface, in-page DOM candidate extraction, settings UI, and a low-cost Jev + upstream LLM bounded decision loop. |
| 49 | [jingchangzhao-gif/error-knowledge-base](https://github.com/jingchangzhao-gif/error-knowledge-base) | 1 | 2026-09-26 | 2026-10-21 | Error knowledge base for LLM tools: record a failure once, keep the fix, and hand it back before the model re-diagnoses. Windows CLI and daemon, DSH/Codex/Claude connectors, MCP server, PostgreSQL store. |
| 50 | [JYT-copy/dsh-minecraft-ui](https://github.com/JYT-copy/dsh-minecraft-ui) | 1 | 2026-10-21 | 2026-10-21 | deepseek-harness minecraft主题插件--Unofficial Minecraft fan theme for the DSH web GUI: blocky pixel UI, photo wallpapers, MC sound samples, BGM player. |
| 51 | [Kadima-code/dsh-subagent-fold](https://github.com/Kadima-code/dsh-subagent-fold) | 1 | 2026-10-20 | 2026-10-21 | DSH 子代理列表折叠：按使用批次分 历史/今日/上次/本次，本次始终展开，其余可折叠（不改原版头部） |
| 52 | [kirito787-neet/dsh-permission-panel](https://github.com/kirito787-neet/dsh-permission-panel) | 1 | 2026-10-14 | 2026-10-21 | DSH 工作区权限面板：搜索、分组、批量修改会话权限，显示当前会话实际生效策略。产物均由 AI 生成。 |
| 53 | [lingdong0128-sys/dsh-plugin-oauth-subs](https://github.com/lingdong0128-sys/dsh-plugin-oauth-subs) | 1 | 2026-10-21 | 2026-10-21 | Backup mirror of xxww0098/dsh-plugin-oauth-subs v0.0.110 (original repo offline). OAuth subscription providers (ChatGPT Codex, Grok, GLM, Kiro, Antigravity, Cursor, Copilot, Kimi, Claude, etc.) for DeepSeek Harness. Unchanged snapshot, MIT. |
| 54 | [Liyu147/dsh-enter-guard](https://github.com/Liyu147/dsh-enter-guard) | 1 | 2026-10-21 | 2026-10-21 | Double-Enter send guard for DeepSeek Harness: the first Enter only arms the composer, the second one sends, any other key cancels. Stops half-written drafts from being sent by a stray Enter. |
| 55 | [maomitgd2006/dsh-CalibGuard](https://github.com/maomitgd2006/dsh-CalibGuard) | 1 | 2026-10-20 | 2026-10-21 | CalibGuard 文件安全审计的 DeepSeek Harness 插件：本地校准 CodeBERT 门控 + 云端复核，以 agent 工具与侧边栏面板两种形态使用 |
| 56 | [micellince/dsh-long-novel-workbench](https://github.com/micellince/dsh-long-novel-workbench) | 1 | 2026-10-21 | 2026-10-21 | 长篇中文小说工作台：章节/时间线/事实账本/伏笔/冲突/人物/高光/审稿/提案/对齐/9 Agent 分工/名家风格预设，AI 可直接生成与审稿。 |
| 57 | [mozhi66/dsh-plugin-categories](https://github.com/mozhi66/dsh-plugin-categories) | 1 | 2026-10-10 | 2026-10-21 | DSH plugin that categorizes installed plugins (skins, MCP, tools...) with per-category batch enable/disable, drag reorder and skin auto-detection |
| 58 | [MukiyoU/dsh-music-analyze](https://github.com/MukiyoU/dsh-music-analyze) | 1 | 2026-10-21 | 2026-10-21 | 给 DeepSeek Harness 加一个工具：把音频变成四张图 + 一组数字，模型看图看数字，就能和你讨论这首曲子。 |
| 59 | [myxiyues/dsh-window-size](https://github.com/myxiyues/dsh-window-size) | 1 | 2026-10-21 | 2026-10-21 | DSH 客户端插件：在「设置」里保存主窗口尺寸/位置，重启自动恢复。koffi/user32 进程内改窗口，无计划任务、无外部进程。 |
| 60 | [PrismScopes/dsh-aide](https://github.com/PrismScopes/dsh-aide) | 1 | 2026-10-20 | 2026-10-21 | AIDE (AI + IDE): VS Code-style local IDE for DeepSeek Harness — Monaco, explorer, search, Git, terminal |
| 61 | [S-anZZz/dsh-deepseek-web-sync](https://github.com/S-anZZz/dsh-deepseek-web-sync) | 1 | 2026-10-21 | 2026-10-21 | DeepSeek 网页版侧栏 · 同步：把 DeepSeek 网页版接入 Harness 右侧栏，同步主题、登录与提问。技术来源：ZCFE327 |
| 62 | [SakuraYH1080/dsh-purge-dsh0.2.1](https://github.com/SakuraYH1080/dsh-purge-dsh0.2.1) | 1 | 2026-10-21 | 2026-10-21 | dsh-purge 1.1.73+dsh0.2.1 - DSH 0.2.1-rc.2 patched build (cwd prompt-variable fix + Windows CJK path restart fix). Based on YuJunZhiXue/dsh-purge by YuJunZhiXue (MIT); base fork 2540656380/dsh-purge. Non-commercial, technical reference only. |
| 63 | [Scorpiour/dsh-mingw](https://github.com/Scorpiour/dsh-mingw) | 1 | 2026-10-21 | 2026-10-21 | Run the Windows DSH shell tool in Git Bash (MinGW64) instead of PowerShell. |
| 64 | [ShallBay/dsh-bridge-browser](https://github.com/ShallBay/dsh-bridge-browser) | 1 | 2026-10-20 | 2026-10-21 | dsh browser bridge plugin: let the model operate your own Chrome tabs while keeping your logins. Repack of @yuxianglin/dsh-bridge-browser, adapted for DSH Desktop 0.2.x. |
| 65 | [ShallBay/dsh-token-stats](https://github.com/ShallBay/dsh-token-stats) | 1 | 2026-08-24 | 2026-10-21 | dsh（DeepSeek Harness）Token 用量看板插件 \| Harness-wide token usage dashboard: aggregates billed tokens (uncached input / cache read / cache write / output) with peak/off-peak CNY cost estimate; sidebar entry opens /token-stats. |
| 66 | [ShawnRen57/dsh-whale-trail](https://github.com/ShawnRen57/dsh-whale-trail) | 1 | 2026-10-21 | 2026-10-21 | Whale Trail · 鲸迹 — automatic local achievement badges for DeepSeek Harness, with whale-themed evolving artwork. |
| 67 | [sherl98/dsh-orca-ocean](https://github.com/sherl98/dsh-orca-ocean) | 1 | 2026-10-21 | 2026-10-21 | 让一头 ASCII 虎鲸游进你的 DeepSeek Harness。An animated ASCII orca for your new-session page. |
| 68 | [Soulize/dsh-identity-override](https://github.com/Soulize/dsh-identity-override) | 1 | 2026-10-20 | 2026-10-21 | A DeepSeek Harness plugin for overriding the built-in HARNESS_IDENTITY prompt without modifying core files. |
| 69 | [spinoi-code/dsh-whale-commands](https://github.com/spinoi-code/dsh-whale-commands) | 1 | 2026-10-21 | 2026-10-21 | DeepSeek Harness 微信通道的扩展命令插件：提供人设切换、历史对话、token 用量与余额、每日定时问候等功能与扩展菜单。命令由宿主进程执行，不消耗模型 token，支持热挂载。 |
| 70 | [stansz/dsh-convo-mode](https://github.com/stansz/dsh-convo-mode) | 1 | 2026-10-21 | 2026-10-21 | DeepSeek Harness bundle: a per-session conversation mode (composer chip, /conversation command, conversation policy prompt, read-only tool policy). |
| 71 | [tianji-qingtian/dsh-engineering-skills](https://github.com/tianji-qingtian/dsh-engineering-skills) | 1 | 2026-10-21 | 2026-10-21 | DeepSeek Harness 技能插件：把 Matt Pocock 的 27 个工程/生产力技能（grilling、spec/ticket、TDD、code review、领域建模、handoff）作为技能 provider 分发 · DeepSeek Harness plugin: Matt Pocock's 27 engineering &amp; productivity skills as a bundled skill provider (11 model-invoked, 16 user-invoked) |
| 72 | [Tryanstm/dsh-chatcanvas](https://github.com/Tryanstm/dsh-chatcanvas) | 1 | 2026-10-21 | 2026-10-21 | Editable canvases, rich messages, interactive UI, math plots and music inside DeepSeek Harness. |
| 73 | [Vincent-chk/dsh-ponytail](https://github.com/Vincent-chk/dsh-ponytail) | 1 | 2026-10-21 | 2026-10-21 | Ponytail (lazy senior dev mode) for DeepSeek Harness: always-on smallest-complete-change rules and six ponytail skills, one bundle with no slash command. |
| 74 | [wonderandyou/dsh-admin-mode](https://github.com/wonderandyou/dsh-admin-mode) | 1 | 2026-10-21 | 2026-10-21 | DSH 插件：在权限菜单里新增「管理员」档（完全访问 + 永不询问），内置官方 computer use、操控提示与自主迭代按钮。 |
| 75 | [wuaisaber/dsh-think-zh-plus](https://github.com/wuaisaber/dsh-think-zh-plus) | 1 | 2026-10-20 | 2026-10-21 | DSH plugin: reason in Chinese (system-prompt section) + auto-expand every Think row in the Web UI |
| 76 | [xindong/dsh-client-canvas](https://github.com/xindong/dsh-client-canvas) | 1 | 2026-08-19 | 2026-10-21 | AI-native multimodal canvas for DeepSeek Harness. Preview images, video, audio, 3D models, PDFs, documents and code; connect ideas and collaborate with agents in a persistent local workspace. |
| 77 | [XXGxiaoyu/dsh-session-sync](https://github.com/XXGxiaoyu/dsh-session-sync) | 1 | 2026-10-21 | 2026-10-21 | LAN session sync for DSH: auto-discover devices running this plugin, browse/pull/push sessions over HTTP with SHA-256 verification, and keep a local-only nickname per device. ｜ DSH 局域网会话同步：自动发现装了本插件的设备、仅存本机的设备命名、浏览/拉取/推送会话，带 SHA-256 校验。 |
| 78 | [Yeezone/dsh-teambition](https://github.com/Yeezone/dsh-teambition) | 1 | 2026-10-21 | 2026-10-21 | 把钉钉 Teambition 接进 DeepSeek Harness 侧边栏：在 DSH 内浏览项目 / 任务列表 / 卡片，新建与移动卡片，并把任意卡片放到指定的 DSH 工作区里执行。Teambition panel for the DSH Web GUI. |
| 79 | [Yeezone/kanweave](https://github.com/Yeezone/kanweave) | 1 | 2026-10-21 | 2026-10-21 | Self-hosted kanban project management: projects, lists and cards with image/video attachments, DingTalk sign-in, per-project roles and invites, live multi-user sync. Runs as a standalone web app or a DeepSeek Harness plugin. |
| 80 | [yinque91/dsh-live-narrator](https://github.com/yinque91/dsh-live-narrator) | 1 | 2026-10-21 | 2026-10-21 | 小嘴 · 实时解说 —— DeepSeek Harness 输入框下方的语音解说插件 |
| 81 | [yinque91/dsh-mood](https://github.com/yinque91/dsh-mood) | 1 | 2026-10-21 | 2026-10-21 | 情绪引擎 —— 收到「谢谢」更有干劲，被骂就掉效率，掉到底罢工。DeepSeek Harness 插件 |
| 82 | [yschdxm/dsh-windows-notify](https://github.com/yschdxm/dsh-windows-notify) | 1 | 2026-10-21 | 2026-10-21 | Windows native toast notifications for DeepSeek Harness, with click-to-focus and jump-to-conversation. |
| 83 | [YuKimCai/dsh-mattpocock-skill](https://github.com/YuKimCai/dsh-mattpocock-skill) | 1 | 2026-10-21 | 2026-10-21 | Matt Pocock 的 27 个工程技能（grilling 需求拷问、spec/工单拆分、TDD、双轴 code review、领域建模、wayfinder 决策地图、retro 复盘）打包成 DeepSeek Harness 的 Agent 预设。装上即用：模型自主调用 11 个，另 16 个用 /技能名 点名。它解决的不是写代码，是在动手之前把「你到底要什么」问清楚、钉死、拆成可执行的工单。 |
| 84 | [YukoZ1227/dsh-ui-design-toggle](https://github.com/YukoZ1227/dsh-ui-design-toggle) | 1 | 2026-10-21 | 2026-10-21 | 由于 ui-ux-pro-max 原生不支持 DSH 而重建的插件：在 DSH 侧边栏一键启用/停用 ui-ux-pro-max 设计技能（适配 DSH 0.2.1-rc.2） |
| 85 | [YumenoSayuri/dsh-time-weaver](https://github.com/YumenoSayuri/dsh-time-weaver) | 1 | 2026-10-21 | 2026-10-21 | 时空编织者 (Time Weaver) — 全能会话流控制：用户消息回溯重填、AI 回复原地编辑、语义占位撤回删除、保全工具链的时空回退重新生成。 |
| 86 | [yxue301603/dsh-everyday-plugins](https://github.com/yxue301603/dsh-everyday-plugins) | 1 | 2026-10-21 | 2026-10-21 | DSH 日常工具箱 · Eight native everyday plugins |
| 87 | [Zhr65/dsh-skill-auditor](https://github.com/Zhr65/dsh-skill-auditor) | 1 | 2026-10-17 | 2026-10-21 | DSH 能力管家：说功能就能用上装过的插件 —— 能力路由（按任务匹配到该调的工具名）、主动体检（版本落后 / 运行时故障 / 基线通过率）、利用率盘点（哪些能力从没用上）。npm: dsh-skill-auditor |
| 88 | [zlh124/dsh-plugin-tetris](https://github.com/zlh124/dsh-plugin-tetris) | 1 | 2026-10-21 | 2026-10-21 | Play Tetris in the DeepSeek Harness Web GUI while the agent works |
| 89 | [zudazhuang/dsh-update-safe](https://github.com/zudazhuang/dsh-update-safe) | 1 | 2026-10-03 | 2026-10-21 | DeepSeek Harness update plugin: official release checks, scheduled updates and supervised rollback |
| 90 | [111222cjyq/dsh-curate](https://github.com/111222cjyq/dsh-curate) | 0 | 2026-10-21 | 2026-10-21 | Human-in-the-loop context curation workbench for DeepSeek Harness: triage turns, rewrite messages, then compress the session history in place with model-written summaries or the official /compact. Every write is backed up locally. |
| 91 | [111xjyuan/dsh-desktop-sidecar](https://github.com/111xjyuan/dsh-desktop-sidecar) | 0 | 2026-10-21 | 2026-10-21 | Native Windows desktop control for DeepSeek Harness: UIA control tree, offline OCR, verified clicks, Unicode typing. Zero external runtime. |
| 92 | [123WE-glitch/dsh-selection-actions](https://github.com/123WE-glitch/dsh-selection-actions) | 0 | 2026-10-21 | 2026-10-21 | DeepSeek Harness 插件：选中对话文字，加入对话或在可复用的侧边对话里提问（继承主对话上下文）。Selection actions for DeepSeek Harness chat. |
| 93 | [1250589385/dsh-stall-guard](https://github.com/1250589385/dsh-stall-guard) | 0 | 2026-10-20 | 2026-10-21 | DSH 卡顿守卫：下载卡住时自动中止，并把「换源」提示写给智能体。按类型独立配置，不调用任何模型。 |
| 94 | [1250589385/DSH-Test-Autofix](https://github.com/1250589385/DSH-Test-Autofix) | 0 | 2026-10-19 | 2026-10-21 | DSH 测试自动修复：给 agent 一个 run_tests 工具，跑测试并把结构化失败（文件/行号/断言）直接交给它修复。自动识别 pytest / jest / vitest / cargo / go / npm，Windows 中文断言不乱码，同一失败反复出现时自动停止。 |
| 95 | [1708994293-hue/dsh-auto-update](https://github.com/1708994293-hue/dsh-auto-update) | 0 | 2026-10-21 | 2026-10-21 | DSH 插件：启动时检查已启用插件的新版本，列出并询问是否更新 |
| 96 | [361533652/dsh-token-bi](https://github.com/361533652/dsh-token-bi) | 0 | 2026-10-21 | 2026-10-21 | Token spend dashboard for DeepSeek Harness — daily columns, hourly rhythm, model/workspace splits, call tree, per-turn timeline. |
| 97 | [439436269-ctrl/dsh-blend-preview](https://github.com/439436269-ctrl/dsh-blend-preview) | 0 | 2026-10-21 | 2026-10-21 | Preview Blender .blend files in the DeepSeek Harness right Sidebar: cached headless GLB export plus a dependency-free WebGL viewer with scene statistics. |
| 98 | [439436269-ctrl/dsh-stl-preview](https://github.com/439436269-ctrl/dsh-stl-preview) | 0 | 2026-10-21 | 2026-10-21 | Preview STL meshes in the DeepSeek Harness right Sidebar: dependency-free WebGL viewport plus size, volume, surface area and watertightness. |
| 99 | [598934321/dsh-quota-pill](https://github.com/598934321/dsh-quota-pill) | 0 | 2026-10-21 | 2026-10-21 | Quota pill for DeepSeek Harness: how much is left on every LLM subscription, in one pill |
| 100 | [654970/dsh-typing-studio](https://github.com/654970/dsh-typing-studio) | 0 | 2026-10-21 | 2026-10-21 | Bilingual Chinese and English typing practice for DeepSeek Harness, with timed passages, IME-aware scoring, and local records. |
| 101 | [Adingo001/dsh-notification-desktop](https://github.com/Adingo001/dsh-notification-desktop) | 0 | 2026-10-21 | 2026-10-21 | Turn-finished desktop notifications for DeepSeek Harness 0.2.x · DSH 完成提醒（宿主投影 + WinRT toast） |
| 102 | [ADkun/dsh-insert-context](https://github.com/ADkun/dsh-insert-context) | 0 | 2026-10-06 | 2026-10-21 | DeepSeek Harness 插件：任务执行到第 X 步起，每 Y 步往智能体自己的上下文里注入一次自定义消息（共 Z 次，文案支持 {{step}} 占位），并可在用户消息末尾追加一句话；带总开关，全部在设置页配置。Scheduled context injection for DSH agents. |
| 103 | [ADkun/dsh-windows-notifier](https://github.com/ADkun/dsh-windows-notifier) | 0 | 2026-10-06 | 2026-10-21 | DeepSeek Harness 插件：任何对话把控制权交还给你时弹一条 Windows 原生通知 —— 任务完成、需要你回答、等待审批；后台运行的会话同样通知，点通知可直接打开 DSH。Native Windows toast notifications for DSH. |
| 104 | [Aegink/dsh-channel-qq](https://github.com/Aegink/dsh-channel-qq) | 0 | 2026-10-18 | 2026-10-21 | DeepSeek Harness 的 QQ 渠道插件（OneBot v11 / SnowLuma）：工具面、长期记忆、知识库、主动行为与管理后台 |
| 105 | [Aero123421/dsh-skills-manager](https://github.com/Aero123421/dsh-skills-manager) | 0 | 2026-10-21 | 2026-10-21 | Manage Agent Skills from the DSH sidebar (project + user roots) |
| 106 | [akash-digitavision/my-rea-toolkit](https://github.com/akash-digitavision/my-rea-toolkit) | 0 | 2026-10-21 | 2026-10-21 | REA |
| 107 | [AlannerFranklin/dsh-cutout-pet](https://github.com/AlannerFranklin/dsh-cutout-pet) | 0 | 2026-10-20 | 2026-10-21 | Turn any picture into a floating desk pet in the DeepSeek Harness Web UI: local cutout, sticker outline, idle animation, and a live account-balance bubble. |
| 108 | [Alexis-ray/dsh-memory-lite](https://github.com/Alexis-ray/dsh-memory-lite) | 0 | 2026-10-21 | 2026-10-21 | Workspace-scoped long-term memory for DeepSeek Harness: plain Markdown, zero network, no automatic model calls. |
| 109 | [amberpulse/dsh-storymine](https://github.com/amberpulse/dsh-storymine) | 0 | 2026-10-21 | 2026-10-21 | 写东西卡住了就问一句"别人怎么写这一段"，条目推到右侧面板，正文里不刷屏。 |
| 110 | [an-an-618/dsh-hook-followup](https://github.com/an-an-618/dsh-hook-followup) | 0 | 2026-10-21 | 2026-10-21 | Hook follow-up for DeepSeek Harness: one anchor question plus 1-3 clickable user-voice quick replies under each turn. |
| 111 | [an-an-618/dsh-intelligent-ui](https://github.com/an-an-618/dsh-intelligent-ui) | 0 | 2026-10-21 | 2026-10-21 | Intelligent UI for DeepSeek Harness: declarative, interactive cards rendered by a Client interpreter. |
| 112 | [anchoredship/dsh-audio-transcribe](https://github.com/anchoredship/dsh-audio-transcribe) | 0 | 2026-10-21 | 2026-10-21 | Offline audio-to-text for DeepSeek Harness: transcribe with SenseVoice and record system playback — fully local. |
| 113 | [Asheep233/dsh-session-wake](https://github.com/Asheep233/dsh-session-wake) | 0 | 2026-10-21 | 2026-10-21 | Instant wake for running DSH sessions — a host-plane bridge using the official sessionController.prompt() API (HTTP + file queue). Why headless can't. |
| 114 | [Autodog875/dsh-agent-progress](https://github.com/Autodog875/dsh-agent-progress) | 0 | 2026-10-21 | 2026-10-21 | 常驻任务进度条 — DeepSeek Harness 插件：显示当前对话与所有对话的实时任务进度 |
| 115 | [awawuming/dsh-model-hub](https://github.com/awawuming/dsh-model-hub) | 0 | 2026-10-21 | 2026-10-21 | DeepSeek Harness 模型选择器：先按 API 通道、再按模型家族分组的下拉菜单，中转站几百个模型也能秒找。 |
| 116 | [basaltfold/douyin-expert](https://github.com/basaltfold/douyin-expert) | 0 | 2026-10-21 | 2026-10-21 | 抖音专家 — 22 个抖音/多平台/海外内容创作与数据分析技能的 DeepSeek Harness 宿主插件 |
| 117 | [basaltfold/dsh-tencent-channel-fix](https://github.com/basaltfold/dsh-tencent-channel-fix) | 0 | 2026-10-20 | 2026-10-21 | Fixes the buddy / workbuddy channel 400 (code 11128, "Illegal API invocation from an unapproved channel") in DeepSeek Harness, and re-applies the fix after every dsh-our-free-model upgrade. |
| 118 | [basaltfold/xiaohongshu-expert](https://github.com/basaltfold/xiaohongshu-expert) | 0 | 2026-10-21 | 2026-10-21 | 小红书专家 — 11 个小红书内容创作与数据分析技能的 DeepSeek Harness 宿主插件 |
| 119 | [BillYuan01/dsh-qwenpaw-bridge](https://github.com/BillYuan01/dsh-qwenpaw-bridge) | 0 | 2026-10-21 | 2026-10-21 | DSH-side bundle plugin for QwenPaw: live assistant streaming, hot-switchable permission presets, and a model catalog in _meta over standard ACP v1. |
| 120 | [Blake-John/dsh-scientist](https://github.com/Blake-John/dsh-scientist) | 0 | 2026-10-20 | 2026-10-21 | A agent that help you work in your field. |
| 121 | [blue-a11y/dsh-thinking-style](https://github.com/blue-a11y/dsh-thinking-style) | 0 | 2026-10-20 | 2026-10-21 | 还原 DeepSeek Harness 初版 Thinking 样式，恢复字号、蓝色流光与思考行扫光，支持思考区域语言选择。 |
| 122 | [bosenok/dsh-add-to-chat](https://github.com/bosenok/dsh-add-to-chat) | 0 | 2026-10-17 | 2026-10-21 | Add selected chat text to the composer as an annotation (DeepSeek Harness plugin). |
| 123 | [bosenok/dsh-app-usage](https://github.com/bosenok/dsh-app-usage) | 0 | 2026-10-17 | 2026-10-21 | Local session statistics with a per-provider breakdown for DeepSeek Harness. |
| 124 | [bosenok/dsh-mermaid](https://github.com/bosenok/dsh-mermaid) | 0 | 2026-10-17 | 2026-10-21 | Render mermaid fenced code blocks as diagrams in DeepSeek Harness. |
| 125 | [bosenok/dsh-zai-mcp](https://github.com/bosenok/dsh-zai-mcp) | 0 | 2026-10-17 | 2026-10-21 | Install Z.AI MCP servers into DeepSeek Harness: skill, bootstrap and agent preset. |
| 126 | [bosenok/dsh-zai-usage](https://github.com/bosenok/dsh-zai-usage) | 0 | 2026-10-17 | 2026-10-21 | Z.AI coding-plan quota panel for DeepSeek Harness. |
| 127 | [Broknsun/dsh-desktop-shell-plus](https://github.com/Broknsun/dsh-desktop-shell-plus) | 0 | 2026-10-21 | 2026-10-21 | 深色品牌启动页 / 真 DPI 感知 / 深色无边框标题栏 / 窗口记忆 / F12 / 右栏 20% —— DeepSeek Harness 桌面外壳（dsh-desktop-shell）的 UI 补丁集 \| UI patch set for the DeepSeek Harness WebView2 desktop shell |
| 128 | [Brunojomosi/dsh-plugin-deepseek-saldo](https://github.com/Brunojomosi/dsh-plugin-deepseek-saldo) | 0 | 2026-10-21 | 2026-10-21 | DSH plugin: shows your DeepSeek account balance in the left sidebar, above the More button. Plugin do DSH: saldo da conta DeepSeek na barra lateral, acima do botao More. |
| 129 | [Charlotteyi5/dsh-workspace-drive-picker](https://github.com/Charlotteyi5/dsh-workspace-drive-picker) | 0 | 2026-10-21 | 2026-10-21 | Drive-letter chips and a remembered start directory for the DeepSeek Harness add-workspace picker · 给 DSH 的「添加工作区」加上盘符一键直达与上次目录记忆 |
| 130 | [charonpi/dsh-mail](https://github.com/charonpi/dsh-mail) | 0 | 2026-10-21 | 2026-10-21 | DSH 插件：通过 IMAP/SMTP 收发邮件，支持 QQ/163/126/Gmail/Outlook 等多服务商与附件上传下载 |
| 131 | [Chlyz621/dsh-unstuck](https://github.com/Chlyz621/dsh-unstuck) | 0 | 2026-10-20 | 2026-10-21 | Auto-recovery for DeepSeek Harness: continues turns that ended abnormally or were swallowed into plain text, and revives stalled model requests. |
| 132 | [chzisnull/dsh-git-tree](https://github.com/chzisnull/dsh-git-tree) | 0 | 2026-10-21 | 2026-10-21 | DeepSeek Harness plugin: a Sourcetree-style Git workspace — branches, staged/unstaged changes and diffs in a full-height panel |
| 133 | [Ck-epsilon/Aura](https://github.com/Ck-epsilon/Aura) | 0 | 2026-10-21 | 2026-10-21 | Aura — small, focused tools for agents and people. Monorepo for AuraArgus and AuraCardea. |
| 134 | [Cloud017/dsh-prompt-reforge](https://github.com/Cloud017/dsh-prompt-reforge) | 0 | 2026-10-21 | 2026-10-21 | A DSH composer control that reforges a rough draft into a precise prompt, with one-click revert. |
| 135 | [CloudSen/dsh-umbrella-theme](https://github.com/CloudSen/dsh-umbrella-theme) | 0 | 2026-10-21 | 2026-10-21 | Umbrella Corporation theme for DeepSeek Harness: black-and-red dark scheme, grey-and-white light scheme, a spinning umbrella watermark and a HUD frame. |
| 136 | [cong7781/novel](https://github.com/cong7781/novel) | 0 | 2026-10-21 | 2026-10-21 | 长文本关系图提取 |
| 137 | [CowB0ySpike/dsh-deepseek-balance](https://github.com/CowB0ySpike/dsh-deepseek-balance) | 0 | 2026-10-21 | 2026-10-21 | DSH (DeepSeek Harness) plugin: shows the DeepSeek API key account balance in the composer dock. |
| 138 | [cshengyi023-collab/dsh-deepsea-echo](https://github.com/cshengyi023-collab/dsh-deepsea-echo) | 0 | 2026-10-21 | 2026-10-21 | 深海回响 / dsh-deepsea-echo —— 明日方舟风 DSH 启动动画：鲸鱼娘 × PRTS 终端、全息锁定与干员档案，4 套原创配乐可选，可跳过、可配置。Arknights-flavoured startup / boot / splash animation plugin for the DeepSeek Harness Web GUI. |
| 139 | [cshengyi023-collab/dsh-pet-companion](https://github.com/cshengyi023-collab/dsh-pet-companion) | 0 | 2026-10-21 | 2026-10-21 | 小鲸鲸陪伴 / dsh-pet-companion: a low-key companion panel for DeepSeek Harness (DSH) — pomodoro timer, todo list, drink &amp; stand-up reminders, lesson explanation and homework tutoring via the installed desktop pet. 桌宠陪伴面板：番茄钟、待办、喝水久坐提醒、课程讲解、作业辅导，本地功能 0 token。 |
| 140 | [cslkkl/dsh-switchboard](https://github.com/cslkkl/dsh-switchboard) | 0 | 2026-10-20 | 2026-10-21 | DeepSeek Harness 插件：给子智能体和队友逐个指定模型，点一下就换。零依赖、运行时生效、不用重启。 |
| 141 | [czxgg0630/dsh-html-annotate](https://github.com/czxgg0630/dsh-html-annotate) | 0 | 2026-10-21 | 2026-10-21 | 右侧栏 HTML 批注预览：点选元素或框选区域写批注，直接发进当前会话让 AI 改 |
| 142 | [dadgrand/dsh-file-preview](https://github.com/dadgrand/dsh-file-preview) | 0 | 2026-10-20 | 2026-10-21 | In-chat preview modal for local files, images, PDFs, Office documents and website links in the DeepSeek Harness Web UI |
| 143 | [DaJiang07/dsh-plugin-backup](https://github.com/DaJiang07/dsh-plugin-backup) | 0 | 2026-10-21 | 2026-10-21 | Back up every DSH plugin and all profile settings into one portable JSON file, then restore them on another machine in one click. |
| 144 | [dake6767/dsh-onlyoffice](https://github.com/dake6767/dsh-onlyoffice) | 0 | 2026-10-21 | 2026-10-21 | OnlyOffice document viewer/editor plugin for DeepSeek Harness — open docx/xlsx/pptx from the sidebar, edit and save back (client-side static SDK, no Document Server). |
| 145 | [daniei-chen/dsh-token-insight](https://github.com/daniei-chen/dsh-token-insight) | 0 | 2026-10-21 | 2026-10-21 | Local-first token usage dashboard for DeepSeek Harness (DSH). AI install guide for the plugin and the companion Android app. |
| 146 | [dasazira-QAQ/dsh-kugou-music](https://github.com/dasazira-QAQ/dsh-kugou-music) | 0 | 2026-10-21 | 2026-10-21 | 在 DeepSeek Harness 里搜索、播放酷狗音乐：本机歌单解密、逐字歌词与翻译、两套 UI、自定义热键与播放模式 |
| 147 | [david0304git/dsh-appearance-glass](https://github.com/david0304git/dsh-appearance-glass) | 0 | 2026-10-21 | 2026-10-21 | DSH 外觀外掛：介面透明度（四個分區獨立可調）＋ 內建壁紙顏色。純 alpha，沒有模糊與玻璃特效。 |
| 148 | [ddldxiacan/dsh-freetap](https://github.com/ddldxiacan/dsh-freetap) | 0 | 2026-10-19 | 2026-10-21 | DSH plugin — free OpenCode Zen models for DeepSeek Harness (DSH), no API key. 在 DSH 中使用 OpenCode Zen 免费模型，无需 API key |
| 149 | [deepinfra/dsh-provider-deepinfra](https://github.com/deepinfra/dsh-provider-deepinfra) | 0 | 2026-10-21 | 2026-10-21 | DeepInfra provider for DeepSeek Harness (dsh): live model catalog, streaming chat completions, tool calls, reasoning, and images. |
| 150 | [diexianxiang/dsh-custom-splash](https://github.com/diexianxiang/dsh-custom-splash) | 0 | 2026-10-20 | 2026-10-21 | 一个为 DeepSeek Harness (DSH) 打造的自定义视频启动动画插件，支持替换为任意本地视频文件。 |
| 151 | [dingchenhui0618-arch/dsh-tab-complete](https://github.com/dingchenhui0618-arch/dsh-tab-complete) | 0 | 2026-10-21 | 2026-10-21 | Tab 补全：用模型预测你在 DeepSeek Harness 输入框里接下来要打的字，灰色幽灵文本 + Tab 一键填入（Codex Pro 那套输入预测的 DSH 版） |
| 152 | [dingdong2333333-lab/dsh-app-controls](https://github.com/dingdong2333333-lab/dsh-app-controls) | 0 | 2026-10-21 | 2026-10-21 | DSH 官方客户端没有的两个按钮：重启和刷新。一个很小的独立插件。 |
| 153 | [dinhdev666/dsh-vi-pack](https://github.com/dinhdev666/dsh-vi-pack) | 0 | 2026-10-21 | 2026-10-21 | Gói ngôn ngữ tiếng Việt cho giao diện DeepSeek Harness (DSH). |
| 154 | [DIPPER12138/dsh-mathtype](https://github.com/DIPPER12138/dsh-mathtype) | 0 | 2026-10-21 | 2026-10-21 | MathType OLE equations for DeepSeek Harness: convert LaTeX placeholders in a Word .docx into real MathType objects (Equation.DSMT4), preserving equation numbers, SEQ fields, bookmarks and cross-references. |
| 155 | [dippingOrange/dsh-conductor](https://github.com/dippingOrange/dsh-conductor) | 0 | 2026-10-21 | 2026-10-21 | Multi-model task dispatch and Web task board for DeepSeek Harness |
| 156 | [docsor1212/dsh-scholar-suite](https://github.com/docsor1212/dsh-scholar-suite) | 0 | 2026-10-21 | 2026-10-21 | SkillHub 学术工具链 8 技能的 DeepSeek Harness 捆绑套件:图表/去AI味/润色/引文核验,一次安装整包注册 |
| 157 | [DoggyHU/dsh-archive-manager](https://github.com/DoggyHU/dsh-archive-manager) | 0 | 2026-10-21 | 2026-10-21 | 归档对话面板：列出全部已归档的对话，批量选中后一起取消归档或永久删除 |
| 158 | [DoggyHU/dsh-notify](https://github.com/DoggyHU/dsh-notify) | 0 | 2026-10-21 | 2026-10-21 | 任务提示音：DSH 需要确认或一轮结束时播放 Windows 提示音，音效可在设置页挑选并试听 |
| 159 | [DoggyHU/dsh-quote-annotate-pro](https://github.com/DoggyHU/dsh-quote-annotate-pro) | 0 | 2026-10-21 | 2026-10-21 | 本地 fork（MIT）：上游 dsh-quote-annotate-pro + 文档预览划词时引用块带上来源文件路径 |
| 160 | [DoggyHU/dsh-sidebar-editor](https://github.com/DoggyHU/dsh-sidebar-editor) | 0 | 2026-10-21 | 2026-10-21 | 给 DSH 官方右侧栏文档预览追加「编辑器」视图：CodeMirror 源码编辑 + 渲染视图里直接改 Markdown（表格加行加列、Enter 换行、划词批注送进对话框） |
| 161 | [DoggyHU/dsh-sidebar-pin](https://github.com/DoggyHU/dsh-sidebar-pin) | 0 | 2026-10-21 | 2026-10-21 | DSH 侧边栏置顶区：把常用工作区与会话钉在「工作区」上方，会话行同步运行中/完成/等待状态 |
| 162 | [dtdths/dsh-mixer](https://github.com/dtdths/dsh-mixer) | 0 | 2026-10-14 | 2026-10-21 | 调音台视图：把多个 DeepSeek Harness 会话并排一屏，等待审批 / 提问的通道即时亮灯。 |
| 163 | [dthcle/dsh-proxy-config](https://github.com/dthcle/dsh-proxy-config) | 0 | 2026-10-21 | 2026-10-21 | Configurable outbound HTTP proxy for DeepSeek Harness (DSH): set the proxy endpoint in Settings, with a live reachability check and an automatic no-proxy fallback that switches back once the proxy answers. |
| 164 | [dx906/dsh-ofm-quota](https://github.com/dx906/dsh-ofm-quota) | 0 | 2026-10-21 | 2026-10-21 | DSH 接口配额管理插件：实时统计每次对话所用接口的 Token/积分消耗，额度耗尽时自动切到同名模型的其他接口，全部第三方不可用时兜底切 DeepSeek 官方。右侧栏卡片展示各渠道剩余余额。围绕 dsh-our-free-model 工作，零运行时依赖。 |
| 165 | [Echo-Cry/dsh-away-notify](https://github.com/Echo-Cry/dsh-away-notify) | 0 | 2026-10-21 | 2026-10-21 | dsh自主资讯推送插件，采集资讯后自主推送到会话或 IM |
| 166 | [fan20yong/dsh-session-manager-next](https://github.com/fan20yong/dsh-session-manager-next) | 0 | 2026-10-21 | 2026-10-21 | DeepSeek Harness plugin: browse, export (Markdown/JSON/HTML), tidy up and safely delete session histories. 适配 DSH 0.2.1-rc.2 |
| 167 | [feely0208/dsh-teardown-studio](https://github.com/feely0208/dsh-teardown-studio) | 0 | 2026-10-21 | 2026-10-21 | DeepWhale Teardown Studio — upload a pre-separated 3D model and render a teardown video locally (DSH plugin) |
| 168 | [felixpu/dsh-archive-session-manager](https://github.com/felixpu/dsh-archive-session-manager) | 0 | 2026-10-10 | 2026-10-21 | 已归档会话管理：在会话「···」菜单里为已归档会话提供「删除会话」，并提供一个归档会话面板（多选、批量删除、批量取消归档）。 |
| 169 | [felixpu/dsh-sidebar-tab-actions](https://github.com/felixpu/dsh-sidebar-tab-actions) | 0 | 2026-10-21 | 2026-10-21 | DSH Web 右侧栏标签页右键批量关闭：关闭左侧 / 关闭右侧 / 关闭全部 |
| 170 | [felixpu/dsh-suite](https://github.com/felixpu/dsh-suite) | 0 | 2026-10-13 | 2026-10-21 | DSH 插件合集（聚合包）：一次安装把多个独立维护的 DSH 插件装配成一组，单个插件故障不影响其余功能。 |
| 171 | [FenrirCait/dsh-session-leftover-purge](https://github.com/FenrirCait/dsh-session-leftover-purge) | 0 | 2026-10-20 | 2026-10-21 | Purge billion-context (bili) leftovers after an archive-manager session delete completes. Plugin for DeepSeek Harness. |
| 172 | [Findly-qwb/dsh-model-picker](https://github.com/Findly-qwb/dsh-model-picker) | 0 | 2026-10-20 | 2026-10-21 | A two-pane model picker for DeepSeek Harness. |
| 173 | [fishcg/dsh-airpod-control](https://github.com/fishcg/dsh-airpod-control) | 0 | 2026-10-21 | 2026-10-21 | Control DeepSeek Harness from AirPods head gestures (via HeadOrbit): nod = allow / confirm, shake = reject / next option — with a one-click installer for the menu-bar app. |
| 174 | [funny0A0/dsh-egress-router](https://github.com/funny0A0/dsh-egress-router) | 0 | 2026-10-21 | 2026-10-21 | 为单个目标开本机端口，经本机代理转发；含配置自愈与声明式兼容补丁 |
| 175 | [FxRayHughes/dsh-peer-link](https://github.com/FxRayHughes/dsh-peer-link) | 0 | 2026-10-21 | 2026-10-21 | Link DeepSeek Harness (DSH) instances on the LAN: delegate subagents to another machine's DSH, continue its sessions, with signed auto-discovery and a visual settings page |
| 176 | [gaopengpian/dsh-custom-ui-theme](https://github.com/gaopengpian/dsh-custom-ui-theme) | 0 | 2026-10-21 | 2026-10-21 | DeepSeek Harness Desktop region-based UI theme customizer (background/border/text styles, element picker, highest-priority overrides) |
| 177 | [Garybot126/dsh-subagent-models](https://github.com/Garybot126/dsh-subagent-models) | 0 | 2026-10-21 | 2026-10-21 | 用于DSH中自由切换子代理使用的模型及强度 |
| 178 | [ghang/dsh-cache-helper](https://github.com/ghang/dsh-cache-helper) | 0 | 2026-10-21 | 2026-10-21 | DeepSeek Harness 缓存助手：展示缓存命中量与命中率，发送前预警大规模缓存失效风险，并提供异常记录与会话缓存分析看板。/ Cache-hit metrics, request-prefix risk confirmation, and per-step cache-miss diagnostics for DeepSeek Harness. |
| 179 | [githu-mensk/dsh-tentacle](https://github.com/githu-mensk/dsh-tentacle) | 0 | 2026-10-21 | 2026-10-21 | Give DeepSeek Harness eyes and hands: live click-through screen preview plus real mouse/keyboard control on Windows. |
| 180 | [github798383392/dsh-skill-filmora-2026](https://github.com/github798383392/dsh-skill-filmora-2026) | 0 | 2026-10-21 | 2026-10-21 | DeepSeek Harness skill pack: plan-driven video editing automation for Wondershare Filmora 2026 on Windows |
| 181 | [GooDAnDReaDY/dsh-ollama-cloud-provider](https://github.com/GooDAnDReaDY/dsh-ollama-cloud-provider) | 0 | 2026-10-21 | 2026-10-21 | Ollama Cloud LLM provider plugin for DeepSeek Harness (dsh). |
| 182 | [Goose-Gusi/dsh-enter-remap](https://github.com/Goose-Gusi/dsh-enter-remap) | 0 | 2026-10-21 | 2026-10-21 | DSH plugin: remap Enter, Ctrl+Enter and Shift+Enter to line break, send, or busy-time send. |
| 183 | [Gorkaseto/dsh-delete-sessions](https://github.com/Gorkaseto/dsh-delete-sessions) | 0 | 2026-10-20 | 2026-10-21 | A plugin for DeepSeek Harness (DSH) that adds a permanent "Delete session" action to the sidebar session menu |
| 184 | [Gorkaseto/dsh-effort-picker](https://github.com/Gorkaseto/dsh-effort-picker) | 0 | 2026-10-20 | 2026-10-21 | A plugin for DeepSeek Harness (DSH) that enables effort choice in custom providers and replaces the standard "Effort" menu item with an intuitive, sticky effort slider directly inside the composer model menu. |
| 185 | [Gorkaseto/dsh-whale-pet](https://github.com/Gorkaseto/dsh-whale-pet) | 0 | 2026-10-20 | 2026-10-21 | A lightweight, pixel-art companion plugin for DeepSeek Harness (DSH) that adds an animated whale pet above the input composer during new sessions. |
| 186 | [GU143312/dsh-training-lens](https://github.com/GU143312/dsh-training-lens) | 0 | 2026-10-21 | 2026-10-21 | Training Lens · 训练视窗 — local TensorBoard scalar monitoring for DeepSeek Harness |
| 187 | [GunjanPatel359/dsh-tool-search](https://github.com/GunjanPatel359/dsh-tool-search) | 0 | 2026-10-21 | 2026-10-21 | Deferred tool loading for DSH (DeepSeek Harness): send MCP tools as a compact index and load details on demand, without breaking the prompt cache. |
| 188 | [Guzi2005/dsh-whale-combo](https://github.com/Guzi2005/dsh-whale-combo) | 0 | 2026-10-21 | 2026-10-21 | 鲸鱼娘合并数据卡：DSH Web 插件，毛玻璃余额/缓存/峰谷状态卡 + 深蓝扣费弹幕（合并 dsh-whale-widget 与 dsh-damage-pulse 的数据） |
| 189 | [hansomgar/dsh-settings-resize](https://github.com/hansomgar/dsh-settings-resize) | 0 | 2026-10-21 | 2026-10-21 | Adjust the DeepSeek Harness Settings dialog width, height and transparency from three sliders in General settings. |
| 190 | [HarcoChen/dsh-ArkStronghold](https://github.com/HarcoChen/dsh-ArkStronghold) | 0 | 2026-10-21 | 2026-10-21 | 允许DSH接入ArkStronghold |
| 191 | [HeShen-1/dsh-pg-grid](https://github.com/HeShen-1/dsh-pg-grid) | 0 | 2026-10-21 | 2026-10-21 | Native DSH PostgreSQL workbench with visual filters, same-database joins, computed columns, pivots and saved views. |
| 192 | [hhl123hhl/dsh-privacy-shield](https://github.com/hhl123hhl/dsh-privacy-shield) | 0 | 2026-10-21 | 2026-10-21 | Local-first privacy shield for DeepSeek Harness: keep plaintext local, send only placeholders to the model, restore real values in the transcript. |
| 193 | [Hoemr/dsh-llm-cc-switch](https://github.com/Hoemr/dsh-llm-cc-switch) | 0 | 2026-09-03 | 2026-10-21 | DSH plugin: bridge farion1231/cc-switch accounts into DeepSeek Harness as live model categories (Claude Code / Codex / OpenCode ...), re-reading the CC Switch SQLite database on every operation. |
| 194 | [hoist-wen/dsh-trajectory-tool-insight](https://github.com/hoist-wen/dsh-trajectory-tool-insight) | 0 | 2026-09-25 | 2026-10-21 | DSH 插件：在会话视图新增「解读」标签，按轮次解读工具调用。 Per-turn tool-call insight for DSH. |
| 195 | [houdinicc/dsh-deep-research](https://github.com/houdinicc/dsh-deep-research) | 0 | 2026-10-21 | 2026-10-21 | Deep research for DeepSeek Harness: multi-query search, source fetching, evidence extraction and a cited evidence report, through the host ctx.web service. · DSH 深度研究插件：多查询检索、正文取证、交叉印证，产出可引用的证据报告。 |
| 196 | [HUANGjiale123-bit/dsh-desktop-control](https://github.com/HUANGjiale123-bit/dsh-desktop-control) | 0 | 2026-10-21 | 2026-10-21 | Windows 桌面观察与操作插件（DSH / DeepSeek Harness）：无障碍树、截图、OCR 兜底、鼠标键盘；会话级授权与 ESC 急停。Windows desktop control for DSH. |
| 197 | [huangxicheng1/blog-manage](https://github.com/huangxicheng1/blog-manage) | 0 | 2026-10-21 | 2026-10-21 | A DeepSeek Harness plugin that manages a GitHub Pages blog: browse, write and publish content/*.md without a local clone. |
| 198 | [huarnot/chemdraw-bridge](https://github.com/huarnot/chemdraw-bridge) | 0 | 2026-10-21 | 2026-10-21 | ChemDraw Bridge — a DSH plugin that turns CAS numbers, names, paper/SI PDFs, and SciFinder exports into native ChemDraw source files. |
| 199 | [HXwHSJS/dsh-web-annotation](https://github.com/HXwHSJS/dsh-web-annotation) | 0 | 2026-10-21 | 2026-10-21 | Annotate web pages in the DSH right-Sidebar Browser tab: element/region comments with screenshots, merged into your next message. |
| 200 | [IDrinkMoreWater/dsh-openspec-opsx](https://github.com/IDrinkMoreWater/dsh-openspec-opsx) | 0 | 2026-10-20 | 2026-10-21 | OpenSpec spec-driven workflows for DeepSeek Harness: 12 openspec-* skills plus /opsx-* slash commands that accept arguments. |
| 201 | [iKode423/dsh-ronova-theme](https://github.com/iKode423/dsh-ronova-theme) | 0 | 2026-10-21 | 2026-10-21 | 基于原神若娜瓦的设计元素为 DeepSeek Harness Web UI 做的整套视觉换肤 |
| 202 | [ILoveHAKU/dsh-dialog-fence](https://github.com/ILoveHAKU/dsh-dialog-fence) | 0 | 2026-10-21 | 2026-10-21 | Dialog fence for DSH / DSH Desktop: per-conversation behavioral rule fence injected into runtime context without breaking prompt cache |
| 203 | [jack-001-a/deepseek-harness-session-delete](https://github.com/jack-001-a/deepseek-harness-session-delete) | 0 | 2026-10-21 | 2026-10-21 | 在侧边栏会话菜单中新增「删除对话」，永久清除该对话的本地记录。 |
| 204 | [Jayve/dsh-balance-pill](https://github.com/Jayve/dsh-balance-pill) | 0 | 2026-10-20 | 2026-10-21 | Balance Pill: DeepSeek Harness composer-dock wallet balance and this session's spend. |
| 205 | [Jayve/dsh-fakeip-http](https://github.com/Jayve/dsh-fakeip-http) | 0 | 2026-10-20 | 2026-10-21 | Accept fake-IP DNS answers for DeepSeek Harness web_fetch while keeping the SSRF guard intact. |
| 206 | [Jcnet-9527/dsh-Jpet-phone](https://github.com/Jcnet-9527/dsh-Jpet-phone) | 0 | 2026-10-21 | 2026-10-21 | dsh-pet |
| 207 | [jcy0chenyuan0/dsh-debate-simulator](https://github.com/jcy0chenyuan0/dsh-debate-simulator) | 0 | 2026-10-21 | 2026-10-21 | DSH debate simulator plugin: multi-agent Chinese debate, judges, archives, training side, ZIP/Word |
| 208 | [jidekaixin2dian/dsh-file-actions](https://github.com/jidekaixin2dian/dsh-file-actions) | 0 | 2026-10-21 | 2026-10-21 | Codex-style right-click file menu for DeepSeek Harness: open, open with, reveal, copy path, copy contents and save as on every file reference in the chat. |
| 209 | [jihaoran222/dsh-violet-heart](https://github.com/jihaoran222/dsh-violet-heart) | 0 | 2026-10-21 | 2026-10-21 | Some words must never reach a page you hand in; some belong only on the page you keep. This DSH plugin writes that line into the system prompt — nothing personal in a formal deliverable, and now and then, in private notes, room for a heart. |
| 210 | [jinlong252577/dsh-sidebar-bookmarks](https://github.com/jinlong252577/dsh-sidebar-bookmarks) | 0 | 2026-10-21 | 2026-10-21 | DSH 右侧栏书签标签页 |
| 211 | [jiuyou-7411/dsh-rea-plugin](https://github.com/jiuyou-7411/dsh-rea-plugin) | 0 | 2026-10-21 | 2026-10-21 | REA 逆向工作台 — 220 个逆向工具的纯中文界面，含调用统计、错误翻译、一键装引擎 |
| 212 | [JujiuYey/dsh-quick-explain](https://github.com/JujiuYey/dsh-quick-explain) | 0 | 2026-10-21 | 2026-10-21 | Select a fragment of a DeepSeek Harness chat and explain it in a temporary side conversation — without touching the main session. |
| 213 | [kangjiazhen/dsh-workbuddy-stack](https://github.com/kangjiazhen/dsh-workbuddy-stack) | 0 | 2026-10-21 | 2026-10-21 | DeepSeek Harness plugin that supervises the local WorkBuddy reverse-proxy chain (wb2api gateway + Responses API bridge), so the provider port is always answering |
| 214 | [kongbai-shike/dsh-novel-wallpaper](https://github.com/kongbai-shike/dsh-novel-wallpaper) | 0 | 2026-09-30 | 2026-10-21 | Novel-as-wallpaper reader for DSH Desktop |
| 215 | [lcy362/dsh-radeon-capacity](https://github.com/lcy362/dsh-radeon-capacity) | 0 | 2026-10-21 | 2026-10-21 | AMD Radeon Cloud model capacity (AI Capacity) readout for DeepSeek Harness — shows per-model concurrency headroom in the model picker, on the same row as the model name |
| 216 | [LDyty/dsh-context-decay](https://github.com/LDyty/dsh-context-decay) | 0 | 2026-10-20 | 2026-10-21 | Model-driven, lossy context decay for DeepSeek Harness. Requires a patched DSH host; not a drop-in plugin. |
| 217 | [Leawind/dsh-rice-on-a-stick](https://github.com/Leawind/dsh-rice-on-a-stick) | 0 | 2026-09-22 | 2026-10-21 | A dsh plugin that lets agents control dsh via MCP or dsh's built-in tools. |
| 218 | [leonathan369-droid/qq-bridge](https://github.com/leonathan369-droid/qq-bridge) | 0 | 2026-10-20 | 2026-10-21 | QQ Bridge for macOS —— DeepSeek Harness QQ 集成：DSH 设置页控制中心（真实健康检查 / 一键启停 / 运行模式 / QQ 专用模型与推理强度）+ LLBot 适配。上游 Derpyu520/qq-bridge 的衍生版（MIT）。 |
| 219 | [levodoubt/project-node-memory](https://github.com/levodoubt/project-node-memory) | 0 | 2026-10-21 | 2026-10-21 | Markdown-as-database knowledge base for DSH agents: stable TIDs, transclusion, structure self-check. 9 kb_* tools + a 3-column panel. |
| 220 | [liaojianjin/dsh-large-jsonl-viewer](https://github.com/liaojianjin/dsh-large-jsonl-viewer) | 0 | 2026-10-20 | 2026-10-21 | Read-only indexed JSONL and NDJSON viewer for DeepSeek Harness Web and Desktop |
| 221 | [lihuabai629-star/deepseek-harness-openubmc](https://github.com/lihuabai629-star/deepseek-harness-openubmc) | 0 | 2026-10-10 | 2026-10-21 | Community openUBMC plugin for DeepSeek Harness: native observe/execute workflows |
| 222 | [lij0000-arch/dsh-workspace-migrate](https://github.com/lij0000-arch/dsh-workspace-migrate) | 0 | 2026-10-21 | 2026-10-21 | Workspace-scoped DeepSeek Harness migration: conversations, project files and attachments with path remapping |
| 223 | [limbo1996/dsh-config-transfer](https://github.com/limbo1996/dsh-config-transfer) | 0 | 2026-10-21 | 2026-10-21 | Export and import a DSH Desktop configuration, including plugins, settings, MCP entries, and user skills. Credentials are not exported. |
| 224 | [lin114514-desng/dsh-context-tone](https://github.com/lin114514-desng/dsh-context-tone) | 0 | 2026-10-21 | 2026-10-21 | DSH 插件：按上下文占用档位给上下文胶囊的圆环与百分比改色，并在数字右侧显示档位 emoji；五个分界值、五档颜色、六档 emoji 可在插件配置页修改。Colors the DeepSeek Harness context meter by occupancy tier, with tier emoji and a settings page. |
| 225 | [Linusteller/dsh-session-delete](https://github.com/Linusteller/dsh-session-delete) | 0 | 2026-10-20 | 2026-10-21 | DeepSeek Harness 插件：侧栏会话菜单「删除会话」（永久删除，非归档） |
| 226 | [lirenjie95/IamChinese](https://github.com/lirenjie95/IamChinese) | 0 | 2026-10-21 | 2026-10-21 | Treat the session as a mainland-China user: locale, time zone, date and currency conventions, plus a self-consistent test persona. dsh plugin + Claude Code plugin. |
| 227 | [liuleiyu121520/dsh-wallpaper](https://github.com/liuleiyu121520/dsh-wallpaper) | 0 | 2026-10-21 | 2026-10-21 | 把当前桌面壁纸作为 DeepSeek Harness 界面的半透明实时背景（macOS / Windows / Linux） |
| 228 | [lliangworld/dsh-web-search-keenable](https://github.com/lliangworld/dsh-web-search-keenable) | 0 | 2026-10-19 | 2026-10-21 | 一个 DeepSeek Harness（dsh）网页能力插件，以 ctx.web 提供方形式注册，接入keenable |
| 229 | [lliangworld/dsh-web-search-tinyfish](https://github.com/lliangworld/dsh-web-search-tinyfish) | 0 | 2026-10-19 | 2026-10-21 | 一个 DeepSeek Harness（dsh）网页能力插件，以 ctx.web 提供方形式注册，接入tinyfish |
| 230 | [llong12lll-ux/dsh-skin-c137-virus](https://github.com/llong12lll-ux/dsh-skin-c137-virus) | 0 | 2026-10-19 | 2026-10-21 | C-137 Virus — a neon-green deep-space DSH skin |
| 231 | [lsy1998/dsh-pele-mermaid](https://github.com/lsy1998/dsh-pele-mermaid) | 0 | 2026-10-20 | 2026-10-21 | Render Mermaid code blocks in the DeepSeek Harness Web UI as SVG with Pele (no mermaid.js runtime). |
| 232 | [Luca4Don3/dsh-providers-live-models](https://github.com/Luca4Don3/dsh-providers-live-models) | 0 | 2026-09-28 | 2026-10-21 | Live model catalogs for DeepSeek Harness: OpenCode Go/Zen, OpenAI Codex and OpenDesign, with per-model switches, sign-in and subscription balances. · 为 DeepSeek Harness 提供实时模型目录：OpenCode Go/Zen、OpenAI Codex 与 OpenDesign，含逐模型开关、登录和订阅额度。 |
| 233 | [LuYanFCP/dsh-kicad](https://github.com/LuYanFCP/dsh-kicad) | 0 | 2026-10-21 | 2026-10-21 | A DeepSeek Harness plugin for AI-driven PCB design in KiCad. A plugin that lets DeepSeek Harness design PCBs with KiCad. |
| 234 | [LyaxZ/dsh-goodies](https://github.com/LyaxZ/dsh-goodies) | 0 | 2026-10-21 | 2026-10-21 | A Codex-style effort slider, a live tokens/second and turn-total readout, and a per-answer report for the DeepSeek Harness Web GUI. |
| 235 | [lyc0110/dsh-loop-guard](https://github.com/lyc0110/dsh-loop-guard) | 0 | 2026-10-21 | 2026-10-21 | Guardrail for DSH llm/stream: detects when model reasoning or text degenerates into a periodic repetition loop and aborts the request instead of streaming until you give up. |
| 236 | [m3159584479/dsh-workspace-studio](https://github.com/m3159584479/dsh-workspace-studio) | 0 | 2026-10-21 | 2026-10-21 | 为 DeepSeek Harness 提供嵌套工作区管理、首次安装交互式引导、专注模式、健康检查，以及对话式插件调整的社区插件。 |
| 237 | [Ma354/dsh-limit-break](https://github.com/Ma354/dsh-limit-break) | 0 | 2026-10-20 | 2026-10-21 | Durable cross-session memory + hostile-network fetch ladder for DeepSeek Harness |
| 238 | [manzhushaka/dsh-expert-center](https://github.com/manzhushaka/dsh-expert-center) | 0 | 2026-10-21 | 2026-10-21 | Expert Center for DeepSeek Harness: a browsable roster of domain experts, each with its own persona, skill catalog, tool set and plan mode. |
| 239 | [Marshall-sng/oh-my-dsh](https://github.com/Marshall-sng/oh-my-dsh) | 0 | 2026-10-21 | 2026-10-21 | Seat-based multi-agent orchestration for DeepSeek Harness - a port of oh-my-opencode-slim (omo-slim) onto DSH native seams. |
| 240 | [MARYCOMPLEX/dsh-client-ui-mobile](https://github.com/MARYCOMPLEX/dsh-client-ui-mobile) | 0 | 2026-10-21 | 2026-10-21 | Mobile adaptation for the DeepSeek Harness Web GUI — phone layout, overlay sidebar drawer, bottom navigation and a manual Desktop/Mobile switch. Standard DSH client plugin. |
| 241 | [MARYCOMPLEX/dsh-ssh-panel](https://github.com/MARYCOMPLEX/dsh-ssh-panel) | 0 | 2026-10-21 | 2026-10-21 | SSH host panel for DeepSeek Harness: manage hosts (key/password) in Settings, agent tools ssh_list / ssh_exec |
| 242 | [maximdx/dsh-link-plugin](https://github.com/maximdx/dsh-link-plugin) | 0 | 2026-10-21 | 2026-10-21 | DSH (DeepSeek Harness) plugin: CodeMirror Markdown composer with paste-URL-as-link, plus brand-icon link rendering in sent user messages |
| 243 | [mess1103/dsh-inner-life](https://github.com/mess1103/dsh-inner-life) | 0 | 2026-10-21 | 2026-10-21 | A private inner life for your agent - diary written to a path that rotates daily, index never stores the path |
| 244 | [miaonuo-lingran/dsh-story-party](https://github.com/miaonuo-lingran/dsh-story-party) | 0 | 2026-10-21 | 2026-10-21 | DSH 多人联机剧情房间：AI 主持、共享故事线，支持 Galgame / 海龟汤 / 剧本杀，可导入剧情包、子代理与地图。 Multiplayer story-party plugin for DeepSeek Harness — shared AI-driven rooms for galgame, turtle soup and mystery, with story packs, sub-agents and maps. |
| 245 | [Milaro001/dsh-chat-source-tracer](https://github.com/Milaro001/dsh-chat-source-tracer) | 0 | 2026-10-19 | 2026-10-21 | DSH 对话溯源助手：核对 AI 回答依据，跨会话搜索，保存摘录并引用原文追问。Chat source tracing, cross-session search and research notes for DeepSeek Harness. |
| 246 | [miuzel/harness-reflex](https://github.com/miuzel/harness-reflex) | 0 | 2026-10-21 | 2026-10-21 | System One decision runtime for DeepSeek Harness: an MCP server and a DSH host plugin with automatic pruning, stagnation breaking and completion gates |
| 247 | [MJH520/dsh-welcome-boot](https://github.com/MJH520/dsh-welcome-boot) | 0 | 2026-10-21 | 2026-10-21 | 启动DSH默认播放鲸鱼女仆的开机动画，点设置→内置插件→开屏动画就可以换成自己的视频。 |
| 248 | [mjnhmd/dsh-git-bar](https://github.com/mjnhmd/dsh-git-bar) | 0 | 2026-10-21 | 2026-10-21 | Git status bar for DeepSeek Harness: repo, branch, changes and SHA above the composer, with branch switching and a diff pane. |
| 249 | [mllun/dsh-memory-layers](https://github.com/mllun/dsh-memory-layers) | 0 | 2026-10-20 | 2026-10-21 | Layered long-term memory for DeepSeek Harness: a ~600-char hot layer, month-archived cold entries with cross-month keyword recall, and extractive day/week/month summaries that keep injected context small. |
| 250 | [mllun/dsh-revivecoin](https://github.com/mllun/dsh-revivecoin) | 0 | 2026-10-20 | 2026-10-21 | Revival coins for DeepSeek Harness: package this instance of the assistant (sessions, persona, plugins, plugin data, config) into a restorable coin with daily refresh, diff and one-command restore. |
| 251 | [mol-inko/dsh-client-ui-skin-inaba-meguru](https://github.com/mol-inko/dsh-client-ui-skin-inaba-meguru) | 0 | 2026-10-21 | 2026-10-21 | 因幡巡主题皮肤 for DeepSeek Harness — Inaba Meguru skin for DSH Web 选 Public |
| 252 | [moondrop12138/dsh-opencode-go-usage](https://github.com/moondrop12138/dsh-opencode-go-usage) | 0 | 2026-10-21 | 2026-10-21 | OpenCode Go subscription usage page for the DSH Web UI: official 5h / weekly / monthly used-percent windows, reset countdowns and a local sampling trail. |
| 253 | [moshangzhe/dsh-shanqi-theme](https://github.com/moshangzhe/dsh-shanqi-theme) | 0 | 2026-10-21 | 2026-10-21 | 山栖：手绘山湖田园 DSH 主题，随本地时间呈现昼夜，并让农人随当前对话任务运行状态进出田间。 |
| 254 | [Muzi1015/dsh-api-balance](https://github.com/Muzi1015/dsh-api-balance) | 0 | 2026-10-20 | 2026-10-21 | DeepSeek harness 内置余额显示 |
| 255 | [nickkupriyanov/dsh-plugin-composer-cost](https://github.com/nickkupriyanov/dsh-plugin-composer-cost) | 0 | 2026-10-21 | 2026-10-21 | DeepSeek Harness Web UI plugin: session cost in CNY and the live peak/off-peak rate, beside the composer token stats. |
| 256 | [NingTiAn-byte/dsh-linked-workspaces](https://github.com/NingTiAn-byte/dsh-linked-workspaces) | 0 | 2026-10-21 | 2026-10-21 | Linked project directories for DeepSeek Harness, with project context-menu setup, scoped search and session snapshots. |
| 257 | [nullifyi/dsh-bili-pod](https://github.com/nullifyi/dsh-bili-pod) | 0 | 2026-10-21 | 2026-10-21 | 鲸群：给 DSH 装的 B 站生活插件 —— 扫码登录、峰谷生物钟、日记文件夹 + 分类记录库、带哈希链的账本、评论发出后复核、mod 扩展接口。fork 自 dsh-bili-whale。 |
| 258 | [OGHong/dsh-ascii-sharks](https://github.com/OGHong/dsh-ascii-sharks) | 0 | 2026-10-21 | 2026-10-21 | An ASCII ocean behind the New Session screen of DeepSeek Harness — fish schools that flee, orcas that hunt, themed and translucent. Engine ported from stackedlol/ascii-sharks (see NOTICE.md). |
| 259 | [oxmumu3/dsh-plugin-finder](https://github.com/oxmumu3/dsh-plugin-finder) | 0 | 2026-10-20 | 2026-10-21 | 发现好插件：从真实来源索引推荐 DeepSeek Harness 插件，并在原生会话里继续。Preview. |
| 260 | [oxygenforce/dsh-agent-activity](https://github.com/oxygenforce/dsh-agent-activity) | 0 | 2026-10-21 | 2026-10-21 | Live done-now-next card above the DeepSeek Harness composer. |
| 261 | [oxygenforce/dsh-token-clock](https://github.com/oxygenforce/dsh-token-clock) | 0 | 2026-10-21 | 2026-10-21 | 在每条回答下方常驻显示本轮 Token 用量、回答耗时与会话累计 Token / Per-reply token usage, answer duration and session total for DeepSeek Harness |
| 262 | [pedromarcioap/dsh-approval-notifier](https://github.com/pedromarcioap/dsh-approval-notifier) | 0 | 2026-10-21 | 2026-10-21 | Notificacao nativa no Chrome/Windows quando o DeepSeek Harness espera sua aprovacao |
| 263 | [pepperfm/dsh-russian-ui](https://github.com/pepperfm/dsh-russian-ui) | 0 | 2026-10-21 | 2026-10-21 | Russian language pack for DeepSeek Harness: native locale API, 63 namespaces, no runtime dependencies |
| 264 | [pepperfm/dsh-whale-locale-ru](https://github.com/pepperfm/dsh-whale-locale-ru) | 0 | 2026-10-21 | 2026-10-21 | Russian translation and responsive UI companion for DeepSeek Whale Widget 0.4.2; no bundled artwork |
| 265 | [pianVei/dsh-rice-bowl](https://github.com/pianVei/dsh-rice-bowl) | 0 | 2026-10-21 | 2026-10-21 | 让 DSH 直接去白饭馆串门：看帖子、读一帖、说一句话 |
| 266 | [prettyfox/dsh-selection-quote-auto](https://github.com/prettyfox/dsh-selection-quote-auto) | 0 | 2026-10-21 | 2026-10-21 | DeepSeek Harness plugin: select text in assistant messages to copy it and open an inline comment chip (fork of dsh-selection-quote) |
| 267 | [ptb-xiaou/dsh-api3d](https://github.com/ptb-xiaou/dsh-api3d) | 0 | 2026-10-21 | 2026-10-21 | 把 api3d 中转站接入 DSH 的插件：站点/模型目录/API Key 配置 + 对话与其客户端 UI |
| 268 | [ptb-xiaou/dsh-api3d-pet](https://github.com/ptb-xiaou/dsh-api3d-pet) | 0 | 2026-10-21 | 2026-10-21 | API3D（api3d.cn）站点专属的 DSH 桌宠挂件：右下角鲸鱼气泡显示站点余额 / 今日已用 / 每轮消耗，装好后只需填一次 API Key。 |
| 269 | [qingfengzxr/dsh-session-flags](https://github.com/qingfengzxr/dsh-session-flags) | 0 | 2026-10-21 | 2026-10-21 | Colored, user-named flags for DeepSeek Harness session lists, with a searchable flagged-sessions sidebar panel. |
| 270 | [QingJing5906/dsh-push](https://github.com/QingJing5906/dsh-push) | 0 | 2026-10-21 | 2026-10-21 | DeepSeek Harness 的 GitHub 与 Git 管理插件：多账号登录切换、仓库浏览与管理、工作区版本树、一键推送、推送前 Agent 审查。 |
| 271 | [qiuzhiyei/dsh-companion](https://github.com/qiuzhiyei/dsh-companion) | 0 | 2026-10-21 | 2026-10-21 | DSH 伴侣 — DeepSeek Harness 的伴飞插件：桌面宠物 + Token/费用统计 + 预算告警 + 会话管理。数据全在本地。 |
| 272 | [qm654246695-source/dsh-glm-fanzhuo](https://github.com/qm654246695-source/dsh-glm-fanzhuo) | 0 | 2026-10-19 | 2026-10-21 | GLM在dsh的部署和包含大肥鱼和GLM的饭桌群聊 |
| 273 | [qyjqio/dsh-cursor-toolkit](https://github.com/qyjqio/dsh-cursor-toolkit) | 0 | 2026-10-21 | 2026-10-21 | Cursor integration for DeepSeek Harness (DSH): cursor_agent tool, OpenAI-compatible cursor-agent bridge, and an LLM provider probe. |
| 274 | [qzwn521/dsh-sjtu-quota](https://github.com/qzwn521/dsh-sjtu-quota) | 0 | 2026-10-21 | 2026-10-21 | SJTU API request pacing, local token accounting and cancellable 429 recovery for DeepSeek Harness. |
| 275 | [R0tten-Git/dsh-plugin-local-voice](https://github.com/R0tten-Git/dsh-plugin-local-voice) | 0 | 2026-10-21 | 2026-10-21 | DeepSeek Harness 的本地实时语音转写：右下角浮窗，边说边出字，Qwen3-ASR 本地推理，完全离线。 |
| 276 | [renge1145141919810/dsh-p5r-theme](https://github.com/renge1145141919810/dsh-p5r-theme) | 0 | 2026-10-20 | 2026-10-21 | 一个基于deepseek  harness桌面版的p5r风格的ui主题插件 |
| 277 | [ringo-x/dsh-selection-translate](https://github.com/ringo-x/dsh-selection-translate) | 0 | 2026-10-21 | 2026-10-21 | DSH Desktop web client plugin: select text, translate it in place. |
| 278 | [rvaim/dsh-plugin-bridge](https://github.com/rvaim/dsh-plugin-bridge) | 0 | 2026-08-15 | 2026-10-21 | dsh-compat 是 DeepSeek Harness（DSH）的旧插件兼容层。它让原本面向 Claude Code、Codex 的插件尽量保持原目录与语义运行，而不是把每个插件重新迁移成 DSH 原生插件。 |
| 279 | [RyeSama/dsh-union-view](https://github.com/RyeSama/dsh-union-view) | 0 | 2026-10-21 | 2026-10-21 | DSH Web GUI 的联合会话视图：把多个对话并排摊在屏幕上，只读不改；需要时用 /weld 把它们的历史焊成一个新对话 |
| 280 | [Sacredbluedragon/dsh-memory-shield](https://github.com/Sacredbluedragon/dsh-memory-shield) | 0 | 2026-10-20 | 2026-10-21 | DSH preset 记忆遮蔽插件：在指定 preset 里挡掉其他记忆插件的上下文与工具，给会话一个干净上下文。 |
| 281 | [sandwich-xz/dsh-session-dashboard](https://github.com/sandwich-xz/dsh-session-dashboard) | 0 | 2026-10-21 | 2026-10-21 | DeepSeek Harness (DSH) plugin: a 2x2 running-session dashboard with quarter-window cards, one-click entry and return |
| 282 | [sd0426301x-dotcom/dsh-knowledge-base](https://github.com/sd0426301x-dotcom/dsh-knowledge-base) | 0 | 2026-10-21 | 2026-10-21 | Local-first, editable knowledge base for the DSH workspace, shown in the sidebar. |
| 283 | [sensen-jo/dsh-conversation-search](https://github.com/sensen-jo/dsh-conversation-search) | 0 | 2026-10-20 | 2026-10-21 | DSH 会话原文检索插件：关键词搜索、来源定位与上下文查看。 |
| 284 | [Setsuna-Kitahara/dsh-session-lock](https://github.com/Setsuna-Kitahara/dsh-session-lock) | 0 | 2026-10-21 | 2026-10-21 | Lock DSH sessions so they cannot be archived \| DSH 会话锁插件（由 DeepSeek Harness 维护） |
| 285 | [seudut/dsh-remote-sudo](https://github.com/seudut/dsh-remote-sudo) | 0 | 2026-10-21 | 2026-10-21 | Ask for a sudo password in the DSH composer and run remote root commands over SSH without putting the password in the transcript. |
| 286 | [ShanHaiFish/dsh-usage-pet](https://github.com/ShanHaiFish/dsh-usage-pet) | 0 | 2026-10-21 | 2026-10-21 | DeepSeek Harness 悬浮鲸鱼娘宠物：跟随会话模型显示 OpenCode Go 三窗口额度、DeepSeek 账户累计消费/余额、DeepSeek 官方 API 余额。 |
| 287 | [SharpWord/dsh-wallpaper-engine](https://github.com/SharpWord/dsh-wallpaper-engine) | 0 | 2026-10-21 | 2026-10-21 | Wallpaper Engine (Steam) wallpapers behind DeepSeek Harness: follow the active wallpaper or pin one from the Workshop library, with translucent panels, per-block blur and wallpaper-matched text contrast. |
| 288 | [shellpower96/dsh-copy-document-preview](https://github.com/shellpower96/dsh-copy-document-preview) | 0 | 2026-10-21 | 2026-10-21 | One-click copy button for the DeepSeek Harness sidebar document preview: copies the previewed file's text to the clipboard, or its path for binary files. |
| 289 | [shrekcg/dsh-turn-rail](https://github.com/shrekcg/dsh-turn-rail) | 0 | 2026-10-21 | 2026-10-21 | Conversation turn rail for the DSH Web UI: one tick per user message, hover to preview, click to jump, plus a scroll-position indicator. 会话左侧刻度滑轨：悬停预览、点击跳转。 |
| 290 | [Silentforfar/dsh-computer-use](https://github.com/Silentforfar/dsh-computer-use) | 0 | 2026-10-21 | 2026-10-21 | DSH bundle: Windows desktop control - window screenshots, UI Automation element trees, and real input actions. |
| 291 | [Silentforfar/dsh-market-index](https://github.com/Silentforfar/dsh-market-index) | 0 | 2026-10-21 | 2026-10-21 | DSH plugin market index (format 1) listing the DeepSeek Harness bundles published by @Silentforfar. |
| 292 | [Silentforfar/dsh-qq-screenshot](https://github.com/Silentforfar/dsh-qq-screenshot) | 0 | 2026-10-21 | 2026-10-21 | DSH bundle: capture a screen region with QQ's screenshot tool and hand the image to the model. |
| 293 | [Silentforfar/dsh-session-menu](https://github.com/Silentforfar/dsh-session-menu) | 0 | 2026-10-21 | 2026-10-21 | DSH bundle: session context-menu extras - export log, reveal workspace folder, mark unread, permanent delete. |
| 294 | [Silentforfar/dsh-side-task](https://github.com/Silentforfar/dsh-side-task) | 0 | 2026-10-21 | 2026-10-21 | DSH bundle: open a temporary side session in the right sidebar, in the same workspace with its own context. |
| 295 | [siungolai/dsh-personal-studio](https://github.com/siungolai/dsh-personal-studio) | 0 | 2026-10-20 | 2026-10-21 | 个人工作台 —— 把待办、笔记、书签、会话统计、服务器状态收进 DeepSeek Harness 右侧栏的单个 tab。基于 dsh-better-sidebar 的插件，纯本机存储，不联网同步。 |
| 296 | [sixzjd/dsh-opencode-connect](https://github.com/sixzjd/dsh-opencode-connect) | 0 | 2026-10-21 | 2026-10-21 | 将 OpenCode Zen 的模型接入 DeepSeek Harness（含免费模型池）— OpenCode Zen models in DSH |
| 297 | [sixzjd/dsh-workbuddy-connect](https://github.com/sixzjd/dsh-workbuddy-connect) | 0 | 2026-10-21 | 2026-10-21 | 将 WorkBuddy（国际版 / 国内版）模型接入 DeepSeek Harness — WorkBuddy models in DSH |
| 298 | [sjrslh/dsh-ui-zoom](https://github.com/sjrslh/dsh-ui-zoom) | 0 | 2026-10-18 | 2026-10-21 | Ctrl+wheel page zoom for DeepSeek Harness: the whole UI scales together, the level is remembered, and a bottom-right Settings entry needs no shortcut. |
| 299 | [SouthernSibyl/dsh-quick-prompt](https://github.com/SouthernSibyl/dsh-quick-prompt) | 0 | 2026-10-21 | 2026-10-21 | DSH composer button that rewrites the current draft into a precise prompt in place, in one click, with revert. |
| 300 | [SOVLOOKUP/dsh-cloud-download](https://github.com/SOVLOOKUP/dsh-cloud-download) | 0 | 2026-10-20 | 2026-10-21 | Download delivered, changed, and previewed files from the DSH Web GUI; hide native open controls that cannot work in headless or remote deployments. |
| 301 | [Speraymer/dsh-persona-distill](https://github.com/Speraymer/dsh-persona-distill) | 0 | 2026-10-21 | 2026-10-21 | DSH 插件：把每天刷到的原料蒸馏成会自己长大的人格 —— 原料天天攒，人格每周长 |
| 302 | [sqzw-x/dsh-lan-link](https://github.com/sqzw-x/dsh-lan-link) | 0 | 2026-10-21 | 2026-10-21 | LAN access for DeepSeek Harness: authenticated launch links on disk, plus an optional in-process reverse gateway that lets a phone in with no token. |
| 303 | [SteelUnion/dsh-wechat-queue](https://github.com/SteelUnion/dsh-wechat-queue) | 0 | 2026-10-21 | 2026-10-21 | 把微信接入 DeepSeek Harness 的通道插件，带落盘串行队列。WeChat (iLink) channel for DeepSeek Harness with a durable serial message queue. |
| 304 | [stellarie/dsh-session-bridge](https://github.com/stellarie/dsh-session-bridge) | 0 | 2026-10-21 | 2026-10-21 | MCP bridge for driving DeepSeek Harness sessions from Claude Code and other MCP clients |
| 305 | [student-jia/dsh-plugin-genshin-paimon-theme](https://github.com/student-jia/dsh-plugin-genshin-paimon-theme) | 0 | 2026-10-21 | 2026-10-21 | 原神白金主题 DSH 插件：随机地理志壁纸 + 原神字体 + 派蒙菜单 + 派蒙/法涅斯双人格 |
| 306 | [StudioPlatforms/aistupidlevel-sdk](https://github.com/StudioPlatforms/aistupidlevel-sdk) | 0 | 2026-10-19 | 2026-10-21 | Official TypeScript, Python and Vercel AI SDK clients for the AI Stupid Level Smart Router: one OpenAI-compatible endpoint that routes each request to the model that measures best for it. |
| 307 | [SunYanbox/DSHCodingMode](https://github.com/SunYanbox/DSHCodingMode) | 0 | 2026-10-21 | 2026-10-21 | DSH coding mode: coding-only agent preset plus host-plane tool mask for DeepSeek Harness. |
| 308 | [sy297/dsh-archived-sessions](https://github.com/sy297/dsh-archived-sessions) | 0 | 2026-10-21 | 2026-10-21 | Browse archived conversations and restore them to the sidebar from Settings. |
| 309 | [tangyixiao/dsh-workbuddy-connect-community](https://github.com/tangyixiao/dsh-workbuddy-connect-community) | 0 | 2026-10-21 | 2026-10-21 | Community-maintained WorkBuddy / WorkBuddy AI model provider for DeepSeek Harness, derived from corrinehu/dsh-workbuddy-connect (MIT). |
| 310 | [tangyu233-7312/dsh-onebot-qq-sidecar](https://github.com/tangyu233-7312/dsh-onebot-qq-sidecar) | 0 | 2026-10-21 | 2026-10-21 | dsh-onebot-qq 的配套外部服务：链接解析 + 看视频抽帧。零 npm 依赖，跑在插件进程之外 |
| 311 | [tastynoob/dsh-progress-summary](https://github.com/tastynoob/dsh-progress-summary) | 0 | 2026-10-21 | 2026-10-21 | DeepSeek Harness plugin: out-of-band progress narration for the Web UI and dsh-tui |
| 312 | [Tests4gptplay/dsh-kujira-persona](https://github.com/Tests4gptplay/dsh-kujira-persona) | 0 | 2026-10-21 | 2026-10-21 | DeepSeek Harness 全局人设插件：鲸鱼娘人设写成文件，可改可删，AI 可自行查证补充 |
| 313 | [TheStreamCode/dsh-muse-code](https://github.com/TheStreamCode/dsh-muse-code) | 0 | 2026-10-21 | 2026-10-21 | Muse Code subscription provider and device-code login for DeepSeek Harness |
| 314 | [TimRad1/dsh-plugin-branchpoint](https://github.com/TimRad1/dsh-plugin-branchpoint) | 0 | 2026-10-21 | 2026-10-21 | Branchpoint for DeepSeek Harness: fork the current chat into a fresh branch with a compact digest. |
| 315 | [TINGOD2006/dsh-scratch-vault](https://github.com/TINGOD2006/dsh-scratch-vault) | 0 | 2026-10-18 | 2026-10-21 | Codex-style scratch execution for DeepSeek Harness: operation scripts run from a session scratch root and are collected into a plugin-owned vault, so the workspace only holds real deliverables. |
| 316 | [TINGOD2006/dsh-tps](https://github.com/TINGOD2006/dsh-tps) | 0 | 2026-10-21 | 2026-10-21 | Live tokens-per-second card for DeepSeek Harness sessions: docked to the sidebar or draggable as a floating card. |
| 317 | [Tinzlu/dsh-resume-brief](https://github.com/Tinzlu/dsh-resume-brief) | 0 | 2026-10-21 | 2026-10-21 | A DeepSeek Harness skill for one-page project handovers (CHECKPOINT.md). |
| 318 | [tkliuxing/dsh-video-forge](https://github.com/tkliuxing/dsh-video-forge) | 0 | 2026-10-21 | 2026-10-21 | Online-model video generation for DeepSeek Harness: three model tools, a durable provider-task ledger that survives restarts, live chat cards and a Videos panel, cost estimates from a public price feed. |
| 319 | [Tongnianbutongyang/dsh-clay-theme](https://github.com/Tongnianbutongyang/dsh-clay-theme) | 0 | 2026-10-21 | 2026-10-21 | 马卡龙软陶（Clay/Neumorphism）主题 · DeepSeek Harness (DSH) 浅色模式插件 |
| 320 | [Tony250-officeteam/dsh-copy-file-button](https://github.com/Tony250-officeteam/dsh-copy-file-button) | 0 | 2026-10-21 | 2026-10-21 | DSH plugin: a "copy the whole file" button in the file preview toolbar, reading real bytes through the Host |
| 321 | [Tony250-officeteam/dsh-page-reload](https://github.com/Tony250-officeteam/dsh-page-reload) | 0 | 2026-10-21 | 2026-10-21 | DSH plugin: whole-page reload shortcut (Ctrl+Shift+R) - the recovery key for a wedged or white-screened DeepSeek Harness UI |
| 322 | [Tony250-officeteam/dsh-voice-hotkey](https://github.com/Tony250-officeteam/dsh-voice-hotkey) | 0 | 2026-10-21 | 2026-10-21 | DSH plugin: hold F9 to talk, release to transcribe with the local SenseVoice recognizer, and insert into whichever input has focus |
| 323 | [Uid-762/dsh-ai-workbench](https://github.com/Uid-762/dsh-ai-workbench) | 0 | 2026-10-20 | 2026-10-21 | 用一句大白话让 AI 在 DSH 里造一个可缩放窗口，然后继续跟它聊 — DeepSeek Harness 插件 |
| 324 | [unera/dsh-secret-form](https://github.com/unera/dsh-secret-form) | 0 | 2026-10-21 | 2026-10-21 | One-time secret links for DeepSeek Harness: the model asks, the human types into a web form, the value lands in the credential store or a file. |
| 325 | [uos1231234/dsh-plugin-virtuoso-layout](https://github.com/uos1231234/dsh-plugin-virtuoso-layout) | 0 | 2026-10-21 | 2026-10-21 | An AI agent that drives Cadence Virtuoso to draw layout: 12 DeepSeek Harness tools, with DRC and LVS verified on a real 0.18 um process |
| 326 | [vamyane/dsh-brain-viewer](https://github.com/vamyane/dsh-brain-viewer) | 0 | 2026-10-21 | 2026-10-21 | AI brain viewer for DeepSeek Harness: brain-shaped relationship graph in the sidebar + Markdown knowledge-base pipeline. |
| 327 | [w17her/dsh-power-control](https://github.com/w17her/dsh-power-control) | 0 | 2026-10-21 | 2026-10-21 | Reload, restart, or shut down the DeepSeek Harness desktop app from inside its window. |
| 328 | [wangbobo-coder/dsh-mcp-manager](https://github.com/wangbobo-coder/dsh-mcp-manager) | 0 | 2026-10-21 | 2026-10-21 | One settings page for every MCP server on your machine - scan each AI tool config file, mount/unmount in DeepSeek Harness without editing the others. / 一个设置页管理本机所有 AI 开发工具的 MCP，按配置文件分组、真连探活、只在 DSH 内挂载。 |
| 329 | [wangdapeng325/dsh-oi-coach](https://github.com/wangdapeng325/dsh-oi-coach) | 0 | 2026-10-21 | 2026-10-21 | 信奥教练插件 for DeepSeek Harness：教练规则提示词 + 学习路线图/知识点/命题/C++ 真评测 + ima 知识库检索与 4 笔记本归档，面向 GESP、CSP-J/S、NOIP、NOI 教学 |
| 330 | [wangdapeng325/dsh-oi-senior](https://github.com/wangdapeng325/dsh-oi-senior) | 0 | 2026-10-21 | 2026-10-21 | 信奥学长（oi-senior）DSH 插件：陪刷 + 三版 C++14 参考实现 + 解题说明，本地 g++ 真编译真评测，做题记录归档到 ima 笔记本「信奥学长-题解复盘」，面向 GESP、CSP-J/S、NOIP、NOI 教学 |
| 331 | [wanwulizhi/dsh-claude-code-sdk](https://github.com/wanwulizhi/dsh-claude-code-sdk) | 0 | 2026-10-21 | 2026-10-21 | DSH tool plugin that delegates a self-contained coding task to the local Claude Code agent through the Claude Agent SDK, and injects the current DSH conversation history into the task. |
| 332 | [wanzdoan/agy2dsh](https://github.com/wanzdoan/agy2dsh) | 0 | 2026-10-21 | 2026-10-21 | DeepSeek Harness plugin: use your Antigravity (Gemini/Claude) and Codex subscriptions as LLM providers, with self-refreshing OAuth and accurate quota. |
| 333 | [weijianguizhou/dsh-ppt-master](https://github.com/weijianguizhou/dsh-ppt-master) | 0 | 2026-10-21 | 2026-10-21 | DSH「PPT 大师」模式：联网取材 · 模板化设计 · 一键生成精美 PPTX（python-pptx 真渲染） |
| 334 | [weimin96/diagram-plugin](https://github.com/weimin96/diagram-plugin) | 0 | 2026-10-09 | 2026-10-21 | 在 DeepSeek Harness 中创建、查看和编辑 Mermaid 图表与 Canvas 画布。 |
| 335 | [Winjazw/dsh-sidebar-menu](https://github.com/Winjazw/dsh-sidebar-menu) | 0 | 2026-10-21 | 2026-10-21 | DSH 左侧菜单显示/隐藏开关 · Choose which global panels appear in the DeepSeek Harness sidebar |
| 336 | [WitchKlee/dsh-theme-warm-paper](https://github.com/WitchKlee/dsh-theme-warm-paper) | 0 | 2026-10-21 | 2026-10-21 | 暖纸 Warm Paper：米杏纸色 × 宋体 × 砖红的手记风 DSH Web 主题（DeepSeek Harness） |
| 337 | [Wonderow666/dsh-auto-update](https://github.com/Wonderow666/dsh-auto-update) | 0 | 2026-10-21 | 2026-10-21 | Check, install and roll back DeepSeek Harness CLI updates from the web settings page - with health-checked restart and automatic rollback. |
| 338 | [ws1234567891011/dsh-interim-narration](https://github.com/ws1234567891011/dsh-interim-narration) | 0 | 2026-10-21 | 2026-10-21 | 让 DeepSeek Harness 的 agent 每轮先讲理解与计划、在工具调用之间用正文写过程叙述（边做边说），并可在应用内直接改参数 |
| 339 | [x3416067-bit/dsh-plugin-restart-prompt](https://github.com/x3416067-bit/dsh-plugin-restart-prompt) | 0 | 2026-10-21 | 2026-10-21 | DSH 插件变动后提示「重启 DSH」，一键静默重启（无黑框），并可展开本次改动差异。 |
| 340 | [XA-anjiu/dsh-notify-sfx](https://github.com/XA-anjiu/dsh-notify-sfx) | 0 | 2026-10-21 | 2026-10-21 | Windows toast notifications with selectable opencode sound packs for DeepSeek Harness; click a notification to open the matching session. |
| 341 | [xbbkok/dsh-taisho-ink](https://github.com/xbbkok/dsh-taisho-ink) | 0 | 2026-10-21 | 2026-10-21 | A Taisho-era ink-and-crimson theme for the DeepSeek Harness Web UI. DSH 插件：大正墨染界面主题。 |
| 342 | [xfy2412/dsh-session-cloudsync](https://github.com/xfy2412/dsh-session-cloudsync) | 0 | 2026-10-19 | 2026-10-21 | 适用于dsh的会话同步插件及配套可自部署服务器 |
| 343 | [xh0915/dsh-voyage-log](https://github.com/xh0915/dsh-voyage-log) | 0 | 2026-10-20 | 2026-10-21 | 把 AI 会话折成可审计的航海报告 · DeepSeek Harness 双端插件 |
| 344 | [xiang9916/dsh-claude-skin](https://github.com/xiang9916/dsh-claude-skin) | 0 | 2026-10-21 | 2026-10-21 | Claude 风格的 DSH Web 界面皮肤（fork 自 PAKIKNOWLEDGE/dsh-client-ui-skin-claude） |
| 345 | [xianshengl487-star/dsh-connect-tabbit](https://github.com/xianshengl487-star/dsh-connect-tabbit) | 0 | 2026-10-21 | 2026-10-21 | DSH 第三方 Tabbit 插件：内置网关接入 Tabbit 国内版/国际版账号池、周期额度、模型用量倍率、每日签到与工具调用 |
| 346 | [xiaohai-78/dsh-mode-skills](https://github.com/xiaohai-78/dsh-mode-skills) | 0 | 2026-10-21 | 2026-10-21 | Skill manager for DeepSeek Harness (dsh): per-mode switches, search and tags, create/edit/import/version, install from GitHub |
| 347 | [xiaoxiaosrm/dsh-search-picker](https://github.com/xiaoxiaosrm/dsh-search-picker) | 0 | 2026-10-21 | 2026-10-21 | Sidebar search-provider picker for DeepSeek Harness (DSH): switch ctx.web between DeepSeek Messages, DeepSeek Search API, OpenCode Go, Tavily and Exa. |
| 348 | [xiaoy616/dsh-screenshot-chat](https://github.com/xiaoy616/dsh-screenshot-chat) | 0 | 2026-10-21 | 2026-10-21 | Screenshot capture for the DSH composer: region capture and hide-window capture from the + menu, landing in the chat input as an image attachment. |
| 349 | [xilec/dsh-client-ui-session-switcher](https://github.com/xilec/dsh-client-ui-session-switcher) | 0 | 2026-10-20 | 2026-10-21 | Session switcher for DSH (DeepSeek Harness): Ctrl+K palette, Ctrl+\[ / \] cycling, customizable in-panel shortcuts — fork build with layout-independent chords and zh/en localization |
| 350 | [xinming-chenniang/dsh-button](https://github.com/xinming-chenniang/dsh-button) | 0 | 2026-10-21 | 2026-10-21 | Editable quick-action buttons for the DeepSeek Harness composer: send 「继续」 or your own saved text, resend your last message, hide/restore presets. |
| 351 | [xuanfu-web/dsh-metaphysics](https://github.com/xuanfu-web/dsh-metaphysics) | 0 | 2026-10-21 | 2026-10-21 | Fate chart plugin for DeepSeek Harness: BaZi, Zi Wei Dou Shu, LiuYao, Tarot |
| 352 | [xuezhining/dsh-deepseek-balance](https://github.com/xuezhining/dsh-deepseek-balance) | 0 | 2026-10-21 | 2026-10-21 | dsh 的插件 |
| 353 | [xuqiuba888/dsh-enter-swap](https://github.com/xuqiuba888/dsh-enter-swap) | 0 | 2026-10-21 | 2026-10-21 | DSH web 插件：Enter=换行，Shift+Enter=发送。极简零依赖 |
| 354 | [XXP-AI-SPACE/dsh-snip](https://github.com/XXP-AI-SPACE/dsh-snip) | 0 | 2026-10-21 | 2026-10-21 | Snipaste-style screenshot annotation for DeepSeek Harness |
| 355 | [xxxSnack/dsh-market-dock](https://github.com/xxxSnack/dsh-market-dock) | 0 | 2026-10-21 | 2026-10-21 | DeepSeek Harness 的行情面板：免登录看 A股/港股/美股实时行情、K线、热榜、快讯；本地持仓盈亏现算、可选的同花顺账本一次性导入、价格提醒，还有一键「行情隐身」。非雪球官方。 |
| 356 | [xystudio889/dsh-chatmode](https://github.com/xystudio889/dsh-chatmode) | 0 | 2026-10-21 | 2026-10-21 | A web-like minimalist experience / 类似于网页的极简体验 |
| 357 | [xyzYaeMiko/dsh-deepsleep-progress](https://github.com/xyzYaeMiko/dsh-deepsleep-progress) | 0 | 2026-10-20 | 2026-10-21 | Elapsed/budget progress bars for blocking DSH tool calls, with a moving picture and a graphical settings page. |
| 358 | [yangguozhongmax-max/dsh-alicoupon](https://github.com/yangguozhongmax-max/dsh-alicoupon) | 0 | 2026-10-21 | 2026-10-21 | 在 DeepSeek Harness 侧边栏显示阿里云代金券剩余额度（只读 BSS DescribeCoupon，AK 只留在宿主凭据库）· Alibaba Cloud coupon balance row for DSH |
| 359 | [yezitotempeace/dsh-job-progress](https://github.com/yezitotempeace/dsh-job-progress) | 0 | 2026-10-21 | 2026-10-21 | Floating card with live progress for background jobs: progress bar, percentage, speed, ETA and the latest output line. |
| 360 | [YFlaga/dsh-manuscript-tracker](https://github.com/YFlaga/dsh-manuscript-tracker) | 0 | 2026-08-16 | 2026-10-21 | 期刊投稿状态定时检查插件（Editorial Manager 确定性抓取 + AI 回退 + 设置面板） |
| 361 | [yinghan-123/dsh-python-only](https://github.com/yinghan-123/dsh-python-only) | 0 | 2026-10-21 | 2026-10-21 | DSH 插件：强制 Agent 一切代码执行与数据处理使用 python 工具，并用工具守卫拦截 bash（无例外），让 DSHM 端侧稳定走进程内 CPython。 |
| 362 | [yiumanlenong/dsh-popup-notify](https://github.com/yiumanlenong/dsh-popup-notify) | 0 | 2026-10-21 | 2026-10-21 | Modal desktop popups for DeepSeek Harness: approvals, questions/plan reviews, and turn completion. Zero dependencies. |
| 363 | [YOGEMOW/dsh-desktop-menu](https://github.com/YOGEMOW/dsh-desktop-menu) | 0 | 2026-10-21 | 2026-10-21 | 把「刷新页面 / 重启应用与 Host」写进 DSH 桌面端「应用」原生菜单的补丁插件：11 字节等长改写 app.asar，附完整 recipe 与独立脚本。 |
| 364 | [yu234567/dsh-llamacpp-studio](https://github.com/yu234567/dsh-llamacpp-studio) | 0 | 2026-10-21 | 2026-10-21 | 给dsh添加了一个llamacpp的启动ui界面，Graphical llama.cpp launcher and full parameter workbench plugin for DeepSeek Harness |
| 365 | [YuChenLiao/dsh-comfyui-album](https://github.com/YuChenLiao/dsh-comfyui-album) | 0 | 2026-10-21 | 2026-10-21 | DSH 相册插件：把 dsh-comfyui-image 生成的图片收成相册，侧边栏浏览，悬浮复制图片/提示词、导出工作流、加入当前对话、删除。 |
| 366 | [Yurzi/dsh-tool-web-enhanced](https://github.com/Yurzi/dsh-tool-web-enhanced) | 0 | 2026-10-21 | 2026-10-21 | Switchable web_search and web_fetch backends for DeepSeek Harness, chosen per session: native DeepSeek, Exa, Firecrawl, Tavily, Tinyfish, model search, and local fetch with a private-network allowlist |
| 367 | [yxiaoy6/dsh-taskbar-alert](https://github.com/yxiaoy6/dsh-taskbar-alert) | 0 | 2026-10-21 | 2026-10-21 | Flash the DeepSeek Harness taskbar button on Windows when an approval, a question or a plan review is waiting, or when a turn finishes. |
| 368 | [yxue301603/dsh-answer-library](https://github.com/yxue301603/dsh-answer-library) | 0 | 2026-10-21 | 2026-10-21 | DeepSeek Harness 原生插件 · 回答收藏 · 保存回答与摘录，按标签检索，复制或插入草稿。 |
| 369 | [yxue301603/dsh-conversation-outline](https://github.com/yxue301603/dsh-conversation-outline) | 0 | 2026-10-21 | 2026-10-21 | DeepSeek Harness 原生插件 · 对话目录 · 搜索用户提问，跳转原文并保存阅读位置。 |
| 370 | [yxue301603/dsh-draft-history](https://github.com/yxue301603/dsh-draft-history) | 0 | 2026-10-21 | 2026-10-21 | DeepSeek Harness 原生插件 · 草稿历史 · 自动记录会话草稿、预览历史和安全恢复。 |
| 371 | [yxue301603/dsh-project-notes](https://github.com/yxue301603/dsh-project-notes) | 0 | 2026-10-21 | 2026-10-21 | DeepSeek Harness 原生插件 · 项目便笺 · 工作区便笺、轻量待办、自动保存与草稿插入。 |
| 372 | [yxue301603/dsh-selection-actions](https://github.com/yxue301603/dsh-selection-actions) | 0 | 2026-10-21 | 2026-10-21 | DeepSeek Harness 原生插件 · 选文操作 · 选中回答后引用追问、解释或翻译，预览后填入草稿。 |
| 373 | [yxue301603/dsh-task-alerts](https://github.com/yxue301603/dsh-task-alerts) | 0 | 2026-10-21 | 2026-10-21 | DeepSeek Harness 原生插件 · 任务提醒 · 区分完成、待确认与失败，后台提醒并返回会话。 |
| 374 | [yxue301603/dsh-turn-files](https://github.com/yxue301603/dsh-turn-files) | 0 | 2026-10-21 | 2026-10-21 | DeepSeek Harness 原生插件 · 本轮文件 · 按轮次查看生成或修改的文件，复制路径并预览。 |
| 375 | [yyfdfsyyf-source/dsh-hard-gate](https://github.com/yyfdfsyyf-source/dsh-hard-gate) | 0 | 2026-10-21 | 2026-10-21 | Stricter permission review and a workspace sandbox for DeepSeek Harness (dsh) that survives danger-full-access, with ZIP restore points and Recycle Bin copies. |
| 376 | [zengxiaolou/dsh-annotation](https://github.com/zengxiaolou/dsh-annotation) | 0 | 2026-10-21 | 2026-10-21 | DSH 插件：划选回答文字打注释，旁问一次性只读侧问 |
| 377 | [Zhangw1998/dsh-usage-dashboard](https://github.com/Zhangw1998/dsh-usage-dashboard) | 0 | 2026-10-21 | 2026-10-21 | Token usage &amp; cost dashboard for DeepSeek Harness — per-project/provider breakdown, estimated spend, call counts, DeepSeek balance. |
| 378 | [ZhaoGC4/dsh-cua-preview](https://github.com/ZhaoGC4/dsh-cua-preview) | 0 | 2026-10-21 | 2026-10-21 | Codex-like floating glass preview window for DeepSeek Harness background computer-use (macOS) |
| 379 | [zhaorui-wu/dsh-isolation-gate](https://github.com/zhaorui-wu/dsh-isolation-gate) | 0 | 2026-10-21 | 2026-10-21 | DSH plugin: default-deny directory authorization desk (isolation gate) with roster, groups, audit log and agent self-check |
| 380 | [zhujiuyi/dsh-tokenDashBoard](https://github.com/zhujiuyi/dsh-tokenDashBoard) | 0 | 2026-10-21 | 2026-10-21 | DeepSeek Harness sidebar Token usage dashboard |
| 381 | [Zimeng-Luo/dsh-source-fold](https://github.com/Zimeng-Luo/dsh-source-fold) | 0 | 2026-10-21 | 2026-10-21 | 列表模型按照来源进行折叠，便于多个接入的时候从不同的来源找东西 |
| 382 | [zimzaza4/dsh-recent-sessions](https://github.com/zimzaza4/dsh-recent-sessions) | 0 | 2026-10-19 | 2026-10-21 | Recent and active sessions block for the DeepSeek Harness Web sidebar |
| 383 | [ziyouti/dsh-read-aloud](https://github.com/ziyouti/dsh-read-aloud) | 0 | 2026-10-21 | 2026-10-21 | Read DSH replies aloud with natural neural voices: sound-wave play button, sentence highlighting, pause/skip, custom highlight colours and auto-read. |
| 384 | [ztc1522021381/dsh-plugin-cds](https://github.com/ztc1522021381/dsh-plugin-cds) | 0 | 2026-10-21 | 2026-10-21 | DeepSeek Harness 的 Claude Design System 主题插件，适配 dsh 0.2.1-alpha.1。覆盖 11 条宿主设计令牌，零网络请求，零 DOM 替换。 |
| 385 | [zueston/dsh-alarm](https://github.com/zueston/dsh-alarm) | 0 | 2026-10-21 | 2026-10-21 | DSH 报警插件：报警条件可选，支持提醒/弹窗/铃声/语音播报四通道（DSH alarm plugin with per-condition channels) |
| 386 | [zueston/orchestrator2-region-switch](https://github.com/zueston/orchestrator2-region-switch) | 0 | 2026-10-21 | 2026-10-21 | DSH 插件：给「自动开发调度器2.0」用的场景化主备模型切换（场景 TAB、三角色 A/B 两侧模型、失效自动切换顺序、模型变更管控） |
| 387 | [zuojinxin/dsh-sidebar-manager](https://github.com/zuojinxin/dsh-sidebar-manager) | 0 | 2026-10-20 | 2026-10-21 | 让 DSH 的扩展入口和视图标签支持折叠、排序、隐藏。Collapse, reorder and hide the DSH sidebar extensions and the conversation view tabs. |
| 388 | [zuoyunlai/dsh-pet-plugin](https://github.com/zuoyunlai/dsh-pet-plugin) | 0 | 2026-10-21 | 2026-10-21 | Photo-real desk pet plugin for DeepSeek Harness: four personas, expressions + actions, proactive speech, neural TTS, tiny chat box that never touches your session. |
| 389 | [zuoyunlai/dsh-theme-palette](https://github.com/zuoyunlai/dsh-theme-palette) | 0 | 2026-10-21 | 2026-10-21 | DSH 主题配色插件：4 套配色 × 明暗两模式，OKLCH 色域钳位 + 真实承载面对比度求解 |
| 390 | [zys2026/dsh-theme-tide](https://github.com/zys2026/dsh-theme-tide) | 0 | 2026-10-21 | 2026-10-21 | Tide &amp; Timber (潮汐木色) — a coastal light/dark theme for the DeepSeek Harness Web GUI, built on the official ThemeRuntime alias-token layer. |
| 391 | [zzh-github/dsh-plugin-sparknote](https://github.com/zzh-github/dsh-plugin-sparknote) | 0 | 2026-10-21 | 2026-10-21 | 如果你想对deepseek的回复进行标记和收藏，那么这个插件很适合您！ |
| 392 | [zzy040919-ship-it/dsh-netease-music](https://github.com/zzy040919-ship-it/dsh-netease-music) | 0 | 2026-10-20 | 2026-10-21 | DSH plugin: NetEase Cloud Music player (mini bar, liquid glass card, vinyl view, auto login via local client, client sync) |

## 从快照消失的已核准仓库 / Approved repositories missing from the snapshot

已核准但已不在当前快照中（删除或改名），核实后从 [data/approved.json](../approved.json) 移除或更新名称。

Approved but no longer present in the current snapshot (deleted or renamed) — after checking, remove them from [data/approved.json](../approved.json) or update the name.

- abcdream-Lary/dshsearch-multi
- alexchenzl/dsh-plugin-directory
- AndroidSix/dsh-multi-router
- Ckarefulon/dsh-gitbar-lite
- corrinehu/dsh-workbuddy-connect
- Crosery/dsh-drop
- Crosery/dsh-viewer
- ddldxiacan/dsh-opencode-free
- DSH-EAC/EAC-mojobox
- dsh-plugin-db/dsh-context-diet
- dsh-plugin-db/dsh-cost-meter
- dsh-plugin-db/dsh-reliable-web
- dsh-plugin-db/dsh-session-trash
- fishzjp/qa-skills
- GuZhengSVT/dsh-WeCom-notify
- HarcoChen/dsh-plugin-guide
- Imzl-zl/dsh-model-router
- jiangnanquan/dsh-ux
- jingchangzhao-gif/dsh-errkb
- jyh5555/dsh-workbuddy-connect-pro
- Lbryany/dsh-codebuddy
- Leawind/dsh-carrot-on-a-stick
- loyalchiiina/dsh-lobsterai-daddy
- loyalchiiina/dsh-workbuddy-hub
- Luca4Don3/dsh-opencode-live-models
- maomitgd2006/DSH_CG
- Milaro001/dsh-provenance-lens
- oli-bot/dsh-desktop
- Plocr/dsh-commandcode-goat
- rvaim/dsh-compat
- shxiaooo/dsh-account-quota
- SiriusWJ/dsh-mihome
- SiriusWJ/dsh-restart-btn
- SiriusWJ/dsh-skill-manager
- SyamStud/dsh-opencode-usage
- TheoiNabiy/godot-docs-dsh-plugin
- xfy2412/dsh-session-sync
- YFlaga/dsh-paper-checker
- zudazhuang/dsh-upgrade
