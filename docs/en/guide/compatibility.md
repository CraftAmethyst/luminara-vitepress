# Compatibility and Performance Recommendations

Currently, no common hybrid server core can guarantee absolute compatibility with every mod and plugin, and Luminara is no exception.

Luminara loads both Forge mods and Bukkit/Spigot plugins simultaneously, but it is not a full Paper implementation. Whether a plugin works depends on the APIs it uses, its assumptions about vanilla behavior, and whether it conflicts with mod modifications. When encountering issues, first reproduce them in a minimal environment with only Luminara installed.

Simply mindlessly stacking **too many** optimization mods usually does not improve server performance. This is especially true now with the emergence of more and more "AI Slop" optimization mods, making it increasingly difficult to discern which optimization mods are genuinely helpful.

To maximize server performance, you can refer to the `Optimization for Large Modpacks` section below.

## Known Compatible Modpacks

When Luminara prepares to release an stable version, popular modpacks for that version are selected for simple compatibility testing (server startup and player joining).

Once an stable version of Luminara is released, popular modpacks are randomly selected and deployed on servers for long-term cycle testing (roughly 7 days to 1 month).

Below are the modpacks explicitly compatible with Luminara:

- [All the Mods 10](https://www.curseforge.com/minecraft/modpacks/all-the-mods-10) (1.21.1 NeoForge)
- [Better MC [FABRIC] BMC3](https://www.curseforge.com/minecraft/modpacks/better-mc-fabric-bmc3) (1.21.1 Fabric)
- [All the Mods 9](https://www.curseforge.com/minecraft/modpacks/all-the-mods-9) (1.20.1 Forge)
- [Closing Song](https://www.mcmod.cn/modpack/1133.html) (1.20.1 Forge)
- [GregTech Odyssey](https://gtodyssey.com/) (1.20.1 Forge)
- [VanillaEra: FaresChron](https://www.mcmod.cn/modpack/1095.html) (1.20.1 Forge)

If the modpack you are playing is not on this list, don't worry. This is merely what we have tested; you can still try running servers with other modpacks using Luminara. If you encounter any issues, simply submit an Issue or ask for help in the community group.

## Known Incompatible Mods

- [ServerCore](https://modrinth.com/mod/servercore): Many of its optimizations originate from Spigot or Paper. Since Luminara already provides a Bukkit/Spigot/Paper compatibility layer in the Forge server, redundantly modifying the same logic may lead to exceptions or crashes.
- [Sinytra Connector](https://modrinth.com/mod/connector): It is used to connect Forge with Fabric; Luminara currently targets the Forge + Bukkit/Spigot/Paper compatibility stack and does not support layering this bridge on top.
- [C2ME Forge](https://www.curseforge.com/minecraft/mc-mods/concurent-chunk-management-engine-forge/d): Its current closed-source implementation cannot fix compatibility issues with Luminara's transformation chain. When chunk generation acceleration is needed, you can test [FastChunkGen](https://www.curseforge.com/minecraft/mc-mods/fastchunkgen).

## Known Incompatible Plugin Types

- Plugins claiming to "automatically optimize server performance", such as LaggRemover. Such plugins often conflict with the server core's own scheduling, and their benefits cannot be inferred from their names.
- Anti-cheat plugins, such as GrimAC, Matrix, and Vulcan. They usually judge behavior based strictly on vanilla mechanics and may falsely flag modded items, entities, or interactions.
- Plugins that heavily depend on Paper APIs. Luminara only implements a subset of commonly used Paper APIs. If a plugin invokes unimplemented methods, it may cause missing classes, abnormal behavior, or crashes. Prefer distribution builds that target the Spigot API.

This is not an exhaustive compatibility list. A plugin author claiming "Paper support" does not equate to Luminara support; please check the startup logs and plugin dependencies first, then verify on a backup server.

## Optimization for General / Large Modpacks

We define modpacks with a mod count of `≥300` as large modpacks.

For large modpacks, Luminara is explicitly compatible only with the following optimization mods:

- [ModernFix](https://modrinth.com/mod/modernfix)
- [FerriteCore](https://modrinth.com/mod/ferrite-core)
- [Lithium](https://modrinth.com/mod/lithium) (1.21.1) or [Radium](https://modrinth.com/mod/radium) (1.20.1)

When world exploration and chunk generation load is high, you can try:

- For 1.20.1: [FastNoise](https://modrinth.com/mod/zfastnoise) and [FastChunkGen](https://www.curseforge.com/minecraft/mc-mods/fastchunkgen).
- For 1.21.1: [C2ME-NeoForge](https://modrinth.com/mod/c2me-neoforge) or [C2ME-Fabric](https://modrinth.com/mod/c2me-fabric).

## Small or Medium Modpacks

We define modpacks with a mod count of `≤299` as medium modpacks, and those with a mod count of `≤150` as small modpacks.

If your goal is more aggressive performance patching, you can try our downstream project [PRTS-SERVER](https://github.com/ElainAwa/PRTS-SERVER) (1.20.1 only; the 1.21.1 version of this project is developed directly based on Arclight, not Luminara). It is suitable for small to medium modpacks; large modpacks are recommended to stay on Luminara.

If you still wish to use Luminara, you can still reuse the optimization mods mentioned in `Optimization for General / Large Modpacks`.

## Troubleshooting Order

1. Back up and copy the server directory.
2. Temporarily remove recently added mods or plugins to verify if the issue disappears.
3. Check `latest.log`, `debug.log`, crash reports, and the Forge mod list.
4. Execute `/luminara info` to verify the actual version information.
5. Add back mods or plugins one by one in a minimal reproduction environment.

### Minimal Testing

After identifying the problematic mod or plugin, test it on a standalone Forge server or Paper server.

If it still fails, the problem lies within the mod or plugin itself; if it runs normally, it is an issue with Luminara. In this case, please submit an issue on [GitHub Issues](https://github.com/CraftAmethyst/Luminara/issues).

Do not take "the server can start" as the sole criterion—make sure to check whether everything functions properly after joining the server as well.