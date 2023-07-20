import { SidebarConfig4Multiple } from 'vuepress/config'
import {
    getHtmlSidebar,
    getJsSidebar
} from './getSidebar'

export const Sidebar4ZH: SidebarConfig4Multiple = {
  '/html/': getHtmlSidebar('HTML篇', '开始'),
}
