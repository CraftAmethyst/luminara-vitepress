# Compatibility & Performance Suggestions

Currently, no common hybrid server can guarantee absolute compatibility with every mod and plugin, and Luminara is no exception.

Luminara loads both Forge mods and Bukkit/Spigot plugins simultaneously, but it is not a complete Paper implementation. Whether a plugin works depends on the APIs it uses, its assumptions about vanilla behavior, and whether it conflicts with mod modifications. When encountering problems, always reproduce them first in a minimal environment with only Luminara installed.

Blindly stacking **too many** optimization mods rarely improves server performance—especially with the growing proliferation of "AI Slop" optimization mods, making it increasingly difficult to discern which ones are genuinely beneficial.

To maximize server performance, see the `Optimization for Large Modpacks` section below.

## Known Incompatible Mods

- [ServerCore](https://modrinth.com/mod/servercore): Many of its optimizations are backported from Spigot or Paper. Since Luminara already provides a Bukkit/Spigot/Paper compatibility layer inside the Forge server, redundantly modifying the same logic often causes unexpected behavior or crashes.
- [Sinytra Connector](https://modrinth.com/mod/connector): Used to bridge Forge and Fabric; Luminara currently targets Forge + Bukkit/Spigot/Paper compatibility, and stacking this translation layer on top is unsupported.
- [C2ME Forge](https://www.curseforge.com/minecraft/mc-mods/concurent-chunk-management-engine-forge/d): Its closed-source implementation cannot be patched against Luminara's transformation pipeline. If you need faster chunk generation, consider testing [FastChunkGen](https://www.curseforge.com/minecraft/mc-mods/fastchunkgen).

## Known Incompatible Plugin Types

- Plugins claiming to "automatically optimize server performance", such as LaggRemover. These plugins often conflict with internal server scheduling, and benefits cannot be inferred from their titles.
- Anti-cheat plugins, such as GrimAC, Matrix, and Vulcan. They generally assume vanilla player mechanics and movement, frequently misinterpreting modded items, entities, or interactions as cheats.
- Plugins strictly dependent on Paper APIs. Luminara only implements a subset of commonly used Paper APIs. If a plugin invokes unimplemented methods, it may throw `ClassNotFoundException` / `NoSuchMethodError`, behave erratically, or crash. Prioritize using releases that support Spigot APIs.

This is not an exhaustive compatibility list. A plugin author's claim of "Paper support" does not imply Luminara compatibility; always check startup logs and plugin dependencies, and verify them in a staging server first.

## Optimization for Large Modpacks

We define modpacks with `≥300` mods as large modpacks.

For large modpacks, Luminara is explicitly compatible with only the following optimization mods:

- [ModernFix](https://modrinth.com/mod/modernfix)
- [FerriteCore](https://modrinth.com/mod/ferrite-core)
- [Radium](https://modrinth.com/mod/radium)

Under high terrain generation and exploration load, you can try [FastNoise](https://modrinth.com/mod/zfastnoise) and [FastChunkGen](https://www.curseforge.com/minecraft/mc-mods/fastchunkgen).

## Small or Medium Modpacks

We define modpacks with `≤299` mods as medium modpacks, and those with `≤150` mods as small modpacks.

If you seek more aggressive performance patches, you can explore our downstream project [PRTS-SERVER](https://github.com/ElainAwa/PRTS-SERVER) (1.20.1 only; its 1.21.1 version is developed directly on Arclight, not Luminara). It is well-suited for small to medium modpacks; large modpacks are recommended to stay on Luminara.

## Troubleshooting Sequence

1. Backup and duplicate your server directory.
2. Temporarily remove recently added mods or plugins to see if the issue disappears.
3. Check `latest.log`, `debug.log`, crash reports, and Forge mod list.
4. Run `/luminara info` to verify actual runtime version details.
5. In a minimal reproduction environment, re-add mods or plugins one by one.

### Minimal Testing

Once a problematic mod or plugin is identified, test it in an isolated standalone Forge server or Paper server.

If it still fails, the problem lies within the mod or plugin itself. If it runs properly there, the issue is on Luminara's end; in that case, please submit a report on [GitHub Issues](https://github.com/CraftAmethyst/Luminara/issues).

Do not take "the server started" as the sole benchmark—verify that in-game mechanics and player interactions operate normally after joining.
