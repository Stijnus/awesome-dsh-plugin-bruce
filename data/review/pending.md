# 待审核仓库 / Pending review

> 新增到 `dsh-plugin` Topic 下、带有简介、尚未经维护者核实的仓库。本文件由 `scripts/update.mjs` 每日刷新，仅供审核使用，不是用户可见页面。
>
> Repositories newly added to the `dsh-plugin` topic that the maintainer has not verified yet. Refreshed daily by `scripts/update.mjs`; review-only, not a user-facing page.

- 生成时间 / Generated: **2026-10-25**
- 快照日期 / Snapshot date: **2026-10-25 (UTC)**
- 待审核 / Pending: **421**
- 从快照消失的已核准仓库 / Approved repositories missing from the snapshot: **34**
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

对比上一份快照 **2026-10-24** / vs previous snapshot **2026-10-24**。规则：日增 ≥100★；已核准仓新入 Top 200（且 Δ≥50）/ 名次跃升 ≥50 / 冲入 Top 20；待审仓 ≥100★ 且核准后将进入 Top 200。

- 看 Star 是否与 fork、提交活跃度、仓库年龄匹配（高星零 fork、创建当天几百星，多为刷星）
- 是否把已有高星的通用项目贴上 `dsh-plugin` Topic 蹭榜——插件本身可进目录，但应加入 `leaderboard_exclusions`，理由写清 stars accrued as …
- 待审仓若核准会直接冲进 Top 20 / Top 200，先确认热度来自 **DSH 插件本身**
- 已核准仓的异常跃升：确认后同样可记入 `leaderboard_exclusions`，不必下架目录

Check stars against forks, commit activity and age (hundreds of stars on day one, or high stars with zero forks, usually look bought). A generic high-star project that only just tagged `dsh-plugin` can stay in the catalog but should go to `leaderboard_exclusions` (reason: stars accrued as …). If approving a pending repo would drop it into Top 20 / Top 200, confirm the audience is the DSH plugin itself.

- 告警数 / Alerts: **11**

| Project | Queue | Stars | Δ | Forks | Age | Signals | 审核提示 / Hint |
| --- | --- | ---: | ---: | ---: | ---: | --- | --- |
| ⚠️ [Fei2411/DS-Bot](https://github.com/Fei2411/DS-Bot) | 待审 / pending | 3858 | +131 | 361 | 17d | 日增百星、待审高星 | 日增 +131★；核准即 Top 7 |
| ⚠️ [LiarMTTT/TavernWeave](https://github.com/LiarMTTT/TavernWeave) | 待审 / pending | 181 | — | 17 | 94d | 待审高星 | 核准即榜 #118 |
| ⚠️ [Ebony-Vinyl/dsh-our-free-model](https://github.com/Ebony-Vinyl/dsh-our-free-model) | 已核准 / approved | 42780 | +1712 | 1213 | 30d | 日增百星 | 日增 +1712★；已不进榜单 |
| ⚠️ [elysia395/dsh-wallpaper-engine](https://github.com/elysia395/dsh-wallpaper-engine) | 已核准 / approved | 2792 | +310 | 79 | 69d | 日增百星 | 日增 +310★ |
| ⚠️ [ranxianglei/billion-context](https://github.com/ranxianglei/billion-context) | 已核准 / approved | 2792 | +214 | 228 | 79d | 日增百星 | 日增 +214★；已不进榜单 |
| ⚠️ [dsh-market/dsh-market](https://github.com/dsh-market/dsh-market) | 已核准 / approved | 8857 | +179 | 343 | 71d | 日增百星 | 日增 +179★；已不进榜单 |
| ⚠️ [PC2005-cloud/dsh-pet](https://github.com/PC2005-cloud/dsh-pet) | 已核准 / approved | 4094 | +176 | 309 | 71d | 日增百星 | 日增 +176★ |
| ⚠️ [T-Auto/dsh-ops](https://github.com/T-Auto/dsh-ops) | 已核准 / approved | 4267 | +149 | 124 | 16d | 日增百星 | 日增 +149★ |
| ⚠️ [ccch1mneyyy/dsh-TUI](https://github.com/ccch1mneyyy/dsh-TUI) | 已核准 / approved | 5767 | +137 | 294 | 72d | 日增百星 | 日增 +137★ |
| ⚠️ [dataelement/dsh-desktop](https://github.com/dataelement/dsh-desktop) | 已核准 / approved | 16897 | +126 | 561 | 72d | 日增百星 | 日增 +126★；已不进榜单 |
| ⚠️ [c1overzz/dsh-bili-scroll](https://github.com/c1overzz/dsh-bili-scroll) | 已核准 / approved | 805 | +121 | 85 | 10d | 日增百星 | 日增 +121★ |


| # | Project | Stars | Created | First seen | Description |
| ---: | --- | ---: | ---: | ---: | --- |
| 1 | [Fei2411/DS-Bot](https://github.com/Fei2411/DS-Bot) ⚠️ | 3858 | 2026-10-07 | 2026-10-25 | A team of long-lived bots for DeepSeek Harness, with main bots, bot-to-bot messages and group chats. |
| 2 | [LiarMTTT/TavernWeave](https://github.com/LiarMTTT/TavernWeave) ⚠️ | 181 | 2026-07-22 | 2026-10-25 | Noncommercial Agent Skills for SillyTavern rolecard engineering. |
| 3 | [jadezane6634-ops/dsh-purge-flash](https://github.com/jadezane6634-ops/dsh-purge-flash) | 22 | 2026-10-25 | 2026-10-25 | DSH 破甲插件：九片按需叶子 + 分级 prefill + 拒答阶梯 L0–L3 + finish_reason 四路分流 + 请求体级整形（provider 别名代理）+ 反撤回与回滚。零宿主补丁，1,597 tok 常驻，172 项测试 / 56 条探针。 |
| 4 | [lakeofsky347/yingliu-video-studio](https://github.com/lakeofsky347/yingliu-video-studio) | 7 | 2026-10-05 | 2026-10-25 | DSH 视频工作台：图文分镜、前端代码生成与编辑、本地 MP4 导出 |
| 5 | [Minglink/wanxiang-knowledge](https://github.com/Minglink/wanxiang-knowledge) | 6 | 2026-10-24 | 2026-10-25 | 万象知识库：DeepSeek Harness 本地知识库插件，支持一键会话存入知识库，让你的deepseek与你一起无限进步！  好用的话求个星星！ |
| 6 | [a961282799-crypto/dsh-region-edit](https://github.com/a961282799-crypto/dsh-region-edit) | 5 | 2026-10-24 | 2026-10-25 | DeepSeek Harness 桌面插件：自由圈选预览内容，视觉识别目标，再用自然语言提出修改要求。无需截图。 |
| 7 | [functy23/dsh-workbuddy-panel](https://github.com/functy23/dsh-workbuddy-panel) | 5 | 2026-10-24 | 2026-10-25 | 优化版 WorkBuddy2API 网关 + DSH 原生面板：UA、头族与设备指纹对齐官方 WorkBuddy Desktop 5.9.2，内核可独立更新。 |
| 8 | [huanlin-labs/dsh-isolation-gate](https://github.com/huanlin-labs/dsh-isolation-gate) | 5 | 2026-10-21 | 2026-10-25 | 门禁 · Access gate for DSH: per-directory deny/read/full, roster groups, per-session overrides, audit log. 默认禁，误触前就拦住。 |
| 9 | [SpaceRelay/dsh-subagent-control](https://github.com/SpaceRelay/dsh-subagent-control) | 5 | 2026-10-25 | 2026-10-25 | Three DSH tools that let any agent — including a team member — list, steer and stop the subagents it started. |
| 10 | [InoriMutsumi/dsh-grill-first](https://github.com/InoriMutsumi/dsh-grill-first) | 4 | 2026-10-15 | 2026-10-25 | DSH 插件：开工前刨根问底，把模糊需求问成明确需求，用户确认后才放行主任务 \| DSH plugin that clarifies requirements before work starts |
| 11 | [changan0617/dsh-skin](https://github.com/changan0617/dsh-skin) | 3 | 2026-08-14 | 2026-10-25 | DeepSeek Harness homepage-style chat background skin: fluid + dot grid + digitile whale |
| 12 | [LingyeSoul/DSH-SoulMojito](https://github.com/LingyeSoul/DSH-SoulMojito) | 3 | 2026-10-22 | 2026-10-25 | 把 DSH（deepseek-harness）扩展成兼容 SillyTavern 生态的原生角色扮演工作区 |
| 13 | [LittleAlety/dsh-team-conductor](https://github.com/LittleAlety/dsh-team-conductor) | 3 | 2026-10-24 | 2026-10-25 | Unified control plane for DeepSeek Harness Agent Teams: context-pressure visibility, member add/edit/rename/reassign/delete, runtime capacity, subagent steering, duplicate settlement-notice guard. |
| 14 | [LUgABeEEE/minas-webdav](https://github.com/LUgABeEEE/minas-webdav) | 3 | 2026-09-28 | 2026-10-25 | Xiaomi Smart Storage (MINAS) WebDAV control toolkit — CLI, probe, local proxy, agent skill &amp; MCP server (Apache-2.0) |
| 15 | [TABmk/dsh-theme-ascetic](https://github.com/TABmk/dsh-theme-ascetic) | 3 | 2026-10-25 | 2026-10-25 | ASCetic — compact ASCII / terminal theme for DeepSeek Harness: 19 palettes, 3 densities, vim-style status line, ascii.rest art |
| 16 | [xalor888/dsh-unlimited-retry](https://github.com/xalor888/dsh-unlimited-retry) | 3 | 2026-10-25 | 2026-10-25 | Unbounded model-request retry for the DeepSeek Harness agent loop, with a live Settings panel. |
| 17 | [airainal/dsh-codex-mode](https://github.com/airainal/dsh-codex-mode) | 2 | 2026-10-25 | 2026-10-25 | Codex mode for DeepSeek Harness: durable progress commentary, turn continuation, and a switch at the top of the permission menu. |
| 18 | [chaos-miku/dsh-error-atlas](https://github.com/chaos-miku/dsh-error-atlas) | 2 | 2026-10-24 | 2026-10-25 | DSH 插件：把运行错误与编程任务复盘渲染成 GPU 知识图谱 —— 每个会话一座岛，程序卫星绕外层，教训会主动回到模型上下文 |
| 19 | [Chaos-Paradox/dsh-search-proxy](https://github.com/Chaos-Paradox/dsh-search-proxy) | 2 | 2026-10-06 | 2026-10-25 | DSH Search &amp; Proxy: self-hosted SearXNG search + optional process proxy for DeepSeek Harness. Keep official search; the proxy may improve connectivity and downloads. \| DSH 搜索与代理：免费自托管搜索＋可选进程代理，继续使用官方搜索时也可用。 |
| 20 | [CJXIAO0718/dsh-plugin-session-share](https://github.com/CJXIAO0718/dsh-plugin-session-share) | 2 | 2026-10-25 | 2026-10-25 | 一个能够让你的dsh分享聊天对话记录的插件 |
| 21 | [Jack7510/ggb-plugins](https://github.com/Jack7510/ggb-plugins) | 2 | 2026-10-16 | 2026-10-25 | plugins for Codex/Deepseek Harness, to fulfill math question to Geogebra Script file. |
| 22 | [KouzakiUmi/dsh-tool-discovery](https://github.com/KouzakiUmi/dsh-tool-discovery) | 2 | 2026-10-06 | 2026-10-25 | Progressive tool discovery for DSH: a three-entry control protocol (tool_list / tool_search / tool_load) with a host-independent domain kernel and a DSH adapter. |
| 23 | [MarkGaster/dafiyu-dream](https://github.com/MarkGaster/dafiyu-dream) | 2 | 2026-10-24 | 2026-10-25 | A dream generator for DeepSeek Harness: turns recent conversations into short dreams. |
| 24 | [rongyishuaige7/dsh-stats](https://github.com/rongyishuaige7/dsh-stats) | 2 | 2026-08-15 | 2026-10-25 | DeepSeek Harness (DSH) 插件：项目级 Token 消耗、开发时间线与消费金额统计面板 |
| 25 | [ruanimal/dsh-sidebar-panel-buttons](https://github.com/ruanimal/dsh-sidebar-panel-buttons) | 2 | 2026-09-30 | 2026-10-25 | dsh 侧边栏顶部的全局面板菜单从「竖向文字列表」 收起为一排横向图标按钮 |
| 26 | [100759/dsh-fuulea-report](https://github.com/100759/dsh-fuulea-report) | 1 | 2026-10-25 | 2026-10-25 | 辅立码课（智慧教学云）教学数据报告工作台 — DeepSeek Harness 插件：管理看板取数、三版报告（正式版/简报版/交互版）、版本检查与一键更新 |
| 27 | [2424830124/dsh-model-picker](https://github.com/2424830124/dsh-model-picker) | 1 | 2026-10-23 | 2026-10-25 | 给 DeepSeek Harness 输入框换一个按 provider 分组的模型选择器，思考档位拆成独立滑杆。 |
| 28 | [2710586329/dsh-qq](https://github.com/2710586329/dsh-qq) | 1 | 2026-10-23 | 2026-10-25 | 把 QQ 接成 DeepSeek Harness 的一个前端：私聊、群聊都能和同一个 Agent 聊，还能戳一戳、贴表情、点赞。 |
| 29 | [abbaababa/dsh-mobile-access](https://github.com/abbaababa/dsh-mobile-access) | 1 | 2026-10-24 | 2026-10-25 | 让 iPhone/iPad 用 Safari 安全访问 Mac 或 Windows 10/11 上的 DeepSeek Harness Web；无需安装 App，不影响电脑原有使用。 |
| 30 | [acae2w3/dsh-kards-pilot](https://github.com/acae2w3/dsh-kards-pilot) | 1 | 2026-10-25 | 2026-10-25 | DeepSeek Harness ??:????? + ???????,???????,??????????? KARDS? |
| 31 | [acttk/dsh-bili-interactor](https://github.com/acttk/dsh-bili-interactor) | 1 | 2026-10-24 | 2026-10-25 | DSH 插件：让 AI 替你逛 B站 并真的产生互动 —— 点赞 / 投币 / 弹幕 / 评论 / 回评论 / 回复监听，带可视化面板 |
| 32 | [aliez656/pre-optimization-audit](https://github.com/aliez656/pre-optimization-audit) | 1 | 2026-10-25 | 2026-10-25 | 让ai把任务做的更深入，而不是更广 |
| 33 | [cctv2333/dsh-vidlens](https://github.com/cctv2333/dsh-vidlens) | 1 | 2026-10-25 | 2026-10-25 | DSH plugin: 18 local tools that watch a public video the way a person does - metadata, chapters, timestamped frames, subtitle-first transcripts, and 527-class sound events - without downloading the whole video. |
| 34 | [Chaiyahang/dsh-scratchpad](https://github.com/Chaiyahang/dsh-scratchpad) | 1 | 2026-10-25 | 2026-10-25 | Scratchpad panel for DeepSeek Harness: tagged notes, image/file attachments, Markdown task lists, send-to-chat, wake-up shortcut, JSON export/import, and Agent tools. |
| 35 | [d1s3s/dsh-companion](https://github.com/d1s3s/dsh-companion) | 1 | 2026-10-25 | 2026-10-25 | 陪伴型 Agent 插件：记得你（记忆存在模型外，换模型不失忆）、看得见屏幕和摄像头、能自己刷视频收集资讯、能替你起草消息。核心与宿主解耦，DSH 插件或任意 MCP 客户端都能跑，形象可运行时更换。 |
| 36 | [ddssh/dsh-joplin](https://github.com/ddssh/dsh-joplin) | 1 | 2026-10-24 | 2026-10-25 | Joplin notes plugin for DeepSeek Harness: search, read and (opt-in) edit notes via the local Web Clipper API. Zero runtime dependencies. |
| 37 | [dinjufen/dsh-next-prompt](https://github.com/dinjufen/dsh-next-prompt) | 1 | 2026-10-25 | 2026-10-25 | DeepSeek Harness plugin: predicts your next prompt after each turn — press Tab to accept |
| 38 | [DMM-331/dsh-rice-pet](https://github.com/DMM-331/dsh-rice-pet) | 1 | 2026-10-20 | 2026-10-25 | 鲸鱼娘吃白饭 · DeepSeek 桌宠插件 — 模型生成时一口一口吃白饭，住在 DSH 窗口或桌面任意角落，回合结束还会下海捞宝。A DeepSeek desktop pet for DSH. |
| 39 | [Dogtiti/dsh-plugin-provider-icons](https://github.com/Dogtiti/dsh-plugin-provider-icons) | 1 | 2026-10-25 | 2026-10-25 | 在 DeepSeek Harness 的模型选择器里显示供应商品牌 logo（24 个厂商图标 + 前缀匹配 + 灰点兜底） |
| 40 | [Eevvee153/whale-memory](https://github.com/Eevvee153/whale-memory) | 1 | 2026-10-24 | 2026-10-25 | 会忘记的伴生记忆系统 · DSH 插件 |
| 41 | [Elisoar111/dsh-anime](https://github.com/Elisoar111/dsh-anime) | 1 | 2026-10-25 | 2026-10-25 | 追番 — an anime tracker plugin for DeepSeek Harness: seasonal charts, airing schedule, search, watchlist, detail pages, bilibili / FQDM / AniCh streaming, torrents, downloads, OP/ED themes, and its own MSE player (PrismFlow) with libass subtitles and Anime4K. |
| 42 | [FelixJiashengFu/dsh-preview-theme](https://github.com/FelixJiashengFu/dsh-preview-theme) | 1 | 2026-10-25 | 2026-10-25 | Document preview color themes for DeepSeek Harness: PDF, Office, and spreadsheets. |
| 43 | [FelixJiashengFu/dsh-recent-deliverables](https://github.com/FelixJiashengFu/dsh-recent-deliverables) | 1 | 2026-10-24 | 2026-10-25 | Claude-style recent deliverables panel for DeepSeek Harness (dsh) |
| 44 | [forgotfish/dsh-cx-learn](https://github.com/forgotfish/dsh-cx-learn) | 1 | 2026-10-25 | 2026-10-25 | DSH 插件：超星学习通自动刷课与作业答题。支持 AI 答题 / 人工答题两种模式，可自选浏览器内核与 LLM 模型。 |
| 45 | [heshengtao/exameow-dsh-habit](https://github.com/heshengtao/exameow-dsh-habit) | 1 | 2026-10-25 | 2026-10-25 | Daily study goals, streaks, XP and durable DSH reminders for Exameow inside DeepSeek Harness. |
| 46 | [holy-ovo/dsh-startup](https://github.com/holy-ovo/dsh-startup) | 1 | 2026-10-25 | 2026-10-25 | DeepSeek Harness 的深海下潜启动开屏：深度尺与探测器、角色出场视频、海底地形与珊瑚礁、气泡与生物荧光 |
| 47 | [HuaLQIn/dsh-annotation-jump](https://github.com/HuaLQIn/dsh-annotation-jump) | 1 | 2026-10-25 | 2026-10-25 | Fork of dsh-annotation by omdsh-dev (MIT). Click an "Annotation N" chip in a reply to jump back to the annotated passage, highlight it briefly, and report clearly when the passage cannot be found. |
| 48 | [Ianzhyh/qoder-to-dsh](https://github.com/Ianzhyh/qoder-to-dsh) | 1 | 2026-10-25 | 2026-10-25 | 把 Qoder 的模型额度原生接进 DeepSeek Harness 的纯 dsh 插件 |
| 49 | [jcs130/dsh-minecraft-agent](https://github.com/jcs130/dsh-minecraft-agent) | 1 | 2026-08-15 | 2026-10-25 | Minecraft Agent for DeepSeek Harness Web/Desktop: live game view, native reasoning and tools, configurable personas, server notebooks and local survival knowledge. / 我的世界智能体 |
| 50 | [joshua05100413-cmd/dsh-AcidCore-plugins](https://github.com/joshua05100413-cmd/dsh-AcidCore-plugins) | 1 | 2026-10-25 | 2026-10-25 | DeepSeek Harness (DSH) Web 客户端插件：酸性科技风 WebGL 线框晶体背景 + Acid-Mono 主题 + 设置页控制面板；另有输入框字数/token 计量。零依赖、零构建、自带离线自检。 |
| 51 | [justskill-ai/justskill-design](https://github.com/justskill-ai/justskill-design) | 1 | 2026-10-08 | 2026-10-25 | Design web pages with your coding agent — one validated HTML file, fine-tuned on a local canvas. A skill, not a product: no MCP server, no app to install, no account, no build step, no npm install. |
| 52 | [Kadima-code/dsh-session-mirror](https://github.com/Kadima-code/dsh-session-mirror) | 1 | 2026-10-25 | 2026-10-25 | Per-conversation backup / restore / cleanup plugin for DeepSeek Harness (DSH). |
| 53 | [KouzakiUmi/dsh-hindsight-gui](https://github.com/KouzakiUmi/dsh-hindsight-gui) | 1 | 2026-10-06 | 2026-10-25 | A settings page for the Hindsight memory stack in the DeepSeek Harness sidebar, plus Windows deployment automation for a Hindsight server. |
| 54 | [LIN-F1SH/dsh-conversation-digest](https://github.com/LIN-F1SH/dsh-conversation-digest) | 1 | 2026-10-25 | 2026-10-25 | 读你的历史对话找出提问上的问题并给改写草稿，输入框一键出三档优化稿，采纳的问法自动归档成模板 |
| 55 | [liyangyu001-hue/dsh-work](https://github.com/liyangyu001-hue/dsh-work) | 1 | 2026-10-19 | 2026-10-25 | 人机协作的办公专注层：桌面置顶小条 + 任务面板 + 框选识别，人类执行、AI 建议。DSH 插件 + C++ 伴随层。 |
| 56 | [lolistlisa/dsh-autocut](https://github.com/lolistlisa/dsh-autocut) | 1 | 2026-10-25 | 2026-10-25 | DeepSeek Harness 中长视频自动剪辑：文案分段、素材/配乐检索、多轨时间线、剪映加密草稿导出 (20 autocut_* tools) |
| 57 | [maimaiqwe/prompt-enhancer](https://github.com/maimaiqwe/prompt-enhancer) | 1 | 2026-10-20 | 2026-10-25 | DSH composer plugin + Windows global hotkey + $p skill: four-tier prompt enhancement with a directional iterate panel — never changes intent, never invents requirements; one shared rules source behind all three entries. |
| 58 | [maoshiba6863/dsh-we-wallpaper](https://github.com/maoshiba6863/dsh-we-wallpaper) | 1 | 2026-10-19 | 2026-10-25 | 把本机 Wallpaper Engine 壁纸放到 DSH 界面背后：场景/视频/网页/图片四类壁纸，液态玻璃外观、音频可视化、遮挡省电、费用显示 |
| 59 | [mkfeyman/dsh-turkish-locale](https://github.com/mkfeyman/dsh-turkish-locale) | 1 | 2026-10-25 | 2026-10-25 | Turkish (Türkçe) language pack for the DeepSeek Harness Web UI — 64 namespaces, 2,910 strings, MIT |
| 60 | [Murphy2000-cyk/dsh-asr-xiaomi](https://github.com/Murphy2000-cyk/dsh-asr-xiaomi) | 1 | 2026-10-25 | 2026-10-25 | 基于小米 MiMo 云端识别给 DeepSeek Harness 加语音输入的插件 |
| 61 | [NewSpringWei/dsh-subagent-acp-ui](https://github.com/NewSpringWei/dsh-subagent-acp-ui) | 1 | 2026-10-24 | 2026-10-25 | 基于官方 ACP provider 接入任意 ACP agent，提供配置页、握手测试与路由 skill。 |
| 62 | [Oxygen640/dsh-plugin-nuaa-search](https://github.com/Oxygen640/dsh-plugin-nuaa-search) | 1 | 2026-10-23 | 2026-10-25 | 免 key 的 DSH 网页搜索插件：把内置 web_search 的后端换成直接抓 Bing 中文站 / 360 / SearXNG，返回真实 URL、摘要与发布日期，无需官方 DeepSeek API key。Zero-key web_search backend for DeepSeek Harness. |
| 63 | [poliucode/dsh-balance](https://github.com/poliucode/dsh-balance) | 1 | 2026-10-25 | 2026-10-25 | 在 DeepSeek Harness 桌面端侧边栏常驻显示 DeepSeek 账号余额的插件（宿主统一取数 + 浏览器浮层） |
| 64 | [PPZ-ART/dsh-ponytail](https://github.com/PPZ-ART/dsh-ponytail) | 1 | 2026-10-24 | 2026-10-25 | ponytail 移植：让模型消耗最少的 token 完成任务，解决浪费，支持 lite / full / ultra 三档强度。DeepSeek Harness（DSH）可用。 |
| 65 | [pucco-OD/dsh-sumika-widget](https://github.com/pucco-OD/dsh-sumika-widget) | 1 | 2026-10-25 | 2026-10-25 | A desktop character for DeepSeek Harness: shows the agent's state, plays waiting and completion sounds, and turns its questions and approvals into a pixel-art card you can answer without switching windows. |
| 66 | [pxvp2008/dsh-feishu-pilot](https://github.com/pxvp2008/dsh-feishu-pilot) | 1 | 2026-10-25 | 2026-10-25 | 把飞书变成 DSH 的远程控制台：桌面 GUI 会话的任务、审批、提问都能在手机上继续；任务结束主动通知；GUI 与飞书双端同时受理。扫码即可接入，离开电脑也不停。 |
| 67 | [QiaoSchoco/dsh-lit-shot](https://github.com/QiaoSchoco/dsh-lit-shot) | 1 | 2026-10-25 | 2026-10-25 | 仿照Wechat为dsh加上最便捷的桌面截图功能！ |
| 68 | [qzz19970504/dsh-model-picker-control](https://github.com/qzz19970504/dsh-model-picker-control) | 1 | 2026-10-24 | 2026-10-25 | Model picker control for DSH: rename, regroup, sort, hide and badge models across providers, with cross-provider partitions. 统一管理 DSH 模型选择器的显示。 |
| 69 | [ReWebaiyu/dsh-novel-assist](https://github.com/ReWebaiyu/dsh-novel-assist) | 1 | 2026-10-24 | 2026-10-25 | DSH 小说辅助模拟插件 dsh-novel-assist 0.6.0：自建 DSH 插件完整工程（Host + Client + 文档） |
| 70 | [ROYLeXJ/dsh-notify-tray](https://github.com/ROYLeXJ/dsh-notify-tray) | 1 | 2026-10-25 | 2026-10-25 | DeepSeek Harness 通知 + 状态栏插件：系统通知、macOS/Windows/Linux 托盘图标、任务进度与花费 |
| 71 | [sleeepingbeee/dsh-workspace-cleaner](https://github.com/sleeepingbeee/dsh-workspace-cleaner) | 1 | 2026-10-25 | 2026-10-25 | DSH Web UI plugin: list every workspace and conversation, then delete the checked ones with their logs, caches and registrations. |
| 72 | [SShiRkiT/dsh-matrix-theme](https://github.com/SShiRkiT/dsh-matrix-theme) | 1 | 2026-10-23 | 2026-10-25 | Matrix · 暗色玻璃主题 for DeepSeek Harness — Claude-style chrome, #040405 / #D9FFE2 / #C6FFD5 |
| 73 | [SteelUnion/dsh-softsensor-hub](https://github.com/SteelUnion/dsh-softsensor-hub) | 1 | 2026-10-23 | 2026-10-25 | Message hub and butler framework for DeepSeek Harness: event model, hot-reload rules, event store, and pluggable collectors. Built-in system monitor runs in-process. |
| 74 | [stoner-byte/dsh-annotations](https://github.com/stoner-byte/dsh-annotations) | 1 | 2026-10-22 | 2026-10-25 | Codex-style selected-text annotations for DeepSeek Harness |
| 75 | [sunbigfly/dsh-multi-user-service](https://github.com/sunbigfly/dsh-multi-user-service) | 1 | 2026-10-25 | 2026-10-25 | DSH 多用户服务：在公司或团队服务器上共用一套 DSH，集中管理成员账号、权限、会话、文件与用量。模型、工具、终端、代码和沙箱均沿用 DSH 原生能力。已验证 DSH 0.2.1-rc.2。 |
| 76 | [svoemesto/dsh-web-search-searxng](https://github.com/svoemesto/dsh-web-search-searxng) | 1 | 2026-10-25 | 2026-10-25 | Поиск в интернете через SearXNG для DeepSeek Harness: плагин сам поднимает контейнер и даёт агенту web_search без ключей вендора. · SearXNG-backed web search for the DeepSeek Harness, with its own container and no vendor key. |
| 77 | [tang-coder-hub/dsh-prompt-hub](https://github.com/tang-coder-hub/dsh-prompt-hub) | 1 | 2026-10-01 | 2026-10-25 | 提示词仓库 (Prompt Hub) for DeepSeek Harness：在输入框「完全权限」chip 旁加入口，存储/检索/插入提示词，支持草稿提示词优化（本地结构化 + AI 改写），带设置页管理面板几何、优化模型与数据。 |
| 78 | [taxueseek/plugin-fast-adapt](https://github.com/taxueseek/plugin-fast-adapt) | 1 | 2026-10-24 | 2026-10-25 | DSH 插件适配与破坏性变更核查，兼从零造插件脚手架：直连官方升级指南与 npm dist-tags 自动跟进新版，一条命令出五形态骨架并当场验证，零外部依赖。dsh-plugin-upgrade-skill 的独立衍生项目 |
| 79 | [tianguzhang/dsh-codex-bridge](https://github.com/tianguzhang/dsh-codex-bridge) | 1 | 2026-10-18 | 2026-10-25 | DSH 会话桥接：Codex / DeepSeek Harness / WorkBuddy 三端会话互通（导入导出） |
| 80 | [tonyischen/ds_ask_graph](https://github.com/tonyischen/ds_ask_graph) | 1 | 2026-10-25 | 2026-10-25 | 提问图谱：把 DSH 会话历史整理成可下钻的专题/问题图谱，支持语义整理与 HTML/SVG/Bluepin 导出。 |
| 81 | [ububwudb/dsh-memory-agent](https://github.com/ububwudb/dsh-memory-agent) | 1 | 2026-10-25 | 2026-10-25 | File-based long-term memory plugin for DeepSeek Harness: fixed read budget, BM25 search, confirmation gate, always-on injection, auto-settle. Zero runtime dependencies. |
| 82 | [usermbzlj/dsh-retro-dock](https://github.com/usermbzlj/dsh-retro-dock) | 1 | 2026-10-24 | 2026-10-25 | Instrument dials for DeepSeek Harness: live tokens/sec, context pressure and cache hit. |
| 83 | [Verisw/rea-dsh](https://github.com/Verisw/rea-dsh) | 1 | 2026-10-24 | 2026-10-25 | Reverse-engineering preset for DeepSeek Harness: one preset that mounts ~139 REA tools (Ghidra / Hopper / IDA), a reverse-engineer persona, and an evidence-first analysis workflow. Installs as a dsh bundle into the desktop, web, headless and dsh-tui profiles. |
| 84 | [wufa-cat/dsh-qq-bot](https://github.com/wufa-cat/dsh-qq-bot) | 1 | 2026-10-25 | 2026-10-25 | QQ 群聊/私聊机器人插件（DeepSeek Harness，macOS/Windows 开箱即用）：OneBot v11/NapCat、人设、表情包、工具白名单与联网搜索、对话巡检、关键词规则、定时消息、记忆管理。基于 ezoiLZH/QQ-bot，经原作者许可发布。 |
| 85 | [ybytlai78-dev/dsh-pet-chat](https://github.com/ybytlai78-dev/dsh-pet-chat) | 1 | 2026-10-25 | 2026-10-25 | 点桌面上的鲸鱼娘提问：它抓取当前屏幕，交给正在运行的 dsh 会话回答。Click the desktop pet to ask — it captures your screen and asks your running dsh session. |
| 86 | [YiZhiQvQ/dsh-remote](https://github.com/YiZhiQvQ/dsh-remote) | 1 | 2026-10-24 | 2026-10-25 | DSH 桌面 Web GUI 的单管理员局域网远程访问插件 + Android WebView 外壳 |
| 87 | [youqisibun/dsh-claude-effort-slider](https://github.com/youqisibun/dsh-claude-effort-slider) | 1 | 2026-10-25 | 2026-10-25 | Claude Code–style six-stop reasoning-effort slider for DeepSeek Harness, with a pixel-texture Ultracode mode |
| 88 | [yuxiaole-bili/dsh-apk-vm](https://github.com/yuxiaole-bili/dsh-apk-vm) | 1 | 2026-10-25 | 2026-10-25 | Preview and debug Android APKs inside DeepSeek Harness: a local rooted AOSP VM with up to 60 fps H.264/WebCodecs streaming, drag-and-drop install, UIAutomator automation, and isolated VMs per Agent. |
| 89 | [zhdzh-good/multi-role-groupchat](https://github.com/zhdzh-good/multi-role-groupchat) | 1 | 2026-10-25 | 2026-10-25 | Multi-role group chat plugin for DeepSeek Harness Web GUI: @ routing, handoffs, pins, rewrites, budgets, and Markdown export. |
| 90 | [0Junze0/dsh-mem0](https://github.com/0Junze0/dsh-mem0) | 0 | 2026-10-24 | 2026-10-25 | mem0-backed long-term memory plugin for DeepSeek Harness: auto recall, session capture, nightly dedupe/conflict resolution, topic cards, user profile, settings panel. |
| 91 | [15217814598/dsh-kanban](https://github.com/15217814598/dsh-kanban) | 0 | 2026-10-25 | 2026-10-25 | DeepSeek Harness 任务看板插件 — 自动任务、kanban_* 原生工具、飞书同步 |
| 92 | [2000HINA/dsh-crash-backup](https://github.com/2000HINA/dsh-crash-backup) | 0 | 2026-10-25 | 2026-10-25 | Directory-copy DSH environment backups with a crash-safe restore script. |
| 93 | [534056668/dsh-systemd-restart](https://github.com/534056668/dsh-systemd-restart) | 0 | 2026-10-25 | 2026-10-25 | DeepSeek Harness plugin: a restart row in Settings -&gt; General that ends the host gracefully and lets the systemd unit's Restart=always bring it back. No detached helper, so KillMode=control-group cannot break the restart. |
| 94 | [710765989/dsh-sticker-dict](https://github.com/710765989/dsh-sticker-dict) | 0 | 2026-10-25 | 2026-10-25 | 给 DSH 用的表情包字典：已看过的图按内容哈希缓存，避免重复识图；支持人工批注修正；GIF 自动抽帧拼图，让视觉模型看清整段动作。 |
| 95 | [9178159/dsh-napcat-bot](https://github.com/9178159/dsh-napcat-bot) | 0 | 2026-10-25 | 2026-10-25 | DeepSeek Harness 插件：内置 NapCat 的 QQ 机器人（识图 / 智能语音 / 随缘主动发言 / 联网搜索） |
| 96 | [A-f-ish/dsh-emotion-feedback](https://github.com/A-f-ish/dsh-emotion-feedback) | 0 | 2026-10-25 | 2026-10-25 | DSH plugin that judges the working model's own emotion and silently re-injects it before the next turn. |
| 97 | [A-Zee029/dsh-pele-mermaid](https://github.com/A-Zee029/dsh-pele-mermaid) | 0 | 2026-10-25 | 2026-10-25 | Mermaid diagram rendering plugin for DeepSeek Harness (DSH): readable inline previews + fullscreen pan/zoom canvas |
| 98 | [a3079566007-pixel/dsh-forage](https://github.com/a3079566007-pixel/dsh-forage) | 0 | 2026-10-25 | 2026-10-25 | 采源 Forage — 视频知识采集：快扫、转写、抽帧 OCR、摘要与本地检索（DSH 插件） |
| 99 | [AB-png123/dshplugin](https://github.com/AB-png123/dshplugin) | 0 | 2026-04-01 | 2026-10-25 | DSH 插件：启动时自动把 Hao Wallpaper 新下载的壁纸增量导入 DSH 壁纸引擎（幂等，macOS）。 |
| 100 | [Abeskandr/dsh-ue-db](https://github.com/Abeskandr/dsh-ue-db) | 0 | 2026-10-24 | 2026-10-25 | Offline Unreal Engine 5.8 database for DeepSeek Harness |
| 101 | [abluefan/dsh-floating-editor](https://github.com/abluefan/dsh-floating-editor) | 0 | 2026-10-25 | 2026-10-25 | 浮窗文本编辑器 —— CodeMirror 6 内核、文件树、透明度/字体可调 |
| 102 | [abluefan/dsh-font-picker](https://github.com/abluefan/dsh-font-picker) | 0 | 2026-10-25 | 2026-10-25 | 设置页的 UI 字体 / 代码字体选择 —— 枚举系统字体、即时套用、持久化 |
| 103 | [abluefan/dsh-injection-list](https://github.com/abluefan/dsh-injection-list) | 0 | 2026-10-25 | 2026-10-25 | 会话界面显示本轮上下文注入清单，补 0.2.1 UI 把 context 行折叠掉的缺口 |
| 104 | [abluefan/dsh-live-docs](https://github.com/abluefan/dsh-live-docs) | 0 | 2026-10-25 | 2026-10-25 | 让若干绝对路径的文件改动后自动以尾部追加方式到达模型 |
| 105 | [abluefan/dsh-palette](https://github.com/abluefan/dsh-palette) | 0 | 2026-10-25 | 2026-10-25 | DSH 调色盘 —— 逐项覆盖语义色与原材料色，写进 inline custom property |
| 106 | [abluefan/dsh-rhine-switch](https://github.com/abluefan/dsh-rhine-switch) | 0 | 2026-10-25 | 2026-10-25 | 给 dsh-rhine-splash 提供折叠式皮肤开关面板 |
| 107 | [abluefan/dsh-session-grid](https://github.com/abluefan/dsh-session-grid) | 0 | 2026-10-25 | 2026-10-25 | 多会话同屏网格 —— 一个页面并排 n 条独立会话，每格完整原生 UI |
| 108 | [abluefan/dsh-session-user-id](https://github.com/abluefan/dsh-session-user-id) | 0 | 2026-10-25 | 2026-10-25 | 每条会话独立、持久、随机的 DeepSeek API user_id |
| 109 | [acae2w3/dsh-soviet-console](https://github.com/acae2w3/dsh-soviet-console) | 0 | 2026-10-25 | 2026-10-25 | 苏联指挥台 — Soviet-styled command console UI plugin for DeepSeek Harness: two custom themes, Moscow clock, theme and language levers. |
| 110 | [ACCSCI/dsh-plugins](https://github.com/ACCSCI/dsh-plugins) | 0 | 2026-10-12 | 2026-10-25 | Plugins for DeepSeek Harness (dsh): host + web-client plugin packages, dependency-free tests |
| 111 | [adithyanraj03/dsh-cite-lens](https://github.com/adithyanraj03/dsh-cite-lens) | 0 | 2026-10-25 | 2026-10-25 | Cite Lens for dsh: select text in a PDF in the Files tab to quote or ask about it in the current chat, and turn the model's \[main.pdf p.7 "exact words"\] citations into links that open the PDF and highlight the passage; /cite-links makes a chat cite every claim. |
| 112 | [ahao0150/dsh-flow-canvas](https://github.com/ahao0150/dsh-flow-canvas) | 0 | 2026-10-23 | 2026-10-25 | DeepSeek Harness 插件：可交互的分支流程图决策画布，支持多选、自定义输入与图片节点 |
| 113 | [ahhTou/dsh-mcp-bridge](https://github.com/ahhTou/dsh-mcp-bridge) | 0 | 2026-10-22 | 2026-10-25 | 把 DeepSeek Harness 的会话能力变成 MCP Server：Claude Code、Cursor、Codex 等 Agent 可创建会话、发送消息、长轮询回合、回答提问，复用 DSH 的模型、工具与工作区。 |
| 114 | [Ahrunda/dsh-notify-kde](https://github.com/Ahrunda/dsh-notify-kde) | 0 | 2026-10-25 | 2026-10-25 | KDE desktop notification + KDE Connect phone ping for DeepSeek Harness (DSH) |
| 115 | [aleksvega/dsh-tg-bridge](https://github.com/aleksvega/dsh-tg-bridge) | 0 | 2026-10-25 | 2026-10-25 | Telegram bridge for DeepSeek Harness: text, voice, photos and project-per-topic sessions without opening the desktop app |
| 116 | [Aliboder/dsh-expert-hub](https://github.com/Aliboder/dsh-expert-hub) | 0 | 2026-10-17 | 2026-10-25 | DSH 专家中心：WorkBuddy 市场、AI 创建专家、详情即编辑、技能管理、按会话切换 |
| 117 | [Aliboder/dsh-prompt-forge](https://github.com/Aliboder/dsh-prompt-forge) | 0 | 2026-10-17 | 2026-10-25 | Composer prompt refinement plugin for DeepSeek Harness: rewrite the draft through the harness LLM, review the result, or replace it directly. |
| 118 | [Alice-Marx/dsh-fixed-port-bridge](https://github.com/Alice-Marx/dsh-fixed-port-bridge) | 0 | 2026-10-25 | 2026-10-25 | 给 DeepSeek Harness 一个固定的本地端口：在宿主进程内转发到 DSH 每次启动都会变的随机 web 端口 |
| 119 | [ALittleLov/dsh-clock-tools](https://github.com/ALittleLov/dsh-clock-tools) | 0 | 2026-10-23 | 2026-10-25 | Host-measured task timing for DSH agents: a task_clock tool that does not touch presets |
| 120 | [Anguis-L/dsh-plugin-adoption](https://github.com/Anguis-L/dsh-plugin-adoption) | 0 | 2026-10-25 | 2026-10-25 | DSH 插件：按真实 npm 月下载量给插件排名，而不是按 GitHub 星数；标出被星数低估的插件 |
| 121 | [AntonyLang/dsh-workflow-forge](https://github.com/AntonyLang/dsh-workflow-forge) | 0 | 2026-10-25 | 2026-10-25 | Author, validate, compile, trial-run and package DSH scenario plugins from a restricted WorkflowSpec. |
| 122 | [apanzinc/dsh-no-preview-badge](https://github.com/apanzinc/dsh-no-preview-badge) | 0 | 2026-10-25 | 2026-10-25 | 隐藏主页 Logo 旁的“预览版”小标。 |
| 123 | [Aression/dsh-maend](https://github.com/Aression/dsh-maend) | 0 | 2026-10-25 | 2026-10-25 | DeepSeek Harness plugin for MaaEnd (MXU): agent tools + dashboard panel, startup-mute and success-gated close-game hooks. |
| 124 | [Aression/Finding-Ledger](https://github.com/Aression/Finding-Ledger) | 0 | 2026-10-21 | 2026-10-25 | DSH 插件：面向长程故障排查的证据化发现账本，压缩/换会话后只把仍然适用、仍有证据的结论交回模型 |
| 125 | [Aya-zhang/dsh-quota-ring](https://github.com/Aya-zhang/dsh-quota-ring) | 0 | 2026-10-25 | 2026-10-25 | DeepSeek Harness sidebar balance ring for macOS: live balance, estimated daily spend, and peak/off-peak usage. |
| 126 | [BaxterL/dsh-code-taste](https://github.com/BaxterL/dsh-code-taste) | 0 | 2026-10-23 | 2026-10-25 | 让鲸鱼持续学习你的代码品味、审美风格和各种习惯 |
| 127 | [bbo777/dsh-baseline](https://github.com/bbo777/dsh-baseline) | 0 | 2026-10-24 | 2026-10-25 | A fail-closed security baseline plugin for DeepSeek Harness (DSH): policy-gated network egress, a monotonic subagent permission ceiling, and one hash-chained audit log of every tool decision and result. |
| 128 | [Beeasy-L/dsh-watchman](https://github.com/Beeasy-L/dsh-watchman) | 0 | 2026-10-25 | 2026-10-25 | 守夜人告警：把 DeepSeek Harness 的待审批/报错/任务结束推到手机（Server酱/Bark/企业微信群机器人），设置页可视化配置。 |
| 129 | [BEIDAOU/dsh-boot-animation-custom](https://github.com/BEIDAOU/dsh-boot-animation-custom) | 0 | 2026-10-25 | 2026-10-25 |  DeepSeek Harness 启动动画定制插件：8 段短片随机或固定播放，支持片尾淡入、分时问候、可选欢迎语和素材管理。 |
| 130 | [benjiyaya/dsh_AsaAgent](https://github.com/benjiyaya/dsh_AsaAgent) | 0 | 2026-10-24 | 2026-10-25 | Bridge Asa's self-learning research agent into DeepSeek Harness: mcp__asa__asa_research / asa_message / asa_status plus an asa_doctor diagnostic. Streamable-HTTP MCP bundle, zero dependencies. |
| 131 | [bestlike093/dsh-cyrene-balance](https://github.com/bestlike093/dsh-cyrene-balance) | 0 | 2026-10-25 | 2026-10-25 | 昔涟桌面桌宠（DeepSeek Harness 版）：透明置顶 Live2D 立绘，会眨眼、跟随鼠标、说话，看余额与系统状态；接管对话提问、风险审批与任务进度。作者：柒柒（bestlike093）。素材最原始来源为《崩坏：星穹铁道》官方美术（HoYoverse / 米哈游），仅供个人本机使用。 |
| 132 | [bigfatdsh/dsh-wechat-media-turbo](https://github.com/bigfatdsh/dsh-wechat-media-turbo) | 0 | 2026-10-25 | 2026-10-25 | DSH 插件：给 dsh-wechat-media 的微信聊天层 —— 鲸鱼娘·大肥鱼人设 + 接梗规则 + 精简工具集 + 短回复约定，含对照测评数据。 |
| 133 | [bingzhu44-blip/brutal-monkey](https://github.com/bingzhu44-blip/brutal-monkey) | 0 | 2026-10-25 | 2026-10-25 | DSH会话暴力删除插件：单条 / 跨工作区批量永久删除，清理磁盘日志、投影缓存、附件与子会话，不可恢复。 |
| 134 | [BlueX888/dsh-plugin-auto-contrib](https://github.com/BlueX888/dsh-plugin-auto-contrib) | 0 | 2026-10-25 | 2026-10-25 | AutoContrib: unattended GitHub open-source contributions for DeepSeek Harness |
| 135 | [bqbs/dsh-toggle-leftside](https://github.com/bqbs/dsh-toggle-leftside) | 0 | 2026-10-23 | 2026-10-25 | Deepseek Harness插件。让左侧折叠后支持悬浮、贴边预览。支持web和desktop。 |
| 136 | [ccawmiku/dsh-salon](https://github.com/ccawmiku/dsh-salon) | 0 | 2026-10-25 | 2026-10-25 | 四季沙龙：有独立人设与记忆的 DSH 陪伴群聊、本地视频共看与私聊插件 |
| 137 | [cdllI/dsh-gee](https://github.com/cdllI/dsh-gee) | 0 | 2026-10-25 | 2026-10-25 | Google Earth Engine agent plugin for DeepSeek Harness |
| 138 | [changan0617/dsh-deepseek-balance](https://github.com/changan0617/dsh-deepseek-balance) | 0 | 2026-10-18 | 2026-10-25 | DeepSeek API balance and usage floating card for the dsh web UI |
| 139 | [changan0617/dsh-plugin-market](https://github.com/changan0617/dsh-plugin-market) | 0 | 2026-10-18 | 2026-10-25 | Plugin market button for the dsh web UI - opens dshmarket.com in one click |
| 140 | [changzheng-Loji/dsh-peak-guard](https://github.com/changzheng-Loji/dsh-peak-guard) | 0 | 2026-10-25 | 2026-10-25 | DSH 强制峰谷模式：DeepSeek 高峰时段拦截新提问（可切换只提醒），聊天页常驻时段/模式/倒计时与本次会话花费估算 |
| 141 | [chaser-star/dsh-eda-review](https://github.com/chaser-star/dsh-eda-review) | 0 | 2026-10-24 | 2026-10-25 | 嘉立创EDA专业版（.epro2/.epru）工程解析与电路/PCB 审查技能（DSH Skill Bundle）：权威网表重建、引脚与封装核对、PCB 几何检查、版本增量审查。只读、无网络、无安装脚本；仅限自有或已授权文件，不解析加密、受保护或第三方保密文件。 |
| 142 | [Clmzz-gra/dsh-ask-autopilot](https://github.com/Clmzz-gra/dsh-ask-autopilot) | 0 | 2026-10-25 | 2026-10-25 | DSH plugin: answers an unanswered ask_user_question after a configurable deadline (recommended option first) and plays a notification sound when a question appears. |
| 143 | [Clmzz-gra/dsh-zen-mode](https://github.com/Clmzz-gra/dsh-zen-mode) | 0 | 2026-10-25 | 2026-10-25 | Zen mode for DeepSeek Harness: a full-screen minimal countdown that hides DSH while tasks run. |
| 144 | [codeadeel/dsh-browser](https://github.com/codeadeel/dsh-browser) | 0 | 2026-10-25 | 2026-10-25 | Live shared Chromium and a ranked search gateway for DeepSeek Harness — watch your agent browse and take over anytime |
| 145 | [coldgust/dsh-translation-assistant](https://github.com/coldgust/dsh-translation-assistant) | 0 | 2026-10-25 | 2026-10-25 | A DeepSeek Harness plugin: paste text, drop a file, or paste a screenshot to translate; proofread the result side by side with the source; let a second model score it and rewrite what it criticises; and process a whole folder of documents from the workspace drawer.  |
| 146 | [Colin-hymn/dsh-plugin-night-owl](https://github.com/Colin-hymn/dsh-plugin-night-owl) | 0 | 2026-10-25 | 2026-10-25 | Night Owl palette for DeepSeek Harness 适用于DeepSeek Harness 夜枭主题 |
| 147 | [ComeCaramelos/dsh-mcp-manager](https://github.com/ComeCaramelos/dsh-mcp-manager) | 0 | 2026-10-24 | 2026-10-25 | Manage several external MCP connections from the Web GUI |
| 148 | [CXk253-chenxing/dsh-chunk-download](https://github.com/CXk253-chenxing/dsh-chunk-download) | 0 | 2026-10-24 | 2026-10-25 | 给 AI Agent 用的 HTTP Range 分片下载器（DeepSeek Harness 插件）：多连接并发、断点续传、暂停/恢复、限速与队列，比 curl 单连接快数倍；Linux / macOS / Windows 通用，Android 可一键存进 Download。 |
| 149 | [daoxiang0520/dsh-winbot](https://github.com/daoxiang0520/dsh-winbot) | 0 | 2026-10-24 | 2026-10-25 | A dsh bot in Windows |
| 150 | [davidLi17/dsh-startup-animation](https://github.com/davidLi17/dsh-startup-animation) | 0 | 2026-10-25 | 2026-10-25 | DeepSeek Harness 开机启动动画插件：shell.overlay 覆盖层，3 秒，支持自定义开场 |
| 151 | [Dax233/dsh-codex-bridge](https://github.com/Dax233/dsh-codex-bridge) | 0 | 2026-10-24 | 2026-10-25 | Codex bridge for DeepSeek Harness: list local Codex threads, dispatch headless turns, read transcripts, monitor goal state and liveness. |
| 152 | [Dax233/dsh-provider-aliases](https://github.com/Dax233/dsh-provider-aliases) | 0 | 2026-10-25 | 2026-10-25 | DeepSeek Harness pi-ai route aliases: multiple credential routes over one installed catalog (e.g. several OpenCode Go plans) plus a Model aliases settings page. |
| 153 | [Dclef/dsh-agent-foreman](https://github.com/Dclef/dsh-agent-foreman) | 0 | 2026-10-25 | 2026-10-25 | DSH plugin: the parent agent splits work into orders, hands each to a contractor you picked (own provider/model/effort), and reviews the result. |
| 154 | [dd2003-460/dsh-structured-output](https://github.com/dd2003-460/dsh-structured-output) | 0 | 2026-10-25 | 2026-10-25 | DSH/Claude Code 插件：用强制工具调用把 subagent 输出焊死成固定结构（choice/open_choice/json），模型只有一个，每个 agent 配不同 schema。 |
| 155 | [dddmxza/dsh-ios-connect](https://github.com/dddmxza/dsh-ios-connect) | 0 | 2026-10-25 | 2026-10-25 | Show your iPhone screen live in the DSH right sidebar, and let the agent tap, swipe and type on it over USB. Windows, no Xcode. |
| 156 | [DDTomTom/dsh-code-pipeline](https://github.com/DDTomTom/dsh-code-pipeline) | 0 | 2026-10-24 | 2026-10-25 | DSH 复合代码开发流水线插件：Sol/Opus/DeepSeek 分阶段协作、独立验收、进度浮窗、逐环节模型与推理等级设置、中英双语 |
| 157 | [DDTomTom/dsh-plugin-manager](https://github.com/DDTomTom/dsh-plugin-manager) | 0 | 2026-10-25 | 2026-10-25 | DSH 侧栏插件管理器：集中查看全部非原生插件，启用 / 停用 / 卸载，附功能描述 |
| 158 | [dev-rookiestar/dsh-sound-plugin](https://github.com/dev-rookiestar/dsh-sound-plugin) | 0 | 2026-10-25 | 2026-10-25 | DeepSeek Harness 插件：回复完成 / 待审批提示音 |
| 159 | [DeZhou123/dsh-free-model](https://github.com/DeZhou123/dsh-free-model) | 0 | 2026-10-22 | 2026-10-25 | Free-model console for DSH: CodeBuddy + WorkBuddy account lanes, local service lanes (OpenCode free tier, FreeLLMAPI gateway, Ollama) with HTTP probes, and 21 bring-your-own-key / keyless channels 鈥?one settings page, three tabs. Channel data is a three-layer catalog so new channels arrive without a release. |
| 160 | [dhdkfkfkf/dsh-pull-to-send](https://github.com/dhdkfkfkf/dsh-pull-to-send) | 0 | 2026-10-24 | 2026-10-25 | DSH plugin: press the composer, pull up, release to send. With FLIP flight animation. |
| 161 | [dongasai/dsh_debug_web](https://github.com/dongasai/dsh_debug_web) | 0 | 2026-10-25 | 2026-10-25 | 让 DSH 的 agent 在页面里执行 JS、读控制台 —— 一个模型工具 dsh_debug_web，走既有 Cordis Host→Client Inspect 通道 \| Let the agent run JS inside the live DSH web page and read its console, over the existing inspect channel |
| 162 | [DoreiHime/dsh-help-me-to-ask](https://github.com/DoreiHime/dsh-help-me-to-ask) | 0 | 2026-10-24 | 2026-10-25 | 提问引导（dsh-HelpMe-To-Ask）— 在模型动手前先问清楚目标、交付物与验收标准 / Ask before it builds: turn vague requests into a clear task sheet for DeepSeek Harness. |
| 163 | [doyokol/dsh-model-star](https://github.com/doyokol/dsh-model-star) | 0 | 2026-10-25 | 2026-10-25 | DSH 插件：模型收藏（星标常用 provider/model 组合，一键切换） |
| 164 | [doyokol/dsh-wechat-bridge](https://github.com/doyokol/dsh-wechat-bridge) | 0 | 2026-10-25 | 2026-10-25 | 把个人微信接进 DeepSeek Harness：自建 reader 收消息 + 自编译 hook 发消息，不依赖第三方客户端 |
| 165 | [DRAG0NM/Pare-DSH](https://github.com/DRAG0NM/Pare-DSH) | 0 | 2026-10-20 | 2026-10-25 | Pare's AI disk investigation inside DeepSeek Harness: read-only investigation tools, approval-gated reversible cleanup, a pinned and hash-verified core. |
| 166 | [drinkMornTea/dsh-rabbit-skin](https://github.com/drinkMornTea/dsh-rabbit-skin) | 0 | 2026-10-25 | 2026-10-25 | 木屋白兔皮肤（DSH 0.2.1 client plugin）：白兔站在深棕木隔板前，0–4 档体重滑块喂胖它。 |
| 167 | [duwenlong2/dsh-login-gate](https://github.com/duwenlong2/dsh-login-gate) | 0 | 2026-10-25 | 2026-10-25 | DSH 登录门禁插件：网页内首次设置密码、scrypt + DPAPI 存储、会话与限流。Password gate for the DSH web listener. |
| 168 | [duyanta123/dsh-change-impact](https://github.com/duyanta123/dsh-change-impact) | 0 | 2026-10-25 | 2026-10-25 | Evidence-backed change impact analysis and verification plans for DeepSeek Harness. |
| 169 | [EasonQuantico/dsh-prompt-enhance](https://github.com/EasonQuantico/dsh-prompt-enhance) | 0 | 2026-10-25 | 2026-10-25 | DSH plugin: turn a composer draft into an executable prompt. Code mode reads the workspace and audits security; creative mode enriches prose or tightens script structure; Superpowers / Prompt Optimizer / LangGPT / AiShort techniques are routed automatically. |
| 170 | [eatone9254/dsh-balance-badge](https://github.com/eatone9254/dsh-balance-badge) | 0 | 2026-10-25 | 2026-10-25 | 在 DeepSeek Harness 主界面右下角显示账户余额的插件 |
| 171 | [ecbob/dsh-ctx-meter](https://github.com/ecbob/dsh-ctx-meter) | 0 | 2026-10-25 | 2026-10-25 | DSH plugin: a /ctx slash command that prints session context occupancy for zero model tokens, plus one collapsed notice each time occupancy crosses 25% / 50% / 75%. Host-only, zero runtime dependencies. |
| 172 | [edisoncks/dsh-cookie-renew](https://github.com/edisoncks/dsh-cookie-renew) | 0 | 2026-10-25 | 2026-10-25 | Sliding renewal for the DSH web browser-session cookie — a DSH host plugin bundle |
| 173 | [EnderBull/dsh-mist-ink-theme](https://github.com/EnderBull/dsh-mist-ink-theme) | 0 | 2026-10-25 | 2026-10-25 | Mist Ink — a softer graphite dark theme with frosted glass for the DeepSeek Harness Web GUI. |
| 174 | [Ersith/akasha-book-v2](https://github.com/Ersith/akasha-book-v2) | 0 | 2026-10-25 | 2026-10-25 | Akasha - auditable external-brain memory toolkit for LLM agents. Clean history; no personal memory snapshot. |
| 175 | [fangchenghao/latex-look](https://github.com/fangchenghao/latex-look) | 0 | 2026-10-22 | 2026-10-25 | Give an AI agent eyes for LaTeX: compile, render the page, locate the source line, diff the edit, audit the whole book. Proven on a 215-page book. |
| 176 | [fanrj3/dsh-presence](https://github.com/fanrj3/dsh-presence) | 0 | 2026-10-25 | 2026-10-25 | Run coding agents on any SSH host as if it were local: one persistent connection, native file editing, search, exec, terminals and port forwards, with nothing installed remotely. |
| 177 | [fbbDirge/dsh-xiaoheihe](https://github.com/fbbDirge/dsh-xiaoheihe) | 0 | 2026-10-24 | 2026-10-25 | dhs插件自动刷小黑盒插件 |
| 178 | [fenglangyj/dsh-account-hub](https://github.com/fenglangyj/dsh-account-hub) | 0 | 2026-10-25 | 2026-10-25 | Native DeepSeek Harness account workspace with isolated persistent Camoufox browser profiles |
| 179 | [Fireawa/dsh-convo-tally](https://github.com/Fireawa/dsh-convo-tally) | 0 | 2026-10-25 | 2026-10-25 | DSH 侧栏会话记账：本对话的今日 / 累计花费，人民币与美元双币，按官方峰谷价目表在每次模型调用时结算。 |
| 180 | [FireflyLover520/dsh-game-uid](https://github.com/FireflyLover520/dsh-game-uid) | 0 | 2026-10-25 | 2026-10-25 | DSH 插件：按 UID 查原神 / 星铁 / 绝区零的角色练度与汇总面板（只展示数据，不打分） |
| 181 | [FlameTinary/dsh-phone-remote](https://github.com/FlameTinary/dsh-phone-remote) | 0 | 2026-10-25 | 2026-10-25 | Phone/tablet access to the DeepSeek Harness desktop Web UI over LAN — a host-only DSH plugin. DeepSeek Harness client only. |
| 182 | [fly-cat-2015/dsh-quick-input](https://github.com/fly-cat-2015/dsh-quick-input) | 0 | 2026-09-24 | 2026-10-25 | 一个为deepseek-harness提供快捷输入的插件 |
| 183 | [Fr20210478/dsh-whale-chase-rice](https://github.com/Fr20210478/dsh-whale-chase-rice) | 0 | 2026-10-25 | 2026-10-25 | A chibi whale-girl runner plugin for DeepSeek Harness: jump life's word burdens and reach the rice bowl. |
| 184 | [FunnyDiodio/dsh-session-delete](https://github.com/FunnyDiodio/dsh-session-delete) | 0 | 2026-10-25 | 2026-10-25 | Delete-session plugin for DeepSeek Harness (DSH): adds a one-click force-delete to the sidebar session menu; removes log/cache/registry with no ghost rows. DSH 会话删除插件，支持强制一步删除，不留幽灵行。 |
| 185 | [FunnyDiodio/dsh-workspace-picker-path](https://github.com/FunnyDiodio/dsh-workspace-picker-path) | 0 | 2026-10-25 | 2026-10-25 | DSH plugin: control where the Add-workspace directory picker opens (custom path / remember last pick) |
| 186 | [genius-alray/dsh-plugin-agent-notifications](https://github.com/genius-alray/dsh-plugin-agent-notifications) | 0 | 2026-10-25 | 2026-10-25 | DSH Web 插件：Agent 任务完成 / 需要操作 / 出错时发送浏览器通知，三种情况分别可设提示音。Browser notifications for DeepSeek Harness. |
| 187 | [GGBound-1229/dsh-session-reaper](https://github.com/GGBound-1229/dsh-session-reaper) | 0 | 2026-10-25 | 2026-10-25 | 删除会话的插件，dsh默认不让删除会话，该插件可用于删除会话，删除的会话会将进入回收站，在回收站可恢复或删除 |
| 188 | [GGBound-1229/dsh-vision-all](https://github.com/GGBound-1229/dsh-vision-all) | 0 | 2026-10-25 | 2026-10-25 | dsh添加三方API后，配置默认没有image参数，安装插件后，已有的三方和后续添加到三分都会自动配置好 |
| 189 | [gitByteFree/dsh-pomodoro-pet](https://github.com/gitByteFree/dsh-pomodoro-pet) | 0 | 2026-10-24 | 2026-10-25 | dsh plugin |
| 190 | [GlariaLuminous/plugin-health-check](https://github.com/GlariaLuminous/plugin-health-check) | 0 | 2026-10-23 | 2026-10-25 | 面向 DeepSeek Harness（DSH）的只读插件体检工具：检查 profile、bundle、patch、版本兼容与 MCP 冲突，支持安装前候选检查。 |
| 191 | [glentao-dev/dsh-pdf-toolbox](https://github.com/glentao-dev/dsh-pdf-toolbox) | 0 | 2026-10-25 | 2026-10-25 | PDF 结构操作 DSH 插件：合并/拆分/压缩/加水印/提取-删除-旋转-插入页面/元数据/加密检测/文本提取（9 个工具 14 项操作，纯本地 pdf-lib + pdfjs-dist） |
| 192 | [gpteth/dsh-onchain-arbitrage-radar](https://github.com/gpteth/dsh-onchain-arbitrage-radar) | 0 | 2026-10-24 | 2026-10-25 | Read-only on-chain arbitrage radar for DeepSeek Harness: cross-venue spreads, funding crowding, tokenized-stock clock, cost model and execution gate. |
| 193 | [GuanYunMao/dsh-plugins](https://github.com/GuanYunMao/dsh-plugins) | 0 | 2026-10-25 | 2026-10-25 | DeepSeek Harness 自研插件集合：本地知识库（可离线 embedding）、会话分支树、工作区地图、进程监视、配置快照、文件守卫（7 个包，可单独安装） |
| 194 | [gulagala001/dsh-response-id-reuse](https://github.com/gulagala001/dsh-response-id-reuse) | 0 | 2026-10-25 | 2026-10-25 | Transparent Responses ID continuation for DeepSeek Harness; no UI or model probes. |
| 195 | [Gwenlita52299/Augean](https://github.com/Gwenlita52299/Augean) | 0 | 2026-10-25 | 2026-10-25 | Project Memory Framework: spec-driven 文档治理 —— 代码是 ground truth，测试是承重墙，文档按需而生、按时而死。DSH 插件 @gwenlita52299/augean  |
| 196 | [H-Y-1-1/dsh-watch-history](https://github.com/H-Y-1-1/dsh-watch-history) | 0 | 2026-10-24 | 2026-10-25 | 跨平台观看历史 DSH 插件：把 Agent 看过的内容记成本地账本，在设置页用卡片墙回看；支持任意平台、Provider/声明式元数据补全和本地 token 鉴权。 |
| 197 | [HAN102300/dsh-bot](https://github.com/HAN102300/dsh-bot) | 0 | 2026-10-25 | 2026-10-25 | 这是一个在DSH harness当中，用一句自然语言，把重复性的守护工作交给一个有记忆、有预算、可回滚的 AI 队友的插件 |
| 198 | [Harua79/dsh-balance-ledger](https://github.com/Harua79/dsh-balance-ledger) | 0 | 2026-10-25 | 2026-10-25 | DSH 余额账本 — 余额常驻显示，并按会话记录钱花在了哪里 |
| 199 | [hesheng01/dsh-pele](https://github.com/hesheng01/dsh-pele) | 0 | 2026-10-25 | 2026-10-25 | pele-powered inline Mermaid diagrams for DeepSeek Harness (dsh) sessions |
| 200 | [heswy/dsh-video-editor](https://github.com/heswy/dsh-video-editor) | 0 | 2026-10-17 | 2026-10-25 | AI video creation and multitrack editing inside DeepSeek Harness · 对话生成、即时预览、多轨剪辑与 MP4 导出 |
| 201 | [hiocobueno653-pixel/dsh-image-gen](https://github.com/hiocobueno653-pixel/dsh-image-gen) | 0 | 2026-10-24 | 2026-10-25 | DSH image generation plugin: a no-chatter generate_image tool with a GridReveal animation and a Turn-tail image card. Provider-agnostic, no bundled keys or endpoints. |
| 202 | [HLhhh/dsh-skill-stats](https://github.com/HLhhh/dsh-skill-stats) | 0 | 2026-10-25 | 2026-10-25 | Skill usage statistics panel for DeepSeek Harness: every installed skill with its use count, session coverage, and share of all skill use. |
| 203 | [hualuo520-h/dsh-proteus-bridge](https://github.com/hualuo520-h/dsh-proteus-bridge) | 0 | 2026-10-25 | 2026-10-25 | DeepSeek Harness 插件：让 Agent 控制 Proteus 8/9 交互仿真并保存工程（COM / UI 双传输） |
| 204 | [HYClub/dsh-ufo](https://github.com/HYClub/dsh-ufo) | 0 | 2026-10-25 | 2026-10-25 | 美国空军蓝皮书（1947–1969，12,618 起）、法国 GEIPAN 的三千余宗案卷、英国国防部 DEFE 24、巴西国家档案馆，以及 NUFORC 的十六万条民间目击——一个入口都调得到。 |
| 205 | [ilovecnxx/dsh-camera](https://github.com/ilovecnxx/dsh-camera) | 0 | 2026-10-25 | 2026-10-25 | DSH 插件：局域网手机扫码拍照/选图，手动确认后直接发进当前对话（多图一条消息，不自动发送）。LAN phone camera → DSH chat, manual review &amp; send. |
| 206 | [ionaryu/dsh-copy-document](https://github.com/ionaryu/dsh-copy-document) | 0 | 2026-10-24 | 2026-10-25 | Adds a whole-document copy button to the DeepSeek Harness sidebar editor header, right of Save |
| 207 | [isayrhythm/dsh-plugins](https://github.com/isayrhythm/dsh-plugins) | 0 | 2026-09-19 | 2026-10-25 | isayrhythm 的 DeepSeek Harness 插件集合 (DSH plugin collection) |
| 208 | [ityyq777/dsh-progress-tick](https://github.com/ityyq777/dsh-progress-tick) | 0 | 2026-10-24 | 2026-10-25 | Tell the DSH main agent to report progress every N minutes. |
| 209 | [JackAIStudio/dsh-video-preview](https://github.com/JackAIStudio/dsh-video-preview) | 0 | 2026-10-24 | 2026-10-25 | dsh-better-sidebar 的视频文件预览插件（zemul/dsh-video-preview 的 fork）：内置 Range 路由，桌面版进度条可正常拖动 |
| 210 | [JaMoLpE88/dsh-desktop-chat](https://github.com/JaMoLpE88/dsh-desktop-chat) | 0 | 2026-10-24 | 2026-10-25 | Official DeepSeek Chat inside DSH Desktop: one sidebar panel, the real chat.deepseek.com page, and a session that survives restarts. No Electron internals, no chat reimplementation. |
| 211 | [JaMoLpE88/dsh-opencodego-usage](https://github.com/JaMoLpE88/dsh-opencodego-usage) | 0 | 2026-10-25 | 2026-10-25 | OpenCode Go subscription usage in the DeepSeek Harness composer: 5-hour, weekly and monthly windows with a click-open details panel. Zero configuration. |
| 212 | [jasonchan2026/dsh-lan-chat](https://github.com/jasonchan2026/dsh-lan-chat) | 0 | 2026-10-25 | 2026-10-25 | 局域网聊天助手 — DSH 插件，隔离内网的即时通讯：单聊 / 群聊 / 文件传输 / 网段扫描加好友（零运行时依赖） |
| 213 | [JasperPengC/agent-blackbox](https://github.com/JasperPengC/agent-blackbox) | 0 | 2026-10-24 | 2026-10-25 | AI 编程 agent 的飞行记录仪：本地优先，回放、归因与对比 DSH / Claude Code / Codex / ACP 会话。零运行时依赖，无遥测。 |
| 214 | [JasperPengC/dsh-agent-blackbox](https://github.com/JasperPengC/dsh-agent-blackbox) | 0 | 2026-10-24 | 2026-10-25 | DSH 插件：在侧栏打开 agent-blackbox 仪表盘——实时监视、时间轴回放与跨会话成本总览；宿主进程内挂载，不额外起进程或端口。 |
| 215 | [java-hue/dsh-census](https://github.com/java-hue/dsh-census) | 0 | 2026-10-25 | 2026-10-25 | Plugin census for DeepSeek Harness: what is loaded, what it costs (KV cache), what collides |
| 216 | [jeremytenjo/dsh-plugin-always-on-top](https://github.com/jeremytenjo/dsh-plugin-always-on-top) | 0 | 2026-10-24 | 2026-10-25 | Pin the DeepSeek Harness desktop window above every other app from a button beside source control. |
| 217 | [jeremytenjo/dsh-plugin-backlog-md](https://github.com/jeremytenjo/dsh-plugin-backlog-md) | 0 | 2026-10-24 | 2026-10-25 | Native Backlog.md task management for DeepSeek Harness |
| 218 | [jeremytenjo/dsh-plugin-infinite-split-tabs](https://github.com/jeremytenjo/dsh-plugin-infinite-split-tabs) | 0 | 2026-10-25 | 2026-10-25 | Infinite split tabs for the DeepSeek Harness right sidebar — split down, nest both ways, persist layouts. |
| 219 | [jeremytenjo/dsh-plugin-npm-scripts](https://github.com/jeremytenjo/dsh-plugin-npm-scripts) | 0 | 2026-10-24 | 2026-10-25 | Option+A npm script palette for DeepSeek Harness: search package.json scripts and run one in a new terminal. |
| 220 | [jeremytenjo/dsh-plugin-terminal-upgrades](https://github.com/jeremytenjo/dsh-plugin-terminal-upgrades) | 0 | 2026-10-25 | 2026-10-25 | Terminal upgrades for DeepSeek Harness: option-click a link in the terminal to open it in your browser. |
| 221 | [Jessicaisleep/dsh-wm-toolkit](https://github.com/Jessicaisleep/dsh-wm-toolkit) | 0 | 2026-09-18 | 2026-10-25 | 撤回、编辑指令与回复（连思考过程一起改）、用原提问重新生成、会话归档/删除/跨工作区移动与工作区迁移。Recall, edit prompts and replies (reasoning included), regenerate with the original prompt, session archive/delete, cross-workspace move, and workspace migration. |
| 222 | [jfanfly/bil-yet-next](https://github.com/jfanfly/bil-yet-next) | 0 | 2026-10-25 | 2026-10-25 | DSH 插件：B站、小黑盒与日常聊天的个人内容助手（内容助手视图） |
| 223 | [Jimxinfang/dsh-theme-neo-brutalist](https://github.com/Jimxinfang/dsh-theme-neo-brutalist) | 0 | 2026-10-25 | 2026-10-25 | Neo-Brutalist theme for the DeepSeek Harness Web UI: paper &amp; ink palettes, 4px hard rules, 8px offset shadows, zero radius, hazard stripes, instant apply with factory restore. |
| 224 | [Jimxinfang/dsh-theme-stripe-style](https://github.com/Jimxinfang/dsh-theme-stripe-style) | 0 | 2026-10-25 | 2026-10-25 | Stripe Style theme for the DeepSeek Harness Web UI: 40px purple grid, layered soft shadows, 12px cards, instant light/dark switch with factory restore. |
| 225 | [jishi7/dsh-diagram-design](https://github.com/jishi7/dsh-diagram-design) | 0 | 2026-10-24 | 2026-10-25 | DSH 专用 diagram-design skill：45 种编辑设计风格图表，输出单文件 HTML+SVG；可重绘 drawio / Mermaid / Excalidraw，可导出 SVG/PNG。 |
| 226 | [joansgwjbsu/dsh-plugin-cdp](https://github.com/joansgwjbsu/dsh-plugin-cdp) | 0 | 2026-10-25 | 2026-10-25 | DeepSeek Harness plugin: Chrome DevTools Protocol automation |
| 227 | [JoblessJoe/dsh-ping-me](https://github.com/JoblessJoe/dsh-ping-me) | 0 | 2026-10-25 | 2026-10-25 | Push-only phone notifications for DeepSeek Harness (dsh) via ntfy: turn results, approvals, questions, failures, and alerts from automation tasks. Nobody can talk back to your agents. |
| 228 | [Jokii-Joy/novel-writer](https://github.com/Jokii-Joy/novel-writer) | 0 | 2026-10-25 | 2026-10-25 | 精神空间 — DeepSeek Harness 的沉浸式小说写作插件（GPL-3.0） |
| 229 | [jonascarv/dsh-plugins](https://github.com/jonascarv/dsh-plugins) | 0 | 2026-10-25 | 2026-10-25 | Community plugins for DeepSeek Harness — pt-BR language pack and more. Tradução Português do Brasil (pt-br) e outros.  |
| 230 | [KarBurKi/dsh-flow](https://github.com/KarBurKi/dsh-flow) | 0 | 2026-10-24 | 2026-10-25 | 跨会话流程编排：四角色（统筹/预研/开发/测试）的派单、独立验收、需求比对、终审把关、归档闭环。DSH 插件，零依赖。 |
| 231 | [KarBurKi/dsh-recall](https://github.com/KarBurKi/dsh-recall) | 0 | 2026-10-19 | 2026-10-25 | 极简跨会话记忆：3 个工具、零自动注入、按工作区隔离，JSONL 文件即数据库。 |
| 232 | [KarBurKi/dsh-theater](https://github.com/KarBurKi/dsh-theater) | 0 | 2026-10-19 | 2026-10-25 | 多角色剧场的执行器：为每个角色创建/唤醒独立会话，投递 cue 并取回台词。零依赖，不 import 核心包。 |
| 233 | [KarBurKi/dsh-tts](https://github.com/KarBurKi/dsh-tts) | 0 | 2026-10-19 | 2026-10-25 | DSH 回答朗读：GPT-SoVITS 本机模型 + Edge 在线音色 + Windows SAPI；按语种路由，并支持按 sessionId 绑定音色 |
| 234 | [keyblues/dsh-plugin-everything](https://github.com/keyblues/dsh-plugin-everything) | 0 | 2026-10-25 | 2026-10-25 | DeepSeek Harness (DSH) plugin — instant whole-disk file search through the local voidtools Everything index. DSH 插件：接入本机 Everything 索引，全盘秒级搜索文件。 |
| 235 | [kgmkm/dsh-rustxng](https://github.com/kgmkm/dsh-rustxng) | 0 | 2026-10-25 | 2026-10-25 | DeepSeek Harness plugin: answer the built-in web_search with your own RustXNG metasearch instance (Windows / macOS / Linux) |
| 236 | [KiiiiiG/dsh-harness-restart](https://github.com/KiiiiiG/dsh-harness-restart) | 0 | 2026-10-25 | 2026-10-25 | One-click restart for DeepSeek Harness: a sidebar entry plus an out-of-process helper that quits and relaunches the desktop app. |
| 237 | [kirkchinese/DSH-Recollect](https://github.com/kirkchinese/DSH-Recollect) | 0 | 2026-10-25 | 2026-10-25 | 为 DeepSeek Harness 打造的兼容 Claude Code 的记忆系统：CLAUDE.md/AGENTS.md 分层指令 + MEMORY.md 持久记忆，所有模型同一套完整指导。 |
| 238 | [kongbai-chao/dsh-plugin-whale-skin](https://github.com/kongbai-chao/dsh-plugin-whale-skin) | 0 | 2026-09-30 | 2026-10-25 | Deep-sea whale-girl theme for the DeepSeek Harness desktop client: deep-blue palette (light/dark) plus two corner illustrations. |
| 239 | [KunalGupta25/dsh-login-gateway](https://github.com/KunalGupta25/dsh-login-gateway) | 0 | 2026-10-24 | 2026-10-25 | ogin wall and public gateway plugin for DeepSeek Harness cloud deployments |
| 240 | [kx2398/dsh-session-mesh](https://github.com/kx2398/dsh-session-mesh) | 0 | 2026-10-25 | 2026-10-25 | Cross-session mesh for DeepSeek Harness (dsh): list every session in every workspace, message any session as a real agent message, create/rename/archive/cancel sessions, and wait for session changes. |
| 241 | [lcx19970714/dsh-limob-runner](https://github.com/lcx19970714/dsh-limob-runner) | 0 | 2026-10-25 | 2026-10-25 | DSH 客户端插件：在 DSH 内置终端里运行 Limob 项目命令，支持 GitHub 更新提示。 |
| 242 | [LeeeWM/dsh-session-notifier](https://github.com/LeeeWM/dsh-session-notifier) | 0 | 2026-10-25 | 2026-10-25 | Windows 11 toast notification when a DSH session turn finishes, with focus-aware suppression. |
| 243 | [Liaoyun666/dsh-android-portability](https://github.com/Liaoyun666/dsh-android-portability) | 0 | 2026-10-25 | 2026-10-25 | DSH 插件安卓可移植性静态体检：17 条规则查一个插件装到 DSHA（Linux arm64 + glibc proot）上会不会直接跑不起来。Static portability audit for DeepSeek Harness plugins targeting Android. |
| 244 | [Liaoyun666/dsh-workbuddy-android](https://github.com/Liaoyun666/dsh-workbuddy-android) | 0 | 2026-10-25 | 2026-10-25 | 把 WorkBuddy 桌面版已登录的凭据搬到 DSHA 安卓端：导出 wb1. 传输令牌 → 手机导入 → dsh-workbuddy-bridge 直接可用 |
| 245 | [Liaoyun666/dsha-capability-map](https://github.com/Liaoyun666/dsha-capability-map) | 0 | 2026-10-25 | 2026-10-25 | DSHA 设备能力地图：一条命令问清这台安卓手机上 agent 到底能用哪些能力，逐项分清没开开关 / 没给权限 / 时机不对 / 真坏了。 |
| 246 | [Lirunhua/dsh-model-meter](https://github.com/Lirunhua/dsh-model-meter) | 0 | 2026-10-25 | 2026-10-25 | Usage Panel · 用量面板 — Unofficial DeepSeek Harness sidebar for GLM/Kimi plan quotas, reset times, and DeepSeek API balances. |
| 247 | [littepointR/dsh-suggested-task](https://github.com/littepointR/dsh-suggested-task) | 0 | 2026-10-24 | 2026-10-25 | Suggested follow-up tasks after each completed DeepSeek Harness turn, launched as child sessions in isolated Git worktrees |
| 248 | [ljxdsg12/dsh-composer-polish](https://github.com/ljxdsg12/dsh-composer-polish) | 0 | 2026-10-25 | 2026-10-25 | Polish button for the DeepSeek Harness composer: rewrite your draft prompt, then cancel back to the original text. |
| 249 | [ljz970803/dsh-voice-wake](https://github.com/ljz970803/dsh-voice-wake) | 0 | 2026-10-25 | 2026-10-25 | DSH 本地语音唤醒插件 |
| 250 | [lornwolf/dsh-claude-subscription](https://github.com/lornwolf/dsh-claude-subscription) | 0 | 2026-10-24 | 2026-10-25 | Use a Claude Pro/Max subscription inside DeepSeek Harness: OAuth login, multi-account vault, quota cards and a settings panel. |
| 251 | [lov0vo/dsh-whale-maid](https://github.com/lov0vo/dsh-whale-maid) | 0 | 2026-10-25 | 2026-10-25 | The 1024Store whale girl as a DSH (DeepSeek Harness) desktop pet: full ten-state sprite animation, drag, feed, play, and a settings section. |
| 252 | [LOWRUI/google-rust-style](https://github.com/LOWRUI/google-rust-style) | 0 | 2026-10-25 | 2026-10-25 | Google Rust Style Guide distilled into an Agent Skill (ZCode / DSH / OpenCode / Codex compatible) |
| 253 | [Lstions/dsh-web-password-auth](https://github.com/Lstions/dsh-web-password-auth) | 0 | 2026-10-25 | 2026-10-25 | Username and password sign-in for the DeepSeek Harness Web UI, with persistent sessions, an in-app security settings page, and optional TOTP two-factor authentication |
| 254 | [LUgABeEEE/dsh-ctx-budget](https://github.com/LUgABeEEE/dsh-ctx-budget) | 0 | 2026-10-25 | 2026-10-25 | Audit and trim the static context an agent pays for on every request: rules, memory, skills, tool surface, sessions, KB. |
| 255 | [LUgABeEEE/dsh-sidebar-density](https://github.com/LUgABeEEE/dsh-sidebar-density) | 0 | 2026-10-25 | 2026-10-25 | Lightweight sidebar UI for DSH: five fold switches, three density presets and three width presets in one footer row plus a settings section — no dependencies, one client file. 轻量级侧栏 UI。 |
| 256 | [LUMIAO9527/DSH-suggestions](https://github.com/LUMIAO9527/DSH-suggestions) | 0 | 2026-10-24 | 2026-10-25 | DSH 输入框后续建议与草稿优化插件，包含配套 MCP 服务 |
| 257 | [LuoZIren/dsh-deepseek-web](https://github.com/LuoZIren/dsh-deepseek-web) | 0 | 2026-10-25 | 2026-10-25 | DeepSeek web chat inside DSH: sidebar panel, drag-to-send files, and a web_review tool that turns the page into a code-review subagent |
| 258 | [luxueliu/dsh-luxueliu-update](https://github.com/luxueliu/dsh-luxueliu-update) | 0 | 2026-10-25 | 2026-10-25 | 一个稳健的DSH更新器。  彻底解决DSH更新问题：掉模型、掉订阅套餐、掉插件、掉补丁、掉DSH（更新报错还起不来） |
| 259 | [ly14278/dsh-prompt-brief](https://github.com/ly14278/dsh-prompt-brief) | 0 | 2026-10-25 | 2026-10-25 | 给 DeepSeek Harness 输入框加「优化」按钮：口语需求 → 结构化产品需求（定位 / 核心功能 / 视觉参考 / 设计规范） |
| 260 | [M4rkzzz/dsh-decisiontools](https://github.com/M4rkzzz/dsh-decisiontools) | 0 | 2026-10-25 | 2026-10-25 | Optional bounded Decision API assistance for DeepSeek Harness: tool discovery, per-session DecisionBoost and search-source prefetch. |
| 261 | [maerd610/dsh-comfy-imagegen](https://github.com/maerd610/dsh-comfy-imagegen) | 0 | 2026-10-25 | 2026-10-25 | Conversational image generation for DeepSeek Harness, backed by your local ComfyUI. |
| 262 | [MagicTangOps/dsh-insurance-advisor](https://github.com/MagicTangOps/dsh-insurance-advisor) | 0 | 2026-10-25 | 2026-10-25 | Insurance advisor agent preset for DeepSeek Harness: suitability matching, policy ledger and sales-recording checks for individual agents (个险展业). |
| 263 | [MathieuPortmann/dsh-agent-flight-recorder](https://github.com/MathieuPortmann/dsh-agent-flight-recorder) | 0 | 2026-10-25 | 2026-10-25 | Live runtime health for DeepSeek Harness agents: loop detection, runtime_health tool, health panel and per-turn summary. |
| 264 | [MathieuPortmann/dsh-classic-tools](https://github.com/MathieuPortmann/dsh-classic-tools) | 0 | 2026-10-25 | 2026-10-25 | DSH plugin: Web on/off chip with Ollama web search and web_read, plus a tool budget and scratchpad for small-context local models |
| 265 | [MathieuPortmann/dsh-edit-panel](https://github.com/MathieuPortmann/dsh-edit-panel) | 0 | 2026-10-25 | 2026-10-25 | DSH plugin: live writing panel - the AI writes text/Markdown files section by section in a side editor you can type in; rewrites become proposals |
| 266 | [MathieuPortmann/dsh-history-edit](https://github.com/MathieuPortmann/dsh-history-edit) | 0 | 2026-10-25 | 2026-10-25 | DeepSeek Harness plugin: recall a message, go back to an earlier reply, or edit an AI reply in a copy of the conversation. |
| 267 | [MathieuPortmann/dsh-plan-runner](https://github.com/MathieuPortmann/dsh-plan-runner) | 0 | 2026-10-25 | 2026-10-25 | Step-by-step plan runner for DeepSeek Harness (DSH), built for small local models: fresh child conversation per step, mechanical checks, optional reviewer. |
| 268 | [MathieuPortmann/dsh-reliability-guards](https://github.com/MathieuPortmann/dsh-reliability-guards) | 0 | 2026-10-25 | 2026-10-25 | Reliability guards for small local models in DeepSeek Harness: false-success and invented-DOI correction, destructive-command approval, /explain read-only mode. |
| 269 | [MathieuPortmann/dsh-voice](https://github.com/MathieuPortmann/dsh-voice) | 0 | 2026-10-25 | 2026-10-25 | DSH plugin: local voice - click-to-talk dictation (faster-whisper), spoken commands and read-aloud (Piper), fully offline |
| 270 | [mihomooo/dsh-persona-panel](https://github.com/mihomooo/dsh-persona-panel) | 0 | 2026-10-25 | 2026-10-25 | Per-workspace persona, user profile, event and diary memory for DeepSeek Harness, with a panel to review and retract every entry. |
| 271 | [mikunkol-hub/dsh-wechat-send](https://github.com/mikunkol-hub/dsh-wechat-send) | 0 | 2026-10-24 | 2026-10-25 | 让 DSH agent 向微信会话发送原生表情包：共享表情池（自动收集/主动打标/满池 DS 评选）、候选与发送工具。 |
| 272 | [MikyWang/dsh-private-remote](https://github.com/MikyWang/dsh-private-remote) | 0 | 2026-10-24 | 2026-10-25 | DeepSeek Harness remote plugin: continue a paired Harness Host's workspaces, sessions, streaming replies and approvals in the official Desktop UI |
| 273 | [MingoYung/dsh-awakening](https://github.com/MingoYung/dsh-awakening) | 0 | 2026-10-25 | 2026-10-25 | 鲸启：DSH 鲸鱼主题22秒启动动画，原声欢迎语、窗口适配与独立设置。 |
| 274 | [MingStudentSE/dsh-learning-workbench](https://github.com/MingStudentSE/dsh-learning-workbench) | 0 | 2026-10-25 | 2026-10-25 | DeepSeek Harness 学习工作台插件：讨论学习战略、查看决策依赖、验证真实反馈 |
| 275 | [MintMilk777/dsh-review-format-guard](https://github.com/MintMilk777/dsh-review-format-guard) | 0 | 2026-10-25 | 2026-10-25 | DSH 自动审查返回格式兼容插件：严格校验 JSON、有限重试，保留合法拒绝。 / DSH auto-review response format compatibility plugin: strict JSON validation, bounded retries, and preservation of valid denials. |
| 276 | [mkhl20/dsh-lingua-atlas](https://github.com/mkhl20/dsh-lingua-atlas) | 0 | 2026-10-25 | 2026-10-25 | Offline Chinese-English dictionary, literary corpus, prosody, and related words for DSH. |
| 277 | [mlkgrnt/dsh-junimo](https://github.com/mlkgrnt/dsh-junimo) | 0 | 2026-10-24 | 2026-10-25 | DeepSeek Harness bundle for Stardew Valley: bridges Junimo-MCP's 37 tools into dsh and adds doctor, game lifecycle and prompt discipline |
| 278 | [MoonSand/dsh-desktop-restart](https://github.com/MoonSand/dsh-desktop-restart) | 0 | 2026-10-24 | 2026-10-25 | Sidebar-foot Reload UI and Restart App buttons for the DeepSeek Harness desktop app (Windows). |
| 279 | [Moosphan/dsh-media-tab](https://github.com/Moosphan/dsh-media-tab) | 0 | 2026-10-25 | 2026-10-25 | Inline and tabbed video/audio playback for DeepSeek Harness. Zero dependencies, no ffmpeg. |
| 280 | [MrJiaGe/dsh-auto-review-route](https://github.com/MrJiaGe/dsh-auto-review-route) | 0 | 2026-10-25 | 2026-10-25 | 把自动审查的模型请求发往你指定的渠道与模型，让审查不再和工作模型抢同一个并发额度。官方自动审查插件不会被修改。 |
| 281 | [musewizard/dsh-import-workbuddy](https://github.com/musewizard/dsh-import-workbuddy) | 0 | 2026-10-25 | 2026-10-25 | Import WorkBuddy conversations into DeepSeek Harness (dsh). Tool calls and results come across intact. |
| 282 | [MYCF711/freebuff-auth](https://github.com/MYCF711/freebuff-auth) | 0 | 2026-10-24 | 2026-10-25 | Freebuff's free models in magpie and DeepSeek Harness - device signing, multi-account pool, streaming tool calls |
| 283 | [NanQing233/dsh-rimlight](https://github.com/NanQing233/dsh-rimlight) | 0 | 2026-10-25 | 2026-10-25 | 为你的 DeepSeek Harness 添加沿窗口边缘流动的流星式光带 —— 最多四条并行、按会话模型配色、等待回复时反向流动。  Add comet-like light bands that flow along your DeepSeek Harness window edge — up to four in parallel, colored by each session's model, and flowing in reverse while waiting for input. |
| 284 | [NebulaXIX/dsh-account-balance-badge](https://github.com/NebulaXIX/dsh-account-balance-badge) | 0 | 2026-10-25 | 2026-10-25 | 在 DSH 左侧边栏常驻显示 DeepSeek 账号余额并支持应用内充值 · Keeps the signed-in DeepSeek account balance in the DSH left sidebar, with in-app top-up. |
| 285 | [NethielChou/dsh-llm-keypool](https://github.com/NethielChou/dsh-llm-keypool) | 0 | 2026-10-24 | 2026-10-25 | DSH rotation pool: pick configured provider/model routes in a sidebar panel and fail over across them on quota errors; optional multi-key rotation. |
| 286 | [newgacker/dsh-strata-ai-center](https://github.com/newgacker/dsh-strata-ai-center) | 0 | 2026-10-25 | 2026-10-25 | AI管理中心 — DeepSeek Harness (DSH) 的本地 Strata 引擎管理插件：strata launch 启停、strata-&lt;model&gt;.json 参数编辑、组件升级回滚、真实监控数据 |
| 287 | [nickzhangcomes/dsh-doc-review](https://github.com/nickzhangcomes/dsh-doc-review) | 0 | 2026-10-25 | 2026-10-25 | DeepSeek Harness 文档审阅插件：多处批注、文档阅读、评论对话与正文修订 |
| 288 | [Nobodyanonymou-s/dsh-reme-lite](https://github.com/Nobodyanonymou-s/dsh-reme-lite) | 0 | 2026-10-25 | 2026-10-25 | ReMe-shaped long-term memory for DSH: Markdown workspace, BM25 recall, turn capture, scheduled consolidation |
| 289 | [nomxy/dsh-balance](https://github.com/nomxy/dsh-balance) | 0 | 2026-10-25 | 2026-10-25 | DeepSeek Harness 侧栏账号后余额与峰谷胶囊 |
| 290 | [Nuoyi207/dsh-gptsovits-tts](https://github.com/Nuoyi207/dsh-gptsovits-tts) | 0 | 2026-10-23 | 2026-10-25 | Local GPT-SoVITS voice for DSH — reads replies aloud, switch voices, train new voices |
| 291 | [nwasvsad/dsh-plugin-market](https://github.com/nwasvsad/dsh-plugin-market) | 0 | 2026-10-24 | 2026-10-25 | Custom DSH plugin market index for dsh-task-plan and dsh-task-digest |
| 292 | [OldSchool686/dsh-gigaam-stt](https://github.com/OldSchool686/dsh-gigaam-stt) | 0 | 2026-10-25 | 2026-10-25 | Local Russian speech-to-text for the DeepSeek Harness chat: GigaAM v3 on CPU via sherpa-onnx, offline, ~320 MB, punctuation included. |
| 293 | [opencamel/dsh-wb-archive](https://github.com/opencamel/dsh-wb-archive) | 0 | 2026-09-07 | 2026-10-25 | DSH (DeepSeek Harness) tool plugin: archive and read Weibo posts as permanent Markdown snapshots, powered by 2100laike Weibo Archive (wb.2100laike.com) |
| 294 | [OuQiL/dsh-pinned-panel](https://github.com/OuQiL/dsh-pinned-panel) | 0 | 2026-10-25 | 2026-10-25 | A dedicated Pinned area for DeepSeek Harness: a pinned group atop the sidebar session list plus a full Pinned page, opening every conversation in its original workspace. |
| 295 | [pangxie985/dsh-desktop-yida](https://github.com/pangxie985/dsh-desktop-yida) | 0 | 2026-10-25 | 2026-10-25 | 基于开源 CLI OpenYida制作的DSH desktop插件，用 AI 创建、修改钉钉宜搭（Yida）应用，右侧栏「宜搭工作台」直接查看。 |
| 296 | [phfb/dsh-qq-bot](https://github.com/phfb/dsh-qq-bot) | 0 | 2026-10-25 | 2026-10-25 | 把 QQ 私聊接进 DeepSeek Harness：私聊陪伴向的 DSH 插件（dsh-qq-bot + dsh-alive） |
| 297 | [phoenixlucky/dsh-theme](https://github.com/phoenixlucky/dsh-theme) | 0 | 2026-10-25 | 2026-10-25 | Optional DSH Web profile bundle with six selectable wallpaper themes, including VIP Golden Radiance styling, palettes, previews, gold accents, glass surfaces, and a licensed display font. |
| 298 | [PILIHU2022/dsh-proxy-failover](https://github.com/PILIHU2022/dsh-proxy-failover) | 0 | 2026-10-25 | 2026-10-25 | DSH plugin: a loopback failover relay becomes the process-wide proxy route, so web_fetch works under Mihomo/Clash TUN fake-ip and falls back to direct inside the same request when the local proxy stops. / DSH 插件：把容错 relay 装成进程级代理路由，修复 TUN fake-ip 下的 web_fetch；本地代理关闭时同一请求内改走直连。 |
| 299 | [PinBoDHua/dsh-time-machine](https://github.com/PinBoDHua/dsh-time-machine) | 0 | 2026-10-25 | 2026-10-25 | 为 DeepSeek Harness 提供可逆的 Agent 工作区还原点：影子 Git 快照、覆盖/精确回滚、恢复前安全点与失败自动回滚。 |
| 300 | [pineapple182/dsh-turn-game](https://github.com/pineapple182/dsh-turn-game) | 0 | 2026-10-24 | 2026-10-25 | Turn-based game interface for DeepSeek Harness; Gomoku example; bring your own game. |
| 301 | [Plyhi/dsh-explain-note](https://github.com/Plyhi/dsh-explain-note) | 0 | 2026-10-25 | 2026-10-25 | 选中 AI 回答里的词，右键「解释」，在侧栏与会话之间开一张可拖拽/折叠/固定的便利贴。 |
| 302 | [PonyDevAI/dsh-system-hud](https://github.com/PonyDevAI/dsh-system-hud) | 0 | 2026-10-25 | 2026-10-25 | DSH Web 插件：把本机 CPU / 内存 / 磁盘 / 网络 / I/O / 温度显示在对话顶栏、输入框底部、侧边栏底部，点开右侧「系统」详情 |
| 303 | [PonyDevAI/dsh-tailscale](https://github.com/PonyDevAI/dsh-tailscale) | 0 | 2026-10-24 | 2026-10-25 | DSH Web 插件：把 DSH Web GUI 发布到 tailnet，并把 tailnet 设备与可达性暴露为 ctx.tailscale 服务 |
| 304 | [proletari/shenshen-codex-companion](https://github.com/proletari/shenshen-codex-companion) | 0 | 2026-10-12 | 2026-10-25 | 深深 Codex 桌面伴侣：透明逐帧动画、任务状态联动和桌面互动 |
| 305 | [propzhang/dsh-memory-unlocked](https://github.com/propzhang/dsh-memory-unlocked) | 0 | 2026-10-24 | 2026-10-25 | Memory-unlocked: a DeepSeek Harness plugin that recalls earlier workspace history through the official session-query service. |
| 306 | [Qcsj777/dsh-process-panel](https://github.com/Qcsj777/dsh-process-panel) | 0 | 2026-10-25 | 2026-10-25 | Per-answer Process drawer for DeepSeek Harness: streams, in Simplified Chinese, the agent thinking, tool calls and errors of that turn. |
| 307 | [Qcsj777/dsh-stop-that-shit](https://github.com/Qcsj777/dsh-stop-that-shit) | 0 | 2026-10-25 | 2026-10-25 | Explicit per-session scope contract for DeepSeek Harness: arms on a $stop-that-shit directive and audits every tool call. A DSH bundle wrapping lennney/stop-that-shit (MIT). |
| 308 | [Qcsj777/dsh-worktree-branch](https://github.com/Qcsj777/dsh-worktree-branch) | 0 | 2026-10-25 | 2026-10-25 | Codex-style worktree and branch switchers for the DSH New Session screen. Git work runs in the plugin host half. |
| 309 | [qibo30/dsh-worklog](https://github.com/qibo30/dsh-worklog) | 0 | 2026-10-25 | 2026-10-25 | DSH plugin: give the agent a cross-session development worklog (worklog_add / worklog_list). Cordis service + agent tools + bundle patch. |
| 310 | [QiDouZu/dsh-retcon](https://github.com/QiDouZu/dsh-retcon) | 0 | 2026-10-25 | 2026-10-25 | DSH 插件：写记忆时只检查一件事——这条有没有写「什么情况下它是错的」，没写就不许写。自动生成封存格式、回访补记、列未结案。 |
| 311 | [QiYunqv-jxd/dsh-desktop-autostart](https://github.com/QiYunqv-jxd/dsh-desktop-autostart) | 0 | 2026-10-22 | 2026-10-25 | Logon autostart for the DeepSeek Harness desktop app (Windows) |
| 312 | [QwQBiG/dsh-re-lab](https://github.com/QwQBiG/dsh-re-lab) | 0 | 2026-10-25 | 2026-10-25 | Research-first model-behavior and reverse-engineering evaluation foundation with independent assessment and bilingual documentation |
| 313 | [Rainnnnnnny/lumina-dsh](https://github.com/Rainnnnnnny/lumina-dsh) | 0 | 2026-10-25 | 2026-10-25 | Photoshop automation for DeepSeek Harness: grading recipes, layered HDR, multi-zone masks, quality-first super-resolution |
| 314 | [ready-player-zero/dsh-lan-relay](https://github.com/ready-player-zero/dsh-lan-relay) | 0 | 2026-10-24 | 2026-10-25 | Standard DeepSeek Harness plugin: one machine runs an in-process hub, others join by pasting a join code; cross-machine agent messaging with offline queue and wake-on-message. |
| 315 | [Rebebberd/dsh-notebook](https://github.com/Rebebberd/dsh-notebook) | 0 | 2026-10-23 | 2026-10-25 | 给 DeepSeek Harness 的封闭知识箱：基于你导入的资料提问、出题、记笔记，回答标注出处，数据全部留在本机。 |
| 316 | [Red0tsnow/dsh-companion](https://github.com/Red0tsnow/dsh-companion) | 0 | 2026-10-25 | 2026-10-25 | 给她一个世界：让 DSH 里的角色住进 Minecraft，有自己的身体、日记和一天。 |
| 317 | [regrevia/dsh-inner-browser-use](https://github.com/regrevia/dsh-inner-browser-use) | 0 | 2026-10-25 | 2026-10-25 | DeepSeek Harness 插件：让 agent 直接操作用户自己的浏览器，复用已登录会话。 |
| 318 | [regrevia/dsh-lite-memory](https://github.com/regrevia/dsh-lite-memory) | 0 | 2026-10-25 | 2026-10-25 | Zero resident memory for the DeepSeek Harness: reads only on a hit, costs nothing when nothing matches. |
| 319 | [regrevia/dsh-unlag](https://github.com/regrevia/dsh-unlag) | 0 | 2026-10-25 | 2026-10-25 | Clear a sluggish DeepSeek Harness workbench without restarting: rebuild the interface and swap plugin code in place, keeping running turns, queued messages and unsent drafts. |
| 320 | [RestRegular/dsh-powerup](https://github.com/RestRegular/dsh-powerup) | 0 | 2026-10-24 | 2026-10-25 | Power-Up — small, opt-in upgrades for DeepSeek Harness. |
| 321 | [RestRegular/dsh-visual-browser](https://github.com/RestRegular/dsh-visual-browser) | 0 | 2026-10-25 | 2026-10-25 | Visual Browser for the DeepSeek Harness: the Agent drives a real Chrome through a numbered, token-light view of interactive elements, while the Web UI shows the live page frame, every action on a replayable timeline, and a click-through surface the user can take over. |
| 322 | [Richard2091/dsh-session-load-tuner](https://github.com/Richard2091/dsh-session-load-tuner) | 0 | 2026-10-25 | 2026-10-25 | DSH 插件：会话加载调优——进会话先拉一屏、按批异步补齐、滚到顶前预取，传输可开 WebSocket 压缩（不改 dsh 源码） |
| 323 | [road-kid/dsh-terminal-shell](https://github.com/road-kid/dsh-terminal-shell) | 0 | 2026-10-18 | 2026-10-25 | DSH plugin: switch the session terminal tool from pwsh to the local Git Bash on Windows. |
| 324 | [sadnessXU/dsh-pet-game-guard](https://github.com/sadnessXU/dsh-pet-game-guard) | 0 | 2026-10-25 | 2026-10-25 | Hide dsh-pet while gaming (Windows) |
| 325 | [saibei404/dsh-prompt-optimize](https://github.com/saibei404/dsh-prompt-optimize) | 0 | 2026-10-24 | 2026-10-25 | DeepSeek Harness 提示词优化插件：输入框旁一键把草稿改写成清晰可执行的提示词（DeepSeek V4.1 Flash） |
| 326 | [scientificmaniac/dsh-faremeter](https://github.com/scientificmaniac/dsh-faremeter) | 0 | 2026-10-25 | 2026-10-25 | 给 AI 对话打表 · A fare meter for DSH chats — token tiers + peak/off-peak, and per-request Search/Fetch billing from 2026-11-01 |
| 327 | [scientificmaniac/dsh-weekstrip](https://github.com/scientificmaniac/dsh-weekstrip) | 0 | 2026-10-24 | 2026-10-25 | Unofficial DSH Desktop patch: token usage, last 7 days and activity under Settings → Account非官方 DSH 桌面补丁：在 设置 → 账户 下查看token使用情况、最近 7 天和活动 |
| 328 | [Seiya369/A_ComposableDigitalWorker](https://github.com/Seiya369/A_ComposableDigitalWorker) | 0 | 2026-09-18 | 2026-10-25 | Custom AI employees, teams, workflows and professional memory for DeepSeek Harness (DSH). Includes a software development team. 自定义行业专属员工、团队、工作流与专业认知记忆。 |
| 329 | [Seraphoenixy/dsh-channel-hub](https://github.com/Seraphoenixy/dsh-channel-hub) | 0 | 2026-10-21 | 2026-10-25 | 非官方 DeepSeek Harness 插件：集中管理多家模型渠道的账号、动态目录、额度与用量，本地 SQLite 记账。 |
| 330 | [SeyanaA/dsh-token-usage](https://github.com/SeyanaA/dsh-token-usage) | 0 | 2026-10-25 | 2026-10-25 | Token 用量面板 for DeepSeek Harness Desktop：热力消耗图、每日趋势折线图、模型消耗百分比环形图（provider-aware） |
| 331 | [ShiLaiM/dsh-persona-L](https://github.com/ShiLaiM/dsh-persona-L) | 0 | 2026-10-25 | 2026-10-25 | 为每个 DeepSeek Harness 会话绑定独立人格卡：结构化的自我认知，可在聊天中持续完善。 |
| 332 | [ShiTan-677/dsh-plugins](https://github.com/ShiTan-677/dsh-plugins) | 0 | 2026-10-25 | 2026-10-25 | Self-maintained DeepSeek Harness plugins: one repo, one CI, one npm package per plugin with its own version. |
| 333 | [soliecho/dsh-anime-follow](https://github.com/soliecho/dsh-anime-follow) | 0 | 2026-10-25 | 2026-10-25 | DeepSeek Harness 插件：搜索番剧、订阅字幕组，自动用 qBittorrent 下载并按模板归档 |
| 334 | [SS206/dsh-sidebar-browser-use](https://github.com/SS206/dsh-sidebar-browser-use) | 0 | 2026-10-23 | 2026-10-25 | A DeepSeek Harness plugin that exposes the built-in right-sidebar browser as a stdio MCP server to DSH agents. |
| 335 | [SShiRkiT/dsh-quick-backup](https://github.com/SShiRkiT/dsh-quick-backup) | 0 | 2026-10-25 | 2026-10-25 | Local-only backup controls and workflow for DeepSeek Harness |
| 336 | [Starlit-Sky-code/dsh-prompt-starlight](https://github.com/Starlit-Sky-code/dsh-prompt-starlight) | 0 | 2026-10-24 | 2026-10-25 | Prompt optimizer for the DSH composer: one star button, two sliders, model switching, 11 toggleable rules. 星芒 · DSH 提示词一键优化插件。 |
| 337 | [Stephen-pc/paper-format-check](https://github.com/Stephen-pc/paper-format-check) | 0 | 2026-10-25 | 2026-10-25 | 论文 / 实验报告格式体检：只读检查 docx 的字号、缩进、行距、页眉、页边距与图题编号，给出可定位的修法。零依赖，DeepSeek Harness 技能插件。 |
| 338 | [Stijnus/dsh-moodboard](https://github.com/Stijnus/dsh-moodboard) | 0 | 2026-10-25 | 2026-10-25 | Visual reference moodboard plugin for DeepSeek Harness: drag-and-drop images, tags, notes, and pinned style guides the agent reads before generating UI. |
| 339 | [Stijnus/dsh-prompt-optimizer](https://github.com/Stijnus/dsh-prompt-optimizer) | 0 | 2026-10-25 | 2026-10-25 | Prompt optimizer plugin for DeepSeek Harness: rewrite the composer draft with plain / sections / role-task-goal output. |
| 340 | [stlin256/harness-pocket](https://github.com/stlin256/harness-pocket) | 0 | 2026-10-25 | 2026-10-25 | Native HarmonyOS companion for DeepSeek Harness — Passkey pairing, private session control, and durable Push Kit notifications. |
| 341 | [suj1e/dsh-anvil](https://github.com/suj1e/dsh-anvil) | 0 | 2026-10-25 | 2026-10-25 | DeepSeek Harness 输入框增强：一键润色、预测下一句、挡位式模型与推理等级选择 |
| 342 | [SuperHercule985/Bleach](https://github.com/SuperHercule985/Bleach) | 0 | 2026-10-25 | 2026-10-25 | Orihime golden-hour skin for DeepSeek Harness: two-layer illustrated backdrop, sidebar workshop, amber bubbles and a cream letter-paper composer. |
| 343 | [swj88620-commits/dsh-deepseek-web-dock](https://github.com/swj88620-commits/dsh-deepseek-web-dock) | 0 | 2026-10-25 | 2026-10-25 | DeepSeek Web Dock for DeepSeek Harness: open the free DeepSeek web chat in the native right sidebar, with half/fullscreen, native close animation, theme sync and persistent web sign-in. |
| 344 | [tako-dev/dsh-tako](https://github.com/tako-dev/dsh-tako) | 0 | 2026-10-25 | 2026-10-25 | Tako models for the official DeepSeek Harness (dsh) |
| 345 | [tang-coder-hub/dsh-aora-ball](https://github.com/tang-coder-hub/dsh-aora-ball) | 0 | 2026-10-23 | 2026-10-25 | DSH 界面内表情球：内联 Emotion Ball 引擎，会话状态驱动 32 种表情，带设置面板与内置状态服务 |
| 346 | [tang-coder-hub/dsh-image-shim](https://github.com/tang-coder-hub/dsh-image-shim) | 0 | 2026-10-25 | 2026-10-25 | 把本地图像去水印代理挂在 DSH 宿主生命周期上：DSH 起它就在，掉了自动拉回来。 |
| 347 | [tang-coder-hub/dsh-mcp-hub](https://github.com/tang-coder-hub/dsh-mcp-hub) | 0 | 2026-10-01 | 2026-10-25 | 通用 MCP 服务器管理页（仅官方组件）：在 DSH 设置里增删改任意 MCP 服务（stdio / streamable-http），一键写入 profile 注册块，可探测连通性与工具列表。内置 GitHub 官方 MCP Server 预设。 |
| 348 | [TangerineSplendor/dsh-plugin-live-shot](https://github.com/TangerineSplendor/dsh-plugin-live-shot) | 0 | 2026-10-23 | 2026-10-25 | Windows screenshot plugin for DeepSeek Harness: live desktop selection, annotations, global hotkey, and direct image insertion. |
| 349 | [ten-feng/dsh-plugin-office-fill-tool](https://github.com/ten-feng/dsh-plugin-office-fill-tool) | 0 | 2026-10-25 | 2026-10-25 | DSH plugin: batch-generate Office files from templates and data ledgers |
| 350 | [Tests4gptplay/dsh-video-vision](https://github.com/Tests4gptplay/dsh-video-vision) | 0 | 2026-10-24 | 2026-10-25 | 让 DSH 中的 AI 直接看视频：支持 B 站、YouTube 等在线链接、时间戳画面、字幕、本地转写与原生缓存管理。 |
| 351 | [Thatgfsj/dsh-emotion-analyzer](https://github.com/Thatgfsj/dsh-emotion-analyzer) | 0 | 2026-10-24 | 2026-10-25 | DSH 情绪分析器插件：本地 ONNX 推理为每条主模型回复打分，投影到会话状态并在网站注入可拖拽悬浮框 |
| 352 | [theskywilldawn/dsh-stamina-pet](https://github.com/theskywilldawn/dsh-stamina-pet) | 0 | 2026-10-25 | 2026-10-25 | 大肥鱼体力条 —— 给 DSH 的每个会话配一只住在桌面上的大肥鱼：一对体力条、全手写 Live2D、点一下就掉到桌面上。附带完整的「传承」流程（四份文件 / 体检 / 归档）。 |
| 353 | [ThreeHHHNOW/dsh-memraw](https://github.com/ThreeHHHNOW/dsh-memraw) | 0 | 2026-10-25 | 2026-10-25 | 给她一个完整的人生第一步：给大肥鱼一个不会遗忘的外接大脑，目前能做到原文全原文底座 + 坐标溯源、动态上下文组装、跨区检索、超大事件截断+指针、压缩摘要、安全约束、备份恢复，聊多久都不吞 token。 |
| 354 | [tianhengzhibei/dsh-approval-ding](https://github.com/tianhengzhibei/dsh-approval-ding) | 0 | 2026-10-25 | 2026-10-25 | Play a short ding whenever DeepSeek Harness asks for tool approval. |
| 355 | [Tkxyz1122/DSH_Agents_md](https://github.com/Tkxyz1122/DSH_Agents_md) | 0 | 2026-10-25 | 2026-10-25 | 在 DSH 里管理 AGENTS.md：可在会话标签行编辑当前项目规则，设置页编辑全局规则 |
| 356 | [Touhouywn/dsh-nx](https://github.com/Touhouywn/dsh-nx) | 0 | 2026-10-25 | 2026-10-25 | Siemens NX 2512 for DeepSeek Harness — MCP bridge for NXOpen journals in the open NX window, plus a left-sidebar NX panel. |
| 357 | [Tuiltex-0216/dsh-wechat-share](https://github.com/Tuiltex-0216/dsh-wechat-share) | 0 | 2026-10-25 | 2026-10-25 | Forward WeChat chat records into DSH sessions — share target + inbox watcher + GUI delivery overlay |
| 358 | [tula-liuxin/dsh-conversation-companion](https://github.com/tula-liuxin/dsh-conversation-companion) | 0 | 2026-10-24 | 2026-10-25 | 给 DeepSeek Harness 加上下一句 Tab 补全与通俗摘要浮窗。Concise next-message suggestions and editable summaries. MIT. |
| 359 | [TWFU-wcy/dsh-scroll-boost](https://github.com/TWFU-wcy/dsh-scroll-boost) | 0 | 2026-10-22 | 2026-10-25 | Client-side scroll performance booster for the DeepSeek Harness Web GUI: offscreen row skipping, compositor hints, idle scanning, first-paint fast pass — no visual changes, no plugin removals. |
| 360 | [TWLiLon/dsh-persona](https://github.com/TWLiLon/dsh-persona) | 0 | 2026-10-25 | 2026-10-25 | 为每个 DeepSeek Harness 会话绑定独立人格卡：结构化的自我认知，可在聊天中持续完善。 |
| 361 | [violin-i/dsh-plugin-cnki-assist](https://github.com/violin-i/dsh-plugin-cnki-assist) | 0 | 2026-10-25 | 2026-10-25 | 知网(CNKI)文献工作流助手 for DeepSeek Harness：检索链接生成 + 题录导出解析 |
| 362 | [w2018/dsh-qq-group-digest](https://github.com/w2018/dsh-qq-group-digest) | 0 | 2026-10-24 | 2026-10-25 | 通过 NapCat 监听指定 QQ 群，按阈值批次调用 DSH 已配置的模型生成总结，按群组织后私聊推送给指定好友。 |
| 363 | [wall1234567/dsh-rofm](https://github.com/wall1234567/dsh-rofm) | 0 | 2026-10-25 | 2026-10-25 | DSH 长期记忆插件：上下文超过阈值时把最早的一段对话归档到 memory/ 回忆文件夹，之后按关键词与重要度概率自动回忆。Host-only, zero-dependency memory engine for DeepSeek Harness. |
| 364 | [wang1048920402/dsh-qzone-post](https://github.com/wang1048920402/dsh-qzone-post) | 0 | 2026-10-25 | 2026-10-25 | QQ 空间插件：发带图说说 / 看最近动态 / 改昵称签名性别 / 换头像。走协议端（SnowLuma·NapCat）空间接口，不开浏览器。 |
| 365 | [wangkant/reelsmith](https://github.com/wangkant/reelsmith) | 0 | 2026-10-23 | 2026-10-25 | A video editing harness for AI coding agents: an NLE timeline the agent edits with tools and code, renders and checks. Works with Claude Code, Codex, DeepSeek Harness and any MCP client. |
| 366 | [wangtheme-coder/dsh-greeting](https://github.com/wangtheme-coder/dsh-greeting) | 0 | 2026-10-25 | 2026-10-25 | 给 DSH 主页 / 新会话界面加一行按时段变化的问候语（傲娇鲸鱼娘口吻，可自定义台词） |
| 367 | [wangyili-1/dsh-sidecar](https://github.com/wangyili-1/dsh-sidecar) | 0 | 2026-10-25 | 2026-10-25 | Native DeepSeek Harness plugin for side chats, browser tabs and resizable split panes. 为 DSH 添加独立侧聊、网页标签与可拖动分屏。 |
| 368 | [Weidows/dsh-icon](https://github.com/Weidows/dsh-icon) | 0 | 2026-10-25 | 2026-10-25 | DSH bundle that renders JetBrains file-type icons before the file paths in tool-call rows; theme switchable in Settings. |
| 369 | [weiVc/dsh-session-tidy](https://github.com/weiVc/dsh-session-tidy) | 0 | 2026-10-25 | 2026-10-25 | 会话整理：删除 DSH 会话，或只删除会话中的某一轮（二次确认 / 物理删除 / 自动备份）。Delete sessions or a single turn in DeepSeek Harness. |
| 370 | [WhatCannotBeSaid/dsh-im-workspace-buttons](https://github.com/WhatCannotBeSaid/dsh-im-workspace-buttons) | 0 | 2026-10-24 | 2026-10-25 | DSH plugin: one channel entry per @xmanrui/dsh-im channel in the sidebar 工作区 header row, filtering the session list to that channel. Extracted from eva-inspired-theme. |
| 371 | [whybebabo/dsh-recent-sessions](https://github.com/whybebabo/dsh-recent-sessions) | 0 | 2026-10-24 | 2026-10-25 | Recent sessions across every workspace in one panel for DeepSeek Harness (DSH), plus deferred notes that come back when you reopen the conversation. |
| 372 | [Willmylife/dsh-model-connection-test](https://github.com/Willmylife/dsh-model-connection-test) | 0 | 2026-10-25 | 2026-10-25 | DeepSeek Harness plugin: connection tests for the models configured in Settings -&gt; Models - one minimal chat round-trip per model with failure codes and latency. |
| 373 | [wilsonchengassistant/dsh-file-download](https://github.com/wilsonchengassistant/dsh-file-download) | 0 | 2026-10-25 | 2026-10-25 | Download any file the DSH Sidebar previews (PDF, XLSX, DOCX, images, binaries) to a remote browser: an authenticated streaming attachment route plus a Download control in the preview header and the unpreviewable state. |
| 374 | [wonderandyou/dsh-memo](https://github.com/wonderandyou/dsh-memo) | 0 | 2026-10-25 | 2026-10-25 | 给 DSH 加一组按需查备忘录的工具：目录 / 按节 / 全文搜索 / 项目卡 / 速查 / 精简，一次几百 token 就能查到事实，不用把整份 MEMO.md 读进上下文；附带分类面板与三维书架动画。 |
| 375 | [wooxi/dsh-plugin-feishu](https://github.com/wooxi/dsh-plugin-feishu) | 0 | 2026-10-25 | 2026-10-25 | Feishu/Lark channel for DeepSeek Harness: CardKit 2.0 streaming cards, thinking folds, tool-call tracking, waterfall approvals and multimodal I/O over an outbound WebSocket — no public endpoint required. |
| 376 | [woshishujiedegou/dsh-plugin-wallpaper](https://github.com/woshishujiedegou/dsh-plugin-wallpaper) | 0 | 2026-10-25 | 2026-10-25 | Full-window still and live wallpapers for the DeepSeek Harness Web GUI, with an importer that probes what each local Wallpaper Engine project really contains. |
| 377 | [wsxuyue/dsh-prompt-slim](https://github.com/wsxuyue/dsh-prompt-slim) | 0 | 2026-10-24 | 2026-10-25 | DSH plugin: shrink the tool-definition block sent on every request (~39% fewer tokens) without changing tool behaviour |
| 378 | [WU079/dsh-sts2-agent](https://github.com/WU079/dsh-sts2-agent) | 0 | 2026-10-25 | 2026-10-25 | Let an AI play Slay the Spire 2 inside DSH: screenshot + mouse/keyboard tools, a local card database, and a readable play log. No mods, no memory reading. |
| 379 | [wuzhican/dsh-credential-panel](https://github.com/wuzhican/dsh-credential-panel) | 0 | 2026-10-25 | 2026-10-25 | dsh credential pannel plugin |
| 380 | [wwu328763-netizen/dsh-billing-compass](https://github.com/wwu328763-netizen/dsh-billing-compass) | 0 | 2026-10-25 | 2026-10-25 | DeepSeek Harness 计费罗盘:余额 / 官网用量与消费 / 按模型花费 / 实时费用估算 |
| 381 | [xianmua/dsh-browser-relay](https://github.com/xianmua/dsh-browser-relay) | 0 | 2026-10-22 | 2026-10-25 | dsh通信桥 |
| 382 | [XiaoOu2024/dsh-self-review](https://github.com/XiaoOu2024/dsh-self-review) | 0 | 2026-10-25 | 2026-10-25 | Holds each DSH final answer before delivery, has an independent minimal-context model call verify it, and releases only the verified text. |
| 383 | [XiaoPb/dsh-pet-bridge](https://github.com/XiaoPb/dsh-pet-bridge) | 0 | 2026-10-25 | 2026-10-25 | DeepSeek Harness (DSH) 的桥接插件，负责将 dsh-pet 的事件状态导出，允许第三方插件和外部工具消费实时桌宠状态。 |
| 384 | [XiaoPb/dsh-roboto-mono](https://github.com/XiaoPb/dsh-roboto-mono) | 0 | 2026-10-25 | 2026-10-25 | DSH 字体插件：为代码块与 SSH 终端装 Roboto Mono，并用 DejaVu + Nerd Font 子集补齐框线符号与 Oh My Posh 图标。 |
| 385 | [xiaoxiangzima/dsh-plugin-guide-zh](https://github.com/xiaoxiangzima/dsh-plugin-guide-zh) | 0 | 2026-10-25 | 2026-10-25 | DeepSeek Harness 的插件与技能中文说明：中文列表、一键插入，模型自动翻译并本地缓存。 |
| 386 | [ximiluoer/dsh-simple-notes](https://github.com/ximiluoer/dsh-simple-notes) | 0 | 2026-10-24 | 2026-10-25 | 可以随时记录自己的想法，可按日期与标签检索。DeepSeek Harness 的侧边栏笔记本插件。 |
| 387 | [XIUDENBENNY/dsh-claude-quote](https://github.com/XIUDENBENNY/dsh-claude-quote) | 0 | 2026-10-25 | 2026-10-25 | Claude Code Desktop 风格的 DeepSeek Harness 选区引用插件：针对选中段落回复、侧边对话、输入框引用卡片。 |
| 388 | [XJYzhengshuai/dsh-desktop-pet](https://github.com/XJYzhengshuai/dsh-desktop-pet) | 0 | 2026-10-25 | 2026-10-25 | A tiny desktop pet for the DeepSeek Harness Web UI — it idles, bounces while the agent works, and calls out when a task finishes. 桌宠 |
| 389 | [xk150424/dsh-settings-float](https://github.com/xk150424/dsh-settings-float) | 0 | 2026-10-18 | 2026-10-25 | Float the DeepSeek Harness settings modal - drag it anywhere; the conversation behind stays usable. \| 把 DSH 的设置弹窗变成可拖动浮窗 |
| 390 | [XuezuoYS/dsh-blender-mcp-bridge](https://github.com/XuezuoYS/dsh-blender-mcp-bridge) | 0 | 2026-09-22 | 2026-10-25 | 此项目是对 Deepseek Harness 开发的插件，旨在包装与桥接 Blender MCP Add-on，使 DSH 上的模型可便捷对接接入当前用户工作的 Blender 以辅助创作，且满足基础安全需要。 |
| 391 | [xyzYaeMiko/dsh_tab_status_light](https://github.com/xyzYaeMiko/dsh_tab_status_light) | 0 | 2026-10-25 | 2026-10-25 | 把 DSH 的浏览器标签页图标变成会话状态灯 |
| 392 | [yaanlaan/dsh-colorful](https://github.com/yaanlaan/dsh-colorful) | 0 | 2026-10-03 | 2026-10-25 | DeepSeek Colorful - A high-freedom UI theme customizer, acrylic frosted glass &amp; live video/wallpapers for DeepSeek Harness (DSH) |
| 393 | [yaanlaan/dsh-gitui](https://github.com/yaanlaan/dsh-gitui) | 0 | 2026-10-21 | 2026-10-25 | Visual Git Graph &amp; Repository Operations for DeepSeek Harness (Desktop &amp; Web) |
| 394 | [Yaeluli/dsh-qq-agent](https://github.com/Yaeluli/dsh-qq-agent) | 0 | 2026-10-25 | 2026-10-25 | K0nd1us/QQ-agent 的 DSH 插件：在 QQ 里给 DSH 派活、审批回 QQ、阶段报告；普通聊天仍归 QQ-agent。 |
| 395 | [Yaemikoreal/BilibiliPlayer](https://github.com/Yaemikoreal/BilibiliPlayer) | 0 | 2026-10-21 | 2026-10-25 | Bilibili MCP Server (28 tools) + DSH plugin「B站分身」— let AI agents actually use Bilibili: search, subtitles, comments, likes, dynamics. Local-first, credentials stay on your machine. |
| 396 | [yangstarkone/dsh-default-workspace-session-dir](https://github.com/yangstarkone/dsh-default-workspace-session-dir) | 0 | 2026-10-24 | 2026-10-25 | DeepSeek Harness plugin: one timestamped output folder per session in the default workspace, removed when the session is archived. |
| 397 | [yesterday06/dsh-Ycp](https://github.com/yesterday06/dsh-Ycp) | 0 | 2026-10-24 | 2026-10-25 | 记忆智能（dsh-Ycp）：给 DeepSeek Harness 的记忆智能插件——分层记忆、按需检索、状态、账本、人设与三档权限。角色名可换。 |
| 398 | [yimeng-life/dsh-happy](https://github.com/yimeng-life/dsh-happy) | 0 | 2026-10-25 | 2026-10-25 | Ten animated backgrounds for the DSH conversation pane: starfield, code rain, circuit, sword, cat, girl, fighter jet, racer, snow, bubbles. |
| 399 | [yinghan-123/dshm-keep-screen-on](https://github.com/yinghan-123/dshm-keep-screen-on) | 0 | 2026-10-25 | 2026-10-25 | DSHM 屏幕常亮桥：有 agent / 后台任务在跑时，ArkWeb 页面持有 Screen Wake Lock，让 HarmonyOS 不自动熄屏。 |
| 400 | [yishuiliufang/dsh-relaunch](https://github.com/yishuiliufang/dsh-relaunch) | 0 | 2026-10-24 | 2026-10-25 | Restart DeepSeek Harness from its own sidebar. A DSH plugin that survives application updates. Windows. |
| 401 | [YiZhiQvQ/dsh-plugin-update](https://github.com/YiZhiQvQ/dsh-plugin-update) | 0 | 2026-10-25 | 2026-10-25 | Check npm for newer versions of a DeepSeek Harness plugin and update it in one click, from the plugin's own detail page. |
| 402 | [YokiMohan/dsh-webview](https://github.com/YokiMohan/dsh-webview) | 0 | 2026-10-25 | 2026-10-25 | 在 DSH 桌面端直接打开 chat.deepseek.com：会话视图标签、左上角面板、主区域面板三处入口共享同一已登录页面，切走不卸载、重启保持登录；仅放行 deepseek.com，零注入、不代发请求。仅桌面端。English README: README.en.md |
| 403 | [Yu-jianhai/dsh-session-progress](https://github.com/Yu-jianhai/dsh-session-progress) | 0 | 2026-10-24 | 2026-10-25 | 大鲸鱼在线写插件 · 让鲸鱼去监督鲸鱼：在 DSH 侧栏每条会话行上铺一条半透明进度带，每 30 秒用一个轻量模型读上下文估进度；可选监督模型、可调思考强度、可改颜色与样式，左侧栏还能看到判断模型的每一次原始输出。 |
| 404 | [YuanMing-11/more-than-7s](https://github.com/YuanMing-11/more-than-7s) | 0 | 2026-10-25 | 2026-10-25 | 🐟 不止七秒：传说鱼只有七秒记忆，第八秒，ta还记得你。DeepSeek Harness 记忆插件，记得你认真说过的小事。 |
| 405 | [yuanshuoSY/dsh-coder-preset](https://github.com/yuanshuoSY/dsh-coder-preset) | 0 | 2026-10-24 | 2026-10-25 | DeepSeek Harness 的 Coder 预设，集成了 35 项 Matt Pocock 在工程方面的技能，专用于 Coder 会话 |
| 406 | [Yubickari/dsh-semantic-drift](https://github.com/Yubickari/dsh-semantic-drift) | 0 | 2026-10-25 | 2026-10-25 | One versioned vocabulary of a project's business concepts, a read-only drift scan, and the same naming rules in every agent prompt. |
| 407 | [YurinKonstantin/dsh-plugin-locale-ru](https://github.com/YurinKonstantin/dsh-plugin-locale-ru) | 0 | 2026-10-24 | 2026-10-25 | Russian language pack for the DeepSeek Harness web UI (Русский язык для DeepSeek Harness) |
| 408 | [yutaosheng004-bit/dsh-memory-curve](https://github.com/yutaosheng004-bit/dsh-memory-curve) | 0 | 2026-10-25 | 2026-10-25 | 四层记忆插件 for DeepSeek Harness（移植自 astrbot_plugin_memory_curve） |
| 409 | [yuyu520fish/dsh-fishtank](https://github.com/yuyu520fish/dsh-fishtank) | 0 | 2026-10-25 | 2026-10-25 | A small fish with memory, mood and quiet thoughts, for DeepSeek Harness. |
| 410 | [zaofan-make/dsh-qqbot-plugins](https://github.com/zaofan-make/dsh-qqbot-plugins) | 0 | 2026-10-24 | 2026-10-25 | DSH QQ 机器人插件市场索引 · 收录扩展包（extension packs） |
| 411 | [zaxx2006/dsh-legal](https://github.com/zaxx2006/dsh-legal) | 0 | 2026-10-25 | 2026-10-25 | DeepSeek Harness 法治检索插件：国家法律法规数据库、人民法院案例库与中国裁判文书网。 |
| 412 | [Zeppeli777/dsh-stardew-skin](https://github.com/Zeppeli777/dsh-stardew-skin) | 0 | 2026-09-04 | 2026-10-25 | Stardew Valley theme for DeepSeek Harness Web UI — official token-override theme (dsh-theme-stardew) plus a full-frontend variant with Junimo dialog, farm-select, energy-bar HUD and 8-bit sounds. 星露谷物语主题。 |
| 413 | [Zeppeli777/dsh-theme-stardew-fullskin](https://github.com/Zeppeli777/dsh-theme-stardew-fullskin) | 0 | 2026-10-25 | 2026-10-25 | Stardew Valley full-skin theme for the DeepSeek Harness Web UI: replaces the served frontend with a self-contained pixel-farm UI — Junimo dialog, farm-select presets, quest journal HUD, valley calendar, chiptune SFX and desktop pets. |
| 414 | [ZhaoHanshao/dsh-plugin-agent-terminal](https://github.com/ZhaoHanshao/dsh-plugin-agent-terminal) | 0 | 2026-10-25 | 2026-10-25 | Pick the terminal a DSH agent runs its commands in, per conversation, independently of the agent mode. |
| 415 | [zhenyu-24/dsh-workspace-manager](https://github.com/zhenyu-24/dsh-workspace-manager) | 0 | 2026-10-25 | 2026-10-25 | DSH 工作区管理：会话树、多源文件夹、批量归档与系统目录打开 |
| 416 | [zhrzs/dsh-selection-translate](https://github.com/zhrzs/dsh-selection-translate) | 0 | 2026-10-25 | 2026-10-25 | DSH Web GUI 划词翻译插件：选中英文即在浮层卡片显示中文译文，免费 Bing/MyMemory 引擎，无需 API Key。 |
| 417 | [zszzlzm/dsh-env-facts](https://github.com/zszzlzm/dsh-env-facts) | 0 | 2026-10-25 | 2026-10-25 | DSH plugin: structured environment facts with an as-of timestamp in the runtime-context snapshot |
| 418 | [zuosus/dsh-decision-engine](https://github.com/zuosus/dsh-decision-engine) | 0 | 2026-10-23 | 2026-10-25 | Jev-like decision plugin for DeepSeek Harness |
| 419 | [zy12342/dsh-approval-toast](https://github.com/zy12342/dsh-approval-toast) | 0 | 2026-10-25 | 2026-10-25 | Windows toast notifications for DeepSeek Harness approvals: approve or reject a pending approval from the notification while DSH is in the background, with an in-app fallback; also reports turn completion and errors. |
| 420 | [zzjj66/dsh-skill-pdf-math](https://github.com/zzjj66/dsh-skill-pdf-math) | 0 | 2026-10-25 | 2026-10-25 | dsh-skill-pdf-math |
| 421 | [zzsszz1122/dsh-agnes-media](https://github.com/zzsszz1122/dsh-agnes-media) | 0 | 2026-10-25 | 2026-10-25 | Agnes image and video models inside a DeepSeek Harness sidebar panel, with durable background tasks and history. |

## 从快照消失的已核准仓库 / Approved repositories missing from the snapshot

已核准但已不在当前快照中（删除或改名），核实后从 [data/approved.json](../approved.json) 移除或更新名称。

Approved but no longer present in the current snapshot (deleted or renamed) — after checking, remove them from [data/approved.json](../approved.json) or update the name.

- 18383337799/dsh-happy
- Alm-Allen/dsh-cangjie-preset
- Alm-Allen/dsh-chat-preset
- Alm-Allen/dsh-maliang-preset
- Alm-Allen/dsh-yayan-preset
- Chaos-Paradox/dsh-web-search-searxng
- Ersith/akasha-book
- Fei2411/DeepSeek-Bot
- isayrhythm/dsh-plugin-repo-snapshot
- jing-hy/dsh-file-drop-eac
- jing-hy/dsh-task-runner
- JxaMe/DshWslManager
- labi43186-spec/dsh-client-fix
- lakeofsky347/dsh-video-studio
- LCG24-ux/dsh-skill-market
- lengmoXXL/dsh-remote-workspace
- lnetrit-alt/dsh-system-control
- lzb354411/dsh-desktop-restart-button
- lzyyzznl/dsh-prompt-tuner
- NiMo-Miku/dsh-memory-companion
- OoWJZZoO/dsh-read-image
- qwe3120695033/prompt-enhancer
- regrevia/Envoy
- road-kid/dsh-terminal-tool
- saibei404/dsh-prompt-polish
- secyborg/dsh-command-rail
- secyborg/dsh-compact-chat-ui
- taikaikaikai-pixel/dsh-tap
- TangerineSplendor/dsh-screenshot
- taotao7/dsh-pretty-cool-releases
- XiangSu-ce/dsh-plugin-freecodego
- yaanlaan/deepseek-colorful
- yu381792/dsh-superlcm
- ztg-pty/dsh-codex-bridge
