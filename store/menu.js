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
