export const state = () => ({
  menuData: [
    { header: 'My Awesome API Service' },
    {
      title: 'Dashboards',
      group: 'dashboards',
      icon: 'mdi-view-dashboard-outline',
      items: [
        {
          name: 'performance-overview',
          title: 'Performance Overview',
          component: 'dashboards-performance-overview',
          copyLinkEnabled: true,
          autoReloadEnabled: true
        }
      ]
    },
    {
      title: 'Analytics',
      group: 'analytics',
      icon: 'mdi-finance',
      items: [
        {
          name: 'scopes',
          title: 'Scopes',
          component: 'analytics-scopes'
        }
      ]
    },
    {
      title: 'Indicators',
      group: 'indicators',
      icon: 'mdi-playlist-star',
      items: [
        {
          name: 'client-usages',
          title: `Top Clients' Scope Usages`,
          component: 'indicators-client-usages'
        },
        {
          name: 'client-process-times',
          title: `Top Clients' Process Times`,
          component: 'indicators-client-process-times'
        }
      ]
    },
    {
      title: 'Messages',
      group: 'messages',
      icon: 'mdi-file-document-box-search-outline',
      items: [
        {
          name: 'message-list',
          title: 'Message List',
          component: 'messages-message-list'
        },
        {
          name: 'message-detail',
          title: 'Message Detail',
          component: 'messages-message-detail',
          copyLinkEnabled: true
        }
      ]
    }
  ]
})

export const getters = {
  getMenu(state) {
    return state.menuData
  }
}
