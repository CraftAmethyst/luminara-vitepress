import { defineConfig } from 'vitepress'

export default defineConfig({
  lang: 'zh-CN',
  srcDir: 'docs',
  title: 'Luminara 服主文档',
  description: 'Luminara Forge、NeoForge、Fabric + Bukkit/Spigot/Paper 兼容服务端的服主文档',
  head: [['link', { rel: 'icon', href: '/logo.png' }]],
  themeConfig: {
    logo: { src: '/logo.png', alt: 'Luminara' },
    siteTitle: 'Luminara 服主文档',
    nav: [
      { text: '首页', link: '/' },
      { text: 'stable/Trials', link: '/trials/' },
      { text: 'stable/FeudalKings', link: '/feudalkings/' },
      { text: '配置解读', link: '/guide/config' },
      { text: '兼容性与优化', link: '/guide/compatibility' },
      { text: 'FAQ', link: '/faq' }
    ],
    sidebar: {
      '/trials/': [{ text: 'stable/Trials · Minecraft 1.20.1', items: [
        { text: '分支概览', link: '/trials/' },
        { text: '安装与首次启动', link: '/trials/install' },
        { text: '构建与开发', link: '/trials/build' },
        { text: 'luminara.yml 配置', link: '/guide/config' },
        { text: '兼容性与性能建议', link: '/guide/compatibility' }
      ] }],
      '/feudalkings/': [{ text: 'stable/FeudalKings · Minecraft 1.21.1', items: [
        { text: '分支概览', link: '/feudalkings/' },
        { text: '安装与首次启动', link: '/feudalkings/install' },
        { text: '构建与开发', link: '/feudalkings/build' },
        { text: 'luminara.yml 配置', link: '/guide/config' },
        { text: '兼容性与性能建议', link: '/guide/compatibility' }
      ] }],
      '/guide/': [{ text: '通用文档', items: [
        { text: '构建与开发概览', link: '/guide/build-development' },
        { text: 'Trials 构建 (1.20.1)', link: '/trials/build' },
        { text: 'FeudalKings 构建 (1.21.1)', link: '/feudalkings/build' },
        { text: 'luminara.yml 配置', link: '/guide/config' },
        { text: '兼容性与性能建议', link: '/guide/compatibility' }
      ] }],
      '/faq': [{ text: '常见问题', items: [{ text: 'FAQ', link: '/faq' }] }]
    },
    socialLinks: [{ icon: 'github', link: 'https://github.com/CraftAmethyst/Luminara' }],
    footer: {
      message: 'Luminara 服主文档',
      copyright: '文档内容以仓库当前源码与支持策略为准'
    },
    search: { provider: 'local' }
  }
})
