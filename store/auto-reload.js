export const state = () => ({
  reload: false,
  delaySeconds: 60
})

export const mutations = {
  setReload(state, reload) {
    state.reload = reload
  }
}

export const getters = {
  shouldBeReloaded(state) {
    return state.reload
  },
  getDelaySeconds(state) {
    return state.delaySeconds
  }
}
