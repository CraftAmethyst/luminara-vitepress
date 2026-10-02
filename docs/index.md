---
layout: home
hero:
  name: Luminara
  text: 面向服主的跨平台混合服务端
  tagline: 按 Minecraft 版本选择独立的 Trials 或 FeudalKings 部署入口
  image:
    src: /logo.png
    alt: Luminara logo
  actions:
    - theme: brand
      text: stable/Trials · 1.20.1
      link: /trials/
    - theme: alt
      text: stable/FeudalKings · 1.21.1
      link: /feudalkings/
    - theme: alt
      text: 通用文档与 FAQ
      link: /guide/config
features:
  - title: 一套服务端目录
    details: 模组放入 mods，插件放入 plugins，Luminara 负责在 Forge 服务端中提供 Bukkit 兼容层。
  - title: 可读的 YAML 配置
    details: luminara.yml 会在首次启动时生成，包含优化、兼容性、异步检查器、Velocity 与日志设置。
  - title: 以兼容性为先
    details: 支持范围、已知不兼容项目和排障步骤均按当前源码与支持策略整理。
---

## 连接信息

文档站点：[`lum.rimecraft.top`](https://lum.rimecraft.top)

Luminara 是基于 Arclight 开发的混合服务端 Mod。`stable/Trials` 面向 Minecraft `1.20.1`、Forge `47.x`、Java `17`；`stable/FeudalKings` 面向 Minecraft `1.21.1`，支持 NeoForge 和 Fabric。

| 分支 | Minecraft | 服务端平台 | Java | CraftBukkit |
| --- | --- | --- | --- | --- |
| `stable/Trials` | `1.20.1` | Forge `47.x` | 17 | `v1_20_R1` |
| `stable/FeudalKings` | `1.21.1` | NeoForge `21.1.x` 或 Fabric Loader `0.16.x` | 21 / 25 | `v1_21_R1` |

请选择对应分支入口开始部署：

- [进入 stable/Trials](/trials/)：Minecraft `1.20.1` + Forge `47.x` + Java `17`
- [进入 stable/FeudalKings](/feudalkings/)：Minecraft `1.21.1` + NeoForge/Fabric + Java `21/25`

::: warning 先确认版本
Luminara 不是独立启动器，也不是 Paper 服务端。请先安装对应版本的 Forge Dedicated Server，再将 Luminara Mod 放入 `mods/`。不要把 Forge 安装器、Luminara Mod 或插件放错目录。
:::
