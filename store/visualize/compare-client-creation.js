const API_URL = `${process.env.API_CLIENT_URL}/api/samples/v1/statistics/comparisons/period`

const LINEAR_STAT_COLOR = process.env.COLOR_SET.MATERIAL[1]

export const state = () => ({
  linearStat: {
    loaded: false,
    statData: {
      numeratorValue: 0,
      denominatorValue: 0,
      numeratorCriteria: '0 day',
      denominatorCriteria: '0 day',
      color: LINEAR_STAT_COLOR,
      percent: '0'
    }
  }
})

export const mutations = {
  setLinearStat(state, statData) {
    state.linearStat.statData = statData
  },
  setLinearStatLoaded(state, loaded) {
    state.linearStat.loaded = loaded
  }
}

export const getters = {
  getLinearStat(state) {
    return state.linearStat
  }
}

export const actions = {
  async fetchLinearStat({ commit }, payload) {
    commit('setLinearStatLoaded', false)

    await this.$axios
      .get(API_URL, {
        params: {
          client_id: payload.clientId
        }
      })
      .then((res) => {
        const comparedStatistics = res.data.compared_statistics

        if (comparedStatistics.length !== 2) {
          return
        }

        commit('setLinearStat', {
          numeratorValue: comparedStatistics[0].cardinality,
          denominatorValue: comparedStatistics[1].cardinality,
          numeratorCriteria: '1 day',
          denominatorCriteria: '30 day',
          percent: (
            (comparedStatistics[0].cardinality /
              comparedStatistics[1].cardinality) *
            100
          ).toFixed(2),
          color: LINEAR_STAT_COLOR
        })
      })
      .catch((error) => {
        commit('setLinearStatLoaded', true)
        throw error
      })

    commit('setLinearStatLoaded', true)
  }
}
