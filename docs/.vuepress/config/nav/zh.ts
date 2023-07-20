import { NavItem } from 'vuepress/config'

export const NavItems4ZH: NavItem[] = [
    {
        text: '基础',
        items: [
            { text: 'HTML', link: '/html/' },
            { text: 'JavaScript', link: '/javaScript/' },
            { text: 'CSS', link: '/css/' }
        ]
    },
    {
        text: '进阶',
        items: [
            { text: '性能优化', link: '/performance/' },
            { text: '工程化', link: '/engineering/' },
            { text: '计算机网络', link: '/network/' },
            { text: '浏览器原理', link: '/browser/' }
        ]
    },
    {
        text: '框架',
        items: [
            { text: 'Vue', link: '/vue/' },
            { text: 'React', link: '/react/' }
        ]
    },
    { text: '随笔', link: '/essay/' }
]
