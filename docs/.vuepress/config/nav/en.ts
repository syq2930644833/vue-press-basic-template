import { NavItem } from 'vuepress/config'

export const NavItems4EN: NavItem[] = [
    {
        text: 'Basis',
        items: [
            { text: 'HTML', link: '/html/' },
            { text: 'JavaScript', link: '/javaScript/' },
            { text: 'CSS', link: '/css/' }
        ]
    },
    {
        text: 'Advanced',
        items: [
            { text: '性能优化', link: '/performance/' },
            { text: '工程化', link: '/engineering/' },
            { text: '计算机网络', link: '/network/' },
            { text: '浏览器原理', link: '/browser/' }
        ]
    },
    {
        text: 'Frame',
        items: [
            { text: 'Vue', link: '/vue/' },
            { text: 'React', link: '/react/' },
            { text: 'React Native', link: '/reactnative/' }
        ]
    },
    { text: 'Daily Record', link: '/essay/' },
    { text: 'Interview collection', link: '/interview/' }
]
