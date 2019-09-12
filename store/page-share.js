export const state = () => ({
  action: false
})

export const mutations = {
  setAction(state, action) {
    state.action = action
  }
}

export const getters = {
  getAction(state) {
    return state.action
  }
}
