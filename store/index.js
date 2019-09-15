export const strict = false

export const state = () => ({
  loggedIn: false,
  loggedOut: false
})

export const mutations = {
  setLoggedIn(state, loggedIn) {
    state.loggedIn = loggedIn
  },
  setLoggedOut(state, loggedOut) {
    state.loggedOut = loggedOut
  }
}
