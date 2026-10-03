# 兼容性与性能建议

你需要知道的几个点：

- 任何的混合端都无法保证任何 Mod 与插件的绝对兼容。

- 任何的混合端都优先保证 Mod 兼容性，因为都是原生基于 Forge 服务端叠加的 Bukkit兼容层。

- Luminara 不是完整 Paper 实现。插件是否可用取决于它使用的 API、对原版行为的假设，以及是否与模组修改冲突。遇到问题时先在只安装 Luminara 的最小环境复现。

- 只是简单一味的堆砌 **过多的** 优化 Mod 通常无法提升服务器性能，尤其是现在越来越多 AI Slop 的优化 Mod 出现，使我们越来越难以甄别哪些优化 Mod 是有帮助的。 

- 若要最大限度地提升服务器性能，可以往下看 `大型整合包的优化` 部分。

## 已知兼容整合包

当 Luminara 准备发布稳定版时，都会选择版本热门整合包进行简单的兼容性测试（开服与进服）。

当 Luminara 已发布稳定版时，会随机挑选热门整合包部署到服务器上进行长期周目（大概 7 天 ~ 1 个月）测试。

以下是 Luminara 明确兼容的整合包：

| 整合包                                                                                         | 版本 / 加载器   | 模组兼容 | 插件兼容 |
| ---------------------------------------------------------------------------------------------- | --------------- | -------- | -------- |
| [All the Mods 10](https://www.curseforge.com/minecraft/modpacks/all-the-mods-10)               | 1.21.1 NeoForge | 🟢        | 🟢        |
| [Better MC [FABRIC] BMC3](https://www.curseforge.com/minecraft/modpacks/better-mc-fabric-bmc3) | 1.21.1 Fabric   | 🟢        | 🟡        |
| [All the Mods 9](https://www.curseforge.com/minecraft/modpacks/all-the-mods-9)                 | 1.20.1 Forge    | 🟢        | 🟢        |
| [落幕曲 Closing Song](https://www.mcmod.cn/modpack/1133.html)                                  | 1.20.1 Forge    | 🟢        | 🟢        |
| [GregTech Odyssey](https://gtodyssey.com/)                                                     | 1.20.1 Forge    | 🟢        | 🔴       |
| [香草纪元：食旅纪行 VanillaEra: FaresChron](https://www.mcmod.cn/modpack/1095.html)            | 1.20.1 Forge    | 🟢        | 🟡        |

- 🟢 **良好兼容** — 开箱即用，无已知冲突。
- 🟡 **有限兼容** — 可运行，但需附加条件（手动改配置、小功能缺失）。
- 🔴 **不兼容** — 存在硬冲突或功能缺失严重。
- ⚪ **不适用** — 该整合包不兼容大部分插件或所有插件。

如果你所游玩的整合包不在这个列表内，也没关系。因为这只是我们测试过的，你仍然可以尝试用 Luminara 开其他整合包的服务器，遇到了问题去发 Issue 或社区群求助就好。

## 已知不兼容模组

- [ServerCore](https://modrinth.com/mod/servercore)：其许多优化来自 Spigot 或 Paper，而 Luminara 已经在 Forge 服务端中提供 Bukkit/Spigot/Paper 兼容层，重复修改同一逻辑可能导致异常或崩溃。
- [Sinytra Connector](https://modrinth.com/mod/connector)：它用于连接 Forge 与 Fabric；Luminara 当前目标是 Forge + Bukkit/Spigot/Paper 兼容组合，不支持再叠加这一连接层。
- [C2ME Forge](https://www.curseforge.com/minecraft/mc-mods/concurent-chunk-management-engine-forge/d)：当前闭源实现无法针对 Luminara 的变换链修复兼容问题。需要加速区块生成时可测试 [FastChunkGen](https://www.curseforge.com/minecraft/mc-mods/fastchunkgen)。

## 已知不兼容插件类型

- 声称“自动优化服务器性能”的插件，例如 LaggRemover。此类插件经常与服务端自身调度冲突，收益也无法从名称推断。
- 反作弊插件，例如 GrimAC、Matrix、Vulcan。它们通常只按原版行为判断，可能误判模组物品、实体或交互。
- 强依赖 Paper API 的插件。Luminara 只实现一部分常用 Paper API，插件若调用未实现方法可能缺类、行为异常或崩溃。优先选择提供 Spigot API 版本的发行包。

这不是完整兼容清单。插件作者声称“支持 Paper”并不等于支持 Luminara；请先查看启动日志和插件依赖，再在备份服验证。

## 通用 / 大型整合包的优化

我们将模组数量 `≥300` 的整合包定性为大型整合包.

对大型整合包，Luminara 只明确兼容以下几个优化 Mod：

- [ModernFix](https://modrinth.com/mod/modernfix)
- [FerriteCore](https://modrinth.com/mod/ferrite-core)
- [Lithium](https://modrinth.com/mod/lithium) (1.21.1) 或 [Radium](https://modrinth.com/mod/radium) (1.20.1)

跑图生成负载较高时，可尝试：

- 对于 1.20.1： [FastNoise](https://modrinth.com/mod/zfastnoise) 与 [FastChunkGen](https://www.curseforge.com/minecraft/mc-mods/fastchunkgen)。
- 对于 1.21.1：[C2ME-NeoForge](https://modrinth.com/mod/c2me-neoforge) 或 [C2ME-Fabric](https://modrinth.com/mod/c2me-fabric)

## 小型或中型整合包

我们将模组数量 `≤299` 的整合包定性为中型整合包；模组数量 `≤150` 的定性为小型整合包。

如果目标是更激进的性能补丁，可尝试我们的下游项目 [PRTS-SERVER](https://github.com/ElainAwa/PRTS-SERVER)（仅 1.20.1，此项目的 1.21.1 直接基于 Arclight 进行开发，不基于 Luminara）。它适合小型到中型整合包；大型整合包推荐留在 Luminara 。

如果你希望仍然使用 Luminara，你仍然可以复用 `通用 / 大型整合包的优化` 所提到的几个优化 Mod。

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
