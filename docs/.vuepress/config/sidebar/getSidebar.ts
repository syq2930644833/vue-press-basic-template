import { SidebarConfigArray } from 'vuepress/config'

export function getHtmlSidebar(
    groupA: string,
    introductionA: string
): SidebarConfigArray {
        const sidebar: SidebarConfigArray = [
          {
            title: groupA,
            collapsable: false,
            children: [
              ['', introductionA],
              'test'
            ]
          }
        ]
        return sidebar
      }

export function getJsSidebar(groupA, groupB): SidebarConfigArray {
    const sidebar: SidebarConfigArray = [
        {
            title: groupA,
            collapsable: false,
            children: [
                '',
                'test'
            ]
        },
        {
            title: groupB,
            collapsable: false,
            children: [
                'test'
            ]
        }
    ]

    return sidebar
}
