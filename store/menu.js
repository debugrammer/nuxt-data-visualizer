export const state = () => ({
  menuData: [
    { header: 'My Awesome API Service' },
    {
      title: 'Dashboards',
      group: 'api-dashboards',
      icon: 'mdi-view-dashboard-outline',
      items: [
        {
          name: 'api',
          title: 'API',
          component: 'api-dashboards-api',
          pageShareEnabled: true,
          autoReloadEnabled: true
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
