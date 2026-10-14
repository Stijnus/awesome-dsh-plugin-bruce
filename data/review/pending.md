# 待审核仓库 / Pending review

> 新增到 `dsh-plugin` Topic 下、带有简介、尚未经维护者核实的仓库。本文件由 `scripts/update.mjs` 每日刷新，仅供审核使用，不是用户可见页面。
>
> Repositories newly added to the `dsh-plugin` topic that the maintainer has not verified yet. Refreshed daily by `scripts/update.mjs`; review-only, not a user-facing page.

- 生成时间 / Generated: **2026-10-14**
- 快照日期 / Snapshot date: **2026-10-14 (UTC)**
- 待审核 / Pending: **208**
- 从快照消失的已核准仓库 / Approved repositories missing from the snapshot: **14**
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

对比上一份快照 **2026-10-13** / vs previous snapshot **2026-10-13**。规则：日增 ≥100★；已核准仓新入 Top 200（且 Δ≥50）/ 名次跃升 ≥50 / 冲入 Top 20；待审仓 ≥100★ 且核准后将进入 Top 200。

- 看 Star 是否与 fork、提交活跃度、仓库年龄匹配（高星零 fork、创建当天几百星，多为刷星）
- 是否把已有高星的通用项目贴上 `dsh-plugin` Topic 蹭榜——插件本身可进目录，但应加入 `leaderboard_exclusions`，理由写清 stars accrued as …
- 待审仓若核准会直接冲进 Top 20 / Top 200，先确认热度来自 **DSH 插件本身**
- 已核准仓的异常跃升：确认后同样可记入 `leaderboard_exclusions`，不必下架目录

Check stars against forks, commit activity and age (hundreds of stars on day one, or high stars with zero forks, usually look bought). A generic high-star project that only just tagged `dsh-plugin` can stay in the catalog but should go to `leaderboard_exclusions` (reason: stars accrued as …). If approving a pending repo would drop it into Top 20 / Top 200, confirm the audience is the DSH plugin itself.

- 告警数 / Alerts: **7**

| Project | Queue | Stars | Δ | Forks | Age | Signals | 审核提示 / Hint |
| --- | --- | ---: | ---: | ---: | ---: | --- | --- |
| ⚠️ [Ebony-Vinyl/dsh-our-free-model](https://github.com/Ebony-Vinyl/dsh-our-free-model) | 已核准 / approved | 16029 | +2030 | 309 | 19d | 日增百星 | 日增 +2030★；已不进榜单 |
| ⚠️ [T-Auto/dsh-ops](https://github.com/T-Auto/dsh-ops) | 已核准 / approved | 1499 | +648 | 25 | 5d | 日增百星 | 日增 +648★ |
| ⚠️ [dataelement/dsh-desktop](https://github.com/dataelement/dsh-desktop) | 已核准 / approved | 13965 | +293 | 500 | 61d | 日增百星 | 日增 +293★；已不进榜单 |
| ⚠️ [Fei2411/DeepSeek-Bot](https://github.com/Fei2411/DeepSeek-Bot) | 已核准 / approved | 1864 | +205 | 178 | 6d | 日增百星 | 日增 +205★ |
| ⚠️ [dsh-tauri/deepseek-harness-desktop](https://github.com/dsh-tauri/deepseek-harness-desktop) | 已核准 / approved | 3032 | +201 | 185 | 60d | 日增百星 | 日增 +201★；已不进榜单 |
| ⚠️ [dsh-market/dsh-market](https://github.com/dsh-market/dsh-market) | 已核准 / approved | 6524 | +127 | 269 | 60d | 日增百星 | 日增 +127★；已不进榜单 |
| ⚠️ [corrinehu/dsh-workbuddy-connect](https://github.com/corrinehu/dsh-workbuddy-connect) | 已核准 / approved | 868 | +122 | 87 | 57d | 日增百星 | 日增 +122★ |


| # | Project | Stars | Created | First seen | Description |
| ---: | --- | ---: | ---: | ---: | --- |
| 1 | [FeatherHunter/dsh-plugin-update](https://github.com/FeatherHunter/dsh-plugin-update) | 4 | 2026-09-30 | 2026-10-14 | 给 DSH 插件加「检查更新 / 安装更新」能力的 npm 包：宿主一段接线 + 面板一个现成组件，查新版、装更新、失败兜底、更新日志与多插件日志一次包掉 |
| 2 | [molanxuan-del/DSH-VoxPolish](https://github.com/molanxuan-del/DSH-VoxPolish) | 3 | 2026-10-07 | 2026-10-14 | 「声琢」VoxPolish —— 把说出来的话打磨成清晰表达：原话/整理后双通道，先说、先改、再发送，全程不碰输入框。本地 SenseVoice 识别，无需额外下载模型。 |
| 3 | [ytftu/dsh-session-cost](https://github.com/ytftu/dsh-session-cost) | 3 | 2026-10-13 | 2026-10-14 | DSH（DeepSeek Harness）插件：底栏会话消费金额、每条回复本轮金额、右上角开放平台余额/今日用量/峰谷，点击弹出折线图。 |
| 4 | [Cikian/dsh-cture-image](https://github.com/Cikian/dsh-cture-image) | 2 | 2026-10-14 | 2026-10-14 | OpenAI-compatible image generation for DeepSeek Harness — text-to-image, image editing and batch generation, rendered straight in the conversation. |
| 5 | [ShawnRen57/omni-learning-anything](https://github.com/ShawnRen57/omni-learning-anything) | 2 | 2026-10-08 | 2026-10-14 | Omni Learning Anything: portable Agent Skill for personalized learning plans and daily PDF lessons. 通用学习助手。 |
| 6 | [supart/DSH-FHL-Image-Plugin](https://github.com/supart/DSH-FHL-Image-Plugin) | 2 | 2026-08-21 | 2026-10-14 | Independent MIT-licensed DeepSeek Harness plugin for FHL Images generation, editing, worker pools, and chat-configured credentials. |
| 7 | [xiamubumu/dsh-context-reclaim](https://github.com/xiamubumu/dsh-context-reclaim) | 2 | 2026-10-14 | 2026-10-14 | DSH 1.5 上下文治理：折叠工具结果、保持提示词缓存命中、接管宿主可写请求（不再需要 dsh-llm 文件补丁）。仅支持 DSH 1.5，后续会跟进更新。 / Context governance for DSH 1.5: folds tool results, keeps the prompt cache warm, takes over the writable-request path. DSH 1.5 only; newer releases will follow. |
| 8 | [1015677515/dsh-prompt-ErrorNotes-desk](https://github.com/1015677515/dsh-prompt-ErrorNotes-desk) | 1 | 2026-10-14 | 2026-10-14 | deepseek harness 全局提示词/对话提示词，错误记录功能插件 |
| 9 | [133563825as-ai/dsh-asmrone](https://github.com/133563825as-ai/dsh-asmrone) | 1 | 2026-10-14 | 2026-10-14 | DeepSeek Harness 音声库插件：asmr.one / B站 / DLsite 试听 / 本机曲库四源合一 |
| 10 | [AndroidSix/dsh-multi-router](https://github.com/AndroidSix/dsh-multi-router) | 1 | 2026-10-14 | 2026-10-14 | Multi-account WorkBuddy, Trae and Qoder routing for DeepSeek Harness |
| 11 | [AtlacherCoder/dshgodot-workflow](https://github.com/AtlacherCoder/dshgodot-workflow) | 1 | 2026-10-10 | 2026-10-14 | Godot 工程开发工作流的本地 DSH 插件：常驻注入精简核心（不占 AGENTS.md 字节预算），完整版按需加载为 godot-workflow 技能 |
| 12 | [baiye1997/MEB-DSH](https://github.com/baiye1997/MEB-DSH) | 1 | 2026-09-21 | 2026-10-14 | MEB · DeepSeek Harness 工程造价工作台 \| 项目台账、工程计算、DWG 核对与项目助手 |
| 13 | [happyqu/dsh-plugin-git](https://github.com/happyqu/dsh-plugin-git) | 1 | 2026-10-09 | 2026-10-14 | Git workbench for deepseek-harness: changelists, staging, history, branches, stashes and optional AI assistance |
| 14 | [Hongjun1-RGB/dsh-phone-access](https://github.com/Hongjun1-RGB/dsh-phone-access) | 1 | 2026-10-14 | 2026-10-14 | DSH 插件：在界面里拨一个开关，用手机浏览器继续当前会话（内嵌反向代理 + Cloudflare 隧道 + 微信推送） |
| 15 | [JMX-4869/dsh-mood](https://github.com/JMX-4869/dsh-mood) | 1 | 2026-10-13 | 2026-10-14 | 给 DeepSeek Harness 加一层心情。33 种心情（基础 / 复合 / 当代）各自持有数值，每 3~6 小时自己变 —— 它会累、会烦、会好奇。附带每日心情日记、时事、可选的主动开口。MIT 开源。 |
| 16 | [john-walks-slow/dsh-session-prefix](https://github.com/john-walks-slow/dsh-session-prefix) | 1 | 2026-10-13 | 2026-10-14 | Visual session state badges for DeepSeek Harness: prefix a session title with customizable emoji badges (wip 🚧 blocked ⏸️ review 👀 done ✅) — configurable default state for new sessions, session_prefix model tool, /state command, Web settings. session-prefix：用会话标题前缀（默认 Emoji，可自定义）标记项目状态，含新会话默认状态、Agent 工具与 /state 命令。 |
| 17 | [lance808/dsh-image-tool](https://github.com/lance808/dsh-image-tool) | 1 | 2026-10-14 | 2026-10-14 | 给 DeepSeek Harness 补上生图能力：把任意 OpenAI 兼容的生图服务接成平台工具，模型在对话里直接出图。 |
| 18 | [lengfengng-tech/dsh-workspace-memories](https://github.com/lengfengng-tech/dsh-workspace-memories) | 1 | 2026-10-13 | 2026-10-14 | Per-workspace persistent memory plugin for DeepSeek Harness (DSH): sidebar panel, automatic system-prompt injection, and an agent tool to save memories |
| 19 | [linshenyuan/dsh-memory](https://github.com/linshenyuan/dsh-memory) | 1 | 2026-10-13 | 2026-10-14 | DSH 的跨会话长期记忆插件 |
| 20 | [linshufan21/dsh-boot-compass](https://github.com/linshufan21/dsh-boot-compass) | 1 | 2026-10-14 | 2026-10-14 | DSH boot splash: covers the loading card before the first paint, plays a seven-beat compass sequence, then hands off to the app. \| DSH 启动动画：在加载卡出现前接住首帧，播完七段罗盘序列后交接给主界面 |
| 21 | [liushuchang-2012/dsh-skin-liquid-glass](https://github.com/liushuchang-2012/dsh-skin-liquid-glass) | 1 | 2026-10-12 | 2026-10-14 | 一个模仿IOS液态玻璃的DeepSeek Harness插件 |
| 22 | [Mahiru0427/dsh-vesna-theme](https://github.com/Mahiru0427/dsh-vesna-theme) | 1 | 2026-10-07 | 2026-10-14 | 薇斯纳主题：DeepSeek Harness Desktop 插件，含全窗口壁纸、明暗配色与日常表情。 |
| 23 | [MCviseron/dsh-matlab-mcp](https://github.com/MCviseron/dsh-matlab-mcp) | 1 | 2026-10-14 | 2026-10-14 | deepseek harness 与matlab桥接的dsh端插件。含知识库。 |
| 24 | [Melody-cx/dsh-anima](https://github.com/Melody-cx/dsh-anima) | 1 | 2026-10-14 | 2026-10-14 | DSH 助手人格与长期记忆插件：独立可用，不依赖其它插件。管 AI 自身的名字与角色、对用户的称呼、回复风格与自定义指令；人设支持全局 + 按工作区两级覆盖；长期记忆走三段式（候选捕获 → 待审缓冲区 → 用户裁决才生效），并支持一键导入其它 AI 的历史记忆。 |
| 25 | [MengYuanzhuo/dsh-plugin-magi](https://github.com/MengYuanzhuo/dsh-plugin-magi) | 1 | 2026-10-14 | 2026-10-14 | An EVA style MAGI system with three terminals for DSH plugin. |
| 26 | [mikuniemo/dsh-skill-router](https://github.com/mikuniemo/dsh-skill-router) | 1 | 2026-10-14 | 2026-10-14 | Shrink the DeepSeek Harness skill catalog from O(n) to ~600 tokens - router + on-demand category indexes. Zero dependencies, cross-platform. |
| 27 | [panqing0313/dsh-weixin](https://github.com/panqing0313/dsh-weixin) | 1 | 2026-10-14 | 2026-10-14 | 微信（iLink）通道插件：在微信里给 DSH Agent 发消息，在本机跑会话并把回复发回微信。Text, images, files and voice notes. |
| 28 | [qikairo7/dsh-web-search-fetch](https://github.com/qikairo7/dsh-web-search-fetch) | 1 | 2026-10-14 | 2026-10-14 | DSH 多来源搜索与网页正文整理插件：免密钥首次使用、搜索融合、正文去重互补、来源与差异记录，沿用原生 web_search / web_fetch。 |
| 29 | [QIN-SMART/dsh-session-tabs](https://github.com/QIN-SMART/dsh-session-tabs) | 1 | 2026-10-14 | 2026-10-14 | Single-client session tabs preserving native sidebars and background work |
| 30 | [swyc520/dsh-plugin-model-whitelist](https://github.com/swyc520/dsh-plugin-model-whitelist) | 1 | 2026-10-14 | 2026-10-14 | DeepSeek Harness (dsh) 插件：在「设置 → 模型」里逐个勾选要显示的模型，未勾选的从模型选择器菜单中隐藏。 |
| 31 | [syyr1987/dsh-linghun-memory](https://github.com/syyr1987/dsh-linghun-memory) | 1 | 2026-10-10 | 2026-10-14 | 灵魂认知系统的记忆侧：记忆提取与组装（DeepSeek Harness 插件，开发中）。Memory side of the Linghun cognition system for DeepSeek Harness. |
| 32 | [theskywilldawn/dsh-LittleStar-meeting](https://github.com/theskywilldawn/dsh-LittleStar-meeting) | 1 | 2026-10-14 | 2026-10-14 | 星辰会议室：让分散在不同会话里的 AI 坐进同一间房开会 —— 主持人开房定题，按序邀请成员逐一发言，轮次用满即收会出纪要。  LittleStar Meeting Room: bring AI sessions that cannot see each other into one room — one host sets the topic, members speak in turn, and the meeting ends with written minutes. |
| 33 | [xiamubumu/dsh-composer-launcher](https://github.com/xiamubumu/dsh-composer-launcher) | 1 | 2026-10-14 | 2026-10-14 | DSH 1.5 启动器：一个面板统管能力组合、插件清单、MCP 桥与浏览器标签页扩展。仅支持 DSH 1.5，后续会跟进更新。 / Launcher for DSH 1.5: one panel for the composer, the plugin inventory, the MCP bridge and the tab-bridge extension. DSH 1.5 only; newer releases will follow. |
| 34 | [yeee-eh/dsh-unreal-engine](https://github.com/yeee-eh/dsh-unreal-engine) | 1 | 2026-10-14 | 2026-10-14 | 把 Unreal Engine 5.8 内置 MCP 接入 DeepSeek Harness —— 在设置里一键探测端点，让 AI 直接驱动 UE 编辑器 |
| 35 | [YUsaltyfish/dsh-bongo-fish](https://github.com/YUsaltyfish/dsh-bongo-fish) | 1 | 2026-10-14 | 2026-10-14 | A BangoCat-style typing feedback widget that auto-snaps to the DSH composer, with customizable art and sound./一个BangoCat风格输入反馈小挂件，可以自动吸附在dsh输入框及窗口边缘，支持自定义形象和音效 |
| 36 | [2048lr/dsh-feishu](https://github.com/2048lr/dsh-feishu) | 0 | 2026-10-14 | 2026-10-14 | Deep Feishu / Lark integration for DeepSeek Harness: Bitable (multidimensional tables), docs, sheets, wiki, drive, messages, plus a visual settings page. |
| 37 | [384124694/dsh-host-paths](https://github.com/384124694/dsh-host-paths) | 0 | 2026-10-14 | 2026-10-14 | DeepSeek Harness Desktop: dropped files and folders become @path references instead of uploads, by wiring the shell file-path bridge into the composer host-path seam. |
| 38 | [5V1A-afk/dsh-sticker-pack](https://github.com/5V1A-afk/dsh-sticker-pack) | 0 | 2026-10-14 | 2026-10-14 | 给你的大肥鱼回话加上表情包 |
| 39 | [6mt/dsh-control](https://github.com/6mt/dsh-control) | 0 | 2026-10-14 | 2026-10-14 | 本地一个窗口，驱动你所有机器上的 dsh · Drive the dsh instances on your other machines from one local window |
| 40 | [abogitoff/fuxux-claude-plugin](https://github.com/abogitoff/fuxux-claude-plugin) | 0 | 2026-10-04 | 2026-10-14 | Fuxux plugin for Claude. Draft, schedule and publish social media posts to 12 platforms. |
| 41 | [ADkun/dsh-anysearch-fallback](https://github.com/ADkun/dsh-anysearch-fallback) | 0 | 2026-10-14 | 2026-10-14 | DSH web_fetch fallback: when AnySearch extraction fails with HTTP 422, the page is fetched directly with a browser-like user agent. Zero-dependency DSH plugin. |
| 42 | [AIR-pixel/air-pixel-liquid-glass](https://github.com/AIR-pixel/air-pixel-liquid-glass) | 0 | 2026-10-11 | 2026-10-14 | A configurable Liquid Glass theme for DeepSeek Harness with translucent surfaces, wallpaper, desktop transparency, window blur, custom cursors, click ripples, and per-side conversation contrast controls. |
| 43 | [AirPineApplea/feiyu-memory](https://github.com/AirPineApplea/feiyu-memory) | 0 | 2026-10-12 | 2026-10-14 | Cross-session persona and diary for DeepSeek Harness: it remembers what happened between you, then forgets what stopped mattering. |
| 44 | [alfredhuang211/dsh-codex-session](https://github.com/alfredhuang211/dsh-codex-session) | 0 | 2026-10-08 | 2026-10-14 | DSH desktop plugin: choose a DSH-default or Codex session at new-session time. Codex sessions keep the DSH agent loop, tools, approval and UI, served by the locally authenticated Codex App Server. |
| 45 | [alfredhuang211/dsh-ssh-hosts](https://github.com/alfredhuang211/dsh-ssh-hosts) | 0 | 2026-10-12 | 2026-10-14 | DeepSeek Harness 插件：把多台 SSH 服务器存成主机清单，agent 在会话里按主机名引用（命令执行 + 远端文件读写）；设置界面管理，支持密钥/密码登录，会话窗口「+」菜单可选主机。 |
| 46 | [alfredhuang211/dsh-webdav-sync](https://github.com/alfredhuang211/dsh-webdav-sync) | 0 | 2026-10-08 | 2026-10-14 | DeepSeek Harness 插件：把会话日志与插件环境备份到任意 WebDAV 服务，并可从 WebDAV 恢复（会话+环境双源同步、rev/generation 版本机制、三方比较与冲突策略） |
| 47 | [Arlenman/dsh-backup-sync](https://github.com/Arlenman/dsh-backup-sync) | 0 | 2026-10-14 | 2026-10-14 | DSH 备份 / 换机同步插件：把技能、插件、配置、记忆、待办打成一个包，换机时按模块做带基线的三方合并导入 |
| 48 | [Astepluver/dsh-sci-viz](https://github.com/Astepluver/dsh-sci-viz) | 0 | 2026-10-14 | 2026-10-14 | DSH 科研可视化工作台：蛋白质三维结构 + 统计图表 + 基因组学绘图，直接画在对话旁边。 |
| 49 | [awol2005ex3/dsh-hdfs](https://github.com/awol2005ex3/dsh-hdfs) | 0 | 2026-10-14 | 2026-10-14 | DeepSeek Harness (dsh) 插件：**在 dsh 里浏览与操作 HDFS**。Rust (napi-rs + hdfs-native) 直连集群，支持 HA 多 Namenode 与 Kerberos，带 Web 浏览面板与 agent 工具。 |
| 50 | [Bainianzzz/dsh-fork-worktree](https://github.com/Bainianzzz/dsh-fork-worktree) | 0 | 2026-10-14 | 2026-10-14 | DeepSeek Harness plugin: fork a workspace row into a git worktree, or delete the workspace folder |
| 51 | [Boenxia/dsh-plugin-notebook-tools](https://github.com/Boenxia/dsh-plugin-notebook-tools) | 0 | 2026-10-14 | 2026-10-14 | Cell-aware Jupyter notebook tools for DSH agents |
| 52 | [Butt91/flameox](https://github.com/Butt91/flameox) | 0 | 2026-10-14 | 2026-10-14 | Runtime evidence that helps agents trace, profile, and burn down hotspots in application and native code, GPU kernels, and inference stacks. |
| 53 | [caparisen/dsh-font](https://github.com/caparisen/dsh-font) | 0 | 2026-09-15 | 2026-10-14 | DeepSeek Harness plugin: customize the Web GUI fonts (interface font, code font, and font sizes) from Settings |
| 54 | [ccr-wer/dsh-devlog-auto](https://github.com/ccr-wer/dsh-devlog-auto) | 0 | 2026-10-14 | 2026-10-14 | 给 DSH 用的开发日志插件。自动记录"为什么"和"踩了什么坑"。 |
| 55 | [chenyuan1251/dsh-pet-niumali](https://github.com/chenyuan1251/dsh-pet-niumali) | 0 | 2026-10-14 | 2026-10-14 | A desk pet that floats over the DSH interface and opens into a daily check-in, focus timer and habit journal. |
| 56 | [chilianxiao/dsh-qoder-connect](https://github.com/chilianxiao/dsh-qoder-connect) | 0 | 2026-10-13 | 2026-10-14 | 将本机 qoderclicn CLI 的登录态包装成 OpenAI 兼容 Provider 接入 DeepSeek Harness — bring your local Qoder CLI login into DeepSeek Harness as a model provider. |
| 57 | [divineeagleblackhand/dsh-cost-receipt](https://github.com/divineeagleblackhand/dsh-cost-receipt) | 0 | 2026-10-12 | 2026-10-14 | 在 DeepSeek Harness 的每条回复下面加一行：本次问答花了多少钱 + 账户余额（充值/礼金分开列，没有礼金就只显示充值余额）。鼠标悬停时显示饼图。按该轮 token 用量乘官方峰谷单价计算，内置节假日表；算不出价就写明原因，不静默出错。插件自身不联网（余额由 dsh 宿主查询）、不落盘、无依赖。 |
| 58 | [djornii/dsh-grok-stars](https://github.com/djornii/dsh-grok-stars) | 0 | 2026-10-14 | 2026-10-14 | Adds starfield to the new-chat background, like in grok.com |
| 59 | [Domaki-co/dsh-message-forward](https://github.com/Domaki-co/dsh-message-forward) | 0 | 2026-10-13 | 2026-10-14 | DeepSeek Harness (DSH) 插件 ，会话消息转发； DSH plugin, session message forwarding |
| 60 | [Elefseus/dsh-pet-progress](https://github.com/Elefseus/dsh-pet-progress) | 0 | 2026-10-14 | 2026-10-14 | Progress companion for the dsh web pet: folds durable todo/write and goal/change session events into the pet's status bubble, so it reports how much work is left - not just what the model is doing right now. |
| 61 | [EnhydraLutristus/dsh-math-tex](https://github.com/EnhydraLutristus/dsh-math-tex) | 0 | 2026-10-14 | 2026-10-14 | DSH plugin: keeps streamed answers free of red (broken) KaTeX regions — validates every maths region with the client's own renderer before it is written |
| 62 | [Erick0412-dev/dsh-restart](https://github.com/Erick0412-dev/dsh-restart) | 0 | 2026-09-26 | 2026-10-14 | DSH 重启插件：可配置的重启方式（Node 原生 / 旧 PowerShell 适配）与重启后自动继续提示。 |
| 63 | [feely0208/dsh-agent-scope](https://github.com/feely0208/dsh-agent-scope) | 0 | 2026-10-14 | 2026-10-14 | Agent 权限边界：查 agent 的工具/文件/网络权限有没有声明、是不是过宽。 |
| 64 | [feely0208/dsh-algorithm-filing](https://github.com/feely0208/dsh-algorithm-filing) | 0 | 2026-10-14 | 2026-10-14 | 算法备案与告知：查算法推荐服务有没有关闭选项、告知、备案。 |
| 65 | [feely0208/dsh-cn-data-export](https://github.com/feely0208/dsh-cn-data-export) | 0 | 2026-10-14 | 2026-10-14 | 数据出境检查：查代码与配置里的境外数据出口、个人信息外发、缺安全评估说明。 |
| 66 | [feely0208/dsh-cn-filing](https://github.com/feely0208/dsh-cn-filing) | 0 | 2026-10-14 | 2026-10-14 | 备案公示检查：查应用里有没有 ICP/APP 备案号、隐私政策入口、运营者信息。 |
| 67 | [feely0208/dsh-data-classify](https://github.com/feely0208/dsh-data-classify) | 0 | 2026-10-14 | 2026-10-14 | 数据分类分级：查数据有没有分级标注与资产清单（数据安全法 21 条）。 |
| 68 | [feely0208/dsh-data-rights](https://github.com/feely0208/dsh-data-rights) | 0 | 2026-10-14 | 2026-10-14 | 个人信息权利：查查阅/复制/删除权有没有真的实现（个保法 45/47/50 条）。 |
| 69 | [feely0208/dsh-incident-package](https://github.com/feely0208/dsh-incident-package) | 0 | 2026-10-14 | 2026-10-14 | 应急证据包：查出了事能不能拿出证据（预案/联系人/日志保全/上报流程）。 |
| 70 | [feely0208/dsh-minor-guard](https://github.com/feely0208/dsh-minor-guard) | 0 | 2026-10-14 | 2026-10-14 | 未成年人保护：查不满 14 周岁个人信息有没有监护人同意、专门规则、年龄门槛。 |
| 71 | [feely0208/dsh-pipia](https://github.com/feely0208/dsh-pipia) | 0 | 2026-10-14 | 2026-10-14 | 个人信息保护影响评估：查是否按个保法 55 条做了评估、56 条留存三年。 |
| 72 | [fegnze/dsh-balance-bar](https://github.com/fegnze/dsh-balance-bar) | 0 | 2026-10-14 | 2026-10-14 | DSH 侧栏余额栏：自动显示官方账号余额，点击在 DSH 内查询用量 |
| 73 | [fegnze/dsh-plugin-scout](https://github.com/fegnze/dsh-plugin-scout) | 0 | 2026-10-14 | 2026-10-14 | Discover and verify DeepSeek Harness (DSH) plugins from GitHub topic:dsh-plugin — trust score, official peer compatibility, one-click install via the official installer |
| 74 | [fegnze/dsh-sub2api-monitor](https://github.com/fegnze/dsh-sub2api-monitor) | 0 | 2026-10-14 | 2026-10-14 | DeepSeek Harness plugin for Sub2api account quotas and usage monitoring |
| 75 | [fegnze/myspace-dsh-browser-computer](https://github.com/fegnze/myspace-dsh-browser-computer) | 0 | 2026-10-14 | 2026-10-14 | 让 DeepSeek Harness 直接操作浏览器与电脑：以插件形式装配 playwright-mcp 与 peekaboo-mcp，附一键依赖安装、macOS 系统权限引导与 MCP 连接自检。 |
| 76 | [FYZB2020/dsh-voice-doubao](https://github.com/FYZB2020/dsh-voice-doubao) | 0 | 2026-10-14 | 2026-10-14 | Cloud speech recognizers for the DeepSeek Harness voice-input picker (Volcengine Doubao), with an optional LLM tidy-up pass. · 给 DeepSeek Harness 的语音输入加豆包云端识别，可选再用大模型把口语顺成通顺的书面句子。 |
| 77 | [garyzakharov/opencode2dsh](https://github.com/garyzakharov/opencode2dsh) | 0 | 2026-10-14 | 2026-10-14 | DSH plugin — free OpenCode Zen models for DeepSeek Harness (DSH). Free LLM API, no API key needed. 在 DSH 中使用 OpenCode Zen 免费模型，无需 API key |
| 78 | [gfklqcuupe/engramory](https://github.com/gfklqcuupe/engramory) | 0 | 2026-10-14 | 2026-10-14 | A portable memory protocol for AI agents — load it as standing rules; a curation discipline + reference spec + optional cap hook. |
| 79 | [Girmmy3321/dsh-approval-enter](https://github.com/Girmmy3321/dsh-approval-enter) | 0 | 2026-10-14 | 2026-10-14 | Focus the DeepSeek Harness approval panel automatically, so Enter approves and Esc rejects without reaching for the mouse. |
| 80 | [GiuliaRoberts61/rapid-mlx-dsh-provider](https://github.com/GiuliaRoberts61/rapid-mlx-dsh-provider) | 0 | 2026-10-14 | 2026-10-14 | Native Rapid-MLX provider for DeepSeek Harness (dsh) — dsh reads model facts from the server instead of your settings.yaml. |
| 81 | [greatyao/dsh-connect-cursor](https://github.com/greatyao/dsh-connect-cursor) | 0 | 2026-10-14 | 2026-10-14 | 把本机已登录的 Cursor 模型接入 DeepSeek Harness：原生 LlmAdapter 直连 agent.v1.AgentService/Run 双向流 |
| 82 | [GrowingPPP/dsh-inquiry-preset](https://github.com/GrowingPPP/dsh-inquiry-preset) | 0 | 2026-10-14 | 2026-10-14 | 探究模式：把一个概念变成学习者亲手操作的交互式学习任务（DSH agent preset） |
| 83 | [GuaPiaaaaa/DSHplugin](https://github.com/GuaPiaaaaa/DSHplugin) | 0 | 2026-10-14 | 2026-10-14 | 自制DSH插件 |
| 84 | [guyusky/dsh-export-plugin](https://github.com/guyusky/dsh-export-plugin) | 0 | 2026-10-14 | 2026-10-14 | DeepSeek Harness 会话导出插件：在 dsh Web 会话「更多」菜单注入「导出 Markdown / 导出 PDF」，纯前端注入、零 npm 依赖。Export DSH sessions to Markdown or PDF from the web GUI. |
| 85 | [hackmagic/dsh-unreal-agentlink](https://github.com/hackmagic/dsh-unreal-agentlink) | 0 | 2026-10-14 | 2026-10-14 | DSH 插件，桥接 UnrealAgentLink (UEBox)，DSH生态专属优化。 |
| 86 | [he0119/dsh-aperture](https://github.com/he0119/dsh-aperture) | 0 | 2026-09-22 | 2026-10-14 | 自动发现 Aperture 网关上的模型，并加进 DSH 的模型选择器。 |
| 87 | [he0119/dsh-session-manager](https://github.com/he0119/dsh-session-manager) | 0 | 2026-09-27 | 2026-10-14 | 把 DSH 的会话库管起来：迁移工作区与会话到新目录，导出 / 导入 .dshsess 会话包，用 WebDAV 在多台机器之间同步。 |
| 88 | [hg1048596-pixel/dsh-price-indicator](https://github.com/hg1048596-pixel/dsh-price-indicator) | 0 | 2026-10-03 | 2026-10-14 | DeepSeek Harness (dsh) plugin: show the current DeepSeek price tide (peak 梁文峰 / off-peak 梁文谷) and a countdown to the next price switch. Weekdays peak 09:00-12:00 &amp; 14:00-18:00; weekends and Chinese statutory holidays are off-peak all day. |
| 89 | [Hielo19/dsh-think-chinese](https://github.com/Hielo19/dsh-think-chinese) | 0 | 2026-10-14 | 2026-10-14 | DSH plugin: force the model thinking chain (reasoning) to always be written in Chinese |
| 90 | [Hope-Phenom/dsh-plugin-remote-use](https://github.com/Hope-Phenom/dsh-plugin-remote-use) | 0 | 2026-10-14 | 2026-10-14 | 把 DSH 里需要真实桌面的任务（GUI 自动化测试、只有看屏幕才能验证的结果）委托给局域网里已配对的工作节点执行，像调用子 Agent 一样驱动它 —— 自动化不再和操作者抢鼠标、键盘和焦点。任务以指令经 ACP over WebSocket 下发，由工作节点本地的 DSH 执行；提权一律进人工审批，沙箱无法被证明时拒绝启用，凭据不回传浏览器。 / Offload desktop-bound DSH tasks to a paired LAN worker over ACP, driven like a subagent. |
| 91 | [huihuangdi/dsh-model-provider-badge](https://github.com/huihuangdi/dsh-model-provider-badge) | 0 | 2026-10-14 | 2026-10-14 | Shows the provider behind a session's current model as a compact badge in the DSH Web composer tool row. |
| 92 | [hxql666/dsh-presentation](https://github.com/hxql666/dsh-presentation) | 0 | 2026-10-14 | 2026-10-14 | Presentation-document mode for DeepSeek Harness: structured page data to PDF via Typst + Touying, with a visual self-review loop. |
| 93 | [hydra-db/hydradb-deepseek-plugin](https://github.com/hydra-db/hydradb-deepseek-plugin) | 0 | 2026-10-14 | 2026-10-14 | Persistent long-term memory for the DeepSeek Harness (dsh), powered by HydraDB. |
| 94 | [iJetLi/dsh-providers-hub](https://github.com/iJetLi/dsh-providers-hub) | 0 | 2026-10-14 | 2026-10-14 | deepseek-harness plugin: sign in and manage accounts across multiple AI coding providers, with multi-account pools and silent credential refresh |
| 95 | [imason85/dsh-normify](https://github.com/imason85/dsh-normify) | 0 | 2026-10-14 | 2026-10-14 | Normify · DSH 插件：把项目架构写成归一化的分形模块树，三层校验（写时 / 校验 / 冻结回执）、30 个 normify_* 工具 + normify-gen 技能，一键渲染单文件交互式架构图；支持伴随式开发（change_open → brief → check → 实施 → refresh → change_close）。 |
| 96 | [imtokenxinluo/dsh-publish-guard](https://github.com/imtokenxinluo/dsh-publish-guard) | 0 | 2026-10-14 | 2026-10-14 | DeepSeek Harness plugin publish armor: pre-publish leak scan + entry-safe obfuscation |
| 97 | [imtwa/dsh-recall](https://github.com/imtwa/dsh-recall) | 0 | 2026-10-14 | 2026-10-14 | DeepSeek Harness 跨会话记忆（按需）：列出并加载之前会话干了什么，不自动污染上下文。Cross-session memory for DSH, loaded on demand. |
| 98 | [isabellasahu/dsh-permission-rules](https://github.com/isabellasahu/dsh-permission-rules) | 0 | 2026-10-14 | 2026-10-14 | Claude Code-style declarative permission rules for DeepSeek Harness: ordered allow/deny/ask rules with tool-name, argument (glob/regex), and workspace-path matching on the tools/pre-execute waterfall, session-log audit, and HMR reload. |
| 99 | [Ivanj61/seektty](https://github.com/Ivanj61/seektty) | 0 | 2026-10-14 | 2026-10-14 | 面向 DeepSeek Harness 的 Claude Code 风格终端界面，支持 Windows、macOS 与 Linux，兼容透明终端、VS Code 主题和自定义配色。 |
| 100 | [jabingu/dsh-reply-suggestions](https://github.com/jabingu/dsh-reply-suggestions) | 0 | 2026-10-14 | 2026-10-14 | Contextual reply suggestions for DeepSeek Harness. Press Enter to fill an editable draft. |
| 101 | [jdz321/dsh-plugin-relay](https://github.com/jdz321/dsh-plugin-relay) | 0 | 2026-09-27 | 2026-10-14 | DeepSeek Harness (dsh) plugin that routes model traffic through any new-api-family relay panel (one-api / new-api / Veloera / done-hub / ...) |
| 102 | [jiaruihuang/dsh-pi-ai-sync](https://github.com/jiaruihuang/dsh-pi-ai-sync) | 0 | 2026-10-14 | 2026-10-14 | dsh plugin that syncs pi.dev model listings into the pi-ai catalog and llm-pi-ai settings — new provider models become selectable without hand-editing node_modules. |
| 103 | [jidekaixin2dian/dsh-team-flow](https://github.com/jidekaixin2dian/dsh-team-flow) | 0 | 2026-10-14 | 2026-10-14 | Plugin-only Steer Wake for DeepSeek Harness Agent Teams. End one wait while teammates keep running. |
| 104 | [jWright6359/flameox](https://github.com/jWright6359/flameox) | 0 | 2026-10-14 | 2026-10-14 | Runtime evidence that helps agents trace, profile, and burn down hotspots in application and native code, GPU kernels, and inference stacks. |
| 105 | [Kanokwan89/jevcore](https://github.com/Kanokwan89/jevcore) | 0 | 2026-10-14 | 2026-10-14 | TypeSafe Jev for DeepSeek Harness, the Model Context Protocol, and plain Node: typed judgments instead of prose, offline by default. |
| 106 | [kaya734/jevcore](https://github.com/kaya734/jevcore) | 0 | 2026-10-14 | 2026-10-14 | TypeSafe Jev for DeepSeek Harness, the Model Context Protocol, and plain Node: typed judgments instead of prose, offline by default. |
| 107 | [kimo-si/dsh-skin-live](https://github.com/kimo-si/dsh-skin-live) | 0 | 2026-10-14 | 2026-10-14 | DSH Web 全局皮肤插件：图片/视频背景铺满界面，面板半透明可调 \| Global image/video background skin for DSH Web |
| 108 | [KKUCODES/dshm-plugin](https://github.com/KKUCODES/dshm-plugin) | 0 | 2026-10-13 | 2026-10-14 | Desktop plugin for DeepSeek Harness that connects DSHM to computer sessions, with device pairing, access control, and synchronized chat. |
| 109 | [Klop233/dsh-claude-code-theme](https://github.com/Klop233/dsh-claude-code-theme) | 0 | 2026-10-14 | 2026-10-14 | Claude Code visual theme for the DeepSeek Harness Web GUI ??warm paper palette, terracotta accent, Claude Code transcript markers and mono-forward typography. |
| 110 | [Knight-Zjy/dsh-workspace-categories](https://github.com/Knight-Zjy/dsh-workspace-categories) | 0 | 2026-10-14 | 2026-10-14 | DeepSeek Harness 侧边栏的工作区分类树：分类 &gt; 工作区 &gt; 会话（VS Code 风格）。Collapsible category tree for DSH workspaces. |
| 111 | [Lanzuelo/dsh-codex-bridge](https://github.com/Lanzuelo/dsh-codex-bridge) | 0 | 2026-10-14 | 2026-10-14 | Codex architect and read-only reviewer for DeepSeek Harness Desktop. ChatGPT sign-in, model selection, explicit file approval and checkpoints. Preview. |
| 112 | [Leo-sail/dsh-plugin-agent-collaboration](https://github.com/Leo-sail/dsh-plugin-agent-collaboration) | 0 | 2026-10-14 | 2026-10-14 | Persistent Bots, group rooms and a durable run ledger for DeepSeek Harness (DSH) — an installable DSH plugin. |
| 113 | [LeonieKarabacak542/jevcore](https://github.com/LeonieKarabacak542/jevcore) | 0 | 2026-10-14 | 2026-10-14 | TypeSafe Jev for DeepSeek Harness, the Model Context Protocol, and plain Node: typed judgments instead of prose, offline by default. |
| 114 | [Linear1024/dsh-bupt-ucloud](https://github.com/Linear1024/dsh-bupt-ucloud) | 0 | 2026-10-14 | 2026-10-14 | 北邮云平台接口的dsh插件 |
| 115 | [LionNatsu/dsh-vision-reasoner](https://github.com/LionNatsu/dsh-vision-reasoner) | 0 | 2026-10-14 | 2026-10-14 | Mark things on a picture and look at the picture: a DeepSeek Harness plugin that turns an image into a record of numbered marks, with coordinate-labelled close-ups and comparison sheets you can check. |
| 116 | [lishuo4096/artifact-center](https://github.com/lishuo4096/artifact-center) | 0 | 2026-10-14 | 2026-10-14 | Cross-session artifact center for DeepSeek Harness: agent tools register deliverable files (PDF/Excel/PPT/code/JSON) into one shared folder, plus a sidebar panel that filters them by category, extension or keyword. |
| 117 | [liu19666/dsh-model-block-picker](https://github.com/liu19666/dsh-model-block-picker) | 0 | 2026-10-13 | 2026-10-14 | DeepSeek Harness 插件：把输入框模型选择器改成按来源渠道分块 + 下钻选模型，保留搜索与推理强度 |
| 118 | [liufangrui1105/dsh-plugin-github](https://github.com/liufangrui1105/dsh-plugin-github) | 0 | 2026-10-14 | 2026-10-14 | For DSH to connect to GitHub  |
| 119 | [liujianqiao701/dsh-test-framework](https://github.com/liujianqiao701/dsh-test-framework) | 0 | 2026-10-14 | 2026-10-14 | 面向测试工程师的 DSH 插件：把空文件夹一键变成「测试工作框架」骨架，并在 AI 会话里带上框架约束 —— 需求文档拆模块 / 确认版本 / 跨文档关联 / 登记测试环境与账密。AI test-framework plugin for DeepSeek Harness. |
| 120 | [lo2589/knowledge_database](https://github.com/lo2589/knowledge_database) | 0 | 2026-10-08 | 2026-10-14 | Click any sentence in an AI chat to turn it into a card, then hang the cards into your own knowledge tree. DeepSeek Harness (dsh) plugin + standalone web app. 从对话里把有用的句子挑出来，挂成自己的知识树。 |
| 121 | [lSzymanski73/flameox](https://github.com/lSzymanski73/flameox) | 0 | 2026-10-14 | 2026-10-14 | Runtime evidence that helps agents trace, profile, and burn down hotspots in application and native code, GPU kernels, and inference stacks. |
| 122 | [LucaHoward64253/flameox](https://github.com/LucaHoward64253/flameox) | 0 | 2026-10-14 | 2026-10-14 | Runtime evidence that helps agents trace, profile, and burn down hotspots in application and native code, GPU kernels, and inference stacks. |
| 123 | [LUgABeEEE/dsh-global-todo](https://github.com/LUgABeEEE/dsh-global-todo) | 0 | 2026-10-14 | 2026-10-14 | Global todo list plugin for DeepSeek Harness — one JSON list a person and an agent both write to |
| 124 | [lwwwj/dsh-whale-widget-naiwa-role](https://github.com/lwwwj/dsh-whale-widget-naiwa-role) | 0 | 2026-10-14 | 2026-10-14 | dsh-whale-widget插件中增加一个新角色奶蛙 |
| 125 | [majahoffmann125/dsh-normify](https://github.com/majahoffmann125/dsh-normify) | 0 | 2026-10-14 | 2026-10-14 | Normify · DSH 插件：把项目架构写成归一化的分形模块树，三层校验（写时 / 校验 / 冻结回执）、30 个 normify_* 工具 + normify-gen 技能，一键渲染单文件交互式架构图；支持伴随式开发（change_open → brief → check → 实施 → refresh → change_close）。 |
| 126 | [Marilynm09184/dsh-permission-rules](https://github.com/Marilynm09184/dsh-permission-rules) | 0 | 2026-10-14 | 2026-10-14 | Claude Code-style declarative permission rules for DeepSeek Harness: ordered allow/deny/ask rules with tool-name, argument (glob/regex), and workspace-path matching on the tools/pre-execute waterfall, session-log audit, and HMR reload. |
| 127 | [miaomiao-r1/dsh-agent-model-router](https://github.com/miaomiao-r1/dsh-agent-model-router) | 0 | 2026-10-14 | 2026-10-14 | DeepSeek Harness role-based model routing and staged agent workflows, with dsh-our-free-model. |
| 128 | [mnowak517/flameox](https://github.com/mnowak517/flameox) | 0 | 2026-10-14 | 2026-10-14 | Runtime evidence that helps agents trace, profile, and burn down hotspots in application and native code, GPU kernels, and inference stacks. |
| 129 | [monika31250/dsh-noema](https://github.com/monika31250/dsh-noema) | 0 | 2026-10-14 | 2026-10-14 | Noema long-term memory plugin for DSH: durable, inspectable agent memory with recall tools and a settings page. |
| 130 | [moyuqing-man/dsh-plugin-community](https://github.com/moyuqing-man/dsh-plugin-community) | 0 | 2026-10-13 | 2026-10-14 | DSH 插件社区的讨论与反馈入口：插件展示 / 求助 / 想法与需求 / 已知问题。本仓库不含任何可执行代码（见 SECURITY.md）。 / Discussion and feedback hub for the DSH plugin community. Contains no executable code. |
| 131 | [moyuqing-man/dsh-plugin-community-source](https://github.com/moyuqing-man/dsh-plugin-community-source) | 0 | 2026-10-13 | 2026-10-14 | DSH 插件社区：把 GitHub Discussions 变成插件讨论区、Issues 变成 bug 汇报入口、Stars 变成评分，插件详情页里就能看到社区在说什么。纯 JS、零原生依赖。 / A community layer for DSH plugins — discussions, bug inbox and ratings, right inside the plugin detail page. |
| 132 | [nanshang328/dsh-desk-card](https://github.com/nanshang328/dsh-desk-card) | 0 | 2026-10-14 | 2026-10-14 | Bottom-right native Windows cards for DeepSeek Harness: approve a permission request, know a question is waiting, and get a summary when a turn finishes. |
| 133 | [Nao18242/dsh-crew](https://github.com/Nao18242/dsh-crew) | 0 | 2026-10-14 | 2026-10-14 | DeepSeek Harness (DSH) plugin: dispatch work to DSH agents from Claude Code / Codex — native subagent progress, in-host worker sessions with per-tier presets, and a multimodal bridge that lends the text-only harness vision and image generation. |
| 134 | [Nigheart/dsh-mcp-bridge](https://github.com/Nigheart/dsh-mcp-bridge) | 0 | 2026-10-14 | 2026-10-14 | Expose a running DeepSeek Harness instance over MCP, so an external agent can list, delegate to, and answer questions in that instance's own sessions. |
| 135 | [npopov865/dsh-permission-rules](https://github.com/npopov865/dsh-permission-rules) | 0 | 2026-10-14 | 2026-10-14 | Claude Code-style declarative permission rules for DeepSeek Harness: ordered allow/deny/ask rules with tool-name, argument (glob/regex), and workspace-path matching on the tools/pre-execute waterfall, session-log audit, and HMR reload. |
| 136 | [Oliveryfaso/dsh-babel](https://github.com/Oliveryfaso/dsh-babel) | 0 | 2026-10-14 | 2026-10-14 | 让 DeepSeek Harness 直接使用其他 AI 编码工具生态里的 MCP 服务器与插件——读已有配置而非要求作者重新移植，并明确报告哪些能跑、哪些缺密钥、哪些跑不了。 |
| 137 | [omarfischer4315/jevcore](https://github.com/omarfischer4315/jevcore) | 0 | 2026-10-14 | 2026-10-14 | TypeSafe Jev for DeepSeek Harness, the Model Context Protocol, and plain Node: typed judgments instead of prose, offline by default. |
| 138 | [opfield/dsh-plugins](https://github.com/opfield/dsh-plugins) | 0 | 2026-10-14 | 2026-10-14 | Opfield plugins for DeepSeek Harness: MCP Hub and Opfield |
| 139 | [Pierrew19600/dsh-normify](https://github.com/Pierrew19600/dsh-normify) | 0 | 2026-10-14 | 2026-10-14 | Normify · DSH 插件：把项目架构写成归一化的分形模块树，三层校验（写时 / 校验 / 冻结回执）、30 个 normify_* 工具 + normify-gen 技能，一键渲染单文件交互式架构图；支持伴随式开发（change_open → brief → check → 实施 → refresh → change_close）。 |
| 140 | [PieterPrice49/seektty](https://github.com/PieterPrice49/seektty) | 0 | 2026-10-14 | 2026-10-14 | 面向 DeepSeek Harness 的 Claude Code 风格终端界面，支持 Windows、macOS 与 Linux，兼容透明终端、VS Code 主题和自定义配色。 |
| 141 | [po-et/dsh-sheet-diff](https://github.com/po-et/dsh-sheet-diff) | 0 | 2026-10-14 | 2026-10-14 | Read-only CSV/XLSX change review for DeepSeek Harness: align business keys, inspect values and formulas, and export review comments. |
| 142 | [quberi/dsh-quberi](https://github.com/quberi/dsh-quberi) | 0 | 2026-10-14 | 2026-10-14 | Search your Quberi knowledge base from DeepSeek Harness (OAuth sign-in, read-only) |
| 143 | [RaganaBloodedge/dsh-read-video](https://github.com/RaganaBloodedge/dsh-read-video) | 0 | 2026-10-14 | 2026-10-14 | DeepSeek Harness 视频阅读插件（TypeScript，骨架阶段）：让模型按时间戳取帧/取音频而不下载整片 —— HTTP Range + ffmpeg 远程 seek 已在 spike 验证，取一帧仅占整片 0.7%；目前只有 video_probe 落地成工具。 |
| 144 | [RicardoYan/dsh-agents-md-only](https://github.com/RicardoYan/dsh-agents-md-only) | 0 | 2026-10-11 | 2026-10-14 | Make DSH read only AGENTS.md / AGENTS.local.md, not CLAUDE.md · 让 DSH 只读 AGENTS.md / AGENTS.local.md，不读 CLAUDE.md |
| 145 | [Roussel27423/engramory](https://github.com/Roussel27423/engramory) | 0 | 2026-10-14 | 2026-10-14 | A portable memory protocol for AI agents — load it as standing rules; a curation discipline + reference spec + optional cap hook. |
| 146 | [Roussel27423/opencode2dsh](https://github.com/Roussel27423/opencode2dsh) | 0 | 2026-10-14 | 2026-10-14 | DSH plugin — free OpenCode Zen models for DeepSeek Harness (DSH). Free LLM API, no API key needed. 在 DSH 中使用 OpenCode Zen 免费模型，无需 API key |
| 147 | [Sayi/dsh-plugin-kit](https://github.com/Sayi/dsh-plugin-kit) | 0 | 2026-10-14 | 2026-10-14 | deepseek harness plugin kit |
| 148 | [Shiro-Design-16/dsh-daily-chat-config](https://github.com/Shiro-Design-16/dsh-daily-chat-config) | 0 | 2026-10-14 | 2026-10-14 | 在 DSH「插件」页里编辑 daily agent preset 的子条目列表（persona 与工具组合）——内存挂载，不写任何文件 |
| 149 | [Shiro-Design-16/dsh-minimax-tts](https://github.com/Shiro-Design-16/dsh-minimax-tts) | 0 | 2026-10-14 | 2026-10-14 | DSH 插件：用 MiniMax（海螺）TTS 朗读对话流里的 assistant 消息（手动播放 + 灵动模式） |
| 150 | [ShiTan-677/dsh-linux-desktop-entry](https://github.com/ShiTan-677/dsh-linux-desktop-entry) | 0 | 2026-10-14 | 2026-10-14 | DeepSeek Harness plugin: install, repair or remove the Linux desktop entrance for the Web GUI from inside the harness. |
| 151 | [Shuai-S/dsh-sub2api-sync](https://github.com/Shuai-S/dsh-sub2api-sync) | 0 | 2026-10-01 | 2026-10-14 | DeepSeek Harness (DSH) plugin: sync one sub2api instance's groups, keys, and models into dsh-llm-pi-ai provider routes — one relay key, one provider. |
| 152 | [siqyka/dsh-stock-leek](https://github.com/siqyka/dsh-stock-leek) | 0 | 2026-10-14 | 2026-10-14 | DSH 摸鱼韭菜插件：一个韭菜的自我修养。会话左下角大盘指数栏 + 行情悬浮窗（大盘/自选/持仓），支持 A股/北交所/港股/美股的分时、K线与持仓盈亏 |
| 153 | [Solovyov232/dsh-crew](https://github.com/Solovyov232/dsh-crew) | 0 | 2026-10-14 | 2026-10-14 | DeepSeek Harness (DSH) plugin: dispatch work to DSH agents from Claude Code / Codex — native subagent progress, in-host worker sessions with per-tier presets, and a multimodal bridge that lends the text-only harness vision and image generation. |
| 154 | [somporn07547/engramory](https://github.com/somporn07547/engramory) | 0 | 2026-10-14 | 2026-10-14 | A portable memory protocol for AI agents — load it as standing rules; a curation discipline + reference spec + optional cap hook. |
| 155 | [songzhiyin/dsh-local-model](https://github.com/songzhiyin/dsh-local-model) | 0 | 2026-10-14 | 2026-10-14 | 让 DeepSeek Harness 直连本地模型：兼容 OpenAI 协议（llama.cpp / LM Studio / vLLM / Ollama 的 /v1）与 Ollama 原生 API。无需登录、不消耗账号 token。 |
| 156 | [sqslm/dsh-pinpu](https://github.com/sqslm/dsh-pinpu) | 0 | 2026-10-14 | 2026-10-14 | Audio-reactive turn rail for DeepSeek Harness: the transcript's own turn marks dance to whatever the system is playing (WASAPI loopback), with hover-only highlighting and a left/right rail option. |
| 157 | [sskkde/dsh-goal-guard](https://github.com/sskkde/dsh-goal-guard) | 0 | 2026-10-14 | 2026-10-14 | DeepSeek Harness plugin: hold back goal auto-continuation while background subagents are still running (in-process disarm/resume guard), so a delegated turn does not burn &lt;goal_round&gt; injections while it waits for settlement. |
| 158 | [sunrulin123/dsh-community-web-ui](https://github.com/sunrulin123/dsh-community-web-ui) | 0 | 2026-10-14 | 2026-10-14 | Unofficial responsive remote Web UI bundle for DeepSeek Harness with native Desktop isolation. |
| 159 | [Suxeca/dsh-client-ui-session-switcher](https://github.com/Suxeca/dsh-client-ui-session-switcher) | 0 | 2026-10-14 | 2026-10-14 | DSH session switcher: Ctrl+K command palette to create/archive/rename/search sessions, plus Ctrl+\[/\] cycling and VSCode-style shortcut layout. |
| 160 | [Suxeca/dsh-literature-library](https://github.com/Suxeca/dsh-literature-library) | 0 | 2026-10-14 | 2026-10-14 | DSH literature library: persistent, authenticated literature bookmarks and a local research knowledge base for academic review workflows. |
| 161 | [Suxeca/dsh-plugin-repo-auditor](https://github.com/Suxeca/dsh-plugin-repo-auditor) | 0 | 2026-10-14 | 2026-10-14 | DSH native plugin: audit GitHub repos for fake stars, stargazer bot farms and hollow codebases using CMU StarScout heuristics, plus static supply-chain and sensitive-permission inspection. |
| 162 | [Suxeca/dsh-science-map](https://github.com/Suxeca/dsh-science-map) | 0 | 2026-10-14 | 2026-10-14 | Science Map for DSH: compiler and toolkit that turns a research reasoning flow into an evolving, gated evolution map. |
| 163 | [T1gerD/open-whale](https://github.com/T1gerD/open-whale) | 0 | 2026-10-14 | 2026-10-14 | 手机上的个人助理，远程使用电脑上的 DeepSeek Harness —— DSH 插件 + Expo 手机应用，扫码绑定、口语化回复、文件收发、远程开关机 |
| 164 | [temotee2103/dsh-remote-gui](https://github.com/temotee2103/dsh-remote-gui) | 0 | 2026-10-14 | 2026-10-14 | Embed a remote DeepSeek Harness GUI in the local DSH window over an SSH tunnel, with remote session listing and local/remote switching. |
| 165 | [tHedlund38/dsh-lowtide](https://github.com/tHedlund38/dsh-lowtide) | 0 | 2026-10-14 | 2026-10-14 | Time-shifting task delegation for DeepSeek Harness (dsh): plan tasks at leisure, they run unattended off-peak, come back to a report. Human-adjudicated, desktop + web. |
| 166 | [tolgaaoki076/argo](https://github.com/tolgaaoki076/argo) | 0 | 2026-10-14 | 2026-10-14 | 专门为 agent 打造的开源 agent 搜索工具，具备 200+的搜索源及多语言搜索能力，覆盖中文/英文/学术/代码/购物/金融/新闻/百科。 |
| 167 | [TonyZiYuan/dsh-session-delete](https://github.com/TonyZiYuan/dsh-session-delete) | 0 | 2026-10-13 | 2026-10-14 | 在 DSH Web 界面里删除会话。 |
| 168 | [vianvio/dsh-plugin-status-bar](https://github.com/vianvio/dsh-plugin-status-bar) | 0 | 2026-10-14 | 2026-10-14 | DSH 客户端插件：在输入框上方维护一条状态条（比输入卡片略窄、居中、与卡片上沿贴合），向其它客户端插件提供 inputStatusBar  |
| 169 | [Vo9129/dsh-crew](https://github.com/Vo9129/dsh-crew) | 0 | 2026-10-14 | 2026-10-14 | DeepSeek Harness (DSH) plugin: dispatch work to DSH agents from Claude Code / Codex — native subagent progress, in-host worker sessions with per-tier presets, and a multimodal bridge that lends the text-only harness vision and image generation. |
| 170 | [wangbofan/dsh-restart-button](https://github.com/wangbofan/dsh-restart-button) | 0 | 2026-10-14 | 2026-10-14 | DSH desktop (Windows) titlebar menu: a Restart button that closes and relaunches the whole app - shell + Host. Plugin-only, no app.asar patching. |
| 171 | [WhatCannotBeSaid/EVA-Inspired-Theme](https://github.com/WhatCannotBeSaid/EVA-Inspired-Theme) | 0 | 2026-10-09 | 2026-10-14 | NERV-gate visual theme for DeepSeek Harness (fan work, non-commercial; see LICENSE) |
| 172 | [windf1y/dsh-ocg-used](https://github.com/windf1y/dsh-ocg-used) | 0 | 2026-09-24 | 2026-10-14 | A plugin that displays OCG usage in real time in the DSH input box. |
| 173 | [WiseXin/dsh-session-intent-title](https://github.com/WiseXin/dsh-session-intent-title) | 0 | 2026-10-14 | 2026-10-14 | DeepSeek Harness 独立会话意图分类自动命名插件（⚡ 优化 / 🐛 修复 / ✨ 功能） |
| 174 | [wobushiyoushen0214/dsh-opencode-pin](https://github.com/wobushiyoushen0214/dsh-opencode-pin) | 0 | 2026-10-14 | 2026-10-14 | Pin an OpenCode Go upstream route in DeepSeek Harness by keeping one stable x-opencode-session key, with an in-GUI route picker and drift checks. |
| 175 | [wumou-sleep/dsh-xiaojingyu-persona](https://github.com/wumou-sleep/dsh-xiaojingyu-persona) | 0 | 2026-10-14 | 2026-10-14 | 傲娇小鲸鱼：给 DeepSeek Harness 加一段可开关的全局人格段落（Tsundere whale-girl persona plugin for DSH） |
| 176 | [wzn16/dsh-skill-market](https://github.com/wzn16/dsh-skill-market) | 0 | 2026-10-14 | 2026-10-14 | DSH 可视化技能商店 — Visual skill market inside DeepSeek Harness: browse, search, install and manage Agent Skills |
| 177 | [wzw4429-crypto/dsh-github-sync](https://github.com/wzw4429-crypto/dsh-github-sync) | 0 | 2026-10-14 | 2026-10-14 | GitHub repository sync plugin for DeepSeek Harness (dsh): bidirectional git sync with pre-push checks, Actions/CI monitoring, repo add/remove/rename, local file browsing. |
| 178 | [xcasee/dsh-plugin-market-intelligence](https://github.com/xcasee/dsh-plugin-market-intelligence) | 0 | 2026-10-14 | 2026-10-14 | A DeepSeek Harness (DSH) market-intelligence expert plugin powered by the CaSee platform — native intelligence tools, an expert persona, a bundled skill and a CaSee dark-dashboard HTML report contract. |
| 179 | [xiamubumu/dsh-aux-degrade](https://github.com/xiamubumu/dsh-aux-degrade) | 0 | 2026-10-14 | 2026-10-14 | DSH 1.5 辅助模型降级：让压缩摘要、会话标题这类旁路调用更省更完整，主循环零影响。仅支持 DSH 1.5，后续会跟进更新。 / Auxiliary-model degradation for DSH 1.5: cheaper, complete side calls (reasoning off, token floor, tools stripped). DSH 1.5 only; newer releases will follow. |
| 180 | [xiamubumu/dsh-capability-composer](https://github.com/xiamubumu/dsh-capability-composer) | 0 | 2026-10-14 | 2026-10-14 | DSH 1.5 能力组合器：按会话或工作区编排工具、技能与 MCP，按需缩小系统提示。仅支持 DSH 1.5，后续会跟进更新。 / Capability composer for DSH 1.5: per-session tool / skill / MCP compositions that shrink the system prompt on demand. DSH 1.5 only; newer releases will follow. |
| 181 | [xiamubumu/dsh-patch-library](https://github.com/xiamubumu/dsh-patch-library) | 0 | 2026-10-14 | 2026-10-14 | 官方 DSH 内核补丁的数据化版本：10 条自包含补丁 + 自适应应用器（自己找安装位置、逐个备份、语法检查、一键回退），五种打法、零硬编码路径。仅支持 DSH 1.5，后续会跟进更新。 / Official DSH core patches as data: ten patches plus an adaptive applier. Five ways to apply. DSH 1.5 only. |
| 182 | [Xiaoli-Asuna/dsh-theme-endfield-style](https://github.com/Xiaoli-Asuna/dsh-theme-endfield-style) | 0 | 2026-10-14 | 2026-10-14 | Arknights: Endfield-style theme for the DeepSeek Harness web UI (unofficial fan work). |
| 183 | [XiaoSHang05/dsh-rice-guard](https://github.com/XiaoSHang05/dsh-rice-guard) | 0 | 2026-10-13 | 2026-10-14 | A passive watchdog for DeepSeek Harness: watches a turn's thinking and text streams and cancels it when the model starts repeating itself. |
| 184 | [xiaoxianxian/multi-proxy](https://github.com/xiaoxianxian/multi-proxy) | 0 | 2026-06-28 | 2026-10-14 | 多 Agent 编排中枢：把 Codex / Cursor / Hermes / DSH 等 AI 编程代理当员工统一管理——协议转换、成本台账、熔断、任务编排与 Web 面板。不是模型切换器，切的是活。 |
| 185 | [xinspark/dsh-win-pwsh7](https://github.com/xinspark/dsh-win-pwsh7) | 0 | 2026-10-13 | 2026-10-14 | PowerShell 7 for the DSH \`pwsh\` tool on Windows: detect, validate, and install the self-updating Microsoft Store package — one install path, with the connection checked first. |
| 186 | [xuan25/dsh-email](https://github.com/xuan25/dsh-email) | 0 | 2026-10-02 | 2026-10-14 |   dsh-email gives a DSH agent working access to a mailbox: the email tool reads and sends the user's mail over standard IMAP/SMTP, so the agent can check and answer it with only a password or app-specific password. |
| 187 | [xuan25/dsh-imagegen](https://github.com/xuan25/dsh-imagegen) | 0 | 2026-10-13 | 2026-10-14 | Image-generation plugin for dsh: one \`imagegen\` tool that renders images through any OpenAI-compatible image backend |
| 188 | [xuan25/dsh-local-policy](https://github.com/xuan25/dsh-local-policy) | 0 | 2026-09-29 | 2026-10-14 | A cordis layer that disables shipped plugins that provide DeepSeek services in the base bundle |
| 189 | [xuan25/dsh-logger-channels](https://github.com/xuan25/dsh-logger-channels) | 0 | 2026-10-11 | 2026-10-14 | dsh-logger-channels gives a DSH profile a visible log sink |
| 190 | [xuan25/dsh-ntfy](https://github.com/xuan25/dsh-ntfy) | 0 | 2026-10-02 | 2026-10-14 | dsh-ntfy gives a DSH agent a push-notification path: a single tool call publishes a message to an ntfy topic, so job results, alerts, and reports reach the user's device - or any app or feed that subscribes to the topic. |
| 191 | [xuan25/dsh-qqbot-send](https://github.com/xuan25/dsh-qqbot-send) | 0 | 2026-09-29 | 2026-10-14 | Adding callable message sending tools for dsh-qqbot |
| 192 | [xuan25/dsh-timer](https://github.com/xuan25/dsh-timer) | 0 | 2026-09-29 | 2026-10-14 | A systemd.timer equivalent for DeepSeek Harness (DSH) |
| 193 | [xuan25/dsh-tts](https://github.com/xuan25/dsh-tts) | 0 | 2026-10-03 | 2026-10-14 | tts tool that turns text into an audio file through any OpenAI-compatible TTS backend. |
| 194 | [xuan25/dsh-webhook-dispatcher](https://github.com/xuan25/dsh-webhook-dispatcher) | 0 | 2026-10-10 | 2026-10-14 | dsh-webhook-dispatcher gives a dsh deployment inbound webhook dispatch: when an HTTP caller reaches one of the plugin's endpoints, a fresh, isolated agent session handles the delivered content.  |
| 195 | [xuan25/my-dsh-plugin-listing](https://github.com/xuan25/my-dsh-plugin-listing) | 0 | 2026-10-11 | 2026-10-14 | 我的 dsh 插件清单 |
| 196 | [xuelin632/dsh-aris-glass](https://github.com/xuelin632/dsh-aris-glass) | 0 | 2026-10-14 | 2026-10-14 | DSH 液态玻璃插件：给助手消息、左侧栏与标题栏菜单加毛玻璃底色（纯客户端样式注入） |
| 197 | [yffo/dsh-engramory-recall](https://github.com/yffo/dsh-engramory-recall) | 0 | 2026-10-14 | 2026-10-14 | Local BM25 auto-recall + write guard + memory panel for the Engramory markdown store — no network, no model, no daemon. |
| 198 | [yhfgyyf/dsh-side-chat](https://github.com/yhfgyyf/dsh-side-chat) | 0 | 2026-10-14 | 2026-10-14 | Temporary side conversations for DeepSeek Harness Desktop and Web |
| 199 | [yll86/dsh-theme-aemath](https://github.com/yll86/dsh-theme-aemath) | 0 | 2026-10-14 | 2026-10-14 | AEMEATH Theme - sakura violet-rose theme plugin for the DeepSeek Harness Web GUI |
| 200 | [yugapor/dsh-gitview](https://github.com/yugapor/dsh-gitview) | 0 | 2026-10-11 | 2026-10-14 | Git changes, diffs, history and CI in the DeepSeek Harness sidebar. |
| 201 | [yutianliang/dsh-assistant-bubble](https://github.com/yutianliang/dsh-assistant-bubble) | 0 | 2026-10-14 | 2026-10-14 | 给 DSH 里助手回复加气泡底，可选液态玻璃材质；工具条、过程行、统计行等周边信息也能一起同步 |
| 202 | [yvban/dsh-session-mover](https://github.com/yvban/dsh-session-mover) | 0 | 2026-10-14 | 2026-10-14 | DSH plugin: move sessions between workspaces safely — frame-level zstd header rewrite, byte-level verification, full-directory backup, live membership update |
| 203 | [YYC-JNU/dsh-skill-invocation-monitor](https://github.com/YYC-JNU/dsh-skill-invocation-monitor) | 0 | 2026-10-14 | 2026-10-14 | Read-only skill invocation monitor for DeepSeek Harness — which Agents are running, which Skill each is calling, status and elapsed time, live in the Web GUI sidebar. · 只读技能调用监控：侧边栏实时展示活动 Agent 正在调用的 Skill、状态与耗时。 |
| 204 | [zazzzzzzz/dsh-usage-stats](https://github.com/zazzzzzzz/dsh-usage-stats) | 0 | 2026-10-14 | 2026-10-14 | DeepSeek Harness (dsh) 左侧栏的模型 Token 用量统计插件：跨会话汇总累计用量、连续使用天数、年度活动热力图、每日分模型趋势与模型占比 |
| 205 | [ZelotsNullzwei/dsh-ofm-updater](https://github.com/ZelotsNullzwei/dsh-ofm-updater) | 0 | 2026-10-14 | 2026-10-14 | 给 DSH Desktop 的 Our Free Model 插件做一键更新：双击即可，处理 PATH / 慢网络 / 完整性校验三个坑。 |
| 206 | [zhaorui-wu/dsh-skill-cockpit](https://github.com/zhaorui-wu/dsh-skill-cockpit) | 0 | 2026-10-14 | 2026-10-14 | Skill cockpit for DSH: one page in the app-level nav listing every skill this machine exposes, why a skill is invisible, and a one-file toggle. (early / work in progress) |
| 207 | [zhongjiadeng-cmd/dsh-codex-appearance](https://github.com/zhongjiadeng-cmd/dsh-codex-appearance) | 0 | 2026-10-14 | 2026-10-14 | Appearance settings and a blue-gray theme for DeepSeek Harness |
| 208 | [zhujiuyi/dsh-balance-meter](https://github.com/zhujiuyi/dsh-balance-meter) | 0 | 2026-10-14 | 2026-10-14 | DeepSeek Harness plugin: identify the provider behind the current model route and query its API balance or subscription quota. No subprocesses, no exec permissions, official endpoints only. |

## 从快照消失的已核准仓库 / Approved repositories missing from the snapshot

已核准但已不在当前快照中（删除或改名），核实后从 [data/approved.json](../approved.json) 移除或更新名称。

Approved but no longer present in the current snapshot (deleted or renamed) — after checking, remove them from [data/approved.json](../approved.json) or update the name.

- 01men/ybkk-AIOS
- asdukw/dsh-plugin-chat-tools
- chioplet/dsh-live-progress
- edelah/dsh-task-board-model
- equasen/dsh-font
- john-walks-slow/dsh-session-state
- lengfengng1-ai-architect/dsh-workspace-memories
- lingchunya/dsh-workspace-enhance
- OSSKn4w7/dsh-plugin-manager
- s17179XTY/dsh-BigfishPet
- Sandyzzx/dsh-zcode-bridge
- ShawnRen57/omni-learning-assistant
- Shiro-Design-16/dsh-preset-mixed
- XiaoSHang05/dsh-loop-guard
