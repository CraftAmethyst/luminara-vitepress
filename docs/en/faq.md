# Frequently Asked Questions (FAQ)

## Is Luminara a Paper server?

No. Luminara is a Forge server mod that provides a compatibility layer for Bukkit/Spigot and a subset of commonly used Paper APIs. Forge mods go into `mods/`, Bukkit plugins go into `plugins/`, and server startup is still handled by the Forge Dedicated Server startup script.

## Which branch should I choose: Trials or FeudalKings?

If your modpack is for Minecraft `1.20.1`, choose `stable/Trials` with Forge `47.x` and Java 17. If it is for Minecraft `1.21.1`, choose `stable/FeudalKings`, then choose NeoForge `21.1.x` or Fabric Loader `0.16.x` depending on your modpack, and use Java 21 or 25. Mods and launchers from the two branches are not interchangeable.

## Why can't I run the Luminara JAR directly?

The build artifact is a standard Forge mod, not a standalone launcher. Please install the server using the Forge Installer first, then place the Luminara JAR into the `mods/` directory.

## Where is `luminara.yml` located?

It is located in the root of the server working directory, alongside `server.properties`. It will be automatically generated upon first launch. If it is not generated, check whether Forge actually loaded Luminara and whether the working directory in your startup script is correct.

## Where should I place plugins?

Place them in the `plugins/` directory at the server root. The plugin directory can also be customized via the Forge/server `--plugins` argument, but defaults to `plugins`. Do not place Bukkit plugins into `mods/`.

## Why does a plugin report missing Paper API?

The current implementation only covers a subset of frequently used Paper APIs. Prioritize using the Spigot API version of the plugin if available. If the plugin strictly depends on unimplemented Paper-exclusive APIs, consider switching plugins, looking for a compatible build, or submitting an issue.

## Why does the server crash after enabling ServerCore, Connector, or C2ME?

These projects modify server, networking, or chunk scheduling logic that overlaps with Luminara, and are known to be incompatible. Remove them first to verify, and refer to [Compatibility & Performance Suggestions](./guide/compatibility) for alternatives.

## Why does login fail with Velocity signature or forwarding errors?

Ensure modern forwarding is enabled on both the proxy and the backend, the `forwarding-secret` matches exactly, the `online-mode` settings are consistent, and players cannot directly access the backend port. You can temporarily enable `velocity.debug-logging` during troubleshooting and turn it off once resolved.

## How do I check the currently running version?

Run `/luminara info` after the server starts. It will output the Luminara version, Git commit hash, Minecraft / Forge / Java versions, CraftBukkit package name, Bukkit version, online player count, and JVM memory information.

## What should I do if the server crashes immediately upon startup?

First confirm that your Java 17, Minecraft 1.20.1, Forge 47.x, and Luminara build targets all match; remove recently added mods/plugins; preserve full `latest.log`, `debug.log`, and crash reports. Do not repeatedly delete configuration files and worlds to "retry" startup—always make a copy of the directory and test on the duplicate.

## Where can I ask questions or report bugs?

Review this FAQ, the configuration guide, and the compatibility page first. For reproducible Luminara bugs, submit a [GitHub Issue](https://github.com/CraftAmethyst/Luminara/issues) including your support matrix, minimal mod/plugin list, full logs, reproduction steps, and the output of `/luminara info`. General usage questions can be discussed on [Discord](https://discord.gg/xn8KGphcvS) or in the [QQ group 929252864](https://qm.qq.com/q/5S00vXfQpq).
