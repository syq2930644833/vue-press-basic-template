import { defineConfig } from "vuepress/config";
import { NavItems4ZH, Sidebar4ZH } from './config/index';

export default defineConfig(ctx => ({
  title: '了了学习日记',
  description: '了了学习日记',
  head: [
    ['link', { rel: 'icon', href: '/img/favicon.ico' }],
    [
      'meta',
      {
        name: 'keywords',
        content: '前端博客,个人技术博客,前端,前端开发,前端框架,web前端,前端面试题,技术文档,学习,面试,JavaScript,js,ES6,TypeScript,vue,python,css3,html5,Node,git,github,markdown',
      },
    ],
  ],
  themeConfig: {
    // https://v1.vuepress.vuejs.org/zh/theme/default-theme-config.html#git-%E4%BB%93%E5%BA%93%E5%92%8C%E7%BC%96%E8%BE%91%E9%93%BE%E6%8E%A5
    // repo: 'syq2930644833/vue-press-basic-template', // 导航栏右上角github链接， 编辑参考上面地址
    logo: '/img/favicon.ico',
    nav: NavItems4ZH,
    sidebar: Sidebar4ZH,
    smoothScroll: true,
  },
  plugins: [
    ['@vuepress/nprogress'],
    ['@vuepress/back-to-top', true],
    [
      '@vuepress/pwa',
      {
        serviceWorker: true,
        updatePopup: true
      }
    ],
    ['@vuepress/medium-zoom', true],
  ],
  markdown: {
    lineNumbers: true
  },
  // 监听文件变化并重新构建
  extraWatchFiles: ['.vuepress/config/**', 'index.md']
}))
