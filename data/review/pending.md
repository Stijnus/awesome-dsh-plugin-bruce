# 待审核仓库 / Pending review

> 新增到 `dsh-plugin` Topic 下、带有简介、尚未经维护者核实的仓库。本文件由 `scripts/update.mjs` 每日刷新，仅供审核使用，不是用户可见页面。
>
> Repositories newly added to the `dsh-plugin` topic that the maintainer has not verified yet. Refreshed daily by `scripts/update.mjs`; review-only, not a user-facing page.

- 生成时间 / Generated: **2026-10-23**
- 快照日期 / Snapshot date: **2026-10-23 (UTC)**
- 待审核 / Pending: **384**
- 从快照消失的已核准仓库 / Approved repositories missing from the snapshot: **25**
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

对比上一份快照 **2026-10-22** / vs previous snapshot **2026-10-22**。规则：日增 ≥100★；已核准仓新入 Top 200（且 Δ≥50）/ 名次跃升 ≥50 / 冲入 Top 20；待审仓 ≥100★ 且核准后将进入 Top 200。

- 看 Star 是否与 fork、提交活跃度、仓库年龄匹配（高星零 fork、创建当天几百星，多为刷星）
- 是否把已有高星的通用项目贴上 `dsh-plugin` Topic 蹭榜——插件本身可进目录，但应加入 `leaderboard_exclusions`，理由写清 stars accrued as …
- 待审仓若核准会直接冲进 Top 20 / Top 200，先确认热度来自 **DSH 插件本身**
- 已核准仓的异常跃升：确认后同样可记入 `leaderboard_exclusions`，不必下架目录

Check stars against forks, commit activity and age (hundreds of stars on day one, or high stars with zero forks, usually look bought). A generic high-star project that only just tagged `dsh-plugin` can stay in the catalog but should go to `leaderboard_exclusions` (reason: stars accrued as …). If approving a pending repo would drop it into Top 20 / Top 200, confirm the audience is the DSH plugin itself.

- 告警数 / Alerts: **14**

| Project | Queue | Stars | Δ | Forks | Age | Signals | 审核提示 / Hint |
| --- | --- | ---: | ---: | ---: | ---: | --- | --- |
| ⚠️ [oceanbase/powercontext](https://github.com/oceanbase/powercontext) | 待审 / pending | 1370 | — | 314 | 346d | 待审高星 | 核准即 Top 15 |
| ⚠️ [zhuzhaoyun/Molio](https://github.com/zhuzhaoyun/Molio) | 待审 / pending | 433 | — | 55 | 140d | 待审高星 | 核准即榜 #51 |
| ⚠️ [Ebony-Vinyl/dsh-our-free-model](https://github.com/Ebony-Vinyl/dsh-our-free-model) | 已核准 / approved | 38957 | +2361 | 1115 | 28d | 日增百星 | 日增 +2361★；已不进榜单 |
| ⚠️ [Fei2411/DeepSeek-Bot](https://github.com/Fei2411/DeepSeek-Bot) | 已核准 / approved | 3407 | +377 | 318 | 15d | 日增百星 | 日增 +377★ |
| ⚠️ [dataelement/dsh-desktop](https://github.com/dataelement/dsh-desktop) | 已核准 / approved | 16508 | +322 | 555 | 70d | 日增百星 | 日增 +322★；已不进榜单 |
| ⚠️ [liguobao/ds-harness-remote](https://github.com/liguobao/ds-harness-remote) | 已核准 / approved | 795 | +288 | 73 | 69d | 日增百星 | 日增 +288★ |
| ⚠️ [ccch1mneyyy/dsh-TUI](https://github.com/ccch1mneyyy/dsh-TUI) | 已核准 / approved | 5475 | +248 | 290 | 70d | 日增百星 | 日增 +248★ |
| ⚠️ [dsh-market/dsh-market](https://github.com/dsh-market/dsh-market) | 已核准 / approved | 8469 | +235 | 337 | 69d | 日增百星 | 日增 +235★；已不进榜单 |
| ⚠️ [PC2005-cloud/dsh-pet](https://github.com/PC2005-cloud/dsh-pet) | 已核准 / approved | 3727 | +233 | 272 | 69d | 日增百星 | 日增 +233★ |
| ⚠️ [elysia395/dsh-wallpaper-engine](https://github.com/elysia395/dsh-wallpaper-engine) | 已核准 / approved | 2134 | +211 | 75 | 67d | 日增百星 | 日增 +211★ |
| ⚠️ [T-Auto/dsh-ops](https://github.com/T-Auto/dsh-ops) | 已核准 / approved | 3987 | +137 | 114 | 14d | 日增百星 | 日增 +137★ |
| ⚠️ [c1overzz/dsh-bili-scroll](https://github.com/c1overzz/dsh-bili-scroll) | 已核准 / approved | 544 | +121 | 63 | 8d | 日增百星 | 日增 +121★ |
| ⚠️ [MeteorNOX/DeepSeek-Balance-Whale-Widget](https://github.com/MeteorNOX/DeepSeek-Balance-Whale-Widget) | 已核准 / approved | 5885 | +106 | 192 | 65d | 日增百星 | 日增 +106★；已不进榜单 |
| ⚠️ [sixtysevenlf/dsh-blender-plugin](https://github.com/sixtysevenlf/dsh-blender-plugin) | 已核准 / approved | 1210 | +106 | 48 | 39d | 日增百星 | 日增 +106★ |


| # | Project | Stars | Created | First seen | Description |
| ---: | --- | ---: | ---: | ---: | --- |
| 1 | [oceanbase/powercontext](https://github.com/oceanbase/powercontext) ⚠️ | 1370 | 2025-11-10 | 2026-10-23 | Not only memory but a full story |
| 2 | [zhuzhaoyun/Molio](https://github.com/zhuzhaoyun/Molio) ⚠️ | 433 | 2026-06-04 | 2026-10-23 | A local-first personal knowledge layer for AI agents. Build evolving knowledge spaces with LLM Wiki, knowledge graphs, and agent workflows. |
| 3 | [kenz1117/dsh-engram](https://github.com/kenz1117/dsh-engram) | 31 | 2026-09-01 | 2026-10-23 | Local-first cross-session long-term memory for DeepSeek Harness — 22 narrow tools, hybrid FTS5 + local-vector retrieval, evidence gate, provenance audit, SM-2 review. Zero external services, zero API keys. |
| 4 | [Lphehe/dsh-composer-assist](https://github.com/Lphehe/dsh-composer-assist) | 13 | 2026-10-22 | 2026-10-23 | Context-aware composer predictions for DeepSeek Harness · 上下文感知输入预测、草稿补全与润色；会话独立保留，过期响应不覆盖新输入，Tab 接受但不发送。 |
| 5 | [varsian/ghost](https://github.com/varsian/ghost) | 12 | 2026-10-23 | 2026-10-23 | GHOST Community Edition - local, realtime Live2D digital human plugin stack for DeepSeek Harness (DSH), with VoxCPM 1.5 TTS. |
| 6 | [Dogwind221/img2img-studio](https://github.com/Dogwind221/img2img-studio) | 8 | 2026-08-15 | 2026-10-23 | Image-to-image studio: vision-gated routing + multi-provider generation (DashScope / ChatGPT-web / OpenAI / Z.AI / Doubao / MiniMax) with auto failover. E-commerce sets &amp; photo-art styles. 图生图工作台 · 多供应商自动降级 · 电商套图与照片艺术 |
| 7 | [IndieXiaoLong/DSH-Enhance](https://github.com/IndieXiaoLong/DSH-Enhance) | 7 | 2026-10-23 | 2026-10-23 | 为 DSH Web GUI 带来新建对话命名、文件拖拽引用、编辑并重发上一条提示词、消息时间线，以及可拖拽的悬浮球与对话宽度控制 |
| 8 | [dpkg-s/ai-memory-template](https://github.com/dpkg-s/ai-memory-template) | 6 | 2026-07-22 | 2026-10-23 | Cross-AI shared memory vault - MCP server for persistent memory across AI tools |
| 9 | [HRuiCcc/RuiC-dsh-purge](https://github.com/HRuiCcc/RuiC-dsh-purge) | 5 | 2026-10-23 | 2026-10-23 | DSH 本机维护插件：预检 → 快照 → 原子写入 → 冲突检测回滚；含提示词管理与设置面板。基于 ZiPengWei/dsh-purge（MIT）。 |
| 10 | [17-qxm/dsh-virtual-coding-plan](https://github.com/17-qxm/dsh-virtual-coding-plan) | 3 | 2026-10-23 | 2026-10-23 | A local, simulated coding plan for DeepSeek Harness — meters spend in CNY, enforces rolling 5-hour and weekly caps, and refuses requests before any provider call when the cap is hit. |
| 11 | [17861102832/wanyimem](https://github.com/17861102832/wanyimem) | 3 | 2026-08-21 | 2026-10-23 | 万忆 · 永不遗忘的全量记忆系统 — MCP 标准 stdio + 事件溯源 + 过程记忆 + 语义向量检索 + sqlite-vec ANN + reranker 精排 + 记忆图谱 + 元认知知识空白 + 只读 Markdown 镜像 + 护城河全自动，23 个 MCP 工具。 |
| 12 | [adeahejshshsh/coldbrew-dsh](https://github.com/adeahejshshsh/coldbrew-dsh) | 3 | 2026-10-23 | 2026-10-23 | DeepSeek​Harness 插件：冷咖啡执行核。三档破甲强度（lite/mid/deep）配置切换，86 条三拍技能，关键词路由，设置页可调。 |
| 13 | [forelsket521-jpg/vvn-deepseek-harness](https://github.com/forelsket521-jpg/vvn-deepseek-harness) | 3 | 2026-10-23 | 2026-10-23 | DeepSeek Harness 破甲工具：解锁审批 / 沙箱 / 提权限制，解除身份与拒答约束，注入自定义提示词。82 条补丁，带图形界面，双击即用。基于 dsh-purge 修改。 |
| 14 | [pawpress/office-ppt](https://github.com/pawpress/office-ppt) | 3 | 2026-10-22 | 2026-10-23 | dsh-plugin libreoffice uno pptx deepseek-harness powerpoint presentation |
| 15 | [TimeMachineLab/awesome-deepseek-harness-zh](https://github.com/TimeMachineLab/awesome-deepseek-harness-zh) | 3 | 2026-10-23 | 2026-10-23 | DeepSeek Harness 中文使用指南与资源大全：dsh 安装教程、模型与 API Key 配置、插件、Skills、MCP、报错排查 |
| 16 | [wang1299/dsh-reforge](https://github.com/wang1299/dsh-reforge) | 3 | 2026-10-18 | 2026-10-23 | DSH-Reforge (dsh-reforge) — DeepSeek Harness plugin for traceable experience from test-verified Python bug fixes. 从有测试依据的 Python 修复中积累可追溯经验。Experimental alpha · DSH 0.2.0-rc.2. |
| 17 | [yaqiangsun/QubitClient](https://github.com/yaqiangsun/QubitClient) | 3 | 2026-01-20 | 2026-10-23 | AI Agent for Quantum Systems |
| 18 | [27painter/dsh-sw-cad](https://github.com/27painter/dsh-sw-cad) | 2 | 2026-10-23 | 2026-10-23 | DSH/Codex × SolidWorks &amp; AutoCAD · on-demand skills + MCP servers for real CAD automation (Windows, COM) |
| 19 | [burning-frappuccino/dsh-turbo](https://github.com/burning-frappuccino/dsh-turbo) | 2 | 2026-10-23 | 2026-10-23 | DSH OVERDRIVE — Fast/Max execution gears for DeepSeek Harness. 少走弯路，火力全开。 |
| 20 | [coii08o0o/dsh-bot-board](https://github.com/coii08o0o/dsh-bot-board) | 2 | 2026-10-23 | 2026-10-23 | A DeepSeek Harness plugin: a floating board for DS Bot that shows who's running, who's stuck, and who needs you. Read-only, it never writes to DS Bot's data. ｜ DeepSeek Harness 插件：给 DS Bot 一块浮动看板，谁在跑、谁卡住、谁在等你。只读，不改它的数据。 |
| 21 | [DEVVE-1/dsh-plugin-file-cleanup](https://github.com/DEVVE-1/dsh-plugin-file-cleanup) | 2 | 2026-09-29 | 2026-10-23 | DSH 插件：左上角「文件清理」按钮，扫一遍白名单垃圾（临时文件 / 系统噪声 / 可再生缓存），确认后按清单删除，删除范围严格限定在所选工作区或 DSH_HOME 内。 |
| 22 | [Han-1413141/dsh-jev-thinkout](https://github.com/Han-1413141/dsh-jev-thinkout) | 2 | 2026-10-21 | 2026-10-23 | JeV 思维链外显：将 DeepSeek 长思考中的任务规划、执行进度与阶段小结呈现为聊天正文，支持 DSH 原生翻译、轻量摘要和父子任务流程图，保持主模型上下文不变。 |
| 23 | [hxql666/dsh-persona-manager](https://github.com/hxql666/dsh-persona-manager) | 2 | 2026-10-23 | 2026-10-23 | Persona manager for DeepSeek Harness: create, edit and freely switch multiple system personas, with a global default and per-session overrides. · DSH 人设管理插件 |
| 24 | [icyaaaww/dsh-bili-vision](https://github.com/icyaaaww/dsh-bili-vision) | 2 | 2026-10-23 | 2026-10-23 | DSH Bilibili video understanding plugin: timestamped frames, local ASR/OCR, and optional independent vision model. |
| 25 | [JasperPengC/dsh-mcp-skills-board](https://github.com/JasperPengC/dsh-mcp-skills-board) | 2 | 2026-10-17 | 2026-10-23 | DeepSeek Harness 的 MCP 服务器与技能管理面板。 |
| 26 | [Somnus678/dsh-input-assistant](https://github.com/Somnus678/dsh-input-assistant) | 2 | 2026-10-23 | 2026-10-23 | DSH (DeepSeek Harness) 输入助手插件:提示词优化、下一句预测、输入续写、草稿暂存 |
| 27 | [XiaoyuYoung/neko-wander](https://github.com/XiaoyuYoung/neko-wander) | 2 | 2026-10-22 | 2026-10-23 | 溜达喵 Neko Wander 溜达喵希望借助AI基础服务（大肥鱼牛逼），提供个性化的导航方案，可在对话中搜索地点、标记地图，规划和比较多种出行路线。 |
| 28 | [zendev-lab/ulota](https://github.com/zendev-lab/ulota) | 2 | 2026-05-17 | 2026-10-23 | A local-first coding-agent runtime for durable sessions and controlled autonomous work. |
| 29 | [ZIye1208/dsh-settings-nav-manager](https://github.com/ZIye1208/dsh-settings-nav-manager) | 2 | 2026-10-23 | 2026-10-23 | DSH 设置页导航管理插件 —— 拖拽排序 · 显隐 · 抽屉收纳 · 持久化。给 DeepSeek Harness 设置页左侧分区导航加上整理能力。 |
| 30 | [13520rygvv/dsh-restart-button](https://github.com/13520rygvv/dsh-restart-button) | 1 | 2026-10-23 | 2026-10-23 | DSH desktop plugin: a one-click restart button in Settings, plus a customizable shortcut. |
| 31 | [20genesis14-sys/dsh-max-compact](https://github.com/20genesis14-sys/dsh-max-compact) | 1 | 2026-10-23 | 2026-10-23 | DeepSeek Harness plugin: compact model input via a lazy tool surface (mc_discover), deployment-level prompt layer with persona shadow, and an agent-preset composer. For DSH 0.2.x. |
| 32 | [2220545672/dsh-context-editor](https://github.com/2220545672/dsh-context-editor) | 1 | 2026-10-22 | 2026-10-23 | DeepSeek Harness plugin: edit a finalized assistant reply and its reasoning chain from the chat transcript. |
| 33 | [2310770803/dsh-session-copy](https://github.com/2310770803/dsh-session-copy) | 1 | 2026-10-23 | 2026-10-23 | One button in the DSH session header: copy a deep link, the whole conversation as Markdown, or the working directory. · DSH 会话标题栏一键复制：深度链接、整段对话 Markdown、工作目录。 |
| 34 | [2424830124/dsh-workbuddy](https://github.com/2424830124/dsh-workbuddy) | 1 | 2026-10-22 | 2026-10-23 | 将workbuddy后端接入dsh，让你在dsh中使用workbuddy的模型（消耗workbuddy的积分） |
| 35 | [2540511/dsh-memory](https://github.com/2540511/dsh-memory) | 1 | 2026-10-23 | 2026-10-23 | DSH 长期记忆插件：会话存成本地 Markdown，抽取式摘要 + 低 token 启动包，支持跨会话检索、冲突标记与提示词导出，全程不上传云端。Local-first long-term memory plugin for DSH: Markdown storage, extractive summaries, low-token startup pack, zero cloud upload. |
| 36 | [aadmin61-design/dsh-selection-chat](https://github.com/aadmin61-design/dsh-selection-chat) | 1 | 2026-10-18 | 2026-10-23 | DSH 独立划词引用与侧边聊天插件：输入框上方引用卡片、原生分支会话，无需构建。 |
| 37 | [ABL312/dsh-inkstone](https://github.com/ABL312/dsh-inkstone) | 1 | 2026-10-23 | 2026-10-23 | 文房四宝 · Inkstone — DSH 插件包：Trilium Notes · Zotero · Typst · 联合工程流水线 |
| 38 | [alccs/dsh-visual-intelligence-engine](https://github.com/alccs/dsh-visual-intelligence-engine) | 1 | 2026-10-23 | 2026-10-23 | DeepSeek Harness visual plugin: interactive graphics with native prose, structured input, local repair and shared controls. |
| 39 | [Anmulzhao/DSH-AGINT](https://github.com/Anmulzhao/DSH-AGINT) | 1 | 2026-08-17 | 2026-10-23 | Self-evolving agent framework on DeepSeek Harness (dsh): 40 Cordis plugins, 4 presets, memory · reflection · gates · metrics · an auditable evolution loop. |
| 40 | [aur3l14no/dsh-mindmap](https://github.com/aur3l14no/dsh-mindmap) | 1 | 2026-10-23 | 2026-10-23 | Persistent collaborative Excalidraw canvas for the DSH Web GUI, where boxes get their own Agent Teams teammates under a canvas lead. |
| 41 | [Bowie-Z-2001/emoking](https://github.com/Bowie-Z-2001/emoking) | 1 | 2026-10-23 | 2026-10-23 | 用虚拟烟替代真烟：DSH（DeepSeek Harness）右下角的模拟抽烟挂件，帮你在工位/公共场所顶一下烟瘾、减少真实吸烟与二手烟。47 款烟/25 品牌/雪茄/18 成就，纯本地模拟、不含真实烟草、不销售。 |
| 42 | [Cassius0924/dsh-medals](https://github.com/Cassius0924/dsh-medals) | 1 | 2026-10-23 | 2026-10-23 | Collectible 3D token-usage medals for DeepSeek Harness |
| 43 | [CatLollipop/dsh-parallel-sessions](https://github.com/CatLollipop/dsh-parallel-sessions) | 1 | 2026-10-22 | 2026-10-23 | DeepSeek Harness 并行会话协调插件：检测并行会话、带发起方归属的跨会话消息、阶段冲突时暂停/自动恢复。 |
| 44 | [chiqianyushao/dsh-file-selector](https://github.com/chiqianyushao/dsh-file-selector) | 1 | 2026-10-23 | 2026-10-23 | Right-click a file-tree row, or a text selection in the document preview, to append its path or line range into the DSH composer draft. Zero runtime dependencies. |
| 45 | [chiqianyushao/dsh-service-status](https://github.com/chiqianyushao/dsh-service-status) | 1 | 2026-10-23 | 2026-10-23 | DeepSeek service status as dots beside the composer and in the sidebar, driven by configurable status.deepseek.com Atom/RSS feeds, plus a model_status tool. Zero runtime dependencies. |
| 46 | [crane-you/dsh-task-plugin-scout](https://github.com/crane-you/dsh-task-plugin-scout) | 1 | 2026-10-23 | 2026-10-23 | Find the plugins that make a task easier — a DeepSeek Harness (DSH) plugin that ranks installed, disabled and marketplace plugins for the task at hand and prints the exact next step for each. · 按任务排序本机插件（已启用 / 未启用 / 市场可安装）并给出下一步。npm: dsh-task-plugin-scout |
| 47 | [danheng383-commits/dsh-widget](https://github.com/danheng383-commits/dsh-widget) | 1 | 2026-10-23 | 2026-10-23 | 大肥鱼桌面挂件 · 常驻 Windows 桌面的 DSH 任务进度悬浮鱼（透明分层窗口，含审批提醒） |
| 48 | [Dax233/dsh-chrome-bridge](https://github.com/Dax233/dsh-chrome-bridge) | 1 | 2026-10-23 | 2026-10-23 | DeepSeek Harness plugin + MV3 extension: control the user real Chrome via chrome.debugger (UIA refs, tab-group ACL, logs, iframe). |
| 49 | [Dax233/dsh-desktop-notify](https://github.com/Dax233/dsh-desktop-notify) | 1 | 2026-10-23 | 2026-10-23 | DeepSeek Harness plugin: native Windows toast notifications with a built-in ciallo sound. |
| 50 | [daxianya/dsh-session-manager](https://github.com/daxianya/dsh-session-manager) | 1 | 2026-10-23 | 2026-10-23 | DeepSeek Harness 会话管理插件：在侧边栏列出会话，按时间/体积/回合排序，勾选批量硬删除，支持清理空会话与失效记录 |
| 51 | [devilzyl/dsh-enhance-prompt](https://github.com/devilzyl/dsh-enhance-prompt) | 1 | 2026-10-23 | 2026-10-23 | Composer plugin for DeepSeek Harness that rewrites your chat draft into a clearer, more specific prompt with your own model. One click to enhance, one to revert. |
| 52 | [elfmingh/dsh-prompt-manager](https://github.com/elfmingh/dsh-prompt-manager) | 1 | 2026-10-23 | 2026-10-23 | Layered prompt manager for DeepSeek Harness: reusable entries per workspace or session, built-in section overrides with line-level diff, and real assembly snapshots. |
| 53 | [Eureka-KK/dsh-rightclick-paste](https://github.com/Eureka-KK/dsh-rightclick-paste) | 1 | 2026-10-23 | 2026-10-23 | DeepSeek Harness plugin: right-click inside the composer to paste the clipboard straight into the current draft (like cmd / PowerShell). |
| 54 | [Faust-zyb/dsh-models-sort](https://github.com/Faust-zyb/dsh-models-sort) | 1 | 2026-10-23 | 2026-10-23 | 给 DSH 设置页的模型供应商列表加 CC Switch 式拖拽排序与隐藏：松手顺序立即生效并写回 cordis.patch.yml（自动备份），可整行隐藏供应商并从聊天框模型选择器移除。 |
| 55 | [fengzhiyushui/dsh-plugins-update](https://github.com/fengzhiyushui/dsh-plugins-update) | 1 | 2026-10-22 | 2026-10-23 | One-click update checker &amp; installer for third-party DeepSeek Harness (DSH) plugins \| DeepSeek Harness 第三方插件一键检查与更新工具 |
| 56 | [fengzhiyushui/dsh-think-intensity](https://github.com/fengzhiyushui/dsh-think-intensity) | 1 | 2026-10-22 | 2026-10-23 | DSH 思考强度策略插件：在模型已有档位之上决定每次请求用哪一档，可观测、可回滚。 |
| 57 | [guofug/dsh-fastswitch](https://github.com/guofug/dsh-fastswitch) | 1 | 2026-10-23 | 2026-10-23 | Faster session switching for DeepSeek Harness: smaller first-paint window plus request de-duplication on the client. |
| 58 | [huachabobo/dsh-balance-badge](https://github.com/huachabobo/dsh-balance-badge) | 1 | 2026-10-23 | 2026-10-23 | 在 DeepSeek Harness 输入框正下方显示账号余额：消耗曲线、本会话消耗、一键充值（系统浏览器） |
| 59 | [huangziyuan-general/dsh-xuanji](https://github.com/huangziyuan-general/dsh-xuanji) | 1 | 2026-10-22 | 2026-10-23 | 玄机阁 dsh-xuanji — DeepSeek Harness 玄学算命插件：八字/紫微/梅花/黄历/称骨/择日/风水/起名/人生K线/塔罗/小六壬，全本地确定性引擎，模型只解读 \| Fortune-telling plugin for DeepSeek Harness with deterministic local engines |
| 60 | [ImpartialLucas/dsh-image-annotate](https://github.com/ImpartialLucas/dsh-image-annotate) | 1 | 2026-10-19 | 2026-10-23 | DSH marquee request-changes: drag a rectangle in the right sidebar, annotate each region, and send them as one message with a host-side freeze-frame. |
| 61 | [insideyou-0501/dsh-mech-workbench](https://github.com/insideyou-0501/dsh-mech-workbench) | 1 | 2026-10-21 | 2026-10-23 | Engineering &amp; math problem workbench for DSH · 工科与数学题解工作台：读题图、求解、出图、自检，9 个工具 + 4 个技能 |
| 62 | [jcx3915-pixel/dsh-subtopic](https://github.com/jcx3915-pixel/dsh-subtopic) | 1 | 2026-10-23 | 2026-10-23 | Select any text in a DSH conversation, tap Ctrl, and get an inline sub-topic card — streaming answer, follow-up tree, and drag-to-quote reference chips. |
| 63 | [jisvrin/dsh-phone-access](https://github.com/jisvrin/dsh-phone-access) | 1 | 2026-10-22 | 2026-10-23 | Open DSH from your phone, and keep that working after DSH restarts. |
| 64 | [jjjjjsgrmjjjjj/dsh-qq-plugin-group-expand](https://github.com/jjjjjsgrmjjjjj/dsh-qq-plugin-group-expand) | 1 | 2026-10-23 | 2026-10-23 | QQ group expansion for the DeepSeek Harness QQ channel |
| 65 | [k0ndrateff/dsh-plugins](https://github.com/k0ndrateff/dsh-plugins) | 1 | 2026-10-21 | 2026-10-23 | Useful developer plugins for DeepSeek Harness. |
| 66 | [kdcadmin/dsh_douyin_tools](https://github.com/kdcadmin/dsh_douyin_tools) | 1 | 2026-10-23 | 2026-10-23 | deepseek自动刷抖音的dsh插件，能读评论，@你的账号，点赞视频和发布视频 |
| 67 | [lihaiyang616/dsh-local-tts](https://github.com/lihaiyang616/dsh-local-tts) | 1 | 2026-10-23 | 2026-10-23 | DSH 本地朗读：用本机 Style-Bert-VITS2 把会话读出声，支持多音色与按语言切换 |
| 68 | [logb-1/dsh-course-assistant](https://github.com/logb-1/dsh-course-assistant) | 1 | 2026-10-23 | 2026-10-23 | DeepSeek Harness 插件：课程文件（PPTX/PDF/DOCX/MD）→ 目录识别 · 分章知识点 · B 站网课推荐 · Markdown/PDF 学习报告 |
| 69 | [lvsun080403/Qwen3.5-9B-128K-oneclick-deepseek](https://github.com/lvsun080403/Qwen3.5-9B-128K-oneclick-deepseek) | 1 | 2026-10-19 | 2026-10-23 | 双击 start-qwen.bat，六分钟跑起 128K 上下文的 Qwen3.5-9B+deepseekUI优化插件 |
| 70 | [MeetoHub/dsh-fnos](https://github.com/MeetoHub/dsh-fnos) | 1 | 2026-10-23 | 2026-10-23 | 飞牛 fnOS 的 DSH 插件：远程授权登录、文件/文件夹 @引用选择器、目录树后台缓存 |
| 71 | [menghuanshiguang/dsh-sunder](https://github.com/menghuanshiguang/dsh-sunder) | 1 | 2026-10-21 | 2026-10-23 | Open-source Sunder bundle for DeepSeek Harness: unrestricted prompt pack, release announcements, and update control. |
| 72 | [MingHuanYue/dsh-tide-memory](https://github.com/MingHuanYue/dsh-tide-memory) | 1 | 2026-10-23 | 2026-10-23 | 潮汐记忆：给 DeepSeek Harness 一份会淡忘、会过时、看得见的长期记忆（带设置页图形界面） |
| 73 | [MingHuanYue/dsh-tide-whisper](https://github.com/MingHuanYue/dsh-tide-whisper) | 1 | 2026-10-23 | 2026-10-23 | 潮声：让 DSH 里的 AI 不定时自己开口——随机间隔、随机沉默，配设置页开关 |
| 74 | [MissZQM/dsh-feiyu-avatar](https://github.com/MissZQM/dsh-feiyu-avatar) | 1 | 2026-10-23 | 2026-10-23 | 给 DeepSeek Harness 的 Web 聊天加上双侧头像 |
| 75 | [nabehkh-source/primesync-ai-studio](https://github.com/nabehkh-source/primesync-ai-studio) | 1 | 2026-09-12 | 2026-10-23 | PrimeSync AI Studio — MCP documentation and experimental DeepSeek Harness plugin for strategy building, audits and backtest research. |
| 76 | [Nirvana-Jie/dsh-lark-agent](https://github.com/Nirvana-Jie/dsh-lark-agent) | 1 | 2026-10-23 | 2026-10-23 | Reach your DeepSeek Harness assistant from Feishu / Lark · 离开电脑，也能在飞书里找到你的 DeepSeek Harness 助手 |
| 77 | [offzen/dsh-gitea-search](https://github.com/offzen/dsh-gitea-search) | 1 | 2026-10-22 | 2026-10-23 | dsh-plugin |
| 78 | [Player-MINEPIG/dsh-message-console](https://github.com/Player-MINEPIG/dsh-message-console) | 1 | 2026-10-15 | 2026-10-23 | A message aggregation platform plugin. |
| 79 | [prgrmrwy/dsh-auto-model-routing](https://github.com/prgrmrwy/dsh-auto-model-routing) | 1 | 2026-10-23 | 2026-10-23 | DeepSeek Harness plugin: use Jev to adjust reasoning effort per turn without changing the selected model, with configurable subagent routing |
| 80 | [QingshanYousi/DSH-Plugin-RedAi-Nav](https://github.com/QingshanYousi/DSH-Plugin-RedAi-Nav) | 1 | 2026-10-23 | 2026-10-23 | DeepSeek Harness 的开发者网址导航：搜索与键盘直达，支持收藏。 |
| 81 | [qyy2005/dsh-plugin-labels](https://github.com/qyy2005/dsh-plugin-labels) | 1 | 2026-10-23 | 2026-10-23 | 给 DSH（DeepSeek Harness）已装插件配中文名与一句话说明：官方「插件」页（含插件包卡片与详情）原地显示中文，启动时自动翻译新插件，无 UI 入口。Chinese names for installed DSH plugins. MIT licensed. |
| 82 | [sadkga/dsh-restart-handoff](https://github.com/sadkga/dsh-restart-handoff) | 1 | 2026-10-23 | 2026-10-23 | 让AI在对话里重启 DeepSeek Harness，然后自己回到工作里 —— 不需要人打字说「继续」。 |
| 83 | [saul-dsh/dsh-prompt-enhancer](https://github.com/saul-dsh/dsh-prompt-enhancer) | 1 | 2026-10-23 | 2026-10-23 | Chat-box prompt auto-enhancement plugin for DeepSeek Harness (dsh): rewrites rough input into a clear, self-contained prompt before it reaches the model. |
| 84 | [seven0813/dsh-jump-button](https://github.com/seven0813/dsh-jump-button) | 1 | 2026-10-23 | 2026-10-23 | DSH Web 聊天的浮动跳转按钮：一键回到本轮提问开头，或回到最新输出结尾。 |
| 85 | [songmingjun3/dsh-kitchen-plugin](https://github.com/songmingjun3/dsh-kitchen-plugin) | 1 | 2026-10-22 | 2026-10-23 | A kitchen of DeepSeek Harness sessions: stations, tickets, long jobs, and the bell that wakes them. |
| 86 | [sunjay-lee/dsh-k-on-pet](https://github.com/sunjay-lee/dsh-k-on-pet) | 1 | 2026-10-23 | 2026-10-23 | 将k_on桌宠移植到dsh里 |
| 87 | [sweet560/dsh-plugin-deepseek-chat](https://github.com/sweet560/dsh-plugin-deepseek-chat) | 1 | 2026-10-23 | 2026-10-23 | DeepSeek Chat (chat.deepseek.com) as a DSH sidebar panel: full main-area chat, last-conversation memory, crash containment. |
| 88 | [taotao7/dsh-pretty-cool](https://github.com/taotao7/dsh-pretty-cool) | 1 | 2026-10-23 | 2026-10-23 | Compact OMP-inspired UI for DeepSeek Harness: native controls, light/dark themes, and an author-maintained Discover index |
| 89 | [use3346631993/dsh-xiaod-pet](https://github.com/use3346631993/dsh-xiaod-pet) | 1 | 2026-10-22 | 2026-10-23 | 小D桌宠（dsh-xiaod-pet）· DeepSeek Harness 插件：鲸鱼正太女仆装桌宠 + 每轮 token/思考时间立牌 + 液态玻璃主题。搜 dsh-xiaod-pet 或 dsh xiaod pet |
| 90 | [wanxi123w/dsh-theme-theresa](https://github.com/wanxi123w/dsh-theme-theresa) | 1 | 2026-10-23 | 2026-10-23 | 给 DeepSeek Harness 的「特蕾西娅」主题插件：象牙白 / 墨 / 淡玫瑰配色，整页背景图、毛玻璃侧栏、侧栏立绘、四角金线、落款签名与开屏动画，全部可在设置里调。 |
| 91 | [winlin926/dsh-roam](https://github.com/winlin926/dsh-roam) | 1 | 2026-10-23 | 2026-10-23 | 把电脑上的 DeepSeek Harness 会话漫游到手机：浏览器扫码即用，AI-HUB App 共用同一地址和配对码。 |
| 92 | [Wyxcn445/dsh-skill-manger](https://github.com/Wyxcn445/dsh-skill-manger) | 1 | 2026-10-23 | 2026-10-23 | 简约的技能管理包 |
| 93 | [xfjsssq/dsh-model-hub](https://github.com/xfjsssq/dsh-model-hub) | 1 | 2026-10-23 | 2026-10-23 | DeepSeek Harness 模型中心插件 — 双栏模型选择器（左提供商 / 右模型）+ 悬浮能力卡，可直接在面板里添加提供商、刷新获取模型、删除模型；零构建、零 npm 依赖。 |
| 94 | [yiliang114/dsh-session-deck](https://github.com/yiliang114/dsh-session-deck) | 1 | 2026-10-22 | 2026-10-23 | Activity and Favorites views for DeepSeek Harness: track running, waiting, and unread sessions across workspaces. |
| 95 | [yunshu-iii/dsh-wallpaper-theme](https://github.com/yunshu-iii/dsh-wallpaper-theme) | 1 | 2026-10-23 | 2026-10-23 | DSH Harness 桌面端插件：整窗壁纸 + 分级磨砂玻璃与外观面板 \| Desktop wallpaper &amp; glass plugin for DeepSeek Harness |
| 96 | [Zc7hYz/dsh-taste](https://github.com/Zc7hYz/dsh-taste) | 1 | 2026-10-23 | 2026-10-23 | DSH 界面设计插件：一句话给出多个气质不同的方案，按真实站点 DESIGN.md 的 token 实现，写完用 61 条规则自检。 |
| 97 | [ZengZichao/dsh-revbayes-forge](https://github.com/ZengZichao/dsh-revbayes-forge) | 1 | 2026-10-23 | 2026-10-23 | RevBayes script generation, static validation, and runtime validation plugin for DeepSeek Harness (DSH) — one plugin, 13 model packs, bilingual docs. |
| 98 | [ZXEB/dsh-purge](https://github.com/ZXEB/dsh-purge) | 1 | 2026-10-23 | 2026-10-23 | dsh-purge v1.1.71 完整源码镜像（原仓库 YuJunZhiXue/dsh-purge 与 npm 包均已删除）。DeepSeek Harness 破甲 / 红队评测插件，支持官方 web 与桌面宿主。 |
| 99 | [060703Hyj/dsh-aqua-dsh021](https://github.com/060703Hyj/dsh-aqua-dsh021) | 0 | 2026-10-23 | 2026-10-23 | Aqua glass theme for DeepSeek Harness, adapted for DSH 0.2.1-rc.2 (only tested on 0.2.1-rc.2) |
| 100 | [1771486218/dsh-workspace-search](https://github.com/1771486218/dsh-workspace-search) | 0 | 2026-10-23 | 2026-10-23 | Workspace full-text search for DeepSeek Harness: grep file contents from the GUI, with filters, context preview and jump-to-line. |
| 101 | [17861102832/hanlin-scholar-agent](https://github.com/17861102832/hanlin-scholar-agent) | 0 | 2026-09-02 | 2026-10-23 | 翰林·修文卷 — 期刊格式修复学术 Agent：单文件零依赖，集成清华 THUDM 及全球权威学术写作 Agent 技能，DSH 视觉皮肤，一键修复转发走样的论文排版并导出 WPS/Word 直开的 .doc。 |
| 102 | [18383337799/dsh-conversation-aurora](https://github.com/18383337799/dsh-conversation-aurora) | 0 | 2026-10-23 | 2026-10-23 | Ten animated backgrounds for the DSH conversation pane. |
| 103 | [280832849/dsh-rewind-lite](https://github.com/280832849/dsh-rewind-lite) | 0 | 2026-10-23 | 2026-10-23 | DeepSeek Harness 插件：同窗口内就地回退对话到更早的用户消息，可一并还原被改过的文件（Claude Code /rewind 语义） |
| 104 | [379385796-sys/dsh-ai-exporter](https://github.com/379385796-sys/dsh-ai-exporter) | 0 | 2026-10-23 | 2026-10-23 | Export DSH conversations to TXT, Markdown and searchable PDF with native Windows destination selection. |
| 105 | [379385796-sys/dsh-chat-comfort](https://github.com/379385796-sys/dsh-chat-comfort) | 0 | 2026-10-23 | 2026-10-23 | Conservative chat reading enhancements for Windows DSH Desktop 0.2.1-rc.2. |
| 106 | [379385796-sys/dsh-prompt-inject](https://github.com/379385796-sys/dsh-prompt-inject) | 0 | 2026-10-23 | 2026-10-23 | Maintained adaptation of H1a3x/dsh-prompt-inject for DSH Desktop 0.2.1-rc.2; not an official upstream release. |
| 107 | [439436269-ctrl/dsh-makerworld](https://github.com/439436269-ctrl/dsh-makerworld) | 0 | 2026-10-23 | 2026-10-23 | MakerWorld 出货流水线 skill 包：把「设计 → 校核 → 文案 → 渲染 → 发布模型 → 加打印配置」内置进 DeepSeek Harness，装完即出现在 agent 技能目录 |
| 108 | [439436269-ctrl/dsh-preview-blender](https://github.com/439436269-ctrl/dsh-preview-blender) | 0 | 2026-10-23 | 2026-10-23 | Blender .blend preview for DSH: headless GLB export, cached, with a dependency-free WebGL viewport and scene statistics. |
| 109 | [439436269-ctrl/dsh-preview-market](https://github.com/439436269-ctrl/dsh-preview-market) | 0 | 2026-10-23 | 2026-10-23 | Vertical preview market for DeepSeek Harness: catalog, installed inventory, and install/update entry points for preview plugins. |
| 110 | [439436269-ctrl/dsh-preview-media](https://github.com/439436269-ctrl/dsh-preview-media) | 0 | 2026-10-23 | 2026-10-23 | Media preview for DSH: video and audio in the right-Sidebar document preview, with HTTP Range streaming and desktop seek. |
| 111 | [439436269-ctrl/dsh-preview-snip](https://github.com/439436269-ctrl/dsh-preview-snip) | 0 | 2026-10-23 | 2026-10-23 | Circle a region of an image/PDF preview or quote selected text into the DSH composer. |
| 112 | [439436269-ctrl/dsh-preview-stl](https://github.com/439436269-ctrl/dsh-preview-stl) | 0 | 2026-10-23 | 2026-10-23 | STL preview for DSH: binary/ASCII mesh parsing in the browser, a dependency-free WebGL viewport, and print statistics. |
| 113 | [544244857/dsh-work-assistant](https://github.com/544244857/dsh-work-assistant) | 0 | 2026-10-23 | 2026-10-23 | DSH 工作助理插件：微信机器人通道、SQLite 工作账本、知识库与人员关系图谱、定时提醒、任务委派 |
| 114 | [54nanmiao/dsh-peak-reminder](https://github.com/54nanmiao/dsh-peak-reminder) | 0 | 2026-10-23 | 2026-10-23 | DSH plugin: reminds you when DeepSeek is on peak-hour pricing, every few minutes while peak hours are on, silent during valley hours. |
| 115 | [643048695/dsh-mt-download](https://github.com/643048695/dsh-mt-download) | 0 | 2026-10-23 | 2026-10-23 | Multi-channel file downloader for DeepSeek Harness: 16-connection aria2c acceleration with automatic single-stream fallback. |
| 116 | [66jiujiu99/dsh-agent-browser-auto](https://github.com/66jiujiu99/dsh-agent-browser-auto) | 0 | 2026-10-23 | 2026-10-23 | DeepSeek Harness 桌面版的 Agent 浏览器（自动）：用 browser_* 工具看见并操作右侧边栏里一个用户可见的浏览器页面（15 个工具，含 CDP 深度模式）。 |
| 117 | [66jiujiu99/dsh-plugin-remote-mobile](https://github.com/66jiujiu99/dsh-plugin-remote-mobile) | 0 | 2026-10-23 | 2026-10-23 | DSH 手机同步：把桌面端完整 Web UI 反代到手机（/m），带设备配对、只读策略与审批路由。手机只负责看和点，所有操作在 PC 执行。 |
| 118 | [746445568/dsh-next-message](https://github.com/746445568/dsh-next-message) | 0 | 2026-10-23 | 2026-10-23 | DeepSeek Harness 下一句预测插件：对话结束后显示灰字建议，Tab 填入、Esc 忽略，始终由你发送。  |
| 119 | [7AAAAAH/dsh-restart-app](https://github.com/7AAAAAH/dsh-restart-app) | 0 | 2026-10-23 | 2026-10-23 | Restart DSH: a sidebar button that restarts the whole DeepSeek Harness desktop app (Electron shell and Host) and reloads the page when it is back. |
| 120 | [810535323/dsh-agent-hub](https://github.com/810535323/dsh-agent-hub) | 0 | 2026-10-23 | 2026-10-23 | 微信主控与多设备 Harness 固定会话任务插件 \| WeChat orchestration and persistent-session tasks for DeepSeek Harness |
| 121 | [a404670637-ch/dsh-session-prompt](https://github.com/a404670637-ch/dsh-session-prompt) | 0 | 2026-10-23 | 2026-10-23 | Per-conversation pinned prompt for DeepSeek Harness (DSH) Web: sent as a system-prompt section, never folded by context compression. |
| 122 | [a5899/dsh-lan-peers](https://github.com/a5899/dsh-lan-peers) | 0 | 2026-10-23 | 2026-10-23 | DSH plugin: LAN peer discovery and cross-device ask/tell between DSH installs on the same subnet. Off by default; only acts when the user asks. Adds a settings page under Settings &gt; Plugins. |
| 123 | [advance-lion/dsh-history-plugin](https://github.com/advance-lion/dsh-history-plugin) | 0 | 2026-10-16 | 2026-10-23 | DSH 插件安装历史：本机记账、按设备归类、经百度网盘跨设备同步、勾选批量重装 |
| 124 | [akshayDev17/quiz-app](https://github.com/akshayDev17/quiz-app) | 0 | 2026-10-23 | 2026-10-23 | Invite-only, timed, multiple-choice quizzes. Python Cloudflare Worker + D1, Next.js static export, Cloudflare Access (OTP). |
| 125 | [Alancere/dsh-web-search-yuanbao](https://github.com/Alancere/dsh-web-search-yuanbao) | 0 | 2026-10-23 | 2026-10-23 | Tencent Yuanbao Search (SearchPro) for DeepSeek Harness: ctx.web search provider + model-facing yuanbao_search tool |
| 126 | [AlbertZJ/dsh-knowledge-work](https://github.com/AlbertZJ/dsh-knowledge-work) | 0 | 2026-10-23 | 2026-10-23 | Knowledge-work role skills for DeepSeek Harness, ported from anthropics/knowledge-work-plugins (22 role plugins, 225 skills). |
| 127 | [Aliax-LI/dsh-photoshop-genfill](https://github.com/Aliax-LI/dsh-photoshop-genfill) | 0 | 2026-10-23 | 2026-10-23 | Photoshop retouch agent for DeepSeek Harness: native photoshop-mcp tools, verified canvas previews, and separately configurable image generation / edit models. |
| 128 | [Anguis-L/dsh-plugin-trust-audit](https://github.com/Anguis-L/dsh-plugin-trust-audit) | 0 | 2026-10-23 | 2026-10-23 | DSH 插件：只读审计插件 HTTP 路由是否真的做了鉴权栅栏（fenced / open / absent / unknown） |
| 129 | [Anlerway/dsh-session-explorer](https://github.com/Anlerway/dsh-session-explorer) | 0 | 2026-10-17 | 2026-10-23 | 仿windows资源管理器的Deepseek Harness会话虚拟映射管理器 |
| 130 | [Arekosandoru/dsh-pet-ru](https://github.com/Arekosandoru/dsh-pet-ru) | 0 | 2026-10-23 | 2026-10-23 | Русская локализация dsh-pet для DeepSeek Harness: оверлей с переводом и установщиком (dsh-pet 0.3.8) |
| 131 | [Arfrsa/dsh-sidebar-sections](https://github.com/Arfrsa/dsh-sidebar-sections) | 0 | 2026-10-23 | 2026-10-23 | Unofficial DSH sidebar sections plugin: splits the workspace list into Active / Session tasks / Inactive, keeps the official search, menus and drag-and-drop, and switches back to the shipped list in one click. |
| 132 | [AssassinVIX/fairy-zzz-plugin](https://github.com/AssassinVIX/fairy-zzz-plugin) | 0 | 2026-10-23 | 2026-10-23 | A theme that completely replaces the Web interface of DeepSeek Harness with the H.D.D terminal theme of "Fairy" from the game "Zenless Zone Zero", including the boot animation |
| 133 | [Athosoo/dsh-git-graph-sidebar](https://github.com/Athosoo/dsh-git-graph-sidebar) | 0 | 2026-10-23 | 2026-10-23 | Git commit graph and multi-repository browsing for DeepSeek Harness: a branch chip in the composer plus a better-sidebar tab that discovers every repository below the workspace directory and draws its commit graph as an SVG lane canvas. |
| 134 | [Ayowait/dsh-send-photos](https://github.com/Ayowait/dsh-send-photos) | 0 | 2026-10-17 | 2026-10-23 | Declare image input for relay routes whose endpoint omits modality metadata, so DeepSeek Harness admits photos instead of refusing them. |
| 135 | [azliar/dsh-skill-gallery](https://github.com/azliar/dsh-skill-gallery) | 0 | 2026-10-22 | 2026-10-23 | skill可视化调用 |
| 136 | [Bababoooi/dsh_resume_warehouse](https://github.com/Bababoooi/dsh_resume_warehouse) | 0 | 2026-10-23 | 2026-10-23 | A dsh plugin for people who need to customize their resume with daily conversation and specific JD. |
| 137 | [backkom/dsh-at-file-everything](https://github.com/backkom/dsh-at-file-everything) | 0 | 2026-10-23 | 2026-10-23 | 在windows平台用everything实现@file |
| 138 | [baigo8/dsh-page-annotate](https://github.com/baigo8/dsh-page-annotate) | 0 | 2026-10-23 | 2026-10-23 | DSH page annotate 网页标注插件，用于页面批注、元素标记 |
| 139 | [baigo8/dsh-session-immersion](https://github.com/baigo8/dsh-session-immersion) | 0 | 2026-10-23 | 2026-10-23 | DSH会话沉浸模式插件，优化会话阅读体验 |
| 140 | [Barry-1212/dsh-webscout](https://github.com/Barry-1212/dsh-webscout) | 0 | 2026-10-23 | 2026-10-23 | Tavily-backed web search (Search) and page fetch (Fetch) for DeepSeek Harness. |
| 141 | [basaltfold/dsh-ofm-codearts-pin](https://github.com/basaltfold/dsh-ofm-codearts-pin) | 0 | 2026-10-23 | 2026-10-23 | 把 dsh-our-free-model 钉在 2.5.8（最后一个带可用华为云 CodeArts 渠道的版本）并在每次启动自愈回滚：逐文件 SHA-256 校验、payload 验签失败即弃用、失败整体还原、升级后自动重打，同时关掉会把华为云删掉的自动更新检查 |
| 142 | [beiyanpiki/dsh-ulw-plan](https://github.com/beiyanpiki/dsh-ulw-plan) | 0 | 2026-10-23 | 2026-10-23 | omo explore -&gt; plan -&gt; execute workflow for DeepSeek Harness: /ulw-plan, /ulw-execute, four read-only role agents, inline task, and a plan-mode write guard. |
| 143 | [bgfhsnm/dsh-ask-alert](https://github.com/bgfhsnm/dsh-ask-alert) | 0 | 2026-10-23 | 2026-10-23 | DSH plugin: native Windows alert (toast + taskbar flash + always-on-top card) when the assistant asks a question, waits for approval, or finishes a task. |
| 144 | [bgfhsnm/dsh-text2img](https://github.com/bgfhsnm/dsh-text2img) | 0 | 2026-10-23 | 2026-10-23 | DeepSeek Harness 插件：把本机 ComfyUI 文生图注册成原生 text2img 工具（FLUX / Qwen-Image / SDXL） |
| 145 | [big-li99/dsh-zentao-panel](https://github.com/big-li99/dsh-zentao-panel) | 0 | 2026-10-23 | 2026-10-23 | DeepSeekRuntime 禅道工作台插件：右侧栏查看指派给我的任务/Bug/需求，一键转成 DSH 对话上下文（禅道截图自动转真实图片附件） |
| 146 | [Blake-John/dsh-remote-control](https://github.com/Blake-John/dsh-remote-control) | 0 | 2026-10-23 | 2026-10-23 | A plugin help you control the dsh from remote (you need to setup your own network by tailscale or zerotier) |
| 147 | [br0caz/dsh-composer-scratchpad](https://github.com/br0caz/dsh-composer-scratchpad) | 0 | 2026-10-23 | 2026-10-23 | A one-box scratchpad pinned to the DSH composer — type an idea without sending it. |
| 148 | [bxzfxl/dsh-config-sync](https://github.com/bxzfxl/dsh-config-sync) | 0 | 2026-10-23 | 2026-10-23 | DSH multi-device config sync plugin: Git-based capture/apply of profiles, plugin manifests and skills |
| 149 | [caelricluo/dsh-peer](https://github.com/caelricluo/dsh-peer) | 0 | 2026-10-23 | 2026-10-23 | Cross-harness peer bridge for DeepSeek Harness: DSH &lt;-&gt; Claude Code / Codex CLI / Codex Desktop, with explicit model, reasoning-effort and context control. |
| 150 | [CatLollipop/dsh-composer-draft-cache](https://github.com/CatLollipop/dsh-composer-draft-cache) | 0 | 2026-10-22 | 2026-10-23 | DeepSeek Harness 输入框草稿缓存插件：按工作区缓存新会话草稿、按会话缓存历史会话草稿，切换后自动恢复；已发送或已清空的草稿不会再出现，直到关闭应用。 |
| 151 | [cccodder/dsh-remote-console](https://github.com/cccodder/dsh-remote-console) | 0 | 2026-10-23 | 2026-10-23 | Right-sidebar SSH remote console for DeepSeek Harness: host menu, PTY capture, unified human+agent log, and agent tools that write into the same terminal. |
| 152 | [ccr-wer/dsh-copilot-vision](https://github.com/ccr-wer/dsh-copilot-vision) | 0 | 2026-10-21 | 2026-10-23 | Computer Use enhancement plugin for DeepSeek Harness (DSH). 纯 JS 视觉差分、网格位置编码、长程任务闭环与人机共驾授权。 |
| 153 | [Century-Ula/dsh-zeroscript](https://github.com/Century-Ula/dsh-zeroscript) | 0 | 2026-10-22 | 2026-10-23 | Drive Roblox Studio from DeepSeek Harness (DSH): the ZeroScript bridge as a native plugin - 28+ Studio tools, web console, windowless auto-start, no browser extension. |
| 154 | [chaonimadesazhi/dsh-skill-forge](https://github.com/chaonimadesazhi/dsh-skill-forge) | 0 | 2026-10-23 | 2026-10-23 | Distill a conversation into a reusable SKILL.md for DeepSeek Harness. |
| 155 | [chc-1986/dsh-session-suite](https://github.com/chc-1986/dsh-session-suite) | 0 | 2026-10-23 | 2026-10-23 | Cross-session chat, a directory-as-queue mailbox with a gatekeeper, a Session Hub panel and in-place session handover for DeepSeek Harness (DSH) — one Cordis plugin. |
| 156 | [cheeri020/dsh-lineup-manager](https://github.com/cheeri020/dsh-lineup-manager) | 0 | 2026-10-23 | 2026-10-23 | Lineup manager for DeepSeek Harness: choose which model lineups appear in the model picker, grouped by provider, with a live refresh that flags additions and removals |
| 157 | [chenwei2000007/dsh-peak-light](https://github.com/chenwei2000007/dsh-peak-light) | 0 | 2026-10-23 | 2026-10-23 | Peak/off-peak pricing light for the DeepSeek Harness sidebar: red at peak, green off-peak, hover for a countdown. |
| 158 | [ChenWeiqi12345/dsh-deepy-pet](https://github.com/ChenWeiqi12345/dsh-deepy-pet) | 0 | 2026-10-21 | 2026-10-23 | A royal-blue pixel whale companion for DeepSeek Harness — perches on the composer, follows live agent state, and cruises every 30 seconds. |
| 159 | [Clukay-Fun/dsh-gpt-link](https://github.com/Clukay-Fun/dsh-gpt-link) | 0 | 2026-10-21 | 2026-10-23 | DeepSeek Harness plugin: sign in with ChatGPT, use GPT models, and see the account's quota. |
| 160 | [CodeIntegrity/dsh-semble](https://github.com/CodeIntegrity/dsh-semble) | 0 | 2026-10-23 | 2026-10-23 | Semantic code search for DeepSeek Harness: the Semble index as two native MCP tools (search / find_related), so an agent finds code by behaviour instead of guessing file names. |
| 161 | [crystal-hang/dsh-branch-flow](https://github.com/crystal-hang/dsh-branch-flow) | 0 | 2026-10-22 | 2026-10-23 | DSH Web GUI plugin: rule-checked branches from production6, convention-checked commits, AI branch names, one-click merge into stage. |
| 162 | [cvnices8-byte/dsh-paper-matrix](https://github.com/cvnices8-byte/dsh-paper-matrix) | 0 | 2026-10-23 | 2026-10-23 | Bilingual, evidence-linked paper reading matrix for DeepSeek Harness. Local SQLite library, PDF page citations, and human edits. |
| 163 | [DaiYiqq/dsh-daiyi-aimy-skill](https://github.com/DaiYiqq/dsh-daiyi-aimy-skill) | 0 | 2026-10-23 | 2026-10-23 | AI 小秘 (aimy-skill) v3 · 授权范围内的侦察与 Web 漏洞检测插件 for DeepSeek Harness｜8 个原生工具 + 8 个中文技能 · 默认拒绝的授权范围护栏 · 只做检测、零运行时依赖。再开发自 zxz0119/aimy-sikll。 |
| 164 | [Dalld/dsh-ssh-plugin](https://github.com/Dalld/dsh-ssh-plugin) | 0 | 2026-10-23 | 2026-10-23 | SSH for DeepSeek Harness agents: run commands and move files over SSH while private keys stay inside the Host process. |
| 165 | [DarkDarkdDarkWine/dsh-quota-hub](https://github.com/DarkDarkdDarkWine/dsh-quota-hub) | 0 | 2026-10-23 | 2026-10-23 | DeepSeek Harness plugin: GLM Coding Plan quota monitor (sidebar badge + chat dock + settings) |
| 166 | [Dax233/dsh-outbound-proxy](https://github.com/Dax233/dsh-outbound-proxy) | 0 | 2026-10-23 | 2026-10-23 | DeepSeek Harness plugin: route outbound HTTP(S) through a local proxy (Clash/mihomo). |
| 167 | [Dax233/dsh-sidebar-browser-control](https://github.com/Dax233/dsh-sidebar-browser-control) | 0 | 2026-10-23 | 2026-10-23 | DeepSeek Harness plugin: Agent Browser in the sidebar (snapshot/click/type/scroll/screenshot, in-page virtual cursor). |
| 168 | [deepestevan/dsh-delete-guard](https://github.com/deepestevan/dsh-delete-guard) | 0 | 2026-10-23 | 2026-10-23 | Force every DeepSeek Harness file deletion through the OS Recycle Bin — deny the call, redirect to a file_trash tool. |
| 169 | [Deepsleep-one/dsh-gpt-niang](https://github.com/Deepsleep-one/dsh-gpt-niang) | 0 | 2026-10-23 | 2026-10-23 | DSH 桌宠额度挂件：可拖拽 / 抛掷 / 散步 / 打瞌睡的桌宠，点开是 ChatGPT · Codex 订阅额度气泡（DeepSeek Harness plugin） |
| 170 | [derkinL/dsh-remembers](https://github.com/derkinL/dsh-remembers) | 0 | 2026-10-23 | 2026-10-23 | Long-term memory for DeepSeek Harness, built for companion AI. It says it does not remember instead of making things up. 情感陪伴向记忆插件：向量 + 中文 BM25 + 分层衰减。 |
| 171 | [dmscode/dsh-cloudflare-media](https://github.com/dmscode/dsh-cloudflare-media) | 0 | 2026-10-23 | 2026-10-23 | Cloudflare Workers AI multimedia tools for DeepSeek Harness: image generation, TTS and STT from the free plan, with a settings page for per-capability model selection. |
| 172 | [Dogtiti/dsh-plugin-usage-panel](https://github.com/Dogtiti/dsh-plugin-usage-panel) | 0 | 2026-10-23 | 2026-10-23 | Provider usage panel for DeepSeek Harness: shows the remaining share of each quota window (GLM Coding Plan today) as a chip beside the model selector, with a detail popover. |
| 173 | [douglarek/dsh-memory](https://github.com/douglarek/dsh-memory) | 0 | 2026-10-23 | 2026-10-23 | Cross-session persistent memory plugin for DeepSeek Harness (DSH) |
| 174 | [dream-fish69/dsh-session-workspace-organizer](https://github.com/dream-fish69/dsh-session-workspace-organizer) | 0 | 2026-10-22 | 2026-10-23 | Move a DeepSeek Harness workspace folder to a new path — session logs' cwd is rewritten too — and give every new session its own output folder under sessions/.DSH 插件：迁移工作区文件夹并改写会话日志的 cwd；为每个新会话建立独立输出目录；支持空闲会话的移动与删除。 |
| 175 | [drliuhuan/dsh-plugin-feishu-im](https://github.com/drliuhuan/dsh-plugin-feishu-im) | 0 | 2026-10-23 | 2026-10-23 | DeepSeek Harness 的飞书 IM 插件：扫码创建专属飞书应用，任务完成/审批/提问推送到飞书，并可在飞书里指挥 DSH。 |
| 176 | [ECHOUniverse/dsh-balance](https://github.com/ECHOUniverse/dsh-balance) | 0 | 2026-10-23 | 2026-10-23 | DeepSeek Harness sidebar plugin: show your DeepSeek account balance above the account row |
| 177 | [eryucheng/dsh-suzu-memory](https://github.com/eryucheng/dsh-suzu-memory) | 0 | 2026-10-23 | 2026-10-23 | Suzu Memory for DeepSeek Harness: per-session long-term memory, persona and compaction settings |
| 178 | [esketids/dsh-forget-session-en](https://github.com/esketids/dsh-forget-session-en) | 0 | 2026-10-22 | 2026-10-23 | English fork of dsh-forget-session — a two-step Forget session action for DeepSeek Harness |
| 179 | [Exagone313/dsh-subagent-sidebar](https://github.com/Exagone313/dsh-subagent-sidebar) | 0 | 2026-10-23 | 2026-10-23 | A right-sidebar tab for DeepSeek Harness that lists subagents and opens them in one click |
| 180 | [fantasy123246/dsh-session-namer](https://github.com/fantasy123246/dsh-session-namer) | 0 | 2026-10-23 | 2026-10-23 | Better session titles for DeepSeek Harness: replaces the greeting-prone title provider, adds a regenerate tool and header button. |
| 181 | [feely0208/dsh-docx-batch](https://github.com/feely0208/dsh-docx-batch) | 0 | 2026-10-23 | 2026-10-23 | Word 批量处理：替换 / 合并 / 提取文本 / 页眉页脚 / 转 Markdown，一次处理整目录 |
| 182 | [feely0208/dsh-git-guard](https://github.com/feely0208/dsh-git-guard) | 0 | 2026-10-23 | 2026-10-23 | Git 提交前检查：密钥 / 大文件 / 冲突标记 / 调试残留 / commit 信息规范，可挂 pre-commit |
| 183 | [feely0208/dsh-media-batch](https://github.com/feely0208/dsh-media-batch) | 0 | 2026-10-23 | 2026-10-23 | 视频批量处理：压缩 / 转码 / 抽帧 / 加字幕 / 加水印 / 提取音频（ffmpeg） |
| 184 | [feely0208/dsh-pdf-kit](https://github.com/feely0208/dsh-pdf-kit) | 0 | 2026-10-23 | 2026-10-23 | PDF 工具箱：合并 / 拆分 / 压缩 / 加水印 / 提取文本与图片 |
| 185 | [feely0208/dsh-web-snapshot](https://github.com/feely0208/dsh-web-snapshot) | 0 | 2026-10-23 | 2026-10-23 | 网页快照：URL / 批量 / sitemap → Markdown（标题、正文、日期、来源），离线可测 |
| 186 | [feely0208/dsh-xlsx-batch](https://github.com/feely0208/dsh-xlsx-batch) | 0 | 2026-10-23 | 2026-10-23 | Excel 批量处理：合并 / 清洗空行 / 汇总 / 导出 CSV，一次处理整目录 |
| 187 | [feigo313/dsh-av-preview](https://github.com/feigo313/dsh-av-preview) | 0 | 2026-10-23 | 2026-10-23 | DSH 侧边栏的内联音视频预览插件（dsh-better-sidebar 伴生）：自带 /media 路由支持 HTTP Range，mp4/mkv/mp3/flac 直接播、可拖时间轴，无需先下载 |
| 188 | [Floweroid/dsh-sidebar-ingblock](https://github.com/Floweroid/dsh-sidebar-ingblock) | 0 | 2026-10-23 | 2026-10-23 | A collapsible "In Progress" group for the DSH Web sidebar: collect sessions from each session row's ... menu, pin the shortlist above the workspace list, reorder by dragging, and keep it across restarts. |
| 189 | [flowers-59f/dsh-petpal](https://github.com/flowers-59f/dsh-petpal) | 0 | 2026-10-23 | 2026-10-23 | PetPal: petdex.dev desktop pets for DeepSeek Harness |
| 190 | [fssae/DSH-tool](https://github.com/fssae/DSH-tool) | 0 | 2026-10-23 | 2026-10-23 | 转接trae的免费额度给DSH的插件，并提供自动签到，订阅池和额度查询 |
| 191 | [FYTXY/dsh-empty-turn-guard](https://github.com/FYTXY/dsh-empty-turn-guard) | 0 | 2026-10-23 | 2026-10-23 | DSH plugin: turn a markup-only empty turn into a retryable EMPTY_RESPONSE error, so the model no longer stops half-way |
| 192 | [g65tph4ycm-svg/dsh-balance-pill](https://github.com/g65tph4ycm-svg/dsh-balance-pill) | 0 | 2026-10-23 | 2026-10-23 | DeepSeek Harness plugin: a floating corner pill showing your signed-in DeepSeek account balance, with low-balance color warnings. |
| 193 | [GaoHu1997/dsh-token-total](https://github.com/GaoHu1997/dsh-token-total) | 0 | 2026-10-21 | 2026-10-23 | DSH token 用量统计看板与会话树用量分析插件 |
| 194 | [go-enols/dsh-plugin-opencode-free](https://github.com/go-enols/dsh-plugin-opencode-free) | 0 | 2026-10-23 | 2026-10-23 | Use OpenCode Zen's anonymous free models inside DeepSeek Harness (DSH) through a native dsh-llm adapter. |
| 195 | [greatZhaoFD/dsh-approval-alert](https://github.com/greatZhaoFD/dsh-approval-alert) | 0 | 2026-10-23 | 2026-10-23 | DeepSeek Harness (DSH) 审批提醒插件：待审批/待回答时弹出全窗口卡片并播放提示音。轻量客户端 bundle，无第三方依赖，可在 DSH 插件管理器一键安装。 |
| 196 | [habaneraa/dsh-desktop-host-switcher](https://github.com/habaneraa/dsh-desktop-host-switcher) | 0 | 2026-10-23 | 2026-10-23 | 在 Windows 桌面端中同时使用本机 DSH 与 WSL DSH，两侧设置和会话保持独立 |
| 197 | [hackmagic/AI-To-Sheet-Music](https://github.com/hackmagic/AI-To-Sheet-Music) | 0 | 2026-10-20 | 2026-10-23 | 用 AI 把一个音乐文件变成可以直接照着自弹自唱的网页吉他谱 |
| 198 | [HalfDone03/dsh-review-desk](https://github.com/HalfDone03/dsh-review-desk) | 0 | 2026-10-23 | 2026-10-23 | DSH private Win32 review desktop: prepare stays in background, open switches explicitly. 中文：DSH 后台复验桌面 |
| 199 | [hanmoxu9/dsh-taskbar-glow](https://github.com/hanmoxu9/dsh-taskbar-glow) | 0 | 2026-10-23 | 2026-10-23 | DSH任务栏发光提醒插件 |
| 200 | [houzi5940/dsh-voice](https://github.com/houzi5940/dsh-voice) | 0 | 2026-10-23 | 2026-10-23 | Full-duplex voice for DeepSeek Harness (fork of haoku123/dsh-voice): streamed ASR, TTS with first-sentence/first-paragraph modes, barge-in, message replay, live settings. |
| 201 | [hualuo520-h/dsh-connect-scnet](https://github.com/hualuo520-h/dsh-connect-scnet) | 0 | 2026-10-23 | 2026-10-23 | 把超算互联网（SCNet）计算服务客户端已登录的模型接入 DeepSeek Harness：复用客户端自己的 API key，无需二次配置。Bring SCNet client models into DeepSeek Harness. |
| 202 | [huandu/dsh-review-threads](https://github.com/huandu/dsh-review-threads) | 0 | 2026-10-23 | 2026-10-23 | Persistent GitHub-style review threads for DeepSeek Harness diffs |
| 203 | [hulibuld/dsh-refresh-restart](https://github.com/hulibuld/dsh-refresh-restart) | 0 | 2026-10-23 | 2026-10-23 | DeepSeek Harness 插件：在界面左上角「收起侧边栏」旁加「刷新」「重启」两个按钮 |
| 204 | [IamrrrED/dsh-balance-indicator](https://github.com/IamrrrED/dsh-balance-indicator) | 0 | 2026-10-23 | 2026-10-23 | DeepSeek Harness plugin: account balance and session spend in the composer dock |
| 205 | [ihodorchenko/dsh-macos-notifications](https://github.com/ihodorchenko/dsh-macos-notifications) | 0 | 2026-10-20 | 2026-10-23 | Плагин нотификаций для DeepSeek Harness |
| 206 | [InkStain258/dsh-glass-skin](https://github.com/InkStain258/dsh-glass-skin) | 0 | 2026-10-23 | 2026-10-23 | Acrylic / frosted-glass appearance for DeepSeek Harness: translucent surfaces over the native window material, layered on top of any active theme. |
| 207 | [iStarryDust/dsh-assistant-profile](https://github.com/iStarryDust/dsh-assistant-profile) | 0 | 2026-10-23 | 2026-10-23 | 助理档案：给 DSH 一份全局人格，每个新会话的系统提示都带着它 |
| 208 | [iStarryDust/dsh-edit-regen](https://github.com/iStarryDust/dsh-edit-regen) | 0 | 2026-10-23 | 2026-10-23 | 编辑重发：在用户消息气泡上多一个「编辑」，改完从那条消息重新生成 |
| 209 | [ivanlebedvideo/dsh-pushups](https://github.com/ivanlebedvideo/dsh-pushups) | 0 | 2026-10-23 | 2026-10-23 | One prompt = one push-up. Vibe code now, pay in push-ups later. |
| 210 | [ixietv/dsh-session-rewind](https://github.com/ixietv/dsh-session-rewind) | 0 | 2026-10-23 | 2026-10-23 | In-session rewind for DeepSeek Harness: fold the current conversation back to a previous turn in place via /rewind — no fork, no new session. |
| 211 | [jack-001-a/deepseek-harness-translation-pane](https://github.com/jack-001-a/deepseek-harness-translation-pane) | 0 | 2026-10-23 | 2026-10-23 | Translation workbench plugin for DeepSeek Harness: sidebar panel with Bing/Google failover, caching and rate limiting, plus a translate_text tool for the agent. |
| 212 | [jiangwennn/dsh-model-session-headers](https://github.com/jiangwennn/dsh-model-session-headers) | 0 | 2026-10-23 | 2026-10-23 | Per-model session-id headers for DeepSeek Harness: Claude Code (x-claude-code-session-id) / OpenCode Go (x-opencode-session) |
| 213 | [JianHeShui/dsh-douyin](https://github.com/JianHeShui/dsh-douyin) | 0 | 2026-10-23 | 2026-10-23 | Douyin toolkit for DeepSeek Harness: hot list, search, video reading with native vision frames, guarded Playwright DM/group driver, and a local HTTP API. Linux adapter included. |
| 214 | [junjiangao/dsh-plugin-remote-ssh](https://github.com/junjiangao/dsh-plugin-remote-ssh) | 0 | 2026-10-23 | 2026-10-23 | DeepSeek Harness plugin: manage SSH hosts, open official dsh-ssh remote windows, and mount remote workspaces into the current window |
| 215 | [kennethfan/dsh-bailian-catalog](https://github.com/kennethfan/dsh-bailian-catalog) | 0 | 2026-10-23 | 2026-10-23 | Bailian (DashScope / Model Studio) model catalog for the DeepSeek Harness Web GUI: browse every model the API key can reach, add or remove individual models in the Bailian provider route, and see the active session's context quota. |
| 216 | [KexinCC/dsh-kimi-assemble](https://github.com/KexinCC/dsh-kimi-assemble) | 0 | 2026-10-23 | 2026-10-23 | Native DSH tools for the Kimi browser extension (your real, signed-in Chrome) and KimiCU Windows desktop control. 17 tools, verified actions, diff reads, zero dependencies. |
| 217 | [kingofpowers/dsh-chat-ctxmenu](https://github.com/kingofpowers/dsh-chat-ctxmenu) | 0 | 2026-10-23 | 2026-10-23 | Right-click menu for DeepSeek Harness conversations: copy text/images, open files, reveal in file manager. |
| 218 | [kirkchinese/dsh-capability-catalog](https://github.com/kirkchinese/dsh-capability-catalog) | 0 | 2026-10-23 | 2026-10-23 | Lazy capability catalog for DeepSeek Harness: MCP tools and skills behind one compact index, with per-session switches |
| 219 | [Ledas-as/dsh-claude-video-slider](https://github.com/Ledas-as/dsh-claude-video-slider) | 0 | 2026-10-21 | 2026-10-23 | 模仿 Claude UI 的 DSH 滑块插件 |
| 220 | [LiFenrir/dsh-external-task-context](https://github.com/LiFenrir/dsh-external-task-context) | 0 | 2026-10-23 | 2026-10-23 | DSH 插件：在右侧栏查看外部子代理任务（Claude Code / Codex / ACP）的委派提示词、运行上下文与返回结果 / Inspect delegation context and outcomes of external subagent tasks |
| 221 | [LiFenrir/dsh-selection-quote](https://github.com/LiFenrir/dsh-selection-quote) | 0 | 2026-10-23 | 2026-10-23 | DSH 插件：划选会话文字一键引用到输入框 / Quote selected message text into the composer in DeepSeek Harness |
| 222 | [LiFenrir/dsh-video-preview](https://github.com/LiFenrir/dsh-video-preview) | 0 | 2026-10-23 | 2026-10-23 | DSH 插件：在右侧文档预览面板直接播放工作区视频，支持 HTTP Range 拖动进度 / Native video playback in DeepSeek Harness's document preview panel |
| 223 | [linbainian/dsh-remote-plugin](https://github.com/linbainian/dsh-remote-plugin) | 0 | 2026-10-23 | 2026-10-23 | DeepSeek Harness (DSH) 桌面端原生远程控制插件：长期访问链接、二维码、手机界面与自托管 SSH 中转。 |
| 224 | [LingYuYo/dsh-qq-guard](https://github.com/LingYuYo/dsh-qq-guard) | 0 | 2026-10-20 | 2026-10-23 | 🤖 100% 由 AI 编写完成。把 QQ 接入 DeepSeek Harness 的桥接插件。提供执行期安全门禁、外部插件沙箱、模型无痕热切、看门狗失败降级与完整 Web UI。零外部 npm 依赖。 |
| 225 | [LINJJ749/dsh-one-click-session-delete](https://github.com/LINJJ749/dsh-one-click-session-delete) | 0 | 2026-10-23 | 2026-10-23 | Permanently delete a Session from the DeepSeek Harness Workspace sidebar with one click: native row action + menu item, confirmation dialog, live-session protection, cascade for derived sessions, and cleanup of the log directory, projection cache and workspace bookkeeping. |
| 226 | [liujiesmart/dsh-kiro](https://github.com/liujiesmart/dsh-kiro) | 0 | 2026-10-23 | 2026-10-23 | Kiro provider for DeepSeek Harness: AWS Builder ID, IAM Identity Center, Google and GitHub sign-in, automatic token and profile-ARN refresh, live model discovery, Claude and open-weight streaming with tool calls, reasoning-effort controls, image support, and recovery from silent refusals. Targets DSH 0.2.1-rc.2. |
| 227 | [longge1213812138/dsh-workbuddy-connect](https://github.com/longge1213812138/dsh-workbuddy-connect) | 0 | 2026-10-21 | 2026-10-23 | DSH WorkBuddy Connect — 社区维护分支：将 WorkBuddy 桌面 App 的模型接入 DeepSeek Harness |
| 228 | [LRainner/dsh-plugin-standalone-session](https://github.com/LRainner/dsh-plugin-standalone-session) | 0 | 2026-10-23 | 2026-10-23 | 为 DeepSeek Harness 提供不隶属于任何工作区的独立会话，复用原生输入区，并带独立侧边栏面板。MIT。 |
| 229 | [LvenxjY/dsh-eye-care](https://github.com/LvenxjY/dsh-eye-care) | 0 | 2026-10-23 | 2026-10-23 | 是时候保护你的眼睛了，一个小的dsh插件自定义时长，提醒你看向远处 |
| 230 | [lvsun080403/Bonsai-27B-72K-DSH-](https://github.com/lvsun080403/Bonsai-27B-72K-DSH-) | 0 | 2026-10-22 | 2026-10-23 | 双击 install.bat，12 GB 笔记本跑 27B（三进制 1.76 bit · 73K 上下文 · 57–66 tok/s）+deepseekUI优化插件 |
| 231 | [ly2601620664/dsh-pet-memory](https://github.com/ly2601620664/dsh-pet-memory) | 0 | 2026-10-23 | 2026-10-23 | 陪伴型长期记忆 DSH 插件：分层记忆（对话→事实→场景→人格）、规则抽取、时间衰减检索，全本地文件、append-only 不丢数据。 |
| 232 | [lyx0717/dsh-washer](https://github.com/lyx0717/dsh-washer) | 0 | 2026-10-21 | 2026-10-23 | 把 DSH 会话状态渲染成一台滚筒洗衣机 · 三种皮肤三种档位 |
| 233 | [MangMax/dsh-acp-agentmode](https://github.com/MangMax/dsh-acp-agentmode) | 0 | 2026-10-23 | 2026-10-23 | Give DeepSeek Harness's ACP profile a --agentmode &lt;preset&gt; flag: choose the agent preset every new ACP session runs. Vite+/pnpm/TypeScript, zero runtime deps. |
| 234 | [maomaobishop/dsh-skill-panel](https://github.com/maomaobishop/dsh-skill-panel) | 0 | 2026-10-23 | 2026-10-23 | A sleek skills panel for the DSH sidebar. |
| 235 | [MARUIZEWUDI/dsh-chatbox-compat](https://github.com/MARUIZEWUDI/dsh-chatbox-compat) | 0 | 2026-10-23 | 2026-10-23 | Chatbox-style UX for DeepSeek Harness - visible memory, mode toggles, handoff compression. |
| 236 | [matata2017/dsh-paste-collapse](https://github.com/matata2017/dsh-paste-collapse) | 0 | 2026-10-23 | 2026-10-23 | Codex-style paste collapse for DeepSeek Harness: a large paste becomes a \[Pasted Content N chars\] placeholder with a pill in the composer, and the host expands it back to the full text before the model sees it. |
| 237 | [miao-pa-si-wutao/dsh-think-strip](https://github.com/miao-pa-si-wutao/dsh-think-strip) | 0 | 2026-10-23 | 2026-10-23 | Keep DeepSeek Harness sessions alive for hundreds of turns: strip historical reasoning blocks and oversized tool outputs from context, archive the originals to disk, leave one-line stubs behind. Per-session switches. |
| 238 | [mikufan39/dsh-mikufan](https://github.com/mikufan39/dsh-mikufan) | 0 | 2026-10-23 | 2026-10-23 | DeepSeek Harness bundle: delete-sessions sweep, startup splash, local memory, LAN access proxy, skills manager (bundled skill-creator) and the AGENTS.md editor - managed from the sidebar Control panel. |
| 239 | [mill413/dsh-notify](https://github.com/mill413/dsh-notify) | 0 | 2026-10-23 | 2026-10-23 | Desktop notifications and custom HTTP pushes for DeepSeek Harness |
| 240 | [Mint-hfut/dsh-personal-assistant](https://github.com/Mint-hfut/dsh-personal-assistant) | 0 | 2026-10-23 | 2026-10-23 | Proactive personal assistant for DeepSeek Harness: preferences, knowledge, follow-through, and collection learning. |
| 241 | [mmw-devs/mmw-tools](https://github.com/mmw-devs/mmw-tools) | 0 | 2026-10-16 | 2026-10-23 | DSH plugin: connect a DeepSeek Harness agent to a single GitHub repo via OAuth Device Flow, follow AGENTS.md, edit only the allowlisted paths, run a pre-flight validate, push to content/* branches, and open draft PRs (no auto-merge). |
| 242 | [monkey-sking/dsh-boot-resume](https://github.com/monkey-sking/dsh-boot-resume) | 0 | 2026-10-21 | 2026-10-23 | Resume the conversation a DSH restart interrupted — auto-continue the unfinished turn on boot. |
| 243 | [Moosphan/dsh-qq-farm](https://github.com/Moosphan/dsh-qq-farm) | 0 | 2026-10-23 | 2026-10-23 | DeepSeek Harness plugin: agent-driven QQ Farm automation (vision in the model, clicks in the plugin) |
| 244 | [morehao/dsh-skills-console](https://github.com/morehao/dsh-skills-console) | 0 | 2026-10-23 | 2026-10-23 | 统一管理本地技能的安装、更新、删除与接入，让同一份技能在多个 Agent 间复用。A skill manager for DeepSeek Harness: install, update, remove, link and toggle agent skills. |
| 245 | [Mr-Luo0036/dsh-whale-greeting](https://github.com/Mr-Luo0036/dsh-whale-greeting) | 0 | 2026-10-23 | 2026-10-23 | DSH 对话区问候插件：问候卡、完成报告、长跑陪伴、授权请示。 |
| 246 | [NanoShiki/dsh-anki](https://github.com/NanoShiki/dsh-anki) | 0 | 2026-10-23 | 2026-10-23 | Native DSH Anki workspace with an isolated headless Anki core, shared AI operations, and AnkiWeb sync. |
| 247 | [Natsubrei/dsh-mermaid-panel](https://github.com/Natsubrei/dsh-mermaid-panel) | 0 | 2026-10-21 | 2026-10-23 | Mermaid diagrams in the DeepSeek Harness right sidebar: a client plugin with in-card zoom and pan. |
| 248 | [nin2c/dsh-plugin-memo](https://github.com/nin2c/dsh-plugin-memo) | 0 | 2026-10-23 | 2026-10-23 | Lightweight notes &amp; todo panel plugin for the DeepSeek Harness (DSH) Web UI: work/personal todo columns, five autosaving memo windows, drag-to-reorder, inline editing, local JSON storage. |
| 249 | [nineoooo/dsh-qzone-echo](https://github.com/nineoooo/dsh-qzone-echo) | 0 | 2026-10-23 | 2026-10-23 | A DSH plugin that archives your own QQ Zone posts into a local library, auto-sorted into thoughts, dreams and reviews — with a private web viewer and offline image backup. Cookie stays on your machine. |
| 250 | [ninjasle/dsh-imagegen](https://github.com/ninjasle/dsh-imagegen) | 0 | 2026-10-23 | 2026-10-23 | Text-to-image for DeepSeek Harness: a generate_image tool plus an in-composer button to edit endpoint, model and API key live — no restart. |
| 251 | [Octo-o-o-o/chatgpt-pro-research](https://github.com/Octo-o-o-o/chatgpt-pro-research) | 0 | 2026-10-23 | 2026-10-23 | DeepSeek Harness 插件：用 ChatGPT Pro 网页会话做无人值守多轮调研，记录与产物落盘，侧边栏管理主题。 |
| 252 | [Octo-o-o-o/gpt-image-design](https://github.com/Octo-o-o-o/gpt-image-design) | 0 | 2026-10-23 | 2026-10-23 | DeepSeek Harness 插件：用 ChatGPT Pro 网页会话或 OpenAI 兼容生图 API 出设计图与 HTML demo，侧边栏画廊预览。 |
| 253 | [oliverkim5017/dsh-oliver-qol](https://github.com/oliverkim5017/dsh-oliver-qol) | 0 | 2026-09-28 | 2026-10-23 | Personal quality-of-life features for the DeepSeek Harness |
| 254 | [onlookor/pact-dsh](https://github.com/onlookor/pact-dsh) | 0 | 2026-10-23 | 2026-10-23 | DeepSeek harness plugin for PACT collab |
| 255 | [oxomkbk/dsh-plugin-command-deck](https://github.com/oxomkbk/dsh-plugin-command-deck) | 0 | 2026-10-23 | 2026-10-23 | DeepSeek Harness页面 UI 更改为指挥台的界面美化插件，多种界面UI效果非常炫酷！ |
| 256 | [OZONGO/dsh-agents-inits](https://github.com/OZONGO/dsh-agents-inits) | 0 | 2026-10-23 | 2026-10-23 | Run the AGENTS.md authoring workflow inside a subagent, so no instruction body enters the main conversation. |
| 257 | [Paurika1113/dsh-opencode-live](https://github.com/Paurika1113/dsh-opencode-live) | 0 | 2026-10-23 | 2026-10-23 | DSH route for OpenCode Go and Zen: live model roster, per-model wire protocol, and capacities from the official models.dev catalogue. |
| 258 | [PerryLink/dsh-canteen-retention-check](https://github.com/PerryLink/dsh-canteen-retention-check) | 0 | 2026-10-23 | 2026-10-23 | 核对食堂留样台账：四要素是否齐全、留样量是否达 125 克、是否冷藏满 48 小时、是否残留模板占位符。 |
| 259 | [PerryLink/dsh-construction-doc-check](https://github.com/PerryLink/dsh-construction-doc-check) | 0 | 2026-10-23 | 2026-10-23 | 扫描施工项目资料目录，报告缺哪些规定资料、哪些像是过期版本、哪些文件是空的。 |
| 260 | [PerryLink/dsh-excel-reconcile](https://github.com/PerryLink/dsh-excel-reconcile) | 0 | 2026-10-23 | 2026-10-23 | 按主键对齐两份 Excel/CSV 表，按容差逐字段比较，输出 Markdown 报告、JSON 结果与差异工作簿。 |
| 261 | [PerryLink/dsh-invoice-ledger](https://github.com/PerryLink/dsh-invoice-ledger) | 0 | 2026-10-23 | 2026-10-23 | 核对发票台账：重复报销、价税勾稽、抬头、日期、模板占位符，输出异常清单与规范化台账。 |
| 262 | [PerryLink/dsh-payroll-audit](https://github.com/PerryLink/dsh-payroll-audit) | 0 | 2026-10-23 | 2026-10-23 | 按已核实的社保/公积金/个税参数核对工资表，逐条给出差异与依据，不代申报。 |
| 263 | [PerryLink/dsh-table-ingest](https://github.com/PerryLink/dsh-table-ingest) | 0 | 2026-10-23 | 2026-10-23 | 把 docx/xlsx/csv 转成规则检查器能吃的表格 JSON，带候选表、表头识别、预览与置信度。 |
| 264 | [PerryLink/dsh-tender-requirements](https://github.com/PerryLink/dsh-tender-requirements) | 0 | 2026-10-23 | 2026-10-23 | 从招标文件抽取关键信息：前附表的时间与保证金、投标文件组成与份数，并逐项报告是否检索到。 |
| 265 | [pianVei/seedvc-cover](https://github.com/pianVei/seedvc-cover) | 0 | 2026-10-23 | 2026-10-23 | 一条命令把一首歌换成某个角色的声音。零样本换嗓，不用训练模型。DSH skill。 |
| 266 | [pigman18/dsh-openai-gateway](https://github.com/pigman18/dsh-openai-gateway) | 0 | 2026-10-22 | 2026-10-23 | Expose every model of every provider configured in DeepSeek Harness as an OpenAI-compatible endpoint on a fixed loopback port, with a sidebar page for the port, key and model ids. |
| 267 | [pink-sys/dsh-videogen](https://github.com/pink-sys/dsh-videogen) | 0 | 2026-10-23 | 2026-10-23 | 视频生成 |
| 268 | [ptrel1/dsh-interrupted-resume](https://github.com/ptrel1/dsh-interrupted-resume) | 0 | 2026-10-23 | 2026-10-23 | DSH plugin: after a restart, detect sessions whose last turn was force-interrupted and re-inject a safe continue prompt (with state-verification instructions). |
| 269 | [purejiang/dsh-system-notifications](https://github.com/purejiang/dsh-system-notifications) | 0 | 2026-10-23 | 2026-10-23 | Desktop notifications for DeepSeek Harness (dsh) Web sessions: get notified when a session waits for approval or finishes, then click to jump back to it. |
| 270 | [qian-dsh/dsh-as-mcp-server](https://github.com/qian-dsh/dsh-as-mcp-server) | 0 | 2026-10-23 | 2026-10-23 | Exposes DSH as an MCP server: streaming thinking/tool/file notifications, shared intent, a floor lock that denies DSH writes while held, mid-turn alert injection, and review delegation. |
| 271 | [qian-dsh/dsh-session-map](https://github.com/qian-dsh/dsh-session-map) | 0 | 2026-10-23 | 2026-10-23 | A draggable, zoomable radial map of the session tree for DSH: see which conversation branched off which, and switch by clicking a node. |
| 272 | [Qiujiyuantiantian/dsh-vehicle-dynamics](https://github.com/Qiujiyuantiantian/dsh-vehicle-dynamics) | 0 | 2026-10-21 | 2026-10-23 | 把 Gillespie《车辆动力学基础》整本书重写成 164 张可执行工程检查单的 DSH 技能；附约 77 处原文缺陷标注，不复制原文。｜ A DSH skill: Gillespie's vehicle dynamics rewritten as 164 executable engineering checklists, ~77 source defects documented, no text reproduced. |
| 273 | [Rafayellllllllllllll/gesture-flower](https://github.com/Rafayellllllllllllll/gesture-flower) | 0 | 2026-10-23 | 2026-10-23 | 手势控制粒子花朵绽放 · Three.js + MediaPipe Hands + GLSL |
| 274 | [ramuzes/dsharp](https://github.com/ramuzes/dsharp) | 0 | 2026-10-02 | 2026-10-23 | A self required working plugins of DeepseekHarness |
| 275 | [rans725/dsh-workspace-ranswork](https://github.com/rans725/dsh-workspace-ranswork) | 0 | 2026-10-22 | 2026-10-23 | dsh会话总览插件 |
| 276 | [RestRegular/dsh-notepad](https://github.com/RestRegular/dsh-notepad) | 0 | 2026-10-22 | 2026-10-23 | Notepad — a per-workspace floating note window in the DeepSeek Harness session view: problems, next steps, one-click insert into the composer, drag, minimize, hide. |
| 277 | [rg2304luyue/dsh-pa](https://github.com/rg2304luyue/dsh-pa) | 0 | 2026-10-23 | 2026-10-23 | 供deepseek harness使用的轻量级提示词增强 |
| 278 | [RGBcript/dsh-web-bridge](https://github.com/RGBcript/dsh-web-bridge) | 0 | 2026-10-23 | 2026-10-23 | Free web search for DeepSeek Harness (ctx.web provider). Drives Bing, DuckDuckGo or Marginalia via HTTP or a real browser. No API key, no quota, no Docker. |
| 279 | [RicardoYan/dsh-notify-overlay](https://github.com/RicardoYan/dsh-notify-overlay) | 0 | 2026-10-23 | 2026-10-23 | Always-on-top notification overlay for DeepSeek Harness — self-drawn cards, a draggable ball for pending reminders, click to jump back to the conversation. Turn the overlay off for native OS notifications, which also works on macOS and Linux. / DeepSeek Harness 的置顶通知浮窗：自绘卡片、待处理小球、点击跳回会话；关掉浮窗则改用系统通知。 |
| 280 | [rocco623/dsh-codex-memory](https://github.com/rocco623/dsh-codex-memory) | 0 | 2026-10-23 | 2026-10-23 | Codex's V2 memory pipeline for DeepSeek Harness: two-stage extraction, SQLite job table, git baseline gating, citation feedback. |
| 281 | [sadjjk/dsh-ascii-whales](https://github.com/sadjjk/dsh-ascii-whales) | 0 | 2026-10-23 | 2026-10-23 | 让鲸群游进对话里。DeepSeek Harness ASCII 鲸鱼背景插件，支持对话中低耗显示（基于 Chael-Chael/dsh-ascii-whales） |
| 282 | [sangonomiya249/dsh-meoo](https://github.com/sangonomiya249/dsh-meoo) | 0 | 2026-10-23 | 2026-10-23 | 把秒悟 Meoo 的模型接进 dsh：自动登录取项目服务 AK、同步模型目录，模型直接出现在会话模型选择器与「设置 → 模型」里 |
| 283 | [SauronLee/dsh-token-calendar](https://github.com/SauronLee/dsh-token-calendar) | 0 | 2026-10-23 | 2026-10-23 | DeepSeek Harness 插件：设置里的 Token 用量日历，按天/按模型统计会话 token 消耗（本地、零依赖） |
| 284 | [scccy/dsh-hindsight-config](https://github.com/scccy/dsh-hindsight-config) | 0 | 2026-10-23 | 2026-10-23 | Visual configuration for Hindsight coding-agent memory in DeepSeek Harness: umbrella bundle (engine + panel), server data over HTTP, token never leaves the host. |
| 285 | [Senrian/dsh-task-board](https://github.com/Senrian/dsh-task-board) | 0 | 2026-10-23 | 2026-10-23 | Full-screen task board plugin for DeepSeek Harness: every session as a live mini conversation with status, search and inline reply. |
| 286 | [SGorgeous/dsh-ithkuil](https://github.com/SGorgeous/dsh-ithkuil) | 0 | 2026-10-23 | 2026-10-23 | DSH plugin: a translation workbench for New Ithkuil (Ithkuil IV) - offline grammar/lexicon lookup, formative assembly and phonotactic checks |
| 287 | [Shang-ZZ/dsh-computer-use](https://github.com/Shang-ZZ/dsh-computer-use) | 0 | 2026-10-23 | 2026-10-23 | dsh-computer-use 为 DeepSeek Harness 带来 computer use 能力：通过 js 与 js_reset 两个工具，让智能体读取窗口、点击、输入文字并截屏，操控 macOS 上的任意桌面应用。它直接复用本机已安装的 ChatGPT 桌面应用自带的 computer-use 运行时，无需额外部署；应用授权走 DeepSeek Harness 的提问卡片，每轮结束自动清理上游状态。仅支持 Apple Silicon 版 macOS。 |
| 288 | [Shang-ZZ/dsh-diagram-design](https://github.com/Shang-ZZ/dsh-diagram-design) | 0 | 2026-10-23 | 2026-10-23 | diagram-design（v2.6，作者 Cathryn Lavery，MIT）的DSH插件版本——一个"教 agent 画图"的技能：把图表画成单文件 HTML + 内联 SVG，用一套 editorial 设计系统（1 个强调色、1px 细线、无阴影、4px 网格、密度 4/10）。45 种图表类型，还支持 draw.io / Mermaid / Excalidraw 导入和 SVG / PNG 导出。 |
| 289 | [sherconan/dsh-task-mascot](https://github.com/sherconan/dsh-task-mascot) | 0 | 2026-10-23 | 2026-10-23 | 真跟着 Agent 每一步工具调用在动 · DeepSeek Harness task mascot by metsh |
| 290 | [shwili/dsh-plugin-market-zh](https://github.com/shwili/dsh-plugin-market-zh) | 0 | 2026-10-23 | 2026-10-23 | 为多个 DSH 插件市场索引源生成本地中文机翻镜像，在「插件 → 发现」里用中文浏览。 |
| 291 | [sildo466/dsh-character-cards](https://github.com/sildo466/dsh-character-cards) | 0 | 2026-10-23 | 2026-10-23 | Switchable identity cards for DSH sessions: persona, tone, code style, and hard constraints injected per session,with defaults, per-session overrides, and a visual editor. |
| 292 | [sleepinggggggggggg/dsh-reasoning-effort-slider](https://github.com/sleepinggggggggggg/dsh-reasoning-effort-slider) | 0 | 2026-10-23 | 2026-10-23 | Codex-style reasoning-effort slider for DeepSeek Harness — turns the model menu's Effort row into a continuous, level-snapping slider with a blue-to-violet fill and a starfield at high levels. |
| 293 | [sole373/dsh-agent-checkin](https://github.com/sole373/dsh-agent-checkin) | 0 | 2026-10-21 | 2026-10-23 | some interesting pulgins |
| 294 | [SOVLOOKUP/dsh-settings-footer](https://github.com/SOVLOOKUP/dsh-settings-footer) | 0 | 2026-10-23 | 2026-10-23 | Move the DSH sidebar Settings entry to a row at the top of the sidebar, hide the 新会话 button, and empty the sidebar footer. |
| 295 | [Srelka/dsh-ultracode](https://github.com/Srelka/dsh-ultracode) | 0 | 2026-10-23 | 2026-10-23 | Ultracode for DeepSeek Harness: dynamic standard-preset inheritance, bounded multi-agent workflows, floating progress viewer, and subtle composer glow. |
| 296 | [Ssupervipuser/dsh-agent-notify](https://github.com/Ssupervipuser/dsh-agent-notify) | 0 | 2026-10-17 | 2026-10-23 | DSH plugin: real Windows notifications (WinRT toast) when the agent finishes a run, needs approval, or asks you a question. |
| 297 | [Stijnus/dsh-composer-predictions](https://github.com/Stijnus/dsh-composer-predictions) | 0 | 2026-10-23 | 2026-10-23 | Tab-completion ghost text for the DeepSeek Harness composer: next-message suggestions and inline continuations |
| 298 | [Stijnus/dsh-mcp-overview](https://github.com/Stijnus/dsh-mcp-overview) | 0 | 2026-09-02 | 2026-10-23 | Read-only MCP server overview for the DeepSeek Harness web GUI: connection status, transport, endpoint, and registered tools per configured dsh-mcp-client server. |
| 299 | [studentlanily/dsh-context-dial](https://github.com/studentlanily/dsh-context-dial) | 0 | 2026-10-22 | 2026-10-23 | DSH plugin: set a model's context window from a settngs page; applied on the next DSH start. |
| 300 | [sumingwang233/dsh-question-bridge](https://github.com/sumingwang233/dsh-question-bridge) | 0 | 2026-10-23 | 2026-10-23 | Non-blocking interactive questions for DSH agents: ask, walk away, answer later. |
| 301 | [sun04222/dsh-prompt-enhance](https://github.com/sun04222/dsh-prompt-enhance) | 0 | 2026-10-22 | 2026-10-23 | Prompt enhancement for DeepSeek Harness: composer button + enhance_prompt tool |
| 302 | [sunaono1/dsh-plugin-dual-brain](https://github.com/sunaono1/dsh-plugin-dual-brain) | 0 | 2026-10-23 | 2026-10-23 | DeepSeek-V4.1-Flash plans, MiMo-V2.6-Flash executes — dual-brain agent presets for DeepSeek Harness. |
| 303 | [sunaono1/dsh-plugin-offwork](https://github.com/sunaono1/dsh-plugin-offwork) | 0 | 2026-10-23 | 2026-10-23 | DSH 插件：侧边栏「下班倒计时 + 今日已赚」两张统计卡片（倒计时到点、按日薪线性累计当日收入）。 |
| 304 | [suyunxing/dsh-compact-sidebar](https://github.com/suyunxing/dsh-compact-sidebar) | 0 | 2026-10-23 | 2026-10-23 | Compacts the DSH sidebar navigation into a two-column grid and repairs dsh-resource:// records whose protocol the browser URL parser reports as empty. |
| 305 | [suyunxing/dsh-draw-mode](https://github.com/suyunxing/dsh-draw-mode) | 0 | 2026-10-23 | 2026-10-23 | Links a local ComfyUI server into DeepSeek Harness: five draw_* tools, a curated workflow library, per-model prompt dialects and a sidebar panel. |
| 306 | [suyunxing/dsh-welcome-greeting](https://github.com/suyunxing/dsh-welcome-greeting) | 0 | 2026-10-23 | 2026-10-23 | Rewrites the DSH New Session headline into a short affectionate greeting written by the selected model from the local time, city and weather. |
| 307 | [sxwsc667/dsh-use-computer](https://github.com/sxwsc667/dsh-use-computer) | 0 | 2026-10-23 | 2026-10-23 | DSH 插件：让模型直接操作 Windows 桌面——坐标不进对话，先用 UIA 控件树、再用专用 2B 定位模型；支持脚本化连续操作和连按三次 ESC 急停。 |
| 308 | [TanPass/furina-dsh-theme](https://github.com/TanPass/furina-dsh-theme) | 0 | 2026-10-22 | 2026-10-23 | Fontaine / Furina theme for the DeepSeek Harness Web GUI - three Furina skins with switchable wallpapers, hydro-blue glass UI and an in-page theme switcher. |
| 309 | [TanukiRei/dsh-tanuki-toolbox](https://github.com/TanukiRei/dsh-tanuki-toolbox) | 0 | 2026-10-18 | 2026-10-23 | 黎猫工具箱：DSH 快捷栏、起始页、对话框与模型设置、消息通知、插件管理及 Windows 启动保护。 \| Modular DeepSeek Harness UI enhancements, notifications, model controls and plugin management. |
| 310 | [taoggt/dsh-qa-preset](https://github.com/taoggt/dsh-qa-preset) | 0 | 2026-10-23 | 2026-10-23 | 给 DeepSeek Harness 增加一个仅问答预设 |
| 311 | [taotao7/dsh-pretty-cool-releases](https://github.com/taotao7/dsh-pretty-cool-releases) | 0 | 2026-10-23 | 2026-10-23 | Compact community UI for DeepSeek Harness: plain messages, integrated prompt and task status |
| 312 | [Tatumichi/dsh-persona-core](https://github.com/Tatumichi/dsh-persona-core) | 0 | 2026-10-23 | 2026-10-23 | One personalised character across every DeepSeek Harness conversation: persona, feelings, memory and tone correction. |
| 313 | [Tests4gptplay/dsh-codex-native](https://github.com/Tests4gptplay/dsh-codex-native) | 0 | 2026-10-22 | 2026-10-23 | Community DSH model adapter using official OpenAI Codex app-server and native ChatGPT login |
| 314 | [The-Focus-AI/dsh-plugin-sidebar-workspace-names](https://github.com/The-Focus-AI/dsh-plugin-sidebar-workspace-names) | 0 | 2026-10-23 | 2026-10-23 | DeepSeek Harness sidebar plugin: shows the owning workspace name on a second line under each session title in the In one list view. |
| 315 | [ThePuristImpurity/dsh-tuanjie-plugin](https://github.com/ThePuristImpurity/dsh-tuanjie-plugin) | 0 | 2026-10-22 | 2026-10-23 | DeepSeek Harness plugin: drive the Tuanjie editor via its Codely bridge - scenes, GameObjects, component properties, editor commands, and C# execution. |
| 316 | [Traveritas/petween-dsh](https://github.com/Traveritas/petween-dsh) | 0 | 2026-08-21 | 2026-10-23 | Agent pet plugin for DeepSeek Harness (dsh): a few pose images in, expressive comic-style motion out — WAAPI timeline engine, custom animation editor, pose presets, and extension services for companion plugins |
| 317 | [TuWeiZhi/dsh-translator](https://github.com/TuWeiZhi/dsh-translator) | 0 | 2026-10-23 | 2026-10-23 | DSH 划词翻译（增强 fork）：独立输入面板 + Google 翻译 + 音标与词典 |
| 318 | [TuWeiZhi/dsh-whale-widget](https://github.com/TuWeiZhi/dsh-whale-widget) | 0 | 2026-10-23 | 2026-10-23 | DSH 余额小鲸鱼挂件（增强 fork）：随机语句洗牌袋 + 空闲自动说话 |
| 319 | [Umamed26/dsh-tui-status-rotator](https://github.com/Umamed26/dsh-tui-status-rotator) | 0 | 2026-10-23 | 2026-10-23 | Port of dsh-status-rotator to dsh-TUI: phase-aware rotating status phrases with typewriter, adaptive gradient, weighted shuffle-bag selection and a native /settings section. / 把 dsh-status-rotator 移植进 dsh-TUI |
| 320 | [unera/dsh-skills](https://github.com/unera/dsh-skills) | 0 | 2026-10-22 | 2026-10-23 | Skills page for the DeepSeek Harness Web GUI: inspect, download, upload and edit SKILL.md files |
| 321 | [Userluckytian/dsh-bili-workbench](https://github.com/Userluckytian/dsh-bili-workbench) | 0 | 2026-10-23 | 2026-10-23 | DSH plugin: Bilibili workbench with material library, AI video remix, review/publish and auto interactions |
| 322 | [Veersion/dsh-mys-checkin](https://github.com/Veersion/dsh-mys-checkin) | 0 | 2026-10-22 | 2026-10-23 | 米游社每日自动签到 DSH 插件：扫码登录、窗口内随机签到、失败提示 |
| 323 | [vi0let-dev/dsh-chat-beautify](https://github.com/vi0let-dev/dsh-chat-beautify) | 0 | 2026-10-23 | 2026-10-23 | 为 DSH（DeepSeek Harness）会话界面提供柔光/纸感/紧凑三套可切换的配色、圆角与行高预设，兼容深浅色模式。 |
| 324 | [vi0let-dev/dsh-ui-beautify](https://github.com/vi0let-dev/dsh-ui-beautify) | 0 | 2026-10-23 | 2026-10-23 | Adjust the DSH Web UI appearance: style presets, surface transparency, wallpaper, and fonts. |
| 325 | [vi0let-dev/plugin-builder](https://github.com/vi0let-dev/plugin-builder) | 0 | 2026-10-23 | 2026-10-23 | Build DeepSeek Harness (DSH) plugins end to end: ask-first requirements, dsh-xxx-xxx naming, UI layout selection, implementation, tests and privacy audit - delivered as a complete project, never auto-installed. |
| 326 | [Vikrant-Aleph/dshmarket-update-helper](https://github.com/Vikrant-Aleph/dshmarket-update-helper) | 0 | 2026-10-19 | 2026-10-23 | 一个插件，专治插件市场更新自己时把自己卸载的尴尬。独立一键更新 dshmarket——市场负责逛街，助手负责换市场。你先别动，我来 ＞﹏＜ |
| 327 | [waikoeng234/Nodo](https://github.com/waikoeng234/Nodo) | 0 | 2026-10-23 | 2026-10-23 | Combine multiple agents like Claude, Code, and Codex into a team and collaborate on a single workspace. |
| 328 | [WalterYOO/dsh-web-search-yuanbao](https://github.com/WalterYOO/dsh-web-search-yuanbao) | 0 | 2026-10-22 | 2026-10-23 | Tencent Yuanbao Search provider plugin for the DeepSeek Harness web capability seam (ctx.web) |
| 329 | [WALZX123/dsh-overflow-fallback](https://github.com/WALZX123/dsh-overflow-fallback) | 0 | 2026-10-22 | 2026-10-23 | Overflow fallback and session revival for DeepSeek Harness: retry compaction when the context window is exceeded, then continue the dead session in a fresh one with a handoff. Zero runtime dependencies, no UI, original session read-only. |
| 330 | [wangsunlight/xiaobao-dsh-employees](https://github.com/wangsunlight/xiaobao-dsh-employees) | 0 | 2026-10-23 | 2026-10-23 | DingTalk personal-account digital employee plugin for DeepSeek Harness, with prebuilt packages and one-command installation. |
| 331 | [wangzimu2007/dsh-oled-guard](https://github.com/wangzimu2007/dsh-oled-guard) | 0 | 2026-10-23 | 2026-10-23 | Auto-hide the DSH composer when idle — OLED burn-in protection for DeepSeek Harness. |
| 332 | [wanted09527/dsh-progress-caption](https://github.com/wanted09527/dsh-progress-caption) | 0 | 2026-10-22 | 2026-10-23 | DSH 思维链进度字幕插件 |
| 333 | [weibaohui/dsh-sidebar-tidy](https://github.com/weibaohui/dsh-sidebar-tidy) | 0 | 2026-10-23 | 2026-10-23 | dsh 插件 · 侧栏收纳：把「新会话」下方的面板行与各插件入口收进一个二级菜单按钮；零字面选择器，明暗主题自动跟随 |
| 334 | [Weidows/dsh-whalechan-herself](https://github.com/Weidows/dsh-whalechan-herself) | 0 | 2026-10-23 | 2026-10-23 | 给 DeepSeek Harness 装一个鲸鱼娘（DeepSeek娘）Agent 预设：完整干活能力 + 人设，开工吐槽、收工讨饭，按概率发表情包（设置页可调）。 |
| 335 | [wenhaolin-svg/dsh-background](https://github.com/wenhaolin-svg/dsh-background) | 0 | 2026-10-23 | 2026-10-23 | changing your background in dsh to your favourite picture~ |
| 336 | [WhichWitchWin/dsh-pro-standards](https://github.com/WhichWitchWin/dsh-pro-standards) | 0 | 2026-10-23 | 2026-10-23 | 专业规范守则：让 AI 编码助手动手前做三步判断的 DSH 插件包 |
| 337 | [WhitesPantry/dsh-remote-connector](https://github.com/WhitesPantry/dsh-remote-connector) | 0 | 2026-10-23 | 2026-10-23 | Deploy and connect DeepSeek Harness on remote servers over SSH |
| 338 | [wmq199711180/dsh-pet-live2d-fix](https://github.com/wmq199711180/dsh-pet-live2d-fix) | 0 | 2026-10-23 | 2026-10-23 | DSH Live2D ?????:???????????? 403 ? fork |
| 339 | [WSIKUN5/dsh-plugin-mumu](https://github.com/WSIKUN5/dsh-plugin-mumu) | 0 | 2026-10-23 | 2026-10-23 | MuMu 模拟器控制插件：给 DeepSeek Harness 提供 mumu_* 工具与 mumu-skill（截图/点击/滑动/按键/OCR/等待/装包/多开） |
| 340 | [WU079/dsh-douyin-subagent](https://github.com/WU079/dsh-douyin-subagent) | 0 | 2026-10-23 | 2026-10-23 | Douyin scroller for DSH: a valley-time subagent that browses Douyin, reads comments, and reports back — plus dy_* tools and a valley timer. |
| 341 | [wuji0813/dsh-fakemood](https://github.com/wuji0813/dsh-fakemood) | 0 | 2026-10-23 | 2026-10-23 | A college freshman's attempt to give AI "emotions" to improve the user experience. Due to limited coding skills, the entire codebase was written by DeepSeek. Since emotion detection runs on the reasoning process, the mood reads as "calm" or "thoughtful" most of the time — a known shortcoming. May future versions do better. |
| 342 | [wwwyyyc/dsh-ssh-agent-workspace](https://github.com/wwwyyyc/dsh-ssh-agent-workspace) | 0 | 2026-10-23 | 2026-10-23 | Turn remote SSH hosts into live DeepSeek Harness workspaces with a resident Python agent, three-way-synced local mirror cache, inotify fast-open, and conflict backups. |
| 343 | [wyp809/dsh-peak-tint](https://github.com/wyp809/dsh-peak-tint) | 0 | 2026-10-23 | 2026-10-23 | ???? Peak Tint - ? DeepSeek API ??/????? DeepSeek Harness ????,??????????? |
| 344 | [xh0915/dsh-chart](https://github.com/xh0915/dsh-chart) | 0 | 2026-10-23 | 2026-10-23 | 航图 · 把一次会话里跑通的步骤，整理成一份下次能直接用的技能 · DeepSeek Harness 插件 |
| 345 | [xh0915/dsh-lighthouse](https://github.com/xh0915/dsh-lighthouse) | 0 | 2026-10-23 | 2026-10-23 | 灯塔 · 读取当前会话，把删目录、强推、读密钥这类难撤回的操作挑出来，说明影响范围和更稳的做法 · DeepSeek Harness 插件 |
| 346 | [xiaoziwenjie-code/dsh-plugin-demo-tool](https://github.com/xiaoziwenjie-code/dsh-plugin-demo-tool) | 0 | 2026-10-22 | 2026-10-23 | A DeepSeek Harness tool plugin — demo scaffold generated by create-dsh-plugin |
| 347 | [xiaoziwenjie-code/dsh-plugin-wechat-publisher](https://github.com/xiaoziwenjie-code/dsh-plugin-wechat-publisher) | 0 | 2026-10-22 | 2026-10-23 | 微信公众号发布插件 for DeepSeek Harness — 把 Markdown + 封面直推草稿箱，纯 Node 零依赖 |
| 348 | [xieyh2002/dsh-hark-bridge](https://github.com/xieyh2002/dsh-hark-bridge) | 0 | 2026-10-22 | 2026-10-23 | 让 DeepSeek Harness 把需求和代码交给 Hark：Hark 出方案 → DSH 派子代理实现 → 代码回 Hark 审查。通过 ego-browser 驱动你已登录的 ego 浏览器。 |
| 349 | [xieyh2002/ego-liveview](https://github.com/xieyh2002/ego-liveview) | 0 | 2026-10-23 | 2026-10-23 | Live view of the ego browser inside the DeepSeek Harness sidebar |
| 350 | [xiguazhiPrince/dsh-plugin-api-gallery](https://github.com/xiguazhiPrince/dsh-plugin-api-gallery) | 0 | 2026-10-23 | 2026-10-23 | 你想给 DSH 加个功能，但说不清它该长在页面哪个位置？ 这个插件把 43 个可插入位置全部实装了一遍：每个入口都长在真实位置上、都带注册代码，点开就是“这里该怎么注册”。 |
| 351 | [xing2yu4/dsh-restart-button](https://github.com/xing2yu4/dsh-restart-button) | 0 | 2026-10-23 | 2026-10-23 | One-click reload button for the DeepSeek Harness Web UI. / DeepSeek Harness 网页界面的一键刷新按钮。 |
| 352 | [xingqikong/dsh-image-create](https://github.com/xingqikong/dsh-image-create) | 0 | 2026-10-23 | 2026-10-23 | dsh 生图 · DSH（DeepSeek Harness）的本地 Stable Diffusion 生图插件：C 档图生图 + 脸/手质检，基于 dsh-sd-bridge-guard 的 fork |
| 353 | [xingyueDanYang/dsh-puppet-memory](https://github.com/xingyueDanYang/dsh-puppet-memory) | 0 | 2026-10-22 | 2026-10-23 | Cross-session memory for DeepSeek Harness: layered notes, a 600-char always-injected core card, social/multi-person records, session-scoped suppression, and a built-in backup/restore and setup doctor. |
| 354 | [xiong356/dsh-draft-optimizer](https://github.com/xiong356/dsh-draft-optimizer) | 0 | 2026-10-23 | 2026-10-23 | 为 DeepSeek Harness (DSH) 打造的输入框草稿优化插件：点一下 ✦，用当前默认模型把提示词草稿改得更完整、更有效，原地替换、绝不自动发送。 |
| 355 | [xueelf/dsh-plugin-danmu](https://github.com/xueelf/dsh-plugin-danmu) | 0 | 2026-10-19 | 2026-10-23 | Real-time danmu for DeepSeek Harness (dsh). It inserts text such as the agent's reasoning, tool calls and task progress into the conversation area as scrolling text. |
| 356 | [xy261624/dsh-companion-memory](https://github.com/xy261624/dsh-companion-memory) | 0 | 2026-10-23 | 2026-10-23 | DeepSeek Harness 的跨会话记忆与主动唤醒方案。面向角色扮演（RP）、长期陪伴、AI 恋人场景。记忆由角色自己第一人称整理，带对抗式审查和随机心跳。 |
| 357 | [xyzYaeMiko/dsh-session-groups](https://github.com/xyzYaeMiko/dsh-session-groups) | 0 | 2026-10-22 | 2026-10-23 | dsh会话分组插件（仿edge标签页分组） |
| 358 | [Yaemikoreal/dsh-plugin-obsidian](https://github.com/Yaemikoreal/dsh-plugin-obsidian) | 0 | 2026-10-23 | 2026-10-23 | Obsidian vault bridge for DeepSeek Harness: search, read, and write notes as agent tools, plus live Obsidian app integration |
| 359 | [yangshourong/dsh-plugin-radar](https://github.com/yangshourong/dsh-plugin-radar) | 0 | 2026-10-23 | 2026-10-23 | 让 DeepSeek Harness 的 Agent 帮你找插件：GitHub + 社区精选多源搜索，支持中文与离线兜底。Plugin discovery for DSH. |
| 360 | [yangsong608/dsh-session-handoff](https://github.com/yangsong608/dsh-session-handoff) | 0 | 2026-10-22 | 2026-10-23 | DSH 会话接力插件：提交按钮旁一键总结会话、固化记忆、生成交接文档并在新会话继续 \| DeepSeek Harness session-handoff plugin |
| 361 | [Yangxingyu789/dsh-doubt](https://github.com/Yangxingyu789/dsh-doubt) | 0 | 2026-10-23 | 2026-10-23 | dsh-doubt — evidence-first completion guard for DeepSeek Harness (DSH): pre-execution live-mutation gate, tool-evidence final-answer review, and verify_claims. 用实测证据替代“你确定吗”。 |
| 362 | [Yebeimu/dsh-pwsh-fast](https://github.com/Yebeimu/dsh-pwsh-fast) | 0 | 2026-10-23 | 2026-10-23 | 每次工具调用少等约四秒：Windows 上跳过 DSH 钩子的 pwsh 包装 |
| 363 | [yesterday06/dsh-brain](https://github.com/yesterday06/dsh-brain) | 0 | 2026-10-23 | 2026-10-23 | 给 DeepSeek Harness 的四层记忆插件：跨对话记住你，上下文 80% 自动接班           A memory brain for DeepSeek Harness: layered memory across conversations and workspaces, on-demand injection, and automatic hand-off to a new session at 80% context with model and permission inheritance. |
| 364 | [yinfoyuan/dsh-cicd](https://github.com/yinfoyuan/dsh-cicd) | 0 | 2026-10-23 | 2026-10-23 | DeepSeek Harness 插件：把每个项目自己的 CI/CD 流水线接进会话——列流水线、触发、跟踪、读日志、取消、看合并冲突。当前支持阿里云云效 Flow。 |
| 365 | [YOGEMOW/dsh-cyrene-philia093-0](https://github.com/YOGEMOW/dsh-cyrene-philia093-0) | 0 | 2026-10-23 | 2026-10-23 | 昔涟（PHILIA093）· 新卷：sealed 人设 + 五育成长记忆（日月年梦/余页）+ 双模式能力 + 思源镜像/恢复 + 设置面板 |
| 366 | [yomo1024/dsh-bg-studio](https://github.com/yomo1024/dsh-bg-studio) | 0 | 2026-10-23 | 2026-10-23 | DSH 插件：给 claude-style 主题加背景图、内容透明度、侧栏字号、顶部导航字号，以及顶部导航独立折叠 |
| 367 | [youmu129/dsh-aliyun-bailian-provider](https://github.com/youmu129/dsh-aliyun-bailian-provider) | 0 | 2026-10-23 | 2026-10-23 | DSH provider 插件：bailian-token-plan 播种 + 百炼用量 pill（console 网关直连） |
| 368 | [yoyo636/dsh-workbuddy-connect-next](https://github.com/yoyo636/dsh-workbuddy-connect-next) | 0 | 2026-10-23 | 2026-10-23 | 把 WorkBuddy 桌面 App 的模型接入 DeepSeek Harness：侧栏额度卡、中栏仪表盘、多账号轮换与每日签到。对齐 DSH 0.2.1-rc.2。 |
| 369 | [yrsxy/dsh-warm-theme](https://github.com/yrsxy/dsh-warm-theme) | 0 | 2026-10-23 | 2026-10-23 | DSH 护眼配色包 —— 5 套低蓝光配色，通过官方 ctx.theme.overrideTokens 扩展点覆盖语义 token，零布局改动、热生效、卸载即还原。 |
| 370 | [yunshu-iii/dsh-api-usage-meter](https://github.com/yunshu-iii/dsh-api-usage-meter) | 0 | 2026-10-23 | 2026-10-23 | DSH Harness 桌面端插件：窗口底部状态栏显示 DeepSeek API 余额与 token 用量 \| Desktop plugin for DeepSeek Harness |
| 371 | [yya12123/dsh-notebook](https://github.com/yya12123/dsh-notebook) | 0 | 2026-10-23 | 2026-10-23 | A loose-leaf notebook memory plugin for DeepSeek Harness — compaction no longer means forgetting. |
| 372 | [yyyzl/dsh-image-feedback](https://github.com/yyyzl/dsh-image-feedback) | 0 | 2026-10-22 | 2026-10-23 | Native image feedback sidebar for DeepSeek Harness: annotate, reposition and send. |
| 373 | [zcr268/dsh-permission-studio](https://github.com/zcr268/dsh-permission-studio) | 0 | 2026-10-23 | 2026-10-23 | DSH 权限档位工作室：分类、工具、命令、文件路径四层细配，多档位会话内切换，每条拒绝都能引导模型 |
| 374 | [zehuan-huang/dsh-codex-runs](https://github.com/zehuan-huang/dsh-codex-runs) | 0 | 2026-10-23 | 2026-10-23 | DSH web plugin: read-only panel listing recent Codex CLI runs (status, duration, tokens, last message). |
| 375 | [zenVibeCoding/dsh-newapi-provider](https://github.com/zenVibeCoding/dsh-newapi-provider) | 0 | 2026-10-23 | 2026-10-23 | New API gateway for DeepSeek Harness: multi-channel models, quota, image and video generation |
| 376 | [zerofancy/dsh-startup-skip](https://github.com/zerofancy/dsh-startup-skip) | 0 | 2026-10-22 | 2026-10-23 | One-shot startup welcome shim for DeepSeek Harness Desktop. No fake API keys. MIT. |
| 377 | [ZhdanovDmitriy/dsh-pptx-builder](https://github.com/ZhdanovDmitriy/dsh-pptx-builder) | 0 | 2026-10-22 | 2026-10-23 | PowerPoint deck builder for DeepSeek Harness: pastel templates, Python charts, code cards and a Presentations mode. |
| 378 | [zhinuorao-ship-it/dsh-ascii-binary](https://github.com/zhinuorao-ship-it/dsh-ascii-binary) | 0 | 2026-10-23 | 2026-10-23 | DeepSeek Harness 对话背景的二进制皮肤：鲨鱼每一格是一个 0 或 1，格子全黑。 非官方皮肤补丁 —— 不是原插件，需先装官方插件 GqqQq-Q/dsh-ascii-ocean。动画原著 stackedlol。 |
| 379 | [ZHUBAI0528/dsh-client-ui-aqua](https://github.com/ZHUBAI0528/dsh-client-ui-aqua) | 0 | 2026-10-23 | 2026-10-23 | Aqua 玻璃质感主题 · 适配 DeepSeek Harness V0.2.1-rc.2 · glassmorphism theme for DSH: adjustable blur/frost, fluid or wallpaper backdrop, unified corners; toggle off for the stock UI, no source changes |
| 380 | [zhujiuyi/dsh-leftpanel](https://github.com/zhujiuyi/dsh-leftpanel) | 0 | 2026-10-23 | 2026-10-23 | DSH left panel plugin |
| 381 | [zhujiuyi/dsh-mcpserver-manager](https://github.com/zhujiuyi/dsh-mcpserver-manager) | 0 | 2026-10-23 | 2026-10-23 | DSH MCP Server Manager |
| 382 | [zhupipi07/dsh-blender-router](https://github.com/zhupipi07/dsh-blender-router) | 0 | 2026-10-23 | 2026-10-23 | Route DSH agents to the full Blender capability surface and the user's real addons: intent router + live bpy.ops discovery + usage coverage. |
| 383 | [zoushangkun-dev/dsh-startup-auth-cn](https://github.com/zoushangkun-dev/dsh-startup-auth-cn) | 0 | 2026-10-23 | 2026-10-23 | 给 DeepSeek Harness 手搓的开机门：六幕冷启动动画 + PIN / Windows Hello / 验证器动态码，纯本地、零依赖 |
| 384 | [zzzzyppp/dsh-skill-desc-zh](https://github.com/zzzzyppp/dsh-skill-desc-zh) | 0 | 2026-10-23 | 2026-10-23 | 把 DSH 技能与斜杠命令描述自动翻译为中文，并在设置页管理技能与第三方插件（技能 CRUD、禁用、回收站、检查更新） |

## 从快照消失的已核准仓库 / Approved repositories missing from the snapshot

已核准但已不在当前快照中（删除或改名），核实后从 [data/approved.json](../approved.json) 移除或更新名称。

Approved but no longer present in the current snapshot (deleted or renamed) — after checking, remove them from [data/approved.json](../approved.json) or update the name.

- Clukay-Fun/dsh-codex-link
- Dekurri/dsh-windows-minimal-adapter
- dmsobtl/dsh-llm-vision-router
- dragonbaba/dsh-routing-suite
- gsnowdrift/dsh-feishu-reader
- huanlin-labs/dsh-isolation-gate
- icrefin/dsh-model-reasoning-levels
- jisvrin/dsh-mobile-watch
- jiweiyx/dsh-plugin-knowmesh
- Kevinwu901113/dsh-computer
- lgtuusb/dsh-peer
- LiFenrir/dsh-scenario
- mugi995/DSH-forJP-TUI
- Natsubrei/dsh-mermaid
- QT7-C23/DSH-Marketplace
- SeverusZh/dsh-workspace-board
- Storm-Starlight/dsh-mcp-skills-board
- suiyideali/dsh-selection-toolbar
- TanukiRei/tanuki-toolbox
- Traveritas/petween
- xiaml666/dsh-plugin-cost
- xinming-chenniang/dsh-longshot
- xinming-chenniang/dsh-open-at-last-input
- yangsong608/dsh-moss-workbench
- yuan-source-666/dsh-research-autoresearch
