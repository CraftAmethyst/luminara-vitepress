# 构建与开发概览

本章节汇总 Luminara 各维护分支的源码构建、平台要求与开发约定。

::: tip 服主日常部署无需自行构建
生产部署请直接前往 [GitHub Releases](https://github.com/CraftAmethyst/Luminara/releases) 下载官方发布的预编译 Mod JAR 文件。自行构建仅适用于源码开发、二次定制或前沿特性验证。
:::

## 分支构建矩阵

Luminara 采用双分支并行维护策略，两个分支对应不同的 Minecraft 版本、加载器支持与 Java 工具链：

| 分支                     | 目标平台           | 支持加载器                            | JDK 版本              | 专有构建文档                                    |
| ------------------------ | ------------------ | ------------------------------------- | --------------------- | ----------------------------------------------- |
| **`stable/Trials`**      | Minecraft `1.20.1` | Forge `47.x`                          | 64 位 JDK `17`        | [进入 Trials 构建指南](/trials/build)           |
| **`stable/FeudalKings`** | Minecraft `1.21.1` | NeoForge `21.1.x`<br>Fabric `0.16.x`+ | 64 位 JDK `21` / `25` | [进入 FeudalKings 构建指南](/feudalkings/build) |

::: warning 切勿混用分支与产物

- `Trials` 产物仅适用于 Minecraft 1.20.1 的 Forge 环境。
- `FeudalKings` 产物仅适用于 Minecraft 1.21.1 的 NeoForge 或 Fabric 环境。
- 两个分支的 Gradle 插件体系与构建任务不同，请按目标切换至对应分支检出代码并执行对应任务。
  :::

## 分支构建入口

请根据需要开发的 Minecraft 版本进入对应分支的构建文档：

- 🛠️ **[stable/Trials 构建与开发指南](/trials/build)**
- 🛠️ **[stable/FeudalKings 构建与开发指南](/feudalkings/build)**
