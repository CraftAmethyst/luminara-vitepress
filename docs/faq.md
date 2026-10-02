# 常见问题 FAQ

## Luminara 是 Paper 吗？

不是。Luminara 是 Forge 服务端 Mod，并提供 Bukkit/Spigot 以及少量常用 Paper API 的兼容层。Forge 模组放 `mods/`，Bukkit 插件放 `plugins/`，启动仍由 Forge 的 Dedicated Server 脚本负责。

## Trials 和 FeudalKings 应该选哪个？

如果你的整合包是 Minecraft `1.20.1`，选择 `stable/Trials`、Forge `47.x` 和 Java 17。如果是 Minecraft `1.21.1`，选择 `stable/FeudalKings`，再按整合包选择 NeoForge `21.1.x` 或 Fabric Loader `0.16.x`，并使用 Java 21 或 25。两个分支的 Mod 和启动器不能混用。

## 为什么不能直接运行 Luminara JAR？

构建产物是标准 Forge Mod，不是独立启动器。请先用 Forge Installer 安装服务端，再把 Luminara JAR 放入 `mods/`。

## `luminara.yml` 在哪里？

在服务端工作目录根目录，和 `server.properties` 同级。首次启动会自动生成。若没有生成，先检查 Forge 是否真的加载了 Luminara，以及启动脚本的工作目录是否正确。

## 我应该把插件放在哪里？

放到服务端根目录的 `plugins/`。插件目录也可以通过 Forge/服务端的 `--plugins` 参数调整，但默认就是 `plugins`。不要把 Bukkit 插件放入 `mods/`。

## 为什么插件提示缺少 Paper API？

当前实现只覆盖一部分常用 Paper API。优先使用同一插件的 Spigot API 版本；如果插件强依赖未实现的 Paper 专有功能，换用该插件、寻找兼容版本，或提交 Issue。

## 为什么启用 ServerCore、Connector 或 C2ME 后崩溃？

这些项目会修改与 Luminara 重叠的服务端、连接层或区块调度逻辑，属于已知不兼容范围。先移除它们确认问题，再参考[兼容性与性能建议](./guide/compatibility)选择替代方案。

## 为什么登录时提示 Velocity 签名或转发失败？

确认代理和后端都启用了现代转发，`forwarding-secret` 完全一致，`online-mode` 设置匹配，并且后端端口没有被玩家直接访问。排查时可以开启 `velocity.debug-logging`，修复后关闭。

## 如何确认实际运行版本？

服务器启动后执行 `/luminara info`。它会输出 Luminara 版本、Git 提交、Minecraft / Forge / Java、CraftBukkit 包名、Bukkit 版本、在线人数和 JVM 内存信息。

## 服务器启动后立刻崩溃怎么办？

先确认 Java 17、Minecraft 1.20.1、Forge 47.x 和 Luminara 构建目标一致；移除最近添加的 Mod/插件；保留完整的 `latest.log`、`debug.log` 和崩溃报告。不要反复删除配置和世界来“试启动”，先复制目录并在副本操作。

## 我该在哪里提问或报告 Bug？

可先查看本 FAQ、配置页和兼容性页。可复现的 Luminara 缺陷请提交 [GitHub Issue](https://github.com/CraftAmethyst/Luminara/issues)，并附支持矩阵、最小 Mod/插件列表、完整日志、复现步骤和 `/luminara info` 输出。一般使用问题可到 [Discord](https://discord.gg/xn8KGphcvS) 或 QQ 群 `929252864` 讨论。
