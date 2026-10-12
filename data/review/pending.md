# 待审核仓库 / Pending review

> 新增到 `dsh-plugin` Topic 下、带有简介、尚未经维护者核实的仓库。本文件由 `scripts/update.mjs` 每日刷新，仅供审核使用，不是用户可见页面。
>
> Repositories newly added to the `dsh-plugin` topic that the maintainer has not verified yet. Refreshed daily by `scripts/update.mjs`; review-only, not a user-facing page.

- 生成时间 / Generated: **2026-10-12**
- 快照日期 / Snapshot date: **2026-10-12 (UTC)**
- 待审核 / Pending: **199**
- 从快照消失的已核准仓库 / Approved repositories missing from the snapshot: **19**
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

对比上一份快照 **2026-10-11** / vs previous snapshot **2026-10-11**。规则：日增 ≥100★；已核准仓新入 Top 200（且 Δ≥50）/ 名次跃升 ≥50 / 冲入 Top 20；待审仓 ≥100★ 且核准后将进入 Top 200。

- 看 Star 是否与 fork、提交活跃度、仓库年龄匹配（高星零 fork、创建当天几百星，多为刷星）
- 是否把已有高星的通用项目贴上 `dsh-plugin` Topic 蹭榜——插件本身可进目录，但应加入 `leaderboard_exclusions`，理由写清 stars accrued as …
- 待审仓若核准会直接冲进 Top 20 / Top 200，先确认热度来自 **DSH 插件本身**
- 已核准仓的异常跃升：确认后同样可记入 `leaderboard_exclusions`，不必下架目录

Check stars against forks, commit activity and age (hundreds of stars on day one, or high stars with zero forks, usually look bought). A generic high-star project that only just tagged `dsh-plugin` can stay in the catalog but should go to `leaderboard_exclusions` (reason: stars accrued as …). If approving a pending repo would drop it into Top 20 / Top 200, confirm the audience is the DSH plugin itself.

- 告警数 / Alerts: **11**

| Project | Queue | Stars | Δ | Forks | Age | Signals | 审核提示 / Hint |
| --- | --- | ---: | ---: | ---: | ---: | --- | --- |
| ⚠️ [Fei2411/DeepSeek-Bot](https://github.com/Fei2411/DeepSeek-Bot) | 待审 / pending | 1350 | +548 | 125 | 4d | 日增百星、待审高星 | 日增 +548★；核准即 Top 11 |
| ⚠️ [QingYunA/answer-me-with-html](https://github.com/QingYunA/answer-me-with-html) | 待审 / pending | 3108 | — | 216 | 9d | 待审高星 | 核准即 Top 5 |
| ⚠️ [jaccen/Awesome-Gaussian-Skills](https://github.com/jaccen/Awesome-Gaussian-Skills) | 待审 / pending | 161 | — | 13 | 166d | 待审高星 | 核准即榜 #99 |
| ⚠️ [Ebony-Vinyl/dsh-our-free-model](https://github.com/Ebony-Vinyl/dsh-our-free-model) | 已核准 / approved | 11835 | +3060 | 231 | 17d | 日增百星 | 日增 +3060★；已不进榜单 |
| ⚠️ [T-Auto/dsh-ops](https://github.com/T-Auto/dsh-ops) | 已核准 / approved | 682 | +323 | 8 | 3d | 日增百星 | 日增 +323★ |
| ⚠️ [dataelement/dsh-desktop](https://github.com/dataelement/dsh-desktop) | 已核准 / approved | 13556 | +322 | 486 | 59d | 日增百星 | 日增 +322★；已不进榜单 |
| ⚠️ [ranxianglei/billion-context](https://github.com/ranxianglei/billion-context) | 已核准 / approved | 1089 | +209 | 90 | 66d | 日增百星 | 日增 +209★；已不进榜单 |
| ⚠️ [ccch1mneyyy/dsh-TUI](https://github.com/ccch1mneyyy/dsh-TUI) | 已核准 / approved | 4461 | +169 | 250 | 59d | 日增百星 | 日增 +169★ |
| ⚠️ [corrinehu/dsh-workbuddy-connect](https://github.com/corrinehu/dsh-workbuddy-connect) | 已核准 / approved | 551 | +120 | 62 | 55d | 日增百星 | 日增 +120★ |
| ⚠️ [MeteorNOX/DeepSeek-Balance-Whale-Widget](https://github.com/MeteorNOX/DeepSeek-Balance-Whale-Widget) | 已核准 / approved | 4610 | +118 | 153 | 54d | 日增百星 | 日增 +118★；已不进榜单 |
| ⚠️ [dsh-market/dsh-market](https://github.com/dsh-market/dsh-market) | 已核准 / approved | 6275 | +108 | 263 | 58d | 日增百星 | 日增 +108★；已不进榜单 |


| # | Project | Stars | Created | First seen | Description |
| ---: | --- | ---: | ---: | ---: | --- |
| 1 | [QingYunA/answer-me-with-html](https://github.com/QingYunA/answer-me-with-html) ⚠️ | 3108 | 2026-10-02 | 2026-10-12 | Answer me with HTML — an agent skill that answers hard questions with a one-page HTML you can actually read. 让 AI Agent 用一页 HTML 回答复杂问题。 |
| 2 | [Fei2411/DeepSeek-Bot](https://github.com/Fei2411/DeepSeek-Bot) ⚠️ | 1350 | 2026-10-07 | 2026-10-12 | A team of long-lived bots for DeepSeek Harness, with main bots, bot-to-bot messages and group chats. |
| 3 | [jaccen/Awesome-Gaussian-Skills](https://github.com/jaccen/Awesome-Gaussian-Skills) ⚠️ | 161 | 2026-04-28 | 2026-10-12 | 图形学与3DGS、空间智能持续更新论文；AI Agent Skills for 3D Gaussian Splatting, NeRF &amp; Computer Graphics Research. 800+ methods, 25categories, 12skills. OpenClaw / Claude Code compatible. |
| 4 | [youbaiyun/dsh-browser-crossplatform](https://github.com/youbaiyun/dsh-browser-crossplatform) | 62 | 2026-10-02 | 2026-10-12 | Browser extension for the DeepSeek Harness desktop app. The model reads the page you are on as text with numbered controls and acts on it — click, type, scroll, navigate, manage tabs — and, when you switch image recognition on, looks at an image you point at. It asks before acting, keeps passwords in the page, and talks to your own desktop; the one |
| 5 | [LingyeSoul/dsh-tavern](https://github.com/LingyeSoul/dsh-tavern) | 22 | 2026-08-14 | 2026-10-12 | 把 DSH（deepseek-harness）扩展成兼容 SillyTavern 生态的角色扮演工作区。角色卡、世界书、预设、MVU变量结算、Mod 扩展——资产与数据都在你自己的机器上，LLM 跑在你自己的 DSH 路由与原生 AgentLoop 里 |
| 6 | [Scorp1o117/dsh-motion-ui](https://github.com/Scorp1o117/dsh-motion-ui) | 13 | 2026-10-10 | 2026-10-12 | Interactive UI, HTML/SVG diagrams and animation for DeepSeek Harness Web |
| 7 | [MrMu666/dsh-lan-tool](https://github.com/MrMu666/dsh-lan-tool) | 10 | 2026-08-14 | 2026-10-12 | 为DeepSeek  harness开启局域网访问及移动端页面的插件，移动端界面适配 |
| 8 | [OMSociety/dsh-ppt-maker](https://github.com/OMSociety/dsh-ppt-maker) | 10 | 2026-09-03 | 2026-10-12 | DSH 插件：内含 kimi-ppt 技能。创建 / 编辑 / 复刻 / 导出 PPT，DSH 内纯本地导出 |
| 9 | [goodrain/rainskills](https://github.com/goodrain/rainskills) | 7 | 2026-05-13 | 2026-10-12 | Rainskills 是一组开源 Agent Skills，让 Codex、Claude Code、Pi Agent、 DeepSeek Harness、WorkBuddy 和 Hermes Agent 能够完成应用识别、部署、 排错、交付验证、版本管理和回滚。 |
| 10 | [IT-coder-Yy/dsh-lazygit-plugin](https://github.com/IT-coder-Yy/dsh-lazygit-plugin) | 7 | 2026-08-14 | 2026-10-12 | A visual Git workbench for DeepSeek Harness Web—inspect repositories, run common Git actions, and safely execute AI-generated workflows. |
| 11 | [2861292267/dsh-prompt-enhancer](https://github.com/2861292267/dsh-prompt-enhancer) | 3 | 2026-10-12 | 2026-10-12 | WorkBuddy's 增强提示词 (Enhance Prompt) as a DeepSeek Harness plugin: rewrite the composer draft into a stronger prompt with one click. |
| 12 | [bagpipe1289/dsh-paperflight](https://github.com/bagpipe1289/dsh-paperflight) | 3 | 2026-10-09 | 2026-10-12 | 纸航 Paperflight — an unofficial future-retro Web interface for DeepSeek Harness. Experimental preview. |
| 13 | [czcdr/dsh-plugin-rea](https://github.com/czcdr/dsh-plugin-rea) | 3 | 2026-10-12 | 2026-10-12 | 第三方适配插件：把上游 REA（逆向一切，github.com/morluto/rea）的 MCP 服务注册进 DeepSeek Harness，得到 mcp__rea__* 工具；原生二进制(Hopper/Ghidra/IDA)、JS/Electron、.NET、网站、APK/adb、固件等分析能力均由上游提供。Third-party adapter — analysis is upstream REA own. Verified: REA 6.4.0 + DSH 0.2.0-rc.2 + Ghidra 12.1.4. |
| 14 | [xiaolu511/dsh-hot-restart](https://github.com/xiaolu511/dsh-hot-restart) | 3 | 2026-10-11 | 2026-10-12 | DSH 热重启插件：窗口内一个固定按钮，一键关闭并自动重开 DeepSeek Harness，全程零控制台窗口；内置自检系统，出问题点一下就能生成可直接定位的诊断报告 · Hot-restart plugin for DSH, with a built-in self-check that writes a one-file diagnostic report |
| 15 | [dsh-plugin-collection/dsh-later](https://github.com/dsh-plugin-collection/dsh-later) | 2 | 2026-09-12 | 2026-10-12 | 给 DSH 加上定时发送：输入一句话，到点自动以你的身份送出，关掉网页也准时触发。定时发送 / 定时提醒 / 延迟发送。｜ Scheduled send for DSH: type now, delivered as you at the time you pick — even with the page closed. |
| 16 | [git4oc/DSH-BOOT](https://github.com/git4oc/DSH-BOOT) | 2 | 2026-10-10 | 2026-10-12 | DSH-BOOT,基于 DSH 内核的多租户 AI Agent 平台。多租户隔离、安全审计、审批、配额计费、会话持久化、演进兼容开箱即得——你只写业务逻辑。 |
| 17 | [manhkhiemhoang2-bit/dsh-costcast](https://github.com/manhkhiemhoang2-bit/dsh-costcast) | 2 | 2026-10-12 | 2026-10-12 | DeepSeek Harness 插件：在输入框上方预估下一步与本轮的会话成本 |
| 18 | [mrwisdon/dsh-tianyicui-monitor](https://github.com/mrwisdon/dsh-tianyicui-monitor) | 2 | 2026-10-12 | 2026-10-12 | DeepSeek Harness plugin: commit activity, contribution heatmap with shared selection, and a calibrated 72h release probability |
| 19 | [nailiang002-wq/deepseek-girl-harness](https://github.com/nailiang002-wq/deepseek-girl-harness) | 2 | 2026-10-10 | 2026-10-12 | DeepSeek 娘互动挂件：任务表情、铁盆白饭、盆帽与时间问候。 Interactive companion for DeepSeek Harness Desktop. |
| 20 | [Prokint/infinite-canvas-dsh](https://github.com/Prokint/infinite-canvas-dsh) | 2 | 2026-10-10 | 2026-10-12 | Infinite Canvas fork with DeepSeek Harness desktop plugin and Canvas Agent MCP integration |
| 21 | [2026heshao/dsh-obsidian-board](https://github.com/2026heshao/dsh-obsidian-board) | 1 | 2026-10-12 | 2026-10-12 | Turn your local Obsidian vault into a RAG chat panel inside DeepSeek Harness (DSH). 100% local BM25 retrieval, clickable citations. 把本地 Obsidian 变成 DSH 的本地知识库对话面板。 |
| 22 | [Airisey/dsh-model-failover](https://github.com/Airisey/dsh-model-failover) | 1 | 2026-10-12 | 2026-10-12 | 模型接力 —— 用优先级队列接管 LLM 输出 |
| 23 | [Amadeus2027/dsh-sketch-reference](https://github.com/Amadeus2027/dsh-sketch-reference) | 1 | 2026-10-08 | 2026-10-12 | Visual sketchboard for DeepSeek Harness: draw with Excalidraw, let AI agents inspect and annotate sketches, and review proposed edits. |
| 24 | [Ansellwan/DeepSeekHarness-Session-Delete](https://github.com/Ansellwan/DeepSeekHarness-Session-Delete) | 1 | 2026-10-12 | 2026-10-12 | 为 DeepSeek Harness 侧栏会话补充官方缺失的「删除会话」：运行中置灰、二次确认、真删除。 A DeepSeek Harness plugin adding the missing Delete-session action to the sidebar. |
| 25 | [Autumn984/dsh-remote](https://github.com/Autumn984/dsh-remote) | 1 | 2026-10-11 | 2026-10-12 | DeepSeek Harness 手机远程控制插件：扫码即用，局域网 / IPv6 / Cloudflare 隧道三通道，令牌鉴权 |
| 26 | [azazo1/dsh-prompt-inject](https://github.com/azazo1/dsh-prompt-inject) | 1 | 2026-10-12 | 2026-10-12 | 把用户维护的文字块注入 DSH 系统提示词: 默认给出工具调用之间的进度汇报规范, 用来提高 agent message 输出频率 |
| 27 | [BaronCyrus/dsh-packycode-api](https://github.com/BaronCyrus/dsh-packycode-api) | 1 | 2026-10-12 | 2026-10-12 | Use a PackyCode (PackyAPI) API key in DeepSeek Harness: built-in multi-protocol model route, ordered API-key rotation, and balance display |
| 28 | [bloodarea/dsh-agent-team-browser](https://github.com/bloodarea/dsh-agent-team-browser) | 1 | 2026-10-11 | 2026-10-12 | A shared Chromium browser workspace for DeepSeekHarness, designed for multi-agent automation, human takeover, and collaborative debugging. |
| 29 | [chenkui-luo/dsh-plugin-restart](https://github.com/chenkui-luo/dsh-plugin-restart) | 1 | 2026-10-12 | 2026-10-12 | A Restart button for DeepSeek Harness Settings: replaces the dsh web process serving the page, then reconnects the page by itself. |
| 30 | [DragonHorizon-xtihc/dsh-connect-opencode-free](https://github.com/DragonHorizon-xtihc/dsh-connect-opencode-free) | 1 | 2026-10-11 | 2026-10-12 | 把 **OpenCode Zen** 的免费模型接进 **DeepSeek Harness**：实时发现官方免费档模型，在设置里逐个启停，一键写入 provider。**免 key** |
| 31 | [FIZMIE/dsh-net-proxy](https://github.com/FIZMIE/dsh-net-proxy) | 1 | 2026-10-11 | 2026-10-12 | Self-contained outbound proxy for the DeepSeek Harness desktop app: bundled mihomo core, Clash subscription import, its own latency ranking and automatic failover. No third-party proxy client, no system proxy. |
| 32 | [Heidashuai-X/dsh-recharge-animation](https://github.com/Heidashuai-X/dsh-recharge-animation) | 1 | 2026-10-12 | 2026-10-12 | DSH sidebar recharge button -&gt; frosted-glass startup animation -&gt; official top-up page in a native platform view |
| 33 | [hpfs0/dsh-provider-proxy](https://github.com/hpfs0/dsh-provider-proxy) | 1 | 2026-10-12 | 2026-10-12 | 一个让provider会走代理的插件 |
| 34 | [Hyfwdnmd666/dsh-ai-ball](https://github.com/Hyfwdnmd666/dsh-ai-ball) | 1 | 2026-10-12 | 2026-10-12 | DSH plugin: give the agent a mouth through the ai-ball floating orb (speak, mood, panel, listen). |
| 35 | [j62268781-alt/dsh-hindsight-bank-router](https://github.com/j62268781-alt/dsh-hindsight-bank-router) | 1 | 2026-10-12 | 2026-10-12 | 把 Hindsight 编码插件的 bank 身份锚定到远程仓库名，而不是本地目录名。Anchors Hindsight coding-agent memory banks to the remote repository name instead of the local directory name. |
| 36 | [Jinn-Wu/dsh-preview-panel](https://github.com/Jinn-Wu/dsh-preview-panel) | 1 | 2026-08-16 | 2026-10-12 | A multi-tab preview panel plugin for DeepSeek Harness |
| 37 | [jungenius-stack/dsh-zcode-ui](https://github.com/jungenius-stack/dsh-zcode-ui) | 1 | 2026-10-12 | 2026-10-12 | DSH ZCode UI — 把 DeepSeek Harness Web 的界面换成 ZCode 风格：侧栏、工作区会话树、全局搜索与轮次导航。A ZCode-styled sidebar, workspace session tree, global search, and turn navigation skin for DSH Web. |
| 38 | [LanFeng97/dsh-bottom-cost](https://github.com/LanFeng97/dsh-bottom-cost) | 1 | 2026-10-12 | 2026-10-12 | DSH web plugin: per-turn session cost chip in the composer stats row — per-turn spend and cache-hit / cache-miss totals (CNY), priced from an official price table refreshed on demand. · DSH 网页插件：输入框下方统计栏里的会话费用胶囊——逐轮花费与命中/未命中两项总额（CNY），价目表按需从官方定价页刷新。 |
| 39 | [LanFeng97/dsh-workspace-create-dialog](https://github.com/LanFeng97/dsh-workspace-create-dialog) | 1 | 2026-10-12 | 2026-10-12 | Codex-style Create Workspace dialog for DeepSeek Harness: type a name and the folder is created for you, or pick a folder with a native chooser that remembers where you were. |
| 40 | [lcx9451/dsh-engineering-skill-pack](https://github.com/lcx9451/dsh-engineering-skill-pack) | 1 | 2026-10-12 | 2026-10-12 | DeepSeek Harness 技能包：28 个工程 / 技术栈 / 界面设计 / 写作技能，dsh plugin add 一条命令装完（含上游署名与许可证） |
| 41 | [left0ver/dsh-intelligent-ui](https://github.com/left0ver/dsh-intelligent-ui) | 1 | 2026-10-10 | 2026-10-12 | DeepSeek Harness 插件：模型直接给出可以操作的界面，而不只是文字回答。A DeepSeek Harness plugin: the model answers with an interface you can operate, not just text. |
| 42 | [lnuxe/dsh-plugins](https://github.com/lnuxe/dsh-plugins) | 1 | 2026-10-08 | 2026-10-12 | Reverse-engineered Cursor system prompts, skills, and MCP servers repackaged as DeepSeek Harness plugins |
| 43 | [mili1360/dsh-history-fold](https://github.com/mili1360/dsh-history-fold) | 1 | 2026-10-11 | 2026-10-12 | DSH plugin: folds the oldest part of a session history into one message backed by a lossless local archive. No model-written summary, everything recoverable. |
| 44 | [mili1360/dsh-proactive](https://github.com/mili1360/dsh-proactive) | 1 | 2026-10-12 | 2026-10-12 | DSH plugin: wakes the agent when a long background task (download, install, wait) finishes after the turn has ended, so it reports back on its own. |
| 45 | [mili1360/dsh-session-vacuum](https://github.com/mili1360/dsh-session-vacuum) | 1 | 2026-10-11 | 2026-10-12 | DSH plugin: prunes the dead streaming fragments out of session logs at startup, so a long session stops expanding into gigabytes when it is loaded. Inert and dry-run by default. |
| 46 | [neobones/dsh-locale-es-cl](https://github.com/neobones/dsh-locale-es-cl) | 1 | 2026-10-12 | 2026-10-12 | Pack de idioma espanol de Chile (es-CL) para la interfaz web de DeepSeek Harness: 2603 cadenas, plugin de cliente sin parchear la app. |
| 47 | [qingmingyiyang/Incremind](https://github.com/qingmingyiyang/Incremind) | 1 | 2026-10-09 | 2026-10-12 | 通过经历增量积累记忆、修正认识、逐渐形成理解的认知系统（Accumulate memory, revise knowledge and gradually form a cognitive system of understanding through incremental experience.） |
| 48 | [Ronniealgo/dsh-mail-guardian](https://github.com/Ronniealgo/dsh-mail-guardian) | 1 | 2026-10-12 | 2026-10-12 | DSH 邮箱管家：静默后台收信、缓存优先的即时双邮箱报告；明确同步失败与旧结果，邮件仅在本机处理。 |
| 49 | [scientificmaniac/dsh-code-highlight](https://github.com/scientificmaniac/dsh-code-highlight) | 1 | 2026-10-11 | 2026-10-12 | 为报告类文档提供代码语法高亮的 DeepSeek Harness（DSH）插件。注册一个 highlight_code 工具， 把代码片段渲染成带真实语法配色的产物，落到 Markdown / HTML、Word、PowerPoint、PDF 与 LaTeX 里。 |
| 50 | [TangAu-relife/dsh-voice-notify](https://github.com/TangAu-relife/dsh-voice-notify) | 1 | 2026-10-12 | 2026-10-12 | DSH 插件：每轮对话收尾时用中文语音播报提醒（Windows / 设置页可视化配置 / 20 条内置语音） |
| 51 | [umairrrkhan/dsh-novel-quality-analyzer](https://github.com/umairrrkhan/dsh-novel-quality-analyzer) | 1 | 2026-10-12 | 2026-10-12 | Novel analyzer for DeepSeek Harness that checks vocabulary diversity, clichés, and repetition locally. |
| 52 | [vasptiger/vasp-scope](https://github.com/vasptiger/vasp-scope) | 1 | 2026-10-12 | 2026-10-12 | Local web dashboard for VASP results over SSH (read-only): band structure, PDOS, NEB barrier, AIMD (MSD/RDF); per-feature PNG/CSV export. 浏览器里看集群上的 VASP 计算结果 · 独立版 + DeepSeek Harness 插件 |
| 53 | [VICqiufeeng/dsh-minimax-connect](https://github.com/VICqiufeeng/dsh-minimax-connect) | 1 | 2026-10-12 | 2026-10-12 | Use the MiniMax Code (Mavis) subscription already signed in on this machine as a DeepSeek Harness model provider — with self-renewing credentials, a points/check-in panel and a model roster editor. |
| 54 | [weihaobin0818-lgtm/dsh-system-monitor](https://github.com/weihaobin0818-lgtm/dsh-system-monitor) | 1 | 2026-10-12 | 2026-10-12 | DSH 侧栏实时硬件监控：CPU / GPU / 内存 / 磁盘一页看完，每秒刷新，每个读数都能下钻到是哪个应用。支持容量与内存耗尽预测、阈值告警与 NDJSON 导出。纯 Node，零运行时依赖，完整功能仅 Windows。 |
| 55 | [zhao-guang-ai/dsh-quote-annotate-pro](https://github.com/zhao-guang-ai/dsh-quote-annotate-pro) | 1 | 2026-10-10 | 2026-10-12 | Selection quoting and anchored annotations for DSH conversations: quote a passage and the model receives the exact turn, role and text. · 划词批注与引用锚点：选中文字带锚点进入输入框，可跳回原文并高亮；发送后模型知道是哪一轮、谁说的。 |
| 56 | [2026heshao/dsh-draft-attachments](https://github.com/2026heshao/dsh-draft-attachments) | 0 | 2026-10-11 | 2026-10-12 | Persist DSH composer draft attachments across page switches and restarts. IndexedDB capture + official createDrafts restore. 让 DSH 输入框的草稿图片像文字一样切页不丢、重启可恢复。 |
| 57 | [439436269-ctrl/dsh-video-pipeline](https://github.com/439436269-ctrl/dsh-video-pipeline) | 0 | 2026-10-12 | 2026-10-12 | DSH 插件：把一条短视频生产流水线（19 个 skill：编排 + 原子）内置进 agent 技能目录 |
| 58 | [abadiegie/dsh-jetbrains](https://github.com/abadiegie/dsh-jetbrains) | 0 | 2026-10-12 | 2026-10-12 | Unofficial DeepSeek Harness ⇄ JetBrains integration: DSH chat inside your IDE, and your IDE workspace — project, attached modules, active file and caret — in front of the model. |
| 59 | [aci825223/dsh-reasoning-slider](https://github.com/aci825223/dsh-reasoning-slider) | 0 | 2026-10-12 | 2026-10-12 | DSH Web plugin: replace the composer reasoning-effort picker with an inline slider card. |
| 60 | [ahian-lee/dsh-ssh-workspace](https://github.com/ahian-lee/dsh-ssh-workspace) | 0 | 2026-10-12 | 2026-10-12 | Transparent SSH workspaces for DeepSeek Harness Desktop 0.2: local runtime, remote files, search and Bash. |
| 61 | [ai-tool-labs/dsh-converter](https://github.com/ai-tool-labs/dsh-converter) | 0 | 2026-10-12 | 2026-10-12 | DSH File Converter: local file conversion across 20 tool chains and 1000+ format pairs — convert files, query the format matrix, and check converter availability via model tools.  DSH 文件格式转换插件：跨 20 个转换器、覆盖 1000+ 格式对，以模型工具提供本地文件转换、格式矩阵查询与转换器可用性检测 |
| 62 | [ai-tool-labs/dsh-squares](https://github.com/ai-tool-labs/dsh-squares) | 0 | 2026-10-12 | 2026-10-12 | DSH Squares: An all-in-one sidebar for managing plugins / experts / skills / connectors / (compatible with both web and desktop).  DSH Squares（广场）：侧边栏一体化管理插件 / 专家 / 技能 / 连接器 / （Web 端与桌面端通用） |
| 63 | [AIcivilization/dsh-cpamc](https://github.com/AIcivilization/dsh-cpamc) | 0 | 2026-10-12 | 2026-10-12 | 在 DeepSeek Harness (dsh) 里打开完整的 CPAMC 管理界面 · Open the full CPAMC console inside dsh |
| 64 | [Alm-Allen/dsh-cangjie-preset](https://github.com/Alm-Allen/dsh-cangjie-preset) | 0 | 2026-10-12 | 2026-10-12 | dsh 插件：把 DeepSeek Harness 的原生「PTC 模式」完整汉化——覆盖 preset-ptc，不新增预设条目。 |
| 65 | [Alm-Allen/dsh-chat-preset](https://github.com/Alm-Allen/dsh-chat-preset) | 0 | 2026-10-12 | 2026-10-12 | dsh 插件：把 DeepSeek Harness 的原生「极简模式」爆改成 Chat 模式——零工具、零系统提示词注入。 |
| 66 | [Alm-Allen/dsh-maliang-preset](https://github.com/Alm-Allen/dsh-maliang-preset) | 0 | 2026-10-12 | 2026-10-12 | dsh 插件：把 DeepSeek Harness 的原生「创造模式」完整汉化——覆盖 preset-cordis，不新增预设条目。 |
| 67 | [Alm-Allen/dsh-yayan-preset](https://github.com/Alm-Allen/dsh-yayan-preset) | 0 | 2026-10-12 | 2026-10-12 | dsh 插件：把 DeepSeek Harness 的原生「标准模式」完整汉化——覆盖 preset-standard，不新增预设条目。 |
| 68 | [amosogra/dsh-subscription-signin](https://github.com/amosogra/dsh-subscription-signin) | 0 | 2026-10-12 | 2026-10-12 | Sign in to ChatGPT, Claude, Copilot and other subscription model routes inside the DeepSeek Harness — the sign-in button the Harness never shipped. |
| 69 | [ant404/dsh-session-delete-ui](https://github.com/ant404/dsh-session-delete-ui) | 0 | 2026-10-12 | 2026-10-12 | DSH (DeepSeek Harness) plugin: adds a permanent Delete session action to the sidebar session row menu, with a themed confirmation dialog and a running-work guard. |
| 70 | [aqiu817/dsh-plugin-continue-on-limit](https://github.com/aqiu817/dsh-plugin-continue-on-limit) | 0 | 2026-10-12 | 2026-10-12 | DeepSeek Harness plugin that presses "continue" for you: when a turn ends by exhausting the output-token limit it sends a next-turn follow-up automatically, gated by a per-session burst cap, a minimum interval, and an opt-out. |
| 71 | [ax2/dsh-deterministic-tools](https://github.com/ax2/dsh-deterministic-tools) | 0 | 2026-10-12 | 2026-10-12 | Deterministic, offline, bounded tools for DeepSeek Harness: 29 JSON/YAML/CSV, text, encoding and inspection tools, each returning a byte receipt. |
| 72 | [ax2/dsh-dev-toolbox](https://github.com/ax2/dsh-dev-toolbox) | 0 | 2026-10-12 | 2026-10-12 | One command installs four deterministic DeepSeek Harness plugins: 46 offline, bounded tools for JSON/YAML/CSV/encoding chores plus JVM, Python and Windows production diagnostics. |
| 73 | [ax2/dsh-jvm-doctor](https://github.com/ax2/dsh-jvm-doctor) | 0 | 2026-10-12 | 2026-10-12 | JVM production-report doctor for DeepSeek Harness: jstack/cmd thread dumps, GC logs, Maven/Gradle dependency conflicts, stack traces and Spring config diffs parsed into structured diagnoses. |
| 74 | [ax2/dsh-py-doctor](https://github.com/ax2/dsh-py-doctor) | 0 | 2026-10-12 | 2026-10-12 | Python/Django production-report doctor for DeepSeek Harness: traceback, pytest, migrations, N+1 SQL, django checks and celery inspection parsed into structured diagnoses. |
| 75 | [ax2/dsh-win-native](https://github.com/ax2/dsh-win-native) | 0 | 2026-10-12 | 2026-10-12 | Windows correctness layer for DeepSeek Harness: encoding detection/conversion (GBK/GB18030/Big5/Shift-JIS), Windows path legality, netstat interpretation, and bounded read-only disk inspection. |
| 76 | [ax2/dsh-zidev-toolbox](https://github.com/ax2/dsh-zidev-toolbox) | 0 | 2026-10-12 | 2026-10-12 | Renamed to ax2/dsh-dev-toolbox -- this repository is archived. |
| 77 | [badai147/dsh-leafy-skin](https://github.com/badai147/dsh-leafy-skin) | 0 | 2026-10-12 | 2026-10-12 | An eye-friendly green skin for DeepSeek Harness. |
| 78 | [BaoBao1996121/dsh-composer-draft-cache](https://github.com/BaoBao1996121/dsh-composer-draft-cache) | 0 | 2026-10-12 | 2026-10-12 | dsh给我记住：切换 DSH 会话时，独立保留未发送的文字、图片和文件附件。dsh-geiwo-jizhu |
| 79 | [BaoBao1996121/dsh-huaci-pinglun](https://github.com/BaoBao1996121/dsh-huaci-pinglun) | 0 | 2026-10-12 | 2026-10-12 | dsh划词评论：在 DSH 中划词评论或添加到对话，修复引用框裁字。MIT 修补分支。dsh-huaci-pinglun |
| 80 | [BeiWay1145/dsh-ops-guard](https://github.com/BeiWay1145/dsh-ops-guard) | 0 | 2026-09-13 | 2026-10-12 | DeepSeek Harness plugin: force every large-file download through the local aria2 engine by denying shell download commands at the tool pre-execute hook. 强制下载统一走 aria2 的 DSH 插件。 |
| 81 | [BlankTasftu/dsh-delivery-library](https://github.com/BlankTasftu/dsh-delivery-library) | 0 | 2026-10-12 | 2026-10-12 | 在 DSH 对话窗的「对话 / 轨迹」之外再加一个「交付文件」视图：汇总当前会话里全部显式交付（present）与文件产出（write / edit），一个会话一份可检索的文件库。 |
| 82 | [BlkSword/dsh-flowus](https://github.com/BlkSword/dsh-flowus) | 0 | 2026-10-11 | 2026-10-12 | DeepSeek Harness（DSH）的 FlowUs 集成插件：通过 OAuth 2.1 浏览器授权接入 FlowUs 官方 MCP 服务器，将其工具注册为 Agent 原生工具，并提供 /flowus 命令与设置面板页面。FlowUs integration plugin for DeepSeek Harness: OAuth 2.1 browser authorization against the official MCP server, tools registered as native agent tools, a /flowus command and a settings page. |
| 83 | [buaaflyaway/dsh-question-note](https://github.com/buaaflyaway/dsh-question-note) | 0 | 2026-10-12 | 2026-10-12 | DeepSeek Harness (dsh) plugin: ask_user_question popup enhancement - selecting an option reveals a per-option note input, sent to the model with the selection |
| 84 | [catisamaomao/dsh-atelier-clickfx](https://github.com/catisamaomao/dsh-atelier-clickfx) | 0 | 2026-10-10 | 2026-10-12 | Theme-aware click effects for DeepSeek Harness — gold ripples, stars, five languages, macOS/Windows/Linux. |
| 85 | [CECILIALOVE0616/dsh-prompt-studio](https://github.com/CECILIALOVE0616/dsh-prompt-studio) | 0 | 2026-10-12 | 2026-10-12 | DSH 提示词工作台：优化、多轮迭代、多模型对比测试 \| Prompt Studio plugin for DeepSeek Harness — optimize, iterate, compare prompts |
| 86 | [Cjrrrrrrrr/dsh-plugins](https://github.com/Cjrrrrrrrr/dsh-plugins) | 0 | 2026-10-12 | 2026-10-12 | DeepSeek Harness plugins: academic literature search tools (OpenAlex/arXiv/Crossref/Semantic Scholar/PubMed + Unpaywall), and a Web sidebar layout fix. |
| 87 | [cxykyw/dsh-web-search-tavily](https://github.com/cxykyw/dsh-web-search-tavily) | 0 | 2026-10-12 | 2026-10-12 | Tavily-backed WebSearchProvider for the DeepSeek Harness web capability seam (ctx.web) — npm: dsh-tavily-cxykyw |
| 88 | [DASHAN-0079/dsh-photocraft](https://github.com/DASHAN-0079/dsh-photocraft) | 0 | 2026-10-12 | 2026-10-12 | PhotoCraft image editing and native desktop automation plugin for DeepSeek Harness (Windows, Intel Mac and Apple Silicon). |
| 89 | [dd598/dsh-handdrawn-skin](https://github.com/dd598/dsh-handdrawn-skin) | 0 | 2026-10-12 | 2026-10-12 | 手绘素描风皮肤：纸 + 墨的单色观感，给 DeepSeek Harness Web 界面换上一套手绘墨黑主题 |
| 90 | [DeepCodec/dsh-clock](https://github.com/DeepCodec/dsh-clock) | 0 | 2026-10-12 | 2026-10-12 | DSH（DeepSeek Harness）插件：在底部状态栏（composer dock）常驻显示当前日期与时间，提供可视化配置。 |
| 91 | [defaver04/opencodezen4dsh](https://github.com/defaver04/opencodezen4dsh) | 0 | 2026-10-12 | 2026-10-12 | Free OpenCode Zen models for DeepSeek Harness (DSH) — native dsh-llm adapter, no API key. Fork with muse-spark unblocked, xhigh/max thinking levels, and a session-log safety guard. |
| 92 | [DightEndless/dsh-browser](https://github.com/DightEndless/dsh-browser) | 0 | 2026-10-09 | 2026-10-12 | Open the extension side panel and it takes over the page you are already on: click, type, scroll, drag, navigate, upload, screenshot — login state intact. Adds hover, coordinate clicks, batches and multi-browser switching. Chrome/Edge MV3 extension + DSH bridge plugin. 打开侧边栏即可原地接管当前网页。 |
| 93 | [dingminhua/dsh-connect-qoder](https://github.com/dingminhua/dsh-connect-qoder) | 0 | 2026-10-11 | 2026-10-12 | Connect Qoder (Lingma CN / international) models to DeepSeek Harness through their PATs, with a multi-account pool, daily check-in, automatic failover, and a read-only credits overview. |
| 94 | [dirtywork22/dsh-client-ui-skin-bayern](https://github.com/dirtywork22/dsh-client-ui-skin-bayern) | 0 | 2026-10-12 | 2026-10-12 | Bayern Munich skin for the dsh web GUI: home-red/away-white canvases, real match-photo backdrops for 19 first-team players plus drawn shirt, squad-wall, Allianz-Arena and plain backdrops. |
| 95 | [dsh-plugin-collection/dsh-herdr-site](https://github.com/dsh-plugin-collection/dsh-herdr-site) | 0 | 2026-09-01 | 2026-10-12 | 让 Herdr 认识 DSH 面板：把 agent 的 working/idle/blocked 状态报给 Herdr，支持面板跳转与 --wait。状态上报 / 终端集成。｜ Teaches Herdr about DSH panes: reports agent working/idle/blocked state, enabling panel jump and --wait support. |
| 96 | [dsh-plugin-collection/dsh-suggest-ghost](https://github.com/dsh-plugin-collection/dsh-suggest-ghost) | 0 | 2026-09-01 | 2026-10-12 | 给 DSH 输入框加上输入预测：回合结束后自动建议你的下一句话，Tab 一键采纳；输入时按历史做前缀补全。输入预测 / 自动补全。｜ Input prediction for the DSH composer: next prompt suggested as ghost text, Tab to accept, plus history prefix completion. |
| 97 | [dsh-plugin-lab/dsh-plugin-debugging](https://github.com/dsh-plugin-lab/dsh-plugin-debugging) | 0 | 2026-10-12 | 2026-10-12 | Read-only debugging toolkit for a running DSH instance |
| 98 | [dushudou/dsh-web3](https://github.com/dushudou/dsh-web3) | 0 | 2026-08-23 | 2026-10-12 | Agent-safe EVM wallet for DeepSeek Harness (DSH): encrypted local keys, signing policy and spending limits, pre-signing security checks, x402 payments |
| 99 | [dusktin71-lang/dsh-lessons](https://github.com/dusktin71-lang/dsh-lessons) | 0 | 2026-10-12 | 2026-10-12 | DSH (DeepSeek Harness) 插件：记录 AI 的愚蠢时刻与被纠正之处，沉淀成教训清单，并在后续每次对话中自动注入系统提示词，让本地模型不再重复犯同样的错。 |
| 100 | [dzy1571315598/dsh-fritia-pet](https://github.com/dzy1571315598/dsh-fritia-pet) | 0 | 2026-10-12 | 2026-10-12 | Fritia 桌宠 — DeepSeek Harness (DSH) 桌宠插件：右下角待机/走路/抓取/情绪/余额面板 |
| 101 | [EricFL1998/dsh-subscription-oauth](https://github.com/EricFL1998/dsh-subscription-oauth) | 0 | 2026-10-12 | 2026-10-12 | Use your Kimi Code / Grok (X Premium) / Google Antigravity / GLM (BigModel) subscriptions as DeepSeek Harness LLM providers - OAuth sign-in, per-model visibility, drag-to-reorder Auto fallback, and plan quotas from the Settings page. No API keys. |
| 102 | [FABAGV/dsh-prompt-adapt](https://github.com/FABAGV/dsh-prompt-adapt) | 0 | 2026-10-11 | 2026-10-12 | 或许是帮助dsh理解可能不是人话的人话的工具 |
| 103 | [FABAGV/dsh-whale-inurqq](https://github.com/FABAGV/dsh-whale-inurqq) | 0 | 2026-10-12 | 2026-10-12 | 提升某些情况下的人机工效 |
| 104 | [FantastyQAQ/dsh-doxygen](https://github.com/FantastyQAQ/dsh-doxygen) | 0 | 2026-10-12 | 2026-10-12 | Doxygen comment workflow for C/C++ (including Qt) sources: file headers, functions, module groups, trailing and short comments, plus a scan that flags comments whose signature fingerprint went stale. Installable as a DSH plugin (skill). |
| 105 | [Firefox2100/dsh-ai-providers](https://github.com/Firefox2100/dsh-ai-providers) | 0 | 2026-10-03 | 2026-10-12 | DSH plugins for unified AI providers that handles missing capabilities in the main framework |
| 106 | [giriimuls/dsh-chat-eraser](https://github.com/giriimuls/dsh-chat-eraser) | 0 | 2026-10-12 | 2026-10-12 | Allows for a deletion of chats under workspace. Also lets you edit the prompts that are already inputted.  |
| 107 | [git4oc/ZY-Agents](https://github.com/git4oc/ZY-Agents) | 0 | 2026-10-12 | 2026-10-12 | ZY-Agents 是单租户自托管的企业级多智能体平台，采用管理面与执行面分离的架构：主服务负责认证、编排与数据，内核宿主负责 Agent 运行时与本地工具执行。 |
| 108 | [gygygfg/dsh-stage-sandbox](https://github.com/gygygfg/dsh-stage-sandbox) | 0 | 2026-10-08 | 2026-10-12 | DSH plugin: Windows staging-candidate-selective-commit sandbox (files + registry) with a review panel |
| 109 | [hakulat2023/dsh-session-delete](https://github.com/hakulat2023/dsh-session-delete) | 0 | 2026-10-12 | 2026-10-12 | Session deletion for DeepSeek Harness: recoverable trash-based delete, a sidebar menu row, and session_delete / session_restore agent tools. |
| 110 | [hatsuyuki0103/ptrade](https://github.com/hatsuyuki0103/ptrade) | 0 | 2026-10-12 | 2026-10-12 | A 股 CANSLIM 模拟盘：T+1 / 融资融券 / 维持担保比例风控 / 七因子打分 / 离线单文件 K 线图。真实 akshare 数据 + 本地缓存夹具，离线可复现。 |
| 111 | [Huangmr0719/dsh-tui-marathon](https://github.com/Huangmr0719/dsh-tui-marathon) | 0 | 2026-10-12 | 2026-10-12 | Marathon-inspired Acid Rain theme and native startup animation for DeepSeek Harness TUI |
| 112 | [huayuguo/dsh-gitee-chat](https://github.com/huayuguo/dsh-gitee-chat) | 0 | 2026-10-10 | 2026-10-12 | Gitee enterprise project management for DeepSeek Harness: project board, repos &amp; WIKI, knowledge base, and write-back through the bundled Gitee Ent MCP gateway. |
| 113 | [icrefin/dsh-mcp-mgr](https://github.com/icrefin/dsh-mcp-mgr) | 0 | 2026-10-12 | 2026-10-12 | Workspace-level MCP server manager for DeepSeek Harness: one profile-scoped server registry, per-workspace selection, managed from a sidebar panel. |
| 114 | [icrefin/dsh-skill-mgr](https://github.com/icrefin/dsh-skill-mgr) | 0 | 2026-10-12 | 2026-10-12 | Profile-level skill manager for DeepSeek Harness: a flat skill inventory with enable/disable, discovery diagnostics and a restorable trash, in a sidebar panel. |
| 115 | [inju0524/dsh-inju-boot](https://github.com/inju0524/dsh-inju-boot) | 0 | 2026-10-12 | 2026-10-12 | 给 DeepSeek Harness 装一支开机动画：每次启动全屏播放 WebGL2 实时粒子动画（花 → 月球 → 虚影文字 → 实体 LOGO），带极客 HUD / 终端层与程序化音效，全部参数可在设置里调。 |
| 116 | [iona095/DSH_Addy-Agent](https://github.com/iona095/DSH_Addy-Agent) | 0 | 2026-10-11 | 2026-10-12 | A DeepSeek Harness (DSH) plugin that adds an Addy Agent mode powered by PTC and Addy Osmani's Agent Skills, with Duplicate Guard for repository discovery and reuse. |
| 117 | [JackRoe/dsh-token-usage-panel](https://github.com/JackRoe/dsh-token-usage-panel) | 0 | 2026-10-12 | 2026-10-12 | DSH（DeepSeek Harness）对话区下方的模型用量面板：逐次调用的 token 与花费、峰谷计价、余额查询、日历热力图 |
| 118 | [JeremyWangCY/dsh-rea](https://github.com/JeremyWangCY/dsh-rea) | 0 | 2026-10-12 | 2026-10-12 | REA reverse-engineering tools for DeepSeek Harness, as a filtering MCP bridge |
| 119 | [JJDonald/dsh-public-origin](https://github.com/JJDonald/dsh-public-origin) | 0 | 2026-10-12 | 2026-10-12 | Make loopback-assuming DeepSeek Harness plugins (bili, reasoning-effort, skill-explorer) work behind a public domain + reverse proxy, gated by DSH's own login. |
| 120 | [JoblessJoe/dsh-restart-anywhere](https://github.com/JoblessJoe/dsh-restart-anywhere) | 0 | 2026-10-12 | 2026-10-12 | One restart button for the DeepSeek Harness (dsh) web GUI that works with your setup: systemd, Docker, Kubernetes, pm2, launchd, terminal, Windows. Restarts in place, zero dependencies. |
| 121 | [Jun-Jun-Gao/dsh-token-usage-panel](https://github.com/Jun-Jun-Gao/dsh-token-usage-panel) | 0 | 2026-10-12 | 2026-10-12 | DSH plugin — Token usage panel inside DeepSeek Harness settings: daily heatmap, 30-day trend, per-session breakdown and cost estimate. |
| 122 | [Kerberos255/dsh-plugin-diagnostics](https://github.com/Kerberos255/dsh-plugin-diagnostics) | 0 | 2026-10-11 | 2026-10-12 | 统一收集本地插件的加载、失败与任务状态，脱敏写入按日轮转的 JSONL 日志。 |
| 123 | [kolawong/dsh-plugin-model-dispatch](https://github.com/kolawong/dsh-plugin-model-dispatch) | 0 | 2026-10-12 | 2026-10-12 | DSH plugin: pick separate models and reasoning efforts for the main session, subagents, and plan mode. |
| 124 | [Liang-HZ/dsh-plugin-mcp-session-meta](https://github.com/Liang-HZ/dsh-plugin-mcp-session-meta) | 0 | 2026-10-12 | 2026-10-12 | DeepSeek Harness MCP client bridge that carries the calling Agent's session id in tools/call params._meta |
| 125 | [liangkw16/dsh-web-control](https://github.com/liangkw16/dsh-web-control) | 0 | 2026-10-12 | 2026-10-12 | Control running DeepSeek Harness sessions from desktop and mobile browsers using the stock DSH Web UI and a self-hosted relay. |
| 126 | [lilinhua0413/dsh-undici-timeout-fix](https://github.com/lilinhua0413/dsh-undici-timeout-fix) | 0 | 2026-10-12 | 2026-10-12 | Removes undici's 300s body timeout that cuts off long local-model prefills. |
| 127 | [lilinhua0413/dsh-webp-relabel](https://github.com/lilinhua0413/dsh-webp-relabel) | 0 | 2026-10-12 | 2026-10-12 | Relabels DSH's normalized WebP request images as image/png so local OpenAI-compatible vision servers (LM Studio, llama.cpp) accept them. |
| 128 | [liuchaoxu/dsh-model-usage](https://github.com/liuchaoxu/dsh-model-usage) | 0 | 2026-10-12 | 2026-10-12 | 适用于DeepSeek Harness的供应商模型账户用量查询插件 |
| 129 | [ljp888/dsh-session-delete-next](https://github.com/ljp888/dsh-session-delete-next) | 0 | 2026-10-12 | 2026-10-12 | DSH (DeepSeek Harness) sidebar session deletion plugin for 0.2.0-rc.2 - replaces the version-incompatible dsh-session-delete |
| 130 | [Lucifer-xD/zadloop-ultimate-toolkit](https://github.com/Lucifer-xD/zadloop-ultimate-toolkit) | 0 | 2026-10-11 | 2026-10-12 | One-install ZadLoop toolkit: Context Surgery, Undo, mode switching, full session transfer, and 70 modern themes. |
| 131 | [maxeone/dsh-plugin-clm](https://github.com/maxeone/dsh-plugin-clm) | 0 | 2026-10-12 | 2026-10-12 | Context Language Models (CLM) for DeepSeek Harness: Active editable context window mirrored to disk for pruning and token optimization. |
| 132 | [mengxiaoxian/lookover](https://github.com/mengxiaoxian/lookover) | 0 | 2026-09-22 | 2026-10-12 | 在当前页面提问，把解决经验留给下次：DSH 悬浮气泡、按需页面上下文与个人解决经验插件（dsh-bubble / dsh-look / dsh-expmem） |
| 133 | [mi-lu-uncle/dsh-skill-console](https://github.com/mi-lu-uncle/dsh-skill-console) | 0 | 2026-10-12 | 2026-10-12 | DSH skill manager plugin: /skills, /skills-uninstall, /skills-update, /skills-doctor |
| 134 | [miaoxingyunduo/dsh-session-cost](https://github.com/miaoxingyunduo/dsh-session-cost) | 0 | 2026-10-12 | 2026-10-12 | DSH plugin: per-conversation token and money accounting — session_cost / list_session_costs tools, the /cost command, and a composer cost pill with per-model rates and DeepSeek peak/off-peak pricing |
| 135 | [Minh42/seomatic-mcp](https://github.com/Minh42/seomatic-mcp) | 0 | 2026-09-01 | 2026-10-12 | SEO agent for your own site as a hosted MCP server: Search Console, keywords, backlinks and AI-visibility data in Cline, Claude or Cursor, plus approval-gated actions. |
| 136 | [MM998LI/dsh-dock-vitals](https://github.com/MM998LI/dsh-dock-vitals) | 0 | 2026-10-12 | 2026-10-12 | Live CPU, memory and GPU readout in the DeepSeek Harness composer status bar. |
| 137 | [MoonlitDropOfBlood/dsh-deveco](https://github.com/MoonlitDropOfBlood/dsh-deveco) | 0 | 2026-10-12 | 2026-10-12 | DeepSeek Harness 的 HarmonyOS 全栈开发套件：HiLog 检查器、Chrome DevTools 风格 ArkUI Inspector（截图点选 + 组件树 + 盒模型声明值 + 自定义组件名，DevEco 开发调试源 / uitest 双树源）、ArkTS 语法高亮 .ets 查看器、工具链与设备管理，以及对话内 agent 可直接调用的 harmony_ui_tree 工具。 |
| 138 | [MoYu-CN/dsh-agent-profiles](https://github.com/MoYu-CN/dsh-agent-profiles) | 0 | 2026-10-12 | 2026-10-12 | Agent profiles for DSH: per-session persona, duties, avatar and long-term memory, injected as a system-prompt section. |
| 139 | [MoYu-CN/dsh-knowledge](https://github.com/MoYu-CN/dsh-knowledge) | 0 | 2026-10-12 | 2026-10-12 | Project knowledge base for DSH agents: capture pitfalls and reusable methods into paged volumes and surface them while you work. |
| 140 | [MoYu-CN/dsh-team-chat](https://github.com/MoYu-CN/dsh-team-chat) | 0 | 2026-10-12 | 2026-10-12 | Chat room for DSH agents: shared room timeline, member roster, and task dispatch across agent sessions. |
| 141 | [Nesarf/TastyLineOut](https://github.com/Nesarf/TastyLineOut) | 0 | 2026-10-12 | 2026-10-12 | Output house rules for every DeepSeek Harness agent: no check-mark or cross glyphs in replies or written files, and a light kaomoji habit in conversation. One global prompt section, so every preset, workspace and subagent obeys without a single preset edit. |
| 142 | [Noct2vis/dsh-mastery-loop](https://github.com/Noct2vis/dsh-mastery-loop) | 0 | 2026-10-11 | 2026-10-12 | An exam-revision loop for DeepSeek Harness: drill until every knowledge point reaches your target accuracy. / 通用应试复习闭环，每题必写思维链，蒙对不算对。 |
| 143 | [oihai/dsh-harness-trace](https://github.com/oihai/dsh-harness-trace) | 0 | 2026-10-10 | 2026-10-12 | 持续监听并记录本地 Harness 调用 LLM 的全过程：完整提示词（用户输入 + DSH/插件注入）、技能加载、工具调用与命令执行、本地文件读写、联网搜索抓取。按「轮次 → 步骤」依时间汇总为高可读 Markdown，落在会话对应工作区内，序号加时间命名。内置审阅页与可调配置。 |
| 144 | [OldLigant/dsh-auto-review-model-router](https://github.com/OldLigant/dsh-auto-review-model-router) | 0 | 2026-10-12 | 2026-10-12 | This repo is a deepseek harness plugin for routing auto review (@deepseek-ai/dsh-experimental-auto-review) reuqests to user specified model |
| 145 | [pagewellai/pagewell](https://github.com/pagewellai/pagewell) | 0 | 2026-09-11 | 2026-10-12 |  Agent skill + CLI for PageWell: write a designed document or a runnable single-page artifact with your AI agent, then publish it as a link or a share code. Prebuilt binaries for macOS / Linux / Windows. |
| 146 | [PAINCLOWN/dsh-proxy-bridge](https://github.com/PAINCLOWN/dsh-proxy-bridge) | 0 | 2026-10-12 | 2026-10-12 | Lightweight reverse-proxy bridge for DSH web GUI - fixes WS 403 through nginx |
| 147 | [PC2005-cloud/cursorkit](https://github.com/PC2005-cloud/cursorkit) | 0 | 2026-10-11 | 2026-10-12 | 给你的页面装上会呼吸的光标。25 套鼠标光标动效，封装为零依赖 Web Component，原生 Canvas 绘制，一行 import 接入，Vue / React / Next.js 与纯 HTML 通吃。每套自带主题光标（雪花冒寒气、火牙飘火星、闪电打电弧），响应滚轮与长按蓄力，铺满视口却 pointer-events: none，不干扰宿主的按钮、输入框与文字选择。 |
| 148 | [Phocinae/dsh-phocinae](https://github.com/Phocinae/dsh-phocinae) | 0 | 2026-10-07 | 2026-10-12 | Phocinae decision plugin bundle for DeepSeek Harness (dsh): phocinae_ask tool + approval gate |
| 149 | [plyflai/dsh-skills](https://github.com/plyflai/dsh-skills) | 0 | 2026-09-17 | 2026-10-12 | DeepSeek Harness 专属 Agent Skills —— harness 开发、排障、运维与工具调用可靠性 |
| 150 | [plyflai/dsh-ux-plus](https://github.com/plyflai/dsh-ux-plus) | 0 | 2026-10-08 | 2026-10-12 | 让Deepseek Harness变得更顺手的各种小功能和UX增强包。 |
| 151 | [pokiimon/dsh-memory-eternal-fork](https://github.com/pokiimon/dsh-memory-eternal-fork) | 0 | 2026-10-12 | 2026-10-12 | Maintained fork of EternalNight996/dsh-memory-eternal: local Markdown memory vault for DeepSeek Harness, with DSH 0.2.0-rc.x compatibility fixes. MIT. |
| 152 | [qingzhijie05/dsh-user-memory](https://github.com/qingzhijie05/dsh-user-memory) | 0 | 2026-10-12 | 2026-10-12 | User-authored tiered long-term memory for DeepSeek Harness: injected as a system-prompt section, with a Chinese panel to view and edit it. The AI never writes to memory on its own. |
| 153 | [QiuShanLing/dsh-paper-fetch](https://github.com/QiuShanLing/dsh-paper-fetch) | 0 | 2026-10-12 | 2026-10-12 | DSH (DeepSeek Harness) plugin that batch-downloads paper PDFs from your institution's subscribed databases (IEEE Xplore / EI) via a dedicated Chrome + CDP session. |
| 154 | [rakutek/dsh-intelligent-ui](https://github.com/rakutek/dsh-intelligent-ui) | 0 | 2026-10-12 | 2026-10-12 | Turn LLM responses into live interactive mini-apps, calculators, and themed Mermaid diagrams inside DeepSeek Harness |
| 155 | [rangercd67/dsh-prompt-polish](https://github.com/rangercd67/dsh-prompt-polish) | 0 | 2026-10-12 | 2026-10-12 | Prompt polishing for the DeepSeek Harness web GUI (dsh 0.2.x desktop runtime): concise rewrites, a built-in configuration page, and a route-leak fix. A derivative of dsh-prompt-enhance. |
| 156 | [sheilacraig/dsh-windows-mcp-lite](https://github.com/sheilacraig/dsh-windows-mcp-lite) | 0 | 2026-10-12 | 2026-10-12 | Config-only DeepSeek Harness bundle that mounts the in-box MCP client bridge against CursorTouch/Windows-MCP: no plugin code, 16 of the 21 upstream tools by default. |
| 157 | [shiliu153/dsh-mcp-manager](https://github.com/shiliu153/dsh-mcp-manager) | 0 | 2026-10-12 | 2026-10-12 | DeepSeek Harness bundle: manage MCP servers — list, probe, add from pasted project references, toggle, remove, rotate credentials. Official dsh-mcp-client contract compliant. |
| 158 | [Shiro-Design-16/dsh-preset-mixed](https://github.com/Shiro-Design-16/dsh-preset-mixed) | 0 | 2026-10-12 | 2026-10-12 | 面向 dsh web 的「混合模式」agent preset 插件：只有宿主半边，无浏览器 UI、无配置项、零依赖、零构建。 |
| 159 | [ShOpenMind/dsh-plugin-mind-tree](https://github.com/ShOpenMind/dsh-plugin-mind-tree) | 0 | 2026-10-11 | 2026-10-12 | DeepSeek Harness session mind-map plugin: branch-point analysis, token accounting, 3-level reduction, Mermaid/Obsidian export and the mind_tree tool. |
| 160 | [SJcun/dsh-right-click-menu](https://github.com/SJcun/dsh-right-click-menu) | 0 | 2026-10-12 | 2026-10-12 | Right-click menu for the DSH (DeepSeek Harness) Web GUI: open a workspace project or file reference in the file manager, and a link in the external browser. ｜ 为 DSH（DeepSeek Harness）Web GUI 补上右键菜单：工作区项目与文件引用在资源管理器中打开，链接在外部浏览器中打开。 |
| 161 | [Smile-Wood/dsh-session-delete](https://github.com/Smile-Wood/dsh-session-delete) | 0 | 2026-10-12 | 2026-10-12 | Add a Delete Session action to the DeepSeek Harness sidebar, removing the Session log and its projection cache. |
| 162 | [SundaeYAGO/dsh-stream-timeout-fix](https://github.com/SundaeYAGO/dsh-stream-timeout-fix) | 0 | 2026-10-12 | 2026-10-12 | Fix the 300s undici bodyTimeout that kills long LLM SSE streams with TypeError: terminated (DeepSeek Harness host plugin) |
| 163 | [sxwer001/dsh-context-control](https://github.com/sxwer001/dsh-context-control) | 0 | 2026-10-12 | 2026-10-12 | DeepSeek Harness context usage ring, configurable character thresholds, manual compaction and recoverable history. Targets DSH 0.2.0-rc.2. |
| 164 | [syzke/dsh-translate-on-select](https://github.com/syzke/dsh-translate-on-select) | 0 | 2026-10-12 | 2026-10-12 | DSH 划词翻译插件：鼠标选中非中文内容后，在选区下方就地浮出简体中文译文 \| Select-to-translate plugin for DeepSeek Harness (DSH) |
| 165 | [tingaidehua/dsh-deploy-nginx](https://github.com/tingaidehua/dsh-deploy-nginx) | 0 | 2026-10-12 | 2026-10-12 | DSH plugin: nginx site base, TLS status, safe reload for ops portal |
| 166 | [tingaidehua/dsh-deploy-web](https://github.com/tingaidehua/dsh-deploy-web) | 0 | 2026-10-12 | 2026-10-12 | DSH plugin: publish /app/&lt;slug&gt;/ and /demo/&lt;slug&gt;/ static or proxy sites |
| 167 | [tingaidehua/dsh-frp](https://github.com/tingaidehua/dsh-frp) | 0 | 2026-10-12 | 2026-10-12 | DEPRECATED: moved to https://github.com/tingaidehua/plugin-frp |
| 168 | [tingaidehua/dsh-manage-server](https://github.com/tingaidehua/dsh-manage-server) | 0 | 2026-10-12 | 2026-10-12 | DSH plugin: server summary, alerts, read-only security baseline |
| 169 | [Tpihis/dsh-session-todos](https://github.com/Tpihis/dsh-session-todos) | 0 | 2026-10-12 | 2026-10-12 | Per-session todo lists for DeepSeek Harness: user-defined columns, completion, batch actions, undo and CSV export, plus agent access through a tool. |
| 170 | [Vensus137/Coreness-DSH](https://github.com/Vensus137/Coreness-DSH) | 0 | 2026-10-11 | 2026-10-12 | The Coreness kit for DeepSeek Harness — a plugin bundle for a profile. |
| 171 | [vi0let-dev/dsh-free-web-search](https://github.com/vi0let-dev/dsh-free-web-search) | 0 | 2026-10-12 | 2026-10-12 | DSH plugin that adds third-party free web search to DeepSeek Harness — Bing, Google, Baidu, Yandex, no API key required. Includes proxy support (HTTP/SOCKS5), a latency test that recommends the best backend, and one-click switching between the plugin and official search. Zero dependencies. |
| 172 | [warmcoding/sonicaura-mcp](https://github.com/warmcoding/sonicaura-mcp) | 0 | 2026-10-11 | 2026-10-12 | Remote MCP server for audio stem separation, denoise, and reverb |
| 173 | [wenh56884-wq/dsh-llm-workbuddy](https://github.com/wenh56884-wq/dsh-llm-workbuddy) | 0 | 2026-10-12 | 2026-10-12 | 腾讯 WorkBuddy 接入 DeepSeek Harness 的 LLM 插件：浏览器 OAuth 登录、无需 API Key。Tencent WorkBuddy LLM provider plugin for DeepSeek Harness (dsh). |
| 174 | [wobenshiwomu/dsh-ration](https://github.com/wobenshiwomu/dsh-ration) | 0 | 2026-10-12 | 2026-10-12 | DeepSeek Harness 插件：配给 —— 自己给自己防沉迷的 token 限额。5 小时滚动窗 + 周，两把闸；越线就不接新活 \| Ration your tokens: self-imposed 5-hour &amp; weekly limits that actually stop you |
| 175 | [wqzhellohhwy/dsh-profile-lab](https://github.com/wqzhellohhwy/dsh-profile-lab) | 0 | 2026-10-11 | 2026-10-12 | DSH 临时 profile 实验台：一键建隔离 profile（模板建 / 从现有 profile 克隆）、装插件、跑 headless 探针会话、读回会话摘要并安全回收——改插件不再怕把本体改暴毙。零第三方依赖。 |
| 176 | [wuuuuu123-32/dsh-session-delete](https://github.com/wuuuuu123-32/dsh-session-delete) | 0 | 2026-10-12 | 2026-10-12 | DSH 会话删除插件：会话列表「⋯」菜单支持删除 / 批量删除会话，删除是移入 Windows 回收站而非永久删除，误删可还原；删除前扫描并列出该会话的产出。 |
| 177 | [xfgil/dsh-hot-reloader](https://github.com/xfgil/dsh-hot-reloader) | 0 | 2026-10-12 | 2026-10-12 | DSH 插件热重载器：改完插件源码即刻生效，无需重启 DeepSeek Harness。补上宿主内置 dsh-hmr 因排除 node_modules 而覆盖不到的第三方插件场景。Hot-reload DSH plugin source without restarting the harness. |
| 178 | [xiao0xueAI/dsh-history-viewer](https://github.com/xiao0xueAI/dsh-history-viewer) | 0 | 2026-10-12 | 2026-10-12 | DSH 会话历史查看器：项目内检索、Markdown 渲染阅读、一键导出对话 · Browse, search and export your DSH session history (offline, zero dependencies) |
| 179 | [xueyingneko/qqbridge-plus](https://github.com/xueyingneko/qqbridge-plus) | 0 | 2026-10-05 | 2026-10-12 | MaimaiDX score lookup plugin for DeepSeek Harness, built on qq-bridge. 水鱼（舞萌DX）查分：#查分 查 B50、出带曲绘的成绩图，OAuth 授权、不限管理员、不依赖桥接。聊天拓展：余额与自动关机、推理档位随计费峰谷切换、节假日表、开机/关机提示词、#功能 开关。 |
| 180 | [XuezuoYS/dsh-prompt-inject](https://github.com/XuezuoYS/dsh-prompt-inject) | 0 | 2026-10-11 | 2026-10-12 | 这是一个适用于 Deepseek Harness 的插件，向用户提供 GUI 下自定义且区分模型的发送 Prompt 注入功能。 |
| 181 | [Yiklek/dsh-slots-manager](https://github.com/Yiklek/dsh-slots-manager) | 0 | 2026-10-12 | 2026-10-12 | DSH web plugin: arrange the list slots other plugins contribute to — show/hide, reorder, rename — without touching upstream. |
| 182 | [ymck-x/dsh-skill-starter](https://github.com/ymck-x/dsh-skill-starter) | 0 | 2026-10-12 | 2026-10-12 | DSH 技能管理器：自带基础技能与中文工程流程技能包，按「你遇到的问题」分组展示，模型可在对话里直接读写；升级技能包不覆盖你改过的文件。 |
| 183 | [YuChenLiao/dsh-plugin-structured-prompt](https://github.com/YuChenLiao/dsh-plugin-structured-prompt) | 0 | 2026-10-11 | 2026-10-12 | dsh结构化提示词插件，通过表单配置的方式结构化生成提示词，提高模型的执行效率 |
| 184 | [yukieiji/dsh-command-permission](https://github.com/yukieiji/dsh-command-permission) | 0 | 2026-10-12 | 2026-10-12 | DSHの承認地獄を回避するためのプラグイン |
| 185 | [zhengqiuyang/dsh-attest-chain](https://github.com/zhengqiuyang/dsh-attest-chain) | 0 | 2026-10-12 | 2026-10-12 | Signed chain-of-custody for DeepSeek Harness sessions — hash-chained, ed25519-signed records of what the agent actually did, commits bound into the chain |
| 186 | [zhengqiuyang/dsh-egress-gate](https://github.com/zhengqiuyang/dsh-egress-gate) | 0 | 2026-10-12 | 2026-10-12 | Deterministic network egress gate for DeepSeek Harness — web fetches checked against a destination allowlist before they run |
| 187 | [zhengqiuyang/dsh-freeze](https://github.com/zhengqiuyang/dsh-freeze) | 0 | 2026-10-12 | 2026-10-12 | Hermetic composition lock for DeepSeek Harness — profile fingerprint; drifted compositions warn or fail (strict) |
| 188 | [zhengqiuyang/dsh-janitor](https://github.com/zhengqiuyang/dsh-janitor) | 0 | 2026-10-12 | 2026-10-12 | Deterministic artifact lifecycle for DeepSeek Harness — scan session debris, return a reviewable cleanup plan; the janitor is never an agent |
| 189 | [zhengqiuyang/dsh-mcp-test](https://github.com/zhengqiuyang/dsh-mcp-test) | 0 | 2026-10-12 | 2026-10-12 | Tool-surface snapshot and drift gate for DeepSeek Harness — every visible tool (incl. MCP) baselined; silent surface changes fail loud |
| 190 | [zhengqiuyang/dsh-pr-gate](https://github.com/zhengqiuyang/dsh-pr-gate) | 0 | 2026-10-12 | 2026-10-12 | Deterministic write gate for DeepSeek Harness — scope policy + residue scan at the moment of the write; the CI gate moved into the session |
| 191 | [zhengqiuyang/dsh-prompt-drift](https://github.com/zhengqiuyang/dsh-prompt-drift) | 0 | 2026-10-12 | 2026-10-12 | System-prompt surface drift gate for DeepSeek Harness — sections any plugin contributes are hashed and baselined; silent rewrites fail loud |
| 192 | [zhengqiuyang/dsh-read-guard](https://github.com/zhengqiuyang/dsh-read-guard) | 0 | 2026-10-12 | 2026-10-12 | Deterministic prompt-injection interception for DeepSeek Harness — scans what the agent READS before it enters model context; credential files quarantined on path alone |
| 193 | [zhengqiuyang/dsh-trust-suite](https://github.com/zhengqiuyang/dsh-trust-suite) | 0 | 2026-10-12 | 2026-10-12 | The deterministic trust chain for DeepSeek Harness: eight plugins + dsh-bench-local — zero LLM in the trust path |
| 194 | [zmr234234-jpg/dsh-deepseek-splash](https://github.com/zmr234234-jpg/dsh-deepseek-splash) | 0 | 2026-10-12 | 2026-10-12 | DeepSeek opening animation for DeepSeek Harness: whale line-draw splash rendered as DSH Desktop launch screen, plus an opt-in full-screen client overlay. |
| 195 | [zws20070309/dsh-copy-session-id](https://github.com/zws20070309/dsh-copy-session-id) | 0 | 2026-10-08 | 2026-10-12 | DSH 插件：会话标题栏加一个「复制会话 ID」按钮，点一下把当前会话 ID 原文放进剪贴板 |
| 196 | [zxc663/shisan-xinuo-dsh-plugin](https://github.com/zxc663/shisan-xinuo-dsh-plugin) | 0 | 2026-10-12 | 2026-10-12 | DSH 工作流插件（开发中）：把工程纪律转化为运行时控制——拦截、门控、证据与规则资源层，白盒可改｜Developer preview, not released. |
| 197 | [zxrobin01/MCP_VB6](https://github.com/zxrobin01/MCP_VB6) | 0 | 2026-10-12 | 2026-10-12 | 一个给AI Agent使用的VB6 MCP工具。 |
| 198 | [zyfgood/dsh-a2a](https://github.com/zyfgood/dsh-a2a) | 0 | 2026-10-12 | 2026-10-12 | DeepSeek Harness A2A (Agent2Agent) plugin: expose DSH agents as standard A2A servers (agent card, message/send, message/stream SSE, tasks) + a2a_* tools to call remote A2A agents |
| 199 | [zyfgood/dsh-web-search-tavily](https://github.com/zyfgood/dsh-web-search-tavily) | 0 | 2026-10-12 | 2026-10-12 | DeepSeek Harness ??:web_search ??? Tavily(? DeepSeek ??,? key ??) |

## 从快照消失的已核准仓库 / Approved repositories missing from the snapshot

已核准但已不在当前快照中（删除或改名），核实后从 [data/approved.json](../approved.json) 移除或更新名称。

Approved but no longer present in the current snapshot (deleted or renamed) — after checking, remove them from [data/approved.json](../approved.json) or update the name.

- ai-tool-labs/dsh-plugin-square
- andiven/dsh-messaging
- BeiWay1145/dsh-download-guard
- BiKing567/dsh-subagent-panel
- emberff/dsh-plugin-origin-split
- FeiZhuLulu/DeepSeek-Bot
- gygygfg/dsh-winstage-sandbox
- IT-coder-Yy/dsh-git-plugin
- Jiong-w-ang/dsh-preview-panel
- JPA957/dsh-web-search-anysearch
- keshing/balance-display
- MrMu666/dsh-LAN
- OMSociety/dsh-kimi-ppt
- TLNing260310/dsh-compaction-fidelity
- WuJiaoJue/dsh-herdr-site
- WuJiaoJue/dsh-later
- WuJiaoJue/dsh-suggest-ghost
- xiaweiliang060035/dsh-opencode-go-usage
- zrt-ai-lab/dsh-desktop
