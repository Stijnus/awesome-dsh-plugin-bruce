# 待审核仓库 / Pending review

> 新增到 `dsh-plugin` Topic 下、带有简介、尚未经维护者核实的仓库。本文件由 `scripts/update.mjs` 每日刷新，仅供审核使用，不是用户可见页面。
>
> Repositories newly added to the `dsh-plugin` topic that the maintainer has not verified yet. Refreshed daily by `scripts/update.mjs`; review-only, not a user-facing page.

- 生成时间 / Generated: **2026-10-15**
- 快照日期 / Snapshot date: **2026-10-15 (UTC)**
- 待审核 / Pending: **399**
- 从快照消失的已核准仓库 / Approved repositories missing from the snapshot: **32**
- Star 异常增长 / Star-growth alerts: **7** — 先看下方告警节 / see the alert section first

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

对比上一份快照 **2026-10-14** / vs previous snapshot **2026-10-14**。规则：日增 ≥100★；已核准仓新入 Top 200（且 Δ≥50）/ 名次跃升 ≥50 / 冲入 Top 20；待审仓 ≥100★ 且核准后将进入 Top 200。

- 看 Star 是否与 fork、提交活跃度、仓库年龄匹配（高星零 fork、创建当天几百星，多为刷星）
- 是否把已有高星的通用项目贴上 `dsh-plugin` Topic 蹭榜——插件本身可进目录，但应加入 `leaderboard_exclusions`，理由写清 stars accrued as …
- 待审仓若核准会直接冲进 Top 20 / Top 200，先确认热度来自 **DSH 插件本身**
- 已核准仓的异常跃升：确认后同样可记入 `leaderboard_exclusions`，不必下架目录

Check stars against forks, commit activity and age (hundreds of stars on day one, or high stars with zero forks, usually look bought). A generic high-star project that only just tagged `dsh-plugin` can stay in the catalog but should go to `leaderboard_exclusions` (reason: stars accrued as …). If approving a pending repo would drop it into Top 20 / Top 200, confirm the audience is the DSH plugin itself.

- 告警数 / Alerts: **7**

| Project | Queue | Stars | Δ | Forks | Age | Signals | 审核提示 / Hint |
| --- | --- | ---: | ---: | ---: | ---: | --- | --- |
| ⚠️ [Ebony-Vinyl/dsh-our-free-model](https://github.com/Ebony-Vinyl/dsh-our-free-model) | 已核准 / approved | 17729 | +1700 | 351 | 20d | 日增百星 | 日增 +1700★；已不进榜单 |
| ⚠️ [T-Auto/dsh-ops](https://github.com/T-Auto/dsh-ops) | 已核准 / approved | 2243 | +744 | 49 | 6d | 日增百星 | 日增 +744★ |
| ⚠️ [dataelement/dsh-desktop](https://github.com/dataelement/dsh-desktop) | 已核准 / approved | 14250 | +285 | 507 | 62d | 日增百星 | 日增 +285★；已不进榜单 |
| ⚠️ [Fei2411/DeepSeek-Bot](https://github.com/Fei2411/DeepSeek-Bot) | 已核准 / approved | 2028 | +164 | 192 | 7d | 日增百星 | 日增 +164★ |
| ⚠️ [dsh-market/dsh-market](https://github.com/dsh-market/dsh-market) | 已核准 / approved | 6649 | +125 | 273 | 61d | 日增百星 | 日增 +125★；已不进榜单 |
| ⚠️ [Tencent/BrowserSkill](https://github.com/Tencent/BrowserSkill) | 已核准 / approved | 8976 | +106 | 648 | 114d | 日增百星 | 日增 +106★；已不进榜单 |
| ⚠️ [corrinehu/dsh-workbuddy-connect](https://github.com/corrinehu/dsh-workbuddy-connect) | 已核准 / approved | 951 | +83 | 92 | 58d | 冲入 Top 20 | 冲入 Top 20（21→19） |


| # | Project | Stars | Created | First seen | Description |
| ---: | --- | ---: | ---: | ---: | --- |
| 1 | [XDTrees/dsh-xdpool](https://github.com/XDTrees/dsh-xdpool) | 90 | 2026-09-04 | 2026-10-15 | 把你能白嫖的模型额度接进 DSH 同一个池：WorkBuddy 多账号自动容错、十三家扫码登录、76 家免费额度聚合、用量看板、模型路由、本地 OpenAI 网关、积分自动化。 |
| 2 | [c1overzz/dsh-bili-scroll](https://github.com/c1overzz/dsh-bili-scroll) | 17 | 2026-10-14 | 2026-10-15 | DSH 插件：每天替你刷一轮 B站，读字幕挑出值得的、写一份日报，值得的 @ 你 |
| 3 | [delta-box/deltabox-lite](https://github.com/delta-box/deltabox-lite) | 14 | 2026-08-05 | 2026-10-15 | Lightweight, agent-native sandboxing with diff, commit and abort |
| 4 | [dabaicai001/starhub](https://github.com/dabaicai001/starhub) | 12 | 2026-06-04 | 2026-10-15 | StarHub — All-in-One DevOps Desktop Command Center。把开发运维每天要用到的工具收进同一个窗口:数据库客户端 · SSH 终端 · SFTP · Docker · Android 真机 · AI 助手。 |
| 5 | [AndroidSix/dsh-multi-router](https://github.com/AndroidSix/dsh-multi-router) | 5 | 2026-10-14 | 2026-10-14 | Multi-account WorkBuddy, Trae and Qoder routing for DeepSeek Harness |
| 6 | [Freakz2z/dsh-catgirl-plugin](https://github.com/Freakz2z/dsh-catgirl-plugin) | 5 | 2026-08-14 | 2026-10-15 | A token-efficient persona runtime for DeepSeek Harness. 把人格留在界面，把智能留给模型。Measured: -67% input tokens, -66% cache reads, 0-token catgirl rendering. |
| 7 | [guguthecoder/dsh-tool-see-image](https://github.com/guguthecoder/dsh-tool-see-image) | 5 | 2026-08-13 | 2026-10-15 | see_image tool for DSH: lets text-only models 'see' images by routing them to a configurable vision model (default Zhipu GLM-4V-Flash, free) |
| 8 | [Mrsirlila/dsh-pocket-reportModify-and-add](https://github.com/Mrsirlila/dsh-pocket-reportModify-and-add) | 5 | 2026-09-21 | 2026-10-15 | 把 DeepSeek Harness 装进你的口袋，对原作者shaobeichen的版本源码用deepseek跑了一点修改，并且做出了能使用的APK手机版进行操作，能够自动一键公网内网互通 |
| 9 | [FeatherHunter/dsh-plugin-update](https://github.com/FeatherHunter/dsh-plugin-update) | 4 | 2026-09-30 | 2026-10-14 | 给 DSH 插件加「检查更新 / 安装更新」能力的 npm 包：宿主一段接线 + 面板一个现成组件，查新版、装更新、失败兜底、更新日志与多插件日志一次包掉 |
| 10 | [1015677515/dsh-prompt-ErrorNotes-desk](https://github.com/1015677515/dsh-prompt-ErrorNotes-desk) | 3 | 2026-10-14 | 2026-10-14 | deepseek harness 全局提示词/对话提示词，错误记录功能插件 |
| 11 | [molanxuan-del/DSH-MOTU](https://github.com/molanxuan-del/DSH-MOTU) | 3 | 2026-10-14 | 2026-10-15 | 墨图 MoTu — 把对话里的代码块渲染成真正的图。DSH 可视化套件：Mermaid / Graphviz / nomnoml / ECharts（含交互）/ Vega-Lite / 手写 SVG，六引擎本地伺服、离线可用、完整性校验。 |
| 12 | [molanxuan-del/DSH-VoxPolish](https://github.com/molanxuan-del/DSH-VoxPolish) | 3 | 2026-10-07 | 2026-10-14 | 「声琢」VoxPolish —— 把说出来的话打磨成清晰表达：原话/整理后双通道，先说、先改、再发送，全程不碰输入框。本地 SenseVoice 识别，无需额外下载模型。 |
| 13 | [ytftu/dsh-session-cost](https://github.com/ytftu/dsh-session-cost) | 3 | 2026-10-13 | 2026-10-14 | DSH（DeepSeek Harness）插件：底栏会话消费金额、每条回复本轮金额、右上角开放平台余额/今日用量/峰谷，点击弹出折线图。 |
| 14 | [Chuzhj/whale-pet](https://github.com/Chuzhj/whale-pet) | 2 | 2026-10-11 | 2026-10-15 | deepseek鲸鲸桌宠，不是dsh插件，但是能管理dsh任务，依托于飞书进行远程任务控制 |
| 15 | [Cikian/dsh-cture-image](https://github.com/Cikian/dsh-cture-image) | 2 | 2026-10-14 | 2026-10-14 | OpenAI-compatible image generation for DeepSeek Harness — text-to-image, image editing and batch generation, rendered straight in the conversation. |
| 16 | [miaomiao-r1/dsh-agent-model-router](https://github.com/miaomiao-r1/dsh-agent-model-router) | 2 | 2026-10-14 | 2026-10-14 | DeepSeek Harness role-based model routing and staged agent workflows, with dsh-our-free-model. |
| 17 | [ShawnRen57/omni-learning-anything](https://github.com/ShawnRen57/omni-learning-anything) | 2 | 2026-10-08 | 2026-10-14 | Omni Learning Anything: portable Agent Skill for personalized learning plans and daily PDF lessons. 通用学习助手。 |
| 18 | [supart/DSH-FHL-Image-Plugin](https://github.com/supart/DSH-FHL-Image-Plugin) | 2 | 2026-08-21 | 2026-10-14 | Independent MIT-licensed DeepSeek Harness plugin for FHL Images generation, editing, worker pools, and chat-configured credentials. |
| 19 | [xiamubumu/dsh-context-reclaim](https://github.com/xiamubumu/dsh-context-reclaim) | 2 | 2026-10-14 | 2026-10-14 | DSH 1.5 上下文治理：折叠工具结果、保持提示词缓存命中、接管宿主可写请求（不再需要 dsh-llm 文件补丁）。仅支持 DSH 1.5，后续会跟进更新。 / Context governance for DSH 1.5: folds tool results, keeps the prompt cache warm, takes over the writable-request path. DSH 1.5 only; newer releases will follow. |
| 20 | [zisekongling/deepseek-peak-blocker](https://github.com/zisekongling/deepseek-peak-blocker) | 2 | 2026-08-17 | 2026-10-15 | 高峰时段，对发往 DeepSeek 官方 API 的新请求进行友好拦截与询问 |
| 21 | [133563825as-ai/dsh-asmrone](https://github.com/133563825as-ai/dsh-asmrone) | 1 | 2026-10-14 | 2026-10-14 | DeepSeek Harness 音声库插件：asmr.one / B站 / DLsite 试听 / 本机曲库四源合一 |
| 22 | [1687210989/agent-clinic](https://github.com/1687210989/agent-clinic) | 1 | 2026-10-13 | 2026-10-15 | Agent 体检诊所 —— 用可复核证据诊断 Agent 使用体验问题 |
| 23 | [AtlacherCoder/dshgodot-workflow](https://github.com/AtlacherCoder/dshgodot-workflow) | 1 | 2026-10-10 | 2026-10-14 | Godot 工程开发工作流的本地 DSH 插件：常驻注入精简核心（不占 AGENTS.md 字节预算），完整版按需加载为 godot-workflow 技能 |
| 24 | [baiye1997/MEB-DSH](https://github.com/baiye1997/MEB-DSH) | 1 | 2026-09-21 | 2026-10-14 | MEB · DeepSeek Harness 工程造价工作台 \| 项目台账、工程计算、DWG 核对与项目助手 |
| 25 | [beex-labs/dsh-knowledge](https://github.com/beex-labs/dsh-knowledge) | 1 | 2026-10-15 | 2026-10-15 | Give your AI a project memory: /init makes it read the codebase and write .dsh docs, then every later turn gets them injected back automatically. |
| 26 | [Caoran1314/apple-cn-checkout](https://github.com/Caoran1314/apple-cn-checkout) | 1 | 2026-10-15 | 2026-10-15 | 全自动抢购 iPhone 脚本 |
| 27 | [chimneyQ/dsh-model-rotator](https://github.com/chimneyQ/dsh-model-rotator) | 1 | 2026-10-15 | 2026-10-15 | Model auto-ranking and transparent failover for DeepSeek Harness: ranks discovered models and switches to the next candidate when the current one fails with no output. |
| 28 | [CoderKuo/dsh-mcp-console](https://github.com/CoderKuo/dsh-mcp-console) | 1 | 2026-10-14 | 2026-10-15 | Manage the MCP servers of a DeepSeek Harness profile: status, switch, edit, export; add from the official MCP Registry, by hand, or with AI; find local software to connect |
| 29 | [cybtachyon/dsh-plugin-local-infer](https://github.com/cybtachyon/dsh-plugin-local-infer) | 1 | 2026-10-13 | 2026-10-15 | A DeepSeek Harness (cordis) plugin to install and manage local inference providers like Strata, Ninfer, VLLM, llama.cpp, and more. |
| 30 | [Domaki-co/dsh-message-forward](https://github.com/Domaki-co/dsh-message-forward) | 1 | 2026-10-13 | 2026-10-14 | DeepSeek Harness (DSH) 插件 ，会话消息转发； DSH plugin, session message forwarding |
| 31 | [Dove222/dsh-screenshot-hotkey](https://github.com/Dove222/dsh-screenshot-hotkey) | 1 | 2026-10-15 | 2026-10-15 | 一个小白制作的DSH截图插件：Alt+A调出截图框，自由选取后点击确定即可自动复制到系统粘贴板，也可点击另存为单独保存为独立图片文件。 |
| 32 | [drliuhuan/dsh-plugin-vrmpet3d](https://github.com/drliuhuan/dsh-plugin-vrmpet3d) | 1 | 2026-10-10 | 2026-10-15 | DeepSeek Harness 的 VRM 3D 桌宠插件：任务状态联动、独立悬浮窗、模型动作、部位互动与 AI 碎碎念。 |
| 33 | [F1yBear/dsh-open-workspace-any-app](https://github.com/F1yBear/dsh-open-workspace-any-app) | 1 | 2026-10-15 | 2026-10-15 | dsh,支持自定义应用打开工作区 |
| 34 | [GeniusHu-tgty/dsh-prompt-better](https://github.com/GeniusHu-tgty/dsh-prompt-better) | 1 | 2026-10-15 | 2026-10-15 | DSH plugin: one-click prompt enhancement in the composer — rewrite your draft into a clearer, more specific prompt, with revert and cancel. |
| 35 | [happyqu/dsh-plugin-git](https://github.com/happyqu/dsh-plugin-git) | 1 | 2026-10-09 | 2026-10-14 | Git workbench for deepseek-harness: changelists, staging, history, branches, stashes and optional AI assistance |
| 36 | [hj01857655/dsh-tool-stats](https://github.com/hj01857655/dsh-tool-stats) | 1 | 2026-09-18 | 2026-10-15 | \[已归档\] 本插件已合并进 monorepo: https://github.com/hj01857655/dsh-plugins |
| 37 | [Hongjun1-RGB/dsh-phone-access](https://github.com/Hongjun1-RGB/dsh-phone-access) | 1 | 2026-10-14 | 2026-10-14 | DSH 插件：在界面里拨一个开关，用手机浏览器继续当前会话（内嵌反向代理 + Cloudflare 隧道 + 微信推送） |
| 38 | [JMX-4869/dsh-mood](https://github.com/JMX-4869/dsh-mood) | 1 | 2026-10-13 | 2026-10-14 | 给 DeepSeek Harness 加一层心情。33 种心情各自持有数值，每 3~6 小时自己变 —— 它会累、会烦、会好奇；也会因为一轮里工具老报错而烦躁。附带：心情日记（每天 23:59 自己写）、跨会话记忆、品味库（判断的轨迹，跨会话带着看东西）、时事抓取（RSS / 网页 / 视频抽帧）、可选的主动开口。全部数据在本地、可搬到任意盘。MIT 开源。 |
| 39 | [john-walks-slow/dsh-session-prefix](https://github.com/john-walks-slow/dsh-session-prefix) | 1 | 2026-10-13 | 2026-10-14 | Visual session state badges for DeepSeek Harness: prefix a session title with customizable emoji badges (wip 🚧 blocked ⏸️ review 👀 done ✅) — configurable default state for new sessions, session_prefix model tool, /state command, Web settings. session-prefix：用会话标题前缀（默认 Emoji，可自定义）标记项目状态，含新会话默认状态、Agent 工具与 /state 命令。 |
| 40 | [kapelame/deepseek-harness-leetcode](https://github.com/kapelame/deepseek-harness-leetcode) | 1 | 2026-10-14 | 2026-10-15 | LeetCode Hot 100 learning plugin for DeepSeek Harness (DSH): lessons, sandboxed judge, AI tutor, spaced review, and an AI agent that adds LeetCode problems from a plain description. 力扣热题 100 学习插件。 |
| 41 | [lance808/dsh-image-tool](https://github.com/lance808/dsh-image-tool) | 1 | 2026-10-14 | 2026-10-14 | 给 DeepSeek Harness 补上生图能力：把任意 OpenAI 兼容的生图服务接成平台工具，模型在对话里直接出图。 |
| 42 | [lengfengng-tech/dsh-workspace-memories](https://github.com/lengfengng-tech/dsh-workspace-memories) | 1 | 2026-10-13 | 2026-10-14 | Per-workspace persistent memory plugin for DeepSeek Harness (DSH): sidebar panel, automatic system-prompt injection, and an agent tool to save memories |
| 43 | [linshenyuan/dsh-memory](https://github.com/linshenyuan/dsh-memory) | 1 | 2026-10-13 | 2026-10-14 | DSH 的跨会话长期记忆插件 |
| 44 | [linshufan21/dsh-boot-compass](https://github.com/linshufan21/dsh-boot-compass) | 1 | 2026-10-14 | 2026-10-14 | DSH boot splash: covers the loading card before the first paint, plays a seven-beat compass sequence, then hands off to the app. \| DSH 启动动画：在加载卡出现前接住首帧，播完七段罗盘序列后交接给主界面 |
| 45 | [liuhaolong16/dsh-hot-refresh](https://github.com/liuhaolong16/dsh-hot-refresh) | 1 | 2026-10-15 | 2026-10-15 | One-click hot refresh for DeepSeek Harness client plugins: detect which plugin bundles changed and reload only those; guard whole-graph reloads behind an explicit flag; expose replay counters. 面板一键热刷新：只重载变化的那几个插件，整图重载需显式确认。 |
| 46 | [liuhaolong16/dsh-quote-reply](https://github.com/liuhaolong16/dsh-quote-reply) | 1 | 2026-10-15 | 2026-10-15 | Quote reply layer for DeepSeek Harness: quote a passage into an editable tray above the composer; it rides into the next turn as model context (never into the message body) and shows as an expandable row under that turn. 引用回复层：选中一段进引用行，随下一回合作为上下文注入模型（不进消息正文），回合尾部显示可展开的引用(N)。 |
| 47 | [liushuchang-2012/dsh-skin-liquid-glass](https://github.com/liushuchang-2012/dsh-skin-liquid-glass) | 1 | 2026-10-12 | 2026-10-14 | 一个模仿IOS液态玻璃的DeepSeek Harness插件 |
| 48 | [ljwzhaoxiaoniu/DLR](https://github.com/ljwzhaoxiaoniu/DLR) | 1 | 2026-09-28 | 2026-10-15 | DLR (Decoupled Logic Representation) + Three-Level Semantic Modeling (TSM) — a data-source-level semantic-layer paradigm, its TypeScript service (LanceDB + Neo4j), the dsh integration, and two benchmark scenarios: BIRD mini-dev (500/500) and Cloud-OpsBench (JRA 752/754). |
| 49 | [lucas07814-hub/dsh-pet-guardian-dragon](https://github.com/lucas07814-hub/dsh-pet-guardian-dragon) | 1 | 2026-10-15 | 2026-10-15 | An AI-agent-assisted DSH desktop pet plugin, built as a personal learning project for development, debugging, and open-source sharing. |
| 50 | [Lumos0121/dsh-deepseek-chat](https://github.com/Lumos0121/dsh-deepseek-chat) | 1 | 2026-10-15 | 2026-10-15 | DSH Desktop sidebar plugin: open chat.deepseek.com in the right sidebar or the system browser, read the conversation back into the current session, and edit its own hover texts. 91 offline tests. |
| 51 | [Mahiru0427/dsh-vesna-theme](https://github.com/Mahiru0427/dsh-vesna-theme) | 1 | 2026-10-07 | 2026-10-14 | 薇斯纳主题：DeepSeek Harness Desktop 插件，含全窗口壁纸、明暗配色与日常表情。 |
| 52 | [MCviseron/dsh-matlab-mcp](https://github.com/MCviseron/dsh-matlab-mcp) | 1 | 2026-10-14 | 2026-10-14 | deepseek harness 与matlab桥接的dsh端插件。含知识库。 |
| 53 | [Melody-cx/dsh-anima](https://github.com/Melody-cx/dsh-anima) | 1 | 2026-10-14 | 2026-10-14 | DSH 助手人格与长期记忆插件：独立可用，不依赖其它插件。管 AI 自身的名字与角色、对用户的称呼、回复风格与自定义指令；人设支持全局 + 按工作区两级覆盖；长期记忆走三段式（候选捕获 → 待审缓冲区 → 用户裁决才生效），并支持一键导入其它 AI 的历史记忆。 |
| 54 | [MengYuanzhuo/dsh-plugin-magi](https://github.com/MengYuanzhuo/dsh-plugin-magi) | 1 | 2026-10-14 | 2026-10-14 | An EVA style MAGI system with three terminals for DSH plugin. |
| 55 | [mikuniemo/dsh-skill-router](https://github.com/mikuniemo/dsh-skill-router) | 1 | 2026-10-14 | 2026-10-14 | Shrink the DeepSeek Harness skill catalog from O(n) to ~600 tokens - router + on-demand category indexes. Zero dependencies, cross-platform. |
| 56 | [panqing0313/dsh-plugin-weixin](https://github.com/panqing0313/dsh-plugin-weixin) | 1 | 2026-10-14 | 2026-10-15 | 微信（iLink）通道插件：在微信里给 DSH Agent 发消息，在本机跑会话并把回复发回微信。Text, images, files and voice notes. |
| 57 | [Prompt-Motion/ReaReverse](https://github.com/Prompt-Motion/ReaReverse) | 1 | 2026-10-15 | 2026-10-15 | Reverse engineer anything with agents, from app behavior down to native binaries. |
| 58 | [qikairo7/dsh-web-search-fetch](https://github.com/qikairo7/dsh-web-search-fetch) | 1 | 2026-10-14 | 2026-10-14 | DSH 多来源搜索与网页正文整理插件：免密钥首次使用、搜索融合、正文去重互补、来源与差异记录，沿用原生 web_search / web_fetch。 |
| 59 | [QIN-SMART/dsh-session-tabs](https://github.com/QIN-SMART/dsh-session-tabs) | 1 | 2026-10-14 | 2026-10-14 | Single-client session tabs preserving native sidebars and background work |
| 60 | [reaxlll/dsh-workspace-memory](https://github.com/reaxlll/dsh-workspace-memory) | 1 | 2026-10-15 | 2026-10-15 | DSH工作区内跨会话记忆插件 |
| 61 | [Salty-Mocha/dsh-ops-mac](https://github.com/Salty-Mocha/dsh-ops-mac) | 1 | 2026-10-15 | 2026-10-15 | macOS (Apple Silicon) port of dsh-ops — Rust-powered file tools &amp; PTC batching for DeepSeek Harness. Ported from T-Auto/dsh-ops. |
| 62 | [statedock/statedock-plugins](https://github.com/statedock/statedock-plugins) | 1 | 2026-10-14 | 2026-10-15 | Agents come and go. Tasks remain. |
| 63 | [swyc520/dsh-plugin-model-whitelist](https://github.com/swyc520/dsh-plugin-model-whitelist) | 1 | 2026-10-14 | 2026-10-14 | DeepSeek Harness (dsh) 插件：在「设置 → 模型」里逐个勾选要显示的模型，未勾选的从模型选择器菜单中隐藏。 |
| 64 | [syyr1987/dsh-linghun-memory](https://github.com/syyr1987/dsh-linghun-memory) | 1 | 2026-10-10 | 2026-10-14 | 灵魂认知系统的记忆侧：记忆提取与组装（DeepSeek Harness 插件，开发中）。Memory side of the Linghun cognition system for DeepSeek Harness. |
| 65 | [theskywilldawn/dsh-LittleStar-meeting](https://github.com/theskywilldawn/dsh-LittleStar-meeting) | 1 | 2026-10-14 | 2026-10-14 | 星辰会议室：让分散在不同会话里的 AI 坐进同一间房开会 —— 主持人开房定题，按序邀请成员逐一发言，轮次用满即收会出纪要。  LittleStar Meeting Room: bring AI sessions that cannot see each other into one room — one host sets the topic, members speak in turn, and the meeting ends with written minutes. |
| 66 | [Vincent-chk/dsh-plugin-auxiliary-chat](https://github.com/Vincent-chk/dsh-plugin-auxiliary-chat) | 1 | 2026-10-15 | 2026-10-15 | Sidebar auxiliary chat for DeepSeek Harness (DSH): right-column panel hosting temporary auxiliary sessions that one-way mirror the main session's context and are deleted when closed · DSH 侧边栏辅助会话插件 |
| 67 | [wei125775-lab/dsh-whale-run](https://github.com/wei125775-lab/dsh-whale-run) | 1 | 2026-10-15 | 2026-10-15 | dsh-whale-run — a hidden mini-game plugin for DeepSeek Harness (dsh) desktop. 把 dsh 界面上那只鲸鱼摘下来，放到输入框上方的跑道上跑一局。 |
| 68 | [xiamubumu/dsh-composer-launcher](https://github.com/xiamubumu/dsh-composer-launcher) | 1 | 2026-10-14 | 2026-10-14 | DSH 1.5 启动器：一个面板统管能力组合、插件清单、MCP 桥与浏览器标签页扩展。仅支持 DSH 1.5，后续会跟进更新。 / Launcher for DSH 1.5: one panel for the composer, the plugin inventory, the MCP bridge and the tab-bridge extension. DSH 1.5 only; newer releases will follow. |
| 69 | [yeee-eh/dsh-unreal-engine](https://github.com/yeee-eh/dsh-unreal-engine) | 1 | 2026-10-14 | 2026-10-14 | 把 Unreal Engine 5.8 内置 MCP 接入 DeepSeek Harness —— 在设置里一键探测端点，让 AI 直接驱动 UE 编辑器 |
| 70 | [YUsaltyfish/dsh-bongo-fish](https://github.com/YUsaltyfish/dsh-bongo-fish) | 1 | 2026-10-14 | 2026-10-14 | A BangoCat-style typing feedback widget that auto-snaps to the DSH composer, with customizable art and sound./一个BangoCat风格输入反馈小挂件，可以自动吸附在dsh输入框及窗口边缘，支持自定义形象和音效 |
| 71 | [yutianliang/dsh-assistant-bubble](https://github.com/yutianliang/dsh-assistant-bubble) | 1 | 2026-10-14 | 2026-10-14 | 给 DSH 里助手回复加气泡底，可选液态玻璃材质；工具条、过程行、统计行等周边信息也能一起同步 |
| 72 | [07210905/crop-zoom](https://github.com/07210905/crop-zoom) | 0 | 2026-10-15 | 2026-10-15 | Makes small text in a screenshot readable before a model reads it: crop a region, magnify it with a chosen kernel, hand back a new image. DeepSeek Harness (dsh) plugin + standalone CLI. |
| 73 | [07vvvv/dsh-global-memory](https://github.com/07vvvv/dsh-global-memory) | 0 | 2026-10-15 | 2026-10-15 | Global memory plugin for DeepSeek Harness (DSH): one persistent cross-session requirement injected into every session's system prompt. Ships a settings-page panel, a global_memory agent tool, and a same-origin HTTP API. |
| 74 | [1TRYOUT/dsh-whale-pixel-pet](https://github.com/1TRYOUT/dsh-whale-pixel-pet) | 0 | 2026-10-15 | 2026-10-15 | A whale-girl desktop pet for DeepSeek Harness (DSH): in-window overlay + standalone Electron transparent always-on-top window. 鲸鱼娘桌宠。 |
| 75 | [2048lr/dsh-feishu](https://github.com/2048lr/dsh-feishu) | 0 | 2026-10-14 | 2026-10-14 | Deep Feishu / Lark integration for DeepSeek Harness: Bitable (multidimensional tables), docs, sheets, wiki, drive, messages, plus a visual settings page. |
| 76 | [23bear/dsh-plugin-qq-bot](https://github.com/23bear/dsh-plugin-qq-bot) | 0 | 2026-10-15 | 2026-10-15 | QQ 官方机器人通道插件 for DeepSeek Harness — talk to your DSH sessions from QQ groups and private chats. |
| 77 | [384124694/dsh-host-paths](https://github.com/384124694/dsh-host-paths) | 0 | 2026-10-14 | 2026-10-14 | DeepSeek Harness Desktop: dropped files and folders become @path references instead of uploads, by wiring the shell file-path bridge into the composer host-path seam. |
| 78 | [5V1A-afk/dsh-sticker-pack](https://github.com/5V1A-afk/dsh-sticker-pack) | 0 | 2026-10-14 | 2026-10-14 | 给你的大肥鱼回话加上表情包 |
| 79 | [6mt/dsh-control](https://github.com/6mt/dsh-control) | 0 | 2026-10-14 | 2026-10-14 | 本地一个窗口，驱动你所有机器上的 dsh · Drive the dsh instances on your other machines from one local window |
| 80 | [a766513648-lgtm/dsh-skill-center](https://github.com/a766513648-lgtm/dsh-skill-center) | 0 | 2026-10-15 | 2026-10-15 | DSH 技能中心：查看、开关、新建、按链接安装、删除（进回收站可恢复）DSH 技能。 |
| 81 | [abogitoff/fuxux-claude-plugin](https://github.com/abogitoff/fuxux-claude-plugin) | 0 | 2026-10-04 | 2026-10-14 | Fuxux plugin for Claude. Draft, schedule and publish social media posts to 12 platforms. |
| 82 | [ADkun/dsh-anysearch-fallback](https://github.com/ADkun/dsh-anysearch-fallback) | 0 | 2026-10-14 | 2026-10-14 | DSH web_fetch fallback: when AnySearch extraction fails with HTTP 422, the page is fetched directly with a browser-like user agent. Zero-dependency DSH plugin. |
| 83 | [AIR-pixel/air-pixel-liquid-glass](https://github.com/AIR-pixel/air-pixel-liquid-glass) | 0 | 2026-10-11 | 2026-10-14 | A configurable Liquid Glass theme for DeepSeek Harness with translucent surfaces, wallpaper, desktop transparency, window blur, custom cursors, click ripples, and per-side conversation contrast controls. |
| 84 | [AirPineApplea/feiyu-memory](https://github.com/AirPineApplea/feiyu-memory) | 0 | 2026-10-12 | 2026-10-14 | Cross-session persona and diary for DeepSeek Harness. A local gate decides what is worth remembering; later conversations get ~2000 tokens of it as a self-memory block in three registers: a persona core, judgements the model wrote itself, and the diary. Plain-folder archive, zero runtime dependencies. |
| 85 | [alfredhuang211/dsh-codex-session](https://github.com/alfredhuang211/dsh-codex-session) | 0 | 2026-10-08 | 2026-10-14 | DSH desktop plugin: choose a DSH-default or Codex session at new-session time. Codex sessions keep the DSH agent loop, tools, approval and UI, served by the locally authenticated Codex App Server. |
| 86 | [alfredhuang211/dsh-ssh-hosts](https://github.com/alfredhuang211/dsh-ssh-hosts) | 0 | 2026-10-12 | 2026-10-14 | DeepSeek Harness 插件：把多台 SSH 服务器存成主机清单，agent 在会话里按主机名引用（命令执行 + 远端文件读写）；设置界面管理，支持密钥/密码登录，会话窗口「+」菜单可选主机。 |
| 87 | [alfredhuang211/dsh-webdav-sync](https://github.com/alfredhuang211/dsh-webdav-sync) | 0 | 2026-10-08 | 2026-10-14 | DeepSeek Harness 插件：把会话日志与插件环境备份到任意 WebDAV 服务，并可从 WebDAV 恢复（会话+环境双源同步、rev/generation 版本机制、三方比较与冲突策略） |
| 88 | [anye-99/dsh-next-step-suggest](https://github.com/anye-99/dsh-next-step-suggest) | 0 | 2026-10-15 | 2026-10-15 | DSH plugin: after each completed answer, ask the session model for 3 clickable follow-up suggestions and fill the input box on click. |
| 89 | [aqiu817/dsh-plugin-auto-retry](https://github.com/aqiu817/dsh-plugin-auto-retry) | 0 | 2026-10-14 | 2026-10-15 | DeepSeek Harness plugin: takes over a model-request failure the built-in retry executor declined, continues its backoff curve, and shows the full error the transcript discards. |
| 90 | [Arlenman/dsh-backup-sync](https://github.com/Arlenman/dsh-backup-sync) | 0 | 2026-10-14 | 2026-10-14 | DSH 备份 / 换机同步插件：把技能、插件、配置、记忆、待办打成一个包，换机时按模块做带基线的三方合并导入 |
| 91 | [Astepluver/dsh-sci-viz](https://github.com/Astepluver/dsh-sci-viz) | 0 | 2026-10-14 | 2026-10-14 | DSH 科研可视化工作台：蛋白质三维结构 + 统计图表 + 基因组学绘图，直接画在对话旁边。 |
| 92 | [awol2005ex3/dsh-hdfs](https://github.com/awol2005ex3/dsh-hdfs) | 0 | 2026-10-14 | 2026-10-14 | DeepSeek Harness (dsh) 插件：**在 dsh 里浏览与操作 HDFS**。Rust (napi-rs + hdfs-native) 直连集群，支持 HA 多 Namenode 与 Kerberos，带 Web 浏览面板与 agent 工具。 |
| 93 | [Bainianzzz/dsh-fork-worktree](https://github.com/Bainianzzz/dsh-fork-worktree) | 0 | 2026-10-14 | 2026-10-14 | DeepSeek Harness plugin: fork a workspace row into a git worktree, or delete the workspace folder |
| 94 | [bbskye5008/dsh-task-runner](https://github.com/bbskye5008/dsh-task-runner) | 0 | 2026-10-15 | 2026-10-15 | DeepSeek Harness task launcher combining PUA and Completion Guard with frozen acceptance, candidate-bound certificates, and an 8-round / 90-minute cap. |
| 95 | [beex-labs/dsh-smart-ui](https://github.com/beex-labs/dsh-smart-ui) | 0 | 2026-10-15 | 2026-10-15 | Render AI answers as interactive UI cards in DSH: comparisons, charts, diagrams, tables, calculators and unit conversions. The model writes a JSON spec — never markup. |
| 96 | [blacktaoK/dsh-skill-zh-overlay](https://github.com/blacktaoK/dsh-skill-zh-overlay) | 0 | 2026-10-15 | 2026-10-15 | 给 dsh-skill-mcp-panel 的技能卡片加中文说明浮层，中英对照，9 个技能已收录。 |
| 97 | [Boenxia/dsh-plugin-notebook-tools](https://github.com/Boenxia/dsh-plugin-notebook-tools) | 0 | 2026-10-14 | 2026-10-14 | Cell-aware Jupyter notebook tools for DSH agents |
| 98 | [BoxMiao007/dsharbor](https://github.com/BoxMiao007/dsharbor) | 0 | 2026-10-14 | 2026-10-15 | 一个 DSH Web 的轻量启动器 |
| 99 | [brokep/grok-bots-for-deepseek-harness](https://github.com/brokep/grok-bots-for-deepseek-harness) | 0 | 2026-10-15 | 2026-10-15 | 90 Grok Bot marketplace agents as DeepSeek Harness plugin bundles with a plugin-market index |
| 100 | [Butt91/flameox](https://github.com/Butt91/flameox) | 0 | 2026-10-14 | 2026-10-14 | Runtime evidence that helps agents trace, profile, and burn down hotspots in application and native code, GPU kernels, and inference stacks. |
| 101 | [cander0815/dsh-computer-mcp](https://github.com/cander0815/dsh-computer-mcp) | 0 | 2026-10-15 | 2026-10-15 | 通过 MCP 让 DeepSeek Harness 操作另一台电脑：文件读写、搜索、编辑、回收与可选命令执行，支持 Windows/macOS 和内网/Tailscale。 |
| 102 | [caparisen/dsh-font](https://github.com/caparisen/dsh-font) | 0 | 2026-09-15 | 2026-10-14 | DeepSeek Harness plugin: customize the Web GUI fonts (interface font, code font, and font sizes) from Settings |
| 103 | [ccr-wer/dsh-devlog-auto](https://github.com/ccr-wer/dsh-devlog-auto) | 0 | 2026-10-14 | 2026-10-14 | 给 DSH 用的开发日志插件。自动记录"为什么"和"踩了什么坑"。 |
| 104 | [CH3SH-LC/dsh-better-wechat](https://github.com/CH3SH-LC/dsh-better-wechat) | 0 | 2026-10-15 | 2026-10-15 | 本地优先的微信消息整理助手：把电脑微信聊天变成可检索、可筛选、可追溯的私人消息工作台，免打扰群一键忽略。采集、解密与索引都在本机完成，只有本次分析选中的消息文本会交给 DSH 里的模型。 |
| 105 | [chenyifawan-cell/dsh-litellm-extra-headers](https://github.com/chenyifawan-cell/dsh-litellm-extra-headers) | 0 | 2026-10-15 | 2026-10-15 | DeepSeek Harness plugin: inject a body-level extra_headers entry into OpenAI-compatible chat/completions requests for listed providers and upstream hosts (the only injection point that survives a LiteLLM relay). |
| 106 | [chenyuan1251/dsh-pet-niumali](https://github.com/chenyuan1251/dsh-pet-niumali) | 0 | 2026-10-14 | 2026-10-14 | A desk pet that floats over the DSH interface and opens into a daily check-in, focus timer and habit journal. |
| 107 | [chilianxiao/dsh-qoder-connect](https://github.com/chilianxiao/dsh-qoder-connect) | 0 | 2026-10-13 | 2026-10-14 | 将本机 qoderclicn CLI 的登录态包装成 OpenAI 兼容 Provider 接入 DeepSeek Harness — bring your local Qoder CLI login into DeepSeek Harness as a model provider. |
| 108 | [chimneyQ/dsh-mcp-context-mode](https://github.com/chimneyQ/dsh-mcp-context-mode) | 0 | 2026-10-15 | 2026-10-15 | DeepSeek Harness bundle: native ctx_* sandbox tools (no MCP child), routing gate, repaired HTTPS fetching, and session context-occupancy reporting. |
| 109 | [ChthollyFan/dsh-cpp-optimization](https://github.com/ChthollyFan/dsh-cpp-optimization) | 0 | 2026-10-15 | 2026-10-15 | DSH 技能插件：按目标工程真实 C++ 标准审查代码，覆盖 RAII 与所有权、移动语义与值类别、异常安全、性能与内存、并发安全、编译期与 ABI；默认先出报告、用户确认后才改代码。 |
| 110 | [CoolTea001/dsh-cool-git](https://github.com/CoolTea001/dsh-cool-git) | 0 | 2026-09-29 | 2026-10-15 | DeepSeek Harness Git plugin — adds Git management to the session tab bar, covering the basics: commit \| pull \| push \| branch \| diff. |
| 111 | [DDDMUC/dsh-preset-workbench](https://github.com/DDDMUC/dsh-preset-workbench) | 0 | 2026-10-15 | 2026-10-15 | 在 DSH（DeepSeek Harness）设置页里创建/编辑 agent 预设的可视化工作台：分段提示词 + 能力开关 + 内置模板。A visual agent-preset workbench for DSH. |
| 112 | [dingchenhui0618-arch/dsh-daily](https://github.com/dingchenhui0618-arch/dsh-daily) | 0 | 2026-10-10 | 2026-10-15 | Daily plugin brief for DeepSeek Harness: ranks the ecosystem against your own profile, proposes evidence-backed ideas, and hands an approved one to an agent to build and publish. |
| 113 | [dingchenhui0618-arch/dsh-doudizhu](https://github.com/dingchenhui0618-arch/dsh-doudizhu) | 0 | 2026-10-15 | 2026-10-15 | Three-player LAN Doudizhu as a DSH floating-window plugin: 54 cards, bidding for landlord, clockwise play and landlord rotation. |
| 114 | [dingchenhui0618-arch/dsh-in-hand-relay](https://github.com/dingchenhui0618-arch/dsh-in-hand-relay) | 0 | 2026-10-12 | 2026-10-15 | 掌上 DSH 中继：手机远程/局域网访问你的 DSH，零依赖，含完整实现路径文档 |
| 115 | [dingchenhui0618-arch/dsh-launch-card](https://github.com/dingchenhui0618-arch/dsh-launch-card) | 0 | 2026-10-15 | 2026-10-15 | 发布卡片：从本地仓库真实产物生成 hero 图、特性网格与双语文案，导出前 lint 掉无法证实的说法 |
| 116 | [dingchenhui0618-arch/dsh-ship-receipt](https://github.com/dingchenhui0618-arch/dsh-ship-receipt) | 0 | 2026-10-12 | 2026-10-15 | A shareable delivery receipt for DeepSeek Harness: branch and commit, artifact hashes, the three pre-push checks and your test/build results, hard-split into verified / local-only / unverified with blank slots instead of prose. |
| 117 | [dingchenhui0618-arch/dsh-signal-pet](https://github.com/dingchenhui0618-arch/dsh-signal-pet) | 0 | 2026-10-10 | 2026-10-15 | A status pet for DeepSeek Harness: reacts to the real session event stream (thinking, tool calls, errors, long-job completion) and doubles as a busy/error indicator you can see at a glance. |
| 118 | [dingchenhui0618-arch/dsh-turing-table](https://github.com/dingchenhui0618-arch/dsh-turing-table) | 0 | 2026-10-15 | 2026-10-15 | 图灵圆桌：若干座位由不同模型配置的 agent 扮演，靠提问与交叉印证找出哪些座位是 AI，每局导出逐席位对话 JSONL 与判定记录 |
| 119 | [dingchenhui0618-arch/dsh-vision-diff](https://github.com/dingchenhui0618-arch/dsh-vision-diff) | 0 | 2026-10-10 | 2026-10-15 | Pixel-level screenshot diff for DeepSeek Harness: two local PNGs in, a PIXEL_CHANGED verdict, difference regions and a self-contained HTML comparison page out. Zero dependencies, fully local. |
| 120 | [divineeagleblackhand/dsh-cost-receipt](https://github.com/divineeagleblackhand/dsh-cost-receipt) | 0 | 2026-10-12 | 2026-10-14 | 在 DeepSeek Harness 的每条回复下面加一行：本次问答花了多少钱 + 账户余额（充值/礼金分开列，没有礼金就只显示充值余额）。鼠标悬停时显示饼图。按该轮 token 用量乘官方峰谷单价计算，内置节假日表；算不出价就写明原因，不静默出错。插件自身不联网（余额由 dsh 宿主查询）、不落盘、无依赖。 |
| 121 | [diwer/dsh-codex-adapter](https://github.com/diwer/dsh-codex-adapter) | 0 | 2026-10-15 | 2026-10-15 | ChatGPT subscription / GPT provider for DeepSeek Harness desktop: image input, host tools and DeepSeek/GPT switching. Harness 桌面版 ChatGPT 订阅适配器，支持图片、工具调用和模型切换。Community MIT plugin. |
| 122 | [djornii/dsh-grok-stars](https://github.com/djornii/dsh-grok-stars) | 0 | 2026-10-14 | 2026-10-14 | Adds starfield to the new-chat background, like in grok.com |
| 123 | [dkeviv/dsh-superpowers-verified](https://github.com/dkeviv/dsh-superpowers-verified) | 0 | 2026-10-15 | 2026-10-15 | Verified fork of Superpowers (obra/superpowers) for the DeepSeek Harness (DSH) — 15 skills for TDD, planning, debugging, and subagent-driven development, with a 64-test suite and a non-destructive, reversible install |
| 124 | [DriverWangNB/dsh-model-switchboard](https://github.com/DriverWangNB/dsh-model-switchboard) | 0 | 2026-10-15 | 2026-10-15 | 控制dsh会话界面显示的模型 |
| 125 | [earneet/dsh-worktree-guard](https://github.com/earneet/dsh-worktree-guard) | 0 | 2026-10-15 | 2026-10-15 | Git worktree guard for DeepSeek Harness: session-rooted isolation, always-on git safety net, mechanical human gate |
| 126 | [eeFrank123/dsh-snowflake-shutdown](https://github.com/eeFrank123/dsh-snowflake-shutdown) | 0 | 2026-10-15 | 2026-10-15 | Snowflake shutdown button for DeepSeek Harness - desktop-fixed fork of dsh-shutdown-after-task: auto shutdown after tasks complete, cancellable countdown. |
| 127 | [Elefseus/dsh-pet-progress](https://github.com/Elefseus/dsh-pet-progress) | 0 | 2026-10-14 | 2026-10-14 | Progress companion for the dsh web pet: folds durable todo/write and goal/change session events into the pet's status bubble, so it reports how much work is left - not just what the model is doing right now. |
| 128 | [EnhydraLutristus/dsh-math-tex](https://github.com/EnhydraLutristus/dsh-math-tex) | 0 | 2026-10-15 | 2026-10-14 | DSH plugin: keeps streamed answers free of red (broken) KaTeX regions - validates every maths region with the client's own renderer before it is written |
| 129 | [Erick0412-dev/dsh-restart](https://github.com/Erick0412-dev/dsh-restart) | 0 | 2026-09-26 | 2026-10-14 | DSH 重启插件：可配置的重启方式（Node 原生 / 旧 PowerShell 适配）与重启后自动继续提示。 |
| 130 | [f0909172434/dsh-architecture-lab](https://github.com/f0909172434/dsh-architecture-lab) | 0 | 2026-09-23 | 2026-10-15 | Development preview: isolated DSH memory/planning experiments with external judging and budget controls. Paid experiments held. |
| 131 | [f0909172434/dsh-second-agent-kit](https://github.com/f0909172434/dsh-second-agent-kit) | 0 | 2026-09-16 | 2026-10-15 | Tested macOS safeguards, memory isolation patches and offline document tools for DeepSeek Harness |
| 132 | [feely0208/dsh-agent-scope](https://github.com/feely0208/dsh-agent-scope) | 0 | 2026-10-14 | 2026-10-14 | Agent 权限边界：查 agent 的工具/文件/网络权限有没有声明、是不是过宽。 |
| 133 | [feely0208/dsh-algorithm-filing](https://github.com/feely0208/dsh-algorithm-filing) | 0 | 2026-10-14 | 2026-10-14 | 算法备案与告知：查算法推荐服务有没有关闭选项、告知、备案。 |
| 134 | [feely0208/dsh-cn-data-export](https://github.com/feely0208/dsh-cn-data-export) | 0 | 2026-10-14 | 2026-10-14 | 数据出境检查：查代码与配置里的境外数据出口、个人信息外发、缺安全评估说明。 |
| 135 | [feely0208/dsh-cn-filing](https://github.com/feely0208/dsh-cn-filing) | 0 | 2026-10-14 | 2026-10-14 | 备案公示检查：查应用里有没有 ICP/APP 备案号、隐私政策入口、运营者信息。 |
| 136 | [feely0208/dsh-data-classify](https://github.com/feely0208/dsh-data-classify) | 0 | 2026-10-14 | 2026-10-14 | 数据分类分级：查数据有没有分级标注与资产清单（数据安全法 21 条）。 |
| 137 | [feely0208/dsh-data-rights](https://github.com/feely0208/dsh-data-rights) | 0 | 2026-10-14 | 2026-10-14 | 个人信息权利：查查阅/复制/删除权有没有真的实现（个保法 45/47/50 条）。 |
| 138 | [feely0208/dsh-design-line](https://github.com/feely0208/dsh-design-line) | 0 | 2026-10-15 | 2026-10-15 | 深鲸工序 —— 给设计师的工序流水线（Photoshop / AutoCAD / 3ds Max）：一个包 = 一份内核 + 三个适配器 |
| 139 | [feely0208/dsh-incident-package](https://github.com/feely0208/dsh-incident-package) | 0 | 2026-10-14 | 2026-10-14 | 应急证据包：查出了事能不能拿出证据（预案/联系人/日志保全/上报流程）。 |
| 140 | [feely0208/dsh-minor-guard](https://github.com/feely0208/dsh-minor-guard) | 0 | 2026-10-14 | 2026-10-14 | 未成年人保护：查不满 14 周岁个人信息有没有监护人同意、专门规则、年龄门槛。 |
| 141 | [feely0208/dsh-pipia](https://github.com/feely0208/dsh-pipia) | 0 | 2026-10-14 | 2026-10-14 | 个人信息保护影响评估：查是否按个保法 55 条做了评估、56 条留存三年。 |
| 142 | [fegnze/dsh-balance-bar](https://github.com/fegnze/dsh-balance-bar) | 0 | 2026-10-14 | 2026-10-14 | DSH 侧栏余额栏：自动显示官方账号余额，点击在 DSH 内查询用量 |
| 143 | [fegnze/dsh-browser-computer](https://github.com/fegnze/dsh-browser-computer) | 0 | 2026-10-14 | 2026-10-15 | 让 DeepSeek Harness 直接操作浏览器与电脑：以插件形式装配 playwright-mcp 与 peekaboo-mcp，附一键依赖安装、macOS 系统权限引导与 MCP 连接自检。 |
| 144 | [fegnze/dsh-plugin-scout](https://github.com/fegnze/dsh-plugin-scout) | 0 | 2026-10-14 | 2026-10-14 | Discover and verify DeepSeek Harness (DSH) plugins from GitHub topic:dsh-plugin — trust score, official peer compatibility, one-click install via the official installer |
| 145 | [fegnze/dsh-sub2api-monitor](https://github.com/fegnze/dsh-sub2api-monitor) | 0 | 2026-10-14 | 2026-10-14 | DeepSeek Harness plugin for Sub2api account quotas and usage monitoring |
| 146 | [fffcodefox/dsh-opencode-doctor](https://github.com/fffcodefox/dsh-opencode-doctor) | 0 | 2026-10-15 | 2026-10-15 | DeepSeek Harness plugin — pre-probed OpenCode Go / Zen model routes with availability annotations (region blocks, no credit, client-only free tiers) written into the model name. |
| 147 | [FideFeiPlane/dsh-auto-maximize](https://github.com/FideFeiPlane/dsh-auto-maximize) | 0 | 2026-10-15 | 2026-10-15 | DeepSeek Harness 桌面版插件：启动自动最大化主窗口（等同于手动点击最大化按钮） \| DeepSeek Harness Desktop Plugin: Auto‑maximize main window on launch (same as clicking the Maximize button manually) |
| 148 | [Fleey/deepseek-harness-acp](https://github.com/Fleey/deepseek-harness-acp) | 0 | 2026-10-15 | 2026-10-15 | DeepSeek Harness 桌面插件：用 ACP（Agent Client Protocol）把 Codex、Claude Code 等外部 Agent 注册成模型提供方 |
| 149 | [foreee/dsh-app-restart](https://github.com/foreee/dsh-app-restart) | 0 | 2026-10-15 | 2026-10-15 | DeepSeek Harness desktop plugin: restart the whole application from Settings (graceful quit + automatic relaunch) |
| 150 | [Freakz2z/dsh-evidence-ledger](https://github.com/Freakz2z/dsh-evidence-ledger) | 0 | 2026-08-24 | 2026-10-15 | Local append-only evidence ledger for DeepSeek Harness |
| 151 | [FYZB2020/dsh-voice-doubao](https://github.com/FYZB2020/dsh-voice-doubao) | 0 | 2026-10-14 | 2026-10-14 | Cloud speech recognizers for the DeepSeek Harness voice-input picker (Volcengine Doubao), with an optional LLM tidy-up pass. · 给 DeepSeek Harness 的语音输入加豆包云端识别，可选再用大模型把口语顺成通顺的书面句子。 |
| 152 | [garyzakharov/opencode2dsh](https://github.com/garyzakharov/opencode2dsh) | 0 | 2026-10-14 | 2026-10-14 | DSH plugin — free OpenCode Zen models for DeepSeek Harness (DSH). Free LLM API, no API key needed. 在 DSH 中使用 OpenCode Zen 免费模型，无需 API key |
| 153 | [gfklqcuupe/engramory](https://github.com/gfklqcuupe/engramory) | 0 | 2026-10-14 | 2026-10-14 | A portable memory protocol for AI agents — load it as standing rules; a curation discipline + reference spec + optional cap hook. |
| 154 | [Girmmy3321/dsh-approval-enter](https://github.com/Girmmy3321/dsh-approval-enter) | 0 | 2026-10-14 | 2026-10-14 | Focus the DeepSeek Harness approval panel automatically, so Enter approves and Esc rejects without reaching for the mouse. |
| 155 | [GiuliaRoberts61/rapid-mlx-dsh-provider](https://github.com/GiuliaRoberts61/rapid-mlx-dsh-provider) | 0 | 2026-10-14 | 2026-10-14 | Native Rapid-MLX provider for DeepSeek Harness (dsh) — dsh reads model facts from the server instead of your settings.yaml. |
| 156 | [greatyao/dsh-connect-cursor](https://github.com/greatyao/dsh-connect-cursor) | 0 | 2026-10-14 | 2026-10-14 | 把本机已登录的 Cursor 模型接入 DeepSeek Harness：原生 LlmAdapter 直连 agent.v1.AgentService/Run 双向流 |
| 157 | [GrowingPPP/dsh-inquiry-preset](https://github.com/GrowingPPP/dsh-inquiry-preset) | 0 | 2026-10-14 | 2026-10-14 | 探究模式：把一个概念变成学习者亲手操作的交互式学习任务（DSH agent preset） |
| 158 | [GuanYang14700/dsh-hermes-panel](https://github.com/GuanYang14700/dsh-hermes-panel) | 0 | 2026-10-15 | 2026-10-15 | Hermes in the DSH sidebar: gateway + dashboard control, Hermes own health report, and the DSH &lt;-&gt; Hermes bridge. Generated mirror of plugins/hermes-panel - do not edit here. |
| 159 | [GuaPiaaaaa/DSHplugin](https://github.com/GuaPiaaaaa/DSHplugin) | 0 | 2026-10-14 | 2026-10-14 | 自制DSH插件 |
| 160 | [guyusky/dsh-export-plugin](https://github.com/guyusky/dsh-export-plugin) | 0 | 2026-10-14 | 2026-10-14 | DeepSeek Harness 会话导出插件：在 dsh Web 会话「更多」菜单注入「导出 Markdown / 导出 PDF」，纯前端注入、零 npm 依赖。Export DSH sessions to Markdown or PDF from the web GUI. |
| 161 | [hackmagic/dsh-unreal-agentlink](https://github.com/hackmagic/dsh-unreal-agentlink) | 0 | 2026-10-14 | 2026-10-14 | DSH 插件，桥接 UnrealAgentLink (UEBox)，DSH生态专属优化。 |
| 162 | [HanMaXiao/dsh-hub](https://github.com/HanMaXiao/dsh-hub) | 0 | 2026-10-15 | 2026-10-15 | A floating TODO, Note and Prompt panel for the DSH harness — three tabs, full CRUD, edge docking, grid and list views. |
| 163 | [he0119/dsh-aperture](https://github.com/he0119/dsh-aperture) | 0 | 2026-09-22 | 2026-10-14 | 自动发现 Aperture 网关上的模型，并加进 DSH 的模型选择器。 |
| 164 | [he0119/dsh-session-manager](https://github.com/he0119/dsh-session-manager) | 0 | 2026-09-27 | 2026-10-14 | 把 DSH 的会话库管起来：迁移工作区与会话到新目录，导出 / 导入 .dshsess 会话包，用 WebDAV 在多台机器之间同步。 |
| 165 | [HelloQingTao/dsh-railist](https://github.com/HelloQingTao/dsh-railist) | 0 | 2026-10-15 | 2026-10-15 | Unified rail for the DSH sidebar: sort the top panels and the bottom actions as one list. / DSH 左侧栏统一排序插件：顶部面板与底部动作混排成同一条序列。 |
| 166 | [henrikdukefoss/dsh-standardcompute](https://github.com/henrikdukefoss/dsh-standardcompute) | 0 | 2026-10-15 | 2026-10-15 | Standard Compute provider for DeepSeek Harness (dsh): OpenAI-compatible route with a cost router and direct model pins |
| 167 | [hg1048596-pixel/dsh-price-indicator](https://github.com/hg1048596-pixel/dsh-price-indicator) | 0 | 2026-10-03 | 2026-10-14 | DeepSeek Harness (dsh) plugin: show the current DeepSeek price tide (peak 梁文峰 / off-peak 梁文谷) and a countdown to the next price switch. Weekdays peak 09:00-12:00 &amp; 14:00-18:00; weekends and Chinese statutory holidays are off-peak all day. |
| 168 | [Hielo19/dsh-think-chinese](https://github.com/Hielo19/dsh-think-chinese) | 0 | 2026-10-14 | 2026-10-14 | DSH plugin: force the model thinking chain (reasoning) to always be written in Chinese |
| 169 | [hj01857655/dsh-context-memory](https://github.com/hj01857655/dsh-context-memory) | 0 | 2026-09-18 | 2026-10-15 | \[已归档\] 本插件已合并进 monorepo: https://github.com/hj01857655/dsh-plugins |
| 170 | [hj01857655/dsh-cost-track](https://github.com/hj01857655/dsh-cost-track) | 0 | 2026-09-18 | 2026-10-15 | \[已归档\] 本插件已合并进 monorepo: https://github.com/hj01857655/dsh-plugins |
| 171 | [hj01857655/dsh-model-arena](https://github.com/hj01857655/dsh-model-arena) | 0 | 2026-09-18 | 2026-10-15 | \[已归档\] 本插件已合并进 monorepo: https://github.com/hj01857655/dsh-plugins |
| 172 | [hj01857655/dsh-plugins](https://github.com/hj01857655/dsh-plugins) | 0 | 2026-10-15 | 2026-10-15 | DeepSeek Harness 插件集合（monorepo）：context-memory / verdict / theme-studio / cost-track / model-arena / prompt-vcs / step-trace / tool-stats |
| 173 | [hj01857655/dsh-prompt-vcs](https://github.com/hj01857655/dsh-prompt-vcs) | 0 | 2026-09-18 | 2026-10-15 | \[已归档\] 本插件已合并进 monorepo: https://github.com/hj01857655/dsh-plugins |
| 174 | [hj01857655/dsh-step-trace](https://github.com/hj01857655/dsh-step-trace) | 0 | 2026-09-18 | 2026-10-15 | \[已归档\] 本插件已合并进 monorepo: https://github.com/hj01857655/dsh-plugins |
| 175 | [Hope-Phenom/dsh-plugin-remote-use](https://github.com/Hope-Phenom/dsh-plugin-remote-use) | 0 | 2026-10-14 | 2026-10-14 | 把 DSH 里需要真实桌面的任务（GUI 自动化测试、只有看屏幕才能验证的结果）委托给局域网里已配对的工作节点执行，像调用子 Agent 一样驱动它 —— 自动化不再和操作者抢鼠标、键盘和焦点。任务以指令经 ACP over WebSocket 下发，由工作节点本地的 DSH 执行；提权一律进人工审批，沙箱无法被证明时拒绝启用，凭据不回传浏览器。 / Offload desktop-bound DSH tasks to a paired LAN worker over ACP, driven like a subagent. |
| 176 | [huanleyabo/dsh-selection-translate](https://github.com/huanleyabo/dsh-selection-translate) | 0 | 2026-10-04 | 2026-10-15 | dsh插件，用于直接对客户端内或网页内的文字划线翻译 |
| 177 | [huihuangdi/dsh-model-provider-badge](https://github.com/huihuangdi/dsh-model-provider-badge) | 0 | 2026-10-14 | 2026-10-14 | Shows the provider behind a session's current model as a compact badge in the DSH Web composer tool row. |
| 178 | [HumXC/dsh-nestquay](https://github.com/HumXC/dsh-nestquay) | 0 | 2026-10-14 | 2026-10-15 | Workspace groups for the DSH sidebar |
| 179 | [hxql666/dsh-presentation](https://github.com/hxql666/dsh-presentation) | 0 | 2026-10-14 | 2026-10-14 | Presentation-document mode for DeepSeek Harness: structured page data to PDF via Typst + Touying, with a visual self-review loop. |
| 180 | [hydra-db/hydradb-deepseek-plugin](https://github.com/hydra-db/hydradb-deepseek-plugin) | 0 | 2026-10-14 | 2026-10-14 | Persistent long-term memory for the DeepSeek Harness (dsh), powered by HydraDB. |
| 181 | [iJetLi/dsh-providers-hub](https://github.com/iJetLi/dsh-providers-hub) | 0 | 2026-10-14 | 2026-10-14 | deepseek-harness plugin: sign in and manage accounts across multiple AI coding providers, with multi-account pools and silent credential refresh |
| 182 | [imason85/dsh-normify](https://github.com/imason85/dsh-normify) | 0 | 2026-10-14 | 2026-10-14 | Normify · DSH 插件：把项目架构写成归一化的分形模块树，三层校验（写时 / 校验 / 冻结回执）、30 个 normify_* 工具 + normify-gen 技能，一键渲染单文件交互式架构图；支持伴随式开发（change_open → brief → check → 实施 → refresh → change_close）。 |
| 183 | [imtokenxinluo/dsh-publish-guard](https://github.com/imtokenxinluo/dsh-publish-guard) | 0 | 2026-10-14 | 2026-10-14 | DeepSeek Harness plugin publish armor: pre-publish leak scan + entry-safe obfuscation |
| 184 | [imtwa/dsh-recall](https://github.com/imtwa/dsh-recall) | 0 | 2026-10-14 | 2026-10-14 | DeepSeek Harness 跨会话记忆（按需）：列出并加载之前会话干了什么，不自动污染上下文。Cross-session memory for DSH, loaded on demand. |
| 185 | [isabellasahu/dsh-permission-rules](https://github.com/isabellasahu/dsh-permission-rules) | 0 | 2026-10-14 | 2026-10-14 | Claude Code-style declarative permission rules for DeepSeek Harness: ordered allow/deny/ask rules with tool-name, argument (glob/regex), and workspace-path matching on the tools/pre-execute waterfall, session-log audit, and HMR reload. |
| 186 | [Ivanj61/seektty](https://github.com/Ivanj61/seektty) | 0 | 2026-10-14 | 2026-10-14 | 面向 DeepSeek Harness 的 Claude Code 风格终端界面，支持 Windows、macOS 与 Linux，兼容透明终端、VS Code 主题和自定义配色。 |
| 187 | [jabingu/dsh-reply-suggestions](https://github.com/jabingu/dsh-reply-suggestions) | 0 | 2026-10-14 | 2026-10-14 | Contextual reply suggestions for DeepSeek Harness. Press Enter to fill an editable draft. |
| 188 | [jdz321/dsh-plugin-relay](https://github.com/jdz321/dsh-plugin-relay) | 0 | 2026-09-27 | 2026-10-14 | DeepSeek Harness (dsh) plugin that routes model traffic through any new-api-family relay panel (one-api / new-api / Veloera / done-hub / ...) |
| 189 | [jiangluoyiyi/dsh-quota-pill](https://github.com/jiangluoyiyi/dsh-quota-pill) | 0 | 2026-10-15 | 2026-10-15 | DSH plugin: DeepSeek account balance and per-Session spend in the composer dock |
| 190 | [jiaruihuang/dsh-pi-ai-sync](https://github.com/jiaruihuang/dsh-pi-ai-sync) | 0 | 2026-10-14 | 2026-10-14 | dsh plugin that syncs pi.dev model listings into the pi-ai catalog and llm-pi-ai settings — new provider models become selectable without hand-editing node_modules. |
| 191 | [jidekaixin2dian/dsh-team-flow](https://github.com/jidekaixin2dian/dsh-team-flow) | 0 | 2026-10-14 | 2026-10-14 | Plugin-only Steer Wake for DeepSeek Harness Agent Teams. End one wait while teammates keep running. |
| 192 | [Joe-0202/dsh-archive-manager](https://github.com/Joe-0202/dsh-archive-manager) | 0 | 2026-10-15 | 2026-10-15 | DeepSeek Harness 归档管理插件：双 Tab 面板管理已归档会话，支持归档/取消归档/彻底删除 |
| 193 | [jonah791/dsh-ask-evidence-gate](https://github.com/jonah791/dsh-ask-evidence-gate) | 0 | 2026-10-15 | 2026-10-15 | 上抛前取证闸：调用 ask 类工具时在返回里注入「本会话相关取证 N 次」读数（只送达信号、不拦截 · 机制承载） |
| 194 | [juanbaiing/dsh-alert-inject](https://github.com/juanbaiing/dsh-alert-inject) | 0 | 2026-10-15 | 2026-10-15 | 给 DSH agent 一个"回答前会出声"的机制：目标锚点、似曾相识检索、重复检测、引用核对、按语境分块的警报判据。零第三方依赖，核心不调 LLM。 |
| 195 | [JunYingLingLan/dsh-sylphiette-agent](https://github.com/JunYingLingLan/dsh-sylphiette-agent) | 0 | 2026-10-15 | 2026-10-15 | 希露菲（Sylphiette）· DeepSeek Harness 角色扮演预设：中文人设 + 453 条六面世界设定按需注入 |
| 196 | [jWright6359/flameox](https://github.com/jWright6359/flameox) | 0 | 2026-10-14 | 2026-10-14 | Runtime evidence that helps agents trace, profile, and burn down hotspots in application and native code, GPU kernels, and inference stacks. |
| 197 | [kang200862/dsh-firefly-spring-skin](https://github.com/kang200862/dsh-firefly-spring-skin) | 0 | 2026-10-15 | 2026-10-15 | DeepSeek Harness 的流萤「春日手信」主题皮肤样板 · Firefly 'Spring Missive' theme skin for the DSH web GUI |
| 198 | [Kanokwan89/jevcore](https://github.com/Kanokwan89/jevcore) | 0 | 2026-10-14 | 2026-10-14 | TypeSafe Jev for DeepSeek Harness, the Model Context Protocol, and plain Node: typed judgments instead of prose, offline by default. |
| 199 | [kaya734/jevcore](https://github.com/kaya734/jevcore) | 0 | 2026-10-14 | 2026-10-14 | TypeSafe Jev for DeepSeek Harness, the Model Context Protocol, and plain Node: typed judgments instead of prose, offline by default. |
| 200 | [kimo-si/dsh-skin-live](https://github.com/kimo-si/dsh-skin-live) | 0 | 2026-10-14 | 2026-10-14 | DSH Web 全局皮肤插件：图片/视频背景铺满界面，面板半透明可调 \| Global image/video background skin for DSH Web |
| 201 | [kissfirembx/dsh-skill-map](https://github.com/kissfirembx/dsh-skill-map) | 0 | 2026-10-15 | 2026-10-15 | DSH skill map: browse every loaded skill through your own categories in a right-sidebar tab. |
| 202 | [KKUCODES/dshm-plugin](https://github.com/KKUCODES/dshm-plugin) | 0 | 2026-10-13 | 2026-10-14 | Desktop plugin for DeepSeek Harness that connects DSHM to computer sessions, with device pairing, access control, and synchronized chat. |
| 203 | [Klop233/dsh-claude-code-theme](https://github.com/Klop233/dsh-claude-code-theme) | 0 | 2026-10-14 | 2026-10-14 | Claude Code visual theme for the DeepSeek Harness Web GUI ??warm paper palette, terracotta accent, Claude Code transcript markers and mono-forward typography. |
| 204 | [Knight-Zjy/dsh-workspace-categories](https://github.com/Knight-Zjy/dsh-workspace-categories) | 0 | 2026-10-14 | 2026-10-14 | DeepSeek Harness 侧边栏的工作区分类树：分类 &gt; 工作区 &gt; 会话（VS Code 风格）。Collapsible category tree for DSH workspaces. |
| 205 | [koliy82/dsh-model-icons](https://github.com/koliy82/dsh-model-icons) | 0 | 2026-10-15 | 2026-10-15 | Vendor marks in the DeepSeek Harness model picker: the provider's own model catalog and logos mirrored to a loopback route, painted with a CSS mask in the composer menu, the model button and the /model popup. |
| 206 | [Lanzuelo/dsh-codex-bridge](https://github.com/Lanzuelo/dsh-codex-bridge) | 0 | 2026-10-14 | 2026-10-14 | Codex architect and read-only reviewer for DeepSeek Harness Desktop. ChatGPT sign-in, model selection, explicit file approval and checkpoints. Preview. |
| 207 | [lb290/dsh-db-connections](https://github.com/lb290/dsh-db-connections) | 0 | 2026-10-15 | 2026-10-15 | Named database connections for DeepSeek Harness - configure MySQL in a settings page, then refer to them by name in chat. Read-only by default, writes opt-in per connection. |
| 208 | [Leo-sail/dsh-plugin-agent-collaboration](https://github.com/Leo-sail/dsh-plugin-agent-collaboration) | 0 | 2026-10-14 | 2026-10-14 | Persistent Bots, group rooms and a durable run ledger for DeepSeek Harness (DSH) — an installable DSH plugin. |
| 209 | [LeonieKarabacak542/jevcore](https://github.com/LeonieKarabacak542/jevcore) | 0 | 2026-10-14 | 2026-10-14 | TypeSafe Jev for DeepSeek Harness, the Model Context Protocol, and plain Node: typed judgments instead of prose, offline by default. |
| 210 | [Lessthinker66/dsh-open-native](https://github.com/Lessthinker66/dsh-open-native) | 0 | 2026-10-15 | 2026-10-15 | Open delivered-file cards with the system default app |
| 211 | [LightingHa/dsh-cc-switch](https://github.com/LightingHa/dsh-cc-switch) | 0 | 2026-10-15 | 2026-10-15 | 把 cc-switch 配置的模型供应商接入 DSH（转成 llm-pi-ai 路由，附连通性体检） |
| 212 | [Linear1024/dsh-bupt-ucloud](https://github.com/Linear1024/dsh-bupt-ucloud) | 0 | 2026-10-14 | 2026-10-14 | 北邮云平台接口的dsh插件 |
| 213 | [Lingrui98/dsh-plugin-team-model-routing](https://github.com/Lingrui98/dsh-plugin-team-model-routing) | 0 | 2026-10-15 | 2026-10-15 | DSH plugin: let an Agent Teams Lead choose the provider, model, and reasoning effort of each teammate it spawns. |
| 214 | [LionNatsu/dsh-vision-reasoner](https://github.com/LionNatsu/dsh-vision-reasoner) | 0 | 2026-10-14 | 2026-10-14 | Mark things on a picture and look at the picture: a DeepSeek Harness plugin that turns an image into a record of numbered marks, with coordinate-labelled close-ups and comparison sheets you can check. |
| 215 | [lishuo4096/artifact-center](https://github.com/lishuo4096/artifact-center) | 0 | 2026-10-14 | 2026-10-14 | Cross-session artifact center for DeepSeek Harness: agent tools register deliverable files (PDF/Excel/PPT/code/JSON) into one shared folder, plus a sidebar panel that filters them by category, extension or keyword. |
| 216 | [lishuo4096/dsh-mcu-debug](https://github.com/lishuo4096/dsh-mcu-debug) | 0 | 2026-10-15 | 2026-10-15 | DSH 插件：STM32 / PY32 调试与烧录（CMSIS-DAP / DAPLink / openocd）+ 串口收发。内置独立 openocd 副本，不碰你的 IDE 树。 |
| 217 | [lishuo4096/dsh-wch-debug](https://github.com/lishuo4096/dsh-wch-debug) | 0 | 2026-10-15 | 2026-10-15 | Drive WCH CH32 microcontrollers from the CLI through an isolated private copy of WCH's OpenOCD plus WCH-Link. DSH plugin: 20 tools + an agent skill. MIT. |
| 218 | [liu19666/dsh-model-block-picker](https://github.com/liu19666/dsh-model-block-picker) | 0 | 2026-10-13 | 2026-10-14 | DeepSeek Harness 插件：把输入框模型选择器改成按来源渠道分块 + 下钻选模型，保留搜索与推理强度 |
| 219 | [liufangrui1105/dsh-plugin-github](https://github.com/liufangrui1105/dsh-plugin-github) | 0 | 2026-10-14 | 2026-10-14 | For DSH to connect to GitHub  |
| 220 | [liuhaolong16/dsh-paper-studio](https://github.com/liuhaolong16/dsh-paper-studio) | 0 | 2026-10-14 | 2026-10-15 | 论文方案（编排层）+ DSH 论文插件 V3：真源唯一 · 双模式（用户模式默认封闭）· 五种写作模式（行为差异化）· 确定性意图判据 · 可复跑自检（插件 20/20 · 出厂审查 6/6 · 编排层 53/53）。 |
| 221 | [liujianqiao701/dsh-test-framework](https://github.com/liujianqiao701/dsh-test-framework) | 0 | 2026-10-14 | 2026-10-14 | 面向测试工程师的 DSH 插件：把空文件夹一键变成「测试工作框架」骨架，并在 AI 会话里带上框架约束 —— 需求文档拆模块 / 确认版本 / 跨文档关联 / 登记测试环境与账密。AI test-framework plugin for DeepSeek Harness. |
| 222 | [lnyuqian/dsh-quick-prompts](https://github.com/lnyuqian/dsh-quick-prompts) | 0 | 2026-08-27 | 2026-10-15 | DSH 插件（Web 版 / 桌面版通用）：输入框上方常驻快捷条 + 闪电笔弹层，点选预设提示词追加到原有内容之后（不清空），可按条开启自动发送、可设序号排序，支持 MD 导入导出；数据存全局 ~/.dsh/quick-prompts.json 永不丢失 |
| 223 | [lo2589/knowledge_database](https://github.com/lo2589/knowledge_database) | 0 | 2026-10-08 | 2026-10-14 | Click any sentence in an AI chat to turn it into a card, then hang the cards into your own knowledge tree. DeepSeek Harness (dsh) plugin + standalone web app. 从对话里把有用的句子挑出来，挂成自己的知识树。 |
| 224 | [lSzymanski73/flameox](https://github.com/lSzymanski73/flameox) | 0 | 2026-10-14 | 2026-10-14 | Runtime evidence that helps agents trace, profile, and burn down hotspots in application and native code, GPU kernels, and inference stacks. |
| 225 | [LucaHoward64253/flameox](https://github.com/LucaHoward64253/flameox) | 0 | 2026-10-14 | 2026-10-14 | Runtime evidence that helps agents trace, profile, and burn down hotspots in application and native code, GPU kernels, and inference stacks. |
| 226 | [LUgABeEEE/dsh-global-todo](https://github.com/LUgABeEEE/dsh-global-todo) | 0 | 2026-10-14 | 2026-10-14 | Global todo list plugin for DeepSeek Harness — one JSON list a person and an agent both write to |
| 227 | [lvy-jsd/dsh-tool-manager](https://github.com/lvy-jsd/dsh-tool-manager) | 0 | 2026-10-15 | 2026-10-15 | On-demand tool loading for DeepSeek Harness: browse every tool as a directory, load only what you need. |
| 228 | [lwwwj/dsh-whale-widget-naiwa-role](https://github.com/lwwwj/dsh-whale-widget-naiwa-role) | 0 | 2026-10-14 | 2026-10-14 | dsh-whale-widget插件中增加一个新角色奶蛙 |
| 229 | [majahoffmann125/dsh-normify](https://github.com/majahoffmann125/dsh-normify) | 0 | 2026-10-14 | 2026-10-14 | Normify · DSH 插件：把项目架构写成归一化的分形模块树，三层校验（写时 / 校验 / 冻结回执）、30 个 normify_* 工具 + normify-gen 技能，一键渲染单文件交互式架构图；支持伴随式开发（change_open → brief → check → 实施 → refresh → change_close）。 |
| 230 | [Makk9609/dsh-find-viewer](https://github.com/Makk9609/dsh-find-viewer) | 0 | 2026-10-15 | 2026-10-15 | Find bar for DeepSeek Harness sidebar text previews: whole-file match count, highlighted hits, and jumps. |
| 231 | [Maple-Yoli/dsh-notice-card](https://github.com/Maple-Yoli/dsh-notice-card) | 0 | 2026-10-15 | 2026-10-15 | Focus-free notification cards for DeepSeek Harness on Windows: turn finished, approval pending, question pending. |
| 232 | [Marilynm09184/dsh-permission-rules](https://github.com/Marilynm09184/dsh-permission-rules) | 0 | 2026-10-14 | 2026-10-14 | Claude Code-style declarative permission rules for DeepSeek Harness: ordered allow/deny/ask rules with tool-name, argument (glob/regex), and workspace-path matching on the tools/pre-execute waterfall, session-log audit, and HMR reload. |
| 233 | [MaxHou-infinity/cli-doctor](https://github.com/MaxHou-infinity/cli-doctor) | 0 | 2026-09-04 | 2026-10-15 | 只读 CLI 工具链体检：DSH 侧栏插件 + Codex 侧栏插件 + Agent Skill，按生态列出本机 CLI 版本、可用更新与依赖影响，只报不升。Read-only local CLI toolchain audit for DeepSeek Harness (DSH) and Codex. |
| 234 | [MaxHou-infinity/dsh-mcp-session-recovery](https://github.com/MaxHou-infinity/dsh-mcp-session-recovery) | 0 | 2026-10-15 | 2026-10-15 | Out-of-tree patch: make @deepseek-ai/dsh-mcp-client recover when a stateful Streamable HTTP MCP server restarts, instead of failing until DSH is restarted. |
| 235 | [mengwEX/dsh-block-ptc](https://github.com/mengwEX/dsh-block-ptc) | 0 | 2026-10-15 | 2026-10-15 | Model-controlled context blocks for DeepSeek Harness PTC mode |
| 236 | [mimetics-ai/mimetics-dsh-weekly-report](https://github.com/mimetics-ai/mimetics-dsh-weekly-report) | 0 | 2026-10-15 | 2026-10-15 | DeepSeek Harness (dsh) 工具插件：一句「帮我生成本周周报」即得固定四模块 Markdown 周报；内置流水线，装上即用。 |
| 237 | [Minggle/dsh-token-breakdown-stats](https://github.com/Minggle/dsh-token-breakdown-stats) | 0 | 2026-10-15 | 2026-10-15 | dsh plugin: replaces the composer-dock stats pill so a session's token total covers the main agent plus every subagent it called, with a click-open breakdown by bucket, by subagent, and by model. |
| 238 | [mnowak517/flameox](https://github.com/mnowak517/flameox) | 0 | 2026-10-14 | 2026-10-14 | Runtime evidence that helps agents trace, profile, and burn down hotspots in application and native code, GPU kernels, and inference stacks. |
| 239 | [monika31250/dsh-noema](https://github.com/monika31250/dsh-noema) | 0 | 2026-10-14 | 2026-10-14 | Noema long-term memory plugin for DSH: durable, inspectable agent memory with recall tools and a settings page. |
| 240 | [moonlight2893267956/dsh-usage-stats](https://github.com/moonlight2893267956/dsh-usage-stats) | 0 | 2026-08-18 | 2026-10-15 | dsh token 统计插件 |
| 241 | [moyuqing-man/dsh-plugin-community](https://github.com/moyuqing-man/dsh-plugin-community) | 0 | 2026-10-13 | 2026-10-14 | DSH 插件社区的讨论与反馈入口：插件展示 / 求助 / 想法与需求 / 已知问题。本仓库不含任何可执行代码（见 SECURITY.md）。 / Discussion and feedback hub for the DSH plugin community. Contains no executable code. |
| 242 | [moyuqing-man/dsh-plugin-community-source](https://github.com/moyuqing-man/dsh-plugin-community-source) | 0 | 2026-10-13 | 2026-10-14 | DSH 插件社区：把 GitHub Discussions 变成插件讨论区、Issues 变成 bug 汇报入口、Stars 变成评分，插件详情页里就能看到社区在说什么。纯 JS、零原生依赖。 / A community layer for DSH plugins — discussions, bug inbox and ratings, right inside the plugin detail page. |
| 243 | [mqnu00/dsh-undici-timeout](https://github.com/mqnu00/dsh-undici-timeout) | 0 | 2026-10-15 | 2026-10-15 | A configurable direct channel for the DeepSeek Harness LLM egress: a keep-alive undici Agent with adjustable connect/headers/body/keep-alive timeouts, IPv4-forcing, HTTP/2 off by default, automatic stand-down behind a proxy, and a read-only status route. A minimal patch, one file, zero dependencies. |
| 244 | [nanshang328/dsh-desk-card](https://github.com/nanshang328/dsh-desk-card) | 0 | 2026-10-14 | 2026-10-14 | Bottom-right native Windows cards for DeepSeek Harness: approve a permission request, know a question is waiting, and get a summary when a turn finishes. |
| 245 | [Nao18242/dsh-crew](https://github.com/Nao18242/dsh-crew) | 0 | 2026-10-14 | 2026-10-14 | DeepSeek Harness (DSH) plugin: dispatch work to DSH agents from Claude Code / Codex — native subagent progress, in-host worker sessions with per-tier presets, and a multimodal bridge that lends the text-only harness vision and image generation. |
| 246 | [neil-ji/dsh-plugin-sidebar-tabs](https://github.com/neil-ji/dsh-plugin-sidebar-tabs) | 0 | 2026-10-15 | 2026-10-15 | Browser-style tab management for the DeepSeek Harness right sidebar: batch close, float/dock, reopen closed tabs, and a tab overview panel. |
| 247 | [NeoHotaru/dsh-read-animation](https://github.com/NeoHotaru/dsh-read-animation) | 0 | 2026-10-14 | 2026-10-15 | DeepSeek Harness plugin: a pasted animated GIF or WebP keeps playing in the UI, and the model receives a labelled sheet of frames sampled across the animation. |
| 248 | [Nesarf/dsh-shell-surfaces](https://github.com/Nesarf/dsh-shell-surfaces) | 0 | 2026-10-14 | 2026-10-15 | The machine's non-pwsh execution surfaces as one DSH tool: a WSL Linux userland, nushell's structured pipelines, the MSYS2 userland (bash/zsh/fish/brush), and a real console for interactive programs. |
| 249 | [Nigheart/dsh-mcp-bridge](https://github.com/Nigheart/dsh-mcp-bridge) | 0 | 2026-10-14 | 2026-10-14 | Expose a running DeepSeek Harness instance over MCP, so an external agent can list, delegate to, and answer questions in that instance's own sessions. |
| 250 | [npopov865/dsh-permission-rules](https://github.com/npopov865/dsh-permission-rules) | 0 | 2026-10-14 | 2026-10-14 | Claude Code-style declarative permission rules for DeepSeek Harness: ordered allow/deny/ask rules with tool-name, argument (glob/regex), and workspace-path matching on the tools/pre-execute waterfall, session-log audit, and HMR reload. |
| 251 | [nvjaasouid/dsh-pending-session](https://github.com/nvjaasouid/dsh-pending-session) | 0 | 2026-10-15 | 2026-10-15 | DSH 插件：未发送的会话草稿留在侧边栏标为「待执行」，可随时修改发送删除。删除不可恢复。 |
| 252 | [offzen/dsh-gitea-search](https://github.com/offzen/dsh-gitea-search) | 0 | 2026-10-15 | 2026-10-15 | dsh-plugin |
| 253 | [OldLigant/dsh-auto-rename](https://github.com/OldLigant/dsh-auto-rename) | 0 | 2026-09-29 | 2026-10-15 | This repo provides a button for auto rename session in deepseek-harness |
| 254 | [oliblue-evan/dsh-peakclock](https://github.com/oliblue-evan/dsh-peakclock) | 0 | 2026-10-15 | 2026-10-15 | 峰谷倒计时：在 DSH 模型名称中显示 DeepSeek 峰谷状态与倒计时，支持实时预览与紧凑设置。 |
| 255 | [Oliveryfaso/dsh-babel](https://github.com/Oliveryfaso/dsh-babel) | 0 | 2026-10-14 | 2026-10-14 | 让 DeepSeek Harness 直接使用其他 AI 编码工具生态里的 MCP 服务器与插件——读已有配置而非要求作者重新移植，并明确报告哪些能跑、哪些缺密钥、哪些跑不了。 |
| 256 | [omarfischer4315/jevcore](https://github.com/omarfischer4315/jevcore) | 0 | 2026-10-14 | 2026-10-14 | TypeSafe Jev for DeepSeek Harness, the Model Context Protocol, and plain Node: typed judgments instead of prose, offline by default. |
| 257 | [opfield/dsh-plugins](https://github.com/opfield/dsh-plugins) | 0 | 2026-10-14 | 2026-10-14 | Opfield plugins for DeepSeek Harness: MCP Hub and Opfield |
| 258 | [Paidaxing-Tiancai/dsh-strata-monitor](https://github.com/Paidaxing-Tiancai/dsh-strata-monitor) | 0 | 2026-10-15 | 2026-10-15 | Strata model server monitor panel for DeepSeek Harness: monitor page, floating window, composer status line. |
| 259 | [Pierrew19600/dsh-normify](https://github.com/Pierrew19600/dsh-normify) | 0 | 2026-10-14 | 2026-10-14 | Normify · DSH 插件：把项目架构写成归一化的分形模块树，三层校验（写时 / 校验 / 冻结回执）、30 个 normify_* 工具 + normify-gen 技能，一键渲染单文件交互式架构图；支持伴随式开发（change_open → brief → check → 实施 → refresh → change_close）。 |
| 260 | [PieterPrice49/seektty](https://github.com/PieterPrice49/seektty) | 0 | 2026-10-14 | 2026-10-14 | 面向 DeepSeek Harness 的 Claude Code 风格终端界面，支持 Windows、macOS 与 Linux，兼容透明终端、VS Code 主题和自定义配色。 |
| 261 | [po-et/dsh-har-triage](https://github.com/po-et/dsh-har-triage) | 0 | 2026-10-15 | 2026-10-15 | Offline HAR diagnostics with minimal evidence for DeepSeek Harness |
| 262 | [po-et/dsh-sheet-diff](https://github.com/po-et/dsh-sheet-diff) | 0 | 2026-10-14 | 2026-10-14 | Read-only CSV/XLSX change review for DeepSeek Harness: align business keys, inspect values and formulas, and export review comments. |
| 263 | [Pro12447890/rus-image-percent-gen](https://github.com/Pro12447890/rus-image-percent-gen) | 0 | 2026-10-15 | 2026-10-15 | DeepSeek Harness bundle: Russian UI localization, element scaling (80-220%), pixel-art drawing (pixel_art), and outbound proxy choice with its own settings page - HTTP(S)/SOCKS5, latency and exit-country checks (proxy_switch). |
| 264 | [puyokura/dsh-1tempo](https://github.com/puyokura/dsh-1tempo) | 0 | 2026-10-15 | 2026-10-15 | DSH plugin: convert a request into MiL with Sarashina, review it, then hand it to the model dsh is running (TUI and Web UI) |
| 265 | [qqmqq/dsh-live2d-pet](https://github.com/qqmqq/dsh-live2d-pet) | 0 | 2026-10-14 | 2026-10-15 | Live2D 桌宠挂件 for DeepSeek Harness Web: 可拖动吸附/滚轮缩放/待机呼吸眨眼, 单击显示 DeepSeek 余额 |
| 266 | [quberi/dsh-quberi](https://github.com/quberi/dsh-quberi) | 0 | 2026-10-14 | 2026-10-14 | Search your Quberi knowledge base from DeepSeek Harness (OAuth sign-in, read-only) |
| 267 | [r-ayin/dsh-active-sessions](https://github.com/r-ayin/dsh-active-sessions) | 0 | 2026-10-15 | 2026-10-15 | Sidebar tab listing running and completed-unread sessions across projects, with click-to-switch and grouping. |
| 268 | [r-ayin/dsh-approval-watch](https://github.com/r-ayin/dsh-approval-watch) | 0 | 2026-10-15 | 2026-10-15 | Floating overlay that surfaces pending approvals, plan reviews and user questions from any session, with click-through to the session. |
| 269 | [r-ayin/dsh-compaction-codex](https://github.com/r-ayin/dsh-compaction-codex) | 0 | 2026-10-15 | 2026-10-15 | Codex-style window-swap compaction engine: deterministic pointer-template summaries with zero LLM calls, replacing the default LLM-summary compaction. |
| 270 | [r-ayin/dsh-context-budget](https://github.com/r-ayin/dsh-context-budget) | 0 | 2026-10-15 | 2026-10-15 | Ports the Codex CLI TokenBudget mechanism to dsh: remaining-context awareness, archive rollover, and notes/history retrieval tools for past sessions. |
| 271 | [r-ayin/dsh-en2zh](https://github.com/r-ayin/dsh-en2zh) | 0 | 2026-10-15 | 2026-10-15 | Live English-to-Chinese translation of model output in the web UI - translation above, original kept aside - with an optional local MT engine and LLM fallback. |
| 272 | [r-ayin/dsh-guild-bridge](https://github.com/r-ayin/dsh-guild-bridge) | 0 | 2026-10-15 | 2026-10-15 | Bridges a guild expert-team board into dsh: routes guild tasks to one-shot dsh subagents, visible in the GUI. |
| 273 | [r-ayin/dsh-harness-suite](https://github.com/r-ayin/dsh-harness-suite) | 0 | 2026-10-15 | 2026-10-15 | Session hygiene suite: strips leaked thinking tags, adds retry cooldown budgets, blocks plaintext credentials before execution, runs a daily health-check loop with a health panel, and auto-tunes agent instruction hints from error statistics. |
| 274 | [r-ayin/dsh-mac-notify](https://github.com/r-ayin/dsh-mac-notify) | 0 | 2026-10-15 | 2026-10-15 | macOS desktop notifications for dsh events, delivered over SSH to a small notifier HTTP listener running on the Mac. |
| 275 | [r-ayin/dsh-req-capture](https://github.com/r-ayin/dsh-req-capture) | 0 | 2026-10-15 | 2026-10-15 | Diagnostic plugin: wraps global fetch to log requests and capture bodies whose URL matches a configurable substring to disk. |
| 276 | [r-ayin/dsh-resource-lease](https://github.com/r-ayin/dsh-resource-lease) | 0 | 2026-10-15 | 2026-10-15 | Resource lease governance: auto-registers browser tabs, background jobs, processes and ports as session-owned leases with TTL auto-reclaim, pinning and manual sweep. |
| 277 | [r-ayin/dsh-skill-commands](https://github.com/r-ayin/dsh-skill-commands) | 0 | 2026-10-15 | 2026-10-15 | Smarter slash-command matching for skills: suffix, contains and alias matching (e.g. /studio finds autonomous-studio). |
| 278 | [r-ayin/dsh-stream-index-guard](https://github.com/r-ayin/dsh-stream-index-guard) | 0 | 2026-10-15 | 2026-10-15 | Patches the LLM assistant-stream accumulator at runtime to clamp invalid chunk indices, downgrading hard stream failures to dropped or merged chunks; ships a stats tool. |
| 279 | [r-ayin/dsh-super-injector](https://github.com/r-ayin/dsh-super-injector) | 0 | 2026-10-15 | 2026-10-15 | Runtime plugin injector: inject, hot-reload and uninstall local plugin packages in a running dsh without restarts, with plugin scaffolding, self-test and a management panel. |
| 280 | [r-ayin/dsh-ttft-hedge](https://github.com/r-ayin/dsh-ttft-hedge) | 0 | 2026-10-15 | 2026-10-15 | Hedged requests for streaming /v1/messages LLM calls: fires a second attempt when response headers miss a deadline and races them, retries immediately on 5xx/504, passes through 4xx/429, with statistics. |
| 281 | [r-ayin/dsh-web-search-bing](https://github.com/r-ayin/dsh-web-search-bing) | 0 | 2026-10-15 | 2026-10-15 | Keyless Bing HTML search provider plus a relay-aware fetch provider with per-hop redirect validation for the dsh web seam. |
| 282 | [r-ayin/dsh-web-search-duck](https://github.com/r-ayin/dsh-web-search-duck) | 0 | 2026-10-15 | 2026-10-15 | Web search provider that bridges an OpenAI Responses-API-compatible endpoint with the web_search_preview tool into the dsh web seam. |
| 283 | [R1145141919810/dsh-vulnclaw-pentest](https://github.com/R1145141919810/dsh-vulnclaw-pentest) | 0 | 2026-10-15 | 2026-10-15 | VulnClaw penetration-testing mode for the DeepSeek Harness: nmap, HTTP probing, directory/JS recon, traffic evidence, reports and PoCs as native Harness tools. Based on VulnClaw (MIT) by UncleC. |
| 284 | [RaganaBloodedge/dsh-lmmarr](https://github.com/RaganaBloodedge/dsh-lmmarr) | 0 | 2026-10-15 | 2026-10-15 | DeepSeek Harness 长期记忆插件：分层任务记忆 + 关系图谱 + 索引常驻稳定前缀；零运行时依赖，另附同源的 Agent skill 形态 |
| 285 | [RaganaBloodedge/dsh-read-video](https://github.com/RaganaBloodedge/dsh-read-video) | 0 | 2026-10-14 | 2026-10-14 | DeepSeek Harness 视频阅读插件（TypeScript，骨架阶段）：让模型按时间戳取帧/取音频而不下载整片 —— HTTP Range + ffmpeg 远程 seek 已在 spike 验证，取一帧仅占整片 0.7%；目前只有 video_probe 落地成工具。 |
| 286 | [RicardoYan/dsh-agents-md-only](https://github.com/RicardoYan/dsh-agents-md-only) | 0 | 2026-10-11 | 2026-10-14 | Make DSH read only AGENTS.md / AGENTS.local.md, not CLAUDE.md · 让 DSH 只读 AGENTS.md / AGENTS.local.md，不读 CLAUDE.md |
| 287 | [rinsoraa/dsh-pulse-rail](https://github.com/rinsoraa/dsh-pulse-rail) | 0 | 2026-10-15 | 2026-10-15 | Music visualiser for the DeepSeek Harness turn-navigation rail: bars grow and thicken with system audio (WASAPI loopback), geometry only, no admin rights. |
| 288 | [rnmxrbb/dsh-provider-fold](https://github.com/rnmxrbb/dsh-provider-fold) | 0 | 2026-10-15 | 2026-10-15 | Collapsible provider groups and prominent provider headings for the DSH (DeepSeek Harness) model selection menu. |
| 289 | [Roussel27423/engramory](https://github.com/Roussel27423/engramory) | 0 | 2026-10-14 | 2026-10-14 | A portable memory protocol for AI agents — load it as standing rules; a curation discipline + reference spec + optional cap hook. |
| 290 | [Roussel27423/opencode2dsh](https://github.com/Roussel27423/opencode2dsh) | 0 | 2026-10-14 | 2026-10-14 | DSH plugin — free OpenCode Zen models for DeepSeek Harness (DSH). Free LLM API, no API key needed. 在 DSH 中使用 OpenCode Zen 免费模型，无需 API key |
| 291 | [rumilhz/dsh-pylon-trae](https://github.com/rumilhz/dsh-pylon-trae) | 0 | 2026-10-15 | 2026-10-15 | Trae LLM provider for DeepSeek Harness: reads the credential an already signed-in Trae desktop/CLI wrote, serves an OpenAI-compatible endpoint on a fixed loopback port, and seeds one editable provider entry on the models page. Never writes Trae data. |
| 292 | [rumilhz/dsh-pylon-workbuddy](https://github.com/rumilhz/dsh-pylon-workbuddy) | 0 | 2026-10-15 | 2026-10-15 | DeepSeek Harness (dsh) plugin: supervise a workbuddy2api gateway and register its models as an editable LLM provider. Self-hosted, no upstream wrapping. |
| 293 | [Sayi/dsh-plugin-kit](https://github.com/Sayi/dsh-plugin-kit) | 0 | 2026-10-14 | 2026-10-14 | deepseek harness plugin kit |
| 294 | [Seren-715/dsh-token-heatmap](https://github.com/Seren-715/dsh-token-heatmap) | 0 | 2026-10-14 | 2026-10-15 | A daily Token-usage heatmap for the DSH settings page. Aggregated entirely from local session logs; no external requests and no separate usage ledger. ｜ DSH 设置中的每日 Token 用量热力图，数据完全取自本机会话日志，不发起外部请求，亦无需另行记录用量。 |
| 295 | [shellexy/dsh-revise-chan](https://github.com/shellexy/dsh-revise-chan) | 0 | 2026-10-15 | 2026-10-15 | 让 dsh 可以修改 AI 回答内容 + 固定显示大纲：回答署名、修订分支、常驻大纲侧栏 |
| 296 | [Shiro-Design-16/dsh-daily-chat-config](https://github.com/Shiro-Design-16/dsh-daily-chat-config) | 0 | 2026-10-14 | 2026-10-14 | 在 DSH「插件」页里编辑 daily agent preset 的子条目列表（persona 与工具组合）——内存挂载，不写任何文件 |
| 297 | [Shiro-Design-16/dsh-minimax-tts](https://github.com/Shiro-Design-16/dsh-minimax-tts) | 0 | 2026-10-14 | 2026-10-14 | DSH 插件：用 MiniMax（海螺）TTS 朗读对话流里的 assistant 消息（手动播放 + 灵动模式） |
| 298 | [ShirohaChan/dsh-session-artifacts](https://github.com/ShirohaChan/dsh-session-artifacts) | 0 | 2026-10-15 | 2026-10-15 | Delete a DSH session together with the workspace artifacts that session produced - the file list is reconstructed from the session log and previewed with its total size. The artifacts can also be deleted on their own, keeping the conversation. |
| 299 | [ShiTan-677/dsh-linux-desktop-entry](https://github.com/ShiTan-677/dsh-linux-desktop-entry) | 0 | 2026-10-14 | 2026-10-14 | DeepSeek Harness plugin: install, repair or remove the Linux desktop entrance for the Web GUI from inside the harness. |
| 300 | [Shuai-S/dsh-sub2api-sync](https://github.com/Shuai-S/dsh-sub2api-sync) | 0 | 2026-10-01 | 2026-10-14 | DeepSeek Harness (DSH) plugin: sync one sub2api instance's groups, keys, and models into dsh-llm-pi-ai provider routes — one relay key, one provider. |
| 301 | [shuang-ying/dsh-ThirdApi-ThinkingMode](https://github.com/shuang-ying/dsh-ThirdApi-ThinkingMode) | 0 | 2026-10-15 | 2026-10-15 | "DSH bundle that syncs per-model thinking levels from each endpoint's own model listing |
| 302 | [siqyka/dsh-stock-leek](https://github.com/siqyka/dsh-stock-leek) | 0 | 2026-10-14 | 2026-10-14 | DSH 摸鱼韭菜插件：一个韭菜的自我修养。会话左下角大盘指数栏 + 行情悬浮窗（大盘/自选/持仓），支持 A股/北交所/港股/美股的分时、K线与持仓盈亏 |
| 303 | [Solovyov232/dsh-crew](https://github.com/Solovyov232/dsh-crew) | 0 | 2026-10-14 | 2026-10-14 | DeepSeek Harness (DSH) plugin: dispatch work to DSH agents from Claude Code / Codex — native subagent progress, in-host worker sessions with per-tier presets, and a multimodal bridge that lends the text-only harness vision and image generation. |
| 304 | [somporn07547/engramory](https://github.com/somporn07547/engramory) | 0 | 2026-10-14 | 2026-10-14 | A portable memory protocol for AI agents — load it as standing rules; a curation discipline + reference spec + optional cap hook. |
| 305 | [songzhiyin/dsh-local-model](https://github.com/songzhiyin/dsh-local-model) | 0 | 2026-10-14 | 2026-10-14 | 让 DeepSeek Harness 直连本地模型：兼容 OpenAI 协议（llama.cpp / LM Studio / vLLM / Ollama 的 /v1）与 Ollama 原生 API。无需登录、不消耗账号 token。 |
| 306 | [sqslm/dsh-pinpu](https://github.com/sqslm/dsh-pinpu) | 0 | 2026-10-14 | 2026-10-14 | Audio-reactive turn rail for DeepSeek Harness: the transcript's own turn marks dance to whatever the system is playing (WASAPI loopback), with hover-only highlighting and a left/right rail option. |
| 307 | [sskkde/dsh-goal-guard](https://github.com/sskkde/dsh-goal-guard) | 0 | 2026-10-14 | 2026-10-14 | DeepSeek Harness plugin: hold back goal auto-continuation while background subagents are still running (in-process disarm/resume guard), so a delegated turn does not burn &lt;goal_round&gt; injections while it waits for settlement. |
| 308 | [stefanydevitoqz-creatorPPP/dsh-edit-resend](https://github.com/stefanydevitoqz-creatorPPP/dsh-edit-resend) | 0 | 2026-10-15 | 2026-10-15 | DSH (DeepSeek Harness) plugin: edit an already-sent user prompt and resend it - forks a child session whose inherited prefix stops just before that message. |
| 309 | [Sun-beining/ai-safe-edit](https://github.com/Sun-beining/ai-safe-edit) | 0 | 2026-10-15 | 2026-10-15 | Safe file editing for AI agents: back up, validate, roll back on failure. Zero-dependency MCP server. |
| 310 | [sunrulin123/dsh-community-web-ui](https://github.com/sunrulin123/dsh-community-web-ui) | 0 | 2026-10-14 | 2026-10-14 | Unofficial responsive remote Web UI bundle for DeepSeek Harness with native Desktop isolation. |
| 311 | [Suxeca/dsh-client-ui-session-switcher](https://github.com/Suxeca/dsh-client-ui-session-switcher) | 0 | 2026-10-14 | 2026-10-14 | DSH session switcher: Ctrl+K command palette to create/archive/rename/search sessions, plus Ctrl+\[/\] cycling and VSCode-style shortcut layout. |
| 312 | [Suxeca/dsh-literature-library](https://github.com/Suxeca/dsh-literature-library) | 0 | 2026-10-14 | 2026-10-14 | DSH literature library: persistent, authenticated literature bookmarks and a local research knowledge base for academic review workflows. |
| 313 | [Suxeca/dsh-plugin-repo-auditor](https://github.com/Suxeca/dsh-plugin-repo-auditor) | 0 | 2026-10-14 | 2026-10-14 | DSH native plugin: audit GitHub repos for fake stars, stargazer bot farms and hollow codebases using CMU StarScout heuristics, plus static supply-chain and sensitive-permission inspection. |
| 314 | [Suxeca/dsh-science-map](https://github.com/Suxeca/dsh-science-map) | 0 | 2026-10-14 | 2026-10-14 | Science Map for DSH: compiler and toolkit that turns a research reasoning flow into an evolving, gated evolution map. |
| 315 | [swdwm5nr4k-sketch/dsh-netflow-dock](https://github.com/swdwm5nr4k-sketch/dsh-netflow-dock) | 0 | 2026-10-15 | 2026-10-15 | DSH 服务器流量监测插件：宿主半边采样 /proc/net/dev，浏览器半边在输入框下方显示实时上下行速率。 |
| 316 | [T1gerD/open-whale](https://github.com/T1gerD/open-whale) | 0 | 2026-10-14 | 2026-10-14 | 手机上的个人助理，远程使用电脑上的 DeepSeek Harness —— DSH 插件 + Expo 手机应用，扫码绑定、口语化回复、文件收发、远程开关机 |
| 317 | [taxueseek/dsh-models](https://github.com/taxueseek/dsh-models) | 0 | 2026-10-15 | 2026-10-15 | 模型选择 · 子代理路由 · 推理层级 — DSH Web GUI 的三分区模型菜单插件 |
| 318 | [temotee2103/dsh-remote-gui](https://github.com/temotee2103/dsh-remote-gui) | 0 | 2026-10-14 | 2026-10-14 | Embed a remote DeepSeek Harness GUI in the local DSH window over an SSH tunnel, with remote session listing and local/remote switching. |
| 319 | [The-Data-Galaxy/dsh-dpia-workbench](https://github.com/The-Data-Galaxy/dsh-dpia-workbench) | 0 | 2026-10-15 | 2026-10-15 | A versioned DPIA workbench for DeepSeek Harness: trace facts, resolve gaps, reassess risks, and produce reviewable reports. |
| 320 | [tHedlund38/dsh-lowtide](https://github.com/tHedlund38/dsh-lowtide) | 0 | 2026-10-14 | 2026-10-14 | Time-shifting task delegation for DeepSeek Harness (dsh): plan tasks at leisure, they run unattended off-peak, come back to a report. Human-adjudicated, desktop + web. |
| 321 | [theroi/dsh-bg-panel](https://github.com/theroi/dsh-bg-panel) | 0 | 2026-10-15 | 2026-10-15 | DSH 个性化插件：自定义背景 + 半透明玻璃 + 主题色 |
| 322 | [tolgaaoki076/argo](https://github.com/tolgaaoki076/argo) | 0 | 2026-10-14 | 2026-10-14 | 专门为 agent 打造的开源 agent 搜索工具，具备 200+的搜索源及多语言搜索能力，覆盖中文/英文/学术/代码/购物/金融/新闻/百科。 |
| 323 | [tomandpotato/dsh-chess-board](https://github.com/tomandpotato/dsh-chess-board) | 0 | 2026-10-15 | 2026-10-15 | 在 DSH（DeepSeek Harness）右侧边栏里下国际象棋：完整规则、八档内置对手、lichess 云端评估 / 复盘 / 战术题，中英双语。· A chess tab for DeepSeek Harness: full rules, built-in opponent, lichess eval, review and puzzles. |
| 324 | [TonyZiYuan/dsh-session-delete](https://github.com/TonyZiYuan/dsh-session-delete) | 0 | 2026-10-13 | 2026-10-14 | 在 DSH Web 界面里删除会话。 |
| 325 | [var-lin/dsh-plugin-layout-organizer](https://github.com/var-lin/dsh-plugin-layout-organizer) | 0 | 2026-10-15 | 2026-10-15 | dsh插件，整理dsh里插件按钮的布局 |
| 326 | [vianvio/dsh-plugin-status-bar](https://github.com/vianvio/dsh-plugin-status-bar) | 0 | 2026-10-14 | 2026-10-14 | DSH 客户端插件：在输入框上方维护一条状态条（比输入卡片略窄、居中、与卡片上沿贴合），向其它客户端插件提供 inputStatusBar  |
| 327 | [VioletEverGarden-zc/dsh-rea-mcp-toggle](https://github.com/VioletEverGarden-zc/dsh-rea-mcp-toggle) | 0 | 2026-10-15 | 2026-10-15 | 在 DeepSeek Harness Web UI 中一键开关 REA MCP 服务器（rea-mcp），并向模型暴露配套的开关工具 rea_mcp_toggle；选择按 profile 持久化，重启后依然生效。 |
| 328 | [Vo9129/dsh-crew](https://github.com/Vo9129/dsh-crew) | 0 | 2026-10-14 | 2026-10-14 | DeepSeek Harness (DSH) plugin: dispatch work to DSH agents from Claude Code / Codex — native subagent progress, in-host worker sessions with per-tier presets, and a multimodal bridge that lends the text-only harness vision and image generation. |
| 329 | [Void-LifeStream/dsh-cuda](https://github.com/Void-LifeStream/dsh-cuda) | 0 | 2026-10-15 | 2026-10-15 | Run Python on the local CUDA GPU from DeepSeek Harness: device status, foreground and detached jobs, durable logs, and a measured peak-VRAM figure per run. |
| 330 | [Void-LifeStream/dsh-gemini-kitten-widget](https://github.com/Void-LifeStream/dsh-gemini-kitten-widget) | 0 | 2026-10-15 | 2026-10-15 | DSH 界面右下角的 Gemini 猫娘额度挂件：显示 Google Gemini API 免费层今日已用/剩余次数（20 次/模型/天，UTC 午夜重置），可按型号切换查看、按额度变色预警、拖拽吸附、点击换台词。 |
| 331 | [Void-LifeStream/dsh-phone](https://github.com/Void-LifeStream/dsh-phone) | 0 | 2026-10-15 | 2026-10-15 | DeepSeek Harness plugin: treat a real Android phone as a device the agent can inspect and tidy up over adb. No root required. |
| 332 | [wangbofan/dsh-restart-button](https://github.com/wangbofan/dsh-restart-button) | 0 | 2026-10-14 | 2026-10-14 | DSH desktop (Windows) titlebar menu: a Restart button that closes and relaunches the whole app - shell + Host. Plugin-only, no app.asar patching. |
| 333 | [WangDouble-Dev/procuremate](https://github.com/WangDouble-Dev/procuremate) | 0 | 2026-10-14 | 2026-10-15 | 开源采购助手插件，为 DeepSeek Harness 提供 Excel 需求导入、询价文本生成、供货商管理、询价进度标记与采购提醒。 |
| 334 | [Wanyi424/dsh-markdown-notes](https://github.com/Wanyi424/dsh-markdown-notes) | 0 | 2026-10-15 | 2026-10-15 | DSH Markdown 笔记插件：本地保存、公式与图表、拖拽导入和目录迁移。 |
| 335 | [wasteoneslife/dsh-skill-creator](https://github.com/wasteoneslife/dsh-skill-creator) | 0 | 2026-10-15 | 2026-10-15 | DeepSeek Harness plugin: create spec-compliant skills from the Web UI (Huawei Cloud / generic / REST API), with a 10-point evaluation loop |
| 336 | [WaterFountain-Jack/dsh-study-note](https://github.com/WaterFountain-Jack/dsh-study-note) | 0 | 2026-10-15 | 2026-10-15 | Opt-in per-conversation Markdown study notes and automatic index management for DeepSeek Harness. |
| 337 | [wct-lab/dsh-docchain](https://github.com/wct-lab/dsh-docchain) | 0 | 2026-10-12 | 2026-10-15 | DeepSeek Harness Plugin of DocChain |
| 338 | [WhatCannotBeSaid/eva-inspired-theme](https://github.com/WhatCannotBeSaid/eva-inspired-theme) | 0 | 2026-10-09 | 2026-10-14 | NERV-gate visual theme for DeepSeek Harness (fan work, non-commercial; see LICENSE) |
| 339 | [Why-147369/dsh-capture](https://github.com/Why-147369/dsh-capture) | 0 | 2026-10-15 | 2026-10-15 | DSH 抓包与流量分析插件（未开发完成 · 测试阶段）· Packet capture &amp; traffic analysis plugin for DeepSeek Harness (WIP / pre-release) |
| 340 | [windf1y/dsh-ocg-used](https://github.com/windf1y/dsh-ocg-used) | 0 | 2026-09-24 | 2026-10-14 | A plugin that displays OCG usage in real time in the DSH input box. |
| 341 | [windrover/dsh-prompt-optimizer](https://github.com/windrover/dsh-prompt-optimizer) | 0 | 2026-10-15 | 2026-10-15 | Prompt optimizer for DeepSeek Harness (dsh): rewrite the conversation input draft in place with 15 templates (basic / context / image). 0.2.0-rc.2 adaptation of zhang-jiazhi/dsh-prompt-optimizer, which ports linshenkx/prompt-optimizer. |
| 342 | [WiseXin/dsh-session-intent-title](https://github.com/WiseXin/dsh-session-intent-title) | 0 | 2026-10-14 | 2026-10-14 | DeepSeek Harness 独立会话意图分类自动命名插件（⚡ 优化 / 🐛 修复 / ✨ 功能） |
| 343 | [wmk66ds/dsh-vision-unlock](https://github.com/wmk66ds/dsh-vision-unlock) | 0 | 2026-10-14 | 2026-10-15 | 去掉 DeepSeek Harness（DSH）「当前模型不支持图片」的拒绝限制：不改 app.asar，用运行时接缝放行未声明多模态能力的模型 |
| 344 | [wobushiyoushen0214/dsh-opencode-pin](https://github.com/wobushiyoushen0214/dsh-opencode-pin) | 0 | 2026-10-14 | 2026-10-14 | Pin an OpenCode Go upstream route in DeepSeek Harness by keeping one stable x-opencode-session key, with an in-GUI route picker and drift checks. |
| 345 | [wumou-sleep/dsh-xiaojingyu-persona](https://github.com/wumou-sleep/dsh-xiaojingyu-persona) | 0 | 2026-10-14 | 2026-10-14 | 傲娇小鲸鱼：给 DeepSeek Harness 加一段可开关的全局人格段落（Tsundere whale-girl persona plugin for DSH） |
| 346 | [wzn16/dsh-skill-market](https://github.com/wzn16/dsh-skill-market) | 0 | 2026-10-14 | 2026-10-14 | DSH 可视化技能商店 — Visual skill market inside DeepSeek Harness: browse, search, install and manage Agent Skills |
| 347 | [wzw4429-crypto/dsh-github-sync](https://github.com/wzw4429-crypto/dsh-github-sync) | 0 | 2026-10-14 | 2026-10-14 | GitHub repository sync plugin for DeepSeek Harness (dsh): bidirectional git sync with pre-push checks, Actions/CI monitoring, repo add/remove/rename, local file browsing. |
| 348 | [xcasee/dsh-plugin-market-intelligence](https://github.com/xcasee/dsh-plugin-market-intelligence) | 0 | 2026-10-14 | 2026-10-14 | A DeepSeek Harness (DSH) market-intelligence expert plugin powered by the CaSee platform — native intelligence tools, an expert persona, a bundled skill and a CaSee dark-dashboard HTML report contract. |
| 349 | [xiamubumu/dsh-aux-degrade](https://github.com/xiamubumu/dsh-aux-degrade) | 0 | 2026-10-14 | 2026-10-14 | DSH 1.5 辅助模型降级：让压缩摘要、会话标题这类旁路调用更省更完整，主循环零影响。仅支持 DSH 1.5，后续会跟进更新。 / Auxiliary-model degradation for DSH 1.5: cheaper, complete side calls (reasoning off, token floor, tools stripped). DSH 1.5 only; newer releases will follow. |
| 350 | [xiamubumu/dsh-capability-composer](https://github.com/xiamubumu/dsh-capability-composer) | 0 | 2026-10-14 | 2026-10-14 | DSH 1.5 能力组合器：按会话或工作区编排工具、技能与 MCP，按需缩小系统提示。仅支持 DSH 1.5，后续会跟进更新。 / Capability composer for DSH 1.5: per-session tool / skill / MCP compositions that shrink the system prompt on demand. DSH 1.5 only; newer releases will follow. |
| 351 | [xiamubumu/dsh-patch-library](https://github.com/xiamubumu/dsh-patch-library) | 0 | 2026-10-14 | 2026-10-14 | 官方 DSH 内核补丁的数据化版本：10 条自包含补丁 + 自适应应用器（自己找安装位置、逐个备份、语法检查、一键回退），五种打法、零硬编码路径。仅支持 DSH 1.5，后续会跟进更新。 / Official DSH core patches as data: ten patches plus an adaptive applier. Five ways to apply. DSH 1.5 only. |
| 352 | [Xiao-wuwu/dsh-deep-search](https://github.com/Xiao-wuwu/dsh-deep-search) | 0 | 2026-10-14 | 2026-10-15 | 多轮迭代深度检索插件（DeepSeek Harness）：14 平台定向 · 来源可信度分级 A/B/C/D · 交叉验证 · 虚假信息检测 \| Multi-round iterative deep-research for DSH |
| 353 | [Xiaoli-Asuna/dsh-theme-endfield-style](https://github.com/Xiaoli-Asuna/dsh-theme-endfield-style) | 0 | 2026-10-14 | 2026-10-14 | Arknights: Endfield-style theme for the DeepSeek Harness web UI (unofficial fan work). |
| 354 | [XiaoSHang05/dsh-rice-guard](https://github.com/XiaoSHang05/dsh-rice-guard) | 0 | 2026-10-13 | 2026-10-14 | A passive watchdog for DeepSeek Harness: watches a turn's thinking and text streams and cancels it when the model starts repeating itself. |
| 355 | [xiaoxianxian/multi-proxy](https://github.com/xiaoxianxian/multi-proxy) | 0 | 2026-06-28 | 2026-10-14 | 多 Agent 编排中枢：把 Codex / Cursor / Hermes / DSH 等 AI 编程代理当员工统一管理——协议转换、成本台账、熔断、任务编排与 Web 面板。不是模型切换器，切的是活。 |
| 356 | [xinspark/dsh-win-pwsh7](https://github.com/xinspark/dsh-win-pwsh7) | 0 | 2026-10-13 | 2026-10-14 | PowerShell 7 for the DSH \`pwsh\` tool on Windows: detect, validate, and install the self-updating Microsoft Store package — one install path, with the connection checked first. |
| 357 | [xinyang20/dsh-campus-seu](https://github.com/xinyang20/dsh-campus-seu) | 0 | 2026-10-15 | 2026-10-15 | 东南大学校园主题插件：校园配色、九龙湖与四牌楼风景、可选叮东，适配 DSH Web。 |
| 358 | [xiray-xia/dsh-remote-vs](https://github.com/xiray-xia/dsh-remote-vs) | 0 | 2026-10-14 | 2026-10-15 | VSCode-style remote SSH development for DSH: host manager, helper deploy pipeline, remote files/terminal/git, transparent remote execution. |
| 359 | [xt765/dsh-milestone-guard](https://github.com/xt765/dsh-milestone-guard) | 0 | 2026-10-15 | 2026-10-15 | Milestone progress soft-enforcement guard plugin for DeepSeek Harness (阶段性结论软强制守卫插件) |
| 360 | [xuan25/dsh-email](https://github.com/xuan25/dsh-email) | 0 | 2026-10-02 | 2026-10-14 |   dsh-email gives a DSH agent working access to a mailbox: the email tool reads and sends the user's mail over standard IMAP/SMTP, so the agent can check and answer it with only a password or app-specific password. |
| 361 | [xuan25/dsh-imagegen](https://github.com/xuan25/dsh-imagegen) | 0 | 2026-10-13 | 2026-10-14 | Image-generation plugin for dsh: one \`imagegen\` tool that renders images through any OpenAI-compatible image backend |
| 362 | [xuan25/dsh-local-policy](https://github.com/xuan25/dsh-local-policy) | 0 | 2026-09-29 | 2026-10-14 | A cordis layer that disables shipped plugins that provide DeepSeek services in the base bundle |
| 363 | [xuan25/dsh-logger-channels](https://github.com/xuan25/dsh-logger-channels) | 0 | 2026-10-11 | 2026-10-14 | dsh-logger-channels gives a DSH profile a visible log sink |
| 364 | [xuan25/dsh-ntfy](https://github.com/xuan25/dsh-ntfy) | 0 | 2026-10-02 | 2026-10-14 | dsh-ntfy gives a DSH agent a push-notification path: a single tool call publishes a message to an ntfy topic, so job results, alerts, and reports reach the user's device - or any app or feed that subscribes to the topic. |
| 365 | [xuan25/dsh-qqbot-send](https://github.com/xuan25/dsh-qqbot-send) | 0 | 2026-09-29 | 2026-10-14 | Adding callable message sending tools for dsh-qqbot |
| 366 | [xuan25/dsh-timer](https://github.com/xuan25/dsh-timer) | 0 | 2026-09-29 | 2026-10-14 | A systemd.timer equivalent for DeepSeek Harness (DSH) |
| 367 | [xuan25/dsh-tts](https://github.com/xuan25/dsh-tts) | 0 | 2026-10-03 | 2026-10-14 | tts tool that turns text into an audio file through any OpenAI-compatible TTS backend. |
| 368 | [xuan25/dsh-webhook-dispatcher](https://github.com/xuan25/dsh-webhook-dispatcher) | 0 | 2026-10-10 | 2026-10-14 | dsh-webhook-dispatcher gives a dsh deployment inbound webhook dispatch: when an HTTP caller reaches one of the plugin's endpoints, a fresh, isolated agent session handles the delivered content.  |
| 369 | [xuan25/my-dsh-plugin-listing](https://github.com/xuan25/my-dsh-plugin-listing) | 0 | 2026-10-11 | 2026-10-14 | 我的 dsh 插件清单 |
| 370 | [xuelin632/dsh-aris-glass](https://github.com/xuelin632/dsh-aris-glass) | 0 | 2026-10-14 | 2026-10-14 | DSH 液态玻璃插件：给助手消息、左侧栏与标题栏菜单加毛玻璃底色（纯客户端样式注入） |
| 371 | [yffo/dsh-engramory-recall](https://github.com/yffo/dsh-engramory-recall) | 0 | 2026-10-14 | 2026-10-14 | Local BM25 auto-recall + fail-closed write guard + static doctor + memory panel for an Engramory markdown store — no network, no daemon, and no model calls unless you opt in. |
| 372 | [ygnstudio/dsh-plugin-session-cost](https://github.com/ygnstudio/dsh-plugin-session-cost) | 0 | 2026-10-15 | 2026-10-15 | DeepSeek Harness 会话费用估算、账号余额与额度监控插件 |
| 373 | [ygnstudio/dsh-plugin-title-oil](https://github.com/ygnstudio/dsh-plugin-title-oil) | 0 | 2026-10-15 | 2026-10-15 | DeepSeek Harness 会话自动命名插件：类别 emoji + 对象｜目标 |
| 374 | [yhfgyyf/dsh-side-chat](https://github.com/yhfgyyf/dsh-side-chat) | 0 | 2026-10-14 | 2026-10-14 | Temporary side conversations for DeepSeek Harness Desktop and Web |
| 375 | [yidao2000/dsh-local-background](https://github.com/yidao2000/dsh-local-background) | 0 | 2026-10-15 | 2026-10-15 | dsh用本地图片做背景图 |
| 376 | [yll86/dsh-theme-aemath](https://github.com/yll86/dsh-theme-aemath) | 0 | 2026-10-14 | 2026-10-14 | AEMEATH Theme - sakura violet-rose theme plugin for the DeepSeek Harness Web GUI |
| 377 | [youchai2016/dsh-plugin-auto-compact](https://github.com/youchai2016/dsh-plugin-auto-compact) | 0 | 2026-10-15 | 2026-10-15 | 上下文占用达到 50% 时自动压缩（DeepSeek Harness 插件）。Auto-compact a DeepSeek Harness session at 50% context usage. |
| 378 | [youchai2016/dsh-plugin-token-bucket](https://github.com/youchai2016/dsh-plugin-token-bucket) | 0 | 2026-10-15 | 2026-10-15 | 余额水桶：水位就是你的 DeepSeek API 余额，出水口流出的是正在花的钱。A bucket that drains while your DeepSeek API balance is being spent (DeepSeek Harness plugin). |
| 379 | [youran0faust/dsh-cache-report](https://github.com/youran0faust/dsh-cache-report) | 0 | 2026-10-15 | 2026-10-15 | See what ate your prompt cache. Hit-rate &amp; tool-block cost report for DSH (DeepSeek Harness) — zero deps, registers no tools. |
| 380 | [yturjzw/dsh-icon-switch](https://github.com/yturjzw/dsh-icon-switch) | 0 | 2026-10-15 | 2026-10-15 | dsh-icon-switch: in-app icon switcher for DeepSeek Harness |
| 381 | [yugapor/dsh-gitview](https://github.com/yugapor/dsh-gitview) | 0 | 2026-10-11 | 2026-10-14 | Git changes, diffs, history and CI in the DeepSeek Harness sidebar. |
| 382 | [YunLiZeMeng/dsh-window-control](https://github.com/YunLiZeMeng/dsh-window-control) | 0 | 2026-10-15 | 2026-10-15 | Window control for DeepSeek Harness: maximize or true fullscreen on launch, minimize, keep the window always on top, and quit with a native confirmation dialog (Esc, double Esc, or Ctrl+Q). |
| 383 | [yusunz/dsh-plugin-noworkspace-session](https://github.com/yusunz/dsh-plugin-noworkspace-session) | 0 | 2026-10-15 | 2026-10-15 | Adds sessions without a workspace to DeepSeek Harness |
| 384 | [yutao8/dsh-custom-style](https://github.com/yutao8/dsh-custom-style) | 0 | 2026-10-15 | 2026-10-15 | 给 DeepSeek Harness 注入你自己的 CSS：在设置界面里新增的「自定义样式」一栏直接编辑样式文件，即可调整弹窗宽度、导航宽度、字号与内容居中；约两秒生效，不改应用本体、无需重启。 ｜ Inject custom CSS into the DeepSeek Harness GUI from a new Custom CSS section in Settings — dialog width, nav width, font size and content centering; applied in about two seconds, no app patching or restart. |
| 385 | [YUYU276/dsh-blue-whale-balance](https://github.com/YUYU276/dsh-blue-whale-balance) | 0 | 2026-10-15 | 2026-10-15 | DSH 插件｜DeepSeek 余额动画桌宠：余额卡片、逐密钥观测账目、历史趋势与低余额提醒 |
| 386 | [yvban/dsh-session-mover](https://github.com/yvban/dsh-session-mover) | 0 | 2026-10-14 | 2026-10-14 | DSH plugin: move sessions between workspaces safely — frame-level zstd header rewrite, byte-level verification, full-directory backup, live membership update |
| 387 | [YYC-JNU/dsh-skill-invocation-monitor](https://github.com/YYC-JNU/dsh-skill-invocation-monitor) | 0 | 2026-10-14 | 2026-10-14 | Read-only skill invocation monitor for DeepSeek Harness — which Agents are running, which Skill each is calling, status and elapsed time, live in the Web GUI sidebar. · 只读技能调用监控：侧边栏实时展示活动 Agent 正在调用的 Skill、状态与耗时。 |
| 388 | [yyh-001/dsh-supermarket](https://github.com/yyh-001/dsh-supermarket) | 0 | 2026-10-15 | 2026-10-15 | 超级市场：面向 AI 的 DSH 多市场插件，统一发现、管理与使用 Skills、MCP、Claude Mods、整合包和 Agent 预设。 |
| 389 | [zazzzzzzz/dsh-usage-stats](https://github.com/zazzzzzzz/dsh-usage-stats) | 0 | 2026-10-14 | 2026-10-14 | DeepSeek Harness (dsh) 左侧栏的模型 Token 用量统计插件：跨会话汇总累计用量、连续使用天数、年度活动热力图、每日分模型趋势与模型占比 |
| 390 | [zeheng723/dsh-medic-pet](https://github.com/zeheng723/dsh-medic-pet) | 0 | 2026-10-15 | 2026-10-15 | DeepSeek Harness 本地用量桌宠：逐轮 token 用量气泡 + 按天养成的 Q 版战地医护，含本机统计、每日任务、勋章、久坐/喝水提醒与四套换装主题。不联网、不读凭据。 |
| 391 | [ZelotsNullzwei/dsh-ofm-updater](https://github.com/ZelotsNullzwei/dsh-ofm-updater) | 0 | 2026-10-14 | 2026-10-14 | 给 DSH Desktop 的 Our Free Model 插件做一键更新：双击即可，处理 PATH / 慢网络 / 完整性校验三个坑。 |
| 392 | [zhang-23x/dsh-deepseek-splash](https://github.com/zhang-23x/dsh-deepseek-splash) | 0 | 2026-10-12 | 2026-10-15 | DeepSeek opening animation for DeepSeek Harness: whale line-draw splash rendered as DSH Desktop launch screen, plus an opt-in full-screen client overlay. |
| 393 | [zhangmaorongXL/dsh-xl-free-model](https://github.com/zhangmaorongXL/dsh-xl-free-model) | 0 | 2026-10-15 | 2026-10-15 | 在 dsh 里装上这个插件即可无需登录、注册或填 API Key，就能使用mimo-v2.6-flash-free 等模型——完全免费，不限量。 |
| 394 | [zhaorui-wu/dsh-skill-cockpit](https://github.com/zhaorui-wu/dsh-skill-cockpit) | 0 | 2026-10-14 | 2026-10-14 | Skill cockpit for DSH: one page in the app-level nav listing every skill this machine exposes, why a skill is invisible, and a one-file toggle. (early / work in progress) |
| 395 | [zhikai0915-netizen/hotspot](https://github.com/zhikai0915-netizen/hotspot) | 0 | 2026-10-15 | 2026-10-15 | DSH GitHub 热榜插件：按日/周/月给模型插件、Skill、MCP 服务等小工具排名，榜单类型可自定义。 |
| 396 | [zhongjiadeng-cmd/dsh-codex-appearance](https://github.com/zhongjiadeng-cmd/dsh-codex-appearance) | 0 | 2026-10-14 | 2026-10-14 | Appearance settings and a blue-gray theme for DeepSeek Harness |
| 397 | [zhujiuyi/dsh-balance-meter](https://github.com/zhujiuyi/dsh-balance-meter) | 0 | 2026-10-14 | 2026-10-14 | DeepSeek Harness plugin: identify the provider behind the current model route and query its API balance or subscription quota. No subprocesses, no exec permissions, official endpoints only. |
| 398 | [ztl0001/dsh-custom-instructions](https://github.com/ztl0001/dsh-custom-instructions) | 0 | 2026-10-15 | 2026-10-15 | One system prompt for every workspace — a Custom instructions page in DSH's Settings panel. · 在 DSH 设置里新增「自定义指令」页，一处写下对所有工作区生效的系统提示词。 |
| 399 | [ztl0001/dsh-notify](https://github.com/ztl0001/dsh-notify) | 0 | 2026-10-15 | 2026-10-15 | Windows notifications when a DSH task finishes |

## 从快照消失的已核准仓库 / Approved repositories missing from the snapshot

已核准但已不在当前快照中（删除或改名），核实后从 [data/approved.json](../approved.json) 移除或更新名称。

Approved but no longer present in the current snapshot (deleted or renamed) — after checking, remove them from [data/approved.json](../approved.json) or update the name.

- 01men/ybkk-AIOS
- A-G-guy/dsh-plus
- alexcarterio/deepseek-whale-pet
- alexcarterio/dsh-mobile-access
- asdukw/dsh-plugin-chat-tools
- Che-Year/dsh-pet-lulu
- chioplet/dsh-live-progress
- dabaicai001/star-dsh-desktop
- edelah/dsh-task-board-model
- equasen/dsh-font
- ForgeaX-Games/forgeax-dsh-game-plugin
- gugu123a/dsh-tool-see-image
- john-walks-slow/dsh-session-state
- Johnnylin2121/dsh-agent-presets
- lengfengng1-ai-architect/dsh-workspace-memories
- Li-0803/dsh-session-search
- lingchunya/dsh-workspace-enhance
- lunaship/dsh-cetus
- naitoupi/dsh-outbound-proxy
- naitoupi/prompt-optimizer-plugin
- nx9161/war-room-protocol
- oliblue-evan/dsh-cli-inventory
- OSSKn4w7/dsh-plugin-manager
- s17179XTY/dsh-BigfishPet
- Sandyzzx/dsh-zcode-bridge
- Sdongmaker/vpshub
- sdoygb/dsh-geometry-knowledge
- ShawnRen57/omni-learning-assistant
- Shiro-Design-16/dsh-preset-mixed
- XDTrees/dsh-workbuddy-xdpool
- XiaoSHang05/dsh-loop-guard
- zmr234234-jpg/dsh-deepseek-splash
