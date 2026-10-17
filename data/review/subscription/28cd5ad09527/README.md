# 600 个仓库分批来源核验结果

当前目录 600 个仓库的默认分支、明确安装来源与根 README 链接文档；不穷举历史版本、不执行安装、不作安全认证。部分需要包维护者修复或其他发行形式，来源核验完成不等于全部上架。

三批各 200 个；逐仓库证据 600/600；未解决读取错误 0。原始自动分类与人工分发结论分别保留。

固定输入：`28cd5ad095279591ebea4cf6c2c0b1c24412d5dc51f80267791a92b0d97d1b23`，见 [输入快照](feed.snapshot.json)。

| 结论 | 仓库数 |
| --- | ---: |
| 需补兼容声明 | 497 |
| 其他分发形式 | 13 |
| 开发模板/示例 | 3 |
| 发行方式暂缓 | 5 |
| 需封装标准 bundle | 3 |
| 需手动装配 | 8 |
| 映射已补齐 | 3 |
| Release 格式暂不支持 | 1 |
| 来源元数据已核实 | 65 |
| 包体超限 | 1 |
| 源码与发行包有缺口 | 1 |

## 本轮修正

- hellodigua/dsh-share：占位版本
- chinosk6/dsh-roleplay：指定标签不存在，保留 npm 和默认分支渠道
- shinjiyu/holdem：GitHub commit API 解析原短 SHA，固定原提交而非改为最新分支
- MochiNek0/dsh-web-search-free：需 pnpm；安装后接管网页搜索和抓取，至少配置一个搜索引擎的密钥或自建 SearXNG 地址。
- ZJU-LLMs/OpenStory：需 Python 3.11–3.13、Redis、本地 OpenStory 源码和模型配置；在设置中指定 Python 与 projectDir 后重启。该版本缺少 engines.dsh，暂不能进入订阅索引。
- morlay/dsh-plugin：仅收录有独立安装说明并核实 npm 产物的 better-session 聚合包；提供会话编辑、重试、撤回和分支。要求 DSH >=0.2.1-rc.1 <0.2.2，不支持 alpha.5；其余 profile 子包暂不批量映射。
- Player-MINEPIG/dsh-tavern：要求 DSH 0.2.1-rc.2；安装前停止目标 Host，安装后重启。从数据仍存于旧插件包内的版本升级时，应先使用上游安装脚本迁移/保留数据，不能直接覆盖。

## 分批记录

- [第一批 200 个](review-batch-1.md)
- [第二批 200 个](review-batch-2.md)
- [第三批 200 个](review-batch-3.md)
- [完整机器可读结论](review-results.json)
- [特殊分发形式复核](distribution-review.json)
- [原始自动取证汇总](summary.json)

后续处理：包维护者确认兼容范围后发布 engines.dsh；旧式模块需封装 bundle；Release-only 来源需提供可验证的 npm/Git 发行入口。我们不代填范围，不执行安装，也未向第三方发送消息。
