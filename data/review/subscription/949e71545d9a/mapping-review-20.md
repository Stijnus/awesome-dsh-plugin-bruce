# 第一批：20 个新增来源候选的安装方式复核

核对固定提交 README、真实 npm 安装包完整性与 Git 入口文件。14 条补映射，6 条明确暂缓；未执行插件安装或代码。版本范围保留作者原文，格式合格不等于 alpha.5 可安装。

| 仓库 | 处理 | 说明 |
| --- | --- | --- |
| c1overzz/dsh-bili-scroll | 补映射 | 安装后重启，在设置页安装 Python 主依赖并扫码登录 B 站；自动运行和评论需用户自行配置。 |
| HerTa-st/Herta-dsh | 补映射 | npm 包已包含主题和 preset；安装后完整重启。语音模型或云端密钥按需单独配置。 |
| yan-mc/dsh-normify | 暂缓 | 只文档化本地构建、压缩包和路径安装；声明 <0.2.0，不把源码 bundle 自动转为 alpha.5 可用远程安装。 |
| SiriLee/dsh-rewind | 补映射 | 上游要求选择匹配宿主的明确版本；0.16.0 声明 >=0.2.1-rc.1，不能视为支持 alpha.5。 |
| PerryLink/jevcore | 补映射 | 采用 README 推荐的 npm 包；0.4.1 的宿主声明不包含 alpha.5。源码子包还依赖 jevcore，不作为单独 Git 安装入口。 |
| gulagala001/oh-my-dsh | 暂缓 | 必须按宿主完整版本选择专用发布包；涉及 profile 权限默认值和额外安装说明，当前 rc.2 源码不能当作 alpha.5 通用入口。 |
| mrRisega/dsh-remote | 暂缓 | 官方使用 npx 专用安装器完成 bridge/账号/中继配置，单独安装发现的 web 子包不是完整方案。 |
| liceses/dsh-memes-reply | 补映射 | 采用已提交构建产物的固定 Git 提交；npm 命令在 README 中明确标为尚未发布。安装后需下载约 87 MB 素材并重启，桌面版使用应用内插件管理器。 |
| morlay/dsh-plugin | 暂缓 | 多 bundle 工作区，根 README 将安装说明分散到各子包；需逐子包核实发布与装配，不能把六个源码 bundle 批量当成单一插件。 |
| 1841220388zzzcccxxx-star/dsh-git-graph | 补映射 | 采用 README 的 Git 安装渠道并固定完整提交；README 中的 scoped npm 包返回 404，未收录该 npm 目标。 |
| PensiveFei/deep-read-summarize | 补映射 | 把 README 的 npm 安装并手动登记 bundle 步骤规范为宿主 plugin add；按输入类型配置 poppler、yt-dlp 或 uv 等工具。 |
| MoonlitDropOfBlood/dsh-token-stats | 暂缓 | 正式渠道只文档化 Release tarball；format-1 不支持直接 tarball，尚无已核实的等价 npm/Git 发行渠道。 |
| kenz1117/dsh-ui-usage-billing | 补映射 | 采用 README 指向的 npm 预览线并固定核实版本；旧 stable 线已冻结，安装前核对宿主版本。 |
| PerryLink/dsh-fast | 补映射 | 采用已发布 npm 包，避免 Git prepare 构建步骤；安装后重启，配置由插件提供。 |
| Across2005/harness-self-evolution-plugin | 暂缓 | 安装脚本按实际 DSH_HOME 注入配置，出厂 mount row 为 disabled；另声明 <0.2.0，直接安装源码不能替代脚本。 |
| SpookyWaste/dsh-bash-native | 补映射 | 仅适用于 Windows x64；安装后选择 Native Bash (Windows) preset，持久终端默认关闭。 |
| miuzel/dsh-graph | 补映射 | README 的 <name> 仅是 profile 占位符，web 是可替换示例；需要 Node >=22。 |
| Vncntvx/dsh-zotero | 补映射 | 需要 Zotero 7+ 并开启本地 API，写入需要 Zotero 10；采用 npm 包，不采用需本地构建的 main。 |
| SeverusZh/dsh-plugin-subagent-director | 补映射 | 采用含构建产物的 npm 包；0.6.0-beta.1 声明 >=0.2.1-rc.1，不代表支持 alpha.5。使用 /orchestrate 的会话卸载后存在恢复限制，见上游 README。 |
| ChongCyrus/Vibe-Mathematics | 补映射 | 采用上游明确支持的 Git 入口并固定完整提交；需要 pnpm，安装后重启。预设升级会替换受管内容，按上游说明保留手动修改。 |
