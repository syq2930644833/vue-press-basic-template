import { SidebarConfig4Multiple, SidebarItem4ShortcutTuple } from 'vuepress/config'
import {
    getCommonSidebar,
    getSubSidebar
} from './getSidebar'

const commonIntroduction: SidebarItem4ShortcutTuple = ['', '开始'];

// TODO getCommonSidebar 第二个参数提出来可能更好些?

export const Sidebar4ZH: SidebarConfig4Multiple = {
  '/html/': getCommonSidebar(
      'HTML篇',
      [
          commonIntroduction
      ]
  ),
  '/javaScript/': getCommonSidebar(
      'JS篇',
      [
          commonIntroduction
      ]
  ),
  '/css/': getCommonSidebar(
      'CSS篇',
      [
          commonIntroduction
      ]
  ),
  '/performance/': getCommonSidebar(
      '性能优化篇',
      [
          commonIntroduction
      ]
  ),
  '/engineering/': getCommonSidebar(
      '工程化篇',
      [
          commonIntroduction
      ]
  ),
  '/network/': getCommonSidebar(
      '计算机网络篇',
      [
          commonIntroduction
      ]
  ),
  '/browser/': getCommonSidebar(
      '浏览器原理',
      [
          commonIntroduction
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
          commonIntroduction
      ]
  ),
  '/essay/': getCommonSidebar(
      '日常记录',
      [
          ''
      ]
  ),
}
