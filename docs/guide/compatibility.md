# 兼容性与性能建议

Luminara 同时加载 Forge 模组和 Bukkit/Spigot 插件，但不是完整 Paper 实现。插件是否可用取决于它使用的 API、对原版行为的假设，以及是否与模组修改冲突。遇到问题时先在只安装 Luminara 的最小环境复现。

## 已知不兼容模组

- [ServerCore](https://modrinth.com/mod/servercore)：其许多优化来自 Spigot 或 Paper，而 Luminara 已经在 Forge 服务端中提供 Bukkit/Spigot/Paper 兼容层，重复修改同一逻辑可能导致异常或崩溃。
- [Sinytra Connector](https://modrinth.com/mod/connector)：它用于连接 Forge 与 Fabric；Luminara 当前目标是 Forge + Bukkit/Spigot/Paper 兼容组合，不支持再叠加这一连接层。
- [C2ME Forge](https://www.curseforge.com/minecraft/mc-mods/concurent-chunk-management-engine-forge/d)：当前闭源实现无法针对 Luminara 的变换链修复兼容问题。需要加速区块生成时可测试 [FastChunkGen](https://www.curseforge.com/minecraft/mc-mods/fastchunkgen)。

## 已知不兼容插件类型

- 声称“自动优化服务器性能”的插件，例如 LaggRemover。此类插件经常与服务端自身调度冲突，收益也无法从名称推断。
- 反作弊插件，例如 GrimAC、Matrix、Vulcan。它们通常只按原版行为判断，可能误判模组物品、实体或交互。
- 强依赖 Paper API 的插件。Luminara 只实现一部分常用 Paper API，插件若调用未实现方法可能缺类、行为异常或崩溃。优先选择提供 Spigot API 版本的发行包。

这不是完整兼容清单。插件作者声称“支持 Paper”并不等于支持 Luminara；请先查看启动日志和插件依赖，再在备份服验证。

## 大型整合包的优化

对大型整合包，推荐从低风险的通用优化模组开始：

- [ModernFix](https://modrinth.com/mod/modernfix)
- [FerriteCore](https://modrinth.com/mod/ferrite-core)
- [Radium](https://modrinth.com/mod/radium)

探索和区块生成负载较高时，可测试 [FastNoise](https://modrinth.com/mod/zfastnoise) 与 [FastChunkGen](https://www.curseforge.com/minecraft/mc-mods/fastchunkgen)。一次只增加一个组件并记录 MSPT、启动日志和区块生成表现。

Luminara 的 `optimization` 选项不等于“全部打开就最快”。先保持默认值，在明确的瓶颈和可回滚备份下逐项调整。

## 小型或中型整合包

如果目标是更激进的性能补丁，可尝试我们的下游项目 [PRTS-SERVER](https://github.com/ElainAwa/PRTS-SERVER)（仅 1.20.1，此项目的 1.21.1 直接基于 Arclight 进行开发，不基于 Luminara）。它适合小型到中型整合包；大型整合包推荐留在 Luminara 。

## 排查顺序

1. 备份并复制服务端目录。
2. 暂时移除最近加入的 Mod 或插件，确认问题是否消失。
3. 检查 `latest.log`、`debug.log`、崩溃报告和 Forge Mod 列表。
4. 执行 `/luminara info`，核对实际版本信息。
5. 在最小复现环境中逐项加回 Mod 或插件。

### 最小化测试

找出有问题的 Mod 或插件后，在单独的 Forge 服务端或 Paper 服务端进行测试。

若仍失败，则是 Mod 或插件本体出现问题；若能正常运行，则是 Luminara 的问题，这时请在 [GitHub Issue](https://github.com/CraftAmethyst/Luminara/issues) 提交问题。

不要把“服务器能启动”当作标准，还要看看进服后是否正常。
