---
layout: home
hero:
  name: Luminara
  text: Cross-Platform Hybrid Server for Server Admins
  tagline: Select dedicated Trials or FeudalKings deployment entry points by Minecraft version
  image:
    src: /logo.png
    alt: Luminara logo
  actions:
    - theme: brand
      text: stable/Trials · 1.20.1
      link: /en/trials/
    - theme: alt
      text: stable/FeudalKings · 1.21.1
      link: /en/feudalkings/
    - theme: alt
      text: General Docs & FAQ
      link: /en/guide/config
features:
  - title: Unified Server Directory
    details: Place mods in mods and plugins in plugins; Luminara provides the Bukkit compatibility layer within the Forge server.
  - title: Human-Readable YAML Config
    details: luminara.yml is generated on first startup, containing optimization, compatibility, async catcher, Velocity, and logging settings.
  - title: Compatibility First
    details: Support scope, known incompatible items, and troubleshooting steps are organized according to current source code and support policies.
---

Luminara is a hybrid server mod developed based on Arclight. `stable/Trials` targets Minecraft `1.20.1`, Forge `47.x`, and Java `17`; `stable/FeudalKings` targets Minecraft `1.21.1`, supporting NeoForge and Fabric.

| Branch               | Minecraft | Server Platform                             | Java    | CraftBukkit |
| -------------------- | --------- | ------------------------------------------- | ------- | ----------- |
| `stable/Trials`      | `1.20.1`  | Forge `47.x`                                | 17      | `v1_20_R1`  |
| `stable/FeudalKings` | `1.21.1`  | NeoForge `21.1.x` or Fabric Loader `0.16.x` | 21 / 25 | `v1_21_R1`  |

Select the corresponding branch entry point to start deployment:

- [Enter stable/Trials](/en/trials/): Minecraft `1.20.1` + Forge `47.x` + Java `17`
- [Enter stable/FeudalKings](/en/feudalkings/): Minecraft `1.21.1` + NeoForge/Fabric + Java `21/25`

::: warning Verify Versions First
Luminara is not a standalone launcher, nor is it a Paper server. Please install the Forge Dedicated Server of the corresponding version first, then place the Luminara mod into `mods/`. Do not put Forge installer, Luminara mod, or plugins into incorrect directories.
:::
