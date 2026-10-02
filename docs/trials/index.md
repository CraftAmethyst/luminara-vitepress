---
title: stable/Trials
description: Luminara stable/Trials 分支服主入口
---

# stable/Trials

## Minecraft 1.20.1 · Forge 47.x · Java 17

这是面向 Minecraft `1.20.1` 的 Forge 分支。Luminara 以 Forge Mod 形式运行，同时提供 Bukkit/Spigot 以及部分 Paper API 兼容能力。

### 适用环境

| 项目 | 要求 |
| --- | --- |
| Minecraft | `1.20.1` |
| Forge | `47.x`，生产环境建议按当前 Release 说明选择版本 |
| Java | 64 位 Java `17` |
| CraftBukkit | `v1_20_R1` |

### 开始部署

1. 从 [GitHub Releases](https://github.com/CraftAmethyst/Luminara/releases) 下载标注 `stable/Trials` 的二进制 Mod。
2. 按 [Trials 安装指南](./install) 安装 Forge Dedicated Server。
3. 将 Luminara 和其他 Forge 模组放入 `mods/`，将 Bukkit/Spigot 插件放入 `plugins/`。
4. 首次启动后检查 `luminara.yml`，并执行 `/luminara info` 核对版本。

如需从源码编译或参与开发，请参考 [Trials 构建与开发指南](./build)。公共配置、兼容性和 FAQ 请查看[通用文档](/guide/config)。
