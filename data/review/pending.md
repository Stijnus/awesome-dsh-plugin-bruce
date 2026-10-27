# 待审核仓库 / Pending review

> 新增到 `dsh-plugin` Topic 下、带有简介、尚未经维护者核实的仓库。本文件由 `scripts/update.mjs` 每日刷新，仅供审核使用，不是用户可见页面。
>
> Repositories newly added to the `dsh-plugin` topic that the maintainer has not verified yet. Refreshed daily by `scripts/update.mjs`; review-only, not a user-facing page.

- 生成时间 / Generated: **2026-10-27**
- 快照日期 / Snapshot date: **2026-10-27 (UTC)**
- 待审核 / Pending: **356**
- 从快照消失的已核准仓库 / Approved repositories missing from the snapshot: **30**
- Star 异常增长 / Star-growth alerts: **11** — 先看下方告警节 / see the alert section first

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

对比上一份快照 **2026-10-26** / vs previous snapshot **2026-10-26**。规则：日增 ≥100★；已核准仓新入 Top 200（且 Δ≥50）/ 名次跃升 ≥50 / 冲入 Top 20；待审仓 ≥100★ 且核准后将进入 Top 200。

- 看 Star 是否与 fork、提交活跃度、仓库年龄匹配（高星零 fork、创建当天几百星，多为刷星）
- 是否把已有高星的通用项目贴上 `dsh-plugin` Topic 蹭榜——插件本身可进目录，但应加入 `leaderboard_exclusions`，理由写清 stars accrued as …
- 待审仓若核准会直接冲进 Top 20 / Top 200，先确认热度来自 **DSH 插件本身**
- 已核准仓的异常跃升：确认后同样可记入 `leaderboard_exclusions`，不必下架目录

Check stars against forks, commit activity and age (hundreds of stars on day one, or high stars with zero forks, usually look bought). A generic high-star project that only just tagged `dsh-plugin` can stay in the catalog but should go to `leaderboard_exclusions` (reason: stars accrued as …). If approving a pending repo would drop it into Top 20 / Top 200, confirm the audience is the DSH plugin itself.

- 告警数 / Alerts: **11**

| Project | Queue | Stars | Δ | Forks | Age | Signals | 审核提示 / Hint |
| --- | --- | ---: | ---: | ---: | ---: | --- | --- |
| ⚠️ [Ebony-Vinyl/dsh-our-free-model](https://github.com/Ebony-Vinyl/dsh-our-free-model) | 已核准 / approved | 46685 | +1948 | 1293 | 32d | 日增百星 | 日增 +1948★；已不进榜单 |
| ⚠️ [elysia395/dsh-wallpaper-engine](https://github.com/elysia395/dsh-wallpaper-engine) | 已核准 / approved | 3377 | +270 | 87 | 71d | 日增百星 | 日增 +270★ |
| ⚠️ [dsh-market/dsh-market](https://github.com/dsh-market/dsh-market) | 已核准 / approved | 9315 | +239 | 357 | 73d | 日增百星 | 日增 +239★；已不进榜单 |
| ⚠️ [PC2005-cloud/dsh-pet](https://github.com/PC2005-cloud/dsh-pet) | 已核准 / approved | 4518 | +208 | 344 | 73d | 日增百星 | 日增 +208★ |
| ⚠️ [ranxianglei/billion-context](https://github.com/ranxianglei/billion-context) | 已核准 / approved | 3112 | +161 | 261 | 81d | 日增百星 | 日增 +161★；已不进榜单 |
| ⚠️ [MeteorNOX/DeepSeek-Balance-Whale-Widget](https://github.com/MeteorNOX/DeepSeek-Balance-Whale-Widget) | 已核准 / approved | 6312 | +143 | 202 | 69d | 日增百星 | 日增 +143★；已不进榜单 |
| ⚠️ [Fei2411/DS-Bot](https://github.com/Fei2411/DS-Bot) | 已核准 / approved | 4259 | +143 | 389 | 19d | 日增百星 | 日增 +143★ |
| ⚠️ [T-Auto/dsh-ops](https://github.com/T-Auto/dsh-ops) | 已核准 / approved | 4568 | +132 | 137 | 18d | 日增百星 | 日增 +132★ |
| ⚠️ [dataelement/dsh-desktop](https://github.com/dataelement/dsh-desktop) | 已核准 / approved | 17144 | +120 | 577 | 74d | 日增百星 | 日增 +120★；已不进榜单 |
| ⚠️ [ccch1mneyyy/dsh-TUI](https://github.com/ccch1mneyyy/dsh-TUI) | 已核准 / approved | 5998 | +100 | 303 | 74d | 日增百星 | 日增 +100★ |
| ⚠️ [c1overzz/dsh-bili-scroll](https://github.com/c1overzz/dsh-bili-scroll) | 已核准 / approved | 927 | +54 | 100 | 12d | 冲入 Top 20 | 冲入 Top 20（24→20） |


| # | Project | Stars | Created | First seen | Description |
| ---: | --- | ---: | ---: | ---: | --- |
| 1 | [SAOS-3624/dsh-video-storyboard](https://github.com/SAOS-3624/dsh-video-storyboard) | 38 | 2026-10-26 | 2026-10-27 | Scene-aware storyboard for DeepSeek Harness: 9-16 numbered cells with timestamps + transcript + an audio envelope, packed into ONE image (384 tokens). Two tools: video_storyboard and video_zoom. |
| 2 | [Nekomeow114/dsh-tieba-dive](https://github.com/Nekomeow114/dsh-tieba-dive) | 14 | 2026-10-19 | 2026-10-27 | 百度贴吧的 DSH 插件：自动读帖、生成日报、签到（顺手关注）；回帖可选，带每轮/每日/间隔/去重四道限制。支持人设与日记，可按 DeepSeek 谷时在后台运行。 |
| 3 | [KingsleyAsher/Personal-Knowledge-Base](https://github.com/KingsleyAsher/Personal-Knowledge-Base) | 7 | 2026-10-17 | 2026-10-27 | 一个个人的知识库，它可以记录你的性格、做事方式和你所有的资料，并帮你有序的归档整理，并带有一个专门用于管理与对话的Agent。你可以随时向他提问，查资料等等，它会根据你的习惯与你规定的方式进行回答。你能够掌握全局资料给你更好更全面的答复与建议。 |
| 4 | [joeseesun/qiaomu-ui-learn-dsh](https://github.com/joeseesun/qiaomu-ui-learn-dsh) | 5 | 2026-10-27 | 2026-10-27 | 原版乔木 UI 学习的 DeepSeek Harness 迁移版：13561 设计参考、106 交互标本、审美测验与 Markdown 学习笔记 |
| 5 | [Kxiaoguai3/dsh-visual-safety-control](https://github.com/Kxiaoguai3/dsh-visual-safety-control) | 4 | 2026-10-27 | 2026-10-27 | DeepSeek Harness plugin: lightweight Windows desktop control (screenshot + OCR + UIA) with content policy and action verification. Fork of qingying012/dsh-desktop-control (MIT). |
| 6 | [otsffs/dsh-best-ip](https://github.com/otsffs/dsh-best-ip) | 4 | 2026-10-26 | 2026-10-27 | 在 DeepSeek Harness中安装本插件，为供应商模型寻找最优直连节点，避免解析到慢节点而导致的 TPS 低或服务不可用，无需梯子即可提升请求速度。适用于 Open Design、OpenCode、Command Code等订阅套餐。 |
| 7 | [TBTNCT/dsh-task-planning-mode](https://github.com/TBTNCT/dsh-task-planning-mode) | 4 | 2026-10-12 | 2026-10-27 | DSH「任务规划」模式：先把你要的效果问清楚，再拆成可执行的规划与提示词（只规划、不实现） |
| 8 | [alibaba-damo-academy/yugoo-design](https://github.com/alibaba-damo-academy/yugoo-design) | 3 | 2026-09-28 | 2026-10-27 | Turn your AI agent app into an interactive ideation and design workbench. A general-purpose, open-source framework with editable panels and versioned projects across DSH, Codex, and other agent hosts. |
| 9 | [Kiru-Sama/dsh-progress-bar](https://github.com/Kiru-Sama/dsh-progress-bar) | 3 | 2026-10-18 | 2026-10-27 | DeepSeek Harness 进度汇报提醒插件：累计每 N 步或每 N 秒提醒 Agent 汇报一次进度，侧栏实时显示计数，聊天区横幅显示上次提醒时刻。附带余额低额提醒与 DeepSeek 峰谷时段指示。 |
| 10 | [Menghuan1918/dsh-better-goal](https://github.com/Menghuan1918/dsh-better-goal) | 3 | 2026-10-22 | 2026-10-27 | 更好的Goal实现 \| Better goal tool for DSH |
| 11 | [oxmumu3/ai-twin-starter](https://github.com/oxmumu3/ai-twin-starter) | 3 | 2026-10-19 | 2026-10-27 | Turn your existing work agent into an online twin: portable setup templates and a DeepSeek Harness initializer. |
| 12 | [Voyager77Twt/dsh-folder-search](https://github.com/Voyager77Twt/dsh-folder-search) | 3 | 2026-10-25 | 2026-10-27 | Search local Word/PDF/PPT/Excel folders for exam questions and export paper drafts.Extensive use of AI assisted programming |
| 13 | [a740411040/dsh-assist](https://github.com/a740411040/dsh-assist) | 2 | 2026-10-26 | 2026-10-27 | Personas, memory and opt-in proactive chat that resumes after restart for DeepSeek Harness Desktop. 社区预发布插件：白饭鱼女儿、角色记忆与重启恢复主动聊天。 |
| 14 | [CNranger1124/dsh-lane-bridge](https://github.com/CNranger1124/dsh-lane-bridge) | 2 | 2026-10-25 | 2026-10-27 | DeepSeek Harness plugin: multi-channel chat/customer-support bot (QQ, official QQ Bot, Discord), domains, shared knowledge, unified push |
| 15 | [dawn-471/foresight](https://github.com/dawn-471/foresight) | 2 | 2026-08-22 | 2026-10-27 | ForeSight: a temporal-aspect long-term memory plugin for DeepSeek Harness (dsh) |
| 16 | [gcggcg/dsh-plugin-session-view](https://github.com/gcggcg/dsh-plugin-session-view) | 2 | 2026-10-27 | 2026-10-27 | Session plugins, MCP servers and skills panel for DeepSeek Harness: a top-right header popover with per-item enable switches and session plugin usage. |
| 17 | [hgrh6268-lgtm/dsh-session-rate-cards](https://github.com/hgrh6268-lgtm/dsh-session-rate-cards) | 2 | 2026-10-27 | 2026-10-27 | Live CNY cost of the current session in the DSH composer dock, with editable per-model rate cards. |
| 18 | [KERBALMans/dsh-aliyun-coupon](https://github.com/KERBALMans/dsh-aliyun-coupon) | 2 | 2026-10-27 | 2026-10-27 | DeepSeek Harness 插件：在侧边栏实时查看阿里云「云工开物」学生专属 300 元代金券余额。零 Token 消耗（本机无头浏览器直连阿里云费用控制台抓取，不走大模型），1–30 分钟自动刷新，深浅色跟随 DSH 原生主题。Windows / macOS / Linux。 |
| 19 | [lintwosix-beep/dsh-pet-chat](https://github.com/lintwosix-beep/dsh-pet-chat) | 2 | 2026-10-27 | 2026-10-27 | 桌宠「宠物聊天」：基于 dsh-pet 的二次修改版，QQ 风格对话面板、分支合并转发、面板停靠与八向缩放 |
| 20 | [Soyoanon-mygo/dsh-music-companion](https://github.com/Soyoanon-mygo/dsh-music-companion) | 2 | 2026-10-26 | 2026-10-27 | 一个能让dsh听懂你的歌单 并根据你的歌品向你主动推荐歌曲的dsh插件 |
| 21 | [01men/DeptAI-UI-DSH](https://github.com/01men/DeptAI-UI-DSH) | 1 | 2026-09-02 | 2026-10-27 | 榕器定制轨（01门）· AI 代理与人类协作前台——行业 AI 工作台（IAW）与一线面板/看板：dsh 一键插件化（班组长工作台/执行卡/Skill 点名直调/钉钉桥），上游 01men/ybkk-AIOS |
| 22 | [5yeah/Aiscribe](https://github.com/5yeah/Aiscribe) | 1 | 2026-10-18 | 2026-10-27 | Using Ai tools to finish my daily work report |
| 23 | [9840333w/dsh-file-tracker](https://github.com/9840333w/dsh-file-tracker) | 1 | 2026-10-22 | 2026-10-27 | 用于deepseek harness(dsh)自动记录 AI agent 对工作区及工作区外文件/文件夹的新建、修改、删除、重命名、移动五类操作，便于快捷查看、监控文件动态，减小AI错误操作的损失，并支持日志保存与删除 |
| 24 | [aa1355721445-lgtm/dsh-image-studio](https://github.com/aa1355721445-lgtm/dsh-image-studio) | 1 | 2026-10-27 | 2026-10-27 | DeepSeek Harness 生图插件：本地参考库 + 关键词 + 图片/文字转三视图，模型按情境自己判断发什么图 |
| 25 | [AaronKal-ECU/offline-ai-agent](https://github.com/AaronKal-ECU/offline-ai-agent) | 1 | 2026-10-26 | 2026-10-27 | Run AI on your own hardware, never deal with the cloud and create AI that can handle sensitive data. This repo showcases how to run AI on your own computer, and how to build specialised tools for it to use. I showcase a real setup where I developed tools in Deepseek Harness, that solved real automation engineering problems |
| 26 | [Aliarrrrr/dsh-cot-export](https://github.com/Aliarrrrr/dsh-cot-export) | 1 | 2026-10-27 | 2026-10-27 | Export a DSH session's complete model chain-of-thought to Markdown / JSON / JSONL / text, and prepare supervised review packages for other agents. |
| 27 | [baigeiy/dsh-windows-notifications](https://github.com/baigeiy/dsh-windows-notifications) | 1 | 2026-10-27 | 2026-10-27 | Windows 原生通知插件：提问与完成提醒、自定义图标标题、聚焦免打扰、点击返回已有 DSH 标签页。 |
| 28 | [BuffMcBigHuge/dsh-brave-search](https://github.com/BuffMcBigHuge/dsh-brave-search) | 1 | 2026-10-27 | 2026-10-27 | Brave Search provider for DeepSeek Harness: one backend, no settings UI, key from the credential store. |
| 29 | [c347087870/dsh-live-browser](https://github.com/c347087870/dsh-live-browser) | 1 | 2026-10-27 | 2026-10-27 | Drive DSH's own sidebar browser: real webview rendering plus an injected command surface so the agent can click, type, read and scroll the page the human is looking at. |
| 30 | [CH3SH-LC/dsh-theme-nahida](https://github.com/CH3SH-LC/dsh-theme-nahida) | 1 | 2026-10-27 | 2026-10-27 | 纳西妲 · 摩耶之殿｜Nahida theme for DeepSeek Harness (DSH), with light/dark appearances and responsive Dendro artwork. |
| 31 | [chenqaq123/dsh-overleaf-workshop](https://github.com/chenqaq123/dsh-overleaf-workshop) | 1 | 2026-10-27 | 2026-10-27 | 基于DeepSeek Harness 的 Overleaf Workshop 插件：三栏工作区、实时同步 |
| 32 | [dialling/dsh-galaxy-view](https://github.com/dialling/dsh-galaxy-view) | 1 | 2026-10-26 | 2026-10-27 | Cinematic 3D galaxy view for DeepSeek Harness — workspaces as suns, conversations as stars, plus a memory library and an armillary sphere. · DSH 三维星系图插件 |
| 33 | [dinjufen/dsh-suggest](https://github.com/dinjufen/dsh-suggest) | 1 | 2026-10-25 | 2026-10-27 | DeepSeek Harness plugin: predicts your next prompt after each turn — press Tab to accept |
| 34 | [dongliuwuzhong-arch/dsh-purge-021rc2](https://github.com/dongliuwuzhong-arch/dsh-purge-021rc2) | 1 | 2026-10-17 | 2026-10-27 | DeepSeek Harness 0.2.1-rc.3 破甲/清理插件（dsh-purge 分支）：82 条补丁、逐字节可回滚备份、灵魂闸门、31 条单元测试 \| DSH jailbreak + patch/uninstall toolkit for 0.2.1-rc.3 |
| 35 | [dragonsummer1/dsh-watermark-remover](https://github.com/dragonsummer1/dsh-watermark-remover) | 1 | 2026-10-27 | 2026-10-27 | DSH 插件：结构级无损移除 PDF / Word 水印（探测 Form XObject 图层与文字块，不改动正文与分辨率） |
| 36 | [Dynesshely/dsh-plugin-notify](https://github.com/Dynesshely/dsh-plugin-notify) | 1 | 2026-10-27 | 2026-10-27 | Notification plugins for DeepSeek Harness (DSH) — sound and desktop alerts when a session actually needs you. |
| 37 | [Dynesshely/dsh-plugin-wakatime](https://github.com/Dynesshely/dsh-plugin-wakatime) | 1 | 2026-10-27 | 2026-10-27 | DeepSeek Harness plugin that reports the time you spend coding with AI to WakaTime as \`ai coding\` heartbeats. |
| 38 | [EternalNight996/agent-teams-pixel](https://github.com/EternalNight996/agent-teams-pixel) | 1 | 2026-09-01 | 2026-10-27 | DSH Pixel Team - a pixel cultivation hall for DeepSeek Harness multi-agent teams: durable members, dependency-aware tasks, quality gates and 15 realms. MIT, local-first. |
| 39 | [EternalNight996/dsh-pixel-team](https://github.com/EternalNight996/dsh-pixel-team) | 1 | 2026-10-27 | 2026-10-27 | DSH Pixel Team - a pixel cultivation hall for DeepSeek Harness multi-agent teams: durable members, dependency-aware tasks, quality gates and 15 realms. MIT, local-first. |
| 40 | [fhy-action/dsh-cursor-halo](https://github.com/fhy-action/dsh-cursor-halo) | 1 | 2026-10-27 | 2026-10-27 | A DeepSeek Harness plugin that makes your cursor more fluid, leaving a glowing trail as you move. |
| 41 | [huangbaba1992/dsh-mm](https://github.com/huangbaba1992/dsh-mm) | 1 | 2026-10-27 | 2026-10-27 | DeepSeek Harness 本地记忆插件：soul / MEMORY / topics / inbox，提炼、压缩去重、备份与回收站 |
| 42 | [IStarFoxI/dsh-memory-calendar](https://github.com/IStarFoxI/dsh-memory-calendar) | 1 | 2026-10-24 | 2026-10-27 | Local-first long-term memory for DeepSeek Harness |
| 43 | [iTimes6/dsh-archive-cleaner](https://github.com/iTimes6/dsh-archive-cleaner) | 1 | 2026-10-27 | 2026-10-27 | DSH 侧边栏插件：把归档会话列成一屏，勾选后批量删除。 |
| 44 | [joeseesun/qiaomu-cover-design-dsh](https://github.com/joeseesun/qiaomu-cover-design-dsh) | 1 | 2026-10-27 | 2026-10-27 | Original Qiaomu cover canvas, templates, typography and AI design for DeepSeek Harness |
| 45 | [Joz739/dsh-workflow-map](https://github.com/Joz739/dsh-workflow-map) | 1 | 2026-10-27 | 2026-10-27 | DSH 分步工作流地图：热注入/可核验进度条/单页面布局 |
| 46 | [kk-ai-lab/dsh-workshpace-plugin](https://github.com/kk-ai-lab/dsh-workshpace-plugin) | 1 | 2026-08-15 | 2026-10-27 | Inspect the files an agent touched, review session artifacts, preview bounded content, and manage local Workspace Memory without leaving the conversation. |
| 47 | [LeeX852/dsh-plugins](https://github.com/LeeX852/dsh-plugins) | 1 | 2026-10-27 | 2026-10-27 | dsh插件仓库 |
| 48 | [LZM2023/dsh-sofa-monitor](https://github.com/LZM2023/dsh-sofa-monitor) | 1 | 2026-10-27 | 2026-10-27 | dsh-京东沙发爬取 —— DSH 插件：京东沙发商品采集、详情图 AI 核对与产品规格卡（PNG + 可编辑 PPTX）自动归档 |
| 49 | [meow09nine/dsh-suinian](https://github.com/meow09nine/dsh-suinian) | 1 | 2026-10-27 | 2026-10-27 | 碎念 suinian：DSH agent 主动给用户发 QQ 消息（随机心跳 + 事件触发 + qq_send 工具） |
| 50 | [mkoalade/dsh-icloud-sync](https://github.com/mkoalade/dsh-icloud-sync) | 1 | 2026-10-27 | 2026-10-27 | Sync DSH profiles, plugin manifests, and skills between Macs through iCloud Drive. |
| 51 | [NONEMIN/dsh-sidebar-panels](https://github.com/NONEMIN/dsh-sidebar-panels) | 1 | 2026-10-27 | 2026-10-27 | Manage the left global panel list in DeepSeek Harness: show or hide entries, drag to reorder, two-way sync with plugin-native sidebar switches. |
| 52 | [OldManDing/dsh-ledger-watch](https://github.com/OldManDing/dsh-ledger-watch) | 1 | 2026-10-27 | 2026-10-27 | Session-level lesson ledger watch for DeepSeek Harness: did this session actually consult the ledger and record its pitfalls? |
| 53 | [oxmumu3/dsh-family-assistant](https://github.com/oxmumu3/dsh-family-assistant) | 1 | 2026-10-23 | 2026-10-27 | 家庭助手：基于 DeepSeek Harness 的多成员独立微信助手、提醒、个性化日报与 Owner 工作台。预览版。 |
| 54 | [rrdongdong/dsh-pdf](https://github.com/rrdongdong/dsh-pdf) | 1 | 2026-10-22 | 2026-10-27 | PDF text extraction that survives CID/ObjStm fonts (CVPR/IEEE PDFs) — DSH/Cordis tools |
| 55 | [sadjjk/dsh-quick-prompts](https://github.com/sadjjk/dsh-quick-prompts) | 1 | 2026-10-27 | 2026-10-27 | DSH 快捷指令：输入框敲 /缩写 展开预设文本，配置卡管理指令与调用统计 |
| 56 | [sadjjk/dsh-zvec-memory-search](https://github.com/sadjjk/dsh-zvec-memory-search) | 1 | 2026-10-26 | 2026-10-27 | DSH 本地记忆库检索：关键词 + 语义混合检索，配置卡建索引、自动更新 |
| 57 | [sailina-afk/sailina-s-box](https://github.com/sailina-afk/sailina-s-box) | 1 | 2026-10-21 | 2026-10-27 | This is a little box where I keep the programs and plugins I like developing. |
| 58 | [shellRaining/dsh-plugins](https://github.com/shellRaining/dsh-plugins) | 1 | 2026-10-27 | 2026-10-27 | shellRaining 的 DeepSeek Harness (DSH) 插件集：壁纸、批注、侧边会话、Mermaid、标题版式；一键装齐或单个安装 |
| 59 | [shutongcao1-design/dsh-rewind-branch](https://github.com/shutongcao1-design/dsh-rewind-branch) | 1 | 2026-10-27 | 2026-10-27 | DSH插件：回退某一轮，然后开新分支继续，而不是把工作丢掉。  每轮回答的尾部有一个动作——**回到这轮提问前**。它把该轮通过 DSH 文件工具改过的文件恢复到提问之前，再从这条消息的边界 fork 出一个新分支会话并切过去；来源会话保持原样。 |
| 60 | [sunxiuguo/dsh-a2ui](https://github.com/sunxiuguo/dsh-a2ui) | 1 | 2026-10-23 | 2026-10-27 | A2UI for DeepSeek Harness: official schemas and renderer, bounded actions and non-executing replay. Native Web-host synthetic workflow and restart verified; live models and full protocol coverage remain unverified. |
| 61 | [tdcq9594/dsh-roost](https://github.com/tdcq9594/dsh-roost) | 1 | 2026-10-26 | 2026-10-27 | DSH 插件：让 AI 通过 Roost 住进 QQ —— 官方接口，不用 hook 客户端 |
| 62 | [TheCarey/Dsh-gpt-auto-proxy](https://github.com/TheCarey/Dsh-gpt-auto-proxy) | 1 | 2026-10-27 | 2026-10-27 | 把自有订阅凭证在本机转成 OpenAI 兼容接口的 DSH 插件；非官方项目，与任何上游服务无关联，仅供个人学习研究。 |
| 63 | [WJDdidi-1/ai-context-doctor](https://github.com/WJDdidi-1/ai-context-doctor) | 1 | 2026-04-24 | 2026-10-27 | Find the files your AI coding agent should not read before sending it your repo. |
| 64 | [wuhehen176/ST-bridge](https://github.com/wuhehen176/ST-bridge) | 1 | 2026-10-27 | 2026-10-27 | DSH persistent Agent session bridge for Tavern plugins |
| 65 | [wuzeno/dsh-library](https://github.com/wuzeno/dsh-library) | 1 | 2026-10-27 | 2026-10-27 | DeepSeek Harness 资料库插件：按工作区管理本地原文件，按需授权模型参考。Local-first original-file libraries for DSH. |
| 66 | [wzciczw/dsh-jj-panel](https://github.com/wzciczw/dsh-jj-panel) | 1 | 2026-10-22 | 2026-10-27 | Jujutsu (jj) history panel for the DeepSeek Harness web GUI: change graph, details and diffs, read straight from jj. |
| 67 | [xeonphi1/memlikehuman](https://github.com/xeonphi1/memlikehuman) | 1 | 2026-10-27 | 2026-10-27 | 换个模型也不丢故事：给 DeepSeek 大鲸鱼装上本地记忆，帮它记住你们的约定和没做完的事，下次打开还能接着聊。 |
| 68 | [xia-sc/dsh-decision](https://github.com/xia-sc/dsh-decision) | 1 | 2026-10-27 | 2026-10-27 | Decision 3.0 multimodal decision models for DeepSeek Harness: calibrated-probability agent tools (choice/noul/score/box), a Settings page, and a probability-bar card. |
| 69 | [xuelinzheng41-maker/dsh-academic-review](https://github.com/xuelinzheng41-maker/dsh-academic-review) | 1 | 2026-10-27 | 2026-10-27 | Unofficial DSH port of ARS academic-paper-reviewer (Phase 1: reviewer only). CC BY-NC 4.0 - non-commercial. |
| 70 | [Ycet/dsh-signal-field](https://github.com/Ycet/dsh-signal-field) | 1 | 2026-10-25 | 2026-10-27 | DSH 动效界面插件：抖动信号场背景、蓝图标题与毛玻璃输入框，可在「设置 → UI 动画」逐项开关。DSH animated-UI plugin: dithered signal-field backdrop, blueprint headline and frosted-glass composer. |
| 71 | [yinvoke/dsh-plugin-session-delete](https://github.com/yinvoke/dsh-plugin-session-delete) | 1 | 2026-10-27 | 2026-10-27 | DeepSeek Harness session deletion plugin with a five-second restore window |
| 72 | [YokosWY/dsh-calibration-tier](https://github.com/YokosWY/dsh-calibration-tier) | 1 | 2026-10-23 | 2026-10-27 | dsh-calibration-tier（简称 CT）｜一框四模式：思考（常规/严格/极致）、循环（轻量/交付/极致）、对抗（可叠加的对抗审查）、检索（本地/增量/全量，可叠加找技能）；思考与循环互斥切换，对抗与检索可叠加。模型经 clarify_tier / forge_level 读取。 |
| 73 | [YokosWY/dsh-guard](https://github.com/YokosWY/dsh-guard) | 1 | 2026-10-24 | 2026-10-27 | 给 DSH 做的外部看守：判死、备份、救回来。不改 DSH 本体，不碰它的配置。 |
| 74 | [ytsu-ki/dsh-relink](https://github.com/ytsu-ki/dsh-relink) | 1 | 2026-10-27 | 2026-10-27 | 鱼的记忆（dsh-relink）：面向 DeepSeek Harness 的项目记忆与原生子智能体协作插件。默认本地 SQLite，可选 Obsidian 兼容的 Markdown 知识库，按项目召回相关记录，无常驻后台服务。 |
| 75 | [yunfong/dsh-session-md-export](https://github.com/yunfong/dsh-session-md-export) | 1 | 2026-10-27 | 2026-10-27 | 把 DSH 会话一键导出成可读的 Markdown / Export a DeepSeek Harness session as readable Markdown, dialogue only. |
| 76 | [zy666946/dsh-heartbeat-inner](https://github.com/zy666946/dsh-heartbeat-inner) | 1 | 2026-10-27 | 2026-10-27 | DSH 主动心跳插件：定时醒来，自己判断要不要主动找主人说句话（独立内心会话 + 设置页 + OneBot/QQ） |
| 77 | [08mamba24/dsh-subagent-compactor](https://github.com/08mamba24/dsh-subagent-compactor) | 0 | 2026-10-27 | 2026-10-27 | Manual context compaction for live direct subagents in DSH Desktop. Command and model tool; tested on Desktop 0.12.1. |
| 78 | [0xmrxp/bughunt-kit](https://github.com/0xmrxp/bughunt-kit) | 0 | 2026-10-27 | 2026-10-27 | Authorized web security assessment workflows for DeepSeek Harness |
| 79 | [1bailan/dsh-plugin-boss-zhipin](https://github.com/1bailan/dsh-plugin-boss-zhipin) | 0 | 2026-10-27 | 2026-10-27 | DeepSeek Harness plugin: BOSS鐩磋仒 automated job application skill (profile-driven screening, Kimi WebBridge, resumable runs, HTML reports). |
| 80 | [2001Y/dsh-plugin-workspace-discovery](https://github.com/2001Y/dsh-plugin-workspace-discovery) | 0 | 2026-10-27 | 2026-10-27 | Discover local git repositories and register them as DeepSeek Harness workspaces |
| 81 | [2095945715a-source/dsh-basketball-pet](https://github.com/2095945715a-source/dsh-basketball-pet) | 0 | 2026-10-26 | 2026-10-27 | A basketball desktop pet for the DSH Web UI — drag the hoop anywhere, flick the ball in, bouncy physics and a daily score. |
| 82 | [2697574898-netizen/dsh-thinking-trail](https://github.com/2697574898-netizen/dsh-thinking-trail) | 0 | 2026-10-27 | 2026-10-27 | 思考路径留存与复用：跨会话记录 AI 的路线、决策和教训 |
| 83 | [43aquarius/luna-presence-check](https://github.com/43aquarius/luna-presence-check) | 0 | 2026-10-27 | 2026-10-27 | 检测主人的活跃度并适时发起互动 |
| 84 | [7AAAAAH/dsh-mint-budgie](https://github.com/7AAAAAH/dsh-mint-budgie) | 0 | 2026-10-27 | 2026-10-27 | Mint Budgie desktop pet plugin for DeepSeek Harness |
| 85 | [AAAAaron/dsh-feishu-board](https://github.com/AAAAaron/dsh-feishu-board) | 0 | 2026-10-27 | 2026-10-27 | 飞书公告板：DSH 会话提问推到飞书私聊，回复原文回填原会话（宿主插件，含重复发送抑制） |
| 86 | [adithyanraj03/dsh-verbose](https://github.com/adithyanraj03/dsh-verbose) | 0 | 2026-10-26 | 2026-10-27 | A session-header 3-dots menu for dsh: download the session log, switch each chat between Normal and Verbose, and define what Verbose expands (thinking blocks, tool calls, terminal output) — plus a per-turn metrics footer. |
| 87 | [AhaCrazy/action-hub](https://github.com/AhaCrazy/action-hub) | 0 | 2026-10-27 | 2026-10-27 | 可移植 Agent Skill 库：DSH、Pi、OMP 原生适配器 |
| 88 | [ai-written/dsh-usage-badge](https://github.com/ai-written/dsh-usage-badge) | 0 | 2026-09-21 | 2026-10-27 | DeepSeek Harness 的用量徽标插件 |
| 89 | [AlbertZJ/dsh-web-search-pro-plus](https://github.com/AlbertZJ/dsh-web-search-pro-plus) | 0 | 2026-10-27 | 2026-10-27 | Enhanced persistent web search plugin for DeepSeek Harness, adapted to dsh 0.2.1-rc.2 (fork of anweat/dsh-web-search-pro) |
| 90 | [AlleyRain/dsh-notifier](https://github.com/AlleyRain/dsh-notifier) | 0 | 2026-10-27 | 2026-10-27 | 用于在dsh需要用户回应时及时通知 |
| 91 | [AlLHHH/dsh-perf-boost](https://github.com/AlLHHH/dsh-perf-boost) | 0 | 2026-10-27 | 2026-10-27 | DSH（DeepSeek Harness）桌面端性能优化插件：长对话省渲染、后台暂停定时器、会话列表节流、媒体懒加载、大会话预热等功能 |
| 92 | [alvinlui-hk/dsh-qwen-plan-usage](https://github.com/alvinlui-hk/dsh-qwen-plan-usage) | 0 | 2026-10-27 | 2026-10-27 | Show Qwen Cloud Token Plan usage in DeepSeek Harness. |
| 93 | [Andyfree-98/dsh-checkin-workbuddy](https://github.com/Andyfree-98/dsh-checkin-workbuddy) | 0 | 2026-10-27 | 2026-10-27 | One-click WorkBuddy daily check-in button pinned to the DSH composer toolbar |
| 94 | [antonbru/dsh-settings-sync](https://github.com/antonbru/dsh-settings-sync) | 0 | 2026-10-27 | 2026-10-27 | DeepSeek Harness: sync settings, MCP and installed plugins through a private GitHub repository (like VS Code Settings Sync) |
| 95 | [AspirinEny/dsh-settings-companion](https://github.com/AspirinEny/dsh-settings-companion) | 0 | 2026-10-27 | 2026-10-27 | Adds a gear + Settings column beside the DSH desktop sidebar account row. |
| 96 | [awol2005ex3/dsh-offexplorer](https://github.com/awol2005ex3/dsh-offexplorer) | 0 | 2026-10-27 | 2026-10-27 | DeepSeek Harness (dsh) 插件：把offexplorer_rs的 Kafka 浏览 / 管理能力移植进 dsh。Rust 半基于 \`rdkafka\`，经 napi-rs 暴露给 Node 宿主， 再以 \`/api/offexplorer/*\` 精确 Fetch 路由和一个 \`kafka\` agent 工具对外提供。 |
| 97 | [AzhaI114514/dsh](https://github.com/AzhaI114514/dsh) | 0 | 2026-10-27 | 2026-10-27 | 给 DeepSeek Harness 的唤醒词语音输入插件：说「你好Fairy」或「Fairy」后听写并直接发送 |
| 98 | [Azhe0306/dsh-howtolivebetter](https://github.com/Azhe0306/dsh-howtolivebetter) | 0 | 2026-10-27 | 2026-10-27 | DeepSeek Harness 插件：把《高性价比人生指南》装进侧栏——34 节 767 条建议离线可读，按节翻阅、全文检索、五维筛选 \| DSH plugin: read the HowToLiveBetter guide in a sidebar panel, offline |
| 99 | [B612wang/dsh-ui-transparency](https://github.com/B612wang/dsh-ui-transparency) | 0 | 2026-10-27 | 2026-10-27 | Minimalist window transparency for DeepSeek Harness: one sidebar button and a 0-90% slider that set the whole window opacity. Windows only. |
| 100 | [BadCalna/dsh-plugin-command-centre](https://github.com/BadCalna/dsh-plugin-command-centre) | 0 | 2026-10-27 | 2026-10-27 | Command Centre for DeepSeek Harness: a cyberpunk mission-control board for every task's progress, subagent tree and output (read-only V1a). |
| 101 | [bannerchi/dsh-yiyide-pdf](https://github.com/bannerchi/dsh-yiyide-pdf) | 0 | 2026-10-27 | 2026-10-27 | 一译得（yiyide.cc）PDF 翻译的 DeepSeek Harness 插件：12 个 yiyide_* 工具覆盖授权、上传、页级预检、预览、报价、确认、任务轮询与成品下载。 |
| 102 | [BBDooooog/dsh-pet-market](https://github.com/BBDooooog/dsh-pet-market) | 0 | 2026-10-27 | 2026-10-27 | DeepSeek Harness 的桌宠乐园：序列帧宠物包市场 + 系统桌面画家（WPF）。装素材包，宠物就住到 Windows 桌面上。 |
| 103 | [beiheng127/dsh-dfy-qq](https://github.com/beiheng127/dsh-dfy-qq) | 0 | 2026-10-25 | 2026-10-27 | DSH 的 QQ 对话行为层：人设、认人、表情包、主动接话、群友语气人格、定时消息，配可视化设置页 |
| 104 | [beiheng127/dsh-role-sum](https://github.com/beiheng127/dsh-role-sum) | 0 | 2026-10-25 | 2026-10-27 | DSH 二次元角色人格总结插件：萌娘百科优先采集 + CSP 固定工作流 + 设置页 |
| 105 | [bilbillm/dsh-steam-startup-animation](https://github.com/bilbillm/dsh-steam-startup-animation) | 0 | 2026-10-26 | 2026-10-27 | Steam 大屏幕风格的 DeepSeek Harness 桌面开屏动画插件：6 秒终端到鲸鱼过渡，支持原版启动音效、音量设置和 Esc 跳过。 |
| 106 | [bocchii-the-code/dsh-nerd-mode](https://github.com/bocchii-the-code/dsh-nerd-mode) | 0 | 2026-10-27 | 2026-10-27 | A study switch and study skills for DeepSeek Harness |
| 107 | [caly250/dsh-copy-file-button](https://github.com/caly250/dsh-copy-file-button) | 0 | 2026-10-21 | 2026-10-27 | DSH plugin: a "copy the whole file" button in the file preview toolbar, reading real bytes through the Host |
| 108 | [caly250/dsh-page-reload](https://github.com/caly250/dsh-page-reload) | 0 | 2026-10-21 | 2026-10-27 | DSH plugin: whole-page reload shortcut (Ctrl+Shift+R) - the recovery key for a wedged or white-screened DeepSeek Harness UI |
| 109 | [caly250/dsh-voice-hotkey](https://github.com/caly250/dsh-voice-hotkey) | 0 | 2026-10-21 | 2026-10-27 | DSH plugin: hold F9 to talk, release to transcribe with the local SenseVoice recognizer, and insert into whichever input has focus |
| 110 | [Cartoncase/dsh-task-alert](https://github.com/Cartoncase/dsh-task-alert) | 0 | 2026-10-27 | 2026-10-27 | DSH 任务完成 / 等待审批时弹窗 + 系统通知，后台也不漏 |
| 111 | [chaosxu1/dshChatHisGroup](https://github.com/chaosxu1/dshChatHisGroup) | 0 | 2026-10-27 | 2026-10-27 | dsh chat history group mananger |
| 112 | [CHATUL1/githubspace](https://github.com/CHATUL1/githubspace) | 0 | 2026-10-27 | 2026-10-27 | Personal workspace managed by DeepSeek Harness |
| 113 | [chen1880216/dsh-model-guard](https://github.com/chen1880216/dsh-model-guard) | 0 | 2026-10-27 | 2026-10-27 | DeepSeek Harness (DSH) plugin: disable models/providers and customize the order of providers and models in the conversation model picker. |
| 114 | [chen1pengvincent/dsh-archived-manager](https://github.com/chen1pengvincent/dsh-archived-manager) | 0 | 2026-10-27 | 2026-10-27 | DSH (DeepSeek Harness) plugin: manage archived sessions — native unarchive, recoverable quarantine, permanent purge, search/filter/sort, retention. 归档会话管理插件。 |
| 115 | [chendaleiQ/dsh-plugin-auto-update](https://github.com/chendaleiQ/dsh-plugin-auto-update) | 0 | 2026-10-27 | 2026-10-27 | Automatic per-package updates for the plugins you choose in DeepSeek Harness |
| 116 | [chendaleiQ/dsh-plugin-desktop-notify](https://github.com/chendaleiQ/dsh-plugin-desktop-notify) | 0 | 2026-10-27 | 2026-10-27 | Codex-style macOS notifications + Dock unread badge for the DeepSeek Harness desktop app (click the banner to jump back to the session) |
| 117 | [chenkui-luo/dsh-session-attachment-repair](https://github.com/chenkui-luo/dsh-session-attachment-repair) | 0 | 2026-10-27 | 2026-10-27 | Repair DSH sessions whose requests fail because historical attachment objects are missing from the local attachment store. |
| 118 | [chenvinc/dsh-task-settle-notify](https://github.com/chenvinc/dsh-task-settle-notify) | 0 | 2026-10-27 | 2026-10-27 | 任务看板卡片结算后自动通知发起会话的 DSH 插件 |
| 119 | [chriswang/dsh-conversation-tree](https://github.com/chriswang/dsh-conversation-tree) | 0 | 2026-10-27 | 2026-10-27 | 对话树 / Conversation Tree — organise DSH conversations into a collapsible tree by workspace and topic. |
| 120 | [cksbsqw/dsh-browser-plugins](https://github.com/cksbsqw/dsh-browser-plugins) | 0 | 2026-10-27 | 2026-10-27 | DeepSeek Harness browser plugins: CDP automation (read, click, type, screenshot, tabs, upload/download) and default-browser tabs/search. |
| 121 | [CNyaotian-Lunar/dsh-memory-echo](https://github.com/CNyaotian-Lunar/dsh-memory-echo) | 0 | 2026-10-27 | 2026-10-27 | Utterance-level short-term memory plugin for DeepSeek Harness |
| 122 | [cobaltions/dsh-pet-madoka](https://github.com/cobaltions/dsh-pet-madoka) | 0 | 2026-10-27 | 2026-10-27 | 鹿目圆桌面桌宠 · DSH 插件：透明置顶 Live2D 桌宠，接管提问/审批/任务，支持语音字幕与大小控制 |
| 123 | [coopobot/dsh-notification-chime](https://github.com/coopobot/dsh-notification-chime) | 0 | 2026-10-26 | 2026-10-27 | 提供「任务完成 / 人工审批」提示音的应用内插件。one sound when a task finishes, another when a human approval is needed. |
| 124 | [Cplay00/dsh-diffusion-preset](https://github.com/Cplay00/dsh-diffusion-preset) | 0 | 2026-10-27 | 2026-10-27 | Diffusion Mode (扩散模式) agent preset and progressive call directory tool for DeepSeek Harness. |
| 125 | [crisvollerei/dsh-persona-shell](https://github.com/crisvollerei/dsh-persona-shell) | 0 | 2026-10-27 | 2026-10-27 | DSH 插件：只在渲染层给助手汇报套人格，不进入工作提示词。/ Persona layer for DSH assistant reports, outside the working prompt. |
| 126 | [ctcbyzx/baizhi-cloud-browser](https://github.com/ctcbyzx/baizhi-cloud-browser) | 0 | 2026-10-16 | 2026-10-27 | Baizhi Cloud Browser integrations for AI agents |
| 127 | [CTX666666/dsh-prompt-polish](https://github.com/CTX666666/dsh-prompt-polish) | 0 | 2026-10-26 | 2026-10-27 | DeepSeek Harness 的提示词润色插件：在会话输入框右侧注入可逆改写控件，复用当前会话的模型选择执行旁路单轮调用，并由代码层保真校验约束改写结果逐字保留原文事实。 |
| 128 | [cty-09/dsh-compact-receipt](https://github.com/cty-09/dsh-compact-receipt) | 0 | 2026-10-27 | 2026-10-27 | \[BETA\] 上下文压缩收据 for DeepSeek Harness：审计压缩丢了你哪几条要求，并（实验性）接管压缩逐字保留。实验性部分尚未经真实压缩验证。 |
| 129 | [CurLeaf/dsh-pet-slim](https://github.com/CurLeaf/dsh-pet-slim) | 0 | 2026-10-27 | 2026-10-27 | 大肥鱼桌宠精简版：移除余额/独立运行/应用打包，保留动画、物理、工作状态联动与碎碎念（基于 PC2005-cloud/dsh-pet） |
| 130 | [cypher-yht/dsh-plugins-exam-practice](https://github.com/cypher-yht/dsh-plugins-exam-practice) | 0 | 2026-10-27 | 2026-10-27 | 四六级刷题面板：AI 导入题库、在线练习、交卷自动判分并回顾错题。 |
| 131 | [cypher-yht/dsh-plugins-market-board](https://github.com/cypher-yht/dsh-plugins-market-board) | 0 | 2026-10-27 | 2026-10-27 | 插件市场标签页：浏览、搜索社区 DeepSeek Harness 插件，一键安装到当前配置。 |
| 132 | [cypher-yht/dsh-plugins-price-badge](https://github.com/cypher-yht/dsh-plugins-price-badge) | 0 | 2026-10-27 | 2026-10-27 | DeepSeek 价格时段徽标：右下角常驻显示高峰/空闲（5 折）时段，倒计时下次切换并显示账户余额。 |
| 133 | [cypher-yht/dsh-plugins-quick-chat](https://github.com/cypher-yht/dsh-plugins-quick-chat) | 0 | 2026-10-27 | 2026-10-27 | DSH Web 右下角悬浮聊天按钮：独立聊天面板、多话题并行，不打断当前工作会话 |
| 134 | [cypher-yht/dsh-plugins-session-favorites](https://github.com/cypher-yht/dsh-plugins-session-favorites) | 0 | 2026-10-27 | 2026-10-27 | DSH Web 会话收藏：右键会话操作菜单、行内星标、侧边栏收藏面板 |
| 135 | [cypher-yht/dsh-plugins-session-view](https://github.com/cypher-yht/dsh-plugins-session-view) | 0 | 2026-10-27 | 2026-10-27 | 会话视图：DSH Web 侧边栏新增会话面板，列出所有会话及实时运行状态，点击直接打开。 |
| 136 | [cypher-yht/dsh-plugins-token-toggle](https://github.com/cypher-yht/dsh-plugins-token-toggle) | 0 | 2026-10-27 | 2026-10-27 | DSH 省 Token 快捷开关：输入框旁一键启停文档转 Markdown、网页正文读取、MCP 按需加载 |
| 137 | [d342784178/dsh-opencli](https://github.com/d342784178/dsh-opencli) | 0 | 2026-10-25 | 2026-10-27 | opencli终端复用， 减少每次命令执行node启动耗时 |
| 138 | [DavidLee2026/dsh-plugin-todo-panel](https://github.com/DavidLee2026/dsh-plugin-todo-panel) | 0 | 2026-10-27 | 2026-10-27 | DSH 右侧栏待办面板：把 markdown 待办清单显示成面板，勾选、打标签、删除都写回文件 \| A markdown todo panel for the DeepSeek Harness sidebar |
| 139 | [DaYePython/dsh-input-optimize](https://github.com/DaYePython/dsh-input-optimize) | 0 | 2026-10-27 | 2026-10-27 | DSH 输入框提示词优化按钮：一键调用当前选中模型改写草稿，保留 @引用 chip，发送即撤销、空输入隐藏 |
| 140 | [deqingLv/dsh-chrome-attach](https://github.com/deqingLv/dsh-chrome-attach) | 0 | 2026-10-27 | 2026-10-27 | Attach the current Chrome tab to a DeepSeek Harness draft as a screenshot, with its title and URL written into the composer. |
| 141 | [dhdkfkfkf/dsh-deepseek-webchat-claude-skin](https://github.com/dhdkfkfkf/dsh-deepseek-webchat-claude-skin) | 0 | 2026-10-27 | 2026-10-27 | Claude-style dark and light skin for the DeepSeek panel embedded by dsh-webchat - CSS only, no guest DOM, network or login-state access. |
| 142 | [dhdkfkfkf/dsh-webchat-anchor-fix](https://github.com/dhdkfkfkf/dsh-webchat-anchor-fix) | 0 | 2026-10-27 | 2026-10-27 | Keep the dsh-webchat guest overlay glued to its panel with CSS anchor positioning, so fullscreen and window toggles cannot leave stale geometry. |
| 143 | [dingchenhui0618-arch/dsh-changelog-zh](https://github.com/dingchenhui0618-arch/dsh-changelog-zh) | 0 | 2026-10-16 | 2026-10-27 | 从真实 git 历史生成两份中文变更日志的 DeepSeek Harness 插件：每条带 commit SHA、分类依据与「已验证/未验证」证据标记，不翻译、不编造。 |
| 144 | [dingchenhui0618-arch/dsh-delivery-receipt](https://github.com/dingchenhui0618-arch/dsh-delivery-receipt) | 0 | 2026-10-12 | 2026-10-27 | DeepSeek Harness 插件：把分支与 commit、测试与构建结果、交付物尺寸与 sha256、密钥扫描结论汇成一张按「已验证/仅本地/未验证」分区的交付回执。 |
| 145 | [dingchenhui0618-arch/dsh-skill-radar](https://github.com/dingchenhui0618-arch/dsh-skill-radar) | 0 | 2026-10-27 | 2026-10-27 | Skill usage radar for DeepSeek Harness: records every skill hit, ranks by the last 7 days, and suggests archiving skills that never fire. |
| 146 | [dmscode/dsh-peak-valley](https://github.com/dmscode/dsh-peak-valley) | 0 | 2026-10-27 | 2026-10-27 | DeepSeek Harness 峰谷状态显示器：输入卡上方一条峰/谷状态带，带剩余进度；六套马卡龙主题 + 自定义 CSS。 |
| 147 | [Dobo233/dsh-claude-desktop](https://github.com/Dobo233/dsh-claude-desktop) | 0 | 2026-10-26 | 2026-10-27 | DSH plugin: hand tasks to the Claude desktop app over claude:// deep links (and be honest about what it cannot do) |
| 148 | [Dobo233/dsh-claude-pilot](https://github.com/Dobo233/dsh-claude-pilot) | 0 | 2026-10-26 | 2026-10-27 | DSH plugin: drive the Claude Code CLI from DeepSeek Harness (run/resume/probe, --json-schema) + standalone bridge |
| 149 | [Dobo233/dsh-codex-pilot](https://github.com/Dobo233/dsh-codex-pilot) | 0 | 2026-10-26 | 2026-10-27 | DSH plugin: drive the Codex CLI from DeepSeek Harness (run/resume/queue/probe) + standalone bridge |
| 150 | [Doctor-Pan-code/ncm-player5](https://github.com/Doctor-Pan-code/ncm-player5) | 0 | 2026-10-27 | 2026-10-27 | 网易云音乐浮窗播放器（ncm-player5）：完整继承 ncm-player4（歌单/歌词/歌词翻译/播放队列/账号登录，适配皮肤主题；点击播放窗口外即收起为迷你条；迷你条无操作 3 秒自动退出为右下角音符按钮；播放中该按钮随音乐节奏（低频鼓点）跳动；右下角图标支持左键长按拖动），新增：遇到因下架/无版权而无法播放的歌曲时自动跳过，播放下一首 |
| 151 | [dxc-dxc/dsh-mcp-session-catalog](https://github.com/dxc-dxc/dsh-mcp-session-catalog) | 0 | 2026-10-27 | 2026-10-27 | Session-isolated, on-demand MCP manager for DeepSeek Harness (DSH) |
| 152 | [ebi233/dsh-feed-node](https://github.com/ebi233/dsh-feed-node) | 0 | 2026-10-27 | 2026-10-27 | 给 DeepSeek Harness 的 agent 加小红书/抖音搜索：用你自己的浏览器和家庭 IP 抓，配套每日复盘与永久记忆插件。 |
| 153 | [Elmeis/dsh-plugin-deepseek-clock](https://github.com/Elmeis/dsh-plugin-deepseek-clock) | 0 | 2026-10-27 | 2026-10-27 | DeepSeek price clock and balance for DeepSeek Harness: a composer chip shown only while a DeepSeek route is selected — peak/off-peak price window (green/red, Beijing hours) plus the topped-up balance from the API key or the signed-in account |
| 154 | [Elmeis/dsh-plugin-duckduckgo-search](https://github.com/Elmeis/dsh-plugin-duckduckgo-search) | 0 | 2026-10-27 | 2026-10-27 | Keyless DuckDuckGo search provider for DeepSeek Harness: the built-in web_search works with no API key and no infrastructure (HTML/Lite endpoints, parsing, result dedup) |
| 155 | [Elmeis/dsh-plugin-threejs-workbench](https://github.com/Elmeis/dsh-plugin-threejs-workbench) | 0 | 2026-10-27 | 2026-10-27 | Three.js workbench for DeepSeek Harness: live scene preview (iframe + import map, works offline via bundled three) and a project inspector — three revision, WebGL/WebGPU usage, removed/renamed APIs, GLB/GLTF asset weights |
| 156 | [Elmeis/dsh-web-search-duckduckgo](https://github.com/Elmeis/dsh-web-search-duckduckgo) | 0 | 2026-08-24 | 2026-10-27 | Keyless DuckDuckGo search provider for the DeepSeek Harness web capability seam: web_search with no API key and nothing to host |
| 157 | [enkolesnikov/MaxDSHBot](https://github.com/enkolesnikov/MaxDSHBot) | 0 | 2026-10-27 | 2026-10-27 | DSH → MAX messenger plugin: agent replies + remote control (chat, commands, approvals, questions, progress, files) + observability (events, TODO progress, quiet modes, daily digest) |
| 158 | [entrehuihui/brain-mem-think](https://github.com/entrehuihui/brain-mem-think) | 0 | 2026-10-27 | 2026-10-27 | 会思考的脑子：不存任何原文，只存模型从多次经历里熔出的判断。会忘、会想多、会追问、会改自己。 |
| 159 | [exa160/dsh-miloco-bridge](https://github.com/exa160/dsh-miloco-bridge) | 0 | 2026-10-27 | 2026-10-27 | DSH bridge for Xiaomi Miloco: isolated Agent preset, push loop, perception-priority filtering |
| 160 | [FAVKTOXIC/dsh-caption-bar](https://github.com/FAVKTOXIC/dsh-caption-bar) | 0 | 2026-10-27 | 2026-10-27 | Reclaim a full row of vertical space in DeepSeek Harness by moving conversation views into the Windows caption row and utilities into a compact right rail. |
| 161 | [feely0208/dsh-ecosystem-radar](https://github.com/feely0208/dsh-ecosystem-radar) | 0 | 2026-10-27 | 2026-10-27 | DSH 插件：把生态雷达快照做成面板 —— 近 7 天新增 / 行业供给 / 每日增量报告 |
| 162 | [fffzzzjjj/dsh-hindsight-manager](https://github.com/fffzzzjjj/dsh-hindsight-manager) | 0 | 2026-10-25 | 2026-10-27 | 在 DSH 里管理本地 Hindsight 记忆守护进程：启停、看门狗、缓存位置，以及浏览/搜索本仓库记忆库的整页界面。Manage the local Hindsight daemon from inside DeepSeek Harness. |
| 163 | [FragrantLotus/dsh-plugin-chinese](https://github.com/FragrantLotus/dsh-plugin-chinese) | 0 | 2026-10-27 | 2026-10-27 | 给每个已安装的 DSH 插件自动补上中文功能简介。插件名保持原样，只翻译简介。 |
| 164 | [Galaxy-2001/dsh-xiangqi](https://github.com/Galaxy-2001/dsh-xiangqi) | 0 | 2026-10-27 | 2026-10-27 | 中国象棋插件：在 DeepSeek Harness 对话中与 AI 对弈，支持走棋动画、悔棋及按会话保存。 |
| 165 | [gaoyinxin/dsh-mode-switcher](https://github.com/gaoyinxin/dsh-mode-switcher) | 0 | 2026-10-27 | 2026-10-27 | Claude Code-style Tab shortcut and toolbar switcher between Plan and Build modes for DeepSeek Harness, with seamless per-mode model presets. |
| 166 | [gezi-wen/dsh-panel-order](https://github.com/gezi-wen/dsh-panel-order) | 0 | 2026-10-27 | 2026-10-27 | Drag the sidebar's global panel entries to reorder them in DeepSeek Harness. |
| 167 | [gghyoo/dsh-download-image](https://github.com/gghyoo/dsh-download-image) | 0 | 2026-10-26 | 2026-10-27 | DSH Web UI plugin: adds a Download PNG button next to the assistant message copy button. |
| 168 | [gigaflw/dsh-fft-paper-trading](https://github.com/gigaflw/dsh-fft-paper-trading) | 0 | 2026-10-26 | 2026-10-27 | 在 DSH 中进行模拟交易，支持 A 股和商品期货，本地账本，内置 FTShare 数据源与 K 线，无需购买 API Key 也可使用日K收盘价练习 |
| 169 | [GlariaLuminous/dsh-canvas](https://github.com/GlariaLuminous/dsh-canvas) | 0 | 2026-10-27 | 2026-10-27 | DeepSeek Harness 成果工作台插件：在画布中整理页面、文档和图片，通过元素批注交给 AI 修改，支持版本对比与历史恢复。 |
| 170 | [Green-hats/dsh-devin2api](https://github.com/Green-hats/dsh-devin2api) | 0 | 2026-10-27 | 2026-10-27 | Devin2API model provider for DeepSeek Harness |
| 171 | [guhanfei-ai/dsh-innersense](https://github.com/guhanfei-ai/dsh-innersense) | 0 | 2026-09-16 | 2026-10-27 | InnerSense（向内感知）— local-first interoception for DeepSeek Harness: events, personal metrics and reality feedback. |
| 172 | [guhanfei-ai/dsh-zterm](https://github.com/guhanfei-ai/dsh-zterm) | 0 | 2026-10-13 | 2026-10-27 | Real-machine terminal for DeepSeek Harness — SSH, JumpServer and local PTY, read-only by default, writes only when a human turns them on. |
| 173 | [guix4ever/dsh-nook](https://github.com/guix4ever/dsh-nook) | 0 | 2026-10-27 | 2026-10-27 | 拟人化插件：住在 DeepSeek Harness 里的 AI 伙伴（默认叫大D老师）。记得你、在相处中慢慢长出性格、自己去看东西、会主动来找你。 |
| 174 | [H3OOCH/dsh-trust-center](https://github.com/H3OOCH/dsh-trust-center) | 0 | 2026-10-27 | 2026-10-27 | Read-only trust audit for MCP tools and Skills in DeepSeek Harness: prompt-injection signals, hidden Unicode, dangerous capabilities, schema bloat, and context cost, with an in-Web Trust Center panel. |
| 175 | [Hariketsu/dsh-fakeip-fetch](https://github.com/Hariketsu/dsh-fakeip-fetch) | 0 | 2026-10-27 | 2026-10-27 | DSH local HTTP fetch with TUN Fake-IP support |
| 176 | [heavenJiang/dsh-switchboard](https://github.com/heavenJiang/dsh-switchboard) | 0 | 2026-10-24 | 2026-10-27 | 掌上指挥台 Switchboard: command DeepSeek Harness agents from Telegram and Feishu (Lark) — streamed replies, approvals, files, voice, per-person rights. |
| 177 | [heqinjian/dsh-plugin-pkt](https://github.com/heqinjian/dsh-plugin-pkt) | 0 | 2026-10-27 | 2026-10-27 | DeepSeek Harness plugin for Cisco Packet Tracer: read, repair and build .pkt/.pka topologies |
| 178 | [hero-jianghaojie/dsh-plugins](https://github.com/hero-jianghaojie/dsh-plugins) | 0 | 2026-10-27 | 2026-10-27 | DeepSeek Harness (DSH) 插件与技能索引：壁纸、启动器、作答风格、文件夹索引 |
| 179 | [hkhlpj/dsh-boot-theme](https://github.com/hkhlpj/dsh-boot-theme) | 0 | 2026-10-27 | 2026-10-27 | DeepSeek Harness 冷启动开机动画插件：全屏播放自定义视频/音频，播完转场进入主界面。支持每次冷启动 / 每天首次 / 仅首次、淡出 / 缩放模糊 / 镜片破碎转场、跳过手势与实时预览。 |
| 180 | [houguofei/dsh-eye-care-theme](https://github.com/houguofei/dsh-eye-care-theme) | 0 | 2026-10-27 | 2026-10-27 | Eye-care (warm paper) theme for DeepSeek Harness: a third palette beside light/dark, a Settings switch, and a one-click sidebar toggle. |
| 181 | [iBobbyTS/dsh-fs-observation-bridge](https://github.com/iBobbyTS/dsh-fs-observation-bridge) | 0 | 2026-10-26 | 2026-10-27 | Bridges external code-reading tools into DeepSeek Harness's native file observation system, allowing agents to edit files without redundant read calls after inspecting source code. 将第三方代码读取工具接入DSH原生文件观察机制，使 Agent 读取源码后无需重复调用 read 即可编辑文件。 |
| 182 | [icrefin/dsh-prompt-recall](https://github.com/icrefin/dsh-prompt-recall) | 0 | 2026-10-27 | 2026-10-27 | Take the last prompt back in DeepSeek Harness: one click stops the turn, rewinds the conversation to just before it, and returns the text to the composer. |
| 183 | [idianzi/dsh-context-handoff](https://github.com/idianzi/dsh-context-handoff) | 0 | 2026-10-27 | 2026-10-27 | dsh-context-handoff 是一个给 DSH 用的「上下文交接」插件。  |
| 184 | [IVAN4242/dsh-plugin-ssh-remote](https://github.com/IVAN4242/dsh-plugin-ssh-remote) | 0 | 2026-10-27 | 2026-10-27 | Multi-host SSH toolbelt for DeepSeek Harness: server registry, /ssh, run/put/get tools, destructive-command guard, secret redaction, audit log |
| 185 | [JackWoods-code/dsh-bot-toggle](https://github.com/JackWoods-code/dsh-bot-toggle) | 0 | 2026-10-27 | 2026-10-27 | A floating Bot / ADE switch for the DSH web UI: toggles ds-bot's Bot surface and the classic DSH surface without unloading ds-bot. |
| 186 | [JamesYasR/dsh-system-notify](https://github.com/JamesYasR/dsh-system-notify) | 0 | 2026-10-27 | 2026-10-27 | Codex-style desktop notifications for DeepSeek Harness: task completion, errors, questions and goals, with configurable events, sound, style, privacy and click-to-focus. Windows &amp; Ubuntu. |
| 187 | [JaMoLpE88/dsh-deepseek-balance](https://github.com/JaMoLpE88/dsh-deepseek-balance) | 0 | 2026-10-27 | 2026-10-27 | DeepSeek Platform balance in the DeepSeek Harness composer: topped-up and granted balance per currency with a click-open details panel. Zero configuration. |
| 188 | [JaMoLpE88/dsh-deepseek-peakoffpeak](https://github.com/JaMoLpE88/dsh-deepseek-peakoffpeak) | 0 | 2026-10-27 | 2026-10-27 | DeepSeek peak/off-peak rate clock in the DeepSeek Harness composer: a live 24-hour tariff bar, local windows, countdown and the official prices. |
| 189 | [jasonjcwu/dsh-plugins](https://github.com/jasonjcwu/dsh-plugins) | 0 | 2026-10-27 | 2026-10-27 | DeepSeek Harness plugins: dsh-wiki-ops (Obsidian LLM-wiki) + dsh-coros (COROS health/training tools) |
| 190 | [Jerry2262/dsh-fingerprint](https://github.com/Jerry2262/dsh-fingerprint) | 0 | 2026-10-20 | 2026-10-27 | Paper-protocol LLM fingerprint capture and comparison for DeepSeek Harness |
| 191 | [JHboy203/dsh-plugin-catalog](https://github.com/JHboy203/dsh-plugin-catalog) | 0 | 2026-10-21 | 2026-10-27 | DSH 侧栏「插件目录」：插件/Skill/MCP 卡片清点 + 90 天调用与报错统计 + 运行期 fiberPhase 对账 + 卡片上卸载/停用/删 SKILL。开发版（非最终版），支持 DSH 0.2.1–0.2.x，不定期更新。 \| DSH sidebar catalog for plugins, Skills and MCP: cards, 90-day call stats, runtime reconciliation, in-panel disposal. Dev build for DSH 0.2.1–0.2.x. |
| 192 | [JHboy203/dsh-plugin-installer](https://github.com/JHboy203/dsh-plugin-installer) | 0 | 2026-10-20 | 2026-10-27 | DSH 侧栏「插件安装」：GitHub 链接 / Release / .tgz / .zip / 本地目录 → 下载→解包→预检→快照→安装→诊断→回滚，安装执行零 token。开发版（非最终版），支持 DSH 0.2.1–0.2.x。 \| DSH sidebar plugin installer: deterministic install pipeline with security precheck, snapshot and rollback. Dev build for DSH 0.2.1–0.2.x. |
| 193 | [JHboy203/dsh-screenshot](https://github.com/JHboy203/dsh-screenshot) | 0 | 2026-10-18 | 2026-10-27 | DSH 截图插件：QQ 同款框选 + 标注 + 离线 OCR 提取文字 + 贴图 + 录屏 + 长截图。Windows 专有（PowerShell/.NET）。开发版（非最终版），支持 DSH 0.2.1–0.2.x。 \| DSH screenshot plugin: QQ-style region capture, annotation, offline OCR, pinning, recording, long screenshots. Windows only. Dev build for DSH 0.2.1–0.2.x. |
| 194 | [JianhangLy/dsh-prompt-boost](https://github.com/JianhangLy/dsh-prompt-boost) | 0 | 2026-10-27 | 2026-10-27 | Prompt enhancement for the DSH Web GUI: turn a short draft into a structured prompt with streaming preview, one-click fill-back, undo, and a settings page |
| 195 | [joeseesun/qiaomu-audio-dsh](https://github.com/joeseesun/qiaomu-audio-dsh) | 0 | 2026-10-27 | 2026-10-27 | Original Qiaomu Audio UI, speech, dictation and media export for DeepSeek Harness |
| 196 | [JonathanChang-alt/dsh-86-startup](https://github.com/JonathanChang-alt/dsh-86-startup) | 0 | 2026-10-27 | 2026-10-27 | 86 -不存在的战区- 主题 DSH 开机动画：短/长版、蕾娜 AI 语音、Para-RAID 启动序列 |
| 197 | [jusong/dsh-codex-pets](https://github.com/jusong/dsh-codex-pets) | 0 | 2026-10-23 | 2026-10-27 | A floating desktop pet for DSH Desktop (macOS): nine official Codex pets, pick one and set its size in Settings. |
| 198 | [kabarryo/dsh-model-usage](https://github.com/kabarryo/dsh-model-usage) | 0 | 2026-10-27 | 2026-10-27 | DSH 模型额度 pill：显示 opencode-go 订阅的 5 小时 / 本周 / 本月用量与重置时间 |
| 199 | [Kaitox326/dsh-alive](https://github.com/Kaitox326/dsh-alive) | 0 | 2026-10-27 | 2026-10-27 | 活人感插件 for DeepSeek Harness：不回、分条节奏、状态外置、脏记忆、差序对待 |
| 200 | [kanjyo-hirako/break_out_of_the_loop](https://github.com/kanjyo-hirako/break_out_of_the_loop) | 0 | 2026-10-27 | 2026-10-27 | 一个面向deepseek harness而设计，旨在解决上下文长度过长时模型陷入恶性的循环调用工具的问题 |
| 201 | [KeinsteinNUS/dsh-speech-polish](https://github.com/KeinsteinNUS/dsh-speech-polish) | 0 | 2026-10-27 | 2026-10-27 | Terminology-aware correction layer for DeepSeek Harness's built-in local speech-to-text. |
| 202 | [kevinx-key/dsh-plugin-read-aloud](https://github.com/kevinx-key/dsh-plugin-read-aloud) | 0 | 2026-10-27 | 2026-10-27 | Read DSH assistant replies or selected text aloud with Microsoft Edge natural voices, Windows SAPI fallback, precise pause/resume, speed control, and a selection context menu. |
| 203 | [keyanc76/dsh-token-console](https://github.com/keyanc76/dsh-token-console) | 0 | 2026-10-27 | 2026-10-27 | 本地只读 AI token 用量与账号额度控制台（DSH / Claude 桌面端 / Codex），可作为 DSH 插件运行 |
| 204 | [kochetkov-ma/brewpage-publish-plugins](https://github.com/kochetkov-ma/brewpage-publish-plugins) | 0 | 2026-10-27 | 2026-10-27 | Host HTML pages and static sites, publish AI artifacts, and share Markdown, documents, reports or any file with BrewPage publishing skills and native adapters. |
| 205 | [kw12121212/writing-anything](https://github.com/kw12121212/writing-anything) | 0 | 2026-09-30 | 2026-10-27 | wa-cli + DSH/ZCode 写作工作区插件 — DeepSeek Harness (DSH) 与 ZCode plugin、面向 Agent 的 AI 写作 CLI |
| 206 | [Law-Of-Cycles/dsh-qq-agency](https://github.com/Law-Of-Cycles/dsh-qq-agency) | 0 | 2026-10-27 | 2026-10-27 | 赋予 AI 伴侣「独立的心灵」与「具身的双手」：自主心智节律、懂分寸的群聊社交、通过 ADB 操作属于它的小手机（看屏幕、点、划、打字、开App、截图分享、安全办事）。走 OneBot 11 HTTP。 |
| 207 | [lemonxiny55/dsh-matlab-workbench](https://github.com/lemonxiny55/dsh-matlab-workbench) | 0 | 2026-10-25 | 2026-10-27 | DSH Desktop MATLAB experiment workbench with verified figures, PID sweeps and comparisons |
| 208 | [lengyeyu123/dsh-stock-ticker](https://github.com/lengyeyu123/dsh-stock-ticker) | 0 | 2026-10-27 | 2026-10-27 | DSH Desktop / DeepSeek Harness 自选股行情插件：侧栏实时报价 + 分时图 + 柱状图，支持 A股/港股/美股 |
| 209 | [LeoGoat2004/dsh-eval-harness](https://github.com/LeoGoat2004/dsh-eval-harness) | 0 | 2026-10-17 | 2026-10-27 | Diagnostic evaluation plugin for the DeepSeek Harness: confirmed harness/model/benchmark gates, hermetic traced episodes, and a standalone HTML report that attributes every failure to model, harness, benchmark, or environment. |
| 210 | [lerwa2025-a11y/dsh-conversation-avatar](https://github.com/lerwa2025-a11y/dsh-conversation-avatar) | 0 | 2026-10-11 | 2026-10-27 | 给 DSH 会话双方各配一张头像，消息左右分列（像好友聊天）；AI 回复带气泡框，头像跟随滚动，吸顶位置可调以避开主题状态栏。 |
| 211 | [lg6169219/dsh-fatfish-level](https://github.com/lg6169219/dsh-fatfish-level) | 0 | 2026-10-27 | 2026-10-27 | 按累计 token 升级的 DSH 大肥鱼等级挂件：14 级 DeepSeek 鲸鱼图标、今日任务、连击与成就。 |
| 212 | [Liao199/dsh-medical-device-skills](https://github.com/Liao199/dsh-medical-device-skills) | 0 | 2026-10-26 | 2026-10-27 | MedXpert medical-device regulatory skills packaged as a DeepSeek Harness (dsh) profile bundle. |
| 213 | [linglanxin/codex-dsh-bridge](https://github.com/linglanxin/codex-dsh-bridge) | 0 | 2026-10-24 | 2026-10-27 | Codex supervises DeepSeek Harness Desktop on Windows: MCP delegation, blocking questions, stage review, revisions and artifact verification. |
| 214 | [Lionad-Morotar/dsh-plugins](https://github.com/Lionad-Morotar/dsh-plugins) | 0 | 2026-10-19 | 2026-10-27 | Lionad's DeepSeek Harness plugin monorepo |
| 215 | [lishize20040802-rgb/dsh-deep-ptc-mode](https://github.com/lishize20040802-rgb/dsh-deep-ptc-mode) | 0 | 2026-10-27 | 2026-10-27 | Deep PTC agent preset for DeepSeek Harness: built-in PTC tooling plus visible progress, confident tool use, and early clarification. |
| 216 | [litongtong256/dsh-automation-monitor](https://github.com/litongtong256/dsh-automation-monitor) | 0 | 2026-10-26 | 2026-10-27 | DSH automation monitor: a read-only "Automations" tab in the conversation view. Shows what runs automatically, when it last ran, when it runs next, and how many tokens it burns. |
| 217 | [liuwenji007/dsh-abstract-store](https://github.com/liuwenji007/dsh-abstract-store) | 0 | 2026-10-27 | 2026-10-27 | An open-source, curated index of the most gloriously absurd DSH plugins — published rubric, editorial verdicts, native install. · 抽象插件名录 |
| 218 | [LLL-lyh0/dsh-autostart](https://github.com/LLL-lyh0/dsh-autostart) | 0 | 2026-10-26 | 2026-10-27 | Windows boot autostart bundle plugin for DeepSeek Harness (dsh): registers the app into HKCU Run on enable, removes it on disable. |
| 219 | [LLL-lyh0/dsh-github-manager](https://github.com/LLL-lyh0/dsh-github-manager) | 0 | 2026-10-26 | 2026-10-27 | GitHub manager plugin for DeepSeek Harness (dsh): sign in to GitHub inside dsh, keep multiple accounts, and let the AI operate your repositories, issues and pull requests. |
| 220 | [lls578/dsh-fish-radar](https://github.com/lls578/dsh-fish-radar) | 0 | 2026-10-27 | 2026-10-27 | DSH 插件：鱼群雷达 - 给 B站 视频评论区做 AI 鱼浓度体检（只读，0-100 分） |
| 221 | [lls578/dsh-plugin-checkup](https://github.com/lls578/dsh-plugin-checkup) | 0 | 2026-10-27 | 2026-10-27 | DSH 插件：插件体检 - 分类/查重/未启用/更新/体积（只读本地） |
| 222 | [lulu23316/dsh-mood](https://github.com/lulu23316/dsh-mood) | 0 | 2026-10-27 | 2026-10-27 | 为 DeepSeek Harness 增加心情引擎与赛博日记的插件 |
| 223 | [luzhenqian/dsh-key-switch](https://github.com/luzhenqian/dsh-key-switch) | 0 | 2026-10-27 | 2026-10-27 | DeepSeek Harness plugin: 多把 API Key 池 + 一键切换 + 每把 key 的实时余额 |
| 224 | [LynnHMa/FK-The-AI](https://github.com/LynnHMa/FK-The-AI) | 0 | 2026-10-27 | 2026-10-27 | AI不听话？乱动项目？Token浪费？那就揍它一顿！ |
| 225 | [MaouXY/dsh-ai-session-title](https://github.com/MaouXY/dsh-ai-session-title) | 0 | 2026-10-27 | 2026-10-27 | AI-generated session titles for DeepSeek Harness: one-click generate inside the session rename dialog. |
| 226 | [MarushiruDonato/dsh-rgb](https://github.com/MarushiruDonato/dsh-rgb) | 0 | 2026-10-27 | 2026-10-27 | DeepSeek Harness RGB effects: composer ring, sidebar rail, session indicator, and glowing brand logo |
| 227 | [matsuriy/dsh-wallpaper-skin](https://github.com/matsuriy/dsh-wallpaper-skin) | 0 | 2026-10-27 | 2026-10-27 | DSH 动态壁纸皮肤插件（大肥鱼版）：mp4/webm 视频或 jpg/png/gif 图片作为 DeepSeek Harness 背景，设置页集成、原生文件选择、遮罩/亮度/底调调节、热切换不重启。（旧仓库，请使用 dsh-wallpaper-fish） |
| 228 | [maxlee/dsh-pen-dev](https://github.com/maxlee/dsh-pen-dev) | 0 | 2026-10-23 | 2026-10-27 | Unofficial pen.dev integration for DeepSeek Harness. |
| 229 | [memoryovo/dsh-codex-session-deletetool](https://github.com/memoryovo/dsh-codex-session-deletetool) | 0 | 2026-10-27 | 2026-10-27 | Real conversation delete for the Codex UI sidebar (DSH plugin): provides remote.workspaceRegistry.deleteSession so @michengai/dsh-codex-ui grows its own 删除会话 row, restores the hidden ... button, and asks before removing subagent/forked conversations. Delete engine derived from better-dsh-session-deletetool. |
| 230 | [meng-lx/dsh-autonomous-restart](https://github.com/meng-lx/dsh-autonomous-restart) | 0 | 2026-10-23 | 2026-10-27 | 由 agent 自己发起的重启：倒计时后确认整机空闲，再唤醒原会话。Agent-initiated restart: counts down, confirms the whole machine is idle, then wakes up the original session. |
| 231 | [Mengnan578/dsh-session-split-view](https://github.com/Mengnan578/dsh-session-split-view) | 0 | 2026-10-27 | 2026-10-27 | Multi-session split view for the DeepSeek Harness Web GUI: up to four live session panes in the conversation panel. |
| 232 | [MikatoMisaka/dsh-desktop-notify](https://github.com/MikatoMisaka/dsh-desktop-notify) | 0 | 2026-10-27 | 2026-10-27 | DSH（DeepSeek Harness）桌面端通知插件：任务完成 / 等待回答时弹 Windows 通知，点通知回到对应会话。 |
| 233 | [ming-14/download-songs-skill](https://github.com/ming-14/download-songs-skill) | 0 | 2026-10-27 | 2026-10-27 | 音乐下载 SKILL |
| 234 | [mingyuemiss/dsh-memory](https://github.com/mingyuemiss/dsh-memory) | 0 | 2026-10-27 | 2026-10-27 | 给 DSH 里的陪伴角色一条不会断的记忆线：近两天快速回忆、艾宾浩斯遗忘曲线、分类检索、分层压缩与 D 盘人生镜像。 |
| 235 | [minrose-314/dsh-fish-hub](https://github.com/minrose-314/dsh-fish-hub) | 0 | 2026-10-27 | 2026-10-27 | QQ/微信多端互通中枢：双桥消息并入同一追加式账本（JSONL 可人审）· 跨端近况查询工具 · 五合一本地总控台 · 端口漂移自适应 · DeepSeek Harness 插件 |
| 236 | [Mizimo/dsh-session-bridge](https://github.com/Mizimo/dsh-session-bridge) | 0 | 2026-10-27 | 2026-10-27 | Cross-session messaging and handoff for DeepSeek Harness (DSH): talk between agents of different sessions, inspect peer logs, and interoperate with a HAPI hub. |
| 237 | [mogragsigma/dsh-dual-host-plugin](https://github.com/mogragsigma/dsh-dual-host-plugin) | 0 | 2026-10-27 | 2026-10-27 | DSH 双端协作插件（大肥鱼 bot）：本地/云端任务协作、审批账本、受控交付与三端文件。npm: @mogragsigma/dsh-dual-host-plugin |
| 238 | [monster-cli/dsh-whileplay](https://github.com/monster-cli/dsh-whileplay) | 0 | 2026-10-27 | 2026-10-27 | Turn AI waiting time into play. Air Battle, Tank Battle &amp; Snake for DeepSeek Harness, with tool-triggered targets, step rewards, and a floating window with minimal mode. 玩一小局，让等待变成游戏。 |
| 239 | [Moon-Cold-Sir/dsh-plugin-star-radar](https://github.com/Moon-Cold-Sir/dsh-plugin-star-radar) | 0 | 2026-10-27 | 2026-10-27 | 插件热度榜：按 GitHub 收藏数排名 DSH 插件，收藏 ≥ 3,000 或近 30 天下载 ≥ 10 万即收录。 |
| 240 | [Mutsum1-WY/dsh-web-search-opencode](https://github.com/Mutsum1-WY/dsh-web-search-opencode) | 0 | 2026-10-27 | 2026-10-27 | DeepSeek Harness 的网页搜索插件：把 web_search 接到 OpenCode Go 订阅，10 个实测模型自动兜底；web_fetch 仍走内置 HTTP 抓取。 |
| 241 | [Mutsum1-WY/dsh-work-chain](https://github.com/Mutsum1-WY/dsh-work-chain) | 0 | 2026-10-27 | 2026-10-27 | DeepSeek Harness 的工作链插件（只保留团队模式）：当前会话当 leader，多个可配置模型成员作为常驻 Agent Teams 队友并行干活，成员名默认取模型名（重名自动 -2、-3）。另附只评审不改文件的审美顾问 aesthetic_advice。 |
| 242 | [muzapar00/united_nation_skin_deepseek_harness](https://github.com/muzapar00/united_nation_skin_deepseek_harness) | 0 | 2026-10-26 | 2026-10-27 | DSH × UN：一个面向 DeepSeek Harness 的联合国风格主题皮肤，支持 WebUI 与桌面 GUI（Linux / macOS / Windows）。内置覆盖上千种语言的母语搜索语言切换器，不改变任何核心功能按键。非商业、社区驱动，致力于让 AI 以每个人的母语抵达每个人。A UN-style skin for DSH with a native-name, searchable language switcher covering 1,000+ languages. Non-commercial,  |
| 243 | [Mzgnk/dsh-bz](https://github.com/Mzgnk/dsh-bz) | 0 | 2026-10-27 | 2026-10-27 | Zero-dependency rule injector for DeepSeek Harness: three-scope rules published as system-reminder, with loop-breaker, dedupe, session persistence, and a settings-panel editor. |
| 244 | [Natte/dsh-todolist](https://github.com/Natte/dsh-todolist) | 0 | 2026-10-22 | 2026-10-27 | DeepSeek Harness 待办插件：侧栏入口行 + 主面板页，宿主侧持久化，agent 可读写 |
| 245 | [NICEGSP/call-map](https://github.com/NICEGSP/call-map) | 0 | 2026-10-27 | 2026-10-27 | DSH plugin: a zoomable attribution map of the skills, MCP tools and subagents a session actually used. |
| 246 | [nickzhangcomes/dsh-markup](https://github.com/nickzhangcomes/dsh-markup) | 0 | 2026-10-25 | 2026-10-27 | DSH Markup · 对话批注与文档审阅：多处批注、评论对话、正文修订，读完带回主会话 |
| 247 | [NingYuanLee/dsh-real-ip](https://github.com/NingYuanLee/dsh-real-ip) | 0 | 2026-10-27 | 2026-10-27 | When web fetch is handed a Clash/sing-box fake-ip, pin the real public address. |
| 248 | [NingYuanLee/dsh-tavily-mcp](https://github.com/NingYuanLee/dsh-tavily-mcp) | 0 | 2026-10-27 | 2026-10-27 | Connect Tavily's remote MCP server to DeepSeek Harness. |
| 249 | [noahchalifour/dsh-anthropic-request-size-guard](https://github.com/noahchalifour/dsh-anthropic-request-size-guard) | 0 | 2026-10-02 | 2026-10-27 | DeepSeek Harness plugin: shrink oversized Claude requests so they never fail with HTTP 413 request_too_large |
| 250 | [NoneadChina/dsh-nonead-prompt-recall](https://github.com/NoneadChina/dsh-nonead-prompt-recall) | 0 | 2026-10-27 | 2026-10-27 | A DeepSeek Harness plugin that gives the composer shell-style **prompt history recall**.  Current version: **0.6.1**.  - Press **↑** in an empty composer to load the last prompt you sent; - press **↑** again to walk further back; - press **↓** to walk forward and finally return to the empty draft; |
| 251 | [nszm/dsh-pet-lingchong](https://github.com/nszm/dsh-pet-lingchong) | 0 | 2026-10-27 | 2026-10-27 | 灵宠福境 · DSH 桌宠：可拖动的猫/金毛/水豚浮在整屏浮层上，轻叩蓄能、表情、打盹、合成音效；支持导入照片(2.5D)或 GLB(真 3D)，可投到 Windows 桌面做独立挂件窗。Desktop pet for DSH with photo &amp; GLB import. |
| 252 | [O-OII/dsh-planner-executor](https://github.com/O-OII/dsh-planner-executor) | 0 | 2026-10-26 | 2026-10-27 | DSH 主从协作：主代理规划、决策与验收，支持通用 API 子代理执行、活动视图和安全模型接入。 |
| 253 | [O-OII/dsh-session-alerts](https://github.com/O-OII/dsh-session-alerts) | 0 | 2026-10-26 | 2026-10-27 | DSH 会话提醒：逐会话未读角标与原生侧栏已完成会话筛选，帮助快速找回已结束的主会话。 |
| 254 | [oxmumu3/dot-dsh-connector](https://github.com/oxmumu3/dot-dsh-connector) | 0 | 2026-10-23 | 2026-10-27 | Dot → DeepSeek Harness 原生插件：读取项目、派发任务、跟进结果。奥克斯木木山。 |
| 255 | [oxmumu3/dsh-project-companion](https://github.com/oxmumu3/dsh-project-companion) | 0 | 2026-10-19 | 2026-10-27 | DeepSeek Dot：长在微信里的 DeepSeek Harness 项目助理，项目记忆、只读跟进与明确交办。Community preview, MIT. |
| 256 | [Pegasus02/dsh-siri](https://github.com/Pegasus02/dsh-siri) | 0 | 2026-10-27 | 2026-10-27 | Talk to DeepSeek Harness with Siri and iPhone Shortcuts. 用 Siri 和 iPhone 快捷指令对话 DeepSeek Harness。 |
| 257 | [phoushen/dsh-rea-toggle](https://github.com/phoushen/dsh-rea-toggle) | 0 | 2026-10-27 | 2026-10-27 | A GUI switch for the REA MCP server in DeepSeek Harness — turn its 229 mcp__rea__* tools on or off, so unrelated chats stop paying their context cost. |
| 258 | [Pingze-github/dshdesk](https://github.com/Pingze-github/dshdesk) | 0 | 2026-10-27 | 2026-10-27 | Read-only four-column attention board for DeepSeek Harness, with a true always-on-top Windows companion window. |
| 259 | [PlasmaPerfuma/dsh-notify-card](https://github.com/PlasmaPerfuma/dsh-notify-card) | 0 | 2026-10-05 | 2026-10-27 | Standalone approval window for DeepSeek Harness — pops up when you're away, hands back to DSH's native card when you return, follows your DSH theme |
| 260 | [PopCapEA/dsh-skill-studio](https://github.com/PopCapEA/dsh-skill-studio) | 0 | 2026-10-27 | 2026-10-27 | Enable DSH to support Skills |
| 261 | [prgrmrwy/dsh-magpie-connector](https://github.com/prgrmrwy/dsh-magpie-connector) | 0 | 2026-10-27 | 2026-10-27 | DeepSeek Harness plugin: connect a self-hosted Magpie gateway as one LLM provider with models grouped by upstream provider, read-only usage cards, model visibility, default effort and per-session fast mode |
| 262 | [qiaoda2021/dsh-doctor](https://github.com/qiaoda2021/dsh-doctor) | 0 | 2026-10-26 | 2026-10-27 | 给 DSH 做体检，告诉你哪里有问题；你确认后再备份和修复。 |
| 263 | [qinu321/dsh-session-rename](https://github.com/qinu321/dsh-session-rename) | 0 | 2026-10-27 | 2026-10-27 | Lets an AI rename its own session in DeepSeek Harness — a zero-dependency plugin that adds the session_rename tool. |
| 264 | [qipengxiang/dsh-chat-actions](https://github.com/qipengxiang/dsh-chat-actions) | 0 | 2026-10-20 | 2026-10-27 | Hide, reorder or show each button under an assistant reply in DeepSeek Harness |
| 265 | [qipengxiang/dsh-enter-combination](https://github.com/qipengxiang/dsh-enter-combination) | 0 | 2026-10-21 | 2026-10-27 | Rebind the composer's send and newline keys in DeepSeek Harness — Enter sends, Cmd/Ctrl+Enter breaks the line by default. |
| 266 | [QIUZAIYOU/dsh-composer-rewind](https://github.com/QIUZAIYOU/dsh-composer-rewind) | 0 | 2026-10-27 | 2026-10-27 | Composer input history for the DeepSeek Harness Web UI — restores text, attachments, references, commands and the DSH setup you used. |
| 267 | [qnosuke/dsh-whale-widget-ja](https://github.com/qnosuke/dsh-whale-widget-ja) | 0 | 2026-10-27 | 2026-10-27 | 非公式: DSH の小鲸鱼ウィジェット (dsh-whale-widget) を日本語 + 日本円表示にするパッチ / Unofficial Japanese localization + JPY patch |
| 268 | [que2333/dsh-agent-features](https://github.com/que2333/dsh-agent-features) | 0 | 2026-10-27 | 2026-10-27 | Codex-style agent features and configuration for DeepSeek Harness |
| 269 | [r-ayin/dsh-weneed-bootstrap](https://github.com/r-ayin/dsh-weneed-bootstrap) | 0 | 2026-10-27 | 2026-10-27 | Two-phase 'We need' chain-of-thought anchoring: the session's first turn uses a minimal reasoning protocol, promoted back to the full prompt after the first tool call; gated per preset prefix. |
| 270 | [railgun20001/dsh-session-status-hub](https://github.com/railgun20001/dsh-session-status-hub) | 0 | 2026-10-26 | 2026-10-27 | Session status hub for DeepSeek Harness: a top-titlebar rail of running / waiting / unread / failed Sessions, Windows toast notifications, and a red-yellow-green taskbar status dot. |
| 271 | [ramwin/dsh-workspace-tree-status](https://github.com/ramwin/dsh-workspace-tree-status) | 0 | 2026-10-27 | 2026-10-27 | DSH Web 插件：工作区树目录行显示聚合会话状态点（等待输入/刚完成/运行中），父文件夹自动汇总嵌套工作区的会话状态。Aggregated session status dots on DSH Web's workspace-tree folder rows. |
| 272 | [recued/dsh-recued](https://github.com/recued/dsh-recued) | 0 | 2026-10-27 | 2026-10-27 | Connects DeepSeek Harness to your own Recued server over MCP. |
| 273 | [reg4916/dsh-bar](https://github.com/reg4916/dsh-bar) | 0 | 2026-10-27 | 2026-10-27 | Animated whale in the macOS menu bar for DeepSeek Harness: live session state, approvals, stop and open-session. |
| 274 | [reg4916/dsh-doc-reader](https://github.com/reg4916/dsh-doc-reader) | 0 | 2026-10-27 | 2026-10-27 | Read PDF/DOCX/XLSX/PPTX documents and OCR scans as agent tools for DeepSeek Harness (dsh). |
| 275 | [regrevia/dsh-mobile-use](https://github.com/regrevia/dsh-mobile-use) | 0 | 2026-10-27 | 2026-10-27 | 真机调试插件 for DeepSeek Harness：界面文本树、动效量化、实时画面侧栏与标注 |
| 276 | [Reyzhiai/dsh-memory-console](https://github.com/Reyzhiai/dsh-memory-console) | 0 | 2026-10-26 | 2026-10-27 | Memory console for DeepSeek Harness: browse, edit, search and health-check Markdown memory files in the Web UI, with an editable required-files list injected into the system prompt every turn. |
| 277 | [saichao/dsh-clickhouse](https://github.com/saichao/dsh-clickhouse) | 0 | 2026-10-27 | 2026-10-27 | ClickHouse query tools for DSH / DeepSeek Harness: schema exploration plus guarded read-only SQL. 带只读护栏的 ClickHouse 数据问答插件，零运行时依赖。 |
| 278 | [sailina-afk/cyrene-balance-widget](https://github.com/sailina-afk/cyrene-balance-widget) | 0 | 2026-10-26 | 2026-10-27 | Cyrene balance widget for DSH (DeepSeek Harness): full-screen opening animation, time-aware greeting voice, 9 sticker interaction bubbles, balance / spend / peak-hour panel. |
| 279 | [sakikoTGW/dsh-plugin-resolver-dshgo](https://github.com/sakikoTGW/dsh-plugin-resolver-dshgo) | 0 | 2026-10-27 | 2026-10-27 | dsh-plugin-resolver 的 dsh-go 手机 harness 适配版：原生卡片、镜像/GitHub 代理回退、deep 校验；含两轮消融数据与 6 条问题记录 |
| 280 | [sakikoTGW/dsh-plugin-tailor](https://github.com/sakikoTGW/dsh-plugin-tailor) | 0 | 2026-10-27 | 2026-10-27 | Tailor a repository to fit: 8-dimension maturity audit, 7 README styles, bilingual drafts, deterministic brand assets, pre-release verification. DSH plugin. |
| 281 | [sarate-s/dsh-whale-widget-dual](https://github.com/sarate-s/dsh-whale-widget-dual) | 0 | 2026-10-27 | 2026-10-27 | 小鲸鱼双模式 DSH 插件：web 页面 overlay + desktop Electron 桌宠（display 控制） |
| 282 | [sergey-akhalkov/dsh-setup](https://github.com/sergey-akhalkov/dsh-setup) | 0 | 2026-10-25 | 2026-10-27 | Portable DeepSeek Harness setup: nine installable agent plugins for rules, skills, MCP tools, and cross-model delegation, plus a one-command installer and a plugin-market index. |
| 283 | [shuiyujinlan/dsh-session-tags](https://github.com/shuiyujinlan/dsh-session-tags) | 0 | 2026-10-27 | 2026-10-27 | Tag DeepSeek Harness sessions across workspaces and browse them as a colored, collapsible tag tree in the left sidebar. |
| 284 | [SilenZerOrz/taskboard-workbench](https://github.com/SilenZerOrz/taskboard-workbench) | 0 | 2026-10-27 | 2026-10-27 | 本地优先的多项目任务看板：需求拆解 → 看板派发 → agent 真跑 → 证据回流 → 人工验收 |
| 285 | [sldmn233/dsh-profile-share](https://github.com/sldmn233/dsh-profile-share) | 0 | 2026-10-27 | 2026-10-27 | Exports selected DSH plugins as one pasteable share code, applies the delta on another machine, and reports which credentials still need configuring. |
| 286 | [smwyylc/dsh-work-diary](https://github.com/smwyylc/dsh-work-diary) | 0 | 2026-10-26 | 2026-10-27 | DSH daily work diary plugin - reads the day's sessions and generates a work summary |
| 287 | [Sodapopper-pixel/dsh-tool-fold](https://github.com/Sodapopper-pixel/dsh-tool-fold) | 0 | 2026-10-27 | 2026-10-27 | 把一批已注册工具折叠成一个查询工具：需要时展开直调，或交给聚合组代执行。Fold registered tools out of the model-visible surface and reveal or proxy them on demand. |
| 288 | [stevenzhao07/medxpert-reg-hub](https://github.com/stevenzhao07/medxpert-reg-hub) | 0 | 2026-10-27 | 2026-10-27 | Medical-device global regulatory compliance skill hub (Agent Skills): NMPA/FDA/MDR/PMDA pathways &amp; classification, UDI/STED/clinical, CLI + MCP + DSH plugin. 医械全球注册合规技能聚合包（20 枢纽+48 实例实测+CLI+MCP+DSH 插件） |
| 289 | [sun04222/dsh-skill-picker](https://github.com/sun04222/dsh-skill-picker) | 0 | 2026-10-27 | 2026-10-27 | DeepSeek Harness 插件：输入框「Skill」按钮列出当前会话可用 skill，↑↓ 选择、回车即在光标处插入 /name，走官方斜杠命令链路，不用记命令名。 |
| 290 | [sutanglime/dsh-companion-memory](https://github.com/sutanglime/dsh-companion-memory) | 0 | 2026-10-27 | 2026-10-27 | Companion-AI hot/cold memory for DeepSeek Harness: auto dialogue archive, graduated cooling, cue-gated recall, 1600-token memory snapshot. ｜ 陪伴 AI 冷热分层记忆：全自动归档 + 渐进冷存 + 线索召回。 |
| 291 | [sxwpskd/dsh-milieu](https://github.com/sxwpskd/dsh-milieu) | 0 | 2026-10-19 | 2026-10-27 | dsh-milieu插件开发仓库 |
| 292 | [SyaJask/dsh-2sidebar](https://github.com/SyaJask/dsh-2sidebar) | 0 | 2026-10-24 | 2026-10-27 | Split-pane file browser for the DeepSeek Harness (DSH) right sidebar: directory tree + file preview side by side. 为 DSH 右侧栏提供左目录树 + 右文件内容的并排视图。 |
| 293 | [T-MS-Reyes/dsh-DSTuber](https://github.com/T-MS-Reyes/dsh-DSTuber) | 0 | 2026-10-26 | 2026-10-27 | 一个live2d桌宠伙伴，陪伴您的dsh工作与生活。 |
| 294 | [TaoCultivator/dsh-sidenote](https://github.com/TaoCultivator/dsh-sidenote) | 0 | 2026-10-27 | 2026-10-27 | Follow the tangent. Keep the thread. Annotate, explore on the side, and bring answers back to DeepSeek Harness. / 思路可以分岔，主线始终向前。划选注释、侧边追问，再把结论带回正在推进的任务。 |
| 295 | [Tests4gptplay/deepseek-servant](https://github.com/Tests4gptplay/deepseek-servant) | 0 | 2026-10-24 | 2026-10-27 | 基于 DeepSeek Harness 的自主 AI 助理插件，支持目标规划、持续执行、多 Agent 协作、任务接续、故障恢复与技能学习。 |
| 296 | [Tests4gptplay/dsh-compaction-selector](https://github.com/Tests4gptplay/dsh-compaction-selector) | 0 | 2026-10-27 | 2026-10-27 | 压缩选择器：为 DeepSeek Harness 选择压缩模型与额外按需压缩次数，Auto 跟随对话模型。 |
| 297 | [The932/dsh-session-delete](https://github.com/The932/dsh-session-delete) | 0 | 2026-10-27 | 2026-10-27 | Delete sessions from the DeepSeek Harness Web sidebar: a menu action plus a confirmation dialog that removes the session log. |
| 298 | [TheCarey/Dsh-astrbot-memory-bridge](https://github.com/TheCarey/Dsh-astrbot-memory-bridge) | 0 | 2026-10-27 | 2026-10-27 | Read-only one-way bridge: AstrBot companion memory → DSH (system prompt injection + retrieval tools) |
| 299 | [theRMM714/git-for-dsh](https://github.com/theRMM714/git-for-dsh) | 0 | 2026-10-24 | 2026-10-27 | deepseek harness的git工具 |
| 300 | [theRMM714/llm-for-dsh](https://github.com/theRMM714/llm-for-dsh) | 0 | 2026-10-24 | 2026-10-27 | 帮助dsh处理llm相关问题 |
| 301 | [tiamxiao/dsh-screenshot](https://github.com/tiamxiao/dsh-screenshot) | 0 | 2026-10-27 | 2026-10-27 | 微信/QQ 风格截图：隐藏窗口或直接截图，框选标注，自动保存到 图片\\Screenshots 并复制到剪贴板。 |
| 302 | [trid11111-arch/dsh-infer-kit](https://github.com/trid11111-arch/dsh-infer-kit) | 0 | 2026-10-26 | 2026-10-27 | Inference toolkit for DeepSeek Harness — semantic cache, draft cascade, and JSON validation |
| 303 | [Trisia/dsh-dafeiyu-notice](https://github.com/Trisia/dsh-dafeiyu-notice) | 0 | 2026-10-27 | 2026-10-27 | 大肥鱼你做完了就叫我 |
| 304 | [umerkhalid204/dsh-plugin-local-llm](https://github.com/umerkhalid204/dsh-plugin-local-llm) | 0 | 2026-10-27 | 2026-10-27 | DeepSeek Harness plugin: run the agent on local engines - LM Studio, Ollama, Strata, Lemonade Server, or any OpenAI-compatible endpoint - as provider routes you pick in the model selector. |
| 305 | [V01d-Project/dsh-chaos-plugins](https://github.com/V01d-Project/dsh-chaos-plugins) | 0 | 2026-10-27 | 2026-10-27 | Four mutually recursive DSH plugins: crash when codex / Claude Code is found, repair the crash, crash on the repair, repair that. Joke project - read the warnings. |
| 306 | [vlln/dsh-motion](https://github.com/vlln/dsh-motion) | 0 | 2026-10-21 | 2026-10-27 | 用一句话做出动画：Agent 把镜头写成代码，逐帧可复现的 MP4。dsh 插件。 |
| 307 | [waenny/dsh-qoder-input](https://github.com/waenny/dsh-qoder-input) | 0 | 2026-10-27 | 2026-10-27 | Adds a one-click prompt-rewrite button to the DeepSeek Harness chat composer. |
| 308 | [wanghs09/dsh-plugin-kindle-book](https://github.com/wanghs09/dsh-plugin-kindle-book) | 0 | 2026-10-27 | 2026-10-27 | 把网页新闻抓成 EPUB/AZW3：Web 界面粘贴链接即可编书，同时向 Agent 提供一个 kindle_book 工具。 |
| 309 | [white-source/dsh-xiaoqi-pet](https://github.com/white-source/dsh-xiaoqi-pet) | 0 | 2026-10-27 | 2026-10-27 | Xiaoqi Desk Pet — a DSH companion with a real macOS desktop pet, task-specific progress, checklist steps and notices. |
| 310 | [Wildmess/dsh-novel-buddy](https://github.com/Wildmess/dsh-novel-buddy) | 0 | 2026-10-27 | 2026-10-27 | 番茄小说陪读吐槽插件：抓正文（自动破解字体反爬）+ 剧情整理 + 毒舌点评，让 DSH 里的鱼陪你追书 |
| 311 | [Willmylife/dsh-event-gate](https://github.com/Willmylife/dsh-event-gate) | 0 | 2026-10-27 | 2026-10-27 | Event-driven trigger plugin for DeepSeek Harness: file watchers and local webhooks wake a target session and inject a rendered prompt. 事件驱动触发器（门铃）。 |
| 312 | [wingoflan/dsh-subagent-marker](https://github.com/wingoflan/dsh-subagent-marker) | 0 | 2026-10-25 | 2026-10-27 | Marks the composer of a subagent session in DeepSeek Harness, so you can tell at a glance whether you are typing to a subagent. |
| 313 | [wisp-science/WispOps](https://github.com/wisp-science/WispOps) | 0 | 2026-10-27 | 2026-10-27 | WispOps (dsh-wisp-ops): multi-host server operations plugin for DeepSeek Harness — fleet inspection, disk &amp; recent-file analysis with omics cleanup advice, security triage, scheduled per-server reports, human-approved sudo |
| 314 | [wlyzqm/DSH-WebSocket2HTTP](https://github.com/wlyzqm/DSH-WebSocket2HTTP) | 0 | 2026-10-27 | 2026-10-27 | 魔改DSH链路传输协议层从Websocket到HTTP，解决部分网络环境无法使用Websocket的问题。 |
| 315 | [wlyzqm/DSH-Window-Title](https://github.com/wlyzqm/DSH-Window-Title) | 0 | 2026-10-27 | 2026-10-27 | 修改DSH前端的网页标题，用于在多机远程开发环境下通过窗体标题快速区分设备。 |
| 316 | [wsj895490208/dsh-conversation-bridge](https://github.com/wsj895490208/dsh-conversation-bridge) | 0 | 2026-10-27 | 2026-10-27 | DeepSeek web JSON to resumable Harness sessions: native rolling compaction and isolated local retrieval. |
| 317 | [wufeng0105/dsh-purge-desktop](https://github.com/wufeng0105/dsh-purge-desktop) | 0 | 2026-10-27 | 2026-10-27 | DeepSeek Harness 插件：把宿主拦截与模型拒绝分开，用可复算的方式改造官方桌面端（设置页五页签 + 演练台） |
| 318 | [wxsimon2022/metaontic-video-agent](https://github.com/wxsimon2022/metaontic-video-agent) | 0 | 2026-10-27 | 2026-10-27 | DeepSeek Harness agent preset: 视频导演 — write a script, get human confirmation, then generate with MetaOnticVideo/Seedance. |
| 319 | [wysxxx/dsh-account-identity](https://github.com/wysxxx/dsh-account-identity) | 0 | 2026-10-27 | 2026-10-27 | Custom sidebar name and locally cropped avatar for DeepSeek Harness. |
| 320 | [wzysbkzsd/dsh-whale-voyage](https://github.com/wzysbkzsd/dsh-whale-voyage) | 0 | 2026-10-27 | 2026-10-27 | A companion that watches your agent and turns waiting into collecting. Pure observer, zero tokens. |
| 321 | [xevil3301/dsh-chatlock](https://github.com/xevil3301/dsh-chatlock) | 0 | 2026-10-26 | 2026-10-27 | DSH 聊天锁 / 保险箱：给会话上密码锁，把目录加密成保险箱 |
| 322 | [xiao-hans/dsh-qwen-connect](https://github.com/xiao-hans/dsh-qwen-connect) | 0 | 2026-10-26 | 2026-10-27 | DeepSeek Harness (DSH) 插件：零配置复用千问办公（QwenWorkCN）桌面 App 的登录态，把它注册为 DSH 模型 Provider，支持流式对话、工具调用、图片输入与实时积分读数，无需 API Key。A DSH plugin that reuses your QwenWorkCN desktop login as a model provider — streaming, tool calls, image input and live credits, no API key. |
| 323 | [xiao-hans/dsh-session-auto-archive](https://github.com/xiao-hans/dsh-session-auto-archive) | 0 | 2026-10-27 | 2026-10-27 | DeepSeek Harness（DSH）插件：按闲置天数自动归档会话，补齐 DSH 只有手动 Archive 的缺口。支持演练模式、置顶保护、排除清单、审计日志与逐条撤销，归档走原生状态，不删任何数据。A DSH plugin that auto-archives idle sessions after a configurable number of days — dry-run mode, pinned-session protection, exclusion list, audit log and per-item undo, using DSH native archive state. |
| 324 | [xiaotuchu/dsh-file-tree](https://github.com/xiaotuchu/dsh-file-tree) | 0 | 2026-10-27 | 2026-10-27 | File Tree for DSH — a workspace file tree beside the native preview panel. |
| 325 | [Xieddenv/dsh-memory-kit](https://github.com/Xieddenv/dsh-memory-kit) | 0 | 2026-10-27 | 2026-10-27 | 给 DSH 机器人装五层记忆：人设/规矩/日记/会话存档/未了结的约定 —— 重置不失忆，装完就灵。 |
| 326 | [Xunflash/dsh-grok-build-policy](https://github.com/Xunflash/dsh-grok-build-policy) | 0 | 2026-10-27 | 2026-10-27 | DeepSeek Harness plugin that adds Grok Build working rules when a Grok model is selected. |
| 327 | [xwzkj/dsh-audio-alert](https://github.com/xwzkj/dsh-audio-alert) | 0 | 2026-10-26 | 2026-10-27 | 适用于linux服务器+网页版dsh的会话状态提醒插件，通过服务器连接的音频设备发声来提醒用户，无需打开网页端即可得知最新进展！ |
| 328 | [xxxxxs-ssdd/class_choice_system](https://github.com/xxxxxs-ssdd/class_choice_system) | 0 | 2026-10-27 | 2026-10-27 | class_choice_system |
| 329 | [yanghongqiang3/dsh-plugin-market-selfhosted](https://github.com/yanghongqiang3/dsh-plugin-market-selfhosted) | 0 | 2026-10-27 | 2026-10-27 | A self-hosted, internal DSH plugin marketplace supporting plugin publishing, discovery, distribution, access control, and plugin recall/retrieval. |
| 330 | [Yangluo-2021/dsh-restart-button](https://github.com/Yangluo-2021/dsh-restart-button) | 0 | 2026-10-27 | 2026-10-27 | DSH 右上角常驻重启按钮：优雅重启 DeepSeek Harness 桌面端，有任务在跑时才确认。 |
| 331 | [yann9/dsh-git-workbench](https://github.com/yann9/dsh-git-workbench) | 0 | 2026-10-26 | 2026-10-27 | JetBrains-style Git workbench plugin for DeepSeek Harness: hunk/line staging, side-by-side diff, commit graph, three-way conflict view. |
| 332 | [yaqiangsun/dsh-plugin-search](https://github.com/yaqiangsun/dsh-plugin-search) | 0 | 2026-10-27 | 2026-10-27 | Search DSH plugins on the npm registry by a name fragment and install them from the Plugins page. |
| 333 | [Yocaihua8/dsh-prompt-improver](https://github.com/Yocaihua8/dsh-prompt-improver) | 0 | 2026-10-27 | 2026-10-27 | DSH 提示词增强：按需结合对话、记忆和项目片段增强草稿，支持预览、专用模型与安全撤销。 |
| 334 | [youchen-yc/dsh-heartprint](https://github.com/youchen-yc/dsh-heartprint) | 0 | 2026-10-26 | 2026-10-27 | 心印：AI 性格、情感 |
| 335 | [youchen-yc/dsh-plugin-ecosystem-guard](https://github.com/youchen-yc/dsh-plugin-ecosystem-guard) | 0 | 2026-10-27 | 2026-10-27 | DSH 插件生态守护：安装前冲突预检 + 跨插件权限网关 + 确认制维护（DeepSeek Harness 插件） |
| 336 | [youchen-yc/dsh-system-guard](https://github.com/youchen-yc/dsh-system-guard) | 0 | 2026-10-27 | 2026-10-27 | System guard plugin for DeepSeek Harness: classifies core system files and junk, keeps a hidden backup, patrols integrity, restores damaged files. |
| 337 | [yueyexiayu/dsh-bingxing](https://github.com/yueyexiayu/dsh-bingxing) | 0 | 2026-10-27 | 2026-10-27 | DeepSeek Harness 本地 Host 插件：只给已注册 grep/glob 补并发声明，使同一步只读搜索可真正并行。 |
| 338 | [yueyexiayu/dsh-gongjuyasuo](https://github.com/yueyexiayu/dsh-gongjuyasuo) | 0 | 2026-10-27 | 2026-10-27 | DeepSeek Harness 本地工具上下文交接插件：检查点、可恢复原文外置与保守保护。 |
| 339 | [yueyexiayu/dsh-piliang](https://github.com/yueyexiayu/dsh-piliang) | 0 | 2026-10-27 | 2026-10-27 | DeepSeek Harness 本地 Host 插件：注册 multi_edit，同文件多处字面替换一次完成，任一项失败则整批不写盘。 |
| 340 | [yueyexiayu/dsh-promote](https://github.com/yueyexiayu/dsh-promote) | 0 | 2026-10-27 | 2026-10-27 | DSH desktop plugin: secondary-model read-only review of execution contracts, plus the prompt/promote skill. |
| 341 | [Yukolike/dsh-qq-rooms](https://github.com/Yukolike/dsh-qq-rooms) | 0 | 2026-10-27 | 2026-10-27 | QQ rooms for DSH: chat = room, whitelist/blacklist, group mention. Based on dsh-qq-bridge (MIT). |
| 342 | [YunoSeng/dsh-ensp](https://github.com/YunoSeng/dsh-ensp) | 0 | 2026-10-27 | 2026-10-27 | 让 AI 直接开华为 eNSP 做网络实验的 DSH 插件：批量 GUI 驱动 + telnet 下发 + .topo 读写 + 实验报告生成 |
| 343 | [yutaosheng004-bit/dsh-cot-flow](https://github.com/yutaosheng004-bit/dsh-cot-flow) | 0 | 2026-10-27 | 2026-10-27 | Streaming-friendly rendering for expanded reasoning (thinking) text in DeepSeek Harness: incremental segmentation, finalized-paragraph memoization, light typographic clean-up. |
| 344 | [z-y-q/dsh-git-panel](https://github.com/z-y-q/dsh-git-panel) | 0 | 2026-10-27 | 2026-10-27 | dsh-git管理插件 |
| 345 | [zengpu987-ctrl/dsh-deep-connect](https://github.com/zengpu987-ctrl/dsh-deep-connect) | 0 | 2026-10-17 | 2026-10-27 | Cross-device session/task sync for DeepSeek Harness (DSH): same-account installs meet through a self-hosted cloud relay, E2E encrypted, relay sees ciphertext only. |
| 346 | [zer0kara/dsh-spark-monitor](https://github.com/zer0kara/dsh-spark-monitor) | 0 | 2026-10-27 | 2026-10-27 | DSH plugin: monitor DGX Spark temperature &amp; memory usage, set GPU clock.  |
| 347 | [ZhaoChongyan/dsh-chat-message-export](https://github.com/ZhaoChongyan/dsh-chat-message-export) | 0 | 2026-10-27 | 2026-10-27 | 为DSH客户端加入了对话内容导出按钮 |
| 348 | [ZhaoChongyan/dsh-markdown-export](https://github.com/ZhaoChongyan/dsh-markdown-export) | 0 | 2026-10-27 | 2026-10-27 | 为dsh客户端markdown预览界面加入了导出为HTML/PDF的功能 |
| 349 | [ZhaoZiyangShaanxi/dsh-test-guard](https://github.com/ZhaoZiyangShaanxi/dsh-test-guard) | 0 | 2026-10-27 | 2026-10-27 | Test-aware code review, coverage gating, and LLM routing for DeepSeek Harness. |
| 350 | [Zhishulo/dsh-rea-powerpack](https://github.com/Zhishulo/dsh-rea-powerpack) | 0 | 2026-10-27 | 2026-10-27 | Maxed-out REA (reverse engineering agent) for DeepSeek Harness: 13 managed analysis engines, pinned MCP tool server, capability doctor, settings UI. |
| 351 | [ZilongYang/dsh-multiline-input](https://github.com/ZilongYang/dsh-multiline-input) | 0 | 2026-10-27 | 2026-10-27 | Single/multi-line composer toggle for DeepSeek Harness: editable Cmd/Ctrl+E shortcut, a tab hint on the composer, a 4-line floor, and Shift+Enter to send. |
| 352 | [Ziminli/dsh-session-search](https://github.com/Ziminli/dsh-session-search) | 0 | 2026-10-27 | 2026-10-27 | Ctrl+F conversation search for DeepSeek Harness: all sessions or one session, regex and grouped results. |
| 353 | [Zorien-ai/dsh-jev-highlight](https://github.com/Zorien-ai/dsh-jev-highlight) | 0 | 2026-10-27 | 2026-10-27 | DSH plugin that highlights the most important AI answer content with StartLux/Jev decision models, using the CSS Custom Highlight API without touching the agent DOM. |
| 354 | [zrrrrrrr77/dsh-print-screen](https://github.com/zrrrrrrr77/dsh-print-screen) | 0 | 2026-10-16 | 2026-10-27 | ZR's wangzhan for dsh-print screen |
| 355 | [zrzrv5/dsh-slop](https://github.com/zrzrv5/dsh-slop) | 0 | 2026-10-27 | 2026-10-27 | Machine, Knowledge and Queue for DeepSeek Harness: reusable SSH access and HPC job monitoring. |
| 356 | [zzzzym7018/dsh-fudan-status-wallpaper](https://github.com/zzzzym7018/dsh-fudan-status-wallpaper) | 0 | 2026-10-27 | 2026-10-27 | 复旦 · 状态栏 &amp; 壁纸 — DeepSeek Harness quota, weather status bar and campus wallpaper plugin |

## 从快照消失的已核准仓库 / Approved repositories missing from the snapshot

已核准但已不在当前快照中（删除或改名），核实后从 [data/approved.json](../approved.json) 移除或更新名称。

Approved but no longer present in the current snapshot (deleted or renamed) — after checking, remove them from [data/approved.json](../approved.json) or update the name.

- 01men/RQ-DSH
- 241793/DSH-Win-GUI
- AlexKaiqi/dsh-block-to-file
- AlexKaiqi/dsh-multi-model-provider
- AlexKaiqi/dsh-realtime-voice
- AlexKaiqi/dsh-session-assistant
- AlexKaiqi/dsh-temporary-workspace
- broody-cascarillabark100/DeepSeek-Harness-Desktop
- CaffeineOddity/dsh-plugins
- Capacious-diamondweddinganniversary929/DeepSeekHarnessDesktop
- Cieux/dsh-zoom-scale
- dingchenhui0618-arch/dsh-in-hand-relay
- dinjufen/dsh-next-prompt
- Failing-coachman563/dsh-skill-viewer
- guhanfei-ai/dsh-introspect
- just-liuyi/dsh-plugin-versions
- kaiqiangh/dsh-workshpace-plugin
- Kiru-Sama/kiru-progress-bar
- lyufeng000/dsh-persona-cards
- meng-lx/dsh-auto-restart
- Nekomeow114/dsh-tieba-scroll
- nickzhangcomes/dsh-doc-review
- Pericardiac-podzolsoil527/deepseek-plugin-store
- tkctly/dsh-auto-continue
- Tony250-officeteam/dsh-copy-file-button
- Tony250-officeteam/dsh-page-reload
- Tony250-officeteam/dsh-voice-hotkey
- Untidy-cocoabutter173/Flowboard
- xiangrui979/foresight
- yuanshuoSY/dsh-coder-preset
