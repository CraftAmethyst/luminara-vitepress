# Compatibility and Performance Recommendations

A few points you need to know:

- No hybrid server software can guarantee absolute compatibility with all mods and plugins.

- All hybrid server software prioritizes mod compatibility because they are inherently built by superimposing a Bukkit compatibility layer on top of a native Forge server.

- Luminara is not a full Paper implementation. Whether a plugin works depends on the APIs it uses, its assumptions about vanilla behavior, and whether it conflicts with mod modifications. When encountering issues, first reproduce them in a minimal environment with only Luminara installed.

- Simply and blindly stacking **too many** optimization mods usually does not improve server performance—especially now with more and more AI-slop optimization mods appearing, making it increasingly difficult to identify which optimization mods are genuinely helpful.

- To maximize server performance, you can read the `Optimizations for Large Modpacks` section below.

## Known Compatible Modpacks

When Luminara prepares to release a stable version, it selects popular modpacks of that version for basic compatibility testing (server startup and player login).

Once a stable version of Luminara is released, popular modpacks are randomly chosen and deployed to servers for long-term cycle testing (approximately 7 days to 1 month).

The following are modpacks explicitly compatible with Luminara:

| Modpack                                                                                        | Version / Loader | Mod Compatibility | Plugin Compatibility |
| ---------------------------------------------------------------------------------------------- | ---------------- | ----------------- | -------------------- |
| [All the Mods 10](https://www.curseforge.com/minecraft/modpacks/all-the-mods-10)               | 1.21.1 NeoForge  | 🟢                | 🟢                   |
| [Better MC [FABRIC] BMC3](https://www.curseforge.com/minecraft/modpacks/better-mc-fabric-bmc3) | 1.21.1 Fabric    | 🟢                | 🟡                   |
| [All the Mods 9](https://www.curseforge.com/minecraft/modpacks/all-the-mods-9)                 | 1.20.1 Forge     | 🟢                | 🟢                   |
| [落幕曲 Closing Song](https://www.mcmod.cn/modpack/1133.html)                                  | 1.20.1 Forge     | 🟢                | 🟢                   |
| [GregTech Odyssey](https://gtodyssey.com/)                                                     | 1.20.1 Forge     | 🟢                | 🔴                   |
| [香草纪元：食旅纪行 VanillaEra: FaresChron](https://www.mcmod.cn/modpack/1095.html)            | 1.20.1 Forge     | 🟢                | 🟡                   |

- 🟢 **Good Compatibility** — Works out of the box with no known conflicts.
- 🟡 **Limited Compatibility** — Operable, but requires additional conditions (manual configuration changes, minor feature absences).
- 🔴 **Incompatible** — Hard conflicts exist or features are severely lacking.
- ⚪ **Not Applicable** — This modpack is incompatible with most or all plugins.

If the modpack you play is not on this list, don't worry. These are only the ones we have tested; you can still try running other modpack servers with Luminara. If you run into issues, simply open an Issue or ask for help in community groups.

## Known Incompatible Mods

- [ServerCore](https://modrinth.com/mod/servercore): Many of its optimizations are derived from Spigot or Paper. Since Luminara already provides a Bukkit/Spigot/Paper compatibility layer in the Forge server, redundantly modifying the same logic may cause anomalies or crashes.
- [Sinytra Connector](https://modrinth.com/mod/connector): Used to bridge Forge and Fabric; Luminara currently targets the Forge + Bukkit/Spigot/Paper compatibility stack and does not support layering this bridge on top.
- [C2ME Forge](https://www.curseforge.com/minecraft/mc-mods/concurent-chunk-management-engine-forge/d): Its current closed-source implementation cannot address compatibility issues with Luminara's transformation pipeline. When chunk generation acceleration is needed, you may test [FastChunkGen](https://www.curseforge.com/minecraft/mc-mods/fastchunkgen).

## Known Incompatible Plugin Types

- Plugins claiming to "automatically optimize server performance," such as LaggRemover. Such plugins often conflict with the server's own scheduling, and their benefits cannot be inferred from their names alone.
- Anti-cheat plugins, such as GrimAC, Matrix, and Vulcan. They generally judge actions based only on vanilla behavior and may falsely flag mod items, entities, or interactions.
- Plugins that heavily depend on Paper API. Luminara implements only a subset of common Paper APIs; if a plugin calls unimplemented methods, it may encounter missing classes, abnormal behavior, or crashes. Prefer distribution builds that provide Spigot API versions.

This is not an exhaustive compatibility list. A plugin author's claim of "Paper support" does not equate to Luminara support; please check startup logs and plugin dependencies first, and verify on a test server before deploying.

## General / Large Modpack Optimizations

We define modpacks with `≥300` mods as large modpacks.

For large modpacks, Luminara is explicitly compatible only with the following optimization mods:

- [ModernFix](https://modrinth.com/mod/modernfix)
- [FerriteCore](https://modrinth.com/mod/ferrite-core)
- [Lithium](https://modrinth.com/mod/lithium) (1.21.1) or [Radium](https://modrinth.com/mod/radium) (1.20.1)

When world generation load is high during exploration, you can try:

- For 1.20.1: [FastNoise](https://modrinth.com/mod/zfastnoise) and [FastChunkGen](https://www.curseforge.com/minecraft/mc-mods/fastchunkgen).
- For 1.21.1: [C2ME-NeoForge](https://modrinth.com/mod/c2me-neoforge) or [C2ME-Fabric](https://modrinth.com/mod/c2me-fabric).

## Small or Medium Modpacks

We define modpacks with `≤299` mods as medium modpacks, and those with `≤150` mods as small modpacks.

If your goal is more aggressive performance patches, you can try our downstream project [PRTS-SERVER](https://github.com/ElainAwa/PRTS-SERVER) (1.20.1 only; the 1.21.1 branch of this project is developed directly on Arclight and is not based on Luminara). It is suitable for small to medium modpacks; large modpacks are recommended to remain on Luminara.

If you still wish to use Luminara, you can still apply the optimization mods mentioned in `General / Large Modpack Optimizations`.

## Troubleshooting Order

1. Back up and duplicate the server directory.
2. Temporarily remove recently added mods or plugins to verify if the issue disappears.
3. Check `latest.log`, `debug.log`, crash reports, and the Forge mod list.
4. Run `/luminara info` to verify actual version details.
5. Add back mods or plugins one by one in a minimal reproduction environment.

### Minimal Testing

After identifying the problematic mod or plugin, test it on a standalone Forge server or Paper server.

If it still fails, the problem lies within the mod or plugin itself; if it runs normally, it is an issue with Luminara, and you should submit an issue on [GitHub Issues](https://github.com/CraftAmethyst/Luminara/issues).

Do not take "the server can start" as the sole criterion—make sure to check whether everything behaves normally after joining the server.
