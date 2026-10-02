# `luminara.yml` 配置解读

Luminara 在服务端根目录读取 `luminara.yml`。文件不存在时，启动过程会自动生成；已有文件会进行版本迁移并补全本地化注释。当前配置版本是 `_v: 2`，不要手动修改 `_v`。

修改后请配置后重启服务端。

## 默认推荐配置

```yaml
_v: 2
locale:
  fallback: zh_cn
  current: zh_cn
optimization:
  cache-plugin-class: true
  goal-selector-update-interval: 1
  use-activation-and-tracking-range: false
compatibility:
  symlink-world: false
  permission-forwarding: FORGE_TO_BUKKIT
  valid-username-regex: ''
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
  forwarding-secret: ''
  debug-logging: false
error-handling:
  continue-on-crash: false
  crash-report-directory: crash-reports
logging:
  use-simple-format: false
```

## locale

| 字段 | 作用 |
| --- | --- |
| `fallback` | 找不到当前语言时使用的内置语言，默认 `zh_cn`。 |
| `current` | 日志和新生成配置注释使用的语言，例如 `zh_cn`、`en_us`。 |

不支持的语言会回退到 `fallback`。配置启动时会根据当前语言重新注入注释，因此不要把注释当作稳定格式处理。

## optimization

> 原先这里有一大堆来自 MPEM（月夜性能优化模组）、Paper 的可用优化选项，但是后来把它们全都删掉了，因为极其不稳定且出现性能倒退的情况。优化项并不是越多越好，几个常见的优化模组就可以实现性能提升，详见 [兼容性与性能建议](./compatibility.md)。

| 字段 | 默认值 | 说明 |
| --- | ---: | --- |
| `cache-plugin-class` | `true` | 缓存插件类，减少重复加载开销。遇到插件热替换或类加载问题时可临时设为 `false`。 |
| `goal-selector-update-interval` | `1` | 生物目标选择器更新间隔。增大数值可减少资源消耗，但会让生物更不频繁地改变目标。 |
| `use-activation-and-tracking-range` | `false` | 使用 Spigot 的激活范围和追踪范围优化。大型模组服建议先保持关闭，酌情开启。 |

## compatibility

> symlink-world 对于 “匹配 Bukkit 世界名的符号链接” 的解释：形如 world_xxx 就是 Bukkit 的世界名格式。例如 world_the_aether 会被映射至 world/the_aether（因为 Bukkit 不太兼容带有斜杠符号的世界名），此选项主要为了兼容像 Multiverse Core 的多世界插件

| 字段 | 说明 |
| --- | --- |
| `material-property-overrides` | 按物品或方块键覆盖 Bukkit 材质属性。只在明确知道插件需要什么属性时填写。 |
| `entity-property-overrides` | 覆盖实体类映射，字段包括 `entityClass`、`entityImplClass`。错误映射可能导致启动或实体生成失败。 |
| `symlink-world` | 为模组维度创建匹配 Bukkit 世界名的符号链接。生产服不要随意切换，切换会改变模组世界名并可能使依赖世界名的插件丢失数据。 |
| `extra-logic-worlds` | 补充需要按世界逻辑处理的模组世界类全限定名。只有日志明确提示 `[EXT_LOGIC]` 时才添加。 |
| `permission-forwarding` | 权限方向：`DISABLED`、`FORGE_TO_BUKKIT`、`BUKKIT_TO_FORGE`。常规 Forge 模组服可用 `FORGE_TO_BUKKIT`，需要按实际权限系统验证。 |
| `valid-username-regex` | 玩家名校验正则。留空使用原版校验；放宽校验前先评估代理和插件安全边界。 |
| `lenient-item-tag-match` | 允许无 NBT 物品堆与空 NBT 标签进行宽松匹配，默认开启。 |
| `preload-bungee-chat-classes` | 启动时预加载 Bungee Chat API 类，解决部分插件找不到类的问题。出现相关兼容性问题可关闭。 |
| `enable-bukkit-reload-command` | 是否启用 Bukkit reload 命令。除非理解插件异步任务和状态风险，否则不建议频繁 reload。 |

## async-catcher

异步检查器处理插件或 Mod 从非主线程访问主线程资源的情况：

| 值 | 行为 |
| --- | --- |
| `NONE` | 不处理。风险最高，不建议常规使用。 |
| `DISPATCH` | 将操作派发到主线程，不等待完成。 |
| `BLOCK` | 在主线程执行并等待结果，默认且推荐。 |
| `EXCEPTION` | 直接抛出错误，适合定位违规调用。 |

`dump` 将堆栈写入 `debug.log`，`warn` 在日志中发出警告。`overrides` 可按操作名指定模式；不清楚操作名时先从日志收集，而不是猜测。

## velocity

使用 Velocity Modern Forwarding 时，后端 Luminara 与代理必须成对配置：

1. Velocity 开启 modern forwarding，并复制 `forwarding-secret`。
2. 在 Luminara 的 `velocity.enabled` 设为 `true`。
3. `velocity.forwarding-secret` 必须与 Velocity 配置逐字一致。
4. `velocity.online-mode` 应与 Velocity 的在线模式设置一致。
5. 排障时可暂时打开 `debug-logging`，正常运行后关闭。

不要只开启后端选项而不配置代理。后端端口应只对代理开放，避免绕过代理直接连接。

## error-handling 与 logging

| 字段 | 说明 |
| --- | --- |
| `error-handling.continue-on-crash` | 尝试忽略小部分的服务器崩溃。保持关闭能让崩溃尽快暴露，避免服务器处于半损坏状态。 |
| `crash-report-directory` | 指定崩溃报告目录，默认 `crash-reports`。 |
| `logging.use-simple-format` | 为 `true` 时 隐藏线程名和类名，日志更简洁；排查兼容性问题建议保持 `false`。 |
