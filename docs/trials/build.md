# stable/Trials 构建与开发

本页记录面向 Minecraft `1.20.1` + Forge `47.x` 的 `stable/Trials` 分支源码构建、测试与开发规范。日常服主部署请直接使用 [GitHub Releases](https://github.com/CraftAmethyst/Luminara/releases) 发布的预编译 Mod JAR。

## 环境要求

| 项目 | 要求 | 说明 |
| --- | --- | --- |
| 操作系统 | Linux / macOS / Windows | 支持 Bash、PowerShell 与 WSL |
| JDK | 64 位 JDK `17` | 推荐 Eclipse Temurin 17 或 Zulu 17 |
| Git | 2.x 或更高 | 发行构建任务依赖 Git 提交元数据 |
| 网络连接 | 能够访问 Maven 仓库与 Forge 服务 | 首次构建需要拉取依赖与 Forge 资产 |

## 获取源码

克隆仓库并检出 `stable/Trials` 分支：

```bash
git clone https://github.com/CraftAmethyst/Luminara.git
cd Luminara
git checkout stable/Trials
```

## 标准发行构建

使用项目内置的 Gradle Wrapper 执行发行构建与静态契约校验：

::: code-group

```bash [Linux / macOS / WSL]
./gradlew check assembleForgeMod verifyForgeModDistribution
```

```powershell [Windows PowerShell]
.\gradlew.bat check assembleForgeMod verifyForgeModDistribution
```

```cmd [Windows cmd]
gradlew.bat check assembleForgeMod verifyForgeModDistribution
```

:::

### 构建产物

构建成功后，发行产物位于根目录 `build/distributions/`：

```text
build/distributions/
├── luminara-forge-1.20.1-1.0.15-hotfix.jar
└── luminara-forge-1.20.1-1.0.15-hotfix.jar.sha256
```

生成的 `.jar` 是标准的 Forge 服务端 Mod，直接放入 Dedicated Server 的 `mods/` 目录即可使用；`.sha256` 包含该产物的校验和。

### 构建参数

- **指定 Forge 版本**：默认情况下，构建脚本会通过 Forge Promotions API 自动解析 Minecraft 1.20.1 的 latest promotion 版本。如需锁定特定 Forge 版本，可传入 `-PforgeVersion`：

  ```bash
  ./gradlew assembleForgeMod -PforgeVersion=47.4.22
  ```

- **指定 Git Commit Hash**：发行构建默认通过 `git rev-parse --short HEAD` 读取提交哈希并写入元数据。在分离 HEAD 或自定义打包流程中，可手动传入 7–40 位的十六进制 Commit Hash：

  ```bash
  ./gradlew assembleForgeMod -PluminaraGitHash=a1b2c3d
  ```

## 静态校验与门禁

### Mod 契约校验 (`verifyForgeModDistribution`)

`verifyForgeModDistribution` 会在打包完成后解包并对 Mod JAR 进行静态白名单与黑名单检查：
- 确认包含 `META-INF/mods.toml`、`META-INF/accesstransformer.cfg`、`META-INF/luminara-version.properties` 等元数据。
- 确认包含全部核心 Mixin 配置（`mixins.arclight.core.json`、`bukkit.json`、`forge.json`、`compat.json`、`impl.forge.optimization.json`）。
- 确认 Manifest 包含 `MixinConnector: io.izzel.arclight.common.mod.ArclightConnector`。
- 确认没有遗留历史启动器（Legacy Launcher）类文件与配置。

### 运行环境冒烟测试 (`smokeServer`)

Trials 提供了真实的 Forge 服务端集成冒烟测试：

```bash
./gradlew smokeServer
```

`smokeServer` 任务会自动执行以下流程：
1. 下载并安装对应版本的干净 Forge Dedicated Server。
2. 将构建出的 Luminara Mod 挂载到 `mods/`，并注入专用的测试 Mod（`smokeModJar`）与测试 Bukkit 插件（`smokePluginJar`）。
3. 启动服务端进程，监听控制台输出并断言关键节点：
   - 服务端正常进入 `Done (...)`。
   - 测试 Mod 与测试插件正常启用并打出握手日志。
   - Bukkit API 核心调用正常。
   - JUL 到 Log4j 的日志路由桥接正常。
   - 核心枚举去 final 化（`Material`、`SpawnCategory`）生效。
   - `/luminara info` 与版本信息正确输出。

如果需要在测试完成后保留测试服务端的完整目录以便手动调试或检查日志，使用：

```bash
./gradlew runNativeForgeServer
```

### 完整校验门禁 (`verify`)

运行全部子模块测试、静态分发校验以及原生 Forge Dedicated Server 冒烟测试：

```bash
./gradlew verify
```

### 可重现构建检验 (`verifyReproducibleForgeMod`)

当修改依赖配置、归档打包逻辑或底层字节码重映射时，可运行可重现构建检验：

```bash
./gradlew verifyReproducibleForgeMod
```

该任务会在临时目录中重复执行两次独立构建，并逐字节比对 Forge Mod JAR 中的每一个 Entry。

## 模块结构与边界

Trials 分支包含以下主要模块：

- **`arclight-common`**：核心兼容层。包含 Bukkit/Spigot/Paper API 实现、通用 Mixin、事件分发桥接、服务端重映射与运行时支持。
- **`arclight-forge`**：Forge 平台端实现。负责 Forge 事件总线挂载、Forge 专属 Mixin、平台元数据及 Mod JAR 打包。
- **`i18n-config`**：配置与国际化系统。负责 `luminara.yml` 读写、版本元数据注入与多语言文本解析。
- **`buildSrc`**：项目专用的 Gradle 插件与自定义任务（包含 Spigot 生成、重映射、Forge 冒烟测试及打包校验任务）。

## 本地开发指南

1. **导入 IDE**：使用 IntelliJ IDEA 打开仓库根目录，选择通过 `settings.gradle` 导入 Gradle 项目，确认 JDK 设置为 17。
2. **源码边界**：
   - 优先在对应子模块的源码目录修改代码。
   - 切勿直接修改 `build/` 目录以及 `arclight-common/src/.../remapper/generated/` 下自动生成的类。
3. **提交与 PR 规范**：
   - 新增功能需提供相应的单元测试或集成测试用例。
   - 修复 Bug 时应提供能覆盖触发路径的回归验证。
   - 避免提交 IDE 配置文件（`.idea`、`*.iml`）、本地缓存和构建产物。
   - 提交 PR 时在说明中附带实际通过的 Gradle 校验命令（例如 `./gradlew verify`）。
