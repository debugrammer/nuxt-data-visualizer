import _ from 'lodash'

export const state = () => ({
  notificationData: [
    {
      title: 'Keyboard Shortcut',
      content: 'Close/open search panel',
      color: 'green',
      avatarText: '/',
      avatarTextClass: 'white--text headline',
      timeLabel: '2019-09-12',
      read: false
    },
    { divider: true, inset: true },
    {
      title: 'Keyboard Shortcut',
      content: 'Close/open left drawer',
      color: 'blue',
      avatarText: '[',
      avatarTextClass: 'white--text headline',
      timeLabel: '2019-09-12',
      read: false
    }
  ]
})

export const getters = {
  getData(state) {
    return state.notificationData
  },
  getUnreadCount(state) {
    return _.size(
      _.filter(state.notificationData, (notification) => {
        return notification.read === false
      })
    )
  }
}
