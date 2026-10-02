# stable/FeudalKings 安装

本页只适用于 Minecraft `1.21.1`。请先确定整合包使用 NeoForge 还是 Fabric。

## 1. 下载 Luminara

从 [GitHub Releases](https://github.com/CraftAmethyst/Luminara/releases) 下载与 `stable/FeudalKings`、Minecraft `1.21.1` 和目标平台匹配的二进制文件。若 Release 提供校验文件，使用以下命令核对：

```powershell
Get-FileHash .\luminara-*.jar -Algorithm SHA256
```

## 2. NeoForge

1. 在 [NeoForge 官网](https://neoforged.net/)选择 Minecraft `1.21.1`，下载 `21.1.x` Installer，最低为 `21.1.117`。
2. 在新的服务端目录运行：

   ```powershell
   java -jar neoforge-21.1.x-installer.jar --installServer
   ```

3. 创建 `eula.txt`，写入 `eula=true`。
4. 将 NeoForge 对应的 Luminara 和模组放入 `mods/`，插件放入 `plugins/`，使用 NeoForge 生成的启动脚本启动。

## 3. Fabric

1. 准备 Minecraft `1.21.1` 的 Fabric Dedicated Server，使用 Fabric Loader `0.16.0` 或更高版本。
2. 将 Fabric API `0.115.0` 或更高版本、FeudalKings 对应的 Luminara 和其他模组放入 `mods/`。
3. 创建 `eula.txt`，写入 `eula=true`，并将插件放入 `plugins/`。
4. 使用 Fabric 服务端启动脚本启动。

Fabric 和 NeoForge 的依赖不可互换。首次启动后确认根目录生成 `luminara.yml`，执行 `/luminara info`，并检查日志中的平台和 `v1_21_R1`。
