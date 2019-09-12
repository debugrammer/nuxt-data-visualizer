export const state = () => ({
  expanded: true
})

export const mutations = {
  setExpanded(state, expanded) {
    state.expanded = expanded
  }
}

export const actions = {
  toggle({ commit, state }) {
    commit('setExpanded', !state.expanded)
  }
}
