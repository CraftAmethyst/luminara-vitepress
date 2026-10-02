# stable/FeudalKings 构建与开发

本页记录面向 Minecraft `1.21.1` + NeoForge / Fabric 的 `stable/FeudalKings` 分支源码构建、测试与开发规范。日常服主部署请直接使用 [GitHub Releases](https://github.com/CraftAmethyst/Luminara/releases) 发布的预编译 Mod JAR。

## 环境要求

| 项目 | 要求 | 说明 |
| --- | --- | --- |
| 操作系统 | Linux / macOS / Windows | 支持 Bash、PowerShell 与 WSL |
| JDK | 64 位 JDK `21` | 项目使用 Java 21 Toolchain；支持 JDK 21 或 25 |
| Git | 2.x 或更高 | 发行构建任务依赖 Git 提交元数据 |
| 网络连接 | 能够访问 Fabric / NeoForge / Mojang / Spigot 等仓库 | 首次构建会自动运行 Spigot BuildTools 并拉取多平台依赖 |

## 获取源码

克隆仓库并检出 `stable/FeudalKings` 分支：

```bash
git clone https://github.com/CraftAmethyst/Luminara.git
cd Luminara
git checkout stable/FeudalKings
```

## 构建架构说明

FeudalKings 分支基于 **Architectury + Loom**（`dev.architectury.loom`）与 Gradleup Shadow 构建，具有以下特点：
- **标准 Server Mod 形态**：FeudalKings 主推标准服务端 Mod，编译后可直接置于 NeoForge 或 Fabric 服务端的 `mods/` 目录运行。
- **首次构建自动处理 Spigot**：Gradle 构建脚本中的 `ArclightGradlePlugin` 会在初次运行时自动下载 Spigot BuildTools，编译生成对应 Minecraft 1.21.1 的 Spigot 核心，并生成多平台重映射文件（SRG、Mojang、Intermediary 映射及继承表），随后缓存在项目中。首次构建需要较多网络和 CPU 资源，请耐心等待。

## 标准发行构建

使用项目内置的 Gradle Wrapper 执行构建任务：

### 1. 构建单个平台 Mod

::: code-group

```bash [构建 Fabric Mod]
./gradlew assembleFabricModDistribution
```

```bash [构建 NeoForge Mod]
./gradlew assembleNeoForgeModDistribution
```

:::

Windows 环境下请将 `./gradlew` 替换为 `.\gradlew.bat` 或 `gradlew.bat`。

### 2. 同时构建所有平台 Mod

::: code-group

```bash [Linux / macOS / WSL]
./gradlew assembleDistributions
```

```powershell [Windows PowerShell]
.\gradlew.bat assembleDistributions
```

```cmd [Windows cmd]
gradlew.bat assembleDistributions
```

:::

### 3. 收集产物 (`collect`)

执行 `collect` 任务可将所有构建出的分发包统一复制到 `build/libs/` 目录：

```bash
./gradlew collect
```

### 构建产物

构建完成后，独立的平台 Mod 文件位于根目录 `build/distributions/`（若运行了 `collect`，也会被收集到 `build/libs/`）：

```text
build/distributions/
├── luminara-fabric-1.21.1-1.0.15-beta.1.jar
└── luminara-neoforge-1.21.1-1.0.15-beta.1.jar
```

- **Fabric 产物**：为标准 Fabric Mod，部署时放入 Fabric 服务端的 `mods/` 目录，需同时搭配 Fabric API 与 `fabric-permissions-api`。
- **NeoForge 产物**：为标准 NeoForge Mod，部署时放入 NeoForge 服务端的 `mods/` 目录。NeoForge 产物通过 Jar-in-Jar 内部嵌套了 SnakeYAML 等必要库，避免与其他模组发生类命名空间冲突。

### 生成 SHA-256 校验码

构建完成后，可使用以下命令生成校验清单：

::: code-group

```bash [Linux / macOS]
sha256sum build/distributions/luminara-*.jar > build/distributions/SHA256SUMS
```

```powershell [Windows PowerShell]
Get-FileHash build\distributions\luminara-*.jar -Algorithm SHA256
```

:::

## 构建参数与属性

- **指定 Git Commit Hash (`luminaraGitHash`)**：发行任务默认通过 Git 命令自动提取当前提交短哈希。如在无 Git 环境或 CI 隔离容器中构建，可通过 Gradle 参数显式指定 7–40 位的十六进制 Commit Hash：

  ```bash
  ./gradlew assembleDistributions -PluminaraGitHash=a1b2c3d
  ```

- **可重现构建时间戳 (`SOURCE_DATE_EPOCH`)**：支持标准 `SOURCE_DATE_EPOCH` 环境变量，设置后将作为打包的归档时间戳，实现确定性与可重现构建。

- **使用本地 Maven (`useMavenLocal`)**：若需要使用本地已发布的依赖库，可传入 `-PuseMavenLocal=true`：

  ```bash
  ./gradlew assembleDistributions -PuseMavenLocal=true
  ```

## 静态契约校验与 CI 门禁

FeudalKings 提供了完整的发行契约静态门禁与单元测试套件：

### 1. Mod 契约校验 (`verifyDistributions`)

- **`verifyFabricModDistribution`**：
  - 校验产物文件名是否符合 `luminara-fabric-1.21.1-<version>.jar`。
  - 检查必须包含 `fabric.mod.json`、`mixins.arclight.fabric.json` 以及全部通用 Mixin（`core`、`bukkit`、`vanilla`、`impl.optimization`）。
  - 检查禁止包含 NeoForge 专用配置（`neoforge.mods.toml`、`mixins.arclight.neoforge.json`）及历史启动器残留。
- **`verifyNeoForgeModDistribution`**：
  - 校验产物文件名是否符合 `luminara-neoforge-1.21.1-<version>.jar`。
  - 检查必须包含 `META-INF/neoforge.mods.toml`、`mixins.arclight.neoforge.json`、`META-INF/jarjar/metadata.json` 及通用 Mixin。
  - 检查 Jar-in-Jar 规范：确认 SnakeYAML 以嵌套 Jar 形式打包，禁止以解压后的包目录（`org/yaml/snakeyaml/`）直接混入 Mod JAR 根目录，避免 NeoForge 运行时与其他模组的自动模块冲突。
  - 检查禁止包含 Fabric 专用配置及历史启动器残留。
- **`verifyDistributions`**：一键并行执行 Fabric 与 NeoForge 两者的 Mod 发行校验。

```bash
./gradlew verifyDistributions
```

### 2. 单元测试与契约测试 (`check`)

运行所有子模块的单元测试（包括 Paper 文本桥接、Mixin 结构验证、JUL 日志适配器、重映射器缓存、配置迁移与版本元数据测试）：

```bash
./gradlew check
```

### 3. 完整 CI 门禁

FeudalKings 分支持续集成（CI）推荐的标准全量校验流程：

::: code-group

```bash [Linux / macOS / WSL]
./gradlew check verifyDistributions verifyLauncherBoundaries collect --stacktrace
```

```powershell [Windows PowerShell]
.\gradlew.bat check verifyDistributions verifyLauncherBoundaries collect --stacktrace
```

```cmd [Windows cmd]
gradlew.bat check verifyDistributions verifyLauncherBoundaries collect --stacktrace
```

:::

## 过渡性 Legacy Launcher 构建（历史回退）

::: info 架构演进说明
FeudalKings 已全面转向标准服务端 Mod 体系（放入 `mods/` 即可）。历史 Launcher/Bootstrap 仅保留用于过渡性回退验证与回归基准，日常使用与部署强烈建议使用标准 Mod。
:::

如需构建历史启动器产物：

```bash
# 构建 Fabric 与 NeoForge 历史 Launcher
./gradlew assembleFabricLauncherDistribution assembleNeoForgeLauncherDistribution

# 验证 Launcher 契约与 EULA 边界
./gradlew verifyFabricLauncherDistribution verifyNeoForgeLauncherDistribution verifyLauncherBoundaries
```

构建出的 Launcher 位于 `build/distributions/launcher/`。

## 模块结构与边界

FeudalKings 模块组织如下：

- **`arclight-common`**：全平台通用兼容核心。
  - Bukkit/Spigot/Paper API 兼容实现与生命周期事件调度。
  - 通用 Mixin 与核心游戏逻辑补丁。
  - 动态重映射器（CraftBukkit Version Remapper）。
  - Bukkit `java.util.logging` (JUL) 到 Log4j 的路由桥接。
  - 通用抽象引导层（`AbstractBootstrap`、`AsyncCatcher`、`EnumTypeFactory` 等）。
- **`arclight-fabric`**：Fabric 平台端实现。
  - Fabric Mod 入口点（`ArclightModEntrypoint`）与平台 Mixin。
  - Fabric Permissions API 桥接适配。
  - Fabric Intermediary 映射与重映射配置。
- **`arclight-neoforge`**：NeoForge 平台端实现。
  - NeoForge Mod 入口与事件注册。
  - NeoForge 专属 Mixin 与命令树挂载。
  - SnakeYAML 2.2 的 Jar-in-Jar 嵌套打包任务（`BundleJarJarTask`）。
- **`i18n-config`**：配置与国际化系统。
  - `luminara.yml` 读写与自动迁移。
  - 多语言本地化支持与版本元数据属性。
- **`buildSrc`**：Gradle 构建插件与任务实现。
  - `ArclightGradlePlugin`：自动化 Spigot BuildTools 下载、编译与重映射。
  - `AssembleDistributionTask`、`VerifyModDistributionTask`、`VerifyDistributionTask`、`BundleJarJarTask` 等。
- **`bootstrap` & `installer`**：过渡性 Legacy Launcher 与安装器（保留作为兼容性基准）。

## 本地开发指南

1. **导入 IDE**：使用 IntelliJ IDEA 打开仓库根目录，由 Gradle 自动导入项目。Loom 和 Architectury 插件会自动配置多模块源码集与反混淆环境。
2. **确认 JDK**：请确保开发环境已配置 64 位 JDK 21，并在 IDEA 中将 Project SDK 与 Gradle JVM 统一指定为 Java 21。
3. **保持网络畅通**：首次构建与导入过程会触发 Spigot 源码下载与反编译重映射，切勿中途强制终止构建进程。若因网络中断导致缓存损坏，可清除 `arclight_cache/` 后重新构建。
4. **代码修改规范**：
   - 通用逻辑修改请放置在 `arclight-common`；仅平台专属行为分别放置在 `arclight-fabric` 或 `arclight-neoforge`。
   - 不要修改 `build/` 目录或自动生成的重映射文件。
   - 提交 PR 前请务必执行 `./gradlew check verifyDistributions` 确保所有契约门禁均绿灯通过。
