---
title: stable/FeudalKings
description: Luminara stable/FeudalKings branch server admin entry point
---

# stable/FeudalKings

## Minecraft 1.21.1 · NeoForge or Fabric · Java 21/25

This is the branch targeting Minecraft `1.21.1`, supporting both NeoForge and Fabric server platforms.

### Target Environment

| Item          | Requirement                                       |
| ------------- | ------------------------------------------------- |
| Minecraft     | `1.21.1`                                          |
| NeoForge      | `21.1.117` or higher `21.1.x`                     |
| Fabric Loader | `0.16.0` or higher                                |
| Fabric API    | `0.115.0` or higher, required by most Fabric mods |
| Java          | 64-bit Java `21` or `25`                          |
| CraftBukkit   | `v1_21_R1`                                        |

### Getting Started

1. Download JAR files labeled `stable/FeudalKings` and `1.21.1` from [GitHub Releases](https://github.com/CraftAmethyst/Luminara/releases).
2. Choose NeoForge or Fabric and complete installation per the [FeudalKings Installation Guide](./install).
3. Place platform-specific Luminara and mods into `mods/`, and Bukkit/Spigot plugins into `plugins/`.
4. After first startup, check `luminara.yml` and run `/luminara info` to verify `v1_21_R1`.

::: warning Do Not Mix Branches
FeudalKings only supports Minecraft `1.21.1`. For Minecraft `1.20.1` Forge environments, visit [stable/Trials](/en/trials/).
:::

If you need to build from source or contribute to development, please refer to the [FeudalKings Build & Development Guide](./build). For common configurations, compatibility, and FAQs, see [General Documentation](/en/guide/config).
