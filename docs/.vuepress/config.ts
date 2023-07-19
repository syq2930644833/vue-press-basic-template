import { defineConfig } from "vuepress/config";

export default defineConfig(ctx => ({
    title: '网站的标题',
    description: '网站的描述',
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
    locales: undefined, // 多语言支持
    // 监听文件变化并重新构建
    extraWatchFiles: [
        '.vuepress/config.ts',
        '.vuepress/config/htmlModules.ts',
    ]
}))
