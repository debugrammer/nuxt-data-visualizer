export const state = () => ({
  timeout: 3000,
  snackbarData: {
    show: false,
    text: '',
    color: ''
  }
})

export const mutations = {
  setSnackbar(state, snackbarData) {
    state.snackbarData = snackbarData
  }
}

export const getters = {
  getSnackbar(state) {
    return state.snackbarData
  },
  getTimeout(state) {
    return state.timeout
  }
}

export const actions = {
  success({ commit }, payload) {
    commit('setSnackbar', {
      show: true,
      color: 'success',
      text: payload.text
    })
  },
  info({ commit }, payload) {
    commit('setSnackbar', {
      show: true,
      color: 'info',
      text: payload.text
    })
  },
  error({ commit }, payload) {
    commit('setSnackbar', {
      show: true,
      color: 'error',
      text: payload.text
    })
  },
  hide({ commit, state }) {
    commit('setSnackbar', {
      show: false,
      color: state.snackbarData.color,
      text: state.snackbarData.text
    })
  }
}
