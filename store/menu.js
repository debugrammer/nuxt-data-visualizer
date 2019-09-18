export const state = () => ({
  menuData: [
    { header: 'My Awesome API Service' },
    {
      title: 'Dashboards',
      group: 'dashboards',
      icon: 'mdi-view-dashboard-outline',
      items: [
        {
          name: 'api',
          title: 'API',
          component: 'dashboards-api',
          copyLinkEnabled: true,
          autoReloadEnabled: true
        }
      ]
    },
    {
      name: 'api-message',
      title: 'API Message',
      group: 'api-message',
      icon: 'mdi-file-document-box-search-outline',
      copyLinkEnabled: true
    }
  ]
})

export const getters = {
  getMenu(state) {
    return state.menuData
  }
}
