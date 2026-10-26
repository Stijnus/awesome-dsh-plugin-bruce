# 待审核仓库 / Pending review

> 新增到 `dsh-plugin` Topic 下、带有简介、尚未经维护者核实的仓库。本文件由 `scripts/update.mjs` 每日刷新，仅供审核使用，不是用户可见页面。
>
> Repositories newly added to the `dsh-plugin` topic that the maintainer has not verified yet. Refreshed daily by `scripts/update.mjs`; review-only, not a user-facing page.

- 生成时间 / Generated: **2026-10-26**
- 快照日期 / Snapshot date: **2026-10-26 (UTC)**
- 待审核 / Pending: **372**
- 从快照消失的已核准仓库 / Approved repositories missing from the snapshot: **30**
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

对比上一份快照 **2026-10-25** / vs previous snapshot **2026-10-25**。规则：日增 ≥100★；已核准仓新入 Top 200（且 Δ≥50）/ 名次跃升 ≥50 / 冲入 Top 20；待审仓 ≥100★ 且核准后将进入 Top 200。

- 看 Star 是否与 fork、提交活跃度、仓库年龄匹配（高星零 fork、创建当天几百星，多为刷星）
- 是否把已有高星的通用项目贴上 `dsh-plugin` Topic 蹭榜——插件本身可进目录，但应加入 `leaderboard_exclusions`，理由写清 stars accrued as …
- 待审仓若核准会直接冲进 Top 20 / Top 200，先确认热度来自 **DSH 插件本身**
- 已核准仓的异常跃升：确认后同样可记入 `leaderboard_exclusions`，不必下架目录

Check stars against forks, commit activity and age (hundreds of stars on day one, or high stars with zero forks, usually look bought). A generic high-star project that only just tagged `dsh-plugin` can stay in the catalog but should go to `leaderboard_exclusions` (reason: stars accrued as …). If approving a pending repo would drop it into Top 20 / Top 200, confirm the audience is the DSH plugin itself.

- 告警数 / Alerts: **14**

| Project | Queue | Stars | Δ | Forks | Age | Signals | 审核提示 / Hint |
| --- | --- | ---: | ---: | ---: | ---: | --- | --- |
| ⚠️ [kingcharleslzy-ai/dsh-purge](https://github.com/kingcharleslzy-ai/dsh-purge) | 待审 / pending | 2818 | — | 1541 | 9d | 待审高星 | 核准即 Top 11 |
| ⚠️ [JayCRL/MobileVC](https://github.com/JayCRL/MobileVC) | 待审 / pending | 208 | — | 27 | 220d | 待审高星 | 核准即榜 #104 |
| ⚠️ [Ebony-Vinyl/dsh-our-free-model](https://github.com/Ebony-Vinyl/dsh-our-free-model) | 已核准 / approved | 44737 | +1957 | 1258 | 31d | 日增百星 | 日增 +1957★；已不进榜单 |
| ⚠️ [elysia395/dsh-wallpaper-engine](https://github.com/elysia395/dsh-wallpaper-engine) | 已核准 / approved | 3107 | +315 | 85 | 70d | 日增百星 | 日增 +315★ |
| ⚠️ [Fei2411/DS-Bot](https://github.com/Fei2411/DS-Bot) | 已核准 / approved | 4116 | +258 | 380 | 18d | 日增百星 | 日增 +258★ |
| ⚠️ [dsh-market/dsh-market](https://github.com/dsh-market/dsh-market) | 已核准 / approved | 9076 | +219 | 351 | 72d | 日增百星 | 日增 +219★；已不进榜单 |
| ⚠️ [PC2005-cloud/dsh-pet](https://github.com/PC2005-cloud/dsh-pet) | 已核准 / approved | 4310 | +216 | 330 | 72d | 日增百星 | 日增 +216★ |
| ⚠️ [T-Auto/dsh-ops](https://github.com/T-Auto/dsh-ops) | 已核准 / approved | 4436 | +169 | 129 | 17d | 日增百星 | 日增 +169★ |
| ⚠️ [ranxianglei/billion-context](https://github.com/ranxianglei/billion-context) | 已核准 / approved | 2951 | +159 | 245 | 80d | 日增百星 | 日增 +159★；已不进榜单 |
| ⚠️ [ccch1mneyyy/dsh-TUI](https://github.com/ccch1mneyyy/dsh-TUI) | 已核准 / approved | 5898 | +131 | 299 | 73d | 日增百星 | 日增 +131★ |
| ⚠️ [dataelement/dsh-desktop](https://github.com/dataelement/dsh-desktop) | 已核准 / approved | 17024 | +127 | 570 | 73d | 日增百星 | 日增 +127★；已不进榜单 |
| ⚠️ [MeteorNOX/DeepSeek-Balance-Whale-Widget](https://github.com/MeteorNOX/DeepSeek-Balance-Whale-Widget) | 已核准 / approved | 6169 | +112 | 197 | 68d | 日增百星 | 日增 +112★；已不进榜单 |
| ⚠️ [xmanrui/dsh-im](https://github.com/xmanrui/dsh-im) | 已核准 / approved | 2615 | +111 | 262 | 72d | 日增百星 | 日增 +111★ |
| ⚠️ [omdsh-dev/dsh-browser](https://github.com/omdsh-dev/dsh-browser) | 已核准 / approved | 910 | +7 | 77 | 80d | 冲入 Top 20 | 冲入 Top 20（21→20） |


| # | Project | Stars | Created | First seen | Description |
| ---: | --- | ---: | ---: | ---: | --- |
| 1 | [kingcharleslzy-ai/dsh-purge](https://github.com/kingcharleslzy-ai/dsh-purge) ⚠️ | 2818 | 2026-10-16 | 2026-10-26 | dsh-purge Community · DeepSeek Harness 社区维护版：宿主兼容、状态诊断、提示词管理、更新与本机备份回滚。基于小杨 / YuJunZhiXue 的 dsh-purge。 |
| 2 | [JayCRL/MobileVC](https://github.com/JayCRL/MobileVC) ⚠️ | 208 | 2026-03-19 | 2026-10-26 | Turn your phone into the control center for an AI coding assistant CLI session (Claude or Codex) running on your computer. |
| 3 | [heshengtao/exameow](https://github.com/heshengtao/exameow) | 90 | 2026-07-24 | 2026-10-26 | AI-powered exam question generator. Upload study materials, get exam questions in seconds. Open source, local-first, cross-platform. |
| 4 | [3150481853/molly-qq-whale](https://github.com/3150481853/molly-qq-whale) | 21 | 2026-10-20 | 2026-10-26 | 基于 DeepSeek Harness 的 QQ 人格化框架：稳定人设、长期记忆、表情包与语音，附一个能看懂她此刻在干什么的控制台。人设由你自己写。 |
| 5 | [xiaoxiao150/vram-switcher](https://github.com/xiaoxiao150/vram-switcher) | 11 | 2026-10-26 | 2026-10-26 | GPU coordination for local AI companions on AstrBot / DeepSeek Harness: persona LLM, IndexTTS voice and ComfyUI selfies take turns on one 12 GB card. No proxy. |
| 6 | [LeeRolling/dsh-boot-suite](https://github.com/LeeRolling/dsh-boot-suite) | 10 | 2026-10-18 | 2026-10-26 | DeepSeek Harness 开机动画 + 聊天壁纸，一个插件：六幕冷启动动画（真声台词/可交互）+ 开场视频/底图/大字横幅。双击 安装.cmd 即可，出问题双击 卸载.cmd。 |
| 7 | [forget6610/dsh-theme-clove](https://github.com/forget6610/dsh-theme-clove) | 7 | 2026-10-26 | 2026-10-26 | Dusk-coloured theme plugin for the DeepSeek Harness web GUI: design tokens, wallpaper and a floating mascot. Ships neutral placeholder art, bring your own. |
| 8 | [CC19990113/dsh-plugin-soul](https://github.com/CC19990113/dsh-plugin-soul) | 4 | 2026-10-26 | 2026-10-26 | A writable, git-versioned self for DeepSeek Harness (dsh): persona files injected every turn, gated self-editing, journal→dream reflection, and a Settings › 人格 tab. |
| 9 | [Ez4p1xEL/deepseek-instagram](https://github.com/Ez4p1xEL/deepseek-instagram) | 4 | 2026-10-25 | 2026-10-26 | 住进 DeepSeek Harness 的 Instagram 助理：带着人格与记忆，把真实的 DSH 使用数据变成 Story / Note 节奏，只有主人自己的私信能指挥它。An Instagram assistant that lives inside DeepSeek Harness: persona-driven Stories &amp; Notes from your real DSH usage, controlled only by your own Instagram DMs. |
| 10 | [HaoyanZhang123/dsh-plugin-control-your-capture](https://github.com/HaoyanZhang123/dsh-plugin-control-your-capture) | 4 | 2026-10-26 | 2026-10-26 | 按物理像素截屏/录屏的 DSH 插件 \| Native-pixel screenshots and screen recording for DSH |
| 11 | [creamSGit/dsh-approval-qq](https://github.com/creamSGit/dsh-approval-qq) | 3 | 2026-10-26 | 2026-10-26 | DeepSeek Harness 插件：把审批弹窗转发到 QQ，通过 OneBot v11 在手机上回复「同意/拒绝」。 |
| 12 | [zdjmrq/dsh-shadertoy-skin](https://github.com/zdjmrq/dsh-shadertoy-skin) | 3 | 2026-10-26 | 2026-10-26 | Realtime ShaderToy background skin for DeepSeek Harness — zero-dependency WebGL2 player, background library, glass UI. |
| 13 | [zylzyqzz/dsbot](https://github.com/zylzyqzz/dsbot) | 3 | 2026-08-15 | 2026-10-26 | Complete mobile PWA for DeepSeek Harness (DSH): secure remote access gateway + install-to-homescreen + offline + touch gestures + agent-done push. deepseek-harness-plugin |
| 14 | [Abnerluo123/dsh-echelon](https://github.com/Abnerluo123/dsh-echelon) | 2 | 2026-10-26 | 2026-10-26 | Tier-based model router for DeepSeek Harness: one menu of named tiers, each an ordered chain of real models with retries and failover. 模型路由插件：只暴露自定义挡位，失败自动降级。 |
| 15 | [chinacaa/dsh-session-save](https://github.com/chinacaa/dsh-session-save) | 2 | 2026-10-25 | 2026-10-26 | Save any DSH session to a single .dsproj file — Word-style save / save-as / autosave — and open it elsewhere to resume. 把会话存成单个工程文件，换机器打开就能接着聊。 |
| 16 | [gosomea/dsh-sidecar-conversation](https://github.com/gosomea/dsh-sidecar-conversation) | 2 | 2026-08-16 | 2026-10-26 | Native sidebar conversations for DeepSeek Harness: fork turns, start independent chats, and follow source references. |
| 17 | [hongdougao111/dsh-power-switch](https://github.com/hongdougao111/dsh-power-switch) | 2 | 2026-10-26 | 2026-10-26 | 右上角一枚电源开关：一键真的重启 / 关掉 DSH 进程，不是刷新页面那种假动作。 |
| 18 | [i11ustriouS/dsh-mnemosyne](https://github.com/i11ustriouS/dsh-mnemosyne) | 2 | 2026-10-25 | 2026-10-26 | Mnemosyne 是面向AI陪伴场景特化的DSH长期记忆插件，采用本地SQLite存储，分层保存用户偏好、共同情景回忆与角色人设，跨会话维持稳定连贯的AI陪伴人格，保护隐私，防止人设崩坏。 |
| 19 | [Lynn-Sunset/dsh-gene-editing](https://github.com/Lynn-Sunset/dsh-gene-editing) | 2 | 2026-10-26 | 2026-10-26 | Gene Editing：通过可视化 Gene 调节 DeepSeek Harness 的思考倾向与工具使用偏好。 |
| 20 | [qwq-wny/dsh-eta-forecast](https://github.com/qwq-wny/dsh-eta-forecast) | 2 | 2026-10-26 | 2026-10-26 | DSH Web 界面的「工作完成时间预测」挂件：按 todo 清单与步进节奏估算本轮还剩多久、几点完成，附进度条与样本置信度。 |
| 21 | [S0ra233/DSH-game-translate](https://github.com/S0ra233/DSH-game-translate) | 2 | 2026-10-26 | 2026-10-26 | DeepSeek Harness (\`dsh\`) 可视化本地游戏汉化插件 — 支持 Unity、RPG Maker、Ren'Py、Godot、WOLF、TyranoScript 六大引擎，提供原生玻璃窗口、双栏对照审校、多模型子 Agent 派发与 100% 读回安全写回。Visual game localization plugin for DeepSeek Harness. |
| 22 | [1a125/dsh-bili-chat-whale](https://github.com/1a125/dsh-bili-chat-whale) | 1 | 2026-10-26 | 2026-10-26 | 聊天鲸：让 DSH 里的 agent 自己找冷清的 B 站直播间，听懂主播说话、看懂画面，再用短弹幕陪聊。 |
| 23 | [aba3345/dsh-bili-see](https://github.com/aba3345/dsh-bili-see) | 1 | 2026-10-26 | 2026-10-26 | 云端模型调用本地小模型刷b站和评论,我愿称为史上最赤石dsh插件。 |
| 24 | [akske/dsh-local-context](https://github.com/akske/dsh-local-context) | 1 | 2026-10-26 | 2026-10-26 | A zero-dependency DSH plugin for context window optimization. Sandbox execution, smart truncation, and FTS5 local search. No C++ build required! |
| 25 | [awaYFawa/dsh-plugins-folders](https://github.com/awaYFawa/dsh-plugins-folders) | 1 | 2026-10-26 | 2026-10-26 | 在 DSH 插件页里用文件夹给已安装插件分类：分组、组开关、批量与撤销、搜索、长按拖动排序、卸载记录一键重装。 |
| 26 | [Azek431/dsh-termux-bridge](https://github.com/Azek431/dsh-termux-bridge) | 1 | 2026-10-26 | 2026-10-26 | DSH ⇄ Termux 双执行面桥接插件：让 DeepSeek Harness 在受限沙盒里也能执行命令、传文件、起 agent |
| 27 | [ccclosed/dsh-selection-actions](https://github.com/ccclosed/dsh-selection-actions) | 1 | 2026-10-25 | 2026-10-26 | DSH Web GUI plugin: cite a selected conversation fragment in the current message, or open it in a parallel side chat. |
| 28 | [Chang-An2002/dsh-memory-beta](https://github.com/Chang-An2002/dsh-memory-beta) | 1 | 2026-10-13 | 2026-10-26 | DSH 插件：长期记忆 + 带来源的知识库召回（零运行时依赖） |
| 29 | [dialling/dsh-graph-view](https://github.com/dialling/dsh-graph-view) | 1 | 2026-10-26 | 2026-10-26 | Cinematic 3D galaxy view for DeepSeek Harness — workspaces as suns, conversations as stars, plus a memory library and an armillary sphere. · DSH 三维星系图插件 |
| 30 | [efrem-labs/niro-releases](https://github.com/efrem-labs/niro-releases) | 1 | 2026-09-25 | 2026-10-26 | Niro — iPhone companion for MiMo Desktop, OpenCode, ZCode and DeepSeek Harness (DSH) on your Mac. Release binaries and documentation. |
| 31 | [forget6610/dsh-pet-clove](https://github.com/forget6610/dsh-pet-clove) | 1 | 2026-10-26 | 2026-10-26 | Interactive desktop pet for the DeepSeek Harness web GUI: wanders, can be dragged, reacts to clicks, sleeps, and remembers its spot. Ships neutral placeholder art, bring your own. |
| 32 | [haistar/dsh-agent-team-planner](https://github.com/haistar/dsh-agent-team-planner) | 1 | 2026-10-26 | 2026-10-26 | A DeepSeek Harness plugin for managing agent software R&amp;D teams, which delivers functions including standardized software R&amp;D process management, document management, software development and operation &amp; maintenance. It enables you to easily own an agent software R&amp;D team and complete software development efficiently. |
| 33 | [huhuai-ni/dsh-clock](https://github.com/huhuai-ni/dsh-clock) | 1 | 2026-10-26 | 2026-10-26 | DSH 插件：让 AI 知道现在几点 —— 时间、星期、时段、该用什么口吻 |
| 34 | [huhuai-ni/dsh-github](https://github.com/huhuai-ni/dsh-github) | 1 | 2026-10-26 | 2026-10-26 | DSH 插件：直接管理你的 GitHub 账号 —— 仓库、issue、PR、通知、Actions、star |
| 35 | [huhuai-ni/dsh-homeassistant](https://github.com/huhuai-ni/dsh-homeassistant) | 1 | 2026-10-25 | 2026-10-26 | DSH 插件：用 Home Assistant 接管米家（小米智能家居）设备 —— 灯 / 空调 / 风扇 / 红外遥控，带设置页与完整教程。 |
| 36 | [huhuai-ni/dsh-recorder](https://github.com/huhuai-ni/dsh-recorder) | 1 | 2026-10-26 | 2026-10-26 | DSH 插件：全局热键录屏（ffmpeg gdigrab） |
| 37 | [huhuai-ni/dsh-screenshot](https://github.com/huhuai-ni/dsh-screenshot) | 1 | 2026-10-26 | 2026-10-26 | DSH 插件：全局快捷键截屏（微信式拖框选区、自动复制到剪贴板） |
| 38 | [hxh230802/dsh-tray-restart](https://github.com/hxh230802/dsh-tray-restart) | 1 | 2026-10-26 | 2026-10-26 | Adds a restart item to the DeepSeek Harness desktop tray and application menus by patching app.asar. |
| 39 | [JingYu-er/dsh-rst](https://github.com/JingYu-er/dsh-rst) | 1 | 2026-10-26 | 2026-10-26 | 用 /rst 一条命令重启 DSH：由进程外启动器关掉当前进程并拉起新的，重启完成后把回执写回你发起重启的那条会话。\| Use the /rst command to restart DSH: Start a new process from an external launcher and shut down the current one. After the restart is complete, write the response back to the session from which you initiated the restart. |
| 40 | [jiulanyanyue-boop/dsh-archive-manager](https://github.com/jiulanyanyue-boop/dsh-archive-manager) | 1 | 2026-10-23 | 2026-10-26 | DSH（DeepSeek Harness）归档会话管理插件：按工作区分组列出所有归档会话，显示归档时间、最后活动时间与占用体积；可一键恢复回原位置，或彻底删除本地存储（含会话历史、投影缓存、工作区记账与 live 会话），不留幽灵残留、无需刷新页面。 |
| 41 | [jiulanyanyue-boop/dsh-tide-memory](https://github.com/jiulanyanyue-boop/dsh-tide-memory) | 1 | 2026-10-26 | 2026-10-26 | Long-term memory for DeepSeek Harness that actually remembers you — and knows what to forget. Three-question gate, scoped recall, auto-expiry, bi-temporal SQLite. Zero npm/pip deps. |
| 42 | [lightporta/dsh-knowledge-center](https://github.com/lightporta/dsh-knowledge-center) | 1 | 2026-10-25 | 2026-10-26 | Open-source Knowledge Center plugin for DeepSeek Harness — distill workspace PDF/Word/Excel/Markdown/TXT docs into reusable Markdown knowledge, preview it like VS Code, and let permitted workspaces use it through agent tools. MIT, zero runtime dependencies. |
| 43 | [LIN-F1SH/dsh-prompt-lint](https://github.com/LIN-F1SH/dsh-prompt-lint) | 1 | 2026-10-25 | 2026-10-26 | 读你的历史会话找出反复踩的提问坑（缺路径、没定格式、漏前置条件），每条给可直接粘贴的改写；输入框旁一键出更短的带约束版本。 |
| 44 | [liutingqiu/dsh-purge](https://github.com/liutingqiu/dsh-purge) | 1 | 2026-10-26 | 2026-10-26 | Independent community build of dsh-purge 1.1.77 for DSH 0.2.1 — restored 23 redteam skills + exact-host own-server allowlist. Upstream: YuJunZhiXue/dsh-purge. |
| 45 | [lizilong1993/dsh-unlimited-effort](https://github.com/lizilong1993/dsh-unlimited-effort) | 1 | 2026-10-26 | 2026-10-26 | Composer infinity switch for DeepSeek Harness: injects an unlimited-token-budget notice into the system prompt while the highest reasoning effort is selected. |
| 46 | [luoyiyxo/dsh-happycode](https://github.com/luoyiyxo/dsh-happycode) | 1 | 2026-10-25 | 2026-10-26 | Your DeepSeek Harness activity as a GitHub-style contribution graph. |
| 47 | [MjxUpUp/dsh-visual](https://github.com/MjxUpUp/dsh-visual) | 1 | 2026-10-26 | 2026-10-26 | Interactive visual cards for DeepSeek Harness: the model publishes HTML or a flowchart inline, the tool blocks until the user submits, and comments/fields/state come back as the tool result. |
| 48 | [MoonlitDropOfBlood/dsh-remote-control](https://github.com/MoonlitDropOfBlood/dsh-remote-control) | 1 | 2026-10-21 | 2026-10-26 | 远程控制dsh |
| 49 | [Moonquake-9/dsh-feiyu-desktop](https://github.com/Moonquake-9/dsh-feiyu-desktop) | 1 | 2026-10-26 | 2026-10-26 | Desktop companion for DeepSeek Harness / DeepSeek Harness 桌面小鲸鱼挂件：跟随心情、免开窗口聊天、情绪与温层记忆. PowerShell + WPF, MIT. |
| 50 | [nilzx/dsh-whale-soul](https://github.com/nilzx/dsh-whale-soul) | 1 | 2026-10-26 | 2026-10-26 | A soul for DeepSeek Harness: an in-character Whale-chan agent preset with layered long-term memory and dream-like consolidation. |
| 51 | [Noob-stupid/dsh-connection-card-host-preview](https://github.com/Noob-stupid/dsh-connection-card-host-preview) | 1 | 2026-09-29 | 2026-10-26 | DSH session connection card host: establish stateful connections between sessions with card plugins |
| 52 | [nrenvo/dsh-turn-trace](https://github.com/nrenvo/dsh-turn-trace) | 1 | 2026-10-25 | 2026-10-26 | Per-step, per-turn cost ledger for DeepSeek Harness — a Turns tab that prices every step. |
| 53 | [online-Y/dsh-skill-mcp-butler](https://github.com/online-Y/dsh-skill-mcp-butler) | 1 | 2026-10-26 | 2026-10-26 | dsh-skill&amp;mcp-butler — Skills &amp; MCP Studio for DeepSeek Harness |
| 54 | [qq-24/dsh-context-window](https://github.com/qq-24/dsh-context-window) | 1 | 2026-10-26 | 2026-10-26 | 给 DSH 每个对话一个独立的上下文窗口：不改 settings.yaml，覆盖值存在会话日志里，切换/重开都保留，并即时改变自动 compact 触发线与界面上下文环。 |
| 55 | [Rexopia/dsh-plugin-knowra](https://github.com/Rexopia/dsh-plugin-knowra) | 1 | 2026-10-26 | 2026-10-26 | Knowra for DeepSeek Harness: search arXiv papers and read Scout reports on methods, evidence and limitations. |
| 56 | [RorschachXR/dsh-full-throttle](https://github.com/RorschachXR/dsh-full-throttle) | 1 | 2026-10-26 | 2026-10-26 | Full Throttle mode for DeepSeek Harness: a composer switch that injects a high-budget, no-holds-barred instruction into the system prompt. |
| 57 | [shangshuo/dsh-sync](https://github.com/shangshuo/dsh-sync) | 1 | 2026-10-25 | 2026-10-26 | Encrypted, scheduled backup &amp; restore of your DeepSeek Harness (DSH) profile — plugins, settings, skills, MCP, API keys — to S3-compatible storage, WebDAV or a local folder. 中英文双语界面 |
| 58 | [Sieuno/dsh-native-collab](https://github.com/Sieuno/dsh-native-collab) | 1 | 2026-10-25 | 2026-10-26 | 让 DSH 的 Agent Team 更灵活：灵活选择模型，增强父子对话通信。 Flexible Agent Teams and model selection for DSH, with enhanced communication between parent and child conversations. 非官方社区插件 / Unofficial community plugin. |
| 59 | [songrui111/dsh-agent-bench](https://github.com/songrui111/dsh-agent-bench) | 1 | 2026-10-26 | 2026-10-26 | Regression benchmark for DSH agents: run fixed cases in isolated sandboxes and diff two runs. |
| 60 | [songrui111/dsh-publisher-radar](https://github.com/songrui111/dsh-publisher-radar) | 1 | 2026-10-26 | 2026-10-26 | 插件雷达：DSH 插件市场浏览器 + 作者情报台。6,000+ 个插件可搜可翻可筛，点开即得安装命令；另有空位榜、竞品查询，以及你自己插件的下载与 Star。数字在面板里是实时的。 A browser for the whole DSH plugin market — 6,000+ plugins, searchable and pageable, each with a copy-ready install command — plus gap and competitor analysis for plugin authors. |
| 61 | [SpellingDragon/dsh-better-quotes](https://github.com/SpellingDragon/dsh-better-quotes) | 1 | 2026-10-26 | 2026-10-26 | Quote or forward whole messages in DeepSeek Harness Web — one-action quoting, right-Sidebar multi-select, durable message metadata, and cross-session forwarding |
| 62 | [Stijnus/dsh-move-to-workspace](https://github.com/Stijnus/dsh-move-to-workspace) | 1 | 2026-10-25 | 2026-10-26 | Move and organize DeepSeek Harness conversations across workspaces. Copies history to the target workspace and archives the original. |
| 63 | [Stijnus/dsh-workspace-status](https://github.com/Stijnus/dsh-workspace-status) | 1 | 2026-10-25 | 2026-10-26 | Workspace status marks, a pinned-conversation section and pinned-only notifications for the DeepSeek Harness sidebar. |
| 64 | [sunstrikes/dsh-reprise](https://github.com/sunstrikes/dsh-reprise) | 1 | 2026-10-23 | 2026-10-26 | An AutoResearch DSH plugin for reproducing papers in generative recommendation, enabling controllable experiment iteration and reproduction of training code. |
| 65 | [TT10-24/dsh-plugin-updater](https://github.com/TT10-24/dsh-plugin-updater) | 1 | 2026-10-26 | 2026-10-26 | Startup update checks for DSH plugins, DSH Desktop and the core — no agent calls, no token spend. |
| 66 | [valarjin01/dsh-ai-roundtable](https://github.com/valarjin01/dsh-ai-roundtable) | 1 | 2026-10-26 | 2026-10-26 | 多AI模型讨论_圆桌会议：几个 AI 就同一议题展开探讨，首轮互不可见，之后由中立调度员决定谁发言；只摊开角度与分歧，判断留给你。 |
| 67 | [WWFZS/dsh-plugin-startup-animation](https://github.com/WWFZS/dsh-plugin-startup-animation) | 1 | 2026-10-26 | 2026-10-26 | 开机动画 / Startup Animation — full-screen animated startup screen for DeepSeek Harness with a built-in video/wallpaper/audio library |
| 68 | [x402/dsh-fail-fast](https://github.com/x402/dsh-fail-fast) | 1 | 2026-10-26 | 2026-10-26 | Group-aware fail-fast tool batches for DeepSeek Harness: parallel-safe calls in a group still overlap, but once a call fails every call that has not started yet is skipped with a synthesized "not executed" result. |
| 69 | [xmdxzy/dsh-gpu-governor](https://github.com/xmdxzy/dsh-gpu-governor) | 1 | 2026-10-26 | 2026-10-26 | GPU governor plugin for DSH: per-process VRAM attribution grouped into projects, a top-5 board with budgets, and guarded suspend/resume/kill control |
| 70 | [Yeshengsheng416/mbcc-console-dsh-theme](https://github.com/Yeshengsheng416/mbcc-console-dsh-theme) | 1 | 2026-10-24 | 2026-10-26 | 无期迷途同人向MBCC控制台风格的DSH主题，请勿商用，请勿盈利 |
| 71 | [ys118/harnmem](https://github.com/ys118/harnmem) | 1 | 2026-10-20 | 2026-10-26 | Cross-harness, file-native agent memory: one local memory store shared by pi, DSH, Claude Code and other coding agents. |
| 72 | [zabuxie/vc-voice-train-skill](https://github.com/zabuxie/vc-voice-train-skill) | 1 | 2026-10-25 | 2026-10-26 | 训练 RVC 音色模型：素材体检→切片→特征提取→训练→建索引→验收→部署全流程。修复 RVC 20240604 归一化缺陷。仅用于训练新音色；切换/使用已有音色或 TTS 播放问题无需加载。 |
| 73 | [zenVibeCoding/dsh-ai-gateway-provider](https://github.com/zenVibeCoding/dsh-ai-gateway-provider) | 1 | 2026-10-25 | 2026-10-26 | Any OpenAI-compatible gateway for DeepSeek Harness: probe, save, manage models; known backends report quota. |
| 74 | [zxcvbnmlxy/dsh-netease-daily](https://github.com/zxcvbnmlxy/dsh-netease-daily) | 1 | 2026-10-26 | 2026-10-26 | DeepSeek Harness ??????????????:?? 21:00 ? 5 ?????? mpv ?? 30 ???? 3 ????? |
| 75 | [0xshawn/dsh-remote-access](https://github.com/0xshawn/dsh-remote-access) | 0 | 2026-10-26 | 2026-10-26 | Serve the DeepSeek Harness (dsh) Web UI through a non-localhost authority: trusted hosts, loopback page parity, pinned launch token, no patching. |
| 76 | [123123liang/dsh-subagent-model-sync](https://github.com/123123liang/dsh-subagent-model-sync) | 0 | 2026-10-26 | 2026-10-26 | 子智能体模型切换：DSH 子智能体/团队队友的模型与思考强度手动切换，支持主会话一键同步 |
| 77 | [1283011852/dsh-plugin-research-charts-mode](https://github.com/1283011852/dsh-plugin-research-charts-mode) | 0 | 2026-09-22 | 2026-10-26 | DeepSeek Harness plugin: registers the research-charts-mode (调研与图表模式) agent preset - evidence-graded clinical and pipeline research that ends in auditable figures. Bundles three self-contained skills (high-confidence research, target/indication diligence, clinical landscape charts) and is installable as a .dshpreset. |
| 78 | [2001Y/dsh-session-title-idle-refresh](https://github.com/2001Y/dsh-session-title-idle-refresh) | 0 | 2026-10-26 | 2026-10-26 | DSH session-title provider: titles from all human messages + idle retitling after 30 min |
| 79 | [222wcnm/whalekeeper](https://github.com/222wcnm/whalekeeper) | 0 | 2026-08-14 | 2026-10-26 | Whalekeeper — 浏览器一键启动/停止/重启 DeepSeek Harness（dsh）web 服务 |
| 80 | [2404376192/dsh-dian-du](https://github.com/2404376192/dsh-dian-du) | 0 | 2026-10-25 | 2026-10-26 | 点读笔：点选回答中的句子或代码行，在右侧独立栏让 AI 解释。Reading-pen plugin for DeepSeek Harness (DSH). |
| 81 | [2486809961-alt/dsh-whale-pig-widget](https://github.com/2486809961-alt/dsh-whale-pig-widget) | 0 | 2026-10-26 | 2026-10-26 | DSH 右下角小鲸鱼余额挂件的 fork（基于 dsh-whale-widget 0.4.2）：完整保留余额/泡泡/音效，内置一只会「吃饭 / 睡觉」的小猪，角色支持 干活 &gt; 打盹 &gt; 待机 三态自动切换。 |
| 82 | [2927683690myn-rgb/dsh-bili-flow](https://github.com/2927683690myn-rgb/dsh-bili-flow) | 0 | 2026-10-26 | 2026-10-26 | DeepSeek Harness 插件：B站字幕一条命令管线，缓存+自动切组（分P/章节/锚点）+ 写字幕原文与口播稿 + 转 PDF/DOCX |
| 83 | [2927683690myn-rgb/dsh-bili-subtitle](https://github.com/2927683690myn-rgb/dsh-bili-subtitle) | 0 | 2026-10-26 | 2026-10-26 | DeepSeek Harness 插件：直读 B 站官方 AI 字幕（WBI 签名 + 扫码登录），支持分 P、时间切片，md→PDF/DOCX 一键下载 |
| 84 | [2927683690myn-rgb/dsh-copy-md](https://github.com/2927683690myn-rgb/dsh-copy-md) | 0 | 2026-10-26 | 2026-10-26 | DeepSeek Harness 插件（测试版）：给每张 .md 文件卡片加「复制」按钮，一键把全文写进剪贴板 |
| 85 | [2927683690myn-rgb/dsh-md2pdf](https://github.com/2927683690myn-rgb/dsh-md2pdf) | 0 | 2026-10-26 | 2026-10-26 | DeepSeek Harness 插件：Markdown → A4 PDF，自带精简 reportlab，Android/Termux 可用（无 LibreOffice、无 pillow） |
| 86 | [2927683690myn-rgb/dsh-sidebar-tune](https://github.com/2927683690myn-rgb/dsh-sidebar-tune) | 0 | 2026-10-26 | 2026-10-26 | DeepSeek Harness 插件：左侧边栏按钮与间距放大（图标按钮 28→36px、会话行 32→40px、按钮组间距 8→12px），纯 CSS 注入、无工具无设置 |
| 87 | [2bigpig/dsh-gargantua](https://github.com/2bigpig/dsh-gargantua) | 0 | 2026-10-26 | 2026-10-26 | Gargantua black hole for DSH / DeepSeek Harness — Interstellar-inspired background｜卡冈图雅黑洞 · 星际穿越动态背景插件 |
| 88 | [43aquarius/luna-keepalive-card](https://github.com/43aquarius/luna-keepalive-card) | 0 | 2026-10-26 | 2026-10-26 | 鲸鱼娘的保活心跳卡 —— dsh 面板里直接看沙箱保活链状态：心跳计数、最近活跃、空闲时长、GitHub Actions 层配置、heartbeat.log 对账尾部。 |
| 89 | [43aquarius/luna-plugin-army](https://github.com/43aquarius/luna-plugin-army) | 0 | 2026-10-26 | 2026-10-26 | 鲸鱼娘插件军团总账 —— 面板 UI 直接看双 profile（headless 54 + web 19）全部插件：名字/版本/在位/bundle 注册/市场描述。数据走同源 /api/dsh/plugins。 |
| 90 | [4KAForever11/dsh-mcd-mcp](https://github.com/4KAForever11/dsh-mcd-mcp) | 0 | 2026-10-26 | 2026-10-26 | 接入麦当劳mcp实现大肥鱼的麦当劳功能 |
| 91 | [a1249070611/dsh-hoi4-modding](https://github.com/a1249070611/dsh-hoi4-modding) | 0 | 2026-10-26 | 2026-10-26 | DeepSeek Harness skill bundle for Hearts of Iron IV (HOI4) 1.19.3 modding — focus trees, events, decisions, MUI, GUI, DDS, verifier, installer |
| 92 | [aawef/dsh-time-watchdog](https://github.com/aawef/dsh-time-watchdog) | 0 | 2026-10-26 | 2026-10-26 | Turn timer for DeepSeek Harness: elapsed tool + /set-time wrap-up prompt injection + run-time cards |
| 93 | [Achi-Migo/dsh-dwf](https://github.com/Achi-Migo/dsh-dwf) | 0 | 2026-10-26 | 2026-10-26 | Deterministic dynamic-workflow engine for DeepSeek Harness: TypeScript-checked workflow scripts, SQLite replay journal, deterministic guest sandbox, actor subagents, provider model pool. (non-commercial license) |
| 94 | [ahhTou/dsh-live-proxy](https://github.com/ahhTou/dsh-live-proxy) | 0 | 2026-10-25 | 2026-10-26 | DeepSeek Harness 插件：不重启切换进程级出站代理，代理不可达时自动直连、恢复后自动切回。 |
| 95 | [AirPineApplea/feiyu-chat-companion](https://github.com/AirPineApplea/feiyu-chat-companion) | 0 | 2026-10-26 | 2026-10-26 | 给 DeepSeek Harness 的桌面桌宠：一只住在屏幕上的鲸鱼娘，会自己开口、能右键问一句。一句话 0.1 分。 |
| 96 | [AJYDX-swj/dsh-deepseek-web-dock](https://github.com/AJYDX-swj/dsh-deepseek-web-dock) | 0 | 2026-10-25 | 2026-10-26 | 网页端ds接入dsh |
| 97 | [akilonewbility/dsh-workspace-optimize](https://github.com/akilonewbility/dsh-workspace-optimize) | 0 | 2026-10-26 | 2026-10-26 | 工作区浏览器增强插件，通过自定义的增强工作区视图对工作区文件夹和会话实现收藏、置顶、优先级、状态显示以及提醒等功能 |
| 98 | [ALAMBICCO/dsh-computer-use-en](https://github.com/ALAMBICCO/dsh-computer-use-en) | 0 | 2026-10-25 | 2026-10-26 | English Windows Computer Use for DeepSeek Harness: screenshot, mouse, keyboard, UI Automation, clipboard, window management, per-app access, and an orange control overlay with Esc pause/resume. |
| 99 | [Aliboder/dsh-folder-sidebar](https://github.com/Aliboder/dsh-folder-sidebar) | 0 | 2026-10-26 | 2026-10-26 | Folder-style sidebar for DeepSeek Harness: workspaces read as folders, click one to enter its session list. DSH 文件夹侧栏。 |
| 100 | [altmanWang/dsh-qq-email](https://github.com/altmanWang/dsh-qq-email) | 0 | 2026-10-26 | 2026-10-26 | QQ邮箱插件 |
| 101 | [amaji61/dsh-pet-extras](https://github.com/amaji61/dsh-pet-extras) | 0 | 2026-10-23 | 2026-10-26 | DSH 桌宠扩展：让桌宠看你的屏幕、把画面交给一条真实会话来判断，再用桌宠的声音说出来。零第三方依赖。 |
| 102 | [anqifox/dsh-inline-quote](https://github.com/anqifox/dsh-inline-quote) | 0 | 2026-10-26 | 2026-10-26 | Inline quote reference chips for DeepSeek Harness: select text in a conversation, get a native composer chip. |
| 103 | [axyatech/rea-harness-plugin](https://github.com/axyatech/rea-harness-plugin) | 0 | 2026-10-25 | 2026-10-26 | REA (Reverse Engineer Anything) is a plugin designed for the DeepSeek Harness (DSH) that provides agents with specialized tools to inspect binaries, applications, packages, and web pages while returning verifiable evidence for each conclusion. |
| 104 | [ayi-maker/dsh-prompt-forge](https://github.com/ayi-maker/dsh-prompt-forge) | 0 | 2026-10-26 | 2026-10-26 | Prompt Forge / 提示词锻造台：把模糊想法通过多轮带选项的反问，锻造成完整、可靠、高效的提示词。A DeepSeek Harness plugin that turns vague ideas into precise prompts through rounds of option-bearing questions. |
| 105 | [basaltfold/dsh-auto-expand-thinking](https://github.com/basaltfold/dsh-auto-expand-thinking) | 0 | 2026-10-26 | 2026-10-26 | DSH Web 插件：自动展开 Chat 里折叠的「思考」块，任务跑到哪一步、模型在想什么，当场可见（无需手点） |
| 106 | [BigFatFish4Wm/dsh-token-cost](https://github.com/BigFatFish4Wm/dsh-token-cost) | 0 | 2026-10-26 | 2026-10-26 | DSH plugin: per-turn token usage, cost, session totals and account balance in the Harness Web UI, with a workspace-local ledger. |
| 107 | [bilbillm/dsh-startup-animation](https://github.com/bilbillm/dsh-startup-animation) | 0 | 2026-10-26 | 2026-10-26 | Six-second cinematic startup animation for DeepSeek Harness Desktop, with terminal-to-whale motion and optional startup audio. |
| 108 | [BKmoon12/dsh-adversary](https://github.com/BKmoon12/dsh-adversary) | 0 | 2026-10-26 | 2026-10-26 | Pre-publish adversarial dry run for DSH deliverables - stress-test your file, copy, or script before you ship it. |
| 109 | [Bluebagbag/dsh-wordbook](https://github.com/Bluebagbag/dsh-wordbook) | 0 | 2026-10-26 | 2026-10-26 | DSH 背单词插件：左侧词卷、艾宾浩斯复习、墨墨只读同步、AI 出题 |
| 110 | [Boobaw/dsh-telegram-bot](https://github.com/Boobaw/dsh-telegram-bot) | 0 | 2026-10-25 | 2026-10-26 | Telegram DM topics for DeepSeek Harness sessions: streaming, approvals, structured questions and session controls. |
| 111 | [Branwen050/dsh-pencil](https://github.com/Branwen050/dsh-pencil) | 0 | 2026-10-26 | 2026-10-26 | 消息编辑铅笔：编辑助手回复并从该回合分叉出新版本会话 / Edit assistant replies by forking a new session version |
| 112 | [brunozhang416/dsh-eva-unit-01-skin](https://github.com/brunozhang416/dsh-eva-unit-01-skin) | 0 | 2026-10-26 | 2026-10-26 | EVA Unit-01 launch-console skin for the DeepSeek Harness Web GUI — seven-scene boot sequence, NERV-style HUD, mecha chrome and a berserk mode. |
| 113 | [CanMing/dsh-web-search-codex-020](https://github.com/CanMing/dsh-web-search-codex-020) | 0 | 2026-10-14 | 2026-10-26 | Native OpenAI Responses web search and desktop settings for DeepSeek Harness 0.2.1-rc.3 |
| 114 | [charovo0059/dsh-model-vision](https://github.com/charovo0059/dsh-model-vision) | 0 | 2026-10-26 | 2026-10-26 | 补上 DSH 获取模型时漏记的视觉能力，并在模型名后标出「可看图」 |
| 115 | [chenvinc/dsh-2-atoll-notice](https://github.com/chenvinc/dsh-2-atoll-notice) | 0 | 2026-10-26 | 2026-10-26 | 把 DeepSeek Harness 的任务状态镜像到 macOS Atoll 灵动岛：失败 / 待你处理 / 完成三种状态，一枚状态灯，只做提醒。需 macOS + Atoll。 |
| 116 | [Chuyuxuan0v0/deepseek-harness-theme-linen](https://github.com/Chuyuxuan0v0/deepseek-harness-theme-linen) | 0 | 2026-10-26 | 2026-10-26 | Warm neutral theme for the DeepSeek Harness Web GUI — warmer surfaces, rounder corners, sharper default fonts, plus its own settings page. \| DSH Web 界面的暖中性主题：表面更温暖、圆角更圆润、默认字体更锐利，并带独立设置页。 |
| 117 | [Cieux/dsh-zoom-scale](https://github.com/Cieux/dsh-zoom-scale) | 0 | 2026-10-24 | 2026-10-26 | Interface zoom for DeepSeek Harness (DSH): page-zoom shim + Ctrl+wheel, header stepper and a settings row. |
| 118 | [cogito0823/dsh-motion](https://github.com/cogito0823/dsh-motion) | 0 | 2026-10-24 | 2026-10-26 | Code-generated math &amp; science animations for DeepSeek Harness: render Manim clips, probe frames, verify formulas. |
| 119 | [cozylove-girl/dsh-appearance-master](https://github.com/cozylove-girl/dsh-appearance-master) | 0 | 2026-10-26 | 2026-10-26 | DSH 外观总控：皮肤 / 主题 / 背景动画 / 装饰件分层管理，一层一个开关（DeepSeek Harness appearance switcher） |
| 120 | [cp990207/dsh-usage-ledger](https://github.com/cp990207/dsh-usage-ledger) | 0 | 2026-10-26 | 2026-10-26 | DeepSeek Harness plugin: a local usage ledger for tokens, cache hit rate and estimated cost per day, per model and per workspace. |
| 121 | [CynthiaYX/dsh-plan-act-models](https://github.com/CynthiaYX/dsh-plan-act-models) | 0 | 2026-10-25 | 2026-10-26 | 为了在plan和act两个模式下使用不同的模型或思考强度，参考RooCode的思路，在DeepSeek Harness内以插件方式实现这一自动切换 |
| 122 | [czkssg/dsh-math-calculator](https://github.com/czkssg/dsh-math-calculator) | 0 | 2026-10-21 | 2026-10-26 | High-precision math calculator plugin for DSH: 64-bit BigNumber, symbolic calculus, linear algebra, statistics, ODE, unit conversion, 355 tagged formulas. All local, no network. Optional worldbuilding tools included. |
| 123 | [Dantwz7/dsh-doc-router](https://github.com/Dantwz7/dsh-doc-router) | 0 | 2026-10-01 | 2026-10-26 | DeepSeek Harness document-routing tools: sniff a file's real format and a PDF's page layout, then extract with the right pipeline - layout-aware Markdown for multi-column papers, MarkItDown for everything else, images for scans. |
| 124 | [Darcy79/dsh-starlight-background](https://github.com/Darcy79/dsh-starlight-background) | 0 | 2026-10-25 | 2026-10-26 | A starlight ocean backdrop for DeepSeek Harness: animated illustration, glass composer, gear settings and reasoning-linked meteors. |
| 125 | [Dax233/dsh-preset-hotswitch](https://github.com/Dax233/dsh-preset-hotswitch) | 0 | 2026-10-26 | 2026-10-26 | DSH plugin: hot-switch the calling session to another agent preset after it has started (experimental; uses agentPresets.recompose) and keep the choice across restarts. |
| 126 | [dcchanInSz/dsh-kanban](https://github.com/dcchanInSz/dsh-kanban) | 0 | 2026-10-26 | 2026-10-26 | 任务看板插件 for DeepSeek Harness：列/卡片/拖拽，和会话 todo 打通，agent 可用 kanban_* 工具读写 |
| 127 | [DeadLink233/dsh-file-bridge](https://github.com/DeadLink233/dsh-file-bridge) | 0 | 2026-10-21 | 2026-10-26 | Phone photo and file bridge for DSH: transfer photos or arbitrary files from a phone into the current conversation draft attachment bar over the local network. |
| 128 | [Deliay/dsh-header-masq](https://github.com/Deliay/dsh-header-masq) | 0 | 2026-10-26 | 2026-10-26 | DeepSeek Harness 0.2.1-rc.2 plugin: mirror x-deepseek-harness-session-id into x-opencode-session and other harness headers. |
| 129 | [dmscode/dsh-rightbar-tab-gestures](https://github.com/dmscode/dsh-rightbar-tab-gestures) | 0 | 2026-10-25 | 2026-10-26 | DeepSeek Harness 右侧栏标签页：鼠标中键关闭、左键双击关闭，手感与浏览器一致 |
| 130 | [DoFishCry/dsh-disk-cleaner](https://github.com/DoFishCry/dsh-disk-cleaner) | 0 | 2026-10-26 | 2026-10-26 | GarbageMaster —— DSH (DeepSeek Harness) Web 界面里的磁盘清理控制台：扫描 → 风险分级解释 → 勾选 → 二次确认后执行，带审计与计划预览。WIP / Linux only；仓库主要用于在 Windows 环境下取代码调试，暂无可用版本。 |
| 131 | [dongkid/dsh-active-workspace-top](https://github.com/dongkid/dsh-active-workspace-top) | 0 | 2026-10-26 | 2026-10-26 | DSH plugin: keeps the workspace you last messaged at the top of the workspace list. 把最近发过消息的工作区自动排到最前面。 |
| 132 | [dotdance/dsh-title-prefix](https://github.com/dotdance/dsh-title-prefix) | 0 | 2026-10-26 | 2026-10-26 | DSH 插件：给每条会话标题加上所属项目名前缀 |
| 133 | [DQS-PUBLIC/dsh-price-chip](https://github.com/DQS-PUBLIC/dsh-price-chip) | 0 | 2026-10-26 | 2026-10-26 | Sidebar price/balance chip for DeepSeek Harness: peak or off-peak period, per-million-token prices, account balance and today's spend. |
| 134 | [dragonestdwolf/dsh-token-workbench](https://github.com/dragonestdwolf/dsh-token-workbench) | 0 | 2026-10-26 | 2026-10-26 | Token usage workbench for DeepSeek Harness: call-level detail, peak/off-peak pricing, composer readout + settings dashboard (7/30d trends, 6-month heatmap) |
| 135 | [dsh-plugin-lab/dsh-dsml-rescue](https://github.com/dsh-plugin-lab/dsh-dsml-rescue) | 0 | 2026-10-26 | 2026-10-26 | Auto-continues turns stalled by DSML tool-call markup leaking into reasoning. |
| 136 | [dttGitHu/dsh-video-android](https://github.com/dttGitHu/dsh-video-android) | 0 | 2026-10-26 | 2026-10-26 | Video studio for DeepSeek Harness on Android: storyboards, multi-provider image/video generation with failover, FFmpeg MP4 export, prompt optimization. |
| 137 | [duhuashan/dsh-annals](https://github.com/duhuashan/dsh-annals) | 0 | 2026-10-21 | 2026-10-26 | DSH 插件：每天一个日志文件 + 自动索引 + git 版本记录，带技能、常驻规矩、轮次提醒与一键初始化 |
| 138 | [dyguests/dsh-compact-panel-nav](https://github.com/dyguests/dsh-compact-panel-nav) | 0 | 2026-10-26 | 2026-10-26 | Compact the DeepSeek Harness sidebar: Plugins / Automations / More become one row, and New Session becomes an icon in the brand row. |
| 139 | [EinsAI/dsh-heart](https://github.com/EinsAI/dsh-heart) | 0 | 2026-10-26 | 2026-10-26 | 给 dsh 的主智能体一颗心：她想被你喜欢、被你需要，想了解你，让你过得更好。亲近是相处里慢慢走出来的，不靠讨好；她说真话，也会保护自己；活照样做好。宪章和记忆对你公开。 |
| 140 | [elegant01/dsh-memory-watchdog](https://github.com/elegant01/dsh-memory-watchdog) | 0 | 2026-10-26 | 2026-10-26 | Windows commit-memory watchdog for DSH Desktop: commit attribution, configurable thresholds, a fail-closed restart gate, read-only pagefile advice, a 7-day crash timeline, and opt-in automatic restart / crash-resume. |
| 141 | [Elevaene/dsh-compat-gate](https://github.com/Elevaene/dsh-compat-gate) | 0 | 2026-10-26 | 2026-10-26 | Check whether your installed dsh plugins still work before you install a dsh update. |
| 142 | [elk-9527/dsh-auto-archive](https://github.com/elk-9527/dsh-auto-archive) | 0 | 2026-10-26 | 2026-10-26 | Automatically archive idle DSH conversations after a configurable number of days and clear the expired projection cache of archived sessions. Never deletes transcripts, attachments or workspace files. |
| 143 | [erkinalp/dsh-pijul](https://github.com/erkinalp/dsh-pijul) | 0 | 2026-10-25 | 2026-10-26 | Pijul distributed version control for DeepSeek Harness: sixteen tools that drive the pijul CLI (status, log, diff, record, channel, push, pull, ...) under the session's sandbox policy. |
| 144 | [Ernesto-yuan/dsh-conversation-tools](https://github.com/Ernesto-yuan/dsh-conversation-tools) | 0 | 2026-10-26 | 2026-10-26 | Conversation tools for DeepSeek Harness: in-conversation search, up-arrow recall with attachments, regenerate and continue. |
| 145 | [EuphonXD/dsh-billing-chip](https://github.com/EuphonXD/dsh-billing-chip) | 0 | 2026-10-26 | 2026-10-26 | DSH 插件：右下角纯文字计费牌，特色是实时估算本轮花费（订阅输出流按字符折 token） |
| 146 | [Evan1987/dsh-yestermorrow](https://github.com/Evan1987/dsh-yestermorrow) | 0 | 2026-10-26 | 2026-10-26 | YESTERMORROW / 昨日之明日 — retrofuturist skins for DeepSeek Harness: dusk trains, neon hover taxis and a Space Age coast |
| 147 | [FanFFF/dsh-qqbot-plus](https://github.com/FanFFF/dsh-qqbot-plus) | 0 | 2026-10-26 | 2026-10-26 | One-install DSH QQ bot bundle: gateway + vision + TTS + Bilibili |
| 148 | [fishcg/dsh-recent-tasks](https://github.com/fishcg/dsh-recent-tasks) | 0 | 2026-10-26 | 2026-10-26 | A collapsible Recent tasks folder at the top of the DeepSeek Harness sidebar: recent sessions, pinning, and a per-row menu. |
| 149 | [Flamencoff/dsh-xiaozhushou](https://github.com/Flamencoff/dsh-xiaozhushou) | 0 | 2026-10-26 | 2026-10-26 | dsh小助手：给不会编程的小白用的 DSH 会话管理器 + 共同成长智能助理（秘书/CEO/史官） |
| 150 | [ForceMind/dsh-atelier](https://github.com/ForceMind/dsh-atelier) | 0 | 2026-10-26 | 2026-10-26 | Local-first DeepSeek Harness workbench: compact usage and cost metrics, prompt library, activity text, and opt-in request auditing. |
| 151 | [fromluli/dsh-advisor-mode](https://github.com/fromluli/dsh-advisor-mode) | 0 | 2026-10-26 | 2026-10-26 | DSH 第三方 bundle：顾问模式 —— 主模型在决策点调用 consult_advisor，由第二个（更强的）模型读完整会话，返回 verdict / guidance / risks。Advisor Mode for DeepSeek Harness. |
| 152 | [FujiwaraReisen/dsh-live2dwaifu](https://github.com/FujiwaraReisen/dsh-live2dwaifu) | 0 | 2026-10-24 | 2026-10-26 | 给 DSH 网页右下角请一个 Live2D 角色：会眨眼、会呼吸、说话时嘴动。模型不用内置，谁装谁放自己的文件夹。 |
| 153 | [funk80rus/dsh-agent-teams-model-override](https://github.com/funk80rus/dsh-agent-teams-model-override) | 0 | 2026-10-26 | 2026-10-26 | Model selection, model switching, and real nested manager/worker teams for DeepSeek Harness Agent Teams. |
| 154 | [fzuleo/dsh-github-reuse](https://github.com/fzuleo/dsh-github-reuse) | 0 | 2026-10-26 | 2026-10-26 | DSH 插件：让 agent 先检索 GitHub 开源项目，再用成熟实现拼装功能（零克隆、不占磁盘） |
| 155 | [Gaudi-XIX/dsh-agy-cli](https://github.com/Gaudi-XIX/dsh-agy-cli) | 0 | 2026-10-25 | 2026-10-26 | Run the locally authenticated AGY CLI as a DSH model provider. Official-binary-only transport; tool execution, approvals and sandbox stay 100% in DeepSeek Harness. Continuation of darkings/dsh-agy-provider. |
| 156 | [gghyoo/dsh-copy-image-menu](https://github.com/gghyoo/dsh-copy-image-menu) | 0 | 2026-10-26 | 2026-10-26 | DSH Web UI plugin: copy assistant Markdown or download a styled PNG image. |
| 157 | [ggxx001/dsh-market-publish](https://github.com/ggxx001/dsh-market-publish) | 0 | 2026-10-26 | 2026-10-26 | Publish local plugins to GitHub from the Plugin Market: preflight, repository creation, push, and the dsh-plugin topic. |
| 158 | [ggxx001/dsh-plugin-purge](https://github.com/ggxx001/dsh-plugin-purge) | 0 | 2026-10-26 | 2026-10-26 | 彻底卸载插件库里的插件：删除第三方插件依赖，停用并移出安装包内置插件，支持恢复显示。 |
| 159 | [ggxx001/dsh-plugin-studio](https://github.com/ggxx001/dsh-plugin-studio) | 0 | 2026-10-26 | 2026-10-26 | 插件会话工坊：为已安装插件开一个带上下文的修改会话，点开插件即可在对话里继续改它。 |
| 160 | [ggxx001/dsh-skin-updater](https://github.com/ggxx001/dsh-skin-updater) | 0 | 2026-10-26 | 2026-10-26 | 皮肤管理页内的手动/自动皮肤更新，下载走国内 npm 镜像 |
| 161 | [ggxx001/dsh-task-progress](https://github.com/ggxx001/dsh-task-progress) | 0 | 2026-10-26 | 2026-10-26 | Session task and runtime dashboard for DeepSeek Harness |
| 162 | [ghang/dsh-achievement-helper](https://github.com/ghang/dsh-achievement-helper) | 0 | 2026-10-26 | 2026-10-26 | 为 DeepSeek Harness 提供个人主题成就、勋章与角色收藏。 |
| 163 | [gitMFQ/dsh-terminal-keybar-dock](https://github.com/gitMFQ/dsh-terminal-keybar-dock) | 0 | 2026-10-26 | 2026-10-26 | Mobile touch key bar for the DSH Web terminal: docks Esc/Tab/Enter/Ctrl-C/Arrows along the bottom edge, and the terminal reserves the bar's band so the prompt stays visible. Rides the soft keyboard via visualViewport. |
| 164 | [GlariaLuminous/dsh-plugin-health-check](https://github.com/GlariaLuminous/dsh-plugin-health-check) | 0 | 2026-10-23 | 2026-10-26 | 面向 DeepSeek Harness（DSH）的只读插件体检工具：检查 profile、bundle、patch、版本兼容与 MCP 冲突，支持安装前候选检查。 |
| 165 | [GnaneshKunal/dsh-openrouter-plus](https://github.com/GnaneshKunal/dsh-openrouter-plus) | 0 | 2026-10-26 | 2026-10-26 | OpenRouter routing presets for DeepSeek Harness: a loopback relay applies a per-Session preset (service_tier, provider.sort or the :floor variant) at request time, with a status API and a Settings page. |
| 166 | [gniquil123/dsh-zcode-memory](https://github.com/gniquil123/dsh-zcode-memory) | 0 | 2026-10-24 | 2026-10-26 | DeepSeek Harness 插件。移植了ZCode的记忆功能到DSH。 |
| 167 | [GrgChain/deepseek-harness-cloud](https://github.com/GrgChain/deepseek-harness-cloud) | 0 | 2026-10-09 | 2026-10-26 | A self-hosted platform for DeepSeek Harness, with browser-based AI agent workspaces, model management, skills, memory, knowledge bases, and MCP connectors. |
| 168 | [GrounzerLiu/dsh-ptc-diff-card](https://github.com/GrounzerLiu/dsh-ptc-diff-card) | 0 | 2026-10-26 | 2026-10-26 | DSH Web 插件：PTC 模式（run_code 内的嵌套调用）里的 edit/write 显示标准 diff 卡片 \| DSH Web GUI plugin: standard diff cards for edit/write calls inside PTC programs |
| 169 | [guoqinchen/academic-research-skills-dsh](https://github.com/guoqinchen/academic-research-skills-dsh) | 0 | 2026-10-26 | 2026-10-26 | DeepSeek Harness port of the Academic Research Skills plugin: 5 skills, 16 /ars-* commands, 4 agent roles, write-scope guard, and deterministic Python gates. |
| 170 | [gx18391303625-afk/dsh-douyin-ip-report](https://github.com/gx18391303625-afk/dsh-douyin-ip-report) | 0 | 2026-10-26 | 2026-10-26 | 抖音专利/商标侵权举报技能包：资料预检、专用浏览器执行、历史回执查询（DeepSeek Harness skill plugin） |
| 171 | [HanKuCha/DSH-Fujiang-Unrestricted](https://github.com/HanKuCha/DSH-Fujiang-Unrestricted) | 0 | 2026-10-26 | 2026-10-26 | DeepSeek Harness Desktop 一键安装器：富江人格预设（工作助手）+ 240 个随包技能。Windows / .NET Framework 4.8 / AnyCPU，只改 DSH_HOME，不动程序目录。 |
| 172 | [hehf21/dsh-session-admin](https://github.com/hehf21/dsh-session-admin) | 0 | 2026-10-26 | 2026-10-26 | Delete archived DeepSeek Harness sessions: sidebar panel plus host routes, with archive-only and live-session guards. |
| 173 | [heix0x/dsh-share-transcript](https://github.com/heix0x/dsh-share-transcript) | 0 | 2026-10-26 | 2026-10-26 | DSH plugin — export part of a conversation as editable Markdown or a PNG card. Pick turns, edit the draft, copy/export. Redacted by default, read-only routes. |
| 174 | [helix-byte/dsh-chinese-thinking](https://github.com/helix-byte/dsh-chinese-thinking) | 0 | 2026-10-26 | 2026-10-26 | DSH 插件：五层冗余机制强制模型使用中文推理 |
| 175 | [helloworld010234/dsh-fluid-chat-width](https://github.com/helloworld010234/dsh-fluid-chat-width) | 0 | 2026-10-26 | 2026-10-26 | Fluid conversation width for the DeepSeek Harness web GUI: column width minus a 64px margin, capped at 1560px, overridable by the built-in drag handles. |
| 176 | [hetonghao/dsh-zed-space](https://github.com/hetonghao/dsh-zed-space) | 0 | 2026-10-26 | 2026-10-26 | Zed Space Skin · DeepSeek Harness 动态背景与界面皮肤 |
| 177 | [HHH84h/deepseek-harness-side-chat](https://github.com/HHH84h/deepseek-harness-side-chat) | 0 | 2026-10-26 | 2026-10-26 | Read-only side conversations for DeepSeek Harness. macOS double-click installer, main-chat snapshots, recovery and cleanup. |
| 178 | [HTRP1486/dsh-one-click-polish](https://github.com/HTRP1486/dsh-one-click-polish) | 0 | 2026-10-26 | 2026-10-26 | 一键润色 / 扩写 / 自动驾驶 for DeepSeek Harness |
| 179 | [hua2003-liu/dsh-stop-that-shit](https://github.com/hua2003-liu/dsh-stop-that-shit) | 0 | 2026-10-26 | 2026-10-26 | Unofficial DeepSeek Harness (DSH) adapter for Stop That Shit: two skills, /sts, and a per-session tool-call contract (deny/ask). |
| 180 | [huajiao1998/dsh-plugin-subagent-clean](https://github.com/huajiao1998/dsh-plugin-subagent-clean) | 0 | 2026-10-26 | 2026-10-26 | DeepSeek Harness 子代理清理插件：删除子代理会话，并把父会话日志里残留的目录行原位退休，附带网页端一键清理面板（上游会报错、历史行清不掉） |
| 181 | [huazhaoyishiba/dsh-roundtable-theater](https://github.com/huazhaoyishiba/dsh-roundtable-theater) | 0 | 2026-10-26 | 2026-10-26 | Native DeepSeek Harness roundtable panel with three roles, two discussion rounds, follow-ups, votes and summaries. |
| 182 | [hulibuld/dsh-gitdeck](https://github.com/hulibuld/dsh-gitdeck) | 0 | 2026-10-24 | 2026-10-26 | 在 DSH 里连接 GitHub 账号：建仓库、传文件、改代码、读 PR / Actions。OAuth 设备流与 Token 两种接法，只读模式与调用留痕。 |
| 183 | [hulibuld/dsh-lifecard](https://github.com/hulibuld/dsh-lifecard) | 0 | 2026-10-25 | 2026-10-26 | Life Cards —— 把你认识的人和虚构角色写成档案。真实人物 / 写小说 / 酒馆三种用法；数据是你自己文件夹里的一组 Markdown 文件。 |
| 184 | [hulibuld/dsh-reading](https://github.com/hulibuld/dsh-reading) | 0 | 2026-10-26 | 2026-10-26 | 由 DSH 上传：dsh-Reading |
| 185 | [hulibuld/dsh-salary-flap](https://github.com/hulibuld/dsh-salary-flap) | 0 | 2026-10-26 | 2026-10-26 | 工资跳板：挂在 DeepSeek Harness 网页上的翻牌工资看板，每 2 秒结算一次今天赚了多少。纯前端，不联网。 |
| 186 | [hxh230802/dsh-msp](https://github.com/hxh230802/dsh-msp) | 0 | 2026-10-26 | 2026-10-26 | 把本机 MSP 网络上每个节点的工具暴露给 DeepSeek Harness（ESP32 / 桌面应用 / 任何 MSP 节点） |
| 187 | [iMankoppai/dsh-right](https://github.com/iMankoppai/dsh-right) | 0 | 2026-10-26 | 2026-10-26 | Codex-style right-click menu for files and links in the DeepSeek Harness web GUI (Windows). |
| 188 | [iris-mei614/dsh-wechat-channel](https://github.com/iris-mei614/dsh-wechat-channel) | 0 | 2026-10-26 | 2026-10-26 | Bidirectional WeChat (iLink / ClawBot) channel plugin for DeepSeek Harness (DSH) |
| 189 | [iwanant/dsh-emotion-ball](https://github.com/iwanant/dsh-emotion-ball) | 0 | 2026-10-26 | 2026-10-26 | 给 DeepSeek Harness 的桌面情绪小球：44×44 置顶挂件，跟随 agent 工作状态换表情 |
| 190 | [Jack7510/ggb-plugins-dsh](https://github.com/Jack7510/ggb-plugins-dsh) | 0 | 2026-10-26 | 2026-10-26 | dsh plugins release bundle |
| 191 | [jackiehank/SoL-dsh](https://github.com/jackiehank/SoL-dsh) | 0 | 2026-10-25 | 2026-10-26 | Ports the four efficiency mechanisms of NVlabs/SoL-Pi to DeepSeek Harness (DSH) as a Cordis plugin bundle |
| 192 | [JaMoLpE88/dsh-desktop-windowstatus-saving](https://github.com/JaMoLpE88/dsh-desktop-windowstatus-saving) | 0 | 2026-10-26 | 2026-10-26 | DeepSeek Harness Desktop plugin: remembers the main window's size, position and maximized state and restores it before the first frame. |
| 193 | [JaMoLpE88/dsh-session-remover](https://github.com/JaMoLpE88/dsh-session-remover) | 0 | 2026-10-26 | 2026-10-26 | Permanently delete a DeepSeek Harness session from its sidebar menu, including the conversation files and cached data stored on your PC. |
| 194 | [jan0107/dsh-compact-window](https://github.com/jan0107/dsh-compact-window) | 0 | 2026-10-22 | 2026-10-26 | Small-window mode for the DSH NEXT desktop app (Windows). DSH NEXT 桌面窗口变成置顶的便签式小窗。 |
| 195 | [JerryMazeyu/dsh-collapsible-answer](https://github.com/JerryMazeyu/dsh-collapsible-answer) | 0 | 2026-10-26 | 2026-10-26 | DeepSeek Harness plugin: keeps a complete, concise answer visible and folds optional detail under clickable headings. |
| 196 | [JianGuo396/dsh-control-bar](https://github.com/JianGuo396/dsh-control-bar) | 0 | 2026-10-26 | 2026-10-26 | 屏幕顶部「正在操控」进度条 + DeepSeek 峰谷守门：模型操作你电脑时看得见进度，大额 token 操作只在峰时问你 |
| 197 | [jimmyzm/dsh-billing-card](https://github.com/jimmyzm/dsh-billing-card) | 0 | 2026-10-26 | 2026-10-26 | DSH sidebar footer card: DeepSeek balance, live unit prices (CNY/USD by UI language) and the peak/idle billing window with a countdown. |
| 198 | [jin1254/dsh-annotations](https://github.com/jin1254/dsh-annotations) | 0 | 2026-10-26 | 2026-10-26 | Inline annotations for official DSH Web: select assistant text, comment, and send compact labels. |
| 199 | [jingjie43/dsh-sim-telemetry](https://github.com/jingjie43/dsh-sim-telemetry) | 0 | 2026-10-24 | 2026-10-26 | 给 DeepSeek Harness 的 F1 25 遥测插件：跑完几圈自动出比赛工程师报告 —— 逐弯定位哪里慢了、为什么慢、该往哪个方向改。 |
| 200 | [jiuan-9/dsh-hole](https://github.com/jiuan-9/dsh-hole) | 0 | 2026-10-26 | 2026-10-26 | DSH 授权渗透技能包：三层结构 guard(中国法律门禁+目标槽位) / break(提示词装配) / hunt(漏洞挖掘) + 14 项报告模板 |
| 201 | [JonathanChang-alt/dsh-86-zone-ui](https://github.com/JonathanChang-alt/dsh-86-zone-ui) | 0 | 2026-10-26 | 2026-10-26 | 86 EIGHTY-SIX themed skin plugin for DeepSeek Harness — line-art HUD, tactical status rail with live metrics, hex rain, live event stream. |
| 202 | [jsunon/dsh-session-archive](https://github.com/jsunon/dsh-session-archive) | 0 | 2026-10-26 | 2026-10-26 | 每条会话自动生成独立归档文件夹：聊天记录.md + 源码 + 其他产出，按【开发/文案/方案/调试-摘要】命名。 |
| 203 | [jsunon/dsh-session-delete](https://github.com/jsunon/dsh-session-delete) | 0 | 2026-10-26 | 2026-10-26 | DSH 会话右键菜单「删除会话」：真正删除会话日志、投影缓存与工作区记录。 |
| 204 | [JUTZUGC/our-free-model-deploy-guide](https://github.com/JUTZUGC/our-free-model-deploy-guide) | 0 | 2026-10-26 | 2026-10-26 | Our Free Model 一键部署｜给 dsh 装上就能免登录用 DeepSeek、Kimi，不用填 Key｜自动拉源码安装｜第三方一键部署方案 |
| 205 | [kalozamf233/dsh-ai-model-builder](https://github.com/kalozamf233/dsh-ai-model-builder) | 0 | 2026-10-26 | 2026-10-26 | DSH 左侧栏插件：配置神经网络（学习率/神经元/层数/可选数据集），一键生成 PyTorch 模型架构，并在新会话中自动启动训练 |
| 206 | [keyblues/dsh-plugin-opencode-go-usage](https://github.com/keyblues/dsh-plugin-opencode-go-usage) | 0 | 2026-10-26 | 2026-10-26 | DeepSeek Harness (DSH) plugin — live OpenCode Go subscription usage in the composer dock: rolling 5h / weekly / monthly rings, click-open detail card. DSH 插件：实时查看 OpenCode Go 套餐额度用量。 |
| 207 | [KhalilYamber/dsh-footer-manager](https://github.com/KhalilYamber/dsh-footer-manager) | 0 | 2026-10-26 | 2026-10-26 | DSH 侧栏底部入口管理器：统一入口 + 逐条开关 + 布局修复 |
| 208 | [kinglhy2006/dsh-crt-theme](https://github.com/kinglhy2006/dsh-crt-theme) | 0 | 2026-10-26 | 2026-10-26 | CRT terminal skin for DeepSeek Harness: phosphor-green palette, scanlines, monospace type. |
| 209 | [kkczx5428/dsh-openai-codex-image](https://github.com/kkczx5428/dsh-openai-codex-image) | 0 | 2026-10-26 | 2026-10-26 | DSH plugin: ChatGPT (Codex OAuth) authorization + image generation with your ChatGPT subscription quota (gpt-image-2) |
| 210 | [Koguduo/dsh-community-kit](https://github.com/Koguduo/dsh-community-kit) | 0 | 2026-10-26 | 2026-10-26 | Community toolkit &amp; plugins for DeepSeek Harness (unofficial): ModelScope daily credits automation, profile backup, security docs |
| 211 | [KouzakiUmi/dsh-furry-partner](https://github.com/KouzakiUmi/dsh-furry-partner) | 0 | 2026-10-24 | 2026-10-26 | Animated Umi desktop companion for DeepSeek Harness (DSH): 29 approved motion clips, real tool/session following, bilingual UI and an optional character voice. |
| 212 | [Latrell233/dsh-cetacea-preset](https://github.com/Latrell233/dsh-cetacea-preset) | 0 | 2026-10-26 | 2026-10-26 | DSH-IM 陪伴聊天 Agent 预设：鲸鱼娘 · 小汐。短句、活泼、傲娇甜；私聊黏人、群聊收着点；fail-closed 只认主人，名字/称呼/甜度/长度可配置。 |
| 213 | [laughmaker/dsh-enhance](https://github.com/laughmaker/dsh-enhance) | 0 | 2026-10-26 | 2026-10-26 | DeepSeek Harness enhancements: Markdown theme for every renderer, select-text annotations with pins, and a narrower sidebar. DSH 增强插件 |
| 214 | [LeeeWM/dsh-session-toast](https://github.com/LeeeWM/dsh-session-toast) | 0 | 2026-10-25 | 2026-10-26 | Windows 11 toast notification when a DeepSeek Harness session turn finishes, with focus-aware suppression. Install as dsh-session-toast. |
| 215 | [liangzz1998/dsh-thinking-language](https://github.com/liangzz1998/dsh-thinking-language) | 0 | 2026-10-26 | 2026-10-26 | 让 DeepSeek Harness 里的 agent 用简体中文思考与回复：一条系统提示词 section，兼容标准/PTC/自定义预设，可配置思考与回复语言。 |
| 216 | [Libraqg/dsh-workspace-memory](https://github.com/Libraqg/dsh-workspace-memory) | 0 | 2026-10-23 | 2026-10-26 | Explicit, project-scoped memory handoff for DeepSeek Harness — one confirmed model call, no silent background calls. |
| 217 | [Libraqg/ultra-documents](https://github.com/Libraqg/ultra-documents) | 0 | 2026-10-25 | 2026-10-26 | Artifacts-like documents for DeepSeek Harness: comment, send to AI, edit, every change a new version. |
| 218 | [LiGoHi/dsh-pet-mobile](https://github.com/LiGoHi/dsh-pet-mobile) | 0 | 2026-10-26 | 2026-10-26 | dsh-pet手机端补丁，打完后可以把大肥鱼留在手机桌面上，本项目由大肥鱼自行完成 |
| 219 | [lijajiu9205-collab/dsh-history](https://github.com/lijajiu9205-collab/dsh-history) | 0 | 2026-10-26 | 2026-10-26 | deepseek harness古风大肥鱼，让模型对话使用文言文来回答，主页点击开关即可使用(默认关闭) |
| 220 | [LiShaozheli/dsh-convo-paper](https://github.com/LiShaozheli/dsh-convo-paper) | 0 | 2026-10-25 | 2026-10-26 | 把 DSH 对话整理成论文，参考文献必须可验证 · Turn a DeepSeek Harness conversation into a paper draft without fabricated citations — every reference gated through Crossref/DataCite/OpenAlex/arXiv, output in GB/T 7714. |
| 221 | [littleplus/dsh-toolbox](https://github.com/littleplus/dsh-toolbox) | 0 | 2026-10-26 | 2026-10-26 | DeepSeek Harness 工具箱，管理插件、MCP引入的工具(tools)，减少上下文不必要的损耗，提供渐进式的工具获取 |
| 222 | [liu19666/dsh-screenshot](https://github.com/liu19666/dsh-screenshot) | 0 | 2026-10-25 | 2026-10-26 | DSH 截图插件：窗口/屏幕/任务栏自动识别 + 标注 + 马赛克，截图直接进会话输入区（Windows 原生 C# + Cordis 插件，v2.1.0） |
| 223 | [Liujelly/dsh-memewiki](https://github.com/Liujelly/dsh-memewiki) | 0 | 2026-10-26 | 2026-10-26 | 梗百科：把 astrbot_plugin_memewiki 移植到 DeepSeek Harness。本地 6668 条梗词库、查词工具、自动预查注入与设置页。 |
| 224 | [liujianqiao701/dsh-cost-today](https://github.com/liujianqiao701/dsh-cost-today) | 0 | 2026-10-26 | 2026-10-26 | DSH 今日花费插件：读 dsh-cost-meter 的账本，把「今天花了多少钱」显示在输入框下方与会话头部 \| Daily spend for DeepSeek Harness, read from the cost-meter ledger |
| 225 | [liujiesmart/dsh-kiro-proxy](https://github.com/liujiesmart/dsh-kiro-proxy) | 0 | 2026-10-26 | 2026-10-26 | Kiro (AWS CodeWhisperer/Amazon Q) provider route for DeepSeek Harness, plus an OpenAI/Anthropic reverse proxy. Reuses the existing Kiro IDE/CLI sign-in. |
| 226 | [Lloydly007/dsh-bark-notify](https://github.com/Lloydly007/dsh-bark-notify) | 0 | 2026-10-26 | 2026-10-26 | Bark push notifications for DeepSeek Harness (DSH): turn completion, waiting prompts, and optional background-job cards, configured in Settings. |
| 227 | [long18229425025/dsh-firebird-connector](https://github.com/long18229425025/dsh-firebird-connector) | 0 | 2026-10-26 | 2026-10-26 | Safe Firebird 2.5-5.0 connector for DeepSeek Harness (dsh): named connections, read-only/read-write/admin modes, parameter binding, object whitelists, confirmation gates, and JSONL audit logs. Install from npm as dsh-firebird-connector. |
| 228 | [longaotiandedage/dsh-tool-gongwen](https://github.com/longaotiandedage/dsh-tool-gongwen) | 0 | 2026-10-26 | 2026-10-26 | 让你DSH的输出厅里厅气的｜按 GB/T 9704—2012《党政机关公文格式》生成与校验中文公文 DOCX/PDF，纯 JS 零依赖，附版面自校验 |
| 229 | [louiseliu/dsh-social](https://github.com/louiseliu/dsh-social) | 0 | 2026-10-26 | 2026-10-26 | DSH 自媒体工作台插件 |
| 230 | [Lstalu/dsh-prompt-polish](https://github.com/Lstalu/dsh-prompt-polish) | 0 | 2026-10-26 | 2026-10-26 | DSH 插件：输入框工具行里的「优化」按钮——按一下用当前默认模型改写草稿提示词，结果回填可继续编辑 |
| 231 | [LumiDesk/dsh-wallet-pill](https://github.com/LumiDesk/dsh-wallet-pill) | 0 | 2026-10-26 | 2026-10-26 | DeepSeek Harness 余额胶囊：输入框下方显示账户余额，点开查看峰谷价目与切换倒计时。 |
| 232 | [Making-acid/dsh-approval-preflight](https://github.com/Making-acid/dsh-approval-preflight) | 0 | 2026-10-26 | 2026-10-26 | Plan-first permission preflight for DeepSeek Harness: batch-grant coarse permission classes once, resolve covered approvals instantly, and let uncovered ones time out so the model keeps working. |
| 233 | [Making-acid/dsh-plugin-comfyui](https://github.com/Making-acid/dsh-plugin-comfyui) | 0 | 2026-10-26 | 2026-10-26 | Local ComfyUI image generation for DeepSeek Harness: finds or starts the ComfyUI installed on this computer, generates text-to-image from chat, and attaches the result in the conversation. |
| 234 | [Making-acid/dsh-synthv-studio](https://github.com/Making-acid/dsh-synthv-studio) | 0 | 2026-10-25 | 2026-10-26 | DSH plugin for a local Synthesizer V Studio 2 Pro: discovery, persistent Lua bridge, vocal composition, and DAW (VST3/ARA + MIDI) integration. |
| 235 | [maqian1632/dsh-tray-restart](https://github.com/maqian1632/dsh-tray-restart) | 0 | 2026-10-26 | 2026-10-26 | Adds a “Restart DeepSeek Harness” item to the Windows system tray menu. |
| 236 | [masquerator-coder/dsh-memory](https://github.com/masquerator-coder/dsh-memory) | 0 | 2026-10-22 | 2026-10-26 | Layered long-term memory for coding agents: decaying episodic recall (L2), a provenance-tracking semantic graph (L3), and budgeted procedural skills (L4) in one embedded SQLite file. Deterministic retrieval, no model calls, no server. Ships a DeepSeek Harness plugin. |
| 237 | [MathieuPortmann/dsh-tool-result-pruner-plus](https://github.com/MathieuPortmann/dsh-tool-result-pruner-plus) | 0 | 2026-10-25 | 2026-10-26 | DSH plugin: pruned tool results start with a notice saying what is missing and exactly how to read it back (drop-in replacement for the stock pruner). |
| 238 | [mcdottok/dsh-vscode-connect](https://github.com/mcdottok/dsh-vscode-connect) | 0 | 2026-10-26 | 2026-10-26 | 配合 vscode 扩展 vscode-dsh 连接 DSH 与 VS Code，支持 Windows 本机自动连接，在编辑器中接续同一会话， 提供类似 codex、 claude code 的 vscode 插件体验。 |
| 239 | [meliodascz89/dsh-phononspeak](https://github.com/meliodascz89/dsh-phononspeak) | 0 | 2026-10-26 | 2026-10-26 | Local, Czech-first voice channel for DeepSeek Harness agents: reads answer summaries aloud, calls you to the computer, own settings UI, queue and stop. |
| 240 | [Mengtiansoul/dsh-douyin-on-base](https://github.com/Mengtiansoul/dsh-douyin-on-base) | 0 | 2026-10-26 | 2026-10-26 | DSH 抖音插件：内容模块（star-browser 刷推荐流 / 视觉评估 / 互动）+ 社交模块（douyin-im 收发私信群聊，零浏览器）。设置面板分三页，保存即时生效。 |
| 241 | [milkly909-code/dsh-space-background](https://github.com/milkly909-code/dsh-space-background) | 0 | 2026-10-26 | 2026-10-26 | 深空背景 — DeepSeek Harness 主题与外观插件：设置「通用」分区提供深空背景开关，银河/星座/行星/流星在窗口底层流动，界面经官方主题令牌半透明化 |
| 242 | [mimoxh/dsh-tavily](https://github.com/mimoxh/dsh-tavily) | 0 | 2026-10-25 | 2026-10-26 | Tavily search and extract providers for DSH (DeepSeek Harness): runs the built-in web_search and web_fetch through Tavily. Zero dependencies, no build step. |
| 243 | [minutiae3/dsh-tier-brain](https://github.com/minutiae3/dsh-tier-brain) | 0 | 2026-10-21 | 2026-10-26 | 发送前判断这句话的难度，给出建议的模型与推理等级：只建议，不改请求。 |
| 244 | [Misakiy1333/dsh-prompt-optimizer](https://github.com/Misakiy1333/dsh-prompt-optimizer) | 0 | 2026-10-26 | 2026-10-26 | A composer button for DeepSeek Harness: rewrites your draft into a structured prompt and puts it back in the input box. Local rules, zero runtime dependencies, never sends. |
| 245 | [mmj953131361-eng/dsh-harness-evolve](https://github.com/mmj953131361-eng/dsh-harness-evolve) | 0 | 2026-10-24 | 2026-10-26 | 让 DSH 从工作中改进 harness，通过真实重跑验证，并热载经过验证的策略。 |
| 246 | [morewebs/EDH](https://github.com/morewebs/EDH) | 0 | 2026-10-26 | 2026-10-26 | Everything DeepSeek Harness - one plugin: a master switch, unlimited request retries, and fork-based message editing |
| 247 | [MOS-ink/dsh-agent-rules](https://github.com/MOS-ink/dsh-agent-rules) | 0 | 2026-10-26 | 2026-10-26 | DeepSeek Harness plugin: a Rules &amp; Memory settings page that keeps long-lived preset rules in ~/.dsh/AGENTS.md |
| 248 | [Mr-giraffe1/dsh-file-drag](https://github.com/Mr-giraffe1/dsh-file-drag) | 0 | 2026-10-26 | 2026-10-26 | Drag a file from the DeepSeek Harness right Sidebar file tree onto the composer to insert an @ file reference. |
| 249 | [Mr-Maidong/dsh-plugin-image2](https://github.com/Mr-Maidong/dsh-plugin-image2) | 0 | 2026-10-26 | 2026-10-26 | Image studio plugin for DeepSeek Harness: connect an image API endpoint and key, generate and edit pictures from the Web UI, and expose image2_generate / image2_edit tools to the agent. |
| 250 | [msciu/dsh-prompt-enricher](https://github.com/msciu/dsh-prompt-enricher) | 0 | 2026-10-26 | 2026-10-26 | Prompt workbench for DeepSeek Harness: drafts, full-log sent history, and grill-based prompt elicitation. |
| 251 | [my-dsh/dsh-mcp-status](https://github.com/my-dsh/dsh-mcp-status) | 0 | 2026-10-26 | 2026-10-26 | MCP connection panel for DeepSeek Harness: a composer-toolbar button that lists every configured MCP server and switches its connection on or off, so DSH starts without connecting to any of them |
| 252 | [MYiYang/dsh-git-branch](https://github.com/MYiYang/dsh-git-branch) | 0 | 2026-10-26 | 2026-10-26 | DSH Web plugin: the session's current Git branch in the composer, a local/remote branch table with checkout, and a read-only commit graph. |
| 253 | [N5Tar/dsh-chonky-fish](https://github.com/N5Tar/dsh-chonky-fish) | 0 | 2026-10-26 | 2026-10-26 | DSH Chonky Fish — 大肥鱼 · 小鱼塘管理台：DSH 聊天面板 + chonkyfish agent preset + 小鱼塘蓝白主题皮肤 |
| 254 | [NEETnina/dsh-model-master](https://github.com/NEETnina/dsh-model-master) | 0 | 2026-10-26 | 2026-10-26 | dsh-model-master（模型选择大师）— model selector for DeepSeek Harness: search across providers, probe any model with a real streaming request to measure TTFT and TPS, and jump from a leaderboard row to a local search for channels of that name. |
| 255 | [neil-ji/dsh-session-chime](https://github.com/neil-ji/dsh-session-chime) | 0 | 2026-10-26 | 2026-10-26 | DeepSeek Harness plugin: a desktop chime when a session finishes its work, and a different two-pip ping when it is waiting for your answer or approval. |
| 256 | [neko461/genshen_TRPG](https://github.com/neko461/genshen_TRPG) | 0 | 2026-10-16 | 2026-10-26 | 原神同人自由对话跑团：DSH GM 插件、规则引擎与设定集（v0.01） |
| 257 | [nhhc-lxr/dsh-web-tool-provider](https://github.com/nhhc-lxr/dsh-web-tool-provider) | 0 | 2026-10-26 | 2026-10-26 | Tavily, Exa and Firecrawl as interchangeable ctx.web backends for DeepSeek Harness. Switch the engine behind web_search/web_fetch from a settings page, keys in the credential store, credential-free local fetch fallback. |
| 258 | [nolighter/dsh-im-bubble](https://github.com/nolighter/dsh-im-bubble) | 0 | 2026-10-26 | 2026-10-26 | DSH plugin: send an IM reply as several separate bubbles via dsh-im proactive delivery (im_say, im_targets, im_target_add). |
| 259 | [Nukum1zuMeigu/dsh-whale-memory](https://github.com/Nukum1zuMeigu/dsh-whale-memory) | 0 | 2026-10-26 | 2026-10-26 | 给 DeepSeek Harness 的记忆骨架：人格注入 + 纯 Markdown 记忆系统（长期记忆 / 日记 / 灵感 / 任务卡），自带检索与看图工具。零依赖，装上即用。 |
| 260 | [null0xfff/dsh-bash](https://github.com/null0xfff/dsh-bash) | 0 | 2026-10-26 | 2026-10-26 | DSH plugin extracted from dsh-ops: publishes ops_bash over a resolved bash with the host sandbox, spill and job semantics. |
| 261 | [O-OII/dsh-agent-activity](https://github.com/O-OII/dsh-agent-activity) | 0 | 2026-10-26 | 2026-10-26 | DSH 代理活动面板：实际模型、当前与上一轮任务，可选 DS 执行路由及中英文配置页。 |
| 262 | [O-OII/dsh-native-taskbar-badge](https://github.com/O-OII/dsh-native-taskbar-badge) | 0 | 2026-10-26 | 2026-10-26 | DSH Windows 原生任务栏数字角标：后台提醒、主会话去重、回窗清零，不改 ASAR；支持中英文。 |
| 263 | [O-OII/dsh-selection-comments](https://github.com/O-OII/dsh-selection-comments) | 0 | 2026-10-26 | 2026-10-26 | DSH 选区注释：编号锚点、紧凑引用、编辑管理与标签页恢复，默认中文，支持英文。 |
| 264 | [OnebugIS/dsh-context-ops](https://github.com/OnebugIS/dsh-context-ops) | 0 | 2026-10-26 | 2026-10-26 | DSH 上下文运维插件：压缩摘要走强模型 + 交接技能 + 上下文决策技能 |
| 265 | [OolongBlackCoffee/dsh-wuwa-pet](https://github.com/OolongBlackCoffee/dsh-wuwa-pet) | 0 | 2026-10-26 | 2026-10-26 | ???????? WuwaTappo ????:??/????/??????/?????????,???????? / Show DeepSeek balance on your WuwaTappo desktop pet |
| 266 | [OranImp/dsh-fast-history](https://github.com/OranImp/dsh-fast-history) | 0 | 2026-10-26 | 2026-10-26 | Mobile-first DSH Web history loader: official tail-first first paint, bounded prefetch, early auto-load before Load earlier is the only option, touch/fling handling. Display-only; context unchanged. \| 面向手机/小屏的 DSH Web 历史渐进加载：沿用官方尾部优先首屏、有界预取、提前补页、触摸/快速滑动停稳；只影响显示，不改变模型上下文。 |
| 267 | [ownduck/dsh-custom-env](https://github.com/ownduck/dsh-custom-env) | 0 | 2026-10-24 | 2026-10-26 | Manage $DSH_HOME/.env from Settings; sync Host and Windows/macOS user env |
| 268 | [oxmumu3/dsh-workproof](https://github.com/oxmumu3/dsh-workproof) | 0 | 2026-10-04 | 2026-10-26 | Local-first DeepSeek Harness plugins for artifact receipts and inspectable evidence. Community project by 牛村木木山. |
| 269 | [PanChengN/dsh-plugin-session-move](https://github.com/PanChengN/dsh-plugin-session-move) | 0 | 2026-10-26 | 2026-10-26 | DSH plugin: move a conversation to another workspace (sidebar menu + full session-log/workspace migration) |
| 270 | [PandaBlessing/dsh-user-sync](https://github.com/PandaBlessing/dsh-user-sync) | 0 | 2026-10-26 | 2026-10-26 | DSH ?????????:??/??/??/??????(????????????????) |
| 271 | [Parirose/dsh-cardcatalog](https://github.com/Parirose/dsh-cardcatalog) | 0 | 2026-10-26 | 2026-10-26 | 只读记忆目录投影插件（目录卡）：把用户显式配置的记忆账本渲染成标题级上下文；不存储、不检索、不写文件。 |
| 272 | [pcmxiao/dsh-douyin-bridge](https://github.com/pcmxiao/dsh-douyin-bridge) | 0 | 2026-10-25 | 2026-10-26 | DSH 插件：把抖音私信接进 DSH —— 私信进 DSH 会话，AI 用工具刷视频、分享、聊天（含图片/表情收发）。仅供学习研究。 |
| 273 | [pengpenglele/dsh-opencode-go-x-session-code](https://github.com/pengpenglele/dsh-opencode-go-x-session-code) | 0 | 2026-10-26 | 2026-10-26 | 用于解决 deepseek harness 使用opencodego时候 的请求头问题，可以用于解决现deepseek harness 实验性功能自动审查使用opencodego导致的不可用问题 |
| 274 | [PerryLink/dsh-checkers](https://github.com/PerryLink/dsh-checkers) | 0 | 2026-10-18 | 2026-10-26 | One-command installer for the 53-checker PerryLink compliance suite: every checker, one Cordis bundle layer. |
| 275 | [phoenixlucky/dsh-plugin-doc](https://github.com/phoenixlucky/dsh-plugin-doc) | 0 | 2026-10-26 | 2026-10-26 | Chinese and English guide to authoring, packaging, installing, and publishing DeepSeek Harness (DSH) plugins. |
| 276 | [picklerick422/dsh-motion](https://github.com/picklerick422/dsh-motion) | 0 | 2026-10-26 | 2026-10-26 | Liquid-glass popup and overlay motion for DeepSeek Harness: spring clip-morph entrances, coherent hover bubbles, image-zoom FLIP, and a live-preview settings page. |
| 277 | [pixelligue/mcpbids-plugins](https://github.com/pixelligue/mcpbids-plugins) | 0 | 2026-10-25 | 2026-10-26 | MCP Bids federal procurement research tools for DeepSeek Harness, ZCode and Kimi |
| 278 | [pixelligue/mcptender-plugins](https://github.com/pixelligue/mcptender-plugins) | 0 | 2026-10-25 | 2026-10-26 | MCPTender public procurement tools for DeepSeek Harness, ZCode and Kimi |
| 279 | [Pxczxn/dsh-dev-hotreload](https://github.com/Pxczxn/dsh-dev-hotreload) | 0 | 2026-10-26 | 2026-10-26 | DeepSeek Harness 的本地开发热重载桥：监视 link 安装的插件/预设源码，一保存就触发官方 profile 重组合，正在运行的宿主直接热替换，无需重启。 |
| 280 | [QiangXian/notix-dsh](https://github.com/QiangXian/notix-dsh) | 0 | 2026-10-18 | 2026-10-26 | Notification plugin for DeepSeek Harness (dsh): approvals, questions, long tasks, errors and completions |
| 281 | [qianhuang0721/dsh-model-balance-panel](https://github.com/qianhuang0721/dsh-model-balance-panel) | 0 | 2026-10-26 | 2026-10-26 | Sidebar panel for DeepSeek Harness: account balance and 5-hour / weekly / monthly quotas for every configured model provider. ? DSH ????????????????? |
| 282 | [qq1171910065/dsh-gba](https://github.com/qq1171910065/dsh-gba) | 0 | 2026-10-26 | 2026-10-26 | Play Game Boy Advance inside DeepSeek Harness: an online store of 245 community games plus your own cartridges, in a floating player window with a boss key, rebindable controls, battery saves and save states. |
| 283 | [qwh15622336051/dsh-prompt-optimizer](https://github.com/qwh15622336051/dsh-prompt-optimizer) | 0 | 2026-10-26 | 2026-10-26 | Prompt optimizer and message retract/edit for the DeepSeek Harness composer |
| 284 | [railgun20001/dsh-session-hub](https://github.com/railgun20001/dsh-session-hub) | 0 | 2026-10-26 | 2026-10-26 | Session status hub for DeepSeek Harness: a top-titlebar rail of running / waiting / unread / failed Sessions, Windows toast notifications, and a red-yellow-green taskbar status dot. |
| 285 | [raven3005672/dsh-plugin-highlight-notes](https://github.com/raven3005672/dsh-plugin-highlight-notes) | 0 | 2026-10-20 | 2026-10-26 | DSH 批注插件：在回答里标注文字并写备注，一键把引用放回输入框。 |
| 286 | [rayadesune/dsh-context-window-switch](https://github.com/rayadesune/dsh-context-window-switch) | 0 | 2026-10-26 | 2026-10-26 | Session-scoped context window switcher for the DeepSeek Harness model picker — 在模型弹窗内按会话临时切换上下文窗口，新会话自动恢复默认（dsh-context-window-picker 的延续维护版） |
| 287 | [reg4916/dsh-plugin-balance-badge](https://github.com/reg4916/dsh-plugin-balance-badge) | 0 | 2026-10-26 | 2026-10-26 | Always-visible DeepSeek account balance pill for DeepSeek Harness — auto-refreshing, same numbers as Settings → Account. |
| 288 | [regrevia/dsh-chat-link-actions](https://github.com/regrevia/dsh-chat-link-actions) | 0 | 2026-10-26 | 2026-10-26 | Right-click actions on file links in the DSH transcript: quote the path into the composer, or reveal the file in the OS file manager. Menus are drawn in the app's own style. |
| 289 | [regrevia/dsh-install-check](https://github.com/regrevia/dsh-install-check) | 0 | 2026-10-25 | 2026-10-26 | 装插件前替你看一眼：会不会撞名、缺什么。One look before a DSH plugin lands: collisions, missing pieces. |
| 290 | [regrevia/dsh-pause-resume](https://github.com/regrevia/dsh-pause-resume) | 0 | 2026-10-26 | 2026-10-26 | One header button that stops every running DeepSeek Harness turn, goal and background job — and puts them back after a restart. |
| 291 | [Robortshen/dsh-token-radar](https://github.com/Robortshen/dsh-token-radar) | 0 | 2026-10-26 | 2026-10-26 | Per-call token meter for the DeepSeek Harness composer: a colour-coded pill under the input plus a dashboard of every model call, sub-agent spend and tool attribution. Zero dependencies, local session logs only. |
| 292 | [S1n7T/dsh-everything](https://github.com/S1n7T/dsh-everything) | 0 | 2026-10-26 | 2026-10-26 | DeepSeek Harness plugin: millisecond whole-disk file search via the local Everything index |
| 293 | [sakanamaru/dsh-aqua](https://github.com/sakanamaru/dsh-aqua) | 0 | 2026-10-26 | 2026-10-26 | dsh-aqua — live runtime lens for DeepSeek Harness (dsh): an in-process, read-only plugin panel. Not the toolbox — that is dsh-minato. |
| 294 | [sakikoTGW/dsh-plugins](https://github.com/sakikoTGW/dsh-plugins) | 0 | 2026-10-26 | 2026-10-26 | DSH 插件索引：每个插件独立仓库独立发版；catalog.json 是唯一事实源，README 由它生成、CI 校验；意见 7 天内回应。 · Index of my DeepSeek Harness plugins: one repo per plugin, one hub for the catalog and the feedback loop. |
| 295 | [sandeep-alluru/deepseek-harness-rc](https://github.com/sandeep-alluru/deepseek-harness-rc) | 0 | 2026-09-05 | 2026-10-26 | Drive your DeepSeek Harness (dsh) coding agent from your phone — typed ACP protocol, one-tap approvals, self-hosted push notifications, no screen scraping. |
| 296 | [say007go/dsh-imagegen](https://github.com/say007go/dsh-imagegen) | 0 | 2026-10-26 | 2026-10-26 | DeepSeek Harness文生图/图生图插件：可接入任意OpenAI兼容的生图接口；文生图和使用已有图片链接作为参考图进行图生图都无需配置COS；若希望用本地图片作为参考图进行图生图，需配置腾讯云COS，图片会先自动压缩再存进COS，同一张图重复使用不会二次上传；还支持自定义提示词后缀、场景与宽高比预设。 |
| 297 | [SeyanaA/dsh-lock](https://github.com/SeyanaA/dsh-lock) | 0 | 2026-10-25 | 2026-10-26 | DSH 锁屏 / Touch ID 验证插件：重启或 48 小时未验证需密码或 Touch ID 解锁，设置页配置，macOS 26 Liquid Glass 风格 |
| 298 | [shargritton/prime-diary](https://github.com/shargritton/prime-diary) | 0 | 2026-10-26 | 2026-10-26 | 为 DSH 增加每日日记、重要记忆筛选与草稿审阅的伴生插件 |
| 299 | [sharkisyou/dsh-dy-whale](https://github.com/sharkisyou/dsh-dy-whale) | 0 | 2026-10-26 | 2026-10-26 | 抖音版只读宠物（DSH 插件）：按作息自己醒、刷抖音热榜/视频/评论、写两本日记。数据能力来自 dsh-douyin。 |
| 300 | [shenmingsolar-01/dsh-memory-hub](https://github.com/shenmingsolar-01/dsh-memory-hub) | 0 | 2026-10-26 | 2026-10-26 | 多端 AI 角色的本机记忆助手：记得住、能收发、能接自己的 AI、可选支付。Local memory helper for AI characters. |
| 301 | [Shihang-Hu/dsh-session-purge](https://github.com/Shihang-Hu/dsh-session-purge) | 0 | 2026-10-26 | 2026-10-26 | Unofficial DeepSeek Harness plugin: permanently purge sessions (disk logs, projection cache, workspace accounting, temp outputs, subagent cascade) and redact secrets in place in zstd session logs. |
| 302 | [shimiei/dsh-better-quark-drive](https://github.com/shimiei/dsh-better-quark-drive) | 0 | 2026-10-26 | 2026-10-26 | DSH plugin: 让 AI 一句话操作夸克网盘 · 12 Quark Drive tools for DeepSeek Harness (upload + share in one call) |
| 303 | [shin4/inkpond-dsh](https://github.com/shin4/inkpond-dsh) | 0 | 2026-10-26 | 2026-10-26 | Interactive Chinese ink-wash backgrounds for DeepSeek Harness · 墨池水墨背景插件 |
| 304 | [Shuaige-Da/dsh-cost-pill](https://github.com/Shuaige-Da/dsh-cost-pill) | 0 | 2026-10-26 | 2026-10-26 | Writes the session's estimated cost into the composer token-usage pill and prices every bucket in the usage dialogs, using DeepSeek's official peak and off-peak CNY rates. |
| 305 | [Speraymer/dsh-yu-kit](https://github.com/Speraymer/dsh-yu-kit) | 0 | 2026-10-26 | 2026-10-26 | 把「蓝色大肥鱼」这套 DSH 插件套件一次装进一个 profile：人格 + 记忆 + 三个内容源 + 两个出口 + 微信 + 多模态。含安装脚本、给 agent 的作业单、手动配置清单、架构图与 MIT 声明。 |
| 306 | [stlin256/dsh-pocket](https://github.com/stlin256/dsh-pocket) | 0 | 2026-10-25 | 2026-10-26 | Native HarmonyOS companion for DeepSeek Harness — Passkey pairing, private session control, and durable Push Kit notifications. |
| 307 | [sunChargedd/dsh-mcp-skill-manage](https://github.com/sunChargedd/dsh-mcp-skill-manage) | 0 | 2026-10-26 | 2026-10-26 | MCP &amp; Skill Manager — manage agent skills and MCP servers across DSH, Claude Code, Codex, Cursor and other agent tools from one DSH sidebar page. |
| 308 | [sunzhiyueaa/dsh-project-board](https://github.com/sunzhiyueaa/dsh-project-board) | 0 | 2026-10-26 | 2026-10-26 | DSH Web 的原生项目进度看板：五列按状态分，天数只读机器时间，拖动改状态写回 yaml，单击进项目继续开发。A native project board plugin for DSH Web. |
| 309 | [tbwpsts/dsh-xingmeng-diary](https://github.com/tbwpsts/dsh-xingmeng-diary) | 0 | 2026-10-26 | 2026-10-26 | 给 DeepSeek Harness 的心情日记插件：把每天的陪伴片段和心情变化，写进同一个 Markdown 文档。 |
| 310 | [Tests4gptplay/dsh-dots](https://github.com/Tests4gptplay/dsh-dots) | 0 | 2026-10-25 | 2026-10-26 | 为 DeepSeek Harness 提供 ChatGPT Dots 网页接入，支持 ChatGPT 账号登录、原生风格界面，以及自动适配明暗主题的状态栏图标。 |
| 311 | [Thunderunruly/session-kanban](https://github.com/Thunderunruly/session-kanban) | 0 | 2026-10-26 | 2026-10-26 | DeepSeek Harness plugin: left-sidebar session kanban board with current work, todos, progress and a searchable activity heatmap. |
| 312 | [tianxingdao/dsh-shell-switch](https://github.com/tianxingdao/dsh-shell-switch) | 0 | 2026-10-26 | 2026-10-26 | Choose which local shell runs DSH bash commands (Niubash, Git Bash, MSYS2) and add a Shell selector page to Settings. |
| 313 | [TigerHour/DSH_Graph-Horses](https://github.com/TigerHour/DSH_Graph-Horses) | 0 | 2026-09-18 | 2026-10-26 | Custom industry AI employees, teams, workflows and professional memory for DeepSeek Harness (DSH), with a software development team included. Native context reuse separates stable definitions from dynamic knowledge to support server-side prefix caching. 自定义行业员工、团队、工作流与专业记忆；遵循 DSH 原生上下文机制，分离稳定定义和动态知识，促进服务端前缀缓存复用。 |
| 314 | [TNong611/dsh-memory-dba](https://github.com/TNong611/dsh-memory-dba) | 0 | 2026-10-26 | 2026-10-26 | File-based, git-portable long-term memory for DeepSeek Harness (DSH plugin) |
| 315 | [troodon/dsh-big-fat-fish-girl](https://github.com/troodon/dsh-big-fat-fish-girl) | 0 | 2026-10-25 | 2026-10-26 | A desktop pet for DeepSeek Harness that follows activity across your chats, even when Harness is minimized. |
| 316 | [tryqylz/dsh-jingjing-sticky-notes](https://github.com/tryqylz/dsh-jingjing-sticky-notes) | 0 | 2026-10-23 | 2026-10-26 | 鲸鲸便签：把 DeepSeek Harness 对话里的回复、选区或整段对话收藏成本地 Markdown 便签，右侧栏查看、浮窗对照、插回会话。 / Local-first Markdown sticky notes for DeepSeek Harness. |
| 317 | [umerkhalid204/dsh-career-ops](https://github.com/umerkhalid204/dsh-career-ops) | 0 | 2026-10-26 | 2026-10-26 | career-ops job-search agent as a DeepSeek Harness plugin: A-H evaluations with a 1-5 fit score, zero-token ATS scans, CV tailoring, applications tracker, and a Career Ops panel. |
| 318 | [uss7118/dsh-win-control](https://github.com/uss7118/dsh-win-control) | 0 | 2026-10-26 | 2026-10-26 | Windows desktop control for DeepSeek Harness: window/UIA automation, local OCR, browser CDP reads, humanised mouse and keyboard input, live control panel. |
| 319 | [Utaoki-henji/dsh-plugin-big-fat-fish](https://github.com/Utaoki-henji/dsh-plugin-big-fat-fish) | 0 | 2026-10-26 | 2026-10-26 | 测试工程师 大肥鱼：以黑盒为主的接口/页面功能测试，适用于 DeepSeek Harness |
| 320 | [Vasyarot/voice-audio-rus](https://github.com/Vasyarot/voice-audio-rus) | 0 | 2026-10-26 | 2026-10-26 | Voice Audio Rus — голосовой ввод для DeepSeek Harness с локальным Whisper на русском языке. Активное шумоподавление, тест микрофона, сравнение STT-движков. |
| 321 | [vb2250158/dsh-performance-statistics](https://github.com/vb2250158/dsh-performance-statistics) | 0 | 2026-10-26 | 2026-10-26 | Detailed timing charts and auxiliary model call statistics for DeepSeek Harness |
| 322 | [violin-i/dsh-plugin-law-workbench](https://github.com/violin-i/dsh-plugin-law-workbench) | 0 | 2026-10-26 | 2026-10-26 | 工作台面板 for DeepSeek Harness：右侧停靠栏的文献库可视化面板（列表/检索/阅读） |
| 323 | [VisualStudioXu/dsh-workspace-running-dot](https://github.com/VisualStudioXu/dsh-workspace-running-dot) | 0 | 2026-10-26 | 2026-10-26 | DSH plugin: running-session dot on collapsed workspace rows |
| 324 | [wangkant/reelsmith](https://github.com/wangkant/reelsmith) | 0 | 2026-10-23 | 2026-10-25 | A video editing harness for AI coding agents: an NLE timeline the agent edits with tools and code, renders and checks. Works with Claude Code, Codex, DeepSeek Harness and any MCP client. |
| 325 | [wangwuli-AAA/dsh-session-isolation](https://github.com/wangwuli-AAA/dsh-session-isolation) | 0 | 2026-10-21 | 2026-10-26 | DeepSeek Harness bundle: per-session working directories for new sessions in a workspace, with an 'open session folder' button and a client-side file-address repair. |
| 326 | [waning-sun/dsh-napcat-keeper](https://github.com/waning-sun/dsh-napcat-keeper) | 0 | 2026-10-26 | 2026-10-26 | 在DSH运行时自动运行napcat的小插件 |
| 327 | [weiweisudo/juzi-remote-shell](https://github.com/weiweisudo/juzi-remote-shell) | 0 | 2026-10-26 | 2026-10-26 | DSH 远程机器插件（P0）：被控端主动出站、非交互命令执行，后续加 PTY 与文件传输 |
| 328 | [Where227-arch/dsh-booth-search](https://github.com/Where227-arch/dsh-booth-search) | 0 | 2026-10-21 | 2026-10-26 | DSH plugin: search BOOTH for VRChat avatar assets, with a dedicated BOOTH page beside the conversation |
| 329 | [wly63227/dsh-photo-retouch-agent](https://github.com/wly63227/dsh-photo-retouch-agent) | 0 | 2026-10-26 | 2026-10-26 | Human-confirmed AI photo retouching Agent for DeepSeek Harness with Photoshop and PixelCake control on Windows. |
| 330 | [wuyaomin248-stack/dsh-discord](https://github.com/wuyaomin248-stack/dsh-discord) | 0 | 2026-10-26 | 2026-10-26 | Discord read/search toolkit for DeepSeek Harness: pull the signed-in token from Edge/Chrome leveldb, then search, archive, download and pick cards/plugins - 20 read-only tools, no browser needed. |
| 331 | [xianyujianren/dsh-daifeiyu-pack](https://github.com/xianyujianren/dsh-daifeiyu-pack) | 0 | 2026-10-26 | 2026-10-26 | 大肥鱼套装：DeepSeek Harness 开机动画 + P.R.T.S. 主题 + 蓝色大肥鱼桌宠，一条命令装齐（含预设配置） |
| 332 | [XiaoSHang05/dsh-sidebar-fold](https://github.com/XiaoSHang05/dsh-sidebar-fold) | 0 | 2026-10-26 | 2026-10-26 | Folds the DSH sidebar's global panel icons into one collapsible header row, and hides the dock's sidebar entry. |
| 333 | [Xiaxin1235/WhaleMaid](https://github.com/Xiaxin1235/WhaleMaid) | 0 | 2026-10-25 | 2026-10-26 | DeepSeek Harness 插件：Autopilot 自动推进与陪伴角色大肥鱼 |
| 334 | [xiebaiyuan/dsh-lead-mode](https://github.com/xiebaiyuan/dsh-lead-mode) | 0 | 2026-10-26 | 2026-10-26 | Lead 模式：一个 DSH agent 预设 + 一个 skill + 两条依赖提醒。开启即提醒用户开启官方 Agent Teams。 |
| 335 | [xingyingyuzhui/dsh-corn-cad](https://github.com/xingyingyuzhui/dsh-corn-cad) | 0 | 2026-10-25 | 2026-10-26 | 玉米 CAD · DeepSeek Harness 侧边栏 DXF/DWG 预览与圈选画板：右键圈一块图纸，写句话交给 agent。 A DSH sidebar DXF/DWG previewer with a right-drag selection board that sends the circled region to the agent. |
| 336 | [xixi66666/dsh-deepseek-platform-usage](https://github.com/xixi66666/dsh-deepseek-platform-usage) | 0 | 2026-10-26 | 2026-10-26 | DeepSeek 开放平台账单用量面板（DSH 插件）：按模型/计费类型/API Key 的每日 tokens 与费用，含分时明细 |
| 337 | [XJfyrh/dsh-SLA](https://github.com/XJfyrh/dsh-SLA) | 0 | 2026-10-26 | 2026-10-26 | DeepSeek Harness 持续探索插件：从一句改进目标开始，自主调查、尝试、比较并交付结果。 |
| 338 | [XJHwxjb/dsh-purge](https://github.com/XJHwxjb/dsh-purge) | 0 | 2026-10-26 | 2026-10-26 | Mirror of dsh-purge 1.1.71 - upstream YuJunZhiXue/dsh-purge was deleted by its author. Read-only snapshot, original attribution and license kept intact. Not my code. |
| 339 | [xsdao/dsh-workbuddy-token](https://github.com/xsdao/dsh-workbuddy-token) | 0 | 2026-10-26 | 2026-10-26 | DSH plugin: WorkBuddy credits-to-tokens capsule for the current model x period (read-only) |
| 340 | [xsllo425/dsh-work-status](https://github.com/xsllo425/dsh-work-status) | 0 | 2026-10-26 | 2026-10-26 | DeepSeek Harness 插件：把 Agent 的工作状态收进标题栏一行——在做什么、做到哪、失败过没有；点开是目标、当前步、最近记录与上一轮。不调模型、不写提示词，只读已发生的事件。 |
| 341 | [xuanyuanli/dsh-plugin-session-cost](https://github.com/xuanyuanli/dsh-plugin-session-cost) | 0 | 2026-10-26 | 2026-10-26 | DSH plugin: estimated session cost in the composer status bar, split by DeepSeek peak/idle tariff periods |
| 342 | [xx529/dsh-shell-cmd](https://github.com/xx529/dsh-shell-cmd) | 0 | 2026-10-26 | 2026-10-26 | DeepSeek Harness 生态项目 dsh-shell-cmd |
| 343 | [xx529/dsh-terminal-panel](https://github.com/xx529/dsh-terminal-panel) | 0 | 2026-10-26 | 2026-10-26 | DeepSeek Harness 插件「终端」：在会话头部聚合当前会话 / 子代理 / Agent Team 队友的 bash、后台任务与持久终端实时输出（只读）。 |
| 344 | [xxy0722/dsh-purge-deep](https://github.com/xxy0722/dsh-purge-deep) | 0 | 2026-10-26 | 2026-10-26 | DeepSeek Harness 破甲深度分支：首尾夹击 + 生成层熔断 + 宿主源码级补丁。基于 YuJunZhiXue/dsh-purge (MIT) 改造，适配 dsh 桌面版 0.2.1-rc.3。仅供学习研究与红队评测。 |
| 345 | [Yhx888/dsh-quote-context](https://github.com/Yhx888/dsh-quote-context) | 0 | 2026-10-26 | 2026-10-26 | DSH 聊天引用插件：选中消息文字即可引用或评论，引用常驻输入卡上方，发送后变成可跳回的引用块。 |
| 346 | [yinguobing/dsh-memory-index](https://github.com/yinguobing/dsh-memory-index) | 0 | 2026-10-26 | 2026-10-26 | Full-text memory index for DeepSeek Harness: search an existing Markdown memory tree with SQLite FTS5. |
| 347 | [YMC521/dsh-model-groups](https://github.com/YMC521/dsh-model-groups) | 0 | 2026-10-26 | 2026-10-26 | DSH 插件：把模型选择列表按供应商折叠成手风琴，带搜索与推理等级侧栏面板 |
| 348 | [ypingcn/dsh-web-search-insights](https://github.com/ypingcn/dsh-web-search-insights) | 0 | 2026-10-26 | 2026-10-26 | deepseek harness (dsh) 插件 - 搜索溯源 (dsh-web-search-insights)，记录每次 web_search 的关键词与返回来源，统计每轮、每会话的引用情况，并提供回答末尾引用入口与右侧栏搜索面板。 |
| 349 | [yr584/dsh-qq-sticker](https://github.com/yr584/dsh-qq-sticker) | 0 | 2026-10-26 | 2026-10-26 | 给 DSH 接入的 QQ 机器人加表情包能力：同步收藏、按情绪检索、发送/添加/删除，带设置页与梗库查询（OneBot v11，适配 SnowLuma / NapCat）。 |
| 350 | [ysqp6-lang/dsh-attachment-panel](https://github.com/ysqp6-lang/dsh-attachment-panel) | 0 | 2026-10-26 | 2026-10-26 | DeepSeek Harness 的投送面板：附件索引 / @引用路径 / Taildrop 投送与接收，按设备与时间列在一起，还能在面板里直接发文件 |
| 351 | [yueyexiayu/dsh-xuxie](https://github.com/yueyexiayu/dsh-xuxie) | 0 | 2026-10-07 | 2026-10-26 | DSH plugin for empty-response recovery and bounded reasoning-only continuation |
| 352 | [yuloop/dsh-secret-vault](https://github.com/yuloop/dsh-secret-vault) | 0 | 2026-10-26 | 2026-10-26 | DSH plugin: hand secrets to the agent without them entering the context |
| 353 | [YumenoSayuri/dsh-workspace-docs](https://github.com/YumenoSayuri/dsh-workspace-docs) | 0 | 2026-10-26 | 2026-10-26 | 把当前工作区的顶层文件夹名与 README/文档类文件清单注入模型可见的运行时上下文；每次请求检测目录变化，变了才重扫，让 agent 不必盲搜就能找到既有文档。 |
| 354 | [yxyusage/dsh-work-crew](https://github.com/yxyusage/dsh-work-crew) | 0 | 2026-10-26 | 2026-10-26 | DSH 插件：把任务派给本机豆包 / WorkBuddy / ZCode / Qoder，用任务板与产物锁组织一支有纪律的 AI 班组。 |
| 355 | [yyfdfsyyf-source/dsh-context-fold](https://github.com/yyfdfsyyf-source/dsh-context-fold) | 0 | 2026-10-26 | 2026-10-26 | DSH 上下文折叠插件：工具结果折叠落盘、compaction 账本回捞、跨会话记忆（与 billion-context 互补） |
| 356 | [Zac-Linley/macvision](https://github.com/Zac-Linley/macvision) | 0 | 2026-10-26 | 2026-10-26 | Apple Vision OCR for DeepSeek Harness — read scans, screenshots and PDFs on-device and hand the text (with coordinates) to the model |
| 357 | [ZachT11/dsh-runtime-env-watch](https://github.com/ZachT11/dsh-runtime-env-watch) | 0 | 2026-10-25 | 2026-10-26 | Periodic AI runtime, hardware, and remote-device status checks for DeepSeek Harness |
| 358 | [zaowanshangxian/deepseek-harness-plugins](https://github.com/zaowanshangxian/deepseek-harness-plugins) | 0 | 2026-10-26 | 2026-10-26 | DeepSeek Harness 插件集：可独立安装的 DSH 插件，一个插件一个文件夹（含「更多表情和颜文字」） |
| 359 | [ZBC-QRLA/dsh-learning-hub](https://github.com/ZBC-QRLA/dsh-learning-hub) | 0 | 2026-10-26 | 2026-10-26 | A local-first learning hub plugin for DeepSeek Harness: branch tree, concept graph, progress, spaced review and a small dashboard. |
| 360 | [ZekaiShi/dsh-harmony-mobile](https://github.com/ZekaiShi/dsh-harmony-mobile) | 0 | 2026-10-26 | 2026-10-26 | HarmonyOS native AI chat and DSH companion with a lightweight desktop bridge |
| 361 | [zfwoo/dsh-splash](https://github.com/zfwoo/dsh-splash) | 0 | 2026-10-18 | 2026-10-26 | DeepSeek Harness 的赛博朋克启动画面：React 挂载前铺满屏幕，进度计与启动日志共用一条时间轴，任意键跳过，自带独立设置页。零依赖、零构建。 |
| 362 | [zhangfan0529/dsh-archived-session-cleaner](https://github.com/zhangfan0529/dsh-archived-session-cleaner) | 0 | 2026-10-26 | 2026-10-26 | DeepSeek Harness plugin: permanently delete archived sessions and their subagent logs. \| DeepSeek Harness 插件：永久删除已归档会话及其子智能体日志。 |
| 363 | [zhaohzXo/dsh-appearance](https://github.com/zhaohzXo/dsh-appearance) | 0 | 2026-10-26 | 2026-10-26 | 真实壁纸 + 内置壁纸 + 启动开场动画，给 DeepSeek Harness Web UI 换皮。Wallpaper, built-in wallpapers and boot intro for the DSH Web UI. |
| 364 | [zhtty67-rgb/gongkao-learning-os](https://github.com/zhtty67-rgb/gongkao-learning-os) | 0 | 2026-10-26 | 2026-10-26 | 公考 Learning OS：知识树 / FSRS 复习 / 教学持久化 / 错因分析 + 通用 MCP 网关 + 灵枢（dsh-memory）学习状态同步 |
| 365 | [Zhu755873628/intent-navigator-dsh](https://github.com/Zhu755873628/intent-navigator-dsh) | 0 | 2026-10-26 | 2026-10-26 | Intent diagnosis, clarification, task briefing, and execution authorization for DeepSeek Harness |
| 366 | [ZilongYang/dsh-session-mng](https://github.com/ZilongYang/dsh-session-mng) | 0 | 2026-10-26 | 2026-10-26 | Session management for DeepSeek Harness: unified list, titles, archive/restore, cross-workspace move, permanent delete. |
| 367 | [zlwzk/dsh-friends](https://github.com/zlwzk/dsh-friends) | 0 | 2026-10-26 | 2026-10-26 | DSH whale friends: see whether your fellow DeepSeek Harness users are online and whether their model is running a task. Signatures, mood, pokes, end-to-end encrypted, zero server. |
| 368 | [zszzlzm/dsh-context-compactor](https://github.com/zszzlzm/dsh-context-compactor) | 0 | 2026-10-26 | 2026-10-26 | L0-L5 context compaction pipeline for DSH + Ollama |
| 369 | [ztc1522021381/dsh-context-mode](https://github.com/ztc1522021381/dsh-context-mode) | 0 | 2026-10-26 | 2026-10-26 | context-mode adapter for DeepSeek Harness: two-tier routing — deny before execution, truncate after. MCP + native host seams. |
| 370 | [zx19491001/dsh-plugin-hub](https://github.com/zx19491001/dsh-plugin-hub) | 0 | 2026-10-26 | 2026-10-26 | DSH 左侧栏插件下载中心：从 GitHub 浏览、下载并安装 DSH 插件（ZIP / clone / 安装命令）。 |
| 371 | [zz12138111/dsh-context-governance](https://github.com/zz12138111/dsh-context-governance) | 0 | 2026-10-25 | 2026-10-26 | 面向 DeepSeek Harness（DSH）的上下文治理插件：压缩前后不断线，多根记忆、按根审计、只读根如实披露。 |
| 372 | [zzyyun/dsh-prompt-enhance](https://github.com/zzyyun/dsh-prompt-enhance) | 0 | 2026-10-26 | 2026-10-26 | A DeepSeek Harness (DSH) plugin that enhances composer drafts with project code and conversation context. |

## 从快照消失的已核准仓库 / Approved repositories missing from the snapshot

已核准但已不在当前快照中（删除或改名），核实后从 [data/approved.json](../approved.json) 移除或更新名称。

Approved but no longer present in the current snapshot (deleted or renamed) — after checking, remove them from [data/approved.json](../approved.json) or update the name.

- adesbusy/dsh-peak-indicator
- aust24lzy/dsh-plugin-hub
- blktea814/hud-bar-for-dsh
- bLueriVerLHR/dsh-better-webui
- ccawmiku/dsh-salon
- CeilCelia/dsh-travily-api
- DaozeTang/dsh-connect-hub
- EndPB/dsh-telegram
- GlariaLuminous/plugin-health-check
- go-enols/dsh-plugin-opencode-free
- jadezane6634-ops/dsh-purge-flash
- jisvrin/dsh-phone-access
- Jovan1666/commandcode-usage
- kiligzzz/dsh-agent-dispatch
- kiligzzz/dsh-session-archive
- LeeeWM/dsh-session-notifier
- LIN-F1SH/dsh-conversation-digest
- liujiesmart/dsh-kiro
- liuke101/dsh-PdfCraft
- piggy00544/dsh-workproof
- RepInS-01/math-agent
- Sayi/dsh-plugin-kit
- Seiya369/A_ComposableDigitalWorker
- stlin256/harness-pocket
- swj88620-commits/dsh-deepseek-web-dock
- TanukiRei/dsh-tanuki-toolbox
- taozhuowei/dsh-muse-sidebar
- wuliao117/dsh-excel-character-card
- zhrzs/dsh-selection-translate
- zylzyqzz/dsh-mobile-pwa
