import { SidebarConfig4Multiple, SidebarItem4ShortcutTuple } from 'vuepress/config'
import {
    getCommonSidebar,
    getSubSidebar
} from './getSidebar'


const getCommonIntroduction: (introduction?: string) => SidebarItem4ShortcutTuple = (introduction: string = '开始') => {
    return ['', introduction];
}

// TODO getCommonSidebar 第二个参数提出来可能更好些?

export const Sidebar4ZH: SidebarConfig4Multiple = {
  '/html/': getCommonSidebar(
      'HTML篇',
      [
          getCommonIntroduction()
      ]
  ),
  '/javaScript/': getCommonSidebar(
      'JS篇',
      [
          getCommonIntroduction('历史回顾')
      ]
  ),
  '/css/': getCommonSidebar(
      'CSS篇',
      [
          getCommonIntroduction()
      ]
  ),
  '/performance/': getCommonSidebar(
      '性能优化篇',
      [
          getCommonIntroduction()
      ]
  ),
  '/engineering/': getCommonSidebar(
      '工程化篇',
      [
          getCommonIntroduction()
      ]
  ),
  '/network/': getCommonSidebar(
      '计算机网络篇',
      [
          getCommonIntroduction()
      ]
  ),
  '/browser/': getCommonSidebar(
      '浏览器原理',
      [
          getCommonIntroduction()
      ]
  ),
  '/vue/': getSubSidebar(
      'Vue 2',
      'Vue 3',
      [
          ''
      ],
      [
          'v3-index',
          'v3-lifecycle'
      ]
  ),
  '/react/': getCommonSidebar(
      'React篇',
      [
          getCommonIntroduction()
      ]
  ),
  '/essay/': getCommonSidebar(
      '日常记录',
      [
            getCommonIntroduction('说明'),
            // 'difficulties-and-solutions',
            'interview'
      ]
  ),
}
