import { defineConfig } from "vitepress";

export default defineConfig({
  srcDir: "docs",
  head: [["link", { rel: "icon", href: "/logo.png" }]],
  locales: {
    root: {
      label: "简体中文",
      lang: "zh-CN",
      title: "Luminara 服主文档",
      description:
        "Luminara Forge、NeoForge、Fabric + Bukkit/Spigot/Paper 兼容服务端的服主文档",
      themeConfig: {
        siteTitle: "Luminara 服主文档",
        nav: [
          { text: "首页", link: "/" },
          { text: "stable/Trials", link: "/trials/" },
          { text: "stable/FeudalKings", link: "/feudalkings/" },
          { text: "配置解读", link: "/guide/config" },
          { text: "兼容性与优化", link: "/guide/compatibility" },
          { text: "FAQ", link: "/faq" },
        ],
        sidebar: {
          "/trials/": [
            {
              text: "stable/Trials · Minecraft 1.20.1",
              items: [
                { text: "分支概览", link: "/trials/" },
                { text: "安装与首次启动", link: "/trials/install" },
                { text: "构建与开发", link: "/trials/build" },
                { text: "luminara.yml 配置", link: "/guide/config" },
                { text: "兼容性与性能建议", link: "/guide/compatibility" },
              ],
            },
          ],
          "/feudalkings/": [
            {
              text: "stable/FeudalKings · Minecraft 1.21.1",
              items: [
                { text: "分支概览", link: "/feudalkings/" },
                { text: "安装与首次启动", link: "/feudalkings/install" },
                { text: "构建与开发", link: "/feudalkings/build" },
                { text: "luminara.yml 配置", link: "/guide/config" },
                { text: "兼容性与性能建议", link: "/guide/compatibility" },
              ],
            },
          ],
          "/guide/": [
            {
              text: "通用文档",
              items: [
                { text: "构建与开发概览", link: "/guide/build-development" },
                { text: "Trials 构建 (1.20.1)", link: "/trials/build" },
                {
                  text: "FeudalKings 构建 (1.21.1)",
                  link: "/feudalkings/build",
                },
                { text: "luminara.yml 配置", link: "/guide/config" },
                { text: "兼容性与性能建议", link: "/guide/compatibility" },
              ],
            },
          ],
          "/faq": [
            { text: "常见问题", items: [{ text: "FAQ", link: "/faq" }] },
          ],
        },
        footer: {
          message: "Luminara 服主文档",
          copyright: "文档内容以仓库当前源码与支持策略为准",
        },
        outline: { label: "页面导航" },
        docFooter: { prev: "上一页", next: "下一页" },
        lastUpdated: { text: "最后更新于" },
      },
    },
    en: {
      label: "English",
      lang: "en-US",
      link: "/en/",
      title: "Luminara Server Admin Docs",
      description:
        "Server administrator documentation for Luminara Forge, NeoForge, and Fabric + Bukkit/Spigot/Paper hybrid server",
      themeConfig: {
        siteTitle: "Luminara Server Admin Docs",
        nav: [
          { text: "Home", link: "/en/" },
          { text: "stable/Trials", link: "/en/trials/" },
          { text: "stable/FeudalKings", link: "/en/feudalkings/" },
          { text: "Configuration", link: "/en/guide/config" },
          {
            text: "Compatibility & Optimization",
            link: "/en/guide/compatibility",
          },
          { text: "FAQ", link: "/en/faq" },
        ],
        sidebar: {
          "/en/trials/": [
            {
              text: "stable/Trials · Minecraft 1.20.1",
              items: [
                { text: "Branch Overview", link: "/en/trials/" },
                {
                  text: "Installation & First Startup",
                  link: "/en/trials/install",
                },
                { text: "Build & Development", link: "/en/trials/build" },
                {
                  text: "luminara.yml Configuration",
                  link: "/en/guide/config",
                },
                {
                  text: "Compatibility & Performance Suggestions",
                  link: "/en/guide/compatibility",
                },
              ],
            },
          ],
          "/en/feudalkings/": [
            {
              text: "stable/FeudalKings · Minecraft 1.21.1",
              items: [
                { text: "Branch Overview", link: "/en/feudalkings/" },
                {
                  text: "Installation & First Startup",
                  link: "/en/feudalkings/install",
                },
                { text: "Build & Development", link: "/en/feudalkings/build" },
                {
                  text: "luminara.yml Configuration",
                  link: "/en/guide/config",
                },
                {
                  text: "Compatibility & Performance Suggestions",
                  link: "/en/guide/compatibility",
                },
              ],
            },
          ],
          "/en/guide/": [
            {
              text: "General Guide",
              items: [
                {
                  text: "Build & Development Overview",
                  link: "/en/guide/build-development",
                },
                { text: "Trials Build (1.20.1)", link: "/en/trials/build" },
                {
                  text: "FeudalKings Build (1.21.1)",
                  link: "/en/feudalkings/build",
                },
                {
                  text: "luminara.yml Configuration",
                  link: "/en/guide/config",
                },
                {
                  text: "Compatibility & Performance Suggestions",
                  link: "/en/guide/compatibility",
                },
              ],
            },
          ],
          "/en/faq": [
            {
              text: "Frequently Asked Questions",
              items: [{ text: "FAQ", link: "/en/faq" }],
            },
          ],
        },
        footer: {
          message: "Luminara Server Admin Docs",
          copyright:
            "Content is subject to current repository source code and support policy",
        },
        outline: { label: "On this page" },
        docFooter: { prev: "Previous page", next: "Next page" },
        lastUpdated: { text: "Last updated" },
        socialLinks: [
          {
            icon: "github",
            link: "https://github.com/CraftAmethyst/Luminara",
            ariaLabel: "GitHub",
          },
          {
            icon: "discord",
            link: "https://discord.gg/xn8KGphcvS",
            ariaLabel: "Discord (Global)",
          },
          {
            icon: "qq",
            link: "https://qm.qq.com/q/5S00vXfQpq",
            ariaLabel: "QQ Group 929252864 (China Only)",
          },
        ],
      },
    },
  },
  themeConfig: {
    logo: { src: "/logo.png", alt: "Luminara" },
    socialLinks: [
      {
        icon: "github",
        link: "https://github.com/CraftAmethyst/Luminara",
        ariaLabel: "GitHub",
      },
      {
        icon: "discord",
        link: "https://discord.gg/xn8KGphcvS",
        ariaLabel: "Discord（国际）",
      },
      {
        icon: "qq",
        link: "https://qm.qq.com/q/5S00vXfQpq",
        ariaLabel: "QQ 群 929252864（仅中国）",
      },
    ],
    search: {
      provider: "local",
      options: {
        locales: {
          root: {
            translations: {
              button: {
                buttonText: "搜索文档",
                buttonAriaLabel: "搜索文档",
              },
              modal: {
                noResultsText: "无法找到相关结果",
                resetButtonTitle: "清除查询条件",
                footer: {
                  selectText: "选择",
                  navigateText: "切换",
                  closeText: "关闭",
                },
              },
            },
          },
          en: {
            translations: {
              button: {
                buttonText: "Search documentation",
                buttonAriaLabel: "Search documentation",
              },
              modal: {
                noResultsText: "No results found",
                resetButtonTitle: "Reset search",
                footer: {
                  selectText: "to select",
                  navigateText: "to navigate",
                  closeText: "to close",
                },
              },
            },
          },
        },
      },
    },
  },
});
