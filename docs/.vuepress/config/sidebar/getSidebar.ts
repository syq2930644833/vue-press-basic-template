import { SidebarConfigArray, SidebarItem4Shortcut } from 'vuepress/config'

export function getCommonSidebar(
  groupA: string,
  // introductionA: string,
  children: SidebarItem4Shortcut[]
): SidebarConfigArray {
  const sidebar: SidebarConfigArray = [
    {
      title: groupA,
      collapsable: false,
      children: children
    }
  ]
  return sidebar
}

export function getSubSidebar(
  groupA: string,
  groupB: string,
  childrenA = [''],
  childrenB = ['']
): SidebarConfigArray {
  const sidebar: SidebarConfigArray = [
    {
      title: groupA,
      collapsable: false,
      children: childrenA
    },
    {
      title: groupB,
      collapsable: false,
      children: childrenB
    }
  ]

  return sidebar
}
