# `stable/FeudalKings` 安装

`stable/FeudalKings` 是 Luminara 面向 Minecraft `1.21.1` 的分支。它与当前 `stable/Trials` 的 Minecraft `1.20.1` / Forge 环境相互独立，请按本页矩阵选择启动器和 Mod 文件。

## 支持矩阵

| 组件           | 要求                                      |
| -------------- | ----------------------------------------- |
| Minecraft      | `1.21.1`                                  |
| Java           | `21` 或 `25`，使用 64 位 JVM              |
| NeoForge       | `21.1.117` 或更高的 `21.1.x` 版本         |
| Fabric Loader  | `0.16.0` 或更高版本                       |
| Fabric API     | `0.115.0` 或更高版本（Fabric 服务端需要） |
| CraftBukkit 包 | `v1_21_R1`                                |

## 获取文件

从 [GitHub Releases](https://github.com/CraftAmethyst/Luminara/releases) 下载标注 `stable/FeudalKings`、`1.21.1` 或对应分支的构建产物。发布页同时提供 NeoForge 和 Fabric 所需文件，选择与加载器匹配的文件，并阅读该 Release 的兼容矩阵。

如果 Release 附带 SHA-256 文件，部署前校验：

::: code-group

```bash [Linux / macOS]
sha256sum luminara-*.jar
```

```powershell [Windows]
Get-FileHash .\luminara-*.jar -Algorithm SHA256
```

:::

## NeoForge 服务端

1. 访问 [NeoForge 官网](https://neoforged.net/)，选择 Minecraft `1.21.1`，下载 `21.1.x` Installer。
2. 在新的空目录执行安装：

   ```bash
   java -jar neoforge-21.1.x-installer.jar --installServer
   ```

   `21.1.x` 以实际下载文件名为准，最低要求为 `21.1.117`。

3. 创建 `eula.txt` 并写入 `eula=true`。
4. 将 FeudalKings 对应的 Luminara Mod 与 NeoForge 模组放入 `mods/`；Bukkit/Spigot 插件放入 `plugins/`。
5. 使用 NeoForge 生成的 `run.bat` 或 `run.sh` 启动，首次启动完成后检查根目录的 `luminara.yml`。

## Fabric 服务端

1. 准备 Minecraft `1.21.1` 的 Fabric Dedicated Server，使用 Fabric Loader `0.16.0` 或更高版本。
2. 将匹配 `1.21.1` 的 Fabric API（最低 `0.115.0`）和 FeudalKings 对应的 Luminara Mod 放入 `mods/`。
3. 创建 `eula.txt` 并写入 `eula=true`。
4. 将 Bukkit/Spigot 插件放入 `plugins/`，使用 Fabric 服务端启动脚本启动。

Fabric 与 NeoForge 的依赖文件不同。不要把 NeoForge 专用依赖或启动脚本复制到 Fabric 目录；以 Release 说明和整合包声明为准。

## 启动后检查

- 日志中的 Minecraft、平台、Java 和 Luminara 版本与本页矩阵一致。
- `/luminara info` 能够执行，并显示 CraftBukkit 包 `v1_21_R1`。
- 模组加载完成后再逐个启用插件，确认命令、世界加载和存档重启正常。

遇到问题时，先用只安装 Luminara、平台 API 和必要依赖的最小目录复现，再把其他模组和插件加回。报告问题时附上分支、平台（NeoForge 或 Fabric）、完整启动日志和 `/luminara info` 输出。
