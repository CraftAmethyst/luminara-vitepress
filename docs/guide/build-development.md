# 构建与开发概览

本章节汇总 Luminara 各维护分支的源码构建、平台要求与开发约定。

::: tip 服主日常部署无需自行构建
生产部署请直接前往 [GitHub Releases](https://github.com/CraftAmethyst/Luminara/releases) 下载官方发布的预编译 Mod JAR 文件。自行构建仅适用于源码开发、二次定制或前沿特性验证。
:::

## 分支构建矩阵

Luminara 采用双分支并行维护策略，两个分支对应不同的 Minecraft 版本、加载器支持与 Java 工具链：

| 分支 | 目标平台 | 支持加载器 | JDK 版本 | 专有构建文档 |
| --- | --- | --- | --- | --- |
| **`stable/Trials`** | Minecraft `1.20.1` | Forge `47.x` | 64 位 JDK `17` | [进入 Trials 构建指南](/trials/build) |
| **`stable/FeudalKings`** | Minecraft `1.21.1` | NeoForge `21.1.x`<br>Fabric `0.16.x`+ | 64 位 JDK `21` / `25` | [进入 FeudalKings 构建指南](/feudalkings/build) |

::: warning 切勿混用分支与产物
- `Trials` 产物仅适用于 Minecraft 1.20.1 的 Forge 环境。
- `FeudalKings` 产物仅适用于 Minecraft 1.21.1 的 NeoForge 或 Fabric 环境。
- 两个分支的 Gradle 插件体系与构建任务不同，请按目标切换至对应分支检出代码并执行对应任务。
:::

## 分支构建入口

请根据需要开发的 Minecraft 版本进入对应分支的构建文档：

- 🛠️ **[stable/Trials 构建与开发指南](/trials/build)**
  - 核心任务：`./gradlew check assembleForgeMod verifyForgeModDistribution`
  - 包含原生 Dedicated Server 冒烟测试（`smokeServer`）与可重现构建验证（`verifyReproducibleForgeMod`）。
- 🛠️ **[stable/FeudalKings 构建与开发指南](/feudalkings/build)**
  - 核心任务：`./gradlew check verifyDistributions collect`
  - 支持分别/同时构建 Fabric Mod（`assembleFabricModDistribution`）与 NeoForge Mod（`assembleNeoForgeModDistribution`）。
  - 基于 Architectury + Loom 架构，集成 Spigot BuildTools 自动化重映射与 Jar-in-Jar 依赖封装。

## 通用开发规范

无论在哪个分支进行开发，请遵循以下通用项目规范：

1. **导入工程**：
   - 推荐使用 IntelliJ IDEA 打开仓库根目录，由 Gradle 自动导入多模块工程。
   - 确保 IDE 中配置的 Gradle JVM 和 Project SDK 符合目标分支的 JDK 要求（Trials 为 JDK 17，FeudalKings 为 JDK 21）。
2. **源码边界**：
   - 业务逻辑与兼容修改请编写在源码目录中。
   - 严禁提交 `build/`、`arclight_cache/`、IDE 元数据（`.idea`、`*.iml`）或自动生成的重映射源码。
3. **质量门禁**：
   - 为新功能补充单元测试；针对已修复的 Bug 补充回归测试。
   - 提交 Pull Request 前，请在本地完整运行对应分支的分发打包与契约校验任务，并在 PR 说明中注明实际通过的 Gradle 命令与测试结果。
