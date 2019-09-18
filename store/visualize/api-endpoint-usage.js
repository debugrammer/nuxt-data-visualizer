import _ from 'lodash'
import visualizerUtils from '~/util/visualizer-utils'

const API_URL = `${process.env.API_CLIENT_URL}/api/samples/v1/terms/request-paths`

export const state = () => ({
  pieChart: {
    loaded: false,
    chartData: {}
  }
})

export const mutations = {
  setPieChart(state, chartData) {
    state.pieChart.chartData = chartData
  },
  setPieChartLoaded(state, loaded) {
    state.pieChart.loaded = loaded
  }
}

export const getters = {
  getPieChart(state) {
    return state.pieChart
  }
}

export const actions = {
  async fetchPieChart({ commit }, payload) {
    commit('setPieChartLoaded', false)

    await this.$axios
      .get(API_URL, {
        params: {
          size: payload.size,
          client_id: payload.clientId,
          top_values_only: payload.topValuesOnly
        }
      })
      .then((res) => {
        const labels = []
        const dataList = []
        const terms = res.data.terms

        _.forEach(terms, (value) => {
          labels.push(value.labels[0])
          dataList.push(value.data)
        })

        commit('setPieChart', {
          labels,
          datasets: [
            {
              backgroundColor: visualizerUtils.getColorSet(
                'MATERIAL',
                !payload.topValuesOnly,
                _.size(terms)
              ),
              borderWidth: 1,
              radius: 1,
              data: dataList
            }
          ]
        })
      })
      .catch((error) => {
        commit('setPieChartLoaded', true)
        throw error
      })

    commit('setPieChartLoaded', true)
  }
}
