# `luminara.yml` Configuration Guide

Luminara reads `luminara.yml` in the root of the server directory. If the file does not exist, it will be automatically generated during server startup; existing files undergo version migration and have localized comments appended. The current configuration version is `_v: 2`—do not modify `_v` manually.

Please restart the server after applying configuration changes.

## Default Recommended Configuration

```yaml
_v: 2
locale:
  fallback: en_us
  current: en_us
optimization:
  cache-plugin-class: true
  goal-selector-update-interval: 1
  use-activation-and-tracking-range: false
compatibility:
  symlink-world: false
  permission-forwarding: FORGE_TO_BUKKIT
  valid-username-regex: ""
  lenient-item-tag-match: true
  preload-bungee-chat-classes: true
  enable-bukkit-reload-command: true
async-catcher:
  dump: true
  warn: true
  defaultOperation: BLOCK
velocity:
  enabled: false
  online-mode: false
  forwarding-secret: ""
  debug-logging: false
error-handling:
  continue-on-crash: false
  crash-report-directory: crash-reports
logging:
  use-simple-format: false
```

## locale

| Field      | Purpose                                                                                           |
| ---------- | ------------------------------------------------------------------------------------------------- |
| `fallback` | Built-in language used when the current locale cannot be found. Defaults to `zh_cn` (or `en_us`). |
| `current`  | Language used for logs and newly generated configuration comments, e.g., `zh_cn`, `en_us`.        |

Unsupported languages will fall back to `fallback`. Comments are dynamically injected based on the current locale at startup, so do not rely on comments as a stable format.

## optimization

> Previously, there were numerous optimization options derived from MPEM and Paper, but they were subsequently removed due to extreme instability and performance regressions. More optimizations are not always better; a few well-tested optimization mods deliver far superior performance improvements. See [Compatibility & Performance Suggestions](./compatibility.md) for details.

| Field                               | Default | Description                                                                                                                                                         |
| ----------------------------------- | ------: | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `cache-plugin-class`                |  `true` | Caches plugin classes to reduce repeated classloading overhead. Can be temporarily set to `false` when dealing with hotswapping or classloader issues.              |
| `goal-selector-update-interval`     |     `1` | Mob goal selector tick update interval. Increasing this reduces CPU overhead, but causes mobs to re-evaluate goals less frequently.                                 |
| `use-activation-and-tracking-range` | `false` | Enables Spigot activation and tracking range optimizations. For large modpacks, it is recommended to keep this disabled initially and enable only after evaluation. |

## compatibility

> Explanation of `symlink-world` regarding "symbolic links matching Bukkit world names": World names like `world_xxx` represent Bukkit's naming format. For example, `world_the_aether` will be mapped to `world/the_aether` (as Bukkit does not fully support slash symbols in world names). This option exists primarily to maintain compatibility with multi-world plugins like Multiverse-Core.

| Field                          | Description                                                                                                                                                                                                                        |
| ------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `material-property-overrides`  | Overrides Bukkit material properties by item or block key. Configure only when you know exactly which properties a plugin expects.                                                                                                 |
| `entity-property-overrides`    | Overrides entity class mappings, including `entityClass` and `entityImplClass`. Incorrect mappings may lead to startup failures or entity spawning issues.                                                                         |
| `symlink-world`                | Creates symbolic links for mod dimensions matching Bukkit world naming conventions. Do not toggle this casually in production servers, as it alters mod dimension folder names and may cause world-dependent plugins to lose data. |
| `extra-logic-worlds`           | Fully qualified class names of mod worlds requiring extra world logic processing. Add entries only when logs explicitly output `[EXT_LOGIC]`.                                                                                      |
| `permission-forwarding`        | Permission bridging direction: `DISABLED`, `FORGE_TO_BUKKIT`, or `BUKKIT_TO_FORGE`. Typical Forge mod servers use `FORGE_TO_BUKKIT`, verified against your active permission plugin.                                               |
| `valid-username-regex`         | Regex for validating player usernames. Leave blank for vanilla validation; evaluate proxy and plugin security boundaries before relaxing this pattern.                                                                             |
| `lenient-item-tag-match`       | Allows lenient matching between item stacks without NBT and empty NBT tags. Enabled by default.                                                                                                                                    |
| `preload-bungee-chat-classes`  | Preloads Bungee Chat API classes at startup, resolving `ClassNotFoundException` in certain plugins. Can be disabled if related compatibility issues arise.                                                                         |
| `enable-bukkit-reload-command` | Whether to enable the Bukkit reload command. Frequent reloads are discouraged unless you fully understand plugin async tasks and state corruption risks.                                                                           |

## async-catcher

The async catcher handles situations where plugins or mods attempt to access main-thread resources from an asynchronous thread:

| Value       | Behavior                                                                                |
| ----------- | --------------------------------------------------------------------------------------- |
| `NONE`      | No action taken. Highest risk of state corruption, not recommended for standard use.    |
| `DISPATCH`  | Dispatches the operation to the main thread without waiting for completion.             |
| `BLOCK`     | Executes on the main thread and blocks waiting for the result. Default and recommended. |
| `EXCEPTION` | Immediately throws an exception, useful for diagnosing illegal cross-thread calls.      |

`dump` writes the stack trace to `debug.log`, and `warn` emits a warning to the console. `overrides` can specify modes per operation name; collect exact operation names from logs rather than guessing.

## velocity

When using Velocity Modern Forwarding, the backend Luminara server and the proxy must be configured in tandem:

1. Enable modern forwarding on Velocity and copy the `forwarding-secret`.
2. Set `velocity.enabled` to `true` in Luminara.
3. Ensure `velocity.forwarding-secret` matches the Velocity secret character-for-character.
4. Set `velocity.online-mode` to match Velocity's online-mode configuration.
5. You can temporarily enable `debug-logging` during troubleshooting and disable it once running stably.

Do not enable the backend setting without properly configuring the proxy. The backend port should be firewalled to only accept incoming traffic from the proxy, preventing bypass connections.

## error-handling & logging

| Field                              | Description                                                                                                                                                             |
| ---------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `error-handling.continue-on-crash` | Attempts to ignore minor server crashes. Keeping this disabled allows crashes to be surfaced immediately, preventing servers from persisting in a semi-corrupted state. |
| `crash-report-directory`           | Specifies the crash report directory, defaulting to `crash-reports`.                                                                                                    |
| `logging.use-simple-format`        | When set to `true`, hides thread names and class names for cleaner logs; keeping this `false` is recommended when troubleshooting compatibility issues.                 |
