# stable/Trials Build & Development

This page documents the source code build, testing, and development specifications for the `stable/Trials` branch targeting Minecraft `1.20.1` + Forge `47.x`. For routine server deployment, please directly use pre-compiled mod JARs published on [GitHub Releases](https://github.com/CraftAmethyst/Luminara/releases).

## Environment Requirements

| Item | Requirement | Note |
| --- | --- | --- |
| Operating System | Linux / macOS / Windows | Supports Bash, PowerShell, and WSL |
| JDK | 64-bit JDK `17` | Eclipse Temurin 17 or Zulu 17 recommended |
| Git | 2.x or higher | Release build tasks rely on Git commit metadata |
| Network Connection | Access to Maven repositories and Forge services | Initial build requires downloading dependencies and Forge assets |

## Getting Source Code

Clone the repository and check out the `stable/Trials` branch:

```bash
git clone https://github.com/CraftAmethyst/Luminara.git
cd Luminara
git checkout stable/Trials
```

## Standard Release Build

Use the project's built-in Gradle Wrapper to perform release builds and static convention checks:

::: code-group

```bash [Linux / macOS / WSL]
./gradlew check assembleForgeMod verifyForgeModDistribution
```

```powershell [Windows PowerShell]
.\gradlew.bat check assembleForgeMod verifyForgeModDistribution
```

```cmd [Windows cmd]
gradlew.bat check assembleForgeMod verifyForgeModDistribution
```

:::

### Build Artifacts

Upon a successful build, release artifacts are located in `build/distributions/` at the root directory:

```text
build/distributions/
├── luminara-forge-1.20.1-1.0.15-hotfix.jar
└── luminara-forge-1.20.1-1.0.15-hotfix.jar.sha256
```

The generated `.jar` is a standard Forge server mod. Simply place it into the `mods/` directory of your Dedicated Server; `.sha256` contains the checksum for this artifact.

### Build Parameters

- **Specify Forge Version**: By default, the build script automatically resolves the latest Forge version suitable for Minecraft 1.20.1. To lock a specific Forge version, pass `-PforgeVersion`:

  ```bash
  ./gradlew assembleForgeMod -PforgeVersion=47.4.22
  ```

- **Specify Git Commit Hash**: Release builds default to reading the commit hash via `git rev-parse --short HEAD` and embedding it into metadata. In detached HEAD or custom packaging pipelines, you can manually pass a 7–40 character hexadecimal commit hash:

  ```bash
  ./gradlew assembleForgeMod -PluminaraGitHash=a1b2c3d
  ```

## Static Verification & Gates

### Mod Convention Check (`verifyForgeModDistribution`)

`verifyForgeModDistribution` unpacks the mod JAR after packaging and performs static whitelist/blacklist checks:
- Verifies inclusion of metadata such as `META-INF/mods.toml`, `META-INF/accesstransformer.cfg`, and `META-INF/luminara-version.properties`.
- Verifies inclusion of all core Mixin configurations (`mixins.arclight.core.json`, `bukkit.json`, `forge.json`, `compat.json`, `impl.forge.optimization.json`).
- Verifies that the Manifest contains `MixinConnector: io.izzel.arclight.common.mod.ArclightConnector`.
- Verifies that no legacy launcher class files or configurations remain.

### Runtime Smoke Test (`smokeServer`)

Trials provides an integrated smoke test on a real Forge server environment:

```bash
./gradlew smokeServer
```

The `smokeServer` task automatically runs the following workflow:
1. Downloads and installs a clean Forge Dedicated Server of the corresponding version.
2. Mounts the built Luminara mod into `mods/`, injecting dedicated test mods (`smokeModJar`) and test Bukkit plugins (`smokePluginJar`).
3. Launches the server process, monitors console output, and asserts critical milestones:
   - Server reaches `Done (...)` properly.
   - Test mod and test plugin load and output handshake logs.
   - Core Bukkit API invocations function properly.
   - JUL-to-Log4j log routing bridge functions properly.
   - Core enum unfinalization (`Material`, `SpawnCategory`) takes effect.
   - `/luminara info` and version details output correctly.

If you need to keep the full test server directory after the test completes for manual debugging or inspecting logs, run:

```bash
./gradlew runNativeForgeServer
```

### Full Verification Gate (`verify`)

Runs all subproject unit tests, static distribution verification, and native Forge Dedicated Server smoke tests:

```bash
./gradlew verify
```

### Reproducible Build Verification (`verifyReproducibleForgeMod`)

When modifying dependency configurations, archive packaging logic, or underlying bytecode remapping, run the reproducible build verification:

```bash
./gradlew verifyReproducibleForgeMod
```

This task runs two independent builds in temporary directories and compares every entry in the Forge mod JAR byte-for-byte.

## Module Structure & Boundaries

The Trials branch consists of the following primary modules:

- **`arclight-common`**: Core compatibility layer. Contains Bukkit/Spigot/Paper API implementations, common Mixins, event dispatch bridging, server remapping, and runtime support.
- **`arclight-forge`**: Forge platform implementation. Responsible for Forge event bus mounting, Forge-specific Mixins, platform metadata, and mod JAR packaging.
- **`i18n-config`**: Configuration and internationalization system. Responsible for reading and writing `luminara.yml`, version metadata injection, and multilingual text parsing.
- **`buildSrc`**: Project-specific Gradle plugins and custom tasks (including Spigot generation, remapping, Forge smoke testing, and packaging verification tasks).
