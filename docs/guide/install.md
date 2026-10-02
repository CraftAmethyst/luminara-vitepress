# 安装与首次启动

本页面向新建服和已有整合包目录的服主。当前文档对应 `stable/Trials`：Minecraft `1.20.1`、Forge `47.x`、Java `17`。源码中的 Mod 元数据要求 Minecraft `1.20.1`，并声明 Forge `47` 及以上；生产环境建议使用项目当前支持策略和发行说明中验证过的 Forge 版本 `47.4.22`。

## 准备环境

- 64 位 Java 17，并确认 `java -version` 输出为 17。
- 一个独立的服务端目录。不要直接在客户端 `.minecraft` 目录中安装。
- Minecraft 1.20.1 的 Forge Installer。
- Luminara Mod：从 [GitHub Releases](https://github.com/CraftAmethyst/Luminara/releases) 下载与 Minecraft、Forge 版本匹配的构建产物。

## 获取 Luminara Mod

优先使用 [Releases](https://github.com/CraftAmethyst/Luminara/releases) 中的二进制文件。当前 `stable/Trials` 目标为 Minecraft `1.20.1`、Forge `47.x`、Java `17`；下载后确认文件名和发行说明中的兼容矩阵，再将 Mod JAR 放入服务端的 `mods/`。

如果发行页同时提供 SHA-256 校验文件，建议在部署前校验下载文件：

::: code-group

```bash [Linux / macOS]
sha256sum luminara-forge-*.jar
```

```powershell [Windows]
Get-FileHash .\luminara-forge-*.jar -Algorithm SHA256
```

:::

校验值必须与 Release 附带的 `.sha256` 文件一致。

## 从源码构建 Mod（可选）

在 Luminara 源码根目录执行：

```bash
./gradlew assembleForgeMod
```

在 Windows 的 PowerShell、Git Bash 或 WSL 中同样使用 `./gradlew`；只有 cmd.exe 需要改用 `gradlew.bat`。

构建完成后，分发文件位于：

```text
build/distributions/luminara-forge-1.20.1-1.0.15-hotfix.jar
build/distributions/luminara-forge-1.20.1-1.0.15-hotfix.jar.sha256
```

构建需要访问 Maven、Forge 和 Gradle 依赖仓库。构建产物是普通 Forge Mod JAR，不需要额外的 Luminara 启动器。日常部署无需自行构建，除非你需要验证源码或使用自定义提交。

## 安装 Forge Dedicated Server

1. 从 [Forge 1.20.1 下载页](https://files.minecraftforge.net/net/minecraftforge/forge/index_1.20.1.html)下载 Installer。生产环境建议选择 `47.4.22`，或使用项目支持策略对应的当前 Forge promotion。
2. 将 Installer 放入新的空目录，在该目录执行：

   ```bash
   java -jar forge-1.20.1-47.4.22-installer.jar --installServer
   ```

   文件名以实际下载的 Forge 版本为准。
3. 首次启动前创建 `eula.txt`，确认已阅读并同意 Minecraft EULA：

   ```text
   eula=true
   ```

4. 创建 `mods` 和 `plugins` 目录（Forge 通常会自动创建 `mods`）：

   ```text
   server/
   ├─ mods/
   ├─ plugins/
   ├─ eula.txt
   ├─ server.properties
   └─ run.bat / run.sh
   ```

5. 将 Luminara Mod JAR 放入 `mods/`。Forge 模组也放入 `mods/`；Bukkit/Spigot 插件 JAR 放入 `plugins/`。
6. 使用 Forge 生成的启动脚本启动服务器。不要用 `java -jar luminara-*.jar` 直接启动 Mod。

::: tip 已有整合包
已有 Forge 服务端文件时，不需要重新安装 Forge。停止服务端并备份后，将 Luminara Mod 放入现有 `mods/`，插件放入 `plugins/`，然后按原整合包的启动脚本启动。
:::

## 首次启动检查

启动后确认：

1. 根目录生成 `luminara.yml`。
2. 控制台显示 Luminara 版本、Minecraft / Forge / Java 兼容性信息。
3. Forge 模组正常加载，插件没有出现在 `Failed to load plugin` 或类找不到错误中。
4. 服务器进入 `Done (...)` 后，在控制台或游戏内执行 `/luminara info`。

`/luminara` 基础权限为 2，`/luminara info` 会显示 Luminara 版本、Git 提交、Minecraft / Forge / Java、CraftBukkit 包名、在线人数和 JVM 内存信息。提交问题时请附上该命令输出和完整启动日志。

## 连接服务器

默认端口由 `server.properties` 的 `server-port` 决定，通常为 `25565`。如果 DNS 与端口已正确转发，可使用：

```text
lum.rimecraft.top
```

域名只是连接地址，不会替代端口映射、防火墙或代理配置。若你使用 Velocity，请按[配置解读](./config)中的现代转发章节配置后端。

## 安全停服与升级

- 使用控制台 `stop` 命令停服，避免直接杀进程造成世界或插件数据损坏。
- 升级前备份整个服务端目录，尤其是 `world*`、`mods/`、`plugins/`、`luminara.yml` 和配置文件。
- 不要跨 Minecraft 大版本复用世界、Forge 或插件组合。先在副本中验证启动和存档读写。
