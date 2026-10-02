---
title: stable/FeudalKings
description: Luminara stable/FeudalKings 分支服主入口
---

# stable/FeudalKings

## Minecraft 1.21.1 · NeoForge 或 Fabric · Java 21/25

这是面向 Minecraft `1.21.1` 的分支，支持 NeoForge 与 Fabric 两种服务端平台。

### 适用环境

| 项目 | 要求 |
| --- | --- |
| Minecraft | `1.21.1` |
| NeoForge | `21.1.117` 或更高的 `21.1.x` |
| Fabric Loader | `0.16.0` 或更高 |
| Fabric API | `0.115.0` 或更高，大多数 Fabric Mod 需要 |
| Java | 64 位 Java `21` 或 `25` |
| CraftBukkit | `v1_21_R1` |

### 开始部署

1. 从 [GitHub Releases](https://github.com/CraftAmethyst/Luminara/releases) 下载标注 `stable/FeudalKings`、`1.21.1` 的 JAR 文件。
2. 按 [FeudalKings 安装指南](./install)选择 NeoForge 或 Fabric 并完成安装。
3. 将对应平台的 Luminara 和模组放入 `mods/`，Bukkit/Spigot 插件放入 `plugins/`。
4. 首次启动后检查 `luminara.yml`，并执行 `/luminara info` 核对 `v1_21_R1`。

::: warning 不要混用分支
FeudalKings 只能使用 Minecraft `1.21.1`。Minecraft `1.20.1` Forge 环境请进入 [stable/Trials](/trials/)。
:::

如需从源码编译或参与开发，请参考 [FeudalKings 构建与开发指南](./build)。公共配置、兼容性和 FAQ 请查看[通用文档](/guide/config)。
