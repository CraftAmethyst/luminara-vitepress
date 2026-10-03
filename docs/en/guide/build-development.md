# Build & Development Overview

This section summarizes source code builds, platform requirements, and development conventions across Luminara's maintained branches.

::: tip Routine Server Deployment Does Not Require Building
For production deployment, please download officially released pre-compiled mod JAR files directly from [GitHub Releases](https://github.com/CraftAmethyst/Luminara/releases). Building from source is intended only for development, custom modifications, or validating cutting-edge features.
:::

## Branch Build Matrix

Luminara follows a dual-branch parallel maintenance strategy, with each branch targeting different Minecraft versions, mod loader ecosystems, and Java toolchains:

| Branch                   | Target Platform    | Supported Loaders                     | JDK Version            | Dedicated Build Guide                                  |
| ------------------------ | ------------------ | ------------------------------------- | ---------------------- | ------------------------------------------------------ |
| **`stable/Trials`**      | Minecraft `1.20.1` | Forge `47.x`                          | 64-bit JDK `17`        | [Go to Trials Build Guide](/en/trials/build)           |
| **`stable/FeudalKings`** | Minecraft `1.21.1` | NeoForge `21.1.x`<br>Fabric `0.16.x`+ | 64-bit JDK `21` / `25` | [Go to FeudalKings Build Guide](/en/feudalkings/build) |

::: warning Never Mix Branches and Artifacts

- `Trials` artifacts are strictly for Minecraft 1.20.1 Forge environments.
- `FeudalKings` artifacts are strictly for Minecraft 1.21.1 NeoForge or Fabric environments.
- The two branches utilize distinct Gradle plugin architectures and build tasks; please check out the corresponding branch and run its respective tasks.
  :::

## Branch Build Entry Points

Please navigate to the build guide corresponding to your target Minecraft version:

- 🛠️ **[stable/Trials Build & Development Guide](/en/trials/build)**
- 🛠️ **[stable/FeudalKings Build & Development Guide](/en/feudalkings/build)**
