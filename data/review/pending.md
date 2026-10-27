# 待审核仓库 / Pending review

> 新增到 `dsh-plugin` Topic 下、带有简介、尚未经维护者核实的仓库。本文件由 `scripts/update.mjs` 每日刷新，仅供审核使用，不是用户可见页面。
>
> Repositories newly added to the `dsh-plugin` topic that the maintainer has not verified yet. Refreshed daily by `scripts/update.mjs`; review-only, not a user-facing page.

- 生成时间 / Generated: **2026-10-27**
- 快照日期 / Snapshot date: **2026-10-26 (UTC)**
- 待审核 / Pending: **7**
- 从快照消失的已核准仓库 / Approved repositories missing from the snapshot: **0**
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
| 1 | [dialling/dsh-graph-view](https://github.com/dialling/dsh-graph-view) | 1 | 2026-10-26 | 2026-10-26 | Cinematic 3D galaxy view for DeepSeek Harness — workspaces as suns, conversations as stars, plus a memory library and an armillary sphere. · DSH 三维星系图插件 |
| 2 | [2927683690myn-rgb/dsh-bili-subtitle](https://github.com/2927683690myn-rgb/dsh-bili-subtitle) | 0 | 2026-10-26 | 2026-10-26 | DeepSeek Harness 插件：直读 B 站官方 AI 字幕（WBI 签名 + 扫码登录），支持分 P、时间切片，md→PDF/DOCX 一键下载 |
| 3 | [bilbillm/dsh-startup-animation](https://github.com/bilbillm/dsh-startup-animation) | 0 | 2026-10-26 | 2026-10-26 | Six-second cinematic startup animation for DeepSeek Harness Desktop, with terminal-to-whale motion and optional startup audio. |
| 4 | [gghyoo/dsh-copy-image-menu](https://github.com/gghyoo/dsh-copy-image-menu) | 0 | 2026-10-26 | 2026-10-26 | DSH Web UI plugin: copy assistant Markdown or download a styled PNG image. |
| 5 | [O-OII/dsh-agent-activity](https://github.com/O-OII/dsh-agent-activity) | 0 | 2026-10-26 | 2026-10-26 | DSH 代理活动面板：实际模型、当前与上一轮任务，可选 DS 执行路由及中英文配置页。 |
| 6 | [O-OII/dsh-native-taskbar-badge](https://github.com/O-OII/dsh-native-taskbar-badge) | 0 | 2026-10-26 | 2026-10-26 | DSH Windows 原生任务栏数字角标：后台提醒、主会话去重、回窗清零，不改 ASAR；支持中英文。 |
| 7 | [railgun20001/dsh-session-hub](https://github.com/railgun20001/dsh-session-hub) | 0 | 2026-10-26 | 2026-10-26 | Session status hub for DeepSeek Harness: a top-titlebar rail of running / waiting / unread / failed Sessions, Windows toast notifications, and a red-yellow-green taskbar status dot. |

## 从快照消失的已核准仓库 / Approved repositories missing from the snapshot

已核准但已不在当前快照中（删除或改名），核实后从 [data/approved.json](../approved.json) 移除或更新名称。

Approved but no longer present in the current snapshot (deleted or renamed) — after checking, remove them from [data/approved.json](../approved.json) or update the name.

- （无 / none）
