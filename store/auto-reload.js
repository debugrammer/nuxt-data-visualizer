export const state = () => ({
  reload: false,
  delaySeconds: 30
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
