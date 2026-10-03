# stable/FeudalKings 构建与开发

本页记录面向 Minecraft `1.21.1` + NeoForge / Fabric 的 `stable/FeudalKings` 分支源码构建、测试与开发规范。日常服主部署请直接使用 [GitHub Releases](https://github.com/CraftAmethyst/Luminara/releases) 发布的预编译 Mod JAR。

## 环境要求

| 项目     | 要求                                                | 说明                                                  |
| -------- | --------------------------------------------------- | ----------------------------------------------------- |
| 操作系统 | Linux / macOS / Windows                             | 支持 Bash、PowerShell 与 WSL                          |
| JDK      | 64 位 JDK `21`                                      | 项目使用 Java 21 Toolchain；支持 JDK 21 或 25         |
| Git      | 2.x 或更高                                          | 发行构建任务依赖 Git 提交元数据                       |
| 网络连接 | 能够访问 Fabric / NeoForge / Mojang / Spigot 等仓库 | 首次构建会自动运行 Spigot BuildTools 并拉取多平台依赖 |

## 获取源码

克隆仓库并检出 `stable/FeudalKings` 分支：

```bash
git clone https://github.com/CraftAmethyst/Luminara.git
cd Luminara
git checkout stable/FeudalKings
```

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

- **可重现构建时间戳 (`SOURCE_DATE_EPOCH`)**：支持标准 `SOURCE_DATE_EPOCH` 环境变量，设置后将作为打包的归档时间戳。

- **使用本地 Maven (`useMavenLocal`)**：若需要使用本地已发布的依赖库，可传入 `-PuseMavenLocal=true`：

  ```bash
  ./gradlew assembleDistributions -PuseMavenLocal=true
  ```

## 静态约定校验与 CI 门禁

FeudalKings 提供了完整的发行约定静态门禁与单元测试套件：

### 1. Mod 约定校验 (`verifyDistributions`)

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

### 2. 单元测试与约定测试 (`check`)

运行所有子模块的单元测试：

```bash
./gradlew check
```

### 3. 完整 CI 门禁

FeudalKings CI 推荐的标准全量校验流程：

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

# 验证 Launcher 约定与 EULA 边界
./gradlew verifyFabricLauncherDistribution verifyNeoForgeLauncherDistribution verifyLauncherBoundaries
```

构建出的 Launcher 位于 `build/distributions/launcher/`。
