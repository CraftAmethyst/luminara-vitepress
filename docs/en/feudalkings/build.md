# stable/FeudalKings Build & Development

This page documents the source code build, testing, and development specifications for the `stable/FeudalKings` branch targeting Minecraft `1.21.1` + NeoForge / Fabric. For routine server deployment, please directly use pre-compiled mod JARs published on [GitHub Releases](https://github.com/CraftAmethyst/Luminara/releases).

## Environment Requirements

| Item               | Requirement                                                | Note                                                                                     |
| ------------------ | ---------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| Operating System   | Linux / macOS / Windows                                    | Supports Bash, PowerShell, and WSL                                                       |
| JDK                | 64-bit JDK `21`                                            | Project uses Java 21 Toolchain; supports JDK 21 or 25                                    |
| Git                | 2.x or higher                                              | Release build tasks rely on Git commit metadata                                          |
| Network Connection | Access to Fabric / NeoForge / Mojang / Spigot repositories | Initial build runs Spigot BuildTools automatically and pulls multi-platform dependencies |

## Getting Source Code

Clone the repository and check out the `stable/FeudalKings` branch:

```bash
git clone https://github.com/CraftAmethyst/Luminara.git
cd Luminara
git checkout stable/FeudalKings
```

## Standard Release Build

Use the project's built-in Gradle Wrapper to execute build tasks:

### 1. Build Single Platform Mod

::: code-group

```bash [Build Fabric Mod]
./gradlew assembleFabricModDistribution
```

```bash [Build NeoForge Mod]
./gradlew assembleNeoForgeModDistribution
```

:::

On Windows, replace `./gradlew` with `.\gradlew.bat` or `gradlew.bat`.

### 2. Build All Platform Mods Simultaneously

::: code-group

```bash [Linux / macOS / WSL]
./gradlew assembleDistributions
```

```powershell [Windows PowerShell]
.\gradlew.bat assembleDistributions
```

```cmd [Windows cmd]
gradlew.bat assembleDistributions
```

:::

### 3. Collect Artifacts (`collect`)

Run the `collect` task to aggregate all built distribution archives into the `build/libs/` directory:

```bash
./gradlew collect
```

### Build Artifacts

Upon build completion, individual platform mod files are located in `build/distributions/` at the root (and also collected to `build/libs/` if `collect` was run):

```text
build/distributions/
├── luminara-fabric-1.21.1-1.0.15-beta.1.jar
└── luminara-neoforge-1.21.1-1.0.15-beta.1.jar
```

- **Fabric Artifact**: Standard Fabric mod. Place it into the `mods/` directory of the Fabric server; requires Fabric API and `fabric-permissions-api`.
- **NeoForge Artifact**: Standard NeoForge mod. Place it into the `mods/` directory of the NeoForge server. The NeoForge artifact embeds necessary libraries such as SnakeYAML via Jar-in-Jar to avoid class namespace collisions with other mods.

### Generate SHA-256 Checksums

After building, run the following command to generate a checksum manifest:

::: code-group

```bash [Linux / macOS]
sha256sum build/distributions/luminara-*.jar > build/distributions/SHA256SUMS
```

```powershell [Windows PowerShell]
Get-FileHash build\distributions\luminara-*.jar -Algorithm SHA256
```

:::

## Build Parameters & Properties

- **Specify Git Commit Hash (`luminaraGitHash`)**: Release tasks default to reading the current short commit hash via Git. When building in environments without Git or in isolated CI containers, specify a 7–40 character hexadecimal commit hash explicitly via Gradle:

  ```bash
  ./gradlew assembleDistributions -PluminaraGitHash=a1b2c3d
  ```

- **Reproducible Build Timestamp (`SOURCE_DATE_EPOCH`)**: Standard `SOURCE_DATE_EPOCH` environment variable is supported and will be used as the archive packaging timestamp when set.

- **Use Local Maven (`useMavenLocal`)**: If you need to consume locally published dependencies, pass `-PuseMavenLocal=true`:

  ```bash
  ./gradlew assembleDistributions -PuseMavenLocal=true
  ```

## Static Convention Verification & CI Gates

FeudalKings provides a full suite of static release convention gates and unit tests:

### 1. Mod Convention Checks (`verifyDistributions`)

- **`verifyFabricModDistribution`**:
  - Verifies that artifact filename matches `luminara-fabric-1.21.1-<version>.jar`.
  - Verifies presence of `fabric.mod.json`, `mixins.arclight.fabric.json`, and all common Mixins (`core`, `bukkit`, `vanilla`, `impl.optimization`).
  - Verifies absence of NeoForge-specific configs (`neoforge.mods.toml`, `mixins.arclight.neoforge.json`) and legacy launcher residues.
- **`verifyNeoForgeModDistribution`**:
  - Verifies that artifact filename matches `luminara-neoforge-1.21.1-<version>.jar`.
  - Verifies presence of `META-INF/neoforge.mods.toml`, `mixins.arclight.neoforge.json`, `META-INF/jarjar/metadata.json`, and common Mixins.
  - Verifies Jar-in-Jar specification: ensures SnakeYAML is packaged as a nested JAR rather than unpacked class directories (`org/yaml/snakeyaml/`) mixed into the mod root, preventing NeoForge runtime automatic module conflicts with other mods.
  - Verifies absence of Fabric-specific configs and legacy launcher residues.
- **`verifyDistributions`**: Runs both Fabric and NeoForge mod release checks in parallel with a single command.

```bash
./gradlew verifyDistributions
```

### 2. Unit & Convention Tests (`check`)

Run unit tests across all submodules:

```bash
./gradlew check
```

### 3. Full CI Gate

Recommended full validation pipeline for FeudalKings CI:

::: code-group

```bash [Linux / macOS / WSL]
./gradlew check verifyDistributions verifyLauncherBoundaries collect --stacktrace
```

```powershell [Windows PowerShell]
.\gradlew.bat check verifyDistributions verifyLauncherBoundaries collect --stacktrace
```

```cmd [Windows cmd]
gradlew.bat check verifyDistributions verifyLauncherBoundaries collect --stacktrace
```

:::

## Transitional Legacy Launcher Build (Historical Fallback)

::: info Architecture Evolution Note
FeudalKings has fully transitioned to the standard server mod architecture (simply place in `mods/`). The legacy Launcher/Bootstrap is retained solely for transitional fallback verification and regression benchmarking. Standard mods are strongly recommended for daily use and deployment.
:::

To build legacy launcher artifacts:

```bash
# Build Fabric and NeoForge legacy Launchers
./gradlew assembleFabricLauncherDistribution assembleNeoForgeLauncherDistribution

# Verify Launcher conventions and EULA boundaries
./gradlew verifyFabricLauncherDistribution verifyNeoForgeLauncherDistribution verifyLauncherBoundaries
```

Built Launchers are located in `build/distributions/launcher/`.
