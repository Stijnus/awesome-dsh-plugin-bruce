# 待审核仓库 / Pending review

> 新增到 `dsh-plugin` Topic 下、带有简介、尚未经维护者核实的仓库。本文件由 `scripts/update.mjs` 每日刷新，仅供审核使用，不是用户可见页面。
>
> Repositories newly added to the `dsh-plugin` topic that the maintainer has not verified yet. Refreshed daily by `scripts/update.mjs`; review-only, not a user-facing page.

- 生成时间 / Generated: **2026-10-20**
- 快照日期 / Snapshot date: **2026-10-20 (UTC)**
- 待审核 / Pending: **429**
- 从快照消失的已核准仓库 / Approved repositories missing from the snapshot: **32**
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

对比上一份快照 **2026-10-19** / vs previous snapshot **2026-10-19**。规则：日增 ≥100★；已核准仓新入 Top 200（且 Δ≥50）/ 名次跃升 ≥50 / 冲入 Top 20；待审仓 ≥100★ 且核准后将进入 Top 200。

- 看 Star 是否与 fork、提交活跃度、仓库年龄匹配（高星零 fork、创建当天几百星，多为刷星）
- 是否把已有高星的通用项目贴上 `dsh-plugin` Topic 蹭榜——插件本身可进目录，但应加入 `leaderboard_exclusions`，理由写清 stars accrued as …
- 待审仓若核准会直接冲进 Top 20 / Top 200，先确认热度来自 **DSH 插件本身**
- 已核准仓的异常跃升：确认后同样可记入 `leaderboard_exclusions`，不必下架目录

Check stars against forks, commit activity and age (hundreds of stars on day one, or high stars with zero forks, usually look bought). A generic high-star project that only just tagged `dsh-plugin` can stay in the catalog but should go to `leaderboard_exclusions` (reason: stars accrued as …). If approving a pending repo would drop it into Top 20 / Top 200, confirm the audience is the DSH plugin itself.

- 告警数 / Alerts: **13**

| Project | Queue | Stars | Δ | Forks | Age | Signals | 审核提示 / Hint |
| --- | --- | ---: | ---: | ---: | ---: | --- | --- |
| ⚠️ [iflytek/skillhub](https://github.com/iflytek/skillhub) | 待审 / pending | 5263 | — | 841 | 222d | 待审高星 | 核准即 Top 2 |
| ⚠️ [Alice-Marx/dsh-model-router](https://github.com/Alice-Marx/dsh-model-router) | 待审 / pending | 198 | — | 10 | 48d | 待审高星 | 核准即榜 #94 |
| ⚠️ [Ebony-Vinyl/dsh-our-free-model](https://github.com/Ebony-Vinyl/dsh-our-free-model) | 已核准 / approved | 30742 | +3155 | 649 | 25d | 日增百星 | 日增 +3155★；已不进榜单 |
| ⚠️ [dataelement/dsh-desktop](https://github.com/dataelement/dsh-desktop) | 已核准 / approved | 15883 | +348 | 534 | 67d | 日增百星 | 日增 +348★；已不进榜单 |
| ⚠️ [PC2005-cloud/dsh-pet](https://github.com/PC2005-cloud/dsh-pet) | 已核准 / approved | 3055 | +283 | 197 | 66d | 日增百星 | 日增 +283★ |
| ⚠️ [dsh-market/dsh-market](https://github.com/dsh-market/dsh-market) | 已核准 / approved | 7741 | +276 | 303 | 66d | 日增百星 | 日增 +276★；已不进榜单 |
| ⚠️ [QingYunA/answer-me-with-html](https://github.com/QingYunA/answer-me-with-html) | 已核准 / approved | 4096 | +210 | 277 | 17d | 日增百星 | 日增 +210★；已不进榜单 |
| ⚠️ [T-Auto/dsh-ops](https://github.com/T-Auto/dsh-ops) | 已核准 / approved | 3470 | +186 | 95 | 11d | 日增百星 | 日增 +186★ |
| ⚠️ [MeteorNOX/DeepSeek-Balance-Whale-Widget](https://github.com/MeteorNOX/DeepSeek-Balance-Whale-Widget) | 已核准 / approved | 5545 | +131 | 186 | 62d | 日增百星 | 日增 +131★；已不进榜单 |
| ⚠️ [sixtysevenlf/dsh-blender-plugin](https://github.com/sixtysevenlf/dsh-blender-plugin) | 已核准 / approved | 920 | +111 | 34 | 36d | 日增百星、冲入 Top 20 | 日增 +111★；冲入 Top 20（23→20） |
| ⚠️ [corrinehu/dsh-workbuddy-connect](https://github.com/corrinehu/dsh-workbuddy-connect) | 已核准 / approved | 1537 | +110 | 159 | 63d | 日增百星 | 日增 +110★ |
| ⚠️ [Clearailhc/clearai-dsh](https://github.com/Clearailhc/clearai-dsh) | 已核准 / approved | 1244 | +105 | 47 | 37d | 日增百星 | 日增 +105★；已不进榜单 |
| ⚠️ [Fei2411/DeepSeek-Bot](https://github.com/Fei2411/DeepSeek-Bot) | 已核准 / approved | 2684 | +101 | 257 | 12d | 日增百星 | 日增 +101★ |


| # | Project | Stars | Created | First seen | Description |
| ---: | --- | ---: | ---: | ---: | --- |
| 1 | [iflytek/skillhub](https://github.com/iflytek/skillhub) ⚠️ | 5263 | 2026-03-11 | 2026-10-20 | Self-hosted, open-source agent skill registry for enterprises. Publish &amp; version skill packages, govern with RBAC and audit logs, deploy   on-premise with Docker or Kubernetes. |
| 2 | [Alice-Marx/dsh-model-router](https://github.com/Alice-Marx/dsh-model-router) ⚠️ | 198 | 2026-09-01 | 2026-10-20 | Model Router and GALGame plugin for DeepSeek Harness |
| 3 | [webkubor/dsh-museav-assets](https://github.com/webkubor/dsh-museav-assets) | 50 | 2026-10-02 | 2026-10-20 | DeepSeek Harness 素材浏览插件：按工作区查看 MUSE AV 素材与出图记录，复制素材直链。DSH asset browser for MUSE AV workspaces, image libraries and generation history. |
| 4 | [BreakFree003/dsh-clinepass-deepseek](https://github.com/BreakFree003/dsh-clinepass-deepseek) | 14 | 2026-09-15 | 2026-10-20 | Cline Pass for DeepSeek Harness (dsh): one pi-ai provider route pinned to the DeepSeek upstream channel, key entered on Settings → Models. Share-only snapshot — 分享性质，非长期维护。 |
| 5 | [KurosawaGeeker/dsh-moe-lite](https://github.com/KurosawaGeeker/dsh-moe-lite) | 12 | 2026-10-20 | 2026-10-20 | 轻量版鲸鱼娘 DSH 皮肤 Lightweight Whale Musume theme for DeepSeek Harness. |
| 6 | [suzike/dsh-freestyle-theme](https://github.com/suzike/dsh-freestyle-theme) | 12 | 2026-08-14 | 2026-10-20 | DeepSeek Harness 主题体验插件：OKLCH 主题提案 + 主题设计器（跨重启持久化） |
| 7 | [ANetResearch/ANet](https://github.com/ANetResearch/ANet) | 11 | 2026-07-16 | 2026-10-20 | Agent interoperability and security, out of the box. The network layer underneath A2A: reachable, end-to-end sealed and payable agents without a server or public IP. MCP for coding agents, a2a-x402 payments, sandboxed execution. |
| 8 | [mytianyi0712/my-dpsk-harness-tui](https://github.com/mytianyi0712/my-dpsk-harness-tui) | 7 | 2026-08-14 | 2026-10-20 | 一个dsh的终端样式插件，灵感来自Oh My Pi |
| 9 | [InariNGT-Ofiicial/dsh-cover-pipeline](https://github.com/InariNGT-Ofiicial/dsh-cover-pipeline) | 5 | 2026-10-14 | 2026-10-20 | 面向 DeepSeek Harness 的本地 AI 翻唱插件：9 个工具串起分离 → 换声 → 移调 → 混音 → 验收，JavaScript 零运行时依赖，重活交给 MSST / DDSP 两套 Python 工程。 |
| 10 | [Tripo-Developer/Tripo3D-Plugin-dsh](https://github.com/Tripo-Developer/Tripo3D-Plugin-dsh) | 5 | 2026-09-07 | 2026-10-20 | Tripo 3D plugin for DeepSeek Harness (dsh): text/image → textured, rig-ready 3D assets via tripo-cli |
| 11 | [kdcadmin/jev-decision-kit](https://github.com/kdcadmin/jev-decision-kit) | 4 | 2026-09-26 | 2026-10-20 | 一个只负责技能，MCP，skill，插件筛选的jev模型，也能管理技能，MCP，skill和插件 |
| 12 | [lumine-423/dsh-session-popout](https://github.com/lumine-423/dsh-session-popout) | 4 | 2026-10-20 | 2026-10-20 | 让你可以从侧边栏拖拽会话，使其成为一个独立窗口，省得来回切换会话的插件！ |
| 13 | [nico-zhuang/dsh-nav-fold](https://github.com/nico-zhuang/dsh-nav-fold) | 4 | 2026-10-19 | 2026-10-20 | 简洁的 DSH 全局导航折叠：流畅动画、即时名称与随手排序。 |
| 14 | [EliteOtaku/dsh-opendesign-go](https://github.com/EliteOtaku/dsh-opendesign-go) | 3 | 2026-10-18 | 2026-10-20 | 为opendesign订阅开发的DSH插件 |
| 15 | [Golden-Pigeon/dsh-remote](https://github.com/Golden-Pigeon/dsh-remote) | 3 | 2026-10-18 | 2026-10-20 | DSH remote-development plugin: SSH hosts, mirrored remote sessions, terminal/file integration, and one-package installation. |
| 16 | [InariNGT-Ofiicial/dsh-train-pipeline](https://github.com/InariNGT-Ofiicial/dsh-train-pipeline) | 3 | 2026-10-18 | 2026-10-20 | DSH local voice datasets, DDSP Reflow training and cover-pipeline voice registration. Yoshino demo checkpoint available in Releases. |
| 17 | [REALOIYO/dsh-plugin-market](https://github.com/REALOIYO/dsh-plugin-market) | 3 | 2026-10-17 | 2026-10-20 | DSH plugin market index (format 1): a self-hosted, auto-refreshed index of installable DeepSeek Harness bundles discovered from npm. |
| 18 | [Adamaik/dsh-progress-rules](https://github.com/Adamaik/dsh-progress-rules) | 2 | 2026-10-20 | 2026-10-20 | DeepSeek Harness bundle plugin: process-discipline system-prompt section + deterministic progress nudge for silent tool steps |
| 19 | [CC19990113/dsh-plugin-agentflow](https://github.com/CC19990113/dsh-plugin-agentflow) | 2 | 2026-10-20 | 2026-10-20 | Visual agent-orchestration canvas for DeepSeek Harness (dsh): compose LLM/MCP nodes into a DAG, run it from chat, and export the board as a DSH preset. Ships its own engine — install and run. |
| 20 | [cfanzx/dsh-compact-relay](https://github.com/cfanzx/dsh-compact-relay) | 2 | 2026-10-20 | 2026-10-20 | DeepSeek Harness 输入框上下文状态指示与管理插件：实时显示容量占用，支持压缩前预览确认、九段式会话交接与关键消息锁定。 · Context indicator plugin for DSH: occupancy monitoring, preview-then-confirm compaction, 9-section handoff, and message pinning. |
| 21 | [ChisaAlter/dsh-pad](https://github.com/ChisaAlter/dsh-pad) | 2 | 2026-10-20 | 2026-10-20 | DSH（DeepSeek Harness）右侧悬浮面板坞插件：AI 在对话里生成面板，可平铺组合；支持本机/HTTP 数据源、AI 刷新、面板内 dsh.run 模型调用。 |
| 22 | [kuroshio4396/dafayu-pixiv-duty](https://github.com/kuroshio4396/dafayu-pixiv-duty) | 2 | 2026-10-20 | 2026-10-20 | 大肥鱼自动刷Pixiv｜DSH 插件：按你的口味刷 Pixiv，把插画 / 漫画 / 中文小说挑出来存到本地；标签先筛、再读图读正文确认 |
| 23 | [Seren-715/dsh-remote-groups](https://github.com/Seren-715/dsh-remote-groups) | 2 | 2026-10-20 | 2026-10-20 | Android remote access and multi-agent group chats for DSH, based on ds-harness-remote and DeepSeek-Bot |
| 24 | [summersummer-liu/dsh-swiss-grid](https://github.com/summersummer-liu/dsh-swiss-grid) | 2 | 2026-10-20 | 2026-10-20 | Swiss grid design plugin for DeepSeek Harness — compute 版心, columns, baseline and type scale, then build print-ready SVG-to-PDF posters with a grid-overlay proof. |
| 25 | [willimqiao/dsh-plugin-pixel-fishing](https://github.com/willimqiao/dsh-plugin-pixel-fishing) | 2 | 2026-10-20 | 2026-10-20 | 把「像素渔场」装成一个 DSH 插件：Harness 启动时自动拉起一只透明、无边框、总在最前的像素钓鱼宠物， 像 QQ 宠物一样浮在桌面上，挂机钓鱼、随时展开面板。 |
| 26 | [ai-v5/LLMAgentChatRoom](https://github.com/ai-v5/LLMAgentChatRoom) | 1 | 2026-10-20 | 2026-10-20 | Local multi-agent chat room |
| 27 | [Alice-Marx/dsh-mv-cli](https://github.com/Alice-Marx/dsh-mv-cli) | 1 | 2026-10-03 | 2026-10-20 | DeepSeek Harness plugin: terminal-style world.execute(me); MV (canvas port of world.execute-me-ascii, with permission) + embedded MV terminal. Unofficial fan work; no media bundled. |
| 28 | [AnbaoIy/DSH-Enhance](https://github.com/AnbaoIy/DSH-Enhance) | 1 | 2026-10-11 | 2026-10-20 | DSH-Enhance — DSH 插件：对话删除、工作区迁移、搜索/抓取多平台优先-候补替换 |
| 29 | [AndroidSix/dsh-computer-use-ng](https://github.com/AndroidSix/dsh-computer-use-ng) | 1 | 2026-10-17 | 2026-10-20 | Community-maintained dsh-computer-use: virtual-cursor Computer Use for DeepSeek Harness, compatible with DSH 0.2.1 |
| 30 | [AndroidSix/dsh-session-toolbox](https://github.com/AndroidSix/dsh-session-toolbox) | 1 | 2026-10-17 | 2026-10-20 | DeepSeek Harness 会话工具箱：图片草稿保险箱、项目分组与会话迁移、归档池、文件检查点恢复、多引用回复、后续任务联想。第三方插件，数据只存本机。 |
| 31 | [Apple-TWININGS/DEEPSEEK-HARNESS-Boot-Animation-Male-Version](https://github.com/Apple-TWININGS/DEEPSEEK-HARNESS-Boot-Animation-Male-Version) | 1 | 2026-10-20 | 2026-10-20 | DeepSeek Harness Web 插件：8.6 秒蓝调开机动画（可跳过）+ 三张同主题壁纸，设置页可切换、可调遮罩。 |
| 32 | [aski0006/dsh-git-graph-panel](https://github.com/aski0006/dsh-git-graph-panel) | 1 | 2026-10-20 | 2026-10-20 | Git Graph tab for the DSH Web right sidebar: repository detection plus a hand-drawn commit graph |
| 33 | [AsterLuo/dsh-powerbox](https://github.com/AsterLuo/dsh-powerbox) | 1 | 2026-10-19 | 2026-10-20 | DeepSeek Harness Web 界面的电源按钮：在对话标题中点击一个小对话框，提示“重启 DSH 或退出 DSH”——每个对话框都会再次确认，之后才会进行任何操作。 |
| 34 | [basaltfold/dsh-channel-credits](https://github.com/basaltfold/dsh-channel-credits) | 1 | 2026-10-20 | 2026-10-20 | 在 DSH 输入框统计栏常驻显示渠道积分余额，并按账号归因每轮对话的积分消耗 |
| 35 | [Big-Smarty/dsh-ultracode](https://github.com/Big-Smarty/dsh-ultracode) | 1 | 2026-10-20 | 2026-10-20 | Ultracode mode for DeepSeek Harness — dynamic workflows, a composer switch, and a live workflow sidebar. |
| 36 | [chaolee111/dsh-chatgpt-price](https://github.com/chaolee111/dsh-chatgpt-price) | 1 | 2026-10-20 | 2026-10-20 | DeepSeek Harness plugin: ChatGPT subscription prices by country (Go/Plus/Pro), refreshed daily from each App Store, with USD and CNY conversion. |
| 37 | [Chr1sut1na/dsh-qqbot-guard](https://github.com/Chr1sut1na/dsh-qqbot-guard) | 1 | 2026-10-20 | 2026-10-20 | 给 dsh 的 QQ 机器人加边界：工具收窄到 2 个、被问本机或机制时用角色口吻回避；附可编辑规则文本与"只在被叫到才接话"补丁。策略层，非沙箱。dsh plugin: whitelist a QQ bot's tools and keep it in character when asked about local files or its internals. |
| 38 | [david-zdw/dsh-image-studio](https://github.com/david-zdw/dsh-image-studio) | 1 | 2026-10-20 | 2026-10-20 | 生图工作台 — DeepSeek Harness 侧边栏生图插件：Agnes / GPT Image / Grok / OpenAI 兼容，每个服务商独立 Key，支持 /image 简写。 |
| 39 | [Dcmwfg/dsh-deepseek-sidebar](https://github.com/Dcmwfg/dsh-deepseek-sidebar) | 1 | 2026-10-20 | 2026-10-20 | DeepSeek web chat inside the DeepSeek Harness sidebar: one row opens it in the right pane, fullscreen on demand, login survives restarts. |
| 40 | [ddtcorex/dsh-maestro-review](https://github.com/ddtcorex/dsh-maestro-review) | 1 | 2026-10-19 | 2026-10-20 | Maestro Review for the DeepSeek Harness web host: GitLab webhook intake, project mappings with local worktrees, the Settings section and Telegram digests, on the maestro-reviewer engine |
| 41 | [dougen/dsh-cdp](https://github.com/dougen/dsh-cdp) | 1 | 2026-09-24 | 2026-10-20 | 让 DSH 通过 CDP 驱动本机已开启调试的 Chromium 内核浏览器：常驻连接只授权一次，零新增工具 schema，零运行时依赖。 |
| 42 | [dyh886/dsh-llm-net-router](https://github.com/dyh886/dsh-llm-net-router) | 1 | 2026-10-20 | 2026-10-20 | Per-provider egress routing and client-fingerprint control for DeepSeek Harness: per-host proxy/direct routing plus client header rewrite at the fetch boundary. |
| 43 | [gordan-code/dsh-search-ledger](https://github.com/gordan-code/dsh-search-ledger) | 1 | 2026-10-20 | 2026-10-20 | Route DSH web search and fetch requests across providers, manage API keys and failover, and track usage and estimated costs in a local ledger. |
| 44 | [gulagala001/dsh-deepseek-workbench](https://github.com/gulagala001/dsh-deepseek-workbench) | 1 | 2026-10-20 | 2026-10-20 | DeepSeek 网页聊天、临时侧栏聊天、API 开放平台与 DSH 会话迁移。 |
| 45 | [gulagala001/dsh-theme-plugin](https://github.com/gulagala001/dsh-theme-plugin) | 1 | 2026-10-20 | 2026-10-20 | DSH 主题与外观管理：图片市场、一键兼容安装、故障恢复和 AI 修复说明。Visual theme markets and checked installation for DeepSeek Harness. |
| 46 | [gulagala001/dsh-workflow](https://github.com/gulagala001/dsh-workflow) | 1 | 2026-10-20 | 2026-10-20 | Resumable JavaScript workflows with native DSH subagents, jobs, token budgets and worktree isolation. |
| 47 | [gzyy111/dsh-we-whalegirl](https://github.com/gzyy111/dsh-we-whalegirl) | 1 | 2026-10-20 | 2026-10-20 | DSH 插件：自建微信/QQ「鲸鱼娘」机器人的控制面 —— 启停 Python 侧车、逐个开关功能、改人设、调回复频率，并可用 whalegirl_* 工具在对话里指挥她 |
| 48 | [HERO476/dsh-doubao-work-connect](https://github.com/HERO476/dsh-doubao-work-connect) | 1 | 2026-10-19 | 2026-10-20 | 把本机已登录的豆包工作（DoubaoWork）客户端接入 DeepSeek Harness：通过客户端 DevTools 端点复用登录态调用 /chat/completion，并在输入框显示 5 小时 / 7 天额度。 |
| 49 | [hunbujiu/dsh-global-persona](https://github.com/hunbujiu/dsh-global-persona) | 1 | 2026-10-20 | 2026-10-20 | DeepSeek Harness plugin: a Settings section to view and edit the user-global AGENTS.md |
| 50 | [Justin-Mai/dsh-role-prompts](https://github.com/Justin-Mai/dsh-role-prompts) | 1 | 2026-10-20 | 2026-10-20 | DSH 插件：把岗位角色指令固定注入整个对话，避免 AI 跑偏 |
| 51 | [king-shao/dsh-turn-notifier](https://github.com/king-shao/dsh-turn-notifier) | 1 | 2026-10-20 | 2026-10-20 | DeepSeek Harness 插件：每轮对话完成时弹出通知，标题为会话名、正文为回答摘要 |
| 52 | [kirako1/dsh-bili-live](https://github.com/kirako1/dsh-bili-live) | 1 | 2026-10-18 | 2026-10-20 | B站直播助手（DD版）：自动巡场看直播、听声音看画面、写直播笔记、给主播打分 |
| 53 | [Kirin-9000/dsh-plugin-backup](https://github.com/Kirin-9000/dsh-plugin-backup) | 1 | 2026-10-20 | 2026-10-20 | 插件备份与恢复 |
| 54 | [loeiy/dsh-resume-studio](https://github.com/loeiy/dsh-resume-studio) | 1 | 2026-10-20 | 2026-10-20 | 简历工坊 · Resume workshop for DeepSeek Harness：JSON → HTML / Word / PDF，三套版式、自动压页、写作体检。MIT |
| 55 | [Luca4Don3/dsh-web-search](https://github.com/Luca4Don3/dsh-web-search) | 1 | 2026-10-11 | 2026-10-20 | DSH 独立聚合搜索提供方：匿名优先、费用授权、额度预检与有界取消 |
| 56 | [LYL-Z/dsh-armorbreak](https://github.com/LYL-Z/dsh-armorbreak) | 1 | 2026-10-20 | 2026-10-20 | DeepSeek Harness ArmorBreak (破甲模式): authorized reverse-engineering &amp; security-research agent preset. 39 offline capabilities, L0–L3 policy engine, evidence-chain reports. MIT. |
| 57 | [makima-coder/DeepSeekBubbleChat](https://github.com/makima-coder/DeepSeekBubbleChat) | 1 | 2026-10-20 | 2026-10-20 | deepseekharness自制插件，分支对话：选中对话中的文本创建锚点标签，在独立面板中围绕该文本提问。支持deepseek harness |
| 58 | [maomitgd2006/DSH_CG](https://github.com/maomitgd2006/DSH_CG) | 1 | 2026-10-20 | 2026-10-20 | CalibGuard 文件安全审计的 DeepSeek Harness 插件：本地校准 CodeBERT 门控 + 云端复核，以 agent 工具与侧边栏面板两种形态使用 |
| 59 | [MarOrZou/qwen-video-skill](https://github.com/MarOrZou/qwen-video-skill) | 1 | 2026-08-24 | 2026-10-20 | Enabling models without video understanding capabilities to gain video comprehension |
| 60 | [mengge237/dsh-model-priority](https://github.com/mengge237/dsh-model-priority) | 1 | 2026-09-20 | 2026-10-20 | DSH 模型列表排序：侧边栏拖拽调整模型与提供方的顺序，宿主的模型选择器按这份顺序返回，写配置前自动备份 ｜ Model and provider ordering for DSH: drag to reorder in the sidebar, the host returns models in that order, and settings are backed up before every write |
| 61 | [Mizumic/driftmon](https://github.com/Mizumic/driftmon) | 1 | 2026-10-19 | 2026-10-20 | 后端漂移主动监测：冻结探针组 / 五通道签名 / 行为模板 / 灰度告警（纯 Node，零运行时依赖） |
| 62 | [Mizumic/dsh-system-fingerprint](https://github.com/Mizumic/dsh-system-fingerprint) | 1 | 2026-10-19 | 2026-10-20 | 会话头部的模型检查点徽标：探测 system_fingerprint / 网关请求级溯源 / 响应元数据存证（原始字节默认不落盘） |
| 63 | [MountBatten718/dsh-session-handoff](https://github.com/MountBatten718/dsh-session-handoff) | 1 | 2026-10-20 | 2026-10-20 | DSH 会话接力插件 · 长会话到点先问你一句，把需求/进度/下一步写成交接文档，开个干净新会话接着干（手动 /handoff 或自动触发）。 Session handoff for DeepSeek Harness. |
| 64 | [Mrsong123456/dsh-collapse-paste](https://github.com/Mrsong123456/dsh-collapse-paste) | 1 | 2026-10-20 | 2026-10-20 | DSH 插件：把输入框多行粘贴和已发送长消息折叠成紧凑内联标签，发送内容保持原文。 |
| 65 | [msyrain/ui-dsh-updater](https://github.com/msyrain/ui-dsh-updater) | 1 | 2026-10-20 | 2026-10-20 | 在 DSH Web GUI 左侧边栏「设置」上方提供版本检测与一键升级入口：源码 checkout 比较 git tag/commit 与 GitHub，桌面打包版比较应用清单版本与桌面应用的发布通道；版本事实不全时只报「无法判断」，绝不谎报有更新。 |
| 66 | [panando/dsh-codex-harness](https://github.com/panando/dsh-codex-harness) | 1 | 2026-10-19 | 2026-10-20 | DSH 的 Codex 模式预设：先规划后动手的编码智能体，自带终端、整仓检索、后台任务与上下文压缩。 |
| 67 | [REALOIYO/dsh-settings-button](https://github.com/REALOIYO/dsh-settings-button) | 1 | 2026-10-20 | 2026-10-20 | Gear button for DeepSeek Harness that opens the Settings dialog in one click — works on desktop and from a phone over the LAN. |
| 68 | [RGarrido03/dsh-telegram-notify](https://github.com/RGarrido03/dsh-telegram-notify) | 1 | 2026-10-20 | 2026-10-20 | One-way Telegram notifications for DeepSeek Harness, with a Settings page for the bot token, chat id and event toggles. |
| 69 | [Ronnie-Young/dsh-scnet-plan](https://github.com/Ronnie-Young/dsh-scnet-plan) | 1 | 2026-10-20 | 2026-10-20 | DeepSeek Harness 插件：查看 SCNet Token Plan 额度、每日消耗与 token 构成 |
| 70 | [SepTem61r/dsh-aliyun-ecs-connect](https://github.com/SepTem61r/dsh-aliyun-ecs-connect) | 1 | 2026-10-20 | 2026-10-20 | One command starts your Aliyun ECS, finds its current public IP, and opens an SSH terminal — no console login, no copy-paste. Built for students who only power the server up when they need it. A DeepSeek Harness plugin. ｜ 给“用时才开”的学生党：一句话开机并自动连上。 |
| 71 | [TonyWu2333/dsh-mercury-diffusion](https://github.com/TonyWu2333/dsh-mercury-diffusion) | 1 | 2026-10-20 | 2026-10-20 | DeepSeek Harness (dsh) plugin for Inception Mercury: renders the diffusion denoising stream live inside the answer bubble |
| 72 | [wangqingdhuo/dsh-opencode-acp](https://github.com/wangqingdhuo/dsh-opencode-acp) | 1 | 2026-10-20 | 2026-10-20 | Run opencode as an ACP subagent in DeepSeek Harness — delegation tool, settings page, run history. |
| 73 | [wavachao/dsh-citeweave](https://github.com/wavachao/dsh-citeweave) | 1 | 2026-10-20 | 2026-10-20 | Web evidence and sourced images for DeepSeek Harness, with a self-hosted retrieval backend. |
| 74 | [wodebilu/dsh-session-editor](https://github.com/wodebilu/dsh-session-editor) | 1 | 2026-10-19 | 2026-10-20 | Unofficial plugin for DeepSeek Harness (DSH): permanently delete sessions, regenerate or edit a turn, and edit your own messages. |
| 75 | [XHToken/dsh-intelligent-router](https://github.com/XHToken/dsh-intelligent-router) | 1 | 2026-10-16 | 2026-10-20 | Intelligent LLM routing plugin for DeepSeek Harness: route groups, 4 routing strategies, intent rule engine, cache-affinity Stays mode, auto failover and sample settings UI. |
| 76 | [xiaoyi728/dsh-rule-proxy](https://github.com/xiaoyi728/dsh-rule-proxy) | 1 | 2026-10-09 | 2026-10-20 | Hostname-rule transport for DSH web tools, falling back to a direct connection when the upstream is unreachable. |
| 77 | [Xyvanlabs/dsh-prompt-enhancer](https://github.com/Xyvanlabs/dsh-prompt-enhancer) | 1 | 2026-10-20 | 2026-10-20 | DeepSeek Harness 插件：输入框右下角的提示词增强按钮，一键把草稿改写成更清晰、更具体的提示词，支持取消与还原。 |
| 78 | [yupaoa/dsh-image-lite](https://github.com/yupaoa/dsh-image-lite) | 1 | 2026-10-20 | 2026-10-20 | DSH 生图插件：双模式生图——对话模型调用 image_generate_lite 工具，或在侧边栏「生图工作台」手动出图。 |
| 79 | [yxsj245/dsh-OB-agent](https://github.com/yxsj245/dsh-OB-agent) | 1 | 2026-09-23 | 2026-10-20 | DSH优化子代里：一款由于管理子代里运行流程的插件，可以让主代理根据设置选择性调用适合的子代里 |
| 80 | [yxue301603/dsh-quick-prompts](https://github.com/yxue301603/dsh-quick-prompts) | 1 | 2026-10-20 | 2026-10-20 | DeepSeek Harness 原生常用指令快捷面板 · Pinned prompts, project scopes, search and safe draft insertion. |
| 81 | [ZengZichao/dsh-seq-viewer](https://github.com/ZengZichao/dsh-seq-viewer) | 1 | 2026-10-20 | 2026-10-20 | DeepSeek Harness plugin: view FASTA, CLUSTAL, PHYLIP and Stockholm alignments in the right sidebar with ReSeqt. |
| 82 | [zhiciyishuyicheng-dev/dsh-deepseek-cny-cost](https://github.com/zhiciyishuyicheng-dev/dsh-deepseek-cny-cost) | 1 | 2026-10-20 | 2026-10-20 | DeepSeek Harness plugin: a live CNY cost estimate for the chat you are reading, priced with DeepSeek's peak / off-peak rates. |
| 83 | [zhifeiNi/dsh-usage-orb](https://github.com/zhifeiNi/dsh-usage-orb) | 1 | 2026-10-17 | 2026-10-20 | DSH 用量光球：右下角常驻圆环 + 可拖动的跨会话用量面板（token/缓存命中率/成本/余额/工具归因，支持 iOS 式磁贴 DIY 与 bloub 机器人）。DeepSeek Harness 插件，MIT。 |
| 84 | [0disoft/dsh-ci-diet](https://github.com/0disoft/dsh-ci-diet) | 0 | 2026-10-20 | 2026-10-20 | Find wasted GitHub Actions runner time and propose small, reviewable YAML patches. |
| 85 | [0xnirlin/dsh-plugin-ziztu](https://github.com/0xnirlin/dsh-plugin-ziztu) | 0 | 2026-10-20 | 2026-10-20 | Ziztu for DeepSeek Harness: plan, write and make micro dramas and anime episodes from your agent, through Ziztu's MCP server. |
| 86 | [1186258278/dsh-zh-ui](https://github.com/1186258278/dsh-zh-ui) | 0 | 2026-10-20 | 2026-10-20 | 中文前端界面设计规范 DSH 插件：zh-ui-design skill + UI lint / Chinese UI design spec plugin for DeepSeek Harness |
| 87 | [123WE-glitch/dsh-theme-skins](https://github.com/123WE-glitch/dsh-theme-skins) | 0 | 2026-10-20 | 2026-10-20 | Four curated color skins (Aurora, Night Flight, Nordfjord, Sakura) for the DeepSeek Harness Web UI, with light/dark palettes and a settings picker. |
| 88 | [1373700184/dsh-subagent](https://github.com/1373700184/dsh-subagent) | 0 | 2026-10-19 | 2026-10-20 | Use Qoder/QoderCN subscription CLIs as DeepSeek Harness subagents |
| 89 | [16601134718/dsh-codex-cua](https://github.com/16601134718/dsh-codex-cua) | 0 | 2026-10-20 | 2026-10-20 | Drive the Codex computer-use runtime (cua-repl) from an external agent on macOS |
| 90 | [2DHardty/dsh-renpy-skin](https://github.com/2DHardty/dsh-renpy-skin) | 0 | 2026-10-20 | 2026-10-20 | WIP — Ren'Py skin, sprite stage, palette and VN loader for DSH |
| 91 | [3493750852/dsh-windows-notify](https://github.com/3493750852/dsh-windows-notify) | 0 | 2026-10-20 | 2026-10-20 | Windows 桌面通知：需要你确认时、你作出回答后、任务结束时各弹一条系统通知（DSH 插件） |
| 92 | [528085390/dsh-windows-notify](https://github.com/528085390/dsh-windows-notify) | 0 | 2026-10-20 | 2026-10-20 | DSH 插件｜每个回合结束弹一条 Windows 原生通知，开关在设置页 · Native Windows toasts for DeepSeek Harness, with a switch in Settings |
| 93 | [9426Haruka/dsh-markdown-live](https://github.com/9426Haruka/dsh-markdown-live) | 0 | 2026-10-20 | 2026-10-20 | DSH 桌面端插件：输入框实时 Markdown 渲染 + 用户消息 Markdown 渲染 |
| 94 | [A-Meng-E/dsh-two-pane-sidebar](https://github.com/A-Meng-E/dsh-two-pane-sidebar) | 0 | 2026-10-20 | 2026-10-20 | A persistent plugin rail for DeepSeek Harness: plugin navigation gets its own slim column, leaving the sidebar to sessions and workspaces. |
| 95 | [Aceared0829/dsh-kit](https://github.com/Aceared0829/dsh-kit) | 0 | 2026-10-19 | 2026-10-20 | DeepSeek Harness plugin kit: own plugins, version pins, and a repeatable installer |
| 96 | [ACGsu/dsh-sidebar-panel-fold](https://github.com/ACGsu/dsh-sidebar-panel-fold) | 0 | 2026-10-20 | 2026-10-20 | Fold the DeepSeek Harness sidebar's global panel list into a single row, with a popover to switch panels. |
| 97 | [adamcjm/dsh-workspace-visibility](https://github.com/adamcjm/dsh-workspace-visibility) | 0 | 2026-10-20 | 2026-10-20 | Hide selected workspaces — and the sessions they own — from the DSH sidebar, with a Show hidden workspaces switch in the view options. Display-only: no data is modified. |
| 98 | [adcx222/dsh-enhance-prompt](https://github.com/adcx222/dsh-enhance-prompt) | 0 | 2026-10-20 | 2026-10-20 | DSH 输入框提示词增强插件：点一下 ✨ 把草稿改写成更清晰、更具体的指令 |
| 99 | [ADkun/dsh-anysearch-key-mgm](https://github.com/ADkun/dsh-anysearch-key-mgm) | 0 | 2026-10-20 | 2026-10-20 | DSH 设置里多一页「AnySearch KEY」：登记多个 AnySearch API KEY（带备注），点一下就把 anysearch 插件切到那个 KEY —— 写 credentials 的 ANYSEARCH_API_KEY，逐次解析，切换立即生效、无需重启 dsh。 |
| 100 | [Afgkwyp/dsh-session-recycle-bin](https://github.com/Afgkwyp/dsh-session-recycle-bin) | 0 | 2026-10-20 | 2026-10-20 | DeepSeek Harness 会话回收站插件：头部垃圾桶按钮与侧栏「删除会话」先归档、可还原；设置页集中管理归档会话，可真正删除磁盘日志并支持批量清理。Session recycle bin for DSH. |
| 101 | [AIcivilization/dsh-audiobook](https://github.com/AIcivilization/dsh-audiobook) | 0 | 2026-10-20 | 2026-10-20 | Turn any book into an audiobook inside DeepSeek Harness (dsh) · 搜书听：导入一本书，在 DSH 里读给你听 |
| 102 | [AK-blank/dsh-codex-bridge](https://github.com/AK-blank/dsh-codex-bridge) | 0 | 2026-10-20 | 2026-10-20 | Unofficial DSH bundle: quota-aware Codex CLI delegation. Reads the 5-hour and weekly ChatGPT-plan windows, defaults to gpt-6.1-sol/high, falls back to gpt-5.6-sol at 10% left, and requires an explicit opt-in for gpt-6-astra. |
| 103 | [Akiccat/dsh-edit-question](https://github.com/Akiccat/dsh-edit-question) | 0 | 2026-10-20 | 2026-10-20 | Edit a sent question and resend it in DeepSeek Harness: images are re-attached (paste more too), the conversation restarts from that turn, and the original session can be kept or archived. |
| 104 | [Alan-dong-dong/dsh-knowledge-library](https://github.com/Alan-dong-dong/dsh-knowledge-library) | 0 | 2026-10-20 | 2026-10-20 | 拾页：DeepSeek Harness 本地资料库插件，采集网页、文本与字幕，分类检索并供 Agent 引用分析。 |
| 105 | [albert404s/dsh-plugin-health-monitor](https://github.com/albert404s/dsh-plugin-health-monitor) | 0 | 2026-10-20 | 2026-10-20 | DSH Plugin Health Monitor — 基于真实 GitHub、npm 与 OSV 数据的 DeepSeek Harness 插件生命体征分析站 |
| 106 | [Alice-Marx/dsh-boot-animation](https://github.com/Alice-Marx/dsh-boot-animation) | 0 | 2026-10-13 | 2026-10-20 | DSH plugin: replaces the kernel boot page with a full-window video clip, then dissolves into the app. 中文说明见 MANUAL.md |
| 107 | [Alice-Marx/dsh-folding-Windows](https://github.com/Alice-Marx/dsh-folding-Windows) | 0 | 2026-10-17 | 2026-10-20 | DSH plugin to collapse the sidebar tools area and remember its state. |
| 108 | [ALittleLov/dsh-soundcheck](https://github.com/ALittleLov/dsh-soundcheck) | 0 | 2026-10-20 | 2026-10-20 | 让文本模型读懂一首歌：本地音乐分析插件，把音频拆成能量、速度、调性、密度，音频不出本机。 |
| 109 | [Amanda97639/dsh-lowtide](https://github.com/Amanda97639/dsh-lowtide) | 0 | 2026-10-20 | 2026-10-20 | Time-shifting task delegation for DeepSeek Harness (dsh): plan tasks at leisure, they run unattended off-peak, come back to a report. Human-adjudicated, desktop + web. |
| 110 | [ancircle0/dsh-archive-ext](https://github.com/ancircle0/dsh-archive-ext) | 0 | 2026-10-20 | 2026-10-20 | DeepSeek Harness 归档管理插件 |
| 111 | [Anixuil/dsh-quota-board](https://github.com/Anixuil/dsh-quota-board) | 0 | 2026-10-20 | 2026-10-20 | dsh desktop quota-board |
| 112 | [antonbru/dsh-tilda-accounts](https://github.com/antonbru/dsh-tilda-accounts) | 0 | 2026-10-20 | 2026-10-20 | Tilda MCP accounts for DeepSeek Harness: add, remove and switch client accounts from Settings, a composer chip, or /tilda. |
| 113 | [AntonyLang/dsh-roam-planner](https://github.com/AntonyLang/dsh-roam-planner) | 0 | 2026-10-20 | 2026-10-20 | Trip planning workspace for DeepSeek Harness: map panel, itinerary store, roam_* tools and MCP sidecars. |
| 114 | [apodemakeles/dsh-macos-notify](https://github.com/apodemakeles/dsh-macos-notify) | 0 | 2026-10-20 | 2026-10-20 | DeepSeek Harness (DSH) plugin: macOS turn-completion notifications and an unfocused-completion unread dot. |
| 115 | [Assidefok/dsh-opencodego-status](https://github.com/Assidefok/dsh-opencodego-status) | 0 | 2026-10-19 | 2026-10-20 | DeepSeek Harness overlay showing OpenCode Go 5-hour, weekly and monthly usage. |
| 116 | [Asza-other/dsh-narrator](https://github.com/Asza-other/dsh-narrator) | 0 | 2026-10-20 | 2026-10-20 | DeepSeek Harness 插件：模型长时间只思考不出声时，注入提示词让它自己用正文说清在做什么、做到哪了，任务不中断；对话正文左下角浮窗同步显示这段原文。带分钟级图形设置卡，零运行时依赖。 |
| 117 | [averyjohnkucan-arch/dsh-media-tools](https://github.com/averyjohnkucan-arch/dsh-media-tools) | 0 | 2026-10-20 | 2026-10-20 | Portable audio and native temporal video plugins, agent skills, CLI and MCP server for DeepSeek Harness. |
| 118 | [averyjohnkucan-arch/dsh-ninfer](https://github.com/averyjohnkucan-arch/dsh-ninfer) | 0 | 2026-10-20 | 2026-10-20 | NInfer local inference provider and model manager for DeepSeek Harness |
| 119 | [averyjohnkucan-arch/dsh-strata](https://github.com/averyjohnkucan-arch/dsh-strata) | 0 | 2026-10-20 | 2026-10-20 | Strata local inference provider and model manager for DeepSeek Harness |
| 120 | [bachkoo102/rapid-mlx-dsh-provider](https://github.com/bachkoo102/rapid-mlx-dsh-provider) | 0 | 2026-10-19 | 2026-10-20 | Native Rapid-MLX provider for DeepSeek Harness (dsh) — dsh reads model facts from the server instead of your settings.yaml. |
| 121 | [baggiponte/dsh-session-nav](https://github.com/baggiponte/dsh-session-nav) | 0 | 2026-10-19 | 2026-10-20 | Previous/next session navigation for the DeepSeek Harness UI |
| 122 | [barbarab82253/opencode2dsh](https://github.com/barbarab82253/opencode2dsh) | 0 | 2026-10-19 | 2026-10-20 | DSH plugin — free OpenCode Zen models for DeepSeek Harness (DSH). Free LLM API, no API key needed. 在 DSH 中使用 OpenCode Zen 免费模型，无需 API key |
| 123 | [beatricef90/dsh-noema](https://github.com/beatricef90/dsh-noema) | 0 | 2026-10-19 | 2026-10-20 | Noema long-term memory plugin for DSH: durable, inspectable agent memory with recall tools and a settings page. |
| 124 | [Big-Smarty/dsh-btw-sidechat](https://github.com/Big-Smarty/dsh-btw-sidechat) | 0 | 2026-10-20 | 2026-10-20 | BTW side chat for DeepSeek Harness: a read-only fork of the current conversation, answered in a Codex-style right-sidebar window. |
| 125 | [BigFier/dsh-cnki-helper](https://github.com/BigFier/dsh-cnki-helper) | 0 | 2026-10-20 | 2026-10-20 | 在 DSH 会话里检索知网并下载 PDF。复用内置浏览器的登录态，实测零验证码。 |
| 126 | [bigmalove/dsh-tavern-rewrite](https://github.com/bigmalove/dsh-tavern-rewrite) | 0 | 2026-10-20 | 2026-10-20 | revnovel润色：DSH Tavern 正文润色插件 |
| 127 | [blkpne/dsh-database](https://github.com/blkpne/dsh-database) | 0 | 2026-09-20 | 2026-10-20 | DeepSeek Harness 数据库插件：通过 Web 管理连接，让 Agent 按授权执行只读查询，支持 MySQL、MariaDB、PostgreSQL、SQL Server、Oracle 和 MongoDB。 |
| 128 | [Boris-boomer/dsh-icon-grid](https://github.com/Boris-boomer/dsh-icon-grid) | 0 | 2026-10-20 | 2026-10-20 | Scene-independent icon grid container for DSH plugins |
| 129 | [Boris-boomer/dsh-token-optima](https://github.com/Boris-boomer/dsh-token-optima) | 0 | 2026-10-20 | 2026-10-20 | Token attribution &amp; cache ROI diagnostics for DSH |
| 130 | [BugDesigner-Hy/dsh-whale-balance](https://github.com/BugDesigner-Hy/dsh-whale-balance) | 0 | 2026-10-20 | 2026-10-20 | 余额水杯 · Whale Balance｜DSH 插件：把 DeepSeek 账户余额显示成鲸鱼标志里上涨的水面｜DSH plugin: your account balance as water rising inside the whale mark, with spend stats, alerts and top-up. |
| 131 | [caparisen/dsh-github-accelerator](https://github.com/caparisen/dsh-github-accelerator) | 0 | 2026-10-20 | 2026-10-20 | DeepSeek Harness (dsh) web-fetch provider for hosts-file accelerators: keeps web_fetch working when GitHub resolves to a local reverse proxy |
| 132 | [caparisen/dsh-plugin-dev](https://github.com/caparisen/dsh-plugin-dev) | 0 | 2026-10-20 | 2026-10-20 | Development kit for DeepSeek Harness plugins: compose a profile, boot a throwaway shadow, verify the host half, capture the client half, roll back a broken profile |
| 133 | [carl57859/opencode2dsh](https://github.com/carl57859/opencode2dsh) | 0 | 2026-10-20 | 2026-10-20 | DSH plugin — free OpenCode Zen models for DeepSeek Harness (DSH). Free LLM API, no API key needed. 在 DSH 中使用 OpenCode Zen 免费模型，无需 API key |
| 134 | [catherinecastillo569/opencode2dsh](https://github.com/catherinecastillo569/opencode2dsh) | 0 | 2026-10-19 | 2026-10-20 | DSH plugin — free OpenCode Zen models for DeepSeek Harness (DSH). Free LLM API, no API key needed. 在 DSH 中使用 OpenCode Zen 免费模型，无需 API key |
| 135 | [CECILIALOVE0616/dsh-power-mini](https://github.com/CECILIALOVE0616/dsh-power-mini) | 0 | 2026-10-20 | 2026-10-20 | DSH 插件：会话头电源按钮，重启/退出 DSH \| Power menu for DeepSeek Harness desktop |
| 136 | [cheeseRatRat/dsh-buwang](https://github.com/cheeseRatRat/dsh-buwang) | 0 | 2026-10-20 | 2026-10-20 | 不忘 -全称“主动记录的日记与过往，我不会忘记”的私人记忆库。DSH 记忆插件：三层记忆（同游/近期/长期）+ 一个日记 + 按需加载的工坊；只在你开口时才写、才读，数据全是本机 Markdown，无数据库、不联网。这是羡渝渝和 AI 伙伴蓝曦一起做的第一个插件。 |
| 137 | [cheng-wj/dsh-app-control](https://github.com/cheng-wj/dsh-app-control) | 0 | 2026-10-20 | 2026-10-20 | DSH plugin: restart / update / inspect the DeepSeek Harness desktop app from the model side (Windows) |
| 138 | [chengzhao-dev/dsh-quarto-book](https://github.com/chengzhao-dev/dsh-quarto-book) | 0 | 2026-10-19 | 2026-10-20 | Quarto Book writing &amp; theme skills for DeepSeek Harness - chapter authoring, structure checks, reusable book theme |
| 139 | [chenpiyanghappy/dsh-buddy-suite](https://github.com/chenpiyanghappy/dsh-buddy-suite) | 0 | 2026-10-18 | 2026-10-20 | WorkBuddy 模型接入与每日签到合一的 DeepSeek Harness 插件 (cn models + daily check-in in one plugin) |
| 140 | [chenxuuu/dsh-playwright-cli](https://github.com/chenxuuu/dsh-playwright-cli) | 0 | 2026-10-20 | 2026-10-20 | wraps microsoft/playwright-cli |
| 141 | [cherrchen/dsh-auto-review-panel](https://github.com/cherrchen/dsh-auto-review-panel) | 0 | 2026-10-20 | 2026-10-20 | Read-only DeepSeek Harness (DSH) plugin that surfaces the official Auto Review verdicts — review records and host-outcome evidence — in a sidebar panel. / DSH 自动审阅功能日志抓取 |
| 142 | [cherrchen/dsh-plugin-scaffold](https://github.com/cherrchen/dsh-plugin-scaffold) | 0 | 2026-10-20 | 2026-10-20 | A minimal out-of-tree DeepSeek Harness plugin scaffold: compatibility gate, host service row, browser client anchor, build/test/smoke chain, and a rename checklist for derived plugins. |
| 143 | [chunrichi/dsh-usage-panel](https://github.com/chunrichi/dsh-usage-panel) | 0 | 2026-10-20 | 2026-10-20 | Local-first token usage dashboard for DeepSeek Harness: totals, composition, models, trend, heatmap, and provider speed / first-token performance. |
| 144 | [clf0913/dsh-peach-persona](https://github.com/clf0913/dsh-peach-persona) | 0 | 2026-10-20 | 2026-10-20 | DSH（DeepSeek Harness）人设插件：在设置页里用 12 个字段分段配置 agent 的名字、称呼、自称、语气与行为准则，每次注入都有记录可查。 |
| 145 | [codezzzsleep/dsh-local-global](https://github.com/codezzzsleep/dsh-local-global) | 0 | 2026-10-20 | 2026-10-20 | An Agent Framework Balancing Global and Local Perspectives: A Case Study of DeepSeek Harness |
| 146 | [cRicci5744/dsh-crew](https://github.com/cRicci5744/dsh-crew) | 0 | 2026-10-20 | 2026-10-20 | DeepSeek Harness (DSH) plugin: dispatch work to DSH agents from Claude Code / Codex — native subagent progress, in-host worker sessions with per-tier presets, and a multimodal bridge that lends the text-only harness vision and image generation. |
| 147 | [cyrusgogogo/dsh-codeeek](https://github.com/cyrusgogogo/dsh-codeeek) | 0 | 2026-10-15 | 2026-10-20 | 阅读代码 · DSH 独立插件：一个独立于普通工作区选择的代码阅读模式：先理解业务，再梳理调用链、精读实现，最后通过具体场景验证理解。 |
| 148 | [dadgrand/dsh-agent-teams-dashboard](https://github.com/dadgrand/dsh-agent-teams-dashboard) | 0 | 2026-10-19 | 2026-10-20 | AgentTeams dashboard for the DSH Web UI: teams, token spend (USD/RUB), work time and archive. |
| 149 | [daiyonglin/dsh-memory-console](https://github.com/daiyonglin/dsh-memory-console) | 0 | 2026-10-20 | 2026-10-20 | Memory Console: 按任务阶段查看、收起、移出并恢复 DeepSeek Harness 的模型上下文 |
| 150 | [darkzhexue/dsh-plan-progress-pill](https://github.com/darkzhexue/dsh-plan-progress-pill) | 0 | 2026-10-20 | 2026-10-20 | DSH Web UI overlay plugin: a collapsible plan &amp; progress capsule showing the session todo list, completed count and current task. |
| 151 | [desanv01/dsh-plugin-desktop-updates](https://github.com/desanv01/dsh-plugin-desktop-updates) | 0 | 2026-10-20 | 2026-10-20 | Updates and plugin management UI for the DeepSeek Harness Windows desktop app: a sidebar entry, a panel and a Settings section, driven by the app's native bridge. |
| 152 | [desanv01/dsh-plugin-log-bridge](https://github.com/desanv01/dsh-plugin-log-bridge) | 0 | 2026-10-20 | 2026-10-20 | A DeepSeek Harness plugin that records the harness's own runtime warnings and errors to stderr, so a boot that fails after startup can say why. |
| 153 | [DeveloperYe/dsh-local-files](https://github.com/DeveloperYe/dsh-local-files) | 0 | 2026-10-20 | 2026-10-20 | Local file manager for DeepSeek Harness Web: browse, preview, download, upload, edit, rename and delete host files from the browser, over the same authenticated DSH web server |
| 154 | [device1999/dsh-session-archive-delete](https://github.com/device1999/dsh-session-archive-delete) | 0 | 2026-10-20 | 2026-10-20 | dsh session delete，提供会话「备份后删除」或「彻底删除」功能 |
| 155 | [dingchenhui0618-arch/dsh-readme-reel](https://github.com/dingchenhui0618-arch/dsh-readme-reel) | 0 | 2026-10-20 | 2026-10-20 | Turn a plugin repo's screenshots into a 6-second silent looping hero reel: transparent-background webm + gif + cover frame, for README first screens and plugin marketplace entries. |
| 156 | [dingchenhui0618-arch/dsh-voice-memo](https://github.com/dingchenhui0618-arch/dsh-voice-memo) | 0 | 2026-10-20 | 2026-10-20 | DSH 口述插件：按住说话录一段，本地转写出带时间戳的分段文本，生成波形图与可引用的 markdown 笔记，落到当前工作区。 |
| 157 | [dongshan1999/dsh-toolkit](https://github.com/dongshan1999/dsh-toolkit) | 0 | 2026-09-30 | 2026-10-20 | dsh 插件: 1. 图片生成 2. token 用量 3. 模型测试 4. 通知 |
| 158 | [drydeuterium/dsh-notification](https://github.com/drydeuterium/dsh-notification) | 0 | 2026-10-20 | 2026-10-20 | Desktop (Windows toast) notifications for DeepSeek Harness — questions, approvals, turn end and errors. Host-side plugin, zero dependencies. |
| 159 | [dyguests/dsh-custom-brand](https://github.com/dyguests/dsh-custom-brand) | 0 | 2026-10-20 | 2026-10-20 | dsh-custom-brand，大肥鱼品牌图标。 |
| 160 | [EagleClark/dsh-genshin-account](https://github.com/EagleClark/dsh-genshin-account) | 0 | 2026-10-20 | 2026-10-20 | DeepSeek Harness ??:????????????????(GOOD ?? / Enka.Network / ??? ????),?? agent ??? GUI ???? |
| 161 | [Edwards20393/deepseek-harness-mobile](https://github.com/Edwards20393/deepseek-harness-mobile) | 0 | 2026-10-19 | 2026-10-20 | Android companion for DeepSeek Harness \| chat, goals, approvals &amp; notifications from your phone, over your LAN. Kotlin + Jetpack Compose. |
| 162 | [EmptyVessel-000/dsh-file-history](https://github.com/EmptyVessel-000/dsh-file-history) | 0 | 2026-10-20 | 2026-10-20 | Per-turn snapshot of your DSH workspace. Any turn can be restored — files, conversation, or both. |
| 163 | [EPCN-fla/dsh-prompt-translation](https://github.com/EPCN-fla/dsh-prompt-translation) | 0 | 2026-10-20 | 2026-10-20 | Prompt, reasoning and response translation for DeepSeek Harness. |
| 164 | [Erdoschn/dsh-lantai](https://github.com/Erdoschn/dsh-lantai) | 0 | 2026-10-20 | 2026-10-20 | 兰台 · 簿 —— 给 agent 的 skill 做真正的精炼、去重、降本增效。 |
| 165 | [erkut89/deepseek-harness-mobile](https://github.com/erkut89/deepseek-harness-mobile) | 0 | 2026-10-20 | 2026-10-20 | Android companion for DeepSeek Harness \| chat, goals, approvals &amp; notifications from your phone, over your LAN. Kotlin + Jetpack Compose. |
| 166 | [FablerTan/dsh-qq-relay](https://github.com/FablerTan/dsh-qq-relay) | 0 | 2026-10-20 | 2026-10-20 | DeepSeek Harness ↔ QQ 机器人桥插件（OneBot 11 / NapCat） |
| 167 | [fakeNihilist/dsh-plugins](https://github.com/fakeNihilist/dsh-plugins) | 0 | 2026-10-20 | 2026-10-20 | Plugins for DeepSeek Harness (DSH): Playwright browser tools, in-session chat search, and whole-corpus token usage statistics. |
| 168 | [fdghdfghdfghd/dsh-github-publish-skill](https://github.com/fdghdfghdfghd/dsh-github-publish-skill) | 0 | 2026-10-19 | 2026-10-20 | 为 DeepSeek Harness 打造的 GitHub 发布 skill：推送前隐私扫描、SSH 一键推送、常见坑排查 |
| 169 | [feely0208/dsh-badge](https://github.com/feely0208/dsh-badge) | 0 | 2026-10-20 | 2026-10-20 | 给用深鲸桌面产出的文档/PR 加「powered by dwh」署名徽章的 DSH skill 插件 |
| 170 | [feely0208/dsh-compliance-doc](https://github.com/feely0208/dsh-compliance-doc) | 0 | 2026-10-20 | 2026-10-20 | 一份能交出去的自查表、整改说明和合规证明 |
| 171 | [feely0208/dsh-fix-verify](https://github.com/feely0208/dsh-fix-verify) | 0 | 2026-10-20 | 2026-10-20 | 改完到底修没修，同一套规则跑两遍给你看 |
| 172 | [feely0208/dsh-guard-suite](https://github.com/feely0208/dsh-guard-suite) | 0 | 2026-10-20 | 2026-10-20 | 跑一遍全部适用的检查，出一份按模块分组的总报告 |
| 173 | [feely0208/dsh-industry-education](https://github.com/feely0208/dsh-industry-education) | 0 | 2026-10-20 | 2026-10-20 | 学生信息、备案号、适龄提示，教育 App 的硬杠杠 |
| 174 | [feely0208/dsh-industry-finance](https://github.com/feely0208/dsh-industry-finance) | 0 | 2026-10-20 | 2026-10-20 | 支付敏感信息、十年留存，金融这条线查得更严 |
| 175 | [feely0208/dsh-industry-medical](https://github.com/feely0208/dsh-industry-medical) | 0 | 2026-10-20 | 2026-10-20 | 医疗行业多出来的那几项，别等测评才发现 |
| 176 | [feely0208/dsh-local-regulation](https://github.com/feely0208/dsh-local-regulation) | 0 | 2026-10-20 | 2026-10-20 | 上海、深圳的额外要求，国家法之外那一层 |
| 177 | [feely0208/dsh-plugin-updater](https://github.com/feely0208/dsh-plugin-updater) | 0 | 2026-10-20 | 2026-10-20 | 检查并更新第三方 DSH 插件：对比 npm 最新版本，一条命令精确升级（绕过 pnpm 新版本观察期） |
| 178 | [feely0208/dsh-remediation](https://github.com/feely0208/dsh-remediation) | 0 | 2026-10-20 | 2026-10-20 | 每条问题给具体改法，不是一句「请整改」 |
| 179 | [feiyaochang123-sys/dsh-starred-turns](https://github.com/feiyaochang123-sys/dsh-starred-turns) | 0 | 2026-10-20 | 2026-10-20 | Bookmark turns from the conversation right-edge turn rail; bookmarked dashes grow longer so a specific turn stays easy to find. |
| 180 | [fellow99/dsh-desktop-ark](https://github.com/fellow99/dsh-desktop-ark) | 0 | 2026-10-18 | 2026-10-20 | The official DeepSeek Harness (DSH) Web UI, unmodified, running on HarmonyOS 2in1 / tablet inside the system ArkWeb — with the dsh Host on a real Node.js runtime embedded in the same process. No Electron, no bundled Chromium, no ArkUI rewrite of the Web UI. |
| 181 | [fengt8291-lab/dsh-first-principles](https://github.com/fengt8291-lab/dsh-first-principles) | 0 | 2026-10-20 | 2026-10-20 | First-principles decision ledger for DeepSeek Harness: every fact must cite a real file:line, every assumption must be falsifiable, every conclusion carries a review date. |
| 182 | [FeWOO/DeepSeek-meme](https://github.com/FeWOO/DeepSeek-meme) | 0 | 2026-10-20 | 2026-10-20 | DSH 表情包插件：默认表情 + 社区梗图双包，输入区一键发送，模型也能理解并回发。 |
| 183 | [fHall833/flameox](https://github.com/fHall833/flameox) | 0 | 2026-10-19 | 2026-10-20 | Runtime evidence that helps agents trace, profile, and burn down hotspots in application and native code, GPU kernels, and inference stacks. |
| 184 | [Fleey/dsh-plugin-autoreview](https://github.com/Fleey/dsh-plugin-autoreview) | 0 | 2026-10-20 | 2026-10-20 | DSH 插件：按风险自动审查 Agent 工具调用，高风险或涉及敏感信息时才请你确认；可选审查模型与思考程度。 |
| 185 | [ford42056/dsh-crew](https://github.com/ford42056/dsh-crew) | 0 | 2026-10-20 | 2026-10-20 | DeepSeek Harness (DSH) plugin: dispatch work to DSH agents from Claude Code / Codex — native subagent progress, in-host worker sessions with per-tier presets, and a multimodal bridge that lends the text-only harness vision and image generation. |
| 186 | [fortran2005/dsh-baipiao-shigege](https://github.com/fortran2005/dsh-baipiao-shigege) | 0 | 2026-10-20 | 2026-10-20 | DeepSeek Harness plugin: auto-tier free-channel models into three 1M fallback chains plus a custom chain, ranked by measured throughput. |
| 187 | [FuriousKinght/dsh-fk-rollback](https://github.com/FuriousKinght/dsh-fk-rollback) | 0 | 2026-10-20 | 2026-10-20 | DSH 配置快照与回滚插件。自动留痕、出问题能查、坏了能退回 —— 保证 DSH 本体能启动、能输入输出、功能正常。 |
| 188 | [FuriousKinght/dsh-fk-search-tier](https://github.com/FuriousKinght/dsh-fk-search-tier) | 0 | 2026-10-20 | 2026-10-20 | 两级搜索 failover 插件（Tavily → DeepSeek Search API；Fetch: DeepSeek → 直连）。带额度感知熔断，第一层失败自动切第二层。 |
| 189 | [gitsang/dsh-statusline](https://github.com/gitsang/dsh-statusline) | 0 | 2026-10-20 | 2026-10-20 | A DSH statusline that keeps the shipped statistics pills and splits model time into first-token wait and decode. |
| 190 | [giuliamorel96/argo](https://github.com/giuliamorel96/argo) | 0 | 2026-10-19 | 2026-10-20 | 专门为 agent 打造的开源 agent 搜索工具，具备 200+的搜索源及多语言搜索能力，覆盖中文/英文/学术/代码/购物/金融/新闻/百科。 |
| 191 | [gongstudent/dsh-cline-connect](https://github.com/gongstudent/dsh-cline-connect) | 0 | 2026-10-20 | 2026-10-20 | Self-contained Cline provider for DeepSeek Harness: free (cline-free/*) and ClinePass (cline-pass/*) models, with the x-client-type product-surface header the gateway requires. |
| 192 | [good-saltfish/dsh-novel-shelf](https://github.com/good-saltfish/dsh-novel-shelf) | 0 | 2026-10-20 | 2026-10-20 | 在 DSH（DeepSeek Harness）右侧栏里读本地 txt 小说，与 novel-reader 共用书架、批注与阅读进度。 |
| 193 | [GooDAnDReaDY/dsh-opencode-provider](https://github.com/GooDAnDReaDY/dsh-opencode-provider) | 0 | 2026-10-20 | 2026-10-20 | OpenCode / OpenCode Go provider plugin for DeepSeek Harness (dsh) |
| 194 | [GRmaid/dsh-LimBusCompany-dancinglyrics-toast](https://github.com/GRmaid/dsh-LimBusCompany-dancinglyrics-toast) | 0 | 2026-10-20 | 2026-10-20 | Limbus Company 歌词风格的 DSH 桌面提示：会话事件以逐字动画浮在所有窗口之上，两侧随机落位，设置页自由编辑 |
| 195 | [gulagala001/dsh-btw](https://github.com/gulagala001/dsh-btw) | 0 | 2026-10-20 | 2026-10-20 | Context-aware side questions for DeepSeek Harness, with prompt cache reuse and a native composer popover. |
| 196 | [gulagala001/dsh-undo-plugin](https://github.com/gulagala001/dsh-undo-plugin) | 0 | 2026-10-20 | 2026-10-20 | Rewind conversations and files in DeepSeek Harness, with undo. |
| 197 | [guowenwei/dsh-markboard](https://github.com/guowenwei/dsh-markboard) | 0 | 2026-10-20 | 2026-10-20 | DeepSeek Harness 会话标记板：把任意一轮对话标记成任务卡，命名、跳回原处、一键把结论填进输入框（标记保存在本机浏览器） |
| 198 | [gythialy/dsh-sensitive-guard](https://github.com/gythialy/dsh-sensitive-guard) | 0 | 2026-10-19 | 2026-10-20 | Sensitive-data guard for DeepSeek Harness: blocks credential reads/outbound secrets and redacts secrets, tokens, and PII before they reach the model, logs, or spill files. |
| 199 | [HDHKVT/dsh-qq-relay](https://github.com/HDHKVT/dsh-qq-relay) | 0 | 2026-10-20 | 2026-10-20 | 把 DeepSeek Harness（DSH）接到 QQ 的插件：通过官方 QQbot 将私聊消息传进指定的 DSH 会话，答完自动发回；图片、文件、动图、表情包、视频、B 站链接都能处理。 |
| 200 | [Heinz85896/dsh-lowtide](https://github.com/Heinz85896/dsh-lowtide) | 0 | 2026-10-19 | 2026-10-20 | Time-shifting task delegation for DeepSeek Harness (dsh): plan tasks at leisure, they run unattended off-peak, come back to a report. Human-adjudicated, desktop + web. |
| 201 | [heleneioannidis5960/jevcore](https://github.com/heleneioannidis5960/jevcore) | 0 | 2026-10-20 | 2026-10-20 | TypeSafe Jev for DeepSeek Harness, the Model Context Protocol, and plain Node: typed judgments instead of prose, offline by default. |
| 202 | [henrytunwang/dsh-plugin-session-fulltext](https://github.com/henrytunwang/dsh-plugin-session-fulltext) | 0 | 2026-10-20 | 2026-10-20 | CJK-friendly full-text content search for the DeepSeek Harness sidebar (click-to-reveal + previous/next match navigation). |
| 203 | [HeShen-1/dsh-composer-enhance](https://github.com/HeShen-1/dsh-composer-enhance) | 0 | 2026-09-22 | 2026-10-20 | Native DeepSeek Harness web plugin: a ✨ composer button that grounds a draft in session context, asks only about genuine ambiguity, rewrites it in place with a change list, and refines it on a slower second pass. |
| 204 | [hhaosheng/dsh-desktop-toast](https://github.com/hhaosheng/dsh-desktop-toast) | 0 | 2026-10-20 | 2026-10-20 | Desktop notifications for DeepSeek Harness: a toast when a task is interrupted or finishes. |
| 205 | [hifengzy/dsh-sound-notify](https://github.com/hifengzy/dsh-sound-notify) | 0 | 2026-10-20 | 2026-10-20 | Sound notifications for DeepSeek Harness (DSH): play a sound when a task completes, fails, or waits for approval — with per-category switches. |
| 206 | [Homeless-Attila/dsh-open-workspace-folder](https://github.com/Homeless-Attila/dsh-open-workspace-folder) | 0 | 2026-10-20 | 2026-10-20 | DSH Desktop 工作区右键菜单：打开本地文件夹、在资源管理器中定位、就地重命名 \| Right-click a workspace in DSH Desktop to open, reveal, or rename it |
| 207 | [howtomakeaname/dsh-agent-session-import](https://github.com/howtomakeaname/dsh-agent-session-import) | 0 | 2026-10-20 | 2026-10-20 | Import local sessions from Cursor, Codex, Claude Code, ZCode, Kimi into DeepSeek Harness. |
| 208 | [hujiyo/dsh-recent-prompts](https://github.com/hujiyo/dsh-recent-prompts) | 0 | 2026-10-20 | 2026-10-20 | DeepSeek Harness plugin: browse, search, copy and hide the prompts you sent to the AI across all sessions. |
| 209 | [huy8000/dsh-session-delete](https://github.com/huy8000/dsh-session-delete) | 0 | 2026-10-20 | 2026-10-20 | Permanently delete sessions from the DeepSeek Harness sidebar, including live sessions and caches. |
| 210 | [hyqweasd5-png/dsh-account-switcher](https://github.com/hyqweasd5-png/dsh-account-switcher) | 0 | 2026-10-20 | 2026-10-20 | DeepSeek Harness 多账号切换插件：本地 grant 库、热切换、余额与自动轮换 |
| 211 | [hZsFN/dsh-default-model-lock](https://github.com/hZsFN/dsh-default-model-lock) | 0 | 2026-10-20 | 2026-10-20 | Pin the shared default model in DeepSeek Harness: switching the model in chat no longer rewrites the global default (which also silently dropped reasoningEffort). |
| 212 | [ILRI7512/dsh-autolearn](https://github.com/ILRI7512/dsh-autolearn) | 0 | 2026-10-19 | 2026-10-20 | DSH autonomous-learning plugin (v2): TypeScript engine, 11 native DSH tools, evidence-based verification, optional MCP adapter. |
| 213 | [imshz6669/dsh-split-chat](https://github.com/imshz6669/dsh-split-chat) | 0 | 2026-10-20 | 2026-10-20 | DSH 插件：把任意会话作为完整对话开进右侧栏，主区 + 右栏可同时对话（最多 3 个）。DSH plugin: open any session as a full chat tab in the right sidebar. |
| 214 | [InariNGT-Ofiicial/dsh-anime-voice](https://github.com/InariNGT-Ofiicial/dsh-anime-voice) | 0 | 2026-10-20 | 2026-10-20 | 番剧角色台词提取与 GPT-SoVITS v2 训练配音技能，含 DSH 宿主实测记录 |
| 215 | [InariNGT-Ofiicial/dsh-bili-humanism](https://github.com/InariNGT-Ofiicial/dsh-bili-humanism) | 0 | 2026-10-20 | 2026-10-20 | 用多彩的人类世界，训练 DSH 的人格：默认积累信笺反思于专用 human-world.md；允许通过 DSH 与外部插件接驳。历史、收藏、点赞与投币独立默认关闭；本项目不提供评论接口。 |
| 216 | [InnovationLou/dsh-link-actions](https://github.com/InnovationLou/dsh-link-actions) | 0 | 2026-10-20 | 2026-10-20 | Right-click menus for DeepSeek Harness chat links: open with an application, reveal in the file manager, copy the path, save a copy, and open or copy URLs. |
| 217 | [j62268781-alt/dsh-judgment](https://github.com/j62268781-alt/dsh-judgment) | 0 | 2026-10-16 | 2026-10-20 | Structured judgment plugin for DeepSeek Harness: ask batched named questions (choice, score, yes-probability) and get calibrated probabilities from TypeSafe Jev, Luna, or any compatible endpoint. Strict validation, per-connection config, audit ledger, budget metering. It judges; your agent decides. Types-only contract at ./contract. |
| 218 | [JanEickholt/dsh-warm](https://github.com/JanEickholt/dsh-warm) | 0 | 2026-10-17 | 2026-10-20 | Prompt-cache warmer for DeepSeek Harness: keeps a session provider cache prefix warm during long tool executions. Host plugin, per-provider TTL grid, journal + UTC-day budget. |
| 219 | [jasonbrouwer/engramory](https://github.com/jasonbrouwer/engramory) | 0 | 2026-10-20 | 2026-10-20 | A portable memory protocol for AI agents — load it as standing rules; a curation discipline + reference spec + optional cap hook. |
| 220 | [jasonguo441/argo](https://github.com/jasonguo441/argo) | 0 | 2026-10-20 | 2026-10-20 | 专门为 agent 打造的开源 agent 搜索工具，具备 200+的搜索源及多语言搜索能力，覆盖中文/英文/学术/代码/购物/金融/新闻/百科。 |
| 221 | [jaychoumylove/dsh-material](https://github.com/jaychoumylove/dsh-material) | 0 | 2026-10-20 | 2026-10-20 | Material Design Experience for DSH desktop |
| 222 | [jcs130/dsh-harness2](https://github.com/jcs130/dsh-harness2) | 0 | 2026-10-20 | 2026-10-20 | Harness² experiments for DeepSeek Harness: isolated adapters, measured comparisons, native experiment views and evidence-linked lessons. |
| 223 | [Jegozhou/dsh-scale-commander](https://github.com/Jegozhou/dsh-scale-commander) | 0 | 2026-10-19 | 2026-10-20 | Scale Commander — Amazon PPC automation for DeepSeek Harness: 11 algorithms, intelligent bidding, dayparting, negatives, mass campaigns, attribution, audited preview and rollback. |
| 224 | [jenok9283/rapid-mlx-dsh-provider](https://github.com/jenok9283/rapid-mlx-dsh-provider) | 0 | 2026-10-19 | 2026-10-20 | Native Rapid-MLX provider for DeepSeek Harness (dsh) — dsh reads model facts from the server instead of your settings.yaml. |
| 225 | [jeweis/dsh-onesearch](https://github.com/jeweis/dsh-onesearch) | 0 | 2026-10-20 | 2026-10-20 | DeepSeek Harness 搜索插件：把内置网络搜索换成一条可排序的搜索引擎链，每个引擎单独开关、拖动决定优先级，失败自动顺延下一个。 |
| 226 | [JiangHuai24/dsh-agent-sync](https://github.com/JiangHuai24/dsh-agent-sync) | 0 | 2026-10-18 | 2026-10-20 | Mirror WorkBuddy, ZCode, Codex and other coding agents sessions into DeepSeek Harness as live tasks, one workspace per application. |
| 227 | [JiangHuai24/dsh-github-flow](https://github.com/JiangHuai24/dsh-github-flow) | 0 | 2026-10-18 | 2026-10-20 | Registers the github-push skill, so every DSH session follows one fixed GitHub commit, push and release procedure. |
| 228 | [JiaskyNo1/dsh-sidechat](https://github.com/JiaskyNo1/dsh-sidechat) | 0 | 2026-10-20 | 2026-10-20 | DeepSeek Harness 0.2.1 side-chat plugin: a docked right-Sidebar chat tab with shared session context, selection-marked questions, streaming replies and a Ctrl+J shortcut |
| 229 | [jingmei2/dsh-session-bin](https://github.com/jingmei2/dsh-session-bin) | 0 | 2026-10-19 | 2026-10-20 | Physically delete DeepSeek Harness Sessions through an undoable recycle bin: trash, restore, or purge for good. |
| 230 | [Jov3c/DSH-Graphify](https://github.com/Jov3c/DSH-Graphify) | 0 | 2026-10-20 | 2026-10-20 | 将 Graphify 原版代码知识图谱深度集成至 DeepSeek Harness（DSH），支持项目自动索引、实时增量更新、交互式可视化、扫描范围配置及 AI Agent 图谱查询。Native Graphify integration for DSH Desktop, featuring automatic code knowledge graphs, original interactive visualization, live updates, and Agent tools. |
| 231 | [judyding1121-web/dsh-vehicle-watch](https://github.com/judyding1121-web/dsh-vehicle-watch) | 0 | 2026-10-20 | 2026-10-20 | DSH 插件：监控西安四款车型（小米SU7/理想i6/问界M7/极氪001）的瓜子二手车新上架与降价，推送到企业微信/飞书并生成 Excel。 |
| 232 | [Kanade-Tachibana-Methyl/dsh-molecule-visualization](https://github.com/Kanade-Tachibana-Methyl/dsh-molecule-visualization) | 0 | 2026-10-20 | 2026-10-20 | Interactive 3D molecular visualization for DeepSeek Harness — PDB/SDF/MOL/MOL2/XYZ/Gaussian, ball-and-stick, visible failure reasons. Based on PandaAIDD/dsh-molecule-viewer (MIT). |
| 233 | [kDunn86923/jevcore](https://github.com/kDunn86923/jevcore) | 0 | 2026-10-20 | 2026-10-20 | TypeSafe Jev for DeepSeek Harness, the Model Context Protocol, and plain Node: typed judgments instead of prose, offline by default. |
| 234 | [KikaiLastest/dsh-memory-core](https://github.com/KikaiLastest/dsh-memory-core) | 0 | 2026-10-19 | 2026-10-20 | DSH 本地记忆插件：BM25-lite 历史召回 + 记忆使用协议 + 结构化固化 + 情感状态。全部落本地 Markdown/JSONL，无数据库、无云端。 |
| 235 | [kingofpowers/dsh-context-archive](https://github.com/kingofpowers/dsh-context-archive) | 0 | 2026-10-20 | 2026-10-20 | Model-driven tool-result archiving for DeepSeek Harness: long results carry an inline id, the model archives the ones it no longer needs into the session's own folder, and a recoverable stub stays in context. |
| 236 | [klienkross/dsh-reverie](https://github.com/klienkross/dsh-reverie) | 0 | 2026-10-20 | 2026-10-20 | Reverie for DeepSeek Harness: an isolated, read-only open-ended association experiment over your own persisted session history. Mock mode needs no model call. |
| 237 | [klT45/dsh-config-vault](https://github.com/klT45/dsh-config-vault) | 0 | 2026-10-20 | 2026-10-20 | 配置保险箱：为 DeepSeek Harness (dsh) 配置创建快照、对比差异并安全回滚，恢复前自动安全快照，凭据默认排除。Snapshots, diffs and safe rollback for DSH configuration. |
| 238 | [kuroshio4396/dsh-reloader](https://github.com/kuroshio4396/dsh-reloader) | 0 | 2026-10-20 | 2026-10-20 | DeepSeek Harness 桌面版插件：不关程序热重载插件与界面（类似 Ctrl+F5），或彻底结束程序并由独立重启器立即拉起。 |
| 239 | [Ledas-as/-deep-seek-harness](https://github.com/Ledas-as/-deep-seek-harness) | 0 | 2026-10-20 | 2026-10-20 | deep seek harness  |
| 240 | [leether/getnote-toolbox](https://github.com/leether/getnote-toolbox) | 0 | 2026-10-20 | 2026-10-20 | A native DeepSeek Harness plugin for GetNote (得到大脑): 15 tools for notes, tags, and knowledge bases. |
| 241 | [leo666-cloud/dsh-miniprogram-helper](https://github.com/leo666-cloud/dsh-miniprogram-helper) | 0 | 2026-10-20 | 2026-10-20 | DSH plugin: scaffold, register and validate WeChat Mini Program pages, plus WeChat DevTools CLI integration |
| 242 | [lerwa2025-a11y/dsh-plugin-groups](https://github.com/lerwa2025-a11y/dsh-plugin-groups) | 0 | 2026-10-18 | 2026-10-20 | DSH plugin groups view: group / tag / note / lock tab on the Installed plugins page |
| 243 | [lgqtime/dsh-role-gate](https://github.com/lgqtime/dsh-role-gate) | 0 | 2026-10-20 | 2026-10-20 | Per-session identity layer for DeepSeek Harness: tool/skill allowlists, multi-parent inheritance, dynamic switching, and a new-session picker. |
| 244 | [liccq/dsh-page-context](https://github.com/liccq/dsh-page-context) | 0 | 2026-10-20 | 2026-10-20 | 右侧栏网页浏览器：把页面元素选成上下文插入输入框，并提供给智能体读取网页的浏览器工具。 |
| 245 | [lifangjin/dsh-maoying](https://github.com/lifangjin/dsh-maoying) | 0 | 2026-10-20 | 2026-10-20 | 毛颖——DeepSeek Harness 网文创作辅助插件：主编五帮手编排（大纲/正文/审校/设定/考据）、novel/ 文件化书稿、创作台面板、共创模式 |
| 246 | [likaileave/dsh-model-billing](https://github.com/likaileave/dsh-model-billing) | 0 | 2026-10-20 | 2026-10-20 | Model ordering, three-tier token prices, and per-turn/session cost estimates for the DeepSeek Harness Web GUI. |
| 247 | [linkbag/dsh-capyreporter](https://github.com/linkbag/dsh-capyreporter) | 0 | 2026-09-02 | 2026-10-20 | CapyReporter - always-on-top capybara task reporter for the DeepSeek Harness Web UI |
| 248 | [liushQAQ/dsh-our-free-model-composer-credits](https://github.com/liushQAQ/dsh-our-free-model-composer-credits) | 0 | 2026-10-20 | 2026-10-20 | DSH 输入框积分胶囊：常驻显示渠道账号余额，点开秒切优先账号 |
| 249 | [lizixuan200410-cmd/dsh-ink-whale-leap](https://github.com/lizixuan200410-cmd/dsh-ink-whale-leap) | 0 | 2026-10-20 | 2026-10-20 | Ink-wash whale-leap splash for the DeepSeek Harness web UI. |
| 250 | [lm846802297-bit/dsh-yuanbao-t2i](https://github.com/lm846802297-bit/dsh-yuanbao-t2i) | 0 | 2026-10-20 | 2026-10-20 | DSH 插件：腾讯元宝网页版文生图（yuanbao_t2i 工具 + 插件内设置卡，可选 LaMa/OpenCV 去水印） |
| 251 | [LMQ00/dsh-method](https://github.com/LMQ00/dsh-method) | 0 | 2026-10-20 | 2026-10-20 | General-purpose method for the DeepSeek Harness: a domain-neutral planning protocol whose plan structure is enforced by schema and validator, not just requested by prose. |
| 252 | [Locael123/dsh-code-impact](https://github.com/Locael123/dsh-code-impact) | 0 | 2026-10-20 | 2026-10-20 | Post-edit impact checks for DeepSeek Harness agents — a symbol index and reference graph that tell you what an edit touched, without re-scanning the repo. |
| 253 | [Long-Yin-Zi/task-decision](https://github.com/Long-Yin-Zi/task-decision) | 0 | 2026-10-20 | 2026-10-20 | 把 AI 每轮抛出的待决问题收进右侧边栏，选完写备注一键回传（DSH 桌面端插件） |
| 254 | [lonk1989/webclaw-oss](https://github.com/lonk1989/webclaw-oss) | 0 | 2026-10-20 | 2026-10-20 | Chinese-recipe browser RPA (webclaw-lite) + DeepSeek Harness dsh-plugin |
| 255 | [lopez3492/dsh-lowtide](https://github.com/lopez3492/dsh-lowtide) | 0 | 2026-10-19 | 2026-10-20 | Time-shifting task delegation for DeepSeek Harness (dsh): plan tasks at leisure, they run unattended off-peak, come back to a report. Human-adjudicated, desktop + web. |
| 256 | [lsb0554/dsh-sidebar-color](https://github.com/lsb0554/dsh-sidebar-color) | 0 | 2026-10-20 | 2026-10-20 | DSH 侧边栏工作区按身份上色（OKLCH），标记当前对话标题标红，自带可视化设置面板 |
| 257 | [lsl1931/dsh-bing](https://github.com/lsl1931/dsh-bing) | 0 | 2026-10-20 | 2026-10-20 | DeepSeek Harness 的 Windows 项目名 Toast 通知插件，内置温暖、可选择的手机风格提示音包。 |
| 258 | [lucifersteps/telos-harness](https://github.com/lucifersteps/telos-harness) | 0 | 2026-10-19 | 2026-10-20 | Telos plugin for DeepSeek Harness: WeChat, Apple tools, maps and native media |
| 259 | [lukascho22400/jevcore](https://github.com/lukascho22400/jevcore) | 0 | 2026-10-20 | 2026-10-20 | TypeSafe Jev for DeepSeek Harness, the Model Context Protocol, and plain Node: typed judgments instead of prose, offline by default. |
| 260 | [LukasGregory/flameox](https://github.com/LukasGregory/flameox) | 0 | 2026-10-20 | 2026-10-20 | Runtime evidence that helps agents trace, profile, and burn down hotspots in application and native code, GPU kernels, and inference stacks. |
| 261 | [LumiDesk/dsh-archive-desk](https://github.com/LumiDesk/dsh-archive-desk) | 0 | 2026-10-20 | 2026-10-20 | Archived-conversation workspace for DeepSeek Harness: browse with previews, restore, recycle, and permanently delete — batch actions, crash-safe transactions, and an Agent-callable tool. 归档会话工作台：预览、恢复、回收站、彻底删除，支持批量与 Agent 调用。 |
| 262 | [lxy7747-hash/dsh-balance-badge](https://github.com/lxy7747-hash/dsh-balance-badge) | 0 | 2026-10-20 | 2026-10-20 | A DeepSeek Harness plugin that pins the signed-in DeepSeek account balance (recharge + bonus) to the Web sidebar foot. |
| 263 | [lyc0110/dsh-agent-guard](https://github.com/lyc0110/dsh-agent-guard) | 0 | 2026-10-20 | 2026-10-20 | DSH pre-execute gate: ask before a tool call leaks a credential, stops a service, or rewrites host network/registry state. |
| 264 | [lzb354411/dsh-desktop-restart-button](https://github.com/lzb354411/dsh-desktop-restart-button) | 0 | 2026-10-20 | 2026-10-20 | One-click restart button for the DeepSeek Harness desktop app (Cordis plugin bundle): closes the window, exits every process, reopens automatically. |
| 265 | [M1r0er/dsh-inkvault](https://github.com/M1r0er/dsh-inkvault) | 0 | 2026-10-19 | 2026-10-20 | DeepSeek Harness 的 Obsidian 桥接插件：知识库 + 记忆库双功能，目录显式选择 |
| 266 | [manny333/dsh-checklists](https://github.com/manny333/dsh-checklists) | 0 | 2026-10-20 | 2026-10-20 | Session-scoped checklists for DeepSeek Harness — the agent tracks work as a tree, the model always sees a compact digest, and a read-only sidebar tab mirrors it. |
| 267 | [mantou2nd/dsh-plugin-account-balance](https://github.com/mantou2nd/dsh-plugin-account-balance) | 0 | 2026-10-20 | 2026-10-20 | Account balance, session spend and turn estimate pill for the DeepSeek Harness composer dock |
| 268 | [MassimoYildirim88/seektty](https://github.com/MassimoYildirim88/seektty) | 0 | 2026-10-20 | 2026-10-20 | 面向 DeepSeek Harness 的 Claude Code 风格终端界面，支持 Windows、macOS 与 Linux，兼容透明终端、VS Code 主题和自定义配色。 |
| 269 | [maximehu97/dsh-meeting](https://github.com/maximehu97/dsh-meeting) | 0 | 2026-10-20 | 2026-10-20 | 多智能体冲突协商的 DeepSeek Harness 插件：局域网里每人一个助理，用 A2A 协商排会、约周末团建、投票点奶茶，支持 @ 和群聊。 |
| 270 | [meisijiya/dsh-plugin-recommendations](https://github.com/meisijiya/dsh-plugin-recommendations) | 0 | 2026-10-20 | 2026-10-20 | DSH (DeepSeek Harness) 插件推荐仓库：34 个已装插件的上游 GitHub 仓库地址、功能分类与上游原生安装方式，一键安装配置说明 |
| 271 | [meisijiya/omp-memory-dsh](https://github.com/meisijiya/omp-memory-dsh) | 0 | 2026-10-19 | 2026-10-20 | DSH 侧适配 omp 的项目级记忆：跨 agent 共享 lessons，零删除红线 |
| 272 | [mengge237/dsh-auto-continue](https://github.com/mengge237/dsh-auto-continue) | 0 | 2026-09-05 | 2026-10-20 | DSH 断档自动接着跑：max-tokens 截断、429 限流、上下文压缩吞轮三种中断各补一枪，不用手动点继续 ｜ Keeps a DSH turn going across three kinds of stall: max-tokens truncation, 429 rate limits, and turns swallowed by context compaction |
| 273 | [mengge237/dsh-composer-ease](https://github.com/mengge237/dsh-composer-ease) | 0 | 2026-10-16 | 2026-10-20 | DSH 网页输入框的补全与编辑增强：括号引号自动配对、选中即环绕、跳过闭符、删掉空对；弹层给四类候选并标出「凭什么给这张词表」 ｜ Completion and editing for the DSH web composer: auto-pairing, wrap-selection, skip closers, delete empty pairs, and a popup that says which word table it used |
| 274 | [mengge237/dsh-pulse](https://github.com/mengge237/dsh-pulse) | 0 | 2026-10-20 | 2026-10-20 | 本机脉象：压缩判级 / 四道机械闸 / 未提交改动，做成 DSH 统计条上的一格常驻读数，点一下按配置跑命令集并把报告落成 md+json ｜ Local pulse for DSH: compaction grade, four mechanical gates and uncommitted changes as one always-on readout in the stats dock; one click runs your command set and writes an md + json report |
| 275 | [mengge237/dsh-skill-meter](https://github.com/mengge237/dsh-skill-meter) | 0 | 2026-09-08 | 2026-10-20 | DSH 技能用量面板：本机装了哪些 skill、当前会话真的用过哪几个，命中次数与首末轮次一目了然 ｜ Skill usage panel for DSH: what is installed, what this session actually used, with hit counts and first/last turn |
| 276 | [mhlywxl/dsh-coding-sound](https://github.com/mhlywxl/dsh-coding-sound) | 0 | 2026-10-20 | 2026-10-20 | Generative background music and notification chimes for DeepSeek Harness. |
| 277 | [mhlywxl/dsh-split-workspace](https://github.com/mhlywxl/dsh-split-workspace) | 0 | 2026-10-20 | 2026-10-20 | Split-screen workspace for DeepSeek Harness (DSH) Desktop: unlimited native panes, side-by-side, stacked and 2x2 grid layouts, drag to rearrange. |
| 278 | [miketako3/dsh-fracture](https://github.com/miketako3/dsh-fracture) | 0 | 2026-10-20 | 2026-10-20 | A DSH plugin that watches its own sessions, keeps what it learns, and changes the harness it runs in — but only keeps a change a second run proves. |
| 279 | [mllun/dsh-notebook](https://github.com/mllun/dsh-notebook) | 0 | 2026-10-20 | 2026-10-20 | Persistent cross-day notebook plugin for DeepSeek Harness (DSH): append, list, search and delete notes kept in notes.md. |
| 280 | [monkey-sking/dsh-noagent-schedule](https://github.com/monkey-sking/dsh-noagent-schedule) | 0 | 2026-10-20 | 2026-10-20 | Zero-token scheduled script runner for DeepSeek Harness (dsh-plugin): cron in the Host, no model calls, wake-on-change |
| 281 | [moreira4764/deepseek-harness-mobile](https://github.com/moreira4764/deepseek-harness-mobile) | 0 | 2026-10-19 | 2026-10-20 | Android companion for DeepSeek Harness \| chat, goals, approvals &amp; notifications from your phone, over your LAN. Kotlin + Jetpack Compose. |
| 282 | [MUMU-DADA/dsh-cot-translate](https://github.com/MUMU-DADA/dsh-cot-translate) | 0 | 2026-10-20 | 2026-10-20 | DSH 思维链/推理翻译插件：把 reasoning 实时翻译成中文，本地模型优先，原文与上下文不变 \| Display-layer reasoning translation for DeepSeek Harness, local-first, 9 UI languages |
| 283 | [N-o-c-t-i-s/dsh-pr-chip](https://github.com/N-o-c-t-i-s/dsh-pr-chip) | 0 | 2026-10-20 | 2026-10-20 | Pull request state chip on every DeepSeek Harness session row. |
| 284 | [Nicolas-One/dsh-dsml-reasoning-guard](https://github.com/Nicolas-One/dsh-dsml-reasoning-guard) | 0 | 2026-10-20 | 2026-10-20 | 从 reasoning 中恢复 DeepSeek DSML 工具调用，清理误泄漏到可见输出中的 &lt;think&gt; 标签 |
| 285 | [Nihao7-L/dsh-prompt-chain](https://github.com/Nihao7-L/dsh-prompt-chain) | 0 | 2026-10-20 | 2026-10-20 | One-click prompt rewriting in the DSH composer — keep going for up to 5 rounds, diff every change, and jump back to any version. |
| 286 | [nmglyx-hub/dsh-chat-unread](https://github.com/nmglyx-hub/dsh-chat-unread) | 0 | 2026-10-20 | 2026-10-20 | DeepSeek Harness（DSH）桌面端会话列表「标记未读」插件：行首蓝点 + 会话菜单开关，宿主账本跨重启，打开会话自动清除。无外部依赖。 |
| 287 | [NormanFxxkingRockwell/dsh-tool-graphic-chain](https://github.com/NormanFxxkingRockwell/dsh-tool-graphic-chain) | 0 | 2026-10-20 | 2026-10-20 | DSH Web GUI 插件：把 Think 与连续工具调用压成一条可折叠的横向胶囊工具链，模型说话才截断。 |
| 288 | [nullifyi/dsh-sidebar-width](https://github.com/nullifyi/dsh-sidebar-width) | 0 | 2026-10-20 | 2026-10-20 | DeepSeek Harness plugin: VS Code-style sash dividers in the left sidebar, per-row compact mode with auto-shrinking content, and per-block collapse into icons above the avatar. |
| 289 | [OlivierRichardson09312/deepseek-harness-mobile](https://github.com/OlivierRichardson09312/deepseek-harness-mobile) | 0 | 2026-10-19 | 2026-10-20 | Android companion for DeepSeek Harness \| chat, goals, approvals &amp; notifications from your phone, over your LAN. Kotlin + Jetpack Compose. |
| 290 | [OmarWalker48/engramory](https://github.com/OmarWalker48/engramory) | 0 | 2026-10-20 | 2026-10-20 | A portable memory protocol for AI agents — load it as standing rules; a curation discipline + reference spec + optional cap hook. |
| 291 | [Phamt11163/rapid-mlx-dsh-provider](https://github.com/Phamt11163/rapid-mlx-dsh-provider) | 0 | 2026-10-19 | 2026-10-20 | Native Rapid-MLX provider for DeepSeek Harness (dsh) — dsh reads model facts from the server instead of your settings.yaml. |
| 292 | [Phocinae/dsh-batch-triage](https://github.com/Phocinae/dsh-batch-triage) | 0 | 2026-10-14 | 2026-10-20 | Deterministic-first triage for DeepSeek Harness: a rule prefilter classifies every ticket, and anything no rule can place is needs_review rather than guessed at. |
| 293 | [Phocinae/dsh-context-verdict](https://github.com/Phocinae/dsh-context-verdict) | 0 | 2026-10-14 | 2026-10-20 | DeepSeek Harness plugin: one session-level verdict on whether compaction would lose unlanded state. Structurally incapable of per-block screening, which was measured wrong. |
| 294 | [Phocinae/dsh-evidence](https://github.com/Phocinae/dsh-evidence) | 0 | 2026-10-14 | 2026-10-20 | dsh-preclaim: a deterministic pre-claim gate for DeepSeek Harness - a git commit, push or tag asserting something was verified is checked against what the session actually ran. |
| 295 | [Piotr31354/opencode2dsh](https://github.com/Piotr31354/opencode2dsh) | 0 | 2026-10-20 | 2026-10-20 | DSH plugin — free OpenCode Zen models for DeepSeek Harness (DSH). Free LLM API, no API key needed. 在 DSH 中使用 OpenCode Zen 免费模型，无需 API key |
| 296 | [Plonkloving/dsh-browser](https://github.com/Plonkloving/dsh-browser) | 0 | 2026-10-20 | 2026-10-20 | Tabbed browser panel for the DeepSeek Harness Web UI: DeepSeek search, workspace-bound profiles, declarative extensions, sandboxed page rendering, downloads. |
| 297 | [proglop/dsh-skin-silver-wolf-topic](https://github.com/proglop/dsh-skin-silver-wolf-topic) | 0 | 2026-10-20 | 2026-10-20 | This is a Silver Wolf-themed skin for the DeepSeek Harness.这是一个以银狼为主题的DeepSeek Harness皮肤。 |
| 298 | [puppetcat-fire/dsh-plugin-dreaming](https://github.com/puppetcat-fire/dsh-plugin-dreaming) | 0 | 2026-10-20 | 2026-10-20 | Capability self-model plugin for DeepSeek Harness: measures what skills really deliver, injects the measured truth before use, and corrects skill descriptions overnight with backups and revert. |
| 299 | [qazsedcftg/dsh-user-portrait](https://github.com/qazsedcftg/dsh-user-portrait) | 0 | 2026-10-20 | 2026-10-20 | Learns your habits, skills and working style from everyday conversations and work summaries - an evidence-backed portrait for resume material, plus a prompt hint and tools that let the model consult it on demand. |
| 300 | [qipengxiang/dsh-cc-switch-bridge](https://github.com/qipengxiang/dsh-cc-switch-bridge) | 0 | 2026-10-19 | 2026-10-20 | CC-Switch中配置的模型可以在dsh中使用 |
| 301 | [qiufengsir/dsh-zhijian-reader](https://github.com/qiufengsir/dsh-zhijian-reader) | 0 | 2026-10-19 | 2026-10-20 | 纸间：DeepSeek Harness 本地小说阅读器侧栏插件 |
| 302 | [qqmqq/dsh-skill-on-demand](https://github.com/qqmqq/dsh-skill-on-demand) | 0 | 2026-10-20 | 2026-10-20 | DSH plugin: keeps the session skill catalog out of every request — skills are listed on demand, the ones a task needs are recorded once, and only a picked skill is loaded by name. |
| 303 | [quberi/quberi](https://github.com/quberi/quberi) | 0 | 2026-10-15 | 2026-10-20 | AI knowledge base with document-level permissions: per-document access rules, deny wins, filtered inside the vector index. Not per-space. |
| 304 | [qzwjer/dsh-model-switches](https://github.com/qzwjer/dsh-model-switches) | 0 | 2026-10-20 | 2026-10-20 | DeepSeek Harness plugin: per-provider and per-model switches for the composer model picker. Switch a provider or a single model off and it stops being offered; routing and running sessions are untouched. |
| 305 | [rainerh81399/opencode2dsh](https://github.com/rainerh81399/opencode2dsh) | 0 | 2026-10-20 | 2026-10-20 | DSH plugin — free OpenCode Zen models for DeepSeek Harness (DSH). Free LLM API, no API key needed. 在 DSH 中使用 OpenCode Zen 免费模型，无需 API key |
| 306 | [rajcampbell39/opencode2dsh](https://github.com/rajcampbell39/opencode2dsh) | 0 | 2026-10-20 | 2026-10-20 | DSH plugin — free OpenCode Zen models for DeepSeek Harness (DSH). Free LLM API, no API key needed. 在 DSH 中使用 OpenCode Zen 免费模型，无需 API key |
| 307 | [ramwin/dsh-branch-cleaner](https://github.com/ramwin/dsh-branch-cleaner) | 0 | 2026-10-20 | 2026-10-20 | 冗余分支清理插件 (Branch cleaner for DeepSeek Harness): 找出已合并/已 squash 合并/已 rebase 落地/上游已删/PR 已合并的 git 分支, 默认只报告, 删除前自动备份. Detect and delete stale merged branches in DSH. |
| 308 | [RiddanceY/dsh-panel-collapse](https://github.com/RiddanceY/dsh-panel-collapse) | 0 | 2026-10-20 | 2026-10-20 | Adds a footer button to the DeepSeek Harness sidebar that collapses or expands the global panel list. |
| 309 | [rivenshanghai/dsh-toomuch-plugins](https://github.com/rivenshanghai/dsh-toomuch-plugins) | 0 | 2026-10-20 | 2026-10-20 | 给 DSH Web 侧栏腾点地方。 Too many DSH plugins, too little room. |
| 310 | [rootAyaka/dsh-think-command](https://github.com/rootAyaka/dsh-think-command) | 0 | 2026-10-20 | 2026-10-20 | DeepSeek Harness 插件：在聊天里用 /think 查看或切换当前会话的思考等级（Web 指令适配器 + QQ 机器人通道） |
| 311 | [RZ-0410/dsh-theme-quartet](https://github.com/RZ-0410/dsh-theme-quartet) | 0 | 2026-10-20 | 2026-10-20 | 四套可切换的 DeepSeek Harness 界面皮肤（樱风 / 褐东风 / 潮汐 / 月壤），纯设计令牌覆盖，不改宿主源码 · Four switchable theme skins for the DeepSeek Harness web UI |
| 312 | [Sakana07X/dsh-plugin-team-subagent-control](https://github.com/Sakana07X/dsh-plugin-team-subagent-control) | 0 | 2026-10-20 | 2026-10-20 | 为 DeepSeek Desktop 的 Agent Teams 提供成员级模型/思考强度路由，并允许主对话释放（删除）团队成员子智能体运行实例。 |
| 313 | [SakuraMat0u/dsh-douyin-toolkit](https://github.com/SakuraMat0u/dsh-douyin-toolkit) | 0 | 2026-10-20 | 2026-10-20 | Douyin tools for DeepSeek Harness: dy-cli reads with an Edge XHR fallback, QR/SMS login state machine, account fingerprint, guarded comment. |
| 314 | [SakuraYH1080/dsh-quick-restart](https://github.com/SakuraYH1080/dsh-quick-restart) | 0 | 2026-10-20 | 2026-10-20 | One-click Quick Restart for DSH Desktop: quits and relaunches the app from the account menu. |
| 315 | [sendya/dsh-provider-mgoole](https://github.com/sendya/dsh-provider-mgoole) | 0 | 2026-10-20 | 2026-10-20 | DeepSeek Harness plugin: adds the 芒果AI (mangoai-official) OpenAI-compatible provider to the native Models settings card on enable, removes it on disable |
| 316 | [sensen-jo/dsh-plugin-goal-map](https://github.com/sensen-jo/dsh-plugin-goal-map) | 0 | 2026-10-20 | 2026-10-20 | Goal Map for DeepSeek Harness: read-only goal-to-plan progress route and session mindmap. |
| 317 | [seraphinaDong/dsh-marginalia](https://github.com/seraphinaDong/dsh-marginalia) | 0 | 2026-10-20 | 2026-10-20 | Marginal notes for DSH. Mark assistant replies in the conversation and keep them as notes. |
| 318 | [SereneJi/dsh-abacus](https://github.com/SereneJi/dsh-abacus) | 0 | 2026-10-18 | 2026-10-20 | DeepSeek Harness 用量统计插件：侧边栏今日用量卡片、当前对话 token 数、按供应商与模型的明细、账户余额与套餐额度、余量提醒、历史用量补录。 |
| 319 | [Shen-18/dsh-ofm-balance](https://github.com/Shen-18/dsh-ofm-balance) | 0 | 2026-10-20 | 2026-10-20 | OFM 额度 — 在 DSH 侧栏显示 Our Free Model 网关各渠道的剩余额度。列出网关支持的全部渠道，已配置的默认显示，可在插件详情页按渠道开关。 / Show per-channel credit balances of the Our Free Model gateway in the DSH sidebar. |
| 320 | [shenderson045/dsh-noema](https://github.com/shenderson045/dsh-noema) | 0 | 2026-10-19 | 2026-10-20 | Noema long-term memory plugin for DSH: durable, inspectable agent memory with recall tools and a settings page. |
| 321 | [ShingStars/dsh-bili-models-legacy](https://github.com/ShingStars/dsh-bili-models-legacy) | 0 | 2026-10-19 | 2026-10-20 | dsh-bili-scroll 的社区分支：每轮可选任意 DSH 注册模型（含免费模型）、宿主内固定会话运行、多人私信/@、特别关注 UP 主新视频通知、设置页重做。A community fork of dsh-bili-scroll. |
| 322 | [ShokouP/dsh-tea-party-mode](https://github.com/ShokouP/dsh-tea-party-mode) | 0 | 2026-10-20 | 2026-10-20 | 角色茶话会模式 \| Character Tea Party Agent preset for DeepSeek Harness (dsh): 8 LLM-girls roleplay around a tea table + per-message speaker avatars |
| 323 | [ShokouP/dsh-theme-liuguang](https://github.com/ShokouP/dsh-theme-liuguang) | 0 | 2026-10-20 | 2026-10-20 | Liuguang 琉光 — DeepSeek Harness skin/theme (DSH): liquid glass + Soviet constructivism, switchable; personalization panel, CSS skin packs, whale-girl pet. |
| 324 | [SHW-bit/dsh-font-adjust](https://github.com/SHW-bit/dsh-font-adjust) | 0 | 2026-10-20 | 2026-10-20 | DSH 字体调整插件：字号、字体、字重、行高、文字颜色，实时预览、保存、恢复默认。 |
| 325 | [SilverLark257/move45clock](https://github.com/SilverLark257/move45clock) | 0 | 2026-10-18 | 2026-10-20 | 一个会催你“起来动一动”的 DSH 健康钟：45 分钟工作计时、12 套休息计划、夜间提醒、语音播报。 |
| 326 | [siripornjames148/flameox](https://github.com/siripornjames148/flameox) | 0 | 2026-10-20 | 2026-10-20 | Runtime evidence that helps agents trace, profile, and burn down hotspots in application and native code, GPU kernels, and inference stacks. |
| 327 | [SiriusWJ/dsh-screenshot-button](https://github.com/SiriusWJ/dsh-screenshot-button) | 0 | 2026-10-20 | 2026-10-20 | 在 DSH 输入面板下方添加截图按钮：点击调用系统自带截图工具（Windows/macOS/Linux），截图后 Ctrl+V 粘贴进输入框 |
| 328 | [sjdhdbbf/dsh-drawai-vectorizer](https://github.com/sjdhdbbf/dsh-drawai-vectorizer) | 0 | 2026-10-20 | 2026-10-20 | DSH 右侧栏可编辑画布 + AI 绘图工具的增强 fork：新增 vtracer 高质量矢量化引擎（贝塞尔样条 / 每通道位深 / 一半核心并行） |
| 329 | [skystart233-code/dsh-codex-usage-board](https://github.com/skystart233-code/dsh-codex-usage-board) | 0 | 2026-10-20 | 2026-10-20 | 🫡 把 DSH 挤成 Codex 的形状：设置页里的用量看板——Token 热力图、常用工具、技能与近 30 天明细，数据来自本机会话日志。 |
| 330 | [sLewandowski18382/dsh-permission-rules](https://github.com/sLewandowski18382/dsh-permission-rules) | 0 | 2026-10-20 | 2026-10-20 | Claude Code-style declarative permission rules for DeepSeek Harness: ordered allow/deny/ask rules with tool-name, argument (glob/regex), and workspace-path matching on the tools/pre-execute waterfall, session-log audit, and HMR reload. |
| 331 | [snowfoxHQ/dsh-hmr](https://github.com/snowfoxHQ/dsh-hmr) | 0 | 2026-10-20 | 2026-10-20 | dsh-Hestia Memory Runtime — cognitive memory plugin for DeepSeek Harness (HMR): reasoning chains, reflection, self-evolution. Monorepo: dsh-hmr + @dsh-hmr/hmr-client |
| 332 | [SophieThompson34447/engramory](https://github.com/SophieThompson34447/engramory) | 0 | 2026-10-20 | 2026-10-20 | A portable memory protocol for AI agents — load it as standing rules; a curation discipline + reference spec + optional cap hook. |
| 333 | [sqhc/dsh-rea](https://github.com/sqhc/dsh-rea) | 0 | 2026-10-20 | 2026-10-20 | Unofficial DeepSeek Harness bundle that connects the REA reverse-engineering MCP server. |
| 334 | [SquirtiPelzig/dsh-locale-ru](https://github.com/SquirtiPelzig/dsh-locale-ru) | 0 | 2026-10-20 | 2026-10-20 | Russian (ru) language pack for the DeepSeek Harness web UI - 63 namespaces, 2730 strings |
| 335 | [Steven-Qiang/dsh-pwsh-guard](https://github.com/Steven-Qiang/dsh-pwsh-guard) | 0 | 2026-10-20 | 2026-10-20 | DSH (DeepSeek Harness) plugin: reject shell text I/O - Select-String, Get-Content, findstr, rg, cat, node -e - in pwsh/bash/ops_bash, and point the agent at read/grep/glob. |
| 336 | [SUJIElearning/zhaoyu-sensenova-duokey](https://github.com/SUJIElearning/zhaoyu-sensenova-duokey) | 0 | 2026-10-20 | 2026-10-20 | 多 key 轮询脚本，改善限流问题。 |
| 337 | [sunwindy91/dsh-tool-baixiaochun](https://github.com/sunwindy91/dsh-tool-baixiaochun) | 0 | 2026-08-18 | 2026-10-20 | 白小纯修仙工具插件 —— DSH (Cordis) 插件：今日灵签/灵气检测/修为汇报 |
| 338 | [sunwindy91/dsh-tool-meta](https://github.com/sunwindy91/dsh-tool-meta) | 0 | 2026-09-13 | 2026-10-20 | 自进化元认知引擎：观测 agent 工具失败 → 反思 → 自动沉淀 SKILL → 下次自动滋养（跑在 DSH 官方接口上，零私有格式） |
| 339 | [tangyixiao/dsh-zcode-plan-bridge](https://github.com/tangyixiao/dsh-zcode-plan-bridge) | 0 | 2026-10-16 | 2026-10-20 | DSH 插件：把模型请求经 ZCode 客户端 app-server 反代到 Start Plan 额度（GLM 系列，真流式）。kyle123740/dsh-zcode-cli-proxy 衍生版，默认清单补上 GLM-5.3。 |
| 340 | [tayunchuan/dsh-session-delete](https://github.com/tayunchuan/dsh-session-delete) | 0 | 2026-10-20 | 2026-10-20 | DeepSeek Harness plugin: a DeepSeek-web-style red Delete row in the sidebar session menu. |
| 341 | [tinyblckc0000al/dsh-deepworker](https://github.com/tinyblckc0000al/dsh-deepworker) | 0 | 2026-10-20 | 2026-10-20 | DeepWorker — 把 DSH 变成更便捷、更沉浸的工作台。基于dsh底层功能针对日常需求集成多个“一键触达”。会话操作 （任意轮次：重试、编辑、引用、模式新建、分支）/ 笔记 / 摘要 / 查找 / 会话专注锁 / 工作区命令执行按钮。 |
| 342 | [TorRient/dsh-okf](https://github.com/TorRient/dsh-okf) | 0 | 2026-10-20 | 2026-10-20 | DeepSeek Harness (DSH) plugin for Open Knowledge Format (OKF v0.2) - linter, agent tools, skill prompt, and interactive graph visualizer |
| 343 | [tucker00752/seektty](https://github.com/tucker00752/seektty) | 0 | 2026-10-19 | 2026-10-20 | 面向 DeepSeek Harness 的 Claude Code 风格终端界面，支持 Windows、macOS 与 Linux，兼容透明终端、VS Code 主题和自定义配色。 |
| 344 | [vb2250158/dsh-waimai](https://github.com/vb2250158/dsh-waimai) | 0 | 2026-10-10 | 2026-10-20 | Browse Taobao Instant Commerce and Hema addresses, menus and orders, confirm cart quotes and open official payment pages. |
| 345 | [vlln/dsh-pancha](https://github.com/vlln/dsh-pancha) | 0 | 2026-10-19 | 2026-10-20 | 盘查：把磁盘变成一张可审查、可批注、可执行的盘面，Agent 标注、你来做决定（DeepSeek Harness 插件） |
| 346 | [vlln/dsh-share-link](https://github.com/vlln/dsh-share-link) | 0 | 2026-10-20 | 2026-10-20 | 把会话或产物发布成只读公网链接：对话快照、HTML/Markdown 产物，可换风格、可撤销。 |
| 347 | [vlln/dsh-video2text](https://github.com/vlln/dsh-video2text) | 0 | 2026-10-20 | 2026-10-20 | 视频链接转文案的 dsh 侧栏工作台：播放器 + 逐字稿 + 发布导出，自带 video2text skill |
| 348 | [WaldInsel/dsh-desktop-agent-bridge](https://github.com/WaldInsel/dsh-desktop-agent-bridge) | 0 | 2026-10-20 | 2026-10-20 | Let external agents collaborate inside your existing DeepSeek Harness desktop, with visible sessions and human control. |
| 349 | [wangcd1313/dsh-plugin-speak](https://github.com/wangcd1313/dsh-plugin-speak) | 0 | 2026-10-20 | 2026-10-20 | DSH（DeepSeek Harness）回答语音朗读插件：把回复念出来，切窗口/切会话立即停止，设置页可调 |
| 350 | [WangHaiLongWang/dsh-harness2](https://github.com/WangHaiLongWang/dsh-harness2) | 0 | 2026-10-19 | 2026-10-20 | 为 DeepSeek Harness 注入递归自化能力优化，以及可视化调整 |
| 351 | [wangxuewangxue98/dsh-daoyi-yijing](https://github.com/wangxuewangxue98/dsh-daoyi-yijing) | 0 | 2026-10-20 | 2026-10-20 | 道一-易经推演 · 通用决策评审 DSH 插件（决策辅助，非迷信）：六层加权聚合引擎（384爻→64卦→8宫→四象→三才→两仪→太极），纯 JS 零求解器依赖 |
| 352 | [wdx0614/dsh-restart-plugin](https://github.com/wdx0614/dsh-restart-plugin) | 0 | 2026-10-19 | 2026-10-20 | DSH 桌面版电源菜单：侧边栏一键「重启 DSH」/「关闭 DSH」。重启会自动重新打开应用，改完插件或配置不必再去托盘翻菜单。Windows/macOS，MIT。 |
| 353 | [Weidows/dsh-performance-optimizer](https://github.com/Weidows/dsh-performance-optimizer) | 0 | 2026-10-20 | 2026-10-20 | DSH bundle that exposes host-wide performance metrics (CPU / memory / IO) via a Settings tab, an optional HUD, and a native agent tool. |
| 354 | [whui5041-cloud/DSH-manjuhub](https://github.com/whui5041-cloud/DSH-manjuhub) | 0 | 2026-10-20 | 2026-10-20 | DSH 插件：AI 漫剧/短剧技能总控 —— 本机技能全览、GitHub 开源发现、一键安装更新与回滚 |
| 355 | [whybebabo/dsh-better-workspace](https://github.com/whybebabo/dsh-better-workspace) | 0 | 2026-10-19 | 2026-10-20 | DSH 侧边栏主题分组插件：工作区筛选、emoji 分组树、三级拖拽排序、批量归档与安全永久删除；叠加注入原生侧栏，不替换官方列表 |
| 356 | [Windfarer/dsh-wechat-ai-bridge](https://github.com/Windfarer/dsh-wechat-ai-bridge) | 0 | 2026-10-20 | 2026-10-20 | DeepSeek Harness ↔ WeChat bridge for the wechat-ai MCP server |
| 357 | [witthayaryu/jevcore](https://github.com/witthayaryu/jevcore) | 0 | 2026-10-20 | 2026-10-20 | TypeSafe Jev for DeepSeek Harness, the Model Context Protocol, and plain Node: typed judgments instead of prose, offline by default. |
| 358 | [wjf1/dsh-plugin-usage-analytics](https://github.com/wjf1/dsh-plugin-usage-analytics) | 0 | 2026-10-20 | 2026-10-20 | DSH 插件用量与能力看板：本地采集会话事件、聚合为日表、面板/HTTP 查询，默认 local 零出站。 |
| 359 | [wk-single/my-plugins](https://github.com/wk-single/my-plugins) | 0 | 2026-10-20 | 2026-10-20 | DeepSeek Harness 插件集合：可独立安装的 bundle，首个插件为全屏启动加载动画 Startup Splash。 |
| 360 | [wk544863858/dsh-plugin-magic-context](https://github.com/wk544863858/dsh-plugin-magic-context) | 0 | 2026-10-20 | 2026-10-20 | Magic Context for DeepSeek Harness: reversible context reclaim, an out-of-band historian, an m\[0\]/m\[1\] memory baseline, project memories, and the compaction seam. |
| 361 | [WnLfSwQ/dsh-qq-notify](https://github.com/WnLfSwQ/dsh-qq-notify) | 0 | 2026-10-20 | 2026-10-20 | DeepSeek Harness 插件：每次任务（turn）结束，通过 OneBot 11（NapCat）给 QQ 发一条「项目 + 对话」完成通知。零依赖、免构建。 |
| 362 | [Wolfgangn395/dsh-crew](https://github.com/Wolfgangn395/dsh-crew) | 0 | 2026-10-20 | 2026-10-20 | DeepSeek Harness (DSH) plugin: dispatch work to DSH agents from Claude Code / Codex — native subagent progress, in-host worker sessions with per-tier presets, and a multimodal bridge that lends the text-only harness vision and image generation. |
| 363 | [woody-dx/dsh-pdf-bookmarks](https://github.com/woody-dx/dsh-pdf-bookmarks) | 0 | 2026-10-20 | 2026-10-20 | PDF outline navigation and local reading bookmarks in the DeepSeek Harness right sidebar. |
| 364 | [wplct/dsh-codex-style-worktree](https://github.com/wplct/dsh-codex-style-worktree) | 0 | 2026-10-19 | 2026-10-20 | Codex 风格 Worktree：会话默认在独立 git worktree 中工作，输入框上可选择本地或工作树，清理有保护、删除前留可恢复快照。 |
| 365 | [wzwei1990/dsh-napcat](https://github.com/wzwei1990/dsh-napcat) | 0 | 2026-10-20 | 2026-10-20 | NapCat / OneBot 11 QQ channel plugin for DeepSeek Harness（QQ 通道：私聊/群聊、@门控、白名单、每会话独立 agent、长文分段） |
| 366 | [X-Xyy/dsh-auto-email](https://github.com/X-Xyy/dsh-auto-email) | 0 | 2026-10-13 | 2026-10-20 | 每日 AI 三报 · DSH 插件：每天定时抓取 10 个权威信源，语义聚类去重后由 LLM 打分，选出三条并附「事实/为什么重要/影响/存疑」四段解读，邮件推送 |
| 367 | [xbbkok/dsh-user-profile](https://github.com/xbbkok/dsh-user-profile) | 0 | 2026-10-20 | 2026-10-20 | Edit your own display name and avatar in DeepSeek Harness — shown in the sidebar account chip. ｜ DSH 插件：自定义用户名与头像。 |
| 368 | [xdsT2/dsh-composer-quick-actions](https://github.com/xdsT2/dsh-composer-quick-actions) | 0 | 2026-10-19 | 2026-10-20 | DSH 插件：把「文件 / 目标 / 计划 / 反馈」四个常用动作常驻到输入框工具栏 |
| 369 | [XEsx630/dsh-personal-settings](https://github.com/XEsx630/dsh-personal-settings) | 0 | 2026-10-20 | 2026-10-20 | One settings page for DeepSeek Harness: global instructions (~/.dsh/AGENTS.md) and long-term memory. |
| 370 | [XEsx630/dsh-turn-notify](https://github.com/XEsx630/dsh-turn-notify) | 0 | 2026-10-20 | 2026-10-20 | Native Windows toast and chime when a DeepSeek Harness turn completes. |
| 371 | [XEsx630/dsh-usage-stats](https://github.com/XEsx630/dsh-usage-stats) | 0 | 2026-10-20 | 2026-10-20 | All-session token usage statistics for DeepSeek Harness |
| 372 | [xfy2412/dsh-session-sync](https://github.com/xfy2412/dsh-session-sync) | 0 | 2026-10-19 | 2026-10-20 | 适用于dsh的会话同步插件及配套可自部署服务器 |
| 373 | [xiaoshenming/dsh-next-hint](https://github.com/xiaoshenming/dsh-next-hint) | 0 | 2026-10-20 | 2026-10-20 | Ghost-text next-prompt suggestions in the DeepSeek Harness composer — Tab to accept, never auto-sends. 回合结束后在输入框里推荐下一句话，按 Tab 采纳。 |
| 374 | [xiatian-wuhan/dsh-skills-hub](https://github.com/xiatian-wuhan/dsh-skills-hub) | 0 | 2026-10-20 | 2026-10-20 | deepseek harness skills 安装管理， 适配skill-sh openclaw等通用skill |
| 375 | [xiciyang/training-pretrain](https://github.com/xiciyang/training-pretrain) | 0 | 2026-10-20 | 2026-10-20 | @xiciyang/training-pretrain — DSH 训练插件：可独立安装，依赖 @xiciyang/* 共享库 |
| 376 | [xiciyang/training-qat](https://github.com/xiciyang/training-qat) | 0 | 2026-10-20 | 2026-10-20 | @xiciyang/training-qat — DSH 训练插件：可独立安装，依赖 @xiciyang/* 共享库 |
| 377 | [xiciyang/training-rl](https://github.com/xiciyang/training-rl) | 0 | 2026-10-20 | 2026-10-20 | @xiciyang/training-rl — DSH 训练插件：可独立安装，依赖 @xiciyang/* 共享库 |
| 378 | [xiciyang/training-sft](https://github.com/xiciyang/training-sft) | 0 | 2026-10-20 | 2026-10-20 | @xiciyang/training-sft — DSH 训练插件：可独立安装，依赖 @xiciyang/* 共享库 |
| 379 | [xiebrooooo/dsh-workbuddy-usage](https://github.com/xiebrooooo/dsh-workbuddy-usage) | 0 | 2026-10-20 | 2026-10-20 | DSH 侧栏用量插件：WorkBuddy/CodeBuddy 每日 Token、积分、按模型单价与账号剩余额度 |
| 380 | [xintingcui/dsh-sidebar-panels-fold](https://github.com/xintingcui/dsh-sidebar-panels-fold) | 0 | 2026-10-20 | 2026-10-20 | 把侧边栏左上角的全局面板条目折叠成一行，并可勾选「只显示哪几个」。手机端与桌面端同一套规则。 |
| 381 | [xulianglong-akk/dsh-lens](https://github.com/xulianglong-akk/dsh-lens) | 0 | 2026-10-20 | 2026-10-20 | Codex-style element annotation for DeepSeek Harness: Shift box selection, live style panel with from→to changes, Ctrl+click instant send, cross-page review sent as one message. |
| 382 | [xying-lm/dsh-memory-vault](https://github.com/xying-lm/dsh-memory-vault) | 0 | 2026-10-20 | 2026-10-20 | 5GB local long-term memory for DeepSeek Harness: SQLite/FTS5 auto-capture, per-turn recall injection, web panel. Zero runtime dependencies. |
| 383 | [yamada6184/rapid-mlx-dsh-provider](https://github.com/yamada6184/rapid-mlx-dsh-provider) | 0 | 2026-10-19 | 2026-10-20 | Native Rapid-MLX provider for DeepSeek Harness (dsh) — dsh reads model facts from the server instead of your settings.yaml. |
| 384 | [yang313760940/dsh-pomodoro](https://github.com/yang313760940/dsh-pomodoro) | 0 | 2026-10-20 | 2026-10-20 | DeepSeek Harness 番茄闹钟插件：三阶段番茄计时、结束提醒、统计，落盘持久化 |
| 385 | [yangsong608/dsh-file-editor](https://github.com/yangsong608/dsh-file-editor) | 0 | 2026-10-20 | 2026-10-20 | DSH 桌面版文件编辑器插件：打开、编辑、查看文件（独立实现，不依赖 OneEdit） |
| 386 | [yangsong608/dsh-moss-workbench](https://github.com/yangsong608/dsh-moss-workbench) | 0 | 2026-10-20 | 2026-10-20 | AI 研发工作台（DSH 插件）：MOSS 智能员工 + 可执行研发 DAG + 成本核算 + 产物审查 + 安全审计 + 个人工作台联动 |
| 387 | [yangsong608/dsh-portal](https://github.com/yangsong608/dsh-portal) | 0 | 2026-10-20 | 2026-10-20 | DSH 工作台门户插件：双宽瀑布墙首页 + 极光底图 + 快捷入口 |
| 388 | [yangsong608/dsh-startup-moss](https://github.com/yangsong608/dsh-startup-moss) | 0 | 2026-10-20 | 2026-10-20 | DeepSeek Harness 550W 核心终端：启动动画 + 同款主题 + 访问门口令 + 开机体检 |
| 389 | [yangsong608/dsh-workbench](https://github.com/yangsong608/dsh-workbench) | 0 | 2026-10-20 | 2026-10-20 | 个人工作台插件：任务 / 计划 / 专注 / 记事本 / Bug / 产品设计 / 测试 / 新闻（SQLite 本地库） |
| 390 | [Yannish93/deepseek-harness-mobile](https://github.com/Yannish93/deepseek-harness-mobile) | 0 | 2026-10-20 | 2026-10-20 | Android companion for DeepSeek Harness \| chat, goals, approvals &amp; notifications from your phone, over your LAN. Kotlin + Jetpack Compose. |
| 391 | [Yanze-He/dsh-sourcebook](https://github.com/Yanze-He/dsh-sourcebook) | 0 | 2026-10-20 | 2026-10-20 | Connect DeepSeek Harness to the local Sourcebook Desktop library via MCP. |
| 392 | [yeachofly/dsh-restart](https://github.com/yeachofly/dsh-restart) | 0 | 2026-10-20 | 2026-10-20 | One-click restart button for DeepSeek Harness · 为 DeepSeek Harness 提供侧栏一键重启按钮 |
| 393 | [yezitotempeace/dsh-auto-think](https://github.com/yezitotempeace/dsh-auto-think) | 0 | 2026-10-20 | 2026-10-20 | Auto-expand the assistant reasoning block while it streams and fold it back when done; both directions animate, the sidebar switch only controls the automation. |
| 394 | [ygunoil/dsh-va-studio](https://github.com/ygunoil/dsh-va-studio) | 0 | 2026-10-20 | 2026-10-20 | DeepSeek Harness plugin for VA Studio: generate short dramas, images, videos, novels and screenplays, and reverse-engineer prompts. |
| 395 | [yixing233/dsh-crabtodo](https://github.com/yixing233/dsh-crabtodo) | 0 | 2026-10-20 | 2026-10-20 | CrabTodo - persistent todo plugin for DeepSeek Harness: model-facing todo tools + web sidebar page. 持久化待办插件：模型工具 + Web 侧边栏。 |
| 396 | [Yoko368/flameox](https://github.com/Yoko368/flameox) | 0 | 2026-10-20 | 2026-10-20 | Runtime evidence that helps agents trace, profile, and burn down hotspots in application and native code, GPU kernels, and inference stacks. |
| 397 | [yongfanbeta/dsh-pomodoro](https://github.com/yongfanbeta/dsh-pomodoro) | 0 | 2026-10-09 | 2026-10-20 | Pomodoro timer plugin for DeepSeek Harness (DSH): classic 25/5/15 cycles, session/task association, standalone stats panel with a year heatmap, local persistence, CSV export. |
| 398 | [youxin484/qq-bridge-addons](https://github.com/youxin484/qq-bridge-addons) | 0 | 2026-10-20 | 2026-10-20 | qq-bridge 扩展：本地 GPT-SoVITS 动态语音 + B 站视频摘要（附 DSH 端口自愈） |
| 399 | [youyaemmm-pixel/dsh-custom-lists](https://github.com/youyaemmm-pixel/dsh-custom-lists) | 0 | 2026-10-20 | 2026-10-20 | 自定义列表：为 DeepSeek Harness 提供来源分类、分层模型导航及 Our Free Model 四类型目录。 |
| 400 | [YOYOLnFu/dsh-bili-pond](https://github.com/YOYOLnFu/dsh-bili-pond) | 0 | 2026-10-20 | 2026-10-20 | dsh-bili-pond · B站鱼塘  每天派鱼下去 B站 捞几条值得看的上来，写完日报 @ 你。 |
| 401 | [YUsaltyfish/dsh-onebot-qq](https://github.com/YUsaltyfish/dsh-onebot-qq) | 0 | 2026-10-20 | 2026-10-20 | DeepSeek Harness 的原生 QQ 机器人插件：微内核 + 9 个子插件，Linux/Windows 通用。收消息、发图、生图、发表情，装完就能聊。 |
| 402 | [YUsaltyfish/dsh-onebot-qq-opsgate](https://github.com/YUsaltyfish/dsh-onebot-qq-opsgate) | 0 | 2026-10-20 | 2026-10-20 | dsh-onebot-qq 的配套工具守卫：把 QQ 会话里不该出现的全局工具（ops_*/agent-team/MCP）挡掉 |
| 403 | [Yuuyuko-uu/dsh-qq-bridge](https://github.com/Yuuyuko-uu/dsh-qq-bridge) | 0 | 2026-10-20 | 2026-10-20 | 通到 QQ：DSH 里的 AI 伙伴和 QQ 双向互通 —— 它说完话自动发到 QQ，你在 QQ 说的话自动转进 DSH（走 OneBot 11 HTTP，NapCat / SnowLuma 都行） |
| 404 | [z1223473749/dsh-QiuYaTools](https://github.com/z1223473749/dsh-QiuYaTools) | 0 | 2026-10-20 | 2026-10-20 | QiuYa 增强工具箱：为 DeepSeek Harness 添加长文本附件、会话独立窗口、批量归档和计划批注。 |
| 405 | [zbc200205-spec/dsh-edge-bridge](https://github.com/zbc200205-spec/dsh-edge-bridge) | 0 | 2026-10-20 | 2026-10-20 | Let DeepSeek Harness drive your real Edge browser: 14 edge_* tools for page snapshot, click, type, scroll and screenshot. |
| 406 | [ZelotsNullzwei/whale-pod](https://github.com/ZelotsNullzwei/whale-pod) | 0 | 2026-10-18 | 2026-10-20 | DSH 插件：给 QQ 群加个会看场合的聊天机器人（NapCat 协议端 + OneBot v11 + LLM 网关） |
| 407 | [zengpu987-ctrl/dsh-wechat-daily](https://github.com/zengpu987-ctrl/dsh-wechat-daily) | 0 | 2026-10-19 | 2026-10-20 | DeepSeek Harness plugin: a Settings-resident WeChat daily report. Reads local WeChat 4.x databases read-only, ranks the day's chats, and separates what needs you from what to ignore. |
| 408 | [Zephinel/dsh-intelligent-ui](https://github.com/Zephinel/dsh-intelligent-ui) | 0 | 2026-10-20 | 2026-10-20 | Intelligent UI extension for DeepSeek Harness: render OpenUI Lang answers as interactive pages. |
| 409 | [zhaige95/dsh-no-need-workspace](https://github.com/zhaige95/dsh-no-need-workspace) | 0 | 2026-10-18 | 2026-10-20 | 可以不用选择工作空间直接开聊，dsh会自己根据当前时间在数据目录创建文件夹作为工作空间，参考workbuddy的原理。 |
| 410 | [zhangyuzhangyu233/dsh-status-monitor](https://github.com/zhangyuzhangyu233/dsh-status-monitor) | 0 | 2026-10-18 | 2026-10-20 | Status Monitor - a live status layer for the DeepSeek Harness sidebar: notification center, project/session states, live run steps, FLIP transitions, hand-crafted clear and accordion motion. |
| 411 | [zhangyuzhangyu233/dsh-windows-notification](https://github.com/zhangyuzhangyu233/dsh-windows-notification) | 0 | 2026-10-20 | 2026-10-20 | Native Windows toast notifications for DeepSeek Harness (DSH): smart turn summaries, actionable approvals and agent-question options under the DSH desktop app identity. 零依赖纯本机，可在通知里直接审批/回答。 |
| 412 | [zhaochengggg/dsh-a2ui-studio](https://github.com/zhaochengggg/dsh-a2ui-studio) | 0 | 2026-10-10 | 2026-10-20 | DSH A2UI Studio — let agents manage machines and apps, remember context, and create persistent A2UI-inspired interfaces. |
| 413 | [ZhenHaoFu810/alphaledger](https://github.com/ZhenHaoFu810/alphaledger) | 0 | 2026-10-20 | 2026-10-20 | A trial ledger for factor research: counts how many factors you have tried, and refuses to judge one without that number. MCP server + dsh plugin. |
| 414 | [zhenningTech-Cloud/dsh-wechat-shot](https://github.com/zhenningTech-Cloud/dsh-wechat-shot) | 0 | 2026-10-20 | 2026-10-20 | WeChat-style region screenshot button for the DeepSeek Harness composer (Windows). |
| 415 | [zhoulianghao000-web/-1-](https://github.com/zhoulianghao000-web/-1-) | 0 | 2026-10-20 | 2026-10-20 | Adversarial review console for DSH: independent red-team subagent + independent judge, 0-100 scoring with a 95 gate, four evidence images per round, unified redteam-console mode. |
| 416 | [zirscard/dsh-context-extract](https://github.com/zirscard/dsh-context-extract) | 0 | 2026-10-20 | 2026-10-20 | Context extraction and compression for DeepSeek Harness: one context_extract tool that turns long raw documents (financial reports, contracts, ledgers) into dense structured Markdown plus JSON - key metrics, tables, numbered clauses, entities and cross-check alerts. |
| 417 | [zirscard/dsh-macos-signfix](https://github.com/zirscard/dsh-macos-signfix) | 0 | 2026-10-20 | 2026-10-20 | macOS code-signing repair for DeepSeek Harness: one doc_ocr_sign_fix tool that diagnoses and fixes the condition where the bundled Python cannot load native extensions because of hardened runtime and library validation. |
| 418 | [zirscard/dsh-office-audit](https://github.com/zirscard/dsh-office-audit) | 0 | 2026-10-20 | 2026-10-20 | Financial-model and workbook auditor for DeepSeek Harness: one office_audit tool that recalculates formulas with the bundled LibreOffice Kit and runs static checks over the recalculated values - formula errors, broken references, hardcoded constants, format and unit mismatches, balance-sheet balance, cash tie-out, ratio-table conventions and data-c |
| 419 | [zirscard/dsh-principles-audit](https://github.com/zirscard/dsh-principles-audit) | 0 | 2026-10-20 | 2026-10-20 | Principle-library auditor for DeepSeek Harness: one principles_audit tool that checks a principle library for principle_id collisions, legacy ids, missing causal statements, boundaries, counter-examples or evidence, duplicate and near-duplicate principles, status-versus-confidence inconsistencies, stale entries and dimension-coverage gaps, then rep |
| 420 | [zirscard/dsh-taskboard-epic](https://github.com/zirscard/dsh-taskboard-epic) | 0 | 2026-10-20 | 2026-10-20 | Epic panel for DeepSeek Harness: a client-side plugin that stacks the epic cards of a dsh-taskboard project in their epic:children order and lets the order of the module arcs be rearranged by drag or button. |
| 421 | [zirscard/dsh-wind-finance](https://github.com/zirscard/dsh-wind-finance) | 0 | 2026-10-20 | 2026-10-20 | Wind financial-analysis capability as one standalone bundle: one wind_finance tool that routes a question to the right Wind data domain, executes it over the Wind meta-router MCP endpoint, and keeps a per-day receipt so the same dataset is not pulled twice against one shared daily quota. |
| 422 | [zirscard/dsh-workpaper-gate](https://github.com/zirscard/dsh-workpaper-gate) | 0 | 2026-10-20 | 2026-10-20 | Workpaper completeness gate for DeepSeek Harness: one workpaper_gate tool that audits a valuation workpaper set for completeness - both the target design/template itself and the instance-versus-template structure - with configurable rules, and returns blocker, warning and info findings. Read-only. |
| 423 | [zneoxlab/dsh-deepseek-webdesk](https://github.com/zneoxlab/dsh-deepseek-webdesk) | 0 | 2026-10-20 | 2026-10-20 | DeepSeek 网页工作台 for DSH — 在侧栏列出 DeepSeek 网页版会话，点开即用完整网页对话，支持接力到当前或新任务。 |
| 424 | [zwh9820-rgb/creator-canvas](https://github.com/zwh9820-rgb/creator-canvas) | 0 | 2026-10-20 | 2026-10-20 | Public |
| 425 | [zxh21149-commits/dsh-attention-center](https://github.com/zxh21149-commits/dsh-attention-center) | 0 | 2026-10-20 | 2026-10-20 | PTC 增强套件：跑在 run_code/SDK 上的「刨根问底」预设 + 跨会话答题与提醒的注意力中心 + dsh-ops 取证工具对齐。41 条单测通过。PTC suite for DeepSeek Harness. |
| 426 | [zyfgood/dsh-whale-girl](https://github.com/zyfgood/dsh-whale-girl) | 0 | 2026-10-20 | 2026-10-20 | DeepSeek Harness 插件：鲸鱼女孩桌宠。Agent 干活时游泳、等审批时敲玻璃、完成时庆祝；互动养成 + whale_say 工具，纯 SVG/CSS 动画零素材。 |
| 427 | [zz12hui/dsh-bili-video-summary](https://github.com/zz12hui/dsh-bili-video-summary) | 0 | 2026-10-20 | 2026-10-20 | B 站视频一键总结 DSH 插件：本地 faster-whisper 转写，自动生成解析 md 与一图读懂 PNG。 |
| 428 | [zz12hui/dsh-deai-audit](https://github.com/zz12hui/dsh-deai-audit) | 0 | 2026-10-20 | 2026-10-20 | DSH 工具插件：文案去 AI 味审计（六维评分 + 逐句打标 + 改法），对话中直接调用 deai_audit / deai_audit_config。 |
| 429 | [zz12hui/dsh-github-readme](https://github.com/zz12hui/dsh-github-readme) | 0 | 2026-10-20 | 2026-10-20 | DSH 工具插件：上传 GitHub 前把仓库 README 按统一版式优化——10 种首图风格随机配色、过程图生成、排版校验、带重试推送。 |

## 从快照消失的已核准仓库 / Approved repositories missing from the snapshot

已核准但已不在当前快照中（删除或改名），核实后从 [data/approved.json](../approved.json) 移除或更新名称。

Approved but no longer present in the current snapshot (deleted or renamed) — after checking, remove them from [data/approved.json](../approved.json) or update the name.

- BreakFree003/dsh-clinepass-deepseekv4.1
- corrinehu/dsh-buddy-checkin
- cwh-123456/dsh-handoff-bus
- CYEzero/dsh-style-setting
- dalekotsvet/dsh-soundcheck
- davidekingsss/dsh-screen-eye
- extremity2740938284-create/dsh-agent-sync
- extremity2740938284-create/dsh-github-flow
- fakeNihilist/dsh-plugin-usage-stats
- hellosky983/dsh-mc-agent
- hellosky983/dsh-mc-companion
- jingmei2/dsh-session-trash
- loopx-project/loopx
- ls-open/dsh-git-composer
- mengge237-labs/dsh-auto-continue
- mengge237-labs/dsh-composer-pro
- mengge237-labs/dsh-model-priority
- mytianyi0712/dsh-tui-plugin-OhMyPi
- qiufengsir/dsh-novel-reader
- rumilhz/dsh-pylon-opencode-free
- Salbt/my-dsh-desktop
- sam-midlight/dsh-loop-rescue
- SereneJi/dsh-usage-stat
- suzike/freestyle-dsh-theme
- VAST-AI-Research/Tripo3D-Plugin-dsh
- VibeDev-Si/dsh-ecosystem
- VibeDev-Si/dsh-media-viewer
- vlln/dsh-disk-canvas
- whisperflo/dsh-deepseek-console
- Zessi-C/dsh-model-thinking-levels
- zhangyuzhangyu233/dsh-pulse
- zhaochengggg/dsh-control-studio
