import moment from 'moment'

export const state = () => ({
  expanded: 0,
  action: false,
  clientIdSearchData: {
    clientId: '',
    from: '',
    to: ''
  },
  datePickerData: {
    date: ''
  }
})

export const mutations = {
  setExpanded(state, expanded) {
    state.expanded = expanded
  },
  setAction(state, action) {
    state.action = action
  },
  setClientIdSearchData(state, searchData) {
    state.clientIdSearchData = searchData
  },
  setDatePickerData(state, searchData) {
    state.datePickerData = searchData
  }
}

export const getters = {
  isExpanded(state) {
    return state.expanded === 0
  },
  getAction(state) {
    return state.action
  },
  getClientIdSearchData(state) {
    return state.clientIdSearchData
  },
  getDatePickerData(state) {
    return state.datePickerData
  }
}

export const actions = {
  expand({ commit }, expanded) {
    if (expanded === true) {
      commit('setExpanded', 0)
      return
    }

    commit('setExpanded', -1)
  },
  toggle({ commit, state }) {
    if (state.expanded === -1) {
      commit('setExpanded', 0)
      return
    }

    commit('setExpanded', -1)
  },
  initClientIdSearchData({ commit }, payload) {
    if (moment(payload.from).isValid() === false) {
      payload.from = ''
    }

    if (moment(payload.to).isValid() === false) {
      payload.to = ''
    }

    const clientId = payload.clientId || ''
    const from = payload.from
      ? moment(payload.from)
      : moment().subtract(1, 'days')
    const to = payload.to ? moment(payload.to) : moment()

    commit('setClientIdSearchData', {
      clientId,
      from: from.format('YYYY-MM-DD HH:mm:ss'),
      to: to.format('YYYY-MM-DD HH:mm:ss')
    })
  }
}
