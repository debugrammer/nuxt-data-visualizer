import _ from 'lodash'
import visualizerUtils from '~/util/visualizer-utils'

const API_URL = `${process.env.API_CLIENT_URL}/api/samples/v1/histograms/process-times`

export const state = () => ({
  lineChart: {
    loaded: false,
    chartData: {}
  }
})

export const mutations = {
  setLineChart(state, chartData) {
    state.lineChart.chartData = chartData
  },
  setLineChartLoaded(state, loaded) {
    state.lineChart.loaded = loaded
  }
}

export const getters = {
  getLineChart(state) {
    return state.lineChart
  }
}

export const actions = {
  async fetchLineChart({ commit }, payload) {
    commit('setLineChartLoaded', false)

    await this.$axios
      .get(API_URL, {
        params: {
          interval: visualizerUtils.getInterval(payload.from, payload.to),
          from: payload.from,
          to: payload.to,
          client_id: payload.clientId
        }
      })
      .then((res) => {
        const labels = []
        const dataSets = []
        const labelSet = res.data.labels
        const histograms = res.data.histograms

        let maxSize = 0
        let maxSizeIndex = 0
        _.forEach(histograms, (value, key) => {
          const size = _.size(value.histogram)

          if (maxSize < size) {
            maxSize = size
            maxSizeIndex = key
          }
        })

        _.forEach(histograms, (value, key) => {
          const histogramData = []
          const histogram = value.histogram

          _.forEach(histogram, (value) => {
            if (key === maxSizeIndex) {
              labels.push(value.label)
            }
            histogramData.push(value.data)
          })

          dataSets.push({
            label: labelSet[key],
            backgroundColor: visualizerUtils.getColor('MATERIAL_ALPHA', key),
            borderColor: visualizerUtils.getColor('MATERIAL', key),
            borderWidth: 1,
            radius: 0,
            data: histogramData,
            yAxisID: 'y-axis-1'
          })
        })

        commit('setLineChart', {
          labels,
          datasets: dataSets
        })
      })
      .catch((error) => {
        commit('setLineChartLoaded', true)
        throw error
      })

    commit('setLineChartLoaded', true)
  }
}
