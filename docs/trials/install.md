# stable/Trials 安装

本页只适用于 Minecraft `1.20.1`、Forge `47.x` 和 Java `17`。

## 1. 下载文件

从 [GitHub Releases](https://github.com/CraftAmethyst/Luminara/releases) 下载与 `stable/Trials`、Minecraft `1.20.1` 匹配的 Luminara Mod。若 Release 提供 `.sha256` 文件，部署前执行：

::: code-group

```bash [Linux / macOS]
sha256sum luminara-*.jar
```

```powershell [Windows]
Get-FileHash .\luminara-*.jar -Algorithm SHA256
```

:::

## 2. 安装 Forge

从 [Forge 1.20.1 下载页](https://files.minecraftforge.net/net/minecraftforge/forge/index_1.20.1.html)下载 Installer，在新的服务端目录执行：

```bash
java -jar forge-1.20.1-47.x.x-installer.jar --installServer
```

文件名以实际下载版本为准。创建 `eula.txt` 并写入 `eula=true`，再创建 `plugins/` 目录。

## 3. 放置 Mod 与插件

```text
server/
├─ mods/       # Luminara 与 Forge 模组
├─ plugins/    # Bukkit/Spigot 插件
├─ eula.txt
└─ server.properties
```

使用 Forge 生成的 `run.bat` 或 `run.sh` 启动，不要直接运行 Luminara Mod JAR。

## 4. 验证

确认根目录生成 `luminara.yml`，服务器进入 `Done (...)` 后执行 `/luminara info`。提交问题时附上完整日志、Mod/插件列表和该命令输出。

连接地址为 `lum.rimecraft.top`；端口、防火墙和代理仍需按 `server.properties` 及网络环境配置。
