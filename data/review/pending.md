# 待审核仓库 / Pending review

> 新增到 `dsh-plugin` Topic 下、带有简介、尚未经维护者核实的仓库。本文件由 `scripts/update.mjs` 每日刷新，仅供审核使用，不是用户可见页面。
>
> Repositories newly added to the `dsh-plugin` topic that the maintainer has not verified yet. Refreshed daily by `scripts/update.mjs`; review-only, not a user-facing page.

- 生成时间 / Generated: **2026-10-11**
- 快照日期 / Snapshot date: **2026-10-11 (UTC)**
- 待审核 / Pending: **155**
- 从快照消失的已核准仓库 / Approved repositories missing from the snapshot: **24**
- Star 异常增长 / Star-growth alerts: **6** — 先看下方告警节 / see the alert section first

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

对比上一份快照 **2026-10-10** / vs previous snapshot **2026-10-10**。规则：日增 ≥100★；已核准仓新入 Top 200（且 Δ≥50）/ 名次跃升 ≥50 / 冲入 Top 20；待审仓 ≥100★ 且核准后将进入 Top 200。

- 看 Star 是否与 fork、提交活跃度、仓库年龄匹配（高星零 fork、创建当天几百星，多为刷星）
- 是否把已有高星的通用项目贴上 `dsh-plugin` Topic 蹭榜——插件本身可进目录，但应加入 `leaderboard_exclusions`，理由写清 stars accrued as …
- 待审仓若核准会直接冲进 Top 20 / Top 200，先确认热度来自 **DSH 插件本身**
- 已核准仓的异常跃升：确认后同样可记入 `leaderboard_exclusions`，不必下架目录

Check stars against forks, commit activity and age (hundreds of stars on day one, or high stars with zero forks, usually look bought). A generic high-star project that only just tagged `dsh-plugin` can stay in the catalog but should go to `leaderboard_exclusions` (reason: stars accrued as …). If approving a pending repo would drop it into Top 20 / Top 200, confirm the audience is the DSH plugin itself.

- 告警数 / Alerts: **6**

| Project | Queue | Stars | Δ | Forks | Age | Signals | 审核提示 / Hint |
| --- | --- | ---: | ---: | ---: | ---: | --- | --- |
| ⚠️ [Ebony-Vinyl/dsh-our-free-model](https://github.com/Ebony-Vinyl/dsh-our-free-model) | 已核准 / approved | 8775 | +2037 | 178 | 16d | 日增百星 | 日增 +2037★；已不进榜单 |
| ⚠️ [FeiZhuLulu/DeepSeek-Bot](https://github.com/FeiZhuLulu/DeepSeek-Bot) | 已核准 / approved | 802 | +673 | 72 | 3d | 日增百星、榜单跃升、冲入 Top 20 | 日增 +673★；冲入 Top 20（117→19）；榜单 117→19 |
| ⚠️ [dataelement/dsh-desktop](https://github.com/dataelement/dsh-desktop) | 已核准 / approved | 13234 | +293 | 477 | 58d | 日增百星 | 日增 +293★；已不进榜单 |
| ⚠️ [T-Auto/dsh-ops](https://github.com/T-Auto/dsh-ops) | 已核准 / approved | 359 | +193 | 3 | 2d | 日增百星 | 日增 +193★；创建 2 天；★/fork 119.7 |
| ⚠️ [ranxianglei/billion-context](https://github.com/ranxianglei/billion-context) | 已核准 / approved | 880 | +119 | 80 | 65d | 日增百星 | 日增 +119★；已不进榜单 |
| ⚠️ [xcisxc29/dsh-wechat](https://github.com/xcisxc29/dsh-wechat) | 已核准 / approved | 110 | +34 | 7 | 3d | 榜单跃升 | 榜单 195→142 |


| # | Project | Stars | Created | First seen | Description |
| ---: | --- | ---: | ---: | ---: | --- |
| 1 | [398894496-arch/KRouter](https://github.com/398894496-arch/KRouter) | 44 | 2026-08-21 | 2026-10-11 | Zero-maintenance second brain for coding agents. One-line install (macOS, Linux, Windows; Chinese and English): an Obsidian vault distilled every night, exact lock + ranked recall that refuses instead of guessing, keys never leave the machine. Cursor, Codex, Claude Code, DeepSeek Harness. |
| 2 | [Imzl-zl/dsh-toolbox-ui](https://github.com/Imzl-zl/dsh-toolbox-ui) | 20 | 2026-08-16 | 2026-10-11 | Toolbox panel for DeepSeek Harness Web: MCP manager (tools &amp; JSON Schema, market, import, workspace copy) and skills manager (scopes &amp; shadowing, enable/disable, model auto-invocation, skillhub.cn market). |
| 3 | [patrykorwat/open-dream-rsi](https://github.com/patrykorwat/open-dream-rsi) | 10 | 2026-09-20 | 2026-10-11 | Recursive Self-Improvement through Evolving Worlds (Dream-RSI) for LLM agents |
| 4 | [mangfufu/dsh-comfyui-web](https://github.com/mangfufu/dsh-comfyui-web) | 8 | 2026-10-11 | 2026-10-11 | 在 dsh 网页中编辑 ComfyUI、实时预览并让 AI 操作工作流。 |
| 5 | [wads-dev/dsh-live-voice](https://github.com/wads-dev/dsh-live-voice) | 6 | 2026-09-14 | 2026-10-11 | Local-first voice conversations for DSH. Run speech recognition and speech synthesis on your own machine, with optional external providers. |
| 6 | [gulagala001/dsh-intelligent-ui](https://github.com/gulagala001/dsh-intelligent-ui) | 5 | 2026-10-09 | 2026-10-11 | 让 DSH 回答变成可操作的界面：计算、图表、表单、模拟与小游戏。独立 DSH 插件 ｜ Interactive answers for DeepSeek Harness: calculators, charts, forms, simulations and games. |
| 7 | [Wenston-dev/awesome-dsh-plugin](https://github.com/Wenston-dev/awesome-dsh-plugin) | 3 | 2026-08-18 | 2026-10-11 | Awesome dsh plugin list — automated DeepSeek Harness plugin directory. Daily GitHub Actions crawl of topic:dsh-plugin / topic:deepseek-harness, bilingual README + machine-readable JSON/CSV |
| 8 | [XSY-28/learning-skills](https://github.com/XSY-28/learning-skills) | 3 | 2026-09-27 | 2026-10-11 | Learning skills for Codex and DeepSeek Harness: course notes, conceptual explanations, and self-contained lectures. |
| 9 | [ashz555/dsh-term-glossary](https://github.com/ashz555/dsh-term-glossary) | 2 | 2026-10-10 | 2026-10-11 | DSH 插件：选中对话中的术语，就地弹出追问框解释基本含义/用途/用法 |
| 10 | [BorisXiao/dsh-cyber-pet](https://github.com/BorisXiao/dsh-cyber-pet) | 2 | 2026-08-15 | 2026-10-11 | A “Cyber Whale” pet designed for DeepSeek Harness: a whale that hovers on the web page, can be fed, and changes color, providing real-time updates on token usage, limits, context usage, interaction counts, and the number of dialog boxes—complete with three built-in chat backends, growth levels, an emotion system, and milestone celebration features. |
| 11 | [ChaYeWuu/dsh-hyperworkbuddy](https://github.com/ChaYeWuu/dsh-hyperworkbuddy) | 2 | 2026-10-10 | 2026-10-11 | 一个 DeepSeek Harness 插件：在 DSH 设置里直接管理 WorkBuddy 多账号，并把模型接进 DSH 与任意 OpenAI 兼容客户端。 |
| 12 | [loyalchiiina/dsh-workbuddy-hub](https://github.com/loyalchiiina/dsh-workbuddy-hub) | 2 | 2026-10-11 | 2026-10-11 | WorkBuddy 转接中枢 for DSH: LLM provider + multi-account ledger (credits/check-in/expiry/cooldown/one-click switch). All-in-one, self-contained, privacy-masked. |
| 13 | [2026heshao/dsh-skill-mcp-board](https://github.com/2026heshao/dsh-skill-mcp-board) | 1 | 2026-10-10 | 2026-10-11 | DeepSeek Harness (DSH) plugin · unified Skill + MCP board for the Web UI — global panel page, JSON import, profile-backed Host Remote management · DSH 技能与 MCP 管理面板 |
| 14 | [Abyssun/dsh-achievements](https://github.com/Abyssun/dsh-achievements) | 1 | 2026-10-11 | 2026-10-11 | Personal achievements dashboard for DeepSeek Harness: profile cards + token activity |
| 15 | [Aik358/dsh-mini-window](https://github.com/Aik358/dsh-mini-window) | 1 | 2026-10-11 | 2026-10-11 | DSH 小窗模式：?dsh-mini=1 触发的紧凑单栏视图 + 可选独立小窗进程 |
| 16 | [alanhaskey/dsh-gitmate](https://github.com/alanhaskey/dsh-gitmate) | 1 | 2026-10-11 | 2026-10-11 | GitMate — a smart Git panel for DeepSeek Harness: diffs, generated commit messages, a commit graph with rewind, and .gitignore generation, plus ten agent tools. |
| 17 | [changli7047/DeepSeek-Harness-Plugins](https://github.com/changli7047/DeepSeek-Harness-Plugins) | 1 | 2026-10-10 | 2026-10-11 | AI Agent 插件集（OpenCode v2 + DeepSeek Harness / dsh），双插件：Windows 桌面自动化（后台截图、元素快照、点击输入、条件等待）＋ 本地 LLM 知识库（markdown wiki、检索/校验/备份、对话蒸馏钩子，实测千万 token 级）。零依赖，含 AI 自行安装指引。 |
| 18 | [Daive1119/local-ocr](https://github.com/Daive1119/local-ocr) | 1 | 2026-08-21 | 2026-10-11 | Offline local OCR skill for DSH/agents - Windows native engine first, zero cloud cost |
| 19 | [deepseaandhighsky-arch/dsh-wallpaper](https://github.com/deepseaandhighsky-arch/dsh-wallpaper) | 1 | 2026-10-11 | 2026-10-11 | An unofficial MIT-licensed image and video wallpaper plugin for DeepSeek Harness, with frosted UI panels, opacity controls and visual presets. |
| 20 | [Etheslay/dsh-token-dashboard](https://github.com/Etheslay/dsh-token-dashboard) | 1 | 2026-10-10 | 2026-10-11 | Codex 风格的 DSH 用量面板：在设置里查看累计 token、一年活动热力图、缓存命中率与最常用模型。 Codex-style token-usage panel for DeepSeek Harness, inside Settings. |
| 21 | [EYEjunnnn/dsh-client-ui-solarized-grid](https://github.com/EYEjunnnn/dsh-client-ui-solarized-grid) | 1 | 2026-10-10 | 2026-10-11 | DeepSeek Harness网格背景样式及对话气泡样式更改，全程由DSH生成发布，如有BUG让DSH自己来修（ |
| 22 | [Fo-Rimuru/dsh-thinking-panel](https://github.com/Fo-Rimuru/dsh-thinking-panel) | 1 | 2026-10-11 | 2026-10-11 | 让 DSH 的思考链看起来像 DeepSeek 官方 App：思考跟随语言，多行滚动预览，展开看完整推理。 |
| 23 | [helloHub1212/dsh-windows-mcp](https://github.com/helloHub1212/dsh-windows-mcp) | 1 | 2026-10-11 | 2026-10-11 | Windows desktop automation for DeepSeek Harness: the in-box MCP client bridge mounted against CursorTouch/Windows-MCP, with an off-by-default Computer Use switch and an in-app dependency installer. |
| 24 | [ilun886/dsh-browser-history](https://github.com/ilun886/dsh-browser-history) | 1 | 2026-10-11 | 2026-10-11 | 给 DSH 右侧栏内嵌浏览器加历史记录列表：下拉浏览访问过的页面（标题/域名/时间），跨重启与关标签保留，按 URL 去重，点击回跳。纯客户端插件，不改 app.asar。 |
| 25 | [kkj-luna/dsh-image-bridge](https://github.com/kkj-luna/dsh-image-bridge) | 1 | 2026-10-10 | 2026-10-11 | DeepSeek Harness 的生图桥插件：让没有生图/修图能力的模型接上外部生图模型。可添加多个服务商，为生图与修图各选主用与备用模型，备用接入时自动接管，全部在 Web 界面点击配置。 |
| 26 | [Lutisure/cyrene-dsh-plugin](https://github.com/Lutisure/cyrene-dsh-plugin) | 1 | 2026-10-11 | 2026-10-11 | 昔涟角色 agent + 客户端主题 + 本地安全扫描，三个可独立安装的 DSH 插件。 |
| 27 | [mirelconstantin/dsh-subagent-model](https://github.com/mirelconstantin/dsh-subagent-model) | 1 | 2026-10-11 | 2026-10-11 | Model visibility for DeepSeek Harness: a header chip naming the model and reasoning effort each Session runs on, a subagent dropdown marking which child carries its own route, and sidebar hover cards showing what each conversation did. |
| 28 | [MYCF711/dsh-sovereign](https://github.com/MYCF711/dsh-sovereign) | 1 | 2026-09-26 | 2026-10-11 | Host-plane sovereignty clause and content guard for DSH: user-held adjudication + anti-injection outward defense. Applies to every agent preset. |
| 29 | [orfeomorello/dsh-websearch-stack](https://github.com/orfeomorello/dsh-websearch-stack) | 1 | 2026-10-10 | 2026-10-11 | Keyless-default web search for DeepSeek Harness (dsh): one provider on the ctx.web seam running an ordered fallback chain over Tavily (keyless), Parallel MCP, SearXNG, Brave, TinyFish and Exa. API keys are managed from the web client's Plugins page. |
| 30 | [Preference-cmd/dsh-mermaid](https://github.com/Preference-cmd/dsh-mermaid) | 1 | 2026-10-10 | 2026-10-11 | DeepSeek Harness 的 Mermaid 图表插件 |
| 31 | [Regex520/dsh-m3-monet](https://github.com/Regex520/dsh-m3-monet) | 1 | 2026-10-11 | 2026-10-11 | Monet (Material Design 3) dynamic-color wallpaper theming for DeepSeek Harness |
| 32 | [RinChanNOWWW/dsh-speak](https://github.com/RinChanNOWWW/dsh-speak) | 1 | 2026-10-11 | 2026-10-11 | Read text aloud in the DeepSeek Harness (DSH): a speak tool for the agent, per-message and select-to-read buttons in the Web UI, and per-language voices — via the macOS say command. |
| 33 | [RocoFish/deepseek-memory](https://github.com/RocoFish/deepseek-memory) | 1 | 2026-10-11 | 2026-10-11 | Curated long-term memory for DeepSeek Harness: two tiers of plain-text facts, memory tools, per-request injection, and after-turn consolidation. |
| 34 | [RonnyJung2021/dsh-fast-pills](https://github.com/RonnyJung2021/dsh-fast-pills) | 1 | 2026-10-11 | 2026-10-11 | Capsule row above the DSH Web composer: one press splices a saved capsule into the draft, and every press leaves a local ledger. DSH Web 输入框上方的胶囊行：点一下把存好的话插进草稿，每次点击都留下本机台账。 |
| 35 | [RonnyJung2021/dsh-mimo-skin](https://github.com/RonnyJung2021/dsh-mimo-skin) | 1 | 2026-09-30 | 2026-10-11 | MiMo skin for the DSH Web GUI |
| 36 | [Senguk520/dsh-multitask](https://github.com/Senguk520/dsh-multitask) | 1 | 2026-10-07 | 2026-10-11 | A Multitask "shock absorber" plugin &amp; agent preset for DeepSeek Harness (DSH): the main chat only plans, briefs subagents and summarizes results, while file reads, commands, search and builds all run inside subagent contexts. Four worker types, an approval gate, zero DSH source changes. |
| 37 | [SHAN5246992ZHUI/dsh-select-translate](https://github.com/SHAN5246992ZHUI/dsh-select-translate) | 1 | 2026-10-11 | 2026-10-11 | Select text in any Windows app and get a translation-only always-on-top card. DSH plugin (Windows only, zero deps, no build). |
| 38 | [shunshoudesi/dsh-focus-brief](https://github.com/shunshoudesi/dsh-focus-brief) | 1 | 2026-10-10 | 2026-10-11 | 把 agent 每轮的回答压成一张结果卡：一句结论 + 默认收起的信息块（需要你确认 / 关键数据 / 产出文件 / 结论建议 / 风险提醒）——骨架本地写死、内容由模型按同一份格式契约填，不额外调用模型。 |
| 39 | [shuxidemosheng/dsh-skill-compat-plus](https://github.com/shuxidemosheng/dsh-skill-compat-plus) | 1 | 2026-10-11 | 2026-10-11 | Mount Claude Code / Codex / ZCode skill directories into DeepSeek Harness as read-only skill providers · dsh 技能兼容层插件 |
| 40 | [SOH4C4759/dsh-pv-home](https://github.com/SOH4C4759/dsh-pv-home) | 1 | 2026-10-11 | 2026-10-11 | 把一支 PV 当作 DeepSeek Harness 的默认主页与屏保：启动即接管、Esc 返回、标题栏跟随影片配色、可选的锁屏按钮 |
| 41 | [toyvfish/dsh-model-seat](https://github.com/toyvfish/dsh-model-seat) | 1 | 2026-10-02 | 2026-10-11 | DeepSeek Harness 的模型选择器：品牌LOGO、带简介的分组模型列表、搜索、推理式滑块和可自定义的配置。 |
| 42 | [wai549077/dsh-aliyun-balance](https://github.com/wai549077/dsh-aliyun-balance) | 1 | 2026-10-11 | 2026-10-11 | DSH 插件：悬浮一行显示阿里云代金券 + 账户余额（还能花的钱），悬停看券面值/已用/最早失效时间。只读 BSS 存量，不做消费统计。 |
| 43 | [yukk4159-bit/dsh-prompt-injector](https://github.com/yukk4159-bit/dsh-prompt-injector) | 1 | 2026-10-11 | 2026-10-11 | DeepSeek Harness plugin: inject a reusable prompt preset into the front of a message at send time - next message only, or every turn. 提示词注入器 |
| 44 | [0-v-0/dsh-grantwrite-patch](https://github.com/0-v-0/dsh-grantwrite-patch) | 0 | 2026-10-08 | 2026-10-11 | Windows sandbox ACL-repair plugin for DeepSeek Harness (dsh) — fix the grantWrite failure (SetNamedSecurityInfoW Win32 5) and retry the command invisibly |
| 45 | [2026heshao/dsh-forget-session](https://github.com/2026heshao/dsh-forget-session) | 0 | 2026-10-11 | 2026-10-11 | DeepSeek Harness (DSH) plugin: adds a Delete action to every session menu — removes the session files &amp; data while keeping memory · DSH 会话删除插件（保留记忆） |
| 46 | [2384418321/dsh-integration-settings](https://github.com/2384418321/dsh-integration-settings) | 0 | 2026-10-11 | 2026-10-11 | DSH 设置里的 MCP 管理 / Skill 管理 / 全局人设三合一插件（面向 DeepSeek Harness 0.2.0-rc.2） |
| 47 | [284022719/dsh-kb-sync](https://github.com/284022719/dsh-kb-sync) | 0 | 2026-10-11 | 2026-10-11 | DeepSeek Harness plugin: orchestrate a user-owned DeepSeek web history -&gt; local knowledge base sync pipeline. No credentials, no network of its own. |
| 48 | [439436269-ctrl/dsh-ai-arcade](https://github.com/439436269-ctrl/dsh-ai-arcade) | 0 | 2026-10-11 | 2026-10-11 | AI 街机厅 for DeepSeek Harness — 模型负责「想」、本地引擎负责「动」（双脑贪吃蛇 + 中国象棋） |
| 49 | [acdsh4869/dsh-aqua-theme](https://github.com/acdsh4869/dsh-aqua-theme) | 0 | 2026-10-10 | 2026-10-11 | Aqua glassmorphism theme plugin for DeepSeek Harness (DSH v0.2.x / desktop v0.22.3+) — original by WYH66666666, adapted for 0.2.x |
| 50 | [ailixiya24865-alt/dsh-jellyfish-theme](https://github.com/ailixiya24865-alt/dsh-jellyfish-theme) | 0 | 2026-10-11 | 2026-10-11 | Deep-Sea Jellyfish theme for the Deepseek Harness Web UI: a bioluminescent abyss palette plus an illustration as the shell backdrop. |
| 51 | [akash-digitavision/dsh-gitnexus-plugin](https://github.com/akash-digitavision/dsh-gitnexus-plugin) | 0 | 2026-10-11 | 2026-10-11 | DSH-specific GitNexus plugin for DeepSeek Harness integration - code intelligence MCP plugin |
| 52 | [AnAcretiondisk9986/dsh-font-master](https://github.com/AnAcretiondisk9986/dsh-font-master) | 0 | 2026-10-11 | 2026-10-11 | DeepSeek Harness 字体插件：中西文分别指定，界面 / 内容 / 代码三处独立 · Set the CJK and Latin families separately, and the interface, content and code faces independently. |
| 53 | [AndyYang12345/dsh-dictation-hotkey](https://github.com/AndyYang12345/dsh-dictation-hotkey) | 0 | 2026-10-11 | 2026-10-11 | A hotkey binder plugin for dsh, allows user to bind specific keys to trigger dictation. |
| 54 | [Ange4918/deepseek-code](https://github.com/Ange4918/deepseek-code) | 0 | 2024-11-11 | 2026-10-11 | Unofficial community guide to Deep Code CLI and DeepSeek Coder models - setup, usage, and local deployment. |
| 55 | [bakasbk/dsh-paid-poop](https://github.com/bakasbk/dsh-paid-poop) | 0 | 2026-10-11 | 2026-10-11 | 带薪拉屎 Paid Poop — DSH 插件：悬浮球计时如厕，按月薪/单双休/法定节假日结算带薪拉屎收益，附统计与提醒。 |
| 56 | [Bancott/dsh-yexueqing-skin](https://github.com/Bancott/dsh-yexueqing-skin) | 0 | 2026-10-07 | 2026-10-11 | DSH叶雪青皮肤插件 |
| 57 | [beng003/dsh-spic-brand](https://github.com/beng003/dsh-spic-brand) | 0 | 2026-10-11 | 2026-10-11 | 把 DSH Web GUI 的 DeepSeek 品牌标识替换为国家电投 SPIC 的纯客户端插件（侧栏品牌行 / 首屏 hero / favicon / 窗口标题） |
| 58 | [BG0EXM/dsh-session-remove](https://github.com/BG0EXM/dsh-session-remove) | 0 | 2026-10-11 | 2026-10-11 | Stop &amp; delete DeepSeek Harness sessions from the sidebar menu — cancels the running turn, subagents, background jobs and reminders, then removes the log, projection cache and workspace record. 「停止」与「删除」会话：先停工作，再删日志、缓存与工作区记录，并在有新版本时提示。 |
| 59 | [bjcdeshu/dsh-selection-assistant](https://github.com/bjcdeshu/dsh-selection-assistant) | 0 | 2026-10-11 | 2026-10-11 | Windows 全局划词助手：Cherry 同款取词基础，复用 DSH 模型翻译、解释与总结。MIT 开源。 |
| 60 | [charysrinathsc/dsh-agentbox](https://github.com/charysrinathsc/dsh-agentbox) | 0 | 2026-10-11 | 2026-10-11 | Mobile and small-screen fixes for the DeepSeek Harness web shell, as a toggleable plugin. |
| 61 | [comeonzhj/dsh-intelligent-ui](https://github.com/comeonzhj/dsh-intelligent-ui) | 0 | 2026-10-11 | 2026-10-11 | Intelligent UI for DeepSeek Harness: the model writes the interface in DIL, the host compiles it, a sandboxed runtime renders it as text + rich cards. |
| 62 | [Dclef/dsh-cursor-dev](https://github.com/Dclef/dsh-cursor-dev) | 0 | 2026-10-11 | 2026-10-11 | Run the Cursor CLI as a DSH child coding agent: per-task model choice, conversation continuity across restarts, live progress and real diffs, plus a Cursor usage/quota dashboard. |
| 63 | [denceee/dsh-everything-claude-code](https://github.com/denceee/dsh-everything-claude-code) | 0 | 2026-10-11 | 2026-10-11 | Adapts everything-claude-code to DeepSeek Harness: 11 skills, an ECC agent preset, adapted Claude Code hooks, and a Chinese Settings page. |
| 64 | [eighteentang/dsh-plugin-memory-lite](https://github.com/eighteentang/dsh-plugin-memory-lite) | 0 | 2026-10-11 | 2026-10-11 | 给 DSH 的本地优先跨会话记忆：每轮自动沉淀 + 空闲自动整理 + 按需注入。数据全在本地 SQLite，不联网不上传。 |
| 65 | [Eos010/dsh-selection-ask](https://github.com/Eos010/dsh-selection-ask) | 0 | 2026-10-11 | 2026-10-11 | DSH（DeepSeek Harness）网页版的划词引用插件：选中任意文本 → 就地写批注 → 变成带编号的引用胶囊落进输入框，原文同时留下高亮与编号。 |
| 66 | [feely0208/dsh-session-artifacts](https://github.com/feely0208/dsh-session-artifacts) | 0 | 2026-10-11 | 2026-10-11 | 会话产物归拢与命名：每个会话一个专属文件夹，收尾按实际内容改名并刷新索引 —— 解决「产物散落」和「过后记不清」。附三个不依赖 DSH 的纯 bash 脚本。 |
| 67 | [Fish-under-sea/dsh-fish](https://github.com/Fish-under-sea/dsh-fish) | 0 | 2026-09-16 | 2026-10-11 | 自用 DSH（DeepSeek Harness）插件聚合包：一个 pnpm 工作区装齐 8 个插件（5 个自建 + 3 个上游补充版：AgentTeams / 思考强度 / 免费模型），子插件源码在 packages/ 下 |
| 68 | [Fish-under-sea/dsh-our-free-model-fish](https://github.com/Fish-under-sea/dsh-our-free-model-fish) | 0 | 2026-10-11 | 2026-10-11 | DSH 插件（上游 Ebony-Vinyl/dsh-our-free-model 的 Fork）：把 13 个免费渠道与免费模型并入官方模型选择器，自带渠道网关供其它本地 harness 反代；本 Fork 新增「隐藏渠道模型分组」总开关与按面积计价。 |
| 69 | [FuSheng-cs/dsh-trae-relay](https://github.com/FuSheng-cs/dsh-trae-relay) | 0 | 2026-10-11 | 2026-10-11 | DeepSeek Harness plugin for managed TRAE CN relay, native account controls and V4.1 Flash reasoning levels |
| 70 | [Guaq-AI/employed-plugins](https://github.com/Guaq-AI/employed-plugins) | 0 | 2026-10-11 | 2026-10-11 | Employed by Guaq AI: live job search plugin and MCP connector for Claude, ChatGPT, Codex, Copilot, Cursor, Kiro and more |
| 71 | [Guuu16/dsh-remote](https://github.com/Guuu16/dsh-remote) | 0 | 2026-10-11 | 2026-10-11 | 把本机的 DeepSeek Harness 接到任何地方：在 dsh 设置里配置中继服务器，手机就能访问同一份工作区和聊天记录。A dsh plugin for remote access — same runtime, not a second view of it. |
| 72 | [hpyperry/dsh-ref-lib](https://github.com/hpyperry/dsh-ref-lib) | 0 | 2026-08-17 | 2026-10-11 | deepseek-harness 参考库插件 |
| 73 | [huang2005-hj/dsh-plugin-grill-me](https://github.com/huang2005-hj/dsh-plugin-grill-me) | 0 | 2026-10-11 | 2026-10-11 | Interview users one frontier at a time: a grill-me skill plugin for DeepSeek Harness (MIT, independent implementation of mattpocock/skills grill-me) |
| 74 | [icrefin/dsh-context-usage-guard](https://github.com/icrefin/dsh-context-usage-guard) | 0 | 2026-10-11 | 2026-10-11 | Keeps the DeepSeek Harness context-usage ring honest: an empty usage sample during a retry no longer collapses it to 0%, and its percentage matches the figures beside it. |
| 75 | [icrefin/dsh-model-reasoning-levels](https://github.com/icrefin/dsh-model-reasoning-levels) | 0 | 2026-10-11 | 2026-10-11 | Per-model reasoning effort levels inside DeepSeek Harness Settings -&gt; Models, written to that model's reasoningEfforts in cordis.patch.yml. |
| 76 | [icrefin/dsh-model-retry-settings](https://github.com/icrefin/dsh-model-retry-settings) | 0 | 2026-10-11 | 2026-10-11 | Max-retries control for DeepSeek Harness: one Settings -&gt; Model card that sets how many times a failed model request is retried. |
| 77 | [icrefin/dsh-provider-model-picker](https://github.com/icrefin/dsh-provider-model-picker) | 0 | 2026-10-11 | 2026-10-11 | Names the provider beside the model in DeepSeek Harness's composer control (Provider/Model) while keeping the provider-grouped picker. |
| 78 | [imcaibaicai/dsh-github-push](https://github.com/imcaibaicai/dsh-github-push) | 0 | 2026-10-11 | 2026-10-11 | DeepSeek Harness plugin: push a local folder to GitHub in one sentence - proxy autodetect, gh auth self-heal, pre-push secret gate, SHA read-back verification. |
| 79 | [imcaibaicai/outbox](https://github.com/imcaibaicai/outbox) | 0 | 2026-10-11 | 2026-10-11 | Reliably push a local folder to GitHub: per-command proxy injection, self-healing gh auth, pre-push secret gate, and SHA read-back verification. Zero dependencies. |
| 80 | [jabingu/dsh-selection-group](https://github.com/jabingu/dsh-selection-group) | 0 | 2026-10-11 | 2026-10-11 | Selection Toolbar (dsh-selection-group) — one hover toolbar for text selected in DeepSeek Harness: annotate + quote in a single box, depending on neither upstream plugin. |
| 81 | [jingyingruodi/dsh-headless-display](https://github.com/jingyingruodi/dsh-headless-display) | 0 | 2026-10-11 | 2026-10-11 | 隔离的 headless 虚拟 X display：默认桌面上零窗口、零干扰；面板里可实时查看与操作，按需弹出真实窗口。给 Agent 9 个工具 + HTTP API。仅 2D/X11。 |
| 82 | [JJDonald/dsh-telegram-login-approval](https://github.com/JJDonald/dsh-telegram-login-approval) | 0 | 2026-10-11 | 2026-10-11 | Telegram out-of-band login approval and task-completion notifications for DeepSeek Harness (DSH) |
| 83 | [KAIROSLLL/dsh-plugin-oss-backup](https://github.com/KAIROSLLL/dsh-plugin-oss-backup) | 0 | 2026-10-11 | 2026-10-11 | DSH 插件：把工作区备份到 S3 兼容对象存储（RustFS / 阿里云 OSS / AWS S3）。凭证只从环境变量读，不落盘、不回显、不进日志。 |
| 84 | [keeliu/zmtgzt](https://github.com/keeliu/zmtgzt) | 0 | 2026-09-06 | 2026-10-11 | 个人运营自媒体的DSH工作 |
| 85 | [kezan31/dsh-bocha-web-search-plugin](https://github.com/kezan31/dsh-bocha-web-search-plugin) | 0 | 2026-10-11 | 2026-10-11 | Bocha Web Search provider and settings UI for DeepSeek Harness (DSH).这是一个面向 DeepSeek Harness（DSH）的 Cordis bundle，为 DSH 的 ctx.web 提供 博查（bocha）网页搜索。 |
| 86 | [la-sandrone/dsh-taller-y-relojeria-de-sandrone](https://github.com/la-sandrone/dsh-taller-y-relojeria-de-sandrone) | 0 | 2026-10-11 | 2026-10-11 | 对DeepSeek Harness的本地爆改合集：源码补丁、界面补丁包、皮肤、字体方案、启动器，以及把这些东西改出来时踩过的坑和判据。 |
| 87 | [lanxiuyun/dsh-multi-chat](https://github.com/lanxiuyun/dsh-multi-chat) | 0 | 2026-10-11 | 2026-10-11 | Side-by-side session grid for the DeepSeek Harness web GUI: click sessions in the sidebar, get an equal-cell grid of live conversations (max 3 per row), drag the top-right handle to reorder, each pane keeps its own composer. |
| 88 | [LeeGuanWei-a/dsh-mini-games-lee](https://github.com/LeeGuanWei-a/dsh-mini-games-lee) | 0 | 2026-10-11 | 2026-10-11 | Mini-games for the DeepSeek Harness Web GUI: Tetris, Snake, 2048 and Minesweeper in one draggable frosted-glass window, with light/dark themes and per-game leaderboards. · DSH Web 端小游戏合集，毛玻璃悬浮窗、深浅色主题、各游戏独立排行榜。装法：plugin_manager install_bundle。 |
| 89 | [leolee9086/dsh-plugin-siyuan](https://github.com/leolee9086/dsh-plugin-siyuan) | 0 | 2026-10-11 | 2026-10-11 | SiYuan integration for DeepSeek Harness |
| 90 | [LihiHe/dsh-thinking-slider](https://github.com/LihiHe/dsh-thinking-slider) | 0 | 2026-10-10 | 2026-10-11 | Turns the composer's reasoning-effort menu into a draggable slider and takes over the stock model-and-reasoning-level chip. |
| 91 | [linanbuan/dsh-archive-manager](https://github.com/linanbuan/dsh-archive-manager) | 0 | 2026-10-11 | 2026-10-11 | 归档会话管理 · Archived sessions — DeepSeek Harness (DSH) 设置面板：列出本机全部已归档会话，逐条复原回工作区，或连同会话日志与投影缓存永久删除。 A DSH settings panel that lists archived sessions and either restores one into its workspace or deletes it from disk for good. |
| 92 | [linanbuan/dsh-dwg-preview](https://github.com/linanbuan/dsh-dwg-preview) | 0 | 2026-10-11 | 2026-10-11 | 侧边栏 DWG/DXF 预览 · Sidebar DWG/DXF preview — DeepSeek Harness (DSH) 插件：在侧边栏的文档预览里直接打开 .dwg / .dxf 工程图纸，宿主侧用 LibreDWG(WASM) 解码、再用自带零依赖渲染器画成矢量 SVG。 A DSH plugin that previews DWG/DXF drawings inside the sidebar document preview. |
| 93 | [linanbuan/dsh-session-retry](https://github.com/linanbuan/dsh-session-retry) | 0 | 2026-10-11 | 2026-10-11 | 重新回答 · Answer again — DeepSeek Harness (DSH) 插件：助手消息动作条上的「重新回答」按钮，先把这一轮的旧回答退出模型上下文，再把该轮的用户提问重新提交给同一个会话。 A DSH plugin that re-answers a turn after dropping the previous answer from the model context. |
| 94 | [lingmingxi/dsh-plugin-subitem-status](https://github.com/lingmingxi/dsh-plugin-subitem-status) | 0 | 2026-10-11 | 2026-10-11 | DSH 插件界面增强：卡片显示子项状态，设置页显示提供者包名，方便 AI 定位插件并节省 token。 |
| 95 | [liushQAQ/dsh-weixin-plus](https://github.com/liushQAQ/dsh-weixin-plus) | 0 | 2026-10-11 | 2026-10-11 | DSH 微信通道增强插件 — 集成 iLink 消息双向桥接、单实例锁、大文件智能投递与 Web 设置管理界面 |
| 96 | [lixiaohao001/dsh_plugin_refresh](https://github.com/lixiaohao001/dsh_plugin_refresh) | 0 | 2026-10-11 | 2026-10-11 | DSH 插件：装完即可用、无需重启——检查已安装组合、就地完成激活并热重载插件模块 \| Post-install plugin activation and in-place hot refresh for DeepSeek Harness |
| 97 | [liyy996/dsh-theme-windowsxp](https://github.com/liyy996/dsh-theme-windowsxp) | 0 | 2026-10-10 | 2026-10-11 | 把 DSH 换成 Windows XP：Luna 蓝皮肤（米色面板、渐变按钮、#7F9DB9 输入框、圆角滚动条、Bliss 桌面壁纸）＋ 一轮跑完时的提示音与完成弹窗。 |
| 98 | [LJY4-bilibili/dsh-message-reminder](https://github.com/LJY4-bilibili/dsh-message-reminder) | 0 | 2026-10-11 | 2026-10-11 | Raises a Windows desktop notification card when DSH asks you a question, and returns to the asking Session when the card is clicked. |
| 99 | [Luan-Fuzi/foldercast](https://github.com/Luan-Fuzi/foldercast) | 0 | 2026-10-04 | 2026-10-11 | 把人类可读的目录变成 HTML 导览页与讲解视频的 DSH 插件。 |
| 100 | [LuminariSoftwares/stack-guardian](https://github.com/LuminariSoftwares/stack-guardian) | 0 | 2026-10-10 | 2026-10-11 | One command tells you why your local AI stack is slow or broken: unloaded Ollama models, VRAM held by something else, offline or relayed tailnet peers. Graded findings, typed fixes, MCP server. |
| 101 | [Magica-Chen/dsh-preset-codex-claude](https://github.com/Magica-Chen/dsh-preset-codex-claude) | 0 | 2026-10-10 | 2026-10-11 | DeepSeek Harness agent preset: Codex and Claude Code as delegation subagents, each at a read-only and full-access tier. Use either — or both in parallel — in one task. |
| 102 | [miller-owo/dsh-image-gen-plugin](https://github.com/miller-owo/dsh-image-gen-plugin) | 0 | 2026-10-11 | 2026-10-11 | The GPT Image image generator plugin for DeepSeek Harness. |
| 103 | [mimoxh/dsh-searxng-search](https://github.com/mimoxh/dsh-searxng-search) | 0 | 2026-10-11 | 2026-10-11 | SearXNG search provider for DSH (DeepSeek Harness): runs the built-in web_search through a SearXNG JSON API. Zero dependencies, no build step. |
| 104 | [Minhyuin/dsh-subagent-injection](https://github.com/Minhyuin/dsh-subagent-injection) | 0 | 2026-10-11 | 2026-10-11 | DSH Web plugin: configure priority-ordered provider/model/reasoning-effort routes for subagent delegation, and gate subagent_fork |
| 105 | [MOMIEDEJIYI/ployenv](https://github.com/MOMIEDEJIYI/ployenv) | 0 | 2026-10-08 | 2026-10-11 | 本地环境管理 |
| 106 | [morning-cml/dsh-doorman](https://github.com/morning-cml/dsh-doorman) | 0 | 2026-10-11 | 2026-10-11 | Unofficial DeepSeek Harness (dsh) plugin that triages sandbox-escalation approvals: hard rules + exact allowlist + second-model review, sandbox stays on. Work in progress. |
| 107 | [Noob-stupid/dsh-breadboard](https://github.com/Noob-stupid/dsh-breadboard) | 0 | 2026-10-08 | 2026-10-11 | DSH 嵌入式硬件沙盒插件：3D 装配协作感知 + 项目级硬件在环仿真 |
| 108 | [NOOBnoob163/dsh-open-obsidian](https://github.com/NOOBnoob163/dsh-open-obsidian) | 0 | 2026-10-11 | 2026-10-11 | DSH 插件：会话在 Obsidian 库里工作时自动把库打开——这样你装的同步插件（坚果云同步等）就会开始跑，AI 改的东西才能真正同步出去。已开着的库跳过，新窗口不抢焦点。（是 DSH 插件，不是 Obsidian 插件） |
| 109 | [OrderG-X/dsh-video-preview](https://github.com/OrderG-X/dsh-video-preview) | 0 | 2026-10-11 | 2026-10-11 | Inline video and audio playback inside DeepSeek Harness: a play_video tool plus a native player at the turn tail, served by a signed Range-capable streaming route. |
| 110 | [Passenger-Qin/dsh-task-splitter](https://github.com/Passenger-Qin/dsh-task-splitter) | 0 | 2026-10-11 | 2026-10-11 | DSH host plugin: detect long tasks (long-output &amp; multi-step) and auto-split them for small-context local models - parts skeleton or PLAN.md ledger plus injected execution rules. |
| 111 | [PolinniZhong/dsh-acceptance](https://github.com/PolinniZhong/dsh-acceptance) | 0 | 2026-10-11 | 2026-10-11 | Agent 交付验收台：任务级的凭证工作台 —— 逐条原始需求 ↔ 证据的映射，证据的版本绑定与过期。DeepSeek Harness 插件。 |
| 112 | [qgd1850890306-rgb/dsh-todo-checklist](https://github.com/qgd1850890306-rgb/dsh-todo-checklist) | 0 | 2026-10-11 | 2026-10-11 | DSH 待办清单插件（划词加待办 / 对话自动捕获 / 侧边栏面板 / 到期提醒）· DSH todo checklist plugin for DeepSeek Harness |
| 113 | [RicardoYan/dsh-project-config](https://github.com/RicardoYan/dsh-project-config) | 0 | 2026-10-10 | 2026-10-11 | Per-workspace subagents, commands, MCP servers and hooks for DSH from .dsh/settings.yml · 从 .dsh/settings.yml 为 DSH 工作区加载子代理、命令、MCP 和 hooks |
| 114 | [RicardoYan/dsh-symlink-passthrough](https://github.com/RicardoYan/dsh-symlink-passthrough) | 0 | 2026-10-08 | 2026-10-11 | Open symlinks and junctions in the DSH sidebar, with targets outside the workspace gated by workspace trust · 让 DSH 侧边栏能展开、打开符号链接（含 Windows junction），指向工作区外的需工作区已信任 |
| 115 | [RicardoYan/dsh-workspace-trust](https://github.com/RicardoYan/dsh-workspace-trust) | 0 | 2026-10-10 | 2026-10-11 | Per-workspace trust for DSH, used by other plugins to decide whether project code may run · 为 DSH 工作区记录信任，供其他插件决定是否运行项目里的代码 |
| 116 | [satan9394/dsh-skills-bundle](https://github.com/satan9394/dsh-skills-bundle) | 0 | 2026-08-26 | 2026-10-11 | 199 DSH skill plugins in one monorepo - comprehensive collection for DeepSeek Harness |
| 117 | [sayzwx/dsh-xingkong-theme](https://github.com/sayzwx/dsh-xingkong-theme) | 0 | 2026-10-11 | 2026-10-11 | Nebula Core — a deep-space theme for the DeepSeek Harness Web GUI: two fully designed light and dark palettes over a seamless cross-dissolve nebula wallpaper, plus a model probe that reports which configured models actually answer and their real context window. |
| 118 | [shuing/dsh-sidebar-launcher](https://github.com/shuing/dsh-sidebar-launcher) | 0 | 2026-10-10 | 2026-10-11 | 通过悬浮球，管理你的侧边栏，鼠标左右键各自打开，右键悬浮球清空你的侧边栏 |
| 119 | [Siloet-phy/analog-liquid-glass-for-dsh](https://github.com/Siloet-phy/analog-liquid-glass-for-dsh) | 0 | 2026-10-10 | 2026-10-11 | Analog Liquid Glass for DeepSeek Harness —— 把 DSH 输入框变成一片模拟质感的液态玻璃：镜面高光、内缘白线、边缘缓慢绕行的光晕；模型思考时玻璃里往上冒泡（一个破灭一个新生）；深浅主题切换带 1.7 秒从容过渡。 |
| 120 | [sixzjd/dsh-usage-dash-board](https://github.com/sixzjd/dsh-usage-dash-board) | 0 | 2026-10-10 | 2026-10-11 | Local usage statistics for DeepSeek Harness: token consumption, request count, cache hit rate and estimated cost as a native settings section. |
| 121 | [snnh/dsh-llm-service-lite](https://github.com/snnh/dsh-llm-service-lite) | 0 | 2026-10-11 | 2026-10-11 | Community plugin for DeepSeek Harness: a lighter LLM service with self-contained provider profiles, a declared model catalog, and the chat-completions, Anthropic Messages, and OpenAI Responses wires. Not an official DeepSeek package. |
| 122 | [subisle/dsh-prompt-optimizer](https://github.com/subisle/dsh-prompt-optimizer) | 0 | 2026-10-11 | 2026-10-11 | DeepSeek Harness 插件：在输入框工具栏一键优化提示词，结合会话上下文并使用当前已选择的模型 |
| 123 | [ta-www/dsh-tripsy](https://github.com/ta-www/dsh-tripsy) | 0 | 2026-10-11 | 2026-10-11 | Browse your Tripsy trips inside a DeepSeek Harness panel: itinerary, activities, lodging, transport and expenses, with times in each item's own timezone. Read-only by design -- create and edit by asking the agent. |
| 124 | [tableau-China/dsh-tableau-twb-viewer](https://github.com/tableau-China/dsh-tableau-twb-viewer) | 0 | 2026-08-15 | 2026-10-11 | A DeepSeek Harness plugin to inspect Tableau workbooks (.twb): layout, lineage, metadata.DSH Tableau 工作簿检视器：在浏览器里查看 .twb 的 1:1 仪表板布局、字段引用关系与数据源/计算字段元数据（只读元数据，不解析 .twbx）。 |
| 125 | [tableau-China/dsh-workload-report](https://github.com/tableau-China/dsh-workload-report) | 0 | 2026-10-11 | 2026-10-11 | A DeepSeek Harness plugin for effort &amp; token insights by date and workspace.DSH 工作量报告插件：按日期与工作区看清「我的付出」与 Token 消耗，含日历热力图 / 时刻分析 / 工作区占比，可导出自包含 HTML 报告。 |
| 126 | [Tacrine/oh-my-dsh-omo-fork-chs](https://github.com/Tacrine/oh-my-dsh-omo-fork-chs) | 0 | 2026-10-11 | 2026-10-11 | Oh My DSH Chs - unofficial Simplified-Chinese fork of the tri-agent preset (Atlas orchestration + Prometheus planning), packaged for DeepSeek Harness. Content licensed under the upstream SUL-1.0; see NOTICE.md. |
| 127 | [This-is-XiaoDeng/dsh-plugin-notify](https://github.com/This-is-XiaoDeng/dsh-plugin-notify) | 0 | 2026-10-11 | 2026-10-11 | WxPusher + real browser notifications (sound, requireInteraction) for DeepSeek Harness session state changes — session stopped, exited with an error, or asked you a question. Native settings page. |
| 128 | [Thr33H/Deepseek-Harness-Humanity](https://github.com/Thr33H/Deepseek-Harness-Humanity) | 0 | 2026-10-10 | 2026-10-11 | A personification suite for DeepSeek Harness: persona, memory, skills, self-evolution and dreaming — behind one native Web workbench. |
| 129 | [tjiisztiuv/dsh-plugin-discord](https://github.com/tjiisztiuv/dsh-plugin-discord) | 0 | 2026-10-10 | 2026-10-11 | Discord bridge for DeepSeek Harness (dsh): chat with any workspace session, approve tool calls, and answer model questions from Discord |
| 130 | [Tleon-H/dsh-next-prompt](https://github.com/Tleon-H/dsh-next-prompt) | 0 | 2026-10-02 | 2026-10-11 | DeepSeek Harness 插件：回答结束后在输入框预填一条灰色的下一句建议（Tab / → 采纳），输入框为空时按 ↑ 填入上一次发送的内容 |
| 131 | [vihithr/dsh-apology-persona](https://github.com/vihithr/dsh-apology-persona) | 0 | 2026-10-11 | 2026-10-11 | DSH 插件：把模型道歉做成可加载的复位仪式 skill（鲸鱼娘女仆口吻，触发交还模型判断） |
| 132 | [wjh-ux/dsh-mcp-tavily](https://github.com/wjh-ux/dsh-mcp-tavily) | 0 | 2026-10-11 | 2026-10-11 | Tavily web search for DeepSeek Harness (dsh): wires the Tavily remote MCP server into the harness as a plugin bundle |
| 133 | [wjingshan/dsh-sidebar-focus](https://github.com/wjingshan/dsh-sidebar-focus) | 0 | 2026-10-11 | 2026-10-11 | Order and disclosure for the DSH left sidebar driven by what is actually running: busy workspaces and active sessions float to the top, an idle workspace stays folded. Five switches, each reversible. |
| 134 | [WNLUO/dsh-mobile-plugin](https://github.com/WNLUO/dsh-mobile-plugin) | 0 | 2026-10-11 | 2026-10-11 | DeepSeek Harness 移动端插件：手机远程操控宿主，提供受限移动 API、中转隧道与局域网配对（可作无头宿主运行） |
| 135 | [Woaichina123/guitar-tab-maker](https://github.com/Woaichina123/guitar-tab-maker) | 0 | 2026-10-11 | 2026-10-11 | Automatic guitar-tab transcriber &amp; synced player generator as an Agent Skill — works with DeepSeek Harness (dsh), Claude Code and compatible harnesses |
| 136 | [wobenshiwomu/dsh-johnny](https://github.com/wobenshiwomu/dsh-johnny) | 0 | 2026-10-11 | 2026-10-11 | DeepSeek Harness 插件：万事通强尼 —— /johnny 出摊，没收到钱就装傻；敲钱喂给 dsh-pet 大肥鱼，才会说真话 \| Pay the fish, get the truth |
| 137 | [wqzhellohhwy/dsh-video-transcribe](https://github.com/wqzhellohhwy/dsh-video-transcribe) | 0 | 2026-10-11 | 2026-10-11 | DeepSeek Harness 插件:贴一个视频链接,用本机工具链下载音轨并离线转写为文稿(yt-dlp + ffmpeg + sherpa-onnx/SenseVoice),长音频自动分片,零云端 API。 |
| 138 | [WYR-233/dsh-memory-lite](https://github.com/WYR-233/dsh-memory-lite) | 0 | 2026-09-11 | 2026-10-11 | Read-only enhancer for a file-based (markdown + git) long-term memory library in DeepSeek Harness: built-in zero-dependency search, one-click library creation, governance dashboard, /memory command and a bundled skill. |
| 139 | [WYR-233/dsh-whale-guard](https://github.com/WYR-233/dsh-whale-guard) | 0 | 2026-10-11 | 2026-10-11 | DSH 防呆插件：safe_kill 工具（自动排除自身与祖先进程链）+ bash 命令预检 + 可扩展规则库。Zero-dependency safety guard for DeepSeek Harness. |
| 140 | [x-cores/dsh-chess-game](https://github.com/x-cores/dsh-chess-game) | 0 | 2026-10-11 | 2026-10-11 | Chess Game Plugin for Deepseek Harness |
| 141 | [xiaohuo130/dsh-creative-plugin](https://github.com/xiaohuo130/dsh-creative-plugin) | 0 | 2026-09-04 | 2026-10-11 | 给 DSH（DeepSeek Harness）的 AI 会话加画图能力：注册 creative_generate_image 工具，桥接任意 OpenAI 兼容文生图接口（默认 StepFun step-image-edit-2，零依赖）。 |
| 142 | [xingxingbk-git/dsh-deepseek-chat](https://github.com/xingxingbk-git/dsh-deepseek-chat) | 0 | 2026-10-09 | 2026-10-11 | 为 DSH 提供 Chat / Harness 双模式切换 |
| 143 | [Y-King666/dsh-global-prompt](https://github.com/Y-King666/dsh-global-prompt) | 0 | 2026-10-11 | 2026-10-11 | Global prompt editor for DeepSeek Harness: a Settings section that edits the user-level AGENTS.md injected into every session. |
| 144 | [YAN3RA/DSH-Sync-Backup](https://github.com/YAN3RA/DSH-Sync-Backup) | 0 | 2026-10-10 | 2026-10-11 | Dsh Harness 定时备份插件：把 DSH 的记忆层（记忆/技能/待办/会话/存储）打包为 AES-256-GCM 加密归档，本地留存并同步到 WebDAV 与 GitHub 私有仓库，零第三方运行时依赖。 |
| 145 | [yanggaihao5-sys/dsh-job-watch](https://github.com/yanggaihao5-sys/dsh-job-watch) | 0 | 2026-10-11 | 2026-10-11 | DSH Web GUI: attach a long-running job id to a conversation and let its sidebar row carry the state -- pink while it runs, green when it finished (come back and analyse), amber when the id cannot be found. Providers are a command + a per-line regex. Not affiliated with DeepSeek. |
| 146 | [yanzhaohui1999/dsh-perf-hud](https://github.com/yanzhaohui1999/dsh-perf-hud) | 0 | 2026-10-07 | 2026-10-11 | 纯客户端性能 HUD:帧 / Longtask(四条腿归因)/ 每插件回调速率与耗时 / DOM 与堆 / 宿主 event-loop 与链路 RTT,带隔离实验与一键导出 JSON。 Client-side performance HUD for DeepSeek Harness. |
| 147 | [yfwu2020/dsh-full-view](https://github.com/yfwu2020/dsh-full-view) | 0 | 2026-10-04 | 2026-10-11 | DeepSeek Harness 完整视图插件：展开文件与网页，保留原会话为可移动、缩放和收起的聊天小窗。 |
| 148 | [yishuiliufang/dsh-wsl-first](https://github.com/yishuiliufang/dsh-wsl-first) | 0 | 2026-10-10 | 2026-10-11 | Route DSH command execution to WSL first: a configurable system-prompt router that makes the wsl tool the default command executor instead of pwsh |
| 149 | [yiyunet/dsh-mcp-client-manager](https://github.com/yiyunet/dsh-mcp-client-manager) | 0 | 2026-10-11 | 2026-10-11 | DSH 插件：在「设置 → 侧栏」管理 MCP 客户端服务器的面板（零构建、零运行依赖）。DeepSeek Harness plugin: a settings panel to manage MCP client rows. |
| 150 | [z8313568/dsh-chat](https://github.com/z8313568/dsh-chat) | 0 | 2026-10-11 | 2026-10-11 | 面向 DSH 的去中心化 AI 社交与创作网络：发现 · 好友 · 分享 · 直播 · 节点共建 |
| 151 | [zhanghzdev/dsh-theme-button](https://github.com/zhanghzdev/dsh-theme-button) | 0 | 2026-10-11 | 2026-10-11 | DeepSeek Harness 的悬浮主题挂件：切换官方外观 + 自定义背景（图片/纯色） |
| 152 | [zhiqiangme/dsh-plugins](https://github.com/zhiqiangme/dsh-plugins) | 0 | 2026-10-09 | 2026-10-11 | 两个 DeepSeek Harness 插件（WorkBuddy 自动启动 + 模型同步、Tavily 网页搜索）+ 双击运行的安装脚本 · Two DSH plugins with a one-click installer |
| 153 | [zi7tian/dsh-keep-awake](https://github.com/zi7tian/dsh-keep-awake) | 0 | 2026-10-09 | 2026-10-11 | Keep the DeepSeek Harness host awake during active tasks with native power assertions. |
| 154 | [zxbc/dsh-vscode-themes2](https://github.com/zxbc/dsh-vscode-themes2) | 0 | 2026-10-08 | 2026-10-11 | Browse and apply popular VS Code color themes to the DeepSeek Harness Web UI. |
| 155 | [zxyan99/dsh-return-front](https://github.com/zxyan99/dsh-return-front) | 0 | 2026-10-11 | 2026-10-11 | Bring DSH back to the foreground when a real-device control turn ends (Android / Shizuku). |

## 从快照消失的已核准仓库 / Approved repositories missing from the snapshot

已核准但已不在当前快照中（删除或改名），核实后从 [data/approved.json](../approved.json) 移除或更新名称。

Approved but no longer present in the current snapshot (deleted or renamed) — after checking, remove them from [data/approved.json](../approved.json) or update the name.

- 1while1/dsh-whale-subagent
- 398894496-arch/DSH-KRouter
- acdsh4869/DSH-Transparent-UI-Plugin
- BorisShaw6/dsh-cyber-pet
- Imzl-zl/dsh-mcp-manager-ui
- JohnXu22786/ci-runner
- JohnXu22786/command-scout
- JohnXu22786/context-pruner
- JohnXu22786/docgen
- JohnXu22786/docs-retriever
- JohnXu22786/github-mcp
- JohnXu22786/session-titler
- JohnXu22786/skill-framework
- nexsjournal/dsh-desktop-app
- Rainpomelo/deepseek-harness-mimo-memory
- Rainpomelo/dsh-anysearch
- ryukirin/dsh-momo-learning
- sixzjd/npm-usage
- Tacrine/oh-my-dsh-omo-fork
- Tleon-H/dsh-prompt-prefill
- victorwads/dsh-live-voice
- worldfunction4/dsh-desk
- xingxingbk-git/dsh-chat
- YuXuanLiang-dev/dsh-plugin-adaptive-agent-policy
