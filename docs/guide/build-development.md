# 构建与开发

本页只记录源码开发所需的项目约定和 Gradle 入口。服主部署请直接使用 [GitHub Releases](https://github.com/CraftAmethyst/Luminara/releases) 的二进制文件。

## 分支矩阵

| 分支 | 目标 | 构建环境 |
| --- | --- | --- |
| `stable/Trials` | Minecraft `1.20.1` + Forge `47.x` | 64 位 JDK `17` |
| `stable/FeudalKings` | Minecraft `1.21.1` + NeoForge/Fabric | 64 位 JDK `21` 或 `25` |

两个分支的依赖和 Gradle 任务可能不同。以下命令以当前仓库 `stable/Trials` 为准；开发 FeudalKings 时应切换到该分支并以分支内脚本为准。

```bash
git clone https://github.com/CraftAmethyst/Luminara.git
cd Luminara
git checkout stable/Trials
```

## Trials 构建

使用 Wrapper 执行发行构建和静态校验：

```bash
./gradlew check assembleForgeMod verifyForgeModDistribution
```

Windows：

```powershell
.\gradlew.bat check assembleForgeMod verifyForgeModDistribution
```

产物：

```text
build/distributions/luminara-forge-1.20.1-1.0.15-hotfix.jar
build/distributions/luminara-forge-1.20.1-1.0.15-hotfix.jar.sha256
```

Forge 默认解析对应 Minecraft 的 latest promotion。固定版本时传入：

```bash
./gradlew assembleForgeMod -PforgeVersion=47.4.22
```

`verifyForgeModDistribution` 会检查 Mod 元数据、Mixin 配置、Manifest 和必要类；发行构建依赖 Git 提交信息。

## 运行验证

```bash
./gradlew smokeServer
```

`smokeServer` 会启动干净的 Forge Dedicated Server，并验证 Mod、测试插件、测试 Mod、Bukkit API、命令和版本信息。需要保留测试服务端目录时使用：

```bash
./gradlew runNativeForgeServer
```

完整门禁：

```bash
./gradlew verify
```

当归档元数据、依赖解析或构建输入发生变化时，补充运行：

```bash
./gradlew verifyReproducibleForgeMod
```

## 模块边界

- `arclight-common`：Bukkit/Spigot/Paper 兼容层、Mixin、服务端逻辑。
- `arclight-forge`：Forge Mod 打包与 Forge 侧集成。
- `i18n-config`：`luminara.yml`、本地化和版本元数据。
- `buildSrc`：Gradle 自定义任务与约定。

从 IntelliJ IDEA 打开仓库根目录即可按 `settings.gradle` 导入 Gradle 项目。优先修改源模块或生成器，不要直接编辑 `build/`、缓存文件或 `arclight-common/src/.../remapper/generated/` 下的生成代码。

## 开发约束

- 新行为补充对应模块测试；回归修复至少覆盖触发路径。
- 保持现有分支的 Minecraft、平台和 CraftBukkit 包版本，不跨分支复制产物。
- 不提交 `build/`、服务端状态、日志、缓存和 IDE 元数据。
- Pull Request 说明兼容性影响和实际执行过的 Gradle 命令。
